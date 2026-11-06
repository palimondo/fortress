# Cold read, c-run3/c29

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its `references/` (not `revival-changes.md`, `sources.md`). One gap common to every row: the skill names the seven status words (`references/records.md`, "The gap ledger") but defines them only in the ledger's row template, which a cold reader may not open. `NEGATIVE-VERIFIED` I read as "the gap is confirmed to exist"; `NEGATIVE-BOUNDED` (row 641) I cannot read with confidence. "full text: history, row N" I read as `explorations/fortress-gap-ledger-history.md` (records.md says the earlier text lives there). "in the parent of `HASH`" I read as: the file was deleted by HASH, so print it with `git show HASH^:PATH`.

## Row 18

- **Defect:** A top-level `type` alias declaration (`type Idx = ZZ32`) is rejected outright with `** bug! Not yet implemented: TypeAlias`, so the whole component fails, on walk and on the compiled path, though the specification defines aliases. The checker's alias expansion exists but no path reaches it.
- **Where:** Both paths; the shared index builder, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/IndexBuilder.scala:187`; the unreachable expansion in `TypeAnalyzer.scala:703` (`TypeAliasIndex`).
- **Reproduce:** No test. Write `type Idx = ZZ32` at top level and run `bin/fortress`, `bin/fortress typecheck` and `bin/fortress compile`; each gives the message at the declaration's line. Or recover the probe with `git show e879b6a44^:explorations/alias-units-probes/p1_alias_basic.fss`.
- **Status:** Confirmed open gap, class implementation gap: build a fix (route the declaration to the existing expansion), test first.
- **Could not resolve:**
  - "stops its component": I read it as "fails the whole component at load/compile", but "stops" could also mean a run-time stop. Unclear wording, minor.
  - "F-182 holds it": the FACTS entry presumably records the same fact; "holds" is vague (records? owns the fix?). Unclear wording.
  - "Workaround: ... or a comment": what a comment achieves is not said (comment the alias out and write `ZZ32` by hand?). Unclear wording.
  - Specification cell: `basic/types-vals-vars.tex` has no tree prefix while the second cite names `Specification-1.0-frozen/`; I cannot tell whether the first is under `Specification/` or the frozen copy. Unclear wording.

## Row 26

- **Defect:** Dimensions and units are unimplemented beyond parsing: the type grammar and AST nodes exist, but walk cannot evaluate a dimension type (and has no `in` operator for units), and the compiled checker throws a `java.lang.Error` on any `dim` declaration.
- **Where:** Walk: `interpreter/evaluator/EvalType.java:320` (`TaggedDimType`). Checker: default case of `checkMisc`, `scala_src/typechecker/impls/Misc.scala:199`, reached from `Dispatch.scala:73`. Specification `Specification-1.0-frozen/basic/dimensions.tex:15-17`.
- **Reproduce:** No test. Recover the three probes from `e879b6a44^`: `q8_dimtype_parse.fss`, `q16_dimcheck.fss` (under `typecheck`), `q18_in_operator.fss` (under walk), all in `explorations/alias-units-probes/`.
- **Status:** The specification itself says the feature is not yet supported, so the feature as a whole is a design limit to leave. The notes add that the raw throws are implementation gaps, which suggests a smaller fix (a clean refusal instead of an internal error) could be built.
- **Could not resolve:**
  - Status reads two ways: leave the row (class "design limit") or fix the throws ("the throws are implementation gaps"). The row does not say which the worker should do. Unclear wording.
  - Which probe gives the walk `Can't EvalType ... TaggedDimType` message is not stated (q8 is named a parse probe). Unclear wording.
  - `Operator in is not defined.`: the specification's `in` unit-conversion operator, which I know only by name; the skill does not cover dimensions or units. Language concept I lack.

## Row 156

