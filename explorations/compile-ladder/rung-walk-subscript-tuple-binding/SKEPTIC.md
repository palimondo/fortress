# Rung W, the skeptic's check: walk's subscript before a superscript, and its tuple binding run once

One launch of the skeptic worked this rung. Head judged: `9e3a47ac20` (the worker's last commit). REPORT.md and record.md were already on the branch in that commit, so nothing was written from the run's journal. The skeptic's commits: `675932404d` (fix), `f39d01a66a` (correction), and this file.

## Verdict

Contested. The subscript repair (row 1) is right as the worker made it. The tuple binding repair (row 1026) was right for a call on the right side, but made walk refuse a typed tuple binding of numerals that the base ran: the skeptic's fix repairs that, by a way that departs from fork W2's letter for a tuple expression, so it goes to the judge (below, "Contested").

## What was checked

1. **The stages.** REPORT.md says neither stage ran. `git diff --name-only 13f4fdea75...HEAD` lists one path outside the brief's list: `ProjectFortress/src/com/sun/fortress/interpreter/rewrite/DesugarerVisitor.java`. It cannot move a stage: `grep -rln DesugarerVisitor ProjectFortress/src` prints only itself and `interpreter/env/CUWrapper.java`, no file outside `interpreter/` names `CUWrapper`, `ComponentWrapper` or `APIWrapper`, and the count stage runs the compiled phase order through the checker (`explorations/coordinator/tools/checker-count/run.sh:93-95`, `WorldFlip -stop check`). The report's statement holds for the skeptic's fix too, which is in the same member.
2. **Test first, in the worker's transcript.** Call `6i7PPx`, 10:32:05 to 10:32:16, echoed both `Expected failure:` lines before `harness-one.sh ... SubscriptThenSuperscriptWalk.fss TopLevelTupleBindingOnceWalk.fss`; `git status --short` in the same call shows only the two test files changed; output 'FAIL: a ZZ32: 3 =/= a ZZ32: 1; the right side ran once', 'FAIL: a ZZ32: 11449 =/= a ZZ32: 1075369; two indices, then a superscript', 'Tests run: 2,  Failures: 2,  Errors: 0'. The first code edit is call `NfxFnq` at 10:34:12, the first build `YNme4p` at 10:34:20. The field test was written after the edit and run first on the old code with its `Expected failure:` line (call `85fgJW`, 10:40:07, 'FAIL: a ZZ32: 3 =/= a ZZ32: 1; an object's field: the right side ran once'). The last code change is `ocg5x3` at 10:37:55, built by `2E8hfn` (10:38:07, 'BUILD SUCCESSFUL', 'Total time: 51 seconds'); the last passing run is `wMdrUW` at 10:47:09, 'OK (3 tests)'. Each line that recordedFailure and recordedPass quote is in the transcript.
3. **The diff.** `Evaluator.evalAndInvokeMethod` (`Evaluator.java:1069-1071`): one line, `evalInvocationArgs` to `evalExprListParallel`; its one caller is `mathItemApplication` (`grep -rn evalAndInvokeMethod --include=*.java .` prints `Evaluator.java:1069` and `:1187` only); `evalInvocationArgs` keeps its three callers. Right, and as small as it can be. `DesugarerVisitor.forVarDecl`: right for a right side that is a call; wrong for a typed binding of numerals (finding 1). No trim: each line of the worker's change is in the form the code around it uses.
4. **Precedent.** The subscript follows `forSubscriptExpr` (`Evaluator.java:1034-1045`); the other two subscript sites evaluate every index (`LHSToLValue.java:77`, `LHSEvaluator.java:46`). The tuple binding's sibling site, a local tuple binding, runs once and converts its numerals on both codes (program `SkLocal`, below). For the skeptic's fix, the team's code generator binds each field of a tuple expression to its element (`compiler/codegen/CodeGen.java:5230-5236`, the team's at `a874948ac` `:4340-4346`), and the checker types a tuple binding's right side at the tuple of the names' types (`scala_src/typechecker/impls/Decls.scala:272-277`, F-369).
5. **The tests.** Each holds one comment line; `FieldTupleBindingOnceWalk` cites `objects.tex`, section "Field Declarations" (`Specification/basic/objects.tex:258`), whose `:295-297` gives a field the top-level declaration's meanings; no message cites a line.
6. **The differential** (finding 1 and below).
7. **Homes**, 8. **ledger and siblings**, 10. **names**, 11. **failure modes**: below.
9. **The report.** Its provenance lines, each opened with `sed -n`, say what they claim; the skeptic's correction moves the `DesugarerVisitor.java` citations to the head after the fix and adds the fix's precedent and passage. No sentence of the specification is made false by the rung or the fix (`grep -rn 'row~1[^0-9]' Specification --include=*.tex` and `grep -rn '~1026' Specification --include=*.tex` print nothing). The whole suite of the head's code is the skeptic's run (below). Row 152's new line passes `ledger.py check --rows`, '1 rows, 0 fail the template', and is true after the fix: the corpus binding's right side is a call, which runs once.

