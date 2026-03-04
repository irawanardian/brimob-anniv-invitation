import { motion } from "framer-motion";
import { useState } from "react";

const images = [
  "https://polrestanatoraja.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-10-at-15.06.14.jpeg",
  "https://sinpo.id/storage/2023/03/korps-brimob-polri-resmikan-struktur-organisasi-baru-10032023-143239.jpg",
  "https://img.okezone.com/content/2022/10/18/624/2689454/sejarah-brimob-polri-korps-yang-sukses-bungkam-aksi-terorisme-di-poso-D2RYk2p4F8.jpg",
  "https://asset.kompas.com/crops/akWJPHgNxzYMYRUYmHh3UYvB2yM=/0x0:946x631/1200x800/data/photo/2019/06/26/1421615252.jpg",
  "https://pict.sindonews.net/dyn/480/pena/news/2020/11/14/14/231784/hut-ke75-korps-brimob-polri-pasukan-elit-dan-kesetiaan-kepada-nkri-olz.jpg",
  "https://cdn.antaranews.com/cache/1200x800/2022/06/10/20220610_162218.jpg",
];

export default function MemoryGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative w-full min-h-fit bg-black text-white px-6 py-20 overflow-x-hidden">
      
      {/* Background glow tipis supaya tidak terlalu flat */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
            KENANGAN KITA
          </h2>
          <div className="h-px w-24 bg-red-600/50 mx-auto mt-4 mb-2"></div>
          <p className="text-gray-400 text-sm md:text-base italic">
            "Jejak langkah pengabdian yang tak terlupakan"
          </p>
        </div>

        {/* Grid Galeri */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className="overflow-hidden rounded-xl cursor-pointer border border-red-900/30 hover:border-red-500/50 transition-colors"
              onClick={() => setSelected(src)}
            >
              <img
                src={src}
                alt="memory"
                className="w-full h-48 md:h-60 object-cover transition-transform duration-700 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        {/* ===== TOMBOL GOOGLE DRIVE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 bg-red-950/20 border border-red-900/50 rounded-2xl p-6 md:p-8 text-center max-w-2xl mx-auto"
        >
          <div className="mb-4">
            <span className="text-4xl inline-block mb-2">📸</span>
            <h3 className="text-xl md:text-2xl font-bold text-red-300 mb-2">DOKUMENTASI LENGKAP</h3>
            <p className="text-gray-400 text-sm md:text-base">
              Akses atau unggah foto/video kenangan selama acara berlangsung melalui tautan Google Drive di bawah ini.
            </p>
          </div>
          
          <a
            // Ganti link di bawah ini dengan link Google Drive kamu yang asli
            href="https://drive.google.com/drive/folders/CONTOH_LINK_KAMU?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
          >
            {/* Efek kilauan pada tombol */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            
            <span className="text-xl group-hover:scale-110 transition-transform">📁</span>
            <span className="tracking-widest">BUKA GOOGLE DRIVE</span>
          </a>
        </motion.div>

      </motion.div>

      {/* Lightbox / Popup Gambar (Tetap sama) */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <motion.img
            src={selected}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-full max-h-[85vh] rounded-xl border border-red-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()} // Supaya klik gambar ga nutup modal
          />
          
          {/* Tombol tutup (opsional untuk kejelasan) */}
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl transition-colors"
            onClick={() => setSelected(null)}
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
}