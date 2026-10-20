export interface PersonalInfo {
  fullName: string
  roleTitle?: string
  location: string
  phone: string
  email: string
  linkedinUrl: string
  linkedinLabel: string
  githubUrl: string
  githubLabel: string
  portfolioUrl?: string
  portfolioLabel?: string
}

export interface SkillCategory {
  id: string
  name: string
  skills: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  bullets: string[]
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  period: string
}

export interface CustomSectionItem {
  id: string
  title: string
  content: string
}

export type LayoutTemplate = 'classic' | 'sidebar' | 'minimal'
export type HeaderAlignment = 'center' | 'left' | 'split'
export type SectionTitleStyle = 'line' | 'accent-bar' | 'badge' | 'minimal'
export type SkillsDisplayStyle = 'list' | 'tags' | 'cards' | 'bullets'
export type EducationDisplayStyle = 'standard' | 'badge' | 'bordered'
export type FontFamilyChoice = 'sans' | 'roboto' | 'outfit' | 'serif' | 'mono'
export type FontSizeChoice = 'compact' | 'base' | 'large'

export interface ThemeSettings {
  primaryColor: string
  layoutTemplate: LayoutTemplate
  headerAlignment: HeaderAlignment
  showContactIcons: boolean
  sectionTitleStyle: SectionTitleStyle
  skillsDisplayStyle: SkillsDisplayStyle
  educationDisplayStyle?: EducationDisplayStyle
  fontFamily: FontFamilyChoice
  fontSize: FontSizeChoice
  density: 'compact' | 'normal' | 'spacious'
  showDividers: boolean
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  skillCategories: SkillCategory[]
  experiences: ExperienceItem[]
  education: EducationItem[]
  customSections: CustomSectionItem[]
  theme: ThemeSettings
}
