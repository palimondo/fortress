<!-- Chunk f8 of the FACTS clarity assessment: F-231, F-232, F-233, F-235, F-236, F-237, F-240, F-242, F-243, F-244, F-245 and F-246, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `8c99c2413`. -->

# FACTS chunk f8: assessment

The base is `main` at `8c99c2413`. The last landed gate is climb batch 20's. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports, the tests, the library, the code and the gap ledger. I ran no experiment and searched no transcript.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-231 | pass | pass | pass | **fail** | **fail** | pass | **reorganize** |
| F-232 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-233 | pass | pass | pass | pass | pass | pass | keep |
| F-235 | pass | pass | pass | pass | pass | pass | keep |
| F-236 | pass | pass | pass | pass | pass | pass | keep |
| F-237 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-240 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-242 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-243 | pass | **fail** | pass | **fail** | pass | pass | **reword** |
| F-244 | pass | pass | pass | **fail** | pass | **fail** | **reword** |
| F-245 | pass | **fail** | pass | **fail** | **fail** | pass | **reorganize** |
| F-246 | pass | **fail** | pass | **fail** | **fail** | **fail** | **reorganize** |

Counts: keep 3, reword 6, reorganize 3, investigate 0. Every fail below has a known resolution in the cited sources, so no entry needs a question settled first.

## F-231, the generated AST walker split into eight methods

