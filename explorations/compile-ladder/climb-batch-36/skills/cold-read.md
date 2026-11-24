# Cold read: fortress-repo, changed parts since fd103de82

Skill: `fortress-repo`, read as a worker new to the repository. Base: `fd103de82`. Head read: `24872f5a93`. Parts judged: `references/compiler.md`, `references/interpreter.md`, `references/revival-changes.md`. (`references/sources.md` also changed, but the task does not name it, and workers do not load it.)

## 1. The lint's output

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/revival-changes.md

Output: nothing. Exit status 0. No lint hits.

## 2. What I would do differently, section by section

compiler.md, "What the compiled path cannot compile yet" (three bullets deleted from the one-library list, lines 48-50). I would now write, in a one-library run test, a call of a varargs declaration, a reduction over a range, `=` and `<` of two strings and `=` of two booleans. I would still avoid `println` of a number or boolean, `u.asString` in a generic body bounded by `ZZ32`, and an uncaught exception. Limit: against the one library only. The prelude's limits stay.

compiler.md, "Traps of the compiled path", the `RR32` and `RR64` bullet (line 134). In a compiled program, I would write `NOT (r = 0)` for an `RR64` value, and bind an `RR32` value at `RR64` before any `=`, against a numeral or another value. Limit: I cannot tell whether the `RR32` part ends at the switch-over (flag below).

compiler.md, "The checker's gaps" (the "A tie" bullet deleted, between lines 174 and 175). I would no longer look for a tie between two generic candidates first when a compiled test passes alone and fails in its suite. Nothing tells me where to look instead (flag below).

