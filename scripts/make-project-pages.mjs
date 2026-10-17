// Genera las fichas de proyecto (src/content/proyectos/*.md) en ES y EN.
// Fuente de verdad del contenido: PROMPT.md §9.5 + seeds/projects.yaml.
// La ficha 8 (Pedregal Grande) queda fuera hasta que Luis confirme URL y estado
// (regla de degradación); el seed la conserva.
import { mkdir, writeFile } from 'node:fs/promises';

const DIR = 'src/content/proyectos';
await mkdir(DIR, { recursive: true });

const P = [
  {
    slug_es: 'brechas-obras', slug_en: 'infrastructure-gaps', order: 1,
    status: 'publicado', open_data: false,
    site: 'https://luiseduardovalverderamos.github.io/public_infrastructure_gaps/',
    es: {
      title: 'Brechas de obras municipales',
      summary: 'Más de 60,000 obras públicas municipales modeladas para anticipar dónde se detienen.',
      problema: 'Los gobiernos locales ejecutan miles de obras cada año y una parte se paraliza sin que el sistema de seguimiento lo anticipe. El proyecto pregunta qué rasgos de una obra y de su municipio predicen que la ejecución se detenga.',
      para_quien: 'Proyecto del Q-LAB de la PUCP para la Cooperación Suiza, en el marco de su programa de gestión financiera pública subnacional. Luis participó como asistente de investigación.',
      datos: 'Más de 60,000 obras públicas municipales (2018–2024) a partir del cruce de tres fuentes oficiales: el portal de inversiones del MEF, el registro nacional de municipalidades (RENAMU) y datos distritales del INEI. Modelos de gradient boosting (XGBoost) con atribución de variables por SHAP.',
      body: 'El modelo no busca explicar causalmente la parálisis, sino ordenar el riesgo: identificar qué obras tienen un perfil parecido al de las que se detuvieron antes. Esa distinción importa, porque la pregunta de política pública no es «¿qué causa la parálisis?» sino «¿dónde conviene mirar primero?».\n\nEl trabajo pertenece al equipo del Q-LAB; lo publicado en el sitio del proyecto es la referencia citable.',
    },
    en: {
      title: 'Municipal public works gaps',
      summary: 'Over 60,000 municipal public works modelled to anticipate where they stall.',
      problema: 'Local governments run thousands of works each year and a share of them stalls without the monitoring system anticipating it. The project asks which features of a work and of its municipality predict that execution will stop.',
      para_quien: 'A PUCP Q-LAB project for the Swiss Cooperation, within its subnational public financial management programme. Luis took part as a research assistant.',
      datos: 'Over 60,000 municipal public works (2018–2024), linking three official sources: the Ministry of Economy investment portal, the national register of municipalities (RENAMU) and district-level data from INEI. Gradient boosting models (XGBoost) with SHAP attribution.',
      body: 'The model does not aim to explain stalling causally; it ranks risk — identifying which works resemble those that stalled before. That distinction matters, because the policy question is not "what causes stalling?" but "where should we look first?".\n\nThe work belongs to the Q-LAB team; what is published on the project site is the citable reference.',
    },
  },
  {
    slug_es: 'elector-peruano', slug_en: 'peruvian-voter', order: 2,
    status: 'publicado', open_data: false,
    es: {
      title: 'Tipología del elector peruano',
      summary: 'Clustering de tres ciclos de encuestas postelectorales del JNE para la estrategia de educación cívica.',
      problema: 'La Escuela Electoral del JNE necesitaba perfiles del electorado basados en evidencia —no en intuición— para orientar sus estrategias de educación cívica rumbo a las Elecciones Generales 2026.',
      para_quien: 'Encargo del Jurado Nacional de Elecciones a través de ProDiálogo. Luis integró el equipo técnico.',
      datos: 'Tres ciclos de encuestas postelectorales del JNE: Perfil del Elector 2011 y 2016, y la encuesta de Ciudadanía del Bicentenario de 2021. Segmentación no supervisada sobre variables de involucramiento político, confianza institucional y dieta informativa, con validación de estabilidad por remuestreo.',
      body: 'El resultado son arquetipos de elector que la institución puede usar para decidir a quién le habla cada pieza de educación cívica. La solución oficial es la que integra el informe institucional publicado en 2026; las exploraciones metodológicas paralelas no lo respaldan y no se citan.\n\nLa autoría del informe es institucional: aquí se describe el método, no se reclama el producto.',
    },
    en: {
      title: 'A typology of the Peruvian voter',
      summary: 'Clustering three cycles of JNE post-election surveys to inform civic education strategy.',
      problema: "The JNE's Electoral School needed evidence-based voter profiles — rather than intuition — to guide its civic education strategies ahead of the 2026 general elections.",
      para_quien: 'Commissioned by the National Jury of Elections through ProDiálogo. Luis was part of the technical team.',
      datos: 'Three cycles of JNE post-election surveys: the 2011 and 2016 Voter Profile surveys and the 2021 Bicentennial Citizenship survey. Unsupervised segmentation over political involvement, institutional trust and media diet, with stability validated by resampling.',
      body: 'The result is a set of voter archetypes the institution can use to decide whom each piece of civic education addresses. The official solution is the one included in the institutional report published in 2026; parallel methodological explorations do not support it and are not cited.\n\nAuthorship of the report is institutional: what is described here is the method, not a claim over the product.',
    },
  },
  {
    slug_es: 'analitica-debate-lpde', slug_en: 'lpde-debate-analytics', order: 3,
    status: 'activo', open_data: false,
    es: {
      title: 'Analítica del debate escolar',
      summary: 'Primera línea base del circuito escolar peruano de debate, con foco en equidad de acceso.',
      problema: 'El circuito peruano de debate escolar creció durante una década sin ninguna línea base: nadie sabía cuántas instituciones participaban, con qué perfiles ni con qué brechas de acceso entre colegios públicos y privados.',
      para_quien: 'Liga Peruana de Debate Escolar (LPDE), para su estrategia de expansión y su diálogo con el sector educativo.',
      datos: 'Resultados públicos de 16 torneos de la temporada 2025 (tabulaciones oficiales de los torneos) y la serie longitudinal del nacional escolar entre 2023 y 2025, cruzados con el padrón de instituciones educativas del MINEDU.',
      body: 'Todo el análisis es agregado y por categoría de institución: los participantes son menores de edad, así que no se publican datos individuales ni comparaciones por colegio nombrado. Los hallazgos describen el acceso al circuito —cuánto pesa cada tipo de gestión, cuánto se concentra en Lima— y vienen con sus advertencias metodológicas, incluida la cobertura parcial del emparejamiento con el padrón.',
    },
    en: {
      title: 'School debate analytics',
      summary: "The first baseline of Peru's school debating circuit, focused on access equity.",
      problema: "Peru's school debating circuit grew for a decade without any baseline: nobody knew how many institutions took part, with what profiles, or what access gaps existed between state and private schools.",
      para_quien: 'The Peruvian School Debate League (LPDE), for its expansion strategy and its dialogue with the education sector.',
      datos: 'Public results from 16 tournaments in the 2025 season (official tournament tabulations) and the longitudinal series of the national school championship from 2023 to 2025, linked to the Ministry of Education register of schools.',
      body: 'All analysis is aggregate and by institution category: participants are minors, so no individual data and no comparisons between named schools are published. The findings describe access to the circuit — how much each type of school weighs, how much is concentrated in Lima — and come with their methodological caveats, including the partial coverage of the register match.',
    },
  },
  {
    slug_es: 'voto-joven', slug_en: 'young-vote', order: 4,
    status: 'activo', open_data: false, repo: 'voto-joven-peru-2026',
    es: {
      title: 'Voto joven 2026',
      summary: 'Geografía del electorado joven con el padrón electoral y detección de concentraciones espaciales.',
      problema: 'El electorado joven se discute en abstracto: cuántos son, dónde están y si su peso se concentra o se dispersa por el territorio son preguntas que el debate público suele responder a ojo.',
      para_quien: 'Proyecto propio, con datos abiertos del padrón, de cara a las Elecciones Generales 2026.',
      datos: 'Padrón electoral del RENIEC agregado por distrito. Detección de concentraciones espaciales con el estadístico Getis-Ord Gi*, que identifica agrupaciones de distritos con valores altos contiguos.',
      body: 'El resultado es un mapa del peso del voto joven y de sus agrupaciones territoriales. Solo se publican agregados distritales: los microdatos del padrón no se redistribuyen.',
    },
    en: {
      title: 'The young vote in 2026',
      summary: 'Geography of the young electorate from the electoral register, with spatial cluster detection.',
      problema: 'The young electorate is usually discussed in the abstract: how many there are, where they are, and whether their weight concentrates or disperses across the territory are questions public debate tends to answer by eye.',
      para_quien: 'A personal project using open register data, ahead of the 2026 general elections.',
      datos: 'The RENIEC electoral register aggregated by district. Spatial cluster detection with the Getis-Ord Gi* statistic, which identifies groupings of contiguous districts with high values.',
      body: 'The result is a map of the weight of the young vote and of its territorial clusters. Only district-level aggregates are published: register microdata is not redistributed.',
    },
  },
  {
    slug_es: 'tesis-nino-costero', slug_en: 'el-nino-reconstruction', order: 5,
    status: 'publicado', open_data: false,
    site: 'https://hdl.handle.net/20.500.12404/32370',
    es: {
      title: 'Reconstrucción post-Niño Costero en Piura',
      summary: 'Brechas de implementación en la reconstrucción de la infraestructura educativa de Piura.',
      problema: '¿Por qué lo que el Estado promete llega tarde o no llega? El Niño Costero de 2017 dañó cientos de colegios en Piura y la reconstrucción prometida avanzó de forma desigual entre territorios con condiciones parecidas.',
      para_quien: 'Tesis de licenciatura en Ciencia Política y Gobierno (PUCP), con mención sobresaliente.',
      datos: 'Estudio de caso sobre la reconstrucción de infraestructura educativa en Piura entre julio de 2020 y enero de 2023, con método de la diferencia y entrevistas semiestructuradas a actores del proceso.',
      body: 'La tesis sostiene que la brecha entre lo prometido y lo entregado no se explica solo por falta de presupuesto, sino por cómo se organiza la implementación entre niveles de gobierno. Es el origen de una de las líneas de investigación del sitio.',
    },
    en: {
      title: 'Post-El Niño reconstruction in Piura',
      summary: 'Implementation gaps in rebuilding school infrastructure in Piura.',
      problema: 'Why does what the state promises arrive late, or not at all? The 2017 El Niño Costero damaged hundreds of schools in Piura, and the promised reconstruction advanced unevenly across territories with similar conditions.',
      para_quien: "Bachelor's thesis in Political Science and Government (PUCP), awarded the highest distinction.",
      datos: 'A case study of school infrastructure reconstruction in Piura between July 2020 and January 2023, using the method of difference and semi-structured interviews with actors in the process.',
      body: 'The thesis argues that the gap between what was promised and what was delivered is not explained by budget alone, but by how implementation is organised across levels of government. It is the origin of one of the research lines on this site.',
    },
  },
  {
    slug_es: 'padron-escale', slug_en: 'escale-registry', order: 6,
    status: 'cerrado', open_data: true,
    es: {
      title: 'Nota de datos: el padrón ESCALE',
      summary: 'Cómo usar bien el padrón de instituciones educativas del MINEDU, con su script reproducible.',
      problema: 'El padrón de servicios educativos es la fuente obligada para cualquier análisis sobre colegios en el Perú, y casi siempre se usa mal: contar filas sobreestima el número de colegios, los servicios inactivos siguen en la base y la codificación del archivo original rompe las tildes.',
      para_quien: 'Cualquiera que trabaje con datos educativos peruanos. Nota técnica abierta.',
      datos: 'Padrón de servicios educativos de ESCALE–MINEDU, corte de marzo de 2026: archivo original en formato DBF, derivados reproducibles en UTF-8 y un informe de características y limitaciones.',
      body: 'La nota documenta tres cosas que ahorran errores: cuál es la unidad de registro (no es el colegio), cómo distinguir servicios activos de inactivos, y cómo convertir el archivo original sin perder caracteres. El script de conversión es parte de la nota.',
    },
    en: {
      title: "Data note: Peru's ESCALE school registry",
      summary: "How to use the Ministry of Education's school registry properly, with a reproducible script.",
      problema: 'The education services registry is the obligatory source for any analysis of schools in Peru, and it is almost always used incorrectly: counting rows overstates the number of schools, inactive services remain in the dataset, and the original file encoding breaks accented characters.',
      para_quien: 'Anyone working with Peruvian education data. An open technical note.',
      datos: 'The ESCALE–MINEDU education services registry, March 2026 cut: original DBF file, reproducible UTF-8 derivatives, and a report on its characteristics and limitations.',
      body: 'The note documents three things that prevent errors: what the unit of record actually is (not the school), how to distinguish active from inactive services, and how to convert the original file without losing characters. The conversion script is part of the note.',
    },
  },
  {
    slug_es: 'indicadores-bcrp', slug_en: 'bcrp-indicators', order: 7,
    status: 'activo', open_data: true,
    es: {
      title: 'Indicadores del BCRP en R',
      summary: 'Pipeline reproducible sobre la API pública del Banco Central, con figuras tipo paper.',
      problema: 'Las series del Banco Central son públicas y gratuitas, pero encontrar el código exacto de cada serie y automatizar su descarga cuesta más de lo que debería.',
      para_quien: 'Economistas, politólogos y periodistas de datos que trabajen con series macroeconómicas peruanas.',
      datos: 'API pública de BCRPData, sin registro: inversión bruta fija privada y pública, exportaciones por tipo y empleo formal, en series anuales y mensuales.',
      body: 'El pipeline son dos scripts: uno descarga y otro grafica, con los códigos de serie documentados y figuras listas para publicación en color y en escala de grises. Lo más útil para otros suele ser la lista de códigos.',
    },
    en: {
      title: 'Central Bank indicators in R',
      summary: "A reproducible pipeline over the Central Bank's public API, with paper-ready figures.",
      problema: "The Central Bank's series are public and free, but finding the exact code for each series and automating the download takes more effort than it should.",
      para_quien: 'Economists, political scientists and data journalists working with Peruvian macroeconomic series.',
      datos: 'The public BCRPData API, no registration required: private and public gross fixed investment, exports by type, and formal employment, in annual and monthly series.',
      body: 'The pipeline is two scripts — one downloads, the other plots — with series codes documented and figures ready for publication in colour and greyscale. The most useful part for others is usually the list of codes.',
    },
  },
];

const esc = (s) => s.replace(/"/g, '\\"');

for (const p of P) {
  for (const lang of ['es', 'en']) {
    const c = p[lang];
    const fm = [
      '---',
      `title: "${esc(c.title)}"`,
      `lang: ${lang}`,
      `slug_es: "${p.slug_es}"`,
      `slug_en: "${p.slug_en}"`,
      `order: ${p.order}`,
      `status: ${p.status}`,
      `summary: "${esc(c.summary)}"`,
      `problema: "${esc(c.problema)}"`,
      `para_quien: "${esc(c.para_quien)}"`,
      `datos: "${esc(c.datos)}"`,
      `open_data: ${p.open_data}`,
      `repo: "${p.repo ?? ''}"`,
      `site: "${p.site ?? ''}"`,
      `report: ""`,
      '---',
      '',
      c.body,
      '',
    ].join('\n');
    const name = `${lang === 'es' ? p.slug_es : p.slug_en}.${lang}.md`;
    await writeFile(`${DIR}/${name}`, fm, 'utf8');
    console.log(name);
  }
}
