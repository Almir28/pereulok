export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);
}

export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn('[Sport storage] read failed', error);
    return fallback;
  }
}

export function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('[Sport storage] write failed', error);
  }
}

export function formatKickoff(dateValue, timeValue) {
  if (!dateValue && !timeValue) return 'Время уточняется';
  const iso = [dateValue, timeValue].filter(Boolean).join('T');
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return timeValue || dateValue || 'Время уточняется';
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(parsed);
}

export function predictionFromHistory(match, storedHistory = {}) {
  const rows = [
    ...(storedHistory[match.home.name] || []),
    ...(storedHistory[match.away.name] || []),
    ...(match.history || [])
  ];
  const seed = [...`${match.home.name}${match.away.name}`].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  if (!rows.length) {
    const home = 38 + (seed % 25);
    const away = 100 - home - 22;
    return { h: home, d: 22, a: Math.max(12, away) };
  }

  const wins = rows.filter((row) => row.res === 'w').length;
  const draws = rows.filter((row) => row.res === 'd').length;
  const losses = rows.filter((row) => row.res === 'l').length;
  const total = Math.max(1, wins + draws + losses);
  const h = Math.round((wins / total) * 42 + 28);
  const d = Math.round((draws / total) * 22 + 18);
  const a = Math.max(10, 100 - h - d);
  return { h, d, a };
}

export function updateHistoryFromMatches(matches, key) {
  const current = readJson(key, {});
  matches.forEach((match) => {
    if (match.status !== 'finished') return;
    const row = {
      date: match.time || 'ФТ',
      score: `${match.score.h}-${match.score.a}`,
      res: Number(match.score.h) > Number(match.score.a) ? 'w' : Number(match.score.h) === Number(match.score.a) ? 'd' : 'l'
    };
    [match.home.name, match.away.name].forEach((team) => {
      const list = current[team] || [];
      if (!list.some((item) => item.score === row.score && item.date === row.date)) {
        current[team] = [row, ...list].slice(0, 8);
      }
    });
  });
  writeJson(key, current);
  return current;
}
