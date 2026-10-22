# Cold read 2 of `facts/f14/clean.txt`

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these parts of its `references/`, for terms: `interpreter.md` (what walk checks at load, the declared domain, the Meet Rule), `library.md`, `compiler.md` (prelude, phase names), `tests-writing.md` (`XXX`, gated test), `records.md` (entries, ledger rows). Nothing else.

General notes:

- `F-?1` to `F-?4` are placeholder numbers; the cross-references among them resolve inside this file.
- Cited entries not in this file, which I could not read: F-27 (from context, the counterpart of F-252 for a generic declaration beside a plain one), F-119, F-246, F-248. Each citing entry glosses enough to be read without them, except where noted.
- "declared domain" is defined in `revival-changes.md`, which I may not read. I took it as: the set of argument tuples to which some instance of the declaration applies (a generic declaration's domain is the union over all its instances). `F-?1` ("each declaration's over all its own instances") supports this reading.

---

## F-249: walk reaches the string objects' own `||` only through `String`'s abstract `||`

**Established:** Under walk, a program that imports only the prelude (`FortressLibrary`) cannot name the `||` that each string object implements: `FlatString`'s and `EmptyString`'s own, and `Concatenable`'s, which `CatString` and `SubString` use. Its calls go through the abstract `opr ||(self, b:String)` of `String`, and run-time dispatch then reaches the object's own body. Code inside `FortressLibrary` can call `FlatString`'s `||` directly, because it imports `FlatString`'s api. This matters for a proposed change: replace `String`'s `||` members by two top-level declarations over `(Any, String)` and `(String, Any)`, as juxtaposition is declared. The Meet Rule then requires a third, top-level declaration over `(String, String)`. That meet must hand off to the string objects' own `||`, but it can call only those that an api imported by `FortressLibrary` declares. `FlatString`'s api does. For `Concatenable` and `EmptyString`, the probe added five lines to `String.fsi`. Where no such api line exists, a two-string concatenation runs the meet's own body. With the body that the probe used (copied from `Concatenable`), `"s" || "t"` gives a `CatString` of depth 1, where today's library gives a `FlatString` of depth 0. Both print the same.

**Conditions:** Under walk only; a program that imports only the prelude; the meet's behaviour is about a proposed change, not today's library. Observed once each, in probes on a patched library.

**Consequence:** A worker who makes the proposed change must make each string object's own `||` visible to `FortressLibrary` through an api (as the probe did in `String.fsi`), or accept that the meet's body runs for every two-string concatenation and changes the representation of the result (a `CatString` where a `FlatString` was), though not its printed value.

**Evidence:** Probes on a patched library, each result seen once; no gated test. Detail in `perf-probes/symbolic-operators/REPORT.md` sections 2.2 and 2.4.

**Could not resolve:**

- "Otherwise every concatenation of two strings in such a program runs the meet's own body": unclear wording. "Otherwise" can mean "without the five added lines" or "without any delegation at all". "Every concatenation" contradicts the first reading, since `FlatString`'s api already states its `||` and `"s" || "t"` is two `FlatString`s.
- So I cannot tell in which configuration the probe got the `CatString` of depth 1: with the five lines added, without them, or with a meet that did not delegate at all. Unclear wording.
- "one proposed change": by whom, and whether it is decided, planned or only floated. No POSITIONS or PLAN pointer. Unclear wording, for the stakes.
- "reaches": I read it as "has the declaration in the overload set at the call". Under walk, dispatch is at run time anyway, so the sense in which a program "reaches" a body only "through" the abstract declaration is a little loose, but readable.
- "depth" of a `CatString`: a library concept that the skill does not define. The gloss "one level of concatenation" is enough.

---

## F-252: walk's load check reads a refused generic pair again on its declared domains

**Established:** Walk's load check first compares two overloads parameter by parameter. A pair that this check finds excluding loads. If it refuses a pair of two declarations that each have static parameters of their own (a generic function, a generic object's constructor, or a functional method that declares its own static parameters in a non-generic trait or object), walk reads the pair again on the declared domains, each over all its own instances. It loads the pair if it satisfies the No Duplicates Rule, the Return Type Rule and the Meet Rule. A pair that the parameter check orders is read again only for No Duplicates (`F-?1`). The Return Type reading is in `F-?2`. Limits of the readings:

