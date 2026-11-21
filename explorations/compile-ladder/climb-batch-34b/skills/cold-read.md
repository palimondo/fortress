# Cold read of fortress-repo, base 8965c32e0

The skill: `fortress-repo`, read as a worker new to the repository. The parts read: `SKILL.md`, `references/build-and-caches.md`, `compiler.md`, `interpreter.md`, `library.md`, `tests-running.md` and `tests-writing.md`. The diff also changes `references/sources.md`, which the task does not name. I did not judge it.

## 1. The lint's output

    python3 explorations/coordinator/tools/skills-lint.py <the seven parts>

It printed nothing and exited 0. No hits.

## 2. What I would do differently, section by section

- `SKILL.md`, "How a program runs" (line 80): I would expect a program compiled with `FORTRESS_LIBRARY=one` to run, and to fail only at some constructs. To learn which, I would search all of `compiler.md`, because the pointer names no section. The limit, that the jars must be in the caches folder, is only in `build-and-caches.md`.
- `SKILL.md`, "The compiled runtime" (line 94): Against either compiled library, an `RR64` is a boxed object whose class extends `FRR64`. This changes no action.
- `build-and-caches.md`, "The caches" (line 73): Before I run a program compiled with the variable, I make sure that its caches folder holds the jars of the fourteen components that `OneLibraryComponents.test` compiles. I would not know how to put them in `default_repository/caches-one`, the folder that this paragraph is about.
- `compiler.md`, "What the two paths share" (line 21): The classes in `compiler/runtimeValues/` are the base classes of the number objects of both compiled libraries, and under the one library also of `Boolean`, `Char` and `FlatString`. This changes no action.
- `compiler.md`, "The compiler's prelude, until the switch-over" (line 32): If I change a runtime class such as `FValue` or `FException`, I look for its copy under `ProjectFortress/src-one` and change both. With the variable, the class path takes `build-one` first. I would not know what builds `build-one`.
- `compiler.md`, "What the compiled path cannot compile yet" (lines 45 to 56): Against the one library, six constructs fail at run time where walk runs them. I would keep them out of a one-library run test, but the section does not say what to write instead. When several compiles share a JVM, I compile `FortressLibrary` first.
- `compiler.md`, "Traps of the compiled path" (line 157): On the compiled path, I do not compare a caught exception with its object by `SEQV`. The trap gives no other way to test it.
- `interpreter.md`, "Natives" (line 152): In a helper, I raise an exception by its simple name, as `"DivisionByZero"`. I would search for `LibraryNames`, because the section that the pointer names does not mention it.
- `library.md`, "Designing a change" (line 54): After an edit of one of the fourteen components, I would also run `ant testOneLibrary`, which also finds code-generator refusals. I would not know whether this overrides `tests-running.md`, which says to run only my own tests after an edit of either library.
- `tests-running.md`, "The two suites" (line 14): I would plan for about 11 minutes of `ant testFast`, in the background.
- `tests-running.md`, "Compiled tests" (lines 116 to 120): To run one-library tests, I would use `ant testOneLibrary` for the whole track, `junit.sh` with `FORTRESS_LIBRARY=one ONE_JVM=1` and `OneLibraryComponents.test` first for a few tests, and `FORTRESS_CACHES` set to the track's folder for a run by hand. The section does not give the time of the fourteen compiles, or say when the track's folder is missing or stale.
- `tests-writing.md`, "Where a test goes, and how it passes" (line 52): I can now give a plain one-library test a `run` command.

## 3. The flags

### SKILL.md

**F1. SKILL.md:80.** "a program compiled so runs against the one library's jars (`references/build-and-caches.md`, "The caches")"
- Kind: a gotcha that the passage leaves out.
- Problem: The sentence reads as unconditional, so a worker compiles with the variable into an empty `caches-one`, runs, and meets a missing class. The condition that the jars must be in the caches folder is only in the part that the pointer names.
- Confidence: medium.
- Fix: restate: "a program compiled so runs once its caches folder holds the one library's jars (`references/build-and-caches.md`, "The caches"), but fails at some constructs that walk runs (`references/compiler.md`, "What the compiled path cannot compile yet")."

**F2. SKILL.md:80.** "but fails at some constructs that walk runs (`references/compiler.md`)"
- Kind: a claim that a worker could not check without a search.
- Problem: `compiler.md` is about 290 lines, and the pointer names no section, so the worker must search the whole part for the list.
- Confidence: low.
- Fix: restate the pointer as `(references/compiler.md, "What the compiled path cannot compile yet")`, as in the F1 restatement.

