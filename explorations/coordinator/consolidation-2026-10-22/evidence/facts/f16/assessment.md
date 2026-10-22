<!-- Chunk f16 of the FACTS clarity assessment: F-173, F-174, F-175, F-176, F-223, F-179, F-180, F-181, F-182, F-183, F-184 and F-185, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `8c99c2413`. -->

# FACTS chunk f16: assessment

The base is `main` at `8c99c2413`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the specification, the reports, the gap ledger, the tests and the code. I ran no experiment and searched no transcript.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-173 | **fail** | pass | **fail** | **fail** | pass | **fail** | **reword** |
| F-174 | pass | pass | **fail** | **fail** | pass | **fail** | **reword** |
| F-175 | pass | pass | pass | **fail** | **fail** | pass | **reorganize** |
| F-176 | pass | pass | **fail** | **fail** | pass | pass | **reword** |
| F-223 | **fail** | pass | pass | **fail** | **fail** | **fail** | **reorganize** |
| F-179 | pass | pass | pass | pass | pass | pass | keep |
| F-180 | pass | pass | **fail** | **fail** | pass | pass | **reword** |
| F-181 | pass | **fail** | pass | **fail** | **fail** | pass | **reorganize** |
| F-182 | pass | pass | **fail** | **fail** | pass | pass | **reword** |
| F-183 | **fail** | pass | **fail** | pass | pass | pass | **reword** |
| F-184 | pass | pass | pass | pass | pass | pass | keep |
| F-185 | pass | pass | pass | pass | pass | pass | keep |

Counts: keep 3, reword 6, reorganize 3, investigate 0. Every fail below has a known resolution in the cited or same-subject evidence, so no entry needs a question settled first.

## F-173, the specification's inference chapter

- **Scope: fail.** Quoted: "The checker departs only at `ZZ32` with `NN32` on the compiler prelude (row 442)." The chapter's own callout names another compiled departure: a type parameter declared without an `extends` clause is bounded by `Object` on the compiled path, so a call that nothing else fixes, where the expected type is `()`, is a static error there (`Specification/basic/inference.tex:356-363`; row 412, NEGATIVE-VERIFIED, class "implementation gap (checker)"). The chapter's opening callout says the same (`:37-40`). The rule the entry states, "else its bound", is `Any` for such a parameter by the chapter (`:89-98`), and the compiled path gives `Object`. So "only" claims more than the evidence. The plain test of the unbounded case, `compiler_tests/InferLoneUnbounded.fss`, writes `T extends Any` explicitly, so it does not show the unwritten case.
- **Present meaning: pass.** The rule, the departures and the tests are stated in the present.
- **Evidence: fail.** The rule is in the chapter (`inference.tex:47-124`: the choice from `:54`, then the instantiation; the lone parameter at `:77-98`; the unfixed parameter at `:99-118`, never `BottomType`). The tests exist: `compiler_tests/InferLoneBound`, `InferLoneBoundThree`, `InferLoneUnbounded`, `InferLoneUnionClosedTrait`, and `tests/InferLoneBoundWalk.fss`, `InferLoneUnboundedWalk.fss`, `InferLoneBoundMentionsParamWalk.fss`. Rows 442, 587, 589, 591, 592 and 616 are open (NEGATIVE-VERIFIED). But the route fails. Quoted: "Detail: `compile-ladder/rung-spec-inference/decision-record.md` section 3.1." Section 3.1's new text is "section 2 above", and section 2 states the superseded rule: "otherwise, unless the numeral rule settles the tie, the union of the arguments' types". The bound rule came from `compile-ladder/rung-instance-bound/` (the history's earlier `from` line), which the entry no longer names. Neither rung folder names row 442, so the cited detail does not hold "departs only at row 442".
- **Comprehension: fail.** Quoted: "A lone type parameter takes the narrowest of its arguments' types and their coercion targets, else its bound". "Lone type parameter" is the record's own term: neither the `fortress-repo` skill nor POSITIONS defines it. The chapter's words are "a type parameter that is the whole declared type of one or more parameters" (`inference.tex:77-78`). Also quoted: "Callouts give walk's departures (rows 587, 589, 591, 592, 616)." This is a bare list of numbers, and it reads as complete. The chapter's callouts name further walk rows: 20, 307, 510, 716, 717, 760, 761 and 762 (`inference.tex:292-295`, `:402-425`).
- **Ownership: pass.** One subject: what the chapter states and how each path meets it.
- **Consistency: fail.** P-42 says: "while it uses the compiler's prelude, it bounds such a parameter by `Object`, and so refuses a generic instantiated at a tuple (gap-ledger row 412)." F-173 says that the checker's only departure is row 442. The entry does not link P-42, and it does not say that the two scopes differ.
- **Disposition: reword.** Name both compiled departures that the chapter's callouts give: row 442 (no `ZZ32`-to-`NN32` conversion in the compiler's prelude) and row 412 (`Object` for an unwritten bound, P-42). Or bound the claim to written bounds. Define the lone parameter in words. Replace the bare row list with what the callouts cover, or with a pointer to the callouts. Add `compile-ladder/rung-instance-bound/` to the route for the bound rule.

