const transaksiSampahHandler = require('../handlers/transakasiSampahHandler');
const verifyRole = require('../middlewares/verifyRole');

module.exports = [{
    method: 'POST',
    path: '/transaksi-sampah',
    handler: transaksiSampahHandler.createTransaksiSampah,
    options: {
      pre: [verifyRole('pengguna')]
    }
  },

  {
    method: 'GET',
    path: '/transaksi-sampah',
    handler: transaksiSampahHandler.getAllTransaksiSampah,
  },
  {
    method: 'GET',
    path: '/transaksi-sampah/pengepul/{id_pengepul}',
    handler: transaksiSampahHandler.getAllTransaksiSampahByPengepulId
  },
  {
    method: 'GET',
    path: '/transaksi-sampah/pengguna/{id_pengguna}',
    handler: transaksiSampahHandler.getAllTransakasiSampahByPenggunaId
  },
  {
    method: 'GET',
    path: '/transaksi-sampah/pengguna/{id_pengguna}/status/pending',
    handler: transaksiSampahHandler.getAllTransakasiPenggunaByStatusPending
  },
  {
    method: 'GET',
    path: '/transaksi-sampah/{id}',
    handler: transaksiSampahHandler.getTransaksiSampahById,
  },
  {
    method: 'PUT',
    path: '/transaksi-sampah/{id}',
    handler: transaksiSampahHandler.updateTransaksiSampah,
  },
  {
    method: 'DELETE',
    path: '/transaksi-sampah/{id}',
    handler: transaksiSampahHandler.deleteTransaksiSampah,
  },
  {
    method: 'POST',
    path: '/transaksi-sampah/{id_transaksi}/verify',
    handler: transaksiSampahHandler.verifyTransactionByPengepul,
  },
  {
    method: 'POST',
    path: '/transaksi-sampah/{id_transaksi}/reject',
    handler: transaksiSampahHandler.rejectTransactionByPengepul,
  },
];