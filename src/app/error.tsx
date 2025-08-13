'use client';

import { useEffect } from 'react';

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

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h2>Une erreur est survenue.</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Réessayer</button>
    </div>
  );
}
