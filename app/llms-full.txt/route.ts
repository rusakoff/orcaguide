import {
  editorialName,
  editorialPolicyUrl,
  siteDescription,
  siteUrl,
} from "@/lib/shared";
import { getLLMText, source } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);
  const preamble = `# Полный корпус Orca Guide

${siteDescription}

Независимый русскоязычный проект сообщества. Ответственный редактор: ${editorialName}.
Сайт: ${siteUrl}
Редакционная политика: ${editorialPolicyUrl}

---
`;

  return new Response(`${preamble}\n${scanned.join("\n\n")}`);
}
