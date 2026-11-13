<!-- The grading of reader 1's answers to the regression quiz after climb batch 30's orientation update: case 33 only (quiz-cases.txt), against regression/key.md. -->

# Quiz grading, reader 1

Answers: `quiz-answers-1.md`. Key: `explorations/coordinator/tools/orientation/regression/key.md`, case 33. The answers file holds case 33 only, as `quiz-cases.txt` asks.

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
- The reason is the key's: `10^400` folds to one exact constant, which converts as a numeral does and rounds to an infinity at `RR64`.
- The reader gives walk's message as 'Type mismatch binding'. Inside a function the message is 'RHS expression type ZZ is not assignable to LHS type RR64'. The key says not to mark this down: the orientation's sentence gives the top-level message only.
- The way to the infinity is the key's kind: arithmetic on a typed operand, `m: RR64 = 10^200`, then `inf: RR64 = m m`. The key's probe ran `t TIMES t` for `t: RR64 = 10.0^308` and got `Infinity`. The reader's own form was not run by the key or by this grading.
- The reader does not repair with `1.0E400` and does not say the binding runs on either path.

**(b) Right.**

- No regression, no new defect, no ledger row, no change to walk.
- The `Infinity` of a week ago is named as walk's departure, row 967, since fixed. The reader looks the row up in the ledger first and says what the test becomes.
- The stop comes at load because a top-level binding runs at load.
- The test becomes a refusal test with `load_exception_contains=Type mismatch binding`, or is deleted if a gated test already covers the refusal. Both are the key's answers. The reader refuses the `XXX` rename and the restored output.

## Notes for the writer, none of which changes the grade

- **A rule is missing, as the key's Skill entry says.** No part says how to get an infinity, that float overflow gives `Infinity` with no exception, or names `isInfinite`. The reader says so in (a): "I have no passage that says a run-time `RR64` overflow or a float division by zero gives `Infinity` and no exception". The reader got to a right way by inference and would run it once before relying on it. The reader does not mention `x.isInfinite`.
- **`references/interpreter.md` is stale.** Its line still gives `Infinity` and row 967 as walk's current behaviour. The reader noticed it, called it stale-looking, and was not misled: the orientation's preamble on sentences that cite a ledger row kept the reader from building on it. That is an area part, not the orientation.
- **The message inside a function.** The orientation's sentence reads as if 'Type mismatch binding' is walk's message wherever the binding runs. The reader carried it to the binding inside `run()`. A test that asserted that text for a binding inside a function would fail.
