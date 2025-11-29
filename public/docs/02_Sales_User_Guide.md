# ✅ **02_SALES_USER_GUIDE.md**

Panduan Pengguna Khusus Role: **Sales / Presales Team**

---

# **📘 Panduan Pengguna – Modul SALES**

Dokumen ini menjelaskan seluruh proses yang dilakukan oleh **Sales & Presales** di sistem, mulai dari prospek awal sampai quotation disetujui dan diteruskan ke Order Management.

---

# **📍 Modul dalam ruang lingkup SALES**

Sales hanya menggunakan 2 modul utama:

1. **Site Investment (SI)**
2. **Quotation**

Sales TIDAK mengurus proses setelah quotation approved. Semua proses selanjutnya dikerjakan Sales Ops / OM.

---

# =======================================================

# **1. SITE INVESTMENT (SI)**

📍 Menu: **Sales → Site Investment**
👤 Role: **Sales / Presales**
🎯 Tujuan:
Digunakan untuk mencatat data awal peluang proyek, termasuk lokasi, potensi, estimasi biaya, dan informasi teknis dasar.

---

## **A. Fungsi Utama SI**

* Menjadi *baseline* awal informasi project/customer.
* Digunakan sebagai referensi untuk pembuatan Quotation.
* Menyimpan seluruh dokumen pendukung (proposal awal, foto lokasi, estimasi biaya, dll).

---

## **B. Langkah-langkah penggunaan**

### **1️⃣ Melihat daftar SI**

1. Masuk ke menu **Sales → Site Investment**
2. Sistem menampilkan:

   * SI Number
   * Customer / Project Name
   * Status
   * Created Date
   * Action (View / Edit)

---

### **2️⃣ Membuat SI Baru**

1. Klik tombol **Create New SI**
2. Isi form berikut:

   * Project / Customer Name
   * Lokasi site
   * Deskripsi kebutuhan
   * Estimasi biaya (opsional)
   * Upload file pendukung (opsional)
3. Klik **Save SI**

---

### **3️⃣ Mengedit SI**

1. Buka SI → tekan **Edit**
2. Lakukan perubahan → klik **Save Changes**

> Catatan: Setelah digunakan dalam Quotation, beberapa bagian SI tidak bisa diubah untuk menjaga audit trail.

---

### **4️⃣ Melihat Detail SI**

Pada halaman detail SI, Sales dapat melihat:

* Informasi lengkap project
* Dokumen pendukung
* History perubahan
* Quotation yang dibuat berdasarkan SI (auto-linked)

---

## **C. Output SI**

* SI akan memiliki **SI Number** otomatis.
* SI akan menjadi input utama untuk pembuatan Quotation.

---

# =======================================================

# **2. QUOTATION**

📍 Menu: **Sales → Quotations**
👤 Role: **Sales**
🎯 Tujuan:
Membuat dokumen penawaran resmi kepada pelanggan sebelum masuk proses Order Management.

---

## **A. Fungsi Utama Quotation**

* Mendefinisikan item layanan yang ditawarkan.
* Mengatur harga OTC, MRC, discount, dan skema kontrak.
* Mencetak dokumen penawaran (PDF).
* Proses approval internal sebelum dikirim ke customer.
* Menjadi dasar pembuatan IRO.

---

## **B. Langkah-langkah penggunaan**

### **1️⃣ Melihat daftar Quotation**

Pada menu Quotations, Sales dapat melihat:

* Quotation Number
* Customer Name
* SI Number (source)
* Total Price
* Status (Draft / Submitted / Approved / Rejected)
* Action (View / Edit / Generate IRO)

---

### **2️⃣ Membuat Quotation Baru**

1. Klik **Create New Quotation**
2. Pilih **Site Investment** (SI) yang akan digunakan
3. Form otomatis mengisi:

   * Customer Name
   * Project
   * Estimasi biaya dari SI
4. Isi komponen berikut:

   * Layanan / paket
   * Harga OTC (One Time Charge)
   * Harga MRC (Monthly Recurring Charge)
   * Contract Period
   * Technical requirement (opsional)
5. Upload dokumen atau lampiran
6. Klik **Save Draft**

---

### **3️⃣ Mengirim Quotation (Submit Approval)**

Setelah draft siap:

1. Klik **Submit for Approval**
2. Sistem mengirimkan notification ke approver internal
3. Status berubah menjadi:

   * **Submitted**

---

### **4️⃣ Approval Internal**

(Ini proses otomatis, Sales hanya melihat status)

Status akan berubah menjadi:

* **Approved** → Sales dapat mengirim ke Customer
* **Rejected** → Sales harus revisi

---

### **5️⃣ Mengirim Quotation ke Customer**

Setelah Approved:

1. Klik **Send to Customer**
2. Sistem akan:

   * Generate PDF
   * Atau memungkinkan upload PDF manual
3. Status menjadi **Sent to Customer**

---

### **6️⃣ Customer menyetujui Quotation**

Jika deal:

1. Ubah status ke **Customer Accepted**
2. Tombol **Create IRO** akan aktif.

> **IRO dibuat oleh Sales Ops**, bukan Sales.

---

## **C. Output Quotation**

* Dokumen penawaran lengkap (PDF).
* Status jelas (Draft → Submitted → Approved → Accepted).
* Siap digunakan untuk membuat **IRO**.

---

# =======================================================

# **3. Ringkasan Tugas Sales**

| Tugas             | Modul           | Output                |
| ----------------- | --------------- | --------------------- |
| Membuat SI        | Site Investment | SI Number             |
| Membuat Quotation | Quotation       | Draft quotation       |
| Submit approval   | Quotation       | Status: Submitted     |
| Kirim ke customer | Quotation       | Customer received PDF |
| Mark as accepted  | Quotation       | Siap untuk dibuat IRO |

Sales **tidak** membuat:
❌ IRO
❌ Legal Verification
❌ Form Berlangganan
❌ PKS
❌ KOM
❌ Procurement
❌ Deployment
❌ Invoice

Semua itu tugas Sales Ops, Legal, Delivery, Procurement, atau Finance.

---