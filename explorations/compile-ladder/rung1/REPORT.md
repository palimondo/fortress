<!-- Rung 1 of coordinator/PLAN.md: the ladder's top first-error name, `Equality`, test-first. Written 2026-09-17 by the worker that ran it. Nothing committed here; the coordinator reviews and commits. -->

# Rung 1: `Equality`, the top first-error name

Not verified.

The rung did not land. The test is written and fails; the team's own route works for the test but takes the gate red on two counts, one of them outside the rung's boundary; the named fallback does not build at all. The working tree is back at `HEAD` except for the new test, this directory, and the one-line record in `FACTS.md` and the handover.

## The test

`ProjectFortress/library_tests/EqualityRung1.fss` and `EqualityRung1.test`, in the shape of `library_tests/Boolean.test` (`tests=`, `link`, `run`, `run_out_WIcontains=PASS`).

Two objects extend `Equality` and answer their own `opr =` with a constant, one `true` and one `false`, so a run that prints `PASS` shows the declared operator was called and not identity: `Other` is not equal to itself. This is the shape of the blocked interpreter tests `tests/GS3.fss` (`object G[\T\] extends Equality[\G[\T\]\]` with its own `opr =`) and `tests/EqualityOverloadBug.fss` (`object Bar extends Equality[\Bar\]`).

It fails today, on the tree as committed, with the ladder's own first error (`test-before.out`):

```
library_tests/EqualityRung1.fss:30:21-27: Equality is undefined.
library_tests/EqualityRung1.fss:34:22-28: Equality is undefined.
```

The test does not exercise `=/=`, which the task asked for, and the reason is a finding of its own. The compiler world declares `=/=` per builtin type only (`CompilerBuiltin.fsi`: `String`, `ZZ`, `ZZ64`, `ZZ32`, `NN32`, `NN64`, `IntLiteral`, `Character`) and has no `opr =/=(a:Any, b:Any)`. A user type that carries its own `opr =` therefore meets

```
Could not check call to operator NE
 - (Character, Character)->Boolean is not applicable to an argument of type (Same, Same).
 - ...
```

measured with a probe that imported `CompilerAlgebra` explicitly, so the name `Equality` was out of the way. The interpreter has the generic pair `opr =(a:Any,b:Any) = a SEQV b` and `opr =/=(a:Any,b:Any) = NOT (a=b)` at `Library/FortressLibrary.fss:95-97`; supplying `=/=` in the compiler world needs the generic `=` beside it, which enters every `=` overload resolution in every compiled program. That is a separate name and a separate rung, and it is recorded here rather than folded into this one. With `=/=` dropped, the same probe compiled and printed `PASS`, so the rest of the mechanism is sound.

## The route

### What the one line does, and what it does not

`WellKnownNames.java:124` is `//			   compilerAlgebra(),` inside `useCompilerLibraries()`. Uncommenting it puts `CompilerAlgebra` into `_defaultLibrary`, which is read in two places: `GraphRepository.roots()` (`GraphRepository.java:125-127`), so the api is built and linked as a root of every compilation, and `TypeNameEnv.implicitlyImportedApis()` (`TypeNameEnv.java:74-80`), which the disambiguator's `TopLevelEnv` uses to seed its on-demand imports.

That is not enough, and the test still fails on `Equality is undefined.` after `ant compileAll` and a full library rebuild. The reason is `TopLevelEnv`. Its constructor first filters the global environment down to what the compilation unit imports (`TopLevelEnv.java:72-84`), and the filter at `TopLevelEnv.java:967-976` keeps an api that nothing imports explicitly only if its name is `fortressBuiltin()`, `anyTypeLibrary()`, or `fortressLibrary()` with nothing named from it. `CompilerAlgebra` matches none of the three, so it is dropped from the filtered environment, and `initializeOnDemandImportedApis` then passes it to `addIfAvailableApi(..., errorIfUnavailable=false)`, which drops it silently. The implicit set is written down twice, in `defaultLibrary()` and in that hard-coded list, and only the second one is consulted for what a program can see.

So the route is two lines in two files, not one:

