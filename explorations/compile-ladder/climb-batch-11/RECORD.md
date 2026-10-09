# Climb batch 11: the gather's record

Written at the gather stage of climb batch 11 (2026-10-09), the run of `explorations/coordinator/CLIMB-BATCH-11.md` (rungs W, C, E and L), on `main` from the base `83b1cae784df32aac95d9b2c518466583423b092`. `main` was at `bdbe7643c` when the gather began, one coordinator commit above the base (the boot note, `postmortem-2026-09-19/held-list.md`), which touches no file a rung touches. All four rungs were approved, C after its judge's ruling, and each landed as one commit composed from its branch's net change; no branch is a parent of anything on `main`, and each branch stays as it is.

**Preconditions.** `git status --porcelain` was empty, and `83b1cae78` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0).

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff 83b1cae78...<branch>`; the folding helpers are in the gather's scratchpad, not in the tree. To run the closing tests, the gather seeded one merged tree outside the main tree from the batch's base build, `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base11 /home/user/fortress-gather11 - b872d65a1`, then `ant compileAll` there ("BUILD SUCCESSFUL", "Total time: 38 seconds", the caches started again) and the library order (five compiles, each exit 0, five jars). Nothing was built or run in the main tree or in the base build.

## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | E, `rung-checker-expected-type` | `wip/rung-checker-expected-type` at `641f8acad` | `27cb9e93b` |
| 2 | W, `rung-walk-open-param` | `wip/rung-walk-open-param` at `9472bf2b4` | `369982d85` |
| 3 | C, `rung-checker-overloading` | `wip/rung-checker-overloading` at `2a11010d7` | `2d22d3a35` |
| 4 | L, `rung-range-types` | `wip/rung-range-types` at `650a69217` | `b872d65a1` |
| | the rows' closes | | `b9e4a39fd` |

## The order the rungs were applied in

E, then W, then C, then L: the ascending order of each rung's lowest edited line in the files two or more rungs share, read from `git diff -U0 83b1cae78...<branch>`.
- The shared files are three: `Specification/basic/inference.tex` (W and E), `Specification/appendices/changes.tex` (W, C and E) and `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala` (C and E). L shares no file with another rung.
- E's lowest is `inference.tex:133` (its other hunks: `changes.tex`, an insertion after `:1925`; `STypesUtil.scala:1733`).
- W's lowest is `inference.tex:285` (`changes.tex` from `:1024`).
- C's lowest is `STypesUtil.scala:1622`, an insertion after `:1621` (`changes.tex`, an insertion after `:2809`).
- L has none, so its place moves no line of another rung; it went last.

The three files order the rungs differently: `inference.tex` puts E before W, `changes.tex` W before E before C, `STypesUtil.scala` C before E. So no order keeps every later hunk below every landed citation, and the gather took the rule's order. Every patch applied with `git apply --3way --index` and no conflict ("Applied patch to ... cleanly" for each file, after git's fallback to direct application). Each rung's own files on `main` match its branch byte for byte (`git diff --cached --stat <branch> -- <the rung's files but the shared ones>` printed nothing at each step, before the gather's own edits).

