I fixed 20 of the cold reader's 25 flags, deleted one number, and left four for the reasons below. It's one commit, `8952ab6296` ("fortress-repo: the cold read of climb batch 33's landing"), with no lint hits. I did not push.

## What a worker would have got wrong, and what the text says now

- **`build-and-caches.md`, "The caches".**
  - "A caches folder holds one library's jars" could read as "the one library's jars", the reverse of what it meant. It now says "the jars of a single library".
  - "The class path scripts" were never named. They are now `bin/fortress_classpath` and `bin/run_classpath`, which `bin/fortress` and `bin/run` call.
  - The warning about the property read as if the scripts made the compile write to `caches-one`. Now it says: with the property alone, the compile writes to `caches-one`, but the run looks in `caches` and prints 'Could not load P'.
  - A worker could not tell whether to run the library order with the variable set. It now says to run it without the variable, because it fills `caches` with the prelude's jars.
- **`compiler.md`, prelude section.** The list of three prelude files came right after "the one library", so it read as that library's files. The files now come first, then: "With `FORTRESS_LIBRARY=one`, it uses the one library in their place."
- **`compiler.md`, "The runtime".** "Owner" is ASM's word, so a worker could misread it. It now says "the class file of the called method's class". I also deleted the record number, which only gave provenance.
- **`compiler.md`, traps.**
  - The two numeral refusals (rows 1074, 1075) quoted no message, so a worker who met one could not match it. Both messages are now quoted.
  - The walk half of row 964 was vague. Now: "Walk stops on the same clause when it evaluates the `typecase`, with the same message."
  - Rows 1067 and 1072 called the binder "a clause's name", and row 1072 needed its example rebuilt to understand it. Both now use "binder", and row 1072 explains step by step how the binder gets its type and which call is refused.
  - Row 559 told workers to avoid a function expression of intersection type without showing what one looks like. It now gives `fn () => choose(m)` and how its type arises, with the test file.
- **`interpreter.md`, "What walk checks".** "By default" hinted at another behaviour without stating it. It now says that with the variable, `fortress typecheck` checks the program against walk's library, but after the compiled path's desugarings. I checked this against `Shell.java`.
- **`revival-changes.md`, "Traits and objects".**
  - A worker could not tell whether the `typecase` failure (row 1070) applies at `X` or only at a type that a `comprises` clause lists. I cut the sentence about the row's test and wrote the workaround at `X`: `do r: X = self; r end`. The ground is F-377, which states the missing cast for both readings of `self`, plus the regression key's run at the self-type parameter.
  - "May fail" for a generic object (row 1052) gave no action. Now: no test covers such a body; before a compiled program relies on one, write a compiled test of it.
- **`revival-changes.md`, "Numbers".**
  - "Still binds … with no message" clashed with the compiled refusal quoted next. Now: an undefined name in a tuple arm is still read as a binder that takes any element, on both paths, and no message names it undefined.
  - The reason for `x: Any =>` is now given: the team's `x =>` reads `x` as a type, and is refused (F-382).
  - "In their place, write `ZZ32` …" sat four sentences after the names it refers to. It now follows 'Float is undefined.' directly.
- **`tests-writing.md`, test folders.** "A wall that only the one library shows" was undefined. Now it is "a test whose program compiles against the one library, for a defect that only that library shows". It adds that a plain test there gets a `compile` command only, because a program compiled so does not run yet (row 1062). Without that, a worker would add `link` and `run` and get a red test.
- **`SKILL.md`, "The phases".** `FORTRESS_LIBRARY` is now called an environment variable.

## Flags left

- **`library.md`, "by default".** Deleting the words makes the sentence false. Adding a typecheck with the variable as a step for a library edit would change the steps listed below it, and the record does not settle that it is a valid check. So it is a decision not taken. The alternatives:
  - add `FORTRESS_LIBRARY=one fortress typecheck` to those steps;
  - state that it is not a step.
- **`tests-running.md`, one test of `one_library_tests/`.** The record gives no command for one file. I could not run one, because the shell's permission rules blocked the setup. `junit.sh` cleans only `caches`, so it likely does not fit. Leaving it unchanged was better than writing an unverified command.
- **`tests-running.md`, `testQuick` for a checker edit.** Adding `ant testOneLibrary` to the rule would change which suites a checker edit runs. It is a decision not taken. The alternatives are to add the target or to keep the rule as it is.
- **`revival-changes.md`, the clause "also from an arm of a conditional … or a local function".** I kept it. The earlier skill and old notes said these shapes fail, and this one clause corrects that assumption.
- **Moving the walk half of row 964 out of `compiler.md`.** I only reworded it. Putting the rule where walk workers read it is a placement choice for the next consolidation.

## For the coordinator

- The installed `revival-changes.md` no longer matches the orientation folder's `orientation.md` byte for byte. Row 1070's workaround is now at `X`, and the regression key's case 35 (d) already expects that form.
- A command to run one `one_library_tests/` file, such as `FORTRESS_LIBRARY=one ../bin/fortress junit one_library_tests/X.test`, needs a run to confirm it.
---
session be89447a-db97-47f4-9dea-6bea7fcefc92 turns 24 cache writes 32516 reads 2012564 output 13665 labels {'ephemeral_1h_input_tokens': 32490, 'ephemeral_5m_input_tokens': 0}
