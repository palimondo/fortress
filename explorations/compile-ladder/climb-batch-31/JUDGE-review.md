# Climb batch 31, run 1: the judge's ruling on the merged-diff review

The ruling is by reading only: no build and no program was run, and nothing under `tmp/gate-batch-31/` was read. The tree read is `main` at `2587659380`.

## Decision: repair

One finding, upheld. Its settlement is one sentence of `Specification/appendices/changes.tex`, a file of the specification, so by the brief it is a repair and not a landing on tests and records. The repair changes no code, no test, no library file and no path that the gate reads.

## The finding

The review's one blocking finding: the Effect that rung K wrote in the Appendix I entry on `self` in a self-typed trait (`Specification/appendices/changes.tex:4441-4447`, commit `6df780a7d0`) names the closure's departure (row 1050) and omits the conditional arm's (row 1051).

## What each side had right

The review is right on each of these:

- The rule. The effect of an Appendix I entry names each way in which walk or the compiled path does not do what the text says, with its ledger row (the skill's `references/specification.md`, "Changing the text: the revision form", item 1, and "When the text and an implementation disagree", third point: "Then the text claims no more than holds.").
- The departure belongs to this entry. The entry gives `self` the type `T ∩ X` in a self-typed trait's bodies (`changes.tex:4428-4430`), so `if lt(other, self) then self else other end` is valid at the declared return type `T`, and the compiled checker accepts it. The compiled code fails verification: the gather measured it on the merged tree (`explorations/compile-ladder/climb-batch-31/RECORD.md:53`, 'java.lang.VerifyError: Bad return type', "Type 'java/lang/Object' (current frame, stack[0]) is not assignable to 'GTordLate$Late'"), and row 1051's notes end "The same at a self-type parameter, the shape of `StandardTotalOrder`'s `MIN` and `MAX`."
- The code. `CodeGen.castToTypeBelow` returns without a cast unless the expression's static type is a `TraitSelfType`, or a union whose members are all one such type (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7436-7459`, the test at `:7450`). A conditional with `self` in one arm and a value of `T` in the other has neither.
- The reach. The one library writes that shape: `opr MIN(self, other:T): T = if other < self then other else self end` and `opr MAX` (`Library/FortressLibrary.fss:291-292`).

The review offered a second reading, that the sentence is true as written if "a default body returns it" means a body that is `self` alone, and the omission then a matter for the record. I rule against that reading, on three grounds:

1. The sentence ends "so a compiled program that runs such a body with the parameter at an object type runs" (`changes.tex:4443-4444`). A reader takes `MAX`'s body as one that returns `self` as the self parameter: one of its arms does. Of that body the sentence is false.
2. The same Effect already names one case that still fails, with its row (`changes.tex:4445-4447`, row 1050). An Effect that lists one departure and leaves out its sibling says, to a reader, that the list is whole.
3. Row 1051 is the nearer wall: it stands for every type that extends `StandardTotalOrder` once a program compiles against the one library, where row 1050 needs a closure in a self-typed trait's body.

Rung K's side was right in what the sentence does say: the four places it lists (a returned value, a single argument, a binding, an assignment) are the places where `castToTypeBelow` is called (`CodeGen.java:2611`, `:2979`, `:3066`, `:3126`, `:5525`, `:7417`), and row 695 is closed on its test (`ProjectFortress/compiler_tests/SelfTypeReturnSelfRun.test`). Rung K also recorded row 1051 itself, with an expected failure at a listed type of a `comprises` clause (`ProjectFortress/compiler_tests/XXXComprisesValueAtConditionalArmRun.fss:6`). The one thing wrong is that the Effect was not brought level with the row.

Not upheld as part of this finding: row 1052 (a default body that calls a method on a value of the self-type parameter, `ClassCircularityError`). It is about a call on `other`, not about the type of `self`; it stood on the base, and the Effect before rung K did not name it. It stays in the ledger alone.

## Instructions for the repair

The repair is on `main` in `/home/user/fortress`. It edits one file of the original tree and one report, and commits them.

1. In `Specification/appendices/changes.tex`, replace lines 4445-4447, which read

       A function expression or a local function that returns \KWD{self} as the self
       parameter still fails the JVM's verification when its class is loaded
       (row~1050 of the revival's gap ledger).

   by

       A function expression or a local function that returns \KWD{self} as the self
       parameter still fails the JVM's verification when its class is loaded
       (row~1050 of the revival's gap ledger), and so does a default body that
       returns a conditional expression with \KWD{self} in one arm and another
       value of the self parameter in the other (row~1051).

   Rests on: `changes.tex:4441-4447`; row 1051 of `explorations/fortress-gap-ledger.md`; `CodeGen.java:7450`; `RECORD.md:53`. Change no other line of the entry, and no line of lines 4441-4444.
2. Run no program for the new clause. The measurement that shows it is the gather's, on the code of `6df780a7d0`, which no later commit changes (`RECORD.md:47` and `:53`); cite it.
3. Write no test and change none: an edit of the specification has no test (the skill's `SKILL.md`, "Rules for every task"), and the test owed for this shape at a self-type parameter is review-routed.1's, for the next batch (`explorations/coordinator/PLAN.md`, group "Climb batch 31, listed for his review").
4. In `explorations/compile-ladder/rung-comprises-cast/REPORT.md`, at the line that quotes the Effect after the change (line 137, "After: ..."), add one sentence after the quotation: that the judge's repair of the merged-diff review added the clause on the conditional arm, row 1051, with this file's path. Do not rewrite the quotation.
5. Check the LaTeX by building the specification as `references/specification.md`, "Building it", says, only once the gate no longer runs in this tree; the clause adds no label, no macro and no reference. Both commands end in 'BUILD SUCCESSFUL' and the warning count is 0. Then `git clean -fXq -- Specification`. Do not copy the PDF.
6. Commit the two paths in one command that names them, with the skill's footer, and a message that says the commit edits the original tree's specification. Do not push; the commit stage does.

## For the curator

- judge.1. The repair names row 1051 in the Effect of the entry on `self` in a self-typed trait; it does not build the cast. The review's review.1 and the gather's gather.1 ask that a rung for the conditional arm in `CodeGen.forIf` come before the switch-over, since `MIN`, `MAX` and `MINMAX` of `StandardTotalOrder` have the shape (`Library/FortressLibrary.fss:291-294`). Nothing on record places that rung; the placing is his.
- judge.2. The skill's `references/revival-changes.md`, "Traits and objects", still says "A compiled body of `T` that returns `self` fails the JVM's verification when its class loads (row 695)." Row 695 is FIXED by `6df780a7d0`; what stands is rows 1050 and 1051. The file is under `.claude/`, which is the coordinating session's to edit, so the repair does not touch it.
