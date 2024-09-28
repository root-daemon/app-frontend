"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ShoppingCart, ArrowRight, Sun, Moon } from 'lucide-react'

const products = [
  { id: 1, name: "Elegant Watch", price: 199.99, image: "https://ynvlvlqzgtwjwhcqojhg.supabase.co/storage/v1/object/public/images/watch.jpg" },
  { id: 2, name: "Designer Sunglasses", price: 149.99, image: "https://ynvlvlqzgtwjwhcqojhg.supabase.co/storage/v1/object/public/images/sunglasses.jpg" },
  { id: 3, name: "Leather Wallet", price: 79.99, image: "https://ynvlvlqzgtwjwhcqojhg.supabase.co/storage/v1/object/public/images/wallet.jpg" },
  { id: 4, name: "Silk Tie", price: 59.99, image: "https://ynvlvlqzgtwjwhcqojhg.supabase.co/storage/v1/object/public/images/tie.jpg" },
]

export function Page() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <main className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 p-4 flex justify-end">
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
          src="https://ynvlvlqzgtwjwhcqojhg.supabase.co/storage/v1/object/public/images/hero-image.jpg"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="dark:bg-gray-700 dark:text-white">
                  <CardHeader>
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{product.name}</CardTitle>
                    <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/products/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
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
  )
}