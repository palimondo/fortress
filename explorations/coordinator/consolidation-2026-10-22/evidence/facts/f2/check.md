<!-- The clarity workflow's check of FACTS chunk f2 (F-25, F-26, F-27, F-29, F-32, F-34, F-35, F-37, F-39): each rewritten entry against the record's text and its sources, and the cold reader's answers against the source meaning. -->

# Check, FACTS chunk f2

Read for each entry: the record's text (`facts-extract.sh 'F-N'`), its history (`'history:F-N'`), `assessment.md`, the writer's `proposals.md` and `concepts.md`, the cold reader's `cold-read.md`, the report sections that the entry cites, and the code, tests and ledger rows that it names. The tree is `main` at `ef0bbbf17`. Three things were measured here, read-only, with scripts in the session's scratchpad. First, a count of live `builtinPrimitive` bindings that strips nested comments. It reproduces the note's 424 at `e455ccd98`. Second, a test of whether given lines of a file lie inside a comment. Third, `git grep` for `opr` static parameters. Nothing tracked was changed.

| Entry | Result |
|---|---|
| F-25 | pass |
| F-26 | wording: a dropped condition on the second dispatch, and three wordings |
| F-27 | wording: a stronger claim, a dropped condition and a misleading gloss of P-46, all fixable in words; concept: the POPL 2019 paper |
| F-29 | wording: three, one of them reversing the dependency of rows 595 and 596 |
| F-32 | uncertain fidelity, settled: 24 bindings came after the count, not 5; wording: two |
| F-34 | uncertain fidelity, settled: two (a probable cause stated as fact, an unmarked inference); concept for this entry alone: `AsIfExpr`, `LetFn` |
| F-35 | uncertain fidelity, settled: 9 declarations, not 8, and "body" holds for the api only; wording: three |
| F-37 | pass |
| F-39 | uncertain fidelity, settled: the fix was measured on a probe, not on the gated test; wording: three |

## F-25

**Fidelity.** It holds. The rewritten entry agrees with `InstantiatingClassloader.java:178-183` (`synchronized (getClassLoadingLock(name))` around the whole of `loadClass`). It agrees with report section 1, item 1: 5 of 5 failures at `FORTRESS_THREADS=4` before the lock, `NullPointerException ... "cl" is null`, and 5 of 5 passes after. It agrees with `compiler_tests/FirstLoadThreadsRungG.fss`: `f[\T\](v: Vt[\T\])` at `Vt[\A1\]` to `Vt[\A8\]`, from a parallel `for` of 800 iterations. And it agrees with `gate.md`, "The atomic runs", which lists the test and runs each program three times at four threads. "Loads each class under the JDK's class-loading lock" is no broader than the old "takes its first load of a name under" the lock, since every load goes through `loadClass`. The title keeps the evidence's four threads.

**Comprehension.** The reader's account matches the source. The reader left two points open. One: whether "four threads" bounds the claim. It names the measured case, and the title is right to keep it. Two: whether "eight instances" means eight calls.

**Optional wording, not a failure.** "calls the generic overload `f[\T\](v: Vt[\T\])` at eight instantiations, `Vt[\A1\]` to `Vt[\A8\]`, from a parallel `for` loop of 800 iterations".

## F-26

**Fidelity.**
- Title, the two conditions, "static parameters of its own", the declared domain: these hold. They agree with `moreSpecificDeclaration` (`OverloadedFunction.java:2536-2543`), `ownGeneric` and its comment (`:2440-2451`), and report section 5.1.
- The cache-key sentence holds: `GenericComparer` (`GenericFunctionOrMethod.java:44-72`) compares the name, the static parameters, their kinds and their bounds, and row 478's note reads "a `where` clause is still not in the cache key ..., reached by no test or library declaration".
- **A dropped condition.** "If the chosen instance takes an argument only by a conversion, walk converts it and dispatches again". The old text said "A generic instance chosen by converting an argument dispatches again". The source makes the second dispatch generic-only. Report section 5.2 says "A generic declaration chosen is still instantiated again ... when that instance does not take the arguments without a coercion, `convertedCall` ... returns a `Coercions.CoercedCall`". The code is `bestMatchInternal`, `if (reinstantiate && best_generic != null)` (`:2331`). "The chosen instance" no longer says that the declaration is generic. The cold reader asked whether the second dispatch applies to every walk call.

