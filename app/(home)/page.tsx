import Link from 'next/link';
import { ArrowUpRight, BookOpen, GitBranch, Languages, MessageCircle, Route } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="home-shell">
      <section className="hero">
        <div className="eyebrow"><span className="signal" /> НЕЗАВИСИМАЯ БАЗА ЗНАНИЙ · RU</div>
        <div className="hero-grid">
          <div>
            <p className="kicker">ORCA GUIDE / СООБЩЕСТВО</p>
            <h1>Среда для тех,<br /><em>кто работает</em><br />вместе с агентами.</h1>
            <p className="hero-copy">Русскоязычная рабочая база по Orca ADE: исходные материалы, понятные переводы, рецепты и заметки из реальной практики.</p>
            <div className="hero-actions">
              <Link className="primary-link" href="/docs"><BookOpen size={18} />Открыть базу <ArrowUpRight size={17} /></Link>
              <a className="quiet-link" href="https://www.onorca.dev/docs" target="_blank" rel="noreferrer">Оригинальные docs <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <aside className="mission-card">
            <span className="card-index">01 / ЗАЧЕМ ЭТО</span>
            <p>Неофициальное, локальное пространство для чтения и перевода документации Orca.</p>
            <div className="card-rule" />
            <span>Каждая исходная статья ведёт к первоисточнику и сохраняется отдельно от перевода.</span>
          </aside>
        </div>
      </section>

      <section className="routes-section">
        <div className="section-label"><Route size={16} /> НАЧАТЬ ОТСЮДА</div>
        <div className="route-grid">
          <Link href="/docs/chto-takoe-orca" className="route-card"><span>01</span><h2>Что такое Orca?</h2><p>Быстрая ориентация в ADE, ворктри и параллельных агентах.</p><ArrowUpRight /></Link>
          <Link href="/docs/reference/install" className="route-card"><span>02</span><h2>Установка</h2><p>macOS, Windows, Linux, каналы обновлений и первый запуск.</p><ArrowUpRight /></Link>
          <Link href="/docs/reference/first-session" className="route-card"><span>03</span><h2>Первая сессия</h2><p>Три агента, три ворктри, один результат — пошагово.</p><ArrowUpRight /></Link>
        </div>
      </section>

      <section className="principles">
        <div><p className="kicker">КАК УСТРОЕНА БАЗА</p><h2>Перевод — это<br />постепенный процесс.</h2></div>
        <div className="principle-list">
          <p><Languages size={20} /><b>Исходник рядом</b><span>Сначала сохраняем оригинал, затем переводим по частям и не теряем контекст.</span></p>
          <p><BookOpen size={20} /><b>Документация как код</b><span>Статьи лежат в <code>content/docs</code> как MDX-файлы: редактируйте локально в привычном редакторе.</span></p>
          <p><MessageCircle size={20} /><b>Место для опыта</b><span>Раздел «Сообщество» предназначен для заметок, рецептов и уточнений от русскоязычных пользователей.</span></p>
        </div>
      </section>

      <footer className="home-footer"><span>ORCA GUIDE / LOCAL FIRST</span><a href="https://github.com/stablyai/orca" target="_blank" rel="noreferrer"><GitBranch size={15} /> Проект Orca</a></footer>
    </main>
  );
}
