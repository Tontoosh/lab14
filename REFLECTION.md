# Reflection

## 1. Аль assertion хамгийн их үнэ цэнэтэй байсан бэ?

Schema/property болон business rule assertion хамгийн үнэ цэнэтэй санагдсан. Status code 200 эсвэл 201 байх нь request амжилттай явсныг харуулдаг ч response client-д хэрэгтэй бүтэцтэй байгаа эсэхийг батлахгүй. Жишээ нь game үүсгэхэд `id`, `cells`, `currentPlayer`, `status`, `canUndo` талбарууд байгаа эсэх, board яг 9 cell-тэй эсэхийг шалгаснаар Tic Tac Toe UI найдаж хэрэглэдэг contract хамгаалагдаж байна. Хэрэв server 200 буцаасан мөртлөө `cells` талбар байхгүй эсвэл 9 биш урттай array буцаавал frontend зөв ажиллахгүй. Тиймээс зөвхөн амжилттай status биш, response-ийн утга, хэлбэр, тоглоомын дүрэмтэй холбоотой нөхцөлийг хамт шалгах нь илүү бодит үнэ цэнэтэй байсан.

## 2. Negative test ямар алдааг олох вэ?

`POST /games/{{gameId}}/moves` request дээр `x: 9` явуулж 400 буцаахыг шалгасан. Tic Tac Toe board нь зөвхөн 0-2 координаттай тул ийм payload зөвшөөрөгдвөл server буруу index дээр бичих эсвэл runtime алдаа гаргах эрсдэлтэй. Мөн `POST /games/missing-game/moves` болон `GET /not-found` дээр 404 буцаахыг шалгасан. Энэ нь байхгүй тоглоом, буруу route зэрэг алдааны замыг contract болгон барьж байгаа. Negative test байхгүй бол API зөвхөн happy path дээр ажиллаж байгаа мэт харагдана. Гэхдээ бодит хэрэглэгч буруу coordinate явуулах, устсан game рүү хандах, эсвэл буруу URL дуудах боломжтой учраас ийм case-үүдийг шалгах шаардлагатай.

## 3. Postman дээр pass байсан тест Newman дээр fail болсон уу?

Local server асаагаагүй үед Newman fail болно. Учир нь collection-ийн `baseUrl` нь `http://localhost:3014` бөгөөд Newman request явуулахын өмнө server ажиллаж байх ёстой. Үүнийг шийдэхийн тулд README-д эхлээд `npm start`, дараа нь `npm run test:api` гэж заасан. GitHub Actions workflow дээр server-ийг background-д асаагаад Newman ажиллуулдаг. Мөн Postman дээр environment сонгогдсон байхад pass болох тест Newman дээр environment file өгөөгүй бол fail болох магадлалтай. Тиймээс `postman/env.dev.json` болон `postman/env.ci.json` файлуудыг collection-той хамт хадгалсан.

## 4. Token эсвэл secret-ыг хэрхэн зохицуулсан бэ?

Энэ Lab11 Tic Tac Toe API auth шаарддаггүй тул token, API key, password зэрэг secret ашиглаагүй. Environment файлууд дотор зөвхөн public local `baseUrl`, runtime-д ашиглагдах `gameId`, `gameName` variable байна. Secret шаарддаг API байсан бол real утгыг commit хийхгүй, GitHub Secrets болон CI runtime substitution ашиглах ёстой. Ер нь environment file-д commit хийж болох утга болон commit хийж болохгүй нууц утгыг ялгах нь чухал. Энэ ажил дээр API local бөгөөд auth байхгүй тул secret leak гарах эрсдэл бага байсан.

## 5. API өөрчлөгдвөл collection-ийн хамгийн эмзэг хэсэг аль вэ?

Response schema болон chained request хамгийн түрүүнд эвдрэх магадлалтай. Жишээ нь `POST /games` response `id` буцаахаа больбол дараагийн `GET /games/{{gameId}}`, move, reset, delete request бүгд fail болно. Мөн `cells` array 9 биш болох, `currentPlayer` утга өөр format-тай болох зэрэг өөрчлөлтүүд UI болон тестэд шууд нөлөөлнө. Үүнийг бууруулахын тулд давтагдах URL-ийг `baseUrl` variable болгож, зөвхөн client-д үнэхээр хэрэгтэй contract дээр хатуу assertion бичих хэрэгтэй. Харин response-ийн хэрэггүй жижиг detail бүрийг шалгавал тест хэт эмзэг болно. Тиймээс API өөрчлөгдөхөд тест хэрэгтэй дохио өгөх ёстой, гэхдээ хэрэггүй өөрчлөлт бүр дээр унах ёсгүй.
