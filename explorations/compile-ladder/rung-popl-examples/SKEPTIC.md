# Rung P (climb batch 14, `rung-popl-examples`): the skeptic's verdict

Head judged: `98e8ff979`, the worker's last commit. The skeptic's commits:
- `42d68c515`: the worker's `REPORT.md` and `record.md`, from the run's journal;
- `a5c12ab57` and `1f9942c85`: corrections;
- this file.

Verdict: **approved**. The change is right. The corrections below are settled, and none is contested.

## 1. What was checked

- **The count and the distance.** Neither ran. `git diff --name-only 5bf8a7c84f313b1ee292de26081238a02b9a8d50...HEAD` lists no path outside the exempt folders: the filter over `explorations/`, `Specification/`, `ProjectFortress/tests/`, `ProjectFortress/*_tests/` and `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/` printed nothing. The report's tables are therefore those of the worker's head, and the gate's tables on the merged tree are the record.
- **Test first.** I read the worker's transcript (`agent-a8e04fcce62becce1.jsonl`) by time and call id.
  - Row 676's four tests failed through the harness on the base's code at 02:22:34 to 02:22:45 (call `VeqrZC`, `tree 5bf8a7c84`): "EvalType: class com.sun.fortress.nodes.IntBinaryOp is not yet implemented.", `Tests run: 4,  Failures: 4`.
  - The edit's first `Edit` call at 02:24:13 (`xBwVc8`) was refused ("File has not been read yet"), so the build at 02:24:16 compiled nothing ("Caches ... kept"). The edit was saved at 02:24:38 (`v95jaW`) and built at 02:24:41 (`cRrtuR`, "started again, empty").
  - The tests passed after that, the last code change, at 02:26:03 (`vfVjSg`): `OK (4 tests)`.
  - The six walk examples failed as written at 02:16:25 (`Ykdm3w`, `Tests run: 6,  Failures: 6`) and were gated as `XXX` at 02:17:18 (`qo9Pjv`, `OK (11 tests)`).
  - The three compiled examples failed as written at 02:20:29 (`78qNpU`, `Tests run: 6,  Failures: 4`) and were gated at 02:20:53 (`Ac1py5`, `OK (14 tests)`).
  - The first `XXX` test was shown red on a deliberate fix (`h-red1`, "Refused at load as its keys name, in an XXX test").
  - `ant testSystem` ran at 02:27:25 and `ant testQuick` at 02:31:29, both on the code state of `dcad9f75a`. The first ended "BUILD SUCCESSFUL / Total time: 3 minutes 36 seconds", the second "BUILD SUCCESSFUL / Total time: 9 minutes 45 seconds" (`tmp/rung-popl-examples/testSystem.txt:721-722`, `testQuick.txt:3627-3628`, both in the worktree's scratch). This matches `recordedFailure` and `recordedPass`.
- **The diff, line by line.** `EvalType.forIntBinaryOp` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:475-484`):
  - It follows `Int.powExact`'s loop (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:370-383`). It squares only while bits remain, so no needed square overflows before the result does.
  - It refuses a negative exponent, as the rung's section asks ("refused for a negative exponent", `explorations/coordinator/CLIMB-BATCH-14.md:227`).
  - It sends an overflow of a long to the method's existing out-of-range catch, the refusal a sum gets.
  - The edit is the one function, and nothing else in walk changed.
- **The specification.**
  - I opened each citation. The rule as restated is the first half of the section's own definition (`Specification/advanced/overloading.tex:539-542`, `:548-549`).
  - The 2011 paper's relation is non-strict (`Papers/Types/rules.tick:97-108`), and its rule is at `:158-162`, with "forbids distinct declarations from being equally specific" at `:184-185`.
  - The 2019 paper's sentence is in its Section 2.2 (`research/extracts/ParkPOPL2019.txt:232`, `:262`), and [No-Dup-Not-Less] and [No-Dup-Not-Gtr] are in Section 4.1 and Fig. 5 (`:600-611`, `:632-661`).
  - P-26's date is 23 September 2026 (`explorations/coordinator/POSITIONS-history.md:690`, the same words as `Specification/appendices/changes.tex:3091`).
  - The No Duplicates sentence's origin is `576b4c287`, of 2026-09-30.
  - The LaTeX built: `( cd Specification/fortress && ./ant genSource && ./ant tex )` ended "BUILD SUCCESSFUL" twice, and `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply\|^! Undefined control sequence" Specification/fortress/fortress.log` printed 0. The ignored files were removed afterwards.
