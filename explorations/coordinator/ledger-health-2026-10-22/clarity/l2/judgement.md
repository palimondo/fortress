<!-- Ledger clarity pass, chunk l2: the judge's verdict on each of the twelve rewritten rows and on the chunk's closes, with the corrections made from the check's sources. -->

# Chunk l2: judgement

Tree: `HEAD` `8a210ee22`. `git diff --stat d4d454f9d HEAD -- ProjectFortress Library Specification explorations/fortress-gap-ledger.md` is empty, so the check's reading at `cdb84fba5` holds, and each of the twelve rows reads in the ledger as the assessment quoted it. `ledger.py check --rows final.rewrite`: "12 rows, 0 fail the template".

Result: 12 applied (8 as the check passed them, 4 with the check's corrections), 0 held. No close: `closes.txt` proposes none, so `final.closes` is empty.

| Row | Verdict | Reason |
|---|---|---|
| 336 | apply | The check passes it. Spot-checked: `Int.java:126`, `:132`, `:263-266`, `:291`, `:389`, `Long.java:140`, `:146`, `BigNum.java:160` read as the line cites. |
| 340 | apply, corrected | The check's one failure: the line said walk runs every listed shape, but no record holds a walk run of the `ZZ32` function's `try` body (`climb-batch-11/RECORD.md:135` and `rung-checker-expected-type/REPORT.md:158`, `:195` record only the compile). History line 2041 records walk's answers for the other five. Correction as the check gave it: "Same crash (walk runs all but the last): ", and "the coercion after it" shortened to "the coercion". Line 1,155. |
| 355 | apply, corrected | The check's one failure: "No gated test reaches `PureList`" is false under walk. Confirmed: `ProjectFortress/tests/PureListQuick.fss:13` and `ListNullPointer.fss:13` are `import PureList.{...}`, and `FileTests.java:934-946` adds every `.fss` of `tests/` but the four skipped names. Correction as the check gave it: the sentence now names the two walk tests and says no compiled test reaches it; the `TypeHierarchyChecker.scala:123` sentence goes, and F-225 moves into the claim. Line 1,180. |
| 364 | apply, corrected | The check's one failure: `EvaluatorBase.java:601-602` reads each argument's run-time type and unifies nothing. Confirmed: `:601-602` is `for (FValue a : args) { FType at = a.type();`; a lone `T`'s argument is set aside (`:625-632`) and takes `narrowest(...)` (`:645`); the unification (`:637`) is for a type that only mentions `T`. Correction, the check's in substance, reworded to fit: "By reading: the inference takes each argument's run-time type (`interpreter/evaluator/EvaluatorBase.java:602` at d4d454f9d); a lone `T` takes the narrowest (`:645`)." The check's own wording, with "and" added, ran to 1,201 characters. Line 1,191. |
| 369 | apply | The check passes it. Spot-checked: `FortressLibrary.fss:4402`, `:4410`, `:4412` (`cast[\Object\](b).asString`) and `:4513`. |
| 371 | apply | The check passes it. Spot-checked: `TypeHierarchyChecker.scala:298-300` and `:307-308` hold the two messages. |
| 374 | apply | The check passes it; its citations are row 369's. |
| 405 | apply | The check passes it. Spot-checked: `STypeEnv.scala:72-75` and `:200` throw "Missing parameter type for". Its spec cell `silent` beside `NEGATIVE-VERIFIED` is review-queue item 265, already open; the verdict does not wait on it. |
| 407 | apply | The check passes it. Spot-checked: `SymbolicType.java:80`, `FType.java:209`. Spec `silent`: item 265, as for row 405. |
| 416 | apply | The check passes it. Spot-checked: `OverloadedFunction.java:587-602` raises "... are unrelated (neither subtype, excludes, nor equal) ...". |
| 430 | apply | The check passes it. Spot-checked: `Constructor.java:182-183` builds the `GHashMap`, `:348-349` iterates it. |
| 436 | apply, corrected | The check's one failure: the two fallbacks' lines were one off. Confirmed: `FortressLibrary.fss:3394` is `else => cast[\T\](0)` and `:3411` is `else => cast[\T\](1)`, the same at `d4d454f9d`; `:3393` is the `RR64` clause's `cast[\T\](v)`. Correction: "(`:3393`)" to "(`:3394`)", "(`:3410`)" to "(`:3411`)". Line 1,191. |

## Closes

None proposed, none applied. The seven `XXX` reproducers that `closes.txt` names are in their folders (the check, "Closes").

## The chunk's questions

`questions.md` has no investigate question. Its items 1 and 3 are probes that could later confirm a measurement; the new lines state no more than the records hold (row 340's last shape now says walk is unmeasured; row 436 cuts the `Vector[\RR64,3\]` case). Its item 4 is review-queue item 265. None is queued.
