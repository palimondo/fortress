# Cold read: c-run4-probe

Read with only `CLAUDE.md`, the `fortress-repo` skill's core and its `references/` (not `revival-changes.md` or `sources.md`). A general gap for every row: `records.md` lists the seven status words and says the last three close a row, but says "the row template (below) defines each", and the template is in the ledger, not the skill. So from the skill alone a worker knows only that `NEGATIVE-VERIFIED` and `NEGATIVE-BOUNDED` are open rows; it cannot tell what each word asks it to do, or how "bounded" differs from "verified". Also general: "parent of HASH" reads as "the probe was deleted at HASH; print it with `git show HASH^:PATH`" (the form `library.md` uses), and "full text: history, row N" as the row's earlier text in `explorations/fortress-gap-ledger-history.md` (`records.md`). Every row gives "Reproducer: none" but names a probe in its notes; a worker can follow that, but the reproducer cell and the notes read two ways (no committed reproducer vs no reproducer at all).

## Row 377

- **Defect:** On the compiled path, a component that imports the compiler prelude's `stringOps` natives with `import java` and calls `stringOps.asString` and `defaultAsString` on fifteen values of varied types (from `ZZ32` to `()`, including a tuple, a function, `Nothing` and `None`) fails in the code generator: `bin/fortress compile` exits 1 with an instruction dump and `Error trying to close method scope.`, raised at `compiler/codegen/CodeGen.java:2874` from an `ArrayIndexOutOfBoundsException` in ASM's `visitMaxs`. Three values compile and run. Removing any single one of the suspicious values does not fix it, so the trigger seems to be the count or the mix, not one value.
- **Where:** compiled path only (walk not stated); code generator, `CodeGen.java:2874`; the natives are the compiler prelude's `stringOps`.
- **Reproduce:** `git show ab067d9b6^:explorations/compile-ladder/rung-default-rendering/probes/skeptic/Sk2OldNew.fss` to a file, then `bin/fortress compile` it (measured at c124c6b65); the passing three-value control is `Sk2NewOne.fss` in the same folder.
- **Status:** open implementation gap in the code generator; nothing says it waits on a question, so a worker would build a fix (find what in the larger method breaks the frame/max computation).
- **Could not resolve:**
  - "fifteen values from `ZZ32` to `()`": the list of the fifteen is not given; only five are named. Unclear wording (the probe gives it).
  - Whether walk was tried. The skill asks that a row say which paths show a defect; this row does not. Unclear wording / missing fact.
  - Whether the defect is about `stringOps` at all or about any method of that size: the claim ties it to `stringOps`, the notes suggest a size or count limit. Reads two ways.
  - `stringOps` itself: not in the skill (the skill has `import java` and `nativeHelpers` but not this helper). Concept I lack, but resolvable from the tree.
  - `NEGATIVE-VERIFIED`: see the general note.

## Row 100

- **Defect:** An object that extends both `ZeroIndexed` and `DelegatedIndexed` inherits an abstract subscript `opr[r: Range[\ZZ32\]]` (declared at `Library/FortressLibrary.fss:2055`) and must define it; the documentation of the mix-in does not say so. Walk refuses such an object at load: 'Object Z does not define an abstract method declared in type ZeroIndexed: ... _[_](Range[\ZZ32\]):ZeroIndexed[\RR64\]'. The gap is the missing documentation (and perhaps a missing default body), not the load check, which is working as `interpreter.md` describes.
- **Where:** walk (load check of inherited abstract methods); the library, `Library/FortressLibrary.fss:2055`, the traits `ZeroIndexed` and `DelegatedIndexed`.
- **Reproduce:** `git show e879b6a44^:explorations/gap-ledger-probes/g22.fss`, run it under walk (c124c6b65): rc=1 with the message above. Second probe for the coexisting subscripts: `git show ed6dafb52^:explorations/run-b/probes/worker/w07_subscripts.fss`.
- **Status:** open library gap; workaround given (define `opr[r: Range[\ZZ32\]]` in the object, or implement `Generator` directly). A worker would fix it in the library (document the requirement, or give `ZeroIndexed`/`DelegatedIndexed` a default range subscript), but the row does not say which fix is wanted.
- **Could not resolve:**
  - "before the old run-time stop" and "(row 649)": the row implies that before row 649's check, the failure was at run time, not at load. What failed at run time is not said. Unclear wording; needs row 649.
  - "the mix-in's documentation does not say": which mix-in (`ZeroIndexed` or `DelegatedIndexed`), and where that documentation is. Reads two ways.
  - "On a plain object the `List` and `Generator` subscripts coexist": which subscripts these are (`opr[i: ZZ32]` vs `opr[r: Range]`?) and why it matters to the claim. Unclear wording.
  - "carrier": not a Fortress term in the skill; I read it as "the object that mixes in the traits". Unclear wording.
  - Whether the compiled path shows it: not said.

