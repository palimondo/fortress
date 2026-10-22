# Cold read: facts/f7 (F-90, F-220, F-225, F-226, F-227)

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the allowed `references/` (`records.md`, `library.md`, `compiler.md`, `specification.md`, `tests-writing.md`, `interpreter.md`, `exploring.md`, searched for terms). I did not read the record, its history, git or any report.

## F-90

**Established:** Parts of the interpreter's library were rewritten so that the compiled checker accepts them:
- the default vector, the default matrix and `TransposedMatrix` now declare the bound that the array family's declarations require (the bound itself is in F-151);
- `__immutableFactory1` returns an `ImmutableArray1`;
- `__ImmutableSubArray1` declares no `put`;
- `Matrix`'s `mul` computes its two parallel halves in a `do … also do … end` block;
- `TransposedMatrix`'s `add`, `subtract` and `negate` delegate to `Matrix`'s operators.

`SUFFIX_SUM` walks its indices in reverse as `seq((0 # (|x| - 1)).reverse)`. It cannot write the strided range `seq(a:b:c)`, because a strided range has the declared type `Range[\ZZ32\]`, which is not a `Generator`, and `seq` needs a generator, so the checker refuses it. That refusal is ledger row 661, which is still open. The same piece of work also built two decisions: P-53 (`String`'s `left` and `right` return `Just(c)`) and P-54 (`QQ`'s `ceiling` and `truncate` raise an exception at the infinities and at 0/0).

**Conditions:** This holds for the interpreter's library (`Library/`) as checked by the compiled checker. The `seq(a:b:c)` restriction holds until row 661 is fixed. The entry does not say whether these declarations are now free of errors, or only free of the errors that this work removed.

**Consequence:** Keep these forms. Do not put back a strided range under `seq` in library code that the checker must accept: write a `#` range and `.reverse`, as `SUFFIX_SUM` does. For `String`'s `left`/`right` and `QQ`'s `ceiling`/`truncate`, follow P-53 and P-54.

**Evidence:** The walk test `tests/TransposedMatrixAndFreeze.fss` gates it. `tests/StringPieces.fss` and `tests/NumberOrderListDeclarations.fss` gate the `String` and `QQ` parts. Ledger row 661. Detail is in `compile-ladder/rung-library-slips/REPORT.md`, sections 1 and 6.

