# F-43 settled: what the overloading checker's memo does on `main` today

<!-- Settles the dispute between the hand writer's new F-43 (pilot-2/round-1.md) and the clarity workflow's assessor (pilot-workflow/chunks/pilot-1/assessment.md) about whether F-43 is true of the tree, from the code at 63be760519, commit 70d5486f99, rows 562 and 547, and two small compiles. -->

Tree read: `main` at `63be760519`. Every `OverloadingChecker.scala` below is
`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala` (OC).

## Verdict

- F-43 as it stands is false today in its central claim: the memo is no longer keyed on a pair of declarations, and no run since the rekey (70d5486f99, 2026-10-02, row 562 FIXED) has shown it hiding an error. The hand writer was right about that, and about the history.
- The hand writer's new text overstates in two places: "keyed on everything that its check reads" (the check also reads an identity map of exclusion arrows that a later commit, 64fa505c4e, added outside the key), and "a pair valid in one context is not taken as valid in another" (it is, wherever the key is equal; that is the memo's purpose). Its on/off count is of the fix's commit, not of today's tree.
- The assessor was right that the key holds no oracle, and wrong in effect: the oracle is built from the static parameters in scope, which the key holds. The workflow wrote no text for F-43 (`proposals.md` and `final.apply` hold no F-43). Row 547 cannot come from this memo, which is made per compilation unit.

## 1. The old F-43, sentence by sentence

Old text (`FACTS.md:48`):

| # | Sentence | Verdict | Evidence |
|---|---|---|---|
| 1 | "The overloading checker's memo hides some errors, and which ones changes from one build of the checker to another, so the gate's checker count and distance run with the memo off." | **False** for "hides" and "changes from build to build" (unsupported today at best); **true** that the gate's stages run with it off | The build-to-build drift came from the pair key, `(fnal1.get, fnal2.get)`, which 70d5486f99 removed (diff: `-            val key = (fnal1.get, fnal2.get)`). Today's key: OC:580-581, :592-593 (section 2). No run on record since then shows a hidden error; my two compiles (below) refuse with the memo on and off. Stages: `explorations/coordinator/tools/checker-count/run.sh:79` `OVERLOAD_CACHE=false`, `:96`; `explorations/coordinator/tools/distance/run.sh:86` `-Dfortress.analyzer.overload.cache=false`. The "so" is now a habit, not a cause. |
| 2 | "The memo keeps a "valid" verdict per pair of declarations." | **False** for "per pair"; "keeps only valid" is true | OC:580-581 key type `(ArrowType, Option[Int], ArrowType, Option[Int], Set[(ArrowType, Option[Int])], Boolean, List[StaticParam])`; OC:599 `if (result) validOverloadingMemo += (key -> result)` stores only `true`. |
| 3 | "A pair that several traits inherit is checked once per trait, at that trait's instantiation, in hash-set order, so a pair valid for one trait is taken as valid for the next (`perf-probes/nat/triage.md` section 1)." | First clause **true**; "so ... taken as valid for the next" **false**: it is reused only where the instantiated signatures, the other signatures, the kind and the static parameters are all equal | Loop: OC:376 `for ( t <- toSet(typesInComp.keySet) ...)`, each trait's arrows instantiated by its replacer, OC:176-177 `replacer.replaceIn(...)`. Key holds the instantiated arrows, OC:592-593. The cited triage section reads the base key at `:452`, before 70d5486f99. |
| 4 | "The memo is on by default (`OverloadingChecker.scala:79`), so an ordinary `fortress compile` can miss these errors." | "On by default" **true**; "can miss these errors" **unsupported** today | OC:79 `ProjectProperties.getBoolean("fortress.analyzer.overload.cache", true)`. No compile on record since the rekey misses one; see section 2 for the one input that the code reads and the key does not hold. |
| 5 | "The JVM property `-Dfortress.analyzer.overload.cache=false` turns it off; the gate's checker count and distance stages set it." | **True** | OC:79, :591; the two scripts above. |

