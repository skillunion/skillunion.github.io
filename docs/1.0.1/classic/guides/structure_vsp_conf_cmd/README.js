Ext.data.JsonP.structure_vsp_conf_cmd({"guide":"<h1 id='structure_vsp_conf_cmd-section-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%8B-vsp-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B9'>Команды VSP для конференций</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ul>\n<li>1. <a href='#!/guide/structure_vsp_conf_cmd-section-%D0%B4%D0%B8%D1%81%D0%BF%D0%B5%D1%82%D1%87%D0%B5%D1%80-%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B9'>Диспетчер конференций</a>\n <ul>\n<li>1.1. <a href='#!/guide/structure_vsp_conf_cmd-section-%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D0%B0%D0%BD%D1%82%D1%8B-%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B8-%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B8'>Константы результата загрузки конференции</a>\n </li>\n<li>1.2. <a href='#!/guide/structure_vsp_conf_cmd-section-cd.loadlist---%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B9'>cd.loadlist - Получение списка загруженных конференций</a>\n </li>\n<li>1.3. <a href='#!/guide/structure_vsp_conf_cmd-section-cd.load---%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0-%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B8'>cd.load - Загрузка конференции</a>\n </li>\n</ul></li>\n</ul></div>\n\n<h2 id='structure_vsp_conf_cmd-section-%D0%B4%D0%B8%D1%81%D0%BF%D0%B5%D1%82%D1%87%D0%B5%D1%80-%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B9'>Диспетчер конференций</h2>\n\n<h3 id='structure_vsp_conf_cmd-section-%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D0%B0%D0%BD%D1%82%D1%8B-%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B8-%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B8'>Константы результата загрузки конференции</h3>\n\n<p><a name=\"structure_vsp_conf_cmd-section-loading_result\"></a></p>\n\n<p>&lt;LoadingResult&gt;</p>\n\n<table>\n<tr><th>Код ошибки</th><th>Значение</th><th>Описание</th></tr>\n<tr><td></td><td></td><td></td></tr>\n<tr><td>LROkLoaded</td>             <td>0</td>          <td>Ok</td></tr>\n<tr><td>LROkConnected</td>          <td>1</td>          <td>Ok</td></tr>\n<tr><td>LRErrAlreadyConnected</td>  <td>2</td>          <td>Ok</td></tr>\n<tr><td>LRErrConfNotFound</td>      <td>3</td>          <td>Ok</td></tr>\n<tr><td>LRErrDeny</td>              <td>4</td>          <td>Ok</td></tr>\n</table>\n\n\n<h3 id='structure_vsp_conf_cmd-section-cd.loadlist---%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B9'>cd.loadlist - Получение списка загруженных конференций</h3>\n\n<p><a name=\"structure_vsp_conf_cmd-section-cd.loadlist\"></a></p>\n\n<h5 id='structure_vsp_conf_cmd-section-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0%3A'>Команда:</h5>\n\n<pre><code>{\n    \"dst\": \"vsp\",               // <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>\n    \"lng\": \"ru\"|\"en\"            // <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>\n    \"seq\": int,                 // <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a>\n    \"cmd\": \"loadlist\",          // <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>\n    \"obj\": \"cd\",                // <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>\n    \"params\":{\n        \"ClusterID\": int|null   // <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a>\n    }\n}\n</code></pre>\n\n<blockquote><p>\"dst\", \"lng\", \"seq\", \"cmd\" - <a href=\"#!/guide/protocol-section-cmd_request\">обязательные данные команды</a></p>\n\n<p>\"obj\" - <a href=\"#!/guide/protocol-section-cmd_request_obj\">адресат в VSP</a></p>\n\n<p>\"params\" - <a href=\"#!/guide/protocol-section-cmd_request_params\">структура параметров</a></p>\n\n<p><em>При ClusterID=0 для администратора системы выдаются конференции всех кластеров</em></p></blockquote>\n\n<h5 id='structure_vsp_conf_cmd-section-%D0%BE%D1%82%D0%B2%D0%B5%D1%82-%D0%BD%D0%B5%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D0%BD%D1%8B%D0%B9%3A'>Ответ нестандартный:</h5>\n\n<pre><code>{\n    \"ANSW\": {\n        \"cmd\": \"loadlist\",\n        \"seq\": int,\n        \"obj\": \"cd\",\n        \"result\":{\n            \"code\": 0,\n            \"list\": [\n                &lt;confdata&gt;,\n                …\n                &lt;confdata&gt;\n            ]\n        }\n    }\n}\n</code></pre>\n\n<blockquote><p>\"cmd\", \"seq\", \"obj\" - <a href=\"#!/guide/protocol-section-cmd_answer\">обязательные данные ответа на команду</a></p>\n\n<p>\"result\" - <a href=\"#!/guide/protocol-cmd_answer_result\">результат выполнения команды</a>, дополнительно содержит массив\n\"list\" с блоками \"confdata\" данных конферненций</p></blockquote>\n\n<p>&gt;confdata&lt; -</p>\n\n<h3 id='structure_vsp_conf_cmd-section-cd.load---%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0-%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B8'>cd.load - Загрузка конференции</h3>\n\n<p>Команда:\n    {\n        \"dst\":  \"vsp\",              // <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>\n        \"lng\":  \"ru\"|\"en\"           // <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>\n        \"seq\":  int,                // <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a>\n        \"cmd\":  \"load\",             // <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>\n        \"obj\":  \"cd\",               // <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>\n        \"params\":{\n            \"ClusterID\":    int     // <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a>\n            \"SchemeID\":     int     // <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a>\n        }\n    }</p>\n\n<p>Ответ нестандартный:</p>\n\n<pre><code>{\n    \"ANSW\":{\n        \"cmd\":  \"load\",\n        \"seq\":  int,\n        \"obj\":  \"cd\",\n        \"result\":{\n            \"code\":         &lt;LoadingResult&gt;,\n            \"bControl\":     1|0,\n            \"SVPartyID\":    int,\n            \"SVPartyIndex\": int,\n            \"confdata\":     &lt;confdata&gt;,\n            \"parties\":[\n                &lt;partydata&gt;,\n                …\n                &lt;partydata&gt;\n            ]\n        }\n    }\n}\n</code></pre>\n","title":"Команды VSP для конференций"});