const { readFile } = require("fs/promises")
const { existsSync, readdirSync } = require("fs")

const { formatChangelogInfo } = require("./formatChangelogInfo/formatChangelogInfo")

const { createTaskChangelogPath } = require("../shared/lib/paths")
const { changelogFormat } = require("../shared/constants/format")
const { semverVersions } = require("../shared/constants/semverVersions")

const createChangelogsUpdates = async () => {
  const packageChangelogsPath = createTaskChangelogPath()

  const packageUpdates = []

  let isPatch = false
  let isMinor = false
  let isMajor = false

  if (!existsSync(packageChangelogsPath)) {
    return {
      packageUpdates,
      isPatch,
      isMinor,
      isMajor
    }
  }

  const tasksChangelogs = readdirSync(packageChangelogsPath)

  for (const taskChangelog of tasksChangelogs) {
    const updates = []

    const changelogInfo = await readFile(`${packageChangelogsPath}/${taskChangelog}`, "utf8")

    if (isMajor !== true) {
      isMajor = changelogInfo.includes(`${semverVersions.major}:`)
    }

    if (isMinor !== true) {
      isMinor = changelogInfo.includes(`${semverVersions.minor}:`)
    }

    if (isPatch !== true) {
      isPatch = changelogInfo.includes(`${semverVersions.patch}:`)
    }

    updates.push(formatChangelogInfo(changelogInfo))

    const taskNumber = taskChangelog.replace(changelogFormat, "")

    packageUpdates.push({
      updates,
      taskNumber
    })
  }

  return {
    packageUpdates,
    isPatch,
    isMinor,
    isMajor
  }
}

module.exports = { createChangelogsUpdates }
