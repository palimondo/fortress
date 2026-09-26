<!-- Decision brief for Pavol, written 2026-09-26 by a delegated worker session on the top tier, on his go of the same day (POSITIONS.md 2026-09-26, the S2 judgement), under the two-step rule of 2026-09-20: what the specification's examples refused by the multiple instantiation exclusion become under route A, and what the revised specification says about the rule. Evidence read in full: reviews/spec-refused-examples.md with its 24 probes and captures, coordinator/FACTS.md, coordinator/POSITIONS.md, reviews/exclusion-design-brief.md, coordinator/CLIMB-BATCH-4.md, reviews/spec-change-form.md; every specification passage and source line cited below was reopened on the tree at acb5433ca. One probe was run for this brief (a size argument in the exclusion rule); it is quoted whole in section 6 and its capture was kept out of the tree. Added on the coordinator's notice the same day: the team's later Types chapter, Documentation/Specification/Prose/Language/types.tick (Victor Luchangco, 2012-05-31, 275b90773, an unfinished restart never adopted; coordinator/spec-lineage.md), read as the team's later statement and not as the governing text; what it sharpens is in section 12. Nothing else in the tree was changed. -->

# The refused examples under route A: the judgement

## 1. The decision in plain words

- Every refused example becomes what the one library already does, and nothing new is designed. The empty list and the empty optional become one object per element type, `Empty[\T\]` and `Nothing[\T\]`, with the type argument written at each use. The covariance example becomes an explicit widening function with bounded static parameters. The trait that would be "a subtrait of every instantiation" stays in the text as the counterexample that introduces the rule. `Object` loses its two algebraic supertraits, as in the library. The internal appendix gets one sentence at each of its three passages.
- The number chapters (the tower, and `RationalQuantity`) are not written by rung S alone. They change in the same batch as the flattening rung, so that the specification and the library flip together.
- The rule is stated once, as a property of the exclusion relation: two instantiations of one generic trait exclude each other unless every static argument other than an operator argument is the same. Operator arguments do not count. Sizes and boolean arguments do, which the compiled checker does not yet do (section 6, one candidate ledger row).
- Row 331's future work, the bare `Nothing` through where clauses, is closed by route A, not postponed; a proposal for what replaces it is in section 8. Worklist item 12 loses its where-clause half.
- Every replacement chosen here runs on both paths today (captures named per example); the tower's follows the library rung.

## 2. The words used

- A **generic** is a trait with static parameters, `List[\T\]`; an **instantiation** fills them, `List[\ZZ32\]`.
- The **rule** is the type group's *multiple instantiation exclusion*: no type may be a subtype of two different instantiations of one generic (`Papers/Types/exclusion.tick:141-152`, the 2011 paper "Type Checking Modular Multiple Dispatch with Parametric Polymorphism and Multiple Inheritance", `Papers/Types/paper.tick:213`). Luchangco's later chapter shortens the name to *instantiation exclusion* (`Documentation/Specification/Prose/Language/types.tick:353-355`, "I've shortened this to instantiation exclusion"). Route A keeps it (POSITIONS 2026-09-24).
- A **where-clause variable** is a type name a `where` clause introduces that is not one of the declaration's own static parameters (`Specification/basic/trait-parameters.tex:309-316`). Written as a static argument in an `extends` clause, it means "for every `T`", so the declared type is a member of infinitely many instantiations at once. That is the rule's plainest case.
- **walk** is the interpreter; the **compiled path** is `fortress compile` then run. Only the compiled path runs the static type checker.
- A **coercion** is a conversion a trait declares from another type (`coerce(x: T)`) and the language applies unasked.
- **Captures** are the files under `explorations/reviews/spec-refused-examples/captures/`, named by probe; `X.walk.txt`, `X.compile.txt`, `X.run.txt`.

## 3. Per example

### 3.1 The where-clause section's three examples: E1, E2, E3

**What the specification says now.** `Specification/basic/trait-parameters.tex`, the section "Where Clauses". Its opening note says the syntax there "is out of date" (`:287`), and the traits chapter says where clauses "are not yet supported" (`basic/traits.tex:15-16`). Then:
- `:339-353` (E1): "Trait declarations are allowed to extend other instantiations of themselves", `trait C[\S\] extends C[\T\] where {S extends T, T extends Object}`, "we have expressed the fact that the static parameter S of C is covariant".
- `:355-381` (E2): `trait C extends D[\T\] where {T extends Object}`, "trait C is a subtrait of every instantiation of parametric trait D", followed by the paragraph on why that is dangerous: C "really contains infinitely many methods", and a call must be rejected when the intended one cannot be inferred.
- `:382-399` (E3): "Object or functional declarations may include where clauses. Here is an example declaration of an Empty list", `object Empty extends List[\T\] where {T extends Object}`.
- Beside them, Luchangco's draft note in `basic/traits.tex:174-180`: "It is possible for a trait to explicitly extend itself using hidden type variables ... But we could just rule this a special case."

