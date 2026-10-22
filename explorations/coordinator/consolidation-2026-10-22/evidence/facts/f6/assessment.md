<!-- Chunk f6 of the FACTS clarity assessment: F-76 to F-87, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `a898e1baf`. -->

# FACTS chunk f6: assessment

The base is `main` at `a898e1baf`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`, and the five worked examples of `process-engineering/record-rule-draft.md` (F-78 is one of them). Then I followed the cited evidence in bounded sections: the reports, the ledger rows, the tests, the library and the checker's code. I ran no experiment and searched no transcript.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-76 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-77 | pass | pass | pass | pass | pass | pass | keep |
| F-78 | pass | pass | pass | pass | pass | pass | keep |
| F-79 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-80 | **fail** | pass | pass | pass | pass | **fail** | **reword** |
| F-81 | **fail** | pass | pass | pass | pass | **fail** | **reword** |
| F-82 | **fail** | pass | pass | pass | pass | **fail** | **reword** |
| F-83 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-84 | **fail** | pass | pass | pass | **fail** | **fail** | **reorganize** |
| F-85 | pass | **fail** | pass | **fail** | **fail** | pass | **reorganize** |
| F-86 | pass | pass | pass | pass | **fail** | pass | **reorganize** |
| F-87 | pass | pass | pass | pass | pass | **fail** | **reword** |

Counts: keep 2, reword 7, reorganize 3, investigate 0. Every fail below can be settled from evidence that I read, so no entry needs a question answered first.

One cause recurs in F-80, F-81 and F-82. The compiled overloading checker skips every symbolic operator (row 584, open). `isDeclaredName` admits an `SOp` only when `NodeUtil.validOp` holds (`scala_src/typechecker/OverloadingChecker.scala:742-744`, read at the base). F-245 measured what that hides: with the skip lifted, the Meet Rule refused pairs inside one type in many symbolic families, among them `Indexed`'s three subscripts in 17 types, the ranges included (`perf-probes/symbolic-operators/REPORT.md` section 1.2). Those subscripts are still declared as measured (`Library/FortressLibrary.fsi:1297`, `:1309-1310`). The three entries state the checker's rule or the library's meets without that limit.

## F-76, the `comprises` coverage check and the intersection typing

- **Scope: pass.** The coverage check and the intersection typing are as the decision record says (`rung-return-type-rule/decision-record.md` sections 3 and 4). The body names the static-parameter limit. Note: section 4 also types the tie by the intersection only for candidates that fit without coercion or promotion. The entry does not say so, but the case is narrow, because an argument whose static type is below both closed traits fits them by subtyping. P-60 states the no-coercion bound of the proof.
- **Present meaning: pass.** The entry states what the checker does now and what is open.
- **Evidence: pass.** The tests exist (`ComprisesMeetCompiled`, `ComprisesBetweenTwoClosed`, `CoverageReturn*`). Rows 543 (deliberate, "head of a sort"), 546, 540, 559, 487 and 547 are open and say what the entry says.
- **Comprehension: fail.** The "Open:" list squeezes four rows into handles that a reader cannot expand without opening the rows:
  - "and the clauses' closure across components and the compile order (rows 487, 547)". "The compile order" stands for row 547: the verdict on an overload set can depend on the components compiled earlier in the same JVM.
  - "a method call (row 540) or a generic instance (row 559) at the intersection". This means a method call on a value typed by the intersection, which crashes the code generator, and a generic declaration instantiated at an intersection, which dies as it loads.
  - "a call whose argument sits between two closed traits". The entry dropped "static type" from the earlier text, and "between two traits" can be read as "below both". P-60's wording is "stands between closed traits and their listed types".
- **Ownership: pass.** It has one subject: the checker's half of P-60.
- **Consistency: pass.** P-60 (coverage used only in the overloading rules; generic declarations outside the proof), F-27 (walk's half), F-175 (Appendix I names the same rows) and F-80 (coverage judged per providing type) agree.
- **Disposition: reword.** Spell out the open items by what each one does: the compile-order dependence, and the two compiled-path failures on the intersection type. Keep the rows.

## F-77, the library's repairs of its refused overload families

- **Scope: pass.** The exclusions are in both files (`FortressLibrary.fsi:193`, `:205`, `:903`, `:2163`, `:2439`; `TotalComparison` at `.fsi:121-122`). The distance holds no overloading error (F-75, F-53), so "its refused overload families" are repaired. Two notes. The title says "with its own exclusions", but the body's `TotalComparison` gets a parent, not an exclusion (P-98). And the families that the checker skips as symbolic operators are neither refused nor repaired (row 584, F-245; F-81 names `String`'s). The entry does not claim them, so neither point is an overclaim.
- **Present meaning: pass.**
- **Evidence: pass.** `tests/LibraryOverloadFamilies.fss` exists. `rung-overload-families/REPORT.md` section 4 gives each device and the way not taken. The acceptance of the `seq` pairs is `rung-overloading-checker/REPORT.md` section 10 (row 556, fixed), reached through F-80.
- **Comprehension: pass.** "Its `seq` pairs" are the overloads of `seq` in the generator and array traits. A reader who knows `seq(...)` can restate it.
- **Ownership: pass.** One subject. P-98's build is part of the same overload work: under walk, without the parent, no `BIG MIN` overload takes total comparisons.
- **Consistency: pass.** P-45 and P-98 ("Built (F-77)"), F-80 and rows 555 and 589 (walk's handling of several minimal common supertypes) agree.
- **Disposition: keep.**

## F-78, the checker's instance for an unfixed parameter

- **Scope: pass.** The entry concerns the call's solver. F-56 says that the overloading check's comparison of type schemas still binds `BottomType`, and that fits this scope.
- **Present meaning: pass.**
- **Evidence: pass.** `rung-instance-bound/REPORT.md` section 1 gives the instance rule, the order of attempts and row 541. Row 559 is open and says what the entry says. `InferResultOnly*` and `InferContextKeepsFit` exist.
- **Comprehension: pass.** "Upper bounds" includes what the expected type requires, which P-48 states.
- **Ownership: pass.** Note: it holds two rules of one rung's call inference, the instance (P-48) and the first attempt (P-49). They interact: the first attempt, without the expected type, is what keeps a fit that the arguments already give (`InferContextKeepsFit`). The worked example keeps them together.
- **Consistency: pass.** P-48, P-49, F-73, F-56 and F-141 (walk's half) agree.
- **Disposition: keep.** It is the worked example's text, with row 541 kept on purpose (history, 2026-10-13).

## F-79, the one library's numeral type

- **Scope: fail.** Neither the title nor the body names the path. Quoted: "The one library's numeral type is the compiler library's `IntLiteral`". Only the compiled checker types a numeral `IntLiteral` (F-57, F-262). Under walk the numeral stays a `ZZ32`, `ZZ64` or `ZZ`, and no numeral reaches `IntLiteral`'s declarations (P-76, F-74). "It builds P-76's library half" is the only clue, and it is a pointer, not a statement.
- **Present meaning: pass.**
- **Evidence: pass.** `IntLiteral` is declared at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:179-221`, with `zero`, `one` and its arithmetic. `coerce(x: IntLiteral)` is in `RR64`, `QQ`, `AnyIntegral`, the four integer traits (`FortressLibrary.fsi:296-653`) and `NN32` (`FortressBuiltin.fsi:131-132`). Row 581 (`(3).minimum`) is open. `tests/IntegerOrderNumerals.fss` exists.
- **Comprehension: fail.** Quoted: "the compiler library's `IntLiteral`". This reads as a type that the one library takes from the compiler's prelude. In fact the interpreter's library declares its own `IntLiteral` on the prelude's model (P-76: "The design is the compiler's prelude's working one").
- **Ownership: pass.**
- **Consistency: pass.** P-76, F-74, F-57 and F-262 agree. The entry is narrower, not in conflict.
- **Disposition: reword.** Say that the compiled checker gives a numeral this type, and that walk does not until its half of P-76 is built (F-74). Say that the type is declared in the interpreter's library on the compiler prelude's model.

