import { defineStore } from "pinia";
import { LEXIQUE, type Term } from "./data";

export type Dir    = "jp-fr" | "fr-jp" | "both";
export type Screen = "home" | "quiz" | "results" | "history" | "history-detail";

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

export interface SavedSession {
  id: string;
  date: string; // ISO 8601
  mode: Dir;
  score: number;
  total: number;
  results: Result[];
}

interface DraftState {
  questions: Question[];
  qIndex: number;
  answered: boolean;
  selectedIndex: number;
  score: number;
  sessionResults: Result[];
  mode: Dir;
  count: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STORAGE_KEY = "quiz-kendo-history";
const DRAFT_KEY   = "quiz-kendo-draft";

function loadHistory(): SavedSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistHistory(sessions: SavedSession[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {}
}

function loadDraft(): DraftState | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistDraft(draft: DraftState | null) {
  try {
    if (draft === null) {
      localStorage.removeItem(DRAFT_KEY);
    } else {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }
  } catch {}
}

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    screen:         "home" as Screen,
    mode:           "both" as Dir,
    count:          20,
    questions:      [] as Question[],
    qIndex:         0,
    answered:       false,
    selectedIndex:  -1,
    score:          0,
    sessionResults: [] as Result[],
    // Historique
    sessionHistory: loadHistory() as SavedSession[],
    viewedSession:  null as SavedSession | null,
    // Brouillon (partie en cours)
    draft:          loadDraft() as DraftState | null,
  }),

  getters: {
    currentQ:  (state): Question    => state.questions[state.qIndex],
    allCount:  ():      number      => LEXIQUE.length,
    hasDraft:  (state): boolean     => state.draft !== null,
    draftProgress: (state): { current: number; total: number; score: number; mode: Dir } | null => {
      if (!state.draft) return null;
      return {
        current: state.draft.qIndex + 1,
        total:   state.draft.questions.length,
        score:   state.draft.score,
        mode:    state.draft.mode,
      };
    },
  },

  actions: {
    setMode(mode: Dir)        { this.mode  = mode;  },
    setCount(count: number)   { this.count = count; },

    startQuiz() {
      // Efface tout brouillon existant avant de démarrer
      this.draft = null;
      persistDraft(null);

      const shuffled = shuffle(LEXIQUE);
      const n = Math.min(
        this.count >= LEXIQUE.length ? LEXIQUE.length : this.count,
        LEXIQUE.length
      );
      const selected = shuffled.slice(0, n);

      this.questions = selected.map((term) => {
        const dir: "jp-fr" | "fr-jp" =
          this.mode === "both"
            ? Math.random() < 0.5 ? "jp-fr" : "fr-jp"
            : (this.mode as "jp-fr" | "fr-jp");

        const wrong = shuffle(LEXIQUE.filter((t) => t.jp !== term.jp)).slice(0, 3);
        const pool  = shuffle([term, ...wrong]);
        const ci    = pool.indexOf(term);

        return {
          dir,
          term,
          question: dir === "jp-fr" ? term.jp : term.ans,
          prompt:   dir === "jp-fr" ? "Que signifie ce terme japonais ?" : "Quel est le terme japonais correspondant ?",
          badge:    dir === "jp-fr" ? "JP → FR" : "FR → JP",
          options:  pool.map((o) => (dir === "jp-fr" ? o.ans : o.jp)),
          correct:  ci,
        };
      });

      this.qIndex         = 0;
      this.answered       = false;
      this.selectedIndex  = -1;
      this.score          = 0;
      this.sessionResults = [];
      this.screen         = "quiz";
      this._saveDraft();
    },

    resumeQuiz() {
      if (!this.draft) return;
      const d = this.draft;
      this.questions      = d.questions;
      this.qIndex         = d.qIndex;
      this.answered       = d.answered;
      this.selectedIndex  = d.selectedIndex;
      this.score          = d.score;
      this.sessionResults = d.sessionResults;
      this.mode           = d.mode;
      this.count          = d.count;
      this.screen         = "quiz";
    },

    discardDraft() {
      this.draft = null;
      persistDraft(null);
    },

    _saveDraft() {
      const draft: DraftState = {
        questions:      this.questions,
        qIndex:         this.qIndex,
        answered:       this.answered,
        selectedIndex:  this.selectedIndex,
        score:          this.score,
        sessionResults: [...this.sessionResults],
        mode:           this.mode,
        count:          this.count,
      };
      this.draft = draft;
      persistDraft(draft);
    },

    selectAnswer(idx: number) {
      if (this.answered) return;
      this.selectedIndex = idx;
      this.answered      = true;
      const ok = idx === this.currentQ.correct;
      if (ok) this.score++;
      this.sessionResults.push({
        dir:   this.currentQ.dir,
        jp:    this.currentQ.term.jp,
        ans:   this.currentQ.term.ans,
        ok,
        given: this.currentQ.options[idx],
      });
      this._saveDraft();
    },

    nextQuestion() {
      if (this.qIndex >= this.questions.length - 1) {
        this._saveSession();
        // Efface le brouillon : la partie est terminée
        this.draft = null;
        persistDraft(null);
        this.screen = "results";
        return;
      }
      this.qIndex++;
      this.answered      = false;
      this.selectedIndex = -1;
      this._saveDraft();
    },

    _saveSession() {
      const session: SavedSession = {
        id:      Date.now().toString(),
        date:    new Date().toISOString(),
        mode:    this.mode,
        score:   this.score,
        total:   this.questions.length,
        results: [...this.sessionResults],
      };
      this.sessionHistory.unshift(session);
      if (this.sessionHistory.length > 100) {
        this.sessionHistory = this.sessionHistory.slice(0, 100);
      }
      persistHistory(this.sessionHistory);
    },

    goHome()    { this.screen = "home"; },
    goHistory() { this.screen = "history"; },

    viewSession(session: SavedSession) {
      this.viewedSession = session;
      this.screen        = "history-detail";
    },

    deleteSession(id: string) {
      this.sessionHistory = this.sessionHistory.filter((s) => s.id !== id);
      persistHistory(this.sessionHistory);
    },

    clearHistory() {
      this.sessionHistory = [];
      persistHistory([]);
    },
  },
});
