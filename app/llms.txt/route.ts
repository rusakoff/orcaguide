import { llms } from "fumadocs-core/source";
import {
  editorialName,
  editorialPolicyUrl,
  editorialUrl,
  siteDescription,
  siteUrl,
} from "@/lib/shared";
import { source } from "@/lib/source";

export const revalidate = false;

export function GET() {
  const preamble = `# Orca Guide

> ${siteDescription}

- Сайт: ${siteUrl}
- Язык: русский
- Статус: независимый проект сообщества, не связанный с разработчиками Orca
- Ответственный редактор: ${editorialName}, ${editorialUrl}
- Редакционная политика и исправления: ${editorialPolicyUrl}
- Импортированные статьи содержат ссылку на официальный первоисточник

`;

  return new Response(`${preamble}${llms(source).index()}`);
}
