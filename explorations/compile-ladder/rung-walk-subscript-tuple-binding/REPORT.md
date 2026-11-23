# Rung W: walk's subscript before a superscript, and its tuple binding run once (rows 1 and 1026)

- problem: walk on the base fails both forms, 'FAIL: a ZZ32: 11449 =/= a ZZ32: 1075369; two indices, then a superscript' and 'FAIL: a ZZ32: 3 =/= a ZZ32: 1; the right side ran once' (`explorations/compile-ladder/plan-35/probes/fixes-35.md:17-18`)
- spec: `Specification/basic/operators/juxtameaning.tex:164-168` (a math item and the element before it become "a single element that does the appropriate operator application"); `Specification/basic/variables.tex:99-120` (tuple notation, "especially helpful when a function application returns a tuple of values"); `Specification/basic/objects.tex:295-297` (a field declaration has the meanings of a top-level variable declaration)
- precedent: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1034-1045` (`forSubscriptExpr` evaluates every index with `evalExprListParallel`); the desugarer's own rewriters `Local` and `Member` (`ProjectFortress/src/com/sun/fortress/interpreter/rewrite/DesugarerVisitor.java:93`, `:151`), chosen by the flag that `forFnDecl` reads (`DesugarerVisitor.java:792`)
- deviation: the subscript is repaired in `evalAndInvokeMethod`, the helper that `mathItemApplication` calls (`Evaluator.java:1069-1071`), not in `mathItemApplication` itself (`Evaluator.java:1167-1189`), which is unchanged; the tuple binding's repair reaches a field's tuple binding in an object and in an object expression too, beyond the top level that fork W2 names (`DesugarerVisitor.java:854`, `:872`)
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1069-1071`; `ProjectFortress/src/com/sun/fortress/interpreter/rewrite/DesugarerVisitor.java:853-881` (both lines edited are the team's, at `a874948ac` `Evaluator.java:935` and `DesugarerVisitor.java:873`)

One launch worked this rung. Its commits on `wip/rung-walk-subscript-tuple-binding`, from the base `13f4fdea75`:

    2da0bd16c4 Walk: a subscript before a superscript or a subscript keeps its first index; a tuple binding's right side runs once (rows 1, 1026)
    73805235f1 SubscriptThenSuperscriptWalk: its row object named Lane, apart from the library component's Row
    7c7689ee6e SubscriptThenSuperscriptWalk: two subscripts then a superscript, and a subscript then a juxtaposed item

The code state is `2da0bd16c4`'s: the two later commits change only the test file. The base build `/home/user/fortress-base42` is at `295c215c2c`; `git diff --name-only 295c215c2c 13f4fdea75` lists no path under `ProjectFortress/` or `Library/` (only `.claude/`, `docs/` and `explorations/`), so the old code that ran from it is the base's code.

## What changed and why

1. **The subscript (row 1, fork W1).** A primary whose math items are a subscript and then a superscript, another subscript or an expression, as `m[3,7]^2`, `g[3][7]` or `x[5]k`, applies each item in turn to the element before it (`Evaluator.java:1191-1222`, `stepThree`). For a subscript, `mathItemApplication` calls `evalAndInvokeMethod(front, opString, sub.getExprs(), loc)` (`Evaluator.java:1187`). That helper evaluated its list by `evalInvocationArgs`, which evaluates "the tail of the list, EXCLUDING THE FIRST ELEMENT" (`Evaluator.java:1380-1397`): right for a juxtaposition's list, whose first element is the function, wrong for a subscript's indices. `evalAndInvokeMethod` now evaluates every index with `evalExprListParallel`, as `forSubscriptExpr` does (`Evaluator.java:1037`). Its one caller is `mathItemApplication`: `grep -rn "evalAndInvokeMethod" ProjectFortress/src` prints only `Evaluator.java:1069`, `:1070` and `:1187`. `evalInvocationArgs` is unchanged for its three other callers (`Evaluator.java:1312`, `:1356`, `:1377`), whose lists begin with the function.
2. **The tuple binding (row 1026, fork W2).** Walk's own rewrite, `DesugarerVisitor.forVarDecl`, turns `(first, second) = e` into a temporary `*tuple_<span> = e` and one declaration per name. Each name's initializer was a field reference on `e` itself, so `e` ran once for each name and once more (the temporary). Each name now reads its element from the temporary: `Expr tempRef = (isMember ? new Member() : new Local()).replacement(ExprFactory.makeVarRef(at, temp))` (`DesugarerVisitor.java:872`), where `isMember` is the flag `atTopLevelInsideTraitOrObject` read on entry (`:854`), before the method clears it. At the top level the reference is a variable at the top level's depth, as every top-level name's reference is; inside an object or an object expression it is `$self.*tuple_<span>`, as a reference to a sibling field is. The same member serves a field declared in tuple notation, which ran its right side three times on the base too (below); the objects chapter gives such a field the meaning of a top-level declaration (`objects.tex:295-297`).

Walk's desugarer is walk's alone: its only constructions are `interpreter/env/CUWrapper.java:215` and `:217`, and `explorations/coordinator/map/modules-and-phases.md:349` places it after the shared phase chain, with no counterpart in the compiler. So the compiled path is unchanged.

## The tests

- `ProjectFortress/tests/SubscriptThenSuperscriptWalk.fss`, new, from the planner's program: `m[3,7]^2`, `m[7]^2`, `x[5]^2` for `x: ZZ32[7]`, `B.f()[5]^2` after a dotted call, `g[3][7]` and `g[3,7][2]` for a `Grid` whose subscript answers a `Lane` with a subscript of its own, `g[1][2]^2`, and `x[5]k`.
- `ProjectFortress/tests/TopLevelTupleBindingOnceWalk.fss`, promoted by `git mv` from `XXXTopLevelTupleBindingOnceWalk.fss`, its component line renamed; its assertions unchanged.
- `ProjectFortress/tests/FieldTupleBindingOnceWalk.fss`, new: a field's tuple binding in an object and in an object expression runs its right side once.

### The failing runs, on the base's code, before the edit was first built

The run ended at 10:32:16; the first build of the edit started at 10:34:20 (`ant compileAll`, `BUILD SUCCESSFUL`, `Total time: 52 seconds`).

    echo "Expected failure: SubscriptThenSuperscriptWalk red, 'FAIL: a ZZ32: 11449 =/= a ZZ32: 1075369; two indices, then a superscript'"
    echo "Expected failure: TopLevelTupleBindingOnceWalk red, 'FAIL: a ZZ32: 3 =/= a ZZ32: 1; the right side ran once'"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-subscript-tuple-binding/h1 ProjectFortress/tests/SubscriptThenSuperscriptWalk.fss ProjectFortress/tests/TopLevelTupleBindingOnceWalk.fss

    # harness-one 2026-11-23T10:32:05Z; tree 13f4fdea75; nproc=4; load 4.80 3.79 3.47; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    FAIL: a ZZ32: 3 =/= a ZZ32: 1; the right side ran once
    FAIL: a ZZ32: 11449 =/= a ZZ32: 1075369; two indices, then a superscript
    Tests run: 2,  Failures: 2,  Errors: 0

The field test was written after the edit, so it ran on the old code:

    echo "Expected failure: FieldTupleBindingOnceWalk red on the old code, 'FAIL: a ZZ32: 3 =/= a ZZ32: 1; an object's field: the right side ran once'"
    FORTRESS_HOME=/home/user/fortress-base42 /home/user/fortress-base42/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-subscript-tuple-binding/old-harness $PWD/ProjectFortress/tests/FieldTupleBindingOnceWalk.fss

    # harness-one 2026-11-23T10:40:07Z; tree 295c215c2c; nproc=4; load 3.81 4.21 3.84; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    FAIL: a ZZ32: 3 =/= a ZZ32: 1; an object's field: the right side ran once
    Tests run: 1,  Failures: 1,  Errors: 0

The committed file of the subscript test, with its last two assertions, on the old code (the same command with `SubscriptThenSuperscriptWalk.fss`, 10:47:21): 'FAIL: a ZZ32: 11449 =/= a ZZ32: 1075369; two indices, then a superscript', `Tests run: 1,  Failures: 1,  Errors: 0`.

Walk's `assert` stops at the first failure, so the forms after the first assertion were each run on the old code by a program of their own (below, "Old against new").

### The passing run, after the last change of code

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-subscript-tuple-binding/h1 ProjectFortress/tests/SubscriptThenSuperscriptWalk.fss ProjectFortress/tests/TopLevelTupleBindingOnceWalk.fss ProjectFortress/tests/FieldTupleBindingOnceWalk.fss

    # harness-one 2026-11-23T10:47:09Z; tree 73805235f1; nproc=4; load 0.88 4.47 4.47; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache filled
    OK (3 tests)

The code was last changed before the second build (10:38:07, `BUILD SUCCESSFUL`, `Total time: 51 seconds`); the test file then held the two assertions that `7c7689ee6e` commits.

### Walk's whole suite

`ant testSystem`, once, on the code state of `2da0bd16c4` (started 10:40:55):

    BUILD SUCCESSFUL
    Total time: 3 minutes 53 seconds

The four shards: `Tests run: 216`, `224`, `222`, `219`, each `Failures: 0, Errors: 0` (`ProjectFortress/TEST-RESULTS/system-*/TEST-*.txt`), 881 in all; climb batch 34b's gate summary has 223, 221, 218 and 217, 879. The two more are the two new tests; the promoted one is a rename. No test failed. The suite ran the subscript test as `2da0bd16c4` holds it; `73805235f1` and `7c7689ee6e` change only that file, and the passing run above ran it as committed.

## Where the fix belongs, and the precedent

- Walk evaluates a math primary itself (`skill interpreter.md`, "Where a fix of walk belongs"; `Evaluator.java:1247-1280`, `forMathPrimary`), so the subscript is repaired in the evaluator. The tuple binding's defect is in walk's own rewrite, `DesugarerVisitor`, which the compiler does not run (`modules-and-phases.md:349`); it is repaired there.
- Walk applies a subscript at four sites: `Evaluator.forSubscriptExpr` (`Evaluator.java:1037`), `LHSToLValue.forSubscriptExpr` (`LHSToLValue.java:77`), `LHSEvaluator.forSubscriptExpr` (`LHSEvaluator.java:46`) and `mathItemApplication` (`Evaluator.java:1184-1188`). The first three evaluate every index (`x.getSubs()`); the fourth was the only one that dropped one. So the precedent, `forSubscriptExpr`, has no other site to repair: 0.
- The record's precedent for the binding is the compiled path's: the right side kept once in a hidden class, each name reading its element from it (F-369, `compiler/codegen/CodeGen.java:6908`). Walk's desugarer already made the temporary, with the team's comment "Introduce a temporary, then initialize elements piece-by-piece" (`DesugarerVisitor.java:859-860`), and never read it.
- The ways the language and the tree offer, for each fork, are under "Decisions".

## What the specification settles

- A subscript that is a math item: `juxtameaning.tex:146-168`. A math item may be a subscripting; the reassociation replaces the first non-expression element "and the element immediately preceding it (which must be an expression) with a single element that does the appropriate operator application". The application of a subscripting operator method passes the indices written (`Specification/advanced/subscripting.tex`, section "Subscripting Operator Method Declarations"). So `m[3,7]^2` is `(m[3,7])^2`, `g[3][7]` is `(g[3])[7]`, and `x[5]k` is `(x[5]) k`, as the compiled path gives (F-387).
- A tuple binding: `variables.tex:99-120` declares several variables together by tuple notation, for "a function application [that] returns a tuple of values"; the right side is one expression, whose one value the names take apart. A field: `objects.tex:295-297`, "syntactically identical to a top-level variable declaration ... with the same meanings", and "Field initialization occurs in textual program order: evaluation of each initial-value expression must complete before evaluation of the next" (`objects.tex:300-304`).

## Old against new

Each program below is the base's code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base42 <tree>/tmp/old-caches P.fss`) against the rung's (`bin/fortress P.fss`), run from the program's folder. The subscript programs share these declarations and a `run()` that binds `m = M()`, `g = Grid()`, `x: ZZ32[7] = [1 2 3 4 5 6 7]` and `k: ZZ32 = 3`, then prints the one form:

    object M()
      opr [i: ZZ32]: ZZ32 = 100 + i
      opr [i: ZZ32, j: ZZ32]: ZZ32 = 1000 + 10 i + j
    end
    object Row(base: ZZ32)
      opr [j: ZZ32]: ZZ32 = base + j
    end
    object Grid()
      opr [i: ZZ32]: Row = Row(100 i)
      opr [i: ZZ32, j: ZZ32]: Row = Row(1000 i + 100 j)
    end
    object B
      f(): M = M()
    end

| form | base | after |
|---|---|---|
| `B.f()[5]^2` | 'Failed to find any matching overload, args = (), overload = { _[_](i:FortressLibrary.ZZ32,j:FortressLibrary.ZZ32) ...' | `B.f()[5]^2 = 11025` |
| `g[3][7]` | 'Failed to find any matching overload, args = (), overload = { _[_](i:FortressLibrary.ZZ32):Row ...' | `g[3][7] = 307` |
| `g[3,7][2]` | 'Unification error: Closure/Constructor for _[_] param 1 (j:ZZ32) got arg (): () of type ()' | `g[3,7][2] = 3702` |
| `m[7]^2` | 'Failed to find any matching overload, args = (), ...' | `m[7]^2 = 11449` |
| `x[5]^2` | 'Failed to find any matching overload, args = (), overload = { _[_](i:I):E ...' | `x[5]^2 = 36` |
| `x[5]k` | 'Failed to find any matching overload, args = (), overload = { _[_](r:Range[\FortressLibrary.ZZ32\]):Array[\T,FortressLibrary.ZZ32\] ...' | `x[5]k = 18` |
| `g[1][2]^2` | 'Failed to find any matching overload, args = (), overload = { _[_](i:FortressLibrary.ZZ32):Row ...' | `g[1][2]^2 = 10404` |

In the base's `g[3,7][2]`, `g[3,7]` ran as `g[7]`, and the `Row`'s subscript then got no index.

The tuple-binding programs count the calls of `pairOnce(): (ZZ32, ZZ32)`, which answers `(calls, 10 calls)` after `calls += 1`, and of a three-element `tripleOnce`:

| program | base | after |
|---|---|---|
| `(p, q, r) = tripleOnce()`, `(u: ZZ32, v: ZZ32) = pairOnce()`, `(s, t): (ZZ32, ZZ32) = pairOnce()`, `(nEmbd, blockSize) = (16, 4)` | `p q r = 2 30 400`, `u v = 6 70`, `s t = 9 100`, `calls = 10`, `lits = 16 4` | `p q r = 1 10 100`, `u v = 2 20`, `s t = 3 30`, `calls = 3`, `lits = 16 4` |
| `var (va, vb): (ZZ32, ZZ32) = pairOnce()`, `(_, wb) = pairOnce()`, `(ia, ib): ZZ32... := pairOnce()`, and an object's `var (fa, fb): (ZZ32, ZZ32) = pairOnce()` with a method that adds 100 to `fa`; then `va := 7`, `ia := 8` | `va vb = 2 30`, `wb = 60`, `ia ib = 8 90`, `assigned va ia = 7 8`, `fa fb = 111 120`, `calls = 12` | `va vb = 1 10`, `wb = 20`, `ia ib = 3 30`, `assigned va ia = 7 8`, `fa fb = 104 40`, `calls = 4` |
| `object O() (a, b) = pairOnce() end`, `o = O()` | `field a = 2 b = 30 calls = 3` | `field a = 1 b = 10 calls = 1` |
| an object expression `object extends HasAB (a, b) = pairOnce() ... end` made twice, and a generic `object Gen[\T\](t: T) (c, d) = pairOnce() end` | `objexpr a = 2 b = 30 calls = 3`, `generic c = 5 d = 60 calls = 6`, `second objexpr a = 8 b = 90 calls = 9` | `objexpr a = 1 b = 10 calls = 1`, `generic c = 2 d = 20 calls = 2`, `second objexpr a = 3 b = 30 calls = 3` |
| `object O() x = 1; y = x + 1 end`, a sibling field read in an initializer | (not run) | `y = 2` |

The first build of the binding's fix built the reference at the default depth, `ExprFactory.makeVarRef(at, temp)`. With it the top-level forms ran once, but the object's field and the object expression stopped: 'undefined variable [*tuple_.../W2Field.fss:9:3-21]' and '... W2ObjExpr.fss:16:3-21]'. The reference that the desugarer's own rewriters build replaced it, and every program above ran as shown on that second build.

microGPT's six top-level tuple bindings, `explorations/run-c4/src/MicroGptFlat.fss:17-19` and `explorations/apl/mg/MicroGptApl.fss:26-28` copied into one program (the APL file's `corpusPath, weightsDir` renamed `corpusPathA, weightsDirA`) that prints every name, give the same output on both codes (`diff` prints nothing):

    flat 17: 16 16 4 4 27 26
    flat 18: 1.0E-5 0.01 0.85 0.99 1.0E-8 1000
    flat 19: ../../apl/reference/dzaima/docs.txt ../../apl/reference/dzaima/w
    apl 26: 16 16 4 4 27 26
    apl 27: 1.0E-5 0.01 0.85 0.99 1.0E-8 1000
    apl 28: ../reference/dzaima/docs.txt ../reference/dzaima/w

