✅ FLOW UTAMA SUDAH ADA
✔ 1. SI → Quotation → Approval
✔ 2. IRO (Internal Request Order)
✔ 3. Form Berlangganan
✔ 4. PKS (Contract)
✔ 5. KOM (Kick-Off Meeting)

Flow ini sudah kita buat lengkap List + Form + Detail.

❗ FLOW YANG TERLEWAT / BELUM KITA BUAT

Berikut item yang muncul pada gambaran awal sistem / dokumen real perusahaan, tapi belum diimplementasikan:

❌ 1. ADM CHECKLIST / BERKAS LEGAL / VALIDASI CUSTOMER (sebelum Form Berlangganan)

Pada sistem corporate ISP biasanya sebelum Form Berlangganan ada:

Customer Document Verification

Akta pendirian

Akta perubahan

NIB

NPWP

KTP Direktur

Legal signatory check

Surat kuasa

Domicile address check

Customer risk scoring (beberapa perusahaan punya)

👉 Ini belum dibuat

Solusi:
Tambahkan halaman:
/verification/:customerId → Customer Verification Page
/orders/:iroId/verification → Trigger dari IRO Detail

❌ 2. Approval Flow untuk IRO → Manager / Finance / Director

Saat ini:

IRO bisa “Approved” secara dummy

Tidak ada workflow persetujuan

Biasanya ada:

IRO Approval Workflow

Sales create →

Sales Manager Approve →

Finance Approve →

Director Approve →

Status:

Draft

Submitted

Waiting for Approval

Approved

Rejected

👉 Ini belum dibuat di UI

Perlu halaman:

Approval Timeline Component

Approve / Reject Modal

Notification/Inbox List for Pending Approvals

❌ 3. Invoice Generation After KOM

Flow awal menyebut:

Quotation Approved → IRO → Form Berlangganan → PKS → KOM → Generate Invoice → Implementation

Saat ini belum ada modul:

Finance Invoice:

Generate Invoice

List Invoice

Invoice Detail

Payment Tracking (paid/unpaid/overdue)

Integration with PKS contract value + billing cycle

If Prepaid → invoice langsung

If Postpaid → invoice per billing cycle

👉 Belum dibuat

❌ 4. Implementation Handover (Serah Terima ke Deployment Team)

Setelah KOM selesai, biasanya:

Operational Handover

Engineering receives all documents

Implementation SOW

Deployment timeline

Site readiness check

Assign engineer

Kick-off internal team

Asset allocation

👉 Belum dibuat

Pada sidebar, Anda sudah punya:
Deployment Page — tetapi belum dihubungkan ke PKS/KOM.

❌ 5. Document Generator

PDF IRO

PDF Form Berlangganan

PDF PKS (auto template)

PDF MOM (Minutes of Meeting) KOM

Saat ini:

Belum dibuat di UI

Semua hanya mock data

❌ 6. Tracking / Progress Timeline (Global Order Timeline)

Flow secara UI ideal:

IRO → Verification → Form Berlangganan → PKS → KOM → Invoice → Deployment → Active Service


Kita belum buat 1 halaman besar:

Order Timeline Page

Menampilkan step-by-step progress seperti e-commerce order tracking.

❌ 7. Escalation / Reminder System

Reminder tanda tangan Form Berlangganan

Reminder tanda tangan PKS

Reminder meeting KOM

Reminder overdue invoice

Belum ada UI / komponen manajemen reminder.

❌ 8. Attachment Management

Masing-masing modul harus bisa upload banyak file:

IRO documents

Subscription Form docs

PKS document

KOM minutes & attachments

Saat ini masih dummy.

❌ 9. Renewal & Termination Flow (PKS Lifecycle)

Dalam PKS (contract):

Renewal otomatis

Renewal manual

Termination (berakhir sebelum masa kontrak)

Amendment (perubahan kontrak)

Belum ada UI.

❌ 10. Switching From SI to Quotation: Validasi Investasi

Saat approve quotation → IRO → seharusnya ada:

SI Impact Check

Apakah SI total investment berubah?

Proyek masih feasible?

Update SI BOM?

Belum ada.

📌 KESIMPULAN: 10 Flow terlewat
No	Flow	Status
1	Legal & Customer Verification	❌ Belum ada
2	IRO Approval Workflow	❌ Belum ada
3	Invoice Generation	❌ Belum ada
4	Deployment Handover	❌ Belum ada
5	Document Generator	❌ Belum ada
6	Global Order Timeline	❌ Belum ada
7	Reminder / Escalation	❌ Belum ada
8	Document Management	❌ Belum ada
9	PKS Renewal / Termination	❌ Belum ada
10	SI Impact Validation	❌ Belum ada
❓ Mau kita lanjutkan yang mana dulu?
Opsi berikut yang paling penting secara bisnis:

1️⃣ Customer/Legal Verification
2️⃣ IRO Approval Workflow
3️⃣ Invoice Generation
4️⃣ Deployment Workflow