- The parameter check does not see `Tg[\3\]` and `Tg[\4\]` (one generic type at two different ground static arguments) as excluding, so two plain declarations with such parameter types are refused (row 416).
- For the Meet Rule, walk looks for a covering third declaration only if, at each position, the two types are equal, or one is a static parameter, or both are instances of one generic type whose arguments match by the same three tests. Otherwise it refuses (row 539).
- A pair whose domains exclude when read as whole tuples also loads, if neither declaration has a `where` clause of its own (F-258, row 787).
- A pair with a varargs parameter is not read again and stays refused (F-257).

At a call, a functional method of a generic trait or object is compared on the instance that the call makes. A generic dotted method is compared the same way, except that when exactly one of the two declared domains lies inside the other, walk picks the inner one (F-253).

**Conditions:** Under walk, at load. Applies to pairs of declarations with static parameters of their own. Functional methods of a generic trait or object are not read at load but at each call. Varargs pairs are left out.

**Consequence:** A worker can expect walk to load a valid generic overload pair that the parameter check alone would refuse, within the limits above. Rows 416, 539 and 787 name valid pairs that walk still refuses. When a pair is refused, the worker should check those limits before suspecting the library.

**Evidence:** Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk`, `GenericPairNestedBoundsWalk` (load and dispatch), and the expected failure `XXXOverloadExistentialMeetWalk` (row 539). Detail in `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5.

**Could not resolve:**

- Whether a generic dotted method is read at load at all. The definition lists functional methods with static parameters of their own but not dotted ones, and the call-time paragraph treats dotted methods separately. Unclear wording.
- Scope against F-27: the title and body cover two generic declarations only, while F-257 and F-258 put "one generic beside a plain one" under "F-252, F-27". I infer that F-27 holds the mixed case, but this entry does not say so. Unclear wording.
- "ground static arguments": a type-theory term the skill does not define. I read it as "static arguments with no type variables". Language concept, readable.
- "two plain declarations so typed": I read it as declarations without static parameters of their own, whose parameter types are `Tg[\3\]` and `Tg[\4\]`. Readable.

---

## F-?1: equal declared domains are refused by No Duplicates

**Established:** Under walk, two declarations with equal declared domains are refused under the No Duplicates Rule ("fails because their parameter lists have the same types"). This holds when at least one of them has static parameters of its own, and even when the parameter check orders them. The parameter check treats a type parameter as strictly below its bound, so it would order `h[\T extends Number\](x: T, y: T)` before `h(x: Number, y: Number)`, though both cover the same arguments. Walk compares the domains and refuses the pair. An unbounded type parameter (bound `Any`) counts too: `g[\T\](a: T)` beside `g(a: Any)` is refused by walk, but the compiled checker accepts it (row 759).

**Conditions:** Under walk, at load. At least one of the two declarations is generic in its own right.

**Consequence:** Do not overload a generic declaration beside another declaration whose declared domain equals its domain, even when one looks "more specific" because of a bound. On this pattern, walk and the checker disagree (row 759).

**Evidence:** Gated by `tests/GenericBesideGenericSameDomain`, `GenericBesidePlainSameDomain`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` (refused). Detail in `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5, and `compile-ladder/rung-existential-reduction/REPORT.md` section 5.

**Could not resolve:**

- Row 759: which path is wrong, walk in refusing or the checker in accepting. The entry gives no verdict or status. I would guess that the checker is wrong under the No Duplicates Rule, but that is a guess. Unclear wording.

---

## F-?2: walk's Return Type Rule for two generic declarations, one inside the other