The stages' own header comments still give the old reason, "keyed on declaration pairs ... hides 27 to 35 errors depending on the build order": `checker-count/run.sh:44-47`, `distance/run.sh:39-42`. They are stale in the same way as F-43.

## 2. The key, what the check reads beyond it, and order

**The key** (OC:592-593), read in the code:

```
val key = (first._1, first._2, second._1, second._2,
           signatures.map(s => (s._1, s._2)).toSet, isMethod, staticParamsInScope)
```

The two signatures as instantiated in the context, their `self` positions, the set of every signature of the context with its position, whether they are dotted methods (`isMethod`), and the static parameters in scope (set OC:386, reset OC:426). Equality is structural and ignores spans: `ArrowType.equals` compares info, domain, range, effect, io and method info (`ProjectFortress/src/com/sun/fortress/nodes/ArrowType.java:96-123`), and `TypeInfo.equals` compares only static parameters and where clause (`nodes/TypeInfo.java:58-72`), not the span. So two contexts with structurally equal inputs share an entry. The memo is a field of the checker, and `StaticChecker.java:275` makes a new `OverloadingChecker(index, env)` per compilation unit, so no entry outlives a unit.

**What `validOverloadingInner` (OC:606-623) reads that the key does not hold:**

1. **The oracle `oa`.** Not in the key, as the assessor and the third reader say. But at every call site the oracle is a function of what the key holds, within one checker: at the top level it is `globalOracle` (OC:76, `new OverloadingOracle()(typeAnalyzer)`, passed at OC:311, :337, :367) with `staticParamsInScope = Nil` and `isMethod = false`; in a trait it is `new OverloadingOracle()(typeAnalyzer)` (OC:387) after `typeAnalyzer = typeAnalyzer.extend(toListFromImmutable(traitOrObject.staticParameters), None)` (OC:384-385) and `staticParamsInScope = toListFromImmutable(traitOrObject.staticParameters)` (OC:386), with `isMethod = true`, and the analyzer is restored after (OC:425). `TypeAnalyzer.extend` is `new TypeAnalyzer(traits, env.extend(params, where))` (`scala_src/types/TypeAnalyzer.scala:1104-1105`), the trait table is the checker's own, and `OverloadingOracle` holds no state of its own beyond its analyzer (`scala_src/overloading/OverloadingOracle.scala:41`). So two contexts with equal keys have equivalent oracles, and a top-level answer cannot be reused in a trait (`isMethod` differs). **Read in the code.**
2. **The declarations `first._3`, `second._3`**, read by `functionalMethodsAtOnePosition` (OC:648-652) only when `!isMethod`. There, a position is `Some` exactly for a functional method (OC:133-135), and the position is in the key. So this adds nothing. **Read in the code.**
3. **The exclusion arrows**, `forExclusion(fa)`, `forExclusion(ga)` (OC:621), from `exclusionArrows`, a `java.util.IdentityHashMap` keyed by the plain arrow's identity (OC:566-579). It holds, for a functional method of a trait whose self type comes from its F-bound, the arrow built from the declaration's own parameters with its `TraitSelfType`. Commit 64fa505c4e (2026-10-23, "The overloading check's exclusion test reads a self-typed trait's self ...") added it three weeks after the rekey, and left the key and its comment ("a valid answer is reused only where all of these are equal", OC:553-555) as they were. If two contexts have structurally equal plain arrows whose own (self-typed) arrows differ, a `true` from the first would be reused in the second without its exclusion test. I found no way to build such a pair: equal plain arrows put `self` at the same trait type, and a functional method's own parameters come from its declaration in that trait. **Inferred from the code; not shown by any run, and not ruled out.**

**Can a verdict depend on order?** Only through input 3, and only if such a pair exists. No run on record shows it after the rekey:

- Rung O's evidence on the fix (`compile-ladder/rung-overloading-checker/REPORT.md` section 7): `XXXFunctionalMethodMeetBetweenTraits` refused in all four declaration orders with the memo on and off; the count stage gave 89 with the memo on and off, "identical output once sorted and stripped of timings". That count is of the first pass's edit, `bf759afcbf` (2026-10-02), and "the repair round's edit does not touch the memo"; it predates 64fa505c4e and every later checker change (`git log 70d5486f99..HEAD -- OC` lists 10 commits). **A run on record, of that commit, not of today's tree.**
- The harness compiles with the memo on (no test or build file sets the property: `grep -rn "overload.cache"` finds it only in OC:79 and in `explorations/` scripts), so `compiler_tests/XXXFunctionalMethodMeetJoinOfClosedTraits`, row 562's reproducer, gates the memo-on refusal at every gate.
- My two compiles today, at `63be760519`, of a copy of that test and of a copy with `Left` and `Right` swapped, each with the memo on and off (command below): all four print the same refusal and exit 255.

```
## XXXFunctionalMethodMeetJoinOfClosedTraits cache=true
    Invalid overloading of side in trait Join:
File XXXFunctionalMethodMeetJoinOfClosedTraits.fss has 1 error.
## F43JoinSwapped cache=true
    Invalid overloading of side in trait Join:
File F43JoinSwapped.fss has 1 error.
```

(cache=false gave the same lines for both.) Command, from `tmp/f43/` with the skill's call setup:
`JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$TMPDIR -Dfortress.analyzer.overload.cache=$c" $FORTRESS_HOME/bin/fortress compile $p.fss`.

**Row 547** ("the compiled checker's verdict on an overload set can depend on the components compiled before it in the same JVM", CONTESTED) is not evidence for F-43: this memo is made per compilation unit (`StaticChecker.java:275`), as the row's own note and REPORT.md section 7 say, and the row's note records that at c124c6b65 `fortress junit` refuses `SkFnBetween` alone and after `CoverageReturnGood.test`. Whatever state row 547 saw carried across units lives elsewhere.

## 3. The new texts and F-80

**The hand writer's new F-43** (`pilot-2/round-1.md`, "F-43, the scenario's entry"):

| Sentence | Supported? |
|---|---|
| Title: "keyed on everything that its check reads" | **No.** The check also reads the exclusion arrows (OC:621, :566-579), not in the key. True in effect at 70d5486f99, before 64fa505c4e. |
| Title: "so a pair of declarations valid in one context is not taken as valid in another" | **No, as worded.** It is taken as valid in another context whose key is equal: that is the reuse REPORT.md section 7 kept ("a pair inherited unchanged by many types without static parameters"). True for a context whose key differs, e.g. the top level against a trait. |
| Title: "the gate's checker count and distance run with the memo off all the same" | **Yes**: `checker-count/run.sh:79`, `distance/run.sh:86`. |
| "The key holds the two declarations' types as instantiated ..., with their `self` positions, the set of the other declarations there, whether they are dotted methods, and the static parameters in scope (row 562, the fix)." | **Yes**: OC:592-593. ("The set of the other declarations" is the set of all the context's signatures, the pair's own included; harmless.) |
| "The memo is on by default (:79); the JVM property ... turns it off, and the gate's two stages set it." | **Yes.** |
| "After the fix the count stage gave the same errors with the memo on and off, in one measurement." | **Yes, but of the fix's commit** (`bf759afcbf`, 89 both ways), not of today's tree; it should say so. |
| Detail pointer to REPORT.md section 7 | **Yes.** |
| Its reasons: "rekeyed the memo on everything that its check reads"; "The tree's key holds the four inputs (:580-600)" | The first is true of 70d5486f99, not of `main`; "four" undercounts the key's parts (seven, five kinds). |

**The workflow's text:** none. The assessor marked F-43 "investigate" (`assessment.md:21`, :122-129) and wrote no proposal; `proposals.md` and `final.apply` hold no F-43. Its consistency finding, "the key ... [holds] not the `OverloadingOracle` `oa`, the trait-dependent input", is literally true and wrong in effect (section 2, input 1). Its question's second branch, "did a change to the key make F-43 stale?", is the answer: yes, 70d5486f99.