Lines that a later rung's hunks moved:
- W's records cite `inference.tex` on W's tree; E's hunks above them move them by 15: the box at W's `:285-302` is at `:300-317`, its `row~645` at `:309` and `row~473` at `:311`, the citation of row 424 for D2's case (W's `:297-300`) at `:312-315`. The gather cited the moved lines in `PLAN.md`; W's `REPORT.md` and `SKEPTIC.md` cite W's tree.
- E's records cite `changes.tex` and `STypesUtil.scala` on E's tree. W's hunks above E's entry move it by 58 (`\subsection{The contexts that give a call an expected type}` from `:1926` to `:1984`, so E's `:1961` is `:2019` and `:1989-1993` is `:2047-2051`), and C's 74 lines above `instantiateMethodApart` move E's `STypesUtil.scala:1737-1783` to `:1811-1857`. The gather re-anchored the `STypesUtil.scala` citation in FACTS (the entry "The compiled checker gives a call its expected type ...") and in `PLAN.md` in C's commit; E's `REPORT.md` and `SKEPTIC.md` cite E's tree.
- C's records cite `changes.tex` on C's tree; E's and W's hunks above C's entry move it by 157: "The type of a parameter that a declaration leaves out", C's `:2810-2866`, is `:2967-3023`, and its `row~652` is at `:3007`. C's `REPORT.md`, `SKEPTIC.md`, `JUDGE.md` and `decision-record.md` cite C's tree.

## Rows opened

Numbered by `ledger.py add` in the order the rungs were applied, each rung's rows in the order of their placeholders. Each placeholder was replaced by its number in the rung's files and in the specification before the rung's commit; C's numbers were also put into E's `SKEPTIC.md`, E's FACTS entry and E's `PLAN.md` entry, which cited C's row 651 by placeholder until C's commit. No test cited a placeholder.

| Row | Placeholder | Rung | Section | Claim, in short |
|---|---|---|---|---|
| 642 | NEW-E-1 | E | 2 | the compiled checker gives a `label` body no expected type, so `Library/String.fss:431` is refused |
| 643 | NEW-E-2 | E | 12 | a generic method inherited from a generic trait and called by name inside another trait dies compiled with `NoSuchMethodError` |
| 644 | NEW-E-3 | E (its skeptic) | 2 | an operator repeated between three or more operands with no multifix declaration gets no expected type |
| 645 | NEW-W-1 | W | 8 | under walk an empty unwritten reduction over a type other than `ZZ32` takes `ZZ32`'s identity |
| 646 | NEW-W-3 | W | 2 | under walk a set comprehension with no static argument is built at its elements' run-time class, refused by `Set[\ZZ32\]` |
| 647 | NEW-W-4 | W (its skeptic) | 4 | walk's Meet Rule load check skips a generic object and an object expression in a generic function |
| 648 | NEW-W-5 | W (its skeptic) | 3 | under walk a top-level variable initialized with an object expression stops at load |
| 649 | NEW-W-6 | W (its skeptic) | 3 | under walk an object inheriting an abstract method with no body loads and stops at the call |
| 650 | NEW-C-1 | C | 12 | the code generator refuses a method declaration with the modifier `override` |
| 651 | NEW-C-2 | C | 5 | the compiled checker stops on a dotted method invocation with written static arguments whose bound names another parameter |
| 652 | NEW-C-3 | C | 1 | keyword parameters are built on neither path |
| 653 | NEW-C-4 | C (its skeptic) | 5 | an `override` that overrides nothing is accepted on both paths |
| 654 | NEW-L-1 | L | 8 | `FullRange.narrowToRange(other: OpenRange[\I\])` is refused by the compiled checker |
| 655 | NEW-L-2 | L | 8 | `checkSelection` compares bounds of the index type `I` |
| 656 | NEW-L-3 | L | 8 | `TrivialOpenRange`'s five methods are refused by the compiled checker |
| 657 | NEW-L-4 | L | 8 | the bounds check of rank 2 and 3 compares lexicographically |
| 658 | NEW-L-5 | L | 12 | `PrefixSet` declares no `indices` |
| 659 | NEW-L-6 | L | 8 | a range of rank 2 or 3 strided backwards on some axes only has no kind |

There is no NEW-W-2: rung W's skeptic folded it into row 473's open half (`b999851e2`). `python3 explorations/coordinator/tools/ledger.py check --base 83b1cae78` reports the row numbers "gone none; new 642, ..., 659" and, as on the base's ledger, eight rows failing `spec-path` (seven name the generated `Specification/library/apis/FortressLibrary.tex`, one `fortress/fortress-keywords.tex`) and one `spec-section` (row 316); no rule fails that did not fail before.

## Rows closed

Each by `ledger.py close N --commit <the rung's commit on main> --test <the test>`, after the test passed on the merged tree as the rung last ran it, in `b9e4a39fd`:
- Rung W, `369982d85`: 424, its F-bounded half, the claim narrowed by `--claim` as W's record gives it (`UnwrittenReductionWalk`); 614 (`OverrideInTraitWalk`); 618 (`FunctionalMethodMeetObjectExpressionWalk.test`).
- Rung C, `2d22d3a35`: 610 (`OverrideFunctionalMethodWiden`); 617 (`FunctionalMethodMeetCoverWithoutSelf`); 619 (`XXXOverloadDottedSingleParamBoundAny`, a refusal); 625 (`InheritedAbstractMethodBoundSameName`); 626 (`XXXTypecaseUndeclaredType`, a refusal); 637 (`ExportPrivateAbstractMember`); 620 (`XXXLocalFunctionUntypedParam`, under Q4); 621 (`XXXLocalFunctionUntypedParamInLoop`, under Q4; row 622 was already its duplicate).
- Rung E, `27cb9e93b`: 560 (`InferResultOnlyIfWithoutElse`); 627 (`MethodStaticArgReceiverSameName`).
- Rung L, `b872d65a1`: 599 (`RangeBoundedEveryForward`); 600 (`RangeKindBodies`); 601 (`RangeDeclarations`); 633 (`IndicesGetterCalls`).

Not closed: row 638, which rung L fixed (`ForbiddenException(CallerViolation)` at the five library sites) and for which it names no test, since no gated program reaches the throws. `ledger.py close` takes no test `none` (`explorations/coordinator/tools/ledger.py:439-453`), and its notes hold 696 of their 700 characters, so the row stays `NEGATIVE-VERIFIED` with no note (gather.1).

The tests, on the merged tree `b872d65a1`:
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1` with the batch's 16 interpreter programs, W's and L's, plain and expected failures, with their `.test` files:
  `# harness-one 2026-10-09T03:28:33Z; tree b872d65a1; nproc=4; load 1.83 0.63 0.75; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty`
  `OK (16 tests)`
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh merged ProjectFortress/compiler_tests` with the batch's 33 compiled `.test` files, C's and E's:
  `# junit.sh merged 2026-10-09T03:30:13Z; nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 1.47 0.94 0.86; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; tree b872d65a1`
  `OK (48 tests)`

## Each rung

### E (`rung-checker-expected-type`), landed first as `27cb9e93b`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The skeptic's `3f7234538` wrote the worker's `REPORT.md` and `record.md` from the run's journal on the branch; the gather wrote no file from the journal (no repair round).

**Skeptic's fixes.** `2579d7e5b` (defect): a loose juxtaposition's multifix choice no longer depends on the expected type. `efae72793` (corrections): the same-name written static argument meets rung C's row 651, recorded with `XXXMethodStaticArgsBoundNamesOtherSameName`; the repeated operator's missing expected type, row 644 with `XXXInferRepeatedOperatorContext`, named in the entry's Effect; the typecase sentence made conditional (`Specification/basic/inference.tex:140-142`); the citation of `trait-parameters.tex:21-24`. No ruling.

**Folded.** The FACTS entry "The compiled checker gives a call its expected type in a clause of an `if` without `else` ..." at the end of "The checker and the one library", its sub-items joined into one line as FACTS entries are; the entry "The compiled checker instantiates a type parameter that nothing at a call fixes ..." rewritten in place in its two clauses, its earlier text in `FACTS-history.md`. Rows 642 to 644. The handover line. The notes on rows 560 and 627 went into their closes; row 627's condensed to fit (its full text below); those on rows 455 and 340 were refused (below); the note on row 651 waited for C's row and went in condensed in C's commit. No entry for the skill's part: the record gives "Revival change: none".

**Corrections.** The skeptic's item for the gather: row 651's note and row 644, done as above, and `changes.tex`'s `row~NEW-E-3` is `row~644`. The sentence the report calls incomplete, "A call written by tight juxtaposition, as a method invocation or as an operator application, has an expected type in the contexts the chapter lists" (`Specification/appendices/changes.tex:1597-1599`), is left: it is the Change part of the earlier entry "The inference of a call's static arguments", describing what that revision wrote, not an Effect or a note on a path, and E's own entry records the loose juxtaposition.

### W (`rung-walk-open-param`), landed second as `369982d85`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land, each with one sentence added to its first line's comment naming the rows' numbers (no line moves); `record.md` was folded. The skeptic's `637f593f5` wrote the worker's `REPORT.md` and `record.md` from the journal; the gather wrote no file from the journal.

**Skeptic's fixes**, all corrections, none contested: `637f593f5` (the report and record from the journal); `b999851e2` (NEW-W-2 dropped, the unwritten `BIG MINMAX` cited as row 473's open half, with its reproducer and the dispatch step); `3f5b15ec0` (row 647 and `XXXFunctionalMethodMeetGenericProviderWalk`); `604b807a9` (15 `typeMatch` value checks, not 11); `b9d174959` (rows 648 and 649 with their expected failures). No ruling.

