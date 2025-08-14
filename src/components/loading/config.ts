// Configuration et helpers pour les composants de chargement
import { useState } from "react";

export const loadingConfig = {
  // Durées d'animation par défaut
  durations: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
  },

  // Messages par défaut
  messages: {
    loading: "Chargement en cours...",
    component: "Chargement du composant...",
    section: "Chargement de la section...",
    video: "Chargement de la vidéo...",
    image: "Chargement de l'image...",
    data: "Chargement des données...",
    error: "Une erreur est survenue",
    retry: "Réessayer",
  },

  // Tailles par défaut
  sizes: {
    sm: { width: "w-6", height: "h-6", icon: "w-4 h-4" },
    md: { width: "w-8", height: "h-8", icon: "w-5 h-5" },
    lg: { width: "w-12", height: "h-12", icon: "w-6 h-6" },
  },

  // Couleurs du thème
  colors: {
    primary: {
      bg: "bg-indigo-600",
      border: "border-indigo-500",
      text: "text-indigo-400",
      gradient: "from-indigo-500 to-purple-500",
    },
    secondary: {
      bg: "bg-slate-600",
      border: "border-slate-500",
      text: "text-slate-400",
      gradient: "from-slate-500 to-slate-600",
    },
    error: {
      bg: "bg-red-600",
      border: "border-red-500",
      text: "text-red-400",
      gradient: "from-red-500 to-orange-500",
    },
    success: {
      bg: "bg-green-600",
      border: "border-green-500",
      text: "text-green-400",
      gradient: "from-green-500 to-emerald-500",
    },
  },
};

// Helpers pour créer des variantes d'animation personnalisées
export const createAnimationVariants = {
  // Spin basique
  spin: (duration = 1) => ({
    rotate: 360,
    transition: {
      duration,
      repeat: Infinity,
      ease: "linear" as const,
    },
  }),

  // Pulse
  pulse: (duration = 1.5, scaleRange = [1, 1.1, 1]) => ({
    scale: scaleRange,
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),

  // Float
  float: (duration = 2, yRange = [-10, 10, -10]) => ({
    y: yRange,
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),

  // Dots sequence
  dotsSequence: (delay = 0.2) => ({
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  }),

  // Fade in
  fadeIn: (duration = 0.5, delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay },
  }),

  // Scale in
  scaleIn: (duration = 0.3, delay = 0) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration, delay },
  }),
};

// Utilitaires pour les classes CSS
export const cssUtils = {
  // Background patterns
  gridPattern:
    "bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]",

  // Gradient backgrounds
  gradients: {
    dark: "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950",
    primary: "bg-gradient-to-br from-indigo-600 to-purple-600",
    error: "bg-gradient-to-br from-red-600 to-orange-600",
    surface: "bg-slate-800/50 backdrop-blur-sm border border-slate-700",
  },

  // Common shadow classes
  shadows: {
    glow: "shadow-lg hover:shadow-xl hover:shadow-indigo-500/25",
    errorGlow: "shadow-lg hover:shadow-xl hover:shadow-red-500/25",
    subtle: "shadow-sm",
  },

  // Glass morphism
  glass: "backdrop-blur-sm bg-white/5 border border-white/10",

  // Loading states
  skeleton: "animate-pulse bg-slate-700/50 rounded",
};

// Types pour TypeScript
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  message?: string;
}

export interface LoadingSpinnerProps {
  size?: keyof typeof loadingConfig.sizes;
  variant?: "primary" | "secondary" | "minimal";
  message?: string;
  showIcon?: boolean;
  className?: string;
}

export interface DynamicLoaderProps {
  height?: string;
  minHeight?: string;
  message?: string;
  showSkeleton?: boolean;
  variant?: "section" | "card" | "widget" | "modal";
}

// Helper hooks pour gérer les états de chargement
export const useLoadingState = (initialState: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<string | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const setLoadingError = (errorMessage: string) => {
    setIsLoading(false);
    setError(errorMessage);
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
  };

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    reset,
  };
};

export default loadingConfig;
