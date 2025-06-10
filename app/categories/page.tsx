"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Filter, X, Grid3X3, List, Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Mock product data
const allProducts = [
  {
    id: 1,
    name: "Kigali Pattern Shirt",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Men",
    subcategory: "Shirts",
    color: "Blue",
    size: ["S", "M", "L", "XL"],
    rating: 5,
    isNew: true,
    isSale: true,
    discount: 25,
    inStock: true
  },
  {
    id: 2,
    name: "Amahoro Dress",
    price: 129.99,
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Women",
    subcategory: "Dresses",
    color: "Red",
    size: ["XS", "S", "M", "L"],
    rating: 4,
    isNew: false,
    isSale: false,
    inStock: true
  },
  {
    id: 3,
    name: "Unity Jacket",
    price: 159.99,
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Men",
    subcategory: "Jackets",
    color: "Black",
    size: ["M", "L", "XL", "XXL"],
    rating: 5,
    isNew: true,
    isSale: false,
    inStock: true
  },
  {
    id: 4,
    name: "Akagera Scarf",
    price: 49.99,
    originalPrice: 65.00,
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Accessories",
    subcategory: "Scarves",
    color: "Yellow",
    size: ["One Size"],
    rating: 4,
    isNew: false,
    isSale: true,
    discount: 23,
    inStock: true
  },
  {
    id: 5,
    name: "Heritage Blouse",
    price: 95.99,
    image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Women",
    subcategory: "Blouses",
    color: "White",
    size: ["XS", "S", "M", "L", "XL"],
    rating: 5,
    isNew: true,
    isSale: false,
    inStock: true
  },
  {
    id: 6,
    name: "Cultural Pants",
    price: 79.99,
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Men",
    subcategory: "Pants",
    color: "Green",
    size: ["S", "M", "L", "XL"],
    rating: 4,
    isNew: false,
    isSale: false,
    inStock: false
  },
  {
    id: 7,
    name: "Kids Traditional Set",
    price: 69.99,
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Kids",
    subcategory: "Sets",
    color: "Blue",
    size: ["2T", "3T", "4T", "5T"],
    rating: 5,
    isNew: true,
    isSale: false,
    inStock: true
  },
  {
    id: 8,
    name: "Elegant Handbag",
    price: 119.99,
    originalPrice: 150.00,
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Accessories",
    subcategory: "Bags",
    color: "Black",
    size: ["One Size"],
    rating: 4,
    isNew: false,
    isSale: true,
    discount: 20,
    inStock: true
  },
  {
    id: 9,
    name: "Summer Kimono",
    price: 139.99,
    image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Women",
    subcategory: "Kimonos",
    color: "Yellow",
    size: ["S", "M", "L"],
    rating: 5,
    isNew: true,
    isSale: false,
    inStock: true
  }
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlySale, setShowOnlySale] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [wishlist, setWishlist] = useState<number[]>([])
  const itemsPerPage = 9

  // Get unique values for filters
  const categories = [...new Set(allProducts.map(p => p.category))]
  const subcategories = [...new Set(allProducts.map(p => p.subcategory))]
  const colors = [...new Set(allProducts.map(p => p.color))]
  const sizes = [...new Set(allProducts.flatMap(p => p.size))]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }

      // Subcategory filter
      if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.subcategory)) {
        return false
      }

      // Color filter
      if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
        return false
      }

      // Size filter
      if (selectedSizes.length > 0 && !selectedSizes.some(size => product.size.includes(size))) {
        return false
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Stock filter
      if (showOnlyInStock && !product.inStock) {
        return false
      }

      // New filter
      if (showOnlyNew && !product.isNew) {
        return false
      }

      // Sale filter
      if (showOnlySale && !product.isSale) {
        return false
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "newest":
        filtered = filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, selectedCategories, selectedSubcategories, selectedColors, selectedSizes, priceRange, sortBy, showOnlyInStock, showOnlyNew, showOnlySale])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedSubcategories([])
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([0, 200])
    setShowOnlyInStock(false)
    setShowOnlyNew(false)
    setShowOnlySale(false)
    setCurrentPage(1)
  }

  // Toggle wishlist
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  // Active filters count
  const activeFiltersCount = selectedCategories.length + selectedSubcategories.length + selectedColors.length + selectedSizes.length + (showOnlyInStock ? 1 : 0) + (showOnlyNew ? 1 : 0) + (showOnlySale ? 1 : 0)

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#3c5e9e]">Search Products</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#3c5e9e]/20 focus:border-[#3c5e9e]"
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#3c5e9e]">Quick Filters</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="in-stock" 
              checked={showOnlyInStock}
              onCheckedChange={setShowOnlyInStock}
            />
            <label htmlFor="in-stock" className="text-sm font-medium">In Stock Only</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="new-arrivals" 
              checked={showOnlyNew}
              onCheckedChange={setShowOnlyNew}
            />
            <label htmlFor="new-arrivals" className="text-sm font-medium">New Arrivals</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="on-sale" 
              checked={showOnlySale}
              onCheckedChange={setShowOnlySale}
            />
            <label htmlFor="on-sale" className="text-sm font-medium">On Sale</label>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#3c5e9e]">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category])
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category))
                  }
                }}
              />
              <label htmlFor={`category-${category}`} className="text-sm font-medium">
                {category} ({allProducts.filter(p => p.category === category).length})
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#3c5e9e]">Product Types</h3>
        <div className="space-y-2">
          {subcategories.map((subcategory) => (
            <div key={subcategory} className="flex items-center space-x-2">
              <Checkbox 
                id={`subcategory-${subcategory}`}
                checked={selectedSubcategories.includes(subcategory)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedSubcategories([...selectedSubcategories, subcategory])
                  } else {
                    setSelectedSubcategories(selectedSubcategories.filter(s => s !== subcategory))
                  }
                }}
              />
              <label htmlFor={`subcategory-${subcategory}`} className="text-sm font-medium">
                {subcategory}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#3c5e9e]">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={300}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-20 text-sm"
            />
            <span className="text-gray-500">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 300])}
              className="w-20 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#3c5e9e]">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const colorClasses = {
              Black: "bg-black",
              White: "bg-white border-2 border-gray-300",
              Red: "bg-red-500",
              Blue: "bg-blue-500",
              Green: "bg-green-500",
              Yellow: "bg-yellow-400"
            }
            
            return (
              <button
                key={color}
                onClick={() => {
                  if (selectedColors.includes(color)) {
                    setSelectedColors(selectedColors.filter(c => c !== color))
                  } else {
                    setSelectedColors([...selectedColors, color])
                  }
                }}
                className={cn(
                  "w-8 h-8 rounded-full transition-all duration-200",
                  colorClasses[color as keyof typeof colorClasses],
                  selectedColors.includes(color) 
                    ? "ring-2 ring-[#3c5e9e] ring-offset-2 scale-110" 
                    : "hover:scale-105"
                )}
                title={color}
              />
            )
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#3c5e9e]">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                if (selectedSizes.includes(size)) {
                  setSelectedSizes(selectedSizes.filter(s => s !== size))
                } else {
                  setSelectedSizes([...selectedSizes, size])
                }
              }}
              className={cn(
                "px-3 py-2 border rounded-md text-sm font-medium transition-all duration-200",
                selectedSizes.includes(size)
                  ? "bg-[#3c5e9e] text-white border-[#3c5e9e]"
                  : "border-gray-300 hover:border-[#3c5e9e] hover:text-[#3c5e9e]"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-r from-[#3c5e9e] to-[#2a4a7a] text-white">
        <div className="container px-4 mx-auto text-center">
          <h1 className="font-bold text-4xl md:text-5xl mb-4">Shop Our Collections</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Explore our diverse range of clothing and accessories, each piece crafted with attention to detail and
            cultural significance.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Men", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600", link: "/categories/men", count: allProducts.filter(p => p.category === "Men").length },
              { name: "Women", image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600", link: "/categories/women", count: allProducts.filter(p => p.category === "Women").length },
              { name: "Kids", image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600", link: "/categories/kids", count: allProducts.filter(p => p.category === "Kids").length },
              { name: "Accessories", image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600", link: "/categories/accessories", count: allProducts.filter(p => p.category === "Accessories").length },
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  if (selectedCategories.includes(category.name)) {
                    setSelectedCategories(selectedCategories.filter(c => c !== category.name))
                  } else {
                    setSelectedCategories([category.name])
                  }
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl aspect-[4/5] block transition-all duration-300 hover:scale-105",
                  selectedCategories.includes(category.name) ? "ring-4 ring-[#f4fc0a] shadow-2xl" : "shadow-lg hover:shadow-xl"
                )}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3c5e9e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-bold text-2xl text-white mb-2">{category.name}</h3>
                  <p className="text-[#f4fc0a] text-sm font-medium mb-3">{category.count} Products</p>
                  <div className="flex items-center text-white group-hover:text-[#f4fc0a] transition-colors duration-300">
                    <span className="font-medium">
                      {selectedCategories.includes(category.name) ? "Selected" : "Select Category"}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section with Filters */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-xl text-[#3c5e9e]">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#f4fc0a] text-[#3c5e9e]">{activeFiltersCount}</Badge>
                      <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-sm text-red-600 hover:text-red-700">
                        Clear All
                      </Button>
                    </div>
                  )}
                </div>
                <FilterContent />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Header with controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="font-bold text-2xl text-[#3c5e9e] mb-2">
                    {filteredProducts.length > 0 ? `${filteredProducts.length} Products Found` : "No Products Found"}
                  </h2>
                  {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map(category => (
                        <Badge key={category} variant="secondary" className="gap-1">
                          {category}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                          />
                        </Badge>
                      ))}
                      {selectedColors.map(color => (
                        <Badge key={color} variant="secondary" className="gap-1">
                          {color}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => setSelectedColors(selectedColors.filter(c => c !== color))}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden border-[#3c5e9e] text-[#3c5e9e]">
                        <Filter className="h-4 w-4 mr-2" /> 
                        Filters
                        {activeFiltersCount > 0 && (
                          <Badge className="ml-2 bg-[#f4fc0a] text-[#3c5e9e] text-xs">{activeFiltersCount}</Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle className="text-[#3c5e9e]">Filters</SheetTitle>
                        <SheetDescription>
                          Refine your search to find the perfect products
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                      {activeFiltersCount > 0 && (
                        <div className="mt-6 pt-6 border-t">
                          <Button variant="outline" onClick={clearAllFilters} className="w-full">
                            Clear All Filters
                          </Button>
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>

                  {/* View Mode Toggle */}
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "rounded-none",
                        viewMode === "grid" ? "bg-[#3c5e9e] text-white" : "text-gray-600"
                      )}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "rounded-none",
                        viewMode === "list" ? "bg-[#3c5e9e] text-white" : "text-gray-600"
                      )}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] border-[#3c5e9e]/20 focus:border-[#3c5e9e]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length > 0 ? (
                <>
                  <div className={cn(
                    "gap-6 mb-12",
                    viewMode === "grid" 
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                      : "flex flex-col space-y-6"
                  )}>
                    {paginatedProducts.map((product) => (
                      <Card key={product.id} className={cn(
                        "group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white",
                        viewMode === "list" && "flex flex-row"
                      )}>
                        <div className={cn(
                          "relative overflow-hidden",
                          viewMode === "grid" ? "aspect-[3/4]" : "w-48 h-48 shrink-0"
                        )}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && (
                              <Badge className="bg-[#f4fc0a] text-[#3c5e9e] font-bold">NEW</Badge>
                            )}
                            {product.isSale && product.discount && (
                              <Badge className="bg-red-500 text-white font-bold">-{product.discount}%</Badge>
                            )}
                            {!product.inStock && (
                              <Badge className="bg-gray-500 text-white font-bold">OUT OF STOCK</Badge>
                            )}
                          </div>

                          {/* Quick Actions */}
                          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button 
                              variant="secondary" 
                              size="icon" 
                              className="rounded-full h-10 w-10 bg-white/90 hover:bg-white shadow-lg"
                              onClick={() => toggleWishlist(product.id)}
                            >
                              <Heart className={cn(
                                "h-4 w-4 transition-colors",
                                wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                              )} />
                            </Button>
                            <Button 
                              variant="secondary" 
                              size="icon" 
                              className="rounded-full h-10 w-10 bg-white/90 hover:bg-white shadow-lg"
                              disabled={!product.inStock}
                            >
                              <ShoppingBag className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <CardContent className={cn(
                          "pt-4 pb-6",
                          viewMode === "list" && "flex-1 flex flex-col justify-between"
                        )}>
                          <div>
                            <Badge variant="outline" className="mb-3 border-[#3c5e9e] text-[#3c5e9e]">
                              {product.category}
                            </Badge>
                            <h3 className="font-semibold text-lg mb-2 text-[#3c5e9e] group-hover:text-[#2a4a7a] transition-colors">
                              {product.name}
                            </h3>
                            
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xl text-[#3c5e9e]">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                                )}
                              </div>
                              <div className="flex">
                                {Array(product.rating)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-[#f4fc0a] text-[#f4fc0a]" />
                                  ))}
                              </div>
                            </div>

                            {/* Available sizes */}
                            <div className="mb-4">
                              <p className="text-sm text-gray-600 mb-2">Available sizes:</p>
                              <div className="flex gap-1">
                                {product.size.map(size => (
                                  <Badge key={size} variant="outline" className="text-xs">
                                    {size}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <Button 
                            className="w-full bg-[#3c5e9e] hover:bg-[#2a4a7a] text-white transition-colors duration-300"
                            disabled={!product.inStock}
                          >
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="border-[#3c5e9e]/20 hover:border-[#3c5e9e]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                          className={cn(
                            currentPage === page 
                              ? "bg-[#3c5e9e] text-white hover:bg-[#2a4a7a]" 
                              : "border-[#3c5e9e]/20 hover:border-[#3c5e9e] hover:text-[#3c5e9e]"
                          )}
                        >
                          {page}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="border-[#3c5e9e]/20 hover:border-[#3c5e9e]"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your filters or search terms to find what you're looking for.
                    </p>
                    <Button onClick={clearAllFilters} className="bg-[#3c5e9e] hover:bg-[#2a4a7a]">
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}