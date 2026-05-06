const routes = {
  home: 'index.html',
  feed: 'feed.html',
  store: 'store.html',
  about: 'about.html',
  private: 'private.html'
};

const ARTICLES = [
  {
    id: 14,
    cat: 'Технологии',
    kind: 'news',
    title: 'Apple урегулировала дело об ИИ',
    desc: 'Компания достигла соглашения по судебному делу о технологиях искусственного интеллекта и интеллектуальной собственности.',
    author: 'Pereuloq',
    date: '6 мая 2026',
    read: '4 мин',
    img: 'https://static01.nyt.com/images/2026/05/05/multimedia/00biz-apple-settlement-HFO-mqjb/00biz-apple-settlement-HFO-mqjb-superJumbo.jpg?quality=75&auto=webp',
    bg: 'gb1',
    href: 'posts/apple-ai-settlement.html',
    body: `<p>Apple достигла соглашения по судебному делу, связанному с использованием технологий искусственного интеллекта. Дело касалось претензий в отношении интеллектуальной собственности и возможного нарушения патентов в области ИИ.</p><p>Стороны договорились о внесудебном урегулировании, детали которого не раскрываются.</p><h3>Почему это важно</h3><p>Вопросы прав на ИИ и патенты становятся все более актуальными с ростом числа продуктов, использующих машинное обучение.</p><p>Подобные дела могут повлиять на будущие стандарты лицензирования и разработки ИИ-технологий.</p>`
  },
  {
    id: 13,
    cat: 'Культура',
    kind: 'news',
    title: 'Дьявол носит Prada 2',
    desc: 'Продолжение культового фильма снова выводит моду в центр истории: от эпохи глянца к соцсетям и digital-трендам.',
    author: 'Pereuloq',
    date: '5 мая 2026',
    read: '5 мин',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    bg: 'gb4',
    href: 'posts/devil-wears-prada-2-fashion.html',
    body: `<p>Продолжение культового фильма The Devil Wears Prada уже вызывает интерес - и на этот раз особое внимание приковано к костюмам.</p><p>Если в первой части стиль героев подчеркивал власть, статус и жесткую иерархию мира глянца, то сейчас акцент смещается: мода становится более гибкой, цифровой и ориентированной на индивидуальность.</p><h3>Мода как часть повествования</h3><p>Костюмы становятся не просто визуальным оформлением, а способом показать характер героев и изменения индустрии за почти два десятилетия.</p>`
  },
  {
    id: 12,
    cat: 'Культура',
    kind: 'post',
    title: 'Дэниел Рэдклифф и Морган Брукс',
    desc: 'Откровенный разговор вне ролей: быстрые вопросы о привычках, взглядах, творчестве и личном балансе.',
    author: 'Pereuloq',
    date: '5 мая 2026',
    read: '4 мин',
    img: 'https://static01.nyt.com/newsgraphics/documenttools/52bd0650cd3520e3/1/output-1.png',
    bg: 'gb5',
    href: 'posts/radcliffe-morgan-brooks.html',
    body: `<p>Актер Daniel Radcliffe и художница Morgan Brooks приняли участие в формате личной анкеты, где ответили на быстрые, но неожиданные вопросы о жизни, привычках и взглядах.</p><p>Разговор получился неформальным и живым - без привычных заготовленных ответов.</p><h3>Вне публичного образа</h3><p>Формат анкеты позволяет увидеть людей вне их профессий: без ролей, статуса и индустриальной дистанции.</p>`
  },
  {
    id: 11,
    cat: 'Бизнес',
    kind: 'news',
    title: 'Почему акции SpaceX недоступны',
    desc: 'Стратегия Илона Маска, закрытая модель компании и ставка на долгосрочные космические проекты без давления биржи.',
    author: 'Pereuloq',
    date: '5 мая 2026',
    read: '5 мин',
    img: 'https://static01.nyt.com/images/2026/04/30/business/00spacex-investor-sub/00spacex-investor-superJumbo.jpg?quality=75&auto=webp',
    bg: 'gb6',
    href: 'posts/spacex-private-shares.html',
    body: `<p>SpaceX остается одной из самых обсуждаемых компаний в мире, но при этом недоступной для обычных инвесторов. В отличие от многих технологических гигантов, бизнес Elon Musk не выходит на биржу.</p><p>Основная причина - контроль. Оставаясь частной компанией, SpaceX может развиваться без давления рынка и квартальной отчетности.</p><h3>Долгий горизонт</h3><p>Космические проекты требуют огромных инвестиций и не всегда дают быстрый результат, поэтому закрытая модель сохраняет стратегическую независимость.</p>`
  },
  {
    id: 10,
    cat: 'Бизнес',
    kind: 'news',
    title: 'Как LG перестраивает бизнес',
    desc: 'Кризис старой модели чеболей, давление глобального рынка и новая стратегия роста южнокорейской LG Group.',
    author: 'Pereuloq',
    date: '5 мая 2026',
    read: '5 мин',
    img: 'https://static01.nyt.com/images/2026/05/02/business/00lg/00lg-superJumbo.jpg?quality=75&auto=webp',
    bg: 'gb6',
    href: 'posts/lg-business-restructure.html',
    body: `<p>Южнокорейский гигант LG Group переживает трансформацию. Компания, долгое время остававшаяся частью традиционной модели чеболей, вынуждена адаптироваться к новым условиям глобального рынка.</p><p>Давление усиливается сразу с нескольких сторон: замедление роста экономики, конкуренция с китайскими производителями и быстрые изменения в технологиях.</p><h3>Новая ставка</h3><p>LG Group делает ставку на реструктуризацию: сокращает менее прибыльные направления и усиливает инвестиции в электронику нового поколения, батареи и технологии будущего.</p><p>История LG показывает, как даже крупнейшие игроки вынуждены меняться, чтобы оставаться конкурентоспособными в глобальной экономике.</p>`
  },
  {
    id: 9,
    cat: 'Технологии',
    kind: 'video',
    title: 'Сэм Альтман или Илон Маск',
    desc: 'Кого выбрали бы инвесторы: быстрый рост и коммерциализацию ИИ или долгосрочные технологические прорывы.',
    author: 'Pereuloq',
    date: '5 мая 2026',
    read: '4 мин',
    img: 'https://img.youtube.com/vi/Ns3xc9TxM34/hqdefault.jpg',
    bg: 'gb1',
    href: 'posts/altman-musk-investors.html',
    body: `<p>На фоне стремительного роста индустрии искусственного интеллекта все чаще звучит вопрос: кто сегодня определяет будущее технологий - Sam Altman или Elon Musk.</p><p>Мнения инвесторов разделились. Altman ассоциируется с быстрым развитием ИИ и созданием продуктов, которые уже меняют повседневную жизнь миллионов людей.</p><h3>Два разных сценария будущего</h3><p>Если речь о быстром росте и коммерциализации, чаще выбирают Альтмана. Если о визионерстве и глобальных прорывах, в приоритете Маск.</p><p>Главный вывод: выбор между ними - не про то, кто лучше, а про то, какое будущее кажется более перспективным.</p>`
  },
  {
    id: 8,
    cat: 'Кино',
    kind: 'news',
    title: 'Спайк Ли отказался от ИИ в кино',
    desc: 'Режиссер заявил, что не планирует использовать искусственный интеллект в фильмах: кино должно оставаться искусством, созданным людьми.',
    author: 'Pereuloq',
    date: '5 мая 2026',
    read: '4 мин',
    bg: 'gb2',
    href: 'posts/spike-lee-ai-cinema.html',
    body: `<p>Американский режиссер Spike Lee заявил, что не планирует использовать искусственный интеллект в своих фильмах. По его словам, технологии не способны заменить человеческий взгляд, опыт и эмоции, которые лежат в основе настоящего кино.</p><p>Ли подчеркнул, что для него кино - это прежде всего история, рассказанная человеком. Он считает, что использование ИИ может привести к потере аутентичности и индивидуального стиля.</p><h3>Позиция режиссера</h3><blockquote>Я никогда не буду использовать это.</blockquote><p>Заявление прозвучало на фоне активного обсуждения роли ИИ в киноиндустрии, где студии экспериментируют с нейросетями от сценариев до визуальных эффектов.</p>`
  },
  {
    id: 7,
    cat: 'Природа',
    kind: 'news',
    title: 'Самое опасное животное Африки',
    desc: 'Как выжить при встрече с бегемотом и почему главная защита - дистанция, а не героизм.',
    author: 'Pereuloq',
    date: '5 мая 2026',
    read: '5 мин',
    img: 'https://media.cnn.com/api/v1/images/stellar/prod/230411150258-01-hippo-attack-top.jpg?c=16x9&q=h_653,w_1160,c_fill/f_avif',
    bg: 'gb3',
    href: 'posts/hippo-survival-africa.html',
    body: `<p>Бегемоты выглядят спокойными и даже медлительными, но на деле считаются одними из самых опасных животных Африки. Ежегодно они становятся причиной гибели сотен людей - чаще, чем львы или крокодилы.</p><p>Эксперт по выживанию Paul Templer знает об этом не понаслышке: во время работы гидом в Зимбабве он пережил нападение бегемота, которое едва не стоило ему жизни.</p><h3>Главное правило</h3><p>Держать дистанцию. Нельзя приближаться к бегемотам ни на воде, ни на суше, особенно если вы можете оказаться между животным и водой.</p><p>При атаке ключ к выживанию - профилактика: бегемот силен, быстр и гораздо опаснее, чем кажется со стороны.</p>`
  },
  {
    id: 6,
    cat: 'Культура',
    kind: 'news',
    title: 'Кафе как произведение искусства',
    desc: 'Как Южная Корея превратила кофейни в культурный феномен и сделала кофе частью визуального опыта.',
    author: 'Pereuloq',
    date: '5 мая 2026',
    read: '6 мин',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80',
    bg: 'gb4',
    href: 'posts/korean-cafes-art.html',
    body: `<p>Южная Корея давно вышла за рамки обычной кофейной культуры. Сегодня местные кафе - это не просто места, где пьют кофе, а полноценные арт-пространства, привлекающие местных жителей и туристов со всего мира.</p><p>В последние годы в стране стремительно развивается тренд на уникальные концептуальные кофейни. Владельцы делают ставку не только на качество напитков, но и на визуальный опыт.</p><h3>Почему это стало феноменом</h3><p>Некоторые кафе выглядят как сцены из фильмов или комиксов, другие переносят гостей в футуристические пространства, минималистичные галереи или природные интерьеры с садами и панорамными видами.</p><p>Социальные сети усиливают этот эффект: необычные заведения быстро становятся вирусными и получают поток посетителей без традиционной рекламы.</p>`
  },
  {
    id: 0,
    cat: 'Технологии',
    kind: 'news',
    title: 'iPhone 17 Pro',
    desc: 'Цельный корпус, новая система камер, высокая производительность и автономность.',
    author: 'Pereuloq',
    date: '13 сентября 2025',
    read: '7 мин',
    img: 'https://www.apple.com/v/iphone-17-pro/a/images/overview/welcome/hero_endframe__xdzisdq1ppem_xlarge_2x.jpg',
    bg: 'gb1',
    href: 'posts/iphone-17-pro.html',
    body: `<p>iPhone 17 Pro в этой подборке остается главным технологическим материалом Pereuloq: цельный корпус, фокус на камерах и ощущение продукта, который взрослеет без лишнего шума.</p><h3>Почему это важно</h3><p>Новый дизайн сайта сохраняет редакционный ритм: крупный первый экран, чистая типографика и быстрый переход к материалам.</p>`
  },
  {
    id: 1,
    cat: 'Технологии',
    kind: 'video',
    title: 'iPhone Air',
    desc: 'Самый тонкий iPhone. С мощностью Pro внутри.',
    author: 'Pereuloq',
    date: '14 сентября 2025',
    read: '6 мин',
    img: 'https://www.apple.com/v/iphone-air/a/images/overview/welcome/hero_endframe__e89wrlp1kjee_xlarge_2x.jpg',
    bg: 'gb5',
    href: 'posts/iphone-air.html',
    body: `<p>iPhone Air показывает другую сторону продуктового дизайна: меньше толщины, больше ощущения легкости, но без отказа от производительности.</p><blockquote>Хороший интерфейс не спорит с содержанием, а помогает ему дышать.</blockquote>`
  },
  {
    id: 2,
    cat: 'Технологии',
    kind: 'update',
    title: 'Apple Watch Ultra 3',
    desc: 'Яркий дисплей, титан и долгая батарея для спорта и приключений.',
    author: 'Pereuloq',
    date: '15 сентября 2025',
    read: '8 мин',
    img: 'https://www.apple.com/v/apple-watch-ultra-3/a/images/overview/product-viewer/product_durability__fjxsjypa2e6i_large_2x.jpg',
    bg: 'gb6',
    href: 'posts/apple-watch-ultra-3.html',
    body: `<p>Ultra остается инструментом для людей, которым нужны запас прочности, читаемый экран и спокойная уверенность в автономности.</p>`
  },
  {
    id: 3,
    cat: 'События',
    kind: 'post',
    title: 'MINI JCW × Deus Ex Machina',
    desc: 'Два мира. Два авто. Одна страсть.',
    author: 'Pereuloq',
    date: '12 сентября 2025',
    read: '10 мин',
    img: 'https://www.mini.com/en_MS/home/progress/mini-jcw-x-deus-ex-machina/jcr:content/main/par/product_editorial/productEditorialPar/editorial_fullwidth_/leftPar/image_item/damImage.narrow.2880w.j_1756879239152.jpg',
    bg: 'gb2',
    href: 'posts/mini-jcw-deus.html',
    body: `<p>Коллаборация MINI JCW и Deus Ex Machina работает как визуальная история: техника, культура и стиль встречаются в одном объекте.</p>`
  },
  {
    id: 4,
    cat: 'Музыка',
    kind: 'post',
    title: 'Justin Bieber — SWAG II',
    desc: 'Музыкальный релиз как культурный сигнал и повод для разговора о стиле.',
    author: 'Pereuloq',
    date: '16 сентября 2025',
    read: '5 мин',
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80',
    bg: 'gb4',
    href: 'posts/justin-bieber-swag-ii.html',
    body: `<p>SWAG II в ленте Pereuloq появляется как короткая культурная заметка: музыка, образ и цифровой шум вокруг релиза.</p>`
  },
  {
    id: 5,
    cat: 'Проект',
    kind: 'ad',
    title: 'Магазин Pereuloq обновлен',
    desc: 'Категории, поиск и продуктовая карточка теперь живут отдельно от ленты.',
    author: 'Pereuloq',
    date: '4 мая 2026',
    read: '3 мин',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    bg: 'gb3',
    href: 'store.html',
    body: `<p>Магазин теперь не смешивается с редакционной лентой. Это отдельная страница с поиском, категориями и модальным просмотром продукта.</p>`
  }
];

