// src/components/BackgroundMusic.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundMusic({ isPlaying }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);

    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        setPlaying(false);
        console.log("Autoplay ditahan");
      });
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, [isPlaying]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch (err) {
      console.log("Gagal memutar audio", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/assets/music/hbd-akustik.mp3" loop preload="none" />

      <motion.button
        onClick={toggleMusic}
        whileTap={{ scale: 0.92 }}
        animate={playing && !isMobile ? { rotate: 360 } : { rotate: 0 }}
        transition={
          playing && !isMobile
            ? { duration: 10, repeat: Infinity, ease: "linear" }
            : { duration: 0.35 }
        }
        className={`w-12 h-12 text-white flex items-center justify-center rounded-full transition-colors duration-300
          ${isMobile
            ? "bg-red-600 shadow-lg"
            : "bg-red-600/90 shadow-[0_0_12px_rgba(220,38,38,0.35)]"}
          border border-red-500/50 hover:bg-red-500`}
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