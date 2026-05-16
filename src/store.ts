import { defineStore } from "pinia";
import { LEXIQUE, type Term } from "./data";

export type Dir    = "jp-fr" | "fr-jp" | "both";
export type Screen =
  | "home"
  | "quiz"
  | "results"
  | "history"
  | "history-detail"
  | "quiz-libre"
  | "results-libre";

// ─── Interfaces QCM ─────────────────────────────────────────────────────────

export interface Question {
  dir: "jp-fr" | "fr-jp";
  term: Term;
  question: string;
  prompt: string;
  badge: string;
  options: string[];
  correct: number;
}

export interface Result {
  dir: "jp-fr" | "fr-jp";
  jp: string;
  ans: string;
  ok: boolean;
  given: string;
}

// ─── Historique (commun QCM + Libre) ────────────────────────────────────────

export interface SavedSession {
  id: string;
  date: string;
  type: "qcm" | "libre";
  // QCM
  mode?: Dir;
  results?: Result[];
  // Commun
  score: number;   // points libres ou bonnes réponses QCM
  total: number;   // max points libres ou nb questions QCM
  // Libre
  libreResults?: LibreResult[];
}

// ─── Interfaces Mode Libre ───────────────────────────────────────────────────

export interface LibreQuestion {
  term: Term;
  question: string; // définition française
  answer: string;   // terme japonais attendu
}

export interface LibreResult {
  jp: string;
  ans: string;
  attempts: number; // 1-4 si réussi, 0 si raté/passé
  points: number;   // 4,3,2,1,0
  finalInput: string;
}

export type HintLevel = "close" | "near" | "far";

export interface LibreAnswerResult {
  correct: boolean;
  points?: number;
  attemptsLeft: number;
  revealed?: string;
  hint?: { text: string; level: HintLevel };
}

// ─── Interfaces Brouillons ───────────────────────────────────────────────────

interface QcmDraft {
  questions: Question[];
  qIndex: number;
  answered: boolean;
  selectedIndex: number;
  score: number;
  sessionResults: Result[];
  mode: Dir;
  count: number;
}

interface LibreDraft {
  libreQuestions: LibreQuestion[];
  libreQIndex: number;
  libreAttempts: number;
  libreScore: number;
  libreResults: LibreResult[];
  libreCount: number;
}

// ─── Utilitaires ─────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Normalise pour la comparaison :
 * - minuscules, espaces supprimés, diacritiques/macrons retirés via NFD + filtre charCode
 * → "Tai sabaki" === "taisabaki", "Jōdan" === "Jodan" === "Jôdan"
 */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, "")
    .normalize("NFD")
    .split("")
    .filter((c) => {
      const code = c.charCodeAt(0);
      return code < 0x0300 || code > 0x036f;
    })
    .join("");
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function proximityHint(input: string, answer: string): { text: string; level: HintLevel } {
  const normIn  = normalize(input);
  const normAns = normalize(answer);
  const dist    = levenshtein(normIn, normAns);
  const ratio   = dist / Math.max(normAns.length, 1);
  if (ratio <= 0.20) return { text: "Très proche ! Vérifiez l'orthographe.", level: "close" };
  if (ratio <= 0.45) return { text: "Vous y êtes presque…", level: "near" };
  return { text: "Ce n'est pas la bonne réponse.", level: "far" };
}

// ─── Persistance ─────────────────────────────────────────────────────────────

const STORAGE_KEY      = "quiz-kendo-history";
const DRAFT_KEY        = "quiz-kendo-draft";
const LIBRE_DRAFT_KEY  = "quiz-kendo-libre-draft";

function loadHistory(): SavedSession[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") ?? []; }
  catch { return []; }
}
function persistHistory(sessions: SavedSession[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions)); } catch {}
}

