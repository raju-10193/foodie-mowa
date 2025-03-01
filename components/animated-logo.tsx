"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Utensils } from "lucide-react"

export function AnimatedLogo() {
  return (
    <Link href="/">
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" }}
        >
          <Utensils className="w-6 h-6 text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-xl"
        >
          <span className="text-orange-500">Foodie</span>
          <span className="text-gray-800">Mowa</span>
        </motion.div>
      </motion.div>
    </Link>
  )
}

