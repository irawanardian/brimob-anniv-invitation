import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function AnniversaryEvent() {
  const eventDate = new Date("2026-04-18T09:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const updateFlags = () => {
      const mobile = window.innerWidth < 768;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      setIsMobile(mobile);
      setPrefersReducedMotion(reduced);
    };

    updateFlags();
    window.addEventListener("resize", updateFlags);

    return () => window.removeEventListener("resize", updateFlags);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const liteMode = isMobile || prefersReducedMotion;

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

  const infoItems = useMemo(
    () => [
      {
        icon: "📅",
        label: "HARI & TANGGAL",
        value: "Sabtu, 18 April 2026",
      },
      {
        icon: "⏰",
        label: "WAKTU",
        value: "09.00 WIB - Selesai",
      },
      {
        icon: "📍",
        label: "LOKASI",
        value: "Aula Soemarto, Mako Brimob Kelapa Dua Depok",
        link: "https://maps.app.goo.gl/ewrfN23cv7LNz6vP9?g_st=aw",
      },
    ],
    []
  );

  const rundownItems = useMemo(
    () => [
      "Pembukaan",
      "Menyanyikan Lagu Indonesia Raya",
      "Pemutaran Video & Foto (Penugasan & Prestasi)",
      "Sambutan Ketua Panitia",
      "Sambutan Ketua Umum ADD",
      "Sambutan Danyon Pembina",
      "Pemotongan Tumpeng",
      "Pemberian Santunan",
      "Doa",
      "Ramah Tamah / Hiburan",
      "Penutup",
    ],
    []
  );

  const countdownUnits = useMemo(
    () => [
      { key: "days", label: "HARI" },
      { key: "hours", label: "JAM" },
      { key: "minutes", label: "MENIT" },
      { key: "seconds", label: "DETIK" },
    ],
    []
  );

  return (
    <section className="relative w-full min-h-fit flex flex-col items-center justify-start py-20 bg-black text-white overflow-hidden px-4">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 50%, rgba(220, 38, 38, 0.12) 0%, transparent 25%),
              radial-gradient(circle at 70% 80%, rgba(220, 38, 38, 0.12) 0%, transparent 25%),
              radial-gradient(circle at 10% 20%, rgba(220, 38, 38, 0.08) 0%, transparent 30%),
              radial-gradient(circle at 90% 30%, rgba(220, 38, 38, 0.08) 0%, transparent 30%)
            `,
          }}
        />

        {[...Array(isMobile ? 4 : 6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-red-500/20"
            style={{
              top: `${10 + i * 15}%`,
              left: 0,
              right: 0,
              transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />

      {liteMode ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-red-600/6 rounded-full blur-3xl" />
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-red-600/6 rounded-full blur-[72px]" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full"
      >
        {/* HEADER */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="text-center mb-8"
        >
          <div className="inline-block mb-4 relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-4 border-red-400/30 shadow-[0_0_18px_rgba(220,38,38,0.28)]">
              <span className="text-4xl font-black text-white">13</span>
            </div>

            {!liteMode && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-24 h-24 border border-red-500/30 rounded-full border-t-red-500"
              />
            )}
          </div>

          <h1 className="text-3xl md:text-6xl font-black tracking-tighter mb-2">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
              ANNIVERSARY 13 TAHUN
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 text-red-400 font-semibold mb-2">
            <div className="h-px w-12 bg-red-500/50" />
            <p>SATUAN BRIGADDE</p>
            <div className="h-px w-12 bg-red-500/50" />
          </div>

          <p className="text-2xl md:text-3xl font-bold text-red-300 mb-2">
            Pengabdian Angkatan Dua Dua
          </p>

          <p className="text-xl text-red-400/80 italic">
            "Tumbuh Bersama Kuat Selamanya"
          </p>
        </motion.div>

        {/* INFO ACARA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 mt-24"
        >
          {infoItems.map((item, idx) => {
            const content = (
              <>
                <p className={`text-2xl mb-1 ${!isMobile ? "transition-transform group-hover:scale-110 group-hover:-translate-y-1" : ""}`}>
                  {item.icon}
                </p>
                <p className="text-xs text-red-400 font-bold tracking-wider mb-1">{item.label}</p>
                <p className="font-semibold text-sm md:text-base mb-2">{item.value}</p>

                {item.link && (
                  <div className="mt-auto pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/60 border border-red-700/50 rounded-full text-[10px] md:text-xs text-red-200 md:group-hover:bg-red-600 md:group-hover:text-white md:group-hover:border-red-500 transition-all">
                      <span>🗺️</span> Klik untuk buka Maps
                    </span>
                  </div>
                )}
              </>
            );

            const baseClass =
              "group bg-red-950/20 border border-red-800/40 rounded-lg p-4 text-center transition-all flex flex-col items-center justify-center relative overflow-hidden";

            if (item.link) {
              return (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseClass} md:hover:bg-red-900/35 md:hover:border-red-500 cursor-pointer`}
                >
                  {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                  {content}
                </a>
              );
            }

            return (
              <div key={idx} className={`${baseClass} md:hover:border-red-600`}>
                {content}
              </div>
            );
          })}
        </motion.div>

        {/* COUNTDOWN */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="bg-black/60 border border-red-800/45 rounded-2xl p-4 md:p-8 mb-6 md:mb-10 shadow-[0_10px_28px_rgba(220,38,38,0.12)]"
        >
          <h3 className="text-center text-red-400 font-bold tracking-wider mb-4 md:mb-6 text-xs md:text-sm">
            COUNTDOWN MENUJU H-HARI
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {countdownUnits.map((unit) => (
              <div
                key={unit.key}
                className="relative flex flex-col items-center md:hover:scale-[1.03] transition-transform"
              >
                <div className="relative w-20 h-20 md:w-32 md:h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="6"
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
                      strokeDashoffset={(1 - getProgress(unit.key)) * 2 * Math.PI * 58}
                      className="text-red-500 transition-all duration-500 md:hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      key={timeLeft[unit.key]}
                      initial={{ scale: 1.18, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="text-xl md:text-4xl font-black text-red-500"
                    >
                      {timeLeft[unit.key] || 0}
                    </motion.span>
                    <span className="text-[8px] md:text-xs text-red-400/70 font-bold tracking-wider">
                      {unit.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* DETAIL INFORMASI */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="bg-black/40 border border-red-800/30 rounded-2xl p-6 md:p-8 mb-6"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-2">DETAIL INFORMASI</h3>
            <div className="h-px w-24 bg-red-600/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6">
              <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">👔</span>
                  <h4 className="font-bold text-red-300 tracking-wider">DRESSCODE</h4>
                </div>
                <p className="text-gray-300 pl-9 font-semibold">Putih & Biru</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📋</span>
                <h4 className="font-bold text-red-300 tracking-wider">SUSUNAN ACARA</h4>
              </div>

              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-red-500/50 before:to-transparent">
                {rundownItems.map((acara, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                  >
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-red-500 bg-black absolute left-0 md:left-1/2 -translate-x-1/2 shadow-[0_0_8px_rgba(220,38,38,0.28)]">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full md:group-hover:bg-white transition-colors" />
                    </div>

                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] pl-4 md:pl-0 text-left md:odd:text-right md:group-hover:-translate-y-0.5 transition-transform">
                      <p className="text-sm md:text-base font-medium text-gray-300 md:group-hover:text-white md:group-hover:font-semibold transition-colors">
                        {acara}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* PERHATIAN KHUSUS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="relative bg-black/50 border-y-2 border-red-800/50 py-6 px-4 md:px-8 mb-10 overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 10px, #dc2626 10px, #dc2626 20px)",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="text-red-500 text-xl">⚠️</span>
              <h4 className="font-bold text-red-400 tracking-[0.2em] text-sm md:text-base">
                PERHATIAN KHUSUS
              </h4>
              <span className="text-red-500 text-xl">⚠️</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
              <div className="bg-red-950/30 border border-red-900/30 p-4 rounded-lg md:hover:border-red-500/50 transition-colors">
                <div className="text-2xl mb-2 text-center">⏱️</div>
                <p className="text-xs md:text-sm text-gray-300 text-center">
                  Hadir <strong className="text-white">30 menit</strong> sebelum acara dimulai untuk registrasi & pengkondisian.
                </p>
              </div>

              <div className="bg-red-950/30 border border-red-900/30 p-4 rounded-lg md:hover:border-red-500/50 transition-colors">
                <div className="text-2xl mb-2 text-center">🪖</div>
                <p className="text-xs md:text-sm text-gray-300 text-center">
                  Wajib mengikuti seluruh rangkaian acara dengan <strong className="text-white">tertib dan disiplin</strong>.
                </p>
              </div>

              <div className="bg-red-950/30 border border-red-900/30 p-4 rounded-lg md:hover:border-red-500/50 transition-colors">
                <div className="text-2xl mb-2 text-center">🛡️</div>
                <p className="text-xs md:text-sm text-gray-300 text-center">
                  Menjaga kebersihan dan mematuhi peraturan di area <strong className="text-white">Mako Brimob</strong>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-red-700/50 text-xs mt-8 tracking-widest"
        >
          SIAGA • CEPAT • TANGGUH
        </motion.p>
      </motion.div>
    </section>
  );
}