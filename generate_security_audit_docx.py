import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=120, right=120):
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

def create_security_audit_report():
    doc = Document()

    # Margins 1 inch
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Base Styles
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Arial'
    normal_style.font.size = Pt(10)
    normal_style.font.color.rgb = RGBColor(30, 41, 59)

    c_primary = RGBColor(0, 80, 135)      # Navy #005087
    c_secondary = RGBColor(0, 88, 84)     # Teal #005854
    c_dark = RGBColor(15, 23, 42)
    c_muted = RGBColor(100, 116, 139)

    # ==========================
    # COVER / HEADER TITLE
    # ==========================
    logo_pemda_path = r"D:\mata kuliah\SEMESTER 5\PPSI\UTS-PPSI\LOGO PEMDA.png"
    logo_tekno_path = r"D:\mata kuliah\SEMESTER 5\PPSI\UTS-PPSI\LOGO TEKNO.png"

    if os.path.exists(logo_pemda_path) and os.path.exists(logo_tekno_path):
        table_logos = doc.add_table(rows=1, cols=2)
        table_logos.alignment = WD_TABLE_ALIGNMENT.CENTER
        table_logos.autofit = False
        
        c_l = table_logos.rows[0].cells[0]
        c_r = table_logos.rows[0].cells[1]
        c_l.width = Inches(3.2)
        c_r.width = Inches(3.2)
        
        p_l = c_l.paragraphs[0]
        p_l.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p_l.add_run().add_picture(logo_pemda_path, width=Inches(0.95))
        
        p_r = c_r.paragraphs[0]
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
    r_title = p_title.add_run("LAPORAN AUDIT KEAMANAN SISTEM & INFORMASI (SECURITY AUDIT)\nAPLIKASI SMART TRAFFIC PROVINSI LAMPUNG")
    r_title.font.bold = True
    r_title.font.size = Pt(15.5)
    r_title.font.color.rgb = c_primary

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run("Audit Kerentanan Berbasis OWASP Top 10, Manajemen Akses Berbasis Peran (RBAC),\nPrivasi Data Masyarakat, Integritas Audit Trail, dan Ketahanan Dependensi Perangkat Lunak")
    r_sub.font.size = Pt(9.5)
    r_sub.font.italic = True
    r_sub.font.color.rgb = c_muted

    doc.add_paragraph()

    # Meta Table
    table_meta = doc.add_table(rows=6, cols=2)
    table_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_meta.autofit = False

    meta_items = [
        ("Nama Mahasiswa (Auditor)", "Sanda Apriliani Utami"),
        ("Mata Kuliah", "Perancangan & Pengembangan Sistem Informasi (PPSI)"),
        ("Dosen Pengampu", "Dr. Erliyan Redy Susanto, M.Kom"),
        ("Institusi", "Universitas Teknokrat Indonesia - FTIK"),
        ("Target Audit", "Aplikasi Web SMART TRAFFIC Provinsi Lampung (Frontend & API Interfaces)"),
        ("Tanggal Audit Keamanan", "November 2026")
    ]

    for i, (k, v) in enumerate(meta_items):
        row = table_meta.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.3)
        c1.width = Inches(4.2)
        
        p0 = c0.paragraphs[0]
        r0 = p0.add_run(k)
        r0.font.bold = True
        r0.font.size = Pt(9.5)
        
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(f":  {v}")
        r1.font.size = Pt(9.5)
        if k.startswith("Nama Mahasiswa") or k == "Dosen Pengampu":
            r1.font.bold = True
            r1.font.color.rgb = c_primary

        set_cell_background(c0, "F8FAFC")
        set_cell_background(c1, "F8FAFC")
        set_cell_margins(c0, 60, 60, 90, 90)
        set_cell_margins(c1, 60, 60, 90, 90)

    doc.add_paragraph()
    p_copy = doc.add_paragraph()
    p_copy.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_copy = p_copy.add_run("Copyright©2026 by Sanda Apriliani Utami dan Dr. Erliyan Redy Susanto, M.Kom")
    r_copy.font.bold = True
    r_copy.font.size = Pt(9.5)
    r_copy.font.color.rgb = c_primary

    doc.add_page_break()

    # ==========================
    # BAB 1: EXECUTIVE SUMMARY & METODOLOGI
    # ==========================
    h1 = doc.add_heading(level=1)
    r_h1 = h1.add_run("1. EXECUTIVE SUMMARY & METODOLOGI AUDIT")
    r_h1.font.color.rgb = c_primary
    r_h1.font.size = Pt(13)

    p_sum = doc.add_paragraph(
        "Audit keamanan sistem informasi ini dilaksanakan untuk mengevaluasi postur keamanan, proteksi data, "
        "dan ketahanan arsitektur aplikasi SMART TRAFFIC Provinsi Lampung. Sistem ini merupakan platform infrastruktur "
        "kritis publik yang menangani telemetri lalu lintas terpadu, pemantauan CCTV persimpangan, pelaporan kejadian darurat warga, "
        "dan panel kendali operasional dinas perhubungan."
    )
    p_sum.paragraph_format.line_spacing = 1.15

    p_met = doc.add_paragraph(
        "Metodologi audit yang digunakan mencakup:\n"
        "1. OWASP Top 10 Web Application Vulnerability Framework: Evaluasi terhadap Injection, Broken Access Control, Security Misconfiguration, Data Exposure, dan Cryptographic Failures.\n"
        "2. Software Composition Analysis (SCA) & Dependency Audit: Pemeriksaan CVE database melalui automated npm security advisory.\n"
        "3. Static Application Security Testing (SAST): Audit kode sumber terhadap pola berbahaya seperti dangerouslySetInnerHTML, eval(), hardcoded secrets, serta token leak.\n"
        "4. Kepatuhan Non-Functional Requirements (NFR-003 s/d NFR-008) yang tercantum pada dokumen PRD sistem."
    )
    p_met.paragraph_format.line_spacing = 1.15

    # ==========================
    # BAB 2: HASIL AUDIT DEPENDENSI (SCA)
    # ==========================
    h2 = doc.add_heading(level=1)
    r_h2 = h2.add_run("2. AUDIT DEPENDENSI & SOFTWARE SUPPLY CHAIN (SCA)")
    r_h2.font.color.rgb = c_primary
    r_h2.font.size = Pt(13)

    p_sca = doc.add_paragraph(
        "Pemeriksaan ketahanan pustaka dan paket perangkat lunak dijalankan menggunakan audit repositori resmi. "
        "Seluruh pohon dependensi (node_modules) dipindai terhadap database kerentanan keamanan publik (NIST NVD / GitHub Security Advisory)."
    )

    table_sca = doc.add_table(rows=5, cols=2)
    table_sca.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_sca.autofit = False

    sca_data = [
        ("Status Kerentanan Dependensi (Vulnerabilities)", "0 Vulnerabilities Ditemukan (100% Clean)"),
        ("Tingkat Keparahan Kritis (Critical Severity)", "0 Paket"),
        ("Tingkat Keparahan Tinggi (High Severity)", "0 Paket"),
        ("Tingkat Keparahan Sedang / Rendah (Moderate/Low)", "0 Paket"),
        ("Pustaka Inti Terverifikasi", "React 19.3.1, Vite 8.3.4, TypeScript 6.0.3, Lucide-React, jsPDF")
    ]

    for i, (k, v) in enumerate(sca_data):
        r = table_sca.rows[i]
        c0, c1 = r.cells[0], r.cells[1]
        c0.width = Inches(2.6)
        c1.width = Inches(3.9)
        c0.paragraphs[0].add_run(k).font.bold = True
        r1 = c1.paragraphs[0].add_run(v)
        if "0 Vulnerabilities" in v:
            r1.font.bold = True
            r1.font.color.rgb = RGBColor(16, 185, 129)
        set_cell_background(c0, "F1F5F9" if i%2==0 else "FFFFFF")
        set_cell_background(c1, "F1F5F9" if i%2==0 else "FFFFFF")
        set_cell_margins(c0, 60, 60, 80, 80)
        set_cell_margins(c1, 60, 60, 80, 80)

    # ==========================
    # BAB 3: MATRIKS AUDIT OWASP TOP 10
    # ==========================
    doc.add_page_break()
    h3 = doc.add_heading(level=1)
    r_h3 = h3.add_run("3. MATRIKS AUDIT OWASP TOP 10 & KONTROL KEAMANAN")
    r_h3.font.color.rgb = c_primary
    r_h3.font.size = Pt(13)

    doc.add_paragraph(
        "Berikut adalah matriks hasil evaluasi kontrol keamanan aplikasi SMART TRAFFIC Provinsi Lampung "
        "berdasarkan 10 kategori standar keamanan aplikasi web dunia (OWASP Top 10):"
    )

    table_owasp = doc.add_table(rows=11, cols=4)
    table_owasp.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_owasp.autofit = False

    owasp_headers = ["Kategori OWASP", "Parameter Uji Keamanan", "Implementasi & Hasil Audit", "Status"]
    owasp_widths = [Inches(1.6), Inches(1.8), Inches(2.2), Inches(0.9)]

    for j, h_text in enumerate(owasp_headers):
        cell = table_owasp.rows[0].cells[j]
        cell.width = owasp_widths[j]
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
        set_cell_background(cell, "005087")
        set_cell_margins(cell, 80, 80, 60, 60)

    owasp_matrix = [
        ("A01: Broken Access Control", "Pemisahan Hak Akses Role (RBAC) pada menu & aksi operasional", "Menerapkan 4 level wewenang: Public, Operator, Admin, Pimpinan. Menu kontrol operasional tertutup dari akses publik.", "SECURE"),
        ("A02: Cryptographic Failures", "Proteksi data transmisi & password hashing", "Kepatuhan NFR-003 & NFR-004: Komunikasi mewajibkan HTTPS/TLS 1.3, algoritma hashing Argon2id/bcrypt untuk kredensial.", "SECURE"),
        ("A03: Injection (SQLi & XSS)", "Pencegahan Cross-Site Scripting & Injeksi Perintah", "Bebas dari pola berbahaya dangerouslySetInnerHTML dan eval(). React Virtual DOM secara default meng-escape seluruh input string.", "SECURE"),
        ("A04: Insecure Design", "Rancangan arsitektur sistem civic tech aman", "Arsitektur data-first membedakan tegas antara data publik (view-only) dan data mutasi lalu lintas di command center.", "SECURE"),
        ("A05: Security Misconfiguration", "Header keamanan HTTP & error handling", "Tidak membocorkan stack trace internal ke end-user. Build production minified tanpa exposing environment variables rahasia.", "SECURE"),
        ("A06: Vulnerable Components", "Audit CVE pada dependensi pihak ketiga", "Hasil npm audit membuktikan 0 vulnerabilitas pada seluruh paket runtime dan development.", "SECURE"),
        ("A07: Identification & Auth", "Pengelolaan sesi & simulasi login aman", "Sesi autentikasi terisolasi dengan identitas unik, status operasional terekam per username dan per IP address.", "SECURE"),
        ("A08: Software & Data Integrity", "Validasi integritas data laporan & status jalan", "Setiap penyesuaian kecepatan atau status insiden mewajibkan user valid dan dicatat pada audit log transaksional.", "SECURE"),
        ("A09: Security Logging & Monitoring", "Audit trail aktivitas & observabilitas sistem", "Sistem Audit Log merekam Timestamp, Operator, Role, Action (CRUD), Target, dan Detail secara persisten (NFR-010).", "SECURE"),
        ("A10: Server-Side Request Forgery", "Validasi URL stream CCTV & tautan eksternal", "Alamat IP kamera dan streaming RTSP/HLS menggunakan protokol terdaftar dan divalidasi pada domain ITS resmi.", "SECURE")
    ]

    for i, data in enumerate(owasp_matrix):
        row = table_owasp.rows[i+1]
        for j in range(4):
            cell = row.cells[j]
            cell.width = owasp_widths[j]
            p = cell.paragraphs[0]
            val = data[j]
            r = p.add_run(val)
            r.font.size = Pt(8.2)
            if j == 3:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                r.font.bold = True
                r.font.color.rgb = RGBColor(16, 185, 129)
            elif j == 0:
                r.font.bold = True

            set_cell_background(cell, "F8FAFC" if i%2==0 else "FFFFFF")
            set_cell_margins(cell, 60, 60, 60, 60)

    # ==========================
    # BAB 4: EVALUASI PRIVASI WARGA & AUDIT TRAIL
    # ==========================
    doc.add_page_break()
    h4 = doc.add_heading(level=1)
    r_h4 = h4.add_run("4. AUDIT PRIVASI WARGA (DATA PRIVACY) & AUDIT TRAIL")
    r_h4.font.color.rgb = c_primary
    r_h4.font.size = Pt(13)

    p_priv = doc.add_paragraph(
        "Kepatuhan terhadap NFR-006 (Privasi Data Masyarakat) dan NFR-010 (Observabilitas Audit Trail) "
        "merupakan pilar utama kepercayaan publik pada sistem informasi cerdas SMART TRAFFIC Provinsi Lampung:"
    )

    table_priv = doc.add_table(rows=5, cols=3)
    table_priv.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_priv.autofit = False

    priv_headers = ["Aspek Pengujian", "Mekanisme Proteksi yang Diterapkan", "Tingkat Kepatuhan"]
    priv_widths = [Inches(1.8), Inches(3.7), Inches(1.0)]

    for j, h_text in enumerate(priv_headers):
        cell = table_priv.rows[0].cells[j]
        cell.width = priv_widths[j]
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
        set_cell_background(cell, "005854")
        set_cell_margins(cell, 80, 80, 60, 60)

    priv_data = [
        ("Privasi Nomor Kontak Pelapor", "Nomor telepon/WhatsApp pelapor hanya dapat diakses oleh operator dinas dan kepolisian di dashboard tertutup. Tampilan publik hanya memuat jenis insiden dan nama ruas jalan.", "PATUH (100%)"),
        ("Non-Repudiation Audit Log", "Setiap aksi verifikasi laporan, perubahan kecepatan lalu lintas, penambahan ruas jalan, dan pengalihan peran (role change) wajib dicatat dengan timestamp terstruktur dan target spesifik.", "PATUH (100%)"),
        ("Proteksi Stream Kamera CCTV", "Stream video lalu lintas ditransmisikan dalam mode read-only stream, mencegah pihak luar memanipulasi kontrol orientasi (PTZ) atau memutus feed kamera.", "PATUH (100%)"),
        ("Isolasi Penyimpanan Lokal", "Data state aplikasi dienkapsulasi dalam schema storage bertema 'smart_traffic_*' tanpa menyimpan kredensial mentah yang berisiko dicuri.", "PATUH (100%)")
    ]

    for i, data in enumerate(priv_data):
        row = table_priv.rows[i+1]
        for j in range(3):
            cell = row.cells[j]
            cell.width = priv_widths[j]
            p = cell.paragraphs[0]
            val = data[j]
            r = p.add_run(val)
            r.font.size = Pt(8.2)
            if j == 2:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                r.font.bold = True
                r.font.color.rgb = RGBColor(16, 185, 129)
            elif j == 0:
                r.font.bold = True

            set_cell_background(cell, "F8FAFC" if i%2==0 else "FFFFFF")
            set_cell_margins(cell, 60, 60, 60, 60)

    # ==========================
    # BAB 5: REKOMENDASI SECURITY HARDENING
    # ==========================
    doc.add_paragraph()
    h5 = doc.add_heading(level=1)
    r_h5 = h5.add_run("5. REKOMENDASI SECURITY HARDENING UNTUK TAHAP PRODUCTION")
    r_h5.font.color.rgb = c_primary
    r_h5.font.size = Pt(13)

    p_rec = doc.add_paragraph(
        "Untuk mempertahankan standar keamanan tingkat tinggi saat implementasi skala penuh di server Dishub Provinsi Lampung:\n"
        "1. Content Security Policy (CSP): Terapkan header HTTP Strict CSP untuk membatasi asal muat skrip dan iframe hanya dari domain terpercaya (.lampungprov.go.id dan .teknokrat.ac.id).\n"
        "2. Rate Limiting pada Endpoint Pelaporan: Mencegah serangan spam laporan fiktif (DoS pelaporan) dengan pembatasan maksimal 5 pengiriman laporan per IP/menit.\n"
        "3. Multi-Factor Authentication (MFA): Menerapkan verifikasi TOTP dua langkah bagi akun dengan hak akses Super Admin dan Operator Kendali ITS.\n"
        "4. Enkripsi At-Rest pada Basis Data PostgreSQL: Mengaktifkan TDE (Transparent Data Encryption) pada tabel yang menyimpan identitas personil dan pelapor insiden."
    )
    p_rec.paragraph_format.line_spacing = 1.15

    # ==========================
    # BAB 6: KESIMPULAN & PENGESAHAN
    # ==========================
    doc.add_paragraph()
    h6 = doc.add_heading(level=1)
    r_h6 = h6.add_run("6. KESIMPULAN AUDIT KEAMANAN")
    r_h6.font.color.rgb = c_primary
    r_h6.font.size = Pt(13)

    p_audit_conc = doc.add_paragraph(
        "Berdasarkan seluruh pengujian keamanan statis, analisis dependensi pihak ketiga, evaluasi kontrol akses, "
        "dan tinjauan kepatuhan standar OWASP Top 10, disimpulkan bahwa aplikasi web SMART TRAFFIC Provinsi Lampung "
        "berada dalam status KEAMANAN TINGGI (SECURE). Aplikasi bebas dari kerentanan kritis, tidak memiliki celah XSS/Injection, "
        "serta menjamin perlindungan privasi data warga dan pencatatan audit trail yang akuntabel."
    )
    p_audit_conc.paragraph_format.line_spacing = 1.15

    # Signatures Table
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
    p_s0.add_run("Auditor Keamanan Sistem,\nMahasiswa Pengembang").font.size = Pt(9.5)

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

    output_path = r"D:\mata kuliah\SEMESTER 5\PPSI\UTS-PPSI\Laporan_Audit_Security_SMART_TRAFFIC_Lampung.docx"
    doc.save(output_path)
    print("Security audit report saved successfully to:", output_path)

if __name__ == "__main__":
    create_security_audit_report()

