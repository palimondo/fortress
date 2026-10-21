<!-- Climb batch 16, the judge of the merged-diff review: both of the review's blocking findings on Appendix I's Effect of "Overloading with static parameters" are upheld, the first in its conclusion and not in its reason; decision repair, a specification repair with one probe under walk deciding the text of the second sentence. -->

# Climb batch 16: the judge's ruling on the merged-diff review

Written 2026-10-16 by the batch's judge (Opus), on `main` at `07c83a40a`. Nothing was built or run for it, and the gate's folders were not read. Every point is a reading of the tree at that commit, or a result that the batch's record quotes with its command.

## 1. Ruling

**Decision: repair.** Both blocking findings are upheld: two sentences of the Effect of "Overloading with static parameters" in Appendix I say what walk does not do.

- **Finding 2** (`Specification/appendices/changes.tex:2614-2617`) is upheld in full, with its reason.
- **Finding 1** (`changes.tex:2633-2636`) is upheld in its conclusion: the sentence names the wrong pair for row 549. It is not upheld in its reason. The review says that walk refuses the pair the sentence then names, and it does not, by reading. The review's proposed text keeps a first clause that still claims too much for one form of row 549's pair.

Both repairs edit a specification file. So the decision cannot be land: the brief allows land only when no file of the specification changes. The repair needs no source edit. One branch of it adds a walk expected failure and a ledger row, which the repair runs itself, so the gate does not run again either way (`explorations/coordinator/climb-batch-workflow.js:1285-1289`).

## 2. Finding 2: the exception of `:2614-2617`

The text on `main`:

    that example among them (row~539), except where a pair of their parameter types
    excluded each other only when both declarations were read at one instantiation,
    as instances of one generic object do: such a pair it reads on the two declared
    domains, each over its own instances, by these rules.

Read plainly, "both declarations were read at one instantiation" means one instantiation shared by the two. Walk does not read every such pair that way:

- Walk reads each generic declaration at a symbolic instance of its static parameters. That instance is shared only between declarations of one name with the same static parameters: same names, kinds and bounds (`GenericFunctionOrMethod.java:44-70`, the `GenericComparer`; `FGenericFunction.java:43-64`, `symbolicStaticsByPartition`).
- `OverloadedFunction.Apart.of` makes the same split. It reads the second declaration at fresh symbolic arguments only where the comparer puts the two in one partition (`OverloadedFunction.java:1017-1031`). Otherwise it reads the declared domain.
- `GenericBoundsMeetWalk`'s `sort[\P extends A\](x: ListI[\P\])` and `sort[\Q extends B\](x: ListI[\Q\])` have different lists of static parameters (`ProjectFortress/tests/GenericBoundsMeetWalk.fss:12-13`). So do `NoDuplicatesRuleWalk`'s `dup[\T\]` and `dup[\U\]` (`ProjectFortress/tests/NoDuplicatesRuleWalk.fss:8-9`). Each declaration of these pairs is read at its own symbolic instance.
- `ListI[\P\]` and `ListI[\Q\]` are then two instances of one object, and two types that cannot be extended exclude each other (`FType.java:212-217`). The exclusion is withdrawn because the instances may coincide (`OverloadedFunction.java:467-479`). The pair is then judged on its declared domains (`:534-535`, `:764`).
- At one shared instantiation, `ListI[\X\]` and `ListI[\X\]` would be one type and would not exclude. Read plainly, the sentence therefore puts `GenericBoundsMeetWalk` under the refusal of `:2612-2613`.
- Walk loads `GenericBoundsMeetWalk` and refuses `NoDuplicatesRuleWalk`, both on the merged tree. The gather's run, `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1` over every walk program W adds, promotes or changes, ended `OK (32 tests)` (`RECORD.md:48-51`).

Rung W's skeptic found the same wording failing for these pairs (`explorations/compile-ladder/rung-walk-overload-if/SKEPTIC.md:17`). The gather kept it (`explorations/compile-ladder/climb-batch-16/RECORD.md:124`). The review corrected F-238's title to "excluded only in walk's reading of each at one symbolic instantiation" (`explorations/coordinator/FACTS.md:156`, commit `07c83a40a`). The Effect should say the same.

## 3. Finding 1: the row 549 clause of `:2633-2636`

The text on `main`:

    The interpreter refuses at load two declarations with static parameters whose
    parameter types, each read over its own instances, are each a subtype of the
    other, as \VAR{dup}'s are; it loads such a pair and runs one of them where one
    has static parameters and the other's parameter type is its bound (row~549).

**What the review got right.** "Such a pair" now refers back to "two declarations with static parameters". Row 549's pair is a declaration with static parameters beside a plain one: `tie[\T extends Wide\](a: T, b: T)` beside `tie(a: Wide, b: Wide)` (`explorations/fortress-gap-ledger.md:338`; `ProjectFortress/tests/XXXGenericBesidePlainSameDomain.fss:9-10`). So the clause cites row 549 for a pair it does not name. The clause is also at odds with itself: "such a pair" has two declarations with static parameters, then "where one has static parameters". The gather's own account (`RECORD.md:125`) spelled out the subject because of K's hunk, and this is what that change did.

