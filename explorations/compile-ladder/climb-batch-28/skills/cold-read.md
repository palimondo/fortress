# Cold read: fortress-repo, from base f5aa647de

Reader: a worker new to the repository. Parts judged: `SKILL.md`, `references/compiler.md`, `references/interpreter.md`, `references/records.md` and `references/revival-changes.md`, as changed from `f5aa647de` to `HEAD` (`6415622f9`). `references/sources.md` also changed in that range. The task did not name it, so I did not judge it.

## 1. The lint

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/SKILL.md .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/records.md .claude/skills/fortress-repo/references/revival-changes.md

Output: none. It printed no line and exited 0.

## 2. What I would do differently, section by section

- `SKILL.md`, "Parallelism and mutable state" (line 123). I would expect a compiled `atomic` block to track array elements only from the switch-over. Before it, I would take the compiled tracking to cover mutable variables only. The sentence says nothing of walk.
- `compiler.md`, "What the two paths share" (line 26). Nothing new. An edit of a `nativeHelpers/` class reaches both paths, as before. Only the pointer to "Natives" went.
- `compiler.md`, "What the code generator does" (lines 62-67). Nothing. Two back references went.
- `compiler.md`, "The runtime" (line 74). If I edit `FortressArrayStore.java`, I would treat it as transaction code and do the four-thread atomic runs (line 170). I would not know which path runs the class today, or how to test an edit of it before the switch-over.
- `compiler.md`, "Natives" (lines 80, 87, 98, 100). Nothing new to do: I still test a binding with `compile`. I lose two warnings: that in a suite a `parse` or `api` result depends on an earlier compile in the same JVM, and that a result declared `UnsignedLong` gets no transfer helper.
- `compiler.md`, "Traps of the compiled path" (line 107). Nothing. The provenance went.
- `compiler.md`, "The checker's gaps" (line 112). Nothing. The back reference went.
- `compiler.md`, "The checker's time", step 4 (line 214). If my second pass changed no code, I would skip the `pass` count run and the second `ant testQuick`, and report `change` in place of `pass`.
- `interpreter.md`, "Natives" (line 98). I could bind a helper over `JavaBufferedReader`, carried in `FortressBufferedReader`, as for the writer.
- `interpreter.md`, "Natives" (line 128). I could pass a message to `Utility.makeFortressException` as a second argument. I would not rely on the message under walk, which drops it. I would not know if I may raise `FailCalled` from a helper.
- `records.md`, "The repository's history" (line 116). If `git diff a874948ac -- FILE` fails, I would run `git rev-parse --is-shallow-repository`. On `true`, I would take a file with a Sun or Oracle copyright header as the team's. I would not know what to do when my task needs the revival's changes in such a file.
- `revival-changes.md`, "Dispatch and overloading" (line 24). Nothing. "because" corrects the reason; the fix it gives is the same.
- `revival-changes.md`, "Numbers" (line 93). To narrow an integer or change its sign, I would write a getter, as `x.asZZ32`, where an out-of-range value must raise. I would write `narrow`, `widen`, `signed`, `unsigned` or `big` where I want the low bits. On a `ZZ`, I would write a getter or `big`. In a compiled test before the switch-over, I would avoid getters on `ZZ`, `big`, and a low-bits function that keeps the type. I could not tell which 8 getters the compiler's prelude has, or the result type of each low-bits function.

Second question: no changed passage holds repair history. I found no other detail that changes no action, beyond the flags below.

## 3. The flags

### SKILL.md

**S1. Line 123.** "Inside an `atomic` block, the compiled code tracks each mutable variable, and from the switch-over each array element, that the block reads or writes"
- Kind: a sentence that reads two ways; register (one sentence carries two rules).
- Problem: the inserted clause splits "tracks" from "that the block reads or writes", so a reader can take "from the switch-over" to bound the variables too, or miss that no element is tracked today.
- Confidence: low.
- Fix: restate: "Inside an `atomic` block, the compiled code tracks each mutable variable that the block reads or writes. From the switch-over, it also tracks each array element that the block reads or writes (`references/compiler.md`)."

### compiler.md

**C1. Line 26.** "Both paths run the helpers of `nativeHelpers/` (`simpleIntArith.java`)."
- Kind: a term not defined where it is used.
- Problem: "helper" is defined only at line 80, and the change removed the pointer to it, so the reader meets the word here with no meaning and no link.
- Confidence: low.
- Fix: restate: "Both paths run the helpers, the public static methods of the classes under `nativeHelpers/`, as in `simpleIntArith.java`."

**C2. Line 74.** "In the one library's arrays, which compiled programs use from the switch-over, it also tracks each element that the block touches, by array and index (`compiler/runtimeValues/FortressArrayStore.java`, `TXReadSlot`, `TXWriteSlot`)."
- Kind: a gotcha left out.
- Problem: the sentence does not say whether walk runs `FortressArrayStore` today, or whether walk's `atomic` tracks the elements, so a worker who edits the class does not know which path's tests reach it (`SKILL.md` line 62 asks for both paths only for shared phases and `nativeHelpers/` classes), and a compiled test cannot reach the one library before the switch-over (line 89).
- Confidence: medium.
- Fix: restate, adding one sentence after it: "Walk [runs / does not run] this class today[, and its `atomic` does / does not track the elements]. Test an edit of it with [the test or run that reaches it]." The writer fills the brackets from the source.

