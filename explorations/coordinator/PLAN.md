<!-- The working plan. First written 2026-09-17 by the coordinating session on Pavol's request for a plan that can be followed, as the actionable form of map/README.md §5. Rewritten 2026-09-26 by a delegated worker (W4) from the plan Pavol approved that day, "Yes, this order and workers are go." (coordinator/POSITIONS.md, 2026-09-26, the plan; the coordinator's page https://claude.ai/artifact/3CKVcCdTRC5SJA2hz5Fk5C), which was built from the inventory coordinator/open-items-2026-09-26.md. The inventory cites a source for every line; the references in brackets below point into it (its items 1-36, its section B1's steps, its section C). The rule for every edit, the testing techniques and the stop conditions are kept from the plan of 2026-09-17, with what has changed marked; the last section says what the new order replaces. Sizes are in batches and rungs, never days. -->

# Plan: microGPT compiled on the JVM

The order Pavol approved on 2026-09-26 (`coordinator/POSITIONS.md`, 2026-09-26, the plan). The evidence under it is the inventory `coordinator/open-items-2026-09-26.md`.

## Where we stand, 2026-09-26

- **Runs.** microGPT runs under walk. Both check programs pass 40 of 40 from an empty cache (inventory B3).
- **Stops.** On the compiled path, all 18 of microGPT's components stop at name resolution. The compiler's own library has no `Array`, `Char`, `ImmutableArray` or `Vector`. This has not moved since the baseline, and it is expected: the fix is the switch-over, not new names in the compiler's library (inventory B3).
- **Decided.** One library, the interpreter's, becomes the library the compiler checks (09-21). The exclusion rule is kept and the number tower flattened, with walk taught coercion first (route A, 09-24). Sizes get a descriptor at run time (design B, 09-24). The array design comes after the switch-over.
- **Landed.** Batches 1 to 4. Batch 4 taught walk coercion, taught the compiled checker `nat` and `int` sizes, and fixed the `ZZ32` shift count. The checker reports 125 errors on the interpreter's library (`compile-ladder/climb-batch-4/RECORD.md`).
- **Decided, not built.** The specification rung S (S1 and S2 answered on 09-26); the wrapping operators ∔ ∸ ⨰, then rung O's overflow check; the run-time size rung; the flattening.

## The principle for the batches

Every batch lands with the specification, the library and both paths agreeing. So the work is grouped by what has to change together, not split finer.

Two rules of the batch machinery shape the order: two rungs in one batch may not change the same declaration, and a rung cannot build on another rung of its own batch, since every rung branches from the batch's base (`coordinator/climb-batch-workflow.js:465`, batch rule 1). That is why the wrapping operators and the flattening sit in different batches, and why rung O's check follows the operators.

## The phases

### Phase 1. Batch 5: what is decided and shares nothing

- The wrapping operators ∔ ∸ ⨰ declared in the interpreter's library. The library bodies and the five team tests that rely on wrapping are rewritten with them. No output changes (inventory B1 step 13; POSITIONS 2026-09-26, rung O).
- Rung S: the specification revised for route A, except the number chapters. Everything it describes already runs on both paths (inventory B1 step 10; POSITIONS 2026-09-26, S1, S2 and the number chapters).
- The run-time size rung (design B): a sized program compiles, loads and dispatches on its size. Row 402's size case in the exclusion rule can land at its gather (inventory B1 step 12; POSITIONS 2026-09-24, design B).

Needs answers 1 to 5 below.

### Phase 2. Batch 6: the tower flips, the specification with it

- The flattening rung. `ZZ`, `QQ` and `RR64` become siblings under `Number`, a wider type converts from a narrower one by `coerce`, and `SUM`'s catch-all is replaced (inventory B1 step 9; POSITIONS 2026-09-24, route A).
- The three number chapters of the specification, in the same batch (POSITIONS 2026-09-26, the number chapters).
- Rung O: the ten natives raise `IntegerOverflow`, with the count of changed tests measured again and expected at zero (inventory B1 step 13).

Needs answers 6 to 8. By inference, the checker count after it is about 44, not the 22 on record, because rung N uncovered 22 `fill` errors the flattening does not touch (inventory B2, C10).

What batch 6's brief must carry beyond the above (added 2026-09-26, after batch 5 landed):