- **Defect:** Under walk, a function generic in a `nat` static parameter cannot be passed as a value. The call fails at the receiving function with one of three internal errors depending on the receiver's shape: a unification error naming type `null` (a non-generic receiver), "Argument ... has no type information" (a `nat`-generic receiver with an arrow-typed parameter), or a `NullPointerException` (a receiver generic in two `nat`s). Cause: a generic function value's `type()` is null.
- **Where:** Walk: `interpreter/evaluator/values/Fcn.java:67-71`, check at `EvaluatorBase.java:939`, NPE in `FValue.java:141` (`FValue$AsTypesList.compare`) from `GenericFunctionOrConstructor.java:52`.
- **Reproduce:** No test and no probe in the row; the probe is only in the history file's text of row 156. A worker must write one: declare `f[\nat n\](...)`, pass `f` to a function with an arrow-typed parameter, run under walk.
- **Status:** Confirmed walk implementation gap: build a fix (give generic function values a type). Siblings 165 and 758 are related.
- **Could not resolve:**
  - "callee": in "(a plain callee)" it means the receiving function, but the sentence is about the passed function, and "A plain function passes" uses "plain" for the argument. The two uses of "plain" read two ways. Unclear wording.
  - "the lifted functions", "the lift" and "row 171": refer to a program or batch context (a lift over arrays) that the row never introduces. The workaround cannot be applied from the row alone. Unclear wording.
  - Which message belongs to which generic argument (is the argument always `nat`-generic, with only the receiver varying?) I assume yes. Unclear wording, minor.

## Row 396

