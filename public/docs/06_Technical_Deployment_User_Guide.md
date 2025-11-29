Baik, saya buatkan **dokumen lengkap, rinci, dan siap pakai untuk pengguna (bukan developer)**:

# ✅ **06_DEPLOYMENT_IWO_USER_GUIDE.md**

**ERP SYSTEM – Panduan Pengguna Modul Deployment & Installation Work Order (IWO)**

---

# **📘 PANDUAN PENGGUNA – DEPLOYMENT & IWO**

Dokumen ini menjelaskan seluruh alur operasional pada modul:

* IWO (Installation Work Order)
* Scheduling teknisi
* Deployment form (Hasil Instalasi)
* Upload foto & evidence
* Status tracking
* Hubungan dengan modul Sales, IRO, PKS, dan GIF
* Approval dan BAST

Manual ini ditujukan untuk role:

👤 **Project Coordinator**
👤 **Deployment / Installation Team**
👤 **Warehouse (untuk pengeluaran barang via GIF)**
👤 **Customer Service (monitoring status)**
👤 **Supervisor / Manager**

---

# =======================================================

# # **01. OVERVIEW ALUR DEPLOYMENT**

Alur besar proses instalasi pelanggan dan deployment:

1. **IRO (Installation Request Order)** dibuat dari modul Order Management
2. IRO disetujui → menghasilkan **IWO (Installation Work Order)**
3. IWO dijadwalkan (jadwal teknisi, lokasi, SLA)
4. Warehouse mengeluarkan barang via **GIF**
5. Teknisi melakukan instalasi di lokasi pelanggan
6. Teknisi mengisi **Deployment Report** di aplikasi
7. Upload Foto Instalasi (Before / After / Device / Speedtest / Router SN)
8. Supervisor melakukan review & approval
9. Setelah approved → sistem dapat lanjut ke **BAST**
10. Deployment selesai & status IWO → Completed

---

# =======================================================

# # **02. IWO – INSTALLATION WORK ORDER**

📍 Menu: **Installation → IWO**
👤 Role: Project Coordinator, Technician, Supervisor

---

# ## **A. Melihat Daftar IWO**

Tabel berisi:

| Field               | Keterangan                                          |
| ------------------- | --------------------------------------------------- |
| IWO Number          | Nomor Work Order                                    |
| Customer Name       | Nama pelanggan                                      |
| Service Type        | FO / Wireless / Starlink / Dedicated                |
| Address             | Lokasi pemasangan                                   |
| Schedule Date       | Jadwal kunjungan                                    |
| Assigned Technician | Teknisi yang ditugaskan                             |
| Status              | Draft / Scheduled / On-site / Completed / Cancelled |

Fitur:

* Search
* Filter berdasarkan status, teknisi, kota
* Export PDF / Excel

---

# ## **B. Membuat IWO Baru**

### **Langkah-langkah:**

1. Klik **Create IWO**
2. Pilih sumber data:

   * Dari **IRO** (recommended)
   * Manual create (khusus internal order)
3. Sistem otomatis mengisi:

   * Data pelanggan
   * Service type
   * Alamat instalasi
   * Detail paket
4. Isi detail teknis:

   * Lokasi koordinat (GPS)
   * Akses lokasi
   * Catatan teknis
5. Klik **Save IWO**

Status awal: **Draft**

---

# ## **C. Menjadwalkan IWO**

📍 Role: Project Coordinator

1. Masuk detail IWO
2. Klik **Schedule Installation**
3. Isi:

   * Tanggal
   * Jam mulai & selesai
   * Teknisi (1 atau lebih)
   * Keterangan tambahan
4. Klik **Save Schedule**

Status berubah → **Scheduled**

---

# ## **D. Assign Teknisi**

Teknisi dapat:

* Melihat daftar pekerjaan
* Menerima / menolak penugasan
* Melihat lokasi via map
* Melihat item yang harus dibawa

---

# =======================================================

# # **03. GIF UNTUK INSTALASI (BARANG KELUAR)**

📍 Menu: **Inventory → GIF**
👤 Role: Warehouse, Technician

IWO membutuhkan barang seperti:

* ONT / Router
* Kabel
* Wall bracket
* POE
* Peralatan pendukung

### **Proses:**

1. Project Coordinator mengajukan item ke Warehouse
2. Warehouse membuat **GIF** dan mengeluarkan barang
3. Barang dipinjamkan ke teknisi untuk instalasi
4. Sistem mencatat movement OUT

GIF otomatis terhubung ke IWO.

---

# =======================================================

# # **04. PELAKSANAAN INSTALASI**

📍 Role: Technician

Saat teknisi tiba di lokasi pelanggan:

### **A. Ubah status IWO**

* Dari **Scheduled** → **On-Site**

Teknisi memulai pekerjaan:

* Tarik kabel
* Pasang router / antena
* Konfigurasi perangkat
* Cek sinyal & quality
* Testing speed
* Verifikasi konektivitas

---

# =======================================================

# # **05. FORM DEPLOYMENT REPORT**

📍 Menu: **Deployment → Submit Installation Report**
👤 Role: Technician

Setelah instalasi selesai, teknisi wajib mengisi deployment form.

### **A. Form Deployment berisi:**

1. **Informasi Lokasi**

   * Pelanggan
   * Alamat
   * Koordinat GPS

2. **Detail Perangkat**

   * Router / ONT SN
   * Antenna SN
   * POE SN
   * Access Point SN
   * Panjang kabel
   * Tipe material yang digunakan

3. **Pengukuran Teknis**

   * Power level
   * SNR
   * CQ / RSSI / RSRP (depending tech)
   * Speedtest upload/download

4. **Dokumentasi Foto (wajib)**

   * Foto lokasi (Before)
   * Foto instalasi selesai (After)
   * Foto perangkat
   * Foto speedtest
   * Foto pelanggan

5. **Checklist**

   * Pemasangan rapi
   * Wiring aman
   * Test berhasil
   * Pelanggan puas

6. **Tanda Tangan Pelanggan** (opsional)

---

# =======================================================

# # **06. UPLOAD FOTO INSTALASI**

Teknisi wajib upload foto:

| Foto            | Fungsi                    |
| --------------- | ------------------------- |
| Before          | Dokumentasi kondisi awal  |
| After           | Bukti instalasi selesai   |
| Router / ONT SN | Validasi perangkat        |
| Antenna         | Bukti pemasangan          |
| Speedtest       | Bukti performa            |
| Pelanggan       | Bukti kehadiran di lokasi |

Semua foto tersimpan di **Deployment Gallery**.

---

# =======================================================

# # **07. REVIEW & APPROVAL DEPLOYMENT**

📍 Role: Supervisor

### **A. Pemeriksaan**

Supervisor mengecek:

* Kesesuaian hasil instalasi
* Kualitas foto dan dokumentasi
* Kesesuaian perangkat
* Testing performa
* Catatan teknisi
* Koordinat lokasi

### **B. Aksi Approval**

* **Approve Deployment** → lanjut ke BAST
* **Request Revision** (teknisi revisi)
* **Reject**

---

# =======================================================

# # **08. STATUS FLOW IWO**

| Status            | Deskripsi                |
| ----------------- | ------------------------ |
| Draft             | Belum dijadwalkan        |
| Scheduled         | Teknis sudah dijadwalkan |
| On-Site           | Teknisi sedang bekerja   |
| Waiting Review    | Menunggu supervisor      |
| Revision Required | Revisi data teknisi      |
| Completed         | Instalasi selesai        |
| Cancelled         | Dibatalkan               |

---

# =======================================================

# # **09. BAST FLOW (LANJUTAN SETELAH DEPLOYMENT)**

Setelah deployment approved:

1. Sistem generate **BAST Draft**
2. Customer Service kontak pelanggan
3. Pelanggan konfirmasi layanan aktif
4. BAST Final diterbitkan
5. Dapat ditandatangani digital atau manual

---

# =======================================================

# # **10. REPORTING DEPLOYMENT**

Menu: **Deployment → Reports**

Laporan tersedia:

* Daily Installation Report
* Technician Productivity
* Installation Success Rate
* Material Usage Summary
* SLA Installation
* Installation Checklist Summary

Semua dapat di-export PDF / Excel.

---

# =======================================================

# # **11. PERAN & TANGGUNG JAWAB**

| Role                | Tugas                             |
| ------------------- | --------------------------------- |
| Project Coordinator | Membuat & menjadwalkan IWO        |
| Technician          | Instalasi & isi deployment report |
| Warehouse           | Siapkan barang (GIF)              |
| Supervisor          | Review & approve deployment       |
| Customer Service    | Follow-up pelanggan & BAST        |
| Manager             | Monitoring kualitas instalasi     |

---

# =======================================================

# # **12. BEST PRACTICES**

✔ Jadwalkan IWO minimal H-1
✔ Pastikan item GIF sesuai pekerjaan
✔ Foto harus jelas dan lengkap
✔ Wajib speedtest onsite
✔ Isi SN perangkat dengan benar
✔ Lokasi GPS harus akurat
✔ Supervisor harus review dalam 24 jam
✔ Selalu arsipkan BAST untuk ke finance

---

# 🎉 **Deployment & IWO User Guide – Selesai**