# Dokumen Desain (UI/UX): Website Agency

| | |
|---|---|
| **Versi** | 1.0 |
| **Tanggal** | 12 Oktober 2026 |
| **Dokumen terkait** | `PRD.md` |
| **Cakupan** | Landing page, halaman login, main page |

---

## 1. Arah Desain

### 1.1 Konsep
> **"Struktur bertemu emosi."** Tata letak yang rapi dan tegas (grid, tipografi besar, kontras tinggi), dilunakkan oleh warna hangat dan gerak yang halus.

### 1.2 Kata kunci karakter
**Berani · Editorial · Hangat · Presisi · Berirama**

### 1.3 Prinsip desain
1. **Tipografi adalah visual utama.** Heading raksasa menjadi elemen grafis, bukan sekadar teks.
2. **Kontras tegas.** Krem terang, hitam pekat, dan satu aksen oranye. Hindari warna tambahan.
3. **Ruang kosong sebagai jeda.** Beri napas besar antar section agar ritme scroll terasa.
4. **Gerak punya tujuan.** Animasi memandu perhatian, bukan sekadar hiasan.
5. **Mobile-first.** Setiap komponen dirancang untuk layar kecil dulu, lalu diperluas.
6. **Orisinal.** Referensi hanya untuk gaya. Brand, copy, dan aset harus buatan sendiri.

---

## 2. Design Tokens

### 2.1 Warna

| Token | Hex | Kegunaan |
|---|---|---|
| `cream-50` | `#F8F2EC` | Background form / kartu terang |
| `cream-100` | `#F0E6DD` | **Background utama** |
| `cream-200` | `#E4D6C9` | Garis pemisah, border halus |
| `ink-900` | `#0A0A0A` | Teks utama, section gelap |
| `ink-700` | `#2A2A2A` | Teks sekunder di bg terang |
| `ink-500` | `#6B6B6B` | Teks pendukung, placeholder |
| `accent-500` | `#FF4F00` | **Aksen utama** (stats, highlight, hover) |
| `accent-600` | `#D94300` | Hover/pressed aksen |
| `neon-400` | `#CCFF00` | Aksen kedua, hanya untuk CTA/kontak |
| `success` | `#1F9D55` | Notifikasi sukses |
| `danger` | `#D92D20` | Error form |

**Aturan pemakaian**
- Proporsi ideal: **60% krem, 25% hitam, 10% oranye, 5% neon**.
- Neon hanya dipakai di **satu section per halaman** (Kontak).
- Teks oranye di atas krem hanya untuk ukuran besar (≥ 24px) karena kontrasnya terbatas.

### 2.2 Tipografi

| Peran | Font | Fallback |
|---|---|---|
| Display / heading | **Anton** (alternatif: Bebas Neue, Big Shoulders Display) | `Impact, 'Arial Narrow', sans-serif` |
| Body / UI | **Inter** (alternatif: Manrope) | `system-ui, sans-serif` |
| Mono (label kecil) | **JetBrains Mono** (opsional) | `ui-monospace, monospace` |

**Skala tipografi (fluid)**

| Token | Ukuran | Line-height | Dipakai untuk |
|---|---|---|---|
| `display-xl` | `clamp(4rem, 15vw, 14rem)` | 0.85 | Judul hero / nama studio |
| `display-lg` | `clamp(3rem, 10vw, 9rem)` | 0.88 | Judul section (PORTFOLIO, SERVICES) |
| `display-md` | `clamp(2rem, 5vw, 4rem)` | 0.95 | Subjudul, heading kartu besar |
| `h3` | `1.5rem` | 1.2 | Judul kartu |
| `body-lg` | `1.125rem` | 1.6 | Paragraf pengantar |
| `body` | `1rem` | 1.6 | Teks standar |
| `caption` | `0.8125rem` | 1.4 | Tag, label, meta |

**Aturan**
- Semua `display-*` memakai **uppercase**, `letter-spacing: -0.01em`.
- Body text maksimal lebar baca **65 karakter** (`max-w-prose`).
- Muat font dengan `display=swap` dan preload font display.

