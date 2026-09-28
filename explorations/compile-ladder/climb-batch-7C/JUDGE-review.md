# Climb batch 7C: the judge's ruling on the merged-diff review

Written 2026-09-28 on `main` at `d357c9cc4`, which holds rung Y's landing `079f54ea9`, rung X's `d8e0cd28e` and the review's corrections. The review refused approval with two blocking findings (`explorations/compile-ladder/climb-batch-7C/RECORD.md:183-185`, "For the judge"). This ruling reads the merged diff, the batch record, both rungs' `REPORT.md`, `SKEPTIC.md` and `record.md`, ledger rows 486 to 492, the workflow script, the probes the findings cite and batch 7R's judge's ruling. It builds nothing, runs no test and did not read `tmp/gate-batch-7c/out/`. Every line number is at `d357c9cc4` unless it says otherwise.

The brief names `explorations/compile-ladder/climb-batch-7c/`. The batch's directory is `climb-batch-7C/`, where its `RECORD.md` is. Batch 7R's judge made the same choice for the same reason (`explorations/compile-ladder/climb-batch-7R/JUDGE-review.md:5`), so the ruling is here, and the repair's record goes beside it.

**Decision: repair.** Both findings hold, and both are repaired now:
- **Finding 1.** The sentence the gather appended to Appendix I's I.1.20 Effect (`Specification/appendices/changes.tex:1309`) takes the review's phrase, on the same source line, and the specification is rebuilt.
- **Finding 2.** Row 492 gets its two gated expected-failure tests: `ProjectFortress/tests/XXXComprisesMeetWalk.fss` and `ProjectFortress/compiler_tests/XXXComprisesMeetCompiled.fss` with its `.test`. Each is shown red on the variant without `f(t: T)`.
- **Sibling sites.** Two record sites carry finding 1's misreading: row 490's claim, which gets a note, and rung Y's `REPORT.md:147`, whose sentence is corrected.

A repair is the only decision under which the batch lands. Any other decision ends the run unlanded (`explorations/coordinator/climb-batch-workflow.js:1891-1892`). Neither finding is a reason to drop a rung: rung Y's code is what Pavol approved, and rung X's normative text states it. Both defects are in a sentence of the appendix and in owed tests.

## 1. Finding 1 holds

**What the code counts.**
- `everyKnownSubtypeListed` collects every `TraitIndex` of `analyzer.traits` whose `extends` clause names a `TraitType` whose simple text equals the subtrait's: `st.getName.getText.equals(tt.getName.getText)` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:277-280`, the comparison at `:279`). Objects are `TraitIndex` entries too, so it collects traits and objects.
- `analyzer.traits` iterates over the checked unit's type constructors and those of every api in the global environment (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:99-110`).
- So the declarations counted as extenders of a parameterized trait `G` are the traits and objects that extend any trait named `G`. A trait that merely has the name `G` is not counted unless it extends such a trait itself.

**What was measured.**
- `explorations/compile-ladder/rung-comprises-checker/probes/skeptic/name-collision.txt` shows it. `SkNameA` (`SkNameA.fsi:4`, `trait G[\X\] extends Closed`, which nothing extends) is refused by the base's checker and accepted by the landed one. `SkNameAlone`, the same api without the import, is refused by both.
- What satisfies `subs.nonEmpty` and `comprisesContains` is `K` (`SkNameB.fsi:4`, `trait K extends { Listed, G[\ZZ32\] }`). `SkNameB`'s own `G` (`SkNameB.fsi:3`) extends nothing and is not counted.

**What the appendix says.** "A trait of the same simple name in another API counts as an extender" (`Specification/appendices/changes.tex:1309`), printed in the rebuilt PDF (`explorations/compile-ladder/climb-batch-7C/build/gather-vs-base-pdftotext-diff.txt:96`). As a statement about the checker, that is false.

**Why the gather must fix it.** The mismatch is settled by the code, not by a decision: an Effect item says what the implementations do. The batch record charges the gather with checking X's text against Y's landed code and fixing it where the mismatch is settled (`explorations/coordinator/CLIMB-BATCH-7C.md:176`, "Y against X"). The gather appended this sentence to make the entry true (`explorations/compile-ladder/climb-batch-7C/RECORD.md:90`), so its wording is held to that standard.

**The phrase.** "and a trait or object that extends a trait of the same simple name in another API counts as an extender". "In another API" is exact: the table adds the apis of the environment to the unit (`TraitTable.scala:99-110`, the apis at `:104`), and one unit cannot declare two traits of one name.

