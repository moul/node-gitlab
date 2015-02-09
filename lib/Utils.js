(function() {
  var Utils;

  Utils = (function() {
    function Utils() {}

    Utils.parseProjectId = function(projectId) {
      if (typeof projectId === "number") {
        return projectId;
      } else if (projectId.indexOf("/") !== -1) {
        return projectId = encodeURIComponent(projectId);
      } else {
        return projectId = parseInt(projectId);
      }
    };

    return Utils;

  })();

  module.exports = Utils;

}).call(this);
