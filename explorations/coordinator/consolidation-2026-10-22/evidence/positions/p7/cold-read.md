# Cold read: positions p7 (P-79 to P-91)

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the allowed `references/` files (`compiler.md`, `interpreter.md`, `library.md`, `records.md`, `session.md` searched for terms).

## P-79 Every team demo is kept running as the tree changes

**Decided:** The programs in `ProjectFortress/demos/` must keep working. A change that breaks a demo repairs the demo in the same batch, when the repair is known (example: the integer-power change, P-153, rewrote `10^(-4)` as `10.0^(-4)` in the BiCGSTAB demos and `10^(-6)` as `10.0^(-6)` in `npbft.fss`). A demo that breaks because a feature is missing is brought back once the feature exists. The demos that fail today are to be rewritten where the way is known.

**Applies:** to every change that breaks a demo, and to the demos that fail now. The entry lists four groups of today's failures: five demos that walk refuses at load for an inherited abstract method with no body (row 670); `trips.fss`, whose `generator` object the compiled checker's self-type rule refuses (row 710); the timing line of the two BiCGSTAB demos, which stops walk (row 791); and reductions without a written static argument, which the compiled checker refuses because P-48's bound rule gives them no instance (row 731).

**Requires:** a worker whose change breaks a demo and who knows the repair must rewrite the demo in the same batch. A worker must not leave a known repair for later.

**Unfinished:** measure which demos run; then rewrite those with a known repair. Both are candidates for the next batch (PLAN, phase 3, item 19), not yet scheduled.

**Could not resolve:**
- "kept running": on which path, walk, the compiled path, or both? The failure list mixes walk refusals (rows 670, 791) and compiled-checker refusals (rows 710, 731), which suggests both, but the entry never says so. Unclear wording.
- "each demo that fails today is to be respelled where the way is known: [list]": reads two ways. Either the four groups are the failures whose repair is known, or they are all of today's failures and only some of them have a known repair. For `trips.fss` and the row-731 reductions it is not said what the rewrite would be, or whether the fault is in the demo or in the checker. Unclear wording.
- The line between "respelled" and "made to run again once the feature is built": when a checker refusal (rows 710, 731) is a missing feature or a checker defect, does the worker rewrite the demo or wait? Unclear wording.
- "the five that walk refuses at load": the five demos are not named. Unclear wording (the ledger row presumably names them).
- "the compiled checker's self-type rule": not in the skill. Language concept I lack.
- "P-48's bound rule" and "get no instance": the skill says a type parameter that a call does not fix takes its bound, but "get no instance" (no instantiation is inferred? no overload instance exists?) can be read two ways. Partly a concept I lack, partly unclear wording.
- "the timing line of `BiCGSTAB.fss`": which construct it is, and what the rewrite would be, is not said. Unclear wording.

## P-80 The specification's sign-refined number types are a superseded design

**Decided:** The specification's subtypes by sign (positive, non-negative and non-zero rationals, and the same subsets of the integers) are dropped as a design. A program checks a value's sign at run time instead: by comparison, and for a float by `RR64`'s getters `check` (finite) and `check_star` (not NaN), each giving a `Maybe`. `NN32` and `NN64` are machine types of their own and are not part of this design. The chapter that held the design, `Specification/advanced-lib/numbers-advanced.tex`, is kept unchanged, marked superseded by a callout in the form of P-96.

**Applies:** to the specification's number chapters and to any program that wants a sign-restricted number. The chapter itself stays as the record of the original design.

**Requires:** a worker must not build sign-refined subtypes, must not edit `numbers-advanced.tex` beyond its callout, and should test sign at run time.

**Unfinished:** nothing now; it is built. Whether the types come back belongs to P-62: once a `covariant` keyword is built, someone will try to bring them back as covariant static parameters.

**Could not resolve:**
- "Their return is P-62's": I read it as "the question of their return is settled under P-62", but it could also mean P-62 decided they will return. Unclear wording.
- "the `covariant` keyword" and "covariant static parameters": the skill says generics are invariant and have no `+T` or `-T`. How a sign subset would be expressed as a covariant static parameter is a language concept I lack.
- "an attempt brings them back": is their return decided, or is only the attempt decided? Unclear wording.
- "`check` (finite) ... return a `Maybe`": I read it as `Just x` when the value is finite and `Nothing` otherwise, but the entry does not say. Minor; unclear wording.
- "Built.": does it mean the rewrite of the chapters and the callout, or also the `check` and `check_star` getters? Unclear wording.

## P-84 An `RR64` array is stored as a Java `double[]`, unboxed, and arrays keep the team's `nat` sizes in their types

**Decided:** An array of `RR64` is stored as an unboxed `double[]`. Array types keep their sizes as `nat` static parameters, as the library's `Vector` and `Matrix` declare them, and the compiled checker checks those sizes. Storage and sizes are one design, so there is no first version of the store that carries the sizes only as run-time fields. Reason: a high-performance language cannot box array elements, and sizes are central to the team's design; both halves follow the library's own patterns (P-27).

**Applies:** to arrays on the compiled path, and to the array types in the library and the checker.

