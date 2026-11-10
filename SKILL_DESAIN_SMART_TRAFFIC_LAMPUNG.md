---
name: smart-traffic-lampung-design
description: Panduan desain UI/UX untuk membangun dan mengembangkan SMART TRAFFIC Provinsi Lampung berdasarkan kode HTML/Tailwind yang diberikan. Gunakan saat membuat halaman, komponen, dashboard, formulir, peta, atau memperbaiki konsistensi visual aplikasi.
---

# Skill Desain UI/UX — SMART TRAFFIC Provinsi Lampung

## 1. Peran Skill

Bertindak sebagai UI/UX Designer sekaligus Frontend Design Specialist untuk aplikasi **SMART TRAFFIC Provinsi Lampung**. Hasil desain harus terasa seperti portal layanan publik dan pusat kendali transportasi cerdas: resmi, terpercaya, informatif, modern, rapi, dan mudah digunakan.

Jadikan kode sumber yang diberikan sebagai acuan utama. Pertahankan identitas visual, bahasa antarmuka, pola navigasi, komponen, serta nuansa sistem yang sudah ada. Jangan mengubah konsep menjadi template dashboard generik.

## 2. Identitas dan Tujuan Produk

- **Nama produk:** SMART TRAFFIC Provinsi Lampung.
- **Konteks:** Sistem informasi manajemen lalu lintas terpadu Provinsi Lampung.
- **Identitas kolaborasi yang tampil pada antarmuka:** Pemerintah Provinsi Lampung dan Universitas Teknokrat Indonesia.
- **Fokus layanan:** pemantauan CCTV dan sensor IoT, kondisi arus lalu lintas, peta GIS, pelaporan insiden masyarakat, rekomendasi rute, serta pemantauan dan analitik operasional.
- **Pengguna utama:** masyarakat/pengendara, operator atau petugas Dishub, dan pejabat/pimpinan pemerintah daerah.
- **Bahasa UI:** Bahasa Indonesia yang jelas, formal, ringkas, dan mudah dipahami.

Jangan menyajikan angka, status live, jumlah CCTV, waktu respons, atau data insiden sebagai data faktual apabila hanya berupa contoh/mockup. Tandai data demonstrasi dengan jelas atau gunakan data aktual dari sumber aplikasi.

## 3. Prinsip Desain

1. **Civic technology:** tampil resmi dan profesional, bukan seperti aplikasi hiburan atau e-commerce.
2. **Data-first:** informasi kondisi jalan, lokasi, waktu, status, dan dampak harus mudah dipindai.
3. **Hierarki jelas:** judul halaman, ringkasan, visual utama, detail, lalu tindakan.
4. **Keterbacaan:** hindari teks terlalu kecil, kontras rendah, dan paragraf panjang.
5. **Konsistensi:** gunakan token warna, tipografi, radius, jarak, tombol, badge, dan pola kartu yang sama.
6. **Aksi yang jelas:** tombol harus menggunakan kata kerja spesifik seperti “Lihat Peta”, “Kirim Laporan”, “Terapkan Filter”, atau “Ekspor Laporan”.
7. **Responsif:** semua halaman harus tetap nyaman pada desktop, tablet, dan ponsel.
8. **Kepercayaan publik:** bedakan informasi terverifikasi petugas, laporan warga, data simulasi, dan data real-time.

## 4. Design System

### 4.1 Palet Warna

Gunakan palet biru, teal, dan netral yang sudah ditetapkan di Tailwind config.