- **Scope: pass.** The title says that the walker is split and that as one method it ran interpreted. The body names the method, its size, the limit and the split. It bounds the old times to their runs ("on an idle machine").
- **Present meaning: pass.** The split is in the tree: `ScalaAstGenerator.java:634-657` writes `walk` as a call of `walkCases0`, and `FortressAst.scala` holds eight `walkCases` methods. The times are stated as a past measurement, and the entry gives F-240 for the stages' times now.
- **Evidence: pass.** `perf-probes/checker-speed-2/REPORT.md` section 1 gives the 31,704 bytes, the 8,000-byte limit and the eight methods. Section 6 gives 911 s against 352 s (F0, F1) and 339 s (I7), and 2,375 s against 931 s (D1, D2). The "about 95 %" is at `:391` of that report. `rung-solver-speed/REPORT.md` section 5 gives the profile: the reduction memo's JFR run took 110 s against the base's 368 s, with `pExc` 65.5 % and `dExc` 62.7 %; "I took no JFR of the final code as built". `WalkerJUTest` exists (`scala_src/nodes/WalkerJUTest.java`).
- **Comprehension: fail.** Quoted: "With the reduction memo alone the count stage's profile held the exclusion questions (`pExc`, `dExc`) at about 62 to 65 % of a run a third as long, and the final code has no profile." The reader cannot tell what "a run a third as long" is measured against (the base's 368 s JFR run), or what the sentence means for the work. "the count stage with row 680's repair" is a bare row pointer. It needs a few words on its subject: the local-function crash that stopped the count stage.
- **Ownership: fail.** The profile sentence is about how the solver's memos were built, which is F-235's subject. It is detail of the work, and `rung-solver-speed/REPORT.md` section 5 already holds it. The same quoted passage.
- **Consistency: pass.** F-235 (the memos), F-236 (`WalkerJUTest` still guards `Walker`) and F-240 (the stages' times now) agree with it.
- **Disposition: reorganize.** Move the profile sentence out. The report holds it. Keep the split, the cause, the bounded before-and-after times, the 95 % pointer to F-235, the pointer to F-240 and the test. Give row 680 its subject in a few words.

## F-232, the syntax tree's hashes and the JVM's identity hashes

- **Scope: fail.** The title is broader than the body. Quoted title: "The syntax tree's hashes do not depend on the JVM's identity hashes." The body limits it: "Two kinds of node still hash by identity, and so does every node that holds one: the inference variables ... and walk's `_WrappedFValue`". Inference-variable types are nodes of the syntax tree, so the title is false for them and for every node that holds one.
- **Present meaning: pass.** It states the current hashing and what still hashes by identity.
- **Evidence: pass.** The root `build.xml:679-697` holds the two rewrites: `getClass().getName().hashCode()` and `NodeHash.of` for an `Option` field. `ProjectFortress/build.xml` is a deprecated stub, so the bare `build.xml` is the root one. `NodeHash.java` exists. `NodeFactory.java:1166-1184` makes each inference variable with `new Object()` as its id. `_WrappedFValue.java:170-177` hashes its `FValue`. `rung-ast-hashes/REPORT.md` section 4.4 shows that no output of the count stage moves through an inference variable's hash (E0 = H0, E1 keeps `:130`). `NodeHashJUTest`, `OmittedReturnTypeFromApi` and `OmittedMethodReturnTypeFromApi` exist, and `NodeHashJUTest` passed at batch 20's gate.
- **Comprehension: pass.** "neither kind below" points forward, but the next sentence names the two kinds.
- **Ownership: pass.** One subject, the hashes. The sentence about `DeclaredFunction`s is a pointer to F-254, which owns that repair.
- **Consistency: pass.** F-254 says that no output of the count or distance stage is known to move with the identity-hash order. That agrees with this entry.
- **Disposition: reword.** Limit the title to the exceptions, for example: "The syntax tree's hashes do not depend on the JVM's identity hashes, except at inference variables, walk's wrapped values and the nodes that hold them."

## F-233, a block's local functions checked with their group in scope

- **Scope: pass.** "The compiled checker", with no written return type, a sibling call and self-recursion: these are the conditions that the three tests take.
- **Present meaning: pass.** It states what the checker does now.
- **Evidence: pass.** The `SLetFn` case primes the group's thunks with `makeTryChecker(newChecker)` (`impls/Decls.scala:418`). `LocalFunctionSiblingCall` and `LocalFunctionSiblingInLoop` are `typecheck` tests that pass. `XXXLocalFunctionRecursiveUntypedReturn.test` keys on `reference cycle`. `Array3`'s `asString` has the local `plane` calling the local `row` (`Library/FortressLibrary.fss:3058-3070`). Row 680 is FIXED. Note: the cited section 6 of `rung-checker-bounds/REPORT.md` holds the measurement with the line held. The landing is in `climb-batch-15b/RECORD.md`, "What landed". The route still finds the detail.
- **Comprehension: pass.** "Group" means the local functions that one block declares together, as the example shows.
- **Ownership: pass.** One subject.
- **Consistency: pass.** F-53 and F-54 cite this repair for "nothing stops" the count, and agree with it. Row 304 (the code generator cannot compile a local function) is about another path, and the entry names the checker.
- **Disposition: keep.**

## F-235, the solver's three memos

- **Scope: pass.** "The compiled checker". The keys, the switches and the measurement are each stated with their conditions, and the measurement is bounded to "one session".
- **Present meaning: pass.** The memos and their switches are in the code now.
- **Evidence: pass.** The switches are `fortress.analyzer.reduce.cache` (`TypeAnalyzer.scala:603`), `fortress.analyzer.exclusion.cache` (`:421`) and `fortress.analyzer.typecons.cache` (`TraitTable.scala:37`). The shared exclusions are at `TraitTable.scala:153-156`. The three memo tests exist under `scala_src/`. `rung-solver-speed/REPORT.md` sections 6 and 7 give 437 s to 97 s and 0 differences in the audits. Note: two cited line ranges have drifted since the conditional-extension and where-check rungs edited `TypeAnalyzer.scala`. The reduction memo is now at `:598-618`, not `:589-609`. `renamedApart` is now at `:1089`, and `:985-1015` holds `comprisedTypes` and `withClauseParams`. The method and property names in the entry still find the code. I mark this as a note, not a fail, as chunks f10, f13 and f14 did.
- **Comprehension: pass.** The terms ("analyzer", "inference variables", "opened a size") are the checker's own. The entry says what each memo is keyed by.
- **Ownership: pass.** One subject, the memos and their rule for keys. The time is a bounded measurement, not a copy of F-240's count.
- **Consistency: pass.** F-231 and F-240 agree with it. F-240 gives the gate's times, and this entry gives one session's pair.
- **Disposition: keep.**

## F-236, the methods past HotSpot's limit

- **Scope: pass.** "Of the build", the 8,000-byte limit, and twelve listed methods. These are what the test reads.
- **Present meaning: pass.** `MethodSizeJUTest` passed at batch 20's gate (`climb-batch-20/gate/summary.txt`, `fast-misc/MethodSizeJUTest 2 0 0 0`), so the twelve are the current set.
- **Evidence: pass.** `ProjectFortress/src/com/sun/fortress/tests/unit_tests/MethodSizeJUTest.java` reads every class with `java.lang.classfile`. It fails on an unlisted method past the limit (`testNoUnlistedMethodOverTheLimit`), and on a listed one that is gone or back under the limit (`testEveryListedMethodStillOverTheLimit`). Its list has the twelve named methods, each with its size and what runs it. `rung-solver-speed/REPORT.md` section 8 holds the scan.
- **Comprehension: pass.** "Misc-track" is the `fast-misc` suite of `testFast`, which the gate summary names.
- **Ownership: pass.** One subject.
- **Consistency: pass.** F-231 agrees with it.
- **Disposition: keep.**

## F-237, where the well-formedness walk reports an ill-formed type

- **Scope: fail.** The body says that a second call always gets its own error, and that is wider than the support. Quoted: "An error on such a type is reported at the innermost expression the walk met it in, once for each call that made the type: ... and a second call with the same printed static argument gets its own error." Gap-ledger row 776 (NEGATIVE-VERIFIED, found by climb batch 18's rung K, after the entry was written) is an exception. For two nested calls of one callee at static arguments that print alike, `next[\T\](next[\T\](x))`, only the inner call is reported. Both calls' types share one key, and the inner span lies within the outer (`TypeWellFormedChecker.scala:50-56`; `compiler_tests/XXXStaticArgBoundNestedCall.test`). The entry does not name this exception.
- **Present meaning: pass.** It states the rule now. "In the library, by reading, no error is added or dropped" compares the rule with reporting at the declaration. The sentence is readable without the batch.
- **Evidence: pass.** `TypeWellFormedChecker.scala:37-114` holds `check`, `error`, `outside` and `within`, which place the error as the entry says. The five cited tests exist, and their `.test` files key on the call's line and the count of errors (for example `XXXStaticArgBoundAtEachCall.test`: `:14:22-` and "has 2 errors"). Batch 20's `distance.txt` has `#kind wellformed 0`. Note: the second range, `:284-287`, has drifted and now holds the where-clause check of a trait type. The local variable's case is now at `:345-348` (`SLocalVarDecl`: `walk(rhs)` before `walk(body)`). The test `XXXStaticArgBoundAtCallNotAtUse` gates that sentence. I mark this as a note, as for F-235.
- **Comprehension: pass.** The title is long, but the body's second sentence explains it: a call's type keeps the spans of the callee's declared type.
- **Ownership: pass.** One subject.
- **Consistency: pass.** F-53 agrees with it. Row 776 is a ledger row, not an entry. It is the scope fail above.
- **Disposition: reword.** Add the exception beside "once for each call": nested calls of one callee at static arguments that print alike report only the inner call (row 776). Point the second source range to the `SLocalVarDecl` case by name.

## F-240, the stages' times at the last landed gate

- **Scope: pass.** The title names the gate (climb batch 20's), and the body says how each stage ran.
- **Present meaning: pass.** Batch 20 is the last landed batch.
- **Evidence: pass.** `climb-batch-20/gate/distance.txt` has `#seconds 161` at load 1.29. `reviews/batch-20-review.md` section 2 gives 63 s for the count stage run alone after the ladder, and 139 s for the idle run of the same library text. `reviews/batch-16-review.md` section 2 gives 325 s and 1,075 s at 15b's gate, and rung S's 574 s at load 4.6 to 5.3 against the gate's 217 s.
- **Comprehension: fail.** Quoted: "rung S's tree took 574 s for the distance stage at load 5." "Rung S" is a batch's label, and two batches have one: climb batch 16's solver-speed rung and climb batch 19's string-conversion rung. The entry does not say which is meant. It also does not give the time that 574 s is compared with: the gate's 217 s on nearly the same code. So "more than twofold" has no base in the entry.
- **Ownership: pass.** This entry owns the current stage times. F-231 and F-235 point to it.
- **Consistency: pass.** F-231 and F-235 agree with it.
- **Disposition: reword.** Name the example in words: climb batch 16's merged code took 217 s at its gate, and nearly the same code took 574 s at load 5. Or drop the rung's label and keep the factor with its source.

## F-242, the fusion pairs of `SUM` with `MAX` and `MIN`

- **Scope: pass.** The title states the current distance property and its two causes. The body limits the result to the return-type rule (F-75).
- **Present meaning: pass.** The library holds both parts. The overloads carry `where { T extends StandardMax[\T\] }` and `where { T extends StandardMin[\T\] }` (`Library/FortressLibrary.fss:3435-3438`). `ActualReduction`'s `distribute[\K\]` answers `PossibleReductionPair[\K\]` (`:3250`). Batch 20's distance has no well-formedness or return-type error.
- **Evidence: pass.** `perf-probes/where-clauses/REPORT.md` A.1 traces the six errors: four unmet bounds and two return types that no bound fixes. `perf-probes/generic-distribute/REPORT.md` section 3 shows the forms: over `R` the refusal moves, and over `K` it is accepted. Section 4 shows L1 and L2 (the team's text) against L4 (`#total 42`, row 433's 6 gone, nothing new). Row 433 is FIXED. F-250 gives the landing's test.
- **Comprehension: fail.** Three passages need the probe to be understood:
  - "the team's generic `distribute` over its own `K` their two results". "Their two results" stands for the two return-type errors. "Over its own `K`" means the revival's form, which answers a pair over `K`. The team's commented text answers one over `R`, as the body says later.
  - "The two results are `distribute` overloads that answer a pair over `Maybe[\T\]` beside the inherited one". The errors are not overloads: they are at the two overloads.
  - "the team's literal `PossibleReductionPair[\R\]` only moves the two". "Literal" means the team's text as written, and "moves" means that the two errors move to the generic.
- **Ownership: pass.** One subject, the six sites of row 433 and how each is cleared. The fusion's decision is P-151's.
- **Consistency: pass.** F-75, F-243, F-250 (row 433's 6 among the 9 gone) and P-151 (four of six by the condition, two by the generic) agree with it.
- **Disposition: reword.** Say "the two return-type errors" and "the generic `distribute` with its result over its own `K`, not the team's `R`". Say what the team's text as written does: the two errors move to the generic.

## F-243, the thirteen `where`-clause sites

- **Scope: pass.** The body accounts for all thirteen sites and for the probe's alternative, each with its source.
- **Present meaning: fail.** Quoted: "Of the distance's 13 `where`-clause sites, all are cleared". The sites are not in the distance now: batch 20's distance is 5, with no such site. They were thirteen of the distance's 49 errors, the distance at the gates of climb batches 15b and 16 (`where-clauses/REPORT.md` A.1), and the reader must know that from the batch. The title should say which distance.
- **Evidence: pass.** `where-clauses/REPORT.md` A.0 and A.1 list the 13: row 433's 6, row 636's 4, row 436's 2 and row 634's list half 1. A.0 holds the library-only alternative (49 to 37, the twelve sites). F-242, F-251 and F-255 hold the landed clearings with their tests. Rows 433, 436 (the checker's half), 634 and 636 are closed or cleared as stated.
- **Comprehension: fail.** "`where`-clause sites" is not defined. They are the sites that the where-clauses probe traced to forms of `where` clause that were not built. Also, the last sentence names two of the three library edits. Quoted: "Library edits with no new language also clear 12, by the probe: the fusion pairs dropped and `AnyList`'s bodies moved into `List`." The probe's twelve also need the `cast` at the identities' fallback (A.0: 6 + 4 + 2).
- **Ownership: pass.** It is a conclusion over F-242, F-251 and F-255, with pointers, which record.md allows. Its counts are fixed, not ones that each landing changes.
- **Consistency: pass.** F-242, F-251 (row 636's four), F-255 (`FortressLibrary.fss:2063` gone) and P-151 agree with it.
- **Disposition: reword.** Bound the thirteen to their distance ("the thirteen of the distance's 49 errors, at the gates of climb batches 15b and 16, that the where-clauses probe traced to unbuilt `where` forms"). Name the `cast` among the probe's library-only edits.

## F-244, the narrow `where` forms against the probe's tests

- **Scope: pass.** "Where tested" limits the claim, and each sentence points to the entry that holds its test.
- **Present meaning: pass.** It states the current state of the built forms and the hole that is open.
- **Evidence: pass.** `where-clauses/REPORT.md` B.6 names the probe's two holes: the enclosing-parameter constraint at a dotted call (row 748, now FIXED, F-256) and the member callable where the condition fails (row 773, NEGATIVE-VERIFIED). B.6 also has the curator's question: "as Swift, Rust and Haskell do". Rows 751, 752 (NEGATIVE-VERIFIED) and 775 (NEGATIVE-BOUNDED) are open.
- **Comprehension: fail.** Three referents need the probe or the history:
  - "The peers check the constraint at calls and scope the member to the condition." "The peers" are Swift, Rust and Haskell (B.6). The entry does not say so.
  - "one of the probe's two holes stands". The entry does not name the two holes, or say which one is closed (the dotted call, F-256) and which one stands (row 773).
  - "The narrow `where` forms" is P-151's set, with no pointer.
- **Ownership: pass.** It is a conclusion over F-251, F-255 and F-256, with pointers.
- **Consistency: fail.** The entry gives a closed list that other entries on the same subject extend. Quoted: "The built forms' other open departures in the checker are rows 751, 752 and 775." F-250 says that one hole of the folded bound remains: "a static argument written at a top-level call is not checked against a folded bound ... (row 470)". F-256 adds the constraints it does not read: "a constraint whose bound names the method's own static parameters or a `where`-clause variable, at a dotted call or at a type's use". The entry does not state the different scope that would make these agree.
- **Disposition: reword.** Name the peers. Name the two holes and the state of each. Point "narrow forms" to P-151. Either add row 470 and F-256's unread constraints to the open departures, or say that the list holds only the rows of the `comprises` opening.

## F-245, the symbolic operators in the overloading check, measured at `d212b2c1f`

- **Scope: pass.** The title bounds the count to its commit, and the body says that the check was turned on in a shadow ("the checker's three loops admitting every operator").
- **Present meaning: fail.** The last sentence speaks of a recount still to come, and that recount has been made. Quoted: "By reading, the batches since have moved some families, `FlatString`'s api pair (F-259) and the integer powers (F-263) among them; P-155's probe counts them again on the landed tree (`perf-probes/symbolic-operators-2/`)." The probe has reported (`3099fb2eb`, 2026-10-20 14:27 UTC, after this sentence was written in `bd33a2f8b` at 13:03). It found 186 new errors at `d97001d19`, whose code is batch 20's gate. 54 clear by the known fixes as they stand today, and 132 by the two designs (`symbolic-operators-2/REPORT.md` section 0). `FlatString`'s pair went from 2 to 0, and `^` from 21 to 1 (section 1.2). So "151 need a design choice" and the family list are no longer the state of the tree, and the entry does not say where the current count is.
- **Evidence: pass.** `symbolic-operators/SORT.md` "Step 1: the reproduction" gives 253 = 49 − 1 + 205 and the five new `^` errors from rung K's `c23b85fdc`. "Step 4: totals" gives 54 known fixes and 151 design choices. `symbolic-operators/REPORT.md` sections 1.2 to 1.5 give the earlier 200, the export check's 2, and walk's one refusal.
- **Comprehension: fail.** Quoted: "the run went from 49 to 249 at `d19ade2fb`, and from 49 to 253 at `d212b2c1f` (one identity-hash error gone, row 737), one measurement each: 205 errors". The reader cannot get 205 from 49 and 253 without SORT.md's sum (49 − 1 + 205). "(5 of them `Integral`'s `^` return type, read since climb batch 16's rung K)" is a batch handle.
- **Ownership: fail.** The two measurements' history and the per-family breakdown at an old commit hide the current point: how many errors the check adds now, and how many need a design. The family list is detail of `SORT.md`. The same quoted passages.
- **Consistency: pass.** F-259 and F-263 agree that those families moved, and P-155 agrees with the entry. The newer measurement is in a report that no entry holds yet. That is the present-meaning fail above.
- **Disposition: reorganize.** Keep one bounded measurement and point to the newest: at `d97001d19`, 186 new errors beside the gate's 5, with 54 cleared by the known fixes and 132 by the two designs of PLAN, "Pavol's answers", item 59 (`symbolic-operators-2/REPORT.md` section 0). Also keep walk's single refusal (`EmptyString`'s `||`). Move the `d19ade2fb` and `d212b2c1f` sums and the family list to the history and to `SORT.md`. The coordinator decides whether the probe's findings enter the record now (its record pass waits on the curator's questions, BOOT.md:49). If they do not, the entry still bounds 205 to `d212b2c1f` and says that a recount exists.

## F-246, the three `String` sites cleared by the library's conversion

- **Scope: pass.** It names the three sites and the edits that clear them.
- **Present meaning: fail.** The entry gives a landed change as a recipe, with a distance from another tree. Quoted title: "The distance's three `String` sites clear by the library's own conversion and two lines of `FlatString`'s api, with `String`'s operators where they are." Quoted body: "give 49 to 46, nothing new". The change landed in climb batch 19 (F-259), and the sites are gone. 49 to 46 is the symbolic-operators probe's measurement on a tree whose distance was 49, that of the gates of climb batches 15b and 16 (`symbolic-operators/REPORT.md` section 2.3, way JC). The entry does not bound it to that tree.
- **Evidence: pass.** `symbolic-operators/REPORT.md` section 0 and 2.3 give `DISTANCE DOWN 49 -> 46 (-3)` and the conversion `("" || a)` with `cast[\Object\]`. Section 2.5 shows `extendAny` raising `CastError` under the conversion. Row 743 is FIXED, and F-259 has the tests.
- **Comprehension: fail.** Quoted: "juxtaposition's device alone only moves the two `asString` sites". "Juxtaposition's device" is the probe's name for moving `String`'s four operators to the top level, as juxtaposition is. The entry does not define it.
- **Ownership: fail.** F-259 owns the landed conversion, the `FlatString` api line and `extendAny`'s result. This entry restates them. What only it holds is the alternative that was weighed (the device) and the history (the conversion alone broke `extendAny` until row 743 was repaired). Both are detail of the probe and of the history.
- **Consistency: fail.** Two entries give different distances for the same three sites, and neither says why. This entry says "give 49 to 46". F-259 says "the distance's three `String` sites are gone: 34 to 31". The two numbers are from different trees (one at distance 49, the other at climb batch 19's rung, at 34), and this entry does not say so. The conflict is resolved by its source, so this is not a question to investigate.
- **Disposition: reorganize.** Merge into F-259. If the alternative must stay, add one bounded clause to F-259: moving `String`'s operators to the top level was weighed and clears only the two `asString` sites (`symbolic-operators/REPORT.md` section 3). Move the rest to the history. Repoint incoming pointers to F-259: `facts-extract.sh 'F-246+'` shows none, but grep the record for the number before removing it.
