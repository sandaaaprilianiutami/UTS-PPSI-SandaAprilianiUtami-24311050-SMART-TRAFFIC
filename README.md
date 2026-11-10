# SMART TRAFFIC Provinsi Lampung - UTS PPSI

> **Sistem Informasi Terpadu Pemantauan CCTV, Kondisi Ruas Jalan, Sensor IoT, Laporan Insiden dan Rute Cepat Kolaborasi Pemda Lampung & Universitas Teknokrat Indonesia.**

Proyek ini disusun untuk memenuhi **Ujian Tengah Semester (UTS) Perancangan & Pengembangan Sistem Informasi (PPSI)**.
- **Nama Mahasiswa:** Sanda Apriliani Utami
- **NPM:** 24311050
- **Dosen Pengampu:** Dr. Erliyan Redy Susanto, M.Kom
- **Institusi:** Universitas Teknokrat Indonesia

---

## 🚀 Fitur Utama Sistem

1. **Branding Resmi Pemda Lampung & Teknokrat:** Menampilkan logo resmi kedua institusi secara proporsional dan teks hak cipta wajib: `Copyright©2026 by Sanda Apriliani Utami dan Dr. Erliyan Redy Susanto, M.Kom`.
2. **Peta Kendali & Geospasial Arus Lalu Lintas:** Peta visual status ruas jalan (Lancar, Ramai Lancar, Padat Merayap, Macet Total) dengan animasi pulse ring marker pada koridor yang aktif.
3. **Integrasi CCTV Streaming & Sensor IoT:** Pemantauan kamera persimpangan jalan (Simpang MBK, Tugu Adipura, dsb.) dan telemetri sensor kecepatan serta cuaca.
4. **Partisipasi Laporan Insiden Warga:** Formulir pelaporan kejadian dengan validasi input, sanitasi XSS, dan anti-spam rate limiting.
5. **Rekomendasi Rute Cepat:** Rekayasa panduan perjalanan menghindari titik kemacetan pasar tumpah dan perlintasan sebidang KA.
6. **Dashboard Operasional & Audit Trail:** Panel kendali penanganan insiden, verifikasi laporan, modifikasi arus jalan (CRUD), dan pencatatan audit log keamanan (NFR-010).

---

## 🌐 Panduan Deploy ke Vercel (1-Click via GitHub)

Proyek ini sudah dilengkapi konfigurasi [`vercel.json`](file:///d:/mata%20kuliah/SEMESTER%205/PPSI/UTS-PPSI/smart-traffic-app/vercel.json) dengan proteksi *Content-Security-Policy (CSP)* dan *SPA Routing*.

### Langkah Deploy:
1. Pastikan repositori GitHub Anda sudah terhubung: `https://github.com/sandaaaprilianiutami/UTS-PPSI-SandaAprilianiUtami-24311050-SMART-TRAFFIC`
2. Buka [https://vercel.com/new](https://vercel.com/new) dan login dengan akun GitHub Anda.
3. Klik **Import** pada repositori `UTS-PPSI-SandaAprilianiUtami-24311050-SMART-TRAFFIC`.
4. Atur **Root Directory**:
   - Klik tombol **Edit** di samping Root Directory, pilih folder `smart-traffic-app`.
5. Pengaturan Build & Output:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Klik **Deploy**.
7. Dalam kurun waktu 1 menit, aplikasi website live di domain `https://uts-ppsi-smart-traffic.vercel.app`.

---

## 📄 Berkas Laporan Resmi (.docx)

- [Laporan Testing & Debugging (.docx)](file:///d:/mata%20kuliah/SEMESTER%205/PPSI/UTS-PPSI/Laporan_Testing_dan_Debugging_SMART_TRAFFIC_Lampung.docx)
- [Laporan Audit Security (.docx)](file:///d:/mata%20kuliah/SEMESTER%205/PPSI/UTS-PPSI/Laporan_Audit_Security_SMART_TRAFFIC_Lampung.docx)