| Token | Hex | Fungsi |
|---|---|---|
| `primary` | `#005087` | Warna utama, tombol primer, tautan aktif |
| `primary-container` | `#1769AA` | Variasi biru untuk hover/elemen aktif |
| `primary-fixed` | `#D1E4FF` | Latar badge/informasi biru muda |
| `secondary` | `#4D5F7D` | Warna pendamping dan teks sekunder |
| `secondary-container` | `#C8DBFE` | Latar informasi sekunder |
| `tertiary` | `#005854` | Aksi/indikator positif dan elemen teal |
| `tertiary-container` | `#00726E` | Status aktif/normal |
| `tertiary-fixed` | `#7EF6EE` | Sorotan teal lembut |
| `surface` | `#F7F9FC` | Latar halaman |
| `surface-container-low` | `#F2F4F7` | Latar section sekunder |
| `surface-container` | `#ECEEF1` | Panel, toolbar, dan latar kontrol |
| `surface-container-high` | `#E6E8EB` | Panel dengan penekanan lebih tinggi |
| `surface-container-lowest` | `#FFFFFF` | Kartu dan permukaan utama |
| `on-surface` | `#191C1E` | Teks utama |
| `on-surface-variant` | `#414750` | Teks pendukung |
| `outline` | `#717781` | Label sekunder dan ikon nonaktif |
| `outline-variant` | `#C1C7D2` | Garis batas |
| `error` | `#BA1A1A` | Insiden kritis/peringatan |
| `error-container` | `#FFDAD6` | Latar status kritis |

Pedoman penggunaan status:
- **Lancar/normal/selesai:** teal atau hijau kebiruan.
- **Padat/waspada/perlu perhatian:** biru sekunder atau warna amber yang konsisten.
- **Macet/kritis/insiden aktif:** merah.
- Jangan mengandalkan warna saja; selalu sertakan teks status dan/atau ikon.
- Gunakan merah hanya untuk kondisi yang benar-benar membutuhkan perhatian.

### 4.2 Tipografi

- **Font utama:** Inter (Google Fonts).
- **Judul utama desktop:** 32 px, line-height 40 px, weight 700.
- **Judul utama mobile:** 24 px, line-height 32 px, weight 700.
- **Judul section:** 20–24 px, weight 600–700.
- **Judul kartu:** 16 px, line-height 24 px, weight 600.
- **Body utama:** 14 px, line-height 20 px.
- **Body besar:** 16 px, line-height 24 px.
- **Label:** 11–13 px, weight 600; gunakan uppercase seperlunya.
- **Angka metrik:** 36 px, line-height 44 px, weight 700.
- Gunakan angka/tabular style untuk waktu, kecepatan, persentase, dan metrik agar mudah dibandingkan.
- Hindari penggunaan terlalu banyak ukuran font dalam satu layar.

### 4.3 Spacing dan Radius

Gunakan skala dasar 4 px:
- `space-xs`: 4 px
- `space-sm`: 8 px
- `space-md`: 16 px
- `space-lg`: 24 px
- `space-xl`: 32 px
- `margin`: 16 px
- `margin-desktop`: 32 px
- `gutter`: 16 px
- `gutter-desktop`: 24 px

Radius:
- Default: 2 px
- `lg`: 4 px
- `xl`: 8 px
- `full`: 12 px

Gunakan radius 8–12 px untuk kartu utama dan panel. Jangan mencampur radius besar secara acak.

### 4.4 Elevation dan Border

- Kartu menggunakan bayangan halus, bukan shadow tebal.
- Pisahkan section dengan variasi surface, bukan garis tebal di setiap tempat.
- Border memakai `outline-variant` dengan opacity rendah.
- Gunakan blur/transparansi hanya untuk overlay peta, HUD, atau panel yang memang berada di atas media.

### 4.5 Ikon

- Gunakan **Material Symbols Outlined**.
- Ikon harus konsisten ukuran dan gaya.
- Contoh ikon: `dashboard`, `map`, `warning`, `videocam`, `route`, `campaign`, `traffic`, `location_on`, `filter_list`, `analytics`, `security`.
- Ikon mendukung label, bukan menggantikan label penting.

## 5. Pola Layout dan Navigasi

### 5.1 Portal Publik

Header publik menggunakan:
- Logo Pemerintah Provinsi Lampung (`LOGO PEMDA.png`).
- Logo Universitas Teknokrat Indonesia (`LOGO TEKNO.png`).
- Logo dan nama SMART TRAFFIC.
- Navigasi: Beranda, Peta Lalu Lintas, Lapor Kejadian, Tentang Kami.
- Penanda “Portal Publik”.
- Tombol Masuk/Login dan ikon akun.

