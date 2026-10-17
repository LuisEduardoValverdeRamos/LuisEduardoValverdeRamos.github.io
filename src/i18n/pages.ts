// Copy de las páginas interiores (PROMPT.md §6). Contenido verificado de la §9;
// la matriz de la §10 gobierna qué se publica.
import type { Locale } from './ui';

const mailto = (subject: string) =>
  `mailto:luis.valverde@pucp.edu.pe?subject=${encodeURIComponent(subject)}`;

/* ------------------------------------------------------------------ líneas */
export interface Linea {
  id: string;
  pregunta: string;
  metodo: string;
  evidencia: string;
  estado: string;
}

export const lineas: Record<Locale, Linea[]> = {
  es: [
    {
      id: 'comportamiento-electoral',
      pregunta: '¿Cómo vota la gente cuando los partidos no existen?',
      metodo:
        'Encuestas postelectorales del JNE (2011, 2016 y 2021), segmentación no supervisada, microeconometría de elección discreta y análisis espacial del padrón electoral.',
      evidencia:
        'Informe institucional del JNE/ProDiálogo 2026 (equipo técnico); manuscrito en preparación con Daniel Encinas (Northwestern University); proyecto sobre el voto joven.',
      estado: 'activa',
    },
    {
      id: 'prensa-agenda',
      pregunta: '¿Qué decide nombrar la prensa, y qué calla?',
      metodo:
        'Análisis de texto a escala sobre prensa peruana. Como asistente de investigación en CISEPA-PUCP construyó un corpus de 747,836 titulares de El Comercio y La República (2016–2024) para medir la visibilidad mediática de cinco economías ilícitas.',
      evidencia:
        'Trabajo de los investigadores principales de CISEPA, con manuscritos en revisión en revistas internacionales. La línea propia está en desarrollo.',
      estado: 'en desarrollo',
    },
    {
      id: 'brechas-implementacion',
      pregunta: '¿Por qué lo que el Estado promete llega tarde o no llega?',
      metodo:
        'Estudio de caso con método de la diferencia y entrevistas semiestructuradas; modelos de aprendizaje automático sobre obras públicas municipales.',
      evidencia:
        'Tesis de licenciatura sobre la reconstrucción de la infraestructura educativa de Piura tras El Niño Costero (mención sobresaliente); proyecto de brechas de obras municipales como asistente en Q-LAB.',
      estado: 'activa',
    },
    {
      id: 'educacion-civica-debate',
      pregunta: '¿Qué forma ciudadanos capaces de deliberar?',
      metodo:
        'Analítica del ecosistema de debate escolar a partir de resultados públicos de torneos, siempre agregada; censo documental de la enseñanza de materia electoral en la formación universitaria.',
      evidencia:
        'Primer informe del ecosistema de debate escolar peruano (LPDE); censo de la enseñanza electoral universitaria para la ESEG-JNE, en curso.',
      estado: 'activa',
    },
  ],
  en: [
    {
      id: 'electoral-behaviour',
      pregunta: 'How do people vote when parties do not exist?',
      metodo:
        'JNE post-election surveys (2011, 2016 and 2021), unsupervised segmentation, discrete-choice microeconometrics and spatial analysis of the electoral register.',
      evidencia:
        'JNE/ProDiálogo institutional report, 2026 (technical team); manuscript in preparation with Daniel Encinas (Northwestern University); the young vote project.',
      estado: 'active',
    },
    {
      id: 'press-agenda',
      pregunta: 'What does the press choose to name, and what does it leave out?',
      metodo:
        'Text analysis at scale on the Peruvian press. As a research assistant at CISEPA-PUCP he built a corpus of 747,836 headlines from El Comercio and La República (2016–2024) to measure the media visibility of five illicit economies.',
      evidencia:
        "Work led by CISEPA's principal investigators, with manuscripts under review at international journals. His own line of work here is in development.",
      estado: 'in development',
    },
    {
      id: 'implementation-gaps',
      pregunta: 'Why does what the state promises arrive late, or not at all?',
      metodo:
        'Case study using the method of difference and semi-structured interviews; machine learning models on municipal public works.',
      evidencia:
        "Bachelor's thesis on rebuilding Piura's school infrastructure after the 2017 El Niño Costero (highest distinction); the municipal public works gaps project, as a research assistant at Q-LAB.",
      estado: 'active',
    },
    {
      id: 'civic-education-debate',
      pregunta: 'What shapes citizens who can deliberate?',
      metodo:
        'Analytics of the school debating ecosystem from public tournament results, always aggregated; a documentary census of electoral subject matter in university curricula.',
      evidencia:
        "The first report on Peru's school debating ecosystem (LPDE); a census of university-level electoral education for the JNE's Electoral School, ongoing.",
      estado: 'active',
    },
  ],
};

