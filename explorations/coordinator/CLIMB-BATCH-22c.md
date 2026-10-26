<!-- The record of climb batch 22c, the batch that closes the plan's phase 3, so that phase 3's zero is one the switch-over can use (the curator's framing of 2026-10-26 07:30 UTC, `conversations/02-phase3-exit-foundations.md`, section 6; `reviews/foundations/judgement.md`, sections 4 and 5), for the coordinating session, the curator and the batch's workers. Drafted 2026-10-26 by an Opus planning worker against `main` at `2c39b1147`, whose `Library/`, `ProjectFortress/`, `Specification/`, `build.xml` and `bin/` are those of `e0ec620a9` and of climb batch 22's landing `2bff2fe23` (`git diff --stat e0ec620a9 2c39b1147` outside `explorations/` and `.claude/` is empty): so climb batch 22's landed tables describe the base, and the planner's measurements hold on it. Not yet reviewed. This batch launches only on the curator's word: phase 3's standing go does not cover it. -->
<!-- Sources: the planner's brief; `reviews/foundations/judgement.md`, sections 1, 4, 5 and 9, read whole; `reviews/phase3-exit/zero-audit.md`, A.2, A.3 and A.4; `reviews/phase3-exit/judgement.md`, sections 2, 3 and 5; `reviews/foundations/rewrite-results.md`; `perf-probes/bound-any-compiled/REPORT.md`, read whole; `perf-probes/export-abstract-codegen/REPORT.md`; `conversations/02-phase3-exit-foundations.md`, sections 3 and 6; POSITIONS P-26, P-27, P-33, P-39, P-42, P-148, P-155, P-158; FACTS F-34, F-53, F-75, F-264, F-282, F-286, F-287, F-288, F-289, F-290, F-291, F-292; the ledger rows 339, 412, 653, 691, 701, 769, 782, 816, 827, 828, 829, 832; climb batch 22's gate (`compile-ladder/climb-batch-22/gate/`) and record (`coordinator/CLIMB-BATCH-22.md`); the code at the sites; the specification's sections cited. -->
<!-- The planner's probes (section 4): three worktrees seeded detached from the base build `/home/user/fortress-base23` (`e0ec620a9`), removed after; nothing run in the base build but the old code through `tools/old-fortress.sh` with a private caches folder. (1) The base over the fourteen, the stock stage with List's two imports added. (2) Rung A: its check alone, its text, and the team's strict comparison as a variant. (3) Rung O: its check alone and its text. (4) Rung L: its two components as the driver's only targets, three texts. (5) The four rungs' text together, built: the distance stage under the compile command's own setting, the count stage, `ant testQuick`, `ant testSystem`, `ant testSpecData`, the ladder regression and the four-thread atomic runs. (6) The bound flip alone on `tests/doubledOverloading.fss`, by the skill's quick loop. (7) Twelve walk tests of covariant collections on rung L's text. (8) Five small compiled programs, on the old code and on the text together. Machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` for the stages; up to three runs side by side, so no time here is one to compare. Its edits, patches and notes are under `compile-ladder/plan-22c/probes/`, its generator under `compile-ladder/plan-22c/manifest/`. One line per paragraph. -->

# Climb batch 22c

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. It runs a program without static types. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode. The compiled path still uses its own small library, the **prelude**, until the **switch-over**, when it takes over the interpreter's library, the **one library**.
- **The distance** is the number of errors the checker reports on the one library's core: twelve components today, the **twelve** (`explorations/coordinator/tools/distance/run.sh:85-87`). **The fourteen** are the twelve and the two components `List` imports, `CovariantCollection` and `OneShotFlag` (`Library/List.fss:13`, `:15`). The judgements write "thirteen"; the list holds fourteen. **The count** is the checker's errors on `FortressLibrary` alone.
- An **api** is a component's interface (a `.fsi` file); the **component** is its code (a `.fss` file). The **export check** compares the two. An **entry** of its error names one trait, object or function where they differ.
- A member written **`abstract`** in an api has no body in the component. **Bodyless** means a declaration with no body at all, not an empty one.
- **The bound** is what a type parameter with no `extends` clause may stand for: `Any`, every value, by P-42; `Object`, every value but tuples, functions and `()`, on the compile command today (`ProjectFortress/src/com/sun/fortress/Shell.java:372`).
- A **row** is an entry of the gap ledger, cited by number. A **rung** is one fix, built by one worker in its own copy of the tree and checked by a second worker, the **skeptic**. A **batch** is a few rungs, merged and tested together by the **gate** and landed at once.
- **Test first.** Every fix starts with a test that shows the defect, seen failing before the edit and passing after. A **guard** is a test that passes before and after.

### Where the distance stands

- At climb batch 22's landing the distance is 0 and the count 0, `#crash none` (F-53; [the gate's tables](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-22/gate/distance.txt)). That zero has four limits:
  - It is over the twelve under the bound `Any`, a setting no command has: under `fortress compile`'s own setting the twelve give 685 errors (F-289).
  - It rests on climb batch 21b's reading of `abstract`, which you reversed on 25 October (P-158; row 816): under your reading the export error has 5 entries over 12 members.
  - The export check skips every top-level symbolic operator, and so hides 9 real header differences (F-287; rows 782, 827).
  - `List`'s two imports are outside it: 12 errors and 2 crashes in `CovariantCollection`, 1 error in `OneShotFlag` (F-288; rows 828, 829).
- **The four rungs' text, measured together, gives the exit gate's zero**: the distance stage over the fourteen, under the compile command's own setting (read from the flipped `Shell.java`), with operators read and `abstract` read your way: `#total 0`, every kind 0, `#crash none`; all 14 targets ended rc 0, and all 191 stage lines read `errors=0`. The count 0. Walk's suite 683 tests and the specification's examples 130, no failure. The compiled tracks: 13 failures in 11 tests, each a test that the batch's rungs edit (section 4). The atomic runs: 42 of 42 `PASS`. The ladder: one file down, which rung B's respelling of that file clears (its compile measured under the flip).

### The batch: one run, four rungs

- **A, row 816's repair (P-158).** The export check counts every member of an api trait again, as the team's check did (`5a68404fd`). The components declare the 12 members their apis write `abstract`, each bodyless: `String`'s 7, `Range`'s `isEmpty`, `ReadableArray`'s `opr[_:TrivialOpenRange]`, `ActualReduction`'s `empty` and `join`, `AnyMaybe`'s `holds`. The specification's own export rule says otherwise, and the rung revises it (question 3). Alone: the twelve stay at 0; its check without the 12 lines gives 1 error with 5 entries.
- **O, row 782.** The export check reads top-level symbolic operators by the rules it applies to any function, each under its name only (the double key fixed), and the 9 headers that differ are matched by the library's rule. Alone: the twelve stay at 0; its check without the 9 lines gives 2 errors, the 9 differences and nothing else.
- **L, `List`'s two imports.** The stage checks the fourteen. `CovariantCollection`'s 12 errors and 2 crashes are cleared by library text in the team's own devices; `OneShotFlag`'s 1 by the export check comparing an object's value parameter without `var`, as it compares a field. Alone: the two components 0, from 13.
- **B, the bound `Any` for `fortress compile` (P-42; row 412).** `Shell.java:372` set to `false`, the ten test edits the probe lists and one more the planner found (`tests/doubledOverloading.fss`), and the distance stage run under the compile command's own setting from then on.
- **Together: 0** over the fourteen under the compile setting. No two rungs change one declaration. Three rungs edit `ExportChecker.scala` in different functions; the gather applies O, B, L, then A (section 3, "The rule the rungs keep, and how they meet").

### The answer it serves

You framed this batch as phase 3's close (07:30 UTC on 26 October, 08:30 your time). Whether phase 3 closes with it is your open answer, question 1, default yes. The record is written for either answer: the four rungs, their text and the exit gate are the same. Under yes, the batch is phase 3's last and its gate is phase 3's exit. Under no, the same four rungs open phase 4 as its first library work, before climb batch 23. Either way the batch launches only on your word.

### The questions for you, and what each answer costs

- **Question 1, consequential: does phase 3 close with this batch?** Default: yes. Cost of yes: P-33's phase 3 exit is restated as the fourteen under the compile command's setting, with operators and `abstract` read the team's way. Cost of no: none in the batch; P-33's exit stays as written, and the batch's line moves to phase 4.
- **Question 2, consequential: does P-155 cover the export check?** P-155 asks the checker to read symbolic operators "by the rules that it applies to any function", and names the overloading check. Reading it to cover the export check too is the phase 3 exit judgement's item 7, default yes, still open. Rung O's checker half rests on it. Default: yes. If no: rung O lands only its 9 header lines, which the library's rule asks anyway; the export check keeps skipping operators, and the zero does not see them.
- **Question 3, consequential: your informed yes to P-158, against the specification's own export rule.** P-158's reason says the specification "asks for no body there, not for no declaration" (`apis.tex`). But the components chapter says a trait in the component "contains, for each field declaration and non-abstract method declaration in the exported declaration, a satisfying declaration" (`Specification/basic/components/source-code.tex:380-383`, the same in the Working Draft): an abstract method needs no declaration there. Neither P-158's text nor the phase 3 exit and foundations judgements cited this sentence; climb batch 21b's review read it as supporting the reading you reversed. Your decision also rests on the team's later word (P-26: the prelude restates such members, and the team's 2012 check counts them) and on the cost of the other reading (9 of the 12 members die in a compiled call, `NoSuchMethodError`). Default: P-158 stands; rung A revises that sentence in the specification's revision form, and the record's pass corrects P-158's reason. If you reverse P-158: rung A does not land, the zero holds on today's reading, and the 9 compiled deaths stay.
- **Question 4, consequential, landed and then reviewed: a narrower return type in the component.** The text lets a component's function or method answer a subtype of the api's return type (`source-code.tex:355-360`, `:399-404`). The export check asks the same header, as the team wrote it, and rung O extends that to operators. A compiled call names the api's header, so a narrower one dies at run time (row 827's two-file probe). Default: the check's rule as it stands, a new ledger row (NEW-O-1) that names the conflict, and your answer after the landing. It holds nothing: rung O's 9 lines satisfy both readings.

### What the batch leaves out (section 4, "Left out, each with its home")

- Row 701, the code generator's refusal of a declaration's own `where` clause; row 321, the compiled `toString` overflow, with the tuple-rendering device that needs your word; the 52 code-generator refusals in the twelve (F-34); `System`'s 2 errors; the natives (climb batch 23); row 832, the tuple-typed dotted method, which the flip reaches and does not fix. Each is phase 4's, as the foundations judgement's section 5 names them.

