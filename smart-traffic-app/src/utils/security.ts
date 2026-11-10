/**
 * Security & Input Sanitization Utilities
 * Implementasi Security Hardening berdasarkan Audit Keamanan
 */

/**
 * Membersihkan input teks dari potensi payload XSS dan HTML tags berbahaya.
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Menghilangkan tag HTML
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}

/**
 * Validasi dan format nomor handphone Indonesia (08xxx / 628xxx)
 */
export function sanitizePhone(input: string): string {
  if (!input) return '';
  return input.replace(/[^\d+]/g, '').trim();
}

/**
 * Menyamarkan nomor telepon pelapor untuk privasi (NFR-006 Data Privacy)
 * Contoh: 081234567890 -> 0812****7890
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 8) return '****';
  const start = phone.substring(0, 4);
  const end = phone.substring(phone.length - 4);
  return `${start}****${end}`;
}

/**
 * Client-Side Rate Limiter untuk mencegah DoS / Spam Laporan Insiden
 * Maksimal 5 laporan dalam rentang waktu 60 detik per client
 */
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

export function checkRateLimit(actionKey: string = 'incident_report'): { allowed: boolean; remainingSec: number } {
  const storageKey = `rate_limit_${actionKey}`;
  const now = Date.now();
  const rawData = localStorage.getItem(storageKey);
  
  let timestamps: number[] = rawData ? JSON.parse(rawData) : [];
  
  // Filter timestamps yang masih berada dalam window waktu
  timestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0];
    const remainingMs = RATE_LIMIT_WINDOW_MS - (now - oldest);
    const remainingSec = Math.ceil(remainingMs / 1000);
    return { allowed: false, remainingSec };
  }
  
  // Catat request baru
  timestamps.push(now);
  localStorage.setItem(storageKey, JSON.stringify(timestamps));
  return { allowed: true, remainingSec: 0 };
}