- **The tests.**
  - Each new test has one comment line, and each comment and message cites a file and a section that exist (`advanced/overloading.tex`: "Subtype Rule" :184, "Incompatibility Rule" :210, "Meet Rule" :259, "Declarations with Static Parameters" :531; `basic/overloading.tex`, "Overloading Resolution" :291; `basic/traits.tex`, "Method Declarations" :370; `trait-parameters.tex`, "Nat and Int Parameters" :83).
  - The walk keys are walk's own messages (`OverloadedFunction.java:552`, `:570`, `:612`, `:1157`; `Constructor.java:611`).
  - The compiled run-time pairs follow `tests-writing.md`'s form.
  - The 17 new component names, each with and without `XXX`, `Walk` and `Link`, name only the rung's own files: `git ls-files` over `ProjectFortress` and `Library`, and `git grep -w` over `ProjectFortress/src`, `Library`, `test_library` and `LibraryBuiltin` found nothing else.
- **Mutable state.** `DispatchCrossingMeet(Walk)` writes a top-level `var`. Both ran at `FORTRESS_THREADS=1` and `=4`: walk on the new code, and compiled. Each printed `PASS` with rc=0.

## 2. My programs: the differential

The programs are in `tmp/rung-popl-examples/skeptic/` of the worktree. Every program was run four ways, by `run4.sh` with `FORTRESS_THREADS=1`:
- walk on the old code: `old-fortress.sh /home/user/fortress-base14 <tree>/tmp/old-caches P.fss`;
- walk on the new code: `FORTRESS_HOME=<tree> FORTRESS_CACHES=<copy of the base caches> <tree>/bin/fortress P.fss`;
- compiled on the old code, and compiled on the new code: `compile` then `run`.

The rung changes no code on the compiled path, and the two compiled columns agree in every program.

**A power in a size.**
- `SkPowVals`: the values. On the old code walk stops: "EvalType: class com.sun.fortress.nodes.IntBinaryOp is not yet implemented." On the new code walk and both compiled runs print the same 15 values. Among them:

      2^31 nat 2147483648
      (0-2)^31 int -2147483648
      pw 1 4294967295 1
      ipw -1 4294967295 -1
      ipw -2 31 -2147483648

  The others are 3^20, (2^2)^2, `2^3 3`, `2^32 - 1`, 0^0, 65535^2 and 0^4294967295, each through literals or static parameters.
- `SkPowZeroHuge`: 0^2147483647, (-1)^2147483647, 3^19 and (-3)^19 agree, as `0`, `-1`, `1162261467` and `-1162261467`.
- `SkPowIntOut`: `ipw[\2, 31\]()` initialises a top-level variable.
  - New walk: "Static argument 2147483648 is out of range for an int parameter, whose values are those of ZZ32".
  - Compiled: "java.lang.Error: Not in range for ZZ32: 2147483648". The class loader makes `IBox[\2147483648\]`, and reading `k` as a `ZZ32` fails. This is row 675's family.
- `SkPowIntOutLit`: `IBox[\2^31\]` is refused on both paths. Walk says "Static argument 2147483648 is out of range for an int parameter"; the checker says "The static argument 2147483648 is out of range for an int parameter".
- `SkPowNatNeg`: `Box[\(0 - 2)^3\]` is refused on both paths. Walk says "Negative nats are unNATural: -8", the message a difference gets. The checker says "The static argument -8 is out of range for a nat parameter".
- `SkPowOneNeg`: `ipwi[\1, 0 - 1\]()`.
  - New walk: "Static argument b^e has the negative exponent -1, and a power in a size takes an exponent of 0 or above".
  - Compiled: `REACHED`, then "java.lang.NumberFormatException: Illegal embedded sign character". This is the class load that the note on row 675 records.

**The No Duplicates Rule.**
- `SkDupCover`: `f[\T extends S\](x: T)` beside `f(x: S)`, with `f(x: S1)` and `f(x: S2)` covering `S comprises { S1, S2 }`.
  - The text before the rung accepted this set: the pair is equivalent, and the paragraph after the rules lets declarations each more specific than both, which together cover the pair, satisfy the Meet Rule (`Specification/advanced/overloading.tex:576-578`).
  - The text as restated refuses it.
  - The checker refuses it: "There are multiple declarations of f with the same parameter type: S".
  - Walk, old and new, prints `2`, `3`, `PASS`.