- Answer 7 (POSITIONS 2026-09-26, answer 7): one generic sum and one generic product reduction over the algebra bounds, the identity chosen from the static argument by the `() -> T` witness `typecase` over all eight leaves. The two approved C4 diffs, together so the goldens are measured once: `MicroGptFlat.fss:43` becomes `SUM[\ZZ32\][j <- 0#i] matCount(j)`, and `:28`'s `BIG MAX[t <- z] t` becomes `BIG MAX z`. With them `FlatArrays.fss:181`, five check-program lines, the APL program's same lines, 11 library sites, 32 test lines (flagged as edits to the team's tests) and the S1-form note at `reductions.tex:23-25`. Its three defects are already ledger rows 424-426, not reopened at the gather.
- The three `Number`-typed big operators `BIG MAXN`, `BIG MINN` and `BIG MINMAXN` dropped in the flattening rung, with their reduction objects, fusion pairs and `distribute` overloads, api and component, and one line in the brief saying why (POSITIONS 2026-09-26; `reviews/max-min-identities-judgement.md` § 4). The gather records the drop on row 423.
- From the max-min judgement's § 5, on answer 7: the nine lines `Generator2Test.fss:58-60`, `:66-68`, `:74-76` (`BIG MAX[\Number\]` and `SUM[\Number\]` over a `Number[10]` array, `:53`) break on the flat tower and are on no list yet, so the array's element type changes with them, flagged like the 32; the witness `typecase` lists each leaf before any of its supertypes, narrowest first, `ZZ` and `QQ` before `RR64`, so the rung's copy is right even on the nested tower (a first commit, a bisect); C4's `BIG MAX z` is still unmeasured under walk (it rests on `RR64` being a `StandardMax[\RR64\]` on the flat tower, by reading), and the rung's gate is where it shows.
- Answer 6: the subtype lists of `basic-lib/numbers.tex` and `basic-lib/basic-integers.tex` rewritten as the library's run-time check methods (`check`/`check_star`, returning `Maybe`); `advanced-lib/numbers-advanced.tex` kept word for word and marked superseded in the S1 form, the original design recorded, pointing to worklist item 12 and row 404; no library or compiler work (POSITIONS 2026-09-26, answer 6).
- Answer 8: each wider integer type declares a `coerce` from each narrower one, and `ZZ32` and integer literals coerce into `RR64`; `ZZ64` into `RR64` stays explicit; a generic call or range over mixed widths writes its static argument until row 388's fix in phase 3; no model line changes (POSITIONS 2026-09-26, answer 8).
- Answer 10: `fill` redeclared in the leaf array traits, and its function form renamed `tabulate` (about 30 library call sites, 11 test lines, the function row of the specification's arrays figure, 12 vocabulary lines). It lands beside the flattening if the two share no declaration, else in phase 3 (POSITIONS 2026-09-26, answer 10).
- Astra's checks (POSITIONS 2026-09-26, the entry on Astra's review): the generic `Vector`/`Matrix` bodies checked per operation's required capability, with no blanket ring bound that would exclude integer arrays; the `SUM` replacement accepted on the empty sum's type as well as its value; a tiny `PView`/transpose product with its controls.
- The D follow-up (POSITIONS 2026-09-26, rung D's stop): rung D lands on `main` as a follow-up to batch 5, one worker applying `wip/rung-wrap-operators`, gating once and pushing if green. Rung O builds on D's operators, so the brief states whether D has landed. D's provisional rows 405 and 407 are already rows 427 (`HeapShakedown`) and 428 (`QQ`'s `opr <`), and its unary ∔ candidate is row 429, so D's landing opens only its provisional 406, the message order. Row 428's `XXX` walk test is owed no later than rung O. Rows 416 and 418 owe their `XXX` walk tests to whichever rung owns `ProjectFortress/tests/`.
- The rule for run-to-run output differences (POSITIONS 2026-09-26, rung D's stop): an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is not a stop; it is a ledger row. With it, the judge's advice for the flattening's and rung O's comparisons: list `XXXInheritedOverload` among the unstable files, citing D's order row (`compile-ladder/rung-wrap-operators/JUDGE.md` section 6).

Batch 6 landed on 2026-09-27 (F, the flat tower; T, the number chapters; `compile-ladder/climb-batch-6/RECORD.md`). Rung R (a size the call cannot fix in an overload set) landed by hand at `7278e11f7`, its approving verdict having been lost to a false-positive safety refusal; the follow-up 6b runs rung O.

### Phase 2b. The repair batch from the conformance reviews

Batch 6.5 (`coordinator/CLIMB-BATCH-6.5.md`, rungs E, P, G, V) is what the reviews of batches 3 to 6 call for. It moves no error of the distance, so it runs whenever a decision holds the queue, rung G first, because its rows (417, 419, 420, 351, 426) are on microGPT's compiled run (Pavol, 2026-09-27, the numerics synthesis's decision 5). Its question 1, when walk's numerals switch to `IntLiteral`, is answered by batch N below.

### Phase 3. The checker at a true zero

The order, Pavol's of 2026-09-27 (POSITIONS, the numerics plans; `reviews/numerics-plan-synthesis.md`). The measure is the distance stage every gate now reports (1,747 under the setting `any` at `ff1649cea`); the count stage stays beside it.

1. **Batch 7** (landed 2026-09-28, `compile-ladder/climb-batch-7/RECORD.md`; the distance 1,747 to 940, the count 62 to 22): H, the exclusion errors the flattening left and `AnyIntegral`'s clause; A, `fill`'s function form renamed `tabulate`; B, `extends Object` on the result-only parameter of `builtinPrimitive`, `fail` and `List`'s nullary comprehension, and row 421's `MIN`/`MAX`. Question 1 at the bound `Any`. Measured without H and A: 1,738 to 1,239 under walk's setting.
2. **Batch 7R, ranges over `ZZ32`** (`coordinator/CLIMB-BATCH-7R.md`; running since 04:32 UTC 2026-09-28): the one library's scalar ranges lose their integer type parameter, the checker crash it uncovers fixed, the specification's ranges text revised. Measured on a copy: about 230 fewer.
3. **Batch 7C, `comprises` after the 2012 reading** (his option 1 of 2026-09-28, POSITIONS; `reviews/anyintegral-comprises-judgement.md`): the checker's narrow accommodation (`everyKnownSubtypeListed`) and an S1 callout in `Specification/basic/traits.tex`; row 459 closes; the count stage rises 22 to 87 as the api's overloading and return-type checks run, the errors 7b and 8 repair. Two rungs, one run.
4. **Batch N, the inference rule with the numeral switch**: the checker and walk infer a static argument with coercion (answer 8's promotion rule is its number case) and keep the expected type at `f(x)` with a retry; the one library and walk take the sibling `IntLiteral`; the specification's inference chapter written. Four rungs. A checker shadow measures it first (`reviews/inference-rule-shadow.md`).
5. **Batch 7b** (S, C, W, L of `CLIMB-BATCH-7.md`): answer 9's overloading chapters, the return-type rule over every instance and the positional rule, walk's choice by declared domains, the library's overload families (about 70). After N, since W and N's walk rung share `OverloadedFunction.java`.
6. **Batch 8**: the meet rule (100, after probe P2), the self-typed `Integral` bodies (28), the one-line slips, and the residue class by class from the distance stage's table, to a true zero.

Decision D's diff (the sized signatures of C4's vocabulary) is written now and parked for phase 5 (`reviews/decision-d-diff.md`).

### Phase 4. The switch-over

- The natives: 29 of walk's 108 bindings with no compiler helper written, and the 231 of `FortressBuiltin` matched to existing helpers. Re-approval row 41 (an api whose component has another name fails to link) becomes live work here (inventory item 13).
- The names: the compiled path reads the interpreter's library, and the compiler's three prelude files are deleted with their tests kept. At least 48 compiler tests are respelled, the reversed wrap spellings of row 348 among them, and rows 381 and 383 close (inventory B1 step 15).

- From the reviews: printing an object with no `asString` overflows the stack once the compiled path reads the one library (`reviews/batch-3-conformance.md`); nothing in the library narrows a number with a check after the prelude's `asZZ32` leaves (`reviews/batch-3.5-4-conformance.md`).

Not yet designed as briefs. The record's shape is at least two batches (`coordinator/library-route-judgement.md:37`).

### Phase 5. microGPT compiles

- The model's static types (decision D). As written today, nothing in microGPT passes the checker whatever the storage, because its arrays are unsized in its types (inventory B1 step 17; `reviews/array-design-review.md:13`).
- The array design: row 40's three questions, the element width (`RR32` or `RR64`), and what puts `double[]` under the sized traits (decision A) (inventory B1 step 18, items 15 and 16).
- Code-generation holes, by reading: C4's `step` declares two local functions (row 304), and the APL base has a `typecase` (row 340). The 37 microGPT sites that reach `Number`'s catch-alls get re-measured (inventory B1 step 19, B2).

### Phase 6. microGPT fast

- Unboxed arithmetic chosen by static type in generated code (decision B). On array code boxing costs 6.3 to 6.5 times (inventory B1 step 18; FACTS § Execution model).
- Timing against a pure-Java microGPT, which is not written yet; then compiled parallelism (inventory B1 steps 20 and 21).

## Pavol's answers, in the order they are needed

One per message, as usual. Each has its recommendation or the default on record.

Before batch 5:

1. What S's citations call the unrevised copy. `Specification-1.0-frozen/` holds the 2011 working draft, not 1.0. The proposal comes with the ask: name it by what it is, the 2011 draft, with its path (inventory item 1). Answered 2026-09-26, "Option 1, agreed.": "the Working Draft of February 2011", each citation with its path and line in `Specification-1.0-frozen/`, which stays untouched (POSITIONS 2026-09-26, the first of the batch-5 answers).
2. Do sizes and boolean arguments count in the exclusion rule? The Fable judgement: yes, every static argument except operator arguments; the checker's fix (row 402) lands with the run-time size rung (inventory item 2).
3. Is the 2012 `covariant` keyword mentioned in the specification's text? Default: no, the decision record only (inventory item 3).
4. Loader or factory for a size's descriptor. Both give the same answers on nine programs. The worker's reading: the factory, since a size made at run time gets its descriptor directly (inventory item 7).
5. Do `NN32` and `NN64` stop wrapping under walk too? Row 379's natives do not cover them, and `UnsignedTest` relies on the wrap. No default on record; it decides how far the wrapping rung reaches (inventory item 8).

Before batch 6:

6. Does `RationalQuantity` survive as the specification's design for sign-refined rationals? The library never had it. No default (inventory item 4).
7. The replacement for `SUM`'s and `PROD`'s catch-all on `Number`, shown as a diff if it touches C4. On record: an empty sum of 0; the choice among the three shapes is open (inventory item 5).
8. Mixed-width ranges and real widening. What `lo:hi` infers over mixed widths, and which outputs change when a binding really widens. No default (inventory item 6).

Before the switch-over:

9. The overload sentence (`Specification/basic/overloading.tex:100-107`): drop it as both implementations have, or restructure the library. It goes through a clean list (W2) and a top-tier judgement, with his yes for Fable (inventory item 10).
10. The `fill` pairs. A clean list first (W3). One way is measured, renaming the function-taking `fill`, but it touches 23 calls in C4 and the APL base (inventory B1 step 11).
11. The count as the switch-over's measure. It became report-only on 09-23 without his yes, and it cannot see the whole distance. Proposal: keep reporting it, and measure the full distance separately (W1) (inventory item 14, C11).
12. Rung N's decision 3 (a size left unknown at a call is refused there), the dead sizes' diff (25 api declarations), and row 41 (the linker lookup). Rung N's reading is the default; the other two come with the switch-over's design (inventory items 11, 12 and 13).

Before batch N, raised by climb batch 7 (`compile-ladder/climb-batch-7/RECORD.md`, rung B):

20. The bound `Object` that climb batch 7's rung B wrote, as decided, on `List`'s nullary comprehension operator (`Library/List.fsi:109`, `Library/List.fss:177`) clears no error: its one site, `List.fss:150`, is refused before and after. Under rule T-Invk it makes ill-typed a list comprehension written at a tuple, arrow or `()` element type, and the library's own unary comprehension operator with it (`Library/List.fss:179-180`), which today's checker accepts only because it checks no written static argument against its bound (row 470). The fork: drop the nullary's bound, which changes no count, or bound the unary operator too, which narrows every list comprehension to `Object` element types, against `Specification/basic/trait-parameters.tex:53-54` and the tree's comprehensions at tuples. The default on record is the line as landed (POSITIONS 2026-09-27, the numerics plans); neither the rung nor its skeptic recommends a way. It comes before batch N, whose inference rule addresses row 425's class, the one the bound moved `List.fss:150` into. Evidence: `compile-ladder/rung-result-bounds/REPORT.md:211` (section 12) and `SKEPTIC.md:102` (section 12, point 1).

Before batch 7b, raised 2026-09-27:

14. The sentence rung S wrote, that a where-clause variable may not appear as a static argument in an `extends` clause, which refuses more than the rule (`reviews/batch-5-conformance.md`). Not decided: he wants a plain explainer first. Batch 7b's specification rung leaves the sentence alone until he answers.
15. Arithmetic in a size. The checker refuses it (rung N), and the one library stores every rank-2 and rank-3 array in a field sized by a product (`Library/FortressLibrary.fss:2519`, `:2667`, `:2890`; 11 errors in the full measurement). The cheapest way is a checker that compares size expressions by structure and folds numeral products (`reviews/batch-3.5-4-conformance.md`).
16. Rung C's two points that reached him only as parked lines: walk and the compiled run choose different overloads when an argument's static type needs a coercion but its value matches another; the judge's choice of which tuple bindings convert (row 395). Default: take both as landed; sent with batch 7b's walk rung.

Before batch 7b, raised by climb batch 7 (`compile-ladder/climb-batch-7/RECORD.md`):

22. `TotalComparison`'s shape after climb batch 7's rung H, a choice the rung did not report and its skeptic brings. (a) As landed: `extends { Comparison }`, with `MIN`, `MAX`, `MINMAX`, `<=` and `>=` restated by hand; `BIG MIN` and `BIG MAX` over total comparisons now stop walk (row 461). (b) The library's own device for a partial order that also has `MIN` and `MAX`, `extends { Comparison, StandardMinMax[\TotalComparison\] }`, as the 2012 `Number` and the flat `RR64` and `QQ` have it; measured on a copy: the count stage 44, cleared 192 (190 and row 421's two errors, which rung B's edit removes on the merged tree), the distance stage 1,672 (six of them row 421's), walk's values the base's, `BIG MIN` and `BIG MAX` restored. No default on record; the landed shape is (a), and (b) is one header line of the declaration. It comes before batch 7b, whose rung L works on the headers of `StandardMin` and `StandardMax` beside it. Evidence: `compile-ladder/rung-exclusion-remainder/REPORT.md:150` (section 16, D1) and `SKEPTIC.md:48` (section 5).