**Gaya teks outline**
```css
.text-outline {
  color: transparent;
  -webkit-text-stroke: 2px var(--ink-900);
}
@media (max-width: 640px) {
  .text-outline { -webkit-text-stroke-width: 1.5px; }
}
```

### 2.3 Spacing dan Layout

- **Basis spacing:** kelipatan 4px (skala Tailwind default).
- **Padding section vertikal:** `py-20` (mobile) → `py-32` (tablet) → `py-40` (desktop).
- **Container:** `max-width: 1440px`, padding horizontal `px-5` (mobile) → `px-10` (desktop).
- **Grid:** 4 kolom (mobile), 8 kolom (tablet), 12 kolom (desktop), gap `16px` / `24px`.

| Breakpoint | Lebar |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### 2.4 Radius, Border, Shadow

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `radius-sm` | 6px | Tag, input kecil |
| `radius-md` | 12px | Kartu, input |
| `radius-lg` | 20px | Gambar portfolio, section card |
| `radius-full` | 9999px | Tombol pill, avatar |
| `border` | `1px solid #E4D6C9` | Garis halus di bg krem |
| `shadow-card` | `0 10px 30px -12px rgba(0,0,0,.25)` | Kartu mengambang (hover) |

Gaya umum: **flat dan bersih**. Shadow hanya muncul saat hover.

### 2.5 Konfigurasi Tailwind (acuan)

```js
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#F8F2EC', 100: '#F0E6DD', 200: '#E4D6C9' },
        ink: { 900: '#0A0A0A', 700: '#2A2A2A', 500: '#6B6B6B' },
        accent: { 500: '#FF4F00', 600: '#D94300' },
        neon: { 400: '#CCFF00' },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'Arial Narrow', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 15vw, 14rem)', { lineHeight: '0.85' }],
        'display-lg': ['clamp(3rem, 10vw, 9rem)', { lineHeight: '0.88' }],
        'display-md': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '0.95' }],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: { marquee: 'marquee 30s linear infinite' },
    },
  },
  plugins: [],
}
```

---

## 3. Komponen UI

### 3.1 Tombol

| Varian | Tampilan | Hover |
|---|---|---|
| **Primary** | Pill hitam, teks krem, ikon panah ↗ di lingkaran | Background → oranye, panah berputar 45° |
| **Secondary** | Pill outline hitam 1.5px, teks hitam | Fill hitam, teks krem |
| **Link** | Teks uppercase dengan garis bawah | Garis bawah menjadi oranye |
| **Neon (CTA kontak)** | Pill neon, teks hitam | Naik 2px + shadow |

- Tinggi: `44px` (min. tap target) → `52px` untuk CTA besar.
- Padding horizontal: `24px`. Transisi `200ms ease-out`.
- State wajib: default, hover, focus-visible (ring oranye 2px), active, disabled, loading (spinner kecil).

### 3.2 Input Form

- Tinggi `52px`, radius `12px`, background `cream-50`, border `cream-200`.
- Label di atas input (bukan hanya placeholder), ukuran `caption`, uppercase.
- Focus: border `ink-900` + ring `accent-500/30`.
- Error: border `danger`, pesan di bawah input dengan ikon, `role="alert"`.
- Password: tombol tampil/sembunyikan (ikon mata dari lucide-react).

### 3.3 Tag / Chip
Pill kecil (`caption`, uppercase), border 1px, padding `4px 10px`. Pada kartu portfolio berlatar gambar, tag memakai background `ink-900/60` + `backdrop-blur`.

### 3.4 Kartu Portfolio
- Gambar penuh dengan radius `20px`, rasio bervariasi (4:5, 1:1, 16:10) untuk kesan asimetris.
- Label judul di pojok kiri bawah dalam pill krem; tag kategori di kanan bawah.
- **Hover:** gambar zoom `scale(1.05)` (durasi 600ms), kursor kustom "VIEW" (opsional).

### 3.5 Kartu Layanan
Background `cream-50`, border halus, radius `20px`, padding `24px`. Struktur: ikon oranye → judul uppercase → deskripsi → daftar "What's included" (ikon centang kecil).

