# Bytecode-compiler path vs interpreter — characterization of the exploration corpus

Produced by a delegated worker session during the microgpt-native
exploration (design journal: `explorations/microgpt-native.md`); the
minimal probe programs it references are committed in
`explorations/compiler-probes/`.

Date: 2026-08-24. Tree: `/home/user/fortress` @ HEAD, clean (no tracked file
modified; `default_repository/caches/global.map` verified present).
Toolchain: JDK 25, `ant compileAll` green, caches wiped
(`rm -rf default_repository/caches/*_cache …/logs`) and the library chain
recompiled from scratch before every measurement.

Everything below was measured with `FORTRESS_THREADS=1`. **Timings are
indicative only** — other workers shared the machine.

---

## 0. Control: the compiled path works end-to-end

Library chain compiled in the order from `explorations/repo-internals.md`:

| step | wall |
|---|---|
| `fortress compile LibraryBuiltin/AnyType.fss` | 34 s |
| `fortress compile LibraryBuiltin/CompilerBuiltin.fss` | **154 s** |
| `fortress compile ../Library/CompilerLibrary.fss` | 24 s |
| `fortress compile ../Library/CompilerAlgebra.fss` | 3 s |
| `fortress compile ../Library/CompilerSystem.fss` | 3 s |
| **total one-time library cost** | **≈ 3 min 38 s** |

`ctrl0.fss` (println + `for i <- seq(1#10)` accumulator) compiles in ~2 s and
runs correctly. The compiled path is alive on JDK 25.

**Per-program compile cost is small** (1.9–2.2 s for every program that
compiled, and for every program that failed): the front end is fast; the
expensive part is the one-time library build.

**Startup cost differs by an order of magnitude** (measured on a trivial
program, best of 2):

| | wall |
|---|---|
| `fortress <file>.fss` (interpreter) | 5.1 s |
| `fortress run <component>` (compiled) | 0.67 s |

The interpreter re-parses and re-links `FortressLibrary` on every run; the
compiled path loads jars from `default_repository/caches/bytecode_cache/`.

---

## 1. Per-target results

None of the six exploration programs compiles. **Every failure is in the
front end (name resolution / typechecking) — not one of them reaches
codegen.** The 2012 folklore "the compiler is incomplete, some constructs
still `sayWhat`" is not what blocks this corpus: what blocks it is that the
compiler path's standard library (`Library/CompilerLibrary.fss`, 592 lines)
is a tiny monomorphic subset of the interpreter's `FortressLibrary.fss`
(4,518 lines).

| target | compiles? | phase | first blocking construct | interp wall | compiled wall |
|---|---|---|---|---|---|
| `micrograd.fss` | **no** (10 errors) | typecheck / name res | `import List.{...}` (line 2) | 51.7 s | — |
| `mgnative_a.fss` | **no** (10 errors) | typecheck / name res | `import List.{...}` (line 2) | 26.9 s | — |
| `mgnative_b.fss` | **no** (10 errors) | typecheck / name res | `import List.{...}` (line 2) | 31.2 s | — |
| `mgnative_c.fss` | **no** (10 errors) | typecheck / name res | `import List.{...}` (line 2) | 32.9 s | — |
| `nprobe.fss` | **no** (10 errors) | typecheck / name res | `import List.{...}` (line 2) | 23.4 s | — |
| `tparallel.fss` | **no** (6 errors) | typecheck | `nanoTime()` returns `RR64`, not `ZZ64` | 33.2 s | — |

All six run correctly under the interpreter (exit 0, expected output).

### 1a. `tparallel.fss` — one-line gap, and the perf payoff behind it

`tparallel` is the only target whose sole blocker is a **library API
divergence**, and it is a single line. Applying the workaround in a
scratchpad copy (`probes/tpar2.fss` — `ms` retyped to `RR64`, nothing else
changed; **the tracked file was not touched**) makes it compile and run:

```
main x1           : 2421 ms  (interp)   →  434 ms  (compiled)
2-tuple           : 5435 ms             → 1144 ms
4-tuple           : 10530 ms            → 1538 ms
main x1 again     : 2583 ms             →  397 ms
(burn, 0) tuple   : 2684 ms             →  336 ms
(0, burn) tuple   : 2931 ms             →  307 ms
checksum 0.4877057787838651  ← identical on both paths
total wall        : 37.2 s              →  6.7 s   (5.6×)
```

Numerics match to the last digit. Per-section speedup 5.6–6.8×.

### 1b. Speedup on constructs the compiler *can* handle

