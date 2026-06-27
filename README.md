# Portofolio — Ahmad Davfa Maulana

Portofolio satu halaman (HTML, CSS, JS murni — tanpa framework, tanpa proses build).
Konsepnya "konsol terminal" — retro-futurism ala layar komputer & mission-control
era 70–80an: monospace penuh, warna fosfor hijau/amber di atas dasar gelap, tanpa
gradient pelangi atau efek blur/glow berlebihan. Tiap bagian diberi label
"Modul 0X" seperti log sistem, dan nomor tangkapan layar pakai gaya "Frame_0X".

## Struktur folder

```
index.html
assets/
  css/style.css        seluruh styling (token warna & tipografi di bagian :root)
  js/main.js            menu mobile, reveal-on-scroll, galeri geser, lightbox
  img/
    logo.svg            logo monogram "AD" ala panel terminal
    profile-*.png/webp  foto profil
    projects/           tangkapan layar tiap studi kasus (ukuran penuh + -thumb)
  docs/
    Ahmad-Davfa-Maulana-CV.pdf   file yang diunduh lewat tombol "Unduh CV"
```

## Bagian halaman

1. **Beranda** — sampul: prompt terminal `whoami`, nama, peran, info ringkas ala "status readout".
2. **Profil** — profil singkat + data kontak (sumber: CV).
3. **Pengalaman** — riwayat kerja/pelatihan (LSP 2025, mata kuliah 2024).
4. **Keahlian** — daftar kemampuan teknis (tabel "komponen") + dua catatan soft skill.
5. **Proyek** — dua studi kasus:
   - *Sistem Admin Pembelian & Stock Toko* (Node.js/Express/SQLite + chatbot AI)
   - *Teknisi Baik* (PHP/MySQL, tugas kelompok kuliah Web Programming)
6. **Kontak** — email & WhatsApp, dengan panel "STATUS ONLINE".

## Mengganti konten

- **Teks**: langsung edit `index.html`, semua teks ada di markup (tidak ada CMS/JSON terpisah).
- **Tangkapan layar proyek**: ganti file di `assets/img/projects/` dengan nama yang sama
  (sediakan juga versi `-thumb.webp` berukuran lebih kecil untuk galeri agar tetap ringan).
- **Warna/font**: ubah variabel di bagian `:root` paling atas `assets/css/style.css`
  (`--paper` = dasar gelap, `--blue` = aksen hijau fosfor, `--signal` = aksen amber).
- **CV yang diunduh**: timpa `assets/docs/Ahmad-Davfa-Maulana-CV.pdf` dengan file CV terbaru
  (nama file boleh sama agar tautan unduh di `index.html` tidak perlu diubah).

## Menjalankan di lokal

Tidak butuh server khusus — cukup buka `index.html` langsung di browser, atau jalankan
server statis sederhana, contoh:

```bash
npx serve .
```

## Deploy

Folder ini bisa langsung di-deploy ke GitHub Pages, Netlify, atau Vercel sebagai situs statis
(tidak ada langkah build).

## Catatan teknis

- Tidak ada dependency eksternal selain Google Fonts (Space Mono, IBM Plex Mono)
  yang dimuat lewat tag `<link>` di `index.html`.
- Sudah mobile-first dan diuji pada lebar 375–1440px; mendukung `prefers-reduced-motion`
  dan `safe-area-inset` untuk perangkat iOS dengan notch/home indicator.
- `color-scheme: dark` diset di root agar kontrol native browser ikut menyesuaikan.

