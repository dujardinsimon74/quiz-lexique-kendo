<template>
  <div class="animate-fade-in space-y-4">
    <!-- Score card -->
    <div class="bg-white rounded-2xl shadow-sm p-6 text-center">
      <div class="text-5xl mb-2">{{ levelData.emoji }}</div>
      <div :class="['text-5xl font-black', levelData.col]">{{ p }}%</div>
      <div class="text-lg font-bold text-slate-800 mt-1">{{ levelData.msg }}</div>
      <div class="text-sm text-slate-500 mt-1">{{ levelData.sub }}</div>
      <div class="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
        <div class="text-center">
          <div class="text-2xl font-black text-green-600">{{ store.score }}</div>
          <div class="text-xs text-slate-500">correctes</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-black text-red-500">{{ total - store.score }}</div>
          <div class="text-xs text-slate-500">incorrectes</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-black text-slate-700">{{ total }}</div>
          <div class="text-xs text-slate-500">questions</div>
        </div>
      </div>
    </div>

    <!-- Par direction -->
    <div v-if="jpFr.length > 0 || frJp.length > 0" class="bg-white rounded-2xl shadow-sm p-4 space-y-2">
      <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-widest">Par direction</h3>
      <div v-if="jpFr.length > 0" class="flex items-center justify-between text-sm">
        <span class="text-slate-600">🇯🇵 → 🇫🇷</span>
        <span class="font-bold text-slate-800">
          {{ jpFr.filter((r) => r.ok).length }}/{{ jpFr.length }}
          <span class="font-normal text-slate-500">
            ({{ pctOf(jpFr.filter((r) => r.ok).length, jpFr.length) }}%)
          </span>
        </span>
      </div>
      <div v-if="frJp.length > 0" class="flex items-center justify-between text-sm">
        <span class="text-slate-600">🇫🇷 → 🇯🇵</span>
        <span class="font-bold text-slate-800">
          {{ frJp.filter((r) => r.ok).length }}/{{ frJp.length }}
          <span class="font-normal text-slate-500">
            ({{ pctOf(frJp.filter((r) => r.ok).length, frJp.length) }}%)
          </span>
        </span>
      </div>
    </div>

    <!-- Termes ratés -->
    <div
      v-if="missed.length === 0"
      class="bg-green-50 border border-green-200 rounded-2xl p-4 text-center text-green-700 font-semibold"
    >
      🎉 Parfait — aucune erreur !
    </div>
    <div v-else class="bg-white rounded-2xl shadow-sm p-4">
      <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
        📋 Termes à revoir ({{ missed.length }})
      </h3>
      <div class="space-y-2">
        <div
          v-for="r in missed"
          :key="r.jp"
          class="flex items-start gap-2 py-2 border-b border-slate-50 last:border-0"
        >
          <span class="text-red-400 mt-0.5 shrink-0">✗</span>
          <div class="min-w-0">
            <div class="font-jp font-semibold text-slate-800 text-sm">{{ r.jp }}</div>
            <div class="text-xs text-slate-500">{{ r.ans }}</div>
            <div class="text-xs text-red-400">Votre réponse : {{ r.given }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-3">
      <button
        class="flex-1 py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition-colors"
        @click="store.startQuiz()"
      >
        🔄 Recommencer
      </button>
      <button
        class="flex-1 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 rounded-xl font-bold text-sm transition-colors"
        @click="store.goHome()"
      >
        🏠 Accueil
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuizStore } from "../../store";
import type { Result } from "../../store";

type Level = "excellent" | "good" | "ok" | "poor";

const LEVELS: Record<Level, { emoji: string; msg: string; sub: string; col: string }> = {
  excellent: {
    emoji: "🏆",
    msg: "Excellent !",
    sub: "Parfaite maîtrise du lexique !",
    col: "text-green-600",
  },
  good: {
    emoji: "👍",
    msg: "Bien joué !",
    sub: "Encore un peu et tu maîtrises tout !",
    col: "text-blue-600",
  },
  ok: {
    emoji: "📖",
    msg: "Pas mal !",
    sub: "Révise les termes manquants.",
    col: "text-yellow-600",
  },
  poor: {
    emoji: "💪",
    msg: "À réviser !",
    sub: "Continue à t'entraîner, tu y arriveras !",
    col: "text-red-600",
  },
};

function pctOf(ok: number, total: number): number {
  return total === 0 ? 0 : Math.round((ok / total) * 100);
}

const store = useQuizStore();

const total = computed(() => store.questions.length);
const p = computed(() => pctOf(store.score, total.value));
const level = computed<Level>(() =>
  p.value >= 80 ? "excellent" : p.value >= 60 ? "good" : p.value >= 40 ? "ok" : "poor"
);
const levelData = computed(() => LEVELS[level.value]);

const jpFr = computed(() => store.sessionResults.filter((r: Result) => r.dir === "jp-fr"));
const frJp = computed(() => store.sessionResults.filter((r: Result) => r.dir === "fr-jp"));
const missed = computed(() => store.sessionResults.filter((r: Result) => !r.ok));
</script>