Their right sides are tuples of literals; they now run once. `grep -nE "\]\^|\]\[" explorations/run-c4/src/MicroGptFlat.fss explorations/apl/mg/MicroGptApl.fss` prints nothing, so no model line has the subscript form. The model's other tuple bindings (`MicroGptFlat.fss:48`, `:53`, `:63`, `:88`) are local, which `forVarDecl` does not see. No model line changes.

## The stages

Neither stage runs, as the rung's section says ("The stages. None"). The paths the rung changes: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java`, `ProjectFortress/src/com/sun/fortress/interpreter/rewrite/DesugarerVisitor.java`, `ProjectFortress/tests/SubscriptThenSuperscriptWalk.fss`, `ProjectFortress/tests/TopLevelTupleBindingOnceWalk.fss` (from `XXXTopLevelTupleBindingOnceWalk.fss`), `ProjectFortress/tests/FieldTupleBindingOnceWalk.fss`, and this folder. All but `interpreter/rewrite/` are in the brief's list of paths that cannot move a stage. `DesugarerVisitor` cannot move one either: both stages run the compiled checker over the interpreter's library (`explorations/coordinator/tools/checker-count/run.sh:93-95`, `explorations/coordinator/tools/distance/run.sh:2`), and the desugarer is built only by walk's loader (`interpreter/env/CUWrapper.java:215`, `:217`); `grep -rln CUWrapper ProjectFortress/src | grep -v /interpreter/` and a grep of the stages' drivers, `WorldFlip.java` and `DistanceMulti.java`, for `CUWrapper`, `interpreter.` or `Desugarer` print nothing.