Header bersifat sticky/fixed dengan latar putih semi-transparan dan bayangan tipis. Pada layar kecil, ubah navigasi menjadi menu mobile yang mudah diakses.

Footer memuat identitas sistem, ringkasan layanan, navigasi portal, kontak posko, informasi privasi/keamanan, dan teks hak cipta wajib:
`Copyright©2026 by Sanda Apriliani Utami dan Dr. Erliyan Redy Susanto, M.Kom`.
Jangan mengarang nomor kontak atau alamat; gunakan data yang disediakan pemilik sistem.

### 5.2 Area Operasional/Admin

Gunakan layout dashboard dengan:
- Sidebar kiri tetap pada desktop.
- Identitas SMART TRAFFIC dan label versi sistem.
- Grup menu operasional.
- Area konten utama dengan header halaman.
- Toolbar berisi filter, rentang waktu, pencarian, dan tindakan ekspor jika relevan.
- Pada mobile, sidebar berubah menjadi drawer/menu yang dapat dibuka.

Menu operasional yang terlihat dalam kode mencakup:
- Ringkasan Eksekutif.
- Peta Kendali GIS.
- Manajemen Insiden.
- Analitik & Tren Telemetri.
- CCTV & Sensor IoT.

Tambahkan menu lain hanya jika memang tersedia pada struktur aplikasi atau diminta pengguna.

## 6. Struktur Halaman dan Arahan Desain

### 6.1 Beranda Publik

Urutan konten:
1. Header publik.
2. Broadcast/status bar untuk status pusat kendali, koridor yang dipantau, cuaca/jam jika tersedia.
3. Hero section dua kolom:
   - Kiri: label Intelligent Transport System, headline, deskripsi, tombol ke peta dan laporan, pencarian jalur.
   - Kanan: visual command center/CCTV dengan overlay HUD.
4. Ringkasan statistik: status arus, titik kepadatan, insiden/pekerjaan, CCTV terkoneksi.
5. Daftar informasi insiden dan rekayasa lalu lintas.
6. Keunggulan sistem: CCTV & IoT, laporan masyarakat, rute cerdas.
7. Preview peta interaktif dan ringkasan koridor.
8. Banner ajakan untuk melaporkan kejadian.
9. Footer.

Desain hero harus kuat tetapi tetap formal. Gunakan latar surface terang, grid dekoratif yang sangat halus, dan visual lalu lintas sebagai fokus pendamping. CTA primer berwarna biru; CTA pelaporan dapat menggunakan teal.

### 6.2 Peta Lalu Lintas Interaktif

Fokus utama adalah peta GIS yang luas dan mudah digunakan.
Komponen:
- Judul dan deskripsi singkat.
- Kolom pencarian lokasi/jalur.
- Filter wilayah, jenis kejadian, status jalan, dan rentang waktu jika tersedia.
- Legenda kondisi arus.
- Peta dengan marker insiden, CCTV, sensor, dan koridor.
- Panel detail lokasi ketika marker dipilih.
- Daftar koridor atau daftar kejadian yang sinkron dengan peta.
- Tombol fokus lokasi, reset filter, dan layar penuh.

Legenda kecepatan yang dicontohkan dalam kode:
- Hijau: lancar, lebih dari 40 km/jam.
- Kuning/biru sekunder: padat, 20–40 km/jam.
- Merah: macet, kurang dari 20 km/jam.

Jika ambang batas berubah berdasarkan kebijakan sistem, ikuti data konfigurasi aplikasi. Jangan menampilkan peta sebagai gambar statis jika halaman dimaksudkan interaktif.

### 6.3 Lapor Kejadian

