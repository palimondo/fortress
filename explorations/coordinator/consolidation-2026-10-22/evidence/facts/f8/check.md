<!-- The clarity workflow's check of FACTS chunk f8, 2026-10-22: the writer's rewrites of F-231, F-232, F-237, F-240, F-242 to F-245 and the merge of F-246 into F-259, compared with the record at main and with the sources each entry cites, and the cold reader's answers compared with the source meaning; each failure classed as a missing concept, wording or uncertain fidelity. -->

# FACTS chunk f8: the check

Read on `main` with `facts-extract.sh` (the entries and `history:F-237`, `history:F-244`), the writer's `proposals.md`, `proposals.apply`, `concepts.md` and `clean.txt`, the cold reader's `cold-read.md` and the assessment. Sources followed: `perf-probes/checker-speed-2/REPORT.md` sections 1, 2.2, 2.3, 4, 6, 8, 11; `climb-batch-15b/RECORD.md`; `reviews/batch-16-review.md` section 2; `reviews/batch-17-review.md` sections 1 and 2; `reviews/batch-18-review.md` and `batch-19-review.md`, section 2 lines; `reviews/batch-20-review.md` section 2; `climb-batch-20/gate/distance.txt`; `rung-solver-speed/REPORT.md` sections 5 and 10; `rung-ast-hashes/REPORT.md` sections 1, 4.2 to 4.4, 13; `rung-checker-abstract-callsite/REPORT.md` sections 1 and 6, `SKEPTIC.md`, `JUDGE.md`; `perf-probes/where-clauses/REPORT.md` A.0, A.1, A.2.1, A.4, B.0, B.1, B.3, B.6; `perf-probes/generic-distribute/REPORT.md` sections 1, 3, 4; `perf-probes/symbolic-operators-2/REPORT.md` sections 0 to 3.3 and 5; `perf-probes/symbolic-operators/REPORT.md` sections 0, 1.5, 2.3, 3; PLAN, "Pavol's answers", item 59; P-151, P-155; F-250, F-251, F-254, F-255, F-256, F-259; gap-ledger rows 430, 433, 436, 470, 634, 636, 748, 751, 752, 773, 775, 776; the code (`TypeWellFormedChecker.scala:36-114`, `:345-348`; `_WrappedFValue.java:170-177`; `NodeFactory.java:1166-1184`; root `build.xml:679-697`; `FortressLibrary.fss:3237-3251`, `:3420-3438`; `OverloadedFunction.java:1990-1994`) and the tests (`XXXStaticArgBoundNestedCall.test`, `XXXStaticArgBoundAtEachCall.test`). I ran nothing but reads.

The cold reader could not load `references/revival-changes.md`. That part defines several of these entries' terms (the fusion of `SUM` with `MAX` and `MIN`, conditional extension, a `comprises` clause's `where`-clause variable), but it is being rewritten and the writer brief forbids leaning on it. So I class those terms as concepts that every worker lacks.

## F-231, the walker split

