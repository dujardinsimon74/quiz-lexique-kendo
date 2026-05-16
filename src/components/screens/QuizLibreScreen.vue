<template>
  <div class="animate-fade-in space-y-4">

    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <div>
        <p class="section-label mb-0.5">書 · Saisie libre · FR → JP</p>
        <p class="text-xs font-medium" style="color:#6a5a48;">
          Question {{ store.libreQIndex + 1 }} / {{ store.libreQuestions.length }}
        </p>
      </div>
      <!-- Score en cours -->
      <div class="text-right">
        <div class="section-label mb-0.5">Points</div>
        <div class="text-lg font-black tabular-nums" style="color:#261e16; line-height:1.1;">
          <span style="color:#7c3328;">{{ store.libreScore }}</span>
          <span style="color:#c8b89a; font-size:0.8rem;"> / {{ store.libreResults.length * 4 }}</span>
        </div>
      </div>
    </div>

    <div class="divider-red" />

    <!-- Question -->
    <div class="glass rounded-2xl p-6 text-center">
      <p class="section-label mb-3">Quel est le terme japonais pour…</p>
      <p class="text-xl font-bold leading-snug" style="color:#261e16;">
        {{ store.currentLibreQ.question }}
      </p>
    </div>

    <!-- Indicateur de tentatives -->
    <div class="flex items-center justify-between px-1">
      <div class="flex gap-2">
        <span
          v-for="i in 4"
          :key="i"
          class="attempt-dot"
          :class="dotClass(i)"
        />
      </div>
      <p class="text-xs font-semibold" :class="attemptsLeft > 0 && !resolved ? 'text-attempts' : ''">
        <template v-if="!resolved">
          {{ attemptsLeft }} essai{{ attemptsLeft > 1 ? 's' : '' }} restant{{ attemptsLeft > 1 ? 's' : '' }}
        </template>
      </p>
    </div>

    <!-- Zone de saisie -->
    <div v-if="!resolved" class="space-y-3">
      <div class="input-wrap" :class="hintLevel === 'close' ? 'input-close' : hintLevel === 'near' ? 'input-near' : ''">
        <input
          ref="inputRef"
          v-model="inputVal"
          type="text"
          class="libre-input"
          placeholder="Tapez le terme japonais…"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          @keydown.enter.stop="submit()"
        />
        <button class="submit-btn" :disabled="!inputVal.trim()" @click="submit">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <!-- Indice -->
      <Transition name="hint-fade">
        <div v-if="hint" class="hint-box" :class="`hint-${hintLevel}`">
          <span class="hint-icon">
            {{ hintLevel === 'close' ? '◎' : hintLevel === 'near' ? '△' : '✕' }}
          </span>
          <span>{{ hint }}</span>
        </div>
      </Transition>
    </div>

    <!-- Résultat : Correct -->
    <div v-if="resolved && success" class="result-card result-ok glass rounded-2xl p-5 text-center">
      <div class="font-jp text-4xl font-black mb-1" style="color:#2e5e38;">○</div>
      <p class="font-bold text-base mb-1" style="color:#1e4a28;">{{ store.currentLibreQ.answer }}</p>
      <div class="points-badge">
        <span class="font-jp">{{ pointsEarned }}</span>
        <span> point{{ pointsEarned > 1 ? 's' : '' }}</span>
      </div>
      <p class="text-xs mt-2" style="color:#4a7a54;">
        {{ pointsEarned === 4 ? 'Parfait du premier coup !' : pointsEarned === 3 ? 'Bien joué !' : pointsEarned === 2 ? 'Presque !' : 'Trouvé au 4ᵉ essai.' }}
      </p>
    </div>

    <!-- Résultat : Raté -->
    <div v-if="resolved && !success" class="result-card result-ko glass rounded-2xl p-5 text-center">
      <div class="font-jp text-4xl font-black mb-1" style="color:#822020;">×</div>
      <p class="text-xs font-semibold mb-1" style="color:#9a5a5a;">La réponse était :</p>
      <p class="font-bold text-base" style="color:#5a1a1a;">{{ store.currentLibreQ.answer }}</p>
      <p class="text-xs mt-2" style="color:#9a5a5a;">0 point — continue l'entraînement !</p>
    </div>

    <!-- Bouton suivant -->
    <button v-if="resolved" class="next-btn" @click="next">
      <span>{{ isLast ? 'Voir les résultats' : 'Question suivante' }}</span>
      <span class="font-jp text-lg leading-none">→</span>
    </button>

    <!-- Passer / Retour accueil -->
    <div v-if="!resolved" class="flex gap-2">
      <button class="home-btn flex-1" @click="store.goHome()">← Accueil</button>
      <button class="skip-btn" @click="skip">Passer →</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import { useQuizStore } from "../../store";

