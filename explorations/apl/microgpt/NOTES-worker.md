<!-- Worker notes for deliverable 3 of DESIGN.md (MicroGptApl.fss / .fsi /
     MicroGptAplCheck.fss), written so the departures survive if the worker's
     final message is lost.  Walk interpreter, JDK 25, FORTRESS_THREADS=1,
     source path `.` + ../base + ../../run-c4/src + LibraryBuiltin + Library +
     test_library, run from this directory.  Nothing outside this directory was
     touched; the base needed no change. -->

# MicroGptApl: departures from DESIGN.md's line-by-line table

The component follows the design's table line for line: 16 physical lines of
APL text in `step`, one per Dyalog line L13-L28, and one declaration per
remaining Dyalog line.  Four places differ from the design's own wording.

## 1. `rows` is an imported name, so `aplOfInt`'s locals are `nr nc`

The design leaves `aplOfInt` to the worker.  Written with C4's own spelling of
the two dimensions,

```
aplOfInt[\nat r, nat c\](m: Matrix[\ZZ32,r,c\]): Array[\RR64,(ZZ32,ZZ32)\] = do
    (rows, cols) = m.sizes
```

the run dies before anything else with

```
/home/user/fortress/explorations/apl/microgpt/MicroGptApl.fss:53:6-8:
    Variable rows is already declared.
```

`rows` is FlatArrays' row lift (`FlatArrays.fsi:52-55`), which this component
imports, and a local of an imported name is a redeclaration.  The locals are
`nr nc`.  This is the same class of fact as PROBES.md's "`wrapped` and `at` are
keywords and cannot name declarations": the unusable spellings are the host
keywords PLUS every name the component imports.

## 2. The second hyperparameter line carries six names, not five

The design's L6 row writes `(Eps, Lr0, B1, B2, Epsa)`.  `Nsteps` is read by
L30's schedule (`learningRate`), so the line is C4:18 unchanged in shape --
`(Eps, Lr0, B1, B2, Epsa, Nsteps) = (10.0^(-5), 0.01, 0.85, 0.99, 10.0^(-8),
1000.0)`.  `Nsteps` was already in the base's `AplName`; nothing was added.

## 3. C4's layout functions are not "verbatim": the hyperparameters are RR64

The design's L9 row says "C4:37-44 verbatim".  They cannot be: C4's
`vocabSize` and `nEmbd` are `ZZ32` constants, while here the same
hyperparameters are APL numbers (`RR64`), because the APL text reads them.  So
every use inside the layout functions is `aplInt(Vs)`, `aplInt(Ne)`, and
`loadCorpus` takes `aplInt(Blk)`, `aplInt(Bos)`.  The shape of the four
functions is C4's, line for line.

## 4. The step-1 loss differs from C4's in the last two digits

C4 prints `3.3659669475848504` for step 1; this component prints
`3.3659669475848517`.  The other four losses are C4's digit for digit
(`3.4242727838717717`, `3.177802125458052`, `3.066355684224198`,
`3.2208830897506235`).  The golden is `3.365966947584851`, so the measured
difference is about 7e-16 against a tolerance of 1e-12: the check's loss row
passes.  The step-1 gradient, not the loss, is what steps 2-5 are computed
from, and those five agree, so the difference is in the loss reduction of the
first step only -- the `+/` over `vm×⍟tg⌷⍤0 1⊢Pr` folds in a different order
from C4's `vm DOT log(pick(pr, tg))`.

# What did NOT have to change

- No base change of any kind.  `../base/AplSyntax.fsi` and `AplCore.*` are as
  the previous worker left them; every rule and name the program needs was
  already there.
- The api is `run-c4/src/MicroGptFlat.fsi` with only the component name
  changed, parameter names included, and the check's calls resolve unchanged.
- The check is `run-c4/src/MicroGptFlatCheck.fss` with its import line, its
  header, its weights path and the two names in its own text changed.  The
  goldens path `../../run-c/goldens` is the same string from this directory as
  from `run-c4/src`.
- Every design row marked "as written" is the Dyalog text with the design's
  re-spellings, and every parse the design predicted fired first time: the
  nine-name destructuring, `⊃,/,¨` over the nine-name strand, `N⍴⍳Blk`,
  `A(sm_b⍤1)dH…` over two rank-3 arrays, `u A+.×⍤2⊢Vh` and `h dX2+.×wo` as
  monadic calls of a host adapter, and `loss gr` / `Pn Mn Vn` as tuple results.

# The runs kept under `checks/`

| file | what it is |
|---|---|
| `model_run.out.0` | failed first run: `Variable rows is already declared` (departure 1) |
| `model_run.out` | `MicroGptApl.fss`'s own `run()`: the five losses, 1 m 12 s wall |
| `check_smoke_threads1_stopped_at_35of40.out` | the check at `FORTRESS_THREADS=1`, stopped at the 12-minute mark by the worker's instructions with 35 of 40 checks printed, every one PASS and no FAIL |

The smoke run was stopped, not failed.  The last line it printed is

```
fd batch 4 P[2000] backprop -3.092073363295433E-4 fd -3.092075484545376E-4 (golden fd -3.092075484545376E-4): diff 2.1212499427348055E-10 PASS
```

What is missing is the last four rows of `fd_batch4.txt` and the `fd batch 4
worst` row -- five checks of the forty.  The pace at pool size 1 is the reason:
a batch-1 step is about 9 s and a batch-4 step about 30 s, and the two
finite-difference blocks are 22 batch-1 steps and 22 batch-4 steps, so the
whole check needs about 17 minutes rather than C4's 15.
