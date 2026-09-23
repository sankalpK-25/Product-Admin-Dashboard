"use client";

import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/auth/LogoutButton";

export default function ProductsPage() {
  const { authenticated, checking } = useAuth();

  const {
    products,
    total,
    loading,
    error,
    retry,
  } = useProducts({
    limit: 20,
    skip: 0,
  });

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">
          Checking authentication...
        </p>
      </main>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">
            Product Admin
          </h1>

          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Total products: {total}
          </p>
        </div>

        {loading && (
          <div className="mt-6 rounded-lg bg-white p-6">
            <p className="text-gray-500">
              Loading products...
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg bg-white p-6">
            <p className="text-red-600">{error}</p>

            <button
              type="button"
              onClick={retry}
              className="mt-4 rounded-lg bg-black px-4 py-2 text-sm text-white"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-6 rounded-lg bg-white p-6">
            <p className="text-gray-600">
              Loaded {products.length} products.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}