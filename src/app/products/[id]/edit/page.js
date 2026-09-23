"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getProductById,
  updateProduct,
} from "@/services/products.service";
import { useProductStore } from "@/context/ProductContext";


export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const {updateProductInStore} = useProductStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");


  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setErrors({});

      try {
        const product = await getProductById(id);

        setForm({
          title: product.title || "",
          description: product.description || "",
          price: product.price ?? "",
          stock: product.stock ?? "",
          category: product.category || "",
        });
      } catch (error) {
        console.error(error);

        setErrors({
          form: "Product not found.",
        });
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (form.price === "") {
      newErrors.price = "Price is required.";
    } else if (Number(form.price) < 0) {
      newErrors.price = "Price cannot be negative.";
    }

    if (form.stock === "") {
      newErrors.stock = "Stock is required.";
    } else if (
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      newErrors.stock =
        "Stock must be a non-negative integer.";
    }

    if (!form.category.trim()) {
      newErrors.category = "Category is required.";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) {
      return;
    }

    setSuccess("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSaving(true);

    try {
      const updatedProduct = await updateProduct(id, {
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category.trim(),
      });

      updateProductInStore(updatedProduct);

      console.log("Updated product:", updatedProduct);

      setSuccess(
        "Product updated successfully. DummyJSON does not persist this change."
      );
    } catch (error) {
      console.error(error);

      setErrors({
        form: "Failed to update product. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="p-6">
        <p>Loading product...</p>
      </main>
    );
  }

  if (errors.form && !form.title) {
    return (
      <main className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <p className="text-red-600">
            {errors.form}
          </p>

          <button
            type="button"
            onClick={() => router.push("/products")}
            className="mt-4 rounded-md bg-black px-4 py-2 text-white"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <button
        type="button"
        onClick={() => router.push(`/products/${id}`)}
        className="mb-6 text-sm font-medium underline"
      >
        ← Back to Product
      </button>

      <h1 className="text-3xl font-bold">
        Edit Product
      </h1>

      {success && (
        <div className="mt-6 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {errors.form && (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errors.form}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium"
          >
            Title
          </label>

          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium"
          >
            Price
          </label>

          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-600">
              {errors.price}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label
            htmlFor="stock"
            className="mb-2 block text-sm font-medium"
          >
            Stock
          </label>

          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />

          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">
              {errors.stock}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium"
          >
            Category
          </label>

          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />

          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-black px-5 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}