## F-174, the 2011 overloading model in the specification

- **Scope: pass.** The title and the body agree with `Specification/advanced/overloading.tex:531-674` ("Declarations with Static Parameters": the three rules, the reading over instances, the positional restriction "that is not a rule of the language" of the compiled implementation, row 398) and with `basic/trait-parameters.tex` for the `Any` bound (P-42).
- **Present meaning: pass.** It states what the text says now.
- **Evidence: fail.** Quoted: "Each path fails some sets that the rules accept, and Appendix I names them (rows 159, 537, 539, 542)." Row 159 is FIXED (`6d187d069`, climb batch 17 rung G), and Appendix I no longer names it: `grep -n 159 Specification/appendices/changes.tex` finds nothing. Appendix I's effect for "Overloading with static parameters" now names rows 542, 537, 539, 779 and 780 (`changes.tex:2856-2879`). The decision record's sections 3 and 4 exist and hold the model, the positional rule and the naked-`Any` rule.
- **Comprehension: fail.** Quoted: "The naked-`Any` rule is against a written `Any` (row 534)." The term "naked-`Any` rule" is not defined, and "is against a written `Any`" does not say what is refused. The rule is: a functional whose single parameter's type is a type parameter with the bound `Any` written cannot be overloaded, and a parameter with no `extends` clause, whose bound is also `Any`, does not fall under it (`advanced/overloading.tex:134-150`). Row 534 is a fixed row of walk; the entry does not say what it holds.
- **Ownership: pass.** One subject: the text's overloading model.
- **Consistency: fail.** P-45, which the entry builds, lists the open departures as F-26 and rows 539, 759, 779, 780 and 786 to 788. F-174 lists row 159, which is closed, and leaves out rows 779 and 780, which Appendix I names. A note, not a fail: P-45 says "One rule of the old sentence survives" for the positional rule, without saying where. F-174 and the specification make it the compiled path's restriction only. The writer can keep F-174's scope.
- **Disposition: reword.** Replace the row list with Appendix I's current set (rows 537, 539, 542, 779 and 780), each with a few words on what it holds, or point to P-45's list. State the naked-`Any` rule in words.

## F-175, the dispatched instance and `comprises` at the level of values