const store = useQuizStore();

// ── État local ──────────────────────────────────────────────────────────────
const inputRef   = ref<HTMLInputElement | null>(null);
const inputVal   = ref("");
const hint       = ref("");
const hintLevel  = ref<"close" | "near" | "far" | "">("");
const resolved   = ref(false);
const success    = ref(false);
const pointsEarned = ref(0);

// ── Computed ────────────────────────────────────────────────────────────────
const attemptsLeft = computed(() => 4 - store.libreAttempts);
const isLast = computed(() => store.libreQIndex >= store.libreQuestions.length - 1);

function dotClass(i: number): string {
  const used = store.libreAttempts;
  if (resolved.value && success.value) {
    // Toutes les tentatives utilisées en vert jusqu'à la dernière réussie
    return i <= used ? "dot-ok" : "dot-empty";
  }
  if (resolved.value && !success.value) {
    // Tout raté → tous en rouge
    return "dot-ko";
  }
  return i <= used ? "dot-ko" : "dot-empty";
}

// ── Actions ─────────────────────────────────────────────────────────────────
function submit() {
  const val = inputVal.value.trim();
  if (!val || resolved.value) return;

  const result = store.submitLibreAnswer(val);

  if (result.correct) {
    resolved.value   = true;
    success.value    = true;
    pointsEarned.value = result.points ?? 0;
    hint.value       = "";
    hintLevel.value  = "";
  } else if (result.attemptsLeft === 0) {
    resolved.value  = true;
    success.value   = false;
    hint.value      = "";
    hintLevel.value = "";
  } else {
    hint.value      = result.hint?.text ?? "";
    hintLevel.value = result.hint?.level ?? "far";
    inputVal.value  = "";
    nextTick(() => inputRef.value?.focus());
  }
}

function skip() {
  // Enregistre 0 point et révèle la réponse
  store.skipLibreQuestion();
  resolved.value     = true;
  success.value      = false;
  hint.value         = "";
  hintLevel.value    = "";
}

function next() {
  inputVal.value     = "";
  hint.value         = "";
  hintLevel.value    = "";
  resolved.value     = false;
  success.value      = false;
  pointsEarned.value = 0;
  store.nextLibreQuestion();
  nextTick(() => inputRef.value?.focus());
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && resolved.value) next();
}

