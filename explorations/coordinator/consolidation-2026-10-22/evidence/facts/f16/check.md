<!-- The FACTS clarity pass, chunk f16, 2026-10-22: the checker's comparison of each rewritten entry (F-173, F-174, F-175, F-?1, F-176, F-223, F-180, F-181, F-182, F-183) with the record's text and its sources, and of the cold reader's answers with the source meaning, each failure classed with its proposed wording or concept. -->

# Chunk f16: check

Read on `main` at `34fbf49d4`; the assessment's base is `8c99c2413`. I read `proposals.md`, `clean.txt` (word for word the same as `proposals.apply`), `cold-read.md`, `concepts.md` and `assessment.md`. For each entry I ran `facts-extract.sh 'F-N+'` and `'history:F-N'`, and then read the specification lines, gap-ledger rows, code and reports that the entry or its sources cite. I ran no program and changed no file but this one.

Classes: **concept** (a concept the reader lacked, and where it belongs), **wording** (with the wording proposed), **uncertain** (uncertain fidelity: the source that settles it, and the result where I settled it).

## F-173, the inference chapter

**Fidelity.**

1. **The row-442 departure is misstated and misattributed.** The rewrite says: "The chapter's callouts give two departures of the compiled path: its prelude lacks the conversion between `ZZ32` and `NN32` (row 442), and it bounds a type parameter written without an `extends` clause by `Object`, not `Any` (row 412, P-42)."
   - The missing conversion is not between `ZZ32` and `NN32`. The specification says that neither of the two converts into the other (`inference.tex:305-308`). The chapter's example gives `ZZ64` for a `ZZ32` and an `NN32` (`:84-87`). Row 442 says that the prelude lacks "`NN32` into `ZZ64`", so that "promotion of an `NN32` with a `ZZ32` gives `ZZ`, not `ZZ64`". Its gate, `compiler_tests/XXXInferPromoteNN32.fss`, asserts `pick(z, u)` = `"ZZ64,ZZ64"`, and F-138 says the same ("Compiled, `NN32` with `ZZ32` or `ZZ64` answers `ZZ` (row 442)"). The record's old text, "departs only at `ZZ32` with `NN32`", named the pair of arguments. The rewrite turned it into a conversion that the language does not have.
   - No callout of the chapter names row 442. `grep` finds row 442 in the specification only in Appendix I's entry on shifts (`changes.tex:1762`). The chapter's callouts name row 412 (`:37-40`, `:356-363`).
   - "Two" reads as complete, and the cold reader took it so ("The compiled departures listed are only 'two'"). The same callouts also give the checker's refusal of a big operator whose bound mentions its own static parameter (`:364-370`, row 425, now row 731) and its refusal to infer a `bool`, `dim` or `unit` parameter (`:421-423`). The first callout sends the reader to Appendix I's list (`:32-34`), which also names the run time's failure to load an instance at an intersection type (`changes.tex:2265`, row 559). This is the old text's "only" again, with a count in its place.
2. **A condition is dropped, carried from the old text.** "A type parameter that is the whole declared type of one or more parameters ... takes the narrowest of those arguments' types and the types to which they can be coerced". The chapter adds "and that is not fixed as above", meaning not fixed by another parameter that mentions it inside a type (`:77-78`, with the first item at `:69-72`). It also requires the narrowest type to be one "that every one of those arguments is substitutable for ... and that the bounds of the type parameter permit" (`:79-83`). The entry never says what fixes a type parameter, so "nothing fixes" is undefined (the cold reader: "'fixes' is not defined").
3. **The bound is stated without the expected type, carried from the old text.** "where none is narrowest, it takes its bound" and "A type parameter that nothing fixes takes its bound". The chapter gives "the intersection of its upper bounds: its declared bound ... and what the expected type ... requires of the declared return type" (`:91-95`, `:101-104`). Its example is `x: ZZ32 = stop("no")`, instantiated at `ZZ32` (`:106-111`). A reader can conclude `Any` there. P-48, which the entry states, has the expected type, so this is a wording point and not a contradiction.
4. **Citation.** The walk callout runs from `:236` to `:298` (rows 589, 591, 616, 760, 762). The entry cites `:292-295` only.

The route change is sound. `rung-spec-inference/decision-record.md` section 3.1 holds the original text and the reasons, and its new text is "section 2 above", the superseded union rule. The history keeps that route.

