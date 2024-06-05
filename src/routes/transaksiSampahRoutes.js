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
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    method: 'GET',
    path: '/transaksi-sampah/pengepul/{id_pengepul}',
    handler: transaksiSampahHandler.getAllTransaksiSampahByPengepulId,
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    method: 'GET',
    path: '/transaksi-sampah/pengguna/{id_pengguna}',
    handler: transaksiSampahHandler.getAllTransakasiSampahByPenggunaId,
    options: {
      pre: [verifyRole('pengguna')]
    }
  },
  {
    method: 'GET',
    path: '/transaksi-sampah/pengguna/{id_pengguna}/status/pending',
    handler: transaksiSampahHandler.getAllTransakasiPenggunaByStatusPending,
    options: {
      pre: [verifyRole('pengguna')]
    }
  },
  {
    method: 'GET',
    path: '/transaksi-sampah/riwayat/pengguna/{id_pengguna}',
    handler: transaksiSampahHandler.getALlRiwayatTraksaksiByIdPengguna,
    options: {
      pre: [verifyRole('pengguna')]
    }
  },
  {
    method: 'GET',
    path: '/transaksi-sampah/riwayat/pengepul/{id_pengepul}',
    handler: transaksiSampahHandler.getALlRiwayatTraksaksiByIdPengepul,
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    method: 'GET',
    path: '/transaksi-sampah/{id}',
    handler: transaksiSampahHandler.getTransaksiSampahById,
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    method: 'PUT',
    path: '/transaksi-sampah/{id}',
    handler: transaksiSampahHandler.updateTransaksiSampah,
    options: {
      pre: [verifyRole('pengguna')]
    }
  },
  {
    method: 'DELETE',
    path: '/transaksi-sampah/{id}',
    handler: transaksiSampahHandler.deleteTransaksiSampah,
    options: {
      pre: [verifyRole('pengguna')]
    }
  },
  {
    method: 'POST',
    path: '/transaksi-sampah/{id_transaksi}/verify',
    handler: transaksiSampahHandler.verifyTransactionByPengepul,
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    method: 'POST',
    path: '/transaksi-sampah/{id_transaksi}/reject',
    handler: transaksiSampahHandler.rejectTransactionByPengepul,
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
];