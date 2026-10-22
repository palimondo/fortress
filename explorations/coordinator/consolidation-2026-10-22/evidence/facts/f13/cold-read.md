<!-- Cold read of evidence/facts/f13/clean.txt (ten FACTS entries), with only CLAUDE.md and the fortress-repo skill (core and allowed references) as context. -->

# Cold read: facts f13

Context used: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; references `interpreter.md`, `library.md`, `records.md`, `compiler.md`, `tests-writing.md`, `specification.md` (a grep of the others found nothing on these topics). "Row N" is read throughout as gap-ledger row N (`records.md`, "The gap ledger"). The ledger status `CONTESTED` is named in `records.md` but defined only in the row template, which is record and so not readable here.

Term that crosses entries: "open" has two senses in this file. In F-143 and F-228 an "open" type parameter is one left unfixed that every value matches. In F-?1 the checker "opens a value", which reads as unpacking an existential: giving a hidden size a fresh name. And in F-228 "Left open:" means "not yet settled". A reader can mix these up; each entry below says which sense it uses.

---

## F-143 "Under walk, a type parameter whose bound mentions itself ..."

**Established:** Under walk, when a static parameter is F-bounded (its bound mentions the parameter itself, as in `T extends Cmp[\T\]`) and nothing at a call fixes it, walk leaves it "open". The open type is a subtype of every type, and every value matches it, so it is not the same as `Bottom`, which no value matches. Reductions and comprehensions without a static argument are first instantiated by a declared type or by the join of their elements (F-228). So the open parameter is left only where neither applies, such as an empty reduction with no declared type, which then gives `ZZ32`'s identity (for example 0 for `SUM`, as `library.md` says). A call such as `mk()` with no argument also leaves it open. Inside a compound type (tuple, arrow, generic), the open type acts like `BottomType`: `(OPEN, OPEN)` admits no more than `(Bottom, Bottom)`, so `(Int, Int)` is not a subtype of it.

**Conditions:** Walk only. Only F-bounded parameters; a plain-bounded unfixed parameter takes its bound (SKILL.md, F-228). Bare open type: every value matches. Open type nested inside a tuple, arrow or generic type: matches nothing more than `Bottom` would. The tuple behaviour is in a contested ledger row (663).

**Consequence:** A worker should expect an unfixed F-bounded parameter to accept any value at its top level, and to accept nothing when it is nested. An empty reduction with no declared type gives an integer identity, whatever the element type. A worker should also not rely on how dispatch treats a declaration whose parameter type is open. A probe found that such a declaration is the most specific and wins for every argument, but no gated test pins that, so it may change.

**Evidence:** `tests/InferUnfixedFBoundedWalk.fss` and `OpenTupleDispatchWalk.fss` (folder not stated; presumably `tests/`); ledger rows 716 and 663; `compile-ladder/rung-walk-open-param/REPORT.md` sections 1 and 11; `SKEPTIC.md` section 3, finding 3, for the dispatch probe, which is not gated.

**Could not resolve:**
- "a declaration whose parameter type is the open type" (unclear wording): the entry does not say how a declaration comes to have the open type as its parameter type, for example a declaration inside a generic function whose `T` stayed open. I cannot say when a worker would meet it.
- `OPEN` in `(OPEN, OPEN)` (unclear wording): is it a notation for the open type, or the name walk's code gives it? I read it as notation.
- `Int` (language concept I lack): I could not find in the skill whether `Int` is a library trait or stands for some integer type. The point is clear either way.
- "(row 663, contested)" (concept I lack): I read it as the row's status `CONTESTED`, whose definition I cannot read. I cannot tell whether the behaviour is disputed as a defect or as a reading of the specification.
- "a skeptic's probe" (unclear wording): "skeptic" is a review role that the skill does not define. I read it as a reviewer's probe.

---

## F-144 "The identity-less reductions are typed at their element type ..."

