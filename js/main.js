/*!
 * Time Estimation v0.4
 * Calculate your tasks with PERT
 *
 * Copyright (c) 2016 - Tom Lutzenberger (lutzenbergerthomas at gmail dot com)
 * https://github.com/tomlutzenberger/time-estimation
 *
 * Released under the MIT license
 * https://github.com/tomlutzenberger/time-estimation/LICENSE
 * https://tomlutzenberger.github.io/time-estimation/
 */

/*globals $,document,console*/

function TimeEstimation() {

    'use strict';

    this.n = null;
    this.o = null;
    this.p = null;
    this.title = null;
    this.resultMu = null;
    this.resultSigma = null;
}



TimeEstimation.prototype = {

    constructor: TimeEstimation,



    isValidValue: function (value) {

        'use strict';

        var isValid = false;

        if (value !== '' && value > 0) {
            isValid = true;
        } else {
            console.warn('Given value "' + value + '" is not a valid number.');
            isValid = false;
        }

        return isValid;
    },



    isFormComplete: function () {

        'use strict';

        if (this.isValidValue(this.o) && this.isValidValue(this.n) && this.isValidValue(this.p)) {
            return true;
        } else {
            return false;
        }
    },



    getValues: function () {

        'use strict';

        this.title = $('.te-title').val();
        this.n = parseFloat($('.te-n').val());
        this.o = parseFloat($('.te-o').val());
        this.p = parseFloat($('.te-p').val());
    },



    setValues: function () {

        'use strict';

        $('.te-title').val(this.title);
        $('.te-n').val(this.n);
        $('.te-o').val(this.o);
        $('.te-p').val(this.p);
    },



    parseUrlParams: function () {

        'use strict';

        var
            urlPattern = new RegExp('\\?(.*)', 'i'),
            urlParamString = urlPattern.exec(location.search);

        if (urlParamString !== null && urlParamString.length > 1) {
            return urlParamString[1].split('&');
        } else {
            return false;
        }
    },



    getUrlParams: function () {

        'use strict';

        var
            params = this.parseUrlParams(),
            p = null,
            param = null;

        if (params !== false) {
            for (p in params) {
                if (params.hasOwnProperty(p)) {

                    param = params[p].split('=');
                    this[param[0].toLowerCase()] = decodeURIComponent(param[1]);
                }
            }

            this.setValues();

            return true;

        } else {
            console.info('No URL parameters to read');
            return false;
        }
    },



    setUrlParams: function () {

        'use strict';

        var
            paramString = '?title=' + encodeURIComponent(this.title) + '&o=' + this.o + '&n=' + this.n + '&p=' + this.p;

        history.pushState(null, null, paramString);
    },



    calculateResult: function () {

        'use strict';

        this.resultMu = (this.o + (4 * this.n) + this.p) / 6;
        this.resultSigma = (this.p - this.o) / 6;
    },



    setResult: function () {

        'use strict';

        $('.result-mu').text(this.resultMu.toFixed(2));
        $('.result-sigma').text(this.resultSigma.toFixed(2));
    },



    unsetResult: function () {

        'use strict';

        $('.result-mu').text('');
        $('.result-sigma').text('');
    }
};



$(document).ready(function () {

    'use strict';

    var te = new TimeEstimation();

    if (te.getUrlParams()) {
        te.calculateResult();
        te.setResult();
    }

    $('.te').on('change', function () {

        te.getValues();

        if (te.isFormComplete()) {
            te.calculateResult();
            te.setResult();
            te.setUrlParams();

        } else {
            te.unsetResult();
        }
    });
});