**Folded.** The FACTS entry "Under `walk`, a type parameter whose bound mentions itself and that nothing at a call fixes is left open ..." at the end of "Landed semantics", its "rows 645, 646 and 647 opened, row 473 noted" written "rows 645 to 649 opened, row 473's open half given an expected failure", since rows 648 and 649 are W's too and row 473 could take no note. Three entries rewritten in place as the record gives, with one difference: the title of "`ant testSpecData` runs 130 of the specification's 133 extracted examples under walk, outside the gate, and 5 are red, all of one cause" stays word for word and the entry says it "does not hold: all 130 are green", as the coordinator's README asks of a title that no longer holds, where the record retitled it. The gather also rewrote two sentences of "The replacement for `SUM`'s and `PROD`'s catch-all, judged on both paths", which said that an unwritten clause form binds `T` to `Bottom` under walk and dies, now false and not in the report's list. Earlier texts in `FACTS-history.md`. Rows 645 to 649. Row 20's note. The handover line, with the skeptic's rows 648 and 649 added. Both entries for the skill's part, and one line in `sources.md`. `PLAN.md`: D2's entry gains the record's sentence and the question of row 424's close.

**Corrections.** The skeptic's item for the gather: row 473's reproducer `ProjectFortress/tests/XXXUnwrittenBigMinMaxWalk.fss` and its open-half note. `ledger.py` refuses the note (683 of 700 characters) and has no command that sets a reproducer, and a hand edit is against "only `ledger.py`"; the texts are below, and the point is gather.1. The report's sentences made false that W did not edit are FACTS entries (folded) and four sentences of the skill outside its part on the revival's changes (gather.2); none is in the specification.

