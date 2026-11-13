# Report: the cold read of climb batch 30's landing

I fixed sixteen of the cold read's nineteen flags and left three. The fixes are in one commit, `f88205fc59`, not pushed. The lint is clean on all six files.

## The fixes, with their reasons

**`compiler.md`, "What the code generator does"**

- A worker could not tell whose tasks "run one after another". The text now says: "the parallel parts of a coercion's body run one after another there." (F-348)
- A worker could set `run_exits_nonzero=true` in a test of a coercion that only prints. The text now says: "A test of a coercion that raises sets `run_exits_nonzero=true`."

**`compiler.md`, "Traps of the compiled path"**

- A worker could not tell which calls count, whether an operator's operands fork too, or which half the ledger row marks. "The order of its arguments" also read as the written order. A worker could also take a compiled `for` loop as sequential, as `SUM` is. New text:

  > To fork is to run as tasks that can run at once. A call's arguments and an operator's operands fork, as the rule says, where two or more of them are calls, written `f(x)`, of functions that the program declares. So write no compiled program that relies on the order in which its arguments are evaluated. Until the switch-over, the calls written in the compiler's prelude do not fork, so a compiled `SUM` runs one body at a time (ledger row 982). A compiled parallel `for` runs its bodies at once: use it in a test of parallelism.

  Ground: F-350; rows 982 and 987; `ParallelismAnalyzer.java`, `for_RewriteFnAppOnly`.

- A worker could pass a `try` as an operator's right operand and meet the `VerifyError`, because the text spoke of a call's arguments only. New text:

  > An `atomic` block or a `try` as a call's argument after the first, as `f(k, atomic do ... end)`, fails with a `VerifyError` at class load, unless the arguments fork (ledger row 322). So does a `try` as an operator's operand after the first (ledger row 526). Bind its value in a statement of its own.

- A worker on the compiled path could assert a value for an untyped numeral that rounds to an infinity, because the case stood only in walk's list. The numerals' list of `compiler.md` now has it:

  > A numeral with a radix point at a place that fixes no type, which rounds to an infinity at `RR64`, gives `Infinity`, as under walk (ledger row 980). Assert no value for it in a test.

**`interpreter.md`, "How walk evaluates a program"**. A worker could not tell what the rules answer for that numeral, and "that no place types" was hard to read. New text:

> A numeral with a radix point at a place that fixes no type, which rounds to an infinity at `RR64`, its default, gives `Infinity`, with no error, on both paths (ledger row 980). The rules do not say whether it is an error, so assert no value for it in a test.

I did not take the proposed "The rules refuse it". Row 980 is an open question: the specification makes such a numeral an error only at a place that fixes a type.

**`gate.md`, "The atomic runs"**. A worker who waits "about a minute" could take a longer run as hung. That time was for fourteen programs, and twenty-two were not timed. I cut the time.

**`tests-writing.md`**. A worker who writes a compiled test of parallelism had no pointer. The bullet now ends: "For the compiled path, see `compiler.md`, "Traps of the compiled path"."

**`revival-changes.md`**

- The opening. A worker could not tell an open question from a departure, and had to search for "plain test". New text:

  > A sentence that cites a ledger row states a behaviour that is not settled: a known departure from a rule, or a case that the rules do not decide yet. Either can change, so do not assert it as correct in a plain test, one without the `XXX` prefix (`tests-writing.md`).

- "Dispatch and overloading". "One instance" read as "a single" or "the same". It now says "at most one instance of a given generic type" and "the same generic type".
- "Traits and objects". The pointer to `interpreter.md` now names its section, "What walk checks".
- "Numbers". A test of a refusal at a parameter needs walk's message. The text now gives it: "a parameter 'got arg'" (`NumeralPointRoundsToInfinityAtParameterWalk.test`).
- "Numbers". A worker could copy the infinity recipe into a compiled test. The text now adds: "Until the switch-over, the compiler's prelude declares neither `TIMES` nor `isInfinite`." (`CompilerBuiltin.fsi:400-440`)

`revival-changes.md` went from 29,146 to 29,382 bytes, and `compiler.md` from 32,230 to 32,779.

## Flags left

- **`revival-changes.md`, "at every instance that the argument types allow"** (medium). These are P-45's own words, and the record gives no more. The proposed "at which both declarations accept the same arguments" is a reading of the rule. Decision not taken; the alternatives are P-45's words as they stand, or the proposed reading once it is checked against the 2011 paper.
- **`revival-changes.md`, the rule's answer for `(1,2) < (1,2.5)`** (medium). Row 511 gives only what walk does, and its specification column says the tuple shape is silent. By promotion the answer would be `true`, but no entry states it. Decision not taken; the alternatives are no answer, or `true` after a ruling.
- **`revival-changes.md`, the two cases where walk refuses a valid self-typed pair** (low). No ledger row holds them, and F-318 gives no way round. I cannot add a row from the skill.

Also left, from the list of undefined terms: "deciding elements" and "parallel range". No flag names a wrong action for either.

## For the coordinator

- The two self-typed cases of F-318 have no ledger row, so a worker may record them again as new defects.
- Row 511 lacks the rule's answer for a pair order over mixed numbers. An `XXX` test of it cannot be written until someone states it.
- Not run: whether an `atomic` block as an operator's later operand fails as a `try` does. Row 526 covers only `try`, so the skill claims only that.
- "in about a minute" is cut from `gate.md`. A measured time for twenty-two programs can go back in.
- Three fixes add content to `revival-changes.md`, which has a budget: the opening's sentence, the parameter's message, and the prelude's limit. Together they add 236 bytes.
---
session fedb0e6f-0b4f-4752-855b-fa383f7a1fe5 turns 22 cache writes 27902 reads 1801836 output 12396 labels {'ephemeral_1h_input_tokens': 27880, 'ephemeral_5m_input_tokens': 0}
