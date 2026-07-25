import {
  ArrowUpRight,
  BookOpen,
  Bot,
  GitBranch,
  Languages,
  MessageCircle,
  Route,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { repositoryUrl } from "@/lib/shared";

export default function HomePage() {
  return (
    <>
      <StructuredData data={[organizationJsonLd, websiteJsonLd]} />
      <header className="home-header">
        <Link className="home-brand" href="/" aria-label="Главная Orca Guide">
          ORCA GUIDE
        </Link>
        <nav aria-label="Основная навигация">
          <Link href="/docs">Документация</Link>
          <Link href="/docs/community/about">О проекте</Link>
          <a href={repositoryUrl}>GitHub</a>
        </nav>
      </header>

      <main className="home-shell">
        <section className="hero">
          <div className="eyebrow">НЕЗАВИСИМАЯ БАЗА ЗНАНИЙ · RU</div>
          <div className="hero-grid">
            <div>
              <p className="kicker">ORCA GUIDE / СООБЩЕСТВО</p>
              <h1>
                Среда для тех,
                <br />
                <em>кто работает</em>
                <br />
                вместе с агентами.
              </h1>
              <p className="hero-copy">
                Документация Orca ADE на русском языке. В ней есть установка,
                работа с ИИ-агентами и git worktree, справочник CLI и разбор
                проверки кода.
              </p>
              <div className="hero-actions">
                <Link className="primary-link" href="/docs">
                  <BookOpen size={18} aria-hidden="true" />
                  Открыть базу
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link className="quiet-link" href="/docs/chto-takoe-orca">
                  Разобраться за минуту
                </Link>
              </div>
            </div>
            <aside className="mission-card">
              <span className="card-index">01 / ЗАЧЕМ ЭТО</span>
              <p>
                Неофициальная документация для разработчиков, которые запускают
                несколько агентов и проверяют их изменения перед коммитом.
              </p>
              <div className="card-rule" />
              <span>
                Мы указываем первоисточник, дату обновления и ответственного
                редактора для каждого материала.
              </span>
            </aside>
          </div>
        </section>

        <section className="answer-section" aria-labelledby="what-is-orca">
          <p className="kicker">КОРОТКИЙ ОТВЕТ</p>
          <h2 id="what-is-orca">Что такое Orca ADE?</h2>
          <p>
            Orca объединяет в настольном приложении несколько консольных
            ИИ-агентов. Для каждой задачи она создаёт отдельный git worktree,
            открывает терминал агента, браузер и просмотр изменений.
            Изолированные worktree не дают Claude Code, Codex, Cursor CLI и
            другим агентам перезаписывать файлы друг друга. Разработчик
            сравнивает результаты, комментирует строки diff, запускает проверки
            и отправляет выбранную ветку в pull request. Orca не является
            моделью и не заменяет Git. Она собирает уже используемые инструменты
            в одном приложении.
          </p>
          <Link href="/docs/chto-takoe-orca">
            Подробное объяснение и ограничения Orca
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </section>

        <section className="routes-section">
          <div className="section-label">
            <Route size={16} aria-hidden="true" /> НАЧАТЬ ОТСЮДА
          </div>
          <div className="route-grid">
            <Link href="/docs/chto-takoe-orca" className="route-card">
              <span>01</span>
              <h2>Что такое Orca?</h2>
              <p>Возможности ADE, worktree, агенты и границы продукта.</p>
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/docs/reference/install" className="route-card">
              <span>02</span>
              <h2>Установка</h2>
              <p>macOS, Windows, Linux, каналы обновлений и первый запуск.</p>
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/docs/reference/first-session" className="route-card">
              <span>03</span>
              <h2>Первая сессия</h2>
              <p>Как запустить трёх агентов и сравнить их результаты.</p>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="audience-section" aria-labelledby="choose-route">
          <div>
            <p className="kicker">ВЫБЕРИТЕ СЦЕНАРИЙ</p>
            <h2 id="choose-route">С чего начать</h2>
          </div>
          <div className="audience-grid">
            <article>
              <Bot aria-hidden="true" />
              <h3>Работа с агентами</h3>
              <p>
                Подключите Claude Code, Codex или Cursor CLI, следите за
                состоянием сессий и сравнивайте решения в изолированных ветках.
              </p>
              <Link href="/docs/agents/supported">Выбрать агента</Link>
            </article>
            <article>
              <GitBranch aria-hidden="true" />
              <h3>Worktree и ревью</h3>
              <p>
                Разделяйте задачи, проверяйте diff построчно, оставляйте агенту
                комментарии и отправляйте только проверенный результат.
              </p>
              <Link href="/docs/model/worktrees">Понять модель Orca</Link>
            </article>
            <article>
              <TerminalSquare aria-hidden="true" />
              <h3>CLI и автоматизация</h3>
              <p>
                Управляйте worktree, браузером и несколькими агентами из
                терминала, навыков и повторяемых автоматизаций.
              </p>
              <Link href="/docs/cli/overview">Открыть руководство CLI</Link>
            </article>
          </div>
        </section>

        <section className="principles">
          <div>
            <p className="kicker">КАК УСТРОЕНА БАЗА</p>
            <h2>
              Как мы работаем
              <br />с переводами
            </h2>
          </div>
          <div className="principle-list">
            <p>
              <Languages size={20} aria-hidden="true" />
              <b>Источник рядом</b>
              <span>
                У импортированной статьи есть ссылка на официальную версию,
                чтобы проверить формулировку и актуальное поведение.
              </span>
            </p>
            <p>
              <ShieldCheck size={20} aria-hidden="true" />
              <b>Ответственность</b>
              <span>
                На странице видны редактор и дата обновления. Политика проекта
                объясняет, как исправляются ошибки и отделяется опыт сообщества.
              </span>
            </p>
            <p>
              <MessageCircle size={20} aria-hidden="true" />
              <b>Практический контекст</b>
              <span>
                Локальные заметки дополняют перевод проверенными примерами, но
                не выдаются за официальную позицию команды Orca.
              </span>
            </p>
          </div>
        </section>

        <section
          className="trust-section"
          aria-labelledby="independent-project"
        >
          <div>
            <p className="kicker">ПРОЗРАЧНОСТЬ</p>
            <h2 id="independent-project">Кто выпускает Orca Guide</h2>
          </div>
          <div>
            <p>
              Orca Guide не связан с разработчиками Orca и не заменяет
              официальную документацию. Названия продуктов и исходные материалы
              принадлежат их владельцам. Репозиторий базы открыт: исправление
              можно предложить через GitHub, а спорную информацию сверить по
              ссылке на источник.
            </p>
            <div className="trust-links">
              <Link href="/docs/community/about">О проекте и контакты</Link>
              <Link href="/docs/community/editorial-policy">
                Редакционная политика
              </Link>
              <Link href="/docs/community/how-to-contribute">
                Предложить исправление
              </Link>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          <span>ORCA GUIDE / LOCAL FIRST</span>
          <nav aria-label="Правовая информация">
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/terms">Условия использования</Link>
            <a href="https://github.com/stablyai/orca">
              <GitBranch size={15} aria-hidden="true" /> Официальный проект Orca
            </a>
          </nav>
        </footer>
      </main>
    </>
  );
}
