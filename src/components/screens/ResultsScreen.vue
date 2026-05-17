<template>
  <div class="animate-fade-in space-y-4">

    <!-- Score principal -->
    <div class="glass rounded-2xl p-7 text-center">
      <div class="font-jp text-5xl font-black mb-3" style="line-height:1;" :style="{ color: levelData.color }">{{ levelData.emoji }}</div>
      <div class="font-jp text-6xl font-black mb-1" :style="{ color: levelData.color }">{{ p }}%</div>
      <div class="divider-red mx-auto w-16 my-3" />
      <div class="text-base font-bold mb-1" style="color:#261e16;">{{ levelData.msg }}</div>
      <div class="text-sm" style="color:#5a4a3a;">{{ levelData.sub }}</div>

      <!-- Compteurs -->
      <div class="flex items-center justify-center mt-6 pt-5" style="border-top:1px solid rgba(172,152,120,0.20);">
        <div class="flex-1 text-center">
          <div class="text-2xl font-black" style="color:#2e5e38;">{{ store.score }}</div>
          <div class="rl">correctes</div>
        </div>
        <div class="rs" />
        <div class="flex-1 text-center">
          <div class="text-2xl font-black" style="color:#822020;">{{ total - store.score }}</div>
          <div class="rl">incorrectes</div>
        </div>
        <div class="rs" />
        <div class="flex-1 text-center">
          <div class="text-2xl font-black" style="color:#261e16;">{{ total }}</div>
          <div class="rl">questions</div>
        </div>
      </div>
    </div>

    <!-- Par direction -->
    <div v-if="jpFr.length > 0 || frJp.length > 0" class="glass rounded-2xl p-4 space-y-2">
      <p class="section-label mb-2">Par direction</p>
      <div v-if="jpFr.length > 0" class="dir-row">
        <span style="color:#4a3c30;">JP → FR</span>
        <span class="font-bold" style="color:#261e16;">
          {{ jpFr.filter(r => r.ok).length }}/{{ jpFr.length }}
          <span class="font-normal" style="color:#6a5a48;"> ({{ pctOf(jpFr.filter(r=>r.ok).length, jpFr.length) }}%)</span>
        </span>
      </div>
      <div v-if="frJp.length > 0" class="dir-row">
        <span style="color:#4a3c30;">FR → JP</span>
        <span class="font-bold" style="color:#261e16;">
          {{ frJp.filter(r => r.ok).length }}/{{ frJp.length }}
          <span class="font-normal" style="color:#6a5a48;"> ({{ pctOf(frJp.filter(r=>r.ok).length, frJp.length) }}%)</span>
        </span>
      </div>
    </div>

    <!-- Aucune erreur -->
    <div v-if="missed.length === 0"
      class="glass rounded-2xl p-4 text-center text-sm font-semibold"
      style="border-left:3px solid #2e5e38; color:#2e5e38;">
      満点 — Parfait, aucune erreur !
    </div>

    <!-- Termes à revoir -->
    <div v-else class="glass rounded-2xl p-4">
      <p class="section-label mb-3">稽古 · Termes à revoir ({{ missed.length }})</p>
      <div>
        <div v-for="r in missed" :key="r.jp" class="missed-item">
          <span class="shrink-0 mt-0.5 font-jp" style="color:#822020; font-size:1rem; font-weight:400;">×</span>
          <div class="min-w-0">
            <div class="font-jp font-semibold text-sm" style="color:#261e16;">{{ r.jp }}</div>
            <div class="text-xs mt-0.5" style="color:#5a4a3a;">{{ r.ans }}</div>
            <div class="text-xs mt-0.5" style="color: var(--clr-p);">Votre réponse : {{ r.given }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-3">
      <button class="act-primary" @click="store.startQuiz()">↺ Recommencer</button>
      <button class="act-ghost"   @click="store.goHome()">帰 Accueil</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuizStore } from "../../store";
import type { Result } from "../../store";

type Level = "excellent" | "good" | "ok" | "poor";
const LEVELS: Record<Level, { emoji:string; msg:string; sub:string; color:string }> = {
  excellent: { emoji:"優", msg:"Excellent !",  sub:"Parfaite maîtrise du lexique !",           color:"#2e5e38" },
  good:      { emoji:"良", msg:"Bien joué !",  sub:"Encore un peu et tu maîtrises tout !",      color:"#3a6090" },
  ok:        { emoji:"可", msg:"Pas mal !",    sub:"Révise les termes manquants.",               color:"#8b6a1a" },
  poor:      { emoji:"努", msg:"À réviser !",  sub:"Continue à t'entraîner, tu y arriveras !",  color:"#822020" },
};

function pctOf(ok:number,tot:number){ return tot===0?0:Math.round((ok/tot)*100); }

const store     = useQuizStore();
const total     = computed(() => store.questions.length);
const p         = computed(() => pctOf(store.score, total.value));
const level     = computed<Level>(() => p.value>=80?"excellent":p.value>=60?"good":p.value>=40?"ok":"poor");
const levelData = computed(() => LEVELS[level.value]);
const jpFr      = computed(() => store.sessionResults.filter((r:Result) => r.dir==="jp-fr"));
const frJp      = computed(() => store.sessionResults.filter((r:Result) => r.dir==="fr-jp"));
const missed    = computed(() => store.sessionResults.filter((r:Result) => !r.ok));
</script>

<style scoped>
.rl { font-size:0.65rem; color:#5a4a3a; margin-top:0.2rem; text-transform:uppercase; letter-spacing:0.1em; }
.rs { width:1px; height:2rem; background:rgba(172,152,120,0.20); }

.dir-row {
  display:flex; align-items:center; justify-content:space-between;
  font-size:0.875rem; padding:0.35rem 0;
}

.missed-item {
  display:flex; align-items:flex-start; gap:0.6rem;
  padding:0.55rem 0; border-bottom:1px solid rgba(172,152,120,0.12);
}
.missed-item:last-child { border-bottom:none; }

/* Boutons */
.act-primary {
  flex:1; padding:0.875rem; border-radius:0.875rem;
  font-weight:700; font-size:0.875rem; letter-spacing:0.03em;
  color:#fff; cursor:pointer;
  transition: background 0.35s, box-shadow 0.35s, transform 0.2s;
  background: linear-gradient(135deg, var(--clr-p-light) 0%, var(--clr-p) 100%);
  border: 1px solid rgba(var(--clr-p-rgb), 0.35);
  box-shadow: 0 3px 16px rgba(var(--clr-p-rgb), 0.20);
}
.act-primary:hover {
  background: linear-gradient(135deg, var(--clr-p-lighter) 0%, var(--clr-p-light) 100%);
  transform:translateY(-1px);
  box-shadow:0 5px 22px rgba(var(--clr-p-rgb), 0.28);
}
.act-ghost {
  flex:1; padding:0.875rem; border-radius:0.875rem;
  font-weight:700; font-size:0.875rem;
  background: rgba(255,252,248,0.70);
  border: 1px solid rgba(172,152,120,0.25);
  color:#6a5e52; cursor:pointer; transition:all 0.2s;
}
.act-ghost:hover {
  background: rgba(255,252,248,0.92);
  color:#261e16; transform:translateY(-1px);
  box-shadow: 0 3px 12px rgba(80,60,38,0.08);
}
</style>
