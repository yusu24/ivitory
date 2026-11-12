import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-display text-6xl text-sage-300">404</p>
      <h1 className="mt-4 font-display text-2xl text-sage-800">Halaman Tidak Ditemukan</h1>
      <p className="mt-2 text-sage-600">
        Undangan yang Anda cari mungkin belum dipublikasikan atau tidak ada.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-sage-600 px-6 py-2.5 text-sm text-cream transition hover:bg-sage-700"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
