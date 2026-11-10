# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# SMART TRAFFIC

## Integrated Urban Traffic Monitoring System

  -----------------------------------------------------------------------
  Informasi                           Keterangan
  ----------------------------------- -----------------------------------
  Versi dokumen                       1.1

  Status                              Draft untuk validasi dan
                                      pengembangan

  Tahun                               2026

  Jenis produk                        Web application

  Cakupan wilayah                     Seluruh Provinsi Lampung

  Backend                             Rust

  Database                            PostgreSQL + PostGIS

  Frontend                            Next.js / React.js (rekomendasi)

  Pengguna utama                      Masyarakat, petugas, pengelola
                                      transportasi, pemerintah daerah,
                                      administrator
  -----------------------------------------------------------------------

> **Catatan branding:** Dokumen ini mengasumsikan logo Pemda yang
> dimaksud adalah logo resmi Pemerintah Provinsi Lampung. Penggunaan
> logo harus memakai berkas resmi beresolusi baik dan mengikuti
> izin/pedoman identitas visual instansi. Logo Universitas Teknokrat
> Indonesia juga harus menggunakan aset resmi yang disediakan atau
> disetujui universitas.

------------------------------------------------------------------------

## 1. Ringkasan Produk

SMART TRAFFIC adalah platform berbasis web untuk memantau, mengelola,
dan menyajikan informasi kondisi lalu lintas di seluruh Provinsi
Lampung. Platform menggabungkan data kondisi jalan, laporan masyarakat,
input petugas, informasi kecelakaan, data CCTV yang memiliki akses
resmi, serta sumber data eksternal yang tersedia.

Sistem menyediakan peta lalu lintas interaktif, pelaporan kejadian,
verifikasi petugas, pencarian rute dan alternatif, notifikasi, serta
dashboard analitik bagi pengelola transportasi dan pemerintah daerah.

SMART TRAFFIC dikembangkan sebagai proyek akademik dengan backend Rust
dan PostgreSQL. Implementasi tahap awal harus realistis: data dapat
berasal dari input petugas, laporan masyarakat, dan dataset uji.
Integrasi API lalu lintas, CCTV live, AI video analytics, dan sensor IoT
hanya dinyatakan aktif jika sumber data, perangkat, izin, dan
infrastruktur benar-benar tersedia.

### 1.1 Visi Produk

Menyediakan platform informasi lalu lintas terintegrasi yang membantu
masyarakat melakukan perjalanan dengan lebih terinformasi serta
mendukung pemerintah dan pengelola transportasi dalam memantau kondisi
jalan berbasis data.

### 1.2 Tujuan Produk

1.  Menampilkan informasi kondisi lalu lintas pada peta interaktif.
2.  Memudahkan masyarakat melaporkan kemacetan, kecelakaan, dan gangguan
    jalan.
3.  Menyediakan alur verifikasi dan penanganan laporan oleh petugas.
4.  Menyediakan pencarian rute dan rekomendasi jalur alternatif
    berdasarkan data yang tersedia.
5.  Menyajikan dashboard dan laporan analitik lalu lintas.
6.  Menyiapkan integrasi sumber data eksternal, CCTV, AI, dan IoT secara
    bertahap.

### 1.3 Pernyataan Masalah

Informasi lalu lintas dapat tersebar di berbagai kanal dan sumber.
Masyarakat membutuhkan informasi kondisi jalan dan kejadian yang mudah
dipahami, sedangkan petugas membutuhkan sarana untuk memvalidasi
laporan, memperbarui kondisi jalan, serta melihat pola kejadian. Tanpa
satu platform terintegrasi, informasi dapat terlambat, tidak konsisten,
atau sulit ditelusuri.

### 1.4 Solusi yang Diusulkan

SMART TRAFFIC menyediakan satu platform dengan dua area utama: -
**Portal publik:** peta lalu lintas, detail kejadian terverifikasi,
pencarian rute, dan pelaporan. - **Dashboard operasional:** monitoring,
verifikasi laporan, pengelolaan ruas jalan, CCTV yang diizinkan,
analitik, dan administrasi.

------------------------------------------------------------------------

## 2. Ruang Lingkup Produk

### 2.1 Cakupan Wilayah

Sistem dirancang untuk seluruh Provinsi Lampung dan struktur wilayahnya.
Data wilayah minimal mendukung provinsi, kabupaten/kota, kecamatan, dan
ruas jalan. Implementasi dapat dimulai dari wilayah percontohan, tetapi
struktur sistem tidak boleh dikunci hanya untuk Kota Bandar Lampung.

### 2.2 In Scope --- MVP

-   Website responsif untuk desktop, tablet, dan ponsel.
-   Halaman publik dan dashboard berdasarkan role.
-   Registrasi, login, logout, dan pengelolaan sesi.
-   Peta interaktif dengan layer ruas jalan dan status lalu lintas.
-   Data kondisi jalan yang dapat dimasukkan petugas atau dihasilkan
    dari laporan tervalidasi.
-   Pelaporan kejadian oleh pengguna login dan pelaporan tamu.
-   Unggah foto bukti dan penyimpanan metadata lokasi.
-   Verifikasi, penugasan, dan pembaruan status laporan.
-   Pencarian lokasi asal dan tujuan.
-   Perhitungan rute melalui routing engine eksternal/terpisah.
-   Penyesuaian rute berdasarkan data gangguan atau penutupan jalan yang
    tersedia.
