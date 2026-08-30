<!-- Produced by a delegated clean-room research worker, 2026-08-30, on Pavol's
     challenge to the "SUM is sealed" claim. The worker was blinded: barred from
     reading explorations/*.md analysis documents, briefed only with the goal and
     the build environment. Probes: explorations/sum-probes/ (p00-p22 with
     captured transcripts); library patches referenced are session-local
     experiments, not applied to the tree. -->

# `SUM` over a user-defined type in Fortress — clean-room experiment

**Environment.** Walk interpreter, worktree `/home/user/fortress/.claude/worktrees/agent-a57c5c713053ca19b`, JDK 25, `FORTRESS_THREADS=1`, prebuilt classes copied from the main checkout. `./run.sh <probe>.fss` runs one probe; `./runall.sh` runs the pure-user-space set (recorded output: `probe-transcript.txt`); `./runpatched.sh` runs the library-patch set (`patched-transcript.txt`). Nothing in `explorations/` was read. Nothing in the main checkout was touched.

Line references to `Library/FortressLibrary.fss` / `.fsi` are to the **pristine** file (git `HEAD`; copy saved as `FL.pristine.fss`). The worktree currently has `sum-extensible.patch` applied — `git checkout -- Library/` plus `rm -rf default_repository/caches/*` restores it.

---

## Verdict

**Yes — `SUM[v <- vs] v` over a user-defined type works in pure user space, and the numeric `SUM` keeps working in the same program.** It costs the user one non-obvious line:

```fortress
import FortressLibrary.{...} except { opr BIG + }
```

plus one reduction object and two `opr SUM` declarations. Probe `p15_full_sum.fss`: 12/12 cases pass — empty, singleton, filtered, nested, two-generator, and mixed V/numeric expressions.

The reason a plain *overload* does not work — and the reason the `except` trick is needed — is precise and reproducible: a reduction expression desugars into a call to the **nullary** (nofix) declaration of the big operator, and Fortress overloading is decided on **value** parameter lists only. Two nullary `SUM`s therefore always collide. Verbatim (`p02_sum_overload.fss`):

```
Overloading of BIG +[\T extends FortressLibrary.Number\]():Comprehension[\T,FortressLibrary.Number,FortressLibrary.Number,FortressLibrary.Number\]
  /…/Library/FortressLibrary.fss:3041:1-3042:85
and BIG +():BigReduction[\V,V\] ()->BigReduction[\V,V\]
  /…/p02_sum_overload.fss:20:1-67
fails because their parameter lists have the same types
```

So Fortress's "grow the language" claim survives here, but only because the component system lets you *hide* a library name — not because the big operator is per-type extensible. Extensibility by **addition** is impossible for a big-operator name; extensibility by **replacement** works.

Part 2 is still interesting, because the user-space fix costs you the library's `SUM` in that component. A `+45/-4` line patch to `FortressLibrary.fss` (`+13/-2` in the `.fsi`) makes the shipped `SUM` element-driven so no `except` is needed — and produced a **surprise finding**: the library cannot call the user's `opr +` at all, because operator overload sets are component-scoped. That forced the patch to route through a dotted method, which *is* dispatched on the object and therefore crosses the component boundary.

---

## Background: what `SUM` actually is

1. **`SUM` is spelled `BIG +` internally.** `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:252-253`

   ```
   transient Op SUM = "SUM"
        { yyValue = NodeFactory.makeOpBig(createSpan(yyStart,yyCount), "BIG +"); };
   ```

   Same mapping for *declarations* at `ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:129`. Accumulator production: `Symbol.rats:259-266` (`Accumulator ::= SUM / PROD / BIG w (Encloser / Op)`), matching `Specification/basic/expressions/reductions.tex:15-19`. Every error message about our `SUM` says `BIG +` — see `p02`.

2. **A reduction expression desugars to a nullary operator call.** `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:358-373`:

   ```java
   Expr opexp = ExprFactory.makeOpExpr(span, op, staticArgs);   // SUM, NO value args
   res = ExprFactory.make_RewriteFnApp(span, BIGOP_NAME,        // __bigOperator
             ExprFactory.makeTupleExpr(span, opexp, body));
   ```

   `Evaluator.forOpExpr` (`.../interpreter/evaluator/Evaluator.java:819-877`) applies that `OpExpr` to its (empty) argument list. Spec side: `Specification/advanced/parallelism-locality/defining-generators.tex:196-220` ("the wrapper function is the corresponding big operator definition") and `Specification/advanced/subscripting.tex:114-122`.

3. **The library's `SUM` is hard-wired to `Number`.** `FortressLibrary.fss:3021-3039` and `3041-3045`:

   ```fortress
   object SumReduction extends { CommutativeMonoidReduction[\Number\], ... }
       empty(): Number = 0
       join(a: Number, b: Number): Number = a+b
   end

   opr SUM[\T extends Number\](): Comprehension[\T,Number,Number,Number\] =
       Comprehension[\T,Number,Number,Number\](fn x => x, SumReduction, cast[\Number\])

   opr SUM[\T extends Number\](g: Generator[\T\]) =
       __bigOperatorSugar[\T,Number,Number,Number\](SUM[\T\](), g)
   ```

   Since `object Comprehension[\I,O,R,L\](unwrap: R->O, reduction, body: I->R)` (`FortressLibrary.fss:2978`), the **body applied to every generated element is `cast[\Number\]`**, and `cast` is a plain `typecase` with no coercion (`FortressLibrary.fss:33-38`). That single `cast[\Number\]` is what rejects a `V`; every "`CastError` at `FortressLibrary.fss:36`" in the transcript is that line.

4. **The reduction machinery is fully public and fully type-agnostic**: `trait Reduction[\L\]` (2835), `ActualReduction` (2852), `MonoidReduction` (2952), `CommutativeMonoidReduction` (2957), `trait BigOperator[\I,O,R,L\]` (2967), `object BigReduction` (2973), `object Comprehension` (2978), `__bigOperatorSugar`/`__bigOperator` (1114/1118) — all exported by `FortressLibrary.fsi`.

---

## Part 1 — pure user space (no library, no interpreter edits)

### 1.0 Baseline: a *new* big operator over a user type works perfectly

`p01_own_bigop.fss` — `opr BIG OPLUS` over `object V(data: RR64)`:

```
BIG OPLUS over list      = V(6.5)
BIG OPLUS mapped index   = V(6)
BIG OPLUS empty          = V(0.0)
BIG OPLUS sugar          = V(6.5)
```

Nothing about user types, generators or reductions is the obstacle. The obstacle is the *name* `SUM`.

### 1.1 What stops the obvious overload

| attempt | probe | result |
|---|---|---|
| `opr SUM(): BigReduction[\V,V\]` alongside the library's nullary `SUM` | `p02` | **static error**, verbatim above: "*their parameter lists have the same types*" (`.../interpreter/evaluator/values/OverloadedFunction.java:566-577`) |
| only the unary sugar overload `opr SUM(g: Generator[\V\]): V` | `p03` | **accepted**; `SUM vs` = `V(6.5)`, numeric `SUM [i<-0#5] i` = 10 — but `SUM [v <- vs] v` still hits the library nullary and dies `CastError` at `FortressLibrary.fss:36` |
| explicit static args `SUM[\V\] [v <- vs] v` | `p04` | bound `T extends Number` is **not enforced** by the interpreter, but the returned `Comprehension`'s body is still the hard-coded `cast[\Number\]` ⇒ `CastError` |
| declare `opr SUM()` **locally** inside a block, hoping for shadowing | `p05` | `Operator declarations are not allowed in block expressions.` (spec agrees: `Specification/advanced/operator-definitions.tex:17-19`) |

The collision is not an interpreter quirk. The nullary form is a *nofix* operator declaration, which the spec requires to have **no parameters** (`Specification/advanced/operator-definitions.tex`, §Nofix Operator Declarations: "The declaration must have no parameters."). Two parameterless declarations of one name can never be distinguished, and `Specification/basic/overloading.tex:99-105` closes the escape hatch of differing static parameters:

> Although there may be multiple declarations with the same functional name, it is an error for their static parameters to differ (up to α-equivalence), or for one declaration to have static parameters and another to not have them. Hence, static parameters do not enter into the determination of which declarations are applicable.

Fixity is no escape either (`overloading.tex:87-88`): nullary is nofix, and there is only one nofix.

*(The interpreter is laxer than the spec here — `p03`/`p11` show it accepts a unary overload whose static parameters differ from the library's. The library itself violates the same rule, e.g. `opr BIG //()` with no static parameters vs `opr BIG //[\T\](g: …)` at `FortressLibrary.fsi:1998-2000`.)*

### 1.2 Two more avenues, blocked by the spec but *not* by the interpreter

**(a) Make `V` a `Number`.** `p07_v_extends_number.fss` — `object V(data: RR64) extends Number` with `asFloat`, and `SUM [v <- vs] v` prints **`V(6.5)`**. It *runs*, but it is not legal Fortress:

- `FortressLibrary.fss:349-352` / `FortressLibrary.fsi:273-276`: `trait Number … comprises { RR64 }`, with no `...`.
- `Specification/basic/traits.tex:231-235`: "*If a trait declaration of T includes a comprises clause then the traits listed in its comprises clause are exactly the traits that immediately extend T*".
- The check exists — `.../scala_src/typechecker/TypeHierarchyChecker.scala:203-208` ("Invalid comprises clause: … has a comprises clause but its immediate subtype … is not eligible to extend it") — but is **never run by the interpreter**: `Shell.java:420-424` (`walk` sets the interpreter phase order and does *not* call `setTypeChecking(true)`), and `compiler/StaticChecker.java:166` gates the whole checker on `Shell.getTypeChecking()`. This route is an artifact of the walk path skipping static checking; an adversarial reviewer should reject it, and I do.

**(b) Coercion `V → Number`.** Not available to a user: `Specification/basic/conversions-coercions.tex:176-178` — "*To declare that trait U allows a coercion from type T, the declaration of trait U must provide a coercion declaration whose parameter type is T*". `Number` is library-owned. And even if it existed it would not help: `SUM`'s body is `cast[\Number\]`, a `typecase`, and `typecase` is not among the coercion contexts at `conversions-coercions.tex:98-110`.

### 1.3 A working but ugly user-space route: overload `__bigOperator`

`p08_hijack_bigoperator.fss`. Leave the library's `SUM` alone; overload the desugaring target instead, dispatching on the concrete `Comprehension` that `SUM[\V\]()` returns:

```fortress
__bigOperator(o: Comprehension[\V,Number,Number,Number\],
              desugaredClauses:(Reduction[\V\],V->V)->V): V = do
    r = VSumReduction
    desugaredClauses(r, fn (x:V):V => x)
  end
```

```
SUM[\V\] [v <- vs] v = V(6.5)
builtin SUM          = 10
```

It works — but **only with explicit static args**. Without them (`p09`) it fails with the usual `CastError`, because a nullary generic call has nothing to infer from and the interpreter binds the type parameter to ⊥: `.../interpreter/evaluator/EvaluatorBase.java:242-246`

```java
for (StaticParam tp : tparams) {
    FType t = abm.get(NodeUtil.getName(tp));
    if (t == null) t = BottomType.ONLY;
```

so the runtime object is `Comprehension[\⊥,Number,Number,Number\]`, matching neither `Comprehension[\V,…\]` (`p09`) nor `Comprehension[\Number,…\]` (`p10`, whose hijack never fires) — object static parameters are invariant and ⊥ is not denotable in source.

### 1.4 The clean user-space route: `except`-import, then declare `SUM` yourself

`Specification/basic/components/source-code.tex:64-93` gives the import grammar

```
ImportedNames ::= APIName . { ... } [except SimpleNames]
SimpleName    ::= opr [BIG] (Encloser | Op)
```

and `:234-241` says exactly what we want:

> This form permits an `except` clause, which lists names that are *not* permitted to be used unqualified by that import-unqualified statement (it may be permitted by a declaration in the importing component or API …).

`p19_except_removes.fss` confirms the mechanism in isolation — with `import FortressLibrary.{...} except { opr BIG + }` and no local declaration, `SUM [i <- 0#5] i` fails with `Operator BIG + is not defined.` Implementation: `.../interpreter/Driver.java:297-318` (`ImportStar` → `getExceptNames()`; names in the set are never injected). Default implicit imports are `{ AnyType, FortressLibrary, FortressBuiltin }` (`compiler/WellKnownNames.java:48-49`); the explicit `except` import suppresses the name in this component only — `p18_except_side_effects.fss` shows `strToInt`, `strToFloat` (which use `SUM` *inside* the library, `FortressLibrary.fss:4180`, `4196`), `PROD`, `BIG MAX`, `BIG ||`, list comprehensions and infix `+` all still work.

**Gotcha:** it must be spelled `opr BIG +`. `except { opr SUM }` is a `Syntax Error` (`p20_except_spelling_sum.fss`) — the import grammar's `SimpleName` does not include the `SUM` alias that `Parameter.rats:129` provides for declarations.

**Caveat on spec conformance:** `Specification/basic/components/apis.tex:176` says the Fortress core APIs "are implicitly imported"; the spec never states that writing an explicit `import FortressLibrary.{...} except {…}` supersedes the implicit import. The interpreter behaves as though it does (`p19`). The intent is clearly supported by the `except` prose above, but this is the one place where the route leans on implementation behaviour beyond the letter of the spec.

#### The program a user must write — `p15_full_sum.fss`

```fortress
component p15_full_sum
import FortressLibrary.{...} except { opr BIG + }
import List.{...}
export Executable

object V(data: RR64)
    getter asString(): String = "V(" data ")"
    opr +(self, other: V): V = V(data + other.data)
    opr =(self, other: V): Boolean = data = other.data
end

(* PolySumReduction's identity element is the numeric 0 (it cannot know V's
   own zero), so V must accept 0 as a left/right identity for +. *)
opr +(z: ZZ32, v: V): V = V(z + v.data)
opr +(v: V, z: ZZ32): V = V(v.data + z)

object PolySumReduction extends CommutativeMonoidReduction[\Any\]
    getter asString(): String = "PolySumReduction"
    empty(): Any = 0
    join(a: Any, b: Any): Any = a + b
end

opr SUM[\T\](): BigReduction[\Any,Any\] =
    BigReduction[\Any,Any\](PolySumReduction)

opr SUM[\T\](g: Generator[\T\]) = SUM [x <- g] x
```

That last line is literally the spec's own equivalence (`reductions.tex:80-90`: "*the reduction expression `Σ a` is equivalent to `Σ[x ← a] x`*") written as user code. Writing it via `__bigOperatorSugar` instead runs into `Generator`'s invariance — `p17_generic_sugar_diag.fss` records both failures verbatim, e.g. `Unification error: … __bigOperatorSugar param 2 (g:Generator[\Any\]) got arg ArrayList[\Int\]`.

Output — every case, mixed numeric and user-typed:

```
1  SUM [v <- vs] v            = V(6.5)
2  SUM [i <- 0#4] f(i)        = V(14)
3  SUM [v <- one] v (single)  = V(7.25)
4  SUM vs (sugar form)        = V(6.5)
5  numeric SUM [i <- 0#5] i   = 10
6  numeric SUM over RR64      = 4.0
7  numeric SUM, empty         = 0
8  V SUM, empty (gives ZZ32 0)= 0
9  filtered SUM over V        = V(5.5)
10 V and numbers in one expr  = 12.5
11 nested SUM over V          = V(9)
12 SUM over a 2-generator box = V(9)
```

Two honest caveats:

- **Line 8.** `SUM` over an *empty* `V` generator returns numeric `0`, not `V(0.0)`. Unavoidable for a single polymorphic `SUM`: the identity comes from `Reduction.empty()`, which sees no element and gets no static type. If you want a correct identity you must give up sharing the name — `p12_userspace_demo.fss` keeps the library `SUM` and adds only the *unary* overload for `V`; its `SUM none` correctly prints `V(0.0)`, but then `SUM [v <- vs] v` is unavailable and you write `SUM <| f(i) | i <- 0#5 |>` instead (8/8 cases pass there).
- **The two `opr +(ZZ32, V)` lines** exist only so the numeric identity `0` can seed a `V` reduction (the filtered case, line 9, hits `join(0, V)`). The Part 2 patch removes this need via a `SumZero` sentinel.

#### Unicode Σ does not work at all — pre-existing, not our doing

`p13_unicode_sigma.fss`, pure library, no user code:

```
/…/p13_unicode_sigma.fss:11:44:
    Operator prefix SUM is not defined.
```

U+2211 lexes to a **prefix** operator whose canonical name is `SUM` (`parser_util/precedence_resolver/Operators.java:2082` maps `∑` ↔ `SUM`), whereas the accumulator production (`Symbol.rats:252-266`) matches the literal ASCII text `"SUM"`. In this implementation only the ASCII spelling is a big operator — contradicting the spec grammar `reductions.tex:19` (`Accumulator ::= Σ | Π | BIG (Encloser | Op)`). The file fails to parse, so even the ASCII line beside it never runs.

---

## Part 2 — with modification: the smallest library change

Applied patch: **`sum-extensible.patch`** — `Library/FortressLibrary.fss` +45/−4, `Library/FortressLibrary.fsi` +13/−2 (≈20 of the added `.fss` lines are doc comments; ≈31 are code). It is applied in the worktree right now. It replaces the two `SUM` declarations at `FortressLibrary.fss:3041-3045` with an element-driven reduction and adds two small declarations.

### The surprise: the library cannot call the user's `opr +`

My first attempt (**`sum-any-naive.patch`**, kept here, *not* applied) was the minimal thing — 10 lines:

```fortress
object AnySumReduction extends { CommutativeMonoidReduction[\Any\] }
    empty(): Any = 0
    join(a: Any, b: Any): Any = a + b
end
opr SUM[\T\](): Comprehension[\T,Any,Any,Any\] =
    Comprehension[\T,Any,Any,Any\](fn x => x, AnySumReduction, identity[\Any\])
opr SUM[\T\](g: Generator[\T\]) = SUM [x <- g] x
```

Numeric `SUM` keeps working (`10`), `V` does not (`p22_naive_patch_probe.fss`):

```
numeric SUM [i <- 0#5] i = 10
ProgramError: /…/Library/FortressLibrary.fss:3044:33:
Failed to find any matching overload, args = (V,V), overload = {
        AdditiveGroup[\T extends AdditiveGroup[\T\]\]…+(self:AdditiveGroup[\T\],other:T):T…
        +(self:(Number & {RR64}),b:Number):RR64…
        … (18 library +'s, none of them V's) … }
```

`V`'s own `opr +` is **not in the list**. Operator overload sets are scoped to the component that declares them, and `FortressLibrary` does not import the user's component (import/injection logic: `interpreter/Driver.java:262-345`). A big operator implemented in the library therefore *cannot* dispatch to a user-defined operator, no matter how the types are relaxed. This is exactly why Part 1's route had to put `join(a,b) = a + b` in the *user's* component.

The way across the boundary is a **dotted method**, looked up on the receiver object. Hence the patch:

```fortress
object SumZero
    getter asString(): String = "0"
end

trait SumJoinable
    sumJoin(other: Any): Any
end

object AnySumReduction extends { CommutativeMonoidReduction[\Any\] }
    getter asString(): String = "AnySumReduction"
    empty(): Any = SumZero
    join(a: Any, b: Any): Any =
        typecase a of
            SumZero => b
            x:SumJoinable =>
                typecase b of
                    SumZero => a
                    else => x.sumJoin(b)
                end
            else =>
                typecase b of
                    SumZero => a
                    else => cast[\Number\](a) + cast[\Number\](b)
                end
        end
end

__unwrapSumZero(x: Any): Any =
    typecase x of SumZero => 0 else => x end

opr SUM[\T\](): Comprehension[\T,Any,Any,Any\] =
    Comprehension[\T,Any,Any,Any\](__unwrapSumZero, AnySumReduction, identity[\Any\])

opr SUM[\T\](g: Generator[\T\]) = SUM [x <- g] x
```

`SumZero` replaces numeric `0` as the reduction identity so a `V` sum is never seeded with a number; `__unwrapSumZero` turns a completely empty `SUM` back into `0`, preserving the numeric contract.

### What the user then writes — `p21_patched_library.fss`

No `except` import, no `opr SUM` in user code:

```fortress
object V(data: RR64) extends SumJoinable
    getter asString(): String = "V(" data ")"
    opr +(self, other: V): V = V(data + other.data)
    sumJoin(other: Any): Any = self + cast[\V\](other)
end
```

```
1  SUM [v <- vs] v            = V(6.5)
2  SUM [i <- 0#4] f(i)        = V(14)
3  SUM [v <- one] v (single)  = V(7.25)
4  SUM vs (sugar form)        = V(6.5)
5  numeric SUM [i <- 0#5] i   = 10
6  numeric SUM over RR64      = 4.0
7  numeric SUM, empty         = 0
8  V SUM, empty               = 0
9  filtered SUM over V        = V(5.5)
10 V and numbers in one expr  = 12.5
11 nested SUM over V          = V(9)
12 SUM over a 2-generator box = V(9)
13 strToInt("1234")           = 1234
14 strToFloat("12.5")         = 12.5
15 PROD [i <- 1#5] i          = 120
16 BIG MAX [i <- 0#5] i       = 4
```

A type that does *not* extend `SumJoinable` fails safely at `cast[\Number\]` with the old `CastError` — behaviour is unchanged for everything that worked before.

### Regression check

`ant` was not run (per instructions). Instead I ran every interpreter test in `ProjectFortress/tests` that mentions `SUM` — `simpleSum`, `setSum`, `simpleBig`, `naiveSeq`, `restTest`, `restTest2`, `restTest2a`, `Generator2Test`, `PureListQuick`, `ArrayListQuick` (plus `WordCountSmall`) — under the pristine library (`baseline.out`) and under the patch, wiping caches between. Outputs are **byte-identical** modulo two `Succeeded in 0.4xs` timing lines. `./regress.sh` reproduces.

Not checked: the compiler path (`fortress compile`). The patch changes `SUM`'s declared type from `Number` to `Any`, which the static typechecker and the bytecode backend would certainly notice. This is an interpreter-path demonstration, not a shippable change.

### Characterizing the change

- **`cast[\Number\]` in `SUM`'s body and `SumReduction`'s `Number` typing (`FortressLibrary.fss:3021-3042`) are a library-design choice.** The reduction machinery is entirely type-agnostic; `SUM` narrows it on purpose — the comment at `FortressLibrary.fss:3020` reads "*Hack to permit any Number to work non-parametrically*". Removing the narrowing is a ~30-line edit and costs static typing of `SUM` (`Number → Any`).
- **Component-scoped operator overload sets are an architectural property**, not a bug — it is what makes separate compilation of components meaningful — but it means *no* library-side big operator can ever dispatch to a user's operator symbol. Any extensible-`SUM` design must route through a trait method, as this patch does.
- **The nullary/nofix desugaring of big operators is a language-design limit.** `Specification/advanced/operator-definitions.tex` (nofix: no parameters) plus `Specification/basic/overloading.tex:99-105` (static parameters do not select declarations) mean a big-operator name is a *single* declaration. No library change lifts that; only `except`-and-redeclare (Part 1) or a spec change — which the spec's own footnote at `defining-generators.tex:214-219` anticipates: "*In future, it is likely that Fortress will use a desugaring that in fact yields a `Generator` rather than a higher-order function. This permits type-directed nesting and composition of generators.*"

---

## Probe index

`p00`–`p20` ran against the **pristine** library (`probe-transcript.txt`); `p21`, `p22` need a patch (`patched-transcript.txt`).

| file | what it tests | result |
|---|---|---|
| `p00_hello.fss` | environment smoke test | `builtin SUM = 10` |
| `p01_own_bigop.fss` | user-defined `BIG OPLUS` over `V` | all 4 cases pass |
| `p02_sum_overload.fss` | overload nullary + unary `SUM` for `V` | **static error**, "same parameter lists" |
| `p03_sum_unary_only.fss` | only the unary `SUM` overload | `SUM vs` ✔, `SUM [v<-vs] v` ✘ `CastError` |
| `p04_static_args.fss` | `SUM[\V\] [v<-vs] v` on the stock library | ✘ `CastError` at `FortressLibrary.fss:36` |
| `p05_local_sum.fss` | block-local `opr SUM()` | ✘ "Operator declarations are not allowed in block expressions." |
| `p07_v_extends_number.fss` | `V extends Number` (violates `comprises`) | runs — `V(6.5)` — but spec-illegal; checker disabled in `walk` |
| `p08_hijack_bigoperator.fss` | user overload of `__bigOperator` | `SUM[\V\] [v<-vs] v = V(6.5)` + numeric `SUM` = 10 |
| `p09_hijack_nostaticargs.fss` | same without static args | ✘ `CastError` (type param binds to ⊥) |
| `p10_default_instantiation.fss` | which instantiation the nullary `SUM` gets | `Comprehension[\Number,…\]` hijack never fires ⇒ ⊥ |
| `p11_unary_matched_staticparams.fss` | unary overload with α-matching static params | `SUM vs = V(6.5)`, numeric `SUM` = 10 |
| `p12_userspace_demo.fss` | best result *without* `except` | 8/8: empty `V(0.0)`, singleton, comprehension, mixed |
| `p13_unicode_sigma.fss` | Unicode `∑` as accumulator (library only) | ✘ "Operator prefix SUM is not defined." |
| `p14_import_except.fss` | `except { opr BIG + }` + own nullary `SUM` | `SUM [v <- vs] v = V(6.5)` |
| `p15_full_sum.fss` | **the answer**: one `SUM` for `V` *and* numbers | 12/12 |
| `p16_library_sugar.fss` | does the library's own `SUM g` work on a List | yes (`6`; `ab`) |
| `p17_generic_sugar_diag.fss` | `Generator` invariance in the sugar form | 4/4 after using `BIG OPLUS [x <- g] x` |
| `p18_except_side_effects.fss` | does `except` break the rest of the library | no: 7/7 |
| `p19_except_removes.fss` | `except` really removes `SUM` | ✘ by design: "Operator BIG + is not defined." |
| `p20_except_spelling_sum.fss` | `except { opr SUM }` spelling | ✘ `Syntax Error` — must write `opr BIG +` |
| `p21_patched_library.fss` | library patch; user writes only `V` + `sumJoin` | 16/16 |
| `p22_naive_patch_probe.fss` | naive `join(a,b)=a+b` in the library | ✘ "Failed to find any matching overload, args = (V,V)" |

Support files in the same directory: `run.sh`, `runall.sh`, `runpatched.sh`, `regress.sh`, `probe-transcript.txt`, `patched-transcript.txt`, `baseline.out`, `patched.out`, `FL.pristine.fss`, `FortressLibrary.fss.orig`, `FortressLibrary.fsi.orig`, `sum-extensible.patch`, `sum-any-naive.patch`.