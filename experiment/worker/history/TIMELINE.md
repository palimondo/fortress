# How the Astra microGPT solution emerged

This is a reconstruction of observable work, not a recovered session transcript. The saved trail supports a plausible, technically connected development history: small language probes, unsuccessful abstractions, working fallbacks, revised implementations, independent numerical checks, and late comparisons of mathematical notation. It does not establish what every worker read or exclude an unrecorded influence from Fable.

“Astra” here means the lead and its delegated workers across several resumed contexts. The coordinator supplied the built interpreter, rendering tools, task brief and recovery support. Those were inputs to the experiment, not accomplishments independently rediscovered by the implementation worker.

## How to read the evidence

- **Recorded:** a timestamped command and its actual local output. An exit of zero establishes only what that command exercised.
- **Source-supported:** preserved code or a failed-source copy explains a change, but may lack a contemporaneous timestamp.
- **Reported:** a milestone or worker note says a decision or visual inspection occurred. This is weaker than an independently audited action.
- **Inferred:** the connection between an observed result and a later design is my reconstruction. It is identified where the record does not directly establish it.

The appendix contains **83 command records: 41 exit-zero, 41 nonzero, and one unknown**. These include build, environment and rendering commands, not just implementation attempts. They are not a model success-rate measure. **18 runs retain source snapshots, and all 18 match their recorded SHA-256 hashes.** Snapshotting begins on September 8; early runs usually refer to mutable source paths. File modification times and later Git commits are not used to date their original edits.

All dates below are **UTC, September 7–8, 2026**. Parallel work overlaps. Gaps between recorded clusters include recovery interruptions; they cannot be counted as hours of active work. Exact edit and file-read histories are unavailable.

## Chronological map

| Recorded interval | What happened | What it established or changed |
|---|---|---|
| Sep 7, 00:13–00:27 | Coordinator established the build, interpreter smoke test and regression baseline. One purported smoke exited zero while using the wrong command; a later real interpreter run succeeded. | A usable historical environment, with no language/runtime modifications for the demo. Exit-zero alone is demonstrably insufficient evidence. |
| 01:45–01:47 | Early SUM, juxtaposition, generic-reduction, vector and AD probes ran in overlapping lanes. SUM/juxtaposition probes printed concrete results. Generic reduction needed a correction. Vector construction hit a spacing/precedence mismatch and an unavailable `asFloat` method. Initial AD versions failed syntax checks. | Local experiments in the actual language precede the integrated model. Whitespace and numeric conversion become implementation constraints. |
| 05:55–06:02 | Resumed work developed the model candidate while notation and AD workers continued. Five candidate iterations failed; the sixth printed two scalar smoke results. Ordinary local AD SUM still collided with an imported overload. Generator-argument SUM and named generic summation worked. | A small algebraic candidate was executable, but there was no full forward-model pass yet. Working noncanonical SUM alternatives existed while the desired spelling remained unresolved. |
| 05:59 | A custom-scalar `Vector` construction unexpectedly succeeded, but built-in SUM over that scalar failed with a numeric cast. Notes connected these results to the closed Number hierarchy and library bounds. | Accepted construction did not imply a usable differentiable numerical library. The final code uses user-level eager Vec/Mat containers without changing Number. |
| 06:00–06:02 | End-to-end Fortify rendering became usable. The first complete forward attempt still failed. | Rendering infrastructure was supplied during the experiment. The record does not support a claim that all early designs were visually evaluated before being written. |
| 20:30–20:31 | The forward model failed again at chained subscripting. Binding the matrix row before indexing repaired it. | Nine logits and the mean loss matched the reference, with maximum absolute difference about 5.55e−17. This was explicitly a forward-only gate. |
| Later Sep 7; exact time unrecorded | Notation notes describe successful `except { opr BIG + }`, ordinary local SUM, BIG MAXNUM and DOT probes. Outputs and rendered figures survive. | The apparent SUM limitation was revised to an import collision. The final model retains sigma notation, numeric max-shifting, and an explicit vector dot. Notes place these results before integration; there is no precise timestamp for the decisive SUM/DOT calls. |
| 20:33–20:36 | The replacement AD graph probe hit fill/API, assertion, conversion and postfix-indexing failures, then passed analytic derivatives and repeated gradients. Shared-diamond and 8,191-node tree stress cases also passed. | A graph traversal replaced recursive propagation per path. The shared-diamond test specifically addresses the earlier algorithm’s exponential work on shared expressions. |
| 20:36–20:38 | Three integrated attempts failed. Run 03 printed the forward trace and correct loss, then failed at backpropagation. | Independently working pieces had not yet produced a working training step. The last failure became the next recovery point. |
| Sep 8, 04:15–04:17 | A short forward checkpoint passed. Integration run 04 fixed a split `+ =` operator and reached Adam; run 05 changed the exponent but still failed. Run 06 parenthesized the indexed base `(g[i])^2.0`. | Run 06 completed in 4.438 seconds. Complete conversion and reference validation are reported, with all 228 gradients and updates, attention, loss and generation retained in actual.json. |
| 04:18 | A combined alternative used inverse-power RMS scaling and transposed-matrix attention. | It also passed the full fixture. This tests a real alternative program, but does not isolate the two alterations in a factorial comparison or establish a timing advantage. |
| 04:19–04:21 | Comparison rendering initially failed because the extraction helper had a syntax error and the inputs were absent. After repair, RMS and attention panels rendered. The RMS caption was split to fit. Twelve final panels were generated. | Actual executable excerpts—not substituted equations—became the visual evidence. The report says the alternatives were inspected before final selection. One reduction-panel command record remained incomplete despite a render log and image being present. |
| After the final rendering cluster; no exact draft timestamp | Article, reproduction guide and source inventory were saved. Later HTML presentation and GitHub packaging were coordinator work. | Delivery work followed the numerical/design experiment. Those later commits are not an original edit-by-edit history. |

