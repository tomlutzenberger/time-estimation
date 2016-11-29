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



$(document).ready(function () {

  'use strict';

  $('.te').on('change', function () {
    if (isFormComplete()) {
      var
        neutral = parseFloat($('.te-n').val()),
        optimistic = parseFloat($('.te-o').val()),
        pessimistic = parseFloat($('.te-p').val()),
        resultMu = null,
        resultSigma = null;

      if (isValidValue(optimistic) && isValidValue(neutral) && isValidValue(pessimistic)) {
        resultMu = (optimistic + (4 * neutral) + pessimistic) / 6;
        resultSigma = (pessimistic - optimistic) / 6;
      }

      $('.result-mu').text(resultMu.toFixed(2));
      $('.result-sigma').text(resultSigma.toFixed(2));
    } else {
      $('.result-mu').text('');
      $('.result-sigma').text('');
    }
  });
});
