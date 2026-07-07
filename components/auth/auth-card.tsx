import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card';

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <Card variant="glass" className="p-6">
      <CardHeader className="px-0 pt-0 pb-6">
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-0">{children}</CardContent>
    </Card>
  );
}
