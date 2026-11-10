<!-- A probe for the plan review of 2026-11-10: the compiled checker over microGPT's own import closure against today's one library, by the distance stage's driver, with three small programs that pin what it met; run in a worktree seeded from the base build /home/user/fortress-base32 (832f7d0d91), nothing tracked edited. -->

# The model's own closure under the compiled checker, against the one library

**What was asked.** PLAN's phase 5 says that microGPT's own files are "measured when the model is first checked against the one library", and gives counts taken on an earlier library (F-58, F-290). This probe takes them on today's tree.

**How.** `model-closure/run.sh` beside this note builds the distance stage's shadows and driver (`explorations/coordinator/tools/distance/`) and runs them over the targets it is given, with the setting `any`, the compile command's own (F-289), and the overloading memo off. Machine: 4 CPUs, Intel Xeon 2.30 GHz, load at start 0.47, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`. Worktree `/home/user/fortress-planrev`, detached at `832f7d0d91`, removed after.

    run.sh check <out> explorations/run-c4/src  <tree>/Library/FortressLibrary.fss <tree>/Library/System.fss \
        <tree>/Library/FileSupport.fss <tree>/Library/File.fss FlatArrays.fss FlatData.fss MicroGptFlat.fss
    run.sh check <out> explorations/apl/mg      <tree>/Library/FortressLibrary.fss FlatArrays2.fss FlatData2.fss \
        AplMg.fss AplMgSyntax.fss MicroGptApl.fss

A count below is of distinct sites: one error at one line and column, counted once however many stages report it. Each is a floor, since the checker stops a block at its first failing statement (row 474).

## 1. The counts

| target | distinct sites | what they are |
|---|---|---|
| `Library/FortressLibrary.fss` and its apis | 0 | as the gate's stage (F-53); 68 s |
| `Library/System.fss` | 0 | as F-321 |
| `Library/FileSupport.fss` | 24 | `No such method FileSupport.ReadStream.eof` and `.ready` with the filter each sits in; two bodies typed against their declared `Char` and `ZZ32`; one `seq` return type; one export error (`Closeable`'s `close`) |
| `Library/File.fss` | 1 | the export check: `FileReadStream` at `File.fsi:19`, "different extends clauses, missing members" |
| C4's `FlatArrays.fss` | 31 | 23 are the index bound, in the seven declarations of lines 25 to 32 ("The static argument I does not satisfy the corresponding bound Index"); 1 is `gather`'s `T extends Number` against `Matrix`'s bound (`:169`); 7 are type errors: an unsized `Array` passed where `row`, `row3` and `plane` take a `Matrix` or an `Array3` (`:131`, `:145`, `:151`, `:157`, `:163`), `sizes` on an unsized array (`:184`), and `Diag`'s `mul` body typed `Array2` against `Matrix` (`:42`) |
| C4's `FlatData.fss` | 3 | an unsized array at `parseRow`'s `Vector` (`:63`, `:97`); the indexed assignment `tokm[d, 1 + j] := …` (`:122`) |
| C4's `MicroGptFlat.fss` | 8 | `DOT` on unsized arrays (`:27`, `:31`, `:34`); `view` and `gather` on unsized arrays (`:45`, `:57` twice); `matShape`'s `if` of pairs typed `((), ())` (`:41`); the numeral product of section 2 (`:82`) |
| the APL program's `FlatArrays2.fss` | 41 | the same kinds: index bounds, element bounds, unsized arrays, `map` and `ivmap` results |
| `AplMg.fss`, `FlatData2.fss`, `MicroGptApl.fss` | 4, 3, 6 | the same kinds; one "Could not determine all parameter types of function expression" |
| `AplMgSyntax.fsi`, the APL grammar's api | a crash | `IllegalArgumentException`, "Parameter 'apiName' to the IdOrOpOrAnonymousName constructor was null" |

So C4's three files hold 42 sites, the APL program's four hold 54 and a crash, and the two library components that only the loaders import hold 25.

Against the record: F-58 gave 26 for C4 on an earlier library. The rise is the index bound (P-156), which PLAN's phase 5 already names (item 61). `File` was 4 and is 1; `FileSupport` is 24, as it was. The numeral powers that row 533 names (`10.0^(-5)`) pass.

## 2. A line of the model that the checker refuses against the one library

`MicroGptFlat.fss:82` is `learningRate(s: ZZ32): RR64 = lr0 (1 - (1.0 s) / nSteps)`. The checker refuses `1.0 s`:

    Ambiguous coercion in call to operator juxtaposition: of the declarations applicable to an argument of type
    (RadixPointNumeral[\2,1,10,10\], ZZ32) only by coercion, none is more specific than every other:
    ((RR64 & {Float}), RR64)->RR64; (QQ, QQ)->QQ.

`model-closure/NumeralLine.fss` pins it in three lines (`1.0 s`, `(1.0 s) / 2` and the model's line), each refused. The two declarations differ at the numeral's place and at the `ZZ32`'s, so the rule for declarations tied only at numerals does not reach it. Walk runs the line at `RR64`. No compiled test meets it today, since the prelude has no `QQ`. It is also the form that the `fortress-repo` skill advises for a float quotient (`references/revival-changes.md`, "`/` on two integers answers a `QQ`").

## 3. The model's hyperparameter lines do not compile under either library

`MicroGptFlat.fss:17-19` bind their names as tuples, `(nEmbd, blockSize, …) = (16, 16, …)`, the form that P-9 keeps for the model. On today's compiled path, under the compiler's prelude:

    $ fortress compile TupleTopPlain.fss        # (nEmbd, blockSize) = (16, 4); run() prints both
    ** bug! Result of typechecking still contains intermediate nodes.
    File TupleTopPlain.fss has 1 error.
    $ fortress compile SingleTop.fss; fortress run SingleTop     # nEmbd = 16; blockSize = 4
    20
    $ fortress TupleTopPlain.fss                # walk
    16
    4

Behind that stop the code generator has no case either: `forVarDeclPrePass` throws "VarDecl … tupled lhs not handled" where the left side has more than one name (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6475-6477`); the tolerant driver met it at the model's three lines. Row 474 holds the checker's typing of such names; no row holds the stop or the code generator's half, and PLAN's phase 5 names neither.