**Comprehension.** The reader's account matches the code except on the points below. The reader asked four questions:
- what happens where neither declared domain lies inside the other, or both do;
- what F-253 says;
- whether "It does not" means no conversion or no second dispatch;
- how wide the second dispatch is.

Each comes from the wording. The answers are in the sources: the instances decide (report section 5.1, "Where the declared domains do not order two candidates, the instances decide as before"); and the chosen instance is kept (section 5.2, "Two cases keep the promoted instance").

**Failures, class wording.**
1. For the dropped condition: "If the chosen declaration is generic and its instance takes an argument only by a conversion, walk converts the argument and dispatches the converted arguments again, so the most specific declaration for the converted values runs."
2. "It does not for an overloaded method, or where `Coercions.coercionFor` finds no conversion, as for a tuple converted element by element." Proposed: "In two cases walk keeps the chosen instance, with no second dispatch: an overloaded dotted method, and a position whose conversion `Coercions.coercionFor` does not find, such as a tuple converted element by element." Source: section 5.2; `convertedCall`, `:2421` and `:2432`.
3. "In every other case" follows the definition of the declared domain, and the reader lost what it refers to. Proposed: "Where neither declared domain lies inside the other, where each lies inside the other, or where neither declaration has static parameters of its own, walk compares the domains of the instances that the call makes: so ...". Source: `moreSpecificDeclaration`, its fall-through to `FTypeTuple.moreSpecificThan`.
4. "a generic dotted method follows F-253" gives the pointer no words, against the writer's brief, step 6. Proposed: "a generic dotted method by F-253 (walk's dotted calls of generic methods, also chosen on declared domains)".

## F-27

**Fidelity.**
- The correction holds. Coverage is per part. That agrees with `overlapCoveredBy` (`:1623-1632`): "every combination of parts across the positions lies inside the domain of one such declaration". It agrees with report section 5.4, "a covering family". It agrees with P-60, "several declarations below both serve, if together they cover the meet". And the history agrees: the text of 2026-10-17 19:33Z, "only if one declaration below both covers all of it".
- **A claim made stronger.** The rewrite says: "A generic declaration beside a plain one needs the same cover where neither declared domain lies inside the other." `validOnDeclaredDomains` accepts such a pair also where the two declared domains exclude each other read whole: `return genericOverlapCovered(gen, plain, all) || domainsExcludeTogether(gen, plain)` (`:794`). F-258 records this: "the Meet branches of `genericPairValid` and of `validOnDeclaredDomains`'s generic-beside-plain reading also ask `domainsExcludeTogether`". Report section 5.3 was written before that change. The cold reader drew the stronger conclusion: "Each piece of the overlap must be covered ..., or walk refuses the program."
- **The title made stronger.** The old title was "reads a generic declaration beside a plain one on declared domains ... where its parameter-by-parameter check refuses". The rewrite says "accepts two kinds of overload pair that its parameter-by-parameter check refuses". The source accepts only some pairs of each kind:
  - Equal declared domains are refused (`:789`, `NO_DUPLICATES`; F-252).
  - A domain inside the other passes only under the Return Type Rule: the inner one's return type below the outer one's (`:790-793`; report section 5.3).
  - Neither of these conditions is in the entry.
- **A dropped condition.** The rewrite says "two plain declarations whose overlap other declarations cover through `comprises` clauses". The cover is for top-level functions only. `overlapCovered` returns false for a dotted method (`MethodOverload`, `:1606`) and for a functional method (`getSelfParameterIndex() >= 0`, `:1610`). Report section 5.4 says: "The search is not used for functional or dotted methods, whose Meet Rule is another." Neither the old text nor the rewrite says so. The rewrite's "two kinds of overload pair" invites the broader reading.
- **A misleading gloss.** "P-46, the choice on declared parameter types". P-46's decision is "A conversion only makes a call possible: it never changes which declaration runs when one already fits". This check is that decision's item 4: report section 5.3's heading is "(the conversion decision's item 4)". The gloss is P-45's content. The cold reader could not tell P-45 from P-46.

