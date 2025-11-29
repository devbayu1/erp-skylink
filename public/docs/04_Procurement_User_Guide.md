# ✅ **04_PROCUREMENT_USER_GUIDE.md**

Panduan Pengguna Khusus Role: **Procurement & Warehouse**

---

# **📘 PANDUAN PENGGUNA – MODUL PROCUREMENT & WAREHOUSE**

Dokumen ini menjelaskan seluruh alur kerja untuk divisi **Procurement** dan **Warehouse**, meliputi:

* MGRF (Material Request)
* PRF (Purchase Request)
* ARF (Approval Request)
* POV (Purchase Order Vendor)
* GIF (Goods Issue Form)
* GRN (Goods Receive Note)
* Link ke Inventory / Movement

Panduan disusun dari langkah paling awal sampai barang diterima di gudang.

---

# =======================================================

# **📍 DAFTAR MODUL PROCUREMENT**

Procurement mengelola modul berikut:

1. **MGRF – Material Goods Request Form**
2. **PRF – Purchase Request Form**
3. **ARF – Approval Request Form**
4. **POV – Purchase Order Vendor**
5. **GIF – Goods Issue Form (barang keluar)**
6. **GRN – Goods Receive Note (barang masuk)**

Warehouse mengelola:

* GIF (barang keluar untuk instalasi)
* GRN (penerimaan barang vendor)
* Movement / Stock Transfer
* Asset Registration

---

# =======================================================

# ## 1. MGRF — MATERIAL REQUEST

📍 Menu: **Procurement → MGRF**
👤 Role: **Sales Ops / Delivery / Project Manager** (requestor)
👤 Role Procurement: **Review & Approve**

### **🎯 Fungsi MGRF:**

Form permintaan material yang dibutuhkan dari project deployment atau internal kebutuhan.

---

## **A. Melihat Daftar MGRF**

Pada halaman MGRF, user dapat melihat:

* MGRF Number
* Requestor
* Project / Related IRO
* Tanggal
* Status (Draft / Submitted / Approved / Rejected)

---

## **B. Membuat MGRF Baru (Requestor)**

1. Klik **Create MGRF**
2. Isi data:

   * Project / IRO terkait
   * PIC
   * Alasan permintaan
3. Masukkan list item:

   * Nama barang
   * Qty
   * Unit
4. Upload lampiran (optional)
5. Klik **Save Draft**
6. Jika sudah siap → klik **Submit MGRF**

---

## **C. Review oleh Procurement**

1. Procurement buka MGRF → klik **Review**
2. Periksa:

   * Ketersediaan barang
   * Harga standar
   * Persetujuan budget
3. Jika perlu revisi → **Return to Requestor**
4. Jika setuju → **Approve MGRF**

---

## **D. Output MGRF**

* Jika approved → dapat dilanjutkan ke **PRF** atau **GIF**
* Jika barang tersedia → lanjut GIF
* Jika harus beli → lanjut PRF

---

# =======================================================

# ## 2. PRF — PURCHASE REQUEST FORM

📍 Menu: **Procurement → PRF**
👤 Role: **Procurement**

### 🎯 **Tujuan PRF:**

Menentukan barang apa yang harus dibeli dan membuat permintaan pembelian ke vendor.

---

## **A. Membuat PRF dari MGRF**

1. Buka MGRF Approved
2. Klik **Create PRF**
3. Item otomatis terisi dari MGRF

---

## **B. Isi Form PRF**

* Vendor (jika sudah tahu)
* Estimasi harga
* Attachment (quotation vendor)
* Catatan procurement

Klik **Save** → kemudian **Submit PRF**.

---

## **C. Approval PRF**

PRF biasanya butuh persetujuan manajemen (depending company policy).

Status:

* Draft
* Submitted
* Approved
* Rejected

---

## **D. Output PRF**

PRF Approved → dapat dibuatkan **ARF** atau langsung **POV**.

---

# =======================================================

# ## 3. ARF — APPROVAL REQUEST FORM

📍 Menu: **Procurement → ARF**
👤 Role: **Procurement / Management**

### 🎯 **Tujuan ARF:**

Meminta persetujuan resmi untuk pembelian yang melebihi batas anggaran atau kategori tertentu.

Contoh:

* Pembelian di atas 10 juta
* Pembelian barang sensitif
* Vendor baru

---

## **A. Membuat ARF**

ARF biasanya dibuat dari PRF:

1. Buka PRF Approved
2. Klik **Generate ARF**
3. Isi:

   * Budget owner
   * Reason approval
   * Upload dokumen support
4. Click **Send for Approval**

---

## **B. Approval Flow**

* Manager 1
* Manager 2
* Finance Controller (opsional)

Status:

* Pending Review
* Approved
* Rejected

---

## **C. Output ARF**

Jika disetujui → Procurement dapat membuat **POV**.

