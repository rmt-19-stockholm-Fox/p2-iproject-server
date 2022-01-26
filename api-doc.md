## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /travel`
- `GET /travel/:id`

Routes below need authentication & authorization for Admin:

- `POST /travel`
- `POST /events/:travelPostId`
- `GET /events/:travelPostId`

Routes below need authentication & authorization for Customer:

- `POST /bookings/:postId`
- `GET /bookings`
- `POST /midtrans`

&nbsp;

## 1. POST /register

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "email": "user@hacktiv.com",
    "role": "customer"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "Wrong email format"
}
OR
{
    "message": "Email cannot be empty"
}
OR
{
    "message": "Password cannot be empty"
}
OR
{
    "message": "Email must be unique"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhc2RmQGFzZGYuYXNkZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0MzE4Njc5Mn0.cjJt6DzglOb2Bi7fqHh8k6r0pOv_Xn4e9dOyokalyMM",
    "email": "asdf@asdf.asdf",
    "role": "admin"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email cannot be empty"
}
OR
{
    "message": "Password cannot be empty"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /travel

Description:
- Fetch all travel post from database

Request:

- headers: 
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
```json
[
    {
        "id": 1,
        "name": "Bali",
        "summary": "Ke Bali",
        "date": "2000-12-31T17:00:00.000Z",
        "imageUrl": "https://blog.amartha.com/wp-content/uploads/2021/06/Tempat-Tinggal-Terbaik-di-Bali.jpg",
        "userId": null
    },
    {
        "id": 2,
        "name": "Bali",
        "summary": "Ke Bali",
        "date": "2000-12-31T17:00:00.000Z",
        "imageUrl": "https://blog.amartha.com/wp-content/uploads/2021/06/Tempat-Tinggal-Terbaik-di-Bali.jpg",
        "userId": null
    },
    {
        "id": 3,
        "name": "Bali",
        "summary": "Ke Bali",
        "date": "2000-12-31T17:00:00.000Z",
        "imageUrl": "https://blog.amartha.com/wp-content/uploads/2021/06/Tempat-Tinggal-Terbaik-di-Bali.jpg",
        "userId": 1
    },
  ...,
]
```

&nbsp;

## 4. GET /travel/:id

Description:
- Get travel data with events by ID

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "id": "integer"
}
```

- body:

```json
{
    "id": 1,
    "name": "Bali",
    "summary": "Ke Bali",
    "date": "2000-12-31T17:00:00.000Z",
    "imageUrl": "https://blog.amartha.com/wp-content/uploads/2021/06/Tempat-Tinggal-Terbaik-di-Bali.jpg",
    "userId": null,
    "Events": [
        {
            "id": 7,
            "destination": "Waterbom Bali",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIck4KXNQugGTSu4sViWhTNU4cxiilHp-TzA&usqp=CAU",
            "schedule": "2022-01-25T00:00:00.000Z",
            "price": 250000,
            "travelPostId": 1,
            "createdAt": "2022-01-25T15:04:37.289Z",
            "updatedAt": "2022-01-25T15:04:37.289Z"
        },
        {
            "id": 8,
            "destination": "RIVAVI LEGIAN BALI",
            "imageUrl": "https://blog.amartha.com/wp-content/uploads/2021/06/Tempat-Tinggal-Terbaik-di-Bali.jpg",
            "schedule": "2000-12-31T17:00:00.000Z",
            "price": 195000,
            "travelPostId": 1,
            "createdAt": "2022-01-25T04:25:15.594Z",
            "updatedAt": "2022-01-25T04:25:15.594Z"
        }
    ]
}
```

_Response (201 - Created)_
```json
{
  "id": 2,
  "message": "Happy Wedding My Friend",
  "sender": "user1@mail.com",
  "amount": 500000,
  "voucherId": 1,
  "receiverId": 2,
  "status": "unclaimed"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Message is required"
}
OR
{
  "message": "Amount is required"
}
OR
{
  "message": "Sender is required"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

&nbsp;

## 5. POST /travel

Description:
- Post new travel post

Request:

- headers:
```json
{
  "access_token": "string"
}
```
- body:
{

}

_Response (201 - OK)_
```json
{
    "id": 1,
    "name": "Bali",
    "summary": "Ke Bali",
    "date": "2000-12-31T17:00:00.000Z",
    "imageUrl": "https://blog.amartha.com/wp-content/uploads/2021/06/Tempat-Tinggal-Terbaik-di-Bali.jpg",
    "userId": 1,
    "updatedAt": "2022-01-26T08:55:52.887Z",
    "createdAt": "2022-01-26T08:55:52.887Z"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "Name cannot be empty"
}
OR
{
    "message": "Summary cannot be empty"
}
OR
{
    "message": "Date cannot be empty"
}
OR
{
    "message": "ImageUrl cannot be empty"
}
```

&nbsp;

## 6. POST /events/:travelPostId

Description:
- Claim gift and update status to claimed

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "travelPostId": "integer"
}
```

_Response (201 - OK)_
```json
{
    "id": 1,
    "destination": "RIVAVI LEGIAN BALI",
    "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBcVFRUXGBcaHCIeGxsaHB0bGxweHRwdGyAbHR0gICwkHR0pIR4bJTYlKS4wMzMzICQ5PjkxPSwyMzABCwsLEA4QHhISHjUpJCkyMjIyMjIyMjI0MjIyMjIyNDIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAL",
    "schedule": "2000-12-31T17:00:00.000Z",
    "price": 195000,
    "travelPostId": 1,
    "updatedAt": "2022-01-26T08:59:22.107Z",
    "createdAt": "2022-01-26T08:59:22.107Z"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Data not found"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "Destination cannot be empty"
}
OR
{
    "message": "Image cannot be empty"
}
OR
{
    "message": "Price cannot be empty"
}
```

&nbsp;

## 7. GET /events/:travelPostId

Description:
- Get event by TravelPost

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "travelPostId": "integer"
}
```