**Comprehension.** The reader's account matches, except where the entry's wording above misled. The reader's "Could not resolve" items: P-45 against P-46 is the gloss above. "The same rules (F-252)" is a bare pointer. "The POPL 2019 paper" is a concept. "Lies below both" was read correctly.

**Failures.**
1. Wording, for the title: "Walk's load check reads again two kinds of overload pair that its parameter-by-parameter check refuses, and accepts those that pass: a generic declaration beside a plain one, read on their declared domains, and two plain top-level functions, not methods, whose overlap other declarations cover through `comprises` clauses."
2. Wording, for the generic-beside-plain rule: "A generic declaration beside a plain one passes where one declared domain lies strictly inside the other and the inner one's return type lies below the outer one's. Where neither lies inside the other, it needs the same cover, or declared domains that exclude each other read whole (F-258). Equal declared domains are refused (F-252)." Source: `validOnDeclaredDomains`, `:787-795`.
3. Wording, for the gloss: "P-46, by which a conversion never changes which declaration runs when one already fits".
4. Wording, minor: "by the same rules (F-252)" becomes "(F-252: the No Duplicates, Return Type and Meet Rules, each over its own instances)".
5. Concept: the POPL 2019 paper. Every worker needs it: `revival-changes.md` cites it four times, and FACTS and row 539 cite it. Only `references/exploring.md` names its extract: "the POPL 2019 paper on symmetric multiple dispatch (`research/extracts/ParkPOPL2019-extract.md`)". Define it in the `fortress-repo` core, beside the team's papers. The entry can add row 539's page, "(p. 11:13)".

## F-29

**Fidelity.**
- These hold, against `rung-walk-load-check/REPORT.md` section 5 and the ledger rows:
  - the title;
  - the clauses read, from the main component only (`:1186`);
  - what the check does not read (rows 551, 597, 598);
  - dropping row 549, which is FIXED, with `GenericBesidePlainSameDomain.test` now a plain test;
  - the `XXX` keys, all `load_exception_contains`, green while the program loads and runs clean (`tests-writing.md`).
- **A dependency reversed.** The rewrite says "Two breaches wait for a check that reads the library's clauses". The rows put it the other way. A check that reads the library's clauses would refuse at load every program that imports `Reflect` (row 595, three tests), and four team tests and two demos (row 596). Each repair must come first, and is the curator's. Row 595: "The repair, a library edit before the check reads the library, is the curator's". Row 596: "The repair, a team-test edit, is the curator's". The report's section 5 makes refusing them "a stop of this rung". "Team tests" also drops the two demos.

**Comprehension.** The reader's account matches. The reader worked out that the check would first need rows 595 and 596 dealt with, but not that the repair is the curator's. The reader could not tell which unlisted extenders the specification allows, whether "the program" includes the library, or what row 487 is. Each comes from the wording.

**Failures, class wording.**
1. "or if it is a trait that is closed or generic in the ways that the specification allows" becomes "or if it is a trait whose own `comprises` clause lists only allowed types, or a generic trait that some trait or object of the program extends, each such extender lying below a listed type". Source: report section 5, the three rules (`ineligible`, `BuildEnvironments.java:1200-1223`); `traits.tex:235-252`.
2. "every trait and object of the program" becomes "every trait and object of every component of the program, the library's included" (report section 5, "every trait and object declaration of every component of the program").
3. "Two breaches wait for ..." becomes "A check that reads the library's clauses would refuse at load every program that imports the library's `Reflect` (row 595), and four team tests and two demos whose objects extend `Number` or `Exception` directly (row 596). Their repairs come before that check and are the curator's."
4. Minor: "`XXX` tests of rows 487 (a type of another component below a generic subtrait of a closed trait), 551, 597 and 598".

## F-32

**Fidelity.**
- These hold against `natives-shape.md` section 2:
  - the classes, A 147, B 61, C 138 (139 less the `RR32` binding), D1 36 and D2 42;
  - 424 at `e455ccd98`;
  - the 25 and row 348;
  - `Writer`, `nanoTime`, `getProgramArgsPrim` and `NativeArray`.
