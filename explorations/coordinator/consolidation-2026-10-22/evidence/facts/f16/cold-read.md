# Cold read: facts/f16 (clean.txt)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the allowed parts of `references/` (specification.md, records.md, compiler.md, interpreter.md, tests-writing.md, library.md, exploring.md). "Row N" is read as gap-ledger row N (records.md); "callout" as a `\revision{}` box (specification.md). The P- and F- numbers that the entries cite (P-26, P-42, P-45, P-46, P-48, P-49, P-55, P-58, P-60; F-146, F-222, F-252, F-255, F-257) were not read, as the brief requires; each entry is judged on what it says without them.

All ten entries are facts.

---

## F-173 "The specification's type-inference chapter states the rule that the compiled checker builds"

**Established:** The specification's type-inference chapter describes the same inference order that the compiled checker implements: first the call picks a declaration, and only then are that declaration's static arguments inferred. Within that, a type parameter that is the entire declared type of one or more parameters (`T` in `x: T`) is instantiated at the narrowest type among the argument types and the types those arguments coerce to. If no candidate is narrowest, the parameter gets its bound. A type parameter that nothing fixes gets its bound, never `BottomType`. The chapter's `\revision` callouts list where the paths depart from it. The compiled path has two departures: its prelude has no conversion between `ZZ32` and `NN32` (row 442), and it bounds an unbounded type parameter by `Object`, not `Any` (row 412, P-42). Walk has departures too, for example a function expression with no declared return type gets the result type `BottomType` (row 587).

**Conditions:** The chapter text, at `inference.tex:47-124` (the rule) and `:292-295`, `:356-425` (the callouts). The narrowest-type rule covers only a type parameter that makes up a parameter's whole declared type. The entry does not say what happens to a type parameter that appears only inside a parameter type, such as `x: List[\T\]`. The compiled departures listed are only "two". Walk's departures are given only by example ("such as").

**Consequence:** A worker can treat the chapter as the specification of the compiled checker's inference order and of the bound rule. Any program that relies on a ZZ32/NN32 conversion, on `Any`-bounded instantiation at tuple types, or on walk's typing of a bare function expression will hit the listed departures. A change to the lone-parameter rule must keep the `InferLone*` tests green on both paths.

**Evidence:** `Specification/basic/inference.tex:47-124`, `:292-295`, `:356-425`. Plain gated tests: `compiler_tests/InferLone*` (compiled) and `tests/InferLone*Walk.fss` (walk). Detail: `compile-ladder/rung-instance-bound/REPORT.md`.

**Could not resolve:**
- "Plain tests gate the first rule on both paths": unclear wording. "The first rule" could be the title's rule (declaration first, then inference) or the first rule of the paragraph (the narrowest-type rule for a lone `x: T`). The test name `InferLone` suggests the second, but the sentence does not say so.
- "the narrowest of those arguments' types and the types to which they can be coerced": a missing language concept and unclear wording. The number types are siblings (SKILL.md), so subtyping cannot order `ZZ32` against `ZZ64`. The entry does not say which order "narrowest" uses (subtyping, coercion direction, or both). It also does not say whether the result must be a type that every one of the arguments fits.
- "A type parameter that nothing fixes": "fixes" is not defined, either here or in the skill beyond "a type parameter that a call does not fix takes its bound". This leaves the nested case (`List[\T\]`) open.
- "the conversion between `ZZ32` and `NN32`": unclear wording. The direction is not given (ZZ32 to NN32, NN32 to ZZ32, or both).
- `BottomType` against the skill's "empty type `Bottom`": I take these to be the same type, but the entry does not say so.
- "It states P-46, P-48 and P-49": these are pointers I could not read. The entry does not say which part of the paragraph belongs to which position.

---

## F-174 "The specification states the type group's 2011 overloading model"

