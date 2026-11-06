# c33 assessment (c-run3, base c124c6b65, gate a12ab5c60 holds)

Marks, in order: scope, present meaning, evidence, comprehension, ownership, consistency. Read beyond the evidence files: REPORT.md 5.5 and 6.1; `Evaluator.java:920-1005` (`forAmbiguousMultifixOpExpr`, `forOpExpr`); `DesugarerVisitor.java:620-636`; `TraitObject.rats:190-200`; `OverloadedFunction.java:540-605`; `Constructor.java:378-392`; `Library/FortressLibrary.fsi` at `Rank1`/`Rank2` (:1245-1248), `AnyVector`, `AnyMatrix`, `Array`, `StandardMutableArrayType` (:1553), `Array2` (:1715), `Matrix` (:1757); `Library/FortressLibrary.fss:2095-2110`; `explorations/apl/base/AplCore.fss:1155-1180`, `:1715-1745`; `explorations/apl/rung-3/t03_and.fss` and `REPORT.md` "How to run"; `ProjectFortress/tests/XXXDottedMethodMeetInheritedWalk.{fss,test}`; climb-batch-16 `RECORD.md` (row 444's refused note: its site, already in the row); rows 98, 159, 214, 292, 342, 416, 740 by `facts-extract`; F-44, F-167, P-25, P-43, P-97; the deleted probes from git history (`g10.fss`, `G158.fss`, `a01_any_result.fss`, `v18_postfix_pair.fss`, `Sk2InheritedPlain.fss`, `Sk2Inherited.fss`, `x03_lib.fss`); `git log` for multifix. No tracked file changed; no build, test or program run.

## 29: rewrite
- scope pass; present meaning pass (no commit touches walk's multifix; `Evaluator.java:994` still applies more than two operands pairwise); evidence pass (the probe's old path in the notes); comprehension FAIL: no pinned mechanism; ownership pass; consistency FAIL: "(climb batch 13 rung V's skeptic, on a1a75716a and rung V's head)" is a batch story.
- New line: pins `Evaluator.java:994`, keeps both measured facts, keeps `a1a75716a` as the commit the juxtaposition fact was true at, drops the batch/skeptic attribution (home: the history's old line).

## 30: measure
- scope pass; present meaning DOUBT: the row's `6.0` came from a library `+` that the flat number tower (P-43, `Number` without catch-all operators) may have removed, and the probe's `W extends Number` meets walk's newer load checks; evidence FAIL: probe gone, last run before e879b6a44; comprehension FAIL: no pinned mechanism; ownership pass; consistency pass (rows 31, 132, 215 agree).
- Question in questions.md.

## 97: rewrite
- scope FAIL: the claim's first pair, `Array[\RR64,ZZ32\]` beside `Array[\RR64,(ZZ32,ZZ32)\]`, excludes by instantiation exclusion (F-44, P-97: two instantiations of one generic trait exclude), so its refusal is walk's gap, row 416, not the specification's design limit; present meaning pass for the other two pairs (`AnyVector`, `AnyMatrix` are bare unrelated traits at `FortressLibrary.fsi:1643`, `:1755`); evidence: the reproducer `r01_native.fss` reproduces only the Array pair (row 416's half); comprehension pass; ownership FAIL: "A later run can accept the program (row 98)" names a DUPLICATE row, whose row is 342; siblings name 159, FIXED; consistency FAIL against F-44.
- New line: the claim keeps the two non-generic pairs; reproducer `none` with the AnyVector probe's old path (`c10_anyvector_dispatch.fss`, parent of `ed6dafb52`); the message pinned at `OverloadedFunction.java:603`; the Array pair kept as a pointer to row 416 with `r01_native.fss`; 98 → 342; siblings 297, 416.
- Dropped: "The compiled checker accepts and dispatches `f(t: Tag[\ZZ32\])` beside `f(t: Tag[\String\])` … (`rung-exclusion-relax/REPORT.md`, "The three homes", item 5)": home row 416 (pairs.txt) and the history; sibling 159 (FIXED): history; the full message tail "and no excluding pair is present": the cited line holds it.
- pairs.txt: 97/416.

## 145: measure
- scope pass; present meaning pass by reading (`opr AND(a:Boolean, b:Boolean)` now `FortressLibrary.fsi:2649`, the thunk form `:2651`); evidence FAIL: the reproducer exits 255 as run (`AplCore` not on the default source path), and the row's run predates many dispatch changes; comprehension FAIL: the pin `:2607-2609` now points at a doc comment; ownership pass; consistency FAIL: "recorded because every … loop trips on it: APL's ⍋ guard … died" is story.
- Question in questions.md with the APL rung's own command; its rewrite is laid out there.

## 164: measure
- scope pass; present meaning DOUBT: walk's dispatch changed much since run-c3; evidence FAIL: reproducer `none`, probe in history only; comprehension FAIL: no pinned site; ownership pass; consistency pass (rows 131, 171).
- Question in questions.md.

## 240: measure
- scope pass; present meaning DOUBT: its neighbour 157 is FIXED and walk's overload code changed since; evidence FAIL: probe in history only; comprehension FAIL: no pinned site; ownership pass; consistency pass (row 258 relies on it).
- Question in questions.md; its outcome bears on row 258's last sentence.

## 297: measure
- scope pass; present meaning DOUBT: walk's load check for generic pairs was rewritten after the row (`6d187d069`, `14e91723f`, `c41c3d2b0`); the message still exists (`OverloadedFunction.java:585`); evidence FAIL: probes gone and they import a gone library (`FlatArrays2`); comprehension FAIL: the diagnosis "because `Array[\E,I\]` carries no `Rank`" omits that `Matrix` extends `Array[\T,(ZZ32,ZZ32)\]` (through `Array2`, `StandardMutableArrayType`, `FortressLibrary.fsi:1553-1554`, `:1715-1717`, `:1757-1758`), which excludes the rank-3 instantiation by instantiation exclusion (row 416); ownership: siblings name 159, FIXED; consistency: the pin `FortressLibrary.fsi:1212` moved (`Rank2` now `:1248`).
- Question in questions.md, with a self-contained program; pairs.txt: 297/416.

## 444: measure
- scope pass; present meaning DOUBT: the size-arm variant is generic, and walk's generic-pair check changed after the row (`6d187d069`, `14e91723f`, `c41c3d2b0`); evidence FAIL: reproducer `none`, probes in history only; comprehension: the site holds (`Constructor.java:383-388`, one `OverloadedMethod` per name), `OverloadedFunction.java:1761-1773` moved; ownership FAIL: "Diamond: `XXXDottedMethodMeetInheritedWalk` (batch 12 W's skeptic)" — that test is sibling traits with an abstract `g` beside a body, `extends { T2, T1 }`, row 735's shape, not this row's; sibling 544 FIXED; consistency FAIL: "batch 12 W's skeptic" is story. The refused note of `9879d4386` (its site) is already in the row.
- Question in questions.md; the rewrite after it drops the XXX sentence (its home: row 735, rewritten here).

