import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3XNAuNvUYvWBL1ivrc_xrauF9CzrbaC4kNRQvm3vALh0m5_VTBxsjGv0Y3mL1XLkqHg/exec";

export default function DedicationAndWishes() {
  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    fetch(SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        const filteredWishes = data.filter(
          (item) => item.comment && item.comment.trim() !== ""
        );
        setWishes(filteredWishes.reverse());
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil ucapan:", err);
        setIsLoading(false);
      });
  }, []);

  const visibleWishes = useMemo(() => {
    return wishes.slice(0, visibleCount);
  }, [wishes, visibleCount]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Baru saja";
    return new Date(timestamp).toLocaleDateString("id-ID");
  };

  return (
    <section className="relative w-full min-h-fit bg-black text-white px-6 py-20 overflow-x-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[260px] md:w-[420px] h-[220px] md:h-[280px] bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* SECTION 1 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
            13 TAHUN PENGABDIAN
          </h2>

          <div className="h-px w-32 bg-red-600/50 mx-auto mb-8" />

          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-b from-red-950/40 to-black border border-red-900/30 shadow-[0_0_18px_rgba(220,38,38,0.08)] relative">
            <span className="text-5xl text-red-500/30 font-serif absolute top-2 left-3">
              "
            </span>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic relative z-10">
              Bukan sekadar hitungan waktu, melainkan jejak langkah, keringat, dan
              kesetiaan pada janji suci korsa. Tiga belas tahun berdiri tegak, merajut
              persaudaraan tanpa batas, mengabdi tanpa henti untuk ibu pertiwi. Angkatan
              Dua Dua, satu jiwa, satu rasa.
            </p>

            <span className="text-5xl text-red-500/30 font-serif absolute bottom-2 right-3 rotate-180">
              "
            </span>
          </div>
        </motion.div>

        {/* SECTION 2 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
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
            <div className="text-center py-10 text-red-500">
              Memuat ucapan...
            </div>
          ) : visibleWishes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {visibleWishes.map((wish, index) => (
                  <div
                    key={wish.id || `${wish.name}-${wish.timestamp || index}`}
                    className="bg-red-950/20 border border-red-900/40 p-5 rounded-xl md:hover:border-red-500/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3 gap-3">
                      <h4 className="font-bold text-red-300 text-lg break-words">
                        {wish.name}
                      </h4>
                      <span className="text-[10px] text-gray-500 italic shrink-0">
                        {formatDate(wish.timestamp)}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed break-words">
                      "{wish.comment}"
                    </p>
                  </div>
                ))}
              </div>

              {wishes.length > visibleCount && (
                <button
                  onClick={() => setVisibleCount((prev) => prev + (isMobile ? 4 : 6))}
                  className="mt-4 w-full py-2 rounded-lg border border-red-800/50 bg-red-950/20 text-red-400"
                >
                  Lihat lebih banyak
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-10 text-gray-500 border border-dashed border-red-800/30 rounded-xl">
              Belum ada ucapan.
            </div>
          )}

          <div className="w-full h-12 bg-gradient-to-t from-black to-transparent -mt-12 relative z-20 pointer-events-none" />
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(220, 38, 38, 0.3); border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(220, 38, 38, 0.6); }
          `,
        }}
      />
    </section>
  );
}