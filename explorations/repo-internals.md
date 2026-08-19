# Repo internals: how to move around this codebase

Living notes on the architecture and the techniques that proved useful while
working on the revival. Started 2026-08-19; extend as new things are learned.
Companion documents: `test-baseline-jdk8.md` (test-suite state, compiler-path
discovery narrative), root `CLAUDE.md` (build recipe, quick facts).

## The two worlds

The tree contains two nearly-disjoint executions of Fortress, and most
confusion comes from mixing them up:

| | interpreter ("walk") | bytecode compiler |
|---|---|---|
| era | 2003-lineage, mature | 2010–2012, the team's final push, incomplete |
| entry | `fortress <file>.fss` | `fortress compile <file>.fss` + `fortress run <component>` |
| libraries | `Library/` + `LibraryBuiltin/` (FortressBuiltin, NativeArray, ...) | `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem`, `GeneratorLibrary` |
| native mechanism | `builtinPrimitive("com.sun...glue.prim.X")` in .fss | `import java com.sun...nativeHelpers.{...}` in .fss |
| native String type | glue-level FString | `CompilerBuiltin.JavaString` / `StringVector` (foreign map in `NamingCzar`) |
| tests | `ProjectFortress/tests/` via `ant testSystem` | `compiler_tests/`, `library_tests/` via `ant testFast` etc. |

The mode switch is `com.sun.fortress.compiler.WellKnownNames`:
`useInterpreterLibraries()` / `useCompilerLibraries()` swap the meaning of
"the builtin library" (`FortressBuiltin` vs `CompilerBuiltin`) and "the
standard library" (`FortressLibrary` vs `CompilerLibrary`). `Shell.subMain`
calls one or the other per subcommand (`walk` vs `compile`/`run`/`link`).

Consequences:
- A `.fss` file is generally written for ONE world. `import java ...` means
  compiler-only; `builtinPrimitive` means interpreter-only.
- An *api name* used by both worlds is trouble: apis resolve by name along a
  single shared source path (see below). This is exactly what broke the six
  interpreter tests in the 2012 endgame (`api System` shadowed — see
  test-baseline postscript) and why the compiler apis are `Compiler*`-prefixed.

## Name resolution: fortress.source.path

`default_repository/configuration` (overridable via `local_repository/`,
`~/.fortress/`, `./.fortress/`, env vars, or `-D` flags) defines:

    fortress.source.path=;.;${_fr}/LibraryBuiltin;${FORTRESS_AUTOHOME}/Library;${_fr}/test_library

- Leading `;` sets the separator (Windows compat). `.` (cwd!) is searched
  FIRST, then `ProjectFortress/LibraryBuiltin`, then `Library/`.
- `import Foo` finds the first `Foo.fsi`/`Foo.fss` on that path. First hit
  wins — a file earlier on the path silently shadows a later one, and cwd can
  shadow everything (mind where you run from).
- The interpreter requires filename (sans suffix) == component/api name.

## Cache anatomy and hygiene

`default_repository/caches/` (gitignored):
- `analyzed_cache/`, `*parsed_cache/` — front-end analysis, shared-ish
  between worlds; the main source of cross-world contamination.
- `interpreter_cache/`, `environment_cache/` — interpreter side.
- `bytecode_cache/` — compiler output: one jar per compiled component;
  library components get api-qualified names (`fortress.CompilerBuiltin.jar`).
- `nativewrapper_cache/` — generated wrappers for `import java` natives.

Rules learned the hard way:
- **When in doubt, wipe**: `rm -rf default_repository/caches/*`. Stale or
  order-inconsistent caches produce *misleading* runtime errors
  (`NoSuchMethodError: CompilerBuiltin.println(...)`,
  `NoSuchMethodError: ...asJavaString()`, `Unable to read serialized data
  ... recommend you delete the Fortress bytecode cache and relink`). These
  sank pluckyporcupine's compiler verdict; they are cache problems, not
  compiler bugs.
- After editing any `Library/`/`LibraryBuiltin/` `.fss`, wipe — edits are
  otherwise invisible (cached analysis wins).
- **Compile order matters** on a fresh cache, because `fortress compile` of a
  program does NOT emit the builtin-library jars, and the runtime classloader
  then falls back to the **bootstrap stubs** in `ProjectFortress/build/fortress/`
  (ant-compiled from checked-in `ProjectFortress/src/fortress/*.java` —
  a *frozen, older* snapshot of CompilerBuiltin!). Symptom: NoSuchMethodError
  on a method that plainly exists in CompilerBuiltin.fss. Recipe:

      cd ProjectFortress
      ../bin/fortress compile LibraryBuiltin/AnyType.fss
      ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss
      ../bin/fortress compile ../Library/CompilerLibrary.fss
      ../bin/fortress compile ../Library/CompilerAlgebra.fss
      ../bin/fortress compile ../Library/CompilerSystem.fss
      ../bin/fortress compile <program>.fss
      ../bin/fortress run <component> [args...]

  The JUnit harness gets this right because `CompilerJUTest` starts with
  `Shell.resetRepository()` and compiles the world in dependency order.