**Comprehension.** The cold reader restated the text correctly, and so inherited the errors in fidelity points 1 to 3. Their open points:
- "the conversion between `ZZ32` and `NN32`: the direction is not given". Point 1 explains this: no direction is right.
- "Plain tests gate the first rule": the wording is unclear. The tests (`InferLoneUnbounded.fss`: "A lone type parameter bounded by Any with no narrowest argument type is instantiated at Any") gate the rule for a type parameter that is a parameter's whole type, in its no-narrowest case.
- "narrowest" in which order: point 2's dropped words answer it.
- `BottomType` against the skill's `Bottom`: a concept.

**Failures.**
- **wording (fidelity, point 1):** "The compiled path departs from the chapter in these ways, among others. It bounds a type parameter written without an `extends` clause by `Object`, not `Any`, as the chapter's callouts say (row 412, P-42). Its prelude lacks the coercion of `NN32` into `ZZ64`, so a `ZZ32` and an `NN32` instantiate a type parameter at `ZZ`, where the chapter gives `ZZ64` (`inference.tex:84-87`); no callout names this (row 442, `compiler_tests/XXXInferPromoteNN32`)."
- **wording (points 2 and 3):** "A type parameter that a parameter's type mentions inside another type, as `List[\T\]` mentions `T`, is fixed by that argument. One that is the whole declared type of one or more parameters, as `T` is of `x: T`, and that nothing else fixes, takes the narrowest type, within its bounds, that every one of those arguments has or converts into: `ZZ64` for a `ZZ32` and a `ZZ64`. Where there is none, and no numeral settles the tie, it takes its bound, narrowed by what the call's expected type requires of the return type (P-48). So does a type parameter that neither an argument nor the expected type fixes, and it is never `BottomType`."
- **wording (test sentence):** "Plain tests gate the rule for a type parameter that is a parameter's whole type, at its bound where no argument type is narrowest, on both paths: ..."
- **wording (citation):** cite walk's callouts as `inference.tex:236-298` and `:364-425`.
- **concept:** to fix a type parameter, and `BottomType` as the specification's name for the skill's `Bottom`. Both belong in the `fortress-repo` core, "Fortress as a language", in the static-parameters item, which already says "A type parameter that a call does not fix takes its bound" without saying what fixing is.

## F-174, the 2011 overloading model

**Fidelity.**

1. **Half of the positional restriction is dropped, and row 398 is attached to the wrong half.** The rewrite says: "where one generic declaration is more specific than another with as many static parameters, the two must declare them of the same kinds, position by position (row 398)." The callout states two conditions: the same kinds, position by position, "and the return type of the more specific one must be a subtype of the other's when their static parameters are identified position by position" (`advanced/overloading.tex:644-652`). Its example is the second condition: an override whose return type names its static parameters in the other order. Row 398 is also the second condition: "the compiled checker's return-type rule accepts an override whose return type permutes its own static parameters, and the run then fails". The row is FIXED, and Appendix I says that the checker now refuses that override (`changes.tex:2856-2857`). A reader concludes that the restriction concerns kinds only.
2. **The naked-`Any` rule says less than the source.** "...cannot be overloaded; a type parameter with no `extends` clause does not fall under this rule, and walk applies it (row 534, fixed)." The compiled checker applies it too: `OverloadingChecker.scala:475-477` and `checkBoundAny` at `:533` ("A functional which takes a single parameter of a parametric type bound by Any cannot be overloaded"), with the dotted form fixed by row 619. The record's earlier text named `OverloadingChecker.checkBoundAny`. The rewrite also leaves unsaid that the rule is the language's: it is the normative text of "Principles of Overloading" (`:134-150`), not a callout. The cold reader asked both questions.
3. Rows 542, 537, 539, 779 and 780 match Appendix I's effect (`changes.tex:2858-2879`). Row 159's removal is right: row 159 is FIXED, and Appendix I no longer names it.

**Comprehension.** The cold reader matched the source except where the text left them to guess:
- "read over its instances": they gave two readings. The source is "read as one declaration whose parameter type ranges over every instance of it whose static arguments satisfy their bounds" (`:536-538`).
- Rows 779 and 780, "one inside the other": they gave two readings, lexical nesting or domain containment. The source means the domains: "Of two generic functional methods one of whose declared domains lies inside the other's" (`changes.tex:2874-2875`).
- Row 542, "a more specific declaration over an object type", and row 539, "the Meet Rule's search": too compressed to restate.
- "Functional" as a noun: a concept.

