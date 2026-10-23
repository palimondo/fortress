<!-- Climb batch 21, the judge of the merged-diff review: its one blocking finding, that Appendix I's "The index type of a subscript" does not describe or quote the three main-text passages the gather revised under it, is upheld with all its claims. Decision repair: seven lines in the entry's Change, two quotations and a sentence in its Original text, three passages in rung B's decision record, and RECORD.md re-anchored; no path the gate reads. -->

# Climb batch 21: the judge's ruling on the merged-diff review

Written 2026-10-23 by the batch's judge (Opus), on `main` at `bdf83c1d1`. Nothing was built or run for this ruling, and the gate's folders were not read. Each point below is a reading of the tree at that commit.

## 1. Ruling

**Decision: repair.** The review's one blocking finding is upheld in full. Appendix I's entry "The index type of a subscript" (`\seclabel{revival-index}`, `Specification/appendices/changes.tex:4122-4274`) names the two sections of the three passages that the gather revised under it in its Affected sections (`:4127-4128`). But its Change (`:4131-4157`) does not describe them, and its Original text (`:4244-4272`) quotes neither of the two Working Draft sentences those passages replace.

The repair adds two things the review did not ask for. Both are records only:
- Rung B's decision record, to which the entry sends the reader for "The full reasoning" (`changes.tex:4209-4211`), gains the same three passages. Part 4 of the revision form asks for "each changed passage, the original and the new text, the reason, and the way back" (`.claude/skills/fortress-repo/references/specification.md:37`). Its section 4 stops at 4.6 (`explorations/compile-ladder/rung-index-bound/decision-record.md:30-78`).
- The batch's RECORD.md cites the entry's neighbour, "Passages not yet revised", at `changes.tex:4306-4313` on `main` (`explorations/compile-ladder/climb-batch-21/RECORD.md:34`, `:121`, `:318`). The repair moves that sentence down by 23 lines.

The decision cannot be land. The repair edits `Specification/appendices/changes.tex`, and the brief allows land only when no specification file changes. The repair changes no path the gate reads, which are `ProjectFortress/`, `Library/` and `build.xml` (`explorations/coordinator/climb-batch-workflow.js:1342`). The gate's `testSpecData` reads the `.fss` files of `SpecData/examples/`, not the LaTeX (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/SpecDataJUTest.java`, `suite()`). The repair adds no test. So the gate does not run again (`repairRerun`, `climb-batch-workflow.js:1417-1440`).

No finding was routed, and no skeptic's fix is contested.

## 2. The finding

**The rule.** The revision form asks every change of the text for an entry that gives "the affected sections, the change, its rationale and its effect" and "the original text, quoted with its path and line in `Specification-1.0-frozen/`" (`specification.md:21-23`).

**What the gather changed.** Commit `153887360`, rung B composed with the gather's corrections (`RECORD.md:144`), revised three main-text passages, each with a `revival-index` callout:
- `Specification/basic-lib/objects.tex:21-26`: `Any`'s immediate subtypes are "\TYP{Object}, \TYP{Tuple}, \TYP{()}, and \TYP{Index}", where the base had the first three (`git diff 00f2e1bdc HEAD -- Specification/basic-lib/objects.tex`, hunk `@@ -19,7 +19,11 @@`).
- `objects.tex:163-164`, with its callout at `:177-179`: "Every trait other than \TYP{Any}, \TYP{Object} and \TYP{Index} extends \TYP{Object}", where the base named two (hunk `@@ -156,8 +160,8 @@`).
- `Specification/preliminaries/overview.tex:1061-1065`: "rooted at the traits \TYP{Object} and \TYP{Index}", where the base had "rooted at trait \TYP{Object}" (hunk `@@ -1059,7 +1059,10 @@`).

The same commit wrote `\secref{overview-objects-traits}` and `\chapref{lib:object}` into the entry's Affected sections (`git blame -L 4126,4130 Specification/appendices/changes.tex` prints `1538873603` on every line).

**What the entry says.**
- The Change names `\secref{tuple-types}` (`:4142-4146`), `\secref{trait-types}` (`:4147-4148`), `\secref{type-relations}` (`:4149-4150`), `\secref{trait-decls}` (`:4151-4155`) and the box on the proposed feature (`:4156-4157`). Its "the hierarchy is rooted at \TYP{Object} and \TYP{Index}" (`:4154-4155`) is the sentence of `\secref{trait-decls}`, `Specification/basic/traits.tex:205-206`. The overview's sentence is a different passage. No sentence of the Change names `\chapref{lib:object}` or `\secref{overview-objects-traits}`.
- The Original text quotes `types-vals-vars.tex` (`:4244-4262`) and `traits.tex:181-183` and `:193-194` (`:4263-4271`), and nothing else.

