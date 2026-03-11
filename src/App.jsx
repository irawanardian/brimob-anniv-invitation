import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Cover from "./components/Cover";
import HeroSection from "./components/HeroSection";
import BackgroundMusic from "./components/BackgroundMusic";
import InvitationLinkGenerator from "./components/InvitationLinkGenerator";

const AnniversaryEvent = lazy(() => import("./components/AnniversaryEvent"));
const MemoryGallery = lazy(() => import("./components/MemoryGallery"));
const RSVPSection = lazy(() => import("./components/RSVPSection"));
const ClosingSection = lazy(() => import("./components/ClosingSection"));
const Footer = lazy(() => import("./components/Footer"));

function App() {

  // detect halaman
  const isGeneratorPage = window.location.pathname === "/generator";

  const [isOpen, setIsOpen] = useState(false);
  const [showAnniversary, setShowAnniversary] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [showRSVP, setShowRSVP] = useState(false);
  const [showClosing, setShowClosing] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const [guestName, setGuestName] = useState("Tamu Kehormatan");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawGuest = params.get("to");

    setGuestName(rawGuest && rawGuest.trim() ? rawGuest.trim() : "Tamu Kehormatan");
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const t1 = setTimeout(() => setShowAnniversary(true), 250);
    const t2 = setTimeout(() => setShowMemory(true), 500);
    const t3 = setTimeout(() => setShowRSVP(true), 800);
    const t4 = setTimeout(() => setShowClosing(true), 1100);
    const t5 = setTimeout(() => setShowFooter(true), 1300);
    const t6 = setTimeout(() => setShowMusic(true), 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [isOpen]);

  // kalau halaman generator
  if (isGeneratorPage) {
    return <InvitationLinkGenerator />;
  }

  return (
    <main className="font-sans antialiased bg-black text-white overflow-x-hidden selection:bg-white/20">

      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="cover"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Cover onOpen={() => setIsOpen(true)} guestName={guestName} />
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="content"
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <HeroSection />

            <Suspense
              fallback={
                <div className="h-24 bg-black flex items-center justify-center text-sm opacity-20">
                  Loading...
                </div>
              }
            >
              {showAnniversary && <AnniversaryEvent />}
              {showMemory && <MemoryGallery />}
              {showRSVP && <RSVPSection />}
              {showClosing && <ClosingSection />}
              {showFooter && <Footer />}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && showMusic && <BackgroundMusic isPlaying={isOpen} />}
    </main>
  );
}

export default App;