## The decisions that shaped the result

### 1. Ordinary summation was recovered, not assumed to work

The clearest exploration chain is **ordinary SUM fails → working fallbacks → import exclusion succeeds → ordinary sigma retained**. The initial failure reported an overload collision between local and prelude zero-argument operators. One-argument SUM over a generator and a named generic sum gave correct value/derivative outputs. The later successful exclusion used `opr BIG +`; attempts to exclude `SUM` by other spellings failed parsing. The retained renderings distinguish the alternatives: the generator argument appears beside sigma, the named operator renders as a word, and ordinary SUM gets bounds below sigma.

This is evidence of a revised interpretation, rather than the final answer simply being asserted. It does not prove that the successful import spelling was discovered without outside influence. Sources: [notation investigation](../notation/NOTES.md), [successful source](../notation/NotationExceptSum.fss), and the timestamped failed/fallback runs below.

### 2. Library acceptance was distinguished from useful semantics

The Number-bound probe was not the clean negative test expected: the interpreter accepted a custom-scalar vector. The built-in reduction then failed at runtime with a cast to Number. Notes also identify the API’s closed `Number comprises { RR64 }` hierarchy and Number bounds on shipped containers. The final program therefore supplies its own eager containers while preserving familiar mathematical operations. The causal link is supported by the notes and code; the exact moment Vec/Mat was selected cannot be dated from a snapshot.

### 3. Reverse differentiation changed algorithm, not just syntax

The surviving old [AutodiffProbe](../autodiff/AutodiffProbe.fss) recursively pushes contributions down every parent path. On a heavily shared graph, that can repeat work exponentially. The later [AutodiffGraphProbe](../autodiff/AutodiffGraphProbe.fss) marks nodes, constructs a reverse traversal and propagates once per node after contributions accumulate. Graph construction avoids a global mutable allocation counter; the reverse phase is sequential and clears state for another gradient call.

The 30-level shared diamond has over a billion paths but a small graph. Its bounded successful run is targeted evidence for this design change. The 8,191-node tree and repeated-gradient checks probe different failure modes. Notes also explain that a parameterless Walk would be a singleton, so `Walk(0)` creates fresh traversal state. An earlier mutable-tape approach is mentioned in the lead’s notes, but the available trail is insufficient to reconstruct its exact initial implementation and retirement time.

### 4. Numerical validation advanced in distinct gates

Candidate smoke outputs were followed by a full forward-only comparison, then scalar-AD stress checks, then full integration. This order matters: a correct loss did not imply a correct reverse pass or optimizer. Run 03 proves that distinction by printing the expected loss immediately before failing in backpropagation.

The reference work also corrected itself: the independent validation note reports missing generation fields in a stale fixture and an incorrect earlier description of greedy generation. The final reference uses injected uniforms and separately finite-differences every Python gradient. These corrections are reported in [INDEPENDENT_VALIDATION.md](../reference/INDEPENDENT_VALIDATION.md); their shell calls do not appear in the 83-command recorder index, so I do not assign them precise timestamps.

### 5. Visual quality influenced the final choice, but late

The lead’s recovery note records visual objections to candidate A/B: inline division and parentheses obscured formulas, Python captions clipped, and `x x` was ambiguous as an inner product. Tight division produced stacked fractions and radicals; successful DOT rendering supplied a central dot. The final quotient RMS and direct attention contraction were compared against executable inverse-power and transpose alternatives after numerical integration passed.