```diff
--- a/ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java
+++ b/ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java
@@ -121,7 +121,7 @@ public class WellKnownNames {
         _defaultLibrary =
             new String[] { fortressLibrary(),
 			   fortressBuiltin(),
-			   //			   compilerAlgebra(),
+			   compilerAlgebra(),
 			   anyTypeLibrary() };
     }
--- a/ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java
+++ b/ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java
@@ -969,6 +969,13 @@ public class TopLevelEnv extends NameEnv {
             } else if (name.getText().equals(WellKnownNames.anyTypeLibrary())) {
                 // For now AnyType needs to be implicitly imported
                 result.put(name, index);
+            } else if (WellKnownNames.areCompilerLibraries() &&
+                       name.getText().equals(WellKnownNames.compilerAlgebra())) {
+                // CompilerAlgebra declares Equality and StandardTotalOrder, which
+                // the compiler-world numeric traits already extend; it is in the
+                // compiler world's default library list (WellKnownNames
+                // .useCompilerLibraries), so it is implicitly imported too.
+                result.put(name, index);
             }
         }
```

`TopLevelEnv.java` is outside the boundary the plan draws for library rungs. It was written, measured and then reverted; it is recorded here for the coordinator to accept or refuse, not carried in the tree.

With both lines the new test passes, in isolation and inside the suite (`test-after.out`):

```
. link library_tests/EqualityRung1  OK (time = 2767ms)
. run library_tests/EqualityRung1 (330ms) PASS
```

### The gate

`ant testFast` with both lines in place: 47 suites, **4 failures**, 0 errors; `LibraryJUTest` 57 tests with 3 failures, `CompilerJUTest` 642 tests with 1. `ant testSystem` was not run, because the gate was already red and the interpreter path is untouched by the change.

Two distinct causes, both reproducible on their own.

**`library_tests/MaybeTest9.fss` (3 failures: compile, link, run).** The file declares its own `trait Equality[\T\] comprises T` at line 15, because the compiler prelude had none. With `CompilerAlgebra` implicit, the component's own declaration and the imported one collide instead of shadowing:

```
MaybeTest9.fss:15:7-13: Type name may refer to: Equality, CompilerAlgebra.Equality
```

six times. This one is inside the boundary: the local trait is a workaround for the missing prelude and deleting it is the natural follow-through. It was not done, because of the second cause.

**`compiler_tests/Compiled9.ai` (1 failure).** A `typecheck`-only test, `case 5#10 of ...`, which with `CompilerAlgebra` implicit dies in the type analyzer:

```
/home/user/fortress/Library/CompilerAlgebra.fsi:24:17:
T is not in the kind env [][][]
```

Reproduced standalone with `../bin/fortress typecheck compiler_tests/Compiled9.ai.fss`; the three neighbouring `Compiled9.*` typecheck tests are clean. The site is `TypeAnalyzer.staticParam` (`scala_src/types/TypeAnalyzer.scala:764-766`), which raises `bug(...)` when a `VarType` is looked up in an empty kind environment; the span points at the `T` of `trait Equality[\T\]` in `CompilerAlgebra.fsi`. Dropping the `comprises T` clause from `Equality` in both `CompilerAlgebra.fss` and `.fsi` was tried and does not move it, so it is not the `comprises` clause; the query is reached with the trait's static parameter out of scope. That is a checker defect, outside `Library/`, `LibraryBuiltin/` and the two runtime files, which is the plan's stop condition.

### The fallback, refuted

The named fallback was to declare what the test needs in `Library/CompilerLibrary.fss` and `.fsi`, in the spec's spelling (`Library/FortressLibrary.fsi:73`):

```
trait Equality[\T extends Equality[\T\]\]
    opr =(self, other:T): Boolean = self === other
end
```

It does not build. `CompilerAlgebra` already declares `Equality`, and `Library/CompilerLibrary.fsi:15` and `.fss:18` import it with `import CompilerAlgebra.{...}`, as does `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:14` by name. Adding the trait to `CompilerLibrary` makes every use of `Equality` in `CompilerBuiltin.fsi` ambiguous, and the compiler-world library stops compiling at its first file:

```
CompilerBuiltin.fsi:443:30-36: Type name may refer to: CompilerAlgebra.Equality, CompilerLibrary.Equality
...
File AnyType.fss has 14 errors.
```

fourteen errors on each of the five library components in turn. Two gated tests, `other_compiler_tests/MaybeTest15a.fss` and `MaybeTest16.fss`, would meet the same ambiguity: both carry `import CompilerAlgebra.{...}`. The fallback is not a smaller version of the route; it is a second `Equality`, and the compiler world already has one.