interpreter.md, "How walk evaluates a program", the list of departures from "Numbers" (line 29). I would expect walk to load and run a numeral type written as a static parameter's bound or as a `typecase` arm's type, and to refuse it at load in other places, with the message given. A test of the bound or the arm asserts the refusal, as an `XXX` test (the list's opening sentence, line 24). Limit: "other places" is not listed (flag below).

interpreter.md, "What walk checks", the row 780 departure (line 68). I would expect walk to load a pair of functional methods of a generic trait or object without checking their declared domains, and later to refuse a valid pair whose domains nest. I cannot tell when the refusal comes, so I cannot choose the test's key (flag below).

revival-changes.md, "Dispatch and overloading", "Walk chooses by declared parameter types" (line 15). I would take walk's choice as independent of the order of declarations, with no exception for two generic dotted methods that differ only in their bounds.

revival-changes.md, "Walk's load check is not the verdict of these rules" (line 17). No change of action: before changing code to pass walk's check, I find the case in `interpreter.md`, "What walk checks".

revival-changes.md, "Numbers", a program's own number type (line 99). I would write the coercion's body as `Byte(v)` on both paths, with no `v.asZZ32`. A numeral whose number does not fit the type at its place is refused, statically by the checker and when the place runs under walk.

Second question: no changed sentence holds repair history or detail that changes no action. The deletions remove the history of fixed defects, which is right.

## 3. The flags

### compiler.md

**Flag 1.** compiler.md:134.
- Passage: "At `RR32`, the checker refuses `c = 0`, and `=` of two values compiles and overflows the stack when it runs (ledger row 528). Bind an `RR32` value `c` at `RR64` first, as `r: RR64 = c`, and compare `r`."
- Kind: a sentence that reads two ways.
- Problem: the bullet opens "Until the switch-over, the compiler's prelude declares no `=/=`", so a worker cannot tell whether the new `RR32` refusal and the overflow are limits of the prelude (leave them, `revival-changes.md` line 7) or hold with `FORTRESS_LIBRARY=one` too; "two values" does not say two `RR32` values; and `c` is used one sentence before it is introduced. The refusal also has no message, so a worker who meets it cannot match it to this trap.
- Confidence: medium.
- Fix: restate as a bullet of its own: "At `RR32`, the checker refuses `c = 0` for an `RR32` value `c`: '<message>'. `c = d` for two `RR32` values compiles, and overflows the stack when it runs (ledger row 528). [This holds until the switch-over. | This holds against either library.] Bind `c` at `RR64` first, as `r: RR64 = c`, and compare `r`." The writer keeps the bracketed sentence that holds, and fills in the message.

**Flag 2.** compiler.md:174-175 (the "A tie" bullet, deleted).
- Passage (deleted): "A tie: where two generic candidates fit a call equally, the checker sorts the candidates and keeps the first. ... If a compiled test passes alone and fails in the suite, look for such a tie first."
- Kind: a gotcha that the passage leaves out.
- Problem: `tests-running.md:138` still warns that a test that passes alone can fail beside others, and the deletion removes the only lead the compiled part gave for that case, without saying what the checker now does where two generic candidates fit a call equally (a fixed choice, an ambiguity error, or still the first of a sort).
- Confidence: low.
- Fix: if the checker's choice at a tie no longer depends on what the JVM compiled before, in every case, keep the deletion. Otherwise restore one sentence that says what the checker does at such a tie now, and where a worker looks first.

### interpreter.md

**Flag 3.** interpreter.md:29.
- Passage: "The rules refuse it, as the compiled checker does, and as walk does at load in other places, as a return type: 'NaturalNumeral cannot be written in a program except as a parameter's type.'"
- Kind: a claim that a worker could not check.
- Problem: "other places" is not listed and "as a return type" gives one example, so a worker cannot tell whether walk now refuses at load a numeral type as a variable's or a field's type (the deleted text said walk loaded those), and so whether a test of those places is a plain test or an `XXX` test.
- Confidence: medium.
- Fix: restate, with the list the writer confirms: "The rules refuse it, as the compiled checker does. Walk refuses it at load everywhere else except as a parameter's type: as a return type, a variable's or a field's type, in an `extends` or `comprises` clause, and as a static argument: 'NaturalNumeral cannot be written in a program except as a parameter's type.'"

**Flag 4.** interpreter.md:68.
- Passage: "It compares them at each call, on the instance that the call makes. So when walk first makes an instance of an object that extends the trait, it can refuse a valid pair, one inside the other: 'at least one pair of parameters must have excluding types' (ledger row 780)."
- Kind: a sentence that reads two ways.
- Problem: the "So" sentence moves the check from the call to the first time walk "makes an instance of an object", which reads either as the first construction of an object value at run time or as the first instantiation of the generic type at static arguments (the sense of "instance" on lines 59 and 67); so a worker cannot tell when the refusal shows, whether its test names a refusal at load (`load_exception_contains`) or a failure at run time, which valid pairs "can" be refused, or what happens where the generic declaration is itself an object, which no object extends. "one inside the other" also lacks its noun.
- Confidence: high.
- Fix: restate, with the writer keeping the reading that holds: "At load, it does not check two functional methods of a generic trait or object on their declared domains. [At run time, when the program first constructs a value of an object that extends the trait or is the generic object, | At load, for each object declared to extend the trait at given static arguments,] it checks the pair at that instance, and can refuse a valid pair whose declared domains lie one inside the other: 'at least one pair of parameters must have excluding types' (ledger row 780). [It refuses where ... ; it loads where ... .]"

### revival-changes.md

**Flag 5.** revival-changes.md:99.
- Passage: "A numeral whose number does not fit there is refused: by the checker statically, by walk when the place runs."
- Kind: a sentence that reads two ways.
- Problem: "the place" can be the place in the coercion's body where the static argument converts (the argument of `Byte(v)`) or the place where the program writes the numeral, and walk's message depends on the place (line 95: 'Type mismatch binding' or 'got arg'), so a worker writing a test of the refusal cannot tell which message to match.
- Confidence: low.
- Fix: restate: "A numeral whose number does not fit the type at that place of the body is refused: by the checker statically, and by walk when the coercion runs, at the first run of the place where the numeral is written, with the message of the body's place."

**Flag 6.** revival-changes.md:99 (deleted: "Under walk, write `Byte(v.asZZ32)`, as the one library does").
- Passage (deleted): "Under walk, write `Byte(v.asZZ32)`, as the one library does: the getter raises `IntegerOverflow` outside `ZZ32`'s range."
- Kind: a gotcha that the passage leaves out.
- Problem: `SKILL.md` tells a worker to follow how the library already does a thing, and the deleted text said the one library's coercions convert with `.asZZ32`; if they still do, a worker designing a library coercion copies that form, which raises `IntegerOverflow` where the rule now refuses the numeral.
- Confidence: low.
- Fix: if the one library's coercions now write `Byte(v)`, keep the deletion. Otherwise add: "The one library's own coercions still write `v.asZZ32`; write `Byte(v)` in a new one."

## 4. The undefined terms

- `c` in "refuses `c = 0`": compiler.md:134 (introduced only in the next sentence).
- "an instance of an object" (construction of a value, or instantiation at static arguments): interpreter.md:68.
- "one inside the other" (no noun; the declared domains, by line 69): interpreter.md:68.
- "other places" (where walk refuses a numeral type at load): interpreter.md:29.

## 5. The gotchas

- A worker who meets the `RR32` refusal with `FORTRESS_LIBRARY=one` cannot tell whether it is a prelude limit to leave or a one-library defect to record: compiler.md:134.
- A worker whose compiled test passes alone and fails in its suite has no first place to look, now that the tie bullet is gone: compiler.md:174-175.
- A worker writes a plain test that walk loads a numeral type as a variable's or field's type, or an `XXX` test where walk already refuses it: interpreter.md:29.
- A worker writes the row 780 test with a load-refusal key when the refusal comes at run time, or the reverse; or adds such a pair to a library trait and stops every program that builds an object of it: interpreter.md:68.
- A worker matches the wrong walk message ('got arg' or 'Type mismatch binding') in a test of a numeral too big for a coercion's body: revival-changes.md:99.
- A worker copies `v.asZZ32` from the one library's coercions into a new coercion: revival-changes.md:99.

## 6. Count

Flags: 6. High: 1. Medium: 2. Low: 3. Lint hits: 0.
