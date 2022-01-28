# Post API Documentation

## Endpoints:

- `POST /user/register/seller`
- `POST /user/register/customer`
- `POST /user/login`
- `GET /categories`
- `GET /bookmark`
- `POST /bookmark`
- `DELETE /bookmark`
- `GET /`
- `GET /:id`
- `GET /myProduct` //belum
- `POST /`
- `DELETE /:id`

1. `POST /user/register/customer`
   key:
   username
   email
   password
   role
   phoneNumber
   address

response:
{
"id": 4,
"username": "customer",
"email": "customer1001@mail.com"
}

2. `POST /user/register/seller`
   key:
   username
   email
   password
   role
   phoneNumber
   address

response:
{
"id": 7,
"username": "seller",
"email": "seller1000@mail.com"
}

3. `POST /login`

- body:
  key:
  username: "username"
  password: "password"

response:
token: "token"

{
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzZWxsZXJAbWFpbC5jb20iLCJpYXQiOjE2NDMzMjk0ODR9.OXJOP413O5DzNlM0SxnKwWG0rnPdoS9V4HqlKhj0M3k",
"role": "Seller",
"username": "Seller"
}

4. `GET /categories`
   response:
   [
   {
   "id": 1,
   "name": "Iron 1200",
   "createdAt": "2022-01-26T03:11:43.783Z",
   "updatedAt": "2022-01-26T03:11:43.783Z"
   },
   {
   "id": 2,
   "name": "Iron 883",
   "createdAt": "2022-01-26T03:11:43.783Z",
   "updatedAt": "2022-01-26T03:11:43.783Z"
   },
   {
   "id": 3,
   "name": "Forty Eight",
   "createdAt": "2022-01-26T03:11:43.783Z",
   "updatedAt": "2022-01-26T03:11:43.783Z"
   }
   ]

5. `GET /bookmark`
   response:
   [
   {
   "UsersId": 2,
   "ProductId": 3,
   "status": "pending",
   "createdAt": "2022-01-26T06:35:29.451Z",
   "updatedAt": "2022-01-26T06:35:29.451Z",
   "Product": {
   "id": 3,
   "name": "Fourty Eight",
   "price": 600000000,
   "quantity": 3,
   "summary": "summary of Fourty Eight",
   "description": "description of Fourty Eight",
   "image1": "https://imgcdn.oto.com/medium/gallery/exterior/72/1933/harley-davidson-forty-eight-left-side-view-full-image-324856.jpg",
   "image2": "https://pbs.twimg.com/media/ElHq-aWW0AI_YsU.pnghttps://imgx.gridoto.com/crop/0x0:0x0/750x500/photo/2019/05/23/3067943827.jpg",
   "image3": "https://www.thunderbike.com/wp-content/uploads/2020/04/Steffi-Dahlke-Thunderbike-23.-April-2020-%C2%A9-Ben-Ott-32-545x364.jpg",
   "UsersId": 1,
   "CategoriesId": 3,
   "createdAt": "2022-01-26T03:11:43.971Z",
   "updatedAt": "2022-01-26T03:11:43.971Z"
   }
   }
   ]

6. `POST /bookmark`
   key:
   ProductId

response:
{
"message": "Added to your wishlist"
}

}

7. `DELETE /bookmark`
   response:
   {
   "message": "Delete Success"
   }

8. `GET /`
   response:
   {
   "count": 3,
   "rows": [
   {
   "id": 1,
   "name": "Iron 1200",
   "price": 400000000,
   "quantity": 5,
   "summary": "summary of iron 1200",
   "description": "description of iron 1200",
   "image1": "https://imgcdnblog.carbay.com/wp-content/uploads/2019/05/02071551/harley-iron-1200-sportster-1.jpg",
   "image2": "https://imgx.gridoto.com/crop/0x0:0x0/750x500/photo/2019/05/23/3067943827.jpg",
   "image3": "https://i.ytimg.com/vi/r_ZX_6zF_z0/maxresdefault.jpg",
   "UsersId": 1,
   "CategoriesId": 1,
   "createdAt": "2022-01-26T03:11:43.971Z",
   "updatedAt": "2022-01-26T03:11:43.971Z",
   "Category": {
   "id": 1,
   "name": "Iron 1200",
   "createdAt": "2022-01-26T03:11:43.783Z",
   "updatedAt": "2022-01-26T03:11:43.783Z"
   }
   },
   {
   "id": 2,
   "name": "Iron 883 ",
   "price": 500000000,
   "quantity": 4,
   "summary": "summary of iron 883",
   "description": "description of iron 883",
   "image1": "https://imgcdn.oto.com/medium/gallery/exterior/72/1925/harley-davidson-iron-883-13789.jpg",
   "image2": "https://media.zigcdn.com/media/model/2018/Oct/right-side-view-671325840_600x400.jpg",
   "image3": "https://images.tokopedia.net/img/cache/500-square/hDjmkQ/2021/9/21/e399f417-1476-4d76-9b54-b6da0d1345fc.jpg",
   "UsersId": 1,
   "CategoriesId": 2,
   "createdAt": "2022-01-26T03:11:43.971Z",
   "updatedAt": "2022-01-26T03:11:43.971Z",
   "Category": {
   "id": 2,
   "name": "Iron 883",
   "createdAt": "2022-01-26T03:11:43.783Z",
   "updatedAt": "2022-01-26T03:11:43.783Z"
   }
   },
   {
   "id": 3,
   "name": "Fourty Eight",
   "price": 600000000,
   "quantity": 3,
   "summary": "summary of Fourty Eight",
   "description": "description of Fourty Eight",
   "image1": "https://imgcdn.oto.com/medium/gallery/exterior/72/1933/harley-davidson-forty-eight-left-side-view-full-image-324856.jpg",
   "image2": "https://pbs.twimg.com/media/ElHq-aWW0AI_YsU.pnghttps://imgx.gridoto.com/crop/0x0:0x0/750x500/photo/2019/05/23/3067943827.jpg",
   "image3": "https://www.thunderbike.com/wp-content/uploads/2020/04/Steffi-Dahlke-Thunderbike-23.-April-2020-%C2%A9-Ben-Ott-32-545x364.jpg",
   "UsersId": 1,
   "CategoriesId": 3,
   "createdAt": "2022-01-26T03:11:43.971Z",
   "updatedAt": "2022-01-26T03:11:43.971Z",
   "Category": {
   "id": 3,
   "name": "Forty Eight",
   "createdAt": "2022-01-26T03:11:43.783Z",
   "updatedAt": "2022-01-26T03:11:43.783Z"
   }
   }
   ]
   }

