"use client";

import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/auth/LogoutButton";
import ProductList from "@/components/products/ProductList.js";
import Pagination from "@/components/pagination/Pagination";
import PageSizeSelector from "@/components/pagination/PageSizeSelector";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parsePositiveInteger, parsePageSize } from "@/utils/pagination";
import { useDebounce } from "@/hooks/useDebounce";


export default function ProductsPage() {
  const { authenticated, checking } = useAuth();

  const router = useRouter();
  const  searchParams = useSearchParams();

  const initialPage = parsePositiveInteger(searchParams.get("page"), 1)
  const initialPageSize = parsePageSize(searchParams.get("limit"))

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const initialSearch = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(initialSearch);

  const debouncedSearch = useDebounce(searchInput, 400)

  const skip = (page - 1) * pageSize;

  const activeSearch = searchParams.get("search") || "";

  const {
    products,
    total,
    loading,
    error,
    retry,
  } = useProducts({
    limit: pageSize,
    skip,
    search: activeSearch
  });

  const totalPages = Math.ceil(total / pageSize);

  function handlePageChange(newPage){
    updateUrl({
        page:newPage
    })
  }

  function handlePageSizeChange(newPageSize){
    updateUrl({
        page: 1,
        limit: newPageSize
    })
  }

  const startItem = total === 0 ? 0 : skip + 1;

  const endItem = Math.min(skip + pageSize, total)

  useEffect(() => {
    const urlPage = parsePositiveInteger(searchParams.get("page"),1)

    const urlPageSize = parsePageSize(searchParams.get("limit",1),20)

    setPage(urlPage);
    setPageSize(urlPageSize)
  }, [searchParams])


  function updateUrl(updates){
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
        if(value === null || value === undefined){
            params.delete(key);
        }else{
            params.set(key, String(value));
        }
    })

    router.push(`/products?${params.toString()}`);
  }

  useEffect(() => {
    if(!loading && total > 0 && page > totalPages){

        const params = new URLSearchParams(searchParams.toString());

        params.set("page", String(totalPages));

        router.replace(`/products?${params.toString()}`);
    }
  }, [loading,error,total,totalPages,searchParams,router])

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";

    setSearchInput(urlSearch);
  }, [searchParams])


  useEffect(() => {
  const currentSearch =
    searchParams.get("search") || "";

  if (debouncedSearch === currentSearch) {
    return;
  }

  const params = new URLSearchParams(
    searchParams.toString()
  );

  if (debouncedSearch.trim()) {
    params.set("search", debouncedSearch.trim());
  } else {
    params.delete("search");
  }

  params.set("page", "1");

  router.push(`/products?${params.toString()}`);
}, [
  debouncedSearch,
  searchParams,
  router,
]);

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
  <>
    <div className="mt-6">
        <div className="mt-6 mb-6 text-gray-800">
  <label
    htmlFor="product-search"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Search products
  </label>

  <input
    id="product-search"
    type="search"
    value={searchInput}
    onChange={(event) =>
      setSearchInput(event.target.value)
    }
    placeholder="Search products..."
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-black"
  />
</div>

      <ProductList products={products} />
    </div>

    <div className="mt-4 rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          Showing {startItem}–{endItem} of {total}
        </p>

        <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  </>
)}
      </div>
    </main>
  );
}