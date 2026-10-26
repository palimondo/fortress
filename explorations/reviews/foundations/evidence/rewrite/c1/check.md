<!-- The fidelity and comprehension check of chunk c1 of the foundations rewrite (P-26, P-37, P-43, P-42, P-7, P-158), 2026-10-26: each rewritten entry compared with the record's text, the foundations judgement, the curator's words and the cited code and specification, and the cold reader's answers compared with the meaning the sources hold. -->

# Check of chunk c1: P-26, P-37, P-43, P-42, P-7, P-158

Checker, Opus. Read whole: the run's brief (`rewrite-brief.md`), `check.md` (the stage brief), `judgement.md`, `explorations/conversations/02-phase3-exit-foundations.md`, this folder's `proposals.md`, `cold-read.md`, `concepts.md`, `writer-1.log`; `entries.py 26 37 43 42 7 158` and the P-26 scout and audit evidence it names. Checked at source: `Specification/library/structure.tex:15-20`; `WellKnownNames.java:113-116`; `Shell.java:371-386`; `ParkPOPL2019.txt:418`; frozen `types-vals-vars.tex:502` and `Specification/basic/types-vals-vars.tex:580`; frozen `trait-parameters.tex:49-54`; `Specification/basic/trait-parameters.tex:52-65`; `apis.tex:248-257`; frozen `source-code.tex:380-385`; `distance/run.sh:85-87` (twelve); F-18, F-34, F-46, F-166; P-8, P-12, P-25, P-33, P-48, P-77, P-95, P-153, P-155; ledger rows 339, 412, 691, 816; probe REPORT lines 12, 41-61; `prelude-lens.md` lines 48, 66, 136; the coordinator skill's "Three principles" and "consequential"; `exploring.md:14-22`; `git log` of `ExportChecker.scala`'s `equalListMembers`. Not opened: `reviews/foundations/evidence/`.

## P-26

### Fidelity