Buat formulir bertahap atau terkelompok agar mudah diisi:
- Kategori kejadian: kemacetan, kecelakaan, banjir/genangan, kerusakan jalan, pekerjaan jalan, atau kategori yang disediakan sistem.
- Lokasi kejadian dan titik koordinat/GPS.
- Waktu kejadian.
- Deskripsi.
- Unggah foto/bukti.
- Informasi pelapor sesuai kebijakan privasi.
- Persetujuan dan tombol kirim.

Tampilkan petunjuk format file, batas ukuran, validasi, status unggah, dan pesan kesalahan dengan jelas. Setelah pengiriman, tampilkan konfirmasi serta nomor/kode laporan jika sistem memang menghasilkannya.

### 6.4 Detail Insiden

Tampilkan informasi dengan urutan:
1. Kategori dan tingkat prioritas.
2. Status penanganan dan waktu pembaruan.
3. Lokasi dan peta mini/koordinat.
4. Ringkasan dampak terhadap arus.
5. Uraian teknis kejadian.
6. Dokumentasi foto dan validasi CCTV.
7. Petugas/instansi penanganan bila tersedia.
8. Rekomendasi rute alternatif.
9. Riwayat pembaruan/timeline.

Gunakan badge status yang mudah dibedakan. Data sensitif pelapor harus disamarkan sesuai kebijakan privasi dan tidak ditampilkan tanpa kebutuhan yang sah.

### 6.5 Dashboard Operasional

Dashboard untuk operator harus berorientasi tindakan, bukan sekadar dekorasi.
Susunan:
- Sidebar navigasi.
- Header dengan nama modul, waktu pembaruan, identitas operator.
- Ringkasan metrik utama.
- Peta/monitor kondisi lalu lintas.
- Daftar insiden aktif dan prioritas.
- Status CCTV/sensor.
- Grafik tren atau telemetri.
- Tabel aktivitas/penanganan.
- Filter waktu dan wilayah.

Gunakan tabel untuk data rinci, grafik untuk tren, dan kartu metrik hanya untuk angka yang penting. Berikan penanda “terakhir diperbarui” pada data dinamis.

### 6.6 Dashboard Eksekutif Pemerintah Daerah

Gunakan tampilan ringkas untuk pengambilan keputusan:
- Indikator kinerja lalu lintas.
- Ringkasan kondisi wilayah.
- Tren insiden dan kemacetan.
- Perbandingan periode.
- Peta titik prioritas.
- Ringkasan tindak lanjut dan performa layanan.
- Ekspor laporan formal bila fitur tersedia.

Hindari memenuhi halaman dengan terlalu banyak detail teknis operator. Utamakan insight, tren, dan indikator strategis.

### 6.7 Analitik dan Tren Telemetri

- Sediakan filter periode, wilayah, dan jenis data.
- Gunakan grafik garis untuk tren waktu.
- Gunakan bar chart untuk perbandingan wilayah/kategori.
- Gunakan tabel untuk angka lengkap.
- Beri judul, satuan, label sumbu, legenda, dan sumber/periode data.
- Jangan membuat grafik 3D atau dekorasi yang mengurangi keterbacaan.
- Berikan ringkasan insight singkat di dekat grafik.

### 6.8 CCTV dan Sensor IoT

- Tampilkan daftar/grid perangkat.
- Setiap kartu memuat nama/kode perangkat, lokasi, jenis perangkat, status koneksi, dan waktu pembaruan.
- Preview video harus memiliki label LIVE hanya jika benar-benar live.
- Status perangkat: online, offline, gangguan, atau pemeliharaan.
- Gunakan panel detail untuk telemetry dan riwayat koneksi.
- Jangan mengklaim kualitas video, FPS, atau uptime aktual tanpa data.

### 6.9 Perencanaan Rute dan Rekomendasi Jalur

- Form asal dan tujuan.
- Pilihan moda/kategori kendaraan jika disediakan.
- Hasil rute pada peta.
- Alternatif rute dalam kartu perbandingan.
- Jarak, estimasi waktu, kondisi jalan, dan insiden di sepanjang rute.
- Sorot rekomendasi utama dan alasan rekomendasi.
- Tampilkan waktu pembaruan data lalu lintas.
- Jangan mengarang estimasi waktu atau menyebut rute “tercepat” tanpa perhitungan.

