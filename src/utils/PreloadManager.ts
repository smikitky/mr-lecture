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
        const type = item.split('.').pop() === 'mp4' ? 'video' : 'image';
        const elem = document.createElement('link');
        elem.rel = 'preload';
        elem.href = item;
        elem.as = type;
        document.head.appendChild(elem);
      }
    });
  };

  return { preload };
};

export const usePreloadManager = () => {
  return useContext(PreloadManagerContext)!;
};