## The subset, before and after

The 23 files whose first error was `Equality` (`subset.txt`, taken from `ladder.tsv`), re-run through `fortress compile` and `fortress run` by `run-subset.sh`, which repeats the baseline driver's steps and its private-cache and private-`java.io.tmpdir` discipline; `default_repository/caches` was not used for this. The "after" column is the two-line route; the "before" column is the baseline's. Raw outputs in `raw/`, exit codes in `results.tsv`.

| file | before | after |
|---|---|---|
| `EqualityOverloadBug.fss` | disambiguate, `Equality is undefined.` | typecheck, `Function body has type String, but declared return type is Bar.` |
| `FileConversion.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `GS3.fss` | disambiguate, `Equality is undefined.` | typecheck, `Could not check call to operator =` |
| `GeneratorNullPointer.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `IntMapTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `Maybe is undefined.` |
| `MapTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `NumeralTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `QuickCheckTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `ReflectTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `ReflectiveQuickCheckTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `SetMapImport.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `SetTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `StringTests.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `TestCompiledImports.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `TypeImportBug.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `WordCountSmall.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `atomicsets.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `caseWithSemicolons.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `explicitStaticArgsToAggregates.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `mapCombine.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `parametricListCompr.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `parametricManiaCompr.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `setSum.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |

All 23 clear `Equality`; none moves down. Two move a phase, `EqualityOverloadBug.fss` and `GS3.fss`, both from disambiguate to typecheck, and both then stop on their own contents rather than on a library name: `EqualityOverloadBug.fss:16` declares `getter asString():Bar = "Bar"`, and `GS3.fss` calls `=` between two instantiations of a generic object. The other 21 stop on the next library name in the same phase, `ImmutableArray` in 20 files and `Maybe` in one; `ImmutableArray` is the fifth name on the baseline's ranking, and 20 of its files were behind `Equality`, so the two names are one queue, not two.

The reading is that `Equality` is a cheap name to supply and it buys two files. The ladder's first-error ranking counts the name a file stops on, not the work behind it; this rung is the first measurement of how much of the ranking is a single file-set shuffling one name forward.

## Files

Added and left in the tree: `ProjectFortress/library_tests/EqualityRung1.fss`, `ProjectFortress/library_tests/EqualityRung1.test`, this directory (`REPORT.md`, `run-subset.sh`, `subset.txt`, `results.tsv`, `raw/`, `test-before.out`, `test-after.out`). One line in `explorations/coordinator/FACTS.md` and one sentence in `explorations/microgpt-run-c-handover.md`. No ledger row is closed by this rung, so `explorations/fortress-gap-ledger.md` is untouched.

Reverted to `HEAD` after measurement: `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java`, `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java`, `Library/CompilerLibrary.fss`, `Library/CompilerLibrary.fsi`, `Library/CompilerAlgebra.fss`, `Library/CompilerAlgebra.fsi`. `ant compileAll` was run again on the reverted sources and the compiler-world library was rebuilt in the `repo-internals.md` order; `library_tests/Integer1` compiles and prints `PASS`, and `EqualityRung1` fails again on `Equality is undefined.`

One consequence to decide before committing: `EqualityRung1.test` is picked up by `LibraryJUTest`, which runs every `.test` file under `ProjectFortress/library_tests/`, so committing it as it stands takes `ant testFast` red by two tests. Either it lands together with whatever closes the rung, or it moves to `ProjectFortress/not_working_library_tests/`, which is the corpus outside the gate.

## What the rung needs

The name `Equality` is one uncommented line plus one list entry away, and the two edits are small and local. What stops them is not the library.

`compiler_tests/Compiled9.ai` needs `TypeAnalyzer.staticParam` to be reached with the trait's static parameters in the kind environment, or its caller to stop asking. That is a checker edit.

`library_tests/MaybeTest9.fss` needs its local `trait Equality` deleted, which is inside the boundary and is the right change once the prelude carries the trait.

`=/=` on a user type needs the generic `opr =(a:Any,b:Any)` and `opr =/=(a:Any,b:Any)` that the interpreter has and the compiler world does not; that is a library edit whose blast radius is every `=` in every compiled program, and it should be measured on its own.
