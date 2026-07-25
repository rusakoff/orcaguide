import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { appName, siteUrl } from '@/lib/shared';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: 'Независимая русскоязычная база знаний по Orca ADE.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: appName,
    url: '/',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
