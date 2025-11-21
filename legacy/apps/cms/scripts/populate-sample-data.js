"use strict";

/**
 * Sample data population script for B-Audio.vn
 * Run with: npm run strapi script populate-sample-data
 */

const categories = [
  {
    name: "Loa Bluetooth",
    slug: "loa-bluetooth",
    description: "Loa bluetooth di động, âm thanh chất lượng cao",
    published_at: new Date(),
  },
  {
    name: "Loa Kéo Karaoke",
    slug: "loa-keo-karaoke",
    description: "Loa kéo karaoke công suất lớn, phù hợp sự kiện",
    published_at: new Date(),
  },
  {
    name: "Loa DIY Custom",
    slug: "loa-diy-custom",
    description: "Loa custom theo yêu cầu, tối ưu âm thanh theo sở thích",
    published_at: new Date(),
  },
  {
    name: "Phụ kiện âm thanh",
    slug: "phu-kien-am-thanh",
    description: "Amplifier, driver, crossover và các phụ kiện âm thanh",
    published_at: new Date(),
  },
];

const products = [
  {
    title: "Loa Bluetooth Mini BT-2024",
    slug: "loa-bluetooth-mini-bt-2024",
    description: "Loa bluetooth nhỏ gọn, âm bass sâu, pin 12h",
    price: 850000,
    sale_price: 750000,
    specifications: {
      "Công suất": "20W RMS",
      "Kết nối": "Bluetooth 5.0, AUX, USB",
      Pin: "2400mAh - 12 giờ",
      "Kích thước": "180 x 65 x 65mm",
      "Trọng lượng": "450g",
    },
    features: [
      "Bluetooth 5.0 kết nối ổn định",
      "Bass reflex tăng cường âm trầm",
      "Chống nước IPX5",
      "Sạc nhanh USB-C",
      "Micro tích hợp cho cuộc gọi",
    ],
    is_featured: true,
    stock_quantity: 25,
    published_at: new Date(),
  },
  {
    title: "Loa Kéo Karaoke Pro KK-500",
    slug: "loa-keo-karaoke-pro-kk-500",
    description: "Loa kéo karaoke 500W, 2 micro không dây, đèn LED",
    price: 8500000,
    sale_price: 7200000,
    specifications: {
      "Công suất": "500W PMPO",
      Driver: 'Woofer 12" + Tweeter 3"',
      "Kết nối": "Bluetooth, USB, SD Card, AUX",
      Micro: "2 micro không dây UHF",
      Pin: "4400mAh - 6 giờ",
      "Kích thước": "350 x 280 x 610mm",
      "Trọng lượng": "12.5kg",
    },
    features: [
      "2 micro không dây chất lượng cao",
      "Đèn LED RGB theo nhạc",
      "Equalizer 5 band",
      "Remote control",
      "Bánh xe di chuyển dễ dàng",
      "Chức năng ghi âm",
    ],
    is_featured: true,
    stock_quantity: 8,
    published_at: new Date(),
  },
  {
    title: "Loa Custom HiFi Bookshelf",
    slug: "loa-custom-hifi-bookshelf",
    description: "Loa bookshelf custom driver Scanspeak, vỏ gỗ tự nhiên",
    price: 0,
    specifications: {
      Driver: "Scanspeak Revelator (tùy chọn)",
      Crossover: "Custom design theo yêu cầu",
      "Vỏ loa": "Gỗ MDF/HDF cao cấp",
      Finish: "Veneer gỗ tự nhiên hoặc sơn",
      "Kích thước": "Theo yêu cầu khách hàng",
    },
    features: [
      "Driver chất lượng audiophile",
      "Crossover tính toán chính xác",
      "Vỏ gỗ thực handmade",
      "Tuning theo sở thích âm thanh",
      "Bảo hành 2 năm",
      "Tư vấn setup âm thanh",
    ],
    is_featured: true,
    is_custom: true,
    stock_quantity: 999,
    published_at: new Date(),
  },
  {
    title: "Amplifier Class D 100W x2",
    slug: "amplifier-class-d-100w-x2",
    description: "Amplifier Class D hiệu suất cao, 100W x2 kênh",
    price: 1200000,
    specifications: {
      "Công suất": "100W x2 @ 4Ω",
      THD: "<0.05%",
      SNR: ">100dB",
      "Đáp ứng tần số": "20Hz - 20kHz",
      Input: "RCA, XLR",
      Nguồn: "24V DC",
      "Kích thước": "165 x 125 x 45mm",
    },
    features: [
      "Class D hiệu suất cao >90%",
      "Bảo vệ quá tải, ngắn mạch",
      "LED báo trạng thái",
      "Tản nhiệt nhôm cao cấp",
      "Kết nối dây chắc chắn",
    ],
    stock_quantity: 15,
    published_at: new Date(),
  },
];

module.exports = async () => {
  console.log("🚀 Starting sample data population...");

  try {
    // Create categories
    console.log("📂 Creating categories...");
    const createdCategories = [];

    for (const categoryData of categories) {
      const existingCategory = await strapi.db
        .query("api::category.category")
        .findOne({
          where: { slug: categoryData.slug },
        });

      if (!existingCategory) {
        const category = await strapi.db
          .query("api::category.category")
          .create({
            data: categoryData,
          });
        createdCategories.push(category);
        console.log(`✅ Created category: ${category.name}`);
      } else {
        createdCategories.push(existingCategory);
        console.log(`📦 Category exists: ${existingCategory.name}`);
      }
    }

    // Create products with category relationships
    console.log("🎵 Creating products...");

    for (let i = 0; i < products.length; i++) {
      const productData = products[i];

      const existingProduct = await strapi.db
        .query("api::product.product")
        .findOne({
          where: { slug: productData.slug },
        });

      if (!existingProduct) {
        // Assign category based on product type
        let categoryId = null;
        if (productData.slug.includes("bluetooth")) {
          categoryId = createdCategories.find(
            (c) => c.slug === "loa-bluetooth",
          )?.id;
        } else if (productData.slug.includes("karaoke")) {
          categoryId = createdCategories.find(
            (c) => c.slug === "loa-keo-karaoke",
          )?.id;
        } else if (productData.slug.includes("custom")) {
          categoryId = createdCategories.find(
            (c) => c.slug === "loa-diy-custom",
          )?.id;
        } else {
          categoryId = createdCategories.find(
            (c) => c.slug === "phu-kien-am-thanh",
          )?.id;
        }

        const product = await strapi.db.query("api::product.product").create({
          data: {
            ...productData,
            category: categoryId,
          },
        });

        console.log(`✅ Created product: ${product.title}`);
      } else {
        console.log(`📦 Product exists: ${existingProduct.title}`);
      }
    }

    console.log("🎉 Sample data population completed!");
    console.log("🔗 Access admin at: https://api.b-audio.vn/admin");
  } catch (error) {
    console.error("❌ Error populating sample data:", error);
    throw error;
  }
};
