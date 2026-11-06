# Cold read: reconcile r1, clean.txt (rows 349, 71, 442, 732)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its `references/` (records.md, compiler.md, tests-writing.md, library.md) only. The status words are listed in `records.md`, but their definitions live in the ledger's row template, which a cold reader may not open. I read `NEGATIVE-VERIFIED` as "the gap was reproduced and is open". That applies to all four rows.

## Row 349

- **Defect:** On the compiled path, the prelude has no `widen` on `ZZ64` and no `widen` or `narrow` on `ZZ`. The checker refuses `widen` of a `ZZ64` and `narrow` of a `ZZ`, while walk runs both. One thing does work: `narrow` of a `ZZ32` (43) compiles, because the argument is coerced to `ZZ64` and `ZZ64`'s `narrow` runs. It gives 43 on both paths.
- **Where:** Compiled path only. The prelude is `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103-145` (`trait ZZ`) and `:147-208` (`trait ZZ64`, which has only `narrow`); the coercion is `CompilerBuiltin.fss:580`. Walk's declarations are `Library/FortressLibrary.fsi:646` and `:698-699`, at de6d905f5.
- **Reproduce:** Run `ProjectFortress/compiler_tests/XXXZZNarrowRungP.test` through `harness-one.sh` or `junit.sh`. Its name suggests it covers only the `narrow`-of-`ZZ` half. Nothing says which test holds the `widen`-of-`ZZ64` half. The likeliest reading is row 442's tests or the skeptic probe `SK3Tower.fss`, read with `git show ab067d9b6^:explorations/compile-ladder/rung-int-conversions/probes/skeptic/SK3Tower.fss`.
- **Status:** Leave it. Do not add the methods to the prelude (compiler.md bans prelude declarations). The `narrow` half waits on P-161 landing. The `widen` half closes at the switch-over, together with row 442.
- **Could not resolve:**
  - "P-161 (not yet landed) deletes `ZZ`'s `narrow` and `widen`". This is unclear wording, and it matters. The claim says the prelude's `ZZ` already lacks both, so the deletion must be in walk's library (`FortressLibrary.fsi:698-699`). That would close the gap by taking the methods out of walk, not by adding them to the compiled path. The row does not say which library, or what the specification says about `narrow` and `widen` on `ZZ`. A worker cannot tell whether `XXXZZNarrowRungP` asserts the specification's answer, as an `XXX` test must, or an answer that P-161 will make wrong.
  - "its probe": unclear wording. "its" can refer to row 442 or to the `widen` half.
  - "rung W's skeptic" against the test suffix `RungP`: provenance only, and it does not block.
  - "full text: history, row 349": clear. It points to the history file.

## Row 71

- **Defect:** On the compiled path, `import List` fails. `Library/List.fsi` and `Library/CovariantCollection.fsi`, which `List.fsi` imports, name eight types that the compiler's prelude does not declare: `ZeroIndexed`, `LexicographicOrder`, `Comprehension`, `BigReduction`, `MonoidReduction`, `Indexed`, `ImmutableArray` and `Array`. Walk runs the same program to `PASS`. `HasRank` and `Maybe` are declared, so they are not part of the gap.
- **Where:** Compiled path, at the checker. The refusals are raised inside the two apis, at the cited lines: 6 in `CovariantCollection.fsi` and 6 in `List.fsi`, which matches the 12 errors.
- **Reproduce:** There is no reproducer test. The notes give `tests/ListTest.fss` at `cc47b637d`: 12 errors and rc=255. I take this to mean `bin/fortress compile ProjectFortress/tests/ListTest.fss`, but the folder and the command are inferred, not stated.
- **Status:** Leave it. The prelude is deleted at the switch-over, so the gap should go away then. The row implies this but does not say that the row closes at the switch-over.
- **Could not resolve:**
  - Why the reproducer is `none` is unclear. tests-writing.md says `none` applies when no gated test can pass while the defect shows. A compile-time refusal looks like a candidate for an `XXX` compile test with `compile_err_contains`, so the row should say why it has none.
  - `tests/` is an unclear path: no root is given.
  - Otherwise clear.

## Row 442

