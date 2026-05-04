# Pereuloq

Pereuloq — полностью статический сайт для GitHub Pages: только HTML, CSS и vanilla JavaScript.

## Структура проекта

- `index.html` — главная страница со слайдером, тикером и избранными материалами.
- `feed.html` — отдельная лента с фильтрами: новости, обновления, реклама, видео и посты.
- `store.html` — отдельный магазин с категориями, поиском и модальной карточкой продукта.
- `about.html` — страница о проекте.
- `private.html` — статическая private-страница с клиентским доступом по паролю.
- `css/style.css` — дизайн-система из `update2.html`.
- `js/main.js` — тема, hero-слайдер, тикер, фильтры ленты, поиск магазина, категории, модалки.
- `assets/`, `posts/`, `data/` — статические ассеты и существующий контент.

## Локальный запуск

Сборка не нужна. Запусти обычный статический сервер:

```bash
python3 -m http.server 3002
```

Открой:

```text
http://127.0.0.1:3002/
```

## Как собрать проект

Для GitHub Pages отдельной сборки нет: сайт уже собран как набор статических файлов.

Проверить файлы перед загрузкой можно так:

```bash
mkdir -p _site
cp -R assets css js posts data _site/
cp *.html CNAME yandex_*.html _site/ 2>/dev/null || true
```

Папку `_site` можно удалить после проверки.

## Деплой через GitHub Pages

Workflow уже настроен:

```text
.github/workflows/pages.yml
```

В GitHub:

1. Открой репозиторий.
2. Перейди в `Settings -> Pages`.
3. В `Source` выбери `GitHub Actions`.
4. Сделай push в ветку `main`.
5. Открой вкладку `Actions` и дождись успешного деплоя.

## Домен pereuloq.ru

В проекте есть файл:

```text
CNAME
```

Внутри:

```text
pereuloq.ru
```

В Reg.ru в DNS-зоне домена укажи A-записи для корня домена:

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

Если сайт будет опубликован не в аккаунте `SwiftDev028`, замени `swiftdev028.github.io.` на нужный GitHub Pages host.

## Переменные окружения

Эта версия полностью статическая и не использует backend, поэтому переменные окружения на GitHub Pages не нужны.

Не храни реальные пароли, ключи или admin-секреты в HTML/JS: публичные статические файлы видны всем. Если позже понадобится настоящий admin/private доступ, его нужно делать через сервер или внешний сервис авторизации.

## Загрузка на обычный хостинг

Если деплоить не через GitHub Pages, а вручную на хостинг, загрузи в публичную папку сайта:

```text
index.html
feed.html
store.html
about.html
private.html
shop.html
product.html
blog.html
CNAME
assets/
css/
js/
posts/
data/
```

Для публикации через GitHub:

```bash
git add .
git commit -m "Integrate static Pereuloq redesign"
git push origin main
```
