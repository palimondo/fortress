# Cold read of `record-landing/clean.txt`

Read with `CLAUDE.md` and the `fortress-repo` skill's core only, plus term look-ups in its `references/` (not `revival-changes.md`, not `sources.md`). Nineteen entries: fifteen facts, three positions, one ledger row.

Terms that recur and that the worker's context does not define (searched in the skill's core and references, not found): **rung** (as in "rung N", "rung P", `RungG`), **springboard**, **root task**. Each is noted once below where it first matters.

## F-19

- **Established:** The specification lets the iterations of a `for` loop, a tuple's elements, and the arguments of a call or operator run in parallel. A program has to be correct if they do, and also if they do not, because an implementation may run them one after another. The entry then says how each path decides in fact: walk starts a task for tuple elements, operands and call arguments where `TupleTask.worthSpawning` says so; the code generator where `ParallelismAnalyzer` marked the tuple or argument tuple. A parallel `for` over a range is split into `do … also do … end` blocks. Under walk each block is a task, and the library splits a `ZZ32` range to chunks of at most 16 elements, and a range with a stride to single elements. Compiled, the first block runs in place and the others fork only where `BaseTask.forkIfProfitable` allows; the prelude's `parloop` splits to `FORTRESS_LOOP_CHUNK` elements (default 1).
- **Conditions:** A loop is sequential only when every generator is `seq(g)` or `sequential(g)`. The compiled description holds for the compiler's prelude today (`parloop`); the 16-element grain is walk's library. The claim about `spawn` and `also do` is by grep and covers only programs under `explorations/`; tests under `ProjectFortress/` do use both.
- **Consequence:** Write no code that depends on either order or on parallel execution. For the model programs and probes, the only sources of parallelism are loops, tuples and arguments, so explicit threads need not be considered there.
- **Evidence:** Four specification passages (`for.tex:28-32`, `tuple-expr.tex:23-24`, `operator-app.tex:58-59`, `parallelism.tex:50-80`, and `:88-90` for sequential execution being allowed); `RangeInternals.fss:1498-1585`; `CodeGen.evalArg`; a grep; F-350 for the unmarked calls, the joins and the grain.
- **Could not resolve:**
  - "By grep, no program under `explorations/`, the model programs and the probes, writes `spawn`": I read "the model programs and the probes" as a gloss of "program under `explorations/`", but it can also be read as a list of three things. Unclear wording.
  - "which also governs a call's arguments" sits inside the sentence on tuples and operands; I take it to mean walk uses the same test for call arguments. Clear enough, slightly buried.

## F-134

- **Established:** On the compiled path, the name that a `typecase` clause or a `catch` clause binds is compiled as a local variable, and the compiled `cast[\T\]` succeeds on a value whose type is `T`. `cast[\ZZ32\](0)` still throws because the argument is a numeral, which is not a `ZZ32`. Inside the second or later arm of a `do … also` block, a local and a `try` with a named `catch` compile.
- **Conditions:** Compiled path only. Not covered: a name bound inside a clause's pattern (ledger rows 340, 498, open); a named `typecase` clause in a later `also` arm has no gated test.
- **Consequence:** A worker can use bound names in `typecase` and `catch` clauses in compiled code and can use `cast` on real values, but must not pass a bare numeral to `cast`, and should not rely on pattern-bound names or on a named `typecase` clause in a later arm.
- **Evidence:** Tests `compiler_tests/TypecaseBindRungG`, `CastBindRungG`, `library_tests/ClauseBindingRungB`, `TaskArmLocalSlot`, `TryInArmRungG`; a report's sections 1 and 10.
- **Could not resolve:**
  - The "so" in the headline: why the bound name being a local makes `cast[\T\]` match. I guess that `cast` is library code written with a `typecase` whose clause binds a name, but the entry does not say so. Unclear wording (missing link).
  - "a name bound inside a clause's pattern": I do not know what a pattern in a `typecase` or `catch` clause is, as distinct from the clause's bound name. Language concept I lack; not found in the skill.
  - "RungG", "RungB": "rung" is not defined in the worker's context; here it is only part of test names, so it did not block.

## F-347

