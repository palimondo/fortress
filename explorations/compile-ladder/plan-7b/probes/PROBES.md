# Batch 7b's probes: what each measured and what it settles

The probes of `explorations/coordinator/CLIMB-BATCH-7.md` sections 1 and 6, run before the second run (batch 7b: rungs S, C, W and L) is briefed. Pavol's rule of 2026-09-22: a fork a probe can settle is probed before the batch is briefed.

All four ran on 2026-09-28 on a private Fortress home archived from `81f0151be`, whose library, interpreter and compiler are the landed first run's (`deadeba01`; `snapshot.txt`). Batches 7R, 7C and N land before 7b, so every count below is on the tree before them. Machine: `nproc` 4, Intel Xeon @ 2.10 GHz, 2100 MHz, JDK 25.0.4, `FORTRESS_THREADS=1`, batch 7R sharing the machine, at most two of these probes' JVMs at once.

## P1: the checker's two new rules on the landed library (`P1.md`)

**Measured.** A Scala shadow of the overloading checker (`P1/shadow.patch`) computes, for every pair the checker accepts:
- the return-type rule three ways: today's; the paper's theorem as the team once coded it; and the judgement's construction, which keeps a parameter quantified unless the domains force its value;
- answer 9's positional rule, with and without its condition on the domains under the positional identification.

These were run over:
- the probe shapes, on the compiled path;
- the compiler's prelude;
- the count stage with `AnyIntegral`'s clause cleared (87, cited from the clause's ways note, which Pavol's option 1 reproduces);
- the distance stage;
- copies carrying the judgement's devices for rung L and the repairs found.

**Result.**
- The judgement's return-type rule and the positional rule:
  - refuse `GenPlainRTR` and the three permuted overrides;
  - keep `GenPlainSub` printing `circle`, `generic`, `circle`;
  - leave the compiler's prelude compiling.
- The paper's theorem as the team coded it refuses the compiler's own `nest` overloads, so it cannot be the rung's rule.
- On the landed library, the return-type rule over every instance newly refuses `NoReductionPair`'s and `SomeReductionPair`'s `cond`. The api and the component give `PossibleReductionPair` different parents, and one api line making them agree clears both.
- The positional rule as answer 9 states it newly refuses nothing. Its three refusals (`Col`'s and `Row`'s `subarray`, `SimpleMappedIndexed`'s `map`) are pairs today's return-type rule already refuses; three component lines clear both.
- With a condition on the domains under the positional identification, it also refuses the value-form array factories `array1`, `array2` and `array3` (5 pairs).
- Counts:
  - Count stage: 87 → 89 with the rules; 87 with the one-line repair.
  - Distance stage: 943 with the rules (the gate's 940, cited); 936 with the repairs; 948 with the domain condition.
  - The judgement's devices for L's `CAP`, array `MIN`/`MAX` and juxtaposition take the count stage from 87 to 64. On the distance stage they need their component halves too.

**Settles, for the second run's record.**
- Rung C's stop list: the two `cond` declarations.
- That C's return-type rule is built the judgement's way.

**Leaves open, as questions.**
- Who makes the one-line `cond` repair, and when. This is section 1's question.
- Whether C's positional rule carries the domain condition. It is needed to refuse the team's `XXXGenericOverload2` shape, which compiles today and dies at run time, and it then refuses the array factories. This is the same question as P4's.

## P4: walk's choice on declared domains (`P4.md`)

**Measured.** A logging shadow of `OverloadedFunction` (`P4/shadow.patch`, `P4/P4Probe.java`). At every overloaded call it computes the choice on declared domains beside today's. At every overload-set pair it computes the load-time verdict on declared domains beside today's. It keeps today's in both cases.

It ran over the 422 interpreter tests, the 62 demos and the two microGPT checks, each compared with probe K's stock passes over the same library.

**Result.**
- The tests' outputs are the same as K's stock passes: 402 same, 3 normalised, 17 K's unstable, 0 changed.
- No call in the corpus chooses a different declaration. The defect's shape changes only in the probe shape itself, `GenPlainSub` with its generic written first. A generic trait's functional methods are instantiated from their self argument and compared as today.
- Two expected-failure tests' overload sets change verdict at load:
  - `XXXGenericOverload2`: refused today, accepted on declared domains. The team's test says it must not load.
  - `XXXGenericOverload3`: one pair's verdict changes, but the set is refused at load either way, so the file's verdict holds.
- The shadow wrote no line in any of the 62 demos. Their 17 differences from K's stock pass are timings, random input and how far a run got before the 120 s cut.
- Both microGPT checks: 40 of 40, every value identical to K's stock pair, no shadow line.

**Settles.** W's expected changed outputs: its new test's alone. The microGPT checks stay unchanged.

**Leaves open.** W's load check meets its own stop on `XXXGenericOverload2` unless walk keeps today's check for two generic declarations or reads them with the positional rule's domain condition. That condition is the same one P1 measured on the compiled checker, so it is one question for C and W together.

## P2: the Meet Rule class, for batch 8 (`P2.md`)

**Measured.** Library devices applied to the api of the cleared copy, in the triage's method, and the count stage over them:
- plain exclusion traits for the five range kinds;
- markers keeping ranges apart from `Condition` and partial ranges apart from `Generator`;
- declarations on the meet (`Maybe`'s `map` and `ivmap`, `Just`'s `SQCAP`, `copy` on `StandardMutableArrayType`);
- `Range`'s `IN` moved down to `PartialRange`;
- the triage's two one-line slips.

**Result.** The class's 48 errors on the count stage fall to 8. `FORWARD_CMP` goes 19 → 0, where the triage's generic `excludes` cleared none. The 8 left:
- `generate` 4: the checker's capture defect (cited from the triage);
- `String`'s own juxtaposition 1: the self-position condition of the specification's meet rule;
- the scalar sequential ranges' `map` 2: they need a type below `SequentialGenerator` and `Indexed`;
- `RangeInternals`' scalar `IN` 1: batch 7R reshapes it.

**Settles.** Batch 8's Meet Rule work is a library rung. No family needs the checker step answer 9 declined, and no question for Pavol comes from P2.

**Leaves open.** The devices' component halves and walk's comparison; the four families above.

## P5: the compiled path under `Any` (`P5.md`)

**Measured.** The compile path's `extends Object` pre-desugaring switched off for static parameters in a one-line shadow (`P5/shadow.patch`). Under it:
- the compiler's prelude compiled in library order;
- the 382 programs of the compiler tests type-checked, against a stock capture on file from a tree whose compiler, compiler library and compiler tests are this one's.

**Result.**
- The prelude compiles.
- Every compiler test keeps its type-check exit code.
- One new error, in an expected-failure test: `String`'s juxtaposition in `CompilerBuiltin` takes an `Object` parameter, which a `T` bounded by `Any` does not meet.

**Settles.** Question 1's answer (a) costs the compiled path's own tests nothing that changes a verdict; one library line is the setting's.

**Leaves open.** Code generation and the runs of the compiled tests under the setting; the ladder.
