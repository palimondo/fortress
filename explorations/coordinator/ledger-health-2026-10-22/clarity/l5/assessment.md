<!-- The ledger clarity run's chunk l5 (rows 665, 670, 682, 695, 697, 701, 713, 723, 726, 759): each row judged by the record rubric's six checks at cdb84fba5, with its disposition and the evidence read. -->

# Chunk l5: assessment

Base: `cdb84fba5` (HEAD). Nothing was built or run. Every finding below comes from reading the tree, the commits, the batch records and the record. Marks: P pass, F fail, U unresolved. Sc scope, Pr present meaning, Ev evidence, Co comprehension, Ow ownership, Cn consistency.

| Row | Sc | Pr | Ev | Co | Ow | Cn | Disposition |
|---|---|---|---|---|---|---|---|
| 665 | F | F | P | P | F | F | rewrite |
| 670 | P | F | F | P | P | P | rewrite |
| 682 | P | F | P | F | P | F | rewrite |
| 695 | P | F | F | P | P | F | rewrite |
| 697 | P | F | F | P | P | F | rewrite |
| 701 | F | P | P | P | P | F | rewrite |
| 713 | P | F | F | P | P | P | rewrite |
| 723 | P | F | P | F | P | F | rewrite |
| 726 | P | F | F | P | P | F | rewrite |
| 759 | P | F | P | F | P | P | rewrite |

Counts: keep 0, rewrite 10, close 0, investigate 0.

## Row 665

- Sc F: the claim, "the load checks of an abstract method left without a body and of an `override` that overrides nothing skip generic objects, object expressions in generic functions and generic traits", still holds the `override` half. `efd6bb2f2` fixed that half: `BuildEnvironments.checkGenericOverrides` (`BuildEnvironments.java:895`) checks a generic trait, object or object expression once at its declaration, called from `:592` and `:875`. Only the abstract half stands: `declared = !(selfType instanceof GenericTypeInstance)` (`values/Constructor.java:263`), and `checkForDef` returns for `!declared` (`:431`). The generic-trait shape belongs only to the `override` half, since a trait may leave a method abstract.
- Pr F: "Rows 667 and 668 are fixed (668 by f9fe5c874)" tells the repair, and "pass 3 only a trait without static parameters (`BuildEnvironments.java:874`)" describes the code before `efd6bb2f2`. Today `forTraitDecl3` also checks a generic trait (`:875`).
- Ev P: the reproducer `tests/XXXAbstractMethodUndefinedGenericWalk.fss` (`load_exception_contains=does not define an abstract method declared in type S`) still reproduces the abstract half. `XXXAbstractMethodUndefinedGenericObjectExpressionWalk` exists.
- Co P.
- Ow F: the notes say that "`XXXOverrideNothingGenericWalk`, `XXXOverrideNothingGenericTraitWalk` ... gate the other shapes". Both were promoted to `OverrideNothingGenericWalk` and `OverrideNothingGenericTraitWalk`, which are tests of the fixed half.
- Cn F: F-145 ("A generic object is not checked (row 665)") and `revival-changes.md` ("Walk skips this check for a generic object (row 665)") give the row as the abstract half only, but the claim keeps both halves. Batch 13's refused note (W, `climb-batch-13/RECORD.md:186`) asked for this narrowing. The batch 13 O and batch 14 W refused notes (rows 667 and 668 fixed; a check per instance would now ask for coverage, not measured) are folded in. Batch 13 W's skeptic note is row 693's subject, and it becomes a sibling.
- Evidence read: `Constructor.java:250-290`, `:420-450`; `BuildEnvironments.java:850-905`, `:1045-1075`; `git log -S checkGenericOverrides`; the tests named above; rows 647, 649, 653, 667, 668, 693; F-145, P-147; refused notes at `climb-batch-13/RECORD.md:172`, `:186`, `:187` and `climb-batch-14/RECORD.md:152`; signals notes-xxx-gone ×2, notes-refused (`cf40fd6a1`), pinned-file-changed.

## Row 670

