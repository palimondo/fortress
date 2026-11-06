# Judgement of chunk c27 (c-run4, base c124c6b65)

Applied 8 (7 rewrites, 1 keep), held 4 (20, 510, 432, 817). No duplicates, closes or pairs proposed or upheld. `final.silent` keeps row 432 as `defect`, as `silent.txt` has it and the check upholds (item 265).

- **20: hold.** The check fails the reproducer: the cell is `none` and the notes name the probe `explorations/spec-probes/p2_ascribe.fss` without a command or its output. Its correction needs a walk run whose quoted refusal no prober supplied, so I cannot make it exactly. The rewrite's other change (`Library/List.fsi:112` to `:114`) passes, and it goes into the queue item.
- **96: apply (keep).** The check passes it: `Library/CovariantCollection.fss:43` still holds the APPCOV `fail`, and the gone probes say where they are. The line stays as it is.
- **432: hold (measure).** The check passes the question, but no prober ran it, so the row keeps its line. Silent: `defect`.
- **510: hold.** The check fails the claim ("a static argument that only a call's result mentions" is false for `wrapK[\T\](x: T)`). Its exact correction makes the claim 329 of 300 characters and the row 1,229 of 1,200 (`ledger.py check --rows`), so it cannot land as given. Shortening it further would be new wording, not the check's.
- **705: apply (rewrite).** The check passes it.
- **717: apply (rewrite, corrected).** Correction: "(row 20's list face)" became "(as row 20 states for a list display)".
- **731: apply (rewrite, corrected).** Corrections, as the check gave them: the F-bounded refusal now names its command (`fortress compile` of `compiler_tests/InferBigOperatorExpectedType.fss` with its bound made `StandardTotalOrder[\T\]`) and cites `compile-ladder/rung-argument-context/REPORT.md:115`; "(`InferBigOperatorExpectedType`; ...)" became "(that test; ...)"; "The interpreter's library writes the argument" became "The library writes it"; "; user programs still need it" was dropped. Row 1,187 characters.
- **825: apply (rewrite).** The check passes it, and CONTESTED stays. F-143 still names `List.fss:179`, which a writer of FACTS must correct (outside this pass).
- **663: apply (rewrite, corrected).** Correction: "A probe with `sj` measured it" became "A probe measured it with methods: `sj(a: (T,T), b: (T,T))` beside an inherited abstract `sj(a: Any, b: Any): Any` is not chosen for two pairs" (REPORT.md section 5). CONTESTED stays.
- **716: apply (rewrite, corrected).** Correction: "pins the list face as walk's answer" became "pins the list half, `List[\Any\]`, as walk's answer".
- **824: apply (rewrite).** The check passes it.
- **817: hold (measure).** The check passes the question, but no prober ran it. The check's correction to the question's "Why" (drop 396e4ed8d from the list of checker commits since 3cd33d0b0) is carried in the queue item.
