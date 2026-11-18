<!-- Climb batch 33b, rung W (rung-closure-name-once): each function expression of a component gets a class name of its own where two share a source span; row 315. -->

# Rung W: one class name for each function expression

- problem: row 315, 'java.util.zip.ZipException: duplicate entry: LexSame$\=fn@5\!23-66.class' under the selector (`explorations/compile-ladder/plan-33/PROBES.md:110`), and the one library's two refused declarations of that kind, `LexicographicOrder` and `List` (`explorations/compile-ladder/plan-33/probes/measure-d3747846c1.txt:27-29`)
- spec: none; the specification names no class of a function expression: `grep -rn -i 'class file\|classfile\|class name' Specification/basic Specification/basic-lib` prints nothing. The form that meets the defect is the conditional operator's sugar, `Specification/advanced/subscripting.tex:86-88` ("x OP: y is syntactic sugar for x OP (fn () => y)")
- precedent: the per-component table that every nested code generator shares, numbered in the order the code generator meets its entries, `numeralCoercionSites` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:286-290`, `:396`, `:410`, `:7858`), and the shared set `localFunctionNames` (`CodeGen.java:4237-4239`); the first name at a span is the team's own form (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:901-907`)
- deviation: a later function expression at a span already named takes `#2`, `#3` after the span, a character that no class name of the code generator held before (`NamingCzar.java:905-906`); for a generic one the class file is `...#2⟦⟧` (`CodeGen.java:3937-3946`)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` (both in the team's last commit `a874948ac`; there `gensymArrowClassName` is at `NamingCzar.java:838-840` and its one call at `CodeGen.java:3448`)

Commits on `wip/rung-closure-name-once`: `17f3e7b17b` (the fix and its tests), `39f833b8e5` (a third case of the compiled test, a generic trait's method), and the commit that adds this report and `record.md`. One launch worked the rung.

## 1. What changed, and why

The code generator named the class of a function expression (`CodeGen.forFnExpr`) and of a local function (`CodeGen.localFunctionClosure`) by its component and source span alone: `desc + "$fn@" + sp.toStringWithoutFiles()` (the team's `NamingCzar.gensymArrowClassName`). Two function expressions at one span got one name; the jar took the first class and the compile died at the second, 'ZipException: duplicate entry' (row 315).

Now `gensymArrowClassName(desc, sp, taken)` (`NamingCzar.java:893-907`) gives the first function expression of the component at a span today's name, and each later one at that span the name with the next ordinal, `#2`, `#3`, in the order in which the code generator meets them. `taken` is a set of the names given so far, one for the component: a field `closureClassNames` of `CodeGen` (`CodeGen.java:4241-4244`), made in the component's constructor (`:409`) and passed to every nested code generator (`:386`), as `numeralCoercionSites` and `localFunctionNames` are. The two calls pass it (`CodeGen.java:3935-3936`, `:4098-4099`). No other class's name changes, and no name of a program that compiled before changes: such a program had no two function expressions at one span.

## 2. The tests: the failing runs on the base, the passing runs

Three files, two tests:

- `ProjectFortress/one_library_tests/OneLibraryConditionalReduction.fss` and `.test` (`compile`), in rung S's track: under the selector, `flag AND: (BIG AND [i <- 0#n] i < n)`, `flag OR: (BIG OR [i <- 0#n] i > n)` and the one library's own form, `(|xs| = |ys|) AND: (BIG AND [(a, b) <- xs.zip[\ZZ32\](ys)] a = b)` (`Library/List.fss:127-128`).
- `ProjectFortress/one_library_tests/XXXOneLibraryRunConditionalReduction.test` (`run`, `run_out_does_not_contain=REACHED`): its run, an expected failure until the one library compiles whole (row 1062), in the form of `XXXOneLibraryRunHalf.test`.
- `ProjectFortress/compiler_tests/ConditionalReductionCompiled.fss` and `.test` (`link`, `run`, `run_out_contains=PASS`), under the prelude: a program's own conditional operator, `opr ADDLAZY(a: ZZ32, b: () -> ZZ32): ZZ32`, over a `SUM`, in a function, in a generic function at two instances, and in a generic trait's method, the shape of the one library's `LexicographicOrder`. The specification makes any binary operator conditional with a colon (`Specification/basic/operators/conditionalops.tex:14-20`), so the prelude can write the form, against row 315's note ("the prelude cannot write the form"), and this test runs, which no test under the selector can yet.

