<!-- Climb batch 15, rung O (rung-duplicates-coverage), the skeptic's verdict: the change is right and its record honest once three defects the skeptic's programs measured have homes and two Appendix I Effects name them; no code fixed, nothing contested. Head judged f537abed8; the skeptic's commits 19dbaa604, e5456a7e9 and 224f85017. -->

# Rung O: the skeptic's verdict

Verdict: **approved**. The three repairs (rows 707, 708, 709) do what the rung's section asks, test first, within the files it gives. My programs measured three further defects, all the same on the base's code and none caused by the rung; I gave each an expected failure and a row, named them in the two Effects the rung amends, and corrected the worker's rows NEW-O-1 to NEW-O-3 where my programs showed more. I changed no Java or Scala, so the report's tables and suite runs are those of the worker's head and still describe the code at my head.

## 1. What I checked

- **The tables.** The count and the distance on the worker's final code equal climb batch 14's landed tables. Commands and lines:

      diff explorations/compile-ladder/climb-batch-14/gate/checker-count.txt tmp/rung-duplicates-coverage/checker-count-postedit.txt    # no output, rc=0
      #total	1
      #crash	none
      diff <(grep -v '^#seconds\|^#machine' explorations/compile-ladder/climb-batch-14/gate/distance.txt) <(grep -v '^#seconds\|^#machine' tmp/rung-duplicates-coverage/distance-postedit.txt)    # no output, rc=0
      explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-14/gate/distance.txt tmp/rung-duplicates-coverage/distance-postedit.txt
      DISTANCE SAME   54

  The per-site diff of the report's section 6 also prints nothing. The count stage stops the component `FortressLibrary` at its one error before its overloading check (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:269-276`); every api's check, the duplicate check included, ran with 0 errors. The distance stage runs every stage, `AbstractMethodChecker` among them (`OverloadingChecker.scala:344`): `#kind overloading 0`, `#kind abstract-method 0`.
- **Test first**, in the worker's transcript (`agent-aac6abd6955e3becf.jsonl`):
  - failing on the base's code: `junit.sh base` at 12:23:41 (call `Wn5dsA`), "Saw wrong failure" for both row 707 tests and "Must satisfy FAIL or fail should not appear in output" for `AbstractMethodCoveredPairs`; `harness-one.sh` at 12:23:56 (call `zLt26Q`), "Missing expected refusal at load" for `AbstractMethodCoverUnsettledWalk`. The first source edit is at 12:25:47 (`v8RNZN`) and the first build at 12:28:05 (`yPhM2w`).
  - passing after the last change: the last edit at 13:19:26 (`mWvxR1`), built at 13:19:38 to 13:21:48 (`2KhbSM`, "BUILD SUCCESSFUL"); `junit.sh after2` at 13:21:56 (`CYNH9f`), "OK (26 tests)"; `ant testSystem` on that code, "interpret .../AbstractMethodCoverUnsettledWalk  OK Saw expected refusal at load", "BUILD SUCCESSFUL". `Constructor.java` was last edited at 12:26:58.
- **The diff**, line by line, against the section, `overloading.tex:548-549`, `traits.tex:627-648`, P-147, P-60 and P-26. Row 707's condition `sp == sp2 || (sp.isDefined && sp2.isDefined)` (`OverloadingChecker.scala:442`) leaves the dotted set (`toMethodArrows` gives `None`, `:192`) and a function beside a functional method (`None` beside `Some`) as they were. `coveredByParts` (`AbstractMethodChecker.scala:124-181`) is walk's `definedBelow` and `coverParts` step for step: the split only where some covering type does not hold the part (`:154-155` against `Constructor.java:556-562`), the cycle by the path, the steps decremented per call, the combinations counted before the search, every combination inside one cover. Walk's three returns (`Constructor.java:503`, `:515`, `:518`).
- **Precedent**: the worker's search holds (report section 3); I opened every citation of the five provenance lines with `sed -n` and each says what it is cited for.
- **The tests**: one comment line each, specification cited by file and section, named by topic; the row 709 test asserts its four values.
- **Competing names**: none of the eight new component names, nor `coveredByParts`, `COVER_STEPS`, `COVER_PARTS` or `writtenBefore`, is declared elsewhere in `ProjectFortress/` (both test corpora and `src/`).
- **The library's pairs at two self positions**, by the worker's grep run again: the word-named ones are `IN`, `NOTIN` and `MATCH`, none with a sibling with self first; the symbolic ones are `FlatString`'s `||` (`Library/FlatString.fsi:17`, `:20`), equivalent, and `String`'s four (`Library/FortressLibrary.fsi:2494-2514`), not equivalent. The check reaches none of them (row 584).

