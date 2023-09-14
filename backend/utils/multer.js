import multer from "multer";

// Konfigurasi penyimpanan untuk file gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Menyimpan file di folder 'uploads'
  },
  filename: (req, file, cb) => {
    // Nama file akan menjadi timestamp + nama asli file
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Inisialisasi multer dengan konfigurasi penyimpanan
const upload = multer({ storage });

export { upload };