1. **Dropped without a note: "does not second-guess them".** Old: "The revival does not second-guess them: it knows less than they did." New: "the revival knows less than they did." The clause is his: "So we are not going to re-speculate how to implement the letter of specifications from 2008, which was misinformed." (09-23 07:26:28). `proposals.md` does not list the drop. Wording: "...; the revival knows less than they did and does not second-guess them."
2. **A fact put into his reason.** "the early text was a wish, written before the language ran". He said "The spec was written in a vacuum early on" and placed it "let's say 2009 or something". The interpreter ran programs before the Working Draft's last edit (2010-12), so "before the language ran" says more than his words or the record. Wording: "the early text was a wish, written early and in a vacuum;".
3. **A judgement ground can read as his reason.** After "Why: ...", the next sentences are "What they learned is evidence about the implementation. In the language, the ranking rests on this: ...". These are marked "from the judgement" in `proposals.md`, but in the entry no label separates them from his Why. P-37 and P-158 have such a label. Wording: "Why: [his reason]. That reason is evidence about the implementation. The ground in the language: the Working Draft contradicts itself, ...".
4. **Broader than the source: "and the later texts agree with each other".** The judgement says the later texts are "consistent on the exclusion rule, the three overloading rules and the default bound" (tenet 2). It also names later sources that conflict: the patents' forest rule against POPL 2019, and Naden's `Object` against `Any` (section 4 (e)). The rule sentence ("later texts that agree with each other rank above") is conditional and correct. The closing ground is not conditional. Wording: "and the later texts agree with each other on the exclusion rule, the overloading rules and the default bound."
5. **"Decide by the goal (P-8)" leaves out who decides.** P-8 says "the curator decides by the goal". The coordinator skill counts a choice "where the three principles split or are silent" as consequential. As an order to the coordinator, the new sentence can read as "decide it yourself" (the cold reader saw the same two readings). Wording: "Where two later sources conflict, this rule gives no order: the curator decides by the goal (P-8), and the record says that the goal decided it."
6. **"Never" contradicts two entries that stand.** "a JVM or checker limit never decides what the language says". P-77 sets the library's ranges to `ZZ32` for a JVM reason ("Why: a JVM array has at most as many elements as the largest `ZZ32`"). P-153 rests on the prelude's integer power. The judgement accepts both: P-77 as "his JVM reason, L2 by choice and recorded", and P-153's ground as "an L2 artefact in a gap of L1, which P-8 lets decide" (section 3, "Taken from the prelude, rightly"). So at boot this sentence and P-77 contradict each other. Wording: "A ground in one layer may confirm, but does not by itself decide, a question in another, and a JVM or checker limit never overrides what the language's texts say; where they give no answer, the curator decides by the goal (P-8), and an implementation ground may weigh there (P-77)." "May confirm" is the judgement's own "L2 confirms, does not decide" (tenet 5). It also answers the cold reader's question on "does not by itself decide". Outside this run: P-153's Why ("the team's later code ... (P-26, the team's later work outweighs ...)") still cites P-26 for undated prelude code. Under the new P-26 it reads as a misapplication, and the judgement names its sound ground (section 2, tenet 2 (e); section 3). The coordinator should know before the trap test.
7. **The library sits in the language layer, and the code rule seems to cover it too.** The rule reads: "The team's code counts as their word on the language only where they wrote the rule on purpose". In the judgement, "code" here means the implementation: the prelude, the checker, walk (section 0: the library is L1). Wording: "The team's code in the implementation counts as their word on the language only where ...".
8. **The Working Draft's name and date conflict with the record's.** The entry has "`Specification/`, the Working Draft that the team last edited in 2010-12", and "(2010)" in the ranking. P-7, P-42, P-96 and `specification.md` name the text "the Working Draft of February 2011". The judgement gives both dates: "the team's text of 2010-12, copied 2011-02-02". The apposition also makes `Specification/` the Working Draft, but `Specification/` is the revival's revision of it (P-7). The brief's list of the language names "the specification, the Working Draft" separately. Wording: "The language: the Working Draft of February 2011, whose text the team last edited in 2010-12, and `Specification/`, the revival's revision of it (P-7); ...". In the ranking: "the Working Draft (text of 2010)".
9. **Changes that `proposals.md` does not list.** (a) The title and body widen "the type group's later positions" to "the team's later word". This has a source: the judgement's "the team's later word", his "later team's work" (10-26 04:28:41) and "the team's work" (09-29 17:34:18). It should still be listed as a change for his yes. (b) "The type group, the part of the team that built the type checker and the compiler" is dropped. The entry still says "type group" three times. `exploring.md:16` defines the term for workers, so this is minor.
10. **Checked, sound.** The three layers follow section 0 and his 05:25:27 frame. The ranking's years have sources: the last team edit 2010-12-09, Naden 2012-08-31, POPL 2019. The code rule and the stub words are behaviour 3 and sharpening 3. The dating sentence is behaviour 4. The two words for specialisation are behaviour 6. "Stamping" is the record's word (F-18). The struck sentence follows open answer 3, and it is listed. "Specialised overloads a must" renders his "The specialization is a must", given in answer to the coordinator's "special versions kept" (the scout, section 1). The old entry defined the word as the overload, so the meaning is kept.

Optional, not a failure: the judgement, section 0, says that a team text in the language layer that argues from Java (the 2011 paper: "it is already required in Java") still counts in the language layer. With the layer rule, a reader may otherwise set aside P-43's 2011 paper as a Java ground. One clause covers it.

### Comprehension

The cold reader got the six behaviours right. It differs from the sources where the text is unclear: the date (item 8), the library against the code rule (item 7), who decides (item 5), and "by itself" (item 6). Its reading of "What they learned is evidence about the implementation" matches the judgement, but it says the entry does not spell this out (item 3). The sources leave one point open: where the library's text ranks against the papers by year. The judgement treats "the interpreter's nested library kept to 2012 against the prelude flat since 2009" as two later sources in conflict (tenet 2) and dates a library text only "on the same shape" (section 3). Neither the entry nor the judgement says how the library's text is dated. That is uncertain fidelity: only the judge or the curator can settle it, and the entry should not invent a rule.

### Class

- Wording: items 1, 2, 3, 4, 5, 6, 7, 8 (wording above).
- Uncertain fidelity: how the library's text is dated in the ranking. Settled by no source read; put to the judge.
- Listing: item 9.

## P-37

### Fidelity