23. Appendix I's introduction says every change in it follows from route A (`Specification/appendices/changes.tex:48-49`). Climb batch 7's rung A's entry, "Initializing an array from a function" (answer 10), does not, and says so in its first sentence; batch 7b's rung S will add overloading entries (answer 9) that do not either. The introduction is neither rung's passage, so the ask is whether it may name the decision each entry follows. No default on record. It comes before batch 7b, whose rung S writes the next entries. Evidence: `compile-ladder/rung-tabulate/REPORT.md:247` (section 10), which its skeptic confirms (`SKEPTIC.md`, section 16).

Before the switch-over, raised by climb batch 6's rung R (`compile-ladder/climb-batch-6/RECORD.md`, rung R; filed 2026-09-27 from `reviews/batch-6-conformance.md`, finding 1):

17. Row 446: a call whose argument's static type lies above a sized arm's domain is not refused, and at run time a `ZZ32` value reaches the sized arm, which dies with `NumberFormatException` where it reads its size. The row holds three candidates.
18. Row 447: a type parameter that occurs only in a return type is bound to `BottomType`, and the compiled instance crashes at load. It also undoes the premise answer 12 relied on for types, that a dead type parameter compiles harmlessly (the review, finding 1). Since climb batch 7's rung B, the one library's `fail[\T extends Object\]` has this shape at every value-position call (`Library/FortressLibrary.fss:1430`, `:1460`, `:1506`, `:2521` among them): the decision's reason that binding `Bottom` is harmless covers the natives, whose bodies the switch-over replaces, and not `fail`, whose body stays. A value-position call bound to `Bottom` compiles and fails JVM verification; the compiler library's `fail(s: String): Zilch` runs compiled but is outside the specification and fails under walk; and the row's candidate of refusing such calls would bring back the error rung B cleared. So code generation for a `Bottom`-bound result is owed before the switch-over (the note on row 447; `compile-ladder/rung-result-bounds/SKEPTIC.md:103`, section 12, point 2).
19. The numeral split noted on row 79 (`ee(5)`: walk 1, compiled 2), which the row's scoring conflicts with. It goes with the review's finding 2, a numeral's type modelled three ways (the specification, the compiled checker, walk).

