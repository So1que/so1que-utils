const { formatChangelogInfo } = require("./formatChangelogInfo")

const complicatedInfo = `patch:
- Add \`disable_session_recording\` boolean for \`initAnalytics\` and set by default true, because right now records from analytics have problems with perf
- Refactor new features with options
 - First option
 - Second option

minor:
- This minor will be without any bugs!
But this with bugs i am sure

major:
- \`Component name\` will crash everything!`

const formattedComplicatedInfo = `  - Add \`disable_session_recording\` boolean for \`initAnalytics\` and set by default true, because right now records from analytics have problems with perf
  - Refactor new features with options
   - First option
   - Second option
  - This minor will be without any bugs!
  But this with bugs i am sure
  - \`Component name\` will crash everything!`

describe("Format changelog info", () => {
  it("should format simple changelog info", () => {
    expect(formatChangelogInfo("patch:\n- Some patch info")).toBe("  - Some patch info")
    expect(formatChangelogInfo("minor:\n- Some minor info")).toBe("  - Some minor info")
    expect(formatChangelogInfo("minor:\n- Some minor info\npatch:\n- Some cool patch info!")).toBe(
      "  - Some minor info\n  - Some cool patch info!"
    )
    expect(
      formatChangelogInfo(
        "minor:\n- Some minor info\npatch:\n- Some cool patch info!\nmajor:\n- Some long info with options: \n - First option\n - Second option"
      )
    ).toBe(
      "  - Some minor info\n  - Some cool patch info!\n  - Some long info with options: \n   - First option\n   - Second option"
    )
    expect(formatChangelogInfo("minor:\n- Some minor info")).toBe("  - Some minor info")
  })

  it("should format complicated changelog info", () => {
    expect(formatChangelogInfo(complicatedInfo)).toBe(formattedComplicatedInfo)
  })
})
