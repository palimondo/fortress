<!-- Climb batch 22c, the judge of the merged-diff review: its one blocking finding, that Appendix I's "An abstract method of an exported trait" names in its Effect only rows 841 and 844 of the departures from the sentence it revises, is upheld for rows 839 and 842 and extended to row 834's method half, which a probe of the repair must show first; row 834's top-level half and row 835 are not owed in this entry. Decision repair: up to twenty lines in the entry's Effect, one line of rung A's decision record, a PLAN entry and a RECORD paragraph; no path the gate reads. -->

# Climb batch 22c: the judge's ruling on the merged-diff review

Written 2026-10-30 by the batch's judge (Opus), on `main` at `f8bb64872`. Nothing was built or run for this ruling, and the gate's folders were not read. Each point below is a reading of the tree at that commit.

## 1. Ruling

**Decision: repair.** The review's one blocking finding is upheld for both rows it names, 839 and 842. The entry "An abstract method of an exported trait" (`\seclabel{revival-export-abstract}`, `Specification/appendices/changes.tex:4320-4401`) revises one sentence, the rule for a satisfying trait or object declaration (`Specification/basic/components/source-code.tex:373-390`). Its Effect (`changes.tex:4374-4389`) names two ways in which an implementation does not do what that sentence says: walk (row 841, `:4378-4381`) and the `var` parameter (row 844, `:4382-4389`). It leaves out two more that this batch recorded against the same sentence: row 839 and row 842.

The ruling goes one step beyond the review. Row 834 departs from the same sentence for a method that is not abstract, and the repair names it too, but only after a probe shows that departure (section 2.2).

Rows 834's top-level half and 835, which the review left to the judge to weigh, are not owed in this entry (section 2.3).

Three more departures, found by reading and recorded nowhere, go to the curator and the next batch as judge-review.1 (section 2.4).

The decision cannot be land. The repair edits `Specification/appendices/changes.tex`, and the brief allows land only when no specification file changes. The repair changes no path the gate reads: the gate reads `ProjectFortress/`, `Library/` and `build.xml` (`explorations/coordinator/climb-batch-workflow.js:1301-1302`). It adds no test file. Its probe is scratch in `tmp/`. So the gate does not run again (`repairRerun`, `climb-batch-workflow.js:1377-1399`).

No finding was routed to me, and no skeptic's fix is contested. The two routed items, review-routed.1 and review-routed.2, go to the next batch without a ruling, as the brief says.

## 2. The finding

**The rule.**
- The revision form says: "The effect names each departure: each way in which walk or the compiled path does not do what the new text says, with its ledger row." (`.claude/skills/fortress-repo/references/specification.md:22`)
- "If the passage has an Appendix I entry, name the departure or the conflict in the entry's effect, with its ledger row. Then the text claims no more than holds." (`specification.md:58`)
- "Check each changed sentence of `Specification/` ... If it says what walk or the compiled path does, run a program that shows it." (`specification.md:41`)

**What the entry revises.** The Change describes "The rule by which a trait or object declaration of a component satisfies an exported one" (`changes.tex:4325-4331`). The Original text quotes `Specification-1.0-frozen/basic/components/source-code.tex`, lines 380-385, from "and contains, for each field declaration and non-abstract method declaration" to the sentence on a concrete declaration (`changes.tex:4390-4399`). So the new text is the whole sentence at `source-code.tex:373-390`, with:
- its header clause (`:373-375`);
- its footnote (`:375-380`);
- its clause for fields and methods that are not abstract (`:381-384`);
- the new clause for abstract methods (`:385-388`).

The entry already reads the header clause as within its Effect: its row-844 sentence rests on "asks the same header" (`changes.tex:4387-4389`).

### 2.1 Owed, as the review says