Asked 2026-09-27, waiting for his answer:

- A line for principle 5 of the protocol: a worker's change is reviewed by reading the change, not its report.
- Re-deriving the ledger's worklist and counts over all rows, grouped by the plan phase that closes each open row.
- May a Fable judge rule overnight on a review's findings?
- F's `=` on `Number`, flagged for him in rung F's report; a judge striking a candidate from a fork (`reviews/batch-3-conformance.md`).

After the switch-over:

13. The array questions and the element width. Through the clean-list method, the library's own way first (his ruling on row 40, POSITIONS 2026-09-25) (inventory items 15 and 16).

## Work that can start now, with no decision

Evidence only. Nothing lands on `main` except notes and record fixes. Each is one Opus worker, about 0.4M tokens by the inventory worker's cost. The four went out on 2026-09-26 with the plan's yes (POSITIONS 2026-09-26, the plan).

- **W1. The true distance to the switch-over.** Count everything the gate cannot see on today's tree: behind the api's early return, the library's component, and both desugaring settings. Re-run desugaring and code generation once, and time the dispatch generator. Shadow copies only.
- **W2. The clean list for the overload sentence.** Every way the language and the library offer, the library's way first, by a worker that has not read our notes.
- **W3. The clean list for the `fill` pairs.** The same method, with what each way changes in the library, the tests and C4.
- **W4. Record repairs.** The inventory found twelve stale spots (inventory C), among them the handover's "what comes next", four FACTS lines, ledger rows 348 and 403, and the re-approval table. `PLAN.md` is rewritten from the page once he says yes to it: this file.

