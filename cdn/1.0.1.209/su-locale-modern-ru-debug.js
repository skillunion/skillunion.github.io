Ext.onReady(function () {
    if (Ext.Date) {
        Ext.Date.defaultFormat = 'd.m.Y';

        Ext.Date.monthNames = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];

        Ext.Date.shortMonthNames = [
            'Янв',
            'Февр',
            'Март',
            'Апр',
            'Май',
            'Июнь',
            'Июль',
            'Авг',
            'Сент',
            'Окт',
            'Нояб',
            'Дек'
        ];

        Ext.Date.getShortMonthName = function (month) {
            return Ext.Date.shortMonthNames[month];
        };

        Ext.Date.monthNumbers = {
            Янв: 0,
            Фев: 1,
            Мар: 2,
            Апр: 3,
            Май: 4,
            Июн: 5,
            Июл: 6,
            Авг: 7,
            Сен: 8,
            Окт: 9,
            Ноя: 10,
            Дек: 11
        };

        Ext.Date.getMonthNumber = function (name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

        Ext.Date.getShortDayName = function (day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.firstDayOfWeek = 1;
    }
});
Ext.define('SU.locale.ru.Error', {
    override: 'SU.Error',
    statics: {
        locales: {
            DOM_UNKNOWN: 'Неизвестное исключение. Код ({0})',
            DOM_INDEX_SIZE_ERR: 'Индекс или размер является отрицательным, или больше, чем допустимое значение.',
            DOM_STRING_SIZE_ERR: 'Результирующая строка слишком длинная, чтобы поместиться в DOMString',
            DOM_HIERARCHY_REQUEST_ERR: 'Узел не может быть вставлен в требуемое место',
            DOM_WRONG_DOCUMENT_ERR: 'Узел принадлежит другому документу и не могут быть использован.',
            DOM_INVALID_CHARACTER_ERR: 'Строка содержит недопустимый символ',
            DOM_NO_DATA_ALLOWED_ERR: 'Данные указаны для узла, который не поддерживает данные.',
            DOM_NO_MODIFICATION_ALLOWED_ERR: 'Сделана попытка модифицировать объект, который не может быть изменен.',
            DOM_NOT_FOUND_ERR: 'Элемент не может быть найден',
            DOM_NOT_SUPPORTED_ERR: 'Запрошенная операция не поддерживается.',
            DOM_INUSE_ATTRIBUTE_ERR: 'Указанный атрибут уже используется в другом месте.',
            DOM_INVALID_STATE_ERR: 'Указанный узел не принадлежит документу.',
            DOM_SYNTAX_ERR: 'Указано недопустимое значение строки.',
            DOM_INVALID_MODIFICATION_ERR: 'Невозможно изменить тип объекта',
            DOM_NAMESPACE_ERR: 'Декларация пространства имен некорректна',
            DOM_INVALID_ACCESS_ERR: 'Параметр или операция не поддерживается.',
            DOM_VALIDATION_ERR: 'Операция примененная к узлу не проходит проверку.',
            DOM_TYPE_MISMATCH_ERR: 'Тип узла несовместим с ожидаемым типом параметра.',
            DOM_SECURITY_ERR: 'Операция не допускается в связи с ограничением политики безопасности.',
            DOM_NETWORK_ERR: 'Ошибка в сети.',
            DOM_ABORT_ERR: 'Операция прервана пользователем.',
            DOM_URL_MISMATCH_ERR: 'Указанный URL не соответствует.',
            DOM_QUOTA_EXCEEDED_ERR: 'Операция будет превышать пределы хранения.'
        }
    }
});
Ext.define('SU.locale.ru.WebSocketError', {
    override: 'SU.WebSocketError',
    statics: {
        locales: {
            ALREADY_ESTABLISHED: 'Соединение уже установлено.',
            NOT_CONNECTED: 'Соединение не установлено.',
            CAN_NOT_CONNECT: 'Невозможно установить соединение с {0}',
            DISCONNECT: 'Соединение с {0} было прервано.',
            INVALID_SCHEME: "Неправильная схема '{0}' для WebSocket",
            INVALID_ADDRESS: "Неверный адрес '{0}' для WebSocket",
            LOGIN_NOT_DEFINED: 'Не определен логин для автоматической авторизации пользователя.',
            LOGIN_ERROR: 'Ошибка входа в систему ({0}).\n\n{1}',
            LOGIN_CUSTOM: 'Неверный логин или пароль',
            LOGIN_UNKNOWN: 'Имя пользователя или пароль неопознаны.',
            LOGIN_INV_METHOD: 'Авторизация запрещена администратором системы.',
            AUTHORIZE_ERROR: 'Ошибка выполнения запроса авторизации.'
        }
    }
});
Ext.define('SU.locale.ru.data.validator.Bound', {
    override: 'Ext.data.validator.Bound',
    config: {
        emptyMessage: 'Должен присутствовать'
    }
});
Ext.define('SU.locale.ru.data.validator.Email', {
    override: 'Ext.data.validator.Email',
    config: {
        message: 'Недействительный адрес электронной почты'
    }
});
Ext.define('SU.locale.ru.data.validator.Exclusion', {
    override: 'Ext.data.validator.Exclusion',
    config: {
        message: 'Значение, которое было исключено'
    }
});
Ext.define('SU.locale.ru.data.validator.Format', {
    override: 'Ext.data.validator.Format',
    config: {
        message: 'Неправильный формат'
    }
});
Ext.define('SU.locale.ru.data.validator.Inclusion', {
    override: 'Ext.data.validator.Inclusion',
    config: {
        message: 'Нет в списке допустимых значений'
    }
});
Ext.define('SU.locale.ru.data.validator.Length', {
    override: 'Ext.data.validator.Length',
    config: {
        minOnlyMessage: 'Длина должна быть не менее {0}',
        maxOnlyMessage: 'Длина должна быть не более {0}',
        bothMessage: 'Длина должна быть между {0} и {1}'
    }
});
Ext.define('SU.locale.ru.data.validator.Phone', {
    override: 'Ext.data.validator.Phone',

    config: {
        message: 'Не верный номер телефона'
    }
});
Ext.define('SU.locale.ru.data.validator.Presence', {
    override: 'Ext.data.validator.Presence',
    config: {
        message: 'Должен присутствовать'
    }
});
Ext.define('SU.locale.ru.data.validator.Range', {
    override: 'Ext.data.validator.Range',
    config: {
        minOnlyMessage: 'Должно быть не менее {0}',
        maxOnlyMessage: 'Должно быть не более {0}',
        bothMessage: 'Должно быть между {0} и {1}',
        nanMessage: 'Должно быть числом'
    }
});
Ext.define('SU.locale.ru.data.validator.Url', {
    override: 'Ext.data.validator.Url',

    config: {
        message: 'Недействительный URL'
    }
});
Ext.onReady(function () {
    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ' ', // &nbsp;
            decimalSeparator: ',',
            currencySign: '\u0440\u0443\u0431', // Russian Ruble
            dateFormat: 'd.m.Y'
        });
    }
});
Ext.define('SU.locale.ru.ErrorDialog', {
    override: 'SU.ErrorDialog',

    textOk: 'ОК',
    textAdvansed: 'Подробно',
    textErrorTitle: 'Извините, что-то пошло не так',
    textErrorNumber: 'Ошибка {0} из {1}'
});
Ext.define('SU.locale.ru.LoadMask', {
    override: 'Ext.LoadMask',

    config: {
        message: 'Загрузка...'
    }
});
Ext.define('SU.locale.ru.Panel', {
    override: 'Ext.Panel',

    config: {
        standardButtons: {
            ok: { text: 'OK' },
            abort: { text: 'Прервать' },
            retry: { text: 'Повторить' },
            ignore: { text: 'Игнорировать' },
            yes: { text: 'Да' },
            no: { text: 'Нет' },
            cancel: { text: 'Отмена' },
            apply: { text: 'Применить' },
            save: { text: 'Сохранить' },
            submit: { text: 'Отправить' },
            help: { text: 'Справка' },
            close: { text: 'Закрыть' }
        },

        closeToolText: 'Закрыть'
    }
});
Ext.define('SU.locale.ru.dataview.Abstract', {
    override: 'Ext.dataview.Abstract',

    config: {
        loadingText: 'Загрузка...'
    }
});
Ext.define('SU.locale.ru.dataview.EmptyText', {
    override: 'Ext.dataview.EmptyText',

    config: {
        html: 'Нет данных для отображения'
    }
});
Ext.define('SU.locale.ru.dataview.plugin.ListPaging', {
    override: 'Ext.dataview.plugin.ListPaging',

    config: {
        loadMoreText: 'Показать еще...',
        noMoreRecordsText: 'Записей больше нет'
    }
});
Ext.define('SU.locale.ru.dataview.pullrefresh.Bar', {
    override: 'Ext.dataview.pullrefresh.Bar',

    lastUpdatedDateFormat: 'd.m.Y H:i',
    lastUpdatedText: 'Последнее обновление:\xA0',
    loadedText: 'Загружено.',
    loadingText: 'Загрузка...',
    pullText: 'Потяните вниз, чтобы обновить...',
    releaseText: 'Отпустите, чтобы обновить...'
});
Ext.define('SU.locale.ru.field.Date', {
    override: 'Ext.field.Date',

    config: {
        minDateMessage: 'Дата в этом поле должна быть не ранее {0}',
        maxDateMessage: 'Дата в этом поле должна быть не позже {0}'
    }
});
Ext.define('SU.locale.ru.field.Field', {
    override: 'Ext.field.Field',

    config: {
        requiredMessage: 'Это поле обязательно к заполнению',
        validationMessage: 'Неправильный формат'
    }
});
Ext.define('SU.locale.ru.field.FileButton', {
    override: 'Ext.field.FileButton',
    config: {
        text: 'Обзор...'
    }
});
Ext.define('SU.locale.ru.field.Number', {
    override: 'Ext.field.Number',

    minValueText: 'Минимальное значение для этого поля: {0}',
    maxValueText: 'Максимальное значение для этого поля: {0}',
    decimalsText: 'Максимальное количество десятичных знаков: {0}',
    badFormatMessage: 'Значение не является допустимым числом'
});
Ext.define('SU.locale.ru.field.Text', {
    override: 'Ext.field.Text',

    config: {
        badFormatMessage: 'Значение не соответствует требуемому формату'
    }
});
Ext.define('SU.locale.ru.grid.cell.Boolean', {
    override: 'Ext.grid.cell.Boolean',

    falseText: 'Нет',
    trueText: 'Да'
});
Ext.define('SU.locale.ru.grid.menu.Columns', {
    override: 'Ext.grid.menu.Columns',

    config: {
        text: 'Колонки'
    }
});
Ext.define('SU.locale.ru.grid.menu.GroupByThis', {
    override: 'Ext.grid.menu.GroupByThis',

    config: {
        text: 'Группировать по этому полю'
    }
});
Ext.define('SU.locale.ru.grid.menu.ShowInGroups', {
    override: 'Ext.grid.menu.ShowInGroups',

    config: {
        text: 'Показать в группах'
    }
});
Ext.define('SU.locale.ru.grid.menu.SortAsc', {
    override: 'Ext.grid.menu.SortAsc',

    config: {
        text: 'Сортировать по возрастанию'
    }
});
Ext.define('SU.locale.ru.grid.menu.SortDesc', {
    override: 'Ext.grid.menu.SortDesc',

    config: {
        text: 'Сортировать по убыванию'
    }
});
Ext.define('SU.locale.ru.menu.CheckItem', {
    override: 'Ext.menu.CheckItem',

    submenuText: '{0} подменю'
});
Ext.define('SU.locale.ru.panel.Collapser', {
    override: 'Ext.panel.Collapser',

    config: {
        collapseToolText: 'Свернуть',
        expandToolText: 'Развернуть'
    }
});
Ext.define('SU.locale.ru.panel.Date', {
    override: 'Ext.panel.Date',

    config: {
        dateCellFormat: {
            $value: 'j',
            cached: true
        },

        format: {
            $value: Ext.Date.defaultFormat,
            cached: true
        },

        headerFormat: {
            $value: 'D, M j Y',
            cached: true
        },

        nextText: 'Следующий месяц (Ctrl+Стрелка вправо)',

        prevText: 'Предыдущий месяц (Ctrl+Стрелка влево)',

        startDay: {
            $value: Ext.Date.firstDayOfWeek,
            cached: true
        },

        weekendDays: {
            $value: 1, //Ext.Date.weekendDays,
            cached: true
        },

        buttons: {
            footerTodayButton: {
                text: 'Сегодня',
                tabIndex: -1,
                hidden: true,
                weight: -20,
                handler: 'onTodayButtonClick',
                reference: 'footerTodayButton'
            },
            spacer: {
                xtype: 'component',
                weight: -10,
                flex: 1
            },
            ok: {
                tabIndex: -1,
                handler: 'onOkButtonClick'
            },
            cancel: {
                tabIndex: -1,
                handler: 'onCancelButtonClick'
            }
        }
    }
});
Ext.define('SU.locale.ru.picker.Date', {
    override: 'Ext.picker.Date',

    config: {
        monthText: 'Месяц',

        dayText: 'День',

        yearText: 'Год'
    }
});
Ext.define('SU.locale.ru.picker.Picker', {
    override: 'Ext.picker.Picker',

    applyDoneButton: function (config, oldButton) {
        if (config) {
            if (config === true) {
                config = {};
            }

            if (typeof config == 'string') {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'right',
                text: 'Готово'
            });
        }

        return Ext.factory(config, 'Ext.Button', oldButton);
    },

    applyCancelButton: function (config, oldButton) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == 'string') {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'left',
                text: 'Отмена'
            });
        }

        return Ext.factory(config, 'Ext.Button', oldButton);
    }
});
