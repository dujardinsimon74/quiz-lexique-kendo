<template>
  <header class="bg-slate-900 text-white shadow-xl">
    <div class="max-w-xl mx-auto px-4 py-4 flex items-center gap-4">
      <span class="font-jp text-4xl font-black text-rose-400 select-none">剣</span>
      <div>
        <h1 class="text-lg font-bold tracking-wide">Quiz Lexique Kendo</h1>
        <p class="text-xs text-slate-400">Japonais ↔ Français · CAF CNKDR</p>
      </div>
      <div v-if="store.screen === 'quiz'" class="ml-auto text-right">
        <div class="text-xs text-slate-400">Score</div>
        <div class="font-bold text-white">{{ store.score }}/{{ store.questions.length }}</div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useQuizStore } from "../store";
const store = useQuizStore();
</script>
