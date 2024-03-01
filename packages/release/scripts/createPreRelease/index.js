const { readFileSync } = require("fs")

const { bumpSemverVersion } = require("../shared/lib/bumpSemverVersion")
const { createPackageJsonPath } = require("../shared/lib/paths")

const createPreRelease = async () => {
  const packageJson = JSON.parse(readFileSync(createPackageJsonPath(), "utf8"))

  const timestamp = Date.now()

  await bumpSemverVersion({ updatedVersion: `${packageJson.version}-${timestamp}` })
}

module.exports = { createPreRelease }
