<template>
  <div class="animate-fade-in space-y-4">

    <!-- En-tête -->
    <div class="text-center py-2">
      <p class="section-label mb-1">書 · Résultats · Saisie libre</p>
    </div>

    <!-- Carte score global -->
    <div class="glass rounded-2xl p-5 text-center">
      <div class="font-jp text-6xl font-black mb-1" :style="{ color: levelColor(pct) }">
        {{ levelKanji(pct) }}
      </div>
      <div class="text-3xl font-black tabular-nums mb-0.5" :style="{ color: levelColor(pct) }">
        {{ store.libreScore }}
        <span style="font-size:1rem; font-weight:600; opacity:0.6;"> / {{ store.libreMaxScore }}</span>
      </div>
      <div class="text-sm font-semibold mb-4" style="color:#5a4a3a;">
        {{ pct }}% · {{ levelMsg(pct) }}
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-2">
        <div class="stat-box">
          <div class="stat-val" style="color:#2e5e38;">{{ found }}</div>
          <div class="stat-lbl">Trouvés</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:#3a6090;">{{ perfect }}</div>
          <div class="stat-lbl">1ᵉʳ coup</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:#822020;">{{ missed }}</div>
          <div class="stat-lbl">Ratés</div>
        </div>
      </div>
    </div>

    <!-- Liste des résultats -->
    <div class="glass rounded-2xl overflow-hidden">
      <div class="px-4 py-3 border-b" style="border-color:rgba(172,152,120,0.18);">
        <p class="section-label">稽古 · Détail</p>
      </div>
      <div class="divide-y">
        <div
          v-for="(r, i) in store.libreResults"
          :key="i"
          class="px-4 py-3 flex items-start gap-3"
          :class="r.points > 0 ? 'row-ok' : 'row-ko'"
        >
          <!-- Points badge -->
          <div class="pts-badge" :class="ptsBadgeClass(r.points)">
            {{ r.points > 0 ? '+' + r.points : '×' }}
          </div>

          <!-- Contenu -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-jp font-bold text-sm" style="color:#261e16;">{{ r.jp }}</span>
              <span v-if="r.attempts > 0" class="tries-tag">{{ r.attempts }} essai{{ r.attempts > 1 ? 's' : '' }}</span>
            </div>
            <div class="text-xs mt-0.5" style="color:#4a3c30;">{{ r.ans }}</div>
            <div v-if="r.points === 0" class="text-xs mt-0.5 italic" style="color:#822020;">
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
      <button class="action-btn action-btn--primary" @click="store.startLibreQuiz()">
        <span class="font-jp text-lg leading-none">↺</span>
        <span>Rejouer</span>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuizStore } from "../../store";

const store = useQuizStore();

const pct = computed(() => {
  const max = store.libreMaxScore;
  return max === 0 ? 0 : Math.round((store.libreScore / max) * 100);
});

const found   = computed(() => store.libreResults.filter(r => r.points > 0).length);
const perfect = computed(() => store.libreResults.filter(r => r.attempts === 1).length);
const missed  = computed(() => store.libreResults.filter(r => r.points === 0).length);

function levelKanji(p: number): string {
  return p >= 80 ? "優" : p >= 60 ? "良" : p >= 40 ? "可" : "努";
}
function levelColor(p: number): string {
  return p >= 80 ? "#2e5e38" : p >= 60 ? "#3a6090" : p >= 40 ? "#8b6a1a" : "#822020";
}
function levelMsg(p: number): string {
  if (p === 100) return "Parfait — 満点 !";
  if (p >= 80)   return "Excellent";
  if (p >= 60)   return "Bien joué";
  if (p >= 40)   return "Passable";
  return "Continue l'entraînement";
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

/* Lignes résultat */
.divide-y > * + * { border-top: 1px solid rgba(172, 152, 120, 0.15); }
.row-ok { background: rgba(46, 94, 56, 0.03); }
.row-ko { background: rgba(130, 32, 32, 0.03); }

/* Badge points */
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
.pts-4 { background: rgba(46, 94, 56, 0.12); color: #1e4a28; border: 1px solid rgba(46,94,56,0.25); }
.pts-3 { background: rgba(46, 94, 56, 0.07); color: #2e5e38; border: 1px solid rgba(46,94,56,0.18); }
.pts-2 { background: rgba(139, 106, 26, 0.10); color: #6b4e10; border: 1px solid rgba(139,106,26,0.22); }
.pts-1 { background: rgba(130, 32, 32, 0.07); color: #822020; border: 1px solid rgba(130,32,32,0.18); }
.pts-0 { background: rgba(130, 32, 32, 0.10); color: #822020; border: 1px solid rgba(130,32,32,0.25); }

/* Tag essais */
.tries-tag {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.1rem 0.4rem;
  border-radius: 99px;
  background: rgba(var(--clr-p-rgb), 0.07);
  border: 1px solid rgba(var(--clr-p-rgb), 0.18);
  color: var(--clr-p);
}

/* Boutons action */
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.8rem;
  border-radius: 0.875rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.action-btn--primary {
  background: var(--clr-p);
  color: #fff8f0;
  border-color: rgba(var(--clr-p-rgb), 0.8);
  transition: background 0.35s, box-shadow 0.35s, transform 0.2s;
}
.action-btn--primary:hover {
  background: var(--clr-p-lighter);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(var(--clr-p-rgb), 0.30);
}
.action-btn--secondary {
  background: rgba(255, 252, 248, 0.85);
  color: #4a3c30;
  border-color: rgba(172, 152, 120, 0.30);
}
.action-btn--secondary:hover {
  background: rgba(255, 252, 248, 0.98);
  color: var(--clr-p);
  border-color: rgba(var(--clr-p-rgb), 0.28);
}
</style>
