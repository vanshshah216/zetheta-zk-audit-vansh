import { Check } from 'lucide-react';

interface Step {
  label: string;
  completed?: boolean;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                index < currentStep
                  ? 'bg-emerald text-background'
                  : index === currentStep
                    ? 'bg-cyan text-background ring-2 ring-cyan/50'
                    : 'bg-card border border-border text-muted-foreground'
              }`}
            >
              {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                  index < currentStep ? 'bg-emerald' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-xs font-medium text-center flex-1 ${
              index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}
