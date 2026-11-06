# c24 assessment (base c124c6b65)

Marks: scope / present meaning / evidence / comprehension / ownership / consistency.

## 400: rewrite
- scope pass; present meaning FAIL: "Fixed half: since `d65892d34` ..." tells a repair; "repair: see `compile-ladder/rung-unknown-size-arm/REPORT.md`" is a repair pointer; evidence FAIL: pin `Functionals.scala:257` at `052a7c3fe`, file changed +185 since (line still holds `hasSizeInferenceVars(sargs) && !hasInferenceVars(resultArrow.getDomain)` at the base); comprehension pass; ownership pass; consistency pass (FACTS F-69 lines 47, 66 and POSITIONS P-40 call it open).
- New line: the refused half stated as present behaviour with its test; pin moved to c124c6b65 and the mechanism said (the `Box[\n\]` domain holds an inference variable); story words dropped. Probe path kept (path-gone signal: the probe lives in history).
- Beyond evidence: Functionals.scala:250-262 at base; XXXNatUnknownSize* tests at base.
- Dropped: "Fixed half: since `d65892d34`" (home: history, row 400); the repair pointer to rung-unknown-size-arm/REPORT.md (home: history; the report is still in the tree and named by the XXXNatUnknownSize* sources).

## 446: rewrite
- scope pass; present meaning FAIL: "Rung R's call-site refusal (POSITIONS, "Sizes.")" (no such title; the decision is P-40) and "Repair: see ..."; evidence pass (`MethodInstantiater.java:227` holds, unchanged), pin re-stated at base; comprehension pass; ownership pass; consistency pass (FACTS line 66).
- Not a duplicate of 400: 400 is the checker's static choice; 446 the dynamic dispatch past a refusal and the loader's crash. Siblings.
- Dropped: the repair pointer (home: history, row 446).

## 682: rewrite (CONTESTED, status kept)
- all pass but evidence: pin `TypeAnalyzer.scala:285-298` at cdb84fba5 shifted +2; the opening case is `:287-300` at the base (read). The refused batch-17 note (type `where` variable refused alike) is already in the line. Only the pin changed. Overlap with 752 (near line): different defect (682 refuses a pair through the opening; 752 lacks an opening through a parent); with 850 outside run: unrelated (variance in exclusion).

## 713: rewrite (CONTESTED, status kept)
- present meaning FAIL: "climb batch 21 rung X"; evidence FAIL: `OverloadedFunction.java:835` shifted +66, now the Meet Rule message is at `:901` (`ruleFailure`), read at base; the walk test `OverloadTwoBoundsClosedTraitExclusionWalk.test` asserts `load_exception_contains=fails the Meet Rule` and the holding gate ran it green, so walk's refusal stands; consistency pass (FACTS lines 96, 118).
- Dropped: "climb batch 21 rung X" (home: history). The refused batch-18 note (message 'fails the Meet Rule') is already in the claim.

## 770: rewrite
- evidence FAIL: `OverloadingChecker.scala:137` / `:138-160` at ca4bc4d88 (not in the base's history); at base `toFunctionArrows` returns at `:139` and the filter runs `:140-162` (read). present meaning: "row 739's repair" dropped. Others pass. 815 is a sibling (codegen run-time failure without an api), not a duplicate.

## 786: rewrite (CONTESTED, status kept)
- evidence FAIL: `OverloadedFunction.java:1420` at a93fb3bfd (not in base history), shifted +119; `mayBeEqual` is at `:1539` at base (read). present meaning FAIL: "climb batch 21 rung X". Reproducer `GenericPairExcludingWalk.fss` asserts `tint` runs under walk (read); the compiled half's test `XXXExclusionExcludingBoundsBox` is named. Consistency pass (FACTS 118, 214; POSITIONS 42).
- Dropped: "climb batch 21 rung X" (home: history).

## 803: rewrite (NEGATIVE-BOUNDED, status kept)
- evidence FAIL: `TypeAnalyzer.scala:779` at aa5ff2423 shifted +26; `normConjunct`'s subtype test `isTrue(sub(a, x))` is at `:805` at base (read); Formula.scala lines unchanged, re-pinned at base. comprehension: added from the probe's REPORT (line 195) that no plain-checker program is known to reach it, so a reader knows why the reproducer is the report (which holds `shadow.py`, its `keepvar` variant and `VecPairsLeft`). Sibling 736 is FIXED; kept as a sibling.

## 815: keep
- All six pass: claim states the run-time failure; reproducer `XXXFunctionalMethodComprisedObject.test` (`run_out_contains=REACHED`) asserts the fixed behaviour as an expected failure; no citations with lines; the report section 8 exists and names this row (read); no commit since touches it. Overlap with 770: siblings, both name each other.

## 893: rewrite
- present meaning FAIL: "At 4d27fbcc5 walk refused the program at load ...; since rung W it loads" is a repair story; evidence: pin at aee91971e (not in base history) re-pinned at c124c6b65 (lines unchanged); `changes.tex:4105-4106` widened to `:4105-4110`, which holds the extender rule's message (read). The XXX walk test ran in the holding gate, so it still fails as asserted. Consistency pass (FACTS 226).
- Dropped: the earlier refusal message at 4d27fbcc5 (home: history, and row 804, FIXED).

## 894: rewrite (CONTESTED, status kept)
- present meaning FAIL: "walk loads it since rung W"; evidence: pin at aee91971e (not in base history) re-pinned at c124c6b65 (unchanged, holds). Others pass.

## 752: rewrite
- present meaning FAIL: "climb batch 18 rung X"; evidence: pin at e8a842d97 (not in base history) shifted +2, `throughParent` at `:308-317` at base (read). NEGATIVE-VERIFIED beside `silent`: status kept; silent.txt says `choice`.
- Dropped: "climb batch 18 rung X" (home: history).

No duplicates, closes or measures; no cross-chunk pairs.
