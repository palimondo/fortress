# c15 assessment (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency.

## 355: rewrite
- scope pass; present meaning FAIL: "as `Library/List.fsi:67-68` does, with `AnyList`" — `List.fsi` now carries the header at :69-70 and also extends `Equality[\List[\E\]\]` (ff19305cc), so "as List.fsi does" is no longer true of the component's header; evidence pass (`PureList.fsi:41` and `:75` hold at base); comprehension pass; ownership pass; consistency pass (FACTS F-225 says the rule refuses `PureList` rightly: open, not fixed).
- New line: List.fsi cite re-pointed to :69-70 and says what it adds; bare file names written as full paths (mech.py refused them as ambiguous); "Repair:" became "Fix:". Dropped nothing; the batch-14 refused note (self-type rule) is in the claim already.
- Read beyond evidence: `git show c124c6b65:Library/List.fsi`, `PureList.fss`, `PureList.fsi`.

## 611: rewrite
- scope pass; present meaning FAIL: pin `ed4782762` is not in the base's history, and `OverloadedFunction.java:1990-1994` now shows another loop; "The library's sites are repaired" is a repair story; evidence pass (the XXX test is still red under a holding gate); comprehension pass; ownership pass; consistency pass (FACTS F-142/F-245 agree).
- New line: mechanism pinned at `OverloadedFunction.java:2071-2075` at c124c6b65 (`checkedName`, `NodeUtil.validOp`, which admits only words of capitals, NodeUtil.java:1463-1474); siblings 584, 585 (both FIXED) replaced by 342, the open row it leans on. Dropped: the ranges' repair since b872d65a1 (home: history, row 611); siblings 584, 585 (home: history; both closed).
- Read beyond evidence: OverloadedFunction.java:1972-1980, 2006-2012, 2068-2076 and NodeUtil.validOp at base.

## 364: keep
- All six pass. Pins `EvaluatorBase.java:602`, `:645` at d4d454f9d (in base history) unchanged. Refused notes: batch 17's dotted-method note is in the line; batch 18's is a story. P-154's "record-says-fixed" signal says row 774 waits on 364: consistent.

## 395: rewrite
- scope pass; present meaning pass; evidence FAIL: the notes name `bestMatchWithCoercion`, `coercionFor`, `moreSpecific` with no pinned file:line; comprehension pass; ownership FAIL (weak): sibling 397 and 511 named only in prose / by 511; consistency pass (FACTS:184, P-84).
- New line: pins `OverloadedFunction.java:2311`, `Coercions.java:58`, `:329` at c124c6b65; `siblings: 397, 511`. Dropped: "The compiled side of the field assignment is row 397" (home: siblings cell).

## 397: rewrite
- scope pass; present meaning FAIL: `CodeGen.java:784` now reads `IdOrOp name = from_fnl.name();` and `:826-831` an `inst` block; evidence pass (the XXX compiled test stands; not run here); comprehension pass; ownership FAIL (weak): no sibling to 395; consistency pass.
- New line: `arity` at `CodeGen.java:791`, `from_sig` at `:834`, at c124c6b65; siblings: 395. Dropped nothing.

## 511: keep
- All pass. Pins unchanged since d4d454f9d; mechanism, workaround, sibling 395, compiled half present. Batch-13 refused note is covered by the `(1,2) < (1,2.5)` sentence. Overlap with row 20 (outside run) is a different defect (list display element type): no pair.

## 722: rewrite
- present meaning FAIL: `FortressLibrary.fss:4075-4080` at 787bf3588 — pin not in base history and the lines now hold TrivialOpenRange; "Present on the base." a story; "as `array1` now takes" a story. Other marks pass; XXX test red under holding gate.
- New line: `:4225-4230` and `:4227:23-58` at c124c6b65 (checked: the `cast` spans columns 23-58 on :4227). Dropped: the old pins 787bf3588 / 070ef39e5 (history).

## 773: rewrite
- present meaning FAIL: pin `e8a842d97` not in base history (the cited lines hold at base); "Row 748 closed in climb batch 18 by rung K, for a method's own `where` clause; this run still fails." is a batch story; sibling 748 is FIXED. evidence: reproducer `none`, the program and outputs are in the notes (pass). Commits 5b11849c6 and 1bc0a9083 touched Decls.scala after the row; 5b11849c6 concerns a declaration's header, not the members; FACTS F-255 (FACTS:106, :111) and POSITIONS.md:63 still hold the hole open. Not re-run.
- New line: repinned at c124c6b65; the story became the fact "a method's own `where` clause is checked at a dotted call (row 748, fixed); a conditional extension's is not"; siblings 748 dropped (fixed; named in the text). Dropped: "Scoping the member to the condition waits on row 748" (no longer true: 748 is fixed; POSITIONS:63 holds the plan).

## 774: rewrite
- present meaning FAIL: `Library/List.fsi:67` now a comment; the `Equality[\List[\E\]\]` entry is at :69; "to which the checker now gives no order" — "now" dropped. Others pass; XXX red under holding gate; POSITIONS P-154 agrees.
- New line: `List.fsi:69`.

## 342: rewrite
- present meaning FAIL: pin 052a7c3fe, `getFunctionals()` moved to :199-203; evidence FAIL: the reproducer `explorations/run-c4/src/MicroGptFlatCheck.fss` does not reproduce the claim — its run (evidence, `run/repro/342.txt`) shows only the model checks passing until timeout (exit 124), no refusal and no cold/warm split; ownership FAIL: no sibling to 611, which depends on it.
- New line: reproducer `none`, the old path named in the notes; pins at c124c6b65; siblings: 611; batch 21's refused note (a program's `||` meeting `String`'s refused only cold) folded in short (its full form: FACTS:117). Dropped: nothing else. Question for the prober in questions.md (optional).

## 384: rewrite
- present meaning FAIL: `EvaluatorBase.java:610` is now `continue;`, the eager `errorMsg("Non-generic-instance type for self argument ", ...)` is at :876-879; `OverloadedFunction.java:1559-1562` is now `mayInstantiate`; `bestMatchInternal` is at :2370 and its catch of the inference failure at :2393-2396. Others pass (probe path gone, its old place named). `silent` with NEGATIVE-VERIFIED: status kept; silent.txt says defect.
- New line: repinned at c124c6b65. Dropped nothing.

## 807: keep
- All pass. `FortressLibrary.fss:96`, `:98`, `:307` hold at base; pin 00f2e1bdc in history. The spec cell "GCD, LCM, and CHOOSE Operators" looked wrong but the `e \neq e'` sentence sits in that subsection (opr-overview.tex:254-275), so it holds. FACTS:222 agrees (its `List.fsi:67` is FACTS's, not the row's).

## Pairs and duplicates
None. 355 and 774 both cite `List.fsi` but state different defects; 364/722/774 and 395/397/511 are siblings, named so.
