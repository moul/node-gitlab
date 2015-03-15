BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectRepository extends BaseModel

  # === Branches
  listBranches: (projectId, fn = null) =>
    @debug "Projects::listBranches()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/branches", fn

  showBranch: (projectId, branchId, fn = null) =>
    @debug "Projects::branch()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/branches/#{encodeURI branchId}", fn

  protectBranch: (projectId, branchId, fn = null) =>
    @debug "Projects::protectBranch()"
    @put "projects/#{Utils.parseProjectId projectId}/repository/branches/#{encodeURI branchId}/protect", null, fn

  unprotectBranch: (projectId, branchId, fn = null) =>
    @debug "Projects::unprotectBranch()"
    @put "projects/#{Utils.parseProjectId projectId}/repository/branches/#{encodeURI branchId}/unprotect", null, fn

  createBranch: (params = {}, fn = null) =>
    @debug "Projects::createBranch()", params
    @post "projects/#{Utils.parseProjectId params.projectId}/repository/branches", params, fn

  deleteBranch: (projectId, branchId, fn = null) =>
      @debug "Projects::deleteBranch()"
      @delete "projects/#{Utils.parseProjectId projectId}/repository/branches/#{encodeURI branchId}", fn

  # === Tags
  listTags: (projectId, fn = null) =>
    @debug "Projects::listTags()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/tags", fn

  # === Commits
  listCommits: (projectId, fn = null) =>
    @debug "Projects::listCommits()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/commits", fn

  showCommit: (projectId, commitId, fn = null) =>
    @debug "Projects::commit()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/branches/#{parseInt commitId}", fn

  diffCommit: (projectId, sha, fn = null) =>
    @debug "Projects::diffCommit()"
    @get "projects/#{Utils.parseProjectId projectId}/repository/branches/#{sha}", fn

  # === Tree
  listTree: (projectId, params = {}, fn = null) =>
    @debug "Projects::listTree()"
    if 'function' is typeof(params)
      fn = params
      params = {}
    @get "projects/#{Utils.parseProjectId projectId}/repository/tree", params, fn

  # == Files
  showFile: (projectId, params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = projectId
    else
      params.projectId = projectId

    @debug "Projects::showFile()", params
    if params.file_path and params.ref
      @get "projects/#{Utils.parseProjectId params.projectId}/repository/files", params, fn

  createFile: (params = {}, fn = null) =>
    @debug "Projects::createFile()", params
    @post "projects/#{Utils.parseProjectId params.projectId}/repository/files", params, fn

  updateFile: (params = {}, fn = null) =>
    @debug "Projects::updateFile()", params
    @put "projects/#{Utils.parseProjectId params.projectId}/repository/files", params, fn

  ## TODO:
  # - Raw file content
  # - Raw blob content
  # - Get file archive
  # - Delete existing file in repository

module.exports = (client) -> new ProjectRepository client