### Before the batch runs

- Questions 1 to 3 are put to you first, one per message, since each is consequential. Question 4 lands at its default and goes on the review list. The coordinator then generates and splices `plan-22c/manifest/` and checks the briefings on the base (section 5).
- The gather runs the 52 team demos on the merged tree: rungs A and L change the library that walk runs (F-283; P-79).

### Cost

- About 4.2M tokens written: from 3.5M if no fix is contested and the review blocks nothing, to 5.2M with a judge and a repair round on one rung and on the review. Workers about 1.6M (A 0.5M with its specification revision and speed pass, O 0.4M, L 0.45M, B 0.25M), skeptics about 1.3M (three run the count stage on the base and the head), the fixed roles about 1.3M. About 4 hours, the 52 demos in the gather's time.
- Climb batch 21b wrote 3.50M over 10 agents for three rungs, two of them checker rungs with speed passes (`reviews/batch-21b-review.md`, "For the curator"). This batch has three checker rungs, each with its speed pass.

## 2. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of yours; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### Question 1, consequential: phase 3 closes with this batch

**The question.** Your framing of 26 October: phase 3 closes with one more batch, 22c, for the rungs left, so that its zero is one the switch-over can use. The foundations judgement found the framing sound and named the four rungs and the exit gate (`reviews/foundations/judgement.md`, section 5, its default "yes, 22c with the four rungs; phase 3 closes at its gate"). It reads anew P-33's phase 3 exit, which you framed.

**What each answer changes.** Yes: this record's gate is phase 3's exit; P-33's text is restated after the landing; climb batch 23 follows as phase 4's first batch. No: the batch is phase 4's first library batch, before climb batch 23; the rungs, the text and the gate do not change.

**Default: yes.** Consequential: it reads anew P-33's exit.

### Question 2, consequential: the export check reads symbolic operators (P-155)

**The question.** P-155: "The check must read them by the rules that it applies to any function, so that the distance to the switch-over reaches zero with them checked." Its text names the overloading check. The export check reads only names that `isDeclaredName` admits (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:274-275`, the team's), so it never compares a symbolic operator's header. The phase 3 exit judgement read P-155 to cover the export check too (its item 7, default yes; consequential, his).

**Measured** (section 4, "Rung O"): with the operators read and the double key fixed, the twelve give 2 errors, which list exactly the 9 headers of row 827 and nothing else; with the 9 lines, 0. The compiled tracks and the compiler's prelude show no other operator that differs (the library order compiles, and no compiled test turns red by it).

**Options.** 1, P-155 covers the export check: rung O whole. 2, it does not: rung O lands its 9 header lines alone, by the library's rule; the check skips operators, and the zero does not see them. After the switch-over, a compiled call through an api operator whose component differs dies with `NoSuchMethodError` (row 827's probe).

**Default: option 1.**

### Question 3, consequential: P-158 and the specification's export rule

**The question.** Rung A builds P-158. The specification's export rule says a satisfying trait or object declaration contains a satisfying declaration "for each field declaration and non-abstract method declaration in the exported declaration", and allows "a concrete declaration" for an abstract one (`Specification/basic/components/source-code.tex:372-385`; `Specification-1.0-frozen/basic/components/source-code.tex:372-385`, the same text). So the text asks no declaration in the component for an abstract method. P-158's reason reads only `apis.tex` ("asks for no body there, not for no declaration"); the phase 3 exit judgement (its 3.1) cited `source-code.tex:384-385` and not `:380-383`; `reviews/batch-21b-review.md` (Part 1, its row 816 paragraph) read `:381-385` as supporting reading (1).

**Your decision's other grounds, which this sentence does not move.** The team's later word (P-26): the compiler's prelude restates each member its api writes `abstract`, bodyless (`Library/CompilerLibrary.fsi:112-120`, `Library/CompilerLibrary.fss:301-312`), and the team's export check of 2012 counted every api member (`5a68404fd`). The cost of the other reading: a client's `invokeinterface` names the component's trait interface, so 9 of the 12 members die compiled even where every object defines them (`perf-probes/export-abstract-codegen/REPORT.md`, "In short").

**Options.** 1, P-158 stands: rung A builds it and revises `source-code.tex:380-385` in the revision form (an Appendix I entry with the original text, a `\revision` box, the front matter checked, a decision record). 2, P-158 is reversed: rung A does not land.

**Default: option 1.** Consequential: the batch bends the specification's text to your decision, and the decision's stated reason was incomplete.

### Question 4, consequential, landed and then reviewed: a narrower return type in the component

**The question.** The specification: a top-level function declaration "is satisfied by a set of top-level function and functional method declarations ... each of whose return types is a subtype of the return type of the exported declaration" (`source-code.tex:355-360`), and a method declaration likewise (`:399-404`). The export check asks one component declaration with an equal header (`existsMatching`, the team's; rows 768 and 769 hold its other departures). Rung O applies that rule to operators, and 6 of row 827's 9 are a component's narrower return (`#` and `:` answering `RangeInternals`' types). A compiled call names the api's header, so the narrower one dies (row 827: `NoSuchMethodError: 'P782Api$A P782Api.#(...)'`).

**Options.** 1, the check's rule: the same header. 2, the text's rule, with the code generator emitting a bridge at the api's descriptor, which no probe has designed.

**Default: option 1, as built**, with a new row, NEW-O-1, `CONTESTED`, that names the conflict. Consequential: the principles split (the team's text against the team's check). It holds nothing: rung O's 9 lines satisfy both rules.

### Forks the batch takes, none consequential

Each default can be undone, and none reverses a decision of yours or touches a line of microGPT.

1. **One run, four rungs, in the gather's order O, B, L, A.** Three rungs edit `ExportChecker.scala` (O at `:274-275` and before `:598`, L at `:658-668`, A at `:789-805` and before `:816`); A and O share `Library/FortressLibrary.fss` too, in the other order; L and B share the stage's `run.sh`. The manifest's order O, B, L, A is one that the gather's rule keeps without a cycle; the brief's order A, O, L, B would make one (section 3, "The rule the rungs keep, and how they meet"). Default: so.
2. **Rung A's check: P-158's letter**, "with a body or without one": an api member written `abstract` is matched by a component member of the same name and header, the `abstract` modifier aside, through the team's `ignoreAbstract` (`ExportChecker.scala:606-615`). The team's comparison of the whole modifiers was measured as a variant (`count816strict`): 1 error, 2 entries, `Indexed`'s `size` and `Equality`'s `=`, whose components give the member a body. Default: P-158's letter (`count816`).
3. **The 12 declarations bodyless, with no `abstract` written**, in the form of the bodyless members beside them in the component (`getter size()`, `uncheckedSubstring`) and of the compiler's prelude (`GeneratorZZ32`'s `loop`), each at its api's header, getters among the getters (the parser refuses a getter after a method). Default: so.
4. **`ExportAbstractMemberAbsent` turned**: its program, a component trait that leaves out an abstract api member, is now refused, so the test becomes `XXXExportAbstractMemberAbsent` with `compile_err_contains=missing members of the trait/object in the component`, the form of `XXXExportMemberName`; row 816 closes by it. Default: so.
5. **Rung O's double key fixed in the export check**, which reads a function only under its declared name, not in `IndexBuilder.buildFunction` (`scala_src/typechecker/IndexBuilder.scala:439-446`), whose second key every other reader of the relation sees and whose team comment ("TODO: Don't double-add the indices?") stands. Default: in the check (`opr782`).
6. **Row 827's 9 headers by the library's rule** (`fortress-repo` skill, `library.md`, "Designing a change"): the component's `#` and `:` take the api's `CompactFullRange` types, since the api cannot name `RangeInternals`' (the precedent `getter bounds():CompactFullRange[\ZZ32\] = sized1Range(b0,s0)`, `Library/FortressLibrary.fss:2355`); the api's `BIG ||` and `BIG |||` take the component's generic header; `List`'s api imports `CovariantCollection.{AnyCovColl}`, as `IntMap.fsi:13` and `PrefixSet.fsi:33` do, and states its component's comprehension type. Default: so.
7. **`CovariantCollection` by the team's devices in that file** (rung L): the api states the component's members and headers (`AnyCovColl`'s `dirtyIAF`, the traits `AnyEmpty` and `AnySingleton` that `Empty` and `Singleton` extend, `abstract` on `AnySingleton`'s bodyless `x`); the trait declares `opr |self|`, which its three objects define; `upward`'s first argument carries the target type `R`, as every call already passes `Empty[\T\]` for it, so the Return Type Rule over every instance holds (F-75); its `NonEmpty` arm answers `NonEmpty[\R\]`, the type of its two narrower arms; one more `upward` arm takes any collection and casts it (F-264), so that a collection no arm takes, as one at walk's open type, still ends in `CastError`; `iaf` and `aaf` gain an arm each that fails, as the team's `NonEmpty` arm of `upward` does; `Singleton`'s `dirtyIAF` casts its element; `Append`'s field `sz` writes its type. Default: so (`covcoll`).
8. **`OneShot`'s parameter by the export check** (rung L): it compares an object's value parameter by its modifiers other than `var`, as it compares a field since climb batch 21b (F-282). The other way, the api writing `var`, is refused before the checker: 'var cannot modify an object parameter, canTryIt' (`ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:143-158`, the team's; the api grammar's `ApiFldMod` has no `var`, `Specification/basic/objects.tex`, "Field Declarations"). Default: the check (`varparam`).
9. **The checker's refusal of a field with no type, as a new row** (rung L, NEW-L-1): 'Must provide type for initializer' (`scala_src/typechecker/Thunker.scala:91`, the team's), where the grammar's `FldDecl` lets a field leave its type out (`objects.tex`, "Field Declarations"). The library writes the type. Default: so.
10. **The distance stage reads every api's own count** (rung L): `table.py` reads no `@@TC API` line, so an error in an api that only a later target checks, as `OneShotFlag`'s is, would print no line the table counts (the zero audit's A.3, gap 1; 0 today, measured). Default: rung L makes `table.py` turn `#total` into `none:` when an api's `errors=` is above 0 with no line of its own, and an `API-CRASH` line a `#crash` row, with a canned case in `test_classify.py` first. Not measured by the planner.
11. **`CoercionGenericFnCompiledRungC` given `T extends Object`** (rung B), with a comment naming the prelude's `||` at `Object` until the switch-over: the foundations judgement's default (section 4, "Defaults"). The other way is an `XXX` test. Default: so.
12. **`tests/doubledOverloading.fss` respelled `extends Object`** (rung B). The ladder regression found it, which the bound probe did not run: under the bound `Any`, `a[\E\](v: E): A[\E\]` beside `a(): ()` is refused by the Return Type Rule, since `a()` takes `()` at `E = ()`, and the file goes from `pass` to `typecheck`. The team's test checks the overloading table, not the bound, so `a[\E extends Object\]` and `b[\F extends Object\]` keep its purpose and its walk run; measured, it compiles under the flip. The other way, a declared `DOWN` move, would recur at every later gate against the fixed baseline. Default: respelled.
13. **The stage's compile setting read from `Shell.java`** (rung B): `DistanceMulti -setting compile` takes the extends-`Object` switch from the line that opens `Shell.useCompilerLibraries()` in the tracked source at each run, and `run.sh`'s default setting becomes `compile`, so the gate's distance stage runs under the compile command's own setting from then on. A first form called `Shell.useCompilerLibraries()` and then `useInterpreterLibraries()`: it crashed on 214 declarations, 'Undefined API: CompilerBuiltin', since `Types`' constants were then made under the prelude's names. Default: so (`stageCompile`).
14. **Rung B is not a checker rung**: `Shell.java` sets the compile command's switches, and the checker's time is for a change of `scala_src/` or the AST (`fortress-repo`, `compiler.md`, "The checker's time"). No speed pass. Default: so.
15. **Each of A, O and L times the count stage and makes its speed pass** (P-148), three on one file. Default: so.
16. **The count stage keeps its setting**, walk's (`Shell.useInterpreterLibraries()`, `tools/checker-count/WorldFlip.java:41`): the exit gate reads the distance stage. Default: unchanged.
17. **No rung declares a checker count, a crash or a ladder move.** Default: none; the count and the distance reported.
18. **The 52 demos run by the gather** on the merged tree (F-283). Default: so.

### Points the batch lists for you, not questions

- **Team lines changed:**
  - A: the export check's count, restored to the team's (`ExportChecker.scala:789-805`); 12 declarations added to five of the component's traits.
  - O: the export check's admission of names (`:274-275`, the team's); 6 component headers, 2 api headers, `List.fsi`'s comprehension type and one import.
  - L: `CovariantCollection.fsi` and `.fss`, the team's text unchanged since 2012, 13 lines out or rewritten and 31 written; the export check's `equalParams` (`:658-668`, the team's).
  - B: `Shell.java:372`, Steele's 2012 setting; 11 test files, among them the team's `tests/doubledOverloading.fss` and the pinned diagnostics of `XXX6bu.test` and `XXX6bv.test`.
- **What walk does differently:** by the planner's runs, nothing: 683 and 130 tests, no failure; `upward` now takes `R` from its first argument, and the open-parameter comprehension still ends in `CastError`.
- **What the checker does differently:** it refuses a component that leaves out an `abstract` api member or declares it at another header (A); it reads every top-level operator in the export check (O); it accepts an object parameter written `var` against the api's plain one (L); the compile command bounds a type parameter by `Any` (B), so tuple and arrow static arguments compile, and `id((3, 4))` is refused, where it compiled as `id(3)` (row 691).
- **The zero:** reached with row 832 and row 339 open, which the bound reaches and does not cause.

## 3. The rungs

Line numbers are those of main at 2c39b1147, whose Library/, ProjectFortress/ and Specification/ are those of e0ec620a9 and of climb batch 22's landing, 2bff2fe23. The rungs are given in the order of the planner's brief; the gather applies them O, B, L, A (below, "The rule the rungs keep, and how they meet"). Each rung's tests come first: written, run through the harness on the base and seen failing, or for a guard seen passing, and committed before the edit. A value that matters is asserted inside the test (P-103). The planner's text is explorations/compile-ladder/plan-22c/probes/: edits22c.py writes each edit by exact text and stops before writing anything if one does not match; rung-A.patch, rung-O.patch, rung-L.patch and rung-B.patch are its output per rung, each applying to the base alone (git apply --check), and the four in the order A, O, L, B give text22c.patch, the text the planner measured together.

### A. Row 816's repair: the export check counts every api member, and the components declare the 12 (P-158; row 816)

**The answers this rung follows.** P-158: a member that an api writes abstract is declared in the component that exports the api, at the api's header, with a body or without one, and the compiled export check refuses a component that leaves one out. P-26, the team's later word: the compiler's prelude restates each such member bodyless (Library/CompilerLibrary.fsi:112-120 against Library/CompilerLibrary.fss:301-312), and the team's equalListMembers counted every api member, inAPI.length > inComp.length (5a68404fd), until 031c38bbc, climb batch 21b's rung E, made it skip the members written abstract. Row 816 holds the defect: a client compiled against the api that calls such a member dies with NoSuchMethodError, also where every object defines it, since its invokeinterface names the component's trait interface (explorations/perf-probes/export-abstract-codegen/REPORT.md, sections 1 and 5; 9 of the library's 12 die, 3 resolve through a parent). F-282 states the check as it stands, F-286 the api's String. The library's way for the declarations: the component's bodyless members beside them, and the prelude's GeneratorZZ32. This record's section 2, question 3 and forks 2 to 4, give the defaults you build; question 3 is the curator's informed yes, its default P-158 as it stands.

**What you build.**
- The export check, the planner's count816 (explorations/compile-ladder/plan-22c/probes/edits22c.py; rung-A.patch): equalListMembers (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:789-805) counts every api member again, inAPI.length > inComp.length, and matches an api member written abstract by a component member of the same name and header, the abstract modifier aside, through a new equalAbstractMember before equalMember (:816) that calls equalFnHeaders(headerL, headerR, true), the team's ignoreAbstract (:606-615). Its comment says what the check asks. Take the text, or improve it and say why.
- The library, the planner's absMaybe absArray absReduction absRange absString (python3 -I explorations/compile-ladder/plan-22c/probes/edits22c.py <your tree> count816 absMaybe absArray absReduction absRange absString): 12 bodyless declarations at the api's headers, no abstract written:
  - absMaybe: AnyMaybe's getter holds() : Boolean (Library/FortressLibrary.fss:1612-1615; api Library/FortressLibrary.fsi:983).
  - absArray: ReadableArray's opr[_:TrivialOpenRange] : ReadableArray[\E,I\], after its opr[r:Range[\I\]] (fss:2175; fsi:1462), as ImmutableArray and Array declare theirs (fss:2208, :2241).
  - absReduction: ActualReduction's empty(): L and join(a: L, b: L): L (fss:3247; fsi:1897-1898).
  - absRange: Range's getter isEmpty(): Boolean, after its getter extent() (fss:4008; fsi:2195).
  - absString: String's getter depth() : ZZ32 and getter isBalanced(): Boolean among its getters, and verify() : (), rangeContains(r: Range[\ZZ32\], c: Char) : Boolean, splitWithOffsets(): ZeroIndexed[\(ZZ32, String)\], split(): Generator[\String\] and balanced(): String among its methods (fss:4336-4446; fsi:2447-2522). The parser refuses a getter after a method.
- The specification, by question 3's default: Specification/basic/components/source-code.tex:372-385, subsection "Export Statements", revised in the revision form (the fortress-repo skill's specification.md, "Changing the text: the revision form"): the satisfying trait or object declaration declares each method that the exported declaration writes abstract, at its header, with a body or without one. Its Appendix I entry quotes the original text, Specification-1.0-frozen/basic/components/source-code.tex:380-385, names P-158 as its decision and the team's prelude and 2012 check as its rationale, and gives the way back; a revision box at the passage; the front matter's paragraph checked; the decision record in your rung's folder.
- Not yours: the code generator's third way (the export-abstract-codegen probe, section 3); a bridge for a narrower return, which the code generator already emits once the trait declares the member (that probe's V10); row 815; the export check's other rules (rungs O and L).

