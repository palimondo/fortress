<!-- Chunk f15 of the FACTS clarity assessment: F-159, F-229, F-162, F-163, F-165, F-166, F-167, F-168, F-169, F-170, F-171 and F-172, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `8c99c2413`. -->

# FACTS chunk f15: assessment

The base is `main` at `8c99c2413`. `FACTS.md` there is as at `09e1338df`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports and decision records, the ledger rows, the tests, the library and the specification's sources. I ran no experiment and searched no transcript. I ran three read-only git commands that check cited facts: F-163's `git diff --quiet`, and F-165's `merge-base` and ancestry checks. I also read one probe from git history (F-159).

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-159 | **fail** | **fail** | pass | **fail** | pass | **fail** | **reword** |
| F-229 | pass | pass | pass | **fail** | **fail** | pass | **reorganize** |
| F-162 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-163 | **fail** | **fail** | pass | pass | pass | pass | **reword** |
| F-165 | pass | pass | **fail** | pass | pass | pass | **reword** |
| F-166 | **fail** | pass | pass | **fail** | **fail** | pass | **reorganize** |
| F-167 | pass | pass | **fail** | **fail** | pass | pass | **reword** |
| F-168 | **fail** | **fail** | **fail** | **fail** | pass | **fail** | **reorganize** |
| F-169 | **fail** | pass | pass | pass | pass | **fail** | **reword** |
| F-170 | pass | pass | **fail** | **fail** | **fail** | pass | **reorganize** |
| F-171 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-172 | pass | pass | pass | **fail** | **fail** | pass | **reorganize** |

Counts: keep 0, reword 7, reorganize 5, investigate 0. No mark is unresolved. Each fail of scope, evidence or consistency is settled by text that is in the tree now, so a correction of wording or a move of detail fixes it, and no entry needs an investigation. Fails by criterion: scope 5, present meaning 3, evidence 4, comprehension 9, ownership 4, consistency 3.

Points that cross entries:

- **The specification's negative integer power.** F-168 says "The integer `^` has no result for a negative power." That was true when rung T revised the number chapters. Since `5ad4a9957`, the integer chapter's method entry gives the result: an exact power at the bases 1 and -1, `DivisionByZero` at 0, and `IntegerOverflow` at any other base (`Specification/basic-lib/basic-integers.tex:534-537`, with its callout at `:540-542`). F-263 states the same rule for the library under walk. The sentence belongs with F-172's integer rules, corrected, with a pointer to F-263.
- **The specification's rational type is split across two entries.** F-168 holds ℚ's values ("+∞, −∞ and 0/0") and says that ℚ is not a field and not totally ordered. F-172 holds its four traits, whose laws hold for the finite rationals. The two agree: a ring and a partial order are neither a field nor a total order. They are one subject, and the traits sentence can move into F-168.
- **F-159 and F-229 use one device with two different witnesses.** F-159's probes select a store by a witness of the element type. F-229 records that the library's factories now take a witness of their result type, because a witness of the element type throws `CastError` where walk infers `T` at a value's run-time class (rows 721 and 722). F-159 does not state that limit (see its consistency mark).
- **F-47, outside this chunk.** F-47 says of the specification's refused examples "F-167 lists them". F-167 names none of them. The list is in `compile-ladder/rung-spec-route-a/decision-record.md` section 3 (E1 to E4, E7 and the others). Either F-167 names them, or F-47 points to the record.
- **Routes to detail that miss their section.** In F-165, F-167 and F-170, the cited section or row does not hold one retained claim, although the support is in the same report. I marked these as evidence fails, because a reader who follows the route does not find the claim. Each one is fixed by rewording, not by new evidence.

## F-159, a store for `RR64` alone under a generic factory

