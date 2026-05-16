<template>
  <div class="animate-fade-in space-y-4">

    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <div>
        <p class="section-label mb-1">歴 · Détail de la partie</p>
        <h2 class="text-xl font-bold" style="color:#261e16;">{{ formatDate(session.date) }}</h2>
      </div>
      <button class="back-btn" @click="store.goHistory()">← Historique</button>
    </div>

    <div class="divider-red" />

    <!-- Carte score -->
    <div class="glass rounded-2xl p-5 text-center">
      <div class="font-jp text-6xl font-black mb-1" :style="{ color: levelColor(pct) }">
        {{ levelKanji(pct) }}
      </div>
      <div class="text-3xl font-black tabular-nums mb-1" :style="{ color: levelColor(pct) }">
        {{ pct }}%
      </div>
      <p class="text-sm font-semibold mb-4" style="color:#5a4a3a;">{{ levelMsg(pct) }}</p>

      <!-- Stats QCM -->
      <div v-if="session.type !== 'libre'" class="grid grid-cols-3 gap-2">
        <div class="stat-box">
          <div class="stat-val" style="color:#2e5e38;">{{ session.score }}</div>
          <div class="stat-lbl">Correctes</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:#822020;">{{ session.total - session.score }}</div>
          <div class="stat-lbl">Erreurs</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:#261e16;">{{ session.total }}</div>
          <div class="stat-lbl">Total</div>
        </div>
      </div>

      <!-- Stats Libre -->
      <div v-else class="grid grid-cols-3 gap-2">
        <div class="stat-box">
          <div class="stat-val" style="color:#2e5e38;">{{ libreFound }}</div>
          <div class="stat-lbl">Trouvés</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:#3a6090;">{{ libreFirstTry }}</div>
          <div class="stat-lbl">1ᵉʳ coup</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:#822020;">{{ libreMissed }}</div>
          <div class="stat-lbl">Ratés</div>
        </div>
      </div>
    </div>

    <!-- Mode (QCM) -->
    <div v-if="session.type !== 'libre'" class="glass rounded-2xl p-4 flex items-center gap-4">
      <div class="font-jp text-2xl font-black" style="color:#7c3328;">{{ modeKanji(session.mode!) }}</div>
      <div class="flex-1">
        <div class="text-xs font-bold mb-0.5" style="color:#4a3c30;">{{ modeLabel(session.mode!) }}</div>
        <div class="flex gap-3 text-xs" style="color:#6a5a48;">
          <span v-if="jpFrCount > 0">JP → FR : {{ jpFrOk }}/{{ jpFrCount }}</span>
          <span v-if="frJpCount > 0">FR → JP : {{ frJpOk }}/{{ frJpCount }}</span>
        </div>
      </div>
    </div>

    <!-- Mode (Libre) -->
    <div v-else class="glass rounded-2xl p-4 flex items-center gap-4">
      <div class="font-jp text-2xl font-black" style="color:#3a6090;">書</div>
      <div class="flex-1">
        <div class="text-xs font-bold mb-0.5" style="color:#4a3c30;">Saisie libre · FR → JP</div>
        <div class="text-xs" style="color:#6a5a48;">
          {{ session.score }} / {{ session.total }} points · {{ libreQuestionCount }} questions
        </div>
      </div>
    </div>

    <!-- Liste résultats QCM -->
    <div v-if="session.type !== 'libre'" class="glass rounded-2xl overflow-hidden">
      <div class="px-4 py-3 border-b" style="border-color:rgba(172,152,120,0.18);">
        <p class="section-label">稽古 · Détail des réponses</p>
      </div>
      <div class="divide-y">
        <div
          v-for="(r, i) in session.results"
          :key="i"
          class="result-row px-4 py-3 flex items-start gap-3"
          :class="r.ok ? 'row-ok' : 'row-ko'"
        >
          <span class="result-icon font-jp font-black mt-0.5" :style="{ color: r.ok ? '#2e5e38' : '#822020' }">
            {{ r.ok ? '○' : '×' }}
          </span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-jp font-bold text-sm" style="color:#261e16;">{{ r.jp }}</span>
              <span class="dir-tag">{{ r.dir === 'jp-fr' ? 'JP→FR' : 'FR→JP' }}</span>
            </div>
            <div class="text-xs mt-0.5" style="color:#4a3c30;">{{ r.ans }}</div>
            <div v-if="!r.ok" class="text-xs mt-0.5 italic" style="color:#822020;">
              Répondu : {{ r.given }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Liste résultats Libre -->
    <div v-else class="glass rounded-2xl overflow-hidden">
      <div class="px-4 py-3 border-b" style="border-color:rgba(172,152,120,0.18);">
        <p class="section-label">稽古 · Détail des réponses</p>
      </div>
      <div class="divide-y">
        <div
          v-for="(r, i) in session.libreResults"
          :key="i"
          class="px-4 py-3 flex items-start gap-3"
          :class="r.points > 0 ? 'row-ok' : 'row-ko'"
        >
          <div class="pts-badge" :class="ptsBadgeClass(r.points)">
            {{ r.points > 0 ? '+' + r.points : '×' }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-jp font-bold text-sm" style="color:#261e16;">{{ r.jp }}</span>
              <span v-if="r.attempts > 0" class="dir-tag">{{ r.attempts }} essai{{ r.attempts > 1 ? 's' : '' }}</span>
              <span v-else-if="r.finalInput === ''" class="dir-tag" style="color:#8b6a1a; border-color:rgba(139,106,26,0.25);">Passé</span>
            </div>
            <div class="text-xs mt-0.5" style="color:#4a3c30;">{{ r.ans }}</div>
            <div v-if="r.points === 0 && r.finalInput" class="text-xs mt-0.5 italic" style="color:#822020;">
              Votre réponse : {{ r.finalInput }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="grid grid-cols-2 gap-3">
      <button class="action-btn action-btn--secondary" @click="store.goHome()">
        <span class="font-jp text-lg leading-none">帰</span>
        <span>Accueil</span>
      </button>
      <button
        class="action-btn action-btn--primary"
        :class="session.type === 'libre' ? 'action-btn--libre' : ''"
        @click="session.type === 'libre' ? store.startLibreQuiz() : store.startQuiz()"
      >
        <span class="font-jp text-lg leading-none">↺</span>
        <span>Rejouer</span>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuizStore } from "../../store";
import type { Dir } from "../../store";

const store   = useQuizStore();
const session = computed(() => store.viewedSession!);

const pct = computed(() =>
  session.value.total === 0 ? 0 : Math.round((session.value.score / session.value.total) * 100)
);

// QCM
const jpFrCount = computed(() => (session.value.results ?? []).filter(r => r.dir === "jp-fr").length);
const frJpCount = computed(() => (session.value.results ?? []).filter(r => r.dir === "fr-jp").length);
const jpFrOk    = computed(() => (session.value.results ?? []).filter(r => r.dir === "jp-fr" && r.ok).length);
const frJpOk    = computed(() => (session.value.results ?? []).filter(r => r.dir === "fr-jp" && r.ok).length);

// Libre
const libreFound    = computed(() => (session.value.libreResults ?? []).filter(r => r.points > 0).length);
const libreFirstTry = computed(() => (session.value.libreResults ?? []).filter(r => r.attempts === 1).length);
const libreMissed   = computed(() => (session.value.libreResults ?? []).filter(r => r.points === 0).length);
const libreQuestionCount = computed(() => (session.value.libreResults ?? []).length);

function levelKanji(p: number): string {
  return p >= 80 ? "優" : p >= 60 ? "良" : p >= 40 ? "可" : "努";
}
function levelColor(p: number): string {
  return p >= 80 ? "#2e5e38" : p >= 60 ? "#3a6090" : p >= 40 ? "#8b6a1a" : "#822020";
}
function levelMsg(p: number): string {
  if (p === 100) return "Résultat parfait — 満点";
  if (p >= 80)   return "Excellent résultat";
  if (p >= 60)   return "Bon résultat";
  if (p >= 40)   return "Résultat passable";
  return "À travailler — continue l'entraînement";
}
function modeKanji(mode: Dir): string {
  return mode === "jp-fr" ? "訓" : mode === "fr-jp" ? "書" : "両";
}
function modeLabel(mode: Dir): string {
  return mode === "jp-fr" ? "Mode JP → FR" : mode === "fr-jp" ? "Mode FR → JP" : "Mode mixte";
}
function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso));
}
function ptsBadgeClass(pts: number): string {
  if (pts === 4) return "pts-4";
  if (pts === 3) return "pts-3";
  if (pts === 2) return "pts-2";
  if (pts === 1) return "pts-1";
  return "pts-0";
}
</script>

