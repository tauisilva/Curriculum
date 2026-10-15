import React, { useState } from 'react'
import {
  User,
  FileText,
  Code2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  Palette,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import type {
  ResumeData,
  PersonalInfo,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  CustomSectionItem,
  ThemeSettings,
} from '../types/resume'

interface ResumeEditorProps {
  data: ResumeData
  onChange: (newData: ResumeData) => void
}

type TabKey = 'personal' | 'summary' | 'skills' | 'experience' | 'education' | 'custom' | 'theme'

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('personal')
  const [expandedExpId, setExpandedExpId] = useState<string | null>(
    data.experiences[0]?.id || null
  )

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    })
  }

  const updateSummary = (summary: string) => {
    onChange({ ...data, summary })
  }

  // Skills handlers
  const updateSkillCategory = (id: string, field: 'name' | 'skills', value: string) => {
    const updated = data.skillCategories.map((cat) =>
      cat.id === id ? { ...cat, [field]: value } : cat
    )
    onChange({ ...data, skillCategories: updated })
  }

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: Date.now().toString(),
      name: 'Nova Categoria',
      skills: 'Tecnologia 1, Tecnologia 2',
    }
    onChange({ ...data, skillCategories: [...data.skillCategories, newCategory] })
  }

  const removeSkillCategory = (id: string) => {
    onChange({
      ...data,
      skillCategories: data.skillCategories.filter((c) => c.id !== id),
    })
  }

  // Experience handlers
  const updateExperience = (
    id: string,
    field: 'role' | 'company' | 'period',
    value: string
  ) => {
    const updated = data.experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    )
    onChange({ ...data, experiences: updated })
  }

  const updateExperienceBullet = (expId: string, index: number, value: string) => {
    const updated = data.experiences.map((exp) => {
      if (exp.id !== expId) return exp
      const newBullets = [...exp.bullets]
      newBullets[index] = value
      return { ...exp, bullets: newBullets }
    })
    onChange({ ...data, experiences: updated })
  }

  const addExperienceBullet = (expId: string) => {
    const updated = data.experiences.map((exp) => {
      if (exp.id !== expId) return exp
      return { ...exp, bullets: [...exp.bullets, 'Nova responsabilidade ou conquista'] }
    })
    onChange({ ...data, experiences: updated })
  }

  const removeExperienceBullet = (expId: string, index: number) => {
    const updated = data.experiences.map((exp) => {
      if (exp.id !== expId) return exp
      return { ...exp, bullets: exp.bullets.filter((_, i) => i !== index) }
    })
    onChange({ ...data, experiences: updated })
  }

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      role: 'Novo Cargo',
      company: 'Nome da Empresa',
      period: 'Mês/Ano – Presente',
      bullets: ['Descrição da principal atividade realizada.'],
    }
    onChange({ ...data, experiences: [newExp, ...data.experiences] })
    setExpandedExpId(newExp.id)
  }

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter((e) => e.id !== id),
    })
  }

  // Education handlers
  const updateEducation = (
    id: string,
    field: 'degree' | 'institution' | 'period',
    value: string
  ) => {
    const updated = data.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    )
    onChange({ ...data, education: updated })
  }

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: Date.now().toString(),
      degree: 'Nome do Curso / Graduação',
      institution: 'Instituição de Ensino',
      period: 'Concluído em 2024',
    }
    onChange({ ...data, education: [...data.education, newEdu] })
  }

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    })
  }

  // Custom sections handlers
  const addCustomSection = () => {
    const newSec: CustomSectionItem = {
      id: Date.now().toString(),
      title: 'CERTIFICAÇÕES E IDIOMAS',
      content: '• Inglês: Intermediário / Técnico\n• Certificação AWS Certified Cloud Practitioner (2024)',
    }
    onChange({ ...data, customSections: [...data.customSections, newSec] })
  }

  const updateCustomSection = (id: string, field: 'title' | 'content', value: string) => {
    const updated = data.customSections.map((sec) =>
      sec.id === id ? { ...sec, [field]: value } : sec
    )
    onChange({ ...data, customSections: updated })
  }

  const removeCustomSection = (id: string) => {
    onChange({
      ...data,
      customSections: data.customSections.filter((s) => s.id !== id),
    })
  }

  // Theme settings
  const updateTheme = (field: keyof ThemeSettings, value: unknown) => {
    onChange({
      ...data,
      theme: { ...data.theme, [field]: value },
    })
  }

  const presetColors = [
    { label: 'Azul Original', value: '#0284c7' },
    { label: 'Azul Marinho', value: '#1e40af' },
    { label: 'Teal / Petróleo', value: '#0f766e' },
    { label: 'Esmeralda', value: '#059669' },
    { label: 'Grafite Clássico', value: '#334155' },
    { label: 'Violeta Moderno', value: '#7c3aed' },
  ]

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'personal', label: 'Contato', icon: <User className="w-4 h-4" /> },
    { key: 'summary', label: 'Resumo', icon: <FileText className="w-4 h-4" /> },
    { key: 'skills', label: 'Habilidades', icon: <Code2 className="w-4 h-4" /> },
    { key: 'experience', label: 'Experiência', icon: <Briefcase className="w-4 h-4" /> },
    { key: 'education', label: 'Formação', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'custom', label: 'Extras', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'theme', label: 'Aparência', icon: <Palette className="w-4 h-4" /> },
  ]

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full text-slate-200">
      {/* Navigation tabs */}
      <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Editor Content Area */}
      <div className="p-4 sm:p-5 overflow-y-auto max-h-[calc(100vh-140px)] space-y-4">
        {/* PERSONAL INFO */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> Informações Pessoais & Contatos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Ex: João Silva"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Cargo / Título em Destaque (Subtítulo no Cabeçalho)
                </label>
                <input
                  type="text"
                  value={data.personalInfo.roleTitle || ''}
                  onChange={(e) => updatePersonalInfo('roleTitle', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Ex: Desenvolvedor Full Stack Sênior"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Localização
                </label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Ex: São Paulo - SP"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Ex: +55 (11) 99999-9999"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="seu.email@exemplo.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  URL do LinkedIn
                </label>
                <input
                  type="text"
                  value={data.personalInfo.linkedinUrl}
                  onChange={(e) => updatePersonalInfo('linkedinUrl', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="https://linkedin.com/in/seu-perfil"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  URL do GitHub
                </label>
                <input
                  type="text"
                  value={data.personalInfo.githubUrl}
                  onChange={(e) => updatePersonalInfo('githubUrl', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="https://github.com/seu-usuario"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  URL Portfólio / Site (Opcional)
                </label>
                <input
                  type="text"
                  value={data.personalInfo.portfolioUrl || ''}
                  onChange={(e) => updatePersonalInfo('portfolioUrl', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="https://meusite.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Texto do Link do Portfólio
                </label>
                <input
                  type="text"
                  value={data.personalInfo.portfolioLabel || ''}
                  onChange={(e) => updatePersonalInfo('portfolioLabel', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Portfólio"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" /> Resumo Profissional
            </h3>
            <p className="text-xs text-slate-400">
              Descreva de forma concisa seu perfil, especialidades, anos de experiência e principais competências técnicas.
            </p>
            <textarea
              rows={7}
              value={data.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
              placeholder="Escreva seu resumo profissional..."
            />
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>{data.summary.length} caracteres</span>
              <span>Recomendado: 250 a 500 caracteres para 1 página perfeita</span>
            </div>
          </div>
        )}

        {/* SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Categorias de Habilidades Técnicas
              </h3>
              <button
                onClick={addSkillCategory}
                className="flex items-center gap-1.5 text-xs bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white px-3 py-1.5 rounded-lg border border-sky-500/30 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Categoria
              </button>
            </div>

            <div className="space-y-3">
              {data.skillCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-lg p-3.5 space-y-2 relative group"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => updateSkillCategory(cat.id, 'name', e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs font-bold text-sky-300 w-1/2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      placeholder="Ex: Linguagens & Backend"
                    />
                    <button
                      onClick={() => removeSkillCategory(cat.id)}
                      className="ml-auto text-slate-400 hover:text-red-400 p-1 rounded transition-colors"
                      title="Excluir Categoria"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={cat.skills}
                    onChange={(e) => updateSkillCategory(cat.id, 'skills', e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700/60 rounded p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="Java, Spring Boot, C#, Docker..."
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Experiência Profissional
              </h3>
              <button
                onClick={addExperience}
                className="flex items-center gap-1.5 text-xs bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white px-3 py-1.5 rounded-lg border border-sky-500/30 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Cargo
              </button>
            </div>

            <div className="space-y-3">
              {data.experiences.map((exp) => {
                const isExpanded = expandedExpId === exp.id
                return (
                  <div
                    key={exp.id}
                    className="bg-slate-800/80 border border-slate-700 rounded-lg overflow-hidden transition-all"
                  >
                    <div
                      className="p-3 bg-slate-800 flex items-center justify-between cursor-pointer select-none"
                      onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">
                          {exp.role || 'Cargo não informado'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {exp.company} • {exp.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeExperience(exp.id)
                          }}
                          className="text-slate-400 hover:text-red-400 p-1.5 rounded transition-colors"
                          title="Excluir Cargo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 space-y-3 border-t border-slate-700 bg-slate-900/40">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="md:col-span-2">
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">
                              Cargo / Título
                            </label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">
                              Empresa
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">
                              Período
                            </label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                              placeholder="Dez/2023 – Presente"
                            />
                          </div>
                        </div>

                        {/* Bullets */}
                        <div className="space-y-2 pt-2 border-t border-slate-800">
                          <div className="flex justify-between items-center">
                            <label className="text-[11px] font-medium text-slate-400">
                              Realizações & Responsabilidades (Marcadores)
                            </label>
                            <button
                              onClick={() => addExperienceBullet(exp.id)}
                              className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
                            >
                              <Plus className="w-3 h-3" /> Adicionar Marcador
                            </button>
                          </div>

                          {exp.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2">
                              <span className="text-slate-500 text-xs mt-1.5">•</span>
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={(e) =>
                                  updateExperienceBullet(exp.id, bIdx, e.target.value)
                                }
                                className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500 leading-snug"
                              />
                              <button
                                onClick={() => removeExperienceBullet(exp.id, bIdx)}
                                className="text-slate-500 hover:text-red-400 p-1 mt-1 transition-colors"
                                title="Remover item"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Formação Acadêmica
              </h3>
              <button
                onClick={addEducation}
                className="flex items-center gap-1.5 text-xs bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white px-3 py-1.5 rounded-lg border border-sky-500/30 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Formação
              </button>
            </div>

            <div className="space-y-3">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-slate-800/80 border border-slate-700 rounded-lg p-3.5 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 mr-2">
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Curso / Grau
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
                        placeholder="Bacharelado em Ciência da Computação"
                      />
                    </div>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-slate-400 hover:text-red-400 p-1.5 mt-5 rounded transition-colors"
                      title="Excluir Formação"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Instituição
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(edu.id, 'institution', e.target.value)
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                        placeholder="Centro Universitário do Distrito Federal (UDF)"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Período / Status
                      </label>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                        placeholder="Concluído em 2024"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {activeTab === 'custom' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Seções Extras & Customizadas
              </h3>
              <button
                onClick={addCustomSection}
                className="flex items-center gap-1.5 text-xs bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white px-3 py-1.5 rounded-lg border border-sky-500/30 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Seção
              </button>
            </div>

            {data.customSections.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-800 rounded-lg text-slate-400">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p className="text-xs">
                  Nenhuma seção extra criada. Você pode adicionar seções para
                  Certificações, Idiomas, Projetos Pessoais ou Artigos.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.customSections.map((sec) => (
                  <div
                    key={sec.id}
                    className="bg-slate-800/80 border border-slate-700 rounded-lg p-3.5 space-y-2.5"
                  >
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={sec.title}
                        onChange={(e) => updateCustomSection(sec.id, 'title', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs font-bold text-sky-300 w-2/3 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        placeholder="TÍTULO DA SEÇÃO"
                      />
                      <button
                        onClick={() => removeCustomSection(sec.id)}
                        className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={sec.content}
                      onChange={(e) =>
                        updateCustomSection(sec.id, 'content', e.target.value)
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500 leading-normal"
                      placeholder="Conteúdo em texto ou com marcadores..."
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* THEME & APPEARANCE */}
        {activeTab === 'theme' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4" /> Personalização & Layout do PDF
              </h3>
            </div>

            {/* 1. LAYOUT TEMPLATES */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Modelo Estrutural (Layout Template)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    key: 'classic',
                    title: 'Clássico Executivo',
                    desc: 'Cabeçalho e seções empilhadas',
                  },
                  {
                    key: 'sidebar',
                    title: 'Barra Lateral (2 Colunas)',
                    desc: 'Contatos & skills à esquerda',
                  },
                  {
                    key: 'minimal',
                    title: 'Tech Minimalista',
                    desc: 'Visual moderno e conciso',
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => updateTheme('layoutTemplate', item.key)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      (data.theme.layoutTemplate || 'classic') === item.key
                        ? 'border-sky-500 bg-sky-600/20 text-white shadow-md shadow-sky-600/20'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">{item.title}</div>
                    <div className="text-[10px] text-slate-400 leading-snug">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. HEADER ALIGNMENT */}
            {data.theme.layoutTemplate !== 'sidebar' && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300">
                  Alinhamento do Cabeçalho
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'center', label: 'Centralizado' },
                    { key: 'left', label: 'À Esquerda' },
                    { key: 'split', label: 'Dividido (Nome / Contatos)' },
                  ].map((align) => (
                    <button
                      key={align.key}
                      onClick={() => updateTheme('headerAlignment', align.key)}
                      className={`p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all text-center ${
                        (data.theme.headerAlignment || 'center') === align.key
                          ? 'border-sky-500 bg-sky-600/20 text-white'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {align.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. SECTION TITLE STYLE */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">
                Estilo dos Títulos das Seções
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'line', label: 'Linha Inferior' },
                  { key: 'accent-bar', label: 'Barra Lateral' },
                  { key: 'badge', label: 'Badge / Tag' },
                  { key: 'minimal', label: 'Minimalista' },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => updateTheme('sectionTitleStyle', s.key)}
                    className={`p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all text-center ${
                      (data.theme.sectionTitleStyle || 'line') === s.key
                        ? 'border-sky-500 bg-sky-600/20 text-white'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. SKILLS DISPLAY STYLE */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">
                Exibição das Habilidades Técnicas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'list', label: 'Lista com Marcadores (Bullets)' },
                  { key: 'tags', label: 'Tags / Chips Modernos' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => updateTheme('skillsDisplayStyle', item.key)}
                    className={`p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all text-center ${
                      (data.theme.skillsDisplayStyle || 'list') === item.key
                        ? 'border-sky-500 bg-sky-600/20 text-white'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. CONTACT ICONS TOGGLE */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300 block">
                  Ícones Gráficos nos Contatos
                </span>
                <span className="text-[11px] text-slate-400">
                  Exibe ícones sutis de telefone, email e links no cabeçalho
                </span>
              </div>
              <input
                type="checkbox"
                checked={!!data.theme.showContactIcons}
                onChange={(e) => updateTheme('showContactIcons', e.target.checked)}
                className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
              />
            </div>

            {/* 6. PRIMARY ACCENT COLOR */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">
                Cor de Destaque dos Títulos & Detalhes
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {presetColors.map((color) => {
                  const isSelected = data.theme.primaryColor === color.value
                  return (
                    <button
                      key={color.value}
                      onClick={() => updateTheme('primaryColor', color.value)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                        isSelected
                          ? 'border-white bg-slate-800 text-white shadow-md'
                          : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full ring-1 ring-white/30"
                        style={{ backgroundColor: color.value }}
                      />
                      <span>{color.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800">
                <label className="text-xs text-slate-400">Cor personalizada (Hex):</label>
                <input
                  type="color"
                  value={data.theme.primaryColor}
                  onChange={(e) => updateTheme('primaryColor', e.target.value)}
                  className="w-7 h-7 bg-transparent cursor-pointer rounded border border-slate-700"
                />
                <span className="text-xs font-mono text-slate-300">{data.theme.primaryColor}</span>
              </div>
            </div>

            {/* 7. TYPOGRAPHY */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">
                Família Tipográfica
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'sans', label: 'Inter (Modern Sans)' },
                  { key: 'roboto', label: 'Roboto (Google Clean)' },
                  { key: 'outfit', label: 'Outfit (Geométrica / Tech)' },
                  { key: 'serif', label: 'Merriweather (Executiva)' },
                  { key: 'mono', label: 'JetBrains Mono (Tech Code)' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => updateTheme('fontFamily', item.key)}
                    className={`p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all text-center ${
                      data.theme.fontFamily === item.key
                        ? 'border-sky-500 bg-sky-600/20 text-white'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 8. FONT SIZE SCALE */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">
                Escala do Tamanho do Texto
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'compact', label: 'Pequeno (9pt)' },
                  { key: 'base', label: 'Padrão (9.5pt)' },
                  { key: 'large', label: 'Grande (10.5pt)' },
                ].map((size) => (
                  <button
                    key={size.key}
                    onClick={() => updateTheme('fontSize', size.key)}
                    className={`p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all text-center ${
                      (data.theme.fontSize || 'base') === size.key
                        ? 'border-sky-500 bg-sky-600/20 text-white'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 9. DENSITY / SPACING */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">
                Espaçamento Entre Seções
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'compact', label: 'Compacto (1 pág)' },
                  { key: 'normal', label: 'Normal (equilibrado)' },
                  { key: 'spacious', label: 'Espaçoso' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => updateTheme('density', item.key)}
                    className={`p-2 rounded-lg border text-xs font-medium cursor-pointer transition-all text-center ${
                      data.theme.density === item.key
                        ? 'border-sky-500 bg-sky-600/20 text-white'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 10. SECTION DIVIDERS */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300 block">
                  Linhas Divisórias Horizontais
                </span>
                <span className="text-[11px] text-slate-400">
                  Exibe um traço sutil abaixo dos títulos de seções
                </span>
              </div>
              <input
                type="checkbox"
                checked={data.theme.showDividers}
                onChange={(e) => updateTheme('showDividers', e.target.checked)}
                className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
