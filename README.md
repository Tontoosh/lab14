# F.CSM311 - Бие Даалт 14

## Integration & API Testing - Postman + Newman

Энэ repository нь F.CSM311 хичээлийн Бие даалт 14 буюу API testing, Postman collection, Newman CLI, GitHub Actions CI гэсэн сэдвийн дагуу хийгдсэн ажил юм.

Даалгаврын зорилго нь бодит API дээр integration/API test бичиж, request-үүдийг chain хийх, status code, response body, header, latency, business rule, negative case зэргийг автомат тестээр шалгах байсан.

## Сонгосон хувилбар

Даалгаварт 3 сонголт байсан. Энэ ажилд дараах хувилбарыг сонгосон:

```text
Хувилбар 2 - Бие даалт 11-ийн API-аа дахин ашиглах
```

Өмнөх Бие даалт 11 дээр Tic Tac Toe тоглоомын backend байсан. Тэр ажлын санаа, game logic дээр суурилж Lab14-д зориулсан REST API server-ийг `server/index.js` файлд Express ашиглан хийсэн.

## Test хийж байгаа server

API server:

```text
server/index.js
```

Server ажиллах base URL:

```text
http://localhost:3014
```

Browser дээр root URL нээвэл API-ийн товч мэдээлэл болон endpoint list харагдана:

```text
http://localhost:3014/
```

Auth шаардлагагүй. Token, API key, password зэрэг secret ашиглаагүй.

## Server дээр хийсэн зүйл

`server/index.js` файлд Lab11 Tic Tac Toe game дээр суурилсан local REST API хийсэн.

Server-ийн үндсэн боломжууд:

- API ажиллаж байгаа эсэхийг шалгах
- Шинэ Tic Tac Toe game үүсгэх
- Үүсгэсэн game-ийг id-аар авах
- Game дээр move хийх
- Game reset хийх
- Game устгах
- Буруу coordinate ирвэл 400 буцаах
- Байхгүй game эсвэл route дээр 404 буцаах
- Аль хэдийн эзлэгдсэн cell дээр move хийвэл 409 буцаах

## API endpoint-үүд

| Method | Endpoint | Тайлбар |
| --- | --- | --- |
| GET | `/` | API-ийн мэдээлэл болон endpoint list |
| GET | `/health` | Server ажиллаж байгаа эсэх |
| POST | `/games` | Шинэ game үүсгэх |
| GET | `/games/:id` | Game id-аар авах |
| POST | `/games/:id/moves` | Tic Tac Toe move хийх |
| PUT | `/games/:id/reset` | Game reset хийх |
| DELETE | `/games/:id` | Game устгах |

Жишээ create game request:

```http
POST /games
Content-Type: application/json
```

```json
{
  "name": "Lab11 Tic Tac Toe"
}
```

Жишээ move request:

```http
POST /games/:id/moves
Content-Type: application/json
```

```json
{
  "x": 0,
  "y": 0
}
```

## Postman collection

Postman collection файл:

```text
postman/collection.json
```

Collection дотор нийт 9 request байгаа.

| # | Request | Төрөл | Зорилго |
| --- | --- | --- | --- |
| 1 | `GET /health` | Happy GET | Server ажиллаж байгааг шалгах |
| 2 | `POST /games` | POST create | Шинэ game үүсгэх |
| 3 | `GET /games/{{gameId}}` | GET by id | Өмнөх response-оос авсан id ашиглах |
| 4 | `POST /games/{{gameId}}/moves` | POST action | Tic Tac Toe move хийх |
| 5 | `PUT /games/{{gameId}}/reset` | PUT update | Game reset хийх |
| 6 | `POST /games/{{gameId}}/moves` | Negative 400 | Буруу coordinate шалгах |
| 7 | `DELETE /games/{{gameId}}` | DELETE | Game устгах |
| 8 | `POST /games/missing-game/moves` | Negative 404 | Байхгүй game шалгах |
| 9 | `GET /not-found` | Negative 404 | Байхгүй route шалгах |

Бүх request дээр hardcoded full URL ашиглаагүй. `{{baseUrl}}` environment variable ашигласан.

## Chained request

`POST /games` request шинэ game үүсгээд response-оос `id` авч environment variable-д хадгалдаг.

```javascript
pm.environment.set("gameId", game.id);
```

Дараагийн request-үүд энэ утгыг ашиглана:

```text
GET /games/{{gameId}}
POST /games/{{gameId}}/moves
PUT /games/{{gameId}}/reset
DELETE /games/{{gameId}}
```

Ингэснээр collection нь нэг run хийх бүрдээ шинэ game үүсгэж, тэр game дээрээ дараагийн бүх шалгалтыг хийдэг.

## Pre-request script

