# Judgement, chunk c7 (c-run2), base c124c6b65

Applied 7 (5 rewrites, 2 keeps), held 0. No closes, duplicates or pairs.

- Row 328 (rewrite): apply. The check passes it; line as the writer's.
- Row 440 (rewrite): apply. The check passes it; line as the writer's.
- Row 456 (rewrite): apply, corrected. The check failed "so these are the only `CMP` bodies walk chooses for two total comparisons": `Library/FortressLibrary.fss:186`, `:198`, `:209` at c124c6b65 are also chosen and answer correctly (read at the base). Correction, from the check's sources: "so no `StandardTotalOrder` default intervenes: these bodies run against a different total comparison; the equal cases (`:186`, `:198`) and `EqualTo`'s `CMP` (`:209`) are right." (the check's wording said "for two different total comparisons walk runs these two bodies", which `:209` contradicts for `EqualTo` against another, so it is narrowed to these bodies). To fit the notes' 700 limit: "The bodies are `LessThan.CMP(self, other:TotalComparison) = GreaterThan` and `GreaterThan`'s `= LessThan`" became "`LessThan`'s `CMP` at a `TotalComparison` is `GreaterThan` and `GreaterThan`'s `LessThan`", and `Library/FortressLibrary.fss:159-160` became `:159-160` (same file as the preceding citation).
- Row 457 (keep): apply (no change). The check passes it.
- Row 462 (rewrite): apply, corrected. (1) Reproducer: the probe's outputs `SkCmpTable-compiled.txt` and `SkCmpTable-walk-base.txt` named beside the probe without backticks (backticked bare names fail mech, and the full paths do not fit the 700 limit), "in the parent of ab067d9b6" written `at ab067d9b6^` (both listed in `git ls-tree ab067d9b6^`). (2) Status: "Which governs is undecided: the specification is silent, the prelude goes at switch-over." added, from the check's sources (`comparison.tex:115-121`, `:207-215`; the skill's switch-over). To fit the notes' 700 limit: "the prelude's `CMP` and `<` against `Unordered` answer" became "the prelude's answer" (the claim names both operators), and "which puts ... ; no compiled test holds that half" became "putting ... ; no compiled test holds it".
- Row 880 (keep): apply (no change). The check passes it; CONTESTED stays (item 344 open, a default only).
- Row 484 (rewrite): apply, corrected. "so `ZZ64` with a numeral answers." replaced by "so the call runs `ZZ64`'s declaration rather than stopping."; "(`:994`, `:997`)" appended to the `NN64` sentence (`ZZ`'s coercions from `ZZ32` and `NN64`, read at c124c6b65).

Silent: rows 456 and 462 stay `defect`, as silent.txt; the check upholds both.
