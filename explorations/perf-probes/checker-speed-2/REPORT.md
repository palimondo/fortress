<!-- Why the compiled checker takes so long over the one library's FortressLibrary component once row 680's
held repair is in (the count stage 953 s on an idle machine, past the 690 s that climb batch 15's record sets
for landing it), and a prototype fix that keeps every answer. For the curator; a prototype outside the batches,
as explorations/perf-probes/checker-speed/ was on 2026-10-10. Method: a base build of main at 473ab6a30 (code
that of 994dc944c) and a worktree seeded from it, row 680's line applied (impls/Decls.scala:414,
makeTryChecker(this) to makeTryChecker(newChecker)); JFR on the count stage's checker; instrumented copies of
StaticChecker.java (phase times), Decls.scala (declaration times) and TypeAnalyzer.scala (counts); every
variant compiled into a shadow folder put ahead of ProjectFortress/build on the classpath. The copies of the
two stage scripts that ran differ from the tracked ones only by that classpath prefix, a longer time limit and
a seconds line. fix.patch beside this note is the fix and its test, against 473ab6a30; it applies with
`git apply`. The worker's write of this file was refused by the harness; the text is the worker's. -->

# The checker's time over the library component: a walker the JVM never compiles

## 1. In short

- **The cause is the implementation, not a rule.** The Scala AST walker that ASTGen generates is one
  method. `Walker.walk` (`ProjectFortress/src/com/sun/fortress/scala_src/nodes/FortressAst.scala:1588-2023`)
  is a 216-case match: 213 node classes, then List, Option and anything else. It compiles to 31,704 bytes of
  bytecode.
  - HotSpot does not compile a method longer than its huge-method limit (8,000 bytes, while
    `DontCompileHugeMethods` is true, its default). So the method always runs in the interpreter.
  - Every type substitution, normalization, self-type removal and static-parameter clearing in the checker
    goes through it.
- **The fix.** `ScalaAstGenerator.java` emits the same cases in the same order, split into eight methods of
  30 cases each (`walkCases0` to `walkCases7`, the largest 4,474 bytes).
  - The regenerated `FortressAst.scala` differs only by the inserted method boundaries.
  - No switch.
- **Count stage, row 680's repair in, idle machine:**
  - 911 s before and 352 s after, a pair on the real build of the fix (F0, F1).
  - 953 s before (T1), against 332 s and 344 s for the two prototype splits (T2, T3).
  - The tables are equal, and so is the checker's whole output.
- **Distance stage, repair in:** 2,375 s before and 931 s after. FortressLibrary takes 1,336 s before and
  462 s after. `errors.tsv` and the output are identical.
- **Rung C and the repair do not explain the time:**
  - The repair's bodies add 267 s: Array3 past its crash, and the 257 declarations after it.
  - Rung C's normal form adds 109 s (12 %).
  - With both in, the split takes the stage from 935 s to 339 s.
- **Audit:** 279,692,861 walker branches, each checked against the branch the original single match takes:
  0 mismatches.
- **Test:** `WalkerJUTest`, in the misc track.
  - Its method-size test fails on the base: "Walker.walk is 31704 bytes of bytecode, more than 8000".
  - Its three tests of the walker's answers pass on the base and with the fix.

## 2. Where the time goes

### 2.1 The phases

From the instrumented run I5: repair in, no fix, idle, 935 s.

- **The apis, 293.8 s.**
  - FortressLibrary's overloading check: 208.0 s.
  - RangeInternals' overloading check: 61.3 s.
  - Everything else: under 7 s each.
- **The component, 620.1 s.**
  - Its typeCheck: 594.8 s.
  - Acyclicity: 12.4 s.
  - The two well-formedness passes: 5.9 s and 6.4 s.

### 2.2 The interpreted walker

**JFR sample counts.** JFR used default settings and stack depth 2048, on the instrumented run.

| window | samples | Walker.walk as top frame | inclusive | frame type |
|---|---|---|---|---|
| the apis | 14,641 | 11,207 (76.5 %) | 11,762 (80.3 %) | every one `[Interpreted]` |
| the component's typeCheck | 29,434 | 16,965 (57.6 %) | 17,562 (59.7 %) | every one `[Interpreted]` |

**Who calls it.** The outermost walker frames come from these callers:

| caller | in the apis | in the component |
|---|---|---|
| `STypesUtil`'s replacer | 21.4 % | 1.3 % |
| `TypeAnalyzer.removeSelf`, which `pExcInner` applies to both arguments (`TypeAnalyzer.scala:453`, `:533-546`) | 14.6 % | 4.4 % |
| `clearStaticParams`' `paramWalker` (`STypesUtil.scala:423-435`) | 11.8 % | 26.3 % |
| `TypeAnalyzerUtil.substitute` | 10.5 % | 2.5 % |
| `staticInstantiation`'s `staticReplacer` (`STypesUtil.scala:642`, `:681-691`) | 1.0 % | 21.2 % |

**Why a call is slow.**
- A node goes through every case before its own. `STraitType` is about the 130th case, and `SVarType` comes
  just after it.
- A String, Span, Boolean, Int, List or Option goes through all 213 class cases. The first 15 of those are
  stable-identifier patterns, each of which calls `equals`.
- Each case that matches runs an extractor, which converts every field with `scalaify`.

**How much.** In the fixed run the walker took 279.7M branches (§7). The fix saved 601 s (F0 to F1), about
2.1 µs per branch.

**The JVM switch is not enough.** `-XX:-DontCompileHugeMethods -XX:+PrintCompilation` shows why:
- C1 refuses the method: "COMPILE SKIPPED: out of virtual registers in LIR generator".
- C2 compiles it, but its code was thrown away by uncommon traps ("made not entrant: uncommon trap") at
  34.7 s, 115.4 s, 471.1 s and 707.6 s of a 728 s run. Each time the method runs interpreted until the next
  compile.
- Measured idle (I9), the switch gives 652 s against 935 s, and the same table.

**Other methods over the limit in the build** (a scan of `ProjectFortress/build` with `java.lang.classfile`):
- `Misc.checkExprMisc`, 12,893 bytes;
- `ExprDisambiguator.walk`, 8,518;
- `HygienicRenamer.walk`, 11,599;
- `NodeReader.readNode`, 14,026;
- the parsers' `pCharLiteralContent`, 23,717, three times.

After the fix they appear as the top frame in 9 of 14,819 samples.

### 2.3 What is asked again

These are counts from the audit run of the fixed checker (§7). The instrumented copy of `TypeAnalyzer`
counts calls, memo hits and distinct questions.

| | the apis | the component |
|---|---|---|
| analyzers made | 196,970 | 18,608 |
| `pSub` calls | 36.7M | 230.9M |
| of which `x = y` | 10.5M | 71.1M |
| of which answered by the table's ground memo | 24.5M | 158.6M |
| of which answered by an analyzer's memo | 0.60M | 0.41M |
| of which computed | 1.08M of 393K distinct | 0.79M of 599K distinct |
| `pExc` computed | 209K of 38K distinct | 115K of 71K distinct |
| `pNorm` calls | 111M | 753M |
| `normConjunct` calls | 29,644 of 5,644 distinct | 20,432 of 7,599 distinct |
| `dExc` calls | 167,846 of 15,207 distinct pairs | 112,420 of 15,832 distinct pairs |
| walker branches | 119.5M | 159.9M |

**What the profile shows after the fix.** JFR on the component's typeCheck:
- **Inclusive shares.**
  - `inferStaticParamsHelper`: 96.7 %.
  - `Formula.reduce`: 94.8 %, entered through `tSimplify` and `minTypes` (`Formula.scala:367-369`, `:459`).
  - `TypeAnalyzer.meet`: 94.7 %.
  - `normConjunct`: 94.9 %, nearly all at its pair test `x.exists(y => x.exists(z => dExc(y, z)))`
    (`TypeAnalyzer.scala:721`).
  - `pExc`: 86.7 %.
  - `checkCC`: 60.4 %.
  - `Formula.maximalCFormulas`: 85.7 %.
- **The fold.** `Formula.and` reduces after every step of its fold (`Formula.scala:178-186`). So each step
  re-simplifies every variable's bounds, which means a meet and a normalization.
- **Self time** is spread over hashing and equality of memo keys:
  - `Statics.anyHash`: 7.7 %;
  - `AbstractNode.hashCode`: 6.8 %;
  - `BoxesRunTime.equals2`: 6.2 %.
- **In the apis after the fix:** the overloading check holds 90.2 % of the samples, and `normConjunct` →
  `dExc` 80.9 %.

**In short:** few questions are computed again (1.3 to 1.6 computations per distinct question). Questions are
asked again on a vast scale, answered from memos, and the solver's reduction re-normalizes the same meets.

### 2.4 The declarations

