import React, { useState } from 'react';
import {
  PYTHON_PROJECT_FILES,
  PROJECT_REPORT_CONTENT,
  PPT_SLIDES_OUTLINE,
  VIVA_QUESTIONS,
  PythonFile,
} from '../data/pythonCodeFiles';
import {
  Code2,
  FileText,
  Presentation,
  HelpCircle,
  Copy,
  Check,
  Download,
  FolderTree,
  Terminal,
  ShieldCheck,
  Network,
} from 'lucide-react';

export const AcademicHubTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'code' | 'architecture' | 'deployment' | 'legal' | 'report' | 'ppt' | 'viva'
  >('architecture');
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedFile = PYTHON_PROJECT_FILES[selectedFileIndex] || PYTHON_PROJECT_FILES[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadFile = (file: PythonFile) => {
    const element = document.createElement('a');
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(blob);
    element.download = file.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation Ribbon for Deliverables */}
      <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg flex items-center gap-1.5 overflow-x-auto text-xs font-semibold whitespace-nowrap">
        <button
          onClick={() => setActiveSection('architecture')}
          className={`px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'architecture'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>1. Architecture & Plan</span>
        </button>

        <button
          onClick={() => setActiveSection('code')}
          className={`px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'code'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>2 & 3. Python Source Code</span>
        </button>

        <button
          onClick={() => setActiveSection('deployment')}
          className={`px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'deployment'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>4 & 5. Local & Cloud Setup</span>
        </button>

        <button
          onClick={() => setActiveSection('legal')}
          className={`px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'legal'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>6. Legal & Ethics</span>
        </button>

        <button
          onClick={() => setActiveSection('report')}
          className={`px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'report'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>7. Project Report</span>
        </button>

        <button
          onClick={() => setActiveSection('ppt')}
          className={`px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'ppt'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Presentation className="w-3.5 h-3.5" />
          <span>8. 10-Slide PPT</span>
        </button>

        <button
          onClick={() => setActiveSection('viva')}
          className={`px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'viva'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>8b. Top 10 Viva Q&A</span>
        </button>
      </div>

      {/* SECTION 1: System Architecture & Problem Statement */}
      {activeSection === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4">
            <h3 className="text-base font-bold text-slate-100">
              1. Problem Statement & Objectives
            </h3>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <p>
                <strong>Problem Statement:</strong> While cricket generates massive volumes of granular ball-by-ball data, existing tools often rely on static CSV spreadsheets or closed subscription platforms. Student researchers and analysts lack an open, reproducible, full-stack pipeline that autonomously ingests live online cricket data, reconciles historical team rebranding discrepancies, and interactively visualizes multi-phase game dynamics in the browser.
              </p>
              <p>
                <strong>Core Objectives:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
                <li>Automate data ingestion from online repositories (Cricsheet open ZIP/CSV, free REST APIs, polite scraping with robots.txt check).</li>
                <li>Design an automated cleaning pipeline to standardize franchise names, parse datetime timestamps, and impute missing values.</li>
                <li>Build interactive visualizations (Phase-wise batting, bowling bubble charts, skill radar plots, head-to-head matrices).</li>
                <li>Implement a machine learning prediction engine to quantify victory probabilities based on historical venue and toss biases.</li>
              </ul>
            </div>

            {/* ASCII System Architecture Diagram */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                System Architecture Flow Diagram
              </h4>
              <div className="bg-slate-950 p-4 rounded-md border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto leading-loose">
                {`[DATA SOURCES]
   ├── 1. Cricsheet.org (Open ZIP/CSV Ball-by-Ball)
   ├── 2. CricketData.org / CricAPI (Free REST API via st.secrets)
   ├── 3. Polite Web Scraper (requests + BeautifulSoup + robots.txt verification)
   └── 4. Uploaded CSV / Built-in Curated Fallback Dataset
         │
         ▼
[INGESTION LAYER (utils/fetcher.py)]
   ├── In-memory ZIP stream extraction (io.BytesIO, zipfile)
   ├── HTTP status checking & polite 2.0s delay
   └── Caching with @st.cache_data(ttl=86400)
         │
         ▼
[DATA PREPROCESSING & CLEANING (utils/cleaner.py)]
   ├── Deduplication of delivery records
   ├── Franchise Name Harmonization (e.g., Delhi Daredevils -> Delhi Capitals)
   ├── Datetime ISO 8601 formatting (pd.to_datetime)
   ├── Missing value handling & venue city heuristics
   └── Over Phase Partitioning (Powerplay: 1-6, Middle: 7-15, Death: 16-20)
         │
         ▼
[ANALYTICS & ML ENGINE (utils/predictor.py)]
   ├── Batting Strike Rate, Average & Boundary % Aggregations
   ├── Bowling Economy, Wickets & Dot Ball Frequencies
   ├── Head-to-Head & Batter-Bowler Micro-Matchup Matrix
   └── Logistic Regression & Random Forest Match-Winner Probability Classifier
         │
         ▼
[VISUALIZATION & WEB UI (app.py + utils/visualizer.py)]
   ├── Streamlit Multi-Tab Dashboard (Data, Match, Batting, Bowling, Radar, Insights)
   ├── Plotly Interactive Charts with Franchise Authentic Color Palettes
   └── One-Click CSV & Chart Export Affordances`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2 & 3: Python Source Code Viewer */}
      {activeSection === 'code' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <div>
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-amber-400" />
                Complete Project Folder Structure & Runnable Source Code
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Full code for each file with beginner-friendly comments · Zero placeholders
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(selectedFile.content, selectedFile.filename)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded border border-slate-700 transition-colors"
              >
                {copiedKey === selectedFile.filename ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownloadFile(selectedFile)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-xs font-bold text-slate-950 rounded transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {selectedFile.filename}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* File List */}
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg lg:col-span-3 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 block mb-2">
                Project Files
              </span>
              {PYTHON_PROJECT_FILES.map((file, idx) => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFileIndex(idx)}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex flex-col ${
                    selectedFileIndex === idx
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-mono">{file.path}</span>
                  <span className="text-[10px] text-slate-500 font-normal truncate mt-0.5">
                    {file.description}
                  </span>
                </button>
              ))}
            </div>

            {/* Code Content */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg lg:col-span-9 p-4 flex flex-col">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-xs">
                <span className="font-mono text-amber-400 font-semibold">{selectedFile.path}</span>
                <span className="text-slate-500">{selectedFile.language.toUpperCase()}</span>
              </div>
              <pre className="font-mono text-xs text-slate-200 overflow-x-auto p-2 bg-slate-900/40 rounded max-h-[600px] leading-relaxed">
                {selectedFile.content}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4 & 5: Local Running & Streamlit Cloud Deployment */}
      {activeSection === 'deployment' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-400" />
              4. Step-by-Step Local Execution Instructions
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <p>Follow these standard terminal steps to run CricInsight on your computer:</p>

              <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-xs space-y-3">
                <div>
                  <span className="text-slate-500"># Step 1: Clone the repository and navigate into it</span>
                  <div className="text-amber-300">git clone https://github.com/your-username/cricinsight.git</div>
                  <div className="text-amber-300">cd cricinsight</div>
                </div>

                <div>
                  <span className="text-slate-500"># Step 2: Create and activate a Python 3.10+ virtual environment</span>
                  <div className="text-amber-300">python3 -m venv venv</div>
                  <div className="text-slate-400">source venv/bin/activate    <span className="text-slate-500"># macOS / Linux</span></div>
                  <div className="text-slate-400">venv\Scripts\activate       <span className="text-slate-500"># Windows PowerShell</span></div>
                </div>

                <div>
                  <span className="text-slate-500"># Step 3: Upgrade pip and install all required libraries</span>
                  <div className="text-amber-300">pip install --upgrade pip</div>
                  <div className="text-amber-300">pip install -r requirements.txt</div>
                </div>

                <div>
                  <span className="text-slate-500"># Step 4: Configure Streamlit secrets (optional for API keys)</span>
                  <div className="text-amber-300">mkdir -p .streamlit</div>
                  <div className="text-amber-300">cp .streamlit/secrets.toml.example .streamlit/secrets.toml</div>
                </div>

                <div>
                  <span className="text-slate-500"># Step 5: Launch the Streamlit web application</span>
                  <div className="text-emerald-400 font-bold">streamlit run app.py</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Network className="w-5 h-5 text-amber-400" />
              5. Deployment to Streamlit Community Cloud (via GitHub)
            </h3>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>
                  <strong>Push code to GitHub:</strong> Ensure your repository contains <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded">app.py</code>, <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded">requirements.txt</code>, and the <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded">utils/</code> directory. Do NOT commit your actual <code className="text-rose-400">secrets.toml</code> file.
                </li>
                <li>
                  <strong>Sign in to Streamlit Cloud:</strong> Go to <a href="https://share.streamlit.io" target="_blank" rel="noreferrer" className="text-amber-400 underline">share.streamlit.io</a> and authenticate with your GitHub account.
                </li>
                <li>
                  <strong>Create a New App:</strong> Click <em>"New App"</em>, select your repository, choose the <code className="text-slate-100">main</code> branch, and set the Main file path to <code className="text-amber-300">app.py</code>.
                </li>
                <li>
                  <strong>Add Environment Secrets:</strong> Expand <em>"Advanced Settings"</em> &gt; <em>"Secrets"</em>. Paste your TOML block from <code className="text-amber-300">secrets.toml.example</code> (with your real CricketData.org / CricAPI key).
                </li>
                <li>
                  <strong>Click Deploy:</strong> Streamlit Cloud will automatically build your virtual environment from <code className="text-amber-300">requirements.txt</code> and provide a live public URL (e.g., <code className="text-slate-300">https://cricinsight.streamlit.app</code>) to include in your project submission!
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: Legal and Ethical Scraping Note */}
      {activeSection === 'legal' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            6. Legal & Ethical Web Scraping Guidelines
          </h3>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-2">
              <h4 className="font-semibold text-amber-400 text-sm">Key Principles Enforced in CricInsight:</h4>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>
                  <strong>Prefer Open Data & Official APIs:</strong> CricInsight defaults to Cricsheet.org (which provides open data for free non-commercial and research use) and public developer APIs before attempting any web page parsing.
                </li>
                <li>
                  <strong>Robots Exclusion Protocol Compliance:</strong> The fetcher uses Python's <code className="text-amber-300 font-mono">urllib.robotparser</code> to inspect <code className="font-mono text-slate-200">/robots.txt</code> before fetching any webpage. If a route contains <code className="text-rose-400 font-mono">Disallow</code> for automated bots, the scraper aborts and falls back to cached data.
                </li>
                <li>
                  <strong>Rate Limiting & Polite Delays:</strong> Every scraping request includes a mandatory sleep delay of <code className="text-amber-300 font-mono">time.sleep(2.0)</code> between requests to ensure we do not overload third-party web servers.
                </li>
                <li>
                  <strong>Descriptive User-Agent Headers:</strong> Requests identify the bot responsibly (e.g. <code className="text-slate-200 font-mono">User-Agent: CricInsightAcademicBot/1.0 (College PBL Project)</code>) rather than spoofing generic browser strings.
                </li>
                <li>
                  <strong>Zero Commercial Monetization:</strong> The data gathered is strictly utilized for educational analysis in the Data Visualization using Python (DVP) curriculum.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: Academic Project Report */}
      {activeSection === 'report' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              7. Academic Project Report Content
            </h3>
            <button
              onClick={() => {
                const fullReport = `CRICINSIGHT: AN ONLINE CRICKET DATA ANALYSIS AND VISUALIZATION WEB APPLICATION\n\nABSTRACT\n${PROJECT_REPORT_CONTENT.abstract}\n\n1. INTRODUCTION\n${PROJECT_REPORT_CONTENT.introduction}\n\n2. METHODOLOGY\n${PROJECT_REPORT_CONTENT.methodology}\n\n3. RESULTS & DISCUSSION\n${PROJECT_REPORT_CONTENT.results}\n\n4. CONCLUSION\n${PROJECT_REPORT_CONTENT.conclusion}\n\n5. FUTURE SCOPE\n${PROJECT_REPORT_CONTENT.futureScope}`;
                handleCopy(fullReport, 'report');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded border border-slate-700 transition-colors"
            >
              {copiedKey === 'report' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedKey === 'report' ? 'Report Copied!' : 'Copy Full Report'}</span>
            </button>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Abstract</h4>
              <p>{PROJECT_REPORT_CONTENT.abstract}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">1. Introduction</h4>
              <p>{PROJECT_REPORT_CONTENT.introduction}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">2. Methodology</h4>
              <p className="whitespace-pre-line">{PROJECT_REPORT_CONTENT.methodology}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">3. Results & Tactical Findings</h4>
              <p className="whitespace-pre-line">{PROJECT_REPORT_CONTENT.results}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">4. Conclusion</h4>
              <p>{PROJECT_REPORT_CONTENT.conclusion}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">5. Future Scope</h4>
              <p className="whitespace-pre-line">{PROJECT_REPORT_CONTENT.futureScope}</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: 10-Slide PPT Presentation Outline */}
      {activeSection === 'ppt' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Presentation className="w-5 h-5 text-amber-400" />
                8. 10-Slide PPT Presentation Outline
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Structured slide-by-slide guide tailored for academic viva presentations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PPT_SLIDES_OUTLINE.map((slide) => (
              <div
                key={slide.slideNumber}
                className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      SLIDE {slide.slideNumber} of 10
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{slide.title}</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 mt-2 pl-1">
                    {slide.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 8b: Top 10 Viva Questions & Model Answers */}
      {activeSection === 'viva' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              8b. Top 10 Likely Viva Questions with Model Answers
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Frequently asked examiner questions regarding libraries, caching, scraping ethics, and visualization theory
            </p>
          </div>

          <div className="space-y-3">
            {VIVA_QUESTIONS.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-2 text-xs"
              >
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <p className="font-bold text-slate-100 text-sm">{item.q}</p>
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-800/80 text-slate-300 leading-relaxed ml-7">
                  <span className="text-emerald-400 font-semibold">Answer: </span>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
