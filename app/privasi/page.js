// Halaman Kebijakan Privasi NgobrolEng — ngobroleng.com/privasi
// [EMAIL KONTAK] harus diganti sebelum deploy.

export const metadata = {
  title: 'Kebijakan Privasi — NgobrolEng',
  description: 'Kebijakan privasi NgobrolEng: data apa yang diproses saat kamu belajar bahasa Inggris dengan AI, untuk siswa, orang tua, dan guru.',
};

const C = {
  blue: '#1e3a8a',
  blueMid: '#2563eb',
  bluePale: '#dbeafe',
  red: '#dc2626',
  white: '#ffffff',
  offWhite: '#f8faff',
  navy: '#0f1d44',
  gray: '#64748b',
  grayLight: '#e2e8f0',
};

const EMAIL = 'donnybachtiar8@gmail.com';

const s = {
  page: { minHeight: '100vh', background: C.offWhite, color: C.navy, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
  header: {
    background: `linear-gradient(155deg, ${C.navy} 0%, ${C.blue} 55%, ${C.blueMid} 100%)`,
    color: C.white, padding: '40px 20px 44px', borderBottom: `4px solid ${C.red}`,
  },
  headerInner: { maxWidth: 720, margin: '0 auto' },
  back: { color: C.white, opacity: 0.85, fontSize: 14, fontWeight: 600, textDecoration: 'none' },
  eyebrow: { fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.8, margin: '22px 0 8px' },
  h1: { fontSize: 'clamp(28px, 6vw, 40px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em' },
  main: { maxWidth: 720, margin: '0 auto', padding: '32px 20px 24px' },
  updated: { fontSize: 13, color: C.gray, marginBottom: 20 },
  summary: {
    background: C.white, border: `1.5px solid ${C.grayLight}`, borderLeft: `5px solid ${C.blueMid}`,
    borderRadius: 16, padding: '18px 20px', marginBottom: 12,
  },
  h2: { fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em', margin: '36px 0 10px', color: C.navy },
  h3: { fontSize: 16, fontWeight: 700, margin: '20px 0 6px', color: C.blue },
  p: { fontSize: 16, lineHeight: 1.7, color: '#334155', marginBottom: 12 },
  ul: { margin: '0 0 12px 22px', fontSize: 16, lineHeight: 1.7, color: '#334155' },
  li: { marginBottom: 6 },
  parent: {
    background: C.bluePale, borderRadius: 16, padding: '18px 20px', margin: '8px 0 12px',
  },
  a: { color: C.blueMid, fontWeight: 600 },
  footer: { textAlign: 'center', padding: '28px 20px 36px', fontSize: 12, color: '#94a3b8' },
  stripe: { display: 'flex', width: 60, margin: '0 auto 12px', borderRadius: 3, overflow: 'hidden' },
};

function Ext({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" style={s.a}>{children}</a>;
}

export default function PrivasiPage() {
  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.headerInner}>
          <a href="/" style={s.back}>← Kembali ke NgobrolEng</a>
          <p style={s.eyebrow}>Kebijakan Privasi</p>
          <h1 style={s.h1}>Privasi kamu, dijelaskan dengan jujur.</h1>
        </div>
      </header>

      <main style={s.main}>
        <p style={s.updated}>Terakhir diperbarui: 24 September 2026</p>

        <div style={s.summary}>
          <p style={{ ...s.p, marginBottom: 0 }}>
            <strong>Singkatnya:</strong> NgobrolEng gratis dan tidak perlu akun. Percakapan kamu
            tidak kami simpan, baik di server maupun di HP kamu. Begitu halaman ditutup atau
            di-refresh, percakapannya hilang. Kami juga tidak menjual data siapa pun.
          </p>
        </div>

        <h2 style={s.h2}>Data yang diproses saat kamu belajar</h2>

        <h3 style={s.h3}>Pesan dan tulisan kamu</h3>
        <p style={s.p}>
          Supaya AI bisa membalas, pesan kamu (termasuk jawaban latihan speaking yang sudah
          diubah jadi teks, dan esai latihan writing) dikirim ke Anthropic, pembuat AI Claude.
          Server NgobrolEng hanya meneruskannya dan tidak menyimpan isi percakapan.
        </p>

        <h3 style={s.h3}>Nama kamu</h3>
        <p style={s.p}>
          Dalam beberapa latihan, AI akan menanyakan nama kamu, seperti di ujian aslinya. Nama
          ini hanya dipakai selama percakapan berlangsung dan tidak disimpan. Kamu boleh
          memakai nama panggilan saja.
        </p>

        <h3 style={s.h3}>Suara kamu (mikrofon)</h3>
        <p style={s.p}>
          Saat kamu menekan tombol mikrofon, suara kamu diubah menjadi teks oleh fitur pengenal
          suara bawaan browser, bukan oleh NgobrolEng. Di Google Chrome, proses ini biasanya
          dilakukan di server Google. NgobrolEng tidak pernah menerima atau merekam suara kamu.
          Kami hanya menerima teks hasilnya.
        </p>

        <h3 style={s.h3}>Suara AI (tombol speaker)</h3>
        <p style={s.p}>
          Saat kamu memutar suara balasan AI, teks balasan AI dikirim ke ElevenLabs untuk
          diubah menjadi suara. Yang dikirim hanya teks buatan AI, bukan pesan atau data kamu.
        </p>

        <h3 style={s.h3}>Alamat IP</h3>
        <p style={s.p}>
          Alamat IP dipakai untuk membatasi jumlah pemakaian per hari, supaya layanan gratis ini
          tetap bisa dipakai semua orang. Datanya hanya berupa hitungan harian sementara dan
          tidak disimpan permanen.
        </p>

        <h3 style={s.h3}>Statistik kunjungan</h3>
        <p style={s.p}>
          Kami memakai Vercel Web Analytics untuk melihat statistik umum, misalnya jumlah
          pengunjung, halaman yang dibuka, negara, dan jenis perangkat. Statistik ini tidak
          memakai cookie dan tidak dipakai untuk mengenali kamu secara pribadi.
        </p>

        <h2 style={s.h2}>Tips aman untuk siswa</h2>
        <ul style={s.ul}>
          <li style={s.li}>Nama panggilan sudah cukup. Tidak perlu menyebut nama lengkap.</li>
          <li style={s.li}>Jangan tulis nomor HP, alamat rumah lengkap, atau password di chat.</li>
          <li style={s.li}>Kalau latihan bercerita tentang sekolah atau kampung halaman, cukup sebut nama kota atau kabupaten.</li>
        </ul>

        <h2 style={s.h2}>Untuk orang tua dan guru</h2>
        <div style={s.parent}>
          <p style={s.p}>
            NgobrolEng dibuat untuk pelajar Indonesia, termasuk yang masih di bawah 18 tahun.
            Karena itu kami sengaja merancangnya tanpa akun, tanpa pendaftaran, dan tanpa
            menyimpan percakapan.
          </p>
          <p style={{ ...s.p, marginBottom: 0 }}>
            Kalau NgobrolEng dipakai di sekolah, pesantren, atau yayasan, kami menyarankan pihak
            sekolah memberi tahu orang tua atau wali bahwa siswa berlatih bahasa Inggris dengan
            bantuan AI. Orang tua dan guru bisa menghubungi kami kapan saja lewat email di bawah.
          </p>
        </div>

        <h2 style={s.h2}>Yang tidak kami lakukan</h2>
        <ul style={s.ul}>
          <li style={s.li}>Tidak ada akun atau pendaftaran.</li>
          <li style={s.li}>Tidak menyimpan percakapan atau rekaman suara.</li>
          <li style={s.li}>Tidak ada iklan dan tidak ada cookie pelacak iklan.</li>
          <li style={s.li}>Tidak menjual atau menyewakan data siapa pun.</li>
        </ul>

        <h2 style={s.h2}>Layanan pihak ketiga</h2>
        <p style={s.p}>NgobrolEng memakai layanan berikut, masing-masing dengan kebijakan privasinya sendiri:</p>
        <ul style={s.ul}>
          <li style={s.li}><strong>Anthropic</strong> (AI Claude): <Ext href="https://www.anthropic.com/legal/privacy">Kebijakan Privasi Anthropic</Ext></li>
          <li style={s.li}><strong>ElevenLabs</strong> (suara AI): <Ext href="https://elevenlabs.io/privacy-policy">Kebijakan Privasi ElevenLabs</Ext></li>
          <li style={s.li}><strong>Vercel</strong> (hosting dan statistik kunjungan): <Ext href="https://vercel.com/legal/privacy-policy">Kebijakan Privasi Vercel</Ext></li>
          <li style={s.li}><strong>Google</strong> (pengenal suara di browser Chrome dan Google Fonts): <Ext href="https://policies.google.com/privacy">Kebijakan Privasi Google</Ext></li>
        </ul>

        <h2 style={s.h2}>Soal nilai latihan</h2>
        <p style={s.p}>
          Skor IELTS dan TOEFL di NgobrolEng adalah perkiraan dari AI berdasarkan rubrik resmi
          yang tersedia untuk umum. Skor ini membantu memantau kemajuan, tapi bukan hasil ujian
          resmi dan bisa berbeda dari penilaian penguji sungguhan.
        </p>

        <h2 style={s.h2}>Hak kamu</h2>
        <p style={s.p}>
          Kamu, atau orang tua dan wali kamu, berhak bertanya data apa yang kami proses dan
          meminta data itu dihapus, sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi
          dan hukum perlindungan data yang berlaku. Karena tidak ada akun dan percakapan tidak
          disimpan, biasanya hampir tidak ada data yang bisa dikaitkan dengan kamu.
        </p>

        <h2 style={s.h2}>Perubahan</h2>
        <p style={s.p}>
          Kalau nanti NgobrolEng menambahkan fitur akun atau penyimpanan progres belajar, halaman
          ini akan diperbarui lebih dulu, sebelum fitur itu diluncurkan.
        </p>

        <h2 style={s.h2}>Kontak</h2>
        <p style={s.p}>
          Pertanyaan soal privasi? Kirim email ke <strong>{EMAIL}</strong>. NgobrolEng dikelola
          oleh Donny Agustinus, London, Inggris.
        </p>
      </main>

      <footer style={s.footer}>
        <div style={s.stripe}>
          <div style={{ height: 4, flex: 1, background: C.blue }} />
          <div style={{ height: 4, flex: 1, background: C.white, border: `1px solid ${C.grayLight}`, borderLeft: 'none', borderRight: 'none' }} />
          <div style={{ height: 4, flex: 1, background: C.red }} />
        </div>
        NgobrolEng © 2026 · <a href="/" style={{ color: '#94a3b8' }}>Beranda</a>
      </footer>
    </div>
  );
}
