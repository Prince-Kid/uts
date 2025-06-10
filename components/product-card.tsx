"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/contexts/cart-context";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
}

export function ProductCard({
  id,
  name,
  price,
  image,
  colors,
  sizes,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
      color: selectedColor,
      size: selectedSize,
    });
  };

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            onClick={handleAddToCart}
            className="bg-white text-black hover:bg-white/90"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium mb-2">{name}</h3>
        <p className="text-muted-foreground mb-4">${price.toFixed(2)}</p>
        <div className="space-y-2">
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
