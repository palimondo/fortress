# Decision record: the type of a parameter that a declaration leaves out (rung C of climb batch 11)

The revision this record backs is the box at `Specification/basic/components/type-inference.tex:47-53` and the Appendix I entry "The type of a parameter that a declaration leaves out" (`Specification/appendices/changes.tex`, `\seclabel{revival-paramtype}`). It follows the curator's answer to climb batch 11's Q4, way 1 (`explorations/coordinator/CLIMB-BATCH-11.md`, Q4 and "Answered."; POSITIONS, "The order of the work after batch 10.").

## 1. The changed passage

Original, the Working Draft of February 2011, `Specification-1.0-frozen/basic/components/type-inference.tex:44-46`, unchanged in `Specification/` before this rung:

```latex
Once $C$ is expanded, type inference 
is performed over all program constructs that still include elided types.
Empty bodies are ignored.
```

New text: the paragraph unchanged, followed by the box:

```latex
\revision{revival-paramtype}{The compiled type checker does not yet infer the
type of a parameter that a function declaration leaves out, at top level, in a
trait or object, or local to an expression block: it refuses the component
with the message ``Missing parameter type for'' followed by the parameter's
name.
The inference this paragraph asks for is not yet described
(\chapref{type-inference}).}
```

## 2. The reason

- The paragraph asks for inference over every construct with an elided type, and the inference chapter does not describe it: "the inference over a whole program of the types that declarations elide (\secref{type-inference-components}), are not yet described" (`Specification/basic/inference.tex:23-25`, again at `:261-262`).
- Before this rung the compiled checker refused a top-level function's or a method's untyped parameter, "Missing parameter type for x" (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala:199-200` on this rung's tree, `:192-193` on the base; row 405), a departure no passage stated; and it stopped on a local function's, three ways (rows 620 to 622): "Type is not inferred" (`nodes_util/NodeUtil.java:339`), "TryChecker returned an untyped expr" (`scala_src/typechecker/STypeChecker.scala:598-603`), "Result of typechecking still contains intermediate nodes" (`compiler/StaticChecker.java:264-266`).
- Batch 10's rung C left the three stops as expected failures, under its stop "a crash repaired by catching it without the error the text gives" (`explorations/compile-ladder/rung-checker-defects/REPORT.md`, section 10, decision 9). Climb batch 11's Q4 put the three ways to the curator; he answered way 1: the refusal at top level, given to the local form, recorded in the S1 form with a callout at this paragraph and an Appendix I entry naming row 405 too.
- The refusal is made where a local function is bound (`STypeEnv.extendWithBindingsFromFnList`, `STypeEnv.scala:69-77`), the file of the top-level refusal, with its message and its form (a thrown `TypeError`), so that it is reached before any stop and a `TryChecker` that meets it gives up as it does on the top-level refusal.
- The box describes the compiled path; the paragraph stays the standard, as the inference it asks for is the repair (Q4's way 2).

## 3. What the box does not say, and why

- A keyword parameter: the compiled path refuses one left untyped, though `Specification/basic/functions.tex:171-172` infers its type from its default expression; the compiled checker reads a typed keyword parameter as a positional one, and walk stops on a call that leaves out its argument. The keyword parameter is not built on either path (row NEW-C-3); the entry's effect names it.
- A function expression's parameter: where the context expects an arrow type the compiled checker takes the parameter's type from it (a probe, `app(fn (x) => x + 1, 4)` against `app(h: ZZ32 -> ZZ32, v: ZZ32)`, prints `5` on the rung's code), so the box names declarations only.

## 4. The way back

- Way 2, inference of the left-out types from the uses of the parameter or from an expected arrow type: the box goes, with the entry's effect; the three refusal tests (`compiler_tests/XXXLocalFunctionUntypedParam`, `…AndReturn`, `…InLoop`) turn red and are promoted to run tests by topic (walk prints `7`, `49` and `6` for their programs).
- Way 3, the stops kept as expected failures: revert the binding check in `STypeEnv.scala` and rekey the three tests on the stops' messages, as batch 10 left them.

## 5. Route C

The same under route C: the question is independent of the exclusion rule.
