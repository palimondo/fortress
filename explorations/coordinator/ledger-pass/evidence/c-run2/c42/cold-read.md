# Cold read of c42 (rows 59, 79, 82, 319, 480, 482, 746)

Read with `CLAUDE.md`, the `fortress-repo` skill's SKILL.md, and lookups in `records.md`, `compiler.md`, `library.md`, `interpreter.md`, `tests-writing.md`, `specification.md`. The row template that defines the status words is in the ledger, which I may not read; I take `NEGATIVE-VERIFIED` as "the gap is confirmed and open" (records.md lists it among the words that do not close a row).

## Row 59

- **Defect:** Inside a parallel `for`, an unguarded `acc := acc + c` loses updates once there is more than one thread (a race), and the specification's reduction-variable form `acc += e` is not implemented. Wrapping the update in `atomic do … end` gives the right sum.
- **Where:** The class says walk, but the notes show both paths losing updates on the spec's `mySum` (walk 3343924325, compiled 4986607299, expected 5000050000). The missing feature is reduction variables (`Specification/basic/evaluation/reduction.tex:15` marks them not yet supported). Which component would implement them, the checker, the desugarer or walk, is not said.
- **Reproduce:** No reproducer. Run `SkMySumThreads.fss` (from `git show ab067d9b6^:explorations/compile-ladder/rung-spec-ranges/probes/skeptic/SkMySumThreads.fss`) at `FORTRESS_THREADS=4` on both paths and compare with one thread. The first probe ("the probe's unguarded loop", expected `5050 10100 15150`) is not named; its text is only in the history.
- **Status:** Open and confirmed. The row does not say what to build. The race itself is what the skill calls expected behaviour for unguarded writes ("Parallelism and mutable state"), so the fixable gap seems to be the missing `+=` reduction variable. Until that lands, use the workaround (`atomic`, or a reduction, row 60).
- **Could not resolve:**
  - "implementation gap (walk)": the notes show the compiled path failing too. Unclear wording, or a wrong class.
  - Whether the defect to fix is the race (a language consequence, not a bug) or the unimplemented `+=`. Unclear wording.
  - "the probe's unguarded loop": which probe. It is named only in the history. Unclear wording.
  - "a reduction (row 60)": I read it as a big operator such as `SUM` (skill), but the row does not say so. Clear enough.

## Row 79

- **Defect:** An integer literal such as `7` chooses a different `typecase` clause and a different overload on each path, with no error. Walk treats it as a `ZZ32`. The compiled path treats it as an `IntLiteral`, which matches no `ZZ32` clause and no `ZZ32` overload.
- **Where:** Both paths disagree. The class names walk as the side at fault, and "the specification favours the compiled run". The constructs are `typecase` and overload dispatch.
- **Reproduce:** No reproducer. A `typecase x: Object` with `ZZ32`, `String`, singleton and `else` clauses on `7` prints `other` compiled and `ZZ32` under walk. `ee[\nat n\](x: ZZ32): ZZ32 = 1` beside `ee(x: Any): ZZ32 = 2`, called as `ee(5)` and `ee(a)` with `a: Any = 5`, gives 1 under walk and 2 compiled. Probe at `git show c69cb2064^:explorations/compiler-probes/p33.fss`.
- **Status:** Open. P-76 says this stays a walk gap "until walk has static types", so leave it: no fix is expected now, and a worker should not assert either path's answer in a test. Printing P-76 would confirm this.
- **Could not resolve:**
  - `IntLiteral` as a type: the skill names it only as having glue bindings (library.md). What type a literal has, and why `ee(a)` with `a: Any = 5` also differs (the value is no longer a literal), are concepts I lack.
  - "The specification favours the compiled run": for both the typecase and the `ee(a)` case, or only the literal? Unclear wording.
  - Why `ee[\nat n\]` carries a static parameter that the call does not fix. It looks essential to the overload case, but the row does not say what it does. Language concept I lack.

## Row 82

- **Defect:** On the compiled path, `spawn` returns a thread object with no methods, so `t.val()` fails at run time with `No such method Thread[\IntLiteral\].val.` Under walk, it works and prints `p32 42`.
- **Where:** Compiled path, `spawn` expression. `object Thread[\T\]` is declared only in the interpreter's builtin (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:287`, `FortressBuiltin.fss:725`). Neither `CompilerBuiltin` nor `CompilerLibrary` declares it.
- **Reproduce:** No reproducer. Compile and run `git show c69cb2064^:explorations/compiler-probes/p32.fss`, then run it under walk.
- **Status:** Open. compiler.md forbids adding declarations to the compiler's prelude, so the fix seems to be the switch-over onto the one library, which declares `Thread`. So: wait for the switch-over, then check again. The row does not say this.
- **Could not resolve:**
  - What to do: "library gap vs spec (prelude)" points at the prelude, which may not be edited. The row does not say whether to wait for the switch-over or bind `Thread` some other way. Unclear wording.
  - "G12 of `explorations/compiled-path-gaps.md`" and "(row 61)": pointers I may not follow. They seem to add nothing that is needed.

## Row 319

