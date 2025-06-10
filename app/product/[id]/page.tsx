import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Heart, Minus, Plus, Share2, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="w-full lg:w-3/5">
              <div className="flex flex-col gap-4">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=800&width=800"
                    alt="Product Image"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-4 min-w-max">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <button
                        key={index}
                        className="relative w-24 h-24 rounded-md overflow-hidden border-2 border-primary"
                      >
                        <Image
                          src={`/placeholder.svg?height=200&width=200&text=Image ${index + 1}`}
                          alt={`Product thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-2/5">
              <div className="flex flex-col h-full">
                <Link
                  href="/categories"
                  className="flex items-center text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to all products
                </Link>

                <Badge className="w-fit mb-4 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">
                  New Arrival
                </Badge>

                <h1 className="font-heading text-3xl md:text-4xl mb-2">Kigali Pattern Shirt</h1>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < 4 ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(24 reviews)</span>
                </div>

                <div className="text-2xl font-heading mb-6">$89.99</div>

                <p className="text-muted-foreground mb-6">
                  This elegant shirt features traditional Rwandan patterns reimagined for the modern wardrobe. Crafted
                  from 100% organic cotton, it combines comfort with cultural significance, making it perfect for both
                  casual and semi-formal occasions.
                </p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-medium mb-3">Color</h3>
                    <div className="flex gap-3">
                      {[
                        { name: "Green", color: "bg-green-700", selected: true },
                        { name: "Blue", color: "bg-blue-700", selected: false },
                        { name: "Black", color: "bg-black", selected: false },
                      ].map((color) => (
                        <button
                          key={color.name}
                          className={`w-10 h-10 rounded-full ${color.color} flex items-center justify-center ${color.selected ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                          title={color.name}
                        >
                          {color.selected && <Check className="h-5 w-5 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Size</h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { size: "XS", available: true, selected: false },
                        { size: "S", available: true, selected: false },
                        { size: "M", available: true, selected: true },
                        { size: "L", available: true, selected: false },
                        { size: "XL", available: true, selected: false },
                        { size: "XXL", available: false, selected: false },
                      ].map((size) => (
                        <button
                          key={size.size}
                          disabled={!size.available}
                          className={`w-12 h-12 rounded-md flex items-center justify-center text-sm
                            ${
                              size.selected
                                ? "bg-primary text-primary-foreground"
                                : "border hover:bg-muted transition-colors"
                            }
                            ${!size.available ? "opacity-50 cursor-not-allowed" : ""}
                          `}
                        >
                          {size.size}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      <Link href="#" className="underline">
                        Size Guide
                      </Link>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Quantity</h3>
                    <div className="flex items-center border rounded-md w-fit">
                      <Button variant="ghost" size="icon" className="rounded-none">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">1</span>
                      <Button variant="ghost" size="icon" className="rounded-none">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="gap-2 flex-1">
                    <ShoppingBag className="h-5 w-5" /> Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Heart className="h-5 w-5" /> Add to Wishlist
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </div>

                <Separator className="my-8" />

                <div className="space-y-4 text-sm">
                  <div className="flex gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <p>Free shipping on orders over $100</p>
                  </div>
                  <div className="flex gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <p>30-day return policy</p>
                  </div>
                  <div className="flex gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <p>Ethically sourced materials</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="description"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent py-3 px-6"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent py-3 px-6"
                >
                  Details & Care
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent py-3 px-6"
                >
                  Reviews (24)
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    The Kigali Pattern Shirt is a celebration of Rwandan artistry and contemporary fashion. Inspired by
                    traditional imigongo patterns, this shirt features geometric designs that have been reimagined for
                    the modern wardrobe.
                  </p>
                  <p>
                    Each shirt is crafted from 100% organic cotton, ensuring both comfort and sustainability. The fabric
                    is lightweight yet durable, making it perfect for year-round wear. The vibrant patterns are created
                    using eco-friendly dyes that maintain their richness even after multiple washes.
                  </p>
                  <p>
                    The shirt features a modern slim fit with a slightly relaxed silhouette, providing comfort without
                    sacrificing style. The button-down front, collar, and cuffs give it a versatile appeal that works
                    well for both casual outings and more formal occasions.
                  </p>
                  <p>
                    By purchasing this shirt, you're not only adding a unique piece to your wardrobe but also supporting
                    traditional Rwandan craftsmanship and sustainable fashion practices.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="details" className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-heading text-xl mb-4">Product Details</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 100% organic cotton</li>
                      <li>• Regular fit</li>
                      <li>• Button-down front</li>
                      <li>• Collar and cuffs</li>
                      <li>• Traditional Rwandan pattern</li>
                      <li>• Available in multiple colors</li>
                      <li>• Model is 6'1" and wears size M</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl mb-4">Care Instructions</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Machine wash cold with similar colors</li>
                      <li>• Gentle cycle</li>
                      <li>• Do not bleach</li>
                      <li>• Tumble dry low</li>
                      <li>• Iron on low heat if needed</li>
                      <li>• Do not dry clean</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-xl">Customer Reviews</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < 4 ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                              />
                            ))}
                        </div>
                        <span className="text-sm">Based on 24 reviews</span>
                      </div>
                    </div>
                    <Button>Write a Review</Button>
                  </div>

                  <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="border-b pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">John Doe</h4>
                          <span className="text-sm text-muted-foreground">2 weeks ago</span>
                        </div>
                        <div className="flex mb-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < (5 - (index % 2)) ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                              />
                            ))}
                        </div>
                        <p className="text-muted-foreground">
                          This shirt is amazing! The quality is excellent and the pattern is even more beautiful in
                          person. I've received many compliments when wearing it. The fit is perfect and true to size.
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="font-heading text-2xl md:text-3xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="product-card overflow-hidden border-none shadow-sm">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Related product"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-medium">Rwandan Heritage Tee</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-heading">$69.99</p>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                            />
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
