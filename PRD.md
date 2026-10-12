# PRD: Website Agency (Landing → Login → Main Page)

| | |
|---|---|
| **Versi** | 1.0 |
| **Tanggal** | 12 Oktober 2026 |
| **Status** | Draft |
| **Tipe** | Frontend SPA + Backend-as-a-Service (Supabase) |

---

## 1. Ringkasan

Website bergaya *creative agency* modern dengan tiga bagian utama: **landing page** publik, **halaman login/daftar**, dan **main page** yang hanya bisa diakses setelah login. Frontend dibangun dengan React, sedangkan autentikasi dan database memakai Supabase (PostgreSQL).

Gaya visual terinspirasi dari referensi agency modern: tipografi condensed berukuran besar, marquee teks, grid portfolio asimetris, palet krem-oranye-hitam, dan animasi scroll yang halus. Referensi hanya dijadikan **arah gaya**, bukan untuk ditiru 100%. Nama brand, copywriting, aset, dan detail visual harus orisinal.

## 2. Tujuan dan Non-Tujuan

### Tujuan
1. Landing page visual yang kuat, responsif, dan ringan.
2. Autentikasi aman (daftar, login, logout, reset password) memakai Supabase Auth.
3. Main page terproteksi: tanpa session yang valid, user otomatis diarahkan ke login.
4. Kode rapi, modular, mudah dikembangkan (struktur folder jelas, komponen reusable).
5. Dapat di-deploy gratis (Vercel/Netlify/Cloudflare Pages + Supabase free tier).

### Non-Tujuan (di luar scope v1.0)
- Panel admin dan manajemen role kompleks.
- Pembayaran atau e-commerce.
- CMS untuk konten landing page (konten ditulis langsung di kode).
- Server-side rendering dan SEO tingkat lanjut.
- Aplikasi mobile native.

## 3. Target Pengguna

| Persona | Kebutuhan |
|---|---|
| **Pengunjung** | Memahami layanan dan portfolio, lalu terdorong untuk daftar atau masuk. |
| **User terdaftar** | Login dengan cepat dan aman, lalu mengakses main page. |
| **Developer (pemilik proyek)** | Codebase mudah dipelihara, mudah dikembangkan, dan mudah dipelajari. |

## 4. Alur Pengguna

```
[Landing /] ──CTA "Login"──▶ [/login] ──sukses──▶ [/app]
     ▲                          │                    │
     │                          ├─ Daftar (signUp)   │
     │                          └─ Lupa password     │
     └──────────── logout ◀──────────────────────────┘

Akses /app tanpa session ──▶ redirect ke /login
Akses /login saat sudah login ──▶ redirect ke /app
```

## 5. Tech Stack

| Kebutuhan | Pilihan | Catatan |
|---|---|---|
| Bundler | **Vite** | Dev server cepat |
| UI | **React 18+** | Function components + hooks |
| Bahasa | **TypeScript** (disarankan) | JavaScript juga boleh jika ingin lebih sederhana |
| Routing | **React Router v6** | Route publik dan terproteksi |
| Styling | **Tailwind CSS** | Design token di `tailwind.config` |
| Animasi komponen | **Framer Motion** | Reveal, hover, transisi halaman |
| Animasi scroll | **GSAP + ScrollTrigger** | Marquee, parallax, pin section |
| Smooth scroll | **Lenis** | Terintegrasi dengan ScrollTrigger |
| Ikon | **lucide-react** | |
| Counter angka | **react-countup** | Section statistik |
| Backend/DB | **Supabase** (`@supabase/supabase-js`) | Auth + PostgreSQL |
| Form | **react-hook-form + zod** | Validasi login/daftar |
| Hosting | Vercel / Netlify / Cloudflare Pages | |

## 6. Arsitektur

```
Browser (React SPA)
   │
   ├── supabase-js ──▶ Supabase Auth      (signUp, signIn, session, reset)
   └── supabase-js ──▶ PostgREST + RLS    (tabel profiles, dll.)
```

