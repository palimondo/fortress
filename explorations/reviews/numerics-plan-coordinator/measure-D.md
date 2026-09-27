<!-- measure-D, written 2026-09-27 by a delegated probe worker for the coordinator's plan. It measures; it recommends nothing. Everything it made is under probes-D/ beside this file; no tracked file was edited, ant was not run, every Fortress run had a private cache (never default_repository/). -->

# measure-D: the expected type kept at a call `f(x)`

Every number names its capture, relative to `probes-D/`. **[measured]** means a run here produced it. **[read]** means it was read from the source and not traced.

## The answers

1. **The shadow.** It is four one-token edits in `Operators.scala`: `, expected` added at `:85`, `:90`, `:197` and `:345` (`shadow-fix.patch`).
   - The line the brief names, `:90`, is not the path of a parsed call. The parser builds `f(x)` as a tight juxtaposition with `fnApp = false`. That goes `:85` → `:345` → `:197`.
   - `:90` alone changes nothing on the probes. The three edits without it (`fixmp`) give the same result as all four **[measured]**.
   - I did not change the other drops of the same kind (§ 1.3): the loose juxtaposition `f x`, arguments, `let` bodies, `if` with no `else`, `typecase`, and `for` bodies.
2. **What `T` becomes.** With the expected type kept, a result-only `T` becomes **`BottomType`**, not the expected type, wherever the context is a plain type **[measured]**. That covers a typed local, a top-level variable, a function's body against its return type, a method's body and a typed local in it, an `if` branch, a statement, a parenthesized call, `builtinPrimitive(…)` and `fail(…)`.
   - The expected type itself is inferred only where `T` sits invariantly inside the result: `a: BoxT[\ZZ64\] = mkB()` gives `T = ZZ64`.
   - An argument to a typed parameter, an untyped binding, a loose juxtaposition, and an operand of an operator keep the stock error.
   - A method invocation today does the same: `x: ZZ64 = Fac.make()` binds `BottomType` on the stock checker.
   - The stock checker reports "Could not infer static argument T without context" at every one of these under walk's setting and under `any`. Under the compile path's setting (bound `Object`), it already gives `BottomType` everywhere, context or not.
3. **The distance** (DistanceMulti, the twelve components, the unchanged library copy L0) **[measured]**:
   - Under walk's setting: 1,737 → **1,387** (−350).
   - Under `any`: 1,746 → **1,395** (−351).
   - What went, under both settings: all 340 N1, 10 of the 24 N2, and variation in O1 (2 under walk, 2 under `any`).
   - No new error by site, except O1's known variation: 2 under walk, 1 under `any`.
   - Seven errors changed their message at their own site (I2 4, RG 2, OT 1). In each the same obligation is now refused inside the call's inference rather than at the declaration's return check.
   - Every class count except N1, N2 and O1 is unchanged. The eight declaration crashes are unchanged, and so is the `Stream` variance crash under `any`.
4. **The compiler's tests** **[measured]**: the compiler's type checker was run over all 382 `.fss` files that the gate's `.test` files `compile` or `link`, stock and shadow.
   - **No file's diagnostics differ.** 469 errors in each run, and 234 files with a non-zero return code in each.
   - The shadow's path is exercised: 1,127 distinct `f(x)` sites were given an expected type, 701 of them in `compiler_tests/`, and 14 of those inferred static arguments.
5. **What else it changes** **[measured on small programs]**:
   - Inference solves "range <: context" by subtyping and never by coercion. So a call that the stock checker accepts, because it converts the call's result afterwards, is now refused. Six of `DArg`'s 12 calls are refused this way:
     - `a: ZZ64 = idt(3)`
     - `r: RR64 = idt(3)`
     - `(): ZZ64 = idt(3)`
     - `(): ZZ64 = idt(z)` with `z: ZZ32`
     - `pick(l, 3)`
     - `inc(5)` into `ZZ64`
   - The same happens under the compiler's own library: `k03(): ZZ64 = idt(z)` (`DComp`).
   - The other way round, `a: BoxV[\ZZ32\] = BoxV(3)` is now accepted.
   - Neither the library nor the compiler's tests contains a call of the refused kind: no new error in either (answers 3 and 4).

