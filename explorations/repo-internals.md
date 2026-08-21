# Repo internals: how to move around this codebase

Living notes on the architecture and the techniques that proved useful while
working on the revival. Started 2026-08-19; extend as new things are learned.
Companion documents: `test-baseline-jdk8.md` (test-suite state, compiler-path
discovery narrative), root `CLAUDE.md` (build recipe, quick facts).

## Module map (verified 2026-08-21)

Every count below was measured against the working tree at HEAD; this
replaces folklore from the old READMEs.

### Top level

Live toolchain: `ProjectFortress/` (293 MB — all Java/Scala source, test
corpora, third-party jars), root `build.xml`, `bin/` (35 scripts),
`SpecData/` (133 spec-extracted `.fss` examples, run by `ant testSpecData`),
`Fortify/` (Emacs-batch LaTeX renderer — `fortify.el` + `fortify.sty` typeset
Fortress source as math for the spec/papers, via `bin/fortify` and
`ant_tasks/FortifyTask`), `contrib/` (Atom/Emacs/GtkSourceView/Vim modes).
Note: `ProjectFortress/build.xml` is an 18-line deprecation stub — the root
`build.xml` (1,633 lines, 68 targets) is the only real build file.

Standard library: `Library/` (53 `.fss`/`.fsi` pairs; `FortressLibrary.fss`
is the 4,518-line prelude), top-level `CompilerLibrary/` (10 `.fsi`-only API
stubs for the compiler path — easy to confuse with `Library/CompilerLibrary.fss`),
and — surprisingly — `lib/` (Fortress source: `List`, `Queue`, `Test`; not
jars — those live in `ProjectFortress/third_party/`).

Spec and papers: `Specification/` (365 MB — 55% of the repo, mostly LaTeX
build residue), `Specification-1.0-frozen/`, `Papers/`, `Documentation/`.

Revival era: `explorations/`, `research/`, `CLAUDE.md`, `README.md`.

Historical artifacts / dead weight: `BasicCoreFortress/` (core-calculus
experiment), `Sandbox/`, `CommunityMetrics/` (SVN-era metrics scripts),
`NeedBetterErrorMessages/` (single-file TODO bucket), `DOT_idea/` +
`PFC_DOT_iml` + `ECLIPSE/` (Sun-era IDE configs).

### Packages under `ProjectFortress/src/com/sun/fortress/`

22 packages plus the loose `Shell.java` (1,288 lines) — the CLI dispatcher
(`compile`, `run`, `walk`, `link`, `api`, `parse`, `unparse`, `typecheck`,
`test`, `junit`, … parsed at Shell.java:403–487).

