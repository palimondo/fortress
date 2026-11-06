# c29 check (c-run3, base c124c6b65)

`mech.py` run as given: 11 lines, 0 failing; `apply.py` 11 applied; `ledger.py check` and `check --base c124c6b65` exit 0. Read: `assessment.md`, `rows.rewrite`, `closes.txt`, `dups.txt`, `questions.md`, `pairs.txt`, `silent.txt`, `cold-read.md`, `evidence/*.md`; every cited line opened at `c124c6b65` with `git show c124c6b65:PATH`; deleted probes read from their deletion commits' parents. No build or test run. No close, no duplicate, no pair: nothing to check there.

## Row 18: FAIL (fidelity)
- Passage: "Walk, `typecheck` and `compile` on `type Idx = ZZ32`: `** bug! Not yet implemented: TypeAlias at …:8.1` (…) … Probe `explorations/alias-units-probes/p1_alias_basic.fss`, in the parent of `e879b6a44`."
- Source: `git show e879b6a44^:explorations/alias-units-probes/p1_alias_basic.fss` declares `type IntList = List[\ZZ64\]` (the spec's example, imports `List`, stops at `:10.1`); the program `type Idx = ZZ32` with the `:8.1` stop on all three commands is `p2_alias_minimal.fss` (`explorations/aliases-units-report.md:97-101` is p2's bullet).
- Correction: replace `p1_alias_basic.fss` with `p2_alias_minimal.fss` in the notes' last sentence: "Probe `explorations/alias-units-probes/p2_alias_minimal.fss`, in the parent of `e879b6a44`."
- Otherwise pass: `IndexBuilder.scala:187` reads `case d:TypeAlias => bug("Not yet implemented: " + d)`; `TypeAnalyzer.scala:703` is `case ti: TypeAliasIndex =>`, the only use; F-182 agrees. Dropped tokens: `IndexBuilder` kept (in the path); `TypeAnalyzer.scala:554` false at the base (line 554 is `pOr(...)`), replaced by `:703`.

## Row 26: FAIL (cold read)
- Passage: "Walk: `Can't EvalType this node type … TaggedDimType` (`interpreter/evaluator/EvalType.java:320`); … Probe `explorations/alias-units-probes/q8_dimtype_parse.fss`; all three in the parent of `e879b6a44`."
- Source: the cold read could not tell which probe gives the walk message. `explorations/aliases-units-report.md:298-303` at the base: `q8_dimtype_parse.fss` (and q16) stop with `Can't EvalType this node type class com.sun.fortress.nodes.TaggedDimType`; `git show e879b6a44^:explorations/alias-units-probes/q8_dimtype_parse.fss` is `f(x: RR64 Length)`, run under walk.
- Correction: attach q8 to the walk message and drop the trailing probe sentence: "Walk: `Can't EvalType this node type … TaggedDimType` (`interpreter/evaluator/EvalType.java:320`, `explorations/alias-units-probes/q8_dimtype_parse.fss`); …", ending "…(`impls/Misc.scala:199`, via `Dispatch.scala:73`). All three probes in the parent of `e879b6a44`. full text: history, row 26".
- Otherwise pass: `EvalType.java:320` is the `defaultCase` bug; `Misc.scala:199` is `throw new Error(errorMsg("Not yet implemented: ", node.getClass))`, reached from `Dispatch.scala:73` `case _ => checkMisc(node)`; `IndexBuilder.scala:184` indexes a `DimDecl`, so the throw is the checker's. The class follows the spec's note (`dimensions.tex:15-17`), as row 108 does. Nothing dropped.

## Row 156: FAIL (cold read)
- Passage: "Workaround: declare the lifted functions over runtime-sized `Array[\RR64,ZZ32\]` so they are plain, and give the lift an arrow-typed parameter (row 171)."
- Source: "the lifted functions" and "the lift" are the program of the deleted probe (`git show 4ebf80aec^:explorations/run-c/probes/q02b_arrow.fss`: `rows(f: Array[\RR64,ZZ32\] -> …, m)` lifting `rmsn[\nat s\]`); the row never introduces them, and the cold read could not apply the workaround.
- Correction: "Workaround: pass a plain function, declared over runtime-sized `Array[\RR64,ZZ32\]` rather than `nat`-generic, to a receiver with an arrow-typed parameter (row 171)."
- Otherwise pass: `Fcn.java:67-71` returns the null `ftype` (its comment names this case); `EvaluatorBase.java:939` is "Argument … has no type information"; `interpreter/evaluator/values/FValue.java:141` is `x.get(i).type().compareTo(…)` in `AsTypesList.compare`, reached from `cache.get(args)` at `GenericFunctionOrConstructor.java:52`. Dropped probe names (`q02b_arrow`, `q02c1_plainplain`, `q02c4_genericgeneric`, `q02c5_plainarrow_generic`, `lift_g2.fss`): home history row 156 (line 937 lists all seven); `FValue.java` kept with its full path; `FType`, the method name: kept in substance. Siblings 165, 758 named both ways.

