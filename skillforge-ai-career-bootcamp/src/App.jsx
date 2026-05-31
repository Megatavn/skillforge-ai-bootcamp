import { useEffect, useMemo, useState } from 'react'
import {
  author,
  product,
  scoreWeights,
  weeklyPlan,
  modules,
  lessons,
  terms,
  labs,
  codeMissions,
  projects,
  proofSteps,
  capstoneDocuments,
  capstoneTestSet,
  capstoneRubric,
  quests,
  dailyChallenges,
  bossBattles,
  detectiveCases,
  mistakeMuseum,
  skillTree,
  interviewBank,
  novaLines,
  placementQuestions,
  careerTracks,
  evidenceTypes,
  productionLabs,
  spacedReviewCards,
  portfolioExportPack,
  sprintReviewQuestions
} from './data/curriculum'
import { defaultProgress, exportProgress, loadProgress, resetProgress, saveProgress } from './utils/storage'
import { generateCapstoneReport, generateCvLine, generateInterviewScript, generateLinkedIn, generatePortfolioPack, generateReadme } from './utils/generators'

const tabs = [
  { id: 'today', label: 'Today', icon: '◐' },
  { id: 'learn', label: 'Learn', icon: '▣' },
  { id: 'code', label: 'Code', icon: '⌁' },
  { id: 'build', label: 'Build', icon: '◆' },
  { id: 'evidence', label: 'Vault', icon: '▤' },
  { id: 'career', label: 'Career', icon: '◎' },
  { id: 'profile', label: 'Profile', icon: '◌' }
]

const cn = (...classes) => classes.filter(Boolean).join(' ')
const clamp = (value) => Math.max(0, Math.min(100, Math.round(value || 0)))
const toggleIn = (list = [], id) => list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
const moduleLessons = (moduleId) => lessons.filter((lesson) => lesson.moduleId === moduleId)
const getMission = (id) => codeMissions.find((mission) => mission.id === id)

function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ')
}

function retrieveDocs(question) {
  const stop = new Set(['la', 'gi', 'va', 'co', 'the', 'nhu', 'nao', 'vi', 'sao', 'mot', 'duoc', 'trong', 'cho', 'toi', 've', 'ai'])
  const tokens = normalize(question).split(/\s+/).filter((t) => t.length > 1 && !stop.has(t))
  const scored = capstoneDocuments.map((doc) => {
    const haystack = normalize(`${doc.title} ${doc.source} ${doc.text}`)
    const score = tokens.reduce((sum, token) => sum + (haystack.includes(token) ? 1 : 0), 0)
    return { ...doc, score }
  }).sort((a, b) => b.score - a.score)
  return scored.filter((doc) => doc.score > 0).slice(0, 3)
}

function answerQuestion(question) {
  const docs = retrieveDocs(question)
  if (!docs.length) {
    return {
      confidence: 'Low',
      text: 'Không đủ dữ liệu trong tài liệu mẫu. Một Document Q&A Assistant tốt phải trả lời “không đủ dữ liệu” thay vì đoán bừa.',
      docs: []
    }
  }
  return {
    confidence: docs[0].score >= 2 ? 'Medium' : 'Low',
    text: `Dựa trên ${docs.map((d) => d.source).join(', ')}, câu trả lời nên bám vào nguồn được truy xuất: ${docs.map((d) => d.text).join(' ')}`,
    docs
  }
}

function scoreCapstoneRun(question, result) {
  const test = capstoneTestSet.find((item) => normalize(question).includes(normalize(item.q).split(' ')[0]))
  const sourceMatch = test ? result.docs.some((doc) => doc.id === test.expectedSource) : result.docs.length > 0
  const noAnswerGood = !result.docs.length && result.confidence === 'Low'
  return {
    sourceMatch,
    noAnswerGood,
    estimated: clamp((sourceMatch ? 50 : 0) + (result.docs.length ? 25 : 25) + (result.text.includes('không đủ dữ liệu') ? 25 : 15))
  }
}

function scoreProgress(progress) {
  const groupLessons = (group) => lessons.filter((lesson) => modules.find((m) => m.id === lesson.moduleId)?.group === group)
  const groupPercent = (group) => {
    const rows = groupLessons(group)
    if (!rows.length) return 0
    return rows.filter((lesson) => progress.completedLessons.includes(lesson.id)).length / rows.length
  }
  const projectComplete = (id) => proofSteps.every((step) => progress.projectProofs?.[id]?.[step.id])
  const projectIds = projects.filter((p) => projectComplete(p.id)).map((p) => p.id)
  const missionPct = codeMissions.length ? progress.completedMissions.length / codeMissions.length : 0
  const capstoneRubricPct = capstoneRubric.reduce((sum, item) => sum + (progress.capstoneRubric?.[item.id] ? item.points : 0), 0) / 100
  const values = {
    concepts: clamp((groupPercent('concepts') * 0.65 + progress.masteredTerms.length / terms.length * 0.35) * 100),
    pythonData: clamp((groupPercent('pythonData') * 0.55 + missionPct * 0.25 + (projectIds.includes('data-insight-dashboard') ? 0.20 : 0)) * 100),
    mlBasics: clamp((groupPercent('mlBasics') * 0.65 + (projectIds.includes('ml-predictor-demo') ? 0.35 : 0)) * 100),
    llmApps: clamp((groupPercent('llmApps') * 0.35 + (projectIds.includes('rag-document-assistant') ? 0.25 : 0) + (projectIds.includes('capstone-document-qa-assistant') ? 0.20 : 0) + capstoneRubricPct * 0.20) * 100),
    portfolio: clamp((groupPercent('portfolio') * 0.25 + projectIds.length / projects.length * 0.35 + Object.values(progress.evidenceLinks || {}).filter(Boolean).length / projects.length * 0.20 + Object.values(progress.interviewAnswers || {}).filter(Boolean).length / interviewBank.length * 0.20) * 100)
  }
  const total = clamp(scoreWeights.reduce((sum, item) => sum + values[item.id] * item.weight / 100, 0))
  return { values, total, projectIds }
}

function capstoneUnlocked(progress, score) {
  return score.total >= 55 && progress.completedMissions.includes('mission-document-qa') && score.projectIds.length >= 3
}

function nextLesson(progress) {
  return lessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) || lessons[0]
}

function placementScore(progress) {
  const raw = placementQuestions.reduce((sum, q) => sum + Number(progress.placementAnswers?.[q.id] ?? 0), 0)
  const max = placementQuestions.reduce((sum, q) => sum + Math.max(...q.scores), 0) || 1
  const pct = clamp(raw / max * 100)
  const level = pct < 30 ? 'Beginner Track' : pct < 55 ? 'Foundation Track' : pct < 75 ? 'Builder Track' : 'Portfolio Track'
  return { raw, pct, level }
}