**Established:** When the parameter check refuses two declarations with static parameters of their own, and one declared domain lies inside the other, walk checks the Return Type Rule at one instance of the outer declaration. That instance is the one that walk's inference finds for the outer declaration at the inner one's parameter types. That instance is enough only when it stands for every instance of the outer declaration that can apply, because an actual argument can select a smaller instance. Walk accepts that it stands for all of them in two cases:

1. Every static parameter that the outer declaration's return type names is fixed by a static argument of one of its parameter types (invariance pins it).
2. The outer declaration returns one of its own type parameters, and the inner one either:
   - returns a type parameter of its own that is the whole type of at least one of its parameters and that appears only at positions where the outer declaration's parameter type is that returned parameter; or
   - has, at such a position, an object type above its own return type.

Otherwise walk refuses the pair with "fails the Return Type Rule". The two `Shape`/`Round`/`Circle` examples are refused by walk and by the compiled checker.

**Conditions:** Under walk, at load. Applies to two generic declarations whose declared domains are nested and which the parameter check refused. The check is deliberately conservative: it refuses where it cannot show that one instance represents all.

**Consequence:** A valid pair outside the two cases can be refused. A worker who writes such a nested generic pair should shape it to fit case 1 or case 2, for example by fixing the returned parameter through a generic parameter type. The two worked examples show what to avoid.

**Evidence:** Gated by `tests/GenericReturnRuleOuterParamWalk` and `GenericReturnRuleInvariantWalk` (refused), and `GenericReturnRuleHoldsWalk` (load and dispatch). Detail in `compile-ladder/rung-walk-generic-pairs/SKEPTIC.md` section 2.

**Could not resolve:**

- Scope: the title requires both declarations to have static parameters of their own, but F-257 lists `GenericBesidePlainReturnRuleWalk` under the Return Type message. So it is unclear whether this reading also governs a generic declaration beside a plain one, or whether that is F-27's. Unclear wording.
- Whether, when the instance does stand for all, walk then simply checks that the inner return type is a subtype of the outer's return at that instance. It is implied but not stated. Unclear wording, minor.
- The two-condition sentence is dense ("appears in no other parameter type than those at positions where…"), but it reads one way after care.

---

## F-253: walk infers a generic method's static arguments at a call

**Established:** Under walk, a call of a generic method that writes no static arguments infers them from the run-time types of the arguments, for dotted calls as for generic functions, whether the method is alone or overloaded on its receiver. Among the receiver's overloads, if one of two is a generic dotted method and exactly one domain lies inside the other, walk picks the inner one. Otherwise it compares them on the instance that the call makes. A generic method declared in a trait reads its bounds and conversion targets in the trait's method environment, as an object's method does, so it gets the same instance. For example, a `ZZ32` and a `ZZ64` give `Box[\ZZ64\]` with the `ZZ32` converted, and an unfixed bounded parameter takes its bound. A generic functional method that an object inherits from a trait is chosen over the object's plain one where only the inherited one applies. If inference with conversion finds no instance (an argument outside a bound), walk falls back to unification. For a trait's method, unification reads the trait's member environment, which has no parent, so it does not see the bound, and the call fails with "Cannot unify Int ... with Shape ... abm=K=(Int,Any)". The same method declared in an object fails with "Meet(Int, Shape) not a singleton". This inference is what lets the team's generic `distribute` over `K` run nested reductions under walk (F-248).

**Conditions:** Under walk, at call time, when no static argument is written. The fallback's failure message depends on whether a trait or an object declares the method.

**Consequence:** A worker can rely on walk inferring a generic method's static arguments, with conversion, as for functions. A call with an argument outside the bound fails either way. The two messages above both mean that, and the worker should not chase the difference between them as a separate defect (it is the team's behaviour).

