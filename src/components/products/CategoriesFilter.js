export default function CategoryFilter({
  categories,
  value,
  onChange,
  loading,
}) {
  return (
    <div>
      <label
        htmlFor="category"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Category
      </label>

      <select
        id="category"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={loading}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-100"
      >
        <option value="">All categories</option>

        {categories.map((category) => {
          const value =
            typeof category === "string"
              ? category
              : category.slug;

          const label =
            typeof category === "string"
              ? category
              : category.name;

          return (
            <option
              key={value}
              value={value}
            >
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}