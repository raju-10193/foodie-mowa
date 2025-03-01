"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CartNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [items, setItems] = useState(3)

  useEffect(() => {
    // Show notification after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)

      // Request permission for notifications
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // This would create an actual notification in a real app
            // new Notification("Items in your cart", {
            //   body: "You have 3 items in your cart. Complete your order now!",
            //   icon: "/favicon.ico"
            // });
          }
        })
      }

      // Hide after 8 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, 8000)

      return () => clearTimeout(hideTimer)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs w-full border border-gray-200"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="font-medium">Your cart is waiting!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You have {items} items in your cart. Complete your order now!
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="default">
                  Checkout
                </Button>
                <Button size="sm" variant="outline">
                  View Cart
                </Button>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 ml-1 text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