- **Established:** On the compiled path, each place where a numeral is written, if the place's type names no type parameter, holds one value made before the program runs. The code generator evaluates ("folds") the body of the place type's own coercion from a numeral. If the result is a JVM `int`, `long`, `float` or `double`, it is a class-file constant. Otherwise it is a `static final` field, filled once by calling the coercion's compiled method (`coerce_T№natural` or `coerce_T№point`) with the numeral's four numbers passed as `ZZ` values. That method is compiled once, in the component that declares it, and any component can call it. For a program's own type, the type's minus on a negative constant also runs once.
- **Conditions:** Compiled path; the place's type names no type parameter (otherwise the method is called at each evaluation, row 957). The fold handles only a subset of code: constants, bound names, natives over built-in representations, and calls to functions and methods inside that subset. A coercion body with two calls of program functions in one operator or argument list spawns a task, which runs in place inside the root task that initializes the component's class (F-348).
- **Consequence:** A coercion from a numeral runs once per place, at class initialization, not at each evaluation, so its cost and side effects come once and early. In generic code at a type parameter it runs each time. Under walk, a folded constant at a library type converts from its exact value.
- **Evidence:** `NumeralCoercionFold.java`, `CodeGen.java`; six tests named; a report section.
- **Could not resolve:**
  - "the four numbers": not defined in this entry or in what I may read; P-174 later in this file defines them (`n`, `m`, `r`, `v`). A pointer to P-174 here would help. Unclear wording (missing reference).
  - "fold" has two senses in one entry: the code generator folding a coercion's body, and "a folded constant" in the last-but-one sentence, which I take to be the phase that folds an expression of numerals alone (skill, phase 4). The entry does not separate them. Unclear wording.
  - "a program type's minus on a negative constant runs once with it": "with it" could be the method, the fill of the static final, or the constant. I read: at the same time as the fill. Unclear wording.
  - "over a fragment of constants, bound names, …": I read "fragment" as "the subset of the language that the fold can evaluate". Readable, but had to guess.
  - "root task": not defined in the worker's context; F-348 uses it without defining it either. I read it as the first task on the pool, with no parent.

## F-348

- **Established:** Before a compiled program's `run`, the runtime initializes the class of every component the program uses: first the program's own component class, then the class of each component whose declarations those classes name, transitively. It does this inside one root task on a one-thread pool, after the program's arguments are set. The class loader finds the classes by the class names in each component's jar.
- **Conditions:** Compiled path. A component that is imported but whose declarations no class names is not initialized this way. A top-level variable's initializer is not part of class initialization; it runs at the variable's first use.
- **Consequence:** A numeral's static field (F-347) is filled inside a task that has no transaction; tasks that a coercion forks run in place, in sequence; and a coercion's side effects precede the program's first output. Start-up costs about 40 ms more (249–313 ms against 214–263 ms).
- **Evidence:** `MainWrapper.java:30-46`, `:92-95`; `FortressExecutable.java:113-141`; `InstantiatingClassloader.java:185-248`; tests `NumeralCoercionSpawnCompiled`, `NumeralCoercionSpawnImported`; a report and a review section; the timing measured once on code that landed as `f36a651243`.
- **Could not resolve:**
  - "measured once" beside two ranges (249 to 313, 214 to 263): one measurement does not give a range. I read it as one session of several runs. The ranges also overlap, so "about 40 ms" is not derivable from them as written. Unclear wording.
  - "takes about 40 ms more for it": "it" is, I think, the early initialization. Unclear referent.
  - "rung N's code": "rung" undefined in the worker's context; the commit hash makes the sentence usable anyway.
  - "root task": as under F-347.

## F-349

- **Established:** When several declarations apply to a call only through coercion and none is directly the most specific, walk compares them by a specificity relation that passes through other applicable declarations (I read: transitively), and picks the one than which no other is more specific. That is the specification's rule ("Coercion Resolution"). So with three declarations linked in a chain of coercions, walk runs the first of the chain, as the compiled path does, and reports no "Ambiguous coercion"; and a float numeral to the left of an `RR32` operand runs `RR32`'s operator.
- **Conditions:** Walk only; only where the specificity relation has no cycle (what walk does when it has one is not said). Walk's separate rule, that a declaration fitting a numeral as it is (at its default type) runs first, is unaffected.
- **Consequence:** A worker need not expect "Ambiguous coercion" from walk for a chain of coercions, and can expect both paths to choose the same declaration there.
- **Evidence:** `OverloadedFunction.java:2398`, `:2418-2438`; test `tests/NumeralLeftOfRR32Walk`; the three-declaration case by a probe with no test; a report section.
- **Could not resolve:**
  - "by specificity read through other applicable declarations, where none wins directly": the hardest phrase in the file so far. I read it as "A counts as more specific than C if A is more specific than B and B than C", but it could also mean "specificity as judged from the parameter types of the other declarations". Unclear wording, and partly a language concept (how coercion makes one declaration more specific than another) that the skill does not explain.
  - "runs the first": first of the chain, which I take to be the one whose parameter type is the source of the coercions (most specific). Not stated. Unclear wording.
  - "is apart from it": I read "is a separate rule and is unchanged". Unclear wording.

