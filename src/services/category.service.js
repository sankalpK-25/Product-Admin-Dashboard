import api from "@/lib/axios";

export async function getCategories() {
    const response = await api.get("/products/categories");

    return response.data;
}