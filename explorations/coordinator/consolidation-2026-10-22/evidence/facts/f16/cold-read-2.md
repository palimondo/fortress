# Cold read 2 of f16/clean.txt

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these references for terms: `compiler.md`, `interpreter.md`, `specification.md`, `tests-writing.md`, `records.md` (row, ledger). Nothing else. All ten entries are facts.

Cross-references to positions (P-26, P-42, P-45, P-46, P-48, P-49, P-55, P-58, P-60) and to other facts (F-146, F-222, F-252, F-255, F-257) could not be followed, since the record is out of bounds. I note below only where an entry's meaning depends on one.

---

## F-173

**Established:** The type-inference chapter of the specification gives the rule that the compiled checker implements. Overload resolution picks the declaration first; only then are its static arguments inferred. The rule:
- A type parameter that appears nested inside a parameter's declared type (`T` in `List[\T\]`) is set by the argument at that position.
- A type parameter that is the entire declared type of one or more parameters (`x: T`), and is set by nothing else, becomes the narrowest type within its bounds that all those arguments have or coerce into. For a `ZZ32` and an `NN32` argument, that is `ZZ64`.
- If no such narrowest type exists, and no numeral breaks the tie, it becomes its bound, narrowed by what the call's expected type demands of the return type (P-48).
- A type parameter that no argument and no expected type sets also becomes its bound in this way.
- Inference never produces `BottomType` for a type parameter.

The compiled path departs from the chapter in at least these ways (the list is not complete):
1. It bounds a type parameter that has no `extends` clause by `Object`, not `Any`. The chapter's callouts say so (row 412, P-42).
2. Its prelude has no coercion from `NN32` into `ZZ64`, so a `ZZ32` and an `NN32` instantiate a type parameter at `ZZ`, not `ZZ64`. No callout mentions this (row 442).

The callouts at `inference.tex:236-298` and `:364-425` also list walk's departures. One example: walk gives `BottomType` as the return type of a function expression that declares no return type (row 587).

**Conditions:** The rule is the specification's. The two compiled departures are named as examples only ("among others"), so other departures may exist. Departure 1 lasts until the switch-over (by `compiler.md`). The plain tests cover only one case of the rule: a type parameter that is a parameter's whole type and falls back to its bound. They cover it on both paths.

**Consequence:** A worker can expect the compiled checker to follow the chapter's rule, except where the departures apply. Expect `ZZ` (not `ZZ64`) for a mix of `ZZ32` and `NN32` on the compiled path, and expect `Object` bounds. A walk function expression without a declared return type has return type `BottomType`. Do not treat these as new gaps: rows 412, 442 and 587 hold them.

**Evidence:** Plain tests `compiler_tests/InferLone*` and `tests/InferLone*Walk.fss`. Expected failure `compiler_tests/XXXInferPromoteNN32` (row 442). Rows 412, 442, 587. `compile-ladder/rung-instance-bound/REPORT.md` for the bound rule. `Specification/basic/inference.tex:47-124` for the rule, and the callout line ranges above.

**Could not resolve:**
- "no numeral settles the tie": unclear wording, and maybe a language concept I lack. The entry never says what the tie is (two or more equally narrow candidate types?) or how a numeral argument settles it. The skill does not explain how integer literals take part in inference.
- "fixes" against "narrowed by": "a type parameter that neither an argument nor the expected type fixes" takes "its bound" ("So does"). It is unclear whether the expected-type narrowing of the previous sentence also applies here. The difference between "fix" and "narrow" is implied, never stated.
- "where no argument type is narrowest" (the test sentence) does not match the rule's own condition, "where there is none". The rule's narrowest type need not be an argument's type: `ZZ64` is not the type of either argument in its example. Two readings are possible. Unclear wording.
- `compile-ladder/...`: the path is relative. It is presumably under `explorations/`. Minor.

---

## F-174

