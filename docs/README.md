## Eco Coin API Documentation
### Base URL
http://localhost:9000
### Endpoints
#### add New User
> menambahkan user baru
- URL: <span style="color:orange">/users</span>
- Method: POST
- Headers: 
 - <span style="color:orange">Content Type: Application/json</span>
- Body: 
 - JSON: <span style="color:orange">{"id": integer, "nama": string, "alamat": TEXT, "telepon": string, "password": string}</span>

- Response:
```
  {
    {
    "status": "success",
    "message": "user has been created successfully",
    "data": {
      "saldo_koin": 0,
      "id_pengguna": 10,
      "nama": "Zaki2",
      "alamat": "Bogor kecamatan Leuwiliang",
      "email": "zaki222@gmail.com",
      "telepon": "085718805922",
      "password": "$2b$10$MZPQLAJqjHwstrffdIL/RODvIEMlWYQhXFjdZ38CH/UNr5kK/dqtu"
    }
  }
```




