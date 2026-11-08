# Rung T, climb batch 28: the skeptic's check

Verdict: **approved**. The change is right: `dumpMethodChaining` reads the first supertrait's own declarations under the trait's name as the extends clause gives it (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:941`, `:1024-1059`), so an object or trait whose first supertrait is an imported api's trait compiles, and it runs each body as walk does. Four fixes of mine, all corrections and none contested: a trait case in the rung's test and its walk guard, NEW-T-1's dotted form, a new defect NEW-T-3 with its home-2 test, and the report's count of sites and one citation. No defect of the change itself was found. Judged head: `609f0547`.

## 1. The report and record on the branch

The branch carried both files when I started: the worker committed them in `609f0547`. The journal's texts (`explorations/coordinator/tools/journal-text.py ... reportText rung:T resume:T`, and `recordText`) equal the branch's files but for the final newline, so the step wrote nothing and made no commit.

## 2. The stages and the paths

The report says neither stage ran. `git diff --name-only 157323e51759f4a46423deab7c35990af7be5a9c...609f0547` lists two kinds of path outside the brief's list: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` and `ProjectFortress/test_library/TraitTableApiTraitWalkApi.fsi` and `.fss`. The rung's section settles it: "The stages. Neither, unless your fix changes the checker (fork T1)" (`explorations/coordinator/CLIMB-BATCH-28.md:752`; fork 3, `:389`). Both stages stop after the type checker (`explorations/coordinator/tools/checker-count/run.sh:23-25`, `explorations/coordinator/tools/distance/run.sh:128`, `-order check`), so neither runs the code generator; `test_library/` comes after `Library/` on the source path, and no library component imports the two new names. No Scala and no checker code changed, so I ran no count stage. The report's only table, the codegen probe's, is the worker's, from its head's code (`c91942e5`'s build, the probe started at 05:11:32 after the last code edit at 04:58:07); I read it in the worker's output (`tmp/rung-codegen-trait-table/cg-glue-run.txt`): 'refused declarations 23 | emitted (OK lines) 720 | component failures 0', 'RangeInternals       refused   0  emitted 102', '1  Not in the trait table: <api trait>  [String 1]', and the eight `@@CG OK` lines of `OpenRange2D` to `CompactFullRange3D` that the report lists.

## 3. Test first, from the worker's transcript

- Failing on the base's code: call `...jiRhTk`, 04:53:03 to 04:53:09 UTC, `git diff --stat 157323e5... -- ProjectFortress/src` empty, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests TraitTableApiTraitCompiled.test`: 'java.lang.RuntimeException: Not in the trait table: C', 'Tests run: 3,  Failures: 3,  Errors: 0'. The first edit of `CodeGen.java` is at 04:57:59 (`...697kJ5`), its first compile at 04:58:18, the build at 05:00:20.
- Passing after the last change of code: call `...zfJpjg`, 05:16:38, tree `c91942e5` with no source diff: 'OK (4 tests)'; the walk guard, `...7GjFAg`, 05:16:50: 'OK (1 test)'. The codegen probe's one-line `sed` of the library was undone before (status clean at 05:16:01).

## 4. The diff

The helper takes `allMethods`' relation of the first supertrait and renames, by the identity of the index's own `Functional` objects, only the trait of the first supertrait's own declarations; the static arguments and the replacer stay. `declaredMethods` reads the same four relations (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1774-1777`), so the set is exact. For a local first supertrait both names find one index, so a program that compiled before gets the same answer (my program E below). For an api first supertrait the own entries can never equal a body's trait, since an api's declarations carry no body (`CodeGen.java:969` skips them), so the comparison only stops crashing and answers "not there", which gives each later supertrait's body its forwarder. The source comment over the helper states its contract in the style of the block comments beside it; I left it.

Five provenance lines, opened: `PROBES.md:115-124`, the ledger's `:892`, `source-code.tex:172-200` (the explicit import names the functional methods it makes usable), `STypesUtil.scala:1647` and `:1299`, `CodeGen.java:940`, `STypesUtil.scala:1387-1527`, `nodes/Id.java:54-72` (equality reads the node's info), `DeclaredMethod.java:41`, `FunctionalMethod.java:64`, `TraitTable.scala:72-101`, `CodeGenerationPhase.java:179`, `:206-210`: each says what the report says.

## 5. My programs, old against new

Each under `tmp/rung-codegen-trait-table/skeptic/<name>/`, its api's component compiled first; old by `/home/user/fortress-base28/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base28 <tree>/tmp/old-caches`, new by the tree's `bin/fortress` with `FORTRESS_CACHES` a private copy of its caches; walk on the old code (the diff touches no walk code). No program has mutable state, and the change writes none, so one thread (the direct runs) and four (the harness) are the same question.