export default function App() {
  const [progress, setProgress] = useState(loadProgress)
  const [tab, setTab] = useState(progress.lastTab || 'today')
  const [selectedModule, setSelectedModule] = useState(modules[0].id)
  const [selectedLesson, setSelectedLesson] = useState(modules[0].lessonIds[0])
  const [selectedMission, setSelectedMission] = useState(codeMissions[0].id)
  const [selectedProject, setSelectedProject] = useState(projects[0].id)
  const [selectedTerm, setSelectedTerm] = useState(terms[0].id)
  const [selectedInterview, setSelectedInterview] = useState(interviewBank[0])
  const [selectedTrack, setSelectedTrack] = useState(progress.selectedTrack || careerTracks[0].id)

  const score = useMemo(() => scoreProgress(progress), [progress])
  const currentLesson = useMemo(() => nextLesson(progress), [progress])
  const unlocked = useMemo(() => capstoneUnlocked(progress, score), [progress, score])

  useEffect(() => saveProgress({ ...progress, lastTab: tab }), [progress, tab])

  const update = (updater) => setProgress((prev) => ({ ...defaultProgress, ...(typeof updater === 'function' ? updater(prev) : updater) }))
  const toggleArray = (key, id) => update((prev) => ({ ...prev, [key]: toggleIn(prev[key], id) }))
  const setQuiz = (lessonId, value) => update((prev) => ({ ...prev, quizScores: { ...prev.quizScores, [lessonId]: value } }))
  const toggleProof = (projectId, stepId) => update((prev) => ({ ...prev, projectProofs: { ...prev.projectProofs, [projectId]: { ...(prev.projectProofs?.[projectId] || {}), [stepId]: !prev.projectProofs?.[projectId]?.[stepId] } } }))
  const saveEvidence = (projectId, value) => update((prev) => ({ ...prev, evidenceLinks: { ...prev.evidenceLinks, [projectId]: value } }))
  const saveAnswer = (question, value) => update((prev) => ({ ...prev, interviewAnswers: { ...prev.interviewAnswers, [question]: value } }))
  const setPlacement = (id, value) => update((prev) => ({ ...prev, placementAnswers: { ...prev.placementAnswers, [id]: value } }))
  const chooseTrack = (id) => { setSelectedTrack(id); update((prev) => ({ ...prev, selectedTrack: id })) }
  const saveVault = (projectId, typeId, value) => update((prev) => ({ ...prev, evidenceVault: { ...prev.evidenceVault, [projectId]: { ...(prev.evidenceVault?.[projectId] || {}), [typeId]: value } } }))
  const saveSprint = (key, value) => update((prev) => ({ ...prev, sprintReviews: { ...prev.sprintReviews, [key]: value } }))
  const toggleSpaced = (id, level) => update((prev) => ({ ...prev, spacedReviews: { ...prev.spacedReviews, [id]: level } }))
  const toggleProductionLab = (id) => update((prev) => ({ ...prev, completedProductionLabs: toggleIn(prev.completedProductionLabs || [], id) }))
  const toggleRubric = (id) => update((prev) => ({ ...prev, capstoneRubric: { ...prev.capstoneRubric, [id]: !prev.capstoneRubric?.[id] } }))
  const addRun = (run) => update((prev) => ({ ...prev, capstoneRuns: [{ ...run, at: new Date().toISOString() }, ...(prev.capstoneRuns || [])].slice(0, 10) }))

  const shared = { progress, score, currentLesson, unlocked, update, toggleArray, setQuiz, toggleProof, saveEvidence, saveAnswer, toggleRubric, addRun, selectedModule, setSelectedModule, selectedLesson, setSelectedLesson, selectedMission, setSelectedMission, selectedProject, setSelectedProject, selectedTerm, setSelectedTerm, selectedInterview, setSelectedInterview, selectedTrack, setSelectedTrack, setTab, setPlacement, chooseTrack, saveVault, saveSprint, toggleSpaced, toggleProductionLab }

  return (
    <div className="min-h-[100dvh] text-[#07140f]">
      <div className="mx-auto min-h-[100dvh] max-w-[430px] app-frame shadow-2xl">
        <Header score={score.total} />
        <main className="px-4 pb-28 pt-4">
          {tab === 'today' && <Today {...shared} />}
          {tab === 'learn' && <Learn {...shared} />}
          {tab === 'code' && <Code {...shared} />}
          {tab === 'build' && <Build {...shared} />}
          {tab === 'evidence' && <Evidence {...shared} />}
          {tab === 'career' && <Career {...shared} />}
          {tab === 'profile' && <Profile {...shared} />}
        </main>
        <BottomNav active={tab} setActive={setTab} />
      </div>
    </div>
  )
}

function Header({ score }) {
  return (
    <header className="sticky top-0 z-30 safe-top border-b border-white/10 bg-[#07140f]/95 px-4 pb-4 text-white backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-[#9ff2c8]">Portfolio Edition</p>
          <h1 className="mt-1 text-[22px] font-black leading-[1.05] tracking-[-0.04em] text-balance">SkillForge AI</h1>
          <p className="mt-1 text-xs text-white/58">Offline Bootcamp · Code Missions · Capstone · Author: {author}</p>
        </div>
        <div className="grid h-[64px] w-[64px] shrink-0 place-items-center rounded-[1.4rem] border border-white/10 bg-white/[0.07]">
          <div className="text-center"><div className="text-xl font-black">{score}%</div><div className="font-mono text-[8px] uppercase tracking-widest text-white/50">Ready</div></div>
        </div>
      </div>
      <Progress value={score} dark />
    </header>
  )
}

function BottomNav({ active, setActive }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-[#07140f]/10 glass-tab px-2 pt-2 safe-bottom shadow-[0_-22px_60px_rgba(7,20,15,.12)]">
      <div className="grid grid-cols-7 gap-1">
        {tabs.map((item) => <button key={item.id} onClick={() => setActive(item.id)} className={cn('rounded-[1.1rem] px-1 py-2.5 text-center transition-all', active === item.id ? 'bg-[#07140f] text-white shadow-ink' : 'text-[#607069] hover:bg-[#07140f]/5')}><div className="text-[15px]">{item.icon}</div><div className="mt-1 text-[8px] font-black">{item.label}</div></button>)}
      </div>
    </nav>
  )
}

