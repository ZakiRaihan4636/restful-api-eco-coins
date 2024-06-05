const nilaiTukarKoinHandler = require('../handlers/nilaiTukarKoinHandler')
const verifyRole = require('../middlewares/verifyRole')

module.exports = [{
    "method": "POST",
    "path": "/nilai-tukar",
    "handler": nilaiTukarKoinHandler.createNilaiTukarKoin,
    "options": {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    "method": "GET",
    "path": "/nilai-tukar",
    "handler": nilaiTukarKoinHandler.getAllNilaiTukarKoin,
    "options": {
      pre: [verifyRole('pengepul'), verifyRole('pengguna'), ]
    }
  },
]