// src/components/Cover.jsx

import { useEffect, useState } from "react";
import Logo3D from "./Logo3D";

export default function Cover({ onOpen }) {
  const eventDate = new Date("March 31, 2026 00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = eventDate - now;
    if (distance <= 0) return { hari: 0, jam: 0, menit: 0, detik: 0 };

    return {
      hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
      jam: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      detik: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black text-white flex flex-col items-center justify-between py-4 px-6 font-sans">
      
      {/* ===== BACKGROUND VIDEO WITH OVERLAY EFFECTS ===== */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-7000"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.05)`,
          }}
        >
          <source src="/assets/bgVideo/bg1.mp4" type="video/mp4" />
        </video>
        
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/80 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.15),transparent_70%)] animate-pulse"></div>
      </div>

      {/* Simple particles overlay - fixed version */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="grid grid-cols-12 gap-4 w-full h-full">
            {[...Array(48)].map((_, i) => (
              <div 
                key={i}
                className="w-1 h-1 bg-red-500/30 rounded-full animate-ping"
                style={{
                  position: 'absolute',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating badges/ornaments - simplified */}
      <div className="absolute top-20 left-5 z-15 animate-float-slow opacity-30 md:opacity-50">
        <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-red-500/30 rotate-45 transform hover:rotate-90 hover:border-red-500/60 transition-all duration-1000"></div>
      </div>
      
      <div className="absolute bottom-20 right-5 z-15 animate-float-delayed opacity-30 md:opacity-50">
        <div className="w-12 h-12 md:w-20 md:h-20 border-2 border-red-500/30 rounded-full hover:scale-150 hover:border-red-500/60 transition-all duration-1000"></div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-40 right-10 z-15 animate-spin-slow opacity-20 hidden md:block">
        <div className="w-32 h-32 border border-red-500/20 rounded-full"></div>
      </div>

      <div className="absolute bottom-40 left-10 z-15 animate-bounce-slow opacity-20 hidden md:block">
        <div className="w-16 h-16 bg-red-500/5 rotate-12 transform skew-x-12"></div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full gap-4 md:gap-8">
        
        {/* 1. TOP: LOGO WITH ANIMATION */}
{/* h-[12vh] cukup untuk mobile agar tidak terlalu jauh jaraknya */}
<div className="flex-none h-[12vh] md:h-[15vh] flex items-center justify-center mb-6 md:mb-10 mt-8 md:mt-12 group cursor-pointer"
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}>
  
  {/* - scale-[0.45]: Ukuran pas untuk mobile (terlihat jelas tapi tidak menuhi layar)
      - md:scale-[0.25]: Ukuran kembali kecil/elegan untuk desktop 
      - lg:scale-[0.3]: Ukuran sedikit lebih besar untuk layar sangat lebar
  */}
  <div className={`scale-[0.45] md:scale-[0.25] lg:scale-[0.3] transition-all duration-700 transform ${isHovered ? 'scale-[0.5] md:scale-[0.3] rotate-6' : ''}`}>
    <Logo3D />
  </div>
</div>

        {/* 2. MIDDLE: TEXT & COUNTDOWN */}
        <div className="flex flex-col items-center w-full max-w-2xl text-center mt-2 md:mt-0 space-y-4">
          {/* Animated badge */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 blur-md opacity-50 animate-pulse"></div>
            <p className="relative tracking-[0.4em] text-[10px] md:text-xs text-gray-400 mb-2 font-semibold bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full border border-red-500/30">
              UNDANGAN RESMI
            </p>
          </div>

          {/* JUDUL with hover effect */}
          <h1 className="text-xl md:text-3xl lg:text-4xl font-black leading-tight mb-2 italic group">
            <span className="text-white inline-block transform group-hover:scale-105 transition-transform duration-300">ANNIVERSARY 13 TH</span> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 uppercase relative">
              Pengabdian Angkatan Dua Dua
              <span className="absolute -inset-1 bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </span>
          </h1>

          {/* SLOGAN with typing effect simulation */}
          <p className="text-red-500 text-[11px] md:text-sm tracking-[0.25em] mb-6 font-bold uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-pulse-slow">
            "Tumbuh Bersama Kuat Selamanya"
          </p>

          {/* COUNTDOWN with interactive cards */}
          <div className="flex justify-center gap-2 md:gap-4 mb-6 perspective-1000">
            {Object.entries(timeLeft).map(([label, value], index) => (
              <div key={label} 
                   className="flex flex-col items-center transform transition-all duration-500 hover:-translate-y-2 hover:scale-110"
                   style={{ animationDelay: `${index * 100}ms` }}>
                <div className="bg-black/80 backdrop-blur-md border border-red-900/40 px-3 py-2 md:px-5 md:py-3 rounded shadow-xl min-w-[55px] md:min-w-[75px] relative overflow-hidden group/card">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000"></div>
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

          {/* GUEST CARD with glass effect */}
          <div className="w-full bg-gradient-to-r from-transparent via-red-950/30 to-transparent border-y border-white/10 py-3 mb-2 backdrop-blur-sm">
            <p className="text-[9px] text-gray-500 tracking-[0.3em] mb-0.5 font-bold">KEPADA YTH.</p>
            <h2 className="text-base md:text-xl font-bold uppercase tracking-widest text-white relative inline-block">
              Tamu Kehormatan
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></span>
            </h2>
          </div>
        </div>

        {/* 3. BOTTOM: BUTTON with advanced interactions */}
        <div className="w-full max-w-xs md:max-w-sm pb-4 mt-2 relative">
          {/* Ripple effect background */}
          <div className="absolute inset-0 bg-red-500 rounded-sm blur-xl opacity-0 hover:opacity-50 transition-opacity duration-500"></div>
          
          <button
              onClick={onOpen}
              className="group w-full bg-gradient-to-b from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 transition-all duration-300 py-3.5 rounded-sm font-black text-white text-[10px] md:text-xs tracking-[0.4em] shadow-[0_10px_20px_rgba(0,0,0,0.5)] active:scale-95 border-b-2 border-red-900 relative overflow-hidden"
            >
            {/* Multiple animated effects */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></span>
            
            {/* Icon container */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0">
              <span className="text-lg">🎯</span>
            </span>
            
            <span className="relative z-10 group-hover:tracking-[0.5em] transition-all duration-300">
              BUKA UNDANGAN
            </span>
            
            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
              <span className="text-lg">⚡</span>
            </span>
          </button>
          
          {/* Small decorative text */}
          <p className="text-center text-[6px] text-gray-600 mt-2 uppercase tracking-[0.3em]">
            • Tap untuk membuka •
          </p>
        </div>

      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/50 z-30">
        <div className="h-full bg-gradient-to-r from-red-500 to-red-800 w-0 animate-progress"></div>
      </div>
    </div>
  );
}