Top-level declarations of the component, I5 (before) against I7 (after), both idle:

| declaration | before | after |
|---|---|---|
| Array3 (`:3023-3136`) | 60.4 s | 34.8 s |
| strToInt (`:4537-4550`) | 59.4 s | 40.4 s |
| QQ (`:577-660`) | 40.7 s | 12.6 s |
| String (`:4312-4442`) | 37.1 s | 11.3 s |
| Array2 (`:2631-2741`) | 33.8 s | 18.0 s |
| Matrix (`:2835-2914`) | 29.5 s | 12.8 s |
| strToFloat (`:4556-4561`) | 25.7 s | 9.9 s |
| Vector (`:2522-2535`) | 25.5 s | 15.8 s |

The costliest members:

| member | before | after |
|---|---|---|
| Array3's `asString` (`:3040-3065`, the local functions `row` and `plane` of row 680) | 34.7 s | 22.0 s |
| Array2's `asString` (`:2638-2655`) | 16.7 s | 10.4 s |
| Vector's `scale`, one line, `t v` with `v` unannotated (`:2530`) | 14.8 s | 9.9 s |
| Matrix's `mul` | 12.8 s | 3.8 s |
| ReadableArray1's `asString` | 9.3 s | 5.9 s |

strToInt gains least (×1.5). Its `SUM` with `d radix^(n-i)` is solver-bound, not walker-bound.

## 3. Rung C and the repair's bodies (item 2)

Each variant was taken out in the shadow. All runs are instrumented and idle.

| run | stage | apis | component | table |
|---|---|---|---|---|
| I5: repair in | 935 s | 293.8 s | 620.1 s | 39 / 38 / none |
| I4: rung C out | 826 s | 251.6 s | 554.3 s | 40 / 39, plus `:2623`, row 686's site, which rung C repaired |
| I6: repair out | 668 s | 298.5 s | 331 s, then the crash | 1 / 0, the crash at `:3059` |
| I7: the fix | 339 s | 68.0 s | 263.0 s | equal to I5 |
| I8: the fix, rung C out | 274 s | 60.9 s | 205.0 s | equal to I4 |
| I9: the JVM switch, no fix | 652 s | 92.0 s | 528.9 s | equal to I5 |

**The repair: +267 s.** In order of checking, the component has 229 declarations before Array3:

| run | the 229 before Array3 | Array3 | the 257 after Array3 |
|---|---|---|---|
| I6 (repair out) | 314.5 s | 16.0 s to the crash | not reached |
| I5 (repair in) | 310.0 s | 60.4 s | 224.2 s |
| I7 (repair in, the fix) | 122.3 s | 34.8 s | 101.7 s |

The bodies the repair lets the checker reach cost about what the rest costs per declaration. Array3's
`asString` is the component's costliest member.

**Rung C: +109 s before the fix, +65 s after it.**
- In the apis: FortressLibrary's overloading check takes 167.9 s with rung C out and 208.0 s with it in
  (+24 %).