9. `GET /:id`
   response:
   {
   "id": 1,
   "name": "Iron 1200",
   "price": 400000000,
   "quantity": 5,
   "summary": "summary of iron 1200",
   "description": "description of iron 1200",
   "image1": "https://imgcdnblog.carbay.com/wp-content/uploads/2019/05/02071551/harley-iron-1200-sportster-1.jpg",
   "image2": "https://imgx.gridoto.com/crop/0x0:0x0/750x500/photo/2019/05/23/3067943827.jpg",
   "image3": "https://i.ytimg.com/vi/r_ZX_6zF_z0/maxresdefault.jpg",
   "UsersId": 1,
   "CategoriesId": 1,
   "createdAt": "2022-01-26T03:11:43.971Z",
   "updatedAt": "2022-01-26T03:11:43.971Z",
   "Category": {
   "id": 1,
   "name": "Iron 1200",
   "createdAt": "2022-01-26T03:11:43.783Z",
   "updatedAt": "2022-01-26T03:11:43.783Z"
   },
   "User": {
   "id": 1,
   "username": "Seller",
   "email": "seller@mail.com",
   "password": "$2b$08$2BNfYY2kdJnU1xd8OvNi.eXsrjZDAIDSpc2qs6B2NQNc6Spy0B0Wq",
   "role": "Seller",
   "phoneNumber": "12345",
   "address": "address",
   "createdAt": "2022-01-26T03:11:43.942Z",
   "updatedAt": "2022-01-26T03:11:43.942Z"
   }
   }

10. `GET /seller/myProduct`
    response:
    [
    {
    "id": 1,
    "name": "Iron 1200",
    "price": 400000000,
    "quantity": 5,
    "summary": "summary of iron 1200",
    "description": "description of iron 1200",
    "image1": "https://imgcdnblog.carbay.com/wp-content/uploads/2019/05/02071551/harley-iron-1200-sportster-1.jpg",
    "image2": "https://imgx.gridoto.com/crop/0x0:0x0/750x500/photo/2019/05/23/3067943827.jpg",
    "image3": "https://i.ytimg.com/vi/r_ZX_6zF_z0/maxresdefault.jpg",
    "UsersId": 1,
    "CategoriesId": 1,
    "createdAt": "2022-01-26T03:11:43.971Z",
    "updatedAt": "2022-01-26T03:11:43.971Z"
    },
    {
    "id": 2,
    "name": "Iron 883 ",
    "price": 500000000,
    "quantity": 4,
    "summary": "summary of iron 883",
    "description": "description of iron 883",
    "image1": "https://imgcdn.oto.com/medium/gallery/exterior/72/1925/harley-davidson-iron-883-13789.jpg",
    "image2": "https://media.zigcdn.com/media/model/2018/Oct/right-side-view-671325840_600x400.jpg",
    "image3": "https://images.tokopedia.net/img/cache/500-square/hDjmkQ/2021/9/21/e399f417-1476-4d76-9b54-b6da0d1345fc.jpg",
    "UsersId": 1,
    "CategoriesId": 2,
    "createdAt": "2022-01-26T03:11:43.971Z",
    "updatedAt": "2022-01-26T03:11:43.971Z"
    },
    {
    "id": 3,
    "name": "Fourty Eight",
    "price": 600000000,
    "quantity": 3,
    "summary": "summary of Fourty Eight",
    "description": "description of Fourty Eight",
    "image1": "https://imgcdn.oto.com/medium/gallery/exterior/72/1933/harley-davidson-forty-eight-left-side-view-full-image-324856.jpg",
    "image2": "https://pbs.twimg.com/media/ElHq-aWW0AI_YsU.pnghttps://imgx.gridoto.com/crop/0x0:0x0/750x500/photo/2019/05/23/3067943827.jpg",
    "image3": "https://www.thunderbike.com/wp-content/uploads/2020/04/Steffi-Dahlke-Thunderbike-23.-April-2020-%C2%A9-Ben-Ott-32-545x364.jpg",
    "UsersId": 1,
    "CategoriesId": 3,
    "createdAt": "2022-01-26T03:11:43.971Z",
    "updatedAt": "2022-01-26T03:11:43.971Z"
    }
    ]

11. `POST /`
    key:
    name
    description
    price
    quantity
    summart
    ProductImage
    ProductImage
    ProductImage
    CategoriesId

response:
{
"id": 10,
"name": "tes",
"description": "tes",
"price": 100,
"quantity": 1,
"summary": "1",
"image1": "https://ik.imagekit.io/9pznzq7ajlx/orginalname_R1SRhpAl0.jpg",
"image2": null,
"image3": null,
"UsersId": 1,
"CategoriesId": 1,
"updatedAt": "2022-01-28T00:52:19.947Z",
"createdAt": "2022-01-28T00:52:19.947Z"
}

12. `DELETE /:id`
    response:
    {
    "message": "Delete Success"
    }
