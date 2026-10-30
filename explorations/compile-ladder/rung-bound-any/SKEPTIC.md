<!-- Climb batch 22c, rung B (rung-bound-any): the skeptic's check of the bound Any for fortress compile, its stage, its tests and its record. -->

# Rung B, the skeptic's verdict

Judged: the worker's head `8d5efafda` on `wip/rung-bound-any`. The worker's REPORT.md and record.md were written from the run's journal in `8feb78b84`. Verdict: **approved**. The change is right as the worker made it. Two of my commits correct its record and add one test; nothing is contested.

## 1. What I checked

- **The tables.** I read the worker's files under its `tmp/rung-bound-any/`. The distance table under the new default reads '#distance setting compile', '#total 0', every `#kind` row 0, '#crash none', '#seconds 226 FortressLibrary 169'. Its run's first line is '### order=check setting=compile (extendsObject=false compiledExpr=true) prelude=INTERPRETER ...', and its last line '### all seconds=225 rc=0'. The count table is `diff`-equal to `explorations/compile-ladder/climb-batch-22/gate/checker-count.txt`: '#total 0', '#locations 0', '#crash none'. The diff changes no Scala under `scala_src/` and no code that the build generates for the checker, so the count stage was not mine to run. My commits change one test, specification prose and the record, none of which moves either stage. So the report's tables are those of the worker's head.
- **Test first.** In the worker's transcript (`agent-a7ef990ac9d72bf60.jsonl`), the ten tests were edited from 23:18:53 to 23:20:02 UTC. The failing run (call `JFK8Wy`) started at 23:20:21 on the seeded base build, and its log was read at 23:21:22: '. link ProjectFortress/compiler_tests/ImplicitBoundAny ... The static argument Any does not satisfy the corresponding bound Object.' and 'Tests run: 13,  Failures: 9,  Errors: 0'. `Shell.java` was first edited at 23:22:40 (`oi6a9k`) and built at 23:22:47 (`UPBZJ5`). The passing run `after2` (23:25:57) gives 'OK (13 tests)', after the last edit of code. `ant testQuick` ran from 23:35:53, after the new pair was written: 1318/86/263, 'BUILD SUCCESSFUL'. The 23 CompilerSystem files give 'OK (138 tests)' (`junit-csys.txt:284`).
- **The diff, line by line.** `Shell.java:372` is the planner's blob `1df7072b8`. `DistanceMulti.java:49` and `:79-92` and `run.sh:82` are `rung-B.patch`'s lines, and both headers are new. `run.sh` runs the driver after `cd "$FH"` (`run.sh:121`), so the driver's relative path to `Shell.java` resolves in the tree it measures. The `&&` reads the source only under `-setting compile`. The ten test edits are the brief's, each with its value kept, as REPORT.md section 9 lists them.
- **Comment lines.** `XXXOverrideGenericReturnTypeNotSubtype.fss` and `CoercionGenericFnCompiledRungC.fss` now carry two comment lines each, and the first names row 653. The brief asks for both comments, so the brief holds over `tests-writing.md`.
- **The precedent.** It is the line beside the fix, `useInterpreterLibraries()`'s `setExtendsObjectPreDesugaring(false)` (`Shell.java:380`). The switch has one reader, `PreDisambiguationDesugaringVisitor.java:196`. The fix also reaches `api`, `parse`, `unparse`, `compare`, `disambiguate`, `desugar`, `grammar` and `test-coercion`, since each calls `useCompilerLibraries()` (`Shell.java:402-460`). The record names only `compile`, `link`, `build` and `typecheck`. That is incomplete, not false.
- **NEW-B-1.** The worker says the component's name decides it. I checked this with three names of my own, the same text in each: `TupleQ` fails on both codes, 'java.lang.VerifyError: Bad type on operand stack'. `TuplQ` and `MyTupleQ` run, 'REACHED' and 'PASS'. So only a name that begins with `Tuple` fails, as the row says. Home 2 is right: the checker accepts the program, and the JVM's verification refuses it.
- **The Specification.** The worker's three passages and two Change sentences say what the code now does. `grep -rn 412 Specification` finds only the two Change sentences, which tell the history. I found two more sentences of Appendix I, below.

## 2. My programs, old against new

All are in `tmp/rung-bound-any/skeptic/`. Each was run by `diff.sh`, which runs walk and then compile and run. The old code runs through `/home/user/fortress-base23/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 <tree>/tmp/rung-bound-any/skeptic/old-caches`. The new code is the rung's `bin/fortress`, with `FORTRESS_CACHES` set to a copy of the tree's caches. The diff writes no mutable variable, field, atomic block or library state, so every run is at `FORTRESS_THREADS=4` only. Walk's code is unchanged, and walk gave the same answer on both codes.

