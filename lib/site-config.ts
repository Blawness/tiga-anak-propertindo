export const siteConfig = {
  name: "PT Tiga Anak Propertindo",
  tagline: "Membangun fondasi properti yang terpercaya",
  description:
    "Perusahaan properti baru yang berfokus pada fondasi tata kelola, kemitraan yang transparan, dan persiapan proyek yang solid.",
  brand: {
    primary: "#6F3715",
    accent: "#B1846A",
    background: "#FAFAFA",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Tentang Kami", href: "/tentang-kami" },
    { label: "Fokus Usaha", href: "/fokus-usaha" },
    { label: "Proyek", href: "/proyek" },
    { label: "Legalitas", href: "/legalitas" },
    { label: "Kontak", href: "/kontak" },
  ],
  contact: {
    email: "contact@tga-properindo.com",
    whatsapp: "",
  },
  hero: {
    title: "Membangun kepercayaan sejak perencanaan awal",
    subtitle:
      "Kami menyiapkan fondasi, tata kelola, dan kemitraan yang rapi agar setiap langkah pengembangan properti berjalan terstruktur dan prudent.",
    ctaLabel: "Hubungi Kami",
  },
  focusAreas: [
    {
      title: "Perencanaan & studi kelayakan",
      description:
        "Kajian awal yang terukur untuk memastikan arah proyek sesuai regulasi dan kebutuhan pasar.",
    },
    {
      title: "Kemitraan lahan & perizinan",
      description:
        "Pendekatan kolaboratif dengan pemilik lahan dan pemangku kepentingan, disertai kepatuhan dokumen.",
    },
    {
      title: "Manajemen konstruksi",
      description:
        "Pengawasan jadwal dan kualitas konstruksi dengan fokus pada keselamatan dan efisiensi.",
    },
    {
      title: "Pengelolaan risiko & tata kelola",
      description:
        "Standar pengendalian internal untuk menjaga transparansi dan akuntabilitas setiap tahap.",
    },
  ],
  credibility: [
    {
      label: "Pendekatan prudent",
      value: "Mitigasi risiko sejak tahap awal",
    },
    {
      label: "Kemitraan transparan",
      value: "Proses komunikasi yang jelas dan terdokumentasi",
    },
    {
      label: "Fokus compliance",
      value: "Kepatuhan regulasi sebagai prioritas inti",
    },
  ],
  legal: {
    status: "Legalitas dalam proses finalisasi; detail akan diperbarui secara berkala.",
    statement:
      "Kami berkomitmen pada tata kelola yang patuh dan transparan. Informasi legalitas akan dipublikasikan setelah seluruh dokumen selesai.",
  },
  about: {
    overview: [
      "PT Tiga Anak Propertindo adalah perusahaan properti yang berfokus pada fondasi tata kelola, kemitraan transparan, dan perencanaan proyek yang rapi.",
      "Sebagai perusahaan baru, kami menempatkan disiplin dokumentasi, uji kelayakan, dan pengendalian risiko sebagai prioritas sejak awal.",
    ],
    principles: [
      {
        title: "Transparansi & dokumentasi",
        description:
          "Setiap keputusan kunci dicatat, disetujui, dan dikomunikasikan secara jelas kepada pemangku kepentingan terkait.",
      },
      {
        title: "Kepatuhan regulasi",
        description:
          "Tahap perizinan dan pemenuhan regulasi diperlakukan sebagai jalur kritis agar proyek berjalan berkelanjutan.",
      },
      {
        title: "Kemitraan berimbang",
        description:
          "Struktur kolaborasi dibangun dengan pembagian peran yang jelas untuk menjaga akuntabilitas bersama.",
      },
      {
        title: "Mitigasi risiko dini",
        description:
          "Risiko teknis, legal, dan komersial dipetakan sejak awal untuk meminimalkan revisi mahal di tahap lanjut.",
      },
    ],
    currentFocus:
      "Fokus kami saat ini adalah mematangkan kerangka tata kelola, menyusun pipeline kemitraan, dan menyiapkan dokumentasi dasar sebelum eksekusi proyek.",
  },
  pages: {
    focus: {
      title: "Fokus usaha",
      subtitle:
        "Area prioritas yang kami jalankan untuk memastikan kesiapan proyek dan kemitraan berjalan terstruktur.",
      pillarsIntro:
        "Setiap fokus dilengkapi standar dokumentasi dan langkah mitigasi untuk meminimalkan risiko.",
    },
    project: {
      title: "Proyek",
      subtitle:
        "Proyek akan diumumkan setelah seluruh persiapan, perizinan, dan struktur kemitraan mencapai tahapan siap publik.",
      statusNote:
        "Status saat ini: Coming Soon. Kami sedang memfinalkan aspek legal dan struktur eksekusi sebelum publikasi.",
    },
    legal: {
      title: "Legalitas dan tata kelola",
      subtitle:
        "Kami memprioritaskan kepatuhan dan transparansi. Informasi legalitas akan diperbarui secara berkala.",
      documentsNote:
        "Detail dokumen akan dipublikasikan setelah seluruh proses registrasi selesai dan tervalidasi.",
    },
    contact: {
      title: "Kontak",
      subtitle:
        "Hubungi kami untuk percakapan awal. Kami menyiapkan waktu khusus agar diskusi berjalan fokus dan produktif.",
      availability: "Respons terjadwal, dengan prioritas pada kejelasan kebutuhan.",
    },
  },
};

export type SiteConfig = typeof siteConfig;

