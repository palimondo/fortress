# Cold read: fortress-repo, changed parts since ddfa65d88

Skill: `fortress-repo`, read as a worker new to the repository. Base: `ddfa65d88`. Head: `abd58e52a0`. Parts judged: `references/compiler.md`, `references/interpreter.md`, `references/revival-changes.md`, `references/worktrees.md`. The diff also touches `references/sources.md`. The task did not name it, so this read does not judge it.

## 1. The lint's output

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/revival-changes.md .claude/skills/fortress-repo/references/worktrees.md

Output: nothing. Exit status 0. No lint hits.

## 2. What I would do differently, section by section

No changed section holds repair history. The removals take text out and leave no trace of it. So the second question finds nothing, and no flag below is of that kind.

- `compiler.md`, "Traps of the compiled path", the last bullet (line 171). I would give each value parameter of an exported object the api's name. I would not trust a clean link or the export check to catch a mismatch. Limit: the trap is a read from a component that imports the api. The bullet no longer lists other calls that die with `NoSuchMethodError`, so I would write a functional-method call on an object that a `comprises` clause lists, and an assignment to a `var` field from outside, without a workaround.
- `interpreter.md`, "How walk evaluates a program", the departures from "Numbers" (line 29). I would not write a numeral type as a return type, a variable's type or a field's type. I would not take walk's load as proof that such a program is valid. A test of the case is an `XXX` test that asserts the rules' refusal. I could not state when walk does refuse it: "where a numeral meets it" names no place and no time.
- `interpreter.md`, "What walk checks" (two bullets removed after line 79). Nothing new to do. I would no longer expect walk to refuse a generic declaration with a tuple result beside a plain one, or to load two generic dotted methods of different lengths and fail at the call.
- `revival-changes.md`, "Dispatch and overloading" (line 15). I would expect walk to choose by declared domains, except at two generic dotted methods of one name that differ only in their bounds. There it takes "the first". I could not state which one is first, whether the other can ever run, or what to write instead.
- `revival-changes.md`, "Traits and objects", the `Index` rule (line 48). I would write `I extends Index` in library code and in my generic that runs under walk or is checked against the interpreter's library. I would leave it out of a program compiled against the compiler's prelude. I had to work out that a compile with `FORTRESS_LIBRARY=one` counts as "checked against the interpreter's library".
- `revival-changes.md`, "Traits and objects", strict equivalence (lines 57 and 64). I would use `EQV` and `NEQV` on booleans only, under the interpreter's library. On other values I would expect a type error. Against the compiler's prelude, I would expect `===` to behave as `SEQV`, except that strings, `ZZ32`, `ZZ64`, `RR32` and `RR64` compare by `=`. I could not tell whether the prelude declares `≡` and `≢` at all.
- `revival-changes.md`, "Reductions and comprehensions" (line 130). I would not copy a team test that declares `simpleJoin` at `Any` or untyped. "stops" became "fails". This changes no action, and I flag nothing.
- `worktrees.md`, "Seeding a worktree" (lines 36 and 45). In a seeded worktree I would run walk and a compiled program against the prelude at once. If the script warns that the copied build is the base's, I would run `ant compileAll`, then the library order. I could not tell whether a compile with `FORTRESS_LIBRARY=one` is ready, or what step makes it ready. The removed sentence ("Without the warning, `ant compileAll` keeps the seeded caches") leaves no gap: `build-and-caches.md`, "Building", gives when the build keeps the caches.

## 3. The flags

### `references/compiler.md`

**F1. Line 171.**
- Passage: "A read of an exported object's value parameter, from a component that imports the api, dies at run time with `NoSuchMethodError` where the exporting component names the parameter otherwise than the api. A value parameter is a parameter of the object's constructor, and also a field."
- Kind: a term not defined where it is used.
- Problem: the worker meets "value parameter" one sentence before its definition, and the condition comes after a long clause on the effect, so it reads the sentence twice to find when the trap applies.
- Confidence: low.
- Fix: restate the bullet, the definition and the condition first: "- A clean link does not prove that every call has its method. A value parameter is a parameter of an object's constructor, and also a field. The export check compares no value parameter's name. So where the component that exports an object names a value parameter otherwise than the api, as `object Np(z: ZZ32)` for the api's `object Np(a: ZZ32)`, a read of the parameter from a component that imports the api, as `Np(3).a`, dies at run time with `NoSuchMethodError` (ledger row 839). Give each value parameter the api's name."

### `references/interpreter.md`

**F2. Line 29.**
- Passage: "Walk refuses it only where a numeral meets it"
- Kind: a sentence that reads two ways.
- Problem: the worker cannot tell what "a numeral meets it" is (a numeral bound, passed or returned at the type?), whether walk refuses at load or when that place runs, or with which message, so it cannot predict what a program or test does.
- Confidence: medium.
- Fix: restate with the places, the time and the message, for example: "Walk refuses it only when a numeral is bound, passed or returned at that type, as that place runs: '<message>'." The writer gives the true places and message.

**F3. Line 29.**
- Passage: "so `never(x: ZZ32): NaturalNumeral[\1, 10, 3\] = never(x)` runs"
- Kind: a sentence that reads two ways.
- Problem: `never` calls itself without end, so "runs" reads as "a call of it runs"; a worker that calls it in a test gets a run that never ends, while the point is that the declaration loads because its body returns no numeral.
- Confidence: medium.
- Fix: restate: "So walk loads `never(x: ZZ32): NaturalNumeral[\1, 10, 3\] = never(x)`, whose body returns no value (ledger row 1124)."

