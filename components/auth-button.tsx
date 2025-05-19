'use client';

import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button asChild variant="outline" size="sm">
        <Link href="/home" prefetch={true}>
          Home
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" size="sm">
      <Link href="/signin" prefetch={true}>
        Sign In
      </Link>
    </Button>
  );
}
