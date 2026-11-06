# c19 check (base c124c6b65)

`mech.py` ran: 10 lines, 0 failing; the chunk applies on copies of the ledger and `ledger.py check` (with and without `--base`) exits 0. Read: `assessment.md`, `rows.rewrite`, `questions.md`, `cold-read.md`, every `evidence/N.md`; `closes.txt`, `dups.txt`, `pairs.txt`, `silent.txt` are empty. Checked at the base: `OverloadSet.java:2574-2578`, `CodeGen.java:3212`, `:4375`, `:4666`, `:6897`; the tests `XXXGenericBesidePlainReturnRule.fss`, `XXXGenericFunctionalMethodBesidePlainWalk.fss`, `XXXGenericTraitFunctionalMethodsNestedWalk.fss`, `MethodStaticArgOverloadedReceiver.fss`, `MethodStaticArgDeclaredDomain.fss`, `GenericFunctionalMethodSelfSecondLink.test` exist; `rung-walk-instance/SKEPTIC.md` section 4 rows 132-133 name `SkFnMethPlain` and `SkFnMeth`; `2b1cd8e63` is in the base's history and types the library's generic `distribute`; `528438ac5` ("PLAN, BOOT.md: batch 16 spliced ...") and `db8fecd22` ("Batch script: climb batch 18's manifest spliced in") are revival commits; `generic-distribute/REPORT.md` section 7 line 84; the template's status words (ledger lines 15-17).

## 565: FAIL
- Cold read: the claim's "or in an object of an instance" is garbled (the reader could not resolve it; SKEPTIC.md:133 says "overridden in an object of `Holder[\String\]`").
- Correction: in the claim replace "or in an object of an instance" with "or in an object that extends an instance of it" (row 1168 characters, claim 231).
- Otherwise pass: pin holds (`NamingCzar.genericMethodName` at `CodeGen.java:3212`); dropped `SkFnMeth.fss` (never tracked) and the SKEPTIC short path are kept as probe `SkFnMeth` with the whole path; story "since row 567's fix" gone; siblings 594 correct.

## 594: pass
- Pin holds; dropped `compile-ladder/rung-walk-instance/SKEPTIC.md` is kept with its `explorations/` prefix; "since climb batch 9 rung W" removed. The cold read's Link-test doubt resolves: `GenericFunctionalMethodSelfSecondLink.test` exists beside the XXX test (not a failure; may be named if room).

## 724: pass
- Pins re-read at the base (`OverloadSet.java:2574-2578` holds the cast; `CodeGen.java:4375` forObjectDeclPrePass, `:4666` call, `:6897` declaration). Dropped `:6652`, `CodeGen.java:4391`, `OverloadSet.java:2575-2578` are stale pins, replaced; "The same on the base" has its home in the history. Moved before "Walk stops at load", "The same in a trait that an object extends" reads as the same crash.

## 315: question pass, one outcome FAIL
- Narrow, absolute commands, runs from the main tree. Outcome "Compiles and runs" gives two ends ("close ... with the commit the prober finds by bisect", "or keep it open as `NEGATIVE-BOUNDED`") and asks for a bisect.
- Correction: replace that outcome's last sentence with "If that also runs, close the row with test `none`, the notes giving both commands and their output at c124c6b65; no bisect." Its first-outcome mapping stands.

## 545: question FAIL (command form)
- "Paths and commands, from the main tree, in a scratch folder: `bin/fortress walk SkFnMixedTop.fss`; `bin/fortress compile ... && bin/fortress run SkFnMixedTop`": `bin/fortress` is relative, so it does not run from a scratch folder.
- Correction: "In a scratch folder holding `SkFnMixedTop.fss`: `/home/user/fortress/bin/fortress walk SkFnMixedTop.fss`; `/home/user/fortress/bin/fortress compile SkFnMixedTop.fss && /home/user/fortress/bin/fortress run SkFnMixedTop`."
- Also outcome 1 gives two ends for 492 ("dropped ... or kept as ..."). Correction: "siblings: 492 dropped (492 is FIXED)".
- Otherwise pass: `CONTESTED` matches the template (line 15: `NEGATIVE-VERIFIED` means the specification settles it; the row says it does not); the program follows the row's claim.

