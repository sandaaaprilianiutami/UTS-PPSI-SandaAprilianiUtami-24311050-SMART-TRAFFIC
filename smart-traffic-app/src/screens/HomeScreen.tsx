import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RoadSegment } from '../types';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
  onOpenReportModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenReportModal }) => {
  const { roads, incidents, cctvs, iots, setSelectedRoadId } = useApp();
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRoads = roads.filter(r => {
    const matchesRegion = filterRegion === 'all' || r.region.toLowerCase().includes(filterRegion.toLowerCase());
    const matchesSearch = searchQuery === '' || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const activeIncidents = incidents.filter(i => i.status !== 'selesai' && i.status !== 'ditolak');

  const getBadgeClass = (status: RoadSegment['status']) => {
    switch (status) {
      case 'lancar': return 'badge badge-lancar';
      case 'ramai_lancar': return 'badge badge-ramai';
      case 'padat': return 'badge badge-padat';
      case 'macet_total': return 'badge badge-macet';
      default: return 'badge';
    }
  };

  const getStatusLabel = (status: RoadSegment['status']) => {
    switch (status) {
      case 'lancar': return 'Lancar';
      case 'ramai_lancar': return 'Ramai Lancar';
      case 'padat': return 'Padat Merayap';
      case 'macet_total': return 'Macet Total';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '3rem' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #002B49 0%, #005087 55%, #00726E 100%)',
          color: '#fff',
          borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
          padding: '3.5rem 1.5rem',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', padding: '0.4rem 0.95rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem', fontSize: '0.8125rem' }}>
            <span className="live-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34d399' }} />
            <span style={{ fontWeight: 600 }}>Kolaborasi Pemerintah Provinsi Lampung &amp; Universitas Teknokrat Indonesia</span>
          </div>

          <h1 className="hero-heading" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.02em', maxWidth: '850px' }}>
            Pantau Arus Lalu Lintas, CCTV, dan Kondisi Jalan Terkini di Provinsi Lampung
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#e0f2fe', maxWidth: '720px', lineHeight: 1.6, marginBottom: '2rem' }}>
            Sistem Informasi Manajemen Lalu Lintas Terpadu yang menghubungkan data sensor kecepatan, CCTV persimpangan, rekayasa rute alternatif, dan partisipasi laporan warga secara real-time.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => onNavigate('map')}
              className="btn btn-primary"
              style={{ backgroundColor: '#fff', color: 'var(--primary)', fontWeight: 700 }}
            >
              <span className="material-symbols-outlined">map</span>
              <span>Buka Peta Interaktif</span>
            </button>
            <button
              onClick={onOpenReportModal}
              className="btn btn-teal"
              style={{ backgroundColor: '#004d49', border: '1px solid #5eead4' }}
            >
              <span className="material-symbols-outlined">campaign</span>
              <span>Laporkan Kemacetan / Gangguan</span>
            </button>
            <button
              onClick={() => onNavigate('cctv')}
              className="btn btn-secondary"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              <span className="material-symbols-outlined">videocam</span>
              <span>Live CCTV Streaming</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* KPI / Metric Highlight Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div className="card" style={{ borderLeft: '4px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>traffic</span>
            </div>
            <div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Ruas Terpantau</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>{roads.length} Ruas</h3>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Sensor Aktif 100%</span>
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--tertiary)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', backgroundColor: '#ccfbf1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--tertiary)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>videocam</span>
            </div>
            <div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Titik CCTV Online</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>{cctvs.filter(c => c.status === 'online').length} / {cctvs.length}</h3>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Live HD Stream</span>
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>warning</span>
            </div>
            <div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Insiden Ditangani</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>{activeIncidents.length} Kejadian</h3>
              <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 600 }}>Respon Tim Dishub</span>
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #6366f1', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>sensors</span>
            </div>
            <div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Telemetri IoT</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>{iots.length} Stasiun</h3>
              <span style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 600 }}>Radar &amp; Kualitas Udara</span>
            </div>
          </div>
        </div>

        {/* Live Broadcast Incident Banner */}
        {activeIncidents.length > 0 && (
          <div
            style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: 'var(--radius-md)',
              padding: '1.15rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="material-symbols-outlined" style={{ color: '#d97706', fontSize: '28px' }}>notification_important</span>
              <div>
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#92400e' }}>
                  PERHATIAN PENGENDARA: {activeIncidents[0].title}
                </span>
                <p style={{ fontSize: '0.8125rem', color: '#b45309', margin: '0.15rem 0 0 0' }}>
                  Lokasi: <strong>{activeIncidents[0].roadName}</strong> ({activeIncidents[0].region}). Petugas: {activeIncidents[0].assignedOfficer || 'Sedang menuju lokasi'}.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('map')}
              className="btn btn-secondary btn-sm"
              style={{ whiteSpace: 'nowrap', borderColor: '#f59e0b', color: '#92400e', fontWeight: 700 }}
            >
              Lihat di Peta
            </button>
          </div>
        )}

        {/* Traffic Status Table / Feed */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Kondisi Lalu Lintas Arteri &amp; Tol Lampung
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Data kecepatan rata-rata kendaraan dan estimasi volume lalu lintas per jam
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              {/* Search input */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Cari jalan..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    padding: '0.45rem 0.75rem 0.45rem 2rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8125rem',
                    width: '180px'
                  }}
                />
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '6px', top: '7px', fontSize: '16px', color: '#94a3b8' }}>
                  search
                </span>
              </div>

              {/* Region filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Wilayah:</span>
                <select
                  value={filterRegion}
                  onChange={e => setFilterRegion(e.target.value)}
                  style={{ padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                >
                  <option value="all">Semua Wilayah</option>
                  <option value="Bandar Lampung">Kota Bandar Lampung</option>
                  <option value="Lampung Selatan">Lampung Selatan</option>
                  <option value="Lampung Tengah">Lampung Tengah</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Ruas Jalan</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Wilayah</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status Arus</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Kecepatan</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Volume Kend/Jam</th>
                  <th style={{ padding: '0.75rem 1rem' }}>CCTV</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoads.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                      Tidak ditemukan ruas jalan yang cocok dengan kata kunci pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredRoads.map(road => (
                    <tr key={road.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>
                        <div>{road.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>{road.description}</div>
                      </td>
                      <td style={{ padding: '1rem', color: '#475569' }}>{road.region}</td>
                      <td style={{ padding: '1rem' }}>
                        <span className={getBadgeClass(road.status)}>
                          {getStatusLabel(road.status)}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 600, color: road.avgSpeed < 25 ? '#dc2626' : '#059669' }}>
                        {road.avgSpeed} km/jam
                      </td>
                      <td style={{ padding: '1rem', color: '#334155' }}>
                        {road.vehicleCount.toLocaleString('id-ID')} kend/j
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {road.cctvActive ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#059669', fontSize: '0.8125rem', fontWeight: 600 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>videocam</span>
                            Tersedia
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: '0.8125rem' }}>-</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => {
                            setSelectedRoadId(road.id);
                            onNavigate('map');
                          }}
                          className="btn btn-secondary btn-sm"
                        >
                          Peta
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Link Grid: CCTV & Routes */}
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* CCTV Featured Box */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Preview CCTV Simpang MBK</h3>
                <span className="badge badge-lancar">LIVE 30 FPS</span>
              </div>
              <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '220px', backgroundColor: '#000', marginBottom: '1rem' }}>
                <img
                  src={cctvs[0]?.streamUrl}
                  alt="CCTV MBK"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
                />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.75)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                  {cctvs[0]?.name} &bull; {cctvs[0]?.resolution}
                </div>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Pemantauan flyover Mal Boemi Kedaton koridor Jl. ZA. Pagar Alam menuju kampus Universitas Teknokrat Indonesia.
              </p>
            </div>
            <button
              onClick={() => onNavigate('cctv')}
              className="btn btn-primary"
              style={{ marginTop: '1.25rem', width: '100%' }}
            >
              Lihat Seluruh CCTV Provinsi Lampung ({cctvs.length})
            </button>
          </div>

          {/* Rute Alternatif Box */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Rute Cepat Anti Macet</h3>
                <span className="badge badge-lancar">Rekomendasi AI</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Gunakan rekomendasi koridor bebas hambatan untuk menghemat waktu perjalanan dinas dan logistik.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--primary)' }}>Rajabasa &rarr; Kantor Gubernur Lampung</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Via By Pass Soekarno-Hatta (28 menit - Lancar)</div>
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--primary)' }}>Teknokrat / Unila &rarr; Tugu Adipura</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Via Jl. Teuku Umar &amp; Raden Intan (24 menit - Sedang)</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('routes')}
              className="btn btn-teal"
              style={{ marginTop: '1.25rem', width: '100%' }}
            >
              Jelajahi Panduan Navigasi Lengkap
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
