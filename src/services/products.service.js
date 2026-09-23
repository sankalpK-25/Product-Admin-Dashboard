import api from "@/lib/axios";

export async function getProducts({limit = 20, skip = 0} = {}) {
    const response = await api.get("/products", {
        params: { 
            limit,
            skip,
        }
    });

    return response.data;
}

export async function getProductById(id){
    const response = await api.get(`/products/${id}`);

    return response.data;
}