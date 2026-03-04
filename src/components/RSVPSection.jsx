import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Deklarasikan URL di luar komponen supaya bisa diakses oleh semua fungsi
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3XNAuNvUYvWBL1ivrc_xrauF9CzrbaC4kNRQvm3vALh0m5_VTBxsjGv0Y3mL1XLkqHg/exec";

export default function RSVPSection() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const [comment, setComment] = useState("");
  const [guests, setGuests] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [filter, setFilter] = useState("Semua");
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [formStep, setFormStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state loading
  
  const formRef = useRef(null);
  const inputRef = useRef(null);

  // Tarik data dari Google Sheets saat pertama buka web
  useEffect(() => {
    fetch(SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        setGuests(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Gagal tarik data:", err);
        setIsLoading(false);
      });
  }, []);

  // Hitung statistik
  const totalHadir = guests.filter(g => g.attendance === "Hadir").length;
  const totalTidakHadir = guests.filter(g => g.attendance === "Tidak Hadir").length;
  const totalKomentar = guests.filter(g => g.comment).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // 1. Tampilkan langsung di layar biar kerasa responsif (Optimistic UI)
    const newGuest = { 
      name, 
      attendance, 
      comment,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    setGuests([newGuest, ...guests]);

    // 2. Siapkan data untuk dikirim ke Google Sheets
    const formData = new FormData();
    formData.append("nama", name);
    formData.append("kehadiran", attendance);
    formData.append("komentar", comment);

    // 3. Reset form dan munculkan notif sukses ke user
    setName("");
    setAttendance("Hadir");
    setComment("");
    setFormStep(1);
    setSubmitted(true);

    // Animasi sukses hilang setelah 3 detik
    setTimeout(() => setSubmitted(false), 3000);
    
    // Scroll ke daftar terbaru
    setTimeout(() => {
      document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

    // 4. Proses kirim ke Google Sheets di background
    try {
      await fetch(SCRIPT_URL, { method: "POST", body: formData });
      // Setelah sukses kirim, tarik data terbaru lagi biar sinkron
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      setGuests(data);
    } catch (error) {
      console.error("Gagal kirim ke Sheets:", error);
    }
  };

  // Filter guests
  const filteredGuests = guests.filter(guest => {
    if (filter === "Hadir") return guest.attendance === "Hadir";
    if (filter === "Tidak Hadir") return guest.attendance === "Tidak Hadir";
    return true;
  });

  // Format waktu
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <section className="relative w-full min-h-fit bg-black text-white px-4 py-10 md:py-20">
      
      {/* Background pattern militer */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(220,38,38,0.1) 0px, rgba(220,38,38,0.1) 2px, transparent 2px, transparent 10px)
          `,
        }}></div>
        
        {/* Grid garis */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(220,38,38,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220,38,38,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Glow effect di pojok */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[128px]"></div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Header dengan statistik */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              KONFIRMASI KEHADIRAN
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 text-red-400 text-sm">
            <div className="h-px w-12 bg-red-500/50"></div>
            <p>SATUAN BRIGADDE</p>
            <div className="h-px w-12 bg-red-500/50"></div>
          </div>

          {/* Statistik Cards */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-red-950/30 backdrop-blur-sm border border-red-800/50 rounded-lg p-3"
            >
              <p className="text-2xl font-black text-red-500">{guests.length}</p>
              <p className="text-xs text-gray-400">Total Konfirmasi</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-red-950/30 backdrop-blur-sm border border-red-800/50 rounded-lg p-3"
            >
              <p className="text-2xl font-black text-green-500">{totalHadir}</p>
              <p className="text-xs text-gray-400">Hadir</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-red-950/30 backdrop-blur-sm border border-red-800/50 rounded-lg p-3"
            >
              <p className="text-2xl font-black text-yellow-500">{totalKomentar}</p>
              <p className="text-xs text-gray-400">Komentar</p>
            </motion.div>
          </div>
        </motion.div>

        {/* ===== ALERT BATAS WAKTU ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start md:items-center gap-4 backdrop-blur-sm"
        >
          <div className="text-2xl md:text-3xl animate-pulse">⏳</div>
          <div>
            <h4 className="font-bold text-red-400 text-sm md:text-base tracking-wider">BATAS AKHIR KONFIRMASI</h4>
            <p className="text-gray-300 text-xs md:text-sm mt-1 leading-relaxed">
              Mohon kesediaannya untuk mengisi formulir ini maksimal pada <strong className="text-white">Senin, 13 April 2026</strong> untuk keperluan pendataan logistik dan kapasitas kursi.
            </p>
          </div>
        </motion.div>

        {/* FORM dengan multiple steps */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-red-950/20 to-black border border-red-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-[0_10px_40px_rgba(220,38,38,0.2)]">
            
            {/* Form Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-red-400 tracking-wider">
                FORMULIR KONFIRMASI
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="text-red-400 hover:text-red-300"
              >
                {isFormVisible ? "▲" : "▼"}
              </motion.button>
            </div>

            <AnimatePresence>
              {isFormVisible && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Step indicators */}
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          formStep >= step ? 'bg-red-500' : 'bg-red-900/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Step 1: Nama */}
                  <AnimatePresence mode="wait">
                    {formStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <label className="block text-sm text-gray-400 mb-2">Nama Lengkap *</label>
                        <input
                          ref={inputRef}
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-red-800/50 focus:border-red-500 focus:outline-none transition-all text-white"
                          placeholder="Masukkan nama lengkap"
                        />
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => name.trim() && setFormStep(2)}
                          className="mt-4 w-full py-2 bg-red-600/30 border border-red-600 rounded-lg text-red-400 font-semibold"
                        >
                          Lanjut ➔
                        </motion.button>
                      </motion.div>
                    )}

                    {/* Step 2: Kehadiran */}
                    {formStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <label className="block text-sm text-gray-400 mb-2">Status Kehadiran</label>
                        <div className="grid grid-cols-2 gap-3">
                          {["Hadir", "Tidak Hadir"].map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setAttendance(option)}
                              className={`py-3 rounded-lg border transition-all ${
                                attendance === option
                                  ? option === "Hadir" 
                                    ? 'bg-green-600/30 border-green-500 text-green-400'
                                    : 'bg-red-600/30 border-red-500 text-red-400'
                                  : 'border-red-800/50 hover:border-red-600'
                              }`}
                            >
                              {option === "Hadir" ? "✅ Hadir" : "❌ Tidak Hadir"}
                            </motion.button>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-4">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormStep(1)}
                            className="flex-1 py-2 bg-red-900/30 border border-red-800 rounded-lg text-red-400"
                          >
                            ← Kembali
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormStep(3)}
                            className="flex-1 py-2 bg-red-600/30 border border-red-600 rounded-lg text-red-400"
                          >
                            Lanjut ➔
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Komentar */}
                    {formStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <label className="block text-sm text-gray-400 mb-2">Komentar & Doa (opsional)</label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-black/50 border border-red-800/50 focus:border-red-500 focus:outline-none transition-all resize-none"
                          placeholder="Tulis pesan untuk angkatan..."
                          rows="3"
                        />
                        <div className="flex gap-3 mt-4">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormStep(2)}
                            className="flex-1 py-2 bg-red-900/30 border border-red-800 rounded-lg text-red-400"
                          >
                            ← Kembali
                          </motion.button>
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold text-white"
                          >
                            Kirim ✓
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-2 bg-green-600/20 border border-green-600 rounded-lg"
                    >
                      <p className="text-green-400 text-sm">
                        ✅ Terima kasih, konfirmasi diterima!
                      </p>
                    </motion.div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ===== HUBUNGI PANITIA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 flex flex-col md:flex-row items-center justify-between bg-red-950/20 border border-red-800/50 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h4 className="font-bold text-red-400 tracking-wider mb-1">BUTUH BANTUAN?</h4>
            <p className="text-sm text-gray-400">
              Ada kendala pengisian atau pertanyaan seputar acara? Hubungi panitia kami.
            </p>
          </div>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // Nomor diubah formatnya ke 628... agar link WA langsung berfungsi
            href="https://wa.me/6282292040027?text=Halo%20Panitia%20Anniversary%20Angkatan%20Dua%20Dua,%20saya%20ingin%20bertanya%20seputar%20acara..."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-green-900/30 border border-green-600 hover:bg-green-600 hover:border-green-400 text-green-400 hover:text-white rounded-lg transition-all font-semibold shadow-[0_0_15px_rgba(22,163,74,0.2)] hover:shadow-[0_0_25px_rgba(22,163,74,0.5)]"
          >
            <span className="text-2xl">💬</span>
            <span className="tracking-wide">WhatsApp Panitia</span>
          </motion.a>
        </motion.div>

        {/* FILTER & LIST TAMU */}
        <motion.div
          id="guest-list"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-black/40 backdrop-blur-sm border border-red-800/50 rounded-2xl p-6"
        >
          {/* Header dengan filter */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h3 className="font-bold text-red-400 tracking-wider">
              DAFTAR KONFIRMASI ({filteredGuests.length})
            </h3>
            
            <div className="flex gap-2">
              {["Semua", "Hadir", "Tidak Hadir"].map((f) => (
                <motion.button
                  key={f}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    filter === f
                      ? 'bg-red-600 text-white'
                      : 'bg-red-950/30 border border-red-800/50 text-red-400 hover:bg-red-900/30'
                  }`}
                >
                  {f}
                </motion.button>
              ))}
            </div>
          </div>

          {/* List Tamu dengan Loading State */}
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="text-center py-12 text-red-400"
              >
                <div className="text-3xl animate-spin mb-3">⏳</div>
                <p className="text-sm tracking-widest font-bold">MEMUAT DATA...</p>
              </motion.div>
            ) : filteredGuests.length > 0 ? (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredGuests.map((guest, index) => (
                  <motion.div
                    key={guest.id || index}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => setSelectedGuest(selectedGuest === guest.id ? null : guest.id)}
                    className={`bg-gradient-to-r from-red-950/20 to-black/50 p-4 rounded-lg border-l-4 ${
                      guest.attendance === "Hadir" 
                        ? 'border-l-green-500 hover:border-l-green-400' 
                        : 'border-l-red-500 hover:border-l-red-400'
                    } border border-red-800/50 cursor-pointer transition-all`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-white">{guest.name}</p>
                        <p className="text-xs text-gray-400">
                          {formatTime(guest.timestamp)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        guest.attendance === "Hadir" 
                          ? 'bg-green-600/30 text-green-400' 
                          : 'bg-red-600/30 text-red-400'
                      }`}>
                        {guest.attendance}
                      </span>
                    </div>
                    
                    <AnimatePresence>
                      {selectedGuest === guest.id && guest.comment && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-red-800/50"
                        >
                          <p className="text-sm text-gray-300 italic">
                            "{guest.comment}"
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500 border-2 border-dashed border-red-800/30 rounded-lg"
              >
                <p className="text-4xl mb-2">📋</p>
                <p>Belum ada konfirmasi</p>
                <p className="text-sm">Jadilah yang pertama!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer dengan motto */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-red-700/50 text-xs mt-8 tracking-widest"
        >
          SATUAN BRIGADDE • SIAGA • CEPAT • TANGGUH
        </motion.p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(220, 38, 38, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(220, 38, 38, 0.5); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(220, 38, 38, 0.8); }
      `}</style>
    </section>
  );
}