import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ds/card';

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

export function RoleCard({ icon: Icon, title, description, selected, onClick }: RoleCardProps) {
  return (
    <Card
      variant={selected ? 'neon' : 'glass'}
      className={`p-6 cursor-pointer transition-all ${selected ? 'ring-2 ring-cyan/50' : 'hover:border-cyan/50'}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${selected ? 'bg-cyan/20' : 'bg-card'}`}>
          <Icon className={`w-6 h-6 ${selected ? 'text-cyan' : 'text-foreground'}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {selected && <div className="w-2 h-2 rounded-full bg-cyan mt-1" />}
      </div>
    </Card>
  );
}
