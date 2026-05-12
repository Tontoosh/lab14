# Reflection

## 1. Аль assertion хамгийн их үнэ цэнэтэй байсан бэ?

Schema/property болон business rule assertion хамгийн үнэ цэнэтэй санагдсан. Status code 200 эсвэл 201 байх нь request амжилттай явсныг харуулдаг ч response client-д хэрэгтэй бүтэцтэй байгаа эсэхийг батлахгүй. Жишээ нь game үүсгэхэд `id`, `cells`, `currentPlayer`, `status`, `canUndo` талбарууд байгаа эсэх, board яг 9 cell-тэй эсэхийг шалгаснаар Tic Tac Toe UI найдаж хэрэглэдэг contract хамгаалагдаж байна.

## 2. Negative test ямар алдааг олох вэ?

`POST /games/{{gameId}}/moves` request дээр `x: 9` явуулж 400 буцаахыг шалгасан. Tic Tac Toe board нь зөвхөн 0-2 координаттай тул ийм payload зөвшөөрөгдвөл server буруу index дээр бичих эсвэл runtime алдаа гаргах эрсдэлтэй. Мөн `POST /games/missing-game/moves` болон `GET /not-found` дээр 404 буцаахыг шалгасан. Энэ нь байхгүй тоглоом, буруу route зэрэг алдааны замыг contract болгон барьж байгаа.

## 3. Postman дээр pass байсан тест Newman дээр fail болсон уу?

Local server асаагаагүй үед Newman fail болно. Учир нь collection-ийн `baseUrl` нь `http://localhost:3014` бөгөөд Newman request явуулахын өмнө server ажиллаж байх ёстой. Үүнийг шийдэхийн тулд README-д эхлээд `npm start`, дараа нь `npm run test:api` гэж заасан. GitHub Actions workflow дээр server-ийг background-д асаагаад Newman ажиллуулдаг.

## 4. Token эсвэл secret-ыг хэрхэн зохицуулсан бэ?

Энэ Lab11 Tic Tac Toe API auth шаарддаггүй тул token, API key, password зэрэг secret ашиглаагүй. Environment файлууд дотор зөвхөн public local `baseUrl`, runtime-д ашиглагдах `gameId`, `gameName` variable байна. Secret шаарддаг API байсан бол real утгыг commit хийхгүй, GitHub Secrets болон CI runtime substitution ашиглах ёстой.

## 5. API өөрчлөгдвөл collection-ийн хамгийн эмзэг хэсэг аль вэ?

Response schema болон chained request хамгийн түрүүнд эвдрэх магадлалтай. Жишээ нь `POST /games` response `id` буцаахаа больбол дараагийн `GET /games/{{gameId}}`, move, reset, delete request бүгд fail болно. Мөн `cells` array 9 биш болох, `currentPlayer` утга өөр format-тай болох зэрэг өөрчлөлтүүд UI болон тестэд шууд нөлөөлнө. Үүнийг бууруулахын тулд давтагдах URL-ийг `baseUrl` variable болгож, зөвхөн client-д үнэхээр хэрэгтэй contract дээр хатуу assertion бичих хэрэгтэй.
