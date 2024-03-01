const { readFileSync } = require("fs")

const { sendToSlack } = require("./webhook")

const { createPackageJsonPath } = require("../shared/lib/paths")
const { getLatestRelease } = require("./getLatestRelease")
const { formatReleaseInfo } = require("./formatReleaseInfo")

const sendPublishUpdates = async (developUrl) => {
  const packageJson = JSON.parse(readFileSync(createPackageJsonPath(), "utf8"))

  if (packageJson) {
    const { name, version } = packageJson

    const latestRelease = await getLatestRelease()

    const formattedReleaseInfo = formatReleaseInfo({
      releaseInfo: latestRelease.info,
      developUrl
    })

    sendToSlack(`*${name}@${version}*\n\n${formattedReleaseInfo}`)
  }
}

module.exports = { sendPublishUpdates }
