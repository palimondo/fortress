# Cold read: facts/f14/clean.txt

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these parts of `references/`, searched for terms: `interpreter.md` ("What walk checks"), `library.md`, `compiler.md`, `records.md`, `tests-writing.md`. I did not read `revival-changes.md`, which the skill names as the page that defines "declared domain", so for that term I go by the glosses in the entries ("each over all its own instances").

All thirteen entries are facts. Four have placeholder numbers (`F-?1` to `F-?4`). The entries cite each other by those placeholders, and I read each placeholder as naming the entry in this file that has that number.

---

## F-249 "Under walk, a program that imports only the prelude reaches the string objects' own `||` only through `String`'s abstract `opr ||(self, b:String)`"

**Established:** Under walk, a user program that imports only the prelude (`FortressLibrary`) cannot name the string objects' own `||` declarations. Its `s || t` on two strings resolves to `String`'s abstract member `opr ||(self, b:String)`, and dispatch on the run-time object then reaches the object's own `||`. Code inside `FortressLibrary` sees `FlatString`'s `||` directly, because `FortressLibrary` imports `FlatString`'s api. Suppose `String`'s `||` members became top-level declarations over `(Any, String)` and `(String, Any)`, the way juxtaposition is declared. Then the Meet Rule needs a third top-level declaration over `(String, String)`, and that declaration must delegate to `||` declarations that some imported api states. If the meet has a body of its own, every string-string concatenation runs that body: `"s" || "t"` gives a `CatString` of depth 1 where the current library gives a `FlatString` of depth 0. Both print the same.
**Conditions:** Walk only. It holds for a program that imports only the prelude. The second half describes a proposed change, not today's tree.
**Consequence:** If a worker makes that change, the `(String, String)` meet must forward to the objects' own `||` and must not build a result itself. Otherwise the representation of every concatenation changes, and printed output does not show it.
**Evidence:** Observed once, in probes on a patched library. No gated test holds it. Detail in `perf-probes/symbolic-operators/REPORT.md` section 2.4.
**Could not resolve:**
- "an imported api states": imported by whom? It could be an api that the component declaring the meet imports (`FortressLibrary`, which imports `FlatString`'s api), or an api that the user program imports. This is unclear wording.
- `CatString` appears in the consequence but is not among the listed string objects (`FlatString`, `Concatenable`, `EmptyString`). Is `Concatenable` an object or a trait? What is `CatString`'s relation to the three? This is unclear wording, or a library fact I lack.
- "depth": I take it to mean the depth of a concatenation tree. It is not defined.
- "Observed once": it is not clear whether this covers only the patched-library result or also the first claim about today's tree. This is unclear wording.

## F-252 "Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own, the load check reads the pair again on its declared domains"

**Established:** At load, walk first compares two overloads position by position. A pair that this comparison finds excluding loads. Suppose both declarations have static parameters of their own: a generic function, a generic object's constructor, or a functional method that declares its own static parameters in a non-generic trait or object. If the parameter check refuses such a pair, walk reads it again over each declaration's set of all instances, and loads it if the No Duplicates, Return Type and Meet Rules hold there. The limits of that second reading:
- The parameter check never finds `Tg[\3\]` and `Tg[\4\]` excluding (row 416).
- In the second reading, walk looks for a covering third declaration only where, at each position, the two types are instances of one generic type or static parameters (row 539).
- A pair whose domains exclude when read whole loads (F-258).
- A pair with varargs, or with parameter lists of different lengths, is not read again and stays refused (F-257).

At a call, walk compares functional methods of a generic trait or object, and generic dotted methods, on the instance that the call makes. The exception is where exactly one declared domain lies inside the other (F-253).
**Conditions:** Walk, at load. Both declarations must have static parameters of their own (F-27 covers the generic-beside-plain case). Varargs pairs and pairs of different lengths are excluded.
**Consequence:** A generic overload pair that the old per-parameter check would refuse can now load if it meets the three rules over its whole domains. Some valid pairs are still refused (rows 416 and 539).
**Evidence:** Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk` and `GenericPairNestedBoundsWalk` (load and dispatch), and by the expected failure `XXXOverloadExistentialMeetWalk` (row 539). Detail in `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5.
**Could not resolve:**
- Scope of the second reading. The title says it happens "where the parameter-by-parameter check refuses" a pair. But F-?1 refuses equal domains "whether or not the parameter-by-parameter check orders them", and F-?2 applies the Return Type Rule where one domain lies inside the other, which the parameter check presumably orders. `interpreter.md` says the declared-domain check covers "every pair of functions of which at least one is generic". So is the second reading only for refused pairs, or for every such pair? I read these two ways. This is unclear wording, or a conflict between entries.
- "instances of one generic type or static parameters": is it both types instances of one generic type, or both static parameters? Or can each one be either? This is unclear wording.
- The row-416 sentence: it is not said whether the second reading rescues a generic pair that has such positions, or whether the sentence is only about plain pairs. This is unclear wording.
- The last sentence: does "except where exactly one of the two declared domains lies inside the other" apply only to generic dotted methods, or also to functional methods of a generic trait? F-253 suggests dotted methods only. This is unclear wording.

## F-?1 "Under walk, two declarations whose declared domains are equal are refused by the No Duplicates Rule"

**Established:** Under walk, a pair of overloads where at least one has static parameters of its own is refused if their declared domains (each over all its instances) are equal. This holds even when the parameter check would order them. The parameter check reads a type parameter as strictly below its bound, so it would put `h[\T extends Number\](x: T, y: T)` before `h(x: Number, y: Number)`. The declared domains are equal, though, so walk refuses with "fails because their parameter lists have the same types". The same holds for an implicit `Any` bound: `g[\T\](a: T)` beside `g(a: Any)` is refused. The compiled checker accepts that pair (row 759), I take it because the compiled path bounds an unbounded parameter by `Object` (`compiler.md`).
**Conditions:** Walk, at load. At least one declaration has static parameters of its own. The other may be plain.
**Consequence:** A worker cannot add a generic overload whose instances together cover exactly a plain overload's domain, or another generic's domain. Walk and the checker disagree on the unbounded-`Any` case (row 759).
**Evidence:** Gated by `tests/GenericBesideGenericSameDomain`, `GenericBesidePlainSameDomain`, `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk` (refused). Detail in `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5, and `compile-ladder/rung-existential-reduction/REPORT.md` section 5.
**Could not resolve:** none. This entry is clear.

## F-?2 "Under walk, where one of two declarations with static parameters of their own lies inside the other, the load check reads the Return Type Rule at one instance of the outer one"

**Established:** When one generic declaration's domain lies inside another's, walk checks the Return Type Rule at a single instance of the outer one: the instance that holds the inner one's domain. A check there alone would be too lenient, because an argument of the inner one can select a smaller outer instance with a narrower return type. So walk refuses the pair unless that one instance stands for every instance that applies. It stands for all of them in two cases:
1. Every static parameter that the outer return type names is pinned by appearing as a static argument in a parameter type, as in `Box[\T\]`.
2. The outer one returns its own type parameter, and the inner one does one of two things: it returns a type parameter of its own that is "the type of no other parameter", or it has an object type at a position whose type is that returned parameter, with its return type below that object type.

Otherwise walk refuses with "fails the Return Type Rule". Two examples are refused, and the checker refuses both too: `f[\T extends Shape\](x: T, y: T): T` beside `f[\U extends Round\](x: U, y: Round): Round`, and `f[\T extends Shape\](x: T): Box[\T\]` beside `f[\U extends Round\](x: U): Box[\U\]`.
**Conditions:** Walk, at load. Both declarations have static parameters of their own, and one domain lies inside the other.
**Consequence:** Walk refuses such a generic pair unless it is in one of the two cases. Both paths agree on the two examples.
**Evidence:** Gated by `tests/GenericReturnRuleOuterParamWalk` and `GenericReturnRuleInvariantWalk` (refused), and `GenericReturnRuleHoldsWalk` (load and dispatch). Detail in `compile-ladder/rung-walk-generic-pairs/SKEPTIC.md` section 2.
**Could not resolve:**
- "the outer declaration's instance that holds the inner one's declared domain": several outer instances can hold it (for example `T = Round` and `T = Shape`). I take it to mean the least one, but the wording implies there is only one. This is unclear wording.
- "a type parameter of its own that is the type of no other parameter": other than which parameter? Perhaps the position where the outer has its returned parameter, or perhaps "it is the type of exactly one parameter". I could not settle it. This is unclear wording.
- "at a position whose type is that returned type parameter": whose type, the outer one's? I assume so. This is unclear wording.
- The first example needs `Round` to be a trait, not an object, for neither sub-case to apply. The entry does not say which it is. This is minor.

## F-253 "Under walk, a call of a generic method that writes no static argument infers the method's own static arguments from the arguments' run-time types"

**Established:** Under walk, a generic method called without static arguments, dotted or functional, alone or overloaded, gets its static arguments inferred from its arguments' run-time types, as a generic function does. Among overloads, a generic dotted method is compared with another on the declared domain where exactly one of the two domains lies inside the other. A generic method declared in a trait now infers the same instance as the same method declared in an object, with bounds and conversions read correctly. A `ZZ32` and a `ZZ64` give `Box[\ZZ64\]` with the `ZZ32` coerced, and an unfixed bounded parameter takes its bound. An inherited generic functional method is chosen beside the object's plain one where only the inherited one applies. Where inference with conversion finds no instance, as for an argument outside a bound, walk falls back to unification. For a trait's method that fallback still uses the trait's member environment, as the team's code did, and its error shows no bound (`'Cannot unify Int ... with Shape ... abm=K=(Int,Any)'`). For an object's method the error is `'Meet(Int, Shape) not a singleton'`. This lets the team's generic `distribute` over `K` run nested reductions (F-248).
**Conditions:** Walk, at a call that writes no static argument.
**Consequence:** Generic methods can be called without static arguments under walk. When inference fails, the error text depends on whether the method is declared in a trait or in an object.
**Evidence:** Gated by `tests/MethodStaticArgInference.fss`, `MethodStaticArgOverloadedReceiver.fss`, `MethodStaticArgDeclaredDomain.fss`, `NestedReductionFusion.fss`, `TraitGenericMethodInference.fss` and `InheritedGenericFunctionalMethodBesidePlain.fss`. Detail in `compile-ladder/rung-walk-method-sargs/REPORT.md` sections 1 and 2, and `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 4 and its `SKEPTIC.md` section 3.
**Could not resolve:**
- "reads its bounds, and the types to which its arguments convert, where its instances evaluate their types": "where its instances evaluate their types" names a place or environment that I cannot identify. I infer the intent (the trait's method behaves like the object's) only from the next sentence. This is unclear wording.
- "compares a generic dotted method with another on its declared domain": whose declared domain? And what does walk compare on otherwise: the call's instance, per F-252? This is unclear wording.
- "member environment": I take it to be the trait's name-to-value environment (`interpreter.md`, `env/`). This is a walk concept the skill touches only lightly.

## F-257 "Under walk, a pair of declarations that the load check refuses after it reads the pair on its declared domains is refused in the name of the rule that the pair breaks"

**Established:** The declared-domain reading applies when both declarations are generic in their own right, or when one is and the other is plain. A pair refused after that reading gets a message that names the broken rule:
- the Return Type Rule: "fails the Return Type Rule: the first [second] is more specific, ...";
- the Meet Rule: "fails the Meet Rule: neither is found ...";
- the No Duplicates Rule: walk's older "fails because their parameter lists have the same types".

The messages say "not found" because walk's reading is narrower than the rules: rows 539, 550, 416 and 779 hold valid pairs that walk refuses. Pairs not read on declared domains keep the parameter check's message, for example "with generic type, at least one pair of parameters must have excluding types". Those pairs are: pairs with varargs, pairs with lists of different lengths, the two instances of an explicit instantiation, and pairs of neither kind, such as a generic trait's functional method beside another. The message does not decide which pairs load.
**Conditions:** Walk, at load.
**Consequence:** A worker can tell from the message which path refused a pair and which rule it broke. A refusal does not prove that the pair is invalid. A `.test` file's `load_exception_contains` should name the right message.
**Evidence:** Gated by `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk` and `GenericBesidePlainReturnRuleWalk` (Return Type); `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk` and `GenericBesidePlainNoMeetWalk` (Meet); `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk` (No Duplicates). Detail in `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.
**Could not resolve:**
- "the two instances of an explicit instantiation": I cannot tell what pair this is. Two calls of `f[\ZZ32\]`? An instantiation that produces two overloads? This is unclear wording, or a language concept I lack.
- The first sentence covers generic-beside-plain pairs (citing F-27), while F-252's title covers only pairs where both are generic and the parameter check refused them. I read the scope of F-257 as the wider one. This is a consistency question, not a blocker.

## F-258 "Walk and the compiled checker read exclusion between two declarations, one or both with static parameters, over the whole parameter type, by existential reduction"

**Established:** Both paths decide whether two generic (or generic-beside-plain) declarations exclude by reading the whole parameter list. No value can have two instances of one generic type, so a value in both domains forces the static arguments of matching generic instances to be equal. The domains exclude if those equalities are inconsistent, or if, at the forced instance, some position's types exclude.

Walk applies this only where the Meet Rule finds no covering declaration. It does not apply it to `where` clauses, varargs, or lists of different lengths. At the forced instance, walk counts two types that still mention a static parameter as excluding only when no instance can make them meet, for example an object type beside a type that neither it nor any of its supertypes can be. It ignores `comprises` there. The checker applies only the reduction's first premise, and ignores bounds. At `a93fb3bfd`, the checker's new test was never reached on the interpreter's library: the older test had already found all 691 meets it was asked about empty.

The paths differ in three cases:
1. Two type parameters with excluding bounds: walk loads, the checker refuses (row 786).
2. A pair that excludes only when read whole, with a `where` clause on one declaration: walk refuses, the checker accepts (row 787).
3. `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, with `Box` an object: walk's parameter check calls the `Box` types excluding and loads the pair, the checker refuses it (row 788).

**Conditions:** Both paths, for pairs where at least one declaration has static parameters. The limits are those above.
**Consequence:** Generic pairs that exclude only when read whole now load on both paths. A worker must expect walk and the checker to disagree in the three listed cases. On the interpreter's library, the change did not alter what the checker reports.
**Evidence:** Gated by `ProjectFortress/tests/GenericPairExcludesTogetherWalk`, `GenericPairForcedObjectApartWalk`, `ProjectFortress/compiler_tests/GenericPairExcludesTogether` and `GenericPairSharedSupertypeExclusion` (load, compile and dispatch), and by `ProjectFortress/tests/GenericPairFreeArgumentWalk`, `GenericPairObjectSupertypeOverlapWalk` and `ProjectFortress/compiler_tests/XXXGenericPairFreeArgument` (refused). There is one measurement at `a93fb3bfd`. Detail in `compile-ladder/rung-existential-reduction/REPORT.md` sections 1, 2, 5 and 7.
**Could not resolve:**
- "Walk reads no `where` clause": it could mean that walk ignores the clause's constraints and still reduces, or that it does not apply the reduction to such a pair. Case 2 (walk refuses) points to the second reading, but I had to infer it. This is unclear wording.
- "the reduction's first premise": the entry never numbers the premises. I take it to be "these equalities cannot hold together". This is unclear wording.
- "the checker's new test ... the older test": "test" here seems to mean a check inside the checker's code, not a harness test. I also cannot tell what "new" and "older" refer to, presumably the reduction against the checker's earlier exclusion check. This is unclear wording.
- For each of the three differing cases, the entry does not say which path is correct. In case 3 I believe walk is wrong (`T = ZZ32` meets the plain domain), but I cannot confirm it. Nor can I match the "(refused)" tests to rows 786 to 788. This is unclear wording, or missing information.
- An `XXX` test is listed under "(refused)": does the `XXX` assert the refusal that the specification wants, while the checker accepts today, or the reverse? This is unclear wording.

## F-259 "On both paths, an object or a trait whose `extends` clause names only `Any` is an `Object`; under walk, so is such an object expression"

**Established:** The pre-disambiguation desugaring, which both paths run, rewrites an `extends {Any}` clause to `{Object}`, as it does for an empty clause. It leaves `Any` and `Object` themselves alone. So such a value takes `typecase`'s `Object` arm, passes `cast[\Object\]`, and has `Object`'s members such as `asString`. Together with F-?3's conversion, the team's `extendAny` test prints `Infinity`.
**Conditions:** Objects and traits on both paths. Object expressions under walk only.
**Consequence:** Writing `extends Any` gives the same type as writing no clause. `asString` and `Object`'s other members are available on such values.
**Evidence:** Gated by `tests/ExtendsAnyIsObjectWalk.fss`, `tests/ConcatAnyOnLeftWalk.fss` and `compiler_tests/ExtendsAnyIsObject.test`. Detail in `compile-ladder/rung-string-conversion/REPORT.md` sections 1 and 6.
**Could not resolve:**
- "under walk, so is such an object expression": is the compiled path different for object expressions, or just untested, or unable to compile one? (`compiler.md` lists an object expression among constructs that the compiled path does not compile, which may explain it.) This is unclear wording, but minor.
- Why `extendAny` prints `Infinity` is not explained. This is minor, and probably just the test's expected output.

## F-?3 "Under walk, `String`'s two `||` members over `Any` convert the other operand without calling `asString` on an `Any`"

**Established:** In the interpreter's library, `opr ||(a:Any, self)` is `("" || a) || self`, and `opr ||(self, b:Any)` is `self || cast[\Object\](b).asString`. So under walk `(1,2) || "s"` gives `(1,2)s` and `() || "s"` gives `()s`. A function, or a tuple of seven or more elements, beside a string raises `CastError` (expected failures `XXXFnRenderRungS` and `XXXTupleSevenRungS`, rows 374 and 369). The compiled path links its own prelude, so this change does not reach it. F-246 gives the effect on the distance.
**Conditions:** Walk, with the interpreter's library.
**Consequence:** Tuples of up to six elements, and `()`, concatenate with strings on the left. Functions and longer tuples still fail. The compiled path differs until the switch-over.
**Evidence:** Gated by `tests/ConcatAnyOnLeftWalk.fss`, plus the two `XXX` tests above. Detail in `compile-ladder/rung-string-conversion/REPORT.md` sections 1 and 5.
**Could not resolve:**
- The skill says that `Any` holds tuples and `()` "as `Object` does not". Yet the entry has a tuple and `()` pass `cast[\Object\](b)`, with only functions and tuples of seven or more failing. The entry does not say why small tuples and `()` pass a cast to `Object` under walk. I could not reconcile this with the skill. It may be a walk fact that I lack.
- "without calling `asString` on an `Any`" and "so ... concatenates on the left": why does the left side specifically gain from this? Did the right side already work? The causal step is not stated. This is unclear wording.

## F-154 "The library declares its matrix and vector products with shared `nat`s, so under walk a product of the wrong shapes stops the run at dispatch"

**Established:** The library's matrix-matrix, matrix-vector and vector-matrix products share a size parameter between parameter types, as `m` does in `Matrix[\T,n,m\]` by `Matrix[\T,m,p\]`. Under walk, a product of mismatched shapes finds no overload and stops with "Failed to find any matching overload", printing the argument types and sizes. That is a `ProgramError` that no `catch` catches. A non-overloaded sized declaration, such as the APL model's `pick`, fails instead with a unification error that names the size. No library product is non-overloaded.
**Conditions:** Walk, with the library's sized products.
**Consequence:** A shape mismatch in a product is fatal and cannot be caught. A worker cannot rely on `try`/`catch` to handle it. The error text tells whether an overloaded or a single declaration failed.
**Evidence:** Observed under walk for a mismatched `DOT` (row 254), and in a probe of the model's own sized declarations, where a `try` around a mismatched call caught nothing. Detail in `apl/mg/NOTES-swap.md`, "What the shared nats catch: the mismatch probe".
**Could not resolve:**
- The entry names no gated test, and does not say that none exists. `records.md` asks for a command and its output in that case. This is a matter of form rather than meaning.

## F-156 "The interpreter's library declares no reshape, plane, gather, outer product or ravel over its arrays"

**Established:** The library has no reshape, no plane (taking one plane of a rank-3 array as a matrix), no gather, no outer product and no ravel. A program that needs them declares them itself, as `explorations/run-c4/src/FlatArrays.fsi` declares `view`, `heads`, `plane`, `gather`, `onehot` and `flat`.
**Conditions:** The interpreter's library, as it stands.
**Consequence:** A worker who needs these operations writes or reuses its own declarations, such as Run C4's. They are not missing imports.
**Evidence:** A search of the library's api. Detail in `run-c4/probes/vocabulary/REPORT.md`, question 5 and section A.
**Could not resolve:**
- "the library's api": `FortressLibrary.fsi` only, or every `.fsi` under `Library/`? This is minor unclear wording.

## F-?4 "The comment on the library's scalar-extension block is the revival's, not the team's"

**Established:** The comment above the block of F-119 in `Library/FortressLibrary.fsi` says that a static checker loses a sized argument's rank and size in the block's result. The revival wrote that comment in September 2026 (`c2b4e2c95`, `581356f32`). The team's own statement about per-type array storage is the message of Maessen's commit `353818213` (2008-07-28): "Immutable arrays of unboxed RR64".
**Conditions:** The comment as it stands in the tree.
**Consequence:** Do not cite the comment as evidence of the team's intent. Cite `353818213`.
**Evidence:** `git blame` and `git show`. Detail in `reviews/array-design-ways.md` section 9.
**Could not resolve:**
- "scalar-extension block": I do not know what the block is (operators that extend scalar operations over arrays?). The entry relies on F-119 to say. This is a library term not in the skill. It does not block the entry's point.

## F-157 "An array is a trait with `get` and `put`, and a view is an object that implements it over other storage; this is the language's own idiom"

**Established:** In Fortress, an array is a trait with `get` and `put`, and a view is an object that implements that trait over other storage. A `Matrix` subtype that overrides `mul` gets its own product through the library's `Matrix` juxtaposition and `DOT`, which both forward to `mul`. It needs no api declaration, because walk dispatches on the receiver's run-time type. Under walk at `b176a4b79`, going through the library's views was slower in two measurements:
- The library's row slice `m[i,:]` took 5 times as long as a six-line user view, on a 64 × 16 "row lift" (row 298).
- The library's product with a diagonal `Matrix` view took 13 times as long as a row-scaling operator at n = 16, and 54 times as long at n = 64 (row 299).

**Conditions:** The idiom and the override hold under walk. The timings are from one tree.
**Consequence:** A worker can write a custom view or matrix type and override `mul` to get a fast product. The library's generic view paths are much slower than a hand-written view or operator.
**Evidence:** Detail in `run-c4/probes/vocabulary/REPORT.md`, question 3 (the idiom, with row 150), and `run-c4/probes/vocabulary/diag-override.md`, "Result" (the override). The entry gives no machine details for the timings and names no gated test.
**Could not resolve:**
- "row lift": I cannot tell what operation this is (extracting every row of a 64 × 16 matrix?). This is unclear wording.
- "the library's product with a diagonal `Matrix` view": was this measured without the override (the library's generic product) or with it? The detail pointer says "the override". This is unclear wording.
- "needs no api line ... since walk dispatches": does the same hold on the compiled path? It is not said. This is unclear wording.
- "the language's own idiom": is this claimed from the team's sources, or from the revival's practice? The source is not given in the entry. This is minor.
