<template>
  <div v-if="store.currentQ" class="animate-fade-in space-y-3">

    <!-- Progression -->
    <div class="flex items-center justify-between mb-1">
      <span class="text-xs font-bold tracking-wide" style="color:#261e16;">
        {{ store.qIndex + 1 }}<span style="color:#c8b89a;">/</span>{{ store.questions.length }}
      </span>
      <span class="text-xs" style="color:#5a4a3a;">
        ○ {{ store.score }} correcte{{ store.score > 1 ? 's' : '' }}
      </span>
    </div>

    <!-- Barre -->
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: `${pct}%` }" />
    </div>

    <!-- Carte question -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center gap-2 mb-4">
        <span class="badge-dir">{{ q.badge }}</span>
        <span class="text-xs" style="color:#5a4a3a;">{{ q.prompt }}</span>
      </div>
      <div class="text-center py-2">
        <div v-if="isJp" class="font-jp text-3xl font-bold mb-1" style="color:#261e16;">
          {{ q.question }}
        </div>
        <div v-else class="text-xl font-semibold" style="color:#261e16;">
          {{ q.question }}
        </div>
        <div v-if="isJp" class="text-xs mt-2 tracking-widest uppercase" style="color:#6a5a48;">
          terme japonais
        </div>
      </div>
    </div>

    <!-- Options -->
    <div class="space-y-2">
      <button
        v-for="(opt, i) in q.options"
        :key="i"
        :class="[
          'opt', optionClass(i),
          store.answered && i === store.selectedIndex && i !== q.correct ? 'animate-shake' : '',
          store.answered && i === q.correct ? 'animate-correct' : '',
        ]"
        :style="store.answered ? { pointerEvents: 'none' } : {}"
        @click="store.selectAnswer(i)"
      >
        <span :class="['letter', letterClass(i)]">{{ LETTERS[i] }}</span>
        <span
          class="flex-1 text-left text-sm"
          :class="!isJp && q.dir === 'fr-jp' ? 'font-jp font-semibold' : ''"
        >{{ opt }}</span>
        <Transition name="icon-pop">
          <span v-if="store.answered && i === q.correct"        class="result-icon" style="color:#2e5e38;">○</span>
          <span v-else-if="store.answered && i === store.selectedIndex && i !== q.correct" class="result-icon" style="color:#822020;">×</span>
        </Transition>
      </button>
    </div>

    <!-- Feedback -->
    <Transition name="feedback">
      <div v-if="store.answered" class="space-y-2">
        <div class="animate-pop glass rounded-2xl p-4"
          :class="store.selectedIndex === q.correct ? 'feedback-ok' : 'feedback-ko'">
          <div v-if="store.selectedIndex === q.correct">
            <p class="text-sm font-semibold" style="color:#2e5e38;">○ Correct !</p>
            <p class="text-xs mt-1 font-jp" style="color:#8a7e72;">{{ q.term.jp }} = {{ q.term.ans }}</p>
          </div>
          <div v-else>
            <p class="text-sm font-semibold" style="color:#822020;">× Incorrect</p>
            <p class="text-xs mt-1" style="color:#8a7e72;">
              Bonne réponse : <strong style="color:#261e16;">{{ q.options[q.correct] }}</strong>
            </p>
            <p class="text-xs mt-0.5 font-jp" style="color:#a09484;">{{ q.term.jp }} = {{ q.term.ans }}</p>
          </div>
        </div>

        <button class="next-btn" @click="store.nextQuestion()">
          {{ store.qIndex >= store.questions.length - 1 ? 'Voir les résultats →' : 'Question suivante →' }}
        </button>
      </div>
    </Transition>

    <!-- Retour -->
    <button class="back-btn" @click="store.goHome()">← Retour à l'accueil</button>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuizStore } from "../../store";

const LETTERS = ["A", "B", "C", "D"];
const store   = useQuizStore();
const q       = computed(() => store.currentQ);
const isJp    = computed(() => q.value?.dir === "jp-fr");
const pct     = computed(() =>
  store.questions.length ? (store.qIndex / store.questions.length) * 100 : 0
);

