import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FoodCard } from "@/components/food-card"
import { RestaurantCard } from "@/components/restaurant-card"
import { CategoryScroll } from "@/components/category-scroll"
import { HeroSection } from "@/components/hero-section"
import { CartNotification } from "@/components/cart-notification"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container px-4 mx-auto md:px-6">
        <HeroSection />

        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold">What's on your mind?</h2>
          <CategoryScroll />
        </section>

        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Top Restaurants</h2>
            <Tabs defaultValue="delivery">
              <TabsList>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                <TabsTrigger value="dine-out">Dine Out</TabsTrigger>
                <TabsTrigger value="nightlife">Nightlife</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <RestaurantCard
              id="1"
              name="Spice Paradise"
              image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              rating={4.2}
              deliveryTime="25-30 min"
              cuisine="North Indian, Chinese"
              price="₹200 for one"
              discount="50% OFF up to ₹100"
              promoted={true}
            />
            <RestaurantCard
              id="2"
              name="Pizza Heaven"
              image="https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGl6emElMjByZXN0YXVyYW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
              rating={4.5}
              deliveryTime="30-35 min"
              cuisine="Italian, Fast Food"
              price="₹250 for one"
              discount="FREE DELIVERY"
            />
            <RestaurantCard
              id="3"
              name="Biryani House"
              image="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              rating={4.0}
              deliveryTime="35-40 min"
              cuisine="Biryani, Hyderabadi"
              price="₹300 for one"
              discount="20% OFF"
            />
            <RestaurantCard
              id="4"
              name="Healthy Bowls"
              image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
              rating={4.3}
              deliveryTime="20-25 min"
              cuisine="Salads, Healthy Food"
              price="₹180 for one"
              discount="FREE ITEM on orders above ₹400"
            />
          </div>

          <Button variant="outline" className="mt-6 mx-auto block">
            View More Restaurants
          </Button>
        </section>

        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold">Popular Dishes Near You</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <FoodCard
              name="Chicken Biryani"
              image="https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              price="₹220"
            />
            <FoodCard
              name="Butter Naan"
              image="https://images.unsplash.com/photo-1626100134630-056f4640a1fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              price="₹40"
            />
            <FoodCard
              name="Paneer Tikka"
              image="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFuZWVyJTIwdGlra2F8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
              price="₹180"
            />
            <FoodCard
              name="Veg Fried Rice"
              image="https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZWQlMjByaWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
              price="₹150"
            />
            <FoodCard
              name="Chocolate Shake"
              image="https://images.unsplash.com/photo-1541658016709-82535e94bc69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hvY29sYXRlJTIwc2hha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
              price="₹120"
            />
            <FoodCard
              name="Masala Dosa"
              image="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              price="₹90"
            />
          </div>
        </section>

        <CartNotification />
      </main>

      <footer className="py-8 mt-12 bg-gray-100">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Foodie Mowa</h3>
              <p className="text-muted-foreground">
                Order food from the best restaurants and shops near you delivered in minutes.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">About Us</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#">About</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Help & Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#">Partner with us</Link>
                </li>
                <li>
                  <Link href="#">Ride with us</Link>
                </li>
                <li>
                  <Link href="#">FAQs</Link>
                </li>
                <li>
                  <Link href="#">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
              </div>
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">Download our App</h4>
                <div className="flex gap-2">
                  <Link href="#">
                    <Image src="/placeholder.svg?height=40&width=120" alt="App Store" width={120} height={40} />
                  </Link>
                  <Link href="#">
                    <Image src="/placeholder.svg?height=40&width=120" alt="Google Play" width={120} height={40} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 text-center border-t">
            <p className="text-muted-foreground">© 2023 Foodie Mowa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

