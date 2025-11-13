export interface CartItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  maxQuantity?: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const CART_STORAGE_KEY = "b-audio-cart";

export class CartManager {
  private static instance: CartManager;
  private cart: Cart = { items: [], total: 0, itemCount: 0 };
  private listeners: Array<(cart: Cart) => void> = [];

  private constructor() {
    this.loadFromStorage();
  }

  static getInstance(): CartManager {
    if (!CartManager.instance) {
      CartManager.instance = new CartManager();
    }
    return CartManager.instance;
  }

  private loadFromStorage(): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.cart = parsed;
        this.recalculateTotal();
      }
    } catch (error) {
      console.warn("Failed to load cart from storage:", error);
      this.cart = { items: [], total: 0, itemCount: 0 };
    }
  }

  private saveToStorage(): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
    } catch (error) {
      console.warn("Failed to save cart to storage:", error);
    }
  }

  private recalculateTotal(): void {
    this.cart.total = this.cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    this.cart.itemCount = this.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.cart));
  }

  subscribe(listener: (cart: Cart) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  getCart(): Cart {
    return { ...this.cart };
  }

  addItem(item: Omit<CartItem, "quantity">, quantity: number = 1): void {
    const existingItemIndex = this.cart.items.findIndex(
      (i) => i.id === item.id,
    );

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const existingItem = this.cart.items[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;
      const maxQty = item.maxQuantity || 99;

      this.cart.items[existingItemIndex].quantity = Math.min(
        newQuantity,
        maxQty,
      );
    } else {
      // Add new item
      this.cart.items.push({ ...item, quantity });
    }

    this.recalculateTotal();
    this.saveToStorage();
    this.notifyListeners();
  }

  removeItem(itemId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.id !== itemId);
    this.recalculateTotal();
    this.saveToStorage();
    this.notifyListeners();
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    const itemIndex = this.cart.items.findIndex((item) => item.id === itemId);
    if (itemIndex >= 0) {
      const maxQty = this.cart.items[itemIndex].maxQuantity || 99;
      this.cart.items[itemIndex].quantity = Math.min(quantity, maxQty);
      this.recalculateTotal();
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  clearCart(): void {
    this.cart = { items: [], total: 0, itemCount: 0 };
    this.saveToStorage();
    this.notifyListeners();
  }

  isInCart(itemId: string): boolean {
    return this.cart.items.some((item) => item.id === itemId);
  }

  getItemQuantity(itemId: string): number {
    const item = this.cart.items.find((item) => item.id === itemId);
    return item?.quantity || 0;
  }
}

// Utility functions for easy access
export const cartManager = CartManager.getInstance();

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