---

# =======================================================

# ## 4. POV — PURCHASE ORDER VENDOR

📍 Menu: **Procurement → POV**
👤 Role: **Procurement**

### 🎯 **Tujuan POV:**

Mengirimkan Purchase Order resmi ke vendor untuk pembelian barang/jasa.

---

## **A. Membuat POV**

1. Buka ARF Approved / PRF Approved
2. Klik **Create POV**
3. Isi data:

   * Vendor
   * Delivery lead time
   * Payment Terms
   * Item + Qty + Price
4. Klik **Generate PO Document**
5. Download / kirim ke vendor

---

## **B. Status POV**

* Draft
* Issued
* Vendor Acknowledged
* Delivered
* Closed

---

## **C. Mengupload PO Signed Vendor**

Setelah vendor tanda tangan:

1. Upload file
2. Ubah status: **Vendor Acknowledged**

---

## **D. Output POV**

Setelah vendor kirim barang → masuk ke **GRN (Goods Receive Note)**.

---

# =======================================================

# ## 5. GIF — GOODS ISSUE FORM (Barang Keluar)

📍 Menu: **Procurement → GIF**
👤 Role: **Warehouse / Inventory**

### 🎯 **Tujuan GIF:**

Mencatat barang keluar dari gudang untuk keperluan:

* Instalasi project
* Mutasi antar gudang
* Replacement device
* Pinjam pakai

---

## **A. Membuat GIF**

1. Klik **Create GIF**
2. Pilih type:

   * OUT → ke project/customer
   * TRANSFER → antar gudang
3. Tambahkan item:

   * Item name
   * Qty keluar
4. Simpan / Submit

---

## **B. Output GIF**

* Mengurangi stok gudang
* Digunakan sebagai dasar instalasi / movement

---

# =======================================================

# ## 6. GRN — GOODS RECEIVE NOTE (Barang Masuk)

📍 Menu: **Procurement → GRN**
👤 Role: **Warehouse / Inventory**

### 🎯 **Tujuan GRN:**

Dokumen penerimaan barang dari vendor berdasarkan POV.

---

## **A. Membuat GRN Baru**

1. Klik **Create GRN**
2. Pilih **POV Number** (berdasarkan vendor delivery)
3. Data item otomatis muncul dari POV
4. Isi data penerimaan:

   * Received Date
   * Received By
   * Quality check per item
   * Attach delivery note / foto barang
5. Klik **Submit GRN**

---

## **B. Status GRN**

* Pending
* Inspecting
* Received
* Rejected
* Completed

---

## **C. Pemeriksaan Barang**

Warehouse wajib melakukan:

* Cocokkan jumlah
* Periksa kondisi
* Menilai apakah sesuai PO

Jika ada mismatch:

* Catat pada kolom **Discrepancy Notes**
* Status bisa jadi **Rejected**

---

## **D. Output GRN**

* Barang masuk → stok meningkat
* Digunakan oleh Finance untuk **Invoice Matching**
* Digunakan oleh Deployment untuk instalasi

---

# =======================================================

# ## 7. HUBUNGAN PROCUREMENT ↔ INVENTORY

Setiap tindakan procurement akan memengaruhi inventory:

| Modul | Dampak ke Inventory                 |
| ----- | ----------------------------------- |
| MGRF  | Menunjukkan kebutuhan stok          |
| PRF   | Menandakan akan dilakukan pembelian |
| ARF   | Membuka izin pembelian              |
| POV   | Dokumen resmi order ke vendor       |
| GRN   | **Menambah stok masuk**             |
| GIF   | **Mengurangi stok keluar**          |

---

# =======================================================

# ## 8. RINGKASAN PERAN PROCUREMENT

| Tugas                       | Modul | Hasil                           |
| --------------------------- | ----- | ------------------------------- |
| Menerima permintaan barang  | MGRF  | MGRF Approved                   |
| Membuat PRF                 | PRF   | PRF Approved                    |
| Membuat permintaan approval | ARF   | ARF Approved                    |
| Membuat PO                  | POV   | PO Issued & Vendor Acknowledged |
| Mencatat barang keluar      | GIF   | Barang keluar gudang            |
| Menerima barang             | GRN   | Barang masuk gudang             |

---

# =======================================================

# ## 9. BEST PRACTICES PROCUREMENT

### ✔ Gunakan status untuk memastikan workflow rapi

Jangan loncat status manual.

### ✔ Selalu cocokkan POV ↔ GRN

Agar tidak ada mismatch stok.

### ✔ Simpan bukti transaksi

Delivery note, invoice vendor, foto barang.

### ✔ Pastikan harga & qty benar sebelum issue PO

Karena PO adalah dokumen resmi legal.

### ✔ Lakukan stok opname berkala

Untuk menghindari selisih stok.

---