### C (`rung-checker-overloading`), landed third as `2d22d3a35`

**From the branch.** `REPORT.md`, `SKEPTIC.md`, `JUDGE.md` and `decision-record.md` land; `record.md` was folded. The skeptic's `ff153e41b` wrote the worker's `REPORT.md` from the journal; the gather wrote no file from the journal.

**Skeptic's fixes.** `79cf821d9` (defect): a widening override's return type is checked at every instance. `15a4be724` (defect, contested): a type name in a typecase clause's body is no longer read as in the clause's type; the judge upheld it (`2a11010d7`): "The binding form lives only in the clause's type ... This is row 626's stated fix (`fortress-gap-ledger.md:605`)", no revert. `9a5469a6c` (corrections): `XXXReabstractedMethodNotImplemented`, the notes on rows 615, 572, 571 and 626, row 653, and the two citations of `meetRule`'s `withoutSelf`. `ff153e41b` (correction): the report from the journal.

**Folded.** The FACTS entry "The compiled checker reads what a trait or object provides by the traits chapter's inheritance ..." at the end of "The checker and the one library"; the sentence of "The compiled checker judges two functional methods by the Meet Rule ..." on what the check reads, rewritten in place. Rows 650 to 653. The notes on rows 610, 620 and 626 went into their closes; row 463's went in condensed; those on rows 615, 572, 571, 405 and 488 were refused (below). The handover line, with rows 650 to 653 named. Both entries for the skill's part, "A parameter whose type is left out" under a new heading "Specified, but not built", the point of `SKILL.md` it qualifies, last as in `SKILL.md`; one line in `sources.md`.

**Corrections.** The skeptic's item for the gather: `changes.tex`'s `row~NEW-C-3` is `row~652` (now `:3007`). The report lists no sentence made false.

### L (`rung-range-types`), landed last as `b872d65a1`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded. The skeptic's `6eebab9dd` wrote the worker's `REPORT.md` and `record.md` from the journal; the gather wrote no file from the journal.

**Skeptic's fixes**, all corrections, none contested: `6eebab9dd` (the report and record from the journal); `facb1d250` (`RangeDeclarations.fss` asserts `#(0,3)` empty, narrowing to it, and `(:) CMP (:)`); `354f7bd33` (the precedent citation, the report's list of changed values, the FACTS amendment, the notes on rows 601 and 611). No ruling.

