<template>
  <div class="animate-fade-in space-y-5">
    <!-- Direction -->
    <div class="bg-white rounded-2xl shadow-sm p-5">
      <h2 class="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Direction</h2>
      <div class="flex flex-col gap-2">
        <button
          v-for="m in MODES"
          :key="m.id"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all',
            store.mode === m.id
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-slate-200 text-slate-600 hover:border-blue-300',
          ]"
          @click="store.setMode(m.id)"
        >
          <span class="text-xl">{{ m.icon }}</span>
          <span>{{ m.label }}</span>
          <span v-if="store.mode === m.id" class="ml-auto text-blue-600">✓</span>
        </button>
      </div>
    </div>

    <!-- Nombre de questions -->
    <div class="bg-white rounded-2xl shadow-sm p-5">
      <h2 class="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">
        Nombre de questions
      </h2>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cnt in COUNTS"
          :key="cnt"
          :class="[
            'flex-1 min-w-[3.5rem] py-3 rounded-xl border-2 text-sm font-bold transition-all',
            store.count === cnt
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-slate-200 text-slate-500 hover:border-blue-300',
          ]"
          @click="store.setCount(cnt)"
        >
          {{ cnt === allCount ? "Tous" : cnt }}
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 text-center">
      <div class="flex-1">
        <div class="text-2xl font-black text-slate-800">{{ allCount }}</div>
        <div class="text-xs text-slate-500 mt-0.5">termes dans le lexique</div>
      </div>
      <div class="w-px h-10 bg-slate-100" />
      <div class="flex-1">
        <div class="text-2xl font-black text-slate-800">
          {{ store.count >= allCount ? "Tous" : Math.min(store.count, allCount) }}
        </div>
        <div class="text-xs text-slate-500 mt-0.5">questions par session</div>
      </div>
      <div class="w-px h-10 bg-slate-100" />
      <div class="flex-1">
        <div class="text-2xl font-black text-slate-800">{{ store.mode === "both" ? "×2" : "×1" }}</div>
        <div class="text-xs text-slate-500 mt-0.5">direction{{ store.mode === "both" ? "s" : "" }}</div>
      </div>
    </div>

    <!-- Start -->
    <button
      class="w-full py-4 bg-slate-900 hover:bg-rose-700 text-white rounded-2xl text-lg font-bold shadow-lg transition-colors"
      @click="store.startQuiz()"
    >
      ⚔️ &nbsp; Commencer le quiz
    </button>
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from "../../store";
import { LEXIQUE } from "../../data";

const store = useQuizStore();
const allCount = LEXIQUE.length;

const MODES = [
  { id: "jp-fr" as const, icon: "🇯🇵→🇫🇷", label: "Japonais vers Français" },
  { id: "fr-jp" as const, icon: "🇫🇷→🇯🇵", label: "Français vers Japonais" },
  { id: "both" as const, icon: "🔀", label: "Les deux directions" },
];

const COUNTS = [10, 20, 30, 50, LEXIQUE.length];
</script>
