'use client';

export interface ComparisonItem {
  id: string;
  slug: string;
  attributes: {
    title: string;
    price_vnd: number;
    power_watt?: number;
    battery_hours?: number;
    connectivity?: string;
    images: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          name: string;
        };
      }>;
    };
  };
  addedAt: Date;
}

export interface Comparison {
  items: ComparisonItem[];
  itemCount: number;
}

type ComparisonSubscriber = (comparison: Comparison) => void;

class ComparisonManager {
  private storageKey = 'b-audio-comparison';
  private subscribers = new Set<ComparisonSubscriber>();
  private maxItems = 4; // Limit comparison to 4 products max

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
      // Listen for storage changes from other tabs
      window.addEventListener('storage', (e) => {
        if (e.key === this.storageKey) {
          this.loadFromStorage();
          this.notifySubscribers();
        }
      });
    }
  }

  private comparison: Comparison = {
    items: [],
    itemCount: 0,
  };

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert addedAt back to Date objects
        parsed.items = parsed.items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        }));
        this.comparison = parsed;
      }
    } catch (error) {
      console.warn('Failed to load comparison from localStorage:', error);
      this.comparison = { items: [], itemCount: 0 };
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.comparison));
    } catch (error) {
      console.warn('Failed to save comparison to localStorage:', error);
    }
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => callback(this.comparison));
  }

  getComparison(): Comparison {
    return { ...this.comparison };
  }

  addItem(item: Omit<ComparisonItem, 'addedAt'>): boolean {
    // Check if already in comparison
    if (this.isInComparison(item.id)) {
      return false;
    }

    // Check max items limit
    if (this.comparison.items.length >= this.maxItems) {
      throw new Error(`Chỉ có thể so sánh tối đa ${this.maxItems} sản phẩm`);
    }

    const comparisonItem: ComparisonItem = {
      ...item,
      addedAt: new Date(),
    };

    this.comparison.items.push(comparisonItem);
    this.comparison.itemCount = this.comparison.items.length;

    this.saveToStorage();
    this.notifySubscribers();
    return true;
  }

  removeItem(itemId: string): boolean {
    const initialLength = this.comparison.items.length;
    this.comparison.items = this.comparison.items.filter(item => item.id !== itemId);
    this.comparison.itemCount = this.comparison.items.length;

    if (this.comparison.items.length !== initialLength) {
      this.saveToStorage();
      this.notifySubscribers();
      return true;
    }
    return false;
  }

  toggleItem(item: Omit<ComparisonItem, 'addedAt'>): boolean {
    if (this.isInComparison(item.id)) {
      this.removeItem(item.id);
      return false; // Item was removed
    } else {
      try {
        this.addItem(item);
        return true; // Item was added
      } catch (error) {
        throw error; // Re-throw the max items error
      }
    }
  }

  clearComparison(): void {
    this.comparison = { items: [], itemCount: 0 };
    this.saveToStorage();
    this.notifySubscribers();
  }

  isInComparison(itemId: string): boolean {
    return this.comparison.items.some(item => item.id === itemId);
  }

  getItemCount(): number {
    return this.comparison.itemCount;
  }

  getMaxItems(): number {
    return this.maxItems;
  }

  canAddMore(): boolean {
    return this.comparison.items.length < this.maxItems;
  }

  shareComparison(): string {
    const slugs = this.comparison.items.map(item => item.slug).join(',');
    return `${window.location.origin}/compare?items=${encodeURIComponent(slugs)}`;
  }

  subscribe(callback: ComparisonSubscriber): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }
}

// Export a singleton instance
export const comparisonManager = new ComparisonManager();
