"use client";

import { getProducts, searchProducts } from "@/services/products.service";
import { useCallback, useEffect, useRef, useState } from "react";

export function useProducts({
  limit = 20,
  skip = 0,
  search = "",
} = {}) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const requestIdRef = useRef(0);

  const abortControllerRef = useRef(null);

  if(abortControllerRef.current){
    abortControllerRef.current.abort();
  }

  const controller = new AbortController();

  abortControllerRef.current = controller

  const fetchProducts = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError("");

    try {
      let data;

      if (search.trim()) {
        data = await searchProducts({
          query: search.trim(),
          limit,
          skip,
        });
      } else {
        data = await getProducts({
          limit,
          skip,
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
  }, [limit, skip, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    total,
    loading,
    error,
    retry: fetchProducts,
  };
}