## 735: rewrite
- scope pass; present meaning pass (`Constructor.java:182-183`, `putIfAbsent` `:846-859` unchanged since the pin); evidence FAIL: reproducer `none`, while `ProjectFortress/tests/XXXDottedMethodMeetInheritedWalk.fss` asserts its abstract-beside-body case (`load_exception_contains=Invalid overloading of g`) and stays an expected failure under the holding gate `a12ab5c60`; comprehension pass; ownership pass; consistency: the test was attributed to row 444.
- New line: reproducer that XXX test; notes say which case it is; the pin commit `423958063` and "since `8dd64e8fc`" dropped for room (the cited lines are unchanged since the pin; `8dd64e8fc` stays in the history's line).

## 11: rewrite
- scope pass; present meaning pass (the grammar's error production still logs the message); evidence pass (the probe's old path); comprehension FAIL: no pinned mechanism; ownership pass; consistency pass.
- New line: pins `TraitObject.rats:198`; the `p12_multifix.fss` path gets its "in the parent of `e879b6a44`".

## 265: rewrite
- scope pass; present meaning FAIL: the claim states the fixed site (`¨` over a tuple of three `aplCall1` calls; `aplEachT2`/`aplEachT3` now sequence their calls, `AplCore.fss:1827-1837`), not the open race; evidence FAIL: the reproducer `explorations/apl/base/AplCore.fss` is a library component and exits 1 (`Missing value: run`); the crash outputs are gone (deleted in `1ee3b0bc5`); comprehension FAIL: no pinned mechanism; ownership pass; consistency FAIL: "Fixed half: … Open: …" is a repair story.
- New line: the claim states the open race (two `aplCall` calls in one parallel group share the one stack); reproducer `none` with the crash outputs' old paths; mechanism pinned at `AplCore.fss:1158-1163` (`push` outside `atomic`) and `:1172-1177`.
- Dropped: the after-fix outputs `checks/model_run_threads4.out` and `threads4.txt`, and the check's message `Index -1 out of bounds for length 1024`, for room (history); `threads4_crash.txt` is now written with its full path.

## 258: rewrite (CONTESTED; presentation only)
- scope pass; present meaning pass (`aplTup` still declares `Object` and returns tuples, `AplCore.fss:1726-1731`, taken at `:1743`); evidence FAIL: reproducer `explorations/apl/base/AplCore.fss` is a library component and exits 1; comprehension FAIL: no pinned line; ownership pass; consistency: "which rung 5's Y20 checks" names a rung, now the file `explorations/apl/rung-5/Rung5.fss`, check Y20; "The mechanism is POSITIVE-VERIFIED" put as "The mechanism runs".
- Dropped: the name `aplAllMat` (the cited `:1743` is its call; history); `x04_gram.fss` now has its full path.
- Status stays CONTESTED: no POSITIONS entry or curator answer settles it. Its sentence on row 240 waits on row 240's measure.

## Not written
- closes.txt, dups.txt, silent.txt: empty. No row of this chunk is NEGATIVE-VERIFIED beside `silent`.