- They also hold against PLAN.md:81, "The rest, class D2, waits: `NativeArray` with decision A". "`nanoTime` needs a new helper" is restored correctly from the 2026-10-13 18:38Z text.
- **Settled: 24 bindings came after the count, not five.** The rewrite says: "The count leaves out the five `IntLiteral` conversion bindings, `asZZ32` to `asZZ` in `FortressBuiltin.fss`, added on 2026-10-02." The text of 2026-10-13 also says five, and so does the assessment. But `9d2e4c856` also took away the comment around `IntLiteral`'s 19 arithmetic and bit operators. Its message says it "enables the arithmetic the team's comment withheld". Its diff removes the `(*`, "Do not enable these until coercion is implemented", and the `*)`. The recount that strips nested comments gives:
  - 424 at `e455ccd98`, as the note has it;
  - 448 at `ef0bbbf17`: `FortressBuiltin.fss` 211 → 235, and the other eight files unchanged.

  So 24 bindings came after the count: five conversions and 19 operators, none of them classified. The cold reader concluded "five bindings have been added since". This was not the writer's error: both the text of 2026-10-13 and the assessment have it.
- **Inherited, minor.** "61 with a helper that nothing binds". Class B is "nothing binds it under this name and signature yet". The helper itself may be bound under another name.

**Comprehension.** The reader's account matches, except for the five. The reader asked three things:
- what "a new text" is: the binding's string, renamed to the helper (class A; P-58);
- what the 42 wait for: PLAN.md:81 gives `NativeArray` decision A, and `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path;
- which class `Writer`'s natives fall in: D1.

**Failures.**
1. Uncertain fidelity, settled. In place of "The count leaves out the five ...": "Since the count, `9d2e4c856` (2026-10-02) made 24 more `IntLiteral` bindings in `FortressBuiltin.fss` live: the five conversions `asZZ32` to `asZZ`, and the 19 operators that had stood inside a comment. They are not classified."
2. Wording: "147 that need only a new text (P-58 gives the text)" becomes "147 whose operation the compiler's prelude already binds at the same owner and signature, so only the binding's string changes, to name that helper (P-58)".
3. Wording: "the 42 with no analogue wait" becomes "class D2, the 42 with no analogue, is outside phase 4's rungs: `NativeArray` waits for array decision A, ... (P-85), and `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path (PLAN.md:81)". See also the coordinator's point on `getProgramArgsPrim` below.

## F-34

**Fidelity.**
- These hold:
  - the dates and trees;
  - 326, 225, 4 and the other 221, which is 138 + 5 + 78 (`switch-over-distance-flat.md` section 3, table);
  - the disambiguation and desugaring claims (`prelude/REPORT.md` sections 1-2; `desugar-codegen.md` section 4.2, "Zero diagnostics on the whole library, in both methods");
  - "an artifact" for the 1,417 (report section 1, "This number is an artifact, not a finding").
- **A probable cause stated as fact (inherited).** "The dispatch generator refused 12 of 198 overload sets, each a functional method and a top-level function with one signature". Note section 4 says every one was refused with "apparently malformed overload set not rejected … Probable cause is a functional method and top level function with same signature" (`compiler/OverloadSet.java:408`). The shape is the generator's guess, not a measured fact.
- **An unmarked inference.** "The gate's distance stage does not run code generation, so nothing has measured it since." Note section 5 says only that code generation is not in the stage. `tools/distance/run.sh` runs `DistanceMulti -order check`. A search of `explorations/` for code-generation tables finds only the three September notes, plus `map/compile-path-walkthrough.md`, which cites `desugar-codegen.md` section 5.1. So the record holds no later measurement. That is a search of the record, not a fact about the tree, and the entry states it unmarked.

**Comprehension.** The reader's account matches. The reader did not know whether the 12 sets are among the 225. They are not: they come from a second run, with dispatch generation on, which emitted 325 and refused 228 (note section 4). The reader could not place `AsIfExpr`.

