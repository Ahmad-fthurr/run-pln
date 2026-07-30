# PLN Electric Run - Web Application

Aplikasi web **PLN Electric Run** adalah sistem manajemen pendaftaran dan informasi event lari massal.
Aplikasi ini digunakan untuk mengelola data peserta, kategori lari (5K, 10K, 21K), hingga integrasi data pendaftaran admin melalui basis data MySQL (phpMyAdmin).

---
## Framework & Teknologi yang Digunakan

* **Frontend:** React (Vite) & Tailwind CSS
* **Backend:** Node.js / Express.js (JavaScript
* **ORM:** Sequelize
* **Database:** MySQL via phpMyAdmin (XAMPP / WAMP)

---

## 📋 Langkah Awal & Persiapan Data (Admin)

Sebelum menjalankan aplikasi, admin perlu menyiapkan data awal (daftar email) yang diekspor dari Google Sheets ke basis data phpMyAdmin.

### 1. Buat & Ekspor File dari Google Sheets
1. Buka Google Sheets.
2. Buat spreadsheet baru.
3. Buat **1 kolom saja** pada baris pertama (header) dengan nama: `email`.
4. Isi daftar email peserta/admin di bawah kolom tersebut.
5. Unduh file tersebut dalam format CSV:
   * Klik **File** ➔ **Download** ➔ **Comma Separated Values (.csv)**.

### 2. Impor Data ke phpMyAdmin
1. Buka browser dan masuk ke **phpMyAdmin** (`http://localhost/phpmyadmin`).
4. Klik database `run_pln`, lalu pilih tabel user.
5. Masuk ke menu **Import** di bagian atas menu phpMyAdmin.
6. Pada bagian **File to Import**, upload file `.csv` yang sudah diunduh dari Google Sheets tadi.
7. Pastikan format file terpilih **CSV**, setelah itu pilih angka yang 0 itu ubah ke 1, terus on kan yang update dan ada inputan "column name" silahkan ketik "email"
8.  lalu klik tombol **Import** di bagian bawah. Data email berhasil masuk ke database!

---

## Cara Menjalankan Aplikasi (Development)

Pastikan **Node.js** dan **XAMPP/WAMP** (untuk MySQL phpMyAdmin) sudah aktif di komputer Anda.

### 1. Jalankan Database (MySQL)
* Buka **XAMPP Control Panel**.
* Klik **Start** pada modul **Apache** dan **MySQL**.

### 2. Jalankan Backend Server
1. Buka Terminal / Command Prompt.
2. Masuk ke folder backend:
3. kalau pertama kali: Install node modules
= 'npm install'
4. Jalankan perintah migrasi Sequelize untuk membuat tabel secara otomatis di database:
  'npx sequelize-cli db:migrate'
5.Jalan kan server beckend : 'npm run dev'

### 3. Jalankan Frontend Server 
1. Buka terminal di VScode  
2. Masuk ke Folder PLN run :'cd PLN run'
3. ketik npm install untuk node_modules
4. jalankan npm run dev 
