/**
 * Timeline Configuration Data
 *
 * This file contains all timeline events for the portfolio.
 * Events are defined with overlapping dates to test branch/merge functionality.
 */

import type { TimelineEvent } from '../components/Timeline/types';

/**
 * Timeline events configuration
 *
 * Test scenarios covered:
 * - Overlapping education + internship (events 1-2)
 * - Full-time job overlapping with side projects (events 3-5)
 * - Multiple concurrent freelance projects (events 6-7)
 * - Gap period / sabbatical (event 8)
 * - Current "present" entry (events 9-10)
 */
// export const timelineEventsTest: TimelineEvent[] = [
//   // ========================================================================
//   // Education Period (2018-2022)
//   // ========================================================================
//   {
//     id: 'university',
//     title: 'Computer Science Degree',
//     startDate: { month: 9, year: 2018 },
//     endDate: { month: 5, year: 2022 },
//     category: 'education',
//     group: 'education-work',
//     colorIndex: 3, // Dark blue
//     description: 'Bachelor of Science in Computer Science with focus on software engineering',
//     body: {
//       component: 'ExampleEducation1',
//       props: {
//         degree: 'B.S. Computer Science',
//         school: 'State University',
//       },
//     },
//   },

//   // Internship overlapping with education (branch scenario)
//   {
//     id: 'internship-1',
//     title: 'Software Engineering Intern',
//     startDate: { month: 6, year: 2020 },
//     endDate: { month: 8, year: 2020 },
//     category: 'work',
//     group: 'education-work',
//     colorIndex: 0, // Red
//     description: 'Summer internship at tech startup building React applications',
//     body: {
//       component: 'ExampleWork1',
//       props: {
//         company: 'TechStartup Inc.',
//         role: 'Software Engineering Intern',
//       },
//     },
//   },

//   // Second internship overlapping with education
//   {
//     id: 'internship-2',
//     title: 'Backend Developer Intern',
//     startDate: { month: 6, year: 2021 },
//     endDate: { month: 8, year: 2021 },
//     category: 'work',
//     group: 'education-work',
//     colorIndex: 1, // Teal
//     description: 'Summer internship focused on Node.js microservices architecture',
//     body: {
//       component: 'ExampleWork2',
//       props: {
//         company: 'Enterprise Corp',
//         role: 'Backend Developer Intern',
//       },
//     },
//   },

//   // ========================================================================
//   // First Full-Time Job (2022-2024)
//   // ========================================================================
//   {
//     id: 'first-job',
//     title: 'Full Stack Developer',
//     startDate: { month: 7, year: 2022 },
//     endDate: { month: 3, year: 2024 },
//     category: 'work',
//     colorIndex: 0, // Red
//     description: 'Full stack development with React, Node.js, and PostgreSQL',
//     body: {
//       component: 'ExampleWork1',
//       props: {
//         company: 'Digital Agency Co.',
//         role: 'Full Stack Developer',
//       },
//     },
//   },

//   // Side project overlapping with first job
//   {
//     id: 'side-project-1',
//     title: 'Open Source CLI Tool',
//     startDate: { month: 1, year: 2023 },
//     endDate: { month: 6, year: 2023 },
//     category: 'project',
//     group: 'job-projects',
//     colorIndex: 5, // Purple
//     description: 'Created and maintained an open source command-line tool for developers',
//     body: {
//       component: 'ExampleProject1',
//       props: {
//         name: 'DevCLI',
//         stars: 1200,
//       },
//     },
//   },

//   // Another side project overlapping (test multiple branches)
//   {
//     id: 'side-project-2',
//     title: 'Portfolio Website v1',
//     startDate: { month: 3, year: 2023 },
//     endDate: { month: 5, year: 2023 },
//     category: 'project',
//     group: 'job-projects',
//     colorIndex: 6, // Cyan
//     description: 'First iteration of personal portfolio using Next.js',
//     body: {
//       component: 'ExampleProject2',
//       props: {
//         tech: ['Next.js', 'Tailwind', 'Framer Motion'],
//       },
//     },
//   },

//   // ========================================================================
//   // Freelance Period (2024) - Multiple concurrent projects
//   // ========================================================================
//   {
//     id: 'freelance-1',
//     title: 'E-commerce Platform',
//     startDate: { month: 4, year: 2024 },
//     endDate: { month: 7, year: 2024 },
//     category: 'work',
//     group: 'freelance',
//     colorIndex: 4, // Orange
//     description: 'Built custom e-commerce solution for retail client',
//     body: {
//       component: 'ExampleWork2',
//       props: {
//         company: 'Freelance Client A',
//         role: 'Lead Developer',
//       },
//     },
//   },

