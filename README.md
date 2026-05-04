# Pereuloq

Статическая версия сайта Pereuloq для GitHub Pages: главная, отдельная лента, отдельный магазин, страницы продуктов и статьи.

## Что работает на GitHub Pages

- `/` - главная страница нового дизайна.
- `/feed/` - отдельная лента с новостями, обновлениями, рекламой, видео и постами.
- `/shop/` - магазин с категориями, поиском и сеткой цифровых продуктов.
- `/shop/[productId]/` - карточка продукта с `Contact Seller` и `Buy`.
- `/post/[slug]/` - статические страницы статей.

## Что убрано из GitHub-версии

GitHub Pages не запускает Node.js-сервер, поэтому из активной сборки убраны:

- админ-панель `/admin`;
- API routes `/api/*`;
- server-side cookies;
- Stripe checkout;
- Sanity Studio.

Покупка в магазине теперь работает как статическая кнопка связи/заказа через email.

## Локальный запуск

```bash
npm install
npm run dev
```

Открой `http://localhost:3000`.

## Статическая сборка

```bash
npm run build
```

Next.js соберет статический сайт в папку `out`.

## Деплой через GitHub Pages

В проект добавлен workflow:

```text
.github/workflows/pages.yml
```

После пуша в `main` GitHub Actions автоматически:

1. установит зависимости;
2. соберет статический сайт;
3. положит `CNAME` в `out`;
4. опубликует сайт через GitHub Pages.

## Настройка GitHub

В репозитории открой:

```text
Settings -> Pages
```

Выбери:

```text
Source: GitHub Actions
```

В поле custom domain укажи:

```text
pereuloq.ru
```

## DNS в Reg.ru

Для GitHub Pages в DNS-зоне домена `pereuloq.ru` нужны A-записи:

```text
A @ 185.199.108.153
A @ 185.199.109.153
A @ 185.199.110.153
A @ 185.199.111.153
```

Для `www`:

```text
CNAME www swiftdev028.github.io.
```

Если репозиторий будет не у `SwiftDev028`, замени `swiftdev028.github.io.` на имя нужного GitHub-аккаунта.

## Публикация изменений

```bash
git add .
git commit -m "Prepare static GitHub Pages site"
git push origin main
```

После пуша смотри прогресс в GitHub:

```text
Repository -> Actions
```