**Established:** The specification adopts the 2011 overloading model of the type research group. Declarations of one name may differ in their static parameters. A generic declaration counts as a single declaration covering all of its instances within its bounds. This states P-45 and P-42.
- The section "Declarations with Static Parameters" gives the three rules of the OOPSLA 2011 paper: No Duplicates, Return Type, and Meet.
- The section adds one restriction and labels it as the compiled path's, not the language's. Take two generic declarations with the same number of static parameters, one more specific than the other. They must declare their static parameters with the same kinds, position by position.
- The more specific declaration's return type must be a subtype of the other's, with the static parameters paired by position. So the checker refuses an override whose return type reorders its static parameters (row 398, marked fixed).
- The section "Principles of Overloading" forbids overloading a functional whose one parameter has a type parameter as its type, when that type parameter's bound is written out as `T extends Any`. A type parameter with no `extends` clause also has bound `Any`, but it is exempt. Both paths enforce this: the checker in `OverloadingChecker.checkBoundAny`, and walk since the fix of row 534.
- Neither path runs every overload set that the rules allow. Appendix I's entry "Overloading with static parameters" lists the sets each path fails:
  - row 542: the checker refuses a generic declaration next to a plain one over an object type (`ident[\T\](x: T): T` with `ident(x: Circle): Circle`);
  - row 537: the code generator fails on two generic declarations with different bounds;
  - row 539: walk refuses at load a set that the 2019 paper treats as valid, over an array list and a list;
  - rows 779 and 780: walk fails on two generic functional methods where one's declared domain lies inside the other's. Inside a trait or object without static parameters, walk refuses them at load. Inside a trait with static parameters, walk loads them, but a call that both apply to fails.

**Conditions:** The kinds restriction is the compiled path's only, not a rule of the language. The `T extends Any` ban applies only to a functional with a single parameter whose type is that type parameter. The five failing sets are known departures, each with its row.

**Consequence:** A worker must not overload a single-parameter functional whose parameter type is `T extends Any`. Leaving out the `extends` clause is allowed. A worker should not rely on either path to accept every valid set: check the listed rows first. Do not record these failures as new gaps.

**Evidence:** `Specification/advanced/overloading.tex:134-150` and `:531-674`. Appendix I entry "Overloading with static parameters". `compile-ladder/rung-spec-overloading/decision-record.md` sections 3 and 4. Rows 398, 534, 537, 539, 542, 779, 780. Code site `OverloadingChecker.checkBoundAny`. No test is named.

**Could not resolve:**
- "Also, the more specific one's return type must be a subtype ...": unclear wording. This could be a second compiled-path-only restriction, despite "one more restriction" in the singular. It could also be part of the general Return Type rule, or part of the same compiled-path restriction. I cannot tell which.
- "the checker refuses an override whose return type reorders its static parameters (row 398, fixed)": two readings, unclear wording. Either the refusal is the current, correct behaviour and row 398's defect was something else, or row 398 was the refusal and "fixed" means the checker no longer refuses. I also cannot picture what "a return type that reorders its static parameters" looks like without an example. This is partly a missing concept.
- "declared domain": a language concept I lack. `interpreter.md` says it is defined in `revival-changes.md`, which a cold reader may not open.
- "rows 779 and 780": the entry does not say which row is which case. Minor.
- "the 2019 paper's valid set over an array list and a list": no paper section or example is cited, so I cannot identify the set. Minor.

---

## F-175

**Established:** Every passage of the specification now reads a `comprises` clause at the level of values: each value of the closed trait has one of the listed types. This builds P-60, and Appendix I's entry "Traits with comprises clauses read at the level of values" records the change. Under this reading:
- When an argument's static type lies "between two closed traits", the call runs the declaration that covers the argument's value.
- If none of the overload set's declarations has static parameters, the call's static type is the intersection of the return types of its most specific declarations.

Appendix I lists five compiled-path departures:
1. The checker checks a `comprises` clause only at the closed trait's immediate subtypes (row 487).
2. The code generator crashes on a method call on a result whose type is that intersection (row 540).
3. If any declaration in the set has static parameters, the checker types the call by one of the most specific declarations, not by the intersection. This is described as deliberate (row 543).
4. The checker refuses the Meet Rule's closed-trait example when its declarations have static parameters (row 546).
5. The checker's verdict on an overload set can depend on which components were compiled before it in the same JVM (row 547).

**Conditions:** The intersection typing holds only for overload sets without static parameters. Departure 3 covers the other case. The five departures are the compiled path's. The entry says nothing about walk.

