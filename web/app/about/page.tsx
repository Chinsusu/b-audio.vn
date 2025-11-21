import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu | B-Audio",
  description:
    "B-Audio – Industrial Audio Workshop tại Buôn Ma Thuột. Xưởng loa DIY thiết kế, chế tạo và tinh chỉnh hệ thống âm thanh theo nhu cầu thực tế.",
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="section-dark rounded-3xl px-6 py-10 md:px-10 md:py-14">
        <div className="space-y-6 max-w-3xl">
          <h1 className="font-heading text-h2 text-neutral-100 uppercase tracking-tight">
            B-Audio – Industrial Audio Workshop
          </h1>
          <p className="text-body text-neutral-300">
            Xưởng loa DIY chuyên thiết kế, chế tạo và tinh chỉnh hệ thống âm
            thanh theo nhu cầu thực tế của từng khách hàng. Mỗi bộ loa tại
            B-Audio đều được đo đạc, tuning và hoàn thiện tại xưởng, để phù hợp
            với không gian và gu nghe của chính bạn.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-h3 text-neutral-100 uppercase tracking-tight">
          B-Audio bắt đầu như thế nào?
        </h2>
        <div className="space-y-4 text-sm text-neutral-300">
          <p>
            B-Audio xuất phát từ một nhóm anh em mê loa DIY, muốn có âm thanh
            đúng gu nhưng lại khó tìm thấy sản phẩm phù hợp trên thị trường: loa
            hãng thì giá cao hoặc khó nâng cấp, loa phổ thông thì thiếu chi
            tiết, bass ù và nhanh xuống cấp.
          </p>
          <p>
            Từ vài bộ loa làm chơi cho bạn bè, dần dần chúng tôi mở rộng thành
            xưởng với đầy đủ máy móc gia công thùng, thiết bị đo đạc và kho linh
            kiện được chọn lọc kỹ. Mục tiêu của B-Audio rất đơn giản: làm ra
            những bộ loa mà chính mình cũng muốn mang về nhà nghe mỗi ngày.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="card-industrial p-5 space-y-3">
          <h3 className="text-sm font-semibold tracking-wide text-neutral-100 uppercase">
            Trung thực về âm thanh và linh kiện
          </h3>
          <p className="text-sm text-neutral-300">
            Không phù phép thông số. Cấu hình và công suất được ghi đúng như khả
            năng thực tế – ưu tiên độ bền và khả năng nghe lâu dài, không mệt
            tai.
          </p>
        </div>
        <div className="card-industrial p-5 space-y-3">
          <h3 className="text-sm font-semibold tracking-wide text-neutral-100 uppercase">
            Tối ưu cho nhu cầu thực tế
          </h3>
          <p className="text-sm text-neutral-300">
            Mỗi không gian nghe nhạc đều khác nhau. B-Audio luôn hỏi kỹ: bạn
            nghe nhạc gì, phòng rộng bao nhiêu, có hát karaoke không… rồi mới
            đề xuất cấu hình.
          </p>
        </div>
        <div className="card-industrial p-5 space-y-3">
          <h3 className="text-sm font-semibold tracking-wide text-neutral-100 uppercase">
            Dễ sửa chữa, dễ nâng cấp
          </h3>
          <p className="text-sm text-neutral-300">
            Cấu trúc thùng và hệ thống được ưu tiên thiết kế dễ mở, dễ thay thế
            driver và module. Sau vài năm, bạn có thể nâng cấp từng phần mà
            không phải bỏ đi cả bộ loa.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-h3 text-neutral-100 uppercase tracking-tight">
          Xưởng B-Audio làm việc như thế nào?
        </h2>
        <div className="grid gap-4 md:grid-cols-4 text-sm text-neutral-300">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Bước 1
            </p>
            <p className="font-semibold text-neutral-100">
              Trao đổi &amp; thiết kế
            </p>
            <p>
              Bạn mô tả nhu cầu, gửi vài tấm hình không gian. B-Audio tư vấn cấu
              hình và báo giá chi tiết.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Bước 2
            </p>
            <p className="font-semibold text-neutral-100">
              Gia công &amp; lắp ráp
            </p>
            <p>
              Thùng loa được cắt, dán, gia cố, sơn hoàn thiện. Driver, ampli,
              phân tần được lắp và đi dây gọn gàng.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Bước 3
            </p>
            <p className="font-semibold text-neutral-100">Đo &amp; tuning</p>
            <p>
              Hệ thống được đo bằng thiết bị chuyên dụng, sau đó tuning lại cho
              phù hợp với kiểu nghe thực tế.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Bước 4
            </p>
            <p className="font-semibold text-neutral-100">
              Bàn giao &amp; hậu mãi
            </p>
            <p>
              Giao tận nơi hoặc bạn nhận tại xưởng. Hỗ trợ setup ban đầu, hướng
              dẫn sử dụng và bảo hành 2 năm.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-h3 text-neutral-100 uppercase tracking-tight">
          Một vài dự án B-Audio đã thực hiện
        </h2>
        <div className="grid gap-4 md:grid-cols-3 text-sm text-neutral-300">
          <div className="card-industrial p-4 space-y-2">
            <p className="font-semibold text-neutral-100">
              Cafe acoustic 50m² tại Buôn Ma Thuột
            </p>
            <p>
              2 cặp loa bookshelf + 1 sub, tuning cho vocal &amp; nhạc cụ mộc,
              hoạt động mỗi tối.
            </p>
          </div>
          <div className="card-industrial p-4 space-y-2">
            <p className="font-semibold text-neutral-100">
              Loa kéo custom cho nhóm đi phượt
            </p>
            <p>
              Thùng gọn, tay kéo chắc chắn, pin lớn, chịu được sử dụng ngoài
              trời thường xuyên.
            </p>
          </div>
          <div className="card-industrial p-4 space-y-2">
            <p className="font-semibold text-neutral-100">
              Hệ thống cho phòng khách 25m²
            </p>
            <p>
              Kết hợp nghe nhạc và xem phim, sử dụng chung với TV và đầu
              karaoke, tối ưu cho sử dụng hàng ngày.
            </p>
          </div>
        </div>
      </section>

      <section className="section-accent rounded-3xl px-6 py-10 md:px-10 md:py-12">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-heading text-h3 text-neutral-100 uppercase tracking-tight">
            Muốn nghe thử trước khi quyết định?
          </h2>
          <p className="text-sm text-neutral-100">
            Bạn có thể ghé xưởng B-Audio tại Buôn Ma Thuột, mang theo playlist
            quen thuộc của mình. Nhắn Zalo hoặc gọi{" "}
            <span className="font-semibold">0877 25 77 99</span> để hẹn trước.
          </p>
        </div>
      </section>
    </div>
  );
}