**What the review got wrong.** The review says that walk refuses the pair this reading names, citing `OverloadedFunction.java:764` and `:810`. Those lines are reached only when the check of each pair of parameter types has already failed: `validOnDeclaredDomains` runs under `if (!distinct && !overloadOk())` (`:534-535`). For two declarations with static parameters, it also needs an exclusion withdrawn (`:764`, `withdrawn && ...`).

Take a static parameter against its bound, the case the clause describes:
- `p1.subtypeOf(p2)` holds and the reverse does not, so `p1better` is set (`:488-492`). Row 549's note says the same: "The parameter check reads `T` as a strict subtype of `Wide`".
- Nothing excludes, so nothing is withdrawn (`:470-479`).
- `overloadOk()` returns true when the return types fit (`:544-561`).
- `describeOverloadingFailure` then reports nothing (`:565-653`).

So by reading, walk loads `tie[\T extends Wide\](a: T, b: T)` beside `tie[\T extends Wide\](a: Wide, b: Wide)` as it loads row 549's pair. The same goes for `tie[\U\](a: Wide, b: Wide)`, a second declaration whose parameter types mention none of its static parameters. Nothing in the loop or before it treats such a declaration otherwise (`:243-275`). This has not been run.

If that reading holds, the review's proposed text keeps a first clause that is false for this form ("refuses at load two declarations with static parameters whose parameter types ... are each a subtype of the other"). F-223's sentence on walk has the same flaw: "Walk refuses such a pair of two generic declarations at load" (`FACTS.md:185`). Whether walk loads this form decides the repair's text, so the repair runs the probe first. The skill asks the same of every sentence that says what walk does (`.claude/skills/fortress-repo/references/specification.md`, "Check each changed sentence ... run a program that shows it").

The form needs a declaration whose parameter types mention none of its static parameters. A pair of declarations whose parameter types each mention their own parameters falls to the other rules:
- a static parameter against a static parameter sets `sawSymbolic` (`:498-501`);
- a static parameter's instance against an instance of one generic object goes through the withdrawal to `genericPairValid`, which refuses domains that each hold the other (`:810`);
- order in both directions needs a meet (`:517-519`, `:555`).

## 4. Which claims of each side were right

The review:
- **Finding 2.** Right in full. Its citations hold: `GenericFunctionOrMethod.java:47-66`, `FGenericFunction.java:43-64` and `FType.java:212-217`. Its proposed wording is right in substance.
- **Finding 1, the referent.** Right: "such a pair" names two declarations with static parameters, and row 549's pair is a declaration with static parameters beside a plain one.
- **Finding 1, "Walk refuses such a pair (`:764`, `:810`)".** Wrong as stated. Those lines are not reached for a static parameter against its bound (`:534-535`, `:488-492`, `:544-561`).
- **Finding 1, the proposed text.** Right for row 549's own pair. It still claims too much for the form with two declarations with static parameters, if the probe shows that form loading.
- **"Both repairs are specification-only, so the gate need not run again."** Right. If the probe adds an expected failure, the repair's own passing run covers it (`climb-batch-workflow.js:1370-1394`).

The gather:
- **`RECORD.md:124`.** Right about the code: such pairs reach the declared domains only through a withdrawn exclusion, and instances of one generic object were excluding in that reading. Wrong in its wording, which makes the instantiation one shared by both declarations.
- **`RECORD.md:125`.** Right that the subject had to be spelled out after K's hunk. Wrong in spelling it out as two declarations with static parameters, which moved row 549's clause onto a pair it does not describe. Its check covered only the path of a withdrawn exclusion: `NoDuplicatesRuleWalk`, `GenericBoundsNoMeetWalk` and `:764`.

## 5. The repair

The instructions are those of the structured decision, repeated here.

