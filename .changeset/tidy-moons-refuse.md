---
"capsule-capsulate": patch
---

Fixed query string replacements inside MSO conditional comments duplicating params. MSO buttons repeat the same URL on the hidden `<a>` and the `<v:roundrect>`; upserted params were appended twice to the first href and never applied to the second. Replacements are now applied once per unique URL, anchored to the attribute boundary, so duplicated and prefix-overlapping URLs are each rewritten exactly once.
