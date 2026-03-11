// src/components/BackgroundMusic.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundMusic({ isPlaying }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Cek device untuk mematikan fitur berat
    setIsMobile(window.innerWidth < 768);

    if (isPlaying) {
      audioRef.current?.play().catch(() => console.log("Autoplay ditahan"));
      setPlaying(true);
    } else {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/assets/music/hbd-akustik.mp3" loop />
      
      <motion.button
        onClick={toggleMusic}
        whileTap={{ scale: 0.9 }}
        // OPTIMASI: Matikan rotasi di mobile jika masih terasa berat
        animate={playing && !isMobile ? { rotate: 360 } : { rotate: 0 }}
        transition={playing && !isMobile ? { duration: 10, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
        
        // OPTIMASI CSS:
        // 1. Ganti backdrop-blur jadi bg-opacity solid di mobile
        // 2. Tambahkan will-change untuk hardware acceleration
        className={`w-12 h-12 text-white flex items-center justify-center rounded-full transition-all duration-300
          ${isMobile ? 'bg-red-600 shadow-lg' : 'bg-red-600/80 backdrop-blur-md shadow-[0_0_15px_rgba(220,38,38,0.5)]'}
          border border-red-500/50 hover:bg-red-500`}
        style={{ willChange: "transform" }}
      >
        {playing ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}