## Row 396: pass
- `VarCodeGen.java:547` and `:730` are the `CHECKCAST NamingCzar.jvmTypeDesc(fortressType, ifNone, false)` of `LocalMutableVar.pushValue` and `MutableTaskVarCodeGen.pushValue`; `NamingCzar.java:1454-1466` is `forTupleType`, whose unboxed branch returns `jvmTypeDescs(t.getElements(), …)`. `XXXTupleLocalVarCompiledRungC.test` asserts `run_err_contains=java.lang.ClassFormatError`. Dropped `NamingCzar.java:1415-1419`: moved, re-pinned. The cold read's `Wide`/`WideOf` are declared in the test.

## Row 471: FAIL (cold read, minor)
- Passage: "The `Index` bound stops so at an argument that is no `Index`:"
- Source: the cold read could not resolve "stops so"; the old line read "meets the same stop".
- Correction (notes are at 692 of 700): "The `Index` bound stops too, at an argument that is no `Index`:".
- Otherwise pass: `EvaluatorBase.java:905` is `abm.meetPut(name, tt)` under "Preinstall bounds"; `TypeLatticeOps.java:42` is the `Meet(…) not a singleton` bug. F-265 says row 471 open; the `record-says-fixed` signal is F-265's own evidence text. "(climb batch 21 rung B)" left the notes (history keeps it); found by `climb batch 7 rung B` is the template's form.

## Row 506: FAIL (cold read)
- Passage: "Under the one library, where a numeral has seven coercion targets, two such parameters exceed the cap (by reading)."
- Source: the cold read computed 7 × 7 = 49 < 64 and could not reconcile it. `Functionals.scala` at the base: each chosen parameter's choices are `None :: named(n)` (`:364`), and `named` is its arguments' own types, their coercion targets and its bound (`:350-356`): 1 + 1 + 7 = 9 choices, 81 combinations > 64 (`:369-370`).
- Correction: "Under the one library, where a numeral has seven coercion targets, each such parameter has nine choices (none, the numeral's type, its seven targets), so two exceed the cap (by reading)."
- Otherwise pass: the cap `combos.size > 64` is at `:370`; `context` enters `constraint` at `:379-381`. `XXXInferComboCap.test` asserts the refusal (`compile_err_contains=is not applicable …`). Dropped: sibling 401 (FIXED; history), "'s skeptic" (a role; history), `:358`/`:360-368` (moved +12).

## Row 507: pass
- `Functionals.scala:296` is `checkApplicableWithCoercion`, `:305` `if (args.exists(_.isRight)) return notApplicable`; `:181` `checkApplicableWithInference` holds the `inferFnExprParams` loop (`:204`), and `:163-166` picks the coercion attempt instead of it when `coerce || promote.isDefined`. `XXXInferLambdaArg.test` asserts the refusal; it declares `bS: BoxT[\String\]`. Repair design rewritten as mechanism. Dropped `:296` and the long `:305` path: kept in short form.

## Row 758: FAIL (fidelity of the reproducer sentence)
- Passage: "No gated test: the refusal is a crash."
- Source: `.claude/skills/fortress-repo/references/tests-writing.md:75` ("The harness reports any link or compile exception of a component whose name contains `XXX` as expected") and `:84` (a crash is still written as an `XXX` test when the specification settles it, as `basic/functions.tex` does here). A crash does not prevent a gated test; the cold read stumbled on the same point.
- Correction: replace the sentence with "No test in the tree; the command is `bin/fortress typecheck` on the two declarations and the call." (or delete it: the notes already give the command and its output).
- Otherwise pass: `TypeAnalyzer.scala:1077` is `env.staticParam(x).getOrElse(bug(x, x + " is not in the kind env " + env))` in `staticParam`. Dropped "On the base (3aea3da53) and since rung A" (a batch story; history after apply), `TypeAnalyzer.scala:981` (moved +96). Sibling 156 both ways.

