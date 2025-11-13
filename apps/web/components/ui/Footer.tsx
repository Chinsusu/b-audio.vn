export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-3">
        <div>
          <div className="text-lg font-semibold">b‑audio</div>
          <p className="mt-2 text-sm text-gray-600">
            Xưởng gia công loa DIY, loa bluetooth, loa kéo karaoke – tuỳ biến
            theo yêu cầu.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-medium">Liên hệ</div>
          <div>Địa chỉ: 431 Phan Bội Châu, Buôn Ma Thuột, Đắk Lắk</div>
          <div>Hotline/Zalo: 0877 25 77 99</div>
          <div>Facebook: /dknykenvin</div>
        </div>
        <div className="text-sm">
          <div className="font-medium">Giờ mở cửa</div>
          <div>Thứ 2–7: 08:00–18:00</div>
          <div>CN: 09:00–17:00</div>
        </div>
      </div>
    </footer>
  );
}
