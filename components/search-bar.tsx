"use client"

import { useState, useRef } from "react"
import { Search, Mic, Camera, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function SearchBar() {
  const [searchMode, setSearchMode] = useState<"text" | "voice" | "image">("text")
  const [isListening, setIsListening] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Voice search functionality
  const startVoiceSearch = () => {
    setSearchMode("voice")
    setIsListening(true)

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      // This is just a mock implementation since we can't actually use the API in this environment
      // In a real app, you would use the Web Speech API

      // Simulate voice recognition after 2 seconds
      setTimeout(() => {
        setSearchQuery("chicken biryani")
        setIsListening(false)
        toast({
          title: "Voice detected!",
          description: "Searching for 'chicken biryani'",
        })
      }, 2000)
    } else {
      toast({
        title: "Voice search not supported",
        description: "Your browser doesn't support voice search.",
        variant: "destructive",
      })
      setIsListening(false)
      setSearchMode("text")
    }
  }

  // Image search functionality
  const startImageSearch = () => {
    setSearchMode("image")

    // In a real app, you would open the camera or file picker
    toast({
      title: "Image search",
      description: "Take a photo of food to search",
      action: (
        <ToastAction
          altText="Simulate"
          onClick={() => {
            setSearchQuery("pizza")
            toast({
              title: "Image recognized!",
              description: "Searching for 'pizza'",
            })
            setSearchMode("text")
          }}
        >
          Simulate
        </ToastAction>
      ),
    })
  }

  const resetSearch = () => {
    setSearchQuery("")
    setSearchMode("text")
    setIsListening(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative flex-1 max-w-md mx-4">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for food, restaurants..."
          className="pl-10 pr-20 h-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-2 flex items-center gap-1">
          {searchQuery && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={resetSearch}>
              <X className="w-4 h-4" />
            </Button>
          )}
          <AnimatePresence>
            {searchMode === "voice" && isListening ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute right-16 top-1/2 -translate-y-1/2"
              >
                <div className="flex items-center justify-center w-8 h-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                    }}
                    className="w-6 h-6 bg-red-500 rounded-full"
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={startVoiceSearch}>
            <Mic className={`w-4 h-4 ${searchMode === "voice" && isListening ? "text-red-500" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={startImageSearch}>
            <Camera className={`w-4 h-4 ${searchMode === "image" ? "text-blue-500" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}

