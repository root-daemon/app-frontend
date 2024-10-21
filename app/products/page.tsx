/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products?_=${new Date().getTime()}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error("Failed to add product");
      await fetchProducts();
      setNewProduct({ name: "", price: 0, description: "" });
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${editingProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProduct),
        }
      );
      if (!response.ok) throw new Error("Failed to update product");
      await fetchProducts();
      setEditingProduct(null);
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");
      await fetchProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      <form
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        className="mb-4"
      >
        <Input
          type="text"
          placeholder="Name"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="mb-2"
        />
        <Input
          type="number"
          placeholder="Price"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({
                  ...editingProduct,
                  price: parseFloat(e.target.value),
                })
              : setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
          }
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Description"
          value={
            editingProduct ? editingProduct.description : newProduct.description
          }
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              : setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="mb-2"
        />
        <Button type="submit">
          {editingProduct ? "Update Product" : "Add Product"}
        </Button>
        {editingProduct && (
          <Button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="ml-2"
          >
            Cancel
          </Button>
        )}
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <Button
                  onClick={() => setEditingProduct(product)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteProduct(product.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ToastContainer />
    </div>
  );
}
