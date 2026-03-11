import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3XNAuNvUYvWBL1ivrc_xrauF9CzrbaC4kNRQvm3vALh0m5_VTBxsjGv0Y3mL1XLkqHg/exec";

export default function RSVPSection() {

  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const [comment, setComment] = useState("");

  const [guests, setGuests] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(15);

  const [isMobile, setIsMobile] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    fetch(SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        setGuests(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const stats = useMemo(() => {

    const totalHadir = guests.filter(g => g.attendance === "Hadir").length;
    const totalTidakHadir = guests.filter(g => g.attendance === "Tidak Hadir").length;
    const totalKomentar = guests.filter(g => g.comment).length;

    return { totalHadir, totalTidakHadir, totalKomentar };

  }, [guests]);

  const filteredGuests = useMemo(() => {

    if (filter === "Hadir") return guests.filter(g => g.attendance === "Hadir");
    if (filter === "Tidak Hadir") return guests.filter(g => g.attendance === "Tidak Hadir");
    return guests;

  }, [guests, filter]);

  const visibleGuests = useMemo(() => {

    return filteredGuests.slice(0, visibleCount);

  }, [filteredGuests, visibleCount]);

  const formatTime = (timestamp) => {

    if (!timestamp) return "";

    const date = new Date(timestamp);

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!name.trim()) return;

    const newGuest = {
      name,
      attendance,
      comment,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };

    setGuests([newGuest, ...guests]);

    const formData = new FormData();
    formData.append("nama", name);
    formData.append("kehadiran", attendance);
    formData.append("komentar", comment);

    setName("");
    setAttendance("Hadir");
    setComment("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 2500);

    try {

      await fetch(SCRIPT_URL, { method: "POST", body: formData });

      const res = await fetch(SCRIPT_URL);
      const data = await res.json();

      setGuests(data);

    } catch {}

  };

  return (
    <section className="relative w-full bg-black text-white px-4 py-20">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >

          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              KONFIRMASI KEHADIRAN
            </span>
          </h2>

          <div className="grid grid-cols-3 gap-3 mt-8">

            <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-3">
              <p className="text-2xl font-black text-red-500">{guests.length}</p>
              <p className="text-xs text-gray-400">Total</p>
            </div>

            <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-3">
              <p className="text-2xl font-black text-green-500">{stats.totalHadir}</p>
              <p className="text-xs text-gray-400">Hadir</p>
            </div>

            <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-3">
              <p className="text-2xl font-black text-yellow-500">{stats.totalKomentar}</p>
              <p className="text-xs text-gray-400">Komentar</p>
            </div>

          </div>

        </motion.div>


        {/* FORM */}

        <div ref={formRef} className="mb-12">

          <div className="bg-red-950/20 border border-red-800/50 rounded-2xl p-6">

            <h3 className="font-bold text-red-400 mb-4">FORMULIR KONFIRMASI</h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full px-4 py-3 rounded-lg bg-black border border-red-800/50 focus:border-red-500 outline-none"
              />

              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black border border-red-800/50"
              >
                <option>Hadir</option>
                <option>Tidak Hadir</option>
              </select>

              <textarea
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Komentar / doa"
                className="w-full px-4 py-3 rounded-lg bg-black border border-red-800/50 resize-none"
              />

              <button className="w-full py-3 bg-red-600 rounded-lg font-bold">
                Kirim
              </button>

              {submitted && (
                <p className="text-green-400 text-sm text-center">
                  Konfirmasi diterima
                </p>
              )}

            </form>

          </div>

        </div>


        {/* FILTER */}

        <div className="flex gap-2 mb-6">

          {["Semua", "Hadir", "Tidak Hadir"].map((f) => (

            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === f
                  ? "bg-red-600 text-white"
                  : "bg-red-950/30 border border-red-800/50 text-red-400"
              }`}
            >
              {f}
            </button>

          ))}

        </div>


        {/* LIST TAMU */}

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">

          {isLoading ? (

            <div className="text-center py-10 text-red-400">
              Memuat data...
            </div>

          ) : visibleGuests.length > 0 ? (

            visibleGuests.map((guest, index) => (

              <motion.div
                key={guest.id || index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() =>
                  setSelectedGuest(selectedGuest === guest.id ? null : guest.id)
                }
                className={`p-4 rounded-lg border-l-4 border border-red-800/50 cursor-pointer ${
                  guest.attendance === "Hadir"
                    ? "border-l-green-500"
                    : "border-l-red-500"
                }`}
              >

                <div className="flex justify-between items-start">

                  <div>
                    <p className="font-bold">{guest.name}</p>
                    <p className="text-xs text-gray-400">
                      {formatTime(guest.timestamp)}
                    </p>
                  </div>

                  <span className="text-xs px-2 py-1 rounded bg-red-600/30">
                    {guest.attendance}
                  </span>

                </div>

                {selectedGuest === guest.id && guest.comment && (
                  <div className="mt-3 text-sm text-gray-300 italic">
                    "{guest.comment}"
                  </div>
                )}

              </motion.div>

            ))

          ) : (

            <div className="text-center py-10 text-gray-500">
              Belum ada konfirmasi
            </div>

          )}

        </div>


        {/* LOAD MORE */}

        {filteredGuests.length > visibleCount && (

          <button
            onClick={() => setVisibleCount(v => v + 15)}
            className="mt-4 w-full py-2 border border-red-800/50 bg-red-950/20 text-red-400 rounded-lg"
          >
            Tampilkan lebih banyak
          </button>

        )}

      </div>

    </section>
  );
}