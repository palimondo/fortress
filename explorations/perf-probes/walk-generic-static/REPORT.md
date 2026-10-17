<!-- Probe of 2026-10-17: how big a fix to walk's generic-method static-argument gap (ledger entry 21) is, and whether it makes the team's generic distribute (variant L4) safe under walk. The probe worker returned this text when the harness refused it a report file; the coordinating session wrote it here from that text on 2026-10-17. The worktree /home/user/fortress-probe-distribute, branch wip/probe-generic-distribute, holds the fix as commit fd7056abf (not landed) and L4 with the checker shadow, uncommitted. -->

# Walk's generic-method static arguments, with the team's generic distribute: a measurement

## In short

- **The gap is on base.** A generic method's own static argument is not inferred under walk, with or without L4. The suite's expected-failure test for it, `ProjectFortress/tests/XXXMethodStaticArgRungT.fss`, fails on base as expected. The nested reductions the change breaks fail on base only through the same gap.
- **A fix of two Java files exists** (probe commit `fd7056abf`, +46 −9): part A in `DottedMethodApplication.java` and part B in `OverloadedFunction.java`. Part A alone fixes the expected-failure test and the single-maximum case. Part B is needed for the nested sum case.
- **With the fix and L4, the nested cases are right** (sum of sums 11, maximum of maxima 3), the three fused pairs still fuse, all 629 walk system tests pass in four shards, and microGPT's quick pair passes 7 of 7 in both programs.
- **L4 without the fix breaks a gated test.** `ProjectFortress/tests/LibraryOverloadFamilies.fss` fails at line 37, `SumReduction.distribute(ProdReduction)`, with "Failed to find any matching overload". This corrects the record: the entry on the nested reduction says no suite test reaches the case, which is wrong for this test.
- **Not covered by the fix:** an expected type that fixes a static argument, a generic method beside a plain one in an object's own declarations, bool static parameters, and explicit static arguments on an overloaded receiver (ledger entry 744). Two new defects were found on base, below.

## 1. On base, which cases fail under walk

Run with `harness-one.sh`. The three expected-failure tests (`XXXMethodStaticArgRungT`, `XXXExpectedTypeFixRungT`, `XXXDispatchGenericMethodBesidePlain`) each show "Saw expected exception", and the suite is green. A plain-named copy, `MethodStaticArgInference.fss`, is red on base with the unification error.

| Case | Result on base |
|---|---|
| `O.get(Box[\ZZ32\](z))` | fails, unification error |
| generic receiver `Hd[\String\]("s").get(Box[\ZZ32\](z))` | fails, the same error |
| vector `V.first(vector[\ZZ32,3\](7))` | fails |
| plain argument `O.id(z)` | fails, "Symbolic type T is being matched to value 3: ZZ32" |
| generic inherited from a trait, `Mx[\ZZ32\].distribute(Sm[\ZZ32\])` | fails, unification error |
| the same generic beside a plain overload | fails, "Failed to find any matching overload" |
| the plain overload beside it | passes |
| size `Box[\3\](7).idx(Box[\2\](5))` | fails |
| size from a vector | fails |
| mixed widths `HolderR.sameR(z, w)` | fails |
| nested sum of sums over `inits` | passes, `11, 11` |
| nested maximum of maxima over `inits` | passes, `3, 3` |

## 2. The smallest fix

- **Part A** (`DottedMethodApplication.java`, +21 −1). When an object holds a generic method, it holds a symbolic instance at placeholder static arguments. Part A takes the real instance by the function path's own inference, `EvaluatorBase.inferAndInstantiateGenericFunction`, with the evaluation environment. The environment is the one passed, not the trait method's member environment, which is empty.
- **Part B** (`OverloadedFunction.java`, +25 −8). When an overloaded method set chooses an overload, a symbolic instance is treated as its generic method. Two helpers, `genericOf` and `inferenceEnv`, return the same values as before for real generic functions.
- Part A alone is not enough. With L4, the sum of sums still fails with "Failed to find any matching overload" over `SumReduction`'s overloaded `distribute`.

## 3. The nested cases, with the fix and L4

- Part A and L4: maximum of maxima 3, correct; sum of sums fails.
- Parts A and B and L4, with the team's trace lines live: sum of sums `11, 11`, maximum of maxima `3, 3`, both on the naive path. The fused pairs still fuse, each with its one "use efficient" trace line: maximum over sum `6, 6`, minimum over sum `1, 1`, sum over product `10, 10`. The `distributes` checks answer false as before.
- These match the base values in `explorations/perf-probes/generic-distribute/REPORT.md`, section 5.

## 4. Which cases of entry 21 the fix covers