## 539: FAIL
- Nothing lost / cold read: "Compiled: row 537." drops what the old line said, "Compiled, the checker accepts the set and the run dies (row 537)"; the reader could not tell whether the compiled path accepts or refuses.
- Correction: replace "Compiled: row 537." with "Compiled, the checker accepts it and the run dies (row 537)."; to stay within 1,200, delete " over an array list and a list" from the claim (the cold read also stumbled on it; the three declarations name the types). Row 1197 characters, notes 694.
- Otherwise pass: `matchApart` :1374, `genericMeetCovered` :1251, `domainsExcludeTogether` :1006 hold at the base; dropped `:1294`, `:936`, `:1171` are stale pins; batch 18 and 19 refused notes are in; 4c4b14c23 is not a fix.

## 550: pass
- `validOnDeclaredDomains` :772 and `returnRuleAtEveryInstance` :1165 hold; dropped `:790`, `:1085` stale; `tests/XXXGenericBesidePlainReturnRule.fss` kept with its full path. The cold read's XXX doubt resolves from the test's own comment ("Must be refused at load"): the guard's refusal is its expected failure.

## 723: pass
- Pins `GenericMethod.java:149`, `:144-145`, `OverloadedFunction.java:163` hold; dropped `:161` stale; the `317fc0ef5` pin (not in the base's history) dropped, observation kept. `Ping` and `Pong` are two unrelated objects in the test (it says their types exclude); the reader can resolve it from the test.

## 744: FAIL
- Fidelity: "and the team's tree stops so too" replaces "The same on the base 528438ac5", but 528438ac5 is a revival commit (PLAN, BOOT.md: batch 16), not the team's tree; the team's meeting of the error is already "the team met it in 2009 (`Library/Generator2.fss:75-76`)".
- Cold read: "Compiled, the call runs the plain method" was read two ways; REPORT.md section 7 (line 84): the compiled dispatch sends the explicit `[\L1\]` call to the plain overload.
- Correction: replace "the team met it in 2009 (`Library/Generator2.fss:75-76`), and the team's tree stops so too." with "the team met it in 2009 (`Library/Generator2.fss:75-76`)."; replace "Compiled, the call runs the plain method." with "Compiled, the explicit call runs the plain overload." Row 1122 characters, notes 670.
- Otherwise pass: `DottedMethodApplication.java:130` holds; `cdd25b95d` replaced by its landed form `2b1cd8e63` (in the base); dropped `Any` belongs to the base before 2b1cd8e63, home in the history; `MethodStaticArgOverloadedReceiver` exists in `ProjectFortress/tests/`.

## 760: pass
- Pins `GenericMethod.java:149`, `OverloadedFunction.java:163` hold; the call site now named by file; dropped `:161`, `GenericMethod.java:137` stale.

## 779: pass
- `genericPairValid` :960, `instanceHolding` :2573, called at :967-968 hold; `5c5dee93d` and the batch 18 message story dropped (history keeps them); dropped `OverloadedFunction.java:2332` stale. "The two are own generics" is loose but the declarations show it.

## 780: FAIL
- Present: "The same on the base db8fecd22." is a measurement on a past batch base (db8fecd22: "Batch script: climb batch 18's manifest spliced in"), the kind the writer itself dropped from 724 and 744; history keeps it.
- Cold read: the receiver `H[\ZZ32\]` is not introduced, and the expected result is not stated. The test: `object H[\S\]() extends Holds[\S\]`, and `which(h, Circle)` must give "round".
- Correction: delete " The same on the base db8fecd22."; replace "the receiver, `H[\ZZ32\]`." with "the receiver, `H[\ZZ32\]`, an object extending `Holds[\S\]`; the test expects "round"." Row 1098 characters, notes 581.
- Otherwise pass: `5c5dee93d` (not in the base) dropped.

No closes, duplicates, pairs or silent rows to check; the writer's "no duplicates" reasons (723/760 functional vs dotted, 723/724 and 779/780 path or trait kind) hold.