- `SkDupBound`: `g[\T extends Sh\](x: T)` beside `g(x: Sh)`. The checker says "There are multiple declarations of g". Walk runs the generic declaration and prints `0` (row 549).
- `SkDupTwo`: `h[\T, U\](x: Box[\T\], y: U)` beside `h[\V, W\](...)`. The checker says "There are multiple declarations of h". Walk runs one of them.
- `SkDupSelfGen`: `f[\T extends S\](self, y: T)` beside `f[\U extends S\](x: U, self)` in one trait.
  - Walk refuses it at load.
  - Compiled, the checker passes it, and the code generator stops the compile:

        # SkDupSelfGen..S.f[\T extends S\](self:S, y:T):ZZ32
        # SkDupSelfGen..S.f[\U extends S\](x:U, self:S):ZZ32
        Likely bug in static analysis, apparently malformed overload set not rejected for
        File SkDupSelfGen.fss has 1 error.

  - `SkDupSelf`, the same pair without static parameters, gives the same message.
- `SkDupFnMethod`: a top-level `k(x: S)` beside a functional method `k(self)`. The checker refuses it by its other check: "Overload violation: the declaration of top-level function k ... is more specific than the declaration of the functional method k".

## 3. Findings and fixes

All are corrections, in `a5c12ab57` and `1f9942c85`. There is no defect of the change itself.

1. **The Effect of "Overloading with static parameters" claimed more than holds** (`Specification/appendices/changes.tex:2404-2408` at `98e8ff979`).
   - It said that the checker refuses every pair whose parameter types are each a subtype of the other, and that walk loads such a pair (row 373).
   - The checker counts a duplicate only at one self position (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:441`, `sp == sp2`, the team's line). So `SkDupSelfGen` passes it, and the code generator throws its CompilerBug (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:411`).
   - Walk's loading of a generic declaration beside a plain one at its bound is row 549, not row 373.
   - The sentence now names both, with row 707 for the first (`changes.tex:2405-2414`).
   - Settled by `.claude/skills/fortress-repo/references/specification.md:22`: "The effect names each departure: each way in which walk or the compiled path does not do what the new text says, with its ledger row". The rule as restated refuses the pair (`overloading.tex:548-549`).
2. **Row 707, the defect `SkDupSelfGen` measures, recorded.** It is home 2, the specification settling that the pair is no valid overloading.
   - Its test is `ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositions.fss` and `.test`. The key is `compile_err_contains=Likely bug in static analysis, apparently malformed overload set not rejected`, the code generator's message, as a code-generator wall is keyed (`tests-writing.md`, "Writing an `XXX` test"). So the checker's own refusal turns it red.
   - On the base's code it is an expected failure. Command: `old-fortress.sh /home/user/fortress-base14 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositions.test`. Output: "Likely bug in static analysis, apparently malformed overload set not rejected for" / " Saw expected failure" / "OK (1 test)".
   - I made it red for one run by putting `self` first in both methods, then restored it (`git diff --no-index` empty). Output: "There are multiple declarations of f with the same parameter type: (S, U)" / " Saw failure, but did not satisfy compile_err_contains" / "Tests run: 1,  Failures: 1".
   - On the head it passed with the rung's twelve compiled `.test` files in one JVM. Command: `FORTRESS_HOME=<tree> FORTRESS_CACHES=<private copy> bin/fortress junit` over the thirteen files, links first. Output: "OK (15 tests)".
   - The row is in `record.md`, linted: "1 rows, 0 fail the template".
3. **A sibling site of row 696** (`Specification/appendices/future.tex:259-260`, written in `576b4c287` with the rule).
   - Its box said that Jan's two declarations are not a valid overloading because "each is more specific than the other", which the strict definition rules out (`overloading.tex:539-542`).
   - It now gives the rule as restated: each is applicable to every call to which the other is.
   - The entry names the box in its Change and quotes its earlier reason under its original text.
   - Settled by `overloading.tex:539-542` and `:548-549`. The path is outside the section's files and goes in the points to report.
4. **`REPORT.md`.**
   - Section 4 cited P-25 for "a wording that refuses nothing is the text's defect". P-25 says that the specification stays the standard, with the 2012 Types chapter beside it (`explorations/coordinator/POSITIONS.md:25`), and that chapter states no No Duplicates Rule. Its commented-out draft (`Documentation/Specification/Prose/Language/types.tick:575-592`) does ask that the parameter types not be the same, and calls the relation reflexive.
   - Section 4's way back said that one third declaration more specific than both makes the Meet Rule accept an equivalent pair. For an equivalent pair, a declaration strictly more specific than both cannot be applicable to every call to which both are. Only the coverage paragraph (`overloading.tex:576-578`) accepts it, as `SkDupCover` shows.
   - Section 4's checker sentence now names the self-position exception.
   - `concrete-syntax.tex:545` is `:546` (the line `\emph{IntExpr} \texttt{\^} \emph{IntVal}`).
   - `inference.tex:283-284` is `:285-286`, where the list ends and the callout starts.
   - Section 7 now lists FACTS F-146 and F-176, which say that walk stops on a power (`explorations/coordinator/FACTS.md:138`, `:166`).
