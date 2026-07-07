import { Card } from '@/components/ds/card';
import { Badge } from '@/components/ds/badge';

interface WalletCardProps {
  name: string;
  icon: string;
  status?: 'connected' | 'available';
  onClick?: () => void;
}

export function WalletCard({ name, icon, status = 'available', onClick }: WalletCardProps) {
  const isConnected = status === 'connected';

  return (
    <Card
      variant={isConnected ? 'neon' : 'glass'}
      className={`p-4 cursor-pointer transition-all text-center ${isConnected ? 'ring-2 ring-emerald/50' : 'hover:border-cyan/50'}`}
      onClick={onClick}
    >
      <div className="mb-3 flex justify-center">
        <div className="text-4xl">{icon}</div>
      </div>
      <p className="font-semibold mb-2">{name}</p>
      <Badge variant={isConnected ? 'success' : 'default'} className="w-full justify-center">
        {isConnected ? 'Connected' : 'Connect'}
      </Badge>
    </Card>
  );
}
