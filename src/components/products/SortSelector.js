export default function SortSelector({
  sortBy,
  order,
  onChange,
}) {
  const value = sortBy && order
    ? `${sortBy}:${order}`
    : "";

  return (
    <div>
      <label
        htmlFor="sort"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Sort
      </label>

      <select
        id="sort"
        value={value}
        onChange={(event) => {
          const selectedValue = event.target.value;

          if (!selectedValue) {
            onChange("", "");
            return;
          }

          const [newSortBy, newOrder] = selectedValue.split(":");

          onChange(newSortBy, newOrder);
        }}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
      >
        <option value="">
          Default
        </option>

        <option value="price:asc">
          Price: Low to High
        </option>

        <option value="price:desc">
          Price: High to Low
        </option>

        <option value="rating:asc">
          Rating: Low to High
        </option>

        <option value="rating:desc">
          Rating: High to Low
        </option>

        <option value="title:asc">
          Title: A to Z
        </option>

        <option value="title:desc">
          Title: Z to A
        </option>
      </select>
    </div>
  );
}