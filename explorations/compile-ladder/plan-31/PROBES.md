<!-- The probes of climb batch 31's planner, 2026-11-13, for the record `coordinator/CLIMB-BATCH-31.md`: the base build, each wall of the rehearsal reproduced or not under the compiler's prelude, the measure of the code generator's refusals over the one library, the briefing keys and the disk; run in a worktree of the planner's own, `/home/user/fortress-p31`, seeded from the base build `/home/user/fortress-base33` (`84f1c37190`) and removed after. The programs are in `probes/planner/` beside this note. -->

# Climb batch 31: the planner's probes

Machine: nproc 4, OpenJDK 25, `FORTRESS_THREADS=1` unless a line says four; a probe that builds and runs suites and two page writers ran beside these, so no time here is a measurement. Each compiled run is `bin/fortress compile P.fss`, then `bin/fortress run P`, from the folder that holds the program, under the compiler's prelude. Each walk run is `bin/fortress P.fss`. No suite, no stage of the gate and no timing was run.

## 1. The base build

`/home/user/fortress-base33`, a detached worktree at `84f1c37190`, `main`'s head when the planner started. `ant compileAll` ('BUILD SUCCESSFUL', 51 s), the library order of five compiles, one walk run of `tests/BooleanOps.fss`; `EXIT=0`. `bytecode_cache/` holds the five jars. `git status --porcelain` prints only `?? .base-ready`, which holds the commit's hash; the seed script took the tree as clean twice (3 s and 4 s). `git diff --stat 832f7d0d91 84f1c37190 -- ProjectFortress/src Library ProjectFortress/LibraryBuiltin ProjectFortress/astgen build.xml bin` prints nothing: the code is the rehearsal's and probe Y's. `/home/user/fortress-base32` and `/home/user/fortress-probe-y` were left as they were.

## 2. The walls under the prelude

