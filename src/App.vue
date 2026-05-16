<template>
    <div class="min-h-screen">
        <!-- Photo jardin zen en fond -->
        <div class="bg-zen" />
        <!-- Voile clair – effet papier shoji -->
        <div class="bg-veil" />

        <!-- Contenu -->
        <div class="relative z-10 min-h-screen flex flex-col">
            <Header />

            <main class="flex-1 max-w-xl w-full mx-auto px-4 py-6">
                <Transition name="screen" mode="out-in">
                    <HomeScreen          v-if="store.screen === 'home'"           key="home"           />
                    <QuizScreen          v-else-if="store.screen === 'quiz'"           key="quiz"           />
                    <ResultsScreen       v-else-if="store.screen === 'results'"        key="results"        />
                    <HistoryScreen       v-else-if="store.screen === 'history'"        key="history"        />
                    <HistoryDetailScreen v-else-if="store.screen === 'history-detail'" key="history-detail" />
                </Transition>
            </main>

            <footer
                class="text-center py-4 text-xs tracking-widest"
                style="color: #7a6a58"
            >
                Lexique de 剣道 - Révision CAF
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuizStore } from "./store";
import Header from "./components/Header.vue";
import HomeScreen from "./components/screens/HomeScreen.vue";
import QuizScreen from "./components/screens/QuizScreen.vue";
import ResultsScreen from "./components/screens/ResultsScreen.vue";
import HistoryScreen from "./components/screens/HistoryScreen.vue";
import HistoryDetailScreen from "./components/screens/HistoryDetailScreen.vue";

const store = useQuizStore();
</script>

<style>
/* Image zen garden fixe */
.bg-zen {
    position: fixed;
    inset: 0;
    background-image: url("https://images.unsplash.com/photo-1567372704182-ec2ea042c937?fm=jpg&q=80&w=1920&fit=crop");
    background-size: cover;
    background-position: center;
    z-index: 0;
}

/* Voile clair – comme regarder à travers du papier shoji */
.bg-veil {
    position: fixed;
    inset: 0;
    background: linear-gradient(
        150deg,
        rgba(242, 236, 224, 0.88) 0%,
        rgba(238, 230, 214, 0.84) 50%,
        rgba(244, 238, 224, 0.9) 100%
    );
    z-index: 1;
}

/* Transitions entre écrans */
.screen-enter-active {
    transition:
        opacity 0.32s ease,
        transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.screen-leave-active {
    transition:
        opacity 0.18s ease,
        transform 0.18s ease;
}
.screen-enter-from {
    opacity: 0;
    transform: translateY(14px);
}
.screen-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
