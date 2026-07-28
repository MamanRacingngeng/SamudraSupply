"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isChunkError =
    error.message?.includes("Loading chunk") ||
    error.message?.includes("Client Manifest") ||
    error.message?.includes("image-component");

  return (
    <main className="flex min-h-screen items-center justify-center bg-sky-deep px-5">
      <div className="card-base max-w-md p-8 text-center">
        <p className="label-caps mb-3">Oops!</p>
        <h1 className="heading-display mb-3 text-2xl text-sky-deep">
          {isChunkError ? "Page needs to reload" : "Something went wrong"}
        </h1>
        <p className="mb-6 text-sm text-muted">
          {isChunkError
            ? "A new build is available. Press Ctrl + Shift + R for a full refresh."
            : error.message || "This page could not be loaded. Please try again."}
        </p>
        <button
          type="button"
          onClick={() => (isChunkError ? window.location.reload() : reset())}
          className="btn-primary"
        >
          Reload
        </button>
      </div>
    </main>
  );
}
