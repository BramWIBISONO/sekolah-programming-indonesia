import React from 'react';
import { MapPin, Plus } from 'lucide-react';
import { useLanguage } from '../../i18n';

/**
 * SPI partnership network: verified learning locations vs. regions open to partnership.
 * Replaces the geographic map — locations come from the verified address list used in
 * "Find SPI Near You"; open regions are presented as opportunities, not existing partners.
 */
export const SPI_LOCATIONS = [
  { key: 'jakarta', city: 'Jakarta', provinceKey: 'network.prov.jakarta' },
  { key: 'surabaya', city: 'Surabaya', provinceKey: 'network.prov.east_java' },
  { key: 'malang', city: 'Malang', provinceKey: 'network.prov.east_java' },
  { key: 'solo', city: 'Solo', provinceKey: 'network.prov.central_java' },
  { key: 'yogyakarta', city: 'Yogyakarta', provinceKey: 'network.prov.yogyakarta' },
];

const OPEN_REGIONS = ['sumatra', 'kalimantan', 'sulawesi', 'bali_nusa', 'maluku_papua'];

interface PartnershipNetworkProps {
  /** Optional action shown under the open-regions list. */
  onDiscuss?: () => void;
}

export const PartnershipNetwork: React.FC<PartnershipNetworkProps> = ({ onDiscuss }) => {
  const { t } = useLanguage();

  return (
    <div className="rounded-3xl border border-[#DCE7F5] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-blue-500/5 overflow-hidden">
      {/* Title + legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-black text-[#041A5A] dark:text-white">{t('network.title')}</h3>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1" aria-label={t('network.legend')}>
          <li className="flex items-center gap-1.5 text-[11px] font-bold text-[#041A5A] dark:text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#176DF8]" aria-hidden="true" />
            {t('network.current')}
          </li>
          <li className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-dashed border-[#176DF8]/60" aria-hidden="true" />
            {t('network.open')}
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Current network */}
        <section className="p-5 sm:p-6 bg-gradient-to-br from-[#176DF8] to-[#0B3C95] text-white" aria-labelledby="network-current-heading">
          <div className="flex items-baseline justify-between gap-3 mb-4">
            <h4 id="network-current-heading" className="text-base font-black">{t('network.current')}</h4>
            <span className="text-xs font-semibold text-blue-100">
              {t('network.locations_count').replace('{n}', String(SPI_LOCATIONS.length))}
            </span>
          </div>
          <ul className="space-y-2">
            {SPI_LOCATIONS.map((loc) => (
              <li key={loc.key} className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5">
                <span className="w-8 h-8 rounded-lg bg-white text-[#176DF8] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold leading-tight">Sekolah Programming Indonesia {loc.city}</span>
                  <span className="block text-[11px] text-blue-100">{t(loc.provinceKey)}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Open regions */}
        <section className="p-5 sm:p-6 bg-[#F7F8FC] dark:bg-slate-900" aria-labelledby="network-open-heading">
          <h4 id="network-open-heading" className="text-base font-black text-[#041A5A] dark:text-white mb-1">{t('network.open')}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{t('network.open_note')}</p>
          <ul className="flex flex-wrap gap-2">
            {OPEN_REGIONS.map((key) => (
              <li
                key={key}
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-dashed border-[#176DF8]/40 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-bold text-[#0B3C95] dark:text-blue-200"
              >
                <Plus className="w-3.5 h-3.5 text-[#176DF8]" aria-hidden="true" />
                {t(`network.region.${key}`)}
              </li>
            ))}
          </ul>
          {onDiscuss && (
            <button
              type="button"
              onClick={onDiscuss}
              className="mt-5 text-sm font-bold text-[#176DF8] hover:text-[#0B3C95] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8] rounded cursor-pointer"
            >
              {t('network.open_cta')} →
            </button>
          )}
        </section>
      </div>
    </div>
  );
};