- **Defect:** On the compiled path, a local `var` whose declared type is a tuple compiles but fails when the class loads: `ClassFormatError: Illegal class name "LTcLocalVar$Wide;"`. The code generator emits a `CHECKCAST` whose operand is the tuple's element descriptor, not a class. Walk runs the same program.
- **Where:** Compiled path, code generator: `LocalMutableVar.pushValue` in `ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java:547`, using `NamingCzar.jvmTypeDesc` / `forTupleType` (`compiler/NamingCzar.java:1454-1466`); same pattern in `MutableTaskVarCodeGen.pushValue` (`VarCodeGen.java:730`).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXTupleLocalVarCompiledRungC.test` (an `XXX` test, green while the defect stands). By hand: inside `run()`, `var m: (Wide, ZZ32) = (WideOf(0), 0); m := (WideOf(4), 5)`, then `bin/fortress compile` and `bin/fortress run`.
- **Status:** Confirmed codegen gap with a reproducer: build a fix; the notes list five neighbouring forms that already run, which a fix must keep working.
- **Could not resolve:** `Wide` and `WideOf` are not defined in the row; I assume the test declares them (an object type and its constructor). Otherwise clear.

## Row 471

- **Defect:** Under walk, passing a tuple, `()` or a function to a generic whose type parameter is bounded by `Object` (or by `Index`, with a non-`Index` argument) is correctly refused, but the refusal is an `InterpreterBug` ("** bug! Meet(... , Object) not a singleton: []") rather than a type error.
- **Where:** Walk: the bound is installed before argument unification at `EvaluatorBase.java:905` (`abm.meetPut`), and `TypeLatticeOps.java:42` finds the meet empty.
- **Reproduce:** No test. Under walk, `k[\T extends Object\](x: T): T` called as `k((1, 2))`, `k(())` or with an arrow; or `ident[\I extends Index\](x: I): I` on `(1, "a")`, `"a"` or `()`.
- **Status:** Confirmed walk gap, but only in how it reports: the verdict is right, and the specification says nothing on how a run reports an ill-typed program. So a fix would change the message to a proper error, not the outcome; whether that is wanted is not settled by the row.
- **Could not resolve:**
  - "The `Index` bound stops so at an argument that is no `Index`": I read "stops so" as "also stops the same way". Unclear wording.
  - "as row 184's": another row with the same internal-bug message; not introduced. Unclear wording, minor.
  - Whether to build a fix or leave it: the last two sentences of the notes pull opposite ways. Unclear wording.

## Row 506

- **Defect:** The compiled checker's coercion-applicability step enumerates combinations of candidate types for a generic's type parameters and gives up when there are more than 64, refusing a call that should be accepted: `g3(1, 2, 3, 4)` for `g3[\A, B, C\](a: A, b: B, c: C, m: ZZ64)`.
- **Where:** Compiled checker: `combos.size > 64` at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:370`; coupling by the expected type at `:379-381`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXInferComboCap.fss`. Contrast `g2(1, 2, 4)` and `g3(z, z, z, 4)` with `z: ZZ32`, which are accepted.
- **Status:** Confirmed checker gap with a reproducer: build a fix (it matters more after the switch-over, when numerals get more coercion targets). Workaround: write the static arguments explicitly.
- **Could not resolve:**
  - "lone type parameters": I read it as type parameters that are each a parameter's whole declared type (`a: A`) and appear nowhere else, but it could also mean parameters not constrained by any other. Language-checker concept not in the skill, or unclear wording.
  - "where a numeral has seven coercion targets, two such parameters exceed the cap (by reading)": 7 x 7 = 49, under 64, so the count of a combination must include something more (the numeral's own type, giving 8 x 8 = 64, still not > 64). I cannot reconcile the arithmetic. Unclear wording.
  - "the types it chooses": candidate types per parameter, I assume the coercion targets of each argument. Unclear wording, minor.

## Row 507

- **Defect:** The compiled checker's coercion-applicability step refuses every call that has a lambda argument without parameter types: `appl(bS, fn x => x, 3)` is refused (the `3` needs coercion to `ZZ64`, so this step is reached), while `fn (x: ZZ32): ZZ32 => x` is accepted. Argument inference for lambdas is not run inside the coercion step.
- **Where:** Compiled checker: `checkApplicableWithCoercion`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:296`, the `args.exists(_.isRight)` test at `:305`; the inference loop of `checkApplicableWithInference` at `:181` is the missing piece.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXInferLambdaArg.fss`.
- **Status:** Confirmed checker gap with a reproducer: build a fix. Workaround: annotate the lambda's parameter type.
- **Could not resolve:**
  - "The shape of row 401 (closed) with a function argument": row 401's shape is not described. Unclear wording, minor.
  - `bS` is not defined; I assume a `BoxT[\T\]` value. Minor.

## Row 758

- **Defect:** The compiled checker crashes (an internal `bug`, 'F is not in the kind env [][][]') when a generic function is passed as a value to a function with an arrow-typed parameter: `useOne(count)`, for `count[\F extends Object\](b: Box[\F\]): ZZ32` and `useOne(g: Box[\ZZ32\] -> ZZ32): ZZ32`. Walk refuses the same call with the null-type unification error of row 156.
- **Where:** Compiled checker under `bin/fortress typecheck`: `TypeAnalyzer.staticParam`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:1077`. Walk side: row 156.
- **Reproduce:** No test. Write the two declarations (plus some `Box[\T\]`) and the call `useOne(count)`, and run `bin/fortress typecheck`; under walk, run it plainly.
- **Status:** Confirmed checker gap: build a fix (instantiate `F` from the expected arrow type, or refuse cleanly), together with sibling 156 for walk.
- **Could not resolve:**
  - "No gated test: the refusal is a crash.": I cannot tell why a crash prevents an `XXX` test; tests-writing.md says the harness counts a compile exception of an `XXX` component as expected. Unclear wording.
  - `Box` is not defined in the row. Minor.

## Row 165

