"use client"

import { getProducts } from "@/services/products.service"
import { useCallback, useEffect, useState } from "react"

export function useProducts({ limit = 20, skip = 0} = {}){
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError("");

        try{
            const data = await getProducts({
                limit,
                skip,
            });
    
            setProducts(data.products);
            setTotal(data.total);
        }catch(error){
            console.error(error);
            setError("Failed to load products.");
            
        }finally{
            setLoading(false);
        }
    }, [limit,skip]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        total,
        loading,
        error,
        retry: fetchProducts,
    }

}