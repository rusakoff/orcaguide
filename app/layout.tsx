import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import Script from "next/script";
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
        alt: "Orca Guide — русскоязычная база знаний по Orca ADE",
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
      <head>
        <Script id="yandex-metrika" strategy="lazyOnload">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=111020992', 'ym');

            ym(111020992, 'init', {
              ssr: true,
              clickmap: true,
              ecommerce: 'dataLayer',
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
        <noscript>
          <div>
            {/* biome-ignore lint/performance/noImgElement: the tracking pixel must load directly from Yandex */}
            <img
              src="https://mc.yandex.ru/watch/111020992"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
