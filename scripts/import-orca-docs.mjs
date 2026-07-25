import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";
import TurndownService from "turndown";

const origin = "https://www.onorca.dev";
const output = path.resolve("content/docs");
const sitemap = `${origin}/sitemap.xml`;
const managedSections = [
  "start",
  "agents",
  "browser",
  "cli",
  "editing",
  "model",
  "recipes",
  "reference",
  "review",
];

const standalone = new Map([
  ["activity", "Уведомления и Inbox"],
  ["github-errors", "Troubleshooting & FAQ"],
  ["mobile", "Mobile"],
  ["notifications", "Уведомления и Inbox"],
  ["remote-servers", "Remote & SSH"],
  ["settings", "Settings Reference"],
  ["ssh", "Remote & SSH"],
  ["telemetry", "Privacy & Telemetry"],
  ["terminal", "Terminal"],
  ["troubleshooting", "Troubleshooting & FAQ"],
  ["ways-to-run", "Remote & SSH"],
]);

const sectionNames = {
  agents: "Работа с агентами",
  browser: "Browser & Design Mode",
  cli: "Orca CLI & Skills",
  editing: "Редактирование в Orca",
  model: "Модель Orca",
  recipes: "Рецепты",
  review: "Ревью и отправка кода",
};

const localEnhancements = new Map([
  [
    "agents/cursor-cli",
    `Проверка запуска
---------------

После открытия агента убедитесь, что терминал находится в каталоге выбранного worktree. Отправьте безопасный запрос без изменения файлов, например попросите перечислить структуру проекта. В боковой панели Orca должен измениться индикатор состояния агента.

Если Cursor не появляется в списке, откройте обычный терминал Orca и выполните \`cursor-agent --version\`. Ошибка «command not found» означает, что исполняемый файл не доступен в \`PATH\` процесса Orca. Перезапустите приложение после установки CLI и повторите проверку.

Безопасность и следующий шаг
----------------------------

Cursor CLI использует учётную запись и настройки самого Cursor. Не вставляйте токены в описание worktree или запрос агенту. Перед коммитом просмотрите созданный код через [просмотр diff](/docs/review/diff-viewer). Для сравнения Cursor с другими агентами используйте рецепт [«Три агента решают одну задачу»](/docs/recipes/parallel-agents).`,
  ],
  [
    "cli/worktree-checkpoints",
    `Проверка результата
-------------------

После записи снова выполните \`orca worktree current --json\` и убедитесь, что поле \`comment\` содержит актуальный статус. Комментарий должен помогать продолжить работу без чтения всей истории терминала: укажите подтверждённый результат, оставшийся риск и ближайший следующий шаг.

Не помещайте в контрольную точку токены, пароли, приватные URL и персональные данные. Комментарий виден другим участникам, имеющим доступ к рабочему пространству.

Что дальше
----------

Для координации нескольких исполнителей используйте [оркестрацию](/docs/cli/orchestration), а для быстрого перехода к worktree с блокировкой — рецепт [«Переключение между десятью worktree»](/docs/recipes/jump-worktrees).`,
  ],
  [
    "review/attribution",
    `Ограничения
-----------

Индикатор показывает происхождение затронутых строк в текущем рабочем процессе, но не доказывает качество или безопасность изменения. Код агента всё равно должен пройти тесты, статический анализ и человеческое ревью. После ручного редактирования строки могут считаться человеческими, хотя первоначальная идея была создана агентом.

Что делать дальше
-----------------

Откройте [просмотр diff](/docs/review/diff-viewer), проверьте особенно внимательно отмеченные агентом диапазоны и оставьте [построчные комментарии](/docs/review/annotate-ai-diff). После исправлений выполните проектные проверки и только затем переходите к [коммиту и отправке](/docs/review/commit-push).`,
  ],
  [
    "recipes/review-ai-diff",
    `Проверка результата
-------------------

Перед отправкой ветки выполните проверки проекта и просмотрите итоговый diff без фильтров. Убедитесь, что комментарии закрыты не формально, а соответствующим изменением кода. Если агент расширил область задачи, вынесите лишнее в отдельный worktree или верните его на доработку.

Следующий шаг — [создать коммит и отправить ветку](/docs/review/commit-push). Для оценки происхождения строк используйте [индикаторы авторства](/docs/review/attribution).`,
  ],
  [
    "recipes/jump-worktrees",
    `Проверка очереди
---------------

Перед завершением сессии убедитесь, что у каждого активного worktree понятен следующий шаг, а жёлтые индикаторы не скрывают вопрос агента. Для задач, которые должны пережить передачу другому участнику, сохраните краткий комментарий и ссылку на issue или pull request.

Если несколько агентов решают одну проблему независимо, используйте рецепт [«Три агента решают одну задачу»](/docs/recipes/parallel-agents). Сведения о восстановлении процессов после закрытия окна находятся в статье [«Восстановление сессии»](/docs/model/session-restore).`,
  ],
]);