**Failures.**
1. Uncertain fidelity, settled: "The dispatch generator refused 12 of 198 overload sets as 'apparently malformed', its message naming a functional method and a top-level function of the same signature as the probable cause."
2. Uncertain fidelity, settled: "... does not run code generation, and the record holds no later measurement of it."
3. Wording: "In a second run, with dispatch generation on, the dispatch generator refused ...".
4. Concept for this entry alone: gloss `AsIfExpr` and `LetFn` in place, as "two `asif` expressions (`AsIfExpr`, `e asif T`, `Specification/basic/expressions/type-annotation.tex:36`), one local function declaration (`LetFn`)".

## F-35

**Fidelity.**
- These hold:
  - the 8 by name (`FortressLibrary.fsi:1214`, `:1235-1239`, `:1552`, `:1574`, `:1604`, `:1717`);
  - 25 − 17;
  - P-40's "may declare a size that none of its types uses, and pass";
  - the export checker (report section 7, `equalListStaticParams`, by length, name and kind).
- Moving the 2007 and 2008 chronology out of the entry is right.
- **Settled: 9 declarations, not 8.** The three-dimensional `subarray` (`FortressLibrary.fsi:1850-1852`) is live: outside every comment, by the nesting-aware scan. Its declaration is `subarray[\nat bo0, nat so0, nat bo1, nat so1, nat bo2, nat so2, nat o0, nat o1, nat o2\](m0:ZZ32,m1:ZZ32,m2:ZZ32): Array3[\T,bo0,so0,bo1,so1,bo2,so2\]`. `o0`, `o1` and `o2` occur in no parameter or return type.
  - It stood at `:1687-1688` at `bc2f4e5c2`, the census's commit of 2026-09-21.
  - Report section 2's list of 25 lacks it; its static parameters span two lines.
  - So the census then was 26, and today the api has 9 such declarations.

  The writer raised this for the coordinator and kept the measured 8. The record's 8 is the report's measurement, but the entry states it as what the api has. The source settles it.
- **Settled: "body" holds for the api only.** "a size parameter that occurs in none of the declaration's parameter types, return type or body" is the report's rule ("no domain, no range and no body"). An api declaration has no body. The component bodies read the offset as a value: `FortressLibrary.fss:2398-2400`, `boundsCheck = self.bounds.narrowToRange(o::m#s)`. So the offsets are dead only in the api. A diff that deletes them deletes values that the component uses. The writer raised this too.
- **A diff that does not exist yet.** The rewrite says: "A diff that removes the other 8 waits for the curator, with the switch-over's design". Review-queue item 36 says: "Each is put to him as a diff with the switch-over's design, which is not drafted yet." The cold reader read a pending diff: "It holds until the pending diff that removes the remaining eight lands."

**Comprehension.** The reader's account matches, except for the pending diff. The reader saw a conflict between "dead" and "part of the type's identity" in the traits, and could not resolve "PLAN item 12".

**Failures.**
1. Uncertain fidelity, settled: "The `FortressLibrary` api has 9 declarations with a dead size ...: the three one-dimensional `subarray` methods, with `nat o`; the two- and three-dimensional `subarray`, with `nat o0, nat o1` and `nat o0` to `nat o2`; and the traits ... The census of 2026-09-21 found 25 and missed the three-dimensional `subarray`." This is a change of meaning, for the coordinator to take or to send to a recount.
2. Uncertain fidelity, settled: "a size parameter that occurs in none of the api declaration's parameter types or return type". Then, after the list: "The component's `subarray` bodies read their offsets as values."
3. Wording: "Their removal is to go to the curator as a diff with the switch-over's design, which is not drafted (review-queue item 36; PLAN, "Pavol's answers, in the order they are needed", item 12)". The section name is needed, since PLAN.md:52 is also an item 12, "Batch 14", under Phase 3.
4. Wording: "the traits `Rank`, `Indexed1`, `Indexed2` and `Indexed3`, whose `nat n` occurs in no member's type but tells `Rank[\1\]` from `Rank[\2\]`, as `Rank1 extends Rank[\1\]` (`FortressLibrary.fsi:1221`)".

## F-37

