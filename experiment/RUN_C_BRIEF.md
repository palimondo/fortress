# Run C: microGPT in native Fortress arrays, data designed after Hsu

You are on branch `claude/worker-brief-fable-vnnuv8`, the branch of the blinded microGPT experiment and of Run B, brought up to the work branch by a merge; your context was cleared before this assignment. This brief is your whole assignment for Run C. Run C is a different program from Run B: a different data layout, no autograd, no article. Do not reuse Run B's design or code, and treat your memory of it the way the blinding section below treats the files: as something not to draw on. Where Run B's library facts help, they are in the gap ledger, which is on the reading list. Read `CLAUDE.md` and `explorations/protocol.md` for the house rules on tone and commits; the sections below override them where they differ.

Mission: write Karpathy's microGPT in native Fortress arrays, with the data laid out after Aaron Hsu's talk "Designing Your Data" (Functional Conf 2025), following the Dyalog program `explorations/apl/reference/hsu-flat/microgpt_concise.dyalog` line for line where Fortress allows it. The interpreter path only (`./bin/fortress FILE.fss`). Do not change the historical language, compiler, runtime or shipped library; everything you need beyond them is user-level code in your own component.

The layout is fixed. These are constraints, not suggestions.

- The parameters are one flat `RR64` vector of 4192 values, in the order wte, wpe, lm_head, attn_wq, attn_wk, attn_wv, attn_wo, mlp_fc1, mlp_fc2, each matrix row-major; offsets and shapes are in `experiment/run-c-goldens/goldens.json` under `layout`.
- The nine weight matrices are zero-copy `Matrix` views over slices of that vector, made when needed and never stored.
- The corpus is one integer matrix of documents by 17 positions plus a length vector, built once from `explorations/apl/reference/dzaima/docs.txt`, BOS-padded (BOS is token 26, before and after the name and in every unused slot; a row is `BOS name BOS BOS…`). A batch is a row selection.
- One pure `STEP` function from a batch key vector to (loss, flat gradient). The backward pass is written out line for line under its forward line. There is no autograd graph, no `Value` object, no activation cache.
- The validity mask over (document, position) and the causal mask are arithmetic: the causal mask an additive matrix, the validity mask multiplied into the loss and its gradient.
- The scatter-adds into the two embeddings are one-hot products: token ids and position ids are key vectors, and `gWTE = onehot(ids)^T dX`, `gWPE = onehot(pos)^T dX`.
- Adam is whole-vector expressions over flat state `P`, `M`, `V`, replaced each step; the only persistent state.
- Rank 4 for batch × heads × positions × head-dim is your call. Either loop over documents and heads with `Matrix` views of the (doc·pos × 16) activations, or write a small `Array4` object modelled on the shipped `Array3` (`Library/FortressLibrary.fss` around line 2662; the shipped library stops at rank 3, and `Array3` is a full member of rank dispatch beside `Vector` and `Matrix`). Record the choice and its reasons in `design.md`.

Standard of success, all against `experiment/run-c-goldens/goldens.json` (its `README.md` says how it was produced), at `FORTRESS_THREADS=1` and again at `FORTRESS_THREADS=4`:

- Batch 1, five training steps from the committed weights on documents 0..4, learning-rate schedule length 1000: losses `3.365966947584851 3.424272783871772 3.177802125458053 3.066355684224198 3.2208830897506235`, each within 1e-12 or better.
- Batch 4 on documents 0..3 from the initial weights: loss `3.28664155669517`, equal to the token-weighted mean of the four single-document losses (weights are the document lengths in the goldens), to 1e-12.
- Step 0 at batch 1: the full flat gradient against the 4192 golden values, and the parameter vector after the first Adam step against the golden `parameters_after_adam`; report the max absolute difference, expected around 1e-15.
- Finite differences at the eleven golden indices of the flat vector, central difference with eps 1e-6 on your own loss, agreeing with your gradient to about 1e-8 (the reference reaches 4e-10).
- The check component prints one line per check with the measured difference and PASS or FAIL; the outputs at 1 and 4 threads are committed under `checks/`.

Read these before writing code, in this order.