**Where the misreading came from, and its other sites** (rule 2 of the prefix: a defect found once is looked for elsewhere).
- Row 490's claim ends "so an unrelated trait of the same name counts" (`explorations/fortress-gap-ledger.md:501`), and its body then states the measurement correctly.
- Y's skeptic summarized it as "It counts an unrelated trait of the same simple name, in any api of the environment, as an extender" (`explorations/compile-ladder/rung-comprises-checker/SKEPTIC.md:324`; also `probes/skeptic/lists-for-pavol.txt:7`).
- `PLAN.md`'s parked line took that wording, and the review corrected it (`RECORD.md:181`).
- Rung Y's `REPORT.md:147` opens its bullet with "A trait of the same name in another api is counted too", and the next sentence says it correctly.
- `FACTS.md:77` is right: "unless an unrelated trait of the same simple name in the environment has an extender below a listed type".

Of these six sites, the review fixed one (PLAN), and this repair fixes three: the appendix, row 490 by a note (rows are not rewritten), and Y's `REPORT.md:147`. The skeptic's `SKEPTIC.md:324` and its list stand as the skeptic's record, since the ledger note and the corrected report now say what it measured.

## 2. Finding 2 holds, and the other reading does not

**The rule.** Pavol's decision of 2026-09-19, after climb batch 1: "every measured and repaired defect gets a gated assertion, a deferred spec-settled one an `XXX` test" (`explorations/coordinator/POSITIONS.md:34`). The shared prefix repeats it for "every defect anyone in this rung measures".

**The defect is spec-settled, and it stays settled whatever Pavol answers on item 26.**
- The Meet Rule (`Specification/advanced/overloading.tex:247-273`) makes `f(P)` and `f(Q)` a valid overloading when `f(P ∩ Q)` is declared. The passage is caught between two drafts ("are a valid overloading if … all of the following hold:", `:254-257`), but both drafts accept the example:
  - `f(V)` is declared, and `V = S ∩ T` (`:282-307`; `Specification/basic/types-vals-vars.tex:583-604`).
  - `S` and `T` define no coercions, so the second item's quantifier ranges over nothing.
- The example says `f(V)` "is applicable to and more specific for any call to which both f(S) and f(T) are applicable" (`overloading.tex:305-307`). Dispatch takes the most specific declaration applicable at run time (`Specification/basic/overloading.tex:263-276`). So for an object `X extends V`, `f(X)` dispatches to `f(V)`.
- Row 491 leaves open whether the passages that read a clause at the level of types are restated (`explorations/coordinator/PLAN.md:137`, item 26). The example has no parameterized trait, so none of item 26's three candidates changes its verdict:
  - (a) At the level of values, every value of both `S` and `T` is a `V`: a `U` that is a `T` would be a `V` or a `W`, and `U excludes W`.
  - (b) This candidate is about a trait with static parameters, and the example has none.
  - (c) This candidate leaves the passage as it is.
- Both paths refuse the example: walk at load, the compiled checker with "Invalid overloading of f" (`explorations/compile-ladder/rung-spec-comprises/probes/between/MeetExample.txt`). They also refuse the smallest shape (`probes/skeptic/SkMeetSingle.txt`), on the base's checker and on rung Y's (`explorations/compile-ladder/climb-batch-7C/merged-tests/between-y.txt`).
- Everyone who looked put it in home 2: the rung (`rung-spec-comprises/REPORT.md:95-97`), its skeptic (`SKEPTIC.md:111`), the row (`fortress-gap-ledger.md:503`), the gather (`PLAN.md:139`) and the review.

**The other reading, part by part.**
- **"Rung X could add no test"** (`CLIMB-BATCH-7C.md:151`, `:487`).
  - That is true of the rung, and the rung was right not to write the tests.
  - A rung's file list is the device that keeps batch rule 1 at the rung stage, where two rungs run beside each other (`CLIMB-BATCH-7C.md:170-176`). A repair on the merged tree runs after the merge and cannot break that rule.
  - The repair role repeats home 1 for what it fixes (`climb-batch-workflow.js:1419`). The prefix states all three homes for any defect measured "by the worker in its own first pass, by the skeptic, or in a repair round", and the rule it rests on has no exception for a rung's file list.
