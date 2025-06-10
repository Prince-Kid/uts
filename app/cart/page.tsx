"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Trash2, 
  CreditCard, 
  TruckIcon, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  X,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Format price in Rwandan Francs
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
    toast({
      title: "Cart updated",
      description: "Your cart has been updated successfully.",
    });
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast({
      variant: "destructive",
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Open confirmation dialog instead of proceeding directly
    setConfirmDialogOpen(true);
  };

 const handleConfirmOrder = async () => {
  setConfirmDialogOpen(false);
  setIsProcessing(true);

  try {
    // Create a unique order ID
    const newOrderId = `UTS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    
    // Format order data for email
    const orderData = {
      orderId: newOrderId,
      orderDate: new Date().toISOString(),
      customerInfo,
      items,
      subtotal: total,
      shipping: 0,
      total: total,
    };

    // Generate email HTML content
    const customerEmailHtml = generateOrderEmailHTML(orderData);
    const adminEmailHtml = generateAdminEmailHTML(orderData);
    
    // Send emails via API
    const response = await fetch('/api/send-order-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@utsrwanda.com',
        subject: `Your UTS Order #${newOrderId} Confirmation`,
        customerHtml: customerEmailHtml,
        adminHtml: adminEmailHtml,
        orderData
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send emails');
    }
    
    // Show success state
    setOrderComplete(true);
    clearCart();
    
    toast({
      title: "Order placed successfully!",
      description: `Your order #${newOrderId} has been received. We've sent a confirmation email to ${customerInfo.email}`,
      action: (
        <ToastAction altText="Go Home" asChild>
          <Link href="/">Continue Shopping</Link>
        </ToastAction>
      ),
    });
  } catch (error) {
    console.error("Order processing error:", error);
    toast({
      variant: "destructive",
      title: "Failed to place order",
      description: "Please try again or contact customer support.",
    });
  } finally {
    setIsProcessing(false);
  }
};