/* ------------------------------------------------------------- etiquetas UI */
export const t: Record<Locale, Record<string, string>> = {
  es: {
    researchTitle: 'Investigación',
    researchIntro:
      'Cuatro líneas, formuladas como preguntas. Cada una con su método, su evidencia y su estado.',
    method: 'Método',
    evidence: 'Evidencia',
    state: 'Estado',
    writingsTitle: 'Escritos',
    gThesis: 'Tesis',
    gReport: 'Informes técnicos e institucionales',
    gColumn: 'Columnas y divulgación',
    gEditorial: 'Colaboraciones editoriales',
    gWip: 'Trabajos en curso',
    trainingTitle: 'Formación y docencia',
    projectsTitle: 'Proyectos',
    projectsIntro:
      'Qué problema resuelve cada uno, para quién, con qué datos y en qué estado está.',
    problem: 'El problema',
    forWhom: 'Para quién',
    data: 'Datos y método',
    openData: 'datos y código abiertos',
    visit: 'Ver el proyecto',
    repoLabel: 'Código',
    back: '← Todos los proyectos',
    debateTitle: 'Debate',
    coachTitle: 'Entrenador',
    judgeTitle: 'Juez',
    lpdeTitle: 'Liga Peruana de Debate Escolar',
    workTitle: 'Trabaja conmigo',
    forSchools: 'Para colegios',
    forUni: 'Para universidades y selecciones',
    servicesTitle: 'Servicios',
    howIWork: 'Cómo trabajo',
    casesTitle: 'Casos',
    institutionsTitle: 'He trabajado con',
    writeMe: 'Escríbeme',
    nextStep: 'Siguiente paso',
    forWho: 'Para quién',
    format: 'Formato',
    deliverables: 'Entregables',
  },
  en: {
    researchTitle: 'Research',
    researchIntro:
      'Four lines of work, written as questions. Each with its method, its evidence and its current state.',
    method: 'Method',
    evidence: 'Evidence',
    state: 'State',
    writingsTitle: 'Writing',
    gThesis: 'Thesis',
    gReport: 'Technical and institutional reports',
    gColumn: 'Columns and public writing',
    gEditorial: 'Editorial collaborations',
    gWip: 'Work in progress',
    trainingTitle: 'Training and teaching',
    projectsTitle: 'Projects',
    projectsIntro: 'What each one solves, for whom, with what data, and where it stands.',
    problem: 'The problem',
    forWhom: 'For whom',
    data: 'Data and method',
    openData: 'open data and code',
    visit: 'Visit the project',
    repoLabel: 'Code',
    back: '← All projects',
    debateTitle: 'Debate',
    coachTitle: 'Coach',
    judgeTitle: 'Adjudicator',
    lpdeTitle: 'Peruvian School Debate League',
    workTitle: 'Work with me',
    forSchools: 'For schools',
    forUni: 'For universities and national teams',
    servicesTitle: 'Consulting',
    howIWork: 'How I work',
    casesTitle: 'Cases',
    institutionsTitle: 'Worked with',
    writeMe: 'Email me',
    nextStep: 'Next step',
    forWho: 'For whom',
    format: 'Format',
    deliverables: 'Deliverables',
  },
};

