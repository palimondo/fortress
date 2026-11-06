# Chunk c20, assessment (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency (P pass, F fail).

## 448: keep
P P P P P P. The pins at `052a7c3fe` are correct: `git show 052a7c3fe:.../CodeGen.java` gives `paramCount = -1` at 1519, the non-generic branch at 3617, `paramCount = l` at 6406 and `paramCount = 1` at 6411; the field is now at `:1522`, and `forFnRef` still selects by it. The XXX test stands, compiled, not run here. No repair story in the notes ("climb batch 6 rung R's repair round" is the found-by cell).

## 547: measure
Evidence F: "`explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`" is the harness script, not a reproducer, and the program `SkFnBetween` has no file. Present meaning F (unknown): the checker's memos changed since (`ee6bfcb8d`, `3c67d5204`). Citation `compiler/StaticChecker.java:275` is ambiguous (a shadow copy under tools/checker-count). Consistency P (FACTS F-76 and F-175 name it as open). Question in `questions.md`. Read beyond evidence: `compiler_tests/XXXFunctionalMethodMeetBetweenTraits.{fss,test}`, `references/tests-running.md` on `junit.sh`.

## 540: rewrite
Evidence F: "`CodeGen.java:6236`" has no pin and the cast now sits at `CodeGen.java:6515` (`methodCall(method, (NamedType)receiverType, ...)`, same text as `ae4f8e38a:...:6236`). Rest P. New line pins `:6515` at c124c6b65, adds `siblings: 559` (route 1 of 559 is a call on `choose(m)`), and shortens "The typing stays (POSITIONS, "The `comprises` passages read at the level of values")" to "(P-60)", the same position by number. Dropped: nothing else.

## 543: rewrite
Evidence F: "`Functionals.scala:688`", now `:718`. Ownership/consistency F: "The scope is the rung judge's D6 (`explorations/compile-ladder/rung-return-type-rule/JUDGE.md`), for the curator" — POSITIONS P-60 (POSITIONS.md:57) now states the boundary, and FACTS F-76 (FACTS.md:73) records "That narrower scope than P-60's is a default". "the specification excludes only generic declarations that may run" restated from P-60. New line points to P-60 and F-76; the JUDGE.md D6 reference lives in the history (old line) and in F-76's detail. Added `siblings: 540`.

## 555: measure
Claim, evidence F: reproducer `none` with no command or output in the notes; notes name the fixed half "Fixed half (669b77d03, climb batch 9, rung W; ...)" and a batch story. Present meaning unknown: the one run (`RpFJoin`, REPORT.md section 12) predates `9879d4386`, `743eb5286`, `5262a2412`. Comprehension point: the row's types make `Apple` extend `Cmp[\Red\]` and `Cmp[\Round\]`, two instantiations of one generic trait, which Fortress forbids, so the program may be ill-formed; and the notes say "The specification does not settle an F-bounded parameter (P1 unanswered)", which does not fit `NEGATIVE-VERIFIED`. The refused note of batch 11 ("Unchanged by row 424's F-bounded half (c0b2888f2)...") is batch history; its fact (walk leaves open only a parameter nothing fixes) is in the history file. Question in `questions.md`; the rewrite waits for its run. Read beyond evidence: REPORT.md sections 11-12, climb-batch-11/RECORD.md:137.

## 559: rewrite
Evidence F: "`InstantiatingClassloader.java:2519`" unpinned (the line holds, the throw; pinned now at c124c6b65). Present meaning F: "(row 541's repair)" and "Routes 1 and 2 ran before climb batch 8's rung I" are repair story. The signal repro-xxx-gone is a lead only: `XXXCoverageReturnInferred.test` is a run test (`run_err_contains=Intersection`), `CoverageReturnInferred.test` its compile-and-link twin, so the XXX reproducer stands; the twin is now named. Siblings 448 (route 3's 'AbstractIntersection??') and 616 (its compiled instance dies here) added. Dropped: the row-541 and rung I timing, home the history and row 541 (FIXED).

## 587: keep
P P P P P P. The record-says-fixed signal is F-141 listing the row as a defect with an expected failure; consistent with the row. XXX walk test green under the holding gate a12ab5c60, so it still fails as asserted.

## 591: keep
P P P P P P. Pins at d4d454f9d with the cited lines unchanged since. The refused batch 13 note concerns rung V's held `d3d31b5b2`, not in the tree, so it does not join. FACTS F-141 and POSITIONS line 45 agree.

## 612: rewrite
Present meaning/consistency F: "siblings: 588" names a FIXED row, and "which row 588's repair leaves alone" is a repair story; evidence F: "`EvaluatorBase.java`" without line. New line: `siblings: 591` (shared mechanism, `rechecks`), mechanism pinned at `EvaluatorBase.java:375` and `:397-399` at c124c6b65 (the first loop's `!rechecks.contains(tp)`, the last loop's call of `boundAtInstances`). Dropped: the reference to 588's repair, home the history and row 588 (FIXED).

## 616: keep
P P P P P P. Siblings 591, and 559 named for the compiled side. XXX walk test holds under the gate.

## 843: keep
P P P P P P. Both citations hold at the base, unchanged since the pin.

## 589: keep
P P P P P P. Pins at d4d454f9d checked: `OverloadedFunction.java:2309` and `:2497` are the two `inferByUnification` calls at that commit. F-141 holds the repair for the curator, as the row says.

## pairs
None outside the chunk; 555/589/591 and 448/559/616 are siblings within the chunk, each naming the others.
