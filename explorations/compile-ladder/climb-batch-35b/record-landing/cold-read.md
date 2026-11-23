# Cold read of `clean.txt`

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the skill's `references/` (not `revival-changes.md` or `sources.md`). Terms looked up there: the Return Type Rule and walk's load check (`interpreter.md`, "What walk checks"), the team's object-type shortcut (`interpreter.md:81`, row 697), value objects (`SKILL.md`, "Parallelism and mutable state"), the stamp and the library order (`build-and-caches.md`), seeding (`worktrees.md`), the Working Draft (`specification.md:6`), the record's terms (`records.md`).

## 1. F-375

**Established:** Walk's check at load now applies the Return Type Rule to a pair made of a generic declaration and a plain one (no static parameters) when the plain one's domain lies inside the generic one's declared domain, even where the two parameter lists differ only at object types (where the team's old check would have called them excluding and skipped the rule). The pair loads if the plain result lies below the generic result by one of three readings, and is refused with a message naming the Return Type Rule otherwise (row 998, fixed). A tuple result is compared element by element (row 1058, fixed). Separately, `FTraitOrObject.enforceValueness` refuses a non-value type declared below a value type, and no longer refuses the symbolic type that stands for a type parameter (row 997, fixed).

**Conditions:** Walk only, at load, generic-beside-plain pairs. Limits: a plain declaration that writes no return type is not judged (row 1044); `comprises` clauses are not read; two plain declarations still get the team's shortcut (row 697). Since the five number types were merged with their objects (P-178, F-379), every generic-beside-plain pair over them goes through the declared-domain reading. Three of the choices (no `comprises` reading, no judgment without a return type, the value check and its "both directions" repair, the three readings) were made by the coordinator, the planner or a worker; the curator decided none.

**Consequence:** A worker should write the return type on a plain overload beside a generic one (otherwise the rule is silently skipped), should expect a pair over object types that breaks the rule to be refused at load now, and should treat the listed choices as open, not as the curator's decisions (if one matters to the work, that is a reason to explore). No walk test changed between loading and refusing, and no expected-failure test changed kind.

**Evidence:** The seven named tests under `ProjectFortress/tests/`; the suite result stated (every pair loaded before still loads); old-against-new runs in the three cited reports.

