import type { Dictionary } from "@/lib/i18n";
import type { JourneyItem, Project, SkillGroup } from "@/lib/dictionaries/types";
import { arsenal, links, shots, stacks } from "@/lib/dictionaries/projects";

const projects: Project[] = [
  {
    id: "encuadre",
    n: "01",
    title: "ENCUADRE",
    status: "dev",
    summary: "Una plataforma para encontrar psicólogo sanitario colegiado y llevar todo el proceso de terapia online, en un solo sitio.",
    heading: ["LA ", "IDEA", ""],
    body: "Elegir terapeuta suele ser recorrer directorios sin saber quién encaja contigo. Encuadre empieza con un cuestionario breve, conecta a pacientes con psicólogos verificados y después reúne todo el proceso en un mismo lugar: mensajería en tiempo real, agenda, sesiones por videollamada y el día a día de la consulta. Desarrollo la web y su propia API de principio a fin.",
    stack: stacks.encuadre,
    media: { kind: "desktop", ...shots.encuadre },
  },
  {
    id: "recmnd",
    n: "02",
    title: "RECMND",
    status: "dev",
    summary: "Una red social móvil de listas de recomendaciones, firmadas por personas de confianza en lugar de algoritmos.",
    heading: ["LA ", "IDEA", ""],
    body: "Cuando no sabes qué ver, qué leer o adónde ir, le preguntas a un amigo. Recmnd lo convierte en listas cortas y con intención: cada una la firma una persona, con una nota personal y una puntuación en cada recomendación, ya sean películas, series, libros, música, podcasts o sitios. Sigues a gente, guardas listas y las comentas. Para iOS y Android.",
    stack: stacks.recmnd,
    media: { kind: "phones", shots: shots.recmnd },
  },
  {
    id: "internship",
    n: "03",
    title: "PROYECTO DE PRÁCTICAS",
    status: "confidential",
    summary: "Prácticas de desarrollo full stack, de finales de 2025 a principios de 2026.",
    heading: ["MI ", "PAPEL", ""],
    body: "Formé parte del equipo de desarrollo de la empresa en un producto real, trabajando tanto en frontend como en backend. El proyecto es confidencial, así que no muestro capturas, nombres ni ningún detalle del producto.",
    stack: stacks.internship,
    media: { kind: "redacted" },
  },
  {
    id: "portfolio",
    n: "04",
    title: "PORTFOLIO MORTEGA DEV",
    summary: "Portfolio personal de alto nivel creado con tecnologías web modernas.",
    heading: ["EL ", "PROBLEMA", " Y LA ARQUITECTURA"],
    body: "Quería una presencia digital que se saliera de las plantillas genéricas. Para conseguirlo construí este portfolio desde cero, centrado en el rendimiento, en una tipografía variable que reacciona al cursor y al scroll, y en animaciones ligadas al scroll con GSAP. La arquitectura usa el App Router de Next.js para un buen SEO y cargas rápidas.",
    stack: stacks.portfolio,
    stats: [
      ["100", "Lighthouse escritorio"],
      ["0", "Saltos de diseño"],
      ["2", "Idiomas"],
      ["2", "Temas"],
    ],
    links: links.portfolio,
    media: { kind: "desktop", ...shots.portfolio },
  },
  {
    id: "lydia",
    n: "05",
    title: "LYDIA PSICOLOGÍA",
    summary: "Web para la consulta de una psicóloga, diseñada para una clienta real y centrada en transmitir cercanía, confianza y conseguir pacientes.",
    heading: ["EL ", "RETO", ""],
    body: "Una psicóloga necesitaba una presencia web que transmitiera confianza, cercanía y profesionalidad desde el primer vistazo. La web debía cumplir el RGPD, con páginas claras de privacidad, aviso legal y cookies, y estar optimizada para SEO para atraer pacientes de forma orgánica.",
    stack: stacks.lydia,
    stats: [
      ["Real", "Clienta"],
      ["RGPD", "Cumplido"],
      ["4", "Páginas legales"],
      ["SSG", "Renderizado"],
    ],
    links: links.lydia,
    media: { kind: "desktop", ...shots.lydia },
  },
];

const journey: JourneyItem[] = [
  { years: "2016–2020", title: "Grado en Traducción e Interpretación", place: "Universidad", body: "Los idiomas como oficio: inglés C1, francés B1 y alemán A2." },
  { years: "2021–2024", title: "Dependiente", place: "Real Madrid Store · Legends Hospitality", body: "Atención al cliente y trabajo en equipo, todos los días." },
  { years: "2024–2025", title: "Encargado de tienda", place: "Real Madrid Store · Legends Hospitality", body: "Dirección y coordinación de equipos de hasta 20 personas." },
  { years: "2024–2026", title: "Desarrollo de Aplicaciones Multiplataforma (DAM)", place: "Universidad Internacional de La Rioja", body: "Java, SQL y Python, y después desarrollo web y móvil moderno." },
  { years: "2025–2026", title: "Prácticas de desarrollo full stack", place: "Proyecto confidencial", body: "En un equipo de desarrollo, frontend y backend, sobre un producto real." },
  { years: "Hoy", title: "Programador Java Junior", place: "Puesto actual", body: "Java y Spring Boot, junto con Power BI, Jaspersoft Studio y DocPath. En paralelo sigo desarrollando Encuadre y Recmnd.", now: true },
];