**F-80's sentence**, "The checker's overloading memo is keyed on all the inputs of the check, so a pair accepted at the top level is not reused unchecked in a trait that provides it": the consequence is **supported** (the key's `isMethod` is `false` at the top level and `true` in a trait, OC:593, :311/:367 against :417/:419). "Keyed on all the inputs" **overstates**, as the third reader says, but not for the oracle, which the key fixes; for the exclusion arrows (input 3). Smallest fix: "The checker's overloading memo keys a verdict on whether the pair is of dotted methods, among its other inputs (F-43), so a pair accepted at the top level is not reused unchecked in a trait that provides it."

**Corrected F-43**, claiming no more than the evidence shows:

> F-43 **The overloading checker's memo reuses a "valid" verdict only between contexts with the same key, and the gate's checker count and distance run with it off.** The key holds the pair's two signatures as instantiated where it is checked, with their `self` positions, every signature of that context, whether they are dotted methods, and the static parameters in scope; each context's oracle is built from those static parameters, so the key fixes it (row 562). The exclusion test also reads a self-typed trait's own signatures, which the key does not hold; no run has shown a hit that this makes wrong. The memo is on by default (`scala_src/typechecker/OverloadingChecker.scala:79`); the JVM property `-Dfortress.analyzer.overload.cache=false` turns it off, and the gate's two stages set it. At the fix, the count stage gave the same errors with the memo on and off, in one run; no run has compared them since. Gated by `compiler_tests/XXXFunctionalMethodMeetJoinOfClosedTraits`, which the harness compiles with the memo on. Detail: `compile-ladder/rung-overloading-checker/REPORT.md` section 7; `coordinator/postmortem-2026-11-24-record-regrowth/evidence/pilot-2/f43-settled.md` section 2.

**Still to investigate:**

1. One count stage, or one distance stage, of today's tree with the memo on, compared with the gate's memo-off run (`OVERLOAD_CACHE=true` in a copy of `checker-count/run.sh`, as rung O's `run-memo-on.sh` did). Not run here: the brief forbids a stage.
2. Whether two contexts can have equal plain arrows and different exclusion arrows (input 3). Either build one, or close the gap in the code by putting `forExclusion(first._1)` and `forExclusion(second._1)` in the key; the latter is a checker edit with its own test and audit (`compiler.md`, the checker-change steps 1-6).
3. The stale header comments of `checker-count/run.sh:44-47` and `distance/run.sh:39-42`.
4. Row 547's carried state, which is not this memo.

## Defects

None measured. Input 3 is a gap read in the code, with no program that shows it, so it has no ledger row; item 2 above says how one would be shown.

## Decisions

- I read "the two new texts of F-43" as the hand writer's text and the workflow's; the workflow wrote none, so its assessor's finding is judged in its place.
- I judged "keyed on everything that its check reads" against the code on `main`, not against 70d5486f99, since the curator's question is whether the entry is true of the tree today.
- I ran two compiles of one program (and its swapped copy) to check the memo-on refusal at `63be760519`; nothing more, and no stage.

## Points to report

None named by the brief beyond the three questions.

## For FACTS

- F-43 is wrong today, with the evidence of sections 1 and 2; the corrected text is in section 3.
- F-80's "keyed on all the inputs of the check" overstates; the smallest fix is in section 3.

## Commands

- Probe compiles: from `tmp/f43/`, with the skill's call setup, `JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$TMPDIR -Dfortress.analyzer.overload.cache=<true|false>" $FORTRESS_HOME/bin/fortress compile <P>.fss`. The JVM property reaches the checker through `JAVA_FLAGS` (`bin/fortress:28-31`).

## Questions for the curator

- Decision not taken: whether to drop the memo, as rung O's option (a), since its measured benefit was nil (REPORT.md section 7), or to add the exclusion arrows to its key. Alternatives: (a) delete the memo and its switch; (b) extend the key with `forExclusion` of both arrows; (c) leave it, with F-43 saying what the key does not hold. Evidence: section 2, input 3.
