
Ext.onReady(function () {

    if (Ext.data && Ext.data.Types) {
        Ext.data.Types.stripRe = /[\$,%]/g;
    }

    if (Ext.Date) {
        Ext.Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        Ext.Date.getShortMonthName = function (month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            January: 0,
            Jan: 0,
            February: 1,
            Feb: 1,
            March: 2,
            Mar: 2,
            April: 3,
            Apr: 3,
            May: 4,
            June: 5,
            Jun: 5,
            July: 6,
            Jul: 6,
            August: 7,
            Aug: 7,
            September: 8,
            Sep: 8,
            October: 9,
            Oct: 9,
            November: 10,
            Nov: 10,
            December: 11,
            Dec: 11
        };

        Ext.Date.getMonthNumber = function (name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        Ext.Date.getShortDayName = function (day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";

        Ext.Date.firstDayOfWeek = 0;
        Ext.Date.weekendDays = [6, 0];
    }

});


Ext.define("SU.locale.en.Error", {
    override: "SU.Error",
    statics: {
        locales: {
            DOM_UNKNOWN: "Unknown Exception Code ({0})",
            DOM_INDEX_SIZE_ERR: "Index out of bounds",
            DOM_STRING_SIZE_ERR: "The resulting string is too long to fit in a DOMString",
            DOM_HIERARCHY_REQUEST_ERR: "The Node can not be inserted at this location",
            DOM_WRONG_DOCUMENT_ERR: "The source and the destination Documents are not the same",
            DOM_INVALID_CHARACTER_ERR: "The string contains an invalid character",
            DOM_NO_DATA_ALLOWED_ERR: "This Node / NodeList does not support data",
            DOM_NO_MODIFICATION_ALLOWED_ERR: "This object cannot be modified",
            DOM_NOT_FOUND_ERR: "The item cannot be found",
            DOM_NOT_SUPPORTED_ERR: "This implementation does not support function",
            DOM_INUSE_ATTRIBUTE_ERR: "The Attribute has already been assigned to another Element",
            DOM_INVALID_STATE_ERR: "The object is no longer usable",
            DOM_SYNTAX_ERR: "An invalid or illegal string was specified",
            DOM_INVALID_MODIFICATION_ERR: "Cannot change the type of the object",
            DOM_NAMESPACE_ERR: "The namespace declaration is incorrect",
            DOM_INVALID_ACCESS_ERR: "The object does not support this function",
            DOM_VALIDATION_ERR: "The operation would cause the node to fail validation.",
            DOM_TYPE_MISMATCH_ERR: "The node type is incompatible with the expected parameter type.",
            DOM_SECURITY_ERR: "The operation is not allowed due to same origin policy restriction.",
            DOM_NETWORK_ERR: "A network error occurred.",
            DOM_ABORT_ERR: "The user aborted an operation.",
            DOM_URL_MISMATCH_ERR: "The specified URL does not match.",
            DOM_QUOTA_EXCEEDED_ERR: "The operation would exceed storage limits."
        }
    }
});
Ext.define("SU.locale.en.WebSocketError", {
    override: "SU.WebSocketError",
    statics: {
        locales: {
            ALREADY_ESTABLISHED: "The connection is already established.",
            NOT_CONNECTED: "The connection is not established.",
            CAN_NOT_CONNECT: "Can not connect to {0}",
            DISCONNECT: "Connecting to {0} has been interrupted.",
            INVALID_SCHEME: "Invalid schema '{0}' for WebSocket",
            INVALID_ADDRESS: "Invalid address '{0}' for WebSocket",
            LOGIN_NOT_DEFINED: "Not defined for automatic login user authorization.",
            LOGIN_ERROR: "Login failed (Code {0}).\n\n{1}",
            LOGIN_CUSTOM: "Invalid username or password.",
            LOGIN_UNKNOWN: "Username or password unidentified.",
            LOGIN_INV_METHOD: "Authorization is prohibited by the system administrator.",
            AUTHORIZE_ERROR: "Runtime error authorization request."
        }
    }
});
Ext.define("SU.locale.en.data.validator.Bound", {
    override: "Ext.data.validator.Bound",
    config: {
        emptyMessage: "Must be present"
    }
});

Ext.define("SU.locale.en.data.validator.Email", {
    override: "Ext.data.validator.Email",
    config: {
        message: "Is not a valid email address"
    }
});

Ext.define("SU.locale.en.data.validator.Exclusion", {
    override: "Ext.data.validator.Exclusion",
    config: {
        message: "Is a value that has been excluded"
    }
});

Ext.define("SU.locale.en.data.validator.Format", {
    override: "Ext.data.validator.Format",
    config: {
        message: "Is in the wrong format"
    }
});

Ext.define("SU.locale.en.data.validator.Inclusion", {
    override: "Ext.data.validator.Inclusion",
    config: {
        message: "Is not in the list of acceptable values"
    }
});

Ext.define("SU.locale.en.data.validator.Length", {
    override: "Ext.data.validator.Length",
    config: {
        minOnlyMessage: "Length must be at least {0}",
        maxOnlyMessage: "Length must be no more than {0}",
        bothMessage: "Length must be between {0} and {1}"
    }
});

Ext.define('SU.locale.en.data.validator.Phone', {
    override: 'Ext.data.validator.Phone',

    config: {
        message: 'Is not a valid phone number'
    }
});

Ext.define("SU.locale.en.data.validator.Presence", {
    override: "Ext.data.validator.Presence",
    config: {
        message: "Must be present"
    }
});

Ext.define("SU.locale.en.data.validator.Range", {
    override: "Ext.data.validator.Range",
    config: {
        minOnlyMessage: "Must be must be at least {0}",
        maxOnlyMessage: "Must be no more than than {0}",
        bothMessage: "Must be between {0} and {1}",
        nanMessage: "Must be numeric"
    }
});

Ext.define('SU.locale.en.data.validator.Url', {
    override: 'Ext.data.validator.Url',

    config: {
        message: 'Is not a valid URL'
    }
});

Ext.onReady(function () {

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ',',
            decimalSeparator: '.',
            currencySign: '$',
            dateFormat: 'm/d/Y'
        });
    }
});