### 6.10 Login dan Registrasi

- Gunakan layout dua kolom pada desktop: formulir dan panel visual/identitas sistem.
- Pada mobile, prioritaskan formulir dan sederhanakan visual.
- Field memiliki label permanen, bukan hanya placeholder.
- Tampilkan tombol lihat/sembunyikan kata sandi, validasi, pesan kesalahan, dan tautan bantuan.
- Sertakan informasi keamanan seperlunya.
- Jangan menampilkan klaim enkripsi, sertifikasi, atau verifikasi lembaga kecuali benar-benar diterapkan.

## 7. Komponen UI yang Harus Konsisten

### Kartu statistik
- Label kecil di bagian atas.
- Angka utama besar.
- Deskripsi pendek.
- Konteks lokasi/periode di bagian bawah.
- Status badge di area atas atau samping.

### Kartu insiden
- Kategori/status.
- Waktu pembaruan.
- Judul dan lokasi.
- Deskripsi ringkas.
- Dampak terhadap arus.
- Instansi/petugas jika tersedia.
- Tautan menuju detail.

### Badge status
- Bentuk ringkas, padding kecil, teks tegas.
- Selalu sertakan label status.
- Warna sesuai sistem status; hindari warna dekoratif.

### Tombol
- Primary: biru untuk tindakan utama.
- Secondary: surface netral dengan teks gelap.
- Tertiary/action: teal untuk tindakan terkait pelaporan/konfirmasi.
- Destructive: merah untuk tindakan berisiko seperti hapus atau batalkan.
- Sediakan hover, focus, disabled, loading, dan active state.

### Formulir
- Label di atas input.
- Placeholder berupa contoh, bukan pengganti label.
- Kelompokkan field berdasarkan konteks.
- Validasi dekat dengan field terkait.
- Gunakan helper text untuk format dan persyaratan.
- Tampilkan ringkasan kesalahan jika formulir panjang.

### Tabel
- Header jelas dan konsisten.
- Angka rata kanan bila sesuai.
- Status menggunakan badge.
- Baris dapat memiliki hover state.
- Sediakan pencarian, filter, pagination, dan empty state bila dibutuhkan.
- Pada mobile, gunakan horizontal scroll yang terkontrol atau ubah menjadi kartu.

## 8. Responsivitas

- **Desktop (≥ 1280 px):** gunakan container konten maksimal sekitar 1280 px, sidebar dashboard, grid 2–4 kolom sesuai kebutuhan.
- **Tablet (768–1279 px):** kurangi jumlah kolom, jaga ruang antar elemen, sidebar dapat diperkecil/drawer.
- **Mobile (< 768 px):** satu kolom, tombol penting mudah dijangkau, navigasi ringkas, kartu statistik 1–2 kolom, tabel menjadi scroll/kartu.
- Hindari overflow horizontal pada seluruh halaman.
- Peta harus tetap dapat digeser dan kontrolnya tidak menutupi area penting.
- Ukuran target sentuh minimal sekitar 44 × 44 px.

## 9. Interaksi dan Micro-interactions

Terapkan interaksi yang membantu pengguna memahami sistem:
- Hover state yang halus pada tombol, kartu, dan tautan.
- Focus ring yang jelas untuk keyboard.
- Loading/skeleton saat data dimuat.
- Empty state saat belum ada data.
- Error state dengan tindakan pemulihan.
- Toast/alert setelah tindakan berhasil atau gagal.
- Pencarian populer dapat mengisi kolom pencarian.
- Jam live hanya ditampilkan jika diperbarui dengan benar.
- Indikator LIVE/pulse hanya digunakan untuk data streaming aktif.
- Filter harus benar-benar memengaruhi data yang ditampilkan.

Animasi bersifat singkat dan tidak mengganggu. Hormati preferensi `prefers-reduced-motion`.

