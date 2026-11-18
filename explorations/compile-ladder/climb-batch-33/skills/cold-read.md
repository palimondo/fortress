# Cold read: fortress-repo, changed parts since 981c662b2

The skill is `fortress-repo`, read as a worker new to the repository. The parts read: `SKILL.md`, and `references/build-and-caches.md`, `compiler.md`, `interpreter.md`, `library.md`, `revival-changes.md`, `tests-running.md` and `tests-writing.md`. The diff also changes `references/sources.md`. The task does not name it, so this read does not judge it.

## 1. The lint's output

Command, from `/home/user/fortress`:

    python3 explorations/coordinator/tools/skills-lint.py .claude/skills/fortress-repo/SKILL.md .claude/skills/fortress-repo/references/build-and-caches.md .claude/skills/fortress-repo/references/compiler.md .claude/skills/fortress-repo/references/interpreter.md .claude/skills/fortress-repo/references/library.md .claude/skills/fortress-repo/references/revival-changes.md .claude/skills/fortress-repo/references/tests-running.md .claude/skills/fortress-repo/references/tests-writing.md

Output: none. Exit code 0. No lint hits.

## 2. What a worker would do differently, section by section

SKILL.md, "The phases" (line 80). I would not try to run a program compiled with `FORTRESS_LIBRARY=one`. The section does not say what the setting is for. It also does not call it an environment variable.

SKILL.md, "The caches" (line 98). I would look in `default_repository/caches-one/` for the entries of a run with the setting.

build-and-caches.md, "The caches" (line 73). I would export `FORTRESS_LIBRARY=one`, and not pass only `-Dfortress.library=one`. I would read 'Could not load P' as the property set alone, and 'NoClassDefFoundError: fortress/FortressLibrary$String' as the known limit. The section does not bound itself. It does not say whether a walk run or the library order uses `caches-one`.

build-and-caches.md, "Building" (lines 113-114). I would expect a `Caches <folder> ...` line for each of the two folders. I would expect `ant cleanCache` to empty both.

compiler.md, "The compiler's prelude, until the switch-over" (line 32). I would take the setting as the switch between the prelude and the one library. The colon now puts the three prelude files after "the one library", so I could read them as the one library's files.

compiler.md, "The runtime" (line 74). After a failure at a call while a class loads, I would also suspect the class loader's choice of opcode.

compiler.md, "Traps of the compiled path" (lines 117, 128-132):
- line 117: at an untyped binding of a `try`, or a tuple binding of a `case` or a `try`, whose branches end in numerals, I would declare the types.
- line 128: I would give each binder of a `typecase` tuple pattern a type on both paths.
- line 129: I would call a method on the selector, not on a binder typed at a supertrait.
- line 130: the same where the binder's type meets a type parameter with a trait. I could follow this rule only after I rebuilt its example.
- line 131: in a trait with a `comprises` clause, I would bind `self` at the listed type before I read that type's getter.
- line 132: I would write no function expression whose type is an intersection. I could not tell which expressions those are.

compiler.md, "The checker's gaps" (line 154). The removed sentence lifts a limit. The worker gets no new action.

compiler.md, "The `fortress` commands" (line 163). I would know that the setting points `WellKnownNames` and `Types` to the one library.

interpreter.md, "What walk checks" (line 57). By default, nothing changes. "By default" suggests that `FORTRESS_LIBRARY=one fortress typecheck` checks a walk program. The section neither states that nor bounds it.

library.md, "Designing a change" (line 33). Same as interpreter.md. "By default" suggests a third way to see the checker's refusals of a library edit, which the list at lines 51-54 does not hold.

revival-changes.md, "Traits and objects", self-typed traits (line 41). I would return `self` at `X` from a conditional, a `case`, a function expression or a local function. In a `typecase` that gives `self` in one arm and another value in another, I would bind `self` first. I could not tell whether this rule holds at `X`, or only at a type that a `comprises` clause lists. On row 1052 I would do nothing: the text gives no action.

revival-changes.md, line 43. The new row number changes no action.

revival-changes.md, "Numbers", the team's `Int` and the others (line 91). I would write a catch-all arm as `x: Any =>`. I would not trust an undefined name in a tuple arm. I would expect the compiled checker to refuse such an arm over an `Any` selector as unreachable.

