<!-- Climb batch 24's gather record: the rungs F, K, Z, S, W, G and H applied on main in that order, their commits, the rows opened and closed, the merged tree's tests, the points to report, the items for the curator and where each is in PLAN.md, and each rung's revival change for the skill writer. -->

# Climb batch 24: the gather's record

Written at the gather stage of climb batch 24 (2026-10-31), the batch of `explorations/coordinator/CLIMB-BATCH-24.md`, phase 4's second batch, the natives' next families (P-58) with the code generator's header `where` clauses (P-151), on `main` from the base `b0f6cd6b7460389333cb7ad1b050b736f8f68e6e`. All seven rungs were approved by their skeptics, with no contested fix and no ruling; none had a repair round. Nothing was merged: each branch stays as it is, `wip/rung-natives-float` at `a42315ae4`, `wip/rung-natives-integers` at `99dce35d9`, `wip/rung-natives-small` at `aea0817b7`, `wip/rung-natives-choose` at `ad7f91f6f`, `wip/rung-natives-self` at `4b4edfd19`, `wip/rung-codegen-where` at `6fa0a2a54`, `wip/rung-natives-hard` at `696a79095`.

**Preconditions.** `git status --porcelain` printed nothing, and `b0f6cd6b7` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0; `HEAD` was the base itself).

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff b0f6cd6b7460389333cb7ad1b050b736f8f68e6e...<branch>`. The rung commits were composed on `main` itself, each patch applied with `git apply --3way --index`, its record folded and its commit made before the next. For the merged-tree tests the gather seeded a tree outside the main tree from the batch's base build: `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base23 /home/user/fortress-gather24 - b0f6cd6b7460389333cb7ad1b050b736f8f68e6e` ('seeded from /home/user/fortress-base23 (1f5c49b4f) in 3 s'; the base build's `Library/`, `ProjectFortress/`, `Specification/` and `SpecData/` equal the base's, `git diff --stat 1f5c49b4f b0f6cd6b7` over them printing nothing). There the seven patches were applied in the order below with `git apply --3way --index`, with no conflict; the tree was built (`ant compileAll`: 'Caches /home/user/fortress-gather24/default_repository/caches started again, empty', 'BUILD SUCCESSFUL') and the library order run ('rc LibraryBuiltin/AnyType.fss 0' ... 'rc ../Library/CompilerSystem.fss 0', the five jars in `bytecode_cache/`). After the rung commits, `cmp` and `diff -rq` of `Library/`, `ProjectFortress/src`, `ProjectFortress/tests` and `ProjectFortress/compiler_tests` between `main` and the gather tree print nothing, so the merged-tree tests below are `main`'s code at `b71495ca4`.

## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | F, `rung-natives-float` | `wip/rung-natives-float` at `a42315ae4` | `5ecb7a841` |
| 2 | K, `rung-natives-choose` | `wip/rung-natives-choose` at `ad7f91f6f` | `71249bf55` |
| 3 | Z, `rung-natives-integers` | `wip/rung-natives-integers` at `99dce35d9` | `3308aad55` |
| 4 | S, `rung-natives-small` | `wip/rung-natives-small` at `aea0817b7` | `ca1498628` |
| 5 | W, `rung-natives-self` | `wip/rung-natives-self` at `4b4edfd19` | `9f65d60e2` |
| 6 | G, `rung-codegen-where` | `wip/rung-codegen-where` at `6fa0a2a54` | `c324b841c` |
| 7 | H, `rung-natives-hard` | `wip/rung-natives-hard` at `696a79095` | `b71495ca4` |
| | the rows' closes | | `0fcc1cab6` |

## The order the rungs were applied in

F, K, Z, S, W, G, H, as the batch record's fork 1 gives it.
- No rung lands only with another (`landsOnlyWith` empty for all seven), so the first rule orders nothing.
- Three files are shared, each rung's lowest edited line read from `git diff -U0 b0f6cd6b7...<branch>` (the base side of its first hunk): `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, F `:56`, S `:380`, H `:392`; `Library/FortressLibrary.fss`, K `:789`, Z `:832`, H `:918`, S `:986`; `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`, F `:51`, W `:80`. So F goes before S, H and W; K before Z, H and S; Z before H and S.
- S and H are ordered both ways by their two files (S's `:380` before H's `:392`; H's `:918` before S's `:986`), so the pair keeps the manifest's order, S before H.
- G shares no file with any rung and keeps its manifest place, after W and before H; W shares only `StaticNativeApp.java`, with F.
- With the manifest's order F, Z, S, K, W, G, H as the tie-break, these constraints give F, K, Z, S, W, G, H.
- Each patch applied with no conflict, on the gather tree together and on `main` in turn: 'Applied patch to ... cleanly.' for each file the tree had, git's fallback to direct application for the files new to it. Rung H's two hunks that hold S's changed lines `FortressBuiltin.fss:617` and `FortressLibrary.fss:986` as context went in through `--3way`, both rungs' strings in place (`sed -n 617p` and `sed -n 986p` print S's helper strings on `main`). For each shared file, every line each rung's patch adds is in the merged file, and each line it removes is gone but for lines the file holds elsewhere too (`Float$Pow` and `Long$ToBigNum`, which other declarations still name).
- No line a landed record cites was moved by another rung's hunk: every family hunk replaces one line with one; W's hunks in `StaticNativeApp.java` lie below F's one changed line; G and H change files that no other rung touches but the library files, where H's hunks are one line for one. So nothing was re-anchored.

## The tests on the merged tree

From `/home/user/fortress-gather24`, the seven patches on `b0f6cd6b7`, built as above, each run under `nice -n 19`, one at a time but for the specification's build beside the demos:
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/gather/h1` on the batch's 47 walk test files, every new or changed walk test of the seven rungs and climb batch 23's `NativeHelper*Walk` and `ZZ32DivisionByZeroWalk`, in one JVM:
  `# harness-one 2026-10-31T15:09:15Z; tree b0f6cd6b7; nproc=4; load 1.15 0.70 0.62; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty` (the tree's `HEAD`, with the patches in its index)
  `. interpret tmp/gather/h1/tests/NativeHelperUncarriedSelfWalk` / ` OK Saw expected refusal at load`; `. interpret tmp/gather/h1/tests/NN32DivisionByZeroWalk` / `NN32 DIV by zero: DivisionByZero`; `. interpret tmp/gather/h1/tests/XXXZZ64RemainderByZeroWalk` / `java.lang.ArithmeticException`
  `OK (38 tests)`
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh g24 ProjectFortress/compiler_tests` on the batch's 25 compiled `.test` files and climb batch 23's five `NativeHelper*Compiled` and `XXXNativeHelper*Compiled`, 30 in one JVM:
  `# junit.sh g24 2026-10-31T15:09:43Z; nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 1.72 0.89 0.68; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4`
  `. run ProjectFortress/compiler_tests/ChooseTableCompiledRungE (291ms) REACHED`; `. run ProjectFortress/compiler_tests/ChooseHelperCompiled (637ms) PASS`; `. run ProjectFortress/compiler_tests/NativeHelperTransferCompiled (637ms) PASS`; `. run ProjectFortress/compiler_tests/XXXWhereVariableCallCompiled (260ms) REACHED` / `java.lang.NoClassDefFoundError` / `Saw expected failure (Exit code != 0)`
  `OK (51 tests)`
- `bash tmp/run-demos.sh tmp/gather/demos`, the demo driver as `compile-ladder/rung-team-demos/REPORT.md`, "Commands worked out", gives it, from 15:10:30Z to 15:38:38Z, `FORTRESS_THREADS=1`, nproc 4:
  `demos: 52 run, 52 reached their end`
  Among them `BiCGSTAB` ('elapsed time 71539497697 ns ( 71.539497697 s)'), `npbft` ('  Checksum 1 : 570.4182371381474+385.43365014877793i'), `trips` ('{[trip 3 4 5],[trip 5 12 13],[trip 7 24 25],...'), `mg` ('Time: 103.292758234 seconds'), `wordcount` ('Total run in 36737.560082ms') and `Generator2Demo` ('max sum of subs of x filtered by flat4 and ascending = 5'). So the batch's 152 moved bindings and W's check of `self` move no demo off its end (P-79; fork 8).
- The specification, with the gather's Effects (below), from the gather tree with `main`'s `Specification/appendices/changes.tex` copied in: `cd Specification/fortress && ./ant genSource && ./ant tex`, 'BUILD SUCCESSFUL' twice ('Total time: 54 seconds', 'Total time: 49 seconds'), the count of reference, label and undefined-control-sequence warnings in `fortress.log` 0; `pdftotext` of the PDF prints 'Effect 173 of the 449 bindings of the Fortress standard libraries name a helper', '(row 864 of the', '(row 865 of the revival’s gap' and 'links and dies when it runs (row 867 of the revival’s gap ledger).'. The build's files removed (`git clean -fXq -- Specification`). No later commit of the gather changes `Specification/`.
- Each closing test passed there, as its rung last ran it: row 521's `ChooseTableCompiledRungE` and row 855's `ChooseHelperCompiled` (junit.sh, one JVM, above), row 847's `NativeHelperUncarriedSelfWalk` (harness-one.sh, above).
- The stages, the suites and `ant testSpecData` are the gate's: no row of this batch closes on a stage (fork 10), and the gate runs `testSpecData` because the landed summary has it.

**The interaction.** The rungs share three files and no declaration, and the patches applied together with no conflict. On the merged tree W's check of `self` meets every moved binding of F, Z, S, K and H, and the batch's walk tests and climb batch 23's pass together through the harness ('OK (38 tests)'); H's transfers meet S's `signed` and `codePoint` strings and K's `CHOOSE`, and the compiled guards of all four families pass together with climb batch 23's ('OK (51 tests)').

### Text mismatches

None. No rung edits a sentence of `Specification/` or `builtinPrimitive`'s printed comment (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`); the gather's own corrections of four Appendix I entries state what the merged code does (below).

## Rows opened

Numbered by `ledger.py add` in the order the rungs were applied, each rung's rows in the order of their placeholders, each in the section its record names, as its record wrote it (each passed the template as written). Each placeholder was replaced by its number in the rung's `REPORT.md` and `SKEPTIC.md` (as "row N"), in the rows that cite each other, in the FACTS entries, the PLAN entries, the handover lines and the revival changes below, before the rung's commit; no test cited one. Rung G's NEW-G-1 named NEW-G-2 before that had a number; the gather put row 868 in with a rewrite of row 867, and wrote row 868's "(867)" as "(row 867)", both in `c324b841c`.

| Row | Placeholder | Rung | Section | Status, reproducer | Claim, in short |
|---|---|---|---|---|---|
| 862 | NEW-F-1 | F | 7 | open, `NEGATIVE-VERIFIED`, `XXXFloatNumeralOneRounding.test` | on the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings, not one |
| 863 | NEW-F-2 | F | 7 | open, `CONTESTED`, `realArith.fss` | the specification says a floating-point division by zero "produces a NaN value according to the rules of IEEE 754", where both paths give an infinity for a nonzero dividend |
| 864 | NEW-W-1 | W | 12 | open, `NEGATIVE-VERIFIED`, `NativeHelperUncarriedSelfGenericObjectWalk.fss` | under walk, a helper bound in a dotted method of a generic trait or object that no Java type carries is refused only where an instance's method is made |
| 865 | NEW-W-2 | W (its skeptic) | 12 | open, `NEGATIVE-VERIFIED`, none | on the compiled path, a helper string in a local function or an object expression's method is not rewritten into a helper call |
| 866 | NEW-W-3 | W (its skeptic) | 12 | open, `NEGATIVE-VERIFIED`, none | on the compiled path, a program's object that extends `ZZ32` compiles and its run dies at class load |
| 867 | NEW-G-1 | G (its skeptic) | 12 | open, `NEGATIVE-VERIFIED`, `XXXWhereVariableCallCompiled.test` | compiled, a call of a function or method whose own `where` clause introduces a `where`-clause variable links and dies, `NoClassDefFoundError` |
| 868 | NEW-G-2 | G (its skeptic) | 2 | open, `NEGATIVE-VERIFIED`, `XXXWhereVariableMethodWalk.fss` | under walk, an object's method whose own `where` clause introduces a `where`-clause variable stops, 'Missing type n' |
| 869 | NEW-G-3 | G (its skeptic) | 2 | open, `NEGATIVE-VERIFIED`, `XXXWhereVariableObjectWalk.fss` | under walk, an object or trait whose own `where` clause introduces a `where`-clause variable is refused at its use |
| 870 | NEW-G-4 | G (its skeptic) | 3 | open, `NEGATIVE-VERIFIED`, `XXXGenericMethodTraitWhereWalk.fss` | under walk, a generic dotted method's `where` clause on its trait's static parameter stops in a `ClassCastException` |
| 871 | NEW-G-5 | G (its skeptic) | 5 | open, `NEGATIVE-VERIFIED`, none | the compiled checker's overloading check reads no `where` constraint on a function's own static parameter as a bound |
| 872 | NEW-H-1 | H | 10 | open, `NEGATIVE-VERIFIED`, `CharAsStringSupplementaryWalk.fss` | `Char`'s `asString` of a character past U+FFFF answers the one-character string of its low 16 bits, on both paths |

Rows rewritten, each with its record's whole line: 336 (Z: `REM` and `MOD` by zero on `ZZ32` and `ZZ64`, reproducer `XXXZZ64RemainderByZeroWalk`), in `3308aad55`; 856 and 857 (S: their tests of today's behaviour as reproducers, the skeptic's corrections in), in `ca1498628`; 846 (W: `unbox`'s citation moved to `StaticNativeApp.java:231`, a note would pass the notes cell's 700 characters), in `9f65d60e2`; 701 (G: its contract half, reproducer `XXXFunctionContractCodeGeneration.test`), 307 (G: a whole line, the row at 1,196 characters taking no note), 812 and 677 (G), in `c324b841c`; 848 (H: `REM` and `MOD` by zero on `NN32`, `NN64` and `ZZ`, reproducer `XXXNN32RemainderByZeroWalk`) and 860 (H: reproducer the `XXX` run pair), in `b71495ca4`.

## Rows closed

Each by `ledger.py close N --commit <the rung's commit on main> --test <the test>`, after its test passed on the merged tree as the rung last ran it, in `0fcc1cab6`:
- Rung K, `71249bf55`: 521, test `ProjectFortress/compiler_tests/ChooseTableCompiledRungE.test` (with `ChooseTableCompiledRungELink.test`; `NN32`'s half asserted by `ChooseHelperZZ64Compiled`); 855, test `ProjectFortress/compiler_tests/ChooseHelperCompiled.test` (its `ZZ64` half by `ChooseHelperZZ64Compiled`).
- Rung W, `9f65d60e2`: 847, test `ProjectFortress/tests/NativeHelperUncarriedSelfWalk.fss`.

Rows 336, 701 and 848 are rewritten, not closed: a half of each is fixed, the rest stays. Before the closes, `python3 explorations/coordinator/tools/ledger.py landing-check b0f6cd6b7460389333cb7ad1b050b736f8f68e6e` printed 'template: row 521 ...: reproducer-path: ProjectFortress/compiler_tests/XXXChooseTableCompiledRungE.test is no path ...' and 'xxx-gone: ProjectFortress/tests/XXXNativeHelperUncarriedSelfWalk.fss, renamed ...: row 847 (NEGATIVE-VERIFIED)', six findings, all of the two renamed `XXX` tests; after the closes, and again after their commit: 'ledger.py landing-check: b0f6cd6b7..HEAD: no finding'. `python3 explorations/coordinator/tools/record.py check --base b0f6cd6b7460389333cb7ad1b050b736f8f68e6e`: 'FACTS.md 241 entries, POSITIONS.md 84 entries; 0 failures; reported: size 2'.

## Each rung

From each branch, `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. No rung has a `JUDGE.md` or a decision record. No `textCommands` line was run (below). FACTS entries are added after the last entry of their section, as the FACTS file's header gives it, with `record.py add`, and rewritten with `record.py set`. F-32's and F-299's counts were rewritten in each rung's commit to that commit's tree: 51 and 398 after F, 53 and 396 after K, 89 and 360 after Z, 97 and 352 after S, and the merged tree's 173 and 276 after H (`git grep -h -o 'builtinPrimitive("com.sun.fortress.nativeHelpers' -- Library ProjectFortress/LibraryBuiltin | wc -l` prints 173 on `main`; by type: trait `ZZ32` 20, trait `ZZ64` 21, trait `ZZ` 16, trait `NN64` 18, value object `NN32` 21, `Char` 40, `Float` 30, `Int`, `Long` and `BigNum` 2 each, the top-level `char` 1).

### F (`rung-natives-float`), landed first as `5ecb7a841`

**Skeptic's fixes**, four corrections, none contested, no ruling:
- `06d32297f`: `REPORT.md` and `record.md` were not on the branch, since the harness refused the worker's write; the skeptic wrote them from the run's journal.
- `fc709e881`: both guards lacked values the section asks for (`acos` at no zero, large value or infinity; `asExprString` at no 0.0, large value or infinity; `SQRT` at no 0.0 or large value; `truncate` and `round` at no zero; several bindings never at NaN); 77 walk and 66 compiled assertions added, the exclusions of rows 672 and 330 and of row 863 kept.
- `0f44ee9e8`: the binary `-` was asserted at NaN by neither guard; `NaN - 1` added to both.
- `fc1fbb742`: `REPORT.md:43` described values the worker's head did not test; that sentence and the counts at `REPORT.md:21` and `record.md:9` now describe the corrected guards (224 and 207 assertions) beside the worker's 146 and 140.

**Folded.** F-303 added ("Walk carries a declared `Float` in a Java `double` ...", "The checker and the one library"), F-304 added ("On the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings ...", "Landed semantics"); F-32 and F-299 counted with the 30. Rows 862 and 863 added.

**Corrections.** The skeptic's two `leftForGather` items: the sentences made false, the Appendix I Effect's count (`Specification/appendices/changes.tex:4466-4473` at the base), rewritten once on the merged tree in rung H's commit (below), and F-32's and F-299's counts, rewritten here; the skill's carrier list (`.claude/skills/fortress-repo/references/interpreter.md:94`, `:100`), left for the skill writer, since the batch writes no skill text; and rows NEW-F-1 and NEW-F-2, added as 862 and 863.

### K (`rung-natives-choose`), landed second as `71249bf55`

**Skeptic's fixes**, three corrections, none contested, no ruling:
- `755ea104f`: the branch did not carry the worker's `REPORT.md` and `record.md`; the skeptic wrote them byte for byte from the run's journal with `journal-text.py` (32945 and 12138 bytes, both exits 0).
- `17929b443`: each of the six new tests carried a second comment line with the specification's citation; the citation went into the messages of each file's first exact value and first overflow, no assertion or value changed.
- `603a98bd6`: `REPORT.md:7` and `:128` cited `explorations/compile-ladder/plan-24/probes/choose.patch:76-111` for the `simpleIntArith` hunk; it is `:76-107`.

**Folded.** F-305 added ("`CHOOSE` on `ZZ32` and `ZZ64` names its helper on both paths ...", "Landed semantics"); F-299 (its `CHOOSE` clause and row 521 out), F-32 and F-132 (its "and `CHOOSE` past its helper's table dies with a Java exception (row 521)") rewritten. Rows 521 and 855 closed in `0fcc1cab6`.

**Corrections.** No `leftForGather` item. `REPORT.md`, "8. Sentences made false": `changes.tex:4466`, `:4473`, `:4474-4477`, in the gather's Effect (below). P-73's clause and PLAN's `:51-52` are not the gather's to write (below).

### Z (`rung-natives-integers`), landed third as `3308aad55`

**Skeptic's fixes**, one correction, none contested, no ruling:
- `e4f1e168b`: `record.md`'s finding 1, its For FACTS entry, its handover line and its Revival change's reason said that the 28 helpers are "those the compiler's prelude binds for the same operations", citing `CompilerBuiltin.fss:517-545` and `:578-629`; for `ZZ64`'s four wrapping bindings the prelude binds the wrapping helpers to `BOXMINUS`, `BOXPLUS` and `BOXDOT` (`:587`, `:590`, `:593`, `:596`) and its `DOTPLUS` and `DOTMINUS` to the saturating helpers (`:588`, `:591`, `:594`), and has no `DOTTIMES` on `ZZ64` (row 348); the ranges also left out lines the record now names.

**Folded.** F-306 added ("Under walk, trait `ZZ64`'s 20 and trait `ZZ`'s 16 native bindings name helpers ...", "The checker and the one library"); F-24 (`DIV` by zero on `ZZ32`, `ZZ64` and `ZZ`), F-32 and F-299 rewritten. Row 336 rewritten.

**Corrections.** No `leftForGather` item. `REPORT.md`, "Sentences made false": `changes.tex:4466-4473` and `:4483-4486`, in the gather's Effect.

### S (`rung-natives-small`), landed fourth as `ca1498628`

**Skeptic's fixes**, three corrections in one commit, none contested, no ruling:
- `b8f67a725`: row 857's rewritten line did not say that the helper `char` now names passes -1 and 1114112 on the compiled path too ('cp  122   55296   1114111   -1   1114112' from `SkSmallCompiled`, on the old code and the head); row 856's line said 'siblings: 502' only, now 'siblings: 502, 858'; `REPORT.md:129` cited a scratch file, now the command and its output (`wc -l < tmp/rung-natives-small/dist-post/errors.tsv` printed '1').

**Folded.** F-307 added ("The small rest's eight native bindings name their helpers of `nativeHelpers/` ...", "The checker and the one library"); F-32 and F-299 rewritten. Rows 856 and 857 rewritten.

**Corrections.** No `leftForGather` item. `REPORT.md`, "Sentences made false": `changes.tex:4466`, `:4473`, in the gather's Effect.

### W (`rung-natives-self`), landed fifth as `9f65d60e2`

**Skeptic's fixes**, four corrections, none contested, no ruling:
- `cd562a9a0`: the branch did not carry the worker's `REPORT.md` and `record.md` (the harness had refused their write); the skeptic wrote both from the run's journal, byte for byte, with `journal-text.py` (30500 and 12638 bytes).
- `383ce4e40`: four record errors: `javaForSelf` is at `StaticNativeApp.java:81-95`, not `:82-96`; `modules-and-phases.md:445`'s `NativeApp.java` citations and `sources.md:931`'s were missing from the moved-citations list; row 846's note would pass the notes cell's 700 characters, so it became a rewrite; F-299's hand-over now says that a program's extender of a carried trait still reaches the helper (row 551).
- `44abf09e8`: row 865 (NEW-W-2), measured by the skeptic's programs: the compiled path does not rewrite a helper string in a local function or an object expression's method (`compiler/BuiltinPrimitiveRewriter.java:51`, `:66-85` at `d1228e1f0`), 'Variable builtinPrimitive is not defined.', where walk answers -4.
- `b0c050f2c`: row 866 (NEW-W-3): a program's object that extends `ZZ32` compiles, and its compiled run dies at class load with 'IncompatibleClassChangeError: ... can not implement com.sun.fortress.compiler.runtimeValues.FZZ32, because it is not an interface'.

**Folded.** F-299 rewritten, its row-847 sentence replaced by the check of `self` as the record gives it, its citation `NativeApp.java:194-201` moved to `:200-207`, its tests and detail extended. Row 846 rewritten; rows 864, 865 and 866 added. Row 847 closed in `0fcc1cab6`.

**Corrections.** No `leftForGather` item. `REPORT.md`, "Sentences made false": `changes.tex:4493-4498`, in the gather's Effect; the skill's `interpreter.md:103` and `sources.md:941`, and the map's `modules-and-phases.md:445`, left (below).

### G (`rung-codegen-where`), landed sixth as `c324b841c`

**Skeptic's fixes**, three corrections, none contested, no ruling:
- `4efc2097d`: defects the skeptic's programs measured had no home: rows 867 (NEW-G-1, the compiled call of a `where`-clause variable's function or method, `NoClassDefFoundError` 'wrong name'), 868 (NEW-G-2, walk, 'Missing type n'), 869 (NEW-G-3, walk, 'O must subtype X[\n\]') and 870 (NEW-G-4, walk, a `ClassCastException` at `SingleFcn.java:231`), with `ProjectFortress/compiler_tests/XXXWhereVariableCallCompiled.fss`, `ProjectFortress/tests/XXXWhereVariableMethodWalk.fss`, `XXXWhereVariableObjectWalk.fss` and `XXXGenericMethodTraitWhereWalk.fss`.
- `de6c58978`: the record said that every function, method, object and trait with a header `where` clause compiles and runs, where the `where`-clause variable's call does not (row 867); F-270's "The code generator does not compile such a trait" (`explorations/coordinator/FACTS.md:206`) was missing from the sentences made false; there was no row for NEW-G-1 to NEW-G-5.
- `24911dd6e`: row 871 (NEW-G-5) lacked its second face: the checker refuses two `where`-bounded overloads whose bounds exclude as duplicates, a pair it accepts with the bounds in the header.

**Folded.** F-181 rewritten (the record's line, row 867 in place of NEW-G-1); F-34 ("a header `where` clause, which the code generator now compiles (F-181)"), F-281 (row 701's half out) and F-270 (the trait compiles; its call fails verification) rewritten, the sentences the record left "for the record pass". Rows 701, 307, 812 and 677 rewritten; rows 867 to 871 added.

**Corrections.** No `leftForGather` item. `REPORT.md`, "7. Sentences made false", lists three Appendix I Effects, which the rung did not edit; the gather corrected each in this commit, each clause checked against `CodeGen.java:2966-2972`, `:4103-4111`, `:5022-5027` (the guards without their `where` condition) and the merged tree's runs:
- "Conditional extension" (`changes.tex:255-257` at the base): "it refuses one that carries a \KWD{where} clause of its own (row~701)" became "and one that carries a \KWD{where} clause of its own, for whose constraints, which the type checker checks, it emits nothing; a compiled call of a function or method whose own clause introduces a \KWD{where}-clause variable links and dies when it runs (row~867 ...)" (`XXXWhereVariableCallCompiled`, 'java.lang.NoClassDefFoundError', 'Saw expected failure (Exit code != 0)').
- "The traits that extend a closed trait" (`changes.tex:1672-1673` at the base): "does not yet compile a trait with a \KWD{where} clause or read a size off an argument at a call (rows~307 and~701)" became "compiles such a trait, but does not yet read a size off an argument at a call: a compiled call that opens a value of the trait to its size fails the JVM's verification (row~307)" (`XXXNatOpenRun`, 'REACHED', 'java.lang.VerifyError').
- "The index type of a subscript" (`changes.tex:4268-4271` at the base): "The code generator refuses a method with a \KWD{where} clause of its own (row~701 ...), so after the switch-over \TYP{BoundedRange}'s \VAR{atMost} waits on that row, beside the two \VAR{distribute} methods" became "The code generator no longer refuses a method with a \KWD{where} clause of its own, so after the switch-over neither \TYP{BoundedRange}'s \VAR{atMost} nor the two \VAR{distribute} methods of \library's sum reduction stops at that refusal; no compiled program reaches \library\ before then", as far as the rung's finding 1 measured, the guard and not the library's compile (`WhereBoundMethodCompiled`, 'PASS').
P-151's and P-156's sentences, PLAN's `:59` and `:253`, and the skill's lines are not the gather's to write (gather.1; below).

### H (`rung-natives-hard`), landed seventh as `b71495ca4`

**Skeptic's fixes**, two corrections in one commit, none contested, no ruling:
- `4af5d05bc`: the record's FACTS hand-over (`record.md:18`) said that a binding in a generic owner gets no transfer; only `self` goes without one there (`BuiltinPrimitiveRewriter.java:91`, `:124-127`), every other position read at its declared type (`:139-144`); it also lacked the failure mode, that the transfers are identities, so a binding of a signed helper over `NN32` composes and compiles. The list of FACTS entries made stale (`record.md:20-24`) left out F-24 (`explorations/coordinator/FACTS.md:18`).

**Folded.** F-308 added ("A `builtinPrimitive` binding over `NN32`, `NN64` or `Char` whose helper takes or answers a Java `int` or `long` compiles on the compiled path through the six transfer helpers ...", "The checker and the one library"), its title's "so 97 of the one library's 449 live bindings name a helper" put as the 76 with their lines and a pointer to F-299, which counts them; F-24 (`NN32` and `NN64`), F-298 (the transfers), F-32 and F-299 (the merged tree's 173 and 276) rewritten. Rows 848 and 860 rewritten; row 872 added.

**Corrections.** No `leftForGather` item. `REPORT.md`, "8. Sentences made false":
- The Appendix I entry "A native binding that names a static helper", its Effect, which the batch record's fork 7 gives the gather, rewritten once on the merged tree in this commit, for the sentences of F, Z, S, K, W and H: the count, 173 of 449, with the bindings by type (the per-type count above); "The other 276 still name a glue class"; the `CHOOSE` sentence of row 521 dropped, `CHOOSE` now among the moved bindings of `ZZ32` and `ZZ64`; a new sentence on H's composition with the six transfer helpers (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:132-156`, `:176-193`); `DIV` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` throwing `DivisionByZero`, `REM` and `MOD` ending the run on `ZZ32` and `ZZ64` (row 336) and on `NN32`, `NN64` and `ZZ` (row 848) (`ZZ64DivisionByZeroWalk`, `NN32DivisionByZeroWalk`, `XXXZZ64RemainderByZeroWalk`, `XXXNN32RemainderByZeroWalk` on the merged tree); row 847's sentence replaced by W's check of `self`, with row 864 (a generic type's dotted method refused only at its instance; `StaticNativeApp.java:137-141`, `MethodClosure.java:36`) and row 551 (an extender of a carried trait still reaching the helper); and, beside row 849's sentence, row 865, a departure from the revised comment's "The compiler, before type checking, rewrites the body into a call of the helper" (`FortressBuiltin.fsi:19`): the rewrite reaches a component's declarations and its traits' and objects' members only (`BuiltinPrimitiveRewriter.java:54-86`). The clauses kept: "Until the compiled code moves onto \library, the type checker checks the moved bindings, but no compiled program runs them." (compiled programs link the compiler's prelude), row 846's and row 849's sentences.
- The batch record's left-out line (`explorations/coordinator/CLIMB-BATCH-24.md:431`), "for the next rung that edits the natives' rewrite; no rung of this batch does.", corrected in place: "Rung H edits that rewrite (...) but does not take the step, which its section does not name; the step stays with the next rung that edits the rewrite, by its question for the curator (H.worker.1)."
- The skill's `compiler.md:85`: left for the skill writer.

## Files written from the journal

None by the gather: every branch carried its `REPORT.md`, `record.md` and `SKEPTIC.md`, no `SKEPTIC.md` is only the word "committed", and no rung had a repair round, so no `textCommands` line was run. On four branches the skeptic wrote the worker's `REPORT.md` and `record.md` from the run's journal, since the harness had refused the worker's write: F (`06d32297f`), K (`755ea104f`), S (`3163eb21a`) and W (`cd562a9a0`).

## The rungs that did not land

None: all seven rungs of the batch were approved.

## Ledger notes

No note was asked for as a note: every change to an existing row came as its record's whole line, by `ledger.py rewrite` (336, 856, 857, 846, 701, 307, 812, 677, 848, 860), row 846's because a note would pass the notes cell's 700 characters and row 307's because a note would pass the row's 1,200. The gather's two rewrites of rows it had just added, 867 and 868, put row numbers in place of a placeholder and a bare number (above). None is left out.

## Handover lines

Each rung's handover line, as its record gives it, with the rows' numbers put in. The hashes in them are the branches'; each rung's commit on `main` is in the table above. (The first section of the old handover file is retired into the first section of `PLAN.md`, which the coordinator keeps.)

**F.**

Climb batch 24, rung F, the floating-point family: `Float`'s 30 bindings name `simpleDoubleArith`'s helpers and walk carries a declared `Float` in a `double` (one line of `javaFor`), the planner's patch as it is; no walk value moves (1,420 printed values, the guards, 30 of 30 mutants caught), the count and the distance 0, `ant testSystem` 696 and `ant testSpecData` 130 with no failure; new rows 862 (the compiled path rounds a radix-point numeral more than once, `XXXFloatNumeralOneRounding`) and 863 (the specification's NaN for a float division by zero, `CONTESTED`, for the curator). Next for `Float`: the brackets after P-68's rung, the directed roundings, `MIN`, `MAX`, `atan2`, `narrow` and the predicates, which have no fitting helper.

**K.**

Climb batch 24, rung K, on `wip/rung-natives-choose` at `00e620a3f`: trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` name their helpers, which raise `IntegerOverflow` past their tables and keep a scratch array per call. Rows 521 and 855 close, with `XXXChooseTableCompiledRungE` promoted. Count 0, distance 0; `testQuick` and `testSystem` 'BUILD SUCCESSFUL'.

**Z.**

Rung Z, the 64-bit and big integers: trait `ZZ64`'s 20 and trait `ZZ`'s 16 native bindings name the helpers the compiler's prelude binds, `ZZ64`'s wrapping operators' under its `BOX` spellings (row 348) (`Library/FortressLibrary.fss:831-905`, `:1007-1076`), every value kept under walk, and their `DIV` by zero raises `DivisionByZero` (`ZZ64DivisionByZeroWalk`, `ZZDivisionByZeroWalk`); the stages read 0 and 0; row 336 narrows to `REM` and `MOD` on `ZZ32` and `ZZ64`, its reproducer `XXXZZ64RemainderByZeroWalk`. Next: remainder helpers for `REM` and `MOD` on every integer type (rows 336, 848), and `ZZ`'s `widen`, `narrow` and `CHOOSE` on new helpers.

**S.**

Climb batch 24 rung S: the small rest's eight bindings name their helpers of `nativeHelpers` (P-58). They are `Long`'s and `BigNum`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`. Walk's values are unchanged, and the count and the distance read 0 and 0. Rows 856 and 857 have their tests of today's behaviour. Next: `printlnWithThread` and `getProperty` after item 310 is asked again, and `FlatString`'s 5 with the string family.

**W.**

Climb batch 24 rung W, `wip/rung-natives-self` at `d1228e1f0`: walk's native loader is told the declaring type and refuses at load a helper bound in a method of a type that no Java type carries. It takes only a self-first overload at that type's carrier; `FlatString` and `JavaString` carry no self. Row 847 closes with `NativeHelperUncarriedSelfWalk`. Row 864 is filed: a generic type's dotted method is refused only at its instance. testSystem 700 and testSpecData 130, no failure; no stage run.

**G.**

Climb batch 24 rung G landed row 701's `where` half: the code generator compiles a function, method, object or trait whose own header carries a `where` clause, the three guards' `where` conditions dropped and their contract conditions kept, nothing emitted for the clause; `XXXWhereBoundChecker` promoted to `WhereBoundFunctionCompiled`, four more run tests beside it, `XXXNatOpenRun` a run pair for row 307's `VerifyError` at the call that opens a size, `XXXFunctionContractCodeGeneration` row 701's new reproducer. Next on the code generator's walls over the library: contracts (row 701), row 812's kind env, row 307's size read off a call's argument; beside them, a `where`-clause variable at a compiled call (row 867).

**H.**

Climb batch 24's rung H landed the hard set's way 2b: the compiled path's rewrite composes a `builtinPrimitive` binding over `NN32`, `NN64` or `Char` with the six transfer helpers, and 76 bindings of `NN32`, `NN64` and `Char` name their helpers (97 of 449 on its tree), the count and the distance 0 and 0, under walk `NN32`'s and `NN64`'s `DIV` by zero now `DivisionByZero` and no other value moving; row 848 narrowed to `REM` and `MOD`, rows 848 and 860 given their `XXX` reproducers, row 872 filed (`Char`'s `asString` past U+FFFF).

## Points to report

None holds the push: every point below is reversible, and the gather took no step that cannot be undone or that acts against a decision on record. Where the worker and the skeptic listed one point twice, it is listed once, with both measurements where they differ. Lines are on `main`, where they are the rung's own: no rung's hunk moved another's lines.

Rung F:
- `rung-F.patch` taken as it is: `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:51` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:55-193`, the 62 changed lines equal to the patch's (`diff` of the sorted sets prints nothing); 30 moved; the 32 left on glue classes: `isNaN`, `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX`, the 18 directed roundings, `^` at `RR32` and `AnyIntegral`, `atan2`, `|\self/|`, `|/self\|` (`FortressBuiltin.fss:60-189`).
- The two guards on the base and on the text: `ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss` and `ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled.fss`; on the base `harness-one.sh` 'OK (1 test)' and `junit.sh` 'OK (2 tests)', on the text 'OK (2 tests)' and 'OK (6 tests)'; after the skeptic's corrections `harness-one.sh` 'OK (1 test)' on `fc709e881` and on the old code, `junit.sh` 'OK (2 tests)' on both.
- The tables on the final tree: the count '#total 0', '#locations 0', '#crash none', equal to climb batch 23's gate table, 129 s at load 2.94; the distance '#total 0', '#crash none', 'DISTANCE SAME   0', '#seconds 202 FortressLibrary 156'; no site.
- Walk values and verdicts: none moves (the worker's 1,420 values, the skeptic's `SkFloatRoutes` at 1 and 4 threads); `ant testSystem` 'Tests run: 177', '172', '168', '179', 'Failures: 0, Errors: 0' (696); `ant testSpecData` 'Tests run: 130, Failures: 0, Errors: 0'; no verdict changes.
- Defects: row 862, `ProjectFortress/compiler_tests/XXXFloatNumeralOneRounding.fss:7-8` with `FloatNumeralOneRoundingLink.test`, at `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1994-2004`; row 863, `CONTESTED`, on `Specification/basic/operators/opr-overview.tex:167-168`, reproducer `ProjectFortress/tests/realArith.fss:78`.
- Every sentence made false: `Specification/appendices/changes.tex:4466-4473` at the base (rewritten by the gather in `b71495ca4`); F-32 and F-299 (rewritten); the skill's `interpreter.md:94` and `:100` (left for the skill writer).

Rung K:
- The CHOOSE probe's patch taken as written for `ZZ32` (its tests' second comment lines later moved into messages by the skeptic); `simpleLongArith` by the same two changes in the patch's form: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:162-163`, `:210-213`; `simpleLongArith.java:136-137`, `:183-186`.
- The tests before and after: `harness-one.sh` on the base 'Tests run: 5,  Failures: 2' (`ChooseHelperWalk` 'Index 15', `ChooseHelperZZ64Walk` 'Index 32'; the guards OK); `junit.sh` on the base 'Tests run: 7,  Failures: 3'; after, 'OK (5 tests)' and 'OK (7 tests)'; on the skeptic's head 'OK (4 tests)' twice, on the old code 'Tests run: 4,  Failures: 2' twice.
- The tables: both 0, no site, the count 147 s ('real 2m27.019s'); 'DISTANCE SAME   0'.
- The suites: `ant testQuick` 'Tests run: 1343, Failures: 0', 263, 86, 'BUILD SUCCESSFUL'; `ant testSystem` 182, 171, 170, 175, 'Failures: 0', 'BUILD SUCCESSFUL'; only the promoted pair's verdict changes.
- Values that move beyond `CHOOSE` past the table: none under walk (`LongChooseSweep` 'helper: {ok-overflow=9928014, ok-value=54721226}', equal to walk's; the skeptic's `ChooseSkA` to `ChooseSkD`, 0 mismatches over about 48,000 checks at 1 and 4 threads); on the compiled path, parallel slow-path calls now give the coefficient ('threads 4, calls 1000000, wrong values 0, exceptions 0', the base 144 and 95; the skeptic's old code 'MISMATCH ZZ32 47873 CHOOSE 2 got 1075529010 want 1145888128', the new 0), and `NN32`'s `CHOOSE` past the table raises `IntegerOverflow` (old code 'Index 32 out of bounds for length 32', the fix 'OK (2 tests)').
- Every sentence made false: `changes.tex:4466`, `:4473`, `:4474-4477` at the base (the gather's Effect); rows 521 and 855 (closed); F-32, F-299 and F-132 (rewritten); P-73 (`explorations/coordinator/POSITIONS.md:80`; K.worker.1); PLAN's `:51-52` (left for the coordinator).
- Files edited beyond those named: none (`Library/FortressLibrary.fss`, the two helpers, files under `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/`, and the rung's folder).

Rung Z:
- `rung-Z.patch` taken as it is (the diff's lines and the patch's, as two sets, print nothing): `Library/FortressLibrary.fss:831-905`, `:1007-1076`; none of the 36 left on its glue class.
- The division tests and the `XXX` test before and after, and the guards: on the base 'Caused by: java.lang.ArithmeticException: BigInteger divide by zero', 'Caused by: java.lang.ArithmeticException: / by zero', 'Tests run: 4,  Failures: 2,  Errors: 0', the walk guard 'OK (time = 705ms)', the `XXX` test 'OK Saw expected exception', red on a deliberate fix (' Missing expected failure'); on the final head 'OK (4 tests)'; the compiled guard 'OK (2 tests)' on the base and on the text.
- The tables: the count '#total 0', '#locations 0', '#crash none', equal to climb batch 23's, 132 s (11:25:08 to 11:27:20 UTC, load 0.60); the distance '#total 0', '#crash none', 'DISTANCE SAME   0'; no site.
- Walk values beyond the two divisions by zero: none (the worker's 1,587 values and 84 mixed calls; the skeptic's `SkIntBothNZ`, `SkIntWalk` and `SkIntMixFNZ` at 1 and 4 threads).
- Row 336's rewritten line and its reproducer `XXXZZ64RemainderByZeroWalk` ('1 rows, 0 fail the template'), landed in `3308aad55`.
- Every sentence made false: `changes.tex:4466-4473` and `:4483-4486` at the base (the gather's Effect); row 336's claim (rewritten); F-32, F-299 and F-24 (rewritten).
- Files edited beyond those named: none.

Rung S:
- `rung-S.patch` taken as it is; all 8 moved: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:380`, `:382`, `:470`, `:567`, `:569`, `:617`; `Library/FortressLibrary.fss:986`, `:4540`; `printlnWithThread` (`Library/FortressLibrary.fss:4632`) and `getProperty` (`Library/System.fss:45`) stay on `StringPrim`.
- The two guards on the base and on the text: `harness-one.sh` 'OK (3 tests)' on `b0f6cd6b7` and on `df9e89d19`; `junit.sh` 'OK (2 tests)' on both.
- The tables: both 0, equal to climb batch 23's but for the distance's `#seconds` and `#machine` rows ('COUNT-SAME', 'DISTANCE SAME   0'); no site; the count 181 s at load 10.73.
- Walk values: none moves (the worker's 47 lines; the skeptic's `SkSmallIndirect`, `SkSmallFile`, `SkSmallFnValue` and `SkSmallWalkTwin` at 1 and 4 threads).
- Defects: rows 856 and 857, each home 3 with its test of today's behaviour, `ProjectFortress/tests/SignedAboveSignedRangeWalk.fss` and `ProjectFortress/tests/CharCodePointOutOfRangeWalk.fss`; the two libraries' disagreement on `char` out of range, for the curator (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1058-1062`; S.worker.1).
- Every sentence made false: `changes.tex:4466-4471`, `:4473` at the base (the gather's Effect); F-32 and F-299 (rewritten).
- Files edited beyond those named: none.

Rung W:
- `rung-W.patch` taken with two changes: under a declaring type an overload must take `self` first (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:147`, `:154`); `FlatString` and `JavaString` get no carrier of `self`, since a program can give its own type either name (`:88`).
- The tests before and after through the harness: on the base 'Tests run: 5,  Failures: 3,  Errors: 0' (12:06:01Z, tree `b0f6cd6b7`); the base build's harness 'Tests run: 6,  Failures: 4' and 'Tests run: 3,  Failures: 2'; on the head 'OK (15 tests)'.
- The suites on the final code (`d1228e1f0`): `ant testSystem` 'Tests run: 171', '176', '168', '185', 'Failures: 0, Errors: 0', 'BUILD SUCCESSFUL' (700); `ant testSpecData` 'Tests run: 130, Failures: 0, Errors: 0'; `XXXNativeHelperUncarriedSelfWalk` (an expected failure) promoted to `NativeHelperUncarriedSelfWalk` (a refusal at load), six new tests green.
- Each declaring type the table carries: `ZZ32`, `NN32`, `Char`, `Int` in `int`; `ZZ64`, `NN64`, `Long`, `UnsignedLong` in `long`; `RR64`, `Float` in `double`; `RR32` in `float`; `Boolean`; `String`; `ZZ`, `BigNum` in `BigInteger` (`StaticNativeApp.java:87-95`); no library binding refused ('methods checked 172 self mismatches 0').
- Every sentence made false: `changes.tex:4493-4498` at the base (the gather's Effect); F-299 (rewritten); the skill's `interpreter.md:103` (left for the skill writer).

Rung G:
- Each guard changed: the `header.getWhereClause().isNone()` conditions at `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2967`, `:4107`, `:5027` at `b0f6cd6b7` deleted, the contract conditions kept (now in the guards at `:2966-2972`, `:4103-4111`, `:5022-5027`); nothing else in `CodeGen` needed.
- The tests before and after through `junit.sh`: on the base 'Tests run: 10,  Failures: 9' and, for the object, 'Failures: 3'; a deliberate break 'Did not see expected failure'; the final 'OK (18 tests)' (`explorations/compile-ladder/rung-codegen-where/REPORT.md`, section 2).
- The compiler track: not run; a subset of 35 `.test` files, 'OK (55 tests)', none changed; the old `XXXNatOpenRun.test` went red on the fix ('Saw failure, but did not satisfy compile_exception_contains') and became the pair; `XXXWhereBoundChecker` promoted to `ProjectFortress/compiler_tests/WhereBoundFunctionCompiled.fss`.
- Row 701's rewritten line and row 307's, as whole lines (a note on row 307 would pass 1,200 characters); rows 812 and 677 rewritten too; all in `c324b841c`.
- Every sentence made false: `changes.tex:255-257`, `:1672-1673`, `:4268-4271` at the base (corrected by the gather in `c324b841c`); F-181, F-34, F-281 and F-270 (rewritten); P-151 (`POSITIONS.md:63`) and P-156 (`POSITIONS.md:67`) (gather.1); PLAN's `:59` and `:253` (left for the coordinator); the skill's `revival-changes.md:67`, `compiler.md:44`, `:103`, `:110` (left for the skill writer).
- Files edited beyond those named, or any edit of the checker's Scala: no Scala; tests beyond the brief's list, the worker's `ProjectFortress/compiler_tests/WhereBoundObjectCompiled.fss`, `WhereBoundTraitMethodCompiled.fss` and `XXXFunctionContractCodeGeneration.fss`, and the skeptic's `XXXWhereVariableCallCompiled.fss`; the skeptic's walk `XXX` tests in `ProjectFortress/tests/`, beyond the section's files: `XXXWhereVariableMethodWalk.fss`, `XXXWhereVariableObjectWalk.fss`, `XXXGenericMethodTraitWhereWalk.fss`.

Rung H:
- `rung-H.patch` taken with three wording changes (two comments reworded, one equivalent expression), none of behaviour; all 76 moved as `families-base.tsv` gives them; the six of the 82 left on glue classes as the brief lists them (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:23-31`, `:126`, `:132-134`; `explorations/compile-ladder/rung-natives-hard/REPORT.md:8`, `:15-17`).
- The guards, the rewrite's test, the division tests and the `XXX` tests before and after: on the base 'Tests run: 6,  Failures: 2' under walk and 'File NativeHelperTransferCompiled.fss has 71 errors.' compiled; after, 'OK (14 tests)' and 'OK (16 tests)' (`REPORT.md:19-74`).
- The tables: the count '#total 0', '#locations 0', '#crash none', equal to climb batch 23's, 132 s; the distance '#total 0', '#crash none', 'DISTANCE SAME   0'; no site (`REPORT.md:102-110`).
- The suites: `ant testQuick` 1348, 86 and 263, `ant testSystem` 182 + 167 + 179 + 173 = 701, both 'BUILD SUCCESSFUL', no verdict changed (`REPORT.md:92-100`).
- Walk values beyond `NN32`'s and `NN64`'s `DIV` by zero: none (the worker's 2,933 values and the skeptic's 2,571, old against new, `diff` empty; `REPORT.md:86-90`; `SKEPTIC.md`, "My programs, the differential").
- Row 848's rewritten line and the reproducers of rows 848 and 860, landed in `b71495ca4`.
- Every sentence made false: `changes.tex:4466-4473`, `:4484-4488` at the base (the gather's Effect); row 848's claim (rewritten); F-298, F-299, F-32 and F-24 (rewritten); the skill's `compiler.md:85` (left for the skill writer); `CLIMB-BATCH-24.md:431` (corrected by the gather).
- Files edited beyond those named, or any edit of the checker's Scala, `NamingCzar`, `interpreter/` or `nativeHelpers/`: none; one extra test within its tests, `CharAsStringSupplementaryWalk` (`REPORT.md:141`).
- Team lines changed: the 76 `builtinPrimitive` strings of the team's `value object NN32`, `value object Char` and `trait NN64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:391-466`, `:612-722`; `Library/FortressLibrary.fss:917-984`), and the revival's `BuiltinPrimitiveRewriter`.

The gather's own: the merged tree's tests (above); the Effect of "A native binding that names a static helper" rewritten once, with rows 864 and 865 named among its departures, and three Effects that rung G made false corrected, each clause checked against the code it states (above); the batch record's line `CLIMB-BATCH-24.md:431` corrected; F-34, F-281 and F-270 rewritten beside the records' entries, since rung G's record left them "for the record pass"; the placeholder fixes in rows 867 and 868; the POSITIONS sentences left for his word (gather.1). No other.

## Items for the curator, and where each is in `PLAN.md`

One asks for an answer before work on the path can go on, rung W's, which a later family of phase 4 meets when `FlatString`'s five bindings move: it is item 63 under "Pavol's answers, in the order they are needed", in a new group before those bindings move. The others have a default acted on or need none, and each is reversible: they are under "Off the path, parked", in the new subsection "Climb batch 24, listed for his review" (`explorations/coordinator/PLAN.md:648`), each opening with the ids it holds. Each went in with its rung's commit, gather.1 with rung G's. No item was held by an entry already there; H's item names the two climb batch 23 entries that hold the steps it asks about. None went unrouted.
- F.worker.1 and F.skeptic.1 (row 863): "F.worker.1 and F.skeptic.1 of climb batch 24's rung F (row 863, `CONTESTED`): does "For floating-point results, division by zero produces a NaN value ..." mean NaN, or IEEE 754's infinity ..." (`PLAN.md:652`). Default: the row `CONTESTED`, no guard asserting a nonzero value divided by zero.
- K.worker.1 and K.skeptic.1: "K.worker.1 and K.skeptic.1 of climb batch 24's rung K, told, not asked: P-73's last clause, "and at `CHOOSE` (row 521)" ..." (`PLAN.md:653`). Default: none on record; the entry stands until he rewords it.
- Z.worker.1 and Z.skeptic.1: "Z.worker.1 and Z.skeptic.1 of climb batch 24's rung Z: is walk's `unsigned` of a negative `ZZ64` (and `ZZ32`) specified? ..." (`PLAN.md:654`). Default: none on record; today's values stand.
- S.worker.1 and S.skeptic.1 (row 857): "S.worker.1 and S.skeptic.1 of climb batch 24's rung S (row 857): which answer does the one library's `char` take for a code point outside 0 to 1114111? ..." (`PLAN.md:655`). Default: today's behaviour, pinned by `CharCodePointOutOfRangeWalk`.
- W.worker.1 and W.skeptic.1: "63. W.worker.1 and W.skeptic.1 of climb batch 24's rung W: when `FlatString`'s five glue bindings move onto helpers ..., should walk's loader identify the declaring type of a method by its declaration rather than by its name? ..." (`PLAN.md:145`, "Pavol's answers, in the order they are needed", under "Before `FlatString`'s five bindings move onto helpers, raised by climb batch 24"). No default on record.
- G.skeptic.1 (row 867): "G.skeptic.1 of climb batch 24's rung G (row 867): a function or method whose own `where` clause introduces a `where`-clause variable was refused at compile on the base ..." (`PLAN.md:656`). Default: as landed, the deferred `XXX` run pair.
- gather.1: "gather.1 of climb batch 24, told, not asked: rung G makes two sentences of POSITIONS false. ..." (`PLAN.md:657`). Default: none on record; each sentence stands until he rewords it.
- H.worker.1 and H.skeptic.1: "H.worker.1 and H.skeptic.1 of climb batch 24's rung H: the steps owed for rung C's limits, review-routed.1 and the post-batch review's finding 5 ..." (`PLAN.md:658`). Default: the next rung that edits the rewrite, the batch record's sentence corrected.

## Left for the coordinator and the skill writer

- POSITIONS, the curator's text: P-73's "and at `CHOOSE` (row 521)" (`explorations/coordinator/POSITIONS.md:80`; K.worker.1), P-151's "Row 701: the code generator's half." (`:63`) and P-156's sentence on the code generator's refusal of a method with a `where` clause (`:67`) (gather.1). `ledger.py landing-check` does not flag them.
- PLAN, the coordinator's lines: `PLAN.md:51`, "`ZZ32`'s `CHOOSE` with row 521's helper fix" among the families that wait, done for `ZZ32` and `ZZ64` (`NN32`'s `CHOOSE` waits for one string now that K and H have landed, fork 18); `:52`, `XXXChooseTableCompiledRungE` "is promoted when it passes", now promoted; `:59`, "a header `where` clause (row 701)" among the code generator's kinds; `:253`, "and the code generator's half (row 701), in phase 4 before the names batch". Phase 4's line for climb batch 24 ("not yet planned") is the landing's.
- FACTS: F-299 holds 2,789 characters and repeats F-32's count; F-308 2,330 (the record's size report). F-53's numbers are the last landed gate's, climb batch 23's, until this batch's gate lands; no row of the batch closes on a stage and the gather ran neither.
- The map's B.12, `explorations/coordinator/map/modules-and-phases.md:445`: its `NativeApp.java:194-201` and `:164-223` are now `:200-207` and `:164-229` (rung W). The batch writes no map text.
- The skill's sentences made false, which the batch does not write: `.claude/skills/fortress-repo/references/interpreter.md:92-94` and `:100`, the declared types walk carries, without `Float` in `double` (F); `:103`, "Walk does not check `self`. ..." and the refusals listed above it, without 'no Java type carries T, the type of self.' and the self-first rule (W); its "`ZZ32`'s `DIV` by zero raises `DivisionByZero` in this way.", true and now also of `ZZ64`, `ZZ`, `NN32` and `NN64` (Z, H); `references/compiler.md:85`, "So a binding over `NN32`, `NN64` or `Char` that names any other helper is a type error for the checker." (H); `references/compiler.md:44`, `:103`, `:110` and `references/revival-changes.md:67`, the code generator's refusal of a declaration's own `where` clause (G); `references/sources.md:931`, its `glue/NativeApp.java:194-201`, now `:200-207`, and `:941`, "`self` not checked" with `XXXNativeHelperUncarriedSelfWalk` (W).
- The gate's counts, by the files on `main` (`git diff --name-status` of each rung's commit): `ant testSystem`, climb batch 23's 694 plus 29 walk programs added (F 2, K 4, Z 4, S 3, W 6, G 3, H 7; W's promotion a rename), so 723 (`ls ProjectFortress/tests/*.fss | wc -l` 722 on `main`, 693 at the base); the compiler track, climb batch 23's 1,338 plus the tests of 22 compiled `.test` files added and one deleted (F 3; K 3, its `XXXChooseTableCompiledRungE.test` deleted; Z 1; S 1; G 8, its `XXXWhereBoundChecker.test` renamed; H 6), as the gate counts them.
- Scratch: the gather's seeded tree `/home/user/fortress-gather24` (the seven patches in its index, `main`'s `changes.tex` copied in, the merged-tree logs under its `tmp/gather/`).

## Revival changes, for the skill writer

Each landed rung's "Revival change" section, both its parts word for word (the change, and its provenance), or its line "Revival change: none" with the reason, in the order the rungs landed, with the rows' numbers in place of the placeholders (row 867 in rung G's); no line it cites was moved by another rung.

### F (`rung-natives-float`, `5ecb7a841`)

Revival change: none. The rung moves 30 more bindings onto the binding form that climb batch 23 recorded (P-58; Appendix I, "A native binding that names a static helper"), and every value under walk stays the glue classes' (the value program and the guards); the loader whose table gains `Float` is the revival's own, not the team's walk.

### K (`rung-natives-choose`, `71249bf55`)

**The change.**
- The team's source: the team's natives for `ZZ32`'s, `ZZ64`'s and `NN32`'s `CHOOSE` on the compiled path, `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose`, bound at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:666`, `:604` and `:729` at `a874948ac`.
  - Where the folded `k` lies past their safe-bound tables, they indexed past the tables' ends and threw `java.lang.ArrayIndexOutOfBoundsException`, which no `catch` sees (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:209-211`, `simpleLongArith.java:191-194` at `a874948ac`). The first such pair is `34 CHOOSE 17` on `ZZ32` and `68 CHOOSE 34` on `ZZ64`.
  - Their slow paths kept their scratch array in one static field (`simpleIntArith.java:121`, `simpleLongArith.java:114` at `a874948ac`), so calls in parallel corrupted each other's results.
- What the tree now does:
  - The helpers raise `IntegerOverflow` wherever the folded `k` is past the table, and every coefficient there overflows.
  - Each call has its own array.
  - Walk's `ZZ32` and `ZZ64` `CHOOSE` call the same two helpers, in place of walk's glue classes, with the same values.
  - Tests: `compiler_tests/ChooseHelperCompiled`, `compiler_tests/ChooseHelperZZ64Compiled`, `compiler_tests/ChooseTableCompiledRungE`, `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`.
- The reason:
  - `Specification/basic/operators/opr-overview.tex:155`: "For integer results, overflow throws an IntegerOverflow."
  - `Specification/basic-lib/basic-integers.tex:609-611`: `CHOOSE` "computes the binomial coefficient".
  - Measured: the team's helper ends `34 CHOOSE 17` with 'Index 15 out of bounds for length 15'. At four threads, `n CHOOSE 2` in a parallel loop gave wrong coefficients, as 'a Long: 2305862669309426946 =/= a Long: 4611711385081683378; 3037008853 CHOOSE 2 in a parallel loop', and raw `java.lang.UnknownError: THIS SHOULDN'T HAPPEN in longSlowCautiousChoose`.

**Provenance.**
- P-73, fixed-width arithmetic raises `IntegerOverflow`, `CHOOSE` included.
- P-58, each binding names a static helper.
- Rows 521 and 855.
- The CHOOSE probe (`explorations/compile-ladder/plan-24/probes/choose.md`) and its patch.
- Climb batch 24, rung K, at its fork 2's default (both helpers in a rung of their own).

### Z (`rung-natives-integers`, `3308aad55`)

#### The change

- The team's sources: the team's library binds trait `ZZ64`'s and trait `ZZ`'s operators to walk's glue classes, as `opr DIV(self,b:ZZ64):ZZ64 = builtinPrimitive("com.sun.fortress.interpreter.glue.prim.Long$Div")` and `opr DIV(self, b: ZZ): ZZ = builtinPrimitive("com.sun.fortress.interpreter.glue.prim.BigNum$Div")` (`Library/FortressLibrary.fss:734-735`, `:859-860` at the team's last commit `a874948ac`); those classes divide with no zero test, `return x / y;` and `return x.divide(y);` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Long.java:128-132`, `BigNum.java:155-159` there), so walk's `ZZ64` and `ZZ` `DIV` by zero end the run with a Java `ArithmeticException` that no `catch` sees.
- What the tree now does: the 20 bindings of `ZZ64` and the 16 of `ZZ` that have a helper of the same operation name a public static method of `nativeHelpers/`, `com.sun.fortress.nativeHelpers.simpleLongArith.longOverflowingDiv` and `com.sun.fortress.nativeHelpers.simpleArbitraryPrecisionArith.div` among them (`Library/FortressLibrary.fss:831-905`, `:1007-1076`); walk gives the glue classes' values from them (`ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss`), and `DIV` by zero on `ZZ64` and on `ZZ` throws `DivisionByZero` (`ProjectFortress/tests/ZZ64DivisionByZeroWalk.fss`, `ProjectFortress/tests/ZZDivisionByZeroWalk.fss`); `REM` and `MOD` still name glue classes and end the run at a zero divisor (`ProjectFortress/tests/XXXZZ64RemainderByZeroWalk.fss`). The compiled path calls the same helpers (`ProjectFortress/compiler_tests/NativeHelperFamilyIntegersCompiled.fss`).
- The reason, as evidence: "For integer results, division by zero throws a \TYP{DivisionByZero}." (`Specification/basic/operators/opr-overview.tex:164-165`); on the base the two divisions ended the run, 'Caused by: java.lang.ArithmeticException: / by zero' and 'Caused by: java.lang.ArithmeticException: BigInteger divide by zero'; a glue class takes walk's boxed values, which compiled code does not have, while the compiler's prelude binds these operations to these helpers over plain Java values (`ZZ64`'s wrapping helpers under its `BOX` spellings, row 348), as `opr DIV(self, other:ZZ64): ZZ64 = jLongOverflowingDiv(self,other)` and `opr DIV(self, other:ZZ): ZZ = BItoZZ(jAPDiv(ZZtoBI(self),ZZtoBI(other)))` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:600`, `:539`); the helpers raise `DivisionByZero` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:78-82`, `simpleArbitraryPrecisionArith.java:42-45`).

#### Provenance

P-58, "Every native binding is a `builtinPrimitive` call naming a static helper", the bindings moved step by step; F-299, walk's raise of a helper's exception as the library's; row 336; climb batch 24's forks 1, 5, 6, 10 and 14 to 16 (the guards' form, the divisions by zero and the `XXX` test of the review's finding 7, the stages, no speed pass, the rows); the planner's `rung-Z.patch`, taken as it is; climb batch 24, rung Z, rung-natives-integers.

### S (`rung-natives-small`, `ca1498628`)

Revival change: none. The eight bindings answer the same values on the old code and the new (`ValSmall`, 47 lines, `diff` empty), on the guards' and the two pinned tests' values. Naming a helper in a `builtinPrimitive` string is climb batch 23's change, already in the record (P-58; F-299) and in its Revival change section; this rung uses that mechanism for eight more bindings and changes no behaviour of a team source.

### W (`rung-natives-self`, `9f65d60e2`)

**The change.**
- **The team's source:** the team's walk does not check a native's declared types against the Java code that runs it. `interpreter/glue/NativeMeth.java:29-31`: "As with NativeApp we don't check the declared type of the method on the Fortress side against the type of the method implemented in the native class." `StaticNativeApp`, the loader of helper strings, is a `NativeMeth`. `builtinPrimitive`'s comment, as the revival rewrote it, says the interpreter takes "the one whose Java parameter and result types carry the declared types, %self% first" (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:19`).
- **What the tree now does:** for a helper string bound in a method, walk is told the type that declares the method. It refuses the binding at load where no Java type carries that type ('Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen: no Java type carries Holder, the type of self.'), and takes only an overload whose first Java parameter carries that type. It reads the carrier by the type's name: `ZZ32`, `NN32`, `Char`, `Int` in `int`; `ZZ64`, `NN64`, `Long`, `UnsignedLong` in `long`; `RR64`, `Float` in `double`; `RR32` in `float`; `Boolean`; `String`; `ZZ`, `BigNum` in `BigInteger`. A program cannot give its own types those names, and no other name carries `self`. Tests: `ProjectFortress/tests/NativeHelperUncarriedSelfWalk.fss` with `.test`, and `NativeHelperUncarriedSelfTraitWalk`, `NativeHelperUncarriedSelfFunctionalWalk`, `NativeHelperUncarriedSelfGenericWalk`, `NativeHelperUncarriedSelfFlatStringWalk` and `NativeHelperUncarriedSelfJavaStringWalk`. A dotted method of a generic trait or object is refused where an instance is made; `NativeHelperUncarriedSelfGenericObjectWalk` shows that such a program loads while it makes no instance.
- **The reason:** a measured failure. Before the change, `len(): ZZ32` in a program's `object Holder`, bound to `com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen`, loaded, and `Holder.len()` answered 6, the length of the type's name. A trait's method answered 6 (`Square`), a generic trait's functional method 14 (`Square[\ZZ32\]`), and a program's own `object FlatString` or `object JavaString` 10. All ran through the harness with 'Missing expected refusal at load'.

**Provenance.** Ledger row 847 ("Fix: tell the loader the declaring type, and refuse such a binding at load"), under P-58 (walk loads the helper that fits the declaration). The default followed is the planner's design, climb batch 24's fork 4. Rung W of climb batch 24 made two changes to it: the self-first rule for a dotted method, and no carrier for `FlatString` and `JavaString`.

### G (`rung-codegen-where`, `c324b841c`)

**The change.** The team's code generator refuses a function, method, object or trait declaration whose own header carries a `where` clause: each of the guards of `forFnDecl`, `forObjectDeclPrePass` and `forTraitDecl` requires `header.getWhereClause().isNone()` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2936`, `:4075`, `:4982` at the team's last commit `a874948ac`), so `fortress compile` stops with 'Don't know how to compile this kind of FnDecl.' or 'Can't compile TraitDecl …'/'Can't compile ObjectDecl …'. What the tree now does: it compiles such a declaration, and emits nothing for the clause, whose constraints the checker has checked; a call of a function or method whose clause introduces a `where`-clause variable dies at run time (row 867); a function or method with a contract is still refused (`ProjectFortress/compiler_tests/WhereBoundFunctionCompiled.fss`, `WhereBoundMethodCompiled.fss`, `WhereBoundObjectCompiled.fss`, `WhereBoundTraitMethodCompiled.fss`, `ComprisesWhereFunctionalMethodCompiled.fss`; `XXXFunctionContractCodeGeneration.fss`). The reason, as evidence: the specification lets a declaration carry the clause, "Static parameters may have constraints placed on them in a \KWD{where} clause." and "Object or functional declarations may include \KWD{where} clauses" (`Specification/basic/trait-parameters.tex:332-333`, `:497`); the clause only constrains static parameters, which the checker checks and the run time does not see; and the library carries such clauses (`Library/FortressLibrary.fss:3449`, `:3451`, `:4114`; `Library/List.fss:87`; `ProjectFortress/LibraryBuiltin/NatReflect.fss:24`), which the code generator refused while the checker passed them, measured as 'Don't know how to compile this kind of FnDecl. node = g[\U\](u:U):String' on a program of that form.

**Provenance.** P-151, "Only the `where`-clause forms that the team wrote down are built" (its "Row 701: the code generator's half."); the phase 3 exit judgement's item 9, its default a named code-generator rung before the names batch, the coordinator's call; climb batch 24's forks 12 (the `where` half only, nothing emitted, the contract condition kept) and 13 (the tests); climb batch 24, rung G, rung-codegen-where.

### H (`rung-natives-hard`, `b71495ca4`)

**The change.** The team's compiler reads a helper's Java `int` as `NN32` or `Character` and its `long` as `NN64` only for six transfer helpers with special names (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:368-390`), and its prelude writes every `NN32`, `NN64` and `Character` operation as a composition through them, `opr +(self, other:NN32): NN32 = jMakeNN32FromZZ32(jUnsignedIntOverflowingAdd(jMakeZZ32FromNN32(self),jMakeZZ32FromNN32(other)))` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:768`); the interpreter's library binds the same operations to walk's glue classes, as `opr +(self,b:NN32):NN32 = builtinPrimitive("com.sun.fortress.interpreter.glue.prim.NN32$Add")` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:422-423` at the base). What the tree now does: on the compiled path a `builtinPrimitive` body that names a helper is rewritten into that same composition wherever the declaration gives `NN32`, `NN64` or `Char` to a position that the helper's Java type carries in an `int` or a `long`, so the library's bare body, `opr +(self,b:NN32):NN32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleUnsignedIntArith.unsignedIntOverflowingAdd")`, checks and runs at its declared types (`ProjectFortress/compiler_tests/NativeHelperTransferCompiled`); 20 of `NN32`'s, 17 of `NN64`'s and 39 of `Char`'s bindings name their helpers, and under walk `NN32`'s and `NN64`'s `DIV` by zero throw `DivisionByZero`, where they ended the run (`ProjectFortress/tests/NN32DivisionByZeroWalk`, `NN64DivisionByZeroWalk`); walk's other values are the glue classes' (`ProjectFortress/tests/NativeHelperFamilyNN32Walk`, `NativeHelperFamilyNN64Walk`, `NativeHelperFamilyCharWalk`). The reason: the checker refused each such binding as a bare call, 'Could not check call to function builtinPrimitive_simpleUnsignedIntArith_unsignedIntToString - ZZ32->JavaString is not applicable to an argument of type NN32.', 71 errors in `NativeHelperTransferCompiled` on the base; the glue classes take walk's values, which compiled code cannot pass; and Guy Steele's commit that made the device calls the transfers "two trivial transfer functions" and writes each operation as their composition (`c2c769094`, 2011-06-24). The specification says that "For integer results, division by zero throws a \TYP{DivisionByZero}." (`Specification/basic/operators/opr-overview.tex:164-165`); walk's glue ended the run with 'java.lang.ArithmeticException: / by zero'.

**Provenance.** P-58, "Every native binding is a `builtinPrimitive` call naming a static helper"; the batch record's Question 2, way 2b, the hard-set probe's recommendation, taken at its default under the curator's standing word (`explorations/coordinator/CLIMB-BATCH-24.md:90-100`); its forks 5 (two guards per family), 6 (row 848's half and its owed `XXX` test), 9, 10 and 18 (the 76 of the 82); the planner's `rung-H.patch`, taken with three wording changes; climb batch 24, rung H.
