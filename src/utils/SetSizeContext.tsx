import { createContext } from 'react';

const SetSizeContext = createContext<(size: string) => void>(() => {});

export default SetSizeContext;