const PRODUCTS = [
  { id: 0, cat: 'digital', type: 'Цифровой ключ', name: 'Steam пополнение', icon: '🎮', price: '299 ₽', was: null, rating: 4.9, rev: 1200, st: 'st-blue', stl: 'ХИТ', desc: 'Пополнение кошелька, подарочные карты и цифровые игровые сценарии.', feats: ['Быстрая обработка', 'Цифровой формат', 'Поддержка после заказа'] },
  { id: 1, cat: 'digital', type: 'Цифровой ключ', name: 'PlayStation Store', icon: '▣', price: '499 ₽', was: null, rating: 4.8, rev: 980, st: 'st-gold', stl: 'ТОП', desc: 'Карты пополнения PSN и подписки для игрового аккаунта.', feats: ['Коды пополнения', 'Проверенный формат', 'Инструкция после покупки'] },
  { id: 2, cat: 'digital', type: 'Подписка', name: 'ChatGPT', icon: '✦', price: '1 290 ₽', was: null, rating: 4.9, rev: 830, st: 'st-green', stl: 'НОВОЕ', desc: 'Пополнение, продление подписок и аккаунты с гарантией.', feats: ['AI-доступ', 'Подписки', 'Помощь с активацией'] },
  { id: 3, cat: 'subs', type: 'Подписка', name: 'Pereuloq Private', icon: '◆', price: '99 ₽', was: null, rating: 4.7, rev: 214, st: 'st-blue', stl: 'КЛУБ', desc: 'Приватная лента, ранние заметки и закрытые обновления.', feats: ['Закрытая лента', 'Ранние публикации', 'Ежемесячный доступ'] },
  { id: 4, cat: 'services', type: 'Услуга', name: 'Настройка CMS', icon: '⚙', price: '7 900 ₽', was: null, rating: 4.8, rev: 74, st: null, stl: null, desc: 'Помощь с контентной структурой, публикациями и редакционным workflow.', feats: ['Структура контента', 'Поля публикаций', 'Документация'] },
  { id: 5, cat: 'templates', type: 'Шаблон', name: 'Notion-шаблон редакции', icon: '▤', price: '1 200 ₽', was: null, rating: 4.6, rev: 180, st: 'st-red', stl: 'SALE', desc: 'Контент-план, рубрики, статусы и календарь публикаций.', feats: ['Контент-план', 'База рубрик', 'Статусы материалов'] }
];

