export const siteConfig = {
  name: "PT Tiga Anak Propertindo",
  tagline: "Membangun fondasi properti yang terpercaya",
  description:
    "Perusahaan properti baru yang berfokus pada fondasi tata kelola, kemitraan yang transparan, dan persiapan proyek yang solid.",
  images: {
    // Curated: warm, architectural, editorial
    hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
    land: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=80",
    property: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80",
    building: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=2400&q=80",
    // Business & partnership
    collaboration: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2400&q=80",
    meeting: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=80",
    handshake: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=2400&q=80",
    // Planning & construction
    planning: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2400&q=80",
    construction: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2400&q=80",
    blueprint: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80",
    // Legal & documents
    legal: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=80",
    documents: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=2400&q=80",
    // Office & communication
    office: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=80",
    communication: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=2400&q=80",
    // Team & people
    team: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80",
    professional: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=80",
  },
  brand: {
    primary: "#5C3A20",
    accent: "#C89957",
    background: "#F9F9F9",
  },
  navigation: [
    { label: "Home", href: "/" },
    {
      label: "Tentang Kami",
      href: "/tentang-kami",
      children: [
        { label: "Tentang Kami", href: "/tentang-kami" },
        { label: "Proyek", href: "/proyek" },
        { label: "Legalitas", href: "/legalitas" },
      ],
    },
    { label: "Layanan", href: "/layanan" },
    { label: "Artikel", href: "/artikel" },
    { label: "Kontak", href: "/kontak" },
  ],
  contact: {
    email: "office@tigaanakpropertindo.com",
    website: "tigaanakpropertindo.com",
    whatsapp: "",
  },
  hero: {
    title: "Membangun kepercayaan sejak perencanaan awal",
    subtitle:
      "Kami menyiapkan fondasi, tata kelola, dan kemitraan yang rapi agar setiap langkah pengembangan properti berjalan terstruktur dan prudent.",
    ctaLabel: "Hubungi Kami",
  },
  coreServices: [
    {
      title: "Sewa lahan/properti",
      slug: "sewa-lahan",
      shortDescription: "Sewa gudang, properti komersial, dan lahan strategis.",
      description:
        "Layanan penyewaan aset properti yang mencakup gudang logistik, ruang usaha, hingga lahan kosong siap bangun dengan status legalitas yang jelas.",
      features: [
        "Sewa Gudang & Logistik",
        "Sewa Lahan Komersial",
        "Sewa Ruang Usaha",
        "Legalitas Sewa Terjamin",
      ],
    },
    {
      title: "Konsultasi & Pengurusan legalitas",
      slug: "konsultasi-legalitas",
      shortDescription: "Bantuan hukum dan perizinan properti terpadu.",
      description:
        "Jasa konsultasi mendalam mengenai aspek hukum properti serta pengurusan dokumen perizinan agar proyek berjalan patuh regulasi.",
      features: [
        "Verifikasi Dokumen Lahan",
        "Pengurusan IMB/PBG",
        "Analisis Zonasi & Tata Ruang",
        "Penyelesaian Sengketa Lahan",
      ],
    },
    {
      title: "Jual beli properti/lahan",
      slug: "jual-beli",
      shortDescription: "Transaksi jual beli aman dan transparan.",
      description:
        "Fasilitasi transaksi jual beli aset properti dengan proses yang transparan, mulai dari valuasi, negosiasi, hingga peralihan hak.",
      features: [
        "Jual Beli Lahan Matang",
        "Jual Beli Properti Komersial",
        "Valuasi Aset",
        "Due Diligence Transaksi",
      ],
    },
    {
      title: "Kemitraan lahan & perizinan",
      slug: "kemitraan-perizinan",
      shortDescription: "Kolaborasi pengembangan lahan yang saling menguntungkan.",
      description:
        "Skema kerjasama (Joint Venture/Joint Operation) untuk pemilik lahan yang ingin mengembangkan asetnya dengan dukungan perizinan dan manajemen proyek profesional.",
      features: [
        "Skema Kerjasama (JV/JO)",
        "Studi Kelayakan Proyek",
        "Manajemen Perizinan Terpadu",
        "Bagi Hasil Transparan",
      ],
    },
  ],
  credibility: [
    {
      label: "Pendekatan prudent",
      value: "Mitigasi risiko sejak tahap awal",
    },
    {
      label: "Kemitraan transparan",
      value: "Komunikasi terdokumentasi dan mudah ditelusuri",
    },
    {
      label: "Fokus compliance",
      value: "Kepatuhan regulasi sebagai prioritas inti",
    },
  ],
  roadmap: {
    title: "Roadmap kesiapan eksekusi",
    subtitle:
      "Langkah bertahap untuk memastikan tata kelola, kemitraan, dan kesiapan proyek berjalan terstruktur sebelum publikasi.",
    phases: [
      {
        title: "Fondasi & tata kelola",
        period: "Tahap 1",
        detail: "Membangun kerangka kontrol internal, SOP, dan dokumentasi dasar.",
        status: "Berjalan",
      },
      {
        title: "Kepatuhan & legalitas",
        period: "Tahap 2",
        detail: "Finalisasi perizinan inti dan validasi dokumen pendukung.",
        status: "Progres",
      },
      {
        title: "Kemitraan & studi",
        period: "Tahap 3",
        detail: "Penjajakan mitra lahan/finansial dan uji kelayakan awal.",
        status: "Terjadwal",
      },
      {
        title: "Pra-peluncuran proyek",
        period: "Tahap 4",
        detail: "Kurasi materi publikasi dan kesiapan komunikasi resmi.",
        status: "Mendatang",
      },
    ],
  },
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
  // Every unit has one koordinator; `staff` is the number of staff divisi.
  organization: {
    leaders: {
      ceo: { title: "Direktur Utama", name: "Adam Maulana Hafiz, S.H." },
      coo: { title: "Direktur Operasional", name: "Annisa Novianty, S.H., M.H." },
    },
    divisions: [
      {
        name: "Finance",
        reportsTo: "coo",
        units: [
          { name: "Accounting", staff: 1 },
          { name: "Investment", staff: 1 },
        ],
      },
      {
        name: "Business Development",
        reportsTo: "coo",
        units: [
          { name: "Marketing Communication", staff: 2 },
          { name: "Project Officer", staff: 1 },
        ],
      },
      {
        name: "Human Capital",
        reportsTo: "ceo",
        units: [
          { name: "HR & GA", staff: 1 },
          { name: "Legal Officer", staff: 1 },
        ],
      },
    ],
  },
  pages: {
    services: {
      title: "Layanan",
      subtitle:
        "Fokus layanan untuk menyiapkan proyek yang tertata, patuh regulasi, dan siap dijalankan.",
      pillarsIntro:
        "Setiap layanan memiliki standar dokumentasi, mitigasi risiko, dan pengendalian kualitas.",
    },
    article: {
      title: "Artikel",
      subtitle:
        "Kurasi wawasan properti, tata kelola, dan kemitraan yang sedang kami siapkan untuk rilis resmi.",
      statusTitle: "Status rilis",
      statusNote:
        "Status saat ini: Coming Soon. Kami memfinalkan panduan editorial dan kurasi topik sebelum publikasi.",
      contentNote:
        "Konten akan berfokus pada kesiapan proyek, mitigasi risiko, tata kelola, dan praktik kemitraan yang berimbang.",
      nextStepNote:
        "Untuk permintaan media kit atau ringkasan profil perusahaan, silakan hubungi kami melalui email.",
      contactNote:
        "Sampaikan kebutuhan materi atau topik wawasan yang ingin diprioritaskan.",
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
    comingSoon: {
      title: "Coming Soon",
      subtitle:
        "Halaman ini sedang kami siapkan untuk rilis resmi. Mohon tunggu pembaruan berikutnya.",
      statusDetail:
        "Kami memfinalkan materi, visual, dan tata kelola informasi agar sesuai standar komunikasi perusahaan.",
      nextStepNote:
        "Apabila Anda membutuhkan profil singkat atau penjelasan awal, silakan hubungi kami melalui email.",
    },
  },
};

export type SiteConfig = typeof siteConfig;