**Evidence:** Gated by `tests/MethodStaticArgInference.fss`, `MethodStaticArgOverloadedReceiver.fss`, `MethodStaticArgDeclaredDomain.fss`, `NestedReductionFusion.fss`, `TraitGenericMethodInference.fss`, `InheritedGenericFunctionalMethodBesidePlain.fss`. Detail in `compile-ladder/rung-walk-method-sargs/REPORT.md` sections 1 and 2, `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 4, and its `SKEPTIC.md` section 3.

**Could not resolve:**

- "a `ZZ32` and a `ZZ64` give `Box[\ZZ64\]`": the method's signature is not given, so the example cannot be checked by reading. I guess something like `m[\T\](a: T, b: T): Box[\T\]`. Unclear wording.
- "the trait's method environment" against "the trait's member environment": two of walk's internal environments, named without definition. The contrast (one has the bounds, the other has no parent) carries the point. Walk internal, not in the skill.
- "the team's generic `distribute` over `K`": I do not know what `distribute` or `K` is (a library function, a trait?). F-248 holds it. Library concept I lack.
- "Int" in the messages: presumably walk's internal name for a number type. Minor.
- Whether falling back to unification without the bound is a defect to fix or simply kept. "As the team's code did" suggests that it is kept, but no status is given. Unclear wording, minor.

---

## F-257: walk names the rule that a refused generic pair breaks

**Established:** When walk's load check refuses a pair after reading it on its declared domains, the message names the rule that the pair breaks. Such pairs are those that the parameter check refused where both declarations, or one of them, have static parameters of their own (F-252, F-27), and those that the check ordered, which are read for No Duplicates only (`F-?1`). The three messages are quoted: Return Type ("fails the Return Type Rule: … not found to be a subtype …"), Meet ("fails the Meet Rule: … no declaration is found …") and No Duplicates ("fails because their parameter lists have the same types"). The messages say "not found" because walk's reading is narrower than the rules: rows 539, 550, 416 and 779 hold valid pairs that walk refuses. A pair that is not read on its declared domains keeps the parameter check's message ("with generic type, at least one pair of parameters must have excluding types"). Such pairs are: those with varargs, those with parameter lists of different lengths, those that raise an error while their instances are read, those of neither kind (for example two functional methods of a generic trait), and the instances that an explicit instantiation `f[\A, B\]` makes of two generic declarations of one name (`XXXGenericOverload2`). The message does not change which pairs load.

**Conditions:** Under walk, at load (and, for explicit instantiations, presumably at the call). The message is wording only.

**Consequence:** A worker can read the message to know which rule walk applied, but "not found" means that walk could not show the rule held, not that the rule fails. A refused valid pair may be a known gap (rows 539, 550, 416, 779). The old message means that the pair was never read on its domains.

**Evidence:** Gated by `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk`, `GenericBesidePlainReturnRuleWalk` (Return Type); `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk`, `GenericBesidePlainNoMeetWalk` (Meet); `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` (No Duplicates). Detail in `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.

**Could not resolve:**

- Row 416 among the "not found" examples: F-252 describes row 416 as two plain declarations that the parameter check refuses. Such a pair is not read on its domains, so it would keep the old message, not a rule-named one. Either row 416 also covers generic pairs, or the two entries disagree. Unclear wording.
- "raises an error while its instances are read": what error, and whether that is a defect. Unclear wording.
- The explicit-instantiation case: is this pair checked at the call, and what does `XXXGenericOverload2` expect (that walk should accept it)? Unclear wording.
- Rows 550 and 779 are cited only by number, with no gloss. Unclear wording, minor.

---

## F-258: both paths read exclusion of a generic pair over the whole parameter tuple

**Established:** Walk and the compiled checker decide whether two declarations, at least one generic, exclude each other by reading the whole parameter tuple (existential reduction), not position by position. Because no type extends two instantiations of one generic trait, a value in both domains has, at each position, one instance of each generic type above both parameter types there, so their static arguments must be equal. The domains exclude if those equalities cannot all hold, or if, at the instance they force, the types at some position exclude.