- **Defect:** An operator cannot be used as a function value. `applyIt(opr ×, a, b)` is refused by the parser ("Operator declarations are not allowed in block expressions."), and `(×)` or a bare `×` as an argument reaches walk and raises an `InterpreterBug` ("The number of parameters (2) does not match with the number of arguments (0).") because walk applies the operator to no arguments. Plain functions and lambdas work as values.
- **Where:** Grammar (`Specification/appendices/grammars/concrete-syntax.tex`, "Expressions"); parser `parser/preparser/PreParserState.java:173`; walk `values/NonPrimitive.java:216`.
- **Reproduce:** No test. Recover from `a0a0c7c99^`: `explorations/run-c3/probes/lift_g3.fss`, `lift_g3b.fss`, `lift_g3d.fss` (fail) and `lift_g3c.fss` (works), run under walk.
- **Status:** Class design limit (specification): the language has no operator-as-value form, so leave it; the workaround is to eta-expand into a lambda.
- **Could not resolve:**
  - "No production of the grammar makes an operator a primary expression", yet `(×)` and bare `×` get past the parser to walk. So either "the grammar" means the specification's and the implementation's parser is looser, or the walk `InterpreterBug` is a separate implementation gap to fix. The row reads two ways and its status follows. Unclear wording.
  - Workaround `fn (w, r) => w r`: by the skill, `w r` is juxtaposition, which multiplies numbers but is not `×` in general. For `×` I would expect `fn (w, r) => w × r`. Unclear wording, or a juxtaposition rule I lack.

## Row 108

- **Defect:** Matrix unpasting, the declaration form that splits a matrix into named blocks, is rejected by the parser with "Matrix unpasting is not yet implemented.", both plain (`[ q1 q2 q3 q4 ] = Q`) and with block extents (`[ A[2 BY 2] B[2 BY 2] ; C[2 BY 2] D[2 BY 2] ] = Q`).
- **Where:** Parser: `ProjectFortress/src/com/sun/fortress/parser/LocalDecl.rats:241`; both paths, since it is the parser. Specification `Specification/basic/matrix-unpasting.tex`.
- **Reproduce:** No test. Write either form in a block and parse or run it. Probes: `git show ed6dafb52^:explorations/run-b/probes/c02_pasting.fss`, and `explorations/run-b2/probes/g1d_unpaste1.fss`, `g1d_unpaste2.fss`.
- **Status:** Design limit: the specification itself says unpasting is not yet supported, so leave it.
- **Could not resolve:**
  - "Workaround: `hsplit` by `tabulate`": I cannot tell whether `hsplit` is a library function or a function the worker writes using `tabulate`. Unclear wording, or a library name not in the skill.
  - Whether the two `run-b2` probes are in the current tree or also deleted (the "in the parent of" phrase attaches only to the first). Unclear wording, minor.
  - "in either spelling": resolved by the notes as the two forms above.

## Row 641

- **Defect:** Compiled code calls `BaseTask.inATransaction()` before every read and write of a mutable variable, even outside `atomic`. At one thread it costs about 1 to 2 ns per check: about 64 % of an array loop with mutable locals (TxArray, 23.17 vs 8.39 ns an element with the check stubbed out) and 9 to 15 % of a scalar accumulator loop (TxScalar, 20.42 vs 18.67 ns).
- **Where:** Compiled path, code generator: `compiler/codegen/VarCodeGen.java:483-546` (locals) and `:620-726` (fields). Not walk, not `MutableFValue`.
- **Reproduce:** `explorations/perf-probes/transactions/run.sh`; detail in `explorations/perf-probes/transactions/REPORT.md`. Measured on `8f0bc7389`.
- **Status:** `NEGATIVE-BOUNDED`, which I read as "the cost is confirmed but only measured within stated limits": four threads, code inside `atomic` and microGPT are unmeasured. A worker could build a fix (emit the check only where a transaction can be live), but whether the row asks for one or for more measurement first I cannot tell. Specification silent.
- **Could not resolve:**
  - `NEGATIVE-BOUNDED`: not defined in the skill. Unclear status word (definition outside what a worker reads).
  - "9 to 15 %": the one pair quoted gives 8.6 %, below the range; the range presumably comes from other runs not given. Unclear wording.
  - "by a shadow of `inATransaction()` returning `false`": I read it as a replacement class put ahead on the class path. Unclear wording, minor.
  - "under walk `TxArray.fss` stops at load, `ZZ32Vector is undefined.`": unclear whether that is a separate walk gap or just why walk was not compared. Unclear wording.
