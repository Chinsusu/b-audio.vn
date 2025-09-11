export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square w-full rounded-xl bg-gray-200 animate-pulse" />
        <div>
          <div className="h-8 w-2/3 rounded bg-gray-200 animate-pulse" />
          <div className="mt-2 h-6 w-1/3 rounded bg-gray-200 animate-pulse" />
          <div className="mt-6 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-gray-200 animate-pulse" />
            ))}
          </div>
          <div className="mt-6 grid gap-3">
            <div className="h-10 w-full rounded bg-gray-200 animate-pulse" />
            <div className="h-10 w-full rounded bg-gray-200 animate-pulse" />
            <div className="h-12 w-40 rounded bg-gray-200 animate-pulse" />
          </div>
        </div>
      </article>
    </main>
  );
}
