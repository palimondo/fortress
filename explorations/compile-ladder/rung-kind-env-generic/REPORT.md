# Climb batch 33, rung V: the code generator's kind environment, and a typecase tuple pattern's names (rows 812 and 822)

- problem: F-34's measure, 4 declarations of the one library refused with a type variable missing from the code generator's kind environment (`__bigOperator2`, `ArrayList`, `app`, `APPCOV`), rows 812 and 822; reproduced by `ProjectFortress/compiler_tests/ComprisesWhereFunctionalMethodChecker.fss:5-11` compiled ('E is not in the kind env [][]')
- spec: `Specification/basic/trait-parameters.tex:329` ("Where Clauses") for row 812; `Specification/basic/expressions/typecase.tex:12` ("Typecase Expressions") for row 822, whose grammar (`:66-67`) has no names in a clause and whose note defers patterns to the pattern-matching proposal (`:15`)
- precedent: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2204-2205` and `:5915-5916` (a nested `CodeGen` over `typeAnalyzer.extendJ(header.getStaticParams(), header.getWhereClause())`); the checker's `scala_src/typechecker/impls/Decls.scala:212` (a function body checked under `this.extend(statics, Some(params), wheres)`); `CodeGen.java:2568-2576` (`bindAndGenerateClauseBody`, a clause's own name) and `:4743-4768` (a tuple's elements bound to several names)
- deviation: none from the precedents' spelling; one in scope: `forTypecase` also binds the names of a clause's tuple pattern (`CodeGen.java:2541-2546`, `:2578-2610`), a wall that row 822's recorded stack goes through (decision 3)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`

## What changed and why

Three edits of `CodeGen.java`, at commit `18d5b51578` (tests first in `33f3e89713`):

1. **The constructor** (`CodeGen.java:498-502`). For each type of the component, the code generator reads the methods that the type inherits, to find the functional methods it must emit for it (`STypesUtil.properlyInheritedMethodsNotIdenticallyCovered`). It read them with the component's analyzer, whose kind environment holds no static parameter. Where a supertype's `comprises` clause lists a type at a `where`-clause variable, the subtype test that compares two inherited methods' owners opens that variable and compares it with the type's own parameter (`TypeAnalyzer.pSubInner`, `scala_src/types/TypeAnalyzer.scala:208` and `:225`, through `:281` and `:298`), and the lookup of that parameter stops: `TypeAnalyzer.scala:1102`. The edit reads them with the type's static parameters and `where` clause in the kind environment. This is row 812's site (`P812b`, below: 'Y is not in the kind env', `Y` the object `Ci`'s own parameter).
2. **A generic function's or generic method's body** (`GenericMethodBodyMakerFnDecl.generateGenericMethodBody`, `CodeGen.java:2749-2756`). The template's body was compiled by a `CodeGen` whose analyzer held only the enclosing trait's or object's parameters, never the function's own. The edit compiles it in a nested `CodeGen` whose analyzer holds the declaration's static parameters and `where` clause; for a generic method the declaration is `convertGenericMethodToClosureDecl`'s, whose parameters are the receiver's parameter, the method's own and the trait's (`CodeGen.java:2890-2893`). Behind the constructor's wall stood this one: a dotted call, in a generic body, of a member of a type below a `where`-clause `comprises`, at a type that names the function's parameter, stops in `methodsNamed` (`CodeGen.java:7069`), from `callTakesTupleBoxed` (`P812g`, below), the path that F-34 names behind `ArrayList` (`genericMethodTakesOneParameter` reaches `methodsNamed` too).
3. **`forTypecase`** (`CodeGen.java:2541-2546`, new members `namesTupleElements` and `bindElementsAndGenerateClauseBody` at `:2578-2610`). The code generator bound a clause's own name (`x: T =>`, row 351's repair) but left unbound the names of a clause's tuple pattern, `(a': T, b': U) =>`. A read of such a name fell to `forVarRef`'s fresh-import path, which treats the name as a top-level variable and normalizes its type (`CodeGen.java:6933`): in a generic function, where the type names the function's parameters, that normalization stopped, 'T is not in the kind env' — row 822's recorded stack, `CodeGen.forVarRef`, `TypeAnalyzer.normalize`. Outside a generic function the read compiles, as a field of a class `P$s` that does not exist, and the run dies with `NoClassDefFoundError` (new row NEW-V-1). The edit casts the matched tuple to the clause's tuple type, as the clause's own name is cast (`InstantiatingClassloader.generalizedCastTo`), and binds each name of the pattern, `_` excepted, to its element, by the tuple's element getter, as a local binding of a tuple to several names does (`CodeGen.java:4765`).

