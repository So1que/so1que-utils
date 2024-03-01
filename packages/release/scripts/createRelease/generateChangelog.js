const { writeFile, readFile } = require("fs/promises")

const { createPackageChangelogPath } = require("../shared/lib/paths")

const generateChangelog = async ({ release }) => {
  const changelogPath = createPackageChangelogPath()

  const previousReleases = await readFile(changelogPath, "utf8")

  const content = `${release}\n---\n${previousReleases}`

  await writeFile(changelogPath, content)
}

module.exports = { generateChangelog }