**Fidelity.**
- "About 95 % of the time that remained was the solver reducing formulas again". This is broader than the source. The source says: "After the fix, about 95 % of the component's time is in the solver's re-normalization of meets (§2.3)" (`checker-speed-2/REPORT.md:391`). Section 2.3 measures one JFR window, the library component's type check, where `Formula.reduce` is 94.8 % inclusive. The apis' part of the stage is a separate window (its overloading check holds 90.2 % of the samples). The record's own text, "of what remained then", was equally loose, and `:429` writes "of what remains". "The time that remained" now reads as the whole stage's time. **Uncertain fidelity, settled by §2.3.** Proposed: "In the library component's type check, about 95 % of the time that remained was the solver reducing formulas again, which its memos now answer (F-235)."
- "Split in order into eight methods with identical output, on climb batch 15b's code". The "before" runs (T1, F0, D1) had no split, so they did not run climb batch 15b's code. The probe ran on `473ab6a30`, whose code is that of `994dc944c`, climb batch 15's, with row 680's line applied (the report's opening comment). Climb batch 15b then landed exactly the split and that line (`climb-batch-15b/RECORD.md`, "What landed"). `git diff 994dc944c bc65431d5 -- ProjectFortress Library` is empty. The batch-16 review's "the walker split's effect on 15b's code" is the shorthand behind the phrase. The meaning holds, but the phrase is circular (15b's code includes the split). **Wording** below.
- "That count stage ran with the repair ...". In the source, every run in the pair had the repair: the count stage before and after (F0 and F1, T1 and T3), and the distance stage before and after (D1 "repair in", D2 "repair and fix"; section 6). "That count stage" is singular and leaves out the distance stage, so a reader cannot tell that the comparison is like for like. The cold reader guessed the opposite: "340 s is not a like-for-like comparison with 911 s". The record's text had the same scope ("the count stage with row 680's repair"), so the rewrite adds no error, but it does not resolve the ambiguity. **Wording** below.
- The rest matches the sources: 31,704 bytes, the 8,000-byte limit, eight methods of 30 cases with the largest 4,474 bytes (sections 1 and 4); 911 to about 340 (F0 911 and F1 352; T1 953 and T3 344; I5 935 and I7 339); 2,375 to 931 (D1, D2); an idle machine (section 6: "Nothing else of mine ran beside a timed run"). The note line's 110 s against 368 s matches `rung-solver-speed/REPORT.md` section 5.

**Comprehension.** The cold reader's answers match the source, apart from the points above and these:
- "set the checker's time": the reader read it as "dominated". The source supports that: `Walker.walk` is 80.3 % inclusive of the apis' samples and 59.7 % of the component's, every frame interpreted (section 2.2).
- "the solver": the skill never names the checker's constraint solver.
- `WalkerJUTest`: the entry does not say what the test checks.
- The 340 s here against F-240's 325 s at 15b's gate: the batch-16 review explains it. 15b's gate ran "beside other stages", against idle runs of 333 s and 352 s, and its distance stage ran beside the suites, 1,075 s against an idle 931 s.

**Class.**
- Concept: the checker's solver, meaning `TypeAnalyzer`'s subtype and exclusion questions (`pSub`, `pExc`, `dExc`, `normConjunct`) and `Formula`'s reduction of constraint formulas. F-231, F-235, F-240 and F-256 use it. Define it in `references/compiler.md`, beside "The checker's time".
- Wording, the measurement sentence: "On climb batch 15's code with the repair that lets the checker check a block's local functions (row 680; F-233), the two changes that climb batch 15b landed, and on an idle machine, the split took the count stage from 911 s to about 340 s and the distance stage from 2,375 s to 931 s; every run had the repair."
- Wording, the title: "as one method it ran interpreted and took most of the checker's time".
- Wording, the test: "Gated by `WalkerJUTest`, which fails if a method of `Walker` passes 8,000 bytes and checks the split walker's answers."
- Uncertain fidelity, settled: the 95 %, as above.

## F-232, the hashes

**Fidelity.**
- The title now matches the body and the source (`rung-ast-hashes/REPORT.md` section 1, "What stays"; section 4.4). That is the assessment's fix.
- One loss. The record said "Two kinds of node still hash by identity". The rewrite says "walk's `_WrappedFValue` hashes its value". That is accurate, since only `_WrappedFValue`'s class part changed and it "still XORs its `FValue`'s hash, walk's own (row 430)" (section 1). But the body no longer says why this is an exception: an `FValue`'s hash can be an identity hash (`FunctionClosure.hashCode` adds `System.identityHashCode(getEnv())`) or come from a global counter (`FType`), as row 430 records. Only the title still says so. **Wording.**
- "no output of the count stage moves through its hash" is the source's own limit. Section 4.4 measured only the count stage (E0 = H0, E1 keeps `:130`). F-254 widens it to the count and distance stages through row 737. Pass.

