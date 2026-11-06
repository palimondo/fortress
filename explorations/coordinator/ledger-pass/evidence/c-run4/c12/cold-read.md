# Cold read: c-run4/c12

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and `references/` records.md, tests-writing.md, tests-running.md, compiler.md, interpreter.md (by search).

Terms common to every row, not repeated below:
- `NEGATIVE-VERIFIED`: records.md names the seven status words but says "the row template (below) defines each", and the template lives in the ledger, which a worker reads only by query. The skill itself gives no definition. I read it as "the defect is confirmed and open", so a worker builds a fix. Concept missing from the skill (the template is one query away, so a worker can resolve it; a cold reader cannot).
- `siblings: N, M`: not defined in the skill. I read it as "related rows to read beside this one", but it could also mean "same root cause, one fix closes all". Unclear wording.
- `Found by: climb batch N rung X` and "rung X's skeptic": batch/rung/skeptic are process words the skill uses only in paths (`climb-batch-*`, `rung-*`). Harmless: a worker does not need them to act.
- `full text: history, row N`: resolved by records.md (`explorations/fortress-gap-ledger-history.md` keeps the earlier text).
- `at c124c6b65`: the commit the file:line citations were taken at. Clear.

## Row 650

- **Defect:** The code generator refuses any function or method declared with the `override` modifier, with "Don't know how to compile this kind of FnDecl". So the team's `tests/disp0.fss`, which the compiled checker accepts, does not compile. Walk runs it (`f PASS`, `g PASS`).
- **Where:** compiled path, code generator: `CodeGen.fnDeclCompilableModifiers` (`CodeGen.java:2950-2952`) lists only getter, setter, `io`, `private`, `abstract`, `test`; `forFnDecl` (`:3019-3028`) calls `sayWhat` on any other. A code-generator wall (compiler.md, which also cites row 650).
- **Reproduce:** run the gated `ProjectFortress/compiler_tests/XXXOverrideModifierCodeGeneration.test` through `junit.sh`; or `bin/fortress compile` on `disp0.fss` and see the message.
- **Status:** open, a fix to build: add `override` to the compilable modifiers, then check what dispatch does. Promote the `XXX` test with the fix.
- **Could not resolve:**
  - `tests/disp0.fss`: which tests folder; I take `ProjectFortress/tests/`. Unclear wording (minor).
  - "The chapter's draft note says the modifier is not yet supported": two readings, (a) the team's code generator did not support it yet, or (b) the specification itself defers `override`, which would make the row's specification cell weaker. Unclear wording; it matters to whether this is a gap or a deferred feature.
  - "Whether the compiled dispatch then leaves out a declaration a type does not provide is not measured": I cannot tell which declaration is meant (the overriding one? an inherited one that the type does not redeclare?). Unclear wording; it reads as a warning that the fix may expose a second defect.

## Row 653

- **Defect:** The compiled checker accepts an `override` that overrides nothing, which the traits chapter makes a static error (`traits.tex:670-671`). Example: in `object B extends A`, `override f(x: String): String` beside `A`'s `f(x: ZZ32): String`; `fortress typecheck` exits 0. Walk refuses it at load (`Constructor.java:699`), except in the shapes of row 693.
- **Where:** compiled path, checker: its one reader of `override` is `scala_src/useful/STypesUtil.scala:1701`, which uses it only for hiding; no check that something is overridden.
- **Reproduce:** no reproducer. Write the example as a program and run `bin/fortress typecheck` on it: exit 0. `compile` cannot show it, since it stops at row 650's wall first. The walk side is `OverrideNothingWalk` (a test name, folder not given; I take `ProjectFortress/tests/`).
- **Status:** open, a fix to build in the checker. No gated test is said to exist, and the row does not say why (I infer: `compile` stops at row 650, so an `XXX` compile test would see the wrong failure until 650 is fixed).
- **Could not resolve:**
  - "to let a wider declaration hide an inherited one": "wider" (wider domain? wider return type?) and "hide" are not defined in the skill. Concept missing.
  - Last sentence: "Under the bound `Any`, `override f(x: Any)` beside an inherited `f[\T\](x: T)` overrides nothing, so `XXXOverrideGenericReturnTypeNotSubtype` bounds it by `Object`." I read it as: that other test bounds `T` by `Object` so that its `override` does override something and the test checks its own point. But "overrides nothing" at equal-looking types contradicts my intuition; interpreter.md says "an `override` at an inherited declaration's own parameter types overrides nothing", which I also cannot square with ordinary overriding. Concept missing (what Fortress counts as overriding) and unclear wording.
  - No reason given for "Reproducer: none". Unclear wording.

