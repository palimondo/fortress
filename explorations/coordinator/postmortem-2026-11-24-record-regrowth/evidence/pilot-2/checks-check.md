<!-- The checker's report on the consolidation pilot's two rounds (2026-11-24): each rewritten, merged or split entry compared with its old text, and each claim that a writer's report lists as moved looked up where the report says it went; by brief-pilot-checks.md, role "checker". -->

# The pilot's checks: the checker

By `../sorting-map/brief-pilot-checks.md`, role "checker", and the clarity workflow's `record-clarity/check.md`. Old texts: FACTS on `main` (`6da147aa08`) and the history blocks that the two work trees add. New texts: `/home/user/rec-pilot-1` and `/home/user/rec-pilot-2`. Each new text quoted in `round-1.md` and `round-2.md` matches the work tree's line byte for byte (all 19 of round 1; the 23 kept entries of round 2), and the 7 merged entries are gone from round 2's tree. Each history block keeps the old line whole.

`check.md`'s step 2, comprehension, needs a cold reader's answers. None was in hand when I checked, so this report holds fidelity and the moved claims only.

## The table

| Round | Entry | Disposition | Result |
|---|---|---|---|
| 1 | F-374 | split, atomic expression to F-351 | pass |
| 1 | F-351 | takes F-374's claims 7, 8 | pass |
| 1 | F-279 | defect to row 808 | pass |
| 1 | F-157 | measurements to rows 298, 299 | **fail** |
| 1 | F-63 | sorted to F-286, F-64, history | pass |
| 1 | F-286 | takes F-297's claim 2, F-63's claim 1 | pass |
| 1 | F-297 | detail to report | pass |
| 1 | F-64 | claims to row 354, F-171 | **fail** |
| 1 | F-171 | takes F-64's claim 4 | pass |
| 1 | F-240 | log to history | pass |
| 1 | F-111 | stale claim reworded | pass |
| 1 | F-43 | false claims reworded | pass |
| 1 | F-179 | nearly as it was | pass |
| 1 | F-102 | takes F-108's claim 4 | **fail** |
| 1 | F-103 | takes F-383's claim 3 | pass |
| 1 | F-104 | streams to F-98 | pass |
| 1 | F-383 | claim 3 to F-103 | pass |
| 1 | F-108 | claim 4 to F-102 | pass |
| 1 | F-98 | takes F-104's claim 1 | pass |
| 2 | F-28 | rewritten | pass |
| 2 | F-51 | merged into F-73 | pass |
| 2 | F-55 | merged into F-73 | pass |
| 2 | F-56 | merged into F-87 | pass |
| 2 | F-59 | rewritten, takes from F-144, F-131 | **fail** |
| 2 | F-60 | as it is | pass |
| 2 | F-73 | owner, F-51 and F-55 in | pass |
| 2 | F-78 | rewritten, takes from F-55, F-84 | pass |
| 2 | F-85 | rewritten | pass |
| 2 | F-87 | owner, F-56 in | pass |
| 2 | F-220 | merged into F-285 | pass |
| 2 | F-221 | rewritten | pass |
| 2 | F-242 | F-243 and F-248 in | pass |
| 2 | F-243 | merged into F-242 | pass |
| 2 | F-248 | merged into F-242 | pass |
| 2 | F-285 | split, F-220 in | pass |
| 2 | F-344 | split | pass |
| 2 | F-364 | split | pass |
| 2 | F-365 | split | pass |
| 2 | F-114 | split | pass |
| 2 | F-137 | rewritten, takes from F-341 | pass |
| 2 | F-141 | owner, F-143 in | **fail** |
| 2 | F-143 | merged into F-141, reductions to F-228 | **fail** |
| 2 | F-228 | owner, takes from F-141, F-143, F-285 | pass |
| 2 | F-144 | split | **fail** |
| 2 | F-367 | rewritten | pass |
| 2 | F-173 | takes from F-266 | pass |
| 2 | F-271 | as it is | pass |
| 2 | F-273 | split, walk's half to F-141 | pass |
| 2 | F-300 | claims to `Papers/Variance/README.md` | pass |

Round 1: 19 checked, 16 pass, 3 fail. Round 2: 30 checked, 26 pass, 4 fail. In all, 49 checked, 42 pass, 7 fail.

## The failures

### Round 2, F-59: the pointer sentence misstates the checker's rule (wording)

New: "A reduction that writes no static argument is instantiated by the compiled checker from its expected type or its body (F-364, F-221)".

