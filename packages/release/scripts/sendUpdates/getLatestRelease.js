const { readFile } = require("fs/promises")

const { createPackageChangelogPath } = require("../shared/lib/paths")

const getLatestRelease = async () => {
  const fileContent = await readFile(createPackageChangelogPath(), "utf8")

  const [latestRelease] = fileContent.split("---")
  const [title, ...info] = latestRelease.split("\n").filter((s) => s.length > 0)

  return {
    title,
    info
  }
}

module.exports = { getLatestRelease }
