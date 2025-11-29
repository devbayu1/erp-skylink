# ✅ **03_SALES_OPS_ORDER_MANAGEMENT_USER_GUIDE.md**

Panduan Pengguna Khusus Role: **Sales Operations / Order Management (OM)**

---

# **📘 Panduan Pengguna – Modul SALES OPS & ORDER MANAGEMENT**

Dokumen ini menjelaskan seluruh proses yang dilakukan oleh **Sales Ops / Order Management** dari setelah Quotation diterima Customer sampai PKS selesai, termasuk verifikasi, Form Berlangganan, PKS, KOM, dan handing over ke Procurement & Deployment.

---

# =======================================================

# **📍 Modul dalam ruang lingkup SALES OPS / OM**

Sales Ops bertanggung jawab atas modul-modul berikut:

1. **IRO – Internal Request Order**
2. **Customer Verification**
3. **Legal & Technical Review**
4. **Form Berlangganan (Subscription Form)**
5. **PKS – Perjanjian Kerja Sama / Contract**
6. **KOM – Kick-Off Meeting**

Setelah KOM selesai, proses akan diteruskan ke:

* **Procurement** (jika butuh pembelian barang)
* **Deployment** (untuk instalasi layanan)

---

# =======================================================

# **1. INTERNAL REQUEST ORDER (IRO)**

📍 Menu: **Orders → IRO**
👤 Role: **Sales Ops**
🎯 Tujuan:
IRO adalah dokumen internal yang menjadi dasar untuk proses legal, procurement, dan delivery. Dibuat setelah quotation disetujui customer.

---

## **A. Fungsi Utama IRO**

* Mengolah data dari Quotation menjadi dokumen internal.
* Menentukan kebutuhan barang/jasa.
* Menyimpan dokumen pendukung.
* Menjadi rute awal approval internal.

---

## **B. Langkah-langkah penggunaan**

### **1️⃣ Melihat daftar IRO**

Pada menu IRO, Sales Ops dapat melihat:

* IRO Number
* Customer
* Quotation
* PIC
* Status (Draft / Submitted / Approved / Returned)
* Action: View / Edit

---

### **2️⃣ Membuat IRO Baru**

1. Klik **Create IRO**
2. Pilih Quotation yang sudah **Customer Accepted**
3. Data akan terisi otomatis (customer, site, harga)
4. Isi informasi tambahan:

   * Internal PIC
   * Project Impact
   * Requested delivery
   * Kebutuhan barang/jasa
5. Upload file pendukung (opsional)
6. Klik **Save Draft**

---

### **3️⃣ Submit IRO untuk Approval**

1. Klik **Submit for Approval**
2. Status berubah menjadi **Submitted**
3. Otomatis masuk ke workflow:

   * Legal Verification
   * Technical Review
   * Manager Approval (optional)

---

### **4️⃣ Menerima feedback**

Jika reviewer memberikan catatan:

* Status menjadi **Returned**
* Sales Ops harus:

  1. Buka detail IRO
  2. Perbaiki data sesuai catatan
  3. Klik **Resubmit**

---

### **5️⃣ IRO Approved**

Setelah semua tahap selesai:

* Status: **Approved**
* Sales Ops dapat lanjut ke **Form Berlangganan**

---

---

# =======================================================

# **2. CUSTOMER VERIFICATION**

📍 Menu: **Verification**
👤 Role: **Sales Ops / Verification Team**
🎯 Tujuan:
Memastikan legalitas customer sebelum kontrak berjalan.

---

## **A. Data yang diverifikasi**

Checklist biasanya meliputi:

* NPWP
* NIB
* Akta Perusahaan
* KTP Penanggung Jawab
* Alamat Billing
* Dokumen pendukung lain

---

## **B. Langkah-langkah penggunaan**

### **1️⃣ Membuat verifikasi baru**

Biasanya otomatis dibuat ketika IRO di-submit.
Sales Ops dapat melihat daftar di menu **Verification**.

---

### **2️⃣ Melakukan verifikasi**

1. Klik **View / Process**
2. Checklist item yang sudah lengkap
3. Tambahkan catatan jika ada kekurangan
4. Upload dokumen tambahan (opsional)
5. Klik **Save**

---

### **3️⃣ Menandai verifikasi selesai**

Jika semua dokumen lengkap:

* Ubah status menjadi **Verified**

Jika belum lengkap:

* Tandai status **Pending** & berikan catatan follow-up.

---

# =======================================================

# **3. LEGAL & TECHNICAL REVIEW**

