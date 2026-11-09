# Climb batch 29: the judge's ruling on the merged-diff review

The merged-diff review of climb batch 29 (heads `1d50c6bbbf` before it and `6a654baa13` after its corrections, base `b430f9f428`) did not approve the merged tree. It raised two blocking findings. Both concern rung T's Appendix I entry `revival-numerals` and the gather's box in `ranges.tex`, which claim more of walk than walk does on the merged tree. This file rules on the two findings and gives the repair. It does not rule on the review's two routed findings, which go to the next batch as the review filed them (`explorations/coordinator/PLAN.md`, "Climb batch 29, listed for his review").

## The standard

- The revision form makes the Effect of an Appendix I entry name "each departure: each way in which walk or the compiled path does not do what the new text says, with its ledger row" (`.claude/skills/fortress-repo/references/specification.md`, "Changing the text: the revision form", item 1).
- Where a decision says which side is right and the wrong side is outside the work's area, the departure is recorded, and "if the passage has an Appendix I entry, name the departure or the conflict in the entry's effect, with its ledger row. Then the text claims no more than holds" (same file, "When the text and an implementation disagree").
- A changed sentence that says what walk or the compiled path does must be true of the tree (same file, the paragraph after item 4).

## Finding 1: a negative constant at a program's own number type

**Upheld.**

What the review claimed, and what holds:

- The text says a negative constant reaches a program's coercion "as the prefix operator `-` applied to the coercion's result for the natural numeral ..., so a type without that operator refuses it" (`Specification/basic/expressions/literals.tex:215-218`). This follows fork C6's default, "the judgement's repair 3, which he took" (`explorations/coordinator/CLIMB-BATCH-29.md:369`). Right.
- Walk departs on the merged tree. Two rungs cause it together, and both causes are in the code:
  - rung F put the fold into walk's phase list (`ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java:130`, `INTEGERLITERALFOLDING` in `interpreterPhaseOrder`), so `-3` and `5 - 8` reach walk as one `IntLiteralExpr` of value -3;
  - rung N's site takes `x.getIntVal()`, signed, as the digit value, and counts the digits of the text with the sign stripped (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:160-179`).

  The review's probe at `1d50c6bbbf` (`bin/fortress walk`) printed 't 1 -3' for `t: Tally = -3` and for `t: Tally = 5 - 8`, and 'w 7' for `w: Written = -3`. The type declares no `-` and still takes the numeral. Right.
- The Effect names only the compiled half: "the compiled path gives a program's coercion a negative numeral with its sign, not as the prefix operator `-` on the coercion's result for the natural numeral (row~961)" (`Specification/appendices/changes.tex:5194-5196`). Walk's half, row 968, is missing. Right: the Effect breaks the revision form.
- The record side is done in `6a654baa13`: row 968 filed, and row 961 noting it ("Walk's half, through the same fold: row 968"). Right.

The way not taken is to make walk, the fold or the checker build the prefix minus. That is a code change, and the curator holds it as an open fork: PLAN item 75 lists "the fold keeps the operator's reference ...; the checker, and walk, build one; or rows 961 and 968 stand until the switch-over", with "No default on record beyond the fork's, which the landed tree departs from" (`explorations/coordinator/PLAN.md:140`). Rung C reported its deviation from C6 as a point (`explorations/compile-ladder/rung-numeral-checker/REPORT.md:135`, decision 8). Building the minus here would choose a way of an open fork for the curator, so the repair is the text only. Naming row 968 decides nothing on item 75. Either answer leaves the Effect true: a later fix removes the clause with its row.

## Finding 2: a size of 2^31 or more read as a value

**Upheld, and wider than the review found.**

What the review claimed, and what holds:

- P-173 says "a `nat` parameter used as a value is a `ZZ32` (P-40)". The text follows it (`Specification/basic/trait-parameters.tex:105-113`, the box).
- Walk reads such a size "as a `ZZ32` up to 2^31-1 and as a `ZZ64` above" (F-140, "A size beyond `NN32` or `ZZ32` is refused by the compiled checker ..."). F-140 held this before the batch. The review's probe at `1d50c6bbbf` printed 'big ZZ64 3000000000' for `sizeValue[\3000000000\]()`. Right: under walk such a size is not a `ZZ32`.
- The Effect's sentence "a \KWD{nat} parameter used as a value is a \EXP{\mathbb{Z}32}, ... (row~486)" (`changes.tex:5145-5148`) sits under "Both implementations ..." (`changes.tex:5127`). Its list of departures names only the compiled half of row 962, "stops with an error that no \KWD{catch} sees where a \KWD{nat} or \KWD{int} parameter of $2^{31}$ or more is used as a value (row~962)" (`changes.tex:5197-5198`). Right: walk's half is missing.
- The gather's box says "the compiled type checker and the interpreter give a \KWD{nat} or \KWD{int} parameter used as a value the type \EXP{\mathbb{Z}32}" (`Specification/basic/expressions/ranges.tex:55-58`). This box is a changed sentence that says what walk does, and walk does not do it for a size of 2^31 or more. Right. The base's text already claimed "the interpreter makes it a \EXP{\mathbb{Z}32}" (the `ranges.tex` hunk of `4978a9b16e`), so the overclaim is older than this batch. It still has to be repaired here, because this batch rewrote the sentence.
- The record side is done in `6a654baa13`: row 962 now notes "Walk reads such a size as a ZZ64 (F-140): sizeValue[\3000000000\]() typed ZZ64 at 1d50c6bbbf". Right.

The review missed a third passage with the same claim. It is in `revival-inference`'s Rationale, which this batch rewrote: "Both implementations make a \KWD{nat} or \KWD{int} parameter used as a value a \EXP{\mathbb{Z}32} (\secref{revival-numerals})" (`changes.tex:2237-2238`; the batch's diff adds this line). The repair qualifies all three passages.

Row 962 is `CONTESTED`: it leaves open whether such a read is refused where the class loads, raises `IntegerOverflow`, or is no `ZZ32`. The repair names the departure. It does not choose among those answers.

## The review's other work

The review committed only under `explorations/` (`git show --stat 6a654baa13`: seven files, all under `explorations/`). Its `fixed` and `fixesChecked` items cite their commits and runs. This ruling does not depend on them, and I did not check them again. No point to report holds the push, and this ruling adds none.

## Decision: repair

Both findings are settled by edits to `Specification/` only. No code, library, checker, interpreter or test file changes. Under the brief, an edit to the specification is a repair, not a landing on the gate. The edits change prose only. No example under `SpecData/` changes, so the gate's verdict on code, tests and `testSpecData` stands. The repair builds the specification once to check its LaTeX.

## The repair

Work in `/home/user/fortress` on `main`, and load the `fortress-repo` skill and its `specification.md` first. Make each edit below with the Edit tool, keeping the line breaks of the surrounding text. "Replace" means: replace exactly the quoted text.

1. `Specification/appendices/changes.tex:5191-5202` (`revival-numerals`, Effect, the list of departures). Replace the text from "the interpreter runs the operator of" through "(row~956)." with this:

   ```
   the interpreter runs the operator of
   \EXP{\mathbb{R}64} where a floating-point numeral stands to the left of an
   \EXP{\mathbb{R}32} (row~958), and counts only one of the leading zeros of a
   numeral with a radix point among its digits (row~960); the compiled path
   keeps a numeral's own type at the selector of a \KWD{typecase} (row~963);
   both give a program's coercion a negative constant with its sign, not as the
   prefix operator \EXP{-} on the coercion's result for the natural numeral, so
   that a type without \EXP{-} takes it: the compiled path as a negative numeral
   (row~961), and the interpreter, which folds the constant as the compiled path
   does, as a natural numeral of negative value, whose digit count is that of
   the numeral without its sign (row~968); where a \KWD{nat} or \KWD{int}
   parameter of $2^{31}$ or more is used as a value, the compiled path stops
   with an error that no \KWD{catch} sees, and the interpreter makes it a
   \EXP{\mathbb{Z}64} (row~962); and both leave an expression of numerals alone
   as written where the form of its result needs a prefix \EXP{-} or a \EXP{/}
   that its component writes nowhere (row~956).
   ```

   Keep "The implementations depart from the text in these further ways, each with its row of the revival's gap ledger:" before it. This settles finding 1, and finding 2 at `:5145-5148`: that sentence stands, and the list now names both halves of row 962. Row 968's claim is the source for the interpreter's clause (`explorations/fortress-gap-ledger.md`, row 968), and row 962's notes for the `ZZ64` clause.