**Established:** Reductions with no identity element are `AssociativeReduction[\R\]`. They lift each element to `Maybe[\R\]` (so an empty reduction has a value: presumably `Nothing`). Their `simpleJoin` and all their `lift` methods take the element type `R`. Under walk:
- A non-generic reduction that extends `AssociativeReduction` and declares `simpleJoin` at `Any` is refused at load.
- A generic reduction (one with static parameters) is not checked, so it loads and then stops at run time at its first join (row 665).
- Where a static argument names the lifted type, it is `Maybe[\R\]`, because walk refuses `AnyMaybe` in that place.
- With no element type written, `BIG MINMAX` and "the four tuple forms" run.
- A monoid big operator whose static parameter has a plain bound (one that does not mention the parameter) and no written static argument is instantiated by F-228's rule. `BIG SQCUP`, `BIG SQCAP` and `List`'s nested `BIG CONCAT` ran, once each. `PrefixSet`'s `BIG UNION` and `PureList`'s `BIG CONCAT` were not measured. No gated test covers any of these five.

**Conditions:** Walk. The load refusal at `Any` applies only to a reduction without static parameters. The monoid-operator results are single, ungated measurements.

**Consequence:** A worker who writes an identity-less reduction must declare `simpleJoin` and `lift` at the element type `R`, not `Any`, and must write the lifted type as `Maybe[\R\]`, not `AnyMaybe`. A generic reduction gets no protection at load, so a mistake in it shows only at run time. A worker should not count `BIG SQCUP`, `BIG SQCAP`, `BIG CONCAT` or `BIG UNION` without a static argument as guarded by tests.