Two purpose-built benchmarks (both compile clean, both produce
bit-identical results):

| benchmark | interp | compiled | speedup (startup-adjusted) |
|---|---|---|---|
| `bench1` — 20 M-iteration scalar `RR64` loop | 109.2 s | 16.0 s | **6.8×** |
| `bench2` — 2 M user-object allocations + two `opr` method calls each | 33.1 s | 3.8 s | **8.9×** |

So the payoff for closing the gaps is real: **~6–9× on compute, ~8× on
startup**, on exactly the autodiff-node-churn shape that `micrograd.fss`
and the `mgnative_*` alternatives are made of.

---

## 2. Deduplicated gap catalog

Each distinct failure appears once, with a minimal reproducing construct
(all probes live in `scratchpad/probes/`), the exact error, and — where one
exists — a note on an apparent small workaround. **No workaround was applied
to any tracked file.**

### G1 — `import List` is impossible on the compiler path

*Minimal construct* (`probes/p15.fss`):
```fortress
component p15
import List.{...}
export Executable
run() = do
  xs: List[\RR64\] = <|[\RR64\] 1.0, 2.0, 3.0 |>
  println("p15 " xs)
end
end
```
*Exact error* (10 of them, all against the library `.fsi`, not the program):
```
/home/user/fortress/Library/List.fsi:55:34-39:
    HasRank is undefined.
/home/user/fortress/Library/List.fsi:67:36-52:
    LexicographicOrder is undefined.
/home/user/fortress/Library/List.fsi:68:28-33:
    HasRank is undefined.
/home/user/fortress/Library/List.fsi:74:17-20:
    Maybe is undefined.
… (75, 76, 77 likewise)
/home/user/fortress/Library/List.fsi:110:19-30:
    Comprehension is undefined.
/home/user/fortress/Library/List.fsi:113:24-34:
    BigReduction is undefined.
/home/user/fortress/Library/List.fsi:131:28-41:
    MonoidReduction is undefined.
File micrograd.fss has 10 errors.
```
*Root cause.* On the compiler path `WellKnownNames.useCompilerLibraries()`
swaps the implicit prelude from `FortressLibrary` to `CompilerLibrary`
(`WellKnownNames.java:113`). `Library/CompilerLibrary.fsi` declares none of
`HasRank`, `LexicographicOrder`, `Comprehension`, `BigReduction`,
`MonoidReduction`, and its `Maybe` is not the one `List.fsi` wants. An
explicit `import List` still resolves to `Library/List.fsi`, which is written
against the *interpreter* prelude.

*Workaround investigated and rejected.* The repo has a `CompilerLibrary/`
directory holding compiler-path `.fsi` stubs including `List.fsi`, but it is
**not on the source path**: `default_repository/configuration` sets
```
fortress.source.path=;.;${_fr}/LibraryBuiltin;${FORTRESS_AUTOHOME}/Library;${_fr}/test_library
```
Overriding `FORTRESS_SOURCE_PATH` to put `CompilerLibrary/` first was tried
and produces *the same ten errors* — `CompilerLibrary/List.fsi` is byte-for-byte
`Library/List.fsi` apart from a copyright year. (`CompilerLibrary/FortressLibrary.fsi`
*does* declare the missing traits, but it is not the prelude the compiler
actually uses; `Library/CompilerLibrary.fsi` is.) So the fix is a real
library-porting job, not a path tweak.

*Blast radius.* 5 of 6 targets (`micrograd`, `mgnative_a/b/c`, `nprobe`).

### G2 — no `array[\T\](n)` on the compiler path

*Minimal construct* (`probes/p05.fss`, `probes/p06.fss`):
```fortress
a = array[\RR64\](4).fill(fn (k:ZZ32) => 1.5)
```
*Exact error:*
```
…/p05.fss:4:7-17:
    Function array is not defined.
```
Interpreter: works (`p05 1.5`). Same for a user element type (`array[\V\]`).
`Library/CompilerLibrary.fsi` offers only `ZZ32Vector` (`makeZZ32Vector`) and
an empty `trait Matrix[\T, nat s0, nat s1\] extends Object end`; there is no
generic array constructor.
*Triggering real code*: `micrograd.fss:84` and the parameter/data setup in
all three `mgnative_*`, e.g.
`w2 = array[\V\](nH).fill(fn (k:ZZ32) => konst(initW(k + 7, 2 k + 3)))`.
*Workaround*: none short of writing a compiler-path array library.

### G3 — no `exp` / `log` on the compiler path

