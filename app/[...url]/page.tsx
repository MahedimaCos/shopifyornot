'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useShopifyCheck } from '../hooks/useShopifyCheck';
import ShopifyCheckerForm from '../components/ShopifyCheckerForm';
import ShopifyResultCard from '../components/ShopifyResultCard';
import LightRaysBackground from '../components/LightRaysBackground';
import ShopifyHero from '../components/ShopifyHero';
import ErrorAlert from '../components/ErrorAlert';
import MarketingCopy from '../components/MarketingCopy';
import DetectionMethods from '../components/DetectionMethods';

export default function DynamicPage() {
  const params = useParams();

  // Get the URL from the catch-all route parameter and decode it
  const rawUrlFromPath = params.url ? (Array.isArray(params.url) ? params.url.join('/') : params.url) : '';

  // Decode the URL and clean it up
  let urlFromPath = '';
  try {
    urlFromPath = decodeURIComponent(rawUrlFromPath);
    // Remove any protocol if it was accidentally included
    urlFromPath = urlFromPath.replace(/^(https?:\/{0,2})/i, '');
  } catch {
    // If decoding fails, use the raw path
    urlFromPath = rawUrlFromPath;
  }

  const {
    url,
    setUrl,
    result,
    loading,
    error,
    showTechnical,
    toggleTechnical,
    handleSubmit,
    confidenceDisplay,
  } = useShopifyCheck({
    initialUrl: urlFromPath,
    autoCheck: true,
  });

  // Track if we've completed a check (for showing "Go Back" button)
  const hasCompletedCheck = result !== null;

  // Update the URL when the route changes
  useEffect(() => {
    if (urlFromPath) {
      setUrl(urlFromPath);
    }
  }, [urlFromPath, setUrl]);

  return (
    <>
      {/* Light Rays Background */}
      <LightRaysBackground />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-200px)] flex items-center justify-center">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <ShopifyHero />

          {/* Checker Form */}
          <ShopifyCheckerForm
            url={url}
            loading={loading}
            helperText=""
            onSubmit={handleSubmit}
            onUrlChange={setUrl}
            showGoBack={hasCompletedCheck}
            originalUrl={urlFromPath}
          />

          {/* Marketing Copy */}
          {!result && <MarketingCopy />}

          {/* Error Display */}
          {error && (
            <ErrorAlert message={error} />
          )}

          {/* Result Display */}
          {result && (
            <div className="mt-8">
              <ShopifyResultCard
                result={result}
                confidenceDisplay={confidenceDisplay}
                showTechnical={showTechnical}
                onToggleTechnical={toggleTechnical}
              />
            </div>
          )}

          {/* Detection Methods */}
          {!result && <DetectionMethods />}

        </div>
      </section>


    </>
  );
}
