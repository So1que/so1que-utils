const packageDir = `packages/${process.env.PACKAGE_NAME}`

const isPackageDirExist = Boolean(process.env.PACKAGE_NAME)

module.exports = { packageDir, isPackageDirExist }
