# Report: climb batch 30's landing in the `fortress-repo` skill

The skill is in line with the landing, in two commits, not pushed. The lint is clean on every changed file.

## Commits

- `8d7694dd49`: `revival-changes.md` takes the orientation's six accepted sections, with their lines in `sources.md`.
- `c26f6e805f`: `compiler.md`, `interpreter.md`, `gate.md` and `tests-writing.md` brought in line, with their lines in `sources.md`.

## Sections installed from the orientation

Installed word for word: the opening, "Dispatch and overloading", "Traits and objects", "Numbers", "Reductions and comprehensions" and "Implementation limits".

Held, left as it was: "Static parameters, `where` clauses and sizes".

`revival-changes.md` went from 29,117 to 29,146 bytes, the size that the judge gives.

The install corrects the first sentence that the data names in `revival-changes.md`. The part said that walk gives `Infinity` for a numeral that rounds to an infinity at a typed place. It now says that walk refuses it when the place runs, and that the message depends on the place.

## Sentences changed

**`compiler.md`, "What the code generator does"** (F-348). The part said only that a coercion that raises stops the program before `run()`. It did not say when a coercion's place is filled. New text:

> The runtime initializes the class of each component that the program's classes name before `run()`, in one task. So a coercion's output comes before the program's first line, the tasks that it forks run one after another, and a coercion that raises stops the program before `run()`.

**`compiler.md`, "Traps of the compiled path"**

- Deleted: "In a `try` nested in another `try` of one body, the outer `try`'s `catch` clause is matched first." The inner `catch` is now matched first, so there is no trap (row 888, fixed).
- Deleted: the bullet on a numeral coercion that spawns a task and fails the class's load. That failure is repaired (row 971, fixed).
- Changed (row 442; `CompilerBuiltin.fsi:401-403`, `:444-446`). The part said that `r: RR64 = 3` is refused. The prelude now converts a numeral without a radix point too. New text:

  > Until the switch-over, `RR64` converts only an `RR32` and a numeral, and `RR32` only a numeral. So a `ZZ32` value where an `RR64` is expected is refused (ledger row 442). Write `i.asRR64` for a `ZZ32` value `i`.

- Added (F-350, row 982). The part had no sentence on a compiled call's arguments, which now fork. New text:

  > A call's arguments can fork where two or more of them are calls of the program's named functions. So write no compiled program that relies on the order of its arguments. The calls written in the compiler's prelude do not fork: until the switch-over, a compiled `SUM` runs one body at a time (ledger row 982).

- Added (row 322). The part had no sentence on this open failure. New text:

  > An `atomic` block or a `try` as a call's argument after the first, where the arguments do not fork, fails with a `VerifyError` at class load (ledger row 322). Bind its value in a statement of its own.

`compiler.md` went from 32,034 to 32,230 bytes.

**`interpreter.md`, "How walk evaluates a program"**

- Deleted: the bullet on a float numeral to the left of an `RR32` operand. Walk now runs `RR32`'s operator on either side (row 958, fixed).
- Replaced (row 980). The bullet said that a numeral that rounds to an infinity at `RR32` or `RR64` gives `Infinity`. Walk now refuses that at a typed place. What remains is the case where no place types the numeral. New text:

  > A numeral with a radix point that no place types, and that rounds to an infinity at `RR64`, gives `Infinity`, with no error, on both paths (ledger row 980). Assert no value for it in a test.

- Replaced (row 981; `BuildEnvironments.java`, `checkNumeralTypesWritten`). The bullet said that a numeral type as a static argument or an extended type loads and runs. Walk now refuses both at load. What remains is the `comprises` clause. New text:

  > A numeral type written in a `comprises` clause loads and runs, as `trait T comprises { NaturalNumeral[\1, 10, 3\] } end` does (ledger row 981). The rules refuse it, as the compiled checker does, and as walk does at load in an `extends` clause or as a static argument: 'NaturalNumeral cannot be written in a program except as a parameter's type.'

**`gate.md`, "The atomic runs"**. The part said fourteen programs. It now says twenty-two, and the loop lists the eight new names. The names and their order are those of the batch's gate summary.

**`tests-writing.md`, "Names, comments, citations"** (F-350; `Library/RangeInternals.fss:20`, `:1320`, `:1337`). The part had no sentence on the range's grain. New last bullet:

> Under walk, a parallel range of sixteen elements or fewer, as `0#16`, runs its bodies in index order. So a test of parallelism under walk needs a range longer than 16.

## Already true, or not placed

- "Ambiguous coercion" in `revival-changes.md`, "Numbers": already true. It says that both paths stop where none of the declarations is more specific. F-349 only says how walk finds the more specific one.
- The three changed decisions (P-174, P-175, P-176): no sentence of any skill rests on their old words. Nothing changed.
- "root task" and "springboard": the skill does not use them. Nothing changed.
- The 40 ms added to a compiled program's start: not placed. The skill's one timing sentence, "A small program compiles in about 5 s and runs in about 1 s", is still true.

## Choices and decisions not taken

- **"rung"**: `library.md` uses it once, undefined: "When a rung needs it, the brief gives its command." I left it, because the worker acts on the brief's command either way. The alternatives are to define it there in a few words, or to write "your task".
- **A variable written in an `atomic` block before a `throw`**: I added no sentence. The compiled path now discards the write, as walk and the specification do, so it is no longer a trap. The alternative is one sentence in `SKILL.md`, "Parallelism and mutable state", that an exception which leaves an `atomic` block discards the block's writes.
- **Row 980's bullet** says "Assert no value for it in a test", as the bullet on row 962 does. The row is an open question for the curator. The alternative is to state no instruction for tests.
- **"in about a minute"** for the atomic runs: I kept it and did not measure twenty-two programs. The alternative is to measure the runs, or to cut the time.
- **The forked arguments** are stated as "can fork". Row 987 says the analyzer marks a call by where its function is declared, by reading and not run. The alternative is to state the analyzer's rule.

## For the coordinator

- The `coordinator` and `cloud-container` skills have no sentence that the landing made false, by a search for the closed rows and the atomic runs.
- The batch record's list of atomic runs does not name `AtomicNestedReadsKeptCompiled`. `gate.md` follows the gate's summary, so it does not name it either.
- The held section's queue item is in the orientation folder's `queue.md`, unfiled.
- The judgement notes that `compiler.md` on row 442 "may be stale". That is corrected above.
- A fault of the data: `tests-writing.md:137` is named as an incomplete sentence, but the part had no sentence on a parallel test. I added one at that line.
- Two sandbox refusals shaped how I worked: a Python script from the scratchpad and some compound shell commands were refused. I installed the sections by copying the judged text and reverting the held section's four changed sentences by hand. The held section has no diff against `main`.
---
session fedb0e6f-0b4f-4752-855b-fa383f7a1fe5 turns 65 cache writes 133796 reads 4135738 output 26918 labels {'ephemeral_1h_input_tokens': 133718, 'ephemeral_5m_input_tokens': 0}