The retained final rationale is specific: quotient RMS resembles the radical formula and reuses division; direct attention summation exposes the time contraction without adding a transpose constructor. Those are defensible local choices. They do not establish a unique canonical Fortress solution. The record also shows the limitation of the process: substantive competing full formulations were tested late, rather than many architectures being explored visually from the beginning.

### 6. Integration left distinctive, testable scars

The final source contains several non-obvious choices that are explained by failed runs: a row binding instead of chained subscripts, explicit spacing around additive terms next to juxtaposition, floating promotion without `asFloat`, and a parenthesized indexed base before exponentiation. The final run’s source hash pins the assembled version that passed. Before September 8, saved failure copies and diagnostic locations support these explanations, but not a complete line-by-line edit sequence.

## What this says about independent development

The trail is stronger than a polished retrospective alone: it contains unsuccessful probes, working discarded alternatives, corrections to earlier conclusions, separately tested components, integration failures, and a late fully pinned successful source. These observations are consistent with substantive development within this experiment. A cheap next check could compare the final implementations’ unusual fingerprints, then ask whether each shared choice has a corresponding prior probe here.

It remains **plausibility evidence, not exclusion of contamination**. We lack complete file-access logs and session transcripts; the timestamped records are ordinary editable files rather than an independently signed append-only audit. Early source paths were mutable. The reference validator reports a prohibited broad filename listing, while saying no excluded contents were opened. Procedural instructions constrained workers but did not prevent access. No numerical probability of independence is justified by these artifacts.

The strongest defensible statement is: **we can reconstruct a coherent sequence of observed technical problems and increasingly capable implementations; we cannot reconstruct every influence that produced them.**

## Selected timestamped anchors

- Early notation succeeds: [notation-sum-001 · 01:45:31 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T014531.611982Z-notation-sum-001/command.json).
- Local AD SUM fails: [notation-dual-sum · 05:58:23 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T055823.426904Z-notation-dual-sum/command.json).
- Generator SUM fallback succeeds: [notation-dual-sum-generator · 05:58:56 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T055856.947811Z-notation-dual-sum-generator/command.json).
- Generic sum fallback succeeds: [notation-generic-sum · 05:59:10 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T055910.159333Z-notation-generic-sum/command.json).
- Vector bound surprise: [notation-number-bound · 05:59:22 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T055922.439724Z-notation-number-bound/command.json).
- Built-in SUM cast failure: [notation-builtin-sum-d · 05:59:53 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T055953.298778Z-notation-builtin-sum-d/command.json).
- Candidate smoke only: [microgpt-model-candidate-06 · 06:01:34 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T060134.575775Z-microgpt-model-candidate-06/command.json).
- Forward-only pass: [forward-index-fix · 20:31:54 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T203154.764676Z-forward-index-fix/command.json).
- AD derivatives pass: [ad-graph-probe · 20:35:17 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T203517.817562Z-ad-graph-probe/command.json).
- Shared diamond stress: [ad-graph-shared-stress · 20:35:45 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T203545.128691Z-ad-graph-shared-stress/command.json).
- 8,191-node tree stress: [ad-graph-8191-stress · 20:36:20 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T203620.542037Z-ad-graph-8191-stress/command.json).
- Forward succeeds; backward fails: [microgpt-integrated-03 · 20:38:18 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260907T203818.638869Z-microgpt-integrated-03/command.json).
- Full integrated pass: [microgpt-integrated-06 · 04:17:38 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260908T041738.426708Z-microgpt-integrated-06/command.json).
- Combined alternative pass: [microgpt-alternatives-01 · 04:18:38 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260908T041838.775815Z-microgpt-alternatives-01/command.json).
- RMS comparison render: [notation-rms-compare-02 · 04:19:45 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260908T041945.313897Z-notation-rms-compare-02/command.json).
- Incomplete reduction record: [figure-reduction · 04:20:22 UTC](https://github.com/palimondo/fortress/blob/a0a7d7e2a52c84b0036aaea75d96b684fd2326ac/experiment/evidence/20260908T042022.098009Z-figure-reduction/command.json).

The linked metadata are in the public checkpoint. Supplementary raw outputs and older source/render intermediates are now available in the [reviewed evidence archive](../../archive/process-evidence.tar.xz), with its [index](../../archive/INDEX.json). Earlier approval blocks were resolved after explicit user authorization. Final integrated and alternative outputs, source snapshots, current source and worker notes remain browsable. The HTML appendix includes all 83 metadata events; [events.json](events.json) is the machine-readable index.
