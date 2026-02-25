import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Cover from "./components/Cover";
import HeroSection from "./components/HeroSection";
import AnniversaryEvent from "./components/AnniversaryEvent";
import MemoryGallery from "./components/MemoryGallery";
import RSVPSection from "./components/RSVPSection";
import Footer from "./components/Footer";
import ClosingSection from "./components/ClosingSection";
import BackgroundMusic from "./components/BackgroundMusic";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="font-sans antialiased bg-black text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="cover"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Cover onOpen={() => setIsOpen(true)} />
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <HeroSection />
            <AnniversaryEvent />
            <MemoryGallery />
            <RSVPSection />
            <ClosingSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      <BackgroundMusic isPlaying={isOpen} />
    </main>
  );
}

export default App;