### 3.6 Marquee
- Dua set konten identik berjajar agar loop mulus, geser `translateX(0 → -50%)`.
- Pemisah antar kata: ikon panah/bintang oranye.
- Latar oranye atau hitam dengan garis tipis di atas-bawah. Kecepatan ±30 detik per siklus.
- Pause saat hover (desktop).

### 3.7 Navbar
- **Desktop:** logo kiri, menu kanan (Home, About, Services, Portfolio, Contact), tombol "Login".
- **Mobile:** logo + tombol "MENU" yang membuka overlay layar penuh (background hitam, link berukuran `display-md`).
- Posisi sticky, transparan di atas hero, berubah solid krem + blur setelah scroll ±80px.

### 3.8 Counter Statistik
Angka `display-xl` + simbol "+" lebih kecil, label `caption` uppercase di sampingnya. Latar oranye penuh dengan teks hitam/krem.

---

## 4. Spesifikasi Halaman

### 4.1 Landing Page (`/`)

Urutan section dan ritme warna latar:

| # | Section | Latar | Isi utama |
|---|---|---|---|
| 1 | **Hero** | Krem | Judul `display-xl` (campuran solid + outline), subteks, CTA, 1–2 gambar overlap |
| 2 | **Marquee** | Oranye | Teks berjalan: Branding · Solutions · Identity · Strategy · Marketing · Growth |
| 3 | **Intro** | Krem | Paragraf pernyataan (`body-lg` uppercase kondensed) + tombol "Discover More" |
| 4 | **Portfolio** | Krem | Judul PORTFOLIO raksasa, grid 5–6 kartu asimetris, link "Show all" |
| 5 | **Logo klien** | Krem | Strip 6 logo placeholder dalam kotak miring (skew) |
| 6 | **Services** | Krem | Judul SERVICES, daftar 4 layanan besar bergaris bawah, gambar pendukung |
| 7 | **Statistik** | Oranye | 4 counter berselang-seling kiri-kanan |
| 8 | **Testimoni** | Hitam | Kutipan besar + foto, daftar nama lain di bawah |
| 9 | **Blog/Insight** | Krem | 3 kartu artikel (gambar, meta, judul) |
| 10 | **Kontak** | Neon + hitam | Kartu neon berisi info, form di sisi kanan dengan background gelap |
| 11 | **Footer** | Hitam | Sosial, copyright, kebijakan |

**Wireframe hero (desktop)**
```
┌──────────────────────────────────────────────────────┐
│ ◥ LOGO              Home  About  Services    [LOGIN] │
│                                                      │
│  DESIGNING  B O L D –          ┌────────┐            │
│  M O D E R N  BRANDS           │ foto   │            │
│  ┌──────┐   teks pendek        └────────┘            │
│  │ foto │   [Explore Work ↗]                         │
│  └──────┘                                            │
├──────────────────────────────────────────────────────┤
│ BRANDING ➜ SOLUTIONS ➜ IDENTITY ➜ STRATEGY ➜ ...    │ ← marquee
└──────────────────────────────────────────────────────┘
```

**Layout mobile:** semua grid menjadi 1 kolom; kartu portfolio ditumpuk dengan rasio gambar tetap 4:5; judul besar menyusut lewat `clamp()`; marquee tetap horizontal.

### 4.2 Halaman Login (`/login`)

**Desktop:** dua kolom (50/50).
- **Kiri:** panel hitam atau oranye berisi logo, judul besar ("WELCOME BACK"), dan satu gambar/pola dekoratif.
- **Kanan:** form di atas latar krem, vertikal-tengah, lebar maks `420px`.

**Mobile:** satu kolom, panel dekoratif dipersingkat menjadi header kecil.

**Isi form**
1. Heading `display-md`: "LOGIN" / "CREATE ACCOUNT" (toggle).
2. Field: Email, Password (+ konfirmasi password saat mode daftar).
3. Tombol Primary "Masuk" / "Daftar" (lebar penuh, ada state loading).
4. Link kecil: "Lupa password?" dan toggle "Belum punya akun? Daftar".
5. Tautan "← Kembali ke beranda".

**Perilaku UI**
- Transisi antar mode Login/Daftar: fade + slide 200ms.
- Error ditampilkan inline di bawah field dan ringkasan di atas form untuk error server.
- Setelah sukses: tombol berubah centang singkat, lalu redirect ke `/app`.

