# Skeptic of rung H (`rung-exclusion-remainder`): approved, with required corrections

*Row numbers, noted at the gather of climb batch 7: the rows 456 to 461 this file cites are rung H's provisional numbers. The gather opened 456, 457 and 458 as rows 456, 457 and 458, folded 459 into row 407 as a note (correction 2), and opened 460 and 461 as rows 459 and 460. Its recommended rows 1, 3 and 4 are rows 461, 462 and 463, and its recommended row 2 is a note on row 473, rung B's row for the same defect (`explorations/compile-ladder/climb-batch-7/RECORD.md`, "Final row numbers").*

The claim holds. The 18 exclusion errors are gone and none appears in their place. The count stage reads 44 when I re-run it in the worktree, and the distance stage reads 1,661, the worker's table class for class. The edit is the one the report describes. The record is not honest in three places, and all three can be corrected:
- a second walk output changes, and the rung neither measured it nor named it;
- one "new" ledger row repeats row 407;
- the new FACTS entry and row 461 say the clause-binding `typecase` form "works on both", but the compiled run cannot read that binding (row 351).

None of the three contradicts a decision on record, and each has a correction below. The corrections are a checklist the commit stage must close.

Machine for every run below: `nproc` 4, `Intel(R) Xeon(R) Processor @ 2.10GHz`, `cpu MHz` 2100.000, OpenJDK 25.0.4, `FORTRESS_THREADS=1`. The load average was 6.2 to 9.6 at the starts, and rung B's worktree was running throughout. No timing here is a comparison.

## 1. The briefing
I read the whole extract (both parts): route A, answer 9, the 2026-09-21 library commit, the override-shape rule, the 2026-09-27 stops rule, rung D's stop, rows 354 and 358, rung F's D4, the landed count, the price's § 1, the distance note's method, the Trait Types section, the specification's `TotalComparison`, `Maybe`, the prelude's `TotalComparison`, the sketch, and the two FACTS entries. I also read `explorations/coordinator/CLIMB-BATCH-7.md` § 1, § 3 H and § 4.

## 2. The provenance block (in `reportText`; the harness refused REPORT.md)
I opened every file:line with `sed -n`, and each says what the block says:
- `probes/checker-count-preedit.txt:5` is `FortressLibrary 38`.
- `Specification/basic/types-vals-vars.tex:218-237` is instantiation exclusion. `traits.tex:299-313` is the rule on declarations. `traits.tex:223-227` says two traits that exclude each other cannot extend one another.
- `CompilerBuiltin.fsi:719-722` is the prelude's commented-out clause.
- `keep/make-flat-lib.py:36-37` and `:72-73` are the two header substitutions.
- `perf-probes/nat/zero/make-lib.py:101-128` is P3d.
- `Library/FortressLibrary.fss:33-37` is `cast`'s clause-binding `typecase`, and `Library/Reflect.fss:252` is `x typed T`.
- `CompilerBuiltin.fss:1526-1545` is the prelude's `TotalComparison`, and `flat-tower-sketch.fsi:126-127` is "MIN, MAX, MINMAX, <=, >= written out".
- `.fss:170-175`, `:1402`, `:4548-4556` and `.fsi:120-122`, `:433-436` are the edited lines.
- `comparison.tex:28-32` is the `%%` source of the rendered declaration at `:43-58`.

The spec line cites prose chapters only, and the historical line names the two 2012 files the diff edits. **The block passes.**

## 3. The recorded failure and the recorded pass
- **The pre-edit capture is genuine.** `probes/checker-count-preedit.txt` (62, `FortressLibrary 38`) is committed in `dbee29285`, which touches no library file. The library edit is the next commit, `8ebb1977a`. The capture equals batch 6b's landed table (`explorations/compile-ladder/climb-batch-6b/gate/checker-count.txt`).
- **The count stage reproduces.** I ran `explorations/coordinator/tools/checker-count/run.sh` in the worktree at `81946b524`, clean, with a fresh scratch directory: **`#total 44`**, `FortressLibrary 2`, `NativeArray 44`, `RangeInternals 42`, `#crash none`, `#shadow` matching. The api's one error is `AnyIntegral`'s `comprises` clause at `.fsi:436` (`explorations/compile-ladder/rung-exclusion-remainder/probes/skeptic/checker-count-rerun.txt`). The difference from 62 is exactly the 18 exclusion reports of the landed list. The stage runs on private caches built from nothing, so it is not a cache or build artefact.
- **The distance stage reproduces.** I ran `explorations/coordinator/tools/distance/run.sh` in the worktree (928 s): **1,661**, and `compare.sh` against the worker's post-edit table prints `DISTANCE SAME 1661`. Against the pre-edit table the kinds and classes move exactly as the report's § 9 says (`probes/skeptic/distance-rerun.txt`).
- **The report names the manifest's numbers.** It gives `expectedCheckerCount: 44` and no `expectedCheckerCrash` (the crash line is `none` both times).
- **The cleared copy reproduces.** Clearing the api's hierarchy pass with the sketch's shape on the **final** library reads 190, the same 190 errors, error for error, as the worker's list made on the edit's first form (`probes/skeptic/variant-counts.txt`, the `cleared` variant).

