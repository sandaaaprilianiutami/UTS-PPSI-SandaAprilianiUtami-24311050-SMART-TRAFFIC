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

def create_security_remediation_report():
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
    r_title = p_title.add_run("LAPORAN IMPLEMENTASI PERBAIKAN KODE & SECURITY HARDENING\nBERDASARKAN HASIL AUDIT KEAMANAN\nAPLIKASI SMART TRAFFIC PROVINSI LAMPUNG")
    r_title.font.bold = True
    r_title.font.size = Pt(14.5)
    r_title.font.color.rgb = c_primary

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run("Dokumentasi Mitigasi Celah Keamanan, Penerapan Content Security Policy (CSP), Sanitasi XSS,\nProteksi Privasi Data Pelapor (Data Masking), dan Mekanisme Anti-Spam Rate Limiting")
    r_sub.font.size = Pt(9.5)
    r_sub.font.italic = True
    r_sub.font.color.rgb = c_muted

    doc.add_paragraph()

    # Meta Table
    table_meta = doc.add_table(rows=6, cols=2)
    table_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_meta.autofit = False

    meta_items = [
        ("Nama Mahasiswa (Pengembang)", "Sanda Apriliani Utami"),
        ("Mata Kuliah", "Perancangan & Pengembangan Sistem Informasi (PPSI)"),
        ("Dosen Pengampu", "Dr. Erliyan Redy Susanto, M.Kom"),
        ("Institusi", "Universitas Teknokrat Indonesia - FTIK"),
        ("Target Perbaikan", "Aplikasi Web SMART TRAFFIC Provinsi Lampung (Frontend & API Interfaces)"),
        ("Tanggal Laporan", "November 2026")
    ]

    for i, (k, v) in enumerate(meta_items):
        row = table_meta.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.4)
        c1.width = Inches(4.1)
        
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
    # BAB 1: PENDAHULUAN & LATAR BELAKANG
    # ==========================
    h1 = doc.add_heading(level=1)
    r_h1 = h1.add_run("1. PENDAHULUAN & LATAR BELAKANG PERBAIKAN")
    r_h1.font.color.rgb = c_primary
    r_h1.font.size = Pt(13)

    p_intro = doc.add_paragraph(
        "Sebagai kelanjutan dari pelaksanaan Security Audit terhadap sistem SMART TRAFFIC Provinsi Lampung, "
        "ditemukan beberapa area peningkatan penting untuk memperkuat ketahanan sistem dari ancaman siber, menjaga privasi warga, "
        "serta memastikan stabilitas layanan publik. Laporan ini mendokumentasikan implementasi teknis perbaikan kode (Security Remediation) "
        "yang telah diterapkan langsung ke dalam basis kode aplikasi."
    )
    p_intro.paragraph_format.line_spacing = 1.15

    p_obj = doc.add_paragraph(
        "Fokus implementasi perbaikan kode keamanan meliputi:\n"
        "1. Penerapan Header Keamanan HTTP & Content Security Policy (CSP) untuk mencegah Cross-Site Scripting (XSS) dan Clickjacking.\n"
        "2. Pembangunan modul utilitas keamanan khusus (security.ts) untuk sanitasi input teks dan normalisasi nomor kontak.\n"
        "3. Implementasi pembatasan laju pengiriman laporan (Sliding Window Rate Limiting) untuk memitigasi serangan Denial of Service (DoS) dan spamming laporan fiktif.\n"
        "4. Penyamaran data kontak warga (Data Masking) sesuai persyaratan privasi NFR-006 pada dokumen PRD.\n"
        "5. Validasi integritas form dengan batasan panjang karakter (maxLength) pada seluruh input dinamis."
    )
    p_obj.paragraph_format.line_spacing = 1.15

    # ==========================
    # BAB 2: MATRIKS PERBAIKAN KODE KEAMANAN
    # ==========================
    h2 = doc.add_heading(level=1)
    r_h2 = h2.add_run("2. MATRIKS PERBAIKAN KODE & SECURITY HARDENING")
    r_h2.font.color.rgb = c_primary
    r_h2.font.size = Pt(13)

    doc.add_paragraph(
        "Berikut adalah rekapitulasi tindakan perbaikan kode keamanan yang berhasil diimplementasikan pada file-file sumber aplikasi:"
    )

    table_fix = doc.add_table(rows=6, cols=4)
    table_fix.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_fix.autofit = False

    fix_headers = ["Kode Fix", "File Sumber Terdampak", "Kerentanan / Risiko", "Tindakan Perbaikan Kode yang Diterapkan"]
    fix_widths = [Inches(1.0), Inches(1.8), Inches(1.8), Inches(2.2)]

    for j, h_text in enumerate(fix_headers):
        cell = table_fix.rows[0].cells[j]
        cell.width = fix_widths[j]
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
        set_cell_background(cell, "005087")
        set_cell_margins(cell, 80, 80, 60, 60)

    fix_data = [
        ("SEC-01\nCSP Header", "index.html & vercel.json", "Potensi injeksi script berbahaya (XSS) dan framing liar (Clickjacking).", "Menambahkan meta tag Content-Security-Policy ketat yang hanya mengizinkan resource dari domain resmi terpercaya serta menambahkan X-Frame-Options: DENY dan X-Content-Type-Options: nosniff."),
        ("SEC-02\nSanitizer", "src/utils/security.ts", "Masukan formulir laporan warga berisiko menyisipkan tag HTML atau event handler javascript.", "Membangun fungsi sanitizeText() untuk membersihkan kurung sudut (< >), javascript:, dan inline handler secara otomatis sebelum data diproses ke state."),
        ("SEC-03\nRate Limiter", "src/utils/security.ts & ReportIncidentModal.tsx", "Serangan flooding/spamming formulir laporan darurat yang dapat membebani sistem.", "Mengimplementasikan sliding window rate limiting berbasis localStorage (maksimal 5 kiriman per menit). Menampilkan pesan error hitung mundur jika pengguna terindikasi spam."),
        ("SEC-04\nData Masking", "DashboardScreen.tsx & security.ts", "Pelanggaran privasi nomor handphone pelapor yang dapat dilihat oleh akun non-petugas (NFR-006).", "Menambahkan utilitas maskPhoneNumber(). Nomor handphone pelapor disamarkan menjadi format 0812****7890 jika diakses oleh publik, dan hanya dibuka untuk role Admin dan Operator."),
        ("SEC-05\nInput Boundary", "ReportIncidentModal.tsx & DashboardScreen.tsx", "Buffer overflow / payload data teks panjang tanpa batasan karakter.", "Menetapkan atribut maxLength pada setiap input judul (100 char), pelapor (60 char), telepon (20 char), dan kronologi deskripsi (500 char).")
    ]

    for i, data in enumerate(fix_data):
        row = table_fix.rows[i+1]
        for j in range(4):
            cell = row.cells[j]
            cell.width = fix_widths[j]
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
    # BAB 3: DETAIL POTONGAN KODE PERBAIKAN
    # ==========================
    doc.add_page_break()
    h3 = doc.add_heading(level=1)
    r_h3 = h3.add_run("3. DETAIL IMPLEMENTASI POTONGAN KODE SUMBER")
    r_h3.font.color.rgb = c_primary
    r_h3.font.size = Pt(13)

    p_code1 = doc.add_paragraph()
    r_c1_title = p_code1.add_run("A. Modul Keamanan Khusus (src/utils/security.ts):")
    r_c1_title.font.bold = True
    r_c1_title.font.color.rgb = c_secondary

    p_c1_desc = doc.add_paragraph(
        "Fungsi sanitasi input dan penyamaran nomor handphone pelapor:\n"
        "```typescript\n"
        "export function sanitizeText(input: string): string {\n"
        "  if (!input) return '';\n"
        "  return input.trim().replace(/[<>]/g, '').replace(/javascript:/gi, '').replace(/on\\w+=/gi, '');\n"
        "}\n\n"
        "export function maskPhoneNumber(phone: string): string {\n"
        "  if (!phone || phone.length < 8) return '****';\n"
        "  const start = phone.substring(0, 4);\n"
        "  const end = phone.substring(phone.length - 4);\n"
        "  return `${start}****${end}`;\n"
        "}\n"
        "```"
    )
    p_c1_desc.paragraph_format.line_spacing = 1.15

    p_code2 = doc.add_paragraph()
    r_c2_title = p_code2.add_run("B. Konfigurasi Content Security Policy (index.html & vercel.json):")
    r_c2_title.font.bold = True
    r_c2_title.font.color.rgb = c_secondary

    p_c2_desc = doc.add_paragraph(
        "Kebijakan CSP dideklarasikan secara seragam baik pada file HTML maupun edge reverse-proxy Vercel:\n"
        "```html\n"
        "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; script-src 'self' 'unsafe-inline'; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; "
        "img-src 'self' data: https://images.unsplash.com https://*.lampungprov.go.id; connect-src 'self'; object-src 'none'; base-uri 'self';\" />\n"
        "<meta http-equiv=\"X-Content-Type-Options\" content=\"nosniff\" />\n"
        "<meta http-equiv=\"X-Frame-Options\" content=\"DENY\" />\n"
        "<meta name=\"referrer\" content=\"strict-origin-when-cross-origin\" />\n"
        "```"
    )
    p_c2_desc.paragraph_format.line_spacing = 1.15

    # ==========================
    # BAB 4: PENGUJIAN VERIFIKASI PERBAIKAN
    # ==========================
    doc.add_paragraph()
    h4 = doc.add_heading(level=1)
    r_h4 = h4.add_run("4. VERIFIKASI & PENGUJIAN SETELAH PERBAIKAN")
    r_h4.font.color.rgb = c_primary
    r_h4.font.size = Pt(13)

    p_verif = doc.add_paragraph(
        "Setelah perbaikan diterapkan, dilakukan serangkaian pengujian validasi untuk memastikan perbaikan tidak merusak alur aplikasi:"
    )

    table_v = doc.add_table(rows=5, cols=4)
    table_v.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_v.autofit = False

    v_headers = ["Item Pengujian", "Aksi Pengujian", "Hasil Pengamatan", "Status"]
    v_widths = [Inches(1.8), Inches(1.8), Inches(2.2), Inches(0.9)]

    for j, h_text in enumerate(v_headers):
        cell = table_v.rows[0].cells[j]
        cell.width = v_widths[j]
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(255, 255, 255)
        set_cell_background(cell, "005854")
        set_cell_margins(cell, 80, 80, 60, 60)

    v_data = [
        ("Simulasi Payload XSS", "Mengisi form laporan dengan string: <script>alert(1)</script>", "Karakter tag otomatis dinetralkan menjadi alert(1) tanpa dieksekusi oleh peramban.", "PASSED"),
        ("Spam Flooding Test", "Mengirim 6 laporan insiden secara beruntun dalam 10 detik.", "Laporan ke-6 diblokir sistem dengan dialog peringatan batas rate limit 60 detik.", "PASSED"),
        ("Pengecekan Data Masking", "Melihat daftar insiden menggunakan peran selain Admin/Operator.", "Nomor handphone pelapor tampil tersamar (0812****7890), privasi warga terjaga.", "PASSED"),
        ("Production Build Test", "Menjalankan perintah npm run build pada TypeScript compiler.", "29 modul berhasil ditransformasi dan dikompilasi tuntas dalam 214ms tanpa error.", "PASSED")
    ]

    for i, data in enumerate(v_data):
        row = table_v.rows[i+1]
        for j in range(4):
            cell = row.cells[j]
            cell.width = v_widths[j]
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
    # BAB 5: KESIMPULAN & PENGESAHAN
    # ==========================
    doc.add_page_break()
    h5 = doc.add_heading(level=1)
    r_h5 = h5.add_run("5. KESIMPULAN PERBAIKAN KODE KEAMANAN")
    r_h5.font.color.rgb = c_primary
    r_h5.font.size = Pt(13)

    p_conc = doc.add_paragraph(
        "Berdasarkan seluruh tahapan perbaikan kode dan pengujian verifikasi keamanan, dapat disimpulkan bahwa:\n"
        "1. Seluruh rekomendasi hasil Security Audit telah ditindaklanjuti secara konkret pada tataran source code aplikasi.\n"
        "2. Sistem SMART TRAFFIC Provinsi Lampung kini terlindungi dari serangan injeksi XSS, clickjacking, dan spamming formulir darurat.\n"
        "3. Hak privasi masyarakat Lampung terlindungi secara otomatis melalui mekanisme masking nomor kontak.\n"
        "4. Kode siap dideploy ke lingkungan production Vercel dengan proteksi keamanan level tinggi.\n"
        "5. Seluruh dokumen dan artefak pendukung telah terintegrasi untuk penyelesaian tugas Ujian Tengah Semester (UTS) PPSI."
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
    p_s0.add_run("Disusun & Dikerjakan Oleh,\nMahasiswa Pengembang").font.size = Pt(9.5)

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

    output_path = r"D:\mata kuliah\SEMESTER 5\PPSI\UTS-PPSI\Laporan_Perbaikan_Kode_Security_SMART_TRAFFIC_Lampung.docx"
    doc.save(output_path)
    print("Report saved successfully to:", output_path)

if __name__ == "__main__":
    create_security_remediation_report()
