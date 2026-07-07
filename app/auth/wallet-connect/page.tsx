'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';
import { AuthCard } from '@/components/auth/auth-card';
import { WalletCard } from '@/components/auth/wallet-card';
import { Button } from '@/components/ds/button';
import { Alert, AlertDescription } from '@/components/ds/alert';
import { connectWallet } from '@/lib/auth-api';
import { AlertTriangle } from 'lucide-react';

const wallets = [
  { name: 'MetaMask', icon: '🦊' },
  { name: 'WalletConnect', icon: '📱' },
];

export default function WalletConnectPage() {
  const router = useRouter();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleConnect = async (walletName: string) => {
    setApiError(null);
    setSelectedWallet(walletName);
    setIsConnecting(true);

    try {
      // Mock wallet connection
      const mockAddress = '0x' + '1234567890abcdef'.repeat(2).slice(0, 40);
      const mockSignature = '0x' + 'signature'.repeat(16);

      const result = await connectWallet({
        walletAddress: mockAddress,
        walletType: walletName.toLowerCase().replace(' ', '') as 'metamask' | 'walletconnect',
        signature: mockSignature,
      });

      if (result.error) {
        setApiError(result.error);
      } else {
        // Redirect to success
        setTimeout(() => {
          router.push('/auth/success');
        }, 1500);
      }
    } catch (error) {
      setApiError('Wallet connection failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSkip = () => {
    router.push('/auth/success');
  };

  return (
    <AuthLayout title="Connect Your Wallet" subtitle="Link a blockchain wallet to your account">
      <AuthCard title="Wallet Connection" description="Choose how you want to connect your wallet">
        <div className="space-y-6">
          {apiError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            {wallets.map((wallet) => (
              <WalletCard
                key={wallet.name}
                name={wallet.name}
                icon={wallet.icon}
                status={selectedWallet === wallet.name ? 'connected' : 'available'}
                onClick={() => {
                  if (!isConnecting) {
                    handleConnect(wallet.name);
                  }
                }}
              />
            ))}
          </div>

          <div className="bg-card/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-semibold">What's this for?</p>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              <li className="flex gap-2">
                <span className="text-cyan">•</span>
                <span>Verify your identity using blockchain</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan">•</span>
                <span>Enable secure wallet-based transactions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan">•</span>
                <span>Participate in governance and voting</span>
              </li>
            </ul>
          </div>

          {isConnecting ? (
            <Button
              disabled
              variant="cyan"
              className="w-full"
            >
              Connecting...
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSkip}
              >
                Skip for Now
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                You can connect your wallet later in your account settings
              </p>
            </>
          )}
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
