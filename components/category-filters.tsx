"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  sortBy: string;
}

interface CategoryFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function CategoryFilters({
  filters,
  onFilterChange,
}: CategoryFiltersProps) {
  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    });
  };

  const handlePriceChange = (range: [number, number]) => {
    onFilterChange({
      ...filters,
      priceRange: range,
    });
  };

  const handleColorChange = (color: string) => {
    onFilterChange({
      ...filters,
      colors: filters.colors.includes(color)
        ? filters.colors.filter((c) => c !== color)
        : [...filters.colors, color],
    });
  };

  const handleSizeChange = (size: string) => {
    onFilterChange({
      ...filters,
      sizes: filters.sizes.includes(size)
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size],
    });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({
      ...filters,
      sortBy: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: [0, 500],
      colors: [],
      sizes: [],
      sortBy: "featured",
    });
  };

  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>

        <Accordion
          type="multiple"
          defaultValue={["category", "price", "color", "size"]}
        >
          <AccordionItem value="category">
            <AccordionTrigger className="py-3">Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {[
                  "All",
                  "Shirts",
                  "Dresses",
                  "Pants",
                  "Jackets",
                  "Accessories",
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${item}`}
                      checked={filters.categories.includes(item)}
                      onCheckedChange={() => handleCategoryChange(item)}
                    />
                    <label
                      htmlFor={`category-${item}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger className="py-3">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  defaultValue={filters.priceRange}
                  max={500}
                  step={1}
                  onValueChange={handlePriceChange}
                />
                <div className="flex items-center justify-between">
                  <div className="w-20">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        handlePriceChange([
                          Number(e.target.value),
                          filters.priceRange[1],
                        ])
                      }
                    />
                  </div>
                  <span className="text-muted-foreground">to</span>
                  <div className="w-20">
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handlePriceChange([
                          filters.priceRange[0],
                          Number(e.target.value),
                        ])
                      }
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="color">
            <AccordionTrigger className="py-3">Color</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Black", color: "bg-black" },
                  { name: "White", color: "bg-white border" },
                  { name: "Red", color: "bg-red-500" },
                  { name: "Blue", color: "bg-blue-500" },
                  { name: "Green", color: "bg-green-500" },
                  { name: "Yellow", color: "bg-yellow-500" },
                ].map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full ${color.color} ${
                      filters.colors.includes(color.name)
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }`}
                    title={color.name}
                    onClick={() => handleColorChange(color.name)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="size">
            <AccordionTrigger className="py-3">Size</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className={`w-10 h-10 border rounded-md flex items-center justify-center text-sm hover:bg-muted transition-colors ${
                      filters.sizes.includes(size)
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