**Requires:** a worker must keep sizes in the types as `nat` parameters and must not move them into run-time fields as a stopgap. A worker must not build the `double[]` store before the switch-over.

**Unfinished:** the compiled path's `double[]` store. It waits until after the switch-over with the other array decisions; decision A (P-85) is the one that puts `double[]` under a float vector. Built already: the checker's `nat` parameters (F-67).

**Could not resolve:**
- "the compiled checker is taught to check them" against "Built: the checker's `nat` parameters": is the checking of sizes built, or only the parameters themselves? Unclear wording.
- "a first store": I read it as "a first version of the store", but it could mean the first of several stores (the per-element-type stores of P-85's first question). Unclear wording.
- "Both halves follow the library's own patterns": which library pattern the `double[]` half follows is not said. Unclear wording.
- The link to P-85: P-84 decides that the storage is `double[]`, while P-85 holds the array questions open "with no default" and says that decision A "is what puts the `double[]` store under a float vector". It is unclear whether A decides how `double[]` is reached (P-84 stands) or whether it is reached at all. Unclear wording, across the two entries.

## P-85 The array design's three questions are open, with no default, and return after the switch-over with the array decisions A, B and D

**Decided:** The compiled path's array design has three open questions, with no default: (1) whether the array factory picks a store for each element type; (2) whether the store also keeps the size as a field, beside the size in the type; (3) whether a factory for a size known only at run time returns the unsized `Array`. They come back after the switch-over, together with decisions A (the `double[]` store under a float vector), B (where unboxed arithmetic happens) and D (sizes in the model's own types, P-87); see PLAN item 13. All preparation for the array work is done before the switch-over; only the work waits.

