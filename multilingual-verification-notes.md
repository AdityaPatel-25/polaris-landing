# Multilingual Verification Notes

- The landing header renders the English/Hindi selector, and selecting Hindi persists `polaris-interface-language=hi` in browser storage.
- The translation procedure returned valid Hindi for a direct two-string request: “Explore” → “खोजें” and “Sign in” → “साइन इन करें”.
- The initial UI translation pass did not replace visible landing text despite successful requests, so the client application layer requires a correction before release.
- The translation endpoint is reachable and returns valid Hindi, while full-page language mutation requests can take tens of seconds; concurrent batches now use partial-success handling so completed translations are still applied.
- The first partial-success pass translated several later landing strings but retained some earlier English text, confirming the need for a curated immediate Hindi fallback layer alongside asynchronous long-form translation.
- The revised landing switcher now translates core navigation, primary calls to action, section labels, footer links, and selected status terms immediately; selecting English restores the original copy cleanly.
- Long narrative and record-specific strings are queued in compact background batches. This preserves immediate usability while deeper translation results arrive progressively.
- The language selector is present on the access gateway, carries the Hindi preference from the public landing page, and leaves the approved-profile loading workflow intact.
- The approved Explorer workflow retained the Hindi setting in both the portal rail and the header control, including translated navigation, search placeholder, and common actions.
- The final language mechanism now uses deterministic local English/Hindi interface mappings, avoiding runtime translation failures while retaining tested TypeScript and server-test coverage.