- **Row 839** (`explorations/fortress-gap-ledger.md:323`, NEGATIVE-VERIFIED). The sentence asks "the same header" (`source-code.tex:373-375`), and an object's header holds its value parameters (`Specification/basic/objects.tex:104-109`). `equalParams` binds `nameL` and `nameR` and reads neither (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:690-702`). Rung L's skeptic measured it on the compiled path:
  - `Np(z: ZZ32)` for an api's `Np(a: ZZ32)`, rc 0, and `Tq(b: ZZ32, a: ZZ32)` for `Tq(a: ZZ32, b: ZZ32)`, rc 0 (`explorations/compile-ladder/rung-list-imports/SKEPTIC.md:74-75`);
  - `SkNameParamMain`'s `println("a=" Np(3).a)` "compiles on both and dies run: 'java.lang.NoSuchMethodError'" (`SKEPTIC.md:79`).
- **Row 842** (`fortress-gap-ledger.md:325`, NEGATIVE-VERIFIED). The sentence asks, for each field declaration, "a satisfying declaration" (`source-code.tex:381-384`), and "A field declaration is satisfied by a (possibly implicit) getter and/or setter declaration" (`:407-411`). `equalMember` matches an api field only by a component field (`ExportChecker.scala:877-878`, read by `handleOne` at `:832-841`). Rung A's skeptic gated it: `ProjectFortress/compiler_tests/XXXExportFieldByGetter.test`, `compile_err_contains=different field x`, with an api `trait T x: ZZ32 end` and a component `trait T getter x(): ZZ32 end`. He saw 'due to different field x' and 'Saw expected failure' on the old code and on the head (`explorations/compile-ladder/rung-abstract-declared/SKEPTIC.md:74`).

Both rows were on `main` when the Effect was written. Row 839 came in with rung L's commit, `96fcd051f` (`explorations/compile-ladder/climb-batch-22c/RECORD.md:120`). Row 842 came in with rung A's own commit, `cc47b637d`, the same commit that wrote the Effect (`RECORD.md:151`).

### 2.2 Owed beyond the review: row 834, for a method that is not abstract

The clause at `source-code.tex:381-384` asks "a satisfying declaration (or a set of declarations)" for each method declaration that is not abstract. What satisfies a method declaration is the rule at `:413-418`: a set of method declarations, "each of whose return types is a subtype of the return type of the exported declaration". This is the same reading that the review gives row 842, where what satisfies a field is the rule at `:407-411`. Ruling one in and the other out would be inconsistent.

The check asks more. `handleOne` (`ExportChecker.scala:832-834`) calls `equalMember` (`:875-889`), which calls `equalFnHeaders(headerL, headerR, false)` (`:632-645`). That compares the return types with `equalOptTypes(retTyL, retTyR)` (`:645`). So, by reading, a component method that answers `B` does not satisfy an api's method that is not abstract and answers `A`, where `B extends A`. The check refuses it with 'different method'.

The record holds this half of the row:
- Row 834's claim is "the compiled export check asks a component's top-level function or method at its api declaration's own header" (`fortress-gap-ledger.md:319`), and it cites the method rule, "methods `:413-418`".
- The batch's question 4, O.worker.1, cites the same lines (`explorations/coordinator/PLAN.md:605`).

The row is CONTESTED, so the Effect names it as a conflict (`specification.md:58`).

But no run has shown it for a method. Row 834's reproducer, `XXXExportOperatorHeader`, is a top-level operator (`ProjectFortress/compiler_tests/XXXExportOperatorHeader.fsi`). `specification.md:41` asks for a run before a sentence says what the compiled path does. So the repair first runs the method version of `XXXExportOperatorHeader`, beside a control, as a scratch probe. It writes the sentence only if the probe shows the refusal.

### 2.3 Not owed in this entry: row 834's top-level half, and row 835

These rows depart from the top-level function sentence, `source-code.tex:356-361`:
- row 834: a narrower return type of a top-level function or operator is refused;
- row 835: a functional method never satisfies an api's top-level function (`fortress-gap-ledger.md:320`).

The entry neither revises that sentence nor quotes it (its Change, `changes.tex:4325-4331`; its Original text, `:4390-4399`). So it is not the entry's "new text" (`specification.md:22`). Nor does that passage have an Appendix I entry (`specification.md:58`): `grep -n 'export-statements' Specification/appendices/changes.tex` prints only `:4324`.

