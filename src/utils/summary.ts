// Read API markup as text; never insert external HTML into the page.
export function summaryToText(summary: string | null): string {
  if (!summary) return 'No summary available.'
  const document = new DOMParser().parseFromString(summary, 'text/html')
  return document.body.textContent?.trim() || 'No summary available.'
}
