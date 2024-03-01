const inquirer = require("inquirer")

const { validatePromptLength } = require("../shared/validate/promptLength")
const { semverVersions } = require("../shared/constants/semverVersions")

const fillChangelogs = async () => {
  const { fillChangelogs } = await inquirer.prompt({
    name: "fillChangelogs",
    type: "list",
    message: 'Do you want to fill changes? You can then fill in on your own in directory "changelogs/*"',
    choices: ["Yes", "No"]
  })

  const typesUpdates = []

  if (fillChangelogs === "Yes") {
    const { updatedTypes } = await inquirer.prompt({
      name: "updatedTypes",
      type: "checkbox",
      message: `Select update types (use Space key for select)`,
      choices: [semverVersions.patch, semverVersions.minor, semverVersions.major],
      validate: (input) =>
        validatePromptLength({
          input,
          errorMessage: "Select at least one update type (use Space key for select)"
        })
    })

    for (const updatedType of updatedTypes) {
      const { update } = await inquirer.prompt({
        name: "update",
        message: `${updatedType}: write your changes`,
        validate: (input) =>
          validatePromptLength({
            input,
            errorMessage: "Write something about your changes!"
          })
      })

      typesUpdates.push({
        updatedType,
        update: update.trim()
      })
    }
  }

  return typesUpdates
}

module.exports = { fillChangelogs }