**Failures.**
- **wording (point 1):** "...the two must declare them of the same kinds, position by position, and the more specific one's return type must be a subtype of the other's when their static parameters are matched by position, so an override whose return type reorders its static parameters is refused (row 398, fixed)."
- **wording (point 2):** "The section 'Principles of Overloading' also forbids overloading a functional whose single parameter's type is a type parameter with the bound `Any` written, as `T extends Any`. A type parameter with no `extends` clause, whose bound is also `Any`, is exempt. Both paths refuse it: the checker in `OverloadingChecker.checkBoundAny`, and walk since row 534's fix."
- **wording (rows):** "row 542 (the checker refuses a generic declaration beside a plain one over an object type, as `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`), row 537 (the code generator fails on two generic declarations whose bounds differ), row 539 (walk refuses at load the 2019 paper's valid set over an array list and a list), and rows 779 and 780 (walk, two generic functional methods one of whose declared domains lies inside the other's: refused at load in a trait or object without static parameters, and loaded but failing at a call in a trait with them)."
- **wording (title clause):** "a declaration with static parameters is read as one declaration over all its instances within its bounds".
- **concept:** "functional", the specification's noun for a function or a method (its chapter is "Overloaded Functional Declarations"). It belongs in the `fortress-repo` core, "Fortress as a language". F-174, F-223 and many other entries use it.

## F-175, `comprises` at the level of values

**Fidelity.**

1. **A code-generator crash is credited to the checker.** "Appendix I names the compiled checker's departures from it: ...; it crashes on a method call on a result typed by the intersection of its candidates' return types (row 540)". Appendix I says "its code generator stops at a method call on a value of such a type (row~540)" (`changes.tex:3455-3456`). Row 540 is classed "implementation gap (codegen)": it crashes `fortress compile` in `CodeGen.forMethodInvocation` with a `ClassCastException`. The record's old text gave the row number only, so this error is new.
2. **"Such a call" has no antecedent.** "in a family with static parameters, it types such a call by the head of a sort (row 543)". The call that is meant is a call whose argument's static type stands between two closed traits, which Appendix I types by the intersection of its most specific declarations' return types (`:3446-3451`). The entry never introduces that call. "The head of a sort" is the ledger's phrase; Appendix I says "by one of its most specific declarations". Row 543 is classed "deliberate (checker)", sound by the Return Type Rule. The entry lists it among defects without saying so.
3. **The route does not reach the rows.** The detail cites `changes.tex:3185-3240`, and none of the five rows is in those lines. Row 487 is at `:1603-1605` ("The traits that extend a closed trait") and `:3533-3535`; rows 540 to 547 are at `:3452-3459` ("The Meet Rule for traits with comprises clauses"). The decision record's "sections 5 to 9" also covers the dispatch half that moved to F-?1 (sections 5 and 6). This entry's sections are 8 and 9.
4. The split is right. P-60's "Built: F-175 (the specification)" still points to this half, and the title is the old title's second clause.

**Comprehension.** The cold reader matched the meaning, but could not resolve these:
- "at the level of values": they did not know the other reading. P-60 gives this one: "So another trait may stand between `S` and its listed types".
- "family": the ledger's word for an overload set.
- "such a call" and "the head of a sort": point 2.
- "builds" against "states": a concept.

**Failures.**
- **wording (points 1 and 2):** "A call whose argument's static type stands between two closed traits is typed by the intersection of its most specific declarations' return types (P-60). Appendix I names where the compiled path departs: the checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487); the code generator crashes on a method call on a result so typed (row 540); where any declaration of the overload set has static parameters, the checker types such a call by one of its most specific declarations instead, a deliberate choice (row 543), and refuses the Meet Rule's case for closed traits (row 546); and its verdict on an overload set can depend on the components compiled before it in the same JVM (row 547)."
- **wording (route, point 3):** "Detail: `Specification/appendices/changes.tex:3185-3240`, with the rows at `:1597-1606` and `:3446-3459`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 8 and 9."
- **concept:** reading a `comprises` clause at the level of values (every value of the trait is a value of a listed type, so another trait may stand between them), against the level of types (each immediate subtype is listed). It belongs in the `fortress-repo` core, beside `comprises`, as part of `concepts.md`'s row on closed traits and covering.
- **concept:** the record's "It states P-N" and "It builds P-N": which one an entry uses, and what each says about the POSITIONS entry. It belongs in `references/records.md`, in its paragraph on an entry's form. Every FACTS entry uses one of them.