Ext.define('SU.locale.en.ErrorDialog', {
    override: 'SU.ErrorDialog',

    textOk: 'Ok',
    textAdvansed: 'Advanced',
    textErrorTitle: 'Sorry, something went wrong',
    textErrorNumber: 'Error {0} of {1}'
});

Ext.define('SU.locale.en.LoadMask', {
    override: 'Ext.LoadMask',

    config: {
        message: 'Loading...'
    }
});

Ext.define('SU.locale.en.Panel', {
    override: 'Ext.Panel',

    config: {
        standardButtons: {
            ok: { text: 'OK' },
            abort: { text: 'Abort' },
            retry: { text: 'Retry' },
            ignore: { text: 'Ignore' },
            yes: { text: 'Yes' },
            no: { text: 'No' },
            cancel: {text: 'Cancel' },
            apply: { text: 'Apply' },
            save: { text: 'Save' },
            submit: { text: 'Submit' },
            help: { text: 'Help' },
            close: { text: 'Close' }
        },

        closeToolText: 'Close panel'
    }
});

Ext.define("SU.locale.en.dataview.Abstract", {
    override: "Ext.dataview.Abstract",
    
    config: {
        loadingText: 'Loading...'
    }
});

Ext.define('SU.locale.en.dataview.EmptyText', {
    override: 'Ext.dataview.EmptyText',

    config: {
        html: 'No data to display'
    }
});

Ext.define("SU.locale.en.dataview.plugin.ListPaging", {
    override: "Ext.dataview.plugin.ListPaging",

    config: {
        loadMoreText: 'Load More...',
        noMoreRecordsText: 'No More Records'
    }
});