**Comprehension.**
- `DeclaredFunction` had two readings for the reader. The source settles it: it is an entry of the checker's index, not a node of the tree (`compiler/index/DeclaredFunction.java:25`; section 4.3: "It lies outside the syntax tree, in the checker's index").
- "makeAST" and "PLT `Option`" were concepts the reader lacked.
- "which makeAST's post-processing ... write": the verb sits too far from its object.
- Whether a new `Option` field must go through `NodeHash.of`: the build does that itself. The `replaceregexp` at `build.xml:692-697` rewrites every generated `Option`-typed field, so no worker writes it by hand, and the entry need not say more.

**Class.**
- Concept: makeAST, the root `build.xml` target that runs ASTGen on `Fortress.ast` and post-processes its output, and the PLT library (`ProjectFortress/third_party/plt/plt.jar`), whose `Option` the generated nodes hold. Define both in `references/toolchain.md`, beside its line on what `Fortress.ast` generates.
- Wording: "Every generated node's hash starts from the hash of its class's name: makeAST's post-processing of ASTGen's output writes that start, and so do the in-repo generators (`build.xml:679-697`)".
- Wording: "The exceptions hash through identity hashes: an inference variable's id is a bare `Object` ...; walk's `_WrappedFValue` hashes its `FValue` by walk's own hash, which can be an identity hash (row 430)."
- Wording: "`DeclaredFunction`s, entries of the checker's index and not nodes, still hash by identity".

## F-237, where the well-formedness walk reports

**Fidelity.**
- Row 776's exception is right as to behaviour: `check` drops an error whose expression holds another of the same key (`TypeWellFormedChecker.scala:41-56`), and `XXXStaticArgBoundNestedCall.test` keys `:13:36-` and "has 1 error".
- But "One exception: ... only the inner call is reported (row 776)" presents a defect as part of the rule. Row 776 is NEGATIVE-VERIFIED, "implementation gap (checker)": "A call's type that takes the call's spans would report both". Its test pins today's single error, not the right answer. The entry lists that test under "Gated by" with the others, so a reader can take the nested case as designed. The cold reader read it both ways. **Wording.**
- "In the library, by reading, no error is added or dropped" is the record's text. Its source is `JUDGE.md:81`: the claim "holds for this fix by reading only". The baseline is the reporting at the declaration that the change replaced. The rung's own distance run found that only row 433's two wellformed sites moved (`REPORT.md:167`). Pass, with the wording below.
- The source change from line ranges to function names is accurate: `SLocalVarDecl` is at `:347-348` and walks `rhs` before `body`.

**Comprehension.** The cold reader's answers match, apart from three points:
- "it" in the title: the walk or the type.
- Row 776: intended or a defect.
- "added or dropped" against what.

**Class.**
- Wording, the title: "The well-formedness walk reports an ill-formed type whose span lies outside the expression that the walk is in at that expression, so ...".
- Wording, row 776: "One known gap, still open (row 776): of two nested calls of one callee at static arguments that print alike, `next[\T\](next[\T\](x))`, only the inner call is reported; the program is still refused." Under the tests: "and `XXXStaticArgBoundNestedCall`, which pins row 776's single error".
- Wording: "In the library, by reading, reporting at the call adds and drops no error against reporting at the declaration".

## F-240, the stages' times

**Fidelity.**
- The new example matches its source. Climb batch 16's merged code took 217 s at its gate, at load 3.32 at its start (`climb-batch-16/gate/distance.txt:26-27`). Rung S's tree, "nearly the same code", took 574 s at load 4.6 to 5.3, 2.6 times as long (`batch-16-review.md` section 2; `rung-solver-speed/REPORT.md:278-279`, "load at start 4.58 5.29 5.32").
- One sentence is carried from the record, not added by the writer: "the solver's memos (F-235) make the difference, not load". The batch-16 review supports it for the fall to climb batch 16's gate, the first with the memos (82 s and 217 s: "The factor is S's memos"). The later fall to 63 s and 161 s the reviews put down to load and the machine: `batch-18-review.md:472`, "Load and the machine explain the change from 76 s and 180 s; the batch's code did not"; `batch-20-review.md` section 2, the distance stage "load, not the rungs". So "the difference" claims somewhat more than the sources. **Uncertain fidelity, settled.** Proposed: "the solver's memos (F-235) make most of the difference, not load".