const FEED_CATS = [
  { v: 'all', l: 'Все' },
  { v: 'news', l: 'Новости' },
  { v: 'update', l: 'Обновления' },
  { v: 'ad', l: 'Реклама' },
  { v: 'video', l: 'Видео' },
  { v: 'post', l: 'Посты' }
];

const STORE_CATS = [
  { v: 'all', l: 'Все' },
  { v: 'digital', l: 'Ключи' },
  { v: 'subs', l: 'Подписки' },
  { v: 'templates', l: 'Шаблоны' },
  { v: 'services', l: 'Услуги' }
];

const CATS_DATA = [
  { icon: '💻', name: 'Технологии', count: '5' },
  { icon: '$', name: 'Бизнес', count: '2' },
  { icon: '◼', name: 'Кино', count: '1' },
  { icon: '✦', name: 'Культура', count: '3' },
  { icon: '!', name: 'Природа', count: '1' },
  { icon: '🎬', name: 'События', count: '1' },
  { icon: '🎵', name: 'Музыка', count: '1' },
  { icon: '◆', name: 'Проект', count: '1' }
];

const TICKER_ITEMS = [
  'Apple урегулировала судебное дело о технологии искусственного интеллекта',
  'The Devil Wears Prada 2 снова выводит моду в центр внимания',
  'SpaceX остается закрытой компанией и недоступна обычным инвесторам',
  'Daniel Radcliffe и Morgan Brooks говорят вне публичных ролей',
  'LG Group перестраивает бизнес и делает ставку на новые технологии',
  'Инвесторы выбирают между Sam Altman и Elon Musk',
  'Spike Lee отказался использовать ИИ в своих фильмах',
  'Как выжить при встрече с бегемотом: главное - держать дистанцию',
  'Кафе Южной Кореи стали новым культурным феноменом',
  'Новый дизайн Pereuloq на GitHub Pages',
  'Лента и магазин теперь отдельные страницы',
  'Темная и светлая тема сохранены',
  'Магазин работает без backend',
  'Приватная страница остается статической'
];

