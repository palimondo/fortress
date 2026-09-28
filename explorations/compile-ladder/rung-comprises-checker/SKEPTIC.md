# Skeptic, rung Y (climb batch 7C, `rung-comprises-checker`)

*Note added at the gather: the recommended rows of section 17 are the ledger's rows 488 (rewritten as below), 489 (the spelling dependence) and 490 (the simple-name match); the candidate test is `ProjectFortress/compiler_tests/XXXComprisesGenericRenamed.fss` with its `.test`.*

**Verdict: approved, with required corrections.** The edit is what the decision names, the narrow accommodation with its switch removed, character for character against `explorations/reviews/anyintegral-comprises-ways/shadow-thc.py:52-63`. The recorded failure exists and was captured before the edit. The plain test fails on the base's checker and passes on the landed build. The guard goes red under the broad form and under each of its two conditions removed alone. The count stage, re-run both ways, gives the rung's two lists line for line: 10 and 75. What must change is in the record, not the code:
- The distance stage's one extra BR error and its two changed sites are the edit's, not variation between setups (section 8).
- One claim about the simple-name comparison is false (section 6).
- The rule's verdict for a generic closed trait depends on how the extender spells its type variable. The specification settles that case, so it gets a gated expected-failure test, which I wrote and ran (section 6).

The worktree held no uncommitted change when I started: `git status` was clean at `e6bff524e`. The rung's milestones are the six commits `3de60f8d3..e6bff524e`. The harness refused the worker's write of `REPORT.md`, so I read its text from the structured result, and `record.md` from the branch.

## 1. The briefing

I read the parts of the briefing that my checks needed (`explorations/coordinator/tools/facts-extract.sh`, both parts). Those parts are:
- POSITIONS 2026-09-28, `AnyIntegral`'s `comprises` clause;
- 2026-09-21, the library commit;
- 2026-09-27, the stops;
- ledger rows 459 and 354;
- the judgement's section 3 and the ways note's way 11;
- the zero probe's section 2;
- the call site and the rule in `TypeHierarchyChecker.scala`;
- the shadow;
- `Compiled10.i.fss`, `zElig.fss` and `zElig2.fss`;
- `types.tick:384-390`;
- FACTS, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only".

I also read `explorations/coordinator/CLIMB-BATCH-7C.md` sections 1 to 3 whole. Outside the slice, I read ledger rows 22, 402, 407 and 414, and Appendix I's entry on instantiation exclusion (`Specification/appendices/changes.tex:61-100`).

## 2. The provenance block

I opened every file:line the block cites. Each says what the block says.
- **problem.** The refusal is reported at `Library/FortressLibrary.fsi:436` (`probes/checker-count-preedit-errors.txt:7`), and the `FortressLibrary` row reads 2 (`probes/checker-count-preedit.txt:5`).
- **spec.**
  - `types.tick:384-390` is the coverage sentence, and `:277-283` is the "determines" definition.
  - `Papers/Welterweight/grammar.tick:21-22` reads "no value can belong to the trait unless it also belongs to one of the comprised types".
  - `fig-wellformeddecls.tick:38-62` is D-Trait and `:66-85` is D-Object, which has no `comprises` premise.
  - `Specification/basic/traits.tex:163-170` is the rendered sentence and Victor's note. `:236-246` is the draft note. `:264-280` is the `Molecule` example.
  - `types-vals-vars.tex:589-604` is the type-level example.
  - `Specification/fortress/fortress.tex:35-36` is `\newcommand{\note}[1]{}` under `\ifrelease`.
  - The block cites no `Specification/library/apis/` file.
- **precedent.**
  - `shadow-thc.py:46-64` holds the disjunct and the method.
  - `explorations/perf-probes/nat/shadow.patch:911-938` holds the same method.
  - `360905925` is Ryu's "[static checker] Implemented comprises relationship checking" of 2009-04-17.
  - `Compiled10.i.fss:13-21` states the three cases.
- **deviation.** The landed file's lines `:261-262`, `:273-274` and `:252-255` are the disjunct, the doc comment and the comment's case 4. `explorations/reviews/anyintegral-comprises-judgement.md:105` holds "a trait with static parameters the closed trait does not have".
- **historical.** `TypeHierarchyChecker.scala` is the one file of the 2012 tree that the diff edits (`git diff --stat 715816bdd...HEAD`).

## 3. The recorded failure

