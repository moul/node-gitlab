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

    Utils.multiPageHandler = function(params, fn, pageProducer) {
      var data, notify_fn, page_callback;
      notify_fn = function(err, items) {
        var arity;
        if (fn) {
          arity = fn.length;
          switch (arity) {
            case 1:
              return fn(items);
            case 2:
              return fn(err, items);
            case 3:
              return fn(err, null, items);
          }
        }
      };
      data = [];
      page_callback = function(err, retData) {
        if (err) {
          return notify_fn(err);
        } else if (retData.length === params.per_page) {
          data = data.concat(retData);
          params.page++;
          return pageProducer(params, page_callback);
        } else {
          data = data.concat(retData);
          return notify_fn(null, data);
        }
      };
      return pageProducer(params, page_callback);
    };

    return Utils;

  })();

  module.exports = Utils;

}).call(this);
