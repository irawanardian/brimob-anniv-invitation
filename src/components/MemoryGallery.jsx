import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Gunakan URL yang sama dengan yang ada di RSVPSection.jsx
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3XNAuNvUYvWBL1ivrc_xrauF9CzrbaC4kNRQvm3vALh0m5_VTBxsjGv0Y3mL1XLkqHg/exec";

export default function DedicationAndWishes() {
  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ambil data dari Google Sheets
    fetch(SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        // Filter hanya yang memberikan ucapan/komentar
        const filteredWishes = data.filter(item => item.comment && item.comment.trim() !== "");
        // Balik urutan agar yang terbaru muncul di atas
        setWishes(filteredWishes.reverse());
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil ucapan:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="relative w-full min-h-fit bg-black text-white px-6 py-20 overflow-x-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* SECTION 1: MAKNA PENGABDIAN (Tetap sama) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
            13 TAHUN PENGABDIAN
          </h2>
          <div className="h-px w-32 bg-red-600/50 mx-auto mb-8"></div>
          
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-b from-red-950/40 to-black border border-red-900/30 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
            <span className="text-5xl text-red-500/30 font-serif absolute -mt-4 -ml-4">"</span>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic relative z-10">
              Bukan sekadar hitungan waktu, melainkan jejak langkah, keringat, dan kesetiaan pada janji suci korsa. Tiga belas tahun berdiri tegak, merajut persaudaraan tanpa batas, mengabdi tanpa henti untuk ibu pertiwi. Angkatan Dua Dua, satu jiwa, satu rasa.
            </p>
            <span className="text-5xl text-red-500/30 font-serif absolute mt-2 ml-2 rotate-180">"</span>
          </div>
        </motion.div>

        {/* SECTION 2: PAPAN UCAPAN */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black mb-2 tracking-wide text-white">
              PAPAN UCAPAN
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Tinggalkan doa dan harapan terbaik untuk momen istimewa ini.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-red-500 animate-pulse">
              Memuat ucapan...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {wishes.map((wish, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 4) * 0.1 }}
                  className="bg-red-950/20 border border-red-900/40 p-5 rounded-xl hover:border-red-500/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-red-300 text-lg">{wish.name}</h4>
                    <span className="text-[10px] text-gray-500 italic">
                      {wish.timestamp ? new Date(wish.timestamp).toLocaleDateString('id-ID') : 'Baru saja'}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "{wish.comment}"
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          <div className="w-full h-12 bg-gradient-to-t from-black to-transparent -mt-12 relative z-20 pointer-events-none"></div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(220, 38, 38, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(220, 38, 38, 0.6); }
      `}} />
    </section>
  );
}