onMounted(() => {
  inputRef.value?.focus();
  window.addEventListener("keydown", onKeydown);
});
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<style scoped>
/* Dots de tentatives */
.attempt-dot {
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  transition: background 0.25s, transform 0.2s;
}
.dot-empty { background: rgba(172, 152, 120, 0.25); border: 1px solid rgba(172, 152, 120, 0.40); }
.dot-ko    { background: #c04040; transform: scale(1.1); }
.dot-ok    { background: #3a8050; transform: scale(1.1); }

.text-attempts { color: #7c3328; font-size: 0.72rem; }

/* Zone saisie */
.input-wrap {
  display: flex;
  align-items: center;
  gap: 0;
  border-radius: 0.875rem;
  border: 1.5px solid rgba(172, 152, 120, 0.40);
  background: rgba(255, 252, 248, 0.95);
  overflow: hidden;
  transition: border-color 0.2s;
}
.input-wrap:focus-within { border-color: rgba(124, 51, 40, 0.50); }
.input-close { border-color: rgba(46, 94, 56, 0.45) !important; }
.input-near  { border-color: rgba(139, 106, 26, 0.50) !important; }

.libre-input {
  flex: 1;
  padding: 0.85rem 1rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  color: #261e16;
  background: transparent;
  border: none;
  outline: none;
}
.libre-input::placeholder { color: #b0a090; font-weight: 400; }

.submit-btn {
  padding: 0.85rem 1rem;
  background: #7c3328;
  color: #fff8f0;
  border: none;
  cursor: pointer;
  transition: background 0.18s;
  display: flex;
  align-items: center;
}
.submit-btn:hover:not(:disabled) { background: #922e22; }
.submit-btn:disabled { opacity: 0.35; cursor: not-allowed; }

/* Indice */
.hint-box {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.85rem;
  font-weight: 700;
  border-width: 1.5px;
  border-style: solid;
}
.hint-close {
  background: #d4eadb;
  border-color: #7aba8e;
  color: #1a4a28;
}
.hint-near {
  background: #f0e0a8;
  border-color: #c8a030;
  color: #5a3a00;
}
.hint-far {
  background: #f0d0d0;
  border-color: #c05050;
  color: #6a1010;
}
.hint-icon { font-size: 1.1rem; flex-shrink: 0; }

/* Cartes résultat */
.result-ok {
  border-color: rgba(46, 94, 56, 0.30) !important;
  background: rgba(240, 250, 243, 0.95) !important;
}
.result-ko {
  border-color: rgba(130, 32, 32, 0.25) !important;
  background: rgba(252, 242, 242, 0.95) !important;
}
.points-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.9rem;
  border-radius: 99px;
  background: rgba(46, 94, 56, 0.12);
  border: 1px solid rgba(46, 94, 56, 0.25);
  color: #2e5e38;
  font-size: 1rem;
  font-weight: 800;
  margin-top: 0.25rem;
}

/* Bouton suivant */
.next-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem;
  border-radius: 1rem;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #fff8f0;
  background: linear-gradient(135deg, #8b3a2a 0%, #7c3328 100%);
  border: 1px solid rgba(100, 32, 24, 0.4);
  cursor: pointer;
  transition: all 0.22s;
}
.next-btn:hover {
  background: linear-gradient(135deg, #9c4232 0%, #8b3a2a 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 18px rgba(124, 51, 40, 0.28);
}

/* Bouton accueil */
.home-btn {
  padding: 0.7rem;
  border-radius: 0.875rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6a5e52;
  background: rgba(255, 252, 248, 0.80);
  border: 1px solid rgba(172, 152, 120, 0.28);
  cursor: pointer;
  transition: all 0.2s;
}
.home-btn:hover {
  color: #7c3328;
  border-color: rgba(124, 51, 40, 0.28);
  background: rgba(255, 252, 248, 0.95);
}

/* Bouton passer */
.skip-btn {
  padding: 0.7rem 1.1rem;
  border-radius: 0.875rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #5a4a3a;
  background: rgba(172, 152, 120, 0.16);
  border: 1px solid rgba(172, 152, 120, 0.40);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.skip-btn:hover {
  background: rgba(172, 152, 120, 0.28);
  color: #261e16;
  border-color: rgba(172, 152, 120, 0.55);
}

/* Transitions */
.hint-fade-enter-active { transition: all 0.25s ease; }
.hint-fade-leave-active { transition: all 0.15s ease; }
.hint-fade-enter-from   { opacity: 0; transform: translateY(-4px); }
.hint-fade-leave-to     { opacity: 0; }
</style>
