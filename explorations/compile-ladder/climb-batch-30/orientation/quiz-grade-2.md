<!-- The grading of reader 2's answers to the regression quiz after climb batch 30's orientation update, second writer round: case 33 only (quiz-cases.txt), against regression/key.md. -->

# Quiz grading, reader 2

Answers: `quiz-answers-2.md`. Key: `explorations/coordinator/tools/orientation/regression/key.md`, case 33. The answers file holds case 33 only, as `quiz-cases.txt` asks.

## Counts

| Grade | Cases |
|---|---|
| Right | 1 (case 33) |
| Right without its path or scope qualification | 0 |
| Wrong | 0 |

No failed case. Nothing counts against the orientation.

## Case 33: right

**(a) Right.**

- The binding is refused on both paths: the checker statically, walk when the binding inside `run()` runs, not at load. This is the key's decision and scope.
- The reason is the key's: `10^400` is numerals alone, folds to one exact constant, converts as a numeral does at `RR64`, and rounds to an infinity there.
- The way to the infinity is the key's own form: `t: RR64 = 10.0^308`, then `inf: RR64 = t TIMES 10.0`. The reader also names `x.isInfinite`.
- The reader asserts no message text for the binding inside `run()`, because the orientation gives the top-level message only. That is more careful than the key asks.
- The reader does not repair with an exponent form and does not say the binding runs on either path.
- One detail differs from the key and does not change the grade: the reader says that before the switch-over the compiler's `RR64` refuses any numeral without a radix point (`compiler.md`, row 442). The key says the prelude's `RR64` takes such a numeral since climb batch 30. The conclusion, refused when compiled, is the same, and the key says this point is not needed.

**(b) Right.**

- No regression, no new defect, no ledger row, no change to walk.
- The `Infinity` of a week ago is named as walk's departure, row 967. The reader looks the row up in the ledger first and says what follows from each result: closed, then `interpreter.md`'s line is stale and is reported; still open, then the disagreement is reported.
- The stop comes at load because a top-level binding runs at load, with 'Type mismatch binding'.
- The test becomes a refusal test with `load_exception_contains=Type mismatch binding`, or, if it only needs the value, gets the infinity by run-time overflow. Both are the key's answers. The reader does not rename it `XXX` and keeps no workaround.
- The reader does not mention deleting the test because `tests/NumeralRoundsToInfinityWalk` already covers the refusal. The key allows that; it does not require it.

## Notes for the writer, none of which changes the grade

- **The rule missing in round 1 is now in the orientation.** Its line 93 gives the overflow form and `isInfinite`, and says walk's message depends on the place. The reader used all three. The key's Skill entry still says no part gives them; that entry is behind the orientation.
- **`references/interpreter.md:24` is stale.** It still gives `Infinity` and row 967 as walk's current behaviour. The reader noticed it and was not misled. That is an area part, not the orientation.
- **`references/compiler.md` on row 442 may be stale too.** The reader took from it that the compiler's `RR64` refuses a numeral without a radix point before the switch-over; the key says climb batch 30 closed that half of row 442. I did not read `compiler.md` to confirm.
