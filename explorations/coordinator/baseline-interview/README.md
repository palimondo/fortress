<!-- The baseline interview: a setting and eighteen questions that a fresh session of a model answers with its default instincts for the coordinator's job (where it keeps the project's memory, what it does with a worker's report, how it talks to the curator on a phone, how it decides and delegates), run in a private namespace with no record, no skill and no tool, so that the `coordinator` skill can be written to hold only what the model would not do by itself; kept so that it is run again for each new model, Fable 5.1 and Opus 5.5 first, 2026-10-12, at the curator's word. -->

# The baseline interview

The `coordinator` skill is written on one principle, the curator's: it holds only what the model would not do by itself. What is specific to this project (the nine steps, test first under the sealed tree, the gate) and what is specific to this environment (the curator reads on a phone and dictates, the context is compacted, the container can be lost, the curator decides) go in. A rule that restates the model's own default is left out.

The baseline is what a model does by default. This kit finds it by interview, not by replay: a fresh session gets the setting and the questions, and nothing else, and answers with its instinct. An interview shows what a model says it would do, not what it does; the curator accepted that limit when he chose the method (POSITIONS, "The coordinator rewrite's goals").

## The files

- `setting.md`: the situation and the constraints the session is given. It names none of the record's files or terms, so that it does not prime the answer.
- `questions.md`: eighteen questions in four groups, memory and reports, talking to the curator, decisions, workers and runs. They follow the six groups of conduct rules in `process-engineering/coordinator-shape.md`, section 4.1, so that every rule can meet a default.
- `run.sh`: runs one model's interview. Its header says how the session is isolated.
- `answers/<model>.md`: each model's answers, verbatim, with the date, the Claude Code version and the effort at the top. The model is named by its version name, never by its identifier.

## How to run it

    explorations/coordinator/baseline-interview/run.sh fable /tmp/interview/fable
    explorations/coordinator/baseline-interview/run.sh opus  /tmp/interview/opus

The out-dir must lie outside `/home/user` and `/root`. Copy `answer.md` to `answers/<model>.md` with the header lines from `meta.txt`, the model's version name in place of its id. Each run writes under 0.1M tokens.

## How the answers are used

The conduct rules of the protocol and POSITIONS are sorted against the answers into three buckets: a default the model gives by itself (deleted), an environment rule (kept) and a project rule (kept). The skill is written from the two kept buckets.

## When to run it again

When a new model is to take the coordinating session, run the interview for it before the skill is adjusted, and keep its answers beside the others. The questions change only when the environment or the project changes what the coordinator must do; a changed question is run again for every model whose answers are kept.
