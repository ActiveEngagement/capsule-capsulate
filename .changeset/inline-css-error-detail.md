---
"capsule-capsulate": patch
---

Surface the real cause when style inlining fails. `InlineCss` used to catch any
juice/PostCSS error and rethrow an opaque "There is invalid CSS or <link> tags
in this document." message. It now appends the underlying PostCSS reason and
source location (e.g. "Missed semicolon (line 1, column 86).") and preserves the
original error on `.cause`, so a malformed style attribute is actionable instead
of a dead end.
