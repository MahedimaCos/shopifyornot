export default function Head() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "ShopifyOrNot",
            url: "https://shopifyornot.in",
            applicationCategory: "DeveloperApplication",
            description:
              "Detect if a website is built on Shopify. Free API and integrations for Zapier, n8n, and CRMs to qualify Shopify leads faster.",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0.00",
              priceCurrency: "USD",
            },
            creator: {
              "@type": "Organization",
              name: "ShopifyOrNot.in",
            },
          }),
        }}
      />
    </>
  );
}

