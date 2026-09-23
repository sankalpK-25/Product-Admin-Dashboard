"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/services/products.service";
import Link from "next/link";
import { useProductStore } from "@/context/ProductContext";


export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const {getUpdatedProduct} = useProductStore()

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");

      try {
        const data = await getProductById(id);
        const locallyUpdatedProduct = getUpdatedProduct(id);
        setProduct(locallyUpdatedProduct || data);
      } catch (error) {
        console.error(error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="p-6">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <p className="text-red-600">{error}</p>

          <button
            onClick={() => router.push("/products")}
            className="mt-4 rounded-md bg-black px-4 py-2 text-white"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <button
        onClick={() => router.push("/products")}
        className="mb-6 text-sm font-medium underline"
      >
        ← Back to Products
      </button>

      <Link href={`/products/${product.id}/edit`} className="ml-10 mt-4 inline-block text-sm font-medium underline">
        Edit Product
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-lg object-cover"
          />

          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images?.map((image) => (
              <img
                key={image}
                src={image}
                alt={product.title}
                className="h-20 w-full rounded-md object-cover"
              />
            ))}
          </div>
        </div>

        {/* Product information */}
        <div>
          <p className="text-sm capitalize text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {product.title}
          </h1>

          <p className="mt-4 text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-4 text-gray-600">
            {product.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <p className="font-medium">{product.rating}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Stock</p>
              <p className="font-medium">{product.stock}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Reviews</h2>

        <div className="mt-4 space-y-4">
          {product.reviews?.length ? (
            product.reviews.map((review, index) => (
              <div
                key={`${review.reviewerEmail}-${index}`}
                className="rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {review.reviewerName}
                  </p>

                  <p className="text-sm">
                    ⭐ {review.rating}
                  </p>
                </div>

                <p className="mt-2 text-gray-600">
                  {review.comment}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {review.date}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No reviews available.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}