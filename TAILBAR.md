# Хийсэн ажлын тайлбар

Энэ repository-д F.CSM311 Бие даалт 14-ийн API testing ажлыг хийсэн. Даалгаврын PDF-ийг уншаад token шаарддаггүй, CI дээр тогтвортой ажиллах боломжтой JSONPlaceholder public API-г сонгосон.

## Сонгосон API

Сонгосон API:

```text
https://jsonplaceholder.typicode.com
```

Auth шаардлагагүй тул API key, token, secret commit хийгдээгүй.

## Part A

`partA/SETUP.md` файлд сонгосон API, base URL, auth шаардлага, эхний request-ийн мэдээллийг бичсэн.

`partA/screenshot.png` файлд `GET {{baseUrl}}/posts` request амжилттай `200 OK` буцаасан байдлыг харуулсан screenshot хийсэн.

## Postman Collection

`postman/collection.json` файлд нийт 8 request үүсгэсэн.

Request-үүд:

1. `GET /posts` - post list авах
2. `GET /posts/{{firstPostId}}` - өмнөх response-оос авсан id ашиглах chained request
3. `GET /posts/1` - id-аар нэг post авах
4. `POST /posts` - шинэ post үүсгэх
5. `PUT /posts/1` - post бүтнээр update хийх
6. `PATCH /posts/1` - title хэсгийг update хийх
7. `DELETE /posts/1` - post устгах
8. `GET /posts/999999` - байхгүй id шалгах negative test

Бүх URL дээр hardcode base URL ашиглаагүй, `{{baseUrl}}` environment variable ашигласан.

## Test Script

Collection дотор нийт 25 assertion бичсэн.

Шалгасан assertion-ууд:

- Status code
- Response time
- Content-Type header
- JSON body structure
- Data type
- Business rule
- Negative 404 response

Мөн `POST create post` request дээр pre-request script ашиглаж random title болон body үүсгэсэн.

## Environment

Дараах environment файлуудыг үүсгэсэн:

```text
postman/env.dev.json
postman/env.ci.json
```

Эдгээрт `baseUrl`, `firstPostId`, `postId`, `randomTitle`, `randomBody` variable-ууд байгаа.

## Newman

Newman ажиллуулахын тулд `package.json` файл үүсгэсэн.

Local test ажиллуулах command:

```bash
npm run test:api
```

HTML report үүсгэх command:

```bash
npm run report:api
```

Newman run хийж шалгахад:

```text
8 requests
25 assertions
0 failed
```

гэсэн үр дүн гарсан.

## Report

`reports/api.html` файлд Newman HTML report үүсгэсэн.

## GitHub Actions

`.github/workflows/api-tests.yml` файлд CI workflow бичсэн. Энэ workflow нь `push` болон `pull_request` дээр Newman тест ажиллуулж, report-ыг artifact болгон хадгална.

## Reflection ба README

`README.md` файлд project-ийг хэрхэн ажиллуулах заавар бичсэн.

`REFLECTION.md` файлд даалгаварт шаардсан 5 асуултын хариултыг бичсэн.

## Git

Repository-г `git init` хийж `main` branch дээр initial commit үүсгэсэн.

Commit:

```text
6b4811e Add Lab14 API testing project
```

Анхаарах зүйл: даалгаварт 8 commit, 3 өөр өдөр гэсэн шаардлага байгаа. Одоогоор нэг commit байгаа тул GitHub дээр үргэлжлүүлж commit history-гээ шаардлагад нийцүүлэх хэрэгтэй.