**Comprehension.** The cold reader matches, apart from three points:
- "the same library text took 139 s": the same checker too? The source says so: "Neither rung changes the checker" (`batch-20-review.md` section 2).
- "load 3.3": the machine's load average is not defined.
- "beside like load" reads awkwardly.

**Class.**
- Concept: a stage's time and the load average beside it. `concepts.md` already places this in the `cloud-container` skill, beside the machine's timings. Agreed.
- Wording: "the same library text and checker took 139 s for the distance stage on an idle machine"; "So a time compares only with one taken under a like load."
- Uncertain fidelity, settled: "most of the difference", as above.

## F-242, the fusion pairs

**Fidelity.** Pass.
- The four unmet bounds and the two return-type errors match `where-clauses/REPORT.md` A.1.
- The `where` conditions are on `SumReduction`'s two `distribute` overloads (`FortressLibrary.fss:3435-3438`).
- `ActualReduction`'s generic `distribute[\K\]` answers `PossibleReductionPair[\K\]` (`:3250`).
- The team's commented text over `R` moves the errors to the generic (`generic-distribute/REPORT.md` section 1).
- P-151 says that the fusion stays.

**Comprehension.**
- "fusion pair": the reader lacked the concept. `concepts.md` says "Concepts that only one entry uses are defined in it: the fusion pairs (F-242)", but the rewritten entry does not define them. F-243 and P-151 use them too, so this is not one entry's concept.
- "the generic `distribute`" and "the inherited one": one declaration or two? The code settles it. It is one declaration, `ActualReduction[\R,L\]`'s `distribute[\K\]` (`:3237`, `:3250`), which `SumReduction` inherits.
- "a `where` condition on each method": which methods?
- The tension that the reader saw with the code generator's refusal of `where` clauses is answered by the skill's core: the compiled path does not use this library until the switch-over, and P-151 lists the code generator's half (row 701) as still to build.

**Class.**
- Concept: the fusion of `SUM` with `MAX` and `MIN`. It consists of `MaxSumReductionPair`, `MinSumReductionPair` and `SumReduction`'s two `distribute` overloads, through which the team's `Generator2` computes the maximum or the minimum of sums over a generator of generators in one fused pass (`where-clauses/REPORT.md` A.2.1, "Cost"). Define it in `references/library.md`, the library area, and correct the writer's `concepts.md` line.
- Wording: "a `where` condition on each of `SumReduction`'s two `distribute` overloads clears their four unmet bounds, and `ActualReduction`'s generic `distribute`, which `SumReduction` inherits, with its result over its own `K`, clears their two return-type errors."

## F-243, the thirteen sites

**Fidelity.**
- The title says "The 13 sites that the where-clauses probe traced to unbuilt `where` forms". The source says the opposite for most of them. Its opening comment reads: "of the thirteen checker errors filed as waiting on it, twelve go away with ordinary edits of the library". A.1 says of row 433's two return-type errors: "Errors 5 and 6 do not depend on any bound ... a `where` clause per overload ... would clear errors 1 to 4 and leave 5 and 6". Row 436's two come from "`else => 0` and `else => 1` answer a numeral where `T` is declared" (A.0). So the probe did not trace the 13 to unbuilt `where` forms. It traced 13 errors that were filed as waiting on them, and found only the list comparisons' site needing one. The phrase comes from the assessment's proposed title. The record's "`where`-clause sites" was vaguer, but not false. **Fidelity failure.** Proposed title: "The 13 errors that were filed as waiting on `where` clauses, 13 of the distance's 49 at the gates of climb batches 15b and 16, are all cleared; the 13th, the list comparisons' site, by conditional extension." Add to the body: "The where-clauses probe traced each of them (A.1)."
- The rest matches the sources:
  - 6 + 4 + 2 + 1 (A.1);
  - the probe's library-only twelve and their three edits (A.0, A.4: 49 to 37);
  - `AnyList`'s bodies respelled within `AnyList` (row 636; F-251);
  - row 634's list half (row 634: "the tuple half was built by climb batch 13 rung O");
  - "would also have cleared", in the conditional.