### build-and-caches.md

**F3. build-and-caches.md:73.** "A program compiled with the variable runs only if its caches folder holds the jars of the one library's fourteen components, which `one_library_tests/OneLibraryComponents.test` compiles (`tests-running.md`, "Compiled tests")."
- Kind: a gotcha that the passage leaves out.
- Problem: The paragraph is about runs that name no private caches folder, which use `default_repository/caches-one`, but no part says how to put the fourteen jars into that folder. The pointed section gives the track's private folder and `junit.sh`, which removes the entries of the components that it names after its list.
- Confidence: medium.
- Fix: restate: "A program compiled with the variable runs only if its caches folder holds the jars of the one library's fourteen components. To run one by hand, use the folder that `ant testOneLibrary` fills (`tests-running.md`, "Compiled tests")." Or give the command that fills `caches-one`.

### compiler.md

**F4. compiler.md:21.** "payload classes that the classes of either library's number objects extend"
- Kind: a term not defined where it is used.
- Problem: "payload class" appears nowhere else in the skill. In a bullet that contrasts walk with the compiled path, "either library" can also be read as walk's library and the compiler's.
- Confidence: low.
- Fix: restate: "classes that hold the Java value, as `FRR64` holds a `double`. The classes of the number objects of both compiled libraries, the prelude and the one library, extend them, and under the one library so do those of `Boolean`, `Char` and `FlatString`."

**F5. compiler.md:32.** "The run time's classes that name a library's types"
- Kind: a sentence that breaks the part's register.
- Problem: Elsewhere the skill writes "runtime" for this code ("The runtime", `runtimeSystem/`) and "run time" for when a program runs. So the phrase can be read as "the classes at run time".
- Confidence: low.
- Fix: restate "The run time's classes" as "The runtime's classes".

**F6. compiler.md:32.** "come in two sets under the same names: `ProjectFortress/build` for the prelude, and `ProjectFortress/build-one`, built from `ProjectFortress/src-one`, for the one library."
- Kind: a gotcha that the passage leaves out.
- Problem: A worker who edits a class in `src-one` does not learn what builds `build-one`. "Building" in `build-and-caches.md` names only `ProjectFortress/build/`, so the worker can run the old `build-one` with the variable and not know.
- Confidence: medium.
- Fix: restate: "come in two sets under the same names: one built from `ProjectFortress/src` into `ProjectFortress/build`, for the prelude, and one built from `ProjectFortress/src-one` into `ProjectFortress/build-one`, for the one library." Then add one sentence that names the command that builds `build-one`.

**F7. compiler.md:32.** "Make a change to a class that both sets hold in both."
- Kind: a sentence that reads two ways.
- Problem: The final "in both" is hard to attach. The sentence also does not say how to tell which classes both sets hold.
- Confidence: low.
- Fix: restate: "If you change a class that `src-one` also holds, make the same change to its copy there."

**F8. compiler.md:45.** "though a program that calls a varargs declaration does not run yet (ledger row 1091)"
- Kind: detail that changes no action (the second question). The fact is stated twice.
- Problem: The first item of the new list at line 49 states the same failure, with its message and the same ledger row.
- Confidence: high.
- Fix: delete the clause. The sentence ends "it compiles a varargs parameter."

**F9. compiler.md:47-54.** "Against the one library, a compiled program fails where walk runs these constructs:"
- Kind: a gotcha that the passage leaves out.
- Problem: The list says what fails, but not what a worker writes instead. A worker who writes a one-library run test (now allowed, `tests-writing.md:52`) does not know whether to avoid these constructs or record them as `XXX` tests. The traps elsewhere in this part end with what to do.
- Confidence: medium.
- Fix: add after the list: "Write none of these in a one-library run test. A test of one is an `XXX` test (`tests-writing.md`)." Or name the workaround for each item.

**F10. compiler.md:50.** "a reduction over a range: `FullScalarRange`'s class fails to load in the same way"
- Kind: a sentence that reads two ways.
- Problem: A worker cannot tell whether a `for` loop or a comprehension over a range also fails, because each also uses a range. So the worker does not know which loops a one-library test can use.
- Confidence: low.
- Fix: restate the item to say which forms over a range fail, for example "a `for` loop, a comprehension or a reduction over a range", if that is the fact.

