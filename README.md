На выполнение проекта у вас есть 4 недели. Максимальная оценка за проект — 40 баллов.

Напишите координатору курса, что вы приступили к проекту «Сервис СКАН», и добавляйтесь в канал в Slack #финальный_проект_скан.

Далее — описание проектной задачи!

ПОСТАНОВКА ЗАДАЧИ
Компания СКАН разработала новый API для поиска публикаций о компании (юридическом лице) в средствах массовой информации по его ИНН. Серверная часть приложения уже готова, ваша задача — разработать клиентскую часть.

ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ
Клиентская часть сервиса состоит из:

главной страницы,
формы авторизации,
формы для ввода параметров запроса,
страницы с выводом результатов запроса.
⚡ Макет, подготовленный дизайнерами, находится по ссылке.

Далее подробно разберём поведение отдельных элементов и страниц сервиса.

Шапка сайта
В шапке сайта находятся:

логотип,
меню,
панель управления учётной записью.
Страницы «Тарифы» и «FAQ» выходят за рамки данного ТЗ. Поэтому ссылки на них можно оставить пустыми или прописать фейковые URL-адреса.

Шапка сайта выглядит по-разному для авторизованного и неавторизованного пользователя.

Шапка сайта для неавторизованного пользователя:

img
Ссылку «Зарегистрироваться» можно оставить пустой или прописать фейковый URL.
Кнопка «Войти» ведёт на страницу авторизации.
Шапка сайта для авторизованного пользователя:

img
Вместо кнопок «Зарегистрироваться» и «Войти» появился аватар пользователя с именем и кнопкой «Выйти».
Кнопка «Выйти» сбрасывает авторизацию.
Слева от аватара должна быть панель с информацией о лимите по компаниям в аккаунте и количестве уже используемых компаний. Эта информация подгружается не сразу, для её получения нужно отправить отдельный запрос. Поэтому в то время, пока запрос будет грузиться, нужно показывать лоадер. Пример этой панели с лоадером есть в макете.
Главная страница
Главная страница содержит описание сервиса и доступна всем пользователям без авторизации.

Обратите внимание на следующие пункты:

Кнопка «Запросить данные» ведёт на страницу ввода параметров поиска. Она должна быть видна только зарегистрированному пользователю.

img
Карточки в разделе «Почему именно мы» должны переключаться по принципу карусели: клик на стрелке слева или справа переключает карточки в соответствующем направлении.

Вы можете добавить произвольное количество карточек (или продублировать уже имеющиеся), чтобы протестировать работу карусели.

img
В разделе «Наши тарифы» перечислены возможные тарифы. Кнопка «Подробнее» — заглушка, при клике на неё ничего не происходит.

Если пользователь авторизован, карточка с используемым им тарифом должна выглядеть иначе, чем остальные:

появляется бейдж «Текущий тариф»;
кнопка «Подробнее» меняется на «Перейти в личный кабинет» (она также не функциональна);
карточка выделяется рамкой соответствующего тарифу цвета.
Пример внешнего вида карточки для зарегистрированного пользователя с тарифом Beginner:

img
Форма авторизации
Эта страница содержит форму с полями для ввода логина и пароля. При заполнении пароля вводимое значение должно маскироваться.

Подсказка

При отсутствии одного из значений — логина или пароля — кнопка «Войти» неактивна, и при клике на неё ничего не происходит.

img
После ввода всех необходимых значений кнопка становится активной. При нажатии на неё нужно отправить запрос на POST account/login (подробности см. в юните «Описание API»).

При успешной авторизации в ответе на запрос придут:

токен авторизации (accessToken),
дата, до которой токен действителен (expire).
Эти данные необходимо сохранить в localStorage, чтобы пользователю не нужно было заново авторизоваться после каждого обновления страницы.

В случае неуспешного запроса показать сообщение об ошибке:

img
Остальные элементы формы не функциональны:

вкладка «Зарегистрироваться»,
ссылка «Восстановить пароль»,
кнопки «Войти» через Google/Facebook/Яндекс.
Их нужно просто сверстать.

Форма для ввода параметров запроса
Данная страница содержит основу функционала сервиса: форму, где пользователь задаёт параметры поиска.

Эта страница доступна только авторизованным пользователям. Если неавторизованный пользователь пытается её открыть, нужно переадресовать его на главную страницу сервиса.

На странице должна быть форма поиска со следующими полями:

НАЗВАНИЕ	ТИП ПОЛЯ	ОБЯЗАТЕЛЬНОЕ
ИНН	
Текстовое.

Необходима валидация на соответствие формату ИНН.

✔️
Признак максимальной полноты	Чекбокс	✖️
Упоминания в бизнес-контексте	Чекбокс	✖️
Главная роль в публикации	Чекбокс	✖️
Тональность	Выпадающий список с выбором одного из вариантов:
позитивная,
негативная,
любая.
✔️
Публикации только с риск-факторами	Чекбокс	✖️
Включать технические новости рынков	Чекбокс	✖️
Включать анонсы и календари	Чекбокс	✖️
Включать сводки новостей	Чекбокс	✖️
Количество документов в выдаче	
Число.

Возможные значения: от 1 до 1000.

✔️
Диапазон дат для поиска	Два поля с выбором даты:
дата начала поиска,
дата конца поиска.
✔️
img
Обязательные поля должны быть отмечены звёздочками. Если хотя бы одно из обязательных полей не заполнено, кнопка «Поиск» должна быть неактивна.

