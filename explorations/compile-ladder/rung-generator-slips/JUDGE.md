# Judge (refusal), rung G of climb batch 10 (rung-generator-slips)

Judged head: `0a954703a` (the test alone `bb9e71cda`, the library edit `acb36225c`, the skeptic's `SKEPTIC.md` `0a954703a`). Line numbers: base `9c9e823d5` where marked, otherwise `acb36225c`. Nothing was built or run for this ruling. I read the briefing slice, the net diff, the new test, `SKEPTIC.md`, the worker's structured result, the cited passages and precedents, and section 3's rung G of `explorations/coordinator/CLIMB-BATCH-10.md`.

**Decision: repair.** The skeptic is right on its refusal ground. The repair round adds one assertion, runs the harness once, corrects the report and the record, and writes both. It changes no library line.

## 1. The refusal ground: upheld

- The base's `FilterGenerator2.theorems` called `self.g.theorems[\R\]()` with one static argument of three (base `Library/FortressLibrary.fss:4639`, the `-` line of the diff). The edit writes `[\R, L1, L2\]` (`Library/FortressLibrary.fss:4641`). REPORT section 5 names this repair. It does not say that the base stopped walk.
- The skeptic measured the stop on the base and the value on the head. Base: `Generic instantiation (size) mismatch, expected [R,L1,L2] got [R]` at base `:4639:189-209`. Head: `1`. Both runs are quoted in `SKEPTIC.md`, "The refusal".
- `ProjectFortress/tests/GeneratorDeclarations.fss` never calls `theorems` on a filtered generator of generators. Its walk-stop assertions are lines 80-92: `nest` 80-83, `[r]` 84-86, `cross` 87-88, `SimpleMappedIndexed.ivmap` 90 and `NestedGenerator.reverse` 92.
- `FilterGenerator2.theorems` is reachable only by a direct call. A filtered generator's `generate2` goes through `self.g.__generate2filtered`, which reads `theoremsFiltered` and not `theorems` (`Library/FortressLibrary.fss:4636-4637`). So the `fusedMax` and `naiveMax` assertions (lines 74-77) do not reach it.
- The shared prefix's first home settles this. A defect measured by anyone and repaired in the rung gets an assertion in the rung's gated test, and the assertion exists before the second skeptic runs.
- The record asks for the same thing. Its "The test, first" asks for a walk test "calling each repaired declaration under walk" (`explorations/coordinator/CLIMB-BATCH-10.md`, rung G).
- The worker applied the first home to five walk stops and missed the sixth.

I checked every other repaired declaration a program can reach under walk. Each is called by the test: `__whileCond`, `__bigOperator2`, Condition's defaults, the eight big operators, the lifted sum's `empty`, `MIMapReduceReduction`, `SimpleMappedIndexed.ivmap`, `NestedGenerator.reverse`, the filtered `seed`, `naiveImplFiltered` through `naiveMax` and `relationalPredicate`.

Two declarations are left uncalled, and neither needs a call:
- `__loop` is in no api, and nothing calls it.
- `FilterGenerator2.theoremsFiltered` changed only its declared type. Walk gives the same value on both trees (`SKEPTIC.md`, "The differentials").

So one assertion closes the gap.

## 2. The stop "a repair that changes a value walk prints": the worker's reading upheld, its sentence corrected

The record's stop reads "A repair that changes a value walk prints, left with a row instead" (`CLIMB-BATCH-10.md`, rung G, "Stops"). Its purpose is in the same section: "What must stay green, or keep its verdict. Every interpreter test's verdict".

- **The six walk stops.** Each is a well-typed call that died on the base with a `ProgramError` or an `InterpreterBug` because of a library slip. Each now prints the value its declaration's body states. A run that dies prints no value.
  - The worker read the stop as covering only values of runs that complete (its decision 1). That reading fits the stop's purpose: no team test's verdict and no completing well-typed program's output changes.
  - Rule 4 of the shared prefix points the same way. Where walk failed and the specification gives a value, the repair moves walk to the specification.
  - Both the worker and the skeptic kept the repairs and listed the stop for Pavol, and neither asked for a reversal. I agree. The repairs stay, and the listing stays so that he can reverse them.
- **`MIMapReduceReduction[\String\](fn (a, b) => "x", 3).empty()`.** The base printed `3`. The head stops with `Unification error: ... MIMapReduceReduction param 2 ($z:String) got arg 3` (`SKEPTIC.md`, "The differentials").
  - The skeptic is right that the worker's sentence "No value walk prints for a run that completes on the base changes" (REPORT section 7) is false for this program.
  - The program is ill-typed by the specification. A declaration applies only to an argument whose type is a subtype of its parameter type (`Specification/basic/functions.tex`, section "Function Applications", `:231-238`). The api's own comment calls `z` the identity of `j` on arguments of type `R` (`Library/FortressLibrary.fsi:2126-2129`).
  - Walk's `3` is walk not checking types (rule 4: walk "accepts programs the language does not").
  - **My decision, under a record silent on ill-typed programs:** keep `z:R` and list the change under the stop. The rejected alternative was to revert `z:R` and leave `:3526` with a row. That would keep a declared type the api's comment contradicts, and a distance site, only to preserve walk's value for a program the language refuses. The decision is reversible and goes to Pavol.
  - No assertion is owed for the refusal. A walk test pinning the run-time unification error would pin walk's run-time stand-in for a static check, which the specification does not ask for. The well-typed use is already asserted (`GeneratorDeclarations.fss:46-48`).

## 3. The skeptic's other points

1. **Sibling count (rule 2): right.**
   - The getter invoked with `()` has no sibling left in G's sections.
   - It has three siblings outside G's files: `s.indices()` at `Library/Set.fss:154`, `Library/PrefixSet.fss:478` and `Library/CaseInsensitiveString.fss:27` (verified by grep). These are against `Specification/basic/traits.tex`, section "Method Declarations", `:493-497`.
   - No rung of this batch owns those files, and neither stage reads them. Walk accepts the call form, and the compiled path does not compile the components. So no program observes the defect: the home is a ledger row with the lines and the walk run.
2. **The compiled `while` binding: right on the defect, wrong on the home.**
   - Row 463 already holds the `if` form of the same gap: "Variable __cond is not defined", the compiler world's prelude declaring no `__cond` (`explorations/fortress-gap-ledger.md:474`).
   - The `while` form is the same defect in the next desugaring. `while binds <- expr do body end` becomes `while __whileCond(expr, fn (binds) => body) do end` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:306-317`), and no compiled prelude declares `__whileCond` (`grep` of `Library/CompilerLibrary.fsi`: none).
   - The skeptic's probe binds over `Just`/`Nothing`, which the compiler library declares (row 463's note: `Library/CompilerLibrary.fsi:223-224`).
   - It belongs as a note on row 463, not as a new row. Row 463's owed expected-failure test can hold both forms.
3. **Row 433's note: right as measured.**
   - The desugarer emits `__bigOperator2` only for `BIG OP <| BIG OT <| f y | y <- ys |> | ys <- gg |>` (`PreTypeCheckDesugaringVisitor.java:141-185`, `:377-392`).
   - `Generator2Test`'s `BIG MAX[\ZZ32\] <|[\ZZ32\] SUM[\ZZ32\] ys | ys <- inits xs |>` (`ProjectFortress/tests/Generator2Test.fss:60`) is not that form. The worker's `println` at `__bigOperator2`'s start printed nothing for it (REPORT section 7).
   - Row 433's "takes the fused path through them" is therefore not borne out under walk. A note is appended; the row is not rewritten.
4. **Row 610's expected-failure test: right.** The gather places it on the merged tree after rung C's checker edit and shows it through `junit.sh`. If the merged checker accepts the program, the gather promotes it to a plain test.

## 4. What the worker got right, and one omission of its own

- **Verified by the skeptic.** The 30 repairs and their precedents. The count table identical to the landed one. The distance 340 to 311, with 30 sites gone and one uncovered. The 27 sites left, each with a provisional row. The test committed alone first. The stages run once on `acb36225c`.
- **Row 610.** Leaving the capture sites rather than renaming `G` is what the record's "where the only repair is a checker change, the site is left with a row" asks.
- **Row 611.** Leaving the `Any` devices is measured.
- **Omission: row 91.** REPORT section 5 does not cite row 91 for `NestedGenerator.reverse`. The base's `self.f(e)` is row 91's case exactly: a field holding a function invoked as `b.f(3)` is a method invocation, and the interpreter's diagnostic is "The number of parameters (0) does not match with the number of arguments (1)" (`explorations/fortress-gap-ledger.md:79`). The specification passage is `Specification/basic/operators/juxtameaning.tex`, section "Juxtaposition", `:130-142`. The repair `(self.f)(e)` is row 91's own workaround.
- **Cost, disclosed.** The development run of the distance driver on the final code broke "Nothing is built or run twice on the same code". It is already in REPORT section 9, and nothing is to be redone.

## 5. Instructions for the repair round

1. **Set up the shell.**

       cd /home/user/fortress-genslips
       source explorations/experiment/env.sh
       export TMPDIR=/home/user/fortress-genslips/tmp
       export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-genslips/tmp"

   Check that `echo $FORTRESS_HOME` prints the worktree. Do not build or seed anything. Run no stage, no suite and no base run.
2. **Add the assertion.** Insert this line after `ProjectFortress/tests/GeneratorDeclarations.fss:92` (the `nested.reverse` assertion) and before `end` at `:93`:

       assert(|((inits l).filter(increasing)).theorems[\ZZ32, AnyMaybe, ZZ32\]()|, 1, "a filtered generator of generators answers the one theorem of the generator it filters")

   It goes at the end of the walk-stop block (lines 80 onward), so that "the assertions up to line 79 hold on the base" stays true. Change no other test line. Commit the test change alone ("GeneratorDeclarations: assert FilterGenerator2.theorems on a filtered generator of generators", with the shared prefix's two footer lines) and push to `wip/rung-generator-slips`.
3. **Run the harness once.** Define `run_bg` and `wait_for` as the shared prefix gives them, then:

       run_bg /home/user/fortress-genslips/tmp/rung-generator-slips/h3.log "cd /home/user/fortress-genslips && bash explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-genslips/tmp/rung-generator-slips/h3 ProjectFortress/tests/GeneratorDeclarations.fss"
       wait_for /home/user/fortress-genslips/tmp/rung-generator-slips/h3.log

   Expect `OK (1 test)`. If it fails, quote the failure and stop: the library is not to be changed in this round. Do not run the assertion on the base. The skeptic's run of the same expression is the failing run (`SKEPTIC.md`, "The refusal"), and the report quotes it from there.
4. **Recover the worker's texts.**

       T=/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_d5ec6194-bcc/agent-ad8b9ef1d620d222e.jsonl
       jq -r 'select(.type == "assistant") | .message.content[]? | select(.type == "tool_use" and .name == "StructuredOutput") | .input.reportText' "$T" > tmp/rung-generator-slips/REPORT.worker.md
       jq -r 'select(.type == "assistant") | .message.content[]? | select(.type == "tool_use" and .name == "StructuredOutput") | .input.recordText' "$T" > tmp/rung-generator-slips/record.worker.md

5. **Correct REPORT.** Make these changes to the recovered text, then write it as `explorations/compile-ladder/rung-generator-slips/REPORT.md`.
   - **Section 1:** add the repair round's line. It inherited `bb9e71cda`, `acb36225c`, `0a954703a` (`SKEPTIC.md`) and this ruling's commit, and it re-ran only the harness on the new assertion.
   - **Section 4:**
     - Add "and its `theorems`" after "a filtered generator of generators' `seed`".
     - Change "call the five declarations that stop walk" to "call the six declarations that stop walk"; the sixth, `FilterGenerator2.theorems`, is at line 93, added in the repair round.
     - After the h2 pass, add step 3's command, its header line and `OK (1 test)`, with the commit it ran on.
   - **Section 5:**
     - In the `FilterGenerator2` bullet, add that the base's one static argument stopped walk, quoting from `SKEPTIC.md`, "The refusal": `Generic instantiation (size) mismatch, expected [R,L1,L2] got [R]` at base `:4639:189-209`. The head answers the seed's one theorem, asserted at `GeneratorDeclarations.fss:93`.
     - In the getters bullet, add the sibling count: none left in G's sections, three outside its files (`Library/Set.fss:154`, `Library/PrefixSet.fss:478`, `Library/CaseInsensitiveString.fss:27`), with the new row of step 6.
     - In the `NestedGenerator.reverse` bullet, cite row 91 and `Specification/basic/operators/juxtameaning.tex`, section "Juxtaposition", as in section 4 above.
   - **Section 7:**
     - Replace "No value walk prints for a run that completes on the base changes. Five of the repaired declarations ..." with three statements:
       - Six repaired declarations stopped walk on the base and now print the value their bodies state.
       - One completing run's output changes: `MIMapReduceReduction[\String\](fn (a, b) => "x", 3).empty()` printed `3` on the base and now stops with the unification error on `$z:String`. Quote it from `SKEPTIC.md`, "The differentials". The program is ill-typed by `functions.tex`, "Function Applications", and by the api's comment (`Library/FortressLibrary.fsi:2126-2129`).
       - No completing run of a well-typed program changes.
     - Add the `FilterGenerator2.theorems` pair (base error, head `1`) to the list of differences.
   - **Section 8:** add the row of step 6 after row 615.
   - **Section 10:**
     - Change "five" to "six" and name `FilterGenerator2.theorems` with line 93.
     - Add the `MIMapReduceReduction` change, with no assertion owed (this ruling, section 2).
     - Add the getters' row, the note on row 463 and the note on row 433.
   - **Section 12:**
     - In decision 1, change "five" to "six" and add `MIMapReduceReduction` under the same stop.
     - Add a decision 8, attributed to this ruling: `z:R` is kept and listed rather than reverted, and no test pins the refusal of the ill-typed construction. The rejected alternatives are reverting with a row, and a pin on walk's error.
   - **Section 14:** carry the forPavol list of step 8.
   - **Throughout:** no `tmp/` path stands as a citation. A command that ran on a `tmp/` file may name it, and the quoted lines stay. Cite POSITIONS entries by bold title (for example "Reversible stops do not hold a batch"), never `POSITIONS.md:100`.
6. **Correct record.** Make these changes to the recovered text, then write it as `explorations/compile-ladder/rung-generator-slips/record.md`.
   - **The FACTS entry:** replace "Five of the repaired defaults stopped walk on the base and now answer the specification's value; no completing run's output changed." with "Six of the repaired declarations stopped walk on the base and now answer the value their bodies state; the one completing run whose output changed is an ill-typed construction of `MIMapReduceReduction` with an identity that is not an `R`, which walk printed and now refuses (REPORT section 7)."
   - **Row 610's notes:** add that the gather places the expected-failure test on the merged tree after rung C's checker edit and shows it through `junit.sh`, promoted to a plain test if the merged checker accepts it.
   - **A note appended to row 433:** "Climb batch 10, rung G: under walk a `println` at `__bigOperator2`'s start printed nothing for `BIG MAX[\ZZ32\] <|[\ZZ32\] SUM[\ZZ32\] ys | ys <- inits l |>`, `Generator2Test`'s form (`ProjectFortress/tests/Generator2Test.fss:60`), nor for its filtered and clause forms; the desugarer emits `__bigOperator2` only for `BIG OP <| BIG OT <| f y | y <- ys |> | ys <- gg |>` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:141-185`, `:377-392`). So `Generator2Test` exercises the naive path, not the fusion pairs; only `tests/GeneratorDeclarations.fss`, calling `__bigOperator2` directly, reaches the fused arm (`compile-ladder/rung-generator-slips/REPORT.md` section 7)."
   - **A note appended to row 463:** "Climb batch 10, rung G's skeptic: the `while` form is refused the same way. `while v <- (if n > 0 then Just[\ZZ32\](n) else Nothing[\ZZ32\] end) do ... end` gives 'Variable __whileCond is not defined.' compiled, where walk prints `6`; the desugaring is `while __whileCond(expr, fn (binds) => body) do end` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:306-317`; `Specification/basic/expressions/while.tex`, section 'While Loops'). The fix declares `__whileCond` beside `__cond` in the compiler world's prelude; the expected-failure test this row owes can hold both forms (`compile-ladder/rung-generator-slips/SKEPTIC.md`, 'The differentials')."
   - **A new provisional row 616**, in the worker's row format:
     - Claim: three library getters invoked with `()`: `s.indices()` at `Library/Set.fss:154`, `Library/PrefixSet.fss:478` and `Library/CaseInsensitiveString.fss:27` at `9c9e823d5`. Walk runs them (`CaseInsensitiveString("abc").indices` gives `[0,1,2]` on both trees), and neither stage reads those components.
     - Status: NEGATIVE-VERIFIED.
     - Class: library slip.
     - Spec citation: `Specification/basic/traits.tex`, section "Method Declarations" ("A getter method must be invoked with the field access syntax").
     - Reproducer: the three lines; the walk run in `SKEPTIC.md`.
     - Found by: climb batch 10, rung G's skeptic.
     - Notes: the repair is `s.indices`, as rung G read `seed` and `holds`, in files no rung of climb batch 10 owns; no program observes it on either path today.
   - **The handover state line:** change "five walk stops" to "six walk stops".