## F-80, the Meet Rule for Functional Methods in the checker

- **Scope: fail.** The title states the rule for every pair of functional methods of one name, and the body names one exception. Quoted: "judges two functional methods of one name by the Meet Rule for Functional Methods, in each type that provides both" and "Unchecked: a pair that only an object expression provides (row 570)". The checker skips every symbolic operator (row 584; `OverloadingChecker.scala:742-744`), so a pair such as `opr +(self, …)` or `opr ||(a:Any, self)` is checked by no rule. The rung that made abstract declarations count left operators "as row 584 leaves them" (`rung-checker-abstract-callsite/REPORT.md` section 1).
- **Present meaning: pass.**
- **Evidence: pass.** Section 1 of that report supports "abstract declarations included" (row 572, fixed) and the No Duplicates refusal (row 727). The tests exist and their keys match: `XXXNoDuplicatesRuleAbstract` expects "There are multiple declarations of f", and `XXXFunctionalMethodMeetAbstractSibling` expects "Invalid overloading of pick in". The memo's key is `rung-overloading-checker/REPORT.md` section 7.
- **Comprehension: pass.** Note: "keys its overloading memo on the check's inputs" leaves its consequence implicit: a cached verdict is never reused in another context, so a verdict no longer depends on the order in which pairs are checked.
- **Ownership: pass.** Note: the memo is a second claim, but it bears on the same check's verdicts.
- **Consistency: fail.** The "Unchecked:" list reads as complete. F-81 ("unseen only while the checker skips symbolic operators") and F-245 say that symbolic operators are skipped. The entries do not contradict each other in words, but F-80's list conflicts with them by omission, and does not state the different scope.
- **Disposition: reword.** Add the symbolic operators to what is unchecked, with row 584 and a pointer to F-245. If the memo stays, state its consequence.

