# Climb batch 16, rung S (rung-solver-speed): record lines

## For FACTS

**The compiled checker reduces a formula once in each analyzer, answers an exclusion asked again with fresh inference variables from a memo, and finds a type by its name once per trait table.**

- `Formula.reduce` asks `TypeAnalyzer.reduced`, which keeps each analyzer's reductions by formula, each marked if it read the context, and keeps none that opened a size (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:589-609`; switch `fortress.analyzer.reduce.cache`).
- `dExc` keeps its answers by the question with its type inference variables renamed apart, from an empty cycle history only (`:408-439`, `:985-1015`; switch `fortress.analyzer.exclusion.cache`). Those that read no context are shared through the trait table (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:150-156`).
- `TraitTable.typeCons` and `declaredTypeCons` answer once per name (`TraitTable.scala:34-68`; switch `fortress.analyzer.typecons.cache`).
- **Time.** The count stage, one loaded session: 437 s before, 149 s with the reduction memo, 97 s with all three. The earlier session's idle base took 302 s. The distance stage took 574 s on the final code, against 26 to 29 minutes before.
- **Results.** The checker's results are the same:
  - The count tables are equal, and so are the whole outputs once the tree path is masked.
  - An audit recomputed every reused answer without its memo, on one full count run and on one distance run. It found 0 differences: 7.15M reductions, 153,930 exclusions, 156M type lookups and 183,577 declaration searches on the count run; 428M reuses on the distance run.
- **What it means for the work.** A new memo of the checker follows this rule:
  - its key holds every input that its answer read;
  - an answer that read the context is marked, and a hit on it is a context read;
  - an answer that read none may be shared through the table;
  - a computation that opened a size is not kept.
- Gated by `ReductionMemoJUTest`, `ExclusionMemoJUTest`, `TraitTableMemoJUTest` (misc track), and by the count stage's table and output.
- Detail: `compile-ladder/rung-solver-speed/REPORT.md`, sections 1, 4, 6 and 7.

**Every method of the build is within HotSpot's 8,000-byte limit but twelve, and a test fails when that changes.**

- `ProjectFortress/src/com/sun/fortress/tests/unit_tests/MethodSizeJUTest.java`, in the misc track, reads every class of `ProjectFortress/build` with `java.lang.classfile`.
- It fails on an unlisted method past 8,000 bytes, and on a listed one gone from the build or back under the limit.
- The twelve:
  - `NodeReader.readNode`, 14,026 bytes;
  - the three parsers' `pCharLiteralContent$1`, 23,717 each;
  - `ExprDisambiguator.walk`, 8,518;
  - `Misc.checkExprMisc`, 12,893;
  - `HygienicRenamer.walk`, 11,599, which nothing constructs;
  - `MagicNumbers.<clinit>`, 16,677;
  - four `DirectedRoundingTestData` data methods that no suite runs.
- `WalkerJUTest` still guards `Walker`.
- Detail: REPORT.md section 8.

Corrections of entries that are now wrong:

- **F-231**, "What remains is about 95 % the solver normalizing meets again." After this rung, the count stage's profile holds `pExc` and `dExc` at about 62 to 65 % of a run that is about a third as long. The reductions asked again are answered from a memo. Detail: REPORT.md section 5.

## Ledger notes

- **Row 688**: append "climb batch 16 rung S: the table also shares exclusions by renamed question (`6e6192747`); count stage 97 s" (107 characters; the notes hold 581 of 700, the row 883 of 1,200).
- **Row 730**: append "guard: `MethodSizeJUTest`, the build's twelve methods past the limit listed" (75 characters; the notes hold 622).
- **Row 488**: the note would be "climb batch 16 rung S: its final code's distance stage lost :130; the audit copy of that code kept it, 0 of 428M reuses differing (F-232)" (136 characters). The notes hold 697 of 700, so it needs room. Detail:
  - The count stage kept `:130` in base, change and pass.
  - The change's count-stage audit and the base's JFR run lost it.
  - The final code's count and distance audits kept it.
  - REPORT.md sections 6 and 10.
- **Row 577**: the note would be "climb batch 16 rung S edits no library line; its per-site list equals the landed one but for :130 (row 488)" (107 characters). The notes hold 697 of 700, so it needs room.

## New rows

Section "15. Performance and program shape":

| NEW-S-1 | the compiled checker's solver reduced a formula again each time it was asked; over the one library's component 35.1M reductions, 34.4M of formulas already reduced, each meeting and joining every inference variable's bounds, about 95 % of its typeCheck after the walker split (`Formula.scala`) | FIXED | implementation gap (checker) | silent | `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ReductionMemoJUTest.scala` | checker speed probe 2 | fixed `615ecff76`, a memo of each analyzer's reductions (`fortress.analyzer.reduce.cache`); test `testReductionAskedAgainIsTheFirstAnswer`, on the base 'the second reduction is the first's answer'. Second pass `6e6192747`: `dExc` by the question with its inference variables renamed apart, per analyzer and, if it read no context, per trait table (`fortress.analyzer.exclusion.cache`); the table's `typeCons` and declaration search once per name (`fortress.analyzer.typecons.cache`). Count stage in one session, loaded: 437 s, 149 s, 97 s; tables and output identical; audit 7.15M reductions, 153,930 exclusions, 156M lookups, 0 mismatches (`explorations/compile-ladder/rung-solver-speed/REPORT.md`) |

- `ledger.py check --rows` passes the row, but for the `?` in its number cell (1,163 characters; claim 292, notes 699).
- It is added FIXED at once, as row 730 was.
- Nothing else in the tree cites it yet.

## Handover

Rung S, on `wip/rung-solver-speed` (`aaac79b84`..`6e6192747`):

- The compiled checker reduces a formula once per analyzer, answers exclusions by renamed question, and finds types once per table.
- Count stage 437 s → 149 s → 97 s in one loaded session, tables and outputs identical, audits 0 mismatches.
- `MethodSizeJUTest` guards the build's methods past 8,000 bytes, with twelve listed.
- On its tree the distance reads 48: `:130` is gone by F-232's move, and the audit copy reads 49.

## Revival change

**The change.**

- **The team's source.** The team's compiled checker reduced a constraint formula afresh every time it was asked: `Formula.reduce` at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:356` (528438ac5). The same holds for every exclusion question with fresh inference variables (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:412`) and for every search of the trait table by a type's name (`TypeAnalyzer.scala:271`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:34`).
- **What the tree now does.** The checker keeps each analyzer's reductions, each exclusion by the question with its inference variables renamed apart, and each table lookup by name. Each memo has a switch, default on. Tests: `ReductionMemoJUTest`, `ExclusionMemoJUTest`, `TraitTableMemoJUTest`.
- **What does not change.** No rule of the language changes: the checker accepts and refuses the same programs, with the same errors at the same places.
- **What changes for the work.** The checker's time changes. The count stage over the interpreter's library takes about 1.5 to 2.5 minutes, not about 6, and the distance stage about 10 minutes, not about half an hour.
- **The guard.** A misc-track test, `MethodSizeJUTest`, now guards every method of the build against HotSpot's 8,000-byte limit, with a list of the twelve methods past it today. `WalkerJUTest` guards only the generated walker.
- **Skill sentences made false**:
  - `references/compiler.md:125`: "The count stage takes `<out-file> <scratch>` and about 6 minutes on an idle machine."
  - `references/compiler.md:134`, which gives `WalkerJUTest` as the guard of a long method.
- **The reason, as evidence.** 35,107,747 reductions over the library component, 34,447,211 of formulas already reduced. The count stage took 437 s before and 97 s after, in one session, with equal tables and whole outputs. Every reused answer, computed again on a full run, gave the same answer: 0 differences in 7.15M reductions, 153,930 exclusions and 156M lookups.

**Provenance.** Q2 of the checker-speed probe, "pursue the solver's re-normalization of meets, with a pass that changes no result", by the coordinator's call. The guard is the probe skeptic's decision not taken, built by the coordinator's call 2, under P-148 ("The checker's speed comes right after its correctness."). Climb batch 16, rung S.
