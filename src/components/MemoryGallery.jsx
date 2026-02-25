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
    <section className="relative w-full min-h-screen bg-black text-white px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Kenangan Kita
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-xl cursor-pointer"
              onClick={() => setSelected(src)}
            >
              <img
                src={src}
                alt="memory"
                className="w-full h-48 md:h-60 object-cover transition duration-500"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <motion.img
            src={selected}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-[90%] max-h-[80vh] rounded-xl"
          />
        </div>
      )}
    </section>
  );
}