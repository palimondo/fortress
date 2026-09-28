<!-- PLAN item 26, ledger row 491: do the specification's passages that read a `comprises` clause at the level of types still follow from the clauses for every program since climb batch 7C, and if not, what should the specification and the two implementations do. The nine steps and every way, for Pavol through the coordinator, written 2026-09-28 by a clean worker (Opus), finished at 19:52 UTC, no recommendation but its reading, marked. Read: CLAUDE.md, protocol.md, POSITIONS.md whole, the two FACTS entries on `comprises`, ledger rows 487-492, rung X's REPORT.md, decision-record.md section 4 and SKEPTIC.md sections 9-14, climb-batch-7C/RECORD.md, merged-tests/between-y.txt, reviews/batch-7C-review.md, reviews/anyintegral-comprises-ways.md and -judgement.md, PLAN.md items 26-27 and batch 7b's line, CLIMB-BATCH-7.md rung S; the four passages; Documentation/Specification/Prose/Language/types.tick; Papers/Types/exc-spec.tick; Papers/Welterweight (grammar, static, fig-subtyping, fig-meetrule, fig-covered, evaluation); the checker's TypeAnalyzer, TypeHierarchyChecker, AbstractMethodChecker, Functionals; walk's FType and BuildEnvironments. Cited from the record and not re-measured: SkBetweenAssign, SkThroughOwnClause, SkMeetSingle, MeetExample, BetweenTwoClosed. Measured now (nothing on record answered them): eight small programs and the team's Compiled240.fss, on both paths of the landed 7C build in /home/user/fortress-intprose (d2d5f7e24: 7C's checker and interpreter, two library comments changed since), private caches, one thread; and a scan of the one library's clauses. Scripts, probes and captures in explorations/reviews/comprises-type-level-ways/. Nothing tracked was edited; nothing heavy was run; no timing is reported. -->

# The passages that read `comprises` at the level of types: every way, with the nine steps

## For Pavol

**The question.** Since batch 7C, a trait may stand unlisted between a closed trait and its listed types. Four passages of the specification still argue as if it could not. Do they still hold, and if not, what changes?

**A refresher.**
- `trait S comprises { U, V }` closes `S`. There are two readings of what that says.
- The type reading: every type under `S` is under `U` or `V`. This was the Working Draft's note, and it is Java's `sealed` rule.
- The value reading: every value of `S` is a value of `U` or `V`. This is the 2012 Types chapter and Welterweight. Batch 7C adopted it, so that `Integral` can stand unlisted between `AnyIntegral` and the five integer types.
- Under the value reading, a trait in between adds no values, but it is still a type. So a statement about types can fail while the same statement about values holds.

**The answer.**
- The intersection example (P1) and the Meet Rule's example (P2) no longer hold at the level of types. They still hold at the level of values.
  - Measured, three programs the new text allows. In each, a type is below both `S` and `T` but not below `V`.
  - The compiled checker refuses `v: V = g` in all three. Walk runs all three and prints `PASS`.
- The abstract function rule (P3) and the team's draft note (P4) say "every immediate subtype". Under 7C that is no longer the set of listed types: for `AnyIntegral` it is `Integral`.
  - Measured, on the checker's check for abstract methods: definitions for the listed types are accepted, and one generic definition for the immediate subtype is refused.
  - Top-level abstract functions, P3's own feature, run on neither path.

**Found on the way (new measurements).**
- The break is older than 7C on the compiled path. A trait with a `comprises` clause of its own, and no static parameters, breaks P1 the same way. The checker has accepted that shape since 2009 (`OwnClauseBetween`).
- The candidate on record, "refuse a generic trait unlisted under two closed traits", is not enough. One closed trait suffices to break P1 (`OneClosedBetween`).
- Both implementations already read a clause at the level of values everywhere they use it:
  - exclusion, on both paths;
  - a type below a union, in the checker (Steele, June 2012);
  - the covering check for abstract methods, in the checker.
  The one place neither path uses a clause is finding a meet. That is row 492.
- Top-level abstract function declarations are refused by both paths. The team's own 2009 test of them (`Compiled240.fss`) has no harness file. This is a candidate ledger row.

**The ways, in short.**
1. Leave the four passages as they are. This is how 7C landed.
2. Restate the four at the level of values, and define "covers" once. The Meet rule then accepts declarations that cover the meet. This is the team's own 2009 plan, "revise the Meet rule … with the coverage check".
3. Put coverage into the subtype relation, so that the type statements become true again. This does not fix 7C's generic case.
4. Narrow 7C's rule so that the type statements hold. The corrected form of the record's candidate also refuses shapes accepted since 2009, and it does not fix P3.
5. Keep the type statements, with a proviso "for this program".
6. For P3 only, read "every immediate subtype" literally.

**My reading.** Way 2. Batch 7b's rung S writes P2's part, and rungs C and W take row 492's repair with it.

**For batch 7b.**
- Under way 2, rung S's new Meet rule is a rule that no path runs until C and W repair row 492. That is rung S's own stop, so the three must land together.
- Once row 492 is repaired, a call whose argument's static type sits in between has two minimal candidates. How that call is typed needs one sentence.

## 1. The mathematics

- A closed trait's clause can be read as a statement about types or about values (the refresher above). The type reading implies the value reading. The value reading does not imply the type reading when a type can have no values of its own: a trait. Only objects make values.
- P1's argument: any subtype `X` of both `S` and `T` is below `U` or `V` (by `S`'s clause), and below `V` or `W` (by `T`'s). `U` excludes `W`, so `X` is below `V`. Its first step needs the type reading for `S` and `T`.
- Under the value reading the same steps go through for any object below `S` and `T`, so for every value. That is the claim a run-time dispatch needs: which declaration runs is decided on the values' own types, and those are always objects (`Specification/basic/overloading.tex:262-275`).
- A static type can sit in between. Under the new text a trait `G[\X\] extends { S, T }`, whose only extender `H` is below `V`, is allowed. Then `G[\ZZ32\]` is below `S` and `T` and not below `V`. The type statement "`V = S ∩ T`" is false for that program, and no named type equals `S ∩ T` in it.
- For P3 the difference is between two sets: the immediate subtypes of a closed trait, and its listed types. Under the type reading they coincide. Under 7C's text they differ whenever a trait stands between. For `AnyIntegral` the immediate subtype is `Integral[\I\]` and the listed types are the five.
- The set of immediate subtypes is also open under 7C's text: any unit may declare a new trait in between that meets the text's conditions. The listed types are fixed by the clause.

## 2. What each path does today

Cited from the record:
- `SkBetweenAssign` (the static-parameter case under two closed traits, `v: V = g`). The checker refuses the assignment, "Right-hand side has type G[\ZZ32\], but declared type is V". Walk prints `PASS` (`compile-ladder/rung-spec-comprises/probes/skeptic/SkBetweenAssign.txt`; `compile-ladder/climb-batch-7C/merged-tests/between-y.txt`).
- The Meet Rule's own example and its one-member form are refused by both paths. Neither path looks for a meet in the clauses at all (row 492; `SkMeetSingle.txt`, `MeetExample.txt`).
- `SkThroughOwnClause` (a trait with a clause of its own between `T` and its listed types) is accepted by the base's checker, before rung Y (`compile-ladder/rung-spec-comprises/probes/skeptic/SkThroughOwnClause.txt`).

Measured now, both paths of the landed 7C build (`comprises-type-level-ways/captures/`; `run.sh`):
- `OwnClauseBetween`: `trait M extends { S, T } comprises { V }` and `trait V extends M`, no static parameters, then `m: M = Vo; v: V = m`.
  - The checker accepts the hierarchy and refuses the assignment, "Right-hand side has type M, but declared type is V".
  - Walk prints `PASS`.
  - The disjunct that accepts `M` is Sukyoung Ryu's of 2009, which rung Y did not change (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:263-270`).
- `OneClosedBetween`: `trait G[\X\] extends { U, T }`, unlisted under `T` only (it is below `U`, which `S` lists), and `object H extends { G[\ZZ32\], V }`.
  - The checker refuses `v: V = g` in the same words as above.
  - Walk prints `PASS`.
- `AbsMethodBetween`: an abstract method `name(a: A)` over `A comprises { O, P }`, with `Gen[\X\]` standing between. The object defines `name` for `O` and for `P`.
  - The checker accepts it, and the compiled run prints `PASS`. Walk prints `PASS`.
- `AbsMethodMissing` (only `name(o: O)` defined): the checker refuses, "The inherited abstract method name(a:A):String from the trait Namer has no concrete implementation". Walk prints `PASS`, since only `O` is called.
- `AbsMethodGeneric` (one definition `name[\X\](g: Gen[\X\])` for the immediate subtype):
  - The checker refuses, "Domain A is not a subtype of Gen[\X$2\]".
  - Walk stops with an `InterpreterBug`, "MethodClosure name(a:A) … has neither body nor def": it chose the abstract declaration. Rows 100 and 405 record the same symptom.
- `AbsFnBetween`, `AbsFnMissing`, `AbsFnGeneric` (the same three shapes as top-level functions, P3's own feature) and the team's `ProjectFortress/compiler_tests/Compiled240.fss` (2009, "Tests top-level abstract function signature and comprises-based overloading", no `.test` file):
  - Walk refuses every one at load, "bug! Function definition should have a body expression" (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:292`).
  - The compiled checker accepts all four with no error, the missing arm included (`captures/typecheck-abstract-functions.txt`).
  - The code generator then refuses, "Abstract function declarations are only supported in traits" (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2985` in the build, `:2999` on `main` at `581356f32`).

Read, where each implementation already uses a clause:
- **Exclusion, compiled.** A closed trait excludes a type when every listed type does (`scala_src/types/TypeAnalyzer.scala:441-447`). This is Welterweight's rule, and it is sound at the level of values.
- **Exclusion, walk.** Every pair of transitively listed types must exclude (`interpreter/evaluator/types/FType.java:280-298`; Jan-Willem Maessen, 2008).
- **Below a union, compiled.** A trait with a clause is below a union when every listed type is (`TypeAnalyzer.scala:152-157`; Guy Steele, `59fdeff62`, 2012-06-06, "This should improve the behavior of 'covers' checks in AbstractMethodChecker").
- **Abstract methods, compiled.** At each object, the abstract method's domain must be below the union of the concrete domains (`scala_src/typechecker/AbstractMethodChecker.scala:92-116`). With the union rule this reads the listed types, which is why `AbsMethodBetween` passes.
- **Trait below trait, compiled.** Declared `extends` only. Steele's coverage disjunct there is commented out: "Gets a stack overflow error; maybe we don't need this in practice. GLS 6/6/12" (`TypeAnalyzer.scala:269-273`).
- **Choosing among candidates at a call, compiled.** The checker sorts the applicable candidates and takes the head (`scala_src/typechecker/impls/Functionals.scala:462`). With two minimal candidates it takes one of them.

## 3. What the specification says, under every spelling

- **P1**, `Specification/basic/types-vals-vars.tex:583-604`.
  - The intersection of a set of types "is equal to a named type U when any subtype of every type T ∈ S … is a subtype of U" (`:583-585`).
  - The example concludes "any subtype of both S and T must be a subtype of V. Thus, V = S ∩ T" (`:602-604`).
  - Both sentences are about types. The union definition beside them (`:586-588`) is a least upper bound, which ignores values.
- **P2**, `Specification/advanced/overloading.tex:275-307`.
  - The Meet rule asks for "a declaration f(P ∩ Q) in the scope" (`:258-262`).
  - The example repeats P1 and adds that `f(V)` "is applicable to and more specific for any call to which both f(S) and f(T) are applicable" (`:303-307`).
  - The basic chapter decides which declaration runs by the values at run time. Among several applicable declarations with none more specific than all the others, it takes "an arbitrary declaration among the declarations such that no other applicable declaration is more specific" (`Specification/basic/overloading.tex:262-275`).
- **P3**, `Specification/basic/functions.tex:370-415`.
  - "The union of the argument types of the concrete declarations for f must be equal to T" (`:377-378`).
  - "Unless T has a comprises clause … some concrete declaration for f must have argument type T" (`:380-382`). This sentence is true only if "union … equal" means covering: under the least-upper-bound definition, two subtypes' union can equal `T` with no clause at all.
  - "The programmer must provide a definition for every immediate subtype of Molecule, or it is a static error" (`:413-415`).
- **P4**, `Specification/basic/components/source-code.tex:428-434`, a `\note` of proposals: a trait with a clause counts as having a concrete method "provided that all its immediate subtraits" do.
- **The team's list of future work**, `Specification/appendices/future.tex:269-285`: "Identifying the intersection of any two types with comprises clauses with the union of their common subtypes", the same five traits, "S&T ~~ V", and "We agreed to revise the Meet rule to address this with the coverage check." The Working Draft carries it (`Specification-1.0-frozen/appendices/future.tex:269-285`).
- **The traits chapter since 7C**, `Specification/basic/traits.tex:235-252`. Every value of `T` is a value of a listed type. A trait with a clause of its own, or a trait with static parameters whose every extender is below a listed type, may explicitly extend `T` unlisted. Appendix I's I.1.20 says P1 to P3 are "not revised" (`Specification/appendices/changes.tex:1311-1316`).
- **The later Types chapter**, `Documentation/Specification/Prose/Language/types.tick`.
  - It names "covering" as a relation beside subtyping and exclusion (`:36-38`) and never defines it ("% What about "covering"?", `:934`).
  - It reads a clause as coverage: an instantiation "is covered by the union" of the listed types (`:384-390`).
  - Yet it repeats P1's example word for word, "Thus, V = S ∩ T" (`:673-688`).
  - Its intersection is "the largest type that is a subtype of all its constituent types" (`:639-642`).
  - So the designers' later chapter holds both readings side by side and does not reconcile them.
- **The Types paper (OOPSLA 2011)**, `Papers/Types/exc-spec.tick`.
  - Type level: "any strict subtype of C[T] must also be a subtype of [T/X]K_i for some K_i" (`:18-23`).
  - A commented-out draft said instead that `C[T]` is equivalent to the union of its listed types (`:36-41`).
- **Welterweight (2012)**, `Papers/Welterweight/`, value level:
  - "no value can belong to the trait unless it also belongs to one of the comprised types" (`grammar.tick:21-22`);
  - rule Sub-Comprises: a trait with a clause is below whatever every listed type is below (`fig-subtyping.tick:207-211`);
  - the Covered judgement for abstract declarations, "considered to be covered if it is implemented for all the types comprised" (`static.tick:27-47`, `fig-covered.tick:9-13`).
  - Its Meet rule still asks for a declaration whose domain is equivalent to the intersection (Meet-Third, `fig-meetrule.tick:56-60`).
  - Its intersection rule asks one side to be below `V`, or the two sides to exclude each other (`fig-subtyping.tick:48-51`). So, by reading, the calculus cannot derive `S ∩ T` below `V` for the example either. That agrees with row 492 on both paths.
  - Its typing rule for a call wants exactly one most specific declaration by the static types (`evaluation.tick:63`).

## 4. What the library does in the same family

A scan of the one library's clauses, by simple name (`library-shapes.py`, `captures/library-shapes.txt`):
- 39 closed traits.
- No type is listed in two clauses. The library never builds P1's diamond, a `V` under both `S` and `T`.
- Its closed families are trees: `Number` over `AnyIntegral` over the five; `UniqueItem` over `Maybe` over `Nothing` and `Just`.
- The only trait standing unlisted under a closed trait is `Integral` under `AnyIntegral`.
- So no library line depends on any of the four passages, and no way below changes a library line. The exception is way 3's variant, which reopens `Integral`.
- Where the library needs a meet it declares one (batch 8's probe P2, `CLIMB-BATCH-7.md:414`).

## 5. Where the designers departed from Java

- Java's `sealed` is the type reading. Every direct subclass must be named in `permits`. A generic class in between must itself be `sealed` or `non-sealed` and be named (JLS SE 21 § 8.1.6, cited by the ways note, section 3). That is the Working Draft's note.
- Java's "covers" is a value reading, and Java uses it only to decide whether a `switch` is exhaustive, never for assignment (JLS SE 21 § 14.11.1.1, https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html).
- The designers departed twice:
  - in 2012 they let a trait with no values of its own stand in between (the Types chapter, Welterweight);
  - they made overloading choose by the values at run time, where Java chooses at compile time.
  The second makes the value reading the one dispatch needs.

## 6. What the peers do

The ways note surveyed closure itself (Java, Scala 3, Kotlin, Rust, Haskell; its section 3). Here, what the peers do with a meet and with coverage:
- **Ceylon** is the nearest: named types, enumerated cases, union and intersection types.
  - "Coverage" is its own relation, weaker than assignment: "the union X1|X2|... of its cases covers the type".
  - "A type is not considered automatically assignable to the union of its cases"; it must be narrowed by `switch` or `of`.
  - Every subtype of an enumerated type "must be a subtype of exactly one of the enumerated subtypes" (the type reading), and disjointness is computed from the cases.
  - Source: the Ceylon 1.3 specification §§ 3.4.1, 3.4.2, 3.4.4, 3.2.5, https://web.mit.edu/ceylon_v1.3.3/ceylon-1.3.3/doc/en/spec/html_single.
  - So Ceylon keeps the type statements true by forbidding the in-between type, and keeps coverage out of assignment. That is way 2's "covers", but with the Working Draft's closure rather than 7C's.
- **Scala 3.** Union subtyping has three rules, and a sealed parent is not below the union of its children. Exhaustiveness of a match is checked apart from subtyping (https://docs.scala-lang.org/scala3/reference/new-types/union-types-spec.html).
- **Julia**, the multiple-dispatch peer, resolves an ambiguity "by specifying an appropriate method for the intersection case" (https://docs.julialang.org/en/v1/manual/methods/). Its intersection is purely a type intersection, and it has no closed types, so the question does not arise there.
- No peer puts coverage into assignment for a nominal closed type. Ceylon says so explicitly.

## 7. What the commits say

- P1 and P2's example is 2009 text. It is in Sukyoung Ryu's draft of 2009-11-04/06 (`a8e403b50`, `0f49d8698`) and not in the 1.0 release (`Specification-1.0-frozen/fortress.1.0.pdf`, no such example in its text). The future-work item is in her appendices of 2009-11-02 (`cec470a34`). So the team knew in 2009 that `V = S ∩ T` needed "the coverage check", while the type reading still forbade anything in between.
- The checker's rule for a trait with a clause of its own is Ryu's of 2009 (`360905925`, ways note section 4). It was the first in-between shape, and the Working Draft's note did not allow it.
- In the 2011 paper the union-equivalence reading was drafted and then commented out for the type reading (`exc-spec.tick:36-41`).
- In 2012 Luchangco's Types chapter adopted coverage and kept the example unchanged. Welterweight added Sub-Comprises and Covered.
- In June 2012 Steele implemented coverage in two places, below a union and for abstract methods (`59fdeff62`). He tried a third, trait below trait, and commented it out for a stack overflow (`TypeAnalyzer.scala:269-273`).
- Batch 7C (2026) made the static-parameter case the specification's rule and left the four passages (decision record section 4).

## 8. The ways

### Way 1. Leave the four passages (as 7C landed)
- What it does: nothing. Appendix I says the passages are not revised.
- What it touches: nothing.
- What it costs:
  - P1's sentence is false for programs the text allows. Three are measured, one of them accepted by the compiled checker since 2009.
  - P2's justification rests on P1.
  - Row 492's repair has no stated rule to build. The Meet rule's words ask for a declaration equal to `S ∩ T`, and after 7C the clauses no longer fix that.
  - Batch 7b's rung S rewrites P2's chapter around a stale argument.
  - P3 names a set, the immediate subtypes, that the checker's own method check does not use.

### Way 2. Restate the four at the level of values, with "covers" defined once
- **Specification.**
  - One definition, in `types-vals-vars.tex` beside the intersection: a type covers another when every value of the second is a value of the first. A closed trait is covered by the union of its listed types. This is the Types chapter's relation, defined; the traits chapter already states the value half.
  - P1: "any value of both S and T is a value of V; thus V covers S ∩ T". The definitions at `:583-588` stay.
  - P2, in rung S's chapter: the Meet rule is met when declarations each more specific than both `f(P)` and `f(Q)` together cover `P ∩ Q`, the future item's words. The example follows, and `future.tex:269-285` is marked done.
  - P3: "the argument types of the concrete declarations together cover T", and "a definition for every listed type". This is Welterweight's Covered.
  - P4: "all its listed types".
  - An S1 entry for each, quoting the Working Draft.
  - The Types chapter's copy of the example is outside `Specification/` and is cited, not edited.
- **Compiled checker.**
  - Exclusion, below-a-union and the abstract-method check stay as they are.
  - Row 492's repair finds the meet by coverage in the overloading check (`scala_src/typechecker/OverloadingChecker.scala:418`), rung C's file. The clause expansion of an intersection exists in part (`TypeAnalyzer.scala:645`, `normConjunct`).
  - One sentence and its check for a call whose static type sits in between. Two minimal candidates remain. By reading, taking either one's return type is sound: the declaration that runs is more specific than both, so the Return Type Rule keeps its return type below each. That is what `Functionals.scala:462` does by accident today.
- **Walk.** Exclusion already reads values. Row 492's meet search reads coverage (`interpreter/evaluator/values/OverloadedFunction.java:439-472`, `:645`), rung W's file.
- **Assignment does not change.** `v: V = g` stays a static error, and a program narrows with `typecase`, as in Ceylon, Scala and Java.
- **Tests.** Row 492's two `XXX` tests flip on purpose with the repair. A gated `BetweenTwoClosed`-shaped test would show `f(g)` running `f(V)`.
- **What it costs.**
  - Text in four files and their Appendix I entries.
  - The repair already routed to 7b's rungs C and W becomes a requirement.
  - The call sentence is a rule the type group did not write. Welterweight's typing rule wants exactly one choice.

### Way 3. Coverage in the subtype relation
- What it does:
  - Welterweight's Sub-Comprises, taken generally; the 2011 paper's commented-out equivalence; Steele's commented-out trait rule.
  - With intersections expanded by their clauses, `S ∩ T` is equivalent to `V`.
  - The own-clause case becomes equivalent to its listed type, so `OwnClauseBetween`'s assignment is accepted.
  - The static-parameter case `G` still breaks P1, since it has no clause. Fixing that would need a clause read from its known extenders, which only sees one unit (row 487).
- What it touches:
  - the checker's trait-below-trait rule (`TypeAnalyzer.scala:264-273`, where Steele stopped) and its normalization;
  - walk's subtype test;
  - the specification's subtyping text.
- What it costs:
  - It changes which programs type-check, and no peer does this for nominal closed types (Ceylon rules it out).
  - It is the largest change of all the ways, and it still leaves 7C's case false.
- A variant (3b): with `Integral[\I\] comprises I`, the ways note's way 3, `Integral[\ZZ32\]` becomes `ZZ32`. That is Naden's "identified as X", and it would make 7C's static-parameter case unneeded for the library.
  - It reopens your option 1 of 2026-09-28.
  - It is already batch 8's unmeasured candidate for `Integral`'s bodies.
  - Listed only.

### Way 4. Narrow 7C's rule so the type statements hold
- The record's candidate: refuse a trait with static parameters standing unlisted under two closed traits. It is not enough: `OneClosedBetween` breaks P1 from under one.
- The sufficient form: a trait standing unlisted under a closed trait `T` (either case) may not be below another closed trait unless `T` is below it too.
  - It refuses `OwnClauseBetween` and `OneClosedBetween`. The first is a shape the checker has accepted since 2009.
  - It keeps the library, by the scan: `Integral`'s closed supertypes are `AnyIntegral` and `Number`, and `Number` is above `AnyIntegral`.
  - It is checked where the in-between trait is declared, so it works across units.
- What it touches: a clause in `TypeHierarchyChecker.scala` beside rung Y's; a sentence in `traits.tex`; nothing in walk, which never checks clauses (row 22).
- What it costs:
  - It is a rule of ours with no source in the team's texts.
  - P3 and P4 still need way 2's or way 6's text, since `AnyIntegral`'s immediate subtype is `Integral` under any narrowing that keeps the library.

### Way 5. Keep the type statements, with a proviso
- What it does: P1 and P2 say that their conclusion holds "for this program, where no trait stands unlisted between S or T and their listed types"; P3 says that for `Molecule` the immediate subtypes are the listed types.
- What it touches: text only.
- What it costs: the Meet rule still asks for a declaration equal to `S ∩ T`, which a checker cannot establish from the clauses. A later unit may add a trait in between. So row 492's repair has no sound rule under this way except one that checks the whole program.

### Way 6. For P3 alone, "every immediate subtype" as written
- What it does: a program over `AnyIntegral` defines `f` for `Integral[\I\]`, generically.
- What it costs:
  - Measured, in the method form: the checker refuses it and walk fails on it, while the listed-type form passes on both.
  - The immediate subtypes are not fixed by the clause under 7C's text, so the rule cannot be checked where the abstract function is declared.

### Beside every way
- Top-level abstract function declarations run on neither path (section 2). P3's wording decides nothing today.
- The feature itself is a candidate ledger row. The specification calls it valid, so home 2: an `XXX` walk test and an `XXX` compile test, since the refusal is at the compile stage.

## 9. The derivation, and my reading

- **Custodians of their language.**
  - The designers' latest texts read a clause at the level of values: the Types chapter, Welterweight's grammar, Covered and Sub-Comprises.
  - The team's own 2009 note names the fix for the Meet rule: "the coverage check".
  - Steele's last code on it, June 2012, does coverage for exactly the purposes P3 and P4 serve, and stopped short of subtyping.
  - Under your weighting of 2026-09-23 and 2026-09-26 that is the governing word. The type statements in P1 and P2 are 2009 text, left unreconciled in the 2012 chapter.
- **The library's practice.** The library never builds the diamond and has one trait in between. No way but 3b moves a library line.
- **What the paths already do.**
  - Both read values wherever they use a clause, except for the meet, which neither computes (row 492).
  - Way 2 changes no measured verdict except row 492's two expected failures.
  - Ways 3 and 4 change verdicts the checker has given since 2009.
- **7C's decision.** Way 2 finishes the reading 7C adopted. Way 4 takes part of it back with a rule of ours. Way 3 goes further than the designers went.
- **The question for you, in one line:** state the four passages as coverage (way 2), or keep them at the level of types by narrowing the rule (way 4), or leave them (way 1)?

**My reading: way 2.**
- Rung S of batch 7b writes P2's Meet rule and example in the coverage form, and rungs C and W take row 492's repair with it, so that rung S's stop does not fire.
- P1, P3 and P4 go in the same rung if its file list grows, or else in a small specification rung.
- The sentence for a call typed in between goes with rung C.

## For batch 7b's record

- Rung S rewrites `advanced/overloading.tex`, which holds P2. Without your answer it names row 491 among the passages it leaves (`PLAN.md`, batch 7b's line).
- Under way 2, rung S's Meet rule in the coverage form is "normative text for a rule neither path will run" unless rungs C and W repair row 492 in the same batch (`CLIMB-BATCH-7.md:123`). The repair has to be written into C's and W's sections as a requirement, not left as an option.
- Answer 9 revises the chapter to the 2011 paper's rules. The paper's Meet rule asks for the meet as a type. Way 2 adds the coverage form beside it. I read that as an extension, since answer 9 is about static parameters, but the record should say so.
- Once row 492 is repaired, a call whose static type is in between has two minimal candidates.
  - The checker takes the head of a sort (`Functionals.scala:462`), and Welterweight wants exactly one.
  - Rung C meets this shape. It exists since 2009 through a trait with a clause of its own (`OwnClauseBetween`).

## For the next gather

- Row 491, a note: the own-clause case breaks P1 at the level of types too, with no static parameters, on the compiled path since 2009 (`OwnClauseBetween`). Candidate (b) is not sufficient (`OneClosedBetween`).
- A candidate row: top-level abstract function declarations refused by both paths.
  - Walk refuses at `BuildEnvironments.java:292`.
  - The checker accepts, including the missing arm. The code generator refuses at `CodeGen.java:2999` on `main`.
  - The team's `Compiled240.fss` has no `.test` file.
- `AbsMethodGeneric` under walk, the abstract declaration chosen over a generic definition: check it against rows 100 and 405.

## Files, and what was run

- `comprises-type-level-ways/probes/`: `OwnClauseBetween.fss`, `OneClosedBetween.fss`, `AbsFnBetween.fss`, `AbsFnMissing.fss`, `AbsFnGeneric.fss`, `AbsMethodBetween.fss`, `AbsMethodMissing.fss`, `AbsMethodGeneric.fss`.
- `comprises-type-level-ways/run.sh`:
  - runs each probe, and a copy of `Compiled240.fss`, under walk, then `Shell compile` and `fortress run`;
  - uses the build in `/home/user/fortress-intprose`;
  - uses a private copy of its caches, through `-Dfortress.caches` and `FORTRESS_CACHES`.
- `comprises-type-level-ways/captures/`: one capture per program, headed by its machine line (nproc 4, Intel Xeon Processor @ 2.10GHz, 2100 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`, the load at start); `typecheck-abstract-functions.txt` (`Shell typecheck` only); `library-shapes.txt`.
- `comprises-type-level-ways/library-shapes.py`: the scan of section 4.
- No suite, gate stage, count or distance run, and no timing taken.
