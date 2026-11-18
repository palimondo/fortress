<!-- The blind pilot of the comparison of tiers: four read-only judges, Opus 5.5 at xhigh and Fable 5.2 at high, each grading one landed rung's code and tests alone against its task, on the pair that `metrics-2026-11-18.md` chose (climb batch 31's rung K, by a Fable worker at medium effort, and climb batch 33's rung Q, by an Opus worker at xhigh), set side by side for the curator: part two of the comparison that he asked for on 2026-11-18, run at his go of 12:3x UTC ("Let's run Opus and Fable 5.2 high first. We'll decide about Fable on xhigh with 5.1 & 5.2 based on remaining quota after that."). Written by the coordinator from the four reviews, with its shared claims checked against the packets. The packets, the brief, the blinded tasks and the four reviews whole are in `evidence/blind-pilot-2026-11-18/`; `build-packets.sh` rebuilds the packets from git. -->

# The blind pilot: four judges on one pair of rungs

## What ran

- **The pair.** Two rungs that change the same part of the code generator: the cast of `self` where the checker lets it stand for a type below its trait.
  - Change 1 is climb batch 31's rung K (`6df780a7d0`). A Fable 5.2 worker at medium effort wrote it, and its skeptic added one fix. It built the cast and its helper, `castToTypeBelow`.
  - Change 2 is climb batch 33's rung Q (`1f6c166b0d`). An Opus 5.5 worker at extra high effort wrote it. It reuses rung K's helper at a conditional's arms and at a closure's result. It also repairs a circular class load in the loader.
- **What a judge saw.** Each judge got one folder:
  - the rung's task, with every hint of batch, model and date cut;
  - the two decisions that the task builds (P-60 and P-146);
  - a primer, made of the worker skill's sections on how a program runs and how tests are written;
  - the diff of code and tests, with no commit message;
  - each changed file whole, before and after.
- **How the judges ran.** Each was a headless session with only the tools Read, Grep and Glob, inside its folder. It ran nothing and wrote nothing.
- **What a judge graded.** It graded one change in a session of its own, so it never saw the other change. It graded by four values, in order:
  1. correct;
  2. small and fitting, with each removable line counted ("code is a liability");
  3. tests that matter;
  4. readable.
- **How a judge reported.** Each finding was graded must fix, should fix or nit, with its file, its line and its evidence. Each value got a grade from 1 to 5.
- **The judges.** Opus 5.5 at extra high effort, then Fable 5.2 at high effort, both checked as served by each session's model usage. All four ran from 12:39 to 12:52 UTC.

## The grades

The four grades are given in the rubric's order: correct, small and fitting, tests, readable.

- **Change 1 (Fable worker):**
  - Opus judge: 4, 3, 3, 4. It counted 32 removable lines: 7 of code and 25 of tests.
  - Fable judge: 4, 3, 3, 4. It counted 31 removable lines: 15 of code and 16 of tests. Without its proposed removal of the union branch, the count is 17.
- **Change 2 (Opus worker):**
  - Opus judge: 4, 4, 4, 4. It counted 1 removable line for certain, and up to 5.
  - Fable judge: 4, 4, 3, 4. It counted 6 removable lines for certain, and 12 with a test case outside the task.
- No judge found a must-fix in either change. Each judge gave each change a 4 for correctness, with its open points inferred, not traced.

## Where the judges agree

The two judges agree on most of each change's findings, worded apart. Three findings were checked against the packet.

- **Change 1.** Both judges found these:
  - The declared return type travels to the method's code generator through a mutable field, set on the line before each of three calls, in place of a parameter (checked: `CodeGen.java:2611`, `:2979`, `:3066`, read at `:3126`).
  - The cast is dropped at a conditional whose two arms have different types, since it compares the arms with `.equals` (checked: `:7446`). The change recorded the conditional's failure as an expected-failure test, and change 2 later fixed it.
  - Two of the test's cases pass without the change: the assignment and the two arguments (checked: `forAssignment` gained no cast).
  - A where-clause guard, `opensSizes`, has no test, and its comment does not tie to it.
  - A cast can now be emitted where the declared type is a trait, which verifies today. That is a reserved point.
  - The line in `generateFunctionalBody` has no test.
  - A type name is fully qualified where the file imports its neighbours.
  - Both called the null check before the cast needless. The Opus judge said this because the helper returns on a null. The Fable judge said it because the caller throws before a null can reach it.
- **Change 2.** Both judges found these:
  - The conditional's arms are cast to the conditional's own type, as the checker gave it, so a union-typed conditional would get no cast.
  - The loader's fix reads and parses a class file at every call site it visits, with no cache, and no longer initialises the class there.
  - The loader's helper is written in awkward forms: `else try`, nested `try` blocks and fully qualified names.
  - Some test files record defects outside the task.
  - The Fable judge alone found that every test puts `self` in the first arm, so the cast of the else arm has no test (checked: each of the three test programs has `self` in the then-arm or the first clause). It also asked whether `MINMAX`'s tuple-valued arms are covered.

## What the pilot can and cannot say

- **On the judges.** Opus 5.5 at extra high and Fable 5.2 at high graded alike. On change 1 their grades were the same, and their removable lines nearly so. On change 2 they differed by one point, on tests. Each judge also found one or two things that the other missed. On one pair, a second judge adds a few findings, and does not change the verdict.
- **On the workers.** Change 2, by the Opus worker, graded higher on small and fitting (4 against 3), and on tests (4 or 3, against 3). It had far fewer removable lines (1 to 12, against 31 or 32). That leans the same way as the cheap metrics: a median of 41 code lines added per rung on Opus, against 106 on Fable, over the 12 Opus and 15 Fable rungs that fixed a defect or built a feature.
- **Why one pair cannot settle it.** The two tasks are not equal:
  - Change 1 built the helper. Change 2 reused it, so it could be small.
  - Change 2 came later, and its task named the gaps that change 1 had recorded.
  - Tier and effort change together: Fable at medium against Opus at extra high. So even a clear gap would not say which of the two causes it.
- **On his question about medium effort.** One pair gives no answer. Change 1's faults are what more effort usually catches: the field in place of a parameter, test cases that pass on the base, and an untested guard. That is a reading, not a measurement.

## Cost

Tokens written, as each session's usage reports them:

- Opus judges: 104K and 60K.
- Fable judges: 94K and 67K. On the all-models limit, Fable counts at three to four times an Opus token's share.
- Each session took 4 to 7 minutes.

## Next (the coordinator's proposal, not the curator's word)

- The two Fable runs at extra high, 5.2 and 5.1, would grade the same pair a third and a fourth time. The pilot already shows the two judges agreeing.
- More rungs would tell more than more judges on one rung. A second and a third pair from `metrics-2026-11-18.md`'s ranked list could each be graded by one judge, Opus at extra high, the cheaper of the two at about 80K tokens written a change. Each pair should be one where neither rung edits the other's code.