<style scoped>
.stat-box {
  background: rgba(172, 152, 120, 0.07);
  border-radius: 0.75rem;
  padding: 0.6rem 0.4rem;
}
.stat-val {
  font-size: 1.4rem;
  font-weight: 900;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}
.stat-lbl {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #5a4a3a;
  margin-top: 0.15rem;
}

.result-row { transition: background 0.15s; }
.row-ok { background: rgba(46, 94, 56, 0.04); }
.row-ko { background: rgba(130, 32, 32, 0.04); }
.result-icon { font-size: 1.1rem; flex-shrink: 0; width: 1.25rem; text-align: center; }

.divide-y > * + * { border-top: 1px solid rgba(172, 152, 120, 0.15); }

.dir-tag {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.1rem 0.4rem;
  border-radius: 99px;
  background: rgba(124, 51, 40, 0.07);
  border: 1px solid rgba(124, 51, 40, 0.18);
  color: #7c3328;
}

/* Badge points libre */
.pts-badge {
  flex-shrink: 0;
  min-width: 2rem;
  text-align: center;
  padding: 0.2rem 0.35rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1.4;
}
.pts-4 { background: rgba(46,94,56,0.12); color:#1e4a28; border:1px solid rgba(46,94,56,0.25); }
.pts-3 { background: rgba(46,94,56,0.07); color:#2e5e38; border:1px solid rgba(46,94,56,0.18); }
.pts-2 { background: rgba(139,106,26,0.10); color:#6b4e10; border:1px solid rgba(139,106,26,0.22); }
.pts-1 { background: rgba(130,32,32,0.07); color:#822020; border:1px solid rgba(130,32,32,0.18); }
.pts-0 { background: rgba(130,32,32,0.10); color:#822020; border:1px solid rgba(130,32,32,0.25); }

/* Boutons */
.action-btn {
  display: flex; align-items: center; justify-content: center;
  gap: 0.45rem; padding: 0.8rem; border-radius: 0.875rem;
  font-size: 0.9rem; font-weight: 700; cursor: pointer;
  transition: all 0.2s; border: 1px solid transparent;
}
.action-btn--primary {
  background: #7c3328; color: #fff8f0; border-color: #6a2a20;
}
.action-btn--primary:hover {
  background: #922e22; transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(124,51,40,0.30);
}
.action-btn--libre {
  background: #3a6090 !important; border-color: #2a5080 !important;
}
.action-btn--libre:hover {
  background: #4a72a8 !important;
  box-shadow: 0 4px 16px rgba(58,96,144,0.30) !important;
}
.action-btn--secondary {
  background: rgba(255,252,248,0.85); color: #4a3c30;
  border-color: rgba(172,152,120,0.30);
}
.action-btn--secondary:hover {
  background: rgba(255,252,248,0.98); color: #7c3328;
  border-color: rgba(124,51,40,0.28);
}

.back-btn {
  font-size: 0.75rem; font-weight: 600; color: #4a3c30;
  background: rgba(172,152,120,0.16); border: 1px solid rgba(172,152,120,0.40);
  border-radius: 0.5rem; padding: 0.3rem 0.8rem; cursor: pointer; transition: all 0.2s;
}
.back-btn:hover {
  color: #7c3328; border-color: rgba(124,51,40,0.35);
  background: rgba(124,51,40,0.08);
}
</style>
