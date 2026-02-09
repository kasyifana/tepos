// Konfigurasi environment variables
// Buat file .env di root folder untuk production

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
};
