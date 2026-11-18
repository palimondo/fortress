<!-- The skeptic's review of climb batch 33b's rung W (rung-closure-name-once): what was checked, the programs and their output, the corrections, and the verdict. -->
# Skeptic: rung W, one class name for each function expression where two share a span (row 315)

Head judged: `f7c822ef9d` (the worker's last commit). Head after: the commit that adds this file. One launch of the skeptic worked the rung. The branch already held `REPORT.md` and `record.md` (`5e622ae6af`), so the journal step wrote nothing. My commits, in order:

| Commit | Kind | What |
|---|---|---|
| `9b8bdb53c0` | correction (citation) | `REPORT.md` and `record.md` cited `PROBES.md:110` for row 315's paragraph, which is at `:113`, and `subscripting.tex:86-88` for the sugar sentence, which is at `:90-91` |
| `e9ba4a5eae` | correction (test) | the selector test holds a second site of the defect, a binding `if` whose else part is a reduction, and the record says so |
| `c5eaf263c8` | correction (tests, rows) | a third site of the defect, an arrow coercion's function expression around a function expression argument, as a plain compiled test; two gaps measured beside it, neither the rung's, each an `XXX` test and a row (rows 1083 and 1084) |

No fix of mine changes code; none is contested.

## 1. What I checked

1. **The stages.** The section runs neither stage (STAGE_BLIND). `git diff --name-only c799851472...HEAD` lists two paths outside the blind folders, `compiler/NamingCzar.java` and `compiler/codegen/CodeGen.java`: both are code generator only. The distance stage's driver stops at `TYPECHECK` (`explorations/coordinator/tools/distance/DistanceMulti.java:41-43`), the count stage runs the checker, and `gensymArrowClassName` has its two calls in `CodeGen` only, so neither stage reads the edit; climb batch 27 ran its code generator rungs so (`explorations/coordinator/CLIMB-BATCH-27.md:500`). No stage's `nohup` call is in the transcript.
2. **Test first**, in the worker's transcript (`agent-a49f11cb6bf8c7164.jsonl`): the selector pair written at 03:16:20 (call `1SrY3J`), seen failing on the old code 03:16:34-37 (`Qp48rK`, 'duplicate entry: OneLibraryConditionalReduction$\=fn@6\!56-79.class', 'Tests run: 2,  Failures: 1'); the prelude test written at 03:20:47 (`zt9cxR`), failing 03:20:54-58 (`5JrLHZ`, 'duplicate entry: ConditionalReductionCompiled$\=fn@7\!36-50.class', 'Tests run: 2,  Failures: 2'); the edit at 03:21:44 (`UXGb18`, one Python edit of the two files, the committed diff), first built at 03:21:51 (`aHGBeo`, 'BUILD SUCCESSFUL', 'Total time: 38 seconds'). No edit of code after it. `ant testFast` started 03:26:16 (`r8zJMW`), after the commit of the code at 03:26:06: 'BUILD SUCCESSFUL', 'Total time: 9 minutes 38 seconds', compiler 'Tests run: 1738, Failures: 0, Errors: 0', onelibrary 'Tests run: 5, Failures: 0'. The generic trait case, added at 03:37:40 (`c1Hqd1`), ran on the old code in the same call (red, the same first duplicate) and passed at 03:37:51 (`LMJXs6`, '. run ProjectFortress/compiler_tests/ConditionalReductionCompiled (523ms) PASS', 'OK (2 tests)'). The report's recordedFailure and recordedPass lines are those of these logs.
3. **The diff**, line by line. `gensymArrowClassName(desc, sp, taken)` adds the plain name to `taken` and, while the add fails, tries `name#k` from 2; `taken` is a `HashSet` only added to. Both `CodeGen` constructors set the field: the component's makes it (`CodeGen.java:423`), the nested one copies it (`:400`); `CodeGenerationPhase.java:195` makes one component `CodeGen` per component, the only `new CodeGen(Component, ...)`. The two callers pass it (`:3954-3955`, `:4110-4111`). The class is written by `ByteCodeWriter.writeJarredFile` (`runtimeSystem/ByteCodeWriter.java:31-43`), which dedups nothing, so a node compiled twice died before; no `catch` in `CodeGen` retries a compile (`:3296`, `:8529`, `:8532` rethrow). So no name of a program that compiled before can change, which my programs confirm (section 3, P2). The edit is as small as W1 states it (`CLIMB-BATCH-33.md`, fork W1): the first keeps today's name, a later one an ordinal in the order met.
4. **The library's way.** The per-component set shared by nested code generators follows `numeralCoercionSites` and `localFunctionNames` (`CodeGen.java:299-303`, `:410`, `:424`, `:4249-4251`). No name of `NamingCzar` but this one is made from a span. `#` is parsed in no name: `grep -rn "'#'\|\"#\"" ProjectFortress/src/com/sun/fortress` prints the parsers, `ErrorMsgMaker.java:396`, `Printer.java:38` and two commented lines of `TypeDisambiguator.java`, and no `indexOf('#')` or `split("#")`.
5. **The tests.** Each file holds one comment line; the names are by topic; no message cites the specification. The tests exercise the defect: both fail on the base's code at the shared span.
6. **My programs** (section 3).
7. **The homes.** Row 315: home 1, the rung's tests, now with two more of its sites (section 4). Row 1062: home 2, `XXXOneLibraryRunConditionalReduction.test`. Two defects my programs measured: home 2 each, an `XXX` test and a row (section 4).
8. **The ledger and the sibling sites.** `ledger-find` on 'duplicate entry', 'closure class', 'gensym*', 'thunk*', 'conditional operator*', 'arrow coerc*' and 'CoercionDesugarer*' names rows 315, 565, 790 (other causes, as the report says), 145, 395 and 507; none holds walk's arrow coercion or the coerced thunk. The tree's other makers of a function expression at an existing node's span: `PreDisambiguationDesugaringVisitor.java:302` (the thunks of `:330`, `:333` and `:380`), `DesugarerUtil.java:127`, `:194`, `:331`, `:388`, and `CoercionDesugarer.scala:184`. Of these, `:380` (a binding `if`'s else part) and `CoercionDesugarer.scala:184` (an arrow coercion) put a second function expression at a span, on the base's code; the rung's repair covers both, which its tests did not hold. Walk names no class.
9. **The report.** Its five provenance lines, opened: the problem line cited `PROBES.md:110`, the varargs probe's first test (row 315's paragraph is `:113`), and the spec line `subscripting.tex:86-88`, a blank line and the definition of a conditional operator (the sugar sentence is `:90-91`); corrected in `9b8bdb53c0`, with `REPORT.md` section 6 and `record.md`'s finding 3 and Revival change. The precedent, deviation and historical lines say what their lines hold (`a874948ac`: `NamingCzar.java:838-840`, `CodeGen.java:3448`). The specification greps of sections 0 and 10 print nothing; no sentence of the specification is made false. The whole-suite run is `testFast` on `17f3e7b17b`'s code, which the head's code equals. `record.md`'s FACTS entry, notes, row 315's close and row 1062's line are true as written; I added to them (section 4).
10. **Competing declarations.** `closureClassNames`, `ADDLAZY`, `StringBag`, `ConditionalReductionCompiled`, `OneLibraryConditionalReduction`, and mine (`callWide`, `callThunk`, `ADDWIDE`, `orSum`, `ArrowCoercionFnExprCompiled`, `XXXArrowCoercionThunk`, `XXXArrowCoercionFnArgument`): `git grep -w` over `ProjectFortress` and `Library` finds each only in its own files. No branch of N, G or R adds a file of these names, and `git merge-tree` of N, W, G and R in the gather's order is clean.
11. **The failure mode.** The rung turns 'ZipException: duplicate entry' at compile into a compiled program. Every value my programs print compiled equals walk's or the specification's (section 3). One form goes from a loud compile failure to a loud run-time failure, the coerced thunk of row 1084, a defect of the base's code that the duplicate hid. No quiet value.

