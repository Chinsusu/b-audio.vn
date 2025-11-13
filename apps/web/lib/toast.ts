"use client";

export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
  duration?: number;
}

type ToastSubscriber = (toasts: Toast[]) => void;

class ToastManager {
  private toasts: Toast[] = [];
  private subscribers = new Set<ToastSubscriber>();
  private idCounter = 0;

  private generateId(): string {
    return `toast-${++this.idCounter}-${Date.now()}`;
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => callback([...this.toasts]));
  }

  show(toast: Omit<Toast, "id">): string {
    const id = this.generateId();
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 4000,
    };

    this.toasts.push(newToast);
    this.notifySubscribers();

    // Auto-remove after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, newToast.duration);
    }

    return id;
  }

  success(title: string, description?: string, duration?: number): string {
    return this.show({ type: "success", title, description, duration });
  }

  error(title: string, description?: string, duration?: number): string {
    return this.show({ type: "error", title, description, duration });
  }

  info(title: string, description?: string, duration?: number): string {
    return this.show({ type: "info", title, description, duration });
  }

  warning(title: string, description?: string, duration?: number): string {
    return this.show({ type: "warning", title, description, duration });
  }

  dismiss(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notifySubscribers();
  }

  dismissAll(): void {
    this.toasts = [];
    this.notifySubscribers();
  }

  subscribe(callback: ToastSubscriber): () => void {
    this.subscribers.add(callback);
    // Send current toasts immediately
    callback([...this.toasts]);

    return () => {
      this.subscribers.delete(callback);
    };
  }

  getToasts(): Toast[] {
    return [...this.toasts];
  }
}

// Export singleton instance
export const toastManager = new ToastManager();

// Convenience function for easy usage
export const toast = {
  success: (title: string, description?: string) =>
    toastManager.success(title, description),
  error: (title: string, description?: string) =>
    toastManager.error(title, description),
  info: (title: string, description?: string) =>
    toastManager.info(title, description),
  warning: (title: string, description?: string) =>
    toastManager.warning(title, description),
};