-   Dashboard statistik dasar.
-   Notifikasi di dalam aplikasi.
-   Pengelolaan wilayah, ruas jalan, akun, role, dan audit log.
-   Branding Pemda Provinsi Lampung dan Universitas Teknokrat Indonesia.
-   Footer dengan teks hak cipta yang ditentukan.

### 2.3 Out of Scope --- MVP

-   Pengendalian lampu lalu lintas secara langsung.
-   Penegakan hukum atau penerbitan tilang.
-   Jaminan akses ke seluruh CCTV pemerintah.
-   Deteksi kecelakaan otomatis yang sudah tersertifikasi/tervalidasi
    operasional.
-   Prediksi kemacetan AI sebagai sumber keputusan tunggal.
-   Pelacakan GPS seluruh kendaraan secara terus-menerus.
-   Aplikasi native Android/iOS.
-   Integrasi langsung dengan sistem internal seluruh instansi tanpa API
    dan persetujuan.
-   Klaim data real-time jika sumber data hanya berupa input manual atau
    data simulasi.

### 2.4 Tahapan Kematangan Data

  -----------------------------------------------------------------------
  Tahap                   Sumber data             Label yang ditampilkan
  ----------------------- ----------------------- -----------------------
  MVP akademik            Input petugas, laporan  Manual / laporan
                          pengguna, dataset uji   pengguna / simulasi

  Integrasi               API resmi, feed sensor, Sumber dan waktu
                          CCTV yang diizinkan     pembaruan ditampilkan

  Lanjutan                Analisis video AI dan   Hasil deteksi AI, perlu
                          prediksi                verifikasi sesuai
                                                  kebijakan
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 3. Pengguna dan Hak Akses

  -----------------------------------------------------------------------
  Role                                Kebutuhan dan kewenangan utama
  ----------------------------------- -----------------------------------
  Guest / Pengunjung                  Melihat peta, kondisi jalan,
                                      kejadian terverifikasi, mencari
                                      rute, dan mengirim laporan tamu

  Registered User / Masyarakat        Semua fitur publik, mengirim
                                      laporan, melihat status dan riwayat
                                      laporan, menerima notifikasi

  Field Officer / Petugas Lapangan    Melihat penugasan, memeriksa
                                      lokasi, mengunggah bukti, dan
                                      memperbarui progres penanganan
                                      sesuai kewenangan

  Traffic Operator / Operator         Memantau kondisi jalan, memvalidasi
                                      laporan, mengelola kejadian,
                                      memperbarui status jalan, dan
                                      mengelola informasi CCTV

  Government Viewer / Pemerintah      Melihat dashboard dan laporan
  Daerah                              sesuai wilayah serta kewenangan
                                      instansi

  Administrator                       Mengelola akun, role, wilayah, ruas
                                      jalan, konfigurasi, sumber data,
                                      dan audit log
  -----------------------------------------------------------------------

**Aturan akses:** role tidak boleh ditentukan hanya dari pilihan
registrasi pengguna. Akun petugas, operator, pemerintah, dan
administrator harus dibuat atau disetujui oleh administrator yang
berwenang. Akses data dibatasi berdasarkan role dan, jika diperlukan,
wilayah kerja.

------------------------------------------------------------------------

## 4. Fitur dan Functional Requirements

Prioritas: - **Must:** wajib untuk MVP. - **Should:** penting, tetapi
dapat menyusul setelah fungsi inti. - **Could:** pengembangan lanjutan.

### 4.1 Autentikasi dan Akun

  -----------------------------------------------------------------------
  ID                      Kebutuhan               Prioritas
  ----------------------- ----------------------- -----------------------
  FR-001                  Sistem menyediakan      Must
                          registrasi akun         
                          masyarakat.             

  FR-002                  Sistem menyediakan      Must
                          login dan logout.       

  FR-003                  Sistem menerapkan       Must
                          role-based access       
                          control.                

  FR-004                  Pengguna dapat mengubah Should
                          profil dan kata sandi.  

  FR-005                  Sistem menyediakan      Should
                          pemulihan kata sandi.   

  FR-006                  Administrator dapat     Must
                          membuat, menonaktifkan, 
                          dan mengubah role akun  
                          sesuai kewenangan.      

  FR-007                  Sistem mencatat         Must
                          aktivitas penting akun  
                          dan administrator.      
  -----------------------------------------------------------------------

### 4.2 Peta dan Monitoring Lalu Lintas

  -----------------------------------------------------------------------
  ID                      Kebutuhan               Prioritas
  ----------------------- ----------------------- -----------------------
  FR-008                  Sistem menampilkan peta Must
                          wilayah Lampung.        

  FR-009                  Sistem menampilkan ruas Must
                          jalan yang memiliki     
                          data.                   

  FR-010                  Sistem menampilkan      Must
                          status jalan dengan     
                          warna dan label.        

  FR-011                  Pengguna dapat memilih  Must
                          ruas jalan untuk        
                          melihat detail.         

  FR-012                  Detail jalan            Must
                          menampilkan sumber data 
                          dan waktu pembaruan     
                          terakhir.               

  FR-013                  Pengguna dapat          Should
                          memfilter peta          
                          berdasarkan             
                          kabupaten/kota dan      
                          status jalan.           

  FR-014                  Petugas dapat           Must
                          memperbarui status lalu 
                          lintas sesuai           
                          kewenangan.             

  FR-015                  Sistem menyimpan        Must
                          riwayat perubahan       
                          status jalan.           

  FR-016                  Sistem memperbarui      Should
                          tampilan melalui        
                          polling berkala atau    
                          WebSocket sesuai        
                          kemampuan sumber data.  
  -----------------------------------------------------------------------

