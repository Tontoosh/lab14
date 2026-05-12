# Lab14 Setup

## Сонгосон API

JSONPlaceholder fake REST API сонгосон.

## Brief

JSONPlaceholder нь post, comment, album, photo, todo, user зэрэг resource-уудтай fake online REST API. Энэ лабораторид `posts` resource дээр GET, POST, PUT, PATCH, DELETE болон 404 negative case шалгасан. Бичих үйлдлүүд нь бодит database-д хадгалагдахгүй, гэхдээ API contract-ийн дагуу response буцаадаг тул integration/API test-ийн дадлагад тохиромжтой.

## Base URL

```text
https://jsonplaceholder.typicode.com
```

Postman environment variable:

```text
baseUrl=https://jsonplaceholder.typicode.com
```

## Auth

Auth шаардлагагүй. Token, API key, secret байхгүй.

## Эхний request

```http
GET {{baseUrl}}/posts
```

Хүлээгдэж буй үр дүн:

```text
200 OK
Content-Type: application/json
```
