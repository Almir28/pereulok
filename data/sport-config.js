export const SPORT_CONFIG = {
  provider: 'SportDB.dev',
  sportDb: {
    baseUrl: 'https://api.sportdb.dev/api',
    upstream: 'flashscore',
    apiKey: 'JEC8hosrdKd7ZLxL3MlLXhizKxx1mN0rKjTV5diF',
    apiKeyStorageKey: 'pereuloq:sportdb-api-key',
    timezoneOffset: 3
  },
  refreshMs: 20000,
  historyKey: 'pereuloq:sport:team-history',
  matchesKey: 'pereuloq:sport:latest-matches',
  defaultSport: 'football',
  defaultLeagueId: '4328',
  sports: [
    { id: 'all', label: 'Все', icon: '●' },
    { id: 'football', label: 'Футбол', icon: '⚽' },
    { id: 'basketball', label: 'Баскетбол', icon: '🏀' },
    { id: 'hockey', label: 'Хоккей', icon: '🏒' },
    { id: 'tennis', label: 'Теннис', icon: '🎾' }
  ],
  leagues: {
    football: [
      { id: '4328', name: 'English Premier League', label: 'АПЛ', flag: '🇬🇧' },
      { id: '4335', name: 'La Liga', label: 'Ла Лига', flag: '🇪🇸' },
      { id: '4331', name: 'German Bundesliga', label: 'Бундеслига', flag: '🇩🇪' }
    ],
    basketball: [
      { id: '4387', name: 'NBA', label: 'NBA', flag: '🇺🇸' }
    ],
    hockey: [
      { id: '4380', name: 'NHL', label: 'NHL', flag: '🇨🇦' }
    ],
    tennis: [
      { id: '4464', name: 'ATP Tour', label: 'ATP', flag: '🌍' }
    ]
  }
};

export const FALLBACK_MATCHES = [
  {
    id: 'mock-ucl-1',
    sport: 'football',
    tournament: 'Лига Чемпионов',
    flag: '🇪🇺',
    status: 'live',
    home: { name: 'Реал Мадрид', logo: '⚽', color: '#f8fafc' },
    away: { name: 'Манчестер Сити', logo: '⚽', color: '#38bdf8' },
    score: { h: 2, a: 1 },
    time: "74'",
    stats: [
      { l: 'Владение', h: 55, a: 45 },
      { l: 'Удары', h: 12, a: 8 },
      { l: 'Угловые', h: 7, a: 3 }
    ],
    history: [
      { date: '12 апр', score: '3-3', res: 'd' },
      { date: '8 мая', score: '1-1', res: 'd' },
      { date: '17 апр', score: '4-0', res: 'w' }
    ]
  },
  {
    id: 'mock-nba-1',
    sport: 'basketball',
    tournament: 'NBA',
    flag: '🇺🇸',
    status: 'live',
    home: { name: 'Лейкерс', logo: '🏀', color: '#facc15' },
    away: { name: 'Селтикс', logo: '🏀', color: '#22c55e' },
    score: { h: 82, a: 78 },
    time: 'Q3 04:21',
    stats: [
      { l: 'Броски %', h: 49, a: 46 },
      { l: 'Подборы', h: 31, a: 28 },
      { l: 'Передачи', h: 22, a: 19 }
    ],
    history: [
      { date: '18 мар', score: '112-104', res: 'w' },
      { date: '2 фев', score: '98-101', res: 'l' },
      { date: '9 янв', score: '120-118', res: 'w' }
    ]
  },
  {
    id: 'mock-nhl-1',
    sport: 'hockey',
    tournament: 'NHL',
    flag: '🇨🇦',
    status: 'finished',
    home: { name: 'Торонто', logo: '🏒', color: '#60a5fa' },
    away: { name: 'Монреаль', logo: '🏒', color: '#ef4444' },
    score: { h: 3, a: 5 },
    time: 'ФТ',
    stats: [
      { l: 'Броски', h: 28, a: 35 },
      { l: 'Вбрасывания %', h: 51, a: 49 },
      { l: 'Силовые', h: 17, a: 21 }
    ],
    history: [
      { date: '22 апр', score: '4-3', res: 'w' },
      { date: '10 мар', score: '2-4', res: 'l' },
      { date: '18 янв', score: '3-3 ОТ', res: 'd' }
    ]
  },
  {
    id: 'mock-tennis-1',
    sport: 'tennis',
    tournament: 'Ролан Гаррос',
    flag: '🇫🇷',
    status: 'live',
    home: { name: 'Джокович', logo: '🎾', color: '#06b6d4' },
    away: { name: 'Надаль', logo: '🎾', color: '#f97316' },
    score: { h: '6:3 4', a: '2:6 3' },
    time: 'Set 2',
    stats: [
      { l: 'Эйсы', h: 8, a: 4 },
      { l: '1я подача %', h: 64, a: 72 },
      { l: 'Виннеры', h: 22, a: 18 }
    ],
    history: [
      { date: 'Финал 2023', score: '3:2', res: 'w' },
      { date: 'Полуфинал 2022', score: '1:3', res: 'l' },
      { date: 'Финал 2020', score: '1:3', res: 'l' }
    ]
  }
];
