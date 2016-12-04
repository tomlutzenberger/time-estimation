/*!
 * Time Estimation v0.3
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

function isValidValue(value) {

    'use strict';

    var isValid = false;

    if (value > 0) {
        isValid = true;

    } else {
        console.warn('Given value "' + value + '" is not a valid number.');
        isValid = false;
    }

    return isValid;
}



function isFormComplete() {

    'use strict';

    if ($('.te-n').val() !== '' && $('.te-o').val() !== '' && $('.te-p').val() !== '') {
        return true;
    } else {
        return false;
    }
}



function getValues() {

    'use strict';

    return {
        title: $('.te-title').val(),
        n: parseFloat($('.te-n').val()),
        o: parseFloat($('.te-o').val()),
        p: parseFloat($('.te-p').val())
    };
}



function updateUrlParams() {

    'use strict';

    var
        values = getValues(),
        urlParams = '?title=' + encodeURIComponent(values.title) + '&o=' + values.o + '&n=' + values.n + '&p=' + values.p;

    history.pushState(null, null, urlParams);
}



function getUrlParams() {

    'use strict';

    var
        regex = new RegExp('\\?(.*)', 'i'),
        urlParams = regex.exec(location.search),
        params = [],
        p = null,
        param = null;

    if (urlParams !== null && urlParams.length > 1) {
        params = urlParams[1].split('&');

        for (p in params) {
            if (params.hasOwnProperty(p)) {
                param = params[p].split('=');

                $('.te-' + param[0].toLowerCase()).val(decodeURIComponent(param[1]));
            }
        }

        return true;

    } else {

        console.info('No URL parameters to read');
        return false;

    }
}



function calculateResult() {

    'use strict';

    var
        values = getValues(),
        resultMu = null,
        resultSigma = null;

    if (isValidValue(values.o) && isValidValue(values.n) && isValidValue(values.p)) {
        resultMu = (values.o + (4 * values.n) + values.p) / 6;
        resultSigma = (values.p - values.o) / 6;

        $('.result-mu').text(resultMu.toFixed(2));
        $('.result-sigma').text(resultSigma.toFixed(2));

    } else {
        resetResult();
    }
}



function resetResult() {

    'use strict';

    $('.result-mu').text('');
    $('.result-sigma').text('');
}



$(document).ready(function () {

    'use strict';

    if (getUrlParams()) {
        calculateResult();
    }

    $('.te').on('change', function () {

        if (isFormComplete()) {
            calculateResult();
            updateUrlParams();

        } else {
            resetResult();
        }
    });
});
