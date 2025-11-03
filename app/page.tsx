"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./page.module.css";

type ShopifyCheckResponse = {
  input_url: string;
  final_url?: string | null;
  is_shopify: boolean;
  confidence?: number | null;
  detected_signals?: string[] | null;
  shop_domain?: string | null;
  headers_sample?: Record<string, string>;
  elapsed_ms?: number;
};

const ensureProtocol = (raw?: string | null) => {
  if (!raw) {
    return "";
  }
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
};

const LandingPage = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ShopifyCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTechnical, setShowTechnical] = useState(false);

  const confidenceDisplay = useMemo(() => {
    if (!result || typeof result.confidence !== "number" || Number.isNaN(result.confidence)) {
      return "—";
    }
    const value = result.confidence <= 1 ? result.confidence * 100 : result.confidence;
    return `${Math.round(value)}%`;
  }, [result]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = url.trim();

    if (!trimmed) {
      setError("Please enter a website URL to check.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);
      setShowTechnical(false);

      const response = await fetch(
        `/api/check?url=${encodeURIComponent(trimmed)}`,
        {
          headers: { Accept: "application/json" },
        },
      );

      if (!response.ok) {
        throw new Error("Unable to reach the Shopify checker service right now.");
      }

      const data: ShopifyCheckResponse = await response.json();
      setResult({
        ...data,
        detected_signals: Array.isArray(data.detected_signals) ? data.detected_signals : [],
        headers_sample: data.headers_sample ?? undefined,
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while checking that site.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <svg
            className={styles.logo}
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4zm10 16H4V9h16v11z"
              fill="currentColor"
            />
            <circle cx="12" cy="14" r="2" fill="currentColor" />
          </svg>
        </div>
        <h1 className={styles.headline}>Check if a website is running on Shopify.</h1>
        <p className={styles.tagline}>Built for SalesOps teams who need answers fast.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="url"
            inputMode="url"
            name="shopify-checker-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="e.g. allbirds.com"
            aria-label="Website URL"
            autoComplete="url"
            disabled={loading}
          />
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Checking…
              </>
            ) : (
              "Check"
            )}
          </button>
        </form>

        <p className={styles.helper}>Press Enter or click Check to fetch the latest Shopify signals.</p>

        {error && <div className={styles.error}>{error}</div>}

        {result && (
          <section className={styles.resultCard} aria-live="polite">
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>Shopify store?</span>
              <span
                className={`${styles.badge} ${
                  result.is_shopify ? styles.badgeYes : styles.badgeNo
                }`}
              >
                {result.is_shopify ? "Yes" : "No"}
              </span>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Confidence</span>
                <span className={styles.infoValue}>{confidenceDisplay}</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Input URL</span>
                <span className={styles.infoValue}>{result.input_url || "—"}</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Final URL</span>
                <span className={styles.infoValue}>
                  {result.final_url ? (
                    <a
                      className={styles.link}
                      href={ensureProtocol(result.final_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.final_url}
                    </a>
                  ) : (
                    "—"
                  )}
                </span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Shopify domain</span>
                <span className={styles.infoValue}>
                  {result.shop_domain ? (
                    <a
                      className={styles.link}
                      href={ensureProtocol(result.shop_domain)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.shop_domain}
                    </a>
                  ) : (
                    "Not detected"
                  )}
                </span>
              </div>
            </div>

            {typeof result.elapsed_ms === "number" && (
              <p className={styles.elapsed}>Checked in {result.elapsed_ms} ms</p>
            )}

            <div className={styles.technicalSection}>
              <button
                className={styles.technicalToggle}
                type="button"
                onClick={() => setShowTechnical((previous) => !previous)}
              >
                {showTechnical ? "Hide technical signals" : "Show technical signals"}
              </button>

              {showTechnical && (
                <div className={styles.technicalContent}>
                  {result.detected_signals && result.detected_signals.length > 0 && (
                    <div>
                      <div className={styles.sectionTitle}>Detected Signals</div>
                      <ul className={styles.signalList}>
                        {result.detected_signals.map((signal) => (
                          <li key={signal} className={styles.signalItem}>
                            {signal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.headers_sample && Object.keys(result.headers_sample).length > 0 && (
                    <div>
                      <div className={styles.sectionTitle}>Headers Sample</div>
                      <ul className={styles.headersList}>
                        {Object.entries(result.headers_sample).map(([header, value]) => (
                          <li key={header} className={styles.headerItem}>
                            <strong>{header}:</strong> {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!result.detected_signals?.length &&
                    (!result.headers_sample || Object.keys(result.headers_sample).length === 0) && (
                      <p className={styles.helper}>No technical indicators were provided.</p>
                    )}
                </div>
              )}
            </div>
          </section>
        )}

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Made with care for SalesOps teams everywhere
          </p>
        </footer>
      </div>
    </main>
  );
};

export default LandingPage;