1. **Stronger than the judgement, and it breaks the entry's own example: "In both cases the design must also be later than the library's text on the same shape, by P-26's dating, and no later text of the language may contradict it."** Sharpening 3 of the judgement is a condition on one claim: "A prelude line counts as the team's later word only if it is later than the library's text on the same shape and no later L1 text contradicts it." Sharpening 2 (the silent or ambiguous text read by the team's checker) carries no dating condition. The rewrite applies the date test to both cases, which causes two problems:
   - **Case 1.** The flat numbers bind because the language's texts back them, "not because the prelude has them" (judgement, "Tenet 3 against tenet 5"). The judgement calls "the interpreter's nested library kept to 2012 against the prelude flat since 2009" two later sources in conflict (tenet 2). If the library's text is dated "kept to 2012", the 2009 prelude flattening fails the rewrite's test, and the entry's own example (P-43) does not bind.
   - **Case 2.** `proposals.md` (P-158, point 1) says that "the judgement does not date this prelude line against the library's". So under the rewrite's test, P-158 does not show that it binds. The cold reader found this gap: "This entry does not say that this dating condition was checked".

   Wording, the judgement's own: "...; or the language's text is silent or ambiguous and the team's compiled checker enforces the design as a rule (P-158). A prelude line counts as the team's later word only if it is later than the library's text on the same shape, by P-26's dating, and no later text of the language contradicts it."
2. **A condition left out: the natives.** "The switch-over needs two zeros over the fourteen components ...". P-33's phase 4 is "the switch-over, first the natives ...". The `fortress-repo` core says the switch-over "waits for walk's natives". In the judgement the natives are "the switch-over's definition" (tenet 6). As written, a reader can take the two zeros as the whole condition, as the cold reader did. Wording: "Beside the natives (P-33), the switch-over needs two zeros over the fourteen components, ...".
3. **Measured and unmeasured are mixed in one sentence.** "That premise is unmeasured: no component of the library has been compiled and run yet, and the code generator refuses 52 declarations that the checker passes (F-34)." The 52 is a measurement, of the twelve components, not the fourteen (F-34: "52 declarations of the library's twelve components ... no emitted class was run"). The judgement keeps the two apart: "Measured: ... 52 ... Not measured: any library jar loaded and run compiled. So the premise is unmeasured, not refuted." Wording: "The decision assumes that the compiled path can run the library, not only check it. Measured: the code generator refuses 52 declarations of the twelve that the checker passes (F-34). Not measured: any component of the library compiled and run. So the premise is unmeasured, not refuted."
4. **"the team called it 'bogus' and a 'hopefully temporary hack'".** The team said "bogus" of lines: Ryu, 2009, "Added bogus IN and = operators" (`525264af1`; `prelude-lens.md:66`). The "Hopefully temporary hack" comment is on the re-pointing of the library names to the compiler's versions (`WellKnownNames.java:113-116`, checked). The judgement (tenet 3) and `prelude-lens.md:136` read these as names for the whole prelude, so the sentence has a source. But P-26's stub test applies a line's own words ("a line they called 'bogus'"). If the whole prelude is "bogus", a reader can conclude that no prelude line ever binds, against the two cases. Wording: "the team called parts of it 'bogus' and the switch to it a 'hopefully temporary hack' (`WellKnownNames.java:113-116`); its designs are evidence, not authority."
5. **Small wording points.** "P-33 places the library's other 40 components." uses a vague verb. Write: "P-33 says when the library's other 40 components are cleared." (Open answer 2 stays in P-33, as `proposals.md` lists.) "Why, in the curator's words:" is followed by a paraphrase: quote him exactly, or write "Why, as the curator put it:". "a workaround of a checker gap" should read "a JVM or checker gap", as in P-26 and the judgement's "accommodation of a JVM or checker limit".
6. **Checked, sound.** His reason matches 04:47:50 in meaning. The language ground (`structure.tex:15-20`: "chiefly FortressLibrary and FortressBuiltin") is behaviour 4. The fourteen are `run.sh:85-87` plus `List`'s two imports, under open answer 1, and listed. "Only which file survives." is 09-24 01:02:52. The varargs example is from sharpening 3. The old text's other sentences keep their meaning.

### Comprehension

The cold reader read the rule, the two cases and the premise as intended. It differed in three places, each from the text: whether the two zeros are the whole condition (item 2), how "the library's text" is dated (item 1), and "places" (item 5). It lacked one concept, "the distance stage". `references/batch.md:30` of the coordinator skill defines it, so the coordinating session has the term. For workers it belongs in the short orientation, as `concepts.md` says. "Respelled" belongs to P-38 and is not this run's.

### Class

- Wording: items 1 (fidelity: stronger than the source), 2, 3, 4, 5.
- Concept lacked: "distance stage". It is in the coordinator skill; for workers, the orientation.