## 2. Where I differ from the report

- Section 5 names the binding `if`'s else part as another site "by reading ... not run". Run, it is one: on the base's code 'duplicate entry: SkSharedOne$\=fn@5\!64-78.class' (parenthesized) and 'duplicate entry: SkElseBare$\=fn@5\!64-81.class' (bare). The rung names both apart.
- Section 5's precedent search counts "0 other sites of the defect", of names made from a span, which holds; the defect's other desugarings were not counted. The arrow coercion's wrapper is one, the row's first family (its citation is "Coercion Invocations"; `fortress-gap-ledger-history.md`, row 315).
- The decisions stand as the worker states them.

## 3. My programs

All under the rung's `tmp/rung-closure-name-once/skeptic/`, run with the setup lines and `nice -n 19`. The old code: `/home/user/fortress-base38/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base38 <K>/old-caches compile P.fss`, then `... run P`; walk `... <K>/old-walk-caches P.fss`; under the selector with `FORTRESS_LIBRARY=one` and `<K>/old-caches-one`. The new code: `FORTRESS_CACHES=<K>/new-caches bin/fortress compile P.fss`, then `run P`; walk with `<K>/new-walk-caches`; the selector with `<K>/new-caches-one`, a copy of the tree's `caches-one`. `FORTRESS_THREADS=1`, and 4 where said.

