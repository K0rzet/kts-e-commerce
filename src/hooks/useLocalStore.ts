import { useEffect, useRef } from 'react';

export interface ILocalStore {
  destroy(): void;
}

export function useLocalStore<T extends ILocalStore>(creator: () => T): T {
  const store = useRef<T | null>(null);

  if (!store.current) {
    store.current = creator();
  }

  useEffect(() => {
    return () => {
      if (store.current) {
        store.current.destroy();
        store.current = null;
      }
    };
  }, []);

  return store.current;
} 