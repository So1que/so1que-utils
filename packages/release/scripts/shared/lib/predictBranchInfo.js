const { promisifyExec } = require("./promisifyExec")
const { createBranchInfo } = require("./createBranchInfo")

const predictBranchInfo = async () => {
  const { stdout: branchName } = await promisifyExec("git rev-parse --abbrev-ref HEAD")

  return createBranchInfo(branchName)
}

module.exports = { predictBranchInfo }
