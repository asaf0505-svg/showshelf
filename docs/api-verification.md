# TVmaze inspection — 30 October 2026

## Verified by the assistant
Opened the official documentation and both public JSON endpoints in the in-app browser without credentials:

- https://api.tvmaze.com/shows?page=0 — 240 shows, 240 unique IDs. First item: ID 1, Under the Dome.
- https://api.tvmaze.com/shows/1 — matching individual show data, including name, genres, rating, schedule, image and summary.

The observed list contained four null ratings and five empty schedule-day arrays. It contained no null images or summaries at inspection time; that does not guarantee future responses will have those fields. The detail summary contains HTML tags. Plan to display plain text rather than inject API HTML.

## Planned TypeScript fields
| Field | Type / handling |
| --- | --- |
| id | number; use as React key and route parameter |
| name, url, status | string |
| genres | string[] |
| rating.average | number or null; show Not available when null |
| schedule | object with time: string and days: string[]; empty values are valid |
| image | object with medium/original URLs, or null; use a placeholder |
| summary | string or null; turn markup into plain text |

## Official documentation
Source: https://www.tvmaze.com/api

The show index is paginated with up to 250 results per page; deleted records can make a page smaller. Our initial Browse search and genre filter will operate on page 0 only, with that limitation shown to users. No promise of catalog-wide search or popularity ranking.

The documentation states that endpoints support CORS. It describes rate limiting (at least 20 calls per 10 seconds per IP, potentially stricter), so handle HTTP 429 and avoid request loops. The API data is licensed under CC BY-SA: credit TVmaze with a visible source link and follow ShareAlike for reused/adapted data. Preserve the API-provided show URL for a source link on details. Do not confuse the data license with a license for our own application code.

## Not yet verified
A real cross-origin fetch from the local application has NOT passed. A scratch test page was served at http://127.0.0.1:4174, but the in-app browser timed out connecting. A standalone data-URL test was rejected by browser URL security policy and was not executed. No bypass was attempted.

Directly opening JSON verifies availability and response shape, not browser CORS. Task 2 therefore remains open until the student or an available local browser runs the scratch page successfully. The scratch page is outside the application in work/api-probe.html; its local server is work/serve-probe.cjs. From the workspace root run `node work/serve-probe.cjs` and open http://127.0.0.1:4174. Successful output must show listStatus and detailStatus 200 and the actual data counts; FAILED is not a pass.

## Workflow status
The current message was logged through the original script as codex-manual-fallback because the repository hook did not automatically record it. Automatic logging still requires verification in an active project session. No student checks or reflection were invented, and no commit was made by the assistant.
