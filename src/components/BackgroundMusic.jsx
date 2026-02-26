// src/components/BackgroundMusic.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundMusic({ isPlaying }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(err => console.log("Autoplay dicegah browser"));
      setPlaying(true);
    } else {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/assets/music/background.mp3" loop />
      
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        // Efek rotasi pelan kalau lagi playing
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={playing ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
        className="w-12 h-12 bg-red-600/80 backdrop-blur-md border border-red-500/50 text-white flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-colors hover:bg-red-500"
      >
        {playing ? (
          // Icon Pause (Dua garis vertikal)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          // Icon Play (Segitiga)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}