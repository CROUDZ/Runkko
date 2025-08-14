"use client";

import { useEffect } from "react";
import { m } from "framer-motion";
import { RefreshCw, AlertTriangle, Home, Bug, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const pulseVariants = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <m.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Error Icon */}
        <m.div variants={itemVariants} className="mb-8 flex justify-center">
          <m.div className="relative" animate={pulseVariants}>
            <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <AlertTriangle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-red-500/30 rounded-full animate-ping"></div>
          </m.div>
        </m.div>

        {/* Title */}
        <m.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-4">
            Oops ! Une erreur est survenue
          </h1>
          <h2 className="text-xl sm:text-2xl text-slate-300 font-medium">
            Quelque chose s'est mal passé
          </h2>
        </m.div>

        {/* Error Message */}
        <m.div
          variants={itemVariants}
          className="mb-12 p-6 bg-slate-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl"
        >
          <div className="flex items-start gap-3 mb-4">
            <Bug className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                Détails de l'erreur
              </h3>
              <p className="text-slate-400 text-sm break-words">
                {error.message ||
                  "Une erreur inattendue s'est produite. Nos équipes ont été notifiées."}
              </p>
            </div>
          </div>
        </m.div>

        {/* Action Buttons */}
        <m.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <m.button
            onClick={() => reset()}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Réessayer
          </m.button>

          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700/50 hover:text-slate-100 transition-all duration-300 group"
            >
              <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Retour à l'accueil
            </Link>
          </m.div>

          <m.button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 bg-transparent border border-slate-600 text-slate-400 px-6 py-4 rounded-xl font-medium hover:bg-slate-800/30 hover:text-slate-200 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Retour
          </m.button>
        </m.div>

        {/* Help Text */}
        <m.div variants={itemVariants} className="mt-16 text-slate-500 text-sm">
          <p>
            Si le problème persiste, veuillez{" "}
            <button className="text-red-400 hover:text-red-300 underline transition-colors">
              nous contacter
            </button>{" "}
            en décrivant ce que vous faisiez lorsque l'erreur s'est produite.
          </p>
        </m.div>
      </m.div>
    </div>
  );
}
