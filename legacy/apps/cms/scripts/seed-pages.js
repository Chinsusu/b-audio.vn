#!/usr/bin/env node
/* eslint-disable no-console */
// Seed 3 pages (product-detail template, about, faq) into Strapi Page + Section model

const path = require("path");
const strapiFactory = require("@strapi/strapi");

function pageSections_ProductK1() {
  return [
    {
      kind: "hero",
      title: "B-Audio K1 Portable 100W",
      subtitle:
        "Loa kéo di động 2 đường tiếng, pin 8 giờ, đủ chơi từ phòng khách đến sân vườn cuối tuần.",
      items: {
        breadcrumb: ["Trang chủ", "Sản phẩm", "B-Audio K1 Portable 100W"],
        price: {
          value: 4900000,
          note: "Giá từ 4.900.000₫ – tuỳ cấu hình custom",
        },
        badges: [
          { icon: "tools", text: "Xưởng loa DIY – tuning theo gu riêng" },
          { icon: "shield", text: "Bảo hành 2 năm tại xưởng" },
          {
            icon: "zap",
            text: "Giao nhanh trong 48 giờ (nội thành Buôn Ma Thuột)",
          },
          { icon: "battery", text: "Pin tới 8 giờ nghe liên tục" },
        ],
        summary: [
          { label: "Công suất RMS", value: "100W" },
          { label: "Cấu hình", value: '1 woofer 8" + 1 tweeter dome' },
          { label: "Kết nối", value: "Bluetooth 5.0, AUX, USB" },
          { label: "Pin", value: "~6–8 giờ (50% volume)" },
        ],
        ctas: [
          { label: "Đặt mua ngay", href: "/contact?product=k1" },
          { label: "Nhắn Zalo để tư vấn", href: "https://zalo.me/0877257799" },
        ],
        hotline: { phone: "0877257799", time: "8:00–21:00 hàng ngày" },
      },
      order: 1,
    },
    {
      kind: "highlights",
      title: "Vì sao K1 Portable 100W phù hợp với bạn?",
      body: "B-Audio K1 Portable 100W được thiết kế cho anh em cần một bộ loa gọn, dễ xách, chơi tốt cả nhạc nhẹ lẫn karaoke gia đình, không cần dây điện loằng ngoằng, cũng không đánh đổi về chất âm.",
      items: [
        {
          title: "Âm thanh cân bằng, vocal rõ",
          text: "Tuning theo gu nghe của B-Audio: vocal nổi, bass đủ lực, không bị ù khi đặt sát tường.",
        },
        {
          title: "Pin lớn – đi đâu cũng chơi được",
          text: "Pin lithium 6–8 giờ ở ~50% âm lượng, đủ cho một buổi tụ tập.",
        },
        {
          title: "Kết nối linh hoạt",
          text: "Bluetooth 5.0, AUX 3.5mm, USB – cắm điện thoại, laptop, TV, mixer đều ổn.",
        },
        {
          title: "Thùng gỗ công nghiệp tiêu chuẩn xưởng",
          text: "Gia công, dán keo, tiêu âm và sơn hoàn thiện đồng bộ tại xưởng.",
        },
        {
          title: "Dễ sửa chữa, dễ nâng cấp",
          text: "Có thể nâng cấp driver, đổi màu thùng, thay ampli sau này.",
        },
      ],
      order: 2,
    },
    {
      kind: "specs",
      title: "Thông số kỹ thuật",
      subtitle: "Cấu hình tiêu chuẩn – có thể tuỳ biến theo yêu cầu.",
      items: {
        drivers: [
          { part: "Woofer", spec: '8" (coil 1.5")' },
          { part: "Tweeter", spec: 'Dome 1"' },
        ],
        power: [
          { part: "RMS", spec: "100W" },
          { part: "Peak", spec: "~200W" },
        ],
        amp: "Class D, tích hợp Bluetooth + EQ cơ bản",
        battery: ["6–8 giờ ở 50% âm lượng", "Sạc ~3–4 giờ"],
        io: [
          "Bluetooth 5.0",
          "AUX 3.5mm in",
          "USB playback",
          "2 cổng mic 6.35mm (nếu có)",
        ],
        size: ["Cao 45cm", "Rộng 27cm", "Sâu 25cm", "Nặng ~10kg"],
        enclosure: "Gỗ MDF 15mm, sơn hoàn thiện",
        inBox: ["Dây sạc", "HDSD", "1–2 micro (nếu có)"],
      },
      order: 3,
    },
    {
      kind: "use_cases",
      title: "K1 Portable 100W phù hợp với ai?",
      items: [
        {
          title: "Gia đình nghe nhạc & karaoke cuối tuần",
          text: "Phòng khách 20–30m²; nghe nhạc mỗi ngày, lâu lâu karaoke YouTube.",
        },
        {
          title: "Cafe nhỏ / homestay",
          text: "20–40m², mở nhạc nền cả ngày ở mức vừa phải, không chói, không ù.",
        },
        {
          title: "Picnic, ngoài trời",
          text: "Xách theo, dựng ngoài bãi cỏ/bờ sông – chơi cả buổi với Bluetooth.",
        },
        {
          title: "Phòng trọ / dorm",
          text: "Gọn gàng, dùng chung TV xem phim/chơi game.",
        },
      ],
      order: 4,
    },
    {
      kind: "customization",
      title: "Tuỳ chọn custom tại xưởng B-Audio",
      body: "Nếu bạn thích cá nhân hoá thiết bị của mình, B-Audio có thể custom theo yêu cầu:",
      items: [
        "Màu thùng & hoàn thiện: đen mờ, vân gỗ, trắng, phối màu riêng",
        "Mặt lưới: kim loại/vải, in logo cá nhân/thương hiệu quán",
        "Cấu hình driver: thay woofer/tweeter theo gu bass – treble",
        "Âm ly & tính năng: thêm echo cho karaoke, thêm cổng nhạc cụ, line-out…",
        "Logo & branding: B-Audio hoặc logo riêng",
      ],
      cta_label: "Đặt custom theo yêu cầu",
      cta_href: "/custom",
      order: 5,
    },
    {
      kind: "video",
      title: "Nghe thử K1 Portable 100W",
      body: "Video quay trực tiếp tại xưởng, không hậu kỳ. Trải nghiệm thực tế phụ thuộc không gian & nguồn nhạc.",
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      order: 6,
    },
    {
      kind: "faq",
      title: "Mini‑FAQ",
      items: [
        {
          q: "Có đủ hát karaoke ngoài trời không?",
          a: "Không gian 20–30m², 5–10 người là ổn. Không gian lớn hơn sẽ tư vấn model khác.",
        },
        {
          q: "Có thể đổi pin sau vài năm không?",
          a: "Có. Mang loa tới xưởng hoặc gửi chuyển phát để thay pin và kiểm tra tổng thể.",
        },
        {
          q: "Bao lâu nhận loa?",
          a: "Cấu hình tiêu chuẩn 1–3 ngày; custom 5–10 ngày tuỳ độ phức tạp.",
        },
      ],
      order: 7,
    },
  ];
}