## Off the path, parked

None of these blocks a batch or the switch-over. The default is to park each until it becomes relevant, and to bring it to Pavol then. His unanswered re-approval rows are here: none of them takes priority, except row 41, which joins the switch-over's design.

- Raised by climb batch 6's rung T, the number chapters, none blocking a phase (`compile-ladder/climb-batch-6/RECORD.md`, rung T; filed 2026-09-27 from `reviews/batch-6-conformance.md`, finding 1): the reading that ℚ holds +∞, −∞ and 0/0 and so is neither a field nor totally ordered; whether `QQ` declares `check` and `check_star` now that it no longer inherits them from `RR64`; the result of a negative integer power, which the revised chapter does not give (walk 0.5, compiled 0, the Working Draft 1/2; row 441); whether "(exact)" in the numeral coercion into ℝ64 excludes a numeral above 2^53 (row 443).
- Re-approval rows 42, 44, 45, 46 and 48, and the ledger homes 374 to 377 (inventory items 17-22).
- Row 331's bare `Nothing` re-gated on type inference (the judgement proposes it), and the judgement's candidate rows 2, 3 and 5 (it says yes to each) (inventory items 24 and 25).
- Row 360, a numeral within half an ulp of a tie, which rounds as its nearest double on both paths (inventory item 23).
- Rung C's two reported points: route A's price is wider than first put to him, and the judge's scope for tuple coercions (inventory item 35).
- The closure accommodation he approved on 09-21, which the flattening makes moot (inventory C8). Climb batch 7's rung H measured that the flat library does not make it moot: it is one of the ways of item 21.
- Workflow option (b), the review's second script change, and the test-name comparison in the gate (inventory items 26-28).
- The root README's line on `Specification-1.0-frozen/`, the lineage cleanup, and the inventory's move list (inventory items 30-32).
- A ledger row for code generation refusing any declaration with a `where` clause; a section for the cost rows (inventory items 33 and 34).
- Housekeeping: the remote `wip/` branches, the scratchpad sweep, the GitHub-issues plan, the cleaner pass of `main`, the skill-extraction session (inventory items 29 and 36).
- Climb batch 7's rung H's repair of the `Condition` site, zero.md's P3d, costs one behaviour: a program's own `p1 ANDCOND p2` of two relational predicates is no longer a relational predicate under walk, while `filter` keeps the fusion and the condition's value is unchanged (row 458; `compile-ladder/rung-exclusion-remainder/REPORT.md:58`, section 7).
- Climb batch 7's rung H met the stop "a new checker error the distance stage shows as caused rather than unmasked", reversible and landed under his decision of 2026-09-27 on the stops a batch record reserves: `SQCAP` between `Maybe`'s and `Just`'s declarations and `isLeftZero` in `LexicographicReduction`, which the base's false exclusions hid and the triage measured, both batch 8's (`SQCAP` in the Meet Rule class, `isLeftZero` among the one-line slips); and four errors in the families that move between runs, one of which, the array join at `array2`'s function form, erred in all four runs after the edit and in none of the two before, a site rung A rewrites (`compile-ladder/rung-exclusion-remainder/REPORT.md:169`, section 18; `SKEPTIC.md:149`, section 15). Rung B's worker listed the same stop for three sites of the same families, that one among them (V2 at the base's `FortressLibrary.fss:2710` and `:2232`, BR at `:130`); its skeptic found each in distance tables on file from before the batch, `:2710` in the triage's control run L0 under the numeral shadow, which edits no array declaration (`perf-probes/prelude/distance-triage/compare-L0-walk-num.txt:172`), so rung B's record lists that stop as not met (`compile-ladder/rung-result-bounds/SKEPTIC.md:31-34`, section 4; `compile-ladder/rung-result-bounds/probes/skeptic/three-sites-on-file.txt`). The two records read the one site by different standards, rung H's against its own base table and rung B's against every table on file; on rung B's reading, rung H's stop is met at that site on its letter only (the merged-diff review of climb batch 7).
- Two defects in the comparisons' bodies under walk, recorded and not repaired by climb batch 7's rung H, since each repair changes a value walk prints: `LessThan`'s and `GreaterThan`'s `CMP` answer the converse of their own `<` (row 456; the specification silent; the gated test pins today's values), and a total comparison `LEXICO Unordered` answers `Unordered` where the specification gives the left argument (row 457; its expected failure is `ProjectFortress/tests/XXXLexicoUnorderedRungH.fss`, and the compiler prelude's body is the one-line repair) (`compile-ladder/rung-exclusion-remainder/REPORT.md:140`, section 15).
- The compiled checker does not narrow a shorthand `typecase`'s variable, and neither path accepts the binding form `typecase x = e of`; the clause-binding form the library writes checks and runs under walk and is not read compiled (row 460, with row 351; `compile-ladder/rung-exclusion-remainder/REPORT.md:145`, section 15).
- Typecase's binding syntax (judge-review.1; climb batch 7's judge, `compile-ladder/climb-batch-7/JUDGE-review.md`, finding 2 and "For Pavol"). The specification gives `typecase x = e of` with clauses of types only (`Specification/basic/expressions/typecase.tex:53-93`). Since the Working Draft it has carried a note that the section "should be revised according to the changes in the pattern matching proposal" (`:15`). Between February 2009 and December 2011 the implementers replaced the form with `typecase Expr of` and a per-clause `x: T =>` (`ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:122`, `:237-251`; `ProjectFortress/astgen/Fortress.ast:594-607`), which the library and the team's tests write (`Library/CompilerLibrary.fss:40-43`, `ProjectFortress/compiler_tests/Compiled6.av.fss:16-19`). Under his weighting of 2026-09-23 and 2026-09-27, the judge recorded the binding form's defect in home 3 (row 460), with no `XXX` test. Candidates: (a, the default) a later specification rung revises the section to the implemented grammar in the S1 form, which needs no code; (b) the binding form is the standard: an `XXX` walk test, then a parser, AST and name-resolution repair that tells the form apart from a typecase on an equality; (c) both forms, with the parser work of (b). The shorthand form's narrowing (`:126-133`) stays as the specification states it. Nothing waits on it.
- Climb batch 7's rung H adds two files to `ProjectFortress/tests/` where the batch record counted one per rung, so `testSystem`'s sum rises by two for H; its expected failure `XXXLexicoUnorderedRungH.fss` has no `.test` file, as no `XXX` file of the interpreter corpus has (`compile-ladder/rung-exclusion-remainder/REPORT.md:157`, D8).
- Climb batch 7's rung A put `fill` and `tabulate` where the array diamond meets, `StandardMutableArrayType` and `ImmutableArray1` (`Library/FortressLibrary.fsi:1446-1447`, `:1500-1501`), not in each of the four leaf traits answer 10's words name. The leaf placement, measured first, leaves the meet refused for both methods, as `copy` is refused there today (row 467), and the meet is the shape the judgement measured for the decision's count. His to confirm; the landed shape is the default (`compile-ladder/rung-tabulate/REPORT.md:184`, D1; `SKEPTIC.md:142`, section 12).
- Climb batch 7's rung A named the factories' function forms `tabulatedArray1`, `tabulatedArray2`, `tabulatedArray3` and `tabulatedVector` (`Library/FortressLibrary.fsi:1561`, `:1568`, `:1671`, `:1783`), where answer 10 gave no name; the ways weighed were `tabulate1` to `tabulate3` with `tabulateVector`, and dropping the function factories. The name is his to change, 4 declarations and 8 calls (`compile-ladder/rung-tabulate/REPORT.md:196`, D2).
- Climb batch 7's rung A respelled 32 lines of eight demos, though its brief's list of files named no demo, and left `ProjectFortress/demos/mg.fss:20`, which passes a value or a function to `fill` and now fails at that line when given a function, where on the base it failed later, at `:159` (row 464; `compile-ladder/rung-tabulate/REPORT.md:209`, D4). Its skeptic counts that demo's output as the reserved stop "a changed walk output", met, reversible and landed under his decision of 2026-09-27.
- The paragraph after the specification's arrays figure says the `fill` methods are defined in terms of `init` (`Specification/advanced/parallelism-locality/arrays-distributed.tex:71`); it stays true of `fill`, says nothing of `tabulate`, which is defined the same way, and lies outside rung A's passages (`compile-ladder/rung-tabulate/REPORT.md:248`, section 10).
- Climb batch 7's rung B edited ten lines where the batch record counts eight: the ten its section 4 and the decision name (`fail`, `StandardMinMax`'s `MIN` and `MAX` and `builtinPrimitive`, api and component, and `List`'s nullary comprehension operator), measurement C's tree 1 line for line; the stop is met on its letter and lifted by the decision of 2026-09-27, the numerics plans (`compile-ladder/rung-result-bounds/REPORT.md:201`, D2).
- Climb batch 7's rung B opened rows 469 to 471 for his review, and its skeptic rows 472 and 473 and a note on row 447: `ArrayList`'s `enlargeLeft`/`enlargeRight` call `fill[\T\]` with an array of the list's `E`, unmasked by row 421's fix (469); the compiled checker checks no written static argument against its bound (470); walk reports an argument outside an `Object` bound as an `InterpreterBug` (471); the component's unary `BIG MAX` declared `(T,T)` (472); `BIG MINMAX` stopping walk for every element type (473) (`compile-ladder/rung-result-bounds/REPORT.md:182`, section 10).

