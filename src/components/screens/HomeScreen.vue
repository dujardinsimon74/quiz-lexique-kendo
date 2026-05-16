<template>
    <div class="animate-fade-in space-y-4">
        <!-- En-tête zen -->
        <div class="text-center py-6">
            <div
                class="font-jp text-7xl font-black select-none kanji-hero mb-3"
            >
                剣道
            </div>
            <div class="divider-red mx-auto w-20 mb-3" />
            <p class="section-label tracking-[0.22em]">
                Maîtrise du Lexique · {{ allCount }} termes
            </p>
        </div>

        <!-- ── Mode Quiz QCM ── -->
        <div class="mode-card glass rounded-2xl p-5">
            <!-- En-tête carte -->
            <div class="flex items-center gap-3 mb-4">
                <div class="mode-icon font-jp mode-icon--qcm">問</div>
                <div>
                    <p class="text-sm font-bold" style="color: #261e16">
                        Mode Quiz
                    </p>
                    <p class="text-xs" style="color: #6a5a48">
                        QCM · 4 propositions · JP ↔ FR
                    </p>
                </div>
            </div>

            <!-- Direction -->
            <p class="section-label mb-2">Direction</p>
            <div class="flex flex-col gap-1.5 mb-4">
                <button
                    v-for="m in MODES"
                    :key="m.id"
                    class="mode-btn"
                    :class="store.mode === m.id ? 'mode-on--qcm' : 'mode-off'"
                    @click="store.setMode(m.id)"
                >
                    <span class="mode-tag-text">{{ m.icon }}</span>
                    <span class="flex-1 text-left text-sm font-medium">{{
                        m.label
                    }}</span>
                    <span v-if="store.mode === m.id" class="check check--qcm"
                        >○</span
                    >
                </button>
            </div>

            <!-- Nombre de questions -->
            <p class="section-label mb-2">Questions</p>
            <div class="flex flex-wrap gap-2 mb-4">
                <button
                    v-for="cnt in COUNTS"
                    :key="cnt"
                    class="count-btn"
                    :class="store.count === cnt ? 'count-on--qcm' : 'count-off'"
                    @click="store.setCount(cnt)"
                >
                    {{ cnt === allCount ? "Toutes" : cnt }}
                </button>
            </div>

            <!-- Reprendre QCM -->
            <div
                v-if="store.hasDraft && store.draftProgress"
                class="resume-banner resume-banner--qcm mb-3"
            >
                <div class="flex items-center gap-2 flex-1 min-w-0">
                    <span class="font-jp font-black" style="color: #7c3328"
                        >続</span
                    >
                    <span class="text-xs font-semibold" style="color: #3a2e24">
                        En cours — Q{{ store.draftProgress.current }}/{{
                            store.draftProgress.total
                        }}
                        · {{ store.draftProgress.score }} correcte{{
                            store.draftProgress.score > 1 ? "s" : ""
                        }}
                    </span>
                </div>
                <div class="flex gap-1">
                    <button class="resume-action" @click="store.resumeQuiz()">
                        Reprendre
                    </button>
                    <button
                        class="discard-action"
                        @click="store.discardDraft()"
                        title="Abandonner"
                    >
                        ✕
                    </button>
                </div>
            </div>

            <!-- Bouton démarrer -->
            <button class="start-btn start-btn--qcm" @click="store.startQuiz()">
                <span class="font-jp text-xl leading-none">始</span>
                <span>{{
                    store.hasDraft ? "Nouvelle partie" : "Commencer le quiz"
                }}</span>
            </button>
        </div>

        <!-- ── Mode Saisie Libre ── -->
        <div class="mode-card glass rounded-2xl p-5">
            <!-- En-tête carte -->
            <div class="flex items-center gap-3 mb-4">
                <div class="mode-icon font-jp mode-icon--libre">書</div>
                <div>
                    <p class="text-sm font-bold" style="color: #261e16">
                        Mode Saisie Libre
                    </p>
                    <p class="text-xs" style="color: #6a5a48">
                        Écrire le terme · FR → JP · 4 essais · 4→1 pts
                    </p>
                </div>
            </div>

            <!-- Nombre de questions -->
            <p class="section-label mb-2">Questions</p>
            <div class="flex flex-wrap gap-2 mb-4">
                <button
                    v-for="cnt in COUNTS"
                    :key="cnt"
                    class="count-btn"
                    :class="
                        store.libreCount === cnt
                            ? 'count-on--libre'
                            : 'count-off'
                    "
                    @click="store.setLibreCount(cnt)"
                >
                    {{ cnt === allCount ? "Toutes" : cnt }}
                </button>
            </div>

            <!-- Reprendre Libre -->
            <div
                v-if="store.hasLibreDraft && store.libreDraftProgress"
                class="resume-banner resume-banner--libre mb-3"
            >
                <div class="flex items-center gap-2 flex-1 min-w-0">
                    <span class="font-jp font-black" style="color: #3a6090"
                        >続</span
                    >
                    <span class="text-xs font-semibold" style="color: #3a2e24">
                        En cours — Q{{ store.libreDraftProgress.current }}/{{
                            store.libreDraftProgress.total
                        }}
                        · {{ store.libreDraftProgress.score }} pt{{
                            store.libreDraftProgress.score > 1 ? "s" : ""
                        }}
                    </span>
                </div>
                <div class="flex gap-1">
                    <button
                        class="resume-action resume-action--libre"
                        @click="store.resumeLibreQuiz()"
                    >
                        Reprendre
                    </button>
                    <button
                        class="discard-action"
                        @click="store.discardLibreDraft()"
                        title="Abandonner"
                    >
                        ✕
                    </button>
                </div>
            </div>

            <!-- Bouton démarrer -->
            <button
                class="start-btn start-btn--libre"
                @click="store.startLibreQuiz()"
            >
                <span class="font-jp text-xl leading-none">書</span>
                <span>{{
                    store.hasLibreDraft
                        ? "Nouvelle saisie"
                        : "Commencer la saisie"
                }}</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuizStore } from "../../store";
