const { readdirSync, existsSync, readFileSync } = require("fs")

const { createTaskChangelogPath } = require("../shared/lib/paths")
const { changelogFormat } = require("../shared/constants/format")
const { promisifyExec } = require("../shared/lib/promisifyExec")
const { createBranchInfo } = require("../shared/lib/createBranchInfo")
const { semverVersions } = require("../shared/constants/semverVersions")

const checkIsTaskChangelogsExist = async (prNumber, prLabels) => {
  if (prLabels.includes("WITHOUT CHANGELOGS")) {
    console.info("Changelog validator skipped")

    await promisifyExec("exit 0")

    return
  }

  const changelogsPath = createTaskChangelogPath()

  if (existsSync(changelogsPath)) {
    const packageChangelogs = readdirSync(changelogsPath) || []

    const changelogsWithoutExtensions = packageChangelogs.map((changelog) => changelog.replace(changelogFormat, ""))

    const branchInfo = createBranchInfo(prNumber)

    const isValid = changelogsWithoutExtensions.find((changelog) => {
      const isActualTaskNumber = changelog === branchInfo.number

      if (isActualTaskNumber) {
        const changelogContent = readFileSync(`${changelogsPath}/${branchInfo.number}.md`, { encoding: "utf8" })
        const withSemverTitle =
          changelogContent.includes(`${semverVersions.patch}:`) ||
          changelogContent.includes(`${semverVersions.minor}:`) ||
          changelogContent.includes(`${semverVersions.major}:`)

        if (!withSemverTitle) {
          console.info("Changelog semver title is not correct")
        }

        return withSemverTitle
      }

      return false
    })

    if (isValid) {
      console.info("Changelogs exist")

      await promisifyExec("exit 0")

      return
    }
  }

  console.info("Changelogs not found")

  await promisifyExec("exit 1")
}

module.exports = { checkIsTaskChangelogsExist }