tests-running.md, "The two suites" (lines 4, 14-20). I would expect five tracks, four at once, and the onelibrary track to run with the setting.

tests-running.md, "Compiled tests" (line 116). I would run the tests of `one_library_tests/` with `ant testOneLibrary`. The section gives no way to run one such test or a few.

tests-running.md, "One unit-test class, or one track" (line 146). I would use `ant testOneLibrary` for that track alone.

tests-writing.md, "A test program" (line 34). I would still parenthesise `(x[5])^2`. I would no longer expect `x[5]^2` to stop a compile.

tests-writing.md, "Where a test goes" (line 45). I would use `load_exception_contains` for a disambiguator's error under walk.

tests-writing.md, "Where a test goes" (line 52). I would put a test into `one_library_tests/` for a "wall that only the one library shows". I would have to guess what such a wall is, and which commands its `.test` file may hold.

## 3. The flags

### SKILL.md

S1. Line 80.
- Passage: "With `FORTRESS_LIBRARY=one`, `fortress compile` reads the one library instead, and a program compiled so does not run yet".
- Kind: a term not defined where it is used.
- Problem: a worker does not learn that `FORTRESS_LIBRARY` is an environment variable, or the task that sets it, so it searches the parts for both.
- Confidence: low.
- Fix: restate: "With the environment variable `FORTRESS_LIBRARY=one`, `fortress compile` reads the one library instead, and a program compiled so does not run yet. The tests of `one_library_tests/` use it (`references/tests-writing.md`)."

### references/build-and-caches.md