Covered: sizes (`idx` and `len` answer), mixed widths (`sameR` gives `[3:ZZ64,4:ZZ64]`, as walk's function path does), the `Box`, vector and plain argument cases, the trait-inherited generic, the overloaded receiver, library bounds on a trait's generic method, and a bound naming an object's own parameter.

One caveat: a lone `T` taken from a `ZZ32` argument becomes `Int`. That is ledger entry 364, not new.

Not covered, with a rough size of each fix:
1. **An expected type fixes the static argument** (`XXXExpectedTypeFixRungT`). `Fac.mk()` gives `BoxT[\Any\]`, and the run stops with "Type mismatch". The fix carries the declared type into the inference, as walk's reduction hint does. About 4 to 5 files. The function path has the same gap.
2. **A generic method beside a plain one in an object's own declarations** (`XXXDispatchGenericMethodBesidePlain`). Load stops with "Missing type T", because the method's parameter types are evaluated without its own static parameters. About 3 to 4 files.
3. **Bool static parameters.** The method form stops with "InterpreterBug: subtypeCompareTo(BoolArg, BoolArg) is not implemented" before any call returns. The function form fails with "Cannot unify". About 2 to 3 files.
4. **Explicit static arguments on an overloaded receiver** (ledger entry 744). About 1 file.

## 5. Walk tests and microGPT

The union of two greps over `ProjectFortress/tests/*.fss` gives 66 files: dotted calls that write static arguments (44) and indented generic declarations (41).

| Code state | Command | Result |
|---|---|---|
| parts A and B, L4 | `harness-one.sh` on the 66 | 57 pass, 9 expected failures |
| no fix, L4 | the same | 2 failures: the expected one, and `LibraryOverloadFamilies` |
| parts A and B, L4 | the whole system suite, four shards in sequence | 155, 160, 154, 160: 629, all green |
| parts A and B, L4 | microGPT's quick pair in sequence | flat 7 of 7, rc 0; APL 7 of 7, rc 0 |

`LibraryOverloadFamilies` is green on base, red with L4 alone, green with L4 and the fix. Its failing line is `SumReduction[\ZZ32\].distribute(ProdReduction[\ZZ32\])`.

Changed against base: `XXXMethodStaticArgRungT` now passes, so it is promoted. Nothing else changed.

## 6. Defects found, new on base

- **Walk, bool static parameters.** An object method with its own `bool` static parameter stops with the `subtypeCompareTo` error, written or inferred. There is no BoolArg comparison in `nodes_util/NodeComparator.java`. Ledger entry to file. Expected-failure test to write.
- **Walk, a bound from the trait's parameter.** A generic trait's method whose own parameter is bounded by the trait's parameter, `pick[\K extends R\](x: K)` in `trait Tr[\R\]`, stops at the extending object with "Missing type R". Ledger entry to file. Expected-failure test to write. Sibling of a fixed entry about functional methods.

## 7. Notes on the work

- The probe ran under `nice -n 19`, one JVM at a time, each started with at least 6 GB free. No timing was taken, and neither the count stage nor the distance stage was run.
- The worktree's caches were emptied by the probe's builds. The library order is needed before any compiled run or distance stage there.
- Part B re-infers on every overloaded method call, since `OverloadedMethod` has no cache. Not measured.
- The compiled path was not run for the two new defects.

## 8. Part A alone, with L4 (second probe, 2026-10-17)

Part A (`DottedMethodApplication.java`) alone does not make the overloaded-receiver cases work. Part B is needed for any receiver whose generic `distribute` sits in an overloaded method set.

- `ProjectFortress/tests/LibraryOverloadFamilies.fss` fails at line 37, `SumReduction[\ZZ32\].distribute(ProdReduction[\ZZ32\])`, with "Failed to find any matching overload". Line 36 passes.
- The sum of sums fails at `Library/Generator2.fss:73` (`distributes`, `r.distribute(q)`), with the same message.
- `Sm[\ZZ32\].distribute(Sm[\ZZ32\])` fails the same way, and so does `SumReduction.distribute(SumReduction)` called directly.
- The maximum of maxima passes (`3, 3`). The lone inherited generic passes. The three fused pairs pass (6, 1 and 10). `MethodStaticArgInference` passes, so part A covers the expected-failure test.
- The 66 walk test files: 56 pass, the 9 expected failures are as before, and `LibraryOverloadFamilies` is the one failure.
- microGPT's quick pair passes 7 of 7 in both programs.

Run by a probe worker in the same worktree, with the one JVM at a time rule, the library order and the caches rebuilt. Part B was restored afterwards, and the worktree matches commit `fd7056abf` again.