- **Scope: pass.** Both halves are in the text. The dispatch paragraph gives the instance by the POPL 2019 rule (`Specification/basic/overloading.tex:312-332`). Its callout says that both paths take the value's type, and names rows 538 and 496 (`:333-349`). Covering and the passages at the level of values are in Appendix I, "Traits with comprises clauses read at the level of values" (`changes.tex:3185-3240`). The rows that Appendix I names are at `changes.tex:1605`, `:3454-3459` and `:3535`.
- **Present meaning: pass.**
- **Evidence: pass.** `compiler_tests/XXXGenericInstanceUnfixed` exists. Rows 538, 496, 487, 540, 543, 546 and 547 are all NEGATIVE-VERIFIED. The decision record's sections 5 to 9 exist and hold the detail.
- **Comprehension: fail.** Quoted: "Appendix I names rows 487, 540, 543, 546 and 547." This is a bare list. The reader cannot tell that these rows are the `comprises` half's departures: the checker's check of the clause at the immediate subtypes only (487), the crash on a method call on an intersection-typed result (540), and the families with static parameters (543, 546). Row 547 is a verdict that depends on what was compiled before in the same JVM.
- **Ownership: fail.** The entry holds two claims that answer different questions and change apart. One is the run-time instance of a dispatched declaration (P-48; rows 538 and 496). The other is the reading of a `comprises` clause at the level of values (P-60; rows 487, 540, 543, 546 and 547). Quoted: "The specification gives the run-time instance of a dispatched declaration by the POPL 2019 paper's rule, and reads a `comprises` clause at the level of values in every passage."
- **Consistency: pass.** P-48, P-60, F-173 and F-76 agree with it.
- **Disposition: reorganize.** Split it into the dispatch instance (P-48) and the `comprises` reading (P-60). P-60's "Built: F-175 (the specification)" must then point to the `comprises` half. Give each row a few words on what it holds.

## F-176, arithmetic in a size, in the specification

- **Scope: pass.** The claim is the specification's, and the limits on each path go to F-146 and F-222.
- **Present meaning: pass.**
- **Evidence: fail.** Quoted: "A size may be a numeral, a name, a sum, a difference, a product, a power to a numeral or a name, or a bracketed expression. [...] Source: `Specification/basic/types-vals-vars.tex:49-62`." Those lines hold only the identity sentence and the "not known to differ" sentence. The list of forms is the grammar's `IntExpr` (`Specification/appendices/grammars/concrete-syntax.tex:540-547`, with `IntVal` a numeral or a name at `:533-535`), and the entry does not cite it. The walk claim "at a call, walk binds only a name or a numeral" cites nothing. By reading, it holds: `IntNat.unifyStaticArg` matches a numeral and binds a name, and passes anything else on (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/IntNat.java:126-147`). The entry should say that this was read in the code.
- **Comprehension: fail.** Quoted, the title: "two size expressions are the same type when they are written alike once numerals are folded". A size is a static argument, not a type. The text says that two `nat` or `int` static arguments are identical when they are written alike once each operation on numerals is replaced by its value, so that two types are identical (`types-vals-vars.tex:51-58`). "Folded" is the record's word. Also quoted: "at a call, walk binds only a name or a numeral". It does not say that this is about inferring a size parameter from a call's argument type.
- **Ownership: pass.** One subject. Walk's arithmetic is left to F-222.
- **Consistency: pass.** P-55, F-146 and F-222 agree. F-146's two different size parameters "as different" (row 683, contested) is a checker matter that F-176 does not contradict.
- **Disposition: reword.** Cite the grammar for the forms. Say that the walk sentence was read in the code. Word the title as identity of the size arguments, not of size expressions as types.

## F-223, the No Duplicates Rule

