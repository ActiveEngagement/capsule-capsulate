---
"capsule-capsulate": patch
---

Add `DeleteSourceCodeReplacement` type (`{ key, delete: true }`) to remove query parameters entirely from every URL. Updates `useReplaceQueryStrings` with `deleteSourceCode()`, `reset()`, and reactive `deletedKeys`.
