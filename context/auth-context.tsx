"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  phone: string
}

type SignupData = {
  name: string
  email: string
  phone: string
  password: string
}

type LoginData = {
  email: string
  password: string
}

type AuthContextType = {
  user: User | null
  signup: (data: SignupData) => Promise<void>
  login: (data: LoginData) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("foodie_mowa_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("foodie_mowa_user")
      }
    }
    setIsLoading(false)
  }, [])

  const signup = async (data: SignupData): Promise<void> => {
    // In a real app, this would be an API call to create a user
    // For this demo, we'll simulate it with localStorage

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("foodie_mowa_users") || "[]")
    const existingUser = users.find((u: any) => u.email === data.email)

    if (existingUser) {
      throw new Error("Email already in use")
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      // In a real app, you would hash the password
      password: data.password,
    }

    // Save to "database"
    users.push(newUser)
    localStorage.setItem("foodie_mowa_users", JSON.stringify(users))

    // Log user in
    const { password, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("foodie_mowa_user", JSON.stringify(userWithoutPassword))
  }

  const login = async (data: LoginData): Promise<void> => {
    // In a real app, this would be an API call to authenticate
    // For this demo, we'll simulate it with localStorage

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check credentials
    const users = JSON.parse(localStorage.getItem("foodie_mowa_users") || "[]")
    const matchedUser = users.find((u: any) => u.email === data.email && u.password === data.password)

    if (!matchedUser) {
      throw new Error("Invalid credentials")
    }

    // Log user in
    const { password, ...userWithoutPassword } = matchedUser
    setUser(userWithoutPassword)
    localStorage.setItem("foodie_mowa_user", JSON.stringify(userWithoutPassword))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("foodie_mowa_user")
  }

  return <AuthContext.Provider value={{ user, signup, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