- `explorations/apl/reference/hsu-flat/HANDOVER-HSU.md`: the tactics table, which says where each of Hsu's tactics landed in the code.
- `explorations/apl/reference/hsu-flat/microgpt_concise.dyalog`: the spec, 25 lines, unverified; the program you are translating.
- `explorations/apl/reference/hsu-flat/microgpt_flat.apl` and `microgpt_flat.py`: the verified executable references for the same layout; the Python has the backward pass in the plainest form. Do not run the Python; the goldens already come from it.
- `explorations/fortress-gap-ledger.md`: 139 rows of known traps of the walk interpreter, each with a reproducer and a workaround. Every hour of the previous microGPT runs went to rediscovering what is in it. Read sections 1, 3, 4, 6, 7 and 15 in full before your first probe; consult the rest when something fails.
- `explorations/repo-internals.md` and `CLAUDE.md`: build, run, the library caches and when to wipe them.
- `explorations/apl/base/AplCore.fss` and `AplCore.fsi`: a worked example of view objects over runtime-sized arrays that are real `Vector` and `Matrix` values (`AplRow`, `AplCol`, `AplPlane`, `AplPerm102`: six lines each), and of overloading on rank (`Vector`, `Matrix`, `Array3` as parameter types). Read for the technique; do not import it.

Blinding by instruction. Prior microGPT-in-Fortress work exists in this checkout and in history. Do not open `explorations/run-b`, `run-b2`, `blinded-fable`, `astra`, `notation-collaboration`, `reviews`, `process-records`, `explorations/microgpt-run-b-handover.md`, `microgpt-port.md`, `compiled-path-gaps.md`, or any transcripts. Do not use `git log`, `git show`, `git diff` or any other look at history, and do not fetch or check out other branches. Do not retrieve prior published pages about Fortress microGPT work. If you are exposed to any of it by accident, say so in `design.md`, with what you saw. Everything else in the checkout is open: `Specification/`, `Library/`, `ProjectFortress/`, the APL reference material, the ledger and its probes.

Deliverables, all under `explorations/run-c/`:

- `src/`: the program as one component, plus a check component that runs the standard of success.
- `checks/`: the check outputs at 1 and 4 threads, as committed text files.
- `design.md`: the layout decisions, the rank-4 choice, what the language gave and what had to be built, and any accidental exposure.
- `gaps.md`: new rows in the ledger's column format (`#`, claim, status, class, spec citation, reproducer, found by, notes / workaround), numbered from 140 upward, with a runnable reproducer for each; rows that only repeat a ledger row are cited by number, not rewritten.
- `README.md`: how to run the program and the checks.

No article, no Fortify rendering, no figures. The process record is written later from the transcript, so keep the transcript informative: say what you tried and what you saw.

Turn 1 is environment setup and nothing else. Run `bash experiment/setup.sh` in the background (the same script as Run B; its render stage is harmless here); it installs packages, builds if the build is absent, warms the library caches and arms the transcript archive, and prints a `STAGE <name>: START/OK/FAIL` line per stage with details in `experiment/setup.log`. Report each stage line as it appears, paste the summary block after `---- setup summary ----` verbatim, and stop. Wait for the coordinator to reply that the environment is verified. If a stage is FAIL, report `tail -40 experiment/setup.log` and stop; do not repair the environment yourself. After the go-ahead, `source experiment/env.sh` in every shell that runs Fortress; it sets `FORTRESS_THREADS=1` and a larger Java heap. The 4-thread checks are `FORTRESS_THREADS=4 ./bin/fortress …`. The component name must equal the file name without `.fss`.

Commit as you go on branch `claude/worker-brief-fable-vnnuv8` and `git push -u origin claude/worker-brief-fable-vnnuv8` after each commit; never push to another branch and open no pull request. Every commit message ends with exactly these two footer lines, the second carrying the URL of your own session:

```
Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_…
```

No model identifier appears anywhere else in any file. No self-praise in committed prose.

Delegation is allowed, but the point of this run is one focused context that holds the whole program in view. Delegate only mechanical work, such as re-running the checks at 4 threads, and give any worker this brief's blinding paragraph verbatim.

Keep executions bounded: five steps, batches of at most four, no training runs. Stop when the standard of success is met at both thread counts and the deliverables are committed and pushed. Do not go on to sampling, more layers or speed work.

Budget note: the earlier blinded run took about 95 minutes and 1.5 million output tokens, and it wrote an article. This run has no article.
