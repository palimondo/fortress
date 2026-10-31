<!-- The probes of climb batch 24's planner (CLIMB-BATCH-24.md, section 4, "The planner's probes", holds their results): what each file here is, the tree it was measured on, and how to run it again. Written 2026-10-31 by an Opus planning worker against main at 1f5c49b4f, whose code is df71bc585's, climb batch 23's landing. The CHOOSE probe's note and patch (choose.md) and the hard-set probe's note (hard-set.md) are other workers', and land here beside these. -->

# Climb batch 24's probes

All runs were in one worktree, `/home/user/fortress-p24`, seeded detached at `1f5c49b4f` from the base build `/home/user/fortress-base23` once its marker `tmp/BUILT` read 08:35:14 UTC, and removed after. The base build ran nothing but `old-fortress.sh` runs, with their private caches folder in the probe worktree. Machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` for the stages and the direct runs; three other probes shared the machine, the load rising from 1.7 to 34, so no time here is one to compare, and walk was not timed.

## The files

- `count.sh`: F-32's classes counted again on a built tree, made from `plan-23/probes/count.sh`: the natives probe's scripts read from `4a46fb83a`, with `remap.py` run between `match.py` and `classify.py`, then `plan-23/probes/movable.py`, then a column `now` added. Writes `classified.tsv`, `movable.tsv`, `moved.tsv` and `helpers-javap.txt`.
- `remap.py`: gives each binding whose string names a helper already the glue class it named on climb batch 23's base (`plan-23/probes/classified-base.tsv`, matched by file, owner and header), so that `classify.py`, which reads a glue class's name, sorts it as there; lists those bindings.
- `classified-base.tsv`, `movable-base.tsv`, `moved-base.tsv`: `count.sh`'s output on the base. The first two equal climb batch 23's tables of `a1f8c4b8b` binding for binding, line numbers included; `movable-base.tsv` has the column `now`; `moved-base.tsv` lists the 21 that climb batch 23 moved.
- `families.py` and `families-base.tsv`: the 83 bindings of `movable-base.tsv` that fit and still name a glue class, sorted into the batch's families F, Z, S and K and the seven left out, and since rung H was added the 82 of the hard set over `Char`, `NN32` and `NN64`, family H's 76 and its six left out, one line a binding with its line, owner, header, class, glue class and helper; with `--apply <tree> F,Z,S` (or `out`) it moves those families by exact text, as `plan-23/probes/family-edits.py` does.
- `rung-F.patch`, `rung-Z.patch`, `rung-S.patch`: each family's strings, written by `families.py --apply` on copies of the base's two library files; `rung-F.patch` also holds the one line of `StaticNativeApp.javaFor` that carries a declared `Float` in a `double`.
- `rung-H.patch`: rung H's text, measured on a second worktree, `/home/user/fortress-p24hh` (seeded detached at `1f5c49b4f` after the VM restart of about 10:27 UTC, removed after): the hard-set probe's rewrite of `compiler/BuiltinPrimitiveRewriter.java` (its `hard-set-way2b-rewrite.patch`, the Java only) and the 76 strings of family H in `families-base.tsv`, written by `families.py --apply` on the base and taken with `git diff`.
- `rung-W.patch`: the prototype of the walk rung, the loader told the type that declares a method: `FunctionClosure`, `MethodClosure`, `FunctionalMethod`, `NativeApp` and `StaticNativeApp` (`find` and the new `javaForSelf`), 41 lines added and 5 changed.
- Each patch applies to the base alone, and the six together with `choose.patch`: `git apply --cached --check` on the probe worktree's index, which held the base.

## How to run them again

From a worktree seeded from a base build at the batch's base, set up as the `fortress-repo` skill's `build-and-caches.md` says:

    explorations/compile-ladder/plan-24/probes/count.sh $PWD tmp/count
    python3 -B explorations/compile-ladder/plan-24/probes/families.py tmp/count/movable.tsv > tmp/families.tsv
    git apply explorations/compile-ladder/plan-24/probes/rung-F.patch explorations/compile-ladder/plan-24/probes/rung-Z.patch \
        explorations/compile-ladder/plan-24/probes/rung-S.patch explorations/compile-ladder/plan-24/probes/rung-W.patch
    ant compileAll        # then the library order, before a compiled test
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h ProjectFortress/tests/NativeHelper*Walk.* ProjectFortress/tests/ZZ32DivisionByZeroWalk.fss ProjectFortress/tests/XXXNativeHelperUncarriedSelfWalk.*
    explorations/coordinator/tools/distance/run.sh tmp/distance.txt tmp/distance        # in the background
    explorations/coordinator/tools/checker-count/run.sh tmp/count.txt tmp/count-scratch # in the background
    ant testSystem; ant testSpecData                                                   # in the background

The value probes were scratch programs, not kept: `ValH` for rung H prints every one of the 80 the hard-set probe names, on the values the record's section 4 gives, with `DivZeroN32` and `DivZeroN64` beside it; `ValF`, `ValZ` and `ValS` print every moved binding's result at the values the record's section 4 names, each run on the old code (`tools/old-fortress.sh /home/user/fortress-base23 <tree>/tmp/old-caches P.fss`) and on the text (`bin/fortress P.fss`), their outputs compared with `diff`; `DivZero64` and `DivZeroZZ` each hold one `DIV` by zero in a `try` catching `DivisionByZero`. The compiled sample, `NativeHelperFamilySampleCompiled` with a `.test` of `link`, `run` and `run_out_contains=PASS`, ran through `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> <its folder> NativeHelperFamilySampleCompiled.test` after the library order. Row 701's probe: the three `header.getWhereClause().isNone() &&` conditions removed from a copy of `compiler/codegen/CodeGen.java`, compiled with `javac -cp "$(bin/fortress_classpath | tail -1)"` into a scratch folder, and each program compiled with `java $JAVA_FLAGS -Dfortress.caches=<a fresh copy of the caches> -cp "<scratch>:<class path>" com.sun.fortress.Shell compile P.fss`, then `bin/fortress run P` with `FORTRESS_CACHES` set to that copy, as the skill's `compiler.md`, "Testing an edit here", gives it.
