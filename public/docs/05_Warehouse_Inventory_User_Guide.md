# ✅ **05_INVENTORY_WAREHOUSE_USER_GUIDE.md**

**ERP SYSTEM – Panduan Pengguna Modul Inventory & Warehouse**

---

# **📘 PANDUAN PENGGUNA – INVENTORY & WAREHOUSE**

Dokumen ini menjelaskan seluruh alur penggunaan modul:

* Asset Management
* Warehouse Stock
* Movements (IN / OUT / TRANSFER / RETURN / DISPOSAL)
* GIF (Goods Issue Form) – ringkasan dari modul Procurement
* GRN (Goods Receive Note) – penerimaan barang dari vendor
* Stock Adjustment
* Stok Opname

Manual ini ditujukan untuk role:

👤 **Warehouse Staff**
👤 **Inventory Controller**
👤 **Procurement (sebagian proses)**
👤 **Technician (untuk barang keluar instalasi)**

---

# =======================================================

# **📍 DAFTAR FITUR INVENTORY**

1. Asset List (Asset Registration)
2. Movement List (In/Out/Transfer/Return/Disposal)
3. GIF (Goods Issue Form → Barang Keluar)
4. GRN (Goods Receive Note → Barang Masuk)
5. Warehouse Stock (stock overview)
6. Physical Stock Opname
7. Stock Adjustment

---

# =======================================================

# ## **1. ASSET MANAGEMENT**

📍 Menu: **Inventory → Assets**
👤 Role: Warehouse / Inventory Controller

### 🎯 **Tujuan Modul Asset:**

Mencatat barang yang memiliki serial number dan harus dilacak secara individual.

Contoh:

* Modem / ONT / Router
* Antenna / ODU / IDU
* Server
* Tools mahal

---

## **A. Melihat Daftar Asset**

Pada halaman asset, user dapat melihat:

| Field         | Keterangan                          |
| ------------- | ----------------------------------- |
| Asset ID      | Nomor unik aset                     |
| Serial Number | SN perangkat                        |
| Kategori      | Tipe aset                           |
| Lokasi        | Gudang / Project / Customer         |
| Status        | InStock / InUse / Broken / Returned |
| PIC           | Penanggung jawab                    |

Fitur pencarian dan filter tersedia.

---

## **B. Registrasi Asset Baru**

1. Klik **New Asset**
2. Isi data:

   * Serial Number
   * Nama / Kategori
   * Vendor / GRN Reference
   * Tanggal masuk
   * Lokasi awal
3. Upload foto atau dokumen (opsional)
4. Klik **Save Asset**

---

## **C. Update Asset**

Masuk detail asset:

* Edit informasi
* Update status (InStock → InUse → Returned)
* Tambah catatan history

---

## **D. Riwayat Asset**

Setiap asset memiliki:

* Movement history
* Assignment history
* Condition updates

---

# =======================================================

# ## **2. MOVEMENT MANAGEMENT**

📍 Menu: **Inventory → Movements**
👤 Role: Warehouse / Inventory Controller

Movement mencatat **perpindahan barang** dalam gudang atau keluar masuk gudang.

Movement Types:

| Type         | Fungsi                                         |
| ------------ | ---------------------------------------------- |
| **IN**       | Barang masuk (tanpa GRN, internal return, dll) |
| **OUT**      | Barang keluar ke project / customer            |
| **TRANSFER** | Perpindahan antar gudang                       |
| **RETURN**   | Barang kembali dari teknisi / project          |
| **DISPOSAL** | Barang rusak / write-off                       |

---

## **A. Melihat Daftar Movement**

Kolom:

* Movement No
* Type
* Reference (GIF/GRN/IWO/PO)
* Qty
* Status
* From & To Location

---

## **B. Membuat Movement Baru**

1. Klik **New Movement**
2. Pilih movement type:

   * IN
   * OUT
   * TRANSFER
   * RETURN
   * DISPOSAL
3. Isi lokasi:

   * From Location
   * To Location
4. Tambahkan item:

   * Nama barang
   * Qty
   * Unit
5. Klik **Submit Movement**

---

## **C. Status Movement**

* Draft
* Completed
* Cancelled

Movement Completed → stok otomatis berubah.

---

# =======================================================

# ## **3. GIF — GOODS ISSUE FORM (Barang Keluar)**

📍 Menu: **Inventory → GIF** (atau Procurement → GIF)
👤 Role: Warehouse

> 📌 Catatan: GIF untuk barang keluar digunakan baik modul Procurement maupun Inventory.

---

## **A. Fungsi GIF**

Mengeluarkan barang dari gudang untuk:

* Instalasi pelanggan
* Project deployment
* Replacement device
* Mutasi stok
* Peminjaman alat

---

## **B. Membuat GIF**

1. Klik **Create GIF**
2. Pilih tujuan:

   * Project (link ke IRO/IWO)
   * Customer (replacement)
   * Warehouse lain (transfer)
