"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    title: "Hungry? We've got you covered",
    description: "Order food from the best restaurants near you",
    image: "/placeholder.svg?height=400&width=800",
    color: "bg-orange-100",
  },
  {
    id: 2,
    title: "50% OFF your first order",
    description: "Use code WELCOME50 at checkout",
    image: "/placeholder.svg?height=400&width=800",
    color: "bg-blue-100",
  },
  {
    id: 3,
    title: "Free delivery on orders above ₹199",
    description: "Order now and save on delivery charges",
    image: "/placeholder.svg?height=400&width=800",
    color: "bg-green-100",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative mt-6 overflow-hidden rounded-xl">
      <div className="relative h-[300px] md:h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 ${heroSlides[currentSlide].color}`}
          >
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 md:w-1/2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-6 text-lg text-muted-foreground"
              >
                {heroSlides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button size="lg">Order Now</Button>
              </motion.div>
            </div>
            <div className="absolute top-0 right-0 hidden w-1/2 h-full md:block">
              <Image
                src={heroSlides[currentSlide].image || "/placeholder.svg"}
                alt={heroSlides[currentSlide].title}
                fill
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-primary w-6" : "bg-gray-300"
            } transition-all duration-300`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

