# ShowShelf — Tasks and checkpoints

## Working format
One defined task at a time: agree on scope and Done when, implement, run relevant checks, explain the result, then create a separate commit including documentation and the prompt log. The user has authorized uploads. Student review and personal reflections must not be invented. Do not rewrite earlier commits to fabricate a development sequence. Top 10 is deferred at the user's request.

## Implemented tasks
- [x] 1. Setup and planning
  Done when: course starter files are preserved, React/Vite/TypeScript builds, and requirements and tasks exist.
  Evidence: initial application snapshot d4253ba. Manual prompt-logging fallback is disclosed in README; automatic activation is not claimed.
- [x] 2. API verification
  Done when: list and detail requests succeed from the application browser, and response fields and attribution are recorded.
  Evidence: real browser checks on 30 October; docs/api-verification.md and docs/verification.md. Earlier localhost problems were resolved.
- [x] 3. Typed list and components
  Done when: typed props, map and unique keys render separate card components.
  Evidence: d4253ba; temporary fixtures were subsequently removed when real API data was connected.
- [x] 4. Routing and details
  Done when: list/detail routes, useParams, navigation, direct refresh and invalid-route handling work.
  Evidence: d4253ba; automated and real browser checks in docs/verification.md.
- [x] 5. Real API integration
  Done when: fetch inside useEffect supplies real data with loading, errors, retry and missing-data handling.
  Evidence: 42c8512 and subsequent browser verification.
- [x] 6. Search, genre filtering and Vitest
  Done when: combined filters, clear action, result count and empty results work; meaningful tests and Vitest UI are configured.
  Evidence: cb37ffe; automated tests and live filtering checks passed. UI server startup verified; its visual interface was not inspected.
- [x] 7. Favorites
  Done when: save/remove works across pages, persistence survives refresh, invalid storage is handled and tests pass.
  Evidence: b7ae9fb; live refresh and removal verified, failure paths covered in automated tests.
- [x] 8. Comparison
  Done when: two distinct selections, replacement/removal, empty states and facts table work.
  Evidence: e99ba2a, comparison tests and live browser checks.
- [x] 9. Responsive design
  Done when: original CSS supports desktop/narrow layouts, labeled controls, focus styling and missing posters.
  Evidence: 24dddab; 390px layout and poster navigation checked. This is not a full accessibility audit.
- [x] 10. Verification and documentation
  Done when: test/build/lint checks pass and README, architecture, verification and defense guidance describe the implementation accurately.
  Evidence: 13d2065 plus later checks; 32 passing tests, successful build/lint and observed browser checks. Documentation cleanup is a separate follow-up commit, not a reconstruction of earlier work.

## Remaining tasks
- [ ] 11. Student review and defense practice
  Done when: the student tests the four pages, adds their own truthful reflection and can explain state, props, effects, routing, data flow and a test without agent help.
  Start with docs/defense-guide.md. Only the student can confirm understanding.
- [ ] 12. Submission and process review
  Done when: automatic prompt logging is verified for future sessions (or the lecturer accepts the disclosed fallback), historical logging limitations are reviewed with the lecturer, the student checks public repository access in an incognito window, selects a defense slot and submits the URL.
  Deadline from the supplied assignment: 5 November 2026 at 10:00 Asia/Jerusalem. No submission or lecturer approval is claimed.

## Honest history
Follow-up to task 10 (1 November): re-audit each course requirement, rerun test/build/lint, and correct outdated API-verification headings. Done when: docs/course-audit.md separates verified implementation from remaining process/student requirements. Completed by the assistant; student review remains pending.

The initial setup, sample list and routing were published together in d4253ba; they were not separate commits. API, filters, favorites, comparison, verification and design subsequently received separate commits. See GitHub history for the actual sequence. PROMPTS.md is append-only and has not been rewritten to imply missing early planning messages were captured.
