# Skeptic's judgement on rung X, `rung-export-var`

Verdict: **approved, with five required corrections.** The landed code change is
right, minimal, test-first and gated; I ran its gated test myself at one thread
and at four and watched it pass. Every correction below is in the record, not in
the code: the rung's account of the interpreter divergence is wrong, and it is
wrong because the competing-declaration grep it reports as clean missed one
declaration.

My own programs are in `probes/skeptic/` (nine sources the worker did not write)
and my three captures are `probes/skeptic/skeptic-differentials.txt`,
`probes/skeptic/skeptic-name-isolation.txt` and
`probes/skeptic/skeptic-gated-and-shared.txt`. Every differential was run at
`FORTRESS_THREADS=1` and at `FORTRESS_THREADS=4`; both columns are in the
captures and both are reported below.

## 0. The provenance block

Five lines, all present, all opened with `sed -n` and all saying what the block
says.

- `problem:` `compiler_tests/ExportVarRungX.fss:21` is `shared := 23`.
  `probes/gated-tests-preedit.txt:15` is `Cannot assign to immutable variable:
  ExportVarRungXApi.shared`. `probes/link-and-walk-preedit.txt:6` is `Could not
  find an implementation for API P8Api on path`.
- `spec:` `Specification/basic/components/source-code.tex:332-343` is the
  satisfaction clause and ends at `:342-343` with "the modifiers including the
  mutability of a variable must be the same in the exported and satisfying
  declarations". `initialization.tex:26-30` is the transitive-closure-and-prepend
  clause. `overview.tex:33-35` is "the references of a component to an imported
  api are resolved to a component that exports that api". No `Specification/library/apis/`
  citation appears anywhere in the report; the three are all from `basic/`.
- `precedent:` `CodeGen.java:5935-5952` is `addTopLevelVarBinding` and `:5945-5951`
  is the `lv.isMutable()` branch. `STypeChecker.scala:307,324,334,356` are
  `getTypeFromName`, `nameHasBinding`, `getModsFromName`, `getFnIndicesFromName`,
  each dispatching an api-qualified name to `getEnvFromApi(api)`.
  `disambiguator/TopLevelEnv.java:581-590` is `hasQualifiedVariable`, which is
  `getApiName` / `unwrap` / `makeLocalId` / `variables().containsKey` -- the
  shape `importedVarIsMutable` copies.
- `deviation:` `VarCodeGen.java:316-320` is `MutableStaticBinding`'s only
  constructor and it takes no `List<StaticArg>`, so the claim that the mutable
  branch drops the reference's static args is true, and true of
  `addTopLevelVarBinding` in the same way.
- `historical:` three files. The diff touches exactly three files of the 2012
  tree -- `compiler/codegen/CodeGen.java`, `scala_src/typechecker/STypeChecker.scala`,
  `scala_src/typechecker/impls/Operators.scala` -- and all three are named. The
  other eight changed files under `ProjectFortress/` are new.

## 1. The recorded failure

