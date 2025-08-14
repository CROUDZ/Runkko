"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Home, ArrowLeft, Search, MapPin } from "lucide-react";

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatingVariants = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <m.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number with floating animation */}
        <m.div
          className="mb-8 relative"
          variants={itemVariants}
          animate={floatingVariants}
          whileHover={{ scale: 1.05 }}
        >
          <h1 className="text-[12rem] sm:text-[16rem] lg:text-[20rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 leading-none select-none">
            404
          </h1>
          <m.div
            className="absolute inset-0 text-[12rem] sm:text-[16rem] lg:text-[20rem] font-black text-indigo-500/20 leading-none select-none"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </m.div>
        </m.div>

        {/* Content */}
        <m.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-4">
            Houston, nous avons un problème !
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            La page que vous recherchez semble s'être perdue dans l'espace
            numérique. Ne vous inquiétez pas, nous allons vous ramener en
            territoire connu.
          </p>
        </m.div>

        {/* Action Buttons */}
        <m.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 group"
            >
              <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Retour à l'accueil
            </Link>
          </m.div>

          <m.button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700/50 hover:text-slate-100 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Retour en arrière
          </m.button>
        </m.div>

        {/* Suggestions */}
        <m.div
          variants={itemVariants}
          className="mt-16 p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl"
        >
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            Suggestions pour continuer
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-indigo-400" />
              Vérifiez l'URL dans la barre d'adresse
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Home className="w-4 h-4 text-indigo-400" />
              Retournez à la page d'accueil
            </div>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}