- **Defect:** The compiled path's prelude lacks number conversions and operations that the specification states:
  - coercions of `ZZ32` and integer literals into `RR64`, and of `NN32` into `ZZ64`;
  - `RR64`'s `check` and `check_star`;
  - `/` on `ZZ32` and `^` on `ZZ64`;
  - shifts, and `GCD` and `LCM` on `NN32` and `NN64`.

  The notes add more:
  - `ZZ`, `ZZ64` and `NN64` lack `asRR64` and `asFloat`.
  - `StandardTotalOrder` lacks `MIN` and `MAX`, and `ZZ64`, `NN32` and `NN64` do not extend it.

  Observed effects:
  - `half(3)` is refused for an `RR64` parameter.
  - `MAX` or promotion of an `NN32` with a `ZZ32` gives a `ZZ`, not a `ZZ64`.
- **Where:** Compiled path only: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435` (`RR64`'s coercions), `:147-149` (`ZZ64`'s coercions) and `Library/CompilerAlgebra.fsi:16-22`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXInferPromoteNN32.test`, plus `XXXNNShiftRungP`, `XXXNNGcdLcmRungP` and `XXXMaxNN32IntoZZ64RungM`. Those three are named without a folder or extension; I assume they are `compiler_tests/*.test`.
- **Status:** Leave it. It closes at the switch-over (POSITIONS, "The library route."). Do not add declarations to the prelude.
- **Could not resolve:**
  - `check` / `check_star`: a library concept that the skill does not cover. I cannot tell what they do (a NaN check?).
  - "promotion" of an `NN32` with a `ZZ32": a concept the skill does not cover. The skill describes the number types as siblings with `coerce`, but says nothing of a promotion rule or a join of number types.
  - "the revised number chapters": unclear wording. Revised by whom, and when? The cells cite `Specification/`, not a revision.
  - Citing "Rational Numbers" in `numbers.tex` for conversions into `RR64` reads oddly. It may be the right section, but the row does not say why.
  - The class: this row is `implementation gap (prelude)`, while row 349 is `library gap vs spec (prelude)`, for the same kind of gap. It is unclear what the difference tells a worker.
  - The `widen` of `ZZ64` that row 349 hands to this row is not in this row's list.
  - "Also gated:" is clear: these tests also record the row.

## Row 732

- **Defect:** An object can extend a trait from an imported api, where the method body lives in the component that implements the api, and where that trait is not first in the object's `extends` clause. The code generator then gives the object no forwarder for that method. A call such as `pick(O)` dies at run time with `AbstractMethodError`. With the trait first in the clause, the method is inherited through the JVM class hierarchy and the call works. Walk works in either order.
- **Where:** Compiled path, in the code generator: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:968` (`dumpMethodChaining` forwards only declarations with a body, and the api's declaration has none) and `:934-940` (the first trait goes through the class hierarchy), at c124c6b65.
- **Reproduce:** There is no reproducer test. The notes give the probe:
  - api `Q1ApiB` with `trait B pick(self): String end`, and a component that exports it and gives the body `"b"`;
  - a program with `trait C other(self): String = "c" end`, `object O extends { C, B } end`, and a call `pick(O)`, compiled and run;
  - expected result: 'Receiver class ...$O does not define or inherit an implementation of ... pick?0()' of interface `Q1ApiB$B`;
  - `extends { B, C }` prints `b`.

  The implementing component's name is not given.
- **Status:** Build a fix. Nothing in the row defers it or ties it to the switch-over. Before the fix, write the gated pair that tests-writing.md requires for a run-time failure: `XXXName.test` plus `NameLink.test`.
- **Could not resolve:**
  - "forwarder" is not defined in the skill. I read it as a generated method on the object's class that delegates to the trait's body. I inferred this from the code citations.
  - Unclear wording: the Specification cell is `basic/traits.tex` without the `Specification/` prefix.
  - Why the reproducer is `none` is unclear. The specification settles the answer, the program can be observed, and tests-writing.md rule 2 asks for a gated `XXX` test.
  - "climb batch 16's Q1 probe": provenance only. The row has no "full text: history" pointer, which is fine for a new row.
