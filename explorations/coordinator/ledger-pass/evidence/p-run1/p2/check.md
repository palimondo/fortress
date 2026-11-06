# Check of chunk p2, run p-run1, base de6d905f5

mech.py: "MECH: 9 lines, 0 failing, every check passes." Closes, duplicates, pairs: none written. questions.md: no row measured; its two "later probe" notes are optional and map to no disposition, so nothing to check there.

Totals: 7 pass, 5 fail (327, 350, 429, 700, 792).

## 327: FAIL (fidelity, present)

- Passage, claim: "tests a negative binomial coefficient"; notes: "Wrapped to 32 bits the numeral is `-1257966796`, the argument the compiled call took when measured, so the file does not test the boundary it names; both sides of `verifyChoose`'s assertions compute from the same argument, so nothing shows."
- Source: FACTS F-118 (at the base a numeral reaches the compiled world with its value, gated by `compiler_tests/IntLiteralWrapRepairR2`), and `explorations/compile-ladder/repair-r2-literal-wrap/REPORT.md`, "What part one uncovered": once the wrap was repaired, the identical line of `IntegerChoose2.fss` raised `Not in range for ZZ32: 3037000500`, and the report names `ChooseTest3.fss:125` as the sixth out-of-range numeral, left unedited. So at the base the compiled call does not take `-1257966796`; by that measurement it stops with the range error. The wrapped value is the line's past, which the assessment itself marked as a present-meaning fail and then kept.
- Correction, claim: "`ProjectFortress/library_tests/ChooseTest3.fss:125` does not reach the `ZZ64` algorithm's fast/slow boundary that its comment at `:122-123` names: in `verifyChoose(3037000500+j, 2)` the numeral is taken at `ZZ32`, `j`'s type, which does not hold it".
- Correction, notes, first sentence: "Compiled, the numeral keeps its value (F-118), so the call stops with `Not in range for ZZ32: 3037000500`, as the identical line of `IntegerChoose2.fss` did before it was repaired (`explorations/compile-ladder/repair-r2-literal-wrap/REPORT.md`, "What part one uncovered"); not run on this file, which no gate runs, so nothing shows." Keep the rest. Also "the file's own idiom" becomes "the folder's idiom" (the idiom is `IntegerChoose2.fss`'s, not this file's; cold read).
- Token `verifyChoose(-1257966796+j, 2)`: home, the history (row 327's earlier line); `fastSlowBoundary`: kept.

## 348: pass

Four ranges hold the bindings at the base (`BOX` to `Wrapping`, `DOT` to `Saturating`); `CompilerBuiltin.fss` has no `DOTTIMES` (count 0). The `NN32` values follow from those bindings and `XXXBoxDotSpellingsRungW.fss` asserts the specified ones. P-38 and P-73 say what the notes say. Dropped "10 compiled test files" and `ab914b6e0`: home, the history. Cold-read items are minor.

## 350: FAIL (cold read)

- Passage: "the two-argument form (`:28`) passes a message." The row names no target: the cold read could not resolve what the exception should carry, or whether this is buildable without a decision. A worker would hit the same problem.
- Source: `Specification/basic/operators/opr-overview.tex:155` ("For integer results, overflow throws an IntegerOverflow", nothing on what it carries); `Specification/basic/exceptions.tex:68` (`Exception`'s `settable message: Maybe[\String\]`); the row's earlier line in the history named both as the hook of a fix.
- Correction, notes, first sentence, shortened to stay within 700: "Compiled, every `IntegerOverflow` throw of `nativeHelpers/simpleIntArith.java`, `simpleLongArith.java` and their unsigned twins (e.g. `simpleIntArith.java:97`, at de6d905f5) uses `Utility.makeFortressException(name)` (`compiler/runtimeValues/Utility.java:45`), the no-argument constructor; `:28` passes a message, the hook of a fix (`Specification/basic/exceptions.tex:68`; the specification asks only for the throw, `basic/operators/opr-overview.tex:155`)." Re-run mech.py for length.
- Otherwise holds: `:97`, `Utility.java:28`, `:45`, and `Int.java:258` (`overflow()` raises the library's root `IntegerOverflow` object, with no value). Token `simpleIntArith.java:96`: false at the base (re-pinned to `:97`).

## 429: FAIL (fidelity, cold read)

- Passage: "`grep -rn -E 'opr (\+\|DOTPLUS\|BOXPLUS\|∔\|⊞) ?\(self ?\)' Library/ ProjectFortress/LibraryBuiltin/` prints nothing".
- Source: run at the base, it prints four lines: `Library/incomplete/basic/Fortress.Number.fsi:27` (`opr +(self): QQ`), `:109-111` (`opr +(self): ZZ`, `opr BOXPLUS(self): ZZ`, `opr DOTPLUS(self): ZZ`). With `--exclude-dir=incomplete` it prints nothing (exit 1). `Library/incomplete/` is not on the source path (`fortress-repo` skill, `references/library.md`).
- Correction: "At de6d905f5, `grep -rn -E '…' --exclude-dir=incomplete Library/ ProjectFortress/LibraryBuiltin/` prints nothing; only the team's unloaded draft declares the three (`Library/incomplete/basic/Fortress.Number.fsi:109-111`)."
- Second failure (cold read, status): with "Nothing to do now" removed, the reader could not tell whether unary `+` and ∔ can be built now. Correction: after "P-73 names the binary wrapping operators only", add "so no decision covers the unary forms, and they wait for one". This restates the earlier line's "nothing to do now" without the batch story.
- Holds: `FortressLibrary.fsi:561-563` (unary `DOTMINUS`, binary `DOTPLUS` on `ZZ32`); `basic-integers.tex:391-392` quoted right; ⊞ comes with row 797 (P-73). Tokens `.fss`, `:416-420`, `git show 7f57b836e:…`: the commit does not resolve, so the history is their home.

## 431: pass

`QuickCheck.fss:322` reads `perturb(big(widen(obj) LSHIFT 32), …)` at the base. `explorations/reviews/quickcheck-widen.md` sections 3 and 7.3 hold the probe's source and its output (2^40+7, 2^50+7 and 2^70+7 all give 1001751898; 2^40+8 does not), so the reproducer counts as given. `ZZ` declares `RSHIFT` (`FortressLibrary.fsi:693`), so the fix is well-formed. Dropped tokens (`propMapSizeInvariant2`, `genQQ`, `perturb-probe.sh`, `rung-flat-tower/REPORT.md`, `Long`, `ZZ32`): home, the history and quickcheck-widen.md section 4.

## 500: pass

`basic-integers.tex:801-802` and `:823` hold the three lines at the base; the frozen draft's `:760-761` and `:782` hold them too. The claims about `countBits` and `countFactorsOfTwo` are correct. Optional, not a fail: "the library declares none of `countBits`, `countFactorsOfTwo` and `integerLength`" is true of the libraries on the source path only; `Library/incomplete/basic/Fortress.Number.fsi:168-170` declares all three. The judge may add "on the source path". Old pins `:788`, `:788-789`, `:810`: false at the base, re-pinned.

## 501: pass

`algebraic-constraints.tex:1159-1160`, `basic-integers.tex:554-560` and `:562-564` hold what the line says. F-316 gates nonnegative `GCD` and `LCM` under walk on the four fixed widths and `ZZ`. Old pins `:1153-1154` and `:541-547`: false at the base, re-pinned.

## 700: FAIL (fidelity)

- Passage, claim: "which wraps for a fixed-width N"; notes: "where `modulus` divides 2^w, w being N's width".
- Source: the library declares `widen` only on `ZZ32`, `ZZ64` and `ZZ`, and each one gives `ZZ64` (`Library/FortressLibrary.fsi:586`, `:646`, `:699`). `NN32` and `NN64` declare none. So `mult DOTTIMES widen(…)` runs at `ZZ64` and wraps at 64 bits whatever N is, `ZZ` included (`ZZ`'s `widen` keeps the low 64 bits, P-161). The claim also leaves out its condition: the state is wrong only once a step overflows, which the notes state and the claim does not.
- Correction, claim: "the library's `LinearCongruential[\N\]` gives wrong numbers once a step overflows, for a modulus that does not divide 2^64: `random` and `perturbed` compute `(mult DOTTIMES widen(…)) DOTPLUS add`, which wraps at 64 bits since every `widen` gives `ZZ64`, and only then take `MOD modulus`".
- Correction, notes: "where `modulus` divides 2^64 (`widen` gives `ZZ64` on `ZZ32`, `ZZ64` and `ZZ`, `Library/FortressLibrary.fsi:586`, `:646`, `:699`)". Cite FACTS by number, F-130, in place of its quoted title, to make room. F-130 carries the same "2^width of its type" phrasing, which the judge may route as a FACTS correction.
- Holds: `Random.fss:226`, `:239`, `:245`, `:256-257` at the base. Old pins: false at the base, re-pinned.

## 792: FAIL (fidelity, cold read)

- Passage: "Which name the listing takes is not settled (review-queue item 195). Default (`explorations/reviews/batch-20-review.md`): `DivisionByZero`, written in by the next change to `basic-integers.tex`."
- Source: at the base, `explorations/coordinator/review-queue.md:904` lists item 195 under "Moved to the coordinator's work file at the cleanup of 2026-11-05", whose header says "None asks a decision of his". `explorations/coordinator/coordinator-work-2026-11-05.md:46` records the route as done (`bdb244edb`): "`DivisionByZero` written into the integer listing by the next rung that edits `Specification/basic-lib/basic-integers.tex`. … the row stays `CONTESTED`." The line presents item 195 as an open question, which is why the cold read could not tell whether the default may be applied.
- Correction: "Its route (`explorations/coordinator/coordinator-work-2026-11-05.md`, item 195; default of `explorations/reviews/batch-20-review.md`): the next change that edits `Specification/basic-lib/basic-integers.tex` writes `DivisionByZero` into the listing; until then the row stays `CONTESTED`."
- Cold read, minor: "the method entry of the integer power names it (P-153)" becomes "the chapter's own power entry names it (`Specification/basic-lib/basic-integers.tex:536`, P-153)". The specification cell `basic-lib/basic-integers.tex` becomes `Specification/basic-lib/basic-integers.tex`.
- Holds: `:246-250`, `:460-464`, `:481`, `opr-overview.tex:165`, `completion.tex:31`, `FortressLibrary.fsi:1138`, `CompilerBuiltin.fsi:747`; neither library has `IntegerDivisionByZero`. The status stays CONTESTED, which is correct. Tokens `FortressLibrary.fsi:1114` (false at the base) and `reviews/batch-20-review.md` (kept as the full path).

## 797: keep, pass

At the base the grep prints 0 for each of the four files. `Library/incomplete/basic/Fortress.Number.fsi:87-88` holds. P-73 agrees. The later commits that touch the cited files add no saturating operator.

## 881: keep, pass

`git grep 'opr DIVREM|opr DIVMOD'` at the base finds only `Library/incomplete/basic/Fortress.Number.fsi:130-131`. `tests/XXXDivRemDivModWalk.fss` exists and is gated.

## 887: keep, pass

`simpleArbitraryPrecisionArith.java:164-177`, `BigNum.java:326-345` and `simpleIntArith.java:218` are unchanged since d85bac271. `tests/XXXChooseZZOutOfRangeWalk.fss` exists. FACTS 144 and 225 agree. Sibling 337 is FIXED and is the fixed widths' half, so it stays a true sibling.
