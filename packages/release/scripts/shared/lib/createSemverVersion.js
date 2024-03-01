const { semverVersions } = require("../constants/semverVersions")
const { getSemverVersion } = require("./getSemverVersion")

const createSemverVersion = ({ version, versionType }) => {
  const { vMinor, vPatch, vMajor } = getSemverVersion(version)

  let updatedVersion = `${vMajor}.${vMinor}.${vPatch}`

  switch (versionType) {
    case semverVersions.patch: {
      return `${vMajor}.${vMinor}.${vPatch + 1}`
    }

    case semverVersions.minor: {
      return `${vMajor}.${vMinor + 1}.0`
    }

    case semverVersions.major: {
      return `${vMajor + 1}.0.0`
    }

    default: {
      return updatedVersion
    }
  }
}

module.exports = {
  createSemverVersion
}
