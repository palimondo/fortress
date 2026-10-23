<!-- Climb batch 21b, rung C (rung-symbolic-check): the skeptic's check of the worker's change, its programs, its corrections and its verdict. -->

# Rung C, the skeptic's check

Judged: `wip/rung-symbolic-check` at `ed4782762`, the worker's head, cut from `aa5c67d48`. The skeptic's commits: `172e1d35a` (the worker's REPORT.md and record.md, written from the run's journal), `208c1aca0` (corrections and two `XXX` tests), and this file. None of them changes code: the report's count and distance tables are those of the worker's head, whose code is `4fb3242fa`'s.

Verdict: **approved**. The change does what the section asks, the decisions it rests on are followed, and the record is honest once corrected. No fix of the change is needed, and none is contested. Three defects that the skeptic's programs measured are recorded (row 812, row 813, row 814). None is a defect of the change.

## 1. What was checked

- **The tables.** The worker's `tmp/` files were read against the landed gate. `diff` of `checker-count-postedit.txt` and `climb-batch-21/gate/checker-count.txt` is silent. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21/gate/distance.txt tmp/rung-symbolic-check/distance-postedit.txt` prints 'DISTANCE SAME   5'. `compare-sites.py` against the gate's sites prints 'landed 5 now 5' and "export 'are not matched by the declarations': landed 43 entries, now 43". Against the base's full check it prints 'landed 191 now 5'. The distance run's files hold no 'kind env', `CompilerBug` or crash line.
- **The count stage, run by the skeptic** (compiler.md, "The checker's time"), on the base build and on the worker's head, one after the other, at `FORTRESS_THREADS=1`. The command was `time explorations/coordinator/tools/checker-count/run.sh $S/$N.txt $S/$N`, the base run in a call set up for `/home/user/fortress-base21b`. Machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1.
  - base: 'real 1m18.097s', load at start 0.48;
  - head (code of `4fb3242fa`): 'real 1m38.309s', load at start 1.94.

  The worker's times were base 120.2 s and 84.4 s, change 107.5 s, pass 94.3 s and 96.8 s: the same order of size. `diff` of the base and head tables is silent. The head table equals the worker's `change` and `pass` tables. The head's `run.txt` equals the worker's `change` run's, each tree path replaced by `TREE`, and so does the base's.
- **Test first, in the worker's transcript.** Tests (1) to (4): `junit.sh base` at 20:18:57Z (call `4S8UTb`), 'Tests run: 5,  Failures: 3', with test (3) passing as the guard. Tests (5), (5b) and (2b): `junit.sh base5`, `base5b` and `base2b` at 20:24:28Z, 20:25:29Z and 20:33:01Z. All these ran before the first `ant compileAll` of the edit (20:35Z), on the tree's build of 19:15, the seed's. The two quick-loop compiles into `tmp/` before them changed no class that the harness reads. Row 775's test and row 611's checker test were seen red on the old code through `old-fortress.sh junit` ('F is not in the kind env [][][]'; 'Saw wrong failure. compile'). The passing runs were `junit.sh final` at 21:18:25Z, 'OK (13 tests)', after the last code change (20:53Z), and `junit.sh final611`, 'OK (1 test)'. `ant testQuick` ran on `4fb3242fa`'s code, the head's: 'Tests run: 1303, Failures: 0, Errors: 0', 86 and 263 with none, 'BUILD SUCCESSFUL'.
- **The diff, line by line.**
  - The three loops read `isCheckedName` (`OverloadingChecker.scala:270`, `:396`, `:405`, `:766-773`). It admits every `Op`, the subscripts among them, since `SOp` matches every `Op` (`scala_src/nodes`, `object SOp`). `isDeclaredName` is unchanged for the export check (fork 13).
  - `importsOnDemand` (`:248-255`) reads an api once, and reads the `except` clause by text, at all three loops.
  - `selfComprised` (`TypeAnalyzer.scala:604-622`) is read by `removeSelf` and by rung X's `withBounds` (`TypeSchemaAnalyzer.scala:470-471`).
  - The prelude repair is the planner's measured patch. It has the library's own precedent, which the report does not name: `HasRank extends Equality[\HasRank\] excludes { Number }`, whose comment says that it "takes the opr = that CompilerAlgebra.Equality supplies" (`Library/CompilerLibrary.fsi:266-274`).
  - The speed pass moves one pure test first. The `OR` of the same tests is unchanged.
  - The Appendix I Effect sentence (`Specification/appendices/changes.tex:2918-2923`) is true as written. Walk's `checkedName` reads `NodeUtil.validOp` (`OverloadedFunction.java:1990-1994`).