The scope the repair gives: a type's inherited methods, and a generic function's or method's body, are read with the static parameters and `where`-clause variables in scope there; a typecase clause's tuple-pattern names are bound on the compiled path, in any function. Not covered: the body of a function without static parameters whose `where` clause introduces a variable (no test needs it; row 867 holds such a call), and the wrappers that `forObjectDecl` emits for an object's functional methods (`CodeGen.java:4797-4820`), which read the component's analyzer.

## The tests: failing, then passing

Three compiled tests, each `compile`, `link`, `run`, `run_out_contains=PASS`:

- `compiler_tests/ComprisesWhereMemberCompiled` (row 812): row 812's program, with `C`'s functional `cat`, dotted `name` and dotted `pair`, the last called in a generic function `joined[\T\](c: C[\T\])`.
- `compiler_tests/TypecaseGenericArmsCompiled` (row 822): `app[\T, E extends T, F extends T\](a: Bx[\E\], b: Bx[\F\])` with `app`'s three arms over the program's own generic trait, each arm reading the values its pattern names, instantiated so that each arm and the `else` clause run.
- `compiler_tests/TypecaseTupleNamesCompiled` (NEW-V-1): a function without static parameters whose clauses name a pair's elements, one of them `_`.

The failing run on the base's code, through the harness, before the edit was first built (tests 1 and 2 as first written), at 2026-11-17T18:38:36Z:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests ComprisesWhereMemberCompiled.test TypecaseGenericArmsCompiled.test
    . compile ProjectFortress/compiler_tests/ComprisesWhereMemberCompiled ProjectFortress/compiler_tests/ComprisesWhereMemberCompiled.fss:9:22-24:
    E is not in the kind env [][]
    F. compile ProjectFortress/compiler_tests/TypecaseGenericArmsCompiled ProjectFortress/compiler_tests/TypecaseGenericArmsCompiled.fss:20:23:
    T is not in the kind env [][]
    Tests run: 6,  Failures: 6,  Errors: 0

The two tests were then changed (decisions 4 and 5) and run again on the old code, through the harness, at 2026-11-17T18:51:24Z, and the third at 18:54:26Z:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base37 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/ComprisesWhereMemberCompiled.test <tree>/ProjectFortress/compiler_tests/TypecaseGenericArmsCompiled.test
    E is not in the kind env [][]
    T is not in the kind env [][]
    Tests run: 6,  Failures: 6,  Errors: 0
    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base37 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/TypecaseTupleNamesCompiled.test
    . run .../TypecaseTupleNamesCompiled (749ms) java.lang.NoClassDefFoundError
    Caused by: java.lang.NoClassDefFoundError: TypecaseTupleNamesCompiled$s
    Tests run: 3,  Failures: 1,  Errors: 0

