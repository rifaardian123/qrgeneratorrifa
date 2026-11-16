
// ===================================
// QR STUDIO - BULK QR GENERATOR
// ===================================

// Mengambil elemen HTML
const qrInput = document.getElementById("qrInput");
const generateBtn = document.getElementById("generateBtn");
const qrTitle = document.getElementById("qrTitle");
const qrCodeContainer = document.getElementById("qrcode");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const counter = document.getElementById("counter");

// Data QR
let qrData = [];
let currentIndex = 0;

// ===================================
// FUNGSI MEMBUAT QR CODE
// ===================================

function generateQR(text) {

    // Bersihkan QR sebelumnya
    qrCodeContainer.innerHTML = "";

    // Buat QR baru
    new QRCode(qrCodeContainer, {
        text: text,
        width: 220,
        height: 220,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Tampilkan judul
    qrTitle.textContent = text;
}

// ===================================
// TAMPILKAN QR BERDASARKAN INDEX
// ===================================

function showQR(index) {

    if (qrData.length === 0) {
        return;
    }

    // Batasi index
    if (index < 0 || index >= qrData.length) {
        return;
    }

    currentIndex = index;

    // Buat QR
    generateQR(qrData[currentIndex]);

    // Update nomor slide
    counter.textContent =
        `${currentIndex + 1} / ${qrData.length}`;

    // Atur tombol navigasi
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled =
        currentIndex === qrData.length - 1;
}

// ===================================
// GENERATE SEMUA DATA
// ===================================

generateBtn.addEventListener("click", function () {

    const inputText = qrInput.value.trim();

    if (!inputText) {
        alert("Masukkan teks terlebih dahulu!");
        return;
    }

    // Pisahkan berdasarkan baris
    qrData = inputText
        .split(/\r?\n/)
        .map(item => item.trim())
        .filter(item => item.length > 0);

    if (qrData.length === 0) {
        alert("Tidak ada data yang valid!");
        return;
    }

    // Mulai dari QR pertama
    currentIndex = 0;

    showQR(currentIndex);

});

// ===================================
// TOMBOL PREVIOUS
// ===================================

prevBtn.addEventListener("click", function () {

    if (currentIndex > 0) {
        showQR(currentIndex - 1);
    }

});

// ===================================
// TOMBOL NEXT
// ===================================

nextBtn.addEventListener("click", function () {

    if (currentIndex < qrData.length - 1) {
        showQR(currentIndex + 1);
    }

});

// ===================================
// TAMPILAN AWAL
// ===================================

counter.textContent = "0 / 0";
prevBtn.disabled = true;
nextBtn.disabled = true;

// ===================================
// FITUR RESET
// ===================================

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function () {

    // Hapus seluruh data
    qrInput.value = "";

    // Kosongkan array QR
    qrData = [];

    // Kembalikan index ke awal
    currentIndex = 0;

    // Hapus QR yang ditampilkan
    qrCodeContainer.innerHTML = "";

    // Kembalikan judul
    qrTitle.textContent = "Preview QR";

    // Reset counter
    counter.textContent = "0 / 0";

    // Nonaktifkan tombol navigasi
    prevBtn.disabled = true;
    nextBtn.disabled = true;

});