- **The exclusion arrows.** For a trait with a `comprises` clause, `FunctionalMethod.selfFromBound` is false (`ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java:48-54`). So `parameters()` equals the declaration's own, and `selfTyped` keeps no exclusion arrow (`OverloadingChecker.scala:549-557`). The worker's account holds: the second path was X's `withBounds`, not its arrows.
- **Other verdicts.** Every expected-failure test of the three tracks carries an `_err_` or `_exception_` key. A program that the full check now refuses for another reason therefore turns its test red, and testQuick shows none.
- **The ladder subset.** The 85 rows of the landed `climb-batch-21/gate/ladder/ladder.tsv` have the same phase and first error in the worker's `ladder.tsv`. The microGPT tables differ only in seconds.
- **The provenance lines.** Each cited line was opened. One citation was wrong and is corrected (section 3): `overloading.tex:125-130` speaks of an operator method named by an operator parameter, not of operators in general.
- **Competing declarations.** `importsOnDemand`, `isCheckedName` and `selfComprised` have no other declaration in `ProjectFortress/src/com/sun/fortress/`. No file of the rung's test names exists in another test folder.
- **The ledger rows.** The worker's three new rows and its rewrites of rows 611 and 481 pass `ledger.py add` and `rewrite`, run on a scratch copy of the ledger.

## 2. The skeptic's programs

They are under `tmp/rung-symbolic-check/skeptic/p/`. Each was run by `run4.sh` there: new compiled, `bin/fortress compile` then `run`, with a private copy of the head's caches; old compiled and old walk through `old-fortress.sh /home/user/fortress-base21b <tree>/tmp/rung-symbolic-check/skeptic/old-caches`; new walk. All ran at `FORTRESS_THREADS=1`. The diff adds no mutable variable, field, `atomic` block or library write. The range program also ran at 4 threads.

