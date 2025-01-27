import React, { createContext, useContext } from 'react';
import { RootStore, rootStore } from './RootStore';

const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }
  return context;
}; 