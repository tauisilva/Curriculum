import React, { useRef } from 'react'
import {
  Download,
  RotateCcw,
  FileJson,
  Upload,
  Eye,
  Edit3,
  Columns,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from 'lucide-react'
import type { ResumeData } from '../types/resume'
import { initialResume } from '../data/initialResume'

interface NavbarProps {
  data: ResumeData
  onDataChange: (data: ResumeData) => void
  viewMode: 'both' | 'editor' | 'preview'
  setViewMode: (mode: 'both' | 'editor' | 'preview') => void
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
}

export const Navbar: React.FC<NavbarProps> = ({
  data,
  onDataChange,
  viewMode,
  setViewMode,
  zoom,
  setZoom,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fast, non-blocking native PDF export
  const handlePrint = () => {
    // Small timeout ensures any active focus or pending state resolves before the print dialog opens
    setTimeout(() => {
      window.print()
    }, 50)
  }

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    const sanitizedName = (data.personalInfo.fullName || 'curriculo')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
    downloadAnchor.setAttribute('download', `curriculo_${sanitizedName || 'export'}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8')
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string)
          if (parsed && parsed.personalInfo) {
            onDataChange(parsed)
          } else {
            alert('Arquivo JSON inválido. Certifique-se de ser um backup deste gerador.')
          }
        } catch (err) {
          console.error(err)
          alert('Erro ao carregar o arquivo JSON.')
        }
      }
    }
  }

  const handleReset = () => {
    if (
      window.confirm(
        'Deseja restaurar o modelo inicial de exemplo? Todas as alterações não salvas serão substituídas.'
      )
    ) {
      onDataChange(initialResume)
    }
  }

  return (
    <header className="no-print sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base tracking-tight text-white leading-none">
                CV Builder & Exporter
              </h1>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                PDF A4 Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Edite, personalize e gere seu PDF profissional
            </p>
          </div>
        </div>

        {/* View Mode Controls (Desktop/Mobile) */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('editor')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              viewMode === 'editor'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Apenas Editor"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Editor</span>
          </button>
          <button
            onClick={() => setViewMode('both')}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              viewMode === 'both'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Dividir Tela (Editor + Preview)"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Lado a Lado</span>
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              viewMode === 'preview'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Apenas Pré-visualização A4"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Visualizar A4</span>
          </button>
        </div>

        {/* Zoom controls for Preview */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-950/70 px-2 py-1 rounded-lg border border-slate-800 text-xs text-slate-300">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
            className="p-1 hover:text-white cursor-pointer transition-colors"
            title="Diminuir Zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-mono">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
            className="p-1 hover:text-white cursor-pointer transition-colors"
            title="Aumentar Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="ml-1 text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
          >
            100%
          </button>
        </div>

        {/* Actions (Export PDF, JSON, Reset) */}
        <div className="flex items-center gap-2">
          {/* JSON actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleExportJSON}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 cursor-pointer"
              title="Salvar Backup (.json)"
            >
              <FileJson className="w-4 h-4" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 cursor-pointer"
              title="Carregar Arquivo (.json)"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJSON}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={handleReset}
              className="p-2 text-slate-300 hover:text-amber-300 bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 cursor-pointer"
              title="Restaurar Modelo Padrão"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Export to PDF */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/25 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
            title="Exportar como PDF (Ctrl + P)"
          >
            <Download className="w-4 h-4" />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>
    </header>
  )
}