*Minimal construct* (`probes/p09.fss`): `println("p09 " (exp x) " " (log x))`
*Exact error:*
```
…/p09.fss:5:19-20:
    Variable exp is not defined.
…/p09.fss:5:31-32:
    Variable log is not defined.
```
Interpreter: `p09 7.38905609893065 0.6931471805599453 2.0 8.0`.
`CompilerBuiltin.fsi`'s `trait RR64` has `opr SQRT`, `opr ^`, `MIN/MAX`,
`opr |self|` — but no transcendentals, and `CompilerLibrary` adds none.
*Triggering real code*: `micrograd.fss:18-19`
(`ln(): V = V(log data, …)` / `expV(): V = V(exp data, …)`),
`mgnative_a.fss:26-27`, `mgnative_b.fss:43,46`, `mgnative_c.fss:44-45`.
*Note*: `|x|`, `^`, `MIN/MAX` all work compiled — only the transcendentals
are missing.

### G4 — no `SUM` / generic BIG operators / user reductions

*Minimal construct* (`probes/p11.fss`): `println("p11 " (SUM[k <- 0#4] k))`
*Exact error:*
```
…/p11.fss:3:25-26:
    Operator BIG + is not defined.
```
Interpreter: `p11 6`.
`Library/CompilerLibrary.fsi` defines exactly two reductions —
`trait ReductionString` and `trait ReductionZZ32` — and exactly two BIG
operators, `opr BIG ||()` and `opr BIG MAX()`. Its generator trait is the
**monomorphic** `trait GeneratorZZ32`; there is no `Generator[\T\]`-driven
`__generate`/`__bigOperator` at library level. (`Generator[\E\]`,
`SequentialGenerator`, `Reduction[\R\]` *do* exist in `CompilerBuiltin.fsi`
— the hole is the `CompilerLibrary` layer above them.)
*Triggering real code*: `nprobe.fss:71-77` (`SUM[(p,q) <- pairs] q`),
`mgnative_a.fss:36` (`SUM[a <- seq(addends)] a.data`), `mgnative_b.fss:52`,
`mgnative_c.fss:12,52,71`.
Consequently `MonoidReduction`, `CommutativeMonoidReduction`,
`BigReduction`, `Comprehension` and `__bigOperatorSugar` — the whole
machinery of the `mgnative_*` "register a user BIG operator" designs
(`mgnative_a.fss:40-49`) — are unavailable. Same root cause as G1's missing
`Comprehension`/`BigReduction`/`MonoidReduction`.

### G5 — `nanoTime()` has a different type on the two paths

*Minimal construct* (`probes/p14.fss`): `t0 = nanoTime(); t1 = nanoTime()`
*Exact error in real code:*
```
/home/user/fortress/explorations/tparallel.fss:23:34-41:
    Could not check call to function ms
    - (ZZ64, ZZ64)->ZZ64 is not applicable to an argument of type (RR64, RR64).
```
*Root cause*, a plain declaration divergence:
* `Library/FortressLibrary.fsi:2388` — `nanoTime():ZZ64`
* `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:23` — `nanoTime(): RR64`
  (`CompilerBuiltin.fss:330`: `nanoTime(): RR64 = jNanoTime()`)

*Apparent small workaround* (verified, applied only to a scratchpad copy):
retype the user helper to `RR64` —
`ms(t0: RR64, t1: RR64): RR64 = (t1-t0) / 1000000.0`. With that one line,
`tparallel` compiles, runs, and matches the interpreter's checksum exactly
(see §1a). The real fix belongs in the library: make the two declarations
agree.

### G6 — string juxtaposition inserts spaces on the compiled path

**This one silently changes the output of essentially every program.**

*Minimal construct* (`probes/ctrl1.fss`):
```fortress
x: RR64 = 15.0
n: ZZ32 = 7
println("[" x "]"); println("[" n "]"); println("[" x.asString "]"); println("[" true "]")
```
| interpreter | compiled |
|---|---|
| `[15.0]` | `[ 15.0 ]` |
| `[7]` | `[ 7 ]` |
| `[15.0]` | `[ 15.0 ]` |
| `[true]` | `[ true ]` |

*Root cause*, a one-token divergence:
* `Library/FortressLibrary.fss:4050` — `opr juxtaposition(self, b:Any):String = self || b`
* `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:384` — `opr juxtaposition(self, b:Object): String = self ||| b`

`|||` is the *space-inserting* concatenation; `||` is plain. Note the
compiler path also lacks the `opr juxtaposition(a:Any, self)` overload
(String on the right) that `FortressLibrary.fss:4048` provides.