| Program | Walk | Old compiled | New compiled |
|---|---|---|---|
| `SkPrintUnbounded`: `show[\T\](x: T): () = println(x)` | 3, PASS | 3, PASS | rc 255, 'Object->() is not applicable to an argument of type T.' |
| `SkAsStringUnbounded`: `x.asString` for `x: T` | PASS | PASS | rc 255, 'T has no getter called asString' |
| `SkDispatchPairVar`: `pick[\T\](x: T)` beside `pick(x: ZZ32)`, `pick((z, z))` | PASS | rc 1, 'FAIL:  zz32 =/= generic; pick of a pair' | PASS |
| `SkTypecaseVar`: `typecase x of ZZ32 ... else`, `kind((z, z))` | PASS | rc 1, 'FAIL:  int =/= other; kind of a pair' | PASS |
| `SkDispatchAnyVar`: `a: Any = (z, z)`, `b: Any = z`, `pick(a)`, `pick(b)` | PASS | rc 255, '[\T extends Object\]T->String is not applicable to an argument of type Any.' | PASS (`pick(b)` runs the `ZZ32` arm) |
| `SkDispatchObjectVar`: `b: Object = z`, `pick(b)` | PASS | PASS | PASS |
| `SkGenericBesideObject`: `g[\T\](a: T)` beside `g(a: Object)`, `g(3)` | PASS | rc 255, 'There are multiple declarations of g with the same parameter type: T' | PASS (2, the `Object` one, as walk) |
| `SkArrowArg`: `same[\F\](f: F): F`, a function value | PASS | rc 255, '[\F extends Object\]F->F is not applicable to an argument of type ZZ32->ZZ32.' | PASS |
| `SkNatUnbounded`: `size[\nat n\](v: V[\n\]): ZZ32 = n` | PASS | PASS | PASS |
| `SkGenericBesideAny`: `g[\T\](a: T)` beside `g(a: Any)` | refused at load, 'Overloading of g(a:Any) ... and g[\T\](a:T)' | rc 0, 'g(z) =  generic' | rc 255, 'There are multiple declarations of g with the same parameter type: T' |
| `SkGenericBesideAny2`: the same with two parameters | refused at load | rc 0, 'g(z, z) =  generic' | rc 255, '... same parameter type: (T, T)' |
| `SkIdObjectPair`: `idO[\T extends Object\](x: T): T`, `q = idO((z, w))`, `q + 1` | 'Meet((Int,Int), Object) not a singleton' (row 471) | 'REACHED', 'q + 1 =  4' | 'REACHED', 'q + 1 =  4' |
| `SkPickObjectPair`: `pick[\T extends Object\]` beside `pick(x: ZZ32)`, `pick((z, z))` | 'Failed to find any matching overload' | 'pick of a pair:  zz32' | 'pick of a pair:  zz32' |
| `SkWrittenTupleArgObject`: `idO[\(ZZ32, ZZ32)\]((z, z))` | PASS | PASS | PASS |

The numeral forms of `SkDispatchPair`, `SkDispatchAnyStatic` and `SkTypecaseT` give 'generic' or 'other' for `3` on both codes, where walk gives the `ZZ32` answer. The checker types a numeral as `IntLiteral` (P-76). This is row 79, and the flip does not change it.

What the table shows:

- **Accepts and runs, beyond the probe's programs:** an arrow-typed argument, a dispatch from a static type `Any` to the `ZZ32` arm, and a generic beside a plain declaration at `Object`, which now runs the plain one, as walk does.
- **Runs differently:** on the old code, `pick((z, z))` ran `pick(z)`, and `kind((z, z))` ran `kind(z)`. This is row 691 reached through a tuple at a parameter bounded by `Object`. On the new code both run right.
- **Refuses:**
  - Printing a value of an unbounded `T` is refused, since the prelude declares `print(x:Object)` and `println(x:Object)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:55`, `:61`). The one library declares `print(a:Any)` and `println(a:Any)` (`Library/FortressLibrary.fsi:2594-2595`). This is a limit of the prelude until the switch-over, as `||` is.
  - `x.asString` on an unbounded `T` is refused. This is right: `asString` is `Object`'s (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32-34`), and `Any` declares nothing (`AnyType.fsi`).
- **No failure mode turns quiet.** The flip turns static refusals into right runs, or into the loud run-time deaths of rows 339 and 832. It turns two quiet wrong values of row 691 into right values or a refusal.

## 3. Findings and my fixes

