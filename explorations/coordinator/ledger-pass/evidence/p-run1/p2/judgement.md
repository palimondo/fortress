# Judgement of chunk p2, run p-run1, base de6d905f5

Applied 12 (9 rewrites, 3 keeps), held 0. No close, duplicate or pair.

- 327: apply, with the check's corrections. The claim no longer says the test computes a negative coefficient; the notes' first sentence states that compiled the numeral keeps its value (F-118) and the call stops with `Not in range for ZZ32: 3037000500`, as `IntegerChoose2.fss` did (`repair-r2-literal-wrap/REPORT.md`, "What part one uncovered", which names `ChooseTest3.fss:125`); "the file's own idiom" became "the folder's idiom".
- 348: apply as written; the check passes it.
- 350: apply, with the check's correction of the notes' first sentence (the fix's hook, `Specification/basic/exceptions.tex:68`, and `opr-overview.tex:155` asking only for the throw). Shortened to fit 700: "raises a catchable one, with no value either" became "has none either"; "the hook of a fix" became "a fix's hook"; "every" "each", "their" "the", "(e.g. ..., at de6d905f5)" "(... at de6d905f5)". No fact dropped.
- 429: apply, with both corrections: the grep with `--exclude-dir=incomplete` (prints nothing at the base; verified, exit 1) and the unloaded draft `Library/incomplete/basic/Fortress.Number.fsi:109-111` named; "so the unary forms wait for a decision" added after P-73. Shortened to fit: the specification's quote paraphrased ("unary +, ⊞ and ∔ each return their argument", same lines); "⊞ saturates, and the one library declares no saturating operator (row 797)".
- 431: apply as written; the check passes it.
- 500: apply, with the check's optional precision: "the libraries on the source path declare none of" (the unloaded draft declares all three).
- 501: apply as written; the check passes it.
- 700: apply, with the check's corrections: claim "once a step overflows, for a modulus that does not divide 2^64 ... wraps at 64 bits since every `widen` gives `ZZ64`"; notes "divides 2^64 (`widen` gives `ZZ64` on `ZZ32`, `ZZ64` and `ZZ`, `Library/FortressLibrary.fsi:586`, `:646`, `:699`)" (verified at HEAD); the FACTS title replaced by F-130.
- 792: apply, status stays CONTESTED, with the check's corrections: item 195's route from `coordinator-work-2026-11-05.md:46` (verified) in place of the open-question wording; the power entry cited as `Specification/basic-lib/basic-integers.tex:536` (verified); the specification cell given its full path. Shortened to fit: the opr-overview quote reduced to its citation.
- 797, 881, 887: keep; the check passes each.

Silent: `final.silent` is `silent.txt` unchanged (327, 350, 431, 700): each reason holds against the evidence and the corrected lines.

For FACTS (not a ledger line): F-130 says the state is right "where the modulus divides 2^width of its type `N`"; by `FortressLibrary.fsi:586`, `:646`, `:699` the wrap is at 64 bits for every N, so it should read 2^64 (queue.md).