const PROMOS = [
  { cls: 'promo-blue', badge: 'Новое', title: 'Pereuloq Private', sub: 'Закрытая лента и ранние заметки' },
  { cls: 'promo-violet', badge: 'Store', title: 'Цифровые продукты', sub: 'Ключи, шаблоны и услуги' }
];

let currentSlide = 0;
let slideTimer;
let feedFilter = 'all';
let storeFilter = 'all';
let storeSearch = '';
let readOpen = false;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function goPage(page) {
  window.location.href = routes[page] || routes.home;
}

function articleVisual(article, className = '') {
  return article.img
    ? `<img class="img-fill ${className}" src="${article.img}" alt="${article.title}" loading="lazy" decoding="async">`
    : `<div class="visual-fill ${article.bg} ${className}"></div>`;
}

function setActiveNav() {
  const page = document.body.dataset.page || 'home';
  $$('[data-nav]').forEach((link) => {
    link.classList.toggle('on', link.dataset.nav === page);
  });
  $$('.mobile-panel a').forEach((link) => {
    link.classList.toggle('on', link.dataset.nav === page);
  });
}

function setupCursor() {
  const cursor = $('#CUR');
  const ring = $('#CRING');
  if (!cursor || !ring || matchMedia('(pointer: coarse)').matches) return;
  let cx = 0;
  let cy = 0;
  let rx = 0;
  let ry = 0;
  document.addEventListener('mousemove', (event) => {
    cx = event.clientX;
    cy = event.clientY;
    cursor.style.left = `${cx}px`;
    cursor.style.top = `${cy}px`;
  });
  function raf() {
    rx += (cx - rx) * 0.1;
    ry += (cy - ry) * 0.1;
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
    requestAnimationFrame(raf);
  }
  raf();
  document.addEventListener('mousedown', () => document.body.classList.add('cur-click'));
  document.addEventListener('mouseup', () => document.body.classList.remove('cur-click'));
  document.addEventListener('mouseover', (event) => {
    if (event.target.closest('a,button,input,.feat-card,.feed-art,.prod-card,.cat-item,.ab-proj,.promo-card')) {
      document.body.classList.add('cur-hover');
    }
  });
  document.addEventListener('mouseout', (event) => {
    if (event.target.closest('a,button,input,.feat-card,.feed-art,.prod-card,.cat-item,.ab-proj,.promo-card')) {
      document.body.classList.remove('cur-hover');
    }
  });
}