- Walk applies this only after the Meet Rule finds no covering declaration, to two declarations with static parameters of their own (constructors apart) or to one beside a plain declaration. It does not apply it when either declaration has a `where` clause of its own, has varargs, or when the lengths differ. At the forced instance, two types that still mention a static parameter count as excluding only if no instance can make them meet (for example an object type beside a type that neither it nor its supertypes can be). No `comprises` clause is read there.
- The checker reads only the first premise: with the static parameters as inference variables, the meet must be `Bottom`. It reads no bounds. At `a93fb3bfd`, an instrumented checker on the interpreter's library never reached this reading, because the earlier subtype test settled all 691 meets that the count stage asked about as empty.

The paths differ in three cases:

1. Type parameters with excluding bounds: walk loads, the checker refuses (row 786, contested).
2. A pair that excludes only as a whole, with a `where` clause on one side: walk refuses, the checker accepts (row 787, gap of walk).
3. `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`: walk's parameter check wrongly finds the `Box` types excluding and loads the pair, the checker refuses (row 788, gap of walk).

**Conditions:** Both paths, with the limits above. On the library at `a93fb3bfd`, the checker side changed nothing measurable.

**Consequence:** A worker can write generic overloads that exclude only as a whole tuple and expect both paths to accept them, outside the three differing cases. In cases 2 and 3, walk is the one to fix. Case 1 waits on a decision. The checker change is not expected to move the count on the current library.

**Evidence:** Gated by `ProjectFortress/tests/GenericPairExcludesTogetherWalk`, `GenericPairForcedObjectApartWalk`, `ProjectFortress/compiler_tests/GenericPairExcludesTogether`, `GenericPairSharedSupertypeExclusion` (load, compile, dispatch), and `ProjectFortress/tests/GenericPairFreeArgumentWalk`, `GenericPairObjectSupertypeOverlapWalk`, `ProjectFortress/compiler_tests/XXXGenericPairFreeArgument` (refused). One instrumented measurement at `a93fb3bfd`. Detail in `compile-ladder/rung-existential-reduction/REPORT.md` sections 1, 2, 5, 7.

**Could not resolve:**

- "a constructor apart": two readings, "except when one is a generic object's constructor" or "including a constructor taken apart". I took the first. Unclear wording.
- "such a pair keeps the Meet Rule's refusal" for varargs pairs and pairs of different lengths contradicts F-257 and F-252, which say that such pairs are never read on their domains and keep the parameter check's message. It fits only the `where`-clause pair. Unclear wording (cross-entry inconsistency).
- Which tests cover which of the three differing cases. In particular, `GenericPairFreeArgumentWalk` is listed as "refused", and I cannot tell which case it is. Case 3 has walk loading, not refusing. Unclear wording.
- "existential reduction" and "the reduction's first premise": not in the skill. The entry explains enough to follow, but "first premise" presumes that the reader knows the reduction's premises. Language/type-theory concept, partly explained.
- "found all 691 meets … empty": I read it as "the subtype test found each of the 691 meets to be empty". A second reading, "the set left for the new reading was empty", gives the same consequence. Minor.

---

## F-259: `extends {Any}` makes an `Object`

**Established:** On both paths, an object or a trait whose `extends` clause names only `Any` becomes an `Object`. Under walk, so does such an object expression, which the compiled path cannot compile yet. The pre-disambiguation desugaring (shared by both paths) rewrites such a clause, like an empty one, to `{Object}`, and leaves the declarations of `Any` and `Object` themselves alone. So `typecase` takes the `Object` arm for such a value, `cast[\Object\]` returns it, and it has `Object`'s members such as `asString`. With this and the library's conversion (`F-?3`), the team test `extendAny` prints `Infinity`.

**Conditions:** Both paths for declarations. Object expressions under walk only. `Any` and `Object` themselves are exempt.

**Consequence:** Writing `extends Any` does not make a non-`Object` value. A worker can call `Object`'s members on such values and match them as `Object`.

