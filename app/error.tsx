'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="container-x grid place-items-center gap-4 py-28 text-center">
      <p className="font-display text-5xl font-semibold text-burgundy md:text-6xl">
        Something went wrong
      </p>
      <p className="max-w-md text-sm text-charcoal/70">
        An unexpected error occurred while loading this page.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <button onClick={() => reset()} className="btn-burgundy">
          Try again
        </button>
        <Link href="/" className="btn-outline">
          Back to home
        </Link>
      </div>
    </div>
  );
}