- **Batch 7R's judge left row 486 for the same reason** (`explorations/compile-ladder/climb-batch-7R/JUDGE-review.md:84`, section 5). The review cites that ruling's rows 481 and 482 but not this bullet, which is the closer precedent. It does not carry here, for two reasons:
  - That ruling named an owner, "batch N's walk rung", and nothing has carried the test there. `explorations/coordinator/CLIMB-BATCH-N.md`, last changed at `cb0bbed8e` before that ruling (`d7424cb28`), does not mention row 486. The coordinator's list of what N's record gains before its launch does not name it either (`explorations/coordinator/postmortem-2026-09-19/held-list.md:7`, "Before N's launch"). A deferral to a later rung holds only if someone carries it into that rung's record, and this one has not been carried.
  - Here no owner is named at all. `PLAN.md:139` asks Pavol which rung writes the tests, and the gather's reading is batch 8's meet-rule rung. But batch 8's meet-rule work is "a library rung of devices, with no checker step" (`explorations/compile-ladder/plan-7b/probes/P2.md:18`; `PROBES.md:76`, "Batch 8's Meet Rule work is a library rung"). Row 492's fix is in walk's `OverloadedFunction.java:439-472` and the checker's `OverloadingChecker.scala:418` (the row's own note), which no planned rung touches. "Test first" there names a rung with no reason to write these tests.
- **"Showing the first file red would take the meet rule itself."**
  - The red demonstration exists because the harness's own author warns that expected failure "is not treated consistently" (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:853`). Its purpose is to show that the file turns red when the program is accepted.
  - Batch 7R's judge replaced it for row 482 when the fix was two Java sites (`climb-batch-7R/JUDGE-review.md:62-64`).
  - Here a stand-in shows both things a fix would show. It is the same program without `f(t: T)`, where `f(V)` is more specific than `f(S)` and the overloading is valid on both paths. Under walk the stand-in prints the assertion's answer, 3, and under each harness the `XXX` file turns red.
- **Cost.** None is added. After a repair, the script runs a second review and the full gate in any case (`climb-batch-workflow.js:1894-1907`), and finding 1 needs a repair.

## 3. The tests

**Walk.** `ProjectFortress/tests/XXXComprisesMeetWalk.fss`. An `XXX*.fss` there is gated by its name (FACTS.md, "An `XXX*.fss` in the interpreter corpus IS a gated expected-failure test"). Today walk refuses it at load, "first parameters … are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present". Once walk finds the meet, the file loads, the assertion holds, and the harness reports "Missing expected failure" (`FileTests.java:400-402`).

**Compiled.** `ProjectFortress/compiler_tests/XXXComprisesMeetCompiled.fss` with a `.test` that drives `compile` and carries `compile_err_contains=Invalid overloading of f in component XXXComprisesMeetCompiled`, in the shape of `ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.test`. The compiled defect is a compile-stage refusal, so one `.test` suffices (FACTS.md, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only").
- **Why a key at all.** A change that moves the failure elsewhere turns the file red ("Saw wrong failure") rather than letting it pass silently (FACTS.md, "An `XXX` compile test pinned by `compile_err_contains` whose program compiles is reported as a wrong failure, not a missing one").
- **Why `contains` and not `equals`.** The message names the two declarations in an order that nothing shows to be a property of the program; walk's own order is not one (FACTS.md, "The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program"). The key pins the refusal and not the order.
- **Promotion.** The `.test` drives `compile` only, so the compiled run's answer is checked when the file is promoted.

**Both programs.** Each is the specification's example with results that tell the three declarations apart (1, 2, 3, as in rung X's probe), an object `X extends V`, and one assertion: `f(g)` with `g: S = X` is 3. The assertion's message cites row 492 and `Specification/advanced/overloading.tex:282-307`. Each file has one comment line, pointing at rung X's `REPORT.md`, whose section "Defects measured, and their homes" records the defect.

**The red demonstration.** It uses the variants `XXXComprisesMeetWalkNoT.fss` and `XXXComprisesMeetCompiledNoT.fss` with a `.test`, each the file without `f(t: T): ZZ32 = 2`. They are committed as probes under `climb-batch-7C/repair/`, never in a gated corpus:
- under `bin/fortress`, the walk variant prints `PASS`;
- under the testSystem harness (`explorations/compile-ladder/rung-interp-coercion/harness-one.sh`), the walk variant reports "Missing expected failure", as `explorations/compile-ladder/rung-interp-coercion/probes/xxx-goes-red.txt` shows for another file;
- under the junit harness, the compiled variant is red.

## 4. Who was right

