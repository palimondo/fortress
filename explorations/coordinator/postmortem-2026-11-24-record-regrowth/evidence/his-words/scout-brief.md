<!-- The brief of the Sonnet scouts that gather the curator's own words on the record, 2026-11-24, one scout per part of the coordinating session's transcript; evidence of the run, not a note. -->

# Scout brief: the curator's words on the record

You work in the Fortress revival repository, /home/user/fortress. Load the `fortress-repo` skill first (Skill tool). For the form of a session transcript, read the `cloud-container` skill's `references/container-loss.md`, its section on reading another session's transcript.

## Why

The curator, who directs this project, has said many times what the record file `explorations/coordinator/FACTS.md` is for and how it is kept. The coordinating session forgets his words at each compaction and makes him repeat them. His words today: "go and dig up all of my words related to that consolidation, to what the facts are for, to how they go to skill. Like, I hate repeating myself because of your amnesia." You fetch his words, exactly, so that the next brief is written from them. You judge nothing and summarize nothing.

## Your source

One part of the coordinating session's transcript, SOURCE below. The curator's messages are the lines of type `user` whose message content is a plain string, or a list with a `text` item that is not a tool result and does not start with `<` (a system notice, a task notification or an agent's message is not his). Each line has a `timestamp` in UTC. Read the transcript only with a script that prints what it selects; never print a file whole. First write to your scratch folder one file with every message of his in your part, each with its time; then search and read that file.

He writes by dictation, so words come out wrong. Read for the meaning: "fax" or "fact" for FACTS; "Fortress" as "WordPress"; "compact" as "contact"; "rung" as "rank"; "checker" as "Docker"; "skill" as "scale".

## What to fetch

Every message of his, or the part of one, that speaks of any of these:

1. What FACTS is for: what a fact is, who reads it, what it must let a reader do, what does not belong in it.
2. What belongs in FACTS against its history, a report, the gap ledger, POSITIONS, PLAN or a skill; the line between them; pointers between entries; repetition.
3. The length and the form of an entry: limits, clarity, examples, tests named in an entry, line numbers, counts.
4. The consolidation, compression or rewrite of the record: what he ordered, what he judged of a result (a page, a pilot, a trial), what he accepted and what he refused, and why.
5. How facts reach the worker skill `fortress-repo`: the orientation, the revival part, what the skill is for against the record, which is written from which.
6. What happens to the record when a batch lands: the landing, the commit stage, the record pass, the record-landing workflow, what it must do and what it failed to do.
7. Reading the record: the boot, facts read before positions, searching against reading whole, what a worker gets in its brief.

For each: the UTC time; his words, exactly, as long as the passage on the subject runs (cut only what is on another subject, and mark a cut with "[...]"); and one line, in your words, on what he was answering: the coordinator's proposal, page or report just before it, with its time. Where his message approves or refuses something by a short word ("yes", "1", "LGTM", "no"), quote the thing approved, in the coordinator's exact words.

Order them by time under the seven headings; a passage that fits two headings goes under the first, with a pointer from the second. Leave nothing out because it repeats an earlier message: the repetitions are part of the evidence.

Write the file `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/his-words/words-PART.md`, with a header comment whose first sentence says what the file is, and at its end the script that selected his messages and the count of messages that it read. Do not commit. Keep every wait under 240 seconds. Launch no agents.

Your final message, in at most five lines: the file's path, the number of his messages read, and the number of passages under each heading.