## Row 221

- **Defect:** A library matrix (`Array2`) is a generator of all its cells, because it extends `StandardMutableArrayType` (`Library/FortressLibrary.fss:2653-2655`). So a reduction such as `SUM m` over a matrix sums every cell (APL's `+/,m`, 28) and does not reduce along the last axis (APL's `+/m`, the row sums `6 22`). The row records this as a design limit, plus the fact that a library array needs no mix-in to be a generator.
- **Where:** library, `Array2` / `StandardMutableArrayType` in `Library/FortressLibrary.fss`; path not stated (presumably walk, from the APL work); the APL exploration's `AplCore.fss`.
- **Reproduce:** the old probe `explorations/apl/rung-1/r13_generator.fss` no longer runs: with `explorations/apl/base` on `FORTRESS_SOURCE_PATH`, walk at c124c6b65 stops in `aplVec` (`AplCore.fss:52`) with 'Closure/Constructor for fill param 1 (v:RR64) got arg FnExpr', and after a rename in a copy it prints `|v| = 5` and then stops at `AplCore.fss:42`. So there is no working reproducer today; the numbers `6 22` and `28.0` are from an earlier run.
- **Status:** design limit, open: as I read it, leave the library as it is and use the workaround (one wrapper per reduction overloaded on rank, as `aplSumLast` in `AplCore.fss`). Nothing here asks for a fix. But the broken probe is a second, unstated defect: a worker cannot tell whether to repair `AplCore.fss`.
- **Could not resolve:**
  - "silently not `+/m`": whether "silently" means that the specification expects `+/m` and the library differs, or that APL users would expect it. The specification cited is about defining generators; what it says about matrices is not given. Unclear wording.
  - "since f3b62bc83 named the function form `tabulate`": I read it as "commit f3b62bc83 renamed the array constructor that takes a function to `tabulate`", so `AplCore` calls the old name with a function. Reads two ways; unclear wording.
  - "renamed in a copy, it prints `|v| = 5`, then stops at `AplCore.fss:42`": what stops at line 42, with what message. Unclear.
  - "Measured before": before what (the rename? which commit?). Unclear wording.
  - APL notation `+/,m` vs `+/m`: a concept outside the skill; I know it from APL, a Fortress-only worker might not. Language concept (not Fortress).
  - "with no mix-in at all": as against `ZeroIndexed`/`DelegatedIndexed` (row 100)? Reads two ways.

## Row 694

