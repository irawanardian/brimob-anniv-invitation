import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnniversaryEvent() {
  const eventDate = new Date("2026-08-15T09:00:00");
  const [timeLeft, setTimeLeft] = useState({});
  const [activeUnit, setActiveUnit] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function untuk progress ring
  const getProgress = (unit) => {
    switch (unit) {
      case "days":
        return 1 - (timeLeft.days || 0) / 365;
      case "hours":
        return 1 - (timeLeft.hours || 0) / 24;
      case "minutes":
        return 1 - (timeLeft.minutes || 0) / 60;
      case "seconds":
        return 1 - (timeLeft.seconds || 0) / 60;
      default:
        return 0;
    }
  };

  // Data anggota brigade
  const anggotaBrigade = [
    { id: 1, nama: "Komandan Satuan", peran: "Koordinator Lapangan", ikon: "👨‍✈️" },
    { id: 2, nama: "Tim Rescue", peran: "Pertolongan Bencana", ikon: "🚒" },
    { id: 3, nama: "Tim Medis", peran: "Kesehatan & Evakuasi", ikon: "🏥" },
    { id: 4, nama: "Tim Logistik", peran: "Dukungan Operasional", ikon: "📦" },
  ];

  return (
    <section className="relative w-full min-h-fit flex flex-col items-center justify-start py-20 bg-black text-white overflow-hidden px-4">

      {/* ===== Floating shapes background dengan motif loreng ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {/* Pattern loreng brigade */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 25%),
                            radial-gradient(circle at 70% 80%, rgba(220, 38, 38, 0.15) 0%, transparent 25%),
                            radial-gradient(circle at 10% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 30%),
                            radial-gradient(circle at 90% 30%, rgba(220, 38, 38, 0.1) 0%, transparent 30%)`
        }}></div>
        
        {/* Garis-garis taktis */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-red-500/20"
            style={{
              top: `${10 + i * 15}%`,
              left: '0',
              right: '0',
              transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`,
            }}
          />
        ))}
      </div>

      {/* Background gradient dengan aksen merah lebih kuat */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black"></div>
      
      {/* Efek sorotan lampu merah */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[100px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl w-full"
      >

        {/* Header dengan emblem */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          {/* Logo/Emblem Brigade */}
          <div className="inline-block mb-4 relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-4 border-red-400/30 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
              <span className="text-4xl font-black text-white">13</span>
            </div>
            {/* Lingkaran berputar */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-24 h-24 border-2 border-red-500/30 rounded-full border-t-red-500"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
              ANNIVERSARY 13 TAHUN
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-red-400 font-semibold mb-2">
            <div className="h-px w-12 bg-red-500/50"></div>
            <p>SATUAN BRIGADE</p>
            <div className="h-px w-12 bg-red-500/50"></div>
          </div>

          <p className="text-2xl md:text-3xl font-bold text-red-300 mb-2">
            Pengabdian Angkatan Dua Dua
          </p>
          
          <p className="text-xl text-red-400/80 italic">
            "Tumbuh Bersama Kuat Selamanya"
          </p>
        </motion.div>

        {/* Info Acara dengan style militer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 mt-24"
        >
          {[
            { icon: "📅", label: "HARI & TANGGAL", value: "Sabtu, 15 Agustus 2026" },
            { icon: "⏰", label: "WAKTU", value: "09.00 WIB - Selesai" },
            { icon: "📍", label: "LOKASI", value: "Markas Brigade, Jakarta" },
          ].map((item, idx) => (
            <div key={idx} className="bg-red-950/20 backdrop-blur-sm border border-red-800/50 rounded-lg p-4 text-center hover:border-red-600 transition-all">
              <p className="text-2xl mb-1">{item.icon}</p>
              <p className="text-xs text-red-400 font-bold tracking-wider mb-1">{item.label}</p>
              <p className="font-semibold text-sm md:text-base">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Countdown dengan progress ring (tetap warna merah) */}
        <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
  // Perubahan: Padding diperkecil di mobile (p-4) dan margin bottom disesuaikan (mb-6)
  className="bg-black/60 backdrop-blur-md border border-red-800/50 rounded-2xl p-4 md:p-8 mb-6 md:mb-10 shadow-[0_10px_40px_rgba(220,38,38,0.2)]"
>
  {/* Perubahan: Ukuran font judul diperkecil di mobile */}
  <h3 className="text-center text-red-400 font-bold tracking-wider mb-4 md:mb-6 text-xs md:text-sm">
    COUNTDOWN MENUJU H-HARI
  </h3>
  
  {/* Perubahan: Gap diperkecil di mobile (gap-3) */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
    {["days", "hours", "minutes", "seconds"].map((unit, idx) => {
      const labels = ["HARI", "JAM", "MENIT", "DETIK"];
      return (
        <motion.div
          key={unit}
          onHoverStart={() => setActiveUnit(unit)}
          onHoverEnd={() => setActiveUnit(null)}
          whileHover={{ scale: 1.05 }}
          className="relative flex flex-col items-center"
        >
          {/* PERUBAHAN UTAMA: Ukuran Ring (w-20 di mobile, w-32 di desktop) */}
          <div className="relative w-20 h-20 md:w-32 md:h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="6" // Sedikit lebih tebal biar jelas di ukuran kecil
                fill="transparent"
                className="text-red-900/50"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 58}
                strokeDashoffset={(1 - getProgress(unit)) * 2 * Math.PI * 58}
                className={`text-red-500 transition-all duration-500 ${activeUnit === unit ? 'filter drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]' : ''}`}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Angka di tengah: Ukuran font disesuaikan (text-xl di mobile) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={timeLeft[unit]}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-xl md:text-4xl font-black text-red-500"
              >
                {timeLeft[unit] || 0}
              </motion.span>
              <span className="text-[8px] md:text-xs text-red-400/70 font-bold tracking-wider">
                {labels[idx]}
              </span>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
</motion.div>

        {/* Anggota Brigade (Preview) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <p className="text-center text-red-400 text-sm font-bold tracking-wider mb-4">
            ✦ YANG AKAN HADIR ✦
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {anggotaBrigade.map((anggota, idx) => (
              <motion.div
                key={anggota.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (idx * 0.1) }}
                whileHover={{ y: -5 }}
                className="bg-red-950/30 border border-red-800/50 rounded-lg px-4 py-3 text-center min-w-[130px] hover:border-red-600 transition-all"
              >
                <p className="text-2xl mb-1">{anggota.ikon}</p>
                <p className="font-bold text-sm">{anggota.nama}</p>
                <p className="text-[10px] text-red-400/70">{anggota.peran}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold text-white overflow-hidden shadow-lg shadow-red-900/50"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative flex items-center gap-2">
              <span>📍</span> LIHAT LOKASI MARKAS
            </span>
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-transparent border-2 border-red-700 hover:bg-red-950/50 rounded-lg font-bold text-red-400 transition-all"
          >
            <span className="flex items-center gap-2">
              <span>📋</span> KONFIRMASI KEHADIRAN
            </span>
          </motion.button>
        </motion.div>

        {/* Motto di footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-red-700/50 text-xs mt-8 tracking-widest"
        >
          SIAGA • CEPAT • TANGGUH
        </motion.p>

      </motion.div>
    </section>
  );
}