/* --------------------------------------------------- formación y docencia */
export const formacion: Record<Locale, string[]> = {
  es: [
    'Licenciatura en Ciencia Política y Gobierno, PUCP — primer puesto de la promoción; tesis con mención sobresaliente.',
    'Intercambio en Ghent University (Bélgica, 2024) con cursos de maestría en métodos cuantitativos para la investigación social, becado por el programa DARI.',
    'Becario de Beca 18 (PRONABEC, 2019–2024), con cobertura total del pregrado.',
    'Jefe de práctica de Economía Política, Facultad de Ciencias Sociales, PUCP (2026–).',
    'Asistente docente de Introducción a R para la investigación social (dos ediciones) y del módulo de Causal Machine Learning, Q-LAB–PUCP.',
  ],
  en: [
    'BA in Political Science and Government, PUCP — first in cohort; thesis awarded the highest distinction.',
    "Exchange at Ghent University (Belgium, 2024) with master's courses in quantitative methods for social research, funded by the DARI programme.",
    'Beca 18 scholar (PRONABEC, 2019–2024), full undergraduate funding.',
    'Teaching assistant in Political Economy, Faculty of Social Sciences, PUCP (2026–).',
    'Teaching assistant for Introduction to R for Social Research (two editions) and the Causal Machine Learning module, Q-LAB–PUCP.',
  ],
};

/* ------------------------------------------------------------------ debate */
export const debate: Record<Locale, {
  intro: string;
  coach: string[];
  judge: string[];
  lpde: string[];
  schools: { body: string; mail: string };
  uni: { body: string; mail: string };
}> = {
  es: {
    intro:
      'El debate competitivo es la mitad de su trabajo: entrena, juzga y diseña la formación de quienes entrenan. Esta página reúne las tres cosas y termina con lo que puede ofrecer a una institución.',
    coach: [
      'Entrenador de la Selección Nacional de Debate Escolar del Perú (2025–2026), que en Panamá 2026 obtuvo su cuarto título consecutivo del Mundial de Debate Escolar en Español (MED).',
      'Entrenador general de la Sociedad de Debate PUCP (2026–) y entrenador de debate del Colegio Alpamayo (2026–).',
      'Entrenador de debate universitario en República Dominicana, de forma remota, desde 2024: las duplas que preparó alcanzaron los octavos de final del campeonato mundial universitario en 2025 —primera vez para ese país— y los cuartos de final del CMUDE Ecuador 2026.',
      'Como competidor: campeón nacional interuniversitario de debate (CNDI 2025); semifinalista del Campeonato Mundial Universitario de Debate en Español (CMUDE) en Madrid 2022 y cuartofinalista en Panamá 2023; subcampeón del Torneo Rosarista en Bogotá, 2023.',
    ],
    judge: [
      'Juez de la gran final del CMUDE 2026 (Ecuador).',
      'Jefe de adjudicación del Torneo Nacional de Debate Escolar 2025.',
      'Paneles de adjudicación en torneos del circuito nacional e internacional, en formato parlamentario británico y escolar.',
    ],
    lpde: [
      'Director académico de la Liga Peruana de Debate Escolar desde septiembre de 2026; antes, consultor de investigación de la Liga (enero a agosto de 2026).',
      'Diseña el programa de formación y acreditación de entrenadores de la red.',
      'Dirigió el primer informe sobre el ecosistema de debate escolar en el Perú (70 instituciones) y siete policy briefs para la estrategia institucional.',
    ],
    schools: {
      body:
        'Entrenamiento de equipos escolares y formación de profesores asesores: sesiones de preparación por formato (escolar o parlamentario británico), diagnóstico del equipo y acompañamiento de cara a torneos. Presencial en Lima y Piura, o remoto.',
      mail: 'Entrenamiento para un colegio',
    },
    uni: {
      body:
        'Coaching de duplas y selecciones, formación de jueces y asesoría para competencias internacionales. Trabajo remoto con equipos de América Latina.',
      mail: 'Coaching universitario o de selección',
    },
  },
  en: {
    intro:
      'Competitive debating is half of his work: he coaches, adjudicates and designs training for those who coach. This page gathers all three, and ends with what he can offer an institution.',
    coach: [
      "Coach of Peru's national school debating team (2025–2026), which in Panama 2026 won its fourth consecutive title at the World Schools Debating Championship in Spanish (MED).",
      'Head coach of the PUCP Debating Society (2026–) and debate coach at Colegio Alpamayo (2026–).',
      'Remote university debate coach in the Dominican Republic since 2024: the pairs he prepared reached the octofinals of the Spanish-language university world championship in 2025 — a first for the country — and the quarterfinals of CMUDE Ecuador 2026.',
      'As a competitor: national inter-university debating champion (CNDI 2025); semi-finalist at the Spanish-language University World Debating Championship (CMUDE) in Madrid 2022 and quarter-finalist in Panama 2023; runner-up at the Torneo Rosarista in Bogotá, 2023.',
    ],
    judge: [
      'Adjudicator of the CMUDE 2026 grand final (Ecuador).',
      'Chief adjudicator of the 2025 National School Debating Tournament.',
      'Adjudication panels across national and international tournaments, in British Parliamentary and World Schools formats.',
    ],
    lpde: [
      'Academic director of the Peruvian School Debate League since September 2026; previously the League’s research consultant (January to August 2026).',
      "Designs the network's coach training and accreditation programme.",
      "Led the first report on Peru's school debating ecosystem (70 institutions) and seven policy briefs for institutional strategy.",
    ],
    schools: {
      body:
        'Squad coaching and training for teacher-mentors: preparation sessions by format (World Schools or British Parliamentary), squad diagnosis and support ahead of tournaments. In person in Lima and Piura, or remote.',
      mail: 'Coaching for a school',
    },
    uni: {
      body:
        'Pair and squad coaching, adjudicator training and support for international competitions. Remote work with teams across Latin America.',
      mail: 'University or national team coaching',
    },
  },
};