## The rule for every edit under the sealed tree (kept from 2026-09-17)

Test first: a program that fails today is added to the compiler's own corpus (`ProjectFortress/library_tests/` for library rungs, `ProjectFortress/compiler_tests/` for checker and codegen rungs; a `.fss` that prints `PASS` plus a `.test` file naming `link`, `run`, `run_out_contains=PASS`, the format of `library_tests/Boolean.test` except for its check line: `run_out_WIcontains`, which that file writes, is not implemented by the harness and silently falls back to the default check (FACTS, R1 of the repair batch, `FileTests.java:147`; corrected 2026-09-19).
- Changed since: the harness implements `run_out_WIcontains` as whitespace-insensitive containment since `a0fcf0a96` (2026-09-19; `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:155-163`; FACTS § The harness and the gate), so `Boolean.test`'s format holds whole.
- Changed since: a rung on walk's side adds its test to the interpreter corpus, `ProjectFortress/tests/`, where a file named `XXX*` is a gated expected failure (FACTS § The harness and the gate), as climb batch 4's rung C did. The discipline is Pavol's of 2026-09-17: the test is written and seen failing before the fix, and stays in the corpus (POSITIONS 2026-09-17); every measured and repaired defect gets a gated assertion, a deferred one the specification settles an `XXX` test (POSITIONS 2026-09-19).

