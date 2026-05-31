const KEY = 'skillforge_ai_career_bootcamp_v5'

export const defaultProgress = {
  completedLessons: [],
  quizScores: {},
  completedLabs: [],
  completedMissions: [],
  completedQuests: [],
  completedDaily: [],
  masteredTerms: [],
  defeatedBosses: [],
  solvedCases: [],
  collectedMistakes: [],
  projectProofs: {},
  evidenceLinks: {},
  capstoneRuns: [],
  capstoneRubric: {},
  interviewAnswers: {},
  notes: {},
  placementAnswers: {},
  selectedTrack: '',
  evidenceVault: {},
  spacedReviews: {},
  completedProductionLabs: [],
  sprintReviews: {},
  portfolioPack: {},
  lastTab: 'today'
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultProgress
    return { ...defaultProgress, ...JSON.parse(raw) }
  } catch {
    return defaultProgress
  }
}

export function saveProgress(progress) {
  localStorage.setItem(KEY, JSON.stringify({ ...defaultProgress, ...progress }))
}

export function resetProgress() {
  localStorage.removeItem(KEY)
  return defaultProgress
}

export function exportProgress(progress) {
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'skillforge-ai-progress.json'
  a.click()
  URL.revokeObjectURL(url)
}