**Wireframe**
```
┌───────────────────┬──────────────────────────┐
│  ◥ LOGO           │                          │
│                   │   LOGIN                  │
│  WELCOME          │   Email   [____________] │
│  BACK.            │   Password[____________] │
│                   │   [   MASUK        ↗   ] │
│  (gambar/pola)    │   Lupa password?         │
│                   │   Belum punya akun?      │
└───────────────────┴──────────────────────────┘
```

### 4.3 Main Page (`/app`)

> Isi final menyesuaikan kebutuhan proyek. Berikut kerangka dasarnya.

- **Header:** logo, sapaan ("Halo, {nama}"), avatar/inisial, tombol Logout.
- **Hero kecil:** judul `display-md` ("DASHBOARD") dan ringkasan singkat.
- **Grid kartu ringkasan:** 3–4 kartu (angka + label), gaya sama dengan counter statistik tetapi lebih ringkas.
- **Daftar/Tabel konten:** kartu krem-50 dengan border halus, baris berselang dengan garis pemisah.
- **Empty state:** ilustrasi sederhana + teks ajakan dan tombol aksi.
- Latar halaman: krem, dengan satu blok gelap sebagai aksen.

Gaya halaman ini sengaja **lebih tenang** daripada landing page: tipografi display dipakai hemat, fokus pada keterbacaan data.

### 4.4 Halaman 404
Teks "404" `display-xl` (outline), kalimat singkat, tombol kembali ke beranda.

---

## 5. Motion Design

### 5.1 Prinsip
- Hanya animasikan `transform` dan `opacity` agar tetap 60fps.
- Easing utama: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out halus).
- Animasi muncul **sekali** (`once: true`), tidak berulang saat scroll naik-turun.

### 5.2 Katalog Animasi

| Nama | Efek | Durasi | Library |
|---|---|---|---|
| `reveal-up` | Fade-in + naik 40px | 700ms | Framer Motion |
| `reveal-line` | Teks heading muncul per baris dari mask bawah | 800ms, stagger 80ms | Framer Motion / GSAP |
| `image-reveal` | Clip-path dari bawah ke atas | 900ms | GSAP |
| `parallax` | Gambar bergeser lebih lambat dari scroll (±10%) | mengikuti scroll | GSAP ScrollTrigger |
| `marquee` | Loop horizontal tak berujung | 30s linear | CSS |
| `count-up` | Angka naik dari 0 | 1,8s | react-countup |
| `card-hover` | Zoom gambar 1.05 + tag naik | 500–600ms | CSS/Tailwind |
| `button-hover` | Fill berubah + panah berputar 45° | 200ms | CSS/Tailwind |
| `page-transition` | Fade + slide ringan antar route | 300ms | Framer Motion `AnimatePresence` |
| `smooth-scroll` | Scroll berinersia halus | global | Lenis |

### 5.3 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Saat aktif: matikan Lenis dan parallax, marquee berhenti, elemen langsung tampil.

---

## 6. Aset Visual

### 6.1 Fotografi dan mockup
- **Gaya:** tone hangat (oranye, krem, cokelat), pencahayaan lembut, komposisi minimalis, objek tunggal.
- **Sumber legal:** Unsplash, Pexels, Freepik (cek lisensi). Jangan ambil gambar dari website referensi.
- **Format:** WebP/AVIF, lebar maks 1920px (hero) dan 1200px (kartu). Sediakan `srcset`.
- **Wajib:** semua gambar punya `alt` deskriptif dan atribut `width`/`height` untuk mencegah layout shift.

### 6.2 Logo
Buat logo teks sederhana (wordmark) memakai font display + satu ikon geometris. Logo klien di landing memakai placeholder buatan sendiri.

### 6.3 Ikon
`lucide-react`, stroke 1.5–2px. Warna mengikuti teks, aksen oranye untuk ikon layanan.

### 6.4 Tekstur (opsional)
Overlay *grain* sangat halus (opacity 3–5%) pada section oranye untuk kesan cetak. Gunakan PNG kecil atau SVG noise.

---

## 7. Responsif