## F-?1, the dispatched instance (new, split from F-175)

**Fidelity.**

1. **A condition is dropped, carried from the old text.** The title is "the run-time instance of a dispatched generic declaration". The paragraph applies the POPL 2019 rule only to a declaration that dispatch reaches and that the static call did not select. The one it selected "runs at the instance inferred for the call" (`basic/overloading.tex:316-318`). The record's earlier text, in its history, said this.
2. **Row 538 is attached to both paths.** "both paths take the value's type there instead (row 538, the expected failure ...)". The callout gates only the compiled path's departure: "The compiled path's departure is gated as an expected failure (row~538)" (`:347-349`). Row 538 is classed "implementation gap (codegen)". Walk takes the value's type by decision, and always will (P-48: "Under walk, dispatch takes the value's type, and always will, since walk has no static types"). A reader can take walk's behaviour for a defect that row 538 tracks. The old F-175 had the same attachment.
3. "the value does not fix a type parameter" beside "take the value's type". The source says "the dynamic type of the argument is only a lower bound" where the type parameter is a parameter's whole type (`:326-329`), and the paths "take the dynamic type of the argument" (`:340`). The cold reader read the two halves as contradictory.
4. The second example is right. It is `grab[\X\](t: Tag[\X\])` beside `grab(a: Any)`, through `a: Any` (`:390-400`; row 496).

**Comprehension.** The cold reader's open points are fidelity points 1 to 3, the placeholder number, and the two `overloading.tex` files. The placeholder is the coordinator's to number at apply, not an entry failure. The two files are a concept.

**Failures.**
- **wording (title, point 1):** "**The specification gives the run-time instance of a generic declaration that dispatch reaches, and the static call did not select, by the POPL 2019 paper's rule.**"
- **wording (points 2 and 3):** "Where a type parameter is a parameter's whole type, the argument's run-time type only bounds it from below, and the rule gives it its bound under the call's static type. The dispatch paragraph's callout says that both paths take the argument's run-time type there instead. Walk always will, having no static types (P-48). The compiled path does so because its dispatcher is not given the call's static type (row 538, the expected failure `compiler_tests/XXXGenericInstanceUnfixed`)."
- **wording (route):** "Detail: `Specification/basic/overloading.tex:312-349`, in the chapter 'Overloading and Multiple Dispatch'; `compile-ladder/rung-spec-overloading/decision-record.md` sections 5 and 6."
- **concept:** the specification has two overloading chapters. `basic/overloading.tex`, "Overloading and Multiple Dispatch", holds applicability and run-time resolution. `advanced/overloading.tex`, "Overloaded Functional Declarations", holds the rules on a set. This belongs in `references/specification.md`.

## F-176, arithmetic in a size

**Fidelity.**

1. **One sentence is broader than the source.** "Two types whose size arguments are so identical are identical." The source says "Two types are identical if and only if they are the same kind and their names and static arguments (if any) are identical" (`types-vals-vars.tex:51-52`). Read as written, the sentence makes two types of different names identical.
2. **The "not known to differ" rule says less.** "A static parameter is not known to differ from a numeral." The source also covers "an expression in which one occurs", says that two sizes "are known to differ when they are two different numerals", and gives the reason, "since the parameter may be instantiated with a value at which they are equal" (`:59-62`).
3. The rest holds:
   - the title's identity rule (`:53-58`, "if and only if" softened to "when");
   - the list of forms, from the grammar (`concrete-syntax.tex:533-547`: `IntVal` is a numeral or a name, then `+`, `-`, `·` and juxtaposition, `^ IntVal`, and brackets);
   - the walk sentence. `IntNat.unifyStaticArg` (`IntNat.java:126-147`) checks a numeral for equality and binds a name; any other form goes to `super.unifyStaticArg`. Row 767 observes walk failing, "Cannot unify IBox[\3\]". Row 767 also records that the compiled checker fails, which F-146 holds.

