# Chunk c13 (run c-run2), at base c124c6b65

Marks: scope / present meaning / evidence / comprehension / ownership / consistency.

## 790: rewrite
- scope pass; present meaning pass; evidence FAIL: pinned at `84a17f4bd`, "NOT in the base's history"; "the same on the base" refers to a base that is not this one. comprehension pass; ownership pass; consistency pass (siblings 414; added 790 to 414's siblings).
- Read beyond: `NamingCzar.java:779-803` at the base (no dedupe; mechanism holds).
- Change: pin to `NamingCzar.java:779-803` at c124c6b65; workaround added. Dropped: "the same on the base" (redundant with the new pin).

## 889: rewrite
- evidence FAIL: `:5774` read as NamingCzar (past its end); "`CodeGen.java:5747` at 97a416b18" moved to `:6024`. comprehension FAIL: "on the old code and after climb batch 25's rung C" is a batch story. Others pass; sibling 820 FIXED but the pair stays useful (FACTS.md:116 names both).
- Read beyond: `CodeGen.java:5977-6052` (tuple null call `:6024`, arrow `:6051`), `NamingCzar.java:1720`.
- Dropped: the batch phrase (no fact lost). Workaround added.

## 366: rewrite
- consistency FAIL: FACTS F-39 says "A three-line change to `MethodInstantiater`, measured but not landed, fixes row 366's program"; the row says "its generator is not located" and points at CodeGen's `"factory"` calls. evidence FAIL: the `CodeGen.java` pins moved. comprehension: "once repaired, ..." is a repair forecast.
- Read beyond: F-39; `explorations/perf-probes/nat/size-probes.md` section 5; `runtime.md` lines 25-32; `MethodInstantiater.java:110-132` at the base.
- Dropped: the CodeGen `"factory"` call list and the `:5822-5823` OpArg skip (a shape "not verified to be this path"; the OpArg `continue` now at `CodeGen.java:6100`, history keeps the old line); "once repaired, `stringOps.typeName` renders the stem verbatim": home is history, row 366.

## 404: rewrite
- consistency FAIL (small): row 850 names 404 as a sibling and 404 does not name 850. All else passes: the probes' old path is given, POSITIONS (P "covariant keyword is future work") agrees.
- Change: `siblings: 850.` added; "worklist item 12" cut to fit (home: the POSITIONS entry it cites). The probe is cited by its full old path, since mech.py fails a bare file name; `AltEveryContraObject.fss` is now "its contravariant twin beside it" (its name: history, row 404, and the old line). Notes sit at 700 of 700: the next note needs a cut.

## 406: rewrite
- evidence FAIL: `TypeAnalyzer.scala:460-468` and `CodeGen.java:5829` at 052a7c3fe no longer name the code (now `:544-552`, "Todo" at `:546`; the `BoolArg` branch at `CodeGen.java:6085` falling to the throw at `:6108`). Others pass. Siblings 768, 850 added (both name 406).
- "the rung that adds it also decides" reworded without the rung.

## 414: rewrite
- evidence FAIL: `TypeHierarchyChecker.scala:216` moved; `definitelyExcludes` now at `:297`. Others pass; siblings gain 790.
- Dropped: "its run printing a `Box[\ZZ32\]` that is no `Full[\ZZ32\]`" (to fit); home: row 489 and history row 414. The Odd sentence is row 489's case: in `pairs.txt` for the reconcile run.

## 850: measure
- evidence FAIL by its own text: "By reading, not run ... Settles it: a probe of `D` and of the `f` pair". Pins hold (TypeAnalyzer unchanged since 501140f96). CONTESTED stays; no settlement in POSITIONS or from the curator. Question in `questions.md`.

## 768: rewrite
- evidence FAIL: pinned at `ca4bc4d88`, "NOT in the base's history"; `equalStaticArgs` now `ExportChecker.scala:671-678`. comprehension FAIL: "Row 737's repair compares ..." is a repair story (737 FIXED). Siblings: 737 (closed) replaced by 836 (836 names 768); 406 kept.
- Read beyond: `ExportChecker.scala:671-678`, `:73-78`.
- Dropped: sibling 737 (closed; its fact kept as the left-out return type sentence).

## 769: rewrite
- evidence FAIL: pinned at `ca4bc4d88`, not in the base's history; lines hold at the base. comprehension FAIL: "Row 737's repair gives ..." (repair story). Siblings: 737 closed; 834 and 835 name 769, added.
- Added the text's citation `source-code.tex:356-361`.

## 834: rewrite (status CONTESTED kept)
- evidence FAIL: pinned at `95f31de40`, not in the base's history; lines hold at c124c6b65. All else passes; FACTS.md:124 and :130 agree (method half). Only the pin changes.

## 835: rewrite
- evidence FAIL: pinned at `95f31de40`, not in base history; `OverloadingChecker.scala` ambiguous (two files). present meaning FAIL: "On the base, which skips operators" names a base that is not this one; restated as "Before `bb3925156` the check skipped operators" (bb3925156 is in the base's history and is the commit that reads operators).
- Read beyond: `ExportChecker.scala:245-255`, `:610-620`; `typechecker/OverloadingChecker.scala:843-852`.

## 836: rewrite (status CONTESTED kept)
- evidence FAIL: pinned at `95f31de40`; present meaning FAIL: "on the base, which skips operators" (as 835). Lines hold at c124c6b65.
- Not in `silent.txt`: it is CONTESTED, not NEGATIVE-VERIFIED.

## No closes, no duplicates
- 790 and 414 share the `ClassFormatError` but differ in site (codegen's literal repeat vs the checker's declaration rule): siblings.
- 406 and 768 both concern `bool` arguments at different checks (exclusion vs export): siblings.
