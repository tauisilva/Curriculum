import type { ResumeData } from '../types/resume'

export const initialResume: ResumeData = {
  personalInfo: {
    fullName: 'Seu Nome Completo',
    roleTitle: 'Desenvolvedor Full Stack',
    location: 'Cidade - UF',
    phone: '+55 (00) 00000-0000',
    email: 'seu.email@exemplo.com',
    linkedinUrl: 'https://linkedin.com/in/seu-perfil',
    linkedinLabel: 'LinkedIn',
    githubUrl: 'https://github.com/seu-usuario',
    githubLabel: 'GitHub',
    portfolioUrl: '',
    portfolioLabel: 'Portfólio',
  },
  summary:
    'Desenvolvedor Full Stack com sólida experiência no desenvolvimento de soluções de ponta a ponta. Experiência na construção de APIs RESTful e microsserviços modernos, integração com bancos de dados relacionais e NoSQL, mensageria e boas práticas de arquitetura de software (Clean Code, SOLID).',
  skillCategories: [
    {
      id: '1',
      name: 'Linguagens & Backend',
      skills: 'Java, C#, TypeScript, JavaScript, Spring Boot, Node.js, REST APIs',
    },
    {
      id: '2',
      name: 'Frontend & Mobile',
      skills: 'Vue.js, React, Angular, HTML5, CSS3, TailwindCSS',
    },
    {
      id: '3',
      name: 'Bancos de Dados',
      skills: 'PostgreSQL, MySQL, MongoDB, Redis',
    },
    {
      id: '4',
      name: 'DevOps & Ferramentas',
      skills: 'Git, Docker, CI/CD, Linux',
    },
  ],
  experiences: [
    {
      id: '1',
      role: 'Desenvolvedor Full Stack',
      company: 'Nome da Empresa',
      period: 'Jan/2023 – Presente',
      bullets: [
        'Desenvolvimento e sustentação de microsserviços e APIs com foco em escalabilidade e performance.',
        'Construção de interfaces de usuário responsivas e modulares utilizando tecnologias modernas.',
        'Implementação de testes unitários e participação em pipelines de CI/CD em metodologia ágil.',
      ],
    },
    {
      id: '2',
      role: 'Desenvolvedor Júnior / Estagiário',
      company: 'Empresa Anterior',
      period: 'Jan/2022 – Dez/2022',
      bullets: [
        'Apoio no desenvolvimento de funcionalidades e manutenção contínua de plataformas web.',
        'Correção de bugs e documentação técnica de endpoints.',
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Bacharelado em Ciência da Computação / Engenharia de Software',
      institution: 'Nome da Universidade / Faculdade',
      period: 'Concluído em 2024',
    },
  ],
  customSections: [],
  theme: {
    primaryColor: '#0284c7', // Azul moderno
    layoutTemplate: 'classic',
    headerAlignment: 'center',
    showContactIcons: false,
    sectionTitleStyle: 'line',
    skillsDisplayStyle: 'list',
    educationDisplayStyle: 'standard',
    fontFamily: 'sans',
    fontSize: 'base',
    density: 'normal',
    showDividers: true,
  },
}
