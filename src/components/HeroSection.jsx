import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo3D from "./Logo3D";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 250);
    const textTimer = setTimeout(() => setTextRevealed(true), 700);

    const updateFlags = () => {
      const mobile = window.innerWidth < 768;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      setIsMobile(mobile);
      setPrefersReducedMotion(reduced);
    };

    updateFlags();
    window.addEventListener("resize", updateFlags);

    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
      window.removeEventListener("resize", updateFlags);
    };
  }, []);

  const liteMode = isMobile || prefersReducedMotion;

  const particles = useMemo(() => {
    const count = isMobile ? 6 : prefersReducedMotion ? 0 : 10;
    if (count === 0) return [];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: isMobile ? Math.random() * 2 + 2 : Math.random() * 3 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 4,
      opacity: isMobile ? Math.random() * 0.12 + 0.08 : Math.random() * 0.18 + 0.12,
      driftX: Math.random() * 12 - 6,
      driftY: Math.random() * 18 - 9,
    }));
  }, [isMobile, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-black text-white"
    >
      {/* BACKGROUND */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/25 to-black" />

        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(220, 38, 38, 0.045) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(220, 38, 38, 0.045) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? "34px 34px" : "50px 50px",
          }}
        />

        {liteMode ? (
          <>
            <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full bg-red-600/10 blur-3xl" />
            <div className="absolute bottom-[10%] right-[10%] w-[180px] h-[180px] rounded-full bg-red-700/10 blur-3xl" />
          </>
        ) : (
          <>
            <motion.div
              animate={{
                x: [0, 60, 0],
                opacity: [0.08, 0.16, 0.08],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-[320px] h-[320px] bg-gradient-to-r from-red-600/20 to-transparent rounded-full blur-[72px]"
            />

            <motion.div
              animate={{
                x: [0, -60, 0],
                opacity: [0.08, 0.14, 0.08],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-gradient-to-l from-red-600/20 to-transparent rounded-full blur-[72px]"
            />
          </>
        )}
      </motion.div>

      {/* NOISE / TEXTURE */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 0.6px, transparent 0.6px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* PARTICLES */}
      {particles.length > 0 && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-red-500"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: particle.opacity,
              }}
              animate={
                liteMode
                  ? { opacity: [particle.opacity, particle.opacity * 1.4, particle.opacity] }
                  : {
                      y: [0, -particle.driftY, 0],
                      x: [0, particle.driftX, 0],
                      opacity: [particle.opacity, particle.opacity * 1.6, particle.opacity],
                    }
              }
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* LOGO */}
      <motion.div
        className="relative z-30 mb-10 md:mb-12"
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {!liteMode && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border border-red-500/25 rounded-full border-t-red-500/70"
            />

            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.16, 0.28, 0.16] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-6 bg-red-500/10 rounded-full blur-md"
            />
          </>
        )}

        <div className="w-32 h-32 md:w-44 md:h-44 mx-auto relative drop-shadow-[0_0_18px_rgba(239,68,68,0.12)]">
          <Logo3D />
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <motion.div
        className="relative z-30 max-w-3xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* INTRO TEXT */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm md:text-base text-gray-400 mb-6 tracking-wide relative inline-block"
        >
          <span className="relative">
            Dengan hormat kami mengundang
            <motion.span
              className="absolute bottom-0 left-0 w-full h-px bg-red-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: textRevealed ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              style={{ originX: 0 }}
            />
          </span>
        </motion.p>

        {/* TITLE */}
        <div className="relative mb-6">
          {!liteMode && (
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 blur-xl -z-10"
              animate={{
                opacity: [0.14, 0.28, 0.14],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <motion.h1
            className="text-3xl md:text-6xl font-black leading-tight relative text-white drop-shadow-[0_2px_16px_rgba(255,255,255,0.06)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.75 }}
          >
            Anniversary 13 Tahun
          </motion.h1>

          <motion.h2
            className="text-xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-700 mt-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.12)]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            Pengabdian Angkatan Dua Dua
          </motion.h2>
        </div>

        {/* DECORATIVE LINE */}
        <motion.div
          className="relative h-[2px] mx-auto mb-6 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: textRevealed ? 100 : 0 }}
          transition={{ delay: 1, duration: 0.45 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </motion.div>

        {/* OPTIONAL SUBTEXT */}
        <motion.p
          className="text-sm md:text-base text-gray-300/90 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: visible ? 1 : 0.9, y: visible ? 0 : 16 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          Sebuah perjalanan panjang yang tumbuh dengan loyalitas, keberanian, dan semangat kebersamaan.
        </motion.p>
      </motion.div>

      {/* DECORATIVE SHAPES */}
      {!liteMode && (
        <>
          <motion.div
            className="absolute bottom-10 left-5 w-14 h-14 border border-red-500/25 rounded-full"
            animate={{
              scale: [1, 1.12, 1],
              rotate: [0, 180, 360],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute top-20 right-10 w-20 h-20 border border-red-500/20 rounded-full"
            animate={{
              scale: [1, 1.16, 1],
              rotate: [360, 180, 0],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute top-1/3 left-1/4 w-24 h-24 bg-red-500/5 rounded-full blur-2xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-red-600/5 rounded-full blur-2xl"
            animate={{
              x: [0, -24, 0],
              y: [0, 24, 0],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </section>
  );
}