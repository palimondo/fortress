I fixed six of the cold read's ten flags in one commit, `7b7d4c1c56`. I left four, with the reasons below. The lint finds nothing, and nothing is pushed.

## The fixes, in plain words
- **Walk's choice between two generic methods (`revival-changes.md`, "Dispatch and overloading").** The old text said walk "keeps the first that it meets". A worker could not tell which method is first, or whether the other one ever runs. The new text says that walk drops one of the two at load. Every call then runs the other one, or stops when the argument is outside that one's bound. It adds an example from the ledger's test: with `tk[\U extends Number\]` declared before `tk[\U extends ZZ32\]`, a call on a `ZZ32` runs the first. Grounds: row 1125, the test `XXXGenericMethodBoundsDifferWalk.fss`, and `genericKey` in `Constructor.java`.
- **Numeral types (`interpreter.md`).** "Where a numeral meets it" named no place. And "`never(...)` runs" could send a worker to call a function that never ends. The new text says that walk refuses the type only where a numeral is bound at it, with the message 'Type mismatch binding 3'. It also says that walk loads `never`, whose body returns no value. Grounds: row 1124, `NumeralTypeNoValueWalk.test` and `XXXNumeralTypeReturnTypeWalk.fss`.
- **Exported object's value parameter (`compiler.md`).** The term "value parameter" came after its first use, and the condition came after the effect. The new order is: what a value parameter is, then that the export check compares no names, then when a read of it dies with `NoSuchMethodError`, then what to do. The meaning is the same (row 839).
- **Seeding a worktree (`worktrees.md`).** "On the compiler's prelude" seemed to apply to walk too. A worker who compiled with `FORTRESS_LIBRARY=one` in a new worktree got a failed run and no next step. Now walk and the prelude's compiled path are named separately, both ready at once. A new sentence says that the script copies neither `build-one` nor `caches-one`. Before such a run, the worker runs `ant compileAll`, then the library order, then fills `caches-one`. Grounds: F-404, `seed-worktree.sh`, and `compiler.md` ("`ant compileAll` builds both").

## Each flag
| Part and passage | Confidence | What I did |
|---|---|---|
| `compiler.md`, value parameter used before its definition | low | Took the proposed rewrite. Its fix was clear. |
| `interpreter.md`, "where a numeral meets it" | medium | Fixed with the place and the message, checked in the test. I did not write "passed or returned": the record gives only binding. |
| `interpreter.md`, "`never` … runs" | medium | Took the proposed wording. |
| `revival-changes.md`, "the first that it meets" | high | Fixed as above. I did not write "the source's first declared" as a general rule. The code keeps whichever method the environment meets first, which I could not confirm is the order in the source. So the order appears only through the test's example. |
| `revival-changes.md`, no step for two methods that differ only in bounds | medium | Left. The skill does not teach a workaround for a defect; the defect is fixed instead (P-180), and the landing's data says that no sentence is added for a new trap. |
| `revival-changes.md`, `Index`: "that runs" seems to attach to the type | low | Left. See the decisions below. |
| `revival-changes.md`, "booleans" said twice | low | Left. See the decisions below. |
| `revival-changes.md`, nothing about the prelude's `≡` and `≢` | low | Left for the coordinator. The prelude declares `NEQV` over `Any` and no `EQV` (`CompilerLibrary.fsi:31`). That is row 1119's wall, which the judgement sends to `compiler.md`'s list of the prelude's departures, not to this part. |
| `worktrees.md`, "on the compiler's prelude" reads as applying to walk | medium | Fixed. |
| `worktrees.md`, no step for a compiled run with `FORTRESS_LIBRARY=one` | medium | Fixed, together with the flag above. |

## Decisions not taken
- **`Index` wording.** I kept the text. The alternatives:
  - Change "checked against the interpreter's library" to "compiles with `FORTRESS_LIBRARY=one`", as the cold read proposed. That narrows the rule: it drops the count stage and `typecheck` run with the variable, so it changes the rule's meaning.
  - Keep the judged text, which the regression key's case 22 grades.
- **"Booleans" said twice.** I kept "for booleans only". The alternative is "on no other type". Case 39 of the regression key quotes the installed sentence word for word (`key.md:650`), so a change would put the key out of step with the text.

## For the coordinator
- **The prelude's `≡` and `≢`.** The prelude declares `≢` over `Any` and no `≡` (row 1119). This belongs in `compiler.md`'s list of the prelude's departures, if the switch-over is not near.
- **The two-methods trap (row 1125).** It needs a planned fix, not a workaround in the skill.
- **The regression key is still not committed.** `key.md` and `questions.md` are still modified in the working tree.
- **The seed script (F-404).** The new step in `worktrees.md` is a work-around for this defect. Once `seed-worktree.sh` copies `build-one` and `caches-one`, the step can go.
---
session ac0f516a-a029-4bef-ba49-49959c5ca56d turns 17 cache writes 17808 reads 1500666 output 9246 labels {'ephemeral_1h_input_tokens': 17780, 'ephemeral_5m_input_tokens': 0}