function loadDraft(): QcmDraft | null {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "null"); }
  catch { return null; }
}
function persistDraft(d: QcmDraft | null) {
  try { d === null ? localStorage.removeItem(DRAFT_KEY) : localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch {}
}

function loadLibreDraft(): LibreDraft | null {
  try { return JSON.parse(localStorage.getItem(LIBRE_DRAFT_KEY) ?? "null"); }
  catch { return null; }
}
function persistLibreDraft(d: LibreDraft | null) {
  try { d === null ? localStorage.removeItem(LIBRE_DRAFT_KEY) : localStorage.setItem(LIBRE_DRAFT_KEY, JSON.stringify(d)); } catch {}
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    screen: "home" as Screen,

    // ── QCM ──
    mode:           "both" as Dir,
    count:          20,
    questions:      [] as Question[],
    qIndex:         0,
    answered:       false,
    selectedIndex:  -1,
    score:          0,
    sessionResults: [] as Result[],

    // ── Historique ──
    sessionHistory: loadHistory() as SavedSession[],
    viewedSession:  null as SavedSession | null,

    // ── Brouillons ──
    draft:          loadDraft()       as QcmDraft   | null,
    libreDraft:     loadLibreDraft()  as LibreDraft | null,

    // ── Mode Saisie Libre ──
    libreCount:     20,
    libreQuestions: [] as LibreQuestion[],
    libreQIndex:    0,
    libreAttempts:  0,
    libreScore:     0,
    libreResults:   [] as LibreResult[],
  }),

  getters: {
    currentQ:  (state): Question     => state.questions[state.qIndex],
    allCount:  ():      number       => LEXIQUE.length,

    hasDraft:  (state): boolean      => state.draft !== null,
    draftProgress: (state) => {
      if (!state.draft) return null;
      return {
        current: state.draft.qIndex + 1,
        total:   state.draft.questions.length,
        score:   state.draft.score,
        mode:    state.draft.mode,
      };
    },

    hasLibreDraft: (state): boolean  => state.libreDraft !== null,
    libreDraftProgress: (state) => {
      if (!state.libreDraft) return null;
      return {
        current: state.libreDraft.libreQIndex + 1,
        total:   state.libreDraft.libreQuestions.length,
        score:   state.libreDraft.libreScore,
        count:   state.libreDraft.libreCount,
      };
    },

    currentLibreQ: (state): LibreQuestion => state.libreQuestions[state.libreQIndex],
    libreMaxScore: (state): number => state.libreQuestions.length * 4,
  },

  actions: {
    // ── QCM config ──
    setMode(mode: Dir)      { this.mode  = mode;  },
    setCount(count: number) { this.count = count; },

    // ── QCM ──
    startQuiz() {
      this.draft = null; persistDraft(null);
      const shuffled = shuffle(LEXIQUE);
      const n = Math.min(this.count >= LEXIQUE.length ? LEXIQUE.length : this.count, LEXIQUE.length);
      this.questions = shuffled.slice(0, n).map((term) => {
        const dir: "jp-fr" | "fr-jp" =
          this.mode === "both"
            ? Math.random() < 0.5 ? "jp-fr" : "fr-jp"
            : (this.mode as "jp-fr" | "fr-jp");
        const wrong = shuffle(LEXIQUE.filter((t) => t.jp !== term.jp)).slice(0, 3);
        const pool  = shuffle([term, ...wrong]);
        const ci    = pool.indexOf(term);
        return {
          dir, term,
          question: dir === "jp-fr" ? term.jp  : term.ans,
          prompt:   dir === "jp-fr" ? "Que signifie ce terme japonais ?" : "Quel est le terme japonais correspondant ?",
          badge:    dir === "jp-fr" ? "JP → FR" : "FR → JP",
          options:  pool.map((o) => (dir === "jp-fr" ? o.ans : o.jp)),
          correct:  ci,
        };
      });
      this.qIndex = 0; this.answered = false; this.selectedIndex = -1;
      this.score = 0;  this.sessionResults = [];
      this.screen = "quiz";
      this._saveDraft();
    },

    resumeQuiz() {
      if (!this.draft) return;
      const d = this.draft;
      this.questions = d.questions; this.qIndex = d.qIndex;
      this.answered  = d.answered;  this.selectedIndex = d.selectedIndex;
      this.score     = d.score;     this.sessionResults = d.sessionResults;
      this.mode      = d.mode;      this.count = d.count;
      this.screen    = "quiz";
    },

    discardDraft() { this.draft = null; persistDraft(null); },

    _saveDraft() {
      const d: QcmDraft = {
        questions: this.questions, qIndex: this.qIndex,
        answered: this.answered,   selectedIndex: this.selectedIndex,
        score: this.score,         sessionResults: [...this.sessionResults],
        mode: this.mode,           count: this.count,
      };
      this.draft = d; persistDraft(d);
    },

    selectAnswer(idx: number) {
      if (this.answered) return;
      this.selectedIndex = idx; this.answered = true;
      const ok = idx === this.currentQ.correct;
      if (ok) this.score++;
      this.sessionResults.push({
        dir: this.currentQ.dir, jp: this.currentQ.term.jp,
        ans: this.currentQ.term.ans, ok, given: this.currentQ.options[idx],
      });
      this._saveDraft();
    },

    nextQuestion() {
      if (this.qIndex >= this.questions.length - 1) {
        this._saveQcmSession();
        this.draft = null; persistDraft(null);
        this.screen = "results";
        return;
      }
      this.qIndex++;
      this.answered = false; this.selectedIndex = -1;
      this._saveDraft();
    },

    _saveQcmSession() {
      const session: SavedSession = {
        id: Date.now().toString(), date: new Date().toISOString(),
        type: "qcm", mode: this.mode,
        score: this.score, total: this.questions.length,
        results: [...this.sessionResults],
      };
      this._pushToHistory(session);
    },

    // ── Mode Libre ──
    setLibreCount(count: number) { this.libreCount = count; },

    startLibreQuiz() {
      this.libreDraft = null; persistLibreDraft(null);
      const shuffled = shuffle(LEXIQUE);
      const n = Math.min(this.libreCount >= LEXIQUE.length ? LEXIQUE.length : this.libreCount, LEXIQUE.length);
      this.libreQuestions = shuffled.slice(0, n).map((term) => ({
        term, question: term.ans, answer: term.jp,
      }));
      this.libreQIndex = 0; this.libreAttempts = 0;
      this.libreScore  = 0; this.libreResults  = [];
      this.screen = "quiz-libre";
      this._saveLibreDraft();
    },

    resumeLibreQuiz() {
      if (!this.libreDraft) return;
      const d = this.libreDraft;
      this.libreQuestions = d.libreQuestions;
      this.libreQIndex    = d.libreQIndex;
      this.libreAttempts  = d.libreAttempts;
      this.libreScore     = d.libreScore;
      this.libreResults   = d.libreResults;
      this.libreCount     = d.libreCount;
      this.screen = "quiz-libre";
    },

    discardLibreDraft() { this.libreDraft = null; persistLibreDraft(null); },

    _saveLibreDraft() {
      const d: LibreDraft = {
        libreQuestions: this.libreQuestions,
        libreQIndex:    this.libreQIndex,
        libreAttempts:  this.libreAttempts,
        libreScore:     this.libreScore,
        libreResults:   [...this.libreResults],
        libreCount:     this.libreCount,
      };
      this.libreDraft = d; persistLibreDraft(d);
    },

    submitLibreAnswer(input: string): LibreAnswerResult {
      const q = this.libreQuestions[this.libreQIndex];
      const correct = normalize(input) === normalize(q.answer);
      this.libreAttempts++;
      if (correct) {
        const points = 5 - this.libreAttempts;
        this.libreScore += points;
        this.libreResults.push({ jp: q.answer, ans: q.question, attempts: this.libreAttempts, points, finalInput: input });
        this._saveLibreDraft();
        return { correct: true, points, attemptsLeft: 4 - this.libreAttempts };
      }
      const attemptsLeft = 4 - this.libreAttempts;
      if (attemptsLeft <= 0) {
        this.libreResults.push({ jp: q.answer, ans: q.question, attempts: 0, points: 0, finalInput: input });
        this._saveLibreDraft();
        return { correct: false, attemptsLeft: 0, revealed: q.answer };
      }
      this._saveLibreDraft();
      return { correct: false, attemptsLeft, hint: proximityHint(input, q.answer) };
    },

    skipLibreQuestion() {
      const q = this.libreQuestions[this.libreQIndex];
      this.libreResults.push({ jp: q.answer, ans: q.question, attempts: 0, points: 0, finalInput: "" });
      this._saveLibreDraft();
    },

    nextLibreQuestion() {
      if (this.libreQIndex >= this.libreQuestions.length - 1) {
        this._saveLibreSession();
        this.libreDraft = null; persistLibreDraft(null);
        this.screen = "results-libre";
        return;
      }
      this.libreQIndex++;
      this.libreAttempts = 0;
      this._saveLibreDraft();
    },

    _saveLibreSession() {
      const session: SavedSession = {
        id: Date.now().toString(), date: new Date().toISOString(),
        type: "libre",
        score: this.libreScore,
        total: this.libreQuestions.length * 4,
        libreResults: [...this.libreResults],
      };
      this._pushToHistory(session);
    },

    // ── Historique ──
    _pushToHistory(session: SavedSession) {
      this.sessionHistory.unshift(session);
      if (this.sessionHistory.length > 100) this.sessionHistory = this.sessionHistory.slice(0, 100);
      persistHistory(this.sessionHistory);
    },

    goHome()    { this.screen = "home"; },
    goHistory() { this.screen = "history"; },

    viewSession(session: SavedSession) { this.viewedSession = session; this.screen = "history-detail"; },
    deleteSession(id: string) {
      this.sessionHistory = this.sessionHistory.filter((s) => s.id !== id);
      persistHistory(this.sessionHistory);
    },
    clearHistory() { this.sessionHistory = []; persistHistory([]); },
  },
});