//   {
//     id: 'freelance-2',
//     title: 'Mobile App MVP',
//     startDate: { month: 5, year: 2024 },
//     endDate: { month: 8, year: 2024 },
//     category: 'work',
//     group: 'freelance',
//     colorIndex: 8, // Pink
//     description: 'React Native MVP for fitness tracking startup',
//     body: {
//       component: 'ExampleWork1',
//       props: {
//         company: 'Freelance Client B',
//         role: 'Mobile Developer',
//       },
//     },
//   },

//   {
//     id: 'freelance-3',
//     title: 'API Integration Project',
//     startDate: { month: 6, year: 2024 },
//     endDate: { month: 7, year: 2024 },
//     category: 'project',
//     group: 'freelance',
//     colorIndex: 2, // Yellow
//     description: 'Third-party API integrations for SaaS platform',
//     body: {
//       component: 'ExampleProject3',
//       props: {
//         apis: ['Stripe', 'SendGrid', 'Twilio'],
//       },
//     },
//   },

//   // ========================================================================
//   // Gap/Sabbatical Period
//   // ========================================================================
//   {
//     id: 'sabbatical',
//     title: 'Travel & Learning',
//     startDate: { month: 9, year: 2024 },
//     endDate: { month: 11, year: 2024 },
//     category: 'personal',
//     colorIndex: 7, // Mint
//     description: 'Three months traveling and learning new technologies',
//     body: {
//       component: 'ExampleGap',
//       props: {
//         activities: ['Traveled to Japan', 'Learned Rust', 'Contributed to OSS'],
//       },
//     },
//   },

//   // ========================================================================
//   // Current Period (Present)
//   // ========================================================================
//   {
//     id: 'current-job',
//     title: 'Senior Software Engineer',
//     startDate: { month: 12, year: 2024 },
//     endDate: 'present',
//     category: 'work',
//     colorIndex: 0, // Red
//     description: 'Leading frontend architecture at growth-stage startup',
//     body: {
//       component: 'ExampleWork1',
//       props: {
//         company: 'Current Company',
//         role: 'Senior Software Engineer',
//       },
//     },
//   },

//   {
//     id: 'current-project',
//     title: 'Portfolio v2',
//     startDate: { month: 1, year: 2025 },
//     endDate: 'present',
//     category: 'project',
//     group: 'current',
//     colorIndex: 9, // Bright yellow
//     description: 'This portfolio - built with Astro and featuring this timeline!',
//     body: {
//       component: 'ExampleProject1',
//       props: {
//         name: 'Portfolio v2',
//         tech: ['Astro', 'React', 'GSAP'],
//       },
//     },
//   },
// ];

