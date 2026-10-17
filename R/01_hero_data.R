# ============================================================================
# 01_hero_data.R — Datos del mapa de portada (PROMPT.md §8)
#
# Insumo electoral: resultados oficiales ONPE, EG 2021 primera vuelta,
#   por mesa (versión PCM), tomados en SOLO LECTURA del repositorio local del
#   proyecto "mal menor" (C:/48_paper_mal_menor), ya validados al voto exacto.
# Insumo geográfico: GeoJSON de distritos del Perú (cartografía INEI vía
#   github.com/juaneladio/peru-geojson), campo IDDIST = ubigeo INEI.
#
# Salidas:
#   public/data/hero.json        arreglo de arreglos [x, y, electores,
#                                participacion, nulos_blancos, nec, ubigeo]
#   public/data/hero_names.json  {ubigeo: [distrito, provincia]} (tooltips)
#   public/data/hero_meta.json   fuentes, hashes, conteos, rangos, exclusiones
#   public/data/hero_table.csv   tabla completa (accesibilidad / descarga)
#   src/data/mapa-tabla.json     la misma tabla para /datos-del-mapa/
#   src/assets/hero-static.svg   primer estado (participación) ya resuelto
#
# El estado 4 (ejecución de inversión pública) se añade después (PROMPT §8).
# Ejecutar desde la raíz del repo:
#   "C:/Program Files/R/R-4.5.1/bin/Rscript.exe" R/01_hero_data.R
# ============================================================================

suppressPackageStartupMessages({
  library(readr)
  library(dplyr)
  library(tidyr)
  library(sf)
  library(jsonlite)
})

# ---------------------------------------------------------------- parámetros
RAW_ONPE <- "C:/48_paper_mal_menor/data/raw/onpe/r1/Resultados_1ra_vuelta_Version_PCM.csv"
GEOJSON  <- "R/data-raw/peru_distrital_simple.geojson"
# ONPE codifica distritos con ubigeo RENIEC; la cartografia INEI usa ubigeo INEI.
# Crosswalk: github.com/jmcastagnetto/ubigeo-peru-aumentado (columnas inei, reniec).
CROSSWALK <- "R/data-raw/ubigeo_distrito.csv"
DEP_EXTRANJERO <- c("AFRICA", "AMERICA", "ASIA", "EUROPA", "OCEANIA")
ESTADOS_VALIDOS <- c("CONTABILIZADA", "COMPUTADA RESUELTA")
BOX_H <- 1000          # alto del cuadro normalizado
R_MIN <- 1.2; R_MAX <- 9   # radios (unidades del viewBox)
COL_LOW <- "#F1F3EF"; COL_HIGH <- "#11606F"; COL_EXT <- "#062E36"  # niebla->mar; mar-2

stopifnot(file.exists(RAW_ONPE), file.exists(GEOJSON), file.exists(CROSSWALK))
md5_onpe <- as.character(tools::md5sum(RAW_ONPE))
crosswalk <- read_csv(CROSSWALK, col_types = cols(.default = col_character())) |>
  select(ubigeo_inei = inei, ubigeo_reniec = reniec) |>
  distinct()

# ------------------------------------------------------------------- lectura
mesas <- read_delim(
  RAW_ONPE, delim = ";", quote = '"',
  col_types = cols(.default = col_character()),
  locale = locale(encoding = "latin1"), progress = FALSE
)

votos_cols <- paste0("VOTOS_P", 1:18)
num_cols   <- c("N_CVAS", "N_ELEC_HABIL", votos_cols, "VOTOS_VB", "VOTOS_VN", "VOTOS_VI")
mesas <- mesas |>
  mutate(across(all_of(num_cols), ~ replace_na(suppressWarnings(as.numeric(.x)), 0)))

n_mesas_total <- nrow(mesas)
mesas_dom <- mesas |> filter(!DEPARTAMENTO %in% DEP_EXTRANJERO)
n_mesas_extranjero <- n_mesas_total - nrow(mesas_dom)
mesas_validas <- mesas_dom |> filter(DESCRIP_ESTADO_ACTA %in% ESTADOS_VALIDOS)
n_mesas_validas <- nrow(mesas_validas)