The failing runs, through the harness, on the base's code, 03:16:34Z to 03:16:37Z and 03:20:54Z to 03:20:58Z; the edit was first built at 03:21:51Z (the `nohup` of `ant compileAll`, which ended `BUILD SUCCESSFUL`, `Total time: 38 seconds`):

    cd ProjectFortress && FORTRESS_LIBRARY=one /home/user/fortress-base38/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base38 \
        <tree>/tmp/rung-closure-name-once/old-caches junit <tree>/ProjectFortress/one_library_tests/OneLibraryConditionalReduction.test \
        <tree>/ProjectFortress/one_library_tests/XXXOneLibraryRunConditionalReduction.test
    . compile /home/user/fortress-closure-name-once/ProjectFortress/one_library_tests/OneLibraryConditionalReduction
     UNEXPECTED exception
    java.lang.RuntimeException: java.util.zip.ZipException: duplicate entry: OneLibraryConditionalReduction$\=fn@6\!56-79.class
    Saw expected failure (Exit code != 0)
    Tests run: 2,  Failures: 1,  Errors: 0

    cd ProjectFortress && /home/user/fortress-base38/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base38 \
        <tree>/tmp/rung-closure-name-once/old-caches-prelude junit <tree>/ProjectFortress/compiler_tests/ConditionalReductionCompiled.test
    . link /home/user/fortress-closure-name-once/ProjectFortress/compiler_tests/ConditionalReductionCompiled
    java.lang.RuntimeException: java.util.zip.ZipException: duplicate entry: ConditionalReductionCompiled$\=fn@7\!36-50.class
    Tests run: 2,  Failures: 2,  Errors: 0

The generic trait's case was added after the build (`39f833b8e5`); the same command on the old code, 03:37:40Z to 03:37:44Z, again 'duplicate entry: ConditionalReductionCompiled$\=fn@7\!36-50.class', 'Tests run: 2,  Failures: 2'; and the case alone, a program in scratch, on the old code: 'duplicate entry: TraitProbe$\=fn@10\!41-74??.class', the one library's own message ('FortressLibrary$\=fn@2227\!12-52??.class', `explorations/compile-ladder/plan-31/probes/switch-rehearsal.md:116`).

The passing runs. `ant testFast` on `17f3e7b17b`'s code (03:26:16Z, `BUILD SUCCESSFUL`, `Total time: 9 minutes 38 seconds`), from `ProjectFortress/TEST-RESULTS/fast-*/`:

     link /home/user/fortress-closure-name-once/ProjectFortress/compiler_tests/ConditionalReductionCompiled  OK (time = 380ms)
     run /home/user/fortress-closure-name-once/ProjectFortress/compiler_tests/ConditionalReductionCompiled (1001ms) Passed
     compile /home/user/fortress-closure-name-once/ProjectFortress/one_library_tests/OneLibraryConditionalReduction  OK (time = 38395ms)
    Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 39.652 sec      (onelibrary)

The last run of the compiled test after its last change, on the same code:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh new2 ProjectFortress/compiler_tests ConditionalReductionCompiled.test
    . run ProjectFortress/compiler_tests/ConditionalReductionCompiled (523ms) PASS
    OK (2 tests)

The expected failure, shown red on a deliberate fix: `OneLibraryConditionalReduction.fss` replaced for one run by a component of `run(): () = ()` alone, which needs no library class, then restored (`diff` against the saved copy printed nothing). A first try that kept the declarations and emptied `run()` still died at a library class, 'NoClassDefFoundError: fortress/FortressLibrary$ZZ', and stayed green:

    cd ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_CACHES=<tree>/tmp/rung-closure-name-once/xxx-caches \
        ../bin/fortress junit one_library_tests/OneLibraryConditionalReduction.test one_library_tests/XXXOneLibraryRunConditionalReduction.test
    . run one_library_tests/OneLibraryConditionalReduction (142ms) Did not see expected failure
    Tests run: 2,  Failures: 1,  Errors: 0

## 3. The two nodes that share the span

Both are made by the pre-disambiguation desugaring, the first phase after the parse (`compiler/phases/PhaseOrder.java:98-129`), in `compiler/desugarer/PreDisambiguationDesugaringVisitor.java`; `PreTypeCheckDesugaringVisitor.java` holds the same two forms (`:248-251`, `:394-404`), but no conditional operator or reduction is left for it.