B1. Line 73.
- Passage: "because a caches folder holds one library's jars".
- Kind: a sentence that reads two ways.
- Problem: "one library" is a term of SKILL.md (the interpreter's library), so a worker can read this as "a caches folder holds the one library's jars", the reverse of what the next sentences say.
- Confidence: high.
- Fix: restate: "because a caches folder holds the jars of a single library."

B2. Line 73.
- Passage: "the class path scripts read only the variable".
- Kind: a term not defined where it is used.
- Problem: a worker does not know which scripts these are, so it cannot check the claim or know which commands it covers.
- Confidence: medium.
- Fix: define the term: name the scripts by path, as "`bin/fortress` and `bin/fortress_classpath` read only the variable", with the real names.

B3. Line 73.
- Passage: "Set the variable, not the property `-Dfortress.library=one` alone: the class path scripts read only the variable, so the compile writes to `caches-one` and the run reads `caches`: 'Could not load P'."
- Kind: a sentence that reads two ways.
- Problem: the sentence leaves out that the compiler reads the property, so "read only the variable, so the compile writes to `caches-one`" reads as if the scripts' reading made the compile write there.
- Confidence: medium.
- Fix: restate: "Set the environment variable, not only the property `-Dfortress.library=one`. With the property alone, the compile writes to `caches-one`, but the run looks in `caches` and prints 'Could not load P'."

B4. Line 73.
- Passage: "a run that names no private caches folder uses `default_repository/caches-one` in place of `default_repository/caches`".
- Kind: a gotcha that the passage leaves out.
- Problem: lines 71 and 81 name only `caches`, so a worker that sees `Caches <tree>/default_repository/caches-one started again, empty` cannot tell whether to run the library order with the variable set, or whether a walk run with the variable uses `caches-one`.
- Confidence: low.
- Fix: restate, with the true answer: "The library order fills `caches` only. Run it without the variable." Or the reverse, if the reverse is true.

### references/compiler.md

C1. Line 32.
- Passage: "The compiled path uses the compiler's own prelude, unless `FORTRESS_LIBRARY=one` selects the one library: `LibraryBuiltin/CompilerBuiltin.fss`, `Library/CompilerLibrary.fss` and `Library/CompilerAlgebra.fss`."
- Kind: a sentence that reads two ways.
- Problem: the list after the colon now follows "the one library", so a worker can take the three prelude files for the one library's files.
- Confidence: high.
- Fix: restate: "The compiled path uses the compiler's own prelude: `LibraryBuiltin/CompilerBuiltin.fss`, `Library/CompilerLibrary.fss` and `Library/CompilerAlgebra.fss`. With `FORTRESS_LIBRARY=one`, it uses the one library in their place."

C2. Line 74.
- Passage: "(F-385)".
- Kind: a record entry named as the source of a claim.
- Problem: the number gives only provenance, and the sentence after it already sends a worker that investigates the class loader to rows 408 and 559.
- Confidence: low.
- Fix: delete "(F-385)".

C3. Line 74.
- Passage: "to choose a call's opcode from the owner's class file without loading the owner".
- Kind: a term not defined where it is used.
- Problem: "owner" is ASM's word for the class that a call instruction names; a worker without ASM reads it as the owner of the program or of the call site.
- Confidence: low.
- Fix: restate: "to choose a call's opcode from the class file of the called method's class, without loading that class".

C4. Line 117.
- Passage: "the checker refuses a `try` whose block and `catch` clause end in numerals ... It also refuses a tuple binding to a `case` or a `try` whose branches are numeral tuples".
- Kind: a gotcha that the passage leaves out.
- Problem: the bullet quotes no message, unlike the bullets around it, so a worker that meets the refusal cannot match it to this bullet.
- Confidence: low.
- Fix: restate each sentence with the checker's message quoted, as the next bullets do.

C5. Line 128.
- Passage: "Walk stops on it too when it runs."
- Kind: a sentence that reads two ways.
- Problem: "it" can be the program or the pattern, "stops" can be at load or at evaluation, and no message is given; and a worker on walk reads `interpreter.md`, not this part, so it misses the rule.
- Confidence: medium.
- Fix: restate: "Walk stops too, when it evaluates the `typecase`." Then state the rule once where both paths' workers read it, as `revival-changes.md` or `tests-writing.md`, and point here.

C6. Line 129.
- Passage: "A `typecase` clause's name bound at a trait above the selector's object type fails the JVM's verification at a method call on it".
- Kind: a term not defined where it is used.
- Problem: line 128 calls the same thing a "binder", and "a clause's name" can read as a label of the clause, so a worker must rebuild the example to know what fails.
- Confidence: medium.
- Fix: restate: "Where a `typecase` clause types its binder at a trait above the selector's object type, a method call on the binder fails the JVM's verification, as `typecase a of x: Shape => x.nm()` for `a: Sq` and `object Sq extends Shape` (ledger row 1067)."

C7. Line 130.
- Passage: "The checker refuses a method of a type parameter's bound, called on a clause's name whose type meets that parameter with a trait: `x'.name()` in an arm `x': Marked` over `x: X`, `X extends Shape` (ledger row 1072)."
- Kind: a sentence that reads two ways.
- Problem: the sentence packs the rule, an undefined verb ("meets") and a compressed example into one line, so a worker cannot tell which call is refused without rebuilding the program.
- Confidence: medium.
- Fix: restate: "In a `typecase` over a value `x` of a type parameter `X`, as `X extends Shape`, a clause `x': Marked =>` gives its binder `x'` the type `X & Marked`. The checker refuses a call on `x'` of a method of `X`'s bound, as `x'.name()` for a method `name` of `Shape` (ledger row 1072). Call it on the selector, as `x.name()`."

C8. Line 132.
- Passage: "A function expression whose type is an intersection dies when its closure is made".
- Kind: a claim that a worker could not check.
- Problem: a worker cannot tell which of its function expressions have an intersection type, so it cannot obey "Write none".
- Confidence: medium.
- Fix: restate with one example of the form, taken from the test of ledger row 559, as "A function expression whose type is an intersection, as `<example>`, dies when its closure is made".

### references/interpreter.md

I1. Line 57.
- Passage: "So by default `fortress typecheck` does not check a walk program".
- Kind: a sentence that reads two ways.
- Problem: "by default" tells a worker that `FORTRESS_LIBRARY=one fortress typecheck` does check a walk program, which no part states, and the commands still use the compiled path's desugaring switches.
- Confidence: medium.
- Fix: restate with the fact. If the setting does not make it a check of walk's program: "So `fortress typecheck` does not check a walk program, with or without `FORTRESS_LIBRARY=one`." If it does: "With `FORTRESS_LIBRARY=one`, `fortress typecheck` checks a walk program against the one library, after the compiled path's desugarings."

### references/library.md

L1. Line 33.
- Passage: "The checker's refusals of this library reach you through your brief, or through a run of the count stage (`compiler.md`): by default, `fortress typecheck` checks against the compiler's prelude."
- Kind: a sentence that reads two ways.
- Problem: "by default" suggests a third way, `FORTRESS_LIBRARY=one fortress typecheck`, to see the refusals of a library edit, and then line 54 ("For another component of the one library: no step, until the switch-over.") may be wrong.
- Confidence: medium.
- Fix: if the setting gives no such step, delete "by default,". If it does, restate: "With `FORTRESS_LIBRARY=one`, `fortress typecheck <component>` also shows them", and add it to the steps at lines 51-54.

### references/revival-changes.md

R1. Line 41.
- Passage: "One shape fails the JVM's verification when its class loads: a `typecase` with `self` in one arm and another value in the other (row 1070). The row's test returns `self` at `R`, the type that its trait's `comprises { R }` lists. In that arm, bind `self` at the returned type, as `do r: R = self; r end`."
- Kind: a sentence that reads two ways, and a test named as the source of a rule.
- Problem: by lines 38-39, a trait with `comprises { R }` is not self-typed, so a worker cannot tell whether the failure holds at `X` in a self-typed trait, or only at a type that a `comprises` clause lists.
- Confidence: high.
- Fix: delete "The row's test returns ... lists." and state the shape at its real scope. If it holds at `X`: "One shape fails the JVM's verification when its class loads: a `typecase` that gives `self` in one arm and another value in another (row 1070). In that arm, bind `self` at the result type first, as `do s: X = self; s end`." If it holds only at a listed type, move the rule to `compiler.md`, "Traps of the compiled path", beside the `comprises` trap of ledger row 1071.

R2. Line 41.
- Passage: "For a generic object that lists `T` first in its `extends` clause, no test runs such a body, and it may fail when the class loads (row 1052)."
- Kind: a claim that a worker could not check.
- Problem: "may fail" gives no action, and the earlier fix (declare the method in `T` without a body) is gone, so a worker does not know whether to write such a body.
- Confidence: medium.
- Fix: restate: "For a generic object that lists `T` first in its `extends` clause, no test covers such a body (row 1052). Before a compiled program relies on one, write a compiled test of it."

R3. Line 41.
- Passage: "also from an arm of a conditional or a `case` expression, a function expression or a local function".
- Kind: repair history that changes no action.
- Problem: the list names the shapes that failed before; a worker new to the tree has no reason to expect them to fail, so the words only lengthen the rule.
- Confidence: low.
- Fix: delete the clause, so the sentence reads "A compiled body of `T` that returns `self` at `X` runs."

R4. Line 91.
- Passage: "An undefined name in a tuple arm still binds on both paths, with no message (row 1064)."
- Kind: a sentence that reads two ways.
- Problem: "binds" can mean that the arm matches or that the name becomes a variable, and "with no message" clashes with the next sentence, where the compiled checker refuses the arm with a message.
- Confidence: medium.
- Fix: restate: "In a tuple arm, an undefined name is read as a binder that takes any element, and no message names it undefined (row 1064)."

R5. Line 91.
- Passage: "Write an arm over every value as `x: Any =>`, not as the team's `x =>`."
- Kind: a gotcha that the passage leaves out.
- Problem: the sentence does not say what `x =>` does, so a worker cannot tell the rule's reason from a style choice.
- Confidence: low.
- Fix: restate: "Write an arm over every value as `x: Any =>`. The team's `x =>` reads `x` as a type, which is undefined."

R6. Line 91.
- Passage: "In their place, write `ZZ32` for `Int`, ..."
- Kind: a sentence that reads two ways.
- Problem: "their" now stands four sentences after its antecedent, after the tuple-arm sentences, so it can read as the undefined names of a tuple arm.
- Confidence: low.
- Fix: move the sentence to follow "'Float is undefined.'".

### references/tests-running.md

T1. Line 116.
- Passage: "The tests of `one_library_tests/` compile against the one library: run them with `ant testOneLibrary`."
- Kind: a gotcha that the passage leaves out.
- Problem: the section is "One test, or a few", and `tests-writing.md`, "The order", asks to see a new test fail through `harness-one.sh` or `junit.sh`, but a worker gets only the whole track, with no time and no way to name one file.
- Confidence: medium.
- Fix: restate with the command for one file, as "`FORTRESS_LIBRARY=one ONE_JVM=1 .../junit.sh <label> ProjectFortress/one_library_tests X.test`", if it works. If it does not, say so and give the track's time: "No script runs one of them. `ant testOneLibrary` runs them all, in about N minutes."

T2. Line 70, outside the change.
- Passage: "For the checker, run `ant testQuick`: the compiler, othercompiler and library tracks at once (below)."
- Kind: a gotcha that the change makes.
- Problem: the new onelibrary track also runs the checker, so a worker that edits the checker and runs `ant testQuick` skips the tests that compile against the one library.
- Confidence: low.
- Fix: restate, if the track belongs there: "For the checker, run `ant testQuick` and `ant testOneLibrary`."

### references/tests-writing.md

W1. Line 52.
- Passage: "`one_library_tests/`: a wall that only the one library shows."
- Kind: a term not defined where it is used.
- Problem: `compiler.md` defines only a "code-generator wall", and the entry reads as if the folder were the wall, so a worker cannot tell whether a checker refusal or a link failure against the one library goes here.
- Confidence: high.
- Fix: restate: "`one_library_tests/`: a compile that fails only against the one library. Its tests compile with `FORTRESS_LIBRARY=one`, and `ant testOneLibrary` and `testFast` run them." Use the true kinds of failure in place of "a compile that fails".

W2. Line 52.
- Passage: "Its tests compile with `FORTRESS_LIBRARY=one`, and `ant testOneLibrary` and `testFast` run them."
- Kind: a gotcha that the passage leaves out.
- Problem: a program compiled so dies at its first library class (`build-and-caches.md`, "The caches"), so a worker that gives such a test a `link` and `run` pair, as this part teaches for other compiled tests, gets a red test.
- Confidence: medium.
- Fix: add: "Give such a test only a `compile` or `typecheck` command: a program compiled so does not run yet."

## 4. The undefined terms

- `FORTRESS_LIBRARY`, not called an environment variable: `SKILL.md`, line 80.
- "one library's jars", which clashes with the defined term "one library": `references/build-and-caches.md`, line 73.
- "the class path scripts": `references/build-and-caches.md`, line 73.
- "owner" of a call: `references/compiler.md`, line 74.
- "a clause's name", the binder that line 128 calls a "binder": `references/compiler.md`, line 129.
- "meets", a verb for a type's meet: `references/compiler.md`, line 130.
- "a wall that only the one library shows": `references/tests-writing.md`, line 52.

## 5. The gotchas

- A worker gives a test of `one_library_tests/` a `link` and `run` pair, and the run dies at its first library class: `references/tests-writing.md`, line 52.
- A worker cannot see one new test of `one_library_tests/` fail through a script, as "The order" asks, because only the whole track is given: `references/tests-running.md`, line 116.
- A worker who edits the checker runs `ant testQuick` and skips the onelibrary track: `references/tests-running.md`, line 70.
- A worker who sees `Caches ... caches-one started again, empty` cannot tell whether to run the library order with the variable: `references/build-and-caches.md`, lines 73 and 81.
- A worker on walk misses that walk also stops on an untyped tuple binder in a `typecase`, because the rule is only in the compiled part: `references/compiler.md`, line 128.
- A worker runs `FORTRESS_LIBRARY=one fortress typecheck` as a check of a walk program or of a library edit, a use that no part states or bounds: `references/interpreter.md`, line 57, and `references/library.md`, line 33.
- A worker applies the `typecase` fix for `self` at `X` when the row holds at a listed type, or the reverse: `references/revival-changes.md`, line 41.
- A worker writes the body of row 1052 with no warning that it should test it first, because the old fix is gone and no new action replaces it: `references/revival-changes.md`, line 41.
- A worker meets the checker's refusal of rows 1074 and 1075 and cannot match it, because no message is quoted: `references/compiler.md`, line 117.

## 6. The count

- Flags: 25. High: 4 (B1, C1, R1, W1). Medium: 12 (B2, B3, C5, C6, C7, C8, I1, L1, R2, R4, T1, W2). Low: 9 (S1, B4, C2, C3, C4, R3, R5, R6, T2).
- Lint hits: 0.