# -------------------------------------------------------- agregación distrital
por_distrito <- mesas_validas |>
  group_by(UBIGEO) |>
  summarise(
    departamento = first(DEPARTAMENTO),
    provincia    = first(PROVINCIA),
    distrito     = first(DISTRITO),
    electores    = sum(N_ELEC_HABIL),
    emitidos     = sum(N_CVAS),
    blancos      = sum(VOTOS_VB),
    nulos        = sum(VOTOS_VN),
    across(all_of(votos_cols), sum),
    .groups = "drop"
  ) |>
  mutate(
    validos       = rowSums(across(all_of(votos_cols))),
    participacion = 100 * emitidos / electores,
    nulos_blancos = 100 * (blancos + nulos) / emitidos,
    # número efectivo de candidatos (Laakso-Taagepera sobre voto válido)
    nec = {
      shares <- across(all_of(votos_cols)) / validos
      1 / rowSums(shares^2, na.rm = TRUE)
    }
  ) |>
  filter(electores > 0, emitidos > 0, validos > 0)

# ubigeo RENIEC (ONPE) -> ubigeo INEI (cartografia)
por_distrito <- por_distrito |>
  left_join(crosswalk, by = c("UBIGEO" = "ubigeo_reniec"))
sin_crosswalk <- por_distrito |> filter(is.na(ubigeo_inei)) |> pull(UBIGEO)
por_distrito  <- por_distrito |> filter(!is.na(ubigeo_inei))

# ------------------------------------------------------------------ geografía
geo <- st_read(GEOJSON, quiet = TRUE) |>
  st_make_valid() |>
  select(IDDIST, NOMBDIST, NOMBPROV, NOMBDEP)

sin_geo  <- setdiff(por_distrito$ubigeo_inei, geo$IDDIST)   # con votos, sin polígono
sin_voto <- setdiff(geo$IDDIST, por_distrito$ubigeo_inei)   # con polígono, sin votos

cent <- geo |>
  st_transform(32718) |>            # UTM 18S
  st_centroid(of_largest_polygon = TRUE) |>
  mutate(E = st_coordinates(geometry)[, 1], N = st_coordinates(geometry)[, 2]) |>
  st_drop_geometry() |>
  filter(is.finite(E), is.finite(N))

datos <- por_distrito |>
  inner_join(cent, by = c("ubigeo_inei" = "IDDIST")) |>
  mutate(UBIGEO = ubigeo_inei)      # canonico en salidas: ubigeo INEI

# normalización a un cuadro de alto 1000 preservando proporción; y hacia abajo
scale_m <- (max(datos$N) - min(datos$N)) / BOX_H
datos <- datos |>
  mutate(
    x = (E - min(E)) / scale_m,
    y = (max(N) - N) / scale_m
  )
BOX_W <- ceiling(max(datos$x))

# --------------------------------------------------------------------- salidas
dir.create("public/data", recursive = TRUE, showWarnings = FALSE)
dir.create("src/assets",  recursive = TRUE, showWarnings = FALSE)
dir.create("src/data",    recursive = TRUE, showWarnings = FALSE)

r1 <- function(v) round(v, 1)
hero_rows <- datos |>
  arrange(desc(electores)) |>       # grandes primero: los chicos se dibujan encima
  transmute(x = r1(x), y = r1(y), electores,
            participacion = r1(participacion),
            nulos_blancos = r1(nulos_blancos),
            nec = r1(nec), UBIGEO)
write_json(
  unname(apply(hero_rows, 1, function(r) {
    list(as.numeric(r[["x"]]), as.numeric(r[["y"]]), as.integer(r[["electores"]]),
         as.numeric(r[["participacion"]]), as.numeric(r[["nulos_blancos"]]),
         as.numeric(r[["nec"]]), r[["UBIGEO"]])
  })),
  "public/data/hero.json", auto_unbox = TRUE, digits = NA
)

nombres <- datos |> arrange(desc(electores))
write_json(
  setNames(
    lapply(seq_len(nrow(nombres)), function(i) list(nombres$distrito[i], nombres$provincia[i])),
    nombres$UBIGEO
  ),
  "public/data/hero_names.json", auto_unbox = TRUE
)

rng <- function(v) list(min = r1(min(v)), max = r1(max(v)),
                        p5 = r1(quantile(v, .05)), p95 = r1(quantile(v, .95)),
                        p98 = r1(quantile(v, .98)))
