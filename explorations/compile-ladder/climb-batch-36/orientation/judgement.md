<!-- The orientation workflow's judgement, update mode, for climb batch 36: the whole text and both changed sections installed (Dispatch and overloading, changes A and B; Numbers, change C), the five unchanged sections left as they are, the report line that each verdict rests on, the size before and after (35,145 to 34,458 characters) with its inherited size exception, and what must go with the install. -->

# Judgement: climb batch 36

**Inputs.**
- The text: `orientation.md` in this folder (34,466 bytes). The installed text: `.claude/skills/fortress-repo/references/revival-changes.md` on `main` at `4c790a4d7b`, unchanged since `7b7d4c1c56`. A `diff` of the two shows three changed lines, `:15`, `:17` and `:99`. These are the admission's changes A, B and C, with the fix round's two edits (`writer-2.log:4-5`).
- The reports: `admission.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `sources-mapping.md`, `writer-1.log` and `writer-2.log`.
- Checked here:
  - ledger rows 780, 1123, 1125 and 1131, and F-407 (`facts-extract.sh`);
  - `interpreter.md:64-68`;
  - `tests/NumeralCoercionNumberRangeWalk.fss` with its `.test`;
  - `PLAN.md:61`;
  - the uncommitted diff of `tools/orientation/regression/key.md`.
- Lint: neither writer ran one. Here, `skills-lint.py` ran on the new text, laid out as `references/revival-changes.md`, and on `sources-mapping.md`, laid out as `references/sources.md`. Neither has a hit (exit 0).

**How the tests are read in update mode.** The update changes three sentences in two sections. A hold means that the change is not made, so the old sentence stays, and the landing made each of those sentences false. A cold-read finding counts against a section only where it bears on a changed sentence. A finding on unchanged text stands whether or not the change is made, so it gives no reason to hold the change. Such findings are listed for the coordinator below.

**Whole text: install.** Each change passes all three tests. The one preservation failure is fixed. All three quiz cases are right in both rounds (`quiz-grade-1.md:7-10`, `quiz-grade-2.md:7-10`). Neither cold read finds anything in a changed sentence that would send a worker wrong.

## Dispatch and overloading (`:9-24`): install

**Change A (`:15`).** The three sentences on row 1125 are deleted.
- **Preservation:** no failure (`preserve.md:67`, "Failures: 1 (C, walk's timing)"). Rows 1134 and 1123 are placed with the coordinator (`preserve.md:51-52`). `PLAN.md:61` lists both. Checked here: row 1123 does not contradict the bold "never by the order of the declarations". Its call over a `String` fails "also when it comes first" (`fortress-gap-ledger.md:479`), so the order does not decide it.
- **Quiz:** case 3 is right in both rounds. The order of writing "does not matter" (`quiz-grade-1.md:18`, `quiz-grade-2.md:31`).
- **Cold read 2:** the reader concludes "Never rely on declaration order" (`cold-read-2.md:22`). Its one finding on `:15`, 2.B (`cold-read-2.md:88-95`), concerns the bold line, which is unchanged.

**Change B (`:17`).** The row 780 example is deleted. Round one rewrote it to row 780's new form. Cold read 1 found "first instance" undefined and found that the example added no action (`cold-read.md:195-199`, `:305-307`), so the fix round dropped it (`writer-2.log:5`). The admission allows this ("Or drop the example", `admission.md:52`).
- **Preservation:** no failure. The check ran before the fix round, so it checked the rewritten example, not the deletion. Checked here: the deletion loses nothing that the rewrite kept. Both of these live in `interpreter.md:64` and `:68`, where `:17` points (`preserve.md:45`):
  - row 780;
  - the general half: walk compares plain functional methods of a generic trait on the instance that a call makes (P-45, F-26).
- **Quiz:** case 18 is right in both rounds. Round 2 graded the text after the deletion, and the reader did not match row 416's stop to row 780 (`quiz-grade-2.md:62`).
- **Cold read 2:** the reader concludes "Never take walk's load check as the verdict" (`cold-read-2.md:23`). Its findings on `:17` concern two unchanged passages:
  - 2.B (`:88-95`): the bold line;
  - 2.S (`:133`): the clause "a case that cites a ledger row is a departure of walk".

**To install with B (not a hold).** `interpreter.md:68` still says that row 780's pair "loads, and a call can fail with 'Cannot find definition for method'". This has been false since rung G, and `:17` sends the worker there. In the same install, the skill writer rewrites only that line's row 780 clause and keeps its first two sentences on plain functional methods (`preserve.md:47`, `sources-mapping.md:18`, `admission.md:107`).

## Numbers (`:87-116`): install

**Change C (`:99`).** Two sentences are deleted: the one on the `ZZ` reading and the one on `Byte(v.asZZ32)`. "is refused statically" became "is refused: by the checker statically, by walk when the place runs".
- **Preservation:** the one failure, walk's timing lost (`preserve.md:17-29`), was fixed in the fix round (`writer-2.log:4`). Checked here:
  - The new words match F-407 ("is refused there when the place runs").
  - They also match `tests/NumeralCoercionNumberRangeWalk.fss:1` with its `.test`, `load_exception_contains=param 1 ($w:ZZ32) got arg 3000000000`.
  - The section's two other refusals (`:95`, `:99`) take the same form.
  - Rows 1131 and 1132 are placed with the coordinator (`preserve.md:53-57`, `PLAN.md:61`).
- **Quiz:** case 32 is right in both rounds. The reader writes `Byte(v)`, names no departure, and writes no getter, helper or `XXX` test of the rule (`quiz-grade-1.md:44`, `quiz-grade-2.md:76`).
- **Cold read 2:** the reader writes the coercion generic over the numeral's numbers, bounded by a `where` clause (`cold-read-2.md:57`). Its two findings on `:99` concern unchanged sentences:
  - 2.X (`:148`): the `Byte` example declares no `+`;
  - 3.7 (`:158`): the timing sentence.

**Left as the admission placed it (not a hold).** Two gaps remain in `:99`:
- "by the checker statically" does not hold on the compiled path for a numeral at another component's type (row 1131, `fortress-gap-ledger.md:737`).
- `:99`'s last sentence points to `compiler.md`, which holds neither row 1131 nor row 1132 (`preserve.md:57`).

Neither makes a worker act wrongly. A worker who follows the sentence asserts the rule in an `XXX` test, which is what `:7` asks for. By P-180 and `403a0e60cb`, the rows go to the coordinator, and `PLAN.md:61` lists them for the batch after.

## The five unchanged sections: no change

The opening (`:1-7`), "Traits and objects", "Static parameters, `where` clauses and sizes", "Reductions and comprehensions" and "Implementation limits" are identical to the installed text (`diff`). There is nothing to install or hold.

## Size

- Before: 35,153 bytes, 35,145 characters.
- After: 34,466 bytes, 34,458 characters (−687).
- Size exception:
  - The budget is 8,000 to 12,000 characters (`tools/orientation/README.md:8`). The text is 22,458 characters over the upper bound, about 2.9 times it.
  - The exception is inherited. Update mode rewrites only the passages that a landing makes false, and this update shrinks the text. Meeting the budget is the work of a consolidation run.
  - The text can still be read whole: both cold readers read it to its last line (`cold-read.md:136-139`, `cold-read-2.md:79-82`).

## For the coordinator, with the install

1. **`interpreter.md:68`:** rewrite it in the same install, as above.
2. **Other skill text that the landing made false** (`admission.md:105-109`):
   - `compiler.md:49`, `:50`, `:52`, `:137` and `:178`;
   - `interpreter.md:29`;
   - `sources.md:1274`, `:1569`, `:1591`, `:1606` and `:1616`, which `sources-mapping.md` supersedes.
3. **The regression key's case 18, uncommitted in the working tree, describes the round-one example, which the fix round deleted.** Two passages state it:
   - Its **Wrong** item: "the example that the orientation's rule on walk's load check gives since climb batch 36's update".
   - Its **Skill** line: "Since climb batch 36's update that rule's example is row 780's valid pair refused at an extending object's first instance".

   Both should say that the update deleted the example. The graded answers do not depend on it (`quiz-grade-2.md:62`). The rewrite of case 32 in the same diff agrees with the new `:99`.
4. **Cold-read findings on unchanged text.**
   - Cold read 2 has 24 findings (2.A to 2.X) and 11 points of repair history. Cold read 1 has 23 and 7.
   - The fix round left every finding on unchanged text (`writer-2.log:12`). None bears on this update's changes.
   - These are the findings that the readers rate highest. None was checked here:
     - 2.A: what a worker cites for a rule without a P-N. Both readers raise it (`cold-read.md:173-179`, `cold-read-2.md:86`).
     - 2.D: which compiled-path sentences hold under `FORTRESS_LIBRARY=one` (`cold-read-2.md:103`).
     - 2.G: the text gives `x.asRR64` as the rule, while no library declares it (`cold-read-2.md:109`).
     - 2.I: whether an untyped `1.0 / 100000.0` folds to a `QQ`. The reader rates its stakes high for microGPT (`cold-read-2.md:113`).
     - Cold read 1's 2.1: "`SEQV` follows the specification on both paths", against row 908 (`cold-read.md:145-153`).
   - Together with the size exception, these findings are the case for a consolidation run of the orientation (`tools/orientation/README.md:7`, "again whenever the part has drifted"), as `writer-2.log:12` proposes.
