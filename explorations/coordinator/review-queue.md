<!-- The items waiting for Pavol's word or review across the record (PLAN's nine lists "listed for his review" and its open answers, the review queue of 2026-10-02, and the process study's "Waiting on Pavol"), sorted on 2026-10-10 into consequential and routine items by theme, each with what landed, the other way, its cost and its home, and into settled or stale ones with what answered them; kept current as he answers. Sorted by the `coordinator` skill's `SKILL.md`, "The curator's role and decisions": an item is consequential when it reverses, bends or reads anew a decision on record, changes a line of the model program, touches two or more of the specification, the library and the implementation, chooses among ways the record does not settle, or cannot be undone. A defect the text settles whose route of repair alone is open, a changed walk value, a file outside a rung's list, or a text choice inside decided ground is routine. Built by a worker at `79c2a5602`; PLAN is unchanged there since `046207371`. Each settled entry was checked against its source: the commit by `git log -1`, the row's status by `ledger.py heads`, the file or line in the tree, the POSITIONS entry by its title. Before an entry is put to him, his words on it are searched in POSITIONS, its history and the transcript. The coordinator keeps this file current as items are answered. -->

What waits for Pavol's review, 2026-10-10

Line numbers are those of `main` at `79c2a5602`. A home in PLAN is named by its heading and its item number or opening words, since PLAN's consolidation of 2026-10-15; before it a home was PLAN's line number at `046207371`. "PLAN" is `explorations/coordinator/PLAN.md`, "PLAN-history" is `explorations/coordinator/PLAN-history.md`, which holds PLAN's closed items word for word, "POSITIONS" is `explorations/coordinator/POSITIONS.md`; report paths without a folder are under `explorations/`. A row is a row of the gap ledger. "(10-02: N)" names the entry of this file's version of 2026-10-02. The page for him is built from the same text (`scratchpad/review-backlog/page.html` in the coordinator's session).

**Counts**
- (b) Consequential: 55 items. By theme: The checker's typing and inference 9; Overloading and the Meet Rule 8; Walk's checks at load 3; Walk's choice of declaration and instance 3; Numbers and numerals 10; Sizes and arrays 8; The library's generators, strings and comparisons 4; The specification's text 2; Tests and the team's demos 1; Code generation and the run time 1; How batches run 6.
- (c) Routine, kept as landed unless he says otherwise: 130 items. By theme: The checker's typing and inference 7; Overloading and the Meet Rule 10; Walk's checks at load 12; Walk's choice of declaration and instance 10; Numbers and numerals 9; Sizes and arrays 4; Ranges 7; The library's generators, strings and comparisons 25; The specification's text 15; Tests and the team's demos 12; Code generation and the run time 3; How batches run 6; The record, its tools and the repository 10.
- (a) Settled or stale, leaving the lists: 79 entries, several of which bundle lines.
- PLAN's nine batch lists hold 202 entries: 32 in (b), 94 in (c), 76 in (a), each counted where it first appears.
- Every one of the 116 entries of 10-02 is placed; the last section maps them.

**Five to take first**, each because it holds work or acts on his word:
- 43, Team demo lines changed by the batches. It acts against his word on the demos, "Let's not touch them", and a step against his word is put to him at once.
- 1, The self-typed bodies. Answered 2026-10-13, way 6 (P-146).
- 30, A size known only at run time: way 4a and his decision on sizes. It reads his decision on sizes anew, and was built on the standing go while his answer is pending. The POPL check of the same judgements (item 33) is a new ask today.
- 14, Does coverage define an inherited abstract method? (item 51). Answered 2026-10-13, coverage (P-147).
- 17, Unwritten reductions whose parameter has a plain bound. Settled 2026-10-14 by the coordinator's call under P-48 and built by climb batch 15's rung B (`20474c144`).

**Checked against his words.** The check of 2026-10-02 stands for the entries it covered. His messages in this session's transcript since 2026-10-08 12:56 UTC, where it begins (113 user turns, compaction summaries among them), were searched for the words of every (b) item: none answers one. Two bear on them: on 10-09 at 15:10 UTC he sent rung W's two questions to a Fable check instead of answering them (`reviews/walk-load-readings-check.md`; items 14 and 73), and on 10-10 at 05:27 and 05:35 UTC his "land it now" settled item 52's route, not fork 2's bound.

## (b) Consequential, by theme

### The checker's typing and inference (9)

1. **The self-typed bodies.** In a trait such as `Integral[\I extends Integral[\I\]\]` the parameter `I` stands for the type that implements the trait. The checker types `self` there as the trait, not as `I`, so 30 library bodies that return or pass `self` as an `I` are refused. Walk runs them all.
   - Answered 2026-10-13 at 23:37 UTC: way 6, with one `numerator` per integer type (P-146); built by climb batch 14 (`1c32ccffd`, `604d0e23c`).
   - Landed: Nothing yet. The 30 sites stay on the distance. Batch 14's candidate is the judgement's way 6, a checker rule: the self type read from the bound, checked at each type that extends the trait. Its measured patch is 114 lines and clears 29 sites, none new; the thirtieth gets one body per integer type. It is a candidate for batch 14.
   - The other way: The team's own idiom, a `comprises` clause naming the parameter on seven traits (library, walk and specification change); a run-time cast in 21 library lines; or leave the 30.
   - Its cost: The checker rule bends a reading on record, that no self type enters the library, and changes the checker and the specification. The other ways change the library. The Fable check against the POPL 2019 paper finds that the rule stands, and that keeping the self type out of declared signatures is what keeps it inside the paper's ground.
   - Home: PLAN-history, "Phase 3. The checker at a true zero", items 7 and 10; under item 12, Landed as climb batch 14's rung S; `reviews/self-typed-bodies-judgement.md`, "For Pavol" and "The measurement"; `CLIMB-BATCH-8.md` Q2; `reviews/array-judgements-popl-check.md` section 5 (`8aa5bbd82`) (10-02: 2)

2. **The checker's three attempts at a call.** His decision on the order of the checker's attempts at a call names two: by subtyping without the expected type first, then by coercion with it. Batch 8's rung I kept a third between them, by subtyping with the expected type, so that a call whose untyped function argument only the expected type can fix still type-checks.
   - Landed: Three attempts. Five calls moved instance; `c: ZZ64 = idt(3)` now runs `idt` at the numeral type and converts the result, the inference chapter's own example.
   - The other way: The two attempts exactly as decided.
   - Its cost: Such calls with an untyped function argument would be refused, since the coercion attempt cannot check one (row 507), and the five calls measured again.
   - Home: PLAN, "Climb batch 8, listed for his review", The order of the compiled checker's attempts at a; `compile-ladder/rung-instance-bound/decision-record.md:57` (D4), `REPORT.md:78` (section 3); P-49, "The order of the checker's attempts at a call"

3. **A declaration chosen statically keeps its inferred instance.** Batch 7b's rung S wrote that a declaration the static call selected keeps the instance inferred for it. Where neither the call's static return type nor an invariant position constrains a type parameter, this departs from the POPL 2019 paper, whose rule his decision on the instance follows.
   - Landed: The sentence as written; the rung's decision record names the departure.
   - The other way: State the paper's rule there too: such a parameter takes its bound under the call's static return type.
   - Its cost: A sentence of the specification. Neither path runs the paper's rule here yet: the compiled dispatcher carries the call's static return type only in phase 5.
   - Home: PLAN, "Pavol's answers, in the order they are needed", Item 30's clause that a declaration the static call; the fold `086875900` on `wip/7b-popl-fold`; `compile-ladder/rung-spec-overloading/decision-record.md`; P-48, "A type parameter the arguments do not fix takes its bound ..." (10-02: 24)

4. **Does the inference chapter solve a call's type parameters together?** For `loneT[\S, T extends S\](a: T, b: T, s: S)` over an Apple, a Pear and a Pear, walk gives both parameters `Fruit`. Read one parameter at a time, the chapter gives `S` the type of `s` alone, and then `T` has no instance.
   - Landed: No default on record. Walk's answer is pinned by a plain test (row 613), and the chapter's box for the interpreter says nothing of the case.
   - The other way: Yes, jointly: the chapter gains a rule that walk already follows. No: the per-parameter reading stands, and walk's answer becomes a departure with a row.
   - Its cost: Either answer is new text in the inference chapter; one of them also changes walk. Row 612, walk keeping `Bottom` where such a bound mentions another parameter, sits beside it.
   - Home: PLAN, "Climb batch 9, listed for his review", D5's reach; Row 612; `compile-ladder/rung-walk-instance/REPORT.md:322` (section 9), `SKEPTIC.md:48`; `compile-ladder/rung-walk-meet/REPORT.md:291`

5. **Do `try`, `catch` and `atomic` bodies take the expected type?** He ruled that a `typecase` clause and a `label` body take the expected type of the whole. A `try` and an `atomic` have the same shape in the text: the type of a `try` is the union of its block's and its `catch` clauses' types, and an `atomic` has its body's type.
   - Landed: No: the checker gives them no expected type, and joins the `finally` block's type into the `try`'s, which the text does not. The chapter's "not yet described" item names them.
   - The other way: Yes: a checker rung measures and repairs them, and the chapter's list of contexts gains them, as for `typecase` and `label`.
   - Its cost: One checker rung, not measured, and an amended Appendix I entry.
   - Home: PLAN, "Climb batch 12, listed for his review", Do a `try` block and its `catch` clauses; `compile-ladder/rung-checker-contexts/REPORT.md:189` (section 10); `reviews/batch-12-review.md`, Part 4

175. **Where a conditional extension's condition holds: the other `extends` entries.** A trait or object may extend a type under a `where` clause, as `object Bad[\E\](x: E) extends { Wrap[\E\], Shows where { E extends Ord[\E\] } }` does. Climb batch 18's rung X first checked the whole `extends` clause under every condition, so it accepted that declaration, which the base refuses and whose run died at link time. Its skeptic's contested fix `bd18b6a47` checks each entry with its own conditions, and the members with all of them. The judge upheld the fix.
   - Landed: As ruled: a conditional entry's condition holds in that entry and in the members only (P-151; `Specification/basic/trait-parameters.tex:371-378`). Default, taken: as ruled.
   - The other way: The probe's reading, which checks the whole `extends` clause under every condition (`perf-probes/where-clauses/REPORT.md:343`).
   - Its cost: Reverting `bd18b6a47`, and filing the row the skeptic drafted (`compile-ladder/rung-checker-conditional-extension/SKEPTIC.md` section 4.2).
   - Home: PLAN, "Climb batch 18, listed for his review", X.skeptic.1 and X.judge.1; `compile-ladder/rung-checker-conditional-extension/JUDGE.md` section 2; `ProjectFortress/compiler_tests/XXXCondExtendUnconditionalEntryChecker.fss:10`

176. **Where a conditional extension's condition holds: the header.** After rung X, the checker still checked a declaration's static parameters, its own `where` clause, its `throws` clause and contract, and its `excludes` and `comprises` clauses with every conditional entry's condition holding. So it accepted three programs that the base refuses, 'Ill-formed type: W[\E\] ... does not satisfy the corresponding bound Shows.': an `excludes` entry, a `comprises` entry and a static parameter's bound, each well formed only under the condition. Rung X's judge saw it by reading (X.judge.2), and the merged-diff review ran it (review.1).
   - Landed: Ruled by the review's judge and repaired (`5b11849c6`): the header is checked with the declaration's own `where` clause only, and the entries, the value parameters and the members with the conditions (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:192-236`). An object's contract never reaches the checker, since the disambiguator drops it (row 781), so `Decls` is unchanged and the ruling's contract test waits on that row. Default, taken: as repaired.
   - The other way: Read "Within the declaration" (`trait-parameters.tex:375`) as taking in the header, which the judge did not hold, and check the header under every condition, as before the repair.
   - Its cost: A revert of the repair's edit. No library declaration has the shape, so the count and the distance move neither way.
   - Home: PLAN, "Climb batch 18, listed for his review", X.judge.2 of climb batch 18's rung X and review.1; `compile-ladder/climb-batch-18/JUDGE-review.md`; `compile-ladder/climb-batch-18/REPAIR-review.md` section 2; tests `XXXCondExtendExcludesChecker`, `XXXCondExtendComprisesChecker`, `XXXCondExtendParamBoundChecker`, `XXXCondExtendExcludesWhereChecker`

177. **Where an object's value parameters fall under a conditional extension.** Nothing on record settles it. A value parameter that is not transient is a field (`Specification/basic/objects.tex:271-272`), and P-151 puts the members under the condition. The constructor's arrow type holds at every instance (`objects.tex:204-206`).
   - Landed: As repaired: they are checked with the conditions, with the members. So a parameter typed only under the condition is accepted, and the object can be made where the condition fails: row 773's hole, which a member already has. Default, taken: as repaired.
   - The other way: Check them with the header: `walk(params)` moves to the header's analyzer in `TypeWellFormedChecker.scala`'s object case (`:235`), and `Decls.scala`'s object case (`:135-136`) binds them without the conditions, so a field typed only under the condition is refused.
   - Its cost: The count moves neither way: by reading, no library declaration or test has such a parameter. It belongs with row 773's scoping of members (item 178); a reversal is that edit, with one expected failure promoted.
   - Home: PLAN, "Climb batch 18, listed for his review", judge-review.1; `compile-ladder/climb-batch-18/JUDGE-review.md` sections 3 and 6; row 773

178. **The members of a conditional extension scoped to the condition (row 773).** The checker checks a member under a conditional extension's condition, as P-151 says. The member stays callable where the condition fails, since the members a type inherits are read at every instance: `Lst[\Fn\](Fn(inc), Fn(inc)).lt(...)` compiles, and its run dies at link time, 'NoSuchMethodError: ... CondExtendMember$Fn.lt(CondExtendMember$Fn)'. Swift, Rust and Haskell scope such members to the condition. The scoping waited on row 748's check at a dotted call, which rung K landed in the same batch; that check reads a method's own `where` clause only, so row 773 holds.
   - Landed: The members checked under the condition and not scoped to it; row 773 open. Default, taken: the scoping in a later batch, among the next batch's candidates (PLAN, phase 3, item 18).
   - The other way: Leave the members unscoped, with the row as the record of the hole.
   - Its cost: A checker rung beside row 748's check, with item 177's value parameters.
   - Home: PLAN, "Climb batch 18, listed for his review", X.worker.2; PLAN, phase 3, item 18; `compile-ladder/rung-checker-conditional-extension/REPORT.md:170`, `:225`; `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1829`; row 773

### Overloading and the Meet Rule (9)

6. **The Meet Rule's closed-trait case for generic families.** Item 26 gave the Meet Rule a case for two closed traits: declarations over the listed types cover their intersection. The text applies it to declarations with static parameters too; the checker refuses it there. Since batch 8, the functional-method form is accepted and dies at run time (row 566); the function form is still refused.
   - Landed: The text as batch 7b's rung S wrote it; the checker's refusal gated by expected failures; Appendix I names row 546 among the checker's departures.
   - The other way: Scope the text to declarations without static parameters until their coverage is proved; the proof addendum leaves generic families to later work.
   - Its cost: Keeping the text means a checker rung to follow, with the run-time dispatch defect of row 566. Scoping it is a text revision in the S1 form.
   - Home: PLAN, "Climb batch 7b, listed for his review", gather.1; PLAN, "Climb batch 8, listed for his review", Stop met and lifted; PLAN-history, "Climb batch 7b, listed for his review", Stop met and lifted; `compile-ladder/climb-batch-7b/RECORD.md`, rung S; `compile-ladder/rung-overloading-checker/REPORT.md:80` (section 5); row 546 (10-02: 27)

7. **An identical coercion on every candidate.** `choose(S, ZZ64)`, `choose(T, ZZ64)` and `choose(V, ZZ64)` called with a `ZZ32` need the same coercion for every candidate. Does that count as the conversion being fixed, so that the call is typed by the intersection of the return types?
   - Landed: No: an "Ambiguous coercion" error, batch N's rule. The text also says that covering does not choose between two coercions, so the three declarations are not a valid overloading; the checker accepts them (row 391) and refuses the call.
   - The other way: Yes: such a call is typed by the intersection.
   - Its cost: A yes also changes the Meet Rule's sentence for functions and a checker rule.
   - Home: PLAN, "Climb batch 7b, listed for his review", A call between two closed traits whose other argument; `compile-ladder/rung-return-type-rule/REPORT.md:354`, `JUDGE.md:78`; `Specification/advanced/overloading.tex:320-322` (10-02: 28)

8. **Coverage of functional methods below the providing type.** A functional method is a method called as a function, `f(x)`, with `self` among its parameters. The checker judges coverage in each type that provides the two methods, over what that type provides. A trait between the two closed traits that provides both and declares nothing (`SkFnBetween`) is refused compiled and runs under walk.
   - Landed: As the text and the checker have it.
   - The other way: Coverage also reads the declarations of the types below the provider, as the value reading would allow.
   - Its cost: Either answer is new text for the chapter. The checker's verdict on this program also depends on what the same JVM compiled before (row 547), so it has no pinned test.
   - Home: PLAN, "Climb batch 7b, listed for his review", The Meet Rule's closed-trait case on the compiled path; `compile-ladder/rung-return-type-rule/SKEPTIC.md:151` (10-02: 29)

9. **Exclusion through a bound.** Do two parameter types exclude each other when the only static arguments at which they could meet are ones a bound rules out?
   - Landed: The checker as it is: yes for a named forced argument, and it cannot conclude it through ancestors (the `CAP` shape). The text names the question in Appendix I's "Passages not yet revised".
   - The other way: The text answers it: rung S's "no", which the gather removed, or a "yes".
   - Its cost: A sentence of the overloading chapter, and a checker rule to match it.
   - Home: PLAN, "Climb batch 7b, listed for his review", Whether two parameter types exclude each other when the; `compile-ladder/rung-spec-overloading/SKEPTIC.md:140` (10-02: 31)

10. **A written static argument on a name with a generic and a plain declaration.** For `op[\ZZ64\](z, w)`, where `op` has a generic and a plain declaration, walk runs the generic declaration's instance and the compiled run dispatches to the plain one. The text says nothing of a static argument written on such a name.
   - Landed: No rule. Walk's answer is pinned by a test.
   - The other way: A rule: a written static argument selects the generic declarations only, or the call dispatches as if it were not written.
   - Its cost: A sentence of the overloading chapter; one path changes.
   - Home: PLAN, "Climb batch 7b, listed for his review", A written static argument on a name with a generic and a ...; `compile-ladder/rung-walk-dispatch/REPORT.md:233`; `ProjectFortress/tests/DispatchWrittenStaticArgWalk.fss:18`; row 504's note (10-02: 30)

11. **A family that mixes a function with functional methods.** Over two closed traits, a family that mixes a top-level function with functional methods is refused on both paths. The chapter's rule for functions and its rule for functional methods both apply to it, and neither says which governs.
   - Landed: The Working Draft's text; the ledger row alone records it.
   - The other way: The text says which rule governs, here or in a later specification rung, and the checker's mixed-family rule follows.
   - Its cost: A text revision. The answer also decides the way batch 8 did not take for `String`'s juxtaposition (the next item).
   - Home: PLAN, "Climb batch 7b, listed for his review", Row 545; PLAN, "Climb batch 8, listed for his review", `String`'s juxtaposition is three top-level operators since climb batch 8's rung M; `reviews/batch-7b-review.md`, Part 3; row 545 (10-02: 33)

12. **Symbolic operators in the overloading check (item 38).** The checker's overloading check skips every operator whose name is not a word in capitals, such as `+`, `<`, `||` and `//`, so the distance reads zero for families nobody has counted. `String`'s `||`, `|||`, `//` and `///` keep a shape the check would refuse; batch 8 moved juxtaposition, the same shape, to three top-level operators. Walk's Meet Rule check skips them too, and fails over them at `EmptyString`'s `||` (row 611).
   - Landed: No default on record. The skip stays; the four families as they are; juxtaposition as three top-level operators.
   - The other way: The four take juxtaposition's device, so the trait stays uniform; or all five wait for a rule that covers them, the text's own way, which needs the mixed-family rule of the item above.
   - Its cost: Opening the symbolic layer will surface families no table has counted. It bears on phase 3's true zero, so it is needed before the switch-over.
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 38; PLAN, "Climb batch 8, listed for his review", `String`'s juxtaposition is three top-level operators since climb batch 8's rung M; `compile-ladder/rung-library-meets/SKEPTIC.md:42`, `:155`, `REPORT.md:87`; `compile-ladder/rung-string-slips/REPORT.md:188`; `compile-ladder/rung-walk-meet/REPORT.md:284`; rows 584, 585, 611

13. **The approved `comprises` check decides by names.** The 14 lines of the checker's `comprises` check that he approved decide by how a type that extends the trait spells its type variable, and by simple names: an unrelated trait of the same name counts, and a false clause can pass.
   - Landed: The code as approved; one face gated by an expected failure (row 489).
   - The other way: Repair it: put the extending type's arguments into the clause, and match declarations, not simple names.
   - Its cost: It changes the 14 lines he approved. A sketch of the first half keeps every verdict measured but is not right inside the check's recursion. Nothing on the path waits on it.
   - Home: PLAN, "Off the path, parked", The `comprises` check he approved; `compile-ladder/rung-comprises-checker/SKEPTIC.md:322` (section 18); rows 489, 490 (10-02: 78)

189. **`tint`, two bounds that exclude (row 786).** Walk loads `tint[\T extends Red\](x: Box[\T\])` beside `tint[\T extends Blue\](x: Box[\T\])`, and the checker refuses the pair; `Bottom` lies within both bounds and cannot be written, so which path moves is his.
   - Landed: Both paths as they are, row 786 `CONTESTED`.
   - The other way: Walk refuses the pair, or the checker accepts it.
   - Its cost: A walk rung or a checker rung, with the specification's sentence.
   - Home: PLAN, "Climb batch 19, listed for his review", P.worker.1 and P.skeptic.1; row 786

### Walk's checks at load (3)

14. **Does coverage define an inherited abstract method? (item 51)** An object inherits an abstract method and defines bodies only at narrower types that together cover it through a `comprises` clause, as the team's `FileConversion` test and the library's `Pairs` do. The chapter says the object must still define the method itself; the checker says coverage defines it.
   - Answered 2026-10-13 at 23:43 UTC: coverage (P-147); built by climb batch 14 (`f9fe5c874`), after rows 668 and 669.
   - Landed: Walk's allowance: any body at narrower parameter types counts, which is wider than either reading.
   - The other way: (a) Coverage defines it, the checker's reading, which keeps `Pairs` and the team's test loading once walk is tightened. (b) Only a declaration at the abstract method's own parameter types defines it, the chapter's reading.
   - Its cost: It decides whether rows 666, 668 and 669 are defects of walk or of the library, and whether `Pairs` stays valid. The top-tier check of walk's readings finds coverage to be the team's own rule (Steele's 2012 checker, Welterweight) and asks his yes to the chapter's revision when a walk rung builds it, after rows 668 and 669 are repaired; the literal reading refuses `Pairs` and 20 demos. A batch 14 candidate waits on it.
   - Home: PLAN-history, "Pavol's answers, in the order they are needed", item 51; PLAN-history, "Climb batch 12, listed for his review", Q1 of climb batch 12's rung W; PLAN-history, "Phase 3. The checker at a true zero", under item 12, Landed as climb batch 14's rung S; `compile-ladder/rung-walk-load-checks/REPORT.md:228` (section 11), `SKEPTIC.md:131`; `reviews/batch-12-review.md`, Part 4 and finding 4; `reviews/walk-load-readings-check.md` section 2 and "For Pavol"

15. **Which `comprises` clauses walk checks at load.** Since batch 9, walk checks `comprises` clauses when it loads a program, but only the main component's. The text and the checker read every clause.
   - Landed: The main component only.
   - The other way: (i) Every clause: then every program importing `Reflect` is refused, because of the library's own `Reflect` object (row 595), and so are four team tests and two demos that extend `Number` or `Exception` (row 596). (ii) Every component outside the library, a scope the rung did not weigh: it refuses neither, and checks a program's own other components (row 551).
   - Its cost: (i) needs a library edit and team-test edits first. (ii) is one line, not measured. Walk's check of object expressions (row 597) goes with the choice.
   - Home: PLAN, "Climb batch 9, listed for his review", The scope of walk's closure check since climb batch 9's rung K; Row 597; PLAN, "Climb batch 7b, listed for his review", Rung W's walk half of row 492 trusted `comprises` clauses that walk ...; `compile-ladder/rung-walk-load-check/REPORT.md:315` (section 12), `:307`, `SKEPTIC.md:78`; rows 551, 595, 596, 597 (10-02: 43)

16. **What a `where` clause on an `extends` clause means.** In `trait G[\T\] extends A[\T\] where { T extends ZZ32 }`, an `override f(x: ZZ32)` stands over `A`'s `f(x: T)`. The text gives only the grammar of such a clause; walk read the extension as unconditional.
   - Landed: A lenience: the inherited declarations are read under the clause, so the `override` overrides.
   - The other way: The extension is read unconditionally, and the `override` is a static error.
   - Its cost: The answer belongs to the language's reading of conditional inheritance, which no implementation here models.
   - Home: PLAN, "Climb batch 13, listed for his review", QW-c; `compile-ladder/rung-walk-override/SKEPTIC.md:202` (section 5), `JUDGE.md:149`

### Walk's choice of declaration and instance (3)

17. **Unwritten reductions whose parameter has a plain bound.** Under walk, a big operator's static parameter with a plain bound still takes `Bottom`, the empty type, when nothing fixes it; batch 11 left only parameters whose bound names themselves open. Two defects sit beside it: an empty unwritten `SUM` over floats gives the integer 0 (row 645), and `Set`'s unwritten `BIG UNION` and `BIG INTERSECTION` stop (row 662).
   - Landed: As is, both rows gated by expected failures. Row 424 was closed for its other half only, so this case has no open row and this entry is its record.
   - The other way: Give plain-bounded parameters the open type too (not measured; six tests broke when given the bound), or desugar a reduction by its element type; or an open row that records the case as deliberate.
   - Its cost: The next walk rung waits on his word on this entry.
   - Settled 2026-10-14 by the coordinator's call 6 of climb batch 15, under P-48, a parameter nothing fixes takes its bound, never `Bottom` (`coordinator/CLIMB-BATCH-15.md` section 2), and built by its rung B (`20474c144`): walk fixes an unwritten clause form's parameter by the declared type of its value, else by its elements' join, else at its bound; rows 645, 646, 662 and 703 fixed. The empty case is row 716, B.worker.1's entry under PLAN's "Climb batch 15, listed for his review", and call 1 there is the call for his review.
   - Home: PLAN-history, "Climb batch 9, listed for his review", Decision D2 of climb batch 9's rung W; `compile-ladder/rung-walk-instance/REPORT.md:291` (section 8); `compile-ladder/rung-walk-open-param/REPORT.md:189`, section 11; `compile-ladder/rung-reduction-types/REPORT.md:210`; `CLIMB-BATCH-12.md:365`; rows 424, 645, 662

18. **Walk's choice when another declaration applies without coercion.** `g(a: Any, b: Any)` beside `g[\T\](a: T, b: T)`, called with an Apple and a Cherry, which share more than one closest supertype: walk ran the plain declaration, as the base did. Since climb batch 17's rung G, walk refuses this unbounded pair at load by the No Duplicates Rule; the choice stays for the pair with `T extends Fruit`, which row 589's test `ProjectFortress/tests/XXXDispatchTwoCommonParentsWalk.fss` now writes.
   - Landed: The base's choice, gated by an expected failure (row 589).
   - The other way: Pass the bound into walk's choice, so that the generic declaration is weighed at its bound.
   - Its cost: It changes which declaration walk runs, which the record leaves to him.
   - Home: PLAN, "Climb batch 9, listed for his review", Row 589; `compile-ladder/rung-walk-instance/REPORT.md:295` (section 8), `:311` (section 9); row 589

19. **The open type wins at dispatch.** Since batch 11, walk leaves open a parameter whose bound names itself, when nothing fixes it. A declaration whose parameter has the open type is then the most specific: in a `Holder[\OPEN\]`, `take(x: T)` runs for 3 where `take(x: ZZ32)` ran, and accepts a string it used to refuse. For tuples (row 663) it goes the other way: `pick(x: Any)` wins over `pick(x: (T,T))`.
   - Landed: As landed; the tuple face pinned by a test.
   - The other way: The open type ranks as least specific, or as its bound, when declarations are compared.
   - Its cost: A walk edit that changes which declaration runs. A program avoids it by writing the static argument.
   - Home: PLAN, "Climb batch 11, listed for his review", At dispatch under walk; `compile-ladder/rung-walk-open-param/SKEPTIC.md:61`, `:80`; `reviews/batch-12-review.md`, Part 4; row 663

### Numbers and numerals (10)

20. **`widen` of a `ZZ` too large for `ZZ64` (item 31).** `widen` turns an unbounded integer into a 64-bit one. No passage says what it does when the value does not fit.
   - Landed: Walk keeps the low 64 bits: `widen(2^64+5)` is 5. The compiled prelude has no `widen` on `ZZ`.
   - The other way: Raise `IntegerOverflow`, by the general sentence on integer results.
   - Its cost: No default on record. The switch-over's natives meet it.
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 31; `compile-ladder/rung-spec-integer-rules/SKEPTIC.md:103` (section 14), `decision-record.md` section 4, decision 4; rows 349, 502 (10-02: 13)

21. **`NN32` into `RR64` against answer 8 (item 37).** He decided that `NN32` converts into `RR64`, since it fits exactly. Built, that makes a `ZZ32` with an `NN32` ambiguous between `RR64`'s and `ZZ64`'s operators on both paths, where answer 8 gives `ZZ64`; two team tests go red.
   - Landed: Not built.
   - The other way: (1) About 32 mixed-width declarations; (2) the conversion alone, giving up answer 8 for this pair; (3) `ZZ64` into `RR64` as well, which loses precision.
   - Its cost: Every way to build it changes a decided behaviour.
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 37; PLAN-history, "Climb batch 8, listed for his review", R9, `NN32` into `RR64`; `compile-ladder/rung-numeral-library/REPORT.md:144` (section 8), `JUDGE.md:254`; `reviews/batch-8-review.md`, Part 1, rung Q; P-75, "`NN32` coerces into `RR64`."; row 575

22. **`Number` keeps one `=`, and `z = 0` goes through it.** Route A took `Number`'s catch-all operators away, but batch 6 kept its `=` so that `3 = 3.0` is not silently false. Since the numeral became a sibling under `Number`, the checker resolves `z = 0`, for a `ZZ32` `z`, to that catch-all and not to `ZZ32`'s own `=`.
   - Landed: The catch-all kept. Appendix I's entry on the numeral now names `=` and `=/=` as the operators where this happens.
   - The other way: Each integer type declares its own `=` with a numeral; or `Number`'s `=` goes, as route A says.
   - Its cost: After the switch-over a compiled `i = 0` would take the catch-all's general path; the fast shape of `=` is phase 6's question.
   - Home: PLAN, "Climb batch 8, listed for his review", `z = 0` for a `ZZ32` `z` resolves on; PLAN-history, "Pavol's answers, in the order they are needed", F's `=` on `Number`; `reviews/batch-6-conformance.md:60` (D1); `compile-ladder/rung-numeral-library/JUDGE.md:254`; `compile-ladder/climb-batch-8/JUDGE-review.md` (10-02: 94)

23. **May a program extend `Number`?** The team's test says "We ought to be able to extend the builtin type Number." The one library has closed `Number` with a `comprises` clause since 2012; the compiled prelude leaves it open; the specification gives `Number` no clause.
   - Landed: The library's clause kept; walk does not check it yet.
   - The other way: Open `Number`, as the team's test says; or edit the test to extend a listed type, against its stated intent.
   - Its cost: It touches the library, a team test and the scope of walk's check at load (the item there).
   - Home: PLAN, "Climb batch 9, listed for his review", Whether a user may extend `Number`; `compile-ladder/rung-walk-load-check/SKEPTIC.md:123` (section 5); `ProjectFortress/tests/extendNumber.fss:15`; rows 596, 551

24. **A float compared with NaN.** NaN is the float value "not a number". The overview of operators says a comparison with NaN raises `FloatingComparisonError`; the rational chapter answers false "for compatibility with floating-point arithmetic". Neither path raises; both libraries declare the error and nothing throws it.
   - Landed: False, as `RR64`'s own `<` does; the tuple comparisons follow it (row 672).
   - The other way: Raise the error, as the overview says.
   - Its cost: Two passages disagree: either the overview is revised in the S1 form, or the library and both paths change.
   - Home: PLAN, "Climb batch 13, listed for his review", Which passage governs a float compared with a NaN; `compile-ladder/rung-tuple-orders/REPORT.md:292` (decision 2), `:266` (section 7); `Specification/basic/operators/opr-overview.tex:287-288`; `Specification/basic-lib/numbers.tex:372-376`; row 672

25. **ℚ's infinities, and `check` on `QQ`.** The revised number chapter reads ℚ as holding +∞, −∞ and 0/0, so ℚ is neither a field nor totally ordered. And `QQ` no longer inherits `check` and `check_star` from `RR64`.
   - Landed: No default. The chapter as batch 6 revised it; `QQ` as it is. His later ruling that `QQ`'s `ceiling` and `truncate` raise at the infinities stands.
   - The other way: ℚ without the infinities; `QQ` declaring `check` and `check_star`.
   - Its cost: The number chapters and the library's `QQ`.
   - Home: PLAN, "Off the path, parked", Raised by climb batch 6's rung T; `reviews/batch-6-conformance.md`, finding 1; `compile-ladder/climb-batch-6/RECORD.md`, rung T (10-02: 101)

26. **The result of a negative integer power.** The revised chapter gives no result for an integer raised to a negative power. Walk answers 0.5, the compiled path 0, the Working Draft 1/2.
   - Landed: No default. Walk's unsigned power keeps a sign defect in its negative branch, left for this decision; two library sites of the distance wait on the contract.
   - The other way: A rational result, as the Working Draft; a float; an error; zero.
   - Its cost: The number chapters, the library and both paths' natives.
   - Home: PLAN, "Off the path, parked", Raised by climb batch 6's rung T; `compile-ladder/rung-size-range/REPORT.md:37` (section 3); `compile-ladder/rung-number-order-slips/REPORT.md:102` (section 5); rows 441, 438, 445 (10-02: 101)

27. **What "(exact)" means for a numeral above 2^53.** The coercion of an integer numeral into `RR64` is marked "(exact)", but a double holds every integer only up to 2^53.
   - Landed: No default. Walk does not convert a numeral outside `ZZ32`'s range into `RR64` at all; that goes to Q-walk.
   - The other way: Exclude such numerals from the implicit conversion; or round them.
   - Its cost: A sentence of the coercion chapter, and Q-walk's conversion.
   - Home: PLAN, "Off the path, parked", Raised by climb batch 6's rung T; row 443; P-76, "The numeral switch, split by where the static types are." (10-02: 101)

28. **A numeral within half an ulp of a tie.** A numeral with a decimal point is rounded as its nearest double, not as the rational it denotes: `round(2.50000000000000001)` is 2, not 3.
   - Landed: As both paths do it, gated by an expected failure.
   - The other way: (a) A narrow patch of about 30 lines; (b) numerals as rationals; (c) the team's design recorded as a decision.
   - Its cost: No default. It interacts with the float ruling on `floor` and `ceiling` and with the float hot paths.
   - Home: PLAN, "Off the path, parked", Row 360; row 360; `compile-ladder/rung-round-half-even/REPORT.md`; `open-items-2026-09-26.md` item 23 (10-02: 102)

29. **The checker refuses the model's numeral powers.** The checker refuses microGPT's powers of numerals as an ambiguous coercion.
   - Landed: Refused; no model line changed.
   - The other way: Repair it on the checker side, or on the library side.
   - Its cost: Phase 5 meets it. No model line changes either way.
   - Home: PLAN, "Phase 5. microGPT compiles", Row 533; row 533 (10-02: 107)

### Sizes and arrays (8)

30. **A size known only at run time: way 4a and his decision on sizes.** A size is a number used as a static parameter, as in `Array1[\RR64, n\]`. The library's `reflect` turns a number known only at run time into a value that carries it. Way 4a lets the checker read such an argument as a size fixed for that call.
   - Landed: Way 4a, built by batch 13 on the standing go while his answer is pending; ten library calls cleared. It reads an opened size as bound for the call, not as unknown.
   - The other way: If his decision on sizes means that any size the call's text does not fix is refused, way 4a needs his word and way 4c remains: run-time sizes stay unsized. Ways 4b, 4d and 4e are on file.
   - Its cost: It reads his decision on sizes anew. It holds the library's `array[\E\](x)` and two lines of the model's sized-types diff. The Fable check against the POPL 2019 paper finds that the judgement stands (the item on that check).
   - Row 682 hangs on it: read against the POPL 2019 paper's full text, a declaration taking `NatParam` beside a generic one taking its listed type is a valid pair in the paper's own calculus (no ground witness, so the generic is strictly more specific, walk's answer), and a duplicate only under way 4a's opening rule, which the checker applies. So the checker's refusal stands under way 4a, and walk's acceptance is its load check's; under another way the row's checker half goes (`reviews/array-judgements-popl-check.md` section 7).
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 13, fork 3; `reviews/array-fork3-judgement.md` section 6; `compile-ladder/rung-size-expressions/REPORT.md:180` (decision 4), `SKEPTIC.md:57`; `CLIMB-BATCH-13.md`, Q13.3; P-40, "Sizes." and P-55, "Arithmetic in a size ..."; `reviews/array-judgements-popl-check.md` section 3

31. **The bound of `Vector` and `Matrix` (fork 2).** Which bound the element type of the array family takes.
   - Landed: The two-trait bound, `Number` and `MultiplicativeRing`. Batch 13 built it and held it, because the checker then took 17 minutes; at his "land it now" it landed with the checker-speed fix as batch 13b: 24 sites gone, 4 new, the distance 105 to 85.
   - The other way: `Number` alone as before; `MultiplicativeRing` alone; a bound per operation; the specification's algebra after `where` clauses; arithmetic on `Number`, against route A.
   - Its cost: His answer on the bound itself is pending; the other ways undo what batch 13b landed. The Fable check against the POPL 2019 paper finds that the bound stands (the item on that check).
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 13, fork 2; PLAN-history, "Pavol's answers, in the order they are needed", item 52; `reviews/array-fork2-judgement.md`; `compile-ladder/rung-array-bound/REPORT.md` section 10; `compile-ladder/climb-batch-13b/RECORD.md` (`749ec523e`, `d96bc7776`); P-55, "Arithmetic in a size ..."

32. **Two size parameters that may be equal.** In `two[\nat a, nat b\]`, the checker counts `a` and `b` as different sizes, so a `typecase` arm that needs them equal is refused as unreachable. The team's own Q&A reasons that a parameter may equal what it may be instantiated at.
   - Landed: Kept, gated by an expected failure (row 683, contested).
   - The other way: Only two different numerals are known to differ.
   - Its cost: His answer to item 15 named a size name beside a numeral only; this extends it.
   - Home: PLAN, "Climb batch 13, listed for his review", Row 683; `compile-ladder/rung-size-expressions/REPORT.md:178` (decision 2), `SKEPTIC.md:22`; row 683

33. **The POPL 2019 check of the two array judgements, and row 682.** At his word a Fable worker read the judgements on forks 2 and 3, and batch 14's self-typed rule, against the type group's 2019 paper. It finds that both judgements stand and nothing reverses, and asks to write four sentences into the record. It also reads the paper as settling row 682: `f(x: NatParamT)` beside `f[\nat n\](x: Nt[\n\])` cover the same values, so they are duplicates; the checker's refusal is right and walk's acceptance is loose.
   - Landed: The check is on file; nothing of it is written into the record yet. Row 682 stays contested, the checker's refusal gated by an expected failure.
   - The other way: (1) Take the check: four sentences into FACTS, PLAN's phase 5 line, row 682 and batch 14's record. (2) The same, with row 682 left contested until a worker rereads one figure of the paper's full text. (3) Hold both pending array answers until the paper is reread whole.
   - Its cost: About an hour of a worker for (1); no code, test or walk value changes. The pending answers on forks 2 and 3 can be given at their defaults under (1).
   - Home: `reviews/array-judgements-popl-check.md`, "In short", section 4 and "For Pavol" (`8aa5bbd82`); PLAN, "Climb batch 13, listed for his review", Row 682; row 682

34. **Where a size too large for `ZZ32`, used as a value, is refused.** He decided that a size used as a value converts to `ZZ32`. Under walk a function declared `ZZ32` that returns a size from 2^31 to 2^32−1 quietly answers 2147483648 as a `ZZ64`; the compiled run raises "Not in range for ZZ32".
   - Landed: No place on record.
   - The other way: Refuse it where the function returns, at the binding, or where the size becomes a value.
   - Its cost: Still his to place. Q-walk, which makes walk convert a body to its declared type, meets it.
   - Home: PLAN, "Climb batch 6.5b, listed for his review", Where item 25 refuses a size too large for `ZZ32` used as ...; `compile-ladder/rung-size-range/REPORT.md:128`, `:154`; `JUDGE.md:49`; rows 387, 22 (10-02: 16)

35. **A call above a sized declaration's domain (item 17).** When a call's static argument type lies above a sized declaration's domain, the call is not refused, and at run time both paths run that declaration with no size. Where it reads its size, the compiled run dies with a Java exception.
   - Landed: As is; no default (row 446).
   - The other way: (a) The checker's call-site refusal extended to such declarations; (b) refuse at the declaration a size that occurs in no parameter type, the dead sizes' route; (c) a Fortress run-time error in place of the Java one.
   - Its cost: Waits for the switch-over.
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 17; row 446 and its earlier text in `explorations/fortress-gap-ledger-history.md`; `compile-ladder/rung-unknown-size-arm/REPORT.md` (10-02: 14)

36. **The dead sizes, the linker row and walk's unknown size.** Three items wait for the switch-over's design: the diff that deletes 25 api declarations' dead sizes; re-approval row 41, an exported name that fails to link when the component's name differs from its api's (row 320's open half); and whether walk refuses an unused unknown size as the checker does.
   - Landed: None built. The diff was re-based on 2026-09-29 and applies.
   - The other way: Each is put to him as a diff with the switch-over's design, which is not drafted yet.
   - Its cost: Part of phase 4's design.
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 12; PLAN-history, "Phase 3. The checker at a true zero", items 7 and 8; under item 6, A walk harness key for an expected load-time refusal to under item 8, Row 638; P-40, "Sizes."; `reviews/overloading-judgement.md` section 10, item 5; `reviews/decision-d-diff/rebase-2026-09-29/library-e3.patch`; row 320 (10-02: 15)

37. **The array decisions after the switch-over.** Forks 4 to 6 of the arrays: the element width (`RR64` or `RR32`), the model's sized types (decision D, 21 model lines out and 29 in), and what puts `double[]` under the generic traits (decision A).
   - Landed: None built; `RR64` as written. Plain explainers are to be prepared before the switch-over.
   - The other way: The ways on file for each (`reviews/array-design-ways.md` section 8). The element width: 5a `RR64` as written; 5b `RR32` throughout, with new float32 goldens from the reference; 5c the model generic in its width; 5d the width named once by a type alias, after aliases are built (row 18); 5e `RR32` storage with `RR64` sums; the two Java width pairs show no difference beyond their noise. The model's sized types (decision D): D1 the re-based diff, 21 model lines out and 29 in, each shown to him as a diff; D2 the vocabulary over the unsized `Array`, the model unchanged and its shapes unchecked, the sidestep his ruling of 2026-09-19 refuses; D3 D1 in the specification's `T^n` notation, which neither path takes today; D4 sizes static from the top, the batch size fixed at compile time; D1's 10 bridge lines are fork 3's answer. What puts `double[]` under the generic traits (decision A): A1 the library's witness `typecase` with its `cast`, measured on both paths, sized too; A2 a plain factory beside the generic one, compiled yes, walk refuses the pair today; A3 a factory name per element type; A4 the loader stamps an `RR64` class, the team's `Unbox` direction; A5 a special type, as `ZZ32Vector`; none is faster alone, and decision B (phase 6) unboxes the traffic.
   - Its cost: After the switch-over, by his decision. His own question, why microGPT uses `RR64` and not `RR32`, is owed an answer; the reason on record is the Python reference's float64 values.
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 13, fork 4; item 13, fork 5; item 13, fork 6; `reviews/array-design-ways.md` section 8; P-85, "The array design's three questions are open"; `experiment/run-c-goldens/README.md` (10-02: 100)

### The library's generators, strings and comparisons (4)

38. **The tuple comparisons (item 43).** The library's ten tuple comparison operators compared elements of any type. They now require each element to be partially ordered, and `Comparison` gains a lazy `LEXICO`.
   - Landed: The judgement's way, built on the standing go while his answer is pending; 17 sites cleared. Two costs it did not weigh: `(1,()) < (2,())` answered true and is now refused; and walk refuses `(1,2) < (1,2.5)`, numbers of two types at one position. A pinned nested comparison, `((1,2),3) < ((1,3),0)`, is now refused too.
   - The other way: A `where` clause or conditional member the checker reads; walk promoting the position first (an edit under row 511); or other bounds.
   - Its cost: It changes answers walk printed.
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 43; PLAN, "Climb batch 13, listed for his review", Extensions and pins of climb batch 13 (point 4); `reviews/tuple-comparisons-judgement.md`; `compile-ladder/rung-tuple-orders/REPORT.md:295`, `SKEPTIC.md:300`; row 634

39. **A generator's size (item 45).** Library code read a size from a value typed `Generator`, which declares none.
   - Landed: The judgement's ways, built on the standing go while his answer is pending: `Generator` gains a counted size, a new api declaration; the relational predicate is one reduction; `Indexed`'s default pairs get an object of their own. Nine sites cleared.
   - The other way: No new api declaration; instead three size bodies are deleted from the library.
   - Its cost: A size counted by running the generator. Its precedent is `opr IN`'s naive default.
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 45; `reviews/generator-size-judgement.md`; `compile-ladder/rung-generator-size/REPORT.md:317` (section 12)

40. **The fused big operator's declared type (item 46).** `__bigOperator2`'s fused arm answers its input type where its output type is declared, one site of the distance.
   - Landed: As it is; no default (row 632).
   - The other way: Widen the arm's pattern, which types it and changes when the compiled path fuses an outer operator whose output type differs from its input.
   - Its cost: The worker, both skeptics and the judge left it to him.
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 46; `compile-ladder/rung-generator-slips/REPORT.md:161`, `:229`, `JUDGE.md:144`; row 632

188. **P-151's `AnyList`, built otherwise.** His option 3 of 16:42 UTC on 2026-10-16 moves "the rest of `AnyList` into `List`"; climb batch 17's rung A made the team's `comprises` clause live and respelled `addLeft` and `addRight` within `AnyList` instead (`Library/List.fss:87-90`; `reviews/batch-17-review.md` finding 6); the four sites are gone either way.
   - Landed: As built. Default: as built, P-151's sentence to read "the rest of `AnyList` stays in `AnyList`, respelled under the live clause"; that edit of P-151 waits on his yes.
   - The other way: Move the bodies into `List` in the next library rung.
   - Its cost: A reversal touches `Library/List.fss` and `List.fsi` (the two private methods added, two bodies moved), the test `AnyListElementTypeWalk`, F-243 and F-251; no later rung is built on the respelling.
   - Home: POSITIONS, P-151; `reviews/batch-17-review.md`, finding 6; `coordinator/postmortem-2026-10-19-haiku/part-2-batches.md`, entry 18; `coordinator/postmortem-2026-10-19-haiku/fable-judgement.md`, part 2, 18

### The specification's text (3)

41. **A `where`-clause variable in an `extends` clause (item 14).** Batch 5's rung S wrote that a `where`-clause variable may not appear as a static argument in an `extends` clause. The sentence refuses more than the rule does.
   - Landed: The sentence stands.
   - The other way: Narrow it to the rule.
   - Its cost: He asked for a plain explainer first.
   - Home: PLAN, "Pavol's answers, in the order they are needed", item 14; `reviews/batch-5-conformance.md` (10-02: 99)

42. **The proviso on a listed type's variables, widened.** The revival's sentence on which static variables a listed type may use in a `comprises` clause now admits any `where`-clause variable of the declaration. By reading, that also admits the team's spelling `comprises Integral[\I\] where [\I\]`, which the batch 7C text refused.
   - Landed: The widened text. The checker reads only size variables there; a type variable is row 636's.
   - The other way: A proviso limited to sizes.
   - Its cost: Normative text wider than either path runs.
   - Home: PLAN, "Climb batch 13, listed for his review", The revival's own proviso on `comprises`; PLAN, "Off the path, parked", The revival's proviso on a listed type's static variables in a `comprises` ...; `Specification/basic/traits.tex:238-246` (`7fd8fddc8`); `compile-ladder/rung-size-expressions/REPORT.md:185` (decision 9); `compile-ladder/rung-spec-comprises/SKEPTIC.md:147` (10-02: 79)

190. **`extends Any` read as `Object`, against the specification's own `Tuple`.** Rung S's desugaring makes every trait or object declared `extends Any` an `Object`, as the traits chapter's rule says; the specification also declares `trait Tuple extends Any excludes { Object }` and its algebraic roots, such as `BinaryPredicate`, `extends Any` beside `Object`. Nothing reaches it today.
   - Landed: The rule as built; name `Tuple` beside `Any` and `Object` when a library first declares it, and decide the algebraic roots with row 37 (the coordinator's default, as the post-batch review proposes).
   - The other way: Read `extends Any` as written, as the team's code did and Scala's universal traits do.
   - Its cost: A desugaring edit and a specification sentence.
   - Home: PLAN, "Climb batch 19, listed for his review", gather.2 and the post-batch review's entry on it

### Tests and the team's demos (1)

43. **Team demo lines changed by the batches.** His word on the team's demos: "Let's not touch them and we'll make them run later." After it, batch 12's rung G respelled a line of `HeapShakedown.fss` like its test twin. Before it, batch 7's rung A respelled 32 lines of eight demos and left `mg.fss` failing earlier.
   - Landed: Both as landed. The `HeapShakedown` demo stops where it stopped before.
   - The other way: Put the demo lines back to the team's text.
   - Its cost: By reading, batch 7's eight demos would then fail where they call `fill` with a function, which since answer 10 takes a value.
   - Home: PLAN, "Climb batch 12, listed for his review", Three points a decision on record makes his (point 3); PLAN, "Off the path, parked", Climb batch 7's rung A respelled 32 lines of; `compile-ladder/rung-reduction-types/REPORT.md` (decision 6); `compile-ladder/rung-tabulate/REPORT.md:209` (D4); P-79, "The team demos that write no static argument ..."; row 464 (10-02: 91)

### Code generation and the run time (1)

44. **`override` in the code generator.** The code generator refuses a method declared `override`, so the team's `disp0.fss`, which the checker now accepts, does not compile. What compiled dispatch does with a declaration a type no longer provides is open.
   - Landed: Refused; no default. A dotted call whose numeral needs a coercion keeps an overridden declaration (row 694).
   - The other way: Accept `override`, and decide compiled dispatch for it.
   - Its cost: Neither the library nor microGPT declares an `override`. Two owed compiled tests wait on it.
   - Home: PLAN, "Climb batch 11, listed for his review", Should the code generator accept the modifier `override`; `compile-ladder/rung-checker-overloading/REPORT.md:257` (section 15), `SKEPTIC.md:179`; `reviews/batch-13-review.md`, Part 4; rows 650, 694

### How batches run (6)

45. **One fixed batch workflow, or one designed per batch?** Whether a coordinator that designs a workflow for each batch should replace the fixed batch workflow.
   - Landed: The fixed workflow, redesigned. It wrote 5.03M, 5.43M and 7.22M tokens in batches 11 to 13.
   - The other way: A workflow designed for each batch by a coordinator.
   - Its cost: The two such designs made without a cost limit were priced at about 31M and 37M a batch; the number of agents moved cost most.
   - Home: `process-engineering/README.md`, "Waiting on Pavol"; `process-engineering/design-pricing.md`; held list, 10:59 UTC 2026-10-03

46. **A rule on engineering taste.** An obstacle gets an attempt to engineer around it, and its recurring cost priced, before anyone calls it impossible. Drafted from the study of why build sharing was called impossible.
   - Landed: Not a rule.
   - The other way: Add the rule.
   - Its cost: One line of the protocol.
   - Home: `process-engineering/README.md`, "Waiting on Pavol"; `process-engineering/cache-sharing.md`

47. **The gate, the commit and the microGPT check on Sonnet.** Whether the batch's gate, commit and microGPT measure run on the cheaper Sonnet tier.
   - Landed: Opus, as his decision on tiers pins workers.
   - The other way: Sonnet for those three stages.
   - Its cost: Saves about 0.13M to 0.28M of the Opus pool a batch.
   - Home: `process-engineering/README.md`, "Waiting on Pavol"; `process-engineering/batch-redesign.md` section 9, item 13; the `coordinator` skill's `references/delegating.md`, "Which tier runs what"

48. **A clean test of the skill.** The `fortress-repo` skill costs 0.47M to 0.65M a batch to read, and the six batches measured cannot say whether it buys quality.
   - Landed: Not run.
   - The other way: One batch in which two rungs of one kind get the same lean brief, one with the skill and one with the old prefix.
   - Its cost: About a rung's tokens extra.
   - Home: `process-engineering/README.md`, "Waiting on Pavol"; `process-engineering/skill-effect.md`

49. **A test-name comparison in the gate.** A gate step that goes red when a test that passed before is missing or failing.
   - Landed: Not built.
   - The other way: Build it.
   - Its cost: A script change, which his decision on the gate's comparisons puts to him on its own.
   - Home: PLAN-history, "Off the path, parked", Workflow option (b), the review's second script change, and ...; P-123, "The gate's comparisons." (10-02: 9)

50. **The library-extension bullet in the skill.** The skill's rule on extending the library, re-read from his words: extend it where its own text has a form for one number type, rank or sibling trait and lacks it for another; a form only the model needs, with no precedent, stays in the model's components.
   - Landed: The skill's current bullet, which he read as contradicting his position.
   - The other way: The revised bullet from the re-reading of his words.
   - Its cost: A skill edit by the writer.
   - Home: `process-engineering/library-extension-rule-archaeology.md` sections 5 and 7; held list, 2026-10-09 04:21 to 05:20 UTC; page thread `7311a875`

## (c) Routine, by theme

Each is kept as landed unless he says otherwise.

### The checker's typing and inference (7)

51. A clause-form reduction whose big operator's static argument is unwritten is instantiated by the checker at its bound or, since climb batch 14's rung A, at the expected type where the bound's type does not fit it, so `s: ZZ32 = BIG LAST[j <- lo#n] (3 j)` at the bound `Number` runs; one whose bound names its parameter, as `SUM`'s, `PROD`'s and `BIG MIN`'s do, has no instance and is refused (row 731, row 425's corrected text).
   - Landed: Refused where the bound names the parameter, three sites of the distance; the expected type taken otherwise (`InferBigOperatorExpectedType`). The other way: The desugaring fixes the big operator's static argument from the clauses. Its cost: A desugarer change, a checker project before the switch-over.
   - Home: PLAN, "Climb batch 8, listed for his review", Row 425 after climb batch 8's rung I; `compile-ladder/rung-instance-bound/REPORT.md:90` (section 4)

52. How the checker ranks a generic declaration among those reached only by coercion: by declared domains where they compare, by the coercion chapter's order on instances otherwise.
   - Landed: As built, a judge's choice under a silent text, on the ground of his conversion decision. The other way: The instances alone, the overloading checker's order alone, or a new full order. Its cost: Instances alone would let a generic's narrow instance outrank a plain declaration, against his conversion decision; the checker's order alone loses `ZZ32` over `ZZ64` at some positions.
   - Home: PLAN, "Off the path, parked", How climb batch N's rung I ranks a generic; `compile-ladder/rung-inference-checker/REPORT.md:585` (section 10.4), `JUDGE.md:152` (10-02: 55)

53. What the checker reports when no attempt at a call holds: the first attempt that has a candidate.
   - Landed: As built, so that a binding reports a call the rule accepts. The other way: The first of all four attempts, the judge's first order, which changed a pinned message. Its cost: One message of a compiled test.
   - Home: PLAN, "Off the path, parked", Rung I's fallback for a call no attempt keeps; `compile-ladder/rung-inference-checker/REPORT.md:570` (section 10.3) (10-02: 56)

54. Four gated inference gaps: the 64-combination cap (row 506), an untyped lambda argument in the coercion attempt (507), walk's mixed widths through varargs or a tuple (511), a generic trait's own coercion parameter under walk (513).
   - Landed: Each gated by an expected failure, off the path until the distance or microGPT meets one. Rows 515 and 518 of the same list are fixed. The other way: A repair each, named in its row. Its cost: Row 507 is the first to measure in phase 5.
   - Home: PLAN, "Off the path, parked", Climb batch N's gated inference gaps; PLAN-history, "Off the path, parked", Row 506 to Row 518; `reviews/batch-N-review.md`, finding 4 (10-02: 65)

55. A `spawn` inside an `atomic` body is refused also inside a typed function expression there, by where the code is written, as the team's checker reads it.
   - Landed: Refused; the program crashed the checker before. The other way: Check a typed function expression's body with a plain checker. Its cost: A change to the team's checker; no program gains a run, since the code generator has no `spawn`.
   - Home: PLAN, "Climb batch 12, listed for his review", A `spawn` inside an `atomic` body; `compile-ladder/rung-checker-contexts/JUDGE.md:55` (section 7)

56. Against the compiled prelude, which declares no `ImmutableArray`, the checker refuses every use of a varargs parameter (row 604); ten string sites wait on it.
   - Landed: Refused at the variable's use, until the switch-over brings the one library. The other way: Per site, or at the binding. Its cost: Goes away at the switch-over.
   - Home: PLAN, "Climb batch 10, listed for his review", Under the compiled library; PLAN, "Climb batch 9, listed for his review", Stop met and lifted; `compile-ladder/rung-checker-defects/REPORT.md:415`, `JUDGE.md:44`

183. **Row 775: a crash of the checker.** The checker stops, 'F is not in the kind env', on a generic trait whose `comprises` clause lists a type at a type `where`-clause variable and that overrides an inherited method. The base does the same, since climb batch 17's rung A opened such types.
   - Landed: No default on record, so none is taken: the row open, with no gated test, since the refusal is a crash.
   - The other way: A repair in a checker rung.
   - Its cost: A trace from `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:198` and `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:695`, `:722` first.
   - Home: PLAN, "Climb batch 18, listed for his review", X.skeptic.2; PLAN, phase 3, item 18; row 775

### Overloading and the Meet Rule (10)

57. The checker's Return Type Rule is stricter than the paper where the more specific declaration's domain is an object type (row 542).
   - Landed: The refusal, his decided construction for answer 9; gated. The other way: Set aside the instances whose domains cannot meet. Its cost: A change to a decided rule.
   - Home: PLAN, "Climb batch 7b, listed for his review", The compiled Return Type Rule is stricter than the; `compile-ladder/rung-return-type-rule/JUDGE.md:49`, `REPORT.md:347` (10-02: 34)

58. Typing a call between two closed traits by the intersection of return types is limited to families with no static parameters (row 543), narrower than the text's boundary.
   - Landed: The judge's narrower condition; gated. The other way: The proof addendum's boundary, as the text states it. Its cost: A checker change; the rejected narrowing sends the intersection into ties the code generator crashes on (row 540).
   - Home: PLAN, "Climb batch 7b, listed for his review", Typing a call between two closed traits by the; `compile-ladder/rung-return-type-rule/JUDGE.md:59`, `REPORT.md:350` (10-02: 35)

59. The coverage check reads a functional method's self type by its trait, so that functional methods declared in the closed traits are covered.
   - Landed: As built; it worked. The other way: Narrow the rung's claim instead. Its cost: None measured.
   - Home: PLAN, "Climb batch 7b, listed for his review", The coverage check reads a functional method's self type by its trait; `compile-ladder/rung-return-type-rule/JUDGE.md:39` (10-02: 36)

60. Answer 9's positional rule compares two declarations only when they have as many static parameters of their own.
   - Landed: As built; applied to every pair it refused a team test. His answer 9 lists this scope for his review. The other way: Every pair. Its cost: The team's `Compiled12.invariantInference` refused.
   - Home: PLAN, "Climb batch 7b, listed for his review", Answer 9's positional rule compares two declarations only when; `compile-ladder/rung-return-type-rule/REPORT.md:191`; P-45, "The static-parameter sentence goes (answer 9)." (10-02: 37)

61. A compiled verdict on an overload set can depend on the components compiled before it in the same JVM (row 547); batch 8's re-keyed memo is the candidate cause, not proven.
   - Landed: The row, for the checker phase. The other way: Trace the carried state now. Its cost: A checker investigation.
   - Home: PLAN, "Climb batch 7b, listed for his review", gather.2; PLAN, "Climb batch 8, listed for his review", Row 547 after rung O re-keyed the overloading memo; `compile-ladder/rung-overloading-checker/REPORT.md:158` (10-02: 45)

63. The per-provider Meet Rule compares the `self` parameter as the dotted rule compares a receiver, wherever it sits.
   - Landed: As built; it cleared six `IN` sites. The other way: Compute what a type does not inherit in `allMethods`. Its cost: That needed another rung's file.
   - Home: PLAN, "Climb batch 8, listed for his review", The self parameter in rung O's per-provider meet; `compile-ladder/rung-overloading-checker/JUDGE.md:103`

64. The per-provider check visits declared traits and objects only, so a pair only an object expression provides passes (row 570).
   - Landed: Gated; no compiled program runs an object expression yet (row 375). The other way: Lift object expressions into named objects, the team's plan. Its cost: A checker rung.
   - Home: PLAN, "Climb batch 8, listed for his review", Stop met and lifted; `compile-ladder/rung-overloading-checker/REPORT.md:354`

65. The checker's half of row 597 reads every closed trait above an object expression, one step beyond the row.
   - Landed: As built, upheld under the traits chapter. The other way: Only the traits the expression names. Its cost: None.
   - Home: PLAN, "Climb batch 10, listed for his review", Row 597's checker half reads every closed trait above an object expression; `compile-ladder/rung-checker-defects/REPORT.md:430`

66. Since batch 11 the checker checks a widening `override`'s return type at every instance, and refuses an object below a trait that re-declares an inherited method abstract.
   - Landed: As built, read from the traits chapter; pinned. The other way: The base's behaviour, which refused every widening `override`. Its cost: None on the library.
   - Home: PLAN, "Climb batch 11, listed for his review", The return type of a widening `override` is checked; `compile-ladder/rung-checker-overloading/REPORT.md:258`

67. Naden's return-type-restricted instantiation is recorded as future work in the decision record, with no ledger row.
   - Landed: As recorded. The other way: A ledger row. Its cost: One row.
   - Home: `reviews/overloading-judgement.md` section 10, item 7; POSITIONS, answer 9 (10-02: 25)

### Walk's checks at load (12)

68. Walk does not check a `comprises` clause's other half, that each listed type extends the trait at every instantiation (row 598).
   - Landed: Gated; the rung argues walk's soundness does not need it. The other way: Check it at load. Its cost: A walk edit.
   - Home: PLAN, "Climb batch 9, listed for his review", Row 598; `compile-ladder/rung-walk-load-check/REPORT.md` section 5

69. Which reading of "overridden" decides what a type inherits: walk counts only what the type's own `override` declarations override (row 615); the checker now agrees.
   - Landed: As landed, pinned on both paths. The other way: Any `override` anywhere hides the declaration. Its cost: Both paths change.
   - Home: PLAN, "Climb batch 10, listed for his review", Which reading of "overridden" governs what a type inherits; `compile-ladder/rung-walk-meet/SKEPTIC.md:82`

70. The chapter's clause on equal parameter types names no `self` position; walk reads it at the same position, as the checker does.
   - Landed: As landed. The other way: Another position rule. Its cost: None measured.
   - Home: PLAN, "Climb batch 10, listed for his review", Decision W2; `compile-ladder/rung-walk-meet/decision-record.md:29` (W2)

71. Walk refuses at load a program that names an undeclared type in a `typecase` arm, where it failed at run time only when the arm ran.
   - Landed: As landed, through the shared disambiguator; the suites stayed green. The other way: Walk's late failure. Its cost: None.
   - Home: PLAN, "Climb batch 11, listed for his review", Walk refuses at load; `compile-ladder/rung-checker-overloading/REPORT.md:205`

72. A program's own reduction whose `simpleJoin` is declared at `Any`, the team's old spelling, is now refused at load; it ran on the base.
   - Landed: As landed; no gated test or demo declares one, and a test pins the refusal. The other way: Keep accepting the old spelling. Its cost: None in the tree.
   - Home: PLAN, "Climb batch 12, listed for his review", gather.3; PLAN-history, "Climb batch 12, listed for his review", review-routed.1; `ProjectFortress/tests/ReductionSimpleJoinAtAnyWalk.fss`

73. An `override` at the inherited declaration's own parameter types overrides nothing, as the chapter's "strict subtype" says. Since batch 13 walk refuses it at load; the checker, which has no check of the modifier, does not (row 653).
   - Landed: Strict, built at the default given on the standing go; the top-tier check reads it as the standard as written, needing no decision. The other way: Allow it: "strict subtype" becomes "subtype" in the S1 form, and walk's check is undone. Its cost: A specification revision; no program in the tree writes such an `override`.
   - Home: PLAN, "Climb batch 12, listed for his review", Q2 of climb batch 12's rung W; `reviews/walk-load-readings-check.md` section 3 and "For Pavol"; `compile-ladder/rung-walk-override/REPORT.md:21`, `:294`; `CLIMB-BATCH-13.md`, QW2

74. At an instance of a generic trait, an `override` whose types equal the inherited declaration's only there is not an error: the declaration is checked at its static parameters.
   - Landed: As built. The other way: Check each instance strictly. Its cost: The chapter says nothing of instances.
   - Home: PLAN, "Climb batch 13, listed for his review", QW-a of climb batch 13's rung W; `compile-ladder/rung-walk-override/REPORT.md:282`

75. A generic declaration's `override` at its parameter `T`, over an inherited declaration at a type below `T`'s bound, is a static error.
   - Landed: As built; no program in the tree writes it. The other way: Accept it where some instance overrides. Its cost: None in the tree.
   - Home: PLAN, "Climb batch 13, listed for his review", QW-b; `compile-ladder/rung-walk-override/REPORT.md:287`

76. Walk does not refuse an `override` over a declaration whose parameter types mention a static parameter whose bounds walk has lost (row 693).
   - Landed: This lenience, the base's behaviour for one shape. The other way: Carry the enclosing `where` clauses into object expressions (a rung of its own); or refuse, with false errors on programs the base loads. Its cost: One expected failure records it.
   - Home: PLAN, "Climb batch 13, listed for his review", Walk does not refuse an `override` over a declaration; `compile-ladder/rung-walk-override/JUDGE.md:145`

77. Walk refuses at load the POPL 2019 paper's valid `ArrayList`/`List` overload set (row 539).
   - Landed: Gated on both paths. The other way: A walk repair. Its cost: A walk rung.
   - Home: PLAN, "Climb batch 7b, listed for his review", Walk refuses the POPL 2019 paper's valid `ArrayList`/`List` set at load; `compile-ladder/rung-return-type-rule/REPORT.md:218` (10-02: 44)

78. Walk loads a generic and a plain declaration whose declared domains are equal (row 549); its home is the row alone, since walk's harness cannot gate an acceptance.
   - Landed: The row alone. The other way: Refuse the set, which changes a verdict walk gives. Its cost: One verdict.
   - Home: PLAN, "Climb batch 7b, listed for his review", Row 549; `compile-ladder/rung-walk-dispatch/REPORT.md:262` (10-02: 41)

79. Walk's return rule for a generic beside a plain declaration keeps `pickFirst` refused, stricter than answer 9 (row 550).
   - Landed: Gated. The other way: Answer 9's rule over every instance. Its cost: A walk rung.
   - Home: PLAN, "Climb batch 7b, listed for his review", Row 550; `compile-ladder/rung-walk-dispatch/REPORT.md:261` (10-02: 42)

### Walk's choice of declaration and instance (9)

80. Under walk, a type parameter that only another parameter's bound mentions takes the arguments' type, not its bound (row 592).
   - Landed: The departure, gated, because the library's `APPCOV` builds its result there and walk has no expected type. The other way: Walk moves once it has an expected type. Its cost: After the switch-over gives walk static types.
   - Home: PLAN, "Climb batch 9, listed for his review", Row 592; `compile-ladder/rung-walk-instance/REPORT.md:318`

81. Walk has no intersection type, so a parameter with two bounds it cannot meet stays at `Bottom` (rows 591, 616).
   - Landed: Expected failures until the switch-over. The other way: Walk's type lattice gains intersections. Its cost: A walk rung.
   - Home: PLAN, "Climb batch 9, listed for his review", Row 591; Row 616; PLAN, "Climb batch 10, listed for his review", Stop met and lifted; `compile-ladder/rung-walk-instance/REPORT.md:319`; `compile-ladder/rung-walk-meet/SKEPTIC.md:122`

82. Under walk, a parameter bounded only from above whose bound mentions another parameter keeps `Bottom` (row 612).
   - Landed: Gated; the fix is named for a walk rung. The other way: The fix now. Its cost: A walk rung; it sits beside the joint-solving question.
   - Home: PLAN, "Climb batch 9, listed for his review", Row 612; PLAN, "Climb batch 10, listed for his review", Stop met and lifted; `compile-ladder/rung-walk-meet/REPORT.md:142`

83. Walk prints the open type as `OPEN`, as in `BoxU[\OPEN\]`.
   - Landed: `OPEN`. The other way: Another word; the judgement says "you may want another word". Its cost: A rename in walk.
   - Home: PLAN, "Climb batch 11, listed for his review", The name `OPEN`; `reviews/p1-judgement.md:53`

84. With a `where` bound on an unbounded static parameter, walk now runs `p(x: ZZ32)` for `p(3)` where it ran the generic (row 692, fixed).
   - Landed: As landed, following the overloading chapter. The other way: The old choice. Its cost: None against a decision.
   - Home: PLAN, "Climb batch 13, listed for his review", Climb batch 13's rung W's skeptic's fix `7b625cdf9`; `compile-ladder/rung-walk-override/JUDGE.md:144`

85. Walk promotes from run-time types, so where a variable is declared wider than its value the two paths run a generic at different instances (row 509).
   - Landed: As landed; the values agree. The other way: Record the split in the text. Its cost: None.
   - Home: PLAN, "Off the path, parked", Taken as a default by the conversion judgement and listed with items ...; `reviews/conversion-overloading-judgement.md`, section 3 (10-02: 26)

86. Walk leaves a generic `coerce` out of the sources it ranks, so a choice between two coercions into a generic trait can only be ambiguous.
   - Landed: Left; nothing in the tree reaches it. The other way: Rank it. Its cost: A walk edit.
   - Home: PLAN, "Off the path, parked", `Coercions.addSource` under walk leaves a generic `coerce` out of the sources it ...; `compile-ladder/rung-inference-walk/REPORT.md:276` (10-02: 60)

87. Answer 8's promotion reaches user-declared coercions, so a call's arguments can be converted by a program's own `coerce`.
   - Landed: As landed; both paths agree. The other way: Narrow walk to library coercions, a heuristic walk cannot ground. Its cost: A walk edit.
   - Home: PLAN, "Off the path, parked", Answer 8's promotion reaches user-declared coercions under walk; `compile-ladder/rung-inference-walk/REPORT.md:139` (10-02: 61)

88. Walk's inference trace switch stays in a 2012 file, inert unless set, but for one eager list.
   - Landed: Kept. The other way: Remove it. Its cost: One edit and an interpreter-suite run.
   - Home: PLAN, "Climb batch 9, listed for his review", The trace switch `fortress.inference.trace` stays in a 2012 file; `compile-ladder/rung-walk-instance/REPORT.md:324`

### Numbers and numerals (9)

89. A `ZZ32` with an `NN32` promotes to `ZZ64` on the one library (answer 8); `ZZ` on the compiled prelude until the switch-over.
   - Landed: As landed on both paths. The other way: None proposed. Its cost: None.
   - Home: PLAN, "Climb batch N's first run, listed for his review", `ZZ32` with `NN32` gives `ZZ64` on the one library; `compile-ladder/rung-inference-walk/REPORT.md` section 6 (10-02: 48)

90. Row 432 does not close by the numeral switch: under walk `SUM <|1, 2, 3|>` stays refused, since the numeral type carries no additive algebra. Row 437, read with it, closes with batch 13b's library half.
   - Landed: As the record reads it. The other way: Give the numeral type additive algebra. Its cost: A library choice for Q-walk.
   - Home: PLAN, "Climb batch N's first run, listed for his review", Row 432 does not close by the numeral switch; `compile-ladder/plan-n/probe-q/PROBE-Q.md`; `compile-ladder/climb-batch-13b/RECORD.md`, "Decisions taken here" (10-02: 49)

91. Q-walk makes walk convert a body to its declared return type (row 387).
   - Landed: As the record reads it, for Q-walk. The other way: None proposed. Its cost: Part of Q-walk.
   - Home: PLAN, "Climb batch N's first run, listed for his review", Q-walk makes walk convert a body to its declared return type (10-02: 50)

92. The float numeral is unchanged by the numeral switch.
   - Landed: As landed. The other way: A float numeral type. Its cost: None now.
   - Home: PLAN, "Climb batch N's first run, listed for his review", `FloatLiteral` unchanged by the numeral switch (10-02: 51)

93. Two cases are named so they are not lost: a self-naming bound beside a catch-all, and the fast shape of `=`.
   - Landed: Left. The other way: None proposed. Its cost: The model's sized types (phase 5) and phase 6 meet them.
   - Home: PLAN, "Climb batch N's first run, listed for his review", What run 1 left out with no line elsewhere (10-02: 52)

94. `Integral`'s api `unsigned` was removed, and `ZZ64`'s api states its body's type.
   - Landed: As landed, kept by the judge. The other way: Widen `Integral`'s return type, which refuses a valid program. Its cost: One api line.
   - Home: PLAN, "Climb batch 8, listed for his review", Climb batch 8's rung Q's `unsigned` stop; `compile-ladder/rung-numeral-library/REPORT.md:125`

95. The numeral type declares its own `zero`, `one`, `even`, `odd`, `floor`, `ceiling`, `truncate`, `DIVIDES`, `TIMES` and `^`.
   - Landed: As landed: every operation numerals support is declared on the numeral type. The other way: Ledger rows, per-type declarations, or a checker change. Its cost: Ten api declarations.
   - Home: PLAN, "Climb batch 8, listed for his review", `IntLiteral` declares its own `zero`; `compile-ladder/rung-numeral-library/REPORT.md:66`, `JUDGE.md:11`

96. A numeral too large for every declaration of a call is refused.
   - Landed: Refused. The other way: The narrowest declaration whose type holds the value. Its cost: A checker rule.
   - Home: PLAN, "Off the path, parked", A numeral too large for every declaration of a call is refused; `compile-ladder/rung-inference-checker/REPORT.md:158` (10-02: 54)

97. A numeral converts only into a type that holds its value (row 325's faces).
   - Landed: As gated. The other way: A static error reading. Its cost: Its link test turns red.
   - Home: PLAN, "Off the path, parked", Row 325's faces; `compile-ladder/climb-batch-N/JUDGE-review.md` section 2 (10-02: 63)

### Sizes and arrays (4)

98. Under walk, a size written as arithmetic is refused at any operation that leaves `ZZ64`. Its stated premise, that the checker refuses all such arithmetic, no longer holds since batch 13.
   - Landed: As landed. The other way: An exact big-integer size, or the silent wrap. Its cost: A walk edit for expressions no program writes.
   - Home: PLAN, "Climb batch 6.5b, listed for his review", The judge's decision on walk's static arithmetic; `compile-ladder/rung-size-range/JUDGE.md:62`; `7fd8fddc8` (10-02: 66)

99. Under walk, an array of a static size from 2^31 to 2^32−1 dies with a raw Java exception (row 527).
   - Landed: As landed; no batch named. The other way: Read the size as a `long` in three natives. Its cost: Three lines.
   - Home: PLAN, "Climb batch 6.5b, listed for his review", Under walk an array of a static size from; `compile-ladder/rung-size-range/REPORT.md:127` (10-02: 67)

100. An expected failure gives 16 checker errors for 7 written sites.
   - Landed: Recorded, not repaired. The other way: De-duplicate the errors. Its cost: A checker edit.
   - Home: PLAN, "Climb batch 6.5b, listed for his review", `XXXNatRangeChecker` gives 16 errors for 7 written sites (10-02: 69)

101. The compiled class loader computes a size without checking its kind, so it makes 4294967296 where walk refuses a `nat` above 4294967295 (row 675).
   - Landed: No refusal; a test asserts today's value. The other way: A refusal at run time. Its cost: A loader edit.
   - Home: PLAN, "Climb batch 13, listed for his review", Row 675; `compile-ladder/rung-size-expressions/REPORT.md:184`

### Ranges (7)

102. `MIN # 0` builds the library's own empty range, so its printed bounds are not the ones written.
   - Landed: As landed. The other way: Two other empty-range spellings. Its cost: Printed bounds change.
   - Home: PLAN, "Climb batch 6.5b, listed for his review", `MIN # 0` and its siblings build the library's own empty range; `compile-ladder/rung-size-range/REPORT.md:139` (10-02: 68)

103. Batch 9's range repairs turned runs that stopped into values: `flip`, rank-2 and rank-3 subscripts and `bounds`, `indices`, a strided `seq`, shifts, `UniformDistribution`.
   - Landed: As landed. The other way: Leave each declaration with a row. Its cost: Walk values.
   - Home: PLAN, "Climb batch 9, listed for his review", Stop met and lifted; `compile-ladder/rung-range-meets/REPORT.md:241`

104. The map of the full sequential ranges is a new object, not a `MappedGenerator`, so a reversed mapped range prints differently (row 603).
   - Landed: The new string, elements and order unchanged. The other way: Export `MappedGenerator`, or declare `reverse` on the object. Its cost: An api export.
   - Home: PLAN, "Climb batch 9, listed for his review", Row 603 and row 583's device; `compile-ladder/rung-range-meets/REPORT.md:251`

105. `(:) CMP (:)` answers `EqualTo`, where walk stopped.
   - Landed: As landed. The other way: A `fail` body. Its cost: None.
   - Home: PLAN, "Climb batch 11, listed for his review", `(:) CMP (:)` answers `EqualTo`, where walk stopped; default ...; `compile-ladder/rung-range-types/REPORT.md:156`

106. `truncL` and `truncR` are declared to return a bounded range, where the team declared ranges with a left or right end.
   - Landed: As landed; the team's type is true, but no body can show it to the checker. The other way: The team's types. Its cost: A typing loss.
   - Home: PLAN, "Climb batch 11, listed for his review", `Range.truncL` and `truncR` are declared `BoundedRange[\I\]` where the team; `compile-ladder/rung-range-types/REPORT.md:154`

107. A rank-2 or rank-3 range strided backwards on some axes has no range kind and stops walk (row 659).
   - Landed: A stop. The other way: Ask for a design. Its cost: The text is silent on such ranges.
   - Home: PLAN, "Climb batch 11, listed for his review", A bounded range of rank 2 or 3 strided; `compile-ladder/rung-range-types/REPORT.md:180`

108. The one library's strided `:` returns a range, which is no generator, so `seq(a:b:c)` is refused against it (row 661); the compiled prelude has no strided range at all (row 514).
   - Landed: The declaration unchanged; the switch-over meets it. The other way: An api form, perhaps the team's commented one. Its cost: One api declaration.
   - Home: PLAN, "Climb batch 12, listed for his review", Row 661; PLAN, "Off the path, parked", The compiled path has no strided range; `compile-ladder/rung-library-slips/REPORT.md:252`

### The library's generators, strings and comparisons (26)

109. `TotalComparison` extends `StandardMinMax`: he took it on recommendation and asked for a fuller explanation when he has the energy.
   - Landed: As built; an explanation owed. The other way: None. Its cost: None.
   - Home: PLAN, "Pavol's answers, in the order they are needed", Item 22; P-98, "Appendix I's small items." (10-02: 22)

110. `LessThan`'s and `GreaterThan`'s `CMP` answer the converse of their `<` (row 456), and `LEXICO Unordered` answers `Unordered` (row 457).
   - Landed: Not repaired, since each repair changes a value walk prints. The other way: Repair both. Its cost: Walk values.
   - Home: PLAN, "Off the path, parked", `LessThan`'s and `GreaterThan`'s `CMP` answer the converse of their own `<` (10-02: 88)

111. A program's own `p1 ANDCOND p2` of two relational predicates is no longer a relational predicate under walk (row 458).
   - Landed: As landed. The other way: Restore it. Its cost: A library edit.
   - Home: PLAN, "Off the path, parked", Climb batch 7's rung H's repair of the `Condition` site (10-02: 87)

112. `fill` and `tabulate` sit where the array diamond meets, not in each leaf trait.
   - Landed: As landed; "his to confirm". The other way: The leaf placement, which leaves the meet refused. Its cost: A library edit.
   - Home: PLAN, "Off the path, parked", `fill` and `tabulate` sit where the array diamond meets (10-02: 89)

113. The factories' function forms are named `tabulatedArray1` to `tabulatedArray3` and `tabulatedVector`.
   - Landed: As landed; "his to change". The other way: `tabulate1` to `tabulate3`, or no function factories. Its cost: 4 declarations and 8 calls.
   - Home: PLAN, "Off the path, parked", The factories' function forms are named `tabulatedArray1` to `tabulatedArray3` (10-02: 90)

114. Batch 8's slip repairs changed walk values: mapped generators, `BIG MINMAX`, `split`, `avFlat`, `UniformDistribution`.
   - Landed: As landed. The other way: Leave them with rows. Its cost: Walk values.
   - Home: PLAN, "Climb batch 8, listed for his review", Stop met and lifted

115. `lift`'s api and component disagree after batch 8's device.
   - Landed: As landed. The other way: The api declares `lift(r: Any)`, not measured. Its cost: One api line.
   - Home: PLAN, "Climb batch 8, listed for his review", `lift`'s api and its component disagree after batch 8's device

116. Batch 9's string repairs changed five walk values, and an implicit `:b:c` slice completes from the right end (row 609).
   - Landed: As landed. The other way: Leave them with rows. Its cost: Walk values.
   - Home: PLAN, "Climb batch 9, listed for his review", Stop met and lifted

117. `String`'s default case-insensitive comparison uses the library's own `ensures` clause.
   - Landed: As landed. The other way: A character case folding no library string uses. Its cost: None.
   - Home: PLAN, "Climb batch 9, listed for his review", `String`'s default `CASE_INSENSITIVE_CMP` is the library's own `ensures` clause

118. `FlatString.rangeContains` finds only the first occurrence of a character (row 607).
   - Landed: Pinned. The other way: A one-line repair. Its cost: A walk value changes.
   - Home: PLAN, "Climb batch 9, listed for his review", Row 607

119. `uncheckedSubstring` stays unguarded against a strided range.
   - Landed: As landed; no caller passes one. The other way: A guard in three bodies. Its cost: Three lines.
   - Home: PLAN, "Climb batch 9, listed for his review", `uncheckedSubstring` stays unguarded against a strided range

120. The `String` api exports `Concatenable`, `Balanceable` and `SubString`'s constructor header.
   - Landed: As landed. The other way: Leave `SubString` out of the api. Its cost: Removes a team api object.
   - Home: PLAN, "Climb batch 9, listed for his review", The `String` api exports `Concatenable`

121. Batch 10's rung N changed walk values: `shouldRaise` with nothing raised now throws a `ForbiddenException` no catch of its own takes; `assert` on tuples prints a `FAIL` line; `partition` at `ZZ64` refuses.
   - Landed: As landed. The other way: A bare `TestFailure`, `fail`, or the text's flag. Its cost: Walk values.
   - Home: PLAN, "Climb batch 10, listed for his review", Stop met and lifted; `shouldRaise` when its expression raises nothing throws `ForbiddenException(TestFailure)`

122. Batch 10's rung G made six declarations print what their bodies state, and turned an ill-typed reduction's 3 into a refusal.
   - Landed: As landed. The other way: Leave them with rows. Its cost: Walk values.
   - Home: PLAN, "Climb batch 10, listed for his review", Stop met and lifted

123. The identities' fallback answers a numeral where `T` is expected (row 630, a duplicate of row 436).
   - Landed: Left; the designed fix is the text's `HasIdentity` once `where` clauses work. The other way: `fail` or a cast. Its cost: Walk's answer for an unlisted type.
   - Home: PLAN, "Climb batch 10, listed for his review", Row 630

124. `embiggen` unwraps its reduction's `Any` (row 631).
   - Landed: Left. The other way: Its typed form. Its cost: Retypes callers in five files.
   - Home: PLAN, "Climb batch 10, listed for his review", Row 631

125. `TransposedMatrix`'s `add`, `subtract` and `negate` type-check but nothing calls them.
   - Landed: Kept as methods. The other way: Overrides of `Matrix`'s operators again, or removed. Its cost: Which declaration walk runs, or team declarations removed.
   - Home: PLAN, "Climb batch 12, listed for his review", `TransposedMatrix`'s `add`, `subtract` and `negate` type-check since climb batch ...

126. A team declaration was removed: `__ImmutableSubArray1`'s `put`, which nothing calls.
   - Landed: Removed. The other way: Keep it. Its cost: A call that found it now stops at the call.
   - Home: PLAN, "Climb batch 12, listed for his review", Three points a decision on record makes his (point 2)

127. New library declarations, each shown its precedent line: batch 12's 16 range api declarations; batch 13's lazy `LEXICO` on `Comparison` and its `SimpleIndexValuePairs`.
   - Landed: As landed. The other way: Each declaration left out, with its sites. Its cost: Sites on the distance.
   - Home: PLAN, "Climb batch 12, listed for his review", Three points a decision on record makes his (point 1); PLAN, "Climb batch 13, listed for his review", Extensions and pins of climb batch 13 (point 1, point 2); `coordinator/process-engineering/library-extension-rule-archaeology.md` section 5, point 4

128. `Reflect`'s `members` is now a list in declaration order, not a sorted set.
   - Landed: As landed; the tuple bound required it. The other way: The rung's other ways. Its cost: The order of a reflective listing.
   - Home: PLAN, "Climb batch 13, listed for his review", `Reflect`'s `members` is now a list in declaration order

129. A slice of the default index-value pairs keeps each pair's index.
   - Landed: Kept, as on the base. The other way: Renumber from 0, as `Set`'s own pairs do. Its cost: Index values.
   - Home: PLAN, "Climb batch 13, listed for his review", Should a slice of the default index-value pairs keep each pair's index? ...

130. The default index-value pairs of a value indexed above 0 are indexed as the value is, while `ReadableArray`'s stay positional; the skeptic's fix changed two answers.
   - Landed: As landed, which follows the arrays' own range subscript and the ranges chapter. The other way: Positional throughout; or the arrays' pairs indexed as the array. Its cost: Two answers.
   - Home: PLAN, "Climb batch 13, listed for his review", Two conventions for the index-value pairs of a value indexed above 0

131. The api's advice for a range subscript, `(bounds())[r]`, reads `r` as positions for bounds above 0 (row 674).
   - Landed: The advice unchanged. The other way: Name `narrowToRange`. Its cost: A comment.
   - Home: PLAN, "Climb batch 13, listed for his review", Row 674

132. The relational predicate reads its target in its natural order, so `increasing((0#4).reverse)` now fails.
   - Landed: As landed. The other way: Read positions 0 to n−1 as before. Its cost: One answer.
   - Home: PLAN, "Climb batch 13, listed for his review", The relational predicate reads its target in its natural order

181. **`PureList`'s `List` without an element-wise `=`.** `PureList`'s `List` extends `LexicographicOrder` under the same condition as `List`'s, but keeps no element-wise `=` beside it. So on the checker a `PureList` list of pairs would have only the identity `=`, the day `PureList` is checked. The rung's brief named `List.fsi` and `List.fss` only, and `PureList`'s api is ill formed (row 355).
   - Landed: None added, the rung's decision 6. Default, taken: as landed.
   - The other way: The element-wise `=` in `PureList` too.
   - Its cost: A library line; no gated program reads `PureList` on the checker.
   - Home: PLAN, "Climb batch 18, listed for his review", X.worker.4; `Library/PureList.fss:41-42`; `compile-ladder/rung-checker-conditional-extension/REPORT.md:207`; row 355

191. **`FlatString`'s api pair `opr ||(a:FlatString, self)` dropped.** Rung S dropped it from the api, where climb batch 15's default kept it for item 38's answer; the component never declared it.
   - Landed: Dropped; the component wins over its api.
   - The other way: The pair kept in the api, and declared in the component.
   - Its cost: Two api lines and a component declaration.
   - Home: PLAN, "Climb batch 19, listed for his review", review.1

### The specification's text (16)

133. The Meet Rule for dotted methods keeps its exact-meet form; Appendix I names the question.
   - Landed: The Working Draft's form. The other way: Coverage satisfies it. Its cost: A text revision.
   - Home: PLAN, "Climb batch 7b, listed for his review", The Meet Rule for dotted methods keeps its exact-meet form (10-02: 32)

134. The `makeSet` example keeps the Working Draft's explanation, though under the chapter's rules the Return Type Rule refuses the pair.
   - Landed: Unchanged. The other way: Reword the explanation. Its cost: A text revision.
   - Home: PLAN, "Climb batch 7b, listed for his review", The naked-`Any` rule's example (10-02: 38)

135. Batch 7b's rung S revised three passages beyond its brief, as the decisions settle them.
   - Landed: As landed. The other way: Revert them. Its cost: Text contradicting the decisions.
   - Home: PLAN, "Climb batch 7b, listed for his review", Rung S revised three passages beyond its brief's named list (10-02: 39)

136. The POPL recheck's five smaller sentences, as rung S wrote them.
   - Landed: As landed; his decision on the instance lists them for review. The other way: Each reworded. Its cost: Text.
   - Home: PLAN, "Climb batch 7b, listed for his review", The POPL recheck's five smaller defaults as rung S wrote them (10-02: 40)

137. Should the list of contexts name a block's non-last element, which the checker has always checked against `()`?
   - Landed: The list unchanged. The other way: The list gains it. Its cost: Text and an Appendix I note.
   - Home: PLAN, "Climb batch 12, listed for his review", Should the inference chapter's list of contexts gain a block's non-last element

138. The text keeps `HeapSequence` as the varargs parameter's type, with a box saying both implementations give `ImmutableArray`.
   - Landed: The sentence unchanged. The other way: Revise it to `ImmutableArray`. Its cost: Text.
   - Home: PLAN, "Climb batch 10, listed for his review", The varargs parameter's type

139. Batch 7C's three wording choices in the `comprises` text, and the `SkTwoLevel` program the text refuses while walk runs it.
   - Landed: As landed. The other way: Each alternative in the decision record. Its cost: Text.
   - Home: PLAN, "Off the path, parked", Climb batch 7C's rung X's three wording decisions in the `comprises` text (10-02: 80)

140. Two notations: ℤ's factorial as a recurrence, and a midpoint as `lo + (hi − lo) DIV 2`.
   - Landed: As landed. The other way: The Working Draft's product, and `floorAverage`. Its cost: `floorAverage` in the one library.
   - Home: PLAN, "Off the path, parked", Climb batch 7R's rung U's two notations (10-02: 86)

141. A third passage, the adapted `BlockedRange`, was respelled over `ZZ32`.
   - Landed: As landed. The other way: Leave it at `ZZ64`. Its cost: Text.
   - Home: PLAN, "Off the path, parked", Climb batch 7R's rung U respelled over `ZZ32` a third passage (10-02: 85)

142. ℚ's listing gained four algebraic traits, with a sentence on where their laws hold.
   - Landed: As landed. The other way: Nothing replaces them. Its cost: Text.
   - Home: PLAN, "Off the path, parked", Climb batch 6.5's rung P made ℚ's listing extend (10-02: 72)

143. `narrow` is stated on `ZZ`; `MaybeRungM`'s comment was reworded.
   - Landed: As landed. The other way: Leave `ZZ`'s `narrow` unstated. Its cost: Text and one expected failure.
   - Home: PLAN, "Off the path, parked", Climb batch 6.5's rung P stated `narrow` on `ZZ` (10-02: 73)

144. Three `shift` properties of the integer chapter are wrong or garbled (row 500).
   - Landed: Left for whoever gives the library these methods. The other way: Fix the text now. Its cost: Text.
   - Home: PLAN, "Off the path, parked", Row 500 (10-02: 76)

145. The text says a fixed-size `GCD` or `LCM` result that does not fit raises `IntegerOverflow`; walk does, the compiled half at the switch-over.
   - Landed: As landed. The other way: None. Its cost: None.
   - Home: PLAN, "Off the path, parked", Climb batch 6.5's rung P's met stop (10-02: 75)

146. The inference chapter describes type and size parameters only, naming `bool`, `dim`, `unit` and operator parameters as not described.
   - Landed: As landed. The other way: The general rule with refusals in a box. Its cost: Text.
   - Home: PLAN, "Off the path, parked", The kinds of static parameter climb batch N's rung T's chapter describes (10-02: 62)

147. Batch N's rung T's six text decisions in the inference chapter.
   - Landed: As landed. The other way: Each in the decision record. Its cost: Text.
   - Home: PLAN, "Off the path, parked", Climb batch N's rung T's six text decisions in the inference chapter (10-02: 64)

192. **Rung P's words in `overloading.tex`.** The revised passage reads exclusion "where the two parameter types, or their elements at one position, are or extend instances of one parameterized trait", the last clause beyond the words its brief gave, after the type group's paper, which reads a tuple element by element.
   - Landed: The words as written.
   - The other way: The brief's words alone.
   - Its cost: One sentence.
   - Home: PLAN, "Climb batch 19, listed for his review", rung P's words

### Tests and the team's demos (13)

148. Batch N's rung M added a compiled test pair outside its file list, for row 442's face.
   - Landed: The pair as landed. The other way: Remove it. Its cost: Two files.
   - Home: PLAN, "Climb batch N's first run, listed for his review", Rung M's list (10-02: 53)

149. Row 587's expected failure asserts only a supertype, leaving the typed control ungated.
   - Landed: As landed. The other way: A plain test keeps the control. Its cost: One test.
   - Home: PLAN, "Climb batch 9, listed for his review", Row 587's expected failure asserts only a supertype of `Apple`

150. A rung's test asserted walk's numeral reading as the text's answer; the gather rewrote its two calls so both paths agree.
   - Landed: As rewritten. The other way: None. Its cost: None.
   - Home: PLAN, "Climb batch 10, listed for his review", Walk's numeral departure in rung W's test

151. Five team demos are refused at load since batch 12, each leaving an inherited abstract method without a body.
   - Landed: Left as they are, by his word on the demos. The other way: A body for each, which touches a demo. Its cost: Demo edits.
   - Home: PLAN, "Climb batch 12, listed for his review", Five team demos are refused at load since climb batch 12's rung ...; PLAN-history, "Pavol's answers, in the order they are needed", R10

152. Batch 13's crash test for two-bound overloading adds an object outside the shared trait, since the brief's shape did not crash on the base.
   - Landed: As landed; asked for confirmation only. The other way: None. Its cost: None.
   - Home: PLAN, "Climb batch 13, listed for his review", Q-V2 of climb batch 13's rung V

153. Row 693's second shape, a generic object, owes an expected failure beside the row's reproducer.
   - Landed: Owed by the next walk rung. The other way: None. Its cost: One test.
   - Home: PLAN, "Climb batch 13, listed for his review", review-routed.1

154. Row 452's test was restated to a `ZZ32` range of converted bounds and renamed.
   - Landed: As landed. The other way: The original test. Its cost: None.
   - Home: PLAN, "Off the path, parked", Climb batch 7R's rung J restated row 452's test (10-02: 84)

155. Rung P showed its first walk expected failure red on a copy, not on a deliberate local fix.
   - Landed: As landed. The other way: None. Its cost: None.
   - Home: PLAN, "Off the path, parked", Climb batch 6.5's rung P showed its first `XXX` walk test red ... (10-02: 74)

156. Why `PowChooseLcmRungE` has 50 checks: an answer owed.
   - Landed: The test as landed. The other way: None. Its cost: None.
   - Home: `postmortem-2026-09-29/characterization.md:2003`; held list, 18:25 UTC 2026-09-29 (10-02: 111)

157. An earlier exploration's probe, `NotationGenericBigSum.fss`, uses a retired spelling.
   - Landed: Left as a historical probe. The other way: Respell it. Its cost: One file.
   - Home: PLAN, "Climb batch 12, listed for his review", `explorations/astra/worker/notation/NotationGenericBigSum.fss`, an earlier exploration's program, uses the reduction spelling ...

179. **Row 773 recorded by its row alone.** Row 773 (item 178) has no test, as the rung's brief asked, though its program compiles and its run dies at link time. `tests-writing.md`'s home 2 covers that case with a gated run-time pair.
   - Landed: The row alone. Default, taken: as landed.
   - The other way: A plain `link` test and an `XXX` `run` test.
   - Its cost: Two test files.
   - Home: PLAN, "Climb batch 18, listed for his review", X.worker.1; `compile-ladder/rung-checker-conditional-extension/REPORT.md:209` (decision 8), `:224`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:134-136`

185. **An expected failure that is green while walk is right.** `ProjectFortress/tests/XXXGenericBesidePlainReturnRule.fss` is an expected failure with no `.test` file. It is green exactly while walk refuses the program, which the specification requires (its comment, `:4`, "Must be refused at load"; the "Not allowed!" `ident` pair, `Specification/advanced/overloading.tex:596-602`). Walk's refusal now says "fails the Return Type Rule".
   - Landed: The expected failure as it is. Default, taken: a later walk rung makes it a plain refusal test keyed on that message, as `GenericBesidePlainReturnRuleWalk.test:1` is; the rename moves row 550's note that cites it.
   - The other way: Leave it an expected failure.
   - Its cost: A rename and a `.test` file.
   - Home: PLAN, "Climb batch 18, listed for his review", W.worker.1 and W.skeptic.1; `compile-ladder/rung-walk-trait-method-bounds/REPORT.md:89`

194. **microGPT's APL port: a new first compile error.** It stops at the same compile phase with "DelegatedIndexed is undefined.", from rung S's `FlatString` api header; the ladder stage compares phases only.
   - Landed: As it stands; it moves with the switch-over.
   - The other way: The port's import changed now.
   - Its cost: One line of the port.
   - Home: PLAN, "Climb batch 19, listed for his review", the APL port's first error

### Code generation and the run time (3)

158. Batch 8 made two program shapes that ran die at load: the compiled run time cannot load an instance at an intersection type (row 559).
   - Landed: Gated by two expected failures; the repair is the run time's. The other way: Repair the run time. Its cost: A run-time rung.
   - Home: PLAN, "Climb batch 8, listed for his review", Row 559; `compile-ladder/rung-instance-bound/SKEPTIC.md:69`

159. The compiled template dispatcher answers differently for a class it was not measured on (row 499), until phase 5.
   - Landed: As landed. The other way: The repair beside row 496's. Its cost: Phase 5.
   - Home: PLAN, "Off the path, parked", Climb batch 6.5's rung G's dispatch change answers differently (10-02: 71)

180. **A compile after a typecheck writes no jar.** `fortress compile P.fss` after `fortress typecheck P.fss` of the same unchanged program writes no jar and exits 0, and `fortress run P` then says 'Could not load P'. Removing the program's `analyzed_cache` entry makes the compile write the jar. It is row 757, opened by climb batch 17, so no row was added.
   - Landed: Row 757 open, among phase 3's waiting rows. Default, taken: as row 757 waits.
   - The other way: A repair of the compile command's reuse of the analyzed cache.
   - Its cost: Not traced.
   - Home: PLAN, "Climb batch 18, listed for his review", X.worker.3; PLAN, phase 3, item 18, "Rows 763 and 757"; `compile-ladder/rung-checker-conditional-extension/REPORT.md:220`, `:226`; row 757

### How batches run (7)

160. Rung edits outside their file lists: batch 6b's ten test files; batch N's `Init.java`; batch 8's `ReflectiveQuickCheck.fss`; batch 9's two compiler tests and walk files; batch 10's checker files; batch 13's `ComponentWrapper.java` and `Functionals.scala` hunk.
   - Landed: Each as landed. The other way: Revert and redo each in the rung that owns the file. Its cost: One rung's work each.
   - Home: PLAN-history, "Off the path, parked", Climb batch 6b's items for Pavol; PLAN, "Off the path, parked", Climb batch N's rung K edited `Init.java`; PLAN, "Climb batch 8, listed for his review", Climb batch 8's rung Q edited `Library/ReflectiveQuickCheck.fss:147`; PLAN, "Climb batch 9, listed for his review", Files outside rung W's list; Two expected-failure compile tests of rung S outside its record's files; PLAN, "Climb batch 10, listed for his review", Rung C's files beyond its section's list; PLAN, "Climb batch 13, listed for his review", Two rung edits outside their sections' file lists (10-02: 93, 58)

161. A skeptic's fix may edit a file of its rung's area that the file list neither names nor rules out.
   - Landed: As landed: such a fix is within the rung when the row's claim needs it. The other way: The file list is exhaustive. Its cost: Such fixes reverted.
   - Home: PLAN, "Climb batch 12, listed for his review", The scope of a skeptic's fix

162. The checker count reads 1 while the component's first error stops it, then about 99, before it falls.
   - Landed: The count read as it is. The other way: Read it by the apis' rows, which are all 0. Its cost: None.
   - Home: PLAN, "Climb batch 13, listed for his review", How is the checker count's zero read once every; `reviews/batch-13-review.md` section 2

163. A project agent type per role.
   - Landed: Deferred; it needs a restart of the session's process. The other way: Register them. Its cost: A restart.
   - Home: `process-engineering/batch-redesign.md` section 9, item 14

164. The whole-project designs.
   - Landed: Not done; dropped from the order. The other way: Run them. Its cost: Two design runs.
   - Home: `process-engineering/README.md`, pending item 3

184. **P-148's second pass after climb batch 18's rung K, not taken.** The profile shows no sample in the rung's added code. The one share above 1 % inside its declarations is the bound check that was already in the trait-type case, 4.94 % of 5,385 samples, all in `TypeAnalyzer.subtype`. A memo of it keyed on the analyzer, the argument and the bound would remove at most 945 of its 2,177 checks, about 2 % of the run, which is under the difference between two runs (75.1 s and 77.0 s).
   - Landed: No memo, the rung's decision 9. Default, taken: as landed.
   - The other way: The memo, as the pass.
   - Its cost: An audit of the memo's key, for about 2 % of the count stage at most.
   - Home: PLAN, "Climb batch 18, listed for his review", K.worker.1; `compile-ladder/rung-checker-where-checks/REPORT.md:171-185`, `:267-269`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:258-274`

193. **Climb batch 19's sixteen forks at their defaults, and its points for his sight.** The record's forks (`coordinator/CLIMB-BATCH-19.md`, section 2) and the team lines changed in the checker's exclusion test, in `String`, in `FlatString`'s api and in the desugaring.
   - Landed: As the record set them.
   - The other way: Any one of them changed in a later batch.
   - Its cost: By fork.
   - Home: PLAN, "Climb batch 19, listed for his review", the sixteen forks

### The record, its tools and the repository (10)

165. `ledger.py` has no route for a note past the length limit, a reproducer, a close with no test, a close of a contested row, or a narrowed claim; 21 of batch 13's notes and more of batches 11 and 12 wait.
   - Landed: No default on record. The other way: New `ledger.py` commands, or the coordinator's hand edit. Its cost: Tool work.
   - Climb batch 18's gather.1 adds eleven: the notes for rows 470, 701 and 677 of rung K and rows 21, 539, 713, 550, 740, 219, 416 and 364 of rung W, refused for length or a closed row, their texts in `compile-ladder/climb-batch-18/RECORD.md:140-155`. The routing tried each again with `ledger.py note`, and the tool refused each. Home: PLAN, "Climb batch 18, listed for his review", gather.1.
   - Home: PLAN, "Climb batch 11, listed for his review", gather.1; PLAN, "Climb batch 12, listed for his review", gather.2; PLAN-history, "Climb batch 11, listed for his review", review-routed.1

166. How the ledger numbers rows during parallel batches (D7).
   - Landed: Provisional numbers folded at the gather. The other way: A lock and numbers in call order. Its cost: A rung edits the ledger.
   - Home: `facts-extract.sh 'history:P-133'`; `process-engineering/gap-ledger-archaeology.md:435`

167. Row 331's re-gating on inference, and the decisions judgement's candidate rows 2, 3 and 5.
   - Landed: Parked. The other way: Open the rows. Its cost: Rows.
   - Home: PLAN, "Off the path, parked", Row 331's bare `Nothing` re-gated on type inference (10-02: 103)

168. `checkDeclComprises`'s header comment lists three cases, not the fourth.
   - Landed: The comment as landed. The other way: A two-line addition. Its cost: Two lines.
   - Home: PLAN, "Off the path, parked", `checkDeclComprises`'s header comment lists the eligibility rule's three cases; `TypeHierarchyChecker.scala:176-191` (10-02: 81)

169. The root README calls `Specification-1.0-frozen/` the frozen 1.0 specification; only its PDF is 1.0.
   - Landed: The line as it stands. The other way: Reword it. Its cost: A line.
   - Home: `README.md:105-107`; P-96, "The S1 form" (10-02: 108)

170. The inventory's move list waits on his reading.
   - Landed: Nothing moved. The other way: Move it. Its cost: Re-check it after the cleaning first.
   - Home: PLAN, "Off the path, parked", The root README's line on `Specification-1.0-frozen/`; `facts-extract.sh 'history:P-128'` (10-02: 109)

171. The tracked jars (36 MB) fetched by a setup step, and the built PDFs as release artifacts.
   - Landed: Nothing done. The other way: Do it. Its cost: One of the PDFs sits in `Specification-1.0-frozen/`, which nothing touches; removing files shrinks a checkout only with the cleaner pass of `main`.
   - Home: the transcript only; review queue of 2026-10-02, entry 97 (10-02: 97)

172. `explorations/astra/README.md` links an archive that is only on the branch `codex/astra-microgpt`.
   - Landed: The branch kept. The other way: Tag the branch, or restore the archive. Its cost: None.
   - Home: `explorations/astra/README.md:109-127`

182. **Row 701's claim overstates.** The claim says that the code generator refuses every declaration that carries a `where` clause. It compiles a declaration whose `extends` entry carries one, and reads the entry at every instance (row 774's notes); and a trait's or object's contract never reaches it (row 781). The row is at 1,204 characters and takes no note, and only `ledger.py close --claim` rewrites a claim.
   - Landed: The claim as it stands until the row is rewritten; F-181 states what is measured. Default, taken: as landed.
   - The other way: A `ledger.py` route that corrects an open row's claim (item 165).
   - Its cost: Tool work.
   - Home: PLAN, "Climb batch 18, listed for his review", X.worker.5; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4107-4115`; `compile-ladder/rung-checker-conditional-extension/REPORT.md:228`; rows 701, 774 and 781

187. **Row 539's claim quotes walk's old refusal.** The claim says the set "gives 'at least one pair of parameters must have excluding types'". Climb batch 18's rung W makes that false: the refusal now says "fails the Meet Rule" (`XXXOverloadExistentialMeetWalk`). The row is open, its notes are full, and only `ledger.py close --claim` rewrites a claim, as for row 589 (climb batch 17's gather.2).
   - Landed: The claim as it stands. Default: the coordinator's hand edit of the claim to the new message; it cannot be carried out, since `ledger.py` is the ledger's only writer.
   - The other way: A `ledger.py` route for an open row's claim (item 165).
   - Its cost: Tool work, or one line by hand.
   - Home: PLAN, "Climb batch 18, listed for his review", gather.3; `compile-ladder/rung-walk-trait-method-bounds/REPORT.md:85-89`; `compile-ladder/climb-batch-18/RECORD.md:147`; row 539

## (a) Settled or stale: these leave the lists

### Answered by a decision of his (34)

- **PLAN's answers settled before 10-02: items 1 to 11, item 12's first part, and items 16, 18, 19, 22, 23, 24 to 30, 33 and 34.** Items 2 to 11 by P-40, "Sizes.", P-97, "The refused examples (S2).", P-41, "The run-time size design is B.", P-73, "Fixed-width overflow raises `IntegerOverflow` under `walk`", P-80, "The sign-refined number types are a superseded design.", answers 7, 8, 9 and 10, and "The checker count is measured, never red."; item 12's first part by "Sizes." (its decision; row 400 keeps an open compiled half); 16 by "Walk chooses coercions on the value, for now."; 18 and 34 built by batch 8's rung I (rows 447 and 508 fixed); 19 to Q-walk; 33 built (row 517 fixed); the others marked answered in PLAN. Home: PLAN-history, "Pavol's answers, in the order they are needed", items 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 22, 23, 26, 30, 27, 33, 18, 19 and 34; Decided 2026-09-28 before batch N; PLAN, "Pavol's answers, in the order they are needed", item 12.
- **Item 15, arithmetic in a size (array fork 1).** P-55, "Arithmetic in a size ..."; built `7fd8fddc8`. Home: PLAN-history, "Pavol's answers, in the order they are needed", item 15; item 13, fork 1.
- **Item 20, the written `Object` bounds of batch 7's rung B.** P-48, "A type parameter the arguments do not fix takes its bound ..."; built `a1b5c253d`. Home: PLAN-history, "Pavol's answers, in the order they are needed", item 20 (10-02: 1).
- **Item 32, the domain condition on answer 9's positional rule; with it, the line that walk's rung would promote row 159's renamed pairs.** His answer (1) to batch 8's Q3, 2026-10-02 at about 11:24 UTC (`CLIMB-BATCH-8.md:46-54`); row 159 stays a walk defect row. Home: PLAN-history, "Pavol's answers, in the order they are needed", item 32; PLAN-history, "Off the path, parked", Walk refuses the α-renamed and swapped pairs of top-level.
- **Item 35, the natives' one binding text.** P-58, "The natives' one binding text is `builtinPrimitive` naming a static helper (item 35)."; `046207371`. Home: PLAN-history, "Pavol's answers, in the order they are needed", item 35 (10-02: 12).
- **Item 36, expected types in four contexts.** His yes to batch 11's Q2; built `27cb9e93b`. Home: PLAN-history, "Pavol's answers, in the order they are needed", item 36.
- **Items 39 to 41, the bounded ranges of rank 2 and 3, their comparisons, and `#(0,n)`.** His answer (a) to batch 11's Q3; built `b872d65a1`. Home: PLAN-history, "Pavol's answers, in the order they are needed", items 39, 40 and 41.
- **Items 42 and 44, `String`'s `left` and `right`, and `QQ`'s `ceiling` and `truncate`.** P-53, "`String`'s `left` and `right` answer `Just(c)` ..." and P-54, "`QQ`'s `ceiling` and `truncate` keep `ZZ` ..."; built `74b28e9d4`. Home: PLAN-history, "Pavol's answers, in the order they are needed", items 42 and 44.
- **Item 47, a local function with an untyped parameter.** His yes to batch 11's Q4; built `2d22d3a35`. Home: PLAN-history, "Pavol's answers, in the order they are needed", item 47.
- **Item 48, a `label` body (a) and a call as another call's argument (b).** P-50, "A `label` body takes the expected type ..." (built `054c4bcfd`) and "A call written as another call's argument is retried ..." (a batch 14 candidate). Home: PLAN-history, "Pavol's answers, in the order they are needed", item 48.
- **Items 49 and 50, the open range's five methods and the corner-by-corner check.** P-56, "The open range `(:)` keeps its wildcard type ..." and P-52, "A range of rank 2 or 3 checks containment corner by corner"; built `abe8b0342`. Home: PLAN-history, "Pavol's answers, in the order they are needed", items 49 and 50.
- **Item 52, how fork 2's held library half gets past the checker's slowness.** His "land it now" (05:27 and 05:35 UTC, 2026-10-10): the checker-speed fix (`3c67d5204`) and the held half (`749ec523e`) landed as batch 13b, its gate at `d96bc7776`, its Fable skeptic's approval at `71c082724`; row 688 closes with it; his answer on the bound itself is the (b) item on fork 2. Home: PLAN-history, "Pavol's answers, in the order they are needed", item 52; `compile-ladder/climb-batch-13b/RECORD.md`.
- **Row 582, `isLeftZero`, with batch 13's pins of it.** P-57, "`LexicographicReduction.isLeftZero` takes `TotalComparison` ...", which names the refused `isLeftZero(Unordered)`; built `9ba86f7da`. Home: PLAN-history, "Climb batch 8, listed for his review", Row 582; PLAN, "Climb batch 13, listed for his review", Extensions and pins of climb batch 13 (point 3).
- **The skeptic's contested rule, its third clause.** The `coordinator` skill's `references/batch.md`, "The roles"; `a1902d0d4`. Home: PLAN-history, "Climb batch 11, listed for his review", The skeptic's contested rule.
- **The instance rule extended to static inference by rung S's sentence.** P-48, "A type parameter the arguments do not fix takes its bound ...", whose R2 applies it to the checker, built by batch 8's rung I. Home: PLAN-history, "Pavol's answers, in the order they are needed", The paper's instance rule in batch 7b's rung S; R2 (10-02: 23).
- **The synthesis's second default: one skeptic, no second review.** The redesign, the `coordinator` skill's `references/batch.md`, "The roles" and "The workflow"; `process-engineering/README.md`, pending item 1. Home: synthesis section 2(b) (10-02: 20).
- **Workflow option (b), approvals with required corrections.** Stale: the skeptic now fixes what it finds (`process-engineering/README.md`, "Waiting on Pavol", third point); `facts-extract.sh 'history:P-118'` still calls the option parked. Home: PLAN-history, "Off the path, parked", Workflow option (b), the review's second script change, and ... (10-02: 8).
- **A judge may not strike a candidate from a fork.** Stale: a judge now rules only on a contested fix, a refusal or a stop (the `coordinator` skill's `references/batch.md`, "The roles"). Home: PLAN-history, "Pavol's answers, in the order they are needed", F's `=` on `Number` (10-02: 7).
- **A protocol line: a change is reviewed by reading the change, not its report.** In the skeptic's brief: the worker's report is "a claim to check, not evidence", and the diff is read line by line (`climb-batch-workflow.js:860`, `:886`). Home: PLAN-history, "Pavol's answers, in the order they are needed", A line for principle 5 of the protocol (10-02: 6).
- **The gap ledger: its purpose, sorting, numbering, worklist and counts.** The `coordinator` skill's `references/record.md`, "INDEX and the gap ledger", and `fortress-repo`'s `references/records.md`, "The gap ledger" (topic sections, `ledger.py`, D1 to D6); D7 is a (c) item. Home: PLAN-history, "Pavol's answers, in the order they are needed", Re-deriving the ledger's worklist and counts over all rows; held list, lines 13-21 (10-02: 11).
- **May a Fable judge rule overnight.** The `coordinator` skill's `references/delegating.md`, "Which tier runs what" (a second ruling on Fable, pre-approved) and `references/batch.md`, "The go". Home: PLAN-history, "Pavol's answers, in the order they are needed", May a Fable judge rule overnight on a review's.
- **Dropping the merged-diff review.** The `coordinator` skill's `references/batch.md`, "Reserved points and repairs". Home: synthesis section 2(b) (10-02: 4).
- **Expected-output files and comparing the corpus's outputs.** P-103, "The suite's verdict is the check." Home: synthesis section 2(a) (10-02: 5, 19).
- **New tests named by topic.** The synthesis's third default, settled 10-02. Home: synthesis section 2(c) (10-02: 21).
- **The gate after a repair of specification text only.** The `coordinator` skill's `references/batch.md`, "Reserved points and repairs", and `fortress-repo`'s `references/gate.md`, "When to run it"; `c5d3bd401`. Home: PLAN-history, "Climb batch 8, listed for his review", The gate reruns after a review's or gate's repair that changes only ....
- **Re-approval row 48: a batch's own gate summary as the next comparand.** Stale: every gate compares with the newest landed summary (`.claude/skills/fortress-repo/references/gate.md:9`); rows 42 to 46 and the homes 374 to 377 were settled on 10-02. Home: PLAN-history, "Off the path, parked", Re-approval rows 42 (10-02: 104).
- **A ledger row for code generation's refusal of `where` clauses, and a section for the cost rows.** The `coordinator` skill's `references/record.md`, "INDEX and the gap ledger": any agent adds a row through `ledger.py`, and section 15 holds performance rows. Home: PLAN-history, "Off the path, parked", A section for the cost rows (10-02: 105).
- **Rung C's two points.** Item 16 and P-59, "Walk chooses coercions on the value, for now." Home: PLAN-history, "Off the path, parked", Rung C's two reported points.
- **The closure accommodation.** P-44, "`AnyIntegral`'s closure and how the checker reads `comprises`." Home: PLAN-history, "Off the path, parked", The closure accommodation he approved on 09-21.
- **Batch N's two runs, run 2 retired.** P-76, "The numeral switch, split by where the static types are." Home: PLAN-history, "Climb batch N's first run, listed for his review", Two runs of one record.
- **Rung I's ambiguity check against item 26.** P-60, "The `comprises` passages read at the level of values ..." Home: PLAN-history, "Climb batch N's first run, listed for his review", Rung I's ambiguity check refuses no tie among declarations.
- **Row 516, a lone parameter's union.** The instance rule; row 516 fixed. Home: PLAN-history, "Off the path, parked", A lone type parameter's candidates when none is narrowest.
- **Rows 391 and 455 left open by rung I.** Row 455's loose juxtaposition fixed (`27cb9e93b`) and its enclosing argument decided (P-51, "A call written as another call's argument ..."); row 391 stays a defect row. Home: PLAN-history, "Off the path, parked", Rows 391 and 455 stay open after climb batch N's rung I (10-02: 57).
- **Item 62 of the routine list, row 572: an object that inherits an abstract functional method from one trait and a concrete one from another, which no check read.** P-149, "An object that inherits an abstract functional method from one trait and its body from a sibling trait, and declares none of its own, is refused (Q1).", his answer to climb batch 16's Q1 (item 55); built by climb batch 16's rung K (`c23b85fdc`), rows 572 and 727 fixed. Home: PLAN-history, "Answered 2026-10-15 (item 55, Q1 of climb batch 16: refuse, P-149)"; PLAN-history, "Moved at climb batch 16's landing", "Climb batch 8, listed for his review", What climb batch 8's rung O's per-provider check reads in a component; `compile-ladder/rung-overloading-checker/JUDGE.md:103` (section 7).

### Answered by a landed fix or a closed row (35)

- **186, `ownGeneric`'s comment, half false.** Rewritten by climb batch 19's rung P (`14e91723f`). Home: PLAN-history, "Climb batch 19's landing, 2026-10-20", its climb batch 17 and 18 entries.
- **Row 531, `avFlat` declared `RR32`.** Row 531 fixed by batch 8's rung M. Home: PLAN-history, "Climb batch 6.5b, listed for his review", Row 531.
- **Row 534, walk and the naked-`Any` rule.** Row 534 fixed, `833420ce4`. Home: PLAN-history, "Climb batch 7b, listed for his review", Walk does not apply the restriction that a functional (10-02: 41).
- **Row 556, the `seq` family, `DelegatedIndexed`'s pairs, and rung L's stop on them.** Row 556 fixed by batch 8's rung O. Home: PLAN-history, "Climb batch 7b, listed for his review", The rest of the one library's `seq` family; `DelegatedIndexed`'s two `seq` pairs; Stop met and lifted.
- **Batch 7b's review-routed.1 and .2, two test messages and a rename.** Done by batch 8's rung M. Home: PLAN-history, "Climb batch 7b, listed for his review", review-routed.1; review-routed.2.
- **Rows 425 and 447 kept open by batch N.** Row 447 fixed by batch 8's rung I; row 425's rest is a (c) item. Home: PLAN-history, "Climb batch N's first run, listed for his review", Rows 425 and 447 stay open.
- **Walk trusting `comprises` clauses it never checked (rows 551 and 22).** Batch 9's rung K checks them at load; the scope is a (b) item; row 22 is a duplicate of 551. Home: PLAN, "Climb batch 7b, listed for his review", Rung W's walk half of row 492 trusted `comprises` clauses that walk ...; PLAN-history, "Off the path, parked", Row 22 (10-02: 43, 82).
- **Row 512, a union of three types, and its home-2 test.** Row 512 fixed; the test promoted as `InferLoneBoundThree`. Home: PLAN-history, "Climb batch 8, listed for his review", Stop met and lifted; PLAN-history, "Off the path, parked", A compiled defect measured by rung K's skeptic has its home 2 ... (10-02: 59).
- **The reductions box saying the checker takes `Bottom`.** Revised by `369982d85`: it says the checker takes the bound (`reductions.tex:37-41`). Home: PLAN-history, "Climb batch 8, listed for his review", The reductions callout.
- **Row 576, the microGPT checks' inputs.** `8caa42acd`; row 576 fixed. Home: PLAN-history, "Climb batch 8, listed for his review", Row 576.
- **Row 580, a numeral `IN` a range, and the 95 per-provider pairs.** Batch 9's rung R, `631fb867e` (`reviews/batch-9-review.md:12-17`); row 581 stays a defect row. Home: PLAN-history, "Climb batch 8, listed for his review", Row 580; The one library's per-provider pairs that climb batch 8's rung O's check ....
- **The `cross` sites.** Rung O's fix, row 561 fixed. Home: PLAN-history, "Climb batch 8, listed for his review", `cross`: the three `cross` sites that section 4 of ....
- **Row 583, the full sequential ranges' `map`.** Row 583 fixed, `631fb867e`. Home: PLAN-history, "Climb batch 8, listed for his review", Row 583.
- **The distance classes read by line ranges.** `9d24290fb`, `classify.py` by declaration; row 577 still reads open in the ledger. Home: PLAN-history, "Climb batch 8, listed for his review", The distance table's class rows move with fixed line ranges; PLAN-history, "Off the path, parked", The distance stage's `classify.py` names three classes by hard-coded.
- **Row 590, `MatchFailure` checked.** Row 590 fixed, `a1b5c253d`. Home: PLAN-history, "Climb batch 9, listed for his review", Row 590.
- **Row 628, the reductions' `Any` devices.** Row 628 fixed, `aadd02f23`; its consequence at load is a (c) item. Home: PLAN-history, "Climb batch 10, listed for his review", Row 628.
- **Row 633, getters called with `()`.** Row 633 fixed, `b872d65a1`. Home: PLAN-history, "Climb batch 10, listed for his review", Row 633.
- **Rows 610 and 617, the per-provider check's two refusals.** Fixed, `2d22d3a35`. Home: PLAN-history, "Climb batch 10, listed for his review", The compiled checker's per-provider Meet Rule for functional methods.
- **Row 614, an `override` in a trait under walk.** Row 614 fixed, `369982d85`. Home: PLAN-history, "Climb batch 10, listed for his review", Row 614.
- **What walk's Meet Rule check missed (rows 618 and 647).** Both fixed; the checker's half is row 570, a (c) item. Home: PLAN-history, "Climb batch 10, listed for his review", What walk's Meet Rule check for functional methods does not reach.
- **Rows 625 and 626.** Both fixed, `2d22d3a35`. Home: PLAN-history, "Climb batch 10, listed for his review", Row 625; Row 626.
- **Row 463's owed compiled tests.** `2d22d3a35`. Home: PLAN-history, "Climb batch 10, listed for his review", review-routed.1.
- **The microGPT checks not run at batch 10's landing.** Run by hand (`c36fa141e`); batches 12 and 13's commit stages ran them (`reviews/batch-12-review.md:85`, `batch-13-review.md:107`). Home: PLAN-history, "Climb batch 10, listed for his review", The two microGPT checks under walk were not run at climb batch ....
- **Row 651, a dotted method's static arguments.** Row 651 fixed, `054c4bcfd`. Home: PLAN-history, "Climb batch 11, listed for his review", Rung C's row 651 and when to repair it.
- **Row 658, `PrefixSet`'s `indices`.** Row 658 fixed, `abe8b0342`. Home: PLAN-history, "Climb batch 11, listed for his review", `PrefixSet` declares no `indices`.
- **The skill sentences batches 11, 12 and 13 made false, and the reviews' skill points.** `7b3226bb2`, `38def33a9`, `6c021c983`; `sources.md:436` names `QuickCheck` and `Random`; `interpreter.md:45` names the `where` clause. Home: PLAN-history, "Climb batch 11, listed for his review", gather.2; PLAN-history, "Climb batch 12, listed for his review", review.1; The skill's upkeep after climb batch 12; PLAN-history, "Climb batch 13, listed for his review", review.1; The skill's upkeep after climb batch 13.
- **Tests owed for row 653, for the reduction at `Any`, and for `Pairs`.** `fdd377ead`, `efd6bb2f2`; setting row 653's reproducer is in the `ledger.py` (c) item. Home: PLAN-history, "Climb batch 11, listed for his review", review-routed.1; PLAN-history, "Climb batch 12, listed for his review", review-routed.1; review-routed.2.
- **`ant testSpecData`'s red examples.** 130 of 130 since `369982d85`; P-124, "The specification's examples join the gate at zero red." Home: PLAN-history, "Off the path, parked", `ant testSpecData` had at least one red example on the base.
- **Batch 6b's rows 450 to 453.** 450, 451 and 452 fixed; 453 retires with the prelude. Home: PLAN-history, "Off the path, parked", Climb batch 6b's items for Pavol.
- **Rung B's rows 469 to 473 and its ten-line edit.** 469, 472 and 473 fixed; the written bounds dropped by `a1b5c253d`; 470 and 471 stay defect rows. Home: PLAN-history, "Off the path, parked", Climb batch 7's rung B edited ten lines where the batch record ...; Climb batch 7's rung B opened rows 469 to 471 for his ... (10-02: 92).
- **The owed tests of batch 6.5's second run.** Written in rung E. Home: PLAN-history, "Climb batch 6.5b, listed for his review", Climb batch 6.5's second run's own section-1 default.
- **Rung X's re-anchored citations.** Overtaken by `dc0eee2fe`. Home: PLAN-history, "Off the path, parked", Climb batch 7C's rung X re-anchored the two test.
- **The proviso that refused the team's `where` spelling of `comprises`.** Overtaken by batch 13's widening (`7fd8fddc8`), now a (b) item. Home: PLAN, "Off the path, parked", The revival's proviso on a listed type's static variables in a `comprises` ... (10-02: 79).
- **Item 173, row 766: wrong values for a trait's generic dotted method.** Repaired at its default by climb batch 18's rung W, way A (`5262a2412`): walk reads the method's bounds and coercion targets where the trait declares them; row 766 fixed, `TraitGenericMethodInference` (F-253). Home: PLAN-history, "Climb batch 18's landing, 2026-10-18", "Pavol's answers, in the order they are needed", item 60.
- **Item 174, a commit of `main` that is red alone.** Settled at its default, which he has not answered; he was told in the landing report of 20:01 UTC on 2026-10-17, but not that it went against the letter of his word for item 57: the history left as pushed, and the gather's order rule fixed, so that a rung comes after the rungs it lands only with (`ac74e11c4`); climb batch 18's gather applied it (`compile-ladder/climb-batch-18/RECORD.md`, "The order the rungs were applied in"). Home: PLAN-history, "Climb batch 18's landing, 2026-10-18", "Work that can start now, with no decision", Climb batch 17's review, finding 2; PLAN, "Climb batch 17, listed for his review", gather.4.

### Information only, a list of other entries, or merged into an entry here (6)

- **The rungs' lists on file: N's I, K and T; 6.5b's E and V; 7b's C, S, W and L; 8's I, Q, O and M; 9's W, K, R and S.** Each point is an entry here or an item. Home: PLAN-history, "Climb batch N's first run, listed for his review", Rung I's list; Rung K's list; Rung T's list; PLAN-history, "Climb batch 6.5b, listed for his review", Rung E's list; Rung V's list; PLAN-history, "Climb batch 7b, listed for his review", Rung C's list; Rung S's list; Rung W's list; Rung L's list; PLAN-history, "Climb batch 8, listed for his review", Rung I's list; Rung Q's list; Rung O's list; Rung M's list; PLAN-history, "Climb batch 9, listed for his review", Rung W's list; Rung K's list; Rung R's list; Rung S's list (10-02: 47, 70, 77, 83).
- **Defects recorded with their gated tests, nothing asked: the compiled powers and `CHOOSE`, the compiled `try` shapes, row 522, row 482, row 498, row 501, row 673, row 433's `distribute`, row 488's drift, `Character` and `Char`.** Each its ledger row. Home: PLAN-history, "Climb batch 6.5b, listed for his review", Compiled defects that land gated and unrepaired; The compiled `try` in two shapes; Row 522; PLAN-history, "Off the path, parked", Row 482; Row 498; Row 501; PLAN-history, "Climb batch 13, listed for his review", Row 673; PLAN-history, "Climb batch 8, listed for his review", `SumReduction`'s two `distribute`; `Character` and `Char`; PLAN-history, "Climb batch 10, listed for his review", Row 488's mechanism.
- **Notes with no choice in them: the dynamic-applicability annotation; the Return Type Rule's repair beside its example; row 499's tie routed; batch 7b's three lifted stops; provisional rows' numbers; way 11's shape; Part IV's api changes; tests the gather placed; no rerun after rung N's repair round, the gate having measured the merged tree; row 555's form, unchanged by P1.** Each says nothing is asked, or its question was answered. Home: PLAN-history, "Climb batch 7b, listed for his review", The checker's dynamic-applicability annotation; The Return Type Rule's repair beside its example; Row 499's direct call `f(b)` on a `Box[\Blue\]` answers; Stop met and lifted; PLAN-history, "Climb batch 9, listed for his review", Climb batch 9's rung W's provisional rows 587 to 594 kept their ...; Row 555's F-bounded form; PLAN-history, "Climb batch 11, listed for his review", For information, climb batch 11's rung W: the judgement's ...; PLAN-history, "Climb batch 10, listed for his review", Part IV changes with climb batch 10's rung N's api edits; The expected-failure tests that climb batch 10's rungs N; No checker-count or distance rerun after climb batch 10's rung N's repair ... (10-02: 46).
- **Parked lines that ask nothing: rung H's stop and two files; row 460; the arrays-figure paragraph; batch 7R's and 7C's section-1 defaults; `widen(0)`; the older home-2 tests; batch 6.5's section-1 defaults; answer 8 on the prelude; the `O2Z64` crash; row 404's design note; R1 to R11.** Each says nothing is asked or is answered. Home: PLAN-history, "Off the path, parked", Climb batch 7's rung H met the stop "a to Row 404 and the ledger's worklist item 12; PLAN-history, "Pavol's answers, in the order they are needed", R1 to R11.
- **`StandardTotalOrder.MINMAX`'s body.** One of the self-typed bodies, the (b) item. Home: PLAN-history, "Climb batch 8, listed for his review", `StandardTotalOrder.MINMAX`'s body (`Library/FortressLibrary.fss:289-290`), which section 4 of the batch ....
- **Merged into an entry here: R9 (item 37); batch 8's stop on row 546 (the generic closed-trait item); `String`'s juxtaposition (item 38); row 547 after the memo; row 616 and batch 10's stop on rows 591 and 612; row 597 (the closure scope); rung W's Q1 (item 51); the varargs string sites; the second `ledger.py` list; nested tuple pins (item 43); `shouldRaise` (rung N's values); every rung edit outside its list; row 514 (row 661); the switch-over's design (the dead sizes).** The entry named. Home: PLAN-history, "Climb batch 8, listed for his review", R9, `NN32` into `RR64`; PLAN, "Climb batch 8, listed for his review", Stop met and lifted; `String`'s juxtaposition is three top-level operators since climb batch 8's rung M; Row 547 after rung O re-keyed the overloading memo; PLAN, "Climb batch 9, listed for his review", Row 616; Row 597; Stop met and lifted; PLAN, "Climb batch 10, listed for his review", Stop met and lifted; `shouldRaise` when its expression raises nothing throws `ForbiddenException(TestFailure)`; PLAN-history, "Climb batch 12, listed for his review", Q1 of climb batch 12's rung W; PLAN, "Climb batch 12, listed for his review", gather.2; PLAN, "Climb batch 13, listed for his review", Extensions and pins of climb batch 13 (point 4); PLAN, "Off the path, parked", The compiled path has no strided range (10-02: 18, 93).

### Struck on 2026-10-02 and still struck (5)

- **The self-typed bodies "not ripe" (now ripe: a (b) item).** The judgement exists (`reviews/self-typed-bodies-judgement.md`). Home: CLIMB-BATCH-8.md Q2.
- **This week's pacing; the review's second script change; the `wip/` branches; the cleaner pass of `main`; the skill-extraction session; the FACTS titles; the long FACTS entries; the tools reorganisation; pricing the tokens; inventory item 36's leftovers.** The check against his words of 2026-10-02; the branches deleted that evening; the skills since written (`facts-extract.sh 'history:P-132'`). Home: review queue of 2026-10-02, "Checked against his words"; PLAN, "Off the path, parked", Housekeeping: the remote `wip/` branches (deleted by Pavol on ...; PLAN-history, "Off the path, parked", The price of the project's tokens at Anthropic's API prices (10-02: 3, 10, 95, 96, 98, 112, 113, 114, 115, 116).
- **Walk carrying the expected type into a generic call (rows 510, 21, 364).** His word of 09-29 14:07: walk is not touched until the switch-over gives it types. Home: PLAN-history, "Off the path, parked", Walk's static-argument inference against the specification (10-02: 17).
- **Typecase's binding syntax.** His rule that the text changes when it meets reality; default (a). Home: PLAN-history, "Off the path, parked", Typecase's binding syntax (10-02: 106).
- **The testing archaeology's answer to his question.** Answered 16:19 UTC 2026-10-02. Home: `postmortem-2026-09-29/archaeology-testing.md` section 7 (10-02: 110).

## The queue of 2026-10-02, entry by entry

Each old entry and where it now stands: a number is an item here, (a) an entry of the settled list.

1: (a); 2: 1; 3: (a); 4: (a); 5: (a); 6: (a); 7: (a); 8: (a); 9: 49; 10: (a); 11: (a); 12: (a); 13: 20; 14: 35; 15: 36; 16: 34; 17: (a); 18: (a); 19: (a); 20: (a); 21: (a); 22: 109; 23: (a); 24: 3; 25: 67; 26: 85; 27: 6; 28: 7; 29: 8; 30: 10; 31: 9; 32: 133; 33: 11; 34: 57; 35: 58; 36: 59; 37: 60; 38: 134; 39: 135; 40: 136; 41: 78, (a); 42: 79; 43: 15, (a); 44: 77; 45: 61; 46: (a); 47: (a); 48: 89; 49: 90; 50: 91; 51: 92; 52: 93; 53: 148; 54: 96; 55: 52; 56: 53; 57: (a); 58: 160; 59: (a); 60: 86; 61: 87; 62: 146; 63: 97; 64: 147; 65: 54; 66: 98; 67: 99; 68: 102; 69: 100; 70: (a); 71: 159; 72: 142; 73: 143; 74: 155; 75: 145; 76: 144; 77: (a); 78: 13; 79: 42, (a); 80: 139; 81: 168; 82: (a); 83: (a); 84: 154; 85: 141; 86: 140; 87: 111; 88: 110; 89: 112; 90: 113; 91: 43; 92: (a); 93: 160, (a); 94: 22; 95: (a); 96: (a); 97: 171; 98: (a); 99: 41; 100: 37; 101: 25, 26, 27; 102: 28; 103: 167; 104: (a); 105: (a); 106: (a); 107: 29; 108: 169; 109: 170; 110: (a); 111: 156; 112: (a); 113: (a); 114: (a); 115: (a); 116: (a).
