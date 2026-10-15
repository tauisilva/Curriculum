import { useState, useEffect } from 'react'
import type { ResumeData } from './types/resume'
import { initialResume } from './data/initialResume'
import { ResumeEditor } from './components/ResumeEditor'
import { ResumePreview } from './components/ResumePreview'
import { Navbar } from './components/Navbar'
import { Info, CheckCircle2 } from 'lucide-react'

const LOCAL_STORAGE_KEY = 'cv_builder_user_data_v2'

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.warn('Erro ao carregar do localStorage', e)
    }
    return initialResume
  })

  const [viewMode, setViewMode] = useState<'both' | 'editor' | 'preview'>('both')
  const [zoom, setZoom] = useState<number>(1)
  const [showTip, setShowTip] = useState(true)

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData))
    } catch (e) {
      console.warn('Erro ao salvar no localStorage', e)
    }
  }, [resumeData])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        data={resumeData}
        onDataChange={setResumeData}
        viewMode={viewMode}
        setViewMode={setViewMode}
        zoom={zoom}
        setZoom={setZoom}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-4 md:p-6 print:p-0 print:m-0 print:max-w-none print:w-full">
        {/* Info Banner */}
        {showTip && (
          <div className="no-print mb-4 bg-sky-950/40 border border-sky-800/60 rounded-xl p-3 sm:p-4 flex items-start justify-between gap-3 text-xs sm:text-sm text-sky-200">
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">
                  Exportação em PDF:
                </p>
                <p className="text-slate-300 text-xs mt-0.5">
                  Use o botão <strong>"Baixar PDF"</strong> para download instantâneo do arquivo,
                  ou o botão <strong>"Imprimir"</strong> (Ctrl+P) para salvar via impressora virtual do sistema com folha A4.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowTip(false)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors text-xs shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Entendi</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start print:block print:w-full print:m-0 print:p-0">
          {/* Editor Column */}
          {(viewMode === 'both' || viewMode === 'editor') && (
            <div
              className={`no-print ${
                viewMode === 'both' ? 'lg:col-span-5 xl:col-span-5' : 'lg:col-span-12 max-w-4xl mx-auto w-full'
              }`}
            >
              <ResumeEditor data={resumeData} onChange={setResumeData} />
            </div>
          )}

          {/* Preview Column */}
          {(viewMode === 'both' || viewMode === 'preview') && (
            <div
              className={`flex flex-col items-center justify-center ${
                viewMode === 'both'
                  ? 'lg:col-span-7 xl:col-span-7'
                  : 'lg:col-span-12 w-full'
              }`}
            >
              {/* Zoom container */}
              <div
                className="a4-preview-container overflow-x-auto w-full py-2 flex justify-center"
                style={{
                  transform: zoom !== 1 ? `scale(${zoom})` : undefined,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <ResumePreview data={resumeData} />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <p>
          Gerador de Currículo Profissional • Pronto para deploy no Render
        </p>
      </footer>
    </div>
  )
}
