# Run C, round two: the model core as Fortress

You are on branch `claude/worker-brief-fable-vnnuv8`, continuing Run C. Round one is in `explorations/run-c/` and it met its brief: every check passes at one and four threads. This brief is round two, on the same program. Read `CLAUDE.md` and `explorations/protocol.md` for the house rules; the sections below override them where they differ.

## What round one got and what it did not

The data side landed: one flat vector with nine views, the corpus as one matrix, keys, one-hot scatter-adds, masks as arithmetic, a pure step, Adam over three vectors. Keep all of it.

The compute side did not. `src/MicroGptFlat.fss` has 283 code lines, of which about 60 are the model. The rest is a float parser and a tokenizer, elementwise helpers that the library lacks, four row-wise functions each written with explicit `[i,j]` loops, and plumbing. The Dyalog's concision comes from writing `rmsn` once on a vector and lifting it with `⍤1`, and from primitives that are themselves formulas. Round one transliterated each primitive into an index-explicit helper and called the helpers in the Dyalog's order. That reads as APL vocabulary with Fortress loops inside. The Phase 1 review of round one, `explorations/reviews/run-c-phase1.md`, is on your reading list this time; its code-quality section is the punch list.

## The goal

The model reads as Fortress, corresponds line for line to the Dyalog and to the formulas, and still passes every check. Concretely:

1. **Three components.** `src/MicroGptFlat.fss` holds the model only: hyperparameters, the layout table, `step`, `adam`, the training loop. `src/FlatArrays.fss` (with its `.fsi`) holds the array vocabulary: the views, the elementwise algebra, the row lift, `gather`, `onehot`, the transpose operator. `src/FlatData.fss` holds the loaders, the float parser and the corpus. The check imports the model as before. Nothing outside `explorations/run-c/` changes.
2. **The row lift.** One operation, built once in the vocabulary, that applies a vector function to every row of a matrix and stacks the results, and its dyadic form for a pair of matrices row by row. Then `rmsn`, `sm`, `rmsn_b`, `sm_b` are written once at vector level with no subscripts, and every `⍤1` line of the Dyalog is one Fortress line. The technique is in `explorations/apl/base/AplCore.fss`: `AplRow` is a six-line view that is a real `Vector` and carries the whole vector algebra, and `aplRank1` is the lift over rows, its result rank decided by overloading on the first row's result. Read it for the technique; do not import it.
3. **Elementwise algebra as operators.** `×`, `÷`, `+`, `-`, `MAX` on vectors and matrices with scalar extension, and `SQRT`, `exp`, `log` elementwise, defined once as `opr` in the vocabulary. Comparisons on arrays may return 0/1 arrays, as the ledger's row 41 and the APL base's `opr >` show, so `(dX4 f2) × (m0 > 0)` is a line and `hadamard`, `scaleRows`, `positive` are not needed. Prefer a library operator wherever one exists (`DOT`, `pmul`, `scale`, `.t()`); the review lists a hand-written `/` where `scale` existed.
4. **No subscripts in the model.** `MicroGptFlat.fss` should contain no `[i,j]` or `[i]` subscript except in the layout table and the two head loops' block views. Count them and report the count.
5. **A line budget, reported.** Code lines per component before and after (blank and comment-only lines excluded). The model is targeted at twice the Dyalog's 25 lines, which is the honest price of explicit backward. Where a line cannot shrink, name the Fortress limit that stops it, with a ledger row or a new gap row.
6. **The guided tour.** `explorations/run-c/tour.md` and a self-contained `tour.html`: for each line of the Dyalog (in the order of `design.md`'s line-for-line table, the helper dfns included), three columns: the formula in TeX, the Dyalog line, the Fortress line or lines rendered by Fortify as SVG, and a note of at most two sentences where they differ. A table of correspondences, not an essay. The correspondence is the by-eye test of the goal above: if a Fortress line does not read beside its formula and its Dyalog, that line is not done.

Rendering: `bin/fortick` turns a `.tic` file with backtick-quoted Fortress into `.tex`; `TEXINPUTS=".:$FORTRESS_HOME/Fortify:" latex -interaction=nonstopmode` produces the `.dvi`; `dvisvgm --no-fonts --exact-bbox` the SVG. `Fortify/fortify-doc.txt` documents the notation, and `experiment/setup.sh`'s render stage runs the pipeline once on a one-line excerpt so you have a working example. Multi-line definitions render better as several short lines than as one long one; if a line does not render, say so in the note and show the ASCII.

## Alternatives before committing

Do not claim a form after the first one that works. Three places have materially different designs, and each is to be tried in at least two forms on a small probe, rendered, and compared side by side with its formula and its Dyalog line before the program is rewritten:

- **The row lift.** At least two of: a function that applies a vector function to each row view and stacks the results, deciding the result rank by overloading on the first row's result (the APL base's way); a generator of row views consumed by a comprehension or a `BIG` operator, with a builder that stacks; a `for` over rows writing into a preallocated matrix. Judge by how `rmsn` and `sm` read once lifted, and by what the four-thread run does to each.
- **The elementwise algebra.** Operators declared on the shipped `Vector`/`Matrix` families with scalar extension, against a thin wrapper type of your own that carries the algebra. Judge by whether a formula such as the Adam update or the softmax reads as the formula, and by what each costs in declarations.
- **The attention block.** The head loop over block views as in round one, against a form that makes the per-head cells values (a rank-3 array per document, or a tuple of head matrices) and applies the products to them. Judge by how close `A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5` gets to one line, and by whether anything is copied.