function optionClass(i: number): string {
  if (!store.answered)           return "opt-idle";
  if (i === q.value.correct)     return "opt-ok";
  if (i === store.selectedIndex) return "opt-ko";
  return "opt-dim";
}
function letterClass(i: number): string {
  if (!store.answered)           return "lt-idle";
  if (i === q.value.correct)     return "lt-ok";
  if (i === store.selectedIndex) return "lt-ko";
  return "lt-dim";
}
</script>

<style scoped>
/* Barre de progression */
.progress-track {
  height: 3px;
  background: rgba(172, 152, 120, 0.18);
  border-radius: 99px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #a05030, #7c3328);
  border-radius: 99px;
  transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* Badge direction */
.badge-dir {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 99px;
  background: rgba(124, 51, 40, 0.07);
  border: 1px solid rgba(124, 51, 40, 0.22);
  color: #7c3328;
  letter-spacing: 0.04em;
}

/* Options */
.opt {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 0.875rem;
  border: 1px solid transparent;
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.18s;
}
.opt-idle {
  background: rgba(255, 252, 248, 0.88);
  border-color: rgba(172, 152, 120, 0.30);
  color: #3a2e24;
  box-shadow: 0 1px 4px rgba(80,60,38,0.05);
}
.opt-idle:hover {
  background: rgba(255, 252, 248, 0.95);
  border-color: rgba(124, 51, 40, 0.28);
  color: #261e16;
  transform: translateX(3px);
  box-shadow: 0 2px 10px rgba(80,60,38,0.08);
}
.opt-ok {
  background: #d4ead9;
  border-color: rgba(46, 94, 56, 0.55);
  color: #1e4a28;
  box-shadow: 0 1px 4px rgba(46, 94, 56, 0.10);
}
.opt-ko {
  background: #ecd4d4;
  border-color: rgba(130, 32, 32, 0.50);
  color: #6b1a1a;
  box-shadow: 0 1px 4px rgba(130, 32, 32, 0.10);
}
.opt-dim {
  background: rgba(255, 252, 248, 0.95);
  border-color: rgba(172, 152, 120, 0.22);
  color: #b0a494;
}

/* Lettres */
.letter {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.18s;
}
.lt-idle { background: rgba(172,152,120,0.14); color: #8a7e72; }
.lt-ok   { background: #2e5e38; color: #fff; }
.lt-ko   { background: #822020; color: #fff; }
.lt-dim  { background: rgba(172,152,120,0.08); color: #c8bca8; }

.result-icon { font-size: 1.2rem; font-weight: 400; flex-shrink: 0; font-family: 'Noto Serif JP', serif; }

/* Feedback */
.feedback-ok { border-left: 3px solid #2e5e38; }
.feedback-ko { border-left: 3px solid #822020; }

/* Bouton suivant */
.next-btn {
  width: 100%;
  padding: 0.875rem;
  border-radius: 0.875rem;
  border: 1px solid rgba(124, 51, 40, 0.30);
  background: linear-gradient(135deg, #8b3a2a 0%, #7c3328 100%);
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 3px 14px rgba(124,51,40,0.18);
}
.next-btn:hover {
  background: linear-gradient(135deg, #9c4232 0%, #8b3a2a 100%);
  transform: translateY(-1px);
  box-shadow: 0 5px 20px rgba(124,51,40,0.26);
}

/* Bouton retour */
.back-btn {
  width: 100%;
  padding: 0.65rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #6a5e52;
  background: rgba(255, 252, 248, 0.70);
  border: 1px solid rgba(172, 152, 120, 0.28);
  border-radius: 0.75rem;
  cursor: pointer;
  letter-spacing: 0.04em;
  transition: all 0.2s;
}
.back-btn:hover {
  background: rgba(255, 252, 248, 0.92);
  color: #7c3328;
  border-color: rgba(124, 51, 40, 0.28);
}

/* Transitions */
.feedback-enter-active { transition: all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1); }
.feedback-leave-active { transition: all 0.15s ease; }
.feedback-enter-from   { opacity: 0; transform: translateY(10px); }
.feedback-leave-to     { opacity: 0; }
.icon-pop-enter-active { transition: all 0.25s cubic-bezier(0.22, 0.61, 0.36, 1); }
.icon-pop-enter-from   { opacity: 0; transform: scale(0.4); }
</style>