| Elemen | Mobile (<640) | Tablet (640–1023) | Desktop (≥1024) |
|---|---|---|---|
| Navbar | Logo + tombol MENU (overlay) | Sama dengan mobile | Menu penuh |
| Hero | 1 kolom, gambar di bawah teks | 1 kolom, gambar lebih besar | Teks + gambar overlap |
| Portfolio | 1 kolom | 2 kolom | Grid asimetris 12 kolom |
| Services | Daftar vertikal, gambar disembunyikan | Daftar + 1 gambar | Daftar + gambar melayang |
| Statistik | 2×2, rata kiri | 2×2 | Berselang-seling (zig-zag) |
| Login | Satu kolom | Satu kolom | Dua kolom |

Uji di lebar **360, 390, 768, 1024, 1440, 1920px**.

---

## 8. Aksesibilitas

- Kontras teks normal ≥ **4.5:1**, teks besar ≥ **3:1** (cek khusus oranye pada krem).
- Semua elemen interaktif bisa dijangkau keyboard; fokus terlihat (`focus-visible` ring oranye 2px, offset 2px).
- Landmark semantik: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`.
- Satu `<h1>` per halaman; hierarki heading berurutan.
- Form: `<label>` terhubung `htmlFor`, pesan error memakai `aria-describedby` dan `role="alert"`.
- Marquee dan animasi dekoratif diberi `aria-hidden="true"`; sediakan teks setara jika bermakna.
- Overlay menu mobile: kunci scroll, trap fokus, tutup dengan `Esc`.
- Tap target minimal **44×44px**.

---

## 9. Struktur Komponen (pemetaan desain → kode)

```
components/
├── ui/
│   ├── Button.tsx          # primary | secondary | link | neon
│   ├── Input.tsx           # label, error, toggle password
│   ├── Tag.tsx
│   ├── SectionTitle.tsx    # display-lg + varian outline
│   ├── Marquee.tsx
│   ├── CountUp.tsx
│   └── Reveal.tsx          # wrapper animasi reveal-up
├── layout/
│   ├── Navbar.tsx
│   ├── MobileMenu.tsx
│   ├── Footer.tsx
│   └── PageTransition.tsx
├── landing/
│   ├── Hero.tsx
│   ├── Intro.tsx
│   ├── PortfolioGrid.tsx
│   ├── ClientLogos.tsx
│   ├── Services.tsx
│   ├── Stats.tsx
│   ├── Testimonials.tsx
│   ├── BlogPreview.tsx
│   └── Contact.tsx
└── auth/
    ├── AuthLayout.tsx      # split panel
    ├── LoginForm.tsx
    └── RegisterForm.tsx
```

---

## 10. Do dan Don't

| ✅ Do | ❌ Don't |
|---|---|
| Pakai satu font display dan satu font body | Mencampur banyak font |
| Beri whitespace besar antar section | Menjejalkan terlalu banyak elemen |
| Batasi warna aksen (oranye + neon sedikit) | Menambah warna baru di luar token |
| Animasikan `transform`/`opacity` | Menganimasikan `width`, `height`, `top`, `left` |
| Kompres dan lazy-load gambar | Memuat gambar mentah ukuran besar |
| Uji di perangkat nyata | Hanya mengandalkan emulator desktop |
| Ganti nama, copy, dan aset dengan milik sendiri | Menyalin persis konten/aset dari referensi |

---

## 11. Checklist Penyelesaian Desain

- [ ] Token warna, font, dan spacing terpasang di `tailwind.config.js`
- [ ] Font display dan body termuat dengan fallback
- [ ] Komponen UI dasar (Button, Input, Tag) selesai dengan semua state
- [ ] 11 section landing page selesai dan responsif
- [ ] Halaman login dua kolom (desktop) dan satu kolom (mobile)
- [ ] Main page kerangka dasar selesai
- [ ] Marquee, counter, reveal, dan parallax berjalan halus
- [ ] `prefers-reduced-motion` diuji
- [ ] Kontras warna dan navigasi keyboard diuji
- [ ] Semua gambar dioptimasi dan berlisensi jelas
- [ ] Diuji di 6 lebar layar pada daftar di bagian 7