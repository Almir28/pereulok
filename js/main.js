const routes = {
  home: 'index.html',
  feed: 'feed.html',
  politics: 'politics.html',
  sport: 'sport.html',
  worldSport: 'world-sport.html',
  store: 'store.html',
  about: 'about.html',
  private: 'private.html'
};

const runtimeTranslations = {
  ru: {
    searchPlaceholder: 'Поиск по журналу',
    searchEmpty: 'Ничего не найдено',
    orderCopied: 'Заказ скопирован. Отправьте его продавцу в Telegram',
    linkCopied: 'Ссылка скопирована',
    subscribed: 'Вы подписаны. Добро пожаловать.',
    emailInvalid: 'Введите корректный email'
  },
  en: {
    searchPlaceholder: 'Search the journal',
    searchEmpty: 'Nothing found',
    orderCopied: 'Order copied. Send it to the seller in Telegram',
    linkCopied: 'Link copied',
    subscribed: 'You are subscribed. Welcome.',
    emailInvalid: 'Enter a valid email'
  }
};

const i18n = {
  lang: () => window.PereuloqMetaGenerator?.currentLang?.() || (((document.documentElement.lang || '').toLowerCase().startsWith('en') || location.pathname.startsWith('/en/')) ? 'en' : 'ru'),
  t: (key) => window.PereuloqMetaGenerator?.t?.(key) || runtimeTranslations[i18n.lang()]?.[key] || runtimeTranslations.ru[key] || key
};

