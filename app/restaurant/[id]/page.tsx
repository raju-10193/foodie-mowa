"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Star, Clock, MapPin, ChevronLeft, Heart, Share2, Info, Plus, Minus } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { useToast } from "@/components/ui/use-toast"

// Mock data for restaurant details
const restaurantsData = {
  "1": {
    id: "1",
    name: "Spice Paradise",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    coverImage:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.2,
    deliveryTime: "25-30 min",
    cuisine: "North Indian, Chinese",
    price: "₹200 for one",
    discount: "50% OFF up to ₹100",
    address: "123 Food Street, Hyderabad",
    promoted: true,
    menuCategories: [
      {
        id: "cat1",
        name: "Recommended",
        items: [
          {
            id: "item1",
            name: "Butter Chicken",
            description: "Tender chicken cooked in a rich buttery tomato sauce",
            price: "₹320",
            image:
              "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnV0dGVyJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            veg: false,
            bestseller: true,
          },
          {
            id: "item2",
            name: "Paneer Tikka Masala",
            description: "Grilled cottage cheese cubes in a spicy tomato gravy",
            price: "₹280",
            image:
              "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuZWVyJTIwdGlra2F8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
            veg: true,
            bestseller: false,
          },
        ],
      },
      {
        id: "cat2",
        name: "Starters",
        items: [
          {
            id: "item3",
            name: "Chicken 65",
            description: "Spicy deep-fried chicken marinated with Indian spices",
            price: "₹250",
            image:
              "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMDY1fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            veg: false,
            bestseller: true,
          },
          {
            id: "item4",
            name: "Veg Spring Rolls",
            description: "Crispy rolls filled with mixed vegetables",
            price: "₹180",
            image:
              "https://images.unsplash.com/photo-1606335543042-57c525922933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3ByaW5nJTIwcm9sbHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
            veg: true,
            bestseller: false,
          },
        ],
      },
      {
        id: "cat3",
        name: "Main Course",
        items: [
          {
            id: "item5",
            name: "Chicken Biryani",
            description: "Fragrant basmati rice cooked with chicken and aromatic spices",
            price: "₹350",
            image:
              "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            veg: false,
            bestseller: true,
          },
          {
            id: "item6",
            name: "Dal Makhani",
            description: "Black lentils cooked with butter and cream",
            price: "₹220",
            image:
              "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFsJTIwbWFraGFuaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            veg: true,
            bestseller: false,
          },
        ],
      },
      {
        id: "cat4",
        name: "Breads",
        items: [
          {
            id: "item7",
            name: "Butter Naan",
            description: "Soft leavened bread brushed with butter",
            price: "₹60",
            image:
              "https://images.unsplash.com/photo-1626100134630-056f4640a1fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            veg: true,
            bestseller: false,
          },
          {
            id: "item8",
            name: "Garlic Naan",
            description: "Naan topped with garlic and coriander",
            price: "₹70",
            image:
              "https://images.unsplash.com/photo-1626100134630-056f4640a1fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            veg: true,
            bestseller: false,
          },
        ],
      },
    ],
  },
  "2": {
    id: "2",
    name: "Pizza Heaven",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGl6emElMjByZXN0YXVyYW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    coverImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl6emElMjByZXN0YXVyYW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.5,
    deliveryTime: "30-35 min",
    cuisine: "Italian, Fast Food",
    price: "₹250 for one",
    discount: "FREE DELIVERY",
    address: "456 Pizza Lane, Hyderabad",
    promoted: false,
    menuCategories: [
      {
        id: "cat1",
        name: "Recommended",
        items: [
          {
            id: "item1",
            name: "Margherita Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and basil",
            price: "₹299",
            image:
              "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            veg: true,
            bestseller: true,
          },
          {
            id: "item2",
            name: "Pepperoni Pizza",
            description: "Pizza topped with pepperoni slices and cheese",
            price: "₹349",
            image:
              "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVwcGVyb25pJTIwcGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
            veg: false,
            bestseller: true,
          },
        ],
      },
    ],
  },
  "3": {
    id: "3",
    name: "Biryani House",
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    coverImage:
      "https://images.unsplash.com/photo-1633945274460-062cac9f7de8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.0,
    deliveryTime: "35-40 min",
    cuisine: "Biryani, Hyderabadi",
    price: "₹300 for one",
    discount: "20% OFF",
    address: "789 Biryani Street, Hyderabad",
    promoted: false,
    menuCategories: [
      {
        id: "cat1",
        name: "Recommended",
        items: [
          {
            id: "item1",
            name: "Hyderabadi Chicken Biryani",
            description: "Aromatic basmati rice cooked with tender chicken pieces and authentic spices",
            price: "₹320",
            image:
              "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            veg: false,
            bestseller: true,
          },
        ],
      },
    ],
  },
  "4": {
    id: "4",
    name: "Healthy Bowls",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    coverImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWx0aHklMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    rating: 4.3,
    deliveryTime: "20-25 min",
    cuisine: "Salads, Healthy Food",
    price: "₹180 for one",
    discount: "FREE ITEM on orders above ₹400",
    address: "101 Green Avenue, Hyderabad",
    promoted: false,
    menuCategories: [
      {
        id: "cat1",
        name: "Recommended",
        items: [
          {
            id: "item1",
            name: "Quinoa Bowl",
            description: "Nutritious bowl with quinoa, avocado, and fresh vegetables",
            price: "₹250",
            image:
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
            veg: true,
            bestseller: true,
          },
        ],
      },
    ],
  },
}

