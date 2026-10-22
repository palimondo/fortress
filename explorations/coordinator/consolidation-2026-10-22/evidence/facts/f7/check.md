<!-- The clarity pass's check of FACTS chunk f7 (F-90, F-220, F-225, F-226, F-227): each rewritten entry compared with the record and its sources, and the cold reader's answers with the source meaning, each failure classed. -->

# FACTS chunk f7: the check

Read on `main` at `772a5a2af`. Sources: `facts-extract.sh 'F-N'` and `'history:F-N'` for each entry; `assessment.md`; the report sections each entry cites; ledger rows 355, 561, 627, 661, 686, 687, 689, 690, 695, 710, 711, 712 and 713; P-53, P-54, P-146, F-53, F-151, F-228 and F-264; review-queue items 212 and 234; and the code and tests named below. I ran no build and no test. Every code claim below is from reading the code.

## F-90

### Fidelity

1. **The named gate does not gate the title's claim.** The title's claim is about the compiled checker: "… are written so that the compiled checker accepts them". The entry then says: "Gated by `tests/TransposedMatrixAndFreeze.fss`; the `String` and `QQ` parts by …". Those are walk tests. `TransposedMatrixAndFreeze` checks under walk the values of `mul`, of `replica` and `freeze` (the factory's callers), of a sub-array and of the transposed arithmetic. The report says "The storing objects have no walk test of their own" (`rung-library-slips/REPORT.md` section 2). Walk checks `SUFFIX_SUM`'s values in `tests/IntegerOrderNumerals.fss:60-61`, which the entry does not name. The checker's acceptance is shown only by the distance stage. Its site list, `compile-ladder/gate/distance-sites.tsv`, has five sites, none in these declarations (F-53), and per F-53 the stage is "reported, never red". A reader would take the named test as the check that fails if the checker stops accepting these declarations. No test does that. The record's text has the same fault, but the rewrite's explicit title makes it sharper.
2. **"built P-54" says more than P-54.** The rewrite says "The same work built P-53 (…) and P-54 (`QQ`'s `ceiling` and `truncate` raise at the infinities and 0/0)". P-54 ends "Still to build: that rung …": after the switch-over, `floor` and `ceiling` are to return `QQ` and pass the infinities through. Only P-54's present rule is built. P-53 is "Built." as stated.
3. **The title credits the listed forms alone with the checker's acceptance.** The acceptance also rests on two other entries:
   - `Matrix`'s `mul`: its arithmetic on `T` "belongs to fork 2 and stays" (report section 1, item 4). It checks through F-151's ring bound.
   - `__immutableFactory1`: its branch for lowest index 0 checks through F-264's `cast` (`Library/FortressLibrary.fss:2575`).

   The rewrite rightly drops the stale "a site of the distance" clause, but now nothing points to F-264. The proposal's own meaning note says that "F-264 gives the factory's `cast`".
4. **"`__immutableFactory1` answers an `ImmutableArray1`" names the wrong change.** The repair was the factory's declared return type. Report section 1, item 2: it was "declared `ReadableArray1`", and "Both arms of its body already return an `ImmutableArray1`". "Answers" reads as the value returned at run time, which never changed. The record's earlier text said "`__immutableFactory1` declares `ImmutableArray1`" (history, 2026-10-13 18:39Z).
5. **The bound in the report differs from the bound in the entry.** The bound clause is true today: `T extends { Number, MultiplicativeRing[\T\] }` is at `FortressLibrary.fss:2547`, `:2935` and `:2943`. But the detail the entry cites, report section 1, item 1, has the rung writing `T extends Number`, "No ring bound". A reader who follows the detail finds a different bound. The entry should give the bound in a few words and leave its owner to F-151.

Everything else holds:
- the sub-array's missing `put` (`:2509-2520`);
- the `also do` blocks (`:2872-2912`);
- `TransposedMatrix`'s three bodies (`:2951-2953`);
- `SUFFIX_SUM` (`:4896`);
- row 661: NEGATIVE-VERIFIED, and its claim is the sentence's "a strided range `a:b:c` is declared `Range[\ZZ32\]`, which is no generator, so the compiled checker refuses `seq(a:b:c)`" (`Library/FortressLibrary.fsi:2412`).

### Comprehension

The cold reader's account matches the sources except where the entry is silent:
- the bound;
- the objects' names;
- the `also` block;
- what `SUFFIX_SUM` is;
- the range forms;
- the gate.

The reader also saw failure 1: "Nothing named fails if the checker stops accepting them." The reader's consequence, "write a `#` range and `.reverse`", is row 661's own workaround.

### Failures by class

- **Wording** (failures 1 and 3): replace the gate sentence with: "The distance stage shows that the checker accepts them: none of its sites is in these declarations (F-53, which lists the five). Under walk, `tests/TransposedMatrixAndFreeze.fss` checks the values of `mul`, of the factory's callers `replica` and `freeze`, of the sub-array and of the transposed arithmetic, and `tests/IntegerOrderNumerals.fss` checks `SUFFIX_SUM`'s; no test covers the bound." After the factory clause, add: "(its branch for lowest index 0 is cast to that type, F-264)".
- **Wording** (failure 2): "The same change made `String`'s `left` and `right` answer `Just(c)` (P-53, built) and `QQ`'s `ceiling` and `truncate` raise `DivisionByZero` at +∞, −∞ and 0/0, P-54's present rule; P-54's later change after the switch-over is still to build." This also removes "the same work", which the reader could not place.
- **Wording** (failure 4): "`__immutableFactory1` is declared to answer an `ImmutableArray1`".
- **Wording** (failure 5, and the reader's "which bound"): "`__DefaultVector`, `__DefaultMatrix` and `TransposedMatrix` declare the array family's bound `T extends { Number, MultiplicativeRing[\T\] }`, which F-151 owns". The reader also asked for the objects' names. `concepts.md` says that "the default vector and matrix objects (F-90)" are defined in the entry, but the entry neither names nor defines them.
- **Wording**: "the postfix operator `SUFFIX_SUM` on a `ZZ32` array (`FortressLibrary.fsi:2695`)". Optional: in `mul`, "the two calls, once a tuple typed `((), ())`, are now a parallel `do … also do … end` block, typed `()`" (report section 1, item 4). That says why the checker needed the change.
- **Concept: the parallel `do … also do … end` block.** It belongs in the `fortress-repo` core, "Parallelism and mutable state". That section lists the loop, the tuple and the arguments as parallel parts, but not this block (`Specification/basic/expressions/also.tex`, "Parallel Do Expressions"). It is missing from `concepts.md`.
- **Concept: the range forms, and which of them the checker takes as generators.** The forms are `a:b`, `a#n`, the strided `r:c` (declared `Range`, which extends no `Generator`) and `.reverse`. They belong in `references/library.md`, beside "Scalar ranges are over `ZZ32` only". They are missing from `concepts.md`.

## F-220

### Fidelity

1. **The gate fits F-228's claim, not the one F-220 keeps.** The rewrite cuts F-220 down to the checker's claim, "The compiled checker accepts `__bigOperator`'s local `body` …, so it is no error of the checker count (F-53)", but keeps "Gated under walk by `tests/UnwrittenListMapComprehensionWalk`". That test is F-228's gate, for walk's half, which has moved to F-228. Nothing fails if the checker stops accepting the line. The acceptance is shown by the distance stage and the count stage: report section 6 has "`__bigOperator`'s crash is gone" and "So `__bigOperator`'s body and the collector bring no site", and F-53 lists the count's three errors. The record's form asks, where no test checks a fact, for "the command and the output that show it". "Under walk" is honest, but the entry names no evidence for its own claim.
2. **The gloss of F-228 is narrower than F-228.** The rewrite says: "walk instantiates a big operator's static parameters from a declared type or the elements, not at `BottomType`". F-228 says: "a reduction or a comprehension that writes no static argument instantiates its big operator by the declared type of its value, else by the join of its elements' run-time types, else at its bound". The gloss drops the condition (no static argument written) and the last case (its bound). "`BottomType`" is in neither F-228 nor the skill, which says "the empty type `Bottom`".

The rest holds: the line is `body(i: I): L = r.lift((o.body)(i))` (`Library/FortressLibrary.fss:1316`), and F-53's five sites and three count errors do not include it. Leaving the merge into F-228 to the coordinator is right, since F-228 is in another chunk.

### Comprehension

- The reader asked whether "typed `body(i: I): L`" is a change, and why the checker's acceptance is worth recording. The sources answer: untyped, the line stopped the checker with "Missing parameter type for i" (report section 6, "crash gone … FortressLibrary.fss:1314:10: Missing parameter type for i").
- The reader could not tell what F-53 adds.
- The reader saw failure 1.

The rest of the reader's account matches.

### Failures by class

- **Wording** (failure 1): "The distance stage finds no error at the line, and the checker count's three errors (F-53) do not include it." Drop the walk gate from F-220. It stays with F-228.
- **Wording** (failure 2): "F-228 holds how walk runs it: a reduction or a comprehension that writes no static argument is instantiated by its value's declared type, else its elements' join, else its bound."
- **Wording** (comprehension): "`__bigOperator`'s local function `body` declares its parameter's type, `body(i: I): L`, and the compiled checker accepts the line". The old crash goes in the apply note, if anywhere.
- **Concept**: big operators and `__bigOperator`, which `concepts.md` already lists for `references/library.md`.

## F-225

### Fidelity

1. **The definition is narrower than the rule as built (an uncertain fidelity, settled).** The rewrite adds: "A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`". That is P-146's wording. The code also takes a parameter as the self parameter when its bound is a self-typed trait that the trait extends at that parameter:
   - `SelfParamDisambiguator.scala:101-108`: "a trait type D[\A_1, ..., A_m\] that the extends clause of C lists too, where D has a self parameter at position j and A_j is X_k";
   - `compiler_tests/SelfTypeMixinBound.fss`, inside the entry's own glob: `trait Sub[\T extends Shape[\T\]\] extends Shape[\T\]`, where `self` is a `T`.

   That widening is the coordinator's default, not P-146's ruling. It is in the report's header, "deviation: the self parameter is also read through a bound naming a self-typed trait that the trait extends at it (the coordinator's default)", and in review-queue item 212, "Default: as built". The record's text of 2026-10-14 06:09Z kept it: "a type parameter `X` bounded by the trait at its own parameters, or by a self-typed trait that the trait extends at `X`". Read with the narrow definition, "refuses an extender at another type" seems to refuse the team's `Containment` mixins, which the code accepts. Review-queue item 234 raises this very misreading for P-146.
2. **The distance count of 29 is not the distance's fall.** The rewrite says "when it landed it cleared 29 sites of the distance, one measurement". Report section 4 has "DISTANCE DOWN 85 -> 55 (-30)", made up of S1 29 → 0, R4 1 → 0, BR −1 and OT +1. The 29 are class S1, the self-typed bodies (section 10: "the distance stage the 29 sites"). The cold reader read "the distance dropped by 29". Stating it as one measurement is right, as the assessment asks.
3. **Row 695's condition is unclear, and its status is missing.** The rewrite says: "A compiled body that returns `self` fails verification when the parameter is an object type (row 695)". The row is about a default body that returns `self` as the trait's self-type parameter, and it "dies at class load with `VerifyError`". It is "Reached since F-225, at an object-typed `S` only". Its status is NEGATIVE-BOUNDED, an open defect, which the entry does not say.

The rest holds:
- the `comprises` condition, restored (`SelfParamDisambiguator.scala:77-83`; the team's case, `Some(comprises@_::_)`, is already at `5a68404fd`);
- the example `object Bad extends Integral[\ZZ32\]` (P-146);
- P-146's exception, `Integral`'s `numerator`;
- walk;
- rows 710 and 355, both NEGATIVE-VERIFIED.

### Comprehension

- The reader read "as also the implementing type" as the meet `C[\X\] & X`, which is right (P-146: "`self` has the type `C[\X\] & X`").
- The reader was unsure of the following:
  - "keeps the signatures plain";
  - "sites";
  - "the parameter" in row 695;
  - whether rows 710 and 355 are accepted effects or defects owed;
  - the meaning of `comprises {...}`.
- From the narrow definition, the reader concluded "A worker can rely on `self: X` inside the body of a self-typed trait". That holds, but the reader cannot know that it also holds for the mixin form.

### Failures by class

- **Uncertain fidelity, settled by the code and the review queue** (failure 1). Add: "It also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's, waiting for the curator's review (review-queue item 212)."
- **Wording** (failure 2, and the reader's "sites"): "When it landed, the distance stage's self-type class fell from 29 errors to 0 (the distance from 85 to 55), one measurement on that tree." The skill defines the distance as errors. It does not define "sites".
- **Wording** (failure 3): "A compiled default body that returns `self` dies at class load with a `VerifyError` when the trait's self-type parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]`: an open defect (row 695)."
- **Wording**:
  - "the methods' signatures keep `self` at the plain trait type `C[\X\]`" (P-146; the 06:09Z text: "each functional method's signature keeps `C[\X\]`");
  - "types `self` in the method bodies as `C[\X\] & X`";
  - "it refuses, rightly, two team declarations, each an open row: the demo `trips.fss`'s `generator` (row 710) and `PureList`'s `List` (row 355)" (both are classed "library bug").
- **Concept: a `comprises` clause that lists only `...`, an open list.** It belongs in the `fortress-repo` core, "Traits and objects, no classes", beside `comprises {A, B}`. It is missing from `concepts.md`.

## F-226

### Fidelity

The meaning is unchanged, and the new detail citations are right:
- `rung-overloading-checker/REPORT.md` section 6, "The capture", holds row 561's fix;
- `rung-checker-expected-type/REPORT.md` section 1 holds row 627's `instantiateMethodApart`. It also gives the reason for the last sentence: "The same substitution serves the method environment of a trait's body, so a call by name inside a trait that inherits the method is repaired too".

The tests exist. `InheritedMethodByNameStaticParamSameName` is a `typecheck` test, which fits a claim about the checker. "Get the same renaming" keeps "are repaired alike". `name$i` is the code's form (`STypesUtil.scala:1876`; `typechecker/OverloadingChecker.scala:224-225`).

### Comprehension

1. **"From its trait's" sends the reader to the wrong trait.** The reader read "from its trait's in the overloading check" as "apart from the static parameters of the method's trait", the declaring trait. The code renames parameters whose names are those of "the trait or object being checked", that is, the inheriting one (`typechecker/OverloadingChecker.scala:214-216`, `env.contains`). Row 561 says the same: "capture the inheriting trait's parameter of the same name". The record's text has the same wording.
2. **"Whose names the arguments mention"** is unclear. These are the static arguments that instantiate the method's declaring trait, read from the receiver's type (`STypesUtil.scala:1850-1853`: "instantiated with its declaring trait's static arguments, each of its own static parameters whose name the arguments mention renamed apart first").
3. **`name$i`**: the entry does not say what `i` is. It is the least positive integer that gives an unused name (`Iterator.from(1)…find`).
4. **`commonInheritedMethods`**: the entry gives neither its file nor its role.
5. **The final "So" has no premise in the entry.** The premise is that `commonInheritedMethods` also builds the methods that a trait's body sees.

### Failures by class

- **Wording** (1): "from the static parameters of the trait or object that inherits it, in the overloading check".
- **Wording** (2 to 5): "At a call, `commonInheritedMethods` (`scala_src/useful/STypesUtil.scala`) instantiates each method that the receiver's type inherits at the static arguments of its declaring trait. It first renames each of the method's own static parameters whose name those arguments mention to `name$i`, with `i` the least positive integer that gives an unused name; the checker's messages print that form (row 627). The same function builds the methods that a trait's body sees, so a call of an inherited method by its bare name inside a trait gets the same renaming."
- **Concept: renaming apart.** `concepts.md` already lists it for `references/compiler.md`. The reader understood it.

## F-227

### Fidelity

1. **The title is broader than the code (an uncertain fidelity, settled by reading the code).** The title is unchanged from the record: "keeps an intersection that names a type or inference variable as written". `normConjunct` asks only whether the conjunct that excludes a listed type names a variable: `excludedListed(c) = x.exists(z => getVarTypes(z).isEmpty && !hasInferenceVars(z) && dExc(z, c))` (`TypeAnalyzer.scala:767-768`). So an intersection that names a variable in one conjunct, beside a ground conjunct that excludes a listed type, still has its closed trait expanded. The report gives the narrower claim: "A bound such as `K ∩ R[\T\]` therefore stays the intersection as written" (`rung-checker-bounds/REPORT.md` section 1). The body's second sentence gives the true condition, but the title does not.
2. **The union clause hides which variable does what.** The rewrite says: "reads a variable below a union through the whole union or through its bound". In the code (`pSubInner`, `:165-180`), an inference variable below a union takes the whole union as one upper bound. A type variable below a union is tried against each member and also through its bound. The record's text of 14:58Z said so: "an inference variable below a union takes the union as one upper bound, and a type variable is also tried through its bound". The compressed clause led the reader to "It does not split the check per member", which is wrong for a type variable.
3. **The code citation sits on the wrong sentence.** "(`normConjunct` and `pSubInner` …)" follows the sentence on the expansion, but `pSubInner` holds the union cases.

The rest holds:
- the row statuses: 686, 687, 689, 690 and 711 are FIXED, 712 is NEGATIVE-VERIFIED and 713 is CONTESTED;
- row 713's unsettled Appendix I question, restored from 14:58Z;
- `XXXOverloadTwoBoundsClosedTraitExclusion` pins the refusal (`compile_err_contains=Invalid overloading of f`);
- the globs match 11 tests.

### Comprehension

1. **"Against" is ambiguous.** The reader could not tell what "only against a conjunct that names no variable" refers to. The code comment settles it: "A closed trait is replaced by the types its comprises clause lists that no other conjunct excludes, only where that conjunct names no type or inference variable" (`:763-766`).
2. **The reader generalized the call clause.** The reader's consequence was "Writing two bounds on a parameter, one of them a closed trait, now works under the checker". The exception, row 712, comes in a later sentence, without its status. Row 712 is an open defect: "implementation gap (checker)", with the workaround `h[\T\](x)`.
3. **"Such a declaration" has no antecedent.** The sentence before it speaks of a call. Row 690 and `ReturnRuleTwoBoundsClosedTrait.fss` describe the overloading: a generic declaration whose parameter has such bounds, beside a declaration on the closed trait, the generic one more specific.
4. **"Before this change"** names no change.
5. **"Closed trait"** is not defined in the skill outside the revival part.

The reader read row 713 right: a conflict, not to be "fixed" without the curator.

### Failures by class

- **Uncertain fidelity, settled by the code** (1), and **wording** (comprehension 1): "The compiled checker replaces a closed trait among an intersection's conjuncts by those of its listed types that no other conjunct excludes, only where that excluding conjunct names no type variable or inference variable (`normConjunct`), so `K ∩ R[\T\]` stays as written."
- **Wording** (2 and 3): "Below a union, an inference variable takes the whole union as one upper bound, and a type variable is tried through its bound as well as against each member (`pSubInner`, the union cases)."
- **Wording** (comprehension 2 and 3): "So a call through a parameter bounded by a closed trait and a bound that excludes one of its listed types checks, and a generic declaration so bounded, beside a declaration on the closed trait, is a valid overloading (rows 686, 687, 689, 690 and 711). A call whose argument's type only carries the parameter, `Box[\T\]`, under a ground second bound, stays refused: an open defect (row 712)."
- **Wording** (comprehension 4): "Before the checker kept such an intersection as written, it accepted, through the expansion, an overloading that it now refuses, on a question that Appendix I lists as not settled (row 713, contested; `compiler_tests/XXXOverloadTwoBoundsClosedTraitExclusion` pins the refusal)."
- **Optional**: the glob `*TwoBoundsClosedTrait` includes `XXXCallOutsideTwoBoundsClosedTrait`. That test pins a refusal that the 14:58Z text stated and the record dropped: "a call outside the bounds is refused as not applicable".
- **Concept**: a closed trait, which `concepts.md` already lists for the `fortress-repo` core. The inference variable, "the checker's placeholder for a static argument that it infers", is defined today only in the revival part (`references/revival-changes.md`), which is being replaced, so it belongs in `references/compiler.md`. The reader did not ask for it, but entry and title lean on it.

## Summary

- F-90: wording (the gate for the checker's claim; P-54 only partly built; F-264's cast and the bound named; the factory's declared type; the objects' names). Concepts: the `also` block and the range forms, both missing from `concepts.md`.
- F-220: wording (no evidence named for the checker's claim; the F-228 gloss narrower than F-228; why the typed parameter matters).
- F-225: uncertain fidelity, settled (the definition drops the mixin widening, the coordinator's default under review, item 212). Wording (the 29 against the distance's −30; row 695's condition and status; signatures; rows 710 and 355 as open rows). Concept: `comprises {...}`.
- F-226: wording ("its trait's" names the wrong trait; which arguments; `name$i`; `commonInheritedMethods`; the premise of "So"). Concept: renaming apart, already listed.
- F-227: uncertain fidelity, settled (the title broader than `excludedListed`). Wording (which variable takes which union rule; `pSubInner` misplaced; row 712 an open defect, put with the call clause; the Return Type Rule clause's antecedent; "before this change"; the XXX test's folder and assertion). Concepts: a closed trait (listed) and the inference variable.
