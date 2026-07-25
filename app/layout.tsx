import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { AnalyticsConsent } from "@/components/analytics-consent";
import {
  appName,
  editorialName,
  editorialUrl,
  siteDescription,
  siteUrl,
} from "@/lib/shared";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: editorialName, url: editorialUrl }],
  creator: editorialName,
  publisher: appName,
  category: "software documentation",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: appName,
    url: "/",
    title: appName,
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Orca Guide, документация Orca ADE на русском языке",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="dark" style={{ colorScheme: "dark" }}>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
        <AnalyticsConsent />
      </body>
    </html>
  );
}
