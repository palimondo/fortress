<!-- The probes of climb batch 32's planner, 2026-11-15, for the record `coordinator/CLIMB-BATCH-32.md`: each candidate gap of the model's notation (ledger rows 133, 177, 5, 84, 156, 142, 158, 731, 758 and 50) reproduced as a small program on the base build's code (`/home/user/fortress-base33`, `84f1c37190`), under walk and, where the gap is the compiled path's, under `fortress compile`; one trial build with three one-line edits of the parser, which shows what stands behind rows 133, 177 and 5; the briefing keys; the disk. The programs are in `probes/` beside this file. They ran in the planner's own worktree, `/home/user/fortress-plan32`, seeded from the base build and removed after; the base's compiled runs went through `old-fortress.sh` with a private caches folder. No suite, no stage of the gate and no timing was run. -->

# Probes for climb batch 32

## 1. The base

- `git diff --stat 84f1c37190 HEAD -- . ':!explorations' ':!docs'` on `main` at `3fc1ac6e78` printed nothing: the code of `main` is the base build's.
- The worktree: `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base33 /home/user/fortress-plan32 - 84f1c37190`, "seeded ... in 6 s".

## 2. Each gap, on the base's code

Under walk, `bin/fortress P.fss` from `probes/`, with the call set up as the skill's `build-and-caches.md` gives it. Each line is the program, then what it printed.

| row | program | result on the base |
|---|---|---|
| 133 | `P133.fss` with `P133Api.fsi`, `P133Api.fss`: `opr (x: ZZ32)^T: ZZ32` in an api | `P133Api.fsi:3:1: Syntax Error` (the line after the declaration) |
| 177 | `P177.fss`: `var p = 3` | `P177.fss:4:9: The type of p is required.` |
| 5 | `P5.fss`: `println(∑[i <- 1#3] i)` | `Operator prefix SUM is not defined.`, then `Variable i is not defined.` |
| 5 | `P5c.fss`: `println(∏[i <- 1#3] i)` | `Operator prefix PROD is not defined.` |
| 84 | `P84.fss`: `b.v^2` for `object B(v: ZZ32)` | `P84.fss:4:38: Syntax Error`; `C84.fss` under `fortress compile`: the same |
| 156 | `P156.fss`: `app(half, v)` for `half[\nat n\](x: Vector[\RR64,n\])` | `Unification error: Closure/Constructor for app param 1 (f:Vector[\RR64,3\]->Vector[\RR64,3\]) got arg half[\nat n\](...) ... of type null` |
| 156 | `P156b.fss`: `app(half[\3\], v)` | `[0#3][ 4.0 4.0 4.0 ]`: with the size written it runs |
| 142 | `P142.fss`: top-level `shp: ZZ32[3] = [27 16 27]` | `Type mismatch binding (27,16,27): (ZZ32,ZZ32,ZZ32) ... to shp (type Array1[\ZZ32,0,3\])` |
| 142 | `P142b.fss`: top-level `shp = [27 16; 16 16; 27 16]`, then `shp[2,0]` | `Non-object receiver ((27,16),(16,16),(27,16)) ... trying to invoke method _[_]` |
| 142 | `P142c.fss`: the literal in a function body, its elements names and `(4 nEmbd)`, and a `String[2]` | `64 wpe`: in a body it runs, with names as elements |
| 158 | `P158.fss`: `(f(3))^T d`; `P158b.fss`: `(f(3))^T` | both `Syntax Error: a function argument should not be immediately followed by a non-expression element.` |
| 158 | `C158.fss`, the second form, `fortress compile` and `run` on the base | `104`: the compiled path reads it right; the gap is walk's alone |
| 50 | `P50.fss`: `a: ZZ32[3] = [i \|-> 2 i \| i <- 0#3]`; `P50b.fss`, two indices | `Variable i is not defined.` |
| 731 | `P731.fss`: `compiler_tests/InferBigOperatorExpectedType.fss` with its big operator's bound made `StandardTotalOrder[\T\]`, `fortress compile` | `Could not check call to operator BIG LAST - [\T extends CompilerAlgebra.StandardTotalOrder[\T\]\]()->Red[\T\] is not applicable to an argument of type ().` (the first error printed, on `Last[\T\]`, is the probe's own: the object's bound was left `Number`) |
| 758 | `P758.fss`: `useOne(count)` for `count[\F extends Object\](b: Box[\F\]): ZZ32`, `fortress compile` | `P758.fss:4:8-22: F is not in the kind env [][][]` |

