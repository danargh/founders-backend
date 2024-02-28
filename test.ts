console.log(new Date(1709112389685));
console.log(new Date());
// Mendapatkan waktu UTC saat ini
var utcDate = new Date();

// Mengonversi waktu UTC ke WIB
const wibDate = utcDate.setHours(utcDate.getHours() + 7); // Menambahkan 7 jam untuk mengonversi dari UTC menjadi WIB

console.log(wibDate);