**Comprehension.** The cold reader matched the source. Their open point, what "not known to differ" blocks, comes from fidelity point 2.

**Failures.**
- **wording (point 1):** "Two types are identical when they have the same name and identical static arguments, sizes compared this way."
- **wording (point 2):** "Two sizes are known to differ only when they are two different numerals: a static parameter, or a size in which one occurs, is not known to differ from a numeral, since an instance may make them equal."

## F-223, the No Duplicates Rule

**Fidelity.** The text agrees with its sources. The rule is at `advanced/overloading.tex:547-549`, and the checker's refusal and message are at `OverloadingChecker.scala:458-471` (`writtenBefore` picks the declaration written first). Rows 584 and 726 support the operator exception and row 759 the second. F-252 ends "`g[\T\](a: T)` beside `g(a: Any)` is refused as equal declared domains, which the compiled checker accepts (row 759)", and F-257 gates `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk`. So the pointers for walk's half hold. One point: "Gated by `compiler_tests/XXXNoDuplicatesRule*`" follows the row-759 sentence, and row 759 has no gated test ("No gated test passes while it shows"). A reader can take the exception to be gated.

**Comprehension.** The cold reader matched the meaning, with three ambiguities that wording would remove:
- "may not each be applicable to every call to which the other is": they gave two readings, and "each" pulled them toward the wrong one. The source's own words are the same. The meaning is that both may not be applicable to exactly the same calls.
- "non-strict": not defined anywhere they could read. The callout defines it: the revival's earlier text stated the rule on the strict "more specific", "which ... made refuse no pair" (`:561-569`).
- The title puts "with two exceptions" after "functional methods", but the second exception is about functions.

**Failures.**
- **wording (rule):** "By the rule, two declarations of one name may not both be applicable to exactly the same calls, as in the type group's papers of 2011 and 2019 (P-26). It is non-strict: it is stated on applicability, not on the strict 'more specific' relation, by which the revival's earlier text refused no pair."
- **wording (title):** "...and the compiled checker applies it, to functional methods wherever their `self` parameters stand and to abstract ones, except at a symbolic operator and at a generic declaration over `Any` beside a plain one."
- **wording (gate):** "... (row 759; no gated test, since an `XXX` compile test of the refusal is red while the program compiles)."

## F-180, `import java` on walk

**Fidelity.**

1. **"The probe's fifth patch" is wrong.** "walk has no such class, so without the probe's fifth patch it ends the run with a `FortressImplementationError`." The probe has six patches for five gaps: gap 4 took two, `gap4-reflective-closure.patch` and `gap4b-foreign-closure-params.patch`. The raise is gap 5, and its patch, `gap5-helper-raise.patch`, is the sixth (`natives-shape.md` section 1, "What each gap does to it", items 4 and 5). The cold reader could not tie "fifth patch" to anything.
2. **A measurement is stated without its "by reading".** "A helper whose parameters or results are compiled-path classes ... cannot take walk's values". The source's heading is "Limits, by reading", and the count is from `javap` (6 + 13 + 17 + 14 = 50). The detail line names "Limits, by reading", but the sentence does not.
3. **The route mislabels one section.** "`natives-binding-probe.md` sections 1 and 2 (the compiled half)". Section 1 is way 1's compiled half, P-58's way. Section 2 is way 2's checker half: twenty `ZZ32` bindings in `import java` form, the form that P-58 did not take (`natives-binding-probe.md`, "Terms" and section 2).
4. **A decision can read as built.** "P-58 binds the natives another way". P-58 ends "Still to build: all of it". The cold reader could not tell whether either half is in the tree.

**Comprehension.** Matched, except for points 1 and 4 and "a static Java helper" (a method or a class?). P-58 says the string names "a static Java method in `nativeHelpers/`".

**Failures.**
- **wording (point 1):** "... so without the probe's patch for that gap, the sixth (`gap5-helper-raise.patch`), it ends the run with a `FortressImplementationError`."
- **wording (points 2 and 4):** "P-58 chose another way, not yet built: a `builtinPrimitive("…")` body whose string names a static Java method in `nativeHelpers/`." Then: "By reading, a helper whose parameters or results are compiled-path classes ... cannot take walk's values: the probe's closure converts only Java's numbers, booleans, strings and `BigInteger`, and the helpers have 50 such parameters or results."
- **wording (route, point 3):** "`perf-probes/prelude/natives-binding-probe.md` section 1 (the compiled half; its section 2 measures the `import java` form, which P-58 did not take)."

