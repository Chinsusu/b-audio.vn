"use client";

export default function ReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="rounded-lg border px-4 py-2"
    >
      Tải lại trang
    </button>
  );
}