| program | what it tries | old compiled | new compiled | walk, old and new |
|---|---|---|---|---|
| `SkCwOpr` | functional `\|\|` of `AnyC comprises { C[\E\] } where [\E\]`, defined in `C[\E\]`, called | typecheck 'SkCwOpr.fss:4:27: E is not in the kind env [][][]' | typecheck exit 0; compile 'SkCwOpr.fss:10:33: E is not in the kind env [][]' (code generator) | 'got 7' PASS (new walk's first, cold-cache run refused it, row 342; the second passed) |
| `SkCwRename` | the same with the variables named `F`, `G`, `H` | 'F is not in the kind env [][][]' | typecheck 0; compile 'H is not in the kind env [][]' | 'got 5' PASS |
| `SkCwDotted` | a dotted member instead | 'E is not in the kind env [][][]' | compile 'SkCwDotted.fss:7:22-24: E is not in the kind env [][]' | not run |
| `SkCwNoGenericOverride` | the member only in the generic object | the checker's crash | 'Can't compile TraitDecl AnyC' (row 701) | not run |
| `SkTest2Copy` | test (2)'s program, compiled | 'SkTest2Copy.fss:5:27: E is not in the kind env [][][]' | 'SkTest2Copy.fss:11:33: E is not in the kind env [][]' | not run |
| `SkTest775Copy` | row 775's test program, compiled | 'F is not in the kind env [][][]' | 'Can't compile TraitDecl P' (row 701) | not run |
| `SkCwShadow`, `SkCwShadowRenamed` | AnyC's `g(self, y: ZZ32)` beside `g[\E extends String\](x: C[\E\], y: ZZ32)` (and `K`) | 'E is not in the kind env [E$1 -> ...]' | 'Overload violation: the declaration of top-level function g ... is more specific than the declaration of the functional method g' (source-code.tex, "Import Statements", the second static error) | 'got 2 1' PASS |
| `SkCwMisbind`, `SkCwMisbindK` | `object D[\E\] extends C[\ZZ32\]` defining `cat`: the where-variable's name bound by another declaration | the checker's crash | typecheck exit 0 | 'got 6' PASS |
| `SkOprMeet` | `+` valid by the Meet Rule, `-` by the Subtype Rule | 'got 1 2 3 4 5' PASS | the same | the same |
| `SkOprReturn` | `+(A, A): String` beside `+(Object, Object): ZZ32` | runs, 'java.lang.VerifyError: Bad return type' | 'For +, the return type of (A, A)->String ... should be a subtype of the return type of (Object, Object)->ZZ32' | refused at load, 'Overloading of +(...)' |
| `SkOprSubscript` | two subscripts over unrelated traits in one object | 'got 1 2 3' | 'Invalid overloading of _[_] in object Sw' | refused, 'first parameters i:[B] and i:[A] are unrelated' |
| `SkOprFixity` | prefix `-`, postfix `!` and prefix `!` at one type | 'got 1 2' PASS | the same | the same |
| `SkExplicitImport` | `import SkApiA.{...}` beside `import SkApiB.{ pick }` | 'There are multiple declarations of pick with the same parameter type: SkApiA.P' | the same | 'got 3' PASS |
| `SkExceptOpr` | `except { opr - }` and the component's own `-` | 'Likely bug in static analysis, apparently malformed overload set not rejected' | the same | 'got 2' PASS |
| `SkExceptOprUse` | `except { opr - }`, then `P1 - P1` | not run | 'got 1' | 'got 1' (old) |
| `SkExceptIdUse` | `except { pick }`, then `pick(P1)` | not run | 'Variable pick is not defined.' | the same (old) |
| `SkRangeEq` | a compiled range's `=` | 'Ill-formed type: CompilerAlgebra.Equality[\GeneratorZZ32\]' | 'r=r true r=s false r=t false g=r true eqOf true seq false' PASS, at 1 and 4 threads | not run |

What they show:
- The operator check is right where the rules settle it. It refuses a Return Type Rule breach that the old code ran into a `VerifyError`, and subscripts that walk refuses too. It keeps valid sets and different fixities.
- The crash repair holds with the variables renamed, and where a variable's name is bound by another declaration.
- The `SkCwShadow` refusal is the specification's: a top-level function more specific than a functional method is a static error (`source-code.tex`, "Import Statements").
- The compile stops in the code generator: row 812.
- Neither path honours the import rules on two points: row 813 and row 814.

## 3. Findings and what was done

1. **Test (2) holds only the checker's half (row 812).** The brief asked that test (2)'s program compile after the fix. It does not: it stops in the code generator with the same message, from another phase (`bin/fortress compile -debug stacktrace` of `SkTest2Copy.fss`). The stack runs `TypeAnalyzer.lteq` in `STypesUtil.removeIdenticallyCoveredMethods` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1587`), from `CodeGen.<init>` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:485`). Behind the crash, row 701's refusal of the trait's `where` clause stops every such program anyway (`SkCwNoGenericOverride`, `SkTest775Copy`). The worker wrote test (2) and row 775's test as `typecheck` tests, which is the most that the compiled path allows. The report does not say so.
   - Not a defect of the change: the code generator is no path of this section, and the crash was hidden on the base by row 809.
   - Recorded, home 3, as the record does for crashes (rows 756, 775): row 812 in `record.md`, and the self-type bullet of its Revival change names the departure. Commit `208c1aca0`.
