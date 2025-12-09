# PT Tiga Anak Propertindo – Company Profile

Website company profile statis untuk PT Tiga Anak Propertindo. Dibangun dengan Next.js 15 (App Router), TypeScript, dan Tailwind CSS tanpa CMS atau database. Seluruh konten utama bersumber dari satu konfigurasi terpusat di `lib/site-config.ts`.

## Tech Stack
- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS
- Framer Motion (animasi ringan)
- Bun / Node sebagai package runner (bun.lock disertakan)

## Struktur Proyek
- `app/` – halaman App Router (Server Components secara default)
- `components/` – komponen UI modular (header, footer, hero, section, stat, CTA, motion)
- `(pages)/` – grouping rute publik: home, tentang-kami, fokus-usaha, proyek (Coming Soon), legalitas, kontak
- `lib/` – konfigurasi situs (`site-config.ts`) dan helper metadata (`meta.ts`)
- `styles/` – konfigurasi dan utilitas Tailwind (`globals.css`)
- `docs/` – referensi brand (`brand-guidelines.md`, `UI-UX.md`)

## Konten & Konfigurasi
- Semua teks, navigasi, warna brand, dan copy halaman disetel di `lib/site-config.ts`.
- Halaman tidak boleh meng-hardcode data perusahaan di luar konfigurasi ini.
- CTA utama: kontak/WhatsApp sesuai tone formal dan tidak agresif.

## Halaman Publik
- `/` Home
- `/tentang-kami`
- `/fokus-usaha`
- `/proyek` (status: Coming Soon)
- `/legalitas`
- `/kontak`

## Pengembangan
Prasyarat: Bun atau Node 18+, pnpm/npm boleh dipakai bila perlu (sesuaikan perintah).

Instalasi:
- `bun install`

Perintah harian:
- `bun dev` – menjalankan server pengembangan
- `bun run lint` – cek linting
- `bun run type-check` – cek TypeScript
- `bun run build` – build produksi
- `bun run start` – menjalankan build produksi

## Styling & Brand
- Palet utama: Rustic Brown `#6F3715`, aksen Sand Brown `#B1846A`, background `#FAFAFA`. Detail lengkap ada di `docs/brand-guidelines.md`.
- Tipografi mengikuti panduan brand (League Spartan untuk heading, DM Sans/Nunito Sans untuk body).
- Kelas Tailwind tersedia di `styles/globals.css` dan `tailwind.config.ts`.

## Komponen Kunci
- `components/header.tsx` & `footer.tsx` – navigasi dan identitas
- `page-hero.tsx`, `section.tsx`, `stat-card.tsx` – layout section utama
- `contact-card.tsx`, `cta-button.tsx` – CTA kontak yang tenang dan informatif
- `motion.tsx` – `FadeIn` berbasis Framer Motion (viewport once, easing halus)

## SEO & Metadata
- Gunakan `buildMetadata` di `lib/meta.ts` untuk title/description konsisten dan templating judul.
- Deskripsi default diambil dari `site-config.ts`.

## Deployment
- Build: `bun run build`
- Start: `bun run start`
- Tidak ada konfigurasi env sensitif; semua konten statis.

## Catatan Penting
- Hindari klaim pemasaran berlebihan; fokus pada legitimasi, transparansi, dan kesiapan proyek.
- Jangan menambahkan listing proyek aktif atau data palsu sebelum siap publikasi.