| program | walk | old, compiled | new, compiled |
|---|---|---|---|
| A: api `C` with a body for `tag(self, n: ZZ32)`, `O extends { C, D }` with no own method; and `R[\(ZZ32, ZZ32)\]` likewise | `A1 cdce`, `A2 rsrt` | 'Not in the trait table: C' at `dumpMethodChaining` (`CodeGen.java:1010`) ← `forObjectDeclPrePass` (`:4691`) | `A1 cdce`, `A2 rsrt` |
| B: `trait T extends { C, D } end`, `object O extends T` | `B cdce` | 'Not in the trait table: C' at `:1010` ← `forTraitDecl` (`:5427`) | `B cdce` |
| C: dotted `name(n: ZZ32)` in api `C`, `name(s: String)` in `D` | `C cdce` | 'Not in the trait table: C' | `C cdce` |
| D: `object P[\T\]() extends { G[\T\], E }` | `D ge` | 'Not in the trait table: G' | `D ge` |
| E: all local, also `object Q extends { H[\ZZ32\], K }` with `K extends H[\ZZ32\]` | `E cdgehk` | `E cdgehk` | `E cdgehk` |
| H: `tag(n: ZZ32, self)` in api `C` | `H cd` | 'Not in the trait table: C' | `H cd` |
| I: api `C extends B`, both declaring `tag` | `I btd` | 'Not in the trait table: C' | `I btd` |
| J: the test's generic object alone, `G[\(ZZ32, ZZ32)\]` | `J ge` | 'Not in the trait table: G' | `J ge` |
| G2, G3, G5, G6: an object's own `tag(self, n: ZZ32)` beside api `B`'s `tag(self, s: String)` with a body, `B` first, later or alone | `G6 ob` and the like | 'Not in the trait table: B' at `generateTopLevelOverloads` (`:7168`) ← `forObjectDeclPrePass` (`:4677`) | the same at `:7205` ← `:4714` |
| N1: `tag(O asif S, "d" asif String)`, api `S` declaring `tag` once | `N1 sd` | `N1 sd` | `N1 sd` |
| N2: `(O asif S).m("d")`, api `S` with two dotted `m` | `N2 sdn` | 'Not in the trait table: S' at `methodsNamed` (`:6469`) ← `methodIsOverloaded` (`:6538`) | the same at `:6506` |
| N3: N2 with `S` local | `N3 sdn` | row 818's 'Can't compile a dispatched call whose arguments are not all type assumptions' | the same |
| N4: `(O asif S).m("d" asif String)`, `S` local | `N4 sdn` | `N4 sdn` | `N4 sdn` |
| N5: N4 with `S` in an api | `N5 sdn` | 'Not in the trait table: S' at `methodsNamed` ← `assumedReceiverCall` (`:6554`) | the same at `:6591` |

The commands: `tmp/rung-codegen-trait-table/skeptic/drive.sh <dir> <program> <apis>`, run by `all.sh`, `all2.sh`, `all3.sh`, and once for G6, N4 and N5 (outputs `all.txt`, `all2.txt`, `all3.txt`, `runs3.txt`).

Walk and the compiled path agree wherever the new code compiles. Programs B, C, D, H and I reach the fix's paths that the rung's test did not: a trait, a dotted method, a generic object, `self` not first, and an api supertrait's declaration of the same name; each crashed on the old code and runs on the new.

## 6. Findings and fixes

