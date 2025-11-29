## **📘 Panduan Pengguna — End to End Operational Flow**

Dokumen ini menjelaskan alur kerja operasional dari awal hingga akhir di sistem ERP Skylink: mulai dari penjualan, order management, legal, procurement, warehouse, deployment, hingga billing & finance.
Tujuan dokumen ini adalah agar setiap role memahami **apa yang harus dikerjakan**, **kapan**, dan **di menu mana**.

---

# **1. Overview Alur Bisnis**

Berikut gambaran alur sistem dari awal sampai akhir:

1. **Sales** membuat SI → Quotation → deal.
2. **Order Management (Sales Ops)** membuat IRO dari Quotation.
3. **Verification Team** memverifikasi legal customer.
4. **Legal & Technical** melakukan review dokumen.
5. **Sales Ops** membuat Form Berlangganan → Customer sign.
6. **Legal** membuat PKS → legal review → customer sign.
7. **Delivery/KOM Team** melakukan Kick-Off Meeting.
8. **Procurement** memproses material:
   MGRF → PRF → ARF → POV → Vendor → GIF → GRN.
9. **Warehouse** menerima barang (GRN).
10. **Deployment Team** melakukan instalasi melalui IWO.
11. **Delivery Team** membuat BAST (handover).
12. **Finance** membuat invoice, mengirim, dan mencatat pembayaran.

---

# **2. Penjelasan Per Modul & Cara Menggunakannya**

Setiap modul dijelaskan berdasarkan:

* Tujuan
* Kapan digunakan?
* Siapa yang menggunakannya (role)
* Langkah-langkah penggunaan (step-by-step)
* Output

---

# **3. MODULE DETAIL**

---

# **3.1 SALES MODULE**

## **A. Site Investment (SI)**

📍 *Menu:* Sales → Site Investment
👤 *Role:* Sales / Presales
🎯 *Tujuan:* Mencatat rencana site, estimasi kebutuhan dan potensi proyek.

### Cara Menggunakan:

1. Klik **Create New Site Investment**.
2. Isi informasi:

   * Nama proyek / customer
   * Lokasi
   * Estimasi biaya & kebutuhan
   * Upload dokumen pendukung
3. Klik **Save**.

### Output:

* SI terdaftar dan dapat digunakan untuk membuat Quotation.

---

## **B. Quotation**

📍 *Menu:* Sales → Quotations
👤 *Role:* Sales
🎯 *Tujuan:* Mengirimkan penawaran resmi ke customer.

### Cara Menggunakan:

1. Klik **Create Quotation**.
2. Pilih **Site Investment** terkait.
3. Isi item layanan, harga, periode kontrak.
4. Generate PDF (opsional).
5. Submit untuk approval internal.
6. Setelah approved → kirim ke customer.

### Output:

* Quotation berstatus *Approved* → dapat dibuat IRO.

---

---

# **3.2 ORDER MANAGEMENT MODULE**

## **A. IRO – Internal Request Order**

📍 *Menu:* Orders → IRO
👤 *Role:* Sales Ops / Order Management
🎯 *Tujuan:* Permintaan internal untuk mulai proses legal, procurement & deployment.

### Cara Menggunakan:

1. Klik **Create New IRO**.
2. Pilih **Quotation Approved**.
3. Sistem otomatis mengisi:

   * Data customer
   * SI data
   * Quotation items
4. Tambahkan:

   * Delivery requirements
   * Payment terms
   * Additional attachments
5. Submit untuk approval.

### Output:

* IRO berstatus *Submitted* → masuk ke tahap verifikasi customer.

---

## **B. Customer & Legal Verification**

📍 *Menu:* Verification
👤 *Role:* Verification team (admin/legal)
🎯 *Tujuan:* Memastikan dokumen customer lengkap & valid.

### Cara Menggunakan:

1. Buka IRO → klik **Start Verification**.
2. Centang checklist:

   * NPWP
   * NIB
   * Akta
   * KTP Direktur
   * Surat kuasa (jika perlu)
3. Upload dokumen.
4. Beri catatan jika ada kekurangan.
5. Simpan status:

   * Verified
   * Need Fixing

### Output:

* Customer dinyatakan layak lanjut ke tahap legal/technical review.

---

## **C. Legal – Technical Review**

📍 *Menu:* Legal Review
👤 *Role:* Legal & Technical Review Team
🎯 *Tujuan:* Mengecek kelayakan legal & teknis sebelum dibuat kontrak.

### Cara Menggunakan:

1. Pilih IRO yang membutuhkan review.
2. Baca requirement teknis:

   * Lokasi instalasi
   * Infrastruktur pendukung (listrik, kabel)
3. Legal mengecek draft Form Berlangganan.
4. Beri catatan request revisi jika ada.
5. Klik **Approve Review**.

### Output:

* IRO approved → Form Berlangganan bisa dibuat.

---

## **D. Form Berlangganan**

📍 *Menu:* Orders → Form Berlangganan
👤 *Role:* Sales Ops
🎯 *Tujuan:* Membuat form layanan yang akan ditandatangani customer.

### Cara Menggunakan:

1. Klik **Create Form Berlangganan**.
2. Sistem autofill dari IRO:

   * Layanan
   * Harga OTC/MRC
   * Kontrak periode
3. Upload tanda tangan perusahaan.
4. Kirim ke customer untuk sign.
5. Setelah customer sign → klik **Mark as Signed**.

### Output:

* Form signed → siap dibuat PKS.

---

## **E. PKS – Kontrak Kerja Sama**

📍 *Menu:* Orders → PKS
👤 *Role:* Legal
🎯 *Tujuan:* Membuat dokumen kontrak resmi untuk ditandatangani kedua pihak.

### Cara Menggunakan:

1. Klik **Generate PKS**.
2. Sistem otomatis mengambil data:

   * IRO
   * Form Berlangganan
   * Customer identity
3. Legal review → Submit untuk tanda tangan customer.
4. Upload signed PKS.
5. Set status: **Active**.

### Output:

* PKS Active → memicu:

  * Procurement (barang)
  * KOM & Deployment
  * Invoice finance

---

## **F. KOM – Kick Off Meeting**

📍 *Menu:* Orders → KOM
👤 *Role:* Delivery Manager
🎯 *Tujuan:* Memulai project secara resmi.

### Cara Menggunakan:

1. Klik **Schedule KOM**.
2. Isi agenda, tanggal, daftar hadir.
3. Upload MoM (Minutes of Meeting).
4. Tandai status Completed.

### Output:

* Project resmi masuk tahap deployment & procurement berjalan paralel.

---

# **3.3 PROCUREMENT MODULE**

Flow:
**MGRF → PRF → ARF → POV → GIF → GRN**

Setiap langkah ada approval-nya.

---

## **A. MGRF – Material Request**

📍 *Menu:* Procurement → MGRF
👤 *Role:* Project Team / Technical
🎯 *Tujuan:* Meminta barang untuk kebutuhan proyek.

### Cara Menggunakan:

1. Klik **Create MGRF**.
2. Isi barang yang dibutuhkan.
3. Submit untuk approval procurement.

---

## **B. PRF – Purchase Request Form**

📍 *Menu:* Procurement → PRF
👤 *Role:* Procurement
🎯 *Tujuan:* Mengajukan pembelian berdasarkan MGRF.

### Cara Menggunakan:

1. Pilih MGRF.
2. Buat PRF.
3. Submit untuk approval manajemen.

---

## **C. ARF – Approval Request Form**

📍 *Menu:* Procurement → ARF
👤 *Role:* Management
🎯 *Tujuan:* Approval pembelian.

---

## **D. POV – Purchase Order Vendor**

📍 *Menu:* Procurement → POV
👤 *Role:* Procurement
🎯 *Tujuan:* Mengirim PO ke vendor.

---

## **E. GIF – Goods Issue Form**

📍 *Menu:* Procurement → GIF
👤 *Role:* Warehouse
🎯 *Tujuan:* Pengeluaran barang (movement out).

---

## **F. GRN – Goods Receive Note**

📍 *Menu:* Procurement → GRN
👤 *Role:* Warehouse
🎯 *Tujuan:* Mencatat barang datang dari vendor.

---

# **3.4 INVENTORY MODULE**

## **A. Asset**

📍 /inventory/assets
👤 Warehouse

## **B. Movement**

📍 /inventory/movements
👤 Warehouse

---

# **3.5 DEPLOYMENT MODULE**

## **A. IWO – Installation Work Order**

📍 /iwo

## **B. Deployment Report**

📍 /deployment

---

# **3.6 BAST MODULE**

📍 /bast
👤 Delivery

---

# **3.7 FINANCE MODULE**

## **A. Invoice**

📍 /invoices
👤 Finance

## **B. Payment Recording**

📍 Payment tab dalam invoice

---

# **3.8 Billing & SLA**

Untuk recurring service.

---

# **Selesai — User Manual End to End**

---