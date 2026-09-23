# Rung P: the checker's exclusion relaxation — stopped

Taken into the tree at the gather of climb batch 3 (2026-09-22) as the record of a rung that did not land: its source stays on `wip/rung-exclusion-relax`, `ProjectFortress/compiler_tests/XXXExclusionRelaxRungP.fss` and `.test` included, which the text below cites as in the tree, and the provisional ledger row 354 and row-97 note it proposes were not opened (ledger row 354 is rung L's); see `explorations/compile-ladder/climb-batch-3/RECORD.md`, "Not landed". Every file under `probes/` that the text cites is in the tree: two taken at the gather, the other sixteen byte-identical from the branch at the batch's merged-diff review.

problem: the four errors the checker gives the three-trait shape of the library's tower — `explorations/compile-ladder/rung-exclusion-relax/probes/test-preedit.txt:2-10`, the trace's own capture `explorations/perf-probes/prelude/exclusion-trace/17-MinP-stock.out:17-24`
spec: `Specification/basic/types-vals-vars.tex:184-189` (the relations are the smallest that satisfy the listed properties, and no listed property makes two instantiations of one generic exclude: `:163-164`, `:212-216`, `:222-224`), with `Specification/basic/trait-parameters.tex:339-351` as text; and, for the half that decides soundness, `Specification/basic/overloading.tex:100-105`
precedent: the Fortress team's own rule, by name, "multiple instantiation exclusion" — `Papers/Types/exclusion.tick:141-152`, `Papers/Types/journal/justificationOfRTR.tex:496-497` — implemented by `checkP` at `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:443-456` and enforced by `scala_src/typechecker/TypeHierarchyChecker.scala:178`, `:187`; the measurement build's switch is modelled on the triage's `explorations/perf-probes/nat/triage/p-only.patch:1-83`
deviation: no checker edit landed, because the rung stopped; the record's positive test is landed as the expected-failure test `XXXExclusionRelaxRungP`, in the link-only shape of `ProjectFortress/compiler_tests/XXXExportVarRungXLinked.test:1-3` — `ProjectFortress/compiler_tests/XXXExclusionRelaxRungP.test:1-3`
historical: none

## The stop

The relaxation cannot land on its own, and closing what it opens is a second design decision. That is the stop the batch record names for this rung (`explorations/coordinator/CLIMB-BATCH-3.md:85`, "the fix for that is a second design decision"). The record expected it to show as a red suite in the inference path; it shows earlier, as a program.

**What the record did not have.** The clause this rung relaxes is not an accident of the checker. The Fortress designers adopted it, by name, as "multiple instantiation exclusion": "Fortress imposes a rule that forbids *multiple instantiation inheritance*, in which a type (other than Bottom) is a subtype of distinct applications of a type constructor. ... We call this rule *multiple instantiation exclusion* and adopt it here" (the OOPSLA 2011 paper, `Papers/Types/exclusion.tick:141-152`; the text first appears in `30c4abb9d`, 2011-08-12, "OOPSLA paper: exclusion preamble"). Karl Naden's writeup of 2012-08-31 (`8015b17f4`, "writeup of summer work on justifying multiple instantiation exclusion") gives the reason. A generic function specialised for one instantiation — `tail[\X\](x: List[\X\]): List[\X\]` beside `tail(x: List[\ZZ\]): List[\ZZ\]` — is unsound if some `BadList` extends both `List[\String\]` and `List[\ZZ\]`. Such a value, statically a `List[\String\]`, would be dispatched to the `List[\ZZ\]` body and come back as a `List[\ZZ\]` (`justificationOfRTR.tex:76-98`). The rule outlaws `BadList` (`:342-347`). Naden states the trade-off as "specialization of generic functions or multiple instantiation inheritance, but not both" (`:476-478`), and records the outcome: "Ultimately, Fortress implements blanket multiple instantiation exclusion for the semantic benefits and the simplicity of the restriction" (`:496-497`). None of the trace, the triage or the batch record cites either source. The design-intent map lists both (`explorations/coordinator/map/design-intent-sources.md:20-21`). The "designers' survey" the batch record quotes (`CLIMB-BATCH-3.md:77`) is not the Fortress designers. It is `explorations/run-c4/cold-cache/operators/D/SURVEY.md:46`, written during the revival on 2026-09-19, and it describes the interpreter's behaviour.

**The compiled checker implements both halves of that design.** `checkP` puts the rule into the exclusion relation (`TypeAnalyzer.scala:443-456`). The two hierarchy questions enforce it (`TypeHierarchyChecker.scala:178`, `:187`); the four errors of `MinP` are that enforcement. The Return Type Rule check solves for one instantiation of the less specific generic (`scala_src/overloading/OverloadingOracle.scala:81-105`, `subEDsolution` at `:88`). That is sound only if no other instantiation can apply, which is exactly what the rule guarantees ("multiple instantiation exclusion rules out any instantiation other than the one known at compile time", `justificationOfRTR.tex:457-459`). Rung P as briefed removes the enforcement and keeps the reliance.

**Measured: the relaxation admits a program that type-checks and then goes wrong.** `probes/ProbeMIEPick.fss` is `BadList` in the smallest compiled form:

    trait Tag[\X\] tagName(): String end
    object IntTag extends Tag[\ZZ32\] ...    object StrTag extends Tag[\String\] ...
    object Both extends { Tag[\String\], Tag[\ZZ32\] } ...
    pick[\X\](t: Tag[\X\]): Tag[\X\] = t
    pick(t: Tag[\ZZ32\]): Tag[\ZZ32\] = IntTag
    x: Tag[\String\] = Both ;  y: Tag[\String\] = pick(x) ;  println(... y.tagName())

The base checker refuses `Both` with four errors (`probes/probe-matrix.txt:22-36`). All three placements accept the whole program: the two hierarchy questions alone (`hier`), those plus the whole overloading check (`over`, the placement the record settled on), and every analyzer (`broad`). `link` exits 0, and the run dies at the `println` on line 23:

    java.lang.IncompatibleClassChangeError: Class ProbeMIEPick$IntTag does not implement the requested interface ProbeMIEPick$⟦Tag[String]⟧

(`probes/probe-matrix.txt:67`, `:89`, `:111`; the interface name is printed in its mangled form there). A variable of static type `Tag[\String\]` holds an object that is only a `Tag[\ZZ32\]`. The JVM's interface check is the only thing that stops it. The control `probes/ProbeMIEPickCtl.fss` has the same overload set and no multiply-instantiated type, and it compiles and runs correctly on the base checker and under every placement (`probe-matrix.txt:20`, `:62`, `:84`, `:106`). So the compiled path uses specialised generic overloads today and relies on the rule to make them safe.

**The two implementations took opposite sides of Naden's trade-off, and the specification sides with the interpreter on both halves.**

| | multiple instantiation inheritance (a type extends `G[\A\]` and `G[\B\]`) | a generic overload specialised for one instantiation (`pick[\X\]` beside `pick`) |
|---|---|---|
| compiled checker | refused: `checkP`, `TypeAnalyzer.scala:443-456`; 4 errors, `probe-matrix.txt:22-36` | accepted, and dispatched correctly: `probe-matrix.txt:18-21` |
| interpreter | accepted: its exclusion (`interpreter/evaluator/types/FType.java:197-297`) has no instantiation clause; `ProbeTypecaseMIE` prints PASS under `walk` (`probes/walk-ProbeTypecaseMIE.txt:2`) | refused: "non-ground types need exclusion" (`interpreter/evaluator/values/OverloadedFunction.java:496-498`); `walk` refuses `ProbeMIEPickCtl` with "has a parameter with generic type, at least one pair of parameters must have excluding types" (`probes/walk-ProbeMIEPickCtl.txt:5-6`) |
| specification | allowed: exclusion is the smallest relation satisfying the listed properties, and none of them concerns instantiations (`types-vals-vars.tex:184-189`, `:163-164`, `:212-216`, `:222-224`) | forbidden outright: "it is an error for their static parameters to differ ... or for one declaration to have static parameters and another to not have them" (`overloading.tex:100-105`) |

Either column's pair is sound. Rung P as briefed takes the interpreter's cell in the first column and keeps the compiler's cell in the second, which is the one unsound combination. Making the compiled path sound again means deciding one of two things:

1. **Keep multiple instantiation exclusion on the compiled path**, the team's 2011–2012 choice. Then the interpreter library's nested tower (`ZZ32 extends ZZ64`, each extending `Integral[\self\]`) is exactly what the rule forbids. The compiler prelude already resolved the same conflict by flattening its tower: `LibraryBuiltin/CompilerBuiltin.fss:1483` and `:1521` carry the interpreter library's `extends` clauses commented out. That resolution changes the library, which is not what the library route decided on 2026-09-21. The trace records the 61 errors this way (`exclusion-trace.md` § 5).
2. **Drop it**, as the specification and the interpreter do. Then the overloading checker must refuse the specialised generic overloads that the rule made safe. The specification's own statement of that is `overloading.tex:100-105`, and whether to enforce that sentence is decision (b) of `explorations/perf-probes/nat/triage.md:52-59` and `:113`, reserved to Pavol (`CLIMB-BATCH-3.md:18`, "35 the specification's sentence on differing static parameters, which is Pavol's decision"). Its cost on the compiled side is unmeasured: how many declarations in the compiler prelude and in `compiler_tests/` are specialised generic overloads that it would refuse. `ProbeMIEPickCtl` shows the compiled path accepts at least this one shape today.

Neither choice belongs to this rung. The rung lands no checker change, keeps `checkP` and `notExcludes` untouched (they are untouched in the net diff), and records the rest.

## What was measured

All measurements below use one **measurement build**: the base `d610695c0` plus `probes/measurement-switch.patch`. The patch adds one field to the analyzer, `instantiationsExclude`, set in its constructor and passed on by `extend`/`extendJ`. `checkP` returns `pFalse()` when `!negate && !instantiationsExclude`. The system property `-Dprobe.rungP` selects where analyzers without the clause are used:

- `off`: nowhere, which is the base checker;
- `hier`: the two `TypeHierarchyChecker` questions;
- `over`: those plus the whole `typechecker/OverloadingChecker`, through its own analyzer at `:73`;
- `broad`: every analyzer.

The source tree is back at the base (`git diff d610695c0 -- ProjectFortress/src` is empty). `ProjectFortress/build` in this worktree still holds the measurement build; with the property unset it behaves as the base checker.

**The probe matrix** (`probes/probe-matrix.txt`, produced by `probes/run-probes.sh`, which removes each program's cached jar before linking, so a failed link cannot leave stale classes for the run step):

| program | `off` | `hier` | `over` | `broad` | `walk` |
|---|---|---|---|---|---|
| `ExclusionRelaxRungP` (MinP shape) | 4 errors | links, PASS | links, PASS | links, PASS | — |
| `ProbeMIEPickCtl` (the overload set alone) | runs correctly | runs correctly | runs correctly | runs correctly | refused (`walk-ProbeMIEPickCtl.txt:5-6`) |
| `ProbeMIEPick` (`BadList`) | 4 errors | **links; IncompatibleClassChangeError** | **links; IncompatibleClassChangeError** | **links; IncompatibleClassChangeError** | refused (`walk-ProbeMIEPick.txt:5-6`) |
| `ProbeTypecaseMIE` (a `G[\ZZ32\]` holding an object that is also a `G[\Boolean\]`, `typecase` on `G[\Boolean\]`) | 6 errors | 1 error: "The typecase clause, G[\Boolean\], is unreachable." | same 1 error | links, PASS | PASS |
| `ProbeMIEOverload` (`f(t: Tag[\ZZ32\])` beside `f(t: Tag[\String\])`, ledger row 97's shape; `probes/probe-overload.txt`) | runs correctly | runs correctly | **refused**: "Invalid overloading of f" | **refused**, the same | refused: "unrelated (neither subtype, excludes, nor equal) and no excluding pair is present" |

The last row is what the overloading half costs. The compiled path accepts this overload set today only because the rule makes the two domains exclude, and it runs it correctly. Under `over` or `broad` it is refused, as `walk` refuses it (ledger row 97) and as the specification's Meet Rule requires once the two types do not exclude. So the half that takes the library count from 41 to 23 once L lands also removes compiled programs that work today. How many such programs the gated corpora hold is what the suite would have shown; it was not run.

**The checker count on this branch** (`explorations/coordinator/tools/checker-count/run.sh`, unchanged, run with `JAVA_TOOL_OPTIONS=-Dprobe.rungP=<mode>`; `probes/checker-count-{off,hier,over,broad}.txt`): `off` **93**, matching the gate baseline; `hier` **33**, `over` **33**, `broad` **33**, the same table in all three (`FortressBuiltin` 2, `FortressLibrary` 6, `RangeInternals` 104 unchanged, crash line unchanged, `#shadow` fresh). The manifest's 33 is reproduced, and it answers the manifest's open question: on this rung's own branch, the overloading half moves the count by nothing (`CLIMB-BATCH-3.md:67`). None of these numbers is a number for the landed tree, because nothing landed; the gate's count stays 93 for this rung.

**What the placement question looks like once the rule is in view.** The record chose among `definitelyExcludes`/`excludes` call sites (`CLIMB-BATCH-3.md:81`). Two families of positive-direction questions are missing from its list:

- the `typecase` redundancy checks of the type checker proper, `scala_src/typechecker/impls/Misc.scala:268`, `:274`, `:280`, `:332`;
- every meet computed through `normConjunct`, which returns `BOTTOM` when two conjuncts exclude (`TypeAnalyzer.scala:632-640`). This is how a `typecase` clause's type becomes empty, and it is also how the overloading certificate is reached (`OverloadingOracle.scala:190-194`).

`ProbeTypecaseMIE` shows the consequence: only `broad` accepts a reachable clause. But no placement closes the hole `ProbeMIEPick` opens, because the hole is the Return Type Rule check, not an exclusion question. For whoever takes the decision: a scoped placement does not need the triage's global counter and twinned memos (`triage/p-only.patch`). An analyzer that carries the switch as a constructor field keeps its own memos, which is what the measurement patch does. That answers "a scoped placement has to solve the same" (`CLIMB-BATCH-3.md:81`) for any later rung that wants a scoped form.

**The ladder subset** (`run-subset.sh` and `subset.txt` here, the restricted driver of `repair-r1-atomic-static`, private `LADDER_ROOT` under `tmp/`): the five ladder files whose recorded compile errors in `baseline-2026-09-19/raw/tests/` are exclusion or `typecase`-reachability errors — `atomicList`, `typecaseTest`, `typecaseVarTest`, `typecaseBlockTest`, `newlineTest`. The record declares no ladder move for this rung. **Result**: under all four modes, all five files stop at compile with exit 255, and every `.compile` output under `hier`, `over` and `broad` is byte-identical to `off`'s (`probes/ladder-subset.txt`, "identical" 15 times). None of these files is blocked by `checkP`. `atomicList`'s "Type ListError excludes CompilerBuiltin.Exception but it extends CompilerBuiltin.Exception" is identical in every mode, so `checkP` does not cause it. It sits beside an "Invalid comprises clause: CompilerBuiltin.Exception has a comprises clause" error on the same declaration (`tests/atomicList.fss:24`); which clause does establish it was not traced. The four `typecase` files' clauses name `ZZ32`, `String` and tuples, not instantiations of one generic. No ladder move, as the record expected.

## The specification, read around every line cited

- `types-vals-vars.tex:113-189`: two relations, subtype and exclusion. Exclusion means an empty intersection (`:139-143`). Propagation to subtypes is at `:163-164`. At `:184-189` the relations "are the smallest ones that satisfy all the properties given in those sections (and this one)". The sources of exclusion given in the trait-type section are the `excludes` clause (`:212-214`), arrow, tuple, `()` and `BottomType` (`:215-216`), and object-ness (`:222-224`). No property concerns two instantiations. Frozen spec 1.0 has the same sentence (`Specification-1.0-frozen/basic/types-vals-vars.tex:188`). The specification predates the 2011 rule and was not revised for it.
- `trait-parameters.tex:339-351`: "Trait declarations are allowed to extend other instantiations of themselves", with `C[\S\] extends C[\T\] where {S extends T}`, and "Effectively, we have expressed the fact that the static parameter S of C is covariant" (`:349-351`). This example is the covariant case, which Naden's refinement permits: "if the type parameter is covariant, then a type can extend multiple instantiations ... as long as there exists a minimal instantiation" (`justificationOfRTR.tex:536-537`). So this passage alone does not contradict the team's rule. The sentence that does is `types-vals-vars.tex:187-189`. The record cites `:339-345` as the contradiction; the contradiction is real, but it sits at `:187-189`. (The example still cannot be put through this front end, as the trace found.)
- `overloading.tex:100-108`: declarations of one name whose static parameters differ, or of which one is generic and one is not, are an error, "Hence, static parameters do not enter into the determination of which declarations are applicable". This refuses `pick[\X\]` beside `pick` outright. The compiled checker does not implement it; it compares domains only (`triage.md:56-57`).
- `expressions/typecase.tex:94-110`: a clause matches when the value's type is a subtype of the guarding type. The identifier's static type in the clause is the intersection. The specification has no "unreachable clause" error; the note at `:113-120` declines to make a less specific clause an error. `Misc.scala:332`'s refusal is sound exactly when the exclusion it asks is. Under the rule it is. Under the specification's relation, `ProbeTypecaseMIE`'s clause is reachable, and `walk` reaches it.

## Recorded failure, and what passes

**Failure**, the base tree `d610695c0` with no edit: `probes/test-preedit.txt`. The four errors are at `:2-9`: "Type B excludes A but it extends A.", the two "Types A and G[\Boolean\] exclude each other. B must not extend them.", and "Type B excludes G but it extends G.". Then `File ExclusionRelaxRungP.fss has 4 errors.` (`:10`) and, from the harness, `Tests run: 2, Failures: 2` (`:48`). This is the capture the batch record asked for: the same four as `17-MinP-stock.out:17-24`, every one attributed to `clause=P` there.

**What the relaxation does to it**: under each of `hier`, `over` and `broad`, the same program links and prints PASS (`probe-matrix.txt:56-59`, `:78-81`, `:100-103`). This matches the trace's `17-MinP-dropP.out`.

**What landed instead, and passes**: the expected-failure test `ProjectFortress/compiler_tests/XXXExclusionRelaxRungP.fss` with `.test` = `link`, `link_err_contains=Type B excludes A but it extends A.`. On the base checker: "Saw expected failure", `OK (1 test)` (`probes/xxx-tripwire.txt:17-21`). On the deliberate local fix (`-Dprobe.rungP=hier`) it goes red: "Saw wrong failure. link", `Tests run: 1, Failures: 1` (`:33`, `:43`). On the base checker again, after the jar left by that step is removed, it is green (`:57-61`). The shape follows the precedent `XXXExportVarRungXLinked.test`, which is link-only. A first version with the record's `link`/`run`/`run_out_contains=PASS` was red on the base checker too. `FileTests.java:583-585` fails on an unsatisfied `run_out_contains` before it consults `shouldFail`, so a run step behind a link that is meant to fail cannot be an expected failure. That version was not kept.

## The three homes

1. **The compiled checker refuses a type that extends two instantiations of one generic** (the `MinP` shape; `ExclusionRelaxRungP`). The specification settles it against the compiled checker (`types-vals-vars.tex:184-189`). It is deferred by this stop. **Home 2**: `ProjectFortress/compiler_tests/XXXExclusionRelaxRungP.fss` and `.test`, shown red on a deliberate local fix (`probes/xxx-tripwire.txt:23-43`). The tripwire is useful whichever way the decision goes. If someone relaxes the checker without the second half, it fires, and the ledger row it points to says why that alone is unsound. If Pavol keeps the rule, the file is deleted in the same change that records the decision.
2. **The compiled checker accepts an overload set whose declarations' static parameters differ** (`pick[\X\]` beside `pick`, `ProbeMIEPickCtl`). It is against `overloading.tex:100-105`, and `walk` refuses it too. **Home 3** (probe and ledger row: `probes/ProbeMIEPickCtl.fss`, `probe-matrix.txt:18-21`, `walk-ProbeMIEPickCtl.txt`), and **not home 2, by decision**. The specification is not silent here, but the sentence that settles it is itself Pavol's open decision (b) (`triage.md:52-59`, `:113`). An XXX test asserting it would pre-empt that decision, and would fire if he decides to drop the sentence. This is a departure from the three-home rule as the brief states it (home 3 is for a silent specification). The alternative, an XXX test asserting the refusal, was rejected for the reason just given.
3. **The relaxation, placed anywhere, admits an unsound program** (`ProbeMIEPick`). This is not a defect of the tree: the tree refuses the program. It is the measurement that makes this a stop. Home: the probe and its capture (`probes/ProbeMIEPick.fss`, `probe-matrix.txt:64-68`, `:86-90`, `:108-112`), cited by the ledger row. It becomes a gated test in whichever rung takes the decision. Under "drop the rule", it is a compile-error test that the overloading checker must refuse. Under "keep the rule", the tree already refuses it.
4. **Under the scoped placements, a reachable `typecase` clause is refused as unreachable** (`ProbeTypecaseMIE`). This is a defect only of a relaxed tree and a consequence of item 1: on the base tree the program is refused earlier by the hierarchy errors. Home: the probe (`probes/ProbeTypecaseMIE.fss`, `probe-matrix.txt:69-77`, `:91-99`), cited by the ledger row for whichever placement a later rung takes.
5. **The compiled checker accepts overloads on two instantiations of one generic by exclusion alone** (`ProbeMIEOverload`), which `walk` refuses (ledger row 97) and the specification's Meet Rule refuses once the two types do not exclude. This is the rule working as designed; whether it is a defect is the decision itself. Home: the probe (`probes/ProbeMIEOverload.fss`, `probes/probe-overload.txt`) and a note on row 97, because the specification's answer here is the same coupled answer as in item 1.

## Precedent search

- **The team's rule and its three implementations.** The paper (`Papers/Types/exclusion.tick:141-152`) and Naden's writeup are cited above. In the checker: `checkP`, and the two hierarchy questions that enforce it. In the compiler prelude: the flattened tower, `CompilerBuiltin.fss:1483`, `:1521`, which the trace found and could not explain (`exclusion-trace.md:167-180`, "no commit message in the available history explains them"). The rule explains them: the compiled world stayed within multiple instantiation exclusion by changing its library, not its checker.
- **The team's earlier exclusion oracle**, `scala_src/typechecker/ExclusionOracle.scala:152-167`, has no instantiation clause. Nothing live uses it: `StaticChecker.java:43` imports it and only `scala_src/overloading/OverloadingJUTest.scala:20` names it. It is a dormant predecessor, not a second opinion.
- **The interpreter**: `FType.java:197-297` (no instantiation clause) and `OverloadedFunction.java:496-498` ("non-ground types need exclusion"). These are the other side of the same trade-off.
- **The revival's own attempts**: the trace's shadow (`exclusion-trace/shadow-src/`) and the triage's `p-only.patch`, which place the relaxation with a global counter and twin every memo. The measurement build here uses a field on the analyzer instead, which needs no twinning (above).
- **History**: `checkP` is present at the parentless import root of `TypeAnalyzer.scala`, `5a68404fd` (2012-07-19), so its own commit is not in the available history. The rule's text is in `30c4abb9d` (2011-08-12) and `8015b17f4` (2012-08-31).

## Differentials run

1. The probe matrix, 4 placements × 4 programs (`probes/probe-matrix.txt`), and row 97's shape under the same 4 placements and `walk` (`probes/probe-overload.txt`).
2. The checker-count stage under each placement (`probes/checker-count-*.txt`).
3. `walk` on the three probes (`probes/walk-*.txt`).
4. The expected-failure test on the base checker and on the local fix (`probes/xxx-tripwire.txt`).
5. The ladder subset under each placement (`probes/ladder-subset.txt`).

Not run, by the brief: `ant testFast`, `ant testSystem`.

## Inherited state

Nothing. The worktree `/home/user/fortress-exclusion` and the branch `wip/rung-exclusion-relax` did not exist when this rung started, and `origin` had no such branch either. The rung created them itself, from `d610695c0`, with the recipe of `explorations/coordinator/remote-container.md:103-109`: `git worktree add -b`, a copy (not a symlink) of `ProjectFortress/build`, `tmp/`, and `git push -u`. The coordinator should know this in case its own setup step expected to find the worktree absent.

## What this does not settle

- **The suite**, not run by this rung. The rung's net change to the gated corpus is one new XXX file that is green on the base checker, shown with the single-file harness only.
- **Whether the compiler prelude passes the checker under each relaxed placement.** The prelude was compiled once, on the base checker; a `fortress compile` of an unchanged source re-checks nothing.
- **The cost of option 2**: how many declarations in the compiler prelude, `compiler_tests/` and `library_tests/` are generic overloads with differing static parameters, which enforcing `overloading.tex:100-105` would refuse.
- **Naden's covariant refinement** (`justificationOfRTR.tex:512-537`) is not implemented: `cP` compares type arguments by equivalence whatever the variance (`TypeAnalyzer.scala:448-452`). It would not rescue the library's tower, whose self-typed algebra traits take their subject type in parameter positions.
- **The RTR check's other assumption.** `ProbeMIEPick` is one shape, a top-level function. Dotted methods cannot express it this way: `Both` could not declare a `get(): X` for two `X`. What the relaxation does to functional methods and to the static-argument inference inside the type checker (`Formula.scala`, `CoercionOracle.scala`) is unmeasured.

## Reproduce

    cd /home/user/fortress-exclusion && source experiment/env.sh
    git apply explorations/compile-ladder/rung-exclusion-relax/probes/measurement-switch.patch && ant compileAll
    # (library-order cache rebuild if the caches are empty)
    for m in off hier over broad; do
      JAVA_FLAGS="-Xmx4g -Xss64m -Dprobe.rungP=$m" explorations/compile-ladder/rung-exclusion-relax/probes/run-probes.sh $m
      JAVA_TOOL_OPTIONS=-Dprobe.rungP=$m explorations/coordinator/tools/checker-count/run.sh tmp/cc-$m.txt tmp/cc-$m
    done
    git apply -R explorations/compile-ladder/rung-exclusion-relax/probes/measurement-switch.patch
