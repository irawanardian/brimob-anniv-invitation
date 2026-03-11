// src/components/Cover.jsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Logo3D from "./Logo3D";

export default function Cover({ onOpen, guestName = "Tamu Kehormatan" }) {
  const eventDate = new Date("April 18, 2026 09:00:00").getTime();

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      return { hari: 0, jam: 0, menit: 0, detik: 0 };
    }

    return {
      hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
      jam: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      detik: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const particles = useMemo(() => {
    const count = isMobile ? 5 : prefersReducedMotion ? 0 : 10;
    if (count === 0) return [];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${4 + Math.random() * 4}s`,
      size: isMobile ? 2 : 3,
      opacity: isMobile ? 0.18 : 0.26,
    }));
  }, [isMobile, prefersReducedMotion]);

  const isEventStarted =
    timeLeft.hari === 0 &&
    timeLeft.jam === 0 &&
    timeLeft.menit === 0 &&
    timeLeft.detik === 0;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black text-white flex flex-col items-center justify-between py-4 px-6 font-sans">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          <>
            <div
              className="absolute inset-0 w-full h-full bg-center bg-cover scale-105"
              style={{ backgroundImage: "url('/assets/bgVideo/cover-poster.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/72 to-black/92" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(220,38,38,0.18),transparent_42%)]" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-red-950/20 to-transparent" />
          </>
        ) : (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/bgVideo/cover-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover scale-[1.03]"
            >
              <source src="/assets/bgVideo/bg1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/52 to-black/78" />
            {!prefersReducedMotion && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,0,0,0.12),transparent_70%)] animate-pulse" />
            )}
          </>
        )}
      </div>

      {/* GLOW DEPTH */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[240px] h-[240px] rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[280px] h-[120px] rounded-full bg-red-700/10 blur-3xl" />
      </div>

      {/* PARTICLES */}
      {particles.length > 0 && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-red-500 animate-pulse"
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>
      )}

      {/* DECORATIONS */}
      {!liteMode && (
        <>
          <div className="absolute top-20 left-5 z-10 opacity-35 animate-float-slow">
            <div className="w-16 h-16 md:w-24 md:h-24 border border-red-500/30 rotate-45" />
          </div>

          <div className="absolute bottom-20 right-5 z-10 opacity-35 animate-float-delayed">
            <div className="w-12 h-12 md:w-20 md:h-20 border border-red-500/30 rounded-full" />
          </div>

          <div className="absolute top-40 right-10 z-10 opacity-20 hidden md:block animate-spin-slow">
            <div className="w-32 h-32 border border-red-500/20 rounded-full" />
          </div>
        </>
      )}

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full gap-4 md:gap-8">
        {/* LOGO */}
        <div
          className="flex-none h-[10vh] md:h-[12vh] flex items-center justify-center mb-4 md:mb-6 mt-6 md:mt-8"
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
          <motion.div
            animate={
              liteMode
                ? {
                    y: [0, -10, 0],
                    scale: [1, 1.015, 1],
                  }
                : {
                    y: [0, -14, 0],
                    scale: [1, 1.02, 1],
                  }
            }
            transition={{
              duration: liteMode ? 3.4 : 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`w-[220px] sm:w-[260px] md:w-[340px] lg:w-[420px] xl:w-[500px] transition-transform duration-500 ${
              isHovered ? "md:scale-[1.04]" : "scale-100"
            }`}
          >
            <Logo3D />
          </motion.div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col items-center w-full max-w-2xl text-center mt-2 md:mt-0 space-y-4">
          {/* BADGE */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-red-500/20 blur-md" />
            <p className="relative tracking-[0.4em] text-[10px] md:text-xs text-gray-200 mb-2 font-semibold bg-black/35 px-4 py-1 rounded-full border border-red-500/40 shadow-[0_0_18px_rgba(220,38,38,0.12)]">
              UNDANGAN RESMI
            </p>
          </div>

          {/* TITLE */}
          <h1 className="text-xl md:text-3xl lg:text-4xl font-black leading-tight mb-2 italic">
            <span className="text-white inline-block drop-shadow-[0_2px_10px_rgba(255,255,255,0.08)]">
              ANNIVERSARY 13 TH
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-700 uppercase drop-shadow-[0_0_10px_rgba(239,68,68,0.15)]">
              Pengabdian Angkatan Dua Dua
            </span>
          </h1>

          <p className="text-red-500 text-[11px] md:text-sm tracking-[0.25em] mb-6 font-bold uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            "Tumbuh Bersama Kuat Selamanya"
          </p>

          {/* COUNTDOWN / STATUS */}
          {isEventStarted ? (
            <div className="mb-6 relative w-full max-w-[280px] md:max-w-md mx-auto">
              {!liteMode && (
                <div className="absolute inset-0 bg-red-600/20 blur-xl animate-pulse" />
              )}
              <div className="relative border-y-2 border-red-500 bg-black/70 py-4 px-6 flex flex-col items-center shadow-[0_0_18px_rgba(220,38,38,0.28)]">
                <span className="text-2xl md:text-3xl mb-2">🔥</span>
                <h3 className="text-base md:text-xl font-black text-white tracking-[0.2em] uppercase text-center">
                  HARI H TELAH TIBA
                </h3>
                <p className="text-[9px] md:text-xs text-red-400 font-bold tracking-[0.3em] mt-1 text-center">
                  ACARA SUDAH BERLANGSUNG
                </p>
                <p className="text-[9px] md:text-xs text-white font-bold tracking-[0.08em] mt-1 text-center">
                  Acara dimulai pada <br /> 18 April 2026 pukul 09:00 WIB
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center gap-2 md:gap-4 mb-6">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col items-center transition-transform duration-300 md:hover:-translate-y-1"
                >
                  <div className="bg-black/70 border border-red-900/50 px-3 py-2 md:px-5 md:py-3 rounded-md min-w-[55px] md:min-w-[75px] relative overflow-hidden shadow-[0_0_18px_rgba(127,29,29,0.18)]">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
                    {!isMobile && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                    )}
                    <span className="text-xl md:text-3xl font-bold text-white leading-none">
                      {String(value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[7px] md:text-[9px] uppercase mt-1.5 text-gray-500 tracking-widest font-black">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* GUEST */}
          <div className="w-full bg-gradient-to-r from-transparent via-red-950/25 to-transparent border-y border-white/10 py-3 mb-2">
            <p className="text-[9px] text-gray-500 tracking-[0.3em] mb-0.5 font-bold">
              KEPADA YTH.
            </p>
            <h2 className="text-base md:text-xl font-bold uppercase tracking-widest text-white relative inline-block">
              {guestName}
              {!liteMode && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
              )}
            </h2>
          </div>
        </div>

        {/* BUTTON */}
        <div className="w-full max-w-xs md:max-w-sm pb-4 mt-2 relative">
          {!isMobile && (
            <div className="absolute inset-0 bg-red-500 rounded-md blur-xl opacity-0 hover:opacity-35 transition-opacity duration-500" />
          )}

          <button
            onClick={onOpen}
            className="group w-full bg-gradient-to-b from-red-500 via-red-600 to-red-800 md:hover:from-red-500 md:hover:to-red-700 transition-all duration-300 py-3.5 rounded-md font-black text-white text-[10px] md:text-xs tracking-[0.4em] shadow-[0_12px_30px_rgba(127,29,29,0.35)] active:scale-95 border border-red-400/20 border-b-2 border-red-950 relative overflow-hidden"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {!isMobile && (
              <>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/16 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0 text-lg">
                  🎯
                </span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 text-lg">
                  ⚡
                </span>
              </>
            )}

            <span className="relative z-10">BUKA UNDANGAN</span>
          </button>

          <p className="text-center text-[6px] text-gray-600 mt-2 uppercase tracking-[0.3em]">
            • Tap untuk membuka •
          </p>
        </div>
      </div>

      {/* BOTTOM PROGRESS */}
      {!liteMode && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/50 z-30">
          <div className="h-full bg-gradient-to-r from-red-500 to-red-800 w-0 animate-progress" />
        </div>
      )}
    </div>
  );
}