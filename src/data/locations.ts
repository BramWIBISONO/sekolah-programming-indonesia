/**
 * Single source of truth for SPI learning locations.
 * Used by "Find SPI Near You", the partnership network, and the registration form,
 * so names, addresses and order stay consistent everywhere.
 *
 * NOTE: confirm with the SPI operations team before adding, removing or renaming a location.
 * `branchLabel` / `branchValue` are sent to the Digital System registration API — keep them stable.
 */
export interface SpiLocation {
  /** Stable id used in the UI. */
  id: string;
  /** City shown after the institution name. */
  city: string;
  /** Translation key for the province. */
  provinceKey: string;
  address: string;
  /** Value/label submitted as `branch` to the Digital System. */
  branchValue: string;
  branchLabel: string;
}

export const SPI_LOCATIONS: SpiLocation[] = [
  {
    id: 'spi-jakarta',
    city: 'Jakarta Barat',
    provinceKey: 'network.prov.jakarta',
    address: 'Jl. Taman Surya 5 No.1 Ruko, RT.7/RW.3, Pegadungan, Kalideres, West Jakarta City, Jakarta 11830',
    branchValue: 'jakarta_barat',
    branchLabel: 'Jakarta Barat',
  },
  {
    id: 'spi-surabaya',
    city: 'Surabaya',
    provinceKey: 'network.prov.east_java',
    address: 'Lagoon Avenue Mall Sungkono, Jl. KH Abdul Wahab Siamin Surabaya No.Kav 9, RW.10, Putat Gede, Kec. Dukuhpakis, Surabaya, Jawa Timur 60225',
    branchValue: 'surabaya',
    branchLabel: 'Surabaya',
  },
  {
    id: 'spi-malang',
    city: 'Malang',
    provinceKey: 'network.prov.east_java',
    address: 'Jl. Galunggung No.78b, Gading Kasri, Kec. Klojen, Kota Malang, Jawa Timur 65115',
    branchValue: 'malang',
    branchLabel: 'Malang',
  },
  {
    id: 'spi-solo',
    city: 'Solo',
    provinceKey: 'network.prov.central_java',
    address: 'Jl. Veteran No.2, Ps. Kliwon, Kec. Ps. Kliwon, Kota Surakarta, Jawa Tengah 57116',
    branchValue: 'solo',
    branchLabel: 'Solo',
  },
  {
    id: 'spi-jogja',
    city: 'Yogyakarta',
    provinceKey: 'network.prov.yogyakarta',
    address: 'Jl. Tata Bumi No.1A, Area Sawah, Banyuraden, Kec. Gamping, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55293',
    branchValue: 'jogja',
    branchLabel: 'Yogyakarta',
  },
];

export const locationName = (loc: SpiLocation) => `Sekolah Programming Indonesia ${loc.city}`;

/**
 * Opens the branch straight in Google Maps, searched by its name and address.
 * The earlier share links only opened a Google search page.
 */
export const mapsSearchUrl = (loc: SpiLocation) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${locationName(loc)}, ${loc.address}`)}`;