What fails: the sentence is broader than its two targets. F-364: the checker "first checks the call as written, where the big operator typed alone has an instance (a plain bound, or no static parameter)", and writes the expected type or the body's type only if that is not accepted. F-221: a plain-bounded big operator takes the reduction's expected type only through the retry. The old F-59 said this ("A plain-bounded big operator takes its bound, or the reduction's expected type where the bound does not fit"). The new sentence lets a reader conclude that a plain-bounded `BIG OR` is instantiated at its expected type or body, which it is not.

Smallest fix: "A reduction that writes no static argument is instantiated by the compiled checker as F-364 and F-221 give, and by walk from a declared type or its elements' join (F-228)."

### Round 2, F-144: a claim sent to a report that does not hold it, and the title's test dropped

New: "Detail: ... `compile-ladder/rung-walk-elements/REPORT.md` section 7, which lists the operators that ran once and those not measured."

What fails: (a) The old claim 7 says "`PrefixSet`'s `BIG UNION` and `PureList`'s `BIG CONCAT` were not measured". Section 7 of `rung-walk-elements/REPORT.md` holds only `ESqCupCap`, the run of `BIG SQCUP` and `BIG SQCAP`. Neither `PrefixSet` nor "not measured" appears in that section. `rung-reduction-types/REPORT.md:182-183`, `:211` lists both operators stopping before that rung, which is the earlier state. So the claim that they are still unmeasured now stands only in the history, while the entry says that section 7 lists it. (b) The new title states "walk refuses at load a reduction whose `simpleJoin` is declared at `Any`", but "Gated by `tests/Unwritten*Walk`" does not match its test, `tests/ReductionSimpleJoinAtAnyWalk` (`.fss` and `.test` exist), and no report names that test (`round-2.md`, "Test names"). The title's claim has lost its gate.

Smallest fix: "Gated by `tests/Unwritten*Walk` and, for the refusal, `tests/ReductionSimpleJoinAtAnyWalk`", and either keep "`PrefixSet`'s `BIG UNION` and `PureList`'s `BIG CONCAT` were not measured" in F-144, or end the detail at "section 7 (the operators that ran)".

### Round 2, F-143 (merged): two claims that do not stand where the report sends them

(a) Claim 6: "ends in `CastError` at its unwrap's cast, `cast[\CovariantCollection[\T\]\](cc)` (`Library/List.fss:179`)". `round-2.md` sends `List.fss:179` "to row 825, which names another cast". Row 825 names `upward`'s cast at `Library/CovariantCollection.fss:17`, and nothing at `List.fss:179`. `List.fss:179` does hold `cast[\CovariantCollection[\T\]\](cc)` today. So the report sends a claim to a row that contradicts it. The writer lists the conflict under "Claims to investigate", but the move cannot stand as written.

