# Cold read of `clean.txt` (climb batch 32's record landing)

Read with `CLAUDE.md`, the `fortress-repo` skill's core, and lookups in its `references/` (`compiler.md`, `library.md`, `interpreter.md`, `records.md`) only. Twenty entries: sixteen facts, four positions.

A note that holds for many entries: paths such as `compile-ladder/...`, `reviews/...`, `tests/...` and `compiler_tests/...` are written without their root. I read the first two as under `explorations/` and the last two as under `ProjectFortress/`; the entries do not say so. "Row N" I read as a row of the gap ledger. Entries cited but not in the file (F-54, F-66, F-143, F-228, F-233, F-235, F-264, F-281, F-283, F-288, F-324, F-334, F-352, P-12, P-26, P-39, P-40, P-45, P-48, P-49, P-51, P-74, P-76, P-87, P-153, P-156, P-168, P-172, P-174) I could not follow; I say below where an entry leans on one so hard that it does not stand without it.

## F-53

**Established:** At the gate of climb batch 32, the last one landed, both measures of the compiled checker over the interpreter's library are zero: the distance to the switch-over (distinct errors over fourteen components and their apis) and the checker count (errors of the `FortressLibrary` component with the apis it imports).

**Conditions:** The two measures differ in scope and in method. The distance covers fourteen components (twelve, and `CovariantCollection` and `OneShotFlag`, which `List` imports), runs every checker stage whatever earlier stages reported, and groups errors by root cause. The count covers `FortressLibrary` only, and each unit stops at its first failing stage. Neither run crashes. The numbers are those of that gate, not of any later tree.

**Consequence:** A rung that is measured by either number starts from zero, and takes its starting tables from the last landed batch's `gate/distance.txt` and `checker-count.txt` and from `compile-ladder/gate/distance-sites.tsv` (now empty of sites). A rise in either number is reported but does not by itself fail the gate; the count stage can still fail the gate on the faults F-66 names, for example a crash that no rung listed.

**Evidence:** The gate's two tables; `tools/checker-count/run.sh` for how the count reads a clean run as 0; F-288, F-54, F-334, F-233, P-39 and the `coordinator` skill's `references/batch.md` for the parts.

**Could not resolve:**
- "At that gate it checks `value object Char` to its end, with no crash (F-334)": I read "it" as the distance stage. Why `Char` is singled out is not said (I guess it once crashed or stopped there). Unclear wording, leaning on F-334.
- "the faults that F-66 names": only one example is given; the rest needs F-66.
- "A rung measured by either": I read it as "a rung whose brief measures its work by the distance or the count". Slightly unclear wording.
- "turns no gate red on its own ... a crash that no rung listed": "listed" where? Unclear wording (I guess: listed in the batch's plan as expected).

## F-58

**Established:** Checked by the compiled checker against the interpreter's library (the one library), the flat microGPT program C4 had 42 distinct error sites of its own on commit `832f7d0d91`: `FlatArrays` 31, `FlatData` 3, `MicroGptFlat` 8. Of `FlatArrays`' 31, 23 are one message, that static argument `I` does not meet the bound `Index`, in seven generic declarations that do not write `I extends Index`.

**Conditions:** Each number is a lower bound, because the checker stops a block at its first failing statement. Each was measured once and no test holds it. The 42 is of `832f7d0d91`; nothing has recounted since, and two later checker changes are known to move `MicroGptFlat`'s 8: the numeral lines (line 82's `1.0 s`, and `MicroGptFlatQuick.fss:40`) are now taken at `RR64`'s product (F-366), and top-level tuple bindings now type their names (F-369), which by one run removes line 41's `if` of pairs as a site and adds line 77's `beta1 m`. With the helpers' bound written and `gather`'s bound widened in a scratch copy, the compile command reports 17, of which 15 are the model's arrays written without sizes.

**Consequence:** A worker must not quote 42 or 8 as today's numbers; they are a floor at an old commit. The largest single cause is the unwritten `Index` bound in the helpers (P-156); the next is the model's unsized arrays (P-87). The APL program is further off: 54 sites in four files, and its grammar's api crashes the checker.

**Evidence:** One run each of `compile-ladder/plan-31/probes/model-closure/run.sh check`; the three detail reports named.

**Could not resolve:**
- The headline says C4 "has 42" in the present tense, and the body says the 42 is no longer current. A reader of the headline alone takes away a number the body withdraws. Unclear wording.
- "the index bound that its helpers do not write": "helpers" I read as the files `FlatArrays` and `FlatData`; the entry never says which files are the helpers.
- "The numeral powers pass": I could not tell what a "numeral power" is here (a power with a numeral exponent, as `x^2`?) or why it is mentioned. Unclear wording.
- "the report lists the other 8": which report is not said at that point (I guess `model-closure-check.md`).
- "`gather`'s bound widened in a copy": which bound, and widened to what, is not said.
- The 17: on which commit, and whether it counts all three files, is not said. It is also not said whether the 54 sites and the crash of the APL program are of `832f7d0d91` too.
- "an `RR64` times an unsized array": "unsized array" I read as an array type written without its size static argument; not found in the skill, but P-87's gloss "its arrays without sizes" carries it.

## F-59

**Established:** `SUM` and `PROD` get their identity element (the value of an empty reduction) from their static argument. When a reduction writes no static argument, the compiled checker supplies one: the type the reduction's context expects, or else the type of its body.

