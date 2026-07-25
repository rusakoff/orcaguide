# Orca Guide

Локальная независимая русскоязычная база знаний по Orca ADE. Сайт сделан на Next.js и [Fumadocs](https://www.fumadocs.dev/docs).

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000. Проверка production-сборки: `npm run build`.
Production-сайт: https://orcaguide.ru.

## Перевод и содержание

- Статьи находятся в `content/docs` как MDX-файлы.
- Навигация задаётся через `meta.json` в папках разделов.
- Ссылки на официальные страницы Orca сохраняются в поле `source` во frontmatter.
- Практические русскоязычные заметки добавляйте в `content/docs/community`.

### Синхронизация официальных оригиналов

```bash
npm run import:orca
```

Команда получает публичную карту сайта Orca и сохраняет все доступные статьи непосредственно в разделах `content/docs`. При каждой синхронизации официальные разделы пересоздаются, а `content/docs/community` и корневая страница сохраняются.

Этот проект не аффилирован с Orca. Актуальная официальная документация: https://www.onorca.dev/docs.