**Comprehension.**
- "site" against "error": the reader had two readings. A site is one error at one place, a row of `explorations/compile-ladder/gate/distance-sites.tsv`. The skill defines the distance but not a site.
- "`AnyList`'s live clause", "the identities' numeral fallback" and "row 634's list half" were unclear.
- "conditional extension": the reader had the concept only partly.

**Class.**
- Fidelity: the title, as above.
- Concept: a site of the distance. F-242, F-243, F-245, F-259 and others use it. Define it in the `fortress-repo` core, in the **distance** entry: "each of its errors, one row of `distance-sites.tsv`, named by file and line".
- Concept: conditional extension and `where` clauses. `concepts.md` places them in the core, beside generics. Agreed.
- Wording: "`AnyList`'s `comprises { List[\E\] } where [\E\]` clause, a comment of the team's made live, its 4 (F-251)"; "a `cast` at `additiveIdentity`'s and `multiplicativeIdentity`'s fallbacks, `else => 0` and `else => 1`, 2 (row 436)"; "the list comparisons' site (the list half of row 634; its tuple half was built earlier)".

## F-244, the narrow `where` forms

**Fidelity.**
- The two holes and their states match B.6 and the ledger: row 748 is FIXED (F-256) and row 773 is NEGATIVE-VERIFIED.
- Rows 751, 752 and 775 are open rows of the `comprises` opening. F-250 (row 470) and F-256 hold the constraints that are not read. All accurate.
- "Swift, Rust and Haskell check the constraint at calls and scope the member to the condition." The probe names these languages only for scoping a member to the condition (`where-clauses/REPORT.md:349` and `:405`). "Check the constraint at calls" goes back to the first version of the entry ("the peers scope the first to the condition and check the second at calls", `history:F-244`, 2026-10-16). It is not in B.6, which asks only "Should a method's constraint on its trait's parameter be checked at calls (not built)?". The record's text carried it too, so the writer did not add it. **Uncertain fidelity, settled by B.3 and B.6**: cite only the scoping, or mark the rest as the record's own reading.
- "hold where the where-clauses probe tested them". The probe tested its own shadow patches. The landed checker carries the probe's tests: F-251 lists `XXXOpenTypeEscapeChecker`, `XXXOpenTypeTwoChecker` and `XXXOpenTypeBoundEvidenceChecker`, and F-255 lists `CondExtendChecker` and `XXXCondExtendRefuseChecker`. So the claim holds for the built forms. Pass.

**Comprehension.**
- "the opening of a `comprises` clause" and "escape, two-value, Amin–Tate" were concepts the reader lacked.
- "narrow forms" is unclear without P-151.
- "departures": from what?
- The peers' sentence: description or design? P-151 settles it. Its "Still to build" holds "the members scoped to the condition, since a member checked under it stays callable where the condition fails (gap-ledger row 773)". The entry could say so.
- "checked at a dotted call": whether a functional call is also checked. The sources speak of the dotted call only (row 748, F-256), so the entry keeps their limit. Pass.