function Today({ progress, score, currentLesson, unlocked, setTab, setSelectedLesson, setSelectedProject, toggleArray, setPlacement, selectedTrack, chooseTrack }) {
  const quest = quests.find((q) => !progress.completedQuests.includes(q.id)) || quests[0]
  const daily = dailyChallenges[(progress.completedDaily.length + progress.completedLessons.length) % dailyChallenges.length]
  const nova = novaLines[(progress.completedLessons.length + score.projectIds.length) % novaLines.length]
  const weekIndex = Math.min(weeklyPlan.length - 1, Math.floor(progress.completedLessons.length / 8))
  const week = weeklyPlan[weekIndex]
  return <section className="space-y-4">
    <div className="taste-hero rounded-[2rem] p-5 text-white shadow-lift">
      <span className="rounded-full bg-[#9ff2c8] px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-[#07140f]">Real Bootcamp</span>
      <h2 className="mt-4 text-[33px] font-black leading-[.95] tracking-[-.08em] text-balance">Học thật. Có evidence. Sẵn sàng đưa lên GitHub/CV.</h2>
      <p className="mt-4 text-sm leading-relaxed text-white/62">{product.promise}</p>
      <div className="mt-5 grid grid-cols-3 gap-2"><MiniMetric label="Lessons" value={`${progress.completedLessons.length}/${lessons.length}`} /><MiniMetric label="Missions" value={`${progress.completedMissions.length}/${codeMissions.length}`} /><MiniMetric label="Capstone" value={unlocked ? 'Open' : 'Locked'} /></div>
    </div>

    <Card>
      <div className="flex gap-3"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-[1.3rem] bg-[#07140f] text-[#9ff2c8] font-black">N</div><div><p className="mono-label text-[#0d7c61]">Mentor Nova</p><p className="mt-1 text-sm font-bold leading-relaxed text-[#26352f]">{nova}</p></div></div>
    </Card>

    <Card>
      <p className="mono-label text-[#0d7c61]">Week {week.week} / 12</p>
      <h3 className="mt-1 text-xl font-black tracking-[-.04em]">{week.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#607069]">{week.outcome}</p>
      <div className="mt-3 rounded-[1.2rem] bg-[#9ff2c8]/25 p-3 text-xs font-black">Deliverable: {week.deliverable}</div>
    </Card>

    <div className="grid grid-cols-2 gap-3">
      <button onClick={() => { setSelectedLesson(currentLesson.id); setTab('learn') }} className="surface-card rounded-[1.6rem] p-4 text-left"><p className="mono-label text-[#607069]">Next Lesson</p><h3 className="mt-2 text-lg font-black leading-tight">{currentLesson.title}</h3><p className="mt-2 text-xs text-[#607069]">{currentLesson.duration}</p></button>
      <button onClick={() => { setSelectedProject('capstone-document-qa-assistant'); setTab('build') }} className="ink-card rounded-[1.6rem] p-4 text-left"><p className="mono-label text-[#ffd36e]">Capstone</p><h3 className="mt-2 text-lg font-black leading-tight">Document Q&A Assistant</h3><p className="mt-2 text-xs text-white/60">{unlocked ? 'Mở khóa' : 'Cần thêm evidence'}</p></button>
    </div>

    <PlacementTest progress={progress} setPlacement={setPlacement} />
    <TrackSelector progress={progress} selectedTrack={selectedTrack} chooseTrack={chooseTrack} compact />

    <Card>
      <p className="mono-label text-[#0d7c61]">Quest System</p><h3 className="mt-1 text-xl font-black tracking-[-.04em]">{quest.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#607069]">{quest.task}</p><button onClick={() => toggleArray('completedQuests', quest.id)} className="mt-3 w-full rounded-2xl bg-[#07140f] px-4 py-3 text-sm font-black text-white">{progress.completedQuests.includes(quest.id) ? 'Đã hoàn thành' : `Claim: ${quest.reward}`}</button>
    </Card>

    <Card>
      <p className="mono-label text-[#0d7c61]">Daily AI Challenge · {daily.time}</p><h3 className="mt-1 text-xl font-black tracking-[-.04em]">{daily.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#607069]">{daily.task}</p><button onClick={() => toggleArray('completedDaily', daily.id)} className={cn('mt-3 w-full rounded-2xl px-4 py-3 text-sm font-black', progress.completedDaily.includes(daily.id) ? 'bg-[#9ff2c8] text-[#07140f]' : 'bg-[#ffd36e] text-[#07140f]')}>{progress.completedDaily.includes(daily.id) ? 'Đã xong' : 'Hoàn thành challenge'}</button>
    </Card>
  </section>
}


function PlacementTest({ progress, setPlacement }) {
  const score = placementScore(progress)
  return <Card>
    <div className="flex items-start justify-between gap-3">
      <div><p className="mono-label text-[#0d7c61]">Placement Test</p><h3 className="mt-1 text-xl font-black tracking-[-.04em]">Chọn đường học đúng trình độ</h3><p className="mt-2 text-sm leading-relaxed text-[#607069]">Kết quả hiện tại: <b>{score.level}</b> · {score.pct}%. Mục tiêu là không nhảy vào RAG/ML quá sớm khi nền Python/Data còn yếu.</p></div>
      <Badge>{score.pct}%</Badge>
    </div>
    <div className="mt-4 grid gap-3">{placementQuestions.map((q) => <div key={q.id} className="rounded-[1.2rem] bg-white p-3"><p className="text-sm font-black">{q.q}</p><div className="mt-2 grid gap-2">{q.options.map((o, i) => <button key={o} onClick={() => setPlacement(q.id, q.scores[i])} className={cn('rounded-xl border px-3 py-2 text-left text-xs font-bold', Number(progress.placementAnswers?.[q.id]) === q.scores[i] ? 'border-[#07140f] bg-[#07140f] text-white' : 'border-[#07140f]/10 bg-[#f8f6ef]')}>{o}</button>)}</div></div>)}</div>
  </Card>
}

function TrackSelector({ selectedTrack, chooseTrack, compact = false }) {
  const active = careerTracks.find((track) => track.id === selectedTrack) || careerTracks[0]
  return <Card>
    <p className="mono-label text-[#0d7c61]">Career Tracks</p>
    <h3 className="mt-1 text-xl font-black tracking-[-.04em]">Đường ứng tuyển nên theo trước</h3>
    <Scroller className="mt-3">{careerTracks.map((track) => <button key={track.id} onClick={() => chooseTrack(track.id)} className={cn('min-w-[210px] rounded-[1.4rem] border p-3 text-left', active.id === track.id ? 'border-[#07140f] bg-[#07140f] text-white' : 'border-[#07140f]/10 bg-white')}><p className="mono-label opacity-60">Track</p><h4 className="mt-1 text-base font-black">{track.title}</h4><p className="mt-2 text-xs leading-relaxed opacity-70">{track.bestFor}</p></button>)}</Scroller>
    {!compact && <div className="mt-4 rounded-[1.2rem] bg-[#f1f5ef] p-3"><p className="text-xs font-black uppercase tracking-[.14em] text-[#607069]">Focus</p><div className="mt-2 flex flex-wrap gap-2">{active.focus.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-black">{item}</span>)}</div><p className="mt-3 text-xs font-bold text-[#607069]">Must ship: {active.mustShip.join(' · ')}</p></div>}
  </Card>
}

function Learn({ progress, selectedModule, setSelectedModule, selectedLesson, setSelectedLesson, selectedTerm, setSelectedTerm, toggleArray, setQuiz }) {
  const module = modules.find((m) => m.id === selectedModule) || modules[0]
  const list = moduleLessons(module.id)
  const lesson = lessons.find((l) => l.id === selectedLesson) || list[0]
  const term = terms.find((t) => t.id === selectedTerm) || terms[0]
  const pct = clamp(list.filter((l) => progress.completedLessons.includes(l.id)).length / list.length * 100)
  return <section className="space-y-4">
    <SectionIntro kicker="Learn" title={`${lessons.length} bài học ngắn, theo chuẩn bootcamp`} subtitle="Mỗi bài có mục tiêu, ví dụ đời thường, kỹ thuật, lỗi sai, code task, interview và portfolio link." />
    <Scroller>{modules.map((m) => <button key={m.id} onClick={() => { setSelectedModule(m.id); setSelectedLesson(m.lessonIds[0]) }} className={cn('min-w-[178px] rounded-[1.5rem] border p-4 text-left', m.id === module.id ? 'border-[#07140f] bg-[#07140f] text-white shadow-ink' : 'border-[#07140f]/10 bg-white/80')}><p className="mono-label opacity-60">Module {m.number}</p><h3 className="mt-2 text-base font-black leading-tight">{m.short}</h3><p className="mt-2 text-xs leading-relaxed opacity-65">{m.outcome}</p></button>)}</Scroller>
    <Card><div className="flex items-start justify-between gap-4"><div><p className="mono-label text-[#0d7c61]">{module.title}</p><h3 className="mt-1 text-xl font-black tracking-[-.04em]">{module.outcome}</h3></div><Badge>{pct}%</Badge></div><Progress value={pct} /></Card>
    <div className="grid grid-cols-[.95fr_1.05fr] gap-3">
      <div className="space-y-2 max-h-[620px] overflow-auto no-scrollbar">{list.map((l) => <button key={l.id} onClick={() => setSelectedLesson(l.id)} className={cn('w-full rounded-[1.2rem] border p-3 text-left', selectedLesson === l.id ? 'border-[#07140f] bg-[#07140f] text-white' : 'border-[#07140f]/10 bg-white/80')}><p className="text-[10px] font-black uppercase tracking-[.12em] opacity-60">{progress.completedLessons.includes(l.id) ? 'Done' : l.level}</p><h4 className="mt-1 text-[13px] font-black leading-tight">{l.title}</h4></button>)}</div>
      <LessonCard lesson={lesson} progress={progress} toggleArray={toggleArray} setQuiz={setQuiz} />
    </div>
    <Card><div className="flex items-center justify-between gap-3"><div><p className="mono-label text-[#0d7c61]">Beginner Translator</p><h3 className="mt-1 text-xl font-black">Thuật ngữ AI sang tiếng người</h3></div><button onClick={() => toggleArray('masteredTerms', term.id)} className={cn('rounded-full px-3 py-2 text-xs font-black', progress.masteredTerms.includes(term.id) ? 'bg-[#9ff2c8] text-[#07140f]' : 'bg-[#07140f] text-white')}>{progress.masteredTerms.includes(term.id) ? 'Đã hiểu' : 'Tôi hiểu'}</button></div><Scroller className="mt-4">{terms.map((t) => <button key={t.id} onClick={() => setSelectedTerm(t.id)} className={cn('min-w-fit rounded-full border px-3 py-2 text-xs font-black', term.id === t.id ? 'border-[#07140f] bg-[#07140f] text-white' : 'border-[#07140f]/10 bg-white')}>{t.term}</button>)}</Scroller><TermCard term={term} /></Card>
  </section>
}

function LessonCard({ lesson, progress, toggleArray, setQuiz }) {
  const [choice, setChoice] = useState(null)
  const [result, setResult] = useState('')
  const quiz = lesson.quiz[0]
  const done = progress.completedLessons.includes(lesson.id)
  const score = progress.quizScores?.[lesson.id] || 0
  return <article className="surface-card rounded-[1.7rem] p-4">
    <p className="mono-label text-[#607069]">{lesson.duration} · {lesson.level}</p><h3 className="mt-2 text-xl font-black leading-tight tracking-[-.04em]">{lesson.title}</h3>
    {['objective','beginner','analogy','technical','mistake','lab','codeTask','interview','portfolio'].map((key) => <Layer key={key} title={labels[key]} text={lesson[key]} dark={key === 'interview'} />)}
    <div className="mt-4 rounded-[1.2rem] bg-[#ffd36e]/20 p-3"><p className="text-xs font-black uppercase tracking-[.14em] text-[#607069]">Quiz</p><p className="mt-1 text-sm font-bold leading-relaxed">{quiz.q}</p><div className="mt-3 grid gap-2">{quiz.options.map((o, i) => <button key={o} onClick={() => setChoice(i)} className={cn('rounded-xl border px-3 py-2 text-left text-xs font-bold', choice === i ? 'border-[#07140f] bg-[#07140f] text-white' : 'border-[#07140f]/10 bg-[#f8f6ef]')}>{o}</button>)}</div><button onClick={() => { const ok = choice === quiz.answer; setQuiz(lesson.id, ok ? 100 : 40); setResult(`${ok ? 'Đúng.' : 'Chưa đúng.'} ${quiz.why}`) }} className="mt-3 w-full rounded-xl bg-[#ffd36e] px-3 py-2 text-xs font-black text-[#07140f]">Chấm câu này</button>{result && <p className="mt-2 text-xs font-bold leading-relaxed text-[#0d7c61]">{result}</p>}</div>
    <button onClick={() => toggleArray('completedLessons', lesson.id)} className={cn('mt-3 w-full rounded-2xl px-4 py-3 text-sm font-black', done ? 'bg-[#9ff2c8] text-[#07140f]' : 'bg-[#07140f] text-white')}>{done ? 'Đã học' : 'Hoàn thành bài'}</button><p className="mt-2 text-center text-xs font-bold text-[#607069]">Quiz score: {score}%</p>
  </article>
}
const labels = { objective:'Mục tiêu', beginner:'Dễ hiểu', analogy:'Ví dụ đời thường', technical:'Kỹ thuật hơn', mistake:'Sai lầm thường gặp', lab:'Mini lab', codeTask:'Code task', interview:'Nói như phỏng vấn', portfolio:'Portfolio link' }

function Code({ progress, selectedMission, setSelectedMission, toggleArray, toggleProductionLab }) {
  const mission = getMission(selectedMission) || codeMissions[0]
  return <section className="space-y-4"><SectionIntro kicker="Code Missions" title="Bài tập code thật, có starter kits" subtitle="Đây là phần biến app từ học lý thuyết thành bootcamp có evidence. Mỗi mission có folder trong /starter-kits." />
    <Scroller>{codeMissions.map((m) => <button key={m.id} onClick={() => setSelectedMission(m.id)} className={cn('min-w-[190px] rounded-[1.5rem] border p-4 text-left', mission.id === m.id ? 'border-[#07140f] bg-[#07140f] text-white' : 'border-[#07140f]/10 bg-white/80')}><p className="mono-label opacity-60">{m.level}</p><h3 className="mt-2 text-base font-black leading-tight">{m.title}</h3><p className="mt-2 text-xs opacity-65">{m.folder}</p></button>)}</Scroller>
    <div className="ink-card rounded-[2rem] p-5"><p className="mono-label text-[#9ff2c8]">Starter Kit</p><h2 className="mt-2 text-3xl font-black tracking-[-.06em]">{mission.title}</h2><p className="mt-3 text-sm leading-relaxed text-white/68">{mission.objective}</p><div className="mt-4 codebox rounded-[1.2rem] p-3 text-xs overflow-auto">cd {mission.folder}\npython {mission.files.find((f) => f.endsWith('.py')) || 'main.py'}</div></div>
    <Card><p className="mono-label text-[#0d7c61]">Files cần có</p><div className="mt-3 grid gap-2">{mission.files.map((file) => <div key={file} className="rounded-xl bg-[#f1f5ef] p-3 text-sm font-bold">{file}</div>)}</div></Card>
    <Card><p className="mono-label text-[#0d7c61]">Done Criteria</p><div className="mt-3 grid gap-2">{mission.checks.map((check) => <div key={check} className="flex gap-2 rounded-xl bg-white p-3 text-sm font-bold"><span>□</span>{check}</div>)}</div><button onClick={() => toggleArray('completedMissions', mission.id)} className={cn('mt-4 w-full rounded-2xl px-4 py-3 text-sm font-black', progress.completedMissions.includes(mission.id) ? 'bg-[#9ff2c8] text-[#07140f]' : 'bg-[#07140f] text-white')}>{progress.completedMissions.includes(mission.id) ? 'Mission completed' : 'Tôi đã hoàn thành mission'}</button></Card>
    <CodeMissionUX mission={mission} progress={progress} />
    <ProductionThinking progress={progress} toggleProductionLab={toggleProductionLab} />
    <LabsAndBattles progress={progress} toggleArray={toggleArray} />
  </section>
}


function CodeMissionUX({ mission }) {
  const steps = [
    `Mở thư mục ${mission.folder}`,
    `Đọc README.md trước khi chạy code`,
    `Chạy file Python chính: ${mission.files.find((f) => f.endsWith('.py')) || 'main.py'}`,
    'Chụp hoặc copy terminal output',
    'Sửa ít nhất 1 phần nhỏ để biến project thành của bạn',
    'Dán output/evidence vào Evidence Vault'
  ]
  const errors = ['Sai thư mục khi chạy lệnh', 'Quên đọc README', 'Chỉ chạy được nhưng không giải thích được', 'Không lưu terminal output', 'README không ghi limitation']
  return <Card>
    <p className="mono-label text-[#0d7c61]">Code Mission UX</p>
    <h3 className="mt-1 text-xl font-black tracking-[-.04em]">Checklist từng bước như mentor thật</h3>
    <div className="mt-3 grid gap-2">{steps.map((step, i) => <div key={step} className="rounded-xl bg-white p-3 text-sm font-bold"><b>{i + 1}.</b> {step}</div>)}</div>
    <div className="mt-3 rounded-[1.2rem] bg-[#ffd36e]/25 p-3"><p className="text-xs font-black uppercase tracking-[.14em] text-[#607069]">Lỗi hay gặp</p><ul className="mt-2 ml-4 list-disc text-sm leading-relaxed">{errors.map((e) => <li key={e}>{e}</li>)}</ul></div>
  </Card>
}

function ProductionThinking({ progress, toggleProductionLab }) {
  return <Card>
    <p className="mono-label text-[#0d7c61]">Production Thinking Mini-Lab</p>
    <h3 className="mt-1 text-xl font-black tracking-[-.04em]">Tập nghĩ như người build sản phẩm AI thật</h3>
    <div className="mt-3 grid gap-3">{productionLabs.map((lab) => <details key={lab.id} className="rounded-[1.2rem] bg-white p-3"><summary className="cursor-pointer text-sm font-black">{lab.title}</summary><p className="mt-2 text-sm text-[#607069]">{lab.scenario}</p><ol className="mt-3 space-y-2">{lab.decisionTree.map((item, i) => <li key={item} className="rounded-xl bg-[#f1f5ef] p-2 text-xs font-bold"><b>{i + 1}.</b> {item}</li>)}</ol><p className="mt-3 rounded-xl bg-[#07140f] p-3 text-xs font-bold text-white">Output: {lab.output}</p><button onClick={() => toggleProductionLab(lab.id)} className={cn('mt-3 rounded-full px-3 py-2 text-xs font-black', progress.completedProductionLabs.includes(lab.id) ? 'bg-[#9ff2c8] text-[#07140f]' : 'bg-[#07140f] text-white')}>{progress.completedProductionLabs.includes(lab.id) ? 'Lab done' : 'Prove lab'}</button></details>)}</div>
  </Card>
}

function LabsAndBattles({ progress, toggleArray }) {
  return <div className="space-y-4"><SectionIntro kicker="Lab + Boss + Detective" title="Học vui nhưng nghiêm túc" subtitle="Mỗi thử thách dạy bạn debug AI app và giải thích lỗi." />{labs.map((lab) => <Card key={lab.id}><div className="flex justify-between gap-3"><div><p className="mono-label text-[#0d7c61]">{lab.type}</p><h3 className="mt-1 text-xl font-black">{lab.title}</h3><p className="mt-2 text-sm text-[#607069]">{lab.goal}</p></div><button onClick={() => toggleArray('completedLabs', lab.id)} className="h-fit rounded-full bg-[#07140f] px-3 py-2 text-xs font-black text-white">{progress.completedLabs.includes(lab.id) ? 'Done' : 'Run'}</button></div><div className="mt-3 rounded-[1.2rem] bg-[#f1f5ef] p-3 text-sm">{lab.scenario}</div><ol className="mt-3 space-y-2">{lab.steps.map((s, i) => <li key={s} className="rounded-xl bg-white p-3 text-sm"><b>{i+1}.</b> {s}</li>)}</ol><p className="mt-3 rounded-xl bg-[#07140f] p-3 text-sm font-bold text-white">{lab.reflection}</p></Card>)}<BossPanel progress={progress} toggleArray={toggleArray} /><DetectivePanel progress={progress} toggleArray={toggleArray} /></div>
}

function Build({ progress, selectedProject, setSelectedProject, toggleProof, saveEvidence, toggleRubric, addRun, unlocked }) {
  const project = projects.find((p) => p.id === selectedProject) || projects[0]
  return <section className="space-y-4"><SectionIntro kicker="Build" title="Project Evidence System" subtitle="Không bấm Mark tự do. Muốn hoàn thành phải qua Learn → Lab → Code → Build → Explain → Portfolio." />
    <Scroller>{projects.map((p) => <button key={p.id} onClick={() => setSelectedProject(p.id)} className={cn('min-w-[205px] rounded-[1.5rem] border p-4 text-left', selectedProject === p.id ? 'border-[#07140f] bg-[#07140f] text-white shadow-ink' : 'border-[#07140f]/10 bg-white/80')}><p className="mono-label opacity-60">{p.level}</p><h3 className="mt-2 text-base font-black leading-tight">{p.title}</h3><p className="mt-2 text-xs opacity-65">{p.focus}</p></button>)}</Scroller>
    <ProjectDetail project={project} progress={progress} toggleProof={toggleProof} saveEvidence={saveEvidence} />
    {project.id === 'capstone-document-qa-assistant' && <CapstonePanel progress={progress} toggleRubric={toggleRubric} addRun={addRun} unlocked={unlocked} />}
  </section>
}

function ProjectDetail({ project, progress, toggleProof, saveEvidence }) {
  const proof = progress.projectProofs?.[project.id] || {}
  const mission = getMission(project.missionId)
  const done = proofSteps.every((s) => proof[s.id])
  return <Card><div className="flex items-start justify-between gap-4"><div><p className="mono-label text-[#0d7c61]">{project.level}</p><h2 className="mt-1 text-2xl font-black tracking-[-.05em]">{project.title}</h2><p className="mt-2 text-sm leading-relaxed text-[#607069]">{project.focus}</p></div><Badge>{done ? 'Ready' : 'Proof'}</Badge></div>
    {mission && <div className="mt-4 rounded-[1.3rem] bg-[#f1f5ef] p-3"><p className="text-xs font-black uppercase tracking-[.14em] text-[#607069]">Code Mission</p><p className="mt-1 text-sm font-bold">{mission.title} · {mission.folder}</p></div>}
    <div className="mt-4 grid grid-cols-2 gap-2">{proofSteps.map((step) => <button key={step.id} onClick={() => toggleProof(project.id, step.id)} className={cn('rounded-[1.1rem] border p-3 text-left', proof[step.id] ? 'border-[#9ff2c8] bg-[#9ff2c8] text-[#07140f]' : 'border-[#07140f]/10 bg-white')}><p className="text-sm font-black">{step.label}</p><p className="mt-1 text-[11px] leading-tight opacity-70">{step.description}</p></button>)}</div>
    <div className="mt-4"><p className="mono-label text-[#0d7c61]">Evidence cần nộp</p><div className="mt-2 grid gap-2">{project.evidence.map((e) => <div key={e} className="rounded-xl bg-white p-3 text-sm font-bold">□ {e}</div>)}</div><textarea defaultValue={progress.evidenceLinks?.[project.id] || ''} onBlur={(e) => saveEvidence(project.id, e.target.value)} placeholder="Dán link GitHub / ghi chú evidence / screenshot path..." className="mt-3 min-h-[82px] w-full rounded-2xl border border-[#07140f]/10 bg-white p-3 text-sm outline-none" /></div>
    <div className="mt-4 grid gap-3"><Template title="README Template" text={generateReadme(project)} /><Template title="CV Line" text={generateCvLine(project)} /><Template title="Interview Script" text={generateInterviewScript(project)} /></div>
  </Card>
}

function CapstonePanel({ progress, toggleRubric, addRun, unlocked }) {
  const [question, setQuestion] = useState('RAG giúp giảm hallucination như thế nào?')
  const [result, setResult] = useState(null)
  const points = capstoneRubric.reduce((sum, item) => sum + (progress.capstoneRubric?.[item.id] ? item.points : 0), 0)
  const run = () => { const res = answerQuestion(question); const report = scoreCapstoneRun(question, res); const payload = { question, ...res, report }; setResult(payload); addRun(payload) }
  return <div className="ink-card rounded-[2rem] p-5"><p className="mono-label text-[#9ff2c8]">AI Career Capstone</p><h2 className="mt-2 text-3xl font-black tracking-[-.06em]">Document Q&A Assistant</h2><p className="mt-3 text-sm leading-relaxed text-white/68">Mô phỏng RAG offline: tài liệu local → keyword retrieval → câu trả lời có nguồn → evaluation/no-answer. {unlocked ? 'Capstone đã mở khóa.' : 'Capstone đang khóa mềm; vẫn có thể xem để học, nhưng chưa nên đánh dấu hoàn thành.'}</p>
    <div className="mt-4 rounded-[1.4rem] bg-white/[.07] p-3"><p className="text-xs font-black uppercase tracking-[.14em] text-white/50">Documents</p><div className="mt-2 grid gap-2">{capstoneDocuments.map((doc) => <details key={doc.id} className="rounded-xl bg-white/[.06] p-3"><summary className="cursor-pointer text-sm font-black">{doc.source}: {doc.title}</summary><p className="mt-2 text-xs leading-relaxed text-white/65">{doc.text}</p></details>)}</div></div>
    <div className="mt-4 rounded-[1.4rem] bg-white/[.07] p-3"><p className="text-xs font-black uppercase tracking-[.14em] text-white/50">RAG Sandbox</p><textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="mt-2 min-h-[80px] w-full rounded-2xl border border-white/10 bg-[#07140f] p-3 text-sm text-white outline-none" /><button onClick={run} className="mt-3 w-full rounded-2xl bg-[#9ff2c8] px-4 py-3 text-sm font-black text-[#07140f]">Run offline retrieval</button>{result && <div className="mt-3 rounded-2xl bg-[#07140f] p-3"><p className="text-sm font-bold leading-relaxed text-white">{result.text}</p><p className="mt-2 text-xs text-[#9ff2c8]">Confidence: {result.confidence} · Eval estimate: {result.report.estimated}%</p><div className="mt-2 grid gap-1">{result.docs.map((d) => <p key={d.id} className="text-xs text-white/58">Source: {d.source} · score {d.score}</p>)}</div></div>}</div>
    <div className="mt-4 rounded-[1.4rem] bg-white/[.07] p-3"><p className="text-xs font-black uppercase tracking-[.14em] text-white/50">Test Set</p><div className="mt-2 grid gap-2">{capstoneTestSet.map((t, i) => <div key={t.q} className="rounded-xl bg-white/[.06] p-3 text-xs leading-relaxed"><b>Q{i+1}:</b> {t.q}<br/><span className="text-white/52">Expected source: {t.expectedSource}</span></div>)}</div></div>
    <div className="mt-4 rounded-[1.4rem] bg-white/[.07] p-3"><div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.14em] text-white/50">Rubric 100 điểm</p><Badge>{points}/100</Badge></div><div className="mt-3 grid gap-2">{capstoneRubric.map((r) => <button key={r.id} onClick={() => toggleRubric(r.id)} className={cn('rounded-xl p-3 text-left text-sm font-bold', progress.capstoneRubric?.[r.id] ? 'bg-[#9ff2c8] text-[#07140f]' : 'bg-white/[.06] text-white')}><span className="font-black">{r.points}đ</span> · {r.label}</button>)}</div></div>
  </div>
}


function Evidence({ progress, score, saveVault, toggleSpaced, saveSprint }) {
  const activeWeek = Math.min(weeklyPlan.length, Math.max(1, Math.floor(progress.completedLessons.length / 8) + 1))
  const vaultScore = projects.length ? clamp(projects.reduce((sum, project) => {
    const row = progress.evidenceVault?.[project.id] || {}
    const projectScore = evidenceTypes.reduce((inner, type) => inner + (row[type.id] ? type.weight : 0), 0)
    return sum + projectScore
  }, 0) / projects.length) : 0
  return <section className="space-y-4">
    <SectionIntro kicker="Evidence Vault" title="Bằng chứng năng lực để đưa lên GitHub/CV" subtitle="Không chỉ đánh dấu hoàn thành. Mỗi project cần repo, README, screenshot, terminal output, CV bullet và interview defense." />
    <div className="taste-hero rounded-[2rem] p-5 text-white"><p className="mono-label text-[#9ff2c8]">Evidence Score</p><h2 className="mt-2 text-5xl font-black tracking-[-.08em]">{vaultScore}%</h2><Progress value={vaultScore} dark /><p className="mt-3 text-sm text-white/60">Job readiness hiện tại: {score.total}%. Evidence càng rõ thì CV/GitHub càng thuyết phục.</p></div>

    <Card>
      <p className="mono-label text-[#0d7c61]">Project Evidence Matrix</p>
      <div className="mt-3 space-y-4">{projects.map((project) => <div key={project.id} className="rounded-[1.4rem] bg-white p-3"><h3 className="text-sm font-black">{project.title}</h3><div className="mt-3 grid gap-2">{evidenceTypes.map((type) => <label key={type.id} className="block"><p className="mb-1 text-[10px] font-black uppercase tracking-[.14em] text-[#607069]">{type.label} · {type.weight}đ</p><textarea defaultValue={progress.evidenceVault?.[project.id]?.[type.id] || ''} onBlur={(e) => saveVault(project.id, type.id, e.target.value)} placeholder={type.placeholder} className="min-h-[54px] w-full rounded-xl border border-[#07140f]/10 bg-[#f8f6ef] p-2 text-xs outline-none" /></label>)}</div></div>)}</div>
    </Card>

    <Card>
      <p className="mono-label text-[#0d7c61]">Spaced Repetition</p><h3 className="mt-1 text-xl font-black tracking-[-.04em]">Ôn thuật ngữ để không quên</h3><div className="mt-3 grid gap-2">{spacedReviewCards.map((card) => <details key={card.id} className="rounded-xl bg-white p-3"><summary className="cursor-pointer text-sm font-black">{card.topic}: {card.front}</summary><p className="mt-2 text-sm text-[#607069]">{card.back}</p><div className="mt-3 grid grid-cols-4 gap-1">{['Chưa hiểu','Hơi hiểu','Hiểu','Rất chắc'].map((level) => <button key={level} onClick={() => toggleSpaced(card.id, level)} className={cn('rounded-xl px-2 py-2 text-[10px] font-black', progress.spacedReviews?.[card.id] === level ? 'bg-[#07140f] text-white' : 'bg-[#f1f5ef] text-[#07140f]')}>{level}</button>)}</div></details>)}</div>
    </Card>

    <Card>
      <p className="mono-label text-[#0d7c61]">Weekly Sprint Review · Week {activeWeek}</p><h3 className="mt-1 text-xl font-black tracking-[-.04em]">Review như bootcamp thật</h3><div className="mt-3 grid gap-2">{sprintReviewQuestions.map((q, i) => <label key={q} className="block rounded-xl bg-white p-3"><p className="text-xs font-black">{i + 1}. {q}</p><textarea defaultValue={progress.sprintReviews?.[`week-${activeWeek}-${i}`] || ''} onBlur={(e) => saveSprint(`week-${activeWeek}-${i}`, e.target.value)} className="mt-2 min-h-[56px] w-full rounded-xl border border-[#07140f]/10 bg-[#f8f6ef] p-2 text-xs outline-none" /></label>)}</div>
    </Card>

    <Card>
      <p className="mono-label text-[#0d7c61]">Portfolio Export Pack</p><div className="mt-2 grid gap-2">{portfolioExportPack.map((item) => <div key={item} className="rounded-xl bg-white p-3 text-sm font-bold">□ {item}</div>)}</div><Template title="Full Portfolio Pack" text={generatePortfolioPack(projects, progress)} /><Template title="Capstone Evaluation Report" text={generateCapstoneReport(progress.capstoneRuns || [])} /></Card>
  </section>
}

function Career({ progress, score, selectedInterview, setSelectedInterview, saveAnswer, selectedTrack, chooseTrack }) {
  const ready = score.total >= 76
  return <section className="space-y-4"><SectionIntro kicker="Career" title="Ứng tuyển bằng evidence, không bằng lời hứa" subtitle="Tạo README/CV/LinkedIn, luyện phỏng vấn và kiểm tra xem đã sẵn sàng vị trí nào." />
    <TrackSelector progress={progress} selectedTrack={selectedTrack} chooseTrack={chooseTrack} />
    <Card><p className="mono-label text-[#0d7c61]">Career Reality Check</p><h2 className="mt-1 text-2xl font-black tracking-[-.05em]">{ready ? 'Có thể bắt đầu ứng tuyển intern/junior' : 'Chưa nên ứng tuyển vội'}</h2><p className="mt-2 text-sm leading-relaxed text-[#607069]">Điểm hiện tại: {score.total}%. Mục tiêu tối thiểu: 76% + 3 project có evidence + capstone rubric ≥ 75.</p><div className="mt-3 grid gap-2"><List title="Có thể hướng tới" items={product.canApply} /><List title="Chưa nên nhận là" items={product.notYet} /></div></Card>
    <Card><p className="mono-label text-[#0d7c61]">Portfolio Generator</p>{projects.map((p) => <details key={p.id} className="mt-3 rounded-2xl bg-white p-3"><summary className="cursor-pointer text-sm font-black">{p.title}</summary><Template title="README" text={generateReadme(p)} /><Template title="CV line" text={generateCvLine(p)} /><Template title="LinkedIn" text={generateLinkedIn(p)} /></details>)}</Card>
    <Card><p className="mono-label text-[#0d7c61]">Interview Simulator</p><Scroller className="mt-3">{interviewBank.map((q) => <button key={q} onClick={() => setSelectedInterview(q)} className={cn('min-w-[220px] rounded-2xl border p-3 text-left text-xs font-black', q === selectedInterview ? 'border-[#07140f] bg-[#07140f] text-white' : 'border-[#07140f]/10 bg-white')}>{q}</button>)}</Scroller><textarea defaultValue={progress.interviewAnswers?.[selectedInterview] || ''} onBlur={(e) => saveAnswer(selectedInterview, e.target.value)} placeholder="Tự viết câu trả lời của bạn ở đây..." className="mt-3 min-h-[120px] w-full rounded-2xl border border-[#07140f]/10 bg-white p-3 text-sm outline-none" /><p className="mt-2 rounded-xl bg-[#f1f5ef] p-3 text-xs font-bold leading-relaxed">Gợi ý: trả lời theo cấu trúc Problem → Approach → Result → Limitation → Next step.</p></Card>
  </section>
}

function Profile({ progress, score, update, toggleArray }) {
  return <section className="space-y-4"><SectionIntro kicker="Profile" title="Job Readiness Score" subtitle="Theo dõi tiến độ thật: lessons, code missions, project proof, capstone rubric, interview answers." />
    <div className="taste-hero rounded-[2rem] p-5 text-white"><p className="mono-label text-[#9ff2c8]">Total readiness</p><h2 className="mt-2 text-5xl font-black tracking-[-.08em]">{score.total}%</h2><Progress value={score.total} dark /><div className="mt-4 grid gap-2">{scoreWeights.map((w) => <div key={w.id} className="rounded-xl bg-white/[.07] p-3"><div className="flex justify-between text-sm font-black"><span>{w.label}</span><span>{score.values[w.id]}%</span></div><p className="mt-1 text-xs text-white/50">{w.description}</p></div>)}</div></div>
    <Card><p className="mono-label text-[#0d7c61]">Skill Tree</p>{skillTree.map((group) => <div key={group.group} className="mt-3"><h3 className="text-sm font-black">{group.group}</h3><div className="mt-2 flex flex-wrap gap-2">{group.skills.map((s) => <span key={s} className="rounded-full bg-[#9ff2c8]/35 px-3 py-2 text-xs font-black">{s}</span>)}</div></div>)}</Card>
    <Card><p className="mono-label text-[#0d7c61]">Mistake Museum</p>{mistakeMuseum.map((m) => <button key={m.id} onClick={() => toggleArray('collectedMistakes', m.id)} className={cn('mt-2 w-full rounded-xl p-3 text-left text-sm font-bold', progress.collectedMistakes.includes(m.id) ? 'bg-[#ffd36e] text-[#07140f]' : 'bg-white')}>{m.title}<p className="mt-1 text-xs font-normal opacity-70">{m.lesson}</p></button>)}</Card>
    <Card><p className="mono-label text-[#0d7c61]">Backup</p><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={() => exportProgress(progress)} className="rounded-2xl bg-[#07140f] px-4 py-3 text-sm font-black text-white">Export JSON</button><button onClick={() => update(resetProgress())} className="rounded-2xl bg-[#ffd36e] px-4 py-3 text-sm font-black text-[#07140f]">Reset</button></div></Card>
  </section>
}

function BossPanel({ progress, toggleArray }) { return <Card><p className="mono-label text-[#0d7c61]">Boss Battle</p>{bossBattles.map((b) => <details key={b.id} className="mt-2 rounded-xl bg-white p-3"><summary className="cursor-pointer text-sm font-black">{b.title}</summary><p className="mt-2 text-sm">{b.prompt}</p><p className="mt-2 rounded-xl bg-[#f1f5ef] p-3 text-xs font-bold">Đáp án tốt: {b.answer}</p><button onClick={() => toggleArray('defeatedBosses', b.id)} className="mt-2 rounded-full bg-[#07140f] px-3 py-2 text-xs font-black text-white">{progress.defeatedBosses.includes(b.id) ? 'Defeated' : 'Defeat boss'}</button></details>)}</Card> }
function DetectivePanel({ progress, toggleArray }) { return <Card><p className="mono-label text-[#0d7c61]">AI Detective</p>{detectiveCases.map((c) => <details key={c.id} className="mt-2 rounded-xl bg-white p-3"><summary className="cursor-pointer text-sm font-black">{c.title}</summary><p className="mt-2 text-xs font-black uppercase tracking-[.12em] text-[#607069]">Triệu chứng</p><ul className="ml-4 list-disc text-sm">{c.symptoms.map((s) => <li key={s}>{s}</li>)}</ul><p className="mt-2 text-xs font-black uppercase tracking-[.12em] text-[#607069]">Nghi phạm</p><ul className="ml-4 list-disc text-sm">{c.suspects.map((s) => <li key={s}>{s}</li>)}</ul><p className="mt-2 rounded-xl bg-[#f1f5ef] p-3 text-xs font-bold">Fix: {c.fix}</p><button onClick={() => toggleArray('solvedCases', c.id)} className="mt-2 rounded-full bg-[#07140f] px-3 py-2 text-xs font-black text-white">{progress.solvedCases.includes(c.id) ? 'Solved' : 'Solve case'}</button></details>)}</Card> }

function TermCard({ term }) { return <div className="mt-3 grid gap-2"><Info title="Dễ hiểu" text={term.simple} /><Info title="Ví dụ đời thường" text={term.analogy} /><Info title="Kỹ thuật" text={term.technical} /><Info title="Nói như phỏng vấn" text={term.interview} dark /><Info title="Sai lầm" text={term.mistake} /></div> }
function Template({ title, text }) { return <details className="rounded-2xl bg-[#f1f5ef] p-3"><summary className="cursor-pointer text-xs font-black uppercase tracking-[.14em] text-[#607069]">{title}</summary><pre className="mt-3 max-h-[220px] overflow-auto whitespace-pre-wrap rounded-xl bg-[#07140f] p-3 text-[11px] leading-relaxed text-[#d7fbe7]">{text}</pre></details> }
function List({ title, items }) { return <div className="rounded-2xl bg-[#f1f5ef] p-3"><p className="text-xs font-black uppercase tracking-[.14em] text-[#607069]">{title}</p><div className="mt-2 flex flex-wrap gap-2">{items.map((x) => <span key={x} className="rounded-full bg-white px-3 py-1.5 text-xs font-black">{x}</span>)}</div></div> }
function Layer({ title, text, dark }) { return <div className={cn('mt-3 rounded-[1.1rem] p-3', dark ? 'bg-[#07140f] text-white' : 'bg-[#f1f5ef]')}><p className={cn('text-[10px] font-black uppercase tracking-[.14em]', dark ? 'text-[#9ff2c8]' : 'text-[#607069]')}>{title}</p><p className="mt-1 text-sm leading-relaxed">{text}</p></div> }
function Info({ title, text, dark }) { return <div className={cn('rounded-[1.1rem] p-3', dark ? 'bg-[#07140f] text-white' : 'bg-white')}><p className={cn('text-[10px] font-black uppercase tracking-[.14em]', dark ? 'text-[#9ff2c8]' : 'text-[#607069]')}>{title}</p><p className="mt-1 text-sm leading-relaxed">{text}</p></div> }
function Card({ children }) { return <div className="surface-card rounded-[2rem] p-4">{children}</div> }
function SectionIntro({ kicker, title, subtitle }) { return <div><p className="mono-label text-[#0d7c61]">{kicker}</p><h2 className="mt-1 text-[28px] font-black leading-[.98] tracking-[-.06em] text-balance">{title}</h2><p className="mt-2 text-sm leading-relaxed text-[#607069]">{subtitle}</p></div> }
function Badge({ children }) { return <span className="inline-flex h-fit items-center rounded-full bg-[#9ff2c8] px-3 py-1 text-xs font-black text-[#07140f]">{children}</span> }
function Progress({ value, dark }) { return <div className={cn('mt-3 h-2 overflow-hidden rounded-full', dark ? 'bg-white/10' : 'bg-[#07140f]/10')}><div className="h-full rounded-full bg-[#9ff2c8]" style={{ width: `${clamp(value)}%` }} /></div> }
function MiniMetric({ label, value }) { return <div className="rounded-[1.1rem] bg-white/[.08] p-3"><p className="text-[10px] font-black uppercase tracking-[.14em] text-white/45">{label}</p><p className="mt-1 text-lg font-black">{value}</p></div> }
function Scroller({ children, className = '' }) { return <div className={cn('no-scrollbar flex gap-3 overflow-x-auto pb-1', className)}>{children}</div> }
