import { Check, X } from 'lucide-react';
import { usePasswordStrength } from '@/lib/auth-hooks';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { strength, requirements } = usePasswordStrength(password);

  const strengthColor = strength === 'strong' ? 'bg-emerald' : strength === 'medium' ? 'bg-cyan' : 'bg-destructive';
  const strengthLabel = strength === 'strong' ? 'Strong' : strength === 'medium' ? 'Medium' : 'Weak';

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
          <div
            className={`h-full ${strengthColor} transition-all duration-300`}
            style={{ width: `${(Object.values(requirements).filter(Boolean).length / 5) * 100}%` }}
          />
        </div>
        <span className={`text-xs font-semibold ${strength === 'strong' ? 'text-emerald' : strength === 'medium' ? 'text-cyan' : 'text-destructive'}`}>
          {strengthLabel}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <RequirementItem
          met={requirements.length}
          label="At least 8 characters"
        />
        <RequirementItem met={requirements.uppercase} label="Uppercase letter" />
        <RequirementItem met={requirements.lowercase} label="Lowercase letter" />
        <RequirementItem met={requirements.number} label="Number" />
        <RequirementItem met={requirements.special} label="Special character (@$!%*?&)" />
      </div>
    </div>
  );
}

function RequirementItem({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <Check className="w-4 h-4 text-emerald flex-shrink-0" />
      ) : (
        <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      )}
      <span className={met ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
    </div>
  );
}
