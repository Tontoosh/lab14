# Lab14 Setup

## Сонгосон API

Бие даалт 11-ийн Tic Tac Toe server-ийн санаан дээр local REST API үүсгэж тестэлсэн.

## Brief

Lab11-ийн original backend нь Java + NanoHTTPD дээр `localhost:8080`-д ажилладаг Tic Tac Toe server байсан. Lab14-ийн API testing шаардлагад POST/PUT/DELETE, 400 validation, 404 not found зэрэг contract хэрэгтэй тул энэ repository дотор `server/index.js` Express API болгон бэлтгэсэн.

API нь тоглоом үүсгэх, game id-аар авах, move хийх, reset хийх, устгах, мөн алдаатай request-үүдэд 400/404 буцаах endpoint-үүдтэй.

## Base URL

```text
http://localhost:3014
```

Postman environment variable:

```text
baseUrl=http://localhost:3014
```

## Auth

Auth шаардлагагүй. Token, API key, secret байхгүй.

## Эхний request

```http
GET {{baseUrl}}/health
```

Хүлээгдэж буй үр дүн:

```text
200 OK
Content-Type: application/json
```
