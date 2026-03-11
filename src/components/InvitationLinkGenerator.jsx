import { useMemo, useState } from "react";

function formatGuestName(name) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildPublicLink(name) {
  const url = new URL(window.location.origin);
  url.pathname = "/";

  if (name.trim()) {
    url.searchParams.set("to", name.trim());
  }

  return url.toString();
}

function buildWhatsappMessage(name, link) {
  return `Assalamu’alaikum Wr. Wb.

Yth. Bapak/Ibu/Saudara/i
*${name}*

Tanpa mengurangi rasa hormat, melalui pesan ini kami mengundang Anda untuk hadir dalam momen istimewa:

*ANNIVERSARY 13 TAHUN*
*Pengabdian Angkatan Dua Dua*

Sebuah kehormatan bagi kami dapat kembali bersilaturahmi dalam acara yang akan dilaksanakan pada:

🗓 *Sabtu, 18 April 2026*
🕘 *09.00 WIB – Selesai*
📍 *(Isi Lokasi di Sini)*

Detail acara dan konfirmasi kehadiran dapat diakses melalui tautan berikut:
${link}

Kehadiran Bapak/Ibu/Saudara/i merupakan pelengkap kebahagiaan dan persaudaraan kami. Terima kasih atas perhatiannya.

Wassalamu’alaikum Wr. Wb.`;
}

