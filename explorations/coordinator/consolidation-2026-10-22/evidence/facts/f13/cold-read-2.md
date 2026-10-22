# Cold read 2 of f13/clean.txt

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the allowed `references/` (`interpreter.md`, `library.md`, `compiler.md`, `records.md`, `tests-writing.md` consulted). All ten entries are facts. "Row N" is read as gap-ledger row N (`records.md`); "contested" as that row's status `CONTESTED`, whose meaning the row template gives and the skill does not.

## F-143 "Under walk, a type parameter whose bound mentions itself ..."

**Established:** Under walk, a static type parameter with an F-bound (a bound that names the parameter itself, as `T extends Cmp[\T\]`) that nothing at the call determines is left as a special open type, printed `OPEN`. That type sits below every type and every value passes a test against it. For reductions and comprehensions with no static argument, walk first tries the declared type and then the join of the elements (F-228), so the open type reaches them only when neither applies: an empty `SUM`/`PROD` with no declared type (which then yields the `ZZ32` identity, 0 or 1, whatever the body's type, row 716), or a reduction/comprehension whose declared type or join does not satisfy the bound. A plain call such as `mk()` also leaves it open. When walk compares overloads, a tuple, arrow or generic type containing the open type is treated as if it held `BottomType`, so it matches nothing: with `pick(x: Any)` beside `pick(x: (T,T))`, the call on `(1, 2)` does not pick the tuple version, though a lone `one(x: (T,T))` accepts `(1, 2)` (row 663, contested). A skeptic's probe found that a method declared over a bare `T`, in an object whose `T` stayed open, ranked most specific and was chosen for every argument; no gated test covers that.

**Conditions:** Walk only. Applies only to F-bounded parameters; a plain-bounded one takes its bound. The `BottomType` treatment applies only inside a tuple, arrow or generic type and only during overload comparison; the bare-`T` method result is a probe observation, not gated.

**Consequence:** A worker must expect an F-bounded parameter left unfixed to accept every value, to make a bare-`T` overload win everywhere, and to make a nested-`T` overload lose against a sibling overload. An empty unhinted `SUM`/`PROD` gives an integer. The last claim (bare `T` most specific) should not be relied on as gated.

**Evidence:** `tests/InferUnfixedFBoundedWalk.fss`, `OpenTupleDispatchWalk.fss`; rows 716, 663; `compile-ladder/rung-walk-open-param/REPORT.md` sections 1 and 11, `SKEPTIC.md` section 3 finding 3.

**Could not resolve:**
- "clause form" (also in F-228): not defined in the skill. I read it as a reduction or comprehension, the forms with generator clauses. Unclear wording.
- How `T` is declared in `pick(x: (T,T))` and `one(x: (T,T))`, and why the call on `(1, 2)` does not fix it. The example writes no static parameter, so I cannot tell whether `T` is an F-bounded parameter of `pick` (and then why the argument does not fix it), or of an enclosing object. Unclear wording.
- "contested": the skill does not say what a `CONTESTED` row means for a worker, so I cannot tell whether the `pick` behaviour is meant to be relied on or counted as disputed. Concept not in the skill.
- "`BottomType`": I take it to be the skill's `Bottom`; the entry does not say so. Minor wording.

## F-144 "The identity-less reductions are typed at their element type ..."

**Established:** Reductions with no identity element (as `MIN`/`MAX`) are `AssociativeReduction[\R\]`; they lift their result to `Maybe[\R\]`, and their `simpleJoin` and every `lift` method take the element type `R`. A reduction extending `AssociativeReduction` must declare `simpleJoin` at its element type; walk refuses at load one declared at `Any`. A generic reduction (one with its own static parameters) slips past that check and fails at its first join at run time (row 665). Where a static argument names the lifted type, as `generate[\Maybe[\R\]\](...)`, it is `Maybe[\R\]`; writing `AnyMaybe` (the non-generic trait above `Maybe`) there makes the program stop under walk. Without a written element type, `BIG MINMAX` and the four tuple forms `BIG MIN_MIN`, `BIG MIN_MAX`, `BIG MAX_MIN`, `BIG MAX_MAX` run under walk. A plain-bounded monoid big operator with no static argument is instantiated per F-228, so `List`'s `BIG CONCAT` runs, also over a list of list comprehensions. `BIG SQCUP`/`BIG SQCAP` ran once each, ungated; `PrefixSet`'s `BIG UNION` and `PureList`'s `BIG CONCAT` are unmeasured.

**Conditions:** Walk. The load-time refusal at `Any` applies only to non-generic reductions. The `SQCUP`/`SQCAP` result is ungated; two operators are unknown.

**Consequence:** A library or program author declaring an identity-less reduction must give `simpleJoin` and `lift` the element type, not `Any`, and name the lifted type as `Maybe[\R\]`, never `AnyMaybe`. A generic reduction with a wrong `simpleJoin` will not be caught at load. A worker must not assume `PrefixSet`'s `BIG UNION` or `PureList`'s `BIG CONCAT` works.

**Evidence:** `tests/UnwrittenBigMinMaxWalk`, `UnwrittenTupleMinMaxWalk`, `UnwrittenBigOperatorsWalk`, `UnwrittenComprehensionElementsWalk`, `ReductionSimpleJoinAtAnyWalk`; row 665; `compile-ladder/rung-reduction-types/REPORT.md` sections 1 and 8, `rung-walk-elements/REPORT.md` section 7.

**Could not resolve:**
- `AssociativeReduction`, "lifts to", `simpleJoin`, `lift`: library concepts the skill does not describe; I inferred them from their names (a reduction with no identity wraps its result in `Maybe`; `simpleJoin` combines two elements; `lift` wraps an element). Concept not in the skill.
- "every `lift`": whether there are several `lift` overloads or one per reduction. Unclear wording.
- "walk refuses one at `Any` at load": which load check refuses it is not named, so I cannot place it among the checks `interpreter.md` lists. Unclear wording, minor.
- "A static argument that names the lifted type ... is `Maybe[\R\]`": can be read as describing what the library writes today or as a rule for authors; and where the `generate` call sits (the library's reduction code, I assume) is not said. Unclear wording.
- "over a list of list comprehensions": a `BIG CONCAT` over a list whose elements are lists built by comprehensions, or a `BIG CONCAT` whose generator is itself a comprehension. Two readings.

## F-145 "Walk refuses at load an object that leaves an inherited abstract method uncovered."

**Established:** At load, walk refuses an object that inherits an abstract method its bodies do not cover. Bodies at narrower parameter types count only if, together, they cover the abstract method's parameter types, with `comprises` clauses used: each parameter position is split into the types its `comprises` clauses list, and every combination of those parts must fall inside one single body (P-147). If the search cannot settle (a `comprises` cycle, a symbolic type, a type the search cannot read, over 10,000 steps or over 4,096 combinations) the object is refused. Generic objects are not checked (row 665). An object whose only covering body has its own static parameter is refused although valid (row 728, a walk defect; the compiled path runs it). The compiled checker covers the same way and within the same bounds, except that when the abstract method or a body below it has its own static parameters it does no splitting and refuses the object (row 725). Walk's `override` check is F-147, its Meet Rule check F-142.

**Conditions:** Walk's load check; objects without static parameters only; bounded search. The compiled-checker difference arises only with method-level static parameters.

**Consequence:** A library edit that leaves an abstract method uncovered, covers it only through an unsettleable search, or covers it only by a generic body stops every program at load. A worker who needs a generic body to cover a method must expect walk to refuse it (row 728) and the compiled checker to refuse such objects too.

**Evidence:** `tests/AbstractMethod*Walk` (including `AbstractMethodCoverUnsettledWalk`), `compiler_tests/AbstractMethodCoveredPairs`; rows 665, 725, 728; `compile-ladder/rung-walk-coverage/REPORT.md` sections 1 and 6, `rung-duplicates-coverage/REPORT.md` sections 1 and 8.

**Could not resolve:**
- "a symbolic type": not defined in the skill (`interpreter.md` uses it without definition). I read it as a type that contains an uninstantiated static parameter. Concept not in the skill.
- "a type that the search cannot read": no example or rule says which types these are. Unclear wording.
- "it splits nothing and refuses the object": whether the compiled checker refuses every object in that case, or only one whose cover would need a split. Two readings.
- "Bodies at narrower parameter types": `interpreter.md` says "at or below"; I take bodies at equal types as also counting. Minor wording.

## F-146 "The compiled checker accepts arithmetic in a size ..."

**Established:** The compiled checker accepts arithmetic expressions in size positions (implementing P-55). It treats two sizes as equal when their written forms match after every operation on numerals is evaluated (so `2+3` equals `5`, `n+1` equals `n+1`). It treats them as known different only when they are two different numerals or two different size parameters; so it can declare a `typecase` clause unreachable that walk reaches when the two parameters are equal at run time (row 683, contested). Any other pair (a size name against a numeral, two differently written operations) is neither equal nor known different. Neither path infers a static parameter that occurs inside an operation in a parameter type (row 767). The compiled class loader can create a size outside its kind's range, such as a `nat` above 4294967295, which walk refuses (row 675).

**Conditions:** The equality/difference rules are the compiled checker's; the inference gap is on both paths; the range gap is the compiled class loader's.

**Consequence:** A worker must not expect the checker to identify algebraically equal but differently written sizes (`1+n` vs `n+1`), must write a static argument where a parameter type puts it inside an operation, and must not rely on the compiled run time to reject an out-of-range size.

**Evidence:** `compiler_tests/NatArith*`; rows 683, 767, 675; `compile-ladder/rung-size-expressions/REPORT.md` section 1, "Item 15, 15a with its part (b)", and section 12.

**Could not resolve:**
- "calls a `typecase` clause unreachable": whether that is a refusal of the program (a static error) or only a decision that the clause never runs. Unclear wording.
- "contested": as in F-143. Concept not in the skill.

## F-?1 "The compiled checker opens a value of a trait whose `comprises` clause lists a type at a `where`-clause size ..."

**Established:** For a trait such as `trait NatParam comprises { N[\n\] } where [\ nat n \]`, the compiled checker, when a `NatParam` value is passed where `N[\$n\]` is expected (`$n` the inference variable for the callee's size parameter), invents a fresh size name for that call, binds `$n` to it, and the result type carries that fresh size. This applies to each listed type's `nat` and `int` where-clause sizes. A fresh size is not known to differ from any size. Walk's `comprises` check at load treats such a size as an arbitrary size, consistent at each occurrence; at a call walk binds the argument's actual size. This is a default (way 4a of fork 3, a size known only at run time, PLAN "Pavol's answers, in the order they are needed", item 13), waiting for the curator's review (review-queue item 30); P-85 keeps array questions open and records this as the one exception. The code generator cannot compile such a trait ("Can't compile TraitDecl NatParamT", row 307). In row 682's program the checker refuses `f(x: NatParamT)` beside `f[\nat n\](x: Nt[\n\])` as two declarations of the same parameter type, whereas walk runs the pair (row 682, contested). F-251 covers the same opening for type variables.

**Conditions:** Compiled checker for the opening; only `nat` and `int` where-clause sizes; per call. Not compilable to bytecode. Provisional until the curator reviews it.

**Consequence:** A worker can type-check such calls but cannot compile them to bytecode; must not declare an overload on the trait beside a generic overload on its listed type for the compiled path; should treat the design as a default that may change.

**Evidence:** `compiler_tests/NatOpenChecker`, `tests/NatOpenWalk`, `NatOpenUnlistedExtender`, `compiler_tests/XXXNatOpenRun`; rows 307, 682; `compile-ladder/rung-size-expressions/REPORT.md` section 1, "Fork 3, way 4a, under Q13.3", and section 12.

**Could not resolve:**
- "opens": existential opening, not explained in the skill; I inferred it from the example. Concept not in the skill.
- "Pavol": not named anywhere I may read; I take him to be the curator ("his position"). Unclear wording.
- "the same at each of its places": either the one unknown size stands for the same value at every place where `n` occurs in the clause, or it is read as "any size" alike at each place. Two readings.
- The entry has no number yet ("F-?1"). Not a reading problem, but it cannot be cited.

## F-147 "Walk refuses an `override` that overrides nothing ..."

**Established:** At load, walk refuses a declaration marked `override` that overrides nothing. An inherited declaration counts as overridden when each of its parameter types is a subtype of the `override`'s corresponding type and at least one is a strict subtype (the traits chapter's "strict subtype", `traits.tex:585-589`). For an instance of a generic trait extended by a non-generic object, equal parameter types still count as overridden. Walk checks an `override` in a generic trait, object or object expression once, at the declaration. An object does not inherit a body that a trait's `override` overrides, so an object below an abstract `override` that has no body of its own is refused ("does not define an abstract method declared in type W", rows 614, 649). In an object expression (taking its static parameters from the enclosing function) and in a generic trait or object that extends a type under a `where` clause, walk does not read all static-parameter bounds, so it accepts an `override` over an inherited declaration whose parameter types mention a static parameter and differ from the `override`'s (row 693).

**Conditions:** Walk's load check. The leniency applies only in the two named cases.

**Consequence:** A worker adding `override` must make it strictly differ from the inherited declaration as the rule says, and must give a body below an abstract `override` in every object. In the two lenient cases, walk's acceptance is no proof that the `override` is valid.

**Evidence:** `tests/Override*Walk.fss`, `OverrideGenericInstanceEqualTypesWalk`, `AbstractOverrideUndefinedWalk`; rows 614, 649, 693; `references/interpreter.md` "What walk checks"; `compile-ladder/rung-walk-override/REPORT.md` section 1.

**Could not resolve:**
- Direction of the subtype test, and whether `self` counts. Grammatically, "each of its parameter types is a subtype of the `override`'s" puts the inherited declaration's types below the `override`'s, so the `override` would take wider types. That is surprising, and if `self` counts among the parameter types, the `override`'s `self` (the subtype) is narrower, which would break the stated rule. I cannot tell which direction is meant, or whether `self` is excluded. Unclear wording.
- "an object below an abstract `override` that declares no body": "that declares no body" can attach to the object (the object gives no body) or to the `override` (redundant with "abstract"). I read the first. Two readings.
- "extends a type under a `where` clause": the `extends` entry carries the `where` clause, or the trait/object itself has one. Two readings.

## F-228 "Under walk, a reduction or a comprehension that writes no static argument instantiates its big operator by a declared type ..."

**Established:** Under walk, a reduction or comprehension with no written static argument gets its big operator's type from (1) a declared type, else (2) the join of its elements' run-time types, else (3) its bound, with an F-bounded parameter staying open (F-143). Implements P-48. Declared types that count: a local variable's type, and a top-level or local function's declared return type, including when the form is the last expression of a block. Not counted: a method's return type, a top-level variable, a field, an assignment, a function expression, a branch, a call argument, and another form's body. For (2), the generators run once into the library collector `__elemsOf`, which keeps elements in order typed at their join; the operator is instantiated at the join and the reduction then runs over the collected elements, so each body runs once. If the declared type or the join does not fit the bound, walk falls back to (3); e.g., a `SUM` mixing `ZZ32` and `RR64` (join `Number`, outside the bound) runs each `+` at its operands' own types. Likewise with no elements and no declared type. The library then types `__bigOperator`'s local `body(i: I)` at element type `I`. A user big operator whose declared result is its own trait is read through the `BigReduction`, `Comprehension` or `BigOperator` it extends (row 718, fixed). Still wrong: an empty, unhinted form takes its bound or stays open (row 716); a comprehension no declared type reaches is built at its elements' run-time class (as `ArrayList[\Int\]`), which a declared `List[\ZZ32\]` refuses (rows 20, 717); a form used as a call argument gets no declared type (rows 510, 705).

**Conditions:** Walk only; only when no static argument is written; only the listed contexts direct the type.

**Consequence:** A worker who needs a specific instantiation where no listed context reaches the form (call arguments, fields, methods, branches) must write the static argument. Bodies run exactly once. Expect the three listed defects.

**Evidence:** `tests/UnwrittenListMapComprehensionWalk`, `UnwrittenComprehension*Walk`, `ComprehensionTypedBindingWalk`, `UnwrittenSetBigOperatorsWalk`, `UnwrittenEmptyFloatSumWalk`, `IntMapComprehensionTypedWalk`, `UserBigOperatorResultTraitWalk`; rows 716, 20, 717, 510, 705, 718; `compile-ladder/rung-walk-elements/REPORT.md` sections 1, 5 (5.3) and 10 decision 6; `rung-walk-overload-if/REPORT.md` section 1, "Row 718".

**Could not resolve:**
- "clause form": undefined, as in F-143. Unclear wording.
- "the instance that no hint gives": I read it as the instantiation used when there is no declared type and no join. Awkward wording, resolvable.
- `ArrayList[\Int\]` / `Int`: not a Fortress type the skill names. I take it to be the run-time class of a `ZZ32` value. Concept not in the skill.
- "a comprehension that no declared type reaches ... which a declared `List[\ZZ32\]` refuses": if no declared type reaches it, the entry does not say where the declared `List[\ZZ32\]` meets it (later, at an assignment or a field, I assume). Unclear wording.
- "read through" the supertrait: I take it to mean the instantiation is taken from that supertrait's static arguments. Unclear wording, minor.

## F-238 "Under walk's load check, an exclusion that two declarations with static parameters of their own show only when each is read at a symbolic instantiation is withdrawn ..."

**Established:** When walk's load check compares two generic declarations of one name, it first reads them at one shared symbolic instantiation (two generic functions with the same static parameter list), and reads two instances of one generic object as two unextendable object types, so they look mutually exclusive. Example: `o[\T\](x: P[\T\])` and `o[\T\](x: Q[\T\])` with `trait P[\T\] excludes { Q[\T\] }` exclude at a single `T`, though a type extending `P[\ZZ32\]` and `Q[\String\]` has both. Walk then re-reads such an exclusion over the instances. Instances of one generic type exclude only where their static arguments cannot be equal. Any other exclusion stands if it survives renaming the two declarations' static parameters apart, or if, at the shared instantiation, the generic types both extend force their static arguments to be equal (no type extends two instances of one generic trait); so `Array` and `ImmutableArray` exclude at every pair of instances via `ReadableArray`. A pair whose exclusion is withdrawn is then checked on declared domains (F-252), and a refusal there names the broken rule (F-257).

**Conditions:** Walk's load check of overloads with method/function-level static parameters (defined in F-252).

**Consequence:** A worker cannot rely on symbolic-instantiation exclusion to make two generic overloads load; they load only if the exclusion survives the re-reading, or else they must pass the declared-domain rules. Expect refusals at load for pairs like the `o` example.

**Evidence:** Refusals: `tests/GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk`, `GenericOverloadInstancesApartWalk`; loads: `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest`, `GenericPairExcludesTogetherWalk`; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1 "Row 373" and section 9.

**Could not resolve:**
- "symbolic instantiation": not defined in the skill. I read it as instantiating the static parameters as unknown type variables. Concept not in the skill.
- "two instances of one generic object as two object types that cannot be extended": I cannot tell which two instances these are. At one shared instantiation, the same generic object at the same argument is one type, not two exclusive ones. Unclear wording.
- "every generic type that both extend forces their static arguments to be equal": either every common generic supertype must force equality, or one such supertype is enough (the `ReadableArray` example suggests one). Two readings.
- "cannot be equal": the entry gives no rule for deciding this (distinct ground types? bounds with no meet, as the test names hint?). Unclear wording.
- "the reading on declared domains": the declared domain is defined only in `revival-changes.md`, which a cold reader may not open; `interpreter.md` names the three rules but not the domain. Concept not in what I may read.
- The title needs the body to parse; on its own it is very dense. Wording.

## F-239 "Under walk, an `if` clause without a binding takes a `Boolean` by its value ..."

**Established:** Under walk, the condition of an `if` without a `<-` binding accepts a `Boolean` by its value, treats an object named `Just` of a trait named `Maybe` as true and one named `Nothing` as false, and refuses anything else with "If clause did not return boolean". The test is by name only: any `Just` is true whatever it holds, and a program's own `Just` under its own `Maybe` counts too. Refused: numbers, strings, `()`, tuples, functions, other objects. A refusal during top-level variable initialisation counts as a refusal at load. The specification allows only `Boolean` (`if.tex:54`; row 746). The reading is a default, the coordinator's call at climb batch 16, awaiting the curator's review.

**Conditions:** Walk; `if` without a binding. Provisional until reviewed.

**Consequence:** A worker must not write a non-`Boolean` condition except a `Maybe` value, and should not build on `Maybe` truthiness, which departs from the specification and may be withdrawn. Name collisions with `Just`/`Nothing`/`Maybe` in a program change `if` behaviour.

**Evidence:** `tests/IfClauseObjectWalk`, `IfClauseNumberWalk`, `IfClauseStringWalk`, `maybeTest`, `naturalsTest`; row 746; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 673".

**Could not resolve:**
- "This reading is a default": which part is the default, the acceptance of `Just`/`Nothing` (the departure from the specification), the refusal of other values, or both. Two readings.
- "the coordinator": the skill does not define it; `CLAUDE.md` mentions "the coordinating session", which I take it to be. Unclear wording.
- Whether `Nothing` must also be below a trait named `Maybe`, as `Just` must. Unclear wording, minor.

## F-248 "Under walk, the library's generic `distribute[\K\]` gives every nested reduction its answer ..."

**Established:** Under walk, the library's generic `distribute[\K\](r: ActualReduction[\R,K\])`, returning `PossibleReductionPair[\K\]` (the team's commented version wrote `PossibleReductionPair[\R\]`), with no method over `Any` beside it, gives every nested reduction the right answer, fused (fast path, when the reductions distribute) or not. Non-fusing pairs, such as a `SUM` of `SUM`s over a generator of generators, run only thanks to walk's inference of a generic method's static arguments (F-253); without it they stop (row 21). `NestedReductionFusion` checks five pairs over the prefixes of 1, 3, 2: `SUM` of `SUM`s = 11 and `MAX` of `MAX`es = 3 (not fused), `MAX` over `SUM` = 6, `MIN` over `SUM` = 1, `SUM` over `PROD` = 10 (fused); I checked the arithmetic. `GeneratorDeclarations` checks that `SumReduction.distribute(MaxReduction)` gives a pair. A probe found that fusion is taken for the same pairs as before the change, and that `GeneratorDeclarations` and microGPT's quick pair answer the same. The team's commented explicit call `r.distribute[\L1\](q)` in `Generator2.distributes` would break every fused pair under walk (row 744); the library does not use it.

**Conditions:** Walk; depends on F-253's inference for non-fusing pairs.

**Consequence:** A worker must not restore the team's explicit `r.distribute[\L1\](q)` or the `PossibleReductionPair[\R\]` result, must not add a `distribute` over `Any` beside the generic one, and must keep F-253's inference, or nested reductions break.

**Evidence:** `tests/GeneratorDeclarations`, `NestedReductionFusion`; rows 21, 744; `perf-probes/generic-distribute/REPORT.md` sections 1 and 5.

**Could not resolve:**
- `ActualReduction[\R,K\]`, `PossibleReductionPair`, and what `R` and `K` stand for: library concepts the skill does not describe. Concept not in the skill.
- "the team's commented generic": I read "commented out in the team's source"; the library now declares it. Unclear wording, resolvable.
- "with no method over `Any` beside it": whether such a method existed and was removed, or never existed. Two readings.
- "the outer reduction distributes over the inner one": the entry's numbers show that "`MAX` over `SUM`" is outer `MAX` of inner `SUM`s (6, not 7). Arithmetically `+` distributes over `max`, not the reverse, and `SumReduction.distribute(MaxReduction)` gives a pair. So the inner reduction distributes over the outer one, the reverse of the definition sentence, unless "distributes" is the library's own term. Two readings / possible inversion.
- "with fusion and without": whether each pair is checked both fused and unfused, or the five pairs include fusing and non-fusing ones. Two readings, minor.
- "In the probe, before F-253 ... before the change": which probe and which change (I take them to be the generic-distribute probe and its library edit). Unclear wording.
