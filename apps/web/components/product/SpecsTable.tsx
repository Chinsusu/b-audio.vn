export function SpecsTable({ specs }: { specs: Record<string, string | number | null | undefined> }) {
  const entries = Object.entries(specs || {}).filter(([,v]) => v !== null && v !== undefined && v !== '');
  if (!entries.length) return null;
  return (
    <table className="w-full table-auto overflow-hidden rounded-2xl border text-sm">
      <tbody>
        {entries.map(([k, v]) => (
          <tr key={k} className="border-b last:border-b-0">
            <td className="bg-gray-50 px-4 py-2 font-medium capitalize">{k.replace(/_/g,' ')}</td>
            <td className="px-4 py-2">{String(v)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