**F11. compiler.md:56.** "In one JVM, compile `FortressLibrary` before any other program."
- Kind: a sentence that reads two ways.
- Problem: It can be read as an order to compile in one JVM, or as a condition (where compiles share a JVM). `FortressLibrary` is a component, not a program, and the sentence does not say which runs share a JVM.
- Confidence: medium.
- Fix: restate: "Where several compiles share one JVM, as in `fortress junit` or `junit.sh` with `ONE_JVM=1`, compile `FortressLibrary` first. Compiled after another component, its `QQ`'s default methods fail verification: ..."

**F12. compiler.md:157.** "So in `catch e IntegerOverflow => e SEQV IntegerOverflow`, the comparison is `false`. Walk gives `true` (ledger row 1103)."
- Kind: a gotcha that the passage leaves out.
- Problem: The trap gives no form to write instead, unlike its neighbours. A worker that must test which exception a helper raised has no safe form.
- Confidence: low.
- Fix: add one sentence that names the form to use, for example "Test the exception's type with the `catch` clause or a `typecase`, not with `SEQV`.", if that holds on both paths.

### interpreter.md

**F13. interpreter.md:152.** "The string is the exception's simple name, and `LibraryNames` maps it to the class of the library in use (`compiler.md`, "The compiler's prelude, until the switch-over")."
- Kind: a term not defined where it is used.
- Problem: `LibraryNames` appears nowhere else in the skill, and the section that the pointer names does not mention it. So a worker whose helper raises the wrong class must search the tree for it.
- Confidence: high.
- Fix: define the term: give `LibraryNames`'s path at this use, and in `compiler.md`, "The compiler's prelude, until the switch-over", say that it is one of the classes that come in two sets, if it is.

**F14. interpreter.md:152.** "Under walk, that class does not load, and `StaticNativeApp` raises the interpreter's library's object of the same name in its place, without the message."
- Kind: a sentence that reads two ways.
- Problem: "that class" now means "the class of the library in use", and under walk the library in use is the interpreter's library. So the sentence can be read as "the interpreter's library's class does not load".
- Confidence: medium.
- Fix: restate: "Under walk, no class of a compiled library loads, and `StaticNativeApp` raises the interpreter's library's object of the same name in its place, without the message."

### library.md

**F15. library.md:54.** "For any of the fourteen, also `ant testOneLibrary`."
- Kind: a gotcha that the passage leaves out.
- Problem: `ant testOneLibrary` runs a whole track. `tests-running.md:76` says to run only your own tests after an edit of either library, and `SKILL.md:174` says to run a whole suite nowhere else. So a worker meets two rules that disagree, and must choose.
- Confidence: high.
- Fix: add the case to `tests-running.md`, "When to run a whole suite": "After an edit of one of the fourteen components that `OneLibraryComponents.test` compiles, run `ant testOneLibrary` (`library.md`, "Designing a change")." Keep the bullet in `library.md`.

**F16. library.md:54.** "For any of the fourteen"
- Kind: a term not defined where it is used.
- Problem: The bullet above names only `FortressLibrary` and "the other thirteen components that the gate's distance stage checks". No part lists them, so a worker cannot tell whether the component that it edits is one of the fourteen.
- Confidence: low.
- Fix: restate: "For any of the fourteen, which `OneLibraryComponents.test` names, also `ant testOneLibrary`." Say where in the file they are named, if a key lists them.

### tests-running.md

**F17. tests-running.md:14-16.** "in about 11 minutes" and, on the next line, "It is the longest track, so it sets the total time."
- Kind: detail that changes no action (the second question).
- Problem: The time almost doubled, and the onelibrary track now compiles the fourteen components first, so the clause about the longest track can now be wrong. It changes no action in either case.
- Confidence: low.
- Fix: delete "It is the longest track, so it sets the total time."

**F18. tests-running.md:118.** "`ant testSystem` deletes that folder."
- Kind: a gotcha that the passage leaves out.
- Problem: Line 34 says that each suite deletes `ProjectFortress/test-caches` when it starts. A worker who reads that only `testSystem` deletes the folder runs another target, then a run by hand against the folder, and finds no jars.
- Confidence: medium.
- Fix: restate: "Each suite deletes that folder when it starts ("The two suites"). Only `testFast` and `testOneLibrary` fill it again."