## Finding 1, a defect of the change: a typed tuple binding of numerals stopped at load

The worker's `forVarDecl` binds the right side to an untyped temporary, where a numeral takes its default (P-173), then binds each typed name from it, where no coercion carries a `ZZ32` into `NN32` or an `RR64` into `QQ`. Each program below is one top-level binding and a `run()` that prints each name and the type that an overloaded `kind` answers; walk on the worker's head (`bin/fortress P.fss` in the rung's tree) against the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base42 <tree>/tmp/old-caches P.fss`):

| binding | base | worker's head |
|---|---|---|
| `(u: NN32, r: RR32) = (5, 0.5)` | `u = 5 NN32, r = 0.5 RR32` | 'Type mismatch binding 5: ZZ32 (type ZZ32) to u (type NN32)' |
| `(u, r): (NN32, RR32) = (5, 0.5)`, `(u, v): NN32... = (5, 6)`, `(u: NN32, k) = (5, 3)`, `var (u: NN32, r: RR32) = (5, 0.5)` | each binds at its type, `k = 3 ZZ32` | the same refusal |
| `(u: NN32, r: RR32) = if flag then (5, 0.5) else (6, 1.5) end` | `u = 5 NN32, r = 0.5 RR32` | the same refusal |
| `object O() (u: NN32, r: RR32) = (5, 0.5) end` | `u = 5 NN32, r = 0.5 RR32` | 'Type mismatch binding 5: ZZ32 (type ZZ32) to $u (type NN32)' |
| `(q: QQ, w: ZZ64) = (0.1, 3)` | `q = 1/10 QQ, w = 3 ZZ64` | 'Type mismatch binding 0.1:RR64 (type RR64) to q (type QQ)' |

The compiled path binds each at its declared type (the old code, the compiled path being unchanged by the rung: `old-fortress.sh ... compile SkTupNumC.fss && old-fortress.sh ... run SkTupNumC` prints `NN32   RR32`, `NN32   NN32`, `NN32   ZZ32`, `NN32   RR32`, `NN32   RR32` for the first five rows). The rule: "The declared type of a variable, a field or a parameter ... There the numeral is converted into that type, from its exact value" (`Specification/basic/expressions/literals.tex:199-208`; P-173, "walk converts from the exact value at the same places").

**The ways.** (a) Declare the temporary at the tuple of the names' types, `Any` for an untyped name: walk converts a tuple element by element at a typed binding (`Coercions.coerceTuple`). Built and measured: the numeral forms pass, but an array literal in a typed tuple expression, `(arr, n): (ZZ32[2], ZZ32) = ([1 2], 3)`, which the base and the worker's head run, stops: 'Type mismatch binding ((1,2),3): ((ZZ32,ZZ32),ZZ32) ... to *tuple_...', since walk's typed tuple conversion builds no array (the same as `t: (ZZ32[2], ZZ32) = ([1 2], 3)` on the base, row 1105). (b) A tuple expression of as many elements as names binds each name to its own element, as a declaration of that name alone, with no temporary: every numeral and array literal is converted at its own name's place, as on the base, and each element runs once; it leaves the `if` form refused. (c) (b) for a tuple expression and (a) for any other right side: taken. (d) Keep the temporary's numerals unconverted, in `LazilyEvaluatedCell` and the field initializer, by the temporary's name: files outside the section, keyed to a name. (e) The base's initializers for a typed binding: the right side runs again, against W2.

**The fix** (`675932404d`, `DesugarerVisitor.forVarDecl`, `DesugarerVisitor.java:868-877` and `:878-893`). The test `ProjectFortress/tests/TupleBindingNumeralTypesWalk.fss`, written first, run through the harness on the worker's head before the edit:

    echo "Expected failure: TupleBindingNumeralTypesWalk red on the worker's head, refused while the top-level variables are initialised: 'Type mismatch binding 5: ZZ32 (type ZZ32) to un (type NN32)'"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/.../h1 ProjectFortress/tests/TupleBindingNumeralTypesWalk.fss
    # harness-one 2026-11-23T11:38:25Z; tree 9e3a47ac20; nproc=4; load 2.23 2.53 2.57; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    Type mismatch binding 5: ZZ32 (type ZZ32) to un (type NN32)
    Tests run: 1,  Failures: 1,  Errors: 0

On the old code its last assertion failed another way, 'FAIL: a NN32: 68 =/= a ZZ32: 68; the values' (walk's `assert` compares an `NN32` with a numeral by `SEQV`, row 807); it was rewritten as `assert(... = 68, "the values")`, and the run on the worker's head repeated with the same `Expected failure:` line at 11:39:03, the same lines. The old code then passed it, 'OK (1 test)' (11:39:08). Build 1 (way (a), 11:39:41, 'BUILD SUCCESSFUL', 'Total time: 49 seconds') passed it with the rung's tests and the team's `TupleBinding` and `TupleBinding2`, 'OK (6 tests)' (11:40:38). The array assertion was then added and run on build 1 with its line, `echo "Expected failure: TupleBindingNumeralTypesWalk red on the build of the typed temporary alone ..."` (11:45:21): 'Type mismatch binding ((1,2),3): ((ZZ32,ZZ32),ZZ32) (type ((ZZ32,ZZ32),ZZ32)) to *tuple_...', 'Tests run: 1,  Failures: 1,  Errors: 0'. Build 2 (way (c), 11:45:28, 'BUILD SUCCESSFUL', 'Total time: 39 seconds'), then `harness-one.sh ... TupleBindingNumeralTypesWalk.fss TopLevelTupleBindingOnceWalk.fss FieldTupleBindingOnceWalk.fss SubscriptThenSuperscriptWalk.fss TupleBinding.fss TupleBinding2.fss` at 11:46:15: 'OK (6 tests)'. On the old code, the final test: 'OK (2 tests)' with the XXX test below (11:58:18).

After the fix every program of the table prints what the base prints; so do `(arr, n): (ZZ32[2], ZZ32) = ([1 2], 3)` and `(arr: ZZ32[2], n) = ([1 2], 3)`, `arr = 1 2 n = 3`; and a mismatch in a tuple expression is named as on the base, 'Type mismatch binding 6: ZZ32 (type ZZ32) to s (type String)' for `(u: NN32, s: String) = (5, 6)`.

**Walk's whole suite**, once after the fix, on the code of `675932404d` with the new walk tests in the folder: `ant testSystem` (started 11:49:05), 'BUILD SUCCESSFUL', 'Total time: 4 minutes 54 seconds'; shards 'Tests run: 217', '224', '221', '221', each 'Failures: 0, Errors: 0', 883 in all (the worker's 881 and the two new walk tests). `f39d01a66a` after it adds only tests outside walk's suite and prose.

## Contested

The fix's first half, a tuple expression bound element by element with no temporary, departs from fork W2's letter, "Each name of a top-level tuple binding reads its element from the temporary, so the right side runs once" (`explorations/coordinator/CLIMB-BATCH-35.md:448`), for that one shape. The worker's account (REPORT.md, "Decisions", 3 and 4) builds every form on the temporary. The skeptic's argument: what the fix makes the code do is settled (each numeral converted at its name's declared type, `literals.tex:199-208`, P-173; each right side run once, W2's purpose; an array literal built at its name's type, as the base and the worker's head do); the team's code generator binds a field's tuple expression element by element (`CodeGen.java:5230-5236`); and the temporary at the names' types alone, which keeps W2's letter, refuses `(arr, n): (ZZ32[2], ZZ32) = ([1 2], 3)`, which the base runs. What remains refused after the fix, an array literal in an `if` at a typed tuple binding, is walk's typed tuple conversion, which the base shows for a variable (row 1105).

## Other programs, the differential

All at `FORTRESS_THREADS=1`; the tuple-binding programs (a mutable variable, fields) also at 4, with the same output.

- Subscripts (`SkSub`, rung's build): `m[(3,7)]^2 = 1075369`, `m[1,2,3]^2 = 104101209 paren 104101209`, `m[i+1, 7]^2 = 1075369`, `m[cnt(3), cnt(7)]^2 = 1075369` and `hits = 2` (each index evaluated once), `y: ZZ32 = x[2]^3` gives 27, `x[3]!` equals `(x[3])!` for the program's own postfix `opr (n: ZZ32)! : ZZ32 = n + 1000`, `a[1,0]^2 = 9` for `a: ZZ32[2,2] = [1 2; 3 4]`, `r[1]^2 = 2.25`. Old code: `m[1,2,3]^2 = 1046529` (silently `m[2,3]^2`), `m[cnt(3), cnt(7)]^2 = 11449` with `hits = 1`, `a[1,0]^2` 'Failed to find any matching overload, args = (0: ZZ32)', `m[(3,7)]^2` '... args = ()'. Compiled (old code; the rung changes no class of the compiled path, and the rung's caches lack the library jars, which the skeptic does not build): `104101209`, `1075369`, `1075369`, `hits` `2`.
- Tuple bindings (`SkTup`, both codes): a forward reference `z = first + 100` before `(first, second) = pairOnce()` gives `z = 101` on both, `second = 10` after (30 on the base), `calls = 1` (3); a field reading the object's parameter, a generic object expression in a generic function (`tot = 22`, base 65), a value object's tuple field (`V(1) SEQV V(1) = true`), `(w1, w2): ZZ64... = (7, 8)`: as the base where the base was right. The worker's `W2Forms` and `W2Var` on the final build print the worker's "after" column; `W2Model` (microGPT's six bindings) prints the same on both codes.
- A local tuple binding (`SkLocal`): `local a b = 1 10 calls = 1`, `local typed u = NN32` on both codes.
- Compiled, a field tuple binding: untyped, refused, 'Must provide type for initializer List(a, b)' (row 837); typed, `(a, b): (ZZ32, ZZ32) = pairOnce()` in an object: 'java.lang.VerifyError: Bad type on operand stack' at `SkFieldC$O.<init>`, '\=Tuple?...FZZ32,...FZZ32?' not assignable to 'FZZ32' (row 1104).

## Homes

- Row 1: home 1, `tests/SubscriptThenSuperscriptWalk.fss` (worker).
- Row 1026, and its field form: home 1, `tests/TopLevelTupleBindingOnceWalk.fss` and `tests/FieldTupleBindingOnceWalk.fss` (worker).
- Finding 1: home 1, `tests/TupleBindingNumeralTypesWalk.fss` (skeptic's fix).
- Row 1104, the compiled field tuple binding over a call: home 2, `compiler_tests/XXXFieldTupleBindingCompiled.test` with `FieldTupleBindingCompiledLink.test`, run through the harness on the old code (the compiled path is the base's): `old-fortress.sh ... junit .../FieldTupleBindingCompiledLink.test .../XXXFieldTupleBindingCompiled.test` with its `Expected failure:` line, 'run ... REACHED', 'java.lang.VerifyError', 'Saw expected failure (Exit code != 0)', 'OK (2 tests)'; with `p = Pair()` and its assertions removed for one run, 'Did not see expected failure', 'Tests run: 2,  Failures: 1'; restored. Row in record.md.
- Row 1105, an array literal in a tuple at a typed binding under walk: home 2, `tests/XXXTypedTupleArrayLiteralWalk.fss`, with its `Expected failure:` line, 'OK Saw expected exception', 'OK (1 test)' on the head, and expected failure on the old code. Row in record.md.

## Ledger and siblings

`ledger.py find` for tuple binding, tuple field, array literal tuple, and Must provide type for initializer: rows 152 (rewritten), 837 (sibling of row 1104), 142 (sibling of row 1105), 1029 and 1031 (fixed, compiled), 920 (a local binding under `asif`, untouched). The subscript has no other walk site; the compiled path is right (F-387).

## Names

`TupleBindingNumeralTypesWalk`, `XXXTypedTupleArrayLiteralWalk`, `XXXFieldTupleBindingCompiled`, and the rung's components each name one file; `M`, `Lane`, `Grid`, `B`, `Pair`, `Summed`, `Holder`, `kind` and `pairOnce` are declared by no library api or `FortressLibrary.fss` at the top level; the fix's Java locals shadow no field of `DesugarerVisitor`.

## Failure modes

The rung turns 'Failed to find any matching overload, args = ()' into the value the specification gives (`juxtameaning.tex:164-168`), and the silent wrong values `11449` and `1046529` into `1075369` and `104101209`. The fix turns 'Type mismatch binding 5 ... to un' into `un = 5` at `NN32`, the specification's answer. One loud failure is new against the worker's head: an array literal in an `if` at a typed tuple binding (row 1105). One message changed: a typed tuple binding whose right side is not a tuple expression and does not convert now names the temporary, 'Type mismatch binding (5,6) ... to *tuple_<span> (type (NN32,String))', at the same span.

## Where the skeptic differs from the worker

Decision 3 and the report's "What changed and why", item 2, build every tuple binding on the temporary: the skeptic's fix binds a tuple expression element by element and declares the temporary at the names' types (Contested, above). REPORT.md's body cites the worker's code state `2da0bd16c4`: in `DesugarerVisitor.java`, its `:870-872` and `:877` are `:895-897` and `:902` on the head. The report's stage tables are none: no stage ran, and none runs after the fix (the gate's tables on the merged tree are the record).