**Class.**
- Concept: opening a `comprises` clause's `where`-clause variable. At a call, the checker gives an argument whose trait lists `Box[\E\] where [\E\]` a fresh type for `E`, as it does a size (F-251). F-244, F-251 and F-256 use it. Define it in `references/compiler.md`, the checker area; its present home, `revival-changes.md`, is being rewritten.
- Wording, the forms: "The three `where` forms that the checker builds (P-151: conditional extension, a function's or a method's condition, and `AnyList`'s `comprises` clause)".
- Wording, the tests: "passes the probe's escape, two-value and Amin–Tate tests: the opened type is refused where another type is declared, two values get two types, and Amin and Tate's unsound shape is refused (F-251)".
- Wording, the peers: "Swift, Rust and Haskell scope such a member to the condition (B.3), which P-151 holds as still to build."
- Wording: "three other open rows of the gap ledger" for "three other open departures".

## F-245, the symbolic operators

**Fidelity.** Three failures, all in the new measurement. The record's old text did not have them.

1. **A condition dropped: the crash.**
   - The title says "adds 186 errors ...: 54 clear by known library fixes, and 132 by two designs". The source counts 186 only with crashes caught per name: "186 new beside the gate's 5. As the stage runs: 185 and 3 crash rows (`#total 190`). Crashes caught per name: 186 (`#total 191`)" (`symbolic-operators-2/REPORT.md` section 0).
   - The crash, "`E is not in the kind env`" on `||` in `List`'s api and component and `String`'s component, "stays under every variant" (section 1.3).
   - The report's own reading: "the full check's zero needs it fixed" (section 5, "For FACTS", "The crash"). It proposes a new ledger row, and question 4: "repair it in P-155's batch, before the check is turned on".
   - So the reader concludes, as the cold reader did, that the fixes and the two designs take the full check to zero added errors, and they do not.
   - Proposed, after the title's first clause: "(185 and three crashes on `||` as the stage runs, a checker crash that no fix or design clears: `perf-probes/symbolic-operators-2/REPORT.md` section 1.3)".
2. **A default presented as the design.**
   - The entry says "The two designs are an index bound on the subscripts, with a rule for tuple indices (124 errors), and `Vector` and `Matrix` leaving `AdditiveGroup` (8) (PLAN item 59)". Those are the probe's defaults, S1 and A2, among candidates it measured (section 5, questions 1 and 2: "S1 ... or S2, S4 or W3. Default: S1"; "A2, A1 or A3. Default: A2").
   - A3, the scalar `+` and `-` dropped, also clears the 8 (section 0, `vecA3`).
   - PLAN, "Pavol's answers", item 59 lists the arrays' candidates A1, A2 and A3, with the coordinator's default for them "none". P-155 names both vector candidates.
   - The entry does not say the designs are the curator's, but it narrows two open questions to one answer each.
   - Proposed: "and 132 wait on two designs that PLAN, "Pavol's answers", item 59 brings to the curator: a bound on the subscripts' index type (124), and a vector plus a number beside a vector plus a vector (8). The probe's candidates S1, an index bound with a rule for tuple indices, and A2, `Vector` and `Matrix` leaving `AdditiveGroup`, clear them with nothing new; A3, the scalar `+` and `-` dropped, also clears the 8."
3. **An account that does not add up.**
   - "An earlier measurement, at `d212b2c1f`, counted 205; batches since cleared `FlatString`'s pair (F-259) and 20 of the 21 `^` errors (F-263)." 205 − 2 − 20 = 183, not 186.
   - Section 1.2's table gives the other moves: `|_|` 3 to 4 ("FlatString: its api now extends DelegatedIndexed") and the scalar `+` and `-` 6 to 8 ("now in the top-level set (batch 17 rung C)").
   - The reader concludes that the batches only removed errors. The cold reader found the gap.
   - Proposed: "...cleared `FlatString`'s pair (2; F-259) and 20 of the 21 `^` errors (F-263), and added 3: `|_|` 1 and the scalar `+` and `-` 2 (section 1.2)."

