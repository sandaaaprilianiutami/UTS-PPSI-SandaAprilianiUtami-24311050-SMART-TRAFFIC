import React from 'react';

export const AboutScreen: React.FC = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Intro Card */}
      <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <img
            src="/LOGO PEMDA.png"
            alt="Logo Pemprov Lampung"
            style={{ height: '64px', width: 'auto', objectFit: 'contain' }}
          />
          <div style={{ width: '2px', height: '48px', backgroundColor: '#cbd5e1' }} />
          <img
            src="/LOGO TEKNO.png"
            alt="Logo Universitas Teknokrat Indonesia"
            style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
          />
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
          SMART TRAFFIC PROVINSI LAMPUNG
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
          Platform Kolaboratif Pusat Manajemen Transportasi Cerdas &amp; Rekayasa Arus Terpadu Provinsi Lampung Berbasis Civic Technology.
        </p>

        <div style={{ display: 'inline-block', backgroundColor: 'var(--primary-fixed)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.875rem' }}>
          Copyright©2026 by Sanda Apriliani Utami dan Dr. Erliyan Redy Susanto, M.Kom
        </div>
      </div>

      {/* Identitas Pengembang & Pembimbing */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '28px' }}>school</span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Pengembang Mahasiswa</h3>
          </div>
          <table style={{ fontSize: '0.875rem', width: '100%', lineHeight: 1.8 }}>
            <tbody>
              <tr>
                <td style={{ color: '#64748b', width: '120px' }}>Nama:</td>
                <td style={{ fontWeight: 700 }}>Sanda Apriliani Utami</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Program Studi:</td>
                <td>Sistem Informasi</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Fakultas:</td>
                <td>Teknik dan Ilmu Komputer (FTIK)</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Institusi:</td>
                <td style={{ fontWeight: 600, color: '#b91c1c' }}>Universitas Teknokrat Indonesia</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Mata Kuliah:</td>
                <td>Perancangan &amp; Pengembangan Sistem Informasi (PPSI)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)', fontSize: '28px' }}>workspace_premium</span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Dosen Pengampu / Pembimbing</h3>
          </div>
          <table style={{ fontSize: '0.875rem', width: '100%', lineHeight: 1.8 }}>
            <tbody>
              <tr>
                <td style={{ color: '#64748b', width: '120px' }}>Nama:</td>
                <td style={{ fontWeight: 700 }}>Dr. Erliyan Redy Susanto, M.Kom</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Jabatan:</td>
                <td>Dosen FTIK &amp; Pakar Sistem Cerdas Transportasi</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Institusi:</td>
                <td style={{ fontWeight: 600, color: '#b91c1c' }}>Universitas Teknokrat Indonesia</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Fokus Riset:</td>
                <td>Intelligent Transportation Systems (ITS) &amp; Geospasial</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b' }}>Tahun Ajaran:</td>
                <td>Semester Ganjil 2026/2027</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Arsitektur & Teknologi */}
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
          Arsitektur Sistem &amp; Kepatuhan PRD
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
          Sistem ini dirancang memenuhi seluruh spesifikasi PRD (Product Requirement Document) SMART TRAFFIC Provinsi Lampung, meliputi 52+ Functional Requirements mulai dari pemetaan GIS, manajemen insiden warga, integrasi telemetry IoT/CCTV, manajemen hak akses berbasis peran (RBAC), hingga pencatatan audit log keamanan.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.8125rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
            <strong>Frontend Engine:</strong><br />
            React 19, TypeScript, Vite, Responsive Tailwind Token Styling
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
            <strong>Visual Asset:</strong><br />
            Resmi Pemda Lampung &amp; Universitas Teknokrat Indonesia
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
            <strong>Desain Antarmuka:</strong><br />
            Memenuhi SKILL_DESAIN_SMART_TRAFFIC_LAMPUNG.md
          </div>
        </div>
      </div>

    </div>
  );
};

