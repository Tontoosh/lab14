# Reflection

## 1. Аль assertion хамгийн их үнэ цэнэтэй байсан бэ?

Business rule болон schema/property assertion хамгийн үнэ цэнэтэй санагдсан. Status code 200 байх нь request амжилттай явсныг харуулдаг ч response-ийн contract зөв эсэхийг бүрэн батлахгүй. Жишээ нь `GET /posts` дээр body нь array байх, эхний post нь `id`, `title`, `body`, `userId` талбартай байхыг шалгаснаар client талын код найдаж хэрэглэдэг structure хэвээр байгаа эсэхийг илүү бодитоор хамгаалж байна.

## 2. Negative test ямар алдааг олох вэ?

`GET /posts/999999` request нь байхгүй resource авахад API 404 буцааж байгаа эсэхийг шалгана. Энэ тест байхгүй бол API алдаатай id дээр 200 болон хоосон object буцаах, эсвэл 500 internal error өгөх зэрэг contract-ийн асуудал анзаарагдахгүй. Negative path нь хэрэглэгч буруу id оруулах, устсан resource руу хандах зэрэг бодит нөхцөлийг төлөөлдөг.

## 3. Postman дээр pass байсан тест Newman дээр fail болсон уу?

Энэ collection нь environment variable-уудыг export хийсэн тул Newman дээр мөн адил ажиллахаар бэлтгэгдсэн. Ихэвчлэн Newman дээр fail болдог шалтгаан нь Postman local environment-д байгаа variable export хийгдээгүй байх, token хоосон байх, эсвэл request order өөрчлөгдөж chained variable үүсэхээс өмнө хэрэглэгдэх явдал байдаг. Энэ ажлын collection-д `Happy GET - list posts` request эхэндээ `firstPostId` үүсгээд дараагийн request ашигладаг.

## 4. Token эсвэл secret-ыг хэрхэн зохицуулсан бэ?

JSONPlaceholder auth шаарддаггүй тул token, API key, password зэрэг secret ашиглаагүй. `env.dev.json` болон `env.ci.json` дотор зөвхөн public `baseUrl` болон тестийн runtime variable-ууд байна. Token шаарддаг API байсан бол real token commit хийхгүй, environment file-д placeholder үлдээгээд GitHub Actions дээр GitHub Secrets-ээс runtime үед оруулах ёстой.

## 5. API өөрчлөгдвөл collection-ийн хамгийн эмзэг хэсэг аль вэ?

Response schema болон business rule assertion хамгийн түрүүнд эвдэрнэ. Жишээ нь `posts` resource-ийн `title` нэр өөрчлөгдөх, `id` string болох, эсвэл 404 response body өөр format-тай болох үед тест fail болно. Үүнийг бууруулахын тулд client-д үнэхээр хэрэгтэй contract-ийг л хатуу шалгаж, хэрэггүй implementation detail дээр хэт нарийн assertion бичихгүй байх хэрэгтэй. Мөн `baseUrl` зэрэг давтагдах утгыг environment variable болгосноор endpoint орчин солигдоход collection бүхэлдээ эвдрэх эрсдэл багасна.
