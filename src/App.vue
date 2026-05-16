<template>
  <div class="min-h-screen bg-slate-100">
    <Header />
    <main class="max-w-xl mx-auto px-4 py-6">
      <HomeScreen v-if="store.screen === 'home'" />
      <QuizScreen v-else-if="store.screen === 'quiz'" />
      <ResultsScreen v-else-if="store.screen === 'results'" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from "./store";
import Header from "./components/Header.vue";
import HomeScreen from "./components/screens/HomeScreen.vue";
import QuizScreen from "./components/screens/QuizScreen.vue";
import ResultsScreen from "./components/screens/ResultsScreen.vue";

const store = useQuizStore();
</script>
