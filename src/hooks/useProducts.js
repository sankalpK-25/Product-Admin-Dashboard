"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getProducts,
  searchProducts,
  getProductsByCategory
} from "@/services/products.service";

export function useProducts({
  limit = 20,
  skip = 0,
  search = "",
  category = "",
  sortBy = "",
  order = ""

} = {}) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const requestIdRef = useRef(0);
  const abortControllerRef = useRef(null);

  const fetchProducts = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();

    abortControllerRef.current = controller;

    setLoading(true);
    setError("");

    try {
      let data;

      if (search.trim()) {
        data = await searchProducts({
          query: search.trim(),
          limit,
          skip,
          sortBy,
          order,
          signal: controller.signal,
        });

     }else if(category.trim()){
        data = await getProductsByCategory({
            category: category.trim(),
            limit,
            skip,
            sortBy,
            order,
            signal: controller.signal
        })

      } else {
        data = await getProducts({
          limit,
          skip,
          sortBy,
          order,
          signal: controller.signal,
        });
      }

      if (requestId !== requestIdRef.current) {
        return;
      }

      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      if (error.code === "ERR_CANCELED") {
        return;
      }

      console.error(error);
      setError("Failed to load products.");
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [limit, skip, search, category, sortBy, order]);

  useEffect(() => {
    fetchProducts();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchProducts]);

  return {
    products,
    total,
    loading,
    error,
    retry: fetchProducts,
  };
}