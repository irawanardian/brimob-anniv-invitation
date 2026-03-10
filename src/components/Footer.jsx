import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <footer className="relative bg-black text-white border-t border-white/10 mt-20 overflow-hidden">
      {/* Hanya ngerender partikel kalau BUKAN mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 400, opacity: 0.5 }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="absolute w-1 h-1 bg-red-500/50 rounded-full"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold tracking-wide text-red-500">
            Anniversary Angkatan Dua-dua
          </h3>
          <p className="text-sm text-neutral-400 mt-2">
            "Tumbuh Bersama, Kuat Selamanya"
          </p>
        </div>
        
        <div className="text-xs text-neutral-600">
          © 2026 BRIGADDE 22. All Rights Reserved.
        </div>
      </motion.div>
    </footer>
  );
}