// Add this function to generate admin email
const generateAdminEmailHTML = (orderData: any) => {
  const { orderId, orderDate, customerInfo, items, total } = orderData;
  const formattedDate = new Date(orderDate).toLocaleString();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #3c5e9e; color: white; padding: 15px; text-align: center; }
        .order-details { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; text-align: right; margin-top: 10px; }
        .customer-info { background-color: #f9f9f9; padding: 15px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Order Received!</h2>
        </div>
        
        <div class="order-details">
          <h3>Order #${orderId}</h3>
          <p>Date: ${formattedDate}</p>
          
          <table>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            ${items.map((item: any) => `
              <tr>
                <td>${item.name} (${item.color}, ${item.size})</td>
                <td>${item.quantity}</td>
                <td>${formatPrice(item.price)}</td>
                <td>${formatPrice(item.price * item.quantity)}</td>
              </tr>
            `).join('')}
          </table>
          
          <p class="total">Total: ${formatPrice(total)}</p>
        </div>
        
        <div class="customer-info">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${customerInfo.name}</p>
          <p><strong>Email:</strong> ${customerInfo.email}</p>
          <p><strong>Phone:</strong> ${customerInfo.phone}</p>
          <p><strong>Address:</strong> ${customerInfo.address}</p>
          ${customerInfo.notes ? `<p><strong>Notes:</strong> ${customerInfo.notes}</p>` : ''}
        </div>
        
        <p>Please process this order as soon as possible.</p>
      </div>
    </body>
    </html>
  `;
};
  // Generate HTML for the order confirmation email
  const generateOrderEmailHTML = (orderData: any) => {
    const { orderId, orderDate, customerInfo, items, subtotal, shipping, total } = orderData;
    const formattedDate = new Date(orderDate).toLocaleString();
    
    // Generate HTML for the email
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - UTS Rwandan Fashion</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
            background-color: #3c5e9e;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .logo {
            max-width: 120px;
            margin-bottom: 10px;
          }
          .order-info {
            background-color: #f7f7f7;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .item {
            display: flex;
            border-bottom: 1px solid #eeeeee;
            padding: 15px 0;
          }
          .item-details {
            flex: 1;
          }
          .item-price {
            text-align: right;
            font-weight: bold;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
            color: #999999;
            font-size: 12px;
          }
          .btn {
            background-color: #3c5e9e;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 4px;
            display: inline-block;
            margin-top: 10px;
          }
          .highlight {
            color: #3c5e9e;
            font-weight: bold;
          }
          .thank-you {
            text-align: center;
            margin: 30px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table th, table td {
            text-align: left;
            padding: 8px;
            border-bottom: 1px solid #eeeeee;
          }
          table th {
            background-color: #f5f5f5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>UTS Rwanda</h1>
            <p>Order Confirmation</p>
          </div>
          
          <p>Dear ${customerInfo.name},</p>
          
          <p>Thank you for your order! We've received your purchase and it's being processed. Here's a summary of your order:</p>
          
          <div class="order-info">
            <p><strong>Order Number:</strong> ${orderId}</p>
            <p><strong>Order Date:</strong> ${formattedDate}</p>
          </div>
          
          <h2>Order Details</h2>
          
          <table>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            ${items.map((item: any) => `
              <tr>
                <td>
                  ${item.name}<br>
                  <small>Color: ${item.color}, Size: ${item.size}</small>
                </td>
                <td>${item.quantity}</td>
                <td>${formatPrice(item.price)}</td>
                <td>${formatPrice(item.price * item.quantity)}</td>
              </tr>
            `).join('')}
          </table>
          
          <div style="margin-top: 20px; border-top: 2px solid #eeeeee; padding-top: 10px;">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="total-row">
              <span>Shipping:</span>
              <span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div class="total-row" style="font-weight: bold; font-size: 1.1em; margin-top: 10px;">
              <span>Total:</span>
              <span class="highlight">${formatPrice(total)}</span>
            </div>
          </div>
          
          <div class="thank-you">
            <h2>Thank You for Shopping with UTS!</h2>
            <p>We're preparing your order for shipment and will notify you when it's on the way.</p>
          </div>
          
          <div>
            <h3>Shipping Information:</h3>
            <p>${customerInfo.name}<br>
            ${customerInfo.address}<br>
            Phone: ${customerInfo.phone}<br>
            Email: ${customerInfo.email}</p>
            
            ${customerInfo.notes ? `<p><strong>Order Notes:</strong> ${customerInfo.notes}</p>` : ''}
          </div>
          
          <div class="footer">
            <p>If you have any questions, please contact us at <a href="mailto:support@utsrwanda.com">support@utsrwanda.com</a> or call us at +250 788 123 456.</p>
            <p>&copy; ${new Date().getFullYear()} UTS Rwandan Fashion & Culture. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Order completion screen
  if (orderComplete && orderId) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Card className="border-none shadow-lg bg-white">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
              <p className="text-gray-600 max-w-md">
                Your order #{orderId} has been successfully placed. We've generated an order confirmation for you.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-5 mb-6">
              <h2 className="font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-medium">{items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order Total:</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium">3-5 business days</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <Button asChild className="bg-[#3c5e9e] hover:bg-[#2a4a7a] text-white flex-1">
                <Link href="/categories">Continue Shopping</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-[#3c5e9e] text-[#3c5e9e] hover:bg-[#3c5e9e]/10 flex-1"
                onClick={() => window.print()} // Simple way to print/save the order
              >
                Save Order Details
              </Button>
            </div>
            
            <Alert className="bg-blue-50 border-blue-200">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Need Help?</AlertTitle>
              <AlertDescription className="text-blue-700">
                If you have any questions about your order, please contact our customer service
                at <a href="mailto:support@utsrwanda.com" className="text-[#3c5e9e] font-medium">support@utsrwanda.com</a>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#3c5e9e] mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Add some items to your cart to continue shopping.
          </p>
          <Button asChild className="bg-[#3c5e9e] hover:bg-[#2a4a7a] text-white shadow-md hover:shadow-lg transition-all duration-300">
            <Link href="/categories" className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-[#3c5e9e] dark:text-[#78a1e6]">Your Shopping Cart</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Review your items and proceed to checkout
            </p>
          </div>
          <Badge variant="outline" className="text-base py-1.5 px-3 border-[#3c5e9e] text-[#3c5e9e] dark:border-[#78a1e6] dark:text-[#78a1e6]">
            {items.reduce((acc, item) => acc + item.quantity, 0)} {items.reduce((acc, item) => acc + item.quantity, 0) === 1 ? 'item' : 'items'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <Card className="mb-6 border-none shadow-lg bg-white dark:bg-gray-800">
              <CardHeader className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Cart Items</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="divide-y dark:divide-gray-700">
                {items.map((item) => (
                  <div 
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-4 py-6 first:pt-4 last:pb-4 group"
                  >
                    <div className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Color: {item.color} | Size: {item.size}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none border-r border-gray-200 dark:border-gray-600 dark:text-gray-300"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="w-10 text-center text-sm font-medium dark:text-white">{item.quantity}</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none border-l border-gray-200 dark:border-gray-600 dark:text-gray-300"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div>
                          <p className="font-medium text-[#3c5e9e] dark:text-[#78a1e6]">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatPrice(item.price)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-700 flex justify-between border-t dark:border-gray-600">
                <Button 
                  variant="outline" 
                  className="text-[#3c5e9e] dark:text-[#78a1e6] border-[#3c5e9e]/40 dark:border-[#78a1e6]/40 hover:bg-[#3c5e9e]/10 dark:hover:bg-[#78a1e6]/10"
                  asChild
                >
                  <Link href="/categories" className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Link>
                </Button>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Subtotal</p>
                  <p className="text-xl font-bold text-[#3c5e9e] dark:text-[#78a1e6]">{formatPrice(total)}</p>
                </div>
              </CardFooter>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6 mb-8">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <TruckIcon className="h-8 w-8 text-[#3c5e9e] dark:text-[#78a1e6] mb-2" />
                <p className="font-medium text-sm text-gray-900 dark:text-white">Free Delivery</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">On orders over RWF 50,000</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <ShieldCheck className="h-8 w-8 text-[#3c5e9e] dark:text-[#78a1e6] mb-2" />
                <p className="font-medium text-sm text-gray-900 dark:text-white">Secure Shopping</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">100% secure process</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <CreditCard className="h-8 w-8 text-[#3c5e9e] dark:text-[#78a1e6] mb-2" />
                <p className="font-medium text-sm text-gray-900 dark:text-white">Payment Options</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Cash on delivery available</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <Card className="border-none shadow-lg sticky top-24 bg-white dark:bg-gray-800">
              <CardHeader className="bg-gradient-to-r from-[#3c5e9e]/10 to-[#2a4a7a]/10 dark:from-[#3c5e9e]/30 dark:to-[#2a4a7a]/30 border-b dark:border-gray-700">
                <h2 className="text-xl font-bold text-[#3c5e9e] dark:text-[#78a1e6]">Order Summary</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="font-medium dark:text-white">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                    <span className="dark:text-gray-300">{total > 50000 ? 'Free' : 'Calculated at checkout'}</span>
                  </div>
                  <Separator className="dark:bg-gray-600" />
                  <div className="pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-[#3c5e9e] dark:text-[#78a1e6]">Total</span>
                      <span className="text-[#3c5e9e] dark:text-[#78a1e6]">{formatPrice(total)}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Including VAT</p>
                  </div>
                </div>

                {/* Customer Information Form */}
                <form onSubmit={handleCheckout} className="space-y-5">
                  <h3 className="font-medium text-[#3c5e9e] dark:text-[#78a1e6] mb-2">Delivery Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <Input
                        placeholder="Full Name"
                        required
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="border-gray-300 dark:border-gray-600 focus-visible:ring-[#3c5e9e] dark:focus-visible:ring-[#78a1e6] dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="border-gray-300 dark:border-gray-600 focus-visible:ring-[#3c5e9e] dark:focus-visible:ring-[#78a1e6] dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
                        className="border-gray-300 dark:border-gray-600 focus-visible:ring-[#3c5e9e] dark:focus-visible:ring-[#78a1e6] dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      />
                      <Textarea
                        placeholder="Delivery Address (include street, city, and province)"
                        required
                        value={customerInfo.address}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className="border-gray-300 dark:border-gray-600 focus-visible:ring-[#3c5e9e] dark:focus-visible:ring-[#78a1e6] dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
                        className="border-gray-300 dark:border-gray-600 focus-visible:ring-[#3c5e9e] dark:focus-visible:ring-[#78a1e6] dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Accordion type="single" collapsible className="w-full mb-4">
                      <AccordionItem value="payment-methods" className="border-gray-200 dark:border-gray-700">
                        <AccordionTrigger className="text-[#3c5e9e] dark:text-[#78a1e6] hover:no-underline">Payment Methods</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="cash" name="payment" value="cash" defaultChecked className="text-[#3c5e9e] dark:text-[#78a1e6]" />
                              <label htmlFor="cash" className="text-sm text-gray-700 dark:text-gray-300">Cash on Delivery</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="momo" name="payment" value="momo" className="text-[#3c5e9e] dark:text-[#78a1e6]" />
                              <label htmlFor="momo" className="text-sm text-gray-700 dark:text-gray-300">Mobile Money</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="card" name="payment" value="card" className="text-[#3c5e9e] dark:text-[#78a1e6]" />
                              <label htmlFor="card" className="text-sm text-gray-700 dark:text-gray-300">Credit/Debit Card</label>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                      
                    <Button 
                      type="submit" 
                      className={cn(
                        "w-full relative overflow-hidden py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300",
                        isProcessing 
                          ? "bg-[#3c5e9e]/70 dark:bg-[#3c5e9e]/50" 
                          : "bg-gradient-to-r from-[#3c5e9e] to-[#2a4a7a] hover:from-[#2a4a7a] hover:to-[#3c5e9e]"
                      )}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing Order...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 mr-2" />
                          Place Order
                        </div>
                      )}
                    </Button>
                      
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                      By placing your order, you agree to our{" "}
                      <Link href="/terms" className="text-[#3c5e9e] dark:text-[#78a1e6] hover:underline">Terms of Service</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-[#3c5e9e] dark:text-[#78a1e6] hover:underline">Privacy Policy</Link>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Order Confirmation Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-white">Confirm your order</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
              You're about to place an order for {items.reduce((acc, item) => acc + item.quantity, 0)} items 
              totaling {formatPrice(total)}. A confirmation will be generated that you can save or print.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-md p-3 flex items-start gap-3 my-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Since this is a demo, no actual order will be placed. An email template will open in a new tab that you can save for your reference.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-[#3c5e9e] hover:bg-[#2a4a7a] text-white" 
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}