<!-- Whether the team's commented generic `distribute`, made live beside the method `where` conditions on `SumReduction`'s `MAX` and `MIN` overloads, clears the fusion's two return-type errors: it does only when its result is written over its own static parameter `K` rather than `R`, and then walk keeps every answer and the fused path for the three fused pairs, but nested reductions over a generator of generators that have no fused pair stop under walk. -->

The probe worker returned this text when the harness refused it a report file; the coordinating session wrote it here unchanged on 2026-10-16. The worktree `/home/user/fortress-probe-distribute` holds the variants, their scripts and the checker shadow.

# The team's generic `distribute` and the fusion's two return-type errors: a measurement

This is a measurement probe on the branch `wip/probe-generic-distribute`, in the worktree `/home/user/fortress-probe-distribute`, cut from `main` at `07c83a40a` and seeded from the base build `/home/user/fortress-base16` (`528438ac5`). The edits are uncommitted in the worktree, which is left with the checker shadow and library variant L4 with G0 applied (section 2). Every patch is quoted below.

**`main` is not the base's code.** The brief says `main` has changed no code since `528438ac5`. It has: climb batch 16's four rungs landed on `main` before the brief (`ee6bfcb8d`, `d2fe4e1d9`, `c23b85fdc`, `9879d4386`; `git diff --name-only 528438ac5 main -- ProjectFortress/src ProjectFortress/astgen build.xml` lists 976 files). So the seeded build was the base's, and I rebuilt the worktree (`ant compileAll`, "Caches ... started again, empty", "BUILD SUCCESSFUL", "Total time: 1 minute 19 seconds") and ran the library order (five compiles, each `rc=0`, five jars). The batch 16 gate's own distance stage on `main` printed `#total 49`, and its sites equal `explorations/compile-ladder/gate/distance-sites.tsv` once the members of one union are sorted (`OR(O0,I0)` against `OR(I0,O0)`). So the site file is a fair base for `main`.

Everything ran under `nice -n 19`, one JVM of mine at a time, each started with at least 6 GB available (`free -g`). Machine: `nproc=4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=1`. No timing here is one to compare.

## 1. In short

| Question | Answer |
|---|---|
| Do the 2 return-type errors clear? | **Only if the generic's result is written over `K`**, `PossibleReductionPair[\K\]` with body `NoReductionPair[\K\]`, in place of the `Any` method. The team's text as written, `PossibleReductionPair[\R\]`, does not clear them, whether it replaces the `Any` method or sits beside it: the errors move from the `Any` method to the generic. |
| The distance | 49 to **42** with variant L4: the generic over `K`, `leftDistribute` and `rightDistribute` given the same `K`, and the two `where` conditions. Exactly the fusion's 6 sites go, and nothing is new; a 7th site, `FortressLibrary.fss:130`, goes with the checker shadow alone (row 737's order, section 4). Without the change to `leftDistribute` and `rightDistribute` (variant L3): 49 to 44, because those two then call `distribute` with a `Reduction[\R\]`, which the generic does not take. |
| Walk answers | Unchanged with L3 or L4 and Generator2 as it is (G0). `GeneratorDeclarations` passes, with its fused maxima 6, 4, 6, 4 and 5. `Generator2Test` prints `res = 46, ggres = 46`, `15, 15` and `8, 8`. `ExclusionRemainderRungH` passes. microGPT's quick pair passes 7 of 7 each. |
| Does walk still take the fused path? | **Yes, with G0**, for `MAX` and `MIN` over `SUM` and for `SUM` over `PROD`. Walk prints the team's own trace "use efficient implementaion" exactly where the base prints it (twice in `GeneratorDeclarations`). |
| What walk loses | With the `Any` method gone, a nested reduction over a generator of generators whose inner reduction has no fused pair now stops under walk. `SUM` of `SUM`s over `inits` gave 11 and now stops with "Failed to find any matching overload"; `MAX` of `MAX`es gave 3 and now stops with row 21's "Unification error". No test in the suite reaches this. |
| The team's other commented line, `r.distribute[\L1\](q)` in `Generator2.distributes` (G1) | Under walk it stops every fused pair with the team's 2009 error, "Don't actually resolve overloading of generic methods yet." `GeneratorDeclarations` fails. This is a new walk defect (section 8). |
| The generic beside the `Any` method (L1) | Under walk it stops **every** program at load, `explorations/claude_demo.fss` included: "This should have been an environment with a Top Level". |

