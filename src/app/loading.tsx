"use client";

import { m } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Loading() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const pulseVariants = {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const spinVariants = {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear" as const,
    },
  };

  const floatVariants = {
    y: [-10, 10, -10],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <m.div
        className="relative z-10 text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Loading Animation */}
        <div className="mb-8 relative">
          {/* Outer Ring */}
          <m.div className="w-32 h-32 mx-auto relative" animate={pulseVariants}>
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-purple-500/30 rounded-full"></div>

            {/* Spinning Elements */}
            <m.div
              className="absolute inset-4 border-2 border-transparent border-t-indigo-500 border-r-purple-500 rounded-full"
              animate={spinVariants}
            ></m.div>

            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <m.div animate={floatVariants}>
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </m.div>
            </div>
          </m.div>

          {/* Orbit Elements */}
          <m.div
            className="absolute inset-0 w-32 h-32 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-indigo-500 rounded-full -translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-500 rounded-full -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-2 h-2 bg-cyan-500 rounded-full -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-2 h-2 bg-pink-500 rounded-full -translate-y-1/2"></div>
          </m.div>
        </div>

        {/* Loading Text */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Chargement en cours
          </h2>

          {/* Animated Dots */}
          <div className="flex justify-center items-center gap-1">
            {[0, 1, 2].map((i) => (
              <m.div
                key={i}
                className="w-2 h-2 bg-indigo-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Préparation de votre expérience...
          </p>
        </m.div>

        {/* Progress Bar */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 max-w-xs mx-auto"
        >
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <m.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </m.div>
      </m.div>
    </div>
  );
}