3. Tambahkan item:

   * Nama barang
   * Qty
4. Upload Berita Acara / FOTO (opsional)
5. Klik **Submit GIF**

Barang keluar → stok berkurang → generate movement otomatis.

---

## **C. Output GIF**

GIF menjadi sumber:

* Movement OUT
* Instalasi (IWO)
* Replacement tracking

---

# =======================================================

# ## **4. GRN — GOODS RECEIVE NOTE (Barang Masuk)**

📍 Menu: **Inventory → GRN**
👤 Role: Warehouse

> Catatan: GRN biasanya berasal dari POV (Purchase Order Vendor), dan menjadi bukti sah penerimaan barang dari vendor.

---

## **A. Membuat GRN**

1. Klik **Create GRN**
2. Pilih **POV** → data item otomatis muncul
3. Isi:

   * Tanggal diterima
   * Received By
   * Kondisi barang
4. Upload lampiran:

   * Delivery Note
   * Foto barang
5. Klik **Submit**

---

## **B. Status GRN**

* Pending
* Inspecting
* Received
* Rejected
* Completed

---

## **C. Pemeriksaan Barang**

Warehouse wajib:

* Cek jumlah item
* Cek kondisi fisik
* Cocokkan PO vs barang datang
* Catat mismatch

Jika mismatch besar → status **Rejected**

---

## **D. Output GRN**

* Tambah stok gudang
* Jadi referensi Finance untuk Invoice Matching
* Aset yang memiliki serial number dapat otomatis didaftarkan

---

# =======================================================

# ## **5. STOCK OVERVIEW**

📍 Menu: **Inventory → Stock**
👤 Role: Warehouse / Inventory Controller

Menampilkan daftar seluruh barang berikut:

* Stock On Hand
* Stock Reserved
* Stock Available
* Stock In Transit

Berdasarkan gudang:

* Warehouse Jakarta
* Warehouse Surabaya
* Warehouse Site / Cabang

---

## **A. Fitur Pencarian & Filter**

User dapat filter:

* Category
* Warehouse Location
* Minimum / Maximum qty
* Low Stock alert

---

## **B. Export Data**

Ada tabel export:

* PDF
* Excel
* CSV

---

# =======================================================

# ## **6. PHYSICAL STOCK OPNAME**

📍 Menu: **Inventory → Stock Opname**
👤 Role: Inventory Controller / Auditor

Proses pemeriksaan fisik barang di gudang.

---

## **A. Membuat Stock Opname Baru**

1. Klik **Start Stock Opname**
2. Sistem otomatis membekukan stok (freeze stock)
3. Staff melakukan pemeriksaan fisik
4. Masukkan hasil hitung:

   * Qty actual
   * Kondisi barang
5. Submit hasil

---

## **B. Review Selisih Stok**

Sistem menghitung:

* Selisih qty
* Value impact
* Item mismatch

---

## **C. Approval**

Supervisor melakukan approval:

* Ajustment stock
* Reject opname

---

## **D. Output**

* Automatic stock adjustment
* Stock history updated

---

# =======================================================

# ## **7. STOCK ADJUSTMENT**

📍 Menu: **Inventory → Adjustments**
👤 Role: Supervisor / Inventory Head

Adjustment diperlukan bila:

* Barang hilang
* Rusak
* Audit menemukan selisih
* Return barang tidak lengkap

---

## **A. Membuat Adjustment**

1. Klik **New Adjustment**
2. Pilih item
3. Tentukan jenis:

   * Increase
   * Decrease
4. Isi sebab adjustment
5. Submit

---

## **B. Approval Flow**

* Draft
* Submitted
* Approved / Rejected

---

# =======================================================

# ## **8. LAPORAN INVENTORY**

Sistem menyediakan laporan:

* Stock Card (per item)
* Movement History
* Asset Tracking
* GRN Summary
* GIF Summary
* Stock Valuation
* Slow Moving Items
* Write-off Report

Semua dapat di-export PDF / Excel.

---

# =======================================================

# ## **9. PERAN & TANGGUNG JAWAB INVENTORY**

| Role                 | Tanggung Jawab                     |
| -------------------- | ---------------------------------- |
| Warehouse Staff      | Kelola GIF, GRN, stok fisik        |
| Inventory Controller | Movement, stock adjustment, opname |
| Supervisor           | Approval opname & adjustment       |
| Procurement          | Menghubungkan ke POV/GRN           |
| Technician           | Terima barang untuk instalasi      |

---

# =======================================================

# ## **10. BEST PRACTICES INVENTORY**

✔ Selalu cocokkan POV ↔ GRN untuk validasi barang masuk
✔ Gunakan Movement untuk tracking semua perpindahan
✔ Lakukan stock opname rutin
✔ Pastikan asset yang memiliki Serial Number diregistrasi
✔ Simpan foto barang masuk untuk bukti GRN
✔ Dokumen GIF harus sesuai barang keluar sebenarnya
✔ Gunakan low-stock alert untuk reorder planning

---