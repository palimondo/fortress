# Rung I: inference with coercion in the compiled checker (climb batch N, run 1)

problem: ProjectFortress/compiler_tests/NatLitArgChecker.fss:15
spec: Specification/basic/conversions-coercions.tex:472-476
precedent: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:437-452
deviation: the attempts keep an expected type only when the result converts, the attempt by subtyping counts only candidates without a coercion the call needs so that the attempt with coercion ranks every declaration applicable with coercion, a call no attempt accepts takes the first attempt holding a candidate (with the context, or for f(x) without it), the promotion chooses among named types and their coercion targets, a promoted candidate and a generic one of the coercion attempt are ranked on their declared domains, the tie check reads the specification's maximal element, and a numeral tie resolves the numeral's reading over every candidate: explorations/reviews/inference-rule-shadow/rule.patch:200
historical: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:126, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala:85, ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1073, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:81, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:101

The problem line is row 401's call `scale(Box[\3\](2), 3)`. The base refuses it: "[\nat k\](Box[\k\], ZZ32)->Box[\k\] is not applicable to an argument of type (Box[\3\], IntLiteral)" (`explorations/compile-ladder/rung-inference-checker/probes/pre-edit/NatLitArgChecker.txt:6`).
- The specification line is the coercion chapter's order of choice: a declaration applicable without coercion first, then coercion. It is read with `:417-432`, applicability with coercion by substitutability, and `:533-553`, the sets Σ and Σ′ and their most specific element.
- The inference chapter the overloading rules point to (`Specification/basic/overloading.tex:170-175`) is notes only (`Specification/basic/inference.tex:15-26`).
- The precedent line is `checkApplicableWithoutInference` building a coercion for an argument of a non-generic candidate.
- The deviation line cites the shadow's attempts (`rule.patch:200-213`).

Below, `R/` stands for `explorations/compile-ladder/rung-inference-checker/`.

This report is the first pass's, corrected by the repair round the judge ordered (`R/JUDGE.md`). Section 10 says what the repair round changed and why. Every other section states the tree as it is after it.

## 1. What changed

- The compiled checker now infers a generic's static arguments with coercion, and answer 8's promotion is its number case.
- The expected type is kept at a call written `f(x)`, with a retry without it.
- A declaration is chosen on its declared types and only then instantiated by the promotion. The declarations applicable without a coercion the call needs (Σ) are ranked first. When there is none, every declaration applicable with coercion (Σ′), generic or not, is ranked together, a generic one on its declared domain.
- A call whose Σ′ has no most specific declaration is refused, unless the tie is a numeral's. A numeral tie reads the numeral as `ZZ32` (or `ZZ64` or `ZZ` by magnitude) and resolves that reading over every candidate.

Five Scala files change, in `ProjectFortress/src/com/sun/fortress/scala_src/`: 365 lines added and 24 removed against the base.

