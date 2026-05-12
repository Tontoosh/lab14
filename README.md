# Bie Daalt 14 - API Testing

F.CSM311 Lab14: Postman collection + Newman CI.

## API

Сонгосон API: JSONPlaceholder

Base URL:

```text
https://jsonplaceholder.typicode.com
```

Auth шаардлагагүй.

## Repository structure

```text
.github/workflows/api-tests.yml
partA/SETUP.md
partA/screenshot.png
postman/collection.json
postman/env.dev.json
postman/env.ci.json
reports/api.html
README.md
REFLECTION.md
```

## Requests

Collection дотор нийт 8 request байгаа:

1. Happy GET - list posts
2. GET by chained id
3. GET by id - post 1
4. POST create post
5. PUT update post
6. PATCH update title
7. DELETE post
8. Error case - missing post

## Local run

Dependencies суулгах:

```bash
npm install
```

CLI дээр тест ажиллуулах:

```bash
npm run test:api
```

HTML report үүсгэх:

```bash
npm run report:api
```

Report:

```text
reports/api.html
```

## CI

GitHub Actions workflow:

```text
.github/workflows/api-tests.yml
```

Workflow нь `push` болон `pull_request` дээр Newman ажиллуулж, `reports/` хавтсыг artifact болгон upload хийнэ.

## Secret handling

Энэ API auth шаарддаггүй тул real token commit хийгдээгүй. Хэрэв token-той API сонговол `env.dev.json` болон `env.ci.json` дотор real утга хадгалахгүй, GitHub Secrets ашиглана.
