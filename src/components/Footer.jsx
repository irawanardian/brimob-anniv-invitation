
// src/components/Footer.jsx
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white border-t border-white/10 mt-20 overflow-hidden">

      {/* Floating stars/badges */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 400, opacity: 1 }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: Math.random() * 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute w-2 h-2 bg-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* Left Text */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold tracking-wide text-red-500 hover:scale-105 transition-transform">
            Anniversary Angkatan Dua-dua
          </h3>
          <p className="text-sm text-neutral-400 mt-2 hover:text-white transition-colors">
            Merayakan kebersamaan, mengenang perjalanan, dan menyatukan kembali cerita.
          </p>
          <p className="mt-2 text-xs italic text-neutral-500">
            "Tumbuh Bersama, Kuat Selamanya"
          </p>
        </div>

        {/* Right badge/quote */}
        <div className="flex gap-4 mt-6 md:mt-0 justify-center md:justify-end">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="w-6 h-6 md:w-8 md:h-8 border-2 border-red-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom Text */}
      <div className="mt-2 pt-6 mb-6 border-t border-white/10 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Anniversary Angkatan 2016. Built with ❤ link-invitasi.my.id
      </div>
    </footer>
  );
}