2. **An explicit import does not hide another api's on-demand declarations (row 813).** By `source-code.tex`, "Import Statements", a name is imported on demand only if it is "neither listed in the except clause nor explicitly imported" by the component. `importsOnDemand` reads the first half only.
   - On the base and on the head, `SkExplicitImport` is refused, 'There are multiple declarations of pick'. Walk runs it, 3.
   - A scratch copy of `OverloadingChecker.scala` that also reads the explicit imports was compiled into `tmp/rung-symbolic-check/skeptic/quick/` (compiler.md, "Testing an edit here"). With it, the code generator stops instead: 'Likely bug in static analysis, apparently malformed overload set not rejected', its set holding both `pick`s. So the checker alone cannot repair it. The fix needs the name binding too, a path that this section does not give the rung, and it is not made here.
   - Recorded, home 2: `ProjectFortress/compiler_tests/XXXImportExplicitHidesOnDemand`, with the worker's two apis. On the old code: `old-fortress.sh ... junit .../XXXImportExplicitHidesOnDemand.test .../XXXImportExceptOperator.test`, 'Saw expected failure' twice, 'OK (2 tests)'. On the head: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ...`, the same, 'OK (2 tests)'. Shown red with the defect taken out (its explicit import removed for one run, then restored): `junit.sh skred`, 'Saw failure, but did not satisfy compile_err_contains; expected', 'Tests run: 1,  Failures: 1'.
   - Row 813. Commit `208c1aca0`.
3. **An `except` clause that lists an operator leaves it imported, on both paths (row 814).** `SkExceptOprUse` runs `P1 - P1` with the api's `-` compiled and under walk. An excepted identifier is left out on both paths (`SkExceptIdUse`).
   - With the rung's repair, the checker leaves the listed `-` out by its text, as the specification says. The code generator then stops on the set that the rest of the compiled path builds, as on the base, where the check read no symbolic operator: the same message.
   - Recorded, home 2: `ProjectFortress/compiler_tests/XXXImportExceptOperator`, with `ImportExceptOperatorApi`, green on the old code and the head (the runs of item 2). Row 814. Commit `208c1aca0`.
4. **A wrong specification citation.** REPORT.md's spec line and section 7, and record.md's Revival change, cited `overloading.tex:125-130` for "operator declarations must satisfy the overloading rules". That passage is about an operator method whose name is an operator parameter of its trait. The passage that says operators overload as functions do is `Specification/basic/operators/intro.tex:23-25`. Corrected in both files, commit `208c1aca0`.
5. **Sentences made false that the report missed.** REPORT.md section 8 now also lists:
   - F-80's title, "unless their name is a symbol", and its sentence on unchecked symbolic operators (`explorations/coordinator/FACTS.md:74`);
   - F-81's "The checker skips operators whose names are symbols (row 584)" (`:75`);
   - F-223's "It checks no symbolic operator (row 584); such a pair passes it and stops the code generator (row 726)", and its departure test, now the checker's refusal (`:219`);
   - P-155's "Today its overloading check reads an operator only if its name is a word of capitals ..." (`explorations/coordinator/POSITIONS.md:66`).

   record.md's FACTS hand-over names the three FACTS entries. Commit `208c1aca0`.
6. **The gate's compiler track** now counts 1,306: testQuick's 1,303, row 611's checker test and the skeptic's two. All 11 new or changed `.test` files of `compiler_tests/` pass together in one JVM on the head: `junit.sh skall`, 'OK (14 tests)'.
7. **The probe's shadow** (`perf-probes/symbolic-operators-2/checker-shadow.py:41-46`) rewrites the three `isDeclaredName` loops, which now read `isCheckedName`. Its edits no longer match the tree. It is no gate stage, and the stock stages are now the full check.

No suite was run: the skeptic changed no code.

## 4. Where the skeptic differs from the worker's account

- Test (2) and row 775: the worker's tests are right, but the report does not say why they only typecheck (finding 1).
- Decision 3, the `except` clause: the checker's reading is the specification's. The clause's second condition is not read (finding 2), and the rest of the compiled path does not apply the clause to an operator (finding 3). Both are recorded, and neither is a fault of the decision's rule.

## 5. The failure-mode question

- **The AnyList crash.** 'E is not in the kind env' is now the self type read as the trait type alone, outside the trait. P-60 settles that value: the `comprises` clause makes the trait comprise its listed types at every value of the variable.
- **The speed pass.** A crash that `lteq` could throw for two functional methods at one `self` position is no longer reached. The answer is `true`, the Meet Rule for Functional Methods' answer among the top-level functionals (`functionalMethodsAtOnePosition`'s comment, `OverloadingChecker.scala:626-629`).
- **The `except` repair.** A refusal of an identifier becomes acceptance, which is the specification's answer. For an operator, the code generator's loud failure stays (row 814).
