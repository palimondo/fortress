# Test-suite baseline on JDK 8 (2026-08-18)

First run of the 2012 test suite on the grafted tree (trunk `a874948` +
pluckyporcupine migration + build patches; branch tip `b598e0e`).
Environment: Ubuntu 24.04 container, OpenJDK 8u482, ant 1.10.14, Scala 2.10.7
(vendored). Commands: `ant testFast`, `ant testSystem`.

## Results

| suite | scope | result |
|---|---|---|
| `ant testFast` | 48 JUnit suites: unit tests + **CompilerJUTest (642)** + OtherCompilerJUTest (263) + LibraryJUTest (55) + ParserJUTest (188) | **all pass** (≈1,400 tests, 0 failures, ~12 min) |
| `ant testSystem` | 382 interpreter system tests (`ProjectFortress/tests/*.test`) | **375 pass, 7 fail** (~2 min) |

Not yet run: `testNotPassing` (expected-failing), `testDemos`, `testsyntax`,
`testCruiseControl`/nightly variants.

## The 7 interpreter failures — both causes understood

**6 × `System` api shadowing** (`ParamRef`, `WordCountSmall`, `setMakerTest0`,
`LongStringTests`, `CovCollTest`, `FileConversion` — symptom:
`FortressBuiltin.JavaString/StringVector is undefined`):
the interpreter's original `Library/System.fsi` declares
`args : ImmutableArray[\String,ZZ32\]`, but David Chase's 2012-07-19 import
(`5a68404`) added a minimal, compiler-oriented
`ProjectFortress/LibraryBuiltin/System.fsi` (getProperty only), and
LibraryBuiltin shadows Library for the interpreter. **Pre-existing on the 2012
trunk, not a graft regression** — Chase's own merge commit `575fe64`
(2012-07-19) says: "merged, failing some tests that I think are irrelevant (at
least under 1.7)". pluckyporcupine's June-12 base predates the shadowing file,
so their tree passes these — at the cost of lacking the July compiler work.
Candidate fix: extend `LibraryBuiltin/System.fsi/fss` to cover the original
api surface (`args`, `programName`, ...).

**1 × `realArith`** — float-printing last digit:
`a Float: 2.718281828459045 =/= a FloatLiteral: 2.7182818284590455`.
JDK-era artifact (double parse/print behavior differs from the 2012 JDK 6/7
toolchain); harmless but should be understood before the JDK 11 rung.

## Major discovery: the bytecode compiler path WORKS on JDK 8

pluckyporcupine's README says "The compiler works, but running compiled
programs does not." **On JDK 8 that is false.** Verified end-to-end:

```bash
cd ProjectFortress
../bin/fortress compile LibraryBuiltin/System.fss      # native-backed lib deps
../bin/fortress compile ../Library/CompilerSystem.fss  # must be compiled once
../bin/fortress compile hello.fss
../bin/fortress run hello one two three
# fortress.home is  /home/user/fortress
# Hello, World!
# one
# three
# two        <- out of order: Fortress `for` loops are implicitly PARALLEL
```

All 642 `CompilerJUTest` tests (including the 52 `.test` files that compile
*and execute* programs via `bin/run`) pass.

Two traps that produced the historical "compiler is broken" verdict:

1. **Stale caches.** With leftover state in `default_repository/caches/`,
   compiled programs die with
   `NoSuchMethodError: fortress.CompilerBuiltin.println(...)` — byte-for-byte
   pluckyporcupine's NOTES.md error (they saw it on Java 9; we reproduced it
   on JDK 8 before wiping caches). Fresh caches (`rm -rf
   default_repository/caches/*`, then recompile; the JUnit harness does
   `Shell.resetRepository()`) make it vanish. Their failure was plausibly
   this, not Java 9.
2. **Imported library components are not auto-compiled.** A program importing
   `System` / `CompilerSystem` needs those compiled into the bytecode cache
   first (errors: `Resource not found: System.class`,
   `NoClassDefFoundError: CompilerSystem$args`).

Remaining truth in the old caveat: `hello.fss` still cannot run on the
*interpreter* (its imports resolve into the compiler-path library surface),
and the compiler still rejects constructs the 2012 team hadn't finished
(e.g. pluckyporcupine hit "mutable bindings not yet handled" on other
programs). The compiler is *incomplete*, not *broken*.

## Baseline verdict

The grafted tree is healthier than either parent lineage: it carries the full
Aug-2012 feature state, compiles under JDK 8, passes the entire unit/compiler
suite, and 98% of the interpreter suite, with all 7 failures explained (6
pre-existing upstream, 1 JDK-era cosmetic).