Если введённый ИНН не соответствует формату, нужно вывести ошибку. Кнопка «Поиск» в этом случае должна быть так же неактивна.

img
Подсказка

Введённый диапазон (дата начала и конца поиска) необходимо также проверять на корректность:

даты не должны быть в будущем времени;
дата начала не может быть позже даты конца.
Если эти условия не выполняются, нужно показать сообщение об ошибке:

img
Если поисковый запрос введён корректно, по нажатии на кнопку «Поиск» выполняется запрос POST objectsearch/histograms и открывается страница с результатами запроса.

Вывод результатов поиска
Здесь мы выводим результаты ранее введённого запроса. Этот раздел необязательно делать физически отдельной страницей (присваивать свой URL-адрес). Можно просто отобразить его поверх формы поиска после отправки запроса.

Поиск состоит из трёх этапов:

Сначала мы делаем запрос POST objectsearch/histograms и получаем общую сводку по количеству публикаций и рискам. После успешного выполнения запроса сводку необходимо отобразить следующим образом:

img
Периодов может быть больше, чем помещается на экране. Поэтому необходимо реализовать карусель для горизонтального переключения между ними.

На время, пока сводка подгружается, необходимо показать лоадер.

Затем, используя те же параметры поиска, отправляем запрос POST objectsearch, чтобы получить список публикаций. В ответе придёт список ID найденных документов.
После того как мы получили ID документов, остался последний шаг. Подгрузить их содержимое: заголовок, дату, источник, текст публикации и так далее. Для этого воспользуемся запросом POST documents.
Однако мы уже знаем, что найденных публикаций может быть много (лимит поиска — 1000 результатов). Было бы неправильно загружать всё и сразу: это может занять много времени, а мы не хотим задерживать пользователя.

Поэтому необходимо реализовать ленивую загрузку (lazy loading). Сначала нужно подгрузить только 10 первых результатов и добавить кнопку «Показать больше», по нажатии на которую будет подгружаться следующие 10 результатов. И так до тех пор, пока не будут загружены последние из найденных публикаций. После этого кнопку «Показать больше» необходимо спрятать.

Загруженные публикации выглядят так:

img
Карточка публикации
Разберём детально карточку публикации:

img
В шапке карточки выводим дату публикации и название источника. Название является также ссылкой на оригинал статьи.

Далее идёт заголовок публикации, под ним может быть несколько тегов. Разберём их подробнее.

Каждый объект публикации имеет свойство attributes:

"attributes": {
  "isTechNews": false,
  "isAnnouncement": false,
  "isDigest": false,
  "influence": 352.0,
  "wordCount": 99,
  "coverage": {
    "value": 1402211.0,
    "state": "hasData"
  }
}
В зависимости от значений свойств isTechNews, isAnnouncement и isDigest карточка публикации может иметь 3 вида тегов:

технические новости, если isTechNews равно true;
анонсы и события, если isAnnouncement равно true;
сводки новостей, если isDigest равно true.
Далее необходимо отобразить содержимое документа (с картинками, если они есть).

Внизу карточки находятся кнопка «Читать в источнике», которая открывает в новой вкладке оригинальную статью, и количество слов. Количество слов также можно считать из объекта attributes (свойство wordCount).

ТРЕБОВАНИЯ К ВЁРСТКЕ
Вёрстка должна соответствовать макету. Добиваться Pixel Perfect соответствия не обязательно, но основные моменты должны быть соблюдены:
наличие всех элементов интерфейса,
цветовая гамма,
шрифты,
размеры,
отступы.
Приложение должно корректно отображаться и работать на мобильных устройствах. Дизайн для мобильной версии вы можете найти в макете.
Соблюдайте семантическую вёрстку. На каждой странице должны присутствовать разделы <header>, <main> и <footer>, а также заголовок <h1>. Кнопки должны быть реализованы элементом <button>, выпадающий список — элементом <select> и так далее.
Если какой-либо элемент доступен для взаимодействия (ссылка, кнопка), при наведении курсора должен появляться cursor: pointer.
Внешний вид самого элемента тоже должен меняться при наведении курсора. Пример: нижнее подчёркивание текста у ссылки, другой цвет фона у кнопки.

Используйте любой вариант подключения стилей на ваше усмотрение:
общий файл стилей проекта,
CSS-модули,
специальные React-библиотеки для стилизации компонентов (например, Styled Components).
Использовать селекторы по тегу и ID для задания стилей не рекомендуется, старайтесь отдавать предпочтение классам.
Лучше всего экспортировать картинки из Figma в формате SVG, чтобы качество изображений было стабильным на разных разрешениях.
ТРЕБОВАНИЯ К КОДУ
Проект должен был выполнен на React.
Интерфейс должен быть поделён на компоненты. Перед началом работы обдумайте, какие компоненты вы будете использовать. Деление должно быть логичным и оправданным.
Проект будет работать со множеством данных. Рекомендуем использовать более продвинутый инструмент хранения и изменения данных, чем обычный state. Например, useReducer, React Context или Redux.
При написании кода старайтесь следовать принципам:
KISS (Keep It Short and Simple — не усложняй),
DRY (Don’t Repeat Yourself — не повторяйся).
Вы не ограничены в использовании любых инструментов и дополнительных библиотек (например, для реализации карусели). Но старайтесь следить за тем, чтобы их применение было оправдано и не усложняло код без необходимости.