- Tidak ada server sendiri. Semua akses data langsung dari klien ke Supabase.
- **Keamanan data bergantung penuh pada Row Level Security (RLS)**, karena anon key terlihat di browser.
- State autentikasi dikelola lewat `AuthContext` yang memakai `onAuthStateChange`.

## 7. Struktur Folder

```
src/
├── main.tsx
├── App.tsx                  # definisi routes
├── lib/
│   ├── supabase.ts          # createClient
│   └── lenis.ts             # inisialisasi smooth scroll
├── context/
│   └── AuthContext.tsx      # session, user, loading
├── routes/
│   └── ProtectedRoute.tsx   # guard untuk /app
├── pages/
│   ├── Landing.tsx
│   ├── Login.tsx
│   └── MainApp.tsx
├── components/
│   ├── layout/              # Navbar, Footer, PageTransition
│   ├── landing/             # Hero, Marquee, Portfolio, Services,
│   │                        # Stats, Testimonials, Blog, Contact
│   ├── auth/                # LoginForm, RegisterForm, ResetForm
│   └── ui/                  # Button, Input, Tag, SectionTitle
├── hooks/
├── styles/
│   └── index.css            # @tailwind + font + util kustom
└── assets/
```

## 8. Kebutuhan Fungsional

### 8.1 Landing Page (`/`) — publik

| ID | Requirement | Prioritas |
|---|---|---|
| L-01 | Navbar: logo, menu, tombol "Login". Saat sudah login, tombol berubah menjadi "Masuk ke App". | Must |
| L-02 | Hero: headline raksasa (campuran teks solid dan outline), subteks, CTA, dan gambar. | Must |
| L-03 | Marquee teks berjalan tanpa putus (Branding – Solutions – Identity – ...). | Must |
| L-04 | Section Portfolio: grid asimetris 4–6 kartu dengan hover effect dan tag kategori. | Must |
| L-05 | Section Logo klien (placeholder). | Should |
| L-06 | Section Services: 3–4 layanan dengan daftar poin. | Must |
| L-07 | Section Statistik dengan counter animasi saat masuk viewport. | Should |
| L-08 | Section Testimoni (background gelap). | Should |
| L-09 | Section Blog/Insight: 3 kartu artikel (statis). | Could |
| L-10 | Section Kontak/CTA dengan form (v1.0: tampilan saja atau `mailto:`). | Should |
| L-11 | Footer: tautan sosial, hak cipta, kebijakan. | Must |
| L-12 | Smooth scroll global dan animasi reveal per section. | Must |

### 8.2 Autentikasi (`/login`)

| ID | Requirement | Prioritas |
|---|---|---|
| A-01 | Login email + password via `signInWithPassword`. | Must |
| A-02 | Daftar akun via `signUp` (toggle Login/Daftar dalam satu halaman). | Must |
| A-03 | Validasi form: format email, password minimal 8 karakter. | Must |
| A-04 | Pesan error yang jelas dan tidak membocorkan informasi sensitif. | Must |
| A-05 | Indikator loading pada tombol saat request berjalan. | Must |
| A-06 | Lupa password via `resetPasswordForEmail` dan halaman set password baru. | Should |
| A-07 | Verifikasi email (opsional, bisa dimatikan saat development). | Could |
| A-08 | Login sosial (Google/GitHub). | Could (v1.1) |
| A-09 | Redirect otomatis ke `/app` setelah login berhasil. | Must |

### 8.3 Main Page (`/app`) — terproteksi

| ID | Requirement | Prioritas |
|---|---|---|
| M-01 | Hanya bisa diakses jika ada session valid. Jika tidak, redirect ke `/login`. | Must |
| M-02 | Header berisi nama/email user dan tombol Logout. | Must |
| M-03 | Menampilkan data profil dari tabel `profiles`. | Must |
| M-04 | Konten utama: dashboard sederhana (kartu ringkasan, daftar item). Isi final ditentukan sesuai kebutuhan proyek. | Should |
| M-05 | Logout menghapus session lalu redirect ke `/`. | Must |
| M-06 | Persistensi session: refresh halaman tidak membuat user logout. | Must |

