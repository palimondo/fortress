# Rung F (`rung-generic-function-value`): the skeptic's check

Head judged: `affea715e7` (the worker's). Head after: the commit of this file, on `56baa8b5f3`. Base `db352c1776`; old code from `/home/user/fortress-base33`. Verdict: **approved**, with one defect fixed (settled) and corrections.

## What was checked

- **REPORT.md and record.md** were on the branch (`affea715e7`), so nothing was written from the run's journal.
- **Stages.** The report says neither stage ran. `git diff --name-only db352c1776...affea715e7` lists only paths under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/` and `explorations/`; the same holds after my commits.
- **Test first**, in the worker's transcript and its saved outputs. The failing run through the harness, call `umVeWN`, 23:29:57Z, tree `db352c1776`: `Unification error: ... got arg half[\nat n\](...) ... of type null`, `Argument half[\nat n\](...) has no type information`, `Tests run: 2,  Failures: 2,  Errors: 0`. The first build of the edit ended at 23:35 (`EvaluatorBase.class`, 23:35:26; call `psQmkd`). The tests in their final text on the old code, 23:36:39Z: `Tests run: 2,  Failures: 2,  Errors: 0`. The last run after the last change of code, call `eU7pTP`, 23:51:13Z, tree `42fc9c6641`: `OK (4 tests)`. The one build means one code state, which `ant testSystem` ran on (`BUILD SUCCESSFUL`, `Total time: 4 minutes 36 seconds`).
- **The diff**, line by line, against the section, fork F1, P-48, P-12 and `var-ref.tex`, "Identifier References". It does what the report says. The instance at an arrow type is the direct call's own inference on stand-in values, so P-48's rule and walk's open parameter are not touched. The cache of instances is a `ConcurrentHashMap` keyed by the memoised arrow type.
- **Precedent and sibling sites.** `FTypeOverloadedArrow` is the right precedent. The sites that bind a value to a typed place: a parameter and a local declaration receive; an assignment did not (the defect below); an immutable top-level variable does not (rung B's file, row 1019).
- **Names.** Each name the rung adds occurs only in its own files under `ProjectFortress/src/com/sun/fortress/`; the test names occur in no other test file.
- **Citations.** Each line that REPORT.md and record.md cite was opened; all say what is claimed, the `BaseEnv.java` ones after a move of one line, which I corrected.

## My programs (walk; `tmp/rung-generic-function-value/skeptic/`, `run.sh new|old P [threads]`)

| program | old code | the rung's head |
|---|---|---|
| `K1`: a generic constructor at `ZZ32 -> Bx[\ZZ32\]`; a generic higher-order function at `(ZZ32 -> ZZ32, ZZ32) -> ZZ32`; a declared return type; an overloaded callee; a dotted and a functional method's parameter; at `ZZ32 -> Any` | `Unification error: ... got arg ObjectDecl Bx ...:GenericConstructor of type null` at the first | `mk 5`, `hof 7`, `get 5`, `pick fn`, `meth 5`, `fmeth 5`, `toAny 5` |
| `K2`: `SUM[i <- 0#64] (app(half, v) + appN(half, w) + appN(half, v))`, at 1 thread and four times at 4 | `Argument half... has no type information` | `704.0` each time |
| `K3`, `K7`: no instance (`wide` at `(ZZ32, ZZ64) -> ZZ64`; `num[\T extends Number\]` at `String -> String`) | `... of type null` | refused at the binding, `... of type wide[\T\]`, `... of type num[\T\]` |
| `K8`: a tuple of generic functions at a tuple of arrow types; varargs; through `idf[\T\](x: T)`; an overloaded name at an arrow type that no overload fits | `NullPointerException` | `both s5`, `vary 5`, `idf 5 q`, `ret 5`; the last refused, `of type (twice[\n\],ZZ32->ZZ32)` |
| `K10`: an overloaded name all of whose declarations are generic | `Unification error` | `useB 1`, `useV 3` |
| `K9`, `K11`: a declaration, an assignment, a field and a mutable top-level variable of type `ZZ64 -> String` given `kind[\T\]` | `Type mismatch binding kind... (type null)` | `local ZZ64`, `assigned ZZ32`, `assigned2 ZZ32`, `field ZZ64`, `varinit ZZ64`; `top ZZ32`, `b ZZ32` |
| `K12`: `pick(twice)` for `pick(f: Vector[\RR64,3\] -> Vector[\RR64,3\])` beside `pick(x: Any)` | `pick(twice) any` | `pick(twice) fn` |
| `K5`, `K6`: a local function with static parameters, called and passed | `Missing type T` | `Missing type T` |
| `K4` on the compiled path, old code (`old-fortress.sh ... compile K4.fss`) | `T is not in the kind env [][][]`, `File K4.fss has 1 error.` (row 758, rung C's) | the compiled path's code is the base's: the diff changes no file outside `interpreter/evaluator/` |

The diff adds mutable state only in two caches of the function value; `K2` and `K11` ran at `FORTRESS_THREADS=1` and `=4` with the same output.

## Findings and fixes

1. **Defect, fixed (settled): an assignment kept the generic value.** For `a: ZZ64 -> String`, `a := kind; a(z)` printed `ZZ32` where the declaration `k: ZZ64 -> String = kind; k(z)` prints `ZZ64`: one well-typed program, two answers by the form of the binding. The section settles it: "A generic function passed where a parameter or a typed variable of arrow type receives it is instantiated at that arrow type" (`explorations/coordinator/CLIMB-BATCH-32.md:571`), and fork F1, "the parameter or variable that receives it" (`:479`). The worker left it for the sake of files, not of behaviour (its decision 8), and its account that the repair needs `LHSEvaluator.java` does not hold: every assignment goes through `BaseEnv.assignValue`. Ways listed: `BaseEnv.assignValue`, beside the `putVariable` the rung already edits (taken); `LHSEvaluator.forVarRef`, rung B's file; `ReferenceCell.assignValue`, which transactions also call. The fix: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BaseEnv.java:333`. A mutable top-level variable is bound through the same member and receives too. Commit `4c66c28fbc`.
   - Test: `ProjectFortress/tests/GenericFunctionAssignedWalk.fss`. Failing on the worker's head before the edit, `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/sk1 ProjectFortress/tests/GenericFunctionAssignedWalk.fss`, 03:26:35Z and 03:27:06Z, tree `affea715e7`: `FAIL: J4/0:ZZ32 =/= J4/0:ZZ64; a(z), kind assigned to a`, `Tests run: 1,  Failures: 1,  Errors: 0`. On the base's code through the base build's harness it fails too (`Type mismatch binding kind... (type null) to top`). Passing after the build of the fix, the same script on the rung's five tests and this one, 03:28:30Z: `OK (5 tests)`.
   - The whole walk suite on the fix's code, once: `ant testSystem`, `BUILD SUCCESSFUL`, `Total time: 4 minutes 19 seconds`; shards 202, 213, 202 and 218, 835 tests, 0 failures (code of `4c66c28fbc`, run before the commit). The demos and microGPT were not run again: the gather runs them on the merged tree.
2. **Correction: the reserved point "A change of which declaration a direct call runs" is reached**, and the report said none was. `K12` above: `any` on the old code, `fn` on the rung's. The new answer is the one the rule gives (the arrow-typed declaration is applicable and more specific), and it follows from `OverloadedFunction.type()` holding the generic overloads. Recorded in record.md, finding 8, and in REPORT.md's closing note; no test pins it. Commit `56baa8b5f3`.
3. **Correction: a defect my programs measured, outside the rung's repair.** Under walk a function declared in a block with static parameters of its own stops with `Missing type T`, on the base's code and on the rung's, called or passed; `functions.tex`, "Local Function Declarations", gives the form, and row 304 says "Walk runs local functions". Home 2: `ProjectFortress/tests/XXXLocalGenericFunctionWalk.fss` and row 1020 in record.md. Through the harness as it is: `OK Saw expected exception`, `OK (1 test)` (03:33:36Z); with the function moved to the top level for one run, then restored: `Missing expected failure`, `Tests run: 1,  Failures: 1,  Errors: 0` (03:34:04Z). Commit `03ed022b94`.
4. **Correction: record.md and REPORT.md after the fix.** Finding 1, the FACTS entry, row 1019 (now the immutable top-level variable only), the handover line and the Revival change; REPORT.md's `BaseEnv.java` citations and a closing note. Commit `03ed022b94`.
5. **Correction: one comment line a test.** `GenericFunctionAsValueWalk.fss` carried nine comment lines and `GenericFunctionRowLiftWalk.fss` two; each keeps its first. The first test's comment also cited `functions.tex`, "Function Declarations", which says nothing of a generic function as a value; it now cites `var-ref.tex`, "Identifier References", alone. Both pass in the run of 03:28:30Z. Commit `03ed022b94`.

## Where I differ from the worker's account

- Decision 8 and the first question for the curator: the assignment is the section's "typed variable", and its repair is in `BaseEnv.java` alone. What stays open is the immutable top-level variable, in `BuildEnvironments.java`, rung B's file.
- "No reserved point was reached": one is (finding 2).
- The report's tables are those of the worker's head; no stage was run by the worker or by me.

## The failure-mode question

Where a loud failure became a quiet value: a generic function at `Any`, at a type parameter, in a tuple or varargs of arrow types, or at an arrow type that leaves a static parameter open, is the generic function itself, and each application infers its static arguments as a direct call does (fork F1). An argument that is a generic function no longer stops a generic callee's inference; the binding of the parameter then decides. An overloaded name with a generic declaration at an arrow type is the whole overloaded function. None returns a wrong value in my programs.

## Points for the curator

- The reserved point of finding 2.
- `BaseEnv.java`, `NonPrimitive.java` and `types/FTypeGenericArrow.java` are beyond the files the section names; none is another rung's.
- At no instance walk answers the binding's message, not the direct call's refusal (the worker's question, unchanged).