- Sc P.
- Pr F: "which walk now refuses at load" is relative to a time, and the before-and-after story "on 7fa767d48 it prints its events and exits 0" and "`npbft.fss` stopped at run time before" is told as history. The new line keeps both facts, each pinned to its commit, as what the demos do without the check.
- Ev F: "no `asFloat` (`Library/FortressLibrary.fss:379`)" has no commit, and the abstract `asFloat(self): RR64` is now at `:382`. The demo lines `GenomeUtil1z.fss:68` and `GenomeUtil2a.fss:74` are unchanged. `npbft.fss` changed only at `:130` (`5ad4a9957`, `10.0^(-6)`). Batch 14 W's refused note (`climb-batch-14/RECORD.md:153`) is missing: under the coverage rule the three objects are refused as before. `compile-ladder/rung-walk-coverage/REPORT.md:153` confirms it.
- Co P. Ow P.
- Cn P: sibling 649 is FIXED, and it is the check that refuses these demos. That is consistent.
- Evidence read: `ProjectFortress/demos/GenomeUtil1z.fss:60-75`, `GenomeUtil2a.fss:70-78`, `npbft.fss:28-55`, BirdCount imports; `git log`/`git diff 8803d2f45` of the demos; `Library/FortressLibrary.fss:380-396`; `rung-walk-coverage/REPORT.md` § 6; signals refused-note and siblings-closed.

## Row 682

- Sc P: the claim matches `compiler_tests/XXXNatOpenOverloadChecker.test` (`compile_err_WIcontains=There are multiple declarations of f with the same parameter type`).
- Pr F: the notes open "Unsettled: the section reads ... so the pair breaks the Meet Rule" and end "Settled for the checker: `reviews/array-judgements-popl-check.md` § 7". A reader cannot tell which holds. § 7.2 settles the reading: the refusal follows from the opening rule, and the status word is the curator's.
- Ev P: `TypeAnalyzer.scala:266-278 at 7dd0adf0c` is pinned. The opening is now at `:285-298`.
- Co F: the notes do not name the hinge, review-queue item 30 (way 4a, PLAN item 13.3: "row 682 hangs on it").
- Ow P.
- Cn F: batch 17 A's refused note (`climb-batch-17/RECORD.md:184`) says that the type face is refused too (`XXXOpenTypeOverloadChecker`), and PLAN item 13.3 says the same. The row lacks it. F-270 agrees with the claim.
- Evidence read: `reviews/array-judgements-popl-check.md` § 7.2; PLAN:168-172; review-queue item 30 (`review-queue.md:61`); F-270; `TypeAnalyzer.scala:283-312`; `compiler_tests/XXXNatOpenOverloadChecker.test`, `XXXOpenTypeOverloadChecker.{fss,test}`; signals notes-refused (`24db899fa`), pinned-file-changed.

## Row 695

- Sc P: the claim is narrowed in the new line to an object-typed self parameter, as the notes already said ("at an object-typed `S` only"). Batch 14 S's skeptic and `SelfTypeReturnSelfAtTraitRun` show that the body runs at a trait type.
- Pr F: "Reached only once the checker accepts such a body: under the self-typed judgement's checker shadows (stock refuses it, distance class S1)" is false today. The checker accepts such a body (P-146, F-225), and the last sentence, "Reached since F-225", contradicts the first. `cf40fd6a1` names this row among those "kept notes that the batch made untrue".
- Ev F: the reproducer is `none`, though `compiler_tests/XXXSelfTypeReturnSelfRun.test` (`run`, `run_out_contains=REACHED`) and its `SelfTypeReturnSelfRunLink.test` reproduce the claim, and the notes name the first test.
- Co P. Ow P.
- Cn F: batch 14 S's and batch 15 C's refused notes (`climb-batch-14/RECORD.md:155`, `climb-batch-15/RECORD.md:150`), which name the trait-typed case and its test, are missing. F-225 agrees with the claim.
- Evidence read: `compiler_tests/XXXSelfTypeReturnSelfRun.{fss,test}`, `SelfTypeReturnSelfRunLink.test`, `SelfTypeReturnSelfAtTraitRun.{fss,test}`; F-225; `git show cf40fd6a1`; `CodeGen.java` springBoard sites (no mechanism line could be pinned by reading, so the row stays NEGATIVE-BOUNDED); signals notes-refused.

## Row 697

