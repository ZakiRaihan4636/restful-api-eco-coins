const nilaiTukarKoinHandler = require('../handlers/nilaiTukarKoinHandler')

module.exports = [
  {
    "method": "POST",
    "path": "/nilai-tukar",
    "handler": nilaiTukarKoinHandler.createNilaiTukarKoin
  },
  {
    "method": "GET",
    "path": "/nilai-tukar",
    "handler": nilaiTukarKoinHandler.getAllNilaiTukarKoin
  },
]