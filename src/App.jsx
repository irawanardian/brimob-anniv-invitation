import { useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Komponen "atas" di-load normal biar langsung muncul pas dibuka
import Cover from "./components/Cover";
import HeroSection from "./components/HeroSection";
import BackgroundMusic from "./components/BackgroundMusic";

// Komponen "bawah" di-lazy load biar iPhone gak megap-megap di awal
const AnniversaryEvent = lazy(() => import("./components/AnniversaryEvent"));
const MemoryGallery = lazy(() => import("./components/MemoryGallery"));
const RSVPSection = lazy(() => import("./components/RSVPSection"));
const ClosingSection = lazy(() => import("./components/ClosingSection"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="font-sans antialiased bg-black text-white overflow-x-hidden selection:bg-white/20">
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="cover"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ willChange: "transform, opacity" }} // Force GPU
          >
            <Cover onOpen={() => setIsOpen(true)} />
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="content"
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ willChange: "opacity" }}
          >
            {/* Hero muncul duluan */}
            <HeroSection />

            {/* Sisanya di-load pas dibutuhkan/setelah Hero siap */}
            <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-sm opacity-20">Loading...</div>}>
              <AnniversaryEvent />
              <MemoryGallery />
              <RSVPSection />
              <ClosingSection />
              <Footer />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol musik dengan optimasi animasi */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ willChange: "transform, opacity" }}
        >
          <BackgroundMusic isPlaying={isOpen} />
        </motion.div>
      )}
    </main>
  );
}

export default App;