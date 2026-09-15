<!-- Established facts, one line each, with the source. Grouped by area. Read at session start; cite by area and line rather than restating in chat. -->

# Facts on record

## Execution model

- Two execution paths share parser and phases and differ at the end: the walk interpreter (`fortress file.fss`) and the bytecode compiler (`fortress compile` + `run`) (`repo-internals.md:95-129`).
- The static type checker (Scala, `scala_src/typechecker/`) runs only on the compile path; `walk` turns it off and there is no switch to make it run in the interpreter (`repo-internals.md:127`); every "type error" seen from the interpreter is a run-time dispatch failure.
- `fortress typecheck` checks against `Library/CompilerLibrary.fsi`, not the interpreter's prelude, so it is not an oracle for interpreter programs (ledger row 69); making the checker usable on interpreter programs means giving it the interpreter's prelude, which is not a ledger row and not on the worklist as a separate item (it falls under worklist item 2, compiler-path library parity).
- The compiled path measured 6.8× on a scalar `RR64` loop, 8.9× on object-allocating code, 8× on startup, numerics identical (`compiled-path-gaps.md:45, 100-101`); what blocks it is its 592-line prelude (no `List`, no generic `array`, no `exp`/`log`, no `SUM`, an empty `Matrix`), not code generation (rows 71-82).
- The code generator lowers every type to a JVM reference type: `RR64` to the runtime class `FRR64`, and emits no `DADD`; arrays are library objects over `get`/`put`, not `double[]` (`repo-internals.md:129`). So compiled numerics are boxed; the 6.8-8.9× is measured with boxing in place. That boxing is the cause of the ceiling is an inference, not yet a measurement.
- Generic instantiations are stamped out at class-load time by ASM rewriting of template bytecode (`InstantiatingClassloader.java`, `repo-internals.md:129`); whether `nat` parameters are baked into stamped classes is unprobed.
- Implicit parallelism: `for` is parallel unless every generator is `seq`; the elements of a tuple and the operands of an operator are evaluated in parallel implicit threads (`tuple-expr.tex:23-24`, `operator-app.tex:59`; row 265). `FORTRESS_THREADS` sizes the work-stealing pool; there is no explicit threading in any of our programs.
- Sizes in types (`nat` parameters) are "instantiated at runtime" by the specification (`trait-parameters.tex`, natparams); they check shapes when a value is made or passed; no optimization is built on them anywhere. A `nat`-typed parameter does not unify statically with a run-time-built array (row 23); the interpreter matches at dispatch, and a mismatch reads "Failed to find any matching overload", uncatchable (row 83). A literal size does unify (row 23's positive half).

## The specification

- The in-repo `Specification/` is the later draft with the implementers' notes; `Specification-1.0-frozen/` is 1.0. Searches are made in the draft.
- No placeholder, positional or point-free function form exists anywhere in the draft or in the parser: the only function expression is `fn Param => Expr`; `_` is a discard in binding position only (`Identifier.rats:62-65`, `blocks.tex:53`, `generators.tex:34`).
- `Ring` and `Field` exist only as commented-out declarations in `advanced-lib/algebraic-constraints.tex:1541, 1761`; the shipped library has `AdditiveGroup`, `MultiplicativeRing`, `AnyMultiplicativeRing` and no more (`FortressLibrary.fsi:252-264`).
- The syntax-extension chapter is a one-line stub deferring to the FOOL 2009 paper; the spec's `syntax … = Expr` form is unimplemented (row 267).

## The library's arrays and algebra

- `Vector[\T extends Number, nat s0\]` and `Matrix[\T extends Number, nat s0, nat s1\]` are the only sized array traits; `Array3[\T, nat b0, nat s0, …\]` carries no algebraic trait (rows 284; `FortressLibrary.fsi:1460, 1578, 1652`).
- `Vector` and `Matrix` inherit `+`, `-`, unary `-` and `zero` from `AdditiveGroup`, nothing else; `×` reaches no array by design because juxtaposition is the inner product and the array traits exclude `AnyMultiplicativeRing` (rows 64, 109, 285); a carrier that extends the ring is accepted unchecked, changes juxtaposition to elementwise and breaks `+` (vocabulary review v02, v02b).
- The library's products are declared with shared `nat`s (`Matrix[\T,n,m\]` × `Matrix[\T,m,p\]`, `FortressLibrary.fsi:1508-1516`); C4's own products were not, which is habit; the focused base's vocabulary swap states them.
- The shipped `RR64` does not satisfy the specification's algebraic bound `T extends AdditiveGroup[\T\]` (vocabulary review, probe `v04b_groupbound.out.0`); `T extends Number` is the bound that works for every element type and rank (its candidate row, unmerged).
- No trait for scalar extension ships; no reshape, plane, gather, outer product or ravel exists in the library (vocabulary review, section A).
- An array is a trait with `get`/`put`; a view is an object implementing it over other storage, the language's own idiom; the library's row slice `m[i,:]` costs 5× a six-line user view; a diagonal as a `Matrix` view costs 13-54× the operator (vocabulary review v20, v07).
- The element type is `Number` only for `Vector`/`Matrix` (row 24); irrelevant to numeric microGPT, decisive for Run B's autodiff value and for APL characters.

## The syntax-extension mechanism (the APL ladder's findings, ledger 179-287; narrative in `apl/lessons.md`)

- A binder written literally in a template is renamed by hygiene; a free name written by another template is not; they never meet (row 204); an `Id` gap in a binder position is not renamed (row 201). Consequence: a sub-language cannot type or even name `⍵` inside a user-written body; named functions and lambdas one rule writes whole are the two shapes that work (rows 285, 96 of `apl/gaps.md`).
- The interpreter refuses every nested re-declaration of a name (rung 4 probes u01-u03); with hygiene this is why rung 4 built a frame stack, which is unsafe under implicit parallelism (row 265) and was replaced by the focused base (`apl/mg/`).
- APL names are closed sets, one grammar line per name (row 194, 202); a word of two or more capitals is an operator, not a name (row 7/193).
- A host `Expr` gap swallows a following terminal that is a host operator (`⋄`, `∘`) (row 284); a template that writes the host caret drops its right operand silently (row 286); nine `apl⦇ ⦈` uses in one expression do not parse (row 261); parser generation costs about 15-40 s per grammar-importing run.
- Direct rules cost 3.8× less than general forms with per-element frame pushes (row 256); with per-row or per-plane cells the general route was 1.12× C4 at pool 1 and 1.49× at pool 4; the focused base is level with C4 at both.

## The microGPT runs (numbers on the restarted container, the checks' own totals)

- C4 (hand-written, `run-c4/`): 528 s and 444 s at pool 1 (two samples), 263 s at pool 4; 40 checks; the reference for every comparison.
- The universal APL base's program (`apl/microgpt/`): 593 s / 391 s; the focused base's (`apl/mg/`): 439 s / 254 s, forward pass identical to C4 bit for bit.
- Host run-to-run spread is about 16%; comparisons need two samples or a same-host re-run.
- The Bash tool's 10-minute ceiling kills long runs; check runs go under the `Monitor` tool (1800000 ms), sequential, nothing else running when a number is to be kept.

## The ledger

- 286 rows numbered 1-287 (148 vacant) as of 2026-09-15; by kind: 88 defects, 74 design limits, 20 never built, 103 capabilities (`fortress-characterized.md` §4, reproduced by script in the ledger's counts). Rows are never renumbered or moved: 287 numbers are cited from thirty reports. The revival worklist (42 items) and `apl/lessons.md` are the two derived views.
