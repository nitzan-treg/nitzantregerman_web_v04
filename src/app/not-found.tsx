import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-brand-text mb-6 text-4xl font-light tracking-tight md:text-5xl">
        404
      </h1>
      <p className="text-brand-muted mb-10 text-lg font-light">
        This page doesn&rsquo;t exist.
      </p>
      <Link
        href="/"
        className="text-brand-text underline decoration-1 underline-offset-4 hover:opacity-70"
      >
        Back to work
      </Link>
    </main>
  );
}
