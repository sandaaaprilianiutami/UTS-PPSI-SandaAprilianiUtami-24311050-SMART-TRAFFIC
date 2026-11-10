import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentCategory } from '../types';
import { sanitizeText, sanitizePhone, checkRateLimit } from '../utils/security';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({ isOpen, onClose }) => {
  const { addIncident, roads, regions } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IncidentCategory>('kemacetan');
  const [roadName, setRoadName] = useState(roads[0]?.name || '');
  const [region, setRegion] = useState(regions[0]?.name || '');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'rendah' | 'sedang' | 'tinggi' | 'kritis'>('sedang');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Security Check 1: Anti-Spam Rate Limiting
    const rateCheck = checkRateLimit('incident_report');
    if (!rateCheck.allowed) {
      setErrorMessage(`Batas pengiriman laporan tercapai. Harap tunggu ${rateCheck.remainingSec} detik lagi untuk mencegah spam.`);
      return;
    }

    // Security Check 2: Input Sanitization
    const cleanTitle = sanitizeText(title);
    const cleanReporter = sanitizeText(reporterName);
    const cleanPhone = sanitizePhone(reporterPhone);
    const cleanDesc = sanitizeText(description);

    if (!cleanTitle || !cleanReporter || !cleanPhone || !cleanDesc) {
      setErrorMessage('Mohon lengkapi seluruh kolom formulir dengan data yang valid.');
      return;
    }

    if (cleanPhone.length < 9) {
      setErrorMessage('Nomor handphone tidak valid. Masukkan nomor kontak aktif minimal 9 digit.');
      return;
    }

    addIncident({
      title: cleanTitle,
      category,
      roadName: sanitizeText(roadName),
      region: sanitizeText(region),
      reporterName: cleanReporter,
      reporterPhone: cleanPhone,
      description: cleanDesc,
      urgency
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setReporterName('');
      setReporterPhone('');
      setErrorMessage('');
    }, 1800);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)', fontSize: '24px' }}>campaign</span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Laporkan Kejadian / Masalah Lalu Lintas
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {errorMessage && (
          <div style={{ margin: '1rem 1.5rem 0 1.5rem', padding: '0.75rem 1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', color: '#dc2626', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {isSuccess ? (
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>check_circle</span>
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#15803d', marginBottom: '0.5rem' }}>
              Laporan Berhasil Dikirimkan!
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Terima kasih atas partisipasi Anda. Petugas ITS Dishub Lampung segera memvalidasi laporan dan mengarahkan personel ke lokasi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Judul Laporan *
              </label>
              <input
                type="text"
                placeholder="Contoh: Truk mogok menutup lajur flyover MBK"
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={100}
                required
                style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Kategori Insiden
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as IncidentCategory)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                >
                  <option value="kemacetan">Kemacetan Parah</option>
                  <option value="kecelakaan">Kecelakaan Lalu Lintas</option>
                  <option value="lampu_lalin">Lampu Traffic Light Padam / Rusak</option>
                  <option value="jalan_rusak">Jalan Berlubang / Amblas</option>
                  <option value="bencana_alam">Bencana Alam / Pohon Tumbang</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Tingkat Urgensi
                </label>
                <select
                  value={urgency}
                  onChange={e => setUrgency(e.target.value as any)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                >
                  <option value="rendah">Rendah (Dapat dipantau)</option>
                  <option value="sedang">Sedang (Hambatan wajar)</option>
                  <option value="tinggi">Tinggi (Menutup lajur utama)</option>
                  <option value="kritis">Kritis (Korban jiwa / darurat)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Wilayah / Kabupaten / Kota
                </label>
                <select
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                >
                  {regions.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Lokasi Ruas Jalan
                </label>
                <input
                  type="text"
                  list="roads-list"
                  placeholder="Nama jalan atau pilih..."
                  value={roadName}
                  onChange={e => setRoadName(e.target.value)}
                  maxLength={120}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                />
                <datalist id="roads-list">
                  {roads.map(r => (
                    <option key={r.id} value={r.name} />
                  ))}
                </datalist>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Nama Pelapor *
                </label>
                <input
                  type="text"
                  placeholder="Nama lengkap Anda"
                  value={reporterName}
                  onChange={e => setReporterName(e.target.value)}
                  maxLength={60}
                  required
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  No. Handphone / WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={reporterPhone}
                  onChange={e => setReporterPhone(e.target.value)}
                  maxLength={20}
                  required
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Deskripsi & Kronologi Kejadian *
              </label>
              <textarea
                rows={3}
                placeholder="Jelaskan titik patokan terdekat, arah jalur yang terhambat, dan kondisi terkini..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                maxLength={500}
                required
                style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn btn-teal">
                Kirim Laporan Resmi
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
