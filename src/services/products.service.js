import api from "@/lib/axios";
import { resolve } from "styled-jsx/css";

export async function getProducts(params = {}) {
    const response = await api.get("/products", {
        params,
    });

    return response.data;
}

export async function getProductById(id){
    const response = await api.get(`/products/${id}`);

    return response.data;
}