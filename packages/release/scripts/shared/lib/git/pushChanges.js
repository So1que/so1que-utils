const { promisifyExec } = require("../promisifyExec")
const { createGitCommand } = require("./createGitCommand")

const pushChanges = async () => {
  const branchCommand = createGitCommand("git rev-parse --abbrev-ref HEAD")

  const { stdout: branchName } = await promisifyExec(branchCommand)

  const pushCommand = createGitCommand(`git push origin ${branchName}`)

  await promisifyExec(pushCommand)

  console.info("Changes pushed \n")
}

module.exports = {
  pushChanges
}