Klasifikasi awal: - Hijau: lancar. - Kuning: padat. - Merah: macet. -
Merah tua: macet parah. - Abu-abu: data tidak tersedia atau sudah
kedaluwarsa.

Ambang batas kecepatan untuk setiap kategori harus dapat dikonfigurasi
berdasarkan hasil uji dan data lokal. Jangan menetapkan angka kecepatan
universal tanpa kalibrasi.

### 4.3 Pelaporan Kejadian

  -----------------------------------------------------------------------
  ID                      Kebutuhan               Prioritas
  ----------------------- ----------------------- -----------------------
  FR-017                  Pengguna login dapat    Must
                          membuat laporan         
                          kejadian.               

  FR-018                  Pengunjung dapat        Should
                          mengirim laporan tamu   
                          dengan verifikasi       
                          minimum.                

  FR-019                  Laporan memiliki        Must
                          kategori, deskripsi,    
                          lokasi, dan waktu       
                          kejadian.               

  FR-020                  Pengguna dapat          Must
                          mengunggah foto dengan  
                          batas ukuran dan tipe   
                          file.                   

  FR-021                  Sistem menyimpan        Must
                          koordinat dan alamat    
                          perkiraan jika          
                          tersedia.               

  FR-022                  Sistem memberi status   Must
                          awal Pending            
                          Verification.           

  FR-023                  Operator dapat          Must
                          menerima, menolak, atau 
                          meminta klarifikasi     
                          laporan.                

  FR-024                  Petugas dapat           Must
                          memperbarui progres     
                          penanganan.             

  FR-025                  Pengguna dapat melihat  Must
                          status laporannya.      

  FR-026                  Sistem mencatat histori Must
                          status dan identitas    
                          petugas yang            
                          mengubahnya.            

  FR-027                  Laporan publik hanya    Must
                          ditampilkan setelah     
                          diverifikasi, dengan    
                          data pribadi            
                          disembunyikan.          
  -----------------------------------------------------------------------

Kategori laporan: - Kecelakaan. - Kemacetan. - Jalan rusak. - Penutupan
jalan. - Kendaraan mogok. - Gangguan lalu lintas lainnya.

Status laporan: - Pending Verification. - Verified. - Assigned. - In
Progress. - Resolved. - Rejected. - Needs Clarification.

### 4.4 Pencarian Rute dan Jalur Alternatif

  -----------------------------------------------------------------------
  ID                      Kebutuhan               Prioritas
  ----------------------- ----------------------- -----------------------
  FR-028                  Pengguna dapat          Must
                          menentukan titik asal   
                          dan tujuan.             

  FR-029                  Sistem meminta rute     Must
                          dari routing engine.    

  FR-030                  Sistem menampilkan      Must
                          jarak dan estimasi      
                          waktu dari routing      
                          engine.                 

  FR-031                  Sistem menampilkan      Should
                          alternatif rute jika    
                          tersedia.               

  FR-032                  Sistem mempertimbangkan Should
                          ruas jalan yang ditutup 
                          atau memiliki gangguan  
                          terverifikasi.          

  FR-033                  Sistem dapat meminta    Could
                          perhitungan ulang       
                          ketika data gangguan    
                          berubah.                

  FR-034                  Sistem menampilkan      Must
                          keterbatasan data lalu  
                          lintas jika tidak       
                          tersedia data kecepatan 
                          aktual.                 
  -----------------------------------------------------------------------

**Batasan penting:** PostgreSQL/PostGIS menyimpan dan mengolah data
geospasial, tetapi tidak otomatis menyediakan navigasi turn-by-turn atau
data kemacetan langsung. Perhitungan rute membutuhkan routing engine
seperti OSRM atau GraphHopper dan data jaringan jalan. Estimasi waktu
berbasis kondisi lalu lintas hanya dapat diklaim jika ada feed
kecepatan/kepadatan yang cukup mutakhir.

### 4.5 CCTV Monitoring

  -----------------------------------------------------------------------
  ID                      Kebutuhan               Prioritas
  ----------------------- ----------------------- -----------------------
  FR-035                  Administrator dapat     Should
                          mencatat metadata CCTV. 

  FR-036                  Peta menampilkan titik  Should
                          CCTV yang boleh         
                          ditampilkan.            

  FR-037                  Operator dapat membuka  Could
                          feed CCTV yang memiliki 
                          akses resmi.            

  FR-038                  Sistem menampilkan      Could
                          status koneksi kamera   
                          jika tersedia.          

  FR-039                  Sistem dapat menerima   Could
                          event hasil analisis    
                          video AI melalui API.   

  FR-040                  Hasil AI diberi label   Must jika modul AI
                          sebagai deteksi         digunakan
                          otomatis dan tidak      
                          langsung menjadi        
                          laporan terverifikasi.  
  -----------------------------------------------------------------------

### 4.6 Dashboard dan Analitik

  -----------------------------------------------------------------------
  ID                      Kebutuhan               Prioritas
  ----------------------- ----------------------- -----------------------
  FR-041                  Dashboard menampilkan   Must
                          jumlah laporan          
                          berdasarkan status.     

  FR-042                  Dashboard menampilkan   Must
                          jumlah kejadian         
                          berdasarkan kategori    
                          dan periode.            

  FR-043                  Dashboard menampilkan   Should
                          ruas jalan dengan       
                          laporan terbanyak.      

  FR-044                  Dashboard menyediakan   Should
                          filter waktu dan        
                          wilayah.                

  FR-045                  Sistem menyediakan      Could
                          ekspor laporan CSV/PDF. 

  FR-046                  Sistem menampilkan      Must
                          sumber data dan periode 
                          cakupan analisis.       
  -----------------------------------------------------------------------