It exists, and it is genuinely pre-edit rather than reconstructed. Commit
`981ed0261` carries the eight test files and the three pre-edit captures and
carries no change under `src/`; the source edits arrive only in `1795ed7a7`.
`probes/gated-tests-preedit.txt` records the two new tests on `8590d7a9e` at both
thread counts: `:14-16` the checker's refusal, `:25` `Resource not found :
ExportVarRungX.class`, `:31` `Failed to satisfy run_out_contains`, `:54` `Tests
run: 2, Failures: 2`, and `:57-68` the XXX test already red-as-expected. The
second half of the defect, which the checker hid, is recorded separately at
`probes/probes-preedit.txt:218-231`: `fixed = 11` prints and then
`NoSuchFieldError: Class SameVarApi$shared does not have member field
'com.sun.fortress.compiler.runtimeValues.FZZ32 ONLY'`.

## 2. The diff, read against the specification and the provenance block

Three files, about forty lines, and it does what the report says and only that.

`Operators.scala:444` changes `env.isMutable(id)` to `isMutableName(id)`. The new
`STypeChecker.isMutableName:345-350` is written to the letter of
`getModsFromName:334-339`: same `getRealName(name, toListFromImmutable(current.ast.getImports))`
head, same three cases, `getEnvFromApi(api).isMutable(id)` for the api-qualified
one and `env.isMutable(id)` for the bare one. The unqualified branch is
therefore byte-for-byte the old behaviour, and `getRealName`
(`scala_src/useful/SNodeUtil.scala:73-74` over `getAliasedName:43-67`) rewrites
only a name that already carries an api, so no local name changes meaning. The
api's environment answers because `NestedStaticEnv.lookup`
(`staticenv/StaticEnv.scala:123`) strips the api from the name and
`STypeEnv.extractVariableBindings:257-270` binds under the local name with
`v.mutable` carried through; `STypeEnv.isMutable:105-109` is
`binding.mutable || binding.mods.isMutable`.

`CodeGen.forVarRef:5984-5992` branches on the new `importedVarIsMutable:5960-5967`
and builds `MutableStaticBinding` with `NamingCzar.jvmBoxedTypeName(ty, thisApi())`,
which is exactly the pair of arguments `addTopLevelVarBinding:5947-5948` passes.
The write side gives a mutable variable's singleton field the cell descriptor at
`generateVarDeclInnerClass:5879-5881`, so the two sides now agree. The helper is
safe on the three ways it can miss: no api name, no `ApiIndex`, or no `Variable`
all yield `false` and the old `StaticBinding`. `SingletonVariable.mutable()`
(`compiler/index/SingletonVariable.java:46-48`) returns `false`, so a reference
to an imported singleton object -- which also reaches this path -- is
unaffected.

Against the specification: `source-code.tex:332-343` makes the api's `var shared:
ZZ32` and the component's `var shared: ZZ32 = 7` one declaration whose mutability
is part of what the api states, and `initialization.tex:26-30` prepends the
imported declarations rather than copying values, so an importing component's
assignment must reach the same variable. That is what `MutableStaticBinding` gives:
both sides read and write the one `MutableFValue` in the singleton field
(`VarCodeGen.java:322-386`). I confirmed the "one variable" reading by experiment,
below.

One note on the mutable branch, not a correction: it discards `lsargs`, and
`VarCodeGen.pushValue(mv, static_args)`'s base implementation
(`VarCodeGen.java:96-101`) throws a `CompilerError` on a non-empty
`static_args`, where the immutable branch would have attempted an instantiation
map. Loud before, loud after, and the precedent drops them the same way.

## 3. The precedent search

The codegen count is right and I re-ran it: `NamingCzar.jvmClassForToplevelDecl`
has exactly three callers in the tree, all in `CodeGen.java` (`:5925` the writer,
`:5943` and `:5983`), two of them build a `VarCodeGen`, one branched on
mutability and one did not, and the one that did not was the site. Two sites,
second now repaired -- the number is given and it is correct. The checker count
is right too: one wrong shape (`Operators.scala:444`), four right
(`STypeChecker.scala:307,324,334,356`), and `ExportChecker.scala:233` and
`IndexBuilder.scala:399` read an AST node rather than an environment.

The gap is what the rung quoted without engaging. It cites
`repair-r1-atomic-static/REPORT.md` for "The fix is in `forComponent`". That
sentence is `repair-r1-atomic-static/REPORT.md:180`, and the same line continues:
"The alternative was to teach the fresh-import path to look the declaration's
mutability up in the component index and build the matching binding there; I
rejected it because it puts the mutability decision in two places". Teaching the
fresh-import path to look mutability up in an index is what this rung did. The
rejection does not transfer as it stands -- for an imported variable there is no
local `LValue` to register up front, so the api's index is the only source -- but
R1's reasoning does imply an alternative this rung's decision list does not
name: registering a binding for every imported api's variables in
`forComponent`, beside `addTopLevelVarBinding`, which would keep one decision
site at the cost of binding variables that are never referenced. Required
correction 4.

## 4. The test

It exercises the defect: `ExportVarRungX.fss:19-22` reads the immutable `fixed`,
reads the mutable `shared`, assigns it and reads it back, and every assertion
message carries a citation and nothing else. I ran both new tests myself:
`probes/skeptic/skeptic-gated-and-shared.txt:11-17` is `link ... OK`, `run ...
PASS`, `Passed`, `OK (2 tests)` at one thread and `:31-37` the same at four;
`:19-28` and `:39-48` are the XXX test `Saw expected failure`, `OK (1 test)`, at
both counts. Each of the eight new files carries the standard copyright header
and exactly one comment line pointing at `REPORT.md`; there is no provenance
essay.

The XXX test is a real gate and not a wish. `FileTests.java:932` derives
`shouldFail` from the file name for the `.test`-driven suite, and
`SourceFileTest:384-403` -- the code that actually judges a `link` command --
fails the test at `:400-402` with "Missing expected failure" if the link ever
stops failing, and at `:396-398` with "Saw wrong failure" if it fails for a
different reason. The rung's own demonstration
(`probes/xxx-goes-red.txt:30-46`) exercises the second of those two, not the
first: with a same-named component present the link still failed, so what was
shown red is the `link_err_contains` assertion rather than the disappearance of
the failure. Both branches end in `fail()`, so the gate holds either way; the
report should say which branch it demonstrated. That is the smallest item on my
list and I have folded it into required correction 5.

The test's one real hole is the negative direction, which is required correction
3.

## 5. Competing declarations

For the names the rung adds I re-ran the grep over `tests/`, `compiler_tests/`,
`other_compiler_tests/`, `library_tests/`, `not_passing_yet/`,
`not_working_library_tests/`, `demos/`, `Library/`, `LibraryBuiltin/` and
`src/com/sun/fortress/` whole. `ExportVarRungX`, `ExportVarRungXApi`,
`ExportVarRungXLib`, `ExportVarRungXLibApi`, `XXXExportVarRungXLinked`,
`bumpLinked`, `importedVarIsMutable` and `isMutableName` occur only in the
rung's own files. `linked` occurs elsewhere only in prose
(`demos/100.out`, `demos/blogs10000.out`, `repository/FortressRepository.java`).
`fixed` occurs elsewhere only in comments.

`shared` does not. `Library/FortressLibrary.fsi:45` declares
`shared[\T extends Any\](x:T): T` and `Library/FortressLibrary.fss:65` defines it
as the identity. That is a top-level declaration of the name, in a directory the
report says the grep covered, and `REPORT.md:325-327` states "`shared`, `fixed`
-- declared nowhere else. Four other corpus files contain the words, all inside
comments". It is false for `shared`, and it is the whole reason section 6 of the
report is wrong.

The compiled path is unharmed: `CompilerLibrary.fsi/.fss` and
`CompilerBuiltin.fsi/.fss` contain no `shared` at all, which is why the rung's
gated test passes. The name is only unlucky, not unsafe.

## 6. The record fragment

The five FACTS lines: the first (the repair), the third (the immutable
same-named export, including the microGPT correction) and the fourth and fifth
(the `compileAll` deletion of the tracked `global.map`, and the `XXX` /
`run_out_contains` constraint) I checked and they are true as written.
`build.xml:42,356-359,539,715` are as described. `FileTests.java:587` does test
`trueFailure != null` before `shouldFail != failed`, in `TestTest`
(`:448-601`), so a `run`-carrying XXX test would indeed be red the day it is
written; 225 `XXX*.test` files exist in `compiler_tests/` now, 224 before this
rung, and none of them carries a `run` line or a `run_out_contains` key. I
checked the microGPT citations one by one: `apl/mg/MicroGptApl.fsi:18` and
`run-c4/src/MicroGptFlat.fsi:16` both declare `corpus: Corpus` immutably, both
components share their api's name (`MicroGptApl.fss:12-13`,
`MicroGptFlat.fss:9-10`), the satisfying declaration is the immutable
`MicroGptFlat.fss:48`, and `MicroGptFlatCheck.fss:10` imports `MicroGptFlat` and
reads `corpus` at `:38,40,72`. The correction to the batch record's premise
stands.

The ledger note cites row 320, which exists at `explorations/fortress-gap-ledger.md:331`,
appends without renumbering, and is consistent with what the row already says --
the row itself derived the two-part fix and predicted that fixing the class name
alone would only move the exception. A reader six months out can check it: the
probes, the captures and the line numbers are all in the tree.

The second FACTS line and the proposed row 344 are the corrections.

## 7. The three homes

- **Mutability lost at the checker** -- home 1. Assertion
  `ExportVarRungX.fss:22`, passing in my own run of the gated test at one thread
  and at four before this judgement was written.
- **Mutability lost at codegen** -- home 1. Assertions `ExportVarRungX.fss:19-20`,
  same run.
- **A component named differently from the api it exports cannot be found** --
  home 2. `XXXExportVarRungXLinked.fss` + `.test` with the api pair beside them,
  `shouldFail` from the name, red-as-expected in my own run at both thread
  counts, and the specification settles it (`overview.tex:33-35`). Correctly
  placed, and I agree the repair is past one rung: the class name is decided by
  `NamingCzar.repairedApiName:1673-1679` through
  `jvmClassForToplevelDecl:1653-1656`, the emitted class is the component's
  (`CodeGen.java:390`), and nothing populates `Linker`'s map except
  `LinkShell`'s verbs, so `whoIsImplementingMyAPI` falls back to the api's own
  name at `linker/Linker.java:73-76`. I confirmed the fallback and the three
  reserved repair sites (`CodeGen.java:413-419`, `:1856`, `:6599-6606`).
- **The interpreter's "undefined variable [shared]"** -- the rung classifies it
  as home 2 owed, discharged as a ledger row plus a committed capture because its
  gated home is in a corpus this batch may not run. I accept that disposition
  and the reasoning for it. What I do not accept is the defect: see below.
- **Home 3** -- none, and I agree. Every defect measured here, mine included,
  has a prose clause.

## 8. My own differentials, and the one that breaks the report

Nine programs of my own, each run under `bin/fortress FILE.fss` and under
`bin/fortress compile` + `run`, at one thread and at four. Captures:
`probes/skeptic/skeptic-differentials.txt`, `probes/skeptic/skeptic-name-isolation.txt`.

| my program | what it asks | walk | compiled | T=1 vs T=4 |
|---|---|---|---|---|
| `SkAssignFrozen.fss` | assign to an imported **immutable** variable | `Cannot assign to immutable frozen` | `Cannot assign to immutable variable: SkVarApi.frozen` | identical |
| `SkReadWrite.fss` | read, assign, read back a mutable `ZZ32` **and** a mutable variable of an **object type** | `100 / 105 / 3 / 9 / 200` | same five values | identical |
| `SkAtomicCount.fss` | two implicit threads, 20000 `atomic` increments each, of an **imported** variable | `counter = 40100`, PASS | `counter = 40100`, PASS | identical |
| `SkTwoWriters.fss` | two components assigning the same imported variable | `112 / 112`, PASS | `112 / 112`, PASS | identical |
| `SkAlias.fss` | `import SkVarApi.{counter => ctr}` | `Variable ctr is not defined.` | same | identical |
| `SkMinApi` pair + `SkMinMain`, `SkMinAlphaFirst` | the rung's shape with names `alpha`/`beta` | **both print** | -- | identical |
| `SkKwApi` pair + `SkKwMain` | the same shape renamed `shared`/`fixed` | `undefined variable [shared]` | -- | identical |
| `SkKwImmApi` pair + `SkKwImmMain` | `shared` declared **immutable** in the api | `undefined variable [shared]` | -- | identical |
| `SkKwLocal.fss` | `var shared` in one component, read and assigned, no api | `7` then `9` | -- | identical |
| `SkKwCall.fss` | `shared(3)` | `shared(3) = 3` | `Variable shared is not defined.` | identical |

Four results are worth stating plainly.

**The repair is sound beyond what the rung's test claims.** A mutable variable of
an object type imported through an api can be assigned and read back
(`skeptic-differentials.txt:49-50`), which exercises
`InstantiatingClassloader.generalizedCastTo` on a user type rather than on
`FZZ32`. Two components importing the same api see one variable, not two
(`:73-75`), which is `initialization.tex:26-30` observed rather than argued. And
40000 `atomic` increments of an imported variable across the two implicit
threads of `do ... also do ... end` lose nothing at four threads
(`:169-170`), which is the check the batch made mandatory after
`AtomicTopLevelVar` was found failing at four threads and passing at one.

**The widened check still refuses what it must.** Assignment to an imported
*immutable* variable is refused with the api-qualified name, at both thread
counts (`skeptic-differentials.txt:12-15`, `:127-130`), and walk refuses it too.
Nothing in the gate says so, which is correction 3.

**Import aliasing is absent, not newly broken.** `SkAlias.fss` fails identically
on both paths, which is `map/spec-to-implementation.md:155`'s row --
"import aliasing (`as`, `=>`) ... absent on both ... 13" -- so this is ledger row
13 and not a new defect. It is worth appending my two-path capture to that row.

**The interpreter divergence is not what the rung says it is.** The report's
section "The divergence with the interpreter" and the proposed row 344 say "the
interpreter cannot see a mutable top-level variable exported through an api at
all". My `SkMinApi`/`SkMinMain` pair is the rung's own shape with the two
variables renamed `alpha` and `beta`, and walk reads the mutable one and the
immutable one, in either order (`skeptic-name-isolation.txt:6-13`, `:42-49`).
Rename them `shared` and `fixed` and walk fails exactly as the rung's probe does
(`:14-19`). Declare `shared` **immutable** in the api and walk fails identically
(`:20-25`), which removes mutability from the story. Put `var shared` in a single
component with no api and walk reads it and assigns it (`:26-29`), which removes
top-level mutability from the story. Copy my `alpha`/`beta` pair into the
worker's own probe directory and it prints there too (`:83-86`), which removes
the directory from the story.

What is left is the name. `Library/FortressLibrary.fsi:45` declares
`shared[\T extends Any\](x:T): T`, the interpreter's default library implicitly
imports it (`Specification/basic/components/source-code.tex:305`, "Every
component implicitly imports the Fortress core APIs"), and `shared(3)` evaluates
to `3` under walk (`skeptic-name-isolation.txt:30-32`). So in the interpreter
world an importing component has two declarations of `shared` in the value
namespace with overlapping reaches, and the reference resolves to neither as a
variable. The compiler prelude declares no `shared`, so the compiled path has no
conflict at all and is right for its own prelude
(`skeptic-name-isolation.txt:33-36` is `Variable shared is not defined.` for
`shared(3)` on the compiled path).

Which of the four outcomes: **the specification settles it, and against both
paths.** `Specification/basic/declarations.tex:426-431` -- "It is also a static
error for multiple declarations with overlapping reaches to declare the same name
in the same namespace unless the declarations are overloaded or one declaration
shadows the other" -- and `:533`, "No other shadowing is permitted in a Fortress
program", with none of the four permitted shadowings at `:481-527` covering a
top-level imported variable against a top-level library function. `shared` is not
an accident of this library either: `Specification/advanced/parallelism-locality/shared-local.tex:60`
names "the function `shared` provided by the Fortress libraries" and `:73-76`
specifies `isShared` and `localize`. So the program the rung probed is in static
error; walk reports it at run time as an undefined variable, and the compiled
path cannot report it because its prelude is missing a function the
specification requires. Neither behaviour is "the interpreter cannot see an
exported mutable variable", and the api export of top-level variables works in
walk, mutable or immutable, whenever the name is free.

## 9. The failure-mode question

The rung does replace loud failures with quiet values, twice, and the values are
the specification's. The static error `Cannot assign to immutable variable:
ExportVarRungXApi.shared` becomes a clean compile and the value `23` after
`shared := 23`; the run-time `NoSuchFieldError` on `SameVarApi$shared` becomes
the value `7` on a read. `source-code.tex:332-343` with
`initialization.tex:26-30` require exactly that: one variable, whose mutability
the api states, reached by the importing component's assignment. Diagnosability
is not lost where it is still owed -- the same static error still fires, with the
api-qualified name, for an imported immutable variable, which I measured at both
thread counts. The one place a loud failure became quiet in the wrong direction
is inside `importedVarIsMutable`: a missing `ApiIndex` or a missing `Variable`
returns `false` and reinstates the old `NoSuchFieldError` at run time rather than
saying anything at compile time. I could not construct a program that reaches it,
since disambiguation refuses an unknown api first, so I record it and do not ask
for a change.

## 10. Required corrections

*Note added by the merged-diff review of 2026-09-20: "row 344" in this file (`:210`, `:280`,
`:341`) is the rung's own provisional number for the row this judgement refutes, and that
row was never opened. The landed rows of this rung are **343**, the unreported collision
between an api-declared variable and the implicitly imported `shared`, which is the
replacement this judgement proposed, and **344**, the compiler prelude's missing locality
functions.*

1. **`record.md`'s provisional row 344 and `REPORT.md`'s section "The divergence
   with the interpreter" must be rewritten.** As they stand they assert, as
   NEGATIVE-VERIFIED, that the interpreter cannot see a mutable top-level
   variable exported through an api; `probes/skeptic/skeptic-name-isolation.txt`
   shows walk reading and assigning one whenever the name is free, and failing on
   an immutable one whose name is `shared`. Proposed replacement text is in my
   `recommendedRows` entry 1.
2. **The second FACTS line's companion claim must go with it.** The FACTS line
   about exported functions failing as exported variables do is true and I
   verified it; what must not be folded is the interpreter sentence in
   `REPORT.md:181-200` and the `notDone` entry that repeats it.
3. **Add the negative case to the gate.** The rung widened a permission check to
   consult the exporting api's environment and nothing gated asserts that it
   still refuses. The corpus's only guard on that message, `XXX6bp.test`, tests
   an unqualified local name (`compiler_tests/Compiled6.bp.fss:28-29`). The
   cheapest closure is `compiler_tests/XXXExportVarRungXFrozen.fss` plus `.test`
   -- `compile` and `compile_err_contains=Cannot assign to immutable variable:
   ExportVarRungXApi.frozen` -- beside the existing api pair, which already
   declares the immutable `fixed`; the behaviour is measured at
   `probes/skeptic/skeptic-differentials.txt:12-15` and `:127-130`. No code
   change.
4. **`REPORT.md`'s precedent section must engage `repair-r1-atomic-static/REPORT.md:180`.**
   It quotes that line for the shape it followed and does not mention that the
   same sentence rejects looking mutability up in an index "because it puts the
   mutability decision in two places", nor name the alternative that reasoning
   implies (registering bindings for imported apis' variables in
   `forComponent`). One paragraph, and the decision list gains a fourth entry.
5. **Three cited numbers are wrong and one is imprecise.** `REPORT.md:292` and
   the handover say "34 JUnit tests" for `probes/differential-postedit.txt`; the
   capture's seven `.test` files run 1 + 2 + 2 + 2 + 2 + 3 + 20 = 32 at each
   thread count. `REPORT.md:194` puts `api.unresolvedExports` at
   `BuildApiEnvironment.java:134`; it is `:135`. `REPORT.md:37` says
   `map/spec-to-implementation.md:153-156` "gives three rows"; that span holds
   four, the fourth being the import-aliasing row that answers my `SkAlias`
   probe. And `REPORT.md:218-225` should say that its XXX demonstration
   exercised `FileTests.java:396-398` ("Saw wrong failure"), not the
   disappearance-of-failure branch at `:400-402`.

## 11. What I did not do

I did not edit the worker's source changes, and I did not run `ant testFast` or
`ant testSystem`. I did not rebuild: the tree was already built with the edit in
place (`ProjectFortress/build/.../CodeGen.class` at 05:47:49 against
`CodeGen.java` at 05:47:13) and the five prelude jars were present in
`default_repository/caches/bytecode_cache`, so every run above is against the
rung's own compiled tree. My probe runs added jars to that gitignored cache and
nothing else; the copies I made into `probes/` for the directory control were
removed inside the same capture (`skeptic-name-isolation.txt:87-88`).

## 12. The tracked-path check

Run over this file in all four citation forms the shared prefix's loop misses --
full `explorations/compile-ladder/...` paths, the relative `probes/...` ones, the
`ProjectFortress/`, `Specification/`, `Library/` and `explorations/` ones, and
the bare `compiler_tests/`, `demos/` and `tests/` ones -- plus
`map/spec-to-implementation.md`, `repair-r1-atomic-static/REPORT.md`,
`build.xml` and `default_repository/caches/global.map` by hand. Everything exists
and is tracked with one printed line, which stands: `MISSING
ProjectFortress/compiler_tests/XXXExportVarRungXFrozen.fss` is the file required
correction 3 asks the rung to add, not evidence I am citing.