_Response (200 - OK)_
```json
[
    {
        "id": 7,
        "destination": "Waterbom Bali",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIck4KXNQugGTSu4sViWhTNU4cxiilHp-TzA&usqp=CAU",
        "schedule": "2022-01-25T00:00:00.000Z",
        "price": 250000,
        "travelPostId": 1,
        "createdAt": "2022-01-25T15:04:37.289Z",
        "updatedAt": "2022-01-25T15:04:37.289Z"
    },
    {
        "id": 8,
        "destination": "RIVAVI LEGIAN BALI",
        "imageUrl": "https://blog.amartha.com/wp-content/uploads/2021/06/Tempat-Tinggal-Terbaik-di-Bali.jpg",
        "schedule": "2000-12-31T17:00:00.000Z",
        "price": 195000,
        "travelPostId": 1,
        "createdAt": "2022-01-25T04:25:15.594Z",
        "updatedAt": "2022-01-25T04:25:15.594Z"
    },
    {
        "id": 29,
        "destination": "test",
        "imageUrl": "asdf",
        "schedule": "2022-01-26T00:00:00.000Z",
        "price": 1111,
        "travelPostId": 1,
        "createdAt": "2022-01-26T07:18:27.306Z",
        "updatedAt": "2022-01-26T07:18:27.306Z"
    },
    {
        "id": 30,
        "destination": "RIVAVI LEGIAN BALI",
        "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBcVFRUXGBcaHCIeGxsaHB0bGxweHRwdGyAbHR0gICwkHR0pIR4bJTYlKS4wMzMzICQ5PjkxPSwyMzABCwsLEA4QHhISHjUpJCkyMjIyMjIyMjI0MjIyMjIyNDIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAL",
        "schedule": "2000-12-31T17:00:00.000Z",
        "price": 195000,
        "travelPostId": 1,
        "createdAt": "2022-01-26T08:59:22.107Z",
        "updatedAt": "2022-01-26T08:59:22.107Z"
    },
    {
        "id": 31,
        "destination": "RIVAVI LEGIAN BALI",
        "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBcVFRUXGBcaHCIeGxsaHB0bGxweHRwdGyAbHR0gICwkHR0pIR4bJTYlKS4wMzMzICQ5PjkxPSwyMzABCwsLEA4QHhISHjUpJCkyMjIyMjIyMjI0MjIyMjIyNDIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAL",
        "schedule": "2000-12-31T17:00:00.000Z",
        "price": 195000,
        "travelPostId": 1,
        "createdAt": "2022-01-26T08:59:54.761Z",
        "updatedAt": "2022-01-26T08:59:54.761Z"
    }
]
```

_Response (404 - Not Found)_
```json
{
    "message": "Data not found"
}
```


&nbsp;

## 8. POST /bookings/:postId

Description:
- Post booking for customer

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "travelPostId": "integer"
}
```

_Response (200 - OK)_
```json
{
    "id": 1,
    "userId": 2,
    "postId": 1,
    "updatedAt": "2022-01-26T09:06:56.897Z",
    "createdAt": "2022-01-26T09:06:56.897Z"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Data not found"
}
```


&nbsp;

## 9. GET /bookings

Description:
- Get Booking list

Request:

- headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
```json
[
    {
        "id": 31,
        "userId": 2,
        "postId": 1,
        "User": {
            "id": 2,
            "email": "jovan@gmail.com",
            "role": "customer"
        },
        "TravelPost": {
            "id": 1,
            "name": "Bali",
            "summary": "Ke Bali",
            "date": "2000-12-31T17:00:00.000Z",
            "imageUrl": "https://blog.amartha.com/wp-content/uploads/2021/06/Tempat-Tinggal-Terbaik-di-Bali.jpg",
            "userId": null
        }
    },
    {
        "id": 32,
        "userId": 2,
        "postId": 1,
        "User": {
            "id": 2,
            "email": "jovan@gmail.com",
            "role": "customer"
        },
        "TravelPost": {
            "id": 1,
            "name": "Bali",
            "summary": "Ke Bali",
            "date": "2000-12-31T17:00:00.000Z",
            "imageUrl": "https://blog.amartha.com/wp-content/uploads/2021/06/Tempat-Tinggal-Terbaik-di-Bali.jpg",
            "userId": null
        }
    }
]
```

_Response (404 - Not Found)_
```json
{
    "message": "Data not found"
}
```


&nbsp;

## Global Error

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_
```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```