const skillGroups: SkillGroup[] = [
  {
    title: "FRONTEND",
    body: "Interfaces robustas, escalables y con tipado estricto, construidas como sistemas de componentes fáciles de mantener. Uno la lógica compleja con una experiencia de uso fluida, tanto en SPA como en aplicaciones con renderizado en servidor.",
    tools: ["React", "Next.js", "React Native", "Angular", "TypeScript", "JavaScript"],
  },
  {
    title: "ESTILOS Y ANIMACIÓN",
    body: "Interfaces cuidadas al píxel, animaciones a 60 fps y diseños adaptables.",
    tools: ["Tailwind CSS", "GSAP", "Framer Motion", "Bootstrap 5", "Vanilla CSS"],
  },
  {
    title: "BACKEND Y HERRAMIENTAS",
    body: "",
    tools: ["Java", "Spring Boot", "NestJS", "Python", "FastAPI", "PostgreSQL", "Supabase", "Docker", "APIs REST"],
  },
  {
    title: "DATOS E INFORMES",
    body: "",
    tools: ["Power BI", "Jaspersoft Studio", "DocPath", "SQL"],
  },
  { title: "APRENDIENDO AHORA", body: "", tools: ["RAG (Retrieval-Augmented Generation)", "Integración de IA y LLM", "Java (en profundidad)"] },
  { title: "IDIOMAS", body: "", tools: ["Español · nativo", "Inglés · C1", "Francés · B1", "Alemán · A2"] },
];

export const es: Dictionary = {
  meta: {
    title: "Mario Ortega | Desarrollador Full Stack",
    description: "Desarrollador full stack junior en Madrid. React, Next.js, React Native, Spring Boot y Python. Proyectos, trayectoria y contacto.",
    aboutTitle: "Sobre mí | Mario Ortega",
    aboutDescription: "De dirigir equipos de hasta 20 personas en tienda al desarrollo full stack.",
  },
  nav: {
    work: "Proyectos",
    journey: "Trayectoria",
    skills: "Habilidades",
    about: "Sobre mí",
    contact: "Contacto",
    theme: "Cambiar tema",
    menu: "Abrir menú",
    switchTo: "English",
    switchToShort: "EN",
  },
  hero: {
    role: "Desarrollador de software full stack | Junior",
    tagline: "Convierto requisitos de negocio complejos en experiencias web escalables y de alto rendimiento. Desarrollador full stack que une el código limpio con el impacto real.",
    available: "Programador Java junior",
    where: "En activo · Madrid",
    cv: "Descargar CV",
  },
  work: {
    heading: "PROYECTOS",
    dev: "En desarrollo",
    confidential: "Confidencial",
    site: "Ver web",
    code: "Código",
    stack: ["LAS ", "TECNOLOGÍAS"],
    redacted: "Bajo acuerdo de confidencialidad. Aquí no se muestra nada del producto.",
    projects,
  },
  journey: { heading: "TRAYECTORIA", items: journey },
  skills: { heading: "HABILIDADES", groups: skillGroups, arsenal },
  contact: {
    lines: ["CONSTRUYAMOS", "ALGO", "EXTRAORDINARIO"],
    label: "Construyamos algo extraordinario",
    body: "Tanto si tienes un proyecto en mente como si buscas un desarrollador full stack para tu equipo o solo quieres saludar, mi bandeja de entrada está siempre abierta.",
    form: {
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando",
      sent: "Gracias, tu mensaje ya está en camino. Te responderé pronto a tu email.",
      invalid: "Escribe tu nombre, un email válido y un mensaje de al menos 10 caracteres.",
      failed: "No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbeme directamente a",
      again: "Enviar otro",
    },
    direct: "O escríbeme directamente",
    copy: "Copiar email",
    copied: "Copiado",
    cv: "Descargar CV",
  },
  footer: { rights: "© 2026 MARIO ORTEGA. TODOS LOS DERECHOS RESERVADOS." },
  about: {
    lines: ["MÁS ALLÁ", "DEL CÓDIGO"],
    label: "Más allá del código",
    intro: "Soy programador Java junior, titulado en Desarrollo de Aplicaciones Multiplataforma y con unas prácticas full stack a mis espaldas, y trabajo a diario con Java y Spring Boot. Además de una base técnica sólida, aporto experiencia demostrada en liderazgo y trabajo en equipo de mi carrera anterior, donde dirigí equipos de hasta 20 personas. Mi forma analítica de pensar me ayuda a unir los requisitos de negocio con un código escalable y fácil de mantener.",
    blocks: [
      {
        title: "Un nuevo capítulo",
        body: "Después de terminar mis estudios de desarrollo de software y unas prácticas full stack, ahora trabajo como programador Java junior con Spring Boot, Power BI, Jaspersoft Studio y DocPath. Mantengo una mirada fresca y muchas ganas de aprender, y no cierro la puerta a ninguna especialidad, ya sea pulir el frontend, la arquitectura de backend o la infraestructura cloud.",
      },
      {
        title: "Liderazgo y equipo",
        body: "Antes de dedicarme a la programación construí una carrera en la que fui ascendiendo gracias a la responsabilidad y la constancia, hasta dirigir equipos de hasta 20 personas. Esa experiencia me dio habilidades muy valiosas: resolver conflictos, liderar con empatía, coordinarme con otras áreas y mantener la moral del equipo bajo presión.",
      },
      {
        title: "La pieza que falta",
        body: "Unir mi experiencia demostrada en responsabilidad y liderazgo con mis nuevas habilidades técnicas me hace un perfil diferente. No me limito a escribir código: entiendo cómo funcionan los equipos, el ciclo de vida de un proyecto y cómo alinear el trabajo de cada uno con los objetivos de negocio. Construyamos algo extraordinario juntos.",
      },
    ],
    cta: "Hablemos",
  },
  cvFile: "/cv/Mario-Ortega-CV-ES.pdf",
};