**The review.**
- Right on finding 1: the code (`TypeHierarchyChecker.scala:277-280`), the capture and the phrase. Its phrase is adopted.
- Right on finding 2: the rule and the home. Its "other reading" was worth setting out, and section 2 answers it.
- It cited batch 7R's ruling on rows 481 and 482 and not that ruling's section 5 on row 486, which points the other way. Section 2 sets the two apart: row 486's deferral has not been carried to the rung it names, and row 492's names no rung that would write the tests.
- Its observation that the Effect's "over the declarations it sees" also covers a refusal is right, and it stays an observation (section 5).

**The gather.**
- It was right to check X's text against Y's code, and right in all its items but one sentence: it wrote the Effect's phrase from row 490's title rather than from the capture (`RECORD.md:90`).
- It named batch 8's meet-rule rung as the tests' owner (`PLAN.md:139`) against the probe that makes batch 8 a library rung (`plan-7b/probes/P2.md:18`, `PROBES.md:76`).

**Rung X's worker and skeptic.** They were right to put row 492 in home 2, right not to write the tests outside the rung's files, and right to name the gap for Pavol (`rung-spec-comprises/REPORT.md:95-97`, `:138`; `SKEPTIC.md:111`).

**Rung Y's skeptic.** It measured the name capture correctly (`rung-comprises-checker/SKEPTIC.md:108`), but its summary line (`:324`) and row 490's title said "counts" of the unrelated trait itself, which is where the misreading began.

## 5. Considered and left

- **The Effect's other direction.** A parameterized trait whose every extender is declared in a later unit has no known extender, so the checker refuses it. The text's "at least one trait or object extends it" (`Specification/basic/traits.tex:246`) may hold of the whole program. The Effect's general clause, "enforces the requirement … over the declarations it sees" (`changes.tex:1306-1307`), is true in both directions. Adding an unmeasured example to rendered text would do more harm than good. The review observed it (`RECORD.md:188`), and it stays observed.
- **Rows 487 and 490 stay in home 3.** Each is an acceptance that should be a refusal, which neither an `XXX` compile test nor a plain one can hold (their notes; FACTS.md, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only"). Row 489 is gated.
- **review.1 and review.2** are in `PLAN.md` as the review put them. Nothing here changes them.
- **Row 486** is batch 7R's and is not this batch's to repair. That its named owner's record does not carry it yet is recorded for the coordinator in `RECORD.md` by the repair (step 9), for the re-anchoring of N's record before N launches.
- **Stops.** The new files are outside both rungs' file lists, but no stop names that: Y's stops are about a compiled test's verdict, Java or Scala files and protected lines, and X's are about the frozen copy, normative text and a re-anchored test's assertion (`CLIMB-BATCH-7C.md:108-114`, `:157-162`). No existing test changes its verdict. No stop is met.

## 6. The gate

After the repair, the script runs the review again and then the full gate (`climb-batch-workflow.js:1896-1907`). By reading:
- The compiler track reads 789: the first gate's 788 (`RECORD.md:169`) plus `XXXComprisesMeetCompiled.test`, as an expected failure.
- `testSystem` reads 426: 425 plus `XXXComprisesMeetWalk.fss`, in one of its four shards.
- Everything else is as the first gate had it: every other suite, the checker table at 75 with the crash row `none`, the distance stage at 626, 39 of 39 atomic runs, and the ladder.

The specification's two changed files are read by no gate stage.

## 7. The repair

It is done in `/home/user/fortress`, on `main`, after the gate stage has returned. The steps are the ones in the structured result, in order:
1. Set up.
2. Make the appendix edit.
3. Rebuild the specification.
4. Write the four test files.
5. Run and show red.
6. Add notes to rows 490 and 492.
7. Fix the record sites.
8. Update `PLAN.md` item 27 and the handover in place.
9. Add the repair's section to `RECORD.md`.
10. Write `REPAIR-review.md`.
11. Run the tracked-path check.
12. Make one local commit with the footer. Do not push.

It runs no `ant` target outside `Specification/fortress/` and no gate.

The tracked-path check over this file prints three `MISSING` lines, each by design: the two test files the repair writes, and the brief's spelling `explorations/compile-ladder/climb-batch-7c/`.

## For Pavol

Nothing new. `PLAN.md` item 27 asked which rung writes row 492's tests. His rule of 2026-09-19 answers it, the tests are written, and the item is marked settled in place. No specification question is decided here: the example is valid under each candidate of item 26, which stays his.
