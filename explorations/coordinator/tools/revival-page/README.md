# The revival page's update at a landing

`update.py` keeps the block "Where it stands" of the revival page current, with no prose written by hand. The page's text is `explorations/coordinator/process-engineering/revival-story.md` and its rendered page `revival-story.html` beside it. In both, the block sits between `<!-- stand:begin -->` and `<!-- stand:end -->`, in a fixed form: a bold heading line naming the landing's batch and date, then seven bullets (Phase, Checker count, Distance, Native bindings that both implementations can call, microGPT under the interpreter, microGPT on the compiler, Next). The script changes only the values; the words around them are the form's.

Run from the repository root:

    python3 explorations/coordinator/tools/revival-page/update.py --check          # print the values and the block; change no file
    python3 explorations/coordinator/tools/revival-page/update.py                  # rewrite the block, add the chart's row, regenerate the chart
    python3 explorations/coordinator/tools/revival-page/update.py --landing 26 --run-start 2026-11-06T09:12

- `--check` reads the values, prints them with their sources and the block in the Markdown form, says for each file whether its block is the same word for word, and gives the alt text's last day beside the data's. It writes nothing.
- `--landing N` names the batch; by default, the last landed batch that PLAN names. For a batch that is not PLAN's last, the count and the distance come from its gate summary alone, and the phase and the native bindings are today's.
- `--run-start` gives the run start of a landing that `landings.csv` does not hold yet: `YYYY-MM-DDTHH:MM` (UTC), the first line of the run's first agent in its transcripts, as the other rows have it; or `base`, the time of the base commit that the batch's gather record names, a proxy that the row's note then states. Without it, a missing row stops the script.

A real run rewrites the block in both files (the HTML's heading and bullets keep their tags: `<p><strong>`, `<ul>`, `<li><strong>Label:</strong>`), adds the landing's row to `process-engineering/record-growth/landings.csv` if it is missing, runs `record-growth/measure.py` and then `chart.py` (`record-growth/README.md`), sets the end of the date range in the alt text of the HTML's chart, "commit by commit from 09-08 to MM-DD", to the last day of `series.csv` (the day the chart's title ends with) and leaves the rest of the alt text as it is, and prints what changed and the two steps for the coordinator: the commit of the page's two files, `landings.csv` and `record-growth.png`, named; and the page's republish with the Artifact tool, `revival-story.html` with `record-growth.png` as its supporting file, to the page's URL (`PAGE_URL` in the script). `measure.py` also rewrites its five data files (`series.csv`, `changes.csv`, `by-day.csv`, `top-additions.csv`, `per-batch.csv`); the printed note names them for the same commit. The script does not commit and does not publish.

## Where each value comes from

| Value | Source | Read |
|---|---|---|
| The landed batch | `explorations/coordinator/PLAN.md`, "Where we stand", the live thread: "At the last landed gate, climb batch N's (`commit`)" | or `--landing` |
| Its commit and date | PLAN.md, the batch's line under its phase: "**Climb batch N**, phase P's ... batch, landed YYYY-MM-DD at `commit`" | checked against the live thread's commit; `git show -s` of the commit, whose UTC date must be the line's; `git show --name-only` of it must record the batch's gate summary |
| The phase, its end | PLAN.md, the live thread: "Phase P, the switch-over:" | |
| Of how many phases | PLAN.md, the highest `### Phase N.` heading | |
| Since when | PLAN.md, the phase's first batch line: "phase P's first batch, landed YYYY-MM-DD" | |
| Checker count | `explorations/compile-ladder/climb-batch-N/gate/summary.txt`, the line `# checker COUNT ...`, its last number | must equal the live thread's "the checker count C" |
| Distance | the same summary, the line `# distance DISTANCE ...`, its last number | must equal the live thread's "the distance is D" |
| Its one open reading | PLAN.md, phase 3: "The zero over the fourteen rests on one reading he has not confirmed" | |
| Native bindings, "N of 449" | FACTS, `explorations/coordinator/tools/facts-extract.sh 'F-299'`, the entry's headline sentence: "... and N of the one library's T live bindings name one." | N plus the entry's "the other M name glue classes" must make T |
| microGPT under the interpreter | the summary's two `# microgpt-walk VERDICT:` lines and two `rc=` lines (the quick pair, flat then APL, `tools/mg-run.sh`) | both must read "K PASS, 0 FAIL of K -- ALL PASS" with rc 0 |
| microGPT on the compiler | PLAN.md, "Where we stand", the runs: "On the compiled path microGPT's ... components stop at name resolution until the switch-over" | |
| Next | the landed batch's number plus one | PLAN's line for that batch, while not landed, must still name the natives and the code generator |

## When it stops

Each source is parsed by its present form. Where a sentence is missing, appears twice, or reads otherwise, the script names the source and the form it expected, and stops with exit code 2, writing nothing; it does not guess. It stops too where the values call for words the block's form does not have: a quick check that fails, a distance other than 0, more than one open reading, PLAN's next batch no longer about the natives and the code generator, a block in either file that is no longer the heading and the seven labelled bullets, or an HTML page without exactly one `<img src="record-growth.png">` whose alt text reads "commit by commit from MM-DD to MM-DD". Then the form is a new decision, and this script changes with it.

## Git reads

Every git read names its commit or its range: `git rev-parse --show-toplevel`, `git show -s` and `git show --name-only` of the landing commit, and `git show -s` of a gather record's base. `measure.py`'s reads are bounded as `record-growth/README.md`, "Method and limits", says.