**Folded.** The FACTS entry "The one library's ranges of rank 2 and 3 have bounded kinds ..." at the end of "The checker and the one library" (the record asked for a place after the range entry; the brief's rule puts it last), and the entry "The one library's range types provide a declaration on the meet ..." amended in place in its two clauses. Rows 654 to 659. The notes on rows 599, 600, 601 and 633 went into their closes; those on rows 638, 577, 611 and 488 were refused (below). The handover line, with rows 657 to 659 named. The entry for the skill's part after "Ranges", and one line in `sources.md`.

**Corrections.** The skeptic's two items: `PLAN.md` item 38's clause on `|self|` in `CompactFullRange2D` and `CompactFullRange3D` now says both hold by reading since the rung (`Library/RangeInternals.fss:1303-1307`, `:1340-1344`) and `EmptyString`'s `||` is left; row 638's close could not be made (above). The report lists no sentence made false.

## The rungs that did not land

None: every rung of the batch was approved.

## The skill's part on the revival's changes

`.claude/skills/fortress-repo/references/revival-changes.md` exists, so each record's entry was put into it in its form, as the rung wrote it: W's "A type parameter whose bound names itself, under walk" after "A type parameter that a call does not fix", and "A trait's `override`, and object expressions, under walk" at the end of "Traits and objects, no classes"; C's "What a type provides" after it, and "A parameter whose type is left out" under the new heading "Specified, but not built"; L's "Bounded ranges of rank 2 and 3" after "Ranges". E gives none. `sources.md`, section "revival-changes.md", has one line for each of W, C and L naming its `REPORT.md`.

## Ledger notes not written, and notes written condensed

`ledger.py note` refuses a note that would take a row past 700 characters of notes or 1,200 of line (`explorations/coordinator/tools/ledger.py:115`), and nearly every row the records note is near those limits. The notes below, in the records' words with the rows' numbers put in, are the ones the ledger does not hold in full (gather.1). Notes that went in whole: row 20's, and the notes on the closed rows 560, 599, 600, 601, 610, 620, 626 and 633 (in their closes); row 627's went into its close condensed.

- Row 455 (rung E): "Climb batch 11 rung E (`587ce436d`) repairs the loose-juxtaposition face: `e: BoxV[\ZZ64\] = wrapV 3` checks and runs (`InferLooseJuxtContext`). `XXXInferContextDrops` keeps the two argument faces, keyed 'File XXXInferContextDrops.fss has 2 errors.'. The multifix application of a loose juxtaposition is chosen without the expected type and then given it (`XXXLooseJuxtMultifixExpectedType`, climb batch 11 rung E's skeptic)."
- Row 340 (rung E): "The same crash for a `try` as the body of a function returning `ZZ32` whose `catch` value is a numeral, `tried(): ZZ32 = try f() catch e InvalidRange => -1 end`: 'Error trying to close method scope' on `83b1cae78` (climb batch 11 rung E's probe)."
- Row 628 (rung W): "Unblocked by row 424's F-bounded half (c0b2888f2): walk leaves an F-bounded big operator's parameter open, so a site typed at `R` admits the elements. The typing at `R` is a later library rung's, measured there. Beside an `Any` overload, a method of a lone open parameter is chosen, and one over a pair of it is not (row 473)."
- Row 555 (rung W): "Unchanged by row 424's F-bounded half (c0b2888f2): here the arguments fix `T`, and walk leaves open only a parameter that nothing fixes (P1.md, probe `FJoin`, the same under every way)."
- Row 425 (rung W): "Under walk, the unwritten clause form runs since c0b2888f2 (row 424's F-bounded half); the two paths differ on it until this row is repaired."
- Row 570 (rung W): "Walk's half, row 618, is fixed (c0b2888f2): walk refuses the pair at load, 'Invalid overloading of pick', while the checker accepts it."
- Row 473 (rung W, its skeptic's leftForGather): the reproducer `ProjectFortress/tests/XXXUnwrittenBigMinMaxWalk.fss` and the note "Under the open parameter (c0b2888f2) the unwritten form still stops: `argsMatchTypes` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1755`) tests a pair's type `(Int,Int)` against `(OPEN,OPEN)` element by element (`types/FTypeTuple.java:146`), and no type but the open type is below it (`types/FType.java:312-315`), so `AssociativeReduction`'s abstract `simpleJoin(a:Any, b:Any)` runs." The row's notes hold 683 of 700 characters, and `ledger.py` has no command that sets a reproducer.
- Row 615 (rung C): "since climb batch 11 rung C the compiled checker refuses `Dio` at `Dio` only, 'Invalid overloading of tag in trait Dio', 'has 1 error' (its `W` provides its own `tag` alone), as walk does; `ProjectFortress/compiler_tests/XXXOverrideInheritedThroughOtherSupertype.test` pins the same reading on the compiled path. The question stays open for the curator."
- Row 572 (rung C): "since climb batch 11 rung C the abstract-method checker reads what an object provides, so a trait whose own abstract declaration repeats an inherited method's parameter types hides the inherited body, and an object below it that declares none is refused, 'has no concrete implementation' (`ProjectFortress/compiler_tests/XXXReabstractedMethodNotImplemented.test`; on 83b1cae78 it compiled and ran the hidden body, printing `1`). This row's case, the abstract and the concrete declaration inherited from two supertypes, is unchanged. Walk stops on the re-declared case as on this row's, 'has neither body nor def'."
- Row 571 (rung C): "reachable also through climb batch 11 rung C's row 617 repair: an object that provides two functional methods with self second, whose overlap its own declarations cover through `comprises` clauses, now type checks and stops at class load, 'ClassFormatError: Duplicate method name "mark?1"'; walk prints `PASS`."
- Row 405 (rung C): "since climb batch 11 rung C a local function's untyped parameter gets the same refusal, made where the local function is bound (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala:69-77`); the top-level refusal is now at `STypeEnv.scala:199-200`; Appendix I's entry "The type of a parameter that a declaration leaves out" states both."
- Row 463 (rung C, written condensed; the full text): "reproducers since climb batch 11 rung C: `ProjectFortress/compiler_tests/XXXIfGeneratorClause.test` ('Variable __cond is not defined') and `ProjectFortress/compiler_tests/XXXWhileGeneratorClause.test` ('Variable __whileCond is not defined.'), over the compiler library's `Maybe` and `Just`; the first shown red with `__cond` declared in the program."
- Row 488 (rung C): "under climb batch 11 rung C's tree the distance gained the BR site `Library/FortressLibrary.fss:130`, `BIG LEXICO(g)`, 'Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\].', a site on file in earlier per-site lists; the rung's only edit inside the type-checking stage is Q4's refusal (`STypeEnv.scala:69-77`), which turns the `InterpreterBug` at `__bigOperator`'s `body(i)` into a `TypeError` that a `TryChecker` swallows."
- Row 651 (rung E, written condensed; the full text): "Since climb batch 11 rung E's renaming (row 627), the same written-argument call inside a declaration whose own type parameter has the bounding parameter's name, accepted on `83b1cae78` through row 627's capture, meets this crash too: `ProjectFortress/compiler_tests/XXXMethodStaticArgsBoundNamesOtherSameName.test`, 'G$1 is not in the kind env [][][G -> KindBinding(G,G extends Object)][][]'. The stack runs through `STypesUtil.staticArgsMatchStaticParamsForApp` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:771-795` at `2579d7e5b`), which checks a written argument against its parameter's bound with the other written arguments not put in, to `TypeAnalyzer.scala:797`."
- Row 638 (rung L): "Fixed by climb batch 11 rung L: `ForbiddenException(CallerViolation)` at the five library sites and the revival's two witnesses; the team's `ProjectFortress/tests/QuickCheckTest.fss:39` is left, so the row's "three revival tests" are two and a team test. No gated program reaches the throws. Close with test `none`."
- Row 577 (rung L): "Climb batch 11 rung L: the stage filed the rung's 28 range sites under RG 10, OT 16, I1 1 and GF 1 (`explorations/compile-ladder/rung-range-types/REPORT.md`, section 3); read by row, the after's lines mapped back through `git diff -U0`."
- Row 611 (rung L): "Climb batch 11 rung L gives `CompactFullRange2D` and `CompactFullRange3D` their own `opr |self|` (`Library/RangeInternals.fss:1303-1307`, `:1340-1344`), whose self type is the meet of the `CompactFullRange`, `FullRange2D`/`FullRange3D` and `DelegatedIndexed` declarations they inherit, so by reading the Meet Rule holds for `|self|` in both; `EmptyString`'s `||` is left. Walk's check skips symbolic operators, so no run shows it."
- Row 488 (rung L): "Climb batch 11 rung L: `BIG LEXICO(g)`'s "Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\]" at `Library/FortressLibrary.fss:130` appears in both distance runs of the rung (`d451dba04`, `b28e3e7e1`), whose edits touch no big operator."
- Row 627 (rung E, written condensed in its close; the full text): "The substitution site is `STypesUtil.commonInheritedMethods`, which instantiates each inherited method at its declaring trait's static arguments (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1733` at `83b1cae78`). Climb batch 11 rung E renames the method's clashing own static parameters there first (`instantiateMethodApart`). This also repairs the capture at a call by name inside a trait that inherits the method (`InheritedMethodByNameStaticParamSameName`, a `typecheck` test), whose compiled run dies of row 643. A written static argument whose parameter's bound names a renamed parameter, as `g.chain[\G, Gen[\G\]\](...)` for `chain[\G, K extends Gen[\G\]\]` inside `Use[\G\]`, accepted on `83b1cae78` only through the capture, now meets row 651's crash ('G$1 is not in the kind env'; `XXXMethodStaticArgsBoundNamesOtherSameName`)."

## Points to report

None holds the push: every point below is reversible, and no step taken cannot be undone or acts against a decision on record.

Rung W:
- Each place a program can now print the open type `OPEN`: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/BottomType.java:44`; `ilkName` prints `BoxU[\OPEN\]`, `println` of such an object `Holder[\OPEN\]` (the skeptic's `SkOpenDispatch`); any walk diagnostic that prints such a type or an overload's domain at it, by reading; the inference trace's rule `open` (`EvaluatorBase.java:191`).
- The empty unwritten reduction over a type other than `ZZ32` that gets `ZZ32`'s identity: row 645, `ProjectFortress/tests/XXXUnwrittenEmptyFloatSumWalk.fss:6`; the new code prints 'e 0 : Int' for `emptyRSum(0)` declared `RR64`.
- Each of the 18 demos and the smoke test (`explorations/compile-ladder/rung-walk-open-param/REPORT.md:99-107`): `explorations/claude_demo.fss` rc 0 to its last line; BirdCount1p to 1z, 2a, 2b, 2c and posFeedback rc 0 (14); BiCGSTAB rc 1 at `BiCGSTAB.fss:177:8`, 'Failed to find any matching overload, args = (65096583124: ZZ64,1.0E9)'; BirdCount1m rc 1 at `:28:3-94`, BirdCount1n and 1o at `:27:3-94`, 'Failed to find any matching overload, args = (1.0,Ratio)'.
- A change to which declaration walk runs for a set it loads today, beyond row 614's (the skeptic's; the report says "none found"): in a `Holder[\OPEN\]`, `take(x: T)` runs for `3` beside `take(x: ZZ32)` and for `"s"`, where the old code printed 'take(3): ZZ32' and 'Failed to find any matching overload, args = ("s")'; the mechanism, `BottomType.OPEN` below every type and admitting every value (`BottomType.java:36-40`).

Rung C:
- A compiled test whose verdict changed other than by the rung's intent: `XXXNatRetSizeChecker` and `XXXOverloadPermutedStaticParams` red on the first code state, `78a45cf23` ('Tests run: 1053, Failures: 2'), repaired in `68694006c` (`OverloadingChecker.scala:656-691` on `main`); on the final code `ant testQuick` printed '[junit] Tests run: 1058, Failures: 0, Errors: 0' and 'BUILD SUCCESSFUL'.
- A program the text allows that the checker now refuses, or one the text refuses that it now accepts, outside the rung's rows: a widening override's return type is checked (`XXXOverrideReturnTypeNotSubtype`, read from `Specification/basic/traits.tex:590-591`); an abstract method a widening override overrides asks no implementation (`OverrideAbstractMethodWiden`, `AbstractMethodChecker.scala:88-91`); an object below a re-declared abstract method is refused, where the base compiled it and printed 1 (`ProjectFortress/compiler_tests/XXXReabstractedMethodNotImplemented.fss:5-15`).
- Each error the three refusals of Q4 uncover: `Library/FortressLibrary.fss:130`, `BIG LEXICO(g)`, 'Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\].', class BR, rows 399 and 488 ('class BR 3 -> 4 (+1)' from `explorations/coordinator/tools/distance/compare.sh`); the three crash rows read 'Missing parameter type for i' at `FortressLibrary.fss:1304:10`, `:2501:9`, `:2884:11`.
- A shared phase whose effect reaches walk: `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:247-250`, `:378-383`; walk refuses at load an undeclared type name in a typecase arm's applied type and in its body, where it failed at run time with 'Missing type Nonesuch'; `ant testSystem` 131/128/131/126 tests, 0 failures, 'BUILD SUCCESSFUL'.
- A crash repaired by catching it without the error the text gives, listed for completeness, since the text now gives the error: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala:69-77`, stated by `Specification/basic/components/type-inference.tex:47-53` and Appendix I, `Specification/appendices/changes.tex:2967-3023`.

Rung E:
- Normative text changed beyond the inference chapter's two lists and the rung's own entry: "or by loose juxtaposition, as `f x`" and "the body of a `label` expression" (`Specification/basic/inference.tex:143-145`, `:266-268`).
- A program the text allows that the checker now accepts outside the four contexts and row 627: an inherited generic method called by name inside a trait that inherits it under its own parameter's name (`ProjectFortress/compiler_tests/InheritedMethodByNameStaticParamSameName.fss:8-10`; the old code 'Tests run: 3,  Failures: 1', the new 'OK (3 tests)').
- A program the text allows that the checker now refuses: a written static argument whose bound names a renamed parameter meets row 651's crash, 'G$1 is not in the kind env', where the old code compiled and ran it, printing '11' (`ProjectFortress/compiler_tests/XXXMethodStaticArgsBoundNamesOtherSameName.fss:14`).
- The argument face of `XXXInferContextDrops` (row 455): the file split and its key moved from 'has 3 errors' to 'has 2 errors' (`ProjectFortress/compiler_tests/XXXInferContextDrops.fss:10-11`, `.test:3`); the two argument errors are the same on the old and the new code, 'Saw expected failure' on both.
- At the worker's head, a loose juxtaposition read as binary juxtapositions where a multifix one applies; repaired by the skeptic's `2579d7e5b`, so it does not land (`XXXLooseJuxtMultifixExpectedType.fss:12`).

Rung L:
- Values walk prints that change: `|#(0,3)|` 1 to 0 and `(#(0,3)).asDebugString` 'CompactFullRange2D(0,-1, 0,-1)' to 'CompactFullRange2D(0,0, -1,-1)', the two pins changed (`ProjectFortress/tests/RangeDeclarations.fss:112-113`; `Library/RangeInternals.fss:1690`); `(#(3,0,2)).asDebugString` (`RangeDeclarations.fss:114`; `RangeInternals.fss:1699`); `for p <- seq(#(0,3))` one element to none; `#(0,3)`'s `isEmpty`, `extent`, `left`, `right`, comparisons and the ranges built from it, `SUM[\ZZ32\][(i,j) <- #(0,0)] 1` 1 to 0, and narrowing or subscripting by it answering where it raised `IndexOutOfBounds` (`RangeDeclarations.fss:115-116`; `explorations/compile-ladder/rung-range-types/SKEPTIC.md`, section 3); four stops and their rank-3 twins now answer (`ProjectFortress/tests/RangeBoundedEveryForward.fss:6-13`); `(:) CMP (:)` stopped and is `EqualTo` (`Library/FortressLibrary.fss:3883`, `RangeDeclarations.fss:122`); the stop of `((0,0)#).every(-1,1)` changes its message (`RangeInternals.fss:590-591`, row 659).
- A team declaration removed: none; team bodies moved to the `ZZ32` kinds with their declarations kept abstract, and team declared types changed (`Library/FortressLibrary.fss:3814-3815`, `:3844`, `:3896`, `:3922`, `:3934`, `:3949`, `:3955`; `Library/FortressLibrary.fsi:2172-2173`, `:2272`, `:2297-2300`; `Library/RangeInternals.fsi:45`, `:68-69`, `:83-84`).
- A new api type beyond `BoundedRange2D` and `BoundedRange3D`: none; new api functions `combine2D` and `combine3D` over bounded scalar ranges (`Library/RangeInternals.fsi:248`, `:256`).

## Items for the curator, and where each is in `PLAN.md`

Under "Pavol's answers, in the order they are needed", the new group "Before the switch-over, raised by climb batch 11":
- E.worker.1, a `label` body's expected type: item 48.
- L.worker.1, `TrivialOpenRange`'s five methods: item 49.
- L.worker.2, the lexicographic bounds check and its repair with `PCMP`: item 50.

Under "Off the path, parked":
- W.worker.1 and W.skeptic.1, row 424's close: D2's entry under "Climb batch 9, listed for his review" ("Decision D2 of climb batch 9's rung W, and its stop ..."), which also gains W's record's sentence on the open type as D2's candidate.
- C.skeptic.1, row 615 answered the same way on both paths: its entry under "Climb batch 10, listed for his review" ("Which reading of "overridden" governs what a type inherits (row 615 ..."), a sentence added.
- Under the new subsection "Climb batch 11, listed for his review": E.skeptic.1 ("Rung C's row 651 and when to repair it ..."); W.worker.3, W.skeptic.2 ("The name `OPEN` ..."); W.skeptic.3 ("At dispatch under walk, a declaration whose parameter type is the open type ..."); W.worker.2 ("For information, climb batch 11's rung W: the judgement's shape ..."); C.worker.1, C.skeptic.2 ("Should the code generator accept the modifier `override` (row 650) ..."); C.worker.2 ("The return type of a widening `override` is checked ..."); C.judge.1 ("Through the disambiguator, a phase walk shares ..."); L.worker.3 ("`(:) CMP (:)` answers `EqualTo` ..."); L.worker.4 ("`Range.truncL` and `truncR` are declared `BoundedRange[\I\]` ..."); L.worker.5 ("A bounded range of rank 2 or 3 strided backwards ..."); L.worker.6 ("`PrefixSet` declares no `indices` ..."); gather.1 and L.worker.7 ("gather.1, from climb batch 11's gather: the gap ledger's tool has no route ..."); gather.2 ("gather.2, from climb batch 11's gather: four sentences of the skill ...").

The gather's own points: gather.1, the ledger's missing routes (the notes above, row 473's reproducer, row 638's close and its claim's "three revival tests"); gather.2, the four sentences of the skill that rung W's report lists as made false and leaves for the skill writer (`explorations/compile-ladder/rung-walk-open-param/REPORT.md:177-180`). No text mismatch between one rung's specification text and another rung's code was found: W's box and note speak of walk, E's lists and C's box of the compiled checker, and L's library edits change no passage the other rungs wrote.
