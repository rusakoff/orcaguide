import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();
const siteBuildTime = process.env.SITE_BUILD_TIME ?? new Date().toISOString();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    SITE_BUILD_TIME: siteBuildTime,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.onorca.dev",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.orcaguide.ru",
          },
        ],
        destination: "https://orcaguide.ru/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    const developmentScriptSource =
      process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      `script-src 'self' 'unsafe-inline'${developmentScriptSource} https://mc.yandex.ru`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.onorca.dev https://mc.yandex.ru",
      "font-src 'self' data:",
      "connect-src 'self' https://mc.yandex.ru https://yandex.ru",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
        ],
      },
    ];
  },
};

export default withMDX(config);
