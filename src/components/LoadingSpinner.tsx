"use client";

import { m } from "framer-motion";
import { Code, Zap } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "minimal";
  message?: string;
  showIcon?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  variant = "primary",
  message,
  showIcon = true,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const containerSizes = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const spinVariants = {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear" as const,
    },
  };

  const pulseVariants = {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const dotVariants = {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center">
        <m.div
          className={`${sizeClasses[size]} border-2 border-transparent border-t-indigo-500 border-r-purple-500 rounded-full`}
          animate={spinVariants}
        />
      </div>
    );
  }

  if (variant === "secondary") {
    return (
      <div
        className={`flex flex-col items-center justify-center ${containerSizes[size]}`}
      >
        <m.div className="relative" animate={pulseVariants}>
          <div
            className={`${sizeClasses[size]} bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center border border-slate-600`}
          >
            {showIcon && (
              <Code className={`${iconSizes[size]} text-slate-400`} />
            )}
          </div>
        </m.div>
        {message && (
          <p className="text-slate-500 text-sm mt-3 text-center max-w-xs">
            {message}
          </p>
        )}
      </div>
    );
  }

  // Primary variant (default)
  return (
    <div
      className={`flex flex-col items-center justify-center ${containerSizes[size]}`}
    >
      <div className="relative mb-4">
        {/* Outer ring */}
        <m.div
          className={`${sizeClasses[size]} border-2 border-indigo-500/20 rounded-full`}
          animate={pulseVariants}
        />

        {/* Spinning ring */}
        <m.div
          className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-t-indigo-500 border-r-purple-500 rounded-full`}
          animate={spinVariants}
        />

        {/* Center icon */}
        {showIcon && (
          <div
            className={`absolute inset-0 ${sizeClasses[size]} flex items-center justify-center`}
          >
            <m.div animate={pulseVariants}>
              <Zap className={`${iconSizes[size]} text-indigo-400`} />
            </m.div>
          </div>
        )}
      </div>

      {/* Loading text with animated dots */}
      <div className="flex items-center gap-2">
        <span className="text-slate-300 text-sm font-medium">
          {message || "Chargement"}
        </span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <m.div
              key={i}
              className="w-1 h-1 bg-indigo-500 rounded-full"
              animate={dotVariants}
              transition={{
                ...dotVariants.transition,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant spécialisé pour next/dynamic
export function DynamicComponentLoader({
  height = "200px",
  message = "Chargement du composant...",
}: {
  height?: string;
  message?: string;
}) {
  return (
    <div
      className="flex items-center justify-center bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg"
      style={{ height }}
    >
      <LoadingSpinner message={message} />
    </div>
  );
}

// Composant pour le chargement d'images
export function ImageLoader({
  aspectRatio = "16/9",
  message = "Chargement de l'image...",
}: {
  aspectRatio?: string;
  message?: string;
}) {
  return (
    <div
      className="flex items-center justify-center bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-lg"
      style={{ aspectRatio }}
    >
      <LoadingSpinner size="sm" variant="secondary" message={message} />
    </div>
  );
}

// Composant pour le chargement de sections
export function SectionLoader({
  minHeight = "300px",
  message = "Chargement de la section...",
}: {
  minHeight?: string;
  message?: string;
}) {
  return (
    <div
      className="flex items-center justify-center bg-gradient-to-br from-slate-900/20 to-slate-800/20 backdrop-blur-sm border border-slate-800/50 rounded-xl"
      style={{ minHeight }}
    >
      <LoadingSpinner message={message} />
    </div>
  );
}