1. **The thunk of the conditional operator's right operand.** `forOpExpr` desugars the operands first (`:285`), so the reduction is already rewritten, then `cleanupOpExpr` wraps the right operand of `AND:` in `thunk` (`:333`), which makes `fn () => e` at `e`'s own span (`:301-304`). The operand is the rewritten reduction, which keeps the reduction's span (`visitAccumulator`, `:454-494`).
2. **The reduction's outer closure.** `visitAccumulator` calls `DesugarerUtil.visitGenerators(span, ...)` with the reduction's span (`:457`), which returns `fn (reduction, unit) => __generate(gen, reduction, fn x => unit(body))` at that span (`ProjectFortress/src/com/sun/fortress/nodes_util/DesugarerUtil.java:194-197`), the argument of `__bigOperator`. The loop body `fn x => unit(body)` takes the generator clause's span (`bindsAndBody`, `DesugarerUtil.java:127`), so it had a name of its own.

So the closure of the reduction that takes the span is its outer one, `fn (reduction, unit) => ...`. The code generator's trace on the base's code, for `allBelow(flag: Boolean, n: ZZ32): Boolean = flag AND: (BIG AND [i <- 0#n] i < n)` (the tree before the edit, `FORTRESS_LIBRARY=one bin/fortress compile -debug codegen AndRange.fss`; the trace prints each Oxford bracket as `?`):

    [codegen] 3:17:55?AM forFnExpr className = AndRange$fn@3:56-79 desc = AbstractArrow??,com/sun/fortress/compiler/runtimeValues/FBoolean?
    [codegen] 3:17:55?AM forFnExpr className = AndRange$fn@3:56-79 desc = AbstractArrow?Tuple?fortress/FortressLibrary$Reduction?com/sun/fortress/compiler/runtimeValues/FBoolean?,Arrow?com/sun/fortress/compiler/runtimeValues/FBoolean,com/sun/fortress/compiler/runtimeValues/FBoolean??,com/sun/fortress/co

