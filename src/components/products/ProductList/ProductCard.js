import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-20 w-20 shrink-0 rounded-lg object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-gray-900">
            <Link href={`/products/${product.id}`} className="font-medium hover:underline">
              {product.title}
            </Link>
          </h3>

          <p className="mt-1 text-sm capitalize text-gray-500">
            {product.category}
          </p>

          <p className="mt-2 font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4">
        <div>
          <p className="text-xs text-gray-500">
            Rating
          </p>

          <p className="mt-1 text-sm font-medium text-gray-900">
            {product.rating}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Stock
          </p>

          <p className="mt-1 text-sm font-medium text-gray-900">
            {product.stock}
          </p>
        </div>
      </div>
    </article>
  );
}