## 4. The diff
The diff edits `Library/FortressLibrary.fsi` and `.fss` and adds two tests. I read it line by line:
- The five restated members carry `StandardTotalOrder`'s bodies word for word (base `.fss:277-282`).
- `AnyMaybe`'s new `=` is `Equality`'s body.
- `andRelCond` is the old second `ANDCOND`'s body, unchanged.
- `andCondCombine` is P3d with a clause binding and two ascriptions.
- The two `FilterGenerator2` call sites are rewritten.

The edit does what the report says, and nothing else. No source comment is added. The team's comments on `TotalComparison` are kept (D9).

## 5. The precedent search, and a device the rung did not list
The worker found the prelude's edit, the price, the copy, the sketch and zero.md's P3d, and followed them. I found no other exclusion site: my distance run's exclusion kind reads 0.

**The rung missed the library's own device for "a partial order that also has MIN and MAX".** That device is `StandardPartialOrder[\X\]` beside `StandardMinMax[\X\]`:
- the 2012 `Number` (`a874948ac:Library/FortressLibrary.fsi:274`);
- the flat `RR64` and `QQ` (`Library/FortressLibrary.fsi:291`, `:387`).

`TotalComparison` gets its partial order from `Comparison` (`StandardPartialOrder[\Comparison\]`). `StandardMinMax[\TotalComparison\]` shares no generic with that order. So `trait TotalComparison extends { Comparison, StandardMinMax[\TotalComparison\] }` keeps the part of the dropped `StandardTotalOrder` that conflicts with nothing. I measured it on a copy (`probes/skeptic/make-variants.py`, variant `minmax`):
- **Count stage:** 44, no new hierarchy error. Cleared with the sketch's shape: 192, which is 190 plus exactly two errors, row 421's `(T,T)` at `TotalComparison`'s `MIN` and `MAX` in the api (`probes/skeptic/variant-counts.txt`, last section).
- **Distance stage:** 1,672. That is 1,661 plus six row-421 errors at `TotalComparison`'s `MIN` and `MAX` (api 2, component 4), plus 2 and 3 in the two families that vary from run to run (`probes/skeptic/distance-variant-minmax.txt`).
- **Walk:** every value of `SkCmpTable`, `SkCmpMinMax` and the guard test is the base's (`probes/skeptic/SkCmpTable-walk-minmax.txt`, `SkCmpMinMax-walk-minmax.txt`, `guard-test-walk.txt`). `BIG MIN` and `BIG MAX` over total comparisons work again (§ 13).

