<!-- Decision D's diff: the sized signatures of C4's vocabulary and every model line they force, written 2026-09-27 for Pavol by an Opus worker on his go of 19:34 UTC (the numerics synthesis's decision 4), on main between 56c6c69e0 and dea30cfcb (no commit in that span touched Library/, ProjectFortress/LibraryBuiltin/, ProjectFortress/src/ or the build), and measured there; the diff is parked until phase 5 of the plan and nothing in explorations/run-c4/src/ is changed. The patch, the probes, the scripts that reproduce every number and the captures are under explorations/reviews/decision-d-diff/ (run.sh <scratch> build copies check <copy> capture <copy> walk). Private caches only, no ant, nothing tracked outside that directory touched. -->

# Decision D's diff: sized array types in C4

## 1. In short

- The diff gives every array the model computes with a sized static type: `Vector[\RR64,s\]`, `Matrix[\RR64,r,c\]` or `Array3[\RR64,0,a,0,b,0,c\]`. It is `decision-d-diff/decision-d.patch`, against `explorations/run-c4/src/`.
- Signatures: 27 sized declarations replace 23 in the vocabulary's api (`FlatArrays.fsi`). `FlatData` changes 3 corpus methods and drops one size. The model's own functions change 9 declarations: 4 vector functions, `view`, the two local helpers `h` and `u`, and the new `stepN` and `adamN`.
- The model: 21 lines out, 29 in. Two of the 29 are a comment naming the sizes. No operator of the model changes; the formula lines only gain the sizes they are computed at.
- The check program and the model's api (`MicroGptFlat.fsi`) are untouched.
- C4's own errors on the compiled checker against the one library, as the program is written: 24 before, 12 after. All 15 errors of decision D are gone as such. Three of those sites still fail, for a different reason: the library's own api (section 5).
- Behind the 12 there is more. The checker stops silently on C4's hyperparameters (section 6), so with those stops removed the count is 15. With the library's dead sizes also deleted (decision E's E3, on a copy of the library) it is 10. None of the 10 is inside the model's arithmetic.
- Under walk the patched C4 runs `MicroGptFlatCheck` to 40 PASS of 40. Every printed value is identical to the committed capture `run-c4/checks/threads1.txt` once the timings are masked (`decision-d-diff/walk-threads1.txt`).
- What is left for microGPT's own gate:
  - the library's dead sizes (decision E);
  - one vector-plus-scalar shape that only the library can give;
  - a checker that can open a size known only at run time (the two bridges);
  - a checker defect that silences top-level tuple bindings (a candidate ledger row);
  - six old small items.

## 2. What decision D is

- A refresher. The library declares its products with sizes that must agree: a matrix times a matrix needs the inner sizes equal (`Library/FortressLibrary.fsi:1680-1684`, `opr DOT[\T, nat n, nat m, nat p\](Matrix[\T,n,m\], Matrix[\T,m,p\])`).
- C4 builds its arrays with the library's run-time factory `array[\E\](n)`, which returns the unsized `Array[\E,ZZ32\]`. At run time every such array is a `Vector` or a `Matrix` object, and walk dispatches on that object, so C4 runs. The compiled checker sees only the unsized type and refuses every sized declaration it meets.
- That was measured today: 15 of C4's 24 own errors (`reviews/numerics-plan-fable.md` § 3.6), predicted by `reviews/array-design-review.md`, decisive finding 1.
- Decision D is sizes in the model's own types (POSITIONS 2026-09-19, the array fork and `nat` taken together; 2026-09-22, the array decisions A, B, D).

## 3. How the sizes enter: the library's own ways

Each device below is one the library already uses. The probes behind each choice are in `decision-d-diff/probes/`: 13 small programs and one api with its component, all run on the checker (`checker.txt`), and 7 of them under walk (`walk.txt`).

- **Sized results, one declaration per rank, sizes shared where two shapes must agree.** This is how the library declares `+`, `-` and the products on `Vector` and `Matrix`, and what the focused APL base's `FlatArrays2` already states (FACTS § The library's arrays and algebra). The row lift is an example: `rows[\nat r, nat c\](f: Vector[\RR64,c\] -> Vector[\RR64,c\], m: Matrix[\RR64,r,c\]): Matrix[\RR64,r,c\]`.
- **Sized results built by the library's sized factories.** These are `vector[\RR64,s\](f)`, `matrix[\RR64,r,c\]()` and `array3[\RR64,a,b,c\]()`. At run time they make the same objects `array[\RR64\](…)` made, since that factory calls them.
- **A size that no argument carries comes as a witness `N[\n\]`.** The witness is the library's NatReflect device (`ProjectFortress/LibraryBuiltin/NatReflect.fsi`). A witness fixes such a size on both paths. The expected type fixes it on the checker only: walk has no static context, and the program dies with `Missing value: s0` (`probes/PMain.fss`, p1 and p2). The vocabulary reads a witness's number with the library's own `N[\n\].toZZ`.
- **A size known only at run time enters through `reflect`.** It goes into a function generic in its sizes, and the public face keeps the unsized `Array`. This is exactly the library's `array[\E\](x) = __arr1(__thrower[\E\], reflect(x))` (`Library/FortressLibrary.fss:2024-2034`) and ledger row 25's "sanctioned escape". Here `step` keeps its signature and calls `stepN` with the seven sizes reflected, and `adam` calls `adamN`. So the check program and `run()` are untouched.
- **Per-shape scalar operators beside the library's scalar extension.** The library's own comment asks for them: its generic `+ - MIN MAX` against a scalar return the unsized `Array`, and "sized arrays under a compiler need per-shape declarations beside these" (`Library/FortressLibrary.fsi:2572-2577`). The vocabulary declares the two the model needs and walk accepts, a vector minus a scalar and a scalar `MAX` a matrix. The third, a vector plus a scalar, is refused by walk (section 6).
- **A generic function passed to the row lift is written with its size, `rows(rmsn[\E\], x)`.** Both paths refuse a generic function as a value (ledger row 156; `probes/PMain.fss`, p3). Written with its size it passes on both (`probes/P3b.fss`).
- **A generic method's size is written out: `corpus.tokens[\R\](b, 0)`.** Walk does not infer a generic method's static argument, even from a witness (ledger row 21; `probes/walk-drafts.txt`, draft 2).

## 4. The model's lines, before and after

The sizes are named once, in a comment on the step:

- E the embedding width, V the vocabulary, T the block, D a head's width, F the MLP's width;
- R the batch's rows (documents × T), P its head planes (documents × heads).

The line numbers are those of today's `MicroGptFlat.fss`.

1. `:14`, a new import: the witnesses `N[\n\]` and `reflect` come from the library's NatReflect.

   ```
   + import NatReflect.{...}
   ```

2. `:27-28`, `:30`, `:34`, the four vector functions. They become generic in their length, because the model applies them at widths E, T and V. Their bodies are unchanged. `x DOT x` needs a `Vector`.

   ```
   - rmsn(x: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = x / SQRT (epsilon + (x DOT x) / |x|)
   + rmsn[\nat s\](x: Vector[\RR64,s\]): Vector[\RR64,s\] = x / SQRT (epsilon + (x DOT x) / |x|)
   - sm(z: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = do e = exp(z - (BIG MAX z)); e / (SUM e) end
   + sm[\nat s\](z: Vector[\RR64,s\]): Vector[\RR64,s\] = do e = exp(z - (BIG MAX z)); e / (SUM e) end
   - rmsn_b(dy: Array[\RR64,ZZ32\], x: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = do
   + rmsn_b[\nat s\](dy: Vector[\RR64,s\], x: Vector[\RR64,s\]): Vector[\RR64,s\] = do
   - sm_b(p: Array[\RR64,ZZ32\], dy: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = p × (dy - (p DOT dy))
   + sm_b[\nat s\](p: Vector[\RR64,s\], dy: Vector[\RR64,s\]): Vector[\RR64,s\] = p × (dy - (p DOT dy))
   ```

3. `:29`, the mask moves from the top level into the step, made by the sized `mat`. Its size is the block T, which is a static parameter of the step. A top-level declaration cannot carry it, and a parameter may not shadow the top-level name (`Specification/basic/declarations.tex:533`). The alternative is to keep the line where it is and let the vocabulary's `+` take the matrix unsized. That keeps both mask lines as they are, but the checker then no longer asserts that the mask's shape is a plane's.

   ```
   - mask: Array[\RR64,(ZZ32,ZZ32)\] = mat(blockSize, blockSize, fn (i: ZZ32, j: ZZ32): RR64 => if j > i then -(10.0^10) else 0.0 end)
   +     mask = mat(N[\T\], N[\T\], fn (i: ZZ32, j: ZZ32): RR64 => if j > i then -(10.0^10) else 0.0 end)
   ```

4. `:45`, the model's view helper takes the matrix's shape as its size. The layout's numbers stay in `matShape`, which gives the offsets.

   ```
   - view(p: Array[\RR64,ZZ32\], i: ZZ32): Array[\RR64,(ZZ32,ZZ32)\] = do (r, c) = matShape(i); view(p, matOffset(i), r, c) end
   + view[\nat r, nat c\](p: Array[\RR64,ZZ32\], i: ZZ32): Matrix[\RR64,r,c\] = view(p, matOffset(i), N[\r\], N[\c\])
   ```

5. `:51`, the step's header becomes the bridge and the sized step. `step` keeps its api signature and reflects the seven sizes from the hyperparameters and the batch. `stepN` holds the body.

   ```
   - step(p: Array[\RR64,ZZ32\], b: Array[\ZZ32,ZZ32\]): (RR64, Array[\RR64,ZZ32\]) = do
   + (* the step's sizes: E the embedding width, V the vocabulary, T the block, D a head's width,
   +    F the MLP's width; R the batch's rows (documents x T) and P its head planes (documents x heads) *)
   + step(p: Array[\RR64,ZZ32\], b: Array[\ZZ32,ZZ32\]): (RR64, Array[\RR64,ZZ32\]) =
   +     stepN(p, b, reflect(nEmbd), reflect(vocabSize), reflect(blockSize), reflect(headDim), reflect(4 nEmbd), reflect(|b| blockSize), reflect(|b| nHead))
   + stepN[\nat E, nat V, nat T, nat D, nat F, nat R, nat P\](p: Array[\RR64,ZZ32\], b: Array[\ZZ32,ZZ32\],
   +         _: N[\E\], _: N[\V\], _: N[\T\], _: N[\D\], _: N[\F\], _: N[\R\], _: N[\P\]): (RR64, Array[\RR64,ZZ32\]) = do
   ```

6. `:52`, the batch's keys are made at R rows.

   ```
   -     ids = corpus.tokens(b, 0); tg = corpus.tokens(b, 1); vm = corpus.valid(b); nv = SUM vm; pos = corpus.positions(b)
   +     ids = corpus.tokens[\R\](b, 0); tg = corpus.tokens[\R\](b, 1); vm = corpus.valid[\R\](b); nv = SUM vm; pos = corpus.positions[\R\](b)
   ```

7. `:53`, the nine views get their shapes. This is `matShape`'s table in sizes: wte V×E, wpe T×E, lm V×E, the four attention matrices E×E, f1 F×E, f2 E×F.

   ```
   -     (wte, wpe, lm, wq, wk, wv, wo, f1, f2) = (view(p, 0), view(p, 1), view(p, 2), view(p, 3), view(p, 4), view(p, 5), view(p, 6), view(p, 7), view(p, 8))
   +     (wte, wpe, lm, wq, wk, wv, wo, f1, f2) = (view[\V,E\](p, 0), view[\T,E\](p, 1), view[\V,E\](p, 2), view[\E,E\](p, 3), view[\E,E\](p, 4), view[\E,E\](p, 5), view[\E,E\](p, 6), view[\F,E\](p, 7), view[\E,F\](p, 8))
   ```

8. `:54-55`, the head split and its inverse get their shapes. `heads` takes the planes' count, the positions and a head's width as witnesses, where it took three numbers before.

   ```
   -     h(m: Array[\RR64,(ZZ32,ZZ32)\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\] = heads(m, blockSize, nHead, headDim)
   -     u(t: Array[\RR64,(ZZ32,ZZ32,ZZ32)\]): Array[\RR64,(ZZ32,ZZ32)\] = unheads(t, nHead)
   +     h(m: Matrix[\RR64,R,E\]): Array3[\RR64,0,P,0,T,0,D\] = heads(m, N[\P\], N[\T\], N[\D\])
   +     u(t: Array3[\RR64,0,P,0,T,0,D\]): Matrix[\RR64,R,E\] = unheads(t, N[\R\], N[\E\])
   ```

9. `:57`, `:59-61`, `:65-66`, `:69`, the row lifts name the width of the rows they lift.

   ```
   -     x = gather(wte, ids) + gather(wpe, pos); xp = rows(rmsn, x); x1 = rows(rmsn, xp)
   +     x = gather(wte, ids) + gather(wpe, pos); xp = rows(rmsn[\E\], x); x1 = rows(rmsn[\E\], xp)
   -     a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim)); hc = u(a vh)
   +     a = rows(sm[\T\], mask + (qh kh^T) / SQRT (1.0 headDim)); hc = u(a vh)
   -     x2 = xp + hc wo^T; x3 = rows(rmsn, x2); m0 = x3 f1^T; mr = 0.0 MAX m0; x4 = x2 + mr f2^T
   +     x2 = xp + hc wo^T; x3 = rows(rmsn[\E\], x2); m0 = x3 f1^T; mr = 0.0 MAX m0; x4 = x2 + mr f2^T
   -     pr = rows(sm, x4 lm^T); loss = -(vm DOT log(pick(pr, tg))) / nv
   +     pr = rows(sm[\V\], x4 lm^T); loss = -(vm DOT log(pick(pr, tg))) / nv
   -     dX2 = dX4 + rows(rmsn_b, dX3, x2); gWO = dX2^T hc; dh = h(dX2 wo)
   +     dX2 = dX4 + rows(rmsn_b[\E\], dX3, x2); gWO = dX2^T hc; dh = h(dX2 wo)
   -     dVh = a^T dh; dS = rows(sm_b, a, dh vh^T) / SQRT (1.0 headDim)
   +     dVh = a^T dh; dS = rows(sm_b[\T\], a, dh vh^T) / SQRT (1.0 headDim)
   -     dXp = dX2 + rows(rmsn_b, dX1, xp); dX = rows(rmsn_b, dXp, x)
   +     dXp = dX2 + rows(rmsn_b[\E\], dX1, xp); dX = rows(rmsn_b[\E\], dXp, x)
   ```

10. `:63`, `:70`, the one-hot matrices take their width as a witness, in the place the number had.

    ```
    -     dL = diag(vm / nv) (pr - onehot(tg, vocabSize)); gLM = dL^T x4; dX4 = dL lm
    +     dL = diag(vm / nv) (pr - onehot(tg, N[\V\])); gLM = dL^T x4; dX4 = dL lm
    -     gWTE = transpose(onehot(ids, vocabSize)) dX; gWPE = transpose(onehot(pos, blockSize)) dX
    +     gWTE = transpose(onehot(ids, N[\V\])) dX; gWPE = transpose(onehot(pos, N[\T\])) dX
    ```

11. `:75-76`, Adam's header becomes the bridge and the sized update. The three update lines are unchanged.

    ```
    -     (Array[\RR64,ZZ32\], Array[\RR64,ZZ32\], Array[\RR64,ZZ32\]) = do
    +     (Array[\RR64,ZZ32\], Array[\RR64,ZZ32\], Array[\RR64,ZZ32\]) = adamN(p, m, v, g, t, lr)
    + adamN[\nat n\](p: Vector[\RR64,n\], m: Vector[\RR64,n\], v: Vector[\RR64,n\], g: Vector[\RR64,n\], t: ZZ32, lr: RR64):
    +     (Vector[\RR64,n\], Vector[\RR64,n\], Vector[\RR64,n\]) = do
    ```

The vocabulary's side, in plain words (the full text is the patch):

- **`FlatArrays`:**
  - the index-generic elementwise operators become one declaration per rank the model uses: `×` on vectors and on matrices, `/` on vectors (by a vector and by a scalar) and on rank-3 arrays by a scalar, `>` on matrices, `SQRT`, `exp` and `log` on vectors;
  - `-` (a vector minus a scalar) and `MAX` (a scalar against a matrix) are added;
  - `mat`, `view`, `heads`, `unheads` and `onehot` take witnesses for the sizes no argument carries;
  - `row`, `row3`, `plane`, `gather` and `pick` return the sized type they build;
  - the rank-3 product, the matrix-plus-planes `+` and the four row lifts state their shared sizes, as `FlatArrays2` does;
  - `Diag`'s own product is built by `mat`;
  - the old private `viewN`, `headsN` and `unheadsN` are gone, because the sized forms are now the public ones.
- **`FlatData`:**
  - the corpus's `tokens`, `positions` and `valid` return a sized vector at the size the call writes;
  - `parseRow` loses its size, which constrained nothing, since the loaders fill arrays whose length is known only at run time (the library's unsized `Array`).
- **What stays unsized, as in the library:** the constructors `vec`, `zeros` and `keys`, the loaders, the flat parameter vector, the batch keys and the gradient `flat` returns, because their lengths are known only at run time.

## 5. The measurement

The instrument is the one `reviews/numerics-plan-fable.md` § 3.6 used: the distance stage's one-JVM driver pointed at C4's four components against the one library, under the switch-over's default setting (the bound `Any`), with the overloading memo off. It runs through `decision-d-diff/run.sh`, each run's captures under `decision-d-diff/measure/`.

The machine was 4 CPUs (Intel Xeon @ 2.10GHz, 2100 MHz), OpenJDK 25.0.4, `FORTRESS_THREADS=1`, with a load at start of 15 to 35 (other workers' batches). The counts do not depend on the load, and no timing here is a comparison.

C4's own errors, as the program is written (`measure/base.own.txt`, `measure/d.own.txt`):

- Before, 24:
  - 15 of decision D:
    - the four row lifts, `plane` and the three `reflect` bridges in `FlatArrays`;
    - `parseRow` twice in `FlatData`;
    - `gather` twice and `DOT` three times in the model;
  - 3 `fail[\T\]`;
  - 6 small: `Character.codePoint`, `Diag`'s product body, the varargs `SUM` in `flat`, the varargs export, `matShape`'s body, and `view` in the model.
- After, 12:
  - all 15 of decision D are gone as such, and so are two of the small ones, `Diag`'s body and `view` (both were sizing too);
  - 3 of the old sites still fail, `x DOT x`, `y DOT dy` and `p DOT dy` in `rmsn`, `rmsn_b` and `sm_b`, now for one reason only: the library's api (the next list);
  - 1 is the `adam` bridge, `adamN(p, m, v, g, t, lr)` with unsized arrays for sized parameters;
  - 1 is new and not a size: `FlatData.fss`'s `numbersOf` calls `parseRow(line, out, 0)` as a statement and throws its count away, which the specification refuses (`Specification/basic/expressions/blocks.tex:50`). `parseRow`'s refusal on the line before had hidden it;
  - the other 7 are the old ones: 3 `fail`, `codePoint`, the varargs `SUM` and export, and `matShape`.
- The library's errors reported through C4's own view objects: 22 before and 22 after (the `fill` diamond 18, `shift` 4, `measure/*.through.txt`). The sizes add none.
- The same three crashes stand before and after: `parseFloat`, `parseRow` and the check program's `run()`. All are "Not in the trait table: FortressBuiltin.Character" (FACTS 42's `Types.CHARACTER`). So the check program's zero errors mean its `run()` is never checked, not that it is clean.

Why three `DOT`s still fail: the library's api declares its `Vector` and `Matrix`-vector products with sizes that appear in no parameter and no result, `opr DOT[\T extends Number, nat n, nat m, nat p\](me: Vector[\T,n\], other: Vector[\T,n\]): T` (`Library/FortressLibrary.fsi:1574-1590`, `:1687-1710`). Since climb batch 4's rung N a size the call cannot fix is an error at the call (POSITIONS 2026-09-21 and answer 12), so every `DOT` of two vectors, and every scalar times a vector, is refused whatever C4 does (every such line of `probes/PMain.fss`). The component already declares the same operators without those sizes (`Library/FortressLibrary.fss:2363-2380`, `:2733-2757`). This is decision E's E3, "the dead sizes' diff (25 api declarations) … with the switch-over's design" (POSITIONS 2026-09-26, answer 12). Seventeen of the 25 are on this path; `decision-d-diff/library-e3.patch` shows them, and that patch was applied only to a copy of the library.

## 6. A checker defect that hides part of the model: the top-level tuple binding

- Measured (`probes/PHyp.fss`, `PLoc.fss`, `PBeta.fss`, `PSilent.fss`, with captures in `probes/checker.txt`):
  - the compiled checker gives each variable of a top-level tuple binding, `(nEmbd, blockSize, …) = (16, 16, …)`, a type it accepts anywhere: `z: String = headDim` passes;
  - any operator applied to such a variable, `1.0 headDim` or `beta1 m`, then ends the check of its block with no error and no crash;
  - a single binding, `a3 = 10.0^(-5)`, is typed `RR64`, and a local tuple binding is typed right.
- C4's hyperparameters are two such lines. That is Pavol's choice of 2026-09-14, the tuple form that a strand assignment expands to, so the model keeps it. The effects:
  - before the diff, `adam`'s body was never checked past its first line (measured: no error there in `measure/base.own.txt`, two at its first line in `measure/base-split.own.txt`; a planted error shows the same stop in the draft's `adamN`, run d1x of `probes/checker.txt`); `learningRate` and `run` apply operators to the same variables and are silent by the same mechanism (read); with the tuples split, both check clean;
  - `matShape`'s "body has type `((), ())`" error, counted as small, is this defect, not the model's;
  - after the diff, `stepN` is checked through its first seven lines and stops silently at `a = rows(sm[\T\], mask + (qh kh^T) / SQRT (1.0 headDim))`, and the `step` bridge's refusal is hidden by `reflect(4 nEmbd)`. These were located by planted errors on the first draft, whose `stepN` body is the same from its second line (the two planted-error runs at the end of `probes/checker.txt`).
- To see what the silence hides, the measurement was repeated on a diagnostic copy that writes the three top-level tuples as single bindings on the same lines (`make-variants.py split`, ledger row 175's form). This is not part of the diff and is not proposed as a model change:
  - before the diff: 24 → 25. `matShape`'s error goes, and `adam`'s first line shows two refusals;
  - after the diff: 12 → 15. The `step` bridge shows, and the forward pass of `stepN` checks clean through `pr = rows(sm[\V\], x4 lm^T)`. The loss line's `vm DOT …` is refused (the dead sizes) and ends the block. `adamN`'s first line shows the dead sizes twice.
- The same split copy against a library copy without the 17 dead sizes (`d-split-e3`) gives 10. The whole of `stepN` checks, and so do `rmsn`, `sm`, `rmsn_b` and `sm_b`. A run with two planted errors, one after `stepN`'s last statement and one inside `rmsn_b`, reports both, so the check reached the end (`measure/d-split-e3-plant.own.txt`). The 10 are:
  - the two bridges: `step` into `stepN`, whose `reflect(…)` arguments are `NatParam`s where `N[\E\]` and the others are wanted, and `adam` into `adamN`, whose arrays are unsized where `Vector[\RR64,n\]` is wanted. Walk takes both, because the run-time objects are those sizes. The checker has no way to open a size known only at run time. The team wrote the missing rule into NatReflect as a comment, `comprises { N[\n\] } where [\ nat n \]`, and wrote "we ought to build it in and document it in the spec" (`ProjectFortress/LibraryBuiltin/NatReflect.fsi`, `NatReflect.fss`). The library's own `array[\E\](x)` has the same refusal (the distance triage's class V2, "phase 5");
  - `adamN`'s last update line: `SQRT (v' / (1 - beta2^t)) + epsilon_A` gets the library's unsized vector-plus-scalar, so the `/` before it finds no sized form. The vocabulary cannot give the sized form: walk refused it beside the library's generic `+`, because once `FlatArrays` declares a second `+` walk checks the two against the library's as one family and cannot see that the sized one is more specific ("at least one pair of parameters must have excluding types", FACTS § The library's arrays and algebra; `probes/walk-drafts.txt`, draft 1). The library's comment asks for exactly this declaration; by reading, walk's family check would refuse it in the library too, beside the library's own generic `+`;
  - the unmasked `numbersOf` statement;
  - the six old small items: 3 `fail`, `codePoint`, and the varargs `SUM` and export.
- So the shape of microGPT's own gate after decision D is: E3 (the library api's 17 lines), the bridge rule in the checker, the vector-plus-scalar shape with walk's family check, the tuple-binding defect, and the dozen small items the Fable plan listed. It is no longer the model's types.

## 7. Under walk

- `MicroGptFlatCheck` from a patched copy laid out as `run-c4/src` is (the goldens and weights reached by two symlinks), private cache, `FORTRESS_THREADS=1`: 40 PASS of 40 in 803 s at a load of 14 to 16. Every line is identical to `run-c4/checks/threads1.txt` once the `(… ms)` and `total … s` figures are masked (`decision-d-diff/walk-threads1.txt`).
- Not run: the four-thread check.
- Walk refused two earlier drafts, and the patch answers both (`probes/walk-drafts.txt`):
  - the sized vector-plus-scalar `+` (section 6);
  - a witness on the corpus's generic methods (ledger row 21).
- Ledger row 83 (CONTESTED) claims that `nat`-generic functions mis-unify on a second instantiation through an exported api, and names as untested "a `nat` static parameter appearing in the API's own signatures". The patched vocabulary is that case: `rows`, `view`, `onehot`, `mat` and the elementwise operators, called through the api at several sizes. It runs clean under walk, which is evidence against the claim.

## 8. The ranges decision and the numeral switch

- **Ranges over `ZZ32` only (POSITIONS 2026-09-27, decision 1).** None of my lines changes.
  - The specification makes a size's value an `NN32` (POSITIONS 2026-09-27, a size's range). `NN32` does not convert into `ZZ32` on the flat tower, so a range bounded by a size, such as `0#n` with `n` a `nat`, would be refused.
  - The patched bodies therefore keep today's bounds from `m.sizes`, which are `ZZ32`, and read witnesses with `toZZ`.
  - Sizes used as values that the patch does not touch remain C4's and the library's own: `PView`'s `off + i c + j`, `UnheadsView`'s `i DIV b`, and the library's `Matrix.mul`. They meet that question with the library.
