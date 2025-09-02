import React, { createContext, useContext, useState } from 'react';
import { 
  NavigationState, 
  NavigationContextType, 
  NavigationProviderProps, 
  NavigatedPageProps,
  PageType 
} from './NavigationTypes';
import { getDefaultTitle } from './NavigationHelpers';
import { renderPage } from './PageRouter';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

// Safe navigation hook that doesn't throw when used outside context
export const useSafeNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    // Return a no-op navigation object when used outside context
    return {
      navigationState: {
        currentPage: 'dashboard' as PageType,
        currentData: null,
        currentTitle: 'Dashboard',
        breadcrumbs: []
      },
      navigateTo: () => {
        console.warn('Navigation not available - component rendered outside NavigationProvider');
      },
      goBack: () => {
        console.warn('Navigation not available - component rendered outside NavigationProvider');
      },
      addBreadcrumb: () => {
        console.warn('Navigation not available - component rendered outside NavigationProvider');
      }
    };
  }
  return context;
};

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentPage: 'dashboard',
    currentData: null,
    currentTitle: 'Dashboard',
    breadcrumbs: []
  });

  const navigateTo = (page: PageType, data?: any, title?: string) => {
    setNavigationState(prev => ({
      currentPage: page,
      currentData: data,
      currentTitle: title || getDefaultTitle(page),
      breadcrumbs: [...prev.breadcrumbs, {
        label: prev.currentTitle,
        page: prev.currentPage,
        data: prev.currentData
      }]
    }));
  };

  const goBack = () => {
    setNavigationState(prev => {
      if (prev.breadcrumbs.length === 0) {
        return {
          currentPage: 'dashboard',
          currentData: null,
          currentTitle: 'Dashboard',
          breadcrumbs: []
        };
      }

      const lastBreadcrumb = prev.breadcrumbs[prev.breadcrumbs.length - 1];
      return {
        currentPage: lastBreadcrumb.page,
        currentData: lastBreadcrumb.data,
        currentTitle: lastBreadcrumb.label,
        breadcrumbs: prev.breadcrumbs.slice(0, -1)
      };
    });
  };

  const addBreadcrumb = (label: string, page: PageType, data?: any) => {
    setNavigationState(prev => ({
      ...prev,
      breadcrumbs: [...prev.breadcrumbs, { label, page, data }]
    }));
  };

  return (
    <NavigationContext.Provider 
      value={{ 
        navigationState, 
        navigateTo, 
        goBack, 
        addBreadcrumb 
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

// Navigation wrapper component that handles page rendering
export const NavigatedPage: React.FC<NavigatedPageProps> = ({ children, userRole }) => {
  const { navigationState } = useNavigation();
  return <>{renderPage(navigationState, userRole, children)}</>;
};

// Breadcrumb component
export const Breadcrumbs: React.FC = () => {
  const { navigationState, navigateTo } = useNavigation();

  if (navigationState.breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
      {navigationState.breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <button
            onClick={() => navigateTo(breadcrumb.page, breadcrumb.data, breadcrumb.label)}
            className="hover:text-primary transition-colors"
          >
            {breadcrumb.label}
          </button>
          <span className="text-slate-400">/</span>
        </React.Fragment>
      ))}
      <span className="text-slate-800 font-medium">{navigationState.currentTitle}</span>
    </nav>
  );
};

// Re-export types for convenience
export type { PageType, NavigationState, NavigationContextType };