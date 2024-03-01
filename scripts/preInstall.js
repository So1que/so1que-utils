const fs = require("node:fs")

const splitVersion = (version) => {
  const major = Number(version.split(".")[0])
  const minor = Number(version.split(".")[1])

  return {
    major,
    minor
  }
}

const preInstall = async () => {
  const isCI = process.env.CI === "true"

  if (isCI) {
    console.info("Skip preinstall step, because version of the node is not fixed in CI")
    return
  }

  const systemNodeVersion = process.version.match(/^v(\d+\.\d+)/)[1]
  const systemNode = splitVersion(systemNodeVersion)

  const nvmNodeVersion = fs.readFileSync(".nvmrc", "utf8").trim()
  const nvmNode = splitVersion(nvmNodeVersion)

  if (systemNode.major !== nvmNode.major || systemNode.minor !== nvmNode.minor) {
    console.error(
      `\n \x1b[31m Wrong Node JS version was found! Please, use ${nvmNodeVersion} instead of ${systemNodeVersion} \n`
    )

    process.exit(1)
  }
}

preInstall()
