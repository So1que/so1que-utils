const inquirer = require("inquirer")

const { commitChanges } = require("../shared/lib/git/commitChanges")
const { pushChanges } = require("../shared/lib/git/pushChanges")
const { packageDir, isPackageDirExist } = require("../shared/constants/directory")

const commitMessage = "Create task changelogs"

const suggestSaveChangelogs = async () => {
  const { isCommitAndPushChangelogs } = await inquirer.prompt({
    type: "confirm",
    name: "isCommitAndPushChangelogs",
    message: "Commit and push changelogs?"
  })

  if (isCommitAndPushChangelogs) {
    const directory = isPackageDirExist ? `${packageDir}/changelogs/*` : "changelogs/*"
    await commitChanges(commitMessage, directory)

    await pushChanges()

    console.info("Changelogs committed and pushed")
  }
}

module.exports = {
  suggestSaveChangelogs
}