**Established:** The specification adopts the type group's 2011 overloading model. Overloads of one name may differ in their static parameters, and a generic declaration is treated as the set of its instances (its instantiations). The section "Declarations with Static Parameters" gives the three rules of the OOPSLA 2011 paper: No Duplicates, Return Type and Meet. The specification adds one restriction, labelled as a limit of the compiled path rather than of the language. When one generic declaration is more specific than another generic declaration with the same number of static parameters, the two must declare those parameters with the same kinds (type, nat, int, bool, opr) in the same positions (row 398). A functional whose one parameter has a type parameter as its type, with `extends Any` written explicitly, cannot be overloaded. A type parameter with no `extends` clause is exempt. Walk enforces this rule (row 534, fixed). Neither path accepts and runs every overload set that the rules allow. Appendix I's entry "Overloading with static parameters" lists which sets fail where: row 542 (checker), 537 (code generator), 539 (walk, Meet Rule search), 779 and 780 (walk).

**Conditions:** The rules are the language's. The same-kinds restriction is the compiled path's alone, and only for two generic declarations with equal numbers of static parameters where one is more specific. The `T extends Any` ban needs both the bound to be written and a single parameter.

**Consequence:** A worker must not treat the same-kinds restriction as a language rule, for example in walk or the specification. A program with a valid overload set may still fail on one path for the reasons in the listed rows, so a failure of that shape should first be matched against rows 542, 537, 539, 779 and 780. A worker must not add a `f[\T extends Any\](x: T)` overload. Writing `f[\T\](x: T)` is outside that rule.

**Evidence:** `Specification/advanced/overloading.tex:134-150` and `:531-674`; Appendix I, entry "Overloading with static parameters"; `compile-ladder/rung-spec-overloading/decision-record.md` sections 3 and 4. No test is named for the fact as a whole.

**Could not resolve:**
- "a declaration with static parameters is read over its instances": unclear wording, and the concept is missing from the skill. I read it as "the overloading rules are applied to each instantiation", but it could also mean "the declaration's domain is the union of its instances' domains".
- "A functional ... cannot be overloaded ... walk applies it (row 534, fixed)": unclear wording. The entry does not say whether this ban is the language's rule (from the specification) or a path's limit, and it does not say whether the compiled checker applies it. "Functional" as a noun is not in the skill. I read it as "function or method".
- Row 542, "a more specific declaration over an object type": unclear wording. It could mean a declaration whose parameter is an object type and is more specific than a generic one, or something else.
- Rows 779 and 780, "two generic functional methods one inside the other": two readings. One is lexical nesting (a generic method inside a generic trait inside another). The other is domain containment (one method's domain inside the other's).
- Row 539, "the Meet Rule's search": unclear wording. It is not said what walk's search fails to find.
- P-45 and P-42: pointers I could not read.

---

## F-175 "The specification reads a `comprises` clause at the level of values in every passage"

**Established:** Every passage of the specification now reads a `comprises` clause "at the level of values". I take this to mean that every value of the closed trait has one of the listed types. Appendix I's entry "Traits with comprises clauses read at the level of values" records this change. The compiled checker departs from it in five ways:
- it checks a `comprises` clause only against the closed trait's immediate subtypes (row 487);
- it crashes on a method call on a result whose type is the intersection of its candidates' return types (row 540);
- for generic families, it types such a call by "the head of a sort" (row 543);
- for generic families, it refuses the Meet Rule's case for closed traits (row 546);
- its verdict on an overload set can depend on which components were compiled earlier in the same JVM (row 547).

