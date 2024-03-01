const { promisifyExec } = require("./promisifyExec")
const { selectPackagesWithChangelogs } = require("./packagesWithChangelogs")

const validateChangelogs = async () => {
  const prNumber = process.argv[2]
  const prLabels = process.argv[3]

  const packagesWithChangelogs = selectPackagesWithChangelogs({
    withChangelogNumberValidation: true
  })

  const errors = []

  for (const package of packagesWithChangelogs) {
    try {
      const { stdout } = await promisifyExec(
        `PACKAGE_NAME=${package} pnpm validate-changelog ${prNumber} '${prLabels}'`
      )
      console.info(`${package} package:\n ${stdout}`)
    } catch (error) {
      errors.push({ error: error.message, package })
    }
  }

  if (errors.length === 0) {
    await promisifyExec("exit 0")
    return
  }

  errors.forEach(({ error, package }) => console.error(`${package} package with error:\n ${error}`))

  await promisifyExec("exit 1")
}

validateChangelogs()
