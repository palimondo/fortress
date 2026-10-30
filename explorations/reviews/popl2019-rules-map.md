<!-- The formal rules of the type group's last paper, Park, Hong, Steele and Ryu, "Polymorphic Symmetric Multiple Dispatch with Variance" (POPL 2019), read in its technical report's LaTeX sources (`Papers/Variance/`) and mapped rule by rule to the compiled checker's code on `main` at `501140f96`, to the ledger rows that already know each departure and to the decisions on record, so that a brief can cite a rule by its source line and its code line: 22 rule groups (8 built, 13 departing, 1 missing) and the theorems' premises, 5 findings with no row and no decision, and 6 questions for the curator where a rule and one of his decisions disagree. Written 2026-10-30 by an Opus worker, reading only: nothing was built or run, and every derivation from the rules is marked as a reading. -->

# The POPL 2019 rules, mapped to the checker and the record

## How to read this

**The sources.** Every `.tex` file named here is in `Papers/Variance/` (`b8ae2a702`; F-300). `lang.tex` holds the calculus and its well-formedness rules, `rules.tex` the overloading rules and the quantified types, `resolve.tex` the typing of expressions, the static and dynamic resolution and the soundness results, `appendix.tex` the conditional type relations, the full matching rules and the proofs (`Papers/Variance/README.md`). A rule is cited by its bracketed name, as the sources print it (`\infrule[Meet-Third]`), and by file and line; a figure or theorem also by its `\label`. The paper's calculus is FGFV, "Featherweight Generic Fortress with Variance". P-26 counts the paper and its report as the team's last word and work, and F-271 records what its proof leaves out.

**The code.** Lines are on `main` at `501140f96`, whose code is that of `c040df488` (only `explorations/coordinator/BOOT.md` changed between them). `scala_src/` stands for `ProjectFortress/src/com/sun/fortress/scala_src/`, `compiler/` for `ProjectFortress/src/com/sun/fortress/compiler/` and `interpreter/` for `ProjectFortress/src/com/sun/fortress/interpreter/`. The checker's stages run in `compiler/StaticChecker.java:163-298`: the type hierarchy (`:188-219`), well-formedness (`:220`, `:268`), the type check (`:231-247`), the overloading check (`:275`), the export check (`:283`) and, on the compile path only, the variance check (`:288-290`).

**Each section** gives the rule's source, the rule in plain words, one Fortress example, the code that builds it, how the code departs, the ledger rows that know the departure (found with `ledger.py find` and read with `ledger.py show`), the decisions on record that touch it (read with `facts-extract.sh`), and a verdict:

- **built**: the code does what the rule says, perhaps with additions for Fortress features that the calculus lacks;
- **departs**: the code accepts or refuses something that the rule decides otherwise, or decides it by another route;
- **missing**: no code builds the rule.

**Readings.** The brief allowed no build and no run. A sentence marked "by reading" derives a consequence from the rules or from the code without a run; nothing in this note was measured. Where an example's outcome on today's tree comes from the record, the row or note is cited.

## In short

| § | Rule or group | Source | Code on `main` | Verdict | Rows | Decisions |
|---|---|---|---|---|---|---|
| 1 | [T-Program] | `lang.tex:154-160` | `ExprDisambiguator.scala:790-803` | built | none | none |
| 2 | [D-Trait], [D-Object] | `lang.tex:166-201` | `TypeHierarchyChecker.scala:195-201`; `OverloadingChecker.scala:360-409` | departs | 650, 653 | P-147, P-149 |
| 3 | [Anc-Diff-Trait], [Anc-Same-Trait] | `lang.tex:388-397` | `TypeHierarchyChecker.scala:291-308`; `TypeAnalyzer.scala:541-555` | departs | 402, 406, 416 | P-43, P-97, P-62, F-44, F-166 |
| 4 | [Binding-Empty], [Binding-Step] | `lang.tex:399-411` | none in the checker; `OverloadSet.java:1501-1515` | missing | 677 | F-271, P-78, P-62 |
| 5 | [D-Method] | `lang.tex:205-217` | `Decls.scala:198-234` | built | 405, 785 | P-49 |
| 6 | [Tc-…], variance premise | `lang.tex:466-534`, `:216` | `VarianceChecker.scala:57-254` | built | 404, 623 | P-62, F-166 |
| 7 | [W-…] | `lang.tex:309-366` | `TypeWellFormedChecker.scala:240-310` | departs | 470 | P-42, P-55 |
| 8 | [T-Variable] to [T-Object] | `resolve.tex:5-29` | `STypeChecker.scala`, `impls/` | built | 587, 705 | P-49, P-51, P-59 |
| 9 | [T-Method], [MSAV] and its judgments | `resolve.tex:31-87` | `Functionals.scala:668-850`; `STypesUtil.scala:1124-1245` | departs | 391, 499, 538, 540, 543, 579, 580 | P-45, P-46, P-49, P-51, P-60, P-74 |
| 10 | [Sub-…] | `appendix.tex:6-114` | `TypeAnalyzer.scala:136-339` | departs | 682, 773, 805, 806 | P-42, P-55, P-146, P-151, P-156 |
| 11 | [Exc-…], constructability | `appendix.tex:116-209` | `TypeAnalyzer.scala:411-574` | departs | 406, 713, 786, 803 | P-43, P-152, P-157, P-62 |
| 12 | constraints, `unify` | `rules.tex:252-258`, `:358-438` | `Formula.scala` | built | 736, 803 | none |
| 13 | well-formed substitution, [E-Sub] | `rules.tex:134-162`, `:214-228` | `TypeSchemaAnalyzer.scala:150-201`; `STypesUtil.scala:1014-1080` | departs | none | P-45, P-48 |
| 14 | [U-Sub] | `rules.tex:167-174`, `:231-249` | `TypeSchemaAnalyzer.scala:92-146` | built | 536, 542 | P-45 |
| 15 | intersection of existentials | `rules.tex:176-182` | `TypeSchemaAnalyzer.scala:234-249` | built | none | P-152 |
| 16 | existential, universal reduction | `rules.tex:184-212` | `TypeSchemaAnalyzer.scala:366-608` | departs | 542, 713, 741, 786, 803 | P-152, P-157 |
| 17 | [No-Dup-…] | `rules.tex:12-26` | `OverloadingChecker.scala:453-472` | built | 373, 534, 549, 619, 682, 696, 742 | P-45, P-149 |
| 18 | [Meet-…] | `rules.tex:31-61` | `OverloadingChecker.scala:588-694`; `OverloadingOracle.scala:188-358` | departs | 537, 539, 543, 545, 546, 547, 570, 713, 741, 786 | P-45, P-60, P-149, P-152, P-155, P-157 |
| 19 | [Return-…] | `rules.tex:63-95` | `OverloadingChecker.scala:702-749`; `OverloadingOracle.scala:83-175` | departs | 398, 499, 536, 542 | P-45, P-146, F-44 |
| 20 | [R-Method], [First-Dispatchable], [Topological-Sort] | `resolve.tex:154-206` | `OverloadSet.java:330-534`, `:1455-1481` | departs | 495, 496, 499, 538, 566, 589, 706, 724, 815 | P-12, P-45, P-48 |
| 21 | [Dispatch], [M-…] | `resolve.tex:209-450`; `appendix.tex:215-623` | `OverloadSet.java:1482-1712` | departs (step 2 missing) | 404, 509, 538, 559 | P-48, P-62, P-156 |
| 22 | [Solve-Empty], [Solve-Step] | `resolve.tex:453-523` | `OverloadSet.java:1528-1706`; `Formula.scala:557-643` | departs | 496, 509, 538, 699, 706 | P-48, P-74, F-271 |
| 23 | the theorems' premises | `rules.tex:509-524`; `resolve.tex:672-1032` | none to build | | 487, 538 | P-26, P-60, P-146, F-271 |

## 0. The calculus against Fortress

- **Source.** `lang.tex:65-95` (`fig:grammar`), `:97-148`, `:224-236`; `intro.tex:203-204`; `related.tex:16-17`.
- **What FGFV has.** Traits with variance marks (`+`, `-`, `=`) and upper bounds on their type parameters; objects, always invariant, with fields; methods with type parameters that have lower and upper bounds (defaults `Bottom` and `Any`, `lang.tex:125-126`); expressions `x`, `self`, typed function values, calls, object creation with written type arguments `O⟦τ⟧(e)`, and method calls `e.m(e)` with no written type arguments. Union and intersection types and `Bottom` are internal types only (`lang.tex:236`, `:247-256`). Tuples are domain types, not values (`lang.tex:233-235`).
- **What FGFV leaves out**, which revived Fortress has: top-level functions, functional methods and closed types ("could be added back to FGFV in an obvious way", `intro.tex:203-204`), nominal exclusion and modularity (`related.tex:16-17`), tuples as values, coercion, `where` clauses, size parameters, self types, written static arguments at calls, the `override` modifier. The record reads Fortress's top-level functions and operators as the receiver-free case of FGFV's methods (`research/extracts/ParkPOPL2019-extract.md` §8).
- **What revived Fortress leaves out**, which FGFV has: declaration-site variance carried to run time (P-62; row 404), lower bounds on a method's type parameters (only the team's 2012 `dominates` clause, §4), union types at run time (§22).
- **So** each section below separates a departure from a rule (the code decides a case of the calculus otherwise) from an addition (the code decides a case that the calculus cannot express). Additions are named, not counted as departures.

## Part 1. Well-formedness

### 1. [T-Program]: a program's declarations have distinct names