const ARTICLES = [
  {
    id: 31,
    cat: "Технологии",
    kind: "news",
    title: "Во Флориде взялись за Sam Altman — против OpenAI начинается давление со стороны властей",
    desc: "Власти Флориды и республиканские прокуроры усиливают давление на OpenAI и Sam Altman из-за возможных конфликтов интересов, безопасности AI и влияния компании.",
    author: "Almir Khialov",
    date: "13 мая 2026",
    read: "5 мин",
    img: "https://images.openai.com/static-rsc-4/Z2GbtRKdJYFbv727WWYhSQNwTTWRN8tt0mfDcM1bLaX6X818uJGKDni3JducLc0SzaaqgB2GKswHXWk1pWE5vqDE1RzM5em9CMEZv6_8MpTayX89eUbfpHCdat-iHA8MV4rIjZeV_NACgigALwH_SnYxwNNVtP4mZfbtT6a43A40rmCpowJJj8IEohySi8cK?purpose=fullsize",
    bg: "gb2",
    href: "posts/florida-openai-altman-pressure.html",
    body: `<p>Во Florida власти начали серьезное давление на OpenAI и Sam Altman. Генеральный прокурор штата поддержал расследование возможных конфликтов интересов вокруг Altman на фоне подготовки OpenAI к потенциальному IPO.</p><h2>В чем обвиняют Altman</h2><p>Республиканские прокуроры нескольких штатов, включая Флориду, требуют проверки личных инвестиций Sam Altman, связей OpenAI с компаниями, в которые он вложился, и возможного self-dealing.</p><p>Особое внимание вызвали инвестиции Altman в AI-инфраструктуру, ядерную энергетику, космические стартапы и компании, сотрудничающие с OpenAI.</p><h2>Почему именно Флорида</h2><p>Во Флориде усиливается давление на AI-компании. Власти штата хотят усилить контроль над AI, безопасностью моделей и влиянием AI-компаний на общество.</p><h2>Что происходит параллельно</h2><p>Sam Altman продолжает выступать в суде против Elon Musk. Musk обвиняет OpenAI в отходе от первоначальной миссии, коммерциализации компании и концентрации слишком большой власти вокруг Altman.</p><h2>Почему это важно</h2><p>Еще недавно AI-компании воспринимались как новые технологические стартапы. Сейчас правительства начинают смотреть на них как на инфраструктуру, потенциальную угрозу и силу, влияющую на экономику, безопасность и политику.</p><h2>Мнение Pereuloq</h2><p>Эпоха, когда AI развивался почти без контроля, постепенно заканчивается. Теперь крупнейшие AI-компании будут находиться под тем же вниманием, что банки, энергетика и Big Tech.</p>`
  },
  {
    id: 30,
    cat: 'Технологии',
    kind: 'news',
    title: 'Apple готовит крупнейшее AI-обновление iPhone — что покажут на WWDC 2026',
    desc: 'Apple готовит масштабное обновление Apple Intelligence для iOS: новая Siri, офлайн-AI, умные сводки и системный персональный помощник.',
    author: 'Almir Khialov',
    date: '13 мая 2026',
    read: '5 мин',
    img: 'https://images.openai.com/static-rsc-4/2GVBZ87VNjKk9T3ssdouDf7JqvmUthoKAYHgSkwQOZ5vBepwfeipkU5gdvxcTgVvsalANS8y9MI23szgSmKXc1FV71qDV--8Gr1lf8EcajPjBcpY1aftsEXu4kbbw0nJLbRVENM45UTAXT9ZSHMnx1qHk9ARfT8w3QIio0EXzUJhQxw1Er6x42wV34__1njN?purpose=fullsize',
    bg: 'gb1',
    href: 'posts/apple-ai-wwdc-2026.html',
    body: `<p>Пока весь рынок обсуждает OpenAI и новые AI-видео, Apple готовит то, что может полностью изменить iPhone уже в этом году.</p>
          <p>По информации инсайдеров и аналитиков индустрии, на WWDC 2026 компания покажет масштабное обновление Apple Intelligence, которое станет центром новой iOS. Главная цель Apple — сделать AI незаметным, быстрым и встроенным прямо в повседневные действия пользователя.</p>
          <h2>Что может появиться</h2>
          <ul><li>Siri нового поколения с почти живым общением</li><li>Автоматическое редактирование фото и видео</li><li>AI-сводки уведомлений и сообщений</li><li>Умная работа батареи через машинное обучение</li><li>Генерация текста внутри Notes, Mail и Safari</li><li>Персональный AI-помощник прямо в системе</li></ul>
          <p>Инсайдеры также сообщают, что Apple активно работает над офлайн-AI, чтобы часть функций работала даже без интернета. Это может стать главным отличием компании от конкурентов.</p>
          <h2>Почему это важно</h2>
          <p>Сегодня AI — самая быстрорастущая категория интернета. Но большинство сервисов работают отдельно: приложения, сайты или подписки. Apple хочет встроить искусственный интеллект прямо в iPhone так, чтобы пользователь почти не замечал его работу, но чувствовал результат каждый день.</p>
          <h2>Что это значит для пользователей</h2>
          <p>Для обычных людей это меньше ручных действий, более быстрый сценарий работы, умнее iPhone и новые функции без необходимости устанавливать десятки приложений. Для индустрии — новый этап AI-гонки между Apple, OpenAI, Google и Microsoft.</p>
          <h2>Мнение Pereuloq</h2>
          <p>Apple редко приходит первой. Но когда компания выходит на рынок позднее, она часто меняет саму привычку использования технологии. Именно поэтому WWDC 2026 может стать одним из самых важных событий года для всей tech-индустрии.</p>`
  },
  {
    id: 29,
    cat: 'Технологии',
    kind: 'news',
    title: 'OpenAI запустила Daybreak — AI теперь сам ищет уязвимости в коде',
    desc: 'OpenAI представила Daybreak — AI-сервис для автоматического поиска уязвимостей, проверки зависимостей и предложения исправлений в коде.',
    author: 'Almir Khialov',
    date: '13 мая 2026',
    read: '4 мин',
    img: 'https://images.openai.com/static-rsc-4/UUa5GZta8TGs3yr-0a-T3rOFyCQ9Qg2XQyiuyuLPeN-_iUZBL0L6MwwdnDDHMdFSgRR_AH06Bxwdh4V-gtItXO7mGaaDw1CF2gEwMf3uTTnzBazT4H3qU57eCzHQHr_HixTvTjGh7J6KeomjnnbBMiZ-FY5OMcnuQLxqpoxI3C6uKSWp1LI_GgVGR1NDXvu5?purpose=fullsize',
    bg: 'gb2',
    href: 'posts/openai-daybreak-ai-security.html',
    body: `<p>OpenAI представила новый AI-сервис Daybreak, который автоматически ищет уязвимости в программном обеспечении еще до того, как ими воспользуются злоумышленники.</p>
          <p>Проект основан на новой модели GPT-5.4-Cyber и уже привлек внимание крупных IT-компаний и специалистов по безопасности.</p>
          <h2>Что умеет Daybreak</h2>
          <ul><li>находит потенциальные уязвимости</li><li>проверяет зависимости</li><li>моделирует возможные атаки</li><li>предлагает исправления</li><li>помогает закрывать проблемы еще на этапе создания продукта</li></ul>
          <h2>Почему это важно</h2>
          <p>Мир все больше зависит от облачных сервисов, банковских приложений, AI-систем и цифровой инфраструктуры. При этом количество кибератак растет каждый год.</p>
          <p>Раньше поиск уязвимостей занимал недели или месяцы. Теперь AI начинает делать это автоматически и намного быстрее.</p>
          <h2>Что это меняет для индустрии</h2>
          <p>Если такие системы станут стандартом, разработка ПО ускорится, компании будут выпускать более безопасные продукты, а роль AI в программировании станет еще сильнее. Но те же технологии могут использоваться злоумышленниками, поэтому начинается новая гонка: AI для защиты против AI для атак.</p>
          <h2>Мнение Pereuloq</h2>
          <p>Раньше AI помогал писать код. Теперь AI начинает охранять сам интернет. И это может стать одной из самых важных технологических трансформаций ближайших лет.</p>`
  },
  {
    id: 28,
    cat: 'Стиль',
    kind: 'news',
    title: 'Swatch x Audemars Piguet взорвали интернет — но есть неожиданный поворот',
    desc: 'Swatch и Audemars Piguet показали Royal Pop — яркую Pop Art-коллекцию pocket watch вместо ожидаемой доступной версии Royal Oak.',
    author: 'Almir Khialov',
    date: '13 мая 2026',
    read: '5 мин',
    img: 'https://images.openai.com/static-rsc-4/A0Ta7PvhrGNxGHZlJKvOZyJ1WkWXbNpz1Dw12avEFjfv9YNfdd4GD57iPe3uzE_xuhntOvF6FpBQ3_gao1r1HKtiOyc9aNwSViqByB83qYCVFL2t8njjH827XbR8xsXHikSk38Op7Axgsk92YC5U5w26z56e2d8Uxpst5hpg4gIkCThEzbIFfVDf67r-xHoV?purpose=fullsize',
    bg: 'gb3',
    href: 'posts/swatch-audemars-piguet-royal-pop.html',
    body: `<p>Swatch официально представила долгожданную коллаборацию с Audemars Piguet — и интернет оказался в шоке. Все ожидали доступную версию легендарных Royal Oak, но компании выпустили премиальные pocket watch в стиле Pop Art под названием Royal Pop.</p>
          <h2>Что показали</h2>
          <p>Коллекция состоит из восьми ярких моделей с восьмиугольным дизайном AP, элементами Royal Oak, Bioceramic-корпусом и механизмом SISTEM51 с ручным заводом.</p>
          <p>Часы можно носить на шее, цеплять на одежду, сумку или использовать как заметный аксессуар.</p>
          <h2>Интернет ожидал другое</h2>
          <p>Соцсети были переполнены AI-рендерами MoonSwatch в стиле Royal Oak, поэтому многие ждали доступную версию AP Royal Oak за несколько сотен долларов. Но Swatch пошла другим путем.</p>
          <h2>Почему это все равно огромная новость</h2>
          <p>После феномена MoonSwatch рынок понял: люди готовы покупать не только люкс, но и часть легенды. Swatch продолжает превращать luxury-watch культуру в массовое интернет-событие.</p>
          <h2>Мнение Pereuloq</h2>
          <p>Swatch снова делает то, что умеет лучше всех: превращает часы из просто аксессуара в поп-культурный момент. И похоже, в 2026 году hype вокруг часов снова стал частью большого интернета.</p>`
  },
  {
    id: 25,
    cat: 'Финансы',
    kind: 'video',
    title: 'Рамит Сетхи — о деньгах, миллениалах и помощи детям',
    desc: 'Финансовый эксперт Ramit Sethi объясняет, почему молодым поколениям тяжелее строить стабильность и как говорить о деньгах без стыда.',
    author: 'Pereuloq',
    date: '11 мая 2026',
    read: '7 мин',
    img: 'https://static01.nyt.com/images/2026/05/17/magazine/17mag-interview-sethi-03/17mag-interview-sethi-03-superJumbo.jpg?quality=75&auto=webp',
    bg: 'gb6',
    href: 'posts/ramit-sethi-money-millennials.html',
    body: `<p>Финансовый эксперт Ramit Sethi считает, что миллениалы и Gen Z живут в другой экономической реальности, чем поколение их родителей.</p><p>Для него богатство - это не только баланс на счете, а свобода строить жизнь вокруг того, что действительно важно.</p><h3>Главная мысль</h3><p>Сетхи советует семьям говорить о деньгах регулярно, честно считать ключевые финансовые показатели и помогать детям раньше, если такая возможность есть.</p><p>Деньги, по его словам, должны быть не источником стыда, а инструментом для более спокойной и осознанной жизни.</p>`
  },
  {
    id: 24,
    cat: 'Книги',
    kind: 'news',
    title: '7 новых книг недели, которые рекомендует Pereuloq',
    desc: 'Исторические романы, триллеры, биографии, true crime и литературная проза в одной книжной подборке недели.',
    author: 'Pereuloq',
    date: '11 мая 2026',
    read: '7 мин',
    img: 'https://static01.nyt.com/images/2025/11/15/multimedia/calamity-clubjpg/calamity-clubjpg-superJumbo.jpg?quality=75&auto=webp',
    bg: 'gb5',
    href: 'posts/seven-books-week-pereuloq.html',
    body: `<p>Редакция Pereuloq собрала самые интересные книжные новинки недели: исторические романы, психологические триллеры, биографии, true crime и литературную прозу.</p><p>В подборке есть масштабные исторические драмы, семейные истории, политические биографии и романтическое фэнтези.</p><h3>Главные книги недели</h3><p>Среди заметных новинок - The Calamity Club, John of John, The Family Man, Five, The Successor, Stay for a Spell и The Hill.</p><p>Подборка получилась особенно разнообразной: многие из этих книг уже называют потенциальными литературными хитами 2026 года.</p>`
  },
  {
    id: 23,
    cat: 'Музыка',
    kind: 'news',
    title: 'Билли Айлиш и Джеймс Кэмерон сняли концертный фильм в 3D',
    desc: 'Как создавался Hit Me Hard and Soft: The Tour Live in 3D — один из самых необычных музыкальных проектов года.',
    author: 'Pereuloq',
    date: '11 мая 2026',
    read: '7 мин',
    img: 'https://static01.nyt.com/images/2026/05/05/multimedia/05cul-eilish-walkup-vchk/05cul-eilish-walkup-vchk-superJumbo.jpg?quality=75&auto=webp',
    bg: 'gb4',
    href: 'posts/billie-eilish-james-cameron-3d.html',
    body: `<p>Когда мать Billie Eilish сказала дочери, что режиссер James Cameron хочет снять о ней 3D-концертный фильм, певица сначала не поверила.</p><p>Так появился проект Billie Eilish — Hit Me Hard and Soft: The Tour (Live in 3D), который выходит в кинотеатрах и IMAX 9 мая.</p><h3>17 камер и эффект присутствия</h3><p>Фильм был снят во время концертов певицы в Манчестере летом 2025 года. James Cameron установил 17 движущихся камер вокруг сцены, чтобы передать масштаб шоу и близость певицы к аудитории.</p><p>Это не просто концертная запись, а попытка показать эмоциональную атмосферу современного поп-шоу изнутри.</p>`
  },
  {
    id: 22,
    cat: 'Кино',
    kind: 'news',
    title: 'Netflix, фридайвинг и смерть Одри Местр',
    desc: 'Почему суд не поверил легенде Франсиско Феррераса после иска к Netflix из-за фильма No Limit.',
    author: 'Pereuloq',
    date: '11 мая 2026',
    read: '7 мин',
    img: 'https://static01.nyt.com/images/2026/05/17/magazine/17mag-dive-06/17mag-dive-06-superJumbo-v2.jpg?quality=75&auto=webp',
    bg: 'gb2',
    href: 'posts/netflix-freediving-audrey-mestre.html',
    body: `<p>Франсиско Феррерас, один из самых известных фридайверов в истории, подал в суд на Netflix после выхода французской драмы No Limit.</p><p>Он считал, что фильм фактически обвинил его в убийстве жены - легендарной фридайверши Одри Местр, погибшей во время рекордного погружения в 2002 году.</p><h3>Почему суд не поверил иску</h3><p>Суд решил, что художественный герой фильма не обязан восприниматься как точная копия Феррераса, а сама история спортсмена давно окружена противоречивыми мифами.</p><p>Этот спор оказался не только о клевете, но и о том, как реальная трагедия, кино и личная легенда смешиваются в публичной памяти.</p>`
  },
  {
    id: 21,
    cat: 'Здоровье',
    kind: 'news',
    title: 'Что такое дисморфофобия',
    desc: 'Почему человек может болезненно ненавидеть свою внешность даже без видимых причин и как лечится body dysmorphic disorder.',
    author: 'Pereuloq',
    date: '11 мая 2026',
    read: '7 мин',
    img: 'https://static01.nyt.com/images/2026/05/12/well/06WELL-PSYCH101-BDD-image/06WELL-PSYCH101-BDD-image-superJumbo-v3.jpg?quality=75&auto=webp',
    bg: 'gb3',
    href: 'posts/body-dysmorphic-disorder.html',
    body: `<p>Дисморфофобия, или body dysmorphic disorder, считается тяжелым психическим расстройством, при котором человек болезненно фиксируется на воображаемых или едва заметных дефектах внешности.</p><p>Это состояние может разрушать повседневную жизнь: люди избегают общения, проводят часы перед зеркалом и часто обращаются не к психотерапевтам, а к косметологам или хирургам.</p><h3>Почему это важно</h3><p>В эпоху социальных сетей, фильтров и постоянного сравнения себя с другими тема дисморфофобии становится особенно актуальной.</p><p>Лечение обычно строится на когнитивно-поведенческой терапии и, при необходимости, медикаментозной поддержке.</p>`
  },
  {
    id: 20,
    cat: 'Здоровье',
    kind: 'news',
    title: 'Пассажиров эвакуируют с круизного лайнера после вспышки хантавируса',
    desc: 'MV Hondius прибыл к Канарским островам после вспышки хантавируса: пассажиров эвакуируют группами, медицинские службы отслеживают контакты.',
    author: 'Pereuloq',
    date: '11 мая 2026',
    read: '7 мин',
    img: 'https://static01.nyt.com/images/2026/05/10/multimedia/10int-cruise-arrival-02-jzvg/10int-cruise-arrival-02-jzvg-superJumbo.jpg?quality=75&auto=webp',
    bg: 'gb3',
    href: 'posts/mv-hondius-hantavirus-evacuation.html',
    body: `<p>Пассажиров и членов экипажа круизного лайнера MV Hondius начали эвакуировать после вспышки хантавируса на борту судна.</p><p>Корабль прибыл к испанским Канарским островам утром 10 мая, спустя месяц после первой смерти пассажира, связанной с заболеванием.</p><h3>Что известно</h3><p>Эвакуация проходила небольшими группами: люди покидали корабль в масках и защитных костюмах, а медицинские службы начали отслеживать контакты всех находившихся на борту.</p><p>По данным международных служб здравоохранения, риск массового распространения инфекции остается низким.</p>`
  },
  {
    id: 19,
    cat: 'Кино',
    kind: 'news',
    title: 'Фильмы и сериалы мая 2026: что нового на стриминге',
    desc: 'Майские премьеры на стримингах: блокбастеры, независимое кино, сериалы, концертные фильмы и авторские эксперименты.',
    author: 'Pereuloq',
    date: '9 мая 2026',
    read: '7 мин',
    img: 'https://static01.nyt.com/images/2026/05/01/multimedia/01cul-streaming-new-spidernoir-2-jbkw/01cul-streaming-new-spidernoir-2-jbkw-superJumbo.jpg?quality=75&auto=webp',
    bg: 'gb2',
    href: 'posts/streaming-may-2026.html',
    body: `<p>Май 2026 года принес зрителям разнообразные премьеры на стриминговых сервисах - от крупных блокбастеров до независимых фильмов и сериалов.</p><p>Критики отмечают, что месяц сочетает коммерческие и авторские проекты, позволяя найти что-то интересное для разной аудитории.</p><h3>Фильмы и сериалы месяца</h3><p>В подборке - Mortal Kombat II, Ready or Not 2, The Devil Wears Prada 2, Remarkably Bright Creatures, Swapped, концертный фильм Billie Eilish, The Drama и Blue.</p><p>Главные акценты месяца: визуальная эстетика, сценарные эксперименты, актуальные темы и новые подходы к повествованию.</p>`
  },
  {
    id: 18,
    cat: 'Кино',
    kind: 'news',
    title: 'Новые фильмы недели: рекомендации критиков',
    desc: 'Главные премьеры недели: боевики, хоррор-комедии, драмы, анимация и концертный 3D-фильм.',
    author: 'Pereuloq',
    date: '9 мая 2026',
    read: '6 мин',
    img: 'https://static01.nyt.com/images/2026/05/07/multimedia/07cul-sheepdetectives-review1-mkct/07cul-sheepdetectives-review1-mkct-superJumbo.jpg?quality=75&auto=webp',
    bg: 'gb2',
    href: 'posts/new-films-week-critics.html',
    body: `<p>На этой неделе на экраны вышло несколько заметных премьер, которые уже привлекли внимание критиков. Среди них - крупные студийные релизы и независимые картины, каждая из которых предлагает уникальный опыт для зрителей.</p><p>Критики отмечают разнообразие жанров: от динамичных боевиков до драм и комедий, что позволяет каждому зрителю найти фильм по вкусу.</p><h3>Главные релизы</h3><p>В подборке недели - Mortal Kombat II, Ready or Not 2, The Drama, Remarkably Bright Creatures, Swapped, концертный фильм Billie Eilish и The Devil Wears Prada 2.</p><p>В ряде релизов особое внимание уделяется визуальной эстетике, деталям интерьера и костюмов, а также психологической глубине персонажей.</p>`
  },
  {
    id: 17,
    cat: 'Здоровье',
    kind: 'news',
    title: 'Ученые пытаются продлить жизнь собакам',
    desc: 'Новые anti-age технологии для питомцев нацелены не на “вечную жизнь”, а на здоровое старение и снижение риска возрастных болезней.',
    author: 'Pereuloq',
    date: '9 мая 2026',
    read: '5 мин',
    img: 'https://static01.nyt.com/images/2026/05/10/magazine/10mag-health-canine/10mag-health-canine-superJumbo-v2.jpg?quality=75&auto=webp',
    bg: 'gb3',
    href: 'posts/canine-anti-age-longevity.html',
    body: `<p>Исследователи все активнее работают над технологиями, которые могут увеличить продолжительность жизни собак. Главная цель - не просто продлить годы жизни питомцев, а замедлить старение и сохранить здоровье животных как можно дольше.</p><p>Биотехнологические компании изучают препараты и методы, влияющие на процессы старения на клеточном уровне. Некоторые исследования сосредоточены на лекарствах, которые уже используются в медицине для людей.</p><h3>Почему именно собаки</h3><p>Собаки живут рядом с людьми, сталкиваются с похожими экологическими факторами и страдают от многих возрастных заболеваний, схожих с человеческими.</p><p>Ученые подчеркивают: речь идет не о “вечной жизни”, а о качестве старения, здоровье суставов, сердца и когнитивных функций.</p>`
  },
  {
    id: 16,
    cat: 'Спорт',
    kind: 'news',
    title: 'Анонимный опрос среди игроков НБА',
    desc: 'Игроки NBA анонимно оценили, кто внутри лиги считается переоцененным, а кто недооцененным.',
    author: 'Pereuloq',
    date: '7 мая 2026',
    read: '4 мин',
    img: 'https://static01.nyt.com/athletic/uploads/wp/2026/05/04173213/0405_NBA_PLAYER-POLL-2.png?width=1920&quality=70&format=auto',
    bg: 'gb6',
    href: 'posts/nba-player-poll.html',
    body: `<p>Недавний анонимный опрос среди игроков NBA показал, какие баскетболисты считаются переоцененными, а какие недооцененными внутри лиги.</p><p>Информация получена от самих игроков, которые хотели оставаться неизвестными.</p><h3>Репутация и вклад на площадке</h3><p>По результатам опроса, некоторые суперзвезды, получающие большую медиаподдержку, в глазах коллег демонстрируют не всегда выдающиеся результаты на площадке.</p><p>В то же время молодые или менее заметные игроки получают высокие оценки за трудолюбие, командную игру и влияние на матч.</p>`
  },
  {
    id: 15,
    cat: 'Здоровье',
    kind: 'news',
    title: 'Случай с хантавирусом на круизном лайнере',
    desc: 'На круизном лайнере из Южной Америки зафиксировали редкий случай хантавируса: что известно о мерах безопасности и симптомах.',
    author: 'Pereuloq',
    date: '7 мая 2026',
    read: '4 мин',
    img: 'https://cdn-storage-media.tass.ru/resize/1312x868/tass_media/2026/05/04/M/1777900079509764_MAfhYyQ5.jpg',
    bg: 'gb3',
    href: 'posts/hantavirus-cruise-ship.html',
    body: `<p>На круизном лайнере, следовавшем из Южной Америки, был зафиксирован случай заражения хантавирусом - редкой, но опасной болезни, передающейся через грызунов.</p><p>Пассажиры, которые могли контактировать с потенциально зараженными поверхностями или местами, были поставлены под наблюдение медиков.</p><h3>Симптомы и меры безопасности</h3><p>Хантавирус может вызывать острое респираторное заболевание, сопровождающееся высокой температурой, слабостью и одышкой. Эксперты отмечают, что своевременное обращение к врачу значительно повышает шансы на выздоровление.</p><p>Риск для пассажиров считается низким при соблюдении рекомендаций специалистов, но случай подчеркивает важность строгих санитарных мер на транспорте и в местах массового скопления людей.</p>`
  },
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

const ARTICLE_TRANSLATIONS = {
  "posts/apple-ai-wwdc-2026.html": {
    "cat": "Technology",
    "title": "Apple is preparing its biggest iPhone AI update — what to expect at WWDC 2026",
    "desc": "Apple is preparing a major Apple Intelligence update for iOS: a new Siri, offline AI, smart summaries and a system-level personal assistant.",
    "date": "May 13, 2026",
    "read": "5 min",
    "body": "<p>Apple is preparing a major Apple Intelligence update for iOS: a new Siri, offline AI, smart summaries and a system-level personal assistant.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/openai-daybreak-ai-security.html": {
    "cat": "Technology",
    "title": "OpenAI launches Daybreak — AI now searches for code vulnerabilities",
    "desc": "OpenAI has introduced Daybreak, an AI service for finding vulnerabilities, checking dependencies and suggesting code fixes automatically.",
    "date": "May 13, 2026",
    "read": "4 min",
    "body": "<p>OpenAI has introduced Daybreak, an AI service for finding vulnerabilities, checking dependencies and suggesting code fixes automatically.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/swatch-audemars-piguet-royal-pop.html": {
    "cat": "Style",
    "title": "Swatch x Audemars Piguet shook the internet — with an unexpected twist",
    "desc": "Swatch and Audemars Piguet revealed Royal Pop, a bright Pop Art pocket-watch collection instead of the expected affordable Royal Oak.",
    "date": "May 13, 2026",
    "read": "5 min",
    "body": "<p>Swatch and Audemars Piguet revealed Royal Pop, a bright Pop Art pocket-watch collection instead of the expected affordable Royal Oak.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/ramit-sethi-money-millennials.html": {
    "cat": "Finance",
    "title": "Ramit Sethi on money, millennials and helping children",
    "desc": "Financial expert Ramit Sethi explains why younger generations face a different economy and how families can talk about money without shame.",
    "date": "May 11, 2026",
    "read": "7 min",
    "body": "<p>Financial expert Ramit Sethi explains why younger generations face a different economy and how families can talk about money without shame.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/seven-books-week-pereuloq.html": {
    "cat": "Books",
    "title": "7 new books of the week recommended by Pereuloq",
    "desc": "Historical fiction, thrillers, biographies, true crime and literary novels in one weekly reading list.",
    "date": "May 11, 2026",
    "read": "7 min",
    "body": "<p>Historical fiction, thrillers, biographies, true crime and literary novels in one weekly reading list.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/billie-eilish-james-cameron-3d.html": {
    "cat": "Music",
    "title": "Billie Eilish and James Cameron made a 3D concert film",
    "desc": "How Hit Me Hard and Soft: The Tour Live in 3D became one of the most unusual music projects of the year.",
    "date": "May 11, 2026",
    "read": "7 min",
    "body": "<p>How Hit Me Hard and Soft: The Tour Live in 3D became one of the most unusual music projects of the year.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/netflix-freediving-audrey-mestre.html": {
    "cat": "Film",
    "title": "Netflix, freediving and the death of Audrey Mestre",
    "desc": "Why a court rejected Francisco Ferreras’s claim against Netflix over the film No Limit.",
    "date": "May 11, 2026",
    "read": "7 min",
    "body": "<p>Why a court rejected Francisco Ferreras’s claim against Netflix over the film No Limit.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/body-dysmorphic-disorder.html": {
    "cat": "Health",
    "title": "What body dysmorphic disorder is",
    "desc": "Why someone can painfully hate their appearance even without visible reasons, and how body dysmorphic disorder is treated.",
    "date": "May 11, 2026",
    "read": "7 min",
    "body": "<p>Why someone can painfully hate their appearance even without visible reasons, and how body dysmorphic disorder is treated.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/mv-hondius-hantavirus-evacuation.html": {
    "cat": "Health",
    "title": "Passengers evacuated from cruise ship after hantavirus outbreak",
    "desc": "The MV Hondius case shows why health protocols matter in travel and crowded spaces.",
    "date": "May 11, 2026",
    "read": "6 min",
    "body": "<p>The MV Hondius case shows why health protocols matter in travel and crowded spaces.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/streaming-may-2026.html": {
    "cat": "Film",
    "title": "May 2026 streaming premieres: what to watch",
    "desc": "The month brings new films, series and documentaries across the major streaming platforms.",
    "date": "May 10, 2026",
    "read": "6 min",
    "body": "<p>The month brings new films, series and documentaries across the major streaming platforms.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/new-films-week-critics.html": {
    "cat": "Film",
    "title": "New films of the week: critics’ picks",
    "desc": "Fresh theatrical and streaming releases worth watching this week.",
    "date": "May 10, 2026",
    "read": "5 min",
    "body": "<p>Fresh theatrical and streaming releases worth watching this week.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/canine-anti-age-longevity.html": {
    "cat": "Health",
    "title": "Scientists are trying to help dogs live longer",
    "desc": "Longevity research is moving into veterinary science and may change how pets age.",
    "date": "May 10, 2026",
    "read": "5 min",
    "body": "<p>Longevity research is moving into veterinary science and may change how pets age.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/nba-player-poll.html": {
    "cat": "Sport",
    "title": "An anonymous NBA player poll",
    "desc": "What players really think about overrated stars, underrated talent and the mood inside the league.",
    "date": "May 9, 2026",
    "read": "5 min",
    "body": "<p>What players really think about overrated stars, underrated talent and the mood inside the league.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/hantavirus-cruise-ship.html": {
    "cat": "Health",
    "title": "A hantavirus case on a cruise ship",
    "desc": "A rare infection case raises questions about sanitation and passenger safety at sea.",
    "date": "May 9, 2026",
    "read": "4 min",
    "body": "<p>A rare infection case raises questions about sanitation and passenger safety at sea.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/apple-ai-settlement.html": {
    "cat": "Technology",
    "title": "Apple settles an AI-related lawsuit",
    "desc": "The company has reached a settlement in a case tied to artificial intelligence technology and intellectual property.",
    "date": "May 6, 2026",
    "read": "4 min",
    "body": "<p>The company has reached a settlement in a case tied to artificial intelligence technology and intellectual property.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/devil-wears-prada-2-fashion.html": {
    "cat": "Culture",
    "title": "The Devil Wears Prada 2 brings fashion back to the center",
    "desc": "The sequel turns fashion, celebrity culture and media nostalgia into one big event.",
    "date": "May 6, 2026",
    "read": "4 min",
    "body": "<p>The sequel turns fashion, celebrity culture and media nostalgia into one big event.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/radcliffe-morgan-brooks.html": {
    "cat": "Culture",
    "title": "Daniel Radcliffe and Morgan Brooks beyond public roles",
    "desc": "A short cultural note on fame, privacy and what remains outside the spotlight.",
    "date": "May 5, 2026",
    "read": "4 min",
    "body": "<p>A short cultural note on fame, privacy and what remains outside the spotlight.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/spacex-private-shares.html": {
    "cat": "Business",
    "title": "Why SpaceX shares are not available to ordinary investors",
    "desc": "SpaceX remains a private company, which makes access to its shares limited and complicated.",
    "date": "May 5, 2026",
    "read": "4 min",
    "body": "<p>SpaceX remains a private company, which makes access to its shares limited and complicated.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/lg-business-restructure.html": {
    "cat": "Business",
    "title": "How LG is restructuring its business",
    "desc": "LG is reshaping its business around new technologies, services and long-term growth areas.",
    "date": "May 4, 2026",
    "read": "4 min",
    "body": "<p>LG is reshaping its business around new technologies, services and long-term growth areas.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/altman-musk-investors.html": {
    "cat": "Technology",
    "title": "Sam Altman or Elon Musk: who would investors choose?",
    "desc": "The AI race is also a trust race between different visions of the technology industry.",
    "date": "May 4, 2026",
    "read": "4 min",
    "body": "<p>The AI race is also a trust race between different visions of the technology industry.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/spike-lee-ai-cinema.html": {
    "cat": "Film",
    "title": "Spike Lee rejects AI in filmmaking",
    "desc": "The director’s position shows how cinema is debating technology, authorship and creative control.",
    "date": "May 3, 2026",
    "read": "4 min",
    "body": "<p>The director’s position shows how cinema is debating technology, authorship and creative control.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/hippo-survival-africa.html": {
    "cat": "Nature",
    "title": "The most dangerous animal in Africa",
    "desc": "A practical note on why hippos are so dangerous and what distance means in the wild.",
    "date": "May 3, 2026",
    "read": "4 min",
    "body": "<p>A practical note on why hippos are so dangerous and what distance means in the wild.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/korean-cafes-art.html": {
    "cat": "Culture",
    "title": "How Korean cafes became works of art",
    "desc": "Design-driven cafes in South Korea turn coffee into an immersive cultural experience.",
    "date": "May 2, 2026",
    "read": "4 min",
    "body": "<p>Design-driven cafes in South Korea turn coffee into an immersive cultural experience.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/iphone-17-pro.html": {
    "cat": "Technology",
    "title": "iPhone 17 Pro",
    "desc": "A product-focused look at the next iPhone Pro generation and what users expect from it.",
    "date": "September 10, 2025",
    "read": "5 min",
    "body": "<p>A product-focused look at the next iPhone Pro generation and what users expect from it.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/iphone-air.html": {
    "cat": "Technology",
    "title": "iPhone Air",
    "desc": "Apple’s thinnest iPhone concept combines a light design with Pro-level performance ideas.",
    "date": "September 10, 2025",
    "read": "5 min",
    "body": "<p>Apple’s thinnest iPhone concept combines a light design with Pro-level performance ideas.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/apple-watch-ultra-3.html": {
    "cat": "Technology",
    "title": "Apple Watch Ultra 3",
    "desc": "A rugged Apple Watch generation focused on sport, battery life and health features.",
    "date": "September 10, 2025",
    "read": "5 min",
    "body": "<p>A rugged Apple Watch generation focused on sport, battery life and health features.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/mini-jcw-deus.html": {
    "cat": "Events",
    "title": "MINI JCW x Deus Ex Machina",
    "desc": "A design collaboration where car culture, fashion and visual identity meet.",
    "date": "September 16, 2025",
    "read": "5 min",
    "body": "<p>A design collaboration where car culture, fashion and visual identity meet.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/justin-bieber-swag-ii.html": {
    "cat": "Music",
    "title": "Justin Bieber — SWAG II",
    "desc": "A music release as a cultural signal and a reason to talk about style.",
    "date": "September 16, 2025",
    "read": "5 min",
    "body": "<p>A music release as a cultural signal and a reason to talk about style.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "store.html": {
    "cat": "Project",
    "title": "Pereuloq Store has been updated",
    "desc": "Categories, search and product pages now live separately from the editorial feed.",
    "date": "May 4, 2026",
    "read": "3 min",
    "body": "<p>Categories, search and product pages now live separately from the editorial feed.</p><h2>Why it matters</h2><p>Pereuloq covers this story as part of a wider digital culture feed: technology, business, design, entertainment and online services that affect everyday life.</p><h2>Pereuloq view</h2><p>The most useful stories are the ones that help readers understand what is changing and why it matters now.</p>"
  },
  "posts/florida-openai-altman-pressure.html": {
    "cat": "Technology",
    "title": "Florida turns up the pressure on Sam Altman as OpenAI faces government scrutiny",
    "desc": "Florida authorities and Republican prosecutors are increasing pressure on OpenAI and Sam Altman over potential conflicts of interest, AI safety and corporate influence.",
    "date": "May 13, 2026",
    "read": "5 min",
    "body": "<p>Authorities in Florida have started applying serious pressure on OpenAI and Sam Altman. The state attorney general has supported scrutiny of possible conflicts of interest around Altman as OpenAI moves toward a potential IPO.</p><h2>What Altman is being questioned over</h2><p>Republican prosecutors in several states want a closer look at Altman’s personal investments, OpenAI’s links to companies he backed and possible self-dealing.</p><p>Investments in AI infrastructure, nuclear energy, space startups and companies working with OpenAI are getting particular attention.</p><h2>Why Florida matters</h2><p>Florida is becoming one of the states pushing harder on AI companies. Officials want stronger control over model safety, social impact and the power of AI firms.</p><h2>The wider picture</h2><p>At the same time, Altman remains tied to a legal fight with Elon Musk, who argues that OpenAI moved away from its original mission and concentrated too much power around its leadership.</p><h2>Pereuloq view</h2><p>The era when AI grew with little oversight is slowly ending. Major AI companies are starting to face the same level of scrutiny as banks, energy companies and Big Tech.</p>"
  }
};

function localizedArticle(article) {
  if (i18n.lang() !== 'en') return article;
  const translated = ARTICLE_TRANSLATIONS[article.href];
  return translated ? { ...article, ...translated } : article;
}

const CURRENT_ARTICLES = ARTICLES.map(localizedArticle);
const PUBLIC_ARTICLES = CURRENT_ARTICLES.filter((article) => article.href !== 'store.html');
const PROMO_ARTICLES = PUBLIC_ARTICLES.filter((article) => article.promoted !== false);
const POLITICS_SEARCH_ITEMS_RU = [
  {
    "title": "Вокруг России усиливается экономическое давление — ЕС готовит новые ограничения",
    "desc": "Европейский союз обсуждает новый пакет ограничений против России, включая борьбу с теневым флотом, нефтяным экспортом и обходом санкций.",
    "cat": "Геополитика",
    "href": "politics/russia-economic-pressure-eu-sanctions-2026.html",
    "img": "https://images.openai.com/static-rsc-4/dq5wBLEs92z60S2f2nad4ljUWYBFC7vDSIf9qd1WDW2Q7pLDP2s4Rsb2uCgTdvd4w0ELxUiQxKKJwIa3WuGuUzq3b1R6q4XXLGMafqQuBRDjf8VcNw9DEV0YBibq11vk4qJADj1lgrGLpzrnidTSNO2UHZkpomXsNPA4EcarAymC-U5pLVOXtRPk4Lo6Iu-A?purpose=fullsize"
  },
  {
    "title": "Новая Зеландия готовится к экономическим шокам — бюджет 2026 делает фокус на безопасности",
    "desc": "Новая Зеландия смещает бюджетную стратегию к устойчивости, инфраструктуре, обороне и защите от глобальных рисков.",
    "cat": "Экономика",
    "href": "politics/new-zealand-budget-security-2026.html",
    "img": "https://images.openai.com/static-rsc-4/CEDZwl3fqWfM4EURu_HFWUUJGb5lNkcsO9z_ZO_ZFi2aKo9-Y4HdTWPSh6y5rjhZRMOaOLACGWSAyqEMqeZ2FuwBBHVhq0OEdllQgXnCPVV7MD6z2kvKZ5DVPplKZeTo4Cm_OIVL13FazQyWUy3zuFJjmfm_m29v8YWyqrQVTZ1azBbhm0mFs_oq3oOcvaQU?purpose=fullsize"
  },
  {
    "title": "Глобальные рынки облигаций под давлением — рост доходностей выше 20-летних максимумов",
    "desc": "Доходности долгосрочных облигаций G7 растут на фоне инфляции, геополитической нестабильности и неопределенности центробанков.",
    "cat": "Экономика",
    "href": "politics/global-bond-markets-pressure-2026.html",
    "img": "https://images.openai.com/static-rsc-4/Z7vtG42F4BLN1fPt7Z4uqqwYmwuLL8A4ajm4nyDV127qPOt1zArun0h81Io2phB2Kyqrhg7n3ScYocSdZCX9Yw59Sg7C5XL9jFjIXyoF524cXdYmueV0Twe7GK27MiMjihU1qL5BmJmpzGl4yrVfydm5vVOYqa47J83_n7FQBIR2PQSwsxbhu_Nu5Xf7Oqoe?purpose=fullsize"
  },
  {
    "title": "Ближний Восток снова под давлением — нефтяные рынки и Ceasefire на грани",
    "desc": "Перемирие между Ираном и США остается хрупким, а рынки нефти снова реагируют на риск перебоев вокруг Ормузского пролива.",
    "cat": "Кризисы",
    "href": "politics/middle-east-ceasefire-oil-pressure-2026.html",
    "img": "https://images.openai.com/static-rsc-4/FYpqbSZqqUTxPud4OJhPmzSpnlDiSWC2FM2gT0Q2P6lzwP8TJwfD-KlOcYvDkvT_Dg716SliTLF8p9SuEv12-6eFcathL5q4DJ8I5XsbnocBcJO1nxjOQm5l6KLIeA3oVTQfVgtXBnyMe5-CQXL_6uk2zYp6CDS5C4-KGKrXM8bFvZh2owHFgkunPBhVazyD?purpose=fullsize"
  },
  {
    "title": "Мир входит в новую холодную войну — США и Китай готовятся к крупнейшим переговорам 2026 года",
    "desc": "Переговоры Donald Trump и Xi Jinping проходят на фоне торговой войны, AI-гонки, кризиса вокруг Ирана, Тайваня и перестройки мировой экономики.",
    "cat": "Мировая политика",
    "href": "politics/us-china-new-cold-war-2026.html",
    "img": "https://images.openai.com/static-rsc-4/SRRR6mUzjNmt1SpvZibk_t4r7VjJ8qbNULuq25ffjEwc94_wzjPH0MTabTy7fyFDqAeMLtpzxSoHmlOAZwUOmAxAqV94K7N0LsN-8gkaogWC1upz0W6KO4mmsjCblDw0Em8-htxx7kXL_YQlnB9b24K76dJtejZ-ztCwPFOzIB2FuTTf6ey2-dd4g2qysuCK?purpose=fullsize"
  },
  {
    "title": "Европа готовится ко второй энергетической катастрофе — кризис 2026 усиливается",
    "desc": "Европа сталкивается с ростом цен на нефть и газ, давлением на промышленность и экстренными мерами из-за кризиса вокруг Ормузского пролива.",
    "cat": "Мировая политика",
    "href": "politics/europe-energy-crisis-2026.html",
    "img": "https://images.openai.com/static-rsc-4/MGw0543HCybEvLHKhBoyd2w0okbOv5pVKGr0yRrn6IHg-XCq5aRfU_-ReCpxtSBEoMZfYzMGaFun18Mim3QciGsQALfq7Hli5fD7DBhqVBi75XuqrdW_cxy2UsQrJ-T0qg94oZ2J-WvlnrDys7_FisafcLEfKs7e5YLGUHeprgDC366tgiPqOdvizmXq8WaQ?purpose=fullsize"
  },
  {
    "title": "В Кремле заявили, что встреча Путина и Зеленского должна поставить точку в переговорах",
    "desc": "Dmitry Peskov заявил, что возможная встреча Vladimir Putin и Volodymyr Zelenskyy имеет смысл только на финальной стадии переговоров.",
    "cat": "Мировая политика",
    "href": "politics/putin-zelensky-final-talks.html",
    "img": "https://avatars.dzeninfra.ru/get-ynews/271828/9df09344e1d59184a4943885b7a4628e/800x400"
  },
  {
    "title": "ОАЭ вступили в конфликт против Ирана: Израиль перебросил в Эмираты системы «Железный купол»",
    "desc": "По данным западных СМИ, ОАЭ могли участвовать в ударах по Ирану, а Israel направил в Эмираты батареи Iron Dome.",
    "cat": "Мировая политика",
    "href": "politics/uae-iran-iron-dome.html",
    "img": "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/8a6c/live/e5517ce0-4e02-11f1-aa37-6b8846c2f74e.jpg.webp"
  },
  {
    "title": "Почему Британия может пострадать от войны с Ираном сильнее других богатых стран",
    "desc": "Энергетический кризис из-за конфликта США и Ирана усиливает давление на United Kingdom.",
    "cat": "Мировая политика",
    "href": "politics/uk-iran-war-energy-risk.html",
    "img": "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/ca91/live/b125b4d0-4bdd-11f1-be41-a5619e425abe.jpg.webp"
  },
  {
    "title": "Ближний Восток снова на грани эскалации",
    "desc": "Формальное перемирие остается хрупким: Иран, США, Китай и региональные игроки усиливают давление.",
    "cat": "Мировая политика",
    "href": "politics/mideast-iran-us-china-tensions.html",
    "img": "https://static01.nyt.com/images/2026/05/12/multimedia/12mideast-header1-qvlh/12mideast-header1-qvlh-superJumbo.jpg?quality=75&auto=webp"
  },
  {
    "title": "Си Цзиньпин готов усилить давление на Трампа из-за поставок оружия Тайваню",
    "desc": "Тайвань снова становится одной из главных тем в отношениях США и Китая перед саммитом в Пекине.",
    "cat": "Мировая политика",
    "href": "politics/xi-trump-taiwan-arms.html",
    "img": "https://static01.nyt.com/images/2026/05/11/multimedia/00int-China-US-taiwan-pcmh/00int-China-US-taiwan-pcmh-superJumbo.jpg?quality=75&auto=webp"
  },
  {
    "title": "Тим Кук, Илон Маск и главы компаний США едут с Трампом в Китай",
    "desc": "Делегация американского бизнеса отправится в Китай вместе с Donald Trump на фоне переговоров о торговле и инвестициях.",
    "cat": "Мировая политика",
    "href": "politics/us-business-leaders-trump-china.html",
    "img": "https://static01.nyt.com/images/2026/05/11/multimedia/11trump-news-biz-leaders-pcbv/11trump-news-biz-leaders-pcbv-verticalTwoByThree735-v4.jpg?quality=75&auto=webp"
  },
  {
    "title": "США и Китай движутся к одному ИИ-будущему",
    "desc": "Алгоритмы уже меняют работу, отношения и повседневную жизнь миллионов людей похожим образом.",
    "cat": "Мировая политика",
    "href": "politics/us-china-ai-future.html",
    "img": "https://static01.nyt.com/images/2026/05/12/opinion/12liu-image/12liu-image-superJumbo.jpg?quality=75&auto=webp"
  }
];
const POLITICS_SEARCH_TRANSLATIONS = {
  "politics/us-china-new-cold-war-2026.html": {
    "title": "The world enters a new cold war — the U.S. and China prepare for major 2026 talks",
    "desc": "Donald Trump and Xi Jinping meet against the backdrop of a trade war, the AI race, Iran, Taiwan and a global economic reset.",
    "cat": "World politics"
  },
  "politics/europe-energy-crisis-2026.html": {
    "title": "Europe prepares for a second energy shock as the 2026 crisis deepens",
    "desc": "Europe faces higher oil and gas prices, pressure on industry and emergency measures around the Strait of Hormuz crisis.",
    "cat": "World politics"
  },
  "politics/putin-zelensky-final-talks.html": {
    "title": "The Kremlin says a Putin-Zelenskyy meeting should close the negotiations",
    "desc": "Dmitry Peskov said a possible meeting between Vladimir Putin and Volodymyr Zelenskyy only makes sense at the final stage of talks.",
    "cat": "World politics"
  },
  "politics/uae-iran-iron-dome.html": {
    "title": "UAE, Iran and Iron Dome: why the region is watching closely",
    "desc": "Reports about Israel, the UAE and Iran show how quickly regional security can change.",
    "cat": "World politics"
  },
  "politics/uk-iran-war-energy-risk.html": {
    "title": "Why Britain may suffer more from an Iran war than other wealthy countries",
    "desc": "An energy shock linked to conflict with Iran could intensify pressure on the United Kingdom.",
    "cat": "World politics"
  },
  "politics/mideast-iran-us-china-tensions.html": {
    "title": "The Middle East is again close to escalation",
    "desc": "A formal ceasefire remains fragile as Iran, the United States, China and regional players increase pressure.",
    "cat": "World politics"
  },
  "politics/xi-trump-taiwan-arms.html": {
    "title": "Xi Jinping may pressure Trump over weapons supplies to Taiwan",
    "desc": "Taiwan is again one of the main themes in U.S.-China relations ahead of the Beijing summit.",
    "cat": "World politics"
  },
  "politics/us-business-leaders-trump-china.html": {
    "title": "Tim Cook, Elon Musk and U.S. business leaders travel with Trump to China",
    "desc": "An American business delegation heads to China with Donald Trump amid trade and investment talks.",
    "cat": "World politics"
  },
  "politics/us-china-ai-future.html": {
    "title": "The U.S. and China are moving toward the same AI future",
    "desc": "Algorithms are already changing work, relationships and everyday life in similar ways for millions of people.",
    "cat": "World politics"
  },
  "politics/middle-east-ceasefire-oil-pressure-2026.html": {
    "title": "The Middle East is under pressure again as oil markets and the ceasefire sit on the edge",
    "desc": "The Iran-U.S. ceasefire remains fragile, while oil markets react again to the risk of disruptions around the Strait of Hormuz.",
    "cat": "Crises"
  },
  "politics/global-bond-markets-pressure-2026.html": {
    "title": "Global bond markets under pressure as yields climb beyond 20-year highs",
    "desc": "Long-term G7 bond yields are rising amid inflation, geopolitical instability and uncertainty around central banks.",
    "cat": "Economy"
  },
  "politics/new-zealand-budget-security-2026.html": {
    "title": "New Zealand prepares for economic shocks as Budget 2026 focuses on security",
    "desc": "New Zealand is shifting its budget strategy toward resilience, infrastructure, defense and protection from global risks.",
    "cat": "Economy"
  },
  "politics/russia-economic-pressure-eu-sanctions-2026.html": {
    "title": "Economic pressure around Russia grows as the EU prepares new restrictions",
    "desc": "The European Union is discussing new restrictions on Russia, including action against the shadow fleet, oil exports and sanctions evasion.",
    "cat": "Geopolitics"
  }
};
const POLITICS_SEARCH_ITEMS = i18n.lang() === 'en'
  ? POLITICS_SEARCH_ITEMS_RU.map((item) => ({ ...item, ...(POLITICS_SEARCH_TRANSLATIONS[item.href] || {}) }))
  : POLITICS_SEARCH_ITEMS_RU;
window.PEREULOQ_ARTICLES = CURRENT_ARTICLES;
window.PEREULOQ_PUBLIC_ARTICLES = PUBLIC_ARTICLES;

const PRODUCTS = [
  { id: 100, cat: 'giftcards', type: 'Apple Gift Card', name: 'Apple Gift Card', icon: 'AGC', price: 'от заглушки', was: null, rating: 5.0, rev: 320, st: 'st-blue', stl: 'NEW', desc: 'Подарочные карты Apple для разных регионов: Турция, США, Польша, Индия, Япония, Канада, Европа и Англия.', feats: ['Выбор региона', 'Автогенерация заказа', 'Связь через Telegram'], href: 'apple-gift-card.html' },
  { id: 200, cat: 'xbox', type: 'Xbox', name: 'Xbox', icon: 'XB', price: 'Game Pass и игры', was: null, rating: 5.0, rev: 410, st: 'st-green', stl: 'XBOX', desc: 'Игры Xbox и подписки Game Pass Ultimate, Premium и PC с автогенерацией заказа.', feats: ['Игры', 'Game Pass', 'Telegram-заказ'], href: 'xbox.html' },
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
  { v: 'xbox', l: 'Xbox' },
  { v: 'giftcards', l: 'Gift Cards' },
  { v: 'digital', l: 'Ключи' },
  { v: 'subs', l: 'Подписки' },
  { v: 'templates', l: 'Шаблоны' },
  { v: 'services', l: 'Услуги' }
];

const GIFT_CARD_COUNTRIES = [
  { slug: 'turkey', label: 'Турция', title: 'Apple Gift Card Turkey', code: 'TR', currency: 'TL', hint: 'Аккаунт Apple ID с регионом Турция', href: 'apple-gift-card-product.html?country=turkey', ready: true },
  { slug: 'usa', label: 'США', title: 'Apple Gift Card USA', code: 'US', currency: 'USD', hint: 'Аккаунт Apple ID с регионом США', href: 'apple-gift-card-product.html?country=usa', ready: false },
  { slug: 'poland', label: 'Польша', title: 'Apple Gift Card Poland', code: 'PL', currency: 'PLN', hint: 'Аккаунт Apple ID с регионом Польша', href: 'apple-gift-card-product.html?country=poland', ready: false },
  { slug: 'india', label: 'Индия', title: 'Apple Gift Card India', code: 'IN', currency: 'INR', hint: 'Аккаунт Apple ID с регионом Индия', href: 'apple-gift-card-product.html?country=india', ready: false },
  { slug: 'japan', label: 'Япония', title: 'Apple Gift Card Japan', code: 'JP', currency: 'JPY', hint: 'Аккаунт Apple ID с регионом Япония', href: 'apple-gift-card-product.html?country=japan', ready: false },
  { slug: 'canada', label: 'Канада', title: 'Apple Gift Card Canada', code: 'CA', currency: 'CAD', hint: 'Аккаунт Apple ID с регионом Канада', href: 'apple-gift-card-product.html?country=canada', ready: false },
  { slug: 'europe', label: 'Европа', title: 'Apple Gift Card Europe', code: 'EU', currency: 'EUR', hint: 'Аккаунт Apple ID с регионом Европа', href: 'apple-gift-card-product.html?country=europe', ready: false },
  { slug: 'england', label: 'Англия', title: 'Apple Gift Card UK', code: 'UK', currency: 'GBP', hint: 'Аккаунт Apple ID с регионом Англия', href: 'apple-gift-card-product.html?country=england', ready: false }
];

const GIFT_CARD_PRODUCTS = {
  turkey: {
    seller: 'https://t.me/almir328',
    name: 'Apple Gift Card Turkey',
    region: 'Турция',
    currency: 'TL',
    rateLabel: 'Прайс-заглушка. Позже можно заменить рублевые значения в js/main.js.',
    description: 'Вы покупаете подарочную карту (код) для пополнения аккаунта iTunes / Apple Store.',
    warning: 'Промокод можно активировать только на аккаунтах с регионом Турция.',
    denominations: [10, 25, 50, 75, 100, 150, 200, 300, 400, 500, 700, 800, 900, 1000, 1250, 1500, 2000, 2500, 3000, 5000, 7000, 10000].map((value) => ({
      label: `${value} TL`,
      value,
      rub: Math.round(value * 3.2)
    }))
  }
};

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
  'Анонимный опрос игроков NBA показал, кого в лиге считают переоцененным и недооцененным',
  'На круизном лайнере зафиксировали случай хантавируса: пассажиров предупредили о симптомах',
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
  'Лента теперь живет как отдельный редакционный раздел',
  'Темная и светлая тема сохранены',
  'Сайт работает без backend',
  'Приватная страница остается статической'
];

const PROMOS = [
  { cls: 'promo-xbox', badge: 'Xbox', title: 'Game Pass и игры', sub: 'Подписки и игровые товары с быстрым заказом', href: 'xbox.html' },
  { cls: 'promo-blue', badge: 'Новое', title: 'Apple Gift Card', sub: 'Выбор страны, номинала и заказ в Telegram', href: 'apple-gift-card.html' },
  { cls: 'promo-violet', badge: 'Store', title: 'Цифровые продукты', sub: 'Ключи, шаблоны и услуги' }
];

const XBOX_ADS = [
  {
    type: 'image',
    badge: 'Скоро',
    title: 'Beast of Reincarnation',
    desc: 'Скоро в продаже в разделе Xbox Игры',
    image: 'https://cms-assets.xboxservices.com/assets/cd/78/cd7840c4-94ed-4a2a-88e3-a2028f7049f1.jpg?n=665824756_Large%20Tout-0_1083x1222_01.jpg',
    href: 'xbox-games.html'
  },
  {
    type: 'image',
    badge: 'Game Pass',
    title: 'Xbox Game Pass',
    desc: 'Ultimate, Premium и PC с быстрым заказом',
    image: 'https://cms-assets.xboxservices.com/assets/6f/34/6f3492d1-06de-47aa-903d-ba942790cb18.jpg?n=1254895_Page-Hero-500_Campaign_767x1175_03.jpg',
    href: 'xbox-game-pass.html'
  },
  {
    type: 'image',
    badge: 'Apple Gift Card',
    title: 'Apple Gift Card',
    desc: 'Подарочные карты Apple по регионам',
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/apple-gift-cards-landing-202006?wid=2982&hei=1176&fmt=jpeg&qlt=90&.v=U0EzaXNyc2ZlYWVYR0IxNTgwM2hBenVpVFFlVk9JRDNmTy85OE54VXNkUDdNdktaODg4Q2pUb3oxbHJXYnlHTUJ3b1EyanZvd0crOUVVd3ZSZWl3MldaWlg4SXd3WDRBclNoVm5RMFA5SWZXNm9oamhpbmdGcHIwa2hOU3lmQkw',
    href: 'apple-gift-card.html'
  }
];

const XBOX_SUBCATS = [
  { title: 'Игры', desc: 'Карточки игр, заглушки и быстрый переход к продавцу.', href: 'xbox-games.html', image: 'https://cms-assets.xboxservices.com/assets/42/57/425783a8-1249-447c-9e5b-50fe5ba6ef3d.jpg?n=The-Blood-of-Dawnwalker_Large-tout-0_1083x1222.jpg' },
  { title: 'Game Pass', desc: 'Ultimate, Premium и PC с выбором срока и автозаказом.', href: 'xbox-game-pass.html', image: 'https://cms-assets.xboxservices.com/assets/6f/34/6f3492d1-06de-47aa-903d-ba942790cb18.jpg?n=1254895_Page-Hero-500_Campaign_767x1175_03.jpg' }
];

const XBOX_GAMES = [
  { id: 'XGAME-000', title: 'Beast of Reincarnation', price: 'Скоро в продаже', image: 'https://cms-assets.xboxservices.com/assets/cd/78/cd7840c4-94ed-4a2a-88e3-a2028f7049f1.jpg?n=665824756_Large%20Tout-0_1083x1222_01.jpg' },
  { id: 'XGAME-001', title: 'The Blood of Dawnwalker', price: 'Цена по запросу', image: 'https://cms-assets.xboxservices.com/assets/42/57/425783a8-1249-447c-9e5b-50fe5ba6ef3d.jpg?n=The-Blood-of-Dawnwalker_Large-tout-0_1083x1222.jpg' },
  { id: 'XGAME-002', title: 'Xbox Digital Game', price: 'Цена по запросу', image: 'https://pbs.twimg.com/profile_images/2049896598801719296/ks_-5lTD_400x400.jpg' },
  { id: 'XGAME-003', title: 'Game Bundle', price: 'Цена по запросу', image: 'https://cms-assets.xboxservices.com/assets/6f/34/6f3492d1-06de-47aa-903d-ba942790cb18.jpg?n=1254895_Page-Hero-500_Campaign_767x1175_03.jpg' }
];

const XBOX_GAMEPASS_PLANS = [
  { id: 'XGPU', name: 'Xbox Game Pass Ultimate', short: 'Ultimate' },
  { id: 'XGPP', name: 'Xbox Game Pass Premium', short: 'Premium' },
  { id: 'XGPC', name: 'PC Game Pass', short: 'PC' }
];

const XBOX_GAMEPASS_MONTHS = [
  { label: '1 месяц', months: '1', price: 1500 },
  { label: '2 месяца', months: '2', price: 2800 },
  { label: '3 месяца', months: '3', price: 3200 },
  { label: '4 месяца', months: '4', price: null },
  { label: '5 месяцев', months: '5', price: 5000 },
  { label: '6 месяцев', months: '6', price: null },
  { label: '7 месяцев', months: '7', price: 6200 },
  { label: '8 месяцев', months: '8', price: null },
  { label: '9 месяцев', months: '9', price: 7000 },
  { label: '11 месяцев', months: '11', price: 8200 },
  { label: '12+1 месяцев', months: '12+1', price: 9600 },
  { label: '12+2 месяцев', months: '12+2', price: 10200 }
];


if (i18n.lang() === 'en') {
  FEED_CATS.splice(0, FEED_CATS.length,
    { v: 'all', l: 'All' }, { v: 'news', l: 'News' }, { v: 'update', l: 'Updates' },
    { v: 'ad', l: 'Ads' }, { v: 'video', l: 'Video' }, { v: 'post', l: 'Posts' }
  );
  STORE_CATS.splice(0, STORE_CATS.length,
    { v: 'all', l: 'All' }, { v: 'xbox', l: 'Xbox' }, { v: 'giftcards', l: 'Gift Cards' },
    { v: 'digital', l: 'Keys' }, { v: 'subs', l: 'Subscriptions' }, { v: 'templates', l: 'Templates' }, { v: 'services', l: 'Services' }
  );
  CATS_DATA.splice(0, CATS_DATA.length,
    { icon: 'PC', name: 'Technology', count: '5' }, { icon: '$', name: 'Business', count: '2' },
    { icon: 'FM', name: 'Film', count: '1' }, { icon: '*', name: 'Culture', count: '3' },
    { icon: '!', name: 'Nature', count: '1' }, { icon: 'EV', name: 'Events', count: '1' },
    { icon: 'MU', name: 'Music', count: '1' }, { icon: 'PR', name: 'Project', count: '1' }
  );
  TICKER_ITEMS.splice(0, TICKER_ITEMS.length,
    'Apple prepares a major AI update for iPhone',
    'OpenAI Daybreak brings AI into software security',
    'Swatch and Audemars Piguet turn watches into an internet event',
    'SpaceX remains private and hard to access for ordinary investors',
    'Pereuloq Store works as a separate digital goods section',
    'The site runs on static hosting without a backend'
  );
}

let currentSlide = 0;
let slideTimer;
let storeAdSlide = 0;
let storeAdTimer;
let feedFilter = 'all';
let storeFilter = 'all';
let storeSearch = '';
let readOpen = false;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function goPage(page) {
  window.location.href = routes[page] || routes.home;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function formatRub(value) {
  return `≈ ${Number(value).toLocaleString('ru-RU')} RUB`;
}

function resolveSearchHref(href) {
  if (/^https?:\/\//.test(href) || href.startsWith('../')) return href;
  return location.pathname.includes('/posts/') ? `../${href}` : href;
}

function setupSearch() {
  if ($('#SEARCH_PANEL')) return;
  const items = [
    ...PUBLIC_ARTICLES.map((article) => ({
      title: article.title,
      desc: article.desc,
      cat: article.cat,
      href: article.href,
      img: article.img
    })),
    ...POLITICS_SEARCH_ITEMS
  ];
  const panel = document.createElement('div');
  panel.className = 'search-panel';
  panel.id = 'SEARCH_PANEL';
  panel.innerHTML = `
    <div class="search-box" role="dialog" aria-modal="true" aria-label="${i18n.lang() === 'en' ? 'Search Pereuloq' : 'Поиск по Pereuloq'}">
      <div class="search-head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input class="search-input" id="SEARCH_INPUT" type="search" placeholder="${i18n.t('searchPlaceholder')}" autocomplete="off">
        <button class="search-close" id="SEARCH_CLOSE" type="button" aria-label="${i18n.lang() === 'en' ? 'Close search' : 'Закрыть поиск'}">×</button>
      </div>
      <div class="search-results" id="SEARCH_RESULTS"></div>
    </div>
  `;
  document.body.append(panel);
  const input = $('#SEARCH_INPUT', panel);
  const results = $('#SEARCH_RESULTS', panel);
  const render = () => {
    const query = input.value.trim().toLowerCase();
    const matches = (query
      ? items.filter((item) => `${item.title} ${item.desc} ${item.cat}`.toLowerCase().includes(query))
      : items.slice(0, 7)
    ).slice(0, 12);
    results.innerHTML = matches.length ? matches.map((item) => `
      <a class="search-result" href="${resolveSearchHref(item.href)}">
        <span class="search-thumb">${item.img ? `<img src="${item.img}" alt="" loading="lazy" decoding="async">` : ''}</span>
        <span>
          <span class="search-meta">${escapeHtml(item.cat)}</span>
          <span class="search-title">${escapeHtml(item.title)}</span>
          <span class="search-desc">${escapeHtml(item.desc)}</span>
        </span>
      </a>
    `).join('') : `<div class="search-empty">${i18n.t('searchEmpty')}</div>`;
  };
  const open = () => {
    panel.classList.add('open');
    render();
    setTimeout(() => input.focus(), 20);
  };
  const close = () => panel.classList.remove('open');
  $$('.hdr-search').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      open();
    });
  });
  document.addEventListener('click', (event) => {
    if (event.target.closest('.hdr-search')) {
      event.preventDefault();
      open();
    }
  });
  input.addEventListener('input', render);
  $('#SEARCH_CLOSE', panel)?.addEventListener('click', close);
  panel.addEventListener('click', (event) => {
    if (event.target === panel || event.target.closest('.search-result')) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open();
    }
  });
  render();
}

function getCountryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('country') || 'turkey';
}

function createOrderId() {
  return `#AGC-${Math.floor(1000 + Math.random() * 9000)}`;
}

function createXboxOrderId() {
  return `#XGP-${Math.floor(1000 + Math.random() * 9000)}`;
}

function formatPrice(value) {
  return value ? `${Number(value).toLocaleString('ru-RU')} RUB` : 'Уточнить у продавца';
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const area = document.createElement('textarea');
  area.value = value;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.left = '-9999px';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
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
    if (event.target.closest('a,button,input,select,.feat-card,.feed-art,.prod-card,.cat-item,.ab-proj,.promo-card,.agc-country-card')) {
      document.body.classList.add('cur-hover');
    }
  });
  document.addEventListener('mouseout', (event) => {
    if (event.target.closest('a,button,input,select,.feat-card,.feed-art,.prod-card,.cat-item,.ab-proj,.promo-card,.agc-country-card')) {
      document.body.classList.remove('cur-hover');
    }
  });
}

function setupHeader() {
  const header = $('#HDR');
  const menuButton = $('#MOBILE_MENU_BTN');
  const mobilePanel = $('#MOBILE_PANEL');
  const headerRight = $('.hdr-right');
  const themeButton = $('#THEME_BTN');
  const legacyMenuButton = $('#menuBtn');
  const legacyMobileNav = $('#mobileNav');
  const legacyClose = $('#mnavClose');
  const legacyProgress = $('#scrollProgress');
  if (headerRight && themeButton && !$('.hdr-search')) {
    const searchButton = document.createElement('a');
    searchButton.className = 'hdr-search';
    searchButton.href = '#SEARCH_PANEL';
    searchButton.setAttribute('aria-label', 'Поиск');
    searchButton.setAttribute('onclick', "document.getElementById('SEARCH_PANEL')?.classList.add('open');setTimeout(()=>document.getElementById('SEARCH_INPUT')?.focus(),20)");
    searchButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
    headerRight.insertBefore(searchButton, themeButton);
  }
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
  const slides = PROMO_ARTICLES.slice(0, 4);
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
  const lead = PROMO_ARTICLES[0];
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
    PROMO_ARTICLES.slice(1, 4).map((article) => `
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
    list.innerHTML = PUBLIC_ARTICLES.map((article) => `
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
    side.innerHTML = PUBLIC_ARTICLES.slice(0, 5).map((article) => `
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
      <span class="cat-count">${category.count} ${i18n.lang() === 'en' ? 'stories' : 'материалов'}</span>
    </a>`).join('');
}

function buildFeed() {
  const filters = $('#FEED_FILTERS');
  const main = $('#FEED_MAIN');
  const side = $('#FEED_SIDE');
  const pagination = $('#PAGINATION');
  if (!filters || !main) return;
  filters.innerHTML = FEED_CATS.map((item) => `<button class="ff-btn${feedFilter === item.v ? ' on' : ''}" data-feed-filter="${item.v}">${item.l}</button>`).join('<span class="ff-sep"></span>');
  const articles = feedFilter === 'all' ? PUBLIC_ARTICLES : PUBLIC_ARTICLES.filter((article) => article.kind === feedFilter);
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
      <div class="fs-widget"><div class="fs-wh">${i18n.lang() === 'en' ? 'Popular' : 'Популярное'}</div>${PUBLIC_ARTICLES.slice(0, 4).map((article) => `<article class="sb-item" data-read="${article.id}"><div class="sb-cat">${article.cat}</div><div class="sb-title">${article.title}</div><div class="sb-time">${article.read}</div></article>`).join('')}</div>
      <div class="fs-widget"><div class="fs-wh">${i18n.lang() === 'en' ? 'Categories' : 'Категории'}</div>${CATS_DATA.map((category) => `<div class="sb-item"><div class="sb-cat">${category.icon} ${category.name}</div><div class="sb-time">${category.count} ${i18n.lang() === 'en' ? 'stories' : 'материалов'}</div></div>`).join('')}</div>`;
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
      <article class="promo-card ${promo.cls}" ${promo.href ? `data-product-link="${promo.href}"` : ''}>
        <div><span class="pc-badge">${promo.badge}</span><div class="pc-title">${promo.title}</div><div class="pc-sub">${promo.sub}</div></div>
        <div class="pc-arr">→</div>
      </article>`).join('');
  }
  renderProducts();
}

function buildStoreAds() {
  const rotator = $('#STORE_AD_ROTATOR');
  if (!rotator) return;
  rotator.innerHTML = XBOX_ADS.map((ad, index) => `
    <a class="store-ad-slide${index === storeAdSlide ? ' on' : ''}" href="${ad.href}" ${ad.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} aria-label="${ad.title}">
      <img src="${ad.image}" alt="${ad.title}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
      <span class="store-ad-shade"></span>
      <span class="store-ad-copy">
        <span class="store-ad-badge">${ad.badge}</span>
        <strong>${ad.title}</strong>
        <small>${ad.desc}</small>
      </span>
    </a>`).join('') + `
    <div class="store-ad-dots">${XBOX_ADS.map((_, index) => `<button class="store-ad-dot${index === storeAdSlide ? ' on' : ''}" type="button" data-store-ad="${index}" aria-label="Реклама ${index + 1}"></button>`).join('')}</div>`;
  clearTimeout(storeAdTimer);
  storeAdTimer = setTimeout(() => {
    storeAdSlide = (storeAdSlide + 1) % XBOX_ADS.length;
    buildStoreAds();
  }, 5000);
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
    <article class="prod-card${product.href ? ' prod-card-link' : ''}" ${product.href ? `data-product-link="${product.href}"` : `data-product="${product.id}"`}>
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
          <button class="btn-pc" ${product.href ? `data-product-link="${product.href}"` : `data-product="${product.id}"`}>${product.href ? 'Открыть' : 'Купить'}</button>
        </div>
      </div>
    </article>`).join('') || '<div class="empty-state">Ничего не найдено</div>';
}

function buildGiftCardCountries() {
  const grid = $('#AGC_COUNTRIES');
  const count = $('#AGC_COUNTRY_COUNT');
  if (!grid) return;
  if (count) count.textContent = `${GIFT_CARD_COUNTRIES.length} регионов`;
  grid.innerHTML = GIFT_CARD_COUNTRIES.map((country) => `
    <a class="agc-country-card" href="${country.href}" aria-label="Открыть ${country.title}">
      <div class="agc-country-glow"></div>
      <div class="agc-country-top">
        <span class="agc-country-code">${country.code}</span>
        <span class="agc-country-status${country.ready ? ' ready' : ''}">${country.ready ? 'Доступно' : 'Скоро'}</span>
      </div>
      <div class="agc-card-mark" aria-hidden="true">Apple</div>
      <h2>${country.label}</h2>
      <p>${country.hint}</p>
      <div class="agc-country-foot">
        <span>${country.currency}</span>
        <span>Открыть →</span>
      </div>
    </a>`).join('');
}

function getGiftCardProductState() {
  const slug = getCountryFromUrl();
  const country = GIFT_CARD_COUNTRIES.find((item) => item.slug === slug) || GIFT_CARD_COUNTRIES[0];
  const product = GIFT_CARD_PRODUCTS[country.slug] || null;
  return { country, product };
}

function buildOrderText(product, option, orderId) {
  return `--------------------------------
ORDER ID: ${orderId}

Товар:
${product.name}

Номинал:
${option.label}

Конвертация:
${formatRub(option.rub)}

Покупатель подтверждает:
✅ Регион выбран верно
✅ Товар выбран верно
✅ Цифровой товар не подлежит возврату
✅ Код будет активирован на аккаунте нужного региона
--------------------------------`;
}

function renderGiftCardOrder() {
  const select = $('#AGC_DENOM_SELECT');
  const order = $('#AGC_ORDER_TEXT');
  const conversion = $('#AGC_CONVERSION');
  const price = $('#AGC_PRICE');
  if (!select || !order) return;
  const { product } = getGiftCardProductState();
  if (!product) return;
  const option = product.denominations.find((item) => item.label === select.value) || product.denominations[0];
  window.__agcOrderId = createOrderId();
  order.value = buildOrderText(product, option, window.__agcOrderId);
  if (conversion) conversion.textContent = formatRub(option.rub);
  if (price) price.textContent = option.label;
}

function buildGiftCardProduct() {
  const page = $('#AGC_PRODUCT_PAGE');
  if (!page) return;
  const { country, product } = getGiftCardProductState();
  const title = $('#AGC_PRODUCT_TITLE');
  const region = $('#AGC_PRODUCT_REGION');
  const description = $('#AGC_PRODUCT_DESC');
  const warning = $('#AGC_WARNING');
  const select = $('#AGC_DENOM_SELECT');
  const selectorWrap = $('#AGC_SELECTOR_WRAP');
  const unavailable = $('#AGC_UNAVAILABLE');
  const readyBlocks = $$('.agc-ready-only');

  document.title = `${country.title} — Pereuloq`;
  if (title) title.textContent = country.title;
  if (region) region.textContent = country.label;

  if (!product) {
    if (description) description.textContent = 'Номиналы для этого региона скоро появятся. Вы уже можете написать продавцу и уточнить доступность.';
    if (warning) warning.textContent = `Промокод можно активировать только на аккаунтах с регионом ${country.label}.`;
    if (selectorWrap) selectorWrap.hidden = true;
    readyBlocks.forEach((block) => { block.hidden = true; });
    if (unavailable) {
      unavailable.hidden = false;
      unavailable.innerHTML = `
        <div class="empty-state agc-empty">
          <div class="agc-loader" aria-hidden="true"></div>
          Номиналы для региона ${country.label} готовятся. Напишите продавцу, чтобы уточнить наличие.
          <a class="agc-telegram-inline" href="https://t.me/almir328" target="_blank" rel="noopener">Написать продавцу</a>
        </div>`;
    }
    return;
  }

  if (description) description.textContent = product.description;
  if (warning) warning.textContent = product.warning;
  if (selectorWrap) selectorWrap.hidden = false;
  readyBlocks.forEach((block) => { block.hidden = false; });
  if (unavailable) unavailable.hidden = true;
  if (select) {
    select.innerHTML = product.denominations.map((item) => `<option value="${item.label}">${item.label} · ${formatRub(item.rub)}</option>`).join('');
    select.value = product.denominations.find((item) => item.value === 100)?.label || product.denominations[0].label;
  }
  const rate = $('#AGC_RATE');
  if (rate) rate.textContent = product.rateLabel;
  renderGiftCardOrder();
}

function buildXboxHome() {
  const grid = $('#XBOX_SUBCATS');
  if (!grid) return;
  grid.innerHTML = XBOX_SUBCATS.map((item) => `
    <a class="xbox-subcat-card" href="${item.href}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
      <span class="xbox-card-shade"></span>
      <span class="xbox-card-copy">
        <span class="xbox-kicker">Xbox</span>
        <strong>${item.title}</strong>
        <small>${item.desc}</small>
      </span>
    </a>`).join('');
}

function buildXboxGames() {
  const grid = $('#XBOX_GAMES_GRID');
  if (!grid) return;
  grid.innerHTML = XBOX_GAMES.map((game) => {
    const order = `ORDER ID: #${game.id}

Товар:
${game.title}

Категория:
Xbox Игры

Цена:
${game.price}

Покупатель хочет уточнить наличие и оформить покупку.`;
    return `
      <article class="xbox-game-card">
        <img src="${game.image}" alt="${game.title}" loading="lazy" decoding="async">
        <div class="xbox-game-body">
          <div class="xbox-kicker">${game.id}</div>
          <h2>${game.title}</h2>
          <div class="xbox-price">${game.price}</div>
          <button class="btn-ab primary" type="button" data-copy-static-order="${escapeHtml(order)}" data-contact-seller="https://t.me/almir328">Написать продавцу</button>
        </div>
      </article>`;
  }).join('');
}

function getXboxGamePassState() {
  const planId = $('#XBOX_PLAN_SELECT')?.value || XBOX_GAMEPASS_PLANS[0].id;
  const monthsId = $('#XBOX_MONTH_SELECT')?.value || XBOX_GAMEPASS_MONTHS[0].months;
  const plan = XBOX_GAMEPASS_PLANS.find((item) => item.id === planId) || XBOX_GAMEPASS_PLANS[0];
  const term = XBOX_GAMEPASS_MONTHS.find((item) => item.months === monthsId) || XBOX_GAMEPASS_MONTHS[0];
  return { plan, term };
}

function buildXboxGamePassOrder(plan, term, orderId) {
  return `--------------------------------
ORDER ID: ${orderId}

ID товара:
${plan.id}

Товар:
${plan.name}

Количество месяцев:
${term.label}

Цена:
${formatPrice(term.price)}

Покупатель подтверждает:
✅ Подписка выбрана верно
✅ Количество месяцев выбрано верно
✅ На аккаунте нет активной подписки
✅ Регион аккаунта подходит для подключения
✅ После оплаты покупатель предоставит данные Xbox-аккаунта продавцу
--------------------------------`;
}

function renderXboxGamePassOrder() {
  const order = $('#XBOX_ORDER_TEXT');
  const price = $('#XBOX_PRICE');
  const product = $('#XBOX_PRODUCT_NAME');
  if (!order) return;
  const { plan, term } = getXboxGamePassState();
  if (price) price.textContent = formatPrice(term.price);
  if (product) product.textContent = plan.name;
  window.__xboxOrderId = createXboxOrderId();
  order.value = buildXboxGamePassOrder(plan, term, window.__xboxOrderId);
}

function buildXboxGamePass() {
  const planSelect = $('#XBOX_PLAN_SELECT');
  const monthSelect = $('#XBOX_MONTH_SELECT');
  if (!planSelect || !monthSelect) return;
  planSelect.innerHTML = XBOX_GAMEPASS_PLANS.map((plan) => `<option value="${plan.id}">${plan.name}</option>`).join('');
  monthSelect.innerHTML = XBOX_GAMEPASS_MONTHS.map((term) => `<option value="${term.months}">${term.label} · ${formatPrice(term.price)}</option>`).join('');
  renderXboxGamePassOrder();
}

function buildAbout() {
  const skills = $('#AB_SKILLS');
  const stats = $('#AB_STATS');
  const projects = $('#AB_PROJS');
  if (skills) {
    skills.innerHTML = ['Технологии', 'Бизнес', 'Путешествия', 'Культура', 'Стиль жизни', 'Редакция'].map((skill) => `<span class="ab-skill">${skill}</span>`).join('');
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
  const article = PUBLIC_ARTICLES.find((item) => item.id === Number(id));
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
  document.addEventListener('click', async (event) => {
    const read = event.target.closest('[data-read]');
    const product = event.target.closest('[data-product]');
    const productLink = event.target.closest('[data-product-link]');
    const feedButton = event.target.closest('[data-feed-filter]');
    const storeButton = event.target.closest('[data-store-filter]');
    const closeReadButton = event.target.closest('[data-close-read]');
    const closeModalButton = event.target.closest('[data-close-modal]');
    const copyButton = event.target.closest('[data-copy]');
    const copyOrderButton = event.target.closest('[data-copy-order]');
    const copyStaticOrderButton = event.target.closest('[data-copy-static-order]');
    const contactSellerButton = event.target.closest('[data-contact-seller]');
    const storeAdButton = event.target.closest('[data-store-ad]');
    const videoSoundButton = event.target.closest('[data-youtube-sound]');

    if (storeAdButton) {
      event.preventDefault();
      storeAdSlide = Number(storeAdButton.dataset.storeAd);
      buildStoreAds();
      return;
    }
    if (videoSoundButton) {
      const frame = document.getElementById(videoSoundButton.dataset.youtubeSound);
      const isMuted = videoSoundButton.dataset.sound === 'off';
      frame?.contentWindow?.postMessage(JSON.stringify({
        event: 'command',
        func: isMuted ? 'unMute' : 'mute',
        args: []
      }), '*');
      videoSoundButton.dataset.sound = isMuted ? 'on' : 'off';
      videoSoundButton.textContent = isMuted ? 'Выключить звук' : 'Включить звук';
      return;
    }
    if (productLink) {
      window.location.href = productLink.dataset.productLink;
      return;
    }
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
      await copyText(new URL(copyButton.dataset.copy, location.href).href);
      toast(i18n.t('linkCopied'));
    }
    if (copyOrderButton) {
      const value = $('#AGC_ORDER_TEXT')?.value || $('#XBOX_ORDER_TEXT')?.value;
      if (value) {
        await copyText(value);
        toast(i18n.t('orderCopied'));
      }
    }
    if (copyStaticOrderButton && !contactSellerButton) {
      await copyText(copyStaticOrderButton.dataset.copyStaticOrder);
      toast(i18n.t('orderCopied'));
    }
    if (contactSellerButton) {
      const value = contactSellerButton.dataset.copyStaticOrder || $('#AGC_ORDER_TEXT')?.value || $('#XBOX_ORDER_TEXT')?.value;
      if (value) {
        await copyText(value);
        toast(i18n.t('orderCopied'));
      }
      window.open(contactSellerButton.dataset.contactSeller, '_blank', 'noopener');
    }
    if (event.target.id === 'PROD_MODAL') closeModal('PROD_MODAL');
  });

  $('#STORE_SEARCH')?.addEventListener('input', (event) => {
    storeSearch = event.target.value;
    renderProducts();
  });
  $('#AGC_DENOM_SELECT')?.addEventListener('change', renderGiftCardOrder);
  $('#XBOX_PLAN_SELECT')?.addEventListener('change', renderXboxGamePassOrder);
  $('#XBOX_MONTH_SELECT')?.addEventListener('change', renderXboxGamePassOrder);
  $('#NL_FORM')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = $('#NL_EMAIL');
    if (input?.value.includes('@')) {
      toast(i18n.t('subscribed'));
      input.value = '';
    } else {
      toast(i18n.t('emailInvalid'));
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

function setupScrollVideos() {
  const videos = $$('video[data-scroll-video]');
  if (!videos.length) return;

  videos.forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
  });

  const updateVideoState = (video, isActive) => {
    const wrap = video.closest('[data-scroll-video-wrap]');
    wrap?.classList.toggle('is-playing', isActive);
    if (isActive) {
      const playRequest = video.play();
      if (playRequest?.catch) playRequest.catch(() => wrap?.classList.add('is-blocked'));
      return;
    }
    video.pause();
  };

  if (!('IntersectionObserver' in window)) {
    videos.forEach((video) => updateVideoState(video, true));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      updateVideoState(entry.target, entry.isIntersecting && entry.intersectionRatio >= 0.45);
    });
  }, {
    threshold: [0, 0.25, 0.45, 0.7, 1],
    rootMargin: '0px 0px -8% 0px'
  });

  videos.forEach((video) => observer.observe(video));
}

function initPage() {
  setActiveNav();
  setupCursor();
  setupHeader();
  setupTheme();
  setupSearch();
  setupScrollVideos();
  setupEvents();
  buildSlider();
  buildTicker();
  buildFeatured();
  buildLower();
  buildCategories();
  buildFeed();
  buildStore();
  buildStoreAds();
  buildGiftCardCountries();
  buildGiftCardProduct();
  buildXboxHome();
  buildXboxGames();
  buildXboxGamePass();
  buildAbout();
  setupPrivate();
}

window.goPage = goPage;
window.addEventListener('DOMContentLoaded', initPage);