- In the component's typeCheck: 528.4 s against 594.8 s.
- Rung C was not measured on the distance stage. Its +24 % on that api's check is of the order of the
  review's +22 % for the distance stage's FortressLibrary (batch 15's review, section 1): a lead, not a
  measurement.

**Neither explains the 953 s.** The interpreted walker does: with rung C and the repair both in, splitting
the walker takes the stage from 935 s to 339 s.

## 4. The fix

- **`ScalaAstGenerator.java:625-650`.**
  - `walk(node)` calls `walkCases0(node)`.
  - The class cases are emitted in their old order, 30 to a method.
  - Each method but the last ends with `case _ => walkCases<k+1>(node)`.
  - The last ends with the old List, Option and default cases.
- **`FortressAst.scala`.** The generator's output, regenerated by `ant compileAll`.
  - The unedited generator reproduces the tracked file byte for byte.
  - The edited one writes the patched file.
  - Every other generated file is identical once ASTGen's timestamp line is masked, as the build masks it.
- **Method sizes after the fix** (bytes): `walkCases0` 2,215; `walkCases1` 3,373; `walkCases2` 4,099;
  `walkCases3` 4,072; `walkCases4` 4,186; `walkCases5` 4,378; `walkCases6` 4,474; `walkCases7` under 1,000.
- **Size of the patch:** 40 lines changed in the generator and 37 lines inserted in the generated file. The
  test file is new.
- **No switch.**

## 5. Why every answer stays (item 4)

The fix reads no rule differently, so the specification and the papers are not concerned.

A Scala `match` tries its cases in order and takes the first that matches. The split keeps every case, its
pattern and its body text unchanged, and in the same order.
- A value that matches none of a method's cases goes to the next method's first case. That case is the one
  that followed in the old single match.
- The last method keeps the old List, Option and default cases, in their order.
- So for every value the same case is chosen and the same code runs.
- The case bodies call `walk`, which a subclass may override, exactly as before. `walk`'s signature is
  unchanged.

The patch only inserts method boundaries between unchanged case lines. The audit (§7) checked this on every
branch of a full run.

## 6. Measurements

**Machine:** nproc=4; Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz; openjdk 25.0.4.1; `FORTRESS_THREADS=1`.
Nothing else of mine ran beside a timed run. A sampler recorded the load every minute, and the java process
count was 1 throughout. Two runs had brief light work of mine beside them: niced JFR reading during T1 and
scalac compiles during I5. Their highest 1-minute load was 1.79 and 1.95.

| run | start UTC | load at start | seconds | what |
|---|---|---|---|---|
| T1 | 19:48:54 | 0.91 | 953 | count stage, repair in (stock stage, limit raised) |
| T2 | 20:04:47 | 1.04 | 332 | plus a split testing `Node` first (variant C, not taken) |
| T3 | 20:10:19 | 1.22 | 344 | plus the split in order (first form of the patch) |
| I5 | 20:16:40 | 0.89 | 935 | instrumented, repair in |
| I4 | 20:32:15 | 1.04 | 826 | rung C out |
| I6 | 20:46:01 | 1.07 | 668 | repair out |
| I7 | 20:57:09 | 1.07 | 339 | the fix |
| I8 | 21:02:48 | 1.09 | 274 | the fix, rung C out |
| I9 | 21:07:22 | 1.03 | 652 | `-XX:-DontCompileHugeMethods`, no fix |
| D1 | 21:18:23 | 1.62 | 2,375 | distance stage, repair in (FortressLibrary 1,336, RangeInternals 762) |
| D2 | 21:58:01 | 1.03 | 931 | distance stage, repair and fix (FortressLibrary 462, RangeInternals 381) |
| F0 | 22:45:39 | 1.53 | 911 | final build, old walker first on the classpath, repair in a shadow |
| F1 | 23:00:50 | 1.02 | 352 | final build (the fix), repair in a shadow |

**Answers, run against run.**
- **The count stage's table:** T1, T2, T3, I5, I7, I9, F0 and F1 give
  `#total 39`, `#locations 38`, `#crash none`, every api 0. That equals the cited idle run of 2026-10-14
  (`diff` prints nothing).
- **The checker's whole output:** T1 = T2 = F0 = F1, after masking the tree's path.
- **The distance stage:** D1 and D2 tables are equal but for `#seconds` and `#machine`. `errors.tsv` is
  identical (49 errors), and so is the whole output.
- **The repair on the distance stage:** D1 equals climb batch 15's landed `distance.txt` but for its crash
  row. With the repair in, the crash row goes (`#crash none`) and no site comes.

## 7. The audit

The audit variant of the walker checks, at every branch it takes, the index of that branch against the index
the original single match takes. The original's index is recomputed by its own tests in its order: equality
for the 15 stable identifiers, then the class tests, then List, Option, default.

    @@AUDIT walk branches taken=279692861 mismatches=0 distinct-branches=90 of 216

The audited run's table reads 38 / 37: row 488's `:130` is missing. The counting copies hash AST nodes. That
changes the JVM's identity-hash sequence, and with it the api order (§9). The JFR run (prof1) lost `:130` the
same way. Neither run's walker is the patch's.

## 8. The tests

`ProjectFortress/src/com/sun/fortress/scala_src/nodes/WalkerJUTest.java` is in the misc track and has four
tests:

- `testEveryMethodCompilable`: every method of `Walker` is at most 8,000 bytes of bytecode, read with
  `java.lang.classfile`.
- `testIdentityWalkRebuildsNodes`: walked types are equal to the original and are new objects.
- `testOtherValuesComeBackAsTheyAre`: a String, a Span, an Integer, a `KindOp` node, None and Nil come back as
  the same objects.
- `testOverrideReachesNestedNodes`: an override reaches type variables nested in static arguments, tuples,
  arrows, intersections, unions, Options and Lists.

**The runs.**
- On the base build's classes (2026-10-14 22:15 UTC):

      java -cp <test classes>:<base build classpath> junit.textui.TestRunner com.sun.fortress.scala_src.nodes.WalkerJUTest
      .F...
      1) testEveryMethodCompilable(...)junit.framework.AssertionFailedError: Walker.walk is 31704 bytes of bytecode, more than 8000
      Tests run: 4,  Failures: 1,  Errors: 0

