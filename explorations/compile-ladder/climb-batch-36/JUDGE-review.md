# Climb batch 36, run 1: the judge's ruling on the merged-diff review

Written 2026-11-24 on `main` at `8dff5e053f`, which holds rung N's landing `2a969fed6e`, rung G's `df5948e7b8`, rung K's `da5f707779`, rung C's `3a0bae976c`, the closes `b4e9e929b0`, the gather's record `b99b95517d` and the review's corrections `8dff5e053f`. The review refused approval with one blocking finding, row 1123's clause in Appendix I. It routed nothing. This ruling reads the merged tree, the review's result, the batch record `explorations/coordinator/CLIMB-BATCH-36.md`, the gather's record `explorations/compile-ladder/climb-batch-36/RECORD.md`, rung G's report and the specification passages that the finding cites. It runs nothing, and it reads nothing of the gate that runs beside it. One launch of this role worked the ruling.

**Decision: repair.** The finding holds. Its settlement is one sentence of `Specification/appendices/changes.tex`, a file of the specification, so it is a repair, not a landing with instructions for the next batch: the brief allows `land` only where no source, library, checker, interpreter or specification file changes. The repair touches no path that the gate reads: a gate's tables hold until the tree changes under `ProjectFortress/` or `Library/`, or in `build.xml`, outside the test files (`.claude/skills/fortress-repo/references/gate.md:19`). The gate that runs beside this ruling therefore holds for the repaired tree.

## 1. The finding

### 1.1 What the merged tree says

- The entry "Overloading with static parameters" says, in its effect, "Neither implementation runs every set these rules allow." (`Specification/appendices/changes.tex:3105`) and lists the sets that each implementation fails, each with its row, through the sentence that ends "as one declaration and its redeclaration (row~1134)." (`:3135-3139`). The next sentence, "Jan's example is still not a valid overloading, ..." (`:3140`), leaves the list.
- This batch edited that list. Rung G's commit `df5948e7b8` took out row 1122's clause and, in the gather's corrections in the same commit, rewrote row 780's clause and added rows 1133 and 1134 (`git diff b5a758846d HEAD -- Specification/appendices/changes.tex`, the hunk `@@ -3126,14 +3126,16 @@`; `explorations/compile-ladder/climb-batch-36/RECORD.md:161`).
- Row 1123 is open: "under walk, of two generic functional methods of one name and arity in an object, excluding at a plain parameter, the second is never chosen: `fm(O, 4, "a")` stops, 'Failed to find any matching overload' ...", `NEGATIVE-VERIFIED`, reproducer `ProjectFortress/tests/XXXGenericFunctionalMethodsExcludingWalk.fss` (`explorations/fortress-gap-ledger.md:479`).
- It still fails after rung G's fix: "row 1123's `tests/XXXGenericFunctionalMethodsExcludingWalk.fss` still fails, 'Failed to find any matching overload, args = (4: ZZ32,"a")'" (`explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md:107`). No rung after G changed walk's dispatch of functional methods: rung N's walk change is the binding of a numeral coercion's numbers (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:104`), and rungs K and C changed the checker and the code generator.
- No sentence of the specification names the row: `grep -rn '1123' Specification --include=*.tex` prints nothing on `main`, and `git show b5a758846d:Specification/appendices/changes.tex | grep -n 1123` prints nothing on the base.

### 1.2 What the rules and the record ask

