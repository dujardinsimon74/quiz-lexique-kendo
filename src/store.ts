import { defineStore } from "pinia";
import { LEXIQUE, type Term } from "./data";

export type Dir = "jp-fr" | "fr-jp" | "both";
export type Screen = "home" | "quiz" | "results";

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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    screen: "home" as Screen,
    mode: "both" as Dir,
    count: 20,
    questions: [] as Question[],
    qIndex: 0,
    answered: false,
    selectedIndex: -1,
    score: 0,
    sessionResults: [] as Result[],
  }),

  getters: {
    currentQ: (state): Question => state.questions[state.qIndex],
    allCount: (): number => LEXIQUE.length,
  },

  actions: {
    setMode(mode: Dir) {
      this.mode = mode;
    },

    setCount(count: number) {
      this.count = count;
    },

    startQuiz() {
      const shuffled = shuffle(LEXIQUE);
      const n =
        this.count >= LEXIQUE.length
          ? LEXIQUE.length
          : Math.min(this.count, LEXIQUE.length);
      const selected = shuffled.slice(0, n);

      this.questions = selected.map((term) => {
        const dir: "jp-fr" | "fr-jp" =
          this.mode === "both"
            ? Math.random() < 0.5
              ? "jp-fr"
              : "fr-jp"
            : (this.mode as "jp-fr" | "fr-jp");

        const wrong = shuffle(LEXIQUE.filter((t) => t.jp !== term.jp)).slice(
          0,
          3,
        );
        const pool = shuffle([term, ...wrong]);
        const ci = pool.indexOf(term);

        return {
          dir,
          term,
          question: dir === "jp-fr" ? term.jp : term.ans,
          prompt:
            dir === "jp-fr"
              ? "Que signifie ce terme japonais ?"
              : "Quel est le terme japonais correspondant ?",
          badge: dir === "jp-fr" ? "🇯🇵 → 🇫🇷" : "🇫🇷 → 🇯🇵",
          options: pool.map((o) => (dir === "jp-fr" ? o.ans : o.jp)),
          correct: ci,
        };
      });

      this.qIndex = 0;
      this.answered = false;
      this.selectedIndex = -1;
      this.score = 0;
      this.sessionResults = [];
      this.screen = "quiz";
    },

    selectAnswer(idx: number) {
      if (this.answered) return;
      this.selectedIndex = idx;
      this.answered = true;
      const ok = idx === this.currentQ.correct;
      if (ok) this.score++;
      this.sessionResults.push({
        dir: this.currentQ.dir,
        jp: this.currentQ.term.jp,
        ans: this.currentQ.term.ans,
        ok,
        given: this.currentQ.options[idx],
      });
    },

    nextQuestion() {
      if (this.qIndex >= this.questions.length - 1) {
        this.screen = "results";
        return;
      }
      this.qIndex++;
      this.answered = false;
      this.selectedIndex = -1;
    },

    goHome() {
      this.screen = "home";
    },
  },
});