- **The numeral switch with the inference rule (POSITIONS 2026-09-27, decision 3), by reading the rule's shadow patch (`reviews/inference-rule-shadow/rule.patch`, in flight).** It changes none of my lines.
  - The witnesses stay because walk has no expected type, and walk's half of the rule infers from arguments, which a result-only size lacks.
  - `rmsn[\E\]` stays because the rule does not infer a generic function passed as a value. The specification says it should (`Specification/basic/expressions/var-ref.tex:35-40`, pointing to the unwritten inference chapter). Only a rule for identifier references would give back `rows(rmsn, x)`.
  - `corpus.tokens[\R\]` stays, for the same result-only reason and row 21.
  - The ranges that start with a numeral, `0#n` and `0#np` in the row lifts and the rank-3 product, are among the 13 C4 declarations the switch refuses. The diff neither adds nor removes any of them.

## 9. What is left, and what this found

- For microGPT to pass the checker after this diff, by what the measurement shows:
  - decision E's E3 (17 api lines on this path);
  - the checker's rule for a size known only at run time (the team's `comprises N[\n\]` comment);
  - the vector-plus-scalar `+` in the library, with walk's family check;
  - the tuple-binding defect;
  - the `Character` crash (FACTS 42);
  - `fail[\T\]` (face C);
  - `codePoint`, the varargs `SUM` and export, and `numbersOf`'s discarded count.
- Candidate ledger rows, found here and not in the ledger (`fortress-gap-ledger.md` searched):
  - (a) the compiled checker types the variables of a top-level tuple binding so that they are accepted anywhere, and an operator on one ends its block's check without an error (`probes/PHyp.fss`, `PLoc.fss`, `PSilent.fss`, `PBeta.fss`);
  - (b) walk cannot hold a sized `+` beside the library's generic scalar extension once a second user `+` exists (`probes/walk-drafts.txt`, draft 1), the library's own comment notwithstanding.
- Kept for Pavol to judge:
  - the mask's move into the step (item 3 of section 4), against leaving it top-level with an unsized `+`;
  - the upper-case size names E, V, T, D, F, R, P, chosen to read as the formulas do and to avoid the model's own lower-case names (`v`, `q`, `t`, `p` are values in the step).

## 10. What is measured, what is read, what was not run

- **Measured** (captures under `decision-d-diff/`):
  - the six checker runs (`measure/`);
  - the walk check (`walk-threads1.txt`);
  - the 13 probe programs on the checker and 7 of them under walk (`probes/`);
  - the two walk refusals of earlier drafts;
  - that the patch applied to today's sources gives the copy that was walked and checked.
- **Read, not measured:** what the inference rule and the ranges batch would do to these lines (section 8); that walk's family check would refuse a sized `+` inside the library as it did in the vocabulary; that the team's NatReflect comment is the missing checker rule; the ledger search for the two candidate rows.
- **Not run:** the gate (the patch touches no tracked file outside this review's directory); the four-thread check; the compiled path beyond the checker; the APL program's twin of this diff (`apl/mg/FlatArrays2`), whose 15 decision-D errors are the same shape.
