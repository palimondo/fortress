# Cold read 2 of positions/p7/clean.txt

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and from its `references/`: `compiler.md`, `library.md`, `interpreter.md` ("What walk checks"), `specification.md` ("Changing the text: the revision form"), plus greps of `records.md`, `tests-writing.md`, `exploring.md` for terms. Nothing else.

Nine entries, all positions: P-79, P-80, P-84, P-85, P-87, P-88, P-89, P-90, P-91.

---

## P-79 Every team demo is kept running as the tree changes

**Decided:** The programs in `ProjectFortress/demos/` must keep working as the tree changes. A change that breaks a demo, where the repair is known, repairs the demo in the same batch (example: when `10^(-4)` became an error, `BiCGSTAB.fss`, `BiCGSTAB2.fss` and `npbft.fss` were respelled with float bases). A demo that fails because a feature is missing is brought back once that feature exists. The demos that fail today get respelled where the repair is known.

**Applies:** To every demo under `ProjectFortress/demos/`, whenever a change breaks one. The failures known today: five demos that walk refuses at load for an inherited abstract method with no body (ledger row 670 names them); `trips.fss`, accepted by walk and refused by the compiled checker because its `generator` object extends `StandardTotalOrder[\trip\]` without being a `trip` (row 710); the timing line of the two BiCGSTAB demos, which divides a `ZZ64` by a float and stops walk (row 791); reductions with a big operator such as `SUM` whose static argument is left out, refused by the checker (row 731).

**Requires:** A worker whose change breaks a demo, with a known repair, rewrites the demo in the same batch. For the row-731 reductions, the repair is to write the static argument (`SUM[\T\]...`). For the timing line, the skill's library rules give the repair (`ZZ64` goes to `RR64` only by `asFloat`), though the entry does not say it.

**Unfinished:** A measurement of which demos run; then the respelling of those whose repair is known. Both are candidates for the next batch (PLAN, phase 3, item 19), not yet scheduled.