**The Working Draft's sentences.**
- `Specification-1.0-frozen/basic-lib/objects.tex:19-20`: "The immediate subtypes of the trait \TYP{Any} are \TYP{Object}, \TYP{Tuple}, and \TYP{()}."
- `Specification-1.0-frozen/preliminaries/overview.tex:1061-1062`: "Traits in Fortress exist in a multiple inheritance hierarchy rooted at trait \TYP{Object}."
- The second passage of `objects.tex` has no counterpart in the Working Draft's chapter. `grep -n 'Every trait other' Specification-1.0-frozen/basic-lib/objects.tex` prints nothing. The base's sentence came in with the revival's instantiation-exclusion revision, `3924e7ec3` (`git log -S'Every trait other than \TYP{Any} and \TYP{Object} extends \TYP{Object}' -- Specification/basic-lib/objects.tex`). Its callout is `revival-object`'s (`objects.tex:171-176`), and it restates `Specification-1.0-frozen/basic/traits.tex:181-183`, which the entry already quotes.

So two quotations are owed, not three, as the review said. The third passage gets a sentence that says where its original stands.

## 3. Which claims of each side were right

The review:
- **"the gather revised [three passages] under it"**: right (section 2, the three hunks and their callouts at `objects.tex:24`, `:177` and `overview.tex:1063`).
- **"The gather also added \secref{overview-objects-traits} and \chapref{lib:object} to the entry's Affected sections (:4127-4128)"**: right (the blame above; `RECORD.md:144`).
- **"the entry's Change field (:4131-4157) describes none of the three passages"**: right. The one sentence that looks close, `:4154-4155`, is `traits.tex`'s.
- **"Its Original text (:4244-4272) quotes neither ... objects.tex:19-20 ... nor ... overview.tex:1061-1062"**: right, and both line ranges are right.
- **"The revision form asks every change of the text for both (specification.md:21-23)"**: right.
- **"add one sentence to the Change for each of the three passages, and add the two quotations"**: right in substance. It was also right to ask for two quotations only, since the third passage's original is the revival's own text (section 2).
- **"no path the gate reads changes"**: right (`climb-batch-workflow.js:1342`; `SpecDataJUTest.suite()`).
- The review did not check part 4 of the form, the decision record. That gap is closed here as a record edit.

