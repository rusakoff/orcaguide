import Link from "next/link";
import type { ReactNode } from "react";
import { repositoryUrl } from "@/lib/shared";

export function LegalPage({
  eyebrow,
  title,
  summary,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <>
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

      <main className="legal-shell">
        <header className="legal-hero">
          <p className="kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{summary}</p>
          <time dateTime="2026-07-25">Обновлено {updatedAt}</time>
        </header>

        <article className="legal-copy">{children}</article>
      </main>

      <footer className="legal-footer">
        <span>ORCA GUIDE / ПРАВОВАЯ ИНФОРМАЦИЯ</span>
        <nav aria-label="Правовая информация">
          <Link href="/privacy">Политика конфиденциальности</Link>
          <Link href="/terms">Условия использования</Link>
          <Link href="/">На главную</Link>
        </nav>
      </footer>
    </>
  );
}