function setupHeader() {
  const header = $('#HDR');
  const menuButton = $('#MOBILE_MENU_BTN');
  const mobilePanel = $('#MOBILE_PANEL');
  const legacyMenuButton = $('#menuBtn');
  const legacyMobileNav = $('#mobileNav');
  const legacyClose = $('#mnavClose');
  const legacyProgress = $('#scrollProgress');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('stuck', window.scrollY > 10);
    if (legacyProgress) {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      legacyProgress.style.transform = `scaleX(${scrollY / max})`;
    }
    updateReadProgress();
  }, { passive: true });
  menuButton?.addEventListener('click', () => mobilePanel?.classList.toggle('open'));
  mobilePanel?.addEventListener('click', (event) => {
    if (event.target.closest('a')) mobilePanel.classList.remove('open');
  });
  legacyMenuButton?.addEventListener('click', () => legacyMobileNav?.classList.remove('hidden'));
  legacyClose?.addEventListener('click', () => legacyMobileNav?.classList.add('hidden'));
  legacyMobileNav?.addEventListener('click', (event) => {
    if (event.target.classList.contains('mnav-backdrop') || event.target.closest('a')) {
      legacyMobileNav.classList.add('hidden');
    }
  });
  $('#preloader')?.classList.add('fade-out');
  if ($('#preloader')) setTimeout(() => $('#preloader')?.remove(), 450);
}

function setupTheme() {
  const saved = localStorage.getItem('pereuloq-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const button = $('#THEME_BTN');
  if (button) button.textContent = saved === 'dark' ? '☽' : '☀';
  button?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('pereuloq-theme', next);
    button.textContent = next === 'dark' ? '☽' : '☀';
  });
}

function buildSlider() {
  const wrap = $('#SLIDES_WRAP');
  const ctrl = $('#HERO_CTRL');
  if (!wrap || !ctrl) return;
  const slides = ARTICLES.slice(0, 4);
  wrap.innerHTML = slides.map((article, index) => `
    <div class="hero-slide${index === 0 ? ' active' : ''}" id="hs_${index}">
      <div class="hero-slide-bg ${article.bg}">${articleVisual(article)}</div>
      <div class="hero-bg-gradient"></div>
      <div class="hero-slide-content">
        <div class="hs-eyebrow">
          <div class="hs-live"><span class="live-dot"></span>Прямой эфир</div>
          <span class="hs-cat">${article.cat}</span>
        </div>
        <h1 class="hs-title">${article.title}</h1>
        <p class="hs-desc">${article.desc}</p>
        <div class="hs-cta">
          <button class="btn-hs-main" data-read="${article.id}">Читать статью →</button>
          <a class="btn-hs-ghost" href="feed.html">Все материалы</a>
        </div>
      </div>
    </div>`).join('');
  ctrl.innerHTML = '<button class="hero-nav-btn" data-slide-move="-1">←</button>' +
    slides.map((_, index) => `<button class="hero-dot${index === 0 ? ' on' : ''}" data-slide="${index}" aria-label="Слайд ${index + 1}"></button>`).join('') +
    '<button class="hero-nav-btn" data-slide-move="1">→</button>';
  ctrl.addEventListener('click', (event) => {
    const dot = event.target.closest('[data-slide]');
    const move = event.target.closest('[data-slide-move]');
    if (dot) gotoSlide(Number(dot.dataset.slide), slides.length);
    if (move) gotoSlide(currentSlide + Number(move.dataset.slideMove), slides.length);
  });
  startProgress(slides.length);
}

function gotoSlide(index, total = 4) {
  const next = ((index % total) + total) % total;
  $(`#hs_${currentSlide}`)?.classList.remove('active');
  $$('.hero-dot')[currentSlide]?.classList.remove('on');
  currentSlide = next;
  $(`#hs_${currentSlide}`)?.classList.add('active');
  $$('.hero-dot')[currentSlide]?.classList.add('on');
  startProgress(total);
}