## Toolchain traps (JDK rungs)

- **build.xml's javac tasks originally set `source=` but never `target=`**
  (and three set neither). Harmless on JDK 8 (target defaulted to 8); on
  JDK 11 target defaulted to 11 → v55 classfiles with invokedynamic string
  concat → ASM 3.1's ClassReader (used by `ForeignJava.findClass` for every
  `import java ...`) dies with `ArrayIndexOutOfBoundsException`, failing all
  compiler-path tests while testSystem stays green. Fixed by pinning
  `target="${javaSourceVersion}"` on all 8 javac tasks (commit fdd4a57c2).
  Diagnosis trick: a 20-line probe compiling against
  `third_party/asm/asm-all-3.1.jar` + `javap -v | grep major` pinpoints
  exactly which classfile ASM chokes on. (Surprise: JDK 11's *platform*
  classes parse fine under `SKIP_DEBUG|SKIP_FRAMES|SKIP_CODE`; it was our
  own freshly compiled v55 output that broke.)
- `default_repository/caches/global.map` is a **tracked** file at the caches
  root, so `rm -rf default_repository/caches/*` deletes tracked content —
  wipe with `rm -rf default_repository/caches/*_cache
  default_repository/caches/logs` instead, or `git checkout` it back.

## Generated code

- AST nodes (`src/com/sun/fortress/nodes/`, 1000+ files),
  `scala_src/nodes/FortressAst.scala`, `Library/FortressAst.fsi/fss` are all
  generated by astgen from `ProjectFortress/astgen/Fortress.ast` (build
  target `makeAST`). They are checked in; ant's uptodate check compares
  mtimes, so a fresh checkout looks current. If scalac errors show arity
  mismatches in `S*Pattern` nodes: `touch ProjectFortress/astgen/Fortress.ast
  && ant compileAll`.
- Parser (`parser/*.java` from Rats! grammars), `precedence_resolver/
  Operators.java` (from unicode data) — same pattern.

## Test harness mechanics

- Targets: `testFast` (unit + compiler suites, ~12 min, excludes interpreter
  system tests), `testSystem` (interpreter, 382 tests, ~2 min),
  `testLibrary`, `testCompiler`, `testNotPassing` (expected failures),
  `testDemos`, nightly variants. Plain-text results land in
  `ProjectFortress/TEST-RESULTS/TEST-<class>.txt`.
- `.test` files (in `compiler_tests/` etc.) are property files driving
  `FileTests`: keys like `compile`, `run`, `tests=`, `compile_err_equals=`
  decide which phases run and what output to expect. `run`-tests execute the
  compiled program via the `bin/run` script in a subprocess.
- To reproduce one interpreter test: `../bin/fortress tests/<Name>.fss`
  (from `ProjectFortress/`). Failures print the real diagnostic that the
  JUnit boilerplate hides.
- Suite runs reset/repopulate `default_repository/caches` — don't interleave
  ad-hoc compiles with a running suite, and don't trust cache state after one.

## Git archaeology techniques

- **The history has a parallel root**: `5a68404` (David Chase, 2012-07-19,
  4372 files) is a parentless import later merged by `575fe64`. Any
  `git log <base>..HEAD -- <file>` therefore lists `5a68404` for almost
  every file — useless for "who changed what since June". Use **content
  comparison** instead: `git diff --quiet <base> HEAD -- <file>` and
  `git show <base>:<file> | cmp - <other-tree>/<file>` (this is how the
  graft's 3-way audit was done; see the graft commit message).
- pluckyporcupine's base = trunk `304f274` (2012-06-12), confirmed by 56/69
  differing files being byte-identical to it.
- The twelve pre-2016 branches are hg named-branch relics; the 2008 research
  branches were squash-merged into trunk, so fine-grained authorship exists
  only on the branch heads. Full survey with per-branch verdicts: see the
  session notes / ask before deleting anything.
- hg conversion quirks: empty "Starting/Closing branch X" marker commits;
  `.hgignore` still in tree; David Chase's 2012-01-20 branch-closing sweep.

## Environment gotchas (cloud container)

- JDK 8 exactly (`/usr/lib/jvm/java-8-openjdk-amd64`); `unset
  JAVA_TOOL_OPTIONS` or the proxy's trust-store flags pollute every JVM fork.
- `web.archive.org` and `labs.oracle.com` are blocked by network policy —
  research PDFs must be uploaded into the session by Pavol.
- Gitignored files (e.g. `research/decks/*.pdf`) do not survive the
  container; only commits and pushes persist.
