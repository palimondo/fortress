# The briefing and checks lists of climb batch 7R's two rungs (CLIMB-BATCH-7R.md, section 7),
# keys of explorations/coordinator/tools/facts-extract.sh. Run as a script, it checks each list
# with the tool's --check on the tree at $FORTRESS_HOME: every key must match exactly one place.
SRC = 'ProjectFortress/src/com/sun/fortress'
C = 'explorations/reviews/numerics-plan-coordinator'

J_BRIEFING = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-27 size's range", "positions:2026-09-26 answer 8",
  "positions:2026-09-27 numeral's type", "positions:2026-09-24 exclusion route rung P's fork",
  "positions:2026-09-19 answering the open question", "positions:2026-09-21 library route",
  "positions:2026-09-27 launch of phase 3's batches", "positions:2026-09-27 stops a batch record reserves",
  "positions:2026-09-26 rung D's stop",
  "ledger:450", "ledger:451", "ledger:452", "ledger:358",
  "doc:explorations/reviews/numerics-plan-synthesis.md#Decision 1. Ranges over ZZ32 alone",
  "doc:explorations/reviews/numerics-plan-fable.md#3.5 What the distance is made of, and what is numeric",
  "doc:" + C + "/measure-C.md#Method",
  "doc:" + C + "/measure-C.md#2. Tree 2: scalar ranges over ZZ32 only",
  "doc:" + C + "/measure-C.md#3. What ranges over other integer types cost",
  "doc:" + C + "/probes-C/z32.py",
  "doc:" + C + "/probes-C/walk/rangeOperators.T2.txt",
  "doc:explorations/perf-probes/prelude/switch-over-distance.md#2.6 Crashes",
  "doc:explorations/perf-probes/prelude/switch-over-distance-flat.md#2.6 Crashes",
  "doc:Specification/basic/expressions/ranges.tex#Ranges",
  "doc:Specification/basic/conversions-coercions.tex#Coercion Invocations",
  "code:Library/CompilerLibrary.fsi#trait GeneratorZZ32 excludes..opr #(lo:ZZ32, sz:ZZ32): Range",
  "code:Library/FortressLibrary.fsi#The %#% and %:% operators serve as factories..(r: Range",
  "code:Library/FortressLibrary.fss#(** The # and : operators serve as factories..r.imposeStride(stride)",
  "code:Library/FortressLibrary.fss#trait Range[..trait PartialRange[",
  "code:Library/RangeInternals.fss#object ExtentScalarRange[",
  "code:Library/RangeInternals.fss#Helpers for # to get the type instantiation..open3Range",
  "code:Library/Random.fss#object UniformDistribution[",
  "code:" + SRC + "/scala_src/typechecker/impls/Functionals.scala#case SCaseExpr(SExprInfo(span, paren, _), param, compare, equalsOp, inOp,",
  "code:" + SRC + "/compiler/Types.java#public static void useCompilerLibraries()..public static void useTypeCheckerLibraries()",
  "code:" + SRC + "/compiler/Types.java#public static TraitType makeGeneratorZZ32Type",
  "code:" + SRC + "/compiler/WellKnownNames.java#public static boolean areCompilerLibraries",
  "code:" + SRC + "/scala_src/types/TypeAnalyzer.scala#def typeCons(x: Id)",
  "doc:ProjectFortress/tests/XXXRangeBoundsRungO.fss", "doc:ProjectFortress/tests/XXXSeqRangeTopRungO.fss",
  "doc:ProjectFortress/tests/XXXRangeSizeZZ64RungO.fss", "doc:ProjectFortress/tests/XXXImportImportCollision.fss",
  "doc:ProjectFortress/tests/roundBug.fss",
  "The cheap fixes and scalar ranges over ZZ32, measured on one library copy",
  "The distance to the switch-over by root cause", "The true distance to the switch-over",
  "Static arguments are inferred from the arguments alone, on both paths",
  "A numeral's type depends on the path and on the library in scope",
  "MicroGPT's own programs through the compiled checker against the one library",
  "The specification never wrote static-argument inference",
  "Crashes reach zero in the shadow", "The one library's number tower is flat",
  "The static type checker (Scala, scala_src/typechecker/) runs only on the compile path",
  "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
  "testSystem's four shards are one suite split by sorted index",
  "The interpreter's overload-ambiguity message names its two declarations",
  "ant compileAll deletes a tracked file", "The checker-count stage's table",
  "map:README.md#Touch this@scala_src/typechecker", "map:README.md#Touch this@Library/FortressLibrary.fss and the other",
]
J_CHECKS = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-27 stops a batch record reserves",
  "positions:2026-09-26 rung D's stop", "ledger:450", "ledger:451", "ledger:452", "ledger:358",
  "doc:" + C + "/measure-C.md#2. Tree 2: scalar ranges over ZZ32 only",
  "doc:Specification/basic/expressions/ranges.tex#Ranges",
  "code:Library/FortressLibrary.fss#(** The # and : operators serve as factories..r.imposeStride(stride)",
  "code:Library/RangeInternals.fss#object ExtentScalarRange[",
  "code:" + SRC + "/scala_src/typechecker/impls/Functionals.scala#case SCaseExpr(SExprInfo(span, paren, _), param, compare, equalsOp, inOp,",
  "code:" + SRC + "/compiler/Types.java#public static TraitType makeGeneratorZZ32Type",
  "The cheap fixes and scalar ranges over ZZ32, measured on one library copy",
  "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
]