## P-43

### Fidelity

1. **A condition left out: "Under the rule a nested tower is impossible".** The judgement (tenet 5): "Under the rule a nested tower whose every level carries the self-typed algebra traits at its own type is impossible". The entry's own example (`ZZ32` being `Integral` at two instantiations) assumes that condition, but the sentence states the impossibility for every nested tower. Wording: "Under the rule a nested tower whose every level carries the algebra traits at its own type is impossible: if `ZZ32 extends ZZ64`, then `ZZ32` is `Integral` at two instantiations."
2. **The citation should name the frozen copy.** The Working Draft's sentence is cited at `Specification/basic/types-vals-vars.tex` (the revised copy, line 580). By `specification.md` the Working Draft is cited in `Specification-1.0-frozen/` (`basic/types-vals-vars.tex:502`), which is where the writer checked it. The sentence is word for word the same in both, so the meaning does not change.
3. **Old ambiguity, now the time to fix it: "The fixed widths, `ZZ`, `QQ` and `RR64` are siblings".** It can read as an apposition (the cold reader). Wording: "The fixed-width types (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `RR32`, `RR64`), `ZZ` and `QQ` are siblings under `Number`". The list is the `fortress-repo` core's eight siblings.
4. **Checked, sound.** The rule's clause matches F-44. The four texts, the Working Draft's sentence and the library chapters' ℤ ⊂ ℚ are judgement tenet 5 and tenet 2. The prelude's role ("the team's instance of the same answer on the compiled path, not a ground for it") is behaviour 2. Route C's definition matches P-95, and P-95 says "so that route C stays open". The rule to weigh against F-46 and P-95 is behaviour 3. The two "Why" sentences moved to history follow open answer 3 and are listed. No judgement ground is presented as his reason. The curator's 07:46:17 correction ("we did a plenty of digging which decided why we took the flat numeric tower") is honoured: the grounds are the record's own.

### Comprehension

The cold reader had the decision, the layer, the grounds and the limit right. It lacked the forest rule. P-95 and F-46 hold it, and the coordinating session loads POSITIONS whole, so nothing is needed. Route B is not named. That is old text, and route B is not this entry's subject. The reader asked who may reopen route C. The coordinator skill settles that: reversing a decision of the curator's is consequential.

### Class

- Wording: items 1 (fidelity: a condition dropped), 2, 3.

## P-42

### Fidelity

1. **The example does not fit the claim: "declares its element parameters without a bound and instantiates them at tuple types, such as its arrays indexed by pairs `(ZZ32,ZZ32)`".** An array indexed by pairs has a tuple at its index parameter, not at an element parameter. The judgement's examples are `Generator[\E\]` and `zip`'s `(E,F)` (section 4 (c)). Wording: "The library declares its type parameters without a bound and instantiates them at tuple types, as in `zip`'s `(E,F)` and its arrays indexed by pairs `(ZZ32,ZZ32)`."
2. **"and so refuses a generic instantiated at a tuple (row 412)" says less than the probe found.** The probe: "Some programs pass the checker under that bound, and they are rows 470 and 691. In particular, `q = id((3, 4))` compiles under the compile command as it is, and silently runs `id(3)`" (`REPORT.md:12`; row 691). The judgement gives this as a reason why the flip lands in 22c (section 5, rung 4; section 6). Wording: "and so refuses a generic instantiated at a tuple (row 412), or in some calls compiles it wrong (row 691)."
3. **Checked, sound.** "Functions" is dropped under open answer 3, and listed. POPL 2019 is quoted exactly (`ParkPOPL2019.txt:418`). The Working Draft's sentence on what parameters are instantiated with (frozen `:53-54`) and its absence from 1.0 are behaviour 1. Steele's setting as the enforcement of a written sentence on one path is behaviour 4. `Shell.java:372` is `setExtendsObjectPreDesugaring(true)` in `useCompilerLibraries()` (checked), which is behaviour 3. The judgement holds "the switch-over ends nothing by itself", and the entry follows it. `useInterpreterLibraries()` sets the flag `false`, so the claim rests on the switch-over keeping the compile command's own settings. That is the judgement's reading of `Shell.java:371-386`, and I do not overrule it. The two failures under either bound are behaviour 5 (rows 339 and the new one). The Java mapping is section 4, L3. The state line follows open answer 1, and it is listed.

### Comprehension

