<template>
  <div v-if="store.currentQ" class="animate-fade-in space-y-4">
    <!-- Progress -->
    <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
      <span class="font-semibold text-slate-700">
        {{ store.qIndex + 1 }} / {{ store.questions.length }}
      </span>
      <span>✅ {{ store.score }} correcte{{ store.score > 1 ? "s" : "" }}</span>
    </div>
    <div class="h-2 bg-slate-200 rounded-full overflow-hidden">
      <div
        class="h-full bg-blue-500 rounded-full transition-all duration-500"
        :style="{ width: `${pct}%` }"
      />
    </div>

    <!-- Question card -->
    <div class="bg-white rounded-2xl shadow-sm p-5">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600">
          {{ q.badge }}
        </span>
        <span class="text-xs text-slate-500">{{ q.prompt }}</span>
      </div>
      <div class="text-center py-3">
        <div v-if="isJp" class="font-jp text-3xl font-bold text-slate-900 mb-1">
          {{ q.question }}
        </div>
        <div v-else class="text-xl font-semibold text-slate-700">
          {{ q.question }}
        </div>
        <div v-if="isJp" class="text-xs text-slate-400 mt-1">terme japonais</div>
      </div>
    </div>

    <!-- Options -->
    <div class="space-y-2">
      <button
        v-for="(opt, i) in q.options"
        :key="i"
        :class="optionClass(i)"
        :style="store.answered ? { pointerEvents: 'none' } : {}"
        @click="store.selectAnswer(i)"
      >
        <span :class="letterClass(i)">{{ LETTERS[i] }}</span>
        <span :class="!isJp && q.dir === 'fr-jp' ? 'font-jp font-semibold' : ''">{{ opt }}</span>
        <span v-if="store.answered && i === q.correct" class="ml-auto text-green-600 text-lg">✓</span>
        <span
          v-if="store.answered && i === store.selectedIndex && i !== q.correct"
          class="ml-auto text-red-500 text-lg"
        >✗</span>
      </button>
    </div>

    <!-- Feedback -->
    <div v-if="store.answered">
      <div
        :class="[
          'animate-pop bg-white rounded-2xl shadow-sm p-4 border-l-4',
          store.selectedIndex === q.correct ? 'border-green-500' : 'border-red-400',
        ]"
      >
        <div v-if="store.selectedIndex === q.correct">
          <p class="text-sm font-semibold text-green-700">✅ Correct !</p>
          <p class="text-xs text-slate-500 mt-1 font-jp">{{ q.term.jp }} = {{ q.term.ans }}</p>
        </div>
        <div v-else>
          <p class="text-sm font-semibold text-red-700">❌ Incorrect</p>
          <p class="text-xs text-slate-500 mt-1">
            Bonne réponse : <strong>{{ q.options[q.correct] }}</strong>
          </p>
          <p class="text-xs text-slate-400 mt-0.5 font-jp">{{ q.term.jp }} = {{ q.term.ans }}</p>
        </div>
      </div>
      <button
        class="mt-3 w-full py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition-colors"
        @click="store.nextQuestion()"
      >
        {{ store.qIndex >= store.questions.length - 1 ? "Voir les résultats →" : "Question suivante →" }}
      </button>
    </div>

    <!-- Back -->
    <button
      class="w-full py-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
      @click="store.goHome()"
    >
      ← Retour à l'accueil
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuizStore } from "../../store";

const LETTERS = ["A", "B", "C", "D"];

const store = useQuizStore();

const q = computed(() => store.currentQ);
const isJp = computed(() => q.value?.dir === "jp-fr");
const pct = computed(() =>
  store.questions.length ? (store.qIndex / store.questions.length) * 100 : 0
);

function optionClass(i: number): string {
  const base =
    "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all text-left";
  if (!store.answered)
    return base + " border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer";
  if (i === q.value.correct)
    return base + " border-green-500 bg-green-50 text-green-700 ring-4 ring-green-100";
  if (i === store.selectedIndex)
    return base + " border-red-400 bg-red-50 text-red-700";
  return base + " border-slate-200 bg-white opacity-40";
}

function letterClass(i: number): string {
  const base = "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0";
  if (!store.answered) return base + " bg-slate-100 text-slate-500";
  if (i === q.value.correct) return base + " bg-green-500 text-white";
  if (i === store.selectedIndex) return base + " bg-red-400 text-white";
  return base + " bg-slate-100 text-slate-400";
}
</script>