**Applies:** to array work on the compiled path. One exception: on question 3 (PLAN item 13's fork 3), an agent built a default, "way 4a", by which the checker treats a size known only at run time as fixed for the call. It is not the curator's answer; it waits for his review (review-queue item 30).

**Requires:** a worker must not answer the three questions or pick a default, must not do the array work before the switch-over, and must treat way 4a as unreviewed.

**Unfinished:** the preparation for the array work (before the switch-over); the answers to the three questions and to A, B and D, then the work (after it); the curator's review of way 4a.

**Could not resolve:**
- How the three questions relate to A, B and D: are they the same three forks under other names, or six separate items? Question 1 looks close to A, but question 2 and question 3 do not match B or D. Unclear wording.
- "The whole preparation for the array work": what counts as preparation and what as the work is not said, so I could not tell what a worker may do now. Unclear wording.
- "an agent has since built a default, way 4a": is way 4a in the tree now (landed and active), or only built on a branch? If it is in the tree, may a worker rely on it, or must a worker avoid building on it? Unclear wording.
- "reads a size known only at run time as fixed for the call": I read it as the checker treating the run-time size as a static size for the length of one call. That is a checker concept I lack, and I could not find it in the skill.
- "the unsized `Array`": the type `Array` (as opposed to `Array1`, `Vector`) is not in the skill. Language concept I lack, though the meaning (an array type with no size parameter) is guessable.

## P-87 The model's text is the notation, and the vocabulary is repaired around it

**Decided:** The text of microGPT's two programs is fixed notation; when they do not check, the vocabulary changes, not the model. The vocabulary is the array operations they are written in: `FlatArrays.fss` for C4, the flat program, and `FlatArrays2.fss` for the APL-style program. No operator in the model is replaced by a function call to pass an overload check (the rejected example: `planeSum(mask, x)` for `mask + x`). A repair that changes any model line is shown to the curator as a diff before it is built. Decision D is such a diff: it gives C4's arrays sized types in the vocabulary's signatures and in the model lines that these force (`explorations/reviews/decision-d-diff.md`; the patch is in git only, in the parent commit of `84aef6a4f`).

**Applies:** to every repair of microGPT or its vocabulary.

**Requires:** a worker must change the vocabulary instead of the model, must never swap an operator for a function call, and must show any change of a model line as a diff to the curator before building it. Nothing of D is applied before PLAN's phase 5, where microGPT compiles.

**Unfinished:** decision D: its review, and applying it in phase 5.

**Could not resolve:**
- "Nothing of it is applied before PLAN's phase 5": "it" can be decision D only, or any repair that changes a model line. Unclear wording.
- Whether decision D is approved: "Decision D is such a diff" says it was shown, but not whether the curator accepted it; P-85 lists D among the open decisions. Unclear wording.
- "C4": used as the flat program's name with no explanation of the name. Unclear wording, but it does not block the reading.
- The timing against P-85: D returns "after the switch-over", here "not before phase 5". Whether phase 5 comes after the switch-over is not said. Unclear wording, minor.

## P-88 The model's vocabulary leaves `+`, `-` and `MAX` between an array and a scalar to the library's scalar block, and its diagonal keeps its own product

**Decided:** The vocabulary declares none of the six operators `+`, `-` and `MAX` with an array on one side and a number on the other; the scalar-extension block of `Library/FortressLibrary.fss` provides them. The vocabulary's diagonal matrix, `Diag`, extends `Matrix` and overrides `mul`, the method the library's matrix product calls, so `diag(v) m` scales the rows of `m` without building the full matrix. This is how the type system is meant to work: a diagonal is a matrix with its own faster product.

**Applies:** to the vocabulary of microGPT (`FlatArrays.fss`, `FlatArrays2.fss`) and the library's scalar operators.

**Requires:** a worker must not add array-scalar `+`, `-` or `MAX` to the vocabulary, must keep `Diag`'s own `mul`, and must not define `ReadableArray2` in the vocabulary.

**Unfinished:** a read-only matrix trait, `ReadableArray2`, that `Array2` would extend as `Array1` extends `ReadableArray1`. It is a library change, under a gap-ledger row still to be filed.

**Could not resolve:**
- "13 to 54 times as high": as high as what? I read it as the general product compared with `Diag`'s own product, but it is not said. Unclear wording.
- "is wanted": is `ReadableArray2` decided and to be built, or only desired? And who files its ledger row: the next worker who meets it, or someone named? Unclear wording.
- Why `ReadableArray2` is in this entry: its link to the diagonal (for example, `Diag` extending a read-only trait instead of `Matrix`) is not stated. Unclear wording.
- Whether the first two parts (the scalar operators and `Diag`'s product) are already built. The entry has no "Built." or "Still to build" for them. Unclear wording.
- "the library's scalar block" and "the scalar-extension block": I take these to be one block, but the skill does not name it. Minor; a library concept I lack.

## P-89 `fill` takes a value, `tabulate` a function

**Decided:** On the library's arrays, `fill(v)` fills with the value `v`, even when `v` is a function, and `tabulate(f)` fills with `f` applied to each index. The function form, once an overload of `fill`, is renamed `tabulate` after Scala. Reason: every peer language with `fill` gives it a value.

**Applies:** to the library's arrays (the skill's `library.md` gives the same rule, with `tabulatedArray1` to `tabulatedArray3` and `tabulatedVector`).

**Requires:** a worker must call `fill` with a value and `tabulate` with a function of the index.

**Unfinished:** nothing; built.

**Could not resolve:** nothing.

## P-90 `Maybe`'s empty case is the team's parametric `Nothing[\T\]`, in the one library and the specification

**Decided:** A `Maybe[\T\]` is `Just[\T\](x)` or the empty case, written with its static argument, as in `Nothing[\String\]`, in the one library (the interpreter's, which the compiled path moves onto at the switch-over) and in the specification. A bare `Nothing`, one object with no static argument, is future work. It needs a `where` clause that binds a type variable in an `extends` clause, which neither path implements (F-21). A proposal to allow the bare form through inference instead (a bare `Nothing` where a `Maybe[\String\]` is expected would mean `Nothing[\String\]`) is parked (PLAN, "Off the path, parked"; review-queue item 167).

**Applies:** to the library and the specification, and to programs that use `Maybe`.

**Requires:** a worker must write the empty case with its static argument and must not try the bare `Nothing`, by either route.

**Unfinished:** the `where` clause that binds a type variable in an `extends` clause, then the bare `Nothing`; the parked inference proposal waits for review.

**Could not resolve:**
- "it is not tried before then": "then" has no clear antecedent. I read it as "before such a `where` clause is built", but it could mean before the switch-over. Unclear wording.
- "a `where` clause that binds a type variable in an `extends` clause, which neither path implements": the skill's `compiler.md` says the code generator "compiles a declaration whose `extends` entry has a `where` clause". The difference may be "binds a type variable", but the entry does not draw the line, so the two read as in conflict. Partly a concept I lack, partly unclear wording.
- "to gate the bare form on inference": "gate" here means to make the bare form depend on inference, I think. Unclear wording, minor.

## P-91 What an object with no `asString` prints: its bare Fortress type name, walk's spelling, on both paths

**Decided:** An object with no `asString` of its own prints its Fortress type name as walk spells it, such as `Box` or `Box[\ZZ32\]`, with no marker and no hash code, on both walk and the compiled path. A debug marker belongs in `asDebugString`, not in the printed form.

**Applies:** to the default printing of every object without its own `asString`, on both paths.

**Requires:** a worker must not add a marker, Java class name or hash code to the default print.

**Unfinished:** on the compiled path: an `asDebugString` that prints as walk's does, `a Box: Box`, where the compiled one prints `Box` (row 363); and a fix for printing an object that declares or inherits a zero-argument member named `toString`, which overflows the stack (row 321). PLAN's phase 4, "From the reviews", holds the latter, which will reach every object with no `asString` once the compiled path reads the one library.

**Could not resolve:**
- "A debug marker, such as the Java class name that the curator first leaned to, goes in `asDebugString` instead" against "an `asDebugString` that prints as walk's does, `a Box: Box`": walk's form is not the Java class name. So does `asDebugString` carry the Java class name, or walk's `a Box: Box`? Reads two ways. Unclear wording.
- "where it reaches every object with no `asString` once the compiled path reads the one library": "where" can attach to the PLAN item or to the overflow itself, and why every object would get a `toString` member then is not said. Unclear wording.
- Whether walk already prints as decided ("Built" on walk) is implied but not stated. Unclear wording, minor.
