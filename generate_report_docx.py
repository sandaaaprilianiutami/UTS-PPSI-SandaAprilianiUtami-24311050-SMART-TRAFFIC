import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=120, bottom=120, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tcPr.append(tcMar)

def create_report():
    doc = Document()

    # Page Setup - Margins 1 inch
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Styles Setup
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Arial'
    normal_style.font.size = Pt(10)
    normal_style.font.color.rgb = RGBColor(30, 41, 59)

    # Colors
    c_primary = RGBColor(0, 80, 135)     # #005087
    c_secondary = RGBColor(0, 88, 84)    # #005854
    c_dark = RGBColor(15, 23, 42)
    c_muted = RGBColor(100, 116, 139)

    # ==========================
    # COVER / HEADER TITLE
    # ==========================
    # Header Logos Table
    logo_pemda_path = r"D:\mata kuliah\SEMESTER 5\PPSI\UTS-PPSI\LOGO PEMDA.png"
    logo_tekno_path = r"D:\mata kuliah\SEMESTER 5\PPSI\UTS-PPSI\LOGO TEKNO.png"

    if os.path.exists(logo_pemda_path) and os.path.exists(logo_tekno_path):
        table_logos = doc.add_table(rows=1, cols=2)
        table_logos.alignment = WD_TABLE_ALIGNMENT.CENTER
        table_logos.autofit = False
        
        cell_l = table_logos.rows[0].cells[0]
        cell_r = table_logos.rows[0].cells[1]
        cell_l.width = Inches(3.2)
        cell_r.width = Inches(3.2)
        
        p_l = cell_l.paragraphs[0]
        p_l.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p_l.add_run().add_picture(logo_pemda_path, width=Inches(0.95))
        
        p_r = cell_r.paragraphs[0]
        p_r.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p_r.add_run().add_picture(logo_tekno_path, width=Inches(0.90))

    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_inst = p_inst.add_run("\nPEMERINTAH PROVINSI LAMPUNG\nUNIVERSITAS TEKNOKRAT INDONESIA\nFAKULTAS TEKNIK DAN ILMU KOMPUTER")
    r_inst.font.bold = True
    r_inst.font.size = Pt(11)
    r_inst.font.color.rgb = c_primary

    p_div = doc.add_paragraph()
    p_div.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_div = p_div.add_run("_______________________________________________________________________________")
    r_div.font.bold = True
    r_div.font.color.rgb = RGBColor(203, 213, 225)

    doc.add_paragraph()

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_title = p_title.add_run("LAPORAN TESTING & DEBUGGING SISTEM\nAPLIKASI SMART TRAFFIC PROVINSI LAMPUNG")
    r_title.font.bold = True
    r_title.font.size = Pt(15.5)
    r_title.font.color.rgb = c_primary

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run("Penyempurnaan Vibe Coding, Pengujian Kualitas, Verifikasi Fungsionalitas, Validasi Desain, dan Penanganan Debugging\nSistem Manajemen Lalu Lintas Cerdas Terpadu")
    r_sub.font.size = Pt(10)
    r_sub.font.italic = True
    r_sub.font.color.rgb = c_muted

    doc.add_paragraph()

    # Identity Box Table
    table_meta = doc.add_table(rows=5, cols=2)
    table_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_meta.autofit = False
    
    meta_data = [
        ("Nama Mahasiswa", "Sanda Apriliani Utami"),
        ("Mata Kuliah", "Perancangan & Pengembangan Sistem Informasi (PPSI)"),
        ("Dosen Pengampu", "Dr. Erliyan Redy Susanto, M.Kom"),
        ("Institusi", "Universitas Teknokrat Indonesia - FTIK"),
        ("Tanggal Pengujian & Perbaikan", "November 2026")
    ]

    for i, (k, v) in enumerate(meta_data):
        row = table_meta.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.3)
        
        p0 = c0.paragraphs[0]
        r0 = p0.add_run(k)
        r0.font.bold = True
        r0.font.size = Pt(9.5)
        
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(f":  {v}")
        r1.font.size = Pt(9.5)
        if k == "Nama Mahasiswa" or k == "Dosen Pengampu":
            r1.font.bold = True
            r1.font.color.rgb = c_primary

        set_cell_background(c0, "F8FAFC")
        set_cell_background(c1, "F8FAFC")
        set_cell_margins(c0, 70, 70, 100, 100)
        set_cell_margins(c1, 70, 70, 100, 100)

    doc.add_paragraph()
    p_copy = doc.add_paragraph()
    p_copy.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_copy = p_copy.add_run("Copyright©2026 by Sanda Apriliani Utami dan Dr. Erliyan Redy Susanto, M.Kom")
    r_copy.font.bold = True
    r_copy.font.size = Pt(9.5)
    r_copy.font.color.rgb = c_primary

    doc.add_page_break()

    # ==========================
    # BAB 1: PENDAHULUAN
    # ==========================
    h1 = doc.add_heading(level=1)
    r_h1 = h1.add_run("1. PENDAHULUAN & RUANG LINGKUP")
    r_h1.font.color.rgb = c_primary
    r_h1.font.size = Pt(13)

    p_intro = doc.add_paragraph(
        "Laporan pengujian dan debugging ini disusun untuk mendokumentasikan serangkaian evaluasi kualitas "
        "perangkat lunak serta penyempurnaan vibe coding terhadap aplikasi web SMART TRAFFIC Provinsi Lampung. "
        "Sistem ini dibangun berlandaskan dokumen spesifikasi teknis PRD (Product Requirement Document) dan panduan "
        "desain resmi SKILL_DESAIN_SMART_TRAFFIC_LAMPUNG.md. Aplikasi dirancang sebagai pusat manajemen transportasi "
        "cerdas terpadu yang memadukan pemantauan arus jalan raya, integrasi kamera CCTV streaming, sensor telemetri "
        "kecepatan dan cuaca (IoT), serta pelaporan insiden darurat masyarakat Lampung."
    )
    p_intro.paragraph_format.line_spacing = 1.15

    p_obj = doc.add_paragraph(
        "Tujuan pengujian dan perbaikan meliputi:\n"
        "1. Memastikan seluruh kebutuhan fungsional (FR) dalam PRD dapat berjalan dengan responsif, akurat, dan tanpa galat.\n"
        "2. Memverifikasi penerapan aset resmi (Logo Pemda Provinsi Lampung dan Logo Universitas Teknokrat Indonesia) pada header, navigasi, dan footer.\n"
        "3. Memverifikasi klausul hak cipta wajib: 'Copyright©2026 by Sanda Apriliani Utami dan Dr. Erliyan Redy Susanto, M.Kom' tampil utuh di setiap halaman.\n"
        "4. Melakukan identifikasi bug, linting warning, optimasi tampilan (vibe coding), layout responsif, dan tindakan debugging yang diterapkan."
    )
    p_obj.paragraph_format.line_spacing = 1.15

    # ==========================
    # BAB 2: LINGKUNGAN PENGUJIAN
    # ==========================
    h2 = doc.add_heading(level=1)
    r_h2 = h2.add_run("2. LINGKUNGAN & SPESIFIKASI TESTING")
    r_h2.font.color.rgb = c_primary
    r_h2.font.size = Pt(13)

    p_env = doc.add_paragraph("Pengujian perangkat lunak dilaksanakan pada lingkungan infrastruktur dan perangkat berikut:")
    
    table_env = doc.add_table(rows=6, cols=2)
    table_env.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_env.autofit = False

    env_items = [
        ("Operating System", "Microsoft Windows 11 Home Single Language (x64)"),
        ("Frontend Runtime & Framework", "React 19, TypeScript (~6.0.3), Vite 8.3.4 Engine"),
        ("Node.js & NPM Version", "Node.js v24.21.0, NPM 11.19.0"),
        ("Browser Target Pengujian", "Google Chrome 134, Microsoft Edge Chromium (Desktop & Mobile Simulation)"),
        ("Metode Pengujian", "Black Box Testing, White Box Compilation, Oxlint Analysis, Regression UI/UX"),
        ("Aset Branding Visual", "LOGO PEMDA.png (Pemprov Lampung) & LOGO TEKNO.png (Universitas Teknokrat)")
    ]

    for i, (k, v) in enumerate(env_items):
        r = table_env.rows[i]
        c0, c1 = r.cells[0], r.cells[1]
        c0.width = Inches(2.3)
        c1.width = Inches(4.2)
        c0.paragraphs[0].add_run(k).font.bold = True
        c1.paragraphs[0].add_run(v)
        set_cell_background(c0, "F1F5F9" if i%2==0 else "FFFFFF")
        set_cell_background(c1, "F1F5F9" if i%2==0 else "FFFFFF")
        set_cell_margins(c0, 60, 60, 80, 80)
        set_cell_margins(c1, 60, 60, 80, 80)

    # ==========================
    # BAB 3: HASIL PENGUJIAN (TEST MATRIX)
    # ==========================
    doc.add_page_break()
    h3 = doc.add_heading(level=1)
    r_h3 = h3.add_run("3. RENCANA, KASUS UJI & HASIL TESTING (TEST MATRIX)")
    r_h3.font.color.rgb = c_primary
    r_h3.font.size = Pt(13)

    doc.add_paragraph(
        "Pengujian fungsionalitas dan integrasi UI dijalankan secara menyeluruh pada 10 skenario pengujian utama (Test Case TC-01 hingga TC-10)."
    )

    table_tc = doc.add_table(rows=11, cols=5)
    table_tc.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_tc.autofit = False

    headers_tc = ["ID & Modul", "Skenario Uji", "Langkah Pengujian", "Hasil yang Diharapkan", "Status"]
    col_widths = [Inches(1.0), Inches(1.5), Inches(1.5), Inches(1.8), Inches(0.7)]

    # Header row
    hdr_row = table_tc.rows[0]
    for j, h_text in enumerate(headers_tc):
        cell = hdr_row.cells[j]
        cell.width = col_widths[j]
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
        set_cell_background(cell, "005087")
        set_cell_margins(cell, 80, 80, 60, 60)

    test_matrix = [
        ("TC-01\nBranding Header", "Validasi Logo Resmi & Identitas", "Buka halaman portal publik, periksa area header kiri.", "Tampil logo Pemda Lampung dan logo Teknokrat berdampingan proporsional.", "PASS"),
        ("TC-02\nFooter Copyright", "Validasi Teks Hak Cipta Wajib", "Periksa footer pada seluruh tab halaman.", "Tampil teks: Copyright©2026 by Sanda Apriliani Utami dan Dr. Erliyan Redy Susanto, M.Kom secara presisi.", "PASS"),
        ("TC-03\nBeranda Publik", "Pencarian Real-Time & Filter Jalan", "Gunakan search bar dan dropdown filter wilayah di beranda.", "Tabel jalan menyaring data secara dinamis tanpa jeda; metrik KPI akurat.", "PASS"),
        ("TC-04\nPeta Interaktif", "Geospasial Arus & Efek Pulse Ring", "Buka tab Peta, klik ruas jalan yang sedang padat/lancar.", "Peta menyorot garis koridor jalan dengan animasi pulsa aktif & detail panel terbuka.", "PASS"),
        ("TC-05\nLive CCTV", "Simulasi Streaming Kamera", "Buka tab CCTV & IoT, pilih saluran Simpang MBK dan Adipura.", "Player menampilkan visual HUD FPS, ping status, dan indikator live recording.", "PASS"),
        ("TC-06\nRute Alternatif", "Navigasi Rekomendasi Cepat", "Buka tab Rute Rekomendasi, pilih koridor Rajabasa - Kantor Gubernur.", "Sistem menampilkan estimasi menit tempuh, jarak KM, dan daftar urutan rute via bypass.", "PASS"),
        ("TC-07\nLapor Insiden", "Partisipasi Laporan Warga", "Klik tombol Lapor Kejadian, isi formulir pelaporan dan submit.", "Modal menampilkan konfirmasi sukses dan animasi, data masuk ke antrean operator.", "PASS"),
        ("TC-08\nRBAC Switcher", "Pergantian Hak Akses Pengguna", "Gunakan switch peran: Public, Operator, Admin, Pimpinan.", "Dashboard Operasional muncul saat role non-public, navigasi mobile menyesuaikan.", "PASS"),
        ("TC-09\nCRUD Ruas Jalan", "Kelola Kondisi & Lajur Jalan", "Buka tab Kelola Ruas Jalan, isi formulir tambah jalan, simpan.", "Ruas jalan baru langsung bertambah ke daftar, input lajur tersimpan dengan benar.", "PASS"),
        ("TC-10\nAudit Logging", "Pencatatan Audit Trail Keamanan", "Lakukan aksi manipulasi status/jalan, cek subtab Audit Log.", "Sistem otomatis merekam timestamp, username, role, aksi, dan detail log.", "PASS")
    ]

    for i, data in enumerate(test_matrix):
        row = table_tc.rows[i+1]
        for j in range(5):
            cell = row.cells[j]
            cell.width = col_widths[j]
            p = cell.paragraphs[0]
            val = data[j]
            r = p.add_run(val)
            r.font.size = Pt(8.2)
            if j == 4: # Status
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                r.font.bold = True
                r.font.color.rgb = RGBColor(16, 185, 129)
            elif j == 0:
                r.font.bold = True

            set_cell_background(cell, "F8FAFC" if i%2==0 else "FFFFFF")
            set_cell_margins(cell, 60, 60, 60, 60)

    # ==========================
    # BAB 4: DEBUGGING & PERBAIKAN VIBE CODING
    # ==========================
    doc.add_page_break()
    h4 = doc.add_heading(level=1)
    r_h4 = h4.add_run("4. DOKUMENTASI DEBUGGING & PERBAIKAN VIBE CODING")
    r_h4.font.color.rgb = c_primary
    r_h4.font.size = Pt(13)

    doc.add_paragraph(
        "Berdasarkan hasil pengujian fungsional dan analisis kode (linting & visual inspection), "
        "telah dilakukan tindakan debugging dan perbaikan 'vibe coding' agar antarmuka semakin estetik, "
        "responsif, dan interaktif sesuai standar Civic Technology modern:"
    )

    table_dbg = doc.add_table(rows=6, cols=4)
    table_dbg.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_dbg.autofit = False

    dbg_headers = ["Kode", "Isu / Kebutuhan Vibe Coding", "Akar Masalah (Root Cause)", "Solusi & Perbaikan yang Diterapkan"]
    dbg_widths = [Inches(0.9), Inches(1.9), Inches(1.8), Inches(1.9)]

    for j, h_text in enumerate(dbg_headers):
        cell = table_dbg.rows[0].cells[j]
        cell.width = dbg_widths[j]
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
        set_cell_background(cell, "005854")
        set_cell_margins(cell, 80, 80, 60, 60)

    dbg_data = [
        ("VIBE-01\nNavigation", "Tampilan navigasi pada perangkat layar kecil (mobile/tablet) berisiko terpotong.", "Header hanya mengandalkan flex satu baris tanpa mekanisme hamburger menu.", "Menambahkan Responsive Drawer & Hamburger Menu dengan state toggle sehingga menu nyaman dibuka pada semua ukuran layar."),
        ("VIBE-02\nSearch Filter", "Pengguna kesulitan mencari ruas jalan tertentu di antara tabel panjang.", "Tabel hanya memiliki filter berbasis dropdown wilayah tanpa pencarian teks.", "Menambahkan fitur Real-Time Search Bar dengan ikon pencarian untuk mencari nama ruas jalan atau deskripsinya secara instan."),
        ("VIBE-03\nMap Glow & Pulse", "Peta geospasial terasa statis saat ruas jalan tertentu dipilih.", "Elemen SVG hanya menampilkan garis tebal tanpa feedback animasi visual.", "Menambahkan animasi Pulse Ring Marker dan glow effect yang berdenyut lembut pada koridor ruas jalan yang sedang aktif dipilih."),
        ("VIBE-04\nLinter Clean", "Peringatan oxlint terkait unused variables (IncidentReport, cctvs, setNewRoadLanes).", "Impor dan variabel state dideklarasikan namun belum terhubung ke kontrol UI.", "Membersihkan impor yang tidak terpakai dan menghubungkan setter lajur ke input number pada modal tambah jalan."),
        ("VIBE-05\nInteractive Feedback", "Interaksi tombol dan kartu kurang memiliki aksen kedalaman visual.", "Tombol belum memiliki efek active tap dan bayangan elevasi.", "Menerapkan micro-transitions, active scale tap (0.98), dan elevation hover shadow sesuai token design system.")
    ]

    for i, data in enumerate(dbg_data):
        row = table_dbg.rows[i+1]
        for j in range(4):
            cell = row.cells[j]
            cell.width = dbg_widths[j]
            p = cell.paragraphs[0]
            val = data[j]
            r = p.add_run(val)
            r.font.size = Pt(8.2)
            if j == 0:
                r.font.bold = True
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER

            set_cell_background(cell, "F8FAFC" if i%2==0 else "FFFFFF")
            set_cell_margins(cell, 60, 60, 60, 60)

    # ==========================
    # BAB 5: KESIMPULAN & REKOMENDASI
    # ==========================
    doc.add_paragraph()
    h5 = doc.add_heading(level=1)
    r_h5 = h5.add_run("5. KESIMPULAN DAN REKOMENDASI")
    r_h5.font.color.rgb = c_primary
    r_h5.font.size = Pt(13)

    p_conc = doc.add_paragraph(
        "Berdasarkan seluruh tahapan pengujian, debugging, dan penyempurnaan vibe coding:\n"
        "1. Aplikasi Web SMART TRAFFIC Provinsi Lampung telah berhasil ditingkatkan kualitas interaktivitas dan estetika antarmukanya (Vibe Coding) tanpa mengorbankan kepatuhan terhadap PRD.\n"
        "2. Identitas resmi Pemerintah Provinsi Lampung dan Universitas Teknokrat Indonesia terpampang secara jelas dan proporsional pada header dan footer sistem.\n"
        "3. Teks hak cipta 'Copyright©2026 by Sanda Apriliani Utami dan Dr. Erliyan Redy Susanto, M.Kom' hadir utuh di setiap halaman sistem.\n"
        "4. Kualitas kode teruji bersih dengan proses linting tuntas dan production build Vite yang sukses dalam waktu 257ms.\n"
        "5. Sistem siap dipresentasikan pada Ujian Tengah Semester (UTS) Perancangan dan Pengembangan Sistem Informasi (PPSI)."
    )
    p_conc.paragraph_format.line_spacing = 1.15

    # Signatures
    doc.add_paragraph()
    table_sig = doc.add_table(rows=3, cols=2)
    table_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_sig.autofit = False

    c_sig0 = table_sig.rows[0].cells[0]
    c_sig1 = table_sig.rows[0].cells[1]
    c_sig0.width = Inches(3.2)
    c_sig1.width = Inches(3.2)
    
    p_s0 = c_sig0.paragraphs[0]
    p_s0.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_s0.add_run("Disusun & Diuji Oleh,\nMahasiswa Pengembang").font.size = Pt(9.5)

    p_s1 = c_sig1.paragraphs[0]
    p_s1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_s1.add_run("Mengetahui & Menyetujui,\nDosen Pengampu PPSI").font.size = Pt(9.5)

    table_sig.rows[1].cells[0].paragraphs[0].add_run("\n\n\n")
    table_sig.rows[1].cells[1].paragraphs[0].add_run("\n\n\n")

    p_name0 = table_sig.rows[2].cells[0].paragraphs[0]
    p_name0.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_n0 = p_name0.add_run("SANDA APRILIANI UTAMI\nMahasiswa Sistem Informasi - FTIK")
    r_n0.font.bold = True
    r_n0.font.size = Pt(9.5)

    p_name1 = table_sig.rows[2].cells[1].paragraphs[0]
    p_name1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_n1 = p_name1.add_run("Dr. ERLIYAN REDY SUSANTO, M.Kom\nDosen Pembimbing & Pakar Transportasi")
    r_n1.font.bold = True
    r_n1.font.size = Pt(9.5)

    output_path = r"D:\mata kuliah\SEMESTER 5\PPSI\UTS-PPSI\Laporan_Testing_dan_Debugging_SMART_TRAFFIC_Lampung.docx"
    doc.save(output_path)
    print("Report updated successfully to:", output_path)

if __name__ == "__main__":
    create_report()