function pageSections_About() {
  return [
    {
      kind: "hero",
      title: "B-Audio – Industrial Audio Workshop tại Buôn Ma Thuột",
      subtitle:
        "Xưởng loa DIY thiết kế, chế tạo và tinh chỉnh theo nhu cầu thực tế.",
      order: 1,
      items: {
        ctas: [
          { label: "Xem sản phẩm hiện có", href: "/products" },
          { label: "Đặt lịch ghé xưởng", href: "/contact" },
        ],
      },
    },
    {
      kind: "story",
      title: "B-Audio bắt đầu từ nhu cầu… tự làm loa cho chính mình",
      body: "Xuất phát từ nhóm mê DIY muốn âm thanh đúng gu; mở rộng thành xưởng với máy móc và thiết bị đo đạc. Mục tiêu: làm ra những bộ loa mà chính mình cũng muốn mang về nhà nghe mỗi ngày.",
      order: 2,
    },
    {
      kind: "values",
      title: "Giá trị cốt lõi",
      items: [
        {
          title: "Trung thực về âm thanh và linh kiện",
          text: "Không phù phép thông số. Ưu tiên độ bền và âm thanh dễ nghe lâu dài.",
        },
        {
          title: "Tối ưu cho nhu cầu thực tế",
          text: "Tư vấn theo không gian, gu nhạc và nhu cầu karaoke trước khi đề xuất cấu hình.",
        },
        {
          title: "Dễ sửa chữa, dễ nâng cấp",
          text: "Cấu trúc dễ mở thay. Sau vài năm có thể nâng cấp từng phần.",
        },
      ],
      order: 3,
    },
    {
      kind: "process",
      title: "Xưởng B-Audio làm việc như thế nào?",
      items: [
        {
          step: 1,
          title: "Trao đổi & thiết kế",
          text: "Mô tả nhu cầu, gửi ảnh không gian, tư vấn cấu hình & báo giá.",
        },
        {
          step: 2,
          title: "Gia công & lắp ráp",
          text: "Cắt, ghép, sơn; lắp driver, ampli, phân tần.",
        },
        {
          step: 3,
          title: "Đo & tuning",
          text: "Đo đạc, cân chỉnh cho nghe thực tế.",
        },
        {
          step: 4,
          title: "Bàn giao & hậu mãi",
          text: "Giao tận nơi/nhận tại xưởng, hướng dẫn và bảo hành 2 năm.",
        },
      ],
      order: 4,
    },
    {
      kind: "team",
      title: "Đằng sau mỗi bộ loa là một đội ngũ thật",
      items: [
        {
          role: "Kỹ sư âm thanh",
          text: "Lựa chọn driver, cấu trúc thùng, phân tần, tuning.",
        },
        {
          role: "Thợ mộc thùng loa",
          text: "Cắt CNC, ghép thùng, xử lý bề mặt, sơn.",
        },
        {
          role: "Kỹ thuật điện tử",
          text: "Lắp ampli, Bluetooth, xử lý nhiễu, test.",
        },
      ],
      order: 5,
    },
    {
      kind: "projects",
      title: "Một vài dự án B-Audio đã thực hiện",
      items: [
        {
          title: "Cafe acoustic 50m² tại Buôn Ma Thuột",
          text: "2 cặp bookshelf + 1 sub, tuning cho vocal & nhạc cụ mộc.",
        },
        {
          title: "Bộ loa kéo custom cho nhóm đi phượt",
          text: "Thùng gọn, tay kéo chắc, pin lớn, chịu outdoor thường xuyên.",
        },
        {
          title: "Phòng khách gia đình 25m²",
          text: "Kết hợp nghe nhạc và xem phim, dùng chung TV và đầu karaoke.",
        },
      ],
      order: 6,
    },
    {
      kind: "cta",
      title: "Muốn nghe thử trước khi quyết định?",
      body: "Bạn có thể ghé xưởng B-Audio – mang playlist quen thuộc.",
      cta_label: "Nhắn Zalo hoặc gọi 0877 25 77 99",
      cta_href: "https://zalo.me/0877257799",
      order: 7,
    },
  ];
}