The first is `() -> Boolean`, the thunk; the second `(Reduction[\Boolean\], Boolean -> Boolean) -> Boolean`, the reduction's closure. After the edit, `javap -p` of the compiled test's three classes at line 7:

    public class ConditionalReductionCompiled$\=fn@7\!36-50 extends \=AbstractArrow??,com\|sun\|fortress\|compiler\|runtimeValues\|FZZ32? ...
      public com.sun.fortress.compiler.runtimeValues.FZZ32 apply();
    public class ConditionalReductionCompiled$\=fn@7\!36-50#2 extends \=AbstractArrow?Tuple?fortress\|CompilerLibrary\%ReductionZZ32,Arrow?...
      public com.sun.fortress.compiler.runtimeValues.FZZ32 apply(fortress.CompilerLibrary$ReductionZZ32, \=Arrow?...FZZ32,...FZZ32?);
    public class ConditionalReductionCompiled$\=fn@7\!40-46 ...   (the loop body, at the generator clause i <- 0#n)

The planner's two variants that compile follow: the reduction alone has no thunk, and a block as the operand gives the thunk the block's span.

## 4. The naming as built

- The thunk keeps today's name: `forFnExpr` names its class (`CodeGen.java:3935`) before it compiles the body (`:3970`), and the reduction's closure is inside that body, so the code generator meets the thunk first. The reduction's closure is `...#2`.
- The ordinal follows the order in which `forFnExpr` and `localFunctionClosure` are entered for the component. Two function expressions at one span lie in one declaration's body, one inside the other, so their order is the tree's; the order in which the code generator writes a class's methods or a dispatch method's tests (row 996) does not enter. The set is a `HashSet` that is only added to; its order is never read.
- The set is made with the component's `CodeGen` (`CodeGen.java:409`), so the names are the same from compile to compile, also in a JVM that compiled other components first, as the test suites' JVMs do.
- Shown: each test program compiled cold twice, once with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0`, each in a fresh copy of the caches, the jars compared by `zipfile` (unzip rewrites the backslashes of the mangled names): the same 14 entries for `ConditionalReductionCompiled` and the same 10 for `OneLibraryConditionalReduction`, and every entry's bytes the same; both runs of the compiled program printed `PASS`.

      ConditionalReductionCompiled$\=fn@11\!64-89#2⟦⟧.class 51eff2df98 same bytes
      ConditionalReductionCompiled$\=fn@11\!64-89⟦⟧.class 4babf078d9 same bytes
      ConditionalReductionCompiled$\=fn@7\!36-50#2.class 867298951c same bytes
      ConditionalReductionCompiled$\=fn@7\!36-50.class f59505a2c9 same bytes
        entries whose bytes differ between the modes: 0 []

## 5. Where the fix belongs, and the precedent search

The place: the code generator's naming of a closure class (`explorations/coordinator/map/modules-and-phases.md`, B.9: `CodeGen` writes every class into one jar per component). The desugarer is not the place: its spans are the program's, the pre-disambiguation phase runs under walk too, and a desugaring could again make two closures at one span (by reading, the else part of an `if` whose clause binds, as `if x <- e then ... else r end`, is thunked so too, `PreDisambiguationDesugaringVisitor.java:380`; not run).

The precedent search: no commit repaired a closure class written twice (`git log -i --grep='duplicate entry'` names only `b52a32ac2d`, ladder rung 4, of another kind). The record's other 'duplicate entry' rows are row 565 (a wrapper class named by `genericMethodName`, `CodeGen.functionalMethodWrapper`) and row 790 (an interface listed twice), of other causes, and this rung leaves them. In `NamingCzar.java` the other generated names are `gensymTaskName` (`:883-886`) and the one-argument `gensymArrowClassName` (`:888-891`), both numbered by a JVM-wide static counter, so unique, and the second has no caller; no other name is made from a span (`toStringWithoutFiles` has one use in `compiler/` and `runtimeSystem/`). So 0 other sites of the defect. The precedent followed is the revival's shared per-component table of the code generator: `numeralCoercionSites`, "One list for the component, shared by every nested code generator", numbered in the order met (`numeral$coercion$k`, `CodeGen.java:7858`), and `localFunctionNames` (`:4237-4239`). The ways are in "Decisions".

Not edited: N's table of payload objects and G's tuple descriptors in `NamingCzar.java`, and rung Q's casts in the two callers (`CodeGen.java:3971`, `:4131`).

## 6. What the specification settles

That the programs are valid: `x OP: y` is `x OP (fn () => y)` (`Specification/advanced/subscripting.tex:86-88`), and a reduction is an expression. It names no class, so the naming is the implementation's (fork W1).

## 7. Programs run old against new

| program | old code | new code |
|---|---|---|
| `OneLibraryConditionalReduction` (selector, compile) | 'duplicate entry: OneLibraryConditionalReduction$\=fn@6\!56-79.class' | compiles |
| `ConditionalReductionCompiled` (prelude, link and run) | 'duplicate entry: ConditionalReductionCompiled$\=fn@7\!36-50.class' | `PASS` |
| `AndRange` (scratch, selector) | 'duplicate entry: AndRange$\=fn@3\!56-79.class' | not run again; its form is the test's first function |
| `TraitProbe` (scratch, prelude, a generic trait's method) | 'duplicate entry: TraitProbe$\=fn@10\!41-74??.class' | `PASS`, classes `fn@10:41-74⟦⟧` and `fn@10:41-74#2⟦⟧` |
| `tests/ConditionalOpTruncation.fss` (the ladder) | baseline: codegen, 'duplicate entry: ConditionalOpTruncation$\=fn@20\!15.class' | pass |

## 8. The one library's two sites: the planner's measure on the rung's code

`explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh` on a scratch worktree seeded at `39f833b8e5` under the rung's `tmp/` and removed after; its before is F-34's run on `d3747846c1`, the base's code (`explorations/compile-ladder/plan-33/probes/measure-d3747846c1.txt`: 13 refused, 745 emitted, 4 kinds, '2 java.util.zip.ZipException: duplicate entry: <closure class> [FortressLibrary 1, List 1]'):

    refused declarations 12 | emitted (OK lines) 746 | component failures 0
    kinds 3
     10  Can't compile VarArgs yet  [String 4, FortressLibrary 3, List 2, FlatString 1]
      1  ClassCastException: com.sun.fortress.nodes.VarType to com.sun.fortress.nodes.TraitType  [FortressLibrary 1]
      1  OptionUnwrapException at edu.rice.cs.plt.tuple.Null.unwrap:58  [Stream 1]

The kind is gone. `LexicographicOrder` (`Library/FortressLibrary.fss:2301-2313`) is emitted ('@@CG OK TraitDecl LexicographicOrder'), and the trait `List` (`Library/List.fss:106-174`) passes the closure class and stops at a second wall, varargs: '@@CG FAIL TraitDecl List ... NamingCzar.makeBoxedTupleName:1342 ... Can't compile VarArgs yet', rung G's.

## 9. The suites, the shadow patch, the ladder subset, the stages

- `ant testFast`, once, on the final code (`17f3e7b17b`; `39f833b8e5` changed a test only): `BUILD SUCCESSFUL`, `Total time: 9 minutes 38 seconds`; compiler 1738 (1736 at the last gate, `explorations/compile-ladder/climb-batch-33/gate/summary.txt`, and the two cases of the new test), library 86, othercompiler 263, onelibrary 5 (3 and the new pair), misc without failures; no failure and no error in any track. No `XXX` test turned red.
- The distance stage's shadow patch on the final `CodeGen.java`: `shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>` then `add-patch.py <scratch>`, exit 0; the `CodeGen.java` shadow written.
- The ladder subset, after the edit only: `subset.txt` holds the one file whose recorded first error names a closure class written twice, `tests/ConditionalOpTruncation.fss` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`: codegen, 'java.util.zip.ZipException: duplicate entry: ConditionalOpTruncation$\=fn@20\!15.class'); the gate does not run it, so the comparand is the baseline's row. On the rung's code, `run-subset.sh` and `classify.py` copied under `tmp/rung-closure-name-once/ladder/`: 'tests ConditionalOpTruncation.fss pass'. Row 315's note had it compile and run already at `84f1c37190`, so the move is not this rung's.
- The stages: none, as the section says (`STAGE_BLIND`). The files: `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, and the five test files. `gensymArrowClassName` has its two calls in `CodeGen` only (`grep -rn gensymArrowClassName ProjectFortress/src`), and both stages stop at the type check: the distance stage's driver runs `-order check`, which ends at `TYPECHECK` (`explorations/coordinator/tools/distance/DistanceMulti.java:41-43`), and the count stage runs the checker alone.
- The four-thread atomic runs: not run; the edit names classes and touches no transaction, mutable state or class loading (`references/compiler.md`, "Testing an edit here").

## 10. Sentences of the specification made false

None: no sentence of `Specification/` names a closure class, a duplicate class or a conditional operator over a reduction on the compiled path (`grep -rn -i 'duplicate entry\|closure class\|class name' Specification --include=*.tex` prints nothing; Appendix I's sentences on the code generator, `Specification/appendices/changes.tex:255`, `:1732`, `:4046`, `:4440`, `:4607`, `:4689`, `:6396`, `:6409`, name other constructs).

## 11. Points to report

1. **Which two nodes share the span, by the desugaring that makes each:** the thunk `fn () => e` that `cleanupOpExpr` makes of the conditional operator's right operand at the operand's span (`PreDisambiguationDesugaringVisitor.java:301-304`, `:333`), and the reduction's outer closure `fn (reduction, unit) => __generate(...)`, which `DesugarerUtil.visitGenerators` makes at the reduction's span (`DesugarerUtil.java:194-197`, called at `PreDisambiguationDesugaringVisitor.java:457`). Section 3.
2. **The naming as built:** the thunk, met first, keeps today's name; the reduction's closure is `...#2`; the ordinal follows the order in which the code generator enters `forFnExpr` and `localFunctionClosure` for the component, the tree's order, and the set is made per component and never iterated, so neither the JVM's history nor a hash order moves a name; equal names and bytes under two hash modes (`NamingCzar.java:893-907`; `CodeGen.java:386`, `:409`, `:3935`, `:4098`, `:4244`). Section 4.
3. **Row 315's test under the selector, failing on the base and passing after; its run test an expected failure until the one library compiles whole:** `one_library_tests/OneLibraryConditionalReduction.test` and `XXXOneLibraryRunConditionalReduction.test`, with `compiler_tests/ConditionalReductionCompiled.test` beside them under the prelude. Section 2.
4. **The files edited, for STAGE_BLIND; a file edited beyond those named:** `NamingCzar.java` (`:24`, `:893-907`) and `CodeGen.java` (`:386`, `:409`, `:3935-3936`, `:4098-4099`, `:4241-4244`); the field and its two constructor lines are in `CodeGen.java` beyond its two calls, which the section names, since the name needs the component's table; and a test in `compiler_tests/` beside the selector's track. No file outside those two and the tests.

Reserved points: a model line, none; a class name that a test or a tool reads: none changes, and the new names `...#k` are read by no test or tool (`grep -rn 'fn@' ProjectFortress/*tests* ProjectFortress/tests explorations/coordinator/tools bin` prints nothing).

## 12. Decisions

1. **The naming: fork W1, a set of the component's names; the first at a span keeps its name, a later one takes `#k`.** Ways not taken: a counter for every function expression, which renames every closure class (W1's way not taken); a JVM-wide counter, as `gensymTaskName` names task classes (`NamingCzar.java:883-886`), whose names depend on what the JVM compiled before; the span with the closure's arrow descriptor, which the two closures here would satisfy but two closures of one type at one span would not, and which lengthens every name; another span for the thunk in the desugarer, which edits a phase that walk runs too, moves spans the diagnostics print and repairs one pair only; the jar writer keeping the first copy, the rehearsal's hack (`switch-rehearsal.md:118`), which drops the second class's code; a hash of the node, which row 996's kind of order would move. Evidence: sections 3 and 4.
2. **The table lives in `CodeGen`, shared by the nested code generators.** Ways not taken: a static map in `NamingCzar`, which outlives a compile and would need a reset; the root `CodeGenClassWriter`, which nested writers reach only through its jar stream. Precedent: `numeralCoercionSites`, `localFunctionNames` (`CodeGen.java:290`, `:4239`).
3. **The ordinal is written `#k`.** Ways not taken: `$k`, which the mangler reads as a chunk boundary (`Naming.java:799-805`, the specials `$/;`), so the name would read as an inner class `k`; `_k` or bare digits, which read as part of the span; a marker character such as `Naming.GENERATED` (`Naming.java:190`), which a listing prints as `?`. `#` is not among the mangler's specials or the JVM's forbidden `. ; [ /`, and no code parses closure names for it (`grep -rn "'#'\|\"#\"" runtimeSystem compiler` under `ProjectFortress/src/com/sun/fortress` prints the new line, `NamingCzar.java:905`, and two lines of debugging output commented out, `compiler/disambiguator/TypeDisambiguator.java:105`, `:107`); the generic case runs through the class loader (`totalOf` at two instances, `StringBag.weighted`).
4. **The set is keyed by the name before the generic suffix,** so two function expressions at one span are told apart whether or not each is generic. Way not taken: keying by the class file's name, under which a generic and a plain closure at one span would share a span name in two forms (`fn@s` and `fn@s⟦⟧`).
5. **The selector test holds the minimal form and the library's.** It keeps the probe's `LexSame` form as `sameLists`, and adds `AND:` and `OR:` over a range, the essence. Way not taken: `LexSame` alone.
6. **A compiled test under the prelude beside the selector's.** A program's own conditional operator over a `SUM` meets the defect under the prelude (`conditionalops.tex:14-20`), and that test runs, in a generic function and a generic trait's method, which the selector's cannot until the one library has jars. Way not taken: the selector's tests alone, which show only that the compile passes.
7. **The measure on the rung's code,** in a scratch worktree under the rung's `tmp/`, as rung I ran it in run 1, to check the library's two sites that the row's claim names. Way not taken: none run, the library's sites then shown only by the tests' shapes.

## 13. Defects and their homes

1. **Row 315,** two function expressions at one span given one class name: home 1, repaired; `compiler_tests/ConditionalReductionCompiled.test` and `one_library_tests/OneLibraryConditionalReduction.test` assert it. The row closes; its note "the prelude cannot write the form" was wrong, as the compiled test shows.
2. **Row 1062,** a program compiled against the one library does not run, the one library having no jars: home 2, the expected failure `one_library_tests/XXXOneLibraryRunConditionalReduction.test`, beside the row's own `XXXOneLibraryRunHalf.test`; the row gets the test in its notes, and its sentence on row 315 goes (`record.md`).

No new row.

## 14. For FACTS

One entry, in `record.md`; F-34's count moves (`record.md`).

## 15. Commands worked out

- `FORTRESS_LIBRARY=one FORTRESS_CACHES=<private> bin/fortress compile -debug codegen P.fss`: prints each function expression's class name and abstract arrow descriptor as the code generator makes it (`forFnExpr className = ... desc = ...`), which tells the closures at one span apart.
- Comparing two jars: Python's `zipfile` over the entry names and a hash of each entry's bytes; `unzip` warns that the mangled names use backslashes as separators and writes them as folders.
- The measure on a commit: `seed-worktree.sh <base-build> <tree>/tmp/<scratch>/measure-wt - <commit>`, then `codegen-measure.sh` on it, then `git worktree remove --force` on it.

## 16. Questions for the curator

None.
