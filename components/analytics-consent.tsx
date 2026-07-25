"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const consentStorageKey = "orca-guide-analytics-consent";

type ConsentPreference = "accepted" | "declined" | null;

function readPreference(): ConsentPreference {
  try {
    const value = window.localStorage.getItem(consentStorageKey);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function AnalyticsConsent() {
  const [preference, setPreference] = useState<ConsentPreference>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPreference(readPreference());
    setReady(true);
  }, []);

  function savePreference(value: Exclude<ConsentPreference, null>) {
    try {
      window.localStorage.setItem(consentStorageKey, value);
    } catch {
      // The choice remains active for the current page when storage is blocked.
    }
    setPreference(value);
  }

  return (
    <>
      {preference === "accepted" ? (
        <Script id="yandex-metrika" strategy="afterInteractive">
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
      ) : null}

      {ready && preference === null ? (
        <aside
          className="consent-banner"
          aria-label="Настройки аналитических cookies"
          aria-live="polite"
        >
          <div>
            <strong>Аналитика сайта</strong>
            <p>
              Яндекс Метрика помогает понять, какие страницы читают чаще. Она
              загрузится только с вашего согласия. Подробнее в{" "}
              <Link href="/privacy">политике конфиденциальности</Link>.
            </p>
          </div>
          <div className="consent-actions">
            <button type="button" onClick={() => savePreference("declined")}>
              Отклонить
            </button>
            <button
              className="consent-accept"
              type="button"
              onClick={() => savePreference("accepted")}
            >
              Разрешить
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}

export function CookieSettingsButton() {
  function resetPreference() {
    try {
      window.localStorage.removeItem(consentStorageKey);
    } catch {
      // Reloading still stops the current analytics instance.
    }
    window.location.reload();
  }

  return (
    <button className="legal-action" type="button" onClick={resetPreference}>
      Изменить выбор cookies
    </button>
  );
}
