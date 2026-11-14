'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global root error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#F6F0E8] text-[#24211F]">
        <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-semibold text-[#5A2536]">
            Application Error
          </h1>
          <p className="mt-3 text-sm text-[#24211F]/70">
            A critical error occurred while rendering the application.
          </p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center bg-[#5A2536] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3E1624]"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-[#5A2536] px-6 py-3 text-sm font-semibold text-[#5A2536] transition hover:bg-[#5A2536] hover:text-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

