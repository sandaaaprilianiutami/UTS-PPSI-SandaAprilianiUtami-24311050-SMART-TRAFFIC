import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RoadSegment } from '../types';

export const MapScreen: React.FC = () => {
  const { roads, incidents, selectedRoadId, setSelectedRoadId } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'padat' | 'cctv' | 'insiden'>('all');

  const selectedRoad = roads.find(r => r.id === selectedRoadId) || roads[0];

  const getStatusColor = (status: RoadSegment['status']) => {
    switch (status) {
      case 'lancar': return '#10b981';
      case 'ramai_lancar': return '#f59e0b';
      case 'padat': return '#ef4444';
      case 'macet_total': return '#991b1b';
      default: return '#6b7280';
    }
  };

  const filteredRoads = roads.filter(r => {
    if (activeFilter === 'padat') return r.status === 'padat' || r.status === 'macet_total';
    if (activeFilter === 'cctv') return r.cctvActive;
    return true;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header bar of Map Screen */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Peta Kendali &amp; Geospasial Arus Lalu Lintas Lampung
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Visualisasi koridor jalan arteri nasional, jalan provinsi, dan titik pemantauan CCTV secara interaktif.
          </p>
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveFilter('all')}
            className={`btn btn-sm ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Semua Ruas ({roads.length})
          </button>
          <button
            onClick={() => setActiveFilter('padat')}
            className={`btn btn-sm ${activeFilter === 'padat' ? 'btn-danger' : 'btn-secondary'}`}
          >
            Titik Padat / Macet ({roads.filter(r => r.status === 'padat' || r.status === 'macet_total').length})
          </button>
          <button
            onClick={() => setActiveFilter('cctv')}
            className={`btn btn-sm ${activeFilter === 'cctv' ? 'btn-teal' : 'btn-secondary'}`}
          >
            Area Ber-CCTV ({roads.filter(r => r.cctvActive).length})
          </button>
        </div>
      </div>

      {/* Main Map & Detail Panel Grid */}
      <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Interactive GIS Canvas Simulator */}
        <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Simulated Map Visual Display */}
          <div
            style={{
              height: '520px',
              backgroundColor: '#111827',
              borderRadius: 'var(--radius-md)',
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: 'radial-gradient(#1f2937 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* SVG Roads Visualization Layer */}
            <svg style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Road lines simulation */}
              {roads.map((road, idx) => {
                const isSelected = road.id === selectedRoad.id;
                const strokeColor = getStatusColor(road.status);
                const yPos = 80 + idx * 60;
                return (
                  <g key={road.id} onClick={() => setSelectedRoadId(road.id)} style={{ cursor: 'pointer' }}>
                    {/* Road line */}
                    <line
                      x1="60"
                      y1={yPos}
                      x2="520"
                      y2={yPos + (idx % 2 === 0 ? 15 : -15)}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? '10' : '6'}
                      strokeOpacity={isSelected ? '1' : '0.65'}
                      filter={isSelected ? 'url(#glow)' : undefined}
                      strokeLinecap="round"
                    />

                    {/* Animated Pulsing Ring on Selected Road */}
                    {isSelected && (
                      <circle
                        cx="280"
                        cy={yPos + (idx % 2 === 0 ? 8 : -8)}
                        r="16"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2"
                        className="pulse-marker"
                      />
                    )}

                    {/* Pin Marker */}
                    <circle
                      cx="280"
                      cy={yPos + (idx % 2 === 0 ? 8 : -8)}
                      r={isSelected ? '8' : '5'}
                      fill="#fff"
                      stroke={strokeColor}
                      strokeWidth="3"
                    />
                    <text
                      x="70"
                      y={yPos - 10}
                      fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                      fontSize={isSelected ? '13' : '11.5'}
                      fontWeight={isSelected ? '800' : '600'}
                    >
                      {road.name.split('(')[0]} ({road.avgSpeed} km/j)
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map UI Floating Controls */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(6px)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.75rem', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="live-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span><strong>GIS Center:</strong> Bandar Lampung (Lat: -5.4182, Lng: 105.2605)</span>
              </div>
            </div>

            {/* Legend Overlay */}
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(6px)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', border: '1px solid #334155' }}>
              <div style={{ fontWeight: 700, borderBottom: '1px solid #334155', paddingBottom: '0.25rem' }}>Legenda Arus Lalu Lintas</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '12px', height: '4px', backgroundColor: '#10b981', borderRadius: '2px' }} /> Lancar (&gt; 40 km/jam)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '12px', height: '4px', backgroundColor: '#f59e0b', borderRadius: '2px' }} /> Ramai Lancar (25 - 40 km/jam)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '12px', height: '4px', backgroundColor: '#ef4444', borderRadius: '2px' }} /> Padat Merayap (&lt; 25 km/jam)</div>
            </div>
          </div>

          {/* Quick list of roads below map */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {filteredRoads.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRoadId(r.id)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: r.id === selectedRoad.id ? '2px solid var(--primary)' : '1px solid #cbd5e1',
                  background: r.id === selectedRoad.id ? 'var(--primary-fixed)' : '#fff',
                  color: 'var(--text-main)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {r.name.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Road Detail Inspector Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {selectedRoad.region}
                </span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {selectedRoad.name}
                </h3>
              </div>
              <span className={`badge ${selectedRoad.status === 'lancar' ? 'badge-lancar' : selectedRoad.status === 'ramai_lancar' ? 'badge-ramai' : 'badge-padat'}`}>
                {selectedRoad.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {selectedRoad.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Kecepatan Rerata</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: selectedRoad.avgSpeed < 25 ? '#dc2626' : '#059669' }}>
                  {selectedRoad.avgSpeed} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>km/j</span>
                </div>
              </div>

              <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Volume Kendaraan</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {selectedRoad.vehicleCount} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>kend/j</span>
                </div>
              </div>

              <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Panjang Ruas</span>
                <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {selectedRoad.lengthKm} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>km</span>
                </div>
              </div>

              <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Jumlah Lajur</span>
                <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {selectedRoad.lanes} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>Lajur</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
              <span>Pembaruan: {selectedRoad.lastUpdated}</span>
              <span>CCTV: {selectedRoad.cctvActive ? 'Tersedia' : 'Belum Ada'}</span>
            </div>
          </div>

          {/* Incidents on this road */}
          <div className="card">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Laporan Gangguan di Ruas Ini
            </h4>
            {incidents.filter(i => i.roadName.includes(selectedRoad.name.split(' ')[0])).length === 0 ? (
              <p style={{ fontSize: '0.8125rem', color: '#059669', fontWeight: 500 }}>
                Tidak ada laporan kecelakaan atau hambatan aktif pada ruas jalan ini.
              </p>
            ) : (
              incidents
                .filter(i => i.roadName.includes(selectedRoad.name.split(' ')[0]))
                .map(inc => (
                  <div key={inc.id} style={{ padding: '0.75rem', backgroundColor: '#fffbeb', borderRadius: 'var(--radius-sm)', border: '1px solid #fde68a', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#92400e' }}>{inc.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#b45309', marginTop: '0.25rem' }}>{inc.description}</div>
                    <div style={{ fontSize: '0.7rem', color: '#78350f', marginTop: '0.25rem', fontWeight: 600 }}>Status: {inc.status}</div>
                  </div>
                ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
