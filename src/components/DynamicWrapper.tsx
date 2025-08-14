"use client";

import { m } from "framer-motion";
import { ComponentType } from "react";
import LoadingSpinner, { DynamicComponentLoader } from "./LoadingSpinner";

// Composant de skeleton pour une meilleure UX
export function ComponentSkeleton({
  minHeight = "300px",
  showPulse = true,
}: {
  minHeight?: string;
  showPulse?: boolean;
}) {
  const pulseVariants = {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <m.div
      className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 space-y-4"
      style={{ minHeight }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header skeleton */}
      <div className="space-y-3">
        <m.div
          className="h-8 bg-slate-700/50 rounded-lg w-3/4"
          animate={showPulse ? pulseVariants : {}}
        />
        <m.div
          className="h-4 bg-slate-700/30 rounded w-1/2"
          animate={showPulse ? pulseVariants : {}}
          transition={{ delay: 0.1 }}
        />
      </div>

      {/* Content skeleton */}
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <m.div
            key={i}
            className="h-4 bg-slate-700/30 rounded"
            style={{ width: `${Math.random() * 40 + 60}%` }}
            animate={showPulse ? pulseVariants : {}}
            transition={{ delay: 0.2 + i * 0.1 }}
          />
        ))}
      </div>

      {/* Button skeleton */}
      <m.div
        className="h-10 bg-slate-700/40 rounded-lg w-32 mt-6"
        animate={showPulse ? pulseVariants : {}}
        transition={{ delay: 0.5 }}
      />
    </m.div>
  );
}

// Composant d'erreur pour les composants dynamiques
export function DynamicError({
  error,
  retry,
}: {
  error: Error;
  retry: () => void;
}) {
  return (
    <m.div
      className="flex flex-col items-center justify-center p-8 bg-red-900/10 backdrop-blur-sm border border-red-500/20 rounded-xl text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-slate-200 mb-2">
        Erreur de chargement
      </h3>

      <p className="text-slate-400 text-sm mb-6 max-w-md">
        {error.message || "Impossible de charger ce composant."}
      </p>

      <m.button
        onClick={retry}
        className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Réessayer
      </m.button>
    </m.div>
  );
}

// HOC pour wrapper les composants dynamiques
export function withDynamicLoading<T extends Record<string, unknown>>(
  _Component: ComponentType<T>,
  options: {
    loadingMessage?: string;
    minHeight?: string;
    showSkeleton?: boolean;
    fallback?: React.ReactNode;
  } = {},
) {
  const {
    loadingMessage = "Chargement du composant...",
    minHeight = "300px",
    showSkeleton = false,
    fallback,
  } = options;

  return function DynamicWrapper() {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (showSkeleton) {
      return <ComponentSkeleton minHeight={minHeight} />;
    }

    return (
      <DynamicComponentLoader height={minHeight} message={loadingMessage} />
    );
  };
}

// Exemple d'utilisation pour différents types de composants
export const createDynamicLoader = {
  // Pour les sections de page
  section: (message = "Chargement de la section...") => (
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-900/20 to-slate-800/20 backdrop-blur-sm border border-slate-800/50 rounded-xl">
      <LoadingSpinner message={message} />
    </div>
  ),

  // Pour les cartes/composants plus petits
  card: (message = "Chargement...") => (
    <div className="min-h-[200px] flex items-center justify-center bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-lg">
      <LoadingSpinner size="sm" message={message} />
    </div>
  ),

  // Pour les modales/overlays
  modal: (message = "Chargement du contenu...") => (
    <div className="min-h-[300px] flex items-center justify-center">
      <LoadingSpinner variant="secondary" message={message} />
    </div>
  ),

  // Pour les widgets/composants inline
  widget: () => (
    <div className="h-20 flex items-center justify-center bg-slate-800/30 rounded-lg">
      <LoadingSpinner size="sm" variant="minimal" />
    </div>
  ),

  // Pour les skeletons avec animation
  skeleton: (minHeight = "300px") => (
    <ComponentSkeleton minHeight={minHeight} />
  ),
};

export default withDynamicLoading;
