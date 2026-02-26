import { useEffect, useState } from "react";

export default function AnniversaryEvent() {
  const eventDate = new Date("2026-08-15T09:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  // Function untuk progress ring (tetap)
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

  const anggotaBrigade = [
    { id: 1, nama: "Komandan Satuan", peran: "Koordinator Lapangan", ikon: "👨‍✈️" },
    { id: 2, nama: "Tim Rescue", peran: "Pertolongan Bencana", ikon: "🚒" },
    { id: 3, nama: "Tim Medis", peran: "Kesehatan & Evakuasi", ikon: "🏥" },
    { id: 4, nama: "Tim Logistik", peran: "Dukungan Operasional", ikon: "📦" },
  ];

  const labels = { days: "HARI", hours: "JAM", minutes: "MENIT", seconds: "DETIK" };

  return (
    <section className="relative w-full min-h-fit flex flex-col items-center justify-start py-20 bg-black text-white overflow-hidden px-4">
      {/* Background motif loreng + garis taktis (statis) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 25%),
                              radial-gradient(circle at 70% 80%, rgba(220, 38, 38, 0.15) 0%, transparent 25%),
                              radial-gradient(circle at 10% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 30%),
                              radial-gradient(circle at 90% 30%, rgba(220, 38, 38, 0.1) 0%, transparent 30%)`,
          }}
        />
        {[...Array(6)].map((_, i) => (
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4 relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-4 border-red-400/30 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
              <span className="text-4xl font-black text-white">13</span>
            </div>

            {/* sebelumnya ring muter (rotate 360). Sekarang statis */}
            <div className="absolute inset-0 w-24 h-24 border-2 border-red-500/30 rounded-full border-t-red-500" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
              ANNIVERSARY 13 TAHUN
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 text-red-400 font-semibold mb-2">
            <div className="h-px w-12 bg-red-500/50" />
            <p>SATUAN BRIGADE</p>
            <div className="h-px w-12 bg-red-500/50" />
          </div>

          <p className="text-2xl md:text-3xl font-bold text-red-300 mb-2">
            Pengabdian Angkatan Dua Dua
          </p>

          <p className="text-xl text-red-400/80 italic">
            "Tumbuh Bersama Kuat Selamanya"
          </p>
        </div>

        {/* Info acara (hapus hover transition yang berat, tapi boleh keep ringan) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 mt-24">
          {[
            { icon: "📅", label: "HARI & TANGGAL", value: "Sabtu, 15 Agustus 2026" },
            { icon: "⏰", label: "WAKTU", value: "09.00 WIB - Selesai" },
            { icon: "📍", label: "LOKASI", value: "Markas Brigade, Jakarta" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-red-950/20 backdrop-blur-sm border border-red-800/50 rounded-lg p-4 text-center"
            >
              <p className="text-2xl mb-1">{item.icon}</p>
              <p className="text-xs text-red-400 font-bold tracking-wider mb-1">{item.label}</p>
              <p className="font-semibold text-sm md:text-base">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Countdown (tanpa hover scale + tanpa motion.span animasi) */}
        <div className="bg-black/60 backdrop-blur-md border border-red-800/50 rounded-2xl p-4 md:p-8 mb-6 md:mb-10 shadow-[0_10px_40px_rgba(220,38,38,0.2)]">
          <h3 className="text-center text-red-400 font-bold tracking-wider mb-4 md:mb-6 text-xs md:text-sm">
            COUNTDOWN MENUJU H-HARI
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {["days", "hours", "minutes", "seconds"].map((unit) => {
              const radius = 58;
              const circumference = 2 * Math.PI * radius;
              const dashOffset = (1 - getProgress(unit)) * circumference;

              return (
                <div key={unit} className="relative flex flex-col items-center">
                  <div className="relative w-20 h-20 md:w-32 md:h-32">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-red-900/50"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        className="text-red-500"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl md:text-4xl font-black text-red-500">
                        {timeLeft[unit] || 0}
                      </span>
                      <span className="text-[8px] md:text-xs text-red-400/70 font-bold tracking-wider">
                        {labels[unit]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Anggota brigade (tanpa whileHover / inView animation) */}
        <div className="mb-10">
          <p className="text-center text-red-400 text-sm font-bold tracking-wider mb-4">
            ✦ YANG AKAN HADIR ✦
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {anggotaBrigade.map((anggota) => (
              <div
                key={anggota.id}
                className="bg-red-950/30 border border-red-800/50 rounded-lg px-4 py-3 text-center min-w-[130px]"
              >
                <p className="text-2xl mb-1">{anggota.ikon}</p>
                <p className="font-bold text-sm">{anggota.nama}</p>
                <p className="text-[10px] text-red-400/70">{anggota.peran}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons (tanpa hover animasi & shimmer) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold text-white overflow-hidden shadow-lg shadow-red-900/50"
          >
            <span className="relative flex items-center gap-2">
              <span>📍</span> LIHAT LOKASI MARKAS
            </span>
          </a>

          <button className="px-8 py-3 bg-transparent border-2 border-red-700 rounded-lg font-bold text-red-400">
            <span className="flex items-center gap-2">
              <span>📋</span> KONFIRMASI KEHADIRAN
            </span>
          </button>
        </div>

        {/* Motto */}
        <p className="text-center text-red-700/50 text-xs mt-8 tracking-widest">
          SIAGA • CEPAT • TANGGUH
        </p>
      </div>
    </section>
  );
}