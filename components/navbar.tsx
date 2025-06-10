"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingBag,
  Heart,
  User,
  Search,
  BookOpen,
  Palette,
  Home,
  Users,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import logo from "@/public/2q3tB7b0YkHYtlMxBhC8anVKrc1.svg";
import { useCart } from "@/contexts/cart-context";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart(); // Get cart count from context

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Collections", href: "/categories", icon: null },
    { name: "Our Story", href: "/about", icon: null },
    { name: "Contact", href: "/contact", icon: MessageCircle },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out",
          isScrolled
            ? "bg-gradient-to-r from-[#3c5e9e] to-[#2a4a7a] backdrop-blur-xl shadow-2xl border-b border-[#f4fc0a]/30"
            : "bg-gradient-to-r from-[#3c5e9e]/95 to-[#2a4a7a]/95 backdrop-blur-sm shadow-lg"
        )}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#f4fc0a] via-[#f4fc0a] to-[#e6f000] p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="h-full w-full rounded-full bg-[#ffffff] flex items-center justify-center">
                    <Image
                      src={logo}
                      alt="UTS Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-[#f4fc0a] rounded-full border-2 border-white animate-pulse shadow-sm"></div>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-xl text-white group-hover:text-[#f4fc0a] transition-colors duration-300 drop-shadow-sm">
                  UTS
                </div>
                <div className="text-xs text-white/80 font-medium tracking-wider uppercase">
                  Rwandan Fashion & Culture
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2 text-white/90 hover:text-[#f4fc0a] transition-all duration-300 font-medium relative py-2"
                >
                  {link.icon && (
                    <link.icon className="h-4 w-4 drop-shadow-sm" />
                  )}
                  <span className="drop-shadow-sm">{link.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f4fc0a] to-[#e6f000] group-hover:w-full transition-all duration-300 shadow-sm"></div>
                </Link>
              ))}
            </nav>

            {/* Search & Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                {searchOpen ? (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-[#f4fc0a]/30 focus-within:border-[#f4fc0a] transition-all duration-300">
                    <Search className="h-4 w-4 text-white/80" />
                    <Input
                      placeholder="Search products..."
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-48 text-white placeholder:text-white/60"
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                    />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#f4fc0a]/20 hover:text-[#f4fc0a] text-white/90 transition-all duration-300 hover:scale-105"
                    onClick={() => setSearchOpen(true)}
                  >
                    <Search className="h-5 w-5 drop-shadow-sm" />
                  </Button>
                )}
              </div>

              {/* Shopping Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#f4fc0a]/20 hover:text-[#f4fc0a] text-white/90 transition-all duration-300 relative hover:scale-105"
                >
                  <ShoppingBag className="h-5 w-5 drop-shadow-sm" />
                  {count > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-[#f4fc0a] to-[#e6f000] text-[#3c5e9e] font-bold shadow-lg">
                      {count}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-2">
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-[#f4fc0a]/20 hover:text-[#f4fc0a] text-white/90 transition-all duration-300 hover:scale-105"
                >
                  <ShoppingBag className="h-5 w-5 drop-shadow-sm" />
                  {count > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-gradient-to-r from-[#f4fc0a] to-[#e6f000] text-[#3c5e9e] text-xs font-bold shadow-lg">
                      {count}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="hover:bg-white/10 text-white/90 hover:text-white transition-all duration-300 hover:scale-105"
              >
                {isOpen ? (
                  <X className="h-6 w-6 drop-shadow-sm" />
                ) : (
                  <Menu className="h-6 w-6 drop-shadow-sm" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden bg-gradient-to-b from-[#3c5e9e] to-[#2a4a7a] border-t border-[#f4fc0a]/20 transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-sm",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container mx-auto px-4 py-6">
            {/* Mobile Search */}
            <div className="mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 border border-[#f4fc0a]/30">
                <Search className="h-4 w-4 text-white/80" />
                <Input
                  placeholder="Search products..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 text-white/90 hover:text-[#f4fc0a] hover:bg-white/10 transition-all duration-300 py-3 px-4 rounded-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && (
                    <link.icon className="h-5 w-5 drop-shadow-sm" />
                  )}
                  <span className="drop-shadow-sm">{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}