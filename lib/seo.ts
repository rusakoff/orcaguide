import {
  appName,
  editorialEmail,
  editorialName,
  editorialPolicyUrl,
  editorialUrl,
  logoUrl,
  repositoryUrl,
  siteDescription,
  siteUrl,
} from "./shared";
import { source } from "./source";

type Page = (typeof source)["$inferPage"];

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: appName,
  url: siteUrl,
  description: siteDescription,
  logo: {
    "@type": "ImageObject",
    url: logoUrl,
    contentUrl: logoUrl,
    width: 512,
    height: 512,
  },
  email: editorialEmail,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "editorial support",
    email: editorialEmail,
    url: editorialUrl,
    availableLanguage: ["ru"],
  },
  sameAs: [repositoryUrl],
  publishingPrinciples: editorialPolicyUrl,
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: appName,
  description: siteDescription,
  inLanguage: "ru-RU",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

export function getOfficialSourceUrl(page: Page) {
  const [section, ...rest] = page.slugs;

  if (!section) return null;
  if (section === "chto-takoe-orca") return "https://www.onorca.dev/docs";
  if (section === "community") return null;
  if (section === "reference") {
    return `https://www.onorca.dev/docs/${rest.join("/")}`;
  }

  return `https://www.onorca.dev/docs/${[section, ...rest].join("/")}`;
}

export function getRelatedPages(page: Page, limit = 3) {
  const pages = source.getPages();
  const currentIndex = pages.findIndex(
    (candidate) => candidate.url === page.url,
  );
  const section = page.slugs[0];
  const sameSection = pages.filter(
    (candidate) => candidate.url !== page.url && candidate.slugs[0] === section,
  );
  const adjacent = [
    pages[currentIndex - 1],
    pages[currentIndex + 1],
    ...pages.filter((candidate) => candidate.url !== page.url),
  ].filter(Boolean);

  return [...sameSection, ...adjacent]
    .filter(
      (candidate, index, list) =>
        list.findIndex((item) => item.url === candidate.url) === index,
    )
    .slice(0, limit);
}

export function getBreadcrumbJsonLd(page: Page) {
  const pages = source.getPages();
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Документация",
      item: `${siteUrl}/docs`,
    },
  ];

  if (page.url !== "/docs") {
    const section = page.slugs[0];
    const sectionPage = pages.find(
      (candidate) =>
        candidate.url !== page.url &&
        candidate.slugs.length === 1 &&
        candidate.slugs[0] === section,
    );

    if (page.slugs.length > 1 && sectionPage) {
      items.push({
        "@type": "ListItem",
        position: items.length + 1,
        name: sectionPage.data.title,
        item: new URL(sectionPage.url, siteUrl).toString(),
      });
    }

    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: page.data.title,
      item: new URL(page.url, siteUrl).toString(),
    });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export function getArticleJsonLd(page: Page) {
  const url = new URL(page.url, siteUrl).toString();
  const sourceUrl = getOfficialSourceUrl(page);
  const dateModified = (page.data.lastModified ?? new Date()).toISOString();

  return {
    "@type": page.url === "/docs" ? "WebPage" : "TechArticle",
    "@id": `${url}#article`,
    headline: page.data.title,
    description: page.data.description,
    url,
    mainEntityOfPage: url,
    inLanguage: "ru-RU",
    dateModified,
    ...(sourceUrl ? { isBasedOn: sourceUrl } : {}),
    author: {
      "@type": "Organization",
      name: editorialName,
      url: editorialUrl,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    image: new URL(
      `/og/docs/${[...page.slugs, "image.png"].join("/")}`,
      siteUrl,
    ).toString(),
  };
}
