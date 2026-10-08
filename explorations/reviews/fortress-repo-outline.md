<!-- For each part of the fortress-repo skill, what goes in, moves out or is cut when six inputs are brought in, a new part for the revival's changes, and the decisions not taken; an outline, nothing rewritten. -->

# The fortress-repo parts: an outline of the changes

A part is a file under the skill's `references/`. The numbers name the inputs: (1) the revival story's part 6; (2) its parts 1 and 2; (3) `testing-practices.md`; (4) the distillation audit, sections A and C; (5) the gap ledger's new form and `ledger.py`; (6) `context-study.md`. A tool is a proposed script, not built yet; the text that it would replace stays until it lands.

Already in: audit items A1 to A8, A10 to A15, C1 to C4 but one row. Left out: A9, the gate's report-only stages, as this skill holds nothing of the checker count or the distance; the batch roles of (2) and the briefing proposals of (6), which are the `coordinator` skill's or the brief's.

## build-and-caches.md

- In: a build takes up to about 140 s while other agents build (3).
- In: "Unable to read serialized data ... relink" is usually a code-generator defect; run the library order only if it names a member of a `Compiler*` or `AnyType` component (3; replaces a wrong line).
- In: a `NoSuchMethodError` on a method of your own program is a defect, not a skipped step (3).
- Tool: `library-order.sh` would replace the five commands and the check of the five jars (3).

## session.md

- In: the Bash tool stops a call at 120 s unless it passes `timeout` (at most 600 s); a call to `wait_for` passes a `timeout` above 270 s (3).
- In: the tool refuses `sleep N` followed by another command (3).

## worktrees.md

No text change. Tools: `harness-one.sh` at a stable path would replace its path there; `probe.sh`, a runner for a probe (a small program that shows one behaviour), the four examples of the old code (3).

## toolchain.md

No change.

## interpreter.md

- In: `-debug interpreter` shows the Java stack of a walk crash (3).
- In: walk infers static arguments in `MakeInferenceSpecific`, with the bounds in `LatticeIntervalMap` and its dual (6).
- In: `interpreter/rewrite/` gives each name its lexical depth, kept in `interpreter_cache` (4, the row of C4 not yet in).

## compiler.md

- In: `bin/fortress compile -debug stacktrace P.fss` shows the Java stack of a checker crash (3, 6).
- In: after a failed compile, `fortress run` prints a misleading "Could not load ... Resource not found". Read the compile's error (3).
- In: array storage is decided as unboxed `double[]`, not built; the rest is open (2).
- Tool: `probe.sh` would replace the block in "Running" (3).

## library.md

- Cut: the decisions that `SKILL.md` states: the bound `Any`, a parameter that nothing fixes, the flat tower, the rule on conversions, the sizes. Keep ranges, wrapping, `SUM`, `ZZ64` to `RR64`.
- In: `fill` takes a value, `tabulate` a function (2).
- In: the desugarer's names `__loop` and `__whileCond`, beside the loops (6).

## specification.md

No change; the new part does not restate "Weighing the sources".

## revival-changes.md (new)

Its line in `SKILL.md`'s list, after the specification: "What the revival changed in the team's Fortress, each change with its contradiction and reason; load it when a team source, an old note or your training disagrees with this skill: `references/revival-changes.md`"

- In (1): the team's three sources (the specification, walk, the compiler) and the two reasons for a change: they contradict each other, or a program fails.
- In (1): the thirteen changes of part 6, each as the original, the resolution and the reason, grouped under the bold names of "Fortress as a language": dispatch 3, traits 2, static parameters 3, numbers 5.
- In (2): the inference rule for mixed number types (the narrowest type that all arguments convert into); `fill` and `tabulate`.
- In (1): what an old source or a model's training gets right about the team's walk: the tower, wrapping, no coercion.
- Cut from (1): the list of points, the unchanged points, the number-types example, the answers wrong for both.
- Out: each entry's provenance to `sources.md`; its update after every landing, to the `coordinator` skill.

## exploring.md

- In: step 1 also reads the new part if the question is a contradiction among the team's sources (1).
- In: step 7's row is one line in the template's form, checked with `ledger.py check --rows FILE` (5).

## tests-writing.md

- In: a walk test fails when `fail` or `FAIL` appears anywhere in its standard output or error, in a longer word too, except in `QuickCheckTest` (3; replaces a wrong line).
- In: `big` beside `even`, `numerator` and `shift` (3).
- In: "How a defect is recorded", item 3, for a defect that no program shows: reproducer `none`, the command and output in the notes (5).

## tests-running.md (the writer's trial)

It holds what (3) proposed for it. Nothing moves out. In only if the curator says yes to his held question: one `ant testSystem` after a library edit (3). Tools: `suite.sh` would replace the recipe for one track; `harness-one.sh` and `junit.sh` at a stable path, their paths and the notes on `climb-batch-N` and `env.sh` (3).

## gate.md

No text change. Tools: `ladder.sh` would replace the six steps of "To run it"; a sourced file of the gate's shell functions, the sentence that finds them in the workflow script (3).

## committing.md

No change.

## records.md

- Order (the curator found it reversed): what every report holds, with "At a point to report" and "Practices"; the record's files in `SKILL.md`'s order, the ledger last; reading; writing; the repository's history.
- In (5): seven statuses, with `FIXED` and `DUPLICATE`; the class as kind and area; a row of at most 1,200 characters; before you write a row, the template, read by its section with a `doc:` query (about 3 KB).
- In (5): writes only through `ledger.py` (`add`, `note`, `duplicate`, and `close` once the fix's commit is in `HEAD`); `check --rows FILE` before `add`; `find --cites FILE` before you edit a file.
- In (6): a trigger for each query, such as a decision's query (`positions:`) before you choose among ways (no worker of the last batch ran one).
- In (6): a report item for each command that you worked out and the skill lacks.
- In (2): the tag `sealed-tree`, the last commit before the revival edited the team's code: `git diff sealed-tree -- FILE`.
- Cut (5): "one row can be 12K characters", the ledger's size in tokens, "close a fixed row in place".

## Decisions not taken

1. A rule that the new part also explains: (a) the area part keeps the rule, the new part the original and the reason; (b) the new part holds it all. Default (a).
2. Changes with no contradiction behind them (story part 5, such as exact `QQ`): (a) out, by the part's terms; (b) in, as a list. Default (a).
3. "Reversed" in `records.md`: the order above, or reading before the files. Default: above.
4. Missing library jars, cured once by emptying the caches (3), against `SKILL.md`'s rule: (a) a symptom to report; (b) an exception. Default (a).
5. A command that the automatic check refused, split and run again (3): (a) keep `session.md`'s rule; (b) allow the split. Default (a).
6. A16's Java properties that show what the code generator does, read from the code, never run: (a) out until a worker runs each; (b) in now. Default (a).
