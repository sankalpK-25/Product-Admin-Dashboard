"use client";

import { createContext, useContext,useState } from "react";

const ProductContext = createContext(null);

export function ProductProvider({children}) {
    const [updatedProducts, setUpdatedProducts] = useState({});
    
    function updateProductInStore(product){
        setUpdatedProducts((current) => ({
            ...current,
            [product.id]: product,
        }));
    }

    function getUpdatedProduct(id){
        return updatedProducts[id] || null;
    }

    return (
        <ProductContext.Provider 
        value={{
            updatedProducts,
            updateProductInStore,
            getUpdatedProduct}}>
                {children}
            </ProductContext.Provider>
    )
}

export function useProductStore(){
    const context = useContext(ProductContext);

    if(!context){
        throw new Error("useProductStore must be used inside ProductProvider");
    }

    return context;
}