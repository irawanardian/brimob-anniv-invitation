// src/components/ClosingSection.jsx
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function ClosingSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
  once: false, 
  amount: 0.2, // sedikit dikurangi agar lebih sensitif
  margin: "0px 0px -100px 0px" // memberikan offset manual untuk perhitungan scroll
});
  const [showSalute, setShowSalute] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  const mottoPhrases = [
    "Tumbuh Bersama",
    "Kuat Bersama"
  ];

  // Efek typing untuk motto
  useEffect(() => {
    if (isInView) {
      let i = 0;
      const text = mottoPhrases[currentPhrase];
      setTypedText("");
      
      const typing = setInterval(() => {
        if (i < text.length) {
          setTypedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
          setTimeout(() => {
            setCurrentPhrase((prev) => (prev + 1) % mottoPhrases.length);
          }, 2000);
        }
      }, 100);

      return () => clearInterval(typing);
    }
  }, [isInView, currentPhrase]);

  // Data untuk penghormatan
  const penghormatan = [
    { ikon: "👨‍✈️", nama: "Komandan Satuan", pesan: "Terima kasih atas dedikasi" },
    { ikon: "🚒", nama: "Tim Rescue", pesan: "Siaga 24 jam" },
    { ikon: "🏥", nama: "Tim Medis", pesan: "Cepat tanggap" },
    { ikon: "📦", nama: "Tim Logistik", pesan: "Dukungan terbaik" },
  ];

  return (
<section 
  ref={sectionRef}
  className="relative w-full min-h-fit flex flex-col items-center justify-start bg-black text-white px-4 py-20"
>
      
      {/* ===== Background Militer ===== */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/30 via-black to-black"></div>
        
        {/* Pattern garis taktis */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(220,38,38,0.2) 0px, rgba(220,38,38,0.2) 2px, transparent 2px, transparent 20px)
          `,
        }}></div>

        {/* Efek lampu sorot */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[128px]"
        />
        
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[128px]"
        />
      </div>

      {/* ===== Particles Effect (Confetti versi Brigade) ===== */}
      <div className="absolute inset-0 z-10 pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: "100vh", opacity: [0, 0.3, 0] }} // Gunakan vh agar relatif terhadap layar
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-1 h-4 bg-red-600/30 rounded-sm"
        style={{ left: `${Math.random() * 100}%` }}
      />
    ))}
  </div>

      {/* ===== Main Content ===== */}
      <div className="relative z-20 max-w-4xl w-full flex flex-col items-center">
        
        {/* Header dengan efek fade in */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Badge Penghormatan */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block mb-6 relative"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-4 border-red-400/30">
              <span className="text-3xl">🎖️</span>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-20 h-20 border-2 border-red-500/50 rounded-full border-t-red-500"
            />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
              PENGHORMATAN AKHIR
            </span>
          </motion.h2>
          
          <div className="flex items-center justify-center gap-4 text-red-400">
            <div className="h-px w-16 bg-red-500/50"></div>
            <p className="text-sm font-semibold tracking-wider">SATUAN BRIGADE</p>
            <div className="h-px w-16 bg-red-500/50"></div>
          </div>
        </motion.div>

        {/* Ucapan Terima Kasih dengan efek glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative mb-10"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 blur-3xl"></div>
          
          <div className="relative bg-black/60 backdrop-blur-sm border border-red-800/50 rounded-2xl p-8 text-center">
            <motion.p 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl md:text-3xl font-bold text-red-400 mb-4"
            >
              TERIMA KASIH
            </motion.p>
            
            <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed">
              Kami mengucapkan terima kasih atas kehadiran dan doa yang diberikan.
            </p>
            
            <p className="text-md text-gray-400">
              Semoga kebersamaan ini terus menguatkan semangat kita sebagai 
              <span className="text-red-400 font-semibold"> Angkatan Dua Dua</span>
            </p>

            {/* Motto dengan typing effect */}
            <motion.div 
              className="mt-6 pt-6 border-t border-red-800/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <p className="text-sm text-gray-500 mb-2">MOTTO KITA</p>
              <p className="text-2xl md:text-3xl font-bold text-red-400 h-12">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-1 h-8 bg-red-500 ml-1"
                />
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Grid Penghormatan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {penghormatan.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              onHoverStart={() => setShowSalute(true)}
              onHoverEnd={() => setShowSalute(false)}
              className="bg-gradient-to-b from-red-950/30 to-black/50 backdrop-blur-sm border border-red-800/50 rounded-xl p-4 text-center group cursor-pointer"
            >
              <motion.div
                animate={showSalute ? { rotate: [0, -10, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="text-3xl mb-2"
              >
                {item.ikon}
              </motion.div>
              <p className="font-bold text-sm text-red-400">{item.nama}</p>
              <p className="text-xs text-gray-500 mt-1">{item.pesan}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Penghormatan Terakhir (Baris Hormat) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setShowSalute(!showSalute);
              // Trigger confetti tambahan
              for(let i = 0; i < 10; i++) {
                setTimeout(() => {
                  setShowSalute(true);
                }, i * 100);
              }
            }}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold text-white inline-flex items-center gap-3 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative flex items-center gap-2">
              <span>🫡</span>
              HORMAT KEPADA ANGKATAN
            </span>
          </motion.button>
        </motion.div>

        {/* Closing Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <p className="italic text-gray-400 text-sm mb-4">
            "Pengabdian tidak pernah berakhir, hanya berganti bentuk"
          </p>
          
          <div className="flex items-center justify-center gap-3 text-red-700">
            <div className="h-px w-12 bg-red-800"></div>
            <p className="text-xs tracking-widest">ANGKATAN DUA DUA</p>
            <div className="h-px w-12 bg-red-800"></div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#top"
            className="group relative px-8 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-semibold overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative flex items-center gap-2">
              <span>⬆️</span>
              KEMBALI KE ATAS
            </span>
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#rsvp"
            className="px-8 py-3 bg-transparent border-2 border-red-700 hover:bg-red-950/50 rounded-lg font-semibold text-red-400 transition-all"
          >
            <span className="flex items-center gap-2">
              <span>📋</span>
              LIHAT KONFIRMASI
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* Efek tambahan saat hover tombol hormat */}
      <AnimatePresence>
        {showSalute && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-[200px] opacity-20"
            >
              🫡
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}