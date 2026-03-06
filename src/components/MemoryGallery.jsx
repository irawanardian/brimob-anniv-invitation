import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Dummy data ucapan (Nanti bisa diganti pakai hasil fetch API dari database kamu)
const dummyWishes = [
  {
    id: 1,
    name: "Bripka Andi",
    message: "Jaya selalu Angkatan Dua Dua! Jiwa korsa tetap membara. Selamat ulang tahun pengabdian yang ke-13.",
    time: "10 Menit yang lalu",
  },
  {
    id: 2,
    name: "Komandan Satuan",
    message: "Pengabdian tiada henti untuk negeri. Sukses terus untuk seluruh letting. Brigade!",
    time: "1 Jam yang lalu",
  },
  {
    id: 3,
    name: "Brigadir Budi",
    message: "Solidaritas tanpa batas. Bangga menjadi bagian dari keluarga besar ini. Setia Berani!",
    time: "2 Jam yang lalu",
  },
  {
    id: 4,
    name: "Keluarga Besar",
    message: "Semoga selalu dalam lindungan-Nya saat bertugas di mana pun berada. Salam presisi.",
    time: "3 Jam yang lalu",
  },
];

export default function DedicationAndWishes() {
  const [wishes, setWishes] = useState([]);

  // Simulasi load data
  useEffect(() => {
    setWishes(dummyWishes);
  }, []);

  return (
    <section className="relative w-full min-h-fit bg-black text-white px-6 py-20 overflow-x-hidden">
      {/* Background glow tipis merah */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* =========================================
            SECTION 1: MAKNA PENGABDIAN
        ========================================= */}
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
            
            {/* Highlight Angka */}
            <div className="flex justify-center gap-8 mt-10">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-red-500 mb-1">13</p>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">Tahun</p>
              </div>
              <div className="w-px h-12 bg-red-900/50 my-auto"></div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-red-500 mb-1">1</p>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">Jiwa Korsa</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================
            SECTION 2: PAPAN UCAPAN (LIVE WISHES)
        ========================================= */}
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

          {/* Grid Kartu Ucapan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-red-950/20 border border-red-900/40 p-5 rounded-xl hover:border-red-500/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-red-300 text-lg">{wish.name}</h4>
                  <span className="text-xs text-gray-500">{wish.time}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{wish.message}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Efek fade out di bawah scroll (opsional biar lebih manis) */}
          <div className="w-full h-12 bg-gradient-to-t from-black to-transparent -mt-12 relative z-20 pointer-events-none"></div>

        </motion.div>
      </div>

      {/* Tambahkan style scrollbar kustom di file CSS kamu biar elegan */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.6);
        }
      `}} />
    </section>
  );
}