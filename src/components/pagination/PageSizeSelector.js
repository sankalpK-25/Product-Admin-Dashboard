export default function PageSizeSelector({
  pageSize,
  onPageSizeChange,
}) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="page-size"
        className="text-sm text-gray-600"
      >
        Rows:
      </label>

      <select
        id="page-size"
        value={pageSize}
        onChange={(event) =>
          onPageSizeChange(Number(event.target.value))
        }
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}