## 3. One trial build: what stands behind rows 133, 177 and 5

Three edits in the planner's worktree, then `ant compileAll` (`BUILD SUCCESSFUL`, 55 s), the library order, and the programs again. The edits are scratch; no rung copies them unread.

- **Row 133.** `parser/Parameter.rats:171`: the `/` that the component's rule has at `:141`, added before `caret`. `P133.fss` then printed `103` under walk: the api's declaration parses, and the importing program's `y^T` runs it. Nothing stands behind the row under walk.
- **Row 177.** `parser_util/SyntaxChecker.java:179`: `|| lvb.isMutable()` taken out of the condition. `P177.fss` printed `4` under walk; `C177.fss`, the same program, compiled and printed `4`. So both paths already run an untyped mutable local, and the check is all that refuses it. One neighbour showed: `P177b.fss`, `var q = [1.0 2.0]`, stopped under walk with `Can't infer element type for array construction`, which is the array literal's own need of a declared type at a local, not the `var`'s.
- **Row 5.** `parser/Symbol.rats:252`, `:254`: `"SUM"` made `("SUM" / "∑")`, and `PROD` likewise with `"∏"`. `P5d.fss`, `∑[\ZZ32\][i <- 1#3] i`, then gave `Syntax Error` at the `[` after `∑`. So the alternative is not enough: `∑` is taken as an operator before the accumulator's rule is reached, and the rung has the expression grammar's order to repair (`parser/Expression.rats:685-707`).

## 4. Where each gap lies, by file and declaration

- Row 133: `parser/Parameter.rats`, `AbsOpHeaderFront` (`:162-184`).
- Row 5: `parser/Symbol.rats`, `SUM`, `PROD`, `Accumulator` (`:252-266`); the productions that use `Accumulator` in `parser/Expression.rats:685-707` and `parser/NoNewlineExpr.rats:35`; the operator headers in `parser/Parameter.rats:116-131` and `parser/MethodParam.rats:62`, `:82`.
- Row 177: `parser_util/SyntaxChecker.java`, `forLocalVarDeclOnly` (`:176-189`).
- Row 84: `parser/Expression.rats`, `PrimaryItem`, `LeftAssociatedPrimary` and `MathPrimary` (`:384-474`), `Exponentiation` (`:651-660`).
- Row 158: `interpreter/evaluator/Evaluator.java`, `forOpExpr` (`:948-1008`) and `forTightJuxt` (`:1281`, the refusal at `:1322-1326`).
- Row 142: `interpreter/evaluator/BuildEnvironments.java`, `forVarDecl4` (`:731`); the precedent in a body is `interpreter/evaluator/LHSEvaluator.java`, `forLValue` (`:119`).
- Row 156: `interpreter/evaluator/values/Fcn.java`, `type()` (`:67-72`); `interpreter/evaluator/EvaluatorBase.java`, `inferAndInstantiateGenericFunction` (`:86`) and the check of an argument against a parameter type (`:941`); `interpreter/evaluator/values/FValue.java:141`; `GenericFunctionOrConstructor.java:52`.
- Rows 731 and 758: `scala_src/typechecker/impls/Functionals.scala` (`checkApplicableWithInference` `:189`, `typedApplicationOfArg` `:632`, `retypedApplication` `:902`, the functional reference's case at `:1464`); `scala_src/types/TypeAnalyzer.scala`, `staticParam` (`:1075-1077`).

## 5. The briefing keys

Every key of the record's section 1 was passed to `explorations/coordinator/tools/facts-extract.sh --check` on `main` at `3fc1ac6e78`, 61 distinct keys in one call: each matched one place, and the tool reported none as not found. The key into this file was checked after it was written.

## 6. The disk

`df -P /home/user` on 2026-11-15 at 18:13 UTC: 16,670,680 KB available, about 15.9 G, with the planner's worktree (about 0.3 G) still standing. Five rungs need 1.5 G each plus 4 G: 11.5 G.

## 7. Not run

A suite, a stage of the gate, a timing, the model's quick checks. Row 50 on the compiled path, since the prelude has no array type. The trial edits were not tried against the suites.
