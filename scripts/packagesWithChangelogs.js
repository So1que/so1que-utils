const { readdirSync } = require("fs")

const { createBranchInfo } = require("../packages/release/scripts/shared/lib/createBranchInfo")

/**
 * @param {boolean} withChangelogNumberValidation To filter changelogs that have same number as branch number
 * @returns
 */
const selectPackagesWithChangelogs = ({ withChangelogNumberValidation }) => {
  const branchInfo = createBranchInfo(process.argv[2] || "")

  const packagesWithChangelogs = []

  const packages = readdirSync("./packages").filter((file) => !file.includes(".DS_Store"))

  packages.forEach((package) => {
    const packageFiles = readdirSync(`./packages/${package}`)
    const withChangelogsDir = packageFiles.includes("changelogs")

    if (withChangelogsDir) {
      const availableChangelogs = readdirSync(`./packages/${package}/changelogs`)
      const withChangelogFile = withChangelogNumberValidation
        ? availableChangelogs.filter((changelog) => changelog.includes(branchInfo.number)).length > 0
        : availableChangelogs.length > 0

      if (withChangelogFile) {
        packagesWithChangelogs.push(package)
      }
    }
  })

  return packagesWithChangelogs
}

module.exports = { selectPackagesWithChangelogs }