- The set is one that the entry's rules allow: the two declarations' parameter types exclude each other at the third parameter, `ZZ32` beside `String`, and two overloads whose parameter types exclude each other are valid (`.claude/skills/fortress-repo/SKILL.md`, "Fortress as a language", first point; `ProjectFortress/tests/XXXGenericFunctionalMethodsExcludingWalk.fss:1`; the row's specification citation, `advanced/overloading.tex`, "Declarations with Static Parameters").
- The revision form asks that an entry's effect name "each departure: each way in which walk or the compiled path does not do what the new text says, with its ledger row" (`.claude/skills/fortress-repo/references/specification.md:22`).
- Climb batch 35b's review found the row unnamed and routed the clause: "the first rung that edits either entry names rows 1123 and 1124 and the `comprises` clause" (`explorations/coordinator/PLAN.md:809`), and the list for the batch after climb batch 35b ends "review.1's Appendix I clauses with the first rung that edits either entry" (`PLAN.md:60`). The batch record agrees: it sends to a later batch only "review.1's Appendix I clauses where no rung edits the entry" (`explorations/coordinator/CLIMB-BATCH-36.md:367`).
- Rung G is the first rung that edited either entry, and it did row 1124's half: the numeral entry's sentence on walk's refusals at load now names the `comprises` clause and the three written forms (`Specification/appendices/changes.tex:5518-5523`). Row 1123's half fell out at the plan: G's section gives the specification only row 1124's half (`CLIMB-BATCH-36.md:508`) and tells G not to repair row 1123's code (`:506`), which is right for the code and says nothing of the clause. The gather's record then reads as though both halves were met: "Before, the effect named neither departure, the gap climb batch 35b's merged-diff review found for rows 1123 and 1124." (`RECORD.md:161`).

### 1.3 Which claims were right

- The review was right on every point of substance: the list was edited by this batch, row 1123 is open and unnamed, the set is one the rules allow, the skill's rule and the routing on record ask for the clause, and G was the rung that owed it. Its proposed place, after row 1134's sentence, is the right one: the list's sentences on the interpreter's generic methods end there (`changes.tex:3129-3139`).
- One citation was wrong: the review cites `CLIMB-BATCH-36.md:112` for the record giving G only row 1124's half. Line 112 is blank, inside rung C's section of the manifest; the passages are `:506` (rows) and `:508` (specification).
- The review was right that the repair is text only and that the gate reads no path of it (`gate.md:19`).
- The gather and rung G were not wrong in what they wrote: every clause that they added or rewrote states its code (`RECORD.md:161` gives each line). They left one clause out that the record owed.

### 1.4 What the repair does not take

- Row 724, the code generator's `ClassCastException` on an object that overloads a functional method with static parameters beside a plain one (`explorations/fortress-gap-ledger.md:548`), is named in no sentence of the specification either (`grep -rn '~724' Specification --include=*.tex` prints nothing), and row 1123's notes say that row 1123's program stops at it when compiled. That omission predates this batch (the row is climb batch 15's), no review routed it, and rung C changed `OverloadSet.java`, so a clause on the compiled path would first need its program run on the merged tree. It is not taken here; it goes to the curator and the batch after (forCurator).
- The entry "Supported features" says the interpreter "departs on two generic functional methods of one type (rows~779 and~780)" (`changes.tex:6568-6569`). That sentence answers the preface's item "generic overloading check of two functional methods of one type under the interpreter" (`Specification/fortress/preamble.tex:81-82`), a check at load. Row 1123 is a failure to choose at a call, after the pair has loaded, so it does not belong to that item, and the repair leaves the sentence as it is.

## 2. The repair

Numbered for a repair worker on the merged tree, `/home/user/fortress`, on `main`.

1. **The clause.** In `Specification/appendices/changes.tex`, after the sentence that ends "as one declaration and its redeclaration (row~1134)." (`:3139`) and before "Jan's example is still not a valid overloading, its two declarations having the" (`:3140`), insert one sentence, as its own lines:

       Of two generic functional methods of one name and number of parameters in an
       object whose parameter types exclude each other at a parameter whose type holds
       no static parameter, it never chooses the one declared second, so that a call
       that only that one fits fails, finding no matching overload (row~1123).

   Its subject, "it", is the interpreter, as in the sentences from `:3122` on. Change no other line of the entry.
2. **The program that shows it** (`.claude/skills/fortress-repo/references/specification.md:41`). Once the gate beside this ruling has ended, run `ProjectFortress/tests/XXXGenericFunctionalMethodsExcludingWalk.fss` once under walk on the merged tree, as `references/interpreter.md` says, and quote the line 'Failed to find any matching overload, args = (4: ZZ32,"a")' with its command. If it does not fail so, do not insert the sentence: stop and report what it printed.
3. **The LaTeX.** After the gate has ended, build the specification once, as `references/specification.md`, "Building it", says: both commands end `BUILD SUCCESSFUL`, and the `grep -c` of that section prints 0. Then `git clean -fXq -- Specification`. Do not update `Specification/fortress.pdf`: the brief does not ask for it.
4. **The record.** In `explorations/compile-ladder/climb-batch-36/RECORD.md`, section "The merged-diff review's corrections", add one item: the judge's ruling (`explorations/compile-ladder/climb-batch-36/JUDGE-review.md`) and the repair commit name row 1123 in Appendix I's entry "Overloading with static parameters" (`Specification/appendices/changes.tex`, the new sentence's lines); with row 1124's half that rung G made (`changes.tex:5518-5523`), climb batch 35b's review.1 (`explorations/coordinator/PLAN.md:809`) is met in both halves, so the list for the batch after drops "review.1's Appendix I clauses" (`explorations/coordinator/CLIMB-BATCH-36.md:367`). Edit no other record file: `PLAN.md:809` stays as an item for the curator.
5. **The commit.** One commit of the two paths, on `main`, local: `git add -- Specification/appendices/changes.tex explorations/compile-ladder/climb-batch-36/RECORD.md && git commit -m "<message>" -- Specification/appendices/changes.tex explorations/compile-ladder/climb-batch-36/RECORD.md`. The message says that it edits the original tree (the specification's Appendix I) and ends with the footer of `references/committing.md`. Do not push: the batch's commit stage does. On an `index.lock` error, retry once after a few seconds.
6. **No gate, no suite.** The repair changes nothing under `ProjectFortress/` or `Library/` or in `build.xml` (`gate.md:19`), so the gate that ran beside this ruling holds for the repaired tree. Run no suite and no stage.

## 3. The review's fixes

The review's own corrections, `8dff5e053f`, are records only (its `pathsOutsideExplorations` is empty), and no side contested them. This ruling does not re-rule them. Its item for the curator, review.1 on P-60's last sentence, is at `explorations/coordinator/PLAN.md:821` and stays there.