What the device costs is the reason I do not refuse over it. Rung B, in this same run, declares `StandardMinMax`'s `MIN` and `MAX` returning `T`, and that removes the six errors on the merged tree. On H's branch alone, though, they are new errors at a declaration of H's that depend on B's edit (the batch's rule 2), and § 4 of the batch record planned H's `MIN` and `MAX` as restated "inside `TotalComparison`", not inherited from B's `StandardMinMax`. So the choice between (a) as landed and (b) the device is a choice of the rung's design that it did not report, and it goes to Pavol (forPavol). The rung's D1 and D2 must list (b) with these measurements.

## 6. The tests
- `ProjectFortress/tests/ExclusionRemainderRungH.fss` passes under walk on the final library, rc=0 (`probes/skeptic/guard-test-walk.txt`). It has one comment line.
- `ProjectFortress/tests/XXXLexicoUnorderedRungH.fss` fails as expected, rc=1, on the `LessThan LEXICO Unordered` assert (`probes/skeptic/xxx-test-walk.txt`). It has one comment line.
- The interpreter harness takes the expectation from the file name alone (`FileTests.java:605`, `InterpreterTest` with `s.startsWith("XXX")`). No `.test` file is needed: D8 is right.
- Run (c) of `probes/harness-new-tests.txt` shows the XXX test red under the deliberate fix.
- Caveat: the worker's harness run (a) ran on the edit's first form, not the final one. My `bin/fortress` run on the final library covers that gap.
- The rung's test is the stage, and § 3 checks it.

## 7. The competing-declaration grep
- `andRelCond` and `andCondCombine` occur only in `Library/FortressLibrary.fss`. The search covered `ProjectFortress/` (both corpora and `src/com/sun/fortress/` whole), `Library/`, and the two microGPT trees.
- `StandardTotalOrder[\TotalComparison\]` appears elsewhere only commented out or in compile-path corpora with their own prelude text: `CompilerBuiltin.fs?`, `not_working_library_tests/ComparisonLibrary.fs?` and `Comparison1d.fss`, `compiler_tests/Compiled17ee.fss`, `other_compiler_tests/Gen0.fss`.
- No Java or Scala source names `TotalComparison`, `AnyMaybe`, `RelationalPredicateCondition` or `ANDCOND` in a string.

## 8. The record fragment (in `recordText`)
The FACTS appends are true as written, apart from the points below, and their numbers are the ones I re-ran: 44, 1,661, 190. The ledger note numbers new rows after 455 and appends to row 430 without renumbering anything. Three points need correcting:
- **Row 459 repeats row 407.** Row 407 is walk's `StackOverflowError` on a trait that `comprises` its own type parameter: the same frames (`SymbolicType.excludesOtherInner:74`, `FType.excludesOtherInner:291`), the same idiom (`CompilerAlgebra.fsi:16`) and the same silent reading of `traits.tex:163-165` (`explorations/fortress-gap-ledger.md` row 407). The `Integral[\I\] comprises I` instance is an append to row 407, not a new row.
- **The new FACTS entry says the clause-binding form `x:T =>` "works on both", and row 461 implies it.** It checks in the compiled checker and runs under walk, but on the compiled path the code generator cannot read a `typecase` clause binding (row 351, `CodeGen.forTypecase` never reads `c.getName()`). I measured it: `SkTcBind` compiles, and its run dies with `NoClassDefFoundError: SkTcBind$r` (`probes/skeptic/SkTcBind-compiled.txt:6-7`). The specification's grammar has no per-clause `Id :` form (`Specification/basic/expressions/typecase.tex:64-72`). The implementation's grammar has it (`ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:237-251`, `ProjectFortress/astgen/Fortress.ast:1661-1664`), and it has no `TypecaseBindings`: it reads `typecase Expr of` (`DelimitedExpr.rats:43`). So `typecase rp = p of` parses as the equality `rp = p`, which is where "Variable rp is not defined" comes from. `andCondCombine` (`Library/FortressLibrary.fss:4550-4552`) is the library's second site of row 351's typecase half, after `cast` (`:33-37`).
- **Row 460's and § 6's specification citations `traits.tex:236-240` and `:241-246` are a `\note`.** In a release build it renders as nothing (`Specification/fortress/fortress.tex:35-36`), and in the draft it renders as a "Draft note". The rendered rule is the `Molecule` example: a trait the `comprises` clause does not list may not extend it (`Specification/basic/traits.tex:262-279`). The api's ellipsis is `:160-162`. Row 354 cites the same note and calls it a note, and these citations should too.

## 9. The three homes
- **456: home 3.** The probe `probes/values/HValues.fss` and its captures are committed. The report shows no grep for this row. The specification's partial-order properties (`Specification/advanced-lib/algebraic-constraints.tex:294-302`, `(a PREC b) IFF ((a CMP b) === LessThan)`) would settle it if comparisons were declared an order. The specification's `Comparison` is not declared one (`comparison.tex:134-139`); the library's is (`Comparison extends StandardPartialOrder[\Comparison\]`). So the specification is silent, but the row must say why the properties do not apply.
- **457: home 2**, correct. It is XXX-named, and I ran it failing (§ 6).
- **458: home 3**, correct. The grep finds nothing in `Specification/`, which I re-ran, and the captures are committed.
- **459** is row 407's (§ 8).
- **460 and 461:** the fourth case, with verified probes. My `SkTcShort` confirms the checker half of row 461: walk prints `rel`, and the compiled checker gives "Rel->String is not applicable to an argument of type Cond" (`probes/skeptic/SkTcShort-compiled.txt:5-6`). `typecase.tex:126-133` settles it for walk.
- **My own measured defect, the one this rung causes: `BIG MIN` and `BIG MAX` over total comparisons (§ 13).** The specification is silent: its `TotalComparison` declares no `MIN` or `MAX` and extends no order (`comparison.tex:27-42`). So it is home 3: my captures, committed, and a row (recommendedRows). If the rung takes the device of § 5 instead, it is home 1: a `BIG MIN` and a `BIG MAX` assert in the guard test.

## 10. The count table against the report
`probes/checker-count-postedit.txt` reads `#total 44`. REPORT § 8, record.md ("`expectedCheckerCount: 44`") and the structured report all declare 44. **They agree.**

## 11. The ledger and the sibling sites
- **Rows the rung missed:**
  - Row 407, which is its row 459 (§ 8).
  - Row 351, which bears on the chosen `typecase` form (§ 8).
  - Row 341, C4's `MAX[\I\]` against `StandardTotalOrder.MAX`, which is the load refusal the sketch way and the open way meet. It should be cited beside rung F's D4 in row 460.
- **Sibling sites of the defect repaired: none left.** The distance stage's exclusion kind is 0.
- **Sibling of the `ANDCOND` change:** `FilterGenerator.filter` (`.fss:3521`) still writes `self.p ANDCOND p'`. It could reach the relational overload before the edit, for a generator of generators that is not a `Generator2`. `relational` is read only by `Generator2.fss:161`, `:294` and `:413`, so no library path loses anything. It is covered by row 458's wording ("a program's own conjunction") and needs no new row.
- **Pre-existing and not the rung's:**
  - `ConcreteRelationalPredicateCondition[\E\] extends RelationalPredicateCondition[\()\]` where `[\E\]` is meant (`.fss:4540`).
  - `relationalPredicate`'s declared `E -> RelationalPredicateCondition[\E\]` against a body over `Generator[\E\]` (`.fss:4566`).

  Both are inside H's section 4 ownership ("the `Condition` functions whose bodies build it") but outside its errors. I note them here and open no row, because the distance stage already carries them. My run's full output lists "Function body has type Generator[\E\]->RelationalPredicateCondition[\E\], but declared return type is E->RelationalPredicateCondition[\E\]" at `.fss:4566`, and the `relation` and `target` return-type errors at `:4541-4542`. They belong to the later batches' component-body work.

## 12. The decisions on record
- **Route A (2026-09-24):** the rung keeps the rule and conforms the library. This is in scope and in its words.
- **2026-09-21, the library commit:** the rung keeps the approved clause and its `NOT YET` comment. It reports that the parked accommodation is not moot on the flat library, which is a point for Pavol and correctly sent to him.
- **The batch record's § 1:** the sketch's shape changes a walk output, so the shape comes to Pavol with the ways, and the rung did not take it. That is right. The list of ways lacks one on file: the team's 2008 clause on `Integral[\I\]` (FACTS.md, "The tower closure of `02d09a39f` has no spelling the compiler's checker accepts"). I measured it on the flat library: **48**, five errors "X is included in the comprises clause of Integral but … does not extend Integral[\I\]" (`probes/skeptic/variant-counts.txt`, variant `way2008`).
- **2026-09-26, rung D's stop:** applied within its scope, to `XXXCoercionTupleOverloadRungC`, with row 430 appended.
- **2026-09-24, after the override shape:** "a fork put to him names the library's own way first". The `AnyIntegral` fork does. The `TotalComparison` design (§ 5) was never put as a fork, which is the correction.
- **No landed text contradicts a decision.**

## 13. Differentials (my programs, walk against the compiled run, one thread; the rung touches no mutable state)
All captures are under `probes/skeptic/`, run by `sk-run.sh`: walk on the base (`ff1649cea`'s library heading the source path), walk on the edit, walk on the `minmax` variant, and the compile path from the ladder's pristine prelude cache.

- **`SkCmpTable`: the nine total pairs, and `Unordered` typed `Comparison`.**
  - Walk: the same on the base and the edit.
  - Compiled: `LessThan CMP EqualTo` is `LessThan` where walk says `GreaterThan` (row 456; the specification is silent, § 9). `LessThan LEXICO Unordered` is `LessThan` where walk says `Unordered`; the specification settles this one against walk (`comparison.tex:168-178`, row 457).
  - **New:** the compiled prelude puts every total comparison below `Unordered` (`LessThan < Unordered` true, `CMP` `LessThan`, `SkCmpTable-compiled.txt:15-17`), where walk has them unordered (`SkCmpTable-walk-edit.txt:12-14`). The bodies are `CompilerBuiltin.fss:1530`, `:1537` against `Library/FortressLibrary.fss:166-167`. The specification declares no `<` on comparison values, so it is silent: a recommended row. The rung did not cause any of these.
- **`SkCmpMinMax`: `MIN`, `MAX` and `MINMAX` of the nine pairs.**
  - Walk: the same on the base, the edit and the variant.
  - Compiled: refused, "Could not check call to operator MINMAX". The compiled prelude declares none of the three on comparisons (`CompilerBuiltin.fsi:719-727`), and neither does the specification (`comparison.tex:27-42`).
  - Walk's library goes beyond the specification here, which needs no action.
- **`SkCmpBig`, `SkCmpBigMin`, `SkCmpBigMinMax` (walk only; the compile path has no generic big `MIN`).** This is **a changed walk output that the rung causes and does not name**:
  - `BIG MAX` and `BIG MIN` over `<|[\TotalComparison\] …|>` answer `GreaterThan` and `LessThan` on the base (`SkCmpBig-walk-base.txt:4-5`, `SkCmpBigMin-walk-base.txt:3`).
  - On the edit they end the run with `ProgramError` "Failed to find any matching overload" against `BIG MAX[\T extends StandardMax[\T\]\]` and `BIG MIN[\T extends StandardMin[\T\]\]` (`SkCmpBig-walk-edit.txt:5-7`, `SkCmpBigMin-walk-edit.txt:4-6`).
  - On the `minmax` variant they answer as the base (`SkCmpBig-walk-minmax.txt:4-5`, `SkCmpBigMin-walk-minmax.txt:3`).
  - `BIG MINMAX` fails on the base too, with a unification error, for every element type, `ZZ32` included (`SkBigMinMaxInt-walk-edit.txt:5`). That is a library defect of its own at `.fss:3213-3215`, and a recommended row. The edit only changes its message (`SkCmpBigMinMax-walk-*.txt:4`).

  The rung's D1 names `BIG MIN` from reading. The report's "One behaviour changes outside every gated test" and its stop list leave it out.
- **`SkRel` (walk only; the compile path cannot import `Generator2`).**
  - Three relational guards, a relational/plain/relational mix, `tails`, `segs` and `BIG MAX` with three guards all give the same values on the base and the edit. The fused and naive results agree, and `relational` after three `filter`s stays `true`.
  - The one difference is row 458, `p1 ANDCOND p2` relational `true` → `false` (`SkRel-walk-base.txt:10`, `SkRel-walk-edit.txt:10`).
  - This covers what the rung's two-guard test does not: that a closure of type `Generator[\E\] -> AndRelationalPredicateCondition[\E\]` still matches the arrow clause in `andCondCombine`.
- **`SkMaybe` and `SkMaybeEq`.**
  - Walk: the same on the base and the edit, including `Maybe`s of different element types, values typed `AnyMaybe` against `AnyUniqueItem`, `just`, `=/=`, `SQCAP` and `SQCUP`. This confirms D3.
  - Compiled: `SkMaybe` is refused with "Variable __cond is not defined" (`SkMaybe-compiled.txt:5`). The specification's `if x <- e then` (`Specification/basic/expressions/if.tex:29-34`, `:49`) desugars to `__cond`, which no compiled prelude declares. That is a recommended row, not the rung's. `SkMaybeEq` is refused with `AnyMaybe is undefined`: the compiled world has no such type.
- **`SkTcBind` and `SkTcShort`:** § 8 and § 9.

## 14. The failure-mode question
No loud failure became a quiet value under walk. The movement runs the other way:
- `BIG MIN` and `BIG MAX` over total comparisons went from a value to a loud `ProgramError`.
- `BIG MINMAX`'s failure changed its message.
- `relational(p1 ANDCOND p2)` changed quietly from `true` to `false`.

In the checker, 18 errors disappear that the specification's rule shows to be the library's, not false alarms of the checker. Their removal is conformance, not a silenced diagnosis.

## 15. Stops the rung meets (the batch record's intro, for H)
- **A new checker error that the distance stage shows as caused rather than unmasked: met.** The rung named it. There are seven unpaired new errors (`probes/distance-pairs.txt:33-40`).
  - The site base `.fss:2710` (`.fss:2717` after the edit, `array2(f)`'s `fill(f)`) errs in my run too (`probes/skeptic/distance-rerun.txt`, last line). That makes 4 of 4 runs after the edit against 0 of 2 before, so it reads as moved by the edit within a family that varies, not as run-to-run noise alone.
  - Rung A rewrites that call site on the merged tree.
  - The stop is reversible, so it is lifted by POSITIONS 2026-09-27, the stops a batch record reserves.
- **A changed walk output: met twice.**
  - `relational(p1 ANDCOND p2)`: named by the rung.
  - `BIG MIN` and `BIG MAX` over total comparisons: **not named by the rung** (§ 13).
  - Both are reversible, so both are lifted by the same entry.
- **Not met:**
  - No team test line changed.
  - No declaration the specification lists changed so that it no longer describes it. `TotalComparison`'s `extends` clause did not match `comparison.tex:27-32` before the edit and does not after; it is nearer now.
  - No declaration or file named as another rung's was edited: `FilterGenerator2`'s methods belong to no rung, and `StandardMinMax` is untouched.
  - No Java, Scala or specification edit.

## 16. Required corrections (the commit stage closes each)
1. **List the second changed walk output.** Put `BIG MIN` and `BIG MAX` over total comparisons into REPORT § 1 (replacing "One behaviour changes outside every gated test"), § 16 D1, § 18 and `probes/stops-met.txt`, citing `probes/skeptic/SkCmpBig-walk-edit.txt:5-7` and `SkCmpBigMin-walk-edit.txt:4-6`. Open its row (recommendedRows 1). Add the `StandardMinMax[\TotalComparison\]` device to D1 and D2 as the alternative not taken, with the numbers of § 5 (count 44, cleared 192 = 190 + row 421's two, distance 1,672 with six row-421 errors that rung B removes, walk values the base's). If the device is taken instead, a `BIG MIN` and a `BIG MAX` assert go into `ExclusionRemainderRungH.fss` (home 1), and the distance stage is re-run on the merged tree.
2. **Fold provisional row 459 into row 407** as an append (the instance `Integral[\I extends Integral[\I\]\] … comprises I` loading C4's check, `probes/integral/self-MicroGptFlatCheck.txt:22-60`). Renumber the rung's other provisional rows, and fix every citation of 459 in REPORT, record.md, `probes/for-pavol.txt` and the structured lists.
3. **Correct the new FACTS entry and row 461.** The clause-binding form checks in the compiled checker and runs under walk, but the compiled run cannot read the binding (row 351; `probes/skeptic/SkTcBind-compiled.txt:6-7`). The specification's grammar has no per-clause `Id :` form (`typecase.tex:64-72`). The implementation's `typecase` takes an expression, `typecase Expr of` (`DelimitedExpr.rats:43`, `:237-251`; `Fortress.ast:1661-1664`), which is why `typecase rp = p of` reads as an equality. Append to row 351 that `andCondCombine` (`Library/FortressLibrary.fss:4550-4552`) is a second library site of its typecase half, beside `cast`.
4. **Cite `traits.tex:236-246` as the `\note` it is**, in REPORT § 6 and § 17, row 460, the FACTS append on the tower closure and `specCitations`, and cite beside it the rendered rule, the `Molecule` example at `Specification/basic/traits.tex:262-279`, and `:160-162` for the ellipsis.
5. **Add the team's 2008 clause on `Integral[\I\]` to § 6's table and row 460**, measured at 48 on the flat library, five "does not extend Integral[\I\]" errors (`probes/skeptic/variant-counts.txt`).
6. **Correct the for-Pavol line "SQCAP is not on batch 8's list".** `SQCAP` is a member of the Meet Rule class (`explorations/perf-probes/nat/triage.md:62-63`), which is batch 8's (`explorations/coordinator/CLIMB-BATCH-7.md:62`).
7. **Row 456's specification cell:** show the grep, and say why `algebraic-constraints.tex:294-302` does not settle it: the specification's `Comparison` is not declared an order (`comparison.tex:134-139`), while the library's is.
8. **Cite row 341 in row 460's notes** beside rung F's D4, for the sketch way's load refusal.

## 17. Tracked paths
Every `explorations/compile-ladder/` path above exists and is committed in `029fbc1ae` on `wip/rung-exclusion-remainder`. There is one exception, this file itself: I did not write SKEPTIC.md into the tree, because the harness's rule for subagents is that report files are returned as text. The gather writes it from `skepticText`.
