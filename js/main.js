/*!
 * Time Estimation v0.1
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
    console.error('Given value "' + value + '" is not a valid number.');
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
    n: parseFloat($('.te-n').val()),
    o: parseFloat($('.te-o').val()),
    p: parseFloat($('.te-p').val())
  };
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
  }

  $('.result-mu').text(resultMu.toFixed(2));
  $('.result-sigma').text(resultSigma.toFixed(2));
}



function resetResult() {

  'use strict';

  $('.result-mu').text('');
  $('.result-sigma').text('');
}



$(document).ready(function () {

  'use strict';

  $('.te').on('change', function () {

    if (isFormComplete()) {
      calculateResult();

    } else {
      resetResult();
    }

  });
});
