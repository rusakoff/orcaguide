import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();
  const buildDate = new Date();
  const latestPageDate = pages.reduce<Date | undefined>((latest, page) => {
    const modified = page.data.lastModified ?? buildDate;
    if (!modified || (latest && modified <= latest)) return latest;
    return modified;
  }, undefined);

  return [
    {
      url: siteUrl,
      lastModified: latestPageDate,
    },
    ...pages.map((page) => ({
      url: new URL(page.url, siteUrl).toString(),
      lastModified: page.data.lastModified ?? buildDate,
    })),
  ];
}