Ext.define("SU.locale.en.dataview.pullrefresh.Bar", {
    override: "Ext.dataview.pullrefresh.Bar",

    lastUpdatedDateFormat: 'm/d/Y h:iA',
    lastUpdatedText: 'Last Updated:\xA0',
    loadedText: 'Loaded.',
    loadingText: 'Loading...',
    pullText: 'Pull down to refresh...',
    releaseText: 'Release to refresh...'

});

Ext.define('SU.locale.en.field.Date', {
    override: 'Ext.field.Date',

    config: {
        minDateMessage: 'The date in this field must be equal to or after {0}',
        maxDateMessage: 'The date in this field must be equal to or before {0}'
    }
});

Ext.define('SU.locale.en.field.Field', {
    override: 'Ext.field.Field',

    config: {
        requiredMessage: 'This field is required',
        validationMessage: 'Is in the wrong format'
    }

});

Ext.define('SU.locale.en.field.FileButton', {
    override: 'Ext.field.FileButton',

    config: {
        text: 'Browse...'
    }
});

Ext.define('SU.locale.en.field.Number', {
    override: 'Ext.field.Number',

    minValueText: 'The minimum value for this field is {0}',
    maxValueText: 'The maximum value for this field is {0}',
    decimalsText: 'The maximum decimal places is {0}',
    badFormatMessage: 'Value is not a valid number'
});

Ext.define('SU.locale.en.field.Text', {
    override: 'Ext.field.Text',

    config: {
        badFormatMessage: 'Value does not match the required format'
    }

});

Ext.define("SU.locale.en.grid.cell.Boolean", {
    override: "Ext.grid.cell.Boolean",

    falseText: 'False',
    trueText: 'True'

});

Ext.define("SU.locale.en.grid.menu.Columns", {
    override: "Ext.grid.menu.Columns",

    config: {
        text: 'Columns'
    }
});

Ext.define("SU.locale.en.grid.menu.GroupByThis", {
    override: "Ext.grid.menu.GroupByThis",

    config: {
        text: 'Group by this field'
    }

});

Ext.define("SU.locale.en.grid.menu.ShowInGroups", {
    override: "Ext.grid.menu.ShowInGroups",

    config: {
        text: 'Show in groups'
    }
});

Ext.define("SU.locale.en.grid.menu.SortAsc", {
    override: "Ext.grid.menu.SortAsc",

    config: {
        text: 'Sort Ascending'
    }

});

Ext.define("SU.locale.en.grid.menu.SortDesc", {
    override: "Ext.grid.menu.SortDesc",

    config: {
        text: 'Sort Descending'
    }

});

Ext.define("SU.locale.en.menu.CheckItem", {
    override: "Ext.menu.CheckItem",

    submenuText: '{0} submenu'

});

Ext.define('SU.locale.en.panel.Collapser', {
    override: 'Ext.panel.Collapser',

    config: {
        collapseToolText: 'Collapse panel',
        expandToolText: 'Expand panel'
    }
});

Ext.define('SU.locale.en.panel.Date', {
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

        nextText: 'Next Month (Control+Right)',

        prevText: 'Previous Month (Control+Left)',

        startDay: {
            $value: Ext.Date.firstDayOfWeek,
            cached: true
        },

        weekendDays: {
            $value: Ext.Date.weekendDays,
            cached: true
        },

        buttons: {
            footerTodayButton: {
                text: 'Today',
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

Ext.define('SU.locale.en.picker.Date', {
    override: 'Ext.picker.Date',

    config: {

        monthText: 'Month',

        dayText: 'Day',

        yearText: 'Year'

    }

});

Ext.define('SU.locale.en.picker.Picker', {
    override: 'Ext.picker.Picker',

    applyDoneButton: function (config, oldButton) {
        if (config) {
            if (config === true) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'right',
                text: 'Done'
            });
        }

        return Ext.factory(config, 'Ext.Button', oldButton);
    },

    applyCancelButton: function (config, oldButton) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'left',
                text: 'Cancel'
            });
        }

        return Ext.factory(config, 'Ext.Button', oldButton);
    }

});