**Evidence:** `tests/Unwritten*Walk.fss` (this glob also matches F-228's tests) and `ReductionSimpleJoinAtAnyWalk` for the refusal at `Any`; row 665; `compile-ladder/rung-reduction-types/REPORT.md` section 1; `compile-ladder/rung-walk-elements/REPORT.md` section 7.

**Could not resolve:**
- `AssociativeReduction`, `simpleJoin`, `lift`, "lifts to" (language/library concept I lack): the skill does not describe the library's reduction protocol. I inferred it from the names. In particular, "every `lift`" could mean several `lift` overloads in one reduction, or the `lift` of every such reduction.
- "A static argument that names the lifted type" (unclear wording): where is that static argument written: in the reduction's `extends` clause, at a call, or both? And is "is `Maybe[\R\]`" a description of the library or a rule for the worker? I read it as both.
- `AnyMaybe` (concept I lack): presumably a non-generic supertrait of `Maybe`; not in the skill. I also cannot tell whether walk refuses it at load or at run time.
- "the four tuple forms" (unclear wording): I cannot tell which four forms these are: tuple-valued reductions, `BIG MINMAX` over tuples, or something else.
- "`List`'s nested `BIG CONCAT`" (unclear wording): "nested" could mean a `BIG CONCAT` of lists of lists, or a `BIG CONCAT` inside another big operator.
- `Unwritten*Walk.fss` (unclear wording): the glob also matches the tests that gate F-228, so I cannot tell which tests gate this entry's claims.

---

## F-145 "Walk refuses at load an object that leaves an inherited abstract method uncovered."

**Established:** At load, walk refuses an object that inherits an abstract method and does not define it. Several bodies at narrower parameter types define the method only if, together, they cover its parameter types. The cover is computed as P-147 decides: each parameter position is split into the types that its `comprises` clauses list, and every combination of those parts must fall inside a single body. If the search cannot settle (a cycle of clauses, a symbolic or unreadable type, more than 10,000 steps or 4,096 combinations), walk refuses the object. A generic object is not checked at all (row 665). An object whose single covering body has its own static parameter is refused (row 728; `interpreter.md` adds that such an object is valid, so this refusal is a defect). The compiled checker computes the cover the same way, with the same limits, except for methods with their own static parameters (row 725). Walk's other object checks at load are the `override` check (F-147) and the Meet Rule for Functional Methods (F-142).

**Conditions:** Walk at load, for objects (and, per `interpreter.md`, object expressions) without static parameters. The limits are 10,000 steps and 4,096 combinations. On the compiled checker, the method-level static-parameter case is the exception.

**Consequence:** A library edit that leaves an abstract method uncovered, covers it only through a generic body, or covers it in a way the search cannot settle stops every program at load. A worker must cover each inherited abstract method with bodies whose cover the search settles, and must not cover it with a single body that has its own static parameter. A generic object gets no such check, so its gaps show only at run time.

**Evidence:** `tests/AbstractMethod*Walk` (including `AbstractMethodCoverUnsettledWalk`) and `compiler_tests/AbstractMethodCoveredPairs`; rows 665, 728, 725; `compile-ladder/rung-walk-coverage/REPORT.md` sections 1 and 6; `compile-ladder/rung-duplicates-coverage/REPORT.md` sections 1 and 8.

**Could not resolve:**
- "unreadable type" (unclear wording): not defined in the entry or the skill (`interpreter.md` lists only cycles and symbolic types).
- "except where a method has static parameters of its own (row 725)" (unclear wording): it does not say what the checker does instead in that case: refuse, accept without checking, or cover differently.
- "is refused (row 728)" (unclear wording): the entry alone does not say whether this refusal is right or a defect. `interpreter.md` ("a valid object") says it is a defect; the entry could say so itself.
- "which replaced the first report's acceptance" (unclear wording): a note on history inside the Detail pointer. It is readable, but `records.md` says entries describe only the present.

---

## F-146 "The compiled checker accepts arithmetic in a size ..."

**Established:** The compiled checker accepts sizes written with arithmetic (for example `n+1`), building P-55. To compare two sizes, it first computes every operation on numerals, then compares the written forms. Compared with a numeral, a size name or an operation counts as possibly equal. Two different size parameters count as different. So the checker calls a `typecase` clause unreachable when it needs those two parameters equal, though walk reaches it when the arguments are equal (row 683, contested). Neither walk nor the compiled path infers a static parameter that a parameter type writes only inside an operation, such as `n` in `V[\n+1\]` (row 767). The compiled class loader can build a size outside its kind, where walk refuses it (row 675).

**Conditions:** Mostly the compiled checker. The inference gap holds on both paths. The class-loader point is the compiled run time against walk.

**Consequence:** A worker should not expect the checker to prove two sizes equal unless they have the same written form after numerals are folded. Two distinct size parameters are taken as unequal, which can wrongly prune `typecase` clauses. To call a function whose parameter type writes its size inside an operation, write the static argument explicitly, because neither path infers it. A size out of its kind's range is caught only by walk.

**Evidence:** `compiler_tests/NatArith*`; rows 683, 767, 675; `compile-ladder/rung-size-expressions/REPORT.md` section 1, "Item 15, 15a with its part (b)", and section 12.

**Could not resolve:**
- "compares two sizes by their written form" (unclear wording): the entry does not say what happens when the written forms of two operations differ, as `n+1` against `1+n`, or `n+1` against `n+2`. They could be "different", or "possibly equal" like the name-against-numeral case.
- "beside a numeral" (unclear wording): I read "beside" as "compared with". It could also be read as "next to a numeral inside an expression". The same file uses "beside" for "declared alongside" (F-?1, F-248).
- "a size beyond its kind" (unclear wording): I read it as a value outside the range of `nat` (`NN32`) or `int` (`ZZ32`), such as a negative `nat`. The entry does not say.
- "(row 683, contested)" (concept I lack): as in F-143.
- "It builds P-55" (clear enough): I read it as "it implements decision P-55". The decision's content is not given.

---

## F-?1 "The compiled checker opens a value of a trait whose `comprises` clause lists a type at a `where`-clause size ..."

**Established:** Take a trait whose `comprises` clause lists a type whose size comes from a `where` clause, as in `trait NatParam comprises { N[\n\] } where [\ nat n \]`. When a value of that trait is passed where a listed type is expected, the compiled checker "opens" it ("open" in the unpacking sense, not F-143's): it gives each `nat` and `int` `where`-clause size of the listed type a fresh name for that call. A `NatParam` passed where `N[\$n\]` is expected binds `$n` to the fresh size, and the call's result type carries that size. An opened size is never known to differ from any other size. Walk treats such a size as any size. This is a default (an agent's choice, landed without the curator's word): way 4a of fork 3 (a size known only at run time) in PLAN item 13, awaiting review (P-85; review-queue item 30). Limits: an opened size does not compile (row 307). The checker refuses `f(x: NatParamT)` declared alongside `f[\nat n\](x: Nt[\n\])` as two declarations at one parameter type, while walk runs both (row 682, contested). F-251 is the same opening for a type variable.

**Conditions:** The compiled checker, for `nat` and `int` sizes in `where` clauses of types that a `comprises` clause lists. It is a default under review, so it may be reversed. Programs that use it pass the checker but do not compile.

**Consequence:** A worker can rely on the checker to accept such calls, but not on the compiled path to build them (row 307). A worker should not declare an overload at the trait beside a generic overload at the listed type, because the checker refuses the pair. Because this is a default awaiting review, a worker should not build further on it without checking review-queue item 30.

**Evidence:** `compiler_tests/NatOpenChecker`; under walk `tests/NatOpenWalk` and `NatOpenUnlistedExtender`; rows 307, 682; `compile-ladder/rung-size-expressions/REPORT.md` section 1, "Fork 3, way 4a, under Q13.3", and section 12.

**Could not resolve:**
- "F-?1" (unclear wording): the entry has no number yet, so nobody can cite it.
- `$n` (concept I lack): the skill does not give a `$` notation. I cannot tell whether `$n` is the called function's static parameter, an inference variable, or the fresh name itself. "binds `$n` to the fresh size" suggests the first or second reading.
- "PLAN item 13" (unclear wording): `SKILL.md` says PLAN numbers its items per section and that a pointer names the section and the item. This pointer names no section. "fork 3" and "way 4a" are labels inside that item that only the parenthesis explains.
- "(P-85; review-queue item 30)" (unclear wording): it does not say what P-85 contributes. It could be the decision that this default departs from, or the rule that defaults wait for review.
- "An opened size does not compile (row 307)" (unclear wording): the entry does not say which stage fails. The checker accepts the call, so I read it as the code generator or the class loader, but "does not compile" could also mean the checker.
- `NatParamT`, `Nt` (unclear wording): these names differ from the example's `NatParam` and `N`. I read them as the same pattern, but the entry does not say so.
- "Walk reads such a `where`-clause size as any size" (unclear wording): I read it as walk not checking the size at all. It could also mean that walk matches it with any size at dispatch.

---

## F-147 "Walk refuses an `override` that overrides nothing ..."

**Established:** Walk refuses an `override` declaration that overrides no inherited declaration. An inherited declaration counts as overridden only if each of its parameter types is a subtype of the `override`'s, and at least one is a strict subtype. So the override's parameter types are at least as wide as the inherited ones and not all equal; an override at exactly the inherited types overrides nothing. This is the traits chapter's "strict subtype" (`Specification/basic/traits.tex:585-589`). For a generic trait, object or object expression, walk checks the override once, at the declaration. An object inherits nothing that a trait's `override` overrides. So if that `override` is abstract, the object has no body for the method (rows 614, 649). Walk does not see all the static-parameter bounds in two places: an object expression, which takes its static parameters from the enclosing function, and a generic trait or object that extends a type under a `where` clause. There, an override over an inherited declaration whose parameter types mention a static parameter and differ from the override's is accepted unchecked (row 693). Other cases are in `interpreter.md`, "What walk checks".

**Conditions:** Walk, at load. The check is weaker in the two cases with unread bounds. The rule has other cases (`interpreter.md`: equal parameter types count as overridden at an instance of a generic trait above a declared object).

**Consequence:** A worker must write `override` only where its parameter types are strictly wider than the inherited declaration's. An override at the same types makes walk refuse the whole program. An abstract `override` in a trait cuts the object off from the inherited body, so the object must define the method itself. In the two cases with unread bounds, walk does not catch a wrong `override`.

**Evidence:** `tests/Override*Walk.fss` and `AbstractOverrideUndefinedWalk`; rows 614, 649, 693; `Specification/basic/traits.tex:585-589`; `compile-ladder/rung-walk-override/REPORT.md` section 1.

**Could not resolve:**
- Which way the subtype runs (clear, but easy to misread): "its" refers to the inherited declaration, so the override's parameter types are the wider ones. A reader who expects overrides to narrow types could read it backwards. Naming both sides ("the inherited declaration's parameter types are subtypes of the `override`'s") would remove the risk.
- "a trait, object or object expression with static parameters" (unclear wording): "with static parameters" could attach to the containing type (my reading: a generic one) or to the `override` itself.
- "so an abstract `override` leaves it without a body (rows 614, 649)" (unclear wording): it does not say whether this is the intended rule or the defect that the rows record. The result after that is not stated either: refused at load by F-145, or a failure at the call.

---

## F-228 "Under walk, a reduction or a comprehension that writes no static argument instantiates its big operator by a declared type ..."

**Established:** Under walk, a reduction or comprehension with no written static argument gets its big operator's type in this order (building P-48):
1. A declared type that directs it. That is a local variable's declared type, or the declared return type of a top-level or local function, also when the expression is the last one of a block.
2. Otherwise, the join of its elements' run-time types. Walk first runs the generator clauses once into the library's collector, instantiates the operator at the join, then reduces the collected elements. So each body runs only once.
3. With no element and no declared type: a plain-bounded parameter takes its bound, and an F-bounded one stays open (F-143 sense).

These do not direct it: a method's return type, a top-level variable, a field, an assignment, a function expression, a branch, a call's argument, or the body of another clause form. A user big operator whose declared result is its own trait is read through the `BigReduction`, `Comprehension` or `BigOperator` that the trait extends, so the `body(i: I)` passed to `__bigOperator` gets a type. Not yet settled: an empty clause form with no directing declared type (row 716), a comprehension that no declared type reaches (rows 20, 717), and a call's argument (rows 510, 705).

**Conditions:** Walk; only where no static argument is written. The list of contexts that direct is exact. Every other context falls back to the join. The three unsettled cases are known gaps.

**Consequence:** A worker who needs a particular type must write the static argument, or put the expression where a directing declared type reaches it: a local variable or a function's return. A method's return type, a field and a call's argument do not count. Without that, the result type follows the run-time elements, and an empty one follows the bound (`library.md`: an empty `SUM` gives integer 0). Bodies are not run twice.

**Evidence:** `tests/UnwrittenListMapComprehensionWalk`, `UnwrittenComprehension*Walk`, `ComprehensionTypedBindingWalk`, `UnwrittenSetBigOperatorsWalk`, `UnwrittenEmptyFloatSumWalk`, `IntMapComprehensionTypedWalk`, `UserBigOperatorResultTraitWalk`; rows 716, 20, 717, 510, 705; `compile-ladder/rung-walk-elements/REPORT.md` sections 1 and 5 (5.3 lists the contexts); `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 718".

**Could not resolve:**
- "clause form" (unclear wording): not defined in the entry or the skill. I read it as "a reduction or comprehension written with generator clauses". This matters for "another clause form's body".
- "also where the clause form ends a block" (unclear wording): it could attach only to the function return type, or also to the local variable.
- "Left open:" (unclear wording, could be read two ways): one sentence earlier, "stays open" means the F-143 open type. Here it seems to mean "not yet settled". I cannot tell what goes wrong in "a comprehension that no declared type reaches" or "an argument of a call", given that the join covers them. Either the result is still wrong (for example too narrow), or the parameter really stays open in the F-143 sense.
- "So `__bigOperator`'s `body(i: I)` is typed" (unclear wording, concept I lack): the skill does not say what `I` is (presumably the element type parameter of `__bigOperator`). I cannot tell what "is typed" means as opposed to before: instantiated at a real type, rather than open or `Bottom`.
- "the library's collector" (concept I lack): which library function or type collects the elements; not in the skill. This does not block the reading.

---

## F-238 "Under walk's load check, an exclusion that two generic declarations show only at one shared symbolic instantiation is withdrawn ..."

**Established:** At load, walk compares two generic functions of one name and the same static parameter list at a single shared symbolic instantiation (the same `T` for both). It also reads two instances of one generic object as two distinct object types, which exclude each other. That can show an exclusion that does not hold across real instances. Example: `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])`, with `P[\T\] excludes { Q[\T\] }`. They exclude at one `T`, yet a type extending `P[\ZZ32\]` and `Q[\String\]` has both. Walk now withdraws such an exclusion where the instances do not exclude:
- When both declarations have their own static parameters, walk reads the exclusion again over the instances of each.
- Instances of one generic type exclude only where their static arguments cannot be equal.
- Any other exclusion seen at the shared instantiation stands only where every generic type that both extend forces one instance. Example: `Array` and `ImmutableArray` both extend `ReadableArray`, so a value of both must share one instance, and they exclude at every pair.

A pair whose exclusion is withdrawn goes on to the check on declared domains (F-252). A refusal there names the rule broken (F-257).

**Conditions:** Walk's load-time overload check, for pairs of generic declarations. The withdrawal applies only where the shared instantiation shows an exclusion that the instances do not.

**Consequence:** A worker cannot excuse two generic overloads by an exclusion that holds only when they share a static argument. Such a pair is checked further on declared domains, and walk may refuse it at load, naming the rule. An exclusion that holds through a shared generic supertype, as with `ReadableArray`, still counts.

**Evidence:** `tests/GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk`, `GenericOverloadInstancesApartWalk` (refused), `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest`, `GenericPairExcludesTogetherWalk` (load); `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 373", and section 9.