meta <- list(
  generado = format(Sys.Date()),
  fuente_electoral = list(
    descripcion = "ONPE, Elecciones Generales 2021, primera vuelta presidencial, resultados por mesa (version PCM)",
    archivo = RAW_ONPE, md5 = md5_onpe,
    mesas_total = n_mesas_total, mesas_contabilizadas = n_mesas_validas,
    estados_incluidos = ESTADOS_VALIDOS
  ),
  fuente_geografica = list(
    descripcion = "GeoJSON de distritos del Peru (cartografia INEI)",
    url = "https://raw.githubusercontent.com/juaneladio/peru-geojson/master/peru_distrital_simple.geojson",
    campo_ubigeo = "IDDIST"
  ),
  campos_hero = c("x", "y", "electores", "participacion", "nulos_blancos", "nec", "ubigeo"),
  n_distritos = nrow(datos),
  crosswalk_reniec_inei = list(
    url = "https://raw.githubusercontent.com/jmcastagnetto/ubigeo-peru-aumentado/main/ubigeo_distrito.csv",
    nota = "ONPE codifica con ubigeo RENIEC; la cartografia con ubigeo INEI; el ubigeo de las salidas es INEI"
  ),
  excluidos = list(
    mesas_extranjero = n_mesas_extranjero,
    reniec_sin_equivalencia_inei = sin_crosswalk,
    con_votos_sin_poligono = sin_geo,
    con_poligono_sin_votos = sin_voto
  ),
  box = list(w = BOX_W, h = BOX_H),
  rangos = list(
    electores = list(min = min(datos$electores), max = max(datos$electores)),
    participacion = rng(datos$participacion),
    nulos_blancos = rng(datos$nulos_blancos),
    nec = rng(datos$nec)
  ),
  estados_mapa = list(
    list(id = "participacion", es = "Participación electoral", en = "Turnout", unidad = "%"),
    list(id = "nulos_blancos", es = "Votos nulos y blancos", en = "Null and blank votes", unidad = "%"),
    list(id = "nec", es = "Fragmentación del voto (candidatos efectivos)", en = "Vote fragmentation (effective candidates)", unidad = ""),
    list(id = "inversion", es = "Ejecución de inversión pública (pendiente)", en = "Public investment execution (pending)", unidad = "%", pendiente = TRUE)
  )
)
write_json(meta, "public/data/hero_meta.json", auto_unbox = TRUE, pretty = TRUE)

tabla <- datos |>
  arrange(UBIGEO) |>
  transmute(ubigeo = UBIGEO, departamento, provincia, distrito, electores,
            participacion = r1(participacion), nulos_blancos = r1(nulos_blancos),
            nec = r1(nec))
write_csv(tabla, "public/data/hero_table.csv")
write_json(tabla, "src/data/mapa-tabla.json", auto_unbox = TRUE)

# -------------------------------------------------- SVG estático (estado 1)
p5  <- quantile(datos$participacion, .05)
p95 <- quantile(datos$participacion, .95)
p98 <- quantile(datos$participacion, .98)
ramp <- colorRamp(c(COL_LOW, COL_HIGH))
col_de <- function(v) {
  if (v >= p98) return(COL_EXT)
  t <- min(1, max(0, (v - p5) / (p95 - p5)))
  rgb(ramp(t), maxColorValue = 255)
}
emax <- max(datos$electores)
svg_datos <- datos |> arrange(desc(electores))
circ <- sprintf(
  '<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>',
  svg_datos$x, svg_datos$y,
  R_MIN + (R_MAX - R_MIN) * sqrt(svg_datos$electores / emax),
  vapply(svg_datos$participacion, col_de, character(1))
)
svg <- c(
  sprintf('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" role="img" aria-label="Mapa del Perú: %d distritos como puntos; tamaño según electores hábiles y color según participación en la primera vuelta de 2021 (fuente: ONPE).">',
          BOX_W, BOX_H, nrow(datos)),
  '<g fill-opacity="0.92">',
  circ,
  '</g></svg>'
)
writeLines(svg, "src/assets/hero-static.svg")

# ------------------------------------------------------------------- resumen
cat(sprintf(
  paste0("Distritos con datos y centroide: %d\n",
         "Sin equivalencia RENIEC->INEI: %d (%s)\n",
         "Excluidos con votos sin poligono: %d (%s)\n",
         "Excluidos con poligono sin votos: %d\n",
         "Mesas: %d contabilizadas de %d\n",
         "hero.json: %.1f KB | names: %.1f KB | svg: %.1f KB\n",
         "Box: %d x %d\n"),
  nrow(datos),
  length(sin_crosswalk), paste(head(sin_crosswalk, 6), collapse = ","),
  length(sin_geo), paste(head(sin_geo, 6), collapse = ","),
  length(sin_voto), n_mesas_validas, n_mesas_total,
  file.size("public/data/hero.json") / 1024,
  file.size("public/data/hero_names.json") / 1024,
  file.size("src/assets/hero-static.svg") / 1024,
  BOX_W, BOX_H
))
