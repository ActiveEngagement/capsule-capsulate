---
"capsule-capsulate": minor
---

Add upsert support to query-string replacements. A `SourceCodeReplacement` with no `from` (`{ key, to }`) now sets its key on every eligible link, creating it when absent instead of skipping. `useReplaceQueryStrings` exposes a `newSourceCodes` ref for adding params, and the `SourceCodeReplacement` union is split into named members (`KeyedSourceCodeReplacement`, `ValueSourceCodeReplacement`, `UpsertSourceCodeReplacement`). Keyed/value edits keep skipping absent keys, so existing behavior is unchanged.