`probes/pre-edit-tests.txt` was committed in `3de60f8d3` at 12:32:23Z. The edit was committed in `e49166683` at 12:47:39Z. The capture shows the link refused with two errors ("AnyWhole ... immediate subtype Whole is not eligible to extend it", "Closed ... Tagged ..."), and "Tests run: 2, Failures: 2".

I reproduced it without touching the tree. I built the base's `TypeHierarchyChecker.scala` (`git show 715816bdd:<file>`) with scalac into a class directory of my own and put it ahead of `ProjectFortress/build`. The result was the same two errors and the same two failures (`probes/skeptic/variants-junit.txt`, "[base]").

## 4. The diff

The rung changes one Scala file, in the two methods the record allows: the comment above `isEligibleToExtend` (`:252-255`), the disjunct (`:261-262`) and `everyKnownSubtypeListed` (`:273-287`). `probes/shadow-vs-landed.txt` shows the landed file against the shadow applied to the base. The three switch fields, the broad disjunct, the instance rule and `extendsSomeInstance` are gone. The only other differences are the two comments. No `ProjectProperties` read is left. `git diff --stat` shows nothing under `Library/`, `ProjectFortress/LibraryBuiltin/`, the interpreter, `explorations/run-c4/`, `explorations/apl/` or `Specification/`.

The edit is as small as the decision allows. For the library's case, the broad form (5 lines) would have sufficed. The narrow form is what the decision names, and the guard pins the difference.

What the code compares matters for sections 6 and 9:
- The call site builds the closed trait's clause in the declaring trait's own variables (`subst_comprises`, `:199-202`).
- `everyKnownSubtypeListed` finds extenders by the simple text of the name in their `extends` clause (`:277-280`).
- It then asks whether each extender's self type is below a member of that clause, under the extender's own static parameters (`:281-286`).
- It does not substitute the extender's arguments for the subtrait's parameters, and it does not check that the name it matched is the same declaration.

## 5. Precedent

The worker found the team's rule (Ryu, `360905925`, and `Compiled10.i.fss`), the four ways the tree admits an unlisted trait, and the two shadows, and followed the one the decision names. The site count is right. `isEligibleToExtend` is called at `:204` and recurses at `:267` (`grep` over `ProjectFortress/src`), and the message is written once. I found no other device in the library, the compiler prelude or the team's tests that decides eligibility.

## 6. The tests, and what they do not cover

**The plain test.** `ProjectFortress/compiler_tests/ComprisesGenericSubtrait.fss` exercises the defect: the link is the refusal. It has the library's shape in its own names, plus `zElig2`'s shape. It carries one comment line and no provenance. On the landed build it passes: link OK, run PASS, "OK (2 tests)" (`probes/skeptic/variants-junit.txt`, "[landed]").

**The guard.** `XXXComprisesGenericUnlisted` is green on the base and on the landed build. I confirmed the worker's claim that its two arms guard the two conditions of `everyKnownSubtypeListed` with two mutants of my own (`probes/skeptic/variants.txt`, `probes/skeptic/variants-junit.txt`):
- **noNonEmpty** (`subs.forall` alone): the guard goes red on its first arm, 1 error instead of 2 ("Saw wrong failure").
- **noForall** (`subs.nonEmpty` alone): it goes red on its second arm.
- **broad**: both arms are accepted and the guard goes red. The team's `XXX9z` also goes red, 1 error instead of 2, as the ways note measured.

The plain test passes under all three mutants. It is the guard that distinguishes them.

**The compiler tests with a clause.** Every compiler test whose own source declares a `comprises` clause passes on the landed build: 26 files, plus `XXX10p`, whose clause is in `Compiled10.pAPI.fsi` (`probes/skeptic/comprises-ctests.txt`). I left out the four compiler-library tests, because the driver deletes their cache entries. The library-order cache rebuild compiled the same libraries on the landed checker without error.

**The spelling dependence, which the tests do not cover (measured here).** For a generic closed trait, the verdict depends on how the extender spells its type variable.
- `probes/skeptic/SkGenericSameName.fss` declares `trait Box[\T\] comprises { Full[\T\] }`, `trait Tag[\T, U\] extends Box[\T\]` and `trait Both[\T\] extends { Full[\T\], Tag[\T, ZZ32\] }`. The landed checker accepts it, and the compiled run prints `full`.
- `SkGenericRenamed.fss` is the same program with `Both[\S\]`. The landed checker refuses it: "Box has a comprises clause but its immediate subtype Tag is not eligible to extend it".
- Walk prints `full` for both (`probes/skeptic/differential.txt`).