## 2. My programs, old against new

Programs under `tmp/rung-duplicates-coverage/skeptic/`, each run four ways: the new code with a private copy of the tree's caches (`FORTRESS_CACHES=<dir>/new-caches bin/fortress compile P.fss`, then `run P`, and `bin/fortress P.fss`), and the old code (`/home/user/fortress-base15/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base15 /home/user/fortress-dupcover/tmp/old-caches compile P.fss`, `run P`, `P.fss`), at `FORTRESS_THREADS=1`; the walk runs of `SkCoverNested`, `SkBoundCovered`, `SkBoundCoveredFour` and `SkGenericCoverOnly` again at `FORTRESS_THREADS=4`, with the same answers.

| program | compiled, old | compiled, new | walk, old | walk, new |
|---|---|---|---|---|
| `SkDupThree`: `f` at three self positions, `(S, S, S)` each | code generator stops, "Likely bug in static analysis, apparently malformed overload set not rejected" | refused, "There are multiple declarations of f with the same parameter type: (S, S, S)" | refused at load | refused at load |
| `SkDupCross`: `f(self, y: B)` in `A` beside `f(x: A, self)` in `B` | compiles; run: "ClassFormatError: Duplicate method name \"f\"" | refused, "... of f with the same parameter type: (A, B)" | refused at load | refused at load |
| `SkNotDup`, `SkNotDupObj`: two self positions, one more specific | `PASS` | `PASS` | `PASS` | `PASS` |
| `SkDupSym`: `opr \|\|(self, y: S)` beside `opr \|\|(x: S, self)` | code generator stops, "Likely bug ..." | the same | refused at load | refused at load |
| `SkDupAbstractSame`: abstract `f(self, y: S)` beside `f(self, y: S) = 2` | code generator stops, "Likely bug ..." | the same | refused at load | refused at load |
| `SkDupAbstract`: abstract `f(self, y: S)` beside `f(x: S, self) = 2` | code generator stops | the same | refused at load | refused at load |
| `SkCoverNested`: `Side comprises {Ping, Mid}`, `Mid comprises {Pong, Pang}`, four bodies covering `(Side, Side)` | refused, "Domain (Side, Side) is not a subtype of OR(...)" | `PASS` | `PASS` | `PASS` |
| `SkNotCoverNested`: the same with `(Pang, Pang)` uncovered | refused | refused | refused at load | refused at load |
| `SkCoverGenericObj`: the row 709 shape in `object Joiner[\X\]` | refused | `PASS` | `PASS` (unchecked, row 665) | `PASS` |
| `SkBoundCoveredFour`: four `D` positions, six `(Pi, D, D, D)` bodies and three narrower | refused | `PASS` | `PASS` | `PASS` |
| `SkBoundCovered`: the same with five positions, 7,776 combinations | refused | refused | `PASS` | refused at load, "Object O does not define an abstract method declared in type H" |
| `SkCoverUnneededGeneric`: row 709's three bodies and `g[\T extends Pong\](self, x: T, y: Ping)` | refused | refused, union of "(T, Ping), (Ping, Pong), ..." | "Missing type T" | "Missing type T" |
| `SkGenericCoverOnly`: `g[\T extends Side\](self, x: T)` under `g(self, x: Side)` | `PASS` | `PASS` | refused at load | refused at load |
| `SkGenericCoverPair`: `g[\T extends Side\](self, x: T, y: Side)` under `g(self, x: Side, y: Side)` | `PASS` | `PASS` | refused at load | refused at load |
| `SkGenericAbstract`: abstract and body both `g[\U extends Side\](self, x: U, y: Side)` | `PASS` | `PASS` | `PASS` | `PASS` |
| `SkGenericAbstractSplit`: that abstract method, bodies at `(U, Ping)` and `(U, Pong)` | refused | refused | refused at load | refused at load |
| `SkGenFmTrait`: NEW-O-1's pair in a trait that an object extends | — | `ClassCastException: ... FunctionalMethod cannot be cast to ... Method` | — | "InterpreterBug ... This should have been an environment with a Top Level" |

