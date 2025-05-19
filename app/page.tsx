import type { Metadata } from 'next';
import { AuthButton } from '@/components/auth-button';

// To change accordingly
export const metadata: Metadata = {
  title: 'Landing Page',
  description: 'This is the landing page of the application.',
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <AuthButton />
      </div>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Welcome to the App</h1>
        <p className="text-lg text-muted-foreground">Your journey starts here.</p>
      </div>
    </div>
  );
}
