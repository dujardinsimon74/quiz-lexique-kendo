<template>
    <header class="header-shoji sticky top-0 z-50">
        <div class="max-w-xl mx-auto px-5 py-4 flex items-center gap-4">
            <!-- Kanji -->
            <span
                class="font-jp text-4xl font-black select-none kanji-ink"
                style="line-height: 1"
                >剣道</span
            >

            <!-- Titre -->
            <div class="flex-1 min-w-0">
                <h1
                    class="text-sm font-bold tracking-widest uppercase"
                    style="color: #261e16; letter-spacing: 0.18em"
                >
                    Quiz Lexique Kendo
                </h1>
                <p
                    class="text-xs tracking-wider mt-0.5"
                    style="color: #6a5a48; letter-spacing: 0.1em"
                >
                    Japonais ↔ Français
                </p>
            </div>

            <!-- Score -->
            <Transition name="score-slide">
                <div v-if="store.screen === 'quiz'" class="text-right shrink-0">
                    <div class="section-label mb-0.5">Score</div>
                    <div
                        class="text-lg font-black tabular-nums"
                        style="color: #261e16; line-height: 1.1"
                    >
                        <span style="color: #7c3328">{{ store.score }}</span>
                        <span style="color: #c8b89a">/</span>
                        <span>{{ store.questions.length }}</span>
                    </div>
                </div>
            </Transition>
        </div>
        <!-- Séparateur fin -->
        <div class="divider-red" />
    </header>
</template>

<script setup lang="ts">
import { useQuizStore } from "../store";
const store = useQuizStore();
</script>

<style scoped>
.header-shoji {
    background: rgba(248, 243, 234, 0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(172, 152, 120, 0.22);
    box-shadow: 0 1px 12px rgba(80, 60, 38, 0.06);
}

.kanji-ink {
    color: #7c3328;
    text-shadow: 1px 2px 8px rgba(124, 51, 40, 0.18);
}

/* Transition score */
.score-slide-enter-active {
    transition: all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.score-slide-leave-active {
    transition: all 0.18s ease;
}
.score-slide-enter-from {
    opacity: 0;
    transform: translateX(10px);
}
.score-slide-leave-to {
    opacity: 0;
    transform: translateX(10px);
}
</style>
