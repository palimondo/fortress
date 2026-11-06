# Judgement, chunk c29 (run c-run3, base c124c6b65)

Read: `assessment.md`, `rows.rewrite`, `closes.txt`, `dups.txt`, `questions.md`, `pairs.txt`, `silent.txt`, `cold-read.md`, `mech.md`, `check.md`, `evidence/*.md`. No prober folder exists for c-run3, so row 184's question is unmeasured. Each correction below is the check's, made from its cited source; the sources of rows 18, 108 and 641 were reopened (`git show e879b6a44^:explorations/alias-units-probes/p2_alias_minimal.fss`, `explorations/aliases-units-report.md:97-101`; `git log --diff-filter=D` of the `run-b2` probes gives `22ea0cd90`, and `22ea0cd90^:explorations/run-b2/probes/g1d_hcat.fss` defines `hsplit` by `fill` over an index map; `VarCodeGen.java` at the base: `MutableFieldVar` at `:202`, `MutableStaticBinding` at `:310` with `inATransaction` at `:331`, `:362`, `MutableTaskVarCodeGen` at `:609`).

- **18: apply, corrected.** Probe `p1_alias_basic.fss` replaced by `p2_alias_minimal.fss`, the program `type Idx = ZZ32` whose `:8.1` stop the report's lines 97-101 give (check, row 18).
- **26: apply, corrected.** q8 attached to walk's `TaggedDimType` message; the trailing probe sentence became "All three probes in the parent of `e879b6a44`." (check, row 26).
- **156: apply, corrected.** Workaround rewritten so it stands without the deleted probe: "pass a plain function, declared over runtime-sized `Array[\RR64,ZZ32\]` rather than `nat`-generic, to a receiver with an arrow-typed parameter (row 171)" (check, row 156).
- **396: apply** as written; the check passes it.
- **471: apply, corrected.** "stops so at" became "stops too, at" (check, row 471).
- **506: apply, corrected.** The cap's arithmetic made explicit: each such parameter has nine choices (none, the numeral's type, its seven targets), so two exceed the cap (`Functionals.scala:350-370`, check, row 506).
- **507: apply** as written; the check passes it.
- **758: apply, corrected.** "No gated test: the refusal is a crash." replaced by "No test in the tree; the command is `bin/fortress typecheck` on the two declarations and the call." (`references/tests-writing.md:75`, check, row 758).
- **165: apply, corrected.** Workaround `fn (w, r) => w r` became `fn (p, q) => p × q` (the working probe `lift_g3c.fss`); "an implementation gap (walk)" restored after walk's crash; probe sentence shortened as the check gives, to stay within 700.
- **108: apply, corrected.** Workaround: "build each block with `tabulate` (or `fill`) over an index map, as `explorations/run-b2/probes/g1d_hcat.fss` does" (the check's text less "by hand", cut for the 700-character notes limit: the line was 702); the `run-b2` probes placed "in the parent of `22ea0cd90`", their deleting commit.
- **641: apply, corrected.** Claim narrowed to "a mutable local or top-level variable"; notes give `:620-726` as a local captured by a task, add `:326-362` (a top-level `var`) and say a mutable field (`MutableFieldVar`, `:202-236`) has no check (check, row 641).
- **184: hold.** A measure: the row was verified only on the retired first library inside an `apl⦇ ⦈` expansion, and no prober ran `questions.md`'s program on the present tree. The check passes the question. The row keeps its line; queue item filed.

Duplicates, closes, pairs: none (the assessment found none; the check agrees). Silent: row 184's `defect` kept in `final.silent` (a walk internal-bug stop where a dispatch error belongs).

Counts: 11 applied, 1 held.
