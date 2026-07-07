import { Shield } from 'lucide-react';

interface SecurityBadgeProps {
  badges: string[];
  vertical?: boolean;
}

export function SecurityBadge({ badges, vertical = false }: SecurityBadgeProps) {
  return (
    <div className={`flex gap-3 ${vertical ? 'flex-col' : 'flex-row'} items-start`}>
      <Shield className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-foreground mb-2">Enterprise Security</p>
        <ul className={`grid gap-2 ${vertical ? 'grid-cols-1' : 'grid-cols-2'} text-xs text-muted-foreground`}>
          {badges.map((badge, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