**Could not resolve:**
- "and two instances of one generic object as two object types, which exclude" (unclear wording, could be read two ways): it is either the faulty first reading that the withdrawal corrects, or a rule that stands. The next sentences ("exclude only where their static arguments cannot be equal") suggest the first, but the sentence reads as present behaviour.
- "Where both declarations have static parameters of their own" (unclear wording): the entry already says both are generic, so "of their own" must separate them from something. Perhaps from functional methods that take their static parameters from a generic trait (`interpreter.md`: those are compared at each call). The entry does not say.
- "forces one instance" (unclear wording): I read it as "a value of both types must extend that generic type at a single instance, so the static arguments must be equal". It is dense, and only the example made it clear.
- "the reading on declared domains" (concept I lack): `interpreter.md` sends the definition of "declared domain" to `revival-changes.md`, which I may not read. I know only that the No Duplicates, Meet and return-type rules are checked there.
- "(refused)" and "(load)" (unclear wording): they could tag only the test just before them (my reading: that test expects a refusal, or a clean load), or a run of tests before them.

---

## F-239 "Under walk, an `if` clause without a binding takes a `Boolean` by its value ..."

**Established:** Under walk, an `if` clause with no binding (not the `x <- e` form) accepts three kinds of value. A `Boolean` is taken by its value. An object named `Just` of a trait named `Maybe` counts as true, and one named `Nothing` as false. Any other value is refused with "If clause did not return boolean": a number, a string, `()`, a tuple, a function, or any other object. Walk checks only the names, so a `Just` is true whatever it holds, even `Just(false)`. If the refusal happens while a top-level variable is being initialised, it counts as a refusal at load. The specification's chapter allows only `Boolean` (row 746), so the `Maybe` case departs from it.