## 9. Desain Database

> **Keputusan penting:** jangan membuat tabel `login_users` dengan `password_hash` sendiri. Gunakan **Supabase Auth** (`auth.users`) yang sudah menangani hashing, session, dan token. Data tambahan disimpan di tabel `profiles`.

### 9.1 Skema SQL

```sql
-- Tabel profil, 1:1 dengan auth.users
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text unique not null,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Otomatis membuat profil saat user baru mendaftar
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Update otomatis kolom updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
```

### 9.2 Row Level Security

```sql
alter table public.profiles enable row level security;

create policy "User dapat membaca profil sendiri"
  on public.profiles for select
  using (auth.uid() = id);

create policy "User dapat mengubah profil sendiri"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
```

Aturan: **setiap tabel baru wajib mengaktifkan RLS** beserta policy-nya sebelum dipakai dari klien.

### 9.3 Catatan migrasi
Jika tabel `login_users` sudah terlanjur dibuat, hapus tabel tersebut (atau jangan dipakai) dan gunakan skema di atas.

## 10. Routing dan Proteksi

| Path | Akses | Perilaku |
|---|---|---|
| `/` | Publik | Landing page |
| `/login` | Publik | Jika sudah login, redirect ke `/app` |
| `/reset-password` | Publik | Form password baru (dari tautan email) |
| `/app` | Terproteksi | Jika belum login, redirect ke `/login` |
| `*` | Publik | Halaman 404 |

`ProtectedRoute` harus menunggu status `loading` dari `AuthContext` selesai sebelum memutuskan redirect, agar tidak terjadi *flash* ke halaman login saat refresh.

## 11. Design System

### 11.1 Warna

| Token | Hex | Penggunaan |
|---|---|---|
| `cream` | `#F0E6DD` | Background utama |
| `ink` | `#0A0A0A` | Teks, section gelap |
| `accent` | `#FF4F00` | Aksen utama (stats, highlight) |
| `neon` | `#CCFF00` | CTA/kontak (pemakaian sedikit) |

> Nilai di atas adalah titik awal. Sesuaikan agar punya identitas sendiri.

### 11.2 Tipografi
- **Display/heading:** Anton, Bebas Neue, atau Big Shoulders Display (pilih satu). Ukuran fluid `clamp(3.5rem, 14vw, 13rem)`, `line-height: 0.85`, uppercase.
- **Body:** Inter atau Manrope.
- **Teks outline:** `-webkit-text-stroke: 2px var(--ink); color: transparent`.
- Muat font via Google Fonts dengan `display=swap`.

### 11.3 Motion
- Reveal saat scroll: fade + translateY (Framer Motion `whileInView`, `once: true`).
- Marquee: CSS keyframes `translateX`, jeda saat hover (opsional).
- Parallax gambar: GSAP ScrollTrigger.
- Counter: mulai saat elemen terlihat.
- Wajib menghormati `prefers-reduced-motion`: animasi dinonaktifkan atau disederhanakan.

### 11.4 Breakpoint
Mobile-first: `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Desain mobile (~390px) dan desktop (~1440px) harus diverifikasi.

## 12. Kebutuhan Non-Fungsional

| Aspek | Target |
|---|---|
| **Performa** | Lighthouse Performance ≥ 85 (mobile). LCP < 2,5 dtk. |
| **Ukuran aset** | Gambar WebP/AVIF, `loading="lazy"`, hero di-preload. |
| **Responsif** | Tidak ada horizontal scroll di lebar 360px ke atas. |
| **Aksesibilitas** | Kontras teks memadai, label form, fokus keyboard terlihat, `alt` pada gambar. |
| **Keamanan** | RLS aktif; hanya anon key di klien; `service_role` key **tidak boleh** muncul di kode frontend; `.env` masuk `.gitignore`. |
| **Kompatibilitas** | Chrome, Safari, Firefox, Edge versi terbaru (2 rilis terakhir). |
| **Kualitas kode** | ESLint + Prettier, komponen kecil dan reusable. |

## 13. Environment Variables

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
```

