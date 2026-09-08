import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, ExternalLink, MessageCircle, Printer, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { copyFor, DiscoveryEvidence, DiscoveryReportData } from '../../data/discoveryData';
import { ASSETS } from '../../constants/assets';

interface DiscoveryReportPageProps {
  onBack: () => void;
  onNavigate?: (path: string) => void;
}

const interestLabels = { game: 'Game', coding: 'Coding', ai: 'AI', robotics: 'Robotics' };
const evidenceLabels: Record<DiscoveryEvidence, string> = {
  interest: 'ketertarikan untuk mengeksplorasi ide',
  experience: 'pengalaman yang sudah dimiliki',
  technology_experience: 'kenyamanan saat mencoba alat digital',
  capability_evidence: 'ketekunan saat menghadapi tantangan',
  learning_preference: 'cara belajar yang terasa membantu',
  interaction_preference: 'cara bekerja bersama orang lain',
  goal: 'gambaran hasil yang ingin diwujudkan',
  project_intent: 'ide project yang ingin dicoba',
  engagement: 'kesiapan untuk mengembangkan project',
};

function readReport(): DiscoveryReportData | null {
  try {
    const stored = sessionStorage.getItem('spi_discovery_report');
    return stored ? JSON.parse(stored) as DiscoveryReportData : null;
  } catch {
    return null;
  }
}