7. **Write and commit.** Write `REPORT.md` and `record.md` with the Write tool. If the harness refuses either, say so, and carry the full corrected texts in the structured result (`reportText`, `recordText`) without routing around the refusal. Commit what was written ("Rung G repair round: REPORT and record after the judge's ruling", the shared prefix's two footer lines), and push.
8. **The structured result.**
   - `stopsMet`, the second entry: the stop "A repair that changes a value walk prints". Evidence: `Library/FortressLibrary.fss:1383`, `:1398`, `:1400-1401`, `:3583`, `:3633`, `:4641`, and `MIMapReduceReduction` at `:3525` with `Library/FortressLibrary.fsi:2129`. `liftedBy`: "explorations/coordinator/POSITIONS.md, Reversible stops do not hold a batch".
   - The first entry (row 610) stays, with `liftedBy` cited the same way.
   - `forPavol`:
     - The six walk stops and the `MIMapReduceReduction` change, kept under this ruling's reading and reversible by leaving them with rows.
     - The worker's rows 610 to 615 items as written.
     - Row 616.
     - Row 615's fork.

## 6. For Pavol, out of the loop

- **A decision taken under a silent record.** The stop "a repair that changes a value walk prints" is read as covering the values of well-typed programs that complete. Under that reading, rung G keeps six repairs that turn walk's stops into specified values. It also keeps `MIMapReduceReduction`'s `z:R`, which turns walk's `3` for an ill-typed construction into a refusal. All are listed under the stop. Reversing means leaving those declarations (`Library/FortressLibrary.fss:1383`, `:1398`, `:1400-1401`, `:3583`, `:3633`, `:4641`, `:3525`) with rows.