The cause is in `:283-284`. `Both[\S\]` is compared with `Full[\T\]`, where `T` is `Tag`'s parameter, so it passes only when the extender's variable happens to be named `T`.

The specification settles it. An instantiation `Tag[\A, B\]` must be covered by the clause at the corresponding instantiation, `Full[\A\]` (`Documentation/Specification/Prose/Language/types.tick:277-283`, `:384-390`). Every value of it is a `Both[\A\]`, which is a `Full[\A\]`, and renaming a bound variable changes no program. So this is home 2.

I wrote the gated test and ran it: `probes/skeptic/candidate/XXXComprisesGenericRenamed.fss` and `.test` (`probes/skeptic/candidate-xxx.txt`).
- On the landed build and on the base's checker it is green, "Saw expected failure", pinned by `compile_err_equals`.
- It goes red on a deliberate local repair, **substFix**, which substitutes the extender's arguments into the clause (`probes/skeptic/variants.txt`). The result is "Saw wrong failure".
- Under substFix, the rung's two tests, `XXX9z` and `XXX10i` keep their verdicts, `SkGenericRenamed` is accepted, and `SkCrossedSameName` below is refused (`probes/skeptic/subst-fix.txt`).
- substFix is not a proposal. Inside case 3's recursion the clause is in the outer declaration's variables, and substituting the subtrait's parameters there could capture them.

Required correction 3 puts the candidate test in the corpus.

**Name capture accepts a false clause, inside row 414's gap (measured here).**
- `SkCrossedSameName.fss` declares `trait Odd[\T\] extends { Full[\T\], Tag[\ZZ32, T\] }` over the same `Box`. The base's checker refuses it. The landed checker accepts it, because `Odd[\T\] <: Full[\T\]` holds with `Odd`'s `T` read as `Tag`'s. The compiled run prints `a Box[ZZ32] that is no Full[ZZ32]`: a value of `Box[\ZZ32\]` that belongs to no listed type.
- Renamed to `Odd[\V\]` (`SkCrossedRenamed.fss`), it is refused.
- The program also extends `Box[\T\]` and `Box[\ZZ32\]`, which the declaration rule forbids (`Specification/basic/traits.tex:299-313`). The checker does not refuse it, because the differing argument is a static parameter of the extender: this is row 414's gap.

A false acceptance by capture always needs such a pair. The listed-type check (`:220-242`) makes every listed `L[\T\]` extend the closed trait at `T`, so an extender below `L[\T\]` that reaches the closed trait at another argument through the subtrait extends two instantiations of it. So this is a note on row 414, not a row of its own (recommended rows).

**Simple-name matching: the report's claim is false (measured here).** The report's section 6 says "A trait of the same name in another api is counted too, which can only refuse more". It can also accept. I declared four apis in `probes/skeptic/` (`probes/skeptic/name-collision.txt`):
- `SkNameD` declares `Closed comprises { Listed }`.
- `SkNameB` declares an unrelated `G[\X\]` and `K extends { Listed, G[\ZZ32\] }`.
- `SkNameA` imports `SkNameB.{K}` and declares `G[\X\] extends Closed`, which nothing extends. This is `zElig`'s shape, the guard's first arm.
- `SkNameAlone` is the same without the import.

The base's checker refuses both A and Alone. The landed checker accepts `SkNameA` and refuses `SkNameAlone`: `SkNameB`'s `K` names a `G` and is counted as an extender of `SkNameA`'s.

Under the coverage reading a trait with no values is covered vacuously, so no value escapes. But the rule as the decision and the record state it ("at least one type ... extends it") is not what the code checks here. No gated test can hold the refusal today, because an `XXX` compile test demands a failure the checker does not make. So this is home 3, by the same reasoning as row 487 (recommended rows; required correction 2 fixes the claim).

