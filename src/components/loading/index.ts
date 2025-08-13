// Point d'entrée principal pour tous les composants de chargement

// Composants principaux
export { default as LoadingSpinner } from '../LoadingSpinner';
export { DynamicComponentLoader, ImageLoader, SectionLoader } from '../LoadingSpinner';

// Composants de wrapper pour next/dynamic  
export { default as withDynamicLoading } from '../DynamicWrapper';
export { 
  ComponentSkeleton, 
  DynamicError, 
  createDynamicLoader 
} from '../DynamicWrapper';

// Configuration et utilitaires
export { 
  default as loadingConfig, 
  createAnimationVariants, 
  cssUtils, 
  useLoadingState 
} from './config';

// Types
export type { 
  LoadingState, 
  LoadingSpinnerProps, 
  DynamicLoaderProps 
} from './config';

// Exemples (optionnel - pour la documentation)
export { default as DynamicExamples } from '../examples/DynamicExamples';
