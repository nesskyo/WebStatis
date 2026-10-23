# context.md: Konteks Proyek

> Dokumen ini adalah **ringkasan konteks** proyek. Baca ini lebih dulu sebelum mengerjakan apa pun (berlaku untuk pemilik proyek, teman satu tim, maupun AI assistant). Detail lengkap ada di `PRD.md` (apa yang dibangun) dan `desain.md` (bagaimana tampilannya).

---

## 1. Ringkasan Singkat

| | |
|---|---|
| **Jenis proyek** | **Tugas sekolah** (bukan produk komersial) |
| **Apa ini** | Website bergaya *creative agency* dengan alur **Landing Page → Login → Main Page** |
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Supabase (Auth + PostgreSQL), tanpa server sendiri |
| **Sifat situs** | Statis (SPA tanpa server), data dan login lewat Supabase |
| **Bahasa komunikasi** | Bahasa Indonesia (kode, nama variabel, dan komentar kode boleh Inggris) |
| **Status** | Tahap perencanaan selesai (PRD + desain), siap masuk coding |

## 2. Tujuan Proyek

1. **Menyelesaikan tugas** dengan hasil yang berfungsi penuh dan presentable.
2. **Belajar** integrasi frontend modern dengan database dan autentikasi.
3. Menghasilkan tampilan yang **menarik dan profesional** sebagai nilai tambah.

> Karena ini tugas sekolah, prioritasnya: **fungsional dulu, rapi kedua, mewah terakhir.** Jangan mengorbankan fitur inti demi animasi.

## 3. Ruang Lingkup (disesuaikan untuk tugas sekolah)

### 🟢 Wajib (MVP)
- Landing page dengan section utama: Hero, Marquee, Portfolio, Services, Statistik, Kontak, Footer
- Halaman Login + Daftar (Supabase Auth)
- Main page yang **terproteksi** (hanya bisa dibuka setelah login)
- Tombol Logout
- Tampil benar di HP dan laptop
- Deploy online (Vercel/Netlify) agar bisa dipresentasikan lewat link

### 🟡 Sebaiknya Ada
- Animasi scroll dan smooth scroll (Framer Motion, Lenis)
- Testimoni, Blog preview, logo klien
- Reset password
- Tampilan data profil di main page

### 🔴 Jangan Dikerjakan Dulu
- Login sosial (Google/GitHub), upload avatar, dark mode
- CMS, role admin, pembayaran
- Migrasi ke Next.js, SSR/SEO lanjutan

## 4. Keputusan Penting yang Sudah Diambil

| # | Keputusan | Alasan |
|---|---|---|
| 1 | Pakai **Opsi B**: Vite + React + Tailwind + Supabase + Framer Motion + GSAP + Lenis | Seimbang antara hasil visual dan kemudahan belajar |
| 2 | **Tidak** membuat tabel `login_users` dengan `password_hash` sendiri | Tidak aman dan rumit. Pakai **Supabase Auth** + tabel `profiles` |
| 3 | UI **terinspirasi** referensi, **bukan** menyalin 100% | Orisinalitas (penting untuk tugas), ganti nama/warna/copy/aset |
| 4 | Keamanan data bergantung pada **RLS** | Anon key terlihat di browser |
| 5 | Tanpa server sendiri | Lebih sederhana, gratis, cukup untuk skala tugas |
| 6 | Bahasa kode: **JavaScript (JSX)** secara default | Lebih ringan untuk pemula. TypeScript opsional jika sudah nyaman. Ini menyederhanakan rekomendasi TypeScript di PRD |

## 5. Tech Stack

```
Vite · React 18 · React Router v6 · Tailwind CSS
Framer Motion · GSAP + ScrollTrigger · Lenis
@supabase/supabase-js · react-hook-form + zod
lucide-react · react-countup
```

Deploy: Vercel / Netlify / Cloudflare Pages. Backend: Supabase free tier.

## 6. Peta Dokumen

| File | Isi | Kapan dibuka |
|---|---|---|
| `context.md` | Ringkasan konteks (ini) | Pertama kali / saat lupa gambaran besar |
| `PRD.md` | Requirement, alur, skema DB + RLS, roadmap, acceptance criteria | Saat menentukan *apa* yang dibangun |
| `desain.md` | Design tokens, komponen, spesifikasi halaman, motion, aksesibilitas | Saat membangun UI |

Jika ada konflik antar dokumen, urutan prioritas: **context.md (keputusan terbaru) > PRD.md > desain.md.**

## 7. Struktur Proyek (target)

```
src/
├── main.jsx
├── App.jsx                  # definisi routes
├── lib/                     # supabase.js, lenis.js
├── context/AuthContext.jsx  # session, user, loading
├── routes/ProtectedRoute.jsx
├── pages/                   # Landing, Login, MainApp, NotFound
├── components/
│   ├── layout/              # Navbar, Footer, MobileMenu
│   ├── landing/             # Hero, Marquee, Portfolio, Services, ...
│   ├── auth/                # LoginForm, RegisterForm
│   └── ui/                  # Button, Input, Tag, Reveal, ...
├── hooks/
├── styles/index.css
└── assets/
```

Routes: `/` (publik) · `/login` (publik) · `/reset-password` (publik) · `/app` (**terproteksi**) · `*` (404)

## 8. Database (ringkas)

- **Auth:** `auth.users` (dikelola Supabase, tidak diubah manual)
- **Tabel sendiri:** `public.profiles` (`id` → `auth.users.id`, `email`, `full_name`, `avatar_url`, `created_at`, `updated_at`)
- **Trigger:** profil dibuat otomatis saat user mendaftar
- **RLS:** aktif; user hanya bisa membaca dan mengubah profil miliknya sendiri
- SQL lengkap ada di `PRD.md` bagian 9