/* --------------------------------------------------------------- servicios */
export interface Servicio {
  id: string;
  title: string;
  forWho: string;
  format: string;
  deliverables: string;
  next: string;
  mailSubject: string;
}

export const servicios: Record<Locale, Servicio[]> = {
  es: [
    {
      id: 'analisis',
      title: 'Análisis electoral y de opinión pública',
      forWho:
        'Organizaciones, medios, instituciones públicas y equipos de investigación que necesitan leer datos electorales, de padrón o de encuesta.',
      format:
        'Por encargo, con alcance acordado al inicio: desde una consulta puntual sobre una base hasta un informe completo con figuras.',
      deliverables:
        'Informe con metodología declarada, figuras reproducibles y la base documentada con sus limitaciones.',
      next: 'Escríbeme contándome qué pregunta quieres responder y con qué datos cuentas. Respondo en 24 horas.',
      mailSubject: 'Consulta: análisis electoral y de opinión pública',
    },
    {
      id: 'debate',
      title: 'Formación en debate',
      forWho: 'Colegios, universidades y selecciones nacionales de América Latina.',
      format:
        'Entrenamiento de equipos, coaching de duplas y formación de jueces, en formato escolar o parlamentario británico. Presencial en Lima y Piura, o remoto.',
      deliverables:
        'Plan de preparación, sesiones de entrenamiento y diagnóstico del equipo con recomendaciones por eje.',
      next: 'Escríbeme con el nivel del equipo y la competencia a la que apuntan. Respondo en 24 horas.',
      mailSubject: 'Consulta: formación en debate',
    },
    {
      id: 'talleres',
      title: 'Talleres de métodos en R',
      forWho:
        'Equipos de investigación, oficinas públicas, redacciones y programas de posgrado.',
      format:
        'Talleres de dos horas, presenciales o remotos, sobre análisis de datos, análisis de texto o visualización. Se pueden encadenar en una serie.',
      deliverables:
        'Materiales y código del taller, con datos de ejemplo reutilizables por el equipo.',
      next: 'Escríbeme con el tamaño del grupo y su nivel previo en R. Respondo en 24 horas.',
      mailSubject: 'Consulta: taller de métodos en R',
    },
    {
      id: 'metodologia',
      title: 'Acompañamiento metodológico',
      forWho:
        'Tesistas, equipos de investigación y áreas que preparan informes institucionales.',
      format:
        'Sesiones de trabajo sobre el diseño: instrumentos, estrategia de identificación y, sobre todo, validez de los indicadores antes de calcularlos.',
      deliverables:
        'Memorando con la evaluación de factibilidad y validez, y las decisiones que el equipo debe tomar.',
      next: 'Escríbeme con el documento o el diseño que quieres revisar. Respondo en 24 horas.',
      mailSubject: 'Consulta: acompañamiento metodológico',
    },
  ],
  en: [
    {
      id: 'analisis',
      title: 'Electoral and public opinion analysis',
      forWho:
        'Organisations, media, public institutions and research teams that need to read electoral, register or survey data.',
      format: 'By commission, with scope agreed at the outset.',
      deliverables: 'A report with declared methodology, reproducible figures and a documented dataset.',
      next: 'Email me with the question you want to answer and the data you have. I reply within 24 hours.',
      mailSubject: 'Enquiry: electoral and public opinion analysis',
    },
    {
      id: 'debate',
      title: 'Debate coaching and training',
      forWho: 'Schools, universities and national teams across Latin America.',
      format:
        'Squad coaching, pair coaching and adjudicator training in World Schools or British Parliamentary format. In person in Lima and Piura, or remote.',
      deliverables: 'A preparation plan, training sessions and a squad diagnosis with recommendations.',
      next: 'Email me with your squad level and the competition you are aiming for. I reply within 24 hours.',
      mailSubject: 'Enquiry: debate coaching',
    },
    {
      id: 'talleres',
      title: 'Methods workshops in R',
      forWho: 'Research teams, public offices, newsrooms and postgraduate programmes.',
      format:
        'Two-hour workshops, in person or remote, on data analysis, text analysis or visualisation. They can be run as a series.',
      deliverables: 'Workshop materials and code, with example data the team can reuse.',
      next: 'Email me with your group size and prior level in R. I reply within 24 hours.',
      mailSubject: 'Enquiry: methods workshop in R',
    },
    {
      id: 'metodologia',
      title: 'Methodological support',
      forWho: 'Thesis writers, research teams and units preparing institutional reports.',
      format:
        'Working sessions on design: instruments, identification strategy and, above all, indicator validity before anything is calculated.',
      deliverables: 'A memo with the feasibility and validity assessment, and the decisions the team must make.',
      next: 'Email me with the document or design you want reviewed. I reply within 24 hours.',
      mailSubject: 'Enquiry: methodological support',
    },
  ],
};

