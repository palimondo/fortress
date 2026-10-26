<!-- The files and commands of climb batch 22c's planner's probes (coordinator/CLIMB-BATCH-22c.md, section 4, holds their results), run 2026-10-26 by an Opus planning worker in three worktrees seeded detached from /home/user/fortress-base23 at e0ec620a9, whose code is main's (2c39b1147); the probe programs are given here inline and were not kept as files. -->

# Climb batch 22c: the planner's probes, their files and commands

Each command runs from the root of a worktree seeded from the base build (`explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base23 <worktree> - e0ec620a9`), after the `fortress-repo` skill's setup lines (`build-and-caches.md`, "Setting up each call"), and in the background with a log, as its `session.md` gives it. Results: `coordinator/CLIMB-BATCH-22c.md`, section 4. Machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` for the stages; up to three runs went side by side, so no time here is one to compare.

## The files

- `edits22c.py`: the batch's text as named edits by exact text, by rung; its header lists them and the order. `python3 -I edits22c.py <tree> [edit ...]`; no edit named applies every edit but the two measured variants. It stops before writing anything if an edit does not match once.
  - A: `count816` (the export check's count), `absMaybe`, `absArray`, `absReduction`, `absRange`, `absString` (the 12 bodyless declarations).
  - O: `opr782` (the export check reads operators, under their names only), `hdrRange`, `hdrBig`, `hdrList` (the 9 headers).
  - L: `covcoll` (CovariantCollection's api and component), `varparam` (the export check compares an object's value parameter without `var`), `stage14` (the distance stage's list).
  - B: `bound412` (`Shell.java:372`), `stageCompile` (the stage's compile setting read from `Shell.java`, and the stage's default).
  - The variants: `count816strict` (the team's count with modifiers compared whole, no `ignoreAbstract`) and `oneshotApi` (the api's `OneShot` parameter written `var`).
- `rung-A.patch`, `rung-O.patch`, `rung-L.patch`, `rung-B.patch`: the edits per rung, each applying to the base alone (`git apply --check`); A, O, L and B applied in that order give `text22c.patch` byte for byte, the text measured together.

## The commands

**A copy of the distance stage that takes extra targets, a target list and a class folder ahead of the build** (no tracked tool changes):

    W=$PWD
    sed -e 's#-cp "$SCRATCH/shadow-classes:#-cp "${XCP:+$XCP:}$SCRATCH/shadow-classes:#' \
        -e 's#ProjectFortress/LibraryBuiltin/AnyType.fss"$#ProjectFortress/LibraryBuiltin/AnyType.fss${EXTRA:+ $EXTRA}"#' \
        explorations/coordinator/tools/distance/run.sh > tmp/run-x.sh && chmod +x tmp/run-x.sh
    # tmp/run-t.sh: the same, with the line COMPONENTS=${TARGETS:-$COMPONENTS0} after the list, renamed COMPONENTS0

**An export check of an edit, compiled into a scratch folder** (the edit applied in the worktree, the build untouched):

    CP=$(bin/fortress_classpath | tail -1) ; mkdir -p tmp/xc
    java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d tmp/xc -encoding UTF-8 \
        ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala
    XCP=$W/tmp/xc tmp/run-x.sh tmp/runs/a1.txt tmp/runs/a1

**The runs, by name** (section 4 gives each table):

    b14: EXTRA="Library/CovariantCollection.fss Library/OneShotFlag.fss" tmp/run-x.sh ...     # the base, fourteen
    a0:  count816 only, XCP                                                                       # A's check alone
    a1:  count816 absMaybe absArray absReduction absRange absString, XCP                          # rung A
    as:  count816strict and the five decls, XCP                                                   # A's strict variant
    o0:  opr782 only, XCP                                                                         # O's check alone
    o1:  opr782 hdrRange hdrBig hdrList, XCP                                                      # rung O
    l1:  covcoll oneshotApi, TARGETS="Library/CovariantCollection.fss Library/OneShotFlag.fss"    # L, first text
    l2, l3: covcoll varparam, XCP, the same TARGETS (l3 with upward's general arm a cast)         # rung L
    c1:  every edit, a first stageCompile that called Shell.useCompilerLibraries(), built         # crashed, see section 4
    c2:  every edit, built (ant compileAll), the stock stage of the tree: run.sh tmp/runs/c2.txt tmp/runs/c2
    h1:  the twelve walk tests below on l2's text (upward's general arm a fail): 1 failure
    h2:  the same on l3's text (the arm a cast): OK (12 tests)

**The combined tree's other runs** (worktree with `text22c.patch`, `ant compileAll`, then the library order):

    explorations/coordinator/tools/checker-count/run.sh tmp/count/c.txt tmp/count/c
    ant testQuick ; ant testSystem && ant testSpecData
    # the ladder regression and the four-thread atomic runs, as the skill's gate.md gives them, into tmp/gate/ladder

**The bound flip alone, by the skill's quick loop** (`compiler.md`, "Testing an edit here"), on `tests/doubledOverloading.fss` and a copy of it with `[\E extends Object\]` and `[\F extends Object\]`:

    javac -nowarn -cp "$CP" -d tmp/qB/classes ProjectFortress/src/com/sun/fortress/Shell.java    # with bound412
    java $JAVA_FLAGS -Dfortress.caches=tmp/qB/caches -cp "tmp/qB/classes:$CP" com.sun.fortress.Shell compile doubledOverloading.fss

**The walk tests of covariant collections on rung L's text** (one harness call):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/{CovCollTest,CovariantTest,AnyListElementTypeWalk,ComprehensionTypedBindingWalk,ListTest,MapTest,IntMapTest,NestedListComprehensionWalk,OpenParameterListComprehensionWalk,ArrayListQuick,ListEqualityElementwise,HeapTest}.fss

## The probe programs, inline

Each compiled from its own folder on the combined tree (`FORTRESS_CACHES` a copy of its caches) and on the old code (`tools/old-fortress.sh /home/user/fortress-base23 <caches> compile P.fss`). An api `P.fsi` beside its component `P.fss`:

    (* ExportVarObjectParameter *)  api: object O(x: ZZ32) end            component: object O(var x: ZZ32) end
    (* XXXExportOperatorHeader *)   api: trait A end  object B extends A end  opr #(a: String, b: String): A
                                    component: the same two types, opr #(a: String, b: String): B = B
    (* ExportOperatorMatch *)       api: opr #(a: String, b: String): String
                                    component: opr #(a: String, b: String): String = a || b, and a run() asserting "x" # "y" is "xy"
    (* XXXExportAbstractMemberOtherHeader *)  api: trait T abstract f(): ZZ32 end
                                    component: trait T f(): String = "other header" end
    (* ExportAbstractMemberBodyless *)  api: trait T abstract f(): ZZ32 end  mk(): T
                                    component: trait T f(): ZZ32 end  object O extends T f(): ZZ32 = 3 end  mk(): T = O, and a run() asserting mk().f() is 3