**Other probes, where both paths or the rule behave as they should** (`probes/skeptic/differential.txt`):
- An object as the immediate extender (`SkObjectExtender`, `object Ball extends { Round, Sized[\ZZ32\] }`) is read. `typeOfSelf` is set for objects. Walk prints `round sized`, and the compiled run prints `round   sized`, whose spacing is row 76's.
- Case 4 applies inside case 3's recursion (`SkNestedClause`, `Mid extends Top comprises { Gen[\ZZ32\] }` with `Gen[\X\] extends Mid`). The base refuses it with 2 errors. The landed build accepts it, and both paths print `leaf`.
- A generic object directly below a closed trait (`SkGenericObject`) is refused by both checkers. Walk prints `other`: a `Shape` that is no `Round`, which is row 22.
- A plain trait below the generic subtrait and below no listed type (`SkMidPlain`) is refused by both. Walk prints `other` (row 22).
- A two-level generic chain whose one object is listed (`SkTwoLevel`, `Sized[\X\]`, `Sized2[\X\] extends Sized[\X\]`, `Ball extends { Round, Sized2[\ZZ32\] }`) is refused by both checkers, because the immediate extender `Sized2[\X\]` is itself below no listed type. Walk prints `round`. This is the narrow form as decided, narrower than the coverage reading. It is listed for the gather's check of rung X's text (required correction 5).
- Past the hierarchy pass, the overloading checker does not take the unlisted generic subtrait and a listed trait as excluding each other (`SkOverloadMeet`, `g(x: Round)` beside `g(x: Sized[\ZZ32\])`). The landed build refuses "Invalid overloading of g". Walk refuses at run time: "unrelated (neither subtype, excludes, nor equal)".

## 7. Competing declarations

Every name the two tests add was grepped as a declaration across `ProjectFortress/tests`, every `*_tests/` directory, `test_library/`, `LibraryBuiltin/`, `Library/` and `ProjectFortress/src/com/sun/fortress/` whole. Nothing competes. `Tagged` is `Library/QuickCheck.fss`'s private object, and `Closed` occurs in `Library/SetClosure.fss` only inside `isClosed`. The names of my candidate test (`Crate`, `Filled`, `Marked`, `Paired`) occur nowhere else. `Box` and `Tag` do occur elsewhere, which is why the candidate avoids them.

## 8. The count stage and the distance stage

**Count.** I made a scratch copy of `explorations/coordinator/tools/checker-count/run.sh` whose only change puts a class directory ahead of the classpath (`probes/skeptic/variants.txt`). With it I ran the count post-edit on the landed build and pre-edit with the base's checker (`probes/skeptic/count-rerun.txt`).
- The tables read `#total 75` (`FortressLibrary` 132, `RangeInternals` 18) and `#total 10` (2 and 18), crash `none` both.
- errlist.py's lists over my runs are identical, line for line, to the rung's `probes/checker-count-postedit-errors.txt` and `checker-count-preedit-errors.txt`.
- The rung's `count-compare.py` over them gives "1 only in pre, 66 only in post" and "66 of them in its list, 0 not" against the ways note's `narrow-base.txt`.
- The 21/9 difference from the ways note is all in the `RangeInternals` row: 12 `CAP` errors gone, and `IN` 1, `map` 2, `every` 1, `atMost` 2 and `openRangeHelper` 3 respelled. That is batch 7R's rung J.

**The table against the report.** The committed table `probes/checker-count-postedit.txt` reads `#total 75`. `REPORT.md` (the structured result's text, section 7), `record.md` ("For the gather": `expectedCheckerCount: 75`) and the structured summary all declare 75. The manifest's `expectedCheckerCount`, 75, is the prediction (10 plus 65), and the measured value meets it. There is no mismatch.

**Distance: the BR move is the edit's.** The rung reads its one extra BR error as variation between setups. It says "The edit adds no type relation the body checker reads: it changes only whether the hierarchy pass adds its error" (the report's section 8 and row 488 as proposed). I tested that claim with four runs of a scratch copy of `explorations/coordinator/tools/distance/run.sh` that differs from it by one line (`probes/skeptic/distance-attribution.txt`):

| run | total | against the rung's runs |
|---|---|---|
| landed build | 626 | site for site the rung's post-edit run |
| the base's checker ahead of the build | 627 | site for site the rung's pre-edit run |
| the broad form (clears the same two H2 errors without calling `everyKnownSubtypeListed`) | 625 | the pre-edit run less exactly the two H2 errors; no other site differs |

The capture carries each sorted list's checksum. So removing the H2 errors moves nothing else. Running the narrow rule's subtype queries in the hierarchy pass is what adds the `UniqueItem` error at `Library/FortressLibrary.fss:1535`, respells the two `BIG ||` messages at `:304` and `:314`, and moves the `Comprehension` site from `:3436` to `:3416`, deterministically, in two runs of the same build.

The error at `:1535` is on the unary `opr BIG SQCAP[\T\](g)`, which declares no return type. It is reported against the nullary sibling's `BigReduction[...]`, the BR mechanism that FACTS describes ("The written bound `Object` on the three result-only parameters ...": "a BR error is the checker comparing a unary big operator's body with its nullary sibling's declared type"). So the new error is spurious, and which run shows it depends on what the checker queried before.