The Affected section names `\secref{export-statements}` because that label is the finest the text has. The subsection's only `\seclabel` is at `source-code.tex:289`, and the next section begins at `:450`. Naming the subsection does not revise every sentence in it.

These rows are recorded in two places:
- the ledger: row 834, CONTESTED, with `XXXExportOperatorHeader`; row 835, with `XXXExportOperatorFunctionalMethod`;
- the curator's question 4 (`PLAN.md:605`).

The next entry that revises `source-code.tex:356-361` names them, and rows 768 and 769 with them, which are of the same kind (`fortress-gap-ledger.md:308-309`).

### 2.4 Found by reading, recorded nowhere (judge-review.1)

By reading `main`, the check departs from the revised sentence in three more ways that no ledger row holds. None has been run:
- **(a) A set of method declarations.** The check takes only one component method, at the api's header, as satisfying an api method that is not abstract (`handleOne`, `ExportChecker.scala:833`). The sentence says "a satisfying declaration (or a set of declarations)" (`source-code.tex:384`), and the method rule takes a set (`:413-416`). Row 769 holds the same departure for a top-level function only.
- **(b) The order of the types in the clauses.** The check compares the types of the `extends`, `excludes` and `comprises` clauses in order:
  - `equalListTraitTypeWheres` zips them (`ExportChecker.scala:747-750`);
  - `equalListTypes` zips them (`:525-527`), as read at `:359-360` and `:775`.

  The sentence's footnote lets "the types in the extends, excludes and comprises clauses" come in another order (`source-code.tex:375-380`).
- **(c) A `bool` static argument.** `equalStaticArgs` is false for any pair that is not two type arguments or two size arguments (`ExportChecker.scala:671-678`). This is row 768's cause, which has been shown for a top-level function only (`fortress-gap-ledger.md:308`). So, by reading, a trait's header or member that names such a type is refused in the same way.

The repair does not take these on. Each needs a run first. A row whose case the text settles needs a gated `XXX` test (`.claude/skills/fortress-repo/references/tests-writing.md:84`), which is a path the gate reads, and that would make the gate run again. They go to the curator as judge-review.1, with the step the next batch owes. The repair writes that step into `PLAN.md`.

## 3. Which claims of each side were right

The review:
- **"Its Affected section is the whole subsection, \secref{export-statements} (changes.tex:4324)"**: right as to the line. But the Change and the Original text confine the revision to one sentence (section 2.3).
- **"The Effect names only two departures: row 841 (walk) and row 844"**: right (`changes.tex:4378-4389`).
- **Row 839: "`equalParams` binds both parameter names and compares neither (ExportChecker.scala:690-702)", against "has the same header" (`source-code.tex:373-375`), and "a client's `Np(3).a` dies with NoSuchMethodError"**: right on each point (section 2.1).
- **Row 842: the check refuses a getter for a field, "against ... source-code.tex:381-384 read with ... source-code.tex:407-411"**: right (section 2.1).
- **The rules it cites**: right, `specification.md:22` and `:58`.
- **"Rung O's check now departs from [the top-level function sentence] for operators too: row 834 ... and row 835"**: right that both depart from `:356-361`, and right to leave the weight to the judge. Those halves are not owed here (section 2.3). The review did not see that row 834 also covers methods, and through `:413-418` that half is owed (section 2.2).
- **"The repair is a few sentences in changes.tex's Effect. The gate does not read that path, so it does not run again"**: right (`climb-batch-workflow.js:1301-1302`). The ruling adds three changes, all records:
  - the false line of rung A's decision record (below);
  - the PLAN entry for judge-review.1;
  - the RECORD paragraph.

