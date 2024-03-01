const inquirer = require("inquirer")

const { validatePromptLength } = require("../shared/validate/promptLength")
const { predictBranchInfo } = require("../shared/lib/predictBranchInfo")

const { createChangelogs } = require("./createChangelogs")
const { fillChangelogs } = require("./fillChangelogs")
const { suggestSaveChangelogs } = require("./suggestSaveChangelogs")

const createTaskChangelog = async () => {
  const branchInfo = await predictBranchInfo()

  const { selectedTaskNumber } = await inquirer.prompt([
    {
      name: "selectedTaskNumber",
      message: `Write your task number: `,
      default: branchInfo.number,
      validate: (input) => {
        return validatePromptLength({
          input,
          errorMessage: `Write your correct task number`
        })
      }
    }
  ])

  const updates = await fillChangelogs()

  await createChangelogs({ selectedTaskNumber: selectedTaskNumber.trim(), updates })

  if (updates.length > 0) {
    await suggestSaveChangelogs()
  }
}

module.exports = { createTaskChangelog }