**Evidence:** Gated by `tests/ExtendsAnyIsObjectWalk.fss`, `tests/ConcatAnyOnLeftWalk.fss`, `compiler_tests/ExtendsAnyIsObject.test`. Detail in `compile-ladder/rung-string-conversion/REPORT.md` sections 1 and 6.

**Could not resolve:**

- "the team test `extendAny` prints `Infinity`": why `Infinity`, and whether that is the expected (passing) output. Presumably it is the value's `asString`, but the entry does not say what the test does. Unclear wording, minor.

---

## F-?3: `String`'s `||` over `Any` lets a tuple or `()` concatenate on the left

**Established:** Under walk, in the interpreter's library, `opr ||(a:Any, self)` is `("" || a) || self` and `opr ||(self, b:Any)` is `self || cast[\Object\](b).asString`. So `"" || a` uses `String`'s own members for `()` and for tuples of 2 to 6 elements, as a tuple on the right already did. Only a function, a tuple of 7 or more elements, or an object reaches the `cast`. Hence `(1,2) || "s"` gives `(1,2)s` and `() || "s"` gives `()s`. A function or a tuple of 7 or more elements next to a string raises `CastError`, and the expected failures `XXXFnRenderRungS` (row 374) and `XXXTupleSevenRungS` (row 369) record those. The compiled path links its own prelude, so this conversion does not reach it.

**Conditions:** Under walk, with the interpreter's library. Tuples of 2 to 6 elements and `()`. Functions and larger tuples fail.

**Consequence:** A worker can concatenate small tuples and `()` with strings on either side under walk. Functions and tuples of 7 or more raise `CastError` (known gaps). Nothing here applies to compiled runs until the switch-over. The effect on the distance is in F-246.

**Evidence:** Gated by `tests/ConcatAnyOnLeftWalk.fss`. Expected failures `XXXFnRenderRungS`, `XXXTupleSevenRungS`. Detail in `compile-ladder/rung-string-conversion/REPORT.md` sections 1 and 5, and `perf-probes/symbolic-operators/REPORT.md` section 2.6.

**Could not resolve:** nothing. (F-246's content is not glossed, but the pointer is enough.)

---

## F-154: shared `nat`s make a shape mismatch stop the run at dispatch

**Established:** The library's matrix and vector products share size parameters between their parameter types. For example `m` in `DOT` and in the juxtaposition of `Matrix[\T,n,m\]` by `Matrix[\T,m,p\]`, and likewise for matrix-vector and vector-matrix products. Under walk, a product of mismatched shapes finds no applicable overload and stops the run with "Failed to find any matching overload", giving the argument types and sizes. This is a `ProgramError`, which no Fortress `catch` handles. A non-overloaded sized declaration (such as the APL model's `pick`) fails instead with a unification error naming the size. No library product is non-overloaded.

**Conditions:** Under walk; the library's products. The error is not catchable.

**Consequence:** A shape mismatch in a product ends the run. A worker cannot guard it with `try`/`catch` and should check shapes before the call, or read this message as a shape bug.

**Evidence:** Observed under walk for a mismatched `DOT` (row 254), and in a probe of the model's own sized declarations, where a `try` caught nothing. No gated test and no command are named. Detail in `apl/mg/NOTES-swap.md`, "What the shared nats catch: the mismatch probe".

**Could not resolve:**

- "the model's own sized declarations": I take "the model" to be the APL program, from the previous sentence. Minor.
- `ProgramError`: not in the skill. From `interpreter.md` I read it as a Java-level error that a Fortress `catch` cannot see. Walk internal, readable.

---

## F-156: no reshape, plane, gather, outer product or ravel in the library

**Established:** The interpreter's library declares no reshape, no plane (take one plane of a rank-3 array as a matrix), no gather, no outer product and no ravel over its arrays. Run C4's vocabulary (`explorations/run-c4/src/FlatArrays.fsi`) declares its own `view`, `heads`, `plane`, `gather`, `onehot` and `flat`.

**Conditions:** The library's apis in `Library/*.fsi`, read by search.

