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
    
  },
  {
    "method": "DELETE",
    "path": "/nilai-tukar/{id_nilai_tukar_koin}",
    "handler": nilaiTukarKoinHandler.deleteNilaiTukarKoin,
  },
]