- **Scope: fail.** Quoted, the title: "the compiled checker applies it, to functional methods wherever their `self` parameters stand, abstract ones included." The only departure that the body names is the symbolic operators (row 584, row 726). Row 759 (NEGATIVE-VERIFIED, checker) records that the compiled checker accepts `g[\T\](a: T)` beside `g(a: Any)` and runs the generic one, "Each is applicable to every call to which the other is, so the No Duplicates Rule refuses the pair". The entry leaves out that exception. A note for the writer: row 412's `Object` bound for an unwritten bound on the compiled path may be the cause of row 759. Either way, the checker accepts a pair that the specification's rule refuses.
- **Present meaning: pass.** It states the rule and each path's behaviour now.
- **Evidence: pass.** The rule is at `Specification/advanced/overloading.tex:547-549`, with the callout on the non-strict reading (`:561-569`). The checker's refusal at any two `self` positions and its message, which names the domain of the declaration written first, are in `OverloadingChecker.scala:458-471`. All nine named tests exist, with the messages the entry quotes: the five `compiler_tests/XXXNoDuplicatesRule*` refusals with "There are multiple declarations of", `XXXNoDuplicatesRuleSelfPositionsOperator` with the code generator's "Likely bug in static analysis", and the three walk tests with "fails because their parameter lists have the same types". Rows 584 and 726 are open.
- **Comprehension: fail.** The entry is 1,801 characters. Quoted: "it refuses too a generic declaration beside one whose parameter types are its bounds, a plain one or a generic one whose parameter types mention none of its static parameters". "Its bounds" can mean either declaration's bounds, and "such a pair" is used in turn for three different pairs. The nine test names make the claims hard to find.
- **Ownership: fail.** Walk's half is owned elsewhere. F-252 holds walk's load check of a pair with equal declared domains, gated by the same `GenericBesideGenericSameDomain` and `GenericBesidePlainSameDomain`. F-257 holds the message "fails because their parameter lists have the same types", gated by `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk`. The list of nine tests is a list of sites (record.md, question 4). Patterns would do: `compiler_tests/*NoDuplicatesRule*`.
- **Consistency: fail.** F-252 ends: "`g[\T\](a: T)` beside `g(a: Any)` is refused as equal declared domains, which the compiled checker accepts (row 759)." F-223 says the checker applies the rule, and names only the operator exception. The two entries do not say that their scopes differ.
- **Disposition: reorganize.** Keep the specification's rule and the checker's application here, and name the checker's two exceptions: symbolic operators (rows 584 and 726) and row 759. Move walk's half to a pointer to F-252 and F-257. Give the tests as patterns.

## F-179, tasks and transactions built twice

- **Scope: pass.** `interpreter/evaluator/tasks/` and `transactions/` beside `runtimeSystem/` (`coordinator/map/modules-and-phases.md`, B.11: "This whole subsystem is duplicated, not shared").
- **Present meaning: pass.**
- **Evidence: pass.** Row 302 is FIXED by `53362cb88` and `42d51c474`, and both commits change `runtimeSystem/BaseTask.java` only, of the two copies.
- **Comprehension: pass.** A reader can restate it. A note, not a fail: "row 302's fix" does not say what the row holds (the eager debug string of `inATransaction`).
- **Ownership: pass.** One subject. The skill's SKILL.md, "Parallelism and mutable state", says the same, and its sources go to this entry.
- **Consistency: pass.**
- **Disposition: keep.**

## F-180, `import java` on walk

- **Scope: pass.** "On walk" is the condition. The five gaps and six patches are those of `perf-probes/prelude/natives-shape.md` section 1. No file under `ProjectFortress/tests/` uses `import java`. `ForeignComponentWrapper.java` and `ClosureMaker.java` have no revival commit.
- **Present meaning: pass.** P-58's "Still to build: all of it" agrees, and no later commit names the natives.
- **Evidence: fail.** Quoted: "P-58 binds the natives by `builtinPrimitive` instead; both halves of that way ran as probes. [...] Detail: `perf-probes/prelude/natives-shape.md` section 1." That section measured walk's half only, and says: "The compiled half is not measured." The compiled half is in `perf-probes/prelude/natives-binding-probe.md`, sections 1 and 2, which the history's `from` line names and the entry dropped. The two findings (the raise ends as `FortressImplementationError`; 50 parameters or results over compiled-path classes) are in section 1, "What each gap does to it", gap 5, and "Limits, by reading".
- **Comprehension: fail.** Quoted: "both halves of that way ran as probes" (which halves: walk's loader of a `builtinPrimitive` string that names a static helper, and the compiled path's rewrite of such a body). Also quoted: "Two findings bear on any binding text that both paths share" and "A helper over compiled-world types cannot take walk's values". "Binding text" and "compiled-world types" are not plain. An example, such as `FZZ32Vector` or `CompilerBuiltin$IntLiteral` as a helper's parameter, would make them plain.
- **Ownership: pass.** One subject, the native binding on walk, with P-58 as its pointer.
- **Consistency: pass.** P-58 agrees.
- **Disposition: reword.** Add `natives-binding-probe.md` sections 1 and 2 to the route. Name the two halves. Say what a compiled-path type is, with one example.