5. **`record.md`.**
   - The second FACTS entry: the self-position exception, and walk's two shapes (rows 373 and 549).
   - The two FACTS entries made false, with their new clauses.
   - A note on row 549: the restated rule refuses its pair too, linted at 1,122 characters.
   - Row 696's close note now names row 707 and row 549.
   - `concrete-syntax.tex:546`.
   - row 707.

## 4. Where I differ from the worker's account, without editing it

- **Decision 2 and the second question for the curator.** Whether a negative exponent is refused is settled by the rung's section: "Walk's fourth case: an exact power, refused for a negative exponent and, ... for a value beyond the size's range" (`explorations/coordinator/CLIMB-BATCH-14.md:227`). It is not open.
- **Line numbers.** The report's `changes.tex` line numbers are those of `98e8ff979`. After the skeptic's commits:
  - the Effect of "When two sizes are the same" is at `:3322-3324`;
  - the No Duplicates passages of the entry start at `:2306`, `:2366`, `:2405` and `:2462`.
- **The callout's example.** It cites B4's `dup` pair, which the text before the rung also refused, by the Meet Rule, since nothing can cover `Box[\T\]` for every `T`. It does not claim otherwise. `SkDupCover` is a set that only the restated rule refuses.
- **A test message.** One assertion message in `NatArithPowerWalk.fss`, "a power whose value is beyond ZZ32 and ZZ64's narrower kinds, computed exactly", misdescribes `2^32 - 1`. That is a value within `NN32` whose power, `2^32`, is beyond it. It checks the right value, and I left it.

## 5. Homes, siblings, failure mode

- **Homes.** The report's defects are recorded as its section 11 says, each verified against the files and the runs. My programs measured these:
  - row 707: home 2, as above.
  - Walk's load of `SkDupBound` and `SkDupCover`: row 549, with its own expected failure `XXXGenericBesidePlainSameDomain`, and the note above.
  - The compiled class loader's `ZZ32` failure on `IBox[\2^31\]` from static parameters, and its `NumberFormatException` on `1^(0 - 1)`: row 675's family, which its claim and the worker's note cover. No new row.
- **Siblings.**
  - Walk computes a static expression in `EvalType.forIntArg`'s visitor alone. The other `IntBinaryOp` sites are the parser, the unparser and the checker (`grep -rn IntBinaryOp ProjectFortress/src`).
  - The compiled path already computes the power (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1212-1222`).
  - Row 696's confusion had one other site, `future.tex`, now corrected.
- **The failure mode.** The rung turns walk's InterpreterBug, a loud stop, into values and refusals. The values are `Naming.sizeOp`'s wherever they fit a long. That includes `0^0 = 1`, which the text does not give and the compiled path also computes. The refusals are ProgramErrors at load, not quiet values. No loud failure became a quiet one.

## 6. The points to report

- **Rows and notes.**
  - The worker's: R4 filed as row 706; notes on rows 373, 537, 675, 693, 698 and 699; rows 676 and 696 closed; no room on rows 444 and 697.
  - The skeptic's: row 707 and a note on row 549.
- **A power in a size whose value or refusal differs between the paths.**
  - The worker's: `2^32` made at class load (row 675), and a `NumberFormatException` at `e = -1` and `e = 5000`.
  - Added here: `IBox[\2^31\]` from static parameters, which the compiled path makes and then fails on, "Not in range for ZZ32: 2147483648", where walk refuses at binding; `1^(0 - 1)`, which walk refuses and the class loader stops on; and `Box[\(0 - 2)^3\]`, refused on both paths with different messages.
- **The specification.**
  - The worker corrected the two sentences on walk's power (`Specification/basic/expressions/constant.tex:15-17`, and `changes.tex:3322-3324` now).
  - The skeptic's commits changed no normative text. They corrected the Effect of "Overloading with static parameters" and a revision box in the internal document (`Specification/appendices/future.tex:259-261`), a file outside the section's list.
- **Not reached:** an example behaving otherwise than the note says; a test's verdict changing beyond the promotion; a walk edit beyond `forIntBinaryOp`, or any checker, library or code-generator edit.

## 7. Suites

None ran for my fixes. They change no Java or Scala, only a compiled test and the text. The gate runs every suite on the merged tree.
