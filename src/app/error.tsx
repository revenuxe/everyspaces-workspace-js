"use client";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6 text-center"><h1 className="font-serif text-3xl">We couldn't load this page</h1><p className="max-w-md text-muted-foreground">Please try again in a moment. Your request has not been lost.</p><button onClick={reset} className="rounded-full bg-primary px-6 py-3 text-primary-foreground">Try again</button><a href="/" className="underline">Back to home</a></main>;
}