**Conditions:** Walk; `if` clauses without a binding. The `Maybe` reading is beyond the specification.

**Consequence:** A worker must not rely on `if` with a `Maybe` in portable code: the specification and presumably the compiled path allow only `Boolean`, and walk ignores what a `Just` holds. A test that expects the refusal at top-level initialisation should be written as a refusal at load (`tests-writing.md`).

**Evidence:** `tests/IfClauseObjectWalk`, `IfClauseNumberWalk`, `IfClauseStringWalk`, `maybeTest`, `naturalsTest`; row 746; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 673".

**Could not resolve:**
- "an object named `Just` of a trait named `Maybe`" with "tests the names only" (unclear wording, could be read two ways): either a user's own object named `Just` extending their own trait named `Maybe` also counts, or the check is only on the library's `Just` and `Maybe`, looked at by name. The wording suggests the first.
- "The chapter's rule" (unclear wording): it does not name the chapter or a file. I read it as the specification's chapter on expressions or on `if`.

---

## F-248 "Under walk, the library's generic `distribute[\K\]` keeps every fused answer of a nested reduction ..."

**Established:** A nested reduction is "fused" where the outer reduction distributes over the inner one. The library then takes a faster path. The library declares the team's generic `distribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\]`, with no extra method over `Any`. Under walk:
- Fused pairs still fuse and give the same answers: `MAX` and `MIN` over `SUM`, and `SUM` over `PROD`. `GeneratorDeclarations` and microGPT's quick pair give the same answers.
- A pair that does not fuse, such as a `SUM` of `SUM`s over a generator of generators, also runs, but only because walk infers a generic method's static arguments (F-253). Without that inference it would stop (row 21).
- `NestedReductionFusion` asserts 11 for the sum of the prefix sums of 1, 3, 2 (1+4+6), and 3 for the maximum of their prefix maxima (max of 1, 3, 3).
- The team's commented-out line in `Generator2.distributes`, `r.distribute[\L1\](q)`, would stop every fused pair under walk (row 744). The library does not run it.

