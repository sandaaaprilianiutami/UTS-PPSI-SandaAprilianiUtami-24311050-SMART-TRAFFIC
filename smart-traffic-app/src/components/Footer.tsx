import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0F172A',
        color: '#94A3B8',
        borderTop: '1px solid #1E293B',
        marginTop: 'auto',
        fontSize: '0.875rem'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '3rem 1.5rem 1.5rem 1.5rem'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Identity & Collab */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img
                src="/LOGO PEMDA.png"
                alt="Logo Pemprov Lampung"
                style={{ height: '42px', width: 'auto', backgroundColor: '#fff', padding: '3px', borderRadius: '4px' }}
              />
              <img
                src="/LOGO TEKNO.png"
                alt="Logo Universitas Teknokrat Indonesia"
                style={{ height: '42px', width: 'auto', backgroundColor: '#fff', padding: '3px', borderRadius: '4px' }}
              />
            </div>
            <h3 style={{ color: '#F8FAFC', fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              SMART TRAFFIC PROVINSI LAMPUNG
            </h3>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: '#94A3B8' }}>
              Platform Pusat Manajemen Transportasi Cerdas & Rekayasa Arus Terpadu. Inovasi kolaboratif berbasis civic technology antara Pemerintah Provinsi Lampung dan Universitas Teknokrat Indonesia.
            </p>
          </div>

          {/* Navigasi Layanan */}
          <div>
            <h4 style={{ color: '#F8FAFC', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Layanan Utama
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <li>&bull; Pemantauan CCTV Real-Time & AI Traffic Counter</li>
              <li>&bull; Pelaporan Insiden & Hambatan Lalu Lintas Masyarakat</li>
              <li>&bull; Rekomendasi Rute Evakuasi & Jalur Logistik Cepat</li>
              <li>&bull; Telemetri Sensor Cuaca & Kualitas Udara (AQI)</li>
              <li>&bull; Integrasi Peta Kendali GIS Dinas Perhubungan</li>
            </ul>
          </div>

          {/* Posko & Kontak Darurat */}
          <div>
            <h4 style={{ color: '#F8FAFC', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Posko Terpadu & Call Center
            </h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
              <strong>Pusat Kendali ITS Dinas Perhubungan Prov. Lampung</strong><br />
              Jl. Wolter Monginsidi No. 69, Teluk Betung, Bandar Lampung<br />
              <span style={{ color: '#38BDF8' }}>Emergency Hotline: 112 / (0721) 481-123</span><br />
              Email: smarttraffic@lampungprov.go.id
            </p>
          </div>

          {/* Kolaborasi Akademik */}
          <div>
            <h4 style={{ color: '#F8FAFC', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Kemitraan Akademik
            </h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
              <strong>Universitas Teknokrat Indonesia</strong><br />
              Fakultas Teknik dan Ilmu Komputer (FTIK)<br />
              Jl. ZA. Pagar Alam No. 9-11, Labuhan Ratu, Bandar Lampung<br />
              Website: <a href="https://teknokrat.ac.id" target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'none' }}>teknokrat.ac.id</a>
            </p>
          </div>
        </div>

        {/* Mandatory Copyright Bar */}
        <div
          style={{
            borderTop: '1px solid #1E293B',
            paddingTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0.5rem'
          }}
        >
          <p
            style={{
              color: '#F8FAFC',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.01em'
            }}
          >
            Copyright©2026 by Sanda Apriliani Utami dan Dr.&nbsp;Erliyan Redy Susanto, M.Kom
          </p>
          <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
            Seluruh hak cipta dilindungi undang-undang. Dokumen dan aplikasi ini disusun untuk Ujian Tengah Semester (UTS) Perancangan dan Pengembangan Sistem Informasi (PPSI).
          </p>
        </div>
      </div>
    </footer>
  );
};

