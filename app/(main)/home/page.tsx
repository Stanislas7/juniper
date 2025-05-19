import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div>
        <h1>This version is a PR preview, Juniper is coming soon</h1>
        <Link href="/dashboard" prefetch={true}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}