### 4.7 Notifikasi

  -----------------------------------------------------------------------
  ID                      Kebutuhan               Prioritas
  ----------------------- ----------------------- -----------------------
  FR-047                  Pengguna menerima       Must
                          notifikasi perubahan    
                          status laporannya.      

  FR-048                  Operator menerima       Must
                          pemberitahuan laporan   
                          baru.                   

  FR-049                  Pengguna dapat melihat  Should
                          daftar notifikasi di    
                          aplikasi.               

  FR-050                  Sistem dapat mengirim   Could
                          peringatan gangguan     
                          jalan yang relevan      
                          dengan rute pengguna    
                          jika data tersedia.     
  -----------------------------------------------------------------------

### 4.8 Branding dan Footer

  -----------------------------------------------------------------------
  ID                      Kebutuhan               Prioritas
  ----------------------- ----------------------- -----------------------
  FR-051                  Header aplikasi         Must
                          menampilkan logo resmi  
                          Pemda Provinsi Lampung. 

  FR-052                  Header aplikasi         Must
                          menampilkan logo resmi  
                          Universitas Teknokrat   
                          Indonesia.              

  FR-053                  Kedua logo ditampilkan  Must
                          berdampingan dengan     
                          ukuran proporsional dan 
                          tidak mengubah          
                          bentuk/aspek rasio.     

  FR-054                  Footer menampilkan teks Must
                          hak cipta persis        
                          seperti yang            
                          ditentukan.             

  FR-055                  Logo dan teks footer    Must
                          tampil pada halaman     
                          publik dan halaman      
                          autentikasi; dashboard  
                          menampilkan identitas   
                          yang konsisten.         
  -----------------------------------------------------------------------

Teks footer wajib:

**Copyright©2026 by Sanda Apriliani Utami dan Dr. Erliyan Redy Susanto, M.Kom**

Teks harus ditampilkan persis, termasuk simbol ©, tahun 2026, kata
"dan", serta gelar. Untuk versi final, placeholder "Nama Mahasiswa"
dapat diganti dengan nama mahasiswa apabila dosen meminta identitas
aktual.

**Penempatan logo yang disarankan:** - Header kiri: logo Pemda Provinsi
Lampung dan logo Universitas Teknokrat Indonesia. - Halaman
login/register: kedua logo tetap terlihat di area identitas aplikasi. -
Footer: nama aplikasi, teks hak cipta wajib, dan tautan
informasi/kebijakan bila tersedia. - Dashboard: kedua logo dapat
ditempatkan pada header atau sidebar bagian atas.

Aset logo resmi menggunakan berkas gambar yang tersedia pada folder proyek:
- Logo Pemda Provinsi Lampung: `LOGO PEMDA.png`
- Logo Universitas Teknokrat Indonesia: `LOGO TEKNO.png`

Jangan memodifikasi proporsi rasio aspek, meregangkan gambar, atau menggunakan logo hasil pencarian lain di luar aset resmi tersebut.

------------------------------------------------------------------------

## 5. User Flow Utama

### 5.1 Melihat Kondisi Jalan

1.  Pengunjung membuka SMART TRAFFIC.
2.  Sistem menampilkan peta dan legenda kondisi jalan.
3.  Pengunjung memilih wilayah atau mencari ruas jalan.
4.  Sistem menampilkan detail status, sumber data, dan waktu pembaruan.
5.  Pengunjung dapat membuka pencarian rute.

### 5.2 Mengirim Laporan

1.  Pengguna memilih menu Lapor Kejadian.
2.  Pengguna memilih kategori kejadian.
3.  Pengguna menentukan lokasi melalui GPS atau pin peta.
4.  Pengguna menambahkan deskripsi dan foto.
5.  Sistem memvalidasi input dan menyimpan laporan.
6.  Sistem memberi nomor laporan dan status Pending Verification.
7.  Operator memeriksa laporan.
8.  Sistem memperbarui status dan memberi notifikasi kepada pelapor.

### 5.3 Verifikasi dan Penanganan

1.  Operator login ke dashboard.
2.  Operator membuka antrean laporan.
3.  Operator memeriksa kategori, waktu, lokasi, dan bukti.
4.  Operator memverifikasi, menolak, atau meminta klarifikasi.
5.  Jika valid, operator dapat menugaskan petugas.
6.  Petugas memperbarui progres.
7.  Operator menutup kejadian setelah penanganan selesai.
8.  Semua perubahan tersimpan dalam histori.

### 5.4 Pencarian Rute

1.  Pengguna memasukkan titik asal dan tujuan.
2.  Frontend mengirim permintaan ke backend.
3.  Backend meminta rute ke routing engine.
4.  Backend memeriksa apakah rute berpotongan dengan ruas yang ditutup
    atau memiliki gangguan terverifikasi.
5.  Sistem menampilkan rute dan estimasi yang diberikan routing engine.
6.  Jika data lalu lintas aktual tidak tersedia, sistem menampilkan
    estimasi normal dan peringatan bahwa kondisi aktual belum
    terverifikasi.

------------------------------------------------------------------------

