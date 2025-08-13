# 🚀 Guide d'Utilisation Rapide - Composants de Chargement

## Import Simple

```tsx
// Import principal - tout en une fois
import { 
  LoadingSpinner, 
  createDynamicLoader, 
  ComponentSkeleton,
  useLoadingState 
} from '@/components/loading';

// Ou imports spécifiques
import LoadingSpinner from '@/components/LoadingSpinner';
import { createDynamicLoader } from '@/components/DynamicWrapper';
```

## 🎯 Cas d'Usage Principaux

### 1. Chargement de Page Entière

```tsx
function MyPage() {
  const { isLoading, error, startLoading, stopLoading } = useLoadingState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          message="Chargement de la page..." 
        />
      </div>
    );
  }

  return <div>Contenu de la page</div>;
}
```

### 2. Composants next/dynamic

```tsx
import dynamic from 'next/dynamic';

// Chargement avec skeleton
const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
  loading: () => <ComponentSkeleton minHeight="400px" />,
  ssr: false,
});

// Chargement avec message
const HeavySection = dynamic(() => import('./HeavySection'), {
  loading: () => createDynamicLoader.section("Chargement de la galerie..."),
});

// Chargement minimal pour widgets
const StatsWidget = dynamic(() => import('./StatsWidget'), {
  loading: () => createDynamicLoader.widget(),
});
```

### 3. Boutons avec État de Chargement

```tsx
function SubmitButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <button 
      disabled={isSubmitting}
      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg"
    >
      {isSubmitting && <LoadingSpinner size="sm" variant="minimal" />}
      {isSubmitting ? "Envoi..." : "Envoyer"}
    </button>
  );
}
```

### 4. Gestion d'Erreur avec Retry

```tsx
function DataSection() {
  const { isLoading, error, setLoadingError, reset } = useLoadingState();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      startLoading();
      const response = await api.getData();
      setData(response);
    } catch (err) {
      setLoadingError("Impossible de charger les données");
    } finally {
      stopLoading();
    }
  };

  if (error) {
    return (
      <DynamicError 
        error={new Error(error)} 
        retry={() => {
          reset();
          fetchData();
        }}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner message="Chargement des données..." />;
  }

  return <div>{/* Afficher les données */}</div>;
}
```

## 🎨 Variantes Visuelles

```tsx
// Spinner principal avec icône
<LoadingSpinner size="lg" variant="primary" message="Chargement..." />

// Version subtile
<LoadingSpinner size="md" variant="secondary" />

// Version minimaliste
<LoadingSpinner size="sm" variant="minimal" />

// Skeleton avec animation
<ComponentSkeleton minHeight="300px" showPulse={true} />

// Skeleton sans animation
<ComponentSkeleton minHeight="200px" showPulse={false} />
```

## 📱 Responsive Design

```tsx
// Tailles adaptatives
<div className="
  p-4 sm:p-6 lg:p-8
  min-h-[200px] sm:min-h-[300px] lg:min-h-[400px]
">
  <LoadingSpinner 
    size="sm" sm:size="md" lg:size="lg"
    message="Chargement adaptatif..."
  />
</div>
```

## ⚡ Optimisations Performance

```tsx
// Lazy loading avec intersection observer
const LazySection = dynamic(() => import('./HeavySection'), {
  loading: () => createDynamicLoader.section(),
  ssr: false, // Désactive le SSR pour les composants lourds
});

// Preload conditionnel
const ConditionalComponent = dynamic(
  () => import('./ConditionalComponent'),
  { 
    loading: () => createDynamicLoader.card(),
    // Chargé seulement si nécessaire
  }
);

function App() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowHeavyComponent(true)}>
        Charger le composant
      </button>
      
      {showHeavyComponent && <LazySection />}
    </div>
  );
}
```

## 🎯 Patterns Avancés

### Hook personnalisé pour API

```tsx
function useApiData(url: string) {
  const { isLoading, error, startLoading, stopLoading, setLoadingError } = useLoadingState();
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    startLoading();
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur de chargement');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setLoadingError(err.message);
    } finally {
      stopLoading();
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// Utilisation
function MyComponent() {
  const { data, isLoading, error, refetch } = useApiData('/api/videos');

  if (isLoading) return <LoadingSpinner message="Chargement des vidéos..." />;
  if (error) return <DynamicError error={new Error(error)} retry={refetch} />;
  
  return <div>{/* Afficher les données */}</div>;
}
```

### Skeleton intelligent

```tsx
function SmartSkeleton({ dataType }: { dataType: 'video' | 'card' | 'list' }) {
  const skeletonConfigs = {
    video: { minHeight: "400px", showPulse: true },
    card: { minHeight: "200px", showPulse: true },
    list: { minHeight: "60px", showPulse: false },
  };
  
  return <ComponentSkeleton {...skeletonConfigs[dataType]} />;
}
```

## 🔧 Personnalisation

```tsx
// Thème personnalisé
const customLoader = (
  <div className="flex items-center gap-3 p-6 bg-purple-900/20 border border-purple-500/30 rounded-xl">
    <LoadingSpinner size="sm" variant="minimal" />
    <span className="text-purple-300">Chargement personnalisé...</span>
  </div>
);

// Utilisation avec next/dynamic
const CustomComponent = dynamic(() => import('./MyComponent'), {
  loading: () => customLoader,
});
```

---

*Ces exemples couvrent 90% des cas d'usage. Adaptez selon vos besoins spécifiques !*