`POST create game` request дээр pre-request script ашигласан. Энэ script нь test run бүрд шинэ `gameName` үүсгэнэ.

```javascript
pm.environment.set("gameName", `Lab11 game ${Date.now()}`);
```

Энэ нь тестийн Arrange хэсгийг автоматжуулж байгаа жишээ юм.

## Assertion-ууд

Collection дотор нийт:

```text
30 assertions
```

ашигласан.

Шалгасан assertion-ийн төрлүүд:

- Status code
- Response time
- Content-Type header
- JSON property/schema
- Data type
- Business rule
- Negative response буюу 400/404

Жишээ шалгалтууд:

- `GET /health` нь 200 буцаах
- Response time 1000ms-аас бага байх
- Response `Content-Type` нь JSON байх
- Game үүсэхэд `id` string байх
- Board яг 9 cell-тэй байх
- Шинэ game эхлэхдээ `currentPlayer` нь `X` байх
- Move хийсний дараа эхний cell `X` болох
- Move хийсний дараа дараагийн player `O` болох
- Буруу coordinate явуулахад 400 буцах
- Байхгүй game дээр request явуулахад 404 буцах

## Environment файлууд

Postman environment файлууд:

```text
postman/env.dev.json
postman/env.ci.json
```

Ашигласан variable-ууд:

| Variable | Утга | Тайлбар |
| --- | --- | --- |
| `baseUrl` | `http://localhost:3014` | API server-ийн base URL |
| `gameId` | runtime-д үүснэ | `POST /games` response-оос авна |
| `gameName` | runtime-д үүснэ | Pre-request script үүсгэнэ |

Secret байхгүй тул real token commit хийгдээгүй.

## Newman

Newman ашиглаж Postman collection-ыг command line-аас ажиллуулсан.

Dependencies суулгах:

```bash
npm install
```

API server асаах:

```bash
npm start
```

Өөр terminal дээр тест ажиллуулах:

```bash
npm run test:api
```

HTML report үүсгэх:

```bash
npm run report:api
```

Report файл:

```text
reports/api.html
```

## Newman test үр дүн

Newman run амжилттай болсон.

```text
9 requests
30 assertions
0 failed
```

Өөрөөр хэлбэл бүх request ажилласан, бүх assertion pass болсон.

## GitHub Actions CI

CI workflow файл:

```text
.github/workflows/api-tests.yml
```

Workflow нь `push` болон `pull_request` дээр ажиллана.

CI дээр хийх алхмууд:

1. Repository checkout хийх
2. Node.js 20 суулгах
3. `npm ci` ажиллуулж dependency суулгах
4. Local API server-ийг background дээр асаах
5. Newman collection ажиллуулах
6. JUnit болон HTML report үүсгэх
7. `reports/` хавтсыг artifact болгон upload хийх

## Repository бүтэц

```text
bie-daalt-14/
├── .github/
│   └── workflows/
│       └── api-tests.yml
├── partA/
│   ├── SETUP.md
│   └── screenshot.png
├── postman/
│   ├── collection.json
│   ├── env.dev.json
│   └── env.ci.json
├── reports/
│   └── api.html
├── server/
│   └── index.js
├── README.md
├── REFLECTION.md
├── TAILBAR.md
├── package.json
└── package-lock.json
```

## Файлуудын тайлбар

| Файл | Тайлбар |
| --- | --- |
| `server/index.js` | Lab11 Tic Tac Toe REST API server |
| `postman/collection.json` | Postman collection, 9 request, 30 assertion |
| `postman/env.dev.json` | Local dev environment |
| `postman/env.ci.json` | CI environment |
| `.github/workflows/api-tests.yml` | Newman test ажиллуулах GitHub Actions workflow |
| `reports/api.html` | Newman HTML report |
| `partA/SETUP.md` | API сонголт, base URL, auth, эхний request |
| `partA/screenshot.png` | Эхний амжилттай request-ийн screenshot |
| `REFLECTION.md` | Даалгаврын 5 reflection асуултын хариулт |
| `TAILBAR.md` | Хийсэн ажлын товч тайлбар |
| `package.json` | Script болон dependency тохиргоо |

## Хийсэн ажлын дүгнэлт

Энэ ажлаар Lab11-ийн Tic Tac Toe backend санааг Lab14-ийн API testing шаардлагад тохируулж REST API болгосон. Дараа нь Postman collection үүсгэж happy path, chained request, create, update, delete, negative 400/404 case-үүдийг шалгасан. Newman ашиглан command line-аас тестийг ажиллуулж, HTML report үүсгэсэн. Мөн GitHub Actions workflow бэлдэж CI дээр local API server асаагаад тест ажиллах байдлаар тохируулсан.

Эцсийн байдлаар collection нь 9 request, 30 assertion-той бөгөөд local Newman run дээр бүгд pass болсон.
