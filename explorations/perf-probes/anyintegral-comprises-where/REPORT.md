<!-- This is the report of the probe of the team's `AnyIntegral comprises Integral[\I\] where [\I\]` made live in the one library: what the checker and walk do with it, whether it closes row 487, and what the specification would need. Probe worker, 2026-10-24; worktree seeded from /home/user/fortress-base23 (e0ec620a9; code equal to main at 2be634867), since removed; nothing committed; the patch of the last variant is at the end. -->

# The team's `AnyIntegral` clause made live: a probe

## In short

- **Neither path can take the team's clause as written, in either placement.** Before any type checking, the front end that both paths share refuses the library: `FortressLibrary.fsi:444:58: I is undefined.` The parse goes through. The fault is a front-end defect that is not in the record (D1 below). `AnyIntegral` declares a coercion, and the coercion lifter gives the lifted function the trait's self type. That self type names the `where`-clause variable outside the trait. `AnyList` passed only because it has no coercion.
- **With a 12-line probe fix to the lifter, the checker refuses the team's literal spelling.** It reports `Ill-formed type: Integral[\I\] The static argument I does not satisfy the corresponding bound Integral[\I\].` `where [\I\]` binds `I` without the bound that `Integral[\I extends Integral[\I\]\]` asks for.
- **With the bound written in, the checker accepts the library, but only with more memory.** The clause is `comprises Integral[\I\] where [\I extends Integral[\I\]\]`. Every api has 0 errors. At the stages' 4 GB heap, the component's overloading and export checks run out of memory. At 11 GB, both stages read 0 with no crash.
- **Walk refuses the library at load under every variant.** It refuses the library's `+` and `-` between an array and a number, beside `AdditiveGroup`'s own. This is row 804 reaching the library. On a cold cache, `testSystem` has 556 failures of 683 and `testSpecData` 71 of 130. The gate has 0 and 0.
- **Row 487: the live clause does not refuse the row's program, and it should not.** Under the clause, `MyIntegral extends Integral[\MyIntegral\]` is below a listed type, so it is valid. The checker accepts it.
  - What the hole allowed is now refused: an object that covers an abstract method over `AnyIntegral` with five bodies, one per integer type. The base accepts that object, and walk runs it. Under the clause the checker refuses it.
  - So for the library, the clause discharges the assumption of P-60's proof. The checker's rule for programs' own closed traits is unchanged, so row 487 stays open for them.

## 1. The variants and the stages

Each variant was measured once at the stages' own settings. I also ran A3 once at an 11 GB heap, a different setting, to tell a memory limit from divergence. The reference is climb batch 22's gate: count 0, distance 0, crash none.