- `typechecker/impls/Operators.scala:85`, `:90`, `:197`, `:345`: measurement D's four one-token edits. `, expected` is passed on, so a call written `f(x)` (a tight juxtaposition) is checked with the type its context expects.
- `typechecker/impls/Functionals.scala`:
  - `checkApplicable` (`:126-175`) gains two switches, `coerce` and `promote`. With either set, a generic candidate goes to the new `checkApplicableWithCoercion` (`:164-167`).
  - `checkApplicableWithCoercion` (`:280-400`) is the coercion attempt and the promotion. It is described in section 3.2.
  - `isNumeral` (`:402-406`): an expression the checker types as the numeral type. A size used as a value is typed that way too (`typechecker/staticenv/KindEnv.scala:67-68`).
  - `numeralReading` (`:408-421`): Q1's default, `ZZ32`, or `ZZ64` or `ZZ` when a numeral's value does not fit.
  - The single-argument `checkApplication` (`:557-578`) takes `fallBackWithoutContext`. The function application passes `true` (`:1000`) and the method invocation passes `false` (`:910`).
  - `checkApplication` (`:582-752`) holds:
    - the attempts;
    - the promotion of a candidate found by subtyping;
    - the ranking;
    - the ambiguity check;
    - the numeral tie (`numeralTie`, `:693-739`, nested so that it reads the candidates' declared arrows);
    - rung R's refusal, kept at `:676-686`.
  - `signalAmbiguity` (`:754-773`) is new.
- `useful/STypesUtil.scala:1064-1113`: `moreSpecificCandidate` takes each candidate's declared arrow and whether the promotion instantiated it.
  - A promoted candidate's coercions are not counted.
  - Two candidates without a counted coercion, either with a declared arrow, are compared by subtyping on declared domains.
  - Two candidates with a counted coercion are compared that way when it relates them one way, and otherwise by the coercion chapter's order on their domains.
  - Called with two arguments, it is the team's method unchanged.
- `typechecker/CoercionOracle.scala:76-84`: `moreSpecificDeclared` compares two declarations' arrows on their declared, quantified domains, through the overloading oracle.
- `typechecker/CoercionOracle.scala:132-143`: `getCoercionTargetsFrom` is the lookup from a source type to the types that declare a coercion from it, the reverse of `getCoercionsTo`.
- `typechecker/TraitTable.scala:100-103`: `coercingTraits`, the traits that declare a coercion, computed once per trait table.

Not changed:
- the solver (`typechecker/Formula.scala`);
- `compiler/StaticChecker.java`, and every other file the count and distance stages shadow;
- `Library/`, `ProjectFortress/LibraryBuiltin/`, `interpreter/` and `Specification/`;
- batch 7R's rung J's `SCaseExpr` case, which was at `:817` on the base and is at `:1111` now, since lines were added above it.

## 2. Inherited state, and the answers followed

- **The first pass** found no commits past `bce66f1fa`, a clean worktree and an empty `tmp/`, so nothing was inherited.
- **The repair round** inherited the first pass's five commits (`4dc6f90c4` to `3e3a8adbf`), the skeptic's (`13ba3f3f0`) and the judge's (`e16135bb1`).
  - It snapshotted the first pass's build and library cache (`tmp/build-r1`, `tmp/caches-r1`) before any source edit.
  - It re-ran every check it relies on against the repaired tree (sections 5 and 6).
  - It re-ran, on `tmp/build-r1`, the one first-pass capture the skeptic questioned (section 6.6).
- **The report files.** The harness refused the first pass's writes of this file and of `record.md`, and the repair round's write of this file. The repair round wrote `record.md` and carries this text in its structured result.
- **Q1** is taken at its default (1), the numeral tie rule of the conversion judgement (`explorations/reviews/conversion-overloading-judgement.md` section 4), listed for Pavol's review.
- **The count's and the distance's before.** The base has not changed under the landed gate's tables: `git log d9c62446e..bce66f1fa -- Library/ ProjectFortress/` prints nothing. So the before is `explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt` (75), `distance.txt` (626) and `distance-sites.tsv`, and no stage was run on the unchanged base (POSITIONS 2026-09-28, on rungs re-running measurements the landed gate had already taken).

## 3. The rule as built

### 3.1 Where the fix belongs

- Every application the checker resolves goes through `checkApplication`: a subscript, a method invocation, a function call and an operator (`Functionals.scala:881`, `:910`, `:1000`, `:1067` on the repaired tree). The first pass's report cited `:842` and `:1028` for the subscript and the operator, where its tree had them at `:838` and `:1024`.
- Inference by subtyping is `checkApplicableWithInference`, which calls `inferStaticParams` (`useful/STypesUtil.scala:928-947`), which calls the solver.
- The coercions for a non-generic candidate are built in `checkApplicableWithoutInference`.
- The ranking is `moreSpecificCandidate`.
- The expected type is dropped in `Operators.scala` (row 455; evidence B section 3.3).

So the rule lives beside the applicability methods and in `checkApplication`, and the solver is left alone, which is the batch's stop. The walkthrough's routing (`explorations/coordinator/map/compile-path-walkthrough.md:236-243`) puts applications, method invocations and operators in `Functionals` and juxtapositions in `Operators`, which are the two files edited.

### 3.2 The attempts, and what each one does

1. **By subtyping, with the expected type.** This is today's inference, now with the context at `f(x)` too.
   - A candidate that it instantiates with a union bound to a type parameter is instantiated again by the promotion (`:634-638`), described below.
   - A plain declaration whose arguments need a coercion is found here too, since `checkApplicableWithoutInference` builds coercions whatever the attempt (`:442-449`). It does not count toward keeping this attempt (`holds`, `:646-649`).
2. **With coercion, with the expected type.** This is `checkApplicableWithCoercion` for a generic candidate and `checkApplicableWithoutInference` for a plain one. So this attempt holds every declaration applicable with coercion, generic or not: Σ′, ranked whole. A generic candidate here carries its declared arrow (`:639`). The coercion attempt sorts a generic's parameter positions three ways.
   - A type parameter that is a position's whole type and appears in no other parameter type is *chosen*.
     - It takes the narrowest type, under the coercion chapter's no-less-specific relation (`coercions.noLessSpecific`), that each of its arguments is substitutable for and its bounds permit.
     - The types tried are its arguments' types, the types those coerce to (`getCoercionTargetsFrom`), and its declared bound when that is a plain trait type other than `Object` or `Any`.
     - "Whatever the rest fixes" is tried as well, so the context can fix it.
   - Positions whose type mentions a static parameter in structure (`Box[\T\]`) and the context constrain the solver, by subtyping as today.
   - Every argument is then admitted against the instantiated parameter type by subtyping or by a coercion, built as `checkApplicableWithoutInference` builds one.
   - When numerals alone fix a chosen parameter and no one type is narrowest, the numerals are read as `ZZ32`, or `ZZ64` or `ZZ` by magnitude. Among the instances the reading type is substitutable for, the narrowest is taken (`:384-395`). That is Q1's default inside one declaration.
   - It keeps the shadow's two limits: it refuses a call with an untyped function argument (`:303`), and a generic whose chosen parameters have more than 64 combinations of candidate types (`:356`). Section 8 gives them their homes.
3. **By subtyping without the expected type.** Only when there is an expected type.
4. **With coercion without the expected type.** Only when there is an expected type.

A plain candidate is checked once and its entry reused by every attempt, since its check does not depend on the attempt (`:626-632`).

**Which attempt is kept** (`kept`, `:650-651`).
- An attempt is kept when it holds a candidate and its most specific candidate's result converts to the expected type. An attempt by subtyping holds a candidate when it has one without a counted coercion; an attempt with coercion, when it has any.
- With no expected type, the first attempt that holds a candidate is kept.
- When no attempt is kept (`:657-663`):
  - a call written `f(x)` takes, of the attempts without the context, the first that holds a candidate, and otherwise the third;
  - any other call takes, of the attempts with the context, the first that holds a candidate, and otherwise the first.
- So a call written `f(x)` that the rule accepts without the context, but whose result the binding refuses, is reported by the binding ("Right-hand side has type ZZ64, but declared type is String."). Every other call keeps the message the base gives it.

**The promotion** (answer 8; the conversion judgement's decision 1: "the chosen declaration is then instantiated by answer 8's promotion, its coercions inserted statically").
- It applies to a candidate the first attempt found by subtyping, whose static arguments bind a chosen parameter to a union (`pick(z, l)`: `OR(ZZ32,ZZ64)`).
- The candidate is checked again by `checkApplicableWithCoercion` in promote mode. There the parameters bound to a union are chosen among named types (the arguments' types, their coercion targets, the bound), and the others keep their values.
- If one type is narrowest, the candidate is replaced by that instance: `ZZ64`, with `z` converted. Otherwise the union stays, as today.
- The promoted candidate stays in the first attempt, since its declared domain holds the arguments.

**The ranking** (the judgement's section 5, rung I: "`moreSpecificCandidate`'s coercion-first test does not count a coercion the promotion introduced; a promoted candidate is compared on its declared domain"; decision 1: specificity "taken on declared, quantified domains ... (a generic declaration fits when some instance within its bound fits)"). `checkApplication` pairs each promoted candidate, and each generic candidate of the coercion attempt, with its declared arrow, and marks the promoted ones (`Ranked`, `:617`).
- A candidate with a counted coercion ranks below one without. That is the specification's order (`conversions-coercions.tex:472-476`) and the team's test (`STypesUtil.scala:1103-1104`).
- Two candidates without a counted coercion, either carrying a declared arrow, are compared by `coercions.moreSpecificDeclared`, strictly one way. That is the overloading oracle's `lteq` (`scala_src/overloading/OverloadingOracle.scala:66-70`), the schema analyzer's `subtypeED` on existential domains.
- Two candidates with a counted coercion, either carrying a declared arrow, are compared by `moreSpecificDeclared` when it relates them one way. Otherwise they are compared by the coercion chapter's no-less-specific relation on their domains (`STypesUtil.scala:1107-1110`; the judge's decision, section 10.4).
- Otherwise the team's comparison is unchanged.

**The ambiguity check** (`:688-752`). The base had the comment "ensure that head is actually more specific." at `Functionals.scala:463`, with no code.
- The head is the one candidate no other is more specific than. That is the specification's "most specific element", "there does not exist T′ ∈ C such that T′ ≻ T" (`conversions-coercions.tex:544-547`).
- When there is more than one, the call keeps the sort's head, as today, in three cases:
  - none of the tied candidates has a counted coercion (the unconverted tie item 26 describes, which batch 7b's rung C types);
  - they all have one parameter type (Σ′ is a set of parameter types, `:536-538`, so an instance and a declaration with its domain are one element, and the call dispatches among them);
  - no candidate is maximal.
- Otherwise the tie is a numeral's when the tied candidates' parameter types differ only where the argument is a numeral (`numeralTie`). Each numeral is read as `ZZ32` (or `ZZ64` or `ZZ` by magnitude), and the call resolves as an argument of that type would, over every candidate of the kept attempt:
  - a candidate fits when every numeral's reading is substitutable for its parameter type there. At a position whose declared type is a bare type parameter of a candidate compared on its declared arrow, the reading must be substitutable for that parameter's bound;
  - of the fits, those the readings are subtypes of come first;
  - of that set, the one no other is more specific than is taken.
- Any other tie is refused: "Ambiguous coercion in call to function f: of the declarations applicable to an argument of type NOf only by coercion, none is more specific than every other: A->String; B->String." (`signalAmbiguity`; walk's own words are "Ambiguous coercion").
  - A generic declaration in the tie is listed by its declared domain, `(A, T)->String`.
  - The list's order is the candidates' order, which varies from build to build (`R/probes/ctests/diff-repair.txt`, `XXXInferAmbiguousCoercion.fss`). The tests pin the message's head.
- Rung R's refusal of an unfixed size runs first, unchanged in form (`:676-686`).

### 3.3 The decisions taken inside the rung, each with the ways not taken

1. **The attempts' order is the shadow's.** The context comes first, then coercion, then both without the context. The other order, today's inference first and the context only after it, was not built. The numerics plans' decision 3 words it this way round: "keeps the expected type at a call written `f(x)` with a retry without it".
2. **An attempt is kept only when its head's result converts to the expected type, in every attempt.**
   - The shadow kept any attempt with the context that found a candidate. That lets the context remove a generic candidate and hand the call to a less specific plain one.
   - For example, `h[\T\](x: T): T` beside `h(x: Any): Any`, with `a: ZZ64 = h(z)`, would take `h(Any)`, and the binding would refuse `Any`, where the base compiles it.
   - The probe `R/probes/CtxOverload.fss` compiles and prints `PASS` on the base, on the first pass's build and on the repaired tree (`R/probes/ctxoverload/CtxOverload.base.txt`, `.after.txt`, `.repair.txt`).
3. **An attempt by subtyping counts only the candidates without a coercion the call needs.** The first attempt is by subtyping under the expected type, so a declaration that fits the call's arguments but whose result the expected type refuses is not among its candidates. So when no candidate fits under the expected type, the attempt with coercion ranks Σ′ whole, and a declaration reached by coercion whose result fits can win over one that fits the arguments as they are: `a: V = k(NOf(1))`, with `k[\T extends N\](x: T): T` beside `k(x: V): V`, runs `k(V)` where the base and walk run the generic (`R/probes/skeptic/S2CtxConvWinsW.diff.txt:6` against `:14`, `:19`). That is new at a call written `f(x)`, and the base's behaviour at a method invocation (`R/probes/skeptic/S2CtxConvWins.diff.txt:8`, `:17`); it is a reserved stop, met (section 9), gated as `XXXInferContextKeepsFit` (row 508). This is the repair round's (section 10.1). The first pass kept the first attempt whenever it held any candidate, which split Σ′. (Corrected at the gather by the second skeptic's correction 1.)
4. **A call no attempt accepts takes the first attempt that holds a candidate.**
   - A call written `f(x)` takes it among the attempts without the context, so that a call the rule accepts is reported by the binding.
   - Every other call takes it among the attempts with the context, which keeps the base's message for them (`XXX6bu`).
   - Not taken: the first pass's fallback, the typing by subtyping without the context, which reported a call the rule accepts as not applicable (`R/probes/skeptic/SkCtxMsg.diff.txt:6`).
   - Not taken: the judge's fallback, the first of all four attempts that holds a candidate, which changed `XXX6bu`'s pinned message (section 10.3).
5. **The promotion's candidate types are named types:** the arguments' own types, the types they coerce to, and the bound. The shadow tried only the members of the union, which cannot give answer 8's `ZZ64` for `ZZ32` with `NN32`, since that is neither argument's type (shadow section 7). The lookup from a source to its targets is new, `getCoercionTargetsFrom`.
   - It lives in the coercion oracle beside `getCoercionsTo`, over the trait table's `coercingTraits`. Those are computed once per table, as the table's memos of `parents` and `excludesClause` are (`TraitTable.scala:81-97`).
   - It follows the iteration batch 7C's rung Y wrote over the same table (`typechecker/TypeHierarchyChecker.scala:277`), taking the type from `typeOfSelf` rather than from a name's text.
   - It leaves out traits and coercions with static parameters. No number type has either.
   - The alternatives were a global index built at startup, or the shadow's members of the union.
6. **The promotion runs only where subtyping bound a union,** the shadow's trigger. A binding to a named type is already the narrowest type the arguments are substitutable for whenever it is one argument's type. Running the lookup on every generic call would add subtype queries to every call, and row 488 shows that such queries can move other diagnostics.
7. **A ranked candidate carries its declared arrow, and whether it was promoted, beside the candidate in `checkApplication`, not in `AppCandidate`.** `AppCandidate` is a five-field case class matched positionally at 17 sites in four files.
8. **The declared-domain comparison is the overloading oracle's**, by subtyping on quantified domains. That is the comparison the checker's overloading rules already use for declarations (answer 9's model). Between two candidates with a counted coercion, it decides when it relates them one way, and the coercion chapter's order on the instances decides otherwise. Section 10.4 gives the judge's reasons and the ways not taken.
9. **The tie check takes the specification's maximal element.** The base's comment reads "more specific than every other". The maximal element is the definition the specification writes, and it does not refuse a chain the relation leaves non-transitive (`:493-500`). Candidates with one parameter type are one element, as Σ′ makes them.
10. **The ambiguity message is built in `Functionals.scala`,** in the form of `ApplicationError`'s description, since `OverloadingError` is sealed in `exceptions/ApplicationError.scala`, outside the rung's files. It lists a generic declaration by its declared arrow. That is the repair round's choice: the instance it would run at says less about which declarations tie.
11. **Q1's default is a reading, then a resolution.**
    - The numeral is read as `ZZ32`, or as `ZZ64` or `ZZ` by the magnitude of a numeral literal's value. A size used as a value has no value at hand and reads as `ZZ32`.
    - Then the call resolves as an argument of the reading's type would, by the coercion chapter's order over every candidate: those the reading fits without coercion first, then those it fits with coercion, and of them the most specific. The judgement's words are "the numeral is read as `ZZ32` (`ZZ64` or `ZZ` by magnitude)".
    - So `pickb(3000000000)` beside `pickb(NN32)`, `pickb(ZZ32)` and `pickb(ZZ64)` takes `pickb(ZZ64)`. This is the repair round's; the first pass chose only among the tied candidates and refused the call.
    - At a numeral position whose declared type is a bare type parameter, a reading fits a generic by the parameter's bound. The instance's type there is `IntLiteral` whenever numerals alone fix the parameter, which no reading fits (the judge's decision, section 10.4).
    - A numeral too large for every declaration is refused: `pickn(3000000000)` with only `pickn(NN32)` and `pickn(ZZ32)` (listed for Pavol).
    - The narrower way, "take the declaration whose parameter is named `ZZ32`", would not settle `f(x: ZZ64)` beside `f(x: NN64)` for `f(3)`.
    - The reading type is found by its name among the numeral type's supertypes and coercion targets. So the same code serves the compiler library (a sibling `IntLiteral`) and the one library (`IntLiteral extends ZZ32`).
12. **The promoted test of row 388 keeps its assertion and respells the body.** `gf`'s body joins its parts with `||`, which both paths print alike; the juxtaposition printed "gf got  2  and  two" compiled (row 76).
    - The changed line is `ProjectFortress/compiler_tests/CoercionGenericFnCompiledRungC.fss:20`.
    - Before: `gf[\T\](x: Wide, y: T): String = "gf got " x.big " and " y`.
    - After: `gf[\T\](x: Wide, y: T): String = "gf got " || x.big || " and " || y`.
    - The alternative, asserting the compiled spacing, would pin row 76's defect.
13. **The tests' names** start with `Infer`, since `RungI` is taken by an earlier rung's `XXXShiftDeclRungI`. The judgement's programs keep their names after the prefix, and join their strings with `||` so that their assertions do not depend on row 76.
14. **Answer 8's `ZZ32` with `NN32` gives `ZZ` under the compiler library,** its narrowest type both convert into, since its `ZZ64` declares no coercion from `NN32` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:147-149`, against `ZZ`'s `:103-108`; row 442).
    - It gives `ZZ64` under the one library (`R/probes/onelib/RuleLI.repair.L0.txt`, `pick(z, u)`).
    - The specification's answer is `ZZ64` (`Specification/basic-lib/basic-integers.tex:25`, `:36-37`). So the compiled test of it is an expected failure, `XXXInferPromoteNN32`, promoted at the switch-over (section 10.2).
    - The narrowest type that is neither argument's own is asserted green with the test's own traits: `pick(pp, qq)`, for a `P` and a `Q` that exclude each other and an `R` coercing from both, is `R,R` (`InferCoercionShapes.fss:71`).

### 3.4 Where this departs from the shadow (`explorations/reviews/inference-rule-shadow/rule.patch`)

- **Departures:** items 2, 3, 4, 5 and 7 above.
- **Four things the shadow did not build:**
  - Σ′ ranked whole;
  - the ranking of a promoted or generic candidate on its declared domain;
  - the ambiguity check;
  - Q1's default.
- **Kept as the shadow wrote them:** its `coerce` switch, its sorting of positions, its cap of 64 combinations, its refusal of an untyped function argument and its admission of arguments. The `Operators.scala` edits are its four lines.
- **A first build of the first pass,** without items 2 and 4, was run over the compiler tests (`R/probes/ctests/typecheck-shadow1.txt`). Its diagnostics equal the first pass's final build's.

## 4. The specification, and what it settles

- **The coercion chapter** settles:
  - the order of choice: "we first determine whether there exists a declaration that is applicable without coercion. If so, the most specific declaration is selected; if not, then coercions are explicitly added" (`Specification/basic/conversions-coercions.tex:472-476`);
  - applicability with coercion, by substitutability (`:417-432`);
  - that the set of parameter types applicable with coercion has one most specific element, "there does not exist T′ ∈ C such that T′ ≻ T", which the overloading restrictions are to guarantee (`:533-553`), over all declarations, generic or not;
  - that coercion is resolved statically and inserted into the call (`:598-601`).
- **The overloading chapter** infers static parameters "as described in \\chapref{type-inference} before checking the applicability" (`Specification/basic/overloading.tex:170-175`).
  - Answer 9 revises that: "inference instantiates the chosen declaration; it does not precede the comparison" (`explorations/reviews/overloading-judgement.md` section 3.4).
  - Decision 1 of the conversion judgement reads the chapter's order on "declared, quantified domains ... (a generic declaration fits when some instance within its bound fits)".
  - The converted call then dispatches at run time among the declarations applicable to it (`overloading.tex:262-276`).
- **The inference chapter is silent.** `Specification/basic/inference.tex:15-26` is a chapter note and three bullet notes. So the instantiation step, the promotion, the numeral default and the retry come from Pavol's decisions (the numerics plans, decision 3; the conversion judgement's decision 1; answer 8), not from the text. Rung T writes them into the chapter.
- **`⪯` on a domain with a static parameter in it is not defined.** `conversions-coercions.tex:486-513` define it on types, and decision 1 asks for it on domains. Section 10.4 gives the judge's decision.
- **Type parameters have no coercions.** "types named by type parameters do not have coercions" (`conversions-coercions.tex:363-365`) is kept. The rule converts an argument into an instance's parameter type, which is a named type once instantiated; it never gives a type parameter a coercion.
- **Static arguments are inferred "from the context of the function call"** (`Specification/basic/expressions/var-ref.tex:35-40`), at an argument and at a loose juxtaposition too. The faces the rule does not reach are expected failures (section 8).
- **A coercion occurs "only when the declared type of the corresponding parameter in the functional declaration is exactly the type" coerced to** (`conversions-coercions.tex:95-98`), which a generic's instantiated parameter is. So an untyped function argument beside a converted numeral, and three lone parameters beside one, are applicable with coercion (section 8).

## 5. Tests, the recorded failure and the recorded pass

The tests are in `ProjectFortress/compiler_tests/`.
- **The `.test` forms.**
  - Each three-step `.test` file drives compile, link and run with `run_out_contains=PASS`.
  - The `XXX` compile tests drive `compile` with `compile_err_contains`.
  - The `XXX` run test drives `run` with `run_out_contains=REACHED`, beside a plain link test.
- **When each was captured.**
  - The first pass captured its tests on the base before its edit (`R/probes/pre-edit/`) and on its tree after it (`R/probes/post-edit/`).
  - The repair round captured its tests on the first pass's build before its own edit was built (`R/probes/repair-pre/`), and every test on the repaired tree (`R/probes/repair-post/`).
- **How they run.** The one-file runs go through the gate's harness (`R/runtests.sh`, `FileTests.suiteFromListOfFiles` in one JVM). Each has its own copy of the library cache, built in library order by that tree's checker (`R/probes/libcache-base.txt`, `R/probes/libcache-after.txt`, `R/probes/libcache-repair.txt`: five components, rc 0 each).

| test | what it asserts | base (`R/probes/pre-edit/`) | first pass's build (`post-edit/`, `repair-pre/`) | repaired (`R/probes/repair-post/`) |
|---|---|---|---|---|
| `NatLitArgChecker` (promoted from `XXXNatLitArgChecker`, row 401) | a numeral for a declared `ZZ32` parameter of a generic, sizes and types | compile fails, 2 errors, "not applicable to an argument of type (Box[\\3\\], IntLiteral)" | PASS | PASS |
| `CoercionGenericFnCompiledRungC` (promoted, row 388's compiled half) | a `Narrow` for a declared `Wide` parameter of a generic converts | compile fails, "not applicable to an argument of type (NarrowOf, String)" | PASS | PASS |
| `InferCoercionShapes` | row 401's shape with sizes (`hd`, 128); a numeral and a `ZZ32` for a declared `ZZ64` (`scale64`); a lone parameter fixed by another argument (`scale(bL, 3)`, `scale(bL, z)`: `ZZ64`); the promotion (`pick(z, l)`, `pick(3, l)`: `ZZ64,ZZ64`; `pick(3, z)`: `ZZ32,ZZ32`); the narrowest type neither argument's own (`pick(pp, qq)`: `R,R`, `:71`); numerals alone (`IntLiteral,IntLiteral`); a bound numerals do not meet (`lohi32(2, 46)`: `ZZ32,ZZ32`); the expected type fixing a parameter (`a: BoxV[\ZZ64\] = wrapV(3)`, `a.v` a `ZZ64`; `b: BoxT[\ZZ64\] = wrapT(3)`); a numeral under an expected type (`c: ZZ64 = idt(3)`); the retry (`d: ZZ64 = fst(bz)`) | compile fails, 8 errors (the first pass's version) | PASS (the repair round's version; section 10.2) | PASS |
| `InferNumeralTie` | `pickn(3)` with `pickn(NN32)` declared first takes `pickn(ZZ32)`; `pickb(3000000000)` beside `pickb(NN32)`, `pickb(ZZ32)`, `pickb(ZZ64)` takes `pickb(ZZ64)` and `pickb(3)` takes `pickb(ZZ32)` (`:27-28`); `cast[\ZZ64\](widen(0))` and `widen(1)` in the witness `typecase`, as `WitnessIdentityRungG` wrote them before batch 6.5's repair | run fails: "NN32 =/= ZZ32" | compile fails at `pickb(3000000000)`, "Ambiguous coercion" | PASS |
| `InferSigmaWhole` (repair round) | `g(NOf(1), 5)` runs `g[\T\](x: W1, y: T)` beside `g(x: W2, y: Any)` (`:28`); `p(NOf(1), 5)` runs `p(W1, Any)`; `h(NOf(1), 3)` runs the plain `h(x: W2, y: ZZ64)` beside `h[\T\](x: W2, y: T)` (`:30`) | not run (the base runs `g(W2, Any)`, `R/probes/repair/SkSigmaMore.diff.txt:14`) | run fails: "g(W2, Any) =/= g(W1, T)" | PASS |
| `InferOpAnyZW` (the fork) | `op(z, w)` is `op generic[ZZ64,ZZ64]`; `op(z, z)` is `generic[ZZ32,ZZ32]` | "op generic[ZZ32,ZZ64] =/= op generic[ZZ64,ZZ64]" | PASS | PASS |
| `InferO2Z64` | `op(z, w)` is `plain64[ZZ64,ZZ64]`, and `O2Z64`'s four other lines | "op generic[ZZ32,ZZ64] =/= op plain64[ZZ64,ZZ64]" | PASS | PASS |
| `InferO2Num` | `op(1, w)` and `op(w, 1)` are `generic[ZZ64,ZZ64]`; `op(1, z)` is `generic[ZZ32,ZZ32]`; `op(1, 2)` is `generic[IntLiteral,IntLiteral]` | "op generic[IntLiteral,ZZ64] =/= op generic[ZZ64,ZZ64]" | PASS | PASS |
| `InferO2Meet` (guard) | `op(z, w)` is the meet, and `O2Meet`'s three other lines | PASS | PASS | PASS |
| `InferO2Pos` (guard) | `gg(5, w)` is `plain[IntLiteral,ZZ64]`; `ee(5)` is 2 | PASS | PASS | PASS |
| `InferBetweenTie` (guard, item 26) | `f(g)` for `g: G[\ZZ32\] = H`, whose static type sits between `f(S)` and `f(T)`, runs `f(V)`'s body; `f(Vo)` 3, `f(Uo)` 1 | PASS | PASS | PASS |
| `XXXInferNarrowing` (guard) | `a: BoxT[\ZZ32\] = wrapT(l)` for `l: ZZ64` is refused, "Right-hand side has type BoxT[\\ZZ64\\], but declared type is BoxT[\\ZZ32\\]." | Saw expected failure | Saw expected failure | Saw expected failure |
| `XXXInferAmbiguousCoercion` (row 391) | `f(A)`, `f(B)`, with `A` and `B` coercing from `N` and excluding each other: `f(NOf(1))` is refused, "Ambiguous coercion in call to function f" | compiles, "Saw wrong failure" | Saw expected failure | Saw expected failure |
| `XXXInferSigmaTie` (repair round, row 391) | `f[\T\](x: A, y: T)` beside `f(x: B, y: Any)`: `f(NOf(1), 5)` is refused, "Ambiguous coercion in call to function f" | not run (the base compiles it, `R/probes/repair/SkSigmaTie.diff.txt:17-19`) | compiles, "Saw wrong failure" | Saw expected failure |
| `XXXInferFallbackMessage` (repair round) | `s: String = scale64(bS, 3)` is refused by the binding, "Right-hand side has type ZZ64, but declared type is String." | not run (the base's message is the call's, `R/probes/repair/SkCtxMsg.diff.txt:19-21`) | "not applicable to an argument of type (BoxT[\\String\\], IntLiteral)", "Saw wrong failure" | Saw expected failure |
| `XXXInferPromoteNN32` with `InferPromoteNN32Link` (repair round, row 442) | `pick(z, u)` for a `ZZ32` and an `NN32` is `ZZ64,ZZ64` | not run | link OK; run REACHED, then "ZZ,ZZ =/= ZZ64,ZZ64", Saw expected failure | the same |
| `XXXInferLambdaArg` (repair round, row 401's face) | `appl(bS, fn x => x, 3)` is refused, "is not applicable to any type of the form (BoxT[\\String\\], _->_, IntLiteral)" | not run | Saw expected failure | Saw expected failure |
| `XXXInferComboCap` (repair round, row 401's face) | `g3(1, 2, 3, 4)` is refused, "is not applicable to an argument of type (IntLiteral, IntLiteral, IntLiteral, IntLiteral)" | not run | Saw expected failure | Saw expected failure |
| `XXXInferContextDrops` (repair round, row 455's faces) | `b07(): ZZ32 = takesBox64(wrapT(3))`, `b11(): ZZ32 = takesBox64(mk())` and `e: BoxV[\ZZ64\] = wrapV 3` are refused, "File XXXInferContextDrops.fss has 3 errors." | not run | Saw expected failure | Saw expected failure |

**The recorded failure** is `R/probes/pre-edit/NatLitArgChecker.txt:5-6`: the promoted row-401 test, refused at compile on the base.
- Every other first-pass test's base capture is beside it.
- The final first-pass `InferCoercionShapes.fss` was type-checked on the base's build too, and is refused there with the same 8 errors (`R/probes/pre-edit/InferCoercionShapes-final-base-typecheck.txt`).
- The repair round's recorded failures were each captured on the first pass's build, before the repair's Scala edit was built:
  - `R/probes/repair-pre/InferSigmaWhole.txt` ("g(W2, Any) =/= g(W1, T)");
  - `InferNumeralTie.txt` (the `pickb(3000000000)` refusal);
  - `XXXInferSigmaTie.txt` and `XXXInferFallbackMessage.txt` ("Saw wrong failure").

**The recorded pass** is `R/probes/repair-post/*.txt`, each run printing PASS or its expected failure, and the suite-shaped runs below.

**The suite-shaped runs.** Batch 6.5's `widen(0)` pick differed between the gate's suite and a fresh compile (`explorations/reviews/batch-6.5-review.md` finding 2), so the tie tests were also run the way the gate runs them.
- The method: the `.test` files of `R/suite-list.txt` in one JVM from a cold cache, shuffled by the harness's shuffle under a seed. The seeds were `1a0dba81ab2` hex (1790391622322), a gate seed on record at `explorations/compile-ladder/rung-walk-overflow/probes/failure-preedit.txt:24`, and the skeptic's 20260929.
- The list holds the rung's tests, `WitnessIdentityRungG`, `NatRtBigSize`, `XXXCoercionAnyOverloadRungC` and its link test, `XXXNatUnknownSizeArm`, `NatKnownSizeArm` and `XXX6bu`: nineteen files in the first pass, twenty-seven after the repair round.
- Base (`R/probes/pre-edit/suite-seed-1a0dba81ab2.txt`, the first pass's nineteen): 14 failures. `InferNumeralTie` fails in the suite as alone ("NN32 =/= ZZ32"), and `XXXInferAmbiguousCoercion` compiles ("Saw wrong failure").
- The first pass's build (`R/probes/post-edit/suite-seed-1a0dba81ab2.txt`; the skeptic's `R/probes/skeptic/suite-seed-20260929.txt`): 0 failures of 44.
- Repaired (`R/probes/repair-post/suite-seed-1a0dba81ab2.txt`, `suite-seed-20260929.txt`): 0 failures of 54 under each seed. These keep their verdicts:
  - `NatRtBigSize` (prints 2147483647);
  - `XXXCoercionAnyOverloadRungC` (REACHED, then its expected failure);
  - `XXXNatUnknownSizeArm`;
  - `XXX6bu` (its pinned message);
  - `WitnessIdentityRungG` (PASS).

**The `XXX` files shown red on a deliberate local fix.**
- The first pass's: with `f(x: N): String = "f(N)"` added to `XXXInferAmbiguousCoercion.fss` for one run and removed after it, the program compiles and the harness reports "Saw wrong failure" (`R/probes/xxx-red/XXXInferAmbiguousCoercion-deliberate-fix.txt`).
- The repair round's first `XXX` run test: with its expected string set to `"ZZ,ZZ"` for one run and restored after it, the run passes and the harness reports "Did not see expected failure" (`R/probes/xxx-red/XXXInferPromoteNN32-deliberate-fix.txt:6-8`). That is the red the gate shows the day row 442 is repaired without this test being promoted.

**The tie picks, printed.** `R/probes/TiePicks.fss` and `TiePicksNumeral.fss` print which declaration each tie takes.
- On the base, one compile: `pickn(3)` is `NN32`; `widen(0)` and `widen(1)` are `ZZ32`'s (`ZZ64`); and `f(NOf(1))` is `f(A)` (`R/probes/ties/TiePicks.base.txt`). Row 391's own capture read `f(B)`.
- After: `pickn(3)` is `ZZ32`, and `widen(0)` and `widen(1)` are `ZZ64` (`R/probes/ties/TiePicksNumeral.after.txt`). `TiePicks` itself is refused at `f(NOf(1))` (`R/probes/ties/TiePicks.after.txt`).

## 6. The measurements

Every capture's first line carries its machine: nproc 4, Intel Xeon @ 2.10 GHz, 2100 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`. Loads at start were 0.3 to 14.7, with the batch's other rungs sharing the machine. No timing here is a comparison, except section 6.7's, which was run back to back.

### 6.1 The compiler tests' diagnostics

- **The method** is measurement D's (`R/ctests.sh`): `TestsD`, `fortress typecheck`'s setting, the compiler's own library, one JVM, one private cache.
- **The files** are the distinct `.fss` files that the gate's `.test` files compile or link (`R/probes/ctests/gate-list.txt`, `gate-list.counts.txt`): 415 in the first pass, and 422 in the repair round with its seven new files. The shadow's count was 382; tests were added since.
- **The captures:**
  - the base's build: `R/probes/ctests/typecheck-base.txt`;
  - the first pass's build: `typecheck-after.txt`;
  - the repaired tree: `typecheck-repair.txt` (289 s to 357 s under load).
- **The comparisons:** `R/probes/ctests/diff.txt` (base against the first pass) and `diff-repair.txt` (the repaired tree against both).
- **Against the base**, 4 of the 415 common files differ, 493 errors to 483. Files with a non-zero code go from 243 to 241; the two that throw throw alike.
  - `NatLitArgChecker.fss`: 2 errors to 0 (row 401).
  - `CoercionGenericFnCompiledRungC.fss`: 1 to 0 (row 388).
  - `InferCoercionShapes.fss`: 8 to 0 (the rung's own).
  - `XXXInferAmbiguousCoercion.fss`: 0 to 1, the ambiguity check's refusal of the test's own call at `:24`.
- **Against the first pass's build**, the 415 common files have identical diagnostics, except for the order of `XXXInferAmbiguousCoercion`'s two tied declarations in its message. The seven new files give the errors their tests pin:
  - `XXXInferSigmaTie`: 1, the ambiguity check's second refusal in the corpus, of its own call;
  - `XXXInferFallbackMessage`, `XXXInferLambdaArg` and `XXXInferComboCap`: 1 each;
  - `XXXInferContextDrops`: 3;
  - `InferSigmaWhole` and `XXXInferPromoteNN32`: 0.
- **Every other file's diagnostics are the base's.** That includes:
  - `XXX6bu`'s pinned message (`Compiled6.bu.fss`);
  - rung R's three refusals (`XXXNatUnknownSizeArm`, `XXXNatUnknownSizeVal`, `XXXNatUnknownSizeFnValue`);
  - `XXXCoercionAnyOverloadRungC`;
  - `NatRtBigSize`.
- **Row 401's method-invocation and constructor forms** (`explorations/compile-ladder/rung-nat-checker/probes/skeptic/SrLitMeth.fss`, `SrLitCtor.fss`) go from 4 refusals to none on the first pass's build (`R/probes/row401/SrLit.base.txt`, `.after.txt`).

### 6.2 The ladder

- The 85 files of `explorations/compile-ladder/baseline-2026-09-19/pass-list.txt` went through the subset driver (`R/run-subset.sh`, `R/subset.txt`), each tree with its own library cache.
- The results are `R/probes/ladder/results-base.tsv`, `results-after.tsv` and `results-repair.tsv`, and the comparisons are `R/probes/ladder/compare.txt` and `compare-repair.txt`.
- All 85 compile and run with rc 0 on all three.
- In the repair round, the base's build and the repaired tree's ran the 85 files one after the other.
  - The base's ran through a `FORTRESS_HOME` of links whose `ProjectFortress/build` is the base's snapshot (`R/probes/ladder/run-subset-home.sh`). Its `results-base-r2.tsv` reproduces `results-base.tsv`.
  - The 170 outputs of their compiles and runs are identical, once the three `nestedTransactions` files' "Operation took <t>ms" lines are masked.
- No file moves.

### 6.3 The checker count and the distance

- **The count.** The checker-count stage on the repaired tree (`R/probes/checker-count-repair.txt`) is 75, identical line for line to `explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt`, as the first pass's was (`R/probes/checker-count-postedit.txt`). The crash row is `none`.
- **The distance.** The distance stage on the repaired tree (`R/probes/distance-repair.txt`, 1,078 s, load at start 9.77) is 626.
  - `explorations/coordinator/tools/distance/compare.sh` prints "DISTANCE SAME 626".
  - Its `#kind`, `#class`, `#total` and `#crash` rows are the landed table's.
  - The per-site list, `R/probes/distance-sites-repair.tsv`, sorted, is identical site for site and message for message to `explorations/compile-ladder/climb-batch-6.5/gate/distance-sites.tsv`, as the first pass's was (`R/probes/distance-postedit.txt`, `distance-sites-postedit.tsv`).
- Nothing moved in the BR family or anywhere else, so row 488's control was not needed. The ambiguity check and Σ′ ranked whole add no error to either table.
- **This was the expectation, by arithmetic.** Batch 7's rung B had cleared the natives and `fail` calls by a written bound, which were the shadow's whole distance effect (`explorations/reviews/inference-rule-shadow.md` section 4). And on today's one library the numeral is an `IntLiteral` below `ZZ32`, so a numeral needs no coercion there and no numeral tie arises.
- The manifest's expected checker total for this rung is 75, with the crash row `none`.

### 6.4 The one library: today's (L0) and the numeral switch's copy (A0)

- **The driver** is `R/onelib.sh`: measurement D's `ProbeD` with the fill worker's shadow `StaticChecker`, under the setting `any`, counting the program's own errors.
- **A0** is a copy of the base's `Library/` and `ProjectFortress/LibraryBuiltin/` with `explorations/compile-ladder/plan-6.5/probes/numeral/numeral-lib-A0.patch` applied, at offsets of 5 and 6 lines. `explorations/perf-probes/prelude/distance-triage/variants.py` A0 applies that patch and nothing else.
- **The comparison** by site is `R/compare-onelib.py` over `R/probes/onelib/*.txt`, whose `BASE` and `AFTER` choose the two builds. It is captured as `R/probes/onelib/compare-repair.txt` (base against the repaired tree) and `compare-after-repair.txt` (the first pass against the repaired tree).

| program | library | base sites | first pass | repaired | cleared, base to repaired | new |
|---|---|---|---|---|---|---|
| the shadow's `RuleL` | L0 | 18 | 4 | 4 | 14 | 0 |
| `RuleL` | A0 | 29 | 4 | 4 | 25 | 0 |
| `DCtx` | L0 | 12 | 3 | 3 | 9 | 0 |
| `DCtx` | A0 | 12 | not run | 3 | 9 | 0 |
| `DArg` | L0 | 2 | 1 | 1 | 1 | 0 |
| `DArg` | A0 | 3 | not run | 1 | 2 | 0 |
| `DMore` | L0 | 5 | 2 | 2 | 3 | 0 |
| `DMore` | A0 | 5 | not run | 2 | 3 | 0 |
| `OneShapeW` | L0 | 7 | 5 | 5 | 2 | 0 |
| `OneShapeW` | A0 | 36 | not run | 5 | 31 | 0 |
| `RuleLI` (this rung's) | L0 | 11 | 11 | 11 | 0 | 0 (2 respelled) |
| `RuleLI` | A0 | 13 | 11 | 11 | 8 | 6 (below) |

- **The repaired tree against the first pass.** On every program the first pass ran, the repaired tree gives its sites and messages exactly (`R/probes/onelib/compare-after-repair.txt`: no site cleared or new, no message changed).
- **`RuleL`.**
  - What stays refused on both libraries: `l#3`, `0#l` and `z:l`, ranges over `ZZ64`, a static error since batch 7R made ranges `ZZ32`-only (`Specification/basic/expressions/ranges.tex:47-48`); and `bx8`, the narrowing, with today's message.
  - On A0 the rule clears row 401's five shapes (`hd`, `uh`, `oh`, `scaleT`) and `lohi(2, 46)`, `lohi(2, z)`, `lohi32(2, 46)`, `twice(3, 4)`, `twice(l, 3)` and `twice(l, z)`. The shadow left the numerals-alone cases refused (its section 7); here Q1's default takes them at `ZZ32`.
  - It also clears `w: ZZ64 = widen(4)`, which the base refused because A0's numeral picked `NN32`'s `widen`.
- **`OneShapeW` on A0.** 27 of the 31 cleared sites are `w: ZZ64 = widen(4)`'s shape ("Right-hand side has type NN64"), now read at `ZZ32`'s `widen`. The others are two `lohi` calls and two `scale` calls.
- **`DArg`.** `a03` (`s: String = idt(3)`) stays refused with the base's message, and `a04` is accepted. On A0, `inc(5)` into `ZZ64` is accepted too.
- **`DMore`.** `d01` and `d02` are accepted; the shadow left `d02` refused.
- **`DComp`,** under the compiler library through `TestsD`: `k01` goes from "BoxT[\\BottomType\\]" to accepted with `T = ZZ64` on the first pass's build (`R/probes/dcomp/DComp.base.txt`, `.after.txt`).
- **`RuleLI`** (`R/probes/RuleLI.fss`) binds each call to an untyped local, then to a type `Seen`, so that the error names the inferred type.
  - On L0, Q1's cases keep today's answers, since `IntLiteral extends ZZ32` there. Answer 8's `pick(z, u)` goes from `OR(ZZ32,NN32)` to `ZZ64`, and `pick(3, u)` from `OR(IntLiteral,NN32)` to `ZZ64`.
  - On A0:
    - `lohi(2, 46)` and `twice(3, 4)` are `ZZ32`, and `lohi(2, 3000000000)` is `ZZ64`. All three were refused.
    - `widen(4)` is `ZZ64`, where the base had `NN64`. `pickn(3)` is `ZZ32`, where the base had `NN32`. `w: ZZ64 = widen(4)` is accepted.
    - `pick(z, u)` is `ZZ64`. `pick(3, u)` is `NN32`, since A0's `NN32` takes a numeral.
    - `z CMP 0` is refused, "Ambiguous coercion in call to operator CMP ... (StandardTotalOrder[\\ZZ32\\], ZZ32)->TotalComparison; ((ZZ64 & {Long}), ZZ64)->TotalComparison; ((RR64 & {Float, FloatLiteral, RR32}), RR64)->Comparison". It answered `TotalComparison` on the base. This is row 484's shape through the inherited `CMP`, for run 2's rung Q.
    - The six new sites are: the three reveal lines of calls now accepted, the `CMP` refusal, and the two `seq` calls the strides' refusal hid.
- **The library's two numeral strides.** `seq((|x| - 2):0:-1)` (`Library/FortressLibrary.fss:4600`) and `seq((|a| - 1):-1:-1)` (`Library/Shuffle.fss:23`) are copied as `st1` and `st2`, with `st3` the stride alone.
  - On A0 the base refuses the strided `:` ("not applicable to an argument of type (CompactFullRange[\\ZZ32\\], IntLiteral)"). The rule takes both: the range argument fixes `I` at `ZZ32` and the numeral stride converts, and `st3` is a `Range[\ZZ32\]`. On L0 both are taken already.
  - On both libraries and every build, the enclosing `seq(...)` is then refused for its own reason ("seq ... is not applicable to an argument of type Range[\\ZZ32\\]"). That site is already in the landed distance (`explorations/compile-ladder/climb-batch-6.5/gate/distance-sites.tsv:272`).
  - So rung J's device, a `ZZ32` strided form beside the generic one, is not needed for the strides.
- **MicroGPT's programs were not rerun through the checker.** The shadow's A0T2 run (ranges over `ZZ32`, then the switch) is this base's case, and found nothing refused at `#` either way.

### 6.5 The judgement's programs, compiled

These are `R/probes/judgement/<Name>.{base,after}.txt` from the first pass, and the promoted and new tests of section 5 on the repaired tree. The base's run is this rung's own, since batch 6.5's rung G changed the dispatcher after the judgement's captures.
- `OpAnyZW`'s `op(z, w)`: `generic[ ZZ32 , ZZ64 ]` becomes `generic[ ZZ64 , ZZ64 ]`.
- `O2Z64`'s `op(z, w)`: `generic[ ZZ32 , ZZ64 ]` becomes `plain64[ ZZ64 , ZZ64 ]`. On this base it no longer crashes with "Overloading instanceof match failure", as it did before rung G (`explorations/reviews/option-2-soundness/captures/O2Z64.stock.txt`); it runs the generic at the union instance instead.
- `O2Num`: `op(1, w)` and `op(w, 1)` become `generic[ ZZ64 , ZZ64 ]`, and `op(1, z)` becomes `generic[ ZZ32 , ZZ32 ]`.
- `O2Lone`'s `same(z, w)` becomes `[ ZZ64 , ZZ64 ]`.
- Unchanged:
  - `OpAnyZZ`;
  - `O2Meet` (the meet);
  - `O2Pos` (`plain`, 2);
  - `O2Tie` (`z32any`, reading A);
  - `O2Wide` (`n: Number` runs the generic at `Number`, unconverted, as the soundness note's section 2 has it);
  - the rest of `O2Lone`.
- On the repaired tree, `InferOpAnyZW`, `InferO2Z64`, `InferO2Num`, `InferO2Meet` and `InferO2Pos` pass alone and in both suite-shaped runs (section 5).

### 6.6 The solver's two behaviours, and a size used as a value

- **Where `R/probes/SolverResultOnly.fss` was run,** under the compiler library:
  - through `TestsD` (`fortress typecheck`'s phase order) on the base (`R/probes/solver/SolverResultOnly.base.txt`), on the first pass's final build (`SolverResultOnly.r1.txt`) and on the repaired tree (`SolverResultOnly.repair.txt`);
  - through `fortress compile` on the repaired tree (`SolverResultOnly.repair-compile.txt`);
  - by the skeptic, through `fortress compile` on the first pass's build and the base (`R/probes/skeptic/SkSolverCopy.diff.txt`).
- **The two behaviours.** With no expected type, `fAny[\T extends Any\]()` and `bAny[\T extends Any\]()` are refused, "Could not infer static argument T extends Any without context". `fObj[\T extends Object\]()` and `bObj[\T extends Object\]()` are accepted with `T` bound to `BottomType` (`c4` reveals `BoxT[\BottomType\]`). Every build gives this. The mechanism is `Formula.scala:492-493` against `:524`.
- **The rung changes one line, `c1`.**
  - `c1(): ZZ32 = fAny()`, refused on the base (`SolverResultOnly.base.txt:9-11`), is accepted after, with `T` bound to `BottomType`. The expected type kept at `f(x)` gives the constraint an upper bound, so it is no longer trivially true.
  - Compiled and run, the accepted call fails JVM verification at load, "java.lang.VerifyError: Bad return type", where walk prints `-1` (`R/probes/skeptic/SkBottomRun.diff.txt:4-6`, `:26`, `:38`). The repaired tree gives the same (`R/probes/repair/SkBottomRun.diff.txt`).
- **`c3` does not change.** `c3(): Seen = bAny()` reports "Could not infer static argument T extends Any without context" on the base, on the first pass's final build and on the repaired tree, under both phase orders (`SolverResultOnly.base.txt:12-14`, `SolverResultOnly.r1.txt:9-11`, `SolverResultOnly.repair.txt:9-11`, `SolverResultOnly.repair-compile.txt:9-11`).
  - Its call is a tight juxtaposition. It is typed as `S_RewriteFnApp`, through the single-argument `checkApplication` with `fallBackWithoutContext = true` (`Functionals.scala:1000`), under the context `Seen`, the declared return type.
  - No attempt holds a candidate. With the context, `BoxA[\T\]` is no subtype of `Seen`, so both attempts find `bAny` not applicable. Without it, the solver leaves `T` open under the bound `Any` (the refusal "without context"), and the coercion attempt finds it not applicable.
  - So the fallback takes the third attempt, the typing without the context, whose message is the base's.
- **The skeptic's reading of `c3`.** The first pass's `SolverResultOnly.after.txt:9-11` reads "[\T extends Any\]()->BoxA[\T\] is not applicable to an argument of type ()" for `c3`.
  - That capture was taken on an earlier build of the first pass than its final one. The final build, snapshotted as `tmp/build-r1` before the repair round touched a source, gives the base's message (`SolverResultOnly.r1.txt:9-11`), as the first pass's code reads: its fallback for a call written `f(x)` was the typing without the context.
  - So the change the skeptic read as depending on the phase order was a stale capture. On the built trees the two phase orders agree.
- **A size used as a value** (`R/probes/SizeValue.fss`; `R/probes/sizevalue/SizeValue.base.txt`, `.after.txt`):
  - `pick(n, l)`, for a size `n` and `l: ZZ64`, prints `IntLiteral,ZZ64` on the base, the size reaching the body unconverted. After, it prints `ZZ64,ZZ64`, the size converted as a numeral is.
  - `pickn(n)` prints `ZZ32` on both. The base's pick happened to be `ZZ32`'s; after, Q1's default makes it so.

### 6.7 The skeptic's programs, and the timing

`R/probes/repair/skdiff-repair.sh` is a copy of the skeptic's driver that writes to `R/probes/repair/`, so that the skeptic's captures stay as they are. It compiled and ran each of the skeptic's programs on the repaired tree and on the base's build, and ran each under walk (`R/probes/repair/<Name>.diff.txt`).

| program | repaired tree | base's build | walk |
|---|---|---|---|
| `SkSigmaMore` | `g(W1, T)`, `p(W1, Any)` | `g(W2, Any)`, `p(W1, Any)` | `g(W2, Any)`, `p(W1, Any)` |
| `SkSigmaTie` | refused, "Ambiguous coercion in call to function f: ... (B, Any)->String; (A, T)->String." | `f(B, Any)` | `f(B, Any)` |
| `SkSigmaTiePlain` | refused likewise | `f(A, Any)` | "Ambiguous coercion" |
| `SkNumeralBig` (`pickn` over `NN32`, `ZZ32` and `ZZ64`) | `ZZ64` | `NN32` | `ZZ64` |
| `SkNumeralSmall` | `ZZ32` for all five calls | `NN32`, then "Not in range for NN32: -1" | `ZZ32` for all five calls |
| `SkCtxMsg` | both lines report the binding, "Right-hand side has type ZZ64, but declared type is String." | the generic's call reported not applicable (`:19-21`) | not recorded here |
| `SkCtxForms` | only the loose juxtaposition `wrapV 3` (`:28`) refused | all five forms refused | stops at the generic method (row 21) |
| `SkPromoteForms` | `ZZ64,ZZ64` for the method, the operator and `pick(idt(z), w)`; `ZZ,ZZ,ZZ` for `pick3(z, u, w)` (row 442); `ZZ32,String` for `pick(z, "s")` | `ZZ32,ZZ64` for the first two, then `NoSuchMethodError: Union$RTTIc.factory` | not recorded here |
| `SkBottomRun` | compiles, then fails JVM verification, as on the first pass's build | refuses `c1` "without context" | `c1: -1` |

The repair round's own probe, `SigmaResultOnly` (`R/probes/repair/SigmaResultOnly.diff.txt`), is section 8, item 12.

**The timing** was run back to back on the skeptic's five files, twice (`R/probes/repair/sktime-repair.sh`, a copy of the skeptic's `sktime.sh`; `R/probes/repair/sktime.txt`). Machine: nproc 4, Intel Xeon @ 2.10 GHz, 2100 MHz, loads 2.3 to 3.1 at the starts, OpenJDK 25.0.4, `FORTRESS_THREADS=1`.

| | base's build | repaired tree |
|---|---|---|
| all five files | 70 s, 70 s | 75 s, 74 s |
| `CompilerBuiltin.fss` | 45.1 s, 46.3 s | 48.6 s, 47.6 s |
| `Compiled10.c.fss` (its refused calls try every attempt) | 0.8 s, 0.9 s | 1.6 s, 1.5 s |

The repaired tree takes about 5 percent more. The skeptic's run of the first pass's build, under loads 7.7 to 9.4, gave 97 and 99 s against 99 and 104 s (`R/probes/skeptic/sktime.txt`).

## 7. The precedent search

- **The shadow** (`explorations/reviews/inference-rule-shadow.md` section 1, `rule.patch`) is the measured way and the starting point. Section 3.4 lists where this rung departs from it.
- **The fork** (`explorations/reviews/before-n-questions.md` appendix A.1): both shadows took the plain arm for `OpAnyZW`, for the reason A.2 gives, `moreSpecificCandidate`'s coercion-first test. The ranking here is that test with the promotion's coercions left out.
- **The team's pieces used:**
  - `checkApplicableWithoutInference`'s coercion building (`Functionals.scala:437-452`);
  - `CoercionOracle.substitutableFor`, `buildCoercion`, `noLessSpecific`, `moreSpecific`;
  - the overloading oracle's `lteq` (`OverloadingOracle.scala:66-70`);
  - the trait table's memo and iteration (`TraitTable.scala:81-110`; `TypeHierarchyChecker.scala:277`);
  - the solver's own heuristic (`Formula.scala:528-541`), left as it is.
- **The count of sites on the base:**
  - one place ranks an application's candidates (`Functionals.scala:462`);
  - one comment marks where the most-specific check belonged (`:463`);
  - one other caller of the ranking (`CoercionOracle.scala:228` on the base, `:252` on the branch), left on the two-argument form, unchanged.
- **The test precedents of the repair round:**
  - an `XXX` compiled test promoted at the switch-over (`XXXShiftDeclRungI`, POSITIONS 2026-09-24, row 383);
  - an `XXX` run step with a plain link test beside it, printing `REACHED` before the assertion (`XXXCoercionAnyOverloadRungC.test` with `CoercionAnyOverloadRungCLink.test`; `XXXDispatchMethodArmRungG`, `XXXRangeEqRungJ`, `XXXNumeralPrintRungR`).
- **The peers** (the judgement's section 1):
  - Java and Scala use the expected type when inferring;
  - Julia promotes mixed numbers;
  - Haskell defaults a numeral;
  - Java, C++, Swift and Julia run a declaration that needs no conversion first.

## 8. Every defect measured, and its home

1. **Rows 401 and 388's compiled half.** Home 1, repaired: `NatLitArgChecker.fss:13-16`, `CoercionGenericFnCompiledRungC.fss:24`, `InferCoercionShapes.fss:61-65`.
2. **Row 401's two sibling faces that the coercion attempt refuses,** measured by the skeptic (`R/probes/skeptic/SkLambdaArg.diff.txt:6`, `SkComboCap.diff.txt:6`): an untyped function argument (`Functionals.scala:303`), and more than 64 combinations of chosen types (`:356`).
   - Home 2, deferred. The specification settles both as applicable with coercion (`Specification/basic/conversions-coercions.tex:95-98`, `:417-432`).
   - Each has a gated expected failure, `XXXInferLambdaArg` and `XXXInferComboCap`, and a new row (provisional 506 and 507).
   - Not repaired: the cap cannot simply be made per parameter while the context couples the chosen parameters (`:365-367`), and the lambda needs `checkApplicableWithInference`'s argument-inference loop (`:193-277`) inside the coercion attempt.
3. **Row 455.**
   - Home 1 for the faces repaired: a call written `f(x)` (`InferCoercionShapes.fss:74-82`), and the method, prefix, infix and parenthesised forms, whose numerals the context refused on the base (`R/probes/skeptic/SkCtxForms.diff.txt:4-5` against `:17-30`; `R/probes/repair/SkCtxForms.diff.txt:3-6` against `:17-30`).
   - Home 2 for the faces the rule does not reach, which the specification settles (`Specification/basic/expressions/var-ref.tex:35-40`): an enclosing call's argument (`takesBox64(wrapT(3))`, `takesBox64(mk())`) and a loose juxtaposition (`wrapV 3`). They are gated by `XXXInferContextDrops`.
   - Measurement D section 1.3's other drops (a `let` body, an `if` with no `else`, a `typecase` `else`, a `for` body) were not measured here and stay in the row.
4. **The fallback's message,** measured by the skeptic (`R/probes/skeptic/SkCtxMsg.diff.txt:6`). Home 1, repaired: `XXXInferFallbackMessage`.
5. **Σ′ split,** measured by the skeptic (`R/probes/skeptic/SkSigmaMore.diff.txt:6`, `SkSigmaTie.diff.txt:4-6`). Home 1, repaired: `InferSigmaWhole.fss:28-30` and `XXXInferSigmaTie`.
6. **Row 391.**
   - Home 1 for the call-site half, repaired both ways. The non-numeral tie is refused, among plain declarations (`XXXInferAmbiguousCoercion`) and with a generic one (`XXXInferSigmaTie`). The numeral tie is settled by the default (`InferNumeralTie.fss:26-32`).
   - The declarations half is not built and keeps the row open: the overloading rules' refusal of such sets (`Specification/advanced/overloading.tex:196-216`, `:247-273`), which belongs in `OverloadingChecker`.
7. **The numeral tie by magnitude,** measured by the skeptic (`R/probes/skeptic/SkNumeralBig.diff.txt:5`). Home 1, repaired: `InferNumeralTie.fss:27-28`.
8. **A promoted generic beside `op(ZZ64, ZZ64)`.** It crashed before rung G; on this base it ran the generic at the union instance. Home 1, repaired: `InferO2Z64.fss:17-21`. It is a new row, opened and closed (provisional 504).
9. **Answer 8's promotion and the fork.** Home 1, repaired: `InferCoercionShapes.fss:66-71`, `InferOpAnyZW.fss:17`, `InferO2Num.fss:17-19`.
10. **`ZZ32` with `NN32` giving `ZZ` under the compiler library,** from row 442's missing coercion from `NN32` into `ZZ64` (`CompilerBuiltin.fsi:147-149`).
    - Home 2. The specification gives `ZZ64` (`Specification/basic-lib/basic-integers.tex:25`, `:36-37`), so `XXXInferPromoteNN32` asserts `ZZ64,ZZ64` and fails today, shown red on a deliberate fix.
    - It is promoted at the switch-over, which closes row 442. Under the library route, the prelude takes no new declaration before it.
11. **The solver's two behaviours for a type parameter that only the result mentions.**
    - Home 3. The specification is silent: `Specification/basic/inference.tex:24-25` asks "Do we want to forbid such cases where type inference infers BottomTypes for static parameters?", and the question is Pavol's through `PLAN.md` items 18 and 20.
    - The probe is `R/probes/SolverResultOnly.fss` with its captures, and the row is new (provisional 505).
12. **A call the rule newly types with a type parameter bound to `BottomType` fails at run time.** Home 3: the same silence, row 447.
    - `c1(): ZZ32 = fAny()` compiles and fails JVM verification at load (`R/probes/skeptic/SkBottomRun.diff.txt:4-6`, `:26`, `:38`).
    - Newly reached by Σ′ ranked whole: `q[\T\](x: W1): BoxT[\T\]` beside `q(x: W2): Any`, called `q(NOf(1))`, now takes the generic, more specific by its declared domain, with `T` bound to `BottomType`. The compiled run dies loading its instance, "NoClassDefFoundError: java/lang/Object$RTTIc", where the base, the first pass and walk print `q(W2)` (`R/probes/repair/SigmaResultOnly.fss`; `R/probes/repair/SigmaResultOnly.diff.txt:6-7`, `:16`, `:23`, `:27`).
    - Both are row 447's failure modes, and both are listed for Pavol.
13. **`z CMP 0`, refused on the numeral switch's copy only.** It is not reachable in the tree until run 2's switch. It is a note on row 484, for rung Q. The check behaves as the specification asks, since no declaration is most specific.
14. **`seq` refusing a `Range[\ZZ32\]` at `FortressLibrary.fss:4600`.** It is already a site of the landed distance, and is neither new nor this rung's.

## 9. Stops met, and the divergences from walk

- **A binding chosen for a type parameter that nothing at the call fixes, other than today's.** Met on two shapes.
  - **`c1(): ZZ32 = fAny()`** (`R/probes/solver/SolverResultOnly.base.txt:9-11` against `SolverResultOnly.repair.txt`, where `c1` is gone).
    - It is the solver's own binding under a context, which it gives today at a method invocation and under any written bound.
    - Measurement D found it (FACTS, "Keeping the expected type at a call written f(x) is four one-token edits, and it clears the natives only by binding Bottom"), and decision 3 keeps the context with that on record.
    - Its cost: the compiled run fails JVM verification (`R/probes/skeptic/SkBottomRun.diff.txt:4-6`).
  - **`q(NOf(1))`** (`R/probes/repair/SigmaResultOnly.diff.txt:6-7`): a generic with a result-only parameter joins Σ′ and wins by decision 1's order, bound to `BottomType`. Its cost: the compiled run's `NoClassDefFoundError`.
  - Both are reversible, and land under POSITIONS 2026-09-27, on the stops a batch record reserves for him.
  - The alternative for both, listed for Pavol: do not take a candidate whose instance binds a type parameter nothing at the call fixes to `BottomType` where the base's typing refuses less. That restores the base's typing, and it is row 447's choice.
- **A ranking that lets a declaration needing a conversion win over one that fits the call as it is.** Met at a call written `f(x)` (added at the gather by the second skeptic's correction 1).
  - The first attempt is by subtyping under the expected type; a declaration that fits the call's arguments but whose result the expected type refuses is not among its candidates, so a declaration reached by coercion whose result fits can win.
  - `a: V = k(NOf(1))`, with `k[\T extends N\](x: T): T` beside `k(x: V): V` and `V` coercing from `N`, prints 99 on the rung's build and 1 on the base's and under walk (`R/probes/skeptic/S2CtxConvWinsW.diff.txt:6` against `:14`, `:19`). At a method invocation the base already does this (`R/probes/skeptic/S2CtxConvWins.diff.txt:8`, `:17`).
  - Gated as the expected failure `XXXInferContextKeepsFit` with `InferContextKeepsFitLink` (row 508). Reversible, and lands under POSITIONS 2026-09-27, on the stops a batch record reserves for him.
- **The standing stops the intro lifts, all met:**
  - the checker accepts calls it refuses today;
  - it refuses a call with no most specific declaration that it compiles today (`XXXInferAmbiguousCoercion`'s and `XXXInferSigmaTie`'s programs; none in the compiler tests, the count or the distance);
  - it changes the message of a call no attempt accepts (`XXXInferFallbackMessage`'s `s: String = scale64(bS, 3)`: "not applicable" on the base, the binding's message after);
  - two expected-failure tests are promoted.
- **Not met:**
  - no other compiled test's diagnostics or verdict change (section 6.1; the suite-shaped runs). The judge's fallback over all four attempts would have changed `XXX6bu`'s (section 10.3), and was not built;
  - no ladder file moves;
  - no error is added to the distance or the count;
  - within one attempt, a candidate with a counted coercion still ranks below one without: `InferO2Pos` (`gg(5, w)` stays `plain`), `R/probes/CtxOverload.fss` (`R/probes/ctxoverload/CtxOverload.repair.txt`) and `XXXCoercionAnyOverloadRungC` (its expected failure kept in both suite-shaped runs), and the attempt by subtyping is kept whenever it holds a candidate without one under the expected type. The case where the expected type leaves out a declaration that fits is the stop above (corrected at the gather);
  - no edit to the solver, `StaticChecker.java` or a shadowed file, nor to the library, walk or the specification;
  - no line of `explorations/run-c4/src/` or `explorations/apl/mg/`;
  - `NatRtBigSize` keeps its verdict. Batch 6.5b has not landed on this base, and the test's sizes used as values are read at a declared return type (`sz64[\nat k\](b): ZZ64 = k`), where no inference or tie of this rule applies.

**Walk against the compiled path** on the new tests (`R/walk.sh`, `R/probes/walk/*.walk.txt`, walk as on the base):
- **`InferOpAnyZW` and `InferO2Num`.** Walk runs the generic at `ZZ32,ZZ64`. The conversion judgement favours the compiled answer, and rung K repairs walk.
- **`InferO2Pos`.** Walk runs `gg(5, w)` on the generic arm, its numeral being a `ZZ32`. The coercion order favours the compiled answer once a numeral has its own type (`literals.tex:127-148`), and run 2's rung Q repairs walk.
- **`InferO2Z64`, `InferO2Meet` and `InferSigmaWhole`.**
  - Walk refuses each set at load; for `InferSigmaWhole`'s `h` pair it says "at least one pair of parameters must have excluding types" (`R/probes/walk/InferSigmaWhole.walk.txt`). That is batch 7b's rung W's.
  - On the skeptic's `SkSigmaMore` (`InferSigmaWhole`'s `g` and `p`, without the `h` pair), walk runs `g(W2, Any)`, since its coercion pass skips generic declarations (`R/probes/repair/SkSigmaMore.diff.txt:19`). Decision 1 favours the compiled answer, and rung K removes the skip.
- **`SkSigmaTie`.** Walk runs `f(B, Any)`; the compiled path refuses the call, as walk refuses its all-plain twin. Decision 1 and `conversions-coercions.tex:533-553` favour the refusal; this is rung K's.
- **`SigmaResultOnly`.** Walk runs `q(W2)`; the compiled path takes the generic and dies loading it. Decision 1 favours the compiled choice of declaration; the specification is silent on the binding (row 447).
- **`InferBetweenTie`.** Walk refuses the set at load. That is batch 7b's rung C's.
- **`CoercionGenericFnCompiledRungC`.** Walk says "Cannot unify NarrowOf ... with Wide". That is row 388's walk half, rung K's.
- **`InferCoercionShapes` and `XXXInferPromoteNN32`.** Walk stops at `u: NN32 = 5`, "RHS expression type Int is not assignable to LHS type NN32" (`R/probes/walk/XXXInferPromoteNN32.walk.txt`), since the one library's `NN32` takes no numeral. That is row 454's and rung Q's family.
- **`NatLitArgChecker` and `InferNumeralTie`** print PASS under walk too (`R/probes/walk/InferNumeralTie.walk.txt`).

## 10. The repair round

The skeptic refused the first pass (`R/SKEPTIC.md`), and the judge ordered a repair (`R/JUDGE.md`). This section gives what the repair round changed, by the ruling's sections, and where it departed from the judge's instructions and why. Its commits are:
- `d85223560`: the tests, captured on the first pass's build;
- `4a51a0ef4`: the edit;
- `f4dff7926`: the measurements;
- `2348ea6b1`: `record.md`.

### 10.1 The changes, by the ruling's sections

- **2.1, Σ′ ranked whole.** An attempt by subtyping is kept only when it holds a candidate without a coercion the call needs (`holds`, `Functionals.scala:646-649`). So when Σ is empty, the attempt with coercion ranks every declaration applicable with coercion, generic or not.
  - `SkSigmaMore`'s `g(NOf(1), 5)` now runs `g(W1, T)`, and `SkSigmaTie`'s `f(NOf(1), 5)` is refused as its all-plain twin is (`R/probes/repair/SkSigmaMore.diff.txt`, `SkSigmaTie.diff.txt`, `SkSigmaTiePlain.diff.txt`).
  - Asserted by `InferSigmaWhole.fss:28-29` and `XXXInferSigmaTie`.
- **2.2, a generic compared on its declared domain.** A generic candidate of the coercion attempt carries its declared arrow (`:639`). `moreSpecificCandidate` compares two converted candidates on declared domains when `lteq` relates them one way (`STypesUtil.scala:1107-1110`). The guard `h(NOf(1), 3)`, whose plain `h(W2, ZZ64)` lies below `h[\T\](W2, T)`'s declared domain, runs the plain declaration (`InferSigmaWhole.fss:30`).
- **2.3, the numeral tie over every candidate.** `numeralTie` keeps its gate over the tied candidates and chooses over every candidate of the kept attempt, the reading's own Σ first (`:693-739`). `pickb(3000000000)` takes `pickb(ZZ64)` (`InferNumeralTie.fss:27`; `R/probes/repair/SkNumeralBig.diff.txt`).
- **2.4, row 442 moved to an expected failure.** `InferCoercionShapes.fss`'s `"ZZ,ZZ"` assertion is gone. `XXXInferPromoteNN32` asserts `ZZ64,ZZ64`, and `InferCoercionShapes.fss:71` asserts, with the test's own traits, a narrowest type that is neither argument's own (section 10.2).
- **2.5, the fallback.** A call written `f(x)` that no attempt keeps takes the first attempt without the context that holds a candidate (`:657-663`). So `s: String = scale64(bS, 3)` reports the binding (`XXXInferFallbackMessage`).
- **2.6, row 401's sibling faces.** Two expected failures, `XXXInferLambdaArg` and `XXXInferComboCap`, and two rows.
- **2.7 and 2.8, rows 391 and 455 stay open.** The record says what is closed and what is not. `XXXInferContextDrops` gates row 455's faces the rule does not reach.
- **2.9, the record's corrections:**
  - `c3` (section 6.6);
  - `c1`'s `VerifyError` (sections 8 and 9);
  - the citations of section 3.1;
  - row 455's faces (section 8).

### 10.2 The new tests, before and after

Each was captured on the first pass's build before the repair's Scala edit was built (`R/probes/repair-pre/`), and on the repaired tree (`R/probes/repair-post/`). Section 5's table gives each line.
- **Red before, green after:**
  - `InferSigmaWhole` ("g(W2, Any) =/= g(W1, T)");
  - `InferNumeralTie` (compile refused at `pickb(3000000000)`);
  - `XXXInferSigmaTie` and `XXXInferFallbackMessage` ("Saw wrong failure", then "Saw expected failure").
- **Expected failures on both:**
  - `XXXInferPromoteNN32` (with `InferPromoteNN32Link` passing);
  - `XXXInferLambdaArg`;
  - `XXXInferComboCap`;
  - `XXXInferContextDrops`.
- **`InferCoercionShapes` passes on both.** The judge expected it red on the first pass's build.
  - It is not red there because its new assertion, `pick(pp, qq)` for a `P` and a `Q` with `R` coercing from both, is answered `R,R` by the first pass's promotion already.
  - Subtyping alone binds the union `OR(P,Q)`, which the base shows. The base reports "Right-hand side has type OR(P,Q)" where the first pass's build reports "has type R" (`R/probes/repair/PQRReveal.base.txt:4`, `PQRReveal.r1.txt:4`). At run time the base prints `P,Q` where the first pass's build prints `R,R` (`PQRProbe.base.txt:6`, `PQRProbe.r1.txt:6`).
  - So the promotion runs there, as the judge required, and the assertion is red on the base, not on the first pass's build.
- **`InferSigmaWhole`'s `h` guard passes on the first pass's build,** as the judge said it would. It fails if a generic's instance outranks a plain declaration below its declared domain.

### 10.3 Where the repair round departed from the judge's instructions

- **The fallback of a call other than `f(x)`.**
  - The judge's instruction took, for every call no attempt keeps, the first of the four attempts that holds a candidate.
  - Built so, it changed `XXX6bu`'s pinned message (`ProjectFortress/compiler_tests/XXX6bu.test`, `compile_err_equals`). `a2 := f.doIt(a, a)` (`ProjectFortress/compiler_tests/Compiled6.bu.fss:21`), a method invocation under the context `String`, went from "[\T extends Object\](T, T)->T is not applicable to an argument of type (ZZ32, ZZ32)." to "Could not assign an expression of type ZZ32 to variable a2 of type String." (`R/probes/repair/judge-fallback/suite-seed-1a0dba81ab2.txt:54-62`, `:158`; `R/probes/repair/judge-fallback/typecheck-repair.txt:1367-1370`).
  - That is a compiled test's verdict changing. The batch record reserves that as a stop, and names `XXX6bu` among the tests that keep their verdicts (`explorations/coordinator/CLIMB-BATCH-N.md`, rung I, "What must stay green, or keep its verdict").
  - So a call other than `f(x)` takes the first attempt with the context that holds a candidate, and otherwise the first. That keeps `XXX6bu`'s message (`R/probes/repair-post/XXX6bu.txt`), and leaves the judge's rule for `f(x)` as ordered.
- **The `XXX` run test's check key.**
  - The judge wrote `XXXInferPromoteNN32.test` with `run_out_contains=PASS`.
  - The harness fails a run test whose check key is not met, whatever the expected failure (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:534-537`, `:583-585`). So that form is red for the wrong reason, "Failed to satisfy run_out_contains" (`R/probes/repair/judge-fallback/XXXInferPromoteNN32-passkey.txt:6-9`, on the repaired tree).
  - The test instead prints `REACHED` before its assertion and checks `run_out_contains=REACHED`, as every `XXX` run test in the corpus does (`XXXCoercionAnyOverloadRungC`, `XXXDispatchMethodArmRungG`, `XXXRangeEqRungJ`, `XXXNumeralPrintRungR`).
- **The `XXX` run test is captured with its link.** A run step runs after the suite's command steps (`FileTests.java:998-1004`), so the test was captured in one JVM with `InferPromoteNN32Link`, as the gate runs it (`R/probes/repair-pre/XXXInferPromoteNN32-with-link.txt`, `R/probes/repair-post/XXXInferPromoteNN32-with-link.txt`).
- **The ambiguity message** lists a generic declaration by its declared arrow, not its instance (section 3.3, item 10).
- **A plain candidate is checked once,** and its entry reused by every attempt (`:626-632`), which the judge allowed.

### 10.4 The decisions of the ruling, with their alternatives

- **How a generic in Σ′ is compared.** This is the judge's section 3.1, a decision under a silent specification: `conversions-coercions.tex:486-513` define `⪯` on types, and decision 1 applies it to declared, quantified domains.
  - Taken, (d): the overloading oracle's `lteq` on declared domains, strictly one way, decides; otherwise the coercion chapter's `⪯` on the instances decides.
  - Not taken, (a): `⪯` on the instances alone, which lets a generic's narrow instance outrank a plain declaration below its declared domain (the `h` guard), against decision 1.
  - Not taken, (b): `lteq` alone, which loses the chapter's ranking of `ZZ32` over `ZZ64` at a position that is not a static parameter (`f[\T\](x: ZZ32, y: T)` beside `f(x: ZZ64, y: Any)`, `f(3, 5)`).
  - Not taken, (c): a full `⪯` on quantified domains. It is the principled one, but a new relation in the oracle.
  - By reading, (d) departs from (c) only where (c) ties and the instance's narrower type decides, on sets the unbuilt coercion clauses of the overloading rules refuse.
  - Listed for Pavol.
- **Where a numeral's reading fits a generic** (the judge's section 3.2). At a bare type-parameter position, it fits by the parameter's bound, not by the instance's type there, which is `IntLiteral` whenever numerals alone fix the parameter. A generic chosen this way keeps its instance: the judgement's two steps.
- **A numeral too large for every declaration** stays refused, as the decision's words give (`pickn(3000000000)` with only `pickn(NN32)` and `pickn(ZZ32)`). Listed for Pavol, with the alternative: the narrowest declaration whose type holds the value.

### 10.5 The measurements of the repair round

Section 6 gives each, on the repaired tree:
- the compiler tests' diagnostics (6.1);
- the ladder, against a base run of this round (6.2);
- the count and the distance (6.3);
- the one library, on L0 and A0 (6.4);
- the solver probe, under both phase orders (6.6);
- the skeptic's programs and the timing (6.7).

The repair round's first build, with the judge's fallback, was measured over the compiler tests and one suite-shaped run before the fallback was corrected (`R/probes/repair/judge-fallback/`). The count, the distance, the ladder and the one-library runs begun on it were stopped, and run again on the final build.

## 11. For Pavol

- Q1's default as built: the reading, then the resolution over every candidate.
- The attempts' order and the fallback, with the fallback's departures from the shadow and from the judge (sections 3.3 and 10.3).
- How a promoted candidate, and a generic one of the coercion attempt, are ranked (section 10.4, the judge's decision (d)).
- The lookup behind answer 8, with its `ZZ` and `ZZ64` answers, and `XXXInferPromoteNN32` for the switch-over.
- A numeral too large for every declaration is refused.
- The solver stop, met on two shapes, with its two run-time failures (section 9).
- Rows 391 and 455 stay open, against the batch record's "What it closes".
- The switch copy's `z CMP 0`, for rung Q.
  - The two devices: `ZZ32`'s own `CMP`, as rung M gives `MIN`, `MAX` and `MINMAX`; or an inherited functional method's `self` read at the receiver's type.
  - The shadow saw three such library sites on that copy (`FortressBuiltin.fss:488`, `FlatString.fss:74`, `:77`).
- The judgement's stock crash, gone on this base since rung G.
- The reserved stop "a ranking that lets a declaration needing a conversion win over one that fits the call as it is", met at a call written `f(x)` because the first attempt is taken under the expected type (section 9; row 508), with the alternative order of the attempts (added at the gather).

The same list with its evidence is `R/probes/for-pavol.txt`, and the stops met are `R/probes/stops-met.txt`.

## 12. What the rung did not do

- `ant testFast` and `testSystem` were not run: they are the batch's gate.
  - A compiled program that meets a numeral tie now takes the `ZZ32` declaration, and a call whose Σ is empty now ranks the generic declarations beside the plain ones.
  - No compiler test's diagnostics changed except the rung's own, but a run-time output could. The gate is that measurement.
- MicroGPT was not rerun through the checker (section 6.4).
- There is no lookup of coercion targets for traits with static parameters.
- These are gated as expected failures, not repaired:
  - the coercion attempt's refusal of an untyped function argument;
  - its combination cap;
  - the argument and loose-juxtaposition faces of row 455.

## 13. The briefing, entry by entry

Every entry was read in the first pass, and the repair round read again the entries the checks read. What was done with each:
- The numerics plans' decision 3: the attempts and the promotion (3.2, 3.3).
- The two decisions of the conversion judgement: the ranking, Σ′ ranked whole and the instantiation (3.2, 10). Decision 2 is rung M's; section 6.4's `CMP` is its shape.
- Probe K's item 9: read before the ranking. The generic runs at `ZZ64` through its stamped instance.
- Answer 8: the promotion (3.3, item 14).
- Answer 9: declared domains (3.3, item 8).
- A numeral's type: why Q1 arises, measured on A0 (6.4).
- Route A: the tower converts by `coerce`, which the lookup reads.
- The library's practice and the library route: no library edit; row 442 waits for the switch-over.
- Answer 12: rung R's refusal kept, and run first (6.1).
- A size used as a value: `isNumeral` (6.6).
- The JVM principle: the ground for the `ZZ32` default.
- On planning: probe K's result cited, not re-measured.
- Rungs re-running measurements: the landed tables are the before (2, 6.3).
- The launch of phase 3's batches: nothing re-asked.
- The stops a record reserves: the solver stop lands and is listed (9).
- Rung D's stop: applied to the ladder's timing lines, and to the order of the tied declarations in the ambiguity message (6.1, 6.2).
- The ledger rows (8):
  - rows 401, 388, 455 and 391: repaired, in part for 455 and 391;
  - rows 447, 485 and 484: notes;
  - row 390: its test keeps its verdict (5, 6.1);
  - row 488: nothing moved (6.3);
  - row 442: its expected failure.
- The judgement's sections 1, 4, 5 and 7: built as stated (3.2, 8).
- `before-n-questions` A.1 and A.2, and `option-2-soundness` sections 2 and 5: measured again on this base (6.5).
- The shadow's sections, `rule.patch` and `RuleCRun.fss`: 3.4 and 5.
- Evidence B sections 3.2 to 3.4, and measure D section 2.2: 3.1 and 6.4.
- The 6b-7 conformance review's finding 5: section 8, item 11.
- The 7R conformance review's findings 1 and 7: 6.6 and 6.4.
- Row 488's probe: 6.3.
- Batch 6.5's judge section 7, and its review's findings 2 and 7: 5 and 9.
- Item 26's judgement and `MeetViaExclusion.fss`: `InferBetweenTie`.
- The specification entries: 4.
- The code entries: 1. `KindEnv.getType` and `inferStaticParams` are unchanged.
- The two libraries' `IntLiteral`: the tests use the compiler library's, the probes the one library's.
- The two expected failures and `NatRtBigSize`: promoted, promoted and kept.
- The FACTS entries: cited where used.
- The map's walkthrough and its checker row: 3.1. What else moves was checked: the count, the distance, and the `typecheck` units through the compiler tests' diagnostics.
