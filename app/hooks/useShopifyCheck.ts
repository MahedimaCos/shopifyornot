import { FormEvent, useCallback, useMemo, useState } from "react";

import { formatConfidence } from "../lib/confidence";
import { createShopifyChecker } from "../services/shopifyChecker";
import { NormalizedShopifyCheckResponse } from "../types/shopify";

type UseShopifyCheckOptions = {
  fetcher?: typeof fetch;
};

export const useShopifyCheck = ({ fetcher }: UseShopifyCheckOptions = {}) => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<NormalizedShopifyCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTechnical, setShowTechnical] = useState(false);

  const checker = useMemo(() => createShopifyChecker({ fetcher }), [fetcher]);
  const confidenceDisplay = useMemo(() => formatConfidence(result), [result]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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

        const data = await checker.check(trimmed);
        setResult(data);
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Something went wrong while checking that site.",
        );
      } finally {
        setLoading(false);
      }
    },
    [checker, url],
  );

  const toggleTechnical = useCallback(() => {
    setShowTechnical((previous) => !previous);
  }, []);

  return {
    url,
    setUrl,
    result,
    loading,
    error,
    showTechnical,
    toggleTechnical,
    handleSubmit,
    confidenceDisplay,
  };
};