export const comoTrabajo: Record<Locale, { steps: Array<{ n: string; title: string; body: string }>; note: string }> = {
  es: {
    steps: [
      {
        n: '01',
        title: 'Diagnóstico',
        body: 'Me escribes con el problema y los datos que tienes. Respondo en 24 horas y, si hace falta, conversamos para acotar el alcance.',
      },
      {
        n: '02',
        title: 'Propuesta',
        body: 'Te envío qué se puede responder con esos datos, qué no, y el plazo y el costo del trabajo.',
      },
      {
        n: '03',
        title: 'Entrega',
        body: 'Entrego el producto acordado con su metodología declarada y sus limitaciones a la vista. Emito recibo por honorarios.',
      },
    ],
    note:
      'Trabajo entre Piura y Lima: talleres y entrenamientos presenciales en ambas ciudades, consultoría y coaching remoto para todo el país y América Latina.',
  },
  en: {
    steps: [
      {
        n: '01',
        title: 'Diagnosis',
        body: 'You email me the problem and the data you have. I reply within 24 hours and, if useful, we talk to define the scope.',
      },
      {
        n: '02',
        title: 'Proposal',
        body: 'I send you what those data can answer, what they cannot, and the timeline and cost of the work.',
      },
      {
        n: '03',
        title: 'Delivery',
        body: 'I deliver the agreed output with its methodology declared and its limitations in plain view.',
      },
    ],
    note:
      'Based between Piura and Lima: workshops and coaching in person in both cities, consulting and remote coaching across Peru and Latin America.',
  },
};

export const instituciones = [
  'Jurado Nacional de Elecciones (ESEG)',
  'Observatorio de Corrupción del Colegio de Abogados de Lima',
  'Pontificia Universidad Católica del Perú',
  'Q-LAB–PUCP',
  'CISEPA–PUCP',
  'IDEHPUCP',
  'ProDiálogo',
  'Liga Peruana de Debate Escolar',
  'Colegio Alpamayo',
  'Roche Pharma Perú (vía Sapienza Consultora)',
];

export { mailto };