The gather and rung B:
- **Rung B** was right to list `objects.tex` and `overview.tex` as made false and leave them to the gather (`RECORD.md:234`).
- **The gather** was right to correct the three passages under P-156. P-156 says `Index` "stands beside `Any` and `Object`, outside `Object`" (POSITIONS.md, **A collection's index type extends `Index`, a trait that the ranges exclude, and a tuple of indices is an `Index`.**). The gather was also right to box each passage and to extend the Affected sections. It was wrong to stop there: the Change and the Original text of the same entry, and the decision record the entry cites, were left as rung B wrote them.

## 4. The repair

The instructions are those of the structured decision, repeated here.

1. **Where and how.** Work in the main tree, `/home/user/fortress`, on `main`, after the gate there has finished. Use the skill's setup for each call (`.claude/skills/fortress-repo/references/build-and-caches.md`). Edit no file under `ProjectFortress/`, `Library/` or `Specification-1.0-frozen/`, and add no test. Before each edit, confirm that the line numbers below still hold with `sed -n`. If another commit has moved them, place each edit by the quoted neighbouring lines.

2. **The entry's Change** (`Specification/appendices/changes.tex`). Insert seven lines after line 4155, which reads `\TYP{Object} and \TYP{Index}.`, preceded by `:4154`'s `implicitly extends \TYP{Object} too, and the hierarchy is rooted at`. They go before line 4156, which begins `The item on array indexing among the proposed features gains a box, and so`. Insert exactly:

       In \chapref{lib:object}, the immediate subtypes of the trait \TYP{Any} include
       \TYP{Index}.
       In the same chapter, the sentence that every trait other than \TYP{Any} and
       \TYP{Object} extends \TYP{Object}, which is the revival's
       (\secref{revival-object}), names \TYP{Index} beside them.
       In \secref{overview-objects-traits}, the hierarchy of traits is rooted at the
       traits \TYP{Object} and \TYP{Index}.

   - The first sentence rests on `Specification/basic-lib/objects.tex:21-26`, the second on `:163-164` and `:177-179`, and the third on `Specification/preliminaries/overview.tex:1061-1065`.
   - The labels exist: `\chaplabel{lib:object}` at `objects.tex:13`, `\seclabel{overview-objects-traits}` at `overview.tex:1056` and `\seclabel{revival-object}` at `changes.tex:430`.

3. **The entry's Original text.** After step 2, the old lines 4263 and 4271 are at 4270 and 4278.
   - At line 4270, which reads `and \nolinkurl{Specification-1.0-frozen/basic/traits.tex}, lines 181--183 and`, delete the leading `and ` so that the line begins `\nolinkurl{`. The list then has its one `and` before its last item.
   - After line 4278, the `\end{quote}` that closes `This relation must form an acyclic hierarchy rooted at trait \TYP{Object}.`, and before line 4279, which reads `The box in the appendix of proposed features is new.`, insert exactly these sixteen lines:

         \nolinkurl{Specification-1.0-frozen/basic-lib/objects.tex}, lines 19--20, which
         the change revises:
         \begin{quote}
         The immediate subtypes of the trait \TYP{Any} are \TYP{Object}, \TYP{Tuple},
         and \TYP{()}.
         \end{quote}
         and \nolinkurl{Specification-1.0-frozen/preliminaries/overview.tex}, lines
         1061--1062, which the change revises:
         \begin{quote}
         Traits in Fortress exist in a multiple inheritance hierarchy rooted at trait
         \TYP{Object}.
         \end{quote}
         The sentence of \chapref{lib:object} on the traits that do not extend
         \TYP{Object} has no counterpart in the Working Draft's chapter; it restates
         the sentence of \nolinkurl{Specification-1.0-frozen/basic/traits.tex}, lines
         181--183, quoted above.

   - The quotations are `Specification-1.0-frozen/basic-lib/objects.tex:19-20` and `Specification-1.0-frozen/preliminaries/overview.tex:1061-1062`, word for word. The last sentence rests on section 2 of this ruling (the empty grep and `3924e7ec3`).
   - Change no other line of the entry, and no callout: the three boxes already name the change.
   - Then check the moves. `grep -n 'Whether two parameter types exclude each other when the only static arguments' Specification/appendices/changes.tex` must print `4329`. `grep -n 'refuses (row~806' Specification/appendices/changes.tex` must print `4242`.

4. **Rung B's decision record** (`explorations/compile-ladder/rung-index-bound/decision-record.md`). Insert the block below after line 79, the blank line after 4.6's `Way back: remove the box.` at `:78`, and before `## 5. BoundedRange's `atMost`` at `:80`. End it with one blank line. Leave the file's other lines as they are: they cite the rung's tree (`RECORD.md:31`).

       ### 4.7 The immediate subtypes of `Any`, in the library (`basic-lib/objects.tex`, "Fortress.Core.Any")

       Added after climb batch 21's merged-diff review, with 4.8 and 4.9. The gather corrected these three passages, which the rule made false (`explorations/compile-ladder/climb-batch-21/RECORD.md`, rung B's corrections, and `JUDGE-review.md` there). Their lines are `main`'s.

       Original (`Specification-1.0-frozen/basic-lib/objects.tex:19-20`; base `Specification/basic-lib/objects.tex:21-22`): "The immediate subtypes of the trait Any are Object, Tuple, and ()."

       New (`Specification/basic-lib/objects.tex:21-26`): "The immediate subtypes of the trait Any are Object, Tuple, (), and Index, the trait of the types that a subscript takes", with a box.

       Reason: as 4.1, `Index extends Any` makes it an immediate subtype of `Any`. Way back: drop `Index` from the list, and the box.

       ### 4.8 The traits that do not extend `Object` (`basic-lib/objects.tex`, "Fortress.Core.Object")

       Original: none in the Working Draft's chapter. The base's sentence, "Every trait other than Any and Object extends Object" (`Specification/basic-lib/objects.tex:159-160` at `00f2e1bdc`), is the revival's (`3924e7ec3`, beside the box of Appendix I's "The root's algebra"), and restates `Specification-1.0-frozen/basic/traits.tex:181-183` (4.5).

       New (`Specification/basic-lib/objects.tex:163-164`, its box at `:177-179`): "Every trait other than Any, Object and Index extends Object".

       Reason: as 4.5, question 1's answer (P-156). Way back: the base's sentence, without the box.

       ### 4.9 The root of the hierarchy, in the overview (`preliminaries/overview.tex`, "Objects and Traits")

       Original (`Specification-1.0-frozen/preliminaries/overview.tex:1061-1062`, the same lines in the base): "Traits in Fortress exist in a multiple inheritance hierarchy rooted at trait Object."

       New (`Specification/preliminaries/overview.tex:1061-1065`): "... rooted at the traits Object and Index", with a box.

       Reason: as 4.5's second sentence. Way back: the original sentence, without the box.

   The base lines rest on the hunks in section 2 of this ruling (`git diff 00f2e1bdc HEAD -- Specification/basic-lib/objects.tex Specification/preliminaries/overview.tex`).