function pageSections_FAQ() {
  return [
    {
      kind: "hero",
      title: "Câu hỏi thường gặp",
      subtitle:
        "Nếu bạn chưa từng mua loa custom, phần này sẽ giúp bạn hình dung rõ hơn.",
      order: 1,
    },
    {
      kind: "faq",
      title: "Sản phẩm & chất âm",
      items: [
        {
          q: "Loa của B-Audio khác gì loa hãng?",
          a: "B-Audio làm theo nhu cầu cụ thể; dễ sửa chữa và nâng cấp về sau.",
        },
        {
          q: "B-Audio tuning theo gu như thế nào?",
          a: "Hỏi kỹ không gian, gu nhạc, karaoke… rồi chọn cấu hình phù hợp.",
        },
        {
          q: "Nghe thử trước khi mua được không?",
          a: "Được. Ghé trực tiếp xưởng và hẹn trước để sắp xếp.",
        },
      ],
      order: 2,
    },
    {
      kind: "faq",
      title: "Custom & đặt làm",
      items: [
        {
          q: "Có thể tự chọn màu thùng, lưới, logo?",
          a: "Có. Màu sơn, loại lưới, logo thương hiệu riêng… chi phí thay đổi theo mức độ.",
        },
        {
          q: "Quy trình đặt hàng custom?",
          a: "Mô tả nhu cầu → tư vấn/báo giá → đặt cọc → làm & tuning → bàn giao.",
        },
        {
          q: "Thời gian thực hiện?",
          a: "Phổ biến 5–10 ngày làm việc; dự án đặc biệt có thể lâu hơn.",
        },
      ],
      order: 3,
    },
    {
      kind: "faq",
      title: "Bảo hành & sửa chữa",
      items: [
        {
          q: "Bảo hành bao lâu?",
          a: "Thường 2 năm tại xưởng cho lỗi do sản xuất; linh kiện tiêu hao có chính sách riêng.",
        },
        {
          q: "Hỏng do rơi/va chạm?",
          a: "Không thuộc bảo hành, nhưng xưởng vẫn hỗ trợ sửa với chi phí hợp lý.",
        },
        {
          q: "Hết bảo hành có sửa tiếp không?",
          a: "Có. Kiểm tra, báo lỗi & chi phí trước khi sửa.",
        },
      ],
      order: 4,
    },
    {
      kind: "faq",
      title: "Giao hàng & thanh toán",
      items: [
        {
          q: "Có ship toàn quốc không?",
          a: "Có. Đóng gói chống sốc, có thể mua bảo hiểm hàng hoá.",
        },
        {
          q: "Thanh toán thế nào?",
          a: "Tiêu chuẩn: chuyển khoản/cọc. Custom: thường cần đặt cọc trước khi làm.",
        },
        {
          q: "Nếu hàng bị móp/hỏng khi ship?",
          a: "Chụp hiện trạng ngay khi nhận và liên hệ xưởng để xử lý.",
        },
      ],
      order: 5,
    },
    {
      kind: "cta",
      title: "Không thấy câu trả lời bạn cần?",
      body: "Nhắn Zalo hoặc gọi 0877 25 77 99 – B-Audio sẽ giải đáp trực tiếp cho bạn.",
      cta_label: "Liên hệ B-Audio",
      cta_href: "https://zalo.me/0877257799",
      order: 6,
    },
  ];
}

async function upsertPage(strapi, title, slug, sections) {
  const existing = await strapi.entityService.findMany("api::page.page", {
    filters: { slug },
    populate: { sections: true },
    limit: 1,
  });
  if (existing && existing.length) {
    return await strapi.entityService.update("api::page.page", existing[0].id, {
      data: { title, sections, publishedAt: new Date() },
    });
  }
  return await strapi.entityService.create("api::page.page", {
    data: { title, slug, sections, publishedAt: new Date() },
  });
}

async function run() {
  process.chdir(path.join(__dirname, ".."));
  const app = await strapiFactory().load();
  try {
    await upsertPage(
      app,
      "B-Audio K1 Portable 100W",
      "product-k1-portable-100w",
      pageSections_ProductK1(),
    );
    await upsertPage(app, "Giới thiệu", "about", pageSections_About());
    await upsertPage(app, "FAQ", "faq", pageSections_FAQ());
    console.log("✅ Seeded pages successfully");
  } catch (e) {
    console.error("❌ Seed pages failed:", e.message || e);
    process.exitCode = 1;
  } finally {
    await app.destroy();
  }
}

run();