1. **The flip repairs row 759, and the rung neither recorded nor gated it.** Row 759 says the checker accepts `g[\T\](a: T)` beside `g(a: Any)` and runs the generic one. The row names row 412 as its cause: "The checker bounds an unbounded `T` by `Object` (row 412) ... and so reads the generic one as strictly more specific". The table above shows the old code accepting the pair and the new code refusing it. The rule that settles it is the No Duplicates Rule: "$d_1$ and $d_2$ are not each applicable to every call to which the other is applicable" (`Specification/advanced/overloading.tex:548-549`). With the implicit bound `Any` (`Specification/basic/trait-parameters.tex:52-53`; P-42), each of the two is applicable wherever the other is. The flip also makes false Appendix I's revival-overloading Effect: "It accepts one such pair, ... and runs the first for a call to which both apply; it refuses the same pair where the bound is written ... (row~759 ...)" (`Specification/appendices/changes.tex:2914-2920` at the worker's head).
   - Fix, a correction, in `1bd87dcf7`. The new compile test `ProjectFortress/compiler_tests/NoDuplicatesRuleUnboundedBesideAny.fss`, with `XXXNoDuplicatesRuleUnboundedBesideAny.test`, follows the precedent of `NoDuplicatesRule.fss` and `XXXNoDuplicatesRule.test`, and checks both pairs. The Effect sentence is rewritten to what the code does, with row 759 kept as history.
   - Failing on the base: `old-fortress.sh /home/user/fortress-base23 <tree>/tmp/rung-bound-any/skeptic/old-junit-caches junit <tree>/ProjectFortress/compiler_tests/XXXNoDuplicatesRuleUnboundedBesideAny.test` printed ' Saw failure, but did not satisfy compile_err_matches; expected' and 'Tests run: 1,  Failures: 1,  Errors: 0'. The old code compiles the program (rc 0) and runs it, 'genericgeneric'.
   - Passing on the head: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh sk759 ProjectFortress/compiler_tests XXXNoDuplicatesRuleUnboundedBesideAny.test` printed '    There are multiple declarations of g with the same parameter type: T', '    There are multiple declarations of h with the same parameter type: (T, T)', ' Saw expected failure' and 'OK (1 test)'.
   - The specification built clean: `./ant genSource` and `./ant tex`, 'BUILD SUCCESSFUL' twice, and the log's reference, undefined-sequence and multiply-defined counts all 0.
   - Made false outside the rung's files, for the gather and the record's pass:
     - F-274's "and the compiled checker accepts that pair (row 759)";
     - P-45's "walk and the checker disagree on four kinds of pair (rows 759 and 786 to 788)";
     - the skill's `references/compiler.md:80`, "It accepts `g[\T\](a: T)` beside `g(a: Any)` ... (ledger row 759)";
     - row 759's claim, which the gather closes with `7964e59b7` and this test.
2. **Revival-bound's Effect named only concatenation as the prelude's limit.** The revision form asks that "The effect names each departure" (`.claude/skills/fortress-repo/references/specification.md:22`). `SkPrintUnbounded` measures a second limit, `print` and `println` at `Object`. Fix, a correction, in `1bd87dcf7`: `changes.tex:3107-3111` now names both.
3. **record.md said that row 691 "is no longer reached through a tuple".** That holds only where the bound is unwritten. `SkIdObjectPair` and `SkPickObjectPair` still run `idO(z)` and `pick(z)` with `extends Object` written, on both codes. Fix, a correction, in `e2df28a4b`:
   - record line 4 corrected, and line 5 extended to printing;
   - a new line 8 for row 759;
   - the FACTS hand-over adds F-274, and the POSITIONS hand-over adds P-45;
   - the ledger section closes row 759 and rewrites rows 470 and 691;
   - row 691's line adds the written-bound case. To fit the 700-character notes cell, it drops the words "the compile command's" and "the bound" before `Object`, and cites `compile-ladder/rung-bound-any/SKEPTIC.md`;
   - row 470's new line writes `id[\T extends Object\]` where its note spoke of "the compile command's bound `Object` (row 412)". `SkWrittenTupleArgObject` shows that the note still holds so written.
   Every row line passes `ledger.py check --rows`, except NEW-B-1's placeholder number. REPORT.md sections 8 and 11 name the same items.
4. **A comment made false in a file outside the rung:** `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1501`, "the compile path gives it extends Object". The code beside it stays right, since it skips a size's bound whatever that bound is. The file is the code generator's, which the brief does not give the rung, so I left it for the gather. The same holds for the skill's `references/sources.md:383`.

## 4. Where I differ from the worker's account

- The worker says the flip fixes none of the rows it touches. It also fixes row 759 (finding 1).
- The worker's list of made-false sentences misses F-274, P-45, `compiler.md:80` and `OverloadSet.java:1501`.
- The worker lists the commands that the flip reaches as four. They are twelve (section 1).
- Otherwise I agree with the worker's decisions as written. These include `run_out_WIcontains`, NEW-B-1 at home 2 under a `Tuple`-named component, and the ladder subset of one file.

## 5. Verdict

Approved. The fix is the brief's one line. The stage reads the compile command's own switch, and the tests keep their values. With the two corrections, the record says what the flip changes, row 759's repair among it, and what it leaves.