**Consequence:** On the compiled path, a worker should expect calls on intersection-typed results to crash the code generator. Expect generic sets to be typed by a single declaration. Expect the order of compilation in one JVM to change verdicts. Do not record these as new gaps. Departure 5 also means a checker result can be unreliable when the order of compilation in the JVM varies.

**Evidence:** `Specification/appendices/changes.tex:3185-3240`, with "the rows" at `:1597-1606` and `:3446-3459`. `compile-ladder/rung-spec-overloading/decision-record.md` sections 8 and 9. Rows 487, 540, 543, 546, 547. No test is named.

**Could not resolve:**
- "A call whose argument's static type stands between two closed traits": unclear wording, maybe a missing concept. "Between" could mean a supertype of both closed traits, a type that both closed traits comprise, or something else. I could not reconstruct the situation.
- "checks a `comprises` clause at the closed trait's immediate subtypes only": unclear wording. Is it checking that extenders are listed, or using the clause to decide overload coverage? And what is missed below the immediate subtypes?
- "a deliberate choice" (row 543): unclear. Whose choice, the curator's or an implementer's? Is this departure meant to stay, or is it owed work?
- "the rows at `:1597-1606` and `:3446-3459`": does "rows" mean table rows in Appendix I, or ledger rows quoted there? Minor.
- Walk: the entry is silent. I cannot tell whether walk follows the value-level reading or simply was not assessed.

---

## F-?1

**Established:** Sometimes run-time dispatch reaches a generic declaration that the static call did not select. For that case the specification takes the run-time instance from the rule of the POPL 2019 paper. This builds P-48.
- A declaration that the static call did select runs at the instance inferred for the call (see F-173).
- If an argument's value fixes a type parameter (a value of `Tag[\X\]` fixes `X`), the rule and both paths agree.
- If a type parameter is a parameter's whole type, the argument's run-time type only gives a lower bound. The rule then uses the declared bound, narrowed by what the call's static type requires of the return type.
- The callout on the dispatch paragraph says both paths use the argument's run-time type in this case instead. Walk always will, since it has no static types (P-48). The compiled path does so because its dispatcher is not given the call's static type (row 538, expected failure `compiler_tests/XXXGenericInstanceUnfixed`).
- The callout also says that the compiled path does not yet run the paragraph's second example: a generic declaration next to a plain one, reached through an argument of static type `Any` (row 496).

**Conditions:** This applies only to a declaration that dispatch reaches without the static call selecting it, and only to a type parameter that is a parameter's whole type. Walk's departure is permanent. The compiled path's departure is a defect with a gated `XXX` test.

**Consequence:** For such a type parameter, a worker should expect both paths to instantiate at the argument's run-time type, not at the bound. Fixing the compiled path means passing the call's static type to the dispatcher (row 538), and that fix will turn `XXXGenericInstanceUnfixed` red, so it must be promoted. Walk is not to be changed for this.

**Evidence:** `Specification/basic/overloading.tex:312-349`, chapter "Overloading and Multiple Dispatch", and its callout. `compile-ladder/rung-spec-overloading/decision-record.md` sections 5 and 6. Rows 538 and 496. Test `compiler_tests/XXXGenericInstanceUnfixed`.

**Could not resolve:**
- The entry's number is the placeholder "F-?1". It cannot be cited as it stands. This is a wording or record problem.
- "the call's static type" (twice): two readings. It could be the call expression's own static type, which is the return type of the declaration the static call selected. It could also be the expected type from context, which is the phrase F-173 uses for the same narrowing. If they are the same thing, one term should be used.
- "the paragraph's second example": what the first example is goes unsaid, but that does not block understanding. Minor.

---

## F-176

**Established:** A size in the specification may contain arithmetic. By the grammar, a size is one of these:
- a numeral or a name;
- a sum, a difference or a product;
- a power whose exponent is a numeral or a name;
- a bracketed size.

Two size arguments are identical when they are written the same way after every operation on numerals alone is replaced by its value. So `2 3` (a product) is identical to `6`, but `s0 s1` is not identical to `s1 s0`: there is no commutativity over names. Two types are identical when they have the same name and identical static arguments, with sizes compared this way. Two sizes are known to differ when they are different numerals. A static parameter, or a size containing one, is never known to differ from a numeral, because some instance could make them equal. This states P-55.