Rung A and the gather:
- **Rung A's decision record**, section 4, says "The compiled path: none once the check lands." (`explorations/compile-ladder/rung-abstract-declared/decision-record.md:68`). This is wrong even on rung A's own tree. Row 842 holds 'at `c3c22817c` and on the rung's head'. Row 839's `equalParams` is the team's code, at `c3c22817c` (`fortress-gap-ledger.md:323`, `:325`). Part 4 of the revision form gives the decision record "the full reasoning" (`specification.md:37`), so the line is corrected.
- **Rung A's skeptic** was right to gate row 842 as a home-2 `XXX` test. He was wrong to report "no sentence of `Specification/` besides `source-code.tex:380-385` ... made false" without naming the row as a departure that the entry's Effect owes (`rung-abstract-declared/SKEPTIC.md:76`). The departure is older than the rung, but the rule names "each way" (`specification.md:22`), and the entry names row 841, which is older too.
- **The gather** was right to add row 844 and its sentences to the Effect (`RECORD.md:156`). It was wrong to stop there: rows 839 and 842 went into the ledger in the same composition (`RECORD.md:120`, `:151`) and were not named.

## 4. The repair

These are the instructions of the structured decision, repeated here.

1. **Where and how.** Work in the main tree, `/home/user/fortress`, on `main`, after the gate there has finished. Set up each call as `.claude/skills/fortress-repo/references/build-and-caches.md` says. Edit no file under `ProjectFortress/`, `Library/` or `Specification-1.0-frozen/`, and add no test to any corpus. Before each edit, confirm with `sed -n` that the line numbers below still hold. If another commit has moved them, place each edit by the quoted neighbouring lines.

2. **The probe** (scratch, never committed) for row 834's method half (section 2.2). Make an empty folder, `/home/user/fortress/tmp/judge22c-probe/`. Write the six files below into it, each line as shown, with four spaces before `m`. The pair is `XXXExportOperatorHeader`'s programs with the operator replaced by a trait's method (`ProjectFortress/compiler_tests/XXXExportOperatorHeader.fsi`, `.fss`).
   - `JudgeSameMethod.fsi`: `api JudgeSameMethod` / `trait A end` / `object B extends A end` / `trait T` / `    m(): A` / `end` / `end`
   - `JudgeSameMethod.fss`: `component JudgeSameMethod` / `export JudgeSameMethod` / `trait A end` / `object B extends A end` / `trait T` / `    m(): A = B` / `end` / `end`
   - `JudgeSameMethod.test`: `tests=JudgeSameMethod` / `compile`
   - `XXXJudgeNarrowMethod.fsi`: the same as `JudgeSameMethod.fsi`, with `api XXXJudgeNarrowMethod`.
   - `XXXJudgeNarrowMethod.fss`: `component XXXJudgeNarrowMethod` / `export XXXJudgeNarrowMethod` / `trait A end` / `object B extends A end` / `trait T` / `    m(): B = B` / `end` / `end`
   - `XXXJudgeNarrowMethod.test`: `tests=XXXJudgeNarrowMethod` / `compile` / `compile_err_contains=different method m`

   Run them in one JVM, as `.claude/skills/fortress-repo/references/tests-running.md`, "Compiled tests", says:

       ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh judge22c /home/user/fortress/tmp/judge22c-probe JudgeSameMethod.test XXXJudgeNarrowMethod.test > tmp/junit-judge22c.txt 2>&1

   The probe **shows the departure** only when all of these hold:
   - the capture shows `JudgeSameMethod`'s compile passing;
   - it shows `XXXJudgeNarrowMethod`'s output with 'different method m' and 'Saw expected failure';
   - it ends 'OK (2 tests)'.

   Otherwise it **does not show it**: write step 3's second block nowhere, and report the capture's lines in step 6.