| variant | the clause in `.fsi` and `.fss` | lifter | count stage (4 GB) | distance stage (4 GB) | walk, cold cache |
|---|---|---|---|---|---|
| A | `comprises Integral[\I\] where [\I\]`, replacing the list (the team's text) | base | `#stopped`: 'I is undefined.' at `FortressLibrary.fsi:444:58` | `#total none`: all 12 targets stopped, 1 error each | every program refused: 'I is undefined.' |
| B | `comprises { ZZ, ZZ64, ZZ32, NN64, NN32, Integral[\I\] } where [\I\]` (beside: a trait takes one clause, as `TraitClauses.set` shows) | base | `#stopped`: same error, at `:444:88` | `#total none`, 12 stopped | refused, same error |
| A2 | A | probe fix | `#total 1`: wellformed, the api stops there | `#total 6`: wellformed 2 ('Ill-formed type: Integral[\I\]', api and component); overloading 4 (`+` and `-` at `FortressLibrary.fsi:269/270` against `:2717-2723`, the P-157 pairs); `#crash` component overloading OutOfMemoryError | refused at load: the `+` pair (below) |
| A3 | `comprises Integral[\I\] where [\I extends Integral[\I\]\]` | probe fix | no table: all 12 apis 0 errors, then the component's check dies, OutOfMemoryError in `TypeAnalyzer.ancestors` under `pExc`'s `checkP` | `#total 0`; `#crash` component overloading and component export, OutOfMemoryError | refused at load: the `+` pair |
| A3, 11 GB heap | A3 | probe fix | count driver (WorldFlip `-stop check`, the stage's own classes): all apis 0, component checked, rc 0, no error line: a clean check | `#total 0`, `#crash none` | n/a |
| B3 | B with the bound | probe fix | no table: api FortressLibrary overloading OOM, then the component OOM | `#total 0`; 7 crashes: api FlatString and api FortressLibrary overloading; component export, overloading and wellformed2; targets FortressLibrary and RangeInternals | refused at load: the `+` pair |

**Which the checker and walk can take.**
- The checker takes only A3, and only at a larger heap. Its `#seconds` rows read 803 (4 GB) and 371 (11 GB), against the gate's 227; I do not analyse these.
- B3 is worse in memory and adds nothing: each of the five types is already an `Integral[\X\]`.
- Walk takes no variant.

## 2. Row 487

I ran two probes with the compiled checker over the interpreter's library (the count stage's WorldFlip `-stop check`), and the same probes under walk:
- `P487`: row 487's own program, the `XXX` test's text renamed.
- `CoverIntegral`: `trait Classifier` with `tagOf(self, x: AnyIntegral): ZZ32`, and `object ByType extends Classifier` with five bodies at `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64`.

| | checker, base library | walk, base | checker, A3 |
|---|---|---|---|
| P487 | rc 0: the hole | 'loaded' | rc 0: now valid, since `Integral[\MyIntegral\]` is listed |
| CoverIntegral | rc 0: the five cover `AnyIntegral` through the clause | 'tagOf = 1' | refused: 'Domain AnyIntegral is not a subtype of OR(NN32,ZZ,NN64,ZZ64,ZZ32)' / 'The inherited abstract method tagOf(self:Classifier,x:AnyIntegral):ZZ32 from the trait Classifier has no concrete implementation in the object ByType' |

On the base, the checker accepts both programs. A `MyIntegral` value would then reach `tagOf` with no body to run, which is the unsoundness that row 487 records.

Under A3, the checker no longer concludes anything from the five. That is the closure P-60's proof assumes, here holding by construction. The row's demand, a refusal of `MyIntegral`, is wrong under the live clause. Its test `tests/XXXComprisesGenericChildAcrossComponents` would become a plain test that loads.

Under A3, walk cannot say anything: the library does not load, so in `testSystem` that test is red for the library's reason ('Refused at load, but did not satisfy load_exception_contains'). The checker's rule `everyKnownSubtypeListed` and its gap stay for programs' own clauses. The record names only `Integral` under `AnyIntegral` as the library's case (rows 459 and 487).

## 3. Walk

- The refusal, on every cold run under A2, A3 and B3: '+[\T extends Number AdditiveGroup[\T\], I extends Index\](x:Array[\T,I\],y:T) (`FortressLibrary.fss:4927`) and AdditiveGroup[\T\].+(self:(AdditiveGroup[\T\] & {T}),other:T) (`:361`) have parameters with generic type, at least one pair of parameters must have excluding types'.
  - The stack is `OverloadedFunction.finishInitializing` from `BuildTopLevelEnvironments.for_RewriteFnOverloadDecl`, at the load of `String.fss:543`.
  - A warm cache loads, because walk skips the check on a component it reads back (row 342). The suites start cold.
- **Why the base loads these pairs.** Row 804 says "the library's own pairs load; not traced". I traced them with an instrumented copy of `OverloadedFunction` (`DUMP_EXCLUSION` on), outside the tree.
  - At position 1, walk shows that the bounds `Number` and `AdditiveGroup[\T'\]` exclude each other by reading `Number`'s `comprises` down to non-extensible object types: Ratio, Long, Float, Int, NN32, IntLiteral, FloatLiteral, RR32, BigNum. None of them has `AdditiveGroup[\T'\]` as a supertype as written, so the dump reads 'Excludes. Non-extensible + no supertype'.
  - Under the clause, the list holds the extensible `Integral[\I\]`, which extends `AdditiveGroup[\I\]`. The proof fails, and walk refuses the library's pairs as row 804 refuses a program's.
  - The checker under A3 accepts these pairs; under A2, without the bound, it refuses them too. Walk needs row 804's fix: the static-parameter equality that the bounds force.
- `ant testSystem`, once, on A3: shards 162/173/168/180, failures 132/142/131/151, so 556 of 683. The refusal's message appears 1,048 times in the four results.
- `ant testSpecData`, on A3: 130 run, 71 failures; the refusal appears 142 times.
- Whatever walk would refuse after this first pair is unmeasured: walk stops at its first refusal.

## 4. The specification

- **`Specification/basic/traits.tex`, "Trait Declarations".**
  - The normative text at `:246-268` already allows the clause: a listed type may hold a `where`-clause variable of `T`, "which the listed type then holds at every value of", with `NatParam`'s clause as the example.
  - The rule for an unlisted generic subtrait (`:260-264`) stays, but the library would no longer rest on it.
  - The callout (`:270-288`) would change in two places. Its sentence "A parameterized trait with a static parameter that T does not have can be listed only at particular static arguments" needs "or at a `where`-clause variable". Its last sentence names only `NatParam` and would gain `AnyList` and `AnyIntegral`.
- **Appendix I, `revival-comprises` (`appendices/changes.tex:1520` and following).**
  - The Rationale (`:1569-1580`) says that `Integral` "can be listed only at particular static arguments, and every value of it is a value of one of the five". It would say instead that the library writes the team's clause. It would also record the bound `[\I extends Integral[\I\]\]`, which the team's comment leaves out and the checker requires: a departure from the team's literal text.
  - The Effect's "accepts the declaration of `AnyIntegral` ... as written (lines 433--436)" (`:1610`, line numbers already stale: now 444-446) would change.
  - The row-487 sentence (`:1614-1617`) would narrow to programs' own clauses.
- **The proof's scope.** `appendices/overloading-function.tex:28-32`, `advanced/overloading.tex:731-733` and the proof's Appendix I entry (`changes.tex:3575-3578`) state the open assumption through row 487. Each would add that the library's closed traits no longer rely on it.
- Nothing else in the specification renders `AnyIntegral`.

## 5. Defects and findings (none is in the ledger)

- **D1: front end, both paths.** A trait whose `comprises` clause lists a type at a type `where`-clause variable, and which declares a coercion, is refused before type checking.
  - `CoercionLifter.makeLiftedCoercion` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionLifter.scala:156`) gives the lifted coercion `t.getSelfType`. For a trait with a clause, that is `T & (listed types)` (`SelfParamDisambiguator.scala:77-78`). The lifter runs before `TypeDisambiguator`, which binds the variable only inside the trait (`Disambiguator.java:149`, `:304`).
  - Reproducer: `trait T comprises G[\X\] where [\X\] coerce(x: ZZ32) = Gz end`, `trait G[\X\] extends T end`, `object Gz extends G[\ZZ32\] end`. On the base, walk reports 'X is undefined.' at the clause; `fortress disambiguate` reports the same. Without the `coerce`, it prints 'ok'.
  - A `nat` variable loads: `comprises N[\n\] where [\nat n\]` with a coercion printed 'ok' on the base.
  - With the probe fix, both paths' front ends take the reproducer ('ok'; `disambiguate` clean). The fix acts only on such traits, of which the tree has none today.
