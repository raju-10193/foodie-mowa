"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface FoodCardProps {
  name: string
  image: string
  price: string
}

export function FoodCard({ name, image, price }: FoodCardProps) {
  const { toast } = useToast()

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    })
  }

  return (
    <motion.div whileHover={{ y: -5 }} className="relative overflow-hidden rounded-lg shadow-sm border">
      <div className="relative h-32 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold">{price}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