- **Scope: fail.** The four probes in report section 3 (`WayANoCast`, `WayACast`, `WayACastSized` and `WayASpec`) declare their own one-method trait `Arr[\T\]` and two stores, `DStore` and `BStore`. They use no trait of the library's arrays (`git show 84aef6a4f^:explorations/reviews/array-design-ways/probes/WayACast.fss`). The compiled runs were in the compiler's own world, with its prelude, because the switch-over has not happened. Each call writes its static argument: `mk[\RR64\](r)`, `mk[\ZZ32\](z)`. The title states none of these conditions. Quoted: "A store written for `RR64` alone is selected under the generic array traits by the library's witness `typecase` and its `cast`, on both paths."
- **Present meaning: fail.** The entry states one measurement in the present tense. The measurement was made on 2026-09-29, on `main` at `6bc21c364` (report section 1). No gated test holds it. The probes and their captures were removed from the tree in `84aef6a4f` and are now only in the history. Quoted: "Wrapped in the library's `cast`, as `additiveIdentity` does, it checks, and both paths pick the `RR64` store only for `RR64`."
- **Evidence: pass.** Report section 3 holds the checker's refusal ("Function body has type OR(DStore,BStore[\T\]), but declared return type is Arr[\T\]") and the output of both paths ("RR64 DStore 1.5", "ZZ32 BStore 7"). The plain-factory sentence agrees with the report: the compiled run dispatches to the plain declaration, walk then refused the pair at load (rows 159 and 475), and "whether it then takes this pair is not measured". The entry does not say what kind of evidence this is: probe programs, observed once. The rewrite should say it.
- **Comprehension: fail.** "Store" is the report's own term (section 0: "the object that holds an array's elements"). The entry and the skill do not define it. "Its union type" has no clear referent: it is the type of the `typecase`'s body, the union of its arms, `OR(DStore,BStore[\T\])`. The entry does not say what a witness is. Quoted: "A witness `typecase` whose `RR64` arm returns that store runs under walk, and the checker refuses its union type."
- **Ownership: pass.** The entry has one subject: how a generic factory selects a store written for one element type (decision A's ways A1 and A2, P-85).
- **Consistency: fail.** The probe's witness is of the element type: `witness[\T\]`, with an arm `() -> RR64`. F-229 and row 722 record that such a witness throws `CastError` at its `cast` where walk infers `T` at a value's run-time class. Row 721 says that walk does so for `RR64` values too. For that reason, `array1` and `array2` now take a witness of their result type (F-229). F-159 states neither the static-argument condition nor this limit. I inferred that the probe's device would throw at an inferred `T`; I did not measure it. The rewrite should limit the claim to a written static argument and cite F-229 for the result-type witness, but it should not claim the throw. Quoted: "by the library's witness `typecase` and its `cast`, on both paths". F-27 (walk's load check, not yet run on the pair) and P-85 (decision A open) agree.
- **Disposition: reword.** The claim holds within its probes. The rewrite keeps the measurement, with its day and with the probes' own trait. It also says that the compiled run was in the compiler's world and that the static argument was written.

## F-229, the array factories' eight arms

- **Scope: pass.** The title and the body agree: there is one arm for each of the eight number types, and a plain array at every other element type. The results at run time are walk's (the tests are in `tests/`). On the compiled side the evidence is the checker's acceptance (the distance stage), because the compiled path does not run this library before the switch-over. The entry names both gates, so the reader can see which path each one covers.
- **Present meaning: pass.** `array1` (`Library/FortressLibrary.fss:2585-2596`) and `array2` (`:2972-2983`) match the entry today.
- **Evidence: pass.** `ProjectFortress/tests/ArrayFactoryNumberTypes.fss` and `ArrayFactoryAbstractNumber.fss` exist. The second test asserts a plain array at `Number` and at `AnyIntegral`. Report section 1 holds the change, section 3 the distance (54 to 50, the four `wellformed` sites of row 685), and section 4 the ways that were measured: way 1, a witness of `T`, throws `CastError` at walk's `Int`. Rows 721, 722, 729 and 685 say what the entry says. The cited lines are out of date. The entry gives `:2572-2586` and `:2953-2965`, and the declarations now start at `:2585` and `:2972`.
- **Comprehension: fail.** The second sentence joins three claims with a "since", a "where" and a semicolon: why `Number` gets a plain array, the conflict with the specification, and why the witness is of the result type. The "since" clause explains `Number` and `AnyIntegral`, but not walk's `Int`, which gets a plain array because no arm matches it exactly. "Walk's inferred `Int`" needs row 364, and "the family's bound" needs F-151. "A type below a number type" means a type such as `Int`, which is below `ZZ32`. Quoted: "`Number`, `AnyIntegral` and walk's inferred `Int` get the plain array, since `Vector[\Number,n\]` is not well-formed under the family's bound (F-151; row 721), where the specification's "Array Expressions" makes an array of `Number` elements a vector (row 729, contested); a witness of `T` itself would match a type below a number type and throw `CastError` at the `cast`, as `openRange` does at walk's `Int` (row 722)."
- **Ownership: fail.** Repair history and line detail hide the subject. Quoted: "The four `wellformed` distance sites of the old factories are gone (row 685)." and "(`Library/FortressLibrary.fss:2572-2586`, `:2953-2965`)". The first sentence goes to the history, and the lines go to the report, whose section 1 holds them at its commit.
- **Consistency: pass.** F-151 says the same about `Number` and points here. The skill's `revival-changes.md` ("Resolution: `array1` and `array2` give a `Vector` or a `Matrix` only at ...") agrees. F-159 uses the same device (see F-159).
- **Disposition: reorganize.** Move the repair sentence to the history and the lines to the report. Split the second sentence into its three claims, each with its pointer. The entry has 1,092 characters.

## F-162, citing the generated api listings

- **Scope: pass.**
- **Present meaning: pass.** `Specification/library/apis/` is not in the tree. `Specification/fortress/build.xml:128-156` renders `Library/*.fsi` and `ProjectFortress/LibraryBuiltin/*.fsi` (`fortex`) and moves the results into it.
- **Evidence: pass.** `Specification/library/structure.tex:25-31` holds the quoted words. `default-libraries.tex:27` and `:39` include the generated files with `\input`.
- **Comprehension: fail.** Two referents are unclear. In "they are not in the tree", the reader can take "they" as the `.fsi` files, the nearer noun, but it means the listings. In "an api edit changes the PDF there", "there" has no antecedent. It means that an edit of the `.fsi` file also changes its listing in the built PDF, which is why the citation is circular. Quoted: "The build renders the listings from the `.fsi` files, and they are not in the tree. So a listing cannot justify an edit of the `.fsi` file, and an api edit changes the PDF there."
- **Ownership: pass.** The rule is in the skill (`references/specification.md:13`), and the entry points to it.
- **Consistency: pass.** F-112 cites this entry for `IntLiteralArithRung7.fss:19`'s citation of `CompilerBuiltin.tex`. `CompilerBuiltin.fsi` is in `LibraryBuiltin/`, which the build renders, so the two agree. The skill also agrees.
- **Disposition: reword.** This is a light correction of the two referents.

## F-163, what each specification folder is

- **Scope: fail.** "The one prose to search" is wider than the comparison it rests on, which is between two copies, `Specification/` and `Specification-1.0-frozen/`. The restart's Types chapter is a third text. P-25 tells a worker to cite it beside `Specification/`, and F-166 calls it the team's latest word on the exclusion rule. Quoted: "The in-repo `Specification/` is the one prose to search".
- **Present meaning: fail.** The sentence on Appendix I is true of the frozen copy: its `appendices/changes.tex` has 16 lines, a note that links to a dead changeset. `Specification/appendices/changes.tex` now holds the revival's entries (4,149 lines; P-96). The sentence does not name the copy, so the reader can take it as the state of the copy that the title says to search. Quoted: "The team left Appendix I, the changes appendix, a stub."
- **Evidence: pass.** I ran the cited `git diff --quiet 2f8b4331a:Specification c02fa44d0:Specification-1.0-frozen`, and it exits 0. The same comparison between `c02fa44d0` and `HEAD` for `Specification-1.0-frozen` also exits 0, so the frozen copy has not changed since. `2f8b4331a` is dated 2011-02-02. `Specification/fortress/fortress.tex:24-36` defines `\note` as nothing only when `\release` is set. Report sections 5 and 7 hold the rest.
- **Comprehension: pass.**
- **Ownership: pass.** The entry has one subject: what each specification folder is. F-164 was merged in for that reason.
- **Consistency: pass.** P-96 and the skill's `specification.md:6` say the same of the frozen copy. The point about P-25 is under scope.
- **Disposition: reword.**

## F-165, the repository's lineage

- **Scope: pass.**
- **Present meaning: pass.** `git merge-base --is-ancestor 8fe1daa8f main` succeeds. `git merge-base main origin/clean-ladder` is `a874948ac`, and `origin/clean-ladder` is `8332bd34f`. `FTypeArrayList.java` is in `interpreter/evaluator/types/`, and `FTypeTuple.java:203` and `:242` use it.
- **Evidence: fail.** The route names the section "The facts", which holds the fork, the graft and the counts of the port's files that are gone or changed. The entry's own claims are in the section "Verification against Pavol's recollection (the same worker, re-briefed)", in its items "Working code" and "Verdict": that the `FTypeArrayList` fix is the only piece of the port that runs, and that `lineage.md` lists the rest for removal. Quoted: "Detail: `coordinator/lineage.md`, "The facts"."
- **Comprehension: pass.**
- **Ownership: pass.** The skill's records part, "The repository's history", also gives the fork and the graft commit. The entry adds what the skill does not hold: that `main` descends from the graft, the one running piece of the port, and `clean-ladder`.
- **Consistency: pass.** P-19 agrees and points here.
- **Disposition: reword.** Add the second section to the route.

## F-166, the team's latest word, and the POPL 2019 paper

- **Scope: fail.** The title says that the restart is the team's latest word "on types". The body says that the POPL 2019 paper is later than both texts and gives P-48's instance rule, and P-26 also counts that paper among the team's later word. The title holds for the topics of the restart's Types chapter, such as the exclusion rule and covariance, not for types in general. Quoted: "The team's latest word on types and on the exclusion rule is the unfinished restart, not `Specification/`." against "Later than both, the type group's POPL 2019 paper gives P-48's instance rule."
- **Present meaning: pass.**
- **Evidence: pass.** `coordinator/spec-lineage.md` section 6 holds the reading topic by topic. The restart has later prose on Types and, in part, on Lexical Structure. `Specification/` is the only statement on static parameters, on traits beyond a stub, on exceptions, on components and on the numeric library. `research/extracts/ParkPOPL2019-extract.md` section 6 holds "Method type parameters may not appear in upper bounds, so F-bounded method parameters are outside the calculus (p. 11:11)". `reviews/decisions-review/popl-recheck.md` exists.
- **Comprehension: fail.** The reader can take "bars a method type parameter from an upper bound" to mean that a method type parameter may have no upper bound. The paper's rule is that a method type parameter may not occur in an upper bound, and that is what puts F-bounded parameters outside the calculus. The extract also lists top-level functions and functional methods as outside the calculus (pp. 11:3 and 11:25). That is a second reason why the proof does not cover `SUM`, which the rewrite may give as "among other limits". Quoted: "Its calculus bars a method type parameter from an upper bound, so its soundness proof does not cover the library's F-bounded functions, such as `SUM` and `BIG MAX`."
- **Ownership: fail.** The entry has two subjects, which change apart. One is which text is the team's latest statement on each topic: the restart or `Specification/`. The other is what the POPL 2019 paper proves and leaves out. No other FACTS entry owns the paper's scope: F-175 holds only the specification's use of the paper's rule. The history says that the consolidation kept the paper's scope here "for the record test's scenario 5". That is a reason of process, not of subject. Quoted: the three sentences from "Later than both" to "checks the curator's decisions against it."
- **Consistency: pass.** P-25 and P-26 point here and agree with the body. P-48 rests on the paper.
- **Disposition: reorganize.** Split the paper's scope into an entry of its own: its instance rule, the limit on F-bounds and the recheck. Repoint P-26, which cites F-166 for the paper; P-25 cites it for the restart and keeps the pointer. Narrow the title to the restart's topics.

## F-167, the specification's statement of instantiation exclusion

- **Scope: pass.**
- **Present meaning: pass.**
- **Evidence: fail.** The route names the decision record's sections 2 and 3. The title's last claim, the callout on the calculi of Appendix A, is in section 4.2, in its paragraph "Decided 2026-09-26": four callouts, in `Specification/appendices/calculi/{basic,where,overloading,acffd}/calculus.tex`. The other claims are where the route says, and the tree agrees. `types-vals-vars.tex:242` names instantiation exclusion. `traits.tex:381` states the rule on declarations. `trait-parameters.tex:397-398` bars a `where`-clause variable from an `extends` clause's static arguments. Rows 331, 406 and 414 are open. Quoted: "Detail and examples: `compile-ladder/rung-spec-route-a/decision-record.md` sections 2 and 3."
- **Comprehension: fail.** "Its refused examples are the library's shapes" can be read as saying that the library's shapes are refused. It means that each example that the rule refuses now shows the library's shape, with the original beside it, marked "Not allowed". The "two cases" are not named. Row 406 is an object that extends two instantiations that differ only in a `bool` argument. Row 414 is an object that extends two instantiations of one trait, one of whose arguments is a static parameter. Quoted: "its refused examples are the library's shapes" and "The checker does not yet refuse two cases (rows 406, 414)."
- **Ownership: pass.**
- **Consistency: pass.** F-47's pointer "F-167 lists them" expects a list that this entry does not hold (see the points that cross entries).
- **Disposition: reword.**

## F-168, the specification's number chapters

- **Scope: fail.** One sentence claims more than the tree holds. The number chapters state P-74's coercions (`basic-lib/numbers.tex:27-56` and `basic-integers.tex`). `grep` finds no `SUM` or `PROD` in `numbers.tex` or `basic-integers.tex`. The entry's history ties P-78 to the reductions callout, which starts at `basic/expressions/reductions.tex:27`. That callout is outside the number chapters. It states only P-78's rule that a reduction writes its static argument, not the generic `SUM` over `AdditiveGroup` or `PROD` over `MultiplicativeRing`. Quoted: "The chapters state P-74 and P-78."
- **Present meaning: fail.** "The integer `^` has no result for a negative power" was the record's reading when rung T landed (decision record, section 5, decision 4: "nothing in the revised chapter gives its result"). Since `5ad4a9957` the method entry gives the result: "An integer raised to a negative power is an integer only when the base is 1 or -1 ... If the base is 0, the power throws DivisionByZero; for any other base the result is no integer, and the power throws IntegerOverflow" (`basic-integers.tex:534-537`). Quoted: "The integer `^` has no result for a negative power."
- **Evidence: fail.** The cited section 3 supports the rest of the entry: sections 3.1 to 3.4, and a `git diff` of the advanced chapter against the frozen copy shows one callout of 17 added lines and nothing removed. But the current text above contradicts the power sentence, and nothing in the number chapters supports the P-78 sentence.
- **Comprehension: fail.** "Refined types are gone" needs P-80 to say which types: the subtypes by sign, such as positive ℚ. It also does not say what replaces them: a test of the value at run time. "The chapters state P-74 and P-78" gives two bare pointers. Quoted: "Refined types are gone."
- **Ownership: pass.** The entry has one subject: how the number chapters describe the library. The power rule would sit better with F-172's integer rules (see the disposition).
- **Consistency: fail.** F-263 holds the same rule for the library: "at a negative exponent, the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`". The specification now states it too, but F-168 says there is no result. Quoted: as under present meaning.
- **Disposition: reorganize.** The text in the tree settles the conflict, so this is not an investigation. Correct the power sentence, and move it to F-172, the entry on the specification's integer rules, with a pointer to F-263. Limit the P-78 sentence to the reductions callout, or remove it. Name the refined types. F-172's sentence on the rational type's traits can come here, beside ℚ (see F-172).

## F-169, what the Working Draft left unwritten

- **Scope: fail.** The Working Draft did give numeral types: `NaturalNumeral[\n,10,v\]`, `Literal[\v\]` and `Numeral[\n,m,r,v\]` (evidence-B section 1.1; `Specification/basic/expressions/literals.tex:83-129`). Its note says only that their hierarchy is not described. What the Working Draft did not do is name the type that a library gives a numeral, or relate the numeral types to the number types. The specification's own callout says so: "The Working Draft of February 2011 described the numeral types above, which no library declares, and did not name the type that \library\ give a numeral" (`literals.tex:154-156`). The team's numeral text still stands in `Specification/`, so the second clause is also too wide for numerals. Quoted: "The Working Draft never wrote static-argument inference, a numeral's type or a range's integer width; the specification's text on all three is the revival's."
- **Present meaning: pass.**
- **Evidence: pass.** Evidence-B holds the claims on inference and ranges, and the narrowed claim on numerals. Section 1.2: the inference chapter is 27 lines of heading and notes. Section 1.4: "No integer type is named". Section 2: in the restart, "infer" occurs nowhere, and the relation of numerals to the number types is not given.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: fail.** P-76 speaks of "the specification's numeral types, which the team left unfinished", and the specification's callout says that the Working Draft described them. F-169 says that the Working Draft never wrote a numeral's type. Quoted: "never wrote ... a numeral's type".
- **Disposition: reword.** For example: the Working Draft never named the type that a library gives an integer numeral.

## F-170, the specification's ranges

- **Scope: pass.** `Specification/basic/expressions/ranges.tex:42-50` and `:88-109` say what the entry says.
- **Present meaning: pass.**
- **Evidence: fail.** The row pointer is on the wrong sentence. Row 485, "the specification does not say whether a `nat` parameter may be a component of a range" (FIXED in `f54ffac90`), supports the first sentence of the body. The entry puts it after the sentence on a wider counter, which `ranges.tex:88-109` supports and which no row holds. Quoted: "A wider counter widens each element (row 485)."
- **Comprehension: fail.** "A wider counter widens each element" compresses the specification's "A loop whose counter must have a wider integer type runs over a range of ZZ32 values and widens each element" (`ranges.tex:88-89`). The reader cannot tell what widens what. Quoted: as under evidence.
- **Ownership: fail.** The last sentence is about walk's reading of a `nat` used as a value at an `NN32` binding. That is the subject of F-140, of row 486 and of P-76's walk gaps, not of the ranges. It has no consequence for a range, whose components are `ZZ32`. The specification's callout (`ranges.tex:51-58`) says that walk makes such a parameter a `ZZ32`, which is the type that a range needs. Quoted: "Under walk a small `nat` size used as a value, such as `n` with `nat n = 3`, is a signed `ZZ32`, which an `NN32` binding refuses (row 486); F-140 gives walk's reading of a size used as a value."
- **Consistency: pass.** F-169, F-140 and row 486 agree. F-114 also agrees: `ant testSpecData` runs `SpecData/examples/basic` and `advanced`, which hold the two examples (`Expr.Do.mySum.fss` and `Generators.GeneratorDefn.fss`).
- **Disposition: reorganize.** Move the `NN32` sentence to F-140, or leave it to row 486 and P-76. Move the pointer to row 485, and write out the sentence on the counter.

## F-171, the specification's reading of `comprises`

- **Scope: pass.**
- **Present meaning: pass.**
- **Evidence: pass.** `Specification/basic/traits.tex:235-258` holds the reading as coverage, the `where`-clause variables and the generic extender. Section 2 of the decision record says that the revision does not state whether a bare static parameter may be listed. Rows 407, 487, 489 and 490 hold the gaps.
- **Comprehension: fail.** Three passages need the report. "May stand unlisted between" means that a trait with static parameters may extend `T` without being listed, if at least one type extends it and every type that extends it is below a listed type. "Stays open" means that the specification does not say whether a bare type variable may be listed (row 407 records walk's stack overflow on one), but the reader can take it to mean that the variable is an open type. "The checker departs in rows 487, 489 and 490" names no departure. The three rows are: the checker checks only the immediate subtypes, it reads the clause in the subtrait's own type-variable names, and it finds extenders by the simple text of a name. Quoted: "a trait with static parameters may stand unlisted between", "A listed bare type variable stays open (row 407)." and "The checker departs in rows 487, 489 and 490."
- **Ownership: pass.**
- **Consistency: pass.** F-62 and F-121 agree. F-121 says that the specification lets a listed type hold a `where`-clause variable, and that the validity of the team's commented clause is open.
- **Disposition: reword.**

## F-172, the integer rules, the coercion example and ℚ's algebra

- **Scope: pass.** The claims are about what the specification states. The decision record's table in section 2 also gives what each path runs, and the entry claims a run only for the coercion example.
- **Present meaning: pass.**
- **Evidence: pass.** Section 2 of the decision record holds the table and decision 6, the example's two `excludes` clauses, measured: "the revised example runs on both paths as printed, `f(S32Of) = 1`". `basic-lib/numbers.tex:224-229` holds the four traits and says that their laws hold for the finite rationals. Row 394 was FIXED in `581356f32`. The run on both paths was a probe measurement of the rung (`probes/examples/SpecZZExcl.*`), not a gated test on the compiled path: row 394's test, `tests/CoercionMostSpecificRungC.fss`, runs under walk. The entry does not say this.
- **Comprehension: fail.** "The coercion example with the exclusions its definition needs" does not say which example it is: the `ZZ32`, `ZZ64` and `ZZ128` example of "Coercion Resolution", `basic/conversions-coercions.tex:580` and after. It does not say which exclusions: `ZZ32 excludes { ZZ64, ZZ128 }` and `ZZ64 excludes { ZZ128 }`. And it does not say whose definition: "its" is the chapter's definition of "no less specific" and of rejection, not a definition of the example. Quoted: "the coercion example with the exclusions its definition needs".
- **Ownership: fail.** The entry has three subjects, which change apart: the integer chapter's operator rules; the coercion chapter's example (row 394); and the rational type's traits, which belong with F-168's sentence on ℚ. Quoted: the title, "The specification states the library's integer rules, the coercion example with the exclusions its definition needs, and the rational type's library algebra."
- **Consistency: pass.** F-168 says that ℚ "claims neither a field nor a total order". That agrees with the four traits, which give a ring and a partial order.
- **Disposition: reorganize.** Move ℚ's traits to F-168, beside ℚ. Keep the integer rules here, and add the negative power from F-168 with F-263's pointer. Keep the coercion example here, or give it an entry of its own, and name the example and its two clauses.