## F-81, the library's meets inside one type

- **Scope: fail.** Two claims are wider than their support.
  - "The one library declares a method on the meet for each Meet Rule pair inside one type". This holds only for the pairs that the checker reads. With the symbolic skip lifted, F-245 found Meet Rule pairs inside one type without a meet: `Indexed`'s three subscripts in 17 types, `Number`'s and `StandardPartialOrder`'s `=`, `Maybe`'s `|_|`, `EmptyString`'s `||` (`perf-probes/symbolic-operators/REPORT.md` section 1.2).
  - "and its declared types match what their bodies answer". "Its" is the whole library. The rung's support is its own list of slips (`rung-library-meets/REPORT.md` section 1). `__bigOperator2`'s fused arm (row 632) is a declared-type mismatch of the library that is still on the distance (F-85, F-53, `distance-sites.tsv`). The clause can also be read as "the meets' declared types". Either reading needs a fix.
- **Present meaning: pass.**
- **Evidence: pass.** `tests/LibraryMeetDeclarations.fss` exists. Section 1 gives the meets, `String`'s three top-level juxtaposition operators and the slips. Rows 584 and 585 are open.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: fail.** Quoted: "Left: `String`'s `||`, `|||`, `//` and `///`, a refused shape unseen only while the checker skips symbolic operators (rows 584, 585)". This names `String`'s four families as the only ones that the skip hides. F-245 names others inside one type, and the entry does not state the different scope.
- **Disposition: reword.** Restrict the meets to the pairs that the checker reads, and point to F-245 for the symbolic families. Restrict the declared-type clause to the slips that the rung repaired, or drop it.

## F-82, the range types' meets

- **Scope: fail.** Quoted: "The one library's range types declare a method on the meet for each of their Meet Rule pairs". The range types provide `Indexed`'s three subscripts (`opr[i:I]`, `opr[r:Range[\I\]]`, `opr[_:TrivialOpenRange]`, with `I` unbounded). F-245's measurement found these pairs without a meet in 17 types, the ranges among them. The claim holds for the pairs that the checker reads (`CAP`, `IN`).
- **Present meaning: pass.**
- **Evidence: pass.** `rung-range-meets/REPORT.md` section 1 gives the meets. Row 580 is fixed, gated by `tests/RangeDeclarations.fss`. Row 603 is open and says what the entry says.
- **Comprehension: pass.** Note: the entry does not say that row 603 is an open library bug that changes a printed value (`SimpleReversedIndexed(mapped(…))`). The row says it.
- **Ownership: pass.**
- **Consistency: fail.** F-245's subscript family conflicts with "each of their Meet Rule pairs", and neither entry states the different scope.
- **Disposition: reword.** Limit the meets to the pairs that the checker reads, with a pointer to F-245 or row 584.

