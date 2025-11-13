export interface WishlistItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  imageUrl?: string;
  addedAt: string;
}

export interface Wishlist {
  items: WishlistItem[];
  itemCount: number;
}

const WISHLIST_STORAGE_KEY = "b-audio-wishlist";

export class WishlistManager {
  private static instance: WishlistManager;
  private wishlist: Wishlist = { items: [], itemCount: 0 };
  private listeners: Array<(wishlist: Wishlist) => void> = [];

  private constructor() {
    this.loadFromStorage();
  }

  static getInstance(): WishlistManager {
    if (!WishlistManager.instance) {
      WishlistManager.instance = new WishlistManager();
    }
    return WishlistManager.instance;
  }

  private loadFromStorage(): void {
    if (typeof window === "undefined") {return;}

    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.wishlist = parsed;
        this.updateCount();
      }
    } catch (error) {
      console.warn("Failed to load wishlist from storage:", error);
      this.wishlist = { items: [], itemCount: 0 };
    }
  }

  private saveToStorage(): void {
    if (typeof window === "undefined") {return;}

    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(this.wishlist));
    } catch (error) {
      console.warn("Failed to save wishlist to storage:", error);
    }
  }

  private updateCount(): void {
    this.wishlist.itemCount = this.wishlist.items.length;
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.wishlist));
  }

  subscribe(listener: (wishlist: Wishlist) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  getWishlist(): Wishlist {
    return { ...this.wishlist };
  }

  addItem(item: Omit<WishlistItem, "addedAt">): void {
    const existingItemIndex = this.wishlist.items.findIndex(
      (i) => i.id === item.id,
    );

    if (existingItemIndex >= 0) {
      // Item already in wishlist, don't add again
      return;
    }

    // Add new item with timestamp
    const wishlistItem: WishlistItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };

    this.wishlist.items.unshift(wishlistItem); // Add to beginning
    this.updateCount();
    this.saveToStorage();
    this.notifyListeners();
  }

  removeItem(itemId: string): void {
    this.wishlist.items = this.wishlist.items.filter(
      (item) => item.id !== itemId,
    );
    this.updateCount();
    this.saveToStorage();
    this.notifyListeners();
  }

  toggleItem(item: Omit<WishlistItem, "addedAt">): boolean {
    const isInWishlist = this.isInWishlist(item.id);

    if (isInWishlist) {
      this.removeItem(item.id);
      return false;
    } else {
      this.addItem(item);
      return true;
    }
  }

  clearWishlist(): void {
    this.wishlist = { items: [], itemCount: 0 };
    this.saveToStorage();
    this.notifyListeners();
  }

  isInWishlist(itemId: string): boolean {
    return this.wishlist.items.some((item) => item.id === itemId);
  }

  moveToCart?(itemId: string): WishlistItem | null {
    const itemIndex = this.wishlist.items.findIndex(
      (item) => item.id === itemId,
    );
    if (itemIndex === -1) {return null;}

    const item = this.wishlist.items[itemIndex];
    this.removeItem(itemId);
    return item;
  }

  shareWishlist(): string {
    const ids = this.wishlist.items.map((item) => item.id);
    const shareUrl = `${window.location.origin}/wishlist/share?items=${ids.join(",")}`;
    return shareUrl;
  }

  getItemsFromIds(ids: string[]): Promise<WishlistItem[]> {
    // Mock function for shared wishlist - would fetch from API in real app
    return Promise.resolve(
      this.wishlist.items.filter((item) => ids.includes(item.id)),
    );
  }
}

// Utility functions for easy access
export const wishlistManager = WishlistManager.getInstance();

export function formatWishlistDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {return "Hôm nay";}
    if (diffDays === 1) {return "Hôm qua";}
    if (diffDays < 7) {return `${diffDays} ngày trước`;}
    if (diffDays < 30) {return `${Math.floor(diffDays / 7)} tuần trước`;}

    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Không xác định";
  }
}
