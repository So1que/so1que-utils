const markdownLinkExtractor = require("markdown-link-extractor")

const { urlRegex, mdLinkRegex } = require("../shared/constants/regex")

const createUrlAbsolutePath = ({ link, developUrl }) => {
  const isFullUrlPath = Boolean(link.match(urlRegex))

  if (isFullUrlPath) {
    return link
  }

  const isAbsolutePathByPackage = !link.includes("../")

  if (isAbsolutePathByPackage) {
    return `${developUrl}${link.replace("./", "")}`
  }

  const linkByPaths = link.split("../")
  const linkWithoutCatalogsBelowPath = linkByPaths.slice(-1)

  const catalogBelowLength = linkByPaths.length - 1

  const isPathFromRootDir = catalogBelowLength === 2

  if (isPathFromRootDir) {
    return `${developUrl}${linkWithoutCatalogsBelowPath}`
  }

  const isPathFromPackageDir = catalogBelowLength === 1

  if (isPathFromPackageDir) {
    return `${developUrl}${linkWithoutCatalogsBelowPath}`
  }

  return link
}

/**
 * Slack url format are different from markdown
 */
const createUrlsAbsolutePath = ({ text, developUrl }) => {
  const links = markdownLinkExtractor(text)

  if (links.length === 0) {
    return text
  }

  links.forEach((link) => {
    text = text.replace(link, createUrlAbsolutePath({ link, developUrl }))
  })

  return text.replace(mdLinkRegex, `<$2|$1>`)
}

module.exports = { createUrlsAbsolutePath }
