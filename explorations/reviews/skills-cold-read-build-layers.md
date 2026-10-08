<!-- A second cold read of three fortress-repo parts after the new "Two layers of code" section: the section prevents reading `ant compileAll` as compiling Fortress code, and seven places stay unclear, chief among them tests-running.md's "Neither suite compiles" and "Every ant compileAll deletes the caches" against the build that keeps them. -->

# Cold read: the two layers of code

Date 2026-10-08. For the coordinating session, then the curator. I read only `SKILL.md`, `references/build-and-caches.md` (b&c), `references/tests-writing.md` (tw) and `references/tests-running.md` (tr). I ran nothing. Line numbers are those of the files at this read.

## Verdict

The misreading is prevented in b&c:

- Line 9 says that `ant compileAll` builds the Java and Scala.
- Line 15 says that the `fortress` commands process the Fortress code.
- Line 29 says that the suites build no implementation.
- tr 36 now ties `ant compileAll` to an edit of Java, Scala or a grammar.

Two places can still lead a reader to the curator's misreading. tr 29 uses "compiles" for the implementation (finding 1). `SKILL.md` uses "recompile" for both layers (finding 2). Neither tr nor tw points back to "Two layers of code".

## The four workers

All four plans came out right. The steps that I would take:

1. Walk fixer, Java under `interpreter/`:
   - Write `ProjectFortress/tests/Name.fss` (tw 27). Run it through `harness-one.sh` on the base's build, and see it fail (tw 81, tr 90-94).
   - Make the edit. Run `ant compileAll` (b&c 24). Add `-Dcache0=/nonexistent -Dcache1=/nonexistent` only for `interpreter/evaluator/` or `interpreter/glue/` (b&c 109-113). Use the plain build for `rewrite/`, `env/` and the rest (b&c 120, 123).
   - Run no library order (b&c 102). Run `harness-one.sh` again, and see the test pass (tw 82).
   - Optionally, run `ant testSystem` once, on the commit that holds the last edit (tr 36, 63-65).
2. Library editor, `Library/FortressLibrary.fss`, checked under walk:
   - Write the test in `tests/`. See it fail through `harness-one.sh` before the library edit (tw 81).
   - Make the edit. Build nothing: walk analyses the file again by itself (b&c 26), and the compiled path does not link it (b&c 132).
   - Run `harness-one.sh`, and see the test pass. Run no whole suite (tr 69).
3. Compiled-path fixer, code generator:
   - Write `compiler_tests/Name.fss` and `Name.test` (tw 35-39). Check the five jars, and run the library order if one is missing (b&c 54, tr 108). Run `junit.sh` or `fortress junit`, and see the test fail (tw 81, tr 114, 125).
   - Make the edit. Run the plain `ant compileAll` (b&c 119). Run the library order and check the five jars (b&c 102, 54). Run the test again, and see it pass.
   - Run no whole track. Run the atomic runs only if `compiler.md` asks for them (tr 68).
4. Test-only worker, `ProjectFortress/tests/`:
   - Build nothing (b&c 27). Run `harness-one.sh` on the file (tr 90). Run no whole suite (tr 69).

## Still read two ways, or in an unclear order

1. tr 29: "Neither suite compiles. On a stale build, a suite tests the previous code." Here "compiles" means a build of the implementation. b&c 29 says that the suites "compile the Fortress code that they test". Read next to tr 36, it gives the curator's misreading again: the suite does not compile the tests, so `ant compileAll` must. A reader may then compile the tests, or run the library order, before a suite. Cost: about 100 s and a wrong model of the build. Fix: "Neither suite builds the implementation." Confidence: likely.
2. `SKILL.md` 99: "After an edit, recompile what you edited." The description (line 3) says "recompiling after editing a .fss, .fsi, Java or Scala file". Under walk, a test or `FortressLibrary.fss` has nothing to recompile.
   - b&c 26 adds to this: "The compiled path needs a compile of the component, or the library order" does not say that it means only the five `AnyType` and `Compiler*` components.
   - What I would do: workers 2 and 4 may run `fortress compile` on their file.
   - Cost: the compiled checker does not accept the interpreter's library yet (`SKILL.md` 15). The worker may then chase its errors.
   - Confidence: guess. b&c 132 corrects it, if the worker reads that far.
3. b&c 13: "Every `ant compileAll` also deletes the caches whole." The same claim is in b&c 24 ("The deletion by `ant compileAll` clears such entries") and in b&c 103 ("The caches are already deleted"). But b&c 109 gives an `ant compileAll` that keeps the caches.
   - What I would do: if that build failed, I would follow b&c 103 and run the library order for nothing. If I used it after an edit outside b&c 113-115, I might trust b&c 24 that the stale entries were cleared.
   - Fix: "Every plain `ant compileAll`."
   - Confidence: guess.
4. b&c 19: "A command reuses an entry whose source is not newer than the entry." b&c 26 says that after an `.fsi` edit, the entries of every component that imports the api are stale, and that walk analyses them again by itself. By the rule in b&c 19, an importer whose own file did not change keeps its entry. So either walk also checks the imports, and b&c 19 is incomplete, or a direct walk run after an `.fsi` edit uses stale entries. `harness-one.sh` is safe either way, because it starts with an empty cache (tr 93). Confidence: guess.
5. tr 94: "It runs the classes in `ProjectFortress/build/`. If your tree has none, build it first." Unlike tr 36 for the suites, it does not say "and after every edit of Java or Scala".
   - What I would do, with tr alone: a walk fixer runs the harness on the old classes and sees the test still fail.
   - Cost: the worker changes a fix that was right.
   - Confidence: guess, because b&c 24 covers it.
6. tr 108: "so run the library order first". b&c 54: "Before the first compiled run". Neither says when this applies: before each `junit.sh` run, once for each session, or only after a plain `ant compileAll` or when a jar is missing.
   - What I would do, reading literally: run the five compiles again before every compiled test.
   - Cost: up to about 100 s each time. b&c 150 says that an unchanged compile writes nothing, but not how long it takes.
   - Confidence: likely.
7. b&c 41 lists the only runs that read `default_repository/caches`, and leaves out `ant testOnly`. tr 131 says that `ant testOnly` "uses the tree's own caches". A reader cannot tell whether `testOnly` needs the library order or warm caches. Confidence: guess.

Smaller points:

- b&c 29, "The suites build no implementation", does not say which suites it means. tr 57 and tr 133 name ant test targets that do run `ant compileAll`. tr 133 warns about them, so the risk is low.
- The list in b&c 22-27 names grammar edits, but not `astgen/Fortress.ast`, which line 9 names as a source of the build. b&c 119 covers it as "the syntax tree".

## The new section against later sections

- b&c 13, "Every `ant compileAll`", against b&c 107-109 (finding 3).
- b&c 29, "compile the Fortress code that they test", against tr 29, "Neither suite compiles" (finding 1).
- b&c 19 against b&c 26, both in the new section (finding 4).

I found no other contradiction.
