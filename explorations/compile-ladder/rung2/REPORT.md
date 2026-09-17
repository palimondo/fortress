<!-- Rung 2 of coordinator/PLAN.md: `HasRank`, the rank marker trait, test-first.  Written 2026-09-17 by the worker that landed it. -->

# Rung 2: `HasRank`, the rank marker trait

Landed. One trait declared twice, in the api and in the component of `CompilerLibrary`; no Java, no Scala, no checker work; `ant testFast` and `ant testSystem` both at zero failures and zero errors; all 21 files of the subset clear the name with nothing moving down.

## Why this name and not the baseline's head

The baseline ranking in `compile-ladder/summary.txt` is pre-rung-1 and its head, `Equality`, is spent. Re-derived from `compile-ladder/rung1/raw/`, 20 of the 23 `Equality` files now stop on `ImmutableArray` at `Library/CovariantCollection.fsi:23`, which puts `ImmutableArray` at about 26 first-error files against `HasRank`'s 21.

`ImmutableArray` is not takeable under the plan's stop conditions. `Library/FortressLibrary.fss:1870` declares it `extends ReadableArray[\E,I\] excludes Array[\E,I\]` over `Range`, `TrivialOpenRange`, `Indexed` and `Generator`, and `Library/CovariantCollection.fss` implements `toImmutableArray`, `toArray` and `assignToArray` against a real backing store, so the rung cannot be written without choosing the array representation — the fork `coordinator/PLAN.md` reserves for Pavol.

`HasRank` is the largest name that is clean, and by the cascade ranking it is in fact the wider one: `HasRank` 41 files against `ImmutableArray` 29, second only to the `Maybe`/`Comprehension`/`BigReduction`/`MonoidReduction` block, which needs `Condition` and the generator tower.

## What the blocked files ask for

20 of the 21 stop at `Library/List.fsi:55` and `:68`, where `HasRank` is named only in `excludes` clauses: `trait AnyList excludes { Number, HasRank }` and `trait List[\E\] ... excludes { Number, HasRank, String }`.

The 21st, `tests/oddJuxt.fss`, stops at `ProjectFortress/test_library/oddJuxtComp.fsi:14`, `trait T excludes {HasRank, String} end`, the same marker use.

Nothing in either site needs an array. The name is a marker trait and the compiler world simply does not have it.

## The test

`ProjectFortress/library_tests/HasRankRung2.fss` and `HasRankRung2.test`, in the shape of `library_tests/Boolean.test` (`tests=`, `link`, `run`, `run_out_WIcontains=PASS`).

It exercises both uses the blocked libraries make. `trait Ranked2 extends HasRank` answering `rank(): ZZ32 = 2` with `object Grid extends Ranked2` stands for an array trait; `trait Unranked excludes { HasRank }` with `object Tape` stands for `AnyList`, `List` and `oddJuxtComp.T`; and `rankOf(x: HasRank): ZZ32 = x.rank()` uses the name as a type. `run()` prints `PASS` only when both answers come back.

On the tree as committed it failed with the ladder's own first error for the 21-file subset: `HasRankRung2.fss:31:23-28: HasRank is undefined.`, the same at `:37:27-32` and `:45:11-16`, `File HasRankRung2.fss has 3 errors.`, then `ClassNotFoundException: IO Exception in reading class file` on the run step because nothing was emitted, `Tests run: 2, Failures: 2, Errors: 0`.

No compiler test is added. The rung is a library declaration only, and the `compiler_tests`/`other_compiler_tests`/`library_tests` corpora are its regression guard, since every compiled program in them links `CompilerLibrary`.

## The edit

One trait in `Library/CompilerLibrary.fsi` and the matching one in `Library/CompilerLibrary.fss`, in a new "Array support" section immediately before the `Matrices (stub)` section, in the spelling of `Library/FortressLibrary.fsi:1058` and `.fss:1584`: `trait HasRank extends Equality[\HasRank\] excludes { Number }`, with `abstract rank(): ZZ32` in the api and `rank(): ZZ32` in the component.

No further wiring was needed. `CompilerLibrary` already imports `CompilerAlgebra.{...}` (`.fsi:15`, `.fss:18`), which rung 1 made implicit and where `Equality` lives, and `CompilerBuiltin.{...}`, where `Number` lives at `CompilerBuiltin.fsi:95`.

`CompilerLibrary` is the right home rather than `CompilerAlgebra`: it is where the compiler world's array-shaped declarations already are (`Matrix[\T, nat s0, nat s1\]` at `.fss:512`), and the array traits of a later rung will extend `HasRank` from there.

## Two deliberate departures from the interpreter's text

The `excludes` clause drops `AnyMaybe`. The compiler world has no `Maybe` at all (`CompilerLibrary.fsi:194-206` is wholly commented out, as is the `Condition` block above it), so the exclusion has no referent and no compilable program can violate it.

The interpreter's `opr =(self, other:HasRank): Boolean = false` is not redeclared. `CompilerAlgebra`'s `Equality[\T\]` already supplies `opr =(self, other: T): Boolean = (self === other)`, a different default, so the rung takes the inherited one and the test does not exercise `=` on a `HasRank`; that is a second declaration with its own overload question and it is not this rung's name.

Both departures are stated in the test's comment and in the library comment above the declaration.

