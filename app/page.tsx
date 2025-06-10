"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  ShoppingBag,
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import logo from "@/public/2q3tB7b0YkHYtlMxBhC8anVKrc1.svg";
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const heroSlides = [
    {
      id: 1,
      title: "Made In Rwanda Shirts",
      subtitle: "Crafted By UTS",
      description: "Handcrafted in Rwanda",
      image:
        "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733927698/kji8rzjrhe0yu5gnxtxh.png",
      cta: "Shop Now",
      accent: "NEW",
    },
    {
      id: 2,
      title: "Made In Rwanda Shirts",
      subtitle: "Crafted By UTS",
      description: "For Every Style",
      image:
        "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733927698/skvqoummhwjabe8guehp.png",
      cta: "Shop Now",
      accent: "FEATURED",
    },
    {
      id: 3,
      title: "Made In Rwanda Shirts",
      subtitle: "Crafted By UTS",
      description: "Crafted with Passion",
      image:
        "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733928432/xew64cujymb7bisbqk41.png",
      cta: "Shop Now",
      accent: "PREMIUM",
    },
    {
      id: 4,
      title: "Made In Rwanda Shirts",
      subtitle: "Crafted By UTS",
      description: "Authentic Rwandan Design",
      image:
        "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733928432/pux3fp5a55u6jvkbw1jh.png",
      cta: "Shop Now",
      accent: "TRENDING",
    },
    {
      id: 5,
      title: "Made In Rwanda Shirts",
      subtitle: "Crafted By UTS",
      description: "For a Better Tomorrow",
      image:
        "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733928432/udgsa5tjaie1op0huina.png",
      cta: "Shop Now",
      accent: "ECO",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };
const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Hero Section with Slideshow */}
      <section className="relative h-screen overflow-hidden">
        {/* Slideshow Container */}
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-all duration-1000 ease-in-out",
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              )}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3c5e9e]/90 via-[#3c5e9e]/70 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 lg:px-6">
                  <div className="max-w-3xl">
                    {/* Accent Badge */}
                    <div
                      className="mb-6 animate-fade-in-up"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <Badge className="bg-gradient-to-r from-[#f4fc0a] to-[#e6f000] text-[#3c5e9e] font-bold px-4 py-2 text-sm tracking-wider shadow-lg">
                        {slide.accent}
                      </Badge>
                    </div>

                    {/* Main Title */}
                    <h1
                      className="font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight animate-fade-in-up text-shadow-brand"
                      style={{ animationDelay: "0.4s" }}
                    >
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <h2
                      className="text-2xl md:text-3xl lg:text-4xl text-[#f4fc0a] font-semibold mb-4 animate-fade-in-up text-shadow-brand"
                      style={{ animationDelay: "0.6s" }}
                    >
                      {slide.subtitle}
                    </h2>

                    {/* Description */}
                    <p
                      className="text-xl md:text-2xl text-white/90 mb-8 font-medium animate-fade-in-up text-shadow-brand"
                      style={{ animationDelay: "0.8s" }}
                    >
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div
                      className="flex flex-wrap gap-4 animate-fade-in-up"
                      style={{ animationDelay: "1s" }}
                    >
                    <Link href="/categories">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-[#f4fc0a] to-[#e6f000] text-[#3c5e9e] hover:from-[#e6f000] hover:to-[#f4fc0a] font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        <span>
                          {slide.cta}
                        
                        </span>
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white hover:text-[#3c5e9e] px-8 py-6 text-lg backdrop-blur-sm bg-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        Our Story
                        <Play className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md rounded-full px-6 py-3">
            {/* Previous Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="text-white hover:text-[#f4fc0a] hover:bg-white/20 rounded-full transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentSlide
                      ? "bg-[#f4fc0a] scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  )}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-[#f4fc0a] hover:bg-white/20 rounded-full transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="text-white hover:text-[#f4fc0a] hover:bg-white/20 rounded-full transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Side Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-[#f4fc0a] hover:bg-white/20 rounded-full h-12 w-12 backdrop-blur-sm bg-black/20 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-[#f4fc0a] hover:bg-white/20 rounded-full h-12 w-12 backdrop-blur-sm bg-black/20 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 z-20">
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-sm font-medium tracking-wider">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#f4fc0a] to-transparent animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-4xl md:text-5xl text-[#3c5e9e] mb-4">
              Shop By Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of clothing categories, each designed
              with attention to detail and cultural significance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Men",
                image:
                  "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733927698/kji8rzjrhe0yu5gnxtxh.png",
                link: "/categories",
                count: "Quality Products",
              },
              {
                name: "Women",
                image:
                  "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733927698/skvqoummhwjabe8guehp.png",
                link: "/categories",
                count: "Quality Products",
              },
              {
                name: "Kids",
                image:
                  "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733928432/udgsa5tjaie1op0huina.png",
                link: "/categories",
                count: "Quality Products",
              },
              {
                name: "Others",
                image:
                  "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733928431/rqa0tmbv1o1sh00apuq9.png",
                link: "/categories",
                count: "Quality Products",
              },
            ].map((category) => (
              <Link
                href={category.link}
                key={category.name}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] block shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3c5e9e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-bold text-2xl text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-[#f4fc0a] text-sm font-medium mb-3">
                    {category.count}
                  </p>
                  <div className="flex items-center text-white group-hover:text-[#f4fc0a] transition-colors duration-300">
                    <span className="font-medium">Shop Now</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-4xl md:text-5xl text-[#3c5e9e] mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular designs, showcasing the perfect blend of
              traditional patterns and contemporary styles.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full mb-8">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100 p-1 rounded-full">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-[#3c5e9e] data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                {/* <TabsTrigger
                  value="new"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-[#3c5e9e] data-[state=active]:text-white"
                >
                  New Arrivals
                </TabsTrigger> */}
                {/* <TabsTrigger
                  value="bestsellers"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-[#3c5e9e] data-[state=active]:text-white"
                >
                  Bestsellers
                </TabsTrigger> */}
                {/* <TabsTrigger
                  value="sale"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-[#3c5e9e] data-[state=active]:text-white"
                >
                  Sale
                </TabsTrigger> */}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Kigali Pattern Shirt",
                    price: "500000 RWF",
                    originalPrice: "600000 RWF",
            
                    image:
                      "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733927698/kji8rzjrhe0yu5gnxtxh.png",
                    category: "Men",
                    rating: 5,
                    isNew: true,
                    discount: "25%",
                  },
                  {
                    name: "Amahoro Dress",
                    price: "45000 RWF",
                    originalPrice: "50000 RWF",
                    image:
                      "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733928431/rqa0tmbv1o1sh00apuq9.png",
                    category: "Women",
                    rating: 4,
                    isBestseller: true,
                  },
                  {
                    name: "Unity Jacket",
                    price: "30000 RWF",
                    image:
                      "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733928432/udgsa5tjaie1op0huina.png",
                    category: "Men",
                    rating: 5,
                    isNew: true,
                  },
                  {
                    name: "Akagera Scarf",
                    price: "30000 RWF",
                    originalPrice: "35000 RWF",
                    image:
                      "https://res.cloudinary.com/dvhfu2a0u/image/upload/v1733927698/kji8rzjrhe0yu5gnxtxh.png",
                    category: "Kids",
                    rating: 4,
                    discount: "23%",
                  },
                ].map((product, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <Badge className="bg-[#f4fc0a] text-[#3c5e9e] font-bold">
                            NEW
                          </Badge>
                        )}
                        {product.isBestseller && (
                          <Badge className="bg-[#3c5e9e] text-white font-bold">
                            BESTSELLER
                          </Badge>
                        )}
                        {product.discount && (
                          <Badge className="bg-[#3c5e9e] text-white font-bold">
                            BESTSELLER
                          </Badge>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full h-10 w-10 bg-white/90 hover:bg-white shadow-lg"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <CardContent className="pt-4 pb-6">
                      <Badge
                        variant="outline"
                        className="mb-3 border-[#3c5e9e] text-[#3c5e9e]"
                      >
                        {product.category}
                      </Badge>
                      <h3 className="font-semibold text-lg mb-2 text-[#3c5e9e] group-hover:text-[#2a4a7a] transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xl text-[#3c5e9e]">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex">
                          {Array(product.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-[#f4fc0a] text-[#f4fc0a]"
                              />
                            ))}
                        </div>
                      </div>

                      <Button className="w-full bg-[#3c5e9e] hover:bg-[#2a4a7a] text-white transition-colors duration-300">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

      
           </Tabs>

          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-[#3c5e9e] text-[#3c5e9e] hover:bg-[#3c5e9e] hover:text-white px-8 py-6 text-lg"
            >
              View All Products <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About UTS Section */}
      <section className="py-16 bg-gradient-to-r from-[#ffffff] to-[#2a4a7a] text-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 relative">
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={logo}
                  alt="UMURAGE TWIZERIMANA Schadrack"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#f4fc0a] text-[#3c5e9e] p-6 rounded-xl shadow-xl">
                <p className="font-bold text-xl">Founded in 2018</p>
                <p className="text-sm font-medium">
                  By TWIZERIMANA Schadrack
                </p>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="font-bold text-4xl md:text-5xl">Our Story</h2>
              <div className="space-y-4 text-white/90 text-lg leading-relaxed">
                <p>
                  UTS was born from a passion to showcase the rich cultural
                  heritage of Rwanda through contemporary fashion. Founded by
                  UMURAGE TWIZERIMANA Schadrack, our brand bridges traditional
                  craftsmanship with modern design.
                </p>
                <p>
                  Each piece in our collection tells a story of Rwanda's vibrant
                  culture, landscapes, and people. We work closely with local
                  artisans, ensuring that traditional techniques are preserved
                  while creating fashion that resonates with today's global
                  audience.
                </p>
                <p>
                  Our commitment goes beyond fashion – we believe in sustainable
                  practices, fair trade, and empowering communities through our
                  work.
                </p>
              </div>
              <Button
                size="lg"
                className="gap-2 bg-[#f4fc0a] text-[#3c5e9e] hover:bg-[#e6f000] font-bold px-8 py-6 text-lg"
              >
                Learn More About Us <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-4xl md:text-5xl text-[#3c5e9e] mb-4">
              Learn How We Make Clothes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the craftsmanship, techniques, and cultural significance
              behind each UTS creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Traditional Weaving Techniques",
                description:
                  "Learn about the ancient weaving methods that inspire our modern designs.",
                image:
                  "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
                duration: "5 min read",
              },
              {
                title: "From Sketch to Garment",
                description:
                  "Follow the journey of a UTS piece from initial concept to finished product.",
                image:
                  "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600",
                duration: "8 min read",
              },
              {
                title: "Sustainable Fashion Practices",
                description:
                  "Discover how we incorporate eco-friendly approaches in our production process.",
                image:
                  "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
                duration: "6 min read",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full h-16 w-16 bg-white/90 hover:bg-white shadow-xl"
                    >
                      <Play className="h-8 w-8 text-[#3c5e9e]" />
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#f4fc0a] text-[#3c5e9e] font-medium">
                      {item.duration}
                    </Badge>
                  </div>
                </div>
                <CardContent className="pt-6 pb-6">
                  <h3 className="font-bold text-xl mb-3 text-[#3c5e9e] group-hover:text-[#2a4a7a] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold text-[#3c5e9e] hover:text-[#2a4a7a]"
                  >
                    Watch Video <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              className="gap-2 bg-[#3c5e9e] hover:bg-[#2a4a7a] text-white px-8 py-6 text-lg"
            >
              Explore All Learning Resources <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
     
{/* Testimonials */}
<section className="py-16 bg-white">
  <div className="container px-4 mx-auto">
    <div className="text-center mb-12">
      <h2 className="font-bold text-4xl md:text-5xl text-[#3c5e9e] mb-4">
        What Our Customers Say
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Hear from people who have experienced the quality and
        craftsmanship of UTS clothing.
      </p>
    </div>

    <div className="relative mx-auto max-w-5xl px-8">
      {/* Testimonials Slider */}
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" 
             style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
          {[
            {
              name: "Marie Uwamahoro",
              location: "Kigali, Rwanda",
              quote: "The quality of UTS clothing is exceptional. I love how they blend traditional patterns with modern styles. Every piece tells a story and makes me feel connected to my heritage.",
              image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=200",
              rating: 5,
            },
            {
              name: "James Wilson",
              location: "London, UK",
              quote: "I discovered UTS during my visit to Rwanda and was immediately impressed. The attention to detail and the story behind each garment make them truly special. I always receive compliments when wearing my UTS shirt.",
              image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200",
              rating: 5,
            },
            {
              name: "Diane Mukasine",
              location: "Nairobi, Kenya",
              quote: "As someone who values both style and cultural representation, UTS has been a revelation. Their educational content about how each piece is made adds so much value to the shopping experience.",
              image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=200",
              rating: 4,
            },
            {
              name: "Robert Kagame",
              location: "Kigali, Rwanda",
              quote: "I've been wearing UTS clothing for two years now, and the durability is remarkable. The fabrics maintain their color and texture even after many washes. Truly worth the investment.",
              image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200",
              rating: 5,
            },
            {
              name: "Sarah Johnson",
              location: "New York, USA",
              quote: "The blend of Rwandan cultural elements with contemporary design is what makes UTS stand out. Each piece feels like wearable art that carries a meaningful story.",
              image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className="min-w-full px-4"
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 max-w-2xl mx-auto">
                <CardContent className="pt-8 pb-8">
                  <div className="flex mb-4 justify-center">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-[#f4fc0a] text-[#f4fc0a]"
                        />
                      ))}
                  </div>
                  <p className="italic mb-8 text-gray-700 leading-relaxed text-center text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3c5e9e] text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCurrentTestimonial((prev) => (prev > 0 ? prev - 1 : 0))}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 text-[#3c5e9e] hover:text-[#f4fc0a] hover:bg-[#3c5e9e]/10 rounded-full h-12 w-12 backdrop-blur-sm transition-all duration-300"
        disabled={currentTestimonial === 0}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCurrentTestimonial((prev) => (prev < 4 ? prev + 1 : 4))}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 text-[#3c5e9e] hover:text-[#f4fc0a] hover:bg-[#3c5e9e]/10 rounded-full h-12 w-12 backdrop-blur-sm transition-all duration-300"
        disabled={currentTestimonial === 4}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentTestimonial
                ? "bg-[#3c5e9e] scale-125"
                : "bg-[#3c5e9e]/30 hover:bg-[#3c5e9e]/50"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
</section>

<section className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="container px-4 mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Column - Contact Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 order-2 lg:order-1 transform hover:scale-[1.02] transition-transform duration-300">
        <h3 className="font-bold text-3xl text-[#3c5e9e] mb-2">Get In Touch</h3>
        <p className="text-gray-600 mb-8">We'd love to hear from you. Fill out the form below and we'll get back to you soon.</p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <Input 
                id="name" 
                placeholder="Your name" 
                className="border-gray-300 focus:ring-[#3c5e9e] focus:border-[#3c5e9e]" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                className="border-gray-300 focus:ring-[#3c5e9e] focus:border-[#3c5e9e]" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <Input 
              id="subject" 
              placeholder="How can we help you?" 
              className="border-gray-300 focus:ring-[#3c5e9e] focus:border-[#3c5e9e]" 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
            <textarea 
              id="message" 
              rows={4} 
              placeholder="Tell us more about your inquiry..." 
              className="w-full rounded-md border border-gray-300 p-3 text-sm focus:ring-[#3c5e9e] focus:border-[#3c5e9e]"
            ></textarea>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-[#3c5e9e] to-[#2a4a7a] hover:from-[#2a4a7a] hover:to-[#3c5e9e] text-white font-medium py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Send Message
          </Button>
        </form>
      </div>
      
      {/* Right Column - Contact Info & Map */}
      <div className="order-1 lg:order-2">
        <div className="bg-[#3c5e9e] text-white rounded-2xl shadow-xl p-8 lg:p-10 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#f4fc0a]/20 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#f4fc0a]/20 rounded-full -ml-14 -mb-14"></div>
          
          <h3 className="font-bold text-3xl mb-6 relative z-10">Contact Information</h3>
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-start space-x-4">
              <div className="bg-[#f4fc0a] text-[#3c5e9e] p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-lg text-[#f4fc0a]">Our Location</h4>
                <p className="text-white/90">KK 15 Avenue, Kigali, Rwanda</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-[#f4fc0a] text-[#3c5e9e] p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-lg text-[#f4fc0a]">Email Us</h4>
                <p className="text-white/90">contact@uts.rw</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-[#f4fc0a] text-[#3c5e9e] p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-lg text-[#f4fc0a]">Call Us</h4>
                <p className="text-white/90">+250 78 123 4567</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-[#f4fc0a] text-[#3c5e9e] p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-lg text-[#f4fc0a]">Business Hours</h4>
                <p className="text-white/90">Monday - Friday: 8am - 6pm</p>
                <p className="text-white/90">Saturday: 9am - 4pm</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex space-x-4 relative z-10">
            <a href="#" className="bg-white/20 hover:bg-[#f4fc0a] hover:text-[#3c5e9e] p-3 rounded-full transition-colors duration-300">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="bg-white/20 hover:bg-[#f4fc0a] hover:text-[#3c5e9e] p-3 rounded-full transition-colors duration-300">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="bg-white/20 hover:bg-[#f4fc0a] hover:text-[#3c5e9e] p-3 rounded-full transition-colors duration-300">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Map or Store Image */}
        <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl">
          <Image 
            src="https://images.pexels.com/photos/7534294/pexels-photo-7534294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="UTS Store Location" 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-semibold text-lg">Visit Our Flagship Store</p>
            <p className="text-white/90 text-sm">Experience our products in person</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

     
    </div>
  );
}