**Consequence:** As stated: a program that needs one of these declares it itself.

**Evidence:** A search of `Library/*.fsi`. No test. Detail in `run-c4/probes/vocabulary/REPORT.md`, question 5 and section A.

**Could not resolve:**

- "So a program that needs one declares it itself": it can be read as a description (this is what programs do today) or as a rule (do it this way). As a rule, it contradicts the skill's `library.md`: "Put each extension into this library … This includes an extension that only the model program needs", and "Fix a gap in the library, not by a workaround in the program". Unclear wording, with consequences for a worker.
- The search covers `Library/*.fsi` only, not `ProjectFortress/LibraryBuiltin/`. Whether that matters is not said. Unclear wording, minor.
- How C4's names map to the five missing operations (`view` ~ reshape? `flat` ~ ravel? no outer product in C4's list). Minor.

---

## F-?4: the scalar-extension comment is the revival's; cite `353818213` for the team's intent

**Established:** The scalar-extension block is the eight generic declarations of `+`, `-`, `MIN`, `MAX` between an array and one number (F-119). Its comment in `Library/FortressLibrary.fsi`, which says that a static checker loses a sized argument's rank and size in the block's result, was written by the revival in September 2026 (`c2b4e2c95`, `581356f32`), not by the team. The team's own statement on per-type array storage is the message of Maessen's commit `353818213` (2008-07-28), "Immutable arrays of unboxed RR64".

**Conditions:** About authorship of one comment. Established by `git blame` and `git show`.

**Consequence:** Do not cite that comment as the team's intent. For the team's intent on per-type array storage, cite `353818213`.

**Evidence:** `git blame` and `git show`. Detail in `reviews/array-design-ways.md` section 9.

**Could not resolve:**

- Why the comment would be cited for "per-type array storage" at all: as summarised, it is about a checker losing rank and size, not about storage. The link between the comment and the claim it must not support is not stated. Unclear wording.
- "per-type array storage": not defined. From the commit title I read it as storage specialised per element type, such as unboxed `RR64`. Library/design concept, inferable.

---

## F-157: an array is a `get`/`put` trait, and a view is an object over other storage

**Established:** In Fortress, an array is a trait with `get` and `put`, and a view is an object that implements that trait over other storage. The library's `TransposedMatrix` is such a view, and this is the idiom for a view of a run-time shape. Under walk, a subtype of `Matrix` that overrides `mul` gets its own product through the library's `Matrix` juxtaposition and `DOT`, which forward to `mul`. No api line is needed, since walk dispatches on the receiver's run-time type. Two measurements under walk at `b176a4b79` found that views through the library cost more:

- Lifting a function over the rows of a 64 × 16 matrix: the row slice `m[i,:]` took 5 times as long as a six-line user view (row 298).
- The library's product with a diagonal that is a plain `Matrix` view, without the override: 13 times as long as a row-scaling operator at n = 16, and 58 to 63 times at n = 64. Row 299 records 54.

**Conditions:** Under walk only (the override was not measured on the compiled path). Measured at `b176a4b79`, once each.

**Consequence:** For a view, write an object that implements the array trait. To give it a fast product, override `mul`. Library slicing and plain views are much slower under walk.

**Evidence:** The review for the idiom; the probe note for the override and for the timings against row 299. No gated test. Detail in `reviews/c4-flatarrays-review.md` section 1, and `run-c4/probes/vocabulary/diag-override.md`, "Result" and "Timings against row 299".

**Could not resolve:**

- "a view of a runtime shape": two readings, a view whose shape is known only at run time (as against a statically sized type), or a view that reshapes data at run time. Unclear wording.
- "(row 299, which says 54)": the entry measures 58 to 63 times, and the row says 54. It does not say which figure stands, or whether the row needs correcting. Unclear wording.
- These are timings of walk, and `interpreter.md` says "Do not take or record a timing of walk." A worker cannot tell whether these ratios may be relied on or extended. Unclear wording, against the skill's rule.