export const timelineEvents: TimelineEvent[] = [
  // ========================================================================
  // Education & Early Career (2015-2019)
  // ========================================================================
  {
    id: 'high-school',
    title: 'High School',
    startDate: { month: 1, year: 2015 },
    endDate: { month: 5, year: 2018 },
    category: 'education',
    colorIndex: 5,
    description: 'Georgia Cyber Academy - 4.1 GPA (4.0 scale)',
    body: {
      component: 'HighSchool',
      props: {},
    },
  },

  {
    id: 'prc-audio-engineer',
    title: 'Audio Engineer @ PRC',
    startDate: { month: 11, year: 2015 },
    endDate: { month: 1, year: 2019 },
    category: 'personal',
    colorIndex: 7,
    description: 'Audio engineer for live services with 300+ attendees',
    body: {
      component: 'PRCAudioEngineer',
      props: {},
    },
  },

  {
    id: 'it-tutor-ggc',
    title: 'IT Tutor @ Georgia Gwinnett College',
    startDate: { month: 1, year: 2019 },
    endDate: { month: 12, year: 2019 },
    category: 'education',
    colorIndex: 4,
    description: 'Tutored at-risk students in programming courses (Java, C#, Python)',
    body: {
      component: 'ITTutorGGC',
      props: {},
    },
  },

  {
    id: 'teaching-assistant-ggc',
    title: 'Teaching Assistant @ Georgia Gwinnett College',
    startDate: { month: 8, year: 2019 },
    endDate: { month: 12, year: 2019 },
    category: 'education',
    colorIndex: 6,
    description: 'Teaching Assistant supporting computer science courses and scrum projects',
    body: {
      component: 'TeachingAssistantGGC',
      props: {},
    },
  },

  // ========================================================================
  // University & First Professional Roles (2019-2022)
  // ========================================================================
  {
    id: 'computer-science-uga',
    title: 'Computer Science @ UGA',
    startDate: { month: 8, year: 2019 },
    endDate: { month: 5, year: 2022 },
    category: 'education',
    colorIndex: 5,
    description: 'Bachelor of Science in Computer Science - Cum Laude',
    body: {
      component: 'ComputerScienceUGA',
      props: {},
    },
  },

  {
    id: 'cto-imperia',
    title: 'CTO @ IMPERIA',
    startDate: { month: 4, year: 2020 },
    endDate: { month: 12, year: 2021 },
    category: 'work',
    colorIndex: 6,
    description: 'Led development team to revamp web and mobile presence using Django and React',
    body: {
      component: 'CTOImperia',
      props: {},
    },
  },

  {
    id: 'swe-carcareers',
    title: 'SWE @ CARCAREERS.COM',
    startDate: { month: 8, year: 2020 },
    endDate: { month: 3, year: 2023 },
    category: 'work',
    colorIndex: 4,
    description: 'Full Stack Software Engineer architecting scalable solutions in a monorepo structure',
    body: {
      component: 'SWECarCareers',
      props: {},
    },
  },

  {
    id: 'gavel-lab-uga',
    title: 'GAVEL Lab Assistant @ UGA',
    startDate: { month: 1, year: 2022 },
    endDate: { month: 3, year: 2023 },
    category: 'education',
    colorIndex: 4,
    description: 'Designed VR environments using Unity and C# for research on virtual environments',
    body: {
      component: 'GAVELLabUGA',
      props: {},
    },
  },

  {
    id: 'swe-intern-ncr',
    title: 'SWE Intern @ NCR Corporation',
    startDate: { month: 5, year: 2022 },
    endDate: { month: 8, year: 2022 },
    category: 'work',
    colorIndex: 7,
    description: 'Summer internship at NCR Corporation',
    body: {
      component: 'SWEInternNCR',
      props: {},
    },
  },

  // ========================================================================
  // Professional Growth (2022-2024)
  // ========================================================================
  {
    id: 'swe-talitrix',
    title: 'SWE @ Talitrix',
    startDate: { month: 8, year: 2022 },
    endDate: { month: 3, year: 2023 },
    category: 'work',
    colorIndex: 8,
    description: 'Developed mission-critical location data infrastructure for electronic monitoring',
    body: {
      component: 'SWETalitrix',
      props: {},
    },
  },

  {
    id: 'emmaus-audio-engineer',
    title: 'Audio Engineer @ Emmaus Church',
    startDate: { month: 11, year: 2022 },
    endDate: 'present',
    category: 'personal',
    colorIndex: 7,
    description: 'Live sound mixing and broadcast/recording for band and spoken word',
    body: {
      component: 'EmmausAudioEngineer',
      props: {},
    },
  },

  {
    id: 'cto-carcareers',
    title: 'CTO @ CARCAREERS.COM',
    startDate: { month: 3, year: 2023 },
    endDate: 'present',
    category: 'work',
    colorIndex: 2,
    description: 'Received equity share and transitioned to leading development strategy',
    body: {
      component: 'CTOCarCareers',
      props: {},
    },
  },

  {
    id: 'swe-weather-company',
    title: 'SWE @ The Weather Company (IBM)',
    startDate: { month: 3, year: 2023 },
    endDate: { month: 6, year: 2024 },
    category: 'work',
    colorIndex: 3,
    description: 'Built high-performance UIs and migrated infrastructure from IBM Cloud to AWS',
    body: {
      component: 'SWEWeatherCompany',
      props: {},
    },
  },

  // ========================================================================
  // Current Roles (2024-Present)
  // ========================================================================
  {
    id: 'swe-ii-ncr-voyix',
    title: 'SWE II @ NCR Voyix',
    startDate: { month: 6, year: 2024 },
    endDate: { month: 8, year: 2025 },
    category: 'work',
    colorIndex: 0,
    description: 'Spearheaded modular federation micro frontend platform architecture',
    body: {
      component: 'SWEIINCRVoyix',
      props: {},
    },
  },

  {
    id: 'frontend-tech-lead-ncr-voyix',
    title: 'SWE II (Frontend Tech Lead) @ NCR Voyix',
    startDate: { month: 8, year: 2025 },
    endDate: 'present',
    category: 'work',
    colorIndex: 0,
    description: 'Leading team of engineers for AI-driven point-of-sale platform',
    body: {
      component: 'FrontendTechLeadNCRVoyix',
      props: {},
    },
  },

  {
    id: 'cto-excelsus-data',
    title: 'CTO @ Excelsus Data',
    startDate: { month: 9, year: 2025 },
    endDate: 'present',
    category: 'work',
    colorIndex: 6,
    description: 'Building pre-employment screening platform with React and Go',
    body: {
      component: 'CTOExcelsusData',
      props: {},
    },
  },
];

/**
 * Get events sorted by start date (chronological order)
 */
export function getChronologicalEvents(): TimelineEvent[] {
  return [...timelineEvents].sort((a, b) => {
    const aDate = a.startDate.year * 12 + a.startDate.month;
    const bDate = b.startDate.year * 12 + b.startDate.month;
    return aDate - bDate;
  });
}