1. **Probe first.** Write two scratch programs under `tmp/` in the main tree; they are not committed, except as step 5 says.
   - `ProbeTieSharedList`: `trait Wide end`, `object Narrow extends Wide end`, `tie[\T extends Wide\](a: T, b: T): String = "generic"`, `tie[\T extends Wide\](a: Wide, b: Wide): String = "bound"`, and a `run()` that prints `tie(Narrow, Narrow)`.
   - `ProbeTieOwnList`: the same, with the second declaration `tie[\U\](a: Wide, b: Wide): String = "bound"`.
   - Run each under walk on the merged tree with a private caches folder (the skill's `interpreter.md` and `worktrees.md`). Keep two to five lines of each output with its command.
   - By reading (section 3), both load and print `generic`.
   - Row 549's own pair stands on its gated expected failure, `ProjectFortress/tests/XXXGenericBesidePlainSameDomain` (`fortress-gap-ledger.md:338`). The pairs of `GenericBoundsMeetWalk` and `NoDuplicatesRuleWalk` stand on the gather's run (`RECORD.md:48-51`). Do not rerun them.
2. **Replace `Specification/appendices/changes.tex:2614-2617` with these four lines.** The passage keeps its line count. "It" is the interpreter, the subject of the sentence that begins at `:2612`.

       that example among them (row~539), except where a pair of their parameter types
       excluded each other only as it read each declaration at one symbolic instance of
       its static parameters, shared where both declare the same ones: such a pair it
       reads on the two declared domains, each over its own instances, by these rules.

   This rests on `GenericFunctionOrMethod.java:44-70`, `FGenericFunction.java:43-64`, `OverloadedFunction.java:1017-1031`, `:467-479` and `:764`. It matches F-238's title (`FACTS.md:156`).
3. **If both probes are refused at load, replace `changes.tex:2633-2636` with these five lines.**

       The interpreter refuses at load two declarations with static parameters whose
       parameter types, each read over its own instances, are each a subtype of the
       other, as \VAR{dup}'s are; it loads a declaration whose parameter types are its
       static parameters beside a plain one whose parameter types are their bounds, and
       runs one of the two (row~549).

   This rests on `fortress-gap-ledger.md:338` and `tests/XXXGenericBesidePlainSameDomain.fss:9-10`.
4. **If either probe loads, replace `changes.tex:2633-2636` with these six lines instead.**

       The interpreter refuses at load two declarations with static parameters whose
       parameter types, each read over its own instances, are each a subtype of the
       other, as \VAR{dup}'s are; it loads a declaration whose parameter types are its
       static parameters beside one whose parameter types are their bounds, a plain one
       (row~549) or one whose parameter types mention none of its static parameters
       (row~NNN), and runs one of the two.

   - NNN is the row of step 5.
   - If only one probe loads, say which form in the clause: the same static parameters, or ones of its own.
   - If a probe prints something other than `generic`, write "and runs one of the two" only as its output shows.
   - This rests on `OverloadedFunction.java:488-492`, `:534-535` and `:544-561`.
5. **Only under step 4, record the form as a deferred defect** (the skill's `tests-writing.md`, "How a defect is recorded", item 2). Row 549's notes cell has no room left (`RECORD.md:159`).
   - Write a walk expected failure from the probe that loads: `ProjectFortress/tests/XXX<Topic>.fss`, whose comment cites `advanced/overloading.tex`, "Declarations with Static Parameters" (the No Duplicates Rule), and `XXX<Topic>.test` with row 549's key, `load_exception_contains=fails because their parameter lists have the same types` (`tests/XXXGenericBesidePlainSameDomain.test`).
   - Run it through `harness-one.sh` on the merged tree. It is green as an expected failure: the program loads and runs.
   - Add its ledger row with `explorations/coordinator/tools/ledger.py`: NEGATIVE-VERIFIED, implementation gap (walk), siblings 549 and 159, the mechanism by `OverloadedFunction.java:488-492` and `:544-561`, and the probe's output line. Run `ledger.py check`; it should print the base's failures and no new one.
   - Correct F-223's walk sentence (`FACTS.md:185`): "Walk refuses such a pair of two generic declarations at load, and runs one of a generic declaration beside a plain one at its bound (row 549)." It should name the form of row NNN beside row 549's.
6. **Re-anchor `RECORD.md`'s citations of `main`'s lines below `:2633`, if step 3 or 4 changed the line count.** These are `RECORD.md:30-31` (`:2633-2643`), `:125` (`:2633-2643`), `:126` (`:2637-2643`) and `:159` (`:2633-2636`). Step 2 keeps `:2614-2617` at four lines, so K's `:2625-2632` (`RECORD.md:25`, `:30`, `:220`, `:323`) holds. The rungs' own `REPORT.md` and `SKEPTIC.md` cite their trees and stay.
7. **Record the repair in `RECORD.md`.** Add a paragraph "**Corrections, after the review.**" after the list that ends at `RECORD.md:127`, before "### Text mismatches" (`:129`).
   - Give each sentence's new text.
   - Give the probe commands with their output lines.
   - Name this ruling, `explorations/compile-ladder/climb-batch-16/JUDGE-review.md`.
   - Under step 5, name the new row and test.
8. **Build the specification** as `.claude/skills/fortress-repo/references/specification.md`, "Building it", says.
   - Both commands must end `BUILD SUCCESSFUL`, and `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log` must print 0.
   - Then run `git clean -fXq -- Specification`. Do not update `Specification/fortress.pdf`.
9. **Commit once, locally, on `main`.**
   - Paths: `changes.tex`, `RECORD.md` and, under step 5, the two test files, the ledger and `FACTS.md`.
   - The message says that the commit edits the original tree's specification (and test folder), with a `historical:` line for `Specification/appendices/changes.tex`, and the skill's footer.
   - Do not push.

## 6. Left as it is

The source comments at `OverloadedFunction.java:468-469` ("Read at one instantiation of both") and `:754-758` ("excluded only when the two were read at one instantiation") have the same imprecision as finding 2. A comment edit under `ProjectFortress/` would make the gate run again (`climb-batch-workflow.js:1374-1375`), so this repair leaves them. They are for the next batch that edits walk's `OverloadedFunction.java`, and are listed for the curator.
