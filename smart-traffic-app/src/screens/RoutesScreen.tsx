import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const RoutesScreen: React.FC = () => {
  const { routes } = useApp();
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Rekomendasi Rute &amp; Koridor Cepat Lampung
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Panduan navigasi cerdas menghindari simpul kemacetan pasar tumpah, perlintasan KA, dan antrean lampu merah.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* List of recommended routes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Pilihan Koridor Rute</h3>
          {routes.map(r => (
            <div
              key={r.id}
              onClick={() => setSelectedRoute(r)}
              className="card"
              style={{
                cursor: 'pointer',
                borderColor: r.id === selectedRoute.id ? 'var(--primary)' : '#e2e8f0',
                backgroundColor: r.id === selectedRoute.id ? '#f0f7ff' : '#fff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className={`badge ${r.congestionLevel === 'Lancar' ? 'badge-lancar' : 'badge-ramai'}`}>
                  Status: {r.congestionLevel}
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}>
                  Est. {r.estMinutes} Menit ({r.distanceKm} km)
                </span>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                {r.origin} &rarr; {r.destination}
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {r.recommendationReason}
              </p>
            </div>
          ))}
        </div>

        {/* Selected Route Detailed Itinerary */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Detail Navigasi Terpilih
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
              {selectedRoute.origin} Menuju {selectedRoute.destination}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Estimasi Waktu</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>
                {selectedRoute.estMinutes} Menit
              </div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Jarak</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {selectedRoute.distanceKm} KM
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Ruas Jalan Yang Dilewati:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {selectedRoute.viaRoads.map((road, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontWeight: 600 }}>{road}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#ecfdf5', borderRadius: 'var(--radius-sm)', border: '1px solid #a7f3d0', fontSize: '0.8125rem', color: '#065f46' }}>
            <strong>Alasan Rekomendasi Sistem:</strong><br />
            {selectedRoute.recommendationReason}
          </div>
        </div>

      </div>

    </div>
  );
};