const turndown = new TurndownService({
  codeBlockStyle: "fenced",
  emDelimiter: "_",
});
turndown.remove(["button", "svg", "style", "script", "nav"]);
turndown.addRule("images", {
  filter: "img",
  replacement: (_content, node) => {
    const src = node.getAttribute("src") || "";
    const absoluteSrc = src.startsWith("/") ? `${origin}${src}` : src;
    return `\n\n![${node.getAttribute("alt") || "Image"}](${absoluteSrc})\n\n`;
  },
});

function clean(text) {
  return text
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\[Copy\]\([^)]*\)/g, "")
    .trim();
}

function escapeYaml(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ")
    .trim();
}

function destination(url) {
  const relative = new URL(url).pathname.replace(/^\/docs\/?/, "");
  if (!relative) return { section: null, file: "chto-takoe-orca" };
  const parts = relative.split("/");
  if (parts.length > 1)
    return { section: parts[0], file: parts.slice(1).join("--") };
  return {
    section: "reference",
    file: parts[0],
    sectionName: standalone.get(parts[0]) || "Дополнительно",
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "orca-ru-local-docs-importer/1.0" },
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

async function importPage(url) {
  const html = await fetchText(url);
  const $ = cheerio.load(html);
  const article = $("article").first();
  if (!article.length) throw new Error(`article not found: ${url}`);

  const title =
    article.find("h1").first().text().trim() ||
    $("title")
      .first()
      .text()
      .replace(/ — Orca Docs$/, "")
      .trim();
  const description =
    article.find("h1").first().nextAll("p").first().text().trim() || title;
  article.find("h1").first().remove();
  const markdown = clean(turndown.turndown(article.html() || ""));
  const { section, file, sectionName } = destination(url);
  const enhancement = localEnhancements.get(
    [section, file].filter(Boolean).join("/"),
  );
  const sectionPath = section ? path.join(output, section) : output;
  await mkdir(sectionPath, { recursive: true });
  const frontmatter = `---\ntitle: "${escapeYaml(title)}"\ndescription: "${escapeYaml(description)}"\n---\n\n`;
  await writeFile(
    path.join(sectionPath, `${file}.mdx`),
    `${frontmatter}${markdown}${enhancement ? `\n\n${enhancement}` : ""}\n`,
    "utf8",
  );
  return { section, sectionName, file };
}

async function main() {
  const xml = await fetchText(sitemap);
  const urls = [
    ...xml.matchAll(
      /<loc>(https:\/\/www\.onorca\.dev\/docs(?:\/[^<]*)?)<\/loc>/g,
    ),
  ].map((match) => match[1]);
  if (!urls.length) throw new Error("No documentation URLs in sitemap");

  await mkdir(output, { recursive: true });
  await Promise.all(
    managedSections.map((section) =>
      rm(path.join(output, section), { recursive: true, force: true }),
    ),
  );

  const imported = [];
  for (let index = 0; index < urls.length; index += 4) {
    const batch = urls.slice(index, index + 4);
    const result = await Promise.all(batch.map((url) => importPage(url)));
    imported.push(...result);
    console.log(
      `Imported ${Math.min(index + batch.length, urls.length)}/${urls.length}`,
    );
  }

  const grouped = new Map();
  for (const item of imported) {
    if (!item.section) continue;
    if (!grouped.has(item.section))
      grouped.set(item.section, {
        name: item.sectionName || sectionNames[item.section] || item.section,
        pages: [],
      });
    grouped.get(item.section).pages.push(item.file);
  }
  for (const [section, value] of grouped) {
    value.pages.sort();
    await writeFile(
      path.join(output, section, "meta.json"),
      `${JSON.stringify({ title: value.name, pages: value.pages }, null, 2)}\n`,
    );
  }
  const sections = [...grouped.keys()].sort((a, b) =>
    a === "start" ? -1 : b === "start" ? 1 : a.localeCompare(b),
  );
  await writeFile(
    path.join(output, "meta.json"),
    `${JSON.stringify(
      {
        title: "ОРКА · База",
        pages: ["index", "chto-takoe-orca", ...sections, "community"],
      },
      null,
      2,
    )}\n`,
  );
  console.log(`Done: ${imported.length} pages in ${output}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
