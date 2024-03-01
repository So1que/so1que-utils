const { generateChangelog } = require("./generateChangelog")
const { createChangelogsUpdates } = require("./createChangelogsUpdates")
const { fillRelease } = require("./fillRelease")
const { clearTasksChangelogs } = require("./clearTasksChangelogs")

const { bumpSemverVersion } = require("../shared/lib/bumpSemverVersion")
const { createPackageJsonPath } = require("../shared/lib/paths")
const { createSemverVersion } = require("../shared/lib/createSemverVersion")
const { semverVersions } = require("../shared/constants/semverVersions")

const { readFileSync } = require("fs")

const updatePackageVersion = async () => {
  const { isPatch, isMajor, isMinor, packageUpdates } = await createChangelogsUpdates()

  const isPackageUpdateAvailable = isPatch || isMinor || isMajor

  if (!isPackageUpdateAvailable) {
    return
  }

  const { name, version } = JSON.parse(readFileSync(createPackageJsonPath(), "utf8"))

  let versionType = semverVersions.patch

  if (isMajor) {
    versionType = semverVersions.major
  } else if (isMinor) {
    versionType = semverVersions.minor
  }

  const updatedVersion = createSemverVersion({ version, versionType })

  const release = fillRelease({ updatedVersion, packageUpdates })

  try {
    await bumpSemverVersion({ updatedVersion })
  } catch (error) {
    console.error(`Can not update package version for ${name}: ${error}`)
  }

  try {
    await generateChangelog({ release })

    clearTasksChangelogs()

    return { name, updatedVersion }
  } catch (error) {
    console.error(`Can not generate changelog for ${name}: ${error}`)
  }

  return null
}

module.exports = { updatePackageVersion }
