const { updatePackageVersion } = require("./updatePackageVersion")

const createRelease = async () => {
  console.info("Create release...\n")

  await updatePackageVersion()

  console.info("Release created!")
}

module.exports = { createRelease }