## F-181, what the code generator refuses

**Fidelity.**

1. **The probe did not compile the library's trait.** The rewrite says: "In a probe on a scratch copy of `CodeGen.java` that let the guard through, the library's `trait NatParam comprises { N[\n\] } where [\ nat n \]`, whose `where` clause binds a size and states no constraint, compiled and ran; opening its value at a call failed verification (row 307)." A.7 compiled a six-line component of the same shape, `trait NatP comprises { Nn[\n\] } where [\ nat n \]` (`tmp/probe/np/NatParamWhere.fss`), which compiled and ran (`PASS`). The verification failure came from a different program, `compiler_tests/XXXNatOpenRun.fss` (`perf-probes/where-clauses/REPORT.md:213-226`). The record's old text said "`NatParam`'s clause of bindings only compiles and runs", which named the shape. The rewrite made it the library's trait. Also, the scratch copy "lets through a clause of bindings only" (`:222`). It did not "let the guard through".
2. **"Function" says less than the guard.** "every function, object and trait declaration ..., and every function with a contract". `forFnDecl` handles methods too: A.7 says "Functions and methods have it too" (`:209`), and the skill's `references/compiler.md` says "a function, method, object or trait declaration" and "a function or method with a contract". Row 701 has the narrower words, so the entry follows the row. The cold reader noticed the difference and could not settle it.
3. Leaving rows 774 and 781 to F-255 holds. F-255 has both, and "a trait's or object's contract" never reaching the guard is row 781. The rewrite drops the old text's "`throws` clause". F-255 and row 781 hold it.

**Comprehension.** Matched, apart from point 2 and "opening its value at a call", for which they gave an existential open as a guess. B.5 of the report defines it: "a test of the value's class, then its type or size argument read off its run-time descriptor".

**Failures.**
- **wording (point 1):** "In a probe, a scratch copy of `CodeGen.java` let a `where` clause of bindings only past the trait guard. A component with a trait of the shape of the library's `NatParam`, `trait NatP comprises { Nn[\n\] } where [\ nat n \]`, a clause that binds a size and states no constraint, then compiled and ran. `compiler_tests/XXXNatOpenRun`, which opens such a value at a call, compiled and failed verification (row 307)."
- **wording (point 2):** "**The code generator refuses every function, method, object and trait declaration that carries a `where` clause in its own header, and every function or method with a contract (row 701).**"
- **concept:** opening a value: reading the size or type argument of a value of a closed trait whose listed type takes it in a `where` clause, at a call, from the value's class and run-time descriptor. F-146 ("opens a value of a trait whose `comprises` clause lists a type at a `where`-clause size"), F-181 and row 307 use it. It belongs in `references/compiler.md`, or in the core's static-parameters item.

## F-182, type aliases, `test` and `property` declarations

**Fidelity.**

