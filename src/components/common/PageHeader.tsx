import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigation } from '../navigation/NavigationProvider';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  showBackButton = true,
  onBack
}) => {
  const { navigationState, goBack } = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Button variant="ghost" size="sm" onClick={handleBack} className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          {navigationState?.breadcrumbs && navigationState.breadcrumbs.length > 0 && (
            <>
              <div className="h-6 w-px bg-slate-200" />
              <nav className="flex items-center space-x-2 text-sm">
                {navigationState.breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span className="text-slate-400">/</span>}
                    <span className={index === navigationState.breadcrumbs.length - 1 
                      ? 'text-slate-800 font-medium' 
                      : 'text-slate-500'}>
                      {crumb.label}
                    </span>
                  </React.Fragment>
                ))}
                <span className="text-slate-400">/</span>
                <span className="text-slate-800 font-medium">{navigationState.currentTitle}</span>
              </nav>
            </>
          )}
          
          <div>
            <h1 className="text-slate-800">{title}</h1>
            {description && (
              <p className="text-sm text-slate-600">{description}</p>
            )}
          </div>
        </div>
        
        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};