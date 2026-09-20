# Rung X -- a top-level variable exported through an api

problem: `ProjectFortress/compiler_tests/ExportVarRungX.fss:21` (`shared := 23`, refused by the checker and then, once the checker allows it, `NoSuchFieldError` from codegen), measured on the base tree in `probes/gated-tests-preedit.txt:15` and `probes/link-and-walk-preedit.txt:6`
spec: `Specification/basic/components/source-code.tex:332-343` (an api's top-level variable declaration is satisfied by the component's, with the same mutability) and `Specification/basic/components/initialization.tex:26-30`; for the deferred half `Specification/basic/components/overview.tex:33-35`
precedent: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5935-5952` (`addTopLevelVarBinding`, which branches on mutability) and `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/STypeChecker.scala:307,324,334,356` (the four api-aware name lookups); the api-qualified variable lookup copies `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java:581-590`
deviation: the mutable branch of the fresh-import path drops the reference's static args, exactly as `addTopLevelVarBinding:5945-5951` does, because `VarCodeGen.MutableStaticBinding` has no static-args constructor (`codegen/VarCodeGen.java:316-320`); the rung repairs the mutability half of ledger row 320 and does not repair the class-name half, which it measured to be a property of the repository and not of variables
historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/STypeChecker.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala`

## What the rung landed

A component may now read, assign and read back a mutable top-level variable that
it imports through an api. Two edits, in two phases:

- **The checker.** `impls/Operators.scala:444` asked `env.isMutable(id)` -- the
  *component's* type environment -- for a name that, when the variable is
  imported, is api-qualified. The component has no binding for it at all, so
  `STypeEnv.isMutable` (`staticenv/STypeEnv.scala:105-109`) returned false and
  every assignment to an imported mutable variable was refused with "Cannot
  assign to immutable variable". The fix is a fifth member of the api-aware
  lookup family in `STypeChecker.scala`, `isMutableName` at `:345-350`, written
  to the letter of its four siblings at `:307`, `:324`, `:334` and `:356`, and
  `Operators.scala:444` now calls it.
- **Codegen.** `CodeGen.forVarRef`'s fresh-import path built a plain
  `VarCodeGen.StaticBinding` with the declared type's descriptor
  (`CodeGen.java:5985-5998` after the edit), while the declaring side gives a
  *mutable* variable's singleton field the `MutableFValue` cell descriptor
  (`generateVarDeclInnerClass:5874-5883`). The fix consults the declaring api's
  index and builds `MutableStaticBinding` when the declaration is mutable;
  the helper is `importedVarIsMutable` at `CodeGen.java:5960-5967`.

`NamingCzar.java` is not edited. The batch record expected this rung to touch it;
the measurement below is why it does not, and why two files the record did not
name are edited instead.

## Where does this fix belong

`explorations/coordinator/map/spec-to-implementation.md:153-156` gives three rows
for this feature: "component / api declaration" (checker `ExportChecker.scala`,
codegen `CodeGen.forComponent:1843`), "import" (checker
`disambiguator/ExprDisambiguator.scala`, codegen `forImportNames:3855`, a no-op)
and "export, linking" (checker `linker/ApiLinker.scala`, codegen
`linker/Linker.java:150`, repository `GraphRepository.java`). The defect the
probes measure is not one defect but two, and the rows separate them:

1. **Mutability is lost when a declaration crosses the api boundary.** This is
   the variable's own defect. It appears twice on the way down -- once in the
   checker, once in codegen -- and both sites are named by the "import" row.
   Repaired here.
2. **A component whose name differs from the api it exports cannot be found at
   all.** This belongs to the "export, linking" row, and the measurement shows
   it is not a variable defect and not a codegen defect. Deferred, with a gated
   XXX test and a ledger row.

## The measurement that separates them