When walk infers a size parameter from an argument's type, it matches a numeral and binds a name. It does not solve a size written as an operation (`IntNat.unifyStaticArg`, `interpreter/evaluator/types/IntNat.java:126-147`, row 767). F-146 covers the compiled checker's handling and F-222 covers walk's arithmetic.

**Conditions:** Identity is syntactic after numerals are folded, with no algebra over names. The walk limit applies to inference of a size parameter from a call's argument types.

**Consequence:** A worker must not expect `s0 s1` to unify with `s1 s0`, nor `n + 1` to be solved for `n` under walk. A worker must treat a size that mentions a static parameter as possibly equal to any numeral. For the compiled checker's behaviour, go to F-146.

**Evidence:** `Specification/basic/types-vals-vars.tex:49-62`. `Specification/appendices/grammars/concrete-syntax.tex:533-547` (`IntExpr`). For walk: a reading of `IntNat.java:126-147` and an observation in row 767. No test is named.

**Could not resolve:**
- "Two sizes are known to differ when they are two different numerals": is this "only when"? And does it apply after numeral folding, so that `2 3` and `7` are known to differ? Probably yes, but the entry does not say. Unclear wording, minor.
- "it matches a numeral and binds a name": it is a little unclear which side is meant. I read it as the parameter's declared size: a numeral there is matched against the argument's, and a name there is bound to the argument's size. It could also mean the argument's size. Minor.
- The entry gives no compiled behaviour itself and depends on F-146 for it. That is a cross-reference, not a blocker.

---

## F-223

**Established:** The specification's No Duplicates Rule is the non-strict form from the papers: two declarations of one name may not both apply to exactly the same set of calls (2011 and 2019 papers, P-26). "Non-strict" means it is stated on applicability, not on the strict "more specific" relation. The revival's earlier text used the strict relation, under which no pair was ever refused.

The compiled checker enforces the rule, including on functional methods whose `self` stands at different positions and on an abstract functional method next to a concrete one. It reports "There are multiple declarations of f with the same parameter type" and names the domain of the declaration written first. There are two exceptions:
- It does not check symbolic operators (row 584). A duplicate pair of operators passes the checker and then stops the code generator (row 726).
- It accepts `g[\T\](a: T)` next to `g(a: Any)`, and at run time the generic one runs. It does refuse the same shape when the bound is below `Any` (row 759, not covered by a gated test).

F-252 covers walk's refusal of such pairs and F-257 its message.

**Conditions:** These are the compiled checker's checks only. Both exceptions are departures from the specification.

**Consequence:** A worker can rely on the checker to refuse duplicate pairs of named functionals, including the `self`-position and abstract-beside-concrete cases. A worker must not rely on it for symbolic operators: the failure shows up later, in the code generator. A generic declaration over `Any` next to a plain declaration over `Any` slips through and dispatches to the generic one.

**Evidence:** Tests `compiler_tests/XXXNoDuplicatesRule*`, including `XXXNoDuplicatesRuleSelfPositionsOperator` for the operator departure. Rows 584, 726, 759. `compile-ladder/rung-popl-examples/REPORT.md` section 4 and its `SKEPTIC.md` section 2, `compile-ladder/rung-duplicates-coverage/REPORT.md` sections 1 and 8, `compile-ladder/rung-checker-abstract-callsite/REPORT.md` section 1.

**Could not resolve:**
- "an abstract functional method beside a concrete one": unclear wording. "Beside" presumably means in the same scope, with the same domain. But an abstract declaration with a concrete one of the same domain is normally an override, so I cannot tell exactly which arrangement is refused.
- "`XXXNoDuplicatesRule*` gate the checker's refusals, and its departure at an operator": two readings. For the refusals, the `XXX` prefix seems to mean "compile expected to fail with this message". For the operator departure, an `XXX` test should assert the specification's answer and fail today. But the code generator also stops, so both the correct and the current behaviour are failures. I cannot tell what that test asserts, or whether it would go red when row 584 is fixed. This is a missing concept or unclear wording.
- "(row 759, which no gated test covers)": does "no gated test" cover the whole row, or only the refusal at a lower bound? Minor.
- "by which the revival's earlier text refused no pair": I understood it, but it is convoluted. Minor.