Keep the probes in `probes/` with their outputs and renders. Record the rejected form of each in `design.md`'s round-two section with the reason, in a sentence or two. Bounded: probes of a few lines each, not two programs.

## Standard of success

Unchanged from round one, and re-run after the rewrite: `src/MicroGptFlatCheck.fss` with every line PASS at `FORTRESS_THREADS=1` and at 4, outputs saved as `checks/round2_threads1.txt` and `checks/round2_threads4.txt`. Add to the check an aggregate verdict line and a non-zero exit on any FAIL, which round one lacked. The goldens do not change.

## Reading

Allowed, in addition to round one's list: `explorations/reviews/run-c-phase1.md`; `explorations/apl/base/AplCore.fss` and `.fsi` (the row view and the lift; the elementwise operator families with scalar extension); `explorations/fortress-gap-ledger.md`, now 154 rows including round one's; `Fortify/fortify-doc.txt`.

Still excluded, by instruction: `explorations/run-b`, `run-b2`, `blinded-fable`, `astra`, `notation-collaboration`, every other file under `reviews/`, `process-records/`, `microgpt-run-b-handover.md`, `microgpt-port.md`, `compiled-path-gaps.md`, transcripts; no `git log`, `show` or `diff` of history. Report any exposure in `design.md`.

## Deliverables

Under `explorations/run-c/`: the three components and the check in `src/`; the two new check outputs in `checks/`; `tour.md` and `tour.html`; `design.md` gains a "Round two" section (what changed and why, the line budget before and after, the subscript count, what the language gave and what had to be built this time, blinding); `gaps.md` continues from row 156 in the ledger's format with reproducers in `probes/`; `README.md` updated. Round one's sources stay in history; the tree carries round two.

## Process

Turn 1 is environment setup and nothing else: `bash experiment/setup.sh` in the background, report each `STAGE` line, paste the summary block verbatim, stop, and wait for the go. The render stage is back, since the tour needs it. Then work without stopping until the standard of success and the deliverables are met. Commit as you go on this branch and `git push -u origin claude/worker-brief-fable-vnnuv8` after each commit; never push to another branch; open no pull request. Every commit message ends with exactly these two footer lines, the second carrying the URL of your own session:

    Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
    Claude-Session: <your session URL>

No model identifier anywhere else in files. Delegate only mechanical work such as re-running the check; the point is one focused context. Round one took 50 minutes; the alternatives add to that; the check alone takes about 15 at one thread and 6 at four, so run it in the background while you write the tour.