The batch record states that exported *functions* "do link across differing api
and component names" and that the variable's class-name failure is therefore
variable-specific. That is not what the tree does. Three probes settle it
(`probes/probes-preedit.txt`, `probes/link-and-walk-preedit.txt`):

| probe | shape | base tree |
|---|---|---|
| `probes/FnApi.fsi` + `FnLib.fss` + `FnMain.fss` | an exported **function**, api and component named differently | `NoClassDefFoundError: FnApi` (`probes-preedit.txt:29`) |
| `probes/P8*` | an exported **mutable variable**, named differently | `NoClassDefFoundError: P8Api$shared` (`:96`) |
| `probes/P9*` | an exported **immutable variable**, named differently | `NoClassDefFoundError: P9Api$shared` (`:163`) |
| `probes/SameVarApi.fsi` + `SameVarApi.fss` + `SameVarMain.fss` | both, api and component **same name** | immutable `fixed = 11` prints; mutable dies `NoSuchFieldError: Class SameVarApi$shared does not have member field 'FZZ32 ONLY'` (`:218-231`) |
| `probes/ObjVarApi.*` + `ObjVarMain.fss` | an exported **immutable variable of an object type**, same name | `data.size = 5`, exit 0 (`link-and-walk-preedit.txt:42-44`) |

A function fails exactly as a variable does, with the same exception and the same
cause: `packageAndClassName` is the *component's* name (`CodeGen.java:390`) and
both `functionalRefToPackageClassAndMethod` (`:3761-3818`, via
`idToPackageClassAndName`) and `jvmClassForToplevelDecl`
(`NamingCzar.java:1653-1656`, via `repairedApiName:1673-1679`) resolve a
reference to the *api's* name. Naming a variable's class after the implementing
component would therefore make variables link where functions, types and
singleton objects still do not, and would leave the compiled path incoherent.

Two further probes show the divergence is not even reachable through the real
entry points. `fortress link P8Main` refuses before codegen -- "Could not find an
implementation for API P8Api on path" (`link-and-walk-preedit.txt:4-9`) -- and so
does the **interpreter**: `walk FnMain.fss`, `walk P8Main.fss` and
`walk P9Main.fss` all print the same message (`:45-60`). So the
`NoClassDefFoundError` of ledger row 320 is reachable only by hand-compiling each
file with `fortress compile`, which is what R1's probe did; through `link` and
through `walk` the failure is one clean diagnostic from the repository, on both
paths. The name coincidence is the *repository's* assumption, not codegen's:
`Linker.whoIsImplementingMyAPI` (`linker/Linker.java:62-89`) consults a
persisted map and, finding nothing, returns the api's own name at `:72-76`
(`GraphRepository.nodeDependsOnApi:334-350` then looks for a component with that
name). Nothing populates that map except the user, by hand, through
`LinkShell.main`'s `alink` and `clink` verbs (`linker/LinkShell.java:41-70`);
`linker/README:28-40` describes the intended design in full.