| Package | Files | Role |
|---|---|---|
| `nodes/` | 1,071 java | ASTGen-generated AST classes + visitors (committed, regenerable) |
| `interpreter/` | 246 java | Tree-walking evaluator: `evaluator/` 169, `glue/` 53 (native prims), `env/` 15, `rewrite/` 7 |
| `compiler/` | 197 java + 10 scala | Static phases + JVM backend: `asmbytecodeoptimizer/` 43, `index/` 34, `runtimeValues/` 30, `codegen/` 15, `phases/` 14, `disambiguator/` 13, `desugarer/` 16 (7 scala); top level holds `Disambiguator`, `Desugarer`, `NamingCzar`, `OverloadSet`, `WellKnownNames`, `GlobalEnvironment` |
| `useful/` | 131 java | Utility layer dominated by hand-rolled persistent balanced-tree collections (`BATree`, `BASet`, `BATreeEC`), tests interleaved |
| `parser_util/` | 89 java | Hand-written parser support: precedence/juxtaposition resolution, layout, grammar-coverage instrumentation |
| `parser/` | 5 java + 62 other | Rats!/xtc packrat parsers — **four grammars** (61 `.rats`): main `Fortress.rats`, `preparser/` (import/grammar discovery), `templateparser/` (syntax-abstraction templates), `import_collector/`. Four generated parsers are huge (`Fortress.java` 2.06 MB, `TemplateParser.java` 2.16 MB); committed, regenerable |
| `scala_src/` | 59 scala | **The real type checker**: `typechecker/` 27 (+ `impls`, `staticenv`), `useful/` 15, `types/` 7, `linker/` 4, `overloading/` 3, `disambiguator/` 2, `nodes/` 1 (generated). Started Feb 2009 as a Scala rewrite of the Java checker (whose stubs remain in `compiler/typechecker/`) |
| `syntax_abstractions/` | 30 java | Extensible syntax: user-defined grammars generate new parsers at compile time |
| `nodes_util/` | 29 java + 1 scala | Hand-written AST factories/utilities: `NodeFactory`, `ExprFactory`, `NodeUtil`, `Span`, `ASTIO` |
| `exceptions/` | 26 java + 1 scala | Error hierarchy: `StaticError`, `ProgramError`, `TypeError`, `CompilerBug`, `InterpreterBug`, … |
| `runtimeSystem/` | 25 java | Work-stealing runtime + `Naming`/`Instantiater` (generic instantiation at class-load time) that emitted bytecode links against |
| `nativeHelpers/` | 24 java | FFI shims for `import java` library functions (compiler world) |
| `astgen/` | 16 java | Fortress extensions to Rice's ASTGen: visitor generators, `FortressAstGenerator`, `ScalaAstGenerator` |
| `repository/` | 16 java | Component cache/graph: `CacheBasedRepository`, `GraphRepository`, `ForeignJava`, and `ProjectProperties` — the `FORTRESS_HOME`/`BASEDIR`/cache-path resolver everything routes through; first stop when paths misbehave |
| `tests/` | 16 java | `tests/unit_tests/` — the JUnit harnesses (`SystemJUTest`, `CompilerJUTest`, `OtherCompilerJUTest`, `FileTests`) driving the `.fss` corpora |
| `numerics/` | 6 java | BLAS JNI binding, directed-rounding IEEE support |
| `ant_tasks/` | 6 java | Ant tasks: `fortress`, `fortify`, `fortex`, `foreg`, `fortick` |
| `linker/` | 5 java | Component linking / api-to-implementation binding |
| `unicode/` | 4 java | Generates operator/precedence tables from Unicode data files |
| `tools/` | 2 java | `FortressAstToConcrete` — AST→source unparser behind `fortress unparse`; handy for debugging desugaring |
| `fib_tests/`, `unit_tests/` | 1 each | Stray: a benchmark harness; one near-empty Scala JUnit |

### Test corpora (`.fss` under `ProjectFortress/`)

`tests/` 381 (interpreter, → `testSystem`), `compiler_tests/` 456 + 35 `.fsi`,
`other_compiler_tests/` 178, `parser_tests/` 112, `demos/` 62,
`syntax_abstraction_tests/` 43, `library_tests/` 26, `linker_tests/` 9,
`compiler_regressions/` 6. Known-failing corpora are parked in sibling dirs
(`not_passing_yet/` 58, `not_working_*`, `obsolete_interpreter_tests/`,
`long_term_not_working/`). There is **no `static_tests/`** — the class
`compiler/StaticTestSuite.java` does not correspond to a directory.

### One edit, many files

`ProjectFortress/astgen/Fortress.ast` (2,125 lines; a sibling of `src/`, not
the `astgen` Java package) regenerates `nodes/` (all 1,071 files),
`scala_src/nodes/FortressAst.scala`, and `Library/FortressAst.fss`/`.fsi`
via `ant makeAST` — all four outputs are committed, so a stale `.ast` edit
silently diverges from the checked-in tree (see "Generated code" below).

### Git-history caveat for this map

`git log -- <dir>` is unusable for dating anything: the 2026 migration graft
rewrote directories wholesale, so directory-level history shows only the
graft. Use `git log --follow` on individual files (that is how the Feb 2009
start of the Scala type checker was confirmed).

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

- Current rung JDK 25 (`/usr/lib/jvm/java-25-openjdk-amd64`; 8/11/17/21 also
  gated green); `unset JAVA_TOOL_OPTIONS` or the proxy's trust-store flags
  pollute every JVM fork.
- `web.archive.org` and `labs.oracle.com` are blocked by network policy —
  research PDFs must be uploaded into the session by Pavol. Archived *pages*
  (not PDFs) can be read via the pure.md relay; see the method note in
  `research/extracts/fortress-websites-wayback.md`.
- Gitignored files (e.g. `research/decks/*.pdf`) do not survive the
  container; only commits and pushes persist.