- **Source.** `lang.tex:154-160` (`fig:wellformed`); prose `:261-277`.
- **Rule.** A program is well-formed when its class declarations have distinct names, each is well-formed, and its top-level expression types.
- **Example.** `trait Shape end` declared twice in one component is ill-formed.
- **Built at.** `scala_src/disambiguator/ExprDisambiguator.scala:790-792` ("Type ... is already declared."), beside the checks of top-level variables and functions (`:794-803`). The top-level expression is a component's `run()`.
- **Departs.** No. Components, apis and imports are additions (modularity). The team's table test of these refusals, `ProjectFortress/compiler_tests/Compiled9.c.fss` with its 36 pinned messages, is gated as an expected failure (`compiler_tests/XXX9c.test`), so which of its messages the tree gives today is not established by reading.
- **Rows.** None found.
- **Decisions.** None.
- **Verdict.** Built.

### 2. [D-Trait] and [D-Object]: a class declaration and its visible methods

- **Source.** `lang.tex:166-181` ([D-Trait]), `:185-201` ([D-Object]); prose `:279-293`, `:418-422`.
- **Rule.** A trait or object is well-formed when its type parameters are distinct; its bounds and the types it extends are well-formed (§7); every pair of its proper ancestors satisfies the ancestor rules (§3); a trait does not extend itself; each method is well-formed (§5); and every pair of its *visible* methods, those it declares and those it inherits, satisfies the No Duplicates Rule, the Meet Rule and the Return Type Rule, the last in both directions (§17 to §19). An object also has distinct field names and well-formed field types.
- **Example.** The paper's opening case (p. 11:2; `explorations/reviews/popl2019-examples.md` A1): `trait A m(x: Number): ZZ32 = 1 end`, `trait B m(x: Number): ZZ32 = 2 end`, `object C extends { A, B } end`: `C` sees two `m` whose domains, read with their declaring traits as receivers, `(A, Number)` and `(B, Number)`, neither nest nor exclude, and `C` declares none at their meet, so the Meet Rule fails.
- **Built at.**
  - Acyclicity: `scala_src/typechecker/TypeHierarchyChecker.scala:195-201` ("... transitively extends itself.").
  - The overloading rules on each trait's and object's visible methods: `scala_src/typechecker/OverloadingChecker.scala:360-409`, dotted methods with the receiver's self type as the first element of the domain (`:208-218`). By reading, so does the paper: [R-Method] matches the receiver's ilk with the arguments' against the declaration's domain (`resolve.tex:176-180`), and `rules.tex:268-273` omits the class `C` of `d = (C, M)` only "for presentation brevity"; the Return Type Rule in both directions at `:515-516`.
  - Distinct field names: `ExprDisambiguator.scala:948-955` ("Field ... is already declared.").
- **Departs.** Two points.
  - *The visible set.* The paper's visible methods are those declared or inherited (`lang.tex:288-290`), with no hiding: a redeclaration at an inherited declaration's parameter types is a second visible declaration, more specific by its receiver, and the three rules judge every pair. The checker reads the traits chapter's inheritance instead: `scala_src/useful/STypesUtil.scala:1671` (`providedMethods`) and `:1683` (`providedAndOverridden`) leave out of the visible set an inherited declaration that a declaration of the type's own hides, and `OverloadingChecker.scala:702-731` checks the hidden pair's return types by the Return Type Rule (`:712-714`). So a hidden declaration meets no third declaration of the set under the Meet Rule. Whether this ever decides a set otherwise than the paper's reading of all pairs is not established.
  - *Distinct type parameters.* No check that a declaration's type parameters have distinct names was found by reading (finding 3).
- **Rows.** 650 and 653 (the `override` modifier: the code generator refuses it, the checker accepts one that overrides nothing).
- **Decisions.** P-147 (an object covers an inherited abstract method by several bodies) and P-149 (an abstract functional method from one trait and a body from a sibling): both decide cases that FGFV, which has no abstract methods, cannot state.
- **Verdict.** Departs (an addition on hiding; one premise not located).

### 3. [Anc-Diff-Trait] and [Anc-Same-Trait]: the ancestor rule

- **Source.** `lang.tex:388-397` (`fig:ancestors`); prose `:368-380`; history `resolve.tex:1047-1061` (the "Ancestor Meet Rule", Steele and Chase, 2012).
- **Rule.** Two proper ancestors of a class that are instances of different traits are always fine. Two instances `T⟦α⟧` and `T⟦η⟧` of one trait are fine only if the class also has an ancestor `T⟦γ⟧` below both. For an invariant parameter that forces `α ≡ η`: a class may not extend two different instantiations of one generic trait. For a covariant parameter it asks for an instance whose argument is below both; for a contravariant one, above both (extract §2).
- **Example.** `trait Tg[\nat n\] end`, `object Both extends { Tg[\3\], Tg[\4\] } end` is ill-formed.
- **Built at.** `TypeHierarchyChecker.scala:291-300` (two entries of an `extends` clause that exclude each other: "Types ... exclude each other. ... must not extend them.") and `:304-308` (a declaration that excludes a type it extends, which, by reading, catches two conflicting ancestors at any depth), both by the exclusion test's `checkP` (`scala_src/types/TypeAnalyzer.scala:541-555`), which counts two trait types as excluding where some pair of their ancestors has one constructor with static arguments that are not equivalent.
- **Departs.**
  - *Variance.* `checkP` compares every static argument by equivalence (`TypeAnalyzer.scala:547-551`), whatever the parameter's declared variance. So for `trait C[\covariant S\]` the checker refuses `object D extends { C[\Dog\], C[\Animal\] }`, which [Anc-Same-Trait] admits with `γ = Dog` when `Dog` extends `Animal`. By reading. Finding 1.
  - *Boolean arguments.* `checkP` reads no `bool` argument (`:546`, "Todo: Handle bool args"), so `object F extends { Flag[\true\], Flag[\false\] }` passes the checker (row 406).
