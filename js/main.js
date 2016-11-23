/*
 * time estimation v0.1
 * A tool to calculate the estimated time to complete your tasks
 *
 * Copyright (c) 2016 - Tom Lutzenberger (lutzenbergerthomas at gmail dot com)
 * https://github.com/tomlutzenberger/time-estimation
 *
 * Released under the MIT license
 * https://github.com/tomlutzenberger/time-estimation/LICENSE
 * https://tomlutzenberger.github.io/time-estimation/
 */

/*globals $,document,console*/

function isNumeric(value) {

  'use strict';

  return !isNaN(parseFloat(value)) && isFinite(value);
}



function isValidValue(value) {

  'use strict';

  var isValid = false;

  if (isNumeric(value) && value > 0) {
    isValid = true;

  } else {
    console.error('Given value "' + value + '" is not a valid number.');
    isValid = false;
  }

  return isValid;
}



$(document).ready(function () {

  'use strict';

  $('.te').on('change', function () {
    var
      neutral = ($('.te-n').val() - 0),
      optimistic = ($('.te-o').val() - 0),
      pessimistic = ($('.te-p').val() - 0),
      result = null;

    if (isValidValue(optimistic) && isValidValue(neutral) && isValidValue(pessimistic)) {
      result = (optimistic + (4 * neutral) + pessimistic) / 6;
    }

    $('.result').text(result);
  });
});