1. **The test covered objects only** (`ProjectFortress/compiler_tests/TraitTableApiTraitCompiled.fss`), while record.md's fact names "an object or trait" and two of RangeInternals' eight declarations are traits (`Library/RangeInternals.fss:1127`, `:1193`). A correction (test), commit `c6d6f51f`: `trait T extends { C, D } end` and `object Q extends T` with four assertions in the compiled test and in its walk guard. Failing on the old code: `old-fortress.sh ... junit <tree>/ProjectFortress/compiler_tests/TraitTableApiTraitCompiled.test ...`: 'java.lang.RuntimeException: Not in the trait table: C', 'Tests run: 5,  Failures: 3,  Errors: 0' (the compile stops at the first crash; program B shows the trait alone stops on the old code, at `forTraitDecl`). Passing on the head: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skfinal ProjectFortress/compiler_tests TraitTableApiTraitCompiled.test XXXAsIfApiTraitCompiled.test XXXApiTraitOverloadCompiled.test`, tree `b6edfa4d`: '. run ProjectFortress/compiler_tests/TraitTableApiTraitCompiled (686ms) PASS', 'OK (5 tests)'. The walk guard: `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-codegen-trait-table/skeptic/h1 ProjectFortress/tests/TraitTableApiTraitWalk.fss`: 'OK (1 test)'. The base build cannot run that guard, since its source path does not hold the api in this tree's `test_library/` ('Could not find an implementation for API TraitTableApiTraitWalkApi'); walk's code is the base's here. Settled by record.md's fact and the mission's eight declarations (REPORT.md section 6).
2. **NEW-T-1 is wider than its row**: programs N2 and N5 stop at `methodsNamed` through a dotted call at an assumed receiver too. A correction (row and home-2 test), commit `a3a1f5c2`: the api's `S` gains two dotted `m` with bodies, `XXXAsIfApiTraitCompiled` asserts `(O asif S).m("d" asif String)` = "sd" and `(O asif S).m(k asif ZZ32)` = "n" (the arguments assumed, so that row 818 does not stand in front once `methodsNamed` is repaired, programs N3 and N4); row NEW-T-1's claim and notes, and finding 3, rewritten. On the head and the old code: 'OK Saw expected exception'; walk on the old code prints `PASS` for the program. Settled by `Specification/basic/expressions/type-annotation.tex`, "Type Assumption" ("Type assumption is used to access a method provided by a supertrait") and `tests-writing.md`, "How a defect is recorded", item 2.
3. **NEW-T-3, a defect my programs measured** (G2, G3, G5, G6): an object that declares a functional method beside one of the same name that it inherits, with a body, from an imported api's trait stops the code generator in the dispatch generator, before `dumpMethodChaining`, alike on the old code and the head; walk runs each body. A correction (home-2 test and a row), commit `ee2eb5fd`: `ProjectFortress/compiler_tests/XXXApiTraitOverloadCompiled.test` with its api `ApiTraitOverloadApi`; finding 7 and row NEW-T-3 in record.md. As it is, on the head (`junit.sh skfinal`, above) and on the old code: '. compile ... XXXApiTraitOverloadCompiled java.lang.RuntimeException: Not in the trait table: B', ' OK Saw expected exception'; with the object's own `tag` removed for one run (`junit.sh skred`): 'Saw wrong failure. compile', 'Tests run: 1,  Failures: 1,  Errors: 0'; then restored (`cmp` equal). Settled by `Specification/basic/traits.tex:591-592`, "A trait declaration provides the method declarations that it declares or inherits", and `tests-writing.md`, item 2. Once it is repaired, a body from an api trait that is not first meets row 732 (G2, G3).
4. **The report's count of sites and a citation.** A correction (report), commit `b6edfa4d`: section 4 counted three method-gathering sites in `CodeGen.java`; the base has five, and `:489` and `:1100` gather without the trait's own declarations (`STypesUtil.scala:1555`), so the root does not reach them; section 6 cited `rung-codegen-local-functions/REPORT.md:72-84` for RangeInternals' refused 9, which is at `:86`.

## 7. Homes, rows and siblings

Row 733: home 1, `TraitTableApiTraitCompiled`. NEW-T-1: home 2, widened. NEW-T-2: home 3, a row only, as the worker gave it; the section does not say what runs where an assumption chooses an abstract declaration (`type-annotation.tex`, "Type Assumption"). NEW-T-3: home 2. Row 732: not reached by the change; G2 and G3 show its form stopping first at NEW-T-3 where the object declares the method's other overload. The three rows lint clean but for their `NEW-` numbers (`ledger.py check --rows`). Ledger searches: 'dumpMethodChaining' (rows 732, 733), 'trait table' (rows 476, 626, 688, 457, 733, 736), 'forwarder' (732), 'first supertrait' (733), 'generateTopLevelOverloads' (724, another cause), 'OverloadSet trait table' (none).

Names added, searched in `ProjectFortress/` and `Library/`: `TraitTableApiTraitApi`, `TraitTableApiTraitWalkApi`, `AsIfApiTraitApi`, `ApiTraitOverloadApi`, their components and tests, and `firstSupertraitMethods`, each declared once.

## 8. Sentences made false

The worker's list holds: F-34's "Not in the trait table" (row 733) (`explorations/coordinator/FACTS.md:31`), row 733's claim (`explorations/fortress-gap-ledger.md:892`), `explorations/coordinator/PLAN.md:58`; none in `Specification/` or in the skill's `compiler.md`.

## 9. The failure-mode question

The change turns a crash into compiled code. The value it gives is a forwarder for each later supertrait's body of a name that an api first supertrait declares; by `traits.tex:591-592` the object provides those bodies, and every program above runs each body as walk does. No quiet wrong value was found.

## 10. Suites

None: my fixes change tests and prose only, and the worker's change is the code generator's, whose tracks are the gate's (`tests-running.md`, "When to run a whole suite"; fork 2).
