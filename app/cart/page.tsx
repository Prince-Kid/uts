"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Here you would typically send the order to your backend
      // For now, we'll just simulate sending an email
      const orderDetails = {
        items,
        total,
        customerInfo,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Send email notification (implement this with your email service)
      console.log("Order details:", orderDetails);

      // Clear cart and show success message
      clearCart();
      toast.success("Order placed successfully! We'll contact you soon.");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Add some items to your cart to continue shopping.
        </p>
        <Button asChild>
          <a href="/categories">Continue Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-4 p-4 border rounded-lg"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Color: {item.color} | Size: {item.size}
                  </p>
                  <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Information Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <Input
                placeholder="Full Name"
                required
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                type="email"
                placeholder="Email"
                required
                value={customerInfo.email}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                required
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
              <Textarea
                placeholder="Delivery Address"
                required
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
              <Textarea
                placeholder="Order Notes (Optional)"
                value={customerInfo.notes}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
              />
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