(b) Claim 3: "an empty `SUM` or `PROD` that no declared type directs, which takes `ZZ32`'s identity whatever its body's type (row 716)". F-228 now says "so an empty `SUM` takes `ZZ32`'s zero (row 716)". Row 716 names `SUM` and `additiveIdentity` only. The `PROD` half (`multiplicativeIdentity`, `ZZ32`'s one) now stands in neither.

Smallest fix: (a) keep "(`Library/List.fss:179`, the cast that the scout found; row 825 names `upward`'s)" in F-141's row-825 clause until the conflict is settled, or settle it by a run before the merge lands. (b) In F-228: "so an empty `SUM` or `PROD` takes `ZZ32`'s identity whatever its body's type (row 716)", if a run confirms `PROD`. If not, add it to the row's notes.

### Round 2, F-141: the curator's open decision on row 589 is left with no home

New: "a generic passed over at dispatch when its arguments have several minimal common supertypes, whose repair changes which declaration runs (row 589)."

What fails: the old claim 14, that row 589's repair is "the curator's to decide", is cut "as a status", and the report says that row 589's notes hold it. They do not: they say "F-141 holds the repair for the curator", a pointer back to the entry that no longer says it. Until the proposed rewording of row 589 lands, no text outside the history says that this decision waits on the curator. A second point in the same entry is unsettled, not failed: "Five of the specification's extracted examples ... pass only because walk leaves the parameter open" (from F-114). The writer notes that this may be stale since F-228's join rule.

Smallest fix: land row 589's proposed notes ("so it waits for the curator's decision (F-141)") with the merge. Otherwise keep "whose repair, which changes which declaration runs, is the curator's to decide (row 589)".

### Round 1, F-64: a claim sent to row 354 that the row holds only by implication

Old: "The refusal runs only when the checker checks an api, so a component's types may extend such a trait."

What fails: `round-1.md` and the history block say that row 354 "holds both". Row 354 says that the refusal "is a test of `isApi` and the ellipsis alone" and gives "Workaround: declare the extender in the component". A reader can infer the claim from these, but the row does not state it.

Smallest fix: in row 354's notes, after "the ellipsis alone": "so a component's own types may extend such a trait".

### Round 1, F-102: a decision stated as a fact, wider than its source

New: "Without a `.test` file the harness reads only that the program fails, not its message, and no gate stage compares what a test prints with an earlier run."

What fails: the old F-108 said "no gate stage compares the message (P-103)". The second half is now wider ("what a test prints"), and it no longer cites P-103. P-103 is the rule that makes it true ("neither is a comparison of what a test prints beyond its checks with an earlier run's output" proposed again). Without the pointer, the sentence reads as a property of the harness. This is the reverse of `check.md`'s "a default presented as the curator's decision". The first half is supported by the code.

Smallest fix: "... and, by P-103, no gate stage compares what a test prints with an earlier run." Or cut the second half, since P-103 owns it.

### Round 1, F-157: a range that drops the sizes it was measured at

New: "its product through a diagonal held as a plain `Matrix` view 13 to 63 times a row-scaling operator (row 299, whose 54 the probe's timings correct)".

What fails: the old text tied each ratio to its size: 13 times at n = 16, and 58 to 63 times at n = 64. "13 to 63 times" drops that condition, so it reads as a spread at one size. Row 299 still says 13-54×, so no target holds the corrected pair with its sizes until the proposed row text lands. The probe's "Timings against row 299" table does hold 13x at n = 16, and 63x and 58x at n = 64.

Smallest fix: "13 times a row-scaling operator at n = 16 and 58 to 63 times at n = 64 (row 299, whose 54 the probe's timings correct)".

## Checked and found to hold (selected)

- Rows that took claims hold them: 112 (`V(1) === V(1)`, `SEQV`, `Lazy`), 641, 322, 1043, 984, 808 (claim 4 word for word), 298, 354 (claim 2), 357, 355, 430, 607, 841, 842 in round 1; 510 (F-55's claim 4 whole), 506 (the numeral's one choice), 436, 663 (the `pick` example), 665 ("skips generic objects"), 21 (FIXED, nested reductions run), 744, 538 and 442 (their reproducers), 718 (its test) in round 2.
- The code: the memo key at `OverloadingChecker.scala:580-581` holds the four inputs F-43 names, and the memo is on by default (`:79`). Both stages pass `overload.cache=false`. The count stage runs `WorldFlip -stop check` (F-111). `generalTestFailed` builds `pfx + which + "_WIcontains"` (F-98's generalisation). `interpreter/evaluator/tasks/` and `transactions/` exist (F-179). Row 302 is the eager debug message. The `distribute` overloads carry `where { T extends StandardMax[\T\] }` and `StandardMin` (`FortressLibrary.fss:3704`, `:3706`; F-242). `SpecData/examples` holds 71 + 43 + 16 = 130 run examples and 5 in `library/` (F-114's 135).
- The reports: `rung-inference-checker` section 3.2 holds F-73's claim 2. `rung-static-argument-inferred` names the two guards in sections 2 and 6, the runs in section 5, and `instantiatedReference`, `retypable`, `carriesOwnStaticParams` and `CoercionOracle.scala:292-293` in "Step 2". `measure-D.md` 1.2 holds F-56's claim 2. `where-clauses` A.4 holds the twelve. `rung-abstract-declared` holds the 2009 comparison (`:7`) and the 85 (`:89`). `Papers/Variance/README.md` holds each of F-300's claims. Every test that left an entry is named in the report or row given, except the four that `round-2.md` lists and `ExportAbstractGetterField`, which round 1 lists.

## Cross-cutting

- The ledger's back-pointers to merged entries dangle until `round-2.md`'s row proposals land: row 510 "(F-55)", rows 663 and 716 "(F-143)", row 663 "(F-144)" for `simpleJoin`, row 825 "(F-59)", and row 589's "F-141 holds the repair". Each round's merge should land with its row edits in the same commit.
- F-351's `compiler_tests/*Atomic*Compiled` and F-367's `tests/GenericFunction*Walk.fss` match more tests than the entries named (F-367's matches `GenericFunctionalMethodWalk`). Each pattern gates a wider set, and no claim is lost.