**F19. tests-running.md:119.** "With `junit.sh`, set `FORTRESS_LIBRARY=one ONE_JVM=1`, and name `OneLibraryComponents.test` first."
- Kind: a claim that a worker could not check.
- Problem: The part does not say how long the fourteen compiles take. It also does not say which caches folder `junit.sh` uses with the variable, or whether it removes the fourteen jars after its list (line 129 says that it removes the named components' entries). So the worker can run the call in the foreground past the Bash tool's 120-second limit, or expect jars that are gone.
- Confidence: medium.
- Fix: add one sentence: the time of `OneLibraryComponents.test`, the caches folder that `junit.sh` uses with the variable, and whether the fourteen jars stay there after the call. Add "Run it in the background (`session.md`)" if the time is over about a minute.

**F20. tests-running.md:120.** "For a run by hand against the track's jars, set `FORTRESS_CACHES=$PWD/ProjectFortress/test-caches/fast-onelibrary` and `FORTRESS_LIBRARY=one`."
- Kind: a gotcha that the passage leaves out.
- Problem: The folder is private, so `ant compileAll` keeps its jars after an edit of Java (`build-and-caches.md`, "Building"), and a run by hand then uses jars that the old compiler wrote. Also, `$PWD` gives the right path only from the tree's root, but the compiled runs in `compiler.md` start with `cd ProjectFortress`.
- Confidence: medium.
- Fix: restate: "For a run by hand against the onelibrary track's jars, set `FORTRESS_CACHES=<tree>/ProjectFortress/test-caches/fast-onelibrary` and `FORTRESS_LIBRARY=one`. Run `ant testOneLibrary` first after a build that changed the implementation, and after any other suite."

### tests-writing.md

**F21. tests-writing.md:52.** "A plain run test there runs against the one library's jars, as `OneLibraryRunHello.test` does."
- Kind: a gotcha that the passage leaves out.
- Problem: A worker who writes a run test here does not learn that the run fails at six constructs that walk runs, or that a run of the test alone needs `OneLibraryComponents.test` first. Both facts are in other parts that this line does not name.
- Confidence: low.
- Fix: restate: "A plain run test there runs against the one library's jars, as `OneLibraryRunHello.test` does. `compiler.md`, "What the compiled path cannot compile yet", lists what it cannot run, and `tests-running.md`, "Compiled tests", says how to run it."

## 4. The undefined terms

- "payload classes": `compiler.md:21`.
- `LibraryNames`: `interpreter.md:152`.
- "the one library's fourteen components" (which fourteen): `build-and-caches.md:73`, also `tests-running.md:116` and `library.md:54`.
- "the track" in "the track's jars" (which track): `tests-running.md:120`.

## 5. The gotchas

- `SKILL.md:80`: A worker compiles with the variable into an empty `caches-one` and expects the program to run.
- `build-and-caches.md:73`: A worker who runs by hand with no private caches folder finds no way to put the fourteen jars in `default_repository/caches-one`.
- `compiler.md:32`: A worker edits a class under `src-one`, does not know what builds `build-one`, and runs the old `build-one`.
- `compiler.md:47-54`: A worker puts a construct from the list into a one-library run test, because the list does not say what to write instead.
- `compiler.md:56`: A worker runs `fortress junit` on several one-library tests without the `FortressLibrary` compile first, and meets the `VerifyError`.
- `compiler.md:157`: A worker must test which exception a helper raised, and the trap names no form that works.
- `interpreter.md:152`: A worker searches the tree for `LibraryNames`, because the section that the pointer names does not mention it.
- `library.md:54`: A worker runs a whole track against `tests-running.md:76`, or skips it because of that line.
- `tests-running.md:118`: A worker runs a suite other than `testSystem`, then a run by hand against `fast-onelibrary`, and finds no jars.
- `tests-running.md:119`: A worker runs `junit.sh` with the fourteen compiles in the foreground past the 120-second limit, or expects the fourteen jars to stay after the call.
- `tests-running.md:120`: After an edit of Java and `ant compileAll`, a worker runs by hand against the old jars of the private folder. Or it sets `FORTRESS_CACHES` from `ProjectFortress/`, and the path is wrong.
- `tests-writing.md:52`: A worker writes a run test that calls `println` on a number, which fails against the one library.

## 6. The count

- Flags: 21. High: 3 (F8, F13, F15). Medium: 9 (F1, F3, F6, F9, F11, F14, F18, F19, F20). Low: 9 (F2, F4, F5, F7, F10, F12, F16, F17, F21).
- Lint hits: 0.
