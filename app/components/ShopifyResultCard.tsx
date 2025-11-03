import { ReactNode } from "react";

import styles from "../page.module.css";
import { ensureProtocol } from "../lib/url";
import { NormalizedShopifyCheckResponse } from "../types/shopify";
import { TechnicalDetails } from "./TechnicalDetails";

type ShopifyInfoDescriptor = {
  key: string;
  label: string;
  render: (result: NormalizedShopifyCheckResponse) => ReactNode;
};

const defaultInfoSections: ShopifyInfoDescriptor[] = [
  {
    key: "input-url",
    label: "Input URL",
    render: (result) => result.input_url || "—",
  },
  {
    key: "final-url",
    label: "Final URL",
    render: (result) =>
      result.final_url ? (
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
      ),
  },
  {
    key: "shop-domain",
    label: "Shopify domain",
    render: (result) =>
      result.shop_domain ? (
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
      ),
  },
];

type ShopifyResultCardProps = {
  result: NormalizedShopifyCheckResponse;
  confidenceDisplay: string;
  showTechnical: boolean;
  onToggleTechnical: () => void;
  infoSections?: ShopifyInfoDescriptor[];
};

export const ShopifyResultCard = ({
  result,
  confidenceDisplay,
  showTechnical,
  onToggleTechnical,
  infoSections = defaultInfoSections,
}: ShopifyResultCardProps) => (
  <section className={styles.resultCard} aria-live="polite">
    <div className={styles.statusRow}>
      <span className={styles.statusLabel}>Shopify store?</span>
      <span
        className={`${styles.badge} ${result.is_shopify ? styles.badgeYes : styles.badgeNo}`}
      >
        {result.is_shopify ? "Yes" : "No"}
      </span>
    </div>

    <div className={styles.infoGrid}>
      <div className={styles.infoBlock}>
        <span className={styles.infoLabel}>Confidence</span>
        <span className={styles.infoValue}>{confidenceDisplay}</span>
      </div>
      {infoSections.map((descriptor) => (
        <div key={descriptor.key} className={styles.infoBlock}>
          <span className={styles.infoLabel}>{descriptor.label}</span>
          <span className={styles.infoValue}>{descriptor.render(result)}</span>
        </div>
      ))}
    </div>

    {typeof result.elapsed_ms === "number" && (
      <p className={styles.elapsed}>Checked in {result.elapsed_ms} ms</p>
    )}

    <TechnicalDetails result={result} showTechnical={showTechnical} onToggle={onToggleTechnical} />
  </section>
);
