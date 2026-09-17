<!-- Are the interpreter world and the compiler world separable: can an edit confined to CompilerLibrary, CompilerBuiltin, CompilerAlgebra and CompilerSystem reach the 382 tests that `ant testSystem` runs. Asked by the coordinator as section 10 of explorations/coordinator/batched-climb-plan.md, owed by a probe that died before writing; answered 2026-09-17 by reading the code, not by running the gate. Nothing in the tree was edited. -->

# The two worlds: separable, with two named exceptions

## Verdict

**Clean with two named exceptions.** No route was found by which an edit confined to `Library/CompilerLibrary.fss`/`.fsi`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`/`.fsi`, `Library/CompilerAlgebra.fss`/`.fsi` and `Library/CompilerSystem.fss`/`.fsi` can change the result of any test `ant testSystem` runs, and the two ways it could are both mechanically checkable before the batch is written.

The exceptions are: (a) **adding or renaming a top-level file** in `Library/` or `ProjectFortress/LibraryBuiltin/`, because both directories are on the interpreter's source path too and resolution is by file name (`useful/Path.java:107-122`, `default_repository/configuration:44`); (b) touching `ProjectFortress/LibraryBuiltin/AnyType.fss`/`.fsi`, which is in both worlds' root list and is therefore global (`compiler/WellKnownNames.java:48-49,121-126`).

## The rule a batch planner can apply

A batch may drop `ant testSystem` if and only if all four of these hold, each checkable from `git diff --name-only` plus one grep:

1. Every changed, added or deleted path is one of the eight files named above — no `.java`, no `.scala`, no `build.xml`, no `default_repository/configuration`, no `bin/`.
2. No file is added to or removed from `Library/` or `ProjectFortress/LibraryBuiltin/`, and no top-level declaration is renamed in a way that changes an api or component name.
3. `AnyType.fss` and `AnyType.fsi` are untouched.
4. `grep -rl 'CompilerLibrary\|CompilerBuiltin\|CompilerAlgebra\|CompilerSystem\|GeneratorLibrary' ProjectFortress/tests/` is still empty — it is empty today, and it is the one-line restatement of the whole argument.

Any batch that fails one of the four runs the full pair. Test files added under `ProjectFortress/library_tests/` — which every rung of the last climb added — do not break the rule: `library_tests` is read only by `LibraryJUTest`, inside `testFast` (`build.xml` track `library`, `tests/unit_tests/LibraryJUTest.java:36-41`).

The saving is what `iteration-cost.md:68` measured: a median `ant testSystem` of 147.6 s over 11 runs, quoted as 147.5 s at `iteration-cost.md:80,124`.

---

## 1. What the interpreter loads as its prelude, and where the list is

The list is one Java array, `WellKnownNames._defaultLibrary`, initialised at `compiler/WellKnownNames.java:48-49` to `{ anyTypeLibrary(), fortressLibrary(), fortressBuiltin() }`, that is `AnyType`, `FortressLibrary`, `FortressBuiltin`.

`WellKnownNames.useCompilerLibraries()` (`:113-126`) repoints `_fortressLibrary` to `"CompilerLibrary"` and `_fortressBuiltin` to `"CompilerBuiltin"` and rewrites the array to `{ CompilerLibrary, CompilerBuiltin, CompilerAlgebra, AnyType }`; `useFortressLibraries()` (`:128-138`) restores the interpreter's three.

That array is the *only* way the prelude enters a run: `GraphRepository.roots()` returns `defaultLibrary()` verbatim (`repository/GraphRepository.java:125-127`) and `addRoots()` (`:133-165`) makes one graph node per name, resolving each name to a file with `getApiFile` → `findFile(name + ".fsi")` (`GraphRepository.java:390-400`, `useful/Path.java:107-122`).

Resolution is by name against the ordered source path `.` , `ProjectFortress/LibraryBuiltin`, `Library`, `ProjectFortress/test_library` (`default_repository/configuration:44`); no directory is scanned, no file is opened that a name did not ask for. This is why `Library/` holding both preludes side by side is harmless: the separation is by file name, not by directory.

**Yes, one path loads CompilerLibrary and CompilerBuiltin into the interpreter**, and it is worth writing down because it is the obvious counterexample: `fortress walk -compiler-lib <file>.fss` calls `WellKnownNames.useCompilerLibraries()` and `Types.useCompilerLibraries()` inside the `walk` arm (`Shell.java:1107-1110`; the same flag exists on `disambiguate`/`desugar`/`grammar`/`typecheck` at `Shell.java:860-863`, and it is documented in the usage text at `Shell.java:149,198`).

Nothing under `ProjectFortress/tests/` and nothing in the JUnit harnesses passes `-compiler-lib`; a grep for the flag over the tree outside `.git`, `build/` and `explorations/` matches only `Shell.java` itself. The `testSystem` tests never go through `Shell.subMain` at all (section 3), so they cannot reach the flag even in principle.

The library world is **static mutable JVM state**, so the argument depends on nothing in a `testSystem` JVM ever calling `useCompilerLibraries()`. Every caller is an arm of `Shell.subMain` or a flag parse (`Shell.java:404,411,416,426,429,432,435,438,442,449,454,460,485,490,861,1108`); `SystemJUTest` and `FileTests` call none of them, and `build.xml:1197-1199` gives the shard's `<batchtest>` a fileset of `**/SystemJUTest.class` only, so no compiler test shares the JVM.

## 2. AnyType

`ProjectFortress/LibraryBuiltin/AnyType.fss` is seventeen lines: `native component AnyType`, `export AnyType`, `trait Any end`. The api `AnyType.fsi` is the same trait.

It is shared, and the map is right to call it so: it is in the interpreter's root list at `WellKnownNames.java:48-49` and in the compiler's at `:121-126`, and `compiler/disambiguator/TopLevelEnv.java:970-972` implicitly imports it into every component in both worlds ("For now AnyType needs to be implicitly imported").

An edit to `AnyType` is therefore global by construction and is excluded from the rule above. It is also the one file whose analysis cache entry collides across worlds — the cache file name is the api name plus a hash of its *source directory*, not its content (`compiler/NamingCzar.java:244-254`), and `AnyType` has one name and one directory in both worlds, so `AnyType-<hash>.tfi` is written by whichever world ran last. Under `testSystem` that channel is closed by a fresh per-shard cache (section 4, route D), but it is the reason `AnyType` is named as an exception rather than argued about.

`CompilerSystem` is in neither root list; it is imported explicitly by the programs that want it (`Library/CompilerSystem.fss:13` imports only `nativeHelpers.systemOps`). It is the safest of the four compiler-world files, not the most dangerous.

## 3. What `ant testSystem` runs, and against which library

`testSystem` (`build.xml:1199-1210`) deletes `ProjectFortress/test-caches`, then runs four `systemShard` macros (`build.xml:1167-1196`) in parallel. Each shard forks a JVM whose `<batchtest>` fileset is `**/SystemJUTest.class` and nothing else, with `fortress.suite.shard=i/4`, `fortress.caches` and `FORTRESS_CACHES` pointed at `ProjectFortress/test-caches/system-<i>`, `FORTRESS_THREADS=1`, and `java.io.tmpdir` inside `ProjectFortress/test-tmp`.

`SystemJUTest.suite` (`SystemJUTest.java:29-43`) sets `PhaseOrder.interpreterPhaseOrder` and `setCompiledExprDesugaring(false)`, then returns `FileTests.interpreterSuite(ProjectProperties.BASEDIR + "tests", …)`. It does **not** call `useInterpreterLibraries()`; it relies on the static default of `WellKnownNames.java:48-49`, which is the interpreter triple. That is sound here only because nothing in the shard JVM flips it (section 1), and it is the single most fragile step in the whole argument.

`interpreterSuite` (`FileTests.java:762-846`) walks the top level of `ProjectFortress/tests/` and makes one `InterpreterTest` per `.fss` (`:816-823`) and one `ShellTest` per `.sh` (`:820-823`). That is the 382: 381 `.fss` plus `concurrentPrinting.sh`, matching `map/test-coverage.md` A.3.

`InterpreterTest.justTheTest` (`FileTests.java:712-740`) is in-process: `Shell.setScala(false)`, then `Shell.specificInterpreterRepository(ProjectProperties.SOURCE_PATH.prepend(path))` (`:717`), then `getLinkedComponent` and `Driver.runProgram`. The library the programs link against is therefore exactly the graph roots of section 1 — `AnyType`, `FortressLibrary`, `FortressBuiltin` — plus whatever the program imports by name.

What the corpus imports by name, taken from every `import` in `ProjectFortress/tests/*.fss`: `AsciiVal ChunkedSparseArray Constants CovariantCollection File FileSupport FlatString Format Generator2 Heap IntMap List Map NatReflect NativeArray PrefixSet PureList QuickCheck QuickSort Random RangeInternals RecA RecB Reflect ReflectiveQuickCheck Set Shuffle SkipList Sparse Stream String System TestImports1 TestImports2 TestNative ThisShouldBeANonExistingAPI Timing Treap Writer a oddJuxtComp`. Every one of those resolves to an interpreter-world file in `Library/` or `ProjectFortress/test_library/`, and none of them is one of the four compiler-world names. Note `System` and `CompilerSystem` are two different files; the tests import the former.

## 4. The counterexample hunt

I looked for the counterexample rather than for confirmation. Seven routes, one at a time.

**Route A — a test imports a compiler-world api.** `grep -rln 'CompilerLibrary\|CompilerBuiltin\|CompilerAlgebra\|CompilerSystem' ProjectFortress/tests/` returns nothing. Not one of the 381 `.fss` mentions any of the four names anywhere, in an import or in a comment.

**Route B — a test imports something that in turn imports a compiler-world api.** Across `Library/`, `ProjectFortress/LibraryBuiltin/` and `ProjectFortress/test_library/`, the only files that mention `Compiler` at all are the four compiler-world pairs themselves and `Library/GeneratorLibrary.fss`/`.fsi`, which import `CompilerAlgebra` at line 13 of each. `GeneratorLibrary` is therefore a compiler-world file living in `Library/` — and it is imported by no file the interpreter can reach: outside `explorations/`, `build/` and the specification, the only references to it are `ProjectFortress/not_working_library_tests/GenTest8.fss`, twelve files in `ProjectFortress/BirdyLib/` (which `map/test-coverage.md` A.1 records as orphaned — no source file or build file names it), and `scala_src/typechecker/TraitTable.scala:56-59`. The interpreter's transitive import closure never reaches it. **This is the nearest miss in the tree and the one a planner should re-check if `Library/` gains files.**

**Route C — a `testSystem` test shells out to `fortress compile` or `fortress run`.** One does, and it is the strongest counterexample I found: `ProjectFortress/tests/concurrentPrinting.sh:18` runs `../../bin/fortress run printing/ConcurrentPrinting.fss`, which `bin/fortress:16-18` dispatches to `bin/run`, which launches `runtimeSystem.MainWrapper` with the compiler world's `bytecode_cache` on its classpath (`bin/run:41`, `bin/run_classpath:24-26`). **It does not count, for two independent reasons.** First, the script's last command is `rm -f $out` (`concurrentPrinting.sh:20`), so the script's exit status is `rm`'s, never `cmp`'s; `ShellTest` takes the exit code as definitive and ignores stdout and stderr, with the content checks dead-coded to `false &&` (`FileTests.java:629-632,644-648`). Second, the run cannot succeed in any case: `MainWrapper` is handed the string `printing/ConcurrentPrinting.fss` as a class name. Running the script by hand on this tree confirms both halves — `ClassNotFoundException: Resource not found : printing/ConcurrentPrinting/fss.class`, then `cmp: EOF on printing/test_output.txt which is empty`, then `EXIT=0`. Under `testSystem` it is even further from mattering, because `FORTRESS_CACHES` points the subprocess at an empty per-shard `bytecode_cache`. Test 382 of 382 is vacuous: it exercises the compiler-world runner and is structurally incapable of reporting anything about it.

**Route D — a shared cache.** The cache root is `ProjectProperties.CACHES` (`repository/ProjectProperties.java:283`), and every sub-cache hangs off it (`:285-299`), including `bytecode_cache` (`:294`) and the linker's `global.map` (`linker/RepoState.java:176`). `testSystem` deletes `ProjectFortress/test-caches` at the top of the target and gives each shard its own subdirectory through both `fortress.caches` and `FORTRESS_CACHES` (`build.xml:1200,1182-1183`), so no shard can read anything a compiler-world run wrote, and the subprocess of route C inherits that environment. Independently, the cache file name is api name plus source-directory hash (`NamingCzar.java:244-254`), so `CompilerLibrary-*.tfi` and `FortressLibrary-*.tfi` could not collide even in a shared directory. `AnyType` is the one name that would collide, which is why it is an exception.

**Route E — a shared jar or classfile.** `ant compileAll` compiles no `.fss` at all; the only `.fss` the build file names is the generated `Library/FortressAst.fss` (`build.xml:342,459-461,499`). The frozen Java stubs `ProjectFortress/src/fortress/AnyType.java` and `ProjectFortress/src/fortress/CompilerBuiltin.java` are hand-written Java, not generated from the `.fss`, and editing `CompilerBuiltin.fss` does not touch them. `fortress.CompilerLibrary.jar` and friends exist only inside a `bytecode_cache`, which route D isolates.

**Route F — shared front-end code that reads the compiler-world files.** `scala_src/typechecker/TraitTable.scala:46-59` hard-codes the four names `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `GeneratorLibrary` as a lookup order, and `compiler/disambiguator/TopLevelEnv.java:976-982` implicitly imports `CompilerAlgebra` — but that branch is explicitly guarded by `WellKnownNames.areCompilerLibraries()` (`:976`, and the guard is `_fortressLibrary.equals("CompilerLibrary")`, `WellKnownNames.java:140-142`), and `TraitTable` is in the type checker, which the interpreter runs inert (`fortress.compile.typecheck` defaults false at `Shell.java:1275`, `StaticChecker.java:166,288-290`). These are places where a *rename* of a compiler-world api would need a matching Java or Scala edit, which the rule's clause 2 already excludes.

**Route G — file-name capture.** This is the exception that survives. Both compiler-world directories are on the interpreter's source path, `findFile` returns the first match walking the path in order (`useful/Path.java:117-121`), and `InterpreterTest` prepends the test directory (`FileTests.java:717`). So a batch that *adds* `Library/Foo.fsi` makes the name `Foo` visible to every interpreter program, and a batch that renames a compiler-world api could shadow or unshadow an interpreter-world one. Today no such collision exists: none of the 43 names the `tests/` corpus imports is a compiler-world name. This is a hazard of adding files, not of editing them, and clause 2 of the rule covers it.

## 5. The counting question

`batched-climb-plan.md:170` says six of the eight rungs touched `Library/` or `LibraryBuiltin/` files. `iteration-cost.md:124` says `testSystem` guards "rungs that edit `Library/` and `LibraryBuiltin/` sources the interpreter also loads — which is five of the eight rungs".

From the eight commits themselves, ignoring `explorations/` and the corpora, here is what each rung touched:

| rung | commit | non-test files touched | world |
|---|---|---|---|
| 1 | `1bd8d3ad1` | `compiler/WellKnownNames.java`, `compiler/disambiguator/TopLevelEnv.java`, `scala_src/typechecker/TypeWellFormedChecker.scala` | shared Java/Scala; no library file at all |
| 2 | `cee79d3f1` | `Library/CompilerLibrary.fsi`, `.fss` | compiler-world library only |
| 3 | `4d419c9e8` | `compiler/codegen/CodeGen.java`, `compiler/codegen/VarCodeGen.java` | compiler-only Java; no library file |
| 4 | `b52a32ac2` | `Library/CompilerLibrary.fsi`, `.fss` | compiler-world library only |
| 5 | `9373985b4` | `LibraryBuiltin/CompilerBuiltin.fsi`, `.fss` | compiler-world library only |
| 6 | `54861b62a` | `LibraryBuiltin/CompilerBuiltin.fss` | compiler-world library only |
| 7 | `2027f519b` | `LibraryBuiltin/CompilerBuiltin.fss`, `compiler/NamingCzar.java`, new `nativeHelpers/simpleIntLiteralArith.java` | library **and** shared Java |
| 8 | `40216550c` | `Library/CompilerLibrary.fsi`, `.fss` | compiler-world library only |

Six rungs touched a file under `Library/` or `LibraryBuiltin/`: 2, 4, 5, 6, 7, 8. Five rungs touched *nothing but* compiler-world library files: 2, 4, 5, 6, 8. Rung 7 is the difference, and it is the only rung that is both.

**So the disagreement is about counting, and the numbers can be reconciled — but the reason `iteration-cost.md` gives is wrong about the worlds.** Its phrase is "`Library/` and `LibraryBuiltin/` sources the interpreter also loads". Not one of those six rungs edited a source the interpreter loads: every one of them edited `CompilerLibrary` or `CompilerBuiltin`, and the interpreter loads neither. `iteration-cost.md` is right that five rungs were pure-library rungs and right to recommend against dropping the suite on evidence it had not gathered, but its stated mechanism does not exist.

Turned around, the rungs that genuinely needed `testSystem` are the three the ledger does not count: 1, 3 and 7, the ones that touched Java or Scala. Rung 1 is the clearest — `TopLevelEnv.java` is the disambiguator, which is phase 2 of `interpreterPhaseOrder` (`compiler/phases/PhaseOrder.java`, and `map/modules-and-phases.md` B.1) and runs on every interpreter test. Rung 3 touched only `compiler/codegen/`, a module the interpreter never enters. Rung 7 touched `NamingCzar.java`, which the repository uses on both paths for cache file names, although the actual edit (`explorations/compile-ladder/rung7/probes/NamingCzar.java.diff`) adds one `else if` in front of a `throw new Error`, converting a throwing case into a handled one.

Under the rule above, five of the eight rungs of the last climb could have dropped `testSystem`, three could not, and a batch that merged rung 7's library half with rung 7's Java half would have had to keep it.

## What `map/test-coverage.md`'s "two corpora that never meet" does and does not answer

It is about something adjacent, and it does not settle this question.

`map/test-coverage.md` B says `tests/` and `compiler_tests/` share no file name, that `tests/` and `other_compiler_tests/` share 11 names whose contents all differ, and that no test compares interpreter output against compiler output for the same program. That is a statement about the *test programs* being hand-ported and divergent.

The question asked here is about the *libraries* those programs link against and about the machinery underneath, which that section does not cover. It does supply two facts the argument uses: that `library_tests/` is the compiler prelude's own suite inside `testFast` (A.1), and that `testSystem` is 381 `.fss` plus 1 `.sh` (A.3). Its A.1 row for `tests/` names the layers under test as "parser, desugarer, interpreter evaluator, interpreter prelude, task runtime", which is consistent with everything above.

Where the map needed extending rather than correcting: it does not record that the one `.sh` test is vacuous (section 4, route C), and its `map/modules-and-phases.md` B.13 sentence "`LibraryBuiltin` is shared by both worlds in the sense that the directory holds both builtins and `AnyType.fss`, which both use" is true but reads as weaker than it is — the sharing is exactly `AnyType` and exactly the directory, and nothing else.

## Not verified

Neither gate target was run for this file; `ant testFast` and `ant testSystem` were not invoked, as instructed. The 147.6 s figure is `iteration-cost.md:68`, not a fresh measurement.

The only thing executed was `ProjectFortress/tests/concurrentPrinting.sh` once, by hand, under JDK 25 with `FORTRESS_HOME` set and `FORTRESS_CACHES` unset, to confirm route C; it printed the `ClassNotFoundException` and the `cmp` complaint quoted above and exited 0. It writes and then deletes `ProjectFortress/tests/printing/test_output.txt`; `git status --porcelain` afterwards showed only the untracked `explorations/coordinator/next-climb/` directory this file is written into.

The claim that no `testSystem` JVM ever calls `useCompilerLibraries()` was established by enumerating the callers with grep over `ProjectFortress/src` and by reading the `testSystem` fileset; it was not confirmed by instrumenting a run.

The import closure of the `tests/` corpus was computed by grepping `^\s*import\s+` in `ProjectFortress/tests/*.fss` and taking the first dotted segment; a name introduced by a `.fsi` in `test_library/` that itself imports a compiler-world api would have been caught by the `Library`/`LibraryBuiltin`/`test_library` grep for `Compiler`, which found only the files listed in route B.

Whether `syntax_abstraction_tests/`, `demos/`, `SpecData/` or `not_passing_yet/` would be affected was not examined; none of them is in `testSystem` (`map/test-coverage.md` A.1), and the question was about the 382.

## Forks that are Pavol's, not mine

Whether to drop `testSystem` from compiler-world-only batches at all. The finding removes the rigor objection; it does not make the choice. The conservative reading is that four mechanical clauses are three more than a tired agent will check at 2 a.m., and that 147.6 s is cheap insurance.

Whether the vacuous `concurrentPrinting.sh` should be repaired. It is one of the 382, it is the only test in the interpreter suite that exercises `bin/fortress run`, and its exit status is masked by a trailing `rm -f` — so today it reports nothing, and the printing oracle `ProjectFortress/tests/printing/test_oracle.txt` is compared against an empty file every run. Repairing it means either deleting it, or making it exit on `cmp`, which would turn a silently-passing test red. Deleting a test to get green is reserved; so is the decision to make one fail.

Whether `Library/GeneratorLibrary.fss`/`.fsi` should be moved or renamed to stop being a compiler-world file that sits unmarked in a directory the interpreter reads. It is the only near miss in the tree, and it would make clause 2 of the rule easier to enforce.

Whether `iteration-cost.md:124` should be corrected in place. Its number is defensible under one reading and its mechanism is not; leaving it stands as a trap for the next reader of the ledger.
