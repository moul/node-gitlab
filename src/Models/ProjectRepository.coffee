BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectRepository extends BaseModel

  # === Branches
  listBranches: (projectId, fn = null) =>
    @debug "Projects::listBranches()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/branches", (data) => fn data if fn

  showBranch: (projectId, branchId, fn = null) =>
    @debug "Projects::branch()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/branches/#{encodeURI branchId}", (data) => fn data if fn

  protectBranch: (projectId, branchId, params = {}, fn = null) =>
    @debug "Projects::protectBranch()"
    @put "projects/#{Utils.parseProjectId projectId}/repository/branches/#{encodeURI branchId}/protect", params, (data) => fn data if fn

  unprotectBranch: (projectId, branchId, fn = null) =>
    @debug "Projects::unprotectBranch()"
    @put "projects/#{Utils.parseProjectId projectId}/repository/branches/#{encodeURI branchId}/unprotect", null, (data) => fn data if fn

  createBranch: (params = {}, fn = null) =>
    @debug "Projects::createBranch()", params
    @post "projects/#{Utils.parseProjectId params.projectId}/repository/branches", params, (data) => fn data if fn

  deleteBranch: (projectId, branchId, fn = null) =>
      @debug "Projects::deleteBranch()"
      @delete "projects/#{Utils.parseProjectId projectId}/repository/branches/#{encodeURI branchId}", (data) => fn data if fn

  # === Tags
  addTag: (params = {}, fn = null) =>
    @debug "Projects::addTag()"
    @post "projects/#{Utils.parseProjectId params.id}/repository/tags", params, (data) => fn data if fn

  deleteTag: (projectId, tagName, fn = null) =>
    @debug "Projects::deleteTag()"
    @delete "projects/#{Utils.parseProjectId projectId}/repository/tags/#{encodeURI tagName}", (data) => fn data if fn

  showTag: (projectId, tagName, fn = null) =>
    @debug "Projects::showTag()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/tags/#{encodeURI tagName}", (data) => fn data if fn

  listTags: (projectId, fn = null) =>
    @debug "Projects::listTags()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/tags", (data) => fn data if fn

  # === Commits
  listCommits: (projectId, fn = null) =>
    @debug "Projects::listCommits()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/commits", (data) => fn data if fn

  showCommit: (projectId, sha, fn = null) =>
    @debug "Projects::commit()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/commits/#{sha}", (data) => fn data if fn

  diffCommit: (projectId, sha, fn = null) =>
    @debug "Projects::diffCommit()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/commits/#{sha}/diff", (data) => fn data if fn

  # === Tree
  listTree: (projectId, params = {}, fn = null) =>
    @debug "Projects::listTree()"
    if 'function' is typeof(params)
      fn = params
      params = {}
    @get "projects/#{Utils.parseProjectId projectId}/repository/tree", params, (data) => fn data if fn

  # == Files
  showFile: (projectId, params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = projectId
    else
      params.projectId = projectId

    @debug "Projects::showFile()", params
    if params.file_path and params.ref
      @get "projects/#{Utils.parseProjectId params.projectId}/repository/files", params, (data) => fn data if fn
    else if params.file_path and params.file_id
      @get "projects/#{Utils.parseProjectId params.projectId}/repository/raw_blobs/" + params.file_id, params, (data) => fn data if fn

  createFile: (params = {}, fn = null) =>
    @debug "Projects::createFile()", params
    @post "projects/#{Utils.parseProjectId params.projectId}/repository/files", params, (data) => fn data if fn

  updateFile: (params = {}, fn = null) =>
    @debug "Projects::updateFile()", params
    @put "projects/#{Utils.parseProjectId params.projectId}/repository/files", params, (data) => fn data if fn

  compare: (params = {}, fn = null) =>
    @debug "Projects::compare()", params
    @get "projects/#{Utils.parseProjectId params.projectId}/repository/compare", params, (data) => fn data if fn

  ## TODO:
  # - Raw file content
  # - Raw blob content
  # - Get file archive
  # - Delete existing file in repository

module.exports = (client) -> new ProjectRepository client
