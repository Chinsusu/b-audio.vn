import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp | B-Audio",
  description:
    "Giải đáp các câu hỏi thường gặp về sản phẩm, custom, bảo hành và giao hàng tại B-Audio.",
};

export default function FAQPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-heading text-h2 text-neutral-100 uppercase tracking-tight">
          Câu hỏi thường gặp
        </h1>
        <p className="text-sm text-neutral-300 max-w-2xl">
          Nếu bạn chưa từng mua loa custom hoặc chưa tới xưởng lần nào, những
          câu hỏi dưới đây có thể giúp bạn hình dung rõ hơn. Nếu vẫn còn thắc
          mắc, cứ nhắn Zalo cho B-Audio nhé.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-h4 text-neutral-100 uppercase tracking-tight">
          1. Sản phẩm &amp; chất âm
        </h2>

        <div className="space-y-4 text-sm text-neutral-300">
          <div>
            <h3 className="font-semibold text-neutral-100">
              Loa của B-Audio khác gì loa hãng ngoài thị trường?
            </h3>
            <p className="mt-1">
              Loa hãng thường được thiết kế cho số đông, khó can thiệp vào cấu
              hình hoặc tuning. B-Audio làm theo nhu cầu cụ thể của từng khách –
              cùng công suất nhưng có thể cho ra chất âm khác nhau tùy gu nghe
              và không gian phòng. Loa xưởng cũng dễ sửa chữa và nâng cấp hơn,
              bạn không phải bỏ cả bộ chỉ vì hỏng một chi tiết.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">
              B-Audio tuning loa theo gu như thế nào?
            </h3>
            <p className="mt-1">
              Trước khi làm, chúng tôi sẽ hỏi về không gian phòng, thể loại
              nhạc bạn nghe, có hát karaoke hay không. Từ đó chọn cấu hình
              driver, thùng và phân tần phù hợp. Khi bàn giao, nếu bạn muốn
              chỉnh lại chút (bass ít hơn, treble dịu hơn), xưởng có thể hỗ trợ.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">
              Nghe thử loa trước khi mua được không?
            </h3>
            <p className="mt-1">
              Được. Bạn có thể ghé trực tiếp xưởng B-Audio, mang theo playlist
              quen thuộc để nghe thử. Vui lòng hẹn trước để chúng tôi sắp xếp
              thời gian và phòng nghe.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-h4 text-neutral-100 uppercase tracking-tight">
          2. Custom &amp; đặt làm theo yêu cầu
        </h2>

        <div className="space-y-4 text-sm text-neutral-300">
          <div>
            <h3 className="font-semibold text-neutral-100">
              Tôi có thể tự chọn màu thùng, mặt lưới, logo không?
            </h3>
            <p className="mt-1">
              Có. Phần lớn sản phẩm của B-Audio cho phép custom ngoại hình:
              màu sơn/thùng, loại mặt lưới (kim loại, vải...), logo B-Audio
              hoặc logo riêng của bạn/quán. Chi phí sẽ thay đổi tùy mức độ
              custom, đội ngũ sẽ báo giá rõ ràng trước khi làm.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">
              Quy trình đặt hàng custom diễn ra như thế nào?
            </h3>
            <p className="mt-1">
              Bạn mô tả nhu cầu và ngân sách. B-Audio tư vấn cấu hình &amp; báo
              giá, bạn duyệt cấu hình và đặt cọc, xưởng tiến hành làm – đo –
              tuning, sau đó bàn giao và hỗ trợ setup ban đầu.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">
              Thời gian thực hiện một bộ loa custom là bao lâu?
            </h3>
            <p className="mt-1">
              Tùy độ phức tạp. Với cấu hình phổ biến, thời gian thường từ 5–10
              ngày làm việc. Những dự án đặc biệt có thể lâu hơn và sẽ được báo
              ngay từ đầu.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-h4 text-neutral-100 uppercase tracking-tight">
          3. Bảo hành &amp; sửa chữa
        </h2>

        <div className="space-y-4 text-sm text-neutral-300">
          <div>
            <h3 className="font-semibold text-neutral-100">
              Loa của B-Audio được bảo hành bao lâu?
            </h3>
            <p className="mt-1">
              Phần lớn sản phẩm được bảo hành 2 năm tại xưởng cho các lỗi do
              nhà sản xuất (driver, ampli, lắp ráp...). Một số linh kiện tiêu
              hao có chính sách riêng – thông tin sẽ được ghi rõ khi bàn giao.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">
              Nếu loa bị hỏng do mình làm rơi / va chạm thì sao?
            </h3>
            <p className="mt-1">
              Những trường hợp va đập, vào nước, sử dụng sai hướng dẫn thường
              không nằm trong bảo hành. Tuy nhiên B-Audio vẫn hỗ trợ kiểm tra và
              báo giá sửa chữa với chi phí hợp lý nhất có thể.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">
              Hết bảo hành rồi thì có được sửa tiếp không?
            </h3>
            <p className="mt-1">
              Có. Bạn có thể mang loa tới xưởng hoặc gửi chuyển phát. B-Audio sẽ
              kiểm tra, báo lỗi và chi phí trước khi sửa. Nhiều khách dùng loa
              3–5 năm vẫn quay lại nâng cấp hoặc bảo dưỡng định kỳ.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-h4 text-neutral-100 uppercase tracking-tight">
          4. Giao hàng &amp; thanh toán
        </h2>

        <div className="space-y-4 text-sm text-neutral-300">
          <div>
            <h3 className="font-semibold text-neutral-100">
              Tôi ở tỉnh khác, B-Audio có ship không?
            </h3>
            <p className="mt-1">
              Có. B-Audio giao hàng toàn quốc qua đơn vị vận chuyển, đóng gói
              kỹ và có thể mua thêm bảo hiểm hàng hóa nếu bạn yêu cầu. Chi phí
              ship tuỳ trọng lượng và khoảng cách.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">
              Thanh toán như thế nào?
            </h3>
            <p className="mt-1">
              Với đơn tiêu chuẩn: bạn có thể chuyển khoản toàn bộ hoặc cọc một
              phần. Với đơn custom: thường cần đặt cọc trước khi xưởng bắt đầu
              làm. Thông tin chi tiết sẽ được gửi qua kênh chính thức của
              B-Audio.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">
              Nếu loa ship tới bị móp, hư hỏng thì phải làm gì?
            </h3>
            <p className="mt-1">
              Vui lòng chụp lại tình trạng thùng/hộp và sản phẩm ngay khi nhận,
              sau đó liên hệ B-Audio. Chúng tôi sẽ phối hợp với đơn vị vận
              chuyển để xử lý, sửa chữa hoặc đổi sản phẩm mới tuỳ trường hợp.
            </p>
          </div>
        </div>
      </section>

      <section className="section-accent rounded-3xl px-6 py-10 md:px-10 md:py-12">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-heading text-h4 text-neutral-100 uppercase tracking-tight">
            Không thấy câu trả lời bạn cần?
          </h2>
          <p className="text-sm text-neutral-100">
            Nhắn Zalo hoặc gọi <span className="font-semibold">0877 25 77 99</span>{" "}
            – B-Audio sẽ giải đáp trực tiếp cho bạn.
          </p>
        </div>
      </section>
    </div>
  );
}

