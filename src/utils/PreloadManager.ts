import { createContext, useContext } from 'react';

export interface PreloadManager {
  preload: (items: string[]) => void;
}

export const PreloadManagerContext = createContext<PreloadManager | null>(null);

export const createPreloadManager = (): PreloadManager => {
  const started = new Set<string>();

  const preload = (items: string[]) => {
    items.forEach(item => {
      if (!started.has(item)) {
        started.add(item);
        const elem = document.createElement('link');
        elem.rel = 'prefetch';
        elem.href = item;
        document.head.appendChild(elem);
      }
    });
  };

  return { preload };
};

export const usePreloadManager = () => {
  return useContext(PreloadManagerContext)!;
};