## 2. What I built

**The checker.** I applied only the method-condition part of the earlier probe's shadow (`explorations/perf-probes/where-clauses/REPORT.md` section B.2): `KindEnv.constraintBounds` with its two callers, and the fold in `STypesUtil`. I left out B.1's opened type variables and B.3's conditional extension. Neither file changed between `528438ac5` and `main`, and the code is the earlier probe's own, byte for byte. I built it with `ant compileAll`, the skill's way.

```diff
--- a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala
@@ -47,3 +47,4 @@ (extend(node, where))
     val nodeBindings = KindEnv.extractNodeBindings(node)
-    new NestedKindEnv(this, whereBindings ++ nodeBindings)
+    val declared = whereBindings ++ nodeBindings
+    new NestedKindEnv(this, declared ++ KindEnv.constraintBounds(this, declared, where))
@@ -55,3 +56,4 @@ (extend(nodes, where))
     val nodesBindings = nodes.flatMap(KindEnv.extractNodeBindings)
-    new NestedKindEnv(this, whereBindings ++ nodesBindings)
+    val declared = whereBindings ++ nodesBindings
+    new NestedKindEnv(this, declared ++ KindEnv.constraintBounds(this, declared, where))
@@ -105,2 +107,22 @@ object KindEnv
+  def constraintBounds(outer: KindEnv, declared: Iterable[KindBinding],
+                       where: Option[WhereClause]): Iterable[KindBinding] = where match {
+    case Some(SWhereClause(_, _, constraints)) =>
+      val scope = new NestedKindEnv(outer, declared)
+      val byName = constraints.collect { case SWhereExtends(_, name, supers) => (name, supers) }
+      val names = byName.map(_._1).foldLeft(List[Id]())((acc, n) =>
+        if (acc.exists(_.getText == n.getText)) acc else acc :+ n)
+      names.flatMap(n => scope.lookup(n) match {
+        case Some(KindBinding(bn, sp)) if sp.getKind.isInstanceOf[KindType] =>
+          val extra = byName.filter(_._1.getText == n.getText).flatMap(_._2)
+          val supers = toListFromImmutable(sp.getExtendsClause) ++ extra
+          List(KindBinding(bn, NF.makeStaticParam(sp, sp.getName.asInstanceOf[Id], toJavaList(supers))))
+        case _ => Nil
+      })
+    case _ => Nil
+  }
--- a/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala
@@ -188,3 +188,21 @@
-      val sparamsJava = getStaticParameters(f, lifted)
+      val declWhere: Option[WhereClause] = f match {
+        case d: DeclaredFunction => toOption(d.ast.getHeader.getWhereClause)
+        case d: DeclaredMethod => toOption(d.ast.getHeader.getWhereClause)
+        case d: FunctionalMethod => toOption(d.ast.getHeader.getWhereClause)
+        case _ => None
+      }
+      val sparamsJava = declWhere match {
+        case Some(SWhereClause(_, _, cs)) if cs.exists(_.isInstanceOf[WhereExtends]) =>
+          toJavaList(toListFromImmutable(getStaticParameters(f, lifted)).map(sp => {
+            val extra = cs.collect { case SWhereExtends(_, n, supers) if n.getText == sp.getName.getText => supers }.flatten
+            if (extra.isEmpty) sp
+            else NF.makeStaticParam(sp, sp.getName.asInstanceOf[Id],
+                                    toJavaList(toListFromImmutable(sp.getExtendsClause) ++ extra))
+          }))
+        case _ => getStaticParameters(f, lifted)
+      }
```