**Rows.**
- Row 816: the gather closes it with your commit, its test XXXExportAbstractMemberAbsent (renamed below).

**Distance sites.** Your test for the library text is the distance stage, explorations/coordinator/tools/distance/run.sh; its before is climb batch 22's landed table and per-site list (explorations/compile-ladder/climb-batch-22/gate/distance.txt; explorations/compile-ladder/gate/distance-sites.tsv): 0, no site. The planner measured on the base: your check alone gives 1 error, the export error, with 5 entries, ReadableArray, ActualReduction, Range, String and AnyMaybe, each due to missing members of the trait/object in the component; with the 12 lines, 0 over the twelve, #crash none (section 4, "Rung A"). Run it once on your final tree, after the build: 0. Compare with python3 -I explorations/perf-probes/array-sites/compare-sites.py. Run the count stage once on your final tree: 0, since the component's check now reaches the export check (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:281-284). Any site that comes, in any component, is a point to report. You change the compiled checker: time the count stage on the base build and on your tree, then make the speed pass that the fortress-repo skill's compiler.md, "The checker's time", asks for (P-148).

**Files.**
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala: equalListMembers and the new equalAbstractMember, only.
- Library/FortressLibrary.fss: the 12 declarations in AnyMaybe, ReadableArray, ActualReduction, Range and String, only.
- ProjectFortress/compiler_tests/: the tests below.
- Specification/basic/components/source-code.tex, Specification/appendices/changes.tex, and Specification/fortress/preamble.tex if its paragraph turns false.
- Not: the api, walk's Java, the code generator, ExportChecker's other functions.

