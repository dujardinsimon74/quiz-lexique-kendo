<template>
    <div class="animate-fade-in space-y-4">
        <!-- En-tête zen -->
        <div class="text-center py-8">
            <div
                class="font-jp text-7xl font-black select-none kanji-hero mb-3"
            >
                剣道
            </div>
            <div class="divider-red mx-auto w-20 mb-3" />
            <p class="section-label tracking-[0.22em]">Maîtrise du Lexique</p>
        </div>

        <!-- Direction -->
        <div class="glass rounded-2xl p-5">
            <p class="section-label mb-3">Direction</p>
            <div class="flex flex-col gap-2">
                <button
                    v-for="m in MODES"
                    :key="m.id"
                    class="mode-btn"
                    :class="store.mode === m.id ? 'mode-on' : 'mode-off'"
                    @click="store.setMode(m.id)"
                >
                    <span class="text-base">{{ m.icon }}</span>
                    <span class="flex-1 text-left text-sm font-medium">{{
                        m.label
                    }}</span>
                    <span v-if="store.mode === m.id" class="check">○</span>
                </button>
            </div>
        </div>

        <!-- Nombre de questions -->
        <div class="glass rounded-2xl p-5">
            <p class="section-label mb-3">Nombre de questions</p>
            <div class="flex flex-wrap gap-2">
                <button
                    v-for="cnt in COUNTS"
                    :key="cnt"
                    class="count-btn"
                    :class="store.count === cnt ? 'count-on' : 'count-off'"
                    @click="store.setCount(cnt)"
                >
                    {{ cnt === allCount ? "Toutes" : cnt }}
                </button>
            </div>
        </div>

        <!-- Stats -->
        <div class="glass rounded-2xl p-4 flex items-center text-center">
            <div class="flex-1 py-1">
                <div class="stat-n">{{ allCount }}</div>
                <div class="stat-l">termes</div>
            </div>
            <div class="sep" />
            <div class="flex-1 py-1">
                <div class="stat-n">
                    {{
                        store.count >= allCount
                            ? "Toutes"
                            : Math.min(store.count, allCount)
                    }}
                </div>
                <div class="stat-l">questions</div>
            </div>
            <div class="sep" />
            <div class="flex-1 py-1">
                <div class="stat-n">
                    {{ store.mode === "both" ? "×2" : "×1" }}
                </div>
                <div class="stat-l">
                    direction{{ store.mode === "both" ? "s" : "" }}
                </div>
            </div>
        </div>

        <!-- Démarrer -->
        <button class="start-btn" @click="store.startQuiz()">
            <span class="start-kanji">始</span>
            <span>Commencer le quiz</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { useQuizStore } from "../../store";
import { LEXIQUE } from "../../data";

const store = useQuizStore();
const allCount = LEXIQUE.length;

const MODES = [
    { id: "jp-fr" as const, icon: "JP → FR", label: "Japonais vers Français" },
    { id: "fr-jp" as const, icon: "FR → JP", label: "Français vers Japonais" },
    { id: "both" as const, icon: "両", label: "Les deux directions" },
];
const COUNTS = [10, 20, 30, 50, LEXIQUE.length];
</script>

<style scoped>
/* Kanji héros */
.kanji-hero {
    color: #7c3328;
    text-shadow: 2px 3px 12px rgba(124, 51, 40, 0.2);
    line-height: 1;
}

/* Mode buttons */
.mode-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.875rem;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
}
.mode-on {
    background: rgba(124, 51, 40, 0.07);
    border-color: rgba(124, 51, 40, 0.3);
    color: #7c3328;
}
.mode-off {
    background: rgba(172, 152, 120, 0.06);
    border-color: rgba(172, 152, 120, 0.25);
    color: #3a2e24;
}
.mode-off:hover {
    background: rgba(172, 152, 120, 0.13);
    border-color: rgba(124, 51, 40, 0.25);
    color: #261e16;
}
.check {
    font-size: 0.875rem;
    font-weight: 700;
    color: #7c3328;
}

/* Count buttons */
.count-btn {
    flex: 1;
    min-width: 3.2rem;
    padding: 0.6rem 0.4rem;
    border-radius: 0.75rem;
    border: 1px solid transparent;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
}
.count-on {
    background: rgba(124, 51, 40, 0.08);
    border-color: rgba(124, 51, 40, 0.32);
    color: #7c3328;
}
.count-off {
    background: rgba(172, 152, 120, 0.06);
    border-color: rgba(172, 152, 120, 0.25);
    color: #4a3c30;
}
.count-off:hover {
    background: rgba(172, 152, 120, 0.14);
    color: #261e16;
}

/* Stats */
.stat-n {
    font-size: 1.6rem;
    font-weight: 900;
    color: #261e16;
    line-height: 1.2;
}
.stat-l {
    font-size: 0.65rem;
    color: #5a4a3a;
    margin-top: 0.15rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}
.sep {
    width: 1px;
    height: 2rem;
    background: rgba(172, 152, 120, 0.22);
}

/* Bouton démarrer */
.start-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1.05rem;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #fff;
    border: 1px solid rgba(100, 32, 24, 0.4);
    background: linear-gradient(135deg, #8b3a2a 0%, #7c3328 100%);
    box-shadow:
        0 4px 20px rgba(124, 51, 40, 0.22),
        0 1px 4px rgba(80, 40, 30, 0.12);
    cursor: pointer;
    transition: all 0.25s;
}
.start-btn:hover {
    background: linear-gradient(135deg, #9c4232 0%, #8b3a2a 100%);
    box-shadow:
        0 6px 28px rgba(124, 51, 40, 0.32),
        0 2px 6px rgba(80, 40, 30, 0.16);
    transform: translateY(-2px);
}
.start-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 12px rgba(124, 51, 40, 0.15);
}
.start-kanji {
    font-family: "Noto Serif JP", serif;
    font-size: 1.2rem;
    font-weight: 700;
    opacity: 0.9;
}
/* Icône mode texte (JP→FR etc.) */
.mode-btn .text-base {
    font-family: "Shippori Mincho B1", serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    min-width: 3.5rem;
    text-align: center;
}
</style>