---

## F-180

**Established:** Walk has wiring for `import java`, through `ForeignComponentWrapper` and `ClosureMaker`, but five gaps keep it from working and no test uses it. In a probe, six small Java patches (two of them for gap 4) closed all five gaps. A component with two declarations bound by `import java` then printed the same output on walk as on the compiled path.

P-58 chose a different mechanism, not yet built: a body `builtinPrimitive("…")` whose string names a static Java method in `nativeHelpers/`. Both halves of it were probed: walk loading such a method, and the compiled path rewriting such a body into a call before the type checker.

Two findings affect any binding the paths share:
1. A helper raises a Fortress exception by naming a compiled-prelude class such as `fortress.CompilerBuiltin$IntegerOverflow`. Walk has no such class, so the run ends with `FortressImplementationError`, unless the probe's gap-5 patch (`gap5-helper-raise.patch`) translates the raise.
2. By reading, a helper with compiled-path classes (e.g. `FZZ32Vector`, `CompilerBuiltin$IntLiteral`) as parameter or result types cannot accept walk's values. The probe's closure converts only Java numbers, booleans, strings and `BigInteger`, and `javap` shows 50 such parameters or results in the helper classes.

**Conditions:** The patches are probe patches and are not in the tree. "Not yet built" applies to the `builtinPrimitive` mechanism. Finding 2 is by reading, not run.

**Consequence:** A worker building P-58's binding must handle two things. First, translate exceptions that name compiled-prelude classes, for walk. Second, deal with helpers whose signatures use compiled-path classes, for which walk has no conversion. A worker should not build on `import java` for walk, since P-58 chose the other way.