function startProgress(total = 4) {
  clearTimeout(slideTimer);
  const bar = $('#HERO_BAR');
  if (bar) {
    bar.classList.remove('anim');
    bar.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      bar.classList.add('anim');
      bar.style.width = '100%';
    }));
  }
  slideTimer = setTimeout(() => gotoSlide(currentSlide + 1, total), 4000);
}

function buildTicker() {
  const ticker = $('#TICKER');
  if (!ticker) return;
  const content = TICKER_ITEMS.map((item) => `<span class="ticker-item">${item} <span class="ticker-sep">◆</span></span>`).join('');
  ticker.innerHTML = content + content;
}

function buildFeatured() {
  const grid = $('#FEAT_GRID');
  if (!grid) return;
  const lead = ARTICLES[0];
  grid.innerHTML = `
    <article class="feat-card wide" data-read="${lead.id}">
      <div class="fc-img">${articleVisual(lead)}</div>
      <div class="fc-body">
        <div class="fc-cat">${lead.cat}</div>
        <div class="fc-title">${lead.title}</div>
        <div class="fc-desc">${lead.desc}</div>
        <div class="fc-meta"><span>${lead.author}</span><span class="fc-dot">·</span><span>${lead.date}</span><span class="fc-dot">·</span><span>${lead.read}</span></div>
      </div>
    </article>` +
    ARTICLES.slice(1, 4).map((article) => `
      <article class="feat-card" data-read="${article.id}">
        <div class="fc-img">${articleVisual(article)}</div>
        <div class="fc-body">
          <div class="fc-cat">${article.cat}</div>
          <div class="fc-title">${article.title}</div>
          <div class="fc-desc">${article.desc}</div>
          <div class="fc-meta"><span>${article.author}</span><span class="fc-dot">·</span><span>${article.read}</span></div>
        </div>
      </article>`).join('');
}

function buildLower() {
  const list = $('#LIST_ARTS');
  const side = $('#SB_ITEMS');
  if (list) {
    list.innerHTML = ARTICLES.map((article) => `
      <article class="la-row" data-read="${article.id}">
        <div class="la-num">${articleVisual(article)}</div>
        <div>
          <div class="la-cat">${article.cat}</div>
          <div class="la-title">${article.title}</div>
          <div class="la-meta">${article.author} · ${article.read}</div>
        </div>
      </article>`).join('');
  }
  if (side) {
    side.innerHTML = ARTICLES.slice(0, 5).map((article) => `
      <article class="sb-item" data-read="${article.id}">
        <div class="sb-cat">${article.cat}</div>
        <div class="sb-title">${article.title}</div>
        <div class="sb-time">${article.date} · ${article.read}</div>
      </article>`).join('');
  }
}

function buildCategories() {
  const row = $('#CATS_ROW');
  if (!row) return;
  row.innerHTML = CATS_DATA.map((category) => `
    <a class="cat-item" href="feed.html">
      <span class="cat-icon">${category.icon}</span>
      <span class="cat-name">${category.name}</span>
      <span class="cat-count">${category.count} материалов</span>
    </a>`).join('');
}

function buildFeed() {
  const filters = $('#FEED_FILTERS');
  const main = $('#FEED_MAIN');
  const side = $('#FEED_SIDE');
  const pagination = $('#PAGINATION');
  if (!filters || !main) return;
  filters.innerHTML = FEED_CATS.map((item) => `<button class="ff-btn${feedFilter === item.v ? ' on' : ''}" data-feed-filter="${item.v}">${item.l}</button>`).join('<span class="ff-sep"></span>');
  const articles = feedFilter === 'all' ? ARTICLES : ARTICLES.filter((article) => article.kind === feedFilter);
  main.innerHTML = articles.map((article) => `
    <article class="feed-art" data-read="${article.id}">
      <div>
        <div class="fa-cat">${article.cat}</div>
        <div class="fa-title">${article.title}</div>
        <div class="fa-desc">${article.desc}</div>
        <div class="fa-meta"><span>${article.author}</span><span class="meta-dot">·</span><span>${article.date}</span><span class="meta-dot">·</span><span>${article.read}</span></div>
      </div>
      <div class="fa-img">${articleVisual(article)}</div>
    </article>`).join('') || '<div class="empty-state">Материалов в этой категории пока нет</div>';
  if (side) {
    side.innerHTML = `
      <div class="fs-widget"><div class="fs-wh">Популярное</div>${ARTICLES.slice(0, 4).map((article) => `<article class="sb-item" data-read="${article.id}"><div class="sb-cat">${article.cat}</div><div class="sb-title">${article.title}</div><div class="sb-time">${article.read}</div></article>`).join('')}</div>
      <div class="fs-widget"><div class="fs-wh">Категории</div>${CATS_DATA.map((category) => `<div class="sb-item"><div class="sb-cat">${category.icon} ${category.name}</div><div class="sb-time">${category.count} материалов</div></div>`).join('')}</div>`;
  }
  if (pagination) {
    pagination.innerHTML = '<button class="pg-btn">←</button><button class="pg-btn on">1</button><button class="pg-btn">2</button><button class="pg-btn">→</button>';
  }
}