**Mechanism, not established here.** The candidate is shared state that survives the hierarchy pass. `everyKnownSubtypeListed`'s queries (`comprisesContains`, `:283-284`) create analyzers with `analyzer.extend`. Each new analyzer brings fresh subtype and exclusion memos (`TypeAnalyzer.scala:97`, `:392`, `:781-782`), but they share the trait table. The trait table memoizes `parents` and `excludesClause` keyed by `TraitType` alone (`TraitTable.scala:81-97`; `d28cf74d0`, 2026-09-23). Every capture of the BR/V2/O1 "variation" on file postdates that commit (`rung-result-bounds/probes/distance-AB-any.txt` and the two others, all 2026-09-28).

To test it, I started the stage with `-Dfortress.analyzer.clauses.cache=false` on the landed build and on the base's checker. With the memo off, each run had checked 50 of the component's declarations after about 30 minutes, at load 4 to 6. At that rate a run would outlast the stage's 5,400-second timeout, so I stopped both and deleted their scratch. This is a recommended experiment, not a finding.

The broad and narrow runs give the same hierarchy verdicts over the library: both show `#kind comprises 0`, and the ways note found their counts byte-identical. So the only thing that differs between them is whether the rule's subtype queries run.

This is not a stop. The distance stage is reported and never red, and no count-stage error moved. The report's attribution and row 488's text must change (required correction 1).

**The ladder.** None of the 85 files of `explorations/compile-ladder/climb-batch-7R/gate/ladder/ladder.tsv` contains `comprises` (grep over each file). The one file run, `tests/atomicList.fss`, kept its output byte for byte (`ladder-pre/raw/tests/atomicList.fss.compile` and `ladder-post/raw/tests/atomicList.fss.compile`).

## 9. record.md

What holds in `record.md`:
- The FACTS lines are true as written, except the two sentences named in required corrections 1 and 2.
- Row 459's note, row 354's note (`XXX3q` and `XXX10p` pass on the landed build, `probes/skeptic/comprises-ctests.txt`) and row 407's note (the filter is at `:267`) are right.
- The provisional rows are numbered from 487, after row 486, the ledger's last. No row is renumbered.
- Row 487's text and home are right. The capture `explorations/reviews/anyintegral-comprises-ways/captures/probes/user-integral.txt` is on file.

What must change:
- Row 488's text is wrong on its cause (section 8).
- "For the gather" says `CompilerJUTest` goes 784 → 787. With the candidate test it is 788.
- The "X's text against Y's code" list lacks four points the gather needs (required correction 5).

## 10. The homes

| defect | home | where the check is |
|---|---|---|
| Row 459, the clause refused | 1 | `ComprisesGenericSubtrait`, its link and three asserts, passing on the landed build (`probes/skeptic/variants-junit.txt`, "[landed]") |
| The false list | kept behaviour | `XXXComprisesGenericUnlisted`, shown red under three mutants |
| Row 487 | 3 | the capture on file; the reasoning for not home 2 is the record's and holds |
| The spelling dependence (mine) | 2 | the candidate `XXXComprisesGenericRenamed` (required correction 3) |
| The simple-name match (mine) | 3 | `probes/skeptic/name-collision.txt` and a row (recommended rows) |
| The name-capture acceptance (mine) | row 414's class | a note on row 414 |
| The BR move | 3 | row 488, rewritten |

For the BR move, the specification says nothing on whether a checker's diagnostics may depend on its earlier queries. Its evidence is now the four runs of `probes/skeptic/distance-attribution.txt`.

## 11. Ledger and sibling sites

My own searches of the ledger (eligible, immediate subtype, `XXX9z`, `comprises`, instantiation) found rows 22, 77, 78, 354, 357, 402, 407, 414 and 459. Of these:
- Row 22 (walk never checks `comprises`) covers my walk outputs for `SkGenericObject`, `SkMidPlain` and `SkCrossedRenamed`. Its spec column cites the draft note that rung X replaces, which is the gather's re-anchoring.
- Row 414 takes the note above.

No other row changes what the rung should do. The sibling sites of the rule are the call and the recursion, both covered. The other path is walk, which checks nothing here.

## 12. The decisions

