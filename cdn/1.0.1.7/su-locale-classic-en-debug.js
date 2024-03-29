
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

Ext.define("SU.locale.en.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: "Please Wait..."
});

Ext.define("SU.locale.en.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    blankText: "You must select at least one item in this group"
});
Ext.define("SU.locale.en.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    blankText: "You must select one item in this group"
});
Ext.define("SU.locale.en.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "The value in this field is invalid"
});

Ext.define("SU.locale.en.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function () {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Loading..."
    });
});

Ext.define("SU.locale.en.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Disabled",
    disabledDatesText: "Disabled",
    minText: "The date in this field must be after {0}",
    maxText: "The date in this field must be before {0}",
    invalidText: "{0} is not a valid date - it must be in the format {1}",
    format: "m/d/y",
    altFormats: "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
});

Ext.define("SU.locale.en.form.field.File", {
    override: "Ext.form.field.File",
    buttonText: "Browse..."
});

Ext.define("SU.locale.en.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Please enter the URL for the link:'
}, function () {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Bold (Ctrl+B)',
                text: 'Make the selected text bold.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Italic (Ctrl+I)',
                text: 'Make the selected text italic.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Underline (Ctrl+U)',
                text: 'Underline the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Grow Text',
                text: 'Increase the font size.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Shrink Text',
                text: 'Decrease the font size.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Text Highlight Color',
                text: 'Change the background color of the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Font Color',
                text: 'Change the color of the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Align Text Left',
                text: 'Align text to the left.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Center Text',
                text: 'Center text in the editor.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Align Text Right',
                text: 'Align text to the right.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Bullet List',
                text: 'Start a bulleted list.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Numbered List',
                text: 'Start a numbered list.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Hyperlink',
                text: 'Make the selected text a hyperlink.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Source Edit',
                text: 'Switch to source editing mode.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});


Ext.define("SU.locale.en.form.field.Number", {
    override: "Ext.form.field.Number",
    decimalPrecision: 2,
    minText: "The minimum value for this field is {0}",
    maxText: "The maximum value for this field is {0}",
    nanText: "{0} is not a valid number"
});

Ext.define("SU.locale.en.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "The minimum length for this field is {0}",
    maxLengthText: "The maximum length for this field is {0}",
    blankText: "This field is required",
    regexText: "",
    emptyText: null
});

Ext.define("SU.locale.en.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: "The time in this field must be equal to or after {0}",
    maxText: "The time in this field must be equal to or before {0}",
    invalidText: "{0} is not a valid time",
    format: "g:i A",
    altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
});
Ext.define("SU.locale.en.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'This field should be an e-mail address in the format "user@example.com"',
    urlText: 'This field should be a URL in the format "http:/' + '/www.example.com"',
    alphaText: 'This field should only contain letters and _',
    alphanumText: 'This field should only contain letters, numbers and _'
});

Ext.define("SU.locale.en.grid.BooleanColumn", {
    override: "Ext.grid.BooleanColumn",
    trueText: "true",
    falseText: "false",
    undefinedText: '&#160;'
});

Ext.define("SU.locale.en.grid.DateColumn", {
    override: "Ext.grid.DateColumn",
    format: 'm/d/Y'
});

Ext.define("SU.locale.en.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(None)',
    groupByText: 'Group by this field',
    showGroupsText: 'Show in Groups'
});

Ext.define("SU.locale.en.grid.NumberColumn", {
    override: "Ext.grid.NumberColumn",
    format: '0,000.00'
});

Ext.define("SU.locale.en.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Name",
    valueText: "Value",
    dateFormat: "m/j/Y",
    trueText: "true",
    falseText: "false"
});

Ext.define("SU.locale.en.grid.filters.Filters", {
    override: "Ext.grid.filters.Filters",
    menuFilterText: "Filters"
});


Ext.define("SU.locale.en.grid.filters.filter.Boolean", {
    override: "Ext.grid.filters.filter.Boolean",
    yesText: "Yes",
    noText: "No"
});


Ext.define("SU.locale.en.grid.filters.filter.Date", {
    override: "Ext.grid.filters.filter.Date",
    fields: {
        lt: { text: 'Before' },
        gt: { text: 'After' },
        eq: { text: 'On' }
    },
    // Defaults to Ext.Date.defaultFormat
    dateFormat: null
});


Ext.define("SU.locale.en.grid.filters.filter.List", {
    override: "Ext.grid.filters.filter.List",
    loadingText: "Loading..."
});


Ext.define("SU.locale.en.grid.filters.filter.Number", {
    override: "Ext.grid.filters.filter.Number",
    emptyText: "Enter Number..."
});


Ext.define("SU.locale.en.grid.filters.filter.String", {
    override: "Ext.grid.filters.filter.String",
    emptyText: "Enter Filter Text..."
});


Ext.define("SU.locale.en.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Sort Ascending",
    sortDescText: "Sort Descending",
    columnsText: "Columns"
});


Ext.define("SU.locale.en.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} selected row{1}"
});

Ext.define("SU.locale.en.panel.Panel", {
    override: "Ext.panel.Panel",

    closeToolText: 'Close panel',
    collapseToolText: 'Collapse panel',
    expandToolText: 'Expand panel'

});

Ext.define("SU.locale.en.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Today",
    minText: "This date is before the minimum date",
    maxText: "This date is after the maximum date",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Next Month (Control+Right)',
    prevText: 'Previous Month (Control+Left)',
    monthYearText: 'Choose a month (Control+Up/Down to move years)',
    todayTip: "{0} (Spacebar)",
    format: "m/d/y",
    startDay: 0
});

Ext.define("SU.locale.en.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Cancel"
});
Ext.define("SU.locale.en.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "removable"
});

Ext.define("SU.locale.en.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Page",
    afterPageText: "of {0}",
    firstText: "First Page",
    prevText: "Previous Page",
    nextText: "Next Page",
    lastText: "Last Page",
    refreshText: "Refresh",
    displayMsg: "Displaying {0} - {1} of {2}",
    emptyMsg: 'No data to display'
});

// changing the msg text below will affect the LoadMask
Ext.define("SU.locale.en.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Loading..."
});

Ext.define("SU.locale.en.view.MultiSelector", {
    override: 'Ext.view.MultiSelector',
    emptyText: 'Nothing selected',
    removeRowTip: 'Remove this item',
    addToolText: 'Search for items to add'
});

Ext.define("SU.locale.en.view.MultiSelectorSearch", {
    override: 'Ext.view.MultiSelectorSearch',
    searchText: 'Search...'
});


Ext.define("SU.locale.en.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});


Ext.define("SU.locale.en.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Cancel",
        yes: "Yes",
        no: "No"
    }
});