- Sc P: `OverloadedFunction.java:509` still reads `distinct |= unequal && (allObjInstance1 || allObjInstance2)`.
- Pr F: "Climb batch 16 rung W (`9879d4386`) kept the shortcut save for a generic object's coinciding instances (`:443-446`); repair waits on row 433" tells a batch story. Row 433 is FIXED (`2b1cd8e63`), so the wait it names is over. The `Any` method of the `distribute` pair is now `distribute[\K\](r: ActualReduction[\R,K\])` (`Library/FortressLibrary.fss:3250`). Whether removing the shortcut still refuses anything is a question for the fix, not for the claim.
- Ev F: the reproducer is `none`, though `tests/XXXReturnRuleObjectParamWalk.fss` (`load_exception_contains=the first result is not a subtype of the second`) shows the same shortcut. Its pair at position 2 is `B` (a trait) against `C` (an object below it), and the notes name it. Its cited lines `:486`, `:427-433` are pinned at 75be286ac. They are `:509`, `:432-435` and `:437-442` now.
- Co P. Ow P.
- Cn F: row 788 names 697 as a sibling, but 697 does not name 788. Batch 19 P's skeptic's refused note (`climb-batch-19/RECORD.md:128`, the generic face loads, row 788) is missing.
- Evidence read: `OverloadedFunction.java:300-340`, `:420-450`, `:500-515`; `git log -L441,442`; `tests/XXXReturnRuleObjectParamWalk.{fss,test}`; rows 99, 433, 788; `coordinator/CLIMB-BATCH-16.md` § 4; `Library/FortressLibrary.fss:3240-3451` (`distribute`); signals notes-refused ×2, pinned-file-changed.

## Row 701