## 6. Non-Functional Requirements

  -----------------------------------------------------------------------
  ID                      Kategori                Kebutuhan
  ----------------------- ----------------------- -----------------------
  NFR-001                 Kinerja                 Target waktu respons
                                                  API umum di bawah 2
                                                  detik pada beban uji
                                                  yang ditentukan, di
                                                  luar layanan eksternal.

  NFR-002                 Kinerja                 Peta hanya memuat layer
                                                  dan data sesuai area
                                                  tampilan agar tidak
                                                  mengirim seluruh data
                                                  provinsi sekaligus.

  NFR-003                 Keamanan                Semua komunikasi
                                                  produksi menggunakan
                                                  HTTPS.

  NFR-004                 Keamanan                Password disimpan
                                                  menggunakan algoritma
                                                  hashing password yang
                                                  sesuai, bukan teks
                                                  biasa.

  NFR-005                 Otorisasi               Semua endpoint privat
                                                  memeriksa role dan
                                                  cakupan wilayah pada
                                                  backend.

  NFR-006                 Privasi                 Data pribadi pelapor
                                                  tidak ditampilkan di
                                                  peta publik.

  NFR-007                 Keandalan               Sistem memiliki backup
                                                  database dan prosedur
                                                  pemulihan.

  NFR-008                 Integritas              Perubahan status
                                                  laporan dilakukan
                                                  melalui transaksi
                                                  database.

  NFR-009                 Kompatibilitas          Website mendukung
                                                  browser modern dan
                                                  tampilan responsif.

  NFR-010                 Observabilitas          Backend mencatat log
                                                  terstruktur, error, dan
                                                  metrik dasar.

  NFR-011                 Aksesibilitas           Warna status jalan
                                                  selalu disertai
                                                  teks/ikon agar tidak
                                                  hanya bergantung pada
                                                  warna.

  NFR-012                 Kualitas data           Setiap data kondisi
                                                  jalan menyimpan sumber
                                                  dan waktu observasi.
  -----------------------------------------------------------------------

Target kinerja harus diuji dengan spesifikasi server, ukuran dataset,
dan jumlah pengguna uji yang dinyatakan secara jelas.

------------------------------------------------------------------------

## 7. Validasi Teknologi: Rust dan PostgreSQL

### 7.1 Kesimpulan Validasi

**Rust dan PostgreSQL sesuai untuk SMART TRAFFIC.** Rust dapat digunakan
sebagai backend API, sedangkan PostgreSQL menjadi database relasional.
Ekstensi PostGIS sangat direkomendasikan karena sistem mengelola
koordinat, ruas jalan, titik kejadian, wilayah, dan pencarian spasial.

Kombinasi yang direkomendasikan untuk proyek ini:

  -----------------------------------------------------------------------
  Lapisan                 Teknologi               Tanggung jawab
  ----------------------- ----------------------- -----------------------
  Frontend                Next.js / React.js      Antarmuka publik dan
                                                  dashboard

  Peta                    Leaflet + OpenStreetMap Visualisasi peta dan
                                                  layer jalan

  Backend                 Rust + Axum             REST API dan aturan
                                                  bisnis

  Async runtime           Tokio                   Menjalankan operasi
                                                  asynchronous

  Database access         SQLx                    Query PostgreSQL dan
                                                  connection pool

  Database                PostgreSQL              Penyimpanan data utama

  Spatial extension       PostGIS                 Query dan indeks
                                                  geospasial

  Realtime                WebSocket melalui Axum  Pembaruan status dan
                                                  notifikasi

  Routing                 OSRM atau GraphHopper   Perhitungan rute jalan

  File storage            Object storage /        Foto laporan dan aset
                          penyimpanan server      

  Deployment              Docker                  Menjalankan layanan
                                                  secara konsisten
  -----------------------------------------------------------------------

### 7.2 Validasi Rust

Rust layak digunakan sebagai backend karena mendukung aplikasi server
asynchronous, penanganan error yang eksplisit, dan pengelolaan memori
yang aman.

Komponen yang direkomendasikan: - **Axum:** routing HTTP, handler,
request extraction, dan middleware. - **Tokio:** asynchronous runtime. -
**SQLx:** akses PostgreSQL, connection pooling, transaksi, dan
pemeriksaan query. - **Serde:** serialisasi dan deserialisasi JSON. -
**Tower HTTP:** middleware seperti CORS, tracing, dan pengaturan HTTP. -
**Tracing:** logging dan observabilitas. - **Argon2:** hashing
password. - **JWT atau session cookie:** autentikasi, dengan penyimpanan
dan masa berlaku yang aman.

Rust tidak menghilangkan kebutuhan validasi input, otorisasi, rate
limiting, pengujian, dan konfigurasi keamanan. Semua hal tersebut tetap
harus diimplementasikan.

### 7.3 Validasi PostgreSQL dan PostGIS

PostgreSQL sesuai untuk menyimpan data akun, laporan, status penanganan,
histori, data jalan, dan analitik relasional.

PostGIS menambahkan tipe data spasial seperti Point, LineString, dan
Polygon serta fungsi untuk pencarian spasial. Gunakan: - `Point` untuk
lokasi kecelakaan, laporan, dan CCTV. - `LineString` untuk geometri ruas
jalan. - `Polygon` atau `MultiPolygon` untuk batas wilayah
administrasi. - SRID yang konsisten; WGS 84 / EPSG:4326 dapat digunakan
untuk koordinat geografis. - Indeks GiST untuk kolom geometri/geografi
yang sering dipakai dalam query spasial.

Contoh konseptual SQL:

``` sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE incidents (
    id BIGSERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending_verification',
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX incidents_location_gix
ON incidents USING GIST (location);
```

