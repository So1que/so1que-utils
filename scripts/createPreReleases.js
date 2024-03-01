const { promisifyExec } = require("./promisifyExec")
const { selectPackagesWithChangelogs } = require("./packagesWithChangelogs")

const createPreReleases = async () => {
  const packagesWithChangelogs = selectPackagesWithChangelogs({
    withChangelogNumberValidation: false
  })

  if (packagesWithChangelogs.length === 0) {
    console.info("Changelogs does not exist")

    await promisifyExec("exit 0")
    return
  }

  for (const package of packagesWithChangelogs) {
    await promisifyExec(`PACKAGE_NAME=${package} pnpm create-pre-release`)
  }
}

createPreReleases()