## Row 391

- **Defect:** On the compiled path, two overloads `f(x: A)` and `f(x: B)`, where `A` and `B` exclude each other and both have a `coerce` from `N`, compile, though neither is more specific for an `N` argument; the overloading chapter's Incompatibility and Meet Rules refuse such a set. The call site is already fixed (`8dc1a74d9`): a call `f(n)` is refused, "Ambiguous coercion". What is open is the declaration check.
- **Where:** compiled path, checker: both `OverloadingChecker` classes (`scala_src/overloading/` and `scala_src/typechecker/`) read no coercion.
- **Reproduce:** write the declarations (no call) and `bin/fortress compile`: it succeeds. Other shapes: `k(x: Wide, y: Narrow)` beside `k(x: Narrow, y: Wide)`; `g(z: T64)` beside `g(z: T128)`, both coercing from `T32`. The probe the notes name is gone from the tree, so the worker writes it from the claim.
- **Status:** open, a fix to build in the overloading checkers. No gated `XXX` test can hold it today, since an expected-failure compile test is red while the compile succeeds (agrees with tests-writing.md, "Saw wrong failure"). The fix's test is a plain gated compile test of the refusal.
- **Could not resolve:**
  - "a numeral tie reads `ZZ32`" (with `InferNumeralTie`): I cannot tell what a numeral tie is, or whether it is part of this defect or of the fixed half. Concept missing.
  - Specification cell cites `advanced/overloading.tex` without the `Specification/` prefix, unlike rows 650/653. Unclear wording (minor).
  - "Incompatibility Rule": not in the skill's overloading summary (which names No Duplicates, Meet, Return Type). Concept missing, findable in the chapter.

## Row 392

- **Defect:** On the compiled path, a type ascription coerces: `x = NarrowOf(1) typed Wide` compiles and `x` holds a coerced `WideOf`. The specification excludes ascriptions from coercion; walk refuses with "The type of expression NarrowOf is not a subtype of Wide". So the program should be a static error.
- **Where:** compiled path, checker: `Misc.scala:684-686` checks the `typed` subexpression against the ascribed type as an expected type, and that check inserts a coercion when the type is not a subtype (`STypeChecker.scala:479-481`).
- **Reproduce:** a program with `Narrow`/`Wide` types, `Wide` declaring a `coerce` from `Narrow`, and the ascription; compile and run: `x.big` is `1` at 1 and 4 threads. Probe gone from the tree.
- **Status:** open, a fix to build in the checker (refuse the ascription). No gated test today, for the same reason as row 391.
- **Could not resolve:**
  - `NarrowOf`, `WideOf`, `Wide`, `.big`: never defined. I infer `NarrowOf` is an object of type `Narrow`, `WideOf` an object of type `Wide` with field `big`, and `Wide` coerces from `Narrow`. Unclear wording; a worker must guess the program.

## Row 693

- **Defect:** Walk does not refuse an `override` that overrides nothing, when the inherited declaration's parameter types mention a static parameter and differ from the override's: `override f(x: String)` over `f(x: T)`. Two shapes: an object expression with static parameters, and a generic declaration that extends a type under a `where` clause. Matches interpreter.md's two cases where walk does not read all the bounds.
- **Where:** walk, its load-time `override` check. The object-expression lift gives the object the static parameters it uses but not the enclosing `where` clauses (`nodes_util/ExprFactory.java:1127`); the stand-in reads an extends under a `where` clause as unconditional (`interpreter/evaluator/BuildEnvironments.java:1085`); so `Constructor.checkOverrides` (`values/Constructor.java:688`) counts the inherited declaration as possibly overridden.
- **Reproduce:** run `ProjectFortress/tests/XXXOverrideObjectExpressionOverParamWalk.fss` through the harness (object-expression shape); `XXXOverrideNothingConditionalExtensionWalk` holds the `where`-clause shape.
- **Status:** open, a walk fix to build (read the bounds in both shapes); promote both `XXX` tests with it.
- **Could not resolve:**
  - `boundsUnread`, `symbolicDomain`: named beside `Constructor.java:688` with no file:line; I take them as identifiers in `Constructor.java`. Unclear wording (minor).
  - "Object shape: `XXXOverrideNothingConditionalExtensionWalk`": "object shape" reads as the object-expression shape, but by its name the test holds the conditional-extension (`where`) shape. Two readings. Unclear wording.
  - Sibling 665 is not in this file; nothing says what it is.