## 9. Environment Variables

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
```

⚠️ Aturan keras:
- File `.env` **wajib** masuk `.gitignore`
- **Jangan pernah** memakai `service_role` key di frontend
- Sediakan `.env.example` tanpa nilai asli

## 10. Panduan Desain Singkat

- **Gaya:** editorial, berani, hangat. Tipografi condensed raksasa, marquee, grid portfolio asimetris
- **Warna:** krem `#F0E6DD` · hitam `#0A0A0A` · oranye `#FF4F00` · neon `#CCFF00` (sedikit saja)
- **Font:** Anton (judul) + Inter (isi)
- **Animasi:** hanya `transform` dan `opacity`; hormati `prefers-reduced-motion`
- **Mobile-first**, uji di lebar 390px dan 1440px

## 11. Konvensi Kode

| Aspek | Aturan |
|---|---|
| Nama komponen | `PascalCase` (`HeroSection.jsx`) |
| Nama fungsi/variabel | `camelCase` |
| Satu komponen | Satu file, satu tanggung jawab |
| Styling | Tailwind utility; CSS kustom hanya di `styles/index.css` |
| State auth | Hanya lewat `AuthContext`, jangan panggil `supabase.auth` acak di banyak tempat |
| Akses data | Lewat file di `lib/` atau hooks, bukan langsung di JSX |
| Error handling | Selalu tangani `error` dari respons Supabase dan tampilkan pesan ramah |
| Komentar | Jelaskan *kenapa*, bukan *apa* |
| Commit | Pesan singkat dan jelas, contoh: `feat: add login form`, `fix: protected route flash` |

## 12. Aturan Kerja untuk AI Assistant

Jika AI membantu mengerjakan proyek ini:

1. **Baca dulu** `context.md`, lalu `PRD.md`/`desain.md` sesuai kebutuhan.
2. **Jangan** menambah fitur di luar bagian "Wajib" dan "Sebaiknya Ada" tanpa diminta.
3. **Jangan** membuat tabel autentikasi sendiri atau menyimpan password manual.
4. **Jangan** menyalin aset/teks dari website referensi. Buat konten orisinal.
5. Kode harus **mudah dipahami pemula**: nama jelas, komentar secukupnya, hindari abstraksi berlebihan.
6. Jelaskan **alasan** di balik pilihan penting, karena pemilik proyek perlu memahaminya untuk presentasi.
7. Setiap langkah kerja sebaiknya **bisa dijalankan dan diuji** sebelum lanjut ke langkah berikutnya.
8. Gunakan **Bahasa Indonesia** untuk penjelasan, kecuali istilah teknis.

## 13. Rencana Pengerjaan (versi tugas sekolah)

| Tahap | Pekerjaan | Hasil |
|---|---|---|
| 1 | Setup Vite + React + Tailwind + routing + font | Proyek jalan di lokal |
| 2 | Landing page (statis dulu, tanpa animasi berat) | Tampilan lengkap |
| 3 | Setup Supabase: project, SQL `profiles`, RLS, Auth | Backend siap |
| 4 | Halaman Login/Daftar + `AuthContext` | Bisa daftar dan login |
| 5 | `ProtectedRoute` + Main page + Logout | Alur penuh berjalan |
| 6 | Tambah animasi, rapikan responsif | Tampilan memukau |
| 7 | Deploy + uji akhir | Link siap presentasi |

Saran: selesaikan tahap 1–5 dulu supaya **sudah ada versi yang berfungsi**, baru percantik di tahap 6.

## 14. Bahan Presentasi / Laporan

Poin yang bisa dijelaskan ke guru/dosen:
- Alasan memilih **Supabase Auth** dibanding membuat sistem login sendiri (keamanan)
- Cara kerja **Row Level Security**
- Alur autentikasi: session, token, route terproteksi
- Alasan memakai SPA (React) dan bagaimana halaman diproteksi
- Proses desain: dari referensi menuju identitas sendiri

## 15. Checklist Sebelum Dikumpulkan

- [ ] Daftar, login, dan logout berfungsi di versi online
- [ ] `/app` tidak bisa dibuka tanpa login
- [ ] Tampilan rapi di HP dan laptop
- [ ] Tidak ada `.env` atau secret di repo
- [ ] Nama brand, teks, dan gambar orisinal/berlisensi bebas
- [ ] README berisi cara menjalankan proyek
- [ ] Link deploy dan akun demo siap untuk penilaian

## 16. Pertanyaan Terbuka

1. Nama brand/studio dan tagline?
2. Isi sebenarnya dari **main page** (dashboard, galeri, daftar tugas, dll.)?
3. Tenggat pengumpulan dan apakah ada ketentuan khusus dari guru (jumlah halaman, fitur wajib, format laporan)?
4. Dikerjakan sendiri atau berkelompok?
5. Verifikasi email diperlukan, atau dimatikan saja agar demo lebih mudah?

## 17. Istilah Penting

| Istilah | Arti |
|---|---|
| **SPA** | Single Page Application: satu halaman HTML, perpindahan halaman ditangani JavaScript |
| **BaaS** | Backend-as-a-Service: backend siap pakai (Supabase) tanpa membuat server sendiri |
| **RLS** | Row Level Security: aturan di database yang membatasi baris mana yang boleh diakses tiap user |
| **Anon key** | Kunci publik Supabase yang aman terlihat di browser selama RLS aktif |
| **Session** | Status login user yang tersimpan (token) agar tidak perlu login ulang saat refresh |
| **Protected route** | Halaman yang hanya bisa dibuka oleh user yang sudah login |
| **Marquee** | Teks yang berjalan horizontal tanpa henti |