## F-350

- **Established:** On the compiled path, four kinds of group fork through one method, `CodeGen.genParallelExprs`: the arms of a parallel `do`, a tuple's elements, an operator's operands, and a call's arguments. The method joins every arm it forked before an exception can leave the group. The exception that leaves is that of the earliest arm, in source order, that threw. Arguments fork only where `ParallelismAnalyzer` marked the argument tuple.
- **Conditions:** Compiled path. A `VirtualMachineError` leaves without the joins. The analyzer marks no call written in the prelude's files, so the prelude's reductions run in sequence until the switch-over (row 982). The one library's parallel `ZZ32` range splits only ranges of more than `grainSize` = 16 elements.
- **Consequence:** Once compiled code runs against the one library, a reduction over more than 16 elements forks its halves, and after an exception no arm is still running. microGPT's widths are 16, 16, 4 and 4, so a reduction over one of its vectors forks nothing on either path (by reading, not run): do not expect parallel speed-up from the model's reductions at these sizes.
- **Evidence:** `BaseTask.java:113-131` (`joinIfForked`); `RangeInternals.fss:20`, `:1320`, `:1337`; `MicroGptFlat.fss:17`; tests `AlsoArmThrowsJoinsCompiled`, `CallArgumentsForkCompiled`, `tests/ParRangeGrainWalk`; a report and a review section.
- **Could not resolve:**
  - "an arm that was never forked is not run": I read this as "once an earlier arm has thrown, an arm not yet forked is skipped". Read alone it says an unforked arm never runs at all, which cannot be meant, since the first arm runs in place (F-19). Unclear wording.
  - "microGPT's widths": widths of what (vectors, layers) is left to the reader; the next clause ("one of its vectors") nearly settles it. Minor.
  - Compare F-19: there the 16-element grain is stated for walk's library, here for "the one library"; the skill says these are the same library, so consistent.

## F-351

- **Established:** A compiled `atomic` block's transaction checks, when it validates, its own reads and those of every enclosing (ancestor) transaction. What it records as a read: nothing for a read of its own write; for a read of an ancestor's write, that write; for a read of a committed value, that value; for a read of an empty array element, a mark. Validation happens at a read after the global lock has moved, and at a commit that did not get the lock at its snapshot. An abort names the transaction whose read failed; a program's `abort()` names none. The block's generated handler catches every exception (`BaseTask.leaveTransaction`): it ends the block's transaction; it restarts the block if the abort names that block's transaction, or for any abort if the block is outermost; anything else it rethrows, after a nested transaction has given its reads to its parent. A nested commit gives the parent its reads and writes, even when it wrote nothing. Because a block's or `try`'s exception-table entry comes after its body's code, an inner handler is taken before an outer one.
- **Conditions:** Compiled path. Open: a nested block alongside a plain write by another thread of its outer block (row 984).
- **Consequence:** Nested `atomic` blocks in compiled code can be relied on to see a consistent view through their ancestors and to restart at the right level; an explicit `abort()` in a nested block is not retried by the inner block but propagates to the outermost one, which restarts. A worker changing this code must keep the handler order and the hand-over of reads to the parent.
- **Evidence:** `Transaction.java:228-367`; `BaseTask.java:293-314`; `CodeGen.java:1835-1867`, `:2169-2173`; eight compiled tests and `ArrayStoreJUTest`; a report section.
- **Could not resolve:**
  - "once the global lock has moved" and "did not get the lock at its snapshot": terms of a particular transactional-memory design (a global version lock) that the entry and the skill do not introduce. I read "moved" as "its version changed since this transaction's snapshot". Concept not in the worker's context, not a Fortress language concept.
  - "`abort()` names none": the consequence (only the outermost block restarts) has to be worked out from the parenthesis two sentences later. I believe my reading is right but the entry does not say it outright. Unclear wording.
  - "a nested block beside a plain write by another thread of its outer block": I cannot tell whether "of its outer block" attaches to "thread" (a task forked inside the outer block) or to "write" (a write to something the outer block wrote). Unclear wording.
  - "an empty array element": I read "an element never written". Minor.

## F-57

