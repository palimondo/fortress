# Judgement of chunk c8, run c-run4, base c124c6b65

Final mech (`mech.py --final`): "MECH: 9 lines, 0 failing, every check passes."

- **896: apply** (rewrite), with the check's two corrections: the walk-loader citation shortened to `glue/StaticNativeApp.java:252-257` and marked "by reading"; the run restated as "Run before 93884be8d, through `StringPrim$GetProperty`" (the run predates the move onto `systemOps`); "Workaround: test the name for emptiness." ("first" dropped); the claim ends "not as one of the library's exceptions".
- **368: apply** (rewrite), with the check's correction: ", imported by no Fortress source." replaced by " though no Fortress source imports the helper."; `cr.accept(fa, 0)` dropped from the `FortressTransformer.java:53` citation to pay for it.
- **377: hold.** The writer's verdict was measure; no prober ran the question (no `runs.md` for it), so whether the program still stops at the base is unsettled. The row keeps its line; the question is in `queue.md`.
- **812: apply** (rewrite), with the check's correction to the claim: "a trait whose `comprises` clause lists a type at a `where`-clause type variable" (from `ComprisesWhereFunctionalMethodChecker.fss` at the base).
- **818: apply** (rewrite), as written; the check passes it.
- **819: apply** (rewrite), with the check's correction: the control given "`h` as `!`" (`REPORT.md:173`, `h(x:(ZZ32,ZZ32)): ZZ32 = 3`); the throw's citation shortened to `CodeGen.java:2874` to pay for it.
- **822: apply** (rewrite), with the check's correction: the untraced cause taken out of the claim and stated in the notes as untraced ("not reproduced apart from it; that the analyzer lacks the function's static parameters is untraced.").
- **874: keep, passes.** The row keeps its line; nothing to apply.
- **875: keep, passes.** The row keeps its line; nothing to apply.
- **895: apply** (rewrite), with the check's correction: the run restated as "Run before 93884be8d moved `lineSeparator` from `systemOps` to `stringOps`: the distance stage with `Library/FlatString.fss:25-26` naming `systemOps.lineSeparator`:" (`systemOps` has no `lineSeparator` at the base; `Library/FlatString.fss:26` names `stringOps.lineSeparator`); `systemOps.java:29` shortened to `nativeHelpers/...` to pay for it.
- **340: apply** (rewrite), with the check's correction: "Same crash (walk" restored; "with different stacks" to "at unlike stacks" to pay for it.
- **498: apply** (rewrite), as written; the check passes it.

Dups, closes, pairs: none (the assessment and the check find none). Silent: all five lines of `silent.txt` kept as `defect` (368, 377, 874, 895, 498); the check passes each status beside `silent`, and 377's hold does not change its spec cell.
