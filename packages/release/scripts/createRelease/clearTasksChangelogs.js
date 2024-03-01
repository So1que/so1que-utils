const { readdirSync, unlinkSync } = require("fs")

const { createTaskChangelogPath } = require("../shared/lib/paths")

const clearTasksChangelogs = () => {
  const packageChangelogsPath = createTaskChangelogPath()

  const packageChangelogsFiles = readdirSync(packageChangelogsPath)

  packageChangelogsFiles.forEach((file) => unlinkSync(`${packageChangelogsPath}/${file}`))
}

module.exports = { clearTasksChangelogs }