2. `Specification/basic/expressions/ranges.tex:55-58` (the gather's `\revision{revival-inference}` box). Replace

   ```
   run it: the compiled type checker and the interpreter give a \KWD{nat} or
   \KWD{int} parameter used as a value the type \EXP{\mathbb{Z}32}
   (\secref{revival-numerals}).}
   ```

   with

   ```
   run it: the compiled type checker and the interpreter give a \KWD{nat} or
   \KWD{int} parameter used as a value the type \EXP{\mathbb{Z}32}
   (\secref{revival-numerals}), the interpreter only where the size is below
   $2^{31}$, since it makes a larger one a \EXP{\mathbb{Z}64} (row~962 of the
   revival's gap ledger).}
   ```

   This follows the form of the boxes that cite a row in `Specification/basic/inference.tex:261` and `:283`.

3. `Specification/appendices/changes.tex:2237-2238` (`revival-inference`, Rationale). Replace

   ```
   Both implementations make a \KWD{nat} or \KWD{int} parameter used as a value a
   \EXP{\mathbb{Z}32} (\secref{revival-numerals}), where the compiled type checker
   ```

   with

   ```
   Both implementations make a \KWD{nat} or \KWD{int} parameter used as a value a
   \EXP{\mathbb{Z}32} (\secref{revival-numerals}), the interpreter one whose size
   is below $2^{31}$ (row~962 of the revival's gap ledger), where the compiled type checker
   ```

   Then rewrap that line to the file's width. Keep the rest of the sentence ("gave it the type of a numeral before 8~November 2026, ...").

4. Grep `Specification/` (not `Specification-1.0-frozen/`) for any other changed sentence that says both implementations give a size used as a value a `ZZ32`, or that names row 961 without row 968: `grep -rn 'used as a value\|row~961' Specification --include=*.tex`. The hits that state a decision, as `trait-parameters.tex:105-113` does, stay as they are. Qualify any other hit that states what an implementation does, in the same form as steps 1 to 3. On `6a654baa13` the grep finds no hit beyond those three.

5. Build the specification once, as `specification.md`, "Building it", says. If the gate is still running in this tree, start the build after the gate ends, so that nothing runs beside it. Do not read the gate's output. Both `./ant genSource` and `./ant tex` must end in `BUILD SUCCESSFUL`, and the warning grep of that section must print 0. Then run `git clean -fXq -- Specification`. Quote two to five lines of each result in your report, with the command that printed them.

6. Commit the three edited `.tex` files locally on `main`, in one commit, with the skill's footer (`committing.md`). The message says that the commit edits the original tree's specification, and that it names walk's halves of rows 968 and 962 in `revival-numerals`' Effect and qualifies the two boxes. Do not push.

7. Record the repair in `explorations/compile-ladder/climb-batch-29/RECORD.md`, in "The tests on the merged tree", after the item on the specification's build (`RECORD.md:51`). Add one item that names this commit, rows 962 and 968, and the build's two `BUILD SUCCESSFUL` lines. Commit that file after step 6, also locally.

The repair does not touch the routed items `review-routed.1` and `review-routed.2`. It adds no test (`specification.md`: an edit of the text has no test) and changes no ledger row: the review filed row 968 and noted rows 961 and 962 in `6a654baa13`.