Contoh tersebut adalah rancangan awal. Implementasi final perlu
menambahkan relasi user, validasi status, kolom audit, kebijakan
retensi, dan kontrol akses.

### 7.4 Kesesuaian Fitur dengan Teknologi

  --------------------------------------------------------------------------
  Fitur             Rust              PostgreSQL/PostGIS   Validasi
  ----------------- ----------------- -------------------- -----------------
  Login dan role    Axum + Argon2 +   Users, roles,        Sesuai
                    session/JWT       permissions          

  Pelaporan         REST API          Tabel incidents dan  Sesuai
  kejadian                            photos metadata      

  Lokasi GPS        Validasi          Geography Point      Sesuai
                    koordinat                              

  Peta ruas jalan   API data jalan    LineString dan       Sesuai
                                      indeks spasial       

  Filter wilayah    Query API         Polygon dan spatial  Sesuai
                                      query                

  Histori status    Transaction       Status history dan   Sesuai
                    handler           audit log            

  Dashboard         Endpoint agregasi SQL aggregation dan  Sesuai
  statistik                           views                

  Notifikasi        WebSocket         Data notifikasi      Sesuai
  realtime                            tersimpan di DB      

  Rekomendasi rute  Integrasi routing Data jalan dan       Perlu layanan
                    service           gangguan             routing

  CCTV live         Proxy/metadata    Metadata kamera      Perlu akses
                    API                                    streaming resmi

  Deteksi AI        Integrasi service Penyimpanan hasil    Perlu model dan
                    inference         deteksi              infrastruktur AI
  --------------------------------------------------------------------------

### 7.5 Catatan Kelayakan

1.  Rust + PostgreSQL sangat layak untuk backend dan database MVP.
2.  PostGIS penting untuk kebutuhan spasial; PostgreSQL tanpa PostGIS
    masih dapat menyimpan koordinat numerik, tetapi kemampuan query
    spasial menjadi terbatas.
3.  Routing tidak boleh dibangun hanya dengan query database biasa.
    Gunakan routing engine dan data jaringan jalan yang sesuai.
4.  Data kemacetan real-time memerlukan sumber data aktual. Peta dan
    database saja tidak dapat mengetahui kecepatan kendaraan.
5.  CCTV dan AI memerlukan akses kamera, kapasitas komputasi, pipeline
    video, serta pengujian model.
6.  Untuk proyek akademik, mulai dari laporan pengguna, input operator,
    peta, dan dashboard. Integrasi kompleks menjadi fase berikutnya.

------------------------------------------------------------------------

## 8. Rancangan Database

Tabel inti yang direkomendasikan:

  -----------------------------------------------------------------------
  Tabel                               Fungsi
  ----------------------------------- -----------------------------------
  users                               Data akun pengguna

  roles                               Daftar role

  user_roles                          Relasi akun dan role jika satu akun
                                      dapat memiliki beberapa role

  regions                             Provinsi, kabupaten/kota, dan
                                      kecamatan

  roads                               Nama, klasifikasi, wilayah, dan
                                      geometri ruas jalan

  traffic_observations                Observasi kondisi lalu lintas
                                      beserta sumber dan waktu

  incidents                           Data laporan kejadian

  incident_attachments                Metadata foto atau dokumen

  incident_status_history             Histori status laporan

  incident_assignments                Penugasan petugas

  cctv_cameras                        Metadata kamera dan status akses

  ai_detection_events                 Hasil deteksi otomatis jika modul
                                      AI tersedia

  routes                              Riwayat permintaan rute, bila
                                      diperlukan

  notifications                       Notifikasi pengguna

  audit_logs                          Catatan aktivitas penting
  -----------------------------------------------------------------------

Ketentuan desain: - Gunakan primary key dan foreign key. - Gunakan
`TIMESTAMPTZ` untuk waktu. - Simpan koordinat sebagai tipe PostGIS,
bukan hanya dua angka tanpa referensi spasial. - Buat indeks B-tree
untuk kolom filter umum seperti status, kategori, dan waktu. - Buat
indeks GiST untuk kolom geospasial. - Simpan file foto di object storage
atau penyimpanan file; database menyimpan metadata dan lokasi file. -
Jangan menyimpan password asli. - Pertimbangkan partisi tabel observasi
lalu lintas jika volume data historis meningkat.

------------------------------------------------------------------------

## 9. API Requirements

API menggunakan REST dengan format JSON dan prefix versi `/api/v1`.

  ----------------------------------------------------------------------------------------
  Method            Endpoint                          Fungsi            Akses
  ----------------- --------------------------------- ----------------- ------------------
  POST              `/api/v1/auth/register`           Registrasi        Publik
                                                      masyarakat        

  POST              `/api/v1/auth/login`              Login             Publik

  POST              `/api/v1/auth/logout`             Logout            Pengguna

  GET               `/api/v1/regions`                 Daftar wilayah    Publik

  GET               `/api/v1/roads`                   Daftar ruas jalan Publik
                                                      dan filter        
                                                      wilayah           

  GET               `/api/v1/traffic`                 Kondisi lalu      Publik
                                                      lintas            

  GET               `/api/v1/incidents`               Kejadian          Publik
                                                      terverifikasi     

  POST              `/api/v1/incidents`               Membuat laporan   Publik/login
                                                                        sesuai kebijakan

  GET               `/api/v1/me/incidents`            Riwayat laporan   Pengguna
                                                      sendiri           

  PATCH             `/api/v1/incidents/{id}/status`   Memperbarui       Operator/petugas
                                                      status            berwenang

  POST              `/api/v1/routes`                  Meminta           Publik
                                                      perhitungan rute  

  GET               `/api/v1/cameras`                 Metadata CCTV     Sesuai izin
                                                      yang boleh        
                                                      dilihat           

  GET               `/api/v1/dashboard/summary`       Ringkasan         Role internal
                                                      dashboard         

  GET               `/api/v1/notifications`           Notifikasi        Pengguna
                                                      pengguna          
  ----------------------------------------------------------------------------------------

