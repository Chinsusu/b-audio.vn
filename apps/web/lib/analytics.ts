/** GA4 + FB Pixel helper (no-op if not available) */
export const analytics = {
  event(name: string, params?: Record<string, any>) {
    if (typeof window !== "undefined") {
      // GA4
      window.gtag?.("event", name, params || {});
      // FB Pixel
      window.fbq?.("trackCustom", name, params || {});
    }
  },
  view_item_list(items: any[], list_name: string) {
    this.event("view_item_list", {
      item_list_id: list_name,
      item_list_name: list_name,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.attributes?.name || item.name,
        item_category:
          item.attributes?.category?.data?.attributes?.name || "uncategorized",
        price: item.attributes?.price || 0,
      })),
    });
  },
  add_to_quote(product: any) {
    this.event("add_to_quote", {
      currency: "VND",
      value: product.attributes?.price || 0,
      items: [
        {
          item_id: product.id,
          item_name: product.attributes?.name || product.name,
          item_category:
            product.attributes?.category?.data?.attributes?.name ||
            "uncategorized",
          price: product.attributes?.price || 0,
          quantity: 1,
        },
      ],
    });
  },
  view_item(product: any) {
    this.event("view_item", {
      currency: "VND",
      value: product.attributes?.price || 0,
      items: [
        {
          item_id: product.id,
          item_name: product.attributes?.name || product.name,
          item_category:
            product.attributes?.category?.data?.attributes?.name ||
            "uncategorized",
          price: product.attributes?.price || 0,
        },
      ],
    });
  },
};
