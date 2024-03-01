const { createUrlsAbsolutePath } = require("./createUrlsAbsolutePath")
const { validateTaskTitle } = require("./validateTaskTitle")

const formatReleaseInfo = ({ releaseInfo, developUrl }) => {
  const parsed = releaseInfo.map((releasePart) => {
    const withFormattedLinks = createUrlsAbsolutePath({ text: releasePart, developUrl })

    if (validateTaskTitle(releasePart)) {
      const taskTitle = withFormattedLinks.replace("- ", "")

      return taskTitle
    }

    return withFormattedLinks
  })

  const formatted = parsed.join("\n")

  return formatted
}

module.exports = { formatReleaseInfo }