The passing run, after the last change of code was built (`ant compileAll` and the library order), at four threads (the harness's), at 2026-11-17T18:54:40Z:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh fix2 ProjectFortress/compiler_tests ComprisesWhereMemberCompiled.test TypecaseGenericArmsCompiled.test TypecaseTupleNamesCompiled.test
    OK (9 tests)

At one thread, each compiled and run directly (`cd ProjectFortress; ../bin/fortress compile compiler_tests/P.fss; FORTRESS_THREADS=1 ../bin/fortress run P`), new code and old code (`old-fortress.sh ... compile` and `... run`):

    new ComprisesWhereMemberCompiled threads=1 rc=0 out=PASS
    new TypecaseGenericArmsCompiled threads=1 rc=0 out=PASS
    new TypecaseTupleNamesCompiled threads=1 rc=0 out=PASS
    old ComprisesWhereMemberCompiled compile rc=255 .../ComprisesWhereMemberCompiled.fss:10:22-24: E is not in the kind env [][]
    old TypecaseGenericArmsCompiled compile rc=255 .../TypecaseGenericArmsCompiled.fss:20:23: T is not in the kind env [][]
    old TypecaseTupleNamesCompiled threads=1 run rc=1 java.lang.NoClassDefFoundError Caused by: java.lang.NoClassDefFoundError: TypecaseTupleNamesCompiled$s

Walk prints `PASS` for each of the three programs (`bin/fortress compiler_tests/P.fss`).

The whole compiled suite once, on `18d5b51578`'s code: `ant testFast`, `BUILD SUCCESSFUL`, `Total time: 13 minutes 21 seconds`; compiler track `Tests run: 1703, Failures: 0, Errors: 0` (the last landed gate, climb batch 31b, 1694, and these three files add 9), library 86, othercompiler 263, misc all 0 failures.

## Where the fix belongs, and the precedent

The kind environment is the analyzer's (`TypeAnalyzer.extend`/`extendJ`, `TypeAnalyzer.scala:1104-1108`); the code generator keeps one analyzer per nested `CodeGen` (`CodeGen.java:238`, `:367-374`). The checker extends its analyzer with a declaration's static parameters and `where` clause wherever it checks a body (`Decls.scala:212` for a function, `:90` and `:137` for traits and objects). The code generator did so at two sites of its 20 nested `CodeGen` constructions on the base (comments not counted) (`CodeGen.java:2202-2203`, an object's class, and `:5874-5875`, a trait's springboard); this rung adds the third and fourth, a type's inherited methods and a generic body, by the same call. The two members that the lookup stops under are `STypesUtil` and `TypeAnalyzer.staticParam`; the brief keeps the first out of this rung, and loosening the second would hide every such defect (decision 1).

A typecase clause's own name is bound by `bindAndGenerateClauseBody` since row 351's repair (`fd5cb48648`), its one site in `forTypecase`; the code generator binds a tuple's elements to several names at one other site, a local binding (`CodeGen.java:4743-4768`), whose element getter the new member uses.

## What the specification settles

Row 812: a `where`-clause variable of a `comprises` clause is in scope in the trait (`trait-parameters.tex`, "Where Clauses"; P-60 reads the clause at the level of values; `compiler.md`, "The checker's gaps", gives the checker's reading), and the checker passes the program. Row 822: "the static type of the corresponding identifier is the intersection of T and the corresponding guarding type for that clause" (`typecase.tex:104-111`), so an arm's identifier has a type that names the function's parameters. The chapter's grammar has no names inside a clause (`typecase.tex:66-67`); the names of a clause's tuple pattern come from the pattern-matching proposal that its note defers to (`:15`); the parser, the checker and walk bind them, and the one library writes them (`List.fss:94`, `CovariantCollection.fss:33`, `FortressLibrary.fss:1664`).

## Programs run old against new

Under `tmp/` of the worktree, each compiled with `old-fortress.sh ... compile` (old) and `bin/fortress compile` (new) unless named otherwise:

- `P812b`, row 812's program with the variables renamed `W`, `X`, `Y`: old 'P812b.fss:7:22-24: Y is not in the kind env [][]' (the object's own parameter; `-debug stacktrace` gives `CodeGen.<init>(CodeGen.java:500)` from `STypesUtil.removeIdenticallyCoveredMethods(STypesUtil.scala:1588)`).
- `P812g`, a generic function calling a member that `C[\E\]` defines for `AnyC comprises { C[\E\] } where [\E\]`: old 'E is not in the kind env [][]' at the constructor; with the constructor's edit and `forTypecase`'s alone (a scratch copy without the body's edit), 'P812g.fss:7:22-24: T is not in the kind env [][]' from `CodeGen.methodsNamed` ← `callTakesTupleBoxed` ← `forMethodInvocation` ← `GenericMethodBodyMakerFnDecl.generateGenericMethodBody`; new: prints `ab`, as walk.
- `TypecaseGenericArmsCompiled` with the kind-environment edits alone (the tree's first build): 'Error trying to close method scope' with `GETSTATIC TypecaseGenericArmsCompiled$a'.ONLY` in the listing, the unbound name; with `forTypecase`'s edit alone: passes, so row 822's crash in this form came wholly through the unbound name, and the body's environment is test 1's `joined`.
- `PNoFork` and `PFork`, `typecase (a, b) of (a': Bx[\ZZ32\], b': Bx[\ZZ32\]) => ...` with `else => 0`: old and new 'Error trying to close method scope'; the new listing binds `a'` and `b'` (`ASTORE 2`, `ASTORE 3`) and fails in the coercion typecase that wraps the arms' union with the numeral (row 340), so test 2's `else` clause reads values instead (decision 5).
- `genericTest1` and `genericTest2` (ladder subset, below): old and new compile and print `pass`.

## The one library's four declarations

By reading, then by F-34's measure run once on this rung's code (`explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh` on a scratch worktree seeded at `18d5b51578`, 212 s), never on the base:

    refused declarations 15 | emitted (OK lines) 743 | component failures 0
    kinds 5
      9  Can't compile VarArgs yet  [String 4, FortressLibrary 3, List 1, FlatString 1]
      2  ClassCastException: com.sun.fortress.nodes.IntersectionType to com.sun.fortress.nodes.NamedType  [FortressLibrary 2]
      1  ClassCastException: com.sun.fortress.nodes.IntersectionType to com.sun.fortress.nodes.TraitType  [List 1]

F-34 on `c3b16ef2d1`: 17 in 5 kinds, 4 of them the kind environment. Now none:

- `ArrayList` (`Library/List.fss:252`): passes this wall and is emitted; both its walls were this rung's, row 812's at the constructor and the generic methods' bodies (`fill[\T\]`, `enlargeLeft[\T\]`, `:311-334`). Behind it the measure shows nothing; it skips the dispatch methods and runs no emitted class (F-34).
- `APPCOV` (`Library/CovariantCollection.fss:30`): passes and is emitted (`CovariantCollection refused 0 emitted 25`). By reading, behind it: its `typecase` has no `else` clause, so the fall-through pushes `()` where `CovariantCollection[\T\]` is returned (`CodeGen.java:2553-2563`), which the JVM's verifier may refuse; no class is run.
- `app` (`Library/List.fss:93`): passes this wall; its arms 2 and 3 call a generic method on a value typed by an intersection, `a'.appendRC[\F\](b')` on `List[\E\] ∩ List[\T\]`, and stop at `CodeGen.forMethodInvocation`'s cast to `TraitType` (`@@CG FAIL FnDecl app ... ClassCastException CodeGen.forMethodInvocation:7377`, a line of the measure's patched scratch tree): row 540's wall, rung I's member.
- `__bigOperator2` (`Library/FortressLibrary.fss:1656`): passes this wall; `outer'.unwrap` on `BigOperator[\I0,O0,R0,L0\] ∩ BigOperator[\I0,I0,I0,L0\]` stops at the same member's cast to `NamedType` (`ClassCastException CodeGen.forMethodInvocation:7430`, the same tree): row 540, rung I.

## The stages

Both ran once on `18d5b51578`, the final code; no change of code followed either's start.

- Count (`explorations/coordinator/tools/checker-count/run.sh`): `#total 0`, `#locations 0`, `#crash none`; `diff` against `explorations/compile-ladder/climb-batch-31b/gate/checker-count.txt` prints nothing.
- Distance (`explorations/coordinator/tools/distance/run.sh`, 159 s): `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-31b/gate/distance.txt <post>` prints `DISTANCE SAME   0`. `dist-post/errors.tsv` holds its header line only, as `explorations/compile-ladder/gate/distance-sites.tsv` does: no site moved.
- The shadow patch: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>` exits 0 ('shadow sources written'); the distance run reports '#shadow every shadow edit matched the tracked sources'.
- The checker's time: not applicable; no Scala, `Fortress.ast` or generator changed (`git diff --name-only 1609258002b0`: `CodeGen.java` and six test files).

## The ladder subset

After the edit only, the drivers copied under `tmp/rung-kind-env-generic/ladder/`, on five files whose recorded first error, or whose form, the change touches: `tests/XXXtypecaseTest.fss`, `typecaseSelf.fss`, `genericTest1.fss`, `genericTest2.fss`, `ImportNonparamObject.fss`.

- `typecaseSelf.fss`: `pass`, as the landed `climb-batch-31b/gate/ladder/ladder.tsv`.
- `genericTest1.fss`, `genericTest2.fss`: `pass`; the baseline's `raw/` has `link` `NoClassDefFoundError`. Not this rung's: the old code compiles both and prints `pass`.
- `ImportNonparamObject.fss`: `link` `NoClassDefFoundError`, as the baseline.
- `XXXtypecaseTest.fss`: `typecheck`, 'The typecase clause, String, is unreachable.'; the baseline's `raw/` has `run`. Not this rung's: the checker refuses it before the code generator runs.

## Sentences of the specification made false

None. `grep -rn "kind env\|row~812\|row~822" Specification/` finds nothing; Appendix I's sentence on such a trait (`Specification/appendices/changes.tex:1732-1734`, "The code generator compiles such a trait, but does not yet read a size off an argument at a call") stays true, and no sentence says that the code generator leaves a clause's names unbound.

## Points to report

- **The cause as found for each row, and the scope.** Row 812: `CodeGen`'s constructor (`CodeGen.java:500`, base) read a type's inherited methods with no static parameter in the kind environment; behind it, a generic body compiled with none (`GenericMethodBodyMakerFnDecl`, `CodeGen.java:2715`, base). Row 822: `forTypecase` (`CodeGen.java:2524-2562`, base) left a clause's tuple-pattern names unbound, so a read normalized their types in `forVarRef` (`:6892`, base) with no static parameter in scope. The scope: "What changed and why", last paragraph. The binding of tuple-pattern names is a repair beyond V1's words, inside `forTypecase`, which the brief names (decision 3).
- **Rows 812 and 822, failing on the base and passing after, at one thread and at four**: "The tests", above.
- **The four declarations**: `ArrayList` and `APPCOV` emitted; `app` and `__bigOperator2` behind row 540 (rung I).
- **The shadow patch**: applies, exit 0.
- **The stages against the comparand**: both identical.
- **A file edited beyond those named**: none (`CodeGen.java`, its constructor, `forTypecase` with two members beside `bindAndGenerateClauseBody`, and `GenericMethodBodyMakerFnDecl`; the tests). `TypeAnalyzer.scala` is not edited.

## Decisions

1. **Extend the analyzer at the constructor's call** (`CodeGen.java:500-502`), by `extendJ` with the type's static parameters and `where` clause, as `:2204-2205` and `:5915-5916` do. Not taken: a change in `STypesUtil.removeIdenticallyCoveredMethods` (outside the rung's files); `TypeAnalyzer.staticParam` answering a missing variable (`TypeAnalyzer.scala:1102`; hides every such gap, and the checker's code).
2. **Extend the analyzer for a generic body in `GenericMethodBodyMakerFnDecl`**, from the declaration's header, its `where` clause included (V1 names the `where` clause's variables). Not taken: `generateGenericFunctionClass` from `FnNameInfo.static_params` (`CodeGen.java:2659`), which has no `where` clause; `forFnDecl`, which also serves the non-generic paths; a hook on `GenericMethodBodyMaker`, whose other maker (`OverloadSet.java:2421-2430`) writes dispatch bytecode and normalizes no type.
3. **Bind a tuple pattern's names in `forTypecase`, in this rung.** Evidence: row 822's recorded stack (`CodeGen.forVarRef`, `TypeAnalyzer.normalize`) is the fresh-import path that only an unbound name takes (the base's trace of test 2: `CodeGen.forVarRef(CodeGen.java:6892)`); with the kind environment alone, test 2 stops at 'Error trying to close method scope' on `GETSTATIC TypecaseGenericArmsCompiled$a'.ONLY`; the brief's test is `app`'s arms, which read those names. Not taken: test 2 with single-name clauses and the tuple names left to an `XXX` test and a row, which leaves `app`, `APPCOV` and `__bigOperator2` at the unbound name; binding the names in a desugarer, a phase that walk shares.
4. **Test 1 also calls a member of `C` in a generic function** (`joined[\T\]`), the path behind the constructor's wall (F-34's `ArrayList`), since test 2, after `forTypecase`'s edit, no longer needs the body's environment (`P812g` and the scratch copy above). Not taken: a third topic test for the generic body alone.
5. **Test 2's `else` clause reads the parameters** (`sz[\E\](a) - sz[\F\](b)`), not `0`: a numeral arm in a function whose declared result is `ZZ32` meets row 340 (`PNoFork`). Not taken: `do 0 end`, row 340's workaround, which writes the workaround into a test of another topic.
6. **A third test, `TypecaseTupleNamesCompiled`**, for the unbound names apart from generics (NEW-V-1), named by its topic. Not taken: its cases inside test 2, which asserts the generic form.
7. **`_` is not bound, a constructor pattern (row 498) and an untyped name (row 964) are left as they are**: `namesTupleElements` takes a tuple pattern only (`Pattern.getName()` none), and `getType` still refuses an untyped name first.
8. **F-34's measure run once on this rung's code**, beyond the reading the brief asks for, in a scratch worktree removed after; never on the base (POSITIONS, "No re-measuring what the record holds.").
9. **The non-generic function's `where` clause is not added** to its body's environment (`generateFunctionalBody`): no test needs it.

## Defects and their homes

- Row 812: home 1, repaired; `ComprisesWhereMemberCompiled`.
- Row 822: home 1, repaired; `TypecaseGenericArmsCompiled`.
- NEW-V-1, a typecase tuple pattern's names unbound on the compiled path: home 1, repaired in this rung; `TypecaseTupleNamesCompiled`, and the arms of `TypecaseGenericArmsCompiled`. A row is given in `record.md` so that the record finds the defect by its words; it closes with this rung's commit.
- `APPCOV`'s fall-through `()` where its result type is a trait, by reading only: not measured, no home taken; the rung that first runs `APPCOV` compiled meets it.
- Row 340 met again (`PNoFork`, a numeral `else` arm): its row holds it; nothing added.

## A refused call

To size a note on row 540, I ran `ledger.py note 540 ... --check`; the automatic permission check refused it, and the brief forbids `note` in any case. Nothing was written. The row was sized by reading it (`facts-extract.sh 'ledger:540'`: 1,141 characters, 632 in its notes), and `record.md` gives it no note.

## For FACTS

See `record.md`.

## Commands worked out

- The scratch copy for a single edit's effect: `javac -nowarn -cp "$CP" -d <classes> <copy of CodeGen.java>`, then `java $JAVA_FLAGS -Dfortress.caches=<copy of caches> -cp "<classes>:$CP" com.sun.fortress.Shell compile P.fss`, as `compiler.md`, "Testing an edit here".
- F-34's measure on a rung's code: `seed-worktree.sh /home/user/fortress-base37 <tree>/tmp/<role>/measure-wt - <head>`, then `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <that worktree> <out-dir>`, then `git worktree remove --force <that worktree>`; the refused declarations are the `@@CG FAIL` and `@@CG PREFAIL` lines of `<out-dir>/run.txt`.
