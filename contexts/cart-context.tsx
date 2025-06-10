"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size: string;
}

// Define the cart context type
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0,
  count: 0,
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load items from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("uts-cart");
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
      setIsInitialized(true);
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("uts-cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // Calculate total price
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate total number of items
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  // Add item to cart
  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Check if item with same id, color and size already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.id === newItem.id && 
          item.color === newItem.color && 
          item.size === newItem.size
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, newItem];
      }
    });
  };

  // Remove item from cart
  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => 
      !(item.id === itemId)
    ));
  };

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  // Provide cart context to children
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}