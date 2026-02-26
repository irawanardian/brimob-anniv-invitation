// src/components/Footer.jsx
import { useMemo } from "react";

export default function Footer() {
  // Bintang dibuat sekali biar posisi tetap & ga re-random tiap render
  const stars = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.4 + Math.random() * 0.6,
      size: 2 + Math.random() * 2, // 2-4px
    }));
  }, []);

  return (
    <footer className="relative bg-black text-white border-t border-white/10 mt-20 overflow-hidden">
      {/* Static stars/badges (no animation) */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute bg-red-500 rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              opacity: s.opacity,
              width: `${s.size}px`,
              height: `${s.size}px`,
            }}
          />
        ))}
      </div>

      {/* Content (no whileInView animation) */}
      <div className="relative max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Text */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold tracking-wide text-red-500">
            Anniversary Angkatan Dua-dua
          </h3>
          <p className="text-sm text-neutral-400 mt-2">
            Merayakan kebersamaan, mengenang perjalanan, dan menyatukan kembali cerita.
          </p>
          <p className="mt-2 text-xs italic text-neutral-500">
            "Tumbuh Bersama, Kuat Selamanya"
          </p>
        </div>

        {/* Right badge/quote (no hover motion) */}
        <div className="flex gap-4 mt-6 md:mt-0 justify-center md:justify-end">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 md:w-8 md:h-8 border-2 border-red-500 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-2 pt-6 mb-6 border-t border-white/10 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Anniversary Angkatan 2016. Built with ❤ link-invitasi.my.id
      </div>
    </footer>
  );
}