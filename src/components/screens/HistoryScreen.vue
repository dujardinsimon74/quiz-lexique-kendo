<template>
  <div class="animate-fade-in space-y-4">

    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <div>
        <p class="section-label mb-1">歴 · Historique</p>
        <h2 class="text-xl font-bold" style="color:#261e16;">Parties précédentes</h2>
      </div>
      <button
        v-if="store.sessionHistory.length > 0"
        class="clear-btn"
        @click="confirmClear"
      >Tout effacer</button>
    </div>

    <div class="divider-red" />

    <!-- Liste vide -->
    <div v-if="store.sessionHistory.length === 0" class="glass rounded-2xl p-10 text-center">
      <div class="font-jp text-4xl mb-3" style="color:#c8b8a0;">無</div>
      <p class="text-sm font-medium" style="color:#5a4a3a;">Aucune partie enregistrée</p>
      <p class="text-xs mt-1" style="color:#8a7a68;">Complète un quiz pour voir ton historique ici.</p>
      <button class="start-small-btn mt-5" @click="store.goHome()">← Retour à l'accueil</button>
    </div>

    <!-- Sessions -->
    <div v-else class="space-y-2">
      <div
        v-for="session in store.sessionHistory"
        :key="session.id"
        class="session-card glass rounded-2xl p-4 cursor-pointer"
        @click="store.viewSession(session)"
      >
        <div class="flex items-center gap-4">
          <!-- Niveau kanji + % -->
          <div class="level-block" :style="{ color: levelColor(pct(session)) }">
            <div class="font-jp text-2xl font-black leading-none">{{ levelKanji(pct(session)) }}</div>
            <div class="text-xs font-bold tabular-nums mt-0.5">{{ pct(session) }}%</div>
          </div>

          <!-- Infos -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="mode-tag" :class="session.type === 'libre' ? 'mode-tag--libre' : ''">
                {{ session.type === 'libre' ? 'Saisie libre' : modeLabel(session.mode!) }}
              </span>
              <span class="text-xs font-medium" style="color:#4a3c30;">
                <template v-if="session.type === 'libre'">
                  {{ session.score }} / {{ session.total }} pts
                </template>
                <template v-else>
                  {{ session.score }}/{{ session.total }} correctes
                </template>
              </span>
            </div>
            <div class="text-xs mt-1" style="color:#8a7a68;">{{ formatDate(session.date) }}</div>
          </div>

          <!-- Flèche -->
          <span style="color:#b0a090; font-size:1rem;">›</span>
        </div>
      </div>
    </div>

    <!-- Retour -->
    <button class="back-home-btn" @click="store.goHome()">← Retour à l'accueil</button>

  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from "../../store";
import type { SavedSession, Dir } from "../../store";

const store = useQuizStore();

function pct(s: SavedSession): number {
  return s.total === 0 ? 0 : Math.round((s.score / s.total) * 100);
}

function levelKanji(p: number): string {
  return p >= 80 ? "優" : p >= 60 ? "良" : p >= 40 ? "可" : "努";
}

function levelColor(p: number): string {
  return p >= 80 ? "#2e5e38" : p >= 60 ? "#3a6090" : p >= 40 ? "#8b6a1a" : "#822020";
}

function modeLabel(mode: Dir): string {
  return mode === "jp-fr" ? "JP → FR" : mode === "fr-jp" ? "FR → JP" : "両";
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day:    "numeric",
    month:  "long",
    year:   "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function confirmClear() {
  if (confirm("Effacer tout l'historique ?")) store.clearHistory();
}
</script>

<style scoped>
/* Session card */
.session-card {
  transition: all 0.18s;
}
.session-card:hover {
  transform: translateX(3px);
  box-shadow: 0 4px 20px rgba(80, 60, 38, 0.10);
}

/* Bloc niveau */
.level-block {
  min-width: 3rem;
  text-align: center;
  padding: 0.4rem 0.6rem;
  border-radius: 0.75rem;
  background: rgba(172, 152, 120, 0.08);
  flex-shrink: 0;
}

/* Tag mode */
.mode-tag {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
  background: rgba(124, 51, 40, 0.08);
  border: 1px solid rgba(124, 51, 40, 0.20);
  color: #7c3328;
}
.mode-tag--libre {
  background: rgba(58, 96, 144, 0.09);
  border-color: rgba(58, 96, 144, 0.22);
  color: #3a6090;
}

/* Bouton effacer */
.clear-btn {
  font-size: 0.75rem;
  font-weight: 600;
  color: #7a4a3a;
  background: rgba(172, 152, 120, 0.16);
  border: 1px solid rgba(172, 152, 120, 0.40);
  border-radius: 0.5rem;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}
.clear-btn:hover {
  color: #fff8f0;
  border-color: #822020;
  background: #822020;
}

/* Bouton retour accueil */
.back-home-btn {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.875rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6a5e52;
  background: rgba(255, 252, 248, 0.80);
  border: 1px solid rgba(172, 152, 120, 0.28);
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.03em;
}
.back-home-btn:hover {
  background: rgba(255, 252, 248, 0.95);
  color: #7c3328;
  border-color: rgba(124, 51, 40, 0.28);
}

.start-small-btn {
  font-size: 0.85rem;
  font-weight: 600;
  color: #7c3328;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.start-small-btn:hover { opacity: 1; }
</style>