## F-83, the string components

- **Scope: pass.** No site of `compile-ladder/gate/distance-sites.tsv` is in `String.fss` or `FlatString.fss`. The five sites are the `FortressLibrary` export error, two `BIG MIN` sites, the fused arm and `List.fss:146`.
- **Present meaning: pass.**
- **Evidence: pass.** `FlatString.fsi:16-22` states the component's header with no `opr ||(a:FlatString, self)` (F-259). `reviews/array-sites-ways.md` section 4 lists `String` in the second export error, both among the different `extends` clauses and among the api traits with members that the component lacks. Rows 607 and 609 are open. `tests/StringPieces.fss` pins row 607's two answers.
- **Comprehension: fail.** Quoted: "`String`'s entry in the api's second export error, a different `extends` clause and members the component lacks, goes with that error". "The api" is `FortressLibrary`'s, which is where the trait `String` lives. "Second" is a position in F-53's list and in the review's, not a name. "Goes with that error" leaves the reader to work out that it clears when that error clears. So the reader cannot easily reconcile the title's "no site of the distance is a string component's own" with `String` appearing in a distance site.
- **Ownership: pass.** The export-error sentence explains the title's claim. The `FlatString` sentence is a pointer to F-259.
- **Consistency: pass.** F-53, F-259 and rows 585 and 726 agree.
- **Disposition: reword.** Name the `FortressLibrary` api's export error and say that the trait `String`, declared in `FortressLibrary`, has an entry in it. This is not a site of `String.fss` or `FlatString.fss`.

## F-84, the numbers', orderings', `List`'s and natives' declarations

- **Scope: fail.** Quoted: "The one library's numbers, orderings, `List` and natives answer their declared types". The support is the rung's 25 repaired slips. The rung left 35 sites (`rung-number-order-slips/REPORT.md` sections 1 and 5). The gating test checks those declarations under walk ("answer their values under walk", the header of `tests/NumberOrderListDeclarations.fss`). But under walk, `IntLiteral`'s own arithmetic answers a `ZZ32` against its declared `IntLiteral` (row 578, open, as F-263 says). `IntLiteral` is one of the one library's numbers.
- **Present meaning: pass.** The current declarations are stated. "(row 634, closed; F-255)" is a pointer with its row's status.
- **Evidence: pass.** `fail[\T\]` (`FortressLibrary.fsi:37`), `builtinPrimitive[\T\]` (`FortressBuiltin.fsi:30`) and `MatchFailure extends UncheckedException` (`FortressLibrary.fsi:1166`) are as stated. The powers' clause is supported by F-263. The `LexicographicOrder` clause is supported by F-255 and row 634.
- **Comprehension: pass.** Note: "`MatchFailure` is unchecked" means that it is an unchecked exception, not that the checker skips it.
- **Ownership: fail.** The entry holds four claims that change apart, and two of them belong to other entries:
  - the result-only parameters left unbounded (P-48), which F-70 points here for;
  - `MatchFailure`'s exception class;
  - "The integer powers answer their base's own type, and `QQ`'s power takes an exponent of any integer (F-263)", F-263's subject (P-153), added by climb batch 20's gather;
  - "`LexicographicOrder` bounds its element by `StandardTotalOrder`, and `List` extends it under that condition (row 634, closed; F-255)", F-255's subject, added by climb batch 20's routing.
- **Consistency: fail.** The title's general claim conflicts with F-263's statement of row 578 ("answers a `ZZ32`, as all its arithmetic does, against its declared `IntLiteral`"). F-84 does not state the different scope.
- **Disposition: reorganize.** Keep F-84 as the home of the unbounded result-only parameters, which F-70 and P-48 rely on, and of the rung's declaration repairs. Bound the title to those repairs and to walk, or name row 578. Reduce the powers and `LexicographicOrder` to bare pointers to F-263 and F-255, or drop them.

## F-85, the generator, condition and reduction declarations

