// src/components/ClosingSection.jsx
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";

export default function ClosingSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    margin: "0px 0px -100px 0px",
  });

  const [showSalute, setShowSalute] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const mottoPhrases = ["Tumbuh Bersama", "Kuat Selamanya"];

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

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % mottoPhrases.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [isInView]);

  useEffect(() => {
    if (!showSalute) return;

    const timeout = setTimeout(() => {
      setShowSalute(false);
    }, 900);

    return () => clearTimeout(timeout);
  }, [showSalute]);

  const confettiItems = useMemo(() => {
    const count = isMobile ? 5 : prefersReducedMotion ? 0 : 8;
    if (count === 0) return [];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 3,
      height: 10 + Math.random() * 10,
      opacity: isMobile ? 0.18 : 0.25,
    }));
  }, [isMobile, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-fit flex flex-col items-center justify-start bg-black text-white px-4 py-20 overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/25 via-black to-black" />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(220,38,38,0.18) 0px, rgba(220,38,38,0.18) 2px, transparent 2px, transparent 22px)",
          }}
        />

        {liteMode ? (
          <>
            <div className="absolute top-0 left-0 w-[240px] h-[240px] bg-red-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-red-600/10 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <motion.div
              animate={{
                x: [0, 60, 0],
                opacity: [0.08, 0.18, 0.08],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-[320px] h-[320px] bg-red-600/18 rounded-full blur-[72px]"
            />

            <motion.div
              animate={{
                x: [0, -60, 0],
                opacity: [0.08, 0.18, 0.08],
              }}
              transition={{ duration: 12, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-red-600/18 rounded-full blur-[72px]"
            />
          </>
        )}
      </div>

      {/* CONFETTI */}
      {confettiItems.length > 0 && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {confettiItems.map((item) => (
            <motion.div
              key={item.id}
              className="absolute w-1 bg-red-600/30 rounded-sm"
              style={{
                left: item.left,
                height: `${item.height}px`,
                opacity: item.opacity,
              }}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: "100vh", opacity: [0, item.opacity, 0] }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="relative z-20 max-w-4xl w-full flex flex-col items-center">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6 relative"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-4 border-red-400/30 shadow-[0_0_22px_rgba(220,38,38,0.18)]">
              <span className="text-3xl">🎖️</span>
            </div>

            {!liteMode && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-20 h-20 border border-red-500/40 rounded-full border-t-red-500"
              />
            )}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(239,68,68,0.12)]">
              PENGHORMATAN AKHIR
            </span>
          </motion.h2>

          <div className="flex items-center justify-center gap-4 text-red-400">
            <div className="h-px w-16 bg-red-500/50" />
            <p className="text-sm font-semibold tracking-wider">SATUAN BRIGADDE</p>
            <div className="h-px w-16 bg-red-500/50" />
          </div>
        </motion.div>

        {/* THANK YOU BOX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative mb-10 w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/12 via-transparent to-red-600/12 blur-2xl" />

          <div className="relative bg-black/60 border border-red-800/40 rounded-2xl p-8 text-center">
            <motion.p
              animate={!liteMode ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl md:text-3xl font-bold text-red-400 mb-4"
            >
              TERIMA KASIH
            </motion.p>

            <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed">
              Kami mengucapkan terima kasih atas kehadiran dan doa yang diberikan.
            </p>

            <p className="text-md text-gray-400">
              Semoga kebersamaan ini terus menguatkan semangat kita sebagai
              <span className="text-red-400 font-semibold"> Angkatan Dua Dua</span>
            </p>

            {/* MOTTO */}
            <motion.div
              className="mt-6 pt-6 border-t border-red-800/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-gray-500 mb-2">MOTTO KITA</p>

              <AnimatePresence mode="wait">
                <motion.p
                  key={mottoPhrases[currentPhrase]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-2xl md:text-3xl font-bold text-red-400 min-h-[48px]"
                >
                  {mottoPhrases[currentPhrase]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* DOA & HARAPAN */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="w-full max-w-2xl mx-auto mb-12 relative"
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500" />

          <div className="bg-red-950/20 p-6 md:p-8 text-center border border-red-900/30">
            <span className="text-3xl mb-4 inline-block opacity-80">🤲</span>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">
              "Semoga Allah SWT senantiasa memberikan perlindungan, kesehatan, dan kelancaran
              dalam setiap langkah pengabdian kita. Tetap solid, jaga kekompakan, dan
              selalu kembali pulang dengan selamat demi keluarga di rumah."
            </p>
          </div>
        </motion.div>

        {/* SALUTE BUTTON */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mb-10"
        >
          <motion.button
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowSalute(true)}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold text-white inline-flex items-center gap-3 group relative overflow-hidden shadow-[0_10px_24px_rgba(127,29,29,0.28)]"
          >
            {!isMobile && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}

            <span className="relative flex items-center gap-2">
              <span>🫡</span>
              HORMAT KEPADA ANGKATAN
            </span>
          </motion.button>
        </motion.div>

        {/* QUOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="text-center"
        >
          <p className="italic text-gray-400 text-sm mb-4">
            "Pengabdian tidak pernah berakhir, hanya berganti bentuk"
          </p>

          <div className="flex items-center justify-center gap-3 text-red-700">
            <div className="h-px w-12 bg-red-800" />
            <p className="text-xs tracking-widest">ANGKATAN DUA DUA</p>
            <div className="h-px w-12 bg-red-800" />
          </div>
        </motion.div>
      </div>

      {/* SALUTE OVERLAY */}
      <AnimatePresence>
        {showSalute && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.9, 1.05, 1], opacity: [0.08, 0.18, 0.08] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[120px] md:text-[180px]"
            >
              🫡
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}