**Conditions:** That rule is for a generic big operator whose bound names its own parameter (`SUM`, `PROD`, `BIG MAX`, `BIG MIN`), where an unwritten argument cannot simply take the bound. A big operator with an ordinary bound takes its bound, or the expected type where the bound does not fit (F-221). Walk differs: it instantiates at the declared type of the value, else at the join of the elements' types, and leaves the parameter open only when it has neither. `SUM e` over a collection and `x DOT y` need no static argument.

**Consequence:** The compiled checker no longer needs the argument written, but C4, the team's tests and the interpreter's library all write it (`SUM[\ZZ32\][j <- 0#i] matCount(j)`), and a worker should keep doing so.

**Evidence:** Tests `compiler_tests/WitnessIdentityRungG`, `InferBigOperatorUnwritten`, `InferBigOperatorSelfBound`; `reviews/sum-replacement-judgement.md` section 5, Table 2, which predates P-48 and F-364.

**Could not resolve:**
- "It builds P-78, with a witness `typecase`, a `typecase` over a `() -> T` function with one clause for each number type": "It" has no clear subject (the library's `SUM`? the fact?). The gloss says what a witness `typecase` looks like but not how it yields the identity; I take it that the clause chosen by `T` returns that type's zero or one. Unclear wording, not a language concept.
- "the compiled checker takes an unwritten one": "one" could be the identity or the static argument; the body shows it is the static argument.
- "before the checker fixed an unwritten argument": "fixed" reads as "repaired" at first; from F-364 it means "determined". The same double sense is in F-285 and P-78.
- "has no instance at its bound": I read it as "cannot be instantiated at its bound, because the bound mentions the parameter". Guess.
- Conflict with the worker's context: the skill's `references/library.md` (the curator's decisions on the library) still says "The checker refuses a call without it (ledger row 731)". This entry and F-364 say the opposite. A worker holding both cannot tell which is current.
- "measured before P-48": P-48 is not in the file, and what Table 2 measured is not said.

## F-221

**Established:** When a call `f(g(x))` is not accepted as written, the compiled checker checks the inner call `g(x)` again, once for each declaration of `f`, with that declaration's parameter type as the type expected of `g(x)`.

**Conditions:** Only when the enclosing call is not accepted otherwise; a declaration that accepts the call as written is never skipped in favour of one reached by the retry. Compiled checker only: walk gives such an argument no expected type (row 705).

**Consequence:** A reduction, which desugars to an argument of `__bigOperator`, takes the reduction's expected type when its big operator has an ordinary bound; one whose bound names its parameter takes that type, else its body's type (F-364). A chain `a OPLUS b OPLUS c` that is acceptable to a multifix declaration only through the retry now runs the multifix declaration, not the binary one, so a worker can see a different declaration run than before.

**Evidence:** `compiler_tests/InferCallArgument*`, `InferBigOperatorExpectedType`; `compile-ladder/rung-argument-context/REPORT.md` sections 1, 5, 8; `SKEPTIC.md` finding 5.

**Could not resolve:**
- "against each enclosing declaration's parameter type": "enclosing declaration" reads at first as the declaration in whose body the call stands. I settled on "each declaration of the enclosing call's function". Unclear wording.
- "It builds P-51 under P-49": neither is in the file except P-49's one-line gloss in P-46 ("the order in which the checker tries a call") and P-51's in F-364. The "so" clause carries the meaning without them.
- "`SKEPTIC.md` finding 5": no folder given; I assume the rung's.

## F-240

**Established:** At climb batch 32's gate the count stage took about 95 s and the distance stage 165 s.

**Conditions:** Each gate ran each stage once. A stage's time depends heavily on machine load (more than twofold: 217 s at load 3.3 against 574 s at load 4.6 to 5.3 for nearly the same code), so a time compares only with one taken at a like load. The 165 s was taken under load (start load 0.31, beside the first minutes of `testFast`); batch 30's distance took 128 s at 0.14. The count's time is read from the file times of the gate's log, since its table records no seconds.

**Consequence:** A worker who times either stage after a change compares against these figures only at a similar load, and does not read a difference under twofold as the change's cost without that. History, as far as I could order it: 325 s and 1,075 s at batch 15b; the solver's memos (F-235) brought most of the fall; the count was about 90 s at 21b, rose to about 150 to 180 s from batch 22 to 26 because `FortressLibrary`'s check then ran to its end into the export check, and because every symbolic operator is checked (15 to 25 %); both stages about halved at batch 27, cause not measured.

**Evidence:** File times of the gate's log; `compile-ladder/climb-batch-32/gate/distance.txt`; the eleven review sections listed.

**Could not resolve:**
- "Its rise from about 90 s at climb batch 21b's gate is ... now run to its end": "Its" follows a sentence about both stages; I took it as the count stage's. The rise is to what, and at which gate? "now" is not today's state (today is about 95 s), so the sentence is out of time order: the rise is told before "From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s", and the halving at 27 after. I had to reorder the body to follow it. Unclear wording.
- "the distance stage (`FortressLibrary` 102 s) ... against 128 s (83 s)": I read each bracket as `FortressLibrary`'s share of the stage; only the first says so.
- "so its time is one under load": a load of 0.31 is called "under load" while 0.14 is the comparison; whether the load meant is the 0.31 or the `testFast` beside it is not clear.
- "nor the distance's check stopped at `Char` (F-54)": reads two ways, "the check that stopped at `Char`" or "the check having been stopped at `Char`"; and F-53 says the distance now checks `Char` to its end. Unclear wording.
- "by its rung's timings of its base and its head in one session": I read "the rung that built F-281 timed the count stage on its base commit and on its own head, in one session". Three "its" with different owners.

## F-280

**Established:** The library's `=/=` over `Any` and its three-argument `assert` call `=` as `FortressLibrary`'s scope sees it. So a type's own `=` is used by them only if that `=` implements the `=` of a trait declared in `FortressLibrary`, such as `Equality`; otherwise they compare by identity. That is why `List` extends `Equality[\List[\E\]\]`.

**Conditions:** Stated for walk ("Under walk they call `=` in `FortressLibrary`'s scope"). A type that extends `Equality` does not reach the `=/=` over `Any` at all: `Equality`'s own `=/=`, the negation of the type's `=`, is more specific and runs first. `List`'s `extends Equality` is unconditional, so its `=` is element by element whatever its element type.

**Consequence:** A worker who gives a type its own `=` and wants `=/=` and `assert(a, b, msg)` to use it makes the type extend `Equality` (or another `FortressLibrary` trait that declares `=`). A type that does not is compared by identity there (row 807), which is a recorded defect.

**Evidence:** `Library/FortressLibrary.fss:98`, `:102`, `:308`; `Library/List.fsi:67`; tests `XXXNotEqualOwnEquality` (an expected failure, so I take it as the test of row 807) and `ListEqualityElementwise`; the rung's report.

**Could not resolve:**
- "`List` extends `Equality[\List[\E\]\]` outside its conditional order": I read "conditional order" as an ordering trait that `List` extends only under a `where` condition on `E`, and "there whatever the condition" as "under `=/=` and `assert`, whether or not `E` meets that condition". A guess; "conditional order" is not explained, and "there" has no clear referent. Unclear wording.
- Whether the compiled path behaves the same is not said; only walk is named.

## F-285

**Established:** In the library components that the distance stage checks, every reduction written with generators whose big operator has a bound naming its own parameter writes its static argument, and so does every list comprehension. Separately, the fused arm of `__bigOperator2` casts its result to `O0`. Hence the distance holds no error site for an unwritten argument or for that arm.

**Conditions:** The forms left unwritten are those of big operators with an ordinary bound (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, and `BIG LEXICO`, which has no static parameter. The checker can now determine an unwritten argument itself (F-364), but the library's sites stay written. Under walk the written comprehension changes a result type: `List`'s strided subscript answers a `List[\E\]`.

**Consequence:** A worker editing the library keeps writing the static argument at such sites (P-78) and does not remove the existing ones, although the checker no longer needs them.

**Evidence:** The cited lines of `Library/FortressLibrary.fss` and `Library/List.fss`; the distance stage; `tests/WrittenReductionArgumentsWalk`, `NestedReductionFusion`, `PureListStridedSubscriptWalk`; the rung's report.

**Could not resolve:**
- "the twelve components the distance checks": F-53 and the skill say the distance checks fourteen. Either this fact covers only the twelve and not `List`'s two imports, or the number is stale. Reads two ways.
- "clause form": not defined here or in the skill. I read it as "a big operator written with generator clauses, `BIG OP[g] body`". Unclear wording.
- "`__bigOperator2`'s fused arm casts its result to `O0`": I do not know what the fused arm is (the skill says only that no desugaring calls `__bigOperator2`), nor what `O0` is (I guess a static parameter of `__bigOperator2`). "the library's cast device for an arm whose type the `typecase` cannot show (F-264)" needs F-264. A library concept I lack, not in the skill.
- "beside `SUM[\T\]` at `:2720`, `:3106`, `:3111`": the file is not named; I assume `FortressLibrary.fss`. Likewise "The fused arm (`:1586`)" and "(`:2740`)".
- "`PureList`'s ... answers a list of objects at their elements' run-time types, and a list of `ZZ32` or `String` at its element type (row 824)": I could not tell what is the defect. My guess: `PureList`'s comprehension is not written, so walk instantiates it at the join of the elements' run-time types, which differs from `E` for objects. The sentence does not say that `PureList`'s is unwritten.
- "range subscript" and "strided subscript": the same method or two? Not clear.
- "its typecheck kind 0": unknown term of the distance tool.
- "The checker now fixes such an unwritten argument": "fixes" as "determines", see F-59.

## F-341

**Established:** Under walk a numeral is a value of its default type (an integer numeral a `ZZ32`, `ZZ64` or `ZZ` by its size; one with a radix point the nearest `RR64`) that also carries the numeral's own numbers. Where the place it stands in fixes a type, walk converts it from those numbers into that type by the type's coercion from `NaturalNumeral` or `RadixPointNumeral`.

**Conditions:** The places are a typed binding, an assignment, a field, a parameter, a declared return type and a coercion. A folded constant at a library number type converts from its exact value without running the coercion. Refused at run time: a numeral outside the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, one outside the coercion's `where` clause. At a call, dispatch fits the numeral at its default, or at a strictly more specific declaration that its own coercion reaches (F-366); a tie reads at the default. A type parameter fixed by several numerals takes the narrowest default that holds them all. At load, walk refuses a numeral type written in an `extends` clause or as a static argument, but loads one in a `comprises` clause (row 981).

**Consequence:** Under walk `q: QQ = 0.1` is exactly 1/10, `y: RR64 = 0.5` equals a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2` through `QQ`'s own `=`. A worker can rely on exact conversion at typed places, and on a run-time (not load-time) refusal for a numeral that does not fit.

**Evidence:** `interpreter/evaluator/values/Numerals.java`; the twelve walk tests listed; three rung reports.

**Could not resolve:**
- "the numeral's four numbers": never said what they are. The skill shows `NaturalNumeral[\1,10,7\]`, three numbers. A concept I lack; the skill points to `revival-changes.md`, "Numbers", which I may not read.
- "a store keeps its default alone": I do not know what "a store" is (an array element write? a variable's cell?) or what "alone" excludes (the four numbers?). Unclear wording.
- "one value per site" and "one result per site and type": I read both as caching, one converted value for each source position (and type). Guess.
- "else by its own type's coercions only": "its own type" I read as the numeral type (`NaturalNumeral` ...), as against the default type's coercions. Reads two ways.
- "Walk's numeral is its default": at first reading "its" could be walk's default; the body shows the numeral's default type.

## F-362

**Established:** The characters U+2211 (∑) and U+220F (∏) are parsed as the reduction words `SUM` and `PROD`, in a reduction and in an operator declaration, and never as an ordinary operator. Separately, an api may declare the postfix exponent operators, such as `opr (x: T)^T`, as a component may.

**Conditions:** A program's own `opr ∑` therefore declares the big operator `BIG +`. An infix or postfix use of either sign is a `Syntax Error`; so is `opr ∑` in an import's list, which is recorded as a gap (row 42). Holds on both paths. No test applies the sign to an array.

**Consequence:** A model line can write `∑` for `SUM`, and the helper file's api can declare `^T`. A worker who edits a grammar must regenerate the two tracked parsers, `parser/Fortress.java` and `parser/templateparser/TemplateParser.java`.

**Evidence:** `tests/SumSignAccumulator.fss`, `tests/ApiPostfixExponentOp.fss` and their two compiled counterparts; `compile-ladder/rung-parser-declarations/REPORT.md`.

**Could not resolve:**
- "accumulators": the headline's key word is not explained and is not in the skill. From the body I take it as the parser's class of big-operator signs. Unclear wording (or grammar jargon).
- "are no `Op` anywhere": `Op` I read as the grammar's ordinary-operator token. Guess.
- "a program's own `opr ∑` declares `BIG +`": I could not tell why `BIG +` and not `SUM`; are they one name? A language concept I lack.
- "`opr (x: T)^T`": I read the first `T` as a type and the second as the transpose exponent. In "can declare `^T`" only the second sense fits. Reads two ways on first meeting.
- "A grammar edit regenerates the two tracked parsers": reads as what the build does, or as what this rung did, or as a duty on the worker (regenerate and commit both). I took the last.
- "an api's operator header takes what a component's takes": only postfix exponent operators are shown; whether every operator header form is now accepted in an api is not said.

## F-363

**Established:** A superscript operator (`^T`, `^2`) or postfix operator can follow a dotted access or a parenthesised call, with the same result under walk and compiled. `p.wq^T`, `B.n^2`, `B.f()^T`, `B.data[5]^2` apply the operator to the whole dotted primary on its left; `(f(x))^T`, `(f(x))!`, `(a^b)!` run alike on both paths.

**Conditions:** Still refused on both paths: `f(x)^T` and `f(x)^2` without the outer parentheses (static error, messages quoted); a selector after a superscript, `B.data^T.v` (syntax error); a subscripted item followed by a superscript, `x[5]^2` or `B.f()[5]^2` (row 1 under walk, row 1005 compiled). A subscript, parenthesised item or tight identifier after a dotted method call now parses too, but no test asserts it. Neither the checker nor the code generator changed.

**Consequence:** A model line may write `p.wq^T x` and `(onehot(ks, 5))^T dx`. A worker writing `f(x)^T` must parenthesise the call.

**Evidence:** `parser/Expression.rats:386-400`; `interpreter/evaluator/Evaluator.java:965-970`; three walk tests and three compiled tests; the rung's report.

**Could not resolve:**
- `B.data[5]^2` is listed as parsing, and `x[5]^2` and `B.f()[5]^2` as still failing "a subscript math item followed by a superscript". I could not see the rule that separates `B.data[5]^2` from `B.f()[5]^2`. Either a language concept I lack ("math item", not in the skill) or a contradiction.
- "tight identifier": not defined; I guess an identifier with no whitespace before it.
- "the one node kind it builds for a single item is the one the parenthesised spelling built": I read it as "for `p.wq^T` the parser builds the same tree node as `(p.wq)^T` built before". Hard sentence, resolved by guess.
- "`XXXSuperscriptAfterCallRefusedCompiled.test`": an `XXX` test marks an expected failure; whether here it means "the compile is expected to fail, as wanted" or "a defect is recorded" I could not tell.

## F-364

**Established:** For a reduction written with generators and no static argument, the compiled checker first checks the call as written. Only if that is not accepted, or its type does not convert to the expected type, does it write the static argument itself: first as the reduction's expected type, then as the type of its body, each only if that type meets the bound of the big operator's one static parameter. It takes the first form that is accepted and converts. A reduction accepted as written is checked as before.

**Conditions:** Compiled checker only. Only big operators with one static parameter; two or more are still refused (row 1007). Where the reduction is a call's argument and the call is accepted without an expected type, the reduction runs at its body's type. Walk chooses differently, so the two paths give different instances at a method's return type, a field, a top-level variable and an assignment (row 1008). Where the bound names its parameter, a type error inside an unwritten reduction's body is reported as the big operator's refusal, not as the body's error (row 1015).

**Consequence:** `SUM`, `PROD`, `BIG MIN` and `BIG MAX` need no written static argument for the checker. The library and the model still write it, and a program meant for both paths must write it at the four places of row 1008. A worker who sees the big operator refused in an unwritten reduction should look for an error in the body.

**Evidence:** `reductionApplication` in `scala_src/typechecker/impls/Functionals.scala`; `compiler_tests/InferBigOperatorSelfBound`, with `InferBigOperatorExpectedType` and `InferBigOperatorUnwritten` as guards; one observation with the argument removed from the library's two `BIG MIN` sites, its list comprehension and `MicroGptFlat.fss:43`; the rung's report.

**Could not resolve:**
- "first checks the call as written, where the big operator has an instance alone": I could not parse "has an instance alone". My guess: "where the big operator, taken by itself, can be instantiated without help". Unclear wording.
- "The elements are converted to the instance": I read "instance" as the chosen element type. Guess.
- The skill's `references/library.md` still says the checker refuses such a call (row 731); this entry reverses it. See F-59.

## F-365

**Established:** When a generic function is named as a value (not called) where an arrow type is expected, the compiled checker picks the static arguments that make the function's instance a subtype of that arrow type. If the arrow type's domain leaves a static parameter undetermined, it refuses the reference with the quoted message.

**Conditions:** Compiled checker. The name must have exactly one declaration, with static parameters, and no static arguments written. As an argument of a call, the reference is typed again in the retry of F-221 against each candidate's parameter type. An arrow type that still carries static parameters of its own is a subtype of no arrow type and coerces to nothing. Applying the value of an untyped binding is refused with a message. Still refused or stopped: a name with several declarations of which one is generic (row 1009); an untyped binding never applied (row 1010). Still accepted but failing at run time: a reference whose expected type is not an arrow type, such as a parameter of type `Any` (row 1012), and a functional method of a generic trait passed as a value inside the trait (row 1013).

**Consequence:** A worker may pass a generic function to a parameter of arrow type in compiled code, as long as the arrow's domain fixes every static parameter. The model's row lift, `rows(rmsn, x)`, a generic callee whose sizes its other argument fixes, is not covered by any compiled test, so it is not shown to compile.

**Evidence:** `instantiatedReference`, `retypable`, `carriesOwnStaticParams`, `TypeAnalyzer.scala`, `CoercionOracle.scala:292-293`; four compiled tests, two of them expected failures; the rung's report.

**Could not resolve:**
- "A static parameter that the arrow type's domain does not fix, one that only the return type mentions among them, is refused": "among them" has no clear referent. I read: "a parameter mentioned only in the function's return type, not in its parameter types".
- "Still refused or stopped": "stopped" as against "refused" is not explained (I guess the checker or code generator halts with an internal error).
- "dead at run time": I read as "fails when run". Informal.
- "passes a sized generic function": "sized" I read as "with a size (`nat`) static parameter". Guess.
- "row lift": a term of the model, not explained here; F-367 uses it the same way.
- The sentence on `carriesOwnStaticParams` and the memo ("counts as unbound also where the kind environment holds its name for another declaration's parameter ...") I followed only in outline: a same-named static parameter of an enclosing generic declaration must not be taken for the function's own. "Kind environment" is a checker term I lack.

## F-366

**Established:** On both paths, when a call has a numeral argument, the declaration that fits the numeral at its default type runs, unless another declaration is both reachable by the numeral's own coercion and strictly more specific, by subtyping on declared parameter types. Then that one runs.

**Conditions:** The order is subtyping of declared parameter types, not the coercion chapter's relation: `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` one, and `x^2` for an `RR64` keeps its integer power. P-46 did not word the order; the building worker chose subtyping. Only a numeral's own coercion is ranked so, not a value's. Of two declarations that are not ordered, the one the numeral's default fits runs. Two departures: under walk a numeral beside a value typed `Any` is converted by the value's run-time type (row 1016); on both paths a numeral at a declaration whose parameter is a bare type parameter does not go on to a more specific one (row 1017).

**Consequence:** `u = 0`, `0 = u` are `true` and `u =/= 0` is `false` for a zero `u` of `NN32`, `NN64` or `RR32`; `h = 0.5` is `true` for `h: QQ = 1/2`; `k(5)` runs `k(x: NN32)` beside `k(x: Any)`; a `case` clause `0` matches a zero `NN32`; `1.0 s` for `s: ZZ32` checks at `RR64`'s juxtaposition. So a model line may compare a number of any type with a numeral and write a float numeral beside an integer value, on both paths. The checker does the extra comparison only when the fitting declaration has a numeral at a parameter not of the numeral's default type, so `i + 1` costs nothing more.

**Evidence:** `numeralAttempt`, `numeralTie` in `Functionals.scala`; `bestMatchForNumerals`, `belowByNumerals` in `OverloadedFunction.java`; five tests; the rung's report.

**Could not resolve:**
- "Of two declarations reached only by coercion and not ordered, the one that the numeral's default fits runs": if the default fits one, it seems not "reached only by coercion". From the `1.0 s` example I take "reached only by coercion" to be about the call's other arguments (here `s`), and "the default fits" about the numeral's own position. The sentence does not say so. Unclear wording.
- "The order between the two kinds of declaration": the two kinds are not named; I take them as the one that fits at the default and the one that the numeral's coercion reaches.
- "the report gives walk's dispatch cache": I cannot tell what about the cache the report gives (its cost? its key?). Unclear wording.
- "whether they differ at the numeral alone or elsewhere too": understood only through the example.
- "A value's coercion is not ranked so": I read "an ordinary value's coercion never moves a call to a more specific declaration" (P-46).

## F-367

**Established:** Under walk a generic function can be passed and stored as a value. It has a type of its own, below `Any` and below each arrow type it can be received at. A parameter (of a function or constructor), a local variable declared with an arrow type, and a variable of arrow type at an assignment (a mutable top-level variable too) receive the instance that a direct call with arguments of the arrow's domain types would run.

**Conditions:** Walk only. A generic callee's static parameters are fixed by its other arguments first, so `rows(rmsn, x)` runs. Where the arrow type leaves a static parameter open, and at `Any`, a type parameter or an untyped place, the value stays generic and each application infers its static arguments; the compiled checker refuses those forms (row 1021). An overloaded name keeps its whole overload set. Not built: an immutable top-level variable keeps the generic value (row 1019); a callee's type parameter fixed only by a value's run-time type refuses the function (row 1018); a function declared in a block with static parameters of its own does not run under walk at all (row 1020).

**Consequence:** A model line can pass a generic function, including the row lift, under walk. A program for both paths avoids the forms where the value stays generic, since the checker refuses them.

**Evidence:** `FTypeGenericArrow.java`; `Fcn.java` (`received`); `EvaluatorBase.java` (`instanceReceivedAt`); `OverloadedFunction.java:2970`; three walk tests; the rung's report.

**Could not resolve:**
- "so `pick(twice)` ... runs the `pick` declared over an arrow type and not `pick(x: Any)`, which no test pins": "which" I read as the whole behaviour of an overloaded name passed as a value. It could also be read as only "`pick(x: Any)`".
- "an immutable top-level variable keeps the generic value (row 1019)": I read it as a defect: `f: ZZ32 -> ZZ32 = id` at the top level is not instantiated. The entry files it under "Not built" without saying what should happen.
- "a callee's type parameter fixed only by a value's run-time type refuses the function": I read "when the callee's type parameter is determined only from another argument's run-time type, the call refuses the generic function argument". Hard sentence.
- "a sized `rmsn`": as in F-365.

## F-368

**Established:** Under walk a top-level variable with a declared array type and an array literal as its value now holds a library array of that type. An immutable variable's literal is built when its cell is first forced; a `var` variable's is built by `BuildEnvironments.forVarDecl4`. Both use the same code as a literal in a block (`LHSEvaluator.topLevelArray` calling `libraryArray`). An object's field declaration takes the same code.

**Conditions:** Walk only: the code generator compiles no array literal, so such a line does not compile. The declared type is required; an untyped top-level literal "stays a paste" (row 49). The declared size is checked only at the top level; in a block a literal of another size is bound without complaint (row 1022). A `var` bound in a block to a literal is immutable (row 1024), and a literal assigned to a variable is not built (row 1025).

**Consequence:** Under walk a table of the model can be a top-level literal with a declared type, as `shp: ZZ32[9] = [...]`, and readers above the declaration and importers see the array. A worker must not expect the line to compile, nor rely on the size check, mutability or assignment in the cases of rows 1022, 1024 and 1025.

**Evidence:** `LazilyEvaluatedCell.getValueNull`, `BuildEnvironments.forVarDecl4`, `LHSEvaluator.topLevelArray`; the skill's `references/compiler.md`; four walk tests; the rung's report.

**Could not resolve:**
- "An untyped top-level literal stays a paste (row 49)": I do not know what "a paste" is. Not in the skill. Either an interpreter concept I lack or jargon.
- "which runs the block's code, `libraryArray`": "the block's code" I read as "the code that already builds an array literal inside a block". Slightly unclear.
- "a literal assigned to a variable is not built": I read as "`a := [1 2 3]` does not make a library array". What it makes instead is not said (a paste?).

## F-369

**Established:** A tuple binding at the top level, `(a, b) = e`, now compiles. Each name becomes a top-level variable of its element's type. The right side is evaluated once, when any of the names is first read; its value is kept in a hidden class `<Component>$tuple$<first name>`, and each name's class takes its element out by the tuple's typed getter. A wildcard binds nothing.

**Conditions:** Compiled path. Every compiled top-level variable is initialized at first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). Where only some names declare a type and the right side is not a tuple expression of as many elements, the checker checks the right side again against each name's type. Under walk the same right side runs once for each name and once more (row 1026). Still open: a local tuple binding's declared name beside untyped names is unchecked (row 1029); a typed tuple binding over an `if` with tuple branches stops the code generator (row 1031).

**Consequence:** A model line of this form compiles as written, including the model's lines 17 to 19. Names so bound are now typed, so later uses are checked: `MicroGptFlat.fss:77`, `beta1 m`, is a new checker site against the one library (F-58). A worker must not put a side effect in the right side and expect it to run once on both paths, or at load.

**Evidence:** `scala_src/typechecker/impls/Decls.scala:272-277`, `:324-336`; `compiler/codegen/CodeGen.java:6528`; four compiled tests, one an expected failure; the rung's report.

**Could not resolve:**
- "The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own": I read "the checker rebuilds the tuple expression from its checked elements and gives it the tuple type of those elements; each name's deferred initializer reads its own element type from it". Hard sentence; "thunk" is not in the skill but is common.
- "not at load as under walk": F-368 says walk builds an immutable top-level variable's literal "when the cell is first forced", which sounds lazy too. The two entries do not agree at first sight on when walk initializes a top-level variable.
- "`XXXTopLevelTupleBindingType.test`": which defect it records (row 1029? 1031?) is not said.

## P-46

**Decided:** A conversion (coercion) exists only to make a call possible. It never changes which declaration runs when one already fits. The declaration is chosen on the parameter types the overloads declare: first the applicable ones, then the most specific; a generic declaration applies if some type within its bounds takes the arguments. Only after the choice is the declaration instantiated, at the narrowest type into which the arguments coerce. The one exception is a numeral's own conversion at a call: the numeral goes to the most specific declaration that takes it, by its own coercion if needed, and its default type is the last resort.

**Applies:** To every overloaded call, on both paths (walk and the compiled checker infer static arguments with coercion by the same promotion; the compiled path inserts the conversions statically). The exception applies only to a numeral argument: it is applicable to a parameter that fixes no type, at its default, and to a parameter whose type declares a coercion from the numeral's type; among applicable declarations the most specific runs, and of two not ordered, the one the default fits. A value typed `Any` or `Number` beside the numeral fixes no type for it. A value's coercion never gets this treatment.

**Requires:** A worker must not let a value's coercion move a call from a declaration that fits to another one. A comparison of a number with a numeral must answer by value: `u = 0` is `true` for `u: NN32 = 0`, and no design that answers `false` is acceptable. Beside `op(a: Any, b: Any)`, `op[\T extends Number\](a: T, b: T)` on a `ZZ32` and a `ZZ64` must run the generic one, at `ZZ64`.

**Unfinished:** Nothing is named as to build. Row 537 (the compiled dispatch between two generic declarations of one name with different bounds) is cited without saying whether it is a defect against this position. F-366 says the order "most specific" was not worded here and that a worker chose subtyping, so the wording of the order is open.

**Could not resolve:**
- "Row 537: the compiled dispatch between two generic declarations of one name with different bounds.": a sentence with no verb; I cannot tell whether it is an exception, a known defect or a pointer. Unclear wording.
- "Why: the curator wants fast generic code that a JVM can specialise.": how this ground leads to the rule is not said; I guess that a declaration chosen on declared types and then instantiated at one type is a class the JVM can specialise.
- "Of the ways to `true` that the review of them offers, the curator took its way B, whose rule is in the review's words, not his": understood as "the wording of the numeral rule is the review's, the curator only chose it". Heavy sentence.
- "His own broader rule ... so holds for a numeral's own conversion; for a value's coercion it is not taken": I read it as: the curator once stated a broader rule (any conversion that reaches a specific declaration is applied); it stands only for numerals. "so" reads as "thus", which takes a second reading.
- "at `T = Number`. It is the more specific, so it runs, at `ZZ64`": applicability is shown at `Number` and the run at `ZZ64`; the step between is P-74's promotion, which I had to infer.

## P-78

**Decided:** `SUM` and `PROD` are each one generic reduction over the library's algebra traits (`SUM` over `AdditiveGroup`, `PROD` over `MultiplicativeRing`), replacing the team's catch-all over `Number`. Their identity comes from the static argument. The team's `BIG MAXN`, `BIG MINN` and `BIG MINMAXN` are removed. `MAX` and `MIN` get no identity on integers or floats, so an empty `BIG MAX` or `BIG MIN` raises `EmptyReduction`.

**Applies:** To reductions written with generators, which write the static argument as `SUM[\ZZ32\][j <- 0#n] f(j)`. A sum without generators, `SUM e` over a collection and `x DOT y`, is written as before, with none. Where a `SUM` or `PROD` leaves the argument out, the compiled checker determines it from the expected type, else the body's type (F-364).

**Requires:** A worker writes the static argument on a generator reduction "where nothing at the call fixes the element type", does not call the removed operators, and does not give `MAX` or `MIN` an identity on the number types.

**Unfinished:** The specification's `HasIdentity` is not built; until it is, under walk an empty `SUM` or `PROD` over another algebra, such as a user's `AdditiveGroup`, fails (row 436).

**Could not resolve:**
- When must the argument be written? This entry says "where nothing at the call fixes the element type". The skill's `references/library.md` says to write it wherever generators stand in brackets, "also where the generators, the body or a declared type fix it", and F-59, F-285 and F-364 say the library and the model still write it everywhere, and that a program for both paths must write it at four kinds of place (row 1008). A worker cannot tell from this entry whether leaving it out is now permitted in library or model code. Reads two ways.
- "The compiled checker fixes it": "fixes" as "determines", see F-59.
- "F-60: a maximum's identity is its type's least value, which a coercion into a wider type does not carry": I read: `ZZ32`'s least value coerced into `ZZ64` is not `ZZ64`'s least value, so no identity is safe. Resolved by guess.

## P-79

**Decided:** Every program in `ProjectFortress/demos/` is kept running as the tree changes.

**Applies:** To every change. No suite or gate step runs the demos, so the duty rests on the batch. Limits: only where the way to repair is known; a demo that fails for want of a feature waits for the feature.

**Requires:** If a change breaks a demo and the repair is known, the same batch rewrites the demo (as the integer-power change rewrote `10^(-4)` to `10.0^(-4)` in `BiCGSTAB.fss`, `BiCGSTAB2.fss` and `npbft.fss`). When a missing feature is built, the demo that wanted it is made to run again.

**Unfinished:** Demos known to fail today are to be respelled where the way is known. The compiled checker refuses `trips.fss` (row 817).

**Could not resolve:**
- "no suite or step of the gate runs them" against "Under walk, the 52 demos that `DemoTests` lists reach their end (F-283)": `DemoTests` sounds like a suite. I take it as one that exists outside the gate; the entry does not say, nor how a worker should run the demos to see whether a change broke one.
- "So the demos known to fail today are to be respelled": if all 52 reach their end under walk, which demos fail today? Only on the compiled path? Whether "kept running" means under walk, compiled, or both is not said.
- "the 52 demos that `DemoTests` lists": whether that is all of `ProjectFortress/demos/` is not said.

## P-173

**Decided:** A numeral takes its type from the place where it stands. If the place fixes a type, the numeral converts into that type at compile time from its exact value. If nothing fixes one, it takes the machine default: `ZZ32`, or `ZZ64` or `ZZ` when the value does not fit, and `RR64` with a radix point. The curator declined exact defaults (`ZZ` and `QQ`), because the model's untyped hyperparameters would become rationals and every untyped index would need `asZZ32`.

**Applies:** A place fixes a type when its declared type has a coercion from the numeral type: the eight number types, and a program's own type that declares one (P-174). `Any`, `Object`, `Number`, an unbounded type parameter and an undeclared type take the default. The default is for a numeral, or a literal after the fold, never for an expression of a numeral type. An expression of numerals alone folds exactly first into a signed constant, which defaults as an integer numeral, as a `QQ` for a quotient, or as an `RR64` with a radix point. A type parameter fixed by several numerals takes the narrowest default holding every value, `RR64` if any has a radix point. A float numeral whose conversions into `QQ` and `RR64` tie reads `RR64`. At a call, the parameter types of the declaration that runs are places that fix a type, and the numeral goes to the most specific declaration that takes it (P-46). A `nat` parameter used as a value is a `ZZ32` as a size and a `ZZ` as one of a numeral type's four numbers.

**Requires:** Conversion at a typed place is exact or rounds once; a numeral outside the type's range is refused statically; walk converts from the exact value at the same places. Examples a worker must keep true: `x = 3` is a `ZZ32`; `bigN = 3000000000` is a `ZZ64`; `x = 7/2` is a `QQ`; `1/2 = 0.5` is `true`; `-2147483648` is a `ZZ32`; `u = 0` is `true` for `u: NN32 = 0`; `gg(5, w)` runs the `(ZZ32, T)` declaration beside `(Any, Any)`.

**Unfinished:** The Draft's passages that this contradicts are listed "for Appendix I" (numerals "not directly converted" and "polymorphic", and a `nat` parameter usable wherever an `NN32` variable is), which I read as text still to be entered in the specification's Appendix I. Rows 1016 (walk departs) and 1017 (both paths depart) are open against the call rule.

**Could not resolve:**
- "walk converts from the exact value at the same places, place by place, before it runs the checker (P-12)": the skill says walk switches the checker off, and F-341 says walk refuses a bad numeral "when it runs". I cannot tell what "before it runs the checker" means for walk. Contradiction with the worker's context, or unclear wording.
- "a numeral type's four numbers": as in F-341, never said what the four are.
- "It bends P-26 in two places ... where the compiler's prelude, the team's later word, keeps the numeral's own type; the curator takes the bend by his right to finish the specification": P-26 is not in the file; I guess it says that the team's latest source wins. Without it the sentence does not stand.
- "the Working Draft", "the Draft", "the 2012 restart" (`literals.tick:25`), "`Specification-1.0-frozen/`": names of sources that neither this file nor the skill's core explains.
- "P-174 names the binary chapter's, which it leaves out": "it" could be P-174, P-173 or the Draft; and "the binary chapter" is unknown to me.
- "What it keeps and changes in form: the judgement's section 3, but for the numeral types' form, which P-174 holds.": I could not get a meaning from this beyond "see section 3 of the judgement". Unclear wording.
- "`bigN = 3000000000` is a `ZZ64` at its binding (row 946)": why a ledger row is cited for behaviour stated as decided is not said (a defect elsewhere than "at its binding"?).
- "refused statically" here against F-341's "refused there when it runs" under walk: consistent only if "statically" is for the compiled path alone; the entry does not say.
