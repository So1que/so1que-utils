const { promisifyExec } = require("../promisifyExec")
const { createGitCommand } = require("./createGitCommand")

const commitChanges = async (commitMessage, changes = ".") => {
  const gitAddCommand = createGitCommand(`git add ${changes} && git commit -m '${commitMessage}'`)

  await promisifyExec(gitAddCommand)

  console.info("Changes committed \n")
}

module.exports = {
  commitChanges
}