- **Scope: pass.** The one site left is `__bigOperator2`'s fused arm (row 632), the site at `FortressLibrary.fss:1465` in `distance-sites.tsv`, as F-53 says.
- **Present meaning: fail.** Quoted: "The identities' numeral fallback now answers by `cast`, which clears its two sites but not row 436's empty `SUM` over a user group, and `embiggen` is typed over `MapReduceReduction` (row 631 closed; F-250)". "Now", "clears its two sites" and "row 631 closed" tell a batch's change. The present property is F-250's: the fallback answers by `cast`, so an empty `SUM` over a user group ends in `CastError`.
- **Evidence: pass.** `tests/GeneratorDeclarations.fss` exists. `rung-library-distribute/REPORT.md` section 7 shows the cast and `embiggen` clearing the sites of rows 436 and 631. Row 632 is open.
- **Comprehension: fail.** Several referents are not defined in the entry: "the identities' numeral fallback" (the `else => 0` branch of `additiveIdentity` and the functions beside it), "the reductions' `Any` devices", and "left there" in the title.
- **Ownership: fail.** The `cast` and `embiggen` sentence restates F-250, which holds "the identities' cast and a typed `embiggen`" and the `CastError`. "One site of the distance is left there" depends on F-53's current site list.
- **Consistency: pass.** F-53, F-250, F-93 and F-144 agree.
- **Disposition: reorganize.** Leave the `cast`, `embiggen` and row 631's closing to F-250 and the history. Keep the declarations that this entry owns (`cond`'s static argument), the fused arm with row 632, and the pointers to F-93 and F-144. Name "the identities" and "the reductions' `Any` devices", or drop the phrases.

## F-86, varargs in the compiled checker

- **Scope: pass.** Row 604 confirms both halves. The parameter is bound at `ImmutableArray[\T, ZZ32\]` of the library in use. Under the compiled library each use is refused, and under the one library the body is typed as the sequence (`rung-checker-defects/REPORT.md` section 4).
- **Present meaning: pass.**
- **Evidence: pass.** The `Varargs*` tests type-check the applicability. The refusals are pinned by the `XXXVarargs*` tests that rows 604 and 624 name. Rows 605 and 597's checker half are fixed by `aa07efb31`.
- **Comprehension: pass.** Note: "the expansion rule" is the expansion of `f(x, y, z...)` from `f(x, y)` up in `Specification/basic/overloading.tex:246-287`, "Applicability for Functionals with Varargs and Keyword Parameters". A pointer would help a reader.
- **Ownership: fail.** Quoted: "The checker also lets an object's fields shadow its inherited getters (row 605), and reads object expressions against `comprises` clauses, as walk does not (row 597)." These are two repairs of the same rung that have nothing to do with varargs, and each changes on its own. No other entry holds them. F-29 holds only walk's half of row 597.
- **Consistency: pass.** F-29 agrees that walk does not read an object expression against a `comprises` clause.
- **Disposition: reorganize.** Keep F-86 to varargs. Move the two other claims to entries of their own, or to the entry that owns the checker's `comprises` closure. Rows 605 and 597 are both fixed, so moving them to the history alone is also defensible.

## F-87, the contexts that give a call its expected type

- **Scope: pass.** Every context that the entry names is built and gated.
- **Present meaning: pass.**
- **Evidence: pass.** `rung-checker-contexts/REPORT.md` section 1 and the tests (`InferResultOnly*`, `InferLooseJuxtContext`, `InferTightJuxtContext`, `InferRepeatedOperatorContext`, `InferCallArgumentContext`) exist.
- **Comprehension: pass.** Note: "a repeated operator" is an operator repeated between three or more operands, which an older text said.
- **Ownership: pass.** The sentences on F-226 and F-70 are pointers with a few words each.
- **Consistency: fail.** P-50 decides that "The body of a `label` expression, and each value that an `exit` gives it, take the expected type of the whole `label`". It ends "Built (F-87 lists the checker's contexts that carry an expected type)". F-55 and F-56 also send the reader to F-87's list. F-87 lists only "a `label` body". The checker gives an exit's `with` value the label's expected type (`scala_src/typechecker/impls/Misc.scala:725-745`, `LabelExitTypes`), and `compiler_tests/InferResultOnlyLabelBody.fss` checks both the body and an exit's value. The version of 2026-10-13 named the exits, and later rewrites dropped them.
- **Disposition: reword.** Add "and the values that its `exit` expressions give" to the `label` context.