| program | what it holds | walk, old and new | compiled, old | compiled, new |
|---|---|---|---|---|
| P1 `SkShared` (prelude) | `n ADDLAZY: (SUM ...)` in a top-level variable, nested twice, in two local functions, an object's dotted and functional methods, a generic trait's method at two instances | `topv=6`, `nested(4)=14`, `twice(4)=14`, `viaLocal(4)=26`, `sumTo=14`, `weigh=9`, `IntBag=10`, `StrBag=6` | 'duplicate entry: SkShared$\=fn@7\!26-40.class', exit 1 | the same eight values, at 1 and at 4 threads; walk at 4 threads the same |
| P2 `SkNames` (prelude) | function expressions, nested, a generic local function, a group of two local functions, two reductions, `AND:`, none sharing a span | `inc=6`, `compose=10`, `keep=k`, `sums=10`, `flags=T`, `isEv=T` | the same | the same; the jars of old and new: 'names equal: True; entries whose bytes differ: 0' (16 entries) |
| P2b the team's `LocalFunctionGenericContextCompiled` (copied) | local functions in generic contexts | | `PASS` | `PASS`; 'names equal: True; entries whose bytes differ: 0' (26 entries) |
| P3 `SkSharedOne` (selector) | `if x <- m then x else (SUM[i <- 0#n] i) end`; `AND:` of `OR:` of `BIG OR` and `BIG AND`; a local function so | `pickJust=3`, `pickNothing=6`, `both=true`, `deep=false`, `local=true` | 'duplicate entry: SkSharedOne$\=fn@5\!64-78.class', exit 1 | compiles; the jar holds `fn@5:64-78` and `fn@5:64-78#2` |
| P4 `SkElseBare` (selector) | `if x <- m then x else SUM[i <- 0#n] i end` | `orSumNothing=6`, `orSumJust=3` | 'duplicate entry: SkElseBare$\=fn@5\!64-81.class' | compiles: `fn@5:64-81`, `fn@5:64-81#2` |
| P5 `SkArrowCoerce` (prelude) | `callWide(fn (y: ZZ32): ZZ32 => y + 1, 4)` for `callWide(f: ZZ32 -> ZZ64, x: ZZ32): ZZ64 = f(x)` | 'Unification error: Closure/Constructor for callWide param 1 (f:ZZ32->ZZ64) got arg FnExpr ... ZZ32->ZZ32' | 'duplicate entry: SkArrowCoerce$\=fn@8\!22-50.class' | `callWide=5`: `fn@8:22-50` (the coercion's wrapper, met first) and `fn@8:22-50#2` |
| P6 `SkArrowNamed` (prelude) | `callWide(inc, 4)`, `inc(y: ZZ32): ZZ32` | 'Unification error: ... got arg inc(y:FortressLibrary.ZZ32):FortressLibrary.ZZ32 ZZ32->ZZ32' | `callWideNamed=5` | `callWideNamed=5` |
| P7 `SkThunkCoerce` (prelude) | `callThunk(seven)`, `callThunk(h: () -> ZZ64): ZZ64 = h()`, `seven(): ZZ32 = 7` | 'Unification error: ... (h:()->ZZ64) got arg seven():FortressLibrary.ZZ32 ()->ZZ32' | compiles; run: 'Caused by: java.lang.NoClassDefFoundError: SkThunkCoerce$CoercionDesugarer#0', 'at SkThunkCoerce$\=fn@10\!23-26.apply(...SkThunkCoerce.fss:5)' | the same |
| P8 `SkThree` (prelude) | `m ADDWIDE: (SUM[i <- 0#n] i)`, `opr ADDWIDE(a: ZZ64, b: () -> ZZ64)` | `total=10` | 'duplicate entry: SkThree$\=fn@9\!45-65.class' | compiles: `fn@9:45-65`, `#2`, `#3`; run: 'NoClassDefFoundError: SkThree$CoercionDesugarer#0' (P7's defect) |

A first `SkNames` named its local functions `even` and `odd`, which walk refused ('Local function even is already declared.'), and a first P5 and P6 named the helper `widen`, which overloaded the library's functional `widen` under walk; both renamed before the rows above.

What they show: the names of a program that compiled before do not change, by name and by byte (P2, P2b); the rung names apart every pair and the one triple my programs made, in every context of P1, under both libraries; the compiled values equal walk's, also at four threads; the binding `if` and the arrow coercion are two more sites of the defect (P3, P4, P5); walk does not apply an arrow coercion (P5 to P7), and the compiled path's arrow coercion to a type of no parameters dies at run time on both codes (P7, P8).

## 4. The corrections, with their tests

**`e9ba4a5eae`, the binding `if`'s else part.** Finding: P3 and P4; the rung's selector test did not hold the site. The case, first in `one_library_tests/OneLibraryConditionalReduction.fss`: `orSum(m: Maybe[\ZZ32\], n: ZZ32): ZZ32 = if x <- m then x else SUM[i <- 0#n] i end`, with `assert(orSum(Nothing[\ZZ32\], 4) = 6, ...)` (the one library's two-value `assert` is varargs, `Library/FortressLibrary.fsi:247`, so it uses the flag's). Settled by the section's mission, "You give each function expression a name of its own", and its point, row 315's test under the selector.

- Failing on the base's code, 04:40:50Z: `cd ProjectFortress && FORTRESS_LIBRARY=one old-fortress.sh /home/user/fortress-base38 <K>/old-caches-one junit <tree>/ProjectFortress/one_library_tests/OneLibraryConditionalReduction.test <tree>/ProjectFortress/one_library_tests/XXXOneLibraryRunConditionalReduction.test`:

      java.lang.RuntimeException: java.util.zip.ZipException: duplicate entry: OneLibraryConditionalReduction$\=fn@6\!64-81.class
      Saw expected failure (Exit code != 0)
      Tests run: 2,  Failures: 1,  Errors: 0

- Passing on the head, 04:40:54Z: `FORTRESS_LIBRARY=one FORTRESS_CACHES=<K>/new-caches-one ../bin/fortress junit one_library_tests/OneLibraryConditionalReduction.test one_library_tests/XXXOneLibraryRunConditionalReduction.test`:

      . compile one_library_tests/OneLibraryConditionalReduction  OK (time = 3380ms)
      Saw expected failure (Exit code != 0)
      OK (2 tests)

  Under walk, a copy of the program: 'REACHED', 'PASS'.

**`c5eaf263c8`, the arrow coercion.** Finding: P5, the third site, and P5 to P8, two gaps beside it. Settled by `Specification/basic/conversions-coercions.tex`, section "Coercions for Tuple and Arrow Types": a coercion from `A -> B` to `D -> E` where `D` is substitutable for `A` and `B` for `E`, "invoked by wrapping the argument function of the coercion in a function expression", and by `tests-writing.md`, "How a defect is recorded", for the two gaps.

- `compiler_tests/ArrowCoercionFnExprCompiled.fss` and `.test` (home 1 of row 315), failing on the base's code, 04:46:18Z, `old-fortress.sh ... <K>/old-caches junit <tree>/ProjectFortress/compiler_tests/ArrowCoercionFnExprCompiled.test`:

      java.lang.RuntimeException: java.util.zip.ZipException: duplicate entry: ArrowCoercionFnExprCompiled$\=fn@8\!19-47.class
      Tests run: 2,  Failures: 2,  Errors: 0

  passing, 04:50:26Z, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh sknew ProjectFortress/compiler_tests ConditionalReductionCompiled.test ArrowCoercionFnExprCompiled.test ArrowCoercionThunkLink.test XXXArrowCoercionThunk.test`:

      . run ProjectFortress/compiler_tests/ConditionalReductionCompiled (799ms) PASS
      . run ProjectFortress/compiler_tests/ArrowCoercionFnExprCompiled (460ms) PASS
      . run ProjectFortress/compiler_tests/XXXArrowCoercionThunk (565ms) REACHED
      Saw expected failure (Exit code != 0)
      OK (6 tests)

- `tests/XXXArrowCoercionFnArgument.fss` (home 2, row 1083: walk converts no function argument by an arrow coercion; F-128 lists it as not converted by walk's code, not measured). Through `harness-one.sh`, on the base's code (`FORTRESS_HOME=/home/user/fortress-base38 .../harness-one.sh <K>/h-old <tree>/ProjectFortress/tests/XXXArrowCoercionFnArgument.fss`, 04:46:25Z) and on the head (04:46:33Z): ' OK Saw expected exception', 'OK (1 test)'. Red on a deliberate change, `inc(y: ZZ32): ZZ64 = y.asZZ64 + 1`, 04:46:50Z, then restored (`diff` printed nothing): ' Missing expected failure', 'Tests run: 1,  Failures: 1,  Errors: 0'.
- `compiler_tests/XXXArrowCoercionThunk.fss` with `ArrowCoercionThunkLink.test` and `XXXArrowCoercionThunk.test` (home 2, row 1084: an arrow coercion to a type of no parameters dies when called). Its `total` is P8's triple. On the base's code, 04:50:21Z, `old-fortress.sh ... junit .../ArrowCoercionThunkLink.test .../XXXArrowCoercionThunk.test`: the link 'duplicate entry: XXXArrowCoercionThunk$\=fn@11\!45-59.class', ' OK Saw expected exception' (an `XXX` component), and the run red, 'Failed to satisfy run_out_contains; expected REACHED'. On the head, the run above: 'REACHED', 'Caused by: java.lang.NoClassDefFoundError: XXXArrowCoercionThunk$CoercionDesugarer#1', 'Saw expected failure'. Once row 1084 is repaired it runs the triple's names.

`record.md` gets findings 8 to 11, the FACTS entry's two sentences and the arrow test, a correction of F-128, row 315's close note, and rows 1083 and 1084 in the row template (`ledger.py check --rows`, a placeholder number: '1 rows, 0 fail the template', each).

The suites: my commits change tests and the record, no code, so no suite. The gate's counts move: compiler track +4 cases (`ArrowCoercionFnExprCompiled` 2, `ArrowCoercionThunkLink` 1, `XXXArrowCoercionThunk` 1), testSystem +1 (`XXXArrowCoercionFnArgument`), onelibrary none. The report's tables are those of the worker's head; no stage ran on mine.

## 5. Contested fixes

None.

## 6. Points to report

- The rung's four points, as the worker lists them, hold; the third now holds two more cases (a binding `if`'s else part under the selector; an arrow coercion's wrapper under the prelude).
- A file beyond those named: mine are tests only, `compiler_tests/ArrowCoercionFnExprCompiled.fss`, `.test`, `compiler_tests/XXXArrowCoercionThunk.fss`, `ArrowCoercionThunkLink.test`, `XXXArrowCoercionThunk.test` and `tests/XXXArrowCoercionFnArgument.fss`, beside the selector's track, and two new rows in `record.md`.
- Reserved: a model line, none (the diff lists no file of the model, which runs under walk only, whose code the diff does not touch); a class name that a test or a tool reads, none changes: P2 and P2b's jars are equal by name and byte on the old and the new code, and no test or tool reads `fn@` (`grep -rln 'fn@' ProjectFortress/*tests* ProjectFortress/tests explorations/coordinator/tools bin` prints nothing).

## 7. Verdict

Approved. The change is right and as small as fork W1 states it; the record is honest, with two citations corrected; with my corrections the rung's tests hold the three desugarings that put two function expressions at one span, and the two arrow coercion gaps measured beside them have their homes.
