# Skeptic: rung K, `rung-inference-walk` (climb batch N, run 1), second judgement

*Gather's note (climb batch N, 2026-09-29): the rows this file numbers provisionally are the ledger's 509 (504, the instance split), 510 (505, the expected type at a generic result), 511 (506, varargs and tuple), 512 (507, the compiled union of three) and 513 (the second skeptic's generic trait coercion with its own static parameter, "the new row"); citations of `CoercionOracle.scala:193-196` are the base's lines, `:217-220` since rung I.*

**Verdict: approved, with three required corrections.** The refusal ground is repaired. `Coercions.reset()` clears the reverse lookup's cache (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:166-168`), and `Init.initializeEverything` calls it (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Init.java:17`, `:44`), which every program run goes through (`ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:80`). I re-measured the heap, including the whole interpreter suite in one JVM, and the repaired build's heap tracks the base's. The repair round's other work does what it says.

The three corrections are record text and one owed test, not code:
1. **Home 2 for row 389's sibling.** A generic trait's coercion that declares its own static parameter is still refused under walk, where the compiled run converts and the specification says it converts. Its home-2 test is owed in this run. It is drafted, and it is shown failing as expected and red on a stand-in.
2. **Row 389 closed too broadly.** The record closes row 389 as FIXED without that exception.
3. **A wrong reason for the varargs shape.** Decision K and row 506 say the varargs binding "copies each value into the array unconverted". Measured, it converts, so the repair they place outside rung K's files lies inside them.

## 1. The refusal ground, re-measured

- **The code.** The reset is placed as the judge's steps 2 and 3 say (`JUDGE.md` section 4), with no other change to either file (`git diff f2f3c5e27..HEAD -- ProjectFortress/src`). The built classes carry it: `javap` shows `Coercions.reset()` and the call between `NativeApp.reset` and `Driver.reset`. `initializeEverything` has two other callers, `Init.allowForLeakChecks` (`Init.java:55`) and `OverloadJUTest.java:148`. Clearing there only costs a recomputation.
- **The heap** (`explorations/compile-ladder/rung-inference-walk/probes/skeptic/round2/heap-summary.txt`). I used my first-round `sk-heap.sh` and the repair round's `heap-fifths.py`, both unchanged. The load was 0.07 to 2.1 at each start. Each row is the heap after G1's young collections, in MB:

  | run | repaired build | base |
  |---|---|---|
  | shard 0/4, fifths | 43 99 68 70 82 | 65 88 69 72 69 |
  | shard 2/4, fifths | 69 64 55 69 70 | 78 67 56 73 64 |
  | whole suite (shard 0/1, 430 tests), tenths | 68 75 86 88 88 89 89 105 190 98 | 67 71 78 79 84 87 93 127 196 92 |
  | whole suite, last ten | 85 to 95 | 87 to 96 |

  Before the repair, the rung kept about 0.85 MB per test (70 to 140 MB over 107 tests, `probes/skeptic/heap-summary.txt`), which over 430 tests would be some 365 MB. None of that remains.
- **Decision M.** The judge's instruction was: if the bound fails, "stop there, and report the capture and that the refusal ground stands". The worker's first run broke the bound in one fifth (107 MB), and the worker re-measured instead of stopping. That departs from the instruction's letter, and decision M says so. The measurements bear it out:
  - my own clean run of the repaired build breaks the same fifth (99 MB, at load 0.07);
  - the worker's base run beside its repeats broke it too (106);
  - neither build grows over the whole suite.

  The bound's second-fifth figure catches an early transient that both builds show. It does not measure growth. I do not hold the departure against the rung.

## 2. The repair round's other work, checked

- **Row 388's nine container shapes, home 1.** They are asserted at `ProjectFortress/tests/InferCoercionRungK.fss:59-67`, each message citing row 388 and `conversions-coercions.tex:119-120`. I ran the file through the harness myself: it prints `PASS` (`probes/skeptic/round2/harness-own.txt`). Each value equals the nested tower's (`probes/repair/row388-compare.txt`), and all nine were refused on the base build (`probes/repair/row388-base.txt:9-17`, opened).
- **The varargs expected failure.** `ProjectFortress/tests/XXXInferVarargsRungK.fss` fails on its own assertion at `:20`: "`[3 : ZZ32, 4 : ZZ64] =/= [3 : ZZ64, 4 : ZZ64]`" (`harness-own.txt`, "OK Saw expected exception"). The test stands. Only the reason given for not repairing it is wrong (finding 2).
- **The compiled pair, in row 366's shape** (`ProjectFortress/compiler_tests/XXXUnionOfThreeRungK.fss`, `.test`, `UnionOfThreeRungKLink.test`):
  - The link test is `OK`, and the run test prints `REACHED`, then the `Union$RTTIc.factory(RTTI, RTTI, RTTI)` `NoSuchMethodError`, then "Saw expected failure" (`probes/repair/xxx-union-compiled.txt:2-20`).
  - It goes red on the stand-in once the stand-in is linked first (`:27-52`). Walk prints `PASS` (`:21-26`).
  - Decision L is sound: written by juxtaposition, the stand-in fails its own assertion on row 76's spaces (`probes/repair/xxx-union-juxtaposition.txt:52-53`), so `||` is the form that can turn red.
  - The two `.test` files have the precedent's lines.
- **The provenance block** in `reportText`: I opened every line. For `problem`:
  - `probes/tests-base.txt:3-4` is `scaleK`'s unification error;
  - `:27-29` is `gf`'s refusal at `:25`, with its "Cannot unify NarrowOf" on the next line, `:30`;
  - `:40-41` is row 389's;
  - `CoercionGenericFnRungC.fss:25`, `CoercionGenericTraitRungC.fss:25` and `InferCoercionRungK.fss:38` are the calls.

  For `spec`:
  - `conversions-coercions.tex:119-120` names arguments to functionals with declared parameter types;
  - `:430-432` defines applicable with coercion;
  - `:472-476` and `:533-553` are resolution and the rewritten call;
  - `:598-601` says coercion is resolved statically;
  - `overloading.tex:170-174` says static parameters are inferred before applicability;
  - `basic-integers.tex:90-94` is the callout;
  - `inference.tex:15` is the note.

  For `precedent`: `shadow.patch:16-396`, `:407-543` and `:555-728` are its three hunks, and `OverloadedFunction.java:838-852`, `CoercionOracle.scala:193-196` and `FTypeGeneric.java:52-54` say what the block says. For `deviation`: `EvaluatorBase.java:57-62` and `:254-304`, `OverloadedFunction.java:858`, `:869`, `:879-929`, `Coercions.java:73`, `:163-168` and `Init.java:44` hold what it says. For `historical`: it names the three 2012 files the diff edits.
- **The competing-declaration grep** for the repair's names (`varK`, `triK`, `kindK`, `KindK`, `OneK`, `TwoK`, `ThreeK` and the three file names), over `ProjectFortress/tests/`, `compiler_tests/`, `library_tests/`, `test_library/`, both libraries and `ProjectFortress/src/com/sun/fortress/`: each name occurs only in the rung's own files.
- **record.md.** The FACTS entry adds the reset, the reach to a user coercion, the constructor, the container values and the varargs and tuple shapes, and each clause is true as written. Rows 504 to 507 cite captures that exist and are tracked. The row 388 note names each shape with its line. The exceptions are the two corrections below.
- **The tracked-path check** over `record.md` prints nothing. One apparent miss is the glob `XXXInheritedOverload.*.txt` cut at its star; the files exist.

## 3. My differential, second round (`probes/skeptic/round2/`)

The programs are my own, `progs/SkR01.fss` to `SkR09.fss`, each written for a case neither round had run. I ran them three ways, using my first-round `sk-run.sh` unchanged:
- under walk on the base's build (`walk-base.txt`);
- under walk on the repaired build (`walk-edit.txt`);
- on the compiled path, `fortress compile` then `run`, with the stock compiler, since the rung edits nothing of it (`compiled.txt`).

Walk after at four threads is identical line for line (`walk-edit-threads4.txt`, `threads-compare.txt`). The rung's one piece of shared state is the synchronized cache, which the reset clears between runs. `drivers.sh` holds the invocations. The captures' paths were rewritten from `probes/skeptic2/` to `probes/skeptic/round2/` after I moved the directory there. Nothing else in them was changed.

| program, call | walk base | walk after | compiled (stock) | outcome |
|---|---|---|---|---|
| SkR06, `fR(TagROf[\String\]("coerced"))`, `trait WideR[\T\]` declaring `coerce[\S\](x: TagR[\S\])` | refused, unification error (`walk-base.txt:29-34`) | refused, the same (`walk-edit.txt:26-31`) | `fR got coerced` (`compiled.txt:54-58`) | finding 1: the specification settles it for the compiled run |
| SkR05, `varR[\ZZ64\](z, w)`, `T...` with the argument written | `[3:ZZ64,4:ZZ64]` (`walk-base.txt:27`) | the same (`walk-edit.txt:24`) | does not compile, `T._[_]` | finding 2: the varargs binding converts |
| SkR04, `firstR((z, z), (w, w))`, a lone `T` over tuples | `(3:ZZ32,3:ZZ32)` | the same (`walk-edit.txt:19-21`) | refused, "not applicable" (`compiled.txt:31-41`) | finding 3: specification silent, home 3 |
| SkR08, `boundR(z, z)` and `boundR(z, w)`, `T extends ZZ64` | `InterpreterBug`, "Meet(Int, ZZ64) not a singleton" (`walk-base.txt:40-45`) | `[3:ZZ64,3:ZZ64]`, `[3:ZZ64,4:ZZ64]` (`walk-edit.txt:37-41`) | refused, "not applicable" (`compiled.txt:65-78`) | loud to quiet; the value is the decisions' (section 4) |
| SkR03, `appR(dblR, z)`, `T` fixed by `dblR: ZZ64 -> ZZ64` | "Actual type Int out of bounds for variable T" (`walk-base.txt:15-21`) | `6:ZZ64` (`walk-edit.txt:15-18`) | refused, "not applicable" (`compiled.txt:20-30`) | loud to quiet; the value is the decisions'; the compiled half is rung I's |
| SkR07, `sameR(3, w)`, `sameR(3, r)`, `sameR(3, 4)` | `[3:ZZ32,4:ZZ64]`, `[3:ZZ32,2.5:RR64]`, `[3:ZZ32,4:ZZ32]` | `[3:ZZ64,4:ZZ64]`, `[3.0:RR64,2.5:RR64]`, `[3:ZZ32,4:ZZ32]` (`walk-edit.txt:32-36`) | `[other,4:ZZ64]`, `[other,2.5:RR64]`, `[other,other]` (`compiled.txt:59-64`) | walk per answer 8 ("integer literals coerce into `RR64`"); the compiled numeral is rungs I's and Q's |
| SkR02, `HolderR.sameR(z, w)`, a dotted generic method | `InterpreterBug`, "Symbolic type T ... is being matched to value 3: ZZ32" | the same (`walk-edit.txt:10-14`) | `[3:ZZ32,4:ZZ64]` (`compiled.txt:15-19`) | row 21, not this rung's (the batch record, rung K, "The decisions"); recommended note |
| SkR01, `hR(b, z)`, `hR[\T\](BoxR[\T\], T)` beside `hR(BoxR[\RR64\], RR64)` | refused at load, "at least one pair of parameters must have excluding types" | the same (`walk-edit.txt:3-9`) | refused, both declarations "not applicable" (`compiled.txt:3-14`) | I looked for a generic instance and a plain declaration with equal domains meeting in the coercion pass (`Coercions.moreSpecific` is false on equal domains, `Coercions.java:329-338`); walk's load check refuses every such set before any call, so the case cannot arise until batch 7b's rung W |
| SkR09, `gQ(NarrowQOf[\ZZ64\](2))` and `gQ(NarrowQOf[\ZZ32\](3))` into `WideQ[\ZZ64\]` | refused, refused | `gQ got 2`, refused (`walk-edit.txt:42-48`) | the program refused for the second call (`compiled.txt:79-89`) | row 389 fixed at another width; coercion does not chain, and both paths agree |

**Loud to quiet.** Two failures became values: SkR08's `InterpreterBug` and SkR03's bounds error. Decision 1 of the conversion judgement says a generic declaration fits when some instance within its bound fits, and the chosen declaration is instantiated by answer 8's promotion (POSITIONS 2026-09-28, the two decisions of the conversion judgement). Answer 8's promotion is "the narrowest type every number argument converts into" (POSITIONS 2026-09-27, the numerics plans, decision 3; answer 8 of 2026-09-26: "the narrowest type both sides coerce into"). That gives `T = ZZ64` for `boundR(z, z)`: `ZZ32` fails the bound, and `ZZ64` is the narrowest admitted type. It gives `ZZ64` for `appR(dblR, z)`, where the arrow fixes `T` and the lone `z` converts at binding. So each value is the decisions' answer. The stock compiled checker refuses both, and those are rung I's half. No failure became quiet in the repair round itself: the reset changes no output (`probes/repair/walk-repair-diff.txt`, the first round's 26 programs before and after the reset).

## 4. Findings

1. **Row 389's sibling shape stays refused under walk, and the record closes the row whole.**
   - **The defect.** A generic trait's coercion that declares its own static parameter is not applied. The specification says: "Coercions may have static parameters (described in \chapref{trait-parameters}) and a \KWD{where} clause ..., just like functionals" (`Specification/basic/conversions-coercions.tex:209-211`, read at `:196-240`). Its example is exactly this shape, `trait Vector[\T\]` with `coerce[\S extends Number\](x: Vector[\S\])` (`:229-239`). An argument to a functional with a declared parameter type is a coercion context (`:119-120`).
   - **The measurement.** SkR06 is refused under walk before and after rung K. The compiled run converts it (section 3).
   - **The cause.** The lifted coercion's static parameters are the trait's followed by the coercion's own (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionLifter.scala:151-153`). `Coercions.genericCoercionFor` skips any lifted coercion whose static parameters outnumber the target's (`Coercions.java:117`). So `coercionFor` falls back to today's inference from the value alone, which fails as row 389 described.
   - **What the record says.** The promoted test's own message cites that example, `conversions-coercions.tex:193-195, :229-239` (`ProjectFortress/tests/CoercionGenericTraitRungC.fss:25`), while the test exercises only a coercion with no static parameter of its own. record.md closes row 389 as FIXED, and its FACTS lines say without exception that a generic trait's coercion converts. No library declaration, test or compiler test has such a coercion (a grep for `coerce[\` over `Library/`, `ProjectFortress/LibraryBuiltin/` and the three corpora finds none).
   - **Its home.** The specification settles it and the rung does not repair it, so it is home 2, owed in this run. I drafted the test, `explorations/compile-ladder/rung-inference-walk/probes/skeptic/round2/draft/XXXCoercionOwnStaticRungK.fss`, in the shape of `CoercionGenericTraitRungC.fss`, and checked it three ways:
     - through the harness it is "OK Saw expected exception" at `:25:12-41`, its assertion's call (`harness-own.txt`);
     - a stand-in whose one change writes the conversion by hand is "Missing expected failure" (`harness-standin.txt`);
     - on the compiled path it prints `PASS` (`draft-compiled.txt`).

     Its names occur nowhere else in the corpora, the libraries or the source. I do not add it to `ProjectFortress/tests/` myself, since the role forbids touching the worker's changes. Required correction 1 adds it.
2. **The reason given for leaving the varargs shape unrepaired is measured wrong.** Decision K, section 9 of `reportText` and row 506's notes say that inferring `T = ZZ64` "is not enough", because "the varargs binding copies each value into the array unconverted (`NonPrimitive.java:224-251`, `:247`)", so "a `ZZ32` value would sit in a `ZZ64` array". The reading is the judge's (`JUDGE.md` section 2, finding 3), and the repair round adopted it without measuring it.
   - **The binding converts.** `:247` calls `IndexedArrayWrapper.put`, which applies the array's own `init` method (`ProjectFortress/src/com/sun/fortress/interpreter/glue/IndexedArrayWrapper.java:43`, `:67-71`; `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:54`). That method's declared parameter converts at binding, since rung C. So `varR[\ZZ64\](z, w)` prints `[3:ZZ64,4:ZZ64]` under walk, at the base and after (`probes/skeptic/round2/walk-base.txt:27`, `walk-edit.txt:24`).
   - **So the repair is rung K's to make.** It is the first pass's varargs branch alone (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:151-156`), which unifies each element instead of treating `T...` as a lone position. That lies inside rung K's own file.
   - **Why this does not refuse the rung.** The shape keeps a valid home 2 (`XXXInferVarargsRungK.fss`, which a repair would turn red). Leaving a repair for later is not wrong, but the row would send the repairer to the wrong file. Required correction 3.
3. **A lone parameter over tuple values stays at the join** (a recommended note; the specification is silent). SkR04's `firstR((z, z), (w, w))` returns `(3:ZZ32,3:ZZ32)` under walk before and after. The stock compiled checker refuses the call. Walk converts a tuple element by element at a typed binding (FACTS, "Under `walk`, the interpreter converts by coercion at its three kinds of type check"). But the rule's candidates never hold `(ZZ64, ZZ64)`, because the reverse lookup reads only trait and object types (`Coercions.java:199-219`). Answer 8 speaks of numbers over mixed widths, and the chapter is a note (`Specification/basic/inference.tex:15`), so this is home 3: a note on row 506 with the capture (recommendedRows 2).
4. **Row 21 is untouched, as the record says it should be.** A dotted generic method's own static arguments still stop walk with an `InterpreterBug` (SkR02). A note on row 21 records it for rung I's comparison (recommendedRows 3).
5. **The count.** `probes/repair/checker-count-repair.txt` has `#total 75` and every row equal to `explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt`'s (compared with `diff`). The report, record.md and the structured result declare 75. The manifest's expectedCheckerCount, 75, is the prediction. `git log d9c62446e..bce66f1fa -- Library/ ProjectFortress/` prints nothing, so the landed table still stands for the base.

## 5. Required corrections (for the commit stage)

1. Add `ProjectFortress/tests/XXXCoercionOwnStaticRungK.fss`, a verbatim copy of `explorations/compile-ladder/rung-inference-walk/probes/skeptic/round2/draft/XXXCoercionOwnStaticRungK.fss`. It is the home-2 test of finding 1. In record.md's `testSystem` line, rung K then adds five files, and run 1's `testSystem` sum is the comparand's plus six with M's test.
2. In record.md, scope row 389's closure and open the sibling row:
   - **Row 389's closing note** says what is fixed, a generic trait's coercion whose static parameters are the trait's own. It says that a coercion declaring its own static parameters (`Specification/basic/conversions-coercions.tex:209-211`, the example at `:229-239`) is still refused under walk. And it names the new row of recommendedRows 1, gated by `XXXCoercionOwnStaticRungK.fss`.
   - **The FACTS lines.** The new entry's clause "a generic trait's coercion is instantiated with the target's own static arguments (`Coercions.coercionFor`, row 389)" gets the same exception. So does the sentence appended to "Under `walk`, the interpreter converts by coercion at its three kinds of type check", whose "a generic trait's coercion (389) convert" should read as the fixed shape only.
   - **The handover state line** names the new row.
3. In record.md's row 506 notes, and in `reportText`'s decision K and section 9, replace the claim that the varargs binding copies values unconverted with the measured fact:
   - the binding stores each element through the array's `init` method, whose declared parameter converts (`ProjectFortress/src/com/sun/fortress/interpreter/glue/IndexedArrayWrapper.java:43`, `:67-71`);
   - so `varR[\ZZ64\](z, w)` prints `[3:ZZ64,4:ZZ64]` under walk (`compile-ladder/rung-inference-walk/probes/skeptic/round2/walk-edit.txt:24`);
   - the repair is the first pass's varargs branch alone (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:151-156`), inside rung K's file, and was left for later by the judge's ruling.

## 6. The three homes, as the rung stands with the corrections

- **Home 1, repaired and asserted.** Each passes in my harness run (`harness-own.txt`):
  - the static cache, the refusal ground: its check is the heap, `probes/skeptic/round2/heap-summary.txt` with `probes/repair/heap-summary.txt`, since no `.fss` assertion can hold a heap trend;
  - row 388's walk half and its nine container shapes (`InferCoercionRungK.fss:37-39`, `:48`, `:59-67`, `CoercionGenericFnRungC.fss:25`);
  - row 389 as measured (`CoercionGenericTraitRungC.fss:25`);
  - answer 8's shapes (`InferCoercionRungK.fss:40-50`).
- **Home 2, `XXX` files failing where their messages say** (`harness-own.txt`):
  - row 486 (`XXXNatValueNN32RungK.fss:26`);
  - row 505 (`XXXInferExpectedTypeRungK.fss:23`);
  - row 506's varargs shape (`XXXInferVarargsRungK.fss:20`);
  - row 507 (`compiler_tests/XXXUnionOfThreeRungK.fss:22` with its two `.test` files);
  - finding 1, `XXXCoercionOwnStaticRungK.fss`, by required correction 1.
- **Home 3:**
  - row 504, the instance split, with the user coercion's reach;
  - row 506's tuple parameter;
  - finding 3, a note on row 506;
  - row 432, a note.

## 7. Stops

One, as the worker and the first judgement listed it: the edit to `bestMatchInternal` (`OverloadedFunction.java:879`, `:898`, `:916`, `:920-927`). It is reported whole, and I read it as the re-instantiation the record permits. It is lifted by POSITIONS 2026-09-27, the stops a batch record reserves.

The repair round meets no reserved stop:
- no walk output changes: the first round's 26 programs print the same before and after the reset (`probes/repair/walk-repair-diff.txt`);
- no overload set changes its load-time verdict (`probes/repair/load-verdicts.txt`);
- nothing under `interpreter/glue/prim/`, `FIntLiteral.java`, the library, the checker or the specification is edited;
- `Init.java` and the new `compiler_tests/` files belong to no other rung of the run.

## 8. For Pavol

The reach of answer 8's promotion to a user coercion under walk stays open, as the worker lists it. `userS(AaaOf(1), CccOf(2))` runs at `T = Aaa`, with the `CccOf` converted, where the stock compiled run converts nothing (`probes/skeptic/walk-edit.txt:56-57`, `probes/skeptic/compiled.txt:117-119`). Nothing in this round settles it.

## 9. The machine

`nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4, `FORTRESS_THREADS=1` unless marked 4. The load at each run's start is on its machine line: 0.07 to 3.97, with another rung of the batch on the same cores.

---

# Skeptic: rung K, `rung-inference-walk` (climb batch N, run 1), first judgement

**Verdict: refused.** The one thing that must change: the static cache the rung adds, `Coercions.coercionTypesByEnv` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:163-187`), keeps every run's environments reachable for the life of the JVM, so one testSystem shard's live heap grows from test to test where the base's stays flat (finding 1). It must not outlive a run, as every other static cache of interpreter objects does not. The repair round also closes the required corrections below; two of them are homes owed for defects I measured (findings 2 and 3), and the rule is that such an assertion exists before an approval.

The rest of the claim holds: the recorded failure exists and predates the edit, the provenance block checks line by line, the edit does what the report says in the three places the decisions name, the five tests pass or fail as the harness expects, and my own programs agree with the decisions wherever the decisions speak.

## 1. What I checked, and what held

- **The briefing** (`explorations/coordinator/tools/facts-extract.sh`, both parts) and the rung's section of `explorations/coordinator/CLIMB-BATCH-N.md` (`:172-225`), read whole.
- **The recorded failure.** `explorations/compile-ladder/rung-inference-walk/probes/tests-base.txt` was captured at 2026-09-28T23:03:09Z on the base build (`tree bce66f1fa`, no source edits), committed in `0dc881cb9` before the edit's commit `a686b4504`. It shows each test failing for its own reason: `InferCoercionRungK` at `scaleK(b, z)` (`:3-4`), `XXXNatValueNN32RungK` at its `NN32` binding (`:14-15`), the two promoted tests at their `:25` (`:27-29`, `:40-41`).
- **The provenance block**, every line opened. problem: `CoercionGenericFnRungC.fss:25` and `CoercionGenericTraitRungC.fss:25` are the rows' calls, and `tests-base.txt:27-29`, `:40-41` and `shapes-base.txt:5-47` say what the block says. spec: `conversions-coercions.tex:119-120` (arguments to functionals whose parameters have declared types), `:424-425` (coercion does not chain), `:430-432` (applicable with coercion), `:472-476`, `:533-553` (resolution and the rewrite), `:363-365` (type parameters have no coercions), `:598-601` (resolved statically), `overloading.tex:173-175`, `inference.tex:15` (the note), `basic-integers.tex:90-94` (the callout naming the promotion), `var-ref.tex:38-40`, `trait-parameters.tex:83-86`. All are prose chapters, none an api rendering. precedent: `shadow.patch:113-387`, `:490-536`, `:598-650`, `:651-723` bound the shadow's inference, coercion pass, generic target and reverse lookup; `OverloadedFunction.java:838-852` is rung C's per-argument shape; `CoercionOracle.scala:193-196` says "the lifted args are given in U". deviation: `OverloadedFunction.java:879-929`, `:808-810`, `:858`, `:869`, `Coercions.java:73` and `EvaluatorBase.java:75-87` are what the block says. historical: `EvaluatorBase.java` and `OverloadedFunction.java` are the two files of the 2012 tree the diff edits (`Coercions.java` is rung C's, `b628871a2`).
- **The diff** (`git diff bce66f1fa...HEAD`: three Java files, 451 lines added and 12 removed): the two-pass inference with its fallback to today's unification (`EvaluatorBase.java:57-313`), the coercion pass keeping generics (`OverloadedFunction.java:823-870`), the re-instantiation after `bestMatchInternal`'s unchanged choice (`:879-929`), and the generic target's coercion instantiated with the target's arguments (`Coercions.java:58-130`). Its hunks in `OverloadedFunction.java` start at `:787`, so the load-time check (`:416-425`, `:519-527`) is untouched. Nothing under `interpreter/glue/prim/`, `FIntLiteral.java`, the library, the checker or the specification is edited.
- **The tests, run by me through the harness** (`explorations/compile-ladder/rung-inference-walk/probes/skeptic/harness5.txt`, the rung's `harness-one.sh` at the systemShard settings): `OK (5 tests)`. `InferCoercionRungK`, `CoercionGenericFnRungC` and `CoercionGenericTraitRungC` print `PASS`. `XXXNatValueNN32RungK` and `XXXInferExpectedTypeRungK` are "OK Saw expected exception", each failing at the line its message names: `:19`, row 486's binding, which the assertion at `:26` cites, and `:22`. The worker did not run `XXXInferExpectedTypeRungK` through the harness. Each test file carries one comment line.
- **The first XXX file shown red** on a stand-in: `probes/xxx-harness.txt` ("Missing expected failure" on `u: NN32 = unsigned(n)`). Good.
- **The comparison's captures** (`probes/passes/tests-compare.txt`, `demos-compare.txt`, `mg-compare.txt`): three changed outputs, each a call whose inference changed as the decisions give; 17 run-to-run; row 430's order; the microGPT values identical, 40 of 40 twice. The compiled lines of `probes/instance-split.txt` match `explorations/reviews/option-2-soundness/summary.txt:173-181`, `:414-421`.
- **The count table.** `probes/checker-count-postedit.txt` `#total 75`; the report, record.md and the structured result declare 75; the manifest's expectedCheckerCount is 75, as its prediction. Its rows equal `explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt` row for row, and `git log d9c62446e..bce66f1fa -- Library/ ProjectFortress/` prints nothing.
- **The competing-declaration grep.** Every name the rung adds (the Java methods `inferWithCoercion`, `inferWithCoercionOrFail`, `inferByUnification`, `mentions`, `narrowest`, `genericCoercionFor`, `admits`, `convertsInto`, `coercionTypes`, `coercionTargets`, and the tests' Fortress names) occurs only in the rung's files, across `ProjectFortress/src/com/sun/fortress/`, `tests/`, `compiler_tests/`, `library_tests/`, `test_library/` and both libraries.
- **Time.** The worker's per-test sums (edit 3,174 s against base B 1,716 s) were load. `QuickCheckTest`, the test whose time grew most there (55 s to 122 s), timed alternately at load 1.1: base 53.5 s and 63.2 s, after 62.7 s and 58.9 s (`probes/skeptic/warm-quickcheck.txt`), so no cost is measurable.

## 2. Findings

1. **The rung's static cache keeps every run's environments reachable** (the refusal). `coercionTypesByEnv` is a static `IdentityHashMap` keyed by `Environment` that nothing clears (`Coercions.java:163-187`). `coercionTargets` fills it for the library's top-level environment, the called function's component and the value's type's component (`:195-215`). The library environment is new on every run: `Driver.evalComponent` calls `Init.initializeEverything` (`ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:80`), which runs `Driver.reset()` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Init.java:26-43`). The testSystem harness runs about 107 programs in one JVM per shard (`build.xml:1171-1199`). So the map holds every one of them. Measured over shard 0/4 of the base's `ProjectFortress/tests/`, 107 tests at the shard's `-Xmx768m`, as the heap after each young collection averaged over fifths of the run (`probes/skeptic/heap-summary.txt`): base 64, 92, 72, 71, 63 MB; the rung 70, 88, 101, 120, 140 MB, its last ten 122 to 161 MB; the rung's build with one scratch `Coercions.class` that clears the map whenever the library environment changes (`probes/skeptic/overlay-Coercions.diff`, nothing else changed) 66, 84, 77, 78, 76 MB. About 0.85 MB per test is kept. That does not fail today's gate at 768 MB, but it grows with the suite, and it breaks the team's rule for exactly this: every static cache of interpreter objects has a `reset()` that `Init.initializeEverything` calls. Four such caches: `FTypeGeneric`'s pending list (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeGeneric.java:52-54`), `GenericFunctionOrMethod`'s partition table (`evaluator/values/GenericFunctionOrMethod.java:70-72`), and `NativeApp`'s cache and `NativeConstructor`'s list (`interpreter/glue/NativeApp.java:221-224`, `evaluator/values/NativeConstructor.java:34-39`). The purpose is written beside the reset's other caller: "to catch leaks in a seres of running tests" (`Init.java:51-52`). The rung's map is the one static cache of interpreter objects with no reset. A `WeakHashMap` is not a reliable repair: its values are types found in the key environment, and their `getWithin()` leads back to it, so the entries may never be released. I did not measure that. The repair: in `Coercions.java`, either no cache or one cleared when `Driver.getFortressLibrary()` changes, as the overlay measured; or a `reset()` called from `Init.initializeEverything`, a file outside the rung's list and so reported if taken.
2. **Row 388's flat-tower consequence is repaired under walk, with no assertion and no record line.** For an `RR64` vector `a`, an `RR64` matrix `m` and a `ZZ32` `i`, `(a + i)[1]`, `(i MAX a)[0]` and `(m i)[0,0]` are refused at the base, "Failed to find any matching overload" (`probes/skeptic/walk-base.txt:98-118`). They answer `3.25`, `3.0` and `4.5 : RR64` after (`probes/skeptic/walk-edit.txt:80-88`): the library's container operators, whose scalar is a type parameter that the container fixes, now convert it. These are the shapes row 388's notes list as refused on the flat tower (`explorations/fortress-gap-ledger.md:399`, from `explorations/compile-ladder/rung-flat-tower/probes/row388-flat.txt:9`, `:12`, `:17`), and the values are the nested tower's (`row388-base.txt:9`, `:12`, `:17`). Measured and repaired in this rung, so home 1: an assertion in `InferCoercionRungK.fss`, its message citing row 388, before the second skeptic runs. The row 388 note and the FACTS entry in record.md should say it too.
3. **A varargs parameter over mixed widths is not promoted.** `varS[\T\](xs: T...)` called with `(z, w)` still runs at the join, `100000:ZZ32 200000:ZZ64`, unconverted (`probes/skeptic/walk-edit.txt:62-64`). The first pass unifies every varargs argument as before (`EvaluatorBase.java:151-156`). The batch record's rule is that "a parameter that stands alone takes the narrowest type its arguments convert into" (`explorations/coordinator/CLIMB-BATCH-N.md:1503`, the manifest's intro; rung T's section words it "a type parameter that stands alone as a parameter's type", `:245`), and each argument of `T...` has the type parameter alone as its declared type. The specification's callout says "a generic call over two different integer types is to infer the narrowest type that both coerce into" (`Specification/basic-lib/basic-integers.tex:90-94`). So the rule is built narrower than the decision, and the specification settles the answer. It needs a home: repaired in the first pass with an assertion (home 1), or an `XXX` walk test asserting `ZZ64` for both, with its row (home 2). The same holds, less clearly, for a tuple parameter `tupS[\T\](p: (T, T))` called with `((z, w))`, also at the join after (`:65-67`), which the row should name. The compiled run of the tuple shape is the same, at the join (`probes/skeptic/compiled.txt:137-140`). The varargs program does not compile on the compiled path, "No such method T._[_]" (`:125-136`).
4. **The rule converts a user type through a supertype's coercion, and the report does not say so.** With `trait Aaa` declaring `coerce(x: Ccc)`, `userS[\T\](a: T, b: T)` called with `(AaaOf(1), CccOf(2))` printed `Aaa Ccc` at the base (T the join, nothing converted) and prints `Aaa Aaa` after: `T = Aaa`, the `CccOf` converted (`probes/skeptic/walk-base.txt:74-76`, `walk-edit.txt:56-58`). The compiled run, stock, prints `Aaa Ccc` (`compiled.txt:117-120`). The cause is the candidates of `narrowest`: every supertype of each argument's run-time type (`EvaluatorBase.java:259`). Decision B explains them by walk's implementation classes (`Int` under `ZZ32`), and REPORT.md and the FACTS entry describe their effect on numbers only. The checker's rule as the batch record describes it for rung I takes "the narrowest of its arguments' types and its bound" (`CLIMB-BATCH-N.md`, rung I, "What the tree and the team already do"; `explorations/reviews/inference-rule-shadow.md` section 1). By that description it finds no such type here and keeps the union. The two paths may then run this call at different instances with a different argument converted. Rung T's chapter, as the record specifies it, states the same narrower rule, "a type parameter that stands alone as a parameter's type, fixed by nothing else, taking the narrowest of its arguments' types and its bound", with answer 8's promotion as the number case (`CLIMB-BATCH-N.md:245`). It also says that run-time dispatch applies "the same rule". So the gather's check of T's chapter will meet this call. The difference is row 504's kind, static types against run-time supertypes. With `a: Aaa` and `c: Ccc` declared, the checker's candidates would hold `Aaa`. With the constructors' own types, `AaaOf` and `CccOf`, they do not. Walk cannot tell the two cases apart. I cannot run rung I's build from this worktree. So the report and the FACTS line must state this reach, and the gather must run `probes/skeptic/progs/SkK17.fss` on rung I's build. Whether answer 8's promotion is meant to reach a user coercion into another argument's supertype is Pavol's question (forPavol).
5. **The compiled path dies on a union of three types** (a defect of the stock compiled path, not the rung's; a recommended row). A generic call whose lone parameter's join is a union of three types compiles and dies at run time: `NoSuchMethodError: ... Union$RTTIc.factory(RTTI, RTTI, RTTI)`. This happens for `triS(z, u, w)`, `triS(u, z, r)` and `triQ(Q1, Q2, Q3)` over three sibling objects (`probes/skeptic/compiled.txt:2-6`, `:15-19`, `:156-160`), and walk answers each (`walk-edit.txt:2-4`, `:11-13`, `:77-79`). Rung I's promotion takes the first to `ZZ64`; by the rule's description, the other two still join to three types.
6. **The edit to `bestMatchInternal`** is reported whole (decision C; `probes/stops-met.txt`): a flag, the loop's call renamed to today's inference so that the loop's code is today's, and the re-instantiation after the loop. I read the rename as part of the re-instantiation the record permits, not beyond it. I list the stop as the worker did, since it is reversible and the reading is his.
7. **What the rule does to a constructor.** A generic object's constructor goes through the same rule (`GenericFunctionOrConstructor.java:54`), so `PairS(z, w)` now builds `PairS[\ZZ64\]` with both fields `ZZ64` (`walk-edit.txt:23-25`; base `[ZZ32, ZZ64]`, `walk-base.txt:31-33`). This is the decision's reach; the FACTS entry could name constructors, and it is not a correction.

## 3. My differential (`probes/skeptic/`)

Programs of my own, one call each (`sk-make.py` writes `progs/SkK01.fss` to `SkK26.fss`; `sk-run.sh` runs them). They ran under walk on the base's build (`tmp/home-base`), under walk on the rung's build, and on the compiled path (`fortress compile` then `run`) in this worktree. The compiled path here is the base's compiler, without rung I, after the library-order cache rebuild (`libcompile.txt`). Captures: `walk-base.txt`, `walk-edit.txt`, `compiled.txt`, `opanyzw.txt`, and `walk-edit-threads4.txt`, which is identical to `walk-edit.txt` at `FORTRESS_THREADS=4`. The rung touches no Fortress mutable state. Its one piece of shared state, the synchronized cache of finding 1, is why I also ran the four-thread pass.

| call | walk base | walk after | compiled (stock) | outcome |
|---|---|---|---|---|
| `triS(z, u, w)` | unconverted | `ZZ64` ×3 | dies, three-type union | walk per answer 8; compiled defect, finding 5 |
| `triS(z, z, r)` | unconverted | `RR64` ×3 | unconverted | walk per answer 8; compiled half is rung I's |
| `triS(u, z, r)` | unconverted | unconverted | dies, three-type union | no type all three convert into; finding 5 |
| `firstS(z, w)`, result `T` | `ZZ32` | `ZZ64` | `ZZ32` | walk per answer 8; rung I's half |
| `mulS(z, w)`, `T extends Integral[\T\]` | refused, F-bound | `20000000000:ZZ64` | no `Integral` in the compiler library | loud failure now a value, the right one |
| `biggerS(z, w)`, `StandardTotalOrder[\T\]` | refused | `200000:ZZ64` | refused, "not applicable" | rung I's half |
| `PairS(z, w)`, constructor | `[ZZ32, ZZ64]` | `[ZZ64, ZZ64]` | `[ZZ32, ZZ64]` | finding 7 |
| `fillS(CellS[\RR64\](1.0), z, r)` | refused | `RR64` ×2 | refused | row 388; rung I's half |
| `lastS(z, CellS[\ZZ64\](w))` | refused | `ZZ64` | refused | order of arguments does not matter |
| `sizedS(z, z)`, `n: ZZ64` | refused | `ZZ32`, `ZZ64` | refused | row 388 over numbers |
| `ovS(z, w)` beside `ovS(String, String)` | generic `[ZZ32, ZZ64]` | generic `[ZZ64, ZZ64]` | generic `[ZZ32, ZZ64]` | the conversion rule; rung I's half |
| `ovS(z, z)`, `ovS(z, "s")` | as after | generic at `ZZ32`; refused, today's message | same | controls |
| `OpAnyZW`'s `op(z, w)` | generic `[ZZ32,ZZ64]` | generic `[ZZ64,ZZ64]` | generic `[ ZZ32 , ZZ64 ]` | the conversion rule; rung I's half |
| `takeW(NarrowSOf[\String\]("s"))` | refused | `s` | `s` | row 389 at another argument; agree |
| `takeWZ(NarrowSOf[\ZZ32\](3))` into `WideS[\ZZ64\]` | refused | refused | refused | no coercion applies; agree |
| `userS(AaaOf(1), CccOf(2))` | `Aaa Ccc` | `Aaa Aaa` | `Aaa Ccc` | finding 4 |
| `varS(z, w)`, `T...` | unconverted | unconverted | does not compile | finding 3 |
| `tupS((z, w))`, `(T, T)` | unconverted | unconverted | unconverted | finding 3 |
| `evS(z, u)`, `T extends ZZ32` | refused | refused, the same message | refused | decision D holds |
| `(a + i)[1]`, `(i MAX a)[0]`, `(m i)[0,0]` | refused | `3.25`, `3.0`, `4.5 : RR64` | the compiler library has no `Array` | finding 2 |

Where walk after and the compiled run differ, the compiled side here is the stock checker, and the batch record gives the same rule to rung I. Each such case is therefore the fourth outcome of rule 4: the specification (`basic-integers.tex:90-94`) and the decisions settle it, and the repair on the compiled side is rung I's, in this batch. Findings 4 and 5 are the exceptions, as written above.

**Loud to quiet.** Calls refused at the base now answer, and each answer is the one answer 8 and the conversion rule give: `3.0 : RR64` for `scaleK(b, z)`, `20000000000:ZZ64` for `mulS(z, w)`, `3.25 : RR64` for `a + i`. Where the rule finds no instance, today's message stands (`evS`, `ovS(z, "s")`, the same text before and after). When the re-instantiation fails, the choice made today stands silently (`OverloadedFunction.java:920-927`), and that choice is today's valid instance. No failure that was loud before is quiet after.

## 4. Required corrections (for the repair round)

1. Finding 1: `coercionTypesByEnv` must not outlive a run. Re-measure with `probes/skeptic/sk-heap.sh edit 0/4` and show the heap flat, as the overlay's.
2. Finding 2: an assertion in `ProjectFortress/tests/InferCoercionRungK.fss` for row 388's container shape, for example `(a + i)[1]` as `3.25 : RR64` and `(m i)[0,0]` as `4.5 : RR64` for an `RR64` vector and matrix and a `ZZ32`, its message citing row 388. The note appended to row 388 in record.md must name the shapes this rung makes run under walk.
3. Finding 3: a home for the varargs shape, either the repair with an assertion or an `XXX` walk test asserting `ZZ64` with a ledger row (text in recommendedRows). The tuple shape goes into the same row.
4. Finding 4: decision B in the report and the FACTS entry in record.md must say that the rule converts a user-typed argument through a coercion into another argument's supertype (`probes/skeptic/walk-edit.txt:56-58`). record.md's "For the gather" must ask the gather to run `probes/skeptic/progs/SkK17.fss` on rung I's build.
5. The FACTS entry's "Not reached" list must add varargs and tuple positions (finding 3).

## 5. The three homes, as the rung stands

- Rows 388 (walk half) and 389, answer 8's shapes: home 1, passing, run by me (`harness5.txt`).
- Row 486: home 2, `XXXNatValueNN32RungK.fss`, shown red on a stand-in. The expected type at a generic result: home 2, `XXXInferExpectedTypeRungK.fss`, failing at `:22` as its message says. The decision (POSITIONS 2026-09-27, the numerics plans, decision 3) and `var-ref.tex:38-40` settle it, so home 2 stands.
- The instance split: home 3, `probes/instance-split.txt`, the row the gather opens.
- Row 432 at a structured position: a note on the existing row.
- Row 388's container shapes (finding 2): home 1 owed. The varargs shape (finding 3): home 1 or 2 owed. The three-type union (finding 5): the recommended row, home 3 on `probes/skeptic/compiled.txt`. The user coercion's reach (finding 4): for Pavol and the gather's check against rung I.

## 6. Stops

One, as the worker listed it: the edit to `bestMatchInternal` (`OverloadedFunction.java:879`, `:898`, `:916`, `:920-927`). It is reported whole, and I read it as the re-instantiation the record permits. It is reversible and lifted by POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him. No other reserved stop is met: the comparison accounts for every changed output, no microGPT value moved, the load-time check is untouched, and no forbidden file is edited.

## 7. The machine

Every capture carries its machine line: `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4, `FORTRESS_THREADS=1` unless marked 4, and the load when each run started beside it (from 1.0 to 9.4: another rung of the batch ran on the same cores).