📍 Menu: **Legal Review**
👤 Role: **Legal Team & Technical Team**
🎯 Tujuan:
Melakukan review terhadap kewajiban kontrak dan aspek teknis layanan.

Sales Ops hanya berperan untuk:

* Melihat hasil review
* Menerima revisi
* Menyediakan dokumen tambahan jika diminta

---

## **A. Status yang muncul**

* **Pending Review**
* **In Review**
* **Need Revision**
* **Approved**

Sales Ops harus memperbaiki data apabila diminta revisi.

---

# =======================================================

# **4. FORM BERLANGGANAN**

📍 Menu: **Orders → Form Berlangganan**
👤 Role: **Sales Ops**
🎯 Tujuan:
Membuat subscription form (OTC & MRC), yang berisi layanan yang akan dibeli customer.

---

## **A. Langkah penggunaan**

### **1️⃣ Membuat Form Berlangganan**

1. Dari halaman IRO Approved → klik **Create Form Berlangganan**
2. Data customer otomatis masuk
3. Isi detail layanan:

   * Layanan / Bandwidth
   * Harga OTC
   * Harga MRC
   * Contract Period
4. Upload lampiran (proposal, scope of work)
5. Klik **Save Draft**

---

### **2️⃣ Mengirim ke Customer**

1. Klik **Send to Customer**
2. Opsi:

   * Generate PDF otomatis
   * Upload PDF manual
3. Status: **Sent for Signing**

---

### **3️⃣ Setelah Customer menandatangani**

Sales Ops harus:

1. Upload dokumen yang telah ditandatangani
2. Ubah status menjadi **Customer Signed**

---

# =======================================================

# **5. PKS – PERJANJIAN KERJA SAMA (CONTRACT)**

📍 Menu: **Orders → PKS**
👤 Role: **Legal + Sales Ops**
🎯 Tujuan:
Membuat dokumen kontrak resmi yang menjadi dasar billing & deployment.

---

## **A. Alur pengerjaan PKS**

### **1️⃣ Membuat PKS Baru**

1. Dari Form Berlangganan → klik **Create PKS**
2. Template otomatis terisi (dynamic template)
3. Tambahkan:

   * SLA
   * Scope of Work
   * Penandatangan
   * Legal clauses

---

### **2️⃣ Proses review & approval**

* Legal melakukan review
* Jika perlu revisi → status **Need Revision**
* Jika ok → klik **Approve**
* Status: **Ready to Sign**

---

### **3️⃣ Tanda tangan customer**

Sales Ops:

1. Kirim dokumen ke customer
2. Upload file yang sudah ditandatangani
3. Status: **Fully Signed**

---

### **4️⃣ Kontrak menjadi aktif**

Setelah kedua pihak sign:

* Status: **Active**
* Menjadi dasar:

  * Invoice
  * KOM
  * Deployment
  * Procurement

---

# =======================================================

# **6. KOM – KICK-OFF MEETING**

📍 Menu: **Orders → KOM**
👤 Role: **Sales Ops / Delivery Manager**
🎯 Tujuan:
Melakukan meeting awal sebelum eksekusi deployment.

---

## **A. Langkah-langkah KOM**

### **1️⃣ Membuat jadwal KOM**

1. Klik **Create KOM**
2. Isi:

   * Tanggal
   * Peserta (internal + customer)
   * Agenda
3. Upload TOR atau dokumen tambahan
4. Simpan

---

### **2️⃣ Meeting berlangsung**

Delivery Manager akan mencatat:

* Minutes of Meeting
* Action items
* Checklist readiness

---

### **3️⃣ Setelah KOM selesai**

Sales Ops menandai:

* Status: **Completed**
* Sistem memicu:

  * Procurement (jika butuh barang)
  * Deployment (jika layanan siap dipasang)

---

# =======================================================

# **7. Ringkasan Peran Sales Ops**

| Tugas                             | Modul             | Output          |
| --------------------------------- | ----------------- | --------------- |
| Membuat & submit IRO              | IRO               | IRO Approved    |
| Memproses verifikasi customer     | Verification      | Verified        |
| Koordinasi legal/technical review | Legal Review      | Approved        |
| Membuat Form Berlangganan         | Form Berlangganan | Customer Signed |
| Membuat & mengelola PKS           | PKS               | Contract Active |
| Menjadwalkan KOM                  | KOM               | KOM Completed   |

Sales Ops **tidak menangani**:
❌ Procurement
❌ Inventory
❌ Deployment teknis
❌ Billing / Invoice

---