- **Established:** The type a numeral gets differs between the two paths and between libraries. The checker types it by a numeral type of its own, `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]`, which the compiler's prelude and the one library each declare, and converts it to its default where nothing fixes a type. Walk, where nothing fixes a type, gives an integer numeral `ZZ32`, `ZZ64` or `ZZ` by magnitude; where the place fixes a type, it converts. In code generic over `T`, the only ways to get a constant of type `T` that work on both paths are the getters `x.zero` and `x.one` and the "witness `typecase`" (a `typecase` over a function of type `() -> T` with one clause per number type, P-78). `x + 1` with `T extends Integral[\T\]` fails the checker and runs under walk, because a coercion from a numeral into `T` itself cannot be declared.
- **Conditions:** The checker refuses an out-of-range numeral, or one that rounds to an infinity, at compile time; walk refuses these only when the place runs. The measurements were on an earlier library (F-79); `x.zero` is by reading only.
- **Consequence:** In generic numeric code, do not write a bare numeral where a `T` is needed; use `x.zero`, `x.one` or the witness `typecase`. Do not take a program that runs under walk as accepted by the checker.
- **Evidence:** `compiler/Types.java` (`useCompilerLibraries`, `useFortressLibraries`); F-79, F-341, F-342, P-78; `distance-triage.md` section 2.3; `evidence-B.md` sections 3.1, 4.1, 6.2.
- **Could not resolve:**
  - "since such a coercion is refused as a cyclic hierarchy": I do not see why a coercion from a numeral type into a type parameter makes a hierarchy cyclic. Language concept I lack; not found in the skill.
  - "converts it into its default where nothing fixes a type (F-342)": what the checker's default is, is not said here, and F-342 is not in this file. Missing reference, not blocking.
  - The witness `typecase`: the entry defines its form, but not how a `typecase` over a `() -> T` function yields a `T`; that is left to P-78. Acceptable as a pointer.
  - The numeral type is written `NaturalNumeral[\n, r, v\]` here (three numbers) while F-347, F-341 and P-174 speak of "four numbers" for every numeral. I assume a natural numeral has no `m`; the file does not say whether the "four" then means three for a natural. Unclear wording across entries.

## F-341

- **Established:** Under walk, a numeral evaluates to a default value that also carries the numeral's four numbers: an integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value; a radix-point numeral is the nearest `RR64`; one value per place in the source. Where the place fixes a type (a typed binding, an assignment, a field, a parameter, a declared return type, a coercion), walk converts it by the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, with the four numbers bound as `ZZ` values, and keeps one result per site and type. A folded constant (such as `1/2`) at a library number type converts from its exact value, without the coercion. Walk refuses, when the place runs: a numeral out of range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, and one outside the coercion's `where` clause. In dispatch, the numeral first fits as it is, at its default type, and then only through its own numeral type's coercions. A type parameter fixed by several numerals takes the narrowest default that holds them all. At load, walk refuses a numeral type written as a supertype of a trait or object or as a static argument, but loads one in a `comprises` clause (row 981).
- **Conditions:** Walk only. The `h = 0.5` result was observed once at `17e93a7da8` and no test pins it (row 973).
- **Consequence:** `q: QQ = 0.1` is exactly 1/10, and `y: RR64 = 0.5` is equal (`SEQV`) to a computed 0.5. But comparing a `QQ` variable with a bare numeral, `h = 0.5` where `h: QQ = 1/2`, is `false`, because the library's `=` over `Any` takes the numeral at its default `RR64`. So give a numeral a typed place before comparing it with a non-default number type.
- **Evidence:** `interpreter/evaluator/values/Numerals.java`; twelve tests under `tests/`; three report sections.
- **Could not resolve:**
  - "a store keeps its default alone": I cannot tell what "a store" is (a write into an untyped variable, an array element, a field without a type?) or what "alone" excludes (I guess: the four numbers are dropped). Unclear wording.
  - "and reads a tie at the default": I guess "when two declarations tie, walk decides as if the numeral had its default type". Could also mean a tie is reported at the default. Unclear wording.
  - "then by its own type's coercions only": "its own type" I read as the numeral type (`NaturalNumeral` or `RadixPointNumeral`), not the default type (`ZZ32`), so a `ZZ32`-to-`ZZ64` coercion is not tried. The pronoun allows both. Unclear wording.
  - `SEQV`: not explained; I read it as the strict-equivalence operator. Language concept, guessed.

## F-283

