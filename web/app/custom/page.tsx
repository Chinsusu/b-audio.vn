import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Đặt Custom | B-Audio",
  description:
    "Đặt làm loa custom theo không gian, gu nghe và ngân sách của bạn tại xưởng B-Audio.",
};

export default function CustomPage() {
  return (
    <div className="space-y-10">
      <section className="section-dark rounded-3xl px-6 py-10 md:px-10 md:py-14">
        <div className="max-w-3xl space-y-6">
          <h1 className="font-heading text-h2 text-neutral-100 uppercase tracking-tight">
            Đặt loa custom theo yêu cầu
          </h1>
          <p className="text-body text-neutral-300">
            Nếu bạn muốn một bộ loa được làm riêng cho không gian và gu nghe
            của mình, B-Audio có thể thiết kế, gia công và tuning trọn gói tại
            xưởng.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="card-industrial p-4 space-y-2">
              <h2 className="text-sm font-semibold tracking-wide text-neutral-100 uppercase">
                Thông tin cần chuẩn bị
              </h2>
              <ul className="text-sm text-neutral-300 space-y-1 list-disc list-inside">
                <li>Diện tích phòng / không gian sử dụng</li>
                <li>Gu nghe nhạc (Bolero, acoustic, EDM, nhạc vàng...)</li>
                <li>Có hát karaoke hay không</li>
                <li>Ngân sách dự kiến</li>
              </ul>
            </div>
            <div className="card-industrial p-4 space-y-2">
              <h2 className="text-sm font-semibold tracking-wide text-neutral-100 uppercase">
                Quy trình
              </h2>
              <ol className="text-sm text-neutral-300 space-y-1 list-decimal list-inside">
                <li>Trao đổi nhanh qua Zalo/điện thoại</li>
                <li>B-Audio đề xuất cấu hình &amp; báo giá</li>
                <li>Xưởng gia công, lắp ráp, đo &amp; tuning</li>
                <li>Bàn giao, hỗ trợ setup và bảo hành</li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="https://zalo.me/0877257799"
              className="btn-primary group"
            >
              <span>Nhắn Zalo để tư vấn nhanh</span>
            </a>
            <Link href="/products" className="btn-secondary">
              Xem các cấu hình mẫu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

