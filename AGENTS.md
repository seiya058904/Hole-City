# AGENTS.md

## Development and release boundary

This repository is the compiled Hole City distribution; the parent `../` is the separate local development Git repository containing source, builds and tests. Treat both as one product but inspect their Git states independently. Make gameplay changes in the development repository and verify the actual build before preparing a release; do not treat this distribution as the editable source.

Preserve `checksums.sha256`, runtime assets, user saves and third-party notices. Copy only verified authorized delivery files, check their identity and inspect the exact diff. Any synchronization, push, deployment or release requires explicit authorization; preserve unrelated changes and do not publish source or private materials accidentally.

## Browser tool selection

- Prefer Ego Browser for exploratory navigation, visual review and interactive checks when available. Use Playwright for repeatable regression, CI, isolation, request interception or other automation requiring its APIs; combine tools when useful. If Ego is unavailable, use a suitable existing browser tool.
- Keep this repository's required browser commands, versions, profiles and safety boundaries; an exploratory check does not replace required automated tests. Do not alter real user data or production state for testing. Report the tools, coverage and any untested paths.