5. **The batch's record** (`explorations/compile-ladder/climb-batch-21/RECORD.md`).
   - Re-anchor "Passages not yet revised", which steps 2 and 3 move down by 23 lines. At `:121` and `:318`, replace `changes.tex:4306-4313` and `:4306-4313` with `:4329-4336`. At `:34`, replace `` `:4306-4313` after B's entry and the gather's correction `` with `` `:4329-4336` after B's entry, the gather's correction and the merged-diff review's repair ``. Change no other figure on those lines.
   - Line 145 is the blank line between rung B's corrections (`:139-144`) and `### N` (`:146`). Insert after it a paragraph that begins `**Corrections, after the review.**`, followed by one blank line. The paragraph says:
     - that the Change of "The index type of a subscript" now names the three passages (`changes.tex:4156-4162`);
     - that its Original text now quotes `Specification-1.0-frozen/basic-lib/objects.tex:19-20` and `Specification-1.0-frozen/preliminaries/overview.tex:1061-1062`, and says that the sentence of `objects.tex:163-164` has no counterpart in the Working Draft's chapter (`changes.tex:4279-4294`);
     - that rung B's `decision-record.md` gained sections 4.7 to 4.9 for the same passages;
     - that the Effect's sentence on row 806 and its sentence on a program's own type named `Index` are `changes.tex:4237-4242` and `:4243-4244` on `main` after the repair;
     - that this ruling is `explorations/compile-ladder/climb-batch-21/JUDGE-review.md`;
     - that no test was added and no path the gate reads changed.
   - The rungs' own `REPORT.md` and `SKEPTIC.md` cite their own trees and stay as they are.

6. **Build the specification** as `.claude/skills/fortress-repo/references/specification.md`, "Building it", says, with its log under `tmp/`.
   - Both commands must end in `BUILD SUCCESSFUL`.
   - Use the gather's grep, because the skill's looser grep counts the log's echo of the warning macro (47 at the gather, `RECORD.md:56`): `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` must print 0.
   - Then run `git clean -fXq -- Specification`. Do not update `Specification/fortress.pdf`: the landing builds it (`climb-batch-workflow.js:1501`).

7. **Check the record.** Run `python3 explorations/coordinator/tools/record.py check --base 00f2e1bdc5350b7590e4179e1b04bf6580d915f3`. It must print 0 failures, as the gather's run did (`RECORD.md:58`).

8. **Commit once, locally, on `main`.**
   - Use the skill's command form (`.claude/skills/fortress-repo/references/committing.md`). Name these paths: `Specification/appendices/changes.tex`, `explorations/compile-ladder/rung-index-bound/decision-record.md` and `explorations/compile-ladder/climb-batch-21/RECORD.md`.
   - The message says that the commit edits the original tree's specification. It ends with the skill's footer.
   - Do not push. Retry once on an `index.lock` error after a few seconds.
   - Return in `pathsChanged` every path that `git diff --name-only <before> <after>` prints, and an empty `testRuns`.

## 5. Left as it is

- **The callouts.** The three boxes (`objects.tex:24-26`, `:177-179`, `overview.tex:1063-1065`) already say what changed, so part 2 of the form holds.
- **The preamble's paragraph** (`Specification/fortress/preamble.tex:54-64`) says only that revised passages carry boxes and that Appendix I lists each change. The repair keeps it true.
- **The `revival-object` entry.** Its Rationale, which the gather revised (`changes.tex:438-446`), is Appendix I's own text, not a main-text passage, so it owes no quotation.
- **Section 5 of the decision record** cites the rung's tree (`FortressLibrary.fsi:2257`, `.fss:4105`, `:3441`, `:3443`; on `main` they are `:2243`, `:4108`, `:3444`, `:3446`, `RECORD.md:33`). Like the rungs' other files, it is not re-anchored in place (`RECORD.md:31`).
