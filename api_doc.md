# InstaFood API Documentation

## Endpoints:

List of available endpoints:

- `GET /users/:id`
- `POST /login-google`
- `POST /user`
- `GET /posts`
- `POST /posts`
- `DELETE /posts/:id`
- `GET /places/photo`
- `GET /places/:id`
- `GET /places`

### 1. GET /users/:id

Getting specific user by id.

**Request**

_Params_
```json
{
  "id": "integer (required)"
}
```

**Responses**

_Response 200 - OK_
```json
{
	"name": "Anonymous User",
	"email": "user@mail.com"
}
```

### 2. POST /login-google

Signing in using google account.

_Body_
```json
{
  "token": "string"
}
```

**Responses**

_Response 200 - OK_
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQxMjU3Njc3fQ.kVmOv8ZDKDfyJklPIqrIPER4gMy4nNa9rlilFnJF6-I"
}
```

### 3. POST /user

Getting user data based on access_token.

_Headers_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxMjcwNDMwfQ.EpaOTmbHDYRuW1ytTXvuMA22OcCOaeulPf88Asq4u9s"
}
```

**Responses**

_Response 200 - OK_
```json
{
  "id": 1,
  "name": "Anonymous User",
  "email": "user@mail.com",
  "pictureUrl": "https://certain-host.com/image.jpg"
}
```

### 4. GET /posts

Getting list of posts.

**Request**

_Query_
```json
{
  "userId": "integer (optional)",
  "placeId": "string (optional)",
  "excludeUser": "boolean (optional)" 
}
```

**Responses**

_Response 200 - OK_
```json
[
	{
		"id": 1,
		"content": "Hujan-hujan pesen Bakmi GM pas banget...",
		"UserId": 1,
		"imageUrls": "https://storage.googleapis.com/instafood/posts/2/img-1.jpeg",
		"placeName": "Bakmi GM Gambir Station",
		"placeId": "ChIJDW5llabcde4RFLrze23vzSw",
		"createdAt": "2022-01-27T02:21:33.872Z",
		"updatedAt": "2022-01-27T02:21:35.163Z",
		"User": {
			"id": 1,
			"name": "Anonymous User"
		}
	},
	{
		"id": 2,
		"content": "Selalu pesen bebek muda 1/2 ekor, sambelnya enak pedes...",
		"UserId": 1,
		"imageUrls": "https://storage.googleapis.com/instafood/posts/1/img-1.jpeg",
		"placeName": "Bebek Kaleyo Kemanggisan",
		"placeId": "ChIJb1b-j0L3aS4RUT12345HYhM",
		"createdAt": "2022-01-27T01:50:43.046Z",
		"updatedAt": "2022-01-27T01:50:44.562Z",
		"User": {
			"id": 2,
			"name": "Another Anonymous User"
		}
	}
]
```

### 5. POST /posts

Creating new post.

**Request**

_Headers_
```json
{
  "content-type": "multipart/form-data",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxMjcwNDMwfQ.EpaOTmbHDYRuW1ytTXvuMA22OcCOaeulPf88Asq4u9s"
}
```

_Body_
```json
{
  "content": "string",
  "place_name": "string",
  "place_id": "string",
  "images": "files"
}
```

**Responses**

_Response 201 - Created_
```json
{
	"id": 1,
	"images": [
		"https://storage.googleapis.com/instafood/posts/6/img-1.png"
	],
	"createdAt": "2022-01-27T03:25:48.956Z"
}
```

### 6. DELETE /posts/:id

Deleting specific post by id.

**Request**

_Headers_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxMjcwNDMwfQ.EpaOTmbHDYRuW1ytTXvuMA22OcCOaeulPf88Asq4u9s"
}
```

_Params_
```json
{
  "id": "integer (required)"
}
```

**Responses**

_Response 200 - OK_
```json
{
  "message": "post has been deleted"
}
```

### 7. GET /places/photo

Accessing a photo of place using photo_reference provided by Google Places API.

**Request**

_Query_
```json
{
  "ref": "string (required)"
}
```

**Responses**

_Response 200 - OK_

Response body contains binary data of image.

### 8. GET /places/:id

Getting specific place detail by id.

**Request**

_Params_
```json
{
  "id": "string (required)"
}
```

**Responses**

_Response 200 - OK_
```json
{
	"formatted_address": "16, Jl. Denpasar Raya No.109, RT.16/RW.4...",
	"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
	"name": "Warung Tenda Biru",
	"photos": [
		{
			"height": 1080,
			"html_attributions": [
				"<a href=\"https://maps.google.com/maps/contrib/103401590865745977740\">Someone</a>"
			],
			"photo_reference": "Aap_uEBLO7SdLaWXC7x1WOxNnV5-4Yy2vsByS-VikkreR8LnwvlkJXsOGrRV17sz8l7iV4yumXClVn-jTqEJbQKQE_2MzrMBGZe1lYyZBscuirvB0Y9xJ8yJLU4zTxhgdhps3oNqtuDMJD6BbsuwPo8Gwi_DHVnC0L4hML12345_a_R7szu0",
			"width": 1080
		}
	]
}
```

### 9. GET /places

Searching places with query.

**Request**

_Query_
```json
{
  "name": "string (required)",
  "location": "string (optional)"
}
```

**Responses**

_Response 200 - OK_
```json
[
	{
		"business_status": "OPERATIONAL",
		"formatted_address": "Jl. Batu Ceper No.7, RT.15/RW.1, Kb. Klp...",
		"geometry": {
			"location": {
				"lat": -6.162839600000001,
				"lng": 106.8204787
			},
			"viewport": {
				"northeast": {
					"lat": -6.161563570107278,
					"lng": 106.8218411798927
				},
				"southwest": {
					"lat": -6.164263229892722,
					"lng": 106.8191415201073
				}
			}
		},
		"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
		"icon_background_color": "#FF9E67",
		"icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
		"name": "Warung Entjiem Lauw'Tan",
		"opening_hours": {
			"open_now": true
		},
		"photos": [
			{
				"height": 2268,
				"html_attributions": [
					"<a href=\"https://maps.google.com/maps/contrib/105395300232625103081\">Hady Widjaja</a>"
				],
				"photo_reference": "Aap_uEC_uOv8Ssj505AJs3TZsm9s23r24Sw4hD_7GRDCnqvhlN_jy1Tc4VXH64XxiadSeN7yfgbenn2w3A_zcUwwG5kgP9iLHT50w0-vToz6O_nN2N6-7555jXa2-cemfbSY66iDx0TFfnffztv4nV71jLakj4ZlQeBOKcA1EXei7ecqYtOt",
				"width": 4032
			}
		],
		"place_id": "ChIJf8c2Utn1aS4R6WMdwincVW0",
		"plus_code": {
			"compound_code": "RRPC+V5 Kebon Kelapa, Central Jakarta City, Jakarta, Indonesia",
			"global_code": "6P58RRPC+V5"
		},
		"rating": 4.3,
		"reference": "ChIJf8c2Utn1aS4R6WMdwincVW0",
		"types": [
			"cafe",
			"restaurant",
			"food",
			"point_of_interest",
			"establishment"
		],
		"user_ratings_total": 657
	}
]
```

## Global Error

_Response 401 - Unauthorized_
```json
{
  "message": "invalid identification token"
}
```

_Response 403 - Forbidden_
```json
{
  "message": "access is not allowed"
}
```

_Response 404 - Not Found_
```json
{
  "message": "targeted resource does not exist"
}
```

_Response 500 - Internal Server Error_
```json
{
  "message": "internal server error"
}
```
