Ext.data.JsonP.workspace({"guide":"<h1 id='workspace-section-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-workspace-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0-%D0%B8-%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%B8%D1%85-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F'>Создание workspace проекта и нескольких приложений с нуля</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ul>\n<li>1. <a href='#!/guide/workspace-section-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-workspace'>Создание workspace</a>\n <ul>\n<li>1.1. <a href='#!/guide/workspace-section-%D0%B4%D0%BE%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0-%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2-%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D0%B8'>Доработка файлов конфигурации</a>\n </li>\n</ul></li>\n<li>2. <a href='#!/guide/workspace-section-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D1%89%D0%B5%D0%B3%D0%BE-%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D0%B0-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8'>Создание общего пакета разработки</a>\n </li>\n<li>3. <a href='#!/guide/workspace-section-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9'>Создание приложений</a>\n <ul>\n<li>3.1. <a href='#!/guide/workspace-section-%D0%BE%D0%B1%D1%89%D0%B8%D0%B5-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B8-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9'>Общие настройки приложений</a>\n </li>\n<li>3.2. <a href='#!/guide/workspace-section-%D0%B4%D0%BB%D1%8F-%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D1%85-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9-%D0%B8-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B2-microsoft-store'>Для мобильных приложений и приложения в Microsoft Store</a>\n </li>\n</ul></li>\n<li>4. <a href='#!/guide/workspace-section-%D1%81%D0%B1%D0%BE%D1%80%D0%BA%D0%B0-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9'>Сборка приложений</a>\n </li>\n<li>5. <a href='#!/guide/workspace-section-%D0%BE%D0%B1%D1%89%D0%B5%D0%B5-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5'>Общее версионирование</a>\n </li>\n</ul></div>\n\n<p>Последовательность команд для создания <code>workspace</code> проекта\nс несколькими <code>ExtJS</code> приложениями\nс примером создания нативного приложения.</p>\n\n<p>Актуально только для разработки с использованием <code>Sencha SDK</code>.</p>\n\n<p>При использовании <code>npm</code> о размещении <code>framework</code> для\nнескольких приложений в одном месте остается только мечтать.</p>\n\n<p>Возможно  использование <code>pnpm</code> может решить проблему, но этот вариант не исследован.</p>\n\n<p><em>Все изложенное ниже носит рекомендательный характер</em></p>\n\n<p>Для примера создадим следующие приложения:</p>\n\n<ul>\n<li><strong>admin</strong>: приложение администрирования сисстемы с namespace <code>MyApp.admin</code></li>\n<li><strong>main</strong>: основное web приложениес namespace <code>MyApp.main</code></li>\n<li><strong>mobile</strong>: мобильное приложение с namespace <code>MyApp.mobile</code></li>\n<li><strong>package</strong>: общий пакет разработки для всех проложений с namespace <code>MyApp</code></li>\n</ul>\n\n\n<h2 id='workspace-section-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-workspace'>Создание workspace</h2>\n\n<p><strong>Действия выполняем в папке проекта, там где будут расположены все\nExtJS приложения и эта папка будет являться корнем web сервера</strong></p>\n\n<h4 id='workspace-section-generate-workspace'>Generate workspace</h4>\n\n<pre><code class=\"sh\">$ sencha generate workspace .\n</code></pre>\n\n<p><em>не забывем про точку</em></p>\n\n<p>Чтобы не выполнять следующий шаг, можно использовать ключ <code>-sdk</code>:</p>\n\n<pre><code class=\"sh\">$ sencha -sdk d:\\Sencha\\SDK\\ext-6.5.2\\ generate workspace .\n</code></pre>\n\n<h4 id='workspace-section-%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-framework%2C-%D0%B5%D0%B4%D0%B8%D0%BD%D0%BE%D0%B3%D0%BE-%D0%B4%D0%BB%D1%8F-%D0%B2%D1%81%D0%B5%D1%85-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9'>Подключение framework, единого для всех приложений</h4>\n\n<pre><code class=\"sh\">$ sencha framework upgrade ext d:\\Sencha\\SDK\\ext-6.5.2\\ ext\n</code></pre>\n\n<p><strong>Внимание!</strong>\n<em>Эту же команду нужно использовать при клонировании проекта для\nустановки ExtJS на локальном или сборочном компе.</em></p>\n\n<h3 id='workspace-section-%D0%B4%D0%BE%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0-%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2-%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D0%B8'>Доработка файлов конфигурации</h3>\n\n<p>Начиная с 5 или 6 версии <code>Sencha Cmd</code> появилась неприятная запись\nв файле <code>workspaсe.json</code> в секции <code>packages</code>:</p>\n\n<pre><code class=\"json\">    \"packages\": {\n        \"dir\": \"${workspace.dir}/packages/local,${workspace.dir}/packages\",\n        \"extract\": \"${workspace.dir}/packages/remote\"\n    }\n</code></pre>\n\n<p> меняем ее на</p>\n\n<pre><code class=\"`json\">     \"packages\": {\n         \"dir\": \"${workspace.dir}/packages\",\n         \"extract\": \"${workspace.dir}/packages/remote\"\n     }\n</code></pre>\n\n<p>Дополняем файл <code>.gitignore</code> строками</p>\n\n<pre><code>/ext\n/packages/remote\nversion.properties\n</code></pre>\n\n<p>Файл <code>version.properties</code> потребуется при\nподготовке <a href=\"#!/guide/workspace-section-%D0%BE%D0%B1%D1%89%D0%B5%D0%B5-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5\">общего версионирования</a> проекта</p>\n\n<p>Все готово!</p>\n\n<p>В итоге имеем начальную структуру workspace:</p>\n\n<p><img src=\"data:image/png;base64,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\" alt=\"\" /></p>\n\n<p><strong><code>.gitignore</code></strong></p>\n\n<pre><code>/build\nbootstrap.*\nclassic.json*\nmodern.json*\n.sencha\n/ext\n/packages/remote\nversion.properties\n</code></pre>\n\n<p><strong><code>workspace.json</code></strong></p>\n\n<pre><code class=\"json\">{\n    \"frameworks\": {        \n        \"ext\": {\n            \"path\":\"ext\",\n            \"version\":\"6.5.2.463\"\n        }\n\n    },\n\n    \"build\": {\n        \"dir\": \"${workspace.dir}/build\"\n    },\n\n    \"packages\": {\n        \"dir\": \"${workspace.dir}/packages\",\n        \"extract\": \"${workspace.dir}/packages/remote\"\n    }\n}\n</code></pre>\n\n<h2 id='workspace-section-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D1%89%D0%B5%D0%B3%D0%BE-%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D0%B0-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8'>Создание общего пакета разработки</h2>\n\n<p>Сразу генерируем общий пакет разработки.\nЗдесь храним общие модули для приложений (модели данных, сторы, компоненты)\nи через этот пакет удобно получать <a href=\"#!/guide/workspace-section-%D0%BE%D0%B1%D1%89%D0%B5%D0%B5-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5\">версию</a> проекта.</p>\n\n<pre><code class=\"sh\">$ sencha generate package -names MyApp -name myapp myapp\n</code></pre>\n\n<p>где</p>\n\n<ul>\n<li>MyApp: namespace пакета;</li>\n<li>myapp: папка размещения (<code>./packages/myapp</code>) и имя пакета одновременно.</li>\n</ul>\n\n\n<p>Дополнительных настроек в <code>package.json</code> не требуется.</p>\n\n<p>Можно подправить параметры</p>\n\n<ul>\n<li>version: устанавливаем значение \"1.0.0.0\";</li>\n<li>compatVersion: оставляем в 3-х значном варианте (1.0.0);</li>\n<li>toolkit: если все приложения будут в modern;</li>\n<li>requires: заполнится при разработке;</li>\n<li>creator;</li>\n<li>summary;</li>\n<li>detailedDescription.</li>\n</ul>\n\n\n<p>Последние 3 параметра для феншуя, оформляем по необходимости.</p>\n\n<h2 id='workspace-section-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9'>Создание приложений</h2>\n\n<p>Создание приложения:</p>\n\n<ul>\n<li>используем framework в папке <code>ext</code></li>\n<li>namespace приложения <code>MyApp.admin</code> / <code>MyApp.main</code> / <code>MyApp.mobile</code></li>\n<li>папка приложения <code>admin</code> / <code>main</code> / <code>mobile</code></li>\n</ul>\n\n\n<pre><code class=\"sh\">$ sencha generate app -ext -modern MyApp.admin ./admin\n$ sencha generate app -ext -modern MyApp.main ./main\n$ sencha generate app -ext -modern MyApp.mobile ./mobile\n</code></pre>\n\n<p><strong>Дальнейшие действия выполняем в папке приложения</strong></p>\n\n<h3 id='workspace-section-%D0%BE%D0%B1%D1%89%D0%B8%D0%B5-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B8-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9'>Общие настройки приложений</h3>\n\n<p>Для добавления пакета SU Packages  правим в файле <code>app.json</code>:</p>\n\n<pre><code class=\"json\">\"locale\": \"ru\",\n\n\"requires\": [\n    \"font-awesome\",\n    \"material-icons\",\n    \"su\",\n    \"su-native\",\n    \"su-locale\"\n]\n</code></pre>\n\n<ul>\n<li>locale: включение локализации, если не используем динамическую</li>\n<li>requires: пакеты по необходимости, <em>пакет <code>su-native</code> только для нативных приложений</em></li>\n</ul>\n\n\n<p>Если не нравится названия css файлов типа <code>myapp-all.css</code>, дополняем раздел <code>output</code> файла <code>app.json</code>:</p>\n\n<pre><code class=\"json\">\"output\": {\n    \"base\": \"${workspace.build.dir}/${app.name}/${build.environment}\",\n    \"css\": \"${app.output.css.dir}/${app.name}.css\",\n    \"appCache\": {\n        \"enable\": false\n    }\n}\n</code></pre>\n\n<p>или</p>\n\n<pre><code class=\"json\">\"output\": {\n    \"base\": \"${workspace.build.dir}/${app.name}/${build.environment}\",\n    \"css\": \"${app.output.css.dir}/style.css\",\n    \"appCache\": {\n        \"enable\": false\n    }\n}\n</code></pre>\n\n<p>Для устранения проблемы потерянных классов убираем подключение <code>ext-all-debug.js</code>.</p>\n\n<p>В секции <code>js</code> файла <code>add.json</code></p>\n\n<pre><code class=\"json\">\"js\": [\n    // Комметаррим или удаляем\n    //{\n    //    \"path\": \"${framework.dir}/build/ext-modern-all-debug.js\"\n    //},\n    {\n        \"path\": \"app.js\",\n        \"bundle\": true\n    }\n]\n</code></pre>\n\n<p>В файле <code>app.js</code> убираем строки</p>\n\n<pre><code class=\"js\">requires: [\n    // This will automatically load all classes in the App namespace\n    // so that application classes do not need to require each other.\n    'App.*'\n],\n</code></pre>\n\n<p>и следим за секцией <code>requires</code> в js файлах, для подключения нухных зависимостейю</p>\n\n<p>Добавляем файл конфигурации <code>config.js</code> и прописываем его подключение в <code>app.json</code></p>\n\n<ul>\n<li>секция <code>js</code></li>\n</ul>\n\n\n<pre><code class=\"json\">\"js\": [\n    {\n        \"path\": \"config.js\",\n        \"remote\": true \n    },\n    {\n        \"path\": \"app.js\",\n        \"bundle\": true\n    }\n]\n</code></pre>\n\n<ul>\n<li>секция <code>extras</code></li>\n</ul>\n\n\n<pre><code class=\"json\">\"extras\": [\n    \"config.js\"\n]\n</code></pre>\n\n<h3 id='workspace-section-%D0%B4%D0%BB%D1%8F-%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D1%85-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9-%D0%B8-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B2-microsoft-store'>Для мобильных приложений и приложения в Microsoft Store</h3>\n\n<p>Инициализируем <code>cordova</code></p>\n\n<pre><code class=\"sh\">$ sencha cordova init ru.skillunion.myapp MyApp\n</code></pre>\n\n<p>Правим секцию <code>builds</code> в файле <code>app.json</code> для настройки раздельных сборок\nмобильных приложений:</p>\n\n<pre><code class=\"json\">\"builds\": {\n    \"web\": {\n        \"default\": true\n    },\n    \"android\": {\n        \"packager\": \"cordova\",\n        \"cordova\": {\n            \"config\": {\n                \"platforms\": \"android\",\n                \"id\": \"ru.skillunion.myapp\",\n                \"name\": \"MyApp\"\n            },\n            \"output\": {\n                \"manifest\": {\n                    \"path\": \"${app.name}.json\"\n                }\n            }\n        }\n    },\n    \"ios\": {\n        \"packager\": \"cordova\",\n        \"cordova\": {\n            \"config\": {\n                \"platforms\": \"ios\",\n                \"id\": \"ru.skillunion.myapp\",\n                \"name\": \"MyApp\"\n            },\n            \"output\": {\n                \"manifest\": {\n                    \"path\": \"${app.name}.json\"\n                }\n            }\n        }\n    },\n    \"windows\": {\n        \"packager\": \"cordova\",\n        \"cordova\": {\n            \"config\": {\n                \"platforms\": \"windows\",\n                \"id\": \"ru.skillunion.myapp\",\n                \"name\": \"MyApp\"\n            },\n            \"output\": {\n                \"manifest\": {\n                    \"path\": \"${app.name}.json\"\n                }\n            }\n        }\n    }\n}\n</code></pre>\n\n<h4 id='workspace-section-%D0%BF%D0%BB%D0%B0%D0%B3%D0%B8%D0%BD%D1%8B-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%BE%D0%B2-%D1%81-%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%BE%D0%B9-%D0%BD%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D1%85-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B9'>Плагины для классов с поддержкой нативных функций</h4>\n\n<p>Для мобильных приложений подключаем плагины <code>cordova</code>.\nПодключение выполнять в папке cordova приложения</p>\n\n<pre><code class=\"sh\">$ cordova plugin add [plugin name]\n</code></pre>\n\n<ul>\n<li><a href=\"https://www.npmjs.com/package/cordova-plugin-dialogs\">cordova-plugin-dialogs</a>: <a href=\"#!/api/Ext.MessageBox\" rel=\"Ext.MessageBox\" class=\"docClass\">Ext.MessageBox</a> с нативными далогами;</li>\n<li><a href=\"https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin\">cordova-plugin-x-toast</a>: <a href=\"#!/api/Ext.Toast\" rel=\"Ext.Toast\" class=\"docClass\">Ext.Toast</a> с нативными информерами;</li>\n<li><a href=\"https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/\">cordova-plugin-network-information</a>: <a href=\"#!/api/SU.native.Network\" rel=\"SU.native.Network\" class=\"docClass\">SU.native.Network</a> определение состояния сети;</li>\n</ul>\n\n\n<h2 id='workspace-section-%D1%81%D0%B1%D0%BE%D1%80%D0%BA%D0%B0-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9'>Сборка приложений</h2>\n\n<p>Сборка debug версии приложения для android</p>\n\n<pre><code class=\"sh\">$ sencha app build android\n</code></pre>\n\n<p>Сборка debug версии приложения для ios</p>\n\n<pre><code class=\"sh\">$ sencha app build ios\n</code></pre>\n\n<p>Сборка debug версии приложения для windows</p>\n\n<pre><code class=\"sh\">$ sencha app build windows\n</code></pre>\n\n<h2 id='workspace-section-%D0%BE%D0%B1%D1%89%D0%B5%D0%B5-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5'>Общее версионирование</h2>\n\n<p>Эта доработка позволяет</p>\n\n<ul>\n<li>автоматически повышать номер сборки в версии\nвсех приложений;</li>\n<li>собирать все приложения одновременно;</li>\n</ul>\n\n\n<p>Это удобно для</p>\n\n<ul>\n<li>публикации мобильных приложений в магазинах;</li>\n<li>отобажения версии на стартовых экранах и в форме \"About\".</li>\n</ul>\n\n","title":"Создание workspace проекта"});