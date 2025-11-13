export default function CustomPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Đặt hàng custom</h1>
      <p className="mt-4 text-gray-700">
        Mô tả mong muốn của bạn về công suất, kích thước, chất liệu thùng, màu
        sắc, driver...
      </p>
      <form className="mt-6 grid gap-3">
        <input className="rounded border px-3 py-2" placeholder="Tên của bạn" />
        <input
          className="rounded border px-3 py-2"
          placeholder="Số điện thoại"
        />
        <textarea
          className="rounded border px-3 py-2"
          rows={6}
          placeholder="Mô tả yêu cầu custom"
        ></textarea>
        <button className="rounded bg-black px-5 py-3 text-white" type="button">
          Gửi yêu cầu
        </button>
      </form>
    </main>
  );
}