- **Rows.** 402 (fixed: sizes compared), 406 (booleans), 416 (walk applies no instantiation exclusion).
- **Decisions.** P-43 (the exclusion rule stays, the numbers are flat), P-97 (the specification states it in Luchangco's two parts, examples that break it marked "Not allowed"), P-25 and F-166 (the 2012 Types chapter, which restates it with `covariant`), F-44 (the checker enforces it and its Return Type Rule relies on it), P-62 (variance is future work).
- **Verdict.** Departs (built at invariance, which is all that revived Fortress runs; the variance relaxation is not built).

### 4. [Binding-Empty] and [Binding-Step]: a method's type parameter bindings

- **Source.** `lang.tex:399-411` (`fig:ancestors`); prose `:437-446`; the reasons `resolve.tex:509-523`, `:1105-1112`.
- **Rule.** A method's type parameters have lower and upper bounds, and their bindings are well-formed when (1) a reference to a method type parameter falls to the right of its declaration, (2) no method type parameter occurs in any upper bound, only in lower bounds, and (3) each parameter's union of lower bounds is below its intersection of upper bounds. (1) lets dispatch solve the parameters in one right-to-left pass; (2) keeps that pass consistent (`resolve.tex:509-523`).
- **Example.** Outside the rule: `opr SUM[\T extends AdditiveGroup[\T\]\](g: Generator[\T\]): T` (`Library/FortressLibrary.fsi:1993`) names `T` in its own upper bound. Inside it: `append[\P, Q\](x: SortedList[\P\], y: SortedList[\Q\])` with `P` a lower bound of `Q`, which Fortress cannot write (the paper's `append`, `resolve.tex:537-538`).
- **Built at.** Not in the checker, by reading:
  - Fortress's static parameters have upper bounds (`extends`). The team's grammar of 2012 also has a lower bound, `dominates`, one or the other per parameter (`ProjectFortress/src/com/sun/fortress/parser/NoNewlineHeader.rats:59-79`, `:320-332`); the specification does not state it. The checker reads it in the subtype test of one type variable against another (`TypeAnalyzer.scala:224-229`), in the inference of static arguments (`STypesUtil.scala:1028-1064`) and in the variance check (`scala_src/typechecker/VarianceChecker.scala:186-190`); the existential reduction keeps upper bounds only (§16).
  - Restriction (2) is not checked: F-bounded method parameters such as `SUM`'s type-check.
  - Restriction (1) is not checked by the checker, which binds a declaration's static parameters together (`scala_src/typechecker/staticenv/KindEnv.scala:40-51`; `TypeWellFormedChecker.scala:195-197`), so a bound may name a parameter declared after it. The code generator checks it only for a bound that is a bare static parameter: `compiler/OverloadSet.java:1501-1515` ("Bad Scoping of static parameters found during runtime inference codegen"), which reads `Y extends X`, a bound that (2) forbids, as a lower bound on the earlier `X`, the dual of the paper's orientation. Finding 5.
  - Restriction (3) has nothing to check without lower bounds.
- **Departs.** The checker accepts the library's F-bounded method parameters, which (2) excludes, so the paper's proof does not cover them (F-271). The judgement of 2026-10-23 bounds the risk: where an invariant argument position fixes the parameter, as `Generator[\T\]` does, the bound is checked and never solved, and microGPT's reductions are of that kind (`explorations/reviews/type-decisions-review/judgement.md` §5 (a)).
- **Rows.** None for (2) or (1). Row 677 (fixed) reads a `where` constraint as a bound.
- **Decisions.** F-271 (the proof leaves F-bounded functions out); P-78 (`SUM` and `PROD` are one generic reduction each over the algebra, which makes them F-bounded); P-146 (self-typed traits, whose F-bounds are trait parameters, which the rule admits); P-62 (variance, and with it the `dominates` road: `explorations/reviews/spec-refused-examples.md` item 3). The extract records "no decision yet" on the library's F-bounded functions (§8). Question 4.
- **Verdict.** Missing (no restriction of the rule is checked by the checker; the code generator checks part of (1)).

### 5. [D-Method]: a method declaration

- **Source.** `lang.tex:205-217` (`fig:wellformed`); prose `:424-435`.
- **Rule.** A method is well-formed when its type parameter bindings are (§4) and their bounds are well-formed types, its parameter names are distinct, its parameter and return types are well-formed, its body's type is below its declared return type, its class's and its own type parameters are distinct together, and every covariant or contravariant class parameter stands only at a position of its variance (§6).
- **Example.** `f(x: ZZ32): String = x` is ill-formed: the body's `ZZ32` is not below `String`.
- **Built at.** The body against the return type: `scala_src/typechecker/impls/Decls.scala:198-234` (`checkExpr(body, rt, ...)`, "Function body has type ..., but declared return type is ..."). Types: §7. Variance: §6.
- **Departs.** Additions: a declaration may leave out its return type, which the checker then takes from the body or from the api (`scala_src/typechecker/Thunker.scala`; `fortress-repo` skill, `revival-changes.md`, "Write every parameter type"); the result may convert by coercion (P-49). The distinctness premises, `distinct(x̄)` and `distinct(P̄, Q̄)`, were not located by reading (finding 3).
- **Rows.** 405 (walk runs a parameter without a type), 785 (walk refuses a more specific declaration that writes no return type).
- **Decisions.** P-49.
- **Verdict.** Built (two premises not located).

### 6. [Tc-Empty] to [Tc-Arrow-Return], flip and composition: variance of a type context

- **Source.** `lang.tex:466-534` (`fig:contextvar`); the premise in [D-Method] `:216`; prose `:448-464`, `:536-559`.
- **Rule.** Each position inside a type has a variance: the whole type is covariant; tuple elements, arrow results and a covariant trait argument keep the enclosing variance; arrow domains and a contravariant trait argument flip it; an object's arguments and an invariant trait argument are invariant. A covariant class parameter may stand only at covariant positions of a method's arrow type, a contravariant one only at contravariant positions.
- **Example.** In `trait C[\covariant S\]`, `put(x: S): ()` is ill-formed: `S` stands in an arrow domain.
- **Built at.** `VarianceChecker.scala:57-254`: the arrow's range at polarity +1 and domain at -1 (`:133-160`), a trait argument multiplied by its parameter's variance and an object's (variance 0) made invariant (`:200-254`), the flip (`:180`). It runs only on the compile path (`compiler/StaticChecker.java:288-290`, "Hack: don't run the variance checker if running the interpreter").
- **Departs.** Additions only: the check also reads abstract fields (`VarianceChecker.scala:163-178`) and a method's own static parameters' bounds (`:186-190`), which FGFV's premise, stated on the arrow type alone, does not reach.
- **Rows.** 404 (the checker accepts variance and neither path carries it to run time), 623 (fixed).
- **Decisions.** P-62 (the `covariant` keyword is future work); P-25 and F-166 (the Types chapter's `covariant`).
- **Verdict.** Built (in the checker; the run time is row 404's).

### 7. [W-Any] to [W-Object]: well-formed types

- **Source.** `lang.tex:309-366` (`fig:wellformedtypes`); prose `:295-307`.
- **Rule.** `Any` and `Bottom` are well-formed; a type parameter is where it is bound; a tuple, arrow, union or intersection is where its parts are; `T⟦α⟧` and `O⟦α⟧` are where the trait or object is declared and every argument is below its parameter's bounds, read with the arguments substituted.
- **Example.** For `trait Box[\T extends Number\]`, the type `Box[\String\]` is ill-formed.
- **Built at.** `scala_src/typechecker/TypeWellFormedChecker.scala:240-310`: unbound names (`:252`, `:309`), the bounds with the arguments substituted (`:262-305`, "The static argument ... does not satisfy the corresponding bound ..."), the count of arguments (`:306-308`), sizes against their kinds (`:123-162`).
- **Departs.** A static argument written at a top-level function call is not checked against its parameter's bound; a dotted call's is (row 470: `n[\String\]("d")` for `n[\T extends Number\](s: String): T` passes). FGFV writes no static argument at a call, so the rule reaches this case only by the obvious extension.
- **Rows.** 470.
- **Decisions.** P-42 (an unbounded parameter's bound is `Any`, as `lang.tex:125-126` says); P-55 (sizes compared by written form, an addition).
- **Verdict.** Departs (one Fortress form unchecked).

## Part 2. Typing expressions and static resolution

### 8. [T-Variable], [T-Closure], [T-Apply], [T-Object]: the conventional expressions

- **Source.** `resolve.tex:5-29` (`fig:wellformedexpr`); prose `:110-123`.
- **Rule.** A variable has its bound type; a typed function value has the arrow type of its parameters and declared result, its body below the result; a call of a function value needs each argument below the parameter type; an object creation `O⟦τ⟧(e)` needs well-formed type arguments and each field argument below its field type with the arguments substituted. Each also yields the type-annotated form of the expression that runs.
- **Example.** `(fn (x: ZZ32): ZZ32 => x + 1)(2)` has type `ZZ32`.
- **Built at.** `scala_src/typechecker/STypeChecker.scala` and the cases of `scala_src/typechecker/impls/` (`Functionals.scala` for applications and function expressions, `Misc.scala` for variables and object references). The checker writes each expression's type onto its node (`fortress-repo` skill, phase map B.6).
- **Departs.** Additions: an object's static arguments may be inferred, where FGFV writes them; arguments convert by coercion (P-49, P-59); a function expression may leave out its types (row 587 under walk).
- **Rows.** 587, 705 (walk gives an inner call no expected type).
- **Decisions.** P-49, P-51 (an inner call retried against each declaration's parameter type), P-59.
- **Verdict.** Built.

### 9. [T-Method] and [MSAV], with [Most-Specific], [More-Specific], [Applicable], [Visible], [Instantiate-Method]: static overloading resolution

- **Source.** `resolve.tex:31-87` (`fig:wellformedexpr`); prose `:125-139`; the uniqueness theorem `rules.tex:509-524` (`thm:mostspecific`).
- **Rule.** A call is typed by the most specific of the visible declarations of its name that are applicable to the arguments' static types. A declaration is applicable to a type `α` when `∃⟦⟧α ⊑ dom(d)` for some well-formed substitution (§13); one is more specific than another when its domain is below the other's, `dom(d) ⊑ dom(d')`, on the declarations' existential domains. Theorem `thm:mostspecific` guarantees a unique most specific declaration. The call is annotated with the return type of an instance of that declaration, and the annotation travels to run time (`resolve.tex:111-123`).
- **Example.** With `f(x: Shape): ZZ32` and `f(x: Circle): ZZ32`, `trait Circle extends Shape`, the call `f(c)` for `c: Circle` types by the second and is annotated `ZZ32`.
- **Built at.** `scala_src/typechecker/impls/Functionals.scala:668-850` (`typedApplicationOfChecked`): the applicable candidates (`:693-705`), the sort by specificity (`:761`), the minimal candidates (`:776`). Specificity: `scala_src/useful/STypesUtil.scala:1124-1164` (`moreSpecificCandidate`). The annotation and the set of declarations that may run: `STypesUtil.scala:1169-1199` (`isDynamicallyApplicable`, those whose domain is below the chosen one's) and `:1207-1245` (`rewriteApplicand`).
- **Departs.**
  - *Instances, not declarations.* A candidate is ranked on its domain at the static arguments inferred for the call (`STypesUtil.scala:1162`), not on the declaration's existential domain as [More-Specific] says; the declared domain is read only for a generic candidate reached by coercion or promotion (`:1156-1161`; `Functionals.scala:693-705`).
  - *Coercion first.* A candidate that needs no coercion is more specific than one that needs one (`STypesUtil.scala:1153-1155`); the attempts run without and with the expected type, without and with coercion (`Functionals.scala:733-739`). FGFV has no coercion.
  - *Ties.* Where several minimal candidates tie in a family without static parameters, the call is typed by the intersection of their return types (`Functionals.scala:721-728`); a tie that differs only where a numeral stands reads the numeral as `ZZ32` (`:784-848`); any other tie with a coercion is "Ambiguous coercion" (`:927-944`). The paper has no ties: its Meet Rule gives one most specific declaration (question 2).
  - *The inner call retried* against each declaration's parameter type (`Functionals.scala:850-902`; P-51).
  - *The annotation is not carried to run time on the compiled path* (§20, row 538).
- **Rows.** 540 and 543 (a call typed by an intersection of return types), 579 and 580 (ambiguous coercions against the one library), 391, 499 (the direct call answers by the sort's head on a tie), 538, 705.
- **Decisions.** P-45 (the 2011 model; declared domains), P-46 (a conversion never changes which declaration runs when one fits), P-49, P-51, P-60 (several most specific declarations under closed traits), P-74 (promotion).
- **Verdict.** Departs.

## Part 3. Subtyping, exclusion and the quantified types

### 10. [Sub-Params-Same] to [Sub-RIntersection]: conditional subtyping

- **Source.** `appendix.tex:6-114` (`app:condrel`, two figures); its place in the paper `rules.tex:440-450`.
- **Rule.** `α <: η` is computed by cases on the two types, as a constraint `C` over the inference variables that the types hold; `⊢ α <: η` holds where the constraint is true. A type parameter is below a type where one of its upper bounds is ([Sub-LParam]); a type is below a parameter where it is below one of its lower bounds, or is `Bottom` when there are none ([Sub-RParam], [Sub-RParam-Bottom]); an inference variable yields a primitive bound ([Sub-LParam-Infer], [Sub-RParam-Infer]); tuples compare elementwise and differ in size as `FALSE` ([Sub-Tuple], [Sub-Tuple-Size]); arrows are contravariant in the domain ([Sub-Arrow]); two instances of one trait compare argument by argument by the parameter's variance ([Sub-Trait]), of one object by equivalence ([Sub-Object-Same]); other traits and objects go through their parents ([Sub-O-Parents], [Sub-T-Parents]); a union on the left or an intersection on the right asks every part, the other way any part, and an intersection on the left is also below anything where two of its parts exclude ([Sub-LIntersection]).
- **Example.** For `trait Shape end` and `object Circle extends Shape end`, `(Circle, ZZ32) <: (Shape, ZZ32)` holds by [Sub-Tuple] and [Sub-O-Parents].
- **Built at.** `scala_src/types/TypeAnalyzer.scala:136-339` (`pSubInner`), which returns the same kind of constraint (`CFormula`, §12):
  - [Sub-Params-Same] `:197-199`; [Sub-LParam], [Sub-LParam-Any] and [Sub-Params-Different] `:201-236` (the meet of the parameter's bounds, below `t`; a `dominates` bound of the right-hand parameter `:224-229`); [Sub-RParam-Bottom] `:238-256` (with no lower bounds, only `Bottom` is below a parameter);
  - [Sub-LParam-Infer] and [Sub-RParam-Infer] `:188-191`, and an inference variable against a union or an intersection as a whole `:144`, `:169`;
  - [Sub-Tuple] `:329-331`, [Sub-Tuple-Size] by `:334-335`; [Sub-Arrow] `:320-321`, with effects;
  - [Sub-Trait] and [Sub-Object-Same] `:264-283`, by each parameter's declared variance (`:274-280`); [Sub-O-Parents], [Sub-T-Parents] and [Sub-Object-Different] `:301-317`;
  - [Sub-LUnion] `:158-159`; [Sub-RUnion] `:160-182`; [Sub-LIntersection] `:145-157`, its exclusion disjunct at `:155-156`; [Sub-RIntersection] `:141-142`.
- **Departs.** Additions for Fortress features, each outside the calculus:
  - every trait type is an `Object` except the library's `Index` (`:262`; P-42, P-156);
  - a tuple whose element types are all `Index` types is an `Index` (`:332-333`; P-156). FGFV has no rule that puts a tuple below a trait type, and its matching rule [M-Tuple-Trait] (`appendix.tex:559-560`) refuses to match a tuple against one (question 3);
  - a tuple with a `Bottom` element is `Bottom` (`:329-335`), since Fortress tuples are values;
  - a closed trait below a union of its listed types (`:160-165`), a trait that opens its `where`-clause sizes (`:292-300`), conditional parents (`:317`; P-151), self types read through their trait (`:185-186`; P-146), object expressions (`:318`), varargs tuples (`:324-328`).
- **Rows.** 773 (a member checked under a conditional extension stays callable where the condition fails), 682 (the opened sizes), 805 and 806 (the `Index` tuple rule).
- **Decisions.** P-42, P-55, P-60 (coverage is used in the overloading rules, not in this test; the union case at `:160-165`, which the team's tree already had, puts a closed trait only below the union of its listed types), P-146, P-151, P-156.
- **Verdict.** Departs (the calculus's cases built; the `Index` tuple rule decides a case the calculus refuses in matching).

### 11. [Exc-Refl] to [Exc-Object-Trait] and constructability: conditional exclusion

- **Source.** `appendix.tex:116-209` (`app:condrel`): exclusion `:118-191`, constructability of a subtype of two trait types `:195-206`.
- **Rule.** Two types exclude when no type but `Bottom` is below both. A type parameter excludes a type where one of its bounds does ([Exc-Param]); an inference variable yields a primitive exclusion ([Exc-Param-Infer]); a union excludes where every part does, an intersection where some part does or it is `Bottom`; tuples of one size exclude where some element does, of two sizes always ([Exc-Tuple], [Exc-Tuple-Size]); two instances of one object exclude where some arguments are not equivalent, two objects always; an object excludes a trait it is not below ([Exc-Object-Trait]); two traits exclude where neither is below the other and some pair of their ancestors cannot have a common subtype ([Exc-Trait]): two instances of one trait cannot where, at some parameter, an invariant argument pair is not equivalent or a covariant pair excludes; a contravariant parameter never prevents one (constructability, `:203-206`).
- **Example.** `object Red end` and `object Blue end` exclude ([Exc-Object-Different]); `Box[\ZZ32\]` and `Box[\String\]` for `trait Box[\T\]` exclude by the invariant case of constructability.
- **Built at.** `TypeAnalyzer.scala:411-412` (`excludes`) and `:492-574` (`pExcInner`):
  - [Exc-Refl] `:475` and `:507-508`; [Exc-Param] `:509-519`; [Exc-Param-Infer] `:503-506`; [Exc-Union] `:500-502`; [Exc-Intersection] `:497-499`; [Exc-Tuple] `:561-562`; [Exc-Tuple-Size] `:563-564`;
  - [Exc-Object-Different] and [Exc-Object-Trait] by `checkO` (`:534-540`: an object excludes what it is not below); [Exc-Object-Same], [Exc-Trait] and constructability by `checkP` (`:541-555`), over every pair of the two types' ancestors with one constructor.
- **Departs.**
  - *Variance in constructability.* `checkP` reads every parameter as invariant: an argument pair excludes where it is not equivalent (`:547-551`), also at a covariant parameter, where the rule asks the pair to exclude, and at a contravariant one, where the rule never excludes. By reading, under `trait C[\covariant S\]` the checker counts `C[\Dog\]` and `C[\Cat\]` as excluding although `C[\DogCat\]` is below both. Finding 1.
  - *Booleans.* No `bool` argument is compared (`:546`; row 406).
  - Additions, as `related.tex:16-17` foresees: an `excludes` clause (`checkEC`, `:523-526`), a `comprises` clause (`checkCC`, `:527-533`), arrows excluding non-arrows (`:570-572`; FGFV states no exclusion rule for arrows), and a tuple against `Index` (`:566-567`; P-156).
  - The self type of a functional method is read as the trait met with its listed types (`removeSelf`, `:575-588`); in the overloading check's exclusion test also as the trait met with the self parameter (§18; P-157).
- **Rows.** 406, 786, 713, 803 (the solver's recursion on an intersection that holds an inference variable beside its F-bound).
- **Decisions.** P-43, P-152 (exclusion over the whole parameter tuple, by existential reduction), P-157 (the self type and the bounds in the exclusion test), P-62.
- **Verdict.** Departs (built at invariance; the covariant and contravariant cases of constructability are not).

### 12. Constraints, their negation and the solver's three judgments

- **Source.** `rules.tex:358-438` (`fig:constraints`): the grammar, negation, conditional non-subtyping, equivalence and non-equivalence, the variance test, converse non-equivalence; the solver's judgments `rules.tex:252-258`; prose `:440-450`.
- **Rule.** A constraint is `TRUE`, `FALSE`, a primitive `T <: T`, `T ≮: T`, `T ⋄ T` (excludes) or its negation, or a conjunction or disjunction; `¬` distributes by De Morgan. Constraint solving (`unify`), the conversion of a type environment to constraints (`toConstraint`) and back (`toBounds`) are named as judgments without rules (`rules.tex:252-258`); the proof of `lem:reductionpreserve` uses of `unify` that its answer "represents the minimum requirement that prevents" the body from being `Bottom` (`appendix.tex:1305-1306`).
- **Example.** `Box[\$i\]` excludes `Box[\$k\]` under the constraint `¬($i ≡ $k)`.
- **Built at.** `scala_src/typechecker/Formula.scala`: the constraint forms (`:36-71`; `TPrimitive`'s six sets are the lower, upper and exclusion bounds and their negations, `:58`), `reduce` (`:365`), `implies` (`:240-247`), `negate` (`:858`), `unify` (`:665-722`), `solve` and `solveToBounds` (`:547-560`); `TypeAnalyzer.scala:361-372` (equivalence and non-equivalence).
- **Departs.** Nothing that a rule decides: where the paper gives no rules (`unify`, `toBounds`), the checker's solver is the team's own, "Dan's simple algorithm from 'Java Type Inference is Broken'" (`Formula.scala:540-545`). How the paper's open `unify` bears on row 786 is question 1.
- **Rows.** 736 (fixed: a formula reduced again on every question), 803.
- **Decisions.** None.
- **Verdict.** Built.

### 13. The well-formed substitution and [E-Sub]: existential subtyping, the paper's "more specific"

- **Source.** `rules.tex:134-147` (`fig:wellformedsubst`), `:155-162` ([E-Sub]), `:214-228` (existential subtyping); prose `:265-307`.
- **Rule.** A declaration's domain is the existential type `∃⟦K⟧(ᾱ)` over its type parameters. `Ξ ⊑ Ξ'` holds when `Ξ`, after existential reduction (§16), is below `Ξ'` at some substitution of `Ξ'`'s parameters that respects their lower and upper bounds and puts no `Bottom` in any parameter's place (`γ ≠ Bottom`, `rules.tex:159`). Only the left side is reduced (`:218-220`).
- **Example.** `∃⟦T extends Shape⟧(T) ⊑ ∃⟦U⟧(U)`: `ident[\T extends Shape\](x: T): T` is more specific than `ident[\U\](x: U): U`, at `U = T`.
- **Built at.** `scala_src/types/TypeSchemaAnalyzer.scala:150-201` (`subtypeED`, `subEDsolution`): the left side's parameters become type variables, and the right side's are solved by `STypesUtil.inferStaticParamsHelper` (`scala_src/useful/STypesUtil.scala:1014-1080`), with each parameter's bound as an upper bound of its inference variable (`:1045-1054`) and a `dominates` bound as a lower one (`:1057-1064`). The overloading oracle's `lteq` is this test on the domains with self (`scala_src/overloading/OverloadingOracle.scala:68-72`).
- **Departs.** Two, by reading.
  - *`Bottom` in a parameter's place.* `subEDsolution` calls `solve`, not `solveToBounds` (`STypesUtil.scala:1068`): a variable that no lower bound fixes takes the join of none, `Bottom` (`Formula.scala:599`), and one left open is set to `Bottom` (`killIvars`, `STypesUtil.scala:2126-2129`). So the specificity test can hold by a `Bottom` instance where [E-Sub] refuses one, as where a parameter stands only in an arrow's domain beside a bound that excludes the argument's. Finding 4.
  - *Both sides reduced.* `subtypeEDInner` normalizes both domains before comparing them (`TypeSchemaAnalyzer.scala:166-172`); the paper reduces the left. A form, not a different answer, as far as Lemma `lem:reductionpreserve` (`appendix.tex:1269-1321`) reaches.
- **Rows.** None for either.
- **Decisions.** P-45 (specificity on declared domains, the 2011 model), P-48 ("never `Bottom`", stated for a call's instance, not for this test).
- **Verdict.** Departs.

### 14. [U-Sub]: universal subtyping, used only by the Return Type Rule

- **Source.** `rules.tex:167-174` ([U-Sub]), `:231-249` (universal subtyping); prose `:289-295`, `:453-506`.
- **Rule.** An arrow type `∀⟦K⟧(α → ρ)` is below `∀⟦K'⟧(α' → ρ')` when, after the right side is reduced (universal reduction, §16), some well-formed, `Bottom`-free substitution of the left side's parameters makes the left arrow below the right one, the right side's parameters held fixed.
- **Example.** `∀⟦⟧(Circle → Circle) ⊑ ∀⟦⟧((Circle ⊓ Shape) → Shape)` by [Sub-Arrow].
- **Built at.** `TypeSchemaAnalyzer.scala:92-146` (`subtypeUA`, `subUA`): the right side's parameters into the environment (`:125-131`), the left side's inferred so that it is below (`:133-143`).
- **Departs.** Both sides are normalized (`:114-118`), the paper reduces the right; the same form as in §13. The left side's instance is inferred by `inferStaticParamsHelper` without `toBounds` (`:141`), so the `Bottom` point of finding 4 applies here too.
- **Rows.** 536 (fixed), 542.
- **Decisions.** P-45.
- **Verdict.** Built.

### 15. The intersection of existential types

- **Source.** `rules.tex:176-182`; prose `:300-307`.
- **Rule.** `∃⟦K⟧α ⊓ ∃⟦K'⟧α' = ∃⟦K, K'⟧(α ⊓ α')`, the parameters renamed apart. [Meet-Excl] and [Meet-Third] use it.
- **Example.** The meet of `∃⟦P⟧ArraySeq⟦P⟧` and `∃⟦Q extends Num⟧Seq⟦Q⟧` is `∃⟦P, Q extends Num⟧(ArraySeq⟦P⟧ ⊓ Seq⟦Q⟧)` (the paper's `ArrayList`/`List` triple, `rules.tex:314-334`, in the names of `ProjectFortress/compiler_tests/XXXOverloadExistentialMeet.fss`).
- **Built at.** `TypeSchemaAnalyzer.scala:234-249` (`meetED`): renamed apart, the "ugly meet" built and then reduced (`:245`).
- **Departs.** No; the meet is reduced at once, which the rules do at the next step.
- **Rows.** None.
- **Decisions.** P-152.
- **Verdict.** Built.

### 16. Existential and universal reduction

- **Source.** `rules.tex:184-212`; prose `:309-356`, `:490-506`; `appendix.tex:1269-1321` (`lem:reductionpreserve`).
- **Rule.** Existential reduction simplifies `∃⟦K⟧α`: it collects the constraint under which `α` is not `Bottom`, conjoins the parameters' bounds, unifies, and gives `∃⟦K'⟧σα` with the solved parameters substituted and the others bounded by what the constraint leaves (`toBounds`, which can give lower bounds as well as upper ones). Where unification fails, the type stays as it is. Universal reduction applies it to an arrow's domain and substitutes in the result. Reduction is what makes instantiation exclusion close the gap between subtyping of domains and inclusion of applicable sets (`rules.tex:309-334`).
- **Example.** The `ArrayList`/`List` triple: the meet of the first two domains reduces to `∃⟦S extends T⟧ArrayList⟦S⟧`, which is the third's domain, so the set is valid (`rules.tex:314-334`).
- **Built at.** `TypeSchemaAnalyzer.scala:366-433` (`reduceED`): the not-`Bottom` constraint (`:398`), the upper bounds (`:384-389`), the unification (`:404`) and its check (`:418`), the new parameters (`:421`, `boundsSubstitution`, `:552-608`); `normalizeED` and `normalizeUA` (`:215-231`). The emptiness tests that the overloading check's exclusion uses: `emptyED` (`:444-446`), and `meetEmptyWithBounds` (`:533-543`) over `emptyWithBounds` (`:488-526`), which reads each parameter that stands at the top of the meet as the meet of its bounds (`withBounds`, `:456-476`).
- **Departs.**
  - *Upper bounds only.* `boundsSubstitution` makes each new parameter's bounds from the images of the old upper bounds (`:552-608`); a part of the constraint that `toBounds` could hold as a lower bound is lost. By reading, this is where row 542's pair fails: for `ident(x: Circle): Circle` beside `ident[\T\](x: T): T`, `Circle` an object, the meet `∃⟦T⟧(Circle ⊓ T)` is not `Bottom` exactly where `T` does not exclude `Circle`, that is, where `Circle <: T`; the paper's reduction can keep that as a lower bound, under which [U-Sub] holds, and the checker cannot. Whether the paper's `unify` and `toBounds` give that bound is not stated (§12).
  - *Sizes.* Only type parameters get bound conjuncts (`:384-387`); a `nat` or `int` parameter passes through (`:598`, `:606`).
  - *Additions.* `emptyED`, `meetEmptyWithBounds` and `withBounds` (P-157) read a parameter's bounds at the top of the meet, where the paper's [Exc-Param] reads them, and keep a parameter inside a static argument, where the paper compares by equivalence; this matches the rules' structure. Self types are read through `withBounds`'s intersection (`:470-472`; P-157).
- **Rows.** 542, 786, 713, 803, 741 (fixed: two generic declarations excluding by instantiation exclusion).
- **Decisions.** P-152, P-157.
- **Verdict.** Departs.

## Part 4. The overloading rules

The paper requires every pair of visible declarations of one name to satisfy all three rules (`rules.tex:102-111`), on existential domains `dom(d) = ∃⟦K⟧(ᾱ)` and arrows `arrow(d) = ∀⟦K⟧((ᾱ) → ρ)` (`rules.tex:271-273`). The checker applies them in `OverloadingChecker.checkOverloading` (`scala_src/typechecker/OverloadingChecker.scala:443-522`) to three kinds of set: a component's top-level functions with the functional methods of its name and those imported (`:270-353`), each trait's and object's visible dotted methods, and each one's functional methods (`:360-409`). FGFV has only the last two kinds; the first is an addition.

### 17. [No-Dup-Triv], [No-Dup-Not-Less], [No-Dup-Not-Gtr]: the No Duplicates Rule

- **Source.** `rules.tex:12-26` (`fig:overloadingrules`); prose `:113-118`; informal `motiv.tex:230-233`.
- **Rule.** Two declarations of one name pass unless each one's domain is below the other's: the rule refuses exactly a pair with equivalent domains.
- **Example.** `dup[\T\](x: Box[\T\]): ZZ32 = 1` beside `dup[\U\](x: Box[\U\]): ZZ32 = 2` is refused (`explorations/reviews/popl2019-examples.md`, B4: "There are multiple declarations of dup with the same parameter type: Box[\T\]").
- **Built at.** `OverloadingChecker.scala:453-466`: a pair with equivalent domains (`OverloadingOracle.scala:74`, `equiv`, both ways of §13's test) is refused.
- **Departs.** Additions, from the specification:
  - two functional methods are duplicates wherever their `self` parameters stand (`OverloadingChecker.scala:455`; `fortress-repo` skill, `revival-changes.md`, "Two functional methods with equivalent parameter types are duplicates");
  - abstract functional methods count (`:119-163`), except one that a subtype's declaration at the same parameter types implements;
  - a functional with a single parameter whose type is a naked type parameter of written bound `Any` cannot be overloaded at all (`:467-472`, `:527-533`; `Specification/advanced/overloading.tex:134-164`), a restriction that only tuples as values need.
- **Rows.** 696 (fixed: the specification's text refused no pair), 682 (contested: a closed trait opened to its listed type at a `where`-clause size), 373, 549 and 742 (walk, fixed), 534 and 619 (the `Any` restriction, fixed).
- **Decisions.** P-45, P-149.
- **Verdict.** Built.

### 18. [Meet-Triv], [Meet-Excl], [Meet-Less], [Meet-Gtr], [Meet-Third]: the Meet Rule

- **Source.** `rules.tex:31-61` (`fig:overloadingrules`); prose `:119-123`, `:300-307`; informal `motiv.tex:235-237`.
- **Rule.** A pair of one name satisfies the Meet Rule where their domains exclude (their meet is below `∃⟦⟧Bottom`), where one domain is below the other, or where a third declaration of the name has a domain equivalent to their meet. Specificity and exclusion are read on existential domains, through reduction (§16).
- **Example.** The paper's `ArrayList`/`List` triple in Fortress: `m[\P\](x: ArraySeq[\P\])`, `m[\Q extends Num\](y: Seq[\Q\])` and `m[\R extends Num\](z: ArraySeq[\R\])`, with `ArraySeq` extending `Seq`, both invariant: the third is the meet of the first two (`ProjectFortress/compiler_tests/XXXOverloadExistentialMeet.fss`). The checker accepts the set; the compiled run dies (row 537) and walk refuses it at load (row 539).
- **Built at.** `OverloadingChecker.scala:588-604` (`validOverloadingInner`):
  - [Meet-Less] and [Meet-Gtr]: `oa.lteq` both ways (`:600-601`);
  - [Meet-Third]: `meetRule` (`:636-659`), a third declaration below both whose domain is equivalent to their meet (`OverloadingOracle.scala:339-358`, `isMeet`: `equivalentED` of the third's domain and `meetED` of the two);
  - [Meet-Excl]: `oa.excludes` (`OverloadingOracle.scala:322-328`): the meet of the two domains is below `Bottom`, or empty (`emptyED`), or empty once each parameter at its top is read as its bounds (`meetEmptyWithBounds`, §16); for a functional method of a self-typed trait the test reads the arrow whose `self` is `C[\X\] & X` (`OverloadingChecker.scala:540-561`, `forExclusion`).
- **Departs.**
  - *Coverage.* A pair is also valid where the declarations below both together hold every value of their overlap, cut through `comprises` clauses (`coverageRule`, `OverloadingChecker.scala:676-694`; `coversOverlap`, `OverloadingOracle.scala:188-239`), for declarations without static parameters only (`:189-190`). [Meet-Third] asks for one declaration at the meet; Theorem `thm:mostspecific` then gives one most specific declaration for every static call. Question 2.
  - *Row 786's pair.* `tint[\T extends Red\](x: Box[\T\])` beside `tint[\T extends Blue\](x: Box[\T\])`, the three objects: the reduction merges the two parameters into one bounded by both, `Box[\Bottom\]` is an instance of it, and the pair is refused. Question 1.
  - *The Meet Rule for Functional Methods* (`Specification/advanced/overloading.tex:469-529`): two functional methods with `self` at one position are valid among the top-level functionals, their meet asked of each type that provides both (`OverloadingChecker.scala:626-634`); [Meet-Third] is sought only among declarations with `self` at the pair's position (`:644-648`). An addition for functional methods.
  - *A top-level function more specific than a functional method* of its name is refused (`checkFancyRule`, `OverloadingChecker.scala:413-424`). An addition from the specification.
  - *Coverage with static parameters* is refused (row 546).
- **Rows.** 786 (contested), 713 (contested), 546, 545 (a top-level function beside functional methods over closed traits), 543, 547 (the verdict depends on the components compiled before), 570 (object expressions not checked per provider), 741 (fixed); walk: 539, 779, 787, 804, 806; the compiled run of a valid set: 537.
- **Decisions.** P-45, P-60, P-149, P-152, P-155 (symbolic operators checked), P-157.
- **Verdict.** Departs.

### 19. [Return-Triv], [Return-Not-Less], [Return-Test]: the Return Type Rule

- **Source.** `rules.tex:63-95` (`fig:overloadingrules`); prose `:123-126`, `:453-506`; informal `motiv.tex:239-243`.
- **Rule.** Where `d` is more specific than `d'`, `arrow(d)` must be below the special arrow `∀⟦κ, κ'⟧((α ⊓ α') → ρ')`, both declarations' parameters kept quantified: for every instance of the less specific declaration applicable to a non-`Bottom` type, some instance of the more specific one applicable to that type returns a subtype. [D-Trait] checks it both ways round (`lang.tex:178-179`).
- **Example.** With `trait Circle extends Shape`, `ident(x: Circle): Shape` beside `ident[\T\](x: T): T` breaks it at the instance `T = Circle`, whose result `Circle` is not above `Shape`. The paper's own case: with `List` covariant and `SortedList` invariant, `sort(x: List⟦C⟧): SortedList⟦C⟧` beside `sort(x: List⟦A⟧): SortedList⟦A⟧` breaks it, since `SortedList⟦C⟧` is not below `SortedList⟦A⟧` (`motiv.tex:313-318`).
- **Built at.** `OverloadingChecker.scala:733-749` (`returnTypeCheck`), called both ways on every valid pair (`:515-516`); `OverloadingOracle.scala:83-127` (`satisfiesReturnTypeRule`): [Return-Not-Less] where `subEDsolution` finds no instance (`:125`); otherwise the special arrow over the more specific declaration's parameters and those of the other's that the domains do not force (`:106-110`), its domain the meet and its range the less specific return type (`:111-115`), tested by universal subtyping (`:117`). The parameters that the domains force are replaced by their solutions (`forcedArgs`, `:133-152`), which is what universal reduction does.
- **Departs.**
  - *The positional rule.* Where `d` is more specific and both declare as many static parameters of their own, they must be of the same kinds position by position, and `d`'s return type below `d'`'s with `d'`'s parameters read as `d`'s (`OverloadingChecker.scala:745-748`; `OverloadingOracle.scala:161-175`). FGFV writes no static argument at a call, so the rule has no counterpart; it refuses some sets that [Return-Test] accepts. Question 5.
  - *An object domain.* `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, `Circle` an object, is refused; by reading, the paper's reduction would hold the lower bound `Circle <: T` and accept it (§16; row 542).
  - *Sizes.* A size parameter that the domains leave unsolved stays the less specific declaration's own (`OverloadingOracle.scala:98-105`). An addition.
  - *Overrides.* A declaration and one it hides are read by the same rule, both ways where their parameter types are equal (`OverloadingChecker.scala:702-731`); FGFV has no hiding (§2).
- **Rows.** 536 (fixed: one instance had been checked), 542, 499 (the positional rule, design limit), 398 (fixed).
- **Decisions.** P-45 (every instance; the positional rule), F-44 (the rule relies on instantiation exclusion), P-146 (signatures read with the plain trait type here).
- **Verdict.** Departs.

## Part 5. Dynamic dispatch

The dispatch rules are not the checker's: on the compiled path the code generator builds one dispatch method per overloaded name (`compiler/OverloadSet.java`), and walk chooses at each call (`interpreter/evaluator/values/OverloadedFunction.java:2194-2240`). The checker supplies their order (§20) and the static type of each call (§9).

### 20. [R-Method], [First-Dispatchable], [Topological-Sort]: the run-time choice

- **Source.** `resolve.tex:154-206` (`fig:dynamic`); prose `:141-152`, `:234-269`.
- **Rule.** A call carries its static return type `g`. At run time the visible declarations are sorted most to least specific, "statically determinable, so the sorting can be done at compile time", and the first whose dispatch semipredicate (§21) holds for the arguments' ilks, the receiver's among them, and for `g` runs, at the instance the semipredicate gives.
- **Example.** The paper's `append` over `SortedList` and `List` (`resolve.tex:526-669`): with ilks `SortedCons⟦C1⟧` and `Cons⟦C2⟧` and static type `List⟦C3⟧`, the `SortedList` declaration fails to match, and the `List` one runs at `[C3/P, C3/Q]`.
- **Built at.** `compiler/OverloadSet.java`: the topological sort (`:330-434`, `TopSort.depthFirstArray` at `:404`) by the checker's specificity (`fLessSpecThanG`, `:525-534`, `oa.lteq` at `:532`); the order kept (`:494-501`); each arm tested in turn, a failing one jumping to the next (`:1455-1481`).
- **Departs.**
  - *No static return type.* The dispatch method is not given the call's static type; it takes its static arguments from the statically chosen declaration and the arguments' descriptors (`OverloadSet.java:2052-2057`; row 538).
  - *Contravariance off.* With `fortress.disable.contravariance` true by default (`ProjectProperties.java:327-328`), the type structures carry no contravariant position (`OverloadSet.java:1188`), so an arrow-typed parameter is matched as if covariant in its domain, where [M-Arrow-Arrow] flips (`appendix.tex:298-301`). The team's commit `c35aac139` of 2012 turned it off (`explorations/coordinator/map/dormant-code.md:186`; `fortress-repo` skill, `compiler.md`, "Traps of the compiled path"). Finding 2.
  - *Walk* has no static types and dispatches on the run-time types alone (P-48, P-12).
- **Rows.** 538, 499, 495, 496, 566, 724, 815; walk: 589, 706.
- **Decisions.** P-48 (the instance under the static type, on both paths; walk takes the value's type until it runs the checker), P-12, P-45 (walk chooses by declared parameter types).
- **Verdict.** Departs.

### 21. [Dispatch] and the matching rules [M-…]: the dispatch semipredicate

- **Source.** `resolve.tex:209-226` ([Dispatch]), `:301-381` (`fig:match`, selected rules); all rules `appendix.tex:215-623` (`app:match`); the Cartesian product `resolve.tex:383-450` (`fig:redop`).
- **Rule.** A declaration is dispatchable to the ilks `k` and the static return type `g` when (1) matching `k` against its domain at covariance gives bounds on its type parameters that make the domain above `k`, (2) matching `g` against its return type at contravariance gives bounds that make the return type below `g`, and (3) the bounds solve (§22). Matching a ground type against a parameter at covariance makes it a lower bound ([M-Param-Co]), at contravariance an upper bound ([M-Param-Contra]), at invariance both ([M-Param-In]); arrows flip ([M-Arrow-Arrow]); a tuple never matches a trait or an object ([M-Tuple-Trait], [M-Tuple-Object]); unions and intersections give several candidate bound lists, combined as a Cartesian product.
- **Example.** `foo[\T\](x: Lst[\T\])` called on a `Lst[\String\]`: [M-Trait-In-Success] binds `T` to `String` at once, the cheap invariant case (`resolve.tex:1114-1120`; `explorations/reviews/popl2019-examples.md` A9).
- **Built at.** Step (1) in `OverloadSet.java:1482-1712` ("Runtime inference for some cases", `:1484`): each parameter's occurrences in the arm's type structures, sorted as invariant, covariant and contravariant (`:1533-1555`), an `instanceof` test of each argument against its structure (`:1474-1481`). Step (3) is §22.
- **Departs.**
  - *Step (2) is missing*: no static return type reaches the dispatcher (§20; row 538).
  - *Contravariant occurrences* not fixed by an invariant one stop the code generator, "non-invariant inference with contravariance not implemented" (`:1708-1709`); unreachable while contravariance is off (finding 2).
  - *No unions or intersections at run time*: a covariant occurrence joins without a union or the arm fails (`:1650`, "TODO: allow unions"); the run time has no class for an intersection instance (row 559).
  - *Tuples*: under P-156 a tuple value is an `Index`, which [M-Tuple-Trait] would refuse to match (question 3).
- **Rows.** 538, 559, 509, 404.
- **Decisions.** P-48, P-62, P-156.
- **Verdict.** Departs (step 2 missing).

### 22. [Solve-Empty], [Solve-Step] and the choice of instance

- **Source.** `resolve.tex:453-523` (`fig:solve`); the reason `resolve.tex:1125-1144`; lemmas `lem:solvesound` and `lem:solvecomp` (`resolve.tex:785-828`).
- **Rule.** The parameters are solved from the rightmost to the left; each takes the intersection of its upper bounds, declared and computed, which is a ground type and so never `Bottom`; that choice is matched against its declared lower bounds to bound the parameters to its left. The team had assumed the union of the lower bounds and could not prove it, nor a hybrid, so the algorithm "always chooses the intersection of the upper bounds" (`resolve.tex:1125-1144`).
- **Example.** `wrap[\T extends Number\](x: T, k: Key): Box[\T\]` beside `wrap(x: Any, k: Any): Any`, called with a `ZZ32` and a `Key` through static types `ZZ32` and `Any`: the generic arm runs, and by the rule at `T = Number` with the static return type `Any` adding nothing (row 538; extract §8).
- **Built at.** `OverloadSet.java:1528-1706`: the right-to-left order (`:1530`, "reverse order due to left to right scoping"); an invariant occurrence fixes the instance and is checked against the others and the bounds (`:1561-1638`).
- **Departs.**
  - *The lower bounds, not the upper.* With covariant occurrences only, the instance is the join of the arguments' run-time types and of the relative lower bounds (`:1640-1665`), Welterweight's "most specific instantiation", which the paper rejects; with no occurrence it is `Bottom`, "Bottom is ok" (`:1697-1703`), which [Solve-Step] never gives. P-48 decides the paper's rule; row 538 holds the gap, row 699 the failure when only the return type mentions the parameter, row 509 the join.
  - *The static checker* builds P-48's rule for a call (`scala_src/typechecker/Formula.scala:557-560`, `solveToBounds`: the meet of the upper bounds, never `Bottom`, `:628-643`), but takes the join of the lower bounds where an argument fixes the parameter (`:597-627`), as a static inference that the paper does not give (`resolve.tex:1152-1154`).
- **Rows.** 538, 699, 509, 496, 706 (walk at its bound).
- **Decisions.** P-48, F-271, P-74 (promotion of a statically chosen generic).
- **Verdict.** Departs.

## Part 6. The theorems and what they assume

### 23. `thm:mostspecific`, the dispatch lemmas and theorems, `thm:typesoundness`

- **Source.** `rules.tex:509-524` (`thm:mostspecific`); `resolve.tex:672-888` (`lem:matchsound`, `lem:matchcomp`, `lem:solvesound`, `lem:solvecomp`, `thm:dispatchsound`, `thm:dispatchcomp`); `resolve.tex:891-1032` (`lem:instance`, `lem:runtimeinstance`, `lem:fstdisp`, `thm:soundinvok`, `thm:typesoundness`); proofs `appendix.tex:1404-2996`.
- **What they say.** Under the rules above, every call has a unique most specific applicable declaration; the semipredicate is sound and complete; whatever instance the static resolution chose, the run-time choice finds an instance of the most specific declaration for the ilks whose return type is below the static one; and a well-typed program's value has a type below its static type. Only the method-call case is proved (`resolve.tex:990-995`).
- **What they assume**, and where the revival stands outside:
  - the overloading rules as stated, with [Meet-Third]'s single meet: P-60's coverage gives it up for closed traits (question 2);
  - restriction (2) of [Binding-Step]: the library's F-bounded functions are outside (F-271; question 4);
  - for the completeness of matching, that a matched type holds no `Bottom` and no type parameter inside a union or an intersection (`lem:matchcomp`, `resolve.tex:723-747`, discussed `:752-777`): a hypothesis about run-time matching, which P-146 cites as the reason for the plain signatures (question 6);
  - no functional methods, top-level functions, closed types, nominal exclusion, tuples as values or coercion (§0): a silence, "added back … in an obvious way" (`intro.tex:203-204`) but not proved.
- **Built at.** Nothing to build; the test that the compiled path keeps the theorem's promise is phase 5's dispatcher (row 538).
- **Rows.** 538, 487 (the closure caveat of coverage).
- **Decisions.** P-26, F-271, P-60, P-146.

## Findings: departures with no row and no decision

Each is by reading; none was run. Each gives the rule, the code, what follows, and what would settle it.

1. **The exclusion test reads every static parameter as invariant.**
   - *Rule.* Constructability of a common subtype (`appendix.tex:203-206`): at a covariant parameter two instances cannot have one only where their arguments exclude; at a contravariant one, never. [Anc-Same-Trait] (`lang.tex:393-397`) admits two instances of a covariant trait where a third below both is an ancestor too.
   - *Code.* `checkP` (`scala_src/types/TypeAnalyzer.scala:541-555`) excludes wherever an argument pair is not equivalent (`:547-551`), while the subtype test reads the declared variance (`:274-280`).
   - *What follows*, only under `covariant` or `contravariant` (P-62's future work; row 404 holds the run-time half): under `trait C[\covariant S\]` with `trait Dog extends Animal` and `trait Cat extends Animal`, neither excluding the other, the hierarchy check refuses `object D extends { C[\Dog\], C[\Animal\] }`, which the rule admits; and the overloading check accepts `f(x: C[\Dog\])` beside `f(x: C[\Cat\])` as excluding, though `object DC extends C[\DogCat\]`, with `trait DogCat extends { Dog, Cat }`, is below both, so `f(DC)` has no most specific declaration. Nothing on microGPT's path uses variance.
   - *Settles it.* A note on row 404, or a row of its own, for worklist item 12: "the compiled checker's exclusion test reads every static parameter as invariant, so under `trait C[\covariant S\]` it counts `C[\Dog\]` and `C[\Cat\]` as excluding and refuses an object that extends `C[\Dog\]` and `C[\Animal\]`".
2. **The compiled dispatch matches an arrow-typed parameter without contravariance.**
   - *Rule.* [M-Arrow-Arrow] flips the variance in the domain (`appendix.tex:298-301`), as [Sub-Arrow] does (`:65-67`).
   - *Code.* `fortress.disable.contravariance` is true by default (`ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:327-328`), so the dispatcher's type structures get no contravariant variance (`compiler/OverloadSet.java:1188`); the branch that would infer through a contravariant occurrence stops the code generator (`:1708-1709`).
   - *What follows.* A compiled call with function arguments can pick another declaration than walk; the record knows the switch (`explorations/coordinator/map/dormant-code.md:186`, the team's `c35aac139` of 2012; `fortress-repo` skill, `compiler.md`, "Traps of the compiled path"), but no ledger row holds it and no decision says whether phase 5's dispatcher turns it on.
   - *Settles it.* A row in the ledger's section on overloading on the compiled path, and a probe of a pair over `(Shape -> ZZ32)` and `(Circle -> ZZ32)` on both paths.
3. **The distinctness premises were not found.**
   - *Rule.* `distinct(x̄)` in [D-Method] and [T-Closure] (`lang.tex:211`; `resolve.tex:10`), `distinct(P̄)` in [D-Trait] and [D-Object] (`lang.tex:168`, `:187`), `distinct(P̄, Q̄)` in [D-Method] (`lang.tex:215`).
   - *Code.* The disambiguator gathers parameter names into a `Set[Id]` (`scala_src/disambiguator/ExprDisambiguator.scala:837-841`), whose equality compares spans (`ProjectFortress/src/com/sun/fortress/nodes/Id.java:54-72`), and its loop for two equal names in one binding group (`ExprDisambiguator.scala:766-783`) compares elements that the set already holds as distinct, within bounds (`0 until vars.size - 2`, `:776-777`) that never reach the last element. No other check was found for parameter names or static parameter names.
   - *What follows.* Not established: another phase may refuse `f(x: ZZ32, x: ZZ32)` or `g[\T, T\](x: T)`.
   - *Settles it.* One probe of each on both paths; then a row if either loads.
4. **The specificity test can hold by a `Bottom` instance.**
   - *Rule.* [E-Sub] and [U-Sub] put no `Bottom` in a parameter's place (`rules.tex:159`, `:171`); "our type system requires that both static and dynamic type inference algorithms instantiate type parameters with non-`Bottom` types" (`resolve.tex:239-241`).
   - *Code.* `subEDsolution` solves the other domain's parameters with `solve`, not `solveToBounds` (`scala_src/useful/STypesUtil.scala:1068`; `scala_src/types/TypeSchemaAnalyzer.scala:189-196`): a variable that no lower bound fixes takes the join of none (`scala_src/typechecker/Formula.scala:597-599`), and one left open is set to `Bottom` (`STypesUtil.scala:2126-2129`); `subUA` likewise (`TypeSchemaAnalyzer.scala:141`).
   - *What follows.* Where `Bottom` is the only solution, the checker reads a pair as nested that the rule does not: with `object Red end` and `object Blue end`, `f(g: Blue -> ZZ32)` is more specific than `f[\T extends Red\](g: T -> ZZ32)` at `T = Bottom`. The paper's rule reads them as neither nested nor excluding. Whether any pair of the one library turns on it is unmeasured.
   - *Settles it.* A probe of that pair; a `Bottom`-free solve in `subEDsolution` if it is accepted.
5. **A static parameter's bound may name a parameter declared after it.**
   - *Rule.* Restriction (1) of [Binding-Step] (`lang.tex:407-411`, `:438-439`).
   - *Code.* The checker binds a declaration's static parameters together (`scala_src/typechecker/staticenv/KindEnv.scala:40-51`); only the code generator refuses a bare-variable bound that names a later parameter (`OverloadSet.java:1501-1515`).
   - *What follows.* No consequence is established: the compiled dispatcher's right-to-left pass is the dual of the paper's (§4), and the paper's restriction (2), which the library breaks, is question 4.
   - *Settles it.* Phase 5's dispatcher design, which must fix one orientation.

## Questions for the curator: decisions not taken

Each sets a rule of the paper beside a decision of his that it disagrees with. The paper is the team's last word (P-26; POPL 2019, with its technical report). Where the record has weighed the point before, the place is named.

### Question 1. Row 786: is the meet of two generic declarations empty where their parameters' bounds exclude?

- **The question.** `tint[\T extends Red\](x: Box[\T\])` beside `tint[\T extends Blue\](x: Box[\T\])`, the three objects: valid (walk) or refused (the checker)?
- **The rule.** [Meet-Excl] through existential reduction, which collects "constraints C that make α different from Bottom" (`rules.tex:343-345`), with `unify` and `toBounds` named but given no rules (`rules.tex:252-258`). No instance is `Bottom` (`rules.tex:159`; `resolve.tex:239-241`, `:773-774`), and the reduction lemma assumes that the reduced bodies are not `Bottom` (`appendix.tex:1287`). By reading: the merged parameter's only instance would be `Bottom`, so the not-`Bottom` constraint cannot be met; if `unify` fails there, the meet stays unreduced and [Exc-Object-Same] over its two distinct parameters gives exclusion, so the pair is valid; if `unify` returns the merged parameter bounded by both, the meet is not shown below `Bottom` and the pair is refused. The rules state neither. The Working Draft left the same point open: "Do we want to consider only the exclusion between ground types or also the exclusion between the bounds of static parameters?" (`Specification-1.0-frozen/appendices/future.tex:265`).
- **The record.** P-48 says an instance is "never `Bottom`", for a call's type parameter. Row 786 (contested) reads P-26 as pointing to the checker's refusal; `fortress-repo` skill, `compiler.md`, "The checker's gaps": "No decision says which is right."
- **Ways.**
  - (a) *Valid.* The checker's reduction treats an existential whose parameter's bounds meet only at `Bottom` as empty, the rule row 786 names. The checker accepts such pairs and agrees with walk; the paper's ban on `Bottom` instances is read into the static test.
  - (b) *Refused.* Walk's `mayBeEqual` (`interpreter/evaluator/values/OverloadedFunction.java:1448-1472`), which today reads two type parameters as possibly one type only "unless their bounds exclude", would admit `Bottom` as their common argument, and walk would refuse the pair at load as the checker does.
- **Which keeps today's behaviour.** Neither alone: today the paths disagree.

### Question 2. P-60's coverage against [Meet-Third] and `thm:mostspecific`

- **The rule.** A pair whose domains overlap needs one declaration whose domain is equivalent to their meet (`rules.tex:57-61`), so every call has one most specific declaration statically (`rules.tex:509-524`).
- **The decision.** P-60: several declarations below both may together cover the meet through `comprises` clauses; a static call may have several most specific declarations, typed by the intersection of their return types, the declaration that runs unique only at run time.
- **Weighed before.** The judgement of 2026-10-23 found P-60 "the one step outside the designers' proven model", recorded as such, and left it standing (`explorations/reviews/type-decisions-review/judgement.md` V6; `evidence.md` N10; `Specification/appendices/changes.tex:3514-3525`).
- **Ways.**
  - (a) *Keep P-60* (today): the code-generation rows 540, 543, 546, 547, 559 and 566 stay to be built in phase 5, and row 487's closure caveat stays.
  - (b) *The Working Draft's own plan*: identify the intersection of two closed traits with the union of their common subtypes (`Specification-1.0-frozen/appendices/future.tex:269`), so that one declaration is the meet and the theorem holds; the Meet Rule's reading of `comprises` changes and the intersection-typed calls go.
- **Which keeps today's behaviour.** (a).

### Question 3. P-156's tuple rule against [M-Tuple-Trait]

- **The rule.** Tuples are domain types, not values, "trivial to add" (`lang.tex:233-235`). No subtyping rule puts a tuple below a trait type (`appendix.tex:6-114`), and the matching rule [M-Tuple-Trait] (`appendix.tex:559-560`) makes a tuple ilk fail against any trait type, so the paper's dispatcher would not apply a declaration over `Index` to a pair.
- **The decision.** P-156: a tuple whose element types are all `Index` types is an `Index`, on both paths and in the specification.
- **Weighed before.** The judgement of 2026-10-23 found the rule a departure from the Working Draft and the 2012 Types chapter, and the paper silent (`judgement.md` V2, §5). This map finds one explicit rule of the paper, in the matching rules, that bears on it.
- **Ways.**
  - (a) *Keep P-156* and give phase 5's dispatcher a case that matches a tuple ilk against `Index` element by element: a departure from [M-Tuple-Trait] in one case, after which the completeness of matching (`lem:matchcomp`, `resolve.tex:723-747`) must be checked again for it.
  - (b) *Follow the rule*: no tuple below a trait type; a matrix subscript by a pair goes another way among those the probe weighed (`judgement.md` V2), which changes P-156 and the library's subscripts.
- **Which keeps today's behaviour.** (a), whose dispatcher case is not built.

### Question 4. P-78's F-bounded reductions against [Binding-Step]'s restriction (2)

- **The rule.** "No reference to a method type parameter appears in any of the upper bounds" (`lang.tex:440`), so that dispatch can solve a call's parameters in one right-to-left pass (`resolve.tex:509-523`, `:1105-1112`); the proofs cover nothing else (F-271).
- **The decision.** P-78 makes `SUM` and `PROD` generic over the algebra, `opr SUM[\T extends AdditiveGroup[\T\]\](g: Generator[\T\]): T` (`Library/FortressLibrary.fsi:1993`), as the team's `BIG MIN` and `BIG MAX` are (`:2008-2018`). The extract records "no decision yet" on the library's F-bounded functions (§8).
- **Weighed before.** A bounded risk (`judgement.md` §5 (a)): where an invariant argument position, as `Generator[\T\]`, fixes the parameter, the bound is checked and never solved; the risk is a generic reached only by dispatch whose F-bounded parameter no argument fixes.
- **Ways.**
  - (a) *Keep the F-bounds* (today), and add to the checker a rule that an F-bounded type parameter must be fixed by an invariant position of an argument or written at the call: the risk goes to zero and the library is unchanged where its reductions take a generator; the forms without one already write their static argument (P-78, row 731).
  - (b) *Keep the F-bounds without the rule*: phase 5's dispatcher must solve F-bounds the paper does not, with no proof.
  - (c) *Follow the rule*: move each F-bound onto a trait's parameter, which the rule admits (P-146's self-typed traits), changing P-78 and the library.
- **Which keeps today's behaviour.** (a) without its rule, that is (b).

### Question 5. P-45's positional rule against [Return-Test]

- **The rule.** [Return-Test] alone decides the return types of a more specific declaration (`rules.tex:81-95`); FGFV's calls write no static arguments (`lang.tex:77-81`), so nothing in the paper aligns two declarations' parameters by position.
- **The decision.** P-45 keeps "one rule of the old sentence": where one generic declaration is more specific than another and both declare as many static parameters of their own, they line up position by position (F-75; `OverloadingOracle.scala:161-175`).
- **Where they differ, by reading.** `unwrap[\T\](x: Box[\Box[\T\]\]): Box[\T\]` beside `unwrap[\U\](x: Box[\U\]): U`, `Box` invariant: [Return-Test] holds, since at `U = Box[\T\]` both return `Box[\T\]`; read position by position, `T` for `U`, `Box[\T\]` is not below `T`, so the checker refuses the pair. P-45's reason is a call that writes its static argument, `unwrap[\ZZ32\](b)`, which dispatch would hand by position to either declaration, meaning `Box[\Box[\ZZ32\]\]` to one and `Box[\ZZ32\]` to the other (row 499).
- **Weighed before.** The extract noted that the rule "has no counterpart" in the paper and fits the 2011 paper's note (§8); no decision has weighed the sets it refuses.
- **Ways.**
  - (a) *Keep the rule on declarations* (today): such sets are refused everywhere.
  - (b) *Move it to the call*: the set stands, and a call that writes static arguments to a family whose declarations do not line up is refused, or resolved statically without dispatch.
  - (c) *Drop it*: a written static argument binds only the statically chosen declaration and dispatch infers the others' (row 499's dispatcher changes).
- **Which keeps today's behaviour.** (a).

### Question 6. P-146's reason for the plain signatures (already before him)

- **The rule.** The hypothesis that no matched type holds a type parameter inside an intersection is the completeness lemma of run-time matching (`lem:matchcomp`, `resolve.tex:723-747`, discussed `:752-777`). The static rules that read signatures, [E-Sub] for specificity and [Return-Test], state no such hypothesis (`rules.tex:155-162`, `:81-95`).
- **The decision.** P-146 gives that hypothesis as the reason why a self-typed trait's signatures keep the plain trait type.
- **Status.** Drafted for his yes or no, the reason to the history and the decision kept (`explorations/reviews/phase3-exit/corrections-draft.md` §7; review-queue item 286). This map confirms the draft's reading of the source and adds no other way.
