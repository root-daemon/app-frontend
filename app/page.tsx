"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Switch } from "@/components/ui/switch";
import { ShoppingCart, ArrowRight, Sun, Moon } from "lucide-react";

const products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 999.99,
    image:
      "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    price: 1099.99,
    image:
      "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
  },
  {
    id: 3,
    name: "iPhone 16 Plus",
    price: 1199.99,
    image:
      "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
  },
  {
    id: 4,
    name: "iPhone 16 Pro Max",
    price: 1500,
    image:
      "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <main className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 p-4 flex justify-end">
        <div className="flex items-center space-x-2">
          <Sun className="h-5 w-5 text-yellow-500" />
          <Switch checked={darkMode} onCheckedChange={setDarkMode} aria-label="Toggle dark mode" />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Elevate Your Style</h1>
              <p className="text-xl mb-6 text-white">Discover our collection of premium accessories</p>
              <Button asChild size="lg">
                <Link href="/products">
                  Shop Now <ShoppingCart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <CardContainer key={product.id} className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                    {product.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    Hover over this card to unleash the power of CSS perspective
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4 flex justify-center">
                    <Image
                      src={product.image}
                      height="3000"
                      width="1000"
                      className="h-60 w-80 object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={product.name}
                      unoptimized={true} // Add this line to bypass Next.js optimization
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href="https://twitter.com/mannupaaji"
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      {product.price}
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Buy Now
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 dark:bg-gray-950 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold mb-4">Join Our VIP Club</h2>
            <p className="text-xl mb-8">Get exclusive offers and early access to new products</p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">
                Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
