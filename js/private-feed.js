// Private feed: data + renderer (Twitter-like)
(function(){
  // Edit posts below: newest first or any order — will be sorted by date desc
  // date: ISO 8601 string; text: string; images: optional array of image URLs
  const POSTS = [
    {
      id: 'p-2025-09-22-1',
      date: '2025-09-22T10:15:00+03:00',
      text: 'Нашел бесплатную альтернативу Wallpaper Engine. Wallpaper Reactor ставит живые и статичные обои, дает гибкие настройки и синхронизирует выбор между Windows Android и macOS. Уже поставил на обе машины дома и тестирую подборки дня. Ссылка: https://wallpaperreactor.app',
      images: []
    },
    {
      id: 'p-2025-09-21-2',
      date: '2025-09-21T23:00:00+03:00',
      text: 'Режу дневной кофе. Отказ от второй чашки после обеда за неделю вернул мне плотный сон. Аденозин растет без помех и я сплю спокойнее плюс дольше держусь в быстром сне. Утром записываю сны почти без потерь и чувствую как тело восстанавливается быстрее. Напоминание себе: заканчиваю с кофе минимум за восемь часов до сна и проверяю напитки на скрытый кофеин.',
      images: ['https://ichef.bbci.co.uk/images/ic/1920xn/p0m3v8dv.jpg.webp']
    },
    {
      id: 'p-2025-09-21-1',
      date: '2025-09-21T19:30:00+03:00',
      text: 'Утром пришла новость про пошлину сто тысяч долларов на новые визы H1B и индийские с китайскими специалистами массово покупали обратные билеты. Один инженер из Нагпура потратил около восьми тысяч долларов на перелеты чтобы успеть до дедлайна. Белый дом через сутки пояснил что действующих держателей виз не тронут, но паника уже стоила людям денег и нервов. Кажется рискованным решением, потому что без азиатских разработчиков американское IT через три года увидит дефицит кадров. Любая поездка за пределы США теперь воспринимается как риск.',
      images: ['https://ichef.bbci.co.uk/news/1536/cpsprodpb/1925/live/ede34c00-96c7-11f0-aaa5-6b36db6f2a24.jpg.webp']
    },
    {
      id: 'p-2025-09-18-1',
      date: '2025-09-18T22:40:00+03:00',
      text: 'Смотрю документалку про Гиру — крошечную, но самую смертоносную кошку на планете. Её отслеживают радиоошейником и тепловизорами, поэтому видно каждую ночную вылазку: за одну смену она наматывает до 20 миль по пустыне, скользя в песке и считывая малейшие шорохи.\n\nРацион в режиме «что найдётся»: саранча, песчанки, мелкие птицы. Ключ — не сила, а точность. 60% успешных атак — рекорд среди кошачьих, и это чистая инженерия поведения. Видео: https://youtu.be/nl8o9PsJPAQ?si=sSECIQ8H0cLuh_-T\n\nДля меня это важный тумблер: цельность режима + системность действий дают результат даже без гигантских ресурсов. Беру в копилку для продакшена.',
      images: ['https://i.ytimg.com/vi/nl8o9PsJPAQ/maxresdefault.jpg']
    }
  ];

  const timeline = document.getElementById('timeline');
  const sentinel = document.getElementById('sentinel');
  const loader = document.getElementById('loader');
  const aboutPane = document.getElementById('aboutPane');
  if (!timeline) return;

  const fmtDate = (iso) => {
    const d = new Date(iso);
    try {
      return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(d);
    } catch {
      return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  };

  const escapeHTML = (s) => s.replace(/[&<>\"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const autoLink = (s) => s
    // URLs
    .replace(/(https?:\/\/[^\s]+)(?=\s|$)/g, '<a href="$1" target="_blank" rel="noopener" class="underline decoration-red-500/60 underline-offset-2">$1</a>')
    // Hashtags
    .replace(/(^|\s)#([\p{L}0-9_]+)(?=\s|$)/gu, '$1<a href="#" class="text-red-600">#$2</a>')
    // Mentions
    .replace(/(^|\s)@([A-Za-z0-9_]+)(?=\s|$)/g, '$1<a href="#" class="text-red-600">@$2</a>');

  const imageGrid = (imgs=[]) => {
    if (!imgs.length) return '';
    if (imgs.length === 1) {
      return `<img class="mt-3 rounded-2xl border border-neutral-200 dark:border-neutral-800" src="${imgs[0]}" alt="" loading="lazy" decoding="async">`;
    }
    const three = imgs.length === 3;
    const items = imgs.map((src, i) => {
      const span = three && i === 2 ? ' col-span-2' : '';
      return `<img class="w-full h-auto rounded-2xl border border-neutral-200 dark:border-neutral-800${span}" src="${src}" alt="" loading="lazy" decoding="async">`;
    }).join('');
    return `<div class="mt-3 grid grid-cols-2 gap-3">${items}</div>`;
  };

  const postHTML = (p) => {
    const text = autoLink(escapeHTML(p.text)).replace(/\n/g, '<br>');
    const dateLabel = fmtDate(p.date);
    return `
      <article class="post rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 shadow-soft p-5 md:p-6">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 text-[12px] text-neutral-500">
            <span class="font-semibold text-neutral-800 dark:text-neutral-200">Almir</span>
            <span>@pereuloq</span>
            <span>·</span>
            <time datetime="${p.date}">${dateLabel}</time>
          </div>
          <div class="mt-2 text-[15px] md:text-[16px] leading-7 text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap">${text}</div>
          ${imageGrid(p.images)}
        </div>
      </article>
    `;
  };

  let initialized = false;
  let loaded = 0;
  const perPage = 5;
  const sorted = POSTS.slice().sort((a,b) => new Date(b.date) - new Date(a.date));
  let current = sorted.slice();
  let mode = 'all'; // 'all' | 'media' | 'about'

  const renderMore = () => {
    if (mode !== 'all') return; // infinite scroll only for full feed
    if (loaded >= current.length) return;
    loader?.classList.remove('hidden');
    const next = current.slice(loaded, loaded + perPage);
    const frag = document.createDocumentFragment();
    next.forEach(p => {
      const div = document.createElement('div');
      div.innerHTML = postHTML(p);
      // timeline expects direct children for divide-y to work
      frag.appendChild(div.firstElementChild);
    });
    timeline.appendChild(frag);
    loaded += next.length;
    loader?.classList.add('hidden');
    if (loaded >= current.length && sentinel) sentinel.remove();
  };

  const renderAllAtOnce = () => {
    // used for media mode
    timeline.innerHTML = '';
    const frag = document.createDocumentFragment();
    current.forEach(p => {
      const div = document.createElement('div');
      div.innerHTML = postHTML(p);
      frag.appendChild(div.firstElementChild);
    });
    timeline.appendChild(frag);
  };

  const setTabActive = (name) => {
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-tab') === name);
    });
  };

  const applyMode = (name) => {
    mode = name;
    setTabActive(name);
    if (aboutPane) aboutPane.classList.toggle('hidden', name !== 'about');
    timeline.classList.toggle('hidden', name === 'about');
    if (name === 'all') {
      current = sorted.slice();
      timeline.innerHTML = '';
      loaded = 0;
      // re-add sentinel if removed
      if (!document.getElementById('sentinel')) {
        const s = document.createElement('div');
        s.id = 'sentinel';
        s.className = 'h-8';
        timeline.after(s);
      }
      renderMore();
    } else if (name === 'media') {
      current = sorted.filter(p => Array.isArray(p.images) && p.images.length);
      renderAllAtOnce();
      // hide loader and remove sentinel in media mode
      loader?.classList.add('hidden');
      document.getElementById('sentinel')?.remove();
    }
  };

  const init = () => {
    if (initialized) return;
    initialized = true;
    // Apply header stats
    const countEl = document.getElementById('postCount');
    const lastEl = document.getElementById('lastUpdate');
    if (countEl) countEl.textContent = String(sorted.length);
    if (lastEl && sorted[0]) {
      try {
        lastEl.textContent = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date(sorted[0].date));
      } catch {
        lastEl.textContent = new Date(sorted[0].date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
      }
    }
    renderMore();
    // Tabs
    document.querySelector('[data-tab="all"]')?.addEventListener('click', () => applyMode('all'));
    document.querySelector('[data-tab="media"]')?.addEventListener('click', () => applyMode('media'));
    document.querySelector('[data-tab="about"]').addEventListener?.('click', () => applyMode('about'));
    if (sentinel) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) renderMore();
        });
      }, { rootMargin: '400px 0px 400px 0px' });
      io.observe(sentinel);
    }
  };

  const isUnlocked = () => localStorage.getItem('privateUnlocked') === '1';

  // Initialize when unlocked or immediately if already unlocked
  if (isUnlocked()) {
    // small delay to allow feed un-blur
    setTimeout(init, 0);
  }
  window.addEventListener('private:unlocked', init, { once: false });
})();