What they show:
- Row 707's repair reaches three positions, and a pair across two traits in the top-level set, which the old code compiled into a class the JVM refused. Pairs that are not duplicates still compile and run.
- Row 709's repair reaches nested `comprises` clauses and a generic object, and refuses what is not covered.
- The bound costs a valid program: `SkBoundCovered`'s six bodies at `(Pi, D, D, D, D)` cover the method, but its four narrower bodies make every position split, and both paths now refuse it, where walk ran it. That is the coordinator's call on W.skeptic.1 (section's row 708; P-147 has walk agree with the checker), so it is no defect of the rung; it is evidence for that call's review (forCurator).
- No measured shape turns a refusal or a crash into a quiet wrong value.

## 3. Findings and their corrections

No finding is a defect of the change: each defect below shows on the base's code, and each has a cause outside the code the rung edits, or a shape the rung's section leaves out. Each is a correction: a home-2 test, a row, a sentence.

1. **NEW-O-4, a symbolic operator's duplicate pair at two self positions passes the checker and stops the code generator** (`SkDupSym`). This is row 707's defect where `isDeclaredName` admits no symbolic operator (`OverloadingChecker.scala:723-727`, row 584), and `FlatString`'s api declares exactly this pair. The section keeps the operators out of the repair, since a refused api would stop the count stage; so it is deferred, home 2: `ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositionsOperator`, keyed on today's stop as row 707's test was at the base.
2. **NEW-O-5, the checker reads no abstract functional method of a trait the component declares** (`SkDupAbstractSame`, `SkDupAbstract`): the top-level set in a component takes only declarations with a body (`OverloadingChecker.scala:83`) and a type's set no own bodiless functional method (`:139-141`), row 572's mechanism. An abstract method beside a concrete duplicate passes, at one self position or two, and the code generator stops. Home 2: `ProjectFortress/compiler_tests/XXXNoDuplicatesRuleAbstract`.
3. **NEW-O-6, walk refuses an object whose one covering definition has a static parameter of its own** (`SkGenericCoverOnly`, `SkGenericCoverPair`), which the compiled path runs; `Constructor.checkForDef` refuses (`Constructor.java:433`) where `definedBelow` finds no cover. Not located further. The traits chapter (`traits.tex:627-648`) and P-147 settle it valid. Home 2: `ProjectFortress/tests/XXXAbstractMethodGenericBodyWalk`.
4. **The worker's rows say less than its code and my programs show**: NEW-O-1 and NEW-O-2 hold for the same pair in a trait (`SkGenFmTrait`); NEW-O-3's claim named only a covering method's static parameters, where `coveredByParts` also skips an abstract method's own (`AbstractMethodChecker.scala:141`, `SkGenericAbstractSplit`), and a body with static parameters that the cover does not need refuses the object too (`:143-145`, `SkCoverUnneededGeneric`). Corrected in `record.md`.
5. **Two Effects claimed more than holds.** "Overloading with static parameters" now said the checker refuses duplicates, "two functional methods among them wherever their self parameters stand" (`Specification/appendices/changes.tex:2497-2501`), and the library's one pair at two self positions is one it never checks. "Traits with comprises clauses read at the level of values" said walk accepts an object whose definitions together cover a method, and NEW-O-6 departs from it. The skill's rule is that the Effect names each departure with its row (`specification.md`, "When the text and an implementation disagree"). Both now do (`changes.tex:2502-2507`, `:2886-2890`), with no normative text changed. The report's section 7 says the first sentence was "no truer and no falser" for row 584; there I differ.
6. **F-145 and F-223's new texts** in `record.md` now name NEW-O-6, and row 584 with NEW-O-4 and NEW-O-5, and the tests that gate them.

The tests, each through the harness on the head and on the base's code:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests XXXNoDuplicatesRuleSelfPositionsOperator.test XXXNoDuplicatesRuleAbstract.test    # 14:43:41Z, head 19dbaa604's code
     Saw expected failure
     Saw expected failure
    OK (2 tests)
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-duplicates-coverage/skeptic/h1 ProjectFortress/tests/XXXAbstractMethodGenericBodyWalk.fss    # 14:43:43Z
     OK Saw expected exception
    OK (1 test)
    old-fortress.sh /home/user/fortress-base15 $W/tmp/old-caches junit $W/ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositionsOperator.test $W/ProjectFortress/compiler_tests/XXXNoDuplicatesRuleAbstract.test    # 14:44:26Z, the base's code
     Saw expected failure
     Saw expected failure
    OK (2 tests)
    FORTRESS_HOME=/home/user/fortress-base15 /home/user/fortress-base15/explorations/compile-ladder/rung-inference-walk/harness-one.sh $W/tmp/rung-duplicates-coverage/skeptic/oldh $W/ProjectFortress/tests/XXXAbstractMethodGenericBodyWalk.fss    # 14:44:28Z, tree ee1aa1a95
     OK Saw expected exception
    OK (1 test)

The first of them red when the defect does not show, the operator renamed `f` for one run and then restored (`cmp` with the saved copy: identical):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skred ProjectFortress/compiler_tests XXXNoDuplicatesRuleSelfPositionsOperator.test    # 14:44:16Z
        There are multiple declarations of f with the same parameter type: (S, S)
     Saw failure, but did not satisfy compile_err_contains; expected
    1) ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositionsOperator(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

The specification builds with my sentences: `./ant genSource` and `./ant tex`, two "BUILD SUCCESSFUL"; `grep -c "^LaTeX Warning: Reference\|^! Undefined control sequence\|multiply defined" Specification/fortress/fortress.log` prints 0.

Commits: `e5456a7e9` (the three tests, the rows, the FACTS texts), `224f85017` (the two Effects). No suite ran for them: they change no Java or Scala; the three tests add 2 compiled and 1 interpreter test to the gate's counts.

## 4. Where I differ from the worker, and where I do not

- Decision 6 (an unreadable covering body is skipped, not refused) departs from the section's letter, which lists the exception among the cases to refuse. The worker's reading is right: the precedent it names skips an unreadable candidate (`OverloadedFunction.java:912-915`), and an object whose readable bodies cover the method defines it by `traits.tex:627-648`. The abstract method's own unreadable domain still refuses, since no cover is then collected (`Constructor.java:506`).
- Decision 5 (no split where a method has static parameters of its own) refuses more than its rationale names: a body with static parameters that the cover does not need refuses the object too (`SkCoverUnneededGeneric`). Skipping such a body, as walk's `overlapCoveredBy` skips a generic candidate (`OverloadedFunction.java:900`), would accept the object and reach the code generator's NEW-O-2 instead, which is the worker's own reason against splitting through the schema. I recorded the face (finding 4) and changed nothing.
- Decision 2 (the duplicate message names the first-written declaration's domain) is a point to report, listed below; I measured nothing against it.

## 5. Points to report

- The message row 707's refusal prints: both spans, then "There are multiple declarations of f with the same parameter type: " and the first-written declaration's domain, without self in a type's set (`OverloadingChecker.scala:444-451`, `:755-762`). The bound row 709's split takes: 10,000 steps and 4,096 combinations (`AbstractMethodChecker.scala:125-126`), walk's `OVERLAP_STEPS` and `OVERLAP_PARTS` (`OverloadedFunction.java:865`, `:868`).
- Text beyond the three Appendix I sentences, none normative: the worker's sentence on NEW-O-3 (`changes.tex:2896-2899`) and my two (`:2502-2507`, `:2886-2890`). Sentences made false: FACTS F-145 and F-223 (new texts in `record.md`), the skill's `references/interpreter.md:42` and `references/revival-changes.md:66`.
- None of the others: no library, team or test declaration newly refused, no other verdict changed, no ladder file moved, no count or distance site moved, no edit of `TypeAnalyzer.scala`, `OverloadedFunction.java`, the library or the code generator.

## 6. The failure-mode question

The rung turns no loud failure into a quiet value. Row 707 turns a code-generator stop, and in `SkDupCross` a `ClassFormatError` at run time, into a static refusal; row 708 turns a quiet load into a refusal; row 709 turns a refusal into the run the specification gives (`SkCoverNested` asserts its four values on both paths).