## F-181, what the code generator refuses

- **Scope: pass.** The guards are at `CodeGen.java:2967-2971`, `:4107-4109` and `:5027-5029` (row 701). The `extends` entry's clause compiles (row 774), and the disambiguator drops a trait's and an object's contract (row 781).
- **Present meaning: fail.** Quoted: "Past the guard, `NatParam`'s clause of bindings only compiles and runs, and opening its value at a call fails verification (row 307)." That was measured with the guard let through in a scratch copy of `CodeGen.java` (`perf-probes/where-clauses/REPORT.md` A.7: "I then built a scratch `CodeGen.java` [...] nothing tracked was changed"). The entry does not say so. A reader can take it as how the tree behaves now.
- **Evidence: pass.** Rows 701, 774, 781, 304 and 307 are open. The skill's `references/compiler.md`, "What the compiled path cannot compile yet", lists the constructs, and A.7 holds the measurement.
- **Comprehension: fail.** Quoted: "`NatParam`'s clause of bindings only". The entry does not say that `NatParam` is the library's trait `trait NatParam comprises { N[\n\] } where [\ nat n \]` (`NatReflect.fsi:23`). "Clause of bindings only" means a `where` clause that binds a size and states no constraint.
- **Ownership: fail.** The entry holds five claims that change apart: the code generator's guard (row 701); the conditional `extends` entry read at every instance (row 774), which F-255 holds; the dropped contracts (row 781), which F-255 and the skill's compiler part hold; the constructs with no code-generator case, which the skill's compiler part lists; and the scratch measurement past the guard (row 307). Quoted: "It compiles a declaration whose `extends` entry carries a `where` clause, and reads the entry at every instance (row 774). A trait's or object's `throws` clause and contract never reach it, since the disambiguator drops them (row 781)."
- **Consistency: pass.** The skill's compiler part, F-255 and rows 701, 774 and 781 agree.
- **Disposition: reorganize.** Keep the guard and its scope here. Point to F-255 for rows 774 and 781, and to the skill's part for the constructs; the array comprehension, which the part does not list, can stay. Mark the `NatParam` result as a measurement on a scratch copy, and say what `NatParam` is.

## F-182, type aliases, `test` and `property` declarations

- **Scope: pass.** "`test` declarations" is the specification's own heading for the `test Id[gens] = Expr` form (`Specification/basic/tests.tex:87-91`). `IndexBuilder.scala:187-189` gives `bug("Not yet implemented: " + d)` for `TypeAlias`, `TestDecl` and `PropertyDecl`. The repository's index building calls `IndexBuilder` (`repository/CacheBasedRepository.java:78`, `:97`; `GraphRepository.java:757`).
- **Present meaning: pass.**
- **Evidence: fail.** Quoted: "Detail: `coordinator/map/spec-to-implementation.md` section 3." For `test` declarations, the map's row says "interp works / comp absent" (`spec-to-implementation.md:303`), against the entry. The observed support for the entry is in the gap ledger, which the entry does not cite: row 18 (`** bug! Not yet implemented: TypeAlias`), row 121 (`** bug! Not yet implemented: TestDecl`, "from `Shell.walkTests` and from `Shell.walk` alike") and row 122 (`PropertyDecl`). The map's "works" looks like row 120: the `test` modifier on a function runs under `fortress test` (POSITIVE-VERIFIED).
- **Comprehension: fail.** Quoted: "in the index builder that the repository runs". "The repository" can be read as this git repository. The code is the Fortress repository subsystem that both paths use. Also quoted: "Neither path implements them." A reader can apply this to the `test` modifier, which walk does run (row 120).
- **Ownership: pass.**
- **Consistency: pass.** No FACTS entry disagrees. The conflict is with the map's row, which is not an entry.
- **Disposition: reword.** Cite rows 18, 121 and 122 as the observed evidence. Say "the index builder that both paths run". Name the refused form, `test Id[gens] = Expr`, and say that a `test` function runs under walk (row 120).

