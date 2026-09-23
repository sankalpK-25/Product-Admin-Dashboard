import ProductTable from "./ProductList/ProductTable.js";
import ProductCard from "./ProductList/ProductCard.js";

export default function ProductList({ products }) {
  return (
    <>
      <ProductTable products={products} />

      <div className="space-y-4 md:hidden">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}