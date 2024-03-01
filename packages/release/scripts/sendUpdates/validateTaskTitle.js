const { urlRegex } = require("../shared/constants/regex")
const { taskUrlPrefix } = require("../shared/constants/urls")

const validateTaskTitle = (text) => {
  const taskUrl = text.match(urlRegex)

  if (!taskUrl) {
    return false
  }

  const urlWithoutLessSymbols = taskUrl[0].replace(")", "")
  const taskNumber = urlWithoutLessSymbols.replace(taskUrlPrefix, "")

  return `- [${taskNumber}](${urlWithoutLessSymbols})` === text.trim()
}

module.exports = { validateTaskTitle }