- **Defect:** On the compiled path, `atomic do n := n + 1 end` on a mutable field of an object loses updates above one thread, because field reads and writes are not part of the transaction. Walk is exact.
- **Where:** Compiled path, code generator: `VarCodeGen.MutableFieldVar` uses a bare `GETFIELD` and `PUTFIELD` on a non-volatile field (`ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java:202-231`). Walk's `interpreter/env/ReferenceCell.java:25-29` holds fields and variables alike. `CodeGen.java:4620-4636` builds a `MutableFieldVar` for every field, mutable or not.
- **Reproduce:** No reproducer. Compile a program in which parallel iterations do `atomic do n := n + 1 end` on an object's `var` field 40000 times, and run it at `FORTRESS_THREADS=4`: five runs gave 34481 to 38910. At one thread it is exact. The probe text is only in the history.
- **Status:** Open; build a fix in the code generator. Because every field goes through `MutableFieldVar`, putting field access inside the transaction changes the code for every object's fields. A fix should first tell `var` fields apart from immutable ones (the team's TODO).
- **Could not resolve:**
  - "need to spot for 'final' fields": I read it as the team's TODO to treat immutable fields differently. Clear enough.
  - The probe's exact program (loop shape, object): it is only in the history. A worker can rebuild it from the claim. Unclear only in detail.

## Row 480

- **Defect:** In a `case` with no comparison operator, the compiled checker should pick ∈ when the guard is a collection, as the specification says. It picks `=` instead when the guard's type is a type variable bounded by a `Contains` type, or a union of `Contains` types. `=` applies without error, so the compiled clause never matches. Walk picks ∈ by testing the guard's value.
- **Where:** Compiled checker, `case` expression: `Functionals.scala:1396-1402`, `Types.isContainsType` (`Types.java:145-148`). It tests `ancestors(tt) + tt` for `Contains` only when the type is a `TraitType`, and answers false for anything else. Walk: `Evaluator.java:416`.
- **Reproduce:** No reproducer, and the probes are gone. Write `varGuard[\R extends Range[\ZZ32\]\](r: R, x: ZZ32) = case x of r => … end`, and a case whose guard is `(if b then 1:3 else 5#)`. Compile them in the one-library setting and see that a value inside the range does not match.
- **Status:** Open; build the fix the notes give: answer a type variable through its bounds, a union through all its members, an intersection through any member.
- **Could not resolve:**
  - "one-library world" and "the compiler's world": "world" is not in the skill. I read it as the checker run against the one library versus against the compiler's prelude, but how a worker runs the checker in the one-library world (the count stage?) is not said. Unclear wording.
  - `Contains`: a library trait I could not find in the skill. I guess it is the trait that supplies ∈. Language concept I lack.
  - `5#`: the `#` range form is not in the skill. Language concept I lack.
  - "the compiler's world picks ∈ for the type variable": so the defect shows only in the one-library world, but whether the union case also passes there is not said. Unclear wording.

## Row 482

- **Defect:** An extremum expression, `case most > of … end`, stops the compiled checker with `java.lang.Error: Not yet implemented`. Walk picks the clause.
- **Where:** Compiled checker: the `case` rule's extremum branch (`Functionals.scala:1413-1420`) calls `Types.makeTotalOperatorOrder`, whose body is `NI.nyi()` (`Types.java:372-377`). This happens with either library. Neither library declares a `TotalOperatorOrder`. Next in line, `CaseExprDesugarer.java:89-92` throws for a `case` with no condition expression.
- **Reproduce:** Run the expected-failure test `ProjectFortress/compiler_tests/XXXExtremumRungJ.test`. Walk's behaviour is in `ProjectFortress/tests/caseTest.fss:33-85`.
- **Status:** Open; build a fix, with three parts: implement `makeTotalOperatorOrder`, declare a `TotalOperatorOrder` so that the rule's subtype test passes, and fix `CaseExprDesugarer`. When the checker passes, the failure moves to the desugarer, so the `XXX` test's key must change with it.
- **Could not resolve:**
  - "in both worlds": same "world" question as row 480. I read it as both libraries.
  - Where `TotalOperatorOrder` should be declared, given that compiler.md forbids new declarations in the compiler's prelude. Not said. Unclear wording.
  - "on by default": I read it as a desugaring switch that is on (compiler.md, `useCompilerLibraries` sets the switches). Clear enough.
  - "By reading": the desugarer's throw was found by reading the code, not by running it. Clear enough.

## Row 746

- **Defect:** Walk's `if` accepts a clause without a binding whose value is a `Just` or a `Nothing` of a trait named `Maybe`, and treats `Just` as true and `Nothing` as false. The specification says that such a clause "must be an expression of type Boolean". Walk refuses every other value that is not a `Boolean`.
- **Where:** Walk, `if` expression: `forIf` and `maybeType` in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:595`, `:617-621` test the names `Just`, `Nothing` and `Maybe`. The specification is `Specification/basic/expressions/if.tex:54`.
- **Reproduce:** Run `ProjectFortress/tests/maybeTest.fss` under walk. It asserts walk's reading, so it passes. The team's own `maybeTest` and `naturalsTest` also use `if` on a `Maybe`.
- **Status:** Leave it. The class says deliberate, and the notes say the reading is a default that waits for the curator's review (F-239), not a decision. Do not change walk, and do not write a test of the chapter's rule, until the curator decides.
- **Could not resolve:**
  - "a clause without a binding": I guess it is an `if` whose test is a plain expression rather than a form that binds a name, but the binding form of `if` is not in the skill. Language concept I lack.
  - "NEGATIVE-VERIFIED" with "deliberate": whether the row counts as an open gap or as accepted behaviour. Unclear wording.
  - The Specification cell `basic/expressions/if.tex` has no `Specification/` prefix. The notes give `Specification/`, so it is resolved, but the cell alone could be read two ways. Unclear wording.
  - "their lines 21-22": lines 21-22 of both files, or of one? Unclear wording.
  - "revision box": I could not find it in the skill. I read it as the specification's marked note of a revival change. Unclear wording.