- With the fix built: `ant testOnly -DtestPattern=WalkerJUTest` gives "Tests run: 4, Failures: 0, Errors: 0",
  BUILD SUCCESSFUL.
- The test was written after the shadow prototypes, as a probe's is. Its failing run is on the base build.
- It is in Java because scalac 2.13 cannot read `java.lang.classfile`: "illegal cyclic reference involving
  class CodeImpl".

**The suites, with the fix built and without the repair:**
- `ant testQuick`:
  - compiler 1,212, library 86, othercompiler 263, all with 0 failures;
  - BUILD SUCCESSFUL, 4 min 34 s.
- `ant testFast`:
  - 1,988 tests, 0 failures, BUILD SUCCESSFUL, 5 min 0 s;
  - misc track: 427 tests, the landed gate's 423 plus these 4.
- `ant testSystem`:
  - 149 + 150 + 161 + 161 = 621 tests, 0 failures;
  - 2 min 16 s.

The counts equal climb batch 15's gate. The walker is shared by both paths' phases (the disambiguator, the
desugarers), hence `testSystem`.

## 9. Row 488: the checker's output depends on identity hashes

Every ASTGen node's `generateHashCode` starts from `getClass().hashCode()`, the `Class` object's identity
hash (for example `ProjectFortress/src/com/sun/fortress/nodes/TraitType.java:104`; 936 node classes do this).

So the order of every `HashMap` and `HashSet` of nodes depends on the JVM's identity-hash sequence. That
includes the apis that `StaticChecker.checkApis` iterates (`StaticChecker.java:125`). The sequence moves
whenever any code asks for an identity hash at a different moment.

**The runs.** The fixed checker ran with a copy of the stage's driver that first asks for N identity hashes
(`-Dprobe.hashes=N`):

| run | N | api check order | table | output |
|---|---|---|---|---|
| H0 | 0 | the usual one | 39 / 38 | identical to T1's |
| H1 | 1 | wholly different, starting RangeInternals, FortressLibrary, NativeArray | 39 / 38 | three messages print a union's members the other way |
| H2 | 1000 | another order | 39 / 38 | one message differs the same way |

The messages that changed in H1:
- `:1463`: `OR(O0,I0)` became `OR(I0,O0)`.
- `:3367`: `OR(T,IntLiteral)` became `OR(IntLiteral,T)`.
- `:3384`: `OR(T,IntLiteral)` became `OR(IntLiteral,T)`.

The two instrumented runs that hash nodes or add threads (JFR, the counts) lost `:130`.

This is a lead for row 488's "mechanism unknown". The fix asks for no identity hash, which is why its outputs
are identical.

## 10. What a landing would carry (item 5)

- **`fix.patch`, applied and built with `ant compileAll`.** The build regenerates `FortressAst.scala` from the
  generator and reproduces the patch's file, so the two stay in step.
- **`WalkerJUTest`.** Its failing and passing runs are in §8.
- **No switch.**
- **With row 680's line in the same tree**, the count stage takes 352 s idle (F1), with the table above: 39
  errors, 38 locations, no crash.
  - About 447 s with the 27 % allowance for load, inside the 690 s of `CLIMB-BATCH-15.md:154`.
  - The repair's own landing promotes `XXXLocalFunctionSiblingInLoop` and `XXXLocalFunctionSiblingCall` and
    re-keys the recursive case to 'reference cycle', as `e75bb538b` says.
- **The distance stage** with both: 931 s and 49 errors, the crash row gone.
- **The gate.** The fix touches a walker that both paths' phases use, so its suites are the whole gate.
  - My `testFast` and `testSystem` runs were on the fix alone.
  - The repair adds its three test changes.

## 11. Decisions, findings, questions

**Decisions.** No decision of the curator covers 1 to 6.

1. **The split in order (variant B).** Rejected:
   - variant C, which tests `Node` first and skips 213 tests for leaves: 332 s against B's 344 s, one run
     each, within noise; its exactness needs a proof (every node class implements `Node`);
   - the JVM switch alone: 652 s, and a switch every JVM would need;
   - a class-keyed dispatch.