So the class-name half is a missing *discovery* step in the repository -- "which
component exports this api" -- shared by both execution paths and by every kind
of declaration. The specification settles it: `basic/components/overview.tex:24-35`
says components "never refer to other components directly; all external
references are to apis ... the references of a component to an imported api are
resolved to a component that exports that api". Resolved to a component that
*exports* it, not to one that happens to be *named* like it. Repairing that means
either teaching `whoIsImplementingMyAPI` to scan the source path, or emitting the
api-named forwarder the team reserved in three comments in `CodeGen.java` --
`:411-441` `exportedToUnambiguous`, which collects every exported name "so that
unambiguous names from APIs can also be emitted" and says of itself "it looks
like this information is currently unused"; `:1856` `/* Need wrappers for the
API, too. */`; and `:6599-6606`, the `????` where "a forwarding wrapper" was to
go. Either is a design change well past one rung, and the batch record names this
exact outcome as the rung's stop ("if the only clean fix is in the link step or
changes how every exported function is emitted"). The rung does not half-repair
it: it does not touch the class name at all.

## The precedent search

**Codegen, mutability.** Three callers of `jvmClassForToplevelDecl` in the whole
tree, all in `CodeGen.java`: `forVarDeclPrePass:5910-5933` (the writer),
`addTopLevelVarBinding:5935-5952` (the declaring component's binding) and
`forVarRef:5989` (the fresh import). Of the two that build a `VarCodeGen`, one
branches on mutability and one does not: `addTopLevelVarBinding:5945-5951`
chooses `MutableStaticBinding` or `StaticBinding` from `lv.isMutable()`;
`forVarRef` always chose `StaticBinding`. One right shape, one wrong, and the
wrong one is the site. R1 added the right one (`repair-r1-atomic-static/REPORT.md`,
"The fix is in `forComponent`"), and a precedent that repaired a defect is
evidence of the same defect elsewhere in the file: these are the only two sites
that build a binding for a top-level variable, so the count is two and the second
is now repaired.

**The checker.** One site of the wrong shape and four of the right, all found by
grepping `isMutable` over `scala_src/` (`ExportChecker.scala:233` and
`IndexBuilder.scala:399` read an AST node, not an environment, and are not
lookups). Wrong: `impls/Operators.scala:444`, `env.isMutable(id)` on the
component's environment. Right: `STypeChecker.scala:307` `getTypeFromName`,
`:324` `nameHasBinding`, `:334` `getModsFromName`, `:356`
`getFnIndicesFromName`, each of which sends an api-qualified name to
`getEnvFromApi(api)`. The read of an imported variable goes through
`getTypeFromName` (`impls/Misc.scala:624-625`) and therefore already worked,
which is why the immutable export in `SameVarMain` prints and only the
assignment was refused.

**Why the api's environment answers.** `STypeEnv.extractVariableBindings`
(`staticenv/STypeEnv.scala:257-270`) binds each variable under the *local* name
from the index map and ignores its `api` parameter -- unlike
`extractTypeConsBindings:206-216`, which uses it to build `NF.makeId(api, x)`.
It does not matter for the lookup, because `NestedStaticEnv.lookup`
(`staticenv/StaticEnv.scala:123`) strips the api from the name it is given. It
does mean the api parameter is dead in that one method, which is a tidiness
question and not a defect; the rung leaves it alone.

**The interpreter is not a precedent for a class name.** It binds imports by
environment (`interpreter/evaluator/BuildApiEnvironment.java`, map row
`map/spec-to-implementation.md:153`), and its own library exports no top-level
variable. It is, however, evidence -- see the divergence below.

## The specification derivation

`basic/components/source-code.tex:332-343`, read in full: "A top-level variable
declaration declaring a single variable is satisfied by any top-level variable
declaration that declares the name with the same type (in the component, the
type may be inferred). ... In either case, the modifiers including the mutability
of a variable must be the same in the exported and satisfying declarations." So
`var shared: ZZ32` in the api and `var shared: ZZ32 = 7` in the component are
one declaration, and its mutability is part of what the api states. The checker
already enforces the clause in the other direction -- it refuses `x: T := e`
against `var x: T` "due to different mutabilities" and `var x: T` against
`x: T := e` "due to different modifiers" (`rung-timing/probes/export-variable.txt`,
`-2.txt`) -- so the export side reads the modifier and the use side threw it
away. There is nothing to argue: the api says mutable, and an importing
component must be able to assign.

`basic/components/initialization.tex:26-30`: "If a simple component has imports,
take the transitive closure of all imported apis. Collect all declarations in
this transitive closure, in any order, and prepend them to the component
definition." Prepended declarations, not copies of values: assignment through
the import reaches the same variable, which is what `MutableStaticBinding` gives
(the singleton field holds the cell and both sides read and write it;
`VarCodeGen.java:322-386`).

For the deferred half, `basic/components/overview.tex:33-35` is quoted above.

## The divergence with the interpreter, and what the specification says

`walk SameVarMain.fss` prints `fixed = 11` and then dies with **"undefined
variable [shared]"** (`probes/link-and-walk-preedit.txt:61-74`). The interpreter
does not merely mis-handle the imported mutable variable, it cannot see the name
at all, while the compiled path at least resolved it and died on the field. So
walk and the compiled run disagree, and the specification
(`source-code.tex:332-343`) settles it **against the interpreter**: the api's
`var shared: ZZ32` is a legal declaration satisfied by the component's, and the
name is in scope in any component importing the api.

The mechanism, read in the tree: `BuildApiEnvironment.forVarDecl`
(`interpreter/evaluator/BuildApiEnvironment.java:118-140`) puts a name into the
api's environment only when `exporter.getEnvironment().getValueRaw(sname)`
returns a value (`:129-136`); otherwise the declaration goes to
`api.unresolvedExports` at `:134`. For `fixed` it returns a value and for
`shared` it does not, which is exactly what the two probe lines show. And even
if it did, `putValueRaw(sname, fv)` at `:132` copies the *value*, so an
assignment made by an importing component would not reach the exporter's
variable: the repair has to bind the exporting component's mutable cell, not its
value. That is an interpreter repair in an interpreter file, outside this rung,
and it gets a ledger row (row 344 provisional, `record.md`).

## The three homes of every defect measured here

1. **Repaired in this rung, so it is an assertion in the gated test.** Both
   halves of the mutability defect. `compiler_tests/ExportVarRungX.fss:19-22`
   asserts the immutable read (`assert(fixed, 11, ...)`), the mutable read
   (`assert(shared, 7, ...)`), and the assignment and read-back
   (`shared := 23`; `assert(shared, 23, ...)`). Each message string carries the
   citation and nothing else does. The assertions pass at one thread and at four
   (`probes/gated-tests-postedit.txt`) and they failed before the edit
   (`probes/gated-tests-preedit.txt`).
2. **Deferred and the specification settles it, so it is a gated
   expected-failure test.** The differing-name defect:
   `compiler_tests/XXXExportVarRungXLinked.fss` with
   `ExportVarRungXLibApi.fsi` and `ExportVarRungXLib.fss` beside it, gated by
   `XXXExportVarRungXLinked.test`. It covers both an exported variable
   (`linked`) and an exported function (`bumpLinked`), because the probe showed
   the defect is common to both. It is red-as-expected today, at one thread and
   at four, and it was shown to go red on a deliberate local fix: adding a
   same-named component `ExportVarRungXLibApi.fss` -- the one shape the
   repository can discover -- makes the recorded diagnostic disappear, the
   `link_err_contains` assertion is no longer satisfied, and the harness fails
   the test with "Saw wrong failure. link" (`probes/xxx-goes-red.txt:31,36,45-46`);
   removing the file restores the expected failure (`:50-57`). The temporary
   file is gone, which the capture's last lines show.
   The shape is the corpus's own: all 224 `XXX*.test` files in
   `compiler_tests/` assert a diagnostic from a `compile`-family command and
   **none** has a `run` line or a `run_out_contains` key. That is not a
   convention but a constraint: `FileTests.java:587` tests `trueFailure != null`
   *before* `shouldFail != failed`, so an XXX test carrying
   `run_out_contains=PASS` is red on the day it is written. `XXX0b.test`
   asserts this very diagnostic for a different api and is the model followed.
3. **Deferred and the specification is silent** -- none. Every defect this rung
   measured has a specification clause.

One defect measured here has a home the rung could not place in its own corpus:
the interpreter's "undefined variable". Its gated home is an `XXX*.fss` in
`ProjectFortress/tests/`, which the interpreter suite drives by file name
(`FileTests.java:711`). **Decision, with the alternative:** the rung does not add
it. `ProjectFortress/tests/` holds no `.fsi` at all, so the file would be that
corpus's first api pair and its first non-executable component, and it would add
two files to the ladder's own corpus during a batch whose gate includes a ladder
regression; the brief forbids running `ant testSystem` here, so its behaviour in
the gated suite could not be verified before landing it. The alternative --
adding it unverified -- risks turning a shared three-rung gate red for something
that is not this rung's subject. Instead the defect gets ledger row 344
(provisional) naming the file it belongs in, and the batch record already
reserves an interpreter-defect batch (rows 323, 329, 334, 336, 337, 338) for it.
The measurement itself is committed: `probes/link-and-walk-preedit.txt:61-74`.

## Recorded failure and recorded pass

**Failure**, on the base tree `8590d7a9e` with the edit not yet written:
`probes/gated-tests-preedit.txt`. The key line, `:15`:

    Cannot assign to immutable variable: ExportVarRungXApi.shared

and then `:25-32`, the run that could not happen: `Resource not found :
ExportVarRungX.class`, `Failed to satisfy run_out_contains; expected PASS`,
`Tests run: 2, Failures: 2` (`:54`). The same file records that the XXX test was already
red-as-expected on the base tree (`:57-68`). Both were run at one thread and at
four.

The `NoSuchFieldError` behind the checker's refusal -- the second half, which
only becomes reachable once the checker allows the assignment -- is recorded
separately on the base tree, because the checker hid it:
`probes/probes-preedit.txt:231`, `NoSuchFieldError: Class SameVarApi$shared does
not have member field 'com.sun.fortress.compiler.runtimeValues.FZZ32 ONLY'`,
from a probe that only *reads* the variable.

**Pass**, on the repaired tree: `probes/gated-tests-postedit.txt`. The key lines,
`:9-15`:

    . link compiler_tests/ExportVarRungX  OK (time = 3683ms)
    . run compiler_tests/ExportVarRungX (377ms) PASS
    Passed
    OK (2 tests)

at one thread, and the same at four (`:31-37`).

## The differentials

**Every gated program in the corpus that assigns to a variable**, which is what
a change to the checker's mutability test has to answer for. Derived by walking
every `.test` file's `tests=` line and grepping each named component for `:=`;
the seven `.test` files that carry a `run` or a `compile` the change could reach
are `compiler_tests/XXX6bp.test`, `MutableTopLevelVar.test`,
`MutableTopLevelVarInLoop.test`, `AtomicTopLevelVar.test`,
`AtomicTopLevelObjectVar.test`, `RecursiveApiTest3.test` (the corpus's own api
test, which exercises the fresh-import path) and
`other_compiler_tests/atomicTest.test` (ten programs). All seven pass at one
thread and at four -- 34 JUnit tests, no failures
(`probes/differential-postedit.txt`).

`XXX6bp.test` is the one that matters most: it asserts the exact message
`Cannot assign to immutable variable: a` for an assignment to a **local**
immutable variable with an unqualified name (`compiler_tests/Compiled6.bp.fss:28-29`).
It is the only `.test` file in any corpus that asserts that message (grep over
`compiler_tests/`, `other_compiler_tests/`, `library_tests/`, `tests/`,
`not_passing_yet/`). It still sees its expected failure, at both thread counts
(`differential-postedit.txt:13,107`), which is the check that the unqualified
branch of `isMutableName` is unchanged.

**The P8/P9 probe pair before and after**, which stands in for the ladder subset
(the batch record's `expectedMoves` for this rung is empty: no file in
`ProjectFortress/tests/` has an api): `probes/probes-preedit.txt` and
`probes/probes-postedit.txt`, each running Fn, P8, P9 and SameVar at one thread
and at four, compiling every file in each state first. P8 and P9 are unchanged --
the class-name defect is untouched, by design -- and SameVar changes from
`NoSuchFieldError` to both values printing. Fn is unchanged.

**The interpreter, as evidence rather than oracle**:
`probes/link-and-walk-preedit.txt:45-77` and the same runs after the edit. `walk`
is unaffected by either edit (the checker is off on the interpreter path,
`map/modules-and-phases.md`), and the divergence it shows is the ledger row above.

## Step 6: competing declarations

Every name this rung adds, grepped over all six corpora
(`tests/`, `compiler_tests/`, `other_compiler_tests/`, `library_tests/`,
`not_passing_yet/`, `not_working_library_tests/`, `demos/`), over
`Library/` and `LibraryBuiltin/`, and over `src/com/sun/fortress/` whole:

- `shared`, `fixed` -- declared nowhere else. Four other corpus files contain the
  words, all inside comments (`tests/XXXflatTest.fss:19`,
  `tests/QuickCheckTest.fss:106`, `compiler_tests/Compiled170.fss:15`,
  `MutableTopLevelVarInLoop.fss:28`, `AtomicTopLevelVar.fss:21`).
- `linked`, `bumpLinked` -- declared nowhere else; two `demos/*.out` files
  contain the word `linked` in prose.
- `ExportVarRungX`, `ExportVarRungXApi`, `ExportVarRungXLib`,
  `ExportVarRungXLibApi`, `XXXExportVarRungXLinked` -- no other occurrence
  anywhere, including under `src/com/sun/fortress/`.
- `importedVarIsMutable`, `isMutableName` -- no other occurrence in the tree.

## An operational trap this rung paid for

`ant compileAll` **deletes a tracked file**. `compileAll` depends on
`compileCommon` (`build.xml:539`), which depends on `cleanCache`
(`build.xml:715`), which does `<delete dir="${cache0}"/>` where `cache0` is
`default_repository/caches` (`build.xml:42,356-359`). That directory holds
`global.map`, the linker's persisted `RepoState` (`linker/RepoState.java:176`),
and it is tracked. So every worktree that runs `ant compileAll` shows
`D default_repository/caches/global.map` in `git status` afterwards, and a
`git add -A` at that moment commits the deletion. This rung caught it in
`git status` before its first commit and restored the file with
`git checkout --`; the committed tree does not carry the deletion.

A second trap, already on record and confirmed here: a `fortress compile` of the
five prelude components immediately after two agents' `ant compileAll` runs
overlapped was OOM-killed on `AnyType.fss` (`probes/library-rebuild.txt:2`, "Killed") while the
rest succeeded, leaving `fortress.AnyType.jar` missing from the cache with exit
code 0 for the loop. Re-running that one compile produced it. The jar list has to
be checked, not the exit code.

## What the rung deliberately did not do

- No prelude declaration is changed; `CompilerLibrary` does not export
  `__globalTimeInformation`; the `atomic` rows 319, 322 and 324 are untouched.
- `NamingCzar.java` is not edited: no name this rung produces is new, and the
  class name is the deferred half.
- `STypeEnv.extractVariableBindings`'s unused `api` parameter
  (`staticenv/STypeEnv.scala:257-270`) is left as it is. It is dead rather than
  wrong, because `lookup` strips the api anyway, and changing it would move
  every api variable's binding key for no measured gain.

## The tracked-path check

The shared prefix's loop over `explorations/compile-ladder/...` matches only the
four citations written in full; this report writes most of them relative
(`probes/...`), so the check was run three more times, over the relative
`probes/` citations, over the `ProjectFortress/...` citations, and over the bare
`compiler_tests/`, `other_compiler_tests/` and `tests/` ones, plus the four
wildcard citations (`probes/P8*`, `probes/P9*`, `probes/SameVarApi.*`,
`probes/ObjVarApi.*`) expanded by hand and the ten cross-directory citations
(`rung-timing/probes/export-variable.txt` and `-2.txt`,
`repair-r1-atomic-static/REPORT.md`, the two map files, and the five microGPT
sources). Every path exists and is tracked; nothing printed MISSING or
UNTRACKED.
