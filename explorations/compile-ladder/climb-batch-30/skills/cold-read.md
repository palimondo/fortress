# Cold read: fortress-repo, five changed parts, base 2fb29035d

Read as a worker new to the repository. I read `SKILL.md` whole, the diff of each part, and each part around its change. I edited nothing.

## 1. The lint's output

The lint printed nothing and exited 0, on all five parts. No hits.

## 2. What I would do differently, section by section

**compiler.md, "What the code generator does", line 65.** I expect a numeral coercion's printed output before the program's first line. I expect its parallel parts to run in sequence. I expect a coercion that raises to stop the program before `run()`, and I set `run_exits_nonzero=true` in its test. Limit: not where the place's type names a type parameter.

**compiler.md, "Traps of the compiled path", lines 106-108.** I write no compiled program that relies on `finally` after an exception leaves the `try`. I write no compiled program that relies on the order in which a call's arguments are evaluated. I do not expect a compiled `SUM` to run in parallel before the switch-over. I bind an `atomic` block or a `try` in a statement of its own before I pass it as a second or later argument.

**compiler.md, line 111.** Before the switch-over I write `i.asRR64` where a `ZZ32` value must be an `RR64`. A numeral without a radix point is now taken at `RR64`.

**gate.md, "The atomic runs", line 47.** I run the loop as given, over twenty-two programs. The list holds twenty-two names.

**interpreter.md, walk's departures from "Numbers", lines 23-24.** I assert no value for an untyped radix-point numeral that rounds to an infinity at `RR64`. I write a refusal of a numeral type in a `comprises` clause as an `XXX` test under walk.

**revival-changes.md, opening, lines 3-7.** I do not assert, in a plain test, a behaviour that a sentence with a ledger row states.

**revival-changes.md, "Dispatch and overloading", lines 11-24.** I check a more specific overload's return type at every shared instance, not at one. I read exclusion over the whole tuple of parameter types. I do not take walk's load check as the verdict. I count an abstract functional method as an overload for the Meet Rule.

**revival-changes.md, "Traits and objects", lines 30-55.** I let several declarations cover a meet together. I write no `override` in a compiled program. I write `I extends Index` only in code that runs under walk or is checked against the interpreter's library. I expect walk to refuse a pair of numbers of two run-time types at one position.

**revival-changes.md, "Numbers", lines 89-105.** I expect a numeral to convert at a typed place, and to be refused there if it is out of range or rounds to an infinity. I make an infinity by run-time arithmetic. Elsewhere I expect the default type. For a test of run-time arithmetic I use a variable operand. Under walk I bind a numeral at the value's type before `=`. I call `asFloat(x)`, not `x.asFloat`.

