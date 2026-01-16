/**
 * Event Components Registry
 *
 * Maps component names from timeline config to actual Astro components.
 * Used by TimelineModal to render event body content.
 *
 * To add a new event component:
 * 1. Create the component in src/components/TimelineEvents/
 * 2. Import it here
 * 3. Add it to the eventComponents map
 */

// Note: This file provides the mapping structure.
// In Astro, we'll use dynamic imports or a switch statement in the modal
// since React components can't directly import Astro components.

/**
 * Component name to display name mapping
 * Used for fallback rendering when component isn't found
 */
export const componentDisplayNames: Record<string, string> = {
  // Example components (can be removed if not needed)
  ExampleWork1: 'Work Experience',
  ExampleWork2: 'Work Experience',
  ExampleEducation1: 'Education',
  ExampleProject1: 'Project',
  ExampleProject2: 'Project',
  ExampleProject3: 'Project',
  ExamplePersonal1: 'Personal',
  ExampleGap: 'Personal Journey',

  // Education components
  HighSchool: 'Education',
  ITTutorGGC: 'Education',
  TeachingAssistantGGC: 'Education',
  ComputerScienceUGA: 'Education',
  GAVELLabUGA: 'Research',

  // Work components
  CTOImperia: 'Work Experience',
  SWECarCareers: 'Work Experience',
  CTOCarCareers: 'Work Experience',
  SWEInternNCR: 'Work Experience',
  SWETalitrix: 'Work Experience',
  SWEWeatherCompany: 'Work Experience',
  SWEIINCRVoyix: 'Work Experience',
  FrontendTechLeadNCRVoyix: 'Work Experience',
  CTOExcelsusData: 'Work Experience',

  // Personal components
  PRCAudioEngineer: 'Personal',
  EmmausAudioEngineer: 'Personal',
};

/**
 * Component descriptions for accessibility
 */
export const componentDescriptions: Record<string, string> = {
  // Example components
  ExampleWork1: 'Details about work experience and responsibilities',
  ExampleWork2: 'Details about work experience and responsibilities',
  ExampleEducation1: 'Educational background and achievements',
  ExampleProject1: 'Project details and technical stack',
  ExampleProject2: 'Project details and technical stack',
  ExampleProject3: 'Project details and technical stack',
  ExamplePersonal1: 'Personal milestone or achievement',
  ExampleGap: 'Career break or personal journey',

  // Education components
  HighSchool: 'High school education at Georgia Cyber Academy',
  ITTutorGGC: 'IT Tutoring at Georgia Gwinnett College',
  TeachingAssistantGGC: 'Teaching Assistant role at Georgia Gwinnett College',
  ComputerScienceUGA: 'Computer Science degree at University of Georgia',
  GAVELLabUGA: 'Research assistant at GAVEL Lab, University of Georgia',

  // Work components
  CTOImperia: 'CTO role at IMPERIA',
  SWECarCareers: 'Full Stack Software Engineer at CARCAREERS.COM',
  CTOCarCareers: 'CTO role at CARCAREERS.COM',
  SWEInternNCR: 'Software Engineering Internship at NCR Corporation',
  SWETalitrix: 'Software Engineer at Talitrix',
  SWEWeatherCompany: 'Software Engineer at The Weather Company (IBM)',
  SWEIINCRVoyix: 'Software Engineer II at NCR Voyix - Platform Phase',
  FrontendTechLeadNCRVoyix: 'Frontend Tech Lead at NCR Voyix',
  CTOExcelsusData: 'CTO at Excelsus Data',

  // Personal components
  PRCAudioEngineer: 'Audio Engineer at PRC',
  EmmausAudioEngineer: 'Audio Engineer at Emmaus Church',
};

/**
 * Available component names (for type safety)
 */
export type EventComponentName =
  // Example components
  | 'ExampleWork1'
  | 'ExampleWork2'
  | 'ExampleEducation1'
  | 'ExampleProject1'
  | 'ExampleProject2'
  | 'ExampleProject3'
  | 'ExamplePersonal1'
  | 'ExampleGap'
  // Education components
  | 'HighSchool'
  | 'ITTutorGGC'
  | 'TeachingAssistantGGC'
  | 'ComputerScienceUGA'
  | 'GAVELLabUGA'
  // Work components
  | 'CTOImperia'
  | 'SWECarCareers'
  | 'CTOCarCareers'
  | 'SWEInternNCR'
  | 'SWETalitrix'
  | 'SWEWeatherCompany'
  | 'SWEIINCRVoyix'
  | 'FrontendTechLeadNCRVoyix'
  | 'CTOExcelsusData'
  // Personal components
  | 'PRCAudioEngineer'
  | 'EmmausAudioEngineer';

/**
 * Check if a component name is valid
 */
export function isValidComponent(name: string): name is EventComponentName {
  return name in componentDisplayNames;
}
