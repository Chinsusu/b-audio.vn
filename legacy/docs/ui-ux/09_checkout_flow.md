# Checkout / Lead Flow

## Bán trực tiếp
- Add to Cart → Checkout 1 bước (tối thiểu trường).
- COD + chuyển khoản; hiển thị phí ship ước tính.

## Bán theo Quote/Custom
- Quick Order (Tên, SĐT, sản phẩm) → tạo `order` draft trong Strapi.
- “Đặt custom”: điền option + upload ảnh → tạo `order` với `status = new`.
- Auto gửi email nội bộ/Zalo: “Có đơn hàng mới.”
