const getSemverVersion = (version) => {
  const withoutAlphaBeta = version.split("-")[0]
  const [vMajor, vMinor, vPatch] = withoutAlphaBeta.split(".").map((element) => Number(element))

  return {
    vMajor,
    vMinor,
    vPatch
  }
}

module.exports = { getSemverVersion }