**What each path does.**
- The three examples as written stop at name resolution on both paths, identically: `T is undefined` (`SpecEmpty`, `SpecSubtraitOfEvery`, `SpecCovariant`, and their `*Bound` twins in the grammar's current spelling). The type disambiguator puts only a declaration's own static parameters in scope for its extends clause (`compiler/disambiguator/TypeDisambiguator.java:86`, `:118`). The rule never runs on them; it would refuse them if it did, since the shape it refuses is measured by `DoubleInstance` (compile: "Types Plussable[\Right\] and Plussable[\Wrong\] exclude each other. Parent must not extend them."; walk runs it and prints `foo took a Plussable[Wrong]`).
- The alternatives, measured:
  - `AltEmptyParam`, the parametric `Empty[\T\]` with a factory: prints `1` and `0` on both paths.
  - `AltEmptyParamBare`, the same with the argument left to inference: refused on both (walk `InterpreterBug ... uninstantiated`; compile `T is not in the kind env`), which is FACTS's entry of 2026-09-19 on bare generic objects.
  - `AltCovariantBounded`, the widening function `widen[\T, S extends T\](c: C[\S\]): C[\T\]`: prints `dog` on both paths.
  - `AltCovariantVariance`, `trait C[\covariant S\]`: the checker accepts the binding `a: C[\Animal\] = d`, the compiled run dies with `IncompatibleClassChangeError`, walk refuses the binding.
  - `AltCovariantCoerce`, a generic `coerce[\S extends T\](c: C[\S\])`: the checker reports `Cyclic type hierarchy`, walk refuses the binding (row 389).
  - `AltEmptyBottom`, a covariant list with `Empty extends SList[\BottomType\]`: `BottomType is undefined` on both.
  - `AltEveryContra` and `AltEveryContraObject`, a contravariant `D` with `C extends D[\Any\]` or `D[\Object\]`: the code generator crashes on `Any` (`CodeGen.java:5766-5778`), or the run dies with `IncompatibleClassChangeError`; walk refuses both.

**The alternatives, the library's way first, and what each commits him to.**

E3, the empty list:
1. The library's way: `object Empty[\T\] extends CovariantCollection[\T\]` (`Library/CovariantCollection.fss:96`), `emptyList[\E\]()` (`Library/List.fsi:121`), `value object Nothing[\T\]` (`Library/FortressLibrary.fsi:864`). One object per element type, a factory where convenient, the argument written at every use. Commits him to the argument written until static-argument inference exists (`AltEmptyParamBare`), which is already his decision for `Nothing` (row 331), and to the where-clause section losing its object example, since no where clause on an object runs today (the code generator refuses any, `CodeGen.java:4088`).
2. The compiler prelude's way: a marker object and `coerce(_: Empty)` in `List[\T\]` (`Library/CompilerLibrary.fsi:223-236` for `Maybe`). Runs compiled; walk refuses it after rung C (`AltEmptyCoerce.walk.txt`, row 389). Commits him to a walk fix beyond rung C and to two names for one idea, against row 331.
3. Covariance and a bottom object, Scala's `Nil`. Dead on both paths (`AltEmptyBottom`, `AltCovariantVariance`); the FAQ says a programmer cannot write `BottomType` (`appendices/FAQ.tex:148-151`), and the team's later chapter makes that a rule of the language, `Bottom` "is also inexpressible: it cannot be written in a program" (`types.tick:191-195`). Commits him to going against the team's own design, not only to building three things.
4. Drop the example and say nothing. Commits him to a section with no object example and no reason given.

E2, a subtrait of every instantiation:
1. Keep it as the counterexample. The paragraph already explains the danger; it gains the sentence that the declaration is not allowed and why. Commits him to nothing else.
2. A contravariant `D` with `C extends D[\Any\]`. Dead on both paths. Commits him to variance at run time plus a code-generator fix.
3. Drop it. Commits him to losing the team's own best explanation of the rule's reason.

E1, covariance:
1. The library's way: parameters invariant, an explicit widening function with bounded static parameters, Maessen's `upward[\R, I extends R, T extends R\]` and `opr APPCOV[\T, A extends T, B extends T\]` (`Library/CovariantCollection.fss:14-35`). Runs on both paths. Commits him to covariance being written as a conversion, with the arguments at the call, and to the specification describing what runs.
2. The type group's late spelling, the `covariant` keyword of 2011-12 with Welterweight's Ancestors Meet Rule (`Papers/Welterweight/static.tick:83-89`) and Naden's covariant exclusion (`Papers/Types/journal/justificationOfRTR.tex:499-566`); Luchangco's later chapter has the prose for it, the `covariant` modifier and its subtyping rule (`types.tick:320-339`) and the exclusion rule between instantiations with covariant parameters (`:355-360`). The checker alone knows it; the compiled run dies; walk refuses. Commits him to grammar and prose for a construct that runs nowhere, exactly the open discrepancy his requirement of 2026-09-24 forbids, until variance is built into both paths.
3. The coercion chapter's spelling, `coerce[\S extends T\](x: C[\S\])`. Refused by the checker's name-only cycle check and by walk (row 389). Commits him to two fixes and to the where-clause guard the specification's own example uses (section 9, candidate row 2).

**Judgement.**
- E3: the library's way (option 1), with the original declaration kept in the text as "Not allowed", in the specification's own form for a refused declaration (`basic/traits.tex:286-292`, `(* Not allowed! *) trait InclusiveMolecule extends { InorganicMolecule, OrganicMolecule }`). The replacement `object Empty[\T\] extends List[\T\]` is shown beside it. This is the library's practice (POSITIONS 2026-09-19), it runs on both paths, and it is the same choice he made for `Nothing` (row 331), so the language chapter and the library chapter agree.
- E2: the counterexample (option 1). The paragraph is the team's own statement of the rule's reason, written before the rule existed; it becomes the text that introduces the rule (section 5).
- E1: the library's way (option 1). The original is shown as "Not allowed" and the widening function as the way. The `covariant` keyword goes into the decision record as the type group's late, unfinished direction and the road by which declaration-site variance can return, not into the normative text; the record can now quote the team's own prose for that road (`types.tick:320-339`, `:355-360`) instead of deriving it. The reason: his principle of 2026-09-23 ranks the group's late positions above the early text, and the late position is declaration-site variance; but his requirement of 2026-09-24 forbids a specified construct that runs on neither path, and variance is measured absent at run time on both. The two principles meet only on the widening function, which is also the library's.
- Luchangco's note in `basic/traits.tex:174-180` asked for exactly this ruling ("we could just rule this a special case"); the revision answers it.

### 3.2 The library chapter's `Nothing`: E4

**What the specification says now.** `Specification/basic-lib/convenience.tex:37-53`: `trait Maybe[\T\] comprises { Nothing, Just[\T\] }`, `object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}`, `object Just[\T\](just: T) extends Maybe[\T\]`. The bare uses: `getter message(): Maybe[\String\] = Nothing` and `getter chain(): Maybe[\Exception\] = Nothing` (`basic/exceptions.tex:110-129`), and the prose in `basic-lib/exception.tex:22-23`.

**What each path does.**
- Verbatim, a syntax error on both paths at `excludes` (`SpecNothing`, `SpecNothingBound`): the specification's own grammar gives an object no excludes clause (`basic/objects.tex:84-86`; `basic/types-vals-vars.tex:221-224`, "Object declarations do not include excludes clauses, but an object trait type cannot be extended. Thus, an object trait type excludes any type that is not its supertype"). So the `excludes` is redundant by the specification's own rule and ill-formed by its grammar.
- Without it, `T is undefined` on both paths (`SpecNothingNoExcludes`), the same mechanism as E3 (FACTS, the entry on `Nothing`, corrected 2026-09-26).
- The library's shape, `value object Nothing[\T\] extends Maybe[\T\]` (`Library/FortressLibrary.fss:1348`, under the comment "Obviously ought to be a non-parametric singleton when we get where clauses working", `:1346-1347`), runs on both paths; it is the corpus's spelling in 22 test files (row 331).
- The marker plus coercion, `value object Nothing end` with `coerce(_: Nothing)` in `Maybe[\T\]` (`Library/CompilerLibrary.fsi:223-236`; `Option`/`None` in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:680-691`): runs compiled (`AltEmptyCoerce.run.txt` prints `1` and `0`; gated by `library_tests/MaybeRungM.fss:15`), refused by walk after rung C (`AltEmptyCoerce.walk.txt`, row 389).

**The alternatives.**
1. The library's way: write `value object Nothing[\T\] extends Maybe[\T\]` into `convenience.tex`, drop the `excludes` clause, keep `Maybe[\T\] comprises { Nothing[\T\], Just[\T\] }`, and spell the two defaults `Nothing[\String\]` and `Nothing[\Exception\]`. Commits him to explicit arguments in the prose until inference exists, and to nothing he has not already decided (row 331).
2. The marker plus coercion. Commits him to reopening row 331 (the marker takes the name, so `Nothing[\ZZ32\]` becomes a static error, as rung M showed) and to fixing row 389 under walk.

**Judgement.** Option 1. Row 331 is a closed decision and is not revisited; this is the specification brought to it. The `excludes` clause goes for its own reason (the grammar), which the record states separately from the rule. What route A adds is in section 8: the future work row 331 named is closed, and a different road is proposed.

### 3.3 The number chapters: E5 the tower, E6 `RationalQuantity`

**What the specification says now.**
- `basic-lib/basic-integers.tex:28-29`: ℤ "is a subtype of ℚ and ℤ*"; `:30-63` the twelve sign-refined and extended integer types, each "a subtype of" the rational one above it; `:82-84`: "Future versions of this specification will include the exact details of how all this is implemented"; `:86-97` and `:194-` the header `trait ZZ extends { QQ, ZZ_star, IntegerLike[\ZZ\], CommutativeRing[\ZZ,+,-,juxtaposition\], ... }`.
- `basic-lib/numbers.tex:36-37`: ℚ "is a subtype of ℝ and ℚ*"; `:38-90` the rational refinements; `:107-113` and `:176-` the header `trait QQ extends { RR, QQ_star, Field[\QQ,QQ_NE,+,-,DOT,/\], ... }`.
- `advanced-lib/numbers-advanced.tex:15-59`: ℚ and its refinements are `type` aliases of one trait `RationalQuantity[\unit U, bool ninf, bool lt, bool eq, bool gt, bool pinf, bool nan\]`; `:71-260` the trait, whose extends clause opens with `RationalQuantity[\U, ninf', lt', eq', gt', pinf', nan'\] where { bool ninf', ..., ninf -> ninf', ... }` (`:74-76`), E1's idiom over boolean parameters, so that ℚ> is a subtype of ℚ≥ and of ℚ.

**What each path does.**
- The tower's shape: `NestedTower` (a self-typed algebra carried at `QQx` and, through it, at `ZZx`): walk runs it; the checker refuses it with five errors, "Type ZZx excludes QQx but it extends QQx" among them. This is the 61 errors at 23 library declarations of FACTS's entry of 2026-09-22, and the tower route A flattens.
- `RationalQuantity` runs nowhere, and not first because of the rule: the where-clause variables are unbound (E1's mechanism); `type` aliases are refused on both paths (`IndexBuilder.scala:187-189`, FACTS, the territory map); a `bool` static parameter is refused by name on the compiled path since rung N (FACTS 2026-09-26). The library never had the trait (no `RationalQuantity` under `Library/` or `LibraryBuiltin/`). Whether the checker's rule would compare its boolean arguments is section 6.

**The alternatives.**
1. Rewrite the chapters to the flat library once the flattening rung lands: the number-to-number supertype (`QQ` in ℤ's extends, `RR` in ℚ's) becomes a `coerce` on the wider type, and the "is a subtype of" sentences say "converts to". Commits him to the tower chapters landing with the library rung, and to the original text preserved as route C's (POSITIONS 2026-09-24).
2. Write them in rung S now, to the decided principle, before the flat headers exist. Commits him to a specification that says "coercion" while the shipped library still nests, for as long as the flattening has not landed, and to a second pass to match the landed headers.

**Judgement.** The tower passages land in the same batch as the flattening rung, whichever batch that is, and never earlier. If rung S runs in a batch that has no flattening rung, it leaves `basic-integers.tex`, `numbers.tex` and `numbers-advanced.tex` untouched and says so in its list. If both are in one batch, S writes the tower's sentences to the decided principle (ℤ inside ℚ inside ℝ by coercion, the specification's own mechanism between machine widths, `basic/conversions-coercions.tex:61-66`), and the gather checks the specification's headers against the landed library before the fold. The reason is his requirement of no open discrepancy: a specification that runs ahead of the library is one, the same as one that lags it. This narrows rung S as he assigned it on 2026-09-24 ("the specification is revised in a rung of batch 4"); it is his to accept (section 11).

For E6 in particular: the self-extension clause at `numbers-advanced.tex:74-76` is refused under route A by the same road as E1 (a where-clause variable as a static argument in an extends clause), and the chapter says so when the tower chapters are rewritten. Whether `RationalQuantity` survives at all as the specification's design for sign-refined rationals is a library design question the flattening rung meets and route A does not decide (section 11).

### 3.4 The root's algebra: E7

**What the specification says now.** `basic-lib/objects.tex:134-140`: `trait Object extends { Any, EquivalenceRelation[\Object,===\], IdentityOperator[\Object\] } excludes { Tuple }`, with the prose that `Object` "uses algebraic constraints to describe the properties of the existing operators more abstractly". `Tuple` has the same clause at `:149-156`. The algebra chapter makes every commutative algebraic type an `EquivalenceRelation[\T,=\]` (`advanced-lib/algebraic-constraints.tex:666-667`, `Commutative` extends it; `:1378-1380`, `:1580-1584`, the chain from `CommutativeRing`). Every trait but `Any` and `Object` extends `Object` implicitly (`basic/traits.tex:181-183`). So ℤ is an `EquivalenceRelation` at `Object` and at ℤ, and so is every user type that takes any of the chapter's algebraic traits.

**What each path does.** The shape is `NestedTower`'s (walk runs it, the checker refuses it), and the code says why: `checkP` (`scala_src/types/TypeAnalyzer.scala:457-467`) makes two instantiations of one generic exclude each other when a pair of their type arguments differ, and `Object` differs from ℤ. Not run as its own probe; the inference is one step from the measured shape and the read code.

**The alternatives.**
1. The library's way: `trait Object extends Any` alone (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32`), identity as a top-level `opr SEQV(a: Any, b: Any): Boolean` (`Library/FortressLibrary.fsi:2474`), equality by the self-typed `Equality[\T\]` on the types that want it (`FortressLibrary.fsi:73`). Commits him to the root chapter describing `===` as an operator on `Any` and losing its algebraic description.
2. Keep the clause and make the algebra chapter's `EquivalenceRelation[\T,=\]` something other than an instantiation of the same generic. Commits him to redesigning the algebra chapter, which route A does not ask.

**Judgement.** Option 1. `Tuple`'s clause (`:149-156`) is not refused by the rule, since no tuple type extends a trait, but its prose leans on `Object`'s ("As with the type Object, the type Tuple uses algebraic constraints to describe its existing methods"), so the rung rewrites both together; that is the rung's call, not a decision.

### 3.5 The internal appendix: E8, E9, E10

**What the specification says now.** `appendices/internal-document.tex`, printed in the default (draft) build only: `:305-362` "Disjunctive Constraints", a program offered as one "that will only typecheck correctly if the fortress typechecker supports these disjunctions", whose premise is `object Parent extends {Plussable[\Right\], Plussable[\Wrong\]}`; `:363-417` "Weirdness with Multiple Inheritance and Polymorphism", `badChild extends { Parent[\ZZ32\], Parent[\String\] }`, the team's own sight of the problem; `:483-512` "Conditional Subtyping", the internal copy of E6. Also `appendices/future.tex:127-146`, Maessen's remark that "stuff like Empty" spoils binding a type variable in a `typecase`.

**What each path does.** E8's premise is `DoubleInstance`: refused compiled, run by walk.

**Judgement.** One sentence at each: E8's premise is refused under the rule, so the disjunction question does not arise for this program; E9 is the case the rule answers, with a pointer to the rule's statement; E10 is refused as E6 is. Maessen's remark stays as it is; it is history and already says what the rule later settled. Non-normative, three sentences, no alternative worth a line.

## 4. Operator arguments, and the instantiations that differ only in them

- The specification's algebra needs one type to be several instantiations of one generic that differ only in an operator argument: `Boolean` extends eight `BooleanAlgebra[\Boolean,...\]` (`basic-lib/booleans.tex:18-36`); ℤ six `CommutativeRing[\ZZ,...\]`; a ring is a `Monoid` at `+` and at `TIMES`. If operator arguments counted, the algebra chapter could not be written, and route A never decided that.
- The specification makes an operator argument a name: the subtrait "inherits methods whose names are the actual operator names instead of the operator parameter names", and any declarations of the actual operator "are irrelevant to the behavior of the operator parameter" (`basic/trait-parameters.tex:224-229`).
- The rule's reason needs the run time to tell instantiations apart: a specialised generic overload picked by the value's type for a caller promised another instantiation. On both paths an operator argument is a compile-time name, its descriptor slot is null, and "no site on either path dispatches on, compares or type-tests an operator argument" (FACTS 2026-09-24, `perf-probes/nat/opr-kind-history.md`). So the unsoundness the rule guards against cannot arise from operator arguments.
- The checker agrees: `checkP` compares type arguments and returns "no exclusion" for any other kind of argument (`TypeAnalyzer.scala:460-463`, `//Todo: Handle int, nat, bool args`, `case _ => pFalse()`). The compiled path refuses `OprInstancesOplus` for an unrelated reason, the same one that refuses a single instantiation (`OprSingle`: "The inherited abstract method ODOT ... has no concrete implementation"); walk runs both (`7`, `12`).

**Judgement.** Operator arguments do not make two instantiations distinct for the rule, and the revised specification says so in the rule's sentence. This agrees with the gatherer's reading, on the grounds above rather than on the implementation alone. The team's later chapter leaves the question where it was: its sentence makes instantiations exclude when the arguments of a non-covariant parameter "are not type equivalent" (`types.tick:357-360`), a relation it defines for types and not for operators, and the restart has no algebra chapter to test the sentence against.

## 5. Where the revised specification states the rule

- Once, as a property of the exclusion relation, in `basic/types-vals-vars.tex` beside the other properties (`:210-216`, the excludes clause, arrow and tuple types, `()` and `BottomType`): two instantiations of one generic trait exclude each other unless every static argument other than an operator argument is the same. The name: "instantiation exclusion", the team's later short form, with "multiple instantiation exclusion" and the 2011 paper cited. The section already says the relations "are the smallest ones that satisfy all the properties given in those sections" (`:187-189`), so the new property slots in without changing the definition's form.
- This is where the team put it themselves. Luchangco's later chapter states instantiation exclusion in exactly this place, as which instantiations exclude each other (`types.tick:355-360`), and his note beside it says the section "should say only which instantiations exclude each other, as it does", while the rule proper "is a rule applied to trait declarations" (`:361-376`). The revised text takes that two-part form in his words, restricted to invariant parameters: in the types chapter, the exclusion between instantiations; in the traits chapter, the rule on declarations.
- The declaration rule in his stronger form (`:364-368`): a trait that extends two instantiations of a generic type, directly or indirectly, must extend an expressible instantiation that is a subtype of both. With every parameter invariant, no instantiation is below two different ones, so it reads: a trait or object may not extend two different instantiations of one generic, directly or through its supertraits. That sentence goes into `basic/traits.tex` beside the `InclusiveMolecule` example (`:286-292`), and the checker's message "Parent must not extend them" is that rule.
- Its consequences then follow from sentences the specification already has: no value has a type below two excluding types (`:140-143`); a declaration may not extend two excluding types (`basic/traits.tex:286-292`).
- The where-clause section (`trait-parameters.tex`) states the consequence for where-clause variables in one sentence, a where-clause variable may not appear as a static argument in an `extends` clause, with E1, E2 and E3 as its three "Not allowed" examples and the widening function and `Empty[\T\]` as the ways. Luchangco's note at `basic/traits.tex:174-180` is answered there, by a cross-reference or by replacing the note.
- Whatever S1 decides about the form of a change (`reviews/spec-change-form.md`), the rule's sentence and the counterexamples are body text; the original wording of each example and route C go where S1 puts them. That is the only place S1 and S2 meet.

## 6. Sizes and boolean arguments: one probe

The papers define the rule over "distinct applications of a type constructor" (`exclusion.tick:143-144`), which counts every static argument. Design B, his decision of 2026-09-24, gives a size a run-time descriptor and dispatch tells `Vec[\3\]` from `Vec[\4\]` (FACTS, the size probes entry). So a value that is both would let a size-specialised overload be picked for a caller promised the other size, the rule's own kind of hole. The checker does not compare sizes in the rule (`case _ => pFalse()`). The probe, run for this brief through a copy of `spec-refused-examples/run.sh` pointed at the session's scratchpad, so that nothing was written under the tree:

```
component JSizeDouble
export Executable
trait Vec[\nat n\]
end
object V extends { Vec[\3\], Vec[\4\] }
end
f(x: Vec[\3\]): String = "f took a Vec[3]"
run():() = do
  v: V = V
  println(f(v))
end
end
```

- walk: `f took a Vec[3]`, rc 0.
- compile: no hierarchy error; the checker passed the declaration, and the compile then died in code generation at `CodeGen.java:5793`, `CompilerError: Only emitting RTTI for types right now`, the size-in-extends site the run-time size rung already owns (FACTS 2026-09-26, rung N, `XXXNatOverrideChecker`).

**Judgement.** The rule counts sizes and boolean arguments; the checker's `pFalse` for them is a defect against the rule as stated, and a candidate ledger row (section 9). The team's later sentence reads the same way, since a size parameter is a non-covariant parameter and `3` and `4` are not the same argument (`types.tick:357-360`), with the caveat of section 4 that its "type equivalent" is defined for types. Its repair is a few lines at `checkP` with a gated expected-failure compile test, and its natural home is the run-time size rung's gather, where sizes get their run-time identity. This differs from the gatherer, who would have the specification say "type arguments only, as the implementation does".

## 7. What rung S writes in batch 5, and what waits

Writes now:
- The rule's sentence in `basic/types-vals-vars.tex` and the where-clause consequence in `basic/trait-parameters.tex`, with E1, E2, E3 as "Not allowed" and their replacements; Luchangco's note answered (`basic/traits.tex:174-180`).
- `basic-lib/convenience.tex`: `Nothing[\T\]`, no `excludes`; `basic/exceptions.tex:110-129` and `basic-lib/exception.tex:22-23`: `Nothing[\String\]`, `Nothing[\Exception\]`.
- `basic-lib/objects.tex:134-140` and `:149-156`: `Object` (and `Tuple`) without the algebraic supertraits, `===` described as an operator on `Any`.
- `appendices/internal-document.tex`: the three sentences.
- The decision record and the change entries in whatever form S1 gives them, with the original text of every passage above, the reasoning, and route C, which rescues none of these (FACTS 2026-09-24, the route C experiment: `Empty extends List[\T\]` stays illegal under C too; only the tower and the root's algebra would read differently).

Waits for the flattening rung, and lands in its batch:
- `basic-lib/basic-integers.tex:28-63`, `:86-97`, `:194-`; `basic-lib/numbers.tex:36-90`, `:107-113`, `:176-`; `advanced-lib/numbers-advanced.tex` whole. Rung S's list names them as deferred with this reason. The record's route C text for the tower is these passages' original wording, preserved either way.

Nothing else in `Specification/` is on the refused list: the gatherer scanned every `extends` and `where` clause and the runnable examples under `SpecData/examples/`, none of which is refused.

## 8. Row 331 and worklist item 12 under route A: a proposal

Row 331 (the empty case of `Maybe`; decided 2026-09-21: `Nothing[\T\]` stays, the bare `Nothing` is "future work gated on where clauses binding a type variable in an extends clause"). Proposed appendix to the row:
- Route A closes the gate, it does not postpone it: a bound `T` in `Nothing`'s extends clause makes `Nothing` a subtype of every `Maybe[\T\]`, which the rule refuses (`SpecNothingNoExcludes` for where it stops today, `DoubleInstance` for the rule on two instantiations). The specification is revised to `Nothing[\T\]` (rung S).
- If a bare `Nothing` is ever wanted again, two roads remain, and the record names them:
  - Inference of a generic object's static argument from the expected type, so that `= Nothing` where a `Maybe[\String\]` is expected means `Nothing[\String\]`. It keeps one spelling and touches no rule. It is the checker's own `TODO: handle missing static args` (`scala_src/typechecker/impls/Misc.scala:639-640`; FACTS 2026-09-19) and walk's `uninstantiated` failure; the specification's inference chapter is a stub (row 21).
  - A marker object with a coercion, the compiler prelude's shape. It needs a second name and reopens this row's choice; walk needs row 389 fixed.
- Proposal: the row's future work is re-gated on the first road, and stays "not attempted". His to accept or to leave the bare spelling closed.

Worklist item 12, "Implement declaration-site covariance (bind where-clause variables in `extends`)", closing rows 17, 20 and most of 21's load (`fortress-gap-ledger.md:618`). Proposed:
- The parenthesis is closed by route A; binding a where-clause variable in an extends clause is refused by design.
- What the item can still mean is declaration-site variance by the 2012 `covariant`/`contravariant` modifiers, carried to run time on both paths (the code generator giving an instantiation the interfaces of its supertype instantiations; walk's subtyping reading variance), with the covariant form of the rule (Naden's second restriction on crossed instantiations, `justificationOfRTR.tex:540-566`; Luchangco's prose for the modifier and the covariant exclusion, `types.tick:320-339`, `:355-368`). Not on the path to microGPT.
- Row 17 (the covariance idiom rejected with `T is undefined`) closes when rung S lands, as refused by design; its evidence stands. Rows 20 and 21 are inference rows and stay open under whatever item holds inference; variance would only reduce their symptom load.

## 9. The candidate ledger rows

1. **Variance is accepted by the compiled checker and carried to run time by neither path** (`AltCovariantVariance`, `AltEveryContraObject`). A real defect and a soundness hole: a program the checker accepts dies with `IncompatibleClassChangeError`; walk refuses the binding. Not against the specification, which will state invariance; against the type group's late design (the keyword of `26718e298`, the subtyping of `20a8febe9`, the tests of `1dc6cb3bf`). Home 2, the two-file expected-failure shape in `compiler_tests/` (link plus run) and an `XXX` walk test. Yes to the row.
2. **The checker's acyclicity check reads a coercion's source by trait name, so a coercion between two instantiations of one generic reads as a cycle** (`AltCovariantCoerce`; `scala_src/typechecker/TypeHierarchyChecker.scala:113-116`, with the team's `TODO: Extend to handle non-empty where clauses` at `:124`). Real by reading, with a correction to the gatherer's framing: the probe's unguarded `coerce[\S extends T\](c: C[\S\])` admits `S = T`, a coercion of a type from itself, which the specification forbids on its own (`basic/conversions-coercions.tex:609-613`, a type may not define a coercion from any of its subtypes). The specification's `Vector` example (`:213-216`) excludes that instance by its guard `where {T widens or coerces S}`, a where-clause constraint no path implements. So the row's claim is: the guarded example cannot be written, and the name-only check would refuse it if it could. Kind: implementation gap (where-clause coercion constraints), with the name-only check as its site. Home 2, an `XXX` compile test on the `Vector` shape with `compile_err_contains=Cyclic`. Yes to the row, with that wording.
3. **The compiled checker does not substitute an operator argument into an inherited abstract operator method** (`OprSingle`, one instantiation; `OprInstancesOplus`). Real: the specification says the subtrait inherits the method under the actual operator's name (`trait-parameters.tex:227-229`), walk does so, the checker's abstract-method check does not. Distinct from row 366 (an object with an `opr` static parameter cannot be instantiated at run time; code generation). It makes the specification's whole algebra chapter unusable on the compiled path until fixed. Home 2, an `XXX` compile test with `compile_err_contains=has no concrete implementation`. Yes to the row.
4. **The exclusion rule compares type arguments only, so a type may be `Vec[\3\]` and `Vec[\4\]`** (section 6; my probe, re-run by the rung that takes the row as its red test). Home: the run-time size rung's gather, fix at `TypeAnalyzer.scala:460-463`. Yes to the row.
5. **The code generator crashes on `Any` as a static argument in an extends clause** (`AltEveryContra`, `CodeGen.java:5766-5778`, "Only handling some static args of generic types in extends clause"). A thrown `CompilerError` on a well-formed declaration; the gatherer measured it and did not name it. Home 2 with the `compile_exception_contains` key (FACTS, the harness entry on a thrown `CompilerError`). Yes to the row, minor.

Not a new row: the code generator refusing any object with a where clause (`CodeGen.java:4088`) is already flagged in FACTS as his call.

## 10. Where this differs from the gatherer

- The rule's statement: the gatherer would say "type arguments only, as the implementation does". This brief says operator arguments do not count and every other kind does, with the size case measured (section 6) and a candidate row for the checker.
- Candidate row 2: the probe's refusal is not shown wrong; the unguarded shape is also ill-formed by the specification's own restriction on self-coercion. The defect is real by reading of the name-only check and of the unimplemented guard.
- E6: the gatherer lists it as refused by the rule. By the rule's definition it is; by the checker it never reaches the rule (unbound where-clause variables, `type` aliases refused, `bool` parameters refused by name), and the chapter has no library counterpart. The revision's text for it says the where-clause road is closed and does not lean on a comparison of booleans the checker does not make.
- Sequencing of the tower: the gatherer has rung S mark E5 and E6 as following the library rung; this brief ties them to the flattening rung's batch, never earlier, with the reason (a specification ahead of the library is an open discrepancy too).
- The bare `Nothing`: the gatherer lists inference at the use as a way "not implemented on either path" and moves on; this brief lifts it as the one road that keeps row 331's decision, proposed as the row's new gate.
- The batch record's option (b) for S2 (`CLIMB-BATCH-4.md` section 1, question 2), "which, by reading, the interpreter can run once rung C lands", is overturned by measurement: rung C landed and walk still refuses it (row 389). The gatherer says so; the batch record should be corrected when S is briefed.

## 11. His to decide, listed as open

- Whether rung S's scope narrows as section 3.3 proposes: the tower passages land with the flattening rung's batch, not in a rung of batch 4 or 5 on its own.
- Whether row 331's future work is re-gated on static-argument inference from the expected type (section 8), or the bare spelling is simply closed.
- Whether worklist item 12 is reworded to declaration-site variance by the 2012 keywords, or dropped from the worklist.
- Whether sizes and boolean arguments count in the rule as this brief judges, and where the checker change goes (the run-time size rung's gather is proposed).
- Whether `RationalQuantity` survives as the specification's design for sign-refined rationals, given that the library never had it; a question for the flattening rung's brief, outside S2.
- Whether the 2012 `covariant` keyword is mentioned in the specification's text at all (a draft note at E1, an S1-shaped question) or only in the record, which is this brief's default.
- The five candidate ledger rows.
- The correction to `CLIMB-BATCH-4.md`'s option (b).

## 12. The team's later Types chapter

`Documentation/Specification/Prose/Language/types.tick`, Victor Luchangco's draft of 2012-05-31 (`275b90773`, "New types chapter (draft)"), is part of a restart of the specification that was never adopted (`coordinator/spec-lineage.md`); it is a year and a half later than the team's last edit to `Specification/` (`44e03b176`, 2010-12-09). Read as the team's later statement, it bears on this brief in four places and changes no verdict.
- It sharpens section 5: the rule is stated as a property of exclusion in the types chapter and as a rule on trait declarations, in the team's own two-part form and under the team's own later name, instantiation exclusion (`:353-376`).
- It sharpens section 3.1, E1 and item 12 of section 8: the road back to declaration-site variance is written in the team's prose (`:320-339`, `:355-360`), so the record quotes it rather than deriving it. The verdict stands, because that road runs on neither path today.
- It closes section 3.1's option 3 for E3 harder: `Bottom` "cannot be written in a program" is the team's rule (`:191-195`), not only the FAQ's answer.
- It leaves section 4 (operator arguments) where it was, and reads with section 6 (sizes).

## 13. Recommendation

Revise E1 to E4 and E7 to E10 to the library's shapes in batch 5's rung S, state the rule once over every static argument except operator arguments, tie the tower chapters to the flattening rung's batch, and re-gate row 331 on static-argument inference.