## The ladder subset

Empty, so nothing ran. The ladder compiles and runs on the compiled path only (`explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh:95`, `:104`: `fortress compile`, `fortress run`), which loads neither edited class. No recorded first error names what the change touched: `awk -F'\t' 'NR>1{print $NF}' <table> | grep -ciE "interpreter|Desugarer|Evaluator|evalAndInvoke|mathItem|tuple_|MathPrimary|intermediate nodes"` prints `0` for `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` and for the newest landed table, `explorations/compile-ladder/climb-batch-34b/gate/ladder/ladder.tsv`.

## Sentences made false

Of the specification: none. `grep -rn 'row~1[^0-9]' Specification --include=*.tex` and `grep -rn '~1026' Specification --include=*.tex` print nothing, and no sentence of `juxtameaning.tex`, `variables.tex`, `objects.tex` or `appendices/changes.tex` says what walk does with these forms.

Of the record and the skill (for the gather and the skill writer; this rung edits neither):

- F-363 (FACTS.md:275): "a superscript after a subscript that is a math item of its own, `x[5]^2` or `B.f()[5]^2`, compiles (F-387) and fails under walk (row 1)". Walk now runs both.
- F-387 (FACTS.md:290): "Walk still fails on these forms (row 1), so a program for both paths writes `(x[5])^2`." Walk now runs them.
- F-369 (FACTS.md:278): "Under walk the same right side runs once for each name and once more (row 1026)." It now runs once.
- `.claude/skills/fortress-repo/references/tests-writing.md:34`: "`x[5]^2` compiles, but under walk fails or gives the wrong element (ledger row 1)".
- `.claude/skills/fortress-repo/references/interpreter.md:35`: "The right side of a top-level tuple binding runs once for each name and once more ... (ledger row 1026). Bind the call to one name ...".
- Row 152's notes, "under walk the right side of such a binding runs once for each name and once more (row 1026)": record.md gives its new line.