import { LEXIQUE } from "../../data";
import type { Dir } from "../../store";

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
/* Héros */
.kanji-hero {
    color: #7c3328;
    text-shadow: 2px 3px 12px rgba(124, 51, 40, 0.2);
    line-height: 1;
}

/* Cartes mode — même base */
.mode-card {
    /* hérite du style .glass global */
}

/* Icône mode */
.mode-icon {
    font-size: 2.2rem;
    font-weight: 900;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.875rem;
    flex-shrink: 0;
}
.mode-icon--qcm {
    background: rgba(124, 51, 40, 0.08);
    color: #7c3328;
}
.mode-icon--libre {
    background: rgba(58, 96, 144, 0.09);
    color: #3a6090;
}

/* Boutons direction */
.mode-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.9rem;
    border-radius: 0.75rem;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.18s;
    width: 100%;
    background: transparent;
}
.mode-off {
    background: rgba(172, 152, 120, 0.06);
    border-color: rgba(172, 152, 120, 0.22);
    color: #3a2e24;
}
.mode-off:hover {
    background: rgba(172, 152, 120, 0.13);
    border-color: rgba(124, 51, 40, 0.22);
    color: #261e16;
}
.mode-on--qcm {
    background: rgba(124, 51, 40, 0.07);
    border-color: rgba(124, 51, 40, 0.28);
    color: #7c3328;
}
.mode-tag-text {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    min-width: 3.5rem;
    text-align: center;
}
.check {
    font-size: 0.85rem;
    font-weight: 700;
}
.check--qcm {
    color: #7c3328;
}

/* Boutons count */
.count-btn {
    flex: 1;
    min-width: 3rem;
    padding: 0.55rem 0.4rem;
    border-radius: 0.7rem;
    border: 1px solid transparent;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s;
}
.count-off {
    background: rgba(172, 152, 120, 0.06);
    border-color: rgba(172, 152, 120, 0.22);
    color: #4a3c30;
}
.count-off:hover {
    background: rgba(172, 152, 120, 0.14);
    color: #261e16;
}
.count-on--qcm {
    background: rgba(124, 51, 40, 0.08);
    border-color: rgba(124, 51, 40, 0.3);
    color: #7c3328;
}
.count-on--libre {
    background: rgba(58, 96, 144, 0.09);
    border-color: rgba(58, 96, 144, 0.28);
    color: #3a6090;
}

/* Bannière reprise */
.resume-banner {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.8rem;
    border-radius: 0.75rem;
    border: 1px solid transparent;
}
.resume-banner--qcm {
    background: rgba(124, 51, 40, 0.06);
    border-color: rgba(124, 51, 40, 0.2);
}
.resume-banner--libre {
    background: rgba(58, 96, 144, 0.06);
    border-color: rgba(58, 96, 144, 0.2);
}
.resume-action {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.6rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(124, 51, 40, 0.3);
    background: rgba(124, 51, 40, 0.08);
    color: #7c3328;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
}
.resume-action:hover {
    background: rgba(124, 51, 40, 0.15);
}
.resume-action--libre {
    border-color: rgba(58, 96, 144, 0.3);
    background: rgba(58, 96, 144, 0.09);
    color: #3a6090;
}
.resume-action--libre:hover {
    background: rgba(58, 96, 144, 0.18);
}
.discard-action {
    font-size: 0.7rem;
    color: #9a8e82;
    background: transparent;
    border: 1px solid rgba(172, 152, 120, 0.25);
    border-radius: 0.5rem;
    padding: 0.25rem 0.45rem;
    cursor: pointer;
    transition: all 0.18s;
}
.discard-action:hover {
    color: #822020;
    background: rgba(130, 32, 32, 0.07);
    border-color: rgba(130, 32, 32, 0.25);
}

/* Boutons démarrer */
.start-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    padding: 0.95rem;
    border-radius: 0.875rem;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #fff;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.22s;
}
.start-btn--qcm {
    background: linear-gradient(135deg, #8b3a2a 0%, #7c3328 100%);
    border-color: rgba(100, 32, 24, 0.4);
    box-shadow: 0 3px 16px rgba(124, 51, 40, 0.2);
}
.start-btn--qcm:hover {
    background: linear-gradient(135deg, #9c4232 0%, #8b3a2a 100%);
    transform: translateY(-1px);
    box-shadow: 0 5px 22px rgba(124, 51, 40, 0.28);
}
.start-btn--libre {
    background: linear-gradient(135deg, #4a72a8 0%, #3a6090 100%);
    border-color: rgba(40, 70, 110, 0.35);
    box-shadow: 0 3px 16px rgba(58, 96, 144, 0.18);
}
.start-btn--libre:hover {
    background: linear-gradient(135deg, #5580b8 0%, #4a72a8 100%);
    transform: translateY(-1px);
    box-shadow: 0 5px 22px rgba(58, 96, 144, 0.28);
}
.start-btn:active {
    transform: translateY(0);
}
</style>
