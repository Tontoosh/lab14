# Хийсэн ажлын тайлбар

Энэ repository-д F.CSM311 Бие даалт 14-ийн API testing ажлыг хийсэн. Эхэндээ public API ашигласан байсан ч дараа нь хэрэглэгчийн заасан Lab11 project дээр суурилуулж өөрчилсөн.

## Ашигласан server

Энэ ажилд test хийж байгаа server нь:

```text
server/index.js
```

Энэ нь Lab11-ийн Tic Tac Toe logic дээр суурилсан local Express REST API. Server дараах хаяг дээр ажиллана:

```text
http://localhost:3014
```

## API endpoint-үүд

Дараах endpoint-үүдийг хийсэн:

```text
GET    /health
POST   /games
GET    /games/:id
POST   /games/:id/moves
PUT    /games/:id/reset
DELETE /games/:id
GET    /not-found
```

Мөн алдаатай request үед:

```text
400 Bad Request
404 Not Found
409 Conflict
```

буцаахаар server дээр validation хийсэн.

## Postman Collection

`postman/collection.json` файлд нийт 9 request үүсгэсэн.

Request-үүд:

1. `GET /health` - server ажиллаж байгаа эсэх
2. `POST /games` - шинэ Tic Tac Toe game үүсгэх
3. `GET /games/{{gameId}}` - өмнөх response-оос авсан id ашиглах chained request
4. `POST /games/{{gameId}}/moves` - move хийх
5. `PUT /games/{{gameId}}/reset` - game reset хийх
6. `POST /games/{{gameId}}/moves` - буруу coordinate явуулж 400 шалгах
7. `DELETE /games/{{gameId}}` - game устгах
8. `POST /games/missing-game/moves` - байхгүй game дээр 404 шалгах
9. `GET /not-found` - байхгүй route дээр 404 шалгах

Бүх URL дээр `{{baseUrl}}` environment variable ашигласан.

## Test Script

Collection дотор нийт 30 assertion бичсэн.

Шалгасан assertion-ууд:

- Status code
- Response time
- Content-Type header
- JSON body structure
- Data type
- Business rule
- Negative 400/404 response

`POST create game` request дээр pre-request script ашиглаж random `gameName` үүсгэсэн.

## Environment

Дараах environment файлуудыг үүсгэсэн:

```text
postman/env.dev.json
postman/env.ci.json
```

Эдгээрт `baseUrl`, `gameId`, `gameName` variable-ууд байгаа.

## Newman

Local test ажиллуулахын өмнө server асаана:

```bash
npm start
```

Дараа нь өөр terminal дээр:

```bash
npm run test:api
```

HTML report үүсгэх:

```bash
npm run report:api
```

Newman run хийж шалгахад:

```text
9 requests
30 assertions
0 failed
```

гэсэн үр дүн гарсан.

## Report

`reports/api.html` файлд Newman HTML report үүсгэсэн.

## GitHub Actions

`.github/workflows/api-tests.yml` файлд CI workflow бичсэн. Энэ workflow нь dependency суулгаж, local API server асаагаад Newman тест ажиллуулж, report-ыг artifact болгон хадгална.

## Reflection ба README

`README.md` файлд project-ийг хэрхэн ажиллуулах заавар бичсэн.

`REFLECTION.md` файлд даалгаварт шаардсан 5 асуултын хариултыг бичсэн.