*Apparent small workaround*: change `|||` to `||` at
`CompilerBuiltin.fss:384` (the `.fsi` needs no change — it declares both
operators abstractly at lines 37-39). **Not applied** — tracked file, and it
would need the full suite re-gated since compiler tests may bake in the
spaced output.

*Consequence for this exercise*: "output identical to the interpreter" can
only be judged modulo this spacing until it is fixed. For `tpar2` the values
and the checksum were identical; only the spacing differed.

### G7 — no dynamic dispatch to a method declared only in the subtypes

*Minimal construct* (`probes/p20.fss`):
```fortress
trait Tree comprises { Leaf, Node } end
object Leaf(v: RR64) extends Tree  tsum(): RR64 = v  end
object Node(a: Tree, b: Tree) extends Tree  tsum(): RR64 = a.tsum() + b.tsum()  end
run() = do  t: Tree = Node(Leaf(1.0), Leaf(2.0));  println("p20 " t.tsum())  end
```
*Exact error:*
```
…/p20.fss:8:18-24:
    No such method Tree.tsum.
```
Interpreter: `p20 3.0`. The interpreter dispatches dynamically; the compiler
requires the method to be declared abstract on the trait.
*Apparent small workaround*: declare `tsum(): RR64` abstractly in the trait
— a source change to the exploration programs, arguably the more correct
Fortress anyway.

### G8 — no multimethod (arg-type) dispatch on a `comprises` union

*Minimal construct* (`probes/p10.fss`):
```fortress
trait Tree comprises { Leaf, Node } end
object Leaf(v: RR64) extends Tree end
object Node(a: Tree, b: Tree) extends Tree end
tsum(t: Leaf): RR64 = t.v
tsum(t: Node): RR64 = tsum(t.a) + tsum(t.b)
run() = do  t: Tree = Node(Leaf(1.0), Leaf(2.0));  println("p10 " tsum(t))  end
```
*Exact error:*
```
…/p10.fss:7:23-30:
    Could not check call to function tsum
    - Leaf->RR64 is not applicable to an argument of type Tree.
    - Node->RR64 is not applicable to an argument of type Tree.
```
Interpreter: `p10 3.0`. This is the exact shape of `nprobe.fss:58-60`
(`tsum(t: Leaf)` / `tsum(t: Node)`, P5) and the whole design of
`mgnative_b.fss` (`trait Ex comprises { Leaf, Plus, Times, Neg, Pow, Exp,
Log, Relu, Sum }` with per-node top-level rule functions).
*No small workaround*: the compiler wants the overload set to cover the
static type; recovering the interpreter's behaviour means a `typecase`
dispatcher — but see G9.

### G9 — `typecase` gives a **different (wrong) answer** on the compiled path

*Minimal construct* (`probes/p33.fss`):
```fortress
x: Any = 5
y = typecase x of  ZZ32 => 1  else => 0  end
println("p33 " y)
```
| interpreter | compiled |
|---|---|
| `p33 1` | `p33  0` |

No error, no warning — the compiled program silently takes the `else`
branch. The integer literal is carried as `IntLiteral`, not `ZZ32`, so the
`typecase` arm misses. This is the most dangerous item in the catalog: it is
a *silent* semantic divergence, and it also removes the natural workaround
for G8.

### G10 — `case x of <int literal>` throws at runtime

*Minimal construct* (`probes/p36.fss`):
```fortress
x = 5
y = case x of  5 => 1  else => 0  end
```
Compiles clean, then at run time:
```
FortressException: class fortress.CompilerBuiltin$CompilerFailureDetectedAtRunTime
  with string Compiler failure detected at runtime
  at fortress.CompilerBuiltin$IntLiteral$DefaultTraitMethods.=?0(
     …/LibraryBuiltin/CompilerBuiltin.fss:835)
```
Interpreter: `p36 1`. `CompilerBuiltin.fss:833-838` deliberately stubs the
whole `IntLiteral` comparison family:
```fortress
opr >(self, other:IntLiteral): Boolean = throw CompilerFailureDetectedAtRunTime
opr >=(self, other:IntLiteral): Boolean = throw CompilerFailureDetectedAtRunTime
opr =(self, other:IntLiteral): Boolean = throw CompilerFailureDetectedAtRunTime
opr =/=(self, other:IntLiteral): Boolean = throw CompilerFailureDetectedAtRunTime
opr juxtaposition(self, other:IntLiteral): IntLiteral = throw CompilerFailureDetectedAtRunTime
opr BITNOT(self): IntLiteral = throw CompilerFailureDetectedAtRunTime
```
*Apparent small workaround*: annotate the scrutinee (`x: ZZ32 = 5`) so it is
never an `IntLiteral`.