**Could not resolve:**
- "an own generic's declared domain": unclear wording. I read it as "a generic declaration of the same name"; it could also mean "a declaration with static parameters of its own" (F-26's term).
- "by one of three readings that the report gives": the entry does not say what the three readings are, nor at which instance "the generic's" result is taken. So I cannot tell from the entry which pairs load. Not standing alone.
- "a `comprises` clause is not read (row 550's pair at `ZZ64`, fixed since `ZZ64` is an object, F-379)": two readings. Either row 550 is an example of the limitation that no longer bites because `ZZ64` stopped needing a `comprises` clause, or row 550 is where `comprises` reading was fixed. I took the first; the wording does not settle it.
- "the repair of both directions in one step": unclear wording. Both directions of what: of the value check (refusing a non-value below a value type, and passing a type parameter), or of the Return Type Rule (loading and refusing)?
- "the five number types merged with their objects": a history/language concept I lack. The skill says the number types other than `QQ` are object types (`interpreter.md:78`) and that the prelude has seven number types each one `value object` (`compiler.md:34`); neither says which five, or what they were merged from.
- "passes the symbolic type of a type parameter": where such a type meets the value check is not said; the test names (`...ValueBoundWalk`) suggest a type parameter bounded by a value type. Unclear wording.
- "the coordinator", "the batch's planner": roles the skill does not define; only their consequence (not the curator) matters, and that is clear.
- Conflict with the skill: `interpreter.md:80` still says walk refuses row 1058's valid tuple pair, which this entry says is fixed. A worker reading both meets two contrary statements.

## 2. F-403

**Established:** The one library declares `EQV` (`≡`) and `NEQV` (`≢`) on two `Boolean`s as top-level operators next to `<->`. `EQV` is `if a then b else NOT b end` (deliberately avoiding `=`, which row 994 concerns on the compiled path), and `NEQV` is `NOT (a EQV b)`, as the specification defines `≢`. Both paths run them under the one library. Applied to two objects of a program's own type they are type errors: walk stops at the call with a unification error, the compiled checker refuses the call.

**Conditions:** One library, both paths. The specification and the prelude make them methods of `Boolean`; the one library keeps top-level operators for its boolean operators. With `AplCore` imported, its infix `≡` and prefix `≢` over `RR64` and arrays share an overload set with the library's two: its calls give what they gave before, and booleans get the library's answers (`t ≡ f` is `false`, `t ≢ f` is `true`). No gated program and no microGPT line imports `AplCore`. Limits: an undeclared equivalence operator such as `APPROX` still loads under walk and fails at the call with an internal error (row 1118); `⊕`, `⊼`, `⊽` and `majority` are not declared (row 1121).

**Consequence:** A worker can use `≡`/`≢` on booleans under the one library on both paths, should not expect them to work on other types, and should know that the top-level form and the merge with `AplCore` are plan defaults the curator has not decided. Avoid `=` on two booleans in compiled code (row 994).

**Evidence:** `tests/BooleanEquivalenceWalk.fss`, `one_library_tests/OneLibraryBooleanEquivalence.test`; the quoted error messages; the cited report sections.

**Could not resolve:**
- "within P-37, a default of the batch's plan that the curator has not decided": two readings. Since a P- entry is a curator's decision (`records.md`), I read it as "the top-level form fits within P-37, and is itself a plan default"; read literally, it says P-37 is undecided.
- "This also is the plan's default, not decided by the curator": unclear what "this" is: the merging with `AplCore`'s operators into one overload set, or the absence of any conflict handling, or the fact that nothing gated imports `AplCore`.
- "(row 994 is `=` of two booleans, compiled)": telegraphic. I read it as "row 994 is an open defect of `=` on two booleans on the compiled path", but the entry does not say the row is open or what the defect is.
- "an equivalence operator that nothing declares": a language concept (the specification's class of equivalence operators) not in the skill; the example `APPROX` lets me guess.
- "its own form for the boolean operators": inferred as "top-level operators rather than methods of `Boolean`" from the contrast; not stated.

## 3. F-404

**Established:** `seed-worktree.sh` copies `ProjectFortress/build` but not `ProjectFortress/build-one`. The implementation stamp covers `build-one` too. So when the base build has a `build-one`, the seeded worktree's stamp check fails at the first `ant` target: it prints 'Sources and build as the last build left them? no', rebuilds the Scala, and empties both `caches` and `caches-one`. Before that first build, a compiled run with `FORTRESS_LIBRARY=one` fails with 'java.lang.Error: The type ZZ of the library that the compiled path reads is not compiled over ... FZZ ...'.

**Conditions:** Only for a worktree seeded from a base build that has `build-one`. Holds until the script is changed.

**Consequence:** A seeded worker must budget a Scala build plus the library order before the first compiled run, and should not trust a compiled one-library run in a freshly seeded worktree before building. The skill's promise that a seeded worktree "runs walk and the compiled path right away" and that `ant compileAll` "keeps the seeded caches" (`worktrees.md:36`, `:45`) does not hold in this case.

**Evidence:** `build.xml:400-402`, `:469-470` (the stamp), `seed-worktree.sh:86-93` (the copy); no test, but the command `cd ProjectFortress && FORTRESS_LIBRARY=one ../bin/fortress run OneLibraryBooleanEquivalence` exits 1 with the error, in a fresh seeded worktree; report section "Defects, and their homes".

**Could not resolve:**
- `build-one`: not defined anywhere I may read. I guess it is a build output for the one library's runtime, but I cannot say what it holds or when a base build has one. Concept I lack (the skill mentions only `ProjectFortress/build`).
- "a compiled run under `FORTRESS_LIBRARY=one` before it stops, '...'": garden-path wording. I read "before it" as "before that first build", and "stops" as the verb; it could be misread as "before it stops".
- Whether a compiled run without the variable, or a walk run, also fails before the first build is not said.
- Whether the defect has a ledger row, or is to be fixed in the script, is not said ("No test" only).

## 4. F-405

**Established:** Under walk, a trait or object can declare several generic dotted methods of one name, and walk runs them. The object builds each generic method as one symbolic instance, keyed by the method's name and the kinds of its static parameters; an object's redeclaration of a trait's generic method thus replaces it. A call without static arguments infers them and dispatches among the instances; a call with static arguments instantiates each method whose static parameters (number and kinds) accept them, then chooses by the arguments as for a top-level generic function.

**Conditions:** Walk only, dotted generic methods. Limits: two methods of the same arity whose static parameters differ only in bounds collapse into one instance and the first met is kept, so a call can silently run the less specific one (row 1125: `Nested.tk(n)` on a `ZZ32` answers 2 from `tk[\U extends Number\]` instead of 3 from `tk[\U extends ZZ32\]`). A call on a receiver "assumed at the trait" stops (row 1126). A plain and a generic method of one name: a call with static arguments stops (row 744). Of two generic functional methods of one name and arity, the second is never chosen (row 1123).

**Consequence:** A worker can overload generic dotted methods by arity and by static-parameter kinds under walk, but must not overload them only by bounds, must not mix a plain and a generic method of one name where calls write static arguments, and must not rely on the second of two same-arity generic functional methods.

**Evidence:** The first-met rule was read in the code; row 1125 was observed; tests `tests/GenericMethodOverloadArity.fss`, `GenericMethodOverloadSetWalk.fss`, `GenericOverloadStaticArgKindsWalk.fss`; the cited report sections and `SKEPTIC.md`.

**Could not resolve:**
- "one symbolic instantiation for each name and kinds of static parameters" against "Two such methods of one number of parameters ... share that instantiation": unclear whether the number of value parameters is part of the key. If it is not, two methods of different arities with the same static-parameter kinds would collide, which the arity test suggests they do not.
- "the first met is kept": first in source order, in inheritance order, or in a hash order? Not said.
- "A call on a receiver assumed at the trait stops (row 1126)": unclear wording. Walk has no static types, so I cannot tell what "assumed at the trait" means (a call on `self` in the trait's body? a receiver bound through a trait-typed variable?), nor with what error it stops.
- Conflict with the skill: `interpreter.md:82` says two generic dotted methods that differ in arity load and a call fails (row 1057). This entry's title and its `GenericMethodOverloadArity.fss` test suggest that is fixed, but the entry does not name row 1057.

## 5. F-406

**Established:** On the compiled path, a setter call `c.t := v` (a method call after the desugarer) now passes `v` at the setter's parameter type for the receiver's instance, including when the receiver is typed by a type variable whose bounds have the setter (with a cast when it has `self`'s type, F-377). When the checker leaves a call with several candidate declarations, the code generator now writes into the class the overload (dispatch) method that the call names, and, where the call's signature differs from the overload set's principal member, a forwarding method at the call's signature. So setter assignments at a narrower value, `s.r := self` at a listed type, `num(R)` beside a trait's `num(self)`, calls on `self` in such a trait, and calls that one declaration takes directly and another by coercion all compile and run; the one library's `FortressLibrary` now holds `numerator{...}` and `denominator{...}`.

**Conditions:** Compiled path. The written overload method is a plan default and the forwarder a worker's choice; the alternative was routing each call through the trait; the curator has decided neither. Limit: the checker still refuses a comprised object's functional method declared at a narrower return type (row 1127).

**Consequence:** A worker can rely on these call forms compiling, should treat the generated overload method and forwarder as provisional designs, and should not write a narrower return type on a comprised object's functional method.

**Evidence:** `compiler_tests/VarFieldAssignedSubtypeRun`, `FunctionalMethodComprisedObject`, `ComprisesSelfAbstractFunctionalMethodCall`, `CoercionAnyOverloadRungC`; the named `CodeGen` methods; report sections 1 and 5.

**Could not resolve:**
- "an arrowless call after the desugarer", "the call's arrow": compiled-path concept I lack. I guess the arrow is the function type the checker attaches to a call, and the desugared setter call has none, but the skill does not say.
- "its set split with its principal member": unclear wording and an undefined concept. I cannot tell what "principal member" is (the most general declaration? the first?) or what splitting the set means.
- "cast below self's trait where it has self's type (F-377)": unclear which value is cast to what, and what "has self's type" means here.
- "`s.r := self` at a listed type": I guess "listed" means listed in a `comprises` clause; not said.
- "`numerator{...}` and `denominator{...}`": notation I cannot read (generated method names? overload-set names?), and why it matters is not said.
- Conflict with the skill: `compiler.md:172` still lists `num(R)` for an object a `comprises` clause lists as refused (row 815); this entry says it now runs compiled.

## 6. F-253

**Established:** Under walk, a call of a generic method (dotted or functional, alone or among overloads) that writes no static arguments infers them from the arguments' run-time types, as a call of a generic function does. Among a receiver's overloads where one is a generic dotted method, walk picks the one whose declared domain lies strictly inside the other's; otherwise it compares the instances the call makes (F-252). A trait's generic method reads its bounds and its conversion targets in the trait's method environment, exactly like an object's method, so it infers the same instance (e.g. a `ZZ32` and a `ZZ64` give `Box[\ZZ64\]` with the `ZZ32` converted; an unfixed bounded parameter takes its bound). An inherited generic functional method is chosen beside the object's plain one where only it applies. This lets the team's generic `distribute` over `K` run nested reductions (F-248).

**Conditions:** Walk only. Exception: two generic dotted methods of one name, arity and static-parameter kinds that differ only in bounds: the first met is kept (row 1125, F-405). When inference with conversion finds no instance (an argument outside a bound), walk falls back to unification; for a trait's method that unification does not see the bound, and fails with 'Cannot unify ZZ32 ... with Shape ... abm=K=(ZZ32,Any)'; the same method in an object fails with 'Meet(ZZ32, Shape) not a singleton'.

**Consequence:** A worker can call generic methods without writing static arguments under walk and expect the same instance whether a trait or an object declares the method. An argument outside a bound fails either way; the message differs by declarer, so a test should not pin one message for both.

**Evidence:** Six tests named (`tests/MethodStaticArgInference.fss` and five more); report sections of `rung-walk-method-sargs` and `rung-walk-trait-method-bounds`, and its `SKEPTIC.md` section 3.

**Could not resolve:**
- "the trait's method environment" against "the trait's member environment, which has no parent": walk internals I lack; the skill names neither. I can tell they are two different environments and that the second cannot see the bound, but not what each holds.
- "a `ZZ32` and a `ZZ64` give `Box[\ZZ64\]`": the example's declaration is not given; I assume a method like `m[\T\](a: T, b: T): Box[\T\]`.
- "the team's generic `distribute` over `K`": I do not know this library function or what `K` is; only that F-248 needs this inference.

## 7. F-26

**Established:** Under walk, when two declarations both apply and at least one has static parameters of its own (a generic function or constructor, or a functional method with static parameters inside a non-generic trait or object), the call picks the one whose declared domain (its parameter types with each type parameter as itself under its bounds, walk's symbolic instance) lies strictly inside the other's, regardless of source order. This builds P-45 under walk. If neither lies inside the other, both lie inside each other, or neither has static parameters of its own, walk compares the domains of the instances the call makes; so functional methods of generic traits are compared on their instance, and generic dotted methods follow F-253 (except the bounds-only pair, row 1125). If the chosen declaration is generic and its instance accepts an argument only by conversion, walk converts and dispatches again, so the most specific declaration for the converted values runs.

**Conditions:** Walk only. No second dispatch for an overloaded dotted method, nor at a position whose conversion `Coercions.coercionFor` does not find (e.g. a tuple converted element by element). Two generic overloads whose static parameters agree in name, kind and bounds share one symbolic instance even when their `where` clauses differ (row 478); no test or library declaration has such a pair.

**Consequence:** A worker can rely on specificity, not order, to choose between a generic and another overload under walk; must not rely on a second dispatch after conversion for dotted methods or tuple conversions; and should avoid two generic overloads distinguished only by `where` clauses.

**Evidence:** `tests/DispatchDeclaredDomain.fss`, `DispatchConvertedAgain.fss`; report `rung-walk-dispatch` sections 5.1, 5.2, 5.5.

**Could not resolve:**
- "a functional method with static parameters in a trait or object without any": I read "without any" as "a trait or object that has no static parameters". Then a generic functional method inside a generic trait has no static parameters "of its own" by this definition, which seems odd; the wording does not say whether that is intended.
- "share one symbolic instance, even if their `where` clauses differ": the consequence is not stated (do they compare as equal domains and fall to instance comparison, or does one hide the other?). Unclear wording.
- "two applicable declarations": whether the rule is applied pairwise among more than two candidates is not said.

## 8. P-174

**Decided:** A numeral has a type only at compile time: `NaturalNumeral` (no radix point) or `RadixPointNumeral`, both below `Numeral`, whose static parameters are the numeral's numbers: digit count `n`, digits after the point `m`, radix `r`, and the digits read as one integer `v` (so `3.125` is `RadixPointNumeral[\4, 3, 10, 3125\]`). These numbers are naturals of any size. Every number type, a program's or the library's, accepts numerals through a coercion that is generic over these numbers. A coercion's body is a compile-time computation: it calls no methods, uses the numbers as values converted where they stand to the type the place fixes (refused statically if they do not fit; `ZZ` where nothing fixes a type), and calls the type's constructor, as in the `Byte` and `Interval` examples; the compiler instantiates and folds it (P-176). No numeral value exists at run time. Numerals have no sign: `-3` is the type's own prefix `-` on the coercion's result for `3`. Other numeral-only expressions fold first (P-173) and reach a program's type only through a coercion from the folded type (e.g. from `QQ` for `1/2`), since coercions do not chain. The binary chapter's numeral coercion and `opr ||` are left out. Reason: the Working Draft gives numerals their own types so that libraries decide how numerals interact with other types by coercions; this replaces `IntLiteral` (P-76) and `FloatLiteral` (P-172).

**Applies:** To every number type and every numeral, on both paths. The `NN32` bound of P-40 applies to sizes, not (as I read it) to these numbers.

**Requires:** Write numeral types only as the parameter type of a coercion or an operator. Never give a numeral type getters, `asFloat`, `asString` or `=`; in a coercion's body never invoke a method (such as `v.asZZ32`) on the numbers; restrict acceptable numerals with a `where` clause (as `v < 256`). A type that should accept `-3` must declare prefix `-`; one that should accept `1/2` must declare a coercion from `QQ`. Do not count on coercion chains.

**Unfinished:** Walk loads a numeral type written as a return type, a variable's or a field's type, and refuses it only where a numeral meets it (row 1124). With no ledger row: the numeral coercions of the one library and of many tests call getters on the numbers (`v.asZZ32`), and the checker and the literals chapter read each number as a `ZZ` value wherever it stands instead of converting it where it stands (F-342, F-345). Whether P-176's instantiate-and-fold is built is not said.

**Could not resolve:**
- "with its four numbers as static parameters": the `Byte` example writes `NaturalNumeral[\n, r, v\]`, three parameters, and the skill's examples agree (`NaturalNumeral[\1, 10, 3\]`). The title's "four" fits only `RadixPointNumeral`. Unclear wording.
- "this implementation's `NN32` bound (P-40) is for sizes": two readings. Either the bound applies only to size parameters and so not to the four numbers (my reading, which fits "naturals of any size"), or the four numbers are bounded at `NN32` where used as sizes.
- "with no method invocation": the examples call the constructor and `roundDown`/`roundUp`, so a function or constructor call is allowed; whether a functional method or an operator counts as a "method invocation" is not said.
- "written only as a coercion's or an operator's parameter type": which operators may take a numeral type (the folding operators of P-173? any operator?) is not said.
- "which it refuses only where a numeral meets it": unclear whether that refusal is at load or a failure at run time.
- "the binary chapter's numeral coercion and `opr ||`": I do not know what the binary chapter's numeral coercion does, so I cannot tell what is lost; the decision to leave it out is clear.
- "The tree departs too, with no row": whether a worker who meets this departure should add a row, or write new coercions in the decided form while the old ones stay, is not said.

## Summary

1. F-375: blocked in part. The three readings that decide loading are not in the entry; "an own generic", "row 550 ... fixed", "both directions" and "the five number types merged" are unclear; contradicts `interpreter.md:80` on row 1058.
2. F-403: mostly clear. Unclear what "a default of the batch's plan" and "This also" refer to; row 994's status implied, not stated.
3. F-404: mostly clear. `build-one` is undefined; one garden-path sentence; contradicts `worktrees.md:36` for this case.
4. F-405: mostly clear. The instance key (is arity in it?), "first met" and "a receiver assumed at the trait" are unclear; relation to row 1057 (`interpreter.md:82`) unstated.
5. F-406: blocked in part. "arrowless", "the call's arrow", "principal member" and "its set split" are undefined; `numerator{...}` unreadable; contradicts `compiler.md:172` on `num(R)`.
6. F-253: clear in its claims; "method environment" vs "member environment" and `distribute` over `K` are concepts I lack.
7. F-26: clear; the definition of "static parameters of its own" excludes generic methods of generic traits, perhaps unintentionally; the consequence of sharing one symbolic instance is unstated.
8. P-174: mostly clear. "four numbers" against `NaturalNumeral`'s three; the `NN32` sentence reads two ways; "no method invocation" and "an operator's parameter type" are under-specified.