2. **30 cases per method.** The largest method is 4,474 bytes, against the limit of 8,000.
3. **The patch changes the generator and the file it writes, not the file alone.** A build would otherwise
   regenerate the old walker the next time `Fortress.ast` or a generator changes.
4. **An audit by branch index, not by memo hits.** The fix adds no memo.
5. **The test is in Java**, because of the scalac 2.13 limit (§8).
6. **The brief's "distance stage is `tools/count-run/`" read as `tools/distance/run.sh`.** `count-run.sh`
   runs each interpreter test under walk.

**Findings.**
- The interpreted walker (§2.2).
- The shares of the repair (+267 s) and of rung C (+109 s before the fix, +65 s after) (§3).
- After the fix, about 95 % of the component's time is in the solver's re-normalization of meets (§2.3).
- The checker's output depends on identity hashes (§9).
- The repair removes the distance stage's crash row and adds no site (§6).
- The other methods over the limit are negligible after the fix (§2.2).

**Defects.**
- **The interpreted walker.** My change repairs it (way 1), pinned by `WalkerJUTest`. No ledger row holds it;
  the row to write:
  - claim: the generated `Walker.walk` (`FortressAst.scala`, from `ScalaAstGenerator.java`) is 31,704 bytes
    of bytecode, past HotSpot's 8,000-byte huge-method limit, so the JVM never compiles it, and every phase
    that walks a tree runs it in the interpreter;
  - status: NEGATIVE-VERIFIED, closed by the fix's commit;
  - class: implementation gap (generator, speed);
  - spec: silent;
  - reproducer: `WalkerJUTest.testEveryMethodCompilable`;
  - found by: this probe.
- **The identity-hash dependence.** A note for row 488, with the H runs' commands and outputs (§9).

**Sentences of the specification made false:** none.

**For FACTS.**
1. **The fact.** The generated AST walker's `walk` was one method over HotSpot's 8,000-byte limit, so it ran
   interpreted. With it split in order, the count stage with row 680's repair takes 352 s instead of 911 s,
   and the distance stage 931 s instead of 2,375 s, with identical output.
   - What it means: row 680's line can land under the 690 s rule.
   - Test: `WalkerJUTest.testEveryMethodCompilable`.
   - Detail: §2.2 and §6.
2. **The fact.** The checker's output depends on the JVM's identity-hash sequence, because AST hashes include
   the `Class` identity hash. One extra identity hash at start reorders the api checks and the members of
   unions in messages.
   - What it means: the stages' outputs can move with an unrelated edit (row 488).
   - Command: the driver with `-Dprobe.hashes=1`.
   - Detail: §9.
3. **The fact.** Rung C's normal form costs 12 % of the count stage before the fix, 19 % after.
   - Detail: §3.

**Questions for the curator (decisions not taken).**
- Q1: land the walker split as its own rung ahead of row 680's line, or in the same rung?
- Q2: pursue the solver's re-normalization of meets (§2.3), about 95 % of what remains?
  - Ways: a memo of normalized meets shared across analyzers; fewer reductions in `Formula.and`'s fold.
- Q3: make AST hashing independent of identity hashes (row 488)? That would change iteration orders, and so
  message text, once.

**Commands worked out.**
- **JFR, read without the text dump.** A single-file Java program over `jdk.jfr.consumer.RecordingFile`
  aggregates `jdk.ExecutionSample` within an epoch window, by self, inclusive, callers or callees. A frame's
  `getType()` (Interpreted, JIT compiled, Inlined) shows which methods the JVM never compiled.
- **Methods over the limit:** a `java.lang.classfile` scan of `ProjectFortress/build` for `Code` attributes
  longer than 8,000 bytes.
- **The AST generators by hand, in scratch:**
  1. `javac -cp <scala jars>:ProjectFortress/build:ProjectFortress/third_party/astgen/astgen.jar -d <dir>/build ProjectFortress/src/com/sun/fortress/astgen/*.java`.
  2. Copy `Fortress.ast` into `<dir>/astgen`.
  3. From there, `java -cp <dir>/build:<scala jars>:ProjectFortress/build:astgen.jar edu.rice.cs.astgen.ASTGen Fortress.ast`. The `.ast` file's `customClassPath ../build` finds the generators.
- **A huge method's compile attempts:** `-XX:-DontCompileHugeMethods -XX:+PrintCompilation`.
- **Moving the identity-hash sequence:** a driver copy that calls `new Object().hashCode()` N times before
  the phases.