## Row 725

- **Defect:** The compiled checker does not split a tuple of parameter types through `comprises` clauses when the abstract method or a body below it has its own static parameters. With `Side comprises { Ping, Pong }`, bodies `g[\T extends Side\](self, x: Ping, y: T)` and `g(self, x: Pong, y: Side)` together cover `abstract g(self, x: Side, y: Side)`, but the object is refused: 'Domain (Side, Side) is not a subtype of OR((Pong, Side),(Ping, T$7))'.
- **Where:** compiled path, checker: `scala_src/typechecker/AbstractMethodChecker.scala:135-145`, `coveredByParts`, which splits only where no domain has static parameters; and the union test compares the tuple with each member alone.
- **Reproduce:** run `ProjectFortress/compiler_tests/XXXAbstractMethodCoveredPairsGeneric.test` through `junit.sh`. The working counterpart without static parameters is `AbstractMethodCoveredPairs`.
- **Status:** open, a checker fix to build in `coveredByParts`; promote the `XXX` test. Walk's side is row 723.
- **Could not resolve:**
  - `T$7`: a checker-internal name for `T`, I assume. Clear enough.
  - "A body with a static parameter of its own that the cover does not need refuses the object too": I read it as a second face (a redundant generic body also triggers the refusal), but it could mean the refusal there is correct. Unclear wording.
  - Siblings 723 is cited for "Walk cannot load the object", but not in this file. Fine as a pointer.

## Row 728

- **Defect:** Walk refuses at load a valid object whose one body for an inherited abstract method has its own static parameter and covers it: `g[\T extends Side\](self, x: T)` under `abstract g(self, x: Side)`, 'does not define an abstract method declared in type H'. interpreter.md lists the same refusal with this row number.
- **Where:** walk, load-time abstract-method check: `Constructor.checkForDef` (`interpreter/evaluator/values/Constructor.java:431-433`), where `definedBelow` (`:480`) finds no cover among the bodies; the root cause is "not located further".
- **Reproduce:** run `ProjectFortress/tests/XXXAbstractMethodGenericBodyWalk.fss` through the harness.
- **Status:** open, a walk fix to build; the worker must first locate why `definedBelow` misses the generic body.
- **Could not resolve:**
  - "The compiled path compiles and runs it, and the two-parameter shape `g[\T extends Side\](self, x: T, y: Side)` under `g(self, x: Side, y: Side)`.": the sentence lacks a verb for its second half. I read "and also compiles and runs the two-parameter shape", but it could be a fragment meaning walk refuses that shape too. Unclear wording.
  - "Both paths refuse bodies at `(U, Ping)` and `(U, Pong)`, each with `U extends Side`, under `g[\U extends Side\](self, x: U, y: Side)` (725 on the compiled path)": I cannot tell whether this refusal is part of this row's defect on walk (to fix here), or only recorded, with the compiled half in 725. Unclear wording.

## Row 639

- **Defect:** A design limit, not a bug in a path: no interpreter test can check the message of a failing `assert`, `deny` or `fail`. The harness fails any run whose output or error stream holds "fail"/"FAIL" (except files named `*QuickCheckTest*`), and `fail` prints `FAIL: ` first; `assert`, `deny` and the arrays' bounds check `oops` call `fail`. Agrees with tests-writing.md.
- **Where:** the harness, `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:382-385`; the library, `Library/FortressLibrary.fss:55` (`fail`) and `:1908` (`oops`).
- **Reproduce:** under walk, `assert((1,2), (1,3), "m")` prints 'FAIL: (1,2) =/= (1,3); m'; any test file holding it is red whatever it expects. Shown so far only by probes.
- **Status:** leave it: no fix asked; use the workaround, recording a failing check's message by probe lines. Specification silent.
- **Could not resolve:**
  - `NEGATIVE-VERIFIED` on a design limit: does it ask for a fix (say, a harness key for an expected `FAIL:`) or only record the limit? With "Workaround:" I read "leave it". Concept missing (status definition, see top).
  - "`tests/Array2SubscriptInBounds.fss` holds in-bounds subscripts only": I read it as "out-of-bounds subscripts are untested because of this limit". Clear enough once read so.
