"use client";

import { createDynamicLoader, ComponentSkeleton } from '../DynamicWrapper';
import { m } from 'framer-motion';

// Composant principal qui démontre tous les loaders
export default function DynamicExamples() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* En-tête */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Exemples de Composants de Chargement
          </h1>
          <p className="text-slate-400 text-lg">
            Démonstration des différents types de loaders disponibles
          </p>
        </m.div>

        {/* Section Loader */}
        <m.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-white">
            Section Loader (next/dynamic)
          </h2>
          <p className="text-slate-400 mb-6">
            Utilisé pour les composants de section lourds
          </p>
          {createDynamicLoader.section("Chargement de la galerie vidéo...")}
        </m.section>

        {/* Card Loader */}
        <m.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-white">
            Card Loader
          </h2>
          <p className="text-slate-400 mb-6">
            Parfait pour les cartes et composants moyens
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                {createDynamicLoader.card("Chargement de la carte...")}
              </div>
            ))}
          </div>
        </m.section>

        {/* Widget Loaders */}
        <m.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-white">
            Widget Loaders
          </h2>
          <p className="text-slate-400 mb-6">
            Pour les petits composants et widgets
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                {createDynamicLoader.widget()}
              </div>
            ))}
          </div>
        </m.section>

        {/* Modal Loader */}
        <m.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-white">
            Modal Loader
          </h2>
          <p className="text-slate-400 mb-6">
            Idéal pour les modales et overlays
          </p>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            {createDynamicLoader.modal("Chargement du contenu de la modale...")}
          </div>
        </m.section>

        {/* Component Skeleton */}
        <m.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-white">
            Component Skeleton
          </h2>
          <p className="text-slate-400 mb-6">
            Skeleton avec animations pour une meilleure UX
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComponentSkeleton minHeight="300px" />
            <ComponentSkeleton minHeight="300px" showPulse={false} />
          </div>
        </m.section>

        {/* Code Examples */}
        <m.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-white">
            Exemples d'utilisation
          </h2>
          <div className="bg-slate-800 rounded-xl p-6 overflow-x-auto">
            <pre className="text-slate-300 text-sm">
{`// Avec next/dynamic
const MyComponent = dynamic(() => import('./MyComponent'), {
  loading: () => createDynamicLoader.section("Chargement..."),
});

// Skeleton personnalisé
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <ComponentSkeleton minHeight="400px" />,
});`}
            </pre>
          </div>
        </m.section>

      </div>
    </div>
  );
}