export const DiscoveryReportPage: React.FC<DiscoveryReportPageProps> = ({ onBack, onNavigate }) => {
  const { lang } = useLanguage();
  const [report] = useState<DiscoveryReportData | null>(readReport);

  useEffect(() => {
    document.title = 'Discover SPI | Report Eksplorasi';
    return () => { document.title = 'Sekolah Programming Indonesia'; };
  }, []);

  if (!report) {
    return <main className="min-h-[70vh] flex items-center justify-center px-6 py-20"><div className="text-center space-y-5"><h1 className="text-2xl font-black text-[#0D47A1]">Report belum tersedia</h1><p className="text-slate-600">Selesaikan Discover SPI terlebih dahulu untuk melihat report eksplorasi.</p><button onClick={onBack} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#176DF8] text-white font-bold"><ArrowLeft className="w-4 h-4" /> Kembali ke Discover SPI</button></div></main>;
  }

  const printReport = () => window.print();
  const whatsappUrl = 'https://wa.me/6281246906335?text=Halo%20SPI%2C%20saya%20ingin%20mengetahui%20lebih%20lanjut%20tentang%20program%20dan%20Trial%20Gratis%20SPI.';

  return (
    <main className="discovery-report-page min-h-screen bg-[#F4F8FF] py-8 sm:py-12">
      <div className="discovery-report-actions max-w-4xl mx-auto px-4 sm:px-6 mb-5 flex flex-wrap items-center justify-between gap-3">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-[#176DF8] hover:text-[#0D47A1]"><ArrowLeft className="w-4 h-4" /> Kembali ke Discover</button>
        <div className="flex flex-wrap gap-2">
          <button onClick={printReport} title="Simpan sebagai PDF dari dialog cetak" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176DF8] text-white text-sm font-bold shadow-md"><Download className="w-4 h-4" /> Download PDF</button>
          <button onClick={printReport} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 bg-white text-[#176DF8] text-sm font-bold"><Printer className="w-4 h-4" /> Print</button>
        </div>
      </div>

      <article className="discovery-report-sheet max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <header className="bg-gradient-to-br from-[#0D47A1] to-[#176DF8] text-white px-7 py-9 sm:px-12 sm:py-12">
          <div className="flex items-center justify-between gap-5">
            {/* SPI logo clearly visible in the report header */}
            <img
              src={ASSETS.brand.logo}
              alt="Sekolah Programming Indonesia"
              className="h-14 sm:h-20 w-auto object-contain drop-shadow"
              loading="lazy"
              decoding="async"
            />
            <div className="flex items-center gap-2 text-blue-100 text-xs font-black uppercase tracking-[0.2em]"><Sparkles className="w-4 h-4" /> Discover SPI</div>
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-black">Report Eksplorasi</h1>
          {report.studentName && (
            <p className="mt-3 text-sm sm:text-base font-bold text-amber-200">
              Untuk: <span className="text-white">{report.studentName}</span>
            </p>
          )}
          <p className="mt-3 max-w-2xl text-blue-100 leading-relaxed">Ringkasan perjalanan eksplorasi dan ide project yang dapat dikembangkan selanjutnya.</p>
        </header>

        <div className="px-7 py-8 sm:px-12 sm:py-10 space-y-9">
          <section className="grid sm:grid-cols-[1fr_auto] gap-5 items-start">
            <div><p className="report-kicker">Ringkasan eksplorasi</p><h2 className="report-heading">Kamu mengeksplorasi {interestLabels[report.interest]}</h2><p className="mt-3 text-slate-600 leading-relaxed">Selama Discover SPI, kamu memilih beberapa jawaban tentang minat, pengalaman, cara mencoba, dan project yang ingin dibuat. Ringkasan ini membantu melihat langkah belajar yang terasa relevan untukmu.</p></div>
            <div className="flex flex-col items-stretch gap-3">
              {report.studentName && (
                <div className="rounded-xl bg-[#0D47A1] text-white px-5 py-4 text-center">
                  <p className="text-xs font-bold text-blue-200">Nama</p>
                  <p className="mt-1 text-lg font-black">{report.studentName}</p>
                </div>
              )}
              <div className="rounded-xl bg-blue-50 border border-blue-100 px-5 py-4 text-center"><p className="text-xs font-bold text-slate-500">Fokus eksplorasi</p><p className="mt-1 text-lg font-black text-[#0D47A1]">{interestLabels[report.interest]}</p></div>
            </div>
          </section>

          <section><p className="report-kicker">Yang dipilih dan dicoba</p><h2 className="report-heading">Jejak eksplorasimu</h2><div className="mt-4 grid gap-3">{report.answers.map((answer, index) => <div key={`${answer.id}-${index}`} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"><p className="text-xs font-bold text-[#176DF8]">{evidenceLabels[answer.evidence]}</p><p className="mt-1 font-semibold text-slate-700">{copyFor(answer.label, lang)}</p></div>)}</div></section>

          <section><p className="report-kicker">Yang terlihat dari aktivitasmu</p><h2 className="report-heading">Pengalaman yang bisa dikembangkan</h2><p className="mt-3 text-slate-600 leading-relaxed">Pilihanmu menunjukkan ketertarikan untuk belajar lewat praktik, mencoba kemungkinan, dan mengembangkan ide menjadi sesuatu yang lebih nyata. Ini adalah bahan awal yang baik untuk terus bereksperimen dan berkarya.</p></section>

          <section><p className="report-kicker">Project rekomendasi</p><h2 className="report-heading">Beberapa ide untuk dicoba</h2><div className="mt-4 grid sm:grid-cols-3 gap-4">{report.recommendedProjects.map((project) => <div key={project.id} className="rounded-xl border border-blue-100 p-4"><p className="font-bold text-[#0D47A1]">{copyFor(project.title, lang)}</p><p className="mt-2 text-sm text-slate-600 leading-relaxed">{copyFor(project.description, lang)}</p></div>)}</div></section>

          <section className="grid sm:grid-cols-2 gap-5"><div className="rounded-xl bg-[#0D47A1] text-white p-5"><p className="report-kicker report-kicker-light">Project pilihanmu</p><h2 className="mt-2 text-xl font-black">{copyFor(report.selectedProject.title, lang)}</h2><p className="mt-2 text-sm text-blue-100">{copyFor(report.selectedProject.description, lang)}</p></div><div className="rounded-xl border border-blue-100 bg-blue-50 p-5"><p className="report-kicker">Make It Yours</p><p className="mt-2 font-bold text-[#0D47A1]">{report.personalization}</p><p className="mt-2 text-sm text-slate-600">Pilihan ini menjadi arah personal untuk mengembangkan project tersebut.</p></div></section>

          <section><p className="report-kicker">Possible Path</p><h2 className="report-heading">Kemungkinan arah belajar di SPI</h2><div className="mt-4 rounded-xl border-2 border-blue-100 p-5"><p className="text-2xl font-black text-[#176DF8]">{report.program}</p><p className="mt-2 text-slate-600 leading-relaxed">Jalur ini dapat menjadi ruang untuk memperdalam {report.selectedProject.skills.join(', ')} melalui project dan tantangan yang bertahap.</p></div></section>
        </div>

        <footer className="border-t border-slate-100 bg-slate-50 px-7 py-8 sm:px-12"><h2 className="text-xl font-black text-[#0D47A1]">Ingin melanjutkan eksplorasimu?</h2><p className="mt-2 max-w-2xl text-sm text-slate-600 leading-relaxed">Ingin mengetahui lebih detail tentang minat, kemampuan, dan kemungkinan project yang bisa dikembangkan? Coba pengalaman belajar langsung di SPI terdekat atau hubungi SPI melalui WhatsApp.</p><div className="discovery-report-actions mt-5 flex flex-wrap gap-3"><button onClick={() => onNavigate?.('/classes')} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#176DF8] text-white font-bold"><ExternalLink className="w-4 h-4" /> Coba Lebih Lanjut di SPI</button><a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-green-200 bg-white text-green-700 font-bold"><MessageCircle className="w-4 h-4" /> Hubungi WhatsApp SPI</a></div></footer>
      </article>
    </main>
  );
};