Semua endpoint harus menerapkan validasi, pembatasan akses, format error
konsisten, pagination untuk daftar, dan rate limiting pada endpoint
publik yang rawan penyalahgunaan.

------------------------------------------------------------------------

## 10. UI/UX dan Identitas Visual

### 10.1 Arah Desain

-   Modern, bersih, dan profesional.
-   Peta menjadi elemen utama halaman monitoring.
-   Informasi penting mudah dibaca.
-   Status lalu lintas menggunakan warna sekaligus label.
-   Dashboard operasional mengutamakan tabel, filter, peta, dan
    ringkasan.
-   Responsif untuk desktop dan perangkat mobile.

### 10.2 Halaman Publik

1.  Landing Page.
2.  Traffic Map.
3.  Road Detail.
4.  Route Search.
5.  Incident Report.
6.  Incident Detail.
7.  Login.
8.  Register.
9.  User Profile.
10. Report History.
11. Notifications.

### 10.3 Dashboard Internal

1.  Dashboard Overview.
2.  Traffic Monitoring.
3.  Incident Management.
4.  Incident Verification.
5.  Field Assignment.
6.  Road Management.
7.  CCTV Monitoring.
8.  Traffic Analytics.
9.  Region Management.
10. User and Role Management.
11. Audit Logs.
12. System Settings.

### 10.4 Logo dan Footer Wajib

Header identitas aplikasi wajib menampilkan: - Logo resmi Pemerintah
Provinsi Lampung (Pemda) menggunakan aset berkas `LOGO PEMDA.png`. - Logo resmi Universitas Teknokrat
Indonesia menggunakan aset berkas `LOGO TEKNO.png`. - Nama produk SMART TRAFFIC.

Kedua logo ditampilkan berdampingan, tidak terpotong, tidak diregangkan,
dan tetap terbaca pada layar kecil. Jika ruang terbatas, logo dapat
diperkecil secara proporsional atau dipindahkan ke area identitas pada
menu.

Footer wajib memuat teks berikut secara persis:

**Copyright©2026 by Sanda Apriliani Utami dan Dr. Erliyan Redy Susanto, M.Kom**

Teks harus hadir pada seluruh halaman aplikasi, termasuk halaman publik,
login/register, dan dashboard. Footer dapat menambahkan tautan kebijakan
privasi dan informasi aplikasi, tetapi tidak boleh menghilangkan atau
mengubah teks wajib tersebut.

------------------------------------------------------------------------

## 11. Acceptance Criteria

MVP dinyatakan memenuhi kebutuhan jika:

1.  Pengunjung dapat membuka website dan melihat peta.
2.  Sistem menampilkan wilayah dan ruas jalan yang telah dimasukkan.
3.  Sistem menampilkan status lalu lintas, sumber, dan waktu pembaruan.
4.  Masyarakat dapat mengirim laporan sesuai aturan akses.
5.  Operator dapat memverifikasi, menolak, atau meminta klarifikasi.
6.  Petugas dapat memperbarui progres penanganan sesuai kewenangan.
7.  Pengguna dapat melihat status laporannya sendiri.
8.  Sistem menyimpan histori perubahan status.
9.  Pengguna dapat mencari lokasi asal dan tujuan.
10. Sistem dapat meminta dan menampilkan rute dari routing engine.
11. Sistem tidak mengklaim data kemacetan real-time jika sumbernya tidak
    mendukung.
12. Dashboard menampilkan statistik berdasarkan data tersimpan.
13. Role dan permission diuji agar pengguna tidak dapat mengakses
    endpoint terlarang.
14. Logo Pemda Provinsi Lampung dan Universitas Teknokrat Indonesia
    tampil dengan aset resmi.
15. Footer menampilkan teks hak cipta persis sesuai ketentuan.
16. Aplikasi diuji pada desktop dan perangkat mobile.

------------------------------------------------------------------------

## 12. Risiko dan Mitigasi

  -----------------------------------------------------------------------
  Risiko                              Mitigasi
  ----------------------------------- -----------------------------------
  Tidak ada feed lalu lintas          Gunakan input operator dan
  real-time                           tampilkan sumber serta waktu
                                      observasi

  Data ruas jalan belum lengkap       Mulai dengan wilayah percontohan
                                      dan impor data secara bertahap

  CCTV tidak dapat diakses            Gunakan hanya kamera dengan izin
                                      dan sediakan mode tanpa live stream

  Laporan palsu atau duplikat         Verifikasi petugas, rate limiting,
                                      dan deteksi duplikasi dasar

  Rute tidak mencerminkan kemacetan   Pisahkan estimasi routing normal
                                      dari data traffic aktual

  Data lokasi salah                   Validasi rentang koordinat dan
                                      tampilkan pin untuk konfirmasi

  Kebocoran data pribadi              Minimalkan data, batasi akses, dan
                                      sembunyikan identitas pelapor dari
                                      publik

  Beban query spasial tinggi          Gunakan indeks GiST, pagination,
                                      bounding box, dan optimasi query

  Logo tidak sesuai pedoman           Gunakan aset resmi dan minta
                                      persetujuan pihak terkait
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 13. Roadmap Pengembangan

