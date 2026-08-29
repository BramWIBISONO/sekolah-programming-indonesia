import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Send, MapPin, User, Phone, Check } from 'lucide-react';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: string;
  isRegistration?: boolean;
}

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({
  isOpen,
  onClose,
  initialTrack = 'SPI Core',
  isRegistration = false
}) => {
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('SD Kelas 4-6 (Usia 9-12 tahun)');
  const [learningGoal, setLearningGoal] = useState('');
  const [learningMode, setLearningMode] = useState<'onsite' | 'online'>('onsite');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('Jakarta');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleOpenWhatsApp = () => {
    const actionTitle = isRegistration ? 'Pendaftaran Kelas Reguler' : 'Free Trial Class 60 Menit';
    const message = `Halo SPI! Saya ${parentName || 'Orang Tua'}, ingin mendaftarkan anak saya (${studentName || 'Siswa'}, ${studentAge}) untuk ${actionTitle} (${learningMode === 'onsite' ? 'Onsite Lab' : 'Online Live'}).\n\n📌 Rencana/Mau Belajar: ${learningGoal || 'Belajar Coding & Teknologi'}\n📍 Kota: ${city}.\n\nMohon informasi ketersediaan jadwal terdekat. Terima kasih!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Clean Modal Header */}
        <div className="bg-[#176DF8] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="inline-block bg-white/20 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-1">
              {isRegistration ? 'Formulir Pendaftaran Siswa' : 'Free Trial Class 60 Menit'}
            </span>
            <h3 className="text-xl font-bold text-white">
              {isRegistration ? 'Pendaftaran Kelas SPI' : 'Daftar Kelas Uji Coba Gratis'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Parent & Student Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Orang Tua <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Contoh: Bpk. Hendra"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#176DF8] focus:ring-2 focus:ring-[#176DF8]/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Siswa / Anak <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Valerie"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#176DF8] focus:ring-2 focus:ring-[#176DF8]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Jenjang Usia & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Jenjang Usia Siswa <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={studentAge}
                    onChange={(e) => setStudentAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#176DF8] focus:ring-2 focus:ring-[#176DF8]/20 outline-none transition-all"
                  >
                    <option>TK / PAUD (Usia 4-6 tahun)</option>
                    <option>SD Kelas 1-3 (Usia 6-8 tahun)</option>
                    <option>SD Kelas 4-6 (Usia 9-12 tahun)</option>
                    <option>SMP Kelas 7-9 (Usia 13-15 tahun)</option>
                    <option>SMA / SMK Kelas 10-12 (Usia 16-18 tahun)</option>
                    <option>Kuliah / Mahasiswa (Usia 18+ tahun)</option>
                    <option>Umum / Dewasa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    No. WhatsApp Aktif <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#176DF8] focus:ring-2 focus:ring-[#176DF8]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Mau Belajar Apa? (User Free Input) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mau Belajar Apa? <span className="text-slate-400 font-normal">(Bebas diisi sesuai minat anak)</span>
                </label>
                <textarea
                  rows={2}
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  placeholder="Contoh: Mau belajar bikin game Roblox/Scratch, robotik Arduino, buat website, animasi, atau belajar AI..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#176DF8] focus:ring-2 focus:ring-[#176DF8]/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Learning Mode & City */}
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Metode Belajar
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setLearningMode('onsite')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        learningMode === 'onsite'
                          ? 'bg-[#176DF8] text-white border-[#176DF8]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Onsite Lab
                    </button>
                    <button
                      type="button"
                      onClick={() => setLearningMode('online')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        learningMode === 'online'
                          ? 'bg-[#176DF8] text-white border-[#176DF8]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Online Live
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Kota Domisili
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Jakarta / Surabaya"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#176DF8] focus:ring-2 focus:ring-[#176DF8]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Perks summary */}
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-center space-x-1.5 text-[#176DF8] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isRegistration ? 'Keuntungan Pendaftaran Reguler:' : 'Fasilitas Free Trial 60 Menit:'}</span>
                </div>
                <p className="pl-5 text-slate-500 text-[11px]">
                  • Sesi 1-on-1 diagnostic & assessment bakat coding bersama mentor
                </p>
                <p className="pl-5 text-slate-500 text-[11px]">
                  • Praktik langsung membuat proyek teknologi pertama dan konsultasi kurikulum
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#176DF8] hover:bg-[#1059D4] active:scale-98 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{isRegistration ? 'Konfirmasi Pendaftaran Kelas' : 'Konfirmasi Pendaftaran Trial'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          ) : (
            /* Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#176DF8] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl font-bold text-slate-800">
                  {isRegistration ? 'Pendaftaran Kelas Berhasil Diterima!' : 'Pendaftaran Trial Berhasil Diterima!'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Terima kasih <strong className="text-slate-700">{parentName || 'Orang Tua'}</strong>. Data untuk <strong className="text-slate-700">{studentName || 'Siswa'}</strong> ({studentAge}) telah tercatat.
                </p>
              </div>

              <div className="pt-3 space-y-2">
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Chat WhatsApp Tim Konsultan SPI</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Tutup Jendela
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
