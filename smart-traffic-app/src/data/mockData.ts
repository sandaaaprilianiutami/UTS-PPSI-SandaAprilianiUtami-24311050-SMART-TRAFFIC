import { RoadSegment, Region, IncidentReport, CCTVDevice, IoTDevice, AuditLog, RouteOption } from '../types';

export const INITIAL_REGIONS: Region[] = [
  { id: 'reg-01', name: 'Kota Bandar Lampung', code: 'BDL', districtCount: 20, totalRoads: 48, totalCctv: 34, statusOverview: 'Kepadatan Tinggi di Jam Sibuk' },
  { id: 'reg-02', name: 'Kabupaten Lampung Selatan', code: 'LMS', districtCount: 17, totalRoads: 32, totalCctv: 18, statusOverview: 'Lancar Terkendali - Koridor Bakauheni' },
  { id: 'reg-03', name: 'Kabupaten Lampung Tengah', code: 'LMT', districtCount: 28, totalRoads: 26, totalCctv: 12, statusOverview: 'Arus Logistik Padat di Lintas Sumatera' },
  { id: 'reg-04', name: 'Kota Metro', code: 'MTR', districtCount: 5, totalRoads: 18, totalCctv: 10, statusOverview: 'Lancar Ramai Pusat Niaga' },
  { id: 'reg-05', name: 'Kabupaten Pesawaran', code: 'PSW', districtCount: 11, totalRoads: 14, totalCctv: 8, statusOverview: 'Jalur Wisata Pesisir Ramai Lancar' }
];

export const INITIAL_ROADS: RoadSegment[] = [
  {
    id: 'rd-01',
    name: 'Jl. ZA. Pagar Alam (Rajabasa - Labuhan Ratu)',
    region: 'Kota Bandar Lampung',
    lengthKm: 4.8,
    lanes: 4,
    status: 'padat',
    avgSpeed: 22,
    vehicleCount: 2840,
    lastUpdated: '10 Menit Lalu',
    cctvActive: true,
    coordinates: [-5.3812, 105.2588],
    description: 'Koridor penghubung kampus Unila, Teknokrat, dan terminal Rajabasa.'
  },
  {
    id: 'rd-02',
    name: 'Jl. Raden Intan (Pusat Kota - Tanjung Karang)',
    region: 'Kota Bandar Lampung',
    lengthKm: 3.2,
    lanes: 4,
    status: 'ramai_lancar',
    avgSpeed: 34,
    vehicleCount: 1950,
    lastUpdated: '5 Menit Lalu',
    cctvActive: true,
    coordinates: [-5.4182, 105.2605],
    description: 'Arteri pusat pertokoan dan perhotelan Bandar Lampung.'
  },
  {
    id: 'rd-03',
    name: 'Jl. Teuku Umar (Kedaton)',
    region: 'Kota Bandar Lampung',
    lengthKm: 3.5,
    lanes: 4,
    status: 'padat',
    avgSpeed: 18,
    vehicleCount: 3100,
    lastUpdated: 'Baru saja',
    cctvActive: true,
    coordinates: [-5.3955, 105.2624],
    description: 'Jalur padat aktivitas komersial dekat Pasar Koga.'
  },
  {
    id: 'rd-04',
    name: 'Jl. Soekarno-Hatta (By Pass - Kalibalok)',
    region: 'Kota Bandar Lampung',
    lengthKm: 12.4,
    lanes: 4,
    status: 'lancar',
    avgSpeed: 52,
    vehicleCount: 1420,
    lastUpdated: '15 Menit Lalu',
    cctvActive: true,
    coordinates: [-5.3850, 105.2890],
    description: 'Jalur logistik arteri lintas timur By Pass.'
  },
  {
    id: 'rd-05',
    name: 'Jl. Wolter Monginsidi (Pengadilan - Pemprov)',
    region: 'Kota Bandar Lampung',
    lengthKm: 2.6,
    lanes: 3,
    status: 'lancar',
    avgSpeed: 45,
    vehicleCount: 880,
    lastUpdated: '20 Menit Lalu',
    cctvActive: true,
    coordinates: [-5.4312, 105.2541],
    description: 'Kawasan perkantoran Pemprov Lampung dan instansi vertikal.'
  },
  {
    id: 'rd-06',
    name: 'Tol Bakauheni - Terbanggi Besar (KM 88 Kalianda)',
    region: 'Kabupaten Lampung Selatan',
    lengthKm: 24.0,
    lanes: 4,
    status: 'lancar',
    avgSpeed: 88,
    vehicleCount: 950,
    lastUpdated: '8 Menit Lalu',
    cctvActive: true,
    coordinates: [-5.6210, 105.5801],
    description: 'Ruas jalan tol Trans-Sumatera akses Pelabuhan Bakauheni.'
  },
  {
    id: 'rd-07',
    name: 'Jl. Lintas Tengah Sumatera (Gunung Sugih)',
    region: 'Kabupaten Lampung Tengah',
    lengthKm: 16.5,
    lanes: 2,
    status: 'ramai_lancar',
    avgSpeed: 40,
    vehicleCount: 1680,
    lastUpdated: '12 Menit Lalu',
    cctvActive: false,
    coordinates: [-4.9811, 105.2014],
    description: 'Arteri nasional pengangkut komoditas perkebunan.'
  }
];

