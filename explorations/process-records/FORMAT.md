# Process records: the common format

One record per run of the microGPT experiment, so that the runs can be compared on one basis later: how each explored this codebase, what it tried and dropped, what it delegated, what it cost, and what it found. A record is reconstructed from the run's transcript where one exists and from its committed files otherwise, by a worker that did not take part in the run. It records; it does not judge the result, which is the reviews' job.

Every record is one Markdown file in this directory, named `NN-<run>.md` in chronological order of the runs, one line per paragraph, with these sections in this order.

## Header

A table with exactly these rows.

| field | content |
|---|---|
| run | the run's name and the directory or files that hold its result |
| period | first and last timestamp of the run's work, from the transcript or the commits |
| strategy | one of: single long context; coordinator with delegated workers; external session without transcript; and a phrase saying how the work was split |
| models | the model of the main thread and of each kind of worker, as the transcript states them (never inferred) |
| delegations | how many, and to which model each; "none" if the run worked alone |
| tokens, main thread | output tokens and context tokens processed, summed over the run's assistant turns from the transcript's usage fields (output_tokens; input_tokens + cache_creation_input_tokens + cache_read_input_tokens), stated to two significant figures; "not recorded" where there is no transcript |
| tokens, workers | the same sums over the workers' transcripts, or the totals their completion notices report |
| wall time | from first to last timestamp, and the active span if the transcript shows idle gaps |
| gates | which quality gates or process rules the run's brief imposed, and which it applied |
| outcome | program path, its verification result in one line, article path, number of gap rows, and the run's own process files if any |
| sources | the transcript file(s) and commits the record was reconstructed from |

## Timeline

Numbered phases in order. Each phase is a short paragraph: when it started, its goal, what was tried, what failed with the error or symptom in a few words, what was decided and why, and the evidence pointer (a probe file, a commit, a report). A phase is a change of goal, not a change of file. Dead ends are phases too.

## Dead ends

A table: attempt | why it was dropped | evidence. Everything that was built or tried and did not reach the result, including spellings, designs, tools and briefs that were rewritten.

## Delegations

A table: # | task as briefed, in one line | model | tokens | what came back and where it lives now. Include the delegated reports recovered verbatim beside the probes they cite (see below). "None" if the run did not delegate.

## Gaps found

Where the run's gap table is, how many rows it has, and which of its rows were already in the merged ledger at the time and which were new. No re-verification here.

## Findings

Five to ten sentences on the character of the strategy as the transcript shows it: how the run navigated the specification and the library, where it lost time, what it got right early, how it used or ignored the prior work in the tree, and how the result relates to the effort. Observations with evidence, no praise, no model comparison.

## Recovered reports

When a run delegated, each worker's final report is committed verbatim as a Markdown file beside the probes it cites (for example `explorations/run-b2/probes/REPORT-g1abc.md`), with a two-line provenance comment at the top naming the run, the date, the worker's model as the transcript states it, and the transcript file it was recovered from. The record's Delegations table links to those files.