Then the edit, as small as the test needs.

Then the check: the new test passes; `ant compileAll` (only when Java or Scala changed), `ant testFast`, `ant testSystem` stay green; the ladder subset that stopped on this rung's name is re-run and moves up with nothing moving down.
- Changed since: in a batch the gate runs once on the merged tree: `compileAll`, `testFast`, `testSystem`, the four-thread `atomic` runs, the ladder regression over `compile-ladder/baseline-2026-09-19/pass-list.txt`, and the checker count, reported and never red on its own (`coordinator/climb-batch-workflow.md`; FACTS § The harness and the gate, § The checker and the one library).

Then one commit: the edit, the test, the FACTS line, the handover state line, and a note on the ledger row it closes (rows are never renumbered; a closed row gets "fixed <commit>" appended to its notes). Footer as in `protocol.md`. Push the branch and fast-forward main.
- Changed since: in a batch each rung lands as one commit composed at the gather from its branch's net change, and the batch record names each (`compile-ladder/climb-batch-*/RECORD.md`); pushes follow protocol § 4, and a worker commits its own files as it goes (protocol § 5, 2026-09-26).

Shadow first when the edit is in Java or Scala and the outcome is uncertain (`perf-probes/template-check/run-all.sh` is the recipe); library edits need no shadow, `fortress compile` reads the `.fss` directly. A fork a probe can settle is probed before the batch is briefed (POSITIONS 2026-09-22).

## Testing techniques adopted, decided 2026-09-17 (kept)

One corpus, both backends: the interpreter tests (`ProjectFortress/tests/`, 381 programs then, one `assert` per operator where it matters) are the ladder for the compiler path; the ladder driver in `explorations/compile-ladder/` runs them unchanged through `fortress compile` and `run` and records the phase each reaches. Progress is the count that passes. Kotlin's box tests are the model. Since 2026-09-19 the ladder is a gate stage over the measured pass list, 85 of 410 files at batch 4's gate (inventory B1 step 2; FACTS § The harness and the gate).