## Points to report

1. Each fix as made: `Evaluator.evalAndInvokeMethod` (`Evaluator.java:1069-1071`), one line, `evalInvocationArgs(args)` to `evalExprListParallel(args)`; `DesugarerVisitor.forVarDecl` (`DesugarerVisitor.java:854`, `:870-872`, `:877`), the flag kept on entry and each name's field reference taken on `tempRef` in place of `init`.
2. Row 1's new test and row 1026's promoted one each fail on the base and pass after (the runs above). The form after a dotted call, `B.f()[5]^2`, and two subscripts, `g[3][7]` (the brief's `m[3][7]`, over a `Grid` whose subscript answers an object with a subscript), and `g[3,7][2]` are in the test, failed on the base each in a program of its own, and pass.
3. Row 152's notes, rewritten: record.md, "Ledger".
4. Walk's suite: no test failed (881 run, 0 failures).
5. A file edited beyond those named: none. A member beyond `mathItemApplication`: `evalAndInvokeMethod`, the helper it calls, whose one caller it is. A third test, `FieldTupleBindingOnceWalk.fss`, for the field form that the same member repairs.
6. Reserved, an interpreter output that changed: `m[3,7]^2` is 1075369 where the base gave 11449; the other subscript forms run where the base stopped; a tuple binding, at the top level or as a field, binds the elements of one run of its right side (the tables above). microGPT's six top-level tuple bindings give the same values.

None of these is a step that cannot be undone or that acts against a decision on record.

## Decisions

1. **The subscript's repair in `evalAndInvokeMethod`.** Its one line now evaluates every index with `evalExprListParallel`. Ways not taken: (a) `mathItemApplication` calls `evalExprListParallel` and `invokeMethod` itself, as `forSubscriptExpr` does: the same behaviour, but it leaves `evalAndInvokeMethod` with no caller and still dropping its first argument; (b) `evalInvocationArgs` changed: its three other callers (`Evaluator.java:1312`, `:1356`, `:1377`) pass lists that begin with the function, and the brief allows it only if they keep their behaviour. Evidence: `evalAndInvokeMethod`'s one caller is `Evaluator.java:1187`, and its comment, "Version that evaluates arguments first" (`:1068`), names no dropping.
2. **The indices passed as `forSubscriptExpr` passes them**: every index, each as one argument, with no unpacking of a lone tuple or `()` as `evalInvocationArgs` unpacks a call's one argument (`Evaluator.java:1388-1395`). Way not taken: a helper that evaluates every index and then unpacks so. Evidence: fork W1, "as `forSubscriptExpr` does" (`CLIMB-BATCH-35.md:447`); `Evaluator.java:1037`.
3. **The reference to the temporary built by the desugarer's own rewriters**, `Member` inside a trait or object (an object expression included), `Local` at the top level, chosen by `atTopLevelInsideTraitOrObject` on entry, as `forFnDecl` reads it to tell a method from a function (`DesugarerVisitor.java:792`). Ways not taken: (a) a reference at the default depth, built and measured: the object's field and the object expression stopped with 'undefined variable', where the base ran them; (b) a reference at `Environment.TOP_LEVEL`: the same failure for a field, which lives in the object, not at the top level (`BaseEnv.java:747-748`); (c) the temporary's name registered in the scope's map by `defsToLocals` and `defsToMembers` and resolved by `newName`: two more members edited for the same reference; (d) `BuildEnvironments` binding the names from one cell without the desugaring: a larger change of the loader.
4. **The field's tuple binding repaired with the top level.** The same member desugars both, and the objects chapter gives a field the top-level declaration's meaning (`objects.tex:295-297`). Way not taken: keep the old initializers inside a trait or object, so that a field ran its right side three times while the top level ran it once. No decision on record names the field; fork W2 names the top level.
5. **The tests.** The field form in a test of its own, `FieldTupleBindingOnceWalk`, named by its topic, not in the promoted top-level test. `g[1][2]^2` and `x[5]k`, F-387's other two forms, added to the subscript test. The new forms assert literal values, not the parenthesised spelling, so that their answers do not rest on another evaluation. The test's row object named `Lane`, since the library component declares an `object Row` (`Library/FortressLibrary.fss:3099`), not in its api, so no program sees it; the name avoids the doubt. Ways not taken: the field form in `TopLevelTupleBindingOnceWalk`; the planner's program alone; `(g[3])[7]` as the expected value.
6. **Both forks built in one build.** The two tests exercise disjoint code (no math primary in the binding tests, no tuple binding in the subscript test), so each result has one cause. Way not taken: one build per fork.
7. **No stage and no ladder run**, by the rung's section and the evidence under "The stages" and "The ladder subset".

## Defects and their homes

- Row 1, walk's subscript as a math item without its first index: home 1, repaired; `tests/SubscriptThenSuperscriptWalk.fss`. Closes.
- Row 1026, a top-level tuple binding's right side run once for each name and once more: home 1, repaired; `tests/TopLevelTupleBindingOnceWalk.fss`, promoted. Closes.
- The same defect at a field declared in tuple notation, in an object, a generic object and an object expression (measured on the base: `field a = 2 b = 30 calls = 3`; row 1026's claim names only the top level): home 1, repaired; `tests/FieldTupleBindingOnceWalk.fss`. No row: it closes with row 1026, whose close note names it.

## Commands worked out

- `FORTRESS_HOME=/home/user/fortress-base42 /home/user/fortress-base42/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/<dir> <tree>/ProjectFortress/tests/X.fss`, the skill's form, with absolute test paths: the harness runs from the base build.