### Tahap 1 --- Analisis dan Desain

-   Finalisasi kebutuhan.
-   Use Case Diagram.
-   Activity Diagram.
-   ERD.
-   Wireframe dan prototype.
-   Konfirmasi aset logo resmi.

### Tahap 2 --- Fondasi Backend

-   Inisialisasi project Rust.
-   Setup Axum dan Tokio.
-   Setup PostgreSQL dan PostGIS.
-   Migrasi database menggunakan SQLx.
-   Autentikasi dan role.
-   Logging dan error handling.

### Tahap 3 --- Fitur Inti

-   Peta dan data jalan.
-   Kondisi lalu lintas manual.
-   Pelaporan kejadian.
-   Verifikasi dan penanganan.
-   Riwayat status.
-   Dashboard statistik.

### Tahap 4 --- Routing dan Notifikasi

-   Integrasi routing engine.
-   Alternatif rute.
-   Penyesuaian dengan penutupan jalan.
-   Notifikasi aplikasi.
-   WebSocket bila dibutuhkan.

### Tahap 5 --- Pengujian dan Evaluasi

-   Unit test.
-   Integration test.
-   API test.
-   Pengujian role dan keamanan.
-   Pengujian spasial.
-   Pengujian responsif.
-   Evaluasi hasil dan dokumentasi.

### Tahap 6 --- Pengembangan Lanjutan

-   Integrasi CCTV.
-   AI vehicle detection.
-   AI incident detection.
-   Integrasi sensor IoT.
-   Prediksi kemacetan.

------------------------------------------------------------------------

## 14. Asumsi dan Batasan

1.  Proyek ini merupakan proyek akademik, bukan sistem operasional resmi
    pemerintah.
2.  Nama dan logo Pemda digunakan sebagai identitas proyek hanya setelah
    memperoleh aset dan persetujuan penggunaan yang sesuai.
3.  Logo Universitas Teknokrat Indonesia menggunakan aset resmi.
4.  Sumber data lalu lintas aktual belum dianggap tersedia sampai ada
    API, perangkat, atau perjanjian akses yang dapat diuji.
5.  Jika data uji digunakan, antarmuka harus menandainya sebagai data
    simulasi.
6.  Integrasi CCTV memerlukan izin akses, jaringan, dan kompatibilitas
    stream.
7.  Fitur AI tidak menjadi dependensi MVP.
8.  Estimasi waktu perjalanan berasal dari routing engine dan tidak
    boleh disebut estimasi berbasis traffic aktual jika tidak ada feed
    traffic.

------------------------------------------------------------------------

## 15. Validasi Akhir PRD

### Hasil validasi kebutuhan dan teknologi

  -----------------------------------------------------------------------
  Area                    Hasil                   Catatan
  ----------------------- ----------------------- -----------------------
  Backend Rust            Layak                   Axum + Tokio + SQLx
                                                  merupakan susunan yang
                                                  sesuai

  Database PostgreSQL     Layak                   Cocok untuk data
                                                  relasional dan
                                                  transaksi

  Data geospasial         Layak dengan PostGIS    Disarankan untuk ruas
                                                  jalan, titik kejadian,
                                                  dan batas wilayah

  Peta interaktif         Layak                   Memerlukan penyedia
                                                  tile/map dan data jalan

  Navigasi alternatif     Layak dengan layanan    Gunakan
                          tambahan                OSRM/GraphHopper atau
                                                  routing service lain

  Realtime                Layak dengan batasan    WebSocket menyebarkan
                                                  pembaruan; tidak
                                                  menciptakan data
                                                  traffic

  CCTV                    Bersyarat               Perlu stream dan izin
                                                  akses resmi

  AI CCTV                 Pengembangan lanjutan   Perlu dataset, model,
                                                  komputasi, dan validasi
                                                  hasil

  Branding dan footer     Wajib diuji             Periksa kedua logo dan
                                                  teks footer pada
                                                  seluruh halaman
  -----------------------------------------------------------------------

**Kesimpulan:** PRD SMART TRAFFIC konsisten dengan penggunaan Rust
sebagai backend dan PostgreSQL + PostGIS sebagai database. Stack ini
layak untuk MVP dan dapat dikembangkan lebih lanjut. Kelayakan teknologi
tidak berarti seluruh sumber data eksternal sudah tersedia; integrasi
traffic, routing, CCTV, dan AI tetap memerlukan layanan, data,
perangkat, serta izin yang sesuai.

------------------------------------------------------------------------

## 16. Referensi Teknis

1.  Axum --- Rust web application framework:
    https://docs.rs/axum/latest/axum/
2.  Tokio --- Asynchronous runtime: https://docs.rs/tokio/latest/tokio/
3.  SQLx --- Asynchronous SQL toolkit for Rust:
    https://docs.rs/sqlx/latest/sqlx/
4.  PostgreSQL Documentation: https://www.postgresql.org/docs/
5.  PostGIS Documentation: https://postgis.net/documentation/
6.  OpenStreetMap: https://www.openstreetmap.org/
7.  OSRM Documentation: https://project-osrm.org/docs/
8.  GraphHopper Documentation: https://docs.graphhopper.com/

------------------------------------------------------------------------

**SMART TRAFFIC --- Making Every Journey Smarter, Safer, and More
Efficient.**
