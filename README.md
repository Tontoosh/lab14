# Bie Daalt 14 - API Testing

F.CSM311 Lab14: Postman collection + Newman CI.

## API

Сонгосон хувилбар: Хувилбар 2 - Бие даалт 11-ийн API-г дахин ашиглах.

Энэ project-д Lab11 Tic Tac Toe logic дээр суурилсан local Express REST API байгаа:

```text
server/index.js
```

Base URL:

```text
http://localhost:3014
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
server/index.js
README.md
REFLECTION.md
TAILBAR.md
```

## Requests

Collection дотор нийт 9 request байгаа:

1. `GET /health`
2. `POST /games`
3. `GET /games/{{gameId}}`
4. `POST /games/{{gameId}}/moves`
5. `PUT /games/{{gameId}}/reset`
6. `POST /games/{{gameId}}/moves` invalid payload буюу 400 negative test
7. `DELETE /games/{{gameId}}`
8. `POST /games/missing-game/moves` буюу 404 negative test
9. `GET /not-found` буюу unknown route 404 test

## Local run

Dependencies суулгах:

```bash
npm install
```

API server асаах:

```bash
npm start
```

Өөр terminal дээр Newman test ажиллуулах:

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

Workflow нь `push` болон `pull_request` дээр dependency суулгаж, local API server асаагаад Newman тест ажиллуулна. Дараа нь `reports/` хавтсыг artifact болгон upload хийнэ.

## Secret handling

Энэ API auth шаарддаггүй тул real token commit хийгдээгүй. Хэрэв token-той API сонговол `env.dev.json` болон `env.ci.json` дотор real утга хадгалахгүй, GitHub Secrets ашиглана.