The decision reads: "a generic child of a closed trait is eligible when every type the checker knows under it is listed", with the code named as the narrow accommodation, "`everyKnownSubtypeListed`, about 14 Scala lines" (POSITIONS 2026-09-28, `AnyIntegral`'s `comprises` clause). The landed code is that code. The decision's words and its code part in three corners, none of them the library's:
- The code refuses `SkGenericRenamed`, where every type under the subtrait is below a listed type at the corresponding instantiation.
- It accepts `SkNameA`, where a type not under the subtrait is counted.
- It applies case 4 inside case 3's recursion, to a generic type listed in an intermediate trait's own clause, which the decision's words do not name. There it is right under the coverage reading.

I did not refuse over them. The decision names the code, and repairing the first two changes code Pavol approved. They are gated or rowed here and put to him (forPavol). That was a decision of mine. The alternative was to refuse and have the repair round rewrite `everyKnownSubtypeListed`.

## 13. The failure mode

The edit turns a loud refusal ("... is not eligible to extend it") into acceptance.
- **The library.** The value is the api reaching its overloading and return-type checks: 66 errors that were hidden are now reported.
- **A program whose acceptance is wrong** (row 487's other unit, `SkNameA`, `SkCrossedSameName`). It now compiles and runs. `SkCrossedSameName`'s compiled run prints a `Box[ZZ32]` that is no `Full[ZZ32]`, where the base refused the program at compile time.
- **The message.** The refusal that remains uses the same words for every cause, and names neither the extender outside the list nor the absence of one. `XXXComprisesGenericUnlisted`'s two errors read alike for its two causes.

## 14. Stops

None met. Against the reserved stops:
- No compiled test's verdict changed: 27 tests with a clause pass on the landed build, and the gate runs the rest.
- No ladder file moved.
- No edit falls outside the two methods and the comment.
- No switch or property remains.
- No protected line was touched.
- No walk output changed: the checker does not run under walk.
- Every count-stage error is accounted for, and the crash row is unchanged.
- No file of rung X's was touched.

## 15. Required corrections, for the commit stage

1. **The distance stage's attribution** (`REPORT.md` section 8 and section 11's last item; `record.md`'s FACTS line "The distance stage went 627 → 626 ..."; row 488; the handover line).
   - State that the BR error at `Library/FortressLibrary.fss:1535`, the two `BIG ||` messages at `:304` and `:314` and the `Comprehension` site's move from `:3436` to `:3416` are caused by the edit's `everyKnownSubtypeListed` queries, deterministically. The evidence is `probes/skeptic/distance-attribution.txt`: the landed build 626 twice, site for site; the base's checker 627, the rung's pre-edit sites; the broad form 625, the pre-edit sites less the two H2 errors.
   - Withdraw "The edit adds no type relation the body checker reads: it changes only whether the hierarchy pass adds its error".
   - Replace row 488's text with the recommended row below.
2. **The simple-name claim** (`REPORT.md` section 6).
   - Replace "which can only refuse more" with: it can refuse a true clause, and it can meet "at least one" for a generic subtrait nothing extends, when an unrelated trait of the same simple name in an api of the environment has an extender below a listed type (`probes/skeptic/name-collision.txt`).
   - In `record.md`'s FACTS line, "Still refused: ... a generic subtrait no known type extends" gains "unless an unrelated trait of the same simple name in the environment has an extender below a listed type (row <new>)".
3. **Home 2 for the spelling dependence.**
   - Copy `probes/skeptic/candidate/XXXComprisesGenericRenamed.fss` and `.test` into `ProjectFortress/compiler_tests/`, with the `.test`'s `STATIC_TESTS_DIR` line changed to `${FORTRESS_AUTOHOME}/ProjectFortress/compiler_tests`.
   - Run it once there and see "Saw expected failure".
   - Open the row that cites it (recommended rows).
   - Change "For the gather"'s `CompilerJUTest` 784 → 787 to 784 → 788.
   - It is shown red on a deliberate repair in `probes/skeptic/candidate-xxx.txt`.
4. **Row 414.** Append the note below.
5. **The gather's check of rung X's text.** `record.md`'s "X's text against Y's code" list gains four items:
   1. For a generic closed trait, the extender's self type is compared with the clause in the subtrait's own variable names, so the verdict depends on the extender's spelling (`SkGenericRenamed` refused, `SkGenericSameName` accepted).
   2. Extenders are matched by simple name across the unit and every api in its environment (`SkNameA` accepted).
   3. A generic subtrait whose only immediate extender is itself generic and below no listed type is refused, even when every value below it is listed (`SkTwoLevel`).
   4. Case 4 also applies to a generic type listed in an intermediate trait's own clause (`SkNestedClause` accepted).

   X's text must not state more than the code does in any of these.

## 16. Machine

nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz; openjdk 25.0.4; `FORTRESS_THREADS=1`; rung X of batch 7C and other sessions on the box. Each capture's header carries its load at start. The count runs took 124 s (post) and 34 s (pre). The distance runs took 823 s (landed), 822 s (broad) and 893 s (base, at load 3.05). No timing here is a comparison.

One thread throughout. The rung touches no mutable state, field, atomic block or library code that writes: it is a static checker rule.

## 17. Recommended rows

The gather opens or refuses each of these in one sentence. The new rows' numbers are the gather's to give.

**New row, home 2: the spelling dependence.**

| <new> | **the compiled checker's `comprises` rule for a generic subtrait of a generic closed trait compares each extender's self type with the clause in the subtrait's own type-variable names, so its verdict depends on how the extender spells its type variable** | NEGATIVE-VERIFIED | checker defect | `Documentation/Specification/Prose/Language/types.tick:277-283`, `:384-390` (an instantiation is covered by the listed types at the corresponding instantiation: every `Tag[\A, ZZ32\]` is a `Both[\A\]`, a `Full[\A\]`); renaming a bound type variable changes no program | `ProjectFortress/compiler_tests/XXXComprisesGenericRenamed.fss` with `.test` (home 2); `compile-ladder/rung-comprises-checker/probes/skeptic/SkGenericRenamed.fss`, `SkGenericSameName.fss`, captures `differential.txt`, `candidate-xxx.txt` | climb batch 7C rung Y's skeptic, 2026-09-28 | See the notes below. |

The row's claim, in full: with `trait Box[\T\] comprises { Full[\T\] }`, `trait Full[\T\] extends Box[\T\]` and `trait Tag[\T, U\] extends Box[\T\]`, the extender `trait Both[\T\] extends { Full[\T\], Tag[\T, ZZ32\] }` is accepted. `Both[\S\]`, the same declaration renamed, is refused: "Box has a comprises clause but its immediate subtype Tag is not eligible to extend it". Walk prints `full` for both.

Its notes:
- The cause is `everyKnownSubtypeListed` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:283-284`). It checks the extender's self type against `subst_comprises` (`:199-202`, in the subtrait's variables) under the extender's own parameters. It does not substitute the arguments the extender gives the subtrait.
- The same capture accepts a false clause when the extender also extends two instantiations of the closed trait, which is row 414's gap (`SkCrossedSameName`).
- A local repair that substitutes those arguments (`probes/skeptic/variants.txt`, substFix):
  - accepts the renamed program and refuses `SkCrossedSameName`;
  - keeps the rung's tests, `XXX9z` and `XXX10i`;
  - turns the `XXX` test red (`probes/skeptic/subst-fix.txt`, `candidate-xxx.txt`).
- That repair is not right as it stands inside case 3's recursion, where the clause is in the outer declaration's variables.
- The repair changes code Pavol approved (POSITIONS 2026-09-28), so the decision is his.
- The library is untouched: its closed trait is not generic.

**New row, home 3: the simple-name match.**

| <new> | **the compiled checker's `comprises` rule finds the extenders of a generic subtrait by the simple text of its name, over the unit and every api in its environment, so an unrelated trait of the same name counts** | NEGATIVE-VERIFIED | checker defect | the rule as climb batch 7C states it, "at least one type ... extends it" (POSITIONS 2026-09-28; `Specification/basic/traits.tex` as rung X revises it); under the coverage reading (`types.tick:384-390`) a trait with no values is covered, so no value escapes | `compile-ladder/rung-comprises-checker/probes/skeptic/SkNameD.fsi`, `SkNameB.fsi`, `SkNameA.fsi`, `SkNameAlone.fsi`, `name-collision.sh`, capture `name-collision.txt` | climb batch 7C rung Y's skeptic, 2026-09-28 | See the notes below. |

The row's claim, in full:
- Api `SkNameD` declares `Closed comprises { Listed }`.
- Api `SkNameA` declares `trait G[\X\] extends Closed`, which nothing extends, and imports `SkNameB.{K}`.
- `SkNameB` declares an unrelated `G[\X\]` and `K extends { Listed, G[\ZZ32\] }`.
- The landed checker accepts `SkNameA` and refuses the same api without the import (`SkNameAlone`). The base's checker refuses both.

Its notes:
- It is home 3 although the stated rule settles it. An `XXX` compile test demands a compile failure the checker does not make, and a plain test would pin the acceptance (FACTS, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only").
- The comparison is `TypeHierarchyChecker.scala:279`, `st.getName.getText.equals(tt.getName.getText)`, verbatim from the approved shadow.
- The same match can also refuse a true clause, when the unrelated trait's extender is below no listed type.
- The fix is to compare the declarations, with the names resolved to their api. It is part of the same repair as the spelling row.

**Row 488, replacing the rung's text.**

| 488 | **the compiled checker's type errors in big operators' bodies over the one library depend on what the checker queried earlier in the same run** | NEGATIVE-VERIFIED | checker defect (diagnostics depend on query history) | silent: the specification says nothing on whether a checker's diagnostics may depend on anything but the program; home 3 | `compile-ladder/rung-comprises-checker/probes/skeptic/distance-attribution.txt`; `compile-ladder/rung-comprises-checker/probes/distance-preedit.txt`, `distance-postedit.txt`, `distance-sites-diff.txt` | climb batch 7C rung Y, measured by its skeptic, 2026-09-28 | See the notes below. |

The row's claim, in full. Climb batch 7C's rung Y's `comprises` rule runs subtype queries in the hierarchy pass. Those queries add one BR error and change two sites of the body check:
- the new error: "Function body has type UniqueItem[\T\], but declared return type is BigReduction[\UniqueItem[\T\],UniqueItem[\T\]\]" at `Library/FortressLibrary.fss:1535`, on the unary `opr BIG SQCAP[\T\](g)`, which declares no return type;
- the two `BIG ||` messages at `:304` and `:314`, respelled;
- the `Comprehension` site, moved from `:3436` to `:3416`.

The runs behind it:

| run | total | sites |
|---|---|---|
| the landed build, twice | 626 | identical |
| the base's checker | 627 | |
| the broad form, which clears the same two H2 errors without the queries | 625 | the base's less those two exactly |

Its notes:
- Repeated runs of one build agree. So a move FACTS calls variation between setups was here the result of an edit that touches none of the declarations involved.
- The candidate cause is state shared across analyzers: the trait table's memos of `parents` and `excludesClause`, keyed by `TraitType` alone (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:81-97`, `d28cf74d0` of 2026-09-23). Every capture of the BR/V2/O1 variation on file postdates that commit.
- A run of the stage with `-Dfortress.analyzer.clauses.cache=false` on both builds would settle the cause. It checked 50 declarations of the component in 30 minutes and was stopped.
- `explorations/coordinator/tools/distance/compare.sh:16-18` reads such moves as run-to-run variation.
- Rung J's one new BR site, `Library/FortressLibrary.fss:3241`, which is the same in three runs of its tree, is plausibly the same thing.

**Note on row 414.** Append:

"Climb batch 7C's rung Y's `comprises` rule, through the name capture of the spelling row, accepts a program in this row's class whose `comprises` clause is false: `trait Odd[\T\] extends { Full[\T\], Tag[\ZZ32, T\] }` over `trait Box[\T\] comprises { Full[\T\] }` and a generic `Tag[\T, U\] extends Box[\T\]`. The checker refused it before the rung and accepts it after. Its compiled run prints a `Box[\ZZ32\]` that is no `Full[\ZZ32\]`. Renamed `Odd[\V\]`, it is refused (`compile-ladder/rung-comprises-checker/probes/skeptic/SkCrossedSameName.fss`, `SkCrossedRenamed.fss`, `differential.txt`). Closing this row refuses it under the declaration rule."

## 18. For Pavol

1. **The approved code decides by names where the decision's words speak of types.**
   - For a generic closed trait, its verdict depends on how the extender spells its type variable (`SkGenericRenamed` refused, `SkGenericSameName` accepted; `probes/skeptic/differential.txt`).
   - It counts an unrelated trait of the same simple name, in any api of the environment, as an extender (`SkNameA` accepted, `SkNameAlone` refused; `probes/skeptic/name-collision.txt`).
   - The two lines responsible are `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:279` and `:283-284`, verbatim from the shadow he approved (POSITIONS 2026-09-28, `AnyIntegral`'s `comprises` clause). Neither touches the library.
   - The repair has two halves: substitute the extender's arguments into the clause, and match the declaration rather than its simple name. It changes the 14 lines he approved.
   - A local sketch of the first half (`probes/skeptic/variants.txt`, substFix) keeps every verdict measured here and turns the gated test red (`probes/skeptic/subst-fix.txt`). It is not right inside case 3's recursion.
   - Whether and when a later rung repairs it is his.