export const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: 'INC-2026-001',
    title: 'Kendaraan Mogok di Lajur Kanan Flyover MBK',
    category: 'kemacetan',
    roadName: 'Jl. ZA. Pagar Alam',
    region: 'Kota Bandar Lampung',
    reporterName: 'Ahmad Fauzi',
    reporterPhone: '081234567890',
    description: 'Truk ekspedisi mengalami kendala mesin di tanjakan flyover MBK mengarah ke Labuhan Ratu, terjadi antrean sekitar 800 meter.',
    status: 'sedang_ditangani',
    urgency: 'tinggi',
    createdAt: '2026-11-10 16:30',
    updatedAt: '2026-11-10 17:10',
    officerNotes: 'Petugas Dishub BDL & Derek Polresta sudah berada di lokasi untuk evakuasi lajur.',
    assignedOfficer: 'Bripka Hendra / Dishub BDL Regu B',
    lat: -5.3831,
    lng: 105.2592
  },
  {
    id: 'INC-2026-002',
    title: 'Lampu Lalu Lintas Padam Simpang Kalibalau',
    category: 'lampu_lalin',
    roadName: 'Jl. Soekarno-Hatta By Pass',
    region: 'Kota Bandar Lampung',
    reporterName: 'Rian Saputra',
    reporterPhone: '085712398877',
    description: 'Traffic light padam akibat pemeliharaan trafo PLN. Lalu lintas dari arah Kalianda dan Rajabasa saling bersilangan.',
    status: 'terverifikasi',
    urgency: 'sedang',
    createdAt: '2026-11-10 17:05',
    updatedAt: '2026-11-10 17:15',
    officerNotes: 'Tim teknisi ITS Dishub Provinsi sedang meluncur untuk sinkronisasi genset backup.',
    assignedOfficer: 'Tim Teknis Dishub',
    lat: -5.4021,
    lng: 105.2915
  },
  {
    id: 'INC-2026-003',
    title: 'Pohon Tumbang Sebagian Menutupi Bahu Jalan',
    category: 'bencana_alam',
    roadName: 'Jl. Wolter Monginsidi',
    region: 'Kota Bandar Lampung',
    reporterName: 'Siti Rahmawati',
    reporterPhone: '082199887711',
    description: 'Dahan pohon trembesi patah diterpa angin hujan lebat sore tadi, menutupi bahu jalan arah Teluk Betung.',
    status: 'selesai',
    urgency: 'sedang',
    createdAt: '2026-11-10 15:10',
    updatedAt: '2026-11-10 16:45',
    officerNotes: 'Dahan sudah dipotong dan dibersihkan oleh Tim BPBD dan Dishub, arus normal kembali.',
    assignedOfficer: 'BPBD Kota Bandar Lampung',
    lat: -5.4320,
    lng: 105.2530
  }
];

export const INITIAL_CCTV: CCTVDevice[] = [
  {
    id: 'CCTV-BDL-01',
    name: 'CCTV Simpang MBK (Flyover Kedaton)',
    location: 'Jl. ZA. Pagar Alam x Jl. Teuku Umar',
    region: 'Kota Bandar Lampung',
    status: 'online',
    resolution: '1080p FHD 30FPS',
    ipAddress: '192.168.10.12',
    streamUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    lastPing: '1 detik lalu',
    fps: 30
  },
  {
    id: 'CCTV-BDL-02',
    name: 'CCTV Tugu Adipura (Gajah Lampung)',
    location: 'Pusat Bundaran Tugu Adipura',
    region: 'Kota Bandar Lampung',
    status: 'online',
    resolution: '4K Ultra HD',
    ipAddress: '192.168.10.15',
    streamUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    lastPing: '2 detik lalu',
    fps: 30
  },
  {
    id: 'CCTV-BDL-03',
    name: 'CCTV Gerbang Unila / Kampus Teknokrat Koridor',
    location: 'Jl. ZA. Pagar Alam Depan Teknokrat',
    region: 'Kota Bandar Lampung',
    status: 'online',
    resolution: '1080p FHD PTZ',
    ipAddress: '192.168.10.20',
    streamUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    lastPing: '1 detik lalu',
    fps: 28
  },
  {
    id: 'CCTV-LMS-01',
    name: 'CCTV Simpang Tarahan Bakauheni',
    location: 'Lintas Pesisir Bakauheni - Tarahan',
    region: 'Kabupaten Lampung Selatan',
    status: 'online',
    resolution: '1080p AI Camera',
    ipAddress: '192.168.12.05',
    streamUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    lastPing: '4 detik lalu',
    fps: 25
  }
];

