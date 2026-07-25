import { StructuredData } from "@/components/structured-data";
import { type FaqItem, getFaqJsonLd } from "@/lib/faqs";

export function FaqSection({
  path,
  items,
}: {
  path: string;
  items: readonly FaqItem[];
}) {
  if (items.length < 5 || items.length > 6) {
    throw new Error(
      `Для страницы ${path} требуется от 5 до 6 вопросов, найдено: ${items.length}`,
    );
  }

  return (
    <section className="faq-section" aria-labelledby={`faq-${toId(path)}`}>
      <StructuredData data={[getFaqJsonLd(path, items)]} />
      <h2 id={`faq-${toId(path)}`}>Частые вопросы</h2>
      <div className="faq-list">
        {items.map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function toId(path: string) {
  return path === "/" ? "home" : path.replaceAll("/", "-").replace(/^-/, "");
}