## F-183, the compiled path's two vector types

- **Scope: fail.** Quoted: "Each element access is boxed, and no gated test makes or indexes one at run time." "One" covers both types. The probe found this for `ZZ32Vector` only: "No gated test creates, indexes or prints a `ZZ32Vector` at run time." (`compiler-probes/vectors/vectors.md` section 6). The gated `compiler_tests/DefaultRenderRungS.test` makes a `StringVector` (`makeStringVector(2)`), writes it with `putValue` and asserts its rendering (`DefaultRenderRungS.fss:38-41`). `Compiled2`, `Compiled4` and `Compiled7` read `args`, which is a `StringVector`.
- **Present meaning: pass.** The two traits are still the compiler prelude's only array-like types (`LibraryBuiltin/CompilerBuiltin.fsi:563-590`), and the skill's compiler part agrees.
- **Evidence: fail.** The same passage. The cited sections 1 and 7 do not support the claim for `StringVector`, and section 6 contradicts it. The rest holds: row 408 is open, gated by `compiler_tests/XXXVecCtorLoad`, and the wrapper generator's skip of array parameters is in section 7 (row 408's notes and section 3, step 10).
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** The skill's compiler part says the same of the prelude.
- **Disposition: reword.** Say that no gated test makes or indexes a `ZZ32Vector` at run time, and that the gated tests make and write a `StringVector` (`DefaultRenderRungS`, and the `args` of `Compiled2`).

## F-184, a generic object without its static arguments

- **Scope: pass.** The compiled path, the two forms, walk's failure, and the bare `Nothing` (row 331, P-90).
- **Present meaning: pass.** It was measured at `ff7d7a319` (`compiler-probes/maybe-inference/inference.md`, "What was run"). By reading, the decision points are unchanged on the base. The checker's `SVarRef` case still carries the team's `TODO: handle missing static args` (`scala_src/typechecker/impls/Misc.scala:653`), and walk's `Couldn't figure out` is at `interpreter/evaluator/types/FType.java:316`. The chapter still lists "the static arguments of an object with static parameters that is named without a call" as not described (`Specification/basic/inference.tex:342-343`).
- **Evidence: pass.** The probe report holds the forms, their messages and the decision. Row 331 is open.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** P-90 gives another reason for the same limit (a `where` clause that binds a type variable in an `extends` clause), and the two do not conflict.
- **Disposition: keep.**

## F-185, what the suites do not compare

- **Scope: pass.** Each claim holds for the suites. `tests/` and `compiler_tests/` share no `.fss` file name (`comm -12` of the two listings prints nothing). They share 11 names with `other_compiler_tests/`. `fortress.unittests.noopt=true` is at `default_repository/configuration:51`. `TestTask.java:43-44` has the multi-threaded half commented out. The 121 is scoped to "the map's one count" (`map/test-coverage.md` A.4, `:117`). The gate's ladder regression compares each compiled program with its own baseline, not with walk (`fortress-repo` skill, `references/gate.md`, "The ladder regression"), so no test compares the two paths.
- **Present meaning: pass.** The one changing number is scoped to its measurement.
- **Evidence: pass.** The map's sections A.1, A.4 and C.1 hold each claim (C.1's row for `compiler/asmbytecodeoptimizer/`, `:155`).
- **Comprehension: pass.**
- **Ownership: pass.** One subject: what the green suites leave unchecked. A note, not a fail: the title names only the first two claims, so a reader who looks for the bytecode optimizer's tests may not look here.
- **Consistency: pass.**
- **Disposition: keep.**
