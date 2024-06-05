## Eco Coin API Documentation
### Base URL
http://localhost:9000

---
### Endpoints

#### Enddpoint User

##### add New User
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


##### Login User
> Login user 
- URL: <span style="color:orange">/login</span>
- Method: POST
- Headers: 
 - <span style="color:orange">Content Type: Application/json</span>
- Body: 
 - JSON: <span style="color:orange">{"email": string, "password": string}</span>

- Response:

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9wZW5nZ3VuYSI6MSwiaWF0IjoxNzE2ODk3OTAyLCJleHAiOjE3MTY5MDE1MDJ9.aTJ4_1PWJBMWTFVAmJ0wgcg-h9s5LusFIcsUzrbtzjg"
}
```

##### Get Data users by id
> mendapatkan data user berdasarkan user id
- URL: <span style="color:orange">/pengguna/{id_pengguna}</span>
- Method: GET
- Headers: 
 - <span style="color:orange">Content Type: Application/json</span>
 - <span style="color:orange">Bearer token</span>
- Response:

```
{
	"id_pengguna": 1,
	"nama": "Zaki2",
	"alamat": "Bogor kecamatan Leuwiliang",
	"email": "zaki2s22@gmail.com",
	"telepon": "085718805922",
	"password": "$2b$10$lKrpMSlErVpzWA4MpVDCWOzinNLmcGZvfDB4oJK.UWSr5i1Sj1EN.",
	"saldo_koin": 0
}
```

##### Add Transaction waste
> menambahkan transaksi sampah dengan pengepul
- URL: <span style="color:orange">/transaksi-sampah</span>
- Method: POST
- Headers: 
 - <span style="color:orange">Content Type: Application/json</span>
 -  <span style="color:orange">Bearer token</span>
- Body: 
 - JSON: <span style="color:orange">{"id_pengguna": integer, "id_sampah": integer, "id_pengepul": integer, "berat_kg": integer, "tanggal": DATE}</span>

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

##### update Transaction waste
##### delete Transaction waste


##### Get all data transactions by users
> mendapatkan data transaksi berdasarkan id user
- URL: <span style="color:orange">/transaksi-sampah/pengguna/{id_pengguna}</span>
- Method: GET
- Headers: 
 - <span style="color:orange">Content Type: Application/json</span>
 -  <span style="color:orange">Bearer token</span>
- Response:
```
 [
	{
		"id_transaksi": 1,
		"id_pengguna": 1,
		"id_sampah": 1,
		"id_pengepul": 1,
		"berat_kg": 1000,
		"tanggal": "2024-05-28T11:47:28.000Z",
		"jumlah_koin": 20000,
		"status": "diterima",
		"Sampah": {
			"jenis_sampah": "plastik",
			"nilai_koin_per_kg": 20
		},
		"Pengepul": {
			"nama": "Pengepul 2"
		}
	}
]
```



##### Get all data transactions by status pending
> mendapatkan data transaksi berdasarkan id user dan status pending
- URL: <span style="color:orange">/transaksi-sampah/pengguna/{id_pengguna}/status/pending</span>
- Method: GET
- Headers: 
 - <span style="color:orange">Content Type: Application/json</span>
 -  <span style="color:orange">Bearer token</span>
- Response:
```
{
	"status": "success",
	"message": "data berhasil di dapatkan",
	"data": [
		{
			"id_transaksi": 2,
			"id_pengguna": 1,
			"id_sampah": 1,
			"id_pengepul": 1,
			"berat_kg": 1000,
			"tanggal": "2024-05-29T08:26:21.000Z",
			"jumlah_koin": 20000,
			"status": "pending",
			"Sampah": {
				"jenis_sampah": "plastik",
				"nilai_koin_per_kg": 20
			},
			"Pengepul": {
				"nama": "Pengepul 2"
			}
		}
	]
}
```

##### gett all history data transactions
##### add redeem coin
##### Get all redeem coin by status pending
##### get all history redeem coin

#### Enpoints Picker

##### add New Picker
> menambahkan user picker
- URL: <span style="color:orange">/pengepul</span>
- Method: POST
- Headers: 
 - <span style="color:orange">Content Type: Application/json</span>
- Response:
- Body: 
 - JSON: <span style="color:orange">{"nama": string, "alamar": string, "email": string, "telepon": string, "password": string</span>

```
{
	"id_pengepul": 1,
	"nama": "Pengepul 2",
	"alamat": "Bogor kecamatan Leuwiliang Karacak",
	"email": "pengepul@gmail.com",
	"telepon": "08123456789",
	"password": "$2b$10$EQYiOH6cw0VrE/MNlbHKZuRnVusHQ8BV3ZILgDdtv1K.FIDB6XG16"
}
```
##### Login Picker

##### add waste category

##### add Redeem waste

##### verify transctions

##### get data Picker by Id

##### get data transaksi id

##### get data transaksi by id picker

##### get riwayat transakasi by id picker

#####  verify redeem coin


