class Utils
  @parseProjectId: (projectId) =>
    if typeof projectId is "number"
      return projectId # Do nothing
    else if projectId.indexOf("/") isnt -1
      projectId = encodeURIComponent(projectId)
    else
      projectId = parseInt(projectId)

module.exports = Utils
