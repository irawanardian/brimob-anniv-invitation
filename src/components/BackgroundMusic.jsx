// src/components/BackgroundMusic.jsx
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic({ isPlaying }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
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
      <audio
        ref={audioRef}
        src="/assets/music/background.mp3"
        loop
        />
      <button
        onClick={toggleMusic}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        {playing ? "Pause 🎵" : "Play 🎵"}
      </button>
    </div>
  );
}