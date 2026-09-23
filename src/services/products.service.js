import api from "@/lib/axios";

export async function getProducts({limit = 20, skip = 0, signal,} = {}) {
    const response = await api.get("/products", {
        params: { 
            limit,
            skip,
        }, 
        signal
    });

    return response.data;
}

export async function getProductById(id){
    const response = await api.get(`/products/${id}`);

    return response.data;
}

export async function searchProducts({
    query,
    limit = 20,
    skip = 0,
    signal,
} = {}) {
    const response = await api.get("/products/search", {
        params: {
            q: query,
            limit,
            skip
        },
        signal,
    })

    return response.data;
}

export async function getProductsByCategory({
    category,
    limit = 20,
    skip = 0,
    signal,
} = {}) {
    const response = await api.get(`products/category/${encodeURIComponent(category)}`, {
        params: {
            limit,
            skip,
        },
        signal,
    })

    return response.data;
}