3. **The entry's Effect** (`Specification/appendices/changes.tex`). Insert after line 4389, which reads `modifiers (row~844 of the revival's gap ledger).`, and before line 4390, which begins `\item[Original text] \nolinkurl{Specification-1.0-frozen/basic/components/source-code.tex},`.

   First block, always:

       The compiled type checker compares no name of a value parameter of an object
       declaration: a component's object declaration whose value parameter is named
       \VAR{z} satisfies an exported one whose value parameter is named \VAR{a}, so
       that a compiled client that reads the field \VAR{a} stops at run time with
       \texttt{NoSuchMethodError}, and one whose two value parameters have each
       other's names satisfies the exported one too (row~839 of the revival's gap
       ledger).
       The compiled type checker takes only a field declaration as satisfying a field
       declaration of an exported trait, where \secref{export-statements} takes a
       getter declaration too: a component's trait that declares a getter \VAR{x} for
       the exported trait's field \VAR{x} is refused (``different field'', row~842 of
       the revival's gap ledger).

   Second block, right after the first, only if the probe showed the departure:

       The compiled type checker takes only a method declaration with the same
       header, its return type included, as satisfying a method declaration of an
       exported trait that is not abstract, where \secref{export-statements} takes one
       whose return type is a subtype of the exported one's: a component's method
       \VAR{m} whose return type is \TYP{B}, where \TYP{B} extends \TYP{A}, does not
       satisfy an exported method \VAR{m} whose return type is \TYP{A} (``different
       method''); whether the rule or the check is to change is open (row~834 of the
       revival's gap ledger).

   What each sentence rests on:
   - The first rests on `explorations/compile-ladder/rung-list-imports/SKEPTIC.md:74-75` and `:79`.
   - The second rests on `ProjectFortress/compiler_tests/XXXExportFieldByGetter.test` and `rung-abstract-declared/SKEPTIC.md:74`.
   - The third rests on the probe.

   Change no other line of the entry, its callout at `Specification/basic/components/source-code.tex:391-399`, or `Specification/fortress/preamble.tex`. Then check the moves:
   - With both blocks: `grep -n 'subsection{Passages not yet revised}' Specification/appendices/changes.tex` prints `4423`, and `grep -n 'row~839 of the revival\|row~842 of$\|(row~834 of the' Specification/appendices/changes.tex` prints `4395`, `4400` and `4408`.
   - With the first block only: the first grep prints `4415`, and the second prints `4395` and `4400`.

4. **Rung A's decision record** (`explorations/compile-ladder/rung-abstract-declared/decision-record.md`). Replace line 68, `- The compiled path: none once the check lands.`, with the one line below. Leave out the clause on row 834, and its "; and", if step 3 left out the second block.

       - The compiled path, corrected after climb batch 22c's merged-diff review (`explorations/compile-ladder/climb-batch-22c/JUDGE-review.md`): the check meets the clause on abstract methods, but departs from the rest of the revised sentence, each departure named with its row in the entry's Effect: it compares no name of an object's value parameter (row 839, the team's `equalParams`); it takes only a field as satisfying an api trait's field, not a getter (row 842, `ProjectFortress/compiler_tests/XXXExportFieldByGetter`); it takes a method that is not abstract only at the api's header, its return type included (row 834, `CONTESTED`); and, after rung L, it compares an object's value parameter less `var` (row 844, `CONTESTED`, the gather's).

   The file's other lines cite rung A's tree and stay as they are (`RECORD.md:32`).

5. **`explorations/coordinator/PLAN.md`.** Insert one line after line 616, the entry that begins `- review-routed.2 of climb batch 22c's merged-diff review`, and before the blank line 617 that comes ahead of `### Not classified, to check`:

       - judge-review.1 of climb batch 22c's merged-diff review's judge, departures found by reading and recorded nowhere, a step owed, not a question, for the next batch that edits the export check's comparison of trait and object declarations: by reading, not run, the compiled export check departs from the revised rule for a satisfying trait or object declaration (`Specification/basic/components/source-code.tex:373-390`) in three ways that no ledger row holds. (a) It takes one method declaration, at the api's header, as satisfying a method declaration that is not abstract (`handleOne`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:833`), where the rule says 'a satisfying declaration (or a set of declarations)' (`source-code.tex:384`) and a method declaration is satisfied by a set (`:413-418`); row 769 holds this for a top-level function only. (b) It compares the types of the `extends`, `excludes` and `comprises` clauses in order (`equalListTraitTypeWheres`, `ExportChecker.scala:747-750`; `equalListTypes`, `:525-527`, read at `:359-360` and `:775`), where the rule's footnote lets their order differ (`source-code.tex:375-380`). (c) It matches no type with a `bool` static argument (`equalStaticArgs`, `ExportChecker.scala:671-678`), row 768's cause, shown for a top-level function only, so a trait's header or member that names such a type is refused alike. Owed: a probe of each on the compiled path; for each that it shows, a row with a gated `XXX` test (`.claude/skills/fortress-repo/references/tests-writing.md`, "How a defect is recorded"), and a sentence with its row in the Effect of Appendix I's "An abstract method of an exported trait" (`Specification/appendices/changes.tex`, `\seclabel{revival-export-abstract}`). Default: none on record; the check as landed. Evidence: `compile-ladder/climb-batch-22c/JUDGE-review.md`, section 2.4.

6. **The batch's record** (`explorations/compile-ladder/climb-batch-22c/RECORD.md`). After its last line, 345, which begins `` - `PLAN.md` gains review.1 ``, add one blank line and a paragraph that begins `**The judge's repair**, after the review (`explorations/compile-ladder/climb-batch-22c/JUDGE-review.md`), in its own commit:`. Follow it with bullets that say:
   - that the Effect of "An abstract method of an exported trait" now names rows 839 and 842, and 834 for a method that is not abstract if the probe showed it, at the `changes.tex` lines that step 3's grep printed;
   - that the entry is now `changes.tex:4320-4421`, and "Passages not yet revised" begins at `:4423` (with the first block only, `:4320-4413` and `:4415`);
   - the probe: its command, as in step 2 with the folder written as `tmp/judge22c-probe`, and two to five of its lines quoted (the control's compile, the 'different method m' line, 'Saw expected failure', the verdict), cited by command and not by the capture's path; or, if it did not show the departure, its lines and that the second block was left out;
   - that `rung-abstract-declared/decision-record.md:68` was corrected;
   - that `PLAN.md` gains judge-review.1;
   - that no test was added and no path the gate reads changed;
   - step 7's specification build lines and step 8's check lines.

7. **Build the specification**, as `.claude/skills/fortress-repo/references/specification.md`, "Building it", says, with its log under `tmp/`.
   - Both commands must end in `BUILD SUCCESSFUL`.
   - `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` must print 0. This is the gather's grep (`explorations/compile-ladder/climb-batch-21/RECORD.md:56`), because the skill's looser grep also counts the log's echo of the warning macro.
   - Then run `git clean -fXq -- Specification`. Do not update `Specification/fortress.pdf`.

8. **Check the record.**
   - `python3 explorations/coordinator/tools/record.py check --base c3c22817cba8d5a62523e2d7cb1ec19e474aaf84` must print 0 failures, as the gather's run did (`RECORD.md:92`).
   - `python3 explorations/coordinator/tools/ledger.py landing-check c3c22817cba8d5a62523e2d7cb1ec19e474aaf84` must print no finding.

9. **Commit once, locally, on `main`.**
   - Use the skill's command form (`.claude/skills/fortress-repo/references/committing.md`). Name these paths: `Specification/appendices/changes.tex`, `explorations/compile-ladder/rung-abstract-declared/decision-record.md`, `explorations/coordinator/PLAN.md` and `explorations/compile-ladder/climb-batch-22c/RECORD.md`.
   - The message says that the commit edits the original tree's specification. It ends with the skill's footer.
   - Do not push. Retry once on an `index.lock` error after a few seconds.
   - Return in `pathsChanged` every path that `git diff --name-only <before> <after>` prints. Return `testRuns` empty: the probe is scratch, not a test file of a corpus.

## 5. Left as it is

- **The callout** (`source-code.tex:391-399`). It says what the revision changed, the clause on abstract methods. Part 2 of the form asks no more of it.
- **The row-844 sentences** (`changes.tex:4382-4389`) and gather.1 (`PLAN.md:612`). They stand as written, and the new sentences follow them.
- **The rows' own text.** Rows 834, 839 and 842 already state what the new sentences say. The probe's result goes in RECORD.md, not in row 834's notes.
- **review.1**, the stale quotation in the comment at `ExportChecker.scala:327-332`, is the review's own item for the curator, at its default (`PLAN.md:614`). review-routed.1 and review-routed.2 go to the next batch without a ruling.
