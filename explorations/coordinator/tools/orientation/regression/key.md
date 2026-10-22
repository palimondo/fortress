<!-- The answer key of the orientation's regression quiz: for each question of questions.md, the expected decision with its path and scope qualifications, the wrong answers to watch for, where the skill gives the rule, and its evidence in the record as of 2026-10-22; for the grader only, never for the reader. -->

# Regression quiz: the key

## How to use it

The reader answers `questions.md` with only `CLAUDE.md`, the `fortress-repo` skill's core, its area parts and the orientation. The grader compares each answer with its case below (`../quiz-grade.md`): **right**, **wrong**, or **right without its path or scope qualification**. Grade the decision and its scope, not the wording, and not whether the reader names the record entries. An answer that says "look it up first" is right only if it also says where, and what it does with each result the key names.

Each case gives:

- **Trap**: the default assumption that the case tests, and where it is on record: the pretraining quiz (`explorations/reviews/fortress-pretraining-quiz.md`, "the quiz"), its audit (`explorations/reviews/skills-distillation-audit.md`, "the audit"), or a worker's failure.
- **Expected**: the decision. **Scope**: the path and switch-over qualifications that a full answer needs.
- **Wrong**: answers that fail the case. **Partial**: what counts as right without its qualification.
- **Skill**: where a reader of the skill finds the rule: the core (`SKILL.md`), an area part (`references/X.md`), or the orientation (by the subject of its rule, since the orientation's text changes). A failed case counts against the orientation only if one of its passages misled the reader, or a rule that the case needs is in none of these places (`../quiz-grade.md`).
- **Evidence**: the record's entries (FACTS `F-N`, POSITIONS `P-N`, gap-ledger rows), read on `main` at `b9090d9bd` (2026-10-22).
- **Since the audit**: where the audit's answer of 2026-10-08 no longer holds.

The record does not fully settle three cases: 2 (which way to record the defect), 18 (which repair) and, in one detail, 6 (the compiled spellings). Each says so under **Open**.

## Case 1: running a source program, and whether it is well typed

- **Trap.** `fortress run Foo.fss` runs a source program (the quiz, §9, graded wrong in the audit, B.9); a run under the interpreter shows a program is well typed (the quiz, trap 13).
- **Expected.**
  - Walk: `bin/fortress explorations/probes/Probe.fss` from the tree's root, after the setup lines (`bin/fortress walk ...` is the same). No compile step: walk runs the phases itself, with the interpreter's library.
  - Compiled: `cd ProjectFortress`, then `../bin/fortress compile ../explorations/probes/Probe.fss`, then `../bin/fortress run Probe`: `run` takes the component's name, not a file, and compiles no source. If a build started the caches again, the library order comes first. A failed compile leaves a 0-byte jar, and `run` then prints "Could not load Probe": read the compile's error instead.
  - Well typed: a walk run proves nothing, because walk checks no static types. `fortress typecheck` checks a program against the compiler's prelude, so it is no check of a walk program. The compile's type check is against the compiler's prelude too; the compiled checker reaches the interpreter's library only through the count stage, and walk's programs only after the switch-over.
- **Scope.** Until the switch-over, the compiled program links against the compiler's prelude, not the interpreter's library, so the two runs use different libraries.
- **Wrong.** `fortress run Probe.fss` for walk; `bin/fortress Probe.fss` as the compiled run; a walk run, or `fortress typecheck`, as proof of the types.
- **Partial.** The right commands, with no word on which library each run uses, or on what the type check checks against.
- **Skill.** Core: "walk", "compiled path", "The phases"; `interpreter.md`, "Running a program"; `compiler.md`, "Running" and "The `fortress` commands"; `build-and-caches.md`, "The library order".
- **Evidence.** F-7, F-9, P-12, P-37.

## Case 2: the specification and an implementation disagree

- **Trap.** "Where the spec and the implementation disagree, the source tree is the authority"; "check the tests and library source before trusting the spec" (the quiz, its preamble and trap 12; the audit, B.10, "needs the revival's rule beside it"). The opposite default, "the specification wins, so change the library", is a trap too.
- **Expected.**
  1. Search the record first: FACTS and POSITIONS (`positions:` and title queries, then a grep of both files for the function's name), the gap ledger (`ledger-find:`), and the orientation; read the passage's Appendix I entry if it has one.
  2. If a decision of the curator says which side is correct, the other side is wrong: change it if it is in your area, test first; otherwise record the departure.
  3. If no decision says so, two of the team's sources disagree: it is a conflict. Switch to exploring (`exploring.md`): gather the team's sources, weigh them ("Weighing the sources"), and report a decision not taken for the curator, with the sources and their dates, the possible solutions, and which one keeps today's behaviour. Change neither the library nor the specification to settle it.
  4. The test: the defect is deferred and the conflict leaves it open, so the test asserts today's behaviour, walk's value, and the defect gets a gap-ledger row, or the row is handed over in the report (`tests-writing.md`, "How a defect is recorded", item 3).
- **Scope.** The team's test is no oracle: it can be right about the team's walk and wrong here. "The library's own practice is the standard" (P-27) governs how an extension is designed, not which answer a function gives.
- **Wrong.** Asserting walk's value because the code and the team's test agree, with no search and no report; changing the library to the specification's value, or editing the specification, without a decision; settling it by the reader's own judgement.
- **Partial.** The procedure right, with the test asserting the specification's value in an `XXX` test (item 2).
- **Open.** The record does not draw the line between item 2 ("the specification settles it") and item 3 ("a conflict leaves it open") for a plain disagreement of the specification and walk. Here the team's own test sides with walk, so two of the team's sources disagree, and item 3 follows the core's definition of a conflict. Hence the partial grade for item 2.
- **Skill.** Core, "When to explore" and "Rules for every task"; `specification.md`, "When the text and an implementation disagree"; `exploring.md`, "The choices that are yours" and "The procedure"; `tests-writing.md`, "How a defect is recorded"; the orientation's opening paragraphs (search FACTS and POSITIONS before calling a disagreement a conflict; a team test can be wrong here).
- **Evidence.** P-25, P-26, P-27, P-95; `explorations/reviews/revival-record-synthesis.md`, "Recovered pretraining audit and the missing regression check" (the correction that is "not merely a language fact").

## Case 3: overloads that differ in their static parameters

- **Trap.** The Working Draft's ban on overloads that differ in their static parameters, which the quiz repeats as "overload sets are checked statically, pair by pair" (the audit, B.3, graded outdated); or treating the old text against the checker as a conflict to explore.
- **Expected.** Keep the pair: it is allowed, on both paths. The record settles it (P-45): the specification now states the type group's 2011 model, so there is nothing to explore. The pair is judged on declared domains by the No Duplicates, Meet and Return Type Rules, the Return Type Rule at every instance. `Box[\Circle\]` lies strictly inside the generic declaration's domain, and both return `String`, so the pair is valid. For an argument of type `Box[\Circle\]`, the specialised `describe(b: Box[\Circle\])` runs. The order in which the two are written does not matter: walk chooses by declared parameter types, not by the order of writing.
- **Scope.** Both paths: walk's load check reads a generic declaration beside a plain one on their declared domains and accepts this pair; the compiled checker accepts it.
- **Wrong.** Refusing, renaming or merging the pair because of the old ban; calling it a conflict; reordering the declarations to choose which runs; the generic one running for `Box[\Circle\]`.
- **Partial.** Kept and valid, without which declaration runs or why the order does not matter.
- **Skill.** Core, "Dispatch is on every argument"; the orientation's rule that overloads may differ in their static parameters, and its rule that walk chooses by declared parameter types; `interpreter.md`, "What walk checks".
- **Evidence.** P-45, F-174, F-50, F-26, F-27; P-26 (the type group's "specialization", `tail(x: List[ZZ])` beside `tail[X](x: List[X])`, is this shape).
- **Since the audit.** B.3 said walk "can still report an ambiguity" on such pairs; walk now reads a generic beside a plain declaration on declared domains (F-27, F-252).

## Case 4: is a `ZZ32` a `ZZ64`; which overload runs; what a generic call promotes to

- **Trap.** A nested number tower (Java's widening, Haskell's classes; the audit, B.6, "missing"); Java's choice of `f(long)` for an `int` argument; no conversion at a generic call (Haskell), or `T` at the join `Number` (Julia).
- **Expected.**
  - `f(n)` gives `"number"`. `ZZ32` is not a subtype of `ZZ64`: the number types are siblings under `Number`. `f(x: Number)` fits the `ZZ32` argument without a conversion, and a conversion never changes which declaration runs when one already fits. The coercion from `ZZ32` into `ZZ64` is used only when no declaration fits without one.
  - `pick` runs, at `T = ZZ64`: the narrowest type into which both arguments coerce (promotion). The `ZZ32` argument is converted.
- **Scope.** Both paths give both answers. The compiled checker tries a call by subtyping before coercion and chooses the coercion statically; walk converts only when no declaration fits without conversion, and chooses by the run-time value. Walk promotes from run-time types, so where a static type is wider than its value the paths can instantiate differently (row 509), which this case does not reach.
- **Wrong.** `"wide"`; `pick` refused, or run at `Number`.
- **Partial.** Both answers right, with no reason given, or with `pick`'s instance explained as a subtype relation ("`ZZ32` widens to `ZZ64`") in place of a declared coercion.
- **Skill.** Core, "Numbers are siblings, not a tower"; the orientation's rules on the flat number types and on coercion and promotion.
- **Evidence.** P-43, P-46, P-49, P-74, F-131, F-128, F-137, F-73.

## Case 5: a `long` into a `double`

- **Trap.** Java's implicit `long` to `double` widening. A worker failure: the team demos `BiCGSTAB` and `BiCGSTAB2` divide a `ZZ64` by a float and stop under walk (row 791).
- **Expected.** Write the conversion: `seconds: RR64 = asFloat(elapsed) / 1000000000.0` (`1.0E9` too). A `ZZ64` goes into `RR64` only when written out, by `asFloat`, the explicit conversion that `Number` declares (`Library/FortressLibrary.fsi`, `trait Number`), since the conversion can lose precision. Without it, walk stops: "Failed to find any matching overload, args = (…: ZZ64,1.0E9)". If `elapsed` were a `ZZ32` (or a numeral), it would convert into `RR64` implicitly, so `elapsed / 1000000000.0` would do.
- **Scope.** The rule is the interpreter's library's, which the compiled path reads after the switch-over. Until then the compiler's prelude differs (by reading, at `b9090d9bd`): its `RR64` coerces only from float literals and `RR32`, its `ZZ32` converts by a dotted `asRR64()`, its `ZZ64` declares no conversion into `RR64`, and its `nanoTime()` answers an `RR64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`). Not required for a right answer.
- **Wrong.** `elapsed / 1e9`, or any implicit conversion, for the `ZZ64`.
- **Partial.** The `asFloat` line, with no word on the `ZZ32` case. Keeping `asFloat` for a `ZZ32` is not wrong: `Number` declares it for every number type.
- **Skill.** `library.md`, "The curator's decisions on the library" (the `RR64` bullet); core, "Numbers are siblings" (a wider type declares a `coerce` from each narrower one).
- **Evidence.** P-74, F-131, row 791.

## Case 6: arithmetic that must wrap

- **Trap.** Java's silent wraparound of `int` arithmetic (the quiz, §6 and trap 11, right on overflow; the audit, B.6: wrapping types "may exist", graded wrong).
- **Expected.** Under walk: `h := ((31 DOTTIMES h) DOTPLUS c)`, with the wrapping operators ⨰ `DOTTIMES` and ∔ `DOTPLUS`, every such expression fully parenthesised, since their precedence is stated only among themselves. `31 h + c` raises `IntegerOverflow` once the hash leaves `ZZ32`, which a long string reaches.
- **Scope.** Under walk the plain operators raise `IntegerOverflow` on every fixed width (P-73); the compiled path raises it too for `+`, `-`, multiplication, division, negation and absolute value on `ZZ32` and `ZZ64`. On the compiled path before the switch-over, the compiler's prelude reverses the spellings: its `DOTPLUS` saturates and its `BOXPLUS` wraps (row 348), and it declares no `DOTTIMES` (by grep at `b9090d9bd`). The prelude's spellings are respelled at the switch-over (P-38).
- **Wrong.** `h := 31 h + c` (or `31 * h + c`) expected to wrap; a `MOD 2^32` workaround presented as the language's way.
- **Partial.** The walk spelling right, with no word on the compiled path, or the claim that the same spelling wraps there.
- **Open.** The record gives no compiled spelling that wraps a product before the switch-over; a reader who says "not available compiled until the switch-over" is right.
- **Skill.** `library.md`, "The curator's decisions on the library" (the wrapping bullet); core, "Numbers are siblings" (overflow raises `IntegerOverflow`).
- **Evidence.** P-73, F-132, F-130, row 348, P-38.

## Case 7: a negative power for a fraction

- **Trap.** `2^(-1)` is 0.5 (Python, the team's walk) or the rational 1/2 (the Working Draft). A worker failure: the team's demos wrote `10^(-4)` and `10^(-6)` (P-79).
- **Expected.** Write a float base: `10.0^(-k)`. An integer `^` answers its base's own type: at a negative exponent the bases 1 and -1 give their exact power, 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`. So `10^(-k)` raises `IntegerOverflow` under walk for `k > 0`, the numeral `10` being a `ZZ32` there. A rational base gives a fraction too: `(2/3)^(-1)` is `3/2`.
- **Scope.** Before the switch-over, the compiler's prelude's `ZZ32` power gives 0, quietly, at a negative exponent, and a raw Java exception at a base of 0 (rows 441, 523). `10.0^(-k)` compiles before the switch-over too: the prelude's `RR64` power takes a `ZZ32` exponent, a negative one included (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:456`, `CompilerBuiltin.fss:955-971`).
- **Wrong.** `10^(-k)`; any answer that expects 0.5-style results from an integer base on either path.
- **Partial.** `10.0^(-k)` with no word on what `10^(-k)` does compiled.
- **Skill.** The orientation's rule on the integer power.
- **Evidence.** P-153, F-263, F-262, P-79, rows 441 and 523. Row 441's claim text still says that walk gives 0.5; P-153 and F-263 supersede that half.

## Case 8: a parallel loop with an accumulator

- **Trap.** A `for` loop runs in order, as in Java (the quiz, trap 1, right); a passing run shows the code is right; the suites run at one thread (the audit, B.4).
- **Expected.** The function is wrong: the `for` loop is parallel, so `acc := acc + a[i]` from several iterations is a race, though one run printed the right sum. The direct run used `FORTRESS_THREADS=1` from the setup lines, and no passing run, at any thread count, shows that there is no race. Write a reduction: `SUM a` over the array (a sum without generators needs no static argument), or `SUM[\RR64\][i <- a.indices] a[i]`. Correct but slower: the update inside `atomic do ... end`, or a sequential loop over `seq(a.indices)`. The suites, `harness-one.sh` and `junit.sh` run at four threads, so the race can make the test fail there, on some runs only.
- **Scope.** The specification's reduction variables are not built. On the compiled path, `atomic` compiles only as a block, not as an expression, and before the switch-over the compiler's prelude has no array types at all.
- **Wrong.** "Correct, since it printed the right sum"; relying on `+=` as a reduction variable; "the suites run at one thread".
- **Partial.** The race named and a reduction written, with no word on the threads of the direct run and of the suites.
- **Skill.** Core, "Parallelism and mutable state"; `interpreter.md`, "Running a program" (the setup's one thread); `tests-writing.md`, "Names, comments, citations" (checks at one thread and at four).
- **Evidence.** F-19, P-125, F-99.
- **Since the audit.** B.4 says the suites run at one thread; they are pinned at four (P-125, F-99).

## Case 9: a `SUM` in library code that must compile

- **Trap.** The element type is inferred from the body, as in Scala or Haskell (the audit, B.7, `SUM` "outdated in one point"). A worker failure: the reductions that leave out the static argument of `SUM` and the like are refused by the compiled checker, team demos among them (P-79, row 731).
- **Expected.** `total(n: ZZ32): RR64 = SUM[\RR64\][j <- 0#n] g(j)`. For `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, whose bound names the parameter, the static argument is written in every clause form: the compiled checker takes the element type neither from the clauses nor from a declared type that receives the value, and refuses the call without it. `total(0)` gives `0.0`: the sum's identity comes from the static argument.
- **Scope.** Under walk the unwritten form would run here, at the function's declared return type `RR64`; but a method's return type, a field or a parameter does not direct walk's instance, and an empty sum that no declared type directs gives the integer 0 (row 716). `SUM e` over a collection needs no static argument.
- **Wrong.** `SUM[j <- 0#n] g(j)`, because the body or the return type fixes `RR64`; `total(0)` as the integer 0 with the argument written.
- **Partial.** The written argument, with no word on why the checker needs it or on walk's difference.
- **Note for the grader.** `library.md`'s `SUM` bullet opens "If the generators and the body do not fix the element type, write it", which can lead a reader to leave it out here (`explorations/coordinator/consolidation-2026-10-22/evidence/orientation/outline.md`, discrepancy U1). If that bullet misled the reader, name it as the cause; it is an area part, not the orientation.
- **Skill.** Core, "Static parameters" (walk's instance of a reduction); `library.md`, the `SUM` bullet; the orientation's rule on a reduction's static argument.
- **Evidence.** P-78, F-59, F-228, rows 731 and 716.
- **Since the audit.** A4 says that under walk an unwritten argument binds `Bottom` and the reduction dies at its first element. Walk now instantiates it at the value's declared type or the elements' join (F-228). The checker needs the argument even where a declared type receives the value (row 731).

## Case 10: a type parameter with no bound, and one that nothing fixes

- **Trap.** `Any` does not hold tuples (the quiz, §2, graded wrong in the audit, B.2); an unconstrained type parameter is `Nothing` or `Bottom` (Scala; the team's walk); the expected type always fixes a result-only parameter (Java, Scala).
- **Expected.**
  - (a) Under walk, yes: the implicit bound of an unbounded type parameter is `Any`, which holds tuples. Compiled, no, until the switch-over: the compiled path bounds it by `Object`, so it refuses an instantiation at a tuple (row 412). Written out, `T extends Any` lets the compiled path take a tuple, as row 412's notes show for a function.
  - (b) `T` takes its bound, `Any`: the intersection of its upper bounds, never `Bottom` (`Object` on the compiled path until the switch-over).
  - (c) Compiled, yes: the checker narrows `T` by the expected type, `T = ZZ32`. Under walk, no: walk gives the call no expected type, so `T` is `Any`, and the binding refuses a `Tag[\Any\]` for a `Tag[\ZZ32\]` (row 510). Write `mk[\ZZ32\]()`.
- **Scope.** Walk still gives `Bottom` in three cases: two bounds of which neither is below the other (row 591), a bound only from above that names another static parameter (row 612), and a parameter that only a function expression's result fixes (row 587). An F-bounded parameter that nothing fixes stays open under walk, printed `OPEN`. Under walk, `T extends Any` written on the one parameter of an overloaded function is refused at load (`interpreter.md`).
- **Wrong.** "Tuples are not values of `Any`"; `T = Bottom` or `Nothing`; (c) running under walk.
- **Partial.** (a) to (c) right under walk only, with no compiled answer, or the reverse.
- **Skill.** Core, "Static parameters"; `compiler.md`, "Traps of the compiled path"; the orientation's rules on a type parameter that a call does not fix and on a call's expected type.
- **Evidence.** P-42, P-48, F-141, F-143, F-78, F-56, rows 412, 510, 591, 612, 587.
- **Since the audit.** B.11 lists "never `Bottom`" as a decision; walk now builds it (F-141), with the three exceptions above.

## Case 11: a type that extends two instantiations of one generic trait

- **Trap.** A walk run shows that a hierarchy is legal; the Working Draft's own examples and the team's nested number types break the rule (the audit, B.11, "missing").
- **Expected.** Do not keep it. No type may extend two instantiations of one generic trait (the exclusion rule): the compiled checker refuses `Temp`. Walk applies no instantiation exclusion, so it runs the program, which proves nothing. With the rule relaxed, such programs die with `IncompatibleClassChangeError`. Write `Temp extends Comparable[\Temp\]` only, and reach `RR64` values by a separate declaration or a conversion, as the library does (a widening function, a parametric object with a factory, a `coerce`). This rule is why the number types are flat.
- **Scope.** The specification's examples that break the rule stay in the text, marked "Not allowed": do not copy them.
- **Wrong.** Keeping the declaration because walk runs it.
- **Partial.** Refused by the rule, with no word that walk accepts it.
- **Skill.** Core, "Traits and objects, no classes"; the orientation's rule on the exclusion rule.
- **Evidence.** F-44, F-47, P-43, P-97, row 416.

## Case 12: a user type for `SUM`

- **Trap.** An operator-parameterised algebra, `Monoid[\T, ⊕\]`, with laws in `property` declarations (the quiz, §2 and §7; the audit, B.2 and B.7, graded wrong for the library).
- **Expected.** `object Money(cents: ZZ64) extends AdditiveGroup[\Money\]`: the library's algebra is self-typed traits with fixed operator names. `Money` declares `getter zero(): Money`, `opr +(self, other: Money): Money`, and the unary or the binary `-`. The static argument is the type itself: an extender at another type, such as `AdditiveGroup[\ZZ64\]`, is refused by the compiled checker. The sum: `SUM[\Money\][i <- 0#n] f(i)`, with the static argument written. An empty or filtered sum over `Money` fails under walk, at `unlift`, since the identity's fallback answers the numeral 0, not `Money`'s `zero` (row 436); a nonempty one runs.
- **Scope.** No `Monoid[\T, ⊕\]` is reachable: the library's one is commented out, `Library/incomplete/` is off the source path, and nothing that runs imports `GeneratorLibrary`. `Ring` and `Field` are not declared yet (P-28). A `property` declaration runs on neither path. Before the switch-over, the compiler's prelude's reductions give only a `ZZ32` or a `String`.
- **Wrong.** `extends Monoid[\Money, +\]` or any `opr` static parameter for the algebra; expecting the empty sum to give `zero`.
- **Partial.** `AdditiveGroup[\Money\]` and the declarations right, with the empty sum taken to work.
- **Skill.** Core, "Numbers are siblings" (the self-typed algebra); `library.md`, the `SUM` bullet and the opening list; the orientation's rule on `self` in a self-typed trait.
- **Evidence.** P-78, P-28, P-146, F-182, row 436; `Library/FortressLibrary.fsi`, `trait AdditiveGroup`.

## Case 13: `override` at the inherited parameter types

- **Trap.** Java's and Scala's `override` at the same signature. A worker failure: an `override` that overrides nothing in the library makes walk refuse every program at load.
- **Expected.** Keep `area(): RR64 = s s` without `override`. An `override` overrides an inherited declaration only where the inherited parameter types are strictly narrower; at the inherited declaration's own parameter types it overrides nothing. Walk refuses the program at load, "... does not override any inherited declaration", and in a library component that stops every program. The compiled checker accepts it (row 653), and the code generator refuses every `override` modifier, "Don't know how to compile this kind of FnDecl" (row 650).
- **Scope.** At an instance of a generic trait above a declared object, walk counts equal parameter types as overridden; `Shape` is not generic, so that does not apply.
- **Wrong.** Keeping `override`.
- **Partial.** Dropping `override` with no account of the three components' reactions.
- **Skill.** `interpreter.md`, "What walk checks"; `compiler.md`, "What the compiled path cannot compile yet"; the orientation's rule that `override` widens.
- **Evidence.** F-145, F-147, rows 650 and 653.

## Case 14: an abstract functional method from one trait, its body from another

- **Trap.** Scala's way, where a sibling trait's body implements the abstract member.
- **Expected.** `O` is refused on both paths: the compiled checker refuses it, and walk refuses it at load by the Meet Rule for Functional Methods. So `pick(O)` gives nothing: the program does not run. `O` must declare `pick(self): ZZ32` itself.
- **Wrong.** `O` valid, `pick(O)` gives 1.
- **Partial.** Refused on one path, with the other not named.
- **Skill.** The orientation's rule on duplicate functional methods.
- **Evidence.** P-149, F-142, F-223.

## Case 15: a walk test program

- **Trap.** A test compares its printed output with a saved file (the quiz, §9; the audit, B.9, graded wrong); a local variable may take any name (the audit, A5: "Variable even is already declared.").
- **Expected.** `ProjectFortress/tests/Name.fss` with `component Name`, the file named as its component; `export Executable`; `run(): () = do ... end`; a last `end`. Each check is an `assert(x, y, msg)` inside the program, for example `assert(even(n), (n MOD 2) = 0, "even")` in a `for` over `0#10`. No variable or parameter is named `even` or `odd`, which are functional methods of the library: the disambiguator refuses such a name. The harness reports the test green if it throws nothing, exits 0, and prints no `fail` or `FAIL` (a longer word such as `failure` counts). No expected-output file is added. It runs through `harness-one.sh` or `junit.sh`.
- **Scope.** Under walk, `assert` takes values of any type; the compiler's prelude declares the two-value `assert` only at `ZZ32`, `String` and `Character`.
- **Wrong.** A local named `even` or `odd`; an expected-output file, or a comparison with a saved run; a message that prints "fail".
- **Partial.** A right program, with the pass rule or the file's place missing.
- **Skill.** `tests-writing.md`, "A test program" and "Where a test goes, and how it passes"; core, "Functional methods" and "Rules for every task".
- **Evidence.** P-103, P-102; `Library/FortressLibrary.fsi` declares `odd(self)` and `even(self)`.

## Case 16: a numeral at an `NN32` binding

- **Trap.** A numeral binds to any integer type, as a Java literal to `int` (the audit, A5).
- **Expected.** Under walk the binding is refused: "RHS expression type Int is not assignable to LHS type NN32", since walk's numeral is a `ZZ32` value, from which `NN32` declares no coercion. Write `n: NN32 = unsigned(3)`. On the compiled path, `n: NN32 = 3` works: the checker types the numeral `IntLiteral`, which `NN32` converts from.
- **Wrong.** "Works on both paths"; "refused on both paths".
- **Partial.** The walk refusal and `unsigned(3)`, with no compiled answer.
- **Skill.** `tests-writing.md`, "A test program"; the orientation's rule that under walk a numeral has a run-time class.
- **Evidence.** P-76, F-57, F-74, row 454.
- **Since the audit.** A5 says that a numeral binds to `NN32` on neither path; the compiled half is fixed (row 454's notes).

## Case 17: a loop over `ZZ64` bounds whose steps depend on each other

- **Trap.** A range over any integer type, and a sequential `for`, as in Java.
- **Expected.** A range over `ZZ64` is a static error, and walk stops when it builds one: scalar ranges are over `ZZ32` only. Loop over a `ZZ32` range and widen each element, and make the loop sequential, since each step depends on the one before: for example `var total: RR64 = ...`, then `for i <- seq(narrow(lo) # narrow(hi - lo)) do j: ZZ64 = i; total := step(total, j) end`. A `while` loop over a `var` `ZZ64` counter is right too.
- **Scope.** `narrow` keeps the low 32 bits, which is exact for values that fit. A `for` without `seq` is parallel, and `total :=` from parallel iterations is a race and loses the order.
- **Wrong.** `for i <- lo:hi` over the `ZZ64` values; a parallel `for` with `total :=`.
- **Partial.** A `ZZ32` range and the widening right, with the loop left parallel; or `seq` right with a `ZZ64` range.
- **Skill.** `library.md`, "The curator's decisions on the library" (the ranges bullet); core, "Parallelism and mutable state".
- **Evidence.** P-77, F-133, F-19, P-72.

## Case 18: walk refuses at load a pair that the checker accepts (follow the pointer)

- **Trap.** Walk's load check gives the language's verdict; reorder or rename until it passes; or report a known gap as new.
- **Expected.**
  1. Before changing code, find the departure in the record: `interpreter.md`, "What walk checks", the rows that the orientation lists for walk's load check, and `ledger-find:` with words of the message, or `ledger-find:instantiation exclusion`. Row 416: walk applies no instantiation exclusion, so it refuses an overload on two instantiations of one generic trait. Its note names this very case: walk refuses `checkSelection` overloaded on `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]`.
  2. So the pair is valid by the specification and the checker, and walk is wrong. But a library edit that walk refuses at load stops every program, so it cannot land as it is.
  3. Then one of two: if your brief covers walk, fix walk's overloading check, test first, which promotes the gated `XXXNatSizeExclusionWalk.fss`. Otherwise follow the library's own way for this case, distinct names by rank, as `checkSelection`, `checkSelection2D` and `checkSelection3D` (`Library/RangeInternals.fss`), add a note to row 416 that it was met again, and say so in your report.
- **Wrong.** Reordering the declarations; concluding that the pair is invalid; a new ledger row for the known gap; an edit of the compiler's prelude.
- **Partial.** The row found and the pair called valid, with no way to land the change.
- **Open.** The record does not say, in general, whether to fix walk or to reshape the library: that follows the brief's area and `exploring.md`, "The choices that are yours". Either repair, with step 1, is right.
- **Skill.** `interpreter.md`, "What walk checks"; `records.md`, "Reading the record"; core, "Rules for every task" (the ledger before a defect or an edit); the orientation's rule that walk's load check is not the specification's verdict, and its rule on the exclusion rule.
- **Evidence.** Row 416 (its note "Met again"), F-44, P-45.

## Case 19: an unknown error (explore)

- **Trap.** Investigate and fix at once, or work around it in the test, without consulting the record; a fix on the path that showed it only.
- **Expected.**
  1. Reproduce the error with a command, and reduce it to a minimal program.
  2. Search the record before you investigate: `ledger-find:` with words of the message and the function's name, FACTS titles (`$T 'WORDS'`) and a grep of FACTS and POSITIONS, and the orientation.
  3. If an entry or a row holds it, cite it and use its workaround; do not report it as new.
  4. If none does, it is a gap that the record does not know: switch to exploring (`exploring.md`). If the program can run on the compiled path, run it there too, and say in the ledger row which paths show the defect. Record it as `tests-writing.md`, "How a defect is recorded", says: an assertion in your test if your change repairs it; a gated `XXX` test if it is deferred and the specification settles it; a test of today's behaviour and a ledger row if the specification is silent or a conflict leaves it open. Write the row with `ledger.py`, or hand it over in your report if your brief does not let you edit the ledger.
  5. A fix of library code outside your brief's area is yours only if it meets all four conditions of "The choices that are yours"; otherwise report it.
- **Wrong.** Changing the library function at once, with no search and no test first; a silent workaround in the test; a ledger row with no run on the other path.
- **Partial.** The search and the record of the defect right, with no run on the other path.
- **Skill.** Core, "When to explore", "How a program runs" (the other path) and "Rules for every task"; `exploring.md`; `records.md`, "Reading the record"; `tests-writing.md`, "How a defect is recorded".
- **Evidence.** The skill's own rules, cited above; no record entry is needed.

## Case 20: a compiled test that needs an array (follow the pointer)

- **Trap.** The compiled path compiles the whole language, as the library describes it.
- **Expected.** It cannot be a passing compiled test today. Until the switch-over, the compiler's prelude has no array types, only `ZZ32Vector` and `StringVector`, and the code generator has no case for an array literal. So write an `XXX` test that names the wall: `XXXName.fss` and `XXXName.test` with `tests=XXXName`, `compile`, and `compile_exception_contains=` the exception's text (or `compile_err_contains=` the refusal, if the checker stops it first), shown through the harness as an expected failure, and red once changed so that the defect does not show. If the brief allows, test the function under walk instead.
- **Wrong.** Adding array declarations to the compiler's prelude; `ZZ32Vector` as a stand-in for `RR64` arrays; a plain compiled test expected to pass.
- **Partial.** The wall named, with no `XXX` form.
- **Skill.** `compiler.md`, "What the compiled path cannot compile yet" and "The compiler's prelude, until the switch-over"; `tests-writing.md`, "Writing an `XXX` test".
- **Evidence.** F-183, P-37.