export default function InvitationLinkGenerator() {
  const [guestName, setGuestName] = useState("");
  const [bulkNames, setBulkNames] = useState("");
  const [copiedType, setCopiedType] = useState("");

  const formattedGuestName = useMemo(() => {
    return guestName.trim() ? formatGuestName(guestName) : "";
  }, [guestName]);

  const publicLink = useMemo(() => {
    return buildPublicLink(formattedGuestName);
  }, [formattedGuestName]);

  const whatsappMessage = useMemo(() => {
    const finalName = formattedGuestName || "Tamu Kehormatan";
    return buildWhatsappMessage(finalName, publicLink);
  }, [formattedGuestName, publicLink]);

  const bulkGenerated = useMemo(() => {
    const uniqueNames = [...new Set(
      bulkNames
        .split("\n")
        .map((name) => formatGuestName(name))
        .filter(Boolean)
    )];

    return uniqueNames.map((name) => {
      const link = buildPublicLink(name);
      const message = buildWhatsappMessage(name, link);

      return {
        name,
        link,
        message,
      };
    });
  }, [bulkNames]);

  const bulkLinksText = useMemo(() => {
    if (!bulkGenerated.length) return "";

    return bulkGenerated
      .map((item, index) => `${index + 1}. ${item.name}\n${item.link}`)
      .join("\n\n");
  }, [bulkGenerated]);

  const bulkMessagesText = useMemo(() => {
    if (!bulkGenerated.length) return "";

    return bulkGenerated
      .map((item, index) => `=== ${index + 1}. ${item.name} ===\n\n${item.message}`)
      .join("\n\n----------------------------------------\n\n");
  }, [bulkGenerated]);

  const showCopied = (type) => {
    setCopiedType(type);
    setTimeout(() => setCopiedType(""), 2000);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicLink);
      showCopied("link");
    } catch {
      alert("Gagal menyalin link.");
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      showCopied("message");
    } catch {
      alert("Gagal menyalin pesan WhatsApp.");
    }
  };

  const handlePreview = () => {
    window.open(publicLink, "_blank");
  };

  const handleResetSingle = () => {
    setGuestName("");
    setCopiedType("");
  };

  const handleCopyBulkLinks = async () => {
    try {
      await navigator.clipboard.writeText(bulkLinksText);
      showCopied("bulk-links");
    } catch {
      alert("Gagal menyalin bulk link.");
    }
  };

  const handleCopyBulkMessages = async () => {
    try {
      await navigator.clipboard.writeText(bulkMessagesText);
      showCopied("bulk-messages");
    } catch {
      alert("Gagal menyalin bulk pesan.");
    }
  };

  const handleResetBulk = () => {
    setBulkNames("");
    setCopiedType("");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-red-400 text-xs md:text-sm tracking-[0.35em] uppercase font-bold mb-3">
            Dashboard Generator
          </p>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-wide">
            Generator Link Undangan
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Buat link undangan, preview nama tamu, dan salin pesan WhatsApp siap kirim dalam satu tempat.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* SINGLE GENERATOR */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-r from-red-950/40 via-black/40 to-red-950/20">
              <h2 className="text-lg font-bold text-white">
                Generator Satuan
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Untuk membuat 1 link dan 1 pesan WhatsApp
              </p>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2">
                  Nama Tamu
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Contoh: Brigadir Irawan"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-red-500 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2">
                  Nama Tampil
                </label>
                <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-200 min-h-[48px]">
                  {formattedGuestName || "Tamu Kehormatan"}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2">
                  Link Publik
                </label>
                <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-gray-200 break-all leading-relaxed min-h-[52px]">
                  {publicLink}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2">
                  Pesan WhatsApp
                </label>
                <textarea
                  readOnly
                  value={whatsappMessage}
                  className="w-full h-72 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-200 leading-relaxed outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={handleCopyLink}
                  className="rounded-2xl bg-red-600 hover:bg-red-700 active:scale-[0.98] transition px-4 py-3 text-sm font-bold text-white"
                >
                  {copiedType === "link" ? "Tersalin" : "Copy Link"}
                </button>

                <button
                  onClick={handleCopyMessage}
                  className="rounded-2xl bg-green-600 hover:bg-green-700 active:scale-[0.98] transition px-4 py-3 text-sm font-bold text-white"
                >
                  {copiedType === "message" ? "Tersalin" : "Copy Pesan"}
                </button>

                <button
                  onClick={handlePreview}
                  className="rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.98] transition px-4 py-3 text-sm font-semibold text-white border border-white/10"
                >
                  Preview
                </button>

                <button
                  onClick={handleResetSingle}
                  className="rounded-2xl bg-white/5 hover:bg-white/10 active:scale-[0.98] transition px-4 py-3 text-sm font-semibold text-gray-200 border border-white/10"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* BULK GENERATOR */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-r from-red-950/40 via-black/40 to-red-950/20">
              <h2 className="text-lg font-bold text-white">
                Bulk Generator
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Paste banyak nama sekaligus, satu nama per baris
              </p>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2">
                  Daftar Nama
                </label>
                <textarea
                  value={bulkNames}
                  onChange={(e) => setBulkNames(e.target.value)}
                  placeholder={`Contoh:
Brigadir Irawan
Bapak Ahmad Fauzi
Ibu Siti Rahma
Keluarga Besar Hidayat`}
                  className="w-full h-44 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none resize-none focus:border-red-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-1">
                    Total Nama
                  </p>
                  <p className="text-2xl font-black text-white">
                    {bulkGenerated.length}
                  </p>
                </div>

                <button
                  onClick={handleCopyBulkLinks}
                  disabled={!bulkGenerated.length}
                  className="rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition px-4 py-3 text-sm font-bold text-white"
                >
                  {copiedType === "bulk-links" ? "Tersalin" : "Copy Semua Link"}
                </button>

                <button
                  onClick={handleCopyBulkMessages}
                  disabled={!bulkGenerated.length}
                  className="rounded-2xl bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition px-4 py-3 text-sm font-bold text-white"
                >
                  {copiedType === "bulk-messages" ? "Tersalin" : "Copy Semua Pesan"}
                </button>
              </div>

              <button
                onClick={handleResetBulk}
                className="w-full rounded-2xl bg-white/5 hover:bg-white/10 active:scale-[0.98] transition px-4 py-3 text-sm font-semibold text-gray-200 border border-white/10"
              >
                Reset Bulk
              </button>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2">
                  Hasil Generator
                </label>

                <div className="rounded-2xl border border-white/10 bg-black/30 max-h-[420px] overflow-auto">
                  {bulkGenerated.length === 0 ? (
                    <div className="px-4 py-6 text-sm text-gray-500 text-center">
                      Belum ada data. Masukkan daftar nama untuk mulai generate.
                    </div>
                  ) : (
                    <div className="divide-y divide-white/10">
                      {bulkGenerated.map((item, index) => (
                        <div key={`${item.name}-${index}`} className="p-4 space-y-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              {index + 1}. Nama
                            </p>
                            <p className="text-sm font-bold text-white">
                              {item.name}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Link
                            </p>
                            <p className="text-xs text-gray-300 break-all leading-relaxed">
                              {item.link}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(item.link);
                                  showCopied(`item-link-${index}`);
                                } catch {
                                  alert("Gagal menyalin link item.");
                                }
                              }}
                              className="rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.98] transition px-3 py-2 text-xs font-bold text-white"
                            >
                              {copiedType === `item-link-${index}` ? "Tersalin" : "Copy Link"}
                            </button>

                            <button
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(item.message);
                                  showCopied(`item-message-${index}`);
                                } catch {
                                  alert("Gagal menyalin pesan item.");
                                }
                              }}
                              className="rounded-xl bg-green-600 hover:bg-green-700 active:scale-[0.98] transition px-3 py-2 text-xs font-bold text-white"
                            >
                              {copiedType === `item-message-${index}` ? "Tersalin" : "Copy Pesan"}
                            </button>

                            <button
                              onClick={() => window.open(item.link, "_blank")}
                              className="rounded-xl bg-white/10 hover:bg-white/15 active:scale-[0.98] transition px-3 py-2 text-xs font-semibold text-white border border-white/10"
                            >
                              Preview
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-red-500/15 bg-red-500/5 px-5 py-4">
          <p className="text-sm text-gray-300 leading-relaxed">
            Tips: untuk generator satuan, isi satu nama lalu klik <span className="font-bold text-white">Copy Pesan</span> agar bisa langsung ditempel ke WhatsApp. Untuk bulk generator, tempel banyak nama satu per baris lalu gunakan <span className="font-bold text-white">Copy Semua Link</span> atau <span className="font-bold text-white">Copy Semua Pesan</span>.
          </p>
        </div>
      </div>
    </div>
  );
}