### `references/revival-changes.md`

**F4. Line 15.**
- Passage: "In a departure, of two generic dotted methods of one name that differ only in their bounds, it keeps the first that it meets (row 1125)."
- Kind: a sentence that reads two ways.
- Problem: "the first that it meets" names no order, right after the bold rule that walk never chooses by the order of the declarations; "keeps" can mean that walk drops the other at load or that it runs the first at each call; "their bounds" does not say that these are the bounds of the methods' static parameters, with the same parameter types.
- Confidence: high.
- Fix: restate, with an example and the order: "Walk departs at two generic dotted methods of one name with the same parameter types, whose static parameters differ only in their bounds, as `m[\T extends Shape\](x: T)` beside `m[\T extends Round\](x: T)`: at every call it runs <the one that the source declares first, or the true order> (row 1125)."

**F5. Line 15.**
- Passage: the same sentence.
- Kind: a gotcha that the passage leaves out.
- Problem: a worker that writes such a pair for walk, as P-45 allows (the `ident` pair of line 11, as dotted methods), gets the first method, not the more specific one, and can get "Cannot unify" where the argument is outside the first one's bound; the passage gives no step to avoid this.
- Confidence: medium.
- Fix: add the step after the restated sentence, for example: "In a program for walk, give the two methods two names." The writer confirms the workaround.

**F6. Line 48.**
- Passage: "and in your own generic over such a type that runs under walk or is checked against the interpreter's library, write `I extends Index`"
- Kind: a sentence that reads two ways.
- Problem: as written, "that runs" attaches to "type", not to the generic, and the worker must work out that a compile with `FORTRESS_LIBRARY=one` is "checked against the interpreter's library".
- Confidence: low.
- Fix: restate: "In the library, write `I extends Index`. In your own generic over such a type, write it where the code runs under walk or compiles with `FORTRESS_LIBRARY=one`."

**F7. Line 57.**
- Passage: "logical equivalence on booleans. The interpreter's library declares it and its negation `≢` (`NEQV`) for booleans only"
- Kind: a sentence that breaks the part's register (one fact said twice).
- Problem: the changed sentence repeats "booleans" from the sentence before it, so the worker reads the same fact twice.
- Confidence: low.
- Fix: restate the changed sentence: "The interpreter's library declares it and its negation `≢` (`NEQV`) on no other type, so on other values each is a type error."

**F8. Line 57.**
- Passage: "The interpreter's library declares it and its negation `≢` (`NEQV`) for booleans only, so on other values each is a type error."
- Kind: a gotcha that the passage leaves out.
- Problem: the paragraph gives the compiler's library's departures for `=` and `≣` but says nothing of `≡` and `≢`, so a worker that writes `EQV` in a compiled program or test before the switch-over cannot tell whether the prelude declares it.
- Confidence: low.
- Fix: add one sentence on the prelude, in the paragraph's form, for example: "Until the switch-over, the compiler's library declares <no `≡` and no `≢` / them at ...>."

### `references/worktrees.md`

**F9. Line 36.**
- Passage: "The new worktree runs walk and the compiled path on the compiler's prelude right away, with the library already compiled."
- Kind: a sentence that reads two ways.
- Problem: "on the compiler's prelude" reads as applying to walk too, which never uses the prelude, and "the library" no longer says which library is already compiled.
- Confidence: medium.
- Fix: restate: "The new worktree runs walk, and the compiled path on the compiler's prelude, right away, with their libraries already compiled."

**F10. Line 36.**
- Passage: the same sentence.
- Kind: a gotcha that the passage leaves out.
- Problem: the sentence now implies that a compiled run with `FORTRESS_LIBRARY=one` is not ready in a new worktree, but gives no step, so a worker that compiles with the variable there gets a failed run and must search for the cause.
- Confidence: medium.
- Fix: add: "Before a compiled run with `FORTRESS_LIBRARY=one`, fill `caches-one` as `build-and-caches.md`, "The caches", says."

## 4. The undefined terms

- "a numeral meets it": `interpreter.md`, line 29.
- "the first that it meets": `revival-changes.md`, line 15.
- "value parameter": `compiler.md`, line 171 (used one sentence before its definition).
- "checked against the interpreter's library", said of a program: `revival-changes.md`, line 48.

## 5. The gotchas

- A worker that writes two generic dotted methods of one name, differing only in their bounds, gets the first one under walk, not the more specific one, and is given no workaround (`revival-changes.md`, line 15).
- A worker that calls `never` to show the case of row 1124 gets a run that never ends (`interpreter.md`, line 29).
- A worker that compiles with `FORTRESS_LIBRARY=one` in a newly seeded worktree gets a failed run, with no step to fill `caches-one` (`worktrees.md`, line 36).
- A worker that writes `EQV` or `NEQV` in a compiled program against the prelude cannot tell whether the prelude declares them (`revival-changes.md`, line 57).

## 6. Count

Flags: 10. High: 1 (F4). Medium: 5 (F2, F3, F5, F9, F10). Low: 4 (F1, F6, F7, F8). Lint hits: 0.