- **D2: checker.** Under A3, the `FortressLibrary` component's overloading and export checks need more than a 4 GB heap: OutOfMemoryError in `TypeAnalyzer.ancestors` (`TypeAnalyzer.scala:1023`), from `checkP`/`pExcInner` (`:542`, `:556`). At 11 GB they finish clean, so this is growth, not divergence. A2 crashes the same way. B3 also crashes in the api checks. It cannot be reached on `main`, since the clause is not live. I suggest a note on F-121 rather than a row.
- **D3: walk, row 804 reaching the library.** The trace in section 3 is a note for row 804.
- **Finding: the team's literal spelling is ill-formed.** `where [\I\]` gives 'The static argument I does not satisfy the corresponding bound Integral[\I\]'. F-121's "not measured" is now measured.
- **By reading only, not run:** the code generator refuses a trait whose header carries a `where` clause ('Can't compile TraitDecl', row 701). So `AnyIntegral` would be one more row-701 wall in `FortressLibrary` at the switch-over. I did not run the code generator.

My decisions:
- I wrote the probe-only lifter fix, to reach the checker and walk at all.
- I added the bound in A3 and B3, to get past the ill-formed type.
- I added the 11 GB runs, to characterise the out-of-memory crashes.
- I added `CoverIntegral`, to show what row 487's hole allowed.

The worktree is removed. `/home/user/fortress-base23` is clean and has no file newer than the probe's start, and the main tree is clean.

## The ways measured, what each changes, and its cost in rungs

- **Way 0: P-44's list stays (today).** Nothing changes; 0 rungs. Row 487 stays open, and P-60's proof keeps its assumption. The other closure the row names, a checker check at each object declaration, would be one checker rung.
- **Way 1: the team's clause as written (A or B).** Not takeable: D1 stops both paths, and past D1 the type is ill-formed.
- **Way 2: the team's clause with its bound, replacing the list (A3).** For `AnyIntegral` it closes row 487, and it refuses coverage through the five integer types. It opens `AnyIntegral` at calls, as F-251 opens `AnyList`; the effect on programs is unmeasured. Cost:
  - one front-end rung for D1 (the fix below plus a walk test and a checker test);
  - one checker rung for D2's memory, or larger heaps in the stages;
  - one walk rung, row 804's fix, with further walk refusals unknown behind it;
  - then a library and specification rung: the clause, Appendix I, the proof's scope sentences, row 487's test made a plain loading test, and `CoverIntegral` as a refusal test;
  - plus one more row-701 wall before the names batch.

  That is three prerequisite rungs and the library rung.
- **Way 3: keep the five beside it (B3).** Same as way 2 at a higher memory cost, with no gain.

## Question for the curator

Should the team's clause, with its bound, become live by way 2, after its three prerequisite rungs? Or does P-44's list stay, with row 487 closed instead by the object-level check the row names?

**Default (mine):** P-44's list and the comment stay. D1 and this measurement go into the record: a new D1 row, notes on F-121, row 804 and row 487. Way 2 is listed after the names batch, since walk cannot load the library under it until row 804 is fixed, and the clause adds a row-701 wall. Row 804's fix, which is owed anyway, is the moment to measure way 2 again.

```diff
diff --git a/Library/FortressLibrary.fsi b/Library/FortressLibrary.fsi
index f58739342..0f7f90df6 100644
--- a/Library/FortressLibrary.fsi
+++ b/Library/FortressLibrary.fsi
@@ -441,10 +441,9 @@ trait QQ extends { Number, StandardPartialOrder[\QQ\], StandardMinMax[\QQ\],
     opr MAXNUM(self, other:QQ):QQ
 end
 
-trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }
+trait AnyIntegral extends { Number } comprises Integral[\I\] where [\I extends Integral[\I\]\]
     coerce(x: IntLiteral)
 end
-        (** not yet: ``%comprises Integral[\I\] where [\I\]%'' *)
 
 trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], MultiplicativeRing[\I\], AnyIntegral }
     abstract getter zero(): I
diff --git a/Library/FortressLibrary.fss b/Library/FortressLibrary.fss
index b55353e99..738f4d5fa 100644
--- a/Library/FortressLibrary.fss
+++ b/Library/FortressLibrary.fss
@@ -674,13 +674,12 @@ object Ratio(num: ZZ, den: ZZ) extends { QQ }
     denominator(self):ZZ = den
 end
 
-trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }
+trait AnyIntegral extends { Number } comprises Integral[\I\] where [\I extends Integral[\I\]\]
     coerce(x: IntLiteral) =
         if (x >= -2147483648) AND (x <= 2147483647) then x.asZZ32
         elif (x >= -9223372036854775808) AND (x <= 9223372036854775807) then x.asZZ64
         else x.asZZ end
 end
-        (** \vspace{-4ex} NOT YET: %comprises Integral[\I\] where [\I\]% *)
 
 trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], MultiplicativeRing[\I\], AnyIntegral }
     getter zero(): I
diff --git a/ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionLifter.scala b/ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionLifter.scala
index b48b95f6a..8a9e0fdf6 100644
--- a/ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionLifter.scala
+++ b/ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionLifter.scala
@@ -152,8 +152,20 @@ object CoercionLifter {
     val liftedSparams = toListFromImmutable(NU.getStaticParams(t)).map(liftStaticParam)
     val sparams = liftedSparams ++ fnSparams
 
-    // Create the return type.
-    val returnType = t.getSelfType.getOrElse(bug("No self type on trait "+t))
+    // Create the return type.  A trait's where-clause variables are in scope in
+    // the trait only, so where the trait's where clause binds one, the comprised
+    // types of its self type, as Integral[\I\] in comprises Integral[\I\] where [\I\],
+    // would name it free at top level: the lifted coercion returns the trait type.
+    val selfType = t.getSelfType.getOrElse(bug("No self type on trait "+t))
+    val whereBinds = toOption(NU.getWhereClause(t)) match {
+      case Some(w) => !w.getBindings.isEmpty
+      case None => false
+    }
+    val returnType = selfType match {
+      case STraitSelfType(i, named, comprised) if whereBinds && !comprised.isEmpty =>
+        STraitSelfType(i, named, Nil)
+      case _ => selfType
+    }
 
     // Create a new FnHeader with the new info.
     // TODO: Worry about `implementsUnambiguousName` field?
```
