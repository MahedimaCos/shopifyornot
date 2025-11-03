export const ensureProtocol = (raw?: string | null) => {
  if (!raw) {
    return "";
  }

  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
};