function buildStore() {
  const cats = $('#STORE_CATS');
  const promos = $('#STORE_PROMOS');
  if (cats) {
    cats.innerHTML = STORE_CATS.map((item) => `<button class="sc-btn${storeFilter === item.v ? ' on' : ''}" data-store-filter="${item.v}">${item.l}</button>`).join('') + '<div class="sc-sep"></div><div class="sc-count" id="SC_COUNT"></div>';
  }
  if (promos) {
    promos.innerHTML = PROMOS.map((promo) => `
      <article class="promo-card ${promo.cls}">
        <div><span class="pc-badge">${promo.badge}</span><div class="pc-title">${promo.title}</div><div class="pc-sub">${promo.sub}</div></div>
        <div class="pc-arr">→</div>
      </article>`).join('');
  }
  renderProducts();
}

function renderProducts() {
  const grid = $('#PROD_GRID');
  if (!grid) return;
  let items = storeFilter === 'all' ? PRODUCTS : PRODUCTS.filter((product) => product.cat === storeFilter);
  if (storeSearch) {
    const query = storeSearch.toLowerCase();
    items = items.filter((product) => `${product.name} ${product.desc}`.toLowerCase().includes(query));
  }
  const count = $('#SC_COUNT');
  if (count) count.textContent = `${items.length} товаров`;
  grid.innerHTML = items.map((product) => `
    <article class="prod-card" data-product="${product.id}">
      ${product.st ? `<div class="pc-sticker ${product.st}">${product.stl}</div>` : ''}
      <div class="pc-inner">
        <div class="pc-icon">${product.icon}</div>
        <div class="pc-type">${product.type}</div>
        <div class="pc-name">${product.name}</div>
        <div class="pc-desc">${product.desc}</div>
        <div class="pc-footer">
          <div>
            <div><span class="pc-price">${product.price}</span>${product.was ? `<span class="pc-was">${product.was}</span>` : ''}</div>
            <div class="pc-rating"><span class="pc-rating-star">★</span> ${product.rating} · ${product.rev.toLocaleString()}</div>
          </div>
          <button class="btn-pc" data-product="${product.id}">Купить</button>
        </div>
      </div>
    </article>`).join('') || '<div class="empty-state">Ничего не найдено</div>';
}

function buildAbout() {
  const skills = $('#AB_SKILLS');
  const stats = $('#AB_STATS');
  const projects = $('#AB_PROJS');
  if (skills) {
    skills.innerHTML = ['Технологии', 'Бизнес', 'Путешествия', 'Культура', 'Стиль жизни', 'Магазин'].map((skill) => `<span class="ab-skill">${skill}</span>`).join('');
  }
  if (stats) {
    stats.innerHTML = [
      { n: '0', l: 'Политики, войн и межнациональных споров' },
      { n: '5+', l: 'Тем: технологии, бизнес, культура, travel, lifestyle' },
      { n: '3ч', l: 'Гарантированный ответ на партнерские предложения' },
      { n: '24/7', l: 'Комфортное чтение на любых устройствах' }
    ].map((item) => `<div class="ab-stat"><div class="ab-stat-n">${item.n}</div><div class="ab-stat-l">${item.l}</div></div>`).join('');
  }
  if (projects) {
    projects.innerHTML = [
      { icon: '▶', name: 'Медийные форматы', desc: 'Видео, подборки и интерактивные элементы для более живой подачи.', tag: 'Контент', span: false },
      { icon: '◆', name: 'Премиум-доступ', desc: 'Закрытые материалы и премиум-контент для подписчиков.', tag: 'Private', span: false },
      { icon: '✦', name: 'Сообщество', desc: 'Расширение аудитории вокруг современных тенденций, вдохновения и качественной аналитики.', tag: 'Рост', span: true }
    ].map((project) => `<article class="ab-proj${project.span ? ' span2' : ''}"><div class="ap-tag">${project.tag}</div><div class="ap-icon">${project.icon}</div><div class="ap-name">${project.name}</div><div class="ap-desc">${project.desc}</div></article>`).join('');
  }
}

function setupPrivate() {
  const form = $('#PRIVATE_FORM');
  const gate = $('#PRIVATE_GATE');
  const content = $('#PRIVATE_CONTENT');
  if (!form || !gate || !content) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = $('#PRIVATE_PASS')?.value.trim();
    if (value && value.length >= 4) {
      gate.hidden = true;
      content.hidden = false;
      toast('◆ Доступ открыт в этой сессии');
    } else {
      toast('⚠ Введите пароль доступа');
    }
  });
}