1. **The message is claimed for every position, but holds only at top level.** "Each stops its component with `** bug! Not yet implemented:` and the declaration's kind". Row 122 says that a `property` declaration inside an object raises "an uncaught `java.lang.Error: Not yet implemented` from `NI.nyi` at `IndexBuilder.scala:349`, with no Fortress-level diagnostic". Row 121 says that a `test` declaration as an object member "does not even parse".
2. **"Both paths" is uncertain for two of the three forms.** The cited rows observe walk ("from `Shell.walkTests` and from `Shell.walk` alike"; run-b2's probes ran "in either mode", meaning `fortress test` and plain `fortress`). That the compiled path refuses rests on the shared index builder (`CacheBasedRepository.java:78`, `:97`; `GraphRepository.java:757`). I settled it for the type alias. `explorations/aliases-units-report.md:98-101` ran `p2_alias_minimal.fss` under walk, `typecheck` and `compile`, with "same bug on all three paths" (`:461`). For `test` and `property` declarations, the compiled path is by reading. One `bin/fortress compile` of run-b2's `g1c_testdecl_plain.fss` and `g1c_property.fss` would settle it.
3. The `test` modifier's form is set apart correctly (row 120, POSITIVE-VERIFIED). The map's contradicting row 303 is outside the entry, as the writer says.

**Comprehension.** Matched. Their open points: which row holds which form (only the order suggests it), and whether row 120 records a working form or a gap.

**Failures.**
- **wording (points 1 and 3):** "At top level, each stops its component with `** bug! Not yet implemented:` and the declaration's kind: the type alias row 18, the `test` declaration row 121, the `property` declaration row 122. Inside an object, a `property` declaration stops with an uncaught `java.lang.Error`, and a `test` declaration does not parse. A function with the `test` modifier is another form, and it runs under `fortress test` (row 120 records it working)."
- **uncertain (point 2):** settled for the type alias, observed on the compiled path in `aliases-units-report.md:98-101`. The other two forms are by reading. Either cite the report and say "by reading" for the other two, or settle them with one compile each.

## F-183, the compiled path's two vector types

**Fidelity.**

1. **The gate is attached to both types.** "Passed to a generic object's constructor, either type fails at load ... (row 408, `compiler_tests/XXXVecCtorLoad`)." "Either type" is right: `vectors.md` section 3, step 9 measured `Cell[\ZZ32Vector\]` and `Cell[\StringVector\]`. But row 408 and its gate cover `ZZ32Vector` only ("a `ZZ32Vector` passed to a generic object's constructor"), and the detail line leaves out section 3, which holds the `StringVector` measurement.
2. The narrowing to `ZZ32Vector` and the named `StringVector` tests match section 6. The wrapper generator's skip holds: `SignatureParser.unsayable` returns true on `[`, and `FortressMethodAdapter.java:220-222` skips the method.

**Comprehension.** Matched, with three open points:
- `RTTIv` and `RTTIc`, and "stamped code": a concept.
- "write" a `StringVector": two readings. The test calls `putValue` twice and asserts the rendering.
- The wrapper generator's skip against the skill's `compiler.md:62`, "If a type has no Fortress counterpart, it fails the whole import". These are two cases. A byte, short or array parameter makes the method unsayable, and it is skipped. A class type with no Fortress counterpart fails the import. The skill states only the second, so this is a concept to add to the skill, not an entry failure.

**Failures.**
- **wording (point 1):** "... either type fails at load: its descriptor class is `RTTIv`, where stamped code asks for `RTTIc` (row 408 and `compiler_tests/XXXVecCtorLoad`, for a `ZZ32Vector`; the probe measured a `StringVector` too). ... Detail: `compiler-probes/vectors/vectors.md` sections 1, 3 (step 9), 6 and 7."
- **wording:** "Gated tests make a `StringVector`, store two strings in it with `putValue` and assert its rendering (`compiler_tests/DefaultRenderRungS`), and read `args`, which is one (`Compiled2`)."
- **concept:** a class's descriptor class (`<class>$RTTIc`), and "stamping", the class loader's copying of a template with its static arguments put in. Both belong in `SKILL.md`, "The compiled run time", which describes stamping without naming it.
- **concept:** the wrapper generator skips a helper method whose descriptor has a byte, short or array parameter (`SignatureParser.unsayable`). This belongs beside `references/compiler.md:62`.

## Concepts for every worker, beyond `concepts.md`

`concepts.md`'s six rows hold, and the cold reads confirm three of them: Appendix I and callouts, closed traits and covering, and native bindings. The cold reads show that these are missing too:

| Concept | Entries | Where |
|---|---|---|
| "functional", the specification's noun for a function or method | F-174, F-223, and many others | `fortress-repo` core, "Fortress as a language" |
| fixing a type parameter; `BottomType` as the skill's `Bottom` | F-173, F-?1 | core, the static-parameters item |
| a `comprises` clause at the level of values, against the level of types | F-175 | core, beside `comprises` (extend `concepts.md`'s row) |
| "It states P-N" and "It builds P-N" | every entry; F-175 and F-?1 in the cold read | `references/records.md`, the entry's form |
| opening a value of a closed trait at a `where`-clause size | F-181, F-146, row 307 | `references/compiler.md`, or the core's static-parameters item |
| descriptor class (`$RTTIc`) and stamping | F-183, row 408 | `SKILL.md`, "The compiled run time" |
| the wrapper generator's skip of byte, short and array parameters | F-183 | `references/compiler.md:62` |
| the two overloading chapters, basic and advanced | F-?1, F-174, F-223 | `references/specification.md` |
