import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Shield, Truck, Award, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#3c5e9e] to-[#2a4a7a] text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Trust badges section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pb-12 border-b border-white/10">
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Authentic Quality</h4>
            <p className="text-xs text-white/70">100% genuine Rwandan craftsmanship</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Free Shipping</h4>
            <p className="text-xs text-white/70">On orders over 50,000 RWF</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Award Winner</h4>
            <p className="text-xs text-white/70">Best Fashion Brand 2024</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Made with Love</h4>
            <p className="text-xs text-white/70">Supporting local artisans</p>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section with enhanced logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-white/15 rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-sm border border-white/20 mr-4">
                <span className="font-bold text-2xl text-white">UTS</span>
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold mb-1">UTS</h3>
                <p className="text-sm text-white/70">Fashion & Culture</p>
              </div>
            </div>
            <p className="mb-6 text-white/80 leading-relaxed">
              Modern fashion inspired by Rwandan culture. Where elegance meets tradition in every carefully crafted piece.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/categories", label: "Shop" },
                { href: "/learn", label: "Learn" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 relative">
              Get in Touch
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-3 shrink-0 mt-0.5 text-white/70 group-hover:text-white transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  123 Fashion Street<br />Kigali, Rwanda
                </span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 mr-3 shrink-0 text-white/70 group-hover:text-white transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">+250 123 456 789</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 mr-3 shrink-0 text-white/70 group-hover:text-white transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">info@utsrwanda.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 relative">
              Stay Updated
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"></div>
            </h3>
            <p className="mb-6 text-white/80 leading-relaxed">
              Subscribe to receive updates on new collections, exclusive offers, and cultural insights.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm focus:bg-white/15 focus:border-white/40 transition-all duration-300"
              />
              <Button className="w-full bg-white/15 text-white border border-white/20 hover:bg-white/25 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]">
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} UTS - UMURAGE TWIZERIMANA Schadrack. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-white/60 hover:text-white transition-colors">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}