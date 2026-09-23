import Link from "next/link";


export default function ProductTable({ products }) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Rating
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />

                    <span className="font-medium text-gray-900">
                      <Link href={`/products/${product.id}`} className="font-medium hover:underline">
                      {product.title}
                      </Link>
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm capitalize text-gray-600">
                  {product.category}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ${product.price}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.rating}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {product.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}