## Row 165: FAIL (fidelity; nothing lost)
- Passage 1: "Workaround: eta-expand, `fn (w, r) => w r`."
- Source: `git show a0a0c7c99^:explorations/run-c3/probes/lift_g3c.fss`, the probe that works, passes `fn (p: Array[\RR64,ZZ32\], q: Array[\RR64,ZZ32\]) => p × q`; `w r` is juxtaposition, a different operator (the cold read flagged it).
- Correction 1: "Workaround: eta-expand, `fn (p, q) => p × q`."
- Passage 2: "`(×)` or `×`: `** bug! …` (`values/NonPrimitive.java:216`): walk applies the declaration to no arguments."
- Source: the dropped token "an implementation gap (walk)" has no home in the present line: the class is `design limit (specification)`, yet the parser accepts `(×)` and walk crashes, which the old line called an implementation gap of walk. The cold read could not tell whether the crash is to be fixed.
- Correction 2: "…(`values/NonPrimitive.java:216`): walk applies the declaration to no arguments, an implementation gap (walk)." To stay within 700, shorten the probe sentence to "Probes `explorations/run-c3/probes/lift_g3.fss` and, beside it, `lift_g3b`, `lift_g3d` (fail) and `lift_g3c` (works), in the parent of a0a0c7c99."
- Otherwise pass: `PreParserState.java:173` logs "Operator declarations are not allowed in block expressions."; `NonPrimitive.java:216` builds the parameter-count bug. `grep -c OpRef` of the grammar: dropped "(no `OpRef` in it)", in history.

## Row 184: pass (measure)
- The question is narrow (one program, one walk command from the main tree, `cd tmp/ledger-pass/c-run3/probe && /home/user/fortress/bin/fortress EqvUser.fss`); its three outcomes map to a rewrite, a narrowed line with a follow-up run, or a close/retire. The bug site holds: `Evaluator.java:896` `bug("Expect all oprefs to be top level " + op)` in `getOp`. `silent` beside `NEGATIVE-VERIFIED`: status kept (item 265).

## Row 108: FAIL (cold read)
- Passage: "Workaround: `hsplit` by `tabulate`."
- Source: `git grep -w hsplit c124c6b65 -- Library ProjectFortress/LibraryBuiltin` finds nothing: `hsplit` is not a library function. History row 106 (`fortress-gap-ledger-history.md:643`) shows it is a hand-written split by `fill` over an index map in `run-b2/probes/g1d_hcat.fss`; the cold read could not tell.
- Correction: "Workaround: build each block by hand with `tabulate` (or `fill`) over an index map, as `explorations/run-b2/probes/g1d_hcat.fss` does." Also the `run-b2` probes were deleted by `22ea0cd90`, not `ed6dafb52`: write "…`explorations/run-b2/probes/g1d_unpaste1.fss`, `explorations/run-b2/probes/g1d_unpaste2.fss`, in the parent of `22ea0cd90`."
- Otherwise pass: `LocalDecl.rats:241` logs "Matrix unpasting is not yet implemented."

## Row 641: FAIL (fidelity)
- Passage: claim "before every read and write of a mutable variable"; notes "Emitted by `compiler/codegen/VarCodeGen.java:483-546` (locals), `:620-726` (fields)".
- Source: `VarCodeGen.java` at the base: `:620-726` is `MutableTaskVarCodeGen` (class at `:609`), a mutable local captured by a task, not a field; a top-level `var` is `MutableStaticBinding` (`:310`), which calls `inATransaction` at `:331` and `:362`, uncited; a mutable object field, `MutableFieldVar` (`:202-236`), reads and writes with plain `GETFIELD`/`PUTFIELD` and no check. The class labels come from `REPORT.md:5,112`, which mislabel them the same way.
- Correction: claim "before every read and write of a mutable local or top-level variable, outside `atomic` too: …"; notes "Emitted by `compiler/codegen/VarCodeGen.java:483-546` (a local), `:620-726` (a local captured by a task) and `:326-362` (a top-level `var`), not by `MutableFValue`; a mutable field (`MutableFieldVar`, `:202-236`) has no check."
- Otherwise pass: the figures match `REPORT.md:21-40` (9 % to 15 % is the scalar loop over three sessions, `:40`); reproducer `run.sh` is the report's command (`REPORT.md:1`), compiled path only; walk's `ZZ32Vector is undefined.` matches `repro/641.txt`. `NEGATIVE-BOUNDED` with "Not measured: …" fits the template. Dropped `siblings: 302` (FIXED; history); `TxArray.fss` kept in the notes.

## Counts
pass 3 (396, 507, 184); fail 9 (18, 26, 156, 471, 506, 758, 165, 108, 641).
