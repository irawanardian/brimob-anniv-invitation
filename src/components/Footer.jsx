// src/components/Footer.jsx
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const updateFlags = () => {
      const mobile = window.innerWidth < 768;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      setIsMobile(mobile);
      setPrefersReducedMotion(reduced);
    };

    updateFlags();
    window.addEventListener("resize", updateFlags);

    return () => window.removeEventListener("resize", updateFlags);
  }, []);

  const liteMode = isMobile || prefersReducedMotion;

  const dots = useMemo(() => {
    const count = liteMode ? 0 : 6;
    if (count === 0) return [];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 7 + Math.random() * 3,
      delay: Math.random() * 2,
      size: Math.random() > 0.5 ? 6 : 8,
      opacity: 0.35,
    }));
  }, [liteMode]);

  return (
    <footer className="relative bg-black text-white border-t border-white/10 mt-20 overflow-hidden">
      {/* FLOATING DOTS */}
      {dots.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 220, opacity: [0, dot.opacity, 0] }}
              transition={{
                duration: dot.duration,
                delay: dot.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bg-red-500 rounded-full"
              style={{
                left: dot.left,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* LEFT */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold tracking-wide text-red-500 md:hover:scale-[1.02] transition-transform">
            Anniversary Angkatan Dua-dua
          </h3>
          <p className="text-sm text-neutral-400 mt-2 md:hover:text-white transition-colors">
            Merayakan kebersamaan, mengenang perjalanan, dan menyatukan kembali cerita.
          </p>
          <p className="mt-2 text-xs italic text-neutral-500">
            "Tumbuh Bersama, Kuat Selamanya"
          </p>
        </div>

        {/* RIGHT BADGES */}
        <div className="flex gap-4 mt-6 md:mt-0 justify-center md:justify-end">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={!liteMode ? { scale: 1.15, rotate: 8 } : {}}
              transition={{ duration: 0.25 }}
              className="w-6 h-6 md:w-8 md:h-8 border-2 border-red-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* BOTTOM */}
      <div className="mt-2 pt-6 mb-6 border-t border-white/10 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Anniversary Angkatan 2016. Built with ❤ MW
      </div>
    </footer>
  );
}