### G11 — `label` / `exit` is unimplemented in codegen (`sayWhat`)

*Minimal construct* (`probes/p31.fss`):
```fortress
r = label L
      for i <- seq(1#10) do if i = 5 then exit L with i end end
      0
    end L
```
*Exact error* — **the only true codegen failure found**:
```
Exception in thread "main" com.sun.fortress.exceptions.CompilerError:
…/p31.fss:4:7-7:6:
    Can't compile Label at …/p31.fss:4.7
	at com.sun.fortress.compiler.codegen.CodeGen.sayWhat(CodeGen.java:1552)
	at com.sun.fortress.compiler.codegen.CodeGen.sayWhat(CodeGen.java:1557)
```
Interpreter: `p31 5`. None of the six targets uses `label`, so this does not
block them — it is recorded because it is the canonical `sayWhat` the old
notes refer to, and it bounds how far codegen actually gets.

### G12 — `spawn` produces an unusable thread handle

*Minimal construct* (`probes/p32.fss`): `t = spawn do 40 + 2 end; t.val()`
*Exact error:*
```
…/p32.fss:5:18-23:
    No such method Thread[\IntLiteral\].val.
```
`object Thread[\T\](fcn:()->T)` is declared only in
`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:209` /
`FortressBuiltin.fss:688` — the *interpreter* builtin. Neither
`CompilerBuiltin` nor `CompilerLibrary` declares it, so `spawn`'s result type
has no reachable methods on the compiled path.
*Note*: implicit tuple parallelism `(a, b) = (f(), g())` **does** work
compiled (`probes/p12.fss`, and §1a's `tpar2` exercises it at scale), as does
`atomic do … end` (`probes/p13.fss`). Only explicit `spawn` is stranded.

---

## 3. What *does* work on the compiled path

Verified compile+run, correct results (probe file in parentheses):

* user `object` with `var` fields and mutating methods (`p01`)
* `opr +(self, o)` and `opr juxtaposition(self, o)` methods on a user object
  (`p02`, `p03`) — provided every getter/field declaration precedes every
  method declaration (that ordering rule is enforced on **both** paths, so
  it is not a compiler gap)
* `opr ^(self, n: RR64)` and unary `opr -(self)` on a user object (`p04a`, `p04b`)
* `for i <- seq(1#n)` with a mutable `RR64` accumulator (`p07`)
* `assert(cond, msg)` (`p08`)
* `|x|`, `x^n`, `MIN`/`MAX` on `RR64` (`p21`)
* implicit tuple parallelism `(a, b) = (f(), g())` (`p12`)
* `atomic do … end` (`p13`)
* recursive `self.method(...)` on a mutable object (`p16`)
* generic user `object Box[\T\](v: T)` (`p19`)
* generic function `f[\T\](x: T): T` (`p30`)
* `while` (`p34`), `try/catch` (`p35`)
* `typecase` — *compiles and runs, but see G9 for the wrong answer*

---

## 4. Where the leverage is

Ordered by (targets unblocked) ÷ (apparent effort):

1. **G5 `nanoTime`** and **G6 `|||`→`||`** are one-line library edits. G6 in
   particular is the difference between "output differs everywhere" and
   "output matches"; G5 alone unblocks `tparallel` and buys a measured 5.6×.
2. **G3 `exp`/`log`** is a small additive job (bind two more `j…` natives
   next to the existing `SQRT`) and is needed by four of the six targets.
3. **G1 + G2 + G4** — generic `Generator[\T\]`/`Reduction[\R\]` plumbing at
   the `CompilerLibrary` level, then `array`, then `List` — are the real
   work. They are one project, not three: `CompilerBuiltin` already has the
   generic `Generator[\E\]`/`Reduction[\R\]`/`Option` traits; what is missing
   is the ~4,000 lines of `FortressLibrary` built on top of them.
4. **G9** should be treated as a correctness bug independent of the rest —
   silent wrong answers are worse than the compile errors.

The prize, on this corpus's own shape: **~6.8× on scalar loops, ~8.9× on
object-allocating autodiff-style code, ~8× on startup.**

---

## Artifacts

* `explorations/compiler-probes/*.fss` — the minimal probes (p01–p36,
  bench1/2, tpar2, ctrl1), committed alongside this report
* Full per-target compile-error dumps and side-by-side outputs lived in the
  producing session's scratchpad; the essential error text is quoted inline
  above.