Golden output where a value matters: a run test may carry a `run_out_equals` expectation (the harness already supports it, `FileTests.java:140-271`) instead of only "contains PASS". Scala's `.check` files are the model. Applied per test, not retrofitted.

Tiers named: positive (compiles and runs), negative (`XXX` prefix, `compile_err_equals`), conformance (`SpecData/examples/`, 133 spec programs, today outside the gate). `ant testSpecData` joins the gate when its red count is known.

Not adopted: rewriting the harness on lit and FileCheck, inline diagnostic annotations. Cost without gain on the path.

## Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept)

Any source in the tree may be edited under the rule above; which file it is in is not a decision. What stops the climb: a design fork (the array representation, boxed against `double[]`/`int[]`; the library route, the interpreter's library as prelude against growing the compiler library beyond what one rung needs; any change of semantics against the spec; deleting a test to get green); a rung's gate red twice after one repair (revert, record, continue with the next name); disk under 500 MB after sweeping `/tmp/fortress*rats`, `ProjectFortress/test-tmp` and `ProjectFortress/test-caches`; a permission denied.
- Changed since: the two forks named are decided. The storage is `double[]`, unboxed, with the `nat` sizes (POSITIONS 2026-09-19), and the array design's remaining questions come after the switch-over (POSITIONS 2026-09-22, 2026-09-25 on row 40). The library route is one library, the interpreter's (POSITIONS 2026-09-21).
- Changed since: on a red gate over a merged batch, Pavol's rule of 2026-09-17 applies: the source of the conflict is found holistically and that part is reworked in the merged batch, and dropping a rung is taken only when its approach is wrong, not its code (POSITIONS 2026-09-17; `coordinator/climb-batch-workflow.js:645`). What reaches him are the forks already reserved, not new ones invented at the point of difficulty (POSITIONS 2026-09-17). A batch's own stops are in its manifest (`coordinator/CLIMB-BATCH-*.md`).

## What the order of 2026-09-26 replaces

The steps of 2026-09-17, and what became of each:
- Step 0, tag `sealed-tree` at `75cca6683`: done.
- Step 1, the ladder baseline (`explorations/compile-ladder/REPORT.md`), marked "running": done; its pass list is the ladder-regression stage's baseline (`compile-ladder/baseline-2026-09-19/pass-list.txt`).
- Step 2, the two one-line runtime defects (rows 302, 303): done at `53362cb88` (FACTS § Execution model).
- Step 3, the climb of library rungs in `Library/CompilerLibrary.fss` or `LibraryBuiltin/CompilerBuiltin.fss`, and its batch 1: stopped for prelude names by the one-library decision of 2026-09-21, while code-generator rungs continue (POSITIONS 2026-09-21). Climb batches 1 to 4 landed; their records are under `compile-ladder/`.
- Step 4, `nat` static parameters in the checker: done for `nat` and `int` by rung N of climb batch 4 (`3f297441c`); `bool`, `dim` and `unit` are refused by name and row 307 stays open for them (FACTS § The checker and the one library). The run-time half is phase 1's run-time size rung.
- Step 5, the array types and the algebra above `Number` with the representation decided up front: replaced. The array types reach the compiled path with the interpreter's library at the switch-over (phase 4), and the array design is phase 5 (POSITIONS 2026-09-22, 2026-09-25; inventory C3).
- Step 6, the codegen holes the program hits: phase 5.
- Step 7, the kernels and C4 compiled and run, the differential check against the interpreter, the timing against the Java baseline: phases 5 and 6.
- "Steps 3 and 4 are therefore one climb", with rung 1 as the `Equality` knot: the eight-rung climb it describes ran on 2026-09-17 (`compile-ladder/CLIMB.md`), and the work has gone in batches since, run by `coordinator/climb-batch-workflow.js`.

Also replaced:
- The paragraph of 2026-09-21, "The order and the first step's shape are put to Pavol as a plan after the exclusion trace (`perf-probes/prelude/exclusion-trace.md`) lands": this plan is that plan (inventory C3).
- The territory map's order (`map/README.md` § 5, 2026-09-16), of which the plan of 2026-09-17 was the actionable form. The map predates the one-library decision: its step 2's two routes were decided on 2026-09-21, walk's coercion, "not on the path" there, landed as route A's first rung (`b628871a2`), and its step 4 opens on rows 302 and 303, fixed at `53362cb88` (inventory C4).
- The step order of `coordinator/library-route-judgement.md` § 2, whose destination Pavol took on 2026-09-21: it puts decision D's diff "as soon as step 3 lands and before any array rung" (`:39`); decision D is phase 5, after the switch-over (POSITIONS 2026-09-22; inventory C9).

Refused rungs: rung 1, `Equality`, 2026-09-17, under the old boundary: recorded in `compile-ladder/rung1/REPORT.md`; re-opened under the widened rule and landed the same day (`1bd8d3ad1`).
