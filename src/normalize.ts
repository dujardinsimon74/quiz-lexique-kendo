/**
 * Normalise une chaîne pour la comparaison :
 * - minuscules
 * - supprime TOUS les diacritiques/macrons (é→e, ô→o, û→u, à→a…)
 * - trim
 *
 * Utilise NFD (décomposition Unicode) + suppression des "Combining Diacritical Marks"
 * (plage U+0300–U+036F) pour couvrir tous les accents et macrons.
 */
export function normalize(s: string): string {
  // ̀-ͯ = bloc Unicode "Combining Diacritical Marks"
  // eslint-disable-next-line no-misleading-character-class
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

/**
 * Distance de Levenshtein entre deux chaînes.
 */
export function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