**C3. Line 74.** "`TXReadSlot`, `TXWriteSlot`"
- Kind: a term not defined where it is used.
- Problem: the reader cannot tell whether these are classes, nested classes of `FortressArrayStore` or methods, and must grep for them.
- Confidence: low.
- Fix: restate: "(`compiler/runtimeValues/FortressArrayStore.java`, its [classes / methods] `TXReadSlot` and `TXWriteSlot`)", with the kind stated.

**C4. Line 87, the deleted sentence.** Removed: "In a suite, the result of `parse` or `api` depends on whether a compile ran earlier in the same JVM."
- Kind: a gotcha left out.
- Problem: the remaining text ties the rewrite to an earlier compile "in the same JVM" but no longer says that a suite runs its tests in one JVM, so a worker who sees a test with a `parse` step pass alone and fail in a suite, or the reverse, has no cause to link it to.
- Confidence: low.
- Fix: restate the paragraph's last sentence: "Test a binding with `compile`, not with `parse` or `api`: in a suite, their result depends on whether a compile ran earlier in the same JVM."

**C5. Line 98, the deleted sentence.** Removed: "A result declared `UnsignedLong` gets none, and the library declares no such result."
- Kind: a gotcha left out.
- Problem: the remaining list ("or a parameter or `self` the type `UnsignedLong`") leaves the result case to inference, so a worker who adds a binding with an `UnsignedLong` result over a `long` helper is not told that it gets no transfer helper.
- Confidence: low.
- Fix: restate, after the sentence that ends "the matching transfer helper": "A result declared `UnsignedLong` gets none."

**C6. Line 214.** "If it changed nothing, cite `change` as `pass`."
- Kind: a sentence that reads two ways.
- Problem: "cite as" can mean naming the `change` run in the report or copying its table under the name `pass`, and step 6 still asks the worker to show "that `pass` has the same results as `change`", which it may take as a run to do.
- Confidence: low.
- Fix: restate: "If it changed nothing, run neither, and report `change`'s results in place of `pass`'s."

### interpreter.md

**I1. Line 128.** "A message can follow as a second argument, as for `FailCalled`."
- Kind: a sentence that reads two ways; a claim that a worker could not check.
- Problem: "as for `FailCalled`" names no place in the code, so the worker must search for the call, and it does not say whether `FailCalled` is an exception that "both libraries declare as an object", which the sentences after it require of every exception that a helper raises.
- Confidence: medium.
- Fix: restate: "A message can follow as a second argument, as in `<file>:<line>`, which raises `FailCalled`." Then, after "without the message", state whether a helper may raise `FailCalled`.

### records.md

**R1. Line 116.** "In a shallow clone, these commits do not resolve, so the commands above fail. Then `git rev-parse --is-shallow-repository` prints `true`."
- Kind: a sentence that reads two ways; register (the condition comes last).
- Problem: "Then" can mean "after that, run" or "in that case", and the worker meets the failure before the check that explains it.
- Confidence: low.
- Fix: restate: "If the commands above fail, run `git rev-parse --is-shallow-repository`. It prints `true` in a shallow clone, where these commits do not resolve."

**R2. Line 116.** "Tell the team's files there by their copyright header, of Sun Microsystems or Oracle, as in `Library/Format.fss`."
- Kind: a gotcha left out; register ("Tell" for "identify").
- Problem: a header marks who made the file, not who wrote each line, so a worker who uses it for authorship credits the team with lines of the Java 9 port (`8fe1daa8f`, line 119) or of the revival's later edits, and the passage gives no step for a task that needs what the revival changed in a file.
- Confidence: medium.
- Fix: restate: "There, a copyright header of Sun Microsystems or Oracle, as in `Library/Format.fss`, marks a file that the team made. It does not show which of its lines the port or the revival changed. If your task needs that, [fetch the full history with `git fetch --unshallow` / say in your report that the clone is shallow]." The writer picks the step.

### revival-changes.md

All six flags are on the new rule at line 93 (P-161).

**V1. Line 93.** "Under walk, each fixed-width type has all five, and one that keeps the type returns the value, as `widen` of a `ZZ64`. Of the five, `ZZ` has only `big`, so `narrow(z)` finds no declaration: write `z.asZZ32`."
- Kind: a sentence that reads two ways.
- Problem: the rule lists five getters and then five low-bits functions, so "all five" and "Of the five" can mean either list, and `z` is not said to be a `ZZ`.
- Confidence: high.
- Fix: restate: "In the interpreter's library, each fixed-width type has all five low-bits functions. One that keeps the type returns the value, as `widen` of a `ZZ64`. Of the five functions, `ZZ` has only `big`. So for a `ZZ` value `z`, `narrow(z)` finds no declaration: write `z.asZZ32`."

