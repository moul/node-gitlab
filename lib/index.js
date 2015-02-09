(function() {
  var ApiV3;

  ApiV3 = require('./ApiV3').ApiV3;

  module.exports = function(options) {
    return new ApiV3(options);
  };

  module.exports.ApiV3 = ApiV3;

}).call(this);
