const { taskUrlPrefix } = require("../shared/constants/urls")

const createTaskPrefix = (taskNumber) => `- [${taskNumber}](${taskUrlPrefix}${taskNumber})`

const fillRelease = ({ updatedVersion, packageUpdates }) => {
  const date = new Intl.DateTimeFormat("ru")
  const changedVersionDate = date.format(new Date())

  const readableReleaseContent = packageUpdates
    .filter(Boolean)
    .map(({ updates, taskNumber }) => `${createTaskPrefix(taskNumber)}\n${updates}`)
    .join("\n")

  const release = `## ${updatedVersion} - ${changedVersionDate}\n\n${readableReleaseContent}`

  return release
}

module.exports = { fillRelease }