## 1. The shadow

### 1.1 How it is built

- **Driver.** `make-shadow.py` copies the tracked `Operators.scala` and `Functionals.scala` into `shadow-src-<variant>/` and edits them by text. Each edit asserts it matched exactly once.
- **Build.** `build.sh` compiles the copies with `scala.tools.nsc.Main` against `bin/fortress_classpath`, into `classes-<variant>/`. That class directory is put ahead of `ProjectFortress/build`, the technique of `perf-probes/nat/run-all.sh`. Each variant is 2 class files and took about 10 s (`build.txt`). The diffs are `shadow-<variant>.patch`.
- **The environment** is `env-D.sh`: `explorations/experiment/env.sh`'s settings without its `rm -rf /tmp/fortress*rats`, because other workers' runs on this machine were using those directories.
- **Variants:**
  - `instr`: a trace in `Functionals.scala`, off unless `-Dprobe.showInfer=true`. At a call `f(x)` (`:704-705`) and at a method invocation (`:614-615`) it prints the expected type given and the static arguments inferred. `Operators.scala` is the tracked file. The small programs' "stock" column is this variant, with the trace on.
  - `fix`: `instr` plus the four edits:
    - `:85`: the tight juxtaposition passes its expected type to the `MathPrimary` it builds.
    - `:90`: the `fnApp = true` juxtaposition passes it to its `_RewriteFnApp`.
    - `:345`: the `MathPrimary` passes it on when it turns its front function and argument into a `_RewriteFnApp`.
    - `:197`: the `MathPrimary` with nothing left passes it to its front.
    - The distance runs and the compiler-test runs used this variant with the trace off. The trace's lines only print under the property **[read]**.
  - `fix90`: `instr` plus `:90` only.
  - `fixmp`: `instr` plus `:85`, `:345` and `:197`, without `:90`.

### 1.2 Why `:90` alone is not the path [read, measured]

- **The parser** makes `f(x)` a tight juxtaposition with `fnApp = false`:
  - `Expression.rats:548-556` (`ParenthesisDelimitedLeft`) calls `ExprFactory.makeTightJuxt(span, false, list(base, a1))`.
  - `ExprFactory.java:282-285` sets `fnApp` to `false`; the `false` argument is `isParenthesized`.
- **`fnApp = true`** comes only from desugarings. `Fortress.ast:876-879` says so ("This should be the case for desugarings only"); one example is the reduction's `unitVar(body)` at `DesugarerUtil.java:188-189`.
- **So a parsed call is checked along** `Operators.scala:76-86` (to a `MathPrimary`, no expected type), then `:336-345` (front is an arrow followed by an argument, so it builds `_RewriteFnApp` and re-checks the `MathPrimary` with nothing left), then `:197` (`checkExpr(front)`, no expected type). `:89-90` is never reached on this path.
- **Measured:**
  - `DCtx` under `fix90`: 14 errors, the same as stock, and the trace shows no expected type at any call (`small/DCtx.fix90.walk.txt`).
  - Under `fixmp` the trace and the errors equal `fix`'s on `DCtx` and `DArg` (`small/D{Ctx,Arg}.fixmp.walk.txt`).
  - `fixmp` was not run on the distance. The distance measures the four edits together.
- **Downstream** of `:197`, `Functionals.scala:695-705` (`S_RewriteFnApp`) already passes `expected` to `checkApplication`. `STypesUtil.scala:932-947` then adds "range <: context" to the constraint.

### 1.3 The same drop elsewhere, not changed [read; the effect measured where marked]

- **Loose juxtaposition `f x`** (`Operators.scala:100-192`). Its chunks become `_RewriteFnApp` (`:142`, `:145`) and are checked through `tryCheckExpr` of a multifix `OpExpr` (`:172-178`), or else by `checkExpr` (`:187`), with no expected type.
  - Measured: `c12(s): ZZ32 = make1 s` keeps "without context" under `fix`.
  - Library: `fail (…)` at `FortressBuiltin.fss:35`, and `fail "…"` at `String.fss:440`, `:441` remain N2.
