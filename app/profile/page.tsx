"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Clock, CreditCard, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { toast } = useToast()

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    setProfileData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    })
  }, [user, router])

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would update the user profile via API
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    })
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container px-4 py-8 mx-auto md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 mb-4 text-white bg-primary rounded-full">
                  <User className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>

                <Button variant="outline" className="w-full mt-6" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold">Account</h3>
                <ul className="space-y-2">
                  <li>
                    <Button variant="ghost" className="justify-start w-full">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="justify-start w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Addresses
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="justify-start w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Payment Methods
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="justify-start w-full">
                      <Clock className="w-4 h-4 mr-2" />
                      Order History
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-white rounded-lg shadow-sm"
                >
                  <h2 className="mb-6 text-xl font-bold">Personal Information</h2>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit">Save Changes</Button>
                  </form>
                </motion.div>
              </TabsContent>

              <TabsContent value="orders">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="mb-6 text-xl font-bold">Order History</h2>

                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                    <p className="mt-2 text-muted-foreground">When you place orders, they will appear here</p>
                    <Button className="mt-6" onClick={() => router.push("/")}>
                      Browse Restaurants
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="addresses">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="mb-6 text-xl font-bold">Saved Addresses</h2>

                  <div className="text-center py-12">
                    <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No addresses saved</h3>
                    <p className="mt-2 text-muted-foreground">Save your delivery addresses for faster checkout</p>
                    <Button className="mt-6">Add New Address</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="mb-6 text-xl font-bold">Payment Methods</h2>

                  <div className="text-center py-12">
                    <CreditCard className="w-12 h-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No payment methods</h3>
                    <p className="mt-2 text-muted-foreground">Add a payment method for faster checkout</p>
                    <Button className="mt-6">Add Payment Method</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