**Tests, first.**
- XXXExportAbstractMemberAbsent: git mv ProjectFortress/compiler_tests/ExportAbstractMemberAbsent.fsi, .fss and .test to XXXExportAbstractMemberAbsent, the names inside renamed, its comment line saying that the component's trait must declare f, the .test with compile and compile_err_contains=missing members of the trait/object in the component, the form of XXXExportMemberName.test. On the base its program compiles, which the harness reports red; after, green.
- XXXExportAbstractMemberOtherHeader: api trait T abstract f(): ZZ32 end; component trait T f(): String = "other header" end; compile_err_contains=different method f. The planner's run: the base accepts it, rc 0; the four rungs' text refuses it, 'due to different method f'.
- ExportAbstractMemberBodyless, a guard: api trait T abstract f(): ZZ32 end and mk(): T; component trait T f(): ZZ32 end, object O extends T f(): ZZ32 = 3 end, mk(): T = O, and a run() asserting mk().f() is 3; link and run, PASS on the base and on the four rungs' text (the planner's runs).
- ExportAbstractMemberDefined stays green: a body satisfies an abstract member.
- The distance stage, as above. Walk: the 12 declarations moved no value in the planner's run of walk's suite on the four rungs' text (683 tests, no failure); after the change, ant testSystem once and ant testSpecData once, since the component changes (P-124).
- After the checker change, ant testQuick once (the skill's tests-running.md, "When to run a whole suite"). On the four rungs' text the planner's run gave one failure of yours, ExportAbstractMemberAbsent, which the turn above answers.

**Specification.** source-code.tex:380-385 is made false: your rung revises it (above). apis.tex:252-256 stays true, since no body is asked. Grep Specification/ and Appendix I for another sentence that says an api's abstract member needs no declaration in its component; the planner's grep found none. List every sentence made false as revival-change material: F-282's "asks no definition for an api member written abstract", and the fortress-repo skill's library.md, "It requires no component member for an api member written abstract", and compiler.md's second trap of the compiled path among them.

**Overlaps by file.** ExportChecker.scala: rung O edits :274-275 and adds a method before equalNames (:598), rung L edits equalParams (:658-668); none of your functions. Library/FortressLibrary.fss: rung O edits the # and : headers (fss:4164-4179), below your lines. The gather applies O, B, L, then you. You meet in the compiled tracks, walk's suite and both stages.

### O. Row 782: the export check reads top-level operators, and the 9 headers match (P-155; rows 782 and 827)

**The answers this rung follows.** P-155: the checker reads symbolic operators by the rules that it applies to any function, so that the distance reaches zero with them checked; read to cover the export check, the phase 3 exit judgement's item 7, this record's question 2, default yes. F-287: of the 157 top-level operator declarations in the twelve apis, 148 match their components and 9 differ, and the export check reads none of them. Row 782: the skip, isDeclaredName at ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:275, the team's; and the double key, IndexBuilder.buildFunction filing each function under its name and under a name made from its span (scala_src/typechecker/IndexBuilder.scala:439-446, the team's). Row 827: the 9, and their cost: a compiled call through the api's header dies with NoSuchMethodError. The library's rule for a header (the fortress-repo skill's library.md, "Designing a change"): the api states the component's header, except where the api cannot name the component's type, where the component takes the api's. This record's section 2, questions 2 and 4 and forks 5 and 6, give the defaults you build.

**What you build.**
- The export check, the planner's opr782 (rung-O.patch): the loop over the api's functions (ExportChecker.scala:274-275) admits a name by overloadingChecker.isCheckedName (scala_src/typechecker/OverloadingChecker.scala:770-773), every operator as well as every name that isDeclaredName admits, and only a name under which a function is declared, by a new isDeclarationName before equalNames (:598): a key among whose functions is a declared function whose own name it is. So no span key is read. Take the text, or improve it and say why.
- The library, the planner's hdrRange hdrBig hdrList (python3 -I explorations/compile-ladder/plan-22c/probes/edits22c.py <your tree> opr782 hdrRange hdrBig hdrList):
  - hdrRange: the component's # three times and : three times (Library/FortressLibrary.fss:4164-4179) answer the api's CompactFullRange[\ZZ32\], CompactFullRange[\(ZZ32,ZZ32)\] and CompactFullRange[\(ZZ32,ZZ32,ZZ32)\] (Library/FortressLibrary.fsi:2309-2317), since the api cannot name RangeInternals' types, which import it; the bodies stay, as the component's ReadableArray1 writes getter bounds():CompactFullRange[\ZZ32\] = sized1Range(b0,s0) (fss:2355).
  - hdrBig: the api's BIG || and BIG ||| over a generator take the component's header, [\T\](g: Generator[\T\]) (fsi:2128, :2135; fss:3689, :3699).
  - hdrList: Library/List.fsi imports CovariantCollection.{AnyCovColl}, as Library/IntMap.fsi:13 and Library/PrefixSet.fsi:33 do, and its BIG <|[\T\]|> states the component's type, Comprehension[\T,List[\T\],AnyCovColl,AnyCovColl\] (List.fsi:114; Library/List.fss:178).
- Not yours: the narrower-return question (question 4); IndexBuilder's second key for its other readers; the overloading check's reading of operators, built (F-281); rows 813 and 814.

**Rows.**
- Row 782: the gather closes it with your commit, its test XXXExportOperatorHeader.
- Row 827: the gather closes it with your commit, its test the distance stage.
- A new row, NEW-O-1, CONTESTED, class design limit (specification): the compiled export check asks the component's top-level function or method at the api's header, where Specification/basic/components/source-code.tex, "Export Statements", accepts a declaration whose return type is a subtype; a compiled call names the api's header, so a narrower one dies with NoSuchMethodError (row 827's probe). Not decided: the check's rule, or the text's with a bridge at the api's descriptor (this record's question 4). Its reproducer your XXXExportOperatorHeader.

**Distance sites.** Your test for the library text is the distance stage, its before climb batch 22's landed table and per-site list: 0, no site. The planner measured on the base: your check alone gives 2 errors, both export: FortressLibrary's, listing BIG ||, BIG ||| and the six # and :, and List's, listing BIG <|_BIG |>; no span key and nothing else; with the 9 lines, 0 over the twelve, #crash none (section 4, "Rung O"). Run it once on your final tree, after the build: 0. Compare with python3 -I explorations/perf-probes/array-sites/compare-sites.py. Run the count stage once on your final tree: 0; its table gains a row, CovariantCollection 0, since List's api now imports it. Any site that comes is a point to report. You change the compiled checker: time the count stage on the base build and on your tree, then make the speed pass that the fortress-repo skill's compiler.md, "The checker's time", asks for (P-148).

**Files.**
- ExportChecker.scala: the loop's admission (:274-275) and the new isDeclarationName, only.
- Library/FortressLibrary.fsi: BIG || and BIG ||| over a generator, only. Library/FortressLibrary.fss: the six # and : headers, only. Library/List.fsi: its import and its BIG <|[\T\]|>, only.
- ProjectFortress/compiler_tests/: your tests.
- Not: IndexBuilder.scala, OverloadingChecker.scala, the components' bodies, ExportChecker's equalParams and equalListMembers.

**Tests, first.**
- XXXExportOperatorHeader: api trait A end, object B extends A end, opr #(a: String, b: String): A; component the same two types and opr #(a: String, b: String): B = B; compile_err_contains=does not define all declarations. The planner's run: the base accepts it, rc 0; the four rungs' text refuses it, 'Missing declarations: {#(a:String,b:String):XXXExportOperatorHeader.A ...}'.
- ExportOperatorMatch, a guard of the double key: api opr #(a: String, b: String): String; component the same, = a || b, with a run() asserting "x" # "y" is "xy"; link and run, PASS on the base and on the four rungs' text. A check that admits operators and still reads the span keys refuses it, by the zero audit's shadow (a), which found the 157 span keys absent.
- The distance stage, as above. Walk: after the change, ant testSystem once and ant testSpecData once, since the component changes (P-124).
- After the checker change, ant testQuick once. On the four rungs' text the planner's run gave no failure of yours, and the compiler's prelude compiled: its operators match.

**Specification.** Specification/basic/components/source-code.tex:355-360 and :399-404 accept a narrower return type, which the check refuses for operators now as it did for every named function: question 4 and NEW-O-1; no edit in this batch. Part IV renders the api: BIG || and BIG ||| become generic and List's comprehension type changes; list them as points to report; they need no edit. Grep Specification/ and Appendix I for a sentence that says the export check skips operators; the planner's grep found none. List every sentence made false as revival-change material: F-287's "the export check reads none of them" among them.

**Overlaps by file.** ExportChecker.scala: rung L edits equalParams (:658-668), rung A equalListMembers (:789-805) and adds a method before equalMember (:816); none of yours. Library/FortressLibrary.fss: rung A adds 12 declarations above your lines, from fss:1614; the gather applies you first, by the manifest's order, so its records cite your lines as they then stand. You meet in the compiled tracks, walk's suite and both stages.

### L. List's two imports in the stage, and cleared (F-288; rows 828 and 829)