The cold reader got every behaviour. Its second open point is a real conflict outside the entry: `references/compiler.md` in the `fortress-repo` skill says the `Object` bound lasts "until the switch-over (ledger row 412)". The specification's callout (`Specification/basic/trait-parameters.tex:62-65`, checked) says the same: the divergence "lasts until the compiled path is switched over". Both should change with the flip. The writer raised the callout. The skill line is new here. "In climb batch 22c" reads as a schedule. That matches the judgement's "the flip is the coordinator's to schedule".

### Class

- Wording: items 1, 2.
- Concept, outside the entry: `fortress-repo` `references/compiler.md` (row 412's "until the switch-over") and the specification's callout, to correct with the flip.

## P-7

### Fidelity

The one changed sentence is ruling 5 of tenet 1: "P-7 should not restate the rule; it should point to P-26". It keeps "reconcile contradictions" and the old text's other sentences unchanged. One point: the change narrows his own words of 10-12 23:15:30 ("when later work in compiler or type papers contradict the original spec, we updated it ..."), which the old sentence carried. `proposals.md` does not mark it "from the judgement, for his yes". The judgement calls it "a text edit the coordinator shows him", so it should carry that mark. "the team's Working Draft of February 2011" is the record's name (P-96, `specification.md`). The conflict with P-26's "2010-12" is fixed in P-26 (P-26, item 8).

### Comprehension

The cold reader read it as the sources mean. Its open points are the Working Draft's date (P-26, item 8) and where the Java baseline lives, which is old text and not this run's.

### Class

- Pass, with one listing note: mark the changed sentence for his yes.

## P-158

### Fidelity

1. **The present tense hides the state of the tree.** "The compiled export check refuses a component that leaves one out" is the decided state. In the tree, the check skips api members written `abstract` since `031c38bbc` (row 816, NEGATIVE-VERIFIED; `library.md`, which the cold reader quoted). The repair is not built. The old text had the same gap, but the cold reader was blocked by it: "I cannot tell whether the refusal is current behaviour, a change still to build, or the team's 2012 behaviour". Wording, a state line from row 816 and the dialogue, section 3: "Still to build: row 816's repair, the export check's count restored and 12 bodyless declarations in five component traits." He placed it "(goes into next batch)" (10-26 04:28:41). The batch's name can stay out, as `proposals.md` keeps it out.
2. **The text is ambiguous, not only silent.** "The ground: the specification asks for no body there but does not say whether the component declares the member (`apis.tex`, ...)". The judgement (sharpening 2) reads two texts. `apis.tex:252-256` says "no body needed" and is silent on the declaration. `source-code.tex:384-385` "reads as the member declared either way". The frozen copy at `:380-385`, "Export Statements" (checked), has "When a trait has an abstract method declared, a satisfying trait declaration is allowed to provide a concrete declaration." Behaviour (section 7, P-158): "cite the ambiguous text". The rewrite cites one section and calls the whole specification silent. Wording: "The ground: the specification's text is ambiguous: "Component and API Identity" (`apis.tex`) asks for no body there and is silent on the declaration, and "Export Statements" (`source-code.tex`) reads as the member declared either way."
3. **The year of the team's check rests on a snapshot (uncertain fidelity, partly settled).** "the team's export check of 2012". The record's source is `5a68404fd`, David Chase, 2012-07-19 (the dialogue, section 3; row 816). That commit has no parent, and `bound-archaeology.md`, "Parentless snapshots", says that "a blame hit is not where a line was written". `git log --all -S equalListMembers` on `ExportChecker.scala` finds the count only in parentless snapshots. The earliest are `9ac5af540` (2011-12-05, `ExportChecker.scala:738`) and `26718e298` (2011-12-06). The file's last commit with a parent before them is `36c7299c7` (2009-02-17), which does not hold the count. So the count was written between 2009-02 and 2011-12, and neither its author nor its year can be recovered. "Of 2012" and "Chase's" are the 2012 snapshot's date and author. P-158's ground needs no date under sharpening 2. The year matters only if P-37 keeps its "in both cases" date test (P-37, item 1). Wording: "the team's export check, in their tree by 2011-12, refused a component that left one out" (past tense, which also helps item 1). Row 816 and the dialogue, section 3, carry the same "Chase's 2012" and need the same correction.
4. **The Why sentence is hard to read.** "the curator takes the compiled path's way over the interpreter's library, written for walk, which leaves some such members out, by the team's later word (P-26)" is nested, and "over" reads two ways (cold reader). Wording: "Why: by the team's later word (P-26), the curator prefers the compiled path's way to the interpreter's library's, which was written for walk and leaves some such members out." The meaning is his (04:28:41: "we take the completed path's way over the walk library's"). Dropping "earlier" is listed and correct.
5. **Checked, sound.** The ground and the run-time death ("the cost of the other reading, not the ground") are labelled apart from his Why and marked for his yes. The pointer to P-37 follows the brief's "one home for each rule".

### Comprehension

The cold reader got the rule and the grounds. It was blocked on the state (item 1). It also asked whether the dating condition was met, which comes from P-37's item 1 and goes away with that fix. The "export check" is a concept of the checker area part, as `concepts.md` says. Its current behaviour is in `library.md`, so the reader had the term.

### Class

- Wording: items 1, 2, 4.
- Uncertain fidelity: item 3, settled by `git log`. The count is in the team's tree by 2011-12, and its year of writing cannot be recovered.

## Across the chunk

- **P-37 against P-158, through the date test.** As written they contradict each other (P-37, item 1). The fix in P-37 removes the contradiction.
- **P-26 against P-77 and P-153.** The "never" sentence contradicts P-77 (P-26, item 6). P-153 is outside the run, but its Why cites the old P-26.
- **The Working Draft's date.** P-26 says 2010-12, while P-7, P-42 and P-96 say February 2011 (P-26, item 8).
- **Skill text that the new entries contradict.** `fortress-repo` `references/exploring.md:16-22` lists "compiled code specialised to each instantiation" and "the compiled number tower, which they flattened in 2009 and 2010" as the type group's late positions. The writer reported this in `concepts.md`. `references/compiler.md` has row 412's "until the switch-over" (P-42).
- **Length.** P-26 and P-37 are each about four times the 600-character check, by the writer's estimate. Each sentence answers a behaviour of section 7 or a misstatement of section 2, apart from P-37's "Why, in the curator's words" (behaviour 1) and its language ground (tenet 3). I found nothing to cut without losing a behaviour. The fixes above add about 250 characters to P-26 and 150 to P-37.

## His quotes

HIS 2026-09-23T07:26:28.248Z | The spec was written in a vacuum early on.
HIS 2026-09-23T07:26:28.248Z | I don't know where to place it, like let's say 2009 or something.
HIS 2026-09-23T07:26:28.248Z | And then the type group went in and tried to make it run. So they knew much more about what's feasible and what, what's not. The goal was performance. The specialization is a must.
HIS 2026-09-23T07:26:28.248Z | We are not Naden. We know nothing here.
HIS 2026-09-23T07:26:28.248Z | So we are not going to re-speculate how to implement the letter of specifications from 2008, which was misinformed.
HIS 2026-09-24T01:02:52.634Z | Only which file survives.
HIS 2026-09-24T01:02:52.634Z | But how a specialization is chosen “ist mir egal”, as long as it runs fast. Which clearly isn’t an answer to the question…
HIS 2026-09-24T01:02:52.634Z | Yes, because that was the teams last record on how to do the “Fortress” way.
HIS 2026-10-12T23:15:30.246Z | when later work in compiler or type papers contradict the original spec, we updated it to match the current state of the implementation in the revival.
HIS 2026-10-26T04:28:41.037Z | And by the standing position that later team’s work supersedes earlier one, we take the completed path’s way over the walk library’s. That’s why 21b should have chosen (a), not weaken the check — we must reverse this.
HIS 2026-10-26T04:28:41.037Z | With that bending corrected (goes into next batch).
HIS 2026-10-26T04:47:50.485Z | The whole point of the switchover is to avoid the need to port walks library into the compilers library. Revival is continuing the development of type checker, so that it would accept the fuller Fortress library that the interpreter uses.
HIS 2026-10-26T05:25:27.242Z | but I hope you are incorrectly mixing the aspects: what Fortress does with how is Fortress implemented on JVM and probably related is a topic of interoperability with Java.
HIS 2026-10-26T07:42:15.929Z | Yes, to both rewording of or refinements of P37 and P26.
HIS 2026-10-26T07:46:17.466Z | I think we did a plenty of digging which decided why we took the flat numeric tower.
HIS 2026-10-26T07:48:49.335Z | And we must resolve the potential contradictions in our positions with enough clarity from the additional context we encode into the positions, so that you know how to weigh the trade-offs.
