// Copy de la portada (PROMPT.md §7). Todo el contenido proviene de la sección 9
// del brief (verificado) y respeta la matriz de confidencialidad de la §10.
// Formulaciones sensibles — NO editar sin releer §9.4 y §10:
//   · El título de Panamá 2026 es el MED (Mundial de Debate Escolar en Español),
//     nunca el WSDC; es el cuarto título consecutivo DE LA SELECCIÓN, y Luis
//     entrenó el ciclo 2025–2026.
//   · El corpus de prensa y los manuscritos de CISEPA son de sus investigadores
//     principales: la línea 2 declara el encuadre de asistente.

import type { Locale } from './ui';

export interface HomeCopy {
  hero: {
    kicker: string;
    headline: string;
    method: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  questions: {
    title: string;
    items: Array<{ n: string; q: string; body: string; href: string }>;
    writingsTitle: string;
    writings: Array<{ year: string; title: string; venue: string; href?: string }>;
    writingsMore: string;
  };
  sep1: string;
  projects: {
    title: string;
    items: Array<{ n: string; title: string; body: string; status: string; href: string }>;
    more: string;
    open: string;
  };
  debate: {
    title: string;
    body: string;
    stats: Array<{ figure: string; label: string }>;
    more: string;
    cta: string;
  };
  sep2: string;
  services: {
    title: string;
    items: Array<{ title: string; body: string }>;
    mail: string;
    more: string;
  };
  sep3: string;
  close: {
    title: string;
    lines: string[];
    photoAlt: string;
    links: Array<{ label: string; href: string }>;
  };
}

const mailto = (subject: string) =>
  `mailto:luis.valverde@pucp.edu.pe?subject=${encodeURIComponent(subject)}`;

export const home: Record<Locale, HomeCopy> = {
  es: {
    hero: {
      kicker: 'Pedregal Grande, Catacaos · trabaja entre Piura y Lima',
      headline: 'Estudio cómo vota el Perú y cómo el Estado cumple lo que promete',
      method:
        'Politólogo (PUCP). Ciencia social computacional sobre elecciones, prensa e infraestructura pública; formación en debate competitivo.',
      primary: { label: 'Trabajemos juntos', href: '/servicios/' },
      secondary: { label: 'Ver investigación', href: '/investigacion/' },
    },
    questions: {
      title: 'Lo que intento responder',
      items: [
        {
          n: '01',
          q: '¿Cómo vota la gente cuando los partidos no existen?',
          body:
            'Encuestas postelectorales, clustering y modelos de elección discreta sobre tres ciclos electorales peruanos.',
          href: '/investigacion/#comportamiento-electoral',
        },
        {
          n: '02',
          q: '¿Qué decide nombrar la prensa, y qué calla?',
          body:
            'Análisis de texto a escala sobre un corpus de 747,836 titulares, construido como asistente de investigación en CISEPA-PUCP.',
          href: '/investigacion/#prensa-agenda',
        },
        {
          n: '03',
          q: '¿Por qué lo que el Estado promete llega tarde o no llega?',
          body:
            'Brechas de implementación en infraestructura pública: la reconstrucción de Piura tras El Niño Costero y las obras municipales.',
          href: '/investigacion/#brechas-implementacion',
        },
      ],
      writingsTitle: 'Escritos seleccionados',
      writings: [
        {
          year: '2026',
          title: 'Análisis del elector peruano: aportes desde las ciencias del comportamiento',
          venue: 'JNE / ProDiálogo · informe institucional · equipo técnico',
        },
        {
          year: '2025',
          title:
            'Desastres y brechas de implementación: la reconstrucción de la infraestructura educativa en Piura',
          venue: 'Tesis de licenciatura · mención sobresaliente · PUCP',
          href: 'https://hdl.handle.net/20.500.12404/32370',
        },
        {
          year: '2023',
          title: 'El estancamiento de la democracia en el Perú',
          venue: 'Con A. Benites · IDEHPUCP · columna',
          href: 'https://idehpucp.pucp.edu.pe/boletin-eventos/el-estancamiento-de-la-democracia-en-el-peru-27949/',
        },
      ],
      writingsMore: 'Todos los escritos',
    },
    sep1: 'Del distrito al Congreso, y de vuelta.',
    projects: {
      title: 'Proyectos con datos públicos',
      items: [
        {
          n: '01',
          title: 'Brechas de obras municipales',
          body:
            'Más de 60,000 obras públicas municipales (2018–2024) modeladas con XGBoost y SHAP para anticipar dónde se detienen. Como asistente en Q-LAB.',
          status: 'publicado',
          href: '/proyectos/brechas-obras/',
        },
        {
          n: '02',
          title: 'Tipología del elector peruano',
          body:
            'Clustering de tres ciclos de encuestas postelectorales del JNE (2011, 2016 y 2021); los resultados integran el informe institucional de 2026.',
          status: 'publicado',
          href: '/proyectos/elector-peruano/',
        },
        {
          n: '03',
          title: 'Analítica del debate escolar',
          body:
            'Primera línea base del circuito escolar peruano: resultados públicos de 16 torneos y el longitudinal del nacional, con foco en equidad de acceso.',
          status: 'activo',
          href: '/proyectos/analitica-debate-lpde/',
        },
        {
          n: '04',
          title: 'Voto joven 2026',
          body:
            'Geografía del electorado joven con el padrón del RENIEC y detección de concentraciones espaciales (Getis-Ord Gi*).',
          status: 'activo',
          href: '/proyectos/voto-joven/',
        },
      ],
      more: 'Todos los proyectos',
      open: 'Abrir proyecto →',
    },
    debate: {
      title: 'Entrenar a discutir',
      body:
        'Entrena a la selección peruana de debate escolar y dirige el área académica de la Liga Peruana de Debate Escolar, donde diseña la formación de entrenadores. Como juez ha estado en la gran final del mundial universitario en español y en los paneles de adjudicación del circuito nacional. También prepara duplas universitarias fuera del Perú: las que entrenó en República Dominicana llegaron por primera vez a octavos del mundial.',
      stats: [
        {
          figure: '4.º',
          label:
            'título consecutivo del Mundial de Debate Escolar en Español (MED, Panamá 2026) de la selección que entrena',
        },
        { figure: '2025', label: 'campeón nacional interuniversitario de debate (CNDI)' },
        { figure: '6', label: 'países donde ha competido, juzgado o entrenado' },
      ],
      more: 'Más sobre debate',
      cta: '¿Quieres entrenar a tu equipo? →',
    },
    sep2: 'Enseñar a discutir es enseñar a pensar.',
    services: {
      title: 'En qué puedo ayudarte',
      items: [
        {
          title: 'Análisis electoral y de opinión pública',
          body:
            'Bases oficiales, encuestas y texto de prensa convertidos en informes, figuras y datos documentados.',
        },
        {
          title: 'Formación en debate',
          body:
            'Colegios, universidades y selecciones: entrenamiento de equipos, coaching de duplas y formación de jueces en formato parlamentario británico y escolar.',
        },
        {
          title: 'Talleres de métodos en R',
          body:
            'Sesiones de dos horas sobre análisis de datos, análisis de texto y visualización, presenciales o remotas.',
        },
        {
          title: 'Acompañamiento metodológico',
          body:
            'Tesis, investigaciones e informes institucionales: diseño de instrumentos y evaluación de la validez de los indicadores antes de calcularlos.',
        },
      ],
      mail: 'Escríbeme',
      more: 'Ver servicios y casos',
    },
    sep3: 'Los datos públicos del Perú cuentan más de lo que solemos preguntarles.',
    close: {
      title: 'Quién escribe',
      lines: [
        'Soy de Pedregal Grande, en Catacaos, Piura.',
        'Trabajo entre Piura y Lima: investigo en la Escuela Electoral del JNE, enseño Economía Política en la PUCP y dirijo el área académica de la Liga Peruana de Debate Escolar.',
        'Este trimestre: el mapa distrital que abre esta página, un paper sobre el voto en el balotaje de 2021 y la formación de entrenadores rumbo al próximo mundial escolar.',
      ],
      photoAlt: 'Retrato de Luis Valverde Ramos',
      links: [
        { label: 'Correo', href: mailto('Hola Luis') },
        { label: 'GitHub', href: 'https://github.com/LuisEduardoValverdeRamos' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/luisvalverderamos/' },
        { label: 'CV', href: '/cv/' },
      ],
    },
  },

  en: {
    hero: {
      kicker: 'From Pedregal Grande, Catacaos · based between Piura and Lima',
      headline: 'I study how Peru votes — and how the state delivers on what it promises',
      method:
        'Political scientist (PUCP). Computational social science on elections, the press and public infrastructure; competitive debating.',
      primary: { label: 'View research', href: '/en/research/' },
      secondary: { label: 'Work with me', href: '/en/consulting/' },
    },
    questions: {
      title: 'The questions I work on',
      items: [
        {
          n: '01',
          q: 'How do people vote when parties do not exist?',
          body:
            'Post-election surveys, clustering and discrete-choice models across three Peruvian electoral cycles.',
          href: '/en/research/#electoral-behaviour',
        },
        {
          n: '02',
          q: 'What does the press choose to name, and what does it leave out?',
          body:
            'Text analysis at scale over a corpus of 747,836 headlines, built as a research assistant at CISEPA-PUCP.',
          href: '/en/research/#press-agenda',
        },
        {
          n: '03',
          q: 'Why does what the state promises arrive late, or not at all?',
          body:
            'Implementation gaps in public infrastructure: reconstruction in Piura after the 2017 El Niño Costero, and municipal public works.',
          href: '/en/research/#implementation-gaps',
        },
      ],
      writingsTitle: 'Selected writing',
      writings: [
        {
          year: '2026',
          title: 'Analysis of the Peruvian voter: contributions from the behavioural sciences',
          venue: 'JNE / ProDiálogo · institutional report · technical team',
        },
        {
          year: '2025',
          title:
            'Disasters and implementation gaps: rebuilding school infrastructure in Piura',
          venue: "Bachelor's thesis · highest distinction · PUCP",
          href: 'https://hdl.handle.net/20.500.12404/32370',
        },
        {
          year: '2023',
          title: "Peru's democratic stagnation",
          venue: 'With A. Benites · IDEHPUCP · opinion column',
          href: 'https://idehpucp.pucp.edu.pe/boletin-eventos/el-estancamiento-de-la-democracia-en-el-peru-27949/',
        },
      ],
      writingsMore: 'All writing',
    },
    sep1: 'From the district to Congress, and back again.',
    projects: {
      title: 'Selected projects',
      items: [
        {
          n: '01',
          title: 'Municipal public works gaps',
          body:
            'Over 60,000 municipal public works (2018–2024) modelled with XGBoost and SHAP to anticipate where they stall. As a research assistant at Q-LAB.',
          status: 'published',
          href: '/en/projects/infrastructure-gaps/',
        },
        {
          n: '02',
          title: 'A typology of the Peruvian voter',
          body:
            'Clustering of three cycles of JNE post-election surveys (2011, 2016 and 2021); the results form part of the 2026 institutional report.',
          status: 'published',
          href: '/en/projects/peruvian-voter/',
        },
        {
          n: '03',
          title: 'School debate analytics',
          body:
            "The first baseline of Peru's school debating circuit: public results from 16 tournaments and the national longitudinal series, focused on access equity.",
          status: 'active',
          href: '/en/projects/lpde-debate-analytics/',
        },
        {
          n: '04',
          title: 'The young vote, 2026',
          body:
            'Geography of the young electorate using the RENIEC register, with spatial cluster detection (Getis-Ord Gi*).',
          status: 'active',
          href: '/en/projects/young-vote/',
        },
      ],
      more: 'All projects',
      open: 'Open project →',
    },
    debate: {
      title: 'Teaching people to argue',
      body:
        "He coaches Peru's national school debating team and leads the academic area of the Peruvian School Debate League, where he designs coach training. As an adjudicator he has judged the grand final of the Spanish-language university world championship and sat on panels across the national circuit. He also prepares university pairs abroad: the Dominican teams he coached reached the octofinals of the world championship for the first time.",
      stats: [
        {
          figure: '4th',
          label:
            'consecutive title at the World Schools Debating Championship in Spanish (MED, Panama 2026) won by the team he coaches',
        },
        { figure: '2025', label: 'national inter-university debating champion (CNDI)' },
        { figure: '6', label: 'countries where he has competed, judged or coached' },
      ],
      more: 'More on debate',
      cta: 'Want coaching for your team? →',
    },
    sep2: 'Teaching people to argue is teaching them to think.',
    services: {
      title: 'How I can help',
      items: [
        {
          title: 'Electoral and public opinion analysis',
          body:
            'Official registers, surveys and press text turned into reports, figures and documented datasets.',
        },
        {
          title: 'Debate coaching and training',
          body:
            'Schools, universities and national teams: squad coaching, pair coaching and adjudicator training in British Parliamentary and World Schools formats.',
        },
        {
          title: 'Methods workshops in R',
          body:
            'Two-hour sessions on data analysis, text analysis and visualisation, in person or remote.',
        },
        {
          title: 'Methodological support',
          body:
            'Theses, research projects and institutional reports: instrument design and validity assessment of indicators before anything is calculated.',
        },
      ],
      mail: 'Email me',
      more: 'See consulting',
    },
    sep3: "Peru's public data has more to say than we tend to ask of it.",
    close: {
      title: 'Who writes here',
      lines: [
        'I am from Pedregal Grande, in Catacaos, Piura.',
        'I work between Piura and Lima: research at the Electoral School of the JNE, teaching Political Economy at PUCP, and leading the academic area of the Peruvian School Debate League.',
        'This quarter: the district-level map that opens this page, a paper on vote choice in the 2021 run-off, and coach training ahead of the next school world championship.',
      ],
      photoAlt: 'Portrait of Luis Valverde Ramos',
      links: [
        { label: 'Email', href: mailto('Hello Luis') },
        { label: 'GitHub', href: 'https://github.com/LuisEduardoValverdeRamos' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/luisvalverderamos/' },
        { label: 'CV', href: '/en/cv/' },
      ],
    },
  },
};
