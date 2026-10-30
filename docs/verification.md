# Verification — 30 October 2026

## Automated
- npm test: 32 tests pass (22 utility tests, 10 jsdom component interaction tests).
- npm run build: pass.
- npm run lint: pass; source search found no any usage.
- npm run test:ui: UI server successfully started and 32 tests passed. First diagnostic attempt used unsupported --host; corrected to --api.host. The UI page itself was not visually inspected.

## Live browser, real network
Origin: http://127.0.0.1:5174/ (Vite outside the isolated sandbox).
- List loaded 240 real TVmaze shows with posters. This proves a cross-origin fetch from the app succeeded.
- Search Under the Dome: 1 of 240 shows; combined Comedy filter: 0 of 240; Clear restored 240.
- Saved Under the Dome, opened Favorites and reloaded: persisted.
- Opened /shows/1, refreshed: details loaded again, including rating and schedule.
- Removed the test favorite and confirmed the empty Favorites state. Test data was cleaned up.
- Compared show IDs 1 and 2: correct names and distinct ratings appeared. Clear removed the comparison.
- /shows/abc: Show not found. /unknown: Page not found.
- No console warning/error entries observed for the tested session.
- Inspected Browse and Compare at 390px width; controls stack, cards fit and comparison remains readable without page-level horizontal overflow. Default viewport was restored.

Screenshots are saved in the workspace outputs folder as showshelf-desktop.jpg and showshelf-mobile.jpg. They are evidence of the checked local version, not a deployed public site.

## Limits and remaining student actions
Real outage, quota and malformed-storage paths were covered by automated tests, not forced on the live service. No public deployment was attempted or required. Keyboard focus styles and native control semantics are present; a complete accessibility audit was not performed. The student must review, add truthful personal testing notes and practice the defense. Automatic prompt-hook activation remains unverified; the documented manual fallback was used. The early accumulated setup is one commit, followed by genuine separate feature commits.