**Could not resolve:**
- "declare the array family's bound (F-151)": unclear wording. I cannot tell which bound this is (a type parameter's bound such as `T extends …`, or a size bound) or which "family" is meant without opening F-151. As written, the clause cannot be understood on its own.
- "the default vector and matrix": unclear wording. The declarations are not named (for example `DefaultVector`, `DefaultMatrix`), so I could not grep for them.
- `do … also do … end`: a language concept I lack. The skill does not cover this block form. I inferred that it is a parallel block, from "parallel halves". The entry does not say what form `mul` used before or why the checker refused that form.
- `SUFFIX_SUM`: the entry does not say what it is (a big operator? a function?) or where it is declared.
- `a:b:c` (strided range) and `.reverse` on a `#` range: a language concept I lack. The skill gives only `0#n`. The entry does not say why `(0 # n).reverse` counts as a generator when `a:b:c` does not.
- Gating: unclear wording. The three gates are walk tests in `tests/`, yet the headline claim is that the compiled checker accepts these declarations. Nothing named fails if the checker stops accepting them (the count stage, perhaps). No gate is named for `SUFFIX_SUM`.
- "answers" (for "returns") and "the same work" (which work?) are readable but loose.

## F-220

**Established:** The compiled checker accepts the local function `body` inside `__bigOperator` (in `Library/FortressLibrary.fss`), declared as `body(i: I): L`. So `body` adds no error to the checker count (F-53). How walk runs `__bigOperator` is a separate fact, F-228: walk instantiates a big operator's static parameters from a declared type or from the elements, not at `BottomType`.

**Conditions:** This holds for the compiled checker on the current `__bigOperator`. The walk side holds as F-228 states it.

**Consequence:** When accounting for the checker count, do not attribute an error to `body` and do not change its typing to lower the count. For walk's behaviour, read F-228.

**Evidence:** The walk test `tests/UnwrittenListMapComprehensionWalk` gates it. Detail is in `compile-ladder/rung-walk-elements/REPORT.md`, section 6.

**Could not resolve:**
- "typed `body(i: I): L`": unclear wording. I cannot tell whether this type annotation is a change that made the checker accept `body`, or simply how `body` has always been declared. The entry also does not say why acceptance is worth recording, for example that it was once suspected to be an error.
- "it is no error of the checker count (F-53)": readable as "it is not among the counted errors". F-53's content is unknown, so I cannot tell what the reference adds.
- Gating: unclear wording. The only gate named runs under walk, which matches the F-228 part. Nothing named fails if the checker stops accepting `body`, which is the headline claim.
- `BottomType` against the skill's "the empty type `Bottom`": I took them to be the same thing (the AST class and the type). Minor.

## F-225

**Established:** A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. Take such a trait with no `comprises` clause, or with a `comprises` clause that lists only `...`. Inside its method bodies, the compiled checker gives `self` the type `C[\X\]` and also `X`, the implementing type, which it finds through the F-bound `X extends C[\X\]`. It does not change the method signatures. It refuses an extender whose static argument is a type the extender does not belong to. For example, `object Bad extends Integral[\ZZ32\]` is refused, because `Bad` is not a `ZZ32`.

If the trait's `comprises` clause lists types, `self` instead has the type of the meet (intersection) of the trait with the union of those listed types.

This builds decision P-146. Every self-typed body in the library passes the rule except `Integral`'s `numerator`, so each integer type declares its own `numerator` instead. When the rule landed, the distance dropped by 29, measured once.

Walk has no such rule and loads programs that the checker refuses.

Known consequences:
- A compiled method body that returns `self` fails JVM verification when the parameter is an object type (row 695).
- The rule refuses the `generator` in the team demo `trips.fss` (row 710).
- The rule refuses `PureList`'s `List` (row 355).

**Conditions:** This applies to the compiled checker only, and only in method bodies. Signatures are unchanged. Whether a trait has no `comprises` clause, has `comprises {...}`, or has a clause that lists types decides which typing of `self` applies. Walk is unaffected.

**Consequence:**
- A worker can rely on `self: X` inside the body of a self-typed trait under the checker.
- Do not give `Integral` a `numerator` body back.
- Expect the checker to refuse an extender whose argument is a type it does not belong to, and expect walk to accept it.
- Rows 695, 710 and 355 are known effects, so do not report them as new.

**Evidence:** `compiler_tests/SelfType*` and the `XXXSelfType*` tests gate it. Ledger rows 695, 710 and 355. P-146. Detail is in `compile-ladder/rung-self-type/REPORT.md`, sections 1, 2, 4 and 7.

**Could not resolve:**
- "`comprises` clause … that lists only `...`": a language concept I lack. The skill explains `comprises {A, B}` but not the ellipsis form or what it means for the extenders.
- "types `self` … as also the implementing type": unclear wording. It can be read as `self: X` alone, or as `self: C[\X\]` met with `X`. I chose the meet.
- "it keeps the signatures plain": unclear wording. I read it as "the signatures' types are unchanged, and only the bodies see the stronger `self`". It could also mean that the signatures may not mention the implementing type.
- "29 sites of the distance": unclear wording. The skill defines the distance as a count of errors, and the count stage reports both errors and "places with errors". "Sites" could be either. "one measurement" I read as "measured once, not repeated".
- "fails verification when the parameter is an object type": unclear wording. "The parameter" could be the static parameter `X`, instantiated at an object type, or a value parameter of the method. I assume `X`.
- Rows 710 and 355: unclear wording. Their status is not given, so I cannot tell whether these refusals are accepted effects of P-146 or defects still to be fixed.
- "the trait met with the union of those types": I understood "met" as the lattice meet. I cannot tell whether this case was built by the same work or existed before it.

## F-226

**Established:** Before it uses an inherited method, the compiled checker renames the method's own static parameters so that they cannot clash.
- In the overloading check, it renames them apart from the static parameters of the method's trait. So `Generator.generate[\R\]`, inherited by `PossibleReductionPair[\R\]`, keeps an `R` distinct from the trait's `R` (row 561).
- At a call, each method that `commonInheritedMethods` returns is instantiated with some of its own static parameters renamed to `name$i`, which is the form the checker's messages print (row 627). The parameters renamed are those whose names appear in the arguments, which I read as the receiver's static arguments.

So a dotted method invocation and a call by bare name inside a trait get the same renaming.

**Conditions:** This applies to the compiled checker, for methods whose own static parameters share a name with the trait's parameters or with names that appear in the receiver's static arguments.

**Consequence:** Expect `name$i` names in the checker's messages. Do not read them as a defect. A name clash between a method's and a trait's static parameters is not a cause of refusal. Rows 561 and 627 are what this fixed.

**Evidence:** `compiler_tests/InheritedMethodStaticParamSameName`, `InheritedMethodByNameStaticParamSameName` and `MethodStaticArgReceiverSameName` gate it. Ledger rows 561 and 627. Detail is in `compile-ladder/rung-overloading-checker/REPORT.md`, section 6 (the overloading check), and `compile-ladder/rung-checker-expected-type/REPORT.md`, section 1 (the call).

**Could not resolve:**
- "renames … apart": a type-theory term (capture-avoiding renaming), not in the skill. I understood it.
- "whose names the arguments mention": unclear wording. "The arguments" could be the receiver's static arguments (from the headline) or the call's own arguments.
- `name$i`: unclear wording. The entry does not say what `i` is (a counter, a position, a fresh number).
- `commonInheritedMethods`: a checker function the entry does not explain or locate (file not given). I inferred its role from its name.
- "a call by name inside a trait": readable two ways. It could mean calling a method by its bare name with no receiver, which the test name `…ByName…` supports, or a call-by-name evaluation. The "So" that introduces the sentence does not say why it follows.

## F-227

**Established:**
- When an intersection type contains a type variable or an inference variable, the compiled checker leaves that intersection as written and does not normalize it.
- When it checks a variable against a union, it checks against the whole union or against the variable's bound. It does not split the check per member.
- It replaces a closed trait by the union of its listed types only in a conjunct that contains no variable (`normConjunct` and `pSubInner` in `scala_src/types/TypeAnalyzer.scala`).

Results:
- Take a parameter bounded both by a closed trait and by a bound that excludes one of the trait's listed types. A call through such a parameter now type-checks.
- The Return Type Rule now accepts a valid overloading that sits beside such a declaration (rows 686, 687, 689, 690 and 711).
- A `Box[\T\]` argument under a ground (variable-free) second bound is still refused (row 712).
- One overloading that the expansion used to make acceptable is now refused. Whether it should be accepted is a question that Appendix I lists as not settled (row 713, CONTESTED, recorded by `XXXOverloadTwoBoundsClosedTraitExclusion`).

**Conditions:** This applies to the compiled checker's subtyping and normalization, for intersections and unions that involve type or inference variables and closed traits. The row 713 case is open until the curator settles the Appendix I question.

**Consequence:**
- Do not "fix" the row 713 refusal without a curator decision. It is a conflict, so switch to exploring.
- Treat the row 712 refusal as known.
- Writing two bounds on a parameter, one of them a closed trait, now works under the checker.

**Evidence:** `compiler_tests/*TwoBoundsClosedTrait` and `*TwoGroundBounds*ClosedTrait` gate it. The expected failure `XXXOverloadTwoBoundsClosedTraitExclusion`. Ledger rows 686, 687, 689, 690, 711, 712 and 713. The code is `normConjunct` and `pSubInner` in `TypeAnalyzer.scala`. Detail is in `compile-ladder/rung-checker-bounds/REPORT.md`, sections 1 and 6.

**Could not resolve:**
- "an intersection that names a type or inference variable": readable two ways. It could mean "a type variable or an inference variable", or "a type, or an inference variable". The second would cover every intersection, so I took the first.
- "closed trait": a term not in the skill. I took it to be a trait whose `comprises` clause lists types.
- "expands a closed trait into its listed types only against a conjunct that names no variable": unclear wording. It could mean that the closed trait is expanded only when it is itself a variable-free conjunct. It could also mean that it is expanded only when the conjunct it meets or is compared against names no variable. "Against" does not settle which.
- "reads a variable below a union through the whole union or through its bound": "reads" is vague, but I believe I have the meaning: the subtype check goes against the whole union, or through the variable's bound.
- "A `Box[\T\]` argument under a ground second bound stays refused (row 712)": unclear wording. The entry does not say whether this refusal is correct or a defect still owed, or what the call looks like.
- "before this change": unclear wording. It points to a change the entry never names. It is the only historical reference in the entry.
- `XXXOverloadTwoBoundsClosedTraitExclusion`: no folder is given, and the entry does not say which outcome it asserts. I read it as recording today's refusal.
