import { ShopifyCheckResponse } from "../types/shopify";

export const formatConfidence = (response: ShopifyCheckResponse | null) => {
  if (!response || typeof response.confidence !== "number" || Number.isNaN(response.confidence)) {
    return "—";
  }

  const value = response.confidence <= 1 ? response.confidence * 100 : response.confidence;

  return `${Math.round(value)}%`;
};
