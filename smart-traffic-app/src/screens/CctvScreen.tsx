import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CctvScreen: React.FC = () => {
  const { cctvs, iots } = useApp();
  const [selectedCctv, setSelectedCctv] = useState(cctvs[0]);
  const [activeTab, setActiveTab] = useState<'cctv' | 'iot'>('cctv');

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Jaringan CCTV &amp; Telemetri Sensor IoT Lalu Lintas
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Integrasi visualisasi kamera persimpangan jalan dan pemantauan sensor kondisi lingkungan/kecepatan.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('cctv')}
            className={`btn btn-sm ${activeTab === 'cctv' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Live CCTV Streaming ({cctvs.length})
          </button>
          <button
            onClick={() => setActiveTab('iot')}
            className={`btn btn-sm ${activeTab === 'iot' ? 'btn-teal' : 'btn-secondary'}`}
          >
            Sensor IoT &amp; Telemetri ({iots.length})
          </button>
        </div>
      </div>

      {activeTab === 'cctv' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          
          {/* Main Selected CCTV Player */}
          <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '420px', backgroundColor: '#000' }}>
              <img
                src={selectedCctv.streamUrl}
                alt={selectedCctv.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Live Overlay HUD */}
              <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '0.5rem' }}>
                <span style={{ backgroundColor: '#dc2626', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fff' }} />
                  LIVE REC
                </span>
                <span style={{ backgroundColor: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px' }}>
                  {selectedCctv.fps} FPS
                </span>
              </div>

              <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px', backgroundColor: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(6px)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{selectedCctv.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{selectedCctv.location} &bull; {selectedCctv.region}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem' }}>
                  <div style={{ color: '#38bdf8' }}>{selectedCctv.resolution}</div>
                  <div style={{ color: '#4ade80' }}>Ping: {selectedCctv.lastPing}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              <span>IP Internal: <code>{selectedCctv.ipAddress}</code></span>
              <span>Protokol: RTSP/HLS Video Over IP (ITS Provinsi Lampung)</span>
            </div>
          </div>

          {/* List of Cameras */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Pilih Saluran Kamera</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto' }}>
              {cctvs.map(cam => (
                <div
                  key={cam.id}
                  onClick={() => setSelectedCctv(cam)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: cam.id === selectedCctv.id ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                    backgroundColor: cam.id === selectedCctv.id ? 'var(--primary-fixed)' : '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <img
                    src={cam.streamUrl}
                    alt={cam.name}
                    style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)' }}>{cam.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{cam.location}</div>
                  </div>
                  <span className="badge badge-lancar" style={{ fontSize: '0.65rem' }}>ONLINE</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* IoT Telemetry Section */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {iots.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="badge badge-lancar">AKTIF</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Baterai: {item.batteryPct}%</span>
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{item.code}</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{item.location} ({item.region})</p>
              
              <div style={{ marginTop: 'auto', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Hasil Pembacaan Sensor</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.25rem' }}>
                  {item.readingValue}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>Terakhir: {item.lastReading}</div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