**V2. Line 93.** "The functions `narrow`, `widen`, `signed`, `unsigned` and `big` keep the low bits and never raise"
- Kind: a term not defined where it is used.
- Problem: the rule gives neither the result type of each function nor which types are "fixed-width", so a worker must guess, for example, whether `widen` of an `NN32` gives an `NN64` or a `ZZ64`.
- Confidence: medium.
- Fix: define: add one sentence of this form, which the writer confirms from the library: "The fixed-width types are `ZZ32`, `ZZ64`, `NN32` and `NN64`. `narrow` gives the type of the same sign at half the width, `widen` at twice the width, `signed` and `unsigned` the type of the same width at that sign, and `big` a `ZZ`."

**V3. Line 93.** "To convert a value, write a getter: `asZZ32`, `asZZ64`, `asNN32`, `asNN64` or `asZZ`."
- Kind: a gotcha left out.
- Problem: the call form appears only later, in `z.asZZ32`, and the next rule calls `asFloat(x)` as a function, so a worker who copies that form may write `asZZ32(x)`.
- Confidence: medium.
- Fix: restate: "To convert a value, write a getter, as `x.asZZ32`: `asZZ32`, `asZZ64`, `asNN32`, `asNN64` or `asZZ`."

**V4. Line 93.** "Until the switch-over, the compiler's prelude has only 8 of the getters, `ZZ64`'s `asZZ32` among them, none on `ZZ`, and no `big`."
- Kind: a claim that a worker could not check.
- Problem: the worker learns that 8 getters exist but not which, so before it writes a getter in a compiled test it must search the prelude's three files, and it cannot tell whether the 8 count the `bitsAs…` getters.
- Confidence: medium.
- Fix: restate, with the list: "Until the switch-over, the compiler's prelude has only these getters: [the 8, by type]. It has none on `ZZ`, and no `big`."

**V5. Line 93.** "Under walk, each fixed-width type has all five"
- Kind: a sentence that reads two ways.
- Problem: "Under walk" can mean a behaviour of walk alone or a fact of the interpreter's library, which the checker also reads in the count stage, and the rules beside it say "In the interpreter's library" for the same kind of fact (line 97).
- Confidence: low.
- Fix: restate as in V1: "In the interpreter's library, each fixed-width type has all five low-bits functions."

**V6. Line 93.** "A fixed-width type's `bitsAs…` getter gives its bits at the other sign, as `bitsAsNN32` of a `ZZ32`."
- Kind: a term not defined where it is used.
- Problem: the ellipsis leaves the names to guess, and the sentence does not say how `bitsAsNN32` of a `ZZ32` differs from `unsigned` of it, so a worker cannot choose between the two, and the bold title names no third kind of conversion.
- Confidence: low.
- Fix: restate: "Each fixed-width type also has a getter `bitsAs<T>`, for the type `T` of the same width and the other sign, as `bitsAsNN32` of a `ZZ32`. [It gives the same result as `unsigned` / It differs from `unsigned` in ...]." The writer states the difference, or deletes the sentence if there is none that changes an action.

## 4. Undefined terms

- "helper": `compiler.md` line 26 (defined only at line 80).
- `TXReadSlot`, `TXWriteSlot`: `compiler.md` line 74.
- "fixed-width type": `revival-changes.md` line 93.
- the result types of `narrow`, `widen`, `signed`, `unsigned` and `big`: `revival-changes.md` line 93.
- `bitsAs…`: `revival-changes.md` line 93.

## 5. Gotchas

- `compiler.md` line 74: a worker edits `FortressArrayStore.java` and tests it on the wrong path, or on none, because the part does not say which path runs it today.
- `SKILL.md` line 123 with `compiler.md` line 74: a worker writing a compiled test today with an element write of a `ZZ32Vector` inside `atomic` must infer that the element is not tracked; nothing says so.
- `compiler.md` line 87: a worker sees a test with a `parse` step change its result between a run alone and a suite, and has no cause to link it to.
- `compiler.md` line 98: a worker binds an `UnsignedLong` result over a `long` helper and expects a transfer helper.
- `interpreter.md` line 128: a worker raises `FailCalled` from a helper without knowing whether both libraries declare it as an object, or asserts the message and gets none under walk.
- `records.md` line 116: in a shallow clone, a worker credits the team with the port's or the revival's lines in a file with a Sun or Oracle header.
- `records.md` line 116: a worker whose task needs the revival's changes in a file has no step to get them in a shallow clone.
- `revival-changes.md` line 93: a worker writes `asZZ32(x)` by analogy with `asFloat(x)` in the next rule.
- `revival-changes.md` line 93: a worker writes, in a compiled test before the switch-over, a getter that the prelude lacks.

## 6. Count

Flags: 16. High: 1. Medium: 6. Low: 9. Lint hits: 0.
