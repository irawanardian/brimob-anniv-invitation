// src/components/ClosingSection.jsx
import { useMemo, useState } from "react";

export default function ClosingSection() {
  const [showSalute, setShowSalute] = useState(false);

  // particles dibuat sekali (statis, tidak jatuh)
  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      height: 8 + Math.random() * 20,
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, []);

  return (
    <section className="relative w-full min-h-fit flex flex-col items-center justify-start bg-black text-white px-4 py-20">
      {/* ===== Background Militer (statis) ===== */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/30 via-black to-black" />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(220,38,38,0.2) 0px, rgba(220,38,38,0.2) 2px, transparent 2px, transparent 20px)
            `,
          }}
        />

        {/* lampu sorot: dibuat statis (tanpa animate) */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[128px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[128px] opacity-20" />
      </div>

      {/* ===== Particles (statis) ===== */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 bg-red-600/30 rounded-sm"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              height: `${p.height}px`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* ===== Main Content ===== */}
      <div className="relative z-20 max-w-4xl w-full flex flex-col items-center">
        {/* Header (tanpa fade-in) */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-block mb-6 relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-4 border-red-400/30">
              <span className="text-3xl">🎖️</span>
            </div>
            {/* ring sebelumnya muter: sekarang statis */}
            <div className="absolute inset-0 w-20 h-20 border-2 border-red-500/50 rounded-full border-t-red-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
              PENGHORMATAN AKHIR
            </span>
          </h2>

          <div className="flex items-center justify-center gap-4 text-red-400">
            <div className="h-px w-16 bg-red-500/50" />
            <p className="text-sm font-semibold tracking-wider">SATUAN BRIGADE</p>
            <div className="h-px w-16 bg-red-500/50" />
          </div>
        </div>

        {/* Ucapan Terima Kasih (tanpa pulse) */}
        <div className="relative mb-10 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 blur-3xl" />

          <div className="relative bg-black/60 backdrop-blur-sm border border-red-800/50 rounded-2xl p-8 text-center">
            <p className="text-2xl md:text-3xl font-bold text-red-400 mb-4">
              TERIMA KASIH
            </p>

            <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed">
              Kami mengucapkan terima kasih atas kehadiran dan doa yang diberikan.
            </p>

            <p className="text-md text-gray-400">
              Semoga kebersamaan ini terus menguatkan semangat kita sebagai
              <span className="text-red-400 font-semibold"> Angkatan Dua Dua</span>
            </p>

            {/* Motto (tanpa typing & cursor blink) */}
            <div className="mt-6 pt-6 border-t border-red-800/50">
              <p className="text-sm text-gray-500 mb-2">MOTTO KITA</p>
              <p className="text-2xl md:text-3xl font-bold text-red-400">
                Tumbuh Bersama • Kuat Bersama
              </p>
            </div>
          </div>
        </div>


        {/* Tombol hormat (tanpa shimmer/scale) */}
        <div className="text-center mb-10">
          <button
            onClick={() => setShowSalute((v) => !v)}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold text-white inline-flex items-center gap-3"
            type="button"
          >
            <span className="flex items-center gap-2">
              <span>🫡</span>
              HORMAT KEPADA ANGKATAN
            </span>
          </button>
        </div>

        {/* Closing Quote */}
        <div className="text-center">
          <p className="italic text-gray-400 text-sm mb-4">
            "Pengabdian tidak pernah berakhir, hanya berganti bentuk"
          </p>

          <div className="flex items-center justify-center gap-3 text-red-700">
            <div className="h-px w-12 bg-red-800" />
            <p className="text-xs tracking-widest">ANGKATAN DUA DUA</p>
            <div className="h-px w-12 bg-red-800" />
          </div>
        </div>

        {/* Navigation Buttons (tanpa hover animasi) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <a
            href="#top"
            className="px-8 py-3 bg-red-600 rounded-lg font-semibold"
          >
            <span className="flex items-center gap-2">
              <span>⬆️</span>
              KEMBALI KE ATAS
            </span>
          </a>

          <a
            href="#rsvp"
            className="px-8 py-3 bg-transparent border-2 border-red-700 rounded-lg font-semibold text-red-400"
          >
            <span className="flex items-center gap-2">
              <span>📋</span>
              LIHAT KONFIRMASI
            </span>
          </a>
        </div>
      </div>

      {/* Overlay salute (tanpa AnimatePresence, tampil statis saat showSalute=true) */}
      {showSalute && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-[200px] opacity-20">🫡</div>
        </div>
      )}
    </section>
  );
}