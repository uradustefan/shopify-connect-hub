import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <NavigationContext.Provider value={{ isMenuOpen, setMenuOpen }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }
  return context;
};
