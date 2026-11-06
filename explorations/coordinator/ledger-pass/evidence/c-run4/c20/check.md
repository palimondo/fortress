# Chunk c20, check (base c124c6b65)

`mech.py` rerun: 4 lines, 0 failing; `apply.py` 4 applied, `ledger.py check` and `check --base` exit 0 on the copies.

## 540 (rewrite): pass
- Fidelity: `CodeGen.java:6515` at c124c6b65 reads `methodCall(method, (NamedType)receiverType, domain_type, range_type);`, inside `forMethodInvocation` (`:6397`, no other method declared between). The reproducer `XXXCoverageReturnMethodCall.test` is `compile`, `compile_exception_contains=IntersectionType cannot be cast`, over the family the notes give (`.fss` matches `S`, `T`, `U`, `V`, `W`, `M`, `choose`).
- Nothing lost: `CodeGen.java:6236` is false at the base (now `:6236` holds `Id var = lv.getName();`), replaced by the pin. `comprises` was in the POSITIONS title "The `comprises` passages read at the level of values", which is P-60 (POSITIONS.md:57, "The specification reads a `comprises` clause at the level of values"): kept by number.
- Present, status, form: pass. `siblings: 559` is right (559's route 1 is `pass` on `choose(m)`, and names 540).
- Cold read: matches. Its unresolved items (walk not named, P-60, `M` trait or object) are answered by the class `(codegen)`, the record and the reproducer's `.fss`; none is a stumble.

## 543 (rewrite): fail
- Fidelity: `Functionals.scala:718` at c124c6b65 is `val groundFamily = preCandidates.forall(pc => getStaticParams(pc.arrow).isEmpty)`; `tieType` requires `groundFamily` and `callType` otherwise takes `cs.sortWith(moreSpecific).head` (`:727-728`), the "head of a sort". Reproducer `.test` is `compile_err_contains=but declared type is`. P-60's reading and F-76's "That narrower scope than P-60's is a default" (FACTS.md:73) hold.
- Nothing lost: `Functionals.scala:688` false at the base, replaced by `:718`. `explorations/compile-ladder/rung-return-type-rule/JUDGE.md` has homes: the history (old line), and review-queue item 58's Home (`review-queue.md:482`, `compile-ladder/rung-return-type-rule/JUDGE.md:59`).
- Failure (Status / cold read): the old line's "for the curator" is dropped, and the new line gives no pointer to the open review. The cold reader could not tell "whether a worker may widen the scope to P-60's line or must wait for the curator". The record answers it: `explorations/coordinator/review-queue.md:58` and `:480`, item 58, "Typing a call between two closed traits by the intersection of return types, widened to the paper's boundary once row 540 is fixed. Default: the narrower condition, as built." Correction, in the notes: replace "the narrower scope is a default (F-76)." with "the narrower scope is a default, review-queue item 58 (F-76)." (notes 660 to 683 characters, row 1156 to 1179).

## 559 (rewrite): fail
- Fidelity: `InstantiatingClassloader.java:2519` at c124c6b65 is the `throw new Error("Unable to read serialized data for " + template_name + ...)` in `xlationForFunctionOrGeneric`, reached from `xlationForGeneric` (`:2485`). The reproducer stands: `XXXCoverageReturnInferred.test` is `run`, `run_out_does_not_contain=REACHED`, `run_err_contains=Intersection`; `CoverageReturnInferred.test` is `compile`, `link` (so "gates the link" is right). Route 2's `XXXInferBoundMeetsExpectedTrait.test` is `run_err_contains=Intersection`. Siblings 448 and 616 are right (616's notes: "Compiled, the instance dies loading 'Intersection??' (row 559)").
- Nothing lost: `row 541` has its home in the history and in row 541 (FIXED); the timing "ran before climb batch 8's rung I" is history. Pass.
- Failure (Fidelity, route 3's message; cold read, route 3 and walk): the passage "Route 3, an overloaded function given to `[\X extends Any\]`, 'AbstractIntersection??'. Walk runs 1 and 2." The last measurement of route 3, `explorations/compile-ladder/rung-instance-bound/SKEPTIC.md:65`, gives `SkOverPassAny` ("an overloaded function passed to ... `idy[\X extends Any\]`") as base "dies, `AbstractIntersection??.xlation`", head "dies, `Intersection??.xlation`", walk "`h(3) = 4`"; the history's full text says route 3 "died on the base too, there with 'AbstractIntersection??'". So 'AbstractIntersection??' is the message before rung I, not now; the program is a call of `idy`, which the cold reader could not identify; and walk runs route 3 too. Correction, in the notes: replace that passage with "Route 3, an overloaded function given to `idy[\X extends Any\]`, 'Intersection??'. Walk runs all three." (3 characters shorter: notes 699 to 696, row 1197 to 1194).

## 612 (rewrite): pass
- Fidelity: `EvaluatorBase.java:375` at c124c6b65 is `(rechecks == null || !rechecks.contains(tp)) && (t == null || t instanceof BottomType)) {`, the first loop's guard before `t = boundOf(abm, n)`; `:397-399` is the last loop's guard and its `boundAtInstances(tp, tparams, tl, appliedThing)`, with no meet with the interval's upper end. The reproducer `tests/XXXInferAboveBoundMentionsParamWalk.fss` declares `coS[\S, T extends S\](g: T -> ZZ32, s: S): BoxU[\T\]` and asserts `BoxU[ZZ32]`; it is a gated walk XXX test, green under gate a12ab5c60 for the base.
- Nothing lost: `row 588` is FIXED; the "repair leaves alone" clause is history. Pass. `siblings: 591` is right: 591 names 612 among its siblings.
- Present, status, form: pass. Cold read: its unresolved items (the return type, the expected `T = ZZ32`) are answered by the reproducer, which the row names; not a stumble.

## 448 (keep): pass
The selection by `paramCount` stands at the base (field `:1522`, set at `:6685`, `:6690`); `git diff 052a7c3fe c124c6b65` on `CodeGen.java` touches no `paramCount` line, so the pinned-file-changed signal is answered.

## 547 (measure): pass
Narrow; `junit.sh <label> <dir> <Name.test>...` (its line 2, `ONE_JVM` at line 27) matches both commands, run from the main tree; each of three outcomes maps to a rewrite or a close.

## 555 (measure): pass
Narrow; the walk command runs from the main tree; each of three outcomes maps to a line, a retirement or a close. The two-instantiations point (`Cmp[\Red\]` and `Cmp[\Round\]`) is a fair test of the program's legality.

## 587 (keep): pass
F-141 lists it as a defect with an expected failure; the walk XXX test is green under gate a12ab5c60.

## 591 (keep): pass

## 616 (keep): pass

## 843 (keep): pass
No commit since the row touches its cited files.

## 589 (keep): pass
`c41c3d2b0` touches a cited file; the writer checked the two `inferByUnification` pins; F-141 holds the repair.

## Closes, duplicates, pairs
None written; none missed among the chunk (555/589/591 and 448/559/616 name each other).