- **Defect:** In the compiled checker, a dotted call whose integer-literal arguments need a coercion considers a declaration that the receiver's `override` has replaced. With trait `A` declaring `f(x: ZZ32, y: ZZ32)` and `B` declaring `override f(x: Number, y: ZZ32)`, `B.f(3, 4)` is refused: 'Ambiguous coercion in method invocation B.f: ... (ZZ32, ZZ32)->String; (Number, ZZ32)->String.' The same message comes without `override`. With `ZZ32` variables as arguments (no coercion) the override does remove `A`'s `f`, and it checks. Walk runs it and prints `B`.
- **Where:** compiled path, the static checker (`bin/fortress typecheck`), overloading resolution under coercion of literals; walk is fine.
- **Reproduce:** write `A`, `B` as above with `B.f(3, 4)` and run `bin/fortress typecheck` (c124c6b65): rc=255 with that message. No probe is named; the row gives enough to write one, and says a `typecheck` test needs no code generator.
- **Status:** open implementation gap in the checker; build a fix (drop overridden declarations from the coercion candidate set, as the non-coercion path already does).
- **Could not resolve:**
  - "siblings: 391, 610, 650, 653": the skill does not define "siblings"; I read it as "related rows, perhaps one root cause". Unclear wording / record term not in the skill.
  - "row 650 does not stop a reproducer": I read it as "row 650 (a code-generator defect) would block a compiled run, but `typecheck` stops before code generation". Without row 650 this is a guess. Unclear wording.
  - Where `B` is declared relative to `A` (trait or object, does `B` extend `A`?) and what the `String` return types are: "`B`'s `override`" implies `B extends A`; the message shows `->String` for both, but the second sentence gives `A`'s `f` the return `Any`. Two setups seem mixed. Unclear wording.
  - "`B.f(3, 4)`" when `B` is a trait: calling a method on a trait name needs `B` to be an object. Reads two ways.
  - "without `override`, 'Invalid overloading of f in trait B'": which case this belongs to (the `ZZ32` one, I think). Unclear wording.

## Row 555

- **Defect:** Under walk, a call of a generic function with one F-bounded type parameter, `fF[\T extends Cmp[\T\]\](a: T, b: T)`, fails when its two arguments' types have two or more unrelated minimal common supertypes. With `Apple` and `Cherry` each extending `Red` and `Round` (each a `Fruit` and a `Cmp` of itself), `fF(Apple, Cherry)` stops rc=1: 'Cannot unify Any(...FTypeTop) with Cmp[\T\](...TraitType) abm=T=(Any,Any)'. Walk's join falls back to `Any`, which fails the bound.
- **Where:** walk only, the inference of static arguments at a call (the join of argument types against a self-referencing bound).
- **Reproduce:** write the declarations above and run under walk (c124c6b65). Detail in `explorations/compile-ladder/rung-walk-instance/REPORT.md` section 12.
- **Status:** open, but in practice blocked: the example is illegal Fortress (`Apple` extends two instantiations of `Cmp`, which the skill confirms is forbidden), no legal example is written, and the specification does not settle F-bounded parameters ("P1 unanswered"). So a worker should not build a fix: first write a legal reproducer, and the semantics wait on a question.
- **Could not resolve:**
  - The claim and the notes disagree on what fails: the claim says "fails when the bound mentions itself", the notes say the only example is illegal and "a legal form of the claim is not written". So it is unclear whether the defect exists in legal code at all. Unclear wording, and it weakens the claim.
  - "P1 unanswered": not a FACTS (`F-`) or POSITIONS (`P-`) number in the skill's form; perhaps a question in the cited report. Record term not in the skill.
  - `RpFJoin`: a probe name, a test name or a class? Unclear.
  - `abm=T=(Any,Any)`: interpreter output I cannot read. Concept I lack.
  - The skill says that under walk a parameter whose bound names itself "stays open, and every value passes it"; this row says such a call fails. Contradicts the skill, or applies only when the join is taken. Reads two ways.
  - "siblings: 589, 591": as in row 694.
  - `Fruit`'s role: not needed for the failure? Unclear.

## Row 432