## 4. The checker's time for one program

In a fresh JVM, the checker through the type check, on a one-line program (`run(): () = println "hello"`):

- against the one library, cold caches: 17 s;
- against the one library, a new program on warm caches: 1.1 s;
- against the prelude, `fortress typecheck`, warm caches: 1.3 s.

One run each, at loads of 1.7 to 2.4. So once the library's apis are in the caches, a program's check costs the same under either library. Code generation, the link and the run were not timed: the one library does not emit yet (section 5).

## 5. Code generation, where it stopped

With `run.sh full`, the code generator refuses `FortressLibrary` and `System` whole at the wrappers of the helper classes, row 874's wall, on today's tree:

    java.lang.RuntimeException: Can't generate header for method loopChunk with jvm desc =I stripped = FortressLibrary$ZZ32

So the count of F-34 (38 refused declarations in 10 kinds) cannot be taken on today's tree without putting the helper strings back on glue classes, as its probe did, or doing the names work first. The per-declaration results that the run printed for the model's own files are not counted here: with the library unemitted and the model's declarations unchecked, most of them are consequences.

## Decisions

None taken. The reviewer chose the distance stage's driver over `fortress compile` because the compile command cannot select the one library; the rehearsal beside this probe (`switch-rehearsal.md`) takes the other way.

## Defects

Two rows, each checked with `ledger.py check --rows` (only the `?` number cell fails), for the coordinator to file; the plan review's brief did not allow a write to the ledger.

    | ? | on the compiled path a top-level tuple binding whose names are used, `(nEmbd, blockSize) = (16, 4)` with `println(nEmbd)`, stops the compile, '** bug! Result of typechecking still contains intermediate nodes.'; walk prints 16 and 4 | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/variables.tex`, "Top-Level Variable Declarations" | explorations/compile-ladder/plan-31/probes/model-closure/TupleTopPlain.fss | plan review of 2026-11-10 | siblings: 474, 175. Under the compiler's prelude, `fortress compile` at 832f7d0d91; the single-binding form `nEmbd = 16; blockSize = 4` compiles and runs (`SingleTop.fss` beside it). Behind the stop the code generator has no case: `forVarDeclPrePass` throws 'VarDecl … tupled lhs not handled' where the left side has more than one name (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6475-6477`), seen under the distance stage's tolerant driver at `explorations/run-c4/src/MicroGptFlat.fss:17-19`, C4's hyperparameters, the form that P-9 keeps. Workaround: single bindings, which P-9 does not take for the model. |

    | ? | against the one library the compiled checker refuses a float numeral times a `ZZ32` variable, `1.0 s`, as an ambiguous coercion between `RR64`'s and `QQ`'s juxtaposition; walk runs it at `RR64` | CONTESTED | implementation gap (checker) | `basic/conversions-coercions.tex`, "Coercion Resolution"; `basic/expressions/literals.tex`, "Literals" | explorations/compile-ladder/plan-31/probes/model-closure/NumeralLine.fss | plan review of 2026-11-10 | siblings: 533, 579, 973. At 832f7d0d91: 'Ambiguous coercion in call to operator juxtaposition: of the declarations applicable to an argument of type (RadixPointNumeral[\2,1,10,10\], ZZ32) only by coercion, none is more specific than every other: ((RR64 & {Float}), RR64)->RR64; (QQ, QQ)->QQ.' The two differ at the numeral's place and at the `ZZ32`'s, so the rule for declarations tied only at numerals does not reach it. It is `explorations/run-c4/src/MicroGptFlat.fss:82`, `(1.0 s) / nSteps`, and the form that the `fortress-repo` skill advises for a float quotient. Unsettled: whether the numeral's default breaks this tie (P-173). The prelude has no `QQ`, so no compiled test meets it. |

## For FACTS

- On `832f7d0d91` the compiled checker, by the distance stage's driver, finds 42 distinct sites in C4's three files (`FlatArrays` 31, 23 of them the index bound; `FlatData` 3; `MicroGptFlat` 8), 54 and a crash of the grammar's api in the APL program's, 24 in `FileSupport`, 1 in `File` and 0 in `System`. It means that phase 5's first measure exists; each count is a floor. Shown by `model-closure/run.sh` with the commands above. Detail: section 1.
- A program's check costs about a second under either library once the library's apis are cached, and 17 s against the one library on cold caches. It means that the compiled tests' check time does not grow with the switch-over; their code generation is not measured. Shown by section 4's three runs.
