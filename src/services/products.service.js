import api from "@/lib/axios";

export async function getProducts({limit = 20, skip = 0, sortBy = "", order  = "", signal} = {}) {
    const response = await api.get("/products", {
        params: { 
            limit,
            skip,
            ...(sortBy && order ? {
                sortBy,
                order,
            } : {}),
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
    sortBy = "",
    order = "",
    signal,
} = {}) {
    const response = await api.get("/products/search", {
        params: {
            q: query,
            limit,
            skip,
            ...(sortBy && order ? {
                sortBy,
                order,
            } : {}),
        },
        signal,
    })

    return response.data;
}

export async function getProductsByCategory({
    category,
    limit = 20,
    skip = 0,
    sortBy = "",
    order = "",
    signal,
} = {}) {
    const response = await api.get(`products/category/${encodeURIComponent(category)}`, {
        params: {
            limit,
            skip,
            ...(sortBy && order ? {
                sortBy,
                order,
            } : {}),
        },
        signal,
    })

    return response.data;
}

export async function addProduct(product) {
    const response = await api.post("/products/add", product);

    return response.data;
    
}

export async function updateProduct(id,product) {
    const response = await api.put(`/products/${id}`, product)

    return response.data;
}