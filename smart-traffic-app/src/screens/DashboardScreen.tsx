import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentReport, RoadSegment } from '../types';
import { maskPhoneNumber, sanitizeText } from '../utils/security';

export const DashboardScreen: React.FC = () => {
  const {
    currentUser,
    roads,
    regions,
    incidents,
    updateIncidentStatus,
    updateRoadStatus,
    addRoadSegment,
    deleteRoadSegment,
    auditLogs
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'insiden' | 'jalan' | 'audit'>('insiden');

  // Road modal form state
  const [showAddRoadModal, setShowAddRoadModal] = useState(false);
  const [newRoadName, setNewRoadName] = useState('');
  const [newRoadRegion, setNewRoadRegion] = useState(regions[0]?.name || '');
  const [newRoadLength, setNewRoadLength] = useState(5.0);
  const [newRoadLanes, setNewRoadLanes] = useState(4);
  const [newRoadDesc, setNewRoadDesc] = useState('');

  // Selected incident for action
  const [selectedInc, setSelectedInc] = useState<IncidentReport | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [actionOfficer, setActionOfficer] = useState('');

  const handleCreateRoad = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeText(newRoadName);
    if (!cleanName) return;
    addRoadSegment({
      name: cleanName,
      region: sanitizeText(newRoadRegion),
      lengthKm: Number(newRoadLength),
      lanes: Number(newRoadLanes),
      status: 'lancar',
      avgSpeed: 45,
      vehicleCount: 1200,
      cctvActive: false,
      coordinates: [-5.4000, 105.2600],
      description: sanitizeText(newRoadDesc) || 'Ruas arteri baru ditambahkan oleh administrator.'
    });
    setShowAddRoadModal(false);
    setNewRoadName('');
    setNewRoadDesc('');
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Banner Operasional */}
      <div style={{ backgroundColor: '#005087', color: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#38bdf8' }}>admin_panel_settings</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#bae6fd' }}>
              PUSAT KENDALI OPERASIONAL (ITS CONTROL CENTER)
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            Panel Pengelolaan Lalu Lintas &amp; Validasi Insiden
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#e0f2fe' }}>
            Operator Masuk: <strong>{currentUser.name}</strong> ({currentUser.agency}) &bull; Wewenang: {currentUser.role.toUpperCase()}
          </p>
        </div>

        {/* Tab switchers within Dashboard */}
        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.15)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
          <button
            onClick={() => setActiveSubTab('insiden')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeSubTab === 'insiden' ? '#fff' : 'transparent',
              color: activeSubTab === 'insiden' ? 'var(--primary)' : '#fff',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer'
            }}
          >
            Manajemen Insiden ({incidents.length})
          </button>
          <button
            onClick={() => setActiveSubTab('jalan')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeSubTab === 'jalan' ? '#fff' : 'transparent',
              color: activeSubTab === 'jalan' ? 'var(--primary)' : '#fff',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer'
            }}
          >
            Kelola Ruas Jalan ({roads.length})
          </button>
          <button
            onClick={() => setActiveSubTab('audit')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeSubTab === 'audit' ? '#fff' : 'transparent',
              color: activeSubTab === 'audit' ? 'var(--primary)' : '#fff',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer'
            }}
          >
            Audit Log Aktivitas ({auditLogs.length})
          </button>
        </div>
      </div>

      {/* Subtab 1: Manajemen Insiden */}
      {activeSubTab === 'insiden' && (
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: selectedInc ? '1.5fr 1fr' : '1fr', gap: '1.5rem' }}>
          
          <div className="card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
              Daftar Laporan Masyarakat &amp; Status Penanganan
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.75rem 0.5rem' }}>ID</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Judul &amp; Lokasi</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Pelapor</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Urgensi</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map(inc => (
                    <tr key={inc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {inc.id}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <div style={{ fontWeight: 600 }}>{inc.title}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{inc.roadName} ({inc.region})</div>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <div>{inc.reporterName}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                          {currentUser.role === 'admin' || currentUser.role === 'operator'
                            ? inc.reporterPhone
                            : maskPhoneNumber(inc.reporterPhone)}
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          color: inc.urgency === 'kritis' || inc.urgency === 'tinggi' ? '#dc2626' : '#d97706'
                        }}>
                          {inc.urgency}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <span className={`badge ${inc.status === 'selesai' ? 'badge-lancar' : inc.status === 'sedang_ditangani' ? 'badge-ramai' : 'badge-padat'}`}>
                          {inc.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                        <button
                          onClick={() => {
                            setSelectedInc(inc);
                            setActionNotes(inc.officerNotes || '');
                            setActionOfficer(inc.assignedOfficer || '');
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          Kelola
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Incident Quick Management Drawer / Box */}
          {selectedInc && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--tertiary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>
                  Aksi Penanganan: {selectedInc.id}
                </h4>
                <button onClick={() => setSelectedInc(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div style={{ fontSize: '0.8125rem', backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <strong>Kronologi Laporan:</strong>
                <p style={{ marginTop: '0.25rem', color: '#334155' }}>{selectedInc.description}</p>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>Dibuat pada: {selectedInc.createdAt}</div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Petugas Lapangan / Unit Ditugaskan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bripka Hendra / Dishub Regu B"
                  value={actionOfficer}
                  onChange={e => setActionOfficer(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Catatan Tindak Lanjut Petugas
                </label>
                <textarea
                  rows={3}
                  placeholder="Keterangan evakuasi armada, pengalihan arus lajur, atau sinkronisasi..."
                  value={actionNotes}
                  onChange={e => setActionNotes(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Ubah Status Insiden:</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      updateIncidentStatus(selectedInc.id, 'terverifikasi', actionNotes, actionOfficer);
                      setSelectedInc(null);
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Verifikasi Laporan
                  </button>
                  <button
                    onClick={() => {
                      updateIncidentStatus(selectedInc.id, 'sedang_ditangani', actionNotes, actionOfficer);
                      setSelectedInc(null);
                    }}
                    className="btn btn-teal btn-sm"
                  >
                    Sedang Ditangani
                  </button>
                  <button
                    onClick={() => {
                      updateIncidentStatus(selectedInc.id, 'selesai', actionNotes, actionOfficer);
                      setSelectedInc(null);
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Tandai Selesai
                  </button>
                  <button
                    onClick={() => {
                      updateIncidentStatus(selectedInc.id, 'ditolak', actionNotes, actionOfficer);
                      setSelectedInc(null);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Tolak / Hoaks
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* Subtab 2: Kelola Ruas Jalan */}
      {activeSubTab === 'jalan' && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                Pengaturan Kondisi &amp; Ruas Jalan (CRUD)
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Ubah parameter kecepatan aktual, volume lalu lintas, atau tambahkan ruas arteri baru.
              </p>
            </div>
            <button onClick={() => setShowAddRoadModal(true)} className="btn btn-primary btn-sm">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
              <span>Tambah Ruas Baru</span>
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>ID</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Nama Ruas</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Wilayah</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Status Arus</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Kecepatan</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Volume Kend/J</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Tindakan Cepat</th>
                </tr>
              </thead>
              <tbody>
                {roads.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>{r.id}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{r.name}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{r.region}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <select
                        value={r.status}
                        onChange={e => updateRoadStatus(r.id, e.target.value as RoadSegment['status'], r.avgSpeed, r.vehicleCount)}
                        style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.75rem' }}
                      >
                        <option value="lancar">Lancar</option>
                        <option value="ramai_lancar">Ramai Lancar</option>
                        <option value="padat">Padat</option>
                        <option value="macet_total">Macet Total</option>
                      </select>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <input
                        type="number"
                        value={r.avgSpeed}
                        onChange={e => updateRoadStatus(r.id, r.status, Number(e.target.value), r.vehicleCount)}
                        style={{ width: '60px', padding: '0.25rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.75rem' }}
                      /> km/j
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <input
                        type="number"
                        value={r.vehicleCount}
                        onChange={e => updateRoadStatus(r.id, r.status, r.avgSpeed, Number(e.target.value))}
                        style={{ width: '80px', padding: '0.25rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.75rem' }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                      <button
                        onClick={() => {
                          if (confirm(`Yakin ingin menghapus ${r.name}?`)) {
                            deleteRoadSegment(r.id);
                          }
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#dc2626' }}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 3: Audit Log Aktivitas */}
      {activeSubTab === 'audit' && (
        <div className="card">
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
              Sistem Audit Trail &amp; Keamanan Sesi
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Merekam setiap tindakan operator, penyesuaian arus, penanganan insiden, dan penambahan data secara kronologis.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Timestamp</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Pengguna</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Role</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Tindakan</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Target</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Detail Aktivitas</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem 0.5rem', color: '#64748b' }}>{log.timestamp}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{log.userName}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <span className="badge badge-lancar" style={{ fontSize: '0.65rem' }}>{log.userRole}</span>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600, color: 'var(--primary)' }}>{log.action}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{log.target}</td>
                    <td style={{ padding: '0.75rem 0.5rem', color: '#334155' }}>{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add Road Segment */}
      {showAddRoadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Tambah Ruas Jalan Arteri Baru</h3>
              <button onClick={() => setShowAddRoadModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateRoad} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>Nama Ruas Jalan *</label>
                <input
                  type="text"
                  placeholder="Contoh: Jl. Lintas Timur Simpang Bakauheni"
                  value={newRoadName}
                  onChange={e => setNewRoadName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>Wilayah Administratif</label>
                  <select
                    value={newRoadRegion}
                    onChange={e => setNewRoadRegion(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                  >
                    {regions.map(r => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>Panjang (KM)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRoadLength}
                    onChange={e => setNewRoadLength(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>Jumlah Lajur</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={newRoadLanes}
                  onChange={e => setNewRoadLanes(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>Deskripsi Koridor</label>
                <textarea
                  rows={2}
                  placeholder="Fungsi arteri, kawasan sekitar..."
                  value={newRoadDesc}
                  onChange={e => setNewRoadDesc(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setShowAddRoadModal(false)} className="btn btn-secondary">Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Ruas Baru</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
