"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Clock, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  rating: number
  deliveryTime: string
  cuisine: string
  price: string
  discount: string
  promoted?: boolean
}

export function RestaurantCard({
  id,
  name,
  image,
  rating,
  deliveryTime,
  cuisine,
  price,
  discount,
  promoted = false,
}: RestaurantCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} className="relative overflow-hidden rounded-lg shadow-md">
      <Link href={`/restaurant/${id}`} className="block">
        <div className="relative">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image || "/placeholder.svg?height=200&width=300"}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Heart className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>

          {promoted && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              Promoted
            </Badge>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center justify-between">
              <Badge variant="default" className="bg-white text-black">
                {discount}
              </Badge>
              <Badge variant="default" className="bg-white text-black flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {deliveryTime}
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-800 rounded">
              <span className="font-medium">{rating}</span>
              <Star className="w-3 h-3 fill-green-800" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{cuisine}</p>
          <p className="text-sm text-muted-foreground mt-1">{price}</p>
        </div>
      </Link>
    </motion.div>
  )
}

