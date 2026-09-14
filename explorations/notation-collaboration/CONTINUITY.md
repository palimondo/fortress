# Continuity and evidence — separate from the notation argument

Status, 2026-09-11: the discussion is recorded; main has been inspected at `3cbbc8672a197279d72565db23986d9cc0f237d9`; the focused executable probe passed; two Fortify figures were generated and visually inspected. This directory is the contribution prepared for publication on main. Git history supplies the publication commit and date.

## Resume without pretending to remember

1. Read [QUESTIONS.md](QUESTIONS.md) for Pavol's scope and corrections, then [README.md](README.md) and [DISCUSSION.md](DISCUSSION.md).
2. Check the live remote main tip. The checkout initially had a stale `origin/main`, and its fetch refspec updated only the Fable working branch. A plain fetch was not sufficient evidence of main's state. The inspected GitHub main tip was confirmed separately.
3. Read the exact source or ledger row before making a claim about it. Label new observations separately from inherited reports. If the summary omits an implementation, recover the file before characterizing it.
4. The next substantive discussion is a comparison of existing RMS-normalization formulations, with representation, effects, numerical assumptions, source and actual rendering kept together. No new full-model training run or independent implementation was requested here.

The user explicitly requested this contribution to main and informed comparison with Fable's work. Old experimental blindness instructions describe the earlier experiment; they do not prohibit this later comparison. This contribution does not strengthen any claim that the earlier experiment was technically isolated. Pavol will arrange the handoff to Fable; no message was sent to another person.

## What was actually recovered and inspected

- Root `CLAUDE.md`, `explorations/protocol.md`, exploration index, repo-internals account, and the 139-claim gap ledger.
- All eight process-record files for the implementation sequence, plus selected implementation, review and probe-report sections relevant to traits, numerical carriers, rendering, contracts and AD structure. These reads did **not** constitute a fresh audit of every raw session transcript, every probe, or every line of each implementation.
- Actual `FortressLibrary.fss` definitions of numeric traits, reduction machinery, matrix multiplication, and transpose views; actual Fortify tokenizer/idiom/subscript/fraction paths.
- The supplied Sol handoff's files 00, 01, 03, 04 and 05. File 02 was intentionally skipped. The unchanged framework copy has a hash in [provenance.json](provenance.json).
- The newly generated PNG figures, visually inspected alongside their exact source excerpts.

A prior source lookup should not be described as current retained knowledge if only its summary remains. Missing detail can result in loss of grounding; an additional, avoidable failure is expressing an unchecked repository inference as an observed fact. This checkpoint records what to retrieve and which claims have evidence. It does not diagnose the internal cause of any specific context loss.

## Fresh verification versus inherited evidence

**Fresh:** [NotationViews.fss](NotationViews.fss) ran on the existing Astra interpreter build with one thread and a 35-second timeout. [run.json](evidence/run.json) contains UTC start, exact command, working directory, elapsed time, exit status and hashes; [run.out.txt](evidence/run.out.txt) contains actual combined output. It verifies shared input objects for product/indexed forms, different meanings for identifier/access subscripts, the tested access-spacing variant, and transpose aliasing.

**Fresh failure, retained:** `attempt-01.*` records the rejected `x_1` spelling. It was changed to a separate index `i` and identifier `x_i`; the successful source is preserved separately. We have not promoted this parser observation into a specification claim.

**Environment recovery:** the former temporary JDK was absent, and system JDK 17 could not load classes from the existing JDK 25 build. A cached JDK archive was restored under `/tmp/fortress-notation-jdk`; cached rendering packages restored Emacs/dvisvgm. No Fortress rebuild or full regression suite was run. The two launch failures are retained as `launch-*.out.txt` and are not language failures. The main and built checkout copies of `Library/FortressLibrary.fss`, `Fortify/fortify.el`, `Fortify/fortify.sty`, and `bin/fortick` were byte-identical.

**Inherited:** the ledger's 139 statuses, prior microGPT numerical comparisons, prior visual rankings, AD cost measurements, and APL probe results. They remain evidence from those artifacts, not tests rerun here.

This is an edited decision record plus selected command evidence. It is **not** a full conversation export, JSONL session transcript, file-access audit, or private reasoning trace. It improves resumption without pretending to reproduce unavailable records.

## Reproduction

From an already built Fortress checkout, with a compatible JDK configured:

```sh
python explorations/notation-collaboration/reproduce.py --fortress-root .
```

For rendering, configure a working Emacs via `USE_EMACS`, the TeX dependencies and `dvisvgm`, then add `--render`. The helper uses the current repository's Fortify and produces `.tic`, `.tex`, SVG and PNG. It can point `--fortress-root` at the existing separate build while keeping this source in main. It does not install dependencies, build Fortress, or train a model. Reproduction replaces this directory's run evidence with the new local run; inspect changes before committing.

## Publication interruption and recovery

The first upload was interrupted by an automatic-approval usage limit, before either PNG was uploaded or main was updated. On resumption, the scratch checkout had reverted to the earlier Fable snapshot and the new local directory was absent. The successful text/SVG tree upload survived on GitHub as `cc145719ebfb09557f647302532be979e8a88bf4`. A recovery commit, `047b41fbd137c8be11879b42345d6e6617b274a0`, made that exact partial tree fetchable. This recovered the documents and original run records without reconstructing them from prose.

Meanwhile main advanced to `30c26a4af5fd78e38b11e99ae0b7e8613f541eea`. The contribution was integrated on top of that revision, preserving the intervening work. PNGs were regenerated from the recovered TeX and checked against the hashes recorded before interruption. The interpreter probe was not rerun; its original successful output and timestamps were recovered unchanged. Publication therefore distinguishes recovery of existing evidence from a new experiment.

## Revised evaluation proposal

At Pavol’s subsequent request, `ASTRA-EVALUATION.md` revisits Sol’s proposal using the numerical trait definitions, Fable’s inherited scalar arithmetic, Astra’s custom reduction/carriers, and Run B/B2 row-normalization choices. It distinguishes algebraic fit, semantic support, faithful presentation, abstraction/recoverability, compositional reach, and operational adequacy. It includes source-derived judgments and inherited experiment evidence; no new runtime or benchmark claim is made. Read it as the current evaluation proposal; Sol’s original remains unchanged.