export const INITIAL_IOT: IoTDevice[] = [
  { id: 'IOT-SR-01', code: 'RADAR-ZA-01', type: 'speed_radar', location: 'Jl. ZA. Pagar Alam KM 2.5', region: 'Kota Bandar Lampung', status: 'active', batteryPct: 98, lastReading: '2 menit lalu', readingValue: 'Kecepatan rata-rata: 24 km/jam' },
  { id: 'IOT-VC-02', code: 'COUNT-RADEN-INTAN', type: 'vehicle_counter', location: 'Jl. Raden Intan Dekat Mall', region: 'Kota Bandar Lampung', status: 'active', batteryPct: 92, lastReading: 'Baru saja', readingValue: 'Volume: 1.950 kend/jam' },
  { id: 'IOT-WS-03', code: 'WEATH-BYPASS-01', type: 'weather_station', location: 'By Pass Kalibalau Kencana', region: 'Kota Bandar Lampung', status: 'active', batteryPct: 88, lastReading: '5 menit lalu', readingValue: 'Suhu 29°C | Kelembaban 82% | Cuaca Gerimis' },
  { id: 'IOT-AQ-04', code: 'AQI-TUGU-ADIPURA', type: 'air_quality', location: 'Pusat Kota Bundaran Gajah', region: 'Kota Bandar Lampung', status: 'active', batteryPct: 95, lastReading: '3 menit lalu', readingValue: 'AQI 58 (Sedang/Kuning)' }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'LOG-001', timestamp: '2026-11-10 17:10:22', userName: 'Petugas Dishub (Bripka Hendra)', userRole: 'operator', action: 'UPDATE_STATUS_INCIDENT', target: 'INC-2026-001', ipAddress: '10.20.1.45', details: 'Status insiden diubah menjadi sedang ditangani, pengerahan mobil derek Polresta.' },
  { id: 'LOG-002', timestamp: '2026-11-10 17:06:14', userName: 'Operator ITS Dishub Lampung', userRole: 'operator', action: 'VERIFY_INCIDENT', target: 'INC-2026-002', ipAddress: '10.20.1.18', details: 'Laporan lampu lalu lintas mati di By Pass diverifikasi dan diteruskan ke tim teknis.' },
  { id: 'LOG-003', timestamp: '2026-11-10 16:45:00', userName: 'Admin Super Dishub', userRole: 'admin', action: 'CLOSE_INCIDENT', target: 'INC-2026-003', ipAddress: '10.20.1.2', details: 'Penanganan pohon tumbang Jl. Wolter Monginsidi dinyatakan tuntas.' },
  { id: 'LOG-004', timestamp: '2026-11-10 16:00:15', userName: 'Admin Super Dishub', userRole: 'admin', action: 'UPDATE_ROAD_CONFIG', target: 'rd-01', ipAddress: '10.20.1.2', details: 'Penyesuaian batas kecepatan zona perkotaan Jl. ZA Pagar Alam.' }
];

export const RECOMMENDED_ROUTES: RouteOption[] = [
  {
    id: 'rt-01',
    origin: 'Terminal Induk Rajabasa',
    destination: 'Kantor Gubernur Provinsi Lampung (Teluk Betung)',
    distanceKm: 12.8,
    estMinutes: 28,
    congestionLevel: 'Lancar',
    viaRoads: ['Jl. Soekarno-Hatta (By Pass)', 'Jl. Antasari', 'Jl. Diponegoro'],
    recommendationReason: 'Rute tercepat menghindari kemacetan flyover MBK dan pasar Kedaton.'
  },
  {
    id: 'rt-02',
    origin: 'Universitas Teknokrat Indonesia / Unila',
    destination: 'Pusat Kota Tugu Adipura (Tanjung Karang)',
    distanceKm: 7.2,
    estMinutes: 24,
    congestionLevel: 'Sedang',
    viaRoads: ['Jl. Teuku Umar', 'Jl. Raden Intan'],
    recommendationReason: 'Rute langsung melewati koridor utama kota dengan waktu tempuh stabil.'
  },
  {
    id: 'rt-03',
    origin: 'Pintu Tol Lematang (Itera)',
    destination: 'Pelabuhan Panjang / Kawasan Industri',
    distanceKm: 15.3,
    estMinutes: 20,
    congestionLevel: 'Lancar',
    viaRoads: ['Tol Bakauheni - Terbanggi', 'Arteri Pelabuhan Panjang'],
    recommendationReason: 'Jalur bebas hambatan khusus logistik tanpa simpang lampu merah.'
  }
];
