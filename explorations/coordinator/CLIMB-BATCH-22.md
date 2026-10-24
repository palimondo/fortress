<!-- The record of climb batch 22, the batch of the plan's phase 3 for the distance's last 5 errors (PLAN, phase 3, item 19, "The last-5 batch" lines; `reviews/batch-21b-review.md`, "The steps due before the last-5 batch", step 5), for the coordinating session, the curator and the batch's workers. Drafted 2026-10-24 by an Opus planning worker against `main` at `08c95c708`, whose `Library/`, `ProjectFortress/`, `Specification/`, `build.xml` and `bin/` are those of `32242b80d`, climb batch 21b's landing (`git diff --stat 32242b80d 08c95c708` over them is empty; `main` moved on to `9c89dd0cd` while it was drafted, by boot notes and the skill writer's install of climb batch 21b, no code): so climb batch 21b's landed tables and the per-site list describe the base, and the planner's measurements hold on it. -->
<!-- Sources: PLAN.md, phase 3, item 19, its six "The last-5 batch" lines, item 46, and the lists "Climb batch 21, listed for his review" and "Climb batch 21b, listed for his review"; the post-batch review `reviews/batch-21b-review.md`, findings 2, 3, 7 and 9 and "The steps due before the last-5 batch"; POSITIONS P-27, P-48, P-49, P-51, P-68, P-78, P-79, P-90, P-155 and the others cited by number; FACTS F-53, F-59, F-85, F-221, F-264, F-282, F-283 and the others cited by number; climb batch 21b's gate (`compile-ladder/climb-batch-21b/gate/`) and the per-site list; the export probe `perf-probes/export-check-full/REPORT.md` with `export-check-shadow.patch`; the `Condition` probe `perf-probes/condition-zeroindexed/REPORT.md`; rung E's report `compile-ladder/rung-export-align/REPORT.md` and its `SKEPTIC.md`; the ledger rows 330, 607, 632, 731, 756, 816 and the others cited; the code at the sites; the specification's sections cited. -->
<!-- The planner's probes (section 4): two worktrees seeded from the base build `/home/user/fortress-base22` (`08c95c708`), detached, removed after; nothing run in the base build but one count-stage run with a private scratch folder outside it, which leaves it as it was. (1) The export check run to its end on the base, by the export probe's shadow re-based on rung E's check (`plan-22/probes/export-check-shadow-22.patch`): the full list of differences behind the 15 entries. (2) Way A+ alone on the base. (3) The batch's library text, every way together, three times as it was corrected: the stock distance stage each time (the gated stage, which since climb batch 21b is the full check). (4) The export check under 4i's first rule alone on the batch's text (`plan-22/probes/export-check-alt4i.patch`), for question 1. (5) The count stage on the batch's text, as it stands and stopped after the type checker, and the planner's fix of its reading on the base and on the batch's text (`plan-22/probes/checker-count-clean.patch`). (6) Walk's two suites on the batch's text, and four walk programs of String's members on the base and on the text. (7) A component of the planner's under the checker against the interpreter's library: row 731's shapes in five contexts. (8) Row 756's program on `main`'s code. Machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` for the stages; two probes side by side at times, so no timing here is one to compare. Its patches, its generator and its table are under `compile-ladder/plan-22/probes/`. One line per paragraph. -->

# Climb batch 22

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. It runs a program without static types. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode. The compiled path still uses its own small library, the **prelude**, until the **switch-over**, when it takes over the interpreter's library, the **one library**.
- **The distance** is the number of errors the checker reports on the one library. Each error has a **site**. **The count** is the checker's errors on the library's `FortressLibrary` component, read by the **count stage**. Since climb batch 21b the distance stage checks every operator, symbolic ones too (P-155).
- An **api** is a component's interface (a `.fsi` file); the **component** is its code (a `.fss` file). The **export error** is one error that lists every trait or object where the api and its component differ; each one it lists is an **entry**, and each entry names only the first member of its trait that differs, so one entry can hide several **differences**.
- A **static argument** is a type written in `[\ \]` at a use, as `BIG MIN[\ZZ32\]`. A **big operator** is a reduction such as `SUM`, `BIG MIN`, or a comprehension `<| ... |>`.
- A **row** is an entry of the gap ledger, cited by number. An **item** is a numbered question in PLAN's list "Pavol's answers".
- A **rung** is one fix, built by one worker in its own copy of the tree and checked by a second worker, the skeptic. A **batch** is a few rungs, merged and tested together by the **gate** and landed at once.
- **Test first.** Every fix starts with a test that shows the defect, seen failing before the edit and passing after. A **guard** is a test that passes before and after. Where a rung's every edit is library text that only the checker reads differently, its test is the distance stage itself.

### Where the distance stands

- After climb batch 21b the distance is 5 and the count 3, with every operator checked ([gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-21b/gate/distance.txt); F-53). Its five: the export error, 15 entries; row 731's 3 (`BIG MIN` twice and `List.fss:146`); item 46's fused arm (row 632).
- **The batch's library text, measured together, gives the distance 0**: `#total 0`, every kind 0, `#crash none` (section 4). Walk's suite gives 678 tests and no failure on it, and the specification's examples 130 and no failure.
- The 15 entries hide 41 differences. The planner ran the export check to its end on the base and gave each its way (section 4, "The export error's 41 differences").

### The batch: one run, three rungs

- **E, the api's last export entries.** 14 of the 15 entries, all but `String`'s, by the library's own rule that an api states its component's members at the component's headers: `TotalComparison`'s `=`; `RR64`'s `^` and its rounding operators (fork 3); `Condition` by way A+ with `Maybe`'s header; `Just`'s and `Nothing`'s old range subscripts out of the api (way A++); `Just`'s `SQCAP` and `SQCUP`; the four arrays' unbuilt subscripts out of the api; `ActualReduction`'s three `distribute`s; `BigReduction`'s and `Comprehension`'s parameters named as the component names them; `DelegatedIndexed`'s `size` and `generator`; `Array2`'s and `Array3`'s `bounds` and `zeroIndices`. Its test is the distance stage. Alone: the export error from 15 entries to 1, `String`'s.
- **R, the body errors' library text.** Row 731's three sites by the static argument written, the library's own way and row 731's workaround (P-78): `BIG MIN[\ZZ32\]` twice and `<|[\E\] ... |>`. Item 46's arm by `cast[\O0\]`, as called. Its test is the distance stage. Alone: the distance 5 to 1.
- **T, `String`'s api and the string objects' missing members.** `String`'s 10 differences: `abstract` written on its 9 members that the component's trait leaves without a body, its `excludes` clause one text on both sides, and the 4 members those `abstract` lines ask of the string objects that lack them. Each of the 4 is a walk defect today, which T's tests show first: `"abc".balanced()` stops, 'Cannot find definition for method balanced given receiver "abc"', and `'Z' IN s`, for a substring `s` of a long concatenation, stops inside the library at `Library/String.fss:422`. Alone: the export error loses `String`'s entry.
- **Together: 0.** No two rungs change one declaration, and no rung builds on another. E and T share `FortressLibrary.fsi` and `.fss`, R and T `FortressLibrary.fss`, each in other declarations. The gather applies E, R, then T.

### The one question for you, and what each answer costs

**Question 1, consequential: the export check's reading of `abstract` (row 816; E.skeptic.1).** It was listed as needed before the export error's zero is promised (`reviews/batch-21b-review.md`, finding 3).
- Under the reading that landed in climb batch 21b, an api member written `abstract` needs no member in its component. On the batch's text the export error is then gone, and the distance is 0. The cost: a program compiled against the api that calls such a member on a value the component made dies at run time with `NoSuchMethodError` (row 816).
- Under the other reading, such a member needs a member of the same header in the component, abstract or concrete. The planner measured it on the batch's text: the distance is 1, the export error with 5 entries, each "missing members": `ReadableArray`, `ActualReduction`, `Range`, `String` and `AnyMaybe`. To reach 0 under it, by the planner's reading, the component's traits would declare these 12 members, `String`'s 7 among them. That text is not written or measured.
- **Default: the reading as landed.** The batch builds it. If you answer the other way, the batch still lands, the distance is 1, and a later rung writes the 12 declarations.

### What the batch leaves out (section 4, "Left out, each with its home")

- **Row 731's checker gap.** The checker still cannot take a big operator's element type from its clauses. The batch writes the argument at the library's three sites. Programs that leave it out, among them the team's demos, stay refused (row 731).
- **P-68's integer results** for the float rounding operators: after the switch-over, in row 330's rung.
- **Row 756**, tried on `main` as the review asked: the crash stands, 'E is not in the kind env', at a member whose declared type names the variable. It is no site of the distance.
- Row 607, `FlatString.rangeContains`, which finds only the first occurrence. Row 782, the export check reading symbolic names. The code generator's refusals after the switch-over (F-34).

### Before the batch runs

- **The count stage cannot read a zero yet.** With the batch's text, the checker passes the `FortressLibrary` component, and the stage's run goes on into the code generator. The code generator stops it at its first refusal: 'Don't know how to compile this kind of FnDecl' at `SumReduction`'s `distribute`, a method with a `where` clause (row 701). The stage then writes no total, and the gate reads that as red. The planner's fix stops the run after the checker and reads a clean check as 0 (`plan-22/probes/checker-count-clean.patch`). It gives the landed table on the base, 3, and `#total 0` on the batch's text. It is the coordinator's, on `main` before the launch, with a test in `test_run.py`, as fork 21 of climb batch 21 did.
- The gather runs the 52 team demos on the merged tree, since all three rungs change the library that walk runs (F-283; P-79; the review's finding 7).
- The coordinator generates and splices `plan-22/manifest/` and checks the briefings on the base (section 5).

### Cost

- About 2.9M tokens written: from 2.5M if no fix is contested and the review blocks nothing, to 3.7M with a judge and a repair round on a rung and on the review. Workers about 1.0M (E 0.4M, T 0.35M, R 0.25M), skeptics about 0.8M, the fixed roles about 1.1M. About 3 hours, the 52 demos in the gather's time.
- Climb batch 21b wrote 3.50M over 10 agents for three rungs, two of them checker rungs with speed passes, in 3 h 40 min (`reviews/batch-21b-review.md`, "For the curator"). This batch has no checker change and no speed pass.

## 2. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of yours; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### Question 1, consequential: the export check's reading of `abstract` (row 816)

**The question.** E.skeptic.1 of climb batch 21b, on your review list: should an api member written `abstract` need no member in its component, as the batch built (fork 20 of climb batch 21), or a member of the same header, abstract or concrete (4i's first rule alone, through the team's `ignoreAbstract`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:614-615`)?

**Primer.** An api lists what a component offers. Writing `abstract` on a member in the api says that the component's trait leaves it without a body, so each object below the trait gives it one:

    (* api *)        trait String ... abstract balanced(): String ... end
    (* component *)  trait String ... end                     (* no balanced at all *)
    (* component *)  object FlatString ... balanced(): String = self end

Under the landed reading, this pair matches. Under the other, the component's trait must declare `balanced` too, with or without a body.

**The team's word.** `Specification/basic/components/apis.tex:252-256`: "A matching definition of a declaration $d$ is a definition $d'$ with the same name as $d$ that includes definitions for all declarations other than the methods or fields declared abstract in $d$." `Specification/basic/components/source-code.tex:384-385` lets a satisfying trait "provide a concrete declaration" of an abstract method, which reads as still declaring it (row 816's notes).

**Measured on the batch's text** (section 4, "Question 1's two readings"): as landed, the distance 0. Under 4i's first rule alone, the distance 1: the export error lists `ReadableArray`, `ActualReduction`, `Range`, `String` and `AnyMaybe`, each "missing members of the trait/object in the component". Their api members written `abstract` that the component's traits do not declare: `ReadableArray`'s `opr[_:TrivialOpenRange]`, `ActualReduction`'s `empty` and `join`, `Range`'s `isEmpty`, `AnyMaybe`'s `holds`, and `String`'s `depth`, `isBalanced`, `verify`, `rangeContains`, `balanced`, `splitWithOffsets` and `split` (the export probe's section 3.2 and rung T's lines).

**Options.**
1. **As landed: no member needed.** Cost: row 816's run-time failure stays possible for a compiled client after the switch-over. The batch reaches 0.
2. **A member of the same header needed.** Cost: the distance stays 1 until the component's traits declare the 12 members, each a bodyless line in the component, which walk reads as abstract; a later rung, not measured. Row 816 closes.

**Default: option 1**, as the batch built and as F-282 states. Consequential because it reads anew what the team's two texts leave open, and it decides whether this batch's zero holds. The batch goes on with the default either way.

### Defaults already taken, on your review list

1. **Item 46's arm by `cast[\O0\]`** (rung R), the coordinator's call (item 46; "Climb batch 21, listed for his review"). Built as called; the site is gone and nothing comes (section 4).
2. **`Condition` by way A+** (rung E), the coordinator's call. Measured again on the base, alone: the distance 5, the entries 15 to 13, `Condition` and `Maybe` gone, nothing come (section 4). Built with way A++ (fork 4).
3. **`RR64`'s rounding by P-68's call: "the api takes the component's types".** Measured on the batch's text, it brings 3 errors: 'For truncate, the return type of Float->ZZ64 @ FortressBuiltin.fss:190:5-191:81 should be a subtype of the return type of (RR64 & {Float, FloatLiteral})->RR64', and the same for the two brackets at `:184` and `:188`. `Float`, below `RR64`, answers `ZZ64` from its natives. So the record builds fork 3 in its place, and the call's entry on your list is to be rewritten to it.

### Forks the batch takes, none consequential

Each default can be undone, and none reverses a decision of yours or touches a line of microGPT.

1. **One run, three rungs: E, R, T.** Default: so. `String`'s api lines need the 4 bodies (without them the planner's run gave 4 errors: 'The inherited abstract method balanced():String from the trait String has no concrete implementation in the object FlatString'), so they are one rung, T. R's 4 lines share nothing with the others.
2. **E's and R's test is the distance stage**, its before climb batch 21b's landed tables. Default: so. Each edit is library text that only the checker reads differently; walk guards beside it. T has walk tests first.
3. **`RR64`'s rounding: the component's `RR64` at the api's `ZZ64`.** The api's `|\self/|`, `|/self\|` and `truncate` answer `ZZ64`, and so do `Float`'s, from its natives (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:184-191`). Only the component's `RR64` trait says `ZZ` and `RR64` (`Library/FortressLibrary.fss:498-501`), in bodies that call `Float`'s through `asFloat`; `FloatLiteral` declares none of the three and inherits them. Default: the component's three lines take `ZZ64` (`last5-edits.py`, `rr64comp`). The other ways: the call (default 3 above, 3 errors), or `Float`'s results changed now, which is P-68's own change ahead of its rung and its count of moved outputs (row 330). Not consequential: two of the team's three texts and P-68's account of today ("today the brackets are `ZZ64` under walk") agree, and walk's values are `Float`'s. The checker's type for a float literal's bracket moves from `ZZ` to `ZZ64`; no compiled program can call it before the switch-over. P-68's rung later makes all of them `ZZ`.
4. **`Just`'s and `Nothing`'s range subscripts out of the api (way A++).** The component has had none since `28ecf5f0d` moved them to `Condition` (the `Condition` probe's section 2.1). The export probe filed them under P-90, which speaks of the bare `Nothing` only. Default: out (`maybeA2`). Part IV loses two team operators: a point to report.
5. **`Just`'s `SQCAP` and `SQCUP`: the api writes the component's headers**, over `NotUnique`, `Just` and `Nothing`, in place of its two over `UniqueItem` (`Library/FortressLibrary.fsi:1023-1024`, `Library/FortressLibrary.fss:1660-1664`). Default: so (`justsq`). A point to report.
6. **The arrays' `opr[_:OpenRange[\ZZ32\]]` out of the api** (`fsi:1597`, `:1630`, `:1728`, `:1854`). The component never defined them; the team's api had them (`a874948ac`). Default: out, as climb batch 20 did for `immutableArray`'s ranks (its fork 5) (`openrange`). Part IV loses four operators: a point to report.
7. **`ActualReduction`'s three `distribute`s at the component's headers** (`fsi:1905-1912`; `fss:3251-3260`). Only the component's form is built and called (the export probe's section 3.3). Default: so (`distrib`).
8. **`BigReduction`'s and `Comprehension`'s api parameters named as the component names them, and their getters that restate them out** (`fsi:1970-1981`; `fss:3363-3370`). Default: so (`bigops`), the export probe's way (b). The other way, a check rule that a value parameter satisfies an api getter, is a checker change that no text asks for.
9. **`DelegatedIndexed`'s `size`: the component's trait states it**, `getter size(): ZZ32 = |self|`, the body it inherits from `Indexed` (`fss:1976`) (`delegsizeB`). Measured the other way, the api's line out (`delegsize`): 4 errors, 'The inherited abstract method abstract getter size:ZZ32 from the trait Indexed[\(ZZ32, ZZ32),(ZZ32, ZZ32)\] has no concrete implementation in the object CompactFullRange2D in component RangeInternals', and the same for `CompactFullRange3D`, `StridedFullRange2D` and `StridedFullRange3D`. A check that counts inherited bodies is a third way, a checker change. Default: so.
10. **`DelegatedIndexed`'s `generator` at the api's `Generator[\E\]`** in the component (`fss:2101`), as the export probe proposed: its bodies call only `Generator` methods on it, and `FlatString` already overrides it at `Generator[\Char\]` (`deleggen`). Default: so.
11. **`Array2`'s and `Array3`'s `bounds` and `zeroIndices` at the api's types** in the component (`fss:2656`, `:2744`, `:3064-3065`, `:3146-3147`). The api cannot name `RangeInternals`' `CompactFullRange2D` and `3D`, which import the api. Default: so (`arrbounds`).
12. **`TotalComparison`'s `=`: the api writes the component's two forms** (`fsi:125`; `fss:165-166`) (`totalcmp`). Default: so.
13. **`String`'s 9: `abstract` written in the api**, the library's rule for a member the component leaves without a body (the `fortress-repo` skill's `library.md`, "Designing a change"), on `size`, `asFlatString`, `uncheckedSubstring` and `||(self, c:Char)`, which the component's trait declares bodyless, and on `depth`, `isBalanced`, `verify`, `rangeContains` and `balanced`, which it never declared, in the team's text too (`a874948ac`) (`str4h`, `str5`). The other way for the five: default bodies in the component's `String`. Default: `abstract`.
14. **`String`'s `excludes` clause: one text on both sides, `{ Number, Char, AnyMultiplicativeRing }`**: the component's, less `List`'s `AnyList`, which the api cannot name without importing `List` and which states the exclusion itself (`Library/List.fsi:55`) (`strexcl`). Default: so.
15. **The string objects' 4 bodies** (`strbodies`): `FlatString`'s `balanced()` and `EmptyString`'s answer `self`, as `SubString`'s does when balanced (`Library/String.fss:364-366`); `EmptyString`'s `isBalanced` is `true`, as `FlatString`'s (`Library/FlatString.fss:48`); `CatString`'s `rangeContains` reads its two halves, split as its own `uncheckedSubstring` splits a range (`String.fss:141-154`). Row 607's first-occurrence bug in `FlatString`'s `rangeContains` stays, out of the batch. Default: so.
16. **T's defects: one new row, NEW-T-1, opened and closed by T's tests.** They are gated walk tests, so the row records the defect beside them. Default: so.
17. **Row 731's three sites by the written static argument.** This is the record's workaround (P-78; the `fortress-repo` skill's `revival-changes.md`: "Write it in every clause form") and the library's own practice (`Library/FortressLibrary.fss:2553`, `:2932`, `:2937`; `Library/Format.fss:438`; `Library/Avl.fss:422`). The other ways:
    - the checker takes the element type from the clauses: row 731's fix, review-queue item 51's other way, a checker project that no probe has designed;
    - for the comprehension, the expected type narrows the bound, as P-48's text says; today the checker uses the expected type only where the call fails (F-221).

    Default: written. Row 731 stays open, with no site on the distance: a point for your sight, since the zero is reached with that checker gap open.
18. **Row 632 closed by R's cast**, its test the distance stage. Default: so. The team's pattern stays, and so does when the arm fuses; no desugaring calls the function (PLAN, "Climb batch 15, listed for his review", B.worker.2).
19. **The count stage's reading of a clean check: the coordinator's, on `main` before the launch.** Default: so, as fork 21 of climb batch 21. A rung worker does not edit the tools, and the gate's step 8 runs this tool on the merged tree.
20. **The 52 demos run by the gather** on the merged tree (F-283), in the background while it folds. Default: so.
21. **No rung declares a checker count, a crash or a ladder move.** Default: none; the count and the distance reported.
22. **No speed pass.** No rung changes the checker.

### Points the batch lists for you, not questions

- **Team lines changed:**
  - E: 24 api lines out or rewritten and 18 written, 8 component lines rewritten and one added (`rung-E.patch`). Among them, `Just`'s and `Nothing`'s range subscripts and four array subscripts leave Part IV. `BigReduction`'s and `Comprehension`'s parameters are renamed in Part IV, and four getters leave it.
  - T: 10 api lines of `String`, its component's `excludes` line, and 4 members written in `String.fss` and `FlatString.fss`.
  - R: three lines of `String`'s `upto` and `beyond` and `List`'s range subscript, and `__bigOperator2`'s fused arm.
- **What walk does differently:** the four `String` calls run (T). By the planner's runs, no other value moves: walk's suite 678 tests and no failure, the specification's examples 130 and no failure.
- **What the checker does differently:** nothing; the batch changes no checker code.
- **The zero:** reached with row 731's checker gap open (fork 17), and, by question 1's default, with row 816 open.

## 3. The rungs

Line numbers are those of main at 08c95c708, whose Library/, ProjectFortress/ and Specification/ are those of 32242b80d, climb batch 21b's landing. Each rung's tests come first: written, run through the harness on the base and seen failing, or for a guard seen passing, and committed before the edit. A value that matters is asserted inside the test (P-103). The planner's text is explorations/compile-ladder/plan-22/probes/: last5-edits.py writes each edit by exact text and stops before writing anything if one does not match; rung-E.patch, rung-R.patch and rung-T.patch are its output per rung, each applying to the base alone (git apply --check), and the three together are last5-text.patch, the text the planner measured at distance 0.

### E. The api's last export entries (F-282; the export probe's sections 3.3 and 3.4)

**The answers this rung follows.** The specification's rule (Specification/basic/components/apis.tex, "Component and API Identity", :252-256): an api's declaration needs a matching definition in the component, with the same header and type, other than the methods or fields declared abstract. F-282: the export check matches members by name and header and reads abstract; the FortressLibrary export error names 15 traits and objects. P-27: the library's own practice; the api states its component's members at the component's headers. The coordinator's calls on record, each on the curator's review list: Condition by way A+ of explorations/perf-probes/condition-zeroindexed/REPORT.md; RR64's rounding, whose call as stated brings 3 errors, so this record's fork 3 stands in its place. P-90 speaks of the bare Nothing only, by the Condition probe's reading, so Just's and Nothing's range subscripts take way A++. P-68: the float brackets, round and truncate return ZZ after the switch-over, in row 330's own rung; today the brackets are ZZ64 under walk. The export probe, explorations/perf-probes/export-check-full/REPORT.md, sorted the differences (its sections 3.3 and 3.4); the planner ran the check to its end on the base, 41 differences behind the 15 entries (explorations/compile-ladder/plan-22/probes/export-differences-base.tsv; this record's section 4). This record's section 2, defaults already taken 2 and 3, and forks 3 to 12, give the defaults you build.

**What you build.**
- The library, the planner's rung-E.patch: python3 -I explorations/compile-ladder/plan-22/probes/last5-edits.py <your tree> totalcmp rr64pow rr64comp condA maybeA2 justsq openrange distrib bigops delegsizeB deleggen arrbounds. Take the text, or improve it and say why. Its edits:
  - totalcmp: TotalComparison's api opr =(self, other:Comparison) (Library/FortressLibrary.fsi:125) becomes the component's two forms, at TotalComparison and at Unordered (Library/FortressLibrary.fss:165-166).
  - rr64pow: RR64's api opr ^(self, b:RR64) (fsi:366) takes the component's exponent, Number (fss:485).
  - rr64comp, fork 3: the component's RR64 declares opr |\self/|, opr |/self\| and truncate at the api's ZZ64 (fss:498, :500, :501), as Float does (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:184-191), whose natives the three bodies call through asFloat; the api's lines stay. Not the variant rr64, the api at the component's ZZ and RR64, which brings 3 return-type errors at Float's three.
  - condA, way A+: the api's Condition extends { ZeroIndexed[\E\], SequentialGenerator[\E\] } (fsi:933), its indices answers Generator[\ZZ32\] (:940), its indexValuePairs Condition[\(ZZ32,E)\] (:941), its ivmap Condition[\G\] (:953), and it shows the component's range subscript, opr [r:Range[\ZZ32\]]: Condition[\E\] (fss:1533), after its [i]; Maybe's api header drops ZeroIndexed[\T\] (fsi:996).
  - maybeA2, way A++, fork 4: Just's opr[r:Range[\ZZ32\]]:Maybe[\T\] and Nothing's opr[r:Range[\ZZ32\]]: Nothing[\T\] leave the api (fsi:1014, :1039); the component has had none since 28ecf5f0d.
  - justsq, fork 5: Just's api SQCAP and SQCUP at the component's headers, over NotUnique, Just and Nothing (fss:1660-1664), in place of its two over UniqueItem (fsi:1023-1024).
  - openrange, fork 6: the api's opr[_:OpenRange[\ZZ32\]] of ImmutableArray1, Array1, Array2 and Array3 leave it (fsi:1597, :1630, :1728, :1854); the component defines only the TrivialOpenRange form, as the team's did at a874948ac.
  - distrib, fork 7: ActualReduction's leftDistribute, rightDistribute and distribute at the component's headers, [\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\] (fsi:1905-1912; fss:3251-3260).
  - bigops, fork 8: the api's BigReduction takes the parameter name reduction and Comprehension the names unwrap, reduction and body, as the component (fss:3363, :3368); their getters that restate the parameters leave the api (fsi:1970-1981).
  - delegsizeB, fork 9: the component's DelegatedIndexed states getter size(): ZZ32 = |self|, the body it inherits from Indexed (fss:1976), at fss:2100; the api's line stays. Not the variant delegsize, the api's line out, which brings 4 abstract-method errors in RangeInternals' 2D and 3D ranges.
  - deleggen, fork 10: the component's DelegatedIndexed's generator at the api's Generator[\E\] (fss:2101).
  - arrbounds, fork 11: the component's Array2 and Array3 bounds and zeroIndices at the api's CompactFullRange types (fss:2656, :2744, :3064-3065, :3146-3147).
- Not yours: String's entry (rung T); the reading of abstract (question 1); P-68's ZZ (row 330's rung, after the switch-over); RR64's round, which the api does not declare; the export check's code; the bodies of the reductions, arrays and Condition beyond the lines above.

**Rows.**
- Row 330: a note: the component's RR64 now declares the brackets and truncate at ZZ64, as its api and Float do; P-68's rung makes them ZZ.
- Row 816: unchanged; question 1 holds it.

**Distance sites.** Your test is the distance stage, explorations/coordinator/tools/distance/run.sh, which since climb batch 21b checks every operator. Its before is climb batch 21b's landed table and per-site list: explorations/compile-ladder/climb-batch-21b/gate/distance.txt and explorations/compile-ladder/gate/distance-sites.tsv, 5 sites, the export error's 15 entries. Run it once on your final tree. By the sites each edit clears in the planner's run of the batch's text together (section 4): 5 sites still, the export error one entry, String's; nothing come. Compare with python3 -I explorations/perf-probes/array-sites/compare-sites.py, entry by entry. Run the count stage once on your final tree: 3, since it never reaches the export check (explorations/compile-ladder/rung-export-align/REPORT.md, section 5). Any site that comes, in any component, is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.

**Files.**
- Library/FortressLibrary.fsi: TotalComparison's =, RR64's ^, Condition, Maybe's header, Just's and Nothing's range subscripts, Just's SQCAP and SQCUP, the four arrays' OpenRange subscripts, ActualReduction's three, BigReduction and Comprehension, only.
- Library/FortressLibrary.fss: RR64's three rounding lines, DelegatedIndexed's size and generator, Array2's and Array3's bounds and zeroIndices, only.
- ProjectFortress/tests/: your walk guard.
- Not: String, its upto and beyond, __bigOperator2, List; the checker; walk's Java.

**Tests, first.**
- The distance stage, as above.
- A walk guard of the component lines and the members whose api lines move, named by its topic, such as ExportAlignedMembersWalk, passing on the base and after: Array2's and Array3's bounds and zeroIndices on arrays based above zero; a DelegatedIndexed carrier's size and |self|, a SubString's among them; a Condition's indices, indexValuePairs and range subscript on Just and Nothing; Just's SQCAP and SQCUP against Just, Nothing and NotUnique; BigReduction's and Comprehension's reduction, body and unwrap; the values asserted. By the planner's run of the batch's text, walk's suite moves no value.
- Keep their verdicts: walk's suite, 678 tests at the landed gate; ant testSpecData's 130; the compiler, library and other-compiler tracks, which this edit cannot reach.
- After the change: ant testSystem once and ant testSpecData once (P-124), since the component changes.

**Specification.** Part IV renders the api (Specification/library/default-libraries.tex:25-27): list as points to report each declaration that joins, leaves or changes there, the six subscripts that leave it and the renamed parameters among them; they need no edit. Grep Specification/ for a sentence that states Condition's or Maybe's supertypes, a range subscript of Just or Nothing, the parameters of BigReduction or Comprehension, or the signatures of the distributes; the planner's grep found Specification/basic/expressions/if.tex:53 and while.tex:29, "A Condition is a generator that generates 0 or 1 element.", which stay true, and none that the change makes false. List every sentence made false as revival-change material: F-282's 15 entries among them.

**Overlaps by file.** Rung T edits Library/FortressLibrary.fsi too, in String only (fsi:2453 on), and Library/FortressLibrary.fss in String's excludes clause (fss:4336); rung R edits Library/FortressLibrary.fss in __bigOperator2 (fss:1476) and in String's upto and beyond (fss:4395, :4401). No declaration of yours. The gather applies you first, by your lowest edited lines (fsi:125, fss:498). You meet in walk's suite and both stages.

### R. The body errors' library text: row 731's three sites and item 46's arm (rows 731 and 632)

**The answers this rung follows.** P-78: SUM and PROD take their identity from the static argument; the compiled checker fixes a reduction's static argument from neither the generators, the body nor a declared type that receives the value, and refuses every such call that leaves it out (row 731, a gap of the checker); row 731's workaround is to write it in every clause form. F-59: so for a big operator whose bound names its parameter, as BIG MIN's, an unwritten static argument has no instance at its bound, and the call is refused. F-221: a plain-bounded big operator takes the expected type only where the enclosing call is not accepted otherwise, so a comprehension whose bound fits takes its bound. P-48. The library's own practice writes the argument where the clauses fix it too: SUM[\T\] at Library/FortressLibrary.fss:2553, :2932 and :2937, and the comprehensions <|[\Any\] i | i <- args |> at Library/Format.fss:438 and <|[\RR64\] random(n) | i <- 0#n |> at Library/Avl.fss:422. Item 46, the coordinator's call by the record, on the curator's review list: the fused arm's result passed through cast[\O0\], the library's device for a branch whose type the typecase cannot show (F-264); the team's pattern stays. F-85 and row 632: the arm answers I0 where O0 is declared. This record's section 2, default already taken 1 and forks 17 and 18, give the defaults you build; the planner's probe of the three shapes, section 4, "Row 731's three sites", gives why the checker refuses each.

**What you build.**
- The library, the planner's rung-R.patch: python3 -I explorations/compile-ladder/plan-22/probes/last5-edits.py <your tree> min731 list731 cast46. Take the text, or improve it and say why. Its edits:
  - min731: String's upto and beyond write BIG MIN[\ZZ32\][i <- self.indices, self[i]=c] i (Library/FortressLibrary.fss:4395, :4401).
  - list731: List's range subscript, the site at Library/List.fss:146, writes <|[\E\] self[i] | i <- r |> (:151).
  - cast46: __bigOperator2's fused arm passes its result through cast[\O0\] (Library/FortressLibrary.fss:1476).
- Not yours: row 731's checker gap, the inference from the clauses and the expected type's narrowing (fork 17); the team demos' reductions (row 731's demo half); __bigOperator2's pattern and when it fuses; the dead fused desugaring (DesugarerUtil.nestedGeneratorOpportunity).

**Rows.**
- Row 731: rewritten by the gather from your record.md: its claim stays, the checker's gap; its notes say that the library writes the argument at its three former sites, so the distance holds none, and that user programs and the team demos still need it written.
- Row 632: the gather closes it with your commit, its test the distance stage (explorations/coordinator/tools/distance/run.sh).

**Distance sites.** Your test is the distance stage, its before climb batch 21b's landed table and per-site list (5 sites). Run it once on your final tree: by the planner's run of the batch's text together, the two BIG MIN sites (fss:4395, :4401), List.fss:146 and the fused arm (fss:1466) go, 5 to 1, the export error left; nothing come. Compare with python3 -I explorations/perf-probes/array-sites/compare-sites.py. Run the count stage once on your final tree: its three errors are these, so its total is 0, which the count stage as it stands cannot read: its run goes on into the code generator and stops there, so it prints no total. The coordinator's fix of its reading (section 1, "Before the batch runs") is on main before the launch; if it is not on your tree, say so and quote the stage's last lines. You change no checker code: report the count stage's seconds, and make no speed pass.

**Files.**
- Library/FortressLibrary.fss: String's upto and beyond, and __bigOperator2's fused arm, only.
- Library/List.fss: List's range subscript, one line.
- ProjectFortress/tests/: your walk guard.
- Not: the checker; the desugarer; walk's Java; String's other members.

**Tests, first.**
- The distance stage, as above.
- A walk guard, named by its topic, such as WrittenReductionArgumentsWalk, passing on the base and after: upto and beyond on strings where the character occurs once, twice and not at all; a List's range subscript at stride 1 and at stride 2, the values asserted. Walk instantiates a reduction at a written static argument as at its value's declared type (F-228), so no value moves.
- Keep their verdicts: walk's suite; ant testSpecData's 130; the compiled tracks, which this edit cannot reach.
- After the change: ant testSystem once and ant testSpecData once (P-124), since the component changes.

**Specification.** None by the planner's grep: Specification/basic/expressions/reductions.tex and Specification/advanced/parallelism-locality/defining-generators.tex already say when the static argument is written. Grep them and Appendix I (Specification/appendices/changes.tex) for a sentence that says the library's own reductions leave it out, and list every sentence made false as revival-change material: F-53's five, rows 731's and 632's claims among them.

**Overlaps by file.** Rung E edits Library/FortressLibrary.fss in RR64, DelegatedIndexed and the arrays; rung T in String's excludes clause (fss:4336), a header line of the trait whose upto and beyond you edit. No declaration of yours. The gather applies E, then you (fss:1476), then T. No other rung edits List.fss. You meet in walk's suite and both stages.

### T. String's api and the string objects' missing members (F-83)

**The answers this rung follows.** The specification's rule (Specification/basic/components/apis.tex, "Component and API Identity", :252-256), F-282, P-27 and the library's way for a member the component leaves without a body: written abstract in the api (the fortress-repo skill's library.md, "Designing a change"), as the api's String already writes get, asDebugStringIndented, splitWithOffsets, split and writeOn. F-83: String's entry in the export error is FortressLibrary's site, and the string components hold no site of their own. The export probe filed String's entry under P-155's later work (explorations/perf-probes/export-check-full/REPORT.md, section 3.5); P-155 is built, and names no such work. The team's two texts: the api's String declares depth, isBalanced, verify, rangeContains and balanced, and the component's trait never did (a874948ac); FlatString, CatString, EmptyString and SubString each define some of them (Library/String.fss, Library/FlatString.fss). Under walk four calls stop today, each a defect of the library: CatString has no rangeContains, FlatString and EmptyString no balanced, EmptyString no isBalanced. Row 607: FlatString's rangeContains finds only the first occurrence, which stays. This record's section 2, question 1 and forks 13 to 16, give the defaults you build.

**What you build.**
- The tests first (below): the four defects under walk.
- The library, the planner's rung-T.patch: python3 -I explorations/compile-ladder/plan-22/probes/last5-edits.py <your tree> str4h str5 strexcl strbodies. Take the text, or improve it and say why. Its edits:
  - str4h, fork 13: abstract written on the api's getter size(), getter asFlatString(), uncheckedSubstring and opr ||(self, c:Char) (Library/FortressLibrary.fsi:2455, :2460, :2482, :2512), which the component's trait declares without a body (fss:4337, :4348, :4381, :4408).
  - str5, fork 13: abstract written on the api's getter depth(), getter isBalanced(), verify(), rangeContains and balanced() (fsi:2459, :2461, :2465, :2486, :2502), which the component's trait does not declare.
  - strexcl, fork 14: String's excludes clause one text on both sides, { Number, Char, AnyMultiplicativeRing } (fsi:2454; fss:4336), the component's less List's AnyList, which states the exclusion itself (Library/List.fsi:55).
  - strbodies, fork 15: FlatString's balanced():String = self (Library/FlatString.fss, after :50, with its methods); EmptyString's getter isBalanced():Boolean = true and balanced():String = self (Library/String.fss:275 on); CatString's rangeContains(r, c), which asks its two halves over the parts of r that fall in each, split as CatString's own uncheckedSubstring splits a range (String.fss:141-154).
- Not yours: row 607; default bodies in the component's String trait (fork 13's other way); the component's String declaring the seven members that question 1's other answer would need; FlatString's api; String's other members.

**Rows.**
- A new row, NEW-T-1: under walk, the api's String promises members that some string objects lack, so CatString's rangeContains, FlatString's and EmptyString's balanced and EmptyString's isBalanced stop, 'Cannot find definition for method rangeContains given receiver CatString', and so does c IN s for a substring s of a concatenation of concatenations, inside the library at Library/String.fss:422; your tests its reproducer. The gather adds it and closes it with your commit (fork 16).
- Row 607: a note if your tests meet it: CatString's rangeContains reads it through its FlatString leaves.

**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 21b's landed tables (5 and 3). By the planner's run of the batch's text together: the export error loses String's entry, 15 to 14 on your tree alone, and nothing comes; without the four bodies the planner's run gave 4 abstract-method errors, at FlatString.fss:34, String.fss:275 twice and String.fss:75, so any such site that comes is a point to report. Compare with python3 -I explorations/perf-probes/array-sites/compare-sites.py, entry by entry. The count stage: 3. You change no checker code: report the count stage's seconds, and make no speed pass.

**Files.**
- Library/FortressLibrary.fsi: String's ten lines, only.
- Library/FortressLibrary.fss: String's excludes clause, one line.
- Library/String.fss: EmptyString's two members and CatString's rangeContains. Library/FlatString.fss: balanced.
- ProjectFortress/tests/: your tests.
- Not: String's upto and beyond (rung R); the checker; walk's Java; FlatString.fsi and String.fsi, whose objects list few members.

**Tests, first.**
- A walk test of the four members, named by its topic, such as StringMembersPromisedWalk, failing on the base: CatString's rangeContains over a range in its left half, in its right half, across both and outside the character, on a concatenation longer than maxLeafSize, 32 (Library/String.fss:567); 'Z' IN s and a character not in s, for a substring s of a concatenation of concatenations; FlatString's balanced() and isBalanced; EmptyString's isBalanced and balanced(), the empty string got from a CatString's uncheckedSubstring over an empty range. The values asserted, avoiding row 607's later occurrences. The planner's four programs show the base's failures (section 4, "String's four members under walk").
- Keep their verdicts: walk's suite, StringPieces, the string tests among it; ant testSpecData's 130.
- After the change: ant testSystem once and ant testSpecData once (P-124).

**Specification.** Part IV renders the api: String's nine members become abstract, and its excludes clause names Number and Char: list them as points to report; they need no edit. Grep Specification/ for a sentence on String's balanced, depth or rangeContains, or on what String excludes; the planner's grep found none on the members. List every sentence made false as revival-change material: F-83's account of String's entry and F-282's among them.

**Overlaps by file.** Rung E edits Library/FortressLibrary.fsi and .fss in other declarations, above String; rung R edits String's upto and beyond in the component (fss:4395, :4401), members of the trait whose excludes clause you edit, and no line of yours. The gather applies E, R, then you. No other rung edits String.fss or FlatString.fss. You meet in walk's suite and both stages.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another rung (PLAN, "The principle for the batches"). No rung lands only with another.
- The declarations each rung changes. E: the api's TotalComparison =, RR64 ^, Condition, Maybe's header, Just's subscript, SQCAP and SQCUP, Nothing's subscript, the four arrays' OpenRange subscripts, ActualReduction's three distributes, BigReduction and Comprehension; the component's RR64 rounding, DelegatedIndexed's size and generator, Array2's and Array3's bounds and zeroIndices. R: the component's String upto and beyond, __bigOperator2, List's range subscript. T: the api's String members and header, the component's String excludes clause, FlatString's balanced, EmptyString's isBalanced and balanced, CatString's rangeContains.
- Files two rungs share: Library/FortressLibrary.fsi (E, T) and Library/FortressLibrary.fss (E, R, T). The gather applies E, R, T, by their lowest edited lines.
- They meet in walk's suite and both stages: the gate's tables on the merged tree are the first with all three, and the planner's measurement of their text together expects the distance 0 and, with the count stage's reading fixed, the count 0 (section 4).

## 4. The candidates, and what the batch leaves out

### PLAN's order for the last-5 batch

PLAN's phase 3, item 19, lists six lines for this batch, with the steps the post-batch review owes (`reviews/batch-21b-review.md`, "The steps due before the last-5 batch", step 5):
- **Its before:** climb batch 21b's gate tables and `compile-ladder/gate/distance-sites.tsv` at `32242b80d`, the full check gated. Taken as findings, not measured again.
- **The export error, 15 entries:** the run-to-the-end list and way A+ measured again on the base (below). **In: rungs E and T.**
- **Row 731's three sites:** probed (below). **In: rung R**, by the written argument.
- **Item 46's arm by `cast[\O0\]`:** **in: rung R.**
- **Row 756, tried on `main`:** the crash stands (below). **Out.**
- **The 52 demos on the merged tree:** the gather's step (section 2, fork 20).

### The planner's probes

Two worktrees seeded from the base build, `/home/user/fortress-p22lib` and `/home/user/fortress-p22one`, detached at `08c95c708`. The stages are the gate's own (`tools/distance/run.sh`, `tools/checker-count/run.sh`); site lists compared with `perf-probes/array-sites/compare-sites.py` against the landed `compile-ladder/gate/distance-sites.tsv`.

**The export error's 41 differences.** The export probe's shadow, re-based on rung E's check: `compile-ladder/plan-22/probes/export-check-shadow-22.patch`. Its own `isAbstractMember` is dropped for the tracked one, 4i is always on as the check's own rule, the component's abstract members are compared with the api's member first as row 802's fix does, and `equalListMembers` runs to its end with the stock verdict kept. Compiled into a scratch folder ahead of the build, run by a copy of the distance stage. On the base: '#total 5', the same five sites; `#crash none`; 50 `#XDIFF` lines (`compile-ladder/plan-22/probes/export-differences-base.tsv`). Of the 50, 5 are the stock check's member-count stops and 4 the component's half of an api-side row, which leaves 41 differences. No member is accepted by the name gap any more (row 800's fix). The shadow's message lists every differing member, so `compare-sites.py` sees 7 entries change text; their count is the landed 15. The 41, each with its way, the library's own first:

| Entry | Differences | Way taken (rung, edit) | Sort |
|---|---|---|---|
| `TotalComparison` | 1: the api's `=(self, other:Comparison)`, the component's two at `TotalComparison` and `Unordered` | the api writes the component's two (E, `totalcmp`) | a way of its own: the api at the component's headers |
| `RR64` | 4: `^`'s exponent `RR64` against the component's `Number`; `\|\_/\|` and `\|/_\\|` `ZZ64` against `ZZ`; `truncate` `ZZ64` against `RR64` | the api's exponent `Number` (E, `rr64pow`); the component's three at `ZZ64` (E, `rr64comp`) | a decision, settled by the coordinator's call, replaced by fork 3 on measurement |
| `Condition` | 4: `extends`; `indices`, `indexValuePairs`, `ivmap` | way A+ (E, `condA`) | a decision, the coordinator's call |
| `Maybe` | 1: `extends`, the api's `ZeroIndexed[\T\]` | way A+ (E, `condA`) | the same |
| `Just` | 3: the range subscript; `SQCAP`, `SQCUP` | way A++ (E, `maybeA2`); the api at the component's headers (E, `justsq`) | filed under P-90; a way of its own |
| `Nothing` | 1: the range subscript | way A++ (E, `maybeA2`) | the same |
| `ImmutableArray1`, `Array1` | 1 each: `opr[_:OpenRange[\ZZ32\]]`, in the api only | the api's line out (E, `openrange`) | a way of its own |
| `Array2`, `Array3` | 3 each: `bounds`, `zeroIndices` at a `RangeInternals` type; the `OpenRange` subscript | the component at the api's types (E, `arrbounds`); the api's line out (E, `openrange`) | a way of its own |
| `ActualReduction` | 3: the three `distribute`s | the api at the component's headers (E, `distrib`) | a way of its own |
| `BigReduction` | 1: the getter `reduction` | the api's parameter named so, the getter out (E, `bigops`) | a way of its own |
| `Comprehension` | 3: the getters `reduction`, `body`, `unwrap` | the same (E, `bigops`) | a way of its own |
| `DelegatedIndexed` | 2: `generator` `Generator[\E\]` against `Indexed[\E,I\]`; `size`, inherited in the component | the component at the api's type (E, `deleggen`); the component's trait states `size` (E, `delegsizeB`) | a way of its own |
| `String` | 10: 4 members the component leaves bodyless (`size`, `asFlatString`, `uncheckedSubstring`, `\|\|(self, c:Char)`); 5 it never declared (`depth`, `isBalanced`, `verify`, `rangeContains`, `balanced`); its `excludes` clause | `abstract` in the api (T, `str4h`, `str5`); one `excludes` text (T, `strexcl`); the 4 bodies the 5 ask of the objects (T, `strbodies`) | 4h, and ways of its own |

**Way A+ alone, on the base** (`condA` only, `p22one`): '#total 5', 'typecheck 4', 'export 1', '#crash none'; 'landed 15 entries, now 13', `Condition` and `Maybe` GONE, none come. The figure 43 to 41 of the `Condition` probe was run 1's code; today's is 15 to 13.

**The batch's text together** (`compile-ladder/plan-22/probes/last5-text.patch`, the 19 edits of `last5-edits.py` in the order its header gives; `p22lib`), the stock distance stage, which gates the full check. Three runs, each correcting the one before:
- First, with the call for `RR64`'s rounding (`rr64`), the api's `DelegatedIndexed` `size` line out (`delegsize`), and `String`'s api lines without the 4 bodies: '#total 11', 'return-type 3', 'abstract-method 8', 'export 0', 'typecheck 0'. The return-type errors are at `Float`'s `|\self/|`, `|/self\|` and `truncate` (`FortressBuiltin.fss:184`, `:188`, `:190`). The abstract-method errors are four in `RangeInternals` (`:1384`, `:1420`, `:1644`, `:1677`, `size` from `Indexed`), and four of `String`'s (`FlatString.fss:34` `balanced`; `String.fss:275` `balanced` and `isBalanced`; `String.fss:75` `rangeContains`). So the export error and row 731's and item 46's four sites went at once, and the 11 came from three edits.
- Second, with `rr64comp`, `delegsizeB` and `strbodies` in their place: `#total none: 1 target(s) stopped with errors the stage does not count: Library/FlatString.fss rc=-1`. The parse refused 'Field/getter/setter declarations should come before method declarations.' at `FlatString.fss:50` and `:51`, the two getters after `balanced()`, which stood among them. The stage's own reading of a library that does not parse held (`c21177829`).
- Third, `balanced()` moved after the getters: **'#total 0'**, every `#kind` 0, '#crash none', '#seconds 208 FortressLibrary 152', '#shadow every shadow edit matched the tracked sources'.
- Walk's suites on the third text (`p22lib`): `ant testSystem`, 'Tests run: 166', '170', '172' and '170, Failures: 0, Errors: 0' over its four shards, 678, the landed count; `ant testSpecData`, 'Tests run: 130, Failures: 0, Errors: 0'. Not timed.

**Each rung alone**, read from the sites each edit cleared in the first run, which moved no other site: E 5 sites, the export error one entry, `String`'s; R 1 site, the export error; T 5 sites, the export error 14 entries. Not run alone.

**Question 1's two readings.** On the third text, the export check under 4i's first rule alone (`compile-ladder/plan-22/probes/export-check-alt4i.patch`, a shadow: every api member counts against the component's, and an api member written `abstract` is matched by a component member of the same name and header, abstract or not): '#total 1', 'export 1', '#crash none'. The entries: `ReadableArray`, `ActualReduction`, `Range`, `String`, `AnyMaybe`, each 'due to missing members of the trait/object in the component'. Under the landed reading, the third run's 0.

**The count stage on the batch's text.**
- As it stands: 'checker-count: the run printed no error total (rc=1)'. The run passed the checker and went into the code generator, which stopped it: 'Don't know how to compile this kind of FnDecl. node = distribute(r:MaxReduction[\T\]):PossibleReductionPair[\Maybe[\T\]\]' at `Library/FortressLibrary.fss:3445:5-3446:28`, from `CodeGen.forFnDecl` (`CodeGen.java:2976`), row 701's refusal of a method with a `where` clause.
- Stopped after the type checker (`WorldFlip -stop typecheck`, the driver's own switch): every api 0, '@@PROBE checkComponent FortressLibrary', '### rc=0', no error line, so still no total.
- The planner's fix, `compile-ladder/plan-22/probes/checker-count-clean.patch`: the stage runs `WorldFlip -stop typecheck`, and reads a run that reached the component's check and ended rc 0 with no error line as `#total 0`, `#locations 0`. On the base, its table equals climb batch 21b's landed `checker-count.txt` byte for byte (`cmp`), '#total 3', '#locations 3' (run with `FORTRESS_HOME` the base build, its scratch outside it, which left the base build as it was). On the batch's text: '#total 0', '#locations 0', '#crash none', '#shadow matches the tracked StaticChecker'. The fix needs its canned case in `tools/checker-count/test_run.py`, a clean check read as 0, which the planner did not write.

**String's four members under walk.** Four programs, each importing `String.{...}`, on the base's old code (`tools/old-fortress.sh`) and on the batch's text:
- `a || b` with `a` and `b` 36 characters each (a `CatString`), then `c.rangeContains(0#70, 'Z')`. The base: 'Cannot find definition for method rangeContains given receiver CatString'. The text: 'Cat rangeContains: true'.
- `"abc".balanced()`. The base: 'Cannot find definition for method balanced given receiver "abc"'. The text: 'Flat balanced abc'.
- An empty string from `c.uncheckedSubstring(3#0)`, its `isBalanced`. The base: 'Cannot find definition for method isBalanced given receiver EmptyString'. The text: 'empty isBalanced true', 'empty balanced []'.
- `'Z' IN s`, for `s = c[2#100]` and `c` a concatenation of two concatenations. The base: 'Cannot find definition for method rangeContains given receiver CatString', at `Library/String.fss:422:51-91`, inside `SubString`'s `IN`. The text: 'in substring of cat: true'.

**Row 731's three sites.** A component of the planner's, checked against the interpreter's library by the distance stage's driver (`DistanceMulti -order check -setting any`, the stage's shadows). Its functions take `l: List[\E\]` and `n: Range[\ZZ32\]`, with `r = (0 # |l|).narrowToRange(n)` as `List.fss:146`'s own context:
- `<| l[i] | i <- r |>` as the function's body: 'Function body has type List.List[\Any\], but declared return type is List.List[\E\].'
- in an `if` branch: 'Function body has type OR(List.List[\Any\],List.List[\E\]), ...', `List.fss:146`'s message.
- bound to a typed local, `x: List[\E\] = <| ... |>`: 'Right-hand side has type List.List[\Any\], but declared type is List.List[\E\].'
- written `<|[\E\] l[i] | i <- r |>`: accepted.
- So the comprehension's `BIG <|[\T\]|>`, unbounded (`Library/List.fss:178`), takes its bound `Any`, and no expected type reaches it, since the call itself is accepted (F-221; P-48's narrowing by the expected type is not done there).
- For `BIG MIN[i <- s.indices, s[i]=c] i`, the function's result `ZZ32`, a typed local `n: ZZ32 = ...` and an untyped local each give 'Could not check call to operator BIG MIN - [\T extends StandardMin[\T\]\]()->BigReduction[\T,Maybe[\T\]\] is not applicable to an argument of type ().', the landed sites' message. `BIG MIN[\ZZ32\][...]` is accepted.
- So no declared type clears the F-bounded operator (F-59), and the written argument clears all three. The ways that need no written argument are checker changes, which no probe has designed (fork 17).

**Item 46's cast:** in the first run, the fused arm's site at `fss:1466` was gone with `cast46`, and nothing came.

**Row 756 on `main`'s code.** Its program: `trait AnyBox comprises { Box[\E\] } where [\E extends Object\]` with `getter item(): E`, `object Box[\E\](item: E) extends AnyBox`, `mk(): AnyBox = Box[\ZZ32\](3)`, and `println(mk().item)`. `bin/fortress typecheck -debug stacktrace` gave 'com.sun.fortress.exceptions.CompilerBug: ...Row756Item.fss:5:20: E is not in the kind env [][][]', at `TypeAnalyzer.staticParam` (`TypeAnalyzer.scala:1077`), from `pSubInner` (`:208`), under `Functionals.checkApplicableWithoutInference` (`Functionals.scala:458`), for `println`'s argument. The same program without the outside call checks, rc 0. So the crash is in the member's declared type, as the review read it (its finding 9); row 809's `selfComprised` does not reach it. It is no site of the distance. The note for row 756 is the gather's: 'Tried on main at 08c95c708 (climb batch 22's planner): the crash stands, staticParam (TypeAnalyzer.scala:1077) from pSubInner's variable case (:208), under Functionals.checkApplicableWithoutInference (Functionals.scala:458); row 809's repair does not reach it.'

### Left out, each with its home

- **Row 731's checker gap:** the checker cannot take a big operator's element type from its clauses, and does not narrow a comprehension's bound by the expected type. User programs, the team demos among them (row 731's demo half), still need the argument written. Home: row 731; PLAN, phase 3, item 19, the demos' line and its probe of the checker over each demo; review-queue item 51. Whether the switch-over waits for it is phase 4's question, not this batch's.
- **Question 1's other reading** (row 816): its 12 component declarations. Home: question 1; row 816.
- **P-68's `ZZ` results** for the float brackets, `round` and `truncate`: row 330's rung after the switch-over.
- **Row 756:** home row 756, with the gather's note; PLAN item 19's checker rows.
- **Row 607**, `FlatString.rangeContains`'s first occurrence: its row. **Row 782**, the export check reading symbolic names, latent while `isDeclaredName` stays: its row. E.worker.1's point, a getter or a set of methods satisfying an api member: "Climb batch 21b, listed for his review".
- **The code generator's refusals of the library** (F-34; 50 declarations, `SumReduction`'s `distribute`s first): phase 4 and phase 5; row 701 for the `where` clauses.
- **The other candidates of item 19 and item 18** (rows 808, 806, 611's walk half, 813, 814, 773, 786 and the rest): as PLAN, phase 3, item 19 lists them.

## 5. How it is run

The batch runs on the workflow of climb batch 21b: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`. Section 3 is each worker's brief word for word; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-22/manifest/gen22.py` reads with the briefings of `lists22.py` beside it, and `check22.js` checks.

### The generator

`plan-22/manifest/` is committed with this record: `gen22.py`, `lists22.py` and `check22.js`, made from `plan-21/manifest/`. Changed from climb batch 21's: one run, so no `--run`; the batch's values (`BATCH` `22`, its folder `compile-ladder/climb-batch-22/`, the output `manifest22.js`); three rungs in the order E, R, T, as the gather applies them; `--without <rung>` leaves a rung out of the block. `check22.js` checks that no rung declares `landsOnlyWith`, a checker count, a crash or a ladder move; that E's and R's test is the stage and T's is not; that every section names the count stage and the distance stage; that every section says it makes no speed pass and names no P-148, since no rung changes the checker; and that the record holds no copy of the block. On `main` at `9c89dd0cd`, whose code is `08c95c708`'s, with this record: `lists22.py` 'bad lists 0'; `gen22.py`, its block checked by `check22.js` on a scratch splice, 'problems: 0'; and `coordinator/tools/workflow-scenarios.js` on that splice, 'problems: 0'. The tracked script is not spliced: the coordinator splices it ("Before the launch", step 2).

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry. "Its test is the stage" means the distance stage is the rung's failing-then-passing test: E's and R's are, since their every edit is library text that only the checker reads differently, beside walk guards; T has walk tests first. "Joins the gate" names a step the gate gains once the rung lands; none does, and `ant testSpecData` runs because the last landed summary has it. No rung declares a checker count: it is reported, never red. The expected minutes order the scatter only. The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands; only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### E
- **slug:** `rung-export-last`
- **worktree:** `/home/user/fortress-exportlast`
- **expected minutes:** 100
- **its test is the stage:** yes
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the api's last export entries (F-282): 14 of the 15, all but String's, by the api stating its component's members at the component's headers: TotalComparison's =, RR64's ^ and its rounding at ZZ64 in the component, Condition by way A+ with Maybe's header, Just's and Nothing's old range subscripts out, Just's SQCAP and SQCUP, the arrays' unbuilt OpenRange subscripts out, ActualReduction's distributes, BigReduction's and Comprehension's parameters, DelegatedIndexed's size and generator, Array2's and Array3's bounds; its test the distance stage; library only.
- **points to report:**
  - Whether you took rung-E.patch as it is or changed it, and why.
  - The distance table and the export error's entries before and after, entry by entry, and any site that comes in any component; the count stage's table.
  - The count stage's seconds.
  - The declarations that join, leave or change in the api, and so Part IV: the six subscripts that leave it and the renamed parameters among them.
  - Each walk value that moves, and each test whose verdict changes.
  - Every sentence made false.
  - A file edited beyond those named, or any edit of String, the checker or walk's Java.

#### R
- **slug:** `rung-body-arguments`
- **worktree:** `/home/user/fortress-bodyargs`
- **expected minutes:** 60
- **its test is the stage:** yes
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the body errors' library text: row 731's three sites by the static argument written, BIG MIN[\ZZ32\] in String's upto and beyond and <|[\E\] ... |> in List's range subscript, the library's own way and row 731's workaround (P-78); item 46's fused arm of __bigOperator2 by cast[\O0\]; row 632 closed; its test the distance stage, 5 to 1; library only.
- **points to report:**
  - Whether you took rung-R.patch as it is or changed it, and why.
  - The distance table before and after, site by site, and any site that comes; the count stage's table, or its last lines if its reading of a clean check is not on your tree.
  - The count stage's seconds.
  - Each walk value that moves, and each test whose verdict changes.
  - Row 731's rewritten line and row 632's close.
  - Every sentence made false.
  - A file edited beyond those named, or any edit of the checker or the desugarer.

#### T
- **slug:** `rung-string-members`
- **worktree:** `/home/user/fortress-stringmembers`
- **expected minutes:** 110
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** String's api and the string objects' missing members: abstract written on String's nine bodyless api members, its excludes clause one text, and the four members those lines ask of the objects that lack them, each a walk defect today (CatString's rangeContains, FlatString's and EmptyString's balanced, EmptyString's isBalanced; c IN a substring of a long concatenation stops in the library); walk tests first; a new row opened and closed; String's export entry gone.
- **points to report:**
  - Whether you took rung-T.patch as it is or changed it, and why; each body you wrote.
  - The four defects before and after, with your tests.
  - The distance table and the export error's entries before and after, and any site that comes; the count stage's table.
  - The count stage's seconds.
  - The declarations that change in the api, and so Part IV.
  - Each walk value that moves beyond the four, and each test whose verdict changes.
  - The new row and its test.
  - Every sentence made false.
  - A file edited beyond those named.

### What every agent reads first

This run is climb batch 22, the batch of the plan's phase 3 for the distance's last five errors, after climb batch 21b, which landed the full check and brought the export error from 43 entries to 15. The distance stands at 5 and the count at 3 (compile-ladder/climb-batch-21b/gate/; F-53): the export error, whose 15 entries hide 41 differences; row 731's three sites, two BIG MIN and List.fss:146; and item 46's fused arm (row 632). Its rungs: E, the api's last export entries, 14 of the 15 by the api stating its component's members at the component's headers, with Condition by way A+ and RR64's rounding at ZZ64 in the component; R, row 731's three sites by the static argument written, the library's own way and row 731's workaround, and item 46's arm by cast[\O0\]; T, String's api and the string objects' missing members, four of them walk defects today. The planner measured the three rungs' library text together: the distance 0, walk's suite 678 tests and no failure, the specification's examples 130 and no failure. E's and R's test is the distance stage; T has walk tests first. No rung changes the checker, so none makes a speed pass. No two rungs change one declaration, and no rung builds on another; E and T edit Library/FortressLibrary.fsi, all three Library/FortressLibrary.fss, in other declarations; the gather applies E, R, then T. The count stage reads a clean check as 0 since the coordinator's fix before the launch. The export error's zero holds under the export check's reading of abstract as landed, which the curator's question 1 confirms or turns. ant testSpecData runs in the gate because the landed summary has it; the gather runs the 52 team demos on the merged tree.

### Before the launch

The coordinator:
1. Question 1 put to the curator with this record, or its default taken under the standing go; the record's other forks taken at their defaults (the `coordinator` skill's `references/batch.md`, "The go"). The Fable review of this record before the launch.
2. The count stage's reading of a clean check on `main`, with its canned case in `tools/checker-count/test_run.py` (fork 19; `plan-22/probes/checker-count-clean.patch`), and the review list's entry on `RR64`'s rounding rewritten to fork 3.
3. The briefings checked on the base: `python3 -B explorations/compile-ladder/plan-22/manifest/lists22.py`, every key matching one place. The block generated and spliced: `python3 -B explorations/compile-ladder/plan-22/manifest/gen22.py`, then `node explorations/compile-ladder/plan-22/manifest/check22.js`, which splices it into a scratch copy and checks it; then `check22.js --write`, `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. The base is `main`'s head after that commit, its full hash, passed as `args.base`.
4. The base build: `/home/user/fortress-base22`, at `08c95c708`, serves if the base differs from it only in record and tool files (`git diff --stat 08c95c708 <base> -- Library ProjectFortress Specification build.xml bin` empty); otherwise a new one at the base, as the manual's "Before the launch" steps 2 and 3 give it. One trial seed and one `old-fortress.sh` run of `BooleanOps.fss` from the main tree prove it.
5. `df -h /` against three seeded worktrees (about 206 MB each), the base build, and the stages' scratch folders; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`, and the gather the demo driver of `compile-ladder/rung-team-demos/REPORT.md`, section 13.
6. Check-ins armed for the run's length, about 3 hours, 45 minutes apart; a run stopped by the session's process stop is resumed with `resumeFromRunId`.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base22'}})`. The arguments are kept byte for byte in the session's scratchpad, as `batch22/launch-args.json`, since a resume needs them.

### The briefings, rung by rung

Each key is a `facts-extract.sh` key, read whole by the worker first; a key marked (check) is also read by the skeptic, a judge and a repair round. The reasons are in `lists22.py` and rendered at the end of the worker's brief. EX is the export probe, `perf-probes/export-check-full/REPORT.md`; CZ the `Condition` probe, `perf-probes/condition-zeroindexed/REPORT.md`; RE rung E's report of climb batch 21b, `compile-ladder/rung-export-align/REPORT.md`; P22 this record's probe folder, `compile-ladder/plan-22/probes/`; all under `explorations/`; REC this record.

- **E**, 20 keys, 8 checks, about 33K tokens: F-282 (check), P-27, P-68 (check), P-90; ledger 816 (check), 330; EX "3.3 Neither 4h nor 4i, and no decision by my reading: 17" (check), "3.4 A decision, 6", "4.3 Each new error, the line that brings it, and the line that clears it"; CZ "3. The ways" (check), "4. The measurements"; RE "5. Suites and stages"; P22 `rung-E.patch` (check), `export-differences-base.tsv` (check); REC "The planner's probes" (check) and "Forks the batch takes, none consequential"; the code of the component's `RR64` power and rounding, the component's `DelegatedIndexed`, and the api's `Condition` and `Just`.
- **R**, 15 keys, 8 checks, about 15K tokens: P-78 (check), P-48, F-59 (check), F-221, F-264, F-85; ledger 731 (check), 632 (check); P22 `rung-R.patch` (check); REC "The planner's probes" (check); `reductions.tex` "Summations and Other Reduction Expressions"; the code of `upto`, `__bigOperator2`, `List`'s range subscript (check) and `Format.fss`'s written comprehension (check).
- **T**, 16 keys, 8 checks, about 21K tokens: F-83 (check), F-282, P-27; ledger 607 (check), 816; EX "3.5 Waiting elsewhere, 18, listed and not fixed (the brief's item 4)"; P22 `rung-T.patch` (check); REC "The planner's probes" (check) and "Question 1, consequential: the export check's reading of `abstract` (row 816)"; the code of the api's `String` (check) and the component's (check), `CatString`'s `uncheckedSubstring` (check), `SubString`'s `balanced`, `EmptyString` and `FlatString`'s `isBalanced`; the test `StringPieces` whole (check).

### The gate, and what it should show

The comparands are climb batch 21b's `summary.txt`, `checker-count.txt` (3) and `distance.txt` (5), with `distance-sites.tsv`.
- `testSystem`: 678, the comparand's sum (166, 170, 172 and 170 over the four shards at the planner's run), plus E's and R's guards and T's tests.
- `testFast`: the compiler track 1,315, the library track 86, the other-compiler track 263, as landed; no rung edits the compiled path.
- `testSpecData`: 130 green.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: no rung declares a move; the interpreter's library changes, which no ladder file compiles against.
- The checker count: 0, reported, not declared, with the coordinator's reading of a clean check on `main` (fork 19); without it the stage writes no total, NO TOTAL, red.
- The distance, reported and never red: 0, `#crash none`.
- The 52 team demos at the gather, each reaching its end (F-283).
- microGPT's quick pair at the commit stage, both programs `ALL PASS`, 7 of 7 each (P-30).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`. Rows opened by plan: NEW-T-1, the string objects' missing members (T), closed by T's tests. Rows closed: 632 (R). Rewritten: 731 (R), its distance sites gone, its gap kept. Notes: 330 (E), 607 (T, if its tests meet it), 756 (the gather, the planner's note in section 4). Where `ledger.py` refuses a note for length, the gather lists the text for the coordinator.

### After the landing

The landing report; the routing of every item for the curator into PLAN, question 1's answer and this record's forks among them; FACTS: F-53 (the distance 0, the count 0), F-282 (the export error gone), F-59 and F-85 (the library's written arguments and the arm's cast), F-83 (`String`'s entry gone); P-155's and P-33's lines read against a zero; the skill writer's task; the post-batch review. Phase 3's end, the distance at zero, is then the curator's to call, with row 731's checker gap and row 816 named beside it (fork 17; question 1).

## 6. Files cited, with their links

- Records: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-21.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-21.md), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md), [climb batch 21b's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-21b/gate/distance.txt), [the per-site list](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/gate/distance-sites.tsv), [climb batch 21b's post-batch review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-21b-review.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md).
- Probes: [the export probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/export-check-full/REPORT.md), [the Condition probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/condition-zeroindexed/REPORT.md), [rung E's report](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/rung-export-align/REPORT.md); the planner's [last5-text.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22/probes/last5-text.patch), [last5-edits.py](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22/probes/last5-edits.py), [rung-E.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22/probes/rung-E.patch), [rung-R.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22/probes/rung-R.patch), [rung-T.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22/probes/rung-T.patch), [export-differences-base.tsv](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22/probes/export-differences-base.tsv), [export-check-shadow-22.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22/probes/export-check-shadow-22.patch), [export-check-alt4i.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22/probes/export-check-alt4i.patch) and [checker-count-clean.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-22/probes/checker-count-clean.patch).
- Library: [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [String.fss](https://github.com/palimondo/fortress/blob/main/Library/String.fss), [FlatString.fss](https://github.com/palimondo/fortress/blob/main/Library/FlatString.fss), [List.fss](https://github.com/palimondo/fortress/blob/main/Library/List.fss), [FortressBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss).
- Checker and tools: [ExportChecker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala), [TypeAnalyzer.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala), [the count stage](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/tools/checker-count/run.sh), [the distance stage](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/tools/distance/run.sh).
- Specification: [apis.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/components/apis.tex), [source-code.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/components/source-code.tex), [default-libraries.tex](https://github.com/palimondo/fortress/blob/main/Specification/library/default-libraries.tex), [reductions.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/reductions.tex).
