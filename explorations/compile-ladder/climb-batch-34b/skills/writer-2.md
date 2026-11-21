I fixed 19 of the cold read's 21 flags and left 2, in one commit, `e8091fa2a4`. The lint found nothing, and I did not push. I checked each new fact against the code or the record before I wrote it.

## What changed, with reasons

1. **`SKILL.md`, "How a program runs".**
   - Before: a worker would read that a program compiled with `FORTRESS_LIBRARY=one` simply runs. It would compile into an empty caches folder and meet a missing class.
   - Now: such a program "runs once its caches folder holds the one library's jars". The pointer also names the section that lists what fails.
2. **`build-and-caches.md`, "The caches".**
   - Before: a worker would not know how to put the fourteen jars into `default_repository/caches-one`.
   - Now: "To fill `caches-one` with them, run that test with `junit.sh` and the variable." I checked that `junit.sh` cleans up only `caches`, so the jars stay.
3. **`compiler.md`, "What the two paths share".**
   - Before: "payload class" was used without a definition.
   - Now: payload classes "hold the JVM value, as `FRR64` holds a `double`". The sentence names both compiled libraries.
4. **`compiler.md`, "The compiler's prelude, until the switch-over".**
   - Before: a worker who edits a class under `src-one` would not know what builds it, and could run stale classes.
   - Now:
     - each set names its source and its output folder;
     - "`ant compileAll` builds both";
     - "If you change a class that `src-one` also holds, make the same change to its copy there";
     - `LibraryNames` is named and defined there.

   The source is `build.xml:852-870`.
5. **`compiler.md`, the varargs paragraph.** The clause "though a program that calls a varargs declaration does not run yet" is cut. The new list states the same fact, with its message and its ledger row.
6. **`compiler.md`, the list of what fails against the one library.**
   - Before: a worker would not know what to do with these constructs in a test.
   - Now: "Write none of these in a one-library run test. A test of one is an `XXX` test that names its row."
7. **`compiler.md`, the order of compiles in one JVM.**
   - Before: the sentence could be read as an order to compile everything in one JVM.
   - Now: "Where several compiles share one JVM, as in `fortress junit` or `junit.sh` with `ONE_JVM=1`, compile the `FortressLibrary` component first."
8. **`compiler.md`, "Traps of the compiled path", the exception trap.** It now says what to do instead: "Test which exception was raised by the type of the `catch` clause that takes it." `OneLibraryCatchHelperRaises` already catches this way and passes on the compiled path.
9. **`interpreter.md`, "Natives".**
   - Before: a worker would search the tree for `LibraryNames`. "That class does not load" could also be read as the interpreter's own class.
   - Now: the path is given, `compiler/runtimeValues/LibraryNames.java`, and the sentence says "Under walk, no class of a compiled library loads". I checked this against walk's `StaticNativeApp.raised`.
10. **`library.md`, "Designing a change".**
    - Before: a worker could not tell which components are "the fourteen".
    - Now: the bullet says that `OneLibraryComponents.test` names them in its `tests` key.
11. **`tests-running.md`, "When to run a whole suite".**
    - Before: this section said to run only your own tests after a library edit, while `library.md` said to run `ant testOneLibrary`. The worker had to choose between two rules.
    - Now: the section adds "After an edit of one of the fourteen components ... also run `ant testOneLibrary`".
12. **`tests-running.md`, "Compiled tests".**
    - Before: the text said that only `ant testSystem` deletes the track's folder. A worker who ran another suite would later find no jars.
    - Now: "Each suite deletes that folder when it starts, and only `testFast` and `testOneLibrary` fill it again." (`build.xml:1525`, `:1179`.)
13. **`tests-running.md`, the `junit.sh` way.**
    - Before: a worker could run the long compile in the foreground past the Bash tool's limit, or expect the jars to be gone.
    - Now: the compiles write to `caches-one`, and the jars stay there after the call. `FortressLibrary` alone takes about 135 to 160 s, so the text says to run the call in the background.
14. **`tests-running.md`, a run by hand.**
    - Before: the text used `$PWD`, which is wrong from `ProjectFortress/`. A worker would also run against old jars after a rebuild.
    - Now: the text uses `<tree>`, and says "The build does not touch that folder, so run `ant testOneLibrary` again after an edit of Java or Scala."
15. **`tests-writing.md`, "Where a test goes".** The text now points to the list of what a one-library run test cannot run, and to how to run it.

`sources.md` has a dated block for these fixes.

## Each flag

- **Fixed:** F1, F2, F3, F4, F5, F6, F7, F8, F9, F11, F12, F13, F14, F15, F16, F18, F19, F20, F21. F15 was fixed as the flag proposes, with the `library.md` bullet kept.
- **Left, F10** (does a `for` loop or a comprehension over a range also fail?). Ledger row 1099 and F-396 say "a reduction over a range" only. No test shows a loop failing, so the record does not settle it.
- **Left, F17** ("It is the longest track, so it sets the total time"). The task lets me edit another sentence only where my fix makes it false, and this one was not touched by my fixes. I cannot check whether it still holds: the gate's summary gives no time for each track.

## Decisions not taken

- **F17.** One choice is to delete the clause. The other is to keep it until someone measures the time of each track.
- **The step 2 sentence in `tests-writing.md`**, from my first task, is still open for you.

## For the coordinator

- The time for `FortressLibrary`'s compile, about 135 to 160 s, comes only from the review's proposed wording. No FACTS entry holds it. If you want an entry to cite, the next gate's per-test times could supply one.
- From the first task, two sentences are still stale:
  - `compiler.md`, "Natives": "Until the switch-over, a compiled test cannot reach the interpreter's library's bindings." This is now false.
  - `tests-running.md`: "`ant testSystem` ... about 680 tests ... about 2 to 4 minutes". The gate ran 879 tests in 4 minutes 39 seconds.
---
session 50f20f81-fbf2-4953-9283-f60567b9f188 turns 25 cache writes 26132 reads 2064310 output 11399 labels {'ephemeral_1h_input_tokens': 26104, 'ephemeral_5m_input_tokens': 0}