**The answers this rung follows.** F-288: the twelve are not closed under import; List imports CovariantCollection and OneShotFlag (Library/List.fss:13, :15), which the checker refuses: row 828, 12 errors and 2 crashes, and row 829, 1 export error. Every ArrayList holds OneShot fields (List.fss:253-254) and every list comprehension goes through covariantCompr (List.fss:178-179). P-27, the library's own practice; in CovariantCollection, the team's own devices: an arm that fails for a case no narrower arm takes (upward's NonEmpty arm, Library/CovariantCollection.fss:17-19) and the cast (F-264). F-75: the Return Type Rule over every instance. F-282: a field matches with its modifiers other than var, since var without settable only affects implementations (traits.tex, "Abstract Field Declarations"); and source-code.tex, "Export Statements": "A field declaration is satisfied by a (possibly implicit) getter and/or setter declaration, depending on whether the field is declared to be hidden and/or settable". An api cannot write var on an object's parameter (the api grammar's ApiFldMod, objects.tex, "Field Declarations"; ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:143-158). This record's section 2, forks 7 to 10, give the defaults you build.

**What you build.**
- The stage, the planner's stage14: the distance stage's list of components (explorations/coordinator/tools/distance/run.sh:85-87) gains Library/CovariantCollection.fss and Library/OneShotFlag.fss after the twelve; its header says fourteen.
- The library, the planner's covcoll (python3 -I explorations/compile-ladder/plan-22c/probes/edits22c.py <your tree> covcoll varparam stage14; rung-L.patch):
  - Library/CovariantCollection.fsi: AnyCovColl declares abstract dirtyIAF[\R\](a:ImmutableArray[\R,ZZ32\], i:ZZ32): (); CovariantCollection declares abstract opr | self |: ZZ32; the traits AnyEmpty extends AnyCovColl and AnySingleton extends AnyCovColl, with abstract getter x(): Any, are declared, and Empty and Singleton extend them, as the component's do.
  - Library/CovariantCollection.fss: upward's arms take Empty[\R\] as their first parameter, in place of Empty[\I\] with I extends R, since every call passes the target type there (:32, :34, :146); its NonEmpty arm answers NonEmpty[\R\]; one more arm, upward[\R\](_: Empty[\R\], s: AnyCovColl): CovariantCollection[\R\] = cast[\CovariantCollection[\R\]\](s); iaf and aaf gain an arm each over CovariantCollection[\T\] that fails, fail[\()\]; the trait CovariantCollection declares opr |self|: ZZ32, bodyless; Singleton's dirtyIAF writes a.init(i,cast[\R\](x)); Append's field writes sz: ZZ32 = |a| + |b|.
- The export check, the planner's varparam: equalParams (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:658-668) compares a parameter's modifiers less var, as equalLValue compares a field's (:841-851); its comment says why.
- The stage's api lines, by fork 10's default: explorations/coordinator/tools/distance/table.py reads the @@TC API lines, so that an api whose errors= is above 0 and which printed no @@SC line of its own turns #total into none:, naming it, and an @@TC API-CRASH line becomes a #crash row; a canned case in explorations/coordinator/tools/distance/test_classify.py, class Readings, first, seen failing, then passing.
- Not yours: the checker's refusal of a field with no type (NEW-L-1, below); OneShotFlag's own files; List's own text; the other components that import CovariantCollection (Set, Map, PureList, PrefixSet, PrefixMap, IntMap); the stage's setting (rung B).

**Rows.**
- Row 828: the gather closes it with your commit, its test the distance stage.
- Row 829: the gather closes it with your commit, its test ExportVarObjectParameter.
- A new row, NEW-L-1, NEGATIVE-VERIFIED, implementation gap (checker): the compiled checker refuses an object's field declared without a type, 'Must provide type for initializer' (scala_src/typechecker/Thunker.scala:91, the team's), and leaves the object unchecked ('Cannot handle (LValue ...'), where the grammar's FldDecl lets a field leave its type out (Specification/basic/objects.tex, "Field Declarations"); met at CovariantCollection.fss:125 by the zero audit; workaround: write the type. Its reproducer none, its notes the planner's run, unless you write a gated XXX compile test.

**Distance sites.** Your test for the library text is the distance stage over the fourteen. Its before is the planner's run on the base with the two components added (section 4, "The base over the fourteen"): #total 13, export 2, return-type 2, typecheck 9, all in the two components, and 2 crashes in CovariantCollection; never run it on your base again. The planner's run of your text, with the two components as the driver's only targets: 0, #crash none. Run the stage once on your final tree, after the build: 0 over the fourteen, #crash none. Compare with python3 -I explorations/perf-probes/array-sites/compare-sites.py: the two components' sites go, nothing comes. Run the count stage once on your final tree: 0. You change the compiled checker: time the count stage on the base build and on your tree, then make the speed pass that the fortress-repo skill's compiler.md, "The checker's time", asks for (P-148).

**Files.**
- Library/CovariantCollection.fsi and Library/CovariantCollection.fss: the lines above, only.
- ExportChecker.scala: equalParams, only.
- explorations/coordinator/tools/distance/run.sh: the list of components and its header; table.py and test_classify.py beside it: the api lines.
- ProjectFortress/compiler_tests/ and ProjectFortress/tests/: your tests.
- Not: OneShotFlag's files, List's files, the other importers, walk's Java, ExportChecker's other functions, the stage's setting.

**Tests, first.**
- ExportVarObjectParameter: api object O(x: ZZ32) end; component object O(var x: ZZ32) end; compile. The planner's run: the base refuses it, 'different parameters for object constructors'; the four rungs' text accepts it.
- A walk guard of covariant collections, named by its topic, such as CovariantCollectionArmsWalk: APPCOV of Empty and NonEmpty collections at a narrower and a wider element type, toImmutableArray and toArray of each, and a list comprehension through covariantCompr, the values asserted; passing on the base and after. The planner's harness run of twelve walk tests on your text (CovCollTest, CovariantTest, ListTest, MapTest, IntMapTest and OpenParameterListComprehensionWalk among them): OK (12 tests); OpenParameterListComprehensionWalk's comprehension at the open type still ends in CastError, by the cast arm.
- The canned case of table.py, above.
- The distance stage, as above. After the change: ant testSystem once and ant testSpecData once, since the library changes (P-124), and ant testQuick once, since the checker changes.

**Specification.** None by the planner's grep: source-code.tex's field rule lets a getter satisfy a field, which a var parameter gives. Grep Specification/ for a sentence on an api object's parameter modifiers; list every sentence made false as revival-change material: F-288's "which the compiled checker refuses" and rows 828's and 829's claims among them.

**Overlaps by file.** ExportChecker.scala: rung O edits :274-275 and before :598, rung A :789-805 and before :816; none of yours. run.sh: rung B edits its default setting (:82); the gather applies B before you. No other rung edits CovariantCollection or table.py. Rung O's List.fsi imports your api's AnyCovColl, which you keep. You meet in walk's suite, the compiled tracks and both stages.

### B. The bound Any for fortress compile (P-42; row 412)

**The answers this rung follows.** P-42: a type parameter declared without a bound has the implicit bound Any, not Object. Row 412: the compile command gives it Object (ProjectFortress/src/com/sun/fortress/Shell.java:372, in useCompilerLibraries(), which compile, link, build and typecheck call; Steele, 2012: 91e71e62e, c61723f61, afb02f41d). F-289: under the compile command's setting the twelve give 685 errors, 580 on the bound Object. F-291, F-292 and the bound probe, explorations/perf-probes/bound-any-compiled/REPORT.md: under Any, tuple and arrow static arguments compile, load and run as with extends Any written; the switch is the one line and ten test edits; the 23 .test files of the compiled tests that import CompilerSystem pass under either bound. The foundations judgement, section 4, "Defaults": the flip lands in 22c as one small rung, CoercionGenericFnCompiledRungC given T extends Object with a comment naming the prelude's || until the switch-over. Rows 691 and 832 are defects that the flip touches and does not fix, and so is row 339. This record's section 2, forks 11 to 14, give the defaults you build.

**What you build.**
- The compiler, the planner's bound412 (rung-B.patch): Shell.java:372 reads setExtendsObjectPreDesugaring(false).
- The stage, the planner's stageCompile: DistanceMulti -setting compile (explorations/coordinator/tools/distance/DistanceMulti.java:44-46) takes the extends-Object switch from the line that opens Shell.useCompilerLibraries() in the tracked Shell.java at each run, and stops if that line is not there; run.sh's default setting (:82) becomes compile, so the gate's distance stage runs under the compile command's own setting from then on; both headers say so. Do not call Shell.useCompilerLibraries() from the driver: the planner's first form did, and the run crashed on 214 declarations, 'Undefined API: CompilerBuiltin', since Types' constants were made under the prelude's names.
- The tests below: the bound probe's ten and tests/doubledOverloading.fss.
- Not yours: rows 339 and 832, whose static arguments die compiled under either bound; row 691's checker gap; row 653; the count stage's setting (fork 16); the prelude's || at Object, until the switch-over.

**Rows.**
- Row 412: the gather closes it with your commit, its test ImplicitBoundAny (promoted).
- Row 691: a note: under the bound Any, id((3, 4)) for id[\T\](x: T): T is refused, '(ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type ((IntLiteral, IntLiteral), IntLiteral)', where under Object it compiled and ran id(3); the extra-argument gap stays.
- Row 832: a note: the bound Any lets a tuple static argument reach a generic dotted method on the compile command, as b.wrap[\(ZZ32,ZZ32)\]((2, 3)), which dies as the row says; the flip does not fix it.
- Row 339: a note: the flip lets () reach a type parameter of a program's own declaration on the compile command; the call dies as the row says.
- Row 653: a note: XXXOverrideGenericReturnTypeNotSubtype's first case is respelled, since under the bound Any its override f(x: Any) beside f[\T\](x: T) overrides nothing, which the checker does not refuse.

**Distance sites.** Your tests are those below; run the distance stage and the count stage once each on your final tree, after the build. After your change the stage's compile setting reads the switch false and runs as the setting any runs today: 0 over the twelve, #crash none (F-53; the planner's run of the four rungs' text: 0 over the fourteen, its run printing extendsObject=false under setting compile). Before your change, run.sh with the setting compile gives 685 (F-289); never run it on your base again. The count stage: 0; it runs walk's setting, which you do not change. You change no code of the checker: report the count stage's seconds, and make no speed pass.

**Files.**
- ProjectFortress/src/com/sun/fortress/Shell.java: line 372, only.
- explorations/coordinator/tools/distance/DistanceMulti.java and run.sh: the compile setting and the default, only.
- ProjectFortress/compiler_tests/: XXXImplicitBoundAny (promoted), XXX6bu.test, XXX6bv.test, XXXInferCallArgumentControls.test, OpenTypeChecker.fss, ComprisesWhereFunctionalMethodChecker.fss, ComprisesWhereOverrideChecker.fss, XXXComprisesWhereFunctionalMethodBounds.fss, XXXOverrideGenericReturnTypeNotSubtype.fss, CoercionGenericFnCompiledRungC.fss. ProjectFortress/tests/doubledOverloading.fss.
- Specification/: the sentences below.
- Not: the checker's Scala, the code generator, the class loader, the prelude, the library.

**Tests, first.**
- Promote XXXImplicitBoundAny (the skill's tests-writing.md, "Promoting an XXX test"): git mv to ImplicitBoundAny, its component renamed, its .test link and run with run_out_contains=kind of a Seal at Any -> Seal at Any; seen failing on the base, 'The static argument Any does not satisfy the corresponding bound Object.', and passing after.
- The bound probe's other nine, each respelled to keep the value it checks (its section "The CompilerSystem tests, and the compiled tracks, under (ii) against (i)"): XXX6bu.test and XXX6bv.test pin [\T\](T, T)->T and [\T\](T, String)->T where they pin [\T extends Object\]; XXXInferCallArgumentControls.test pins BoxT[\Any\] where it pins BoxT[\Object\]; the four comprises tests write where [\E\] (and where [\F\]) where they write where [\E extends Object\], as the one library writes AnyList comprises List[\E\] where [\E\]; XXXOverrideGenericReturnTypeNotSubtype's first case keeps an override that widens, by A's f[\T extends Object\](x: T): T, with row 653 named in its comment; CoercionGenericFnCompiledRungC's gf[\T extends Object\], with a comment naming the prelude's String || at Object until the switch-over.
- tests/doubledOverloading.fss, the team's test: a[\E extends Object\] and b[\F extends Object\], with one comment line that the bound keeps a() and a(v) apart; its walk run does not change, and its ladder file stays at pass. The planner's runs: under the flip the file is refused, 'For a, the return type of ()->() ... should be a subtype of the return type of [\E\]E->A[\E\]'; respelled, it compiles.
- The 23 .test files of the compiled tests that import CompilerSystem (F-292): run them once, in one JVM, after the change.
- ant testQuick once after the change. On the four rungs' text the planner's run gave 13 failures in 11 tests: the ten of yours, 12 failures, and rung A's one.
- The ladder regression of your own subset after your edit (the skill's gate.md, "The ladder regression"): tests/doubledOverloading.fss.

**Specification.** Made false by the flip, each corrected to what the code then does: Specification/basic/trait-parameters.tex:62-65, the revision box ("The compiled path still gives such a type parameter of a program's own declarations the bound Object (row 412 ...), a divergence that lasts until the compiled path is switched over"); Specification/appendices/changes.tex:3089-3092, the same sentence in the effect of revival-bound; Specification/basic/inference.tex:37-40 and :358-362. Grep Specification/ for row~412 for any other. List every sentence made false as revival-change material: F-289; P-42's "The compiled path departs from it until the switch-over, which ends the departure", the curator's text, for the record's pass; the fortress-repo skill's compiler.md trap "Before disambiguation, the compiled path bounds an unbounded type parameter by Object" among them.

**Overlaps by file.** run.sh: rung L edits its list of components (:85-87); the gather applies you before L. No other rung edits Shell.java, DistanceMulti.java or your tests. You meet in the compiled tracks, the ladder, the atomic runs and the distance stage, whose setting you change for the gate.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another rung (PLAN, "The principle for the batches"). No rung lands only with another: each alone keeps the distance it measures (A and O 0 over the twelve, L 0 over its two components, B 0 by the setting any's landed table).
- The declarations each rung changes. A: the export check's equalListMembers and a new equalAbstractMember; AnyMaybe, ReadableArray, ActualReduction, Range and String in the component. O: the export check's loop over the api's functions and a new isDeclarationName; the component's # and :, the api's BIG || and BIG |||, List's api import and comprehension. L: the export check's equalParams; CovariantCollection's api and component; the stage's list and table.py. B: Shell.useCompilerLibraries()'s first line; the stage's compile setting and default; eleven tests.
- Files two rungs share: ExportChecker.scala (O at :274, L at :658, A at :789), Library/FortressLibrary.fss (A at :1614, O at :4164) and the stage's run.sh (B at :82, L at :85). By the gather's rule, rungs that share a file go by their lowest edited line there, and a pair that two files order both ways keeps the manifest's order: A and O meet in both directions, so the manifest puts O before A; with ExportChecker.scala's O, L, A and run.sh's B, L, the order O, B, L, A keeps every file's order, and the manifest gives it; the brief's order A, O, L, B as the manifest's would put A before O and so make a cycle with ExportChecker.scala's. Each rung's patch applies to the base alone, and the four together give the text the planner measured.
- They meet in the compiled tracks, walk's suite and both stages: the gate's tables on the merged tree are the first with all four, and the planner's measurement of their text together expects the distance 0 over the fourteen under the compile setting, the count 0, and the compiled tracks green once the rungs' test edits are in (section 4).

## 4. The candidates, and what the batch leaves out

### The four rungs, with their sources

The foundations judgement names the batch's four rungs and its exit gate (`reviews/foundations/judgement.md`, section 5): row 816's repair (P-158), row 782 with P-155 read to cover the export check, `List`'s two imports, and the bound `Any` for `fortress compile`. The phase 3 exit review measured three of them (`reviews/phase3-exit/zero-audit.md`, A.2, A.3, A.4; `reviews/phase3-exit/judgement.md`, sections 2 and 5), and the bound probe the fourth (`perf-probes/bound-any-compiled/REPORT.md`). Their befores are climb batch 22's gate tables, taken as findings: the distance 0, the count 0, `#crash none` (F-53).

### The planner's probes

Three worktrees seeded detached from the base build, `/home/user/fortress-p22c-a`, `-b` and `-c`, at `e0ec620a9`. The stages are the gate's own (`tools/distance/run.sh`, `tools/checker-count/run.sh`), or copies of the distance stage that add targets or put a class folder ahead of the build (`plan-22c/probes/NOTES.md`); an edit of the export check was compiled into a scratch folder ahead of the build, and the four rungs' text together was built with `ant compileAll`. Site lists compared by reading `errors.tsv`.

**The base over the fourteen** (run b14: the stock stage, the two components added after the twelve, setting `any`): '#total 13', 'return-type 2', 'typecheck 9', 'export 2', '#unit component CovariantCollection 12', '#unit component OneShotFlag 1', two crashes. Each, with its cause and its way (rung L):

| Unit | Errors | Cause | Way (edit) |
|---|---|---|---|
| `CovariantCollection` | export 1, 3 entries | `AnyCovColl`'s abstract `dirtyIAF` not in the api; `Empty` and `Singleton` extend `AnyEmpty` and `AnySingleton`, which the api does not declare | the api states them (`covcoll`), `AnySingleton`'s `x` written `abstract` there |
| | return-type 2 | `upward`'s `R` fixed by no argument, so the every-instance rule refuses `Singleton[\R\]` against `Singleton[\R\]`; its `NonEmpty` arm answers `Singleton[\R\]`, which `Append[\R,A,B\]` is not | the first argument `Empty[\R\]`; the `NonEmpty` arm `NonEmpty[\R\]` |
| | typecheck 2 (`:32`, `:146`) | no `upward` arm takes a `CovariantCollection[\B\]` or an `AnyCovColl` | an arm over `AnyCovColl` that casts |
| | typecheck 2 (`:48`, `:62`) | `iaf` and `aaf` take only an `Append`, and the `typecase`'s `else` leaves a `CovariantCollection[\T\]` | an arm each over `CovariantCollection[\T\]` that fails |
| | typecheck 4 (`:54`, `:68`, `:79`, `:84`) | no `opr \|self\|` on `NonEmpty` or `CovariantCollection`, only on the objects | `opr \|self\|: ZZ32` on the trait, bodyless, `abstract` in the api |
| | typecheck 1 (`:115`) | `Singleton`'s `dirtyIAF` inits an array of `R` with its `T` | `cast[\R\](x)` |
| | crash 2 | `Append`'s field `sz = \|a\| + \|b\|` has no type: 'Must provide type for initializer' (`Thunker.scala:91`), and the object is not checked | `sz: ZZ32` (NEW-L-1 for the checker's refusal) |
| `OneShotFlag` | export 1 | `object OneShot( var canTryIt : Boolean )` against the api's `OneShot( canTryIt : Boolean )`: 'different parameters for object constructors' | the check compares a parameter less `var` (`varparam`) |

**Rung L's text, the two components as the driver's only targets** (runs l1 to l3):
- l1, `covcoll` with the api's parameter written `var` (`oneshotApi`): `CovariantCollection` 1 export entry, `AnySingleton`'s `x` 'is not declared in the API'; `OneShotFlag` stopped before the checker, 'var cannot modify an object parameter, canTryIt' (`SyntaxChecker.java:143-158`).
- l2, `covcoll` with `x` written `abstract` and `varparam`: '#total 0', '#crash none'. Its `upward` arm over `AnyCovColl` was then a `fail`.
- Walk on l2's text, twelve tests of covariant collections in one harness call: 'Tests run: 12, Failures: 1', `OpenParameterListComprehensionWalk`, 'FAIL: upward: not a covariant collection': the open type that the test pins in `CastError` now reached the general arm.
- l3, the general arm a cast: '#total 0', '#crash none'; the same twelve walk tests 'OK (12 tests)'.

**Rung A** (runs a0, a1 and as, the twelve):
- a0, the check alone (`count816`): '#total 1', 'export 1', '#crash none'; its entries `ReadableArray`, `ActualReduction`, `Range`, `String` and `AnyMaybe`, each 'due to missing members of the trait/object in the component'. The same five that the planner of climb batch 22 and the zero audit measured with `plan-22/probes/export-check-alt4i.patch`.
- a1, the check with the 12 declarations: '#total 0', every kind 0, '#crash none'.
- as, the team's count with the modifiers compared whole (`count816strict`) and the 12 declarations: '#total 1', 'export 1': `Indexed` 'due to different method size' and `Equality` 'due to different method ='. Their components give the member a body where the api writes `abstract`. So the strict form needs P-158's "with a body" read away, and `ExportAbstractMemberDefined` would turn red.

**Rung O** (runs o0 and o1, the twelve):
- o0, the check alone (`opr782`): '#total 2', 'export 2', '#unit component FortressLibrary 1', '#unit component List 1', '#crash none'. `FortressLibrary`'s lists `BIG ||(g:Generator[\Any\])`, `BIG |||(g:Generator[\Any\])`, the three `#` and the three `:`; `List`'s lists `BIG <|_BIG |>[\T\]()`. No span key and nothing else: the other 148 operators match under the stock rule, `existsMatching` over the covering declarations.
- o1, the check with the 9 header lines: '#total 0', every kind 0, '#crash none'.

**The four rungs' text together** (worktree `-c`, `text22c.patch`, built):
- The library order: all five compiles rc 0, the five jars in place. So the compiler's prelude passes the restored count, the operators and the parameter rule.
- c1, with a first `stageCompile` that called `Shell.useCompilerLibraries()` and then `useInterpreterLibraries()`: '#total 0' but 225 crash rows, 214 of them declarations, 'IllegalArgumentException Undefined API: CompilerBuiltin', and 11 stages, leftover crashes in every component. Not a measurement of the text; the form was replaced.
- c2, the stock stage of the tree, which is the gate's after the batch (setting `compile`, read from `Shell.java`): '### order=check setting=compile (extendsObject=false compiledExpr=true)', 14 targets; '#total 0', every kind 0, '#crash none', '#seconds 296 FortressLibrary 220', '#shadow every shadow edit matched the tracked sources'. All 14 '### done' lines rc 0; 191 '@@SC STAGE' lines, all 'errors=0' (13 apis with every stage, `CovariantCollection`'s among them since `List`'s api imports it, and 14 components); all 14 '@@TC API' lines 'errors=0', `OneShotFlag`'s among them.
- The count stage: '#total 0', '#locations 0', '#crash none'; its table has 13 api rows, `CovariantCollection 0` the new one.
- `ant testQuick`: library 'Tests run: 86, Failures: 0', othercompiler 'Tests run: 263, Failures: 0', compiler 'Tests run: 1315, Failures: 13'. The 13 are the bound probe's 12 in 10 tests (`XXXImplicitBoundAny`, `Compiled6.bu`, `Compiled6.bv`, `XXXInferCallArgumentControls`, `OpenTypeChecker`, `ComprisesWhereFunctionalMethodChecker`, `ComprisesWhereOverrideChecker`, `XXXComprisesWhereFunctionalMethodBounds`, `XXXOverrideGenericReturnTypeNotSubtype`, and `CoercionGenericFnCompiledRungC` three times) and `ExportAbstractMemberAbsent`. Rungs O and L turn no compiled test red. Not timed.
- `ant testSystem`: 'Tests run: 162', '173', '168' and '180', 'Failures: 0, Errors: 0', 683, the landed count; `ant testSpecData`: 'Tests run: 130, Failures: 0, Errors: 0'. Not timed.
- The ladder regression (the skill's `gate.md`, step 7, with the tree's caches after the library order): `ladder_compare` printed 'DOWN tests/doubledOverloading.fss pass -> typecheck' and 'MISSING tests/doubledOverloading.fss', and nothing else; the microGPT phases equal the baseline's.
- The four-thread atomic runs: 42 lines, 42 'PASS'.

**The ladder's one file, by the bound flip alone** (the skill's quick loop, `Shell.java` with `bound412` compiled ahead of the base's classes): `tests/doubledOverloading.fss` rc 0 on the base and 255 with the flip, 'For a, the return type of ()->() @ ...:37:1-39:70 should be a subtype of the return type of [\E\]E->A[\E\] @ ...:36:1-35', and the same for `b`. A copy with `a[\E extends Object\]` and `b[\F extends Object\]` gives rc 0 on both. So the move is rung B's, and its respelling clears it.

**Five compiled programs** (`plan-22c/probes/NOTES.md`, inline), each on the old code and on the four rungs' text:

| Program | Old code | The four rungs' text | Rung |
|---|---|---|---|
| `ExportVarObjectParameter` | rc 255, 'different parameters for object constructors' | rc 0 | L |
| `XXXExportOperatorHeader` | rc 0 | rc 255, 'Missing declarations: {#(a:String,b:String):XXXExportOperatorHeader.A ...}' | O |
| `ExportOperatorMatch` | PASS | PASS | O, a guard |
| `XXXExportAbstractMemberOtherHeader` | rc 0 | rc 255, 'due to different method f' | A |
| `ExportAbstractMemberBodyless` | PASS | PASS | A, a guard |

A first `XXXExportAbstractMemberOtherHeader`, its component's `f(): String` bodyless, was refused on the old code too, by the check's other half ('Asbtract method f ... is not declared in the API'), so the rung's test gives `f` a body.

**What reading the operators uncovers**, beside the 9: nothing in the twelve (o0), nothing in the compiler's prelude (its library order compiles) and nothing in the compiled tests (`ant testQuick`).

**The sentence of the specification that P-158 makes false** (question 3): `Specification/basic/components/source-code.tex:372-385`, the same in `Specification-1.0-frozen/`, quoted in section 2. The record's earlier readings: P-158 cites only `apis.tex`; `reviews/phase3-exit/judgement.md`, 3.1, cites `source-code.tex:384-385`; `reviews/batch-21b-review.md` read `:381-385` as supporting the reading P-158 reverses; `compile-ladder/rung-export-align/REPORT.md`, section 9, called it the rule the check then did.

### Left out, each with its home

- **Row 701**, the code generator's refusal of a declaration's own `where` clause, 4 of 5 walls in the twelve being revival lines: phase 4, before the names batch (`reviews/foundations/judgement.md`, section 5; `reviews/phase3-exit/judgement.md`, 3.2 item 9).
- **Row 321**, the compiled `toString` overflow, with the tuple-rendering device that needs the curator's word: phase 4, before the names batch, after his word on the device (`reviews/foundations/judgement.md`, section 5; `reviews/phase3-exit/judgement.md`, 5.2 item 5).
- **The 52 code-generator refusals** in the twelve (F-34): phase 4, before the names batch, several rungs, sized by their planner.
- **`System`'s 2 errors** (F-290): phase 4, before or inside the names batch (`reviews/phase3-exit/judgement.md`, 5.2 item 8).
- **The natives**: climb batch 23 (`coordinator/CLIMB-BATCH-23.md`).
- **Row 832**, the tuple-typed generic dotted method, and **row 339**, `()` as a static argument: code-generator rows, which the flip reaches and does not cause.
- **The library's other 40 components** (624 errors, F-290) and microGPT's other imports: before P-12's step or the first program that needs each (`reviews/foundations/judgement.md`, section 9, item 2).
- **Question 4's other way**, a bridge at the api's descriptor: NEW-O-1.
- **The count stage's setting**: walk's, unchanged (fork 16).

## 5. How it is run

The batch runs on the workflow of climb batch 22: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`. Section 3 is each worker's brief word for word; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-22c/manifest/gen22c.py` reads with the briefings of `lists22c.py` beside it, and `check22c.js` checks.

### The generator

`plan-22c/manifest/` is committed with this record: `gen22c.py`, `lists22c.py` and `check22c.js`, made from `plan-22/manifest/`. Changed from climb batch 22's: the batch's values (`BATCH` `22c`, its folder `compile-ladder/climb-batch-22c/`, the output `manifest22c.js`); four rungs in the manifest's order O, B, L, A, which the gather's rule keeps (section 3, "The rule the rungs keep, and how they meet"), while section 3 gives them in the brief's order A, O, L, B, each found by its letter; `--without <rung>` leaves a rung out of the block. `check22c.js` checks that no rung declares `landsOnlyWith`, a checker count, a crash or a ladder move; that no rung's test is the stage alone, since each has a test first; that every section names the count stage and the distance stage; that A, O and L, which change the checker, name P-148 and their speed pass, and that B says it makes no speed pass and names no P-148; and that the record holds no copy of the block. On `main` at `2c39b1147` with this record: `lists22c.py` 'bad lists 0'; `gen22c.py`, its block checked by `check22c.js` on a scratch splice, 'problems: 0'; and `coordinator/tools/workflow-scenarios.js` on that splice, 'problems: 0'. The tracked script is not spliced: the coordinator splices it ("Before the launch", step 3).

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry, in the manifest's order. "Its test is the stage" means the distance stage is the rung's only failing-then-passing test; no rung here is so, since each writes its tests first, and the stage tests each rung's library text beside them. "Joins the gate" names a step the gate gains once the rung lands; none does, and `ant testSpecData` runs because the last landed summary has it. No rung declares a checker count: it is reported, never red. The expected minutes order the scatter only. The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands; only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### O
- **slug:** `rung-export-operators`
- **worktree:** `/home/user/fortress-exportoprs`
- **expected minutes:** 110
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** row 782: the export check reads top-level symbolic operators by the rules it applies to any function, each under its name only, the double key fixed (P-155 read to cover the export check, the record's question 2); row 827's 9 headers matched by the library's rule, the component's # and : at the api's range types, the api's BIG || and BIG ||| generic, List's api at its component's comprehension type; tests first; a speed pass.
- **points to report:**
  - Whether you took rung-O.patch as it is or changed it, and why.
  - The distance table and the export error's entries before and after, and any site that comes in any component; the count stage's table, with its new CovariantCollection row.
  - The count stage's seconds on the base and on your tree, and the speed pass's profile and result.
  - Each operator of the compiler's prelude or of a compiled test that the export check now refuses.
  - The declarations that change in the api, and so Part IV.
  - Each walk value that moves, and each test whose verdict changes.
  - The new row NEW-O-1, and rows 782's and 827's closes.
  - Every sentence made false.
  - A file edited beyond those named, or any edit of IndexBuilder.

#### B
- **slug:** `rung-bound-any`
- **worktree:** `/home/user/fortress-boundany`
- **expected minutes:** 80
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the bound Any for fortress compile (P-42; row 412): Shell.java:372 set to false; the bound probe's ten test edits, XXXImplicitBoundAny promoted, and the team's tests/doubledOverloading.fss respelled extends Object, which the ladder found; the distance stage's compile setting read from Shell.java and made the gate's default, so the gate runs under the compile command's own setting; no checker code, no speed pass.
- **points to report:**
  - Whether you took rung-B.patch as it is or changed it, and why.
  - Each test line you changed, with its before and after, the team's lines marked.
  - The distance table under the new default and the count stage's table; the count stage's seconds.
  - The ladder file that moves, and whether any other moves.
  - Each compiled program that the bound Any now refuses, accepts or runs differently, beyond the probe's.
  - Rows 691, 832 and 339 as the flip leaves them, and row 412's close.
  - Every sentence made false, P-42's among them.
  - A file edited beyond those named.

#### L
- **slug:** `rung-list-imports`
- **worktree:** `/home/user/fortress-listimports`
- **expected minutes:** 120
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** List's two imports: the distance stage checks the fourteen, CovariantCollection and OneShotFlag added; CovariantCollection's 12 errors and 2 crashes cleared by its api stating its members and headers, upward's first argument carrying the target type, general arms that cast or fail, the trait's size and Append's typed field; OneShotFlag's by the export check comparing an object's parameter without var; the stage reading every api's own count; tests first; a speed pass.
- **points to report:**
  - Whether you took rung-L.patch as it is or changed it, and why; each line of CovariantCollection you wrote, the team's lines marked.
  - The distance table over the fourteen and its sites before (the planner's 13) and after, and any site that comes; the count stage's table.
  - The count stage's seconds on the base and on your tree, and the speed pass's profile and result.
  - Each walk value that moves, and each test whose verdict changes, OpenParameterListComprehensionWalk's among them.
  - The new row NEW-L-1, and rows 828's and 829's closes.
  - The stage's table.py change and its canned case.
  - Every sentence made false.
  - A file edited beyond those named.

#### A
- **slug:** `rung-abstract-declared`
- **worktree:** `/home/user/fortress-abstractdecl`
- **expected minutes:** 130
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** row 816's repair (P-158): the export check counts every member of an api trait again, as the team's did, an abstract api member matched by a component member of its header with a body or without one; the components declare the 12 members their apis write abstract, bodyless, String's 7, Range's isEmpty, ReadableArray's TrivialOpenRange subscript, ActualReduction's empty and join, AnyMaybe's holds; the specification's export rule revised to P-158; tests first; a speed pass.
- **points to report:**
  - Whether you took rung-A.patch as it is or changed it, and why.
  - The distance table and the export error's entries before and after, and any site that comes in any component; the count stage's table.
  - The count stage's seconds on the base and on your tree, and the speed pass's profile and result.
  - Each component trait or object of the compiler's prelude or of a compiled test that the export check now refuses.
  - Each walk value that moves, and each test whose verdict changes.
  - The specification's revised passage, its Appendix I entry and the decision record; every other sentence made false.
  - Row 816's close and ExportAbstractMemberAbsent's turn.
  - A file edited beyond those named.

### What every agent reads first

This run is climb batch 22c, the batch that closes the plan's phase 3 by the curator's framing, so that phase 3's zero is one the switch-over can use, after climb batch 22, which brought the distance and the count to 0 (compile-ladder/climb-batch-22/gate/; F-53). That zero has four limits, which the batch's four rungs remove: it rests on a reading of abstract that the curator reversed (P-158; row 816); the export check skips top-level symbolic operators, which hides 9 header differences (F-287; rows 782 and 827); List's two imports, CovariantCollection and OneShotFlag, are outside it (F-288; rows 828 and 829); and it holds only under the bound Any, which the compile command does not set (F-289; row 412). The rungs, in the manifest's order: O, the export check reads operators and the 9 headers match; B, the compile command's bound Any, its test edits, and the distance stage run under the compile command's own setting; L, the stage checks the fourteen and the two components are cleared; A, the export check counts every api member again and the components declare the 12. The planner measured the four rungs' text together: the distance 0 over the fourteen under the compile command's setting, #crash none; the count 0; walk's suite 683 tests and the specification's examples 130, no failure; the compiled tracks red only in tests that the rungs edit; the atomic runs 42 of 42; the ladder one file down, which rung B's respelling clears. Every rung writes its tests first. O, L and A change the checker's Scala, all in ExportChecker.scala in different functions, and each makes a speed pass; B makes none. No two rungs change one declaration, and no rung builds on another; the gather applies O, B, L, then A. Each rung's patch is in compile-ladder/plan-22c/probes/. Three questions to the curator come before the launch: phase 3's close, P-155 read to cover the export check, and P-158's informed yes against the specification's export rule; the batch is built at their defaults. ant testSpecData runs in the gate because the landed summary has it; the gather runs the 52 team demos on the merged tree.

### Before the launch

The coordinator:
1. Questions 1, 2 and 3 put to the curator with this record, one per message, and his go for the batch, which phase 3's standing go does not cover; question 4 and the forks taken at their defaults and listed for his review. The Fable review of this record before the launch.
2. The briefings checked on the base: `python3 -B explorations/compile-ladder/plan-22c/manifest/lists22c.py`, every key matching one place.
3. The block generated and spliced: `python3 -B explorations/compile-ladder/plan-22c/manifest/gen22c.py`, then `node explorations/compile-ladder/plan-22c/manifest/check22c.js`, which splices it into a scratch copy and checks it; then `check22c.js --write`, `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. The base is `main`'s head after that commit, its full hash, passed as `args.base`.
4. The base build: `/home/user/fortress-base23`, at `e0ec620a9`, serves if the base differs from it only in record and tool files (`git diff --stat e0ec620a9 <base> -- Library ProjectFortress Specification build.xml bin` empty); otherwise a new one at the base, as the manual's "Before the launch" steps 2 and 3 give it. One trial seed and one `old-fortress.sh` run of `BooleanOps.fss` from the main tree prove it.
5. `df -h /` against four seeded worktrees (about 206 MB each), the base build and the stages' scratch folders; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`, and the gather the demo driver of `compile-ladder/rung-team-demos/REPORT.md`, section 13.
6. Check-ins armed for the run's length, about 4 hours, 45 minutes apart; a run stopped by the session's process stop is resumed with `resumeFromRunId`.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base23'}})`. The arguments are kept byte for byte in the session's scratchpad, as `batch22c/launch-args.json`, since a resume needs them.

### The briefings, rung by rung

Each key is a `facts-extract.sh` key, read whole by the worker first; a key marked (check) is also read by the skeptic, a judge and a repair round. The reasons are in `lists22c.py` and rendered at the end of the worker's brief. ZA is the zero audit, `reviews/phase3-exit/zero-audit.md`; PJ the phase 3 exit judgement, `reviews/phase3-exit/judgement.md`; FJ the foundations judgement, `reviews/foundations/judgement.md`; EAC the export probe of row 816, `perf-probes/export-abstract-codegen/REPORT.md`; BA the bound probe, `perf-probes/bound-any-compiled/REPORT.md`; P22C this record's probe folder, `compile-ladder/plan-22c/probes/`; all under `explorations/`; REC this record; EC `ExportChecker.scala`.

- **O**, 18 keys, 8 checks, about 21K tokens: P-155 (check), F-287 (check), F-282; ledger 782 (check), 827 (check), 769; ZA "A.4 The checker's known blind spots, row by row" (check); PJ "2.2 What the zero rests on, each ruled"; P22C `rung-O.patch` (check); REC "The planner's probes" (check), "Question 2", "Question 4"; the code of EC's loop over the api's functions (check), `IndexBuilder.buildFunction`, `OverloadingChecker.isCheckedName`, the component's range factories and `List.fsi`'s comprehension; `source-code.tex` "Export Statements".
- **B**, 19 keys, 8 checks, about 21K tokens: P-42 (check), F-289, F-291, F-292 (check); ledger 412 (check), 691, 832, 339, 653; BA "The CompilerSystem tests, and the compiled tracks, under (ii) against (i)" (check), "What the switch to Any would cost, in rungs (my reading)"; FJ "4. The bound: P-42 holds, on these grounds"; P22C `rung-B.patch` (check); REC "The planner's probes" (check); Appendix I's "The implicit bound of a type parameter"; `trait-parameters.tex` "Type Parameters"; the code of `Shell.useCompilerLibraries` (check) and `DistanceMulti`'s `main`; `tests/doubledOverloading.fss` (check).
- **L**, 18 keys, 8 checks, about 20K tokens: F-288 (check), P-27, F-264, F-75, F-282 (check); ledger 828 (check), 829 (check); ZA "A.2 Scope", "A.3 The settings, and what the tools leave out"; P22C `rung-L.patch` (check); REC "The planner's probes" (check); `CovariantCollection.fss` (check) and `.fsi`, `OneShotFlag.fss`; the code of EC's `equalParams` (check) and `equalLValue`, `SyntaxChecker.forObjectDecl`; `tests/OpenParameterListComprehensionWalk.fss`.
- **A**, 18 keys, 8 checks, about 25K tokens: P-158 (check), P-26, F-282 (check), F-286; ledger 816 (check); EAC "In short" (check), "5. The library's 12 members"; PJ "3.1 Bends and reversals"; the conversation note's section 3; P22C `rung-A.patch` (check); REC "The planner's probes" (check), "Question 3"; `source-code.tex` "Export Statements" (check); `apis.tex` "Component and API Identity"; the code of EC's `equalListMembers` (check) and `equalFnHeaders`, the prelude's `GeneratorZZ32`, the component's `String`.

### The gate, and what it should show

The comparands are climb batch 22's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, over the twelve under the setting `any`).
- `testSystem`: 683, the comparand's sum (162, 173, 168 and 180 over the four shards), plus L's walk guard.
- `testFast`: the compiler track 1,315 as landed plus the rungs' new compiled cases (by the record's tests: O 3, A 3, L 1, and B 1 by the promotion, a compile turned into a link and a run), the library track 86, the other-compiler track 263; every failure of the planner's run answered by the rungs' test edits.
- `testSpecData`: 130 green.
- The four-thread atomic runs, 42 lines: unchanged (the planner's run on the four rungs' text, 42 `PASS`).
- The ladder: no move, with rung B's respelling of `tests/doubledOverloading.fss`; without it, that file `DOWN` and `MISSING`, red.
- The checker count: 0, reported, not declared; its table gains `CovariantCollection 0`.
- The distance, reported and never red: 0 over the fourteen, `#crash none`, under the setting `compile`, its first line reading `extendsObject=false`. `compare.sh` against climb batch 22's twelve prints the targets that joined.
- The 52 team demos at the gather, each reaching its end (F-283).
- microGPT's quick pair at the commit stage, both programs `ALL PASS` (P-30).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`. Rows opened by plan: NEW-O-1 (`CONTESTED`, question 4) and NEW-L-1 (the checker's refusal of a field with no type). Rows closed: 782 and 827 (O), 412 (B), 828 and 829 (L), 816 (A). Notes: 691, 832, 339 and 653 (B). Where `ledger.py` refuses a note for length, the gather lists the text for the coordinator.

### After the landing

The landing report, with question 1's answer named: phase 3's exit, or phase 4's first library batch. The routing of every item for the curator into PLAN, questions 2 to 4 and this record's forks among them. FACTS: F-53 (the distance 0 over the fourteen under the compile setting, the count 0), F-282 and F-286 (the export check's count and the 12 declarations), F-287 (the operators read), F-288 (the two imports cleared), F-289, F-291 and F-292 (the compile command's bound `Any`). POSITIONS for the curator's text: P-158's reason (question 3), P-155's reach (question 2), P-42's "until the switch-over", and P-33's phase 3 exit (question 1). The skill writer's task with the batch's revival-change material; the post-batch review.

## 6. Files cited, with their links

- Records: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-22.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-22.md), [CLIMB-BATCH-23.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-23.md), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md), [climb batch 22's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-22/gate/distance.txt).
- Reviews: [the foundations judgement](https://github.com/palimondo/fortress/blob/main/explorations/reviews/foundations/judgement.md), [the zero audit](https://github.com/palimondo/fortress/blob/main/explorations/reviews/phase3-exit/zero-audit.md), [the phase 3 exit judgement](https://github.com/palimondo/fortress/blob/main/explorations/reviews/phase3-exit/judgement.md), [the dialogue of the phase 3 exit](https://github.com/palimondo/fortress/blob/main/explorations/conversations/02-phase3-exit-foundations.md).
- Probes: [the bound probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/bound-any-compiled/REPORT.md), [row 816's probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/export-abstract-codegen/REPORT.md); the planner's [edits22c.py](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22c/probes/edits22c.py), [text22c.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22c/probes/text22c.patch), [rung-A.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22c/probes/rung-A.patch), [rung-O.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22c/probes/rung-O.patch), [rung-L.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22c/probes/rung-L.patch), [rung-B.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22c/probes/rung-B.patch) and [NOTES.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22c/probes/NOTES.md).
- Library: [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [List.fsi](https://github.com/palimondo/fortress/blob/main/Library/List.fsi), [CovariantCollection.fsi](https://github.com/palimondo/fortress/blob/main/Library/CovariantCollection.fsi), [CovariantCollection.fss](https://github.com/palimondo/fortress/blob/main/Library/CovariantCollection.fss), [OneShotFlag.fsi](https://github.com/palimondo/fortress/blob/main/Library/OneShotFlag.fsi), [OneShotFlag.fss](https://github.com/palimondo/fortress/blob/main/Library/OneShotFlag.fss).
- Checker and tools: [ExportChecker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala), [Shell.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/Shell.java), [the count stage](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/tools/checker-count/run.sh), [the distance stage](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/tools/distance/run.sh), [DistanceMulti.java](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/tools/distance/DistanceMulti.java).
- Specification: [source-code.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/components/source-code.tex), [apis.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/components/apis.tex), [trait-parameters.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/trait-parameters.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