**Fidelity.** It holds.
- `size-probes.md` section 4 says: "The test is an `INSTANCEOF` on the value's own class", "the loader fills in the size when it stamps `isOfSize⟦3⟧`", and "The descriptor is not consulted".
- Row 340 is a `typecase` body with coerced clause values.
- `NatRtCase` and `NatRtCaseGen` exist with their `.test` files.
- The census leaves the entry, with its reasons stated in `proposals.md` and kept in the brief's section 5.

**Comprehension.** The reader's account matches the source, with nothing open.

**Optional, not a failure.** "(P-41)" sits after "does not read the size's descriptor", which P-41 does not say. Placing it after "the size's descriptor" would cite P-41 only for the descriptor.

## F-39

**Fidelity.**
- These hold:
  - the two paths and the specification (`opr-kind-history.md` sections 2 and 3: "a compile-time synonym, substituted into the declaring trait's own method names at instantiation"; "Push nulls for opr parameters in the factory call");
  - P-41 ("for each of its static parameters that is not an operator");
  - row 366.
- The library claim holds: `embiggen[\T,opr OP\]` (`FortressLibrary.fsi:2158`, `.fss:3725`) and `Monoid[\ T, opr OPLUS \]` (`.fss:3208`) lie inside comments, by the nesting-aware scan. The assessment was wrong there.
- The nine files hold: `git grep` in the three folders finds `tests/XXXextendOprParam2`, `conditionalExtension`; `compiler_tests/OpParam3`, `OpParam4`, `Compiled10.m`, `XXXOprParamRungS`; `other_compiler_tests/OprPa1`, `OprPa2`, `OprPa3`. Outside those folders, `not_passing_yet/` has four (`MyIdentity`, `XXXextendOprParam1`, `conditionalExtension`, `monoidalPolymorphism`), and `parser_tests/XXXparenOpArg` has one.
- **Measured on a probe, not the gated test.** The rewrite says: "A three-line change to `MethodInstantiater`, measured but not landed, fixes that reproducer". "That reproducer" follows `compiler_tests/XXXOprParamRungS`. `size-probes.md` section 5 measured the change on `compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss`, and says "The gated `XXXOprParamRungS` was not run." The cold reader concluded that whoever fixes row 366 "must promote `XXXOprParamRungS`", as if the change were known to pass it.

**Comprehension.** The reader's account matches, except for the reproducer. The reader could not tell whose descriptor class "its" names. The reader also found "known only at compile time" odd for walk.

**Failures.**
1. Uncertain fidelity, settled: "fixes row 366's probe program of the same shape, `rung-default-rendering/probes/skeptic/SkOprParam.fss`; the gated `XXXOprParamRungS` was not run with it (`perf-probes/nat/size-probes.md` section 5)".
2. Wording: "dies with `NoSuchMethodError` on `Op❮+❯$RTTIc.factory()`, the factory of the instance's descriptor class" (row 366).
3. Wording: "In `tests/`, `compiler_tests/` and `other_compiler_tests/`, nine test files declare one", so that the folders bound the count.
4. Wording, minor: "a name substituted when the declaration is instantiated, on both paths and by the specification; no code reads it at run time".

## For the coordinator

- **F-35: the census missed one declaration.** The writer asked whether the 8 should be 9. Settled above: 9, the three-dimensional `subarray` that the census missed. And the offsets are dead in the api only.
- **F-39: the assessment is wrong on `embiggen`.** The writer's point holds: the declaration lies inside a comment, as `Monoid` does.
- **F-32: the native counts.**
  - PLAN.md:81 says "424 live native bindings on `main` after rung V". Today's tree has 448: the 24 of `9d2e4c856`. The owner question in `proposals.md` ("One owner for the native count") applies to both.
  - Separately, PLAN.md:81 puts class D2 outside phase 4's rungs, but microGPT needs `getProgramArgsPrim`, which is in D2 (natives-shape.md section 2, "microGPT's path"). PLAN names a home for `NativeArray`, but none for this binding.
- **F-27: one more stale point.** Report section 5.3 predates `domainsExcludeTogether` (F-258). Every entry that restates section 5.3's rule for a generic beside a plain declaration may carry the same omission.
- **Not run.** `record.py` was not run on `proposals.apply`, as the writer said. This check edits no entry.