- Sc F: "refuses every function, object and trait declaration that carries a `where` clause or a contract" overstates. A `where` clause on an `extends` entry compiles, at every instance (row 774). A trait's or an object's contract and `throws` clause are dropped by the disambiguator (`TypeDisambiguator.java:112-113`, `:137-138`; row 781), so the guards at `CodeGen.java:4108-4109`, `:5028-5029` are never reached. Review-queue item 182 records this, and F-181 already states the narrowed form ("in its own header ... every function or method with a contract").
- Pr P.
- Ev P: the guard lines `CodeGen.java:2967`, `:2971`, `:2976`, `:4107-4109`, `:4115`, `:5027-5029`, `:5033` are unchanged at HEAD. `XXXNatOpenRun.test` (`compile_exception_contains=Can't compile TraitDecl NatParamT`) reproduces the trait case.
- Co P. Ow P.
- Cn F: the claim disagrees with F-181 and with rows 774 and 781, which both name 701 as a sibling. 701 names neither. The refused notes of batch 17 A (`climb-batch-17/RECORD.md:185`, a type `where` variable stops the trait) and batch 18 K (`climb-batch-18/RECORD.md:144`, a function's `where` stops `forFnDecl`) are missing. `XXXWhereBoundChecker.test` (`compile_exception_contains=Don't know how to compile this kind of FnDecl`) holds the function face.
- Evidence read: `CodeGen.java:2960-2978`, `:4100-4118`, `:5020-5036`; `TypeDisambiguator.java` grep; rows 774, 781, 304, 650, 677, 118; F-181; review-queue item 182; `rung-checker-conditional-extension/REPORT.md:220-235`; `compiler_tests/XXXNatOpenRun`, `XXXWhereBoundChecker`, `XXXOpenTypeEscapeChecker`, `WhereVariableBoundCallChecker`; signals notes-refused ×2.

## Row 713

- Sc P: the claim matches `XXXOverloadTwoBoundsClosedTraitExclusion.{fss,test}` (`compile_err_contains=Invalid overloading of f`).
- Pr F: "ee1aa1a95 accepted it: ... Since rung C (`4356454a2`) the meet over `T` stays `K` and `R[\T\]`" is a repair story. The mechanism is in the tree now: `normConjunct` expands a closed trait only against a conjunct that names no variable (`TypeAnalyzer.scala:762-774`).
- Ev F: "Walk refuses it at load ('at least one pair of parameters must have excluding types')". Since `5262a2412` walk names the rule. Batch 18 W's skeptic's refused note (`climb-batch-18/RECORD.md:148`) gives "fails the Meet Rule" (`OverloadedFunction.java:835`). The old message still exists at `:583`, for a pair with a symbolic parameter, so only the note's measurement settles which one this pair gets. The new line takes the skeptic's.
- Co P. Ow P.
- Cn P: Appendix I's "Passages not yet revised" still lists the question (`changes.tex:4092-4097`). Sibling 690 is FIXED and is kept as the related pair.
- Evidence read: `TypeAnalyzer.scala:760-790`; `Specification/appendices/changes.tex:4062-4104`; `OverloadedFunction.java:570-590`, `:825-840`; `git log -1` of `5262a2412`, `4356454a2`, `ee1aa1a95`; the test; signals notes-refused, siblings-closed.

## Row 723

- Sc P: `GenericMethod.finishInitializing` (`:138-152`) still evaluates the parameter types in `getEnv()` with no static parameters. `5262a2412` added `getTypeEnv` (`:106`) but did not change this method. `OverloadedFunction.java:161` is unchanged.
- Pr F: "The same on the base." needs the batch's base to be read.
- Ev P: `GenericMethod.java:137` and its TODO `:133-134` are pinned at 317fc0ef5. They are `:149` and `:144-145` now. `tests/XXXGenericFunctionalMethodBesidePlainWalk.fss` reproduces the claim.
- Co F: "A dotted pair too (generic-distribute probe § 5)" names a probe by a nickname and no path.
- Ow P.
- Cn F: row 760, the dotted pair, names 723 as a sibling, but 723 names neither 760 nor its own probe path. Batch 17 W's refused note (`climb-batch-17/RECORD.md:193`, "The dotted sibling is row 760") is missing. Sibling 567 is FIXED and kept.
- Evidence read: `GenericMethod.java:95-160`, `git show 317fc0ef5:...GenericMethod.java`, `git show 5262a2412 -- GenericMethod.java`; `OverloadedFunction.java:155-165`; rows 567, 724, 760; the test; signals notes-refused, pinned-file-changed.

## Row 726

- Sc P: `isDeclaredName` (`OverloadingChecker.scala:742-746`) admits an `SOp` only where `NodeUtil.validOp` holds (`NodeUtil.java:1466-1483`), so no symbolic operator reaches the check. `OverloadSet.java:410-411` throws the quoted message. The test is `XXXNoDuplicatesRuleSelfPositionsOperator.test`.
- Pr F: "Dropping `opr \|\|(a:FlatString, self)` from the api clears both full-check errors and half of `FlatString`'s export error" describes a change that has since been made.
- Ev F: "`FlatString`'s api declares this pair (`Library/FlatString.fsi:17`, `:20`)" is false. `Library/FlatString.fsi:16-21` declares only `\|\|` with `self` first (`4190069c4`). This is batch 19 S's refused note (`climb-batch-19/RECORD.md:130`).
- Co P. Ow P.
- Cn F: F-245 says "batches since cleared `FlatString`'s pair (2; F-259)", and the row still names it. F-223 and F-80 agree with the claim. Batch 16 K's refused note (`climb-batch-16/RECORD.md:163`, the abstract functional methods' check reads no symbolic operator either) is missing. The record-says-fixed signal (F-245) is a false positive: F-245 measures a copy of the checker, and the checker as built skips the operators. `String`'s `(a:Any, self)` beside `(self, b:Any)` (`FortressLibrary.fsi:2502-2503`) is not this row's shape, since the types differ by position. It is row 585's.
- Evidence read: `OverloadingChecker.scala:735-750`; `NodeUtil.java:1466-1483`; `OverloadSet.java:405-412`; `Library/FlatString.fsi`, `git log -- Library/FlatString.fsi`; `FortressLibrary.fsi:2496-2520`; rows 584, 585; F-80, F-223, F-245; the test; signals notes-refused ×2, pinned-file-changed, record-says-fixed.

## Row 759

- Sc P: Appendix I (`changes.tex:2887-2893`) gives the same scope: the checker accepts the pair where the bound is not written, and refuses it where the bound is written, `Any` or below.
- Pr F: "as walk does after climb batch 17 rung G" and "At 3aea3da53, whose compiled path rung G leaves as it is" tell the row's history through batches.
- Ev P: the measurements are pinned (3aea3da53). The reproducer `none` is explained ("No gated test passes while it shows"), as `tests-writing.md` (an `XXX` compile test whose program compiles is red) confirms. The command's `P.fss` is a placeholder (signal path-gone), and the new line drops it.
- Co F: the notes do not say why the bound matters. Batch 19 P's refused note (`climb-batch-19/RECORD.md:126`) gives the mechanism: the compiled path bounds an unbounded `T` by `Object` (row 412), below `Any`, and `g[\T extends Object\](a: T)` beside `g(a: Object)` is refused at a93fb3bfd. It also says that Appendix I names the row.
- Ow P.
- Cn P: F-274 ("walk refuses `g[\T\](a: T)` beside `g(a: Any)`, and the compiled checker accepts that pair (row 759)") agrees. Row 412 is open.
- Evidence read: `Specification/appendices/changes.tex:2885-2895`; F-274; rows 412, 549, 589, 742; `git log -1` of `a93fb3bfd`, `3aea3da53`; refused note; signals notes-refused, path-gone.
