"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:8080/api/products/${id}`);
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default function ProductPage({ params }: { params: { id: string } }) {
  interface Product {
    name: string;
    image: string;
    price: number;
    description: string;
  }

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProduct(params.id).then(setProduct);
  }, [params.id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-gray-800"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md py-4"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        </div>
      </motion.header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row md:items-start md:space-x-8"
      >
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
          />
        </motion.div>

        <div className="md:w-1/2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h2>
            <p className="text-3xl font-semibold text-blue-600">
              ${product.price.toFixed(2)}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg text-gray-700 leading-relaxed"
          >
            {product.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button
              className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </div>
      </motion.main>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-gray-800 text-white py-8 mt-auto"
      >
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Your E-commerce Store. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