**Could not resolve:**
- "kept running" / "which demos run": run on which path? The listed failures mix walk (load refusal, row 791) and the compiled checker (rows 710, 731), and `compiler.md` says the compiled prelude has no array types before the switch-over, so most array demos cannot compile now. I cannot tell whether a demo must run under walk only, or also pass the compiled checker / run compiled. Unclear wording.
- "to be respelled where the way is known: [list]": two readings. (a) Every listed failure has a known repair and is to be respelled; (b) the list is all known failures, and only those with a known repair get respelled. The entry gives the repair for row 731 only; for the five abstract-method demos and for `trips.fss` it gives none, so I cannot tell whether a repair is "known" for them, or by whom it counts as known (recorded somewhere, or the worker's own judgment). Unclear wording.
- "is made to run again once the feature is built": by the batch that builds the feature, or later? Unclear wording.
- "batch": not defined in the skill. I read it as one landed unit of work. Missing term (project vocabulary, not language).
- "PLAN": the skill never names this file or its path. Missing reference.

---

## P-80 The specification's sign-refined number types are a superseded design: a program tests such a subset of a type at run time

**Decided:** The specification's number subtypes by sign (positive, non-negative and non-zero ℚ, and the same for the integers) are dropped as a design. A program tests a value's sign at run time instead. `NN32` and `NN64` are separate machine types and are not affected.

**Applies:** To the specification's number chapters and to any program that wants such a subset. The specification now tests sign by comparison. For floats it uses two getters of `RR64`: `check` gives `Just(x)` when `x` is finite, `check_star` gives `Just(x)` when `x` is not a NaN, and both give `Nothing` otherwise. `Specification/advanced-lib/numbers-advanced.tex`, the chapter that held the old design, stays unchanged apart from a "superseded" callout in the revision form (P-96), so the original stays on record.

**Requires:** Do not build sign-refined types. Do not edit the text of `numbers-advanced.tex`. Write sign tests as comparisons, and float finiteness/NaN tests with `check` / `check_star`.

**Unfinished:** Nothing for now (the chapters' rewrite and the callout are built, F-168). A possible return depends on P-62: once a `covariant` keyword exists, a worker tries to bring the types back as covariant static parameters.

**Could not resolve:**
- "test a value's sign by comparison, and a float with two getters of `RR64`": the second half has no verb and no object. I read it as "and test a float's finiteness or NaN-ness with two getters", but the entry never says the specification had float refinements (finite or non-NaN reals) that these getters replace. Its list names only ℚ and the integers. Unclear wording.
- Are `check` and `check_star` in the library, or only in the specification text? "Built: the chapters' rewrite" covers the specification only. A worker who wants to call them cannot tell whether they exist. Two readings.
- "a callout in the form of every specification change": just the `\revision` callout, or the full four-part revision form of `specification.md` (Appendix I entry, preamble, decision record)? Two readings.
- "bring them back as covariant static parameters": the skill says generics are invariant (no `+T`/`-T`). I cannot picture how a sign refinement becomes a covariant static parameter. Language concept I lack, not in the skill.

---

## P-84 An `RR64` array is stored as a Java `double[]`, unboxed, and arrays keep the team's `nat` sizes in their types

**Decided:** An `RR64` array's elements are unboxed in a `double[]`, and array types carry their sizes as `nat` static parameters, as the library's `Vector` and `Matrix` do. The compiled checker checks those sizes. Storage and sizes are one design: there is no first version in which the store keeps sizes only as run-time fields and type-level sizes come later. That staged plan was rejected. Reason: a high-performance language cannot box array elements, and sizes are central to the team's design. Both follow the library's own patterns (P-27).

**Applies:** To arrays on the compiled path. The checker side is built (F-67: the compiled checker checks `nat` static parameters).

**Requires:** Keep sizes in array types. Do not build a store that carries sizes only at run time as a stepping stone. Do not build the compiled `double[]` store before the switch-over.

**Unfinished:** The compiled path's `double[]` store. It waits, with the other array decisions, until after the switch-over; one of them is decision A, how the `double[]` store sits under a float vector (P-85).

**Could not resolve:**
- "arrays keep ... sizes in their types": all array types, or those the library declares sized? P-85's third question allows an unsized `Array[\E,I\]` for run-time sizes, so I read it as "where the library declares sizes", but the title reads as universal. Two readings.
- Does the `double[]` storage also concern walk? The title is general; "Still to build" names only the compiled path. Unclear wording.
- "goes under a float vector" (decision A): I read it as "backs `Vector[\RR64,n\]`", but it is a figure of speech. Unclear wording, minor.
- Observation, not a reading problem: `references/compiler.md` tells a worker to print this entry with `facts-extract.sh 'positions:Storage is'`. The text "Storage is" does not appear in this entry as written (it says "the storage and the sizes"). If the query matches on that text, it will not find P-84.

---

## P-85 The array design's three questions are open, with no default, and return after the switch-over with the array decisions A, B and D

**Decided:** Three questions of the compiled path's array design stay open, with no default. They go back to the curator after the switch-over, together with decisions A, B and D: (1) does the array factory pick a store per element type; (2) does the store also keep the size as a field, besides the size in the type; (3) does a factory for a size known only at run time return the unsized `Array[\E,I\]`. A is how the `double[]` store sits under a float vector, B is where unboxed arithmetic happens, D is sizes in the model's own types (P-87). Preparation for the array work is done before the switch-over; only the work itself waits.

**Applies:** To the compiled path's array design. The forks and their ways are in PLAN, item 13 of the section "Pavol's answers, in the order they are needed". One exception to "no default": on the third question (PLAN's fork 3) an agent has landed way 4a, under which the compiled checker treats a size known only at run time as fixed for that call, not unknown. That is not the curator's answer; it waits for his review (review-queue item 30).

**Requires:** Do not answer the three questions or pick a default. Do not present way 4a as decided. Do the preparation before the switch-over.

**Unfinished:** The curator's answers to the three questions and to A, B, D; then the array work itself. The review of way 4a.

**Could not resolve:**
- "The whole preparation for the array work": what counts as preparation (tests, measurements, design notes, prototypes?) and where it ends and "the work itself" begins. Unclear wording, and it decides what a worker may do now.
- Way 4a: may a worker build on it, must they leave it alone, or should they avoid relying on it until the review? "Waits for his review" does not say. Unclear wording.
- "way 4a" under "fork 3": the numbering does not match, and I cannot see whether 4a is one of fork 3's ways or something else. Unclear wording (it may be PLAN's numbering, which I cannot see).
- "Pavol": I assume this is the curator, whom the skill never names. Missing term.
- "review queue": the skill names no such file or its path. Missing reference.

---

## P-87 The model's text is the notation, and the vocabulary is repaired around it

**Decided:** The source of microGPT's two programs (the model) is fixed notation. When it fails to check, the array library it is written in (the vocabulary: `FlatArrays.fss` for C4, the flat program; `FlatArrays2.fss` for the APL-style program) is changed, not the model. No operator in the model is replaced by a function call to get past an overload check (the rejected example: `planeSum(mask, x)` for `mask + x`). Any repair that changes a model line goes to the curator as a diff before it is built.

**Applies:** To every repair touching the model. Decision D is such a diff: it gives C4's arrays sized types, in the vocabulary's signatures and in the model lines those signatures force (`explorations/reviews/decision-d-diff.md`; the patch itself is only in git, in the parent of `84aef6a4f`). D is open and returns after the switch-over with the other array decisions (P-85).

**Requires:** Repair the vocabulary, not the model. Never swap a model operator for a call. Show any model-line change as a diff and wait for approval. Apply nothing of decision D before PLAN's phase 5, where microGPT compiles, after the switch-over.

**Unfinished:** Decision D: the curator's answer after the switch-over, then applying it in phase 5.

**Could not resolve:**
- Where `FlatArrays.fss`, `FlatArrays2.fss` and the two model programs live: the entry gives no path. Missing reference, minor.
- "the patch itself is only in git, in the parent of `84aef6a4f`": I take it as `git show 84aef6a4f^:<path>`, but the patch's path in that commit is not given. Missing reference.
- "PLAN's phase 5": PLAN is not located in the skill. Missing reference.

---

## P-88 The model's vocabulary leaves `+`, `-` and `MAX` between an array and a scalar to the library's scalar-extension block, and its diagonal keeps its own product

**Decided:** The vocabulary declares none of the six array-with-scalar operators (`+`, `-`, `MAX`, each with the array on the left or on the right). The library's scalar-extension block in `Library/FortressLibrary.fss` provides them. The vocabulary's diagonal matrix `Diag` extends `Matrix` and overrides `mul`, the method the library's matrix product calls, so `diag(v) m` scales the rows of `m` without building the full matrix: a diagonal is a matrix with a faster product. Row 299: the general product costs 13 to 54 times as much as scaling rows on a diagonal.

**Applies:** To microGPT's vocabulary. Both halves are built.

**Requires:** Do not add those six operators to the vocabulary. Keep `Diag`'s own `mul`. A read-only matrix trait goes in the library, not the vocabulary.

**Unfinished:** A read-only matrix trait `ReadableArray2`, which `Array2` would extend the way `Array1` extends `ReadableArray1`: a library change, under a gap-ledger row of its own that is not filed yet.

**Could not resolve:**
- "scalar-extension block": not in the skill. I read it as the library's group of declarations that extend scalar operators to arrays (broadcasting), but I am guessing. Language/library concept I lack.
- "is also wanted": a decided piece of work, or a wish? And who files its ledger row: the next worker who meets it, or someone named? Unclear wording.
- What `Diag` extends once `ReadableArray2` exists: the entry motivates the trait by the diagonal being read-only, but leaves `Diag` extending the writable `Matrix`. Whether `Diag` moves to the new trait is not said. Unclear wording.

---

## P-89 `fill` takes a value, `tabulate` a function

**Decided:** On the library's arrays, `fill(v)` sets every element to `v`, even when `v` is a function, and `tabulate(f)` sets each element to `f(index)`. The function form, formerly an overload of `fill`, is renamed `tabulate` after Scala, because every peer language with `fill` passes it a value.

**Applies:** To the library's array types. Built. (`references/library.md` agrees, and adds the factories `tabulatedArray1` to `tabulatedArray3` and `tabulatedVector`.)

**Requires:** Use `fill` for a value and `tabulate` for a function of the index. Do not bring back a function overload of `fill`.

**Unfinished:** Nothing.

**Could not resolve:** Nothing.

---

## P-90 `Maybe`'s empty case is the team's parametric `Nothing[\T\]`, in the one library and the specification

**Decided:** A `Maybe[\T\]` is `Just[\T\](x)` or the empty case, and the empty case is written with its static argument, `Nothing[\String\]`, in the one library (the interpreter's, which the compiled path moves onto at the switch-over) and in the specification. A bare `Nothing` (one object, no static argument) is future work.

**Applies:** Everywhere the empty case is written. The bare `Nothing` needs an object declaration whose own `where` clause binds a type variable of its `extends` clause, e.g. `object Nothing extends Maybe[\T\] where {T extends Object}`. Neither path implements such a clause (F-21 measured both).

**Requires:** Write `Nothing[\T\]`. Do not try the bare `Nothing` before such a clause exists. Do not pursue the parked idea of inferring the static argument from the expected type (PLAN, "Off the path, parked"; review-queue item 167).

**Unfinished:** Object-level `where` clauses that bind an `extends` type variable, on both paths; then the bare `Nothing`.

**Could not resolve:**
- The example's `where` clause: `compiler.md` separates a declaration's own `where` clause (refused by the code generator) from a `where` clause on an `extends` entry (compiled). Written as `object Nothing extends Maybe[\T\] where {T extends Object}`, I cannot tell which of the two it is, so I cannot tell why the compiled path cannot already handle it. Language concept I lack (the syntax that tells the two apart is not in the skill).

---

## P-91 What an object with no `asString` prints: its bare Fortress type name, walk's spelling, on both paths

**Decided:** An object without its own `asString` prints just its Fortress type name as walk writes it (`Box`, or `Box[\ZZ32\]` for a generic instance), with no marker or hash code, on both paths. A debug marker, such as the Java class name, goes in `asDebugString` if one is wanted at all, never in the printed form. Walk's `asDebugString` prints `a Box: Box`.

**Applies:** To printing objects with no `asString`. The bare name is built on both paths (F-123).

**Requires:** Do not add a marker or hash to the default printed form. Make the compiled path's `asDebugString` print as walk's does.

**Unfinished:** On the compiled path: an `asDebugString` that prints as walk's (the compiled one prints `Box`, row 363); and printing an object that declares or inherits a zero-argument member named `toString`, which overflows the stack (row 321). Once the compiled path reads the one library, every object inherits the `getter toString` of that library's `trait Object`, so every object without `asString` will hit the overflow (PLAN, phase 4, "From the reviews").

**Could not resolve:**
- "belongs in `asDebugString` if one is still wanted": is a Java-class-name marker in `asDebugString` undecided, while making the compiled `asDebugString` match walk's (`a Box: Box`) is decided? I read it that way, but "if one is still wanted" next to a "still to build" item that is committed reads two ways. Unclear wording, minor.
- "the one library": glossed only in P-90. P-91 read alone needs that gloss, or the skill's "switch-over" paragraph. Minor.