**Evidence:** `perf-probes/prelude/natives-shape.md` section 1 (the gaps and walk's half, subsections "What each gap does to it" and "Limits, by reading"). `perf-probes/prelude/natives-binding-probe.md` section 1 (the compiled half; its section 2 measures `import java`). `gap5-helper-raise.patch`. A `javap` count of 50. No test.

**Could not resolve:**
- "five gaps", "gap 4", "gap 5": the gaps are numbered but never described. The entry does not stand on its own here, since a reader must open the detail report to learn what they are. Unclear wording, or missing content.
- "the probe's closure": presumably the closure that `ClosureMaker` makes, as patched by the probe. Minor.
- Where `gap5-helper-raise.patch` lives is not stated. Minor.

---

## F-181

**Established:** The code generator refuses two groups of declarations (row 701):
- every function, method, object or trait declaration whose own header carries a `where` clause;
- every function or method with a contract.

A `where` clause on an `extends` entry does not hit this refusal, and neither does a trait's or object's contract. F-255 covers how each path treats those (rows 774, 781). `compiler.md`, "What the compiled path cannot compile yet", lists this refusal and the constructs the code generator has no case for, among them a local function (row 304). The entry adds that an array comprehension has no case either.

In a probe, a scratch copy of `CodeGen.java` let a `where` clause that only binds static parameters through "the trait guard". With that copy, a trait shaped like the library's `NatParam` (`trait NatP comprises { Nn[\n\] } where [\ nat n \]`, which binds a size and states no constraint) compiled and ran. `compiler_tests/XXXNatOpenRun`, which reads the size from such a value's run-time descriptor at a call, compiled but failed JVM verification (row 307).

**Conditions:** The refusal covers `where` clauses in a declaration's own header, plus contracts on functions and methods. The probe was a scratch copy and did not land. It covered only a `where` clause that binds static parameters without constraints.

**Consequence:** A compiled test must not use such a declaration, or must be an `XXX` test that names the wall. Add array comprehension to the known walls. Relaxing the guard for binding-only clauses lets a `NatParam`-shaped trait compile. Reading its size at run time still fails verification, so that is a further defect (row 307).

**Evidence:** Rows 701, 774, 781, 304, 307. `compiler_tests/XXXNatOpenRun`. `coordinator/map/spec-to-implementation.md` section 3. `perf-probes/where-clauses/REPORT.md` A.7 (the probe).

**Could not resolve:**
- "the trait guard": a term the entry never defines. I take it to be the check in `CodeGen` that refuses a trait with a `where` clause. It is unclear whether the probe also relaxed the guard for functions, methods and objects, or only traits.
- "`XXXNatOpenRun` ... compiled and failed verification": two readings. Was this with the probe's scratch `CodeGen.java`, or on the landed tree? Without the patch, I would expect the trait's `where` clause to be refused before verification.

---

## F-182

**Established:** The index builder that both paths run (`scala_src/typechecker/IndexBuilder.scala:187-189`) refuses three forms:
- a `type` alias;
- a `test Id[gens] = Expr` declaration;
- a `property` declaration.

At top level, each stops its component with `** bug! Not yet implemented:` followed by the declaration kind (e.g. `TestDecl`). Inside an object, a `property` declaration stops with an uncaught `java.lang.Error`, and a `test` declaration does not parse. The ledger rows (18 for the type alias, 121 for `test`, 122 for `property`) are observations on walk. On the compiled path, the type alias was observed to stop the same way. The other two forms are inferred by reading, because the index builder is shared. A function with the `test` modifier is a different form, and it works under `fortress test` (row 120).

**Conditions:** The rows observe walk. On the compiled path, only the type alias was observed. The inside-object behaviour is stated for `property` and `test` only.

**Consequence:** A worker must not use a type alias, a `test` declaration or a `property` declaration on either path. For tests, use functions with the `test` modifier. Supporting these forms starts in `IndexBuilder.scala`.

**Evidence:** `IndexBuilder.scala:187-189` (read). Rows 18, 121, 122, 120. `explorations/aliases-units-report.md:98-101` for the compiled type alias.

**Could not resolve:**
- "Inside an object, ...": the entry does not say which path this was seen on (presumably walk, like the rows). It also says nothing of a type alias inside an object. Minor.
- "`[gens]`": I read it as the test's generators. It is not defined, but this is minor.

---

## F-183

**Established:** The compiled path has only two array-like types, `ZZ32Vector` and `StringVector`. Both are hand-written Java classes, declared only in the compiler's prelude, and the specification does not mention them. Every element access is boxed.
- No gated test creates or indexes a `ZZ32Vector` at run time.
- Gated tests create a `StringVector`, put two strings into it with `putValue` and assert how it renders (`compiler_tests/DefaultRenderRungS`). They also read `args`, which is a `StringVector` (`Compiled2`).
- Passing either type to a generic object's constructor fails at load: the value's descriptor class is `RTTIv`, but the stamped code expects `RTTIc`. Row 408 and `compiler_tests/XXXVecCtorLoad` hold this for `ZZ32Vector`, and the probe measured `StringVector` as well.
- A native helper cannot take a Java array, because the wrapper generator skips such methods.

**Conditions:** This holds until the switch-over, when the prelude goes. The constructor failure applies to generic objects' constructors. Only `ZZ32Vector` has a gated test for it.

**Consequence:** A worker must not pass either vector type into a generic object's constructor on the compiled path. Do not count on run-time coverage of `ZZ32Vector`. Do not try to pass Java arrays to native helpers.

**Evidence:** `compiler_tests/DefaultRenderRungS`, `Compiled2`, `XXXVecCtorLoad`. Row 408. `compiler-probes/vectors/vectors.md` sections 1, 3 (step 9), 6 and 7.

**Could not resolve:**
- "its descriptor class is `RTTIv`, where stamped code asks for `RTTIc`": a concept I lack. The skill mentions descriptors only for sizes (`RTTIsize.of`). It never explains what `RTTIv` and `RTTIc` are, or what "stamped code" is. I guess it means code that the instantiating class loader produced from a template.
- "the wrapper generator skips such methods": this seems to conflict with `compiler.md`, "Natives", which says that a type with no Fortress counterpart fails the whole import. Either Java arrays are a special case that is skipped, or one of the two texts is wrong. Unclear wording or a possible conflict.
- "two hand-written Java classes declared only in its prelude": the wording mixes a Java implementation with a Fortress declaration. I read it as Fortress declarations in the prelude, implemented by hand-written Java. Minor.