**What the team left** (line numbers are `main`'s):

- `Library/FortressLibrary.fss:3232-3237`, in `trait ActualReduction[\R,L\]`: the comment "a hack to avoid the error of overloaded methods", the live `distribute(r: Any): PossibleReductionPair[\R\] = NoReductionPair[\R\]`, and the commented `distribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\R\] = NoReductionPair[\R\]`.
- `Library/Generator2.fss:73-84`. The live `distributes` calls `r.distribute(q).holds`. Commented beside it are `r.distribute[\L1\](q).holds`, with "this got an error 'Don't actually resolve overloading of generic methods yet.'", and `distributes2(q, r)`, with "avoids the error (why?). But there is another problem: without explicit static type parameter, distribute[\L\](r : ActualReduction[\R, L\]) is not dispatched to distribute(SomeReduction) when distribute is not overloaded for the SomeReduction. One solution of the problem is to throw the static type parameter away: distirubte(r : Any) by default".
- `Library/Generator2.fss:170-173`, Emoto's comment: "This lifting type should be replaced with the type L of ReductionPair[\R, L\] returned by r.distribute(q). But, we do not have any way to capture the type L....".

**The variants I tried.** Every variant L0 to L4 also carries the two method conditions:

```diff
-    distribute(r: MaxReduction[\T\]): PossibleReductionPair[\Maybe[\T\]\] =
+    distribute(r: MaxReduction[\T\]): PossibleReductionPair[\Maybe[\T\]\] where { T extends StandardMax[\T\] } =
     MaxSumReductionPair[\T\]
-    distribute(r: MinReduction[\T\]): PossibleReductionPair[\Maybe[\T\]\] =
+    distribute(r: MinReduction[\T\]): PossibleReductionPair[\Maybe[\T\]\] where { T extends StandardMin[\T\] } =
     MinSumReductionPair[\T\]
```

| Variant | `FortressLibrary.fss` edit, beyond the two conditions | Whose text |
|---|---|---|
| L0 | none (the control) | — |
| L1 | the comment markers around the generic removed; the `Any` method stays | the team's, verbatim |
| L2 | the generic, as written, in place of the `Any` method | the team's, verbatim, with "the hack" dropped |
| L3 | the generic in place of the `Any` method, its result over `K`: `PossibleReductionPair[\K\] = NoReductionPair[\K\]` | the team's generic, with Emoto's "type L" captured as `K` |
| L4 | L3, and `leftDistribute` and `rightDistribute` take the same `K` | beyond the team's text: the two methods that forward to `distribute` |

L4's whole library patch:

```diff
@@ -3221,20 +3221,17 @@ trait ActualReduction[\R,L\] extends Reduction[\L\]
-    leftDistribute(r: Reduction[\R\]): PossibleReductionPair[\R\] =
+    leftDistribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\] =
         distribute(r)
-    rightDistribute(r: Reduction[\R\]): PossibleReductionPair[\R\] =
+    rightDistribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\] =
         distribute(r)
     (* a hack to avoid the error of overloaded methods *)
-    distribute(r: Any): PossibleReductionPair[\R\] =
-        NoReductionPair[\R\]
-(*    distribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\R\] =
-        NoReductionPair[\R\]
-*)
+    distribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\] =
+        NoReductionPair[\K\]
```

(The hack's comment stays where it is. A comment edit moves spans, `fortress-repo` skill, library part.) In L3 and L4, `K` is the lift type of the pair: `MaxReduction[\T\]` is an `ActualReduction[\T,Maybe[\T\]\]` (`:3456`, through `CommutativeReduction` and `AssociativeReduction`), and `MaxSumReductionPair[\T\]` extends `ReductionPair[\T,Maybe[\T\]\]` (`:3405-3406`). `ProdReduction`'s overload on `SumReduction[\T\]`, an `ActualReduction[\T,T\]`, answers `PossibleReductionPair[\T\]` (`:3437`) and fits `K = T`.

`Generator2.fss` variants, which only walk sees (the distance stage does not check `Generator2`):

- **G0**: as it is, `r.distribute(q).holds`.
- **G1**: the team's commented line made live:

```diff
-distributes[\R,L1,L2\](q : ActualReduction[\R,L1\], r : ActualReduction[\R,L2\]) : Boolean = r.distribute(q).holds
+distributes[\R,L1,L2\](q : ActualReduction[\R,L1\], r : ActualReduction[\R,L2\]) : Boolean = r.distribute[\L1\](q).holds
```

I did not run `distributes2` separately. It makes the same call as G0, `r.distribute(q)`, through an untyped function, and walk dispatches it by the same run-time types.

## 3. The checker on the bound-free shape

I extended the earlier probe's reproducer (its section A.1, `LiftedPairReturn.fss`) to the five forms. The common part:

```
trait Pair[\L\] getter tag(): String end
object NoPair[\L\] extends Pair[\L\] getter tag(): String = "none" end
object SomePair[\L\] extends Pair[\L\] getter tag(): String = "some" end
trait Lifted[\T\] end
trait Red[\R,L\]
    <the distribute declarations of the variant>
end
object Mx[\T\] extends Red[\T, Lifted[\T\]\] end
object Sm[\T\] extends Red[\T,T\]
    distribute(r: Mx[\T\]): Pair[\Lifted[\T\]\] = SomePair[\Lifted[\T\]\]
end
viaGeneric[\R,L1,L2\](q: Red[\R,L1\], r: Red[\R,L2\]): String = r.distribute(q).tag
viaExplicit[\R,L1,L2\](q: Red[\R,L1\], r: Red[\R,L2\]): String = r.distribute[\L1\](q).tag
```

`bin/fortress compile` on each:

| Form | `distribute` in `Red` | Result |
|---|---|---|
| RtAny | `distribute(r: Any): Pair[\R\]` | 1 error: "the return type of (Sm[\T\], Mx[\T\])->Pair[\Lifted[\T\]\] ... should be a subtype of the return type of (Red[\T,T\], Any)->Pair[\T\]" |
| RtGenBeside | the `Any` one, and `distribute[\K\](r: Red[\R,K\]): Pair[\R\]` | 2 errors: the same, and "... should be a subtype of the return type of [\K extends Object\](Red[\T,T\], Red[\T,K\])->Pair[\T\]" |
| RtGenR | `distribute[\K\](r: Red[\R,K\]): Pair[\R\]` alone | 1 error, against the generic |
| **RtGenK** | `distribute[\K\](r: Red[\R,K\]): Pair[\K\]` alone | **`rc=0`** |
| RtGenKBeside | the `Any` one, and the generic over `K` | 4 errors: the generic's `Pair[\K\]` against the `Any` one's `Pair[\R\]`, at three instances, and `Sm`'s against the `Any` one |

So the checker reads P-45's Return Type Rule over the generic's instances. At `K = Lifted[\T\]`, `Pair[\K\]` is the overload's own result, so the rule holds. At the team's `Pair[\R\]` it cannot hold, because static parameters are invariant. The `Any` method cannot stay beside the generic over `K`, because the generic's result over `K` does not fit its result over `R`.

## 4. The distance stage, per variant

Each run used `explorations/coordinator/tools/distance/run.sh`, niced, from the worktree with the shadow built. I compared each run's `errors.tsv` with `explorations/compile-ladder/gate/distance-sites.tsv` site by site. The comparison masks line and column numbers and generated names, and sorts a union's members. Each run took 180 to 194 s and reported `#crash none` and `#shadow every shadow edit matched the tracked sources`.

| Variant | `#total` | return-type | wellformed | Sites gone against the file | Sites new |
|---|---|---|---|---|---|
| shadow, library unedited | 48 | 2 | 4 | `:130` | — |
| L0 (conditions only) | 44 | 2 | 0 | `:130`; the 4 wellformed of row 433 | — |
| L1 (generic beside `Any`, over `R`) | 46 | 4 | 0 | `:130`; the 4 wellformed | 2 return-type, against the generic: "...should be a subtype of the return type of [\K\](ActualReduction[\T,T\], ActualReduction[\T,K\])->PossibleReductionPair[\T\]" |
| L2 (generic in place, over `R`) | 46 | 2 | 0 | `:130`; the 4 wellformed; the 2 return-type against `Any` | the 2 return-type against the generic; 2 typecheck at `:3225` and `:3229` |
| L3 (generic in place, over `K`) | 44 | 0 | 0 | `:130`; the 4 wellformed; the 2 return-type | 2 typecheck: "Could not check call to function distribute - [\K\]ActualReduction[\R,K\]->PossibleReductionPair[\K\] is not applicable to an argument of type Reduction[\R\]." at `:3225` (`leftDistribute`) and `:3229` (`rightDistribute`) |
| **L4** (L3, and those two over `K`) | **42** | 0 | 0 | `:130`; the 4 wellformed; the 2 return-type | **none** |

L4's table: `#kind typecheck 39`, `#kind export 3`, every other kind 0. Its classes are `X1 3, I3 2, V2 17, G1 1, BR 3, NM 3, GF 1, OT 12`: `R3` (2) and `F1` (4) are gone. Its units are `FlatString 1, FortressLibrary 36, List 5`.

**`FortressLibrary.fss:130`** is `opr BIG LEXICO(g: Generator[\TotalComparison\]) = ...`, which declares no return type. It goes in every run with the shadow, including the run with the library unedited. Row 737 says the checker gives such a function the return type of the api's first declaration of its name in identity-hash order, and the batch 16 record says ":130 still moving through row 737". So it is that order, moved by the shadow's code, and not an effect of `distribute`. Against the shadow's own control, 48, L4 removes exactly the 6 sites of row 433.

So, with the method conditions:
- The team's text as written (L1, L2) clears row 433's 4 wellformed errors and none of its 2 return-type errors.
- Written over `K` (L3), it clears all 6 and costs the 2 forwarders. L4 removes that cost.

## 5. Walk

`tmp/walk-variant.sh` in the worktree ran each program from its own folder, one at a time: the three tests, then 14 probes of mine. In the "trace" runs, the team's commented `println("use efficient implementaion")` and `println("use naive implementaion")` in `generate2` and `__generate2filtered` (`FortressLibrary.fss:4750`, `:4755`, `:4775`, `:4780`) were made live, so the output shows which path each call took. These are A.2.1's question asked directly: `generate2` takes `efficientImpl` exactly when `distributes(q, r)` holds (`:4743-4757`).

The probes are of two kinds. The first applies `__bigOperator2` to an outer and an inner reduction over `inits <|1, 3, 2|>`, the same call `GeneratorDeclarations.fusedMax` makes, once with dispatching off (`naive`) and once on (`fused`). The second asks one `distribute` or `distributes` question.

| Program | base (`main`'s library) | L4 + G0 | L4 + G1 |
|---|---|---|---|
| `GeneratorDeclarations` | `rc=0`; trace: efficient 2, naive 2 | `rc=0`; efficient 2, naive 2 | `rc=1`: InterpreterBug "Don't actually resolve overloading of generic methods yet." at `Generator2.fss:73:94-113` |
| `Generator2Test` | `res = 46, ggres = 46` / `15, 15` / `8, 8`; `rc=0`; trace: none | the same | the same |
| `ExclusionRemainderRungH` | `rc=0` | `rc=0` | `rc=0` |
| `MAX` of `SUM`s | 6, 6; efficient 1 | 6, 6; efficient 1 | naive 6, then the InterpreterBug |
| `MIN` of `SUM`s | 1, 1; efficient 1 | 1, 1; efficient 1 | naive 1, then the InterpreterBug |
| `SUM` of `PROD`s | 10, 10; efficient 1 | 10, 10; efficient 1 | naive 10, then the InterpreterBug |
| `SUM` of `SUM`s | 11, 11; naive 2 | naive 11, then "Failed to find any matching overload, args = (SumReduction[\ZZ32\]), overload = { distribute[\K\](r:ActualReduction[\R,K\]) ..., distribute(r:MinReduction[\T\]) ..., distribute(r:MaxReduction[\T\]) ...}" at `Generator2.fss:73:94-107` | naive 11, then the InterpreterBug |
| `MAX` of `MAX`es | 3, 3; naive 2 | naive 3, then "Unification error: Closure/Constructor for distribute param 1 (r:ActualReduction[\ZZ32,K@...\]) got arg MaxReduction[\ZZ32\]" at `Generator2.fss:73:94-107` | 3, 3; naive 2 |
| `SumReduction.distribute(MaxReduction)`, `(MinReduction)`, `ProdReduction.distribute(SumReduction)` | true, true, true | true, true, true | true, true, true |
| `SumReduction.distribute(SumReduction)` | false | "Failed to find any matching overload" | the same |
| `MaxReduction.distribute(SumReduction)` | false | "Unification error" | the same |
| `distributes(Max, Sum)`, `(Sum, Prod)` | true, true | true, true | InterpreterBug, InterpreterBug |
| `distributes(Sum, Sum)`, `(Max, Max)` | false, false | stops, stops | InterpreterBug, false |

L2 and L3 with G0 give the three tests the same results as L4 with G0. The result type does not matter to walk, and nothing calls `leftDistribute` or `rightDistribute` (`grep -rn leftDistribute Library ProjectFortress/LibraryBuiltin ProjectFortress/tests` finds only their declarations). L1 stops all three tests, and `explorations/claude_demo.fss`, at load:

    com.sun.fortress.exceptions.InterpreterBug: Library/FortressLibrary.fss:3235:49-72:
    ** bug! This should have been an environment with a Top Level
    Context:
    Library/FortressLibrary.fss:3235:49-72:
    Library/FortressLibrary.fss:3233:5-3234:28:
    Library/FortressLibrary.fss:106:1-114:2:

(`:106` is `LexicographicPartialReduction`, the first `ActualReduction` object in the file.)

**How the team's 2009 diagnosis reads today.** Walk still has both problems that `Generator2.fss:75-83` names:

- G1's explicit `[\L1\]` on a receiver that overloads `distribute` stops with "Don't actually resolve overloading of generic methods yet." The message comes from `DottedMethodApplication.typeApply`, which refuses every `OverloadedMethod` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:130`).
- G0's inferred call fails wherever only the generic fits: row 21, a generic method's own static arguments are not inferred under walk. On a receiver that also has plain overloads, the same cause prints as "Failed to find any matching overload".

So under walk the team's generic keeps the three fused pairs only with G0, and only because those pairs are plain overloads.

`Generator2Test`'s comprehension forms never reach `generate2` under walk, on the base too (no trace line). Row 632 already says walk's desugaring does not reach `__bigOperator2`. So that test does not exercise the fusion, and its `ggres` answers come from the plain path.

## 6. microGPT

On L4 with G0, the quick pair ran one program at a time, with a copy of `mg-run.sh` that runs them in sequence under `nice` (`tmp/mg-seq.sh`):

    --- L4G0 MicroGptFlatQuick 2026-10-16T18:35:18Z
    VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS
    rc=0 secs=34
    --- L4G0 MicroGptAplQuick 2026-10-16T18:35:52Z
    VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS
    rc=0 secs=44

L1 would stop microGPT at load, as it stops `claude_demo.fss` (section 5).

## 7. The compiled path on the shape

The compiled path does not link `FortressLibrary` before the switch-over, so I ran only the reproducer. `RtGenK` compiles and runs:

    Sm.distribute(Mx)  some
    Mx.distribute(Sm)  none
    viaGeneric(Mx, Sm)  some
    viaExplicit(Mx, Sm)  some

So the compiled dispatch sends both the inferred call and the explicit `[\L1\]` call to the plain overload, where walk refuses the explicit one.

One more call, `Sm[\ZZ32\].distribute(Sm[\ZZ32\])` (`RtGenKWi`), reaches the inherited generic arm of an object that overloads the name. It compiles (`rc=0`) and then dies at run time:

    Caused by: java.lang.IndexOutOfBoundsException: Index 1 out of bounds for length 1
        at com.sun.fortress.useful.Useful.map(Useful.java:691)
        at com.sun.fortress.runtimeSystem.InstantiatingClassloader.readAndExpandGenericThing(InstantiatingClassloader.java:404)
        ...
        at RtGenKWi?$RtGenKWi$\=Sm?distribute?RtGenKWi\%Sm?...FZZ32?,...FZZ32,...FZZ32??$\=?Arrow?Tuple??,RtGenKWi\%Red?T,K??,RtGenKWi\%Pair?K??.the_function(Unknown Source)

The base build does the same (`old-fortress.sh`, the same exception at `:404`). At the switch-over, L4's `Generator2.distributes` would reach this arm for every pair that has no fused overload, as walk's G0 does. Under walk the same call fails with "Failed to find any matching overload", on the base too.

## 8. Defects

1. **New: under walk, a dotted call with explicit static arguments to a method name that its receiver overloads stops with an InterpreterBug.** `RtGenKWh`: `Sm[\ZZ32\].distribute[\Lifted[\ZZ32\]\](Mx[\ZZ32\])`, where `Sm` has the inherited `distribute[\K\]` and its own plain `distribute(r: Mx[\T\])`. It prints "Don't actually resolve overloading of generic methods yet." The same happens on the base `528438ac5` (`old-fortress.sh`). With a single declaration of the name, as on `Mx`, the explicit call runs. The compiled path runs both (section 7). The ledger row it needs, in section 4 of the ledger, "Operators and overloading under walk":

   `| ? | under walk, a dotted call with explicit static arguments to a method name its receiver overloads stops with 'InterpreterBug ... Don't actually resolve overloading of generic methods yet.': Sm[\ZZ32\].distribute[\Lifted[\ZZ32\]\](Mx[\ZZ32\]), an inherited distribute[\K\] beside a plain distribute(r: Mx[\T\]) | NEGATIVE-VERIFIED | implementation gap (walk) | basic/overloading.tex, "Applicability to Dotted Method Calls" | none | probe generic-distribute | siblings: 21, 723. DottedMethodApplication.typeApply refuses any OverloadedMethod (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:130 at 07c83a40a); the team met it in 2009 (Library/Generator2.fss:75-76). The same on the base 528438ac5. One declaration of the name runs. The compiled path dispatches the call to the plain method. Program and output: explorations/perf-probes/generic-distribute/REPORT.md sections 3, 5 and 7. |`

2. **Known, and widened by this library: row 21.** Walk infers no static argument of a generic method. On a receiver that overloads the name, it prints "Failed to find any matching overload" (`RtGenKWi` under walk, base and `main`). A note for row 21, if it has room: "With the team's generic `distribute` live (`explorations/perf-probes/generic-distribute/REPORT.md` section 5), `Generator2.fss:73`'s `r.distribute(q)` meets this for every nested reduction over a generator of generators without a fused pair; on an overloaded receiver the message is 'Failed to find any matching overload'."

3. **Known: row 723's trait case, for a dotted pair.** A dotted `distribute[\K\]` beside a dotted `distribute(r: Any)` in one trait stops walk with "This should have been an environment with a Top Level" (`RtGenBeside`, base and `main`). In the library this happens at the first object extending the trait, so every program stops. Row 723's notes give this message for functional methods in a trait. A note there, or on row 21: "the dotted pair in a trait gives the same message, at the first object extending it (generic-distribute probe, section 5)".

4. **Known family, new form: row 495.** On the compiled path, the inherited generic arm of an object's overloaded method dies in the class loader with `IndexOutOfBoundsException` at `InstantiatingClassloader.java:404` (`RtGenKWi`, section 7; the same on the base). Row 495 has generic dotted methods failing in the compiled dispatch with `ClassCastException`, from the dispatcher's template, which puts "the trait's parameters ahead of the method's". A note for row 495: "an inherited generic method beside a plain one in an object dies at its arm with IndexOutOfBoundsException in readAndExpandGenericThing (generic-distribute probe, section 7)". If the curator wants it apart, it is a new row in section 5 with the same evidence.

5. **Row 433's notes.** Its designed fix, "`where { T extends StandardMax[\T\] }` per overload", clears 4 of 6. The other 2 need the generic over `K` (sections 3 and 4).

## 9. Decisions

No POSITIONS entry covers any of these:

1. **Branch from `main`, as the brief says, rather than from `528438ac5`.** `main` holds batch 16's code. So I rebuilt the seeded worktree and ran the library order, as the skill's worktree part says for a seeded build that is the base's. I compared against `distance-sites.tsv`, which batch 16's gate run on `main` matches.
2. **Only B.2 of the shadow.** The brief names "the method-condition part". B.1 and B.3 would have moved other sites (`app`, `CMP`).
3. **`K` in the result (L3, L4).** This goes past the team's literal `PossibleReductionPair[\R\]`. My reading is Emoto's comment that the lifting type "should be replaced with the type L of ReductionPair[\R, L\] returned by r.distribute(q)", and in every pair in the library `K` is that `L` (section 2). I also measured the literal text (L1, L2).
4. **L4 edits `leftDistribute` and `rightDistribute`.** Nothing calls them, and their api declarations already differ from the component (`FortressLibrary.fsi:1884`, `:1887`; the export error of class X1 lists `ActualReduction`). Without the edit, L3 costs 2 new errors. This edit is mine, not the team's.
5. **The team's trace `println`s made live, only for the trace runs.** Each variant was otherwise applied from `HEAD` by `tmp/variant.py`, which restores both files first.

## 10. For FACTS

- **The team's commented generic `distribute` clears the fusion's two return-type errors only with its result over its own `K`.** With the method `where` conditions (B.2), the distance falls from 49 to 42 with `leftDistribute` and `rightDistribute` given the same `K` (L4), or to 44 without (L3). The team's literal `PossibleReductionPair[\R\]` moves the 2 errors onto the generic (L1, L2: 46). The command is `explorations/coordinator/tools/distance/run.sh` on the worktree, and sections 3 and 4 hold the outputs. Against the shadow's control (48), L4 removes exactly row 433's 6 sites. `FortressLibrary.fss:130` moves with the shadow alone (row 737).
- **Under walk, L4 with `Generator2` as it is keeps every answer of `GeneratorDeclarations`, `Generator2Test`, `ExclusionRemainderRungH` and microGPT's quick pair, and takes the fused path for `MAX` and `MIN` over `SUM` and `SUM` over `PROD`. But nested reductions over a generator of generators with no fused pair stop**: rows 21 and the new walk row (section 8). `GeneratorDeclarations` gates the first half. Nothing in the suite gates the second, and the trace runs of section 5 show it.
- **The team's `r.distribute[\L1\](q)` (G1) stops every fused pair under walk** with "Don't actually resolve overloading of generic methods yet.", and so does `GeneratorDeclarations` (section 5).

## 11. Commands worked out

- `tmp/variant.py <base|L0..L4> <G0|G1> [trace]` in the worktree restores `FortressLibrary.fss` and `Generator2.fss` from `HEAD` and applies one variant.
- `tmp/dist-chain.sh V...` applies each variant and runs the distance stage, niced, one at a time.
- `tmp/walk-variant.sh <label> [tests|all]` runs the three tests, and with `all` the 14 probes, one JVM at a time, each from its own folder, and summarises them.
- `tmp/cmp.py OLD.tsv NEW.tsv` compares two site lists with line numbers masked and union members sorted. This version of the earlier probe's `cmp-sites.py` adds the sort.
- `tmp/mg-seq.sh` is `mg-run.sh` with an absolute `cd`, the two programs in sequence, and `nice -n 19`.

## 12. Questions for the curator

1. **The result type of the live generic.** The options:
   - (a) `PossibleReductionPair[\K\]` with `NoReductionPair[\K\]`, which clears the 2 errors. It departs from the team's literal `[\R\]`, and reads Emoto's "type L" as `K`.
   - (b) The literal text, which leaves the 2 errors and adds 2 more.

   With (a), there is a further choice:
   - (i) Give `leftDistribute` and `rightDistribute` the same `K` (L4, distance 42).
   - (ii) Leave them, with 2 new errors (L3, 44).
2. **What walk does about the inferred call.** Removing the `Any` method makes walk stop on nested non-fusable reductions over generators of generators, which it answered before. The options:
   - (a) Fix row 21 in walk first, so `r.distribute(q)` infers `K`.
   - (b) Fix the new walk row, and take G1, the team's explicit `[\L1\]`. The compiled path already dispatches that call to the plain overloads (section 7).
   - (c) Land L4 anyway, since no test or microGPT reaches the case.
3. **The compiled path at the switch-over.** The same library shape meets row 495's family in the class loader (section 8, item 4). Should that be on the switch-over's list now?
