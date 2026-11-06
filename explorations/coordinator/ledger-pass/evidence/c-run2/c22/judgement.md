# Judgement, chunk c22 (run c-run2, base c124c6b65)

Applied 10 (rewrites), held 2 (measures). No closes, duplicates or silent lines. Pairs: 341-342 kept; 341-804 left to the 341 measure (queue.md).

- **570: apply.** Check passes; the line as assessed.
- **416: apply, corrected.** Check fail 1 (fidelity): "Generic declarations that differ only in an element type fail the Meet Rule instead (F-155). So the library's bounds check is named by rank" replaced by the check's text from F-155 at the base, "Two generic declarations that differ only in an element type load (F-155). The library's bounds check is named by rank". Fail 2 (cold read): "the type twin," deleted from the claim, as the check offers.
- **697: apply, corrected.** Fail 2: `reviews/popl2019-examples.md` written `explorations/reviews/popl2019-examples.md`. Fail 1: "Walk prints `C`;" is false of the reproducer (it prints `ran`); the check's replacement "Walk loads the claim's pair and runs it; the checker refuses it." took the notes to 732 characters, so it is cut to "The checker refuses it.", since the claim already says the pair "loads and runs".
- **785: apply, corrected.** Fail 1: the `BOTTOM` sentence replaced by the check's text (the refusal shows 'C->BOTTOM', from the Subtype Rule's branch `:519-527`, message `:645` (the check wrote `:646`, a commented-out println; the message is at :645) or `:654` by the pair's order; `BottomType.subtypeOf` answers true, `BottomType.java:20-22`, so which comparison fails is not settled by reading). Fail 2: "(under walk, `bin/fortress` on it)" added after the claim's program (no placeholder file name, which mech reads as a citation). Fail 3: `explorations/coordinator/CLIMB-BATCH-19.md`. For length (row 1239, notes 815): dropped "the checker infers the body's type" (the check's own offer), wrote the `OverloadedFunction.java` path from `interpreter/` (the skill's root for Java paths), shortened the refusal clause, "section 4" to "§ 4" and "the team test" out; `BottomType.java` written `types/BottomType.java` (the bare name is ambiguous).
- **788: apply, corrected.** Fail 1: "Through a bound: `XXXGenericBoundObjectOverlapWalk`, 'Invalid overloading of h' compiled." replaced by the check's text, naming `ProjectFortress/tests/XXXGenericBoundObjectOverlapWalk.fss`, walk loading the pair and `fortress compile` refusing it.
- **522: apply.** Check passes.
- **127: apply.** Check passes.
- **128: apply.** Check passes.
- **375: apply.** Check passes.
- **353: apply.** Check passes.
- **789: hold.** A measure (questions.md); no prober ran it in this run, so the row keeps its line (queue.md, with the check's corrected command).
- **341: hold.** A measure; no prober ran it; scope, pins and evidence fail and the rewrite waits on the run (queue.md).