- **Defect:** Under walk, a big operator applied directly to a list literal of numerals fails dispatch: `SUM <|1, 2, 3|>`, `PROD <|1, 2, 3|>`, `SUM <|1.5, 2.5|>`, `SUM <| n^2 | n <- 1#3 |>` and `BIG MAX <|1, 2, 3|>` stop rc=1 with 'Failed to find any matching overload, args = (ArrayList[\Int\])' (or `FloatLiteral`). Cause: walk types the list from its elements' run-time class, `Int` (the literal's class), and `Int` is not an `AdditiveGroup[\Int\]`, so `T` fixed to `Int` through `BIG +`'s `Generator[\T\]` parameter fails its F-bound.
- **Where:** walk only (as stated); big operators over `List` literals; the `List` library and walk's typing of list literals (row 20).
- **Reproduce:** in a component that imports `List`, run any of the expressions above under walk (c124c6b65). Script: `git show ab067d9b6^:explorations/compile-ladder/rung-flat-tower/bare-sum.sh`.
- **Status:** open implementation gap in walk; a worker could build a fix (type a list literal of numerals as `ZZ32`/`RR64`, or let the bound see through the literal type), but the specification leaves a numeral's relation to integer types open, so the right fix may wait on that. Workaround: `<|[\ZZ32\] ...|>` or `<|[\RR64\] ...|>`.
- **Could not resolve:**
  - `Int` and `FloatLiteral`: the skill's number types do not include `Int`; I read it as walk's run-time class of an integer literal, an `AdditiveGroup[\ZZ32\]`. Concept I lack.
  - "F-228's join does not apply": F-228 is a FACTS entry (printable with `$T 'F-228'`), presumably the walk rule (in the skill) that a reduction without static arguments uses the declared type or the join. Why it does not apply ("`Int` fixes `T` through ... `Generator[\T\]`") is not clear to me. Unclear wording.
  - Whether the compiled path shows it: not said; the skill asks for it.
  - "bare": I read it as "with no type annotation on the literal and no declared result type". Reads two ways.
  - "siblings: 20": as in row 694; row 20 is also cited as the cause.

## Row 817

- **Defect:** The compiled checker refuses the team's demo `ProjectFortress/demos/trips.fss`, which walk runs: 18 type errors. Among them: seven `generator` calls whose function it types `ZZ32->List.List[\Any\]` (lines 113, 130, 139, 146, 153, 199, 216); eight `__generate` at `Reduction[\List.List[\Any\]\]`; `seq` of a `Range[\ZZ32\]` (303); `perfectSqrt`'s body typed `AnyMaybe` (82); 'Cannot assign to immutable variable: approx' (76); 'Missing parameter type for' `trips`, `xs`, `ps` (232, 255, 263); 'TryChecker returned an untyped expr' (286); and an `OptionUnwrapException` in the overloading stage (`scala_src/typechecker/OverloadingChecker.scala:129`).
- **Where:** compiled checker (Scala typechecker and its overloading checker), on the demo `trips.fss`; walk is fine.
- **Reproduce:** `DistanceMulti -order check -setting any ProjectFortress/demos/trips.fss` with the distance stage's shadow classes at c124c6b65; or, I suppose, `bin/fortress typecheck` of the demo.
- **Status:** `NEGATIVE-BOUNDED`, causes "not each established": I read this as "the symptom is measured and bounded, but not yet split into defects". A worker would explore first (split the 18 errors into rows, some in the demo, some in the checker) before building a fix.
- **Could not resolve:**
  - Class "library bug (tests)": the claim is about the checker refusing a demo, which reads as an implementation gap (checker), or a bug in the demo program; "library" and "(tests)" both fit neither well. Unclear wording.
  - `DistanceMulti`, `-order check`, `-setting any`, "the distance stage's shadow classes": the skill names the distance stage but not this class, its flags, or "shadow classes"; the skill says the brief gives the stage's command. Concept/tool I lack.
  - Which errors are the checker's fault and which the demo's: 'Cannot assign to immutable variable: approx' may be a real error in the demo (the cited spec section is local variable declarations), or a checker misreading. Reads two ways.
  - "18" vs the listed items: seven + one + one + one + three + one + one + the exception = more than 18 if the eight `__generate` count; it is unclear what the 18 counts. Unclear wording.
  - `AnyMaybe`, `__generate`, `TryChecker`: checker internals not in the skill. Concepts I lack.
  - "siblings: 731": as in row 694.