- **Established:** All 52 programs of the team's `DemoTests` run to completion under walk: each exits 0 and prints no "fail".
- **Conditions:** Run one at a time from `ProjectFortress/demos`, 600 s limit, empty input; `wordcount2` run from the tree's root; `tennisRanking` given the three files named at `FileTests.java:809-818`. Walk only: the compiled checker still refuses `trips.fss` (row 817). `Generator2Demo` uses `random` arrays whose product can overflow in `PROD`, so one `IntegerOverflow` stop from it in a run is not a regression (row 986).
- **Consequence:** No suite runs the demos, so a batch that changes walk or its library must run them again (P-79), with the driver in the named report's section 13; the expected output is "demos: 52 run, 52 reached their end".
- **Evidence:** The driver's output on the code that `4445d848b` committed; `rung-team-demos/REPORT.md` sections 3 and 13; `climb-batch-27/REPAIR-review.md` section 2. No gated test.
- **Could not resolve:**
  - "one such `IntegerOverflow` stop in a run is not a regression": then the driver's line would read 51 of 52, against the headline. I read the headline as "barring that random stop". Clear enough; a small tension.
  - "a batch": not defined in the worker's context; I read it as a group of changes landed together. Minor.

## F-175

- **Established:** Throughout the specification, a `comprises` clause is now read as a statement about values: every value of the trait has one of the listed types (the skill's reading), not a statement about which types may extend it. Appendix I records the change under "Traits with comprises clauses read at the level of values". Under this reading a call runs the declaration that covers its argument's value, and, where the overload set's declarations have no static parameters, the call's static type is the intersection of the return types of its most specific declarations. Appendix I lists five departures of the compiled path: the checker checks `comprises` only at the closed trait's immediate subtypes (row 487); the code generator crashes on a method call on a result typed by that intersection (row 540); with any declaration having static parameters, the checker types the call by one most specific declaration, on purpose (row 543); the checker refuses the Meet Rule's closed-trait example when its declarations have static parameters (row 546); the checker's verdict on an overload set can depend on which components were compiled earlier in the same JVM (row 547).
- **Conditions:** The typing rule holds only for declarations without static parameters. The five rows limit it on the compiled path.
- **Consequence:** Cite the specification's value-level reading as settled (it carries out P-60). On the compiled path, expect the five departures; do not call a method on an intersection-typed result, and treat a checker verdict on overloads as possibly order-dependent.
- **Evidence:** `Specification/appendices/changes.tex:3345-3541`, rows at `:1616-1619` and `:3611-3618`; `rung-spec-overloading/decision-record.md` sections 8 and 9.
- **Could not resolve:**
  - "It builds P-60": I read "it carries out the decision P-60". "Builds" could also mean "builds on". Unclear wording.
  - "A call whose argument's static type stands between two closed traits": I cannot picture "stands between". My guess: the static type is a supertype that two closed traits' declarations each partly cover, or a type that is a subtype of one closed trait and a supertype of another. Unclear wording, and the overloading concept behind it is not in the skill.
  - "its type is the intersection…": "its" I take to be the call's. Pronoun chain across three sentences ("its value", "its declarations", "its type") is hard to follow. Unclear wording.
  - "closed trait": not defined; I read "a trait with a `comprises` clause". Guessable.

## F-268

- **Established:** The code generator compiles a declaration whose `extends` clause instantiates a generic trait at `Any` (it emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY`), but crashes when the static argument is a tuple type containing `Any`, as `Holder[\(Any, ZZ32)\]`, with a null-pointer message on `IdOrOp.getApiName()` (row 889).
- **Conditions:** Compiled path; `extends` clause.
- **Consequence:** Extending a generic trait at `Any` is safe in compiled code; at a tuple holding `Any` it is not, until row 889 closes. A fix of row 889 turns the `XXX` test red and must promote it.
- **Evidence:** `CodeGen.java:6318-6323`; tests `ExtendsGenericAtAnyCompiled.test` and `XXXExtendsGenericAtTupleOfAny.test`; a report's sections 1 and 5.
- **Could not resolve:** nothing. Clear.

## F-302

- **Established:** In certain loops (see below), HotSpot's C2 compiler has to inline to depth 12 below the loop to reach the end of a boxed number's constructor chain, and by default it stops inlining at depth 16 (JDK 25, `MaxInlineLevel=15`: a frame at depth d inlines when d ≤ 16). The prelude's `+` reaches `Object.<init>` under its result's box at depth 12; a top-level binding at depth 10. A temporary box whose constructor chain goes past the limit is not removed. Shown by lowering the limit to 8: a loop of two nested helper calls rose from 33 to 96 bytes allocated per iteration.
- **Conditions:** Observed once (F-301), on the compiler's prelude. For the one library the figures are by reading only: its `ZZ32` springboard chain is two classes longer (`ZZ32`, `AnyIntegral`, `Number`, `AnyAdditiveGroup`, `Object`, `Any` against `ZZ32`, `Number`, `Object`, `Any`), because a springboard extends the springboard of its trait's first `extends` entry.
- **Consequence:** There is a margin of 4 frames today: an operator called from more than 4 further inlined frames keeps its temporary boxes. If `FZZ32` extends the one library's springboard after the switch-over, the margin falls to 2 frames (not measured, since nothing compiles against the one library yet). Deep helper nesting around arithmetic in hot loops costs allocation.
- **Evidence:** `perf-probes/helper-calls/REPORT.md` sections 3 and 4; `FortressLibrary.fss:775`, `:671`, `:380`, `:356`; `CompilerBuiltin.fsi:210`; `CodeGen.java:5595-5602`.
- **Could not resolve:**
  - "In those loops": the headline opens with "those" and nothing in the entry says which loops. Presumably the loops of F-301, which is not in this file. This blocked me from knowing where the fact applies. Unclear wording (the entry does not stand on its own).
  - "C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default": on first reading this says C2 stops at 12 here where it normally stops at 16. Only the body shows that 12 is the depth the chain needs and 16 the limit. Unclear wording.
  - "is no longer removed": "no longer" suggests something changed over time; I read it as "beyond the limit, is not removed". Unclear wording.
  - "springboard": not defined in the worker's context (searched the skill and its references). From the entry I gather it is a generated class per trait, forming a superclass chain that a box's constructor walks. Implementation concept I lack.
  - "a top-level binding at 10": depth 10 for what exactly (a `+` whose result is bound at top level?). Unclear wording.

## F-315

- **Established:** The code generator now compiles three things: a trait or object that extends a generic trait at `Any`; a `try` with a `forbid` clause; and a function or method declared with the `test` modifier. For `forbid`: an exception of a listed type that no `catch` clause took is rethrown as a `ForbiddenException` chained to the original, built by the library's own constructor; in that case the `finally` clause does not run (row 890).
- **Conditions:** Compiled path. Still refused: `Bottom`, `Self` or an abbreviated type as that static argument; a tuple holding `Any` (row 889); the `override` modifier (row 650). The `test` modifier on a method is supported by reading the shared modifier guard (`CodeGen.java:3087-3089`) and one probe, with no gated test. The library's `test stringifyChars` gets past the modifier and stops at a varargs call (row 624). F-34 lists what the code generator still refuses in the library.
- **Consequence:** These three constructs no longer block compiling a component. Do not rely on `finally` running when a forbidden exception escapes (the `XXX` test `XXXFinallyOnEscape` marks it as a defect awaiting repair).
- **Evidence:** Tests `ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`, `XXXFinallyOnEscape.test`; `rung-codegen-walls/REPORT.md` sections 1, 2, 5; `reviews/batch-25-review.md`, points 3 and 4.
- **Could not resolve:**
  - "and the `finally` clause does not run (row 890)": the sentence states it as plain behaviour; only the `XXX` test name at the end tells me it is a defect. Unclear wording.
  - "an abbreviated type as that static argument": I do not know what an abbreviated type is in Fortress (a type alias? a shorthand such as an array type?). Language concept I lack; not found in the skill.
  - "that static argument": refers back two sentences to "at `Any`". Followable, but distant.

## F-337

- **Established:** The compiled path's class loader loads every helper class under `nativeHelpers/` itself, and delegates only the classes listed in `mustUseSystemLoader` (which lists `MainWrapper` and no helper) to the system loader. So a helper's own static field that the compiled main sets is set on a different copy of the class than the one the compiled program uses. State that the main sets is visible to a helper only if it lives on a delegated class. Accordingly `systemOps.getArgs`, `programArgs.count` and `programArgs.at` read `MainWrapper.cachedArgs`, which both the compiled main and walk's driver set.
- **Conditions:** Compiled path's loader; holds while `mustUseSystemLoader` lists no helper class.
- **Consequence:** A native helper that needs run-time state set outside the compiled program must keep that state on a class the loader delegates (such as `MainWrapper`), not in its own static.
- **Evidence:** `InstantiatingClassloader.java:2969-2991`; a shown run: with arguments `a b`, `count =  0` over a static of `programArgs`, `count =  2` over `MainWrapper.cachedArgs`; tests `NativeHelperProgramArgsPassedCompiled` (two arguments) and `NativeHelperProgramArgsCompiled` (none); a report section.
- **Could not resolve:**
  - The headline's second half, "so a helper reads state that the compiled main sets only through a class that the loader leaves to the system loader", can be parsed as "reads state that the main sets only through a class…" (the main sets it only that way). The body settles it: "only through" belongs to "reads". Unclear wording in the headline, resolved by the body.

## P-175

- **Decided:** On the compiled path, a call's arguments are to run in parallel wherever `ParallelismAnalyzer` judges them worth a task, exactly as a tuple's elements do. The purpose: the one library's range joins a reduction's two halves as the two arguments of one call (`red.join(loop'(lo, mid-1), loop'(mid, hi))`), so forking arguments makes reductions (`SUM`, `DOT`, `BIG MAX`) parallel once compiled programs run the one library. Second, the one library's parallel range is to stop splitting at a grain size, a chunk that runs efficiently in sequence, not at single elements.
- **Applies:** Compiled path, for calls; the library's parallel range on both paths. It depends on a group of forked arms joining every arm before it completes abruptly; that was missing when the decision was taken and F-350 says it is there now.
- **Requires:** Do not make the library bind the halves as a tuple instead, and do not leave reductions sequential: both alternatives were declined. Keep the join-before-exception property when touching `genParallelExprs`.
- **Unfinished:** Nothing is named as unbuilt in the entry itself; it defers to F-350 for the present state. From F-350 and the ledger row I gather: the analyzer marks no call in the prelude's files until the switch-over (row 982), and how the analyzer judges "worth a task" is contested (last entry).
- **Why (as given):** the specification evaluates each argument in its own implicit thread (`parallelism.tex:60-64`); walk forks a call's arguments (`Evaluator.java:342`); the model's parallelism is its reductions.
- **Could not resolve:**
  - "split down to single elements when he decided", "in his words": "he" has no antecedent in the entry. I read "the curator". Unclear wording.
  - "It needs a group of forked arms to join every arm before it completes abruptly": first "it" is the decision, second "it" is the group. Readable on a second pass. Unclear wording.
  - "the review": used four times before and after the one place that gives its path (`reviews/parallelism-foundations-2026-11-08.md`); I assume all refer to that file.
  - The grain's value (16) is not in the position, only in F-350; I take the position to fix the principle and not the number.

## P-174

- **Decided:** A numeral has a type of its own that exists only at compile time: the Working Draft's `NaturalNumeral`, or `RadixPointNumeral` when it has a radix point, both subtypes of `Numeral`, with the numeral's four numbers as static parameters: digit count `n`, digits after the point `m`, radix `r`, and the digits read as one integer `v` (`3.125` is `RadixPointNumeral[\4, 3, 10, 3125\]`). Every number type, the library's included, accepts a numeral through a coercion generic over those numbers, whose body calls the type's constructor on values computed from them. The numbers are naturals of any size and are exact `ZZ` values inside a coercion's body. The compiler instantiates the coercion for each numeral and folds it (P-176). A numeral has no sign: `-3` at a program's type is that type's prefix `-` applied to the coercion's result for `3`, and a type with no `-` refuses it. Any other expression of numerals alone is folded first (P-173) and reaches such a type only through the type's coercion from the folded value's type (`QQ` for `1/2`), because coercions do not chain.
- **Applies:** To every numeral and every number type, in the library and in programs. The `NN32` bound of P-40 applies to sizes, not to these numbers. Left out of the design: the binary chapter's numeral coercion and `opr ||`. It replaces the implementations' `IntLiteral` (P-76) and `FloatLiteral` (P-172).
- **Requires:** A number type that should accept numerals must declare the generic coercion. A worker must not give a numeral type getters, `asFloat`, `asString` or `=` with a number type, and must write a numeral type only as the parameter type of a coercion or an operator. Do not expect a numeral value at run time.
- **Unfinished:** Rows 960 and 981 hold the tree's departures: the digit count of `00.5`, and walk running a numeral type written in a `comprises` clause.
- **Why (as given):** the Draft gives numerals their own types so that library designers decide how numerals interact with other types, and has libraries define the coercions (`literals.tex:132-148`).
- **Could not resolve:**
  - "with its four numbers" for both types, yet F-57 writes `NaturalNumeral[\n, r, v\]` with three. I assume a natural numeral has no `m`; the position does not say so. Unclear wording.
  - "is written only as a coercion's or an operator's parameter type" beside "No numeral value exists when a program runs": if an operator can take a numeral-typed parameter, I do not see what it receives at run time. Perhaps such an operator is also folded at compile time. Language or design concept I lack.
  - "at a program's type `-3` is…": I read "a program's type" as a type that a program declares, as opposed to the library's; what happens with `-3` at a library type is not said (I guess the coercion's result is negated the same way, or the fold handles it). Unclear wording.
  - "below `Numeral`": I read "a subtype of". Minor.
  - "the digit count of `00.5`": I can guess the issue (leading zeros counted or not) but the entry does not say which way the tree departs. Left to row 960.

## P-176

- **Decided:** A numeral at one place in the source denotes one value, the same on both paths, made once. The compiler folds the coercion instantiated for that numeral (P-174). Where the result is a JVM `int`, `long`, `float` or `double`, it is a class-file constant; otherwise (as at `QQ` or a program's own type) the constructor call on the constants runs once per place, into a `static final` field filled when the class loads; a program type's own `-` on the numeral runs there too. Walk fixes the coercion's static arguments from the four numbers, runs the coercion at the place's first evaluation, and keeps the result for the place.
- **Applies:** Both paths. Before the switch-over, the compiler's prelude carries the design (P-37), so the two paths agree. Walk refuses a bad numeral only when the place runs, until walk runs the checker (P-12).
- **Requires:** Neither path may evaluate a numeral's coercion more than once per place, and both must give the same value at the same place. A change to the library's numeral coercions before the switch-over must be mirrored in the prelude.
- **Unfinished:** Row 957: a place whose type names a type parameter (the coercion runs at each evaluation there, per F-347). Walk running the checker (P-12).
- **Why (as given):** a numeral is a constant of the program; a class file cannot hold an object, so a field filled once at load is the nearest form.
- **Could not resolve:**
  - "it refuses a numeral only when the place runs, until it runs the checker (P-12)": both "it" are walk, I believe; the second could be read as the place. Unclear wording, minor.
  - "the same on both paths" beside F-341's `h = 0.5` case, where walk's numeral at no typed place is an `RR64` default: I take the position to speak only of a place that fixes a type. Not stated.

## Ledger row "?" (the parallelism analyzer judges by declaration place)

Read as a fact, since it is a gap-ledger row. Its number is "?", which I take to mean not yet assigned.

- **Established:** On the compiled path, `ParallelismAnalyzer` decides that a call is worth a task by where its function is declared, not by how much work it does. `forFnDeclDoFirst` adds a function's name to the "compute-intensive" set when the visit reaches its declaration; `forFnDeclOnly` removes the declaration's node but not the name, so a name never leaves the set. A call counts if its function's name is in the set at that moment, so a call of any named function declared earlier in the file counts and one declared later does not. A tuple, an operator or an argument tuple forks when two or more of its elements count.
- **Conditions:** By reading the code at `d89fc0fda4` (`ParallelismAnalyzer.java:204-209`, `:214-226`, `:125-130`, `:186-192`); not run; no reproducer. Status `CONTESTED`, kind "implementation gap (codegen)". Sibling rows 982 and 951.
- **Consequence:** Two cheap calls of earlier-declared functions fork, and two costly calls of later-declared functions run in order. The specification allows either, so no program is wrong; the cost is performance, and the order of declarations in a file changes what forks. A worker should not repair it unasked: whether the analyzer is repaired before the switch-over is the curator's decision.
- **Evidence:** The cited lines; sources named as the parallelism review and "climb batch 30 rung P's skeptic"; specification reference `basic/evaluation/parallelism.tex`, "Threads and Parallelism".
- **Could not resolve:**
  - The columns have no header in this file. I inferred: number, claim, status, kind, specification reference, reproducer, source, notes. Not a wording fault of the row, but a cold reader has to guess.
  - "declared earlier in the file": earlier than the call, or earlier than the enclosing function's declaration? The notes ("when the visit reaches its declaration") suggest: visited before the call is visited. Does a function count inside its own body (a recursive call)? Not said. Unclear wording.
  - "rung P's skeptic": "rung" and "skeptic" are not defined in the worker's context; I read it as a reviewing agent of one step of batch 30. Only a source label, did not block.
  - "the curator's": I read "the decision is the curator's". Terse but clear.
  - `CONTESTED`: the skill's `records.md` lists it as one of seven statuses and leaves its definition to the row template, which I did not open; from "Open: … the curator's" I read it as "a question is open for the curator".
