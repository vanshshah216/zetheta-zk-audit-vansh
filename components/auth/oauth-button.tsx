'use client'

import { Button } from '@/components/ds/button'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface OAuthButtonProps {
  provider: 'google' | 'github' | 'metamask'
  onConnect?: () => Promise<void>
}

export function OAuthButton({ provider, onConnect }: OAuthButtonProps) {
  const [loading, setLoading] = useState(false)

  const icons = {
    google: '📧',
    github: '⚙️',
    metamask: '🦊',
  }

  const labels = {
    google: 'Continue with Google',
    github: 'Continue with GitHub',
    metamask: 'Connect MetaMask',
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      await onConnect?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full h-11 relative group"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <span className="mr-2 text-lg">{icons[provider]}</span>
          {labels[provider]}
        </>
      )}
    </Button>
  )
}
