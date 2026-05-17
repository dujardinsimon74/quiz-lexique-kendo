<template>
    <header class="header-shoji sticky top-0 z-50">
        <div class="max-w-xl mx-auto px-5 py-4 flex items-center gap-4">
            <!-- Kanji cliquable → accueil -->
            <span
                class="font-jp text-4xl font-black select-none kanji-ink cursor-pointer"
                style="line-height: 1"
                @click="store.goHome()"
                >剣</span
            >

            <!-- Titre -->
            <div class="flex-1 min-w-0">
                <h1 class="text-xl font-extrabold" style="color: #261e16">
                    Tango Keiko
                </h1>
                <p
                    class="text-xs tracking-wider mt-0.5"
                    style="color: #6a5a48; letter-spacing: 0.1em"
                >
                    Entrainement au vocabulaire du Kendo
                </p>
            </div>

            <!-- Score en quiz, bouton historique sinon -->
            <Transition name="score-slide" mode="out-in">
                <div
                    v-if="store.screen === 'quiz'"
                    key="score"
                    class="text-right shrink-0"
                >
                    <div class="section-label mb-0.5">Score</div>
                    <div
                        class="text-lg font-black tabular-nums"
                        style="color: #261e16; line-height: 1.1"
                    >
                        <span style="color: var(--clr-p)">{{ store.score }}</span>
                        <span style="color: #c8b89a">/</span>
                        <span>{{ store.questions.length }}</span>
                    </div>
                </div>
                <button
                    v-else
                    key="history"
                    class="history-btn"
                    :class="
                        store.screen === 'history' ||
                        store.screen === 'history-detail'
                            ? 'history-btn--active'
                            : ''
                    "
                    title="Historique des parties"
                    @click="store.goHistory()"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                </button>
            </Transition>
        </div>
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
    color: var(--clr-p);
    text-shadow: 1px 2px 8px rgba(var(--clr-p-rgb), 0.18);
    transition: color 0.3s, text-shadow 0.3s, opacity 0.2s;
}
.kanji-ink:hover {
    opacity: 0.75;
}

/* Bouton historique */
.history-btn {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 700;
    color: #6a5a48;
    background: rgba(172, 152, 120, 0.12);
    border: 1px solid rgba(172, 152, 120, 0.25);
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
}
.history-btn:hover {
    background: rgba(var(--clr-p-rgb), 0.1);
    border-color: rgba(var(--clr-p-rgb), 0.3);
    color: var(--clr-p);
}
.history-btn--active {
    background: rgba(var(--clr-p-rgb), 0.12);
    border-color: rgba(var(--clr-p-rgb), 0.4);
    color: var(--clr-p);
}

/* Transitions */
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
