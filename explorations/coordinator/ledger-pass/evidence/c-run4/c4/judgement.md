# Judgement, chunk c4 (run c-run4, base c124c6b65)

Rows 325, 330, 360, 361, 362, 443, 454, 528, 529, 578, 795, 862. Applied 11 (4 keeps unchanged, 7 rewrites), held 1 (330). No closes, duplicates or pairs were proposed; `final.closes`, `final.dups` and `final.pairs` are empty. `final.silent` is `silent.txt` unchanged: the check upholds 528, 529 and 578 as defects that keep `NEGATIVE-VERIFIED` (item 265's default).

## Row 325 (keep): apply, unchanged
The check passes it: `Misc.scala:468-470` still gives `Types.INT_LITERAL`, `CompilerBuiltin.fsi:390-396` unchanged; the commits since add expected types only. No line in `final.rewrite`.

## Row 330 (rewrite): hold
The check fails it on three points. Corrections 2 and 3 are exact from their sources (`FortressBuiltin.fss:192, :196`, `FortressLibrary.fss:502`; POSITIONS.md:76). Correction 1 is not a line: the reproducer passage gives no command and output, and the check's remedy is a measurement whose result decides the claim, which no prober ran. So the row keeps its present line; `queue.md` holds the item with the measurement.

## Row 360 (rewrite): apply, corrected
Check fail, both corrections exact. (1) Claim: "`floor(2.99999999999999999)` is `3.0`, not 3 and 2" became "`round(3.49999999999999999)` is 4, not 3 and 3", the test asserting both `round` values (`tests/XXXRoundNearTieNumeral.fss:7, :9`); `floor` returns the float type by P-68. (2) "Fix: `compile-ladder/...`" became "Fix design, not built: `explorations/compile-ladder/rung-round-half-even/REPORT.md`." (the file exists at the base).

## Row 361 (rewrite): apply, as written
The check passes it.

## Row 362 (rewrite): apply, as written
The check passes it.

## Row 443 (rewrite): apply, as written
The check passes it.

## Row 454 (rewrite): apply, corrected
Check fail, corrections exact from the probes at `84aef6a4f^` (`BwB4RR32.walk.txt`, `BBindCk.check.txt`) and P-76 (POSITIONS.md:84). Claim: "both paths refuse" became "walk and the compiled checker refuse". Notes: the prelude sentence became "Today's compiled runs, on the prelude, convert it (`LibraryBuiltin/CompilerBuiltin.fss:993`)."; "waits for Q-walk (P-76)" became "waits for walk to have the checker's static types (P-76)"; `BBindCk` named beside the probes. The notes then ran to 712 characters, so, as the check allows, the probes are listed once by folder: "Probes BwB1NN32, BwB2NN64, BwB4RR32 and BBindCk in `explorations/reviews/numerics-plan-coordinator/probes-B/`, in the parent of 84aef6a4f." (each file is in that tree).

## Row 528 (keep): apply, unchanged
The check passes it; `NEGATIVE-VERIFIED` beside `silent` stays (item 265). Its "Repair: ..., measured and not landed" wording, which the check notes without failing, is left for the next pass.

## Row 529 (rewrite): apply, corrected
Check fail, correction exact from `RR32Comp.comp.txt` at `ab067d9b6^` ("a + f is RR64 4.5") and `XXXRR32EqualityRungV.fss:9`: "`a MINMAX f` does not compile" became "`a MINMAX f`, `f` an `RR64`, does not compile".

## Row 578 (keep): apply, unchanged
The check passes it (5ad4a9957 still normalises `IntLiteral.Pow` to `Int`).

## Row 795 (keep): apply, unchanged
The check passes it.

## Row 862 (rewrite): apply, corrected
Check fail, corrections exact. (1) "and, by reading, uses the same sum for another radix." became "and, by reading, the same sum for another radix (`:30-31`): walk shares the defect there." (the interpreter's `FFloatLiteral.java:30-31` at the base computes `intPart.doubleValue() + (numerator.doubleValue() / Math.pow(denomBase, denomPower))` when `denomBase != 10`); the check's longer wording took the notes to 721 characters, so it is shortened to the same content. (2) Specification cell prefixed `Specification/`.