The fallback that was prepared and not needed: `trait HasRank excludes { Number }` bare, in case `extends Equality[\HasRank\]` ran into the `comprises T` rule rung 1 had to work around. It did not. `Equality[\T\] comprises T` admits `HasRank` because `HasRank` is itself the `T`, and the five library components build clean.

## The gate

`../bin/fortress junit library_tests/HasRankRung2.test`: `link ... OK (time = 3712ms)`, `run ... PASS`, `OK (2 tests)`.

`ant testFast`: 47 suites, 1,381 tests, every `Tests run:` line at `Failures: 0, Errors: 0`; `LibraryJUTest` 57 → 59, the two new tests being the rung's `link` and `run`; `CompilerJUTest` 642; the compiler file tests 263.

`ant testSystem`: four shards, 97 + 95 + 95 + 95 tests, every one at `Failures: 0, Errors: 0`. It is untouched by construction: `CompilerLibrary` is compiler-world only.

No Java or Scala file changed, so no `ant compileAll`; the compiler-world library jars were rebuilt in the `repo-internals.md` order (`AnyType`, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem`) before anything was run.

## The subset, re-run

`rung2/run-subset.sh` over `rung2/subset.txt`, the 21 files whose first error was `HasRank` in `ladder.tsv`, with the private cache and private `java.io.tmpdir` of the baseline driver. The before pass was taken on the same tree with the two library files stashed, so the pair is a controlled before and after and not a comparison against the pre-rung-1 baseline; its outputs are in `raw-before/` and `results-before.tsv`, the after pass in `raw/` and `results.tsv`.

Every file still exits 255 — nothing in the subset compiles yet — and every one of the 20 `List.fsi` files loses exactly the two errors that `HasRank` raised, from 10 to 8, 331 to 329, 286 to 284, 16 to 14, 13 to 11. No new error appears anywhere.

| file | before | after |
|---|---|---|
| `tests/ArrayListQuick.fss` | disambiguate, `List.fsi:55`, `HasRank is undefined.` | disambiguate, `List.fsi:67`, `LexicographicOrder is undefined.` |
| `tests/CovariantTest.fss` | same | same |
| `tests/FunctionalMethodAsUnifyParam.fss` | same | same |
| `tests/ListTest.fss` | same | same |
| `tests/RandomTest.fss` | same | same |
| `tests/RangePrototype.fss` | same | same |
| `tests/RangeTest.fss` | same | same |
| `tests/Reversals.fss` | same | same |
| `tests/ShuffleTest.fss` | same | same |
| `tests/asifTest.fss` | same | same |
| `tests/bigEncloserCall.fss` | same | same |
| `tests/booleanGuard.fss` | same | same |
| `tests/errIN.fss` | same | same |
| `tests/importBig.fss` | same | same |
| `tests/mixedTypeAnnotation.fss` | same | same |
| `tests/newASCIIshorthands.fss` | same | same |
| `tests/quicksortTest.fss` | same | same |
| `tests/simpleBig.fss` | same | same |
| `tests/singleArgInference.fss` | same | same |
| `tests/whereTest.fss` | same | same |
| `tests/oddJuxt.fss` | disambiguate, `test_library/oddJuxtComp.fsi:14`, `HasRank is undefined.` | disambiguate, `tests/oddJuxt.fss:22:9-21`, `Function Nothing is not defined.` |

`tests/oddJuxt.fss` clears its imported api entirely and now reports two errors of its own instead of one in the library; both are `Nothing`, which `CompilerLibrary.fsi` carries only as the commented-out `(*) object Nothing end`. That is the file moving up, not down: the error moved out of an api it imports and into the program's own text.

## What moves

The ladder's pass count is unchanged at 59. The corpus gains one passing test, `library_tests/HasRankRung2`, which is what the rung is measured by.

The next name is `LexicographicOrder` at `Library/List.fsi:67`, for 20 of the 21. Its declaration reaches `StandardTotalOrder` (present, `CompilerAlgebra.fsi:16`) and `ZeroIndexed` → `Indexed` → `Generator` (absent), so it is its own rung and a larger one.

The ranking's head after this rung should again be re-derived from a fresh ladder run rather than read off any earlier table.

## Risk checked

No file under `compiler_tests/`, `other_compiler_tests/`, `library_tests/` or `not_working_library_tests/` declares a `HasRank` of its own, so the new prelude name collides with nothing in the gated corpora. This was the failure mode rung 1 hit with `library_tests/MaybeTest9.fss`; it does not recur here.

## Boundary

Files changed by this rung: `Library/CompilerLibrary.fsi` and `Library/CompilerLibrary.fss` (the trait), `ProjectFortress/library_tests/HasRankRung2.fss` and `.test` (new), this directory, `explorations/fortress-gap-ledger.md` (notes on rows 71 and 288, neither closed), `explorations/coordinator/FACTS.md` (one line), `explorations/microgpt-run-c-handover.md` (one sentence). Nothing was committed or pushed.

Ledger row 71 ("`CompilerLibrary` has no `HasRank`, `LexicographicOrder`, `Maybe`") is the row this touches; the rung removes one of its three names and does not close it, so it takes a note and not a `fixed <hash>`. Row 288 names the same six `List.fsi` names and is likewise noted, not closed.
