"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Switch } from "@/components/ui/switch";
import {
  ShoppingCart,
  ArrowRight,
  Sun,
  Moon,
  Plus,
  Pencil,
  Trash,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error("Failed to add product");
      await fetchProducts();
      setNewProduct({ name: "", price: 0, description: "", image: "" });
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Failed to add product");
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async () => {
    if (editingProduct) {
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
        console.error("Error updating product:", error);
      }
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
      console.error("Error deleting product:", error);
    }
  };

  return (
    <main className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Our Store</h1>
        <div className="flex items-center space-x-2">
          <Sun className="h-5 w-5 text-yellow-500" />
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            aria-label="Toggle dark mode"
          />
          <Moon className="h-5 w-5 text-gray-500" />
        </div>
      </nav>

      <section className="relative h-[600px] overflow-hidden">
        <Image
          src="https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg"
          alt="Stylish person wearing watch and sunglasses"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Elevate Your Style
              </h1>
              <p className="text-xl mb-6 text-white">
                Discover our collection of premium accessories
              </p>
              <Button asChild size="lg">
                <Link href="#products">
                  Shop Now <ShoppingCart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold dark:text-white">
              Featured Products
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </DialogContent>
            </Dialog>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {products.map((product) => (
                <CardContainer key={product.id} className="inter-var">
                  <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                      {product.name}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                      {product.description}
                    </CardItem>
                    <CardItem
                      translateZ="100"
                      className="w-full mt-4 flex justify-center"
                    >
                      <Image
                        src={product.image}
                        height={3000}
                        width={1000}
                        className="h-60 w-80 object-cover rounded-xl group-hover/card:shadow-xl"
                        alt={product.name}
                        unoptimized={true}
                      />
                    </CardItem>
                    <div className="flex justify-between items-center mt-20">
                      <CardItem
                        translateZ={20}
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                      >
                        ${product.price.toFixed(2)}
                      </CardItem>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-name"
                                  className="text-right"
                                >
                                  Name
                                </Label>
                                <Input
                                  id="edit-name"
                                  value={editingProduct?.name || ""}
                                  onChange={(e) =>
                                    setEditingProduct((prev) =>
                                      prev
                                        ? { ...prev, name: e.target.value }
                                        : null
                                    )
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-price"
                                  className="text-right"
                                >
                                  Price
                                </Label>
                                <Input
                                  id="edit-price"
                                  type="number"
                                  value={editingProduct?.price || 0}
                                  onChange={(e) =>
                                    setEditingProduct((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            price: parseFloat(e.target.value),
                                          }
                                        : null
                                    )
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-description"
                                  className="text-right"
                                >
                                  Description
                                </Label>
                                <Input
                                  id="edit-description"
                                  value={editingProduct?.description || ""}
                                  onChange={(e) =>
                                    setEditingProduct((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            description: e.target.value,
                                          }
                                        : null
                                    )
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-image"
                                  className="text-right"
                                >
                                  Image URL
                                </Label>
                                <Input
                                  id="edit-image"
                                  value={editingProduct?.image || ""}
                                  onChange={(e) =>
                                    setEditingProduct((prev) =>
                                      prev
                                        ? { ...prev, image: e.target.value }
                                        : null
                                    )
                                  }
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <Button onClick={handleUpdateProduct}>
                              Update Product
                            </Button>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-900 dark:bg-gray-950 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our VIP Club</h2>
            <p className="text-xl mb-8">
              Get exclusive offers and early access to new products
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">
                Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
