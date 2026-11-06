# c19 assessment (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. Beyond the evidence files I read: `CodeGen.java` (functionalMethodWrapper :3127/:3134, :3212, forFnExpr :3506-3531, forObjectDeclPrePass :4375, generateTopLevelOverloads :4666/:6897), `NamingCzar.java:885-893`, `OverloadSet.java:2574-2578`, `OverloadedFunction.java` (finishInitializingFirstPart :149, calls :163/:171, validOnDeclaredDomains :772, genericPairValid :960, domainsExcludeTogether :1006, returnRuleAtEveryInstance :1165, genericMeetCovered :1234/:1251, matchApart :1374, instanceHolding :2573), `GenericMethod.java:137-149`, `DottedMethodApplication.java:125-131`, `XXXOverloadExistentialMeetWalk.fss`, `rung-return-type-rule/SKEPTIC.md` lines 94-146, and `git merge-base --is-ancestor` for each pinned commit: 317fc0ef5, 5c5dee93d and cdd25b95d are not in the base's history (their landed forms, by subject: 59b1d0a4d, 5262a2412, 2b1cd8e63).

## 545: measure
- scope pass; present meaning FAIL: both messages measured at climb batch 7b, before walk's load check (6d187d069, 14e91723f) and the checker's overloading check (59b1d0a4d, 64fa505c4, 108ab82d6) changed; evidence FAIL: reproducer `none`, probe not whole in its SKEPTIC.md; comprehension pass; ownership pass; consistency FAIL: "the specification does not settle which rule governs it" with status `NEGATIVE-VERIFIED` (the template's word for unsettled is `CONTESTED`); `siblings: 492` names a FIXED row; pins `OverloadingChecker.scala:580-584`, `:617` now land on memo code.
- Only a run can say what each path does now: `questions.md`, with the line each outcome gives.

## 565: rewrite
- scope, present meaning, comprehension, ownership pass; evidence FAIL: "`SkFnMeth.fss`" cites a path that never was tracked; consistency: `CodeGen.java:3212` still holds the `genericMethodName` call inside `functionalMethodWrapper` (pinned now at c124c6b65); "Walk runs both since row 567's fix" is a repair story.
- Change: probe named `SkFnMeth` with its full SKEPTIC path; pin at the base; `siblings: 594` added (594 points here). Dropped: nothing.

## 594: rewrite
- evidence pass (XXX compiled test); consistency FAIL: "Walk runs it since climb batch 9 rung W" (story); no `siblings:` though 565 and 724 name it.
- Change: `siblings: 565, 724`; "Walk runs it."; pin at the base; probe path made whole. Dropped: the batch name (history keeps it).

## 724: rewrite
- evidence FAIL: pin 317fc0ef5 not in the base's history; `CodeGen.java:4391` and `:6652` now blank lines (forObjectDeclPrePass at :4375, call :4666, declaration :6897); OverloadSet's lines hold at :2574-2578.
- Change: pins re-read at c124c6b65; siblings 779, 780 added (both cite 724's compiled failure); "The same on the base." dropped (a measurement of the team's tree; history keeps it).

## 315: measure
- present meaning and evidence FAIL: the reproducer `ProjectFortress/tests/ConditionalOpTruncation.fss` is a plain walk test that passes, so it does not reproduce the compiled claim (signal repro-plain-settled confirmed: no compiled test names it); the measurement is from ladder rung 4; `CodeGen.java:3486` and `:4852` now land on other code (forFnExpr's class name at :3531 from `NamingCzar.gensymArrowClassName(desc, span)`, :891-892, so the mechanism stands in the source). Whether the checker still inserts two thunks at one position needs a compile: `questions.md`.

## 539: rewrite
- present meaning pass (the gated XXX test still fails as it asserts; the batch 18 and 19 refused notes are already in the line: 'fails the Meet Rule', domainsExcludeTogether); evidence pass; consistency FAIL: pins at d4d454f9d now point elsewhere (`:1294` is a parameter list, `:936` a brace): matchApart is at :1374, called from genericMeetCovered at :1251; domainsExcludeTogether at :1006. FACTS:211, :213, :255 and POSITIONS:42 agree with the row. commit-says-fixed signal 4c4b14c23: a renamed refusal file, not a fix.
- Change: pins re-read and named by function; the compiled half shortened to "Compiled: row 537." (537 holds it). Dropped: nothing else.

## 550: rewrite
- consistency FAIL: `:790` no longer starts validOnDeclaredDomains (now :772); `:1085` (returnRuleAtEveryInstance) is now :1165, and the mechanical check read it against the test file. Batch 18's refused note ('fails the Return Type Rule') is in the claim already.
- Change: pins at c124c6b65; wording cut to fit. Dropped: "For a generic beside a plain declaration" (the claim states that case).

## 723: rewrite
- evidence FAIL: "(at 317fc0ef5)" pins the trait case to a commit not in the base's history; `OverloadedFunction.java:161` is inside finishInitializingFirstPart, the call to finishInitializing is at :163. Batch 17's refused note ("The dotted sibling is row 760") is in.
- Change: pins at c124c6b65, the 317fc0ef5 pin dropped (the trait case's observation stays). Dropped: nothing.

## 744: rewrite
- evidence FAIL: `cdd25b95d` not in the base's history (landed as 2b1cd8e63, "the library's generic distribute ... typed"); "The same on the base 528438ac5" is a commit-tour; batch 17's refused note (the inferred call runs, `MethodStaticArgOverloadedReceiver`) half in ("The inferred call runs.") without its test.
- Change: commit 2b1cd8e63; "the team's tree stops so too" for the base; the inferred call named with its test. Dropped: the hash 528438ac5 (history keeps it).

## 760: rewrite
- consistency FAIL: `GenericMethod.java:137` is now a blank line (paramsToParameters at :149); `(:161)` reads as GenericMethod's, but the call is OverloadedFunction's (:163).
- Change: pins at c124c6b65, the call site named by file. Dropped: nothing.

## 779: rewrite
- evidence FAIL: pin 5c5dee93d not in the base's history; `:2332` now inside another loop (genericPairValid :960, instanceHolding :2573 called at :967-968); consistency FAIL: "Before climb batch 18 rung W the message was ..." is a repair story.
- Change: pins at c124c6b65; the story dropped (history keeps the old message). FACTS:213, :255, POSITIONS:42 agree.

## 780: rewrite
- evidence FAIL: "and on 5c5dee93d", a commit not in the base's history.
- Change: that clause dropped; the rest stands. FACTS:255, POSITIONS:42 agree.

No duplicates: 723/760 differ in the method form (functional vs dotted), 723/724 and 779/780 in path or trait kind, and each names the other in `siblings:`. No pairs for the reconcile run: 565 vs 571 (c23) are different emitters (wrapper class vs a method in an object's class); 539 vs 537 (c23) are the walk and compiled halves already cross-named. No `NEGATIVE-VERIFIED` row beside `silent`.