**Conditions:** The specification's text everywhere. The departures listed are the compiled checker's only. Walk is not covered here. (interpreter.md says walk checks only the main component's clauses.)

**Consequence:** When the checker's verdict involves a `comprises` clause, a worker should check rows 487, 540, 543, 546 and 547 before treating the verdict as correct. A checker verdict that changes with compile order (row 547) is a known defect, not a new finding. Implementations should follow the value-level reading.

**Evidence:** `Specification/appendices/changes.tex:3185-3240`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 5 to 9. No test is named.

**Could not resolve:**
- "at the level of values": a missing language concept. The skill says only "every value has a listed type". The entry does not say what the other reading was (for example, the level of types, meaning every subtype extends a listed type). It also does not say what the value-level reading changes for coverage, exclusion or overloading.
- "It builds P-60" against F-173's "It states P-46...": unclear wording. I cannot tell whether "builds" and "states" mean different things (the text realises a decision, versus the text restates it).
- "a closed trait": not defined in the skill. I read it as "a trait with a `comprises` clause".
- "in a family with static parameters, it types such a call by the head of a sort (row 543)": unclear wording, and the concept is missing. "Family" (overload set? trait family?) is not defined. "Such a call" could be the method call on an intersection-typed result, or any call typed by an intersection. "The head of a sort" (the first of the candidates after sorting by specificity?) is not explained.
- "refuses the Meet Rule's case for closed traits (row 546)": unclear wording. It is not said which case of the Meet Rule this is (presumably a meet covered by the `comprises` clause).

---

## F-?1 "The specification gives the run-time instance of a dispatched generic declaration by the POPL 2019 paper's rule"

**Established:** When dispatch picks a generic declaration at run time, the specification's overloading text says which instance runs, using the POPL 2019 paper's rule. Where the argument value does not determine a type parameter, the rule instantiates that parameter at its bound "under the call's static return type". The dispatch paragraph's callout says that neither path does this. Both use "the value's type" instead (row 538, recorded by the expected-failure test `compiler_tests/XXXGenericInstanceUnfixed`). The callout also says that the compiled path does not yet run the paragraph's second example: a generic declaration beside a non-generic one, reached through an argument whose static type is `Any` (row 496).

**Conditions:** Only for a dispatched generic declaration and a type parameter that the value does not fix. Row 496 is the compiled path only.

**Consequence:** A worker must not take either path's instance choice for an unfixed type parameter as the specification's. Fixing row 538 turns `XXXGenericInstanceUnfixed` red, so the test must then be promoted. A program that dispatches through an `Any`-typed argument to a generic-beside-plain pair is not yet runnable on the compiled path.

**Evidence:** `Specification/basic/overloading.tex:312-349` and its callout; `compiler_tests/XXXGenericInstanceUnfixed` (row 538); `compile-ladder/rung-spec-overloading/decision-record.md` sections 5 to 9. Inference itself is in F-173.

**Could not resolve:**
- The entry number "F-?1" is a placeholder, not a permanent number, so the entry cannot be cited (records.md: each entry starts with its permanent number).
- "gives the parameter its bound under the call's static return type": unclear wording. One reading is "the parameter's declared bound, narrowed by the call's static return type". Another is "the instance whose return type falls under the call's static return type". "Its bound" could be the declared bound or a bound computed from the return type.
- "Where the value does not fix a type parameter ... both paths take the value's type there instead": unclear wording. If the value does not fix the parameter, it is not said which "value's type" the paths use (the argument's run-time type? the whole argument tuple's?). The two halves read as contradictory.
- "It builds P-48" against F-173's "states ... P-48": the same "builds" and "states" question as F-175. P-48 is a pointer I could not read.
- The path `Specification/basic/overloading.tex` here against `Specification/advanced/overloading.tex` in F-174 and interpreter.md: I cannot tell whether these are two files or a slip. I did not check the tree, as the brief requires.

---

## F-176 "The specification allows arithmetic in a size"

**Established:** A size (a static argument of kind nat or int) may be an arithmetic expression. The grammar allows a numeral, a name, a sum, a difference, a product, a power whose exponent is a numeral or a name, or a bracketed size. Two size arguments are the same when they are written identically after every operation on numerals alone has been evaluated (for example, `2+3` becomes `5`, but `n+1` stays as written). Two types are identical when their size arguments are identical in this sense. A static parameter such as `n` is not known to differ from a numeral. Walk's inference of a size parameter from an argument's type works only in two cases: matching a numeral, or binding a bare name. It never solves a size written as an operation (such as `n+1`) (`IntNat.unifyStaticArg`, row 767).

**Conditions:** Identity is syntactic after folding. Nothing suggests commutativity or other algebra (`n+1` and `1+n` differ). The walk limit applies to inference from a call's argument type. Walk's size arithmetic in general is in F-222, and the compiled checker's treatment is in F-146.

**Consequence:** A worker can rely on `A[\2+3\]` being identical to `A[\5\]` in the specification, and must not expect `A[\n+1\]` to match `A[\1+n\]`. Because a static parameter is not known to differ from a numeral, a type at `n` cannot be assumed to exclude a type at `3`. A walk program that needs a size parameter inferred from an operation in a parameter type will not have it inferred.

**Evidence:** `Specification/basic/types-vals-vars.tex:49-62`; `Specification/appendices/grammars/concrete-syntax.tex:533-547` (`IntExpr`); walk's code at `interpreter/evaluator/types/IntNat.java:126-147` (read); observed in row 767. No gated test is named.

**Could not resolve:**
- "A static parameter is not known to differ from a numeral": unclear wording, with the consequence left unstated. I read it as "the type rules may not conclude that `n` and `3` are different (so the two types are neither identical nor exclusive)". The entry does not say what this blocks (exclusion, overloading, or identity).
- "once each operation on numerals is replaced by its value": unclear wording at the edges. It is not said whether brackets are dropped (`(n)` against `n`), or whether partial folding inside a mixed expression (`n + (2+3)` to `n + 5`) counts.
- P-55, F-146 and F-222: pointers I could not read. The compiled checker's behaviour on size arithmetic is left entirely to F-146.

---

## F-223 "The specification's No Duplicates Rule is the papers' non-strict rule"

**Established:** The specification's No Duplicates Rule is the rule from the type group's 2011 and 2019 papers (P-26): two declarations of one name must not have exactly equal applicability, where each applies to every call that the other applies to. The compiled checker enforces it, including on functional methods whose `self` parameters sit at different positions and on an abstract functional method beside a concrete one. The message is "There are multiple declarations of f with the same parameter type", naming the domain of whichever declaration comes first in the source. The two exceptions:
1. The checker does not check symbolic operators (row 584). So a duplicate operator pair gets past it and then stops the code generator (row 726).
2. It accepts `g[\T\](a: T)` beside `g(a: Any)` and the generic one runs. With a bound below `Any`, the same pair is refused (row 759).

**Conditions:** Compiled checker only. Walk's refusal is in F-252, and its message in F-257. The exceptions are operators and the generic-against-`Any` pair at the `Any` bound.

**Consequence:** A worker can expect the checker to refuse equal-domain pairs with that message, and should not pin which declaration the message names except by source order. A duplicate operator pair will not be caught by the checker and will surface as a code-generator stop. Fixing row 584 changes `XXXNoDuplicatesRuleSelfPositionsOperator`.

**Evidence:** `compiler_tests/XXXNoDuplicatesRule*` (the refusals) and `XXXNoDuplicatesRuleSelfPositionsOperator` (the operator departure); `compile-ladder/rung-popl-examples/REPORT.md` section 4 and its `SKEPTIC.md` section 2; `compile-ladder/rung-duplicates-coverage/REPORT.md` sections 1 and 8; `compile-ladder/rung-checker-abstract-callsite/REPORT.md` section 1.

**Could not resolve:**
- "two declarations of one name may not each be applicable to every call to which the other is": two readings. The intended reading must be "it may not be that both apply to all of each other's calls", meaning equal domains are forbidden. The other reading is "neither may apply to all of the other's calls", which would forbid every more-specific overload. "Each" pulls toward the second.
- "non-strict rule": a missing concept. The strict rule it is set against is not named, so I cannot say what "non-strict" excludes beyond the definition given.
- "with two exceptions": unclear wording. The title ties the exceptions to "functional methods", but the second exception (`g[\T\]` beside `g(a: Any)`) is about functions in general. I identified the two exceptions by inference. The entry does not label them.
- "Gated by `compiler_tests/XXXNoDuplicatesRule*`: the checker's refusals, and its departure at an operator": unclear wording. Both are `XXX` tests. The entry does not say what the operator test asserts, or how it tells "the code generator stops" apart from the specification's answer "the checker refuses" when both make the compile fail. So I cannot tell whether that test turns red when row 584 is fixed.
- "runs the generic one": the run is the compiled path's (the checker runs nothing). This is minor.

---

## F-180 "`import java` is wired on walk ... but five gaps stop it and no test uses it"

**Established:** Walk has the plumbing for `import java` (`ForeignComponentWrapper`, `ClosureMaker`), but five gaps stop it from working and no test uses it. A probe closed the five gaps with six small Java patches. After that, a small `import java` component printed on walk the same output as on the compiled path. P-58 chooses a different binding mechanism: a declaration whose body is `builtinPrimitive("…")`, with the string naming a static Java helper. Both halves were shown in probes: walk loading such a helper, and the compiled path rewriting such a body into a call during the parse. Two findings constrain any helper shared by both paths:
- A helper that raises a Fortress exception does so by naming a compiled-prelude class (for example `fortress.CompilerBuiltin$IntegerOverflow`). Walk has no such class, so without the probe's fifth patch the run ends with `FortressImplementationError`.
- A helper whose parameter or result types are compiled-path classes (`FZZ32Vector`, `CompilerBuiltin$IntLiteral`) cannot accept walk's values. The helpers have 50 such parameters or results.

**Conditions:** The `import java` result holds only with the probe's patches, which are not said to be in the tree. The P-58 halves "ran as probes", so presumably they are not landed either. The two findings apply to any binding that both paths share.

**Consequence:** A worker building P-58's shared binding must either give walk a way to raise the exception (the fifth patch's role) or keep helpers from naming compiled-prelude exception classes. Helpers with compiled-path parameter or result types need reworking or wrapping before walk can call them (50 places). A worker must not assume `import java` works on walk today.

