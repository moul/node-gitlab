class Utils
  @parseProjectId: (projectId) =>
    if typeof projectId is "number"
      return projectId # Do nothing
    else if projectId.indexOf("/") isnt -1
      projectId = encodeURIComponent(projectId)
    else
      projectId = parseInt(projectId)

  @multiPageHandler: (params, fn, pageProducer) =>

    notify_fn = (err, items) =>
      if fn
        arity = fn.length
        switch arity
          when 1 then fn items
          when 2 then fn err, items
          when 3 then fn err, null, items

    data = []

    page_callback = (err, retData) =>
      if err
        return notify_fn(err)
      else if retData.length == params.per_page
        data = data.concat(retData)
        params.page++
        return pageProducer(params, page_callback)
      else
        data = data.concat(retData)
        return notify_fn(null, data)

    return pageProducer(params, page_callback)

module.exports = Utils