export default function RestaurantPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [restaurant, setRestaurant] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState("")
  const [cartItems, setCartItems] = useState<any>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const id = params.id as string
    const restaurantData = restaurantsData[id]

    if (restaurantData) {
      setRestaurant(restaurantData)
      if (restaurantData.menuCategories && restaurantData.menuCategories.length > 0) {
        setActiveCategory(restaurantData.menuCategories[0].id)
      }
    } else {
      router.push("/")
    }

    // Initialize cart from localStorage
    const storedCart = localStorage.getItem("foodie_mowa_cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [params.id, router])

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const addToCart = (item: any) => {
    const storedCart = localStorage.getItem("foodie_mowa_cart")
    const cart = storedCart ? JSON.parse(storedCart) : []

    const existingItemIndex = cart.findIndex((cartItem: any) => cartItem.id === item.id)

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }

    localStorage.setItem("foodie_mowa_cart", JSON.stringify(cart))
    setCartItems(cart)

    // Trigger storage event for header to update cart count
    window.dispatchEvent(new Event("storage"))

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    })
  }

  const removeFromCart = (itemId: string) => {
    const storedCart = localStorage.getItem("foodie_mowa_cart")
    if (!storedCart) return

    let cart = JSON.parse(storedCart)
    const existingItemIndex = cart.findIndex((item: any) => item.id === itemId)

    if (existingItemIndex > -1) {
      if (cart[existingItemIndex].quantity > 1) {
        cart[existingItemIndex].quantity -= 1
      } else {
        cart = cart.filter((item: any) => item.id !== itemId)
      }
    }

    localStorage.setItem("foodie_mowa_cart", JSON.stringify(cart))
    setCartItems(cart)

    // Trigger storage event for header to update cart count
    window.dispatchEvent(new Event("storage"))
  }

  const getItemCount = (itemId: string) => {
    const item = cartItems.find((item: any) => item.id === itemId)
    return item ? item.quantity : 0
  }

  const getTotalCartItems = () => {
    return cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="relative h-64 md:h-80">
        <Image src={restaurant.coverImage || restaurant.image} alt={restaurant.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40">
          <div className="container flex items-center h-full px-4 mx-auto md:px-6">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm"
              onClick={() => router.push("/")}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex flex-col text-white">
              <h1 className="text-3xl font-bold md:text-4xl">{restaurant.name}</h1>
              <p className="mt-2 text-lg">{restaurant.cuisine}</p>
              <p className="flex items-center mt-1 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {restaurant.address}
              </p>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 px-2 py-1 bg-white rounded text-black">
                  <span className="font-medium">{restaurant.rating}</span>
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div>
                  <span>{restaurant.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  {restaurant.discount}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto -mt-6 md:px-6">
        <div className="flex items-center justify-between p-4 bg-white rounded-t-lg shadow-md">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-1">
              <Heart className="w-4 h-4" />
              Favorite
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Info className="w-4 h-4" />
            More Info
          </Button>
        </div>
      </div>

      <div className="container grid grid-cols-1 gap-6 px-4 py-6 mx-auto md:grid-cols-4 md:px-6">
        <div className="md:col-span-1 md:sticky md:top-20 self-start">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Menu</h2>
            <ul className="space-y-2">
              {restaurant.menuCategories.map((category: any) => (
                <li key={category.id}>
                  <Button
                    variant={activeCategory === category.id ? "default" : "ghost"}
                    className="justify-start w-full"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          {restaurant.menuCategories.map((category: any) => (
            <div
              key={category.id}
              id={category.id}
              className={`mb-8 ${activeCategory === category.id ? "block" : "hidden md:block"}`}
            >
              <h2 className="mb-4 text-xl font-bold">{category.name}</h2>
              <div className="space-y-4">
                {category.items.map((item: any) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="relative w-full h-48 overflow-hidden rounded-lg md:w-40 md:h-32 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=150&width=150"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {item.bestseller && <Badge className="absolute top-2 left-2 bg-yellow-500">Bestseller</Badge>}
                      <div className="absolute top-2 right-2">
                        <div
                          className={`w-4 h-4 rounded-full border ${item.veg ? "border-green-500" : "border-red-500"}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full m-auto mt-1 ${item.veg ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="font-medium">{item.price}</p>
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>

                      <div className="flex items-center justify-between mt-4">
                        {getItemCount(item.id) > 0 ? (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center">{getItemCount(item.id)}</span>
                            <Button variant="outline" size="icon" className="w-8 h-8" onClick={() => addToCart(item)}>
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() =>
                              addToCart({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                              })
                            }
                          >
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {getTotalCartItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
          <div className="container flex items-center justify-between mx-auto">
            <div>
              <span className="font-medium">{getTotalCartItems()} items</span>
              <p className="text-sm text-muted-foreground">Extra charges may apply</p>
            </div>
            <Button onClick={() => router.push("/cart")}>View Cart</Button>
          </div>
        </div>
      )}
    </div>
  )
}

