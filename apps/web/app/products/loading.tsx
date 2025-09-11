export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="h-8 w-48 rounded bg-gray-200 animate-pulse" />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-4">
            <div className="aspect-square w-full rounded-lg bg-gray-200 animate-pulse" />
            <div className="mt-3 h-5 w-2/3 rounded bg-gray-200 animate-pulse" />
            <div className="mt-2 h-4 w-1/3 rounded bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}