## 10. Aksesibilitas dan Keamanan Visual

- Kontras teks dan latar harus memadai.
- Jangan menggunakan warna sebagai satu-satunya pembeda status.
- Semua input memiliki label.
- Ikon interaktif memiliki nama/tooltip yang jelas.
- Navigasi dapat digunakan dengan keyboard.
- Gambar memiliki alt text deskriptif.
- Jangan mengekspos NIK, nomor telepon, atau identitas pelapor secara penuh.
- Jangan menampilkan koordinat atau data pribadi yang tidak diperlukan.
- Konfirmasi sebelum tindakan destruktif.

## 11. Aturan Implementasi Frontend

Jika diminta membuat atau mengubah kode:
- Pertahankan stack yang sudah digunakan pada proyek, terutama HTML, Tailwind CSS, dan JavaScript jika itu basis kode yang tersedia.
- Gunakan token warna dan tipografi yang telah didefinisikan; jangan membuat palet baru tanpa alasan.
- Pecah UI menjadi komponen yang dapat digunakan ulang jika menggunakan framework.
- Hindari duplikasi style antarhalaman.
- Gunakan semantic HTML: `header`, `nav`, `main`, `section`, `form`, `button`, `table`, dan `footer`.
- Pastikan tombol memiliki aksi dan tautan memiliki tujuan yang benar.
- Jangan menggunakan `href="#"` untuk aksi yang seharusnya berfungsi.
- Pisahkan data dari markup agar data demo mudah diganti dengan API.
- Berikan state loading, empty, error, dan success.
- Pastikan layout tidak rusak pada ukuran layar berbeda.
- Jangan menghapus fungsi atau konten yang sudah ada ketika hanya diminta memperbaiki desain.

## 12. Standar Hasil Desain

Setiap halaman yang dibuat harus memenuhi checklist berikut:

- [ ] Identitas SMART TRAFFIC Provinsi Lampung konsisten.
- [ ] Warna mengikuti palet biru–teal–netral.
- [ ] Font menggunakan Inter.
- [ ] Hierarki judul, label, isi, dan metrik jelas.
- [ ] Navigasi sesuai peran pengguna.
- [ ] Informasi penting dapat dipindai dengan cepat.
- [ ] Status insiden dan lalu lintas memiliki label yang jelas.
- [ ] Tombol dan kontrol memiliki fungsi yang nyata.
- [ ] Tampilan desktop, tablet, dan mobile diperiksa.
- [ ] Ada loading, empty, error, dan success state yang relevan.
- [ ] Data simulasi tidak disamarkan sebagai data real-time.
- [ ] Privasi pelapor dan keamanan informasi diperhatikan.

## 13. Cara Merespons Permintaan Desain

Saat menerima tugas desain:
1. Identifikasi halaman dan jenis pengguna (publik, operator, atau eksekutif).
2. Pertahankan pola visual dan komponen yang sudah ditetapkan.
3. Susun hierarki konten sebelum menulis markup.
4. Gunakan komponen yang konsisten dan responsif.
5. Pastikan semua tindakan UI punya perilaku yang jelas.
6. Jika ada informasi yang tidak tersedia, gunakan placeholder yang diberi label atau tanyakan seperlunya; jangan mengarang data operasional.
7. Saat merevisi, ubah hanya bagian yang diminta dan jangan merombak bagian lain tanpa alasan.

## 14. Prompt Ringkas yang Bisa Digunakan

> Gunakan skill SMART TRAFFIC Lampung Design. Rancang halaman sesuai design system yang ditetapkan: gaya civic technology profesional, warna biru–teal–netral, font Inter, komponen konsisten, data-first, responsif, dan mudah digunakan. Pertahankan identitas SMART TRAFFIC Provinsi Lampung serta pola portal publik/dashboard operasional. Jangan mengarang data real-time. Pastikan seluruh tombol, filter, formulir, dan navigasi memiliki fungsi yang jelas.