| wall | program | compiled, under the prelude | walk |
|---|---|---|---|
| `label` and `exit` (row 81; W9) | `PLabel.fss`: `find(n) = label found … exit found with i … end found` round a `while` | the compile stops: 'Can't compile Label' (`CodeGen.defaultCase`) | not run |
| `atomic` as an expression (row 875) | `PAtomicExpr.fss`: `Library/OneShotFlag.fss`'s `tryOnce` in a program's object | the compile stops: 'Can't compile AtomicExpr' | not run |
| a top-level tuple binding (row 988) | `probes/model-closure/TupleTopPlain.fss`'s form, `(nEmbd, blockSize) = (16, 4)` | the compile stops: '** bug! Result of typechecking still contains intermediate nodes.' | the plan review's run: 16, 4 |
| one method twice in a class (row 990; W6) | `PDupMethod3.fss`: `trait Tord[\T\] extends { Pord[\T\], Mmx[\T\] }` gives `mx` a body, as `Mmx[\T\]` does | compiles; the run dies: 'ClassFormatError: Duplicate method name "mx?0" with signature "(LPDupMethod3$Z;)LPDupMethod3$Z;" in class file PDupMethod3$Tord⟦Z⟧$DefaultTraitMethods' | 2, -1, true, false |
| the same, narrowed | without `Tord`'s own `mx` (`Z` declares it): runs, 2, -1. With one extended trait only: runs | | |
| the cast at a `comprises` type (row 991; W7) | `PComprisesCast.fss`: `den(self)` in `trait Q comprises { R }`, `den(r: R)` | compiles; the run dies: 'VerifyError: Bad type on operand stack … Q$DefaultTraitMethods.fin … Type Q is not assignable to R' | `true` |
| a method over a tuple index type (row 992; W15) | `PTupleIndex.fss`: `object A2 extends Arr[\ZZ32, (ZZ32, ZZ32)\]` gives `get(t: (ZZ32, ZZ32))` for `get(i: I)` | compiles; the run dies: 'VerifyError … A2.get(FZZ32, FZZ32) … Type A2 is not assignable to FZZ32' | 7 |
| a body inherited through an api's trait (rows 732, 495; W16) | `GenApi.fsi`, `GenApi.fss`, `PGenUse4.fss`: `object Rng extends { Other, Ix[\ZZ32\] }`, `Rng.map[\ZZ32\](…)` | compiles; the run dies: 'AbstractMethodError: Receiver class PGenUse4$Rng does not define or inherit an implementation of the resolved method abstract java.lang.Object map⟦…⟧(long, java.lang.String) of interface GenApi$Ix⟦FZZ32⟧' | 8 |
| the same, the plain method | `Rng.twice()` in the same shape: 'AbstractMethodError … twice()' (row 732's own case) | | |
| the same, the trait first or reached through a trait of the program | `object Rng extends Ix[\ZZ32\]`, and `trait Mid extends Ix[\ZZ32\]`, `object Rng extends Mid`: both run, 7 and 8 | | |
| a numeral beside `Any` and a number type (rows 390, 973) | `PPick3.fss`: `k(5)` for `k(x: Any)` beside `k(x: NN32)` | compiles; the run dies: 'NoSuchMethodError: … PPick3.\=k{…}(fortress.AnyType$Any)' | `any` |
| a numeral beside a value, two declarations by coercion (row 989) | `PNumeralTie.fss`: `mul(1.0, f)`, `f: RR32`, for `mul(a: RR64, b: RR64)` beside a program's `mul(a: Q, b: Q)` | the compile stops: 'Ambiguous coercion in call to function mul: … (RadixPointNumeral[\2,1,10,10\], RR32) only by coercion, none is more specific than every other: (RR64, RR64)->String; (Q, Q)->String.' | `rr64` |
| a mutable field in a transaction (row 319) | `PFieldAtomic.fss`: 40,000 `atomic do n := n + 1 end` on a field from a parallel `for`, four threads | 29,456 and 39,276 in two runs | not run |
| a closure class twice (row 315; W10) | `BIG + [i <- 0#3, j <- 0#3] i j` | runs, 9: not reproduced in this form | |

What the table means for the record:

- **W6, W7, W15 and W16 reproduce under the prelude, each in a program of a few lines.** W15 shows as a `VerifyError` where the rehearsal, with the verifier off, saw an `AbstractMethodError`; the class is the same.
- **W16 is row 732's defect, and the generic method is one case of it.** The object inherits the body from an api's trait that is not first in its `extends` clause. A plain method fails alike. With the trait first, or behind a trait of the program, both run.
- **W10 is not reproduced apart from the library.** Its two closures come from `BIG AND [(a,b) <- self.zip[\E\](other)] a = b` in a trait's method (`Library/FortressLibrary.fss:2227`, `Library/List.fss:128`), which the prelude cannot write: it has no `zip` and no `BIG AND`. Row 315's own two programs compile and run under the prelude at `84f1c37190`, without the failure (the check of the record, `coordinator/climb-batch-31-review.md`, A3). So no program fails first under the prelude, and the record leaves the closure class out, with varargs. The measure of section 3 shows the library's two sites.
- **Varargs does not have a test of its repair under the prelude.** `XXXVarargsCodeGeneration` reproduces the refusal there. But the checker types a varargs parameter `ImmutableArray[\T,ZZ32\]` of the default library (`compiler/Types.java:49`, `:143`), and the prelude declares no such type: a body that reads the parameter is refused, 'The varargs parameter rest is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare' (`XXXVarargsBodyIterates`). So the value that a call passes for the parameter, and every body of the library that reads one (`BIG || failMsg`, `writes(args, "")`), exist only against the one library.
- **The numeral rule has two reproducers under the prelude,** `PPick3` (row 390's numeral case) and `PNumeralTie` (row 989, the shape of the two model lines).

## 3. The measure: the declarations of the fourteen components that the code generator refuses

Two runs of F-34's probe, `compile-ladder/plan-25/probes/codegen.sh`, in the planner's worktree.

On the tree unchanged, 133 s:

    refused declarations 11 | emitted (OK lines) 185 | component failures 0     kinds 6
    FortressLibrary, FortressBuiltin and FlatString are refused whole at row 874 and are not in the table

The rehearsal's way, by `probes/planner/codegen-measure.sh`, which applies `measure-hacks.patch` (the rehearsal's naming tables and converters, its trait-table search) and sets `NN32`'s two getters, builds, and runs the same probe, 159 s:

    refused declarations 24 | emitted (OK lines) 745 | component failures 0
      FortressLibrary 12, List 4, String 4, CovariantCollection 1, OneShotFlag 1, FlatString 1, Stream 1
    kinds 8
      7  Can't compile VarArgs yet  [String 3, FortressLibrary 2, List 1, FlatString 1]
      4  Can't compile Label  [FortressLibrary 3, String 1]
      4  <X> is not in the kind env  [List 2, FortressLibrary 1, CovariantCollection 1]
      4  Error trying to close method scope  [FortressLibrary 4]
      2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
      1  ClassCastException: IntersectionType to NamedType  [FortressLibrary 1]
      1  OptionUnwrapException at edu.rice.cs.plt.tuple.Null.unwrap:58  [Stream 1]
      1  Can't compile AtomicExpr  [OneShotFlag 1]

It is the rehearsal's 24 in 8 kinds. The rehearsal emitted 749: its scratch library held six more declarations, the carrier objects of its hack 4, which this measure does not apply. The script edits and builds the worktree that it is given, so it takes a scratch worktree.

The count sees a declaration at its first wall. It does not see row 990's methods (244 in 27 classes by the rehearsal), row 991's casts or rows 992 and 732: those classes are emitted and fail when they load.

## 4. The briefing keys

Each key of the record's section 1 was checked with `facts-extract.sh --check` on `main` at `840a4056c1`: each matches one place. The keys into the record itself were checked after it was written.

## 5. The disk

`df -P /home/user` at the end of the probes: 17,867,576 KB available, about 17.0 G. The script's floor is 1.5 G a rung and 4 G: 11.5 G for five rungs, 7 G for two.

## Not probed

- `exit` out of a parallel `for` under the prelude: the rung's first test.
- The one library's overload sets in which a numeral's own conversion reaches a more specific declaration than the one that runs today: the equality rung's first step.
- Rows 812, 822, 819 and 540 apart from the library: the measure above is their evidence, and rows 812, 819 and 540 name their own reproducers under the prelude.
