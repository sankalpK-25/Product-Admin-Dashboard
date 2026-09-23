"use client";

import { useEffect, useState } from "react";

import { getCategories } from "@/services/category.service";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCategories() {
    setLoading(true);
    setError("");

    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    retry: fetchCategories,
  };
}