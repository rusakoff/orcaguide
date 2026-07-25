import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { CalendarDays, ExternalLink, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { StructuredData } from "@/components/structured-data";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getOfficialSourceUrl,
  getRelatedPages,
  organizationJsonLd,
} from "@/lib/seo";
import { editorialName, editorialUrl, gitConfig, siteUrl } from "@/lib/shared";
import { getPageImageUrl, getPageMarkdownUrl, source } from "@/lib/source";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const sourceUrl = getOfficialSourceUrl(page);
  const relatedPages = getRelatedPages(page);
  const dateModified = page.data.lastModified ?? new Date();

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <StructuredData
        data={[
          organizationJsonLd,
          getArticleJsonLd(page),
          getBreadcrumbJsonLd(page),
        ]}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <section className="article-meta" aria-label="Сведения о материале">
        <span className="article-meta-item">
          <UserRound aria-hidden="true" size={16} />
          <span className="article-meta-copy">
            <small>Редактор</small>
            <Link href={editorialUrl.replace(siteUrl, "")}>
              {editorialName}
            </Link>
          </span>
        </span>
        <span className="article-meta-item">
          <CalendarDays aria-hidden="true" size={16} />
          <span className="article-meta-copy">
            <small>Обновлено</small>
            <time dateTime={dateModified.toISOString()}>
              {new Intl.DateTimeFormat("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(dateModified)}
            </time>
          </span>
        </span>
        {sourceUrl ? (
          <a
            className="article-meta-item article-meta-source"
            href={sourceUrl}
            rel="external"
          >
            <ExternalLink aria-hidden="true" size={16} />
            <span className="article-meta-copy">
              <small>Материал</small>
              <strong>Официальный источник</strong>
            </span>
          </a>
        ) : null}
      </section>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
        <section
          className="related-pages"
          aria-labelledby="related-pages-title"
        >
          <h2 id="related-pages-title">Связанные материалы</h2>
          <ul>
            {relatedPages.map((relatedPage) => (
              <li key={relatedPage.url}>
                <Link href={relatedPage.url}>{relatedPage.data.title}</Link>
                {relatedPage.data.description ? (
                  <p>{relatedPage.data.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
    },
    openGraph: {
      type: "article",
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      images: getPageImageUrl(page).url,
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [getPageImageUrl(page).url],
    },
  };
}
