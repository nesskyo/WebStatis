# Implementation Plan — Ness Agency Website v1.0

| | |
|---|---|
| **Berdasarkan** | PRD v1.0 — 12 Oktober 2026 |
| **Tipe Proyek** | Frontend SPA (React + Vite) + Supabase BaaS |
| **Tanggal Rencana** | 12 Oktober 2026 |

> [!NOTE]
> File `Desain.md` dan `context.md` saat ini kosong (0 byte). Rencana ini sepenuhnya disusun dari **PRD.md**. Ketika kedua file tersebut terisi, rencana ini harus diperbarui agar mencakup spesifikasi desain visual dan konteks tambahan.

---

## Daftar Isi

1. [Ringkasan Pendekatan](#1-ringkasan-pendekatan)
2. [Prasyarat & Keputusan Awal](#2-prasyarat--keputusan-awal)
3. [Fase 0 — Project Setup](#fase-0--project-setup)
4. [Fase 1 — Landing Page](#fase-1--landing-page)
5. [Fase 2 — Supabase Setup](#fase-2--supabase-setup)
6. [Fase 3 — Authentication](#fase-3--authentication)
7. [Fase 4 — Main Page (Protected)](#fase-4--main-page-protected)
8. [Fase 5 — Polish & QA](#fase-5--polish--qa)
9. [Fase 6 — Deployment](#fase-6--deployment)
10. [Risiko & Mitigasi](#risiko--mitigasi)
11. [Checklist Acceptance Criteria](#checklist-acceptance-criteria)

---

## 1. Ringkasan Pendekatan

Proyek dikerjakan dalam **7 fase berurutan** (Fase 0–6) sesuai roadmap PRD §14. Setiap fase menghasilkan *deliverable* yang bisa diuji sebelum melanjutkan ke fase berikutnya.

**Prinsip Utama:**
- Mobile-first, responsive design (360px → 1440px).
- Performa tinggi — target Lighthouse ≥ 85 (mobile).
- Keamanan by-default — RLS aktif di setiap tabel, `service_role` key **tidak pernah** di klien.
- Kode modular, small components, ESLint + Prettier.
- Animasi yang menghormati `prefers-reduced-motion`.

---

## 2. Prasyarat & Keputusan Awal

Sebelum koding dimulai, selesaikan keputusan berikut (merujuk PRD §18 — Pertanyaan Terbuka):

| # | Keputusan | Status |
|---|---|---|
| 1 | Nama brand, tagline, dan konten final landing page | ⬜ Belum diputuskan |
| 2 | Isi utama main page (`/app`) — dashboard, galeri, tools, dll. | ⬜ Belum diputuskan |
| 3 | Verifikasi email wajib dari awal atau skip di dev? | ⬜ Belum diputuskan |
| 4 | TypeScript atau JavaScript? (PRD menyarankan TS) | ⬜ Belum diputuskan |
| 5 | Domain kustom atau subdomain gratis? | ⬜ Belum diputuskan |

> [!IMPORTANT]
> Keputusan #1 dan #2 sangat memengaruhi konten komponen. Gunakan placeholder berupa teks/gambar yang jelas sampai keputusan final diambil. Keputusan #4 memengaruhi konfigurasi Vite di Fase 0.

---

## Fase 0 — Project Setup

**Tujuan:** Proyek berjalan di lokal, struktur folder sesuai PRD §7, tooling siap.

### Task 0.1 — Inisialisasi Vite + React

| Detail | Nilai |
|---|---|
| **PRD Ref** | §5 (Tech Stack), §7 (Struktur Folder) |
| **Command** | `npx -y create-vite@latest ./ --template react-ts` (atau `react` jika JS) |
| **Output** | Proyek Vite berjalan di `localhost` |

**Sub-tasks:**
- [ ] Jalankan init Vite dengan template React + TS.
- [ ] Verifikasi `npm run dev` berjalan tanpa error.
- [ ] Buat `.env.example` berisi:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://fzoqzhdssxxrosqmhiod.supabase.co
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YFLd5gC4hOzQuTbEDA-KIA_3HO6s2WV
  ```
- [ ] Tambahkan `.env` ke `.gitignore`.
- [ ] Init git repo, buat commit awal.

### Task 0.2 — Install Dependencies

Sesuai PRD §5:

```bash
# Styling
npm install -D tailwindcss @tailwindcss/vite

# Routing
npm install react-router-dom

# Animasi
npm install framer-motion gsap @studio-freight/lenis

# Ikon & UI
npm install lucide-react react-countup

# Backend
npm install @supabase/supabase-js

# Form & Validasi
npm install react-hook-form zod @hookform/resolvers

# Dev tooling
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react-hooks
```

**Sub-tasks:**
- [ ] Install semua dependencies di atas.
- [ ] Verifikasi tidak ada peer dependency conflict.

### Task 0.3 — Konfigurasi Tailwind CSS

| Detail | Nilai |
|---|---|
| **PRD Ref** | §5 (Tailwind), §11.1 (Warna), §11.2 (Tipografi), §11.4 (Breakpoint) |

**Sub-tasks:**
- [ ] Setup Tailwind CSS v4 menggunakan `@tailwindcss/vite` plugin.
- [ ] Definisikan design tokens di `src/styles/index.css` menggunakan `@theme`:
  ```css
  @import "tailwindcss";

  @theme {
    --color-cream: #F0E6DD;
    --color-ink: #0A0A0A;
    --color-accent: #FF4F00;
    --color-neon: #CCFF00;

    --font-display: 'Anton', sans-serif;
    --font-body: 'Inter', sans-serif;
  }
  ```
- [ ] Tambahkan Google Fonts (`Anton`, `Inter`) via `<link>` di `index.html` dengan `display=swap`.
- [ ] Verifikasi warna dan font tampil di halaman dummy.

### Task 0.4 — Struktur Folder

Buat folder sesuai PRD §7:

```
src/
├── main.tsx
├── App.tsx
├── lib/
│   ├── supabase.ts
│   └── lenis.ts
├── context/
│   └── AuthContext.tsx
├── routes/
│   └── ProtectedRoute.tsx
├── pages/
│   ├── Landing.tsx
│   ├── Login.tsx
│   └── MainApp.tsx
├── components/
│   ├── layout/
│   ├── landing/
│   ├── auth/
│   └── ui/
├── hooks/
├── styles/
│   └── index.css
└── assets/
```

**Sub-tasks:**
- [ ] Buat semua folder.
- [ ] Buat file placeholder (export default kosong) untuk setiap page dan context.

### Task 0.5 — Routing Dasar

| Detail | Nilai |
|---|---|
| **PRD Ref** | §4 (Alur Pengguna), §10 (Routing dan Proteksi) |

**Sub-tasks:**
- [ ] Setup `BrowserRouter` di `main.tsx`.
- [ ] Definisikan routes di `App.tsx`:
  | Path | Komponen | Akses |
  |---|---|---|
  | `/` | `Landing` | Publik |
  | `/login` | `Login` | Publik (redirect jika sudah login) |
  | `/reset-password` | `ResetPassword` | Publik |
  | `/app` | `MainApp` (wrapped `ProtectedRoute`) | Terproteksi |
  | `*` | `NotFound` | Publik |
- [ ] Buat `ProtectedRoute.tsx` skeleton (logic auth di Fase 3).
- [ ] Verifikasi navigasi antar route berjalan.

### Task 0.6 — ESLint & Prettier

**Sub-tasks:**
- [ ] Konfigurasi ESLint dengan plugin react-hooks.
- [ ] Konfigurasi Prettier (semi, singleQuote, trailingComma).
- [ ] Tambahkan script `npm run lint` dan `npm run format`.
- [ ] Jalankan lint, pastikan 0 error.

**✅ Deliverable Fase 0:** Proyek berjalan di lokal, routing dasar berfungsi, folder terstruktur, tooling siap.

---

## Fase 1 — Landing Page

**Tujuan:** Landing page lengkap, responsif, dengan animasi scroll — sesuai PRD §8.1.

### Task 1.0 — Lenis Smooth Scroll Setup

| Detail | Nilai |
|---|---|
| **PRD Ref** | §5 (Lenis), §11.3 (Motion), L-12 |

**Sub-tasks:**
- [ ] Inisialisasi Lenis di `src/lib/lenis.ts`.
- [ ] Integrasi dengan GSAP ScrollTrigger:
  ```ts
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- [ ] Terapkan di `App.tsx` atau layout wrapper.
- [ ] Verifikasi smooth scroll berjalan.

### Task 1.1 — Navbar

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-01 |
| **Lokasi** | `src/components/layout/Navbar.tsx` |

**Fungsionalitas:**
- [ ] Logo (teks/SVG brand — placeholder sampai brand diputuskan).
- [ ] Menu navigasi (anchor link ke section).
- [ ] Tombol "Login" → navigasi ke `/login`.
- [ ] Jika user sudah login (dari `AuthContext`), tombol berubah menjadi "Masuk ke App" → `/app`.
- [ ] Responsif: hamburger menu di mobile.
- [ ] Sticky/fixed on scroll.

### Task 1.2 — Hero Section

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-02, §11.2 (Tipografi) |
| **Lokasi** | `src/components/landing/Hero.tsx` |

**Fungsionalitas:**
- [ ] Headline raksasa — campuran teks **solid** dan **outline** (`-webkit-text-stroke`).
- [ ] Ukuran fluid: `clamp(3.5rem, 14vw, 13rem)`, `line-height: 0.85`, uppercase.
- [ ] Subteks deskriptif.
- [ ] Tombol CTA utama.
- [ ] Gambar/visual hero (preload, format WebP/AVIF).
- [ ] Reveal animation (Framer Motion `whileInView`).

### Task 1.3 — Marquee Section

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-03, §11.3 |
| **Lokasi** | `src/components/landing/Marquee.tsx` |

**Fungsionalitas:**
- [ ] Teks berjalan tanpa putus (infinite loop): "Branding – Solutions – Identity – ..."
- [ ] Implementasi via CSS keyframes `translateX`.
- [ ] Opsional: pause on hover.
- [ ] Menghormati `prefers-reduced-motion`.

### Task 1.4 — Portfolio Section

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-04 |
| **Lokasi** | `src/components/landing/Portfolio.tsx` |

**Fungsionalitas:**
- [ ] Grid asimetris, 4–6 kartu.
- [ ] Setiap kartu: gambar, judul, tag kategori (komponen `Tag` dari `ui/`).
- [ ] Hover effect (scale, overlay, atau shadow).
- [ ] Gambar lazy-loaded (`loading="lazy"`).
- [ ] Scroll reveal animation.
- [ ] Responsif: 1 kolom (mobile), 2–3 kolom (desktop).

### Task 1.5 — Client Logos Section

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-05 (Should) |
| **Lokasi** | `src/components/landing/ClientLogos.tsx` |

**Fungsionalitas:**
- [ ] Row of placeholder logos (SVG/grayscale).
- [ ] Opsional: marquee loop atau static grid.

### Task 1.6 — Services Section

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-06 |
| **Lokasi** | `src/components/landing/Services.tsx` |

**Fungsionalitas:**
- [ ] 3–4 kartu layanan.
- [ ] Setiap kartu: ikon (lucide-react), judul, daftar poin.
- [ ] Reveal animation.
- [ ] Responsif.

### Task 1.7 — Statistics Section

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-07 (Should), §5 (react-countup) |
| **Lokasi** | `src/components/landing/Stats.tsx` |

**Fungsionalitas:**
- [ ] 3–4 angka statistik (misal: "500+ Proyek", "98% Kepuasan", dll.).
- [ ] Counter animasi dimulai saat elemen masuk viewport (`react-countup` + Intersection Observer / Framer Motion).
- [ ] Warna aksen `accent` (#FF4F00) sebagai highlight.

### Task 1.8 — Testimonials Section

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-08 (Should) |
| **Lokasi** | `src/components/landing/Testimonials.tsx` |

**Fungsionalitas:**
- [ ] Background gelap (`ink`).
- [ ] 2–3 testimoni statis (foto, nama, kutipan).
- [ ] Carousel atau grid layout.

### Task 1.9 — Blog / Insight Section

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-09 (Could) |
| **Lokasi** | `src/components/landing/Blog.tsx` |

**Fungsionalitas:**
- [ ] 3 kartu artikel statis (gambar, judul, excerpt, tanggal).
- [ ] Link placeholder (`#`).

### Task 1.10 — Contact / CTA Section

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-10 (Should) |
| **Lokasi** | `src/components/landing/Contact.tsx` |

**Fungsionalitas:**
- [ ] Headline CTA.
- [ ] Form kontak (v1.0: tampilan saja atau `mailto:` link).
- [ ] Opsional: warna `neon` (#CCFF00) sebagai aksen.

### Task 1.11 — Footer

| Detail | Nilai |
|---|---|
| **PRD Ref** | L-11 |
| **Lokasi** | `src/components/layout/Footer.tsx` |

**Fungsionalitas:**
- [ ] Logo brand.
- [ ] Tautan sosial media (ikon lucide-react).
- [ ] Hak cipta.
- [ ] Link kebijakan privasi (placeholder).

### Task 1.12 — Komponen UI Reusable

| Detail | Nilai |
|---|---|
| **PRD Ref** | §7 (ui/), tujuan #4 (kode modular) |

**Sub-tasks:**
- [ ] `Button.tsx` — variant: primary, secondary, outline, ghost. States: hover, loading, disabled.
- [ ] `Input.tsx` — label, error message, focus ring.
- [ ] `Tag.tsx` — badge untuk kategori portfolio.
- [ ] `SectionTitle.tsx` — heading konsisten antar section.

### Task 1.13 — Responsif & Motion QA

| Detail | Nilai |
|---|---|
| **PRD Ref** | §11.3, §11.4, §12 (Responsif) |

**Sub-tasks:**
- [ ] Uji di 390px (mobile) dan 1440px (desktop).
- [ ] Pastikan tidak ada horizontal scroll di 360px ke atas.
- [ ] Verifikasi `prefers-reduced-motion` menonaktifkan/menyederhanakan animasi.
- [ ] Uji konflik Lenis ↔ GSAP ScrollTrigger (PRD §16, Risiko #3).

**✅ Deliverable Fase 1:** Landing page lengkap, responsif, animasi smooth, di semua section.

---

## Fase 2 — Supabase Setup

**Tujuan:** Database dan auth backend siap dipakai dari klien.

### Task 2.1 — Buat Project Supabase

**Sub-tasks:**
- [ ] Buat project baru di [supabase.com](https://supabase.com).
- [ ] Catat `Project URL` dan `anon public key`.
- [ ] Isi `.env` lokal:
  ```env
  VITE_SUPABASE_URL=https://<project-ref>.supabase.co
  VITE_SUPABASE_ANON_KEY=<anon-public-key>
  ```

### Task 2.2 — Jalankan SQL Schema

| Detail | Nilai |
|---|---|
| **PRD Ref** | §9.1 (Skema SQL) |

Eksekusi di Supabase SQL Editor:

```sql
-- 1. Tabel profiles
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text unique not null,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. Trigger: auto-create profile on signup
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

-- 3. Trigger: auto-update updated_at
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

### Task 2.3 — Aktifkan Row Level Security

| Detail | Nilai |
|---|---|
| **PRD Ref** | §9.2 (RLS) |

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

**Sub-tasks:**
- [ ] Jalankan SQL di atas.
- [ ] Verifikasi di Supabase Dashboard > Table Editor bahwa RLS enabled (ikon gembok).

### Task 2.4 — Konfigurasi Auth

**Sub-tasks:**
- [ ] Supabase Dashboard > Authentication > URL Configuration:
  - Site URL: `http://localhost:5173` (dev).
  - Redirect URLs: `http://localhost:5173/reset-password`.
- [ ] Opsional: matikan email confirmation untuk dev (PRD A-07, "Could").
- [ ] Jika tabel `login_users` sudah ada, hapus (PRD §9.3).

### Task 2.5 — Supabase Client

| Detail | Nilai |
|---|---|
| **PRD Ref** | §6, §7 (`lib/supabase.ts`) |
| **Lokasi** | `src/lib/supabase.ts` |

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] Verifikasi koneksi berhasil (log test query di console).

**✅ Deliverable Fase 2:** Database `profiles` siap, RLS aktif, Supabase client terhubung.

---

## Fase 3 — Authentication

**Tujuan:** User bisa daftar, login, logout, dan reset password — sesuai PRD §8.2.

### Task 3.1 — AuthContext

| Detail | Nilai |
|---|---|
| **PRD Ref** | §6, §7 (`context/AuthContext.tsx`) |
| **Lokasi** | `src/context/AuthContext.tsx` |

**Fungsionalitas:**
- [ ] State: `user`, `session`, `loading`.
- [ ] `useEffect` → `supabase.auth.getSession()` untuk initial load.
- [ ] `supabase.auth.onAuthStateChange()` listener.
- [ ] Expose via `useAuth()` hook.
- [ ] `loading` harus `true` sampai session check selesai (mencegah flash redirect — PRD §10).

### Task 3.2 — Login Form

| Detail | Nilai |
|---|---|
| **PRD Ref** | A-01, A-03, A-04, A-05, A-09 |
| **Lokasi** | `src/components/auth/LoginForm.tsx` |

**Fungsionalitas:**
- [ ] Field email dan password.
- [ ] Validasi via `react-hook-form` + `zod`:
  - Email: format valid.
  - Password: minimal 8 karakter.
- [ ] Call `supabase.auth.signInWithPassword({ email, password })`.
- [ ] Loading indicator pada tombol saat request.
- [ ] Error message yang jelas (tanpa bocorkan info sensitif).
- [ ] Redirect ke `/app` setelah sukses.

### Task 3.3 — Register Form

| Detail | Nilai |
|---|---|
| **PRD Ref** | A-02, A-03, A-04, A-05 |
| **Lokasi** | `src/components/auth/RegisterForm.tsx` |

**Fungsionalitas:**
- [ ] Field email, password, full name (opsional).
- [ ] Validasi sama seperti login + konfirmasi password.
- [ ] Call `supabase.auth.signUp({ email, password, options: { data: { full_name } } })`.
- [ ] Trigger `handle_new_user` akan otomatis membuat profil.
- [ ] Loading indicator & error handling.

### Task 3.4 — Login Page (Toggle Login/Register)

| Detail | Nilai |
|---|---|
| **PRD Ref** | A-02 ("toggle Login/Daftar dalam satu halaman") |
| **Lokasi** | `src/pages/Login.tsx` |

**Fungsionalitas:**
- [ ] Tab/toggle antara `LoginForm` dan `RegisterForm`.
- [ ] Jika user sudah login (`useAuth()`), redirect ke `/app` (PRD §10).
- [ ] Animasi transisi antar form (Framer Motion).
- [ ] Desain visual sesuai brand.

### Task 3.5 — Reset Password

| Detail | Nilai |
|---|---|
| **PRD Ref** | A-06 (Should) |
| **Lokasi** | `src/components/auth/ResetForm.tsx`, `src/pages/ResetPassword.tsx` |

**Fungsionalitas:**
- [ ] "Lupa password?" link di `LoginForm`.
- [ ] Form kirim email: `supabase.auth.resetPasswordForEmail(email, { redirectTo })`.
- [ ] Halaman `/reset-password`: form password baru → `supabase.auth.updateUser({ password })`.

### Task 3.6 — ProtectedRoute (Logic Final)

| Detail | Nilai |
|---|---|
| **PRD Ref** | §10, M-01, M-06 |
| **Lokasi** | `src/routes/ProtectedRoute.tsx` |

**Fungsionalitas:**
- [ ] Ambil `user` dan `loading` dari `useAuth()`.
- [ ] Jika `loading` → tampilkan spinner/skeleton (bukan redirect).
- [ ] Jika `!user` → `<Navigate to="/login" replace />`.
- [ ] Jika `user` → render `<Outlet />` atau children.

**✅ Deliverable Fase 3:** Alur daftar, login, logout, reset password berfungsi. Session persisten.

---

## Fase 4 — Main Page (Protected)

**Tujuan:** Main page terproteksi menampilkan data profil user — sesuai PRD §8.3.

### Task 4.1 — Main Page Layout

| Detail | Nilai |
|---|---|
| **PRD Ref** | M-02, M-03, M-04 |
| **Lokasi** | `src/pages/MainApp.tsx` |

**Fungsionalitas:**
- [ ] Header:
  - Nama/email user (dari `useAuth()` atau `profiles`).
  - Tombol Logout.
- [ ] Tampilkan data dari tabel `profiles`:
  ```ts
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  ```
- [ ] Dashboard sederhana: kartu ringkasan, daftar item (konten final sesuai keputusan #2).

### Task 4.2 — Logout

| Detail | Nilai |
|---|---|
| **PRD Ref** | M-05 |

**Fungsionalitas:**
- [ ] Call `supabase.auth.signOut()`.
- [ ] Redirect ke `/`.
- [ ] Pastikan tombol back browser tidak membuka kembali `/app`.

### Task 4.3 — Session Persistence Verification

| Detail | Nilai |
|---|---|
| **PRD Ref** | M-06 |

**Sub-tasks:**
- [ ] Login → buka `/app` → refresh browser → harus tetap di `/app`.
- [ ] Tutup tab → buka kembali → session masih valid (tergantung cookie/localStorage Supabase).

**✅ Deliverable Fase 4:** Alur penuh Landing → Login → App berfungsi end-to-end.

---

## Fase 5 — Polish & QA

**Tujuan:** Website siap rilis — visual, performa, aksesibilitas.

### Task 5.1 — Page Transitions

| Detail | Nilai |
|---|---|
| **PRD Ref** | §11.3, §5 (Framer Motion) |

**Sub-tasks:**
- [ ] Buat `PageTransition.tsx` wrapper (Framer Motion `AnimatePresence`).
- [ ] Terapkan di `App.tsx` route wrapper.

### Task 5.2 — 404 Page

| Detail | Nilai |
|---|---|
| **PRD Ref** | §10 (Route `*`) |

**Sub-tasks:**
- [ ] Desain halaman 404 sesuai brand.
- [ ] Tombol kembali ke beranda.

### Task 5.3 — Image Optimization

| Detail | Nilai |
|---|---|
| **PRD Ref** | §12 (Ukuran aset) |

**Sub-tasks:**
- [ ] Konversi semua gambar ke WebP/AVIF.
- [ ] Tambahkan `loading="lazy"` pada gambar non-hero.
- [ ] Hero image: preload via `<link rel="preload">`.
- [ ] Tambahkan `alt` pada semua `<img>` (PRD §12, Aksesibilitas).

### Task 5.4 — Responsive Testing

| Detail | Nilai |
|---|---|
| **PRD Ref** | §11.4, §12 (Responsif) |

**Sub-tasks:**
- [ ] Uji di 360px, 390px, 768px, 1024px, 1280px, 1440px.
- [ ] Tidak ada horizontal scroll di 360px ke atas.
- [ ] Uji di Chrome, Safari, Firefox, Edge (2 rilis terakhir — PRD §12).

### Task 5.5 — Accessibility Audit

| Detail | Nilai |
|---|---|
| **PRD Ref** | §12 (Aksesibilitas) |

**Sub-tasks:**
- [ ] Kontras teks memadai (WCAG AA minimum).
- [ ] Semua form input punya `<label>`.
- [ ] Fokus keyboard terlihat (focus ring).
- [ ] Semua gambar punya `alt`.
- [ ] Uji navigasi keyboard end-to-end.

### Task 5.6 — Performance Audit

| Detail | Nilai |
|---|---|
| **PRD Ref** | §12 (Performa) |

**Sub-tasks:**
- [ ] Build produksi: `npm run build`.
- [ ] Jalankan Lighthouse (mobile).
- [ ] Target: Performance ≥ 85, LCP < 2.5 detik.
- [ ] Jika di bawah target: optimasi bundle (code splitting, lazy import), kompresi gambar, review animasi.

### Task 5.7 — Security Review

| Detail | Nilai |
|---|---|
| **PRD Ref** | §12 (Keamanan), §13 |

**Sub-tasks:**
- [ ] `service_role` key **tidak ada** di kode frontend atau bundle.
- [ ] `.env` masuk `.gitignore`.
- [ ] RLS aktif di semua tabel.
- [ ] Uji RLS: user A tidak bisa akses profil user B.
- [ ] Review bahwa hanya `anon key` (bukan `service_role`) yang ada di klien.

**✅ Deliverable Fase 5:** Website polished, lulus audit performa/aksesibilitas/keamanan.

---

## Fase 6 — Deployment

**Tujuan:** Website live di production.

### Task 6.1 — Deploy ke Hosting

| Detail | Nilai |
|---|---|
| **PRD Ref** | §14 (Fase 6), §5 (Hosting) |

**Sub-tasks:**
- [ ] Pilih platform: Vercel / Netlify / Cloudflare Pages.
- [ ] Connect Git repository.
- [ ] Set build command: `npm run build`.
- [ ] Set output directory: `dist`.
- [ ] Set environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

### Task 6.2 — Update Supabase Auth URLs

**Sub-tasks:**
- [ ] Supabase Dashboard > Authentication > URL Configuration:
  - Site URL: `https://your-domain.com`
  - Redirect URLs: tambahkan `https://your-domain.com/reset-password`
- [ ] Jika ada domain kustom, update juga.

### Task 6.3 — Production Testing

**Sub-tasks:**
- [ ] Uji alur lengkap di production:
  1. Buka landing page.
  2. Klik Login → daftar user baru → cek profil terbuat.
  3. Login → redirect ke `/app`.
  4. Refresh → tetap di `/app`.
  5. Logout → redirect ke `/`.
  6. Akses `/app` langsung → redirect ke `/login`.
  7. Reset password → cek email → set password baru.
- [ ] Jalankan Lighthouse di URL production.
- [ ] Uji di mobile device nyata.

**✅ Deliverable Fase 6:** Website live dan berfungsi penuh di production.

---

## Risiko & Mitigasi

Merujuk langsung ke PRD §16:

| # | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| 1 | Animasi berat menurunkan performa di HP | UX buruk, Lighthouse turun | Animasikan hanya `transform`/`opacity`, lazy-load gambar, batasi ScrollTrigger |
| 2 | RLS salah konfigurasi | Data bocor | Aktifkan RLS di semua tabel, uji dengan 2 akun berbeda |
| 3 | Konflik Lenis ↔ GSAP ScrollTrigger | Scroll patah-patah | Sinkronkan: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker` |
| 4 | Redirect URL Auth salah setelah deploy | Login/reset gagal di prod | Daftarkan domain prod di Supabase Auth → URL Configuration |
| 5 | Meniru referensi terlalu persis | Isu orisinalitas | Ganti nama, copy, palet, aset; pakai foto Unsplash/Pexels |
| 6 | Rate limit email Supabase (free tier) | Email tertunda | Pertimbangkan SMTP kustom untuk produksi |

---

## Checklist Acceptance Criteria

Merujuk PRD §15 — semua harus ✅ sebelum rilis:

- [ ] **AC-01:** User baru bisa mendaftar, baris di `profiles` terbentuk otomatis.
- [ ] **AC-02:** User bisa login dengan kredensial benar → diarahkan ke `/app`.
- [ ] **AC-03:** Kredensial salah → pesan error tanpa crash.
- [ ] **AC-04:** `/app` tanpa login → redirect ke `/login`.
- [ ] **AC-05:** Refresh di `/app` saat sudah login → tetap di `/app`.
- [ ] **AC-06:** Logout → session hilang, tombol back tidak membuka `/app`.
- [ ] **AC-07:** User A tidak bisa baca/ubah profil User B (RLS).
- [ ] **AC-08:** Landing page tampil benar di 390px dan 1440px, tanpa horizontal scroll.
- [ ] **AC-09:** Animasi halus, nonaktif jika `prefers-reduced-motion`.
- [ ] **AC-10:** Lighthouse mobile Performance ≥ 85 pada build produksi.
- [ ] **AC-11:** Tidak ada secret / `service_role` key di repo maupun bundle klien.
