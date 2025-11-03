import { FormEvent } from "react";

import styles from "../page.module.css";

type ShopifyCheckerFormProps = {
  url: string;
  loading: boolean;
  helperText: string;
  onUrlChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const ShopifyCheckerForm = ({
  url,
  loading,
  helperText,
  onUrlChange,
  onSubmit,
}: ShopifyCheckerFormProps) => (
  <>
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type="url"
        inputMode="url"
        name="shopify-checker-url"
        value={url}
        onChange={(event) => onUrlChange(event.target.value)}
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
    <p className={styles.helper}>{helperText}</p>
  </>
);