function openProductModal(id) {
  const product = PRODUCTS.find((item) => item.id === Number(id));
  const modal = $('#PROD_MODAL');
  const content = $('#MODAL_CONTENT');
  if (!product || !modal || !content) return;
  content.innerHTML = `
    <div class="modal-visual"><div class="modal-vis-icon">${product.icon}</div></div>
    <div class="modal-body">
      <div class="modal-type">${product.type}</div>
      <div class="modal-name">${product.name}</div>
      <div class="modal-stars"><span class="modal-stars-s">${'★'.repeat(Math.floor(product.rating))}</span><span>${product.rating} · ${product.rev.toLocaleString()} заказов</span></div>
      <div class="modal-desc">${product.desc}</div>
      <div class="modal-feats">${product.feats.map((feature) => `<div class="mf"><span class="mf-dot"></span>${feature}</div>`).join('')}</div>
      <div class="modal-price-row"><span class="modal-price">${product.price}</span>${product.was ? `<span class="modal-was">${product.was}</span>` : ''}</div>
      <a class="btn-modal-buy" href="mailto:hello@pereuloq.ru?subject=${encodeURIComponent(product.name)}">Contact Seller →</a>
      <a class="btn-modal-wish" href="mailto:hello@pereuloq.ru?subject=${encodeURIComponent('Buy ' + product.name)}">Buy</a>
    </div>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function openRead(id) {
  const article = ARTICLES.find((item) => item.id === Number(id));
  const overlay = $('#READ_OV');
  const meta = $('#READ_META');
  const content = $('#READ_CONTENT');
  if (!article || !overlay || !meta || !content) {
    if (article?.href) window.location.href = article.href;
    return;
  }
  meta.innerHTML = `<span>${article.author}</span><span class="read-dot">·</span><span>${article.date}</span><span class="read-dot">·</span><span>${article.read}</span>`;
  content.innerHTML = `
    <div class="r-cat">${article.cat}</div>
    <h1 class="r-title">${article.title}</h1>
    <div class="r-byline"><span>${article.author}</span><span class="read-dot">·</span><span>${article.date}</span><span class="read-dot">·</span><span>${article.read} чтения</span></div>
    <div class="r-cover">${articleVisual(article)}</div>
    <div class="r-body">${article.body}</div>
    <div class="r-share">
      <a class="r-share-btn" href="${article.href}">Открыть страницу</a>
      <button class="r-share-btn" data-copy="${article.href}">Копировать ссылку</button>
    </div>`;
  overlay.classList.add('open');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  readOpen = true;
}

function closeRead() {
  const overlay = $('#READ_OV');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  readOpen = false;
  const bar = $('#READ_BAR');
  if (bar) bar.style.width = '0%';
}

function updateReadProgress() {
  const overlay = $('#READ_OV');
  const bar = $('#READ_BAR');
  if (!overlay || !bar || !readOpen) return;
  const max = Math.max(1, overlay.scrollHeight - overlay.clientHeight);
  bar.style.width = `${(overlay.scrollTop / max) * 100}%`;
}

function toast(message) {
  const toastEl = $('#TOAST');
  if (!toastEl) return;
  const icon = $('#T_I');
  const text = $('#T_M');
  const match = message.match(/^(\S{1,4})\s+([\s\S]+)/);
  if (icon) icon.textContent = match ? match[1] : '·';
  if (text) text.textContent = match ? match[2] : message;
  toastEl.classList.add('on');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toastEl.classList.remove('on'), 3200);
}

function setupEvents() {
  document.addEventListener('click', (event) => {
    const read = event.target.closest('[data-read]');
    const product = event.target.closest('[data-product]');
    const feedButton = event.target.closest('[data-feed-filter]');
    const storeButton = event.target.closest('[data-store-filter]');
    const closeReadButton = event.target.closest('[data-close-read]');
    const closeModalButton = event.target.closest('[data-close-modal]');
    const copyButton = event.target.closest('[data-copy]');

    if (read) openRead(read.dataset.read);
    if (product) openProductModal(product.dataset.product);
    if (feedButton) {
      feedFilter = feedButton.dataset.feedFilter;
      buildFeed();
    }
    if (storeButton) {
      storeFilter = storeButton.dataset.storeFilter;
      buildStore();
    }
    if (closeReadButton) closeRead();
    if (closeModalButton) closeModal(closeModalButton.dataset.closeModal);
    if (copyButton) {
      navigator.clipboard?.writeText(new URL(copyButton.dataset.copy, location.href).href);
      toast('✓ Ссылка скопирована');
    }
    if (event.target.id === 'PROD_MODAL') closeModal('PROD_MODAL');
  });

  $('#STORE_SEARCH')?.addEventListener('input', (event) => {
    storeSearch = event.target.value;
    renderProducts();
  });
  $('#NL_FORM')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = $('#NL_EMAIL');
    if (input?.value.includes('@')) {
      toast('✦ Вы в списке. Добро пожаловать.');
      input.value = '';
    } else {
      toast('⚠ Введите корректный email');
    }
  });
  $('#READ_OV')?.addEventListener('scroll', updateReadProgress, { passive: true });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (readOpen) closeRead();
      closeModal('PROD_MODAL');
      $('#MOBILE_PANEL')?.classList.remove('open');
    }
  });
}

function initPage() {
  setActiveNav();
  setupCursor();
  setupHeader();
  setupTheme();
  setupEvents();
  buildSlider();
  buildTicker();
  buildFeatured();
  buildLower();
  buildCategories();
  buildFeed();
  buildStore();
  buildAbout();
  setupPrivate();
}

window.goPage = goPage;
window.addEventListener('DOMContentLoaded', initPage);
