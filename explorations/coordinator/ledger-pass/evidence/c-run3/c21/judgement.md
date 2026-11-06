# Judgement of chunk c21, run c-run3, base c124c6b65

Sources: `assessment.md`, `rows.rewrite`, `questions.md`, `pairs.txt`, `cold-read.md`, `mech.md`, `check.md`, `evidence/*.md`. I re-read at the tree: `OverloadSet.java:1338-1353` (`atTemplateParams` returns null unless the arm has as many static parameters as the template) and `:2048` ("Not sure what to do with return type."); FACTS F-75; commit `93e5bf98d`; `ab067d9b6^:explorations/compile-ladder/rung-export-var/probes/skeptic/skeptic-differentials.txt` (holds "Variable ctr is not defined." three times, `compile-exit=255`). `closes.txt`, `dups.txt` and `silent.txt` are empty, so `final.closes`, `final.dups` and `final.silent` are empty.

- **495: keep, passes.** The check passes it; the row keeps its line, nothing to apply.
- **496: apply** (rewrite), with the check's correction: "so the call-site dispatch of top-level functions does not reach it, and it is not passed the static return type (`OverloadSet.java:2048` at c124c6b65; PLAN phase 5)" replaced by "so its arms are not called at the template's parameters (`OverloadSet.java:1342-1353`), and it is not passed the static return type (`:2048` at c124c6b65; PLAN phase 5)". Source: `atTemplateParams` at `:1342-1353`, `fd5cb4864`.
- **499: apply** (rewrite), with the check's correction: "Answer 9's rule as `e2f1aa7e8` builds it compares return types" replaced by "F-75's positional rule compares kinds and return types" (FACTS F-75).
- **538: apply** (rewrite), as written; the check passes it.
- **699: apply** (rewrite), as written; the check passes it.
- **813: apply** (rewrite), as written; the check passes it.
- **814: apply** (rewrite), with the check's two corrections: "and accepts the component; the code generator's set holds both `-`." replaced by "and accepts the component; the disambiguator keeps `A`'s `-`, so the code generator's set holds both."; "Walk runs the component with its own `-`, 2." replaced by "Without a `-` of its own, both paths run `A`'s `-`; with one, walk runs the component's, 2." Source: `93e5bf98d`, `XXXImportExceptOperator.fss` and its api.
- **851: keep, passes** (CONTESTED, unchanged). Nothing to apply.
- **854: keep, passes** (CONTESTED, spec `silent`, not NEGATIVE-VERIFIED, so nothing for `final.silent`). Nothing to apply.
- **706: keep, passes.** Nothing to apply. Its pair 706/510 goes to `final.pairs` (the check passes it: 510's siblings name only 705).
- **42: apply** (rewrite), with the check's correction of the claim: "`except { opr ∑ }` parses; only `except { opr BIG + }` actually works" replaced by "`except { opr ∑ }` parses, and what it leaves out is not measured; `except { opr BIG + }` leaves out `SUM` (row 41)". Source: `RvwExceptSigma.fss` in `e879b6a44^` only prints that it parsed; row 41.
- **13: apply** (rewrite), with the check's two corrections: "The grammar's `AliasedSimpleName`" shortened to "`AliasedSimpleName`"; "; its capture beside it)" replaced by "; its capture beside it, both in the parent of `ab067d9b6`)". Source: `SkAlias.fss` and its capture `skeptic-differentials.txt` (`:20-28`, "Variable ctr is not defined." three times) were deleted by `ab067d9b6`, not `e879b6a44`. The check named the capture by its bare file name, which `mech.py --final` failed (no tracked file at c124c6b65); the full path does not fit the notes (697 of 700), so the line keeps "its capture beside it", which the folder of `ab067d9b6^` makes exact, and adds where both are read. The file name stays in the history line.

Final mech (`mech.py --final`, second run): "MECH: 8 lines, 0 failing, every check passes." The first run failed row 13 on the bare `skeptic-differentials.txt`, corrected as above.

Counts: 8 applied (rewrites), 4 kept as they stand (passing keeps), 0 held. `ledger.py check --rows final.rewrite`: 8 rows, 0 fail.
