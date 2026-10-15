import React from 'react'
import type { ResumeData } from '../types/resume'
import { MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react'

interface ResumePreviewProps {
  data: ResumeData
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalInfo, summary, skillCategories, experiences, education, customSections, theme } =
    data

  // Density spacing map
  const spacingClasses = {
    compact: {
      sectionGap: 'mb-3',
      headerGap: 'mb-1.5',
      bulletGap: 'space-y-0.5',
      lineHeight: 'leading-tight',
      headerMargin: 'mb-2.5',
    },
    normal: {
      sectionGap: 'mb-4',
      headerGap: 'mb-2',
      bulletGap: 'space-y-1',
      lineHeight: 'leading-relaxed',
      headerMargin: 'mb-4',
    },
    spacious: {
      sectionGap: 'mb-5',
      headerGap: 'mb-2.5',
      bulletGap: 'space-y-1.5',
      lineHeight: 'leading-normal',
      headerMargin: 'mb-5',
    },
  }[theme.density || 'normal']

  // Font family map
  const fontStyle = {
    sans: 'font-["Inter",sans-serif]',
    roboto: 'font-["Roboto",sans-serif]',
    outfit: 'font-["Outfit",sans-serif]',
    serif: 'font-["Merriweather",serif]',
    mono: 'font-["JetBrains_Mono",monospace]',
  }[theme.fontFamily || 'sans']

  // Base font size map
  const fontSizeClass = {
    compact: 'text-[9pt]',
    base: 'text-[9.5pt]',
    large: 'text-[10.5pt]',
  }[theme.fontSize || 'base']

  // Section title renderer
  const renderSectionTitle = (title: string) => {
    const style = theme.sectionTitleStyle || 'line'

    if (style === 'accent-bar') {
      return (
        <div
          className={`flex items-center ${spacingClasses.headerGap} border-l-3.5 pl-2 py-0.5`}
          style={{ borderColor: theme.primaryColor }}
        >
          <h2
            className="text-[10.5pt] font-bold tracking-wider uppercase"
            style={{ color: theme.primaryColor }}
          >
            {title}
          </h2>
        </div>
      )
    }

    if (style === 'badge') {
      return (
        <div className={`inline-block ${spacingClasses.headerGap}`}>
          <span
            className="text-[9pt] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded"
            style={{
              backgroundColor: `${theme.primaryColor}15`,
              color: theme.primaryColor,
              border: `1px solid ${theme.primaryColor}30`,
            }}
          >
            {title}
          </span>
        </div>
      )
    }

    if (style === 'minimal') {
      return (
        <div className={spacingClasses.headerGap}>
          <h2
            className="text-[10.5pt] font-bold tracking-wider uppercase"
            style={{ color: theme.primaryColor }}
          >
            {title}
          </h2>
        </div>
      )
    }

    // Default 'line' style
    return (
      <div
        className={`flex items-center gap-2 ${spacingClasses.headerGap} border-b pb-0.5`}
        style={{
          borderColor: theme.showDividers ? `${theme.primaryColor}40` : 'transparent',
        }}
      >
        <h2
          className="text-[10.5pt] font-bold tracking-wider uppercase"
          style={{ color: theme.primaryColor }}
        >
          {title}
        </h2>
      </div>
    )
  }

  // Header Contacts renderer
  const renderContacts = (orientation: 'inline' | 'stacked' = 'inline') => {
    const withIcons = theme.showContactIcons

    if (orientation === 'stacked') {
      return (
        <div className="space-y-1.5 text-[8.5pt] text-slate-600">
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              {withIcons && <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />}
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              {withIcons && <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />}
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              {withIcons && <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />}
              <a
                href={`mailto:${personalInfo.email}`}
                style={{ color: theme.primaryColor }}
                className="hover:underline font-medium break-all"
              >
                {personalInfo.email}
              </a>
            </div>
          )}
          {personalInfo.linkedinUrl && (
            <div className="flex items-center gap-2">
              {withIcons && <ExternalLink className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />}
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: theme.primaryColor }}
                className="hover:underline font-medium"
              >
                {personalInfo.linkedinLabel || 'LinkedIn'}
              </a>
            </div>
          )}
          {personalInfo.githubUrl && (
            <div className="flex items-center gap-2">
              {withIcons && <ExternalLink className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />}
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: theme.primaryColor }}
                className="hover:underline font-medium"
              >
                {personalInfo.githubLabel || 'GitHub'}
              </a>
            </div>
          )}
          {personalInfo.portfolioUrl && (
            <div className="flex items-center gap-2">
              {withIcons && <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />}
              <a
                href={personalInfo.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: theme.primaryColor }}
                className="hover:underline font-medium"
              >
                {personalInfo.portfolioLabel || 'Portfólio'}
              </a>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[8.5pt] text-slate-600">
        {personalInfo.location && (
          <span className="inline-flex items-center gap-1">
            {withIcons && <MapPin className="w-3 h-3" style={{ color: theme.primaryColor }} />}
            {personalInfo.location}
          </span>
        )}

        {personalInfo.location && personalInfo.phone && !withIcons && <span className="text-slate-300">|</span>}
        {personalInfo.phone && (
          <span className="inline-flex items-center gap-1">
            {withIcons && <Phone className="w-3 h-3" style={{ color: theme.primaryColor }} />}
            {personalInfo.phone}
          </span>
        )}

        {(personalInfo.phone || personalInfo.location) && personalInfo.email && !withIcons && (
          <span className="text-slate-300">|</span>
        )}
        {personalInfo.email && (
          <span className="inline-flex items-center gap-1">
            {withIcons && <Mail className="w-3 h-3" style={{ color: theme.primaryColor }} />}
            <a
              href={`mailto:${personalInfo.email}`}
              style={{ color: theme.primaryColor }}
              className="hover:underline font-medium"
            >
              {personalInfo.email}
            </a>
          </span>
        )}

        {personalInfo.linkedinUrl && (
          <>
            {!withIcons && <span className="text-slate-300">|</span>}
            <span className="inline-flex items-center gap-1">
              {withIcons && <ExternalLink className="w-3 h-3" style={{ color: theme.primaryColor }} />}
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: theme.primaryColor }}
                className="hover:underline font-medium"
              >
                {personalInfo.linkedinLabel || 'LinkedIn'}
              </a>
            </span>
          </>
        )}

        {personalInfo.githubUrl && (
          <>
            {!withIcons && <span className="text-slate-300">|</span>}
            <span className="inline-flex items-center gap-1">
              {withIcons && <ExternalLink className="w-3 h-3" style={{ color: theme.primaryColor }} />}
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: theme.primaryColor }}
                className="hover:underline font-medium"
              >
                {personalInfo.githubLabel || 'GitHub'}
              </a>
            </span>
          </>
        )}

        {personalInfo.portfolioUrl && (
          <>
            {!withIcons && <span className="text-slate-300">|</span>}
            <span className="inline-flex items-center gap-1">
              {withIcons && <Globe className="w-3 h-3" style={{ color: theme.primaryColor }} />}
              <a
                href={personalInfo.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: theme.primaryColor }}
                className="hover:underline font-medium"
              >
                {personalInfo.portfolioLabel || 'Portfólio'}
              </a>
            </span>
          </>
        )}
      </div>
    )
  }

  // Skills renderer (List or Tags)
  const renderSkills = () => {
    if (!skillCategories || skillCategories.length === 0) return null

    if (theme.skillsDisplayStyle === 'tags') {
      return (
        <div className="space-y-2.5">
          {skillCategories.map((cat) => {
            const tags = cat.skills
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
            return (
              <div key={cat.id} className="space-y-1">
                <span className="font-semibold text-slate-800 text-[9pt] block">
                  {cat.name}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[8.5pt] font-medium"
                      style={{
                        backgroundColor: `${theme.primaryColor}12`,
                        color: theme.primaryColor,
                        border: `1px solid ${theme.primaryColor}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <ul className={`list-disc list-outside pl-4 text-slate-700 ${spacingClasses.bulletGap}`}>
        {skillCategories.map((item) => (
          <li key={item.id} className="pl-1 leading-snug">
            <strong className="font-semibold text-slate-900">{item.name}:</strong>{' '}
            <span>{item.skills}</span>
          </li>
        ))}
      </ul>
    )
  }

  // ==========================================
  // TEMPLATE 1: CLASSIC (Executive Standard)
  // ==========================================
  if (theme.layoutTemplate === 'classic' || !theme.layoutTemplate) {
    const isLeftAligned = theme.headerAlignment === 'left'
    const isSplit = theme.headerAlignment === 'split'

    return (
      <div
        id="resume-to-print"
        className={`resume-paper text-slate-800 ${fontStyle} ${fontSizeClass} ${spacingClasses.lineHeight} bg-white transition-all`}
      >
        {/* Header / Personal Info */}
        <div
          className={`resume-header ${
            isLeftAligned
              ? 'text-left'
              : isSplit
              ? 'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'
              : 'text-center'
          } ${spacingClasses.headerMargin}`}
        >
          <div>
            <h1 className="text-[23pt] font-extrabold tracking-tight text-slate-900 mb-0.5 leading-tight">
              {personalInfo.fullName || 'Seu Nome Completo'}
            </h1>
            {personalInfo.roleTitle && (
              <p
                className="text-[11pt] font-semibold tracking-wide mb-1"
                style={{ color: theme.primaryColor }}
              >
                {personalInfo.roleTitle}
              </p>
            )}
          </div>
          <div className={isSplit ? 'text-right' : ''}>
            {renderContacts(isSplit ? 'stacked' : 'inline')}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <section className={`${spacingClasses.sectionGap} page-break-avoid`}>
            {renderSectionTitle('Resumo Profissional')}
            <p className="text-justify text-slate-700 leading-normal">{summary}</p>
          </section>
        )}

        {/* Technical Skills */}
        {skillCategories && skillCategories.length > 0 && (
          <section className={`${spacingClasses.sectionGap} page-break-avoid`}>
            {renderSectionTitle('Habilidades Técnicas')}
            {renderSkills()}
          </section>
        )}

        {/* Professional Experience */}
        {experiences && experiences.length > 0 && (
          <section className={`${spacingClasses.sectionGap} page-break-avoid`}>
            {renderSectionTitle('Experiência Profissional')}
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="page-break-avoid">
                  <div className="text-slate-900 leading-snug mb-1">
                    <span className="font-bold text-[10pt]">{exp.role}</span>
                    <span className="text-slate-400 mx-1.5 font-normal">|</span>
                    <span className="font-semibold text-slate-800">{exp.company}</span>
                    <span className="text-slate-600 text-[9pt] ml-1">({exp.period})</span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className={`list-disc list-outside pl-4 text-slate-700 ${spacingClasses.bulletGap}`}>
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="pl-1 leading-snug">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className={`${spacingClasses.sectionGap} page-break-avoid`}>
            {renderSectionTitle('Formação Acadêmica')}
            <ul className={`list-disc list-outside pl-4 text-slate-700 ${spacingClasses.bulletGap}`}>
              {education.map((edu) => (
                <li key={edu.id} className="pl-1 leading-snug">
                  <strong className="font-semibold text-slate-900">{edu.degree}</strong>
                  <span className="text-slate-600"> — {edu.institution}</span>
                  <span className="text-slate-400 mx-1.5">|</span>
                  <span className="text-slate-600 font-medium">{edu.period}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Custom Sections */}
        {customSections &&
          customSections.map((sec) => (
            <section key={sec.id} className={`${spacingClasses.sectionGap} page-break-avoid`}>
              {renderSectionTitle(sec.title)}
              <div className="text-slate-700 leading-snug whitespace-pre-line pl-1">
                {sec.content}
              </div>
            </section>
          ))}
      </div>
    )
  }

  // ==========================================
  // TEMPLATE 2: SIDEBAR (Two-Column Modern Layout)
  // ==========================================
  if (theme.layoutTemplate === 'sidebar') {
    return (
      <div
        id="resume-to-print"
        className={`resume-paper text-slate-800 ${fontStyle} ${fontSizeClass} ${spacingClasses.lineHeight} bg-white transition-all`}
      >
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column (35%) */}
          <div className="col-span-4 border-r border-slate-100 pr-4 space-y-4">
            {/* Contacts in Sidebar */}
            <div>
              {renderSectionTitle('Contato')}
              {renderContacts('stacked')}
            </div>

            {/* Skills in Sidebar */}
            {skillCategories && skillCategories.length > 0 && (
              <div>
                {renderSectionTitle('Habilidades')}
                {renderSkills()}
              </div>
            )}

            {/* Education in Sidebar */}
            {education && education.length > 0 && (
              <div>
                {renderSectionTitle('Formação')}
                <div className="space-y-2 text-[8.5pt]">
                  {education.map((edu) => (
                    <div key={edu.id} className="leading-snug">
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-slate-600">{edu.institution}</div>
                      <div className="text-slate-400 text-[8pt]">{edu.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom sections in Sidebar */}
            {customSections &&
              customSections.map((sec) => (
                <div key={sec.id}>
                  {renderSectionTitle(sec.title)}
                  <div className="text-[8.5pt] text-slate-700 whitespace-pre-line leading-snug">
                    {sec.content}
                  </div>
                </div>
              ))}
          </div>

          {/* Right Column (65%) */}
          <div className="col-span-8 pl-1">
            {/* Header */}
            <div className={`resume-header text-left ${spacingClasses.headerMargin} border-b pb-3 border-slate-100`}>
              <h1 className="text-[25pt] font-extrabold tracking-tight text-slate-900 leading-tight">
                {personalInfo.fullName || 'Seu Nome Completo'}
              </h1>
              {personalInfo.roleTitle && (
                <p
                  className="text-[11pt] font-bold tracking-wide mt-0.5"
                  style={{ color: theme.primaryColor }}
                >
                  {personalInfo.roleTitle}
                </p>
              )}
            </div>

            {/* Summary */}
            {summary && (
              <section className={`${spacingClasses.sectionGap} page-break-avoid`}>
                {renderSectionTitle('Resumo Profissional')}
                <p className="text-justify text-slate-700 leading-normal">{summary}</p>
              </section>
            )}

            {/* Experience */}
            {experiences && experiences.length > 0 && (
              <section className={`${spacingClasses.sectionGap} page-break-avoid`}>
                {renderSectionTitle('Experiência Profissional')}
                <div className="space-y-3.5">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="page-break-avoid">
                      <div className="text-slate-900 leading-snug mb-1">
                        <span className="font-bold text-[10pt]">{exp.role}</span>
                        <div className="text-slate-600 text-[9pt]">
                          <span className="font-medium text-slate-800">{exp.company}</span>
                          <span className="text-slate-400 mx-1">•</span>
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className={`list-disc list-outside pl-4 text-slate-700 ${spacingClasses.bulletGap}`}>
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx} className="pl-1 leading-snug">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // TEMPLATE 3: MINIMAL (Tech Clean Minimalist)
  // ==========================================
  return (
    <div
      id="resume-to-print"
      className={`resume-paper text-slate-800 ${fontStyle} ${fontSizeClass} ${spacingClasses.lineHeight} bg-white transition-all`}
    >
      {/* Minimal Header */}
      <div className={`resume-header text-left ${spacingClasses.headerMargin} pb-3 border-b-2`} style={{ borderColor: theme.primaryColor }}>
        <h1 className="text-[26pt] font-black tracking-tight text-slate-950 mb-0.5 leading-none">
          {personalInfo.fullName || 'Seu Nome Completo'}
        </h1>
        {personalInfo.roleTitle && (
          <p
            className="text-[11pt] font-medium tracking-wider uppercase mb-2"
            style={{ color: theme.primaryColor }}
          >
            {personalInfo.roleTitle}
          </p>
        )}
        <div>{renderContacts('inline')}</div>
      </div>

      {/* Summary */}
      {summary && (
        <section className={`${spacingClasses.sectionGap} page-break-avoid`}>
          {renderSectionTitle('Sobre')}
          <p className="text-slate-700 leading-normal">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <section className={`${spacingClasses.sectionGap} page-break-avoid`}>
          {renderSectionTitle('Experiência')}
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-0.5">
                  <span className="font-bold text-[10pt] text-slate-900">{exp.role}</span>
                  <span className="text-[8.5pt] font-mono text-slate-500">{exp.period}</span>
                </div>
                <div className="text-[9pt] font-medium text-slate-700 mb-1">{exp.company}</div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className={`list-disc list-outside pl-4 text-slate-700 ${spacingClasses.bulletGap}`}>
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="pl-1 leading-snug">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {skillCategories && skillCategories.length > 0 && (
        <section className={`${spacingClasses.sectionGap} page-break-avoid`}>
          {renderSectionTitle('Habilidades Técnicas')}
          {renderSkills()}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className={`${spacingClasses.sectionGap} page-break-avoid`}>
          {renderSectionTitle('Formação')}
          <ul className={`list-disc list-outside pl-4 text-slate-700 ${spacingClasses.bulletGap}`}>
            {education.map((edu) => (
              <li key={edu.id} className="pl-1 leading-snug">
                <strong className="font-semibold text-slate-900">{edu.degree}</strong>
                <span className="text-slate-600"> — {edu.institution}</span>
                <span className="text-slate-400 mx-1.5">|</span>
                <span className="text-slate-600 font-medium">{edu.period}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Custom Sections */}
      {customSections &&
        customSections.map((sec) => (
          <section key={sec.id} className={`${spacingClasses.sectionGap} page-break-avoid`}>
            {renderSectionTitle(sec.title)}
            <div className="text-slate-700 leading-snug whitespace-pre-line pl-1">
              {sec.content}
            </div>
          </section>
        ))}
    </div>
  )
}