**revival-changes.md, "Reductions and comprehensions", line 115.** I write the static argument in every clause form of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`.

**revival-changes.md, "Implementation limits", line 125.** I write no `Maybe` as an `if` condition.

**tests-writing.md, line 138.** In a test of parallelism under walk I use a range longer than 16.

No changed section holds repair history.

## 3. The flags

### compiler.md

**C1. Line 65.** "the tasks that it forks run one after another". Kind: a sentence that reads two ways. "It" can be the coercion or the runtime. A worker cannot tell whether a parallel loop in a coercion's body is meant. Confidence: medium. Fix: restate. "The parallel parts of a coercion's body run one after another there."

**C2. Line 65.** "A test of it sets `run_exits_nonzero=true`". Kind: a sentence that reads two ways. "It" now follows three results. A worker could set the key in a test of a coercion that only prints. Confidence: medium. Fix: restate. "A test of a coercion that raises sets `run_exits_nonzero=true` (`tests-writing.md`)."

**C3. Line 107.** "calls of the program's named functions". Kind: a term not defined where it is used. A worker cannot tell whether a method call, an operator such as `f(x) + g(y)`, or a call of a function value counts. Confidence: medium. Fix: define the term. Say which calls count, and whether an operator's operands are arguments here.

**C4. Line 107.** "A call's arguments can fork ... (ledger row 982)." Kind: a sentence that reads two ways. `SKILL.md` gives parallel arguments as the language's rule. `revival-changes.md` line 7 says that a sentence with a ledger row states a departure. So a worker cannot tell which half the row marks: the fork, or the prelude's calls that do not fork. "The order of its arguments" also reads as the order in which they are written. Confidence: medium. Fix: restate. "A call's arguments fork, as the rule says, where two or more of them are calls of the program's named functions. So write no compiled program that relies on the order in which its arguments are evaluated. Until the switch-over, the calls written in the compiler's prelude do not fork, so a compiled `SUM` runs one body at a time (ledger row 982)."

**C5. Line 107.** "a compiled `SUM` runs one body at a time". Kind: a gotcha that the passage leaves out. It names `SUM` only. A worker who writes a compiled test of a race with a `for` loop or a comprehension cannot tell whether its bodies run in parallel. Confidence: medium. Fix: restate. Say which compiled constructs run in parallel before the switch-over, and which a test of parallelism must use.

**C6. Line 108.** "as a call's argument after the first, where the arguments do not fork". Kind: a sentence that reads two ways. A worker must work out "do not fork" from line 107, which C3 leaves open. It cannot tell whether `a + atomic do ... end` is such a call. Confidence: medium. Fix: restate, with an example. "... as `f(x, atomic do ... end)` ..."

### gate.md

**G1. Line 47.** "in about a minute". Kind: a claim that a worker could not check. The count rose from fourteen programs to twenty-two, and the time did not. A worker who waits a minute may take a longer run as hung. Confidence: low. Fix: restate with the time for twenty-two programs, or delete the time.

### interpreter.md

**I1. Line 23.** "gives `Infinity`, with no error, on both paths". Kind: a gotcha that the passage leaves out. The bullet stands in the list "Walk departs from the rules". A worker on the compiled path reads `compiler.md`, "Numerals and sizes depart", and does not find it. It then asserts a value in a compiled test. Confidence: high. Fix: restate. Put the same bullet in `compiler.md`'s list, or move it to `revival-changes.md`, "Numbers", as a departure of both paths.

**I2. Line 23.** "A numeral with a radix point that no place types, and that rounds to an infinity at `RR64`". Kind: a sentence that reads two ways. The bullet does not say what the rules answer. The list's opening asks for the rules' answer in an `XXX` test, "unless the case says otherwise". A worker cannot tell whether the rules refuse the numeral. "That no place types" is also hard to read. Confidence: medium. Fix: restate. "A numeral with a radix point at a place that fixes no type, which rounds to an infinity at its default `RR64`, gives `Infinity`, with no error, on both paths (ledger row 980). The rules refuse it. Write no such numeral in a test."

### revival-changes.md

**R1. Line 7.** "a known departure from a rule, or an open question". Kind: a sentence that reads two ways. The next sentence, "A fix can change it", fits a departure only. A worker cannot tell an open question from a departure, or what to do with one. Confidence: medium. Fix: restate. "A sentence that cites a ledger row states a behaviour that is not settled: a known departure from a rule, or a case that the rules do not decide yet. Either can change, so ..."

**R2. Line 7.** "in a plain test". Kind: a term not defined where it is used. A worker must search `tests-writing.md` to learn that it means a test without the `XXX` prefix. Confidence: low. Fix: define the term. "in a plain test, one without the `XXX` prefix (`tests-writing.md`)".

**R3. Line 11.** "at every instance that the argument types allow". Kind: a sentence that reads two ways. "The argument types" names no call. A worker cannot tell which instances are meant. Confidence: medium. Fix: restate. "... at every instance at which both declarations accept the same arguments, not at one only."

**R4. Line 13.** "a value has one instance of a generic type. So where both declarations name one generic type at a position". Kind: a sentence that reads two ways. "One" reads as "a single" or as "the same". Confidence: low. Fix: restate. "By the exclusion rule, a value has at most one instance of a given generic type. So where both declarations name the same generic type at a position, ..."

**R5. Line 34.** "at the limits that `interpreter.md` gives". Kind: a passage that makes the worker search. It names no section of a part of 154 lines. Confidence: low. Fix: restate with the section's name.

**R6. Line 43.** "In two cases walk does not read `self` so, and its load check refuses the valid pair". Kind: a gotcha that the passage leaves out. The two cases cite no ledger row and give no way round. By line 7 a worker cannot tell whether they are known. It may record them again as new defects. Confidence: low. Fix: restate with the rows, and with what to write instead.

**R7. Line 55.** "Walk departs for numbers of two run-time types at one position: it refuses them, as `(1,2) < (1,2.5)` (row 511)." Kind: a gotcha that the passage leaves out. It does not say what the rule answers for that comparison. A worker cannot write the `XXX` test's assertion. Confidence: medium. Fix: restate. Add the rule's answer for `(1,2) < (1,2.5)`.

**R8. Line 93.** "Walk's message depends on the place: a top-level binding gives 'Type mismatch binding'." Kind: a passage that makes the worker search. A test of a refusal at a parameter, a field or a return needs the message, and the passage gives one of five. Confidence: low. Fix: restate. Give the other messages, or say that a test of another place asserts the refusal without the message.

**R9. Line 93.** "for `t: RR64 = 10.0^308`, `t TIMES 10.0` is `Infinity` under walk. `x.isInfinite` tests for one." Kind: a gotcha that the passage leaves out. It says nothing of the compiled path. A worker cannot tell whether the same lines compile and give `Infinity` there, or whether the prelude has `isInfinite`. Confidence: medium. Fix: restate. Say what the compiled path does, or add "on both paths".

### tests-writing.md

**T1. Line 138.** "Under walk, a parallel range of sixteen elements or fewer ... runs its bodies in index order." Kind: a gotcha that the passage leaves out. It says nothing of the compiled path, where `compiler.md` line 107 says that some constructs do not fork at all. The bullet also stands under "Names, comments, citations", where a worker who writes a parallel test may not look. Confidence: low. Fix: restate. Add a pointer: "For the compiled path, see `compiler.md`, "Traps of the compiled path"."

## 4. The undefined terms

- "named functions": compiler.md line 107.
- "fork", of a call's arguments: compiler.md line 107.
- "plain test": revival-changes.md line 7.
- "open question", of a ledger row: revival-changes.md line 7.
- "that no place types": interpreter.md line 23.
- "deciding elements": revival-changes.md line 55.
- "parallel range": tests-writing.md line 138.

## 5. The gotchas

- A worker asserts a value for an untyped numeral that rounds to an infinity in a compiled test, because the both-paths departure stands only in walk's list: interpreter.md line 23.
- A worker writes a compiled test of a race with a `for` loop and takes a pass as evidence, not knowing whether the loop's bodies run in parallel: compiler.md line 107.
- A worker passes an `atomic` block as an operator's right operand and meets the `VerifyError`, because the passage speaks of a call's arguments only: compiler.md line 108.
- A worker sets `run_exits_nonzero=true` in a test of a coercion that does not raise: compiler.md line 65.
- A worker cannot write the assertion of an `XXX` test for `(1,2) < (1,2.5)`, because the rule's answer is missing: revival-changes.md line 55.
- A worker copies the infinity recipe into a compiled test, where the passage promises nothing: revival-changes.md line 93.
- A worker records walk's two `self` cases as new defects, because they cite no ledger row: revival-changes.md line 43.

## 6. The count

Flags: 19. High 1, medium 11, low 7. Lint hits: 0.