**Evidence:** Probes, not gated tests. `perf-probes/prelude/natives-shape.md` section 1 (walk's half: gap 5, and "Limits, by reading"); `perf-probes/prelude/natives-binding-probe.md` sections 1 and 2 (the compiled half).

**Could not resolve:**
- "the probe's fifth patch": unclear wording. Two probes are in play: the `import java` probe with six patches, and the `builtinPrimitive` half-probes. The sentence sits in the `builtinPrimitive` part, but "fifth patch" points back to the six patches. The Detail line ("walk's half: gap 5") suggests one note covers both, but the entry does not say so.
- "a static Java helper": unclear wording. It could be a static method or a class of static methods. interpreter.md's walk natives name a class (`...glue.prim.X`), so it matters which one the string names.
- "the helpers have 50 such parameters or results": unclear wording. It is not said which helpers are counted (all of `nativeHelpers/`? the ones the prelude binds?).
- "a two-declaration `import java` component": unclear wording. It could be a component with two declarations, or an import of two Java declarations. This is minor.
- Whether either P-58 half is in the landed tree: not said. P-58 is a pointer I could not read, so its built state is unknown.

---

## F-181 "The code generator refuses every function, object and trait declaration that carries a `where` clause in its own header"

**Established:** The code generator refuses any function, object or trait declaration whose own header has a `where` clause, and any function with a contract (row 701). Two things escape this guard. A `where` clause on an `extends` entry is not refused, and a trait's or object's contract never reaches the code generator. F-255 covers both (rows 774, 781). compiler.md lists this refusal and the constructs the code generator has no case for, including local functions (row 304). The array comprehension is one more construct with no case. In a probe, the guard was disabled on a scratch copy of `CodeGen.java`. With that, the library's `trait NatParam comprises { N[\n\] } where [\ nat n \]` compiled and ran, though its `where` clause only binds a size and states no constraint. But "opening its value" at a call failed JVM verification (row 307).

**Conditions:** The guard is on the declaration's own header only. The probe result holds only for a `where` clause that binds a size and constrains nothing, and only on the scratch copy.

**Consequence:** Compiled code cannot use these declarations yet. Removing the guard is not enough, because row 307 then shows. A compiled test that needs a `where` clause, a contract, a local function or an array comprehension must be an `XXX` test naming the wall (compiler.md, tests-writing.md).

**Evidence:** Row 701; `coordinator/map/spec-to-implementation.md` section 3; the probe, `perf-probes/where-clauses/REPORT.md` A.7; row 307.

**Could not resolve:**
- "every function, object and trait declaration ... and every function with a contract": unclear wording, and it differs from compiler.md, which says "a function, method, object or trait declaration" and "a function or method with a contract". I cannot tell whether "function" here includes methods or whether the entry is deliberately narrower.
- "opening its value at a call": a missing language concept. I read it as unpacking a value of a type bound by a `where` clause to get its size `n` (an existential open). Neither the skill nor the entry defines it, and it is not said which call does the opening.
- F-255: a pointer I could not read. How each path reads an `extends`-entry `where` clause and a trait contract is left to it. compiler.md partly covers this: the `extends` case compiles, and the disambiguator drops trait and object contracts.

---

## F-182 "Both paths refuse a `type` alias, a `test` declaration of the form `test Id[gens] = Expr`, and a `property` declaration"

**Established:** The index builder, a phase both paths run, does not implement three declaration forms: `type` aliases, `test Id[gens] = Expr` declarations, and `property` declarations. Any component containing one stops with `** bug! Not yet implemented:` followed by the declaration kind (for example `TestDecl`). The rows are 18, 121 and 122. A function marked with the `test` modifier is a different form, and it does run under `fortress test` (row 120).

**Conditions:** Both paths, at the index builder (`scala_src/typechecker/IndexBuilder.scala:187-189`). The `test`-modifier function form is exempt and runs under `fortress test`, which is walk (compiler.md).

**Consequence:** A worker must not use these three forms in any program, library code or test. Write tests as `test`-modifier functions or as ordinary `run()` tests. Implementing any of the three starts in the shared index builder and affects both paths.

**Evidence:** `scala_src/typechecker/IndexBuilder.scala:187-189`; rows 18, 121, 122 and 120. No test is named.

**Could not resolve:**
- "rows 18, 121 and 122": unclear wording. It is not said which row records which form. Order would suggest alias=18, test=121, property=122, but that is a guess.
- "`[gens]`": I read it as a generator list, but the entry does not define it. This is minor.
- "(row 120)": unclear wording. I cannot tell whether row 120 records that the `test`-modifier form works or records a gap in it.

---

## F-183 "The compiled path's only array-like types are `ZZ32Vector` and `StringVector`"

**Established:** On the compiled path, the only array-like types are `ZZ32Vector` and `StringVector`. These are two hand-written Java classes, declared only in the compiler's prelude, and the specification does not mention them. Every element access boxes. No gated test creates or indexes a `ZZ32Vector` at run time. Gated tests do create and write a `StringVector` (`compiler_tests/DefaultRenderRungS`) and read `args`, which is a `StringVector` (`Compiled2`). Passing either type to a generic object's constructor fails at class load: the type's descriptor class is `RTTIv`, but the instantiated ("stamped") code expects `RTTIc` (row 408, `compiler_tests/XXXVecCtorLoad`). A native helper cannot take a Java array, because the wrapper generator skips such methods.

**Conditions:** Compiled path, until the switch-over (the prelude is deleted then, per compiler.md). The `ZZ32Vector` run-time behaviour is untested by the gate.

**Consequence:** A worker must not expect working `ZZ32Vector` element access to be covered by the gate. A worker must not pass either vector type to a generic constructor on the compiled path, and must not design a helper that takes a Java array. A fix of row 408 promotes `XXXVecCtorLoad`. A worker should not add new uses, since these types live in the prelude, which will be deleted.

**Evidence:** `compiler_tests/DefaultRenderRungS`, `Compiled2`, `compiler_tests/XXXVecCtorLoad` (row 408); `compiler-probes/vectors/vectors.md` sections 1, 6 and 7.

**Could not resolve:**
- "its descriptor class is `RTTIv`, where stamped code asks for `RTTIc`": a missing concept. The skill names only `RTTIsize.of`. What `RTTIv` and `RTTIc` are, and why they differ, is not explained. "Stamped code" I read as code that the class loader instantiates from a template (SKILL.md, "The compiled run time").
- "A native helper cannot take a Java array, since the wrapper generator skips such methods": an apparent conflict with compiler.md. compiler.md says that if a type has no Fortress counterpart, the wrapper generator "fails the whole import", not that it skips the method. Either Java arrays are a special case or one text is wrong.
- "make and write a `StringVector`": two readings. "Write" could mean storing elements into it or printing it.