**Two more points.**
- One limit carried from the record: "Walk's meet check ... refused only `EmptyString`'s `||`". Walk's check judges fewer families than the checker's. It "does not judge String's pairs ..., nor the subscripts ... It does not judge `^` and `=` either" (`symbolic-operators/REPORT.md` section 1.5, "The rest"). "Refused only" lets a reader conclude that walk finds the library sound but for one meet. **Wording** below. The cold reader also asked whether walk's check still skips symbolic operators today. It does: `OverloadedFunction.checkedName` admits an `Op` only through `NodeUtil.validOp` (`OverloadedFunction.java:1990-1994`).
- Whether P-155's probe enters the record now is the coordinator's call (the assessment; `proposals.md`, "For the coordinator"). The failures above apply to the rewrite if it does. If the coordinator keeps the old F-245 with 205 bounded to `d212b2c1f`, they do not.

**Comprehension.**
- "PLAN item 59": the section is missing, against the skill's rule for PLAN pointers.
- "`String`'s four": four of what? The source: the four concatenation operators `||`, `|||`, `//` and `///` (`symbolic-operators/REPORT.md` opening comment and section 3).
- The arithmetic, as above.
- The 54 fixes are not named.
- Walk's check, as above.

**Class.**
- Fidelity: the crash, the designs and the arithmetic, as above.
- Concept: a shadow of the checker. `concepts.md` places it in `references/compiler.md`. Agreed. The entry's "a copy of the checker" serves without it.
- Wording: "(PLAN, "Pavol's answers", item 59)"; "`String`'s four concatenation operators, `||`, `|||`, `//` and `///` (40)"; "the known library fixes of `SORT.md` (section 2's table: meets for `EmptyString`'s `||`, `=`, `|_|`, `Maybe`'s subscript and `Float`'s `^`, `String`'s operators and the api's `Vector` and `Matrix` `+` and `-`)"; "Walk's meet check, which also skips symbolic operators and judges neither `String`'s pairs, the subscripts, `^` nor `=`, refused only `EmptyString`'s `||` when widened the same way in the first probe".

## F-246, merged into F-259

**Fidelity.**
- The merge is sound. F-259 holds:
  - the conversion's two bodies;
  - `FlatString`'s api header without `opr ||(a:FlatString, self)`;
  - `extendAny` printing `Infinity`;
  - the three sites gone, 34 to 31.

  `grep` finds no pointer to F-246 in FACTS, POSITIONS, PLAN, the review queue or the skills, only its own line.
- One failure, in what the merge carries.
  - The apply file's note line says: "moving String's four operators to the top level, as juxtaposition is (the probe's juxtaposition device), clears only the two asString sites (section 3)".
  - The optional clause for F-259 in "For the coordinator" says: "Moving `String`'s operators to the top level, as juxtaposition is, was weighed and clears only the two `asString` sites".
  - Both reverse the source. Section 0: "The device clears none of the three sites on today's distance. Alone it moves the two `asString` errors to the new top-level declarations". Section 3: "The device alone moves them". Section 2.3, way J: "the two `asString` errors move to the new `FortressLibrary.fss:4447` and `:4454`".
  - The record's F-246 had it right: "juxtaposition's device alone only moves the two `asString` sites".
  - The error starts in the assessment's F-246 disposition ("clears only the two `asString` sites"), which the writer copied.
  - **Fidelity failure (note line and optional clause).** Proposed for both: "Moving `String`'s four operators to the top level, as juxtaposition is, was weighed: it clears the four families' 40 pair errors under the full check, and on the distance only moves the two `asString` sites to the new declarations (`perf-probes/symbolic-operators/REPORT.md` sections 0, 2.3 and 3)."

**Comprehension.** The cold reader did not read F-246, since it leaves FACTS. Nothing to compare.

## For the coordinator

- `concepts.md` says F-242 defines the fusion pairs. It does not, and P-151 and F-243 use them too. The concept goes to `references/library.md`.
- The F-246 note line and the optional F-259 clause reverse the probe's finding about juxtaposition's device. Correct both before `record.py apply`.
- F-245's three failures stand only if the newer probe enters the record now.