Sediakan juga `.env.example` tanpa nilai asli.

## 14. Roadmap dan Milestone

| Fase | Isi | Hasil |
|---|---|---|
| **0. Setup** | Init Vite + React + TS, Tailwind, font, routing dasar, ESLint/Prettier, repo Git. | Proyek jalan di lokal. |
| **1. Landing** | Navbar, Hero, Marquee, Portfolio, Services, Stats, Testimoni, Kontak, Footer, animasi + Lenis. | Landing page lengkap dan responsif. |
| **2. Supabase** | Buat project, jalankan SQL (bagian 9), konfigurasi Auth (Site URL, Redirect URL), isi `.env`. | Database dan auth siap. |
| **3. Auth** | `AuthContext`, halaman Login/Daftar, validasi form, reset password. | User bisa daftar dan login. |
| **4. Main Page** | `ProtectedRoute`, halaman `/app`, tampil profil, logout. | Alur penuh Landing → Login → App. |
| **5. Polish** | Transisi halaman, 404, optimasi gambar, uji responsif dan aksesibilitas, Lighthouse. | Siap rilis. |
| **6. Deploy** | Deploy ke Vercel/Netlify, set env var, update Redirect URL di Supabase, uji produksi. | Website live. |

## 15. Kriteria Penerimaan (Acceptance Criteria)

1. User baru bisa mendaftar, dan baris di `profiles` terbentuk otomatis.
2. User bisa login dengan kredensial benar dan diarahkan ke `/app`.
3. Kredensial salah menampilkan pesan error tanpa crash.
4. Membuka `/app` tanpa login langsung diarahkan ke `/login`.
5. Refresh di `/app` saat sudah login tidak membuat user keluar.
6. Logout menghapus session; tombol Back tidak membuka kembali `/app`.
7. User A tidak bisa membaca atau mengubah data profil user B (diuji lewat RLS).
8. Landing page tampil benar di 390px dan 1440px tanpa horizontal scroll.
9. Semua animasi berjalan halus dan tidak aktif berlebihan jika `prefers-reduced-motion` menyala.
10. Lighthouse mobile Performance ≥ 85 pada build produksi.
11. Tidak ada secret atau `service_role` key di repo maupun bundle klien.

## 16. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Animasi berat menurunkan performa di HP | UX buruk, skor Lighthouse turun | Animasikan hanya `transform`/`opacity`, lazy-load gambar, batasi jumlah ScrollTrigger |
| RLS salah konfigurasi | Data bocor | Aktifkan RLS di semua tabel, uji dengan dua akun berbeda |
| Konflik Lenis dan GSAP ScrollTrigger | Scroll patah-patah | Sinkronkan lewat `lenis.on('scroll', ScrollTrigger.update)` dan `gsap.ticker` |
| Redirect URL Auth salah setelah deploy | Login/reset gagal di produksi | Daftarkan domain produksi di Supabase Auth → URL Configuration |
| Meniru referensi terlalu persis | Isu orisinalitas/hak cipta | Ganti nama, copy, palet, dan aset; gunakan foto berlisensi bebas (Unsplash/Pexels) |
| Rate limit email Supabase (free tier) | Email verifikasi/reset tertunda | Untuk produksi pertimbangkan SMTP kustom |

## 17. Pengembangan Lanjutan (Backlog v1.1+)

- Login sosial (Google/GitHub).
- Edit profil dan upload avatar (Supabase Storage).
- Dark mode.
- Konten portfolio dan blog dinamis dari database.
- Form kontak tersimpan ke tabel + notifikasi email (Edge Function).
- Migrasi ke Next.js bila butuh SEO.

## 18. Pertanyaan Terbuka

1. Nama brand, tagline, dan konten final landing page?
2. Apa isi sebenarnya dari **main page** (dashboard, galeri, tools, dll.)?
3. Apakah verifikasi email wajib dari awal?
4. Pakai TypeScript atau JavaScript biasa?
5. Domain kustom sudah ada atau cukup subdomain gratis dulu?