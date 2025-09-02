import React from 'react';
import { cn } from './utils';
import { CheckCircle, Circle } from 'lucide-react';

interface StepperProps {
  steps: Array<{
    title: string;
    description?: string;
    status: 'completed' | 'current' | 'pending';
  }>;
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  className
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={cn(
        'flex',
        isVertical ? 'flex-col space-y-4' : 'flex-row items-center space-x-4',
        className
      )}
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={cn(
              'flex items-center',
              isVertical ? 'flex-row space-x-3' : 'flex-col space-y-2'
            )}
          >
            {/* Step Icon */}
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors',
                step.status === 'completed'
                  ? 'bg-green-500 border-green-500 text-white'
                  : step.status === 'current'
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-background border-gray-300 text-gray-400'
              )}
            >
              {step.status === 'completed' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </div>

            {/* Step Content */}
            <div className={cn('text-center', isVertical && 'text-left flex-1')}>
              <div
                className={cn(
                  'text-sm font-medium',
                  step.status === 'completed'
                    ? 'text-green-600'
                    : step.status === 'current'
                    ? 'text-primary'
                    : 'text-gray-400'
                )}
              >
                {step.title}
              </div>
              {step.description && (
                <div className="text-xs text-gray-500 mt-1">
                  {step.description}
                </div>
              )}
            </div>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                'bg-gray-300',
                isVertical ? 'h-8 w-0.5 ml-4' : 'h-0.5 flex-1',
                step.status === 'completed' && 'bg-green-500'
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};