- **A function item inside a `MathPrimary`** (`:273`), and its non-application branch (`:350ff`, `tryCheck` with no expected type).
- **Arguments.** `partitionArgs` (`Functionals.scala:95-101`) calls `checkExprIfCheckable` (`STypeChecker.scala:517-525`), which calls `checkExpr(expr)`.
  - Measured: `takes64(make())` keeps "without context". `make() + 1` in a `ZZ64` body keeps it too (`DMore` d08).
- **A `let` body**, that is, the expressions after a local declaration: `checkLetBody` calls `bodyChecker.checkExpr(body)` (`Decls.scala:52-57`).
  - Library: `FortressLibrary.fss:2001` and `List.fss:458` remain N2.
- **An `if` with no `else`** checks its clauses with `None` (`Misc.scala:582`).
  - Library: `FortressLibrary.fss:288`, `:293`, `:4249` and `RangeInternals.fss:156` remain N2.
- **`typecase`** checks its clauses with `checkClause(_, checkedType)` (`Misc.scala:326`, `:648`) and its `else` with `checkExpr(_)` (`:651`).
  - Library: `FortressLibrary.fss:1015` and `:3862` remain N2.
- **A `for` body** is checked with `checkExpr(body)` (`Misc.scala:613`).
  - Library: the `fail` at `RangeInternals.fss:159` is inside the cascade that `classify.py` puts in N2 at `:157`.
- **Context that is passed** (not changed, for reference):
  - `if … else` branches (`Misc.scala:525-529`).
  - A block's last expression, and a non-last expression, which is checked against `()` (`Misc.scala:432-434`).
  - Typed local and top-level bindings, and return types (`Decls.scala:206-214`, `:352-373`).

## 2. Small programs

- **Programs:** `small/DCtx.fss` (the brief's cases), `small/DArg.fss` (the argument fixes `T` and the context disagrees) and `small/DMore.fss` (further shapes).
- **Driver:** `ProbeD.java`, via `check.sh <variant> <setting> <Name>`. It is CheckDriver (the checker-count tool's world switch) with DistanceMulti's `-setting` switch, using the fill worker's shadow `StaticChecker` so that `-Dprobe.dropApiErrors` keeps the library api's own errors out. It uses the one library (the interpreter's `FortressLibrary`/`FortressBuiltin`/`AnyType`) and `typecheckPhaseOrder`.
- **Captures:**
  - Per run: `small/<Name>.<variant>.<setting>.txt`. Each records its time, tree, `nproc`, load and JDK, and holds the trace lines and the probe's own errors.
  - Per case: `small/<Name>.summary.txt` (`summarize.py`), one line per declaration and run.
- **Settings:**
  - walk: `extendsObject` off, `compiledExpr` off.
  - any: `extendsObject` off, `compiledExpr` on (batch 7 Q1 (a)).
  - compile: both on.
- The stock result is the same under walk's setting and under `any`, and so is the shadow's (`DCtx`, `DArg`).

### 2.1 What `T` becomes [measured]

Each case of `DCtx` below gives the stock result under walk's setting and `any` (instr), then under compile (instr), then the shadow's (fix) under walk's setting and `any`, then under compile.

- **`c01`** `do x: ZZ64 = make(); () end`, with `make[\T\](): T`: stock error "Could not infer static argument T without context". Compile: `BottomType`. Shadow: expected `ZZ64`, `T = BottomType`, no error. Shadow compile: `BottomType`.
- **`c02`**, a top-level `ZZ64 = make()`: the same four answers as c01.
- **`c03`** `(): ZZ64 = make()`, a function's body against its return type: the same. So is **`c03s`** `(s): ZZ32 = make1(s)` (expected `ZZ32`).
- **Method bodies:** `m04(): ZZ64 = make()` in an object (the method's result), and `m04b` (a typed local in a method body): the same as c01.
- **`c05`** `takes64(make())`, an argument to a typed parameter: stock error. Compile: `BottomType`, accepted. **Shadow: the same error**; the inner call is given no expected type (trace `expected=NONE`). Shadow compile: `BottomType`.
- **`c06`** `do v = make(); () end`, where nothing gives a type: stock error. Compile: `BottomType`. **Shadow: error.** Shadow compile: `BottomType`.
- **`c06b`** `do make(); () end`, a non-last statement: stock error. Shadow: expected `()` (from `Misc.scala:432`), `BottomType`, no error.
- **The natives' and `fail`'s own shapes.** `c07(x: ZZ32): ZZ32 = builtinPrimitive("…Int$Add")` and `c07f(): ZZ64 = fail("c07f")`: stock "Could not check call to function builtinPrimitive/fail - Could not infer static argument T without context". Compile: `BottomType`. Shadow: `BottomType`, no error.
- **`c08`** `(): ZZ64 = makeI()`, with `T extends Integral[\T\]`: `BottomType` on both checkers under every setting.
- **`c09`** `do a: BoxT[\ZZ64\] = mkB(); () end`, with `mkB[\T\](): BoxT[\T\]`: stock error. Compile: `BoxT[\BottomType\]`, refused ("Right-hand side has type BoxT[\BottomType\], but declared type is BoxT[\ZZ64\]"). **Shadow: `T = ZZ64`, accepted, under every setting.**
- **`c10`** `do x: ZZ64 = Fac.make(); () end` and **`c10b`** `(): ZZ64 = Fac.make()`, method invocations: **`BottomType` on both checkers** (trace `MI … expected=ZZ64 … sargs=[BottomType]`).
- **`c11`** `if b then make() else 1 end` in a `ZZ64` body: stock error. Shadow: `BottomType`.
- **`c12`** `(s): ZZ32 = make1 s`, a loose juxtaposition: error on both.
- **`DMore`**:
  - d09 `(make())`: stock error; shadow `BottomType`.
  - d08 `make() + 1`: error on both.
  - d06 `curry(z)(z)`: the expected type reaches only the outer application (trace).
- **Totals** (`small/DCtx.*.txt`): 14 errors stock under walk and `any`; 3 under `fix` and under `fixmp`; 14 under `fix90`. Under compile: 1 stock, 0 shadow.

**Why `BottomType` [read, consistent with the traces].**
- The context adds `$T <: ZZ64`, an upper bound only.
- The solver binds each variable to the join of its lower bounds (`Formula.scala:527`, `ta.join(pl…)`), and there is none. The join is `normalize(makeUnionType(∅))` (`TypeAnalyzer.scala:81`), and the trace shows `BottomType`.
- The ancestor heuristic (`Formula.scala:528-541`) needs a single lower bound.
- With no context and the bound `Any`, the whole constraint reduces to true. `slv` then returns the empty substitution (`Formula.scala:493`), `$T` stays in the result, and `Functionals.scala:246-259` reports "without context".
- With the bound `Object`, the upper bound is not trivially true, so the variable is solved to `BottomType` even with no context. This is what `distance-triage.md` § 3.1's BP run relies on.
- The invariant `BoxT[\$T\] <: BoxT[\ZZ64\]` yields an equality, which the unifier solves to `ZZ64` (`Formula.scala:510-516`).

### 2.2 What else the kept context changes [measured]

`DArg` under walk's setting: 2 errors stock, 8 shadow (`small/DArg.instr.walk.txt`, `small/DArg.fix.walk.txt`; the same under `any` and compile).

- **Accepted by stock, refused by the shadow (6).** Each gets "Could not check call to function … - … is not applicable to an argument of type …":
  - `a01` `a: ZZ64 = idt(3)`: stock `T = IntLiteral`, and the binding converts it.
  - `a02` `r: RR64 = idt(3)`.
  - `a05` `(): ZZ64 = idt(3)`.
  - `a06` `(): ZZ64 = idt(z)` with `z: ZZ32`: stock `T = ZZ32`.
  - `a07` `(): ZZ64 = pick(l, 3)`: stock `T = OR(ZZ64,IntLiteral)`.
  - `a08` `(): ZZ64 = inc(5)` with `T extends Integral[\T\]`: stock `T = ZZ32` by the ancestor heuristic.
  - **Why [read]:** `checkApplicableWithInference` is "static argument inference and no coercion" (`Functionals.scala:171-173`). The range-to-context constraint is a subtype check. Stock converted the result after the call (`STypeChecker.scala:475-495`, `buildCoercion`), and with the context in the inference that conversion is never reached.
  - This is the method-invocation behaviour evidence-B measured (`Fac.wrap(3)`).
- **Refused by both, with a new message (2):**
  - `a03` `s: String = idt(3)`.
  - `a04` `a: BoxT[\ZZ64\] = wrapT(3)`.
  - Both change from "Right-hand side has type …" to "… is not applicable to an argument of type IntLiteral".
- **Unchanged (4).** `a09` into `ZZ32`, `a10` into `Any`, `a11` `idt(l)` into `ZZ64`, and `a12` into `IntLiteral`: the inferred result is already a subtype of the context.
- **`DMore`** (`small/DMore.{instr,fix}.walk.txt`, 5 → 3 errors):
  - `d01` `a: BoxV[\ZZ32\] = BoxV(3)`, with `object BoxV[\T\](v: T)`: now accepted with `T = ZZ32`. Stock infers `BoxV[\IntLiteral\]` and refuses the binding.
  - `d02` into `BoxV[\ZZ64\]` and `d04` `do idt(3); () end`: refused by both, with new messages.
- **Under the compiler's own library** (`small/DComp.fss`, run through the compiler-test driver, `small/DComp.ctests-{instr,fix}.txt`):
  - `k01` `a: BoxT[\ZZ64\] = mkB()`: refused by stock (`BoxT[\BottomType\]`), accepted by the shadow (`T = ZZ64`).
  - `k03` `(): ZZ64 = idt(z)`: accepted by stock, refused by the shadow.
  - So the shadow is live in the setting of answer 4.

## 3. The distance

**Method.**
- `distance-triage/run.sh`'s steps `build`, `lib L0` and `stage`, into `probes-D/work-dist/`: DistanceMulti, the twelve prelude components in one JVM, every stage and declaration, the overload memo off.
- `run-distance.sh` launched the four runs: walk's setting and `any`, each with `TAG=stock` (the tree's checker) and `TAG=fix` (`EXTRA_CP=classes-fix`).
- The captures came from distance-triage's tools (`tables.sh` here):
  - `dist/full-*.tsv` (`fullerrs.py`).
  - `dist/classes.txt` (`classify.py`, the four columns).
  - `dist/compare-sites-{walk,any}.txt` (`compare.py --sites -v`) and `dist/compare-msgs-{walk,any}.txt` (`compare.py -v`, by whole message).
  - `dist/run-*.txt`.
- The library copy L0 equals the tree's `FortressLibrary.fss`, `FortressBuiltin.fss` and `RangeInternals.fss` (`cmp`).
- The tree's `ProjectFortress/src`, `Library` and `LibraryBuiltin` were last changed at `917bb7b32` (13:11 UTC). The build is from 14:17 UTC. `HEAD` moved from `8f0f9f960` to `1fbb7cb1a` during the work, through other workers' document commits only.

**Timing.**
- Machine: `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, cpu MHz 2100.000, OpenJDK 25.0.4, `FORTRESS_THREADS=1`, `-Xmx4g -Xss64m`.
- All four started 16:37:32Z with load 7.22 5.14 3.73. Beside them ran probes-C's two or three stage runs and this probe's compiler-test runs; the load reached 18.17 at 16:47.
- Elapsed 2,254 to 2,261 s each, of which `FortressLibrary` took 1,941 to 1,947 s (`dist/run-*.txt`). This is not a comparison.

**Totals [measured].**
- The stock runs are within the known variation of the earlier ones (1,738 and 1,736 under walk, 1,747 under `any`): 1,737 under walk, 1,746 under `any` (`dist/classes.txt`).
- The shadow: 1,387 under walk and 1,395 under `any`.
- By site, walk: 352 gone, 2 new. By site, `any`: 352 gone, 1 new (`dist/compare-sites-*.txt`).

**Gone [measured].**
- **N1: 340 of 340, under both settings, at the same sites.** By file: `FortressBuiltin.fss` 183, `FortressLibrary.fss` 125, `FlatString.fss` 14, `Writer.fss` 11, `NativeArray.fss` 7. Three examples:
  - `FortressLibrary.fss:4300`, `opr SEQV(a:Any, b:Any):Boolean = builtinPrimitive("…AnyPrim$SEquiv")`.
  - `FortressLibrary.fss:749`, `widen(self):ZZ64 = builtinPrimitive("…Int$ToLong")`.
  - `FortressBuiltin.fss:74`, `getter nextDown():RR64 = builtinPrimitive("…Float$NextDown")`.
  - Each was "Could not check call to function builtinPrimitive - Could not infer static argument T without context". By §2.1 each now binds `T = BottomType` (the natives' shape, `c07`, measured there; the library's sites not traced).
- **N2: 10 of 24, under both settings.** Every one is `fail(…)` as a function's or operator's body, as a `do` block's last expression, or in an `if … else` branch, against a declared type:
  - `FortressLibrary.fss:1423` (`… else fail("Maybe[" i "] nonzero index") end`), `:1453`, `:1499`, and `:1682` (`oops(…):() = do fail(…); end`, against `()`).
  - `RangeInternals.fss:152`, `:168`, `:184`, `:228`, `:247` (for example `:152`, `opr INTERSECTION(…): Range[\I\] = fail("ScalarRange INTERSECTION Range!  Shouldn't happen.")`).
  - `NatReflect.fss:53`.
- **O1: 2 under walk, 2 under `any`.** This is the known variation: which pair of `LEXICO`/`SQCAP` declarations is named.
- **Per file, walk's setting** (`dist/full-walk-*.tsv`):
  - `FortressBuiltin.fss` 193 → 10.
  - `FortressLibrary.fss` 814 → 685.
  - `FlatString.fss` 22 → 8.
  - `Writer.fss` 12 → 1.
  - `NativeArray.fss` 7 → 0.
  - `RangeInternals.fss` 340 → 335.
  - `NatReflect.fss` 5 → 4.
  - Every api file and every other component is unchanged.

**The 14 N2 left [read at each site; not traced].** Each sits in a context where the expected type is dropped by § 1.3:
- An `if` with no `else`: `FortressLibrary.fss:288`, `:293` (`assert`'s bodies), `:4249`, and `RangeInternals.fss:156`.
- `typecase` `else`: `FortressLibrary.fss:1015`, `:3862`.
- After a local declaration (`let` body): `FortressLibrary.fss:2001`, `List.fss:458`.
- Loose juxtaposition: `FortressBuiltin.fss:35` (`fail ("…" javaClass)`, the body of `builtinPrimitive` itself), and `String.fss:440`, `:441` (`fail "…"` in `typecase` clauses).
- Three that `classify.py` puts in N2 because their message contains the phrase:
  - `FortressLibrary.fss:169`: the overloaded `<`, whose candidate list includes "Could not infer static arguments A, B without context".
  - `RangeInternals.fss:157`: a cascade from `fail` inside a `for` body at `:159`.
  - `List.fss:150`: `<| self[i] | i <- r |>`, "Could not check call to operator BIG <|_BIG |> - Could not infer static argument T without context".

**New [measured].**
- **By site: none, except O1's variation.** Under walk: `FortressLibrary.fss:170,171` (`LEXICO`, "(()->TotalComparison)") and `:1411,1436` (`SQCAP`, "(Maybe[\T\])"). Under `any`: `FortressLibrary.fss:171,205` (`LEXICO`).
- **By message: seven errors changed their message at an unchanged site, under both settings** (`dist/compare-msgs-*.txt`). `classify.py` keeps them in their classes: I2 4, RG 2, OT 1.
  - **I2 (4):** `FortressLibrary.fss:3910`, `:3923`, `:3930`, `:3959`.
    - Example `:3910`, `opr (x:I)#[\I extends AnyIntegral\] : LeftRange[\I\] = left1Range(0 asif ZZ32, x)`. Stock: "Function body has type LeftRange[\OR(ZZ32,I)\], but declared return type is LeftRange[\I\]." Shadow: "Could not check call to function left1Range - [\I extends AnyIntegral\](I, I)->LeftRange[\I\] is not applicable to an argument of type (ZZ32, I)."
    - The other three are `extent1Range`, `right1Range` and `open1Range`, alike.
  - **RG (2):** `RangeInternals.fss:180`, `:243`.
    - Example `:180`, `truncL(l_i:I, l_j:J): RangeWithLeft[\(I,J)\] = combine2D(…)`. Stock: "Function body has type RangeInternals.Range2D[\I,J\], but declared return type is RangeWithLeft[\(I, J)\]." Shadow: "Could not check call to function combine2D - … is not applicable to an argument of type …".
    - `:243` is the same with `combine3D`.
  - **OT (1):** `FortressLibrary.fss:3030` (row 422), `empty(): Nothing[\R\] = Just(org.empty())`. Stock: "Function body has type Just[\R\], but declared return type is Nothing[\R\]." Shadow: "Could not check call to function Just - [\T\]T->Just[\T\] is not applicable to an argument of type R."
  - O1 accounts for the rest of the message differences: 3 new under walk, 4 under `any`.
- **Unchanged:** the eight declaration crashes and, under `any`, the variance checker's `Stream` crash (`dist/run-*.txt`).

## 4. The compiler's tests

**Which files.**
- `ctests/gate-list.py` reads every `compiler_tests/*.test` as a properties file. A test with a `compile` or `link` key is compiled by `CompilerJUTest`'s harness (`FileTests.java`).
- There are 368 `.test` files; 23 have neither key. The rest name 388 tests, which are 382 distinct `.fss` files. The list includes the two library files `../../Library/CompilerLibrary.fss` and `../LibraryBuiltin/CompilerBuiltin.fss`.
- Five `.fsi` names were left out, since the question is the `.fss` (`ctests/gate-list.counts.txt`, `ctests/gate-list.full.txt`).
- Every file was run, not a sample.

**How.**
- `ctests/TestsD.java` via `ctests/run-ctests.sh <stock|fix>`. It is `fortress typecheck`'s setting (`Shell.java:453-457`: the compiler's own library and `typecheckPhaseOrder`) over the whole list in one JVM with one private cache, as the gate runs its tests in one JVM. It runs from `compiler_tests/` and catches a `Throwable` per file.
- Capture: `ctests/typecheck-{stock,fix}.txt`.
- Each run took 320 s. They ran together, with load at start 8.43 7.47 4.91 (machine as in § 3).

**Result [measured]** (`ctests/diff.txt`, `ctests/diff-ctests.py`: per-file blocks with timing and paths cut):
- **0 of 382 blocks differ.**
- Errors reported: 469 stock, 469 shadow.
- 234 files returned non-zero in each run: 232 with `rc=-1`, 1 with `rc=1`, and 1 thrown. The thrown one is `XXXUnionMethodRungS.fss`, "You should be able to call methods on this type, OR(Pt,Box) … not yet implemented", the same in both.

**Coverage [measured].** A third run of the shadow, with the trace on, took 110 s at load 0.64 (`ctests/typecheck-fix-traced.txt`, `ctests/trace-coverage.txt`). Its diagnostics equal the untraced run's: 0 blocks differ.
- 1,127 distinct `f(x)` sites were given an expected type. 701 of them are in `compiler_tests/`; the rest are in the compiler library and the apis the tests import.
- 14 of those sites also inferred static arguments. Examples: `CompilerBuiltin.fss:1457` (`Option[\ZZ32\]` → `ZZ32`), `Compiled10.k.fss:24`, `Compiled13.fss:30`, `NatInferredChecker.fss:15`, `NatRtDispSize.fss:15`, `NatRtDot.fss:12`.
- None of them changed a diagnostic.

## 5. What this does not settle

- **What code generation makes of `BottomType`.** Each native now type-checks as `builtinPrimitive[\BottomType\]`, which is what the compile path's `Object` bound already records today (§ 2.1, compile column). Whether that serves the compiled path's natives (phase 4, row 309) was not probed.
- **The four edits' split on the distance.** Only all four together were run there. On the probes `:90` changes nothing (§ 1.2).
- **The drops in § 1.3.** Passing the expected type through them would clear some of the 14 N2 left. Those edits were not made or measured.
- **The refusals of § 2.2.** None occurs in the library or the compiler's tests. A program such as microGPT that writes `x: ZZ64 = f(3)` for a generic `f` would meet them, but that was not measured.
