# 📄 CV Builder & Exporter

Aplicação web moderna, interativa e de alta fidelidade para edição, gerenciamento e exportação de currículo profissional para **PDF (formato A4)**, desenvolvida com **React 19**, **TypeScript**, **Vite** e **Tailwind CSS**.

O layout de visualização e exportação é limpo e executivo, com proporções milimétricas para folha A4 e sem quebras de página indesejadas.

---

## 🚀 Funcionalidades

- ✏️ **Edição Completa em Tempo Real**:
  - **Dados de Contato**: Nome, localização, telefone, e-mail, links clicáveis do LinkedIn, GitHub e Portfólio.
  - **Resumo Profissional**: Descrição com contagem de caracteres e dicas de síntese.
  - **Habilidades Técnicas**: Adicione, remova e renomeie categorias (Backend, Frontend, Bancos de Dados, DevOps, etc.) e liste tecnologias com tags.
  - **Experiência Profissional**: Edite cargos, empresas, períodos e múltiplos marcadores de realizações (bullets) com suporte a reordenação e exclusão.
  - **Formação Acadêmica**: Cursos, instituições e períodos/status.
  - **Seções Extras**: Crie seções livres para Certificações, Idiomas, Projetos, Publicações, etc.
  - **Customização Visual & Layout**: Ajuste a cor de destaque (azul moderno, petróleo, esmeralda, marinho, grafite, violeta ou hex personalizado), tipografia (Inter, Roboto ou Merriweather) e densidade (compacta para caber em 1 página perfeitamente ou espaçosa).

- 🖨️ **Exportação Fiel em PDF (A4)**:
  - Botão dedicado **"Exportar PDF"** configurado com regras `@media print` e `@page { size: A4 }`.
  - Links continuam clicáveis no PDF gerado.
  - Zero cortes indesejados (`page-break-inside: avoid`).

- 💾 **Persistência & Backup**:
  - Salva automaticamente as alterações no `localStorage` do navegador.
  - **Exportar JSON**: Baixe um arquivo `.json` com todos os dados preenchidos.
  - **Importar JSON**: Carregue um backup salvo anteriormente em um clique.
  - **Restaurar Modelo Padrão**: Retorna ao template inicial a qualquer momento.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado.

### Passo a Passo
```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse no seu navegador: `http://localhost:5173`

Para validar o build de produção localmente:
```bash
npm run build
npm run preview
```

---

## 🌐 Como Subir no Render (Passo a Passo)

A aplicação está 100% configurada para o **Render** como **Static Site** (que é **gratuito**, não "dorme" por inatividade e possui CDN global rápida com SSL automático).

### Opção 1: Automático via Blueprint (`render.yaml` já incluso)
1. Faça push do repositório para o seu GitHub/GitLab:
   ```bash
   git add .
   git commit -m "feat: Curriculum builder web app ready for Render"
   git push origin main
   ```
2. Acesse o painel do [Render Dashboard](https://dashboard.render.com).
3. Clique em **"New"** (canto superior direito) e selecione **"Blueprint"**.
4. Conecte seu repositório `Curriculum`.
5. O Render detectará automaticamente o arquivo [`render.yaml`](file:///d:/Github/My/Curriculum/render.yaml) presente na raiz e configurará tudo:
   - **Name**: `curriculo-builder`
   - **Environment**: `Static Site`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. Clique em **"Apply"** e aguarde o build. Sua aplicação estará no ar com link público HTTPS!

---

### Opção 2: Manual pelo Dashboard do Render
Se preferir criar manualmente sem usar o Blueprint:
1. No [Render Dashboard](https://dashboard.render.com), clique em **"New +"** > **"Static Site"**.
2. Conecte seu repositório.
3. Preencha os campos:
   - **Name**: `curriculo-builder`
   - **Branch**: `main` (ou a sua branch padrão)
   - **Root Directory**: Deixe em branco
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Em **"Advanced"**, adicione a regra de Redirect/Rewrite:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
   *(Observação: o arquivo `public/_redirects` já inclui essa regra automaticamente).*
5. Clique em **"Create Static Site"**.

---

## 📄 Dica para Exportar o PDF no Navegador

Ao clicar no botão **"Exportar PDF"** na barra superior (ou pressionar `Ctrl + P` / `Cmd + P`):
1. **Destino**: Escolha *"Salvar como PDF"*.
2. **Páginas**: *"Tudo"*.
3. **Layout**: *"Retrato"*.
4. **Mais Definições**:
   - **Tamanho do papel**: *A4*
   - **Margens**: *Nenhuma* ou *Padrão*
   - **Gráficos de segundo plano / plano de fundo**: Marcado (para exibir os separadores e cores de destaque fiéis).
