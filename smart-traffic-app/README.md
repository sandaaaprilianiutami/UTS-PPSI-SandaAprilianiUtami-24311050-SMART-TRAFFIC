# 🎪 FestivalKu Bandar Lampung

> **Platform Terpadu Festival, Event Kota, UMKM, Tiket Digital & Transparansi Keuangan Daerah Kota Bandar Lampung.**

Dibangun berdasarkan dokumen kebutuhan produk (**PRD FestivalKu v1.0**) dan panduan desain resmi (**14 Screen Master Architecture**).

---

## 🚀 Fitur Utama & 14 Screen Terpadu

1. **Homepage Publik:** Showcase festival resmi, filter kategori & kecamatan, agenda, dan section transparansi PAD.
2. **Eksplorasi & Detail Festival:** Katalog acara lengkap, rundown, kuota stan UMKM, pilihan tiket, dan kebijakan refund.
3. **Portal Autentikasi:** Registrasi multi-peran dengan alur verifikasi NIB OSS & NPWP untuk EO/Penyelenggara.
4. **Checkout & Tiket Digital:** Pembayaran QRIS & VA Bank Lampung, tiket QR dinamis anti-duplikasi, & pengajuan refund.
5. **Dashboard EO/Penyelenggara:** Metrik operasional (tiket terjual, kehadiran fisik, okupansi stan 90%, pendapatan bruto).
6. **Verifikasi Penyelenggara:** Super Admin Diskominfo memeriksa keabsahan legalitas EO sebelum publikasi festival.
7. **Manajemen Acara:** Pembuatan event, kurasi jadwal oleh Dispar, konfigurasi kuota tiket, dan potensi PAD.
8. **Manajemen Tenant & Stan:** Denah interaktif booth Lapangan Saburai (Zona Seruit, Kriya Tapis, Kopi Robusta).
9. **Validasi Tiket & Gate QR:** Pemindai kamera gate masuk dengan proteksi pemakaian ganda + input manual cadangan.
10. **Dashboard Keuangan & PAD:** Pemisahan rekening ketat: Penerimaan EO, Biaya Platform (3%), Potensi PAD, dan Realisasi STS Bapenda.
11. **Buku Transaksi & Rekonsiliasi:** Pencatatan mutasi kas, upload kuitansi sewa fasilitas, dan pengesahan PAD.
12. **Sponsor & Fasilitas Venue:** Kemitraan sponsor (Bank Lampung dsb), inventaris sewa panggung & genset daerah.
13. **Pusat Laporan & Audit Log:** Generator dokumen PDF/A resmi ber-kop Pemkot Bandar Lampung dan jejak audit aktivitas.
14. **Dashboard Eksekutif Walikota:** Evaluasi performa lintas festival tingkat kota dan integrasi SIPD/QRIS.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend:** React 19, TypeScript
- **Bundler:** Vite
- **Desain & Gaya:** Vanilla CSS Design Tokens (Sesuai `skill-desain-festivalku.md`)
- **Tipografi:** Google Fonts *Plus Jakarta Sans* & *Work Sans*
- **Ikon:** Google Material Symbols Outlined
- **Fitur Tambahan:** `jspdf` (Ekspor Berita Acara PDF), `canvas-confetti` (Animasi Sukses Tiket)

---

## 📦 Menjalankan Proyek Secara Lokal

1. **Kloning Repositori:**
   ```bash
   git clone <URL_REPOSITORY_ANDA>
   cd festivalku-app
   ```

2. **Instalasi Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000/`.

4. **Build untuk Produksi:**
   ```bash
   npm run build
   ```

---

## 🌐 Panduan Deploy ke Vercel

Aplikasi ini sudah dilengkapi dengan file [`vercel.json`](file:///d:/mata%20kuliah/SEMESTER%205/PPSI/festivalku-app/vercel.json) untuk mendukung SPA Routing (Single Page Application) dan header keamanan.

### Cara 1: Deploy Langsung via GitHub (Sangat Disarankan)
1. Push proyek ini ke repository GitHub Anda (bisa public atau private).
2. Buka dashboard [Vercel](https://vercel.com/) dan login menggunakan akun GitHub.
3. Klik **"Add New"** > **"Project"**.
4. Pilih repository `festivalku-app` yang baru saja Anda push.
5. Konfigurasi proyek:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (atau `festivalku-app` jika disimpan dalam subfolder)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Klik **"Deploy"**. Dalam hitungan detik, aplikasi Anda sudah live dengan domain gratis `*.vercel.app` dan sertifikat SSL otomatis!

### Cara 2: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```
Ikuti instruksi di terminal, pilih konfigurasi default, dan aplikasi akan langsung terunggah.

---

## 🏛️ Kepatuhan Regulasi Daerah
Sistem FestivalKu dibangun dengan prinsip pemisahan data yang ketat: transaksi swasta tidak serta-merta diklaim sebagai Pendapatan Asli Daerah (PAD). Hak PAD hanya diakui setelah terbitnya Surat Tanda Setoran (STS) resmi yang diverifikasi oleh pejabat Badan Pendapatan Daerah (Bapenda) Kota Bandar Lampung.