**Conditions:** Walk, nested reductions. The non-fused path depends on F-253's inference.

**Consequence:** A worker must keep `distribute` generic, with no `Any` overload beside it. A worker must not restore the commented explicit call in `Generator2.distributes`. A change to walk's inference of a generic method's static arguments (F-253) can break non-fused nested reductions. Check `NestedReductionFusion` and the microGPT quick pair after any such change.

**Evidence:** `tests/GeneratorDeclarations` and `NestedReductionFusion`; rows 21, 744; `perf-probes/generic-distribute/REPORT.md` sections 1 and 5.

**Could not resolve:**
- "keeps every fused answer", "keep their answers" (unclear wording): "keeps" implies a comparison with an earlier state (an earlier library, or the version with an `Any` method) that the entry does not name. I read it as "gives the same answers as before this declaration".
- Which path `NestedReductionFusion`'s two cases take (unclear wording, could be read two ways): both are reductions of reductions of one kind (`SUM` of `SUM`s, `MAX` of `MAX`es). `SUM` of `SUM`s is named as non-fused, and `MAX` over `MAX` is not among the fused pairs listed. So the test may cover only the non-fused path, despite its name. I cannot tell whether any gated test covers the fused pairs other than `GeneratorDeclarations`.
- `ActualReduction`, `PossibleReductionPair`, `K`, `L1`, `Generator2` (library concepts I lack): not in the skill. I could not tell what `K` stands for (perhaps the inner reduction's type). The entry is usable without them.