U_BRIEFING = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-26 answer 8", "positions:2026-09-27 size's range",
  "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 lineage note",
  "positions:2026-09-24 requirement on the plan", "positions:2026-09-26 number chapters under S2",
  "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
  "ledger:450", "ledger:451", "ledger:452",
  "doc:explorations/reviews/numerics-plan-synthesis.md#Decision 1. Ranges over ZZ32 alone",
  "doc:" + C + "/measure-C.md#3. What ranges over other integer types cost",
  "doc:Specification/basic/expressions/ranges.tex#Ranges",
  "code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in",
  "code:Specification/basic-lib/basic-integers.tex#The factorial operator is defined only for natural number types..m! = PROD",
  "code:Specification/basic/expressions/reductions.tex#The desugaring of a reduction is directed by..The normative text is unchanged.",
  "doc:Specification/appendices/changes.tex#The integer trait",
  "doc:Specification/appendices/changes.tex#Reductions whose element type nothing fixes",
  "doc:Specification/appendices/changes.tex#Passages not yet revised",
  "doc:SpecData/examples/advanced/Generators.GeneratorDefn.fss", "doc:SpecData/examples/basic/Expr.Do.mySum.fss",
  "code:Specification/advanced/parallelism-locality/defining-generators.tex#Any reduction must define two methods..figlabel{generatorDefn}Sample",
  "doc:Documentation/Specification/Prose/Language/Expressions/ranges.tick",
  "code:Library/CompilerLibrary.fsi#opr :(lo:ZZ32, hi:ZZ32): Range..opr #(lo:ZZ32, sz:ZZ32): Range",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
  "doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#5. Decisions taken inside the rung",
  "The specification never wrote static-argument inference",
  "The specification's number chapters describe the flat library",
  "Specification-1.0-frozen/ is byte for byte", "The team's latest word on types",
  "The specification states instantiation exclusion, and its refused examples",
  "Citing Specification/library/apis/*.tex as an independent standard is circular",
  "The cheap fixes and scalar ranges over ZZ32, measured on one library copy",
  "map:README.md#Touch this@Specification/ (the standard)",
]
U_CHECKS = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
  "positions:2026-09-26 number chapters under S2", "positions:2026-09-27 stops a batch record reserves",
  "doc:Specification/basic/expressions/ranges.tex#Ranges",
  "code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in",
  "doc:Specification/appendices/changes.tex#Passages not yet revised",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
  "The specification never wrote static-argument inference",
]

LISTS = {'J': (J_BRIEFING, J_CHECKS), 'U': (U_BRIEFING, U_CHECKS)}

if __name__ == '__main__':
    import subprocess, re, sys, os
    root = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
    verbose = '-v' in sys.argv
    bad = 0
    for rid, (b, c) in LISTS.items():
        for name, keys in (('briefing', b), ('checks', c)):
            assert len(set(keys)) == len(keys), (rid, name, 'duplicate')
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k)]
            assert not badk, (rid, name, badk)
            if name == 'checks':
                stray = [k for k in keys if k not in b]
                assert not stray, (rid, 'stray', stray)
            r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + keys,
                               capture_output=True, text=True, cwd=root)
            lines = r.stdout.strip().splitlines()
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:300])
            if r.returncode or verbose:
                for l in lines: print('   ', l[:300])
            if r.returncode: bad += 1
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
