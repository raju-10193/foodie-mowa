"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { useToast } from "@/components/ui/use-toast"

interface CartItem {
  id: string
  name: string
  price: string
  image: string
  quantity: number
}

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedCart = localStorage.getItem("foodie_mowa_cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
    setIsLoading(false)
  }, [])

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart)
    localStorage.setItem("foodie_mowa_cart", JSON.stringify(newCart))
  }

  const increaseQuantity = (itemId: string) => {
    const newCart = cartItems.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item))
    updateCart(newCart)
  }

  const decreaseQuantity = (itemId: string) => {
    const newCart = cartItems
      .map((item) => (item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0)
    updateCart(newCart)
  }

  const removeItem = (itemId: string) => {
    const newCart = cartItems.filter((item) => item.id !== itemId)
    updateCart(newCart)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = Number.parseFloat(item.price.replace("₹", ""))
        return total + price * item.quantity
      }, 0)
      .toFixed(2)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container px-4 py-8 mx-auto md:px-6">
        <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-lg shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
            <p className="mb-4 text-muted-foreground">Add some delicious items to your cart and order now!</p>
            <Button onClick={() => router.push("/")}>Browse Restaurants</Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center p-4 mb-4 bg-white rounded-lg shadow-sm"
                >
                  <div className="relative w-20 h-20 mr-4 overflow-hidden rounded-md">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" className="w-8 h-8" onClick={() => decreaseQuantity(item.id)}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="w-8 h-8" onClick={() => increaseQuantity(item.id)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery Fee</span>
                  <span>₹40.00</span>
                </div>
                <div className="flex justify-between mb-4 text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{(Number.parseFloat(getTotalPrice()) + 40).toFixed(2)}</span>
                </div>
                <Button className="w-full">Proceed to Checkout</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

