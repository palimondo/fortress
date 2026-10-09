<!-- Q48's part (b), row 455's two argument faces, measured on a shadow of the compiled checker: way 3 built as an argument retry in one file, its two triggers compared on the two faces and 22 probe calls, the compiler track and the distance stage run on it, written 2026-10-09 for the coordinator by a probe worker (Opus) in a worktree seeded from the base build at fe74fb738 and removed after. Nothing outside this note was committed; the patch below is the one a rung would apply, checked to apply to fe74fb738 and to give the measured results. It measures and reads; the forks it meets are in section 6, not decided. -->

# Q48(b): the argument of a call, on a checker shadow

## The question

Should the compiled checker give a call written as the argument of another call an expected type, the parameter type of the declaration the outer call chooses? Then a static parameter of the inner call that its own arguments do not fix, or fix only at a numeral's type, is fixed by the outer declaration. Row 455's two faces are the test: `takesBox64(wrapT(3))` and `takesBox64(mk())` (`ProjectFortress/compiler_tests/XXXInferContextDrops.fss:10-11`). Today both are refused, at `BoxT[\IntLiteral\]` and `BoxT[\Object\]`. The question as put is `explorations/coordinator/CLIMB-BATCH-12.md`, section 2, Q48, way 3. The curator's reading (POSITIONS, "A `label` body takes the expected type of the whole `label`"): it unifies the inference rules everywhere, and goes ahead where the mechanism is known.

## The answers

1. **The edit.** One file, `scala_src/typechecker/impls/Functionals.scala`: 94 lines added, 1 removed; 69 of code, 22 of comment, 3 blank. It sits in `typedApplication`, where every call form meets: `f(x)`, a method call, an operator, a subscript. No other file, no solver, no library. Section 1.
2. **Two triggers.** Way 3 as worded retries only an argument whose own declaration has a result-only type parameter ("narrow"). I also built the plain form: any argument that is a call with inferred static arguments ("wide"). The patch below is wide; narrow swaps one method for about 30 lines.
3. **The faces.** Wide accepts both: `wrapT[\ZZ64\]` with the numeral converted, and `mk[\ZZ64\]`. Both compile and run. Narrow accepts only `takesBox64(mk())`; `takesBox64(wrapT(3))` stays refused, since `wrapT`'s `T` is fixed by its argument, not result-only.
4. **My 22 probe calls.** Stock accepts 3. Wide accepts 18, narrow 13. Every call accepted compiled and ran with the instance shown in section 2, except a varargs callee: it checks, but code generation has no varargs ("Can't compile VarArgs yet"), whatever the retry. Four calls stay refused under both, rightly: three ill-typed controls and one true ambiguity.
5. **The compiler track** (`ant testCompiler`: compiler 1,078 tests, othercompiler 263). Two verdicts change under wide, both expected failures whose defect the retry repairs: `XXXInferContextDrops` (row 455) and `XXXInferLoneUnionClosedTrait` (row 535's pinned refusal, which now compiles and runs with `T = Fig`). Nothing else. Under narrow only `XXXInferContextDrops` changes (2 errors to 1). Section 3.
6. **The distance stage.** 207 to 207. Against batch 11's per-site list: 0 sites cleared, 0 new, not even the usual run-to-run drift. The retry was tried at 10 library call sites and kept at none. No library site is an argument face. Section 4.
7. **Where the retry runs.** Only where no attempt of the outer call is kept today. In the compiler's own library: never. In the whole compiler track: tried at 7 call sites, kept at 3 (the two faces, row 535's call). So no program of the track that compiles today changes.
8. **The specification** needs one more context in the chapter's list, one name out of the "not yet described" item, and Appendix I's entry amended. Section 5.
9. **Forks for the curator** (section 6): wide or narrow; how a generic outer callee is instantiated when only retried arguments fix it; that the retry never displaces a declaration that already accepts the call.
10. **Rung C** (section 7, my reading): the code is clean enough and touches none of rung C's files. It needs the curator's yes on (b), a choice of trigger, two test edits and the spec text.

## 1. What I built

### The mechanism

Today the checker types every argument first, with no expected type (`partitionArgs`, `Functionals.scala:96`, through `checkExprIfCheckable`, `STypeChecker.scala:517`). Then it tries the outer call's declarations in the order POSITIONS fixes ("The order of the checker's attempts at a call"): without the expected type, then with it, then with coercion (`Functionals.scala:703-715`).

The shadow adds one step, the argument retry. It runs only when no attempt is kept, just before today's fallback:

- It picks the arguments that are calls carrying static arguments (wide), or calls one of whose declarations has a type parameter its parameter types do not mention (narrow).
- For each declaration of the outer call in turn, it checks each such argument again, with that declaration's parameter type as its expected type. If the declaration is generic, that parameter type is first instantiated from the other arguments and the call's own expected type only.
- The inner call takes that expected type by the same attempt order: its no-context result is kept when it fits, so an argument that already fitted never changes.
- It then checks the outer call against that one declaration with the new arguments. The declaration counts if the call checks and its result fits the call's expected type.
- Of the declarations that count, the one more specific on its declared parameter types than every other wins, with its arguments. If none counts, or two tie, the call goes on exactly as today.

The mechanism is one the checker already uses: a `TryChecker` checks the unchecked argument again under an expected type, as for a function literal argument (`inferFnExprParams`, `Functionals.scala:497-524`) and the loose juxtaposition (`Operators.scala:181-185`). Nested calls work by recursion: the inner call's own failure triggers its own retry.

### The patch (wide), against fe74fb738

`git apply` from the repository root. Checked: it applies to fe74fb738, builds, the compiler's library compiles under it, and on the probes and the two changed tests it gives exactly the measured build's results.

```diff
--- a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala
@@ -644,6 +644,23 @@
 
     // Check all the checkable args and make sure they all have types.
     val args = partitionArgs(iargs).getOrElse(return None)
+    typedApplicationOfChecked(preCandidates, iargs, args, context, mOpName, fallBackWithoutContext, true)
+  }
+
+  /**
+   * typedApplication over its args checked without an expected type. With
+   * `retry`, a call that no attempt keeps is tried by the argument retry
+   * before the attempts' fallback.
+   */
+  def typedApplicationOfChecked(preCandidates: List[PreAppCandidate],
+                                iargs: List[Expr],
+                                args: List[Either[Expr, FnExpr]],
+                                context: Option[Type],
+                                mOpName: Option[Op],
+                                fallBackWithoutContext: Boolean,
+                                retry: Boolean)
+                               (implicit errorFactory: ApplicationErrorFactory)
+                                : Option[(List[AppCandidate], Type)] = {
 
     // A candidate, with its declaration's arrow when it is compared on its
     // declared domain, and whether the promotion instantiated it.
@@ -706,7 +723,11 @@
              (true, true, () => applicable(context, true)), (false, true, () => applicable(None, true)))
       else List((true, false, () => applicable(None, false)), (true, true, () => applicable(None, true)))
     val tried = attempts.to(LazyList).map { case (withContext, coerce, a) => (withContext, coerce, a()) }
-    val es = tried.find { case (_, coerce, a) => kept(a, coerce) }.map(_._3).getOrElse {
+    val keptAttempt = tried.find { case (_, coerce, a) => kept(a, coerce) }
+    if (keptAttempt.isEmpty && retry)
+      retypedApplication(preCandidates, iargs, args, context, mOpName, fallBackWithoutContext).
+        foreach(r => return Some(r))
+    val es = keptAttempt.map(_._3).getOrElse {
       // No attempt is kept: of the attempts with the context, or for a call
       // written f(x) of those without it, the first that holds a candidate,
       // whatever its result, and otherwise the first.
@@ -801,6 +822,78 @@
           tieType(top).getOrElse(head.getOrElse(sorted.head)._1.arrow.getRange)))
   }
 
+  /**
+   * The argument retry, for a call that no attempt keeps, an argument of
+   * which is itself a call whose static args it inferred with no expected
+   * type. Each candidate in turn: each such argument is checked again with
+   * the candidate's parameter type at its position as its expected type, that
+   * type instantiated, where the candidate has static parameters, by the other
+   * arguments and the call's expected type alone; the call is then checked
+   * against that candidate alone, and the candidate counts when the call's
+   * type converts to the expected type. Of the candidates that count, the one
+   * more specific on its declared parameter types than every other is kept,
+   * with its arguments. Otherwise the call is refused as it was.
+   */
+  private def retypedApplication(preCandidates: List[PreAppCandidate],
+                                 iargs: List[Expr],
+                                 args: List[Either[Expr, FnExpr]],
+                                 context: Option[Type],
+                                 mOpName: Option[Op],
+                                 fallBackWithoutContext: Boolean)
+                                (implicit errorFactory: ApplicationErrorFactory)
+                                 : Option[(List[AppCandidate], Type)] = {
+    val positions = args.zipWithIndex.collect { case (Left(c), i) if retypable(c) => i }.toSet
+    if (positions.isEmpty || iargs.size != args.size) return None
+    val tryChecker = STypeCheckerFactory.makeTryChecker(this)
+    def same(a: Expr, b: Expr) = Formula.isTrue(analyzer.equivalent(getType(a).get, getType(b).get))
+    val found = preCandidates.flatMap { pc =>
+      val domain =
+        if (!hasStaticParams(pc.arrow)) Some(pc.arrow.getDomain)
+        else {
+          val tys = args.zipWithIndex.map {
+            case (Left(e), i) if !positions(i) => Some(getType(e).get)
+            case _ => None
+          }
+          def constraint(inf: ArrowType, ops: Map[Op, Op]): CFormula =
+            Formula.and(context.map(c => analyzer.subtype(inf.getRange, c)).toList ++
+                        zipWithDomain(tys, inf.getDomain).collect { case (Some(t), d) => analyzer.subtype(t, d) })
+          inferStaticParamsHelper(pc.arrow, constraint, false, true, true).map(_._1.getDomain)
+        }
+      domain.toList.flatMap { dom =>
+        val params = zipWithDomain(args, dom).map(_._2)
+        val newArgs = args.zipWithIndex.map {
+          case (Left(c), i) if positions(i) && i < params.size && !hasInferenceVars(params(i)) =>
+            Left(tryChecker.tryCheckExpr(iargs(i), Some(params(i))).filter(!same(_, c)).getOrElse(c))
+          case (a, _) => a
+        }
+        if (newArgs.zip(args).forall { case (n, o) => n eq o }) Nil
+        else (try {
+          tryChecker.typedApplicationOfChecked(List(pc), iargs, newArgs, context, mOpName,
+                                               fallBackWithoutContext, false)
+        } catch { case _: StaticError => None }).
+          filter(r => context.forall(coercions.substitutableFor(r._2, _))).toList.map(r => (pc, r))
+      }
+    }
+    def better(a: (PreAppCandidate, (List[AppCandidate], Type)), b: (PreAppCandidate, (List[AppCandidate], Type))) =
+      (a eq b) || moreSpecificCandidate(a._2._1.head, b._2._1.head, Some(a._1.arrow), Some(b._1.arrow))
+    found.filter(a => found.forall(better(a, _))) match {
+      case List(best) => Some((best._2._1 ++ found.filterNot(_ eq best).map(_._2._1.head), best._2._2))
+      case _ => None
+    }
+  }
+
+  /**
+   * An argument the retry checks again: a call whose checked form carries
+   * static args. Where they are written, the check again gives the same
+   * type, and the retry passes over the argument.
+   */
+  private def retypable(c: Expr): Boolean = c match {
+    case S_RewriteFnApp(_, f: FunctionalRef, _) => !f.getStaticArgs.isEmpty
+    case SOpExpr(_, f, _) => !f.getStaticArgs.isEmpty
+    case m: MethodInvocation => !m.getStaticArgs.isEmpty
+    case _ => false
+  }
+
   /** Signal that no candidate of a call with coercion is more specific than every other. */
   private def signalAmbiguity(tied: List[ArrowType], args: List[Either[Expr, FnExpr]])
                              (implicit errorFactory: ApplicationErrorFactory): scala.Unit = {
```

### The narrow trigger

Way 3 as worded. Replace `retypable` in the patch with this; nothing else changes. Measured as a switch in the same build (`FORTRESS_ARGCTX=narrow`), which the patch above leaves out.

```scala
  /**
   * An argument the retry checks again: a call with static args one of whose
   * declarations has a static parameter that its parameter types do not
   * mention, as `mk[\T\](): Box[\T\]`.
   */
  private def retypable(c: Expr): Boolean = {
    val schemas: List[Type] = c match {
      case S_RewriteFnApp(_, f: FunctionalRef, _) if !f.getStaticArgs.isEmpty =>
        toListFromImmutable(f.getNewOverloadings).flatMap(o => toOption(o.getSchema))
      case SOpExpr(_, f, _) if !f.getStaticArgs.isEmpty =>
        toListFromImmutable(f.getNewOverloadings).flatMap(o => toOption(o.getSchema))
      case m: MethodInvocation if !m.getStaticArgs.isEmpty => toOption(m.getOverloadingSchema).toList
      case _ => Nil
    }
    def mentions(t: Type, name: String): Boolean = {
      var found = false
      object find extends Walker {
        override def walk(node: Any): Any = node match {
          case v: VarType if v.getName.getText == name => found = true; v
          case _ => super.walk(node)
        }
      }
      find(t)
      found
    }
    schemas.exists {
      case a: ArrowType =>
        getStaticParams(a).exists(sp => !sp.isLifted && !mentions(a.getDomain, sp.getName.getText))
      case _ => false
    }
  }
```

### How it was run

- Worktree `/home/user/fortress-argctx`, seeded from `/home/user/fortress-base12` at fe74fb738, the patch applied, `ant compileAll`, then the library order: all five compiles rc=0.
- Stock is the base build, run through `old-fortress.sh` with a private cache.
- Each probe compile had a fresh copy of the caches. A shadow-only log (off by default, not in the patch) recorded each time the retry was tried and kept.

## 2. The faces and my programs [measured]

`BoxT[\T\](v: ZZ32)` is an object whose `T` only its type mentions. `mk[\T\](): BoxT[\T\]`, `wrapT[\T\](x: T): BoxT[\T\]`, `idB[\T\](b: BoxT[\T\]): BoxT[\T\]`. Under the compiled path an unbounded `T` has the bound `Object`. Each line: stock / wide / narrow, then the instance the run printed (a `typecase` on the box, so the instance is the run time's own). All 22 calls are in one checked program. The accepted ones are in a run program: wide's compiled and run at 1 and 4 threads, narrow's at 1.

The two faces:
- `takesBox64(wrapT(3))`: no / yes / no. Wide: `wrapT[\ZZ64\]`, the numeral converted; runs, `BoxT[ZZ64]`. Narrow leaves it: `wrapT`'s `T` is not result-only.
- `takesBox64(mk())`: no / yes / yes. `mk[\ZZ64\]`; runs, `BoxT[ZZ64]`.
- The test file itself, `XXXInferContextDrops.fss`: wide 0 errors, compiles, runs, prints `2`; narrow 1 error (`b07`).

An overloaded outer callee:
- `over(mk())`, arms on `BoxT[\ZZ64\]` and `String`: no / yes / yes. The `BoxT` arm, `BoxT[ZZ64]`.
- `over5(mk(), Tri)`, arms on `(BoxT[\ZZ64\], Tri)` and `(BoxT[\ZZ64\], Fig)`, `Tri` under `Fig`: no / yes / yes. Both arms count; the `Tri` arm wins as more specific; runs.
- `over2(mk())`, arms on `BoxT[\ZZ64\]` and `BoxT[\ZZ32\]`: no / no / no. Both arms count, neither is more specific: a true ambiguity. Refused with today's message, not an ambiguity message (section 6).
- `over3(mk())`, arms on `BoxT[\ZZ64\]` and `Any`: yes / yes / yes, unchanged. The `Any` arm, `BoxT[Object]`. The retry never runs, since the `Any` arm accepts the call as it is (section 6).

A generic outer callee:
- `kindOf(mk(), z64)` where a `ZZ64` is expected, `kindOf[\U\](b: BoxT[\U\], u: U): U`: no / yes / yes. `U = ZZ64`, `mk[\ZZ64\]`; runs. Stock accepted the call at `U = Object`, then refused the body: "Function body has type Object, but declared return type is ZZ64."
- `pair(mk(), b64)`, `pair[\U\](b: BoxT[\U\], c: BoxT[\U\])`, `b64: BoxT[\ZZ64\]`: no / yes / yes. `U = ZZ64`; runs.
- `pair(mk(), wrapT(3))`: no / yes / yes, with different instances. Wide: `U = Object`, both arguments `BoxT[Object]`. Narrow: `U = IntLiteral`, both `BoxT[IntLiteral]`. Both run (section 6).
- `takesBoxG(mk())`, `takesBoxG[\U\](b: BoxT[\U\])`: yes / yes / yes, unchanged, `U = Object`.

Nested arguments:
- `takesBox64(idB(mk()))`: no / yes / no. Every level `ZZ64`; runs.
- `takesBox64(idB(idB(mk())))`: no / yes / no. Every level `ZZ64`; runs.
- `takesTwo(mk(), wrapT(3))`, parameters `BoxT[\ZZ64\]` and `BoxT[\ZZ32\]`: no / yes / no. `BoxT[ZZ64]` and `BoxT[ZZ32]`; runs.

Other call forms:
- `takesMany(mk(), mk())`, `takesMany(bs: BoxT[\ZZ64\]...)`: no / yes / yes. Does not compile: code generation stops at the varargs declaration itself, "Can't compile VarArgs yet" (`NamingCzar.java:1412`). That wall is not the retry's.
- `Taker.take(mk())`, a method: no / yes / yes, `BoxT[ZZ64]`; runs.
- `mk() BOXOP 3`, an operator: no / yes / yes, `BoxT[ZZ64]`; runs.
- `takesBox64(BoxT(1))`, a constructor with its `T` unwritten: no / yes / yes, `BoxT[ZZ64]`; runs.
- `takesFig(pk0(Tri, Sq))`, row 535's shape, `pk0[\T\](x: T, y: T): BoxT[\T\]`: no / yes / no. `pk0[\Fig\]`; runs.

Controls, refused by all three, rightly:
- `takesBox64(mkS())`, `mkS(): BoxT[\String\]` not generic.
- `takesBox64(wrapT("s"))`: no `T` admits a `String` into `BoxT[\ZZ64\]`.
- `takesBox32(wrapT(z64))`, `z64: ZZ64`: no narrowing.
- And `takesZZ64(idt(3))` is accepted by all three, unchanged (the binding converts the result as today).

Totals: stock 3 of 22, wide 18, narrow 13. Of the accepted, all ran with the instance above, except the varargs one.

## 3. The compiler track [measured]

`ant testCompiler` on the wide build: the compiler track (`CompilerJUTest`, `compiler_tests/` and `parser_tests/`) and the othercompiler track. Batch 11's landed gate has both at 0 failures (`compile-ladder/climb-batch-11/gate/summary.txt`: 1,078 and 263 tests).

- Compiler track: 1,078 tests, 2 failures. Othercompiler: 263 tests, 0 failures. 10 min 24 s.
- Changed verdict 1: `XXXInferContextDrops` (row 455). It now compiles with no error, so its key `compile_err_contains=File XXXInferContextDrops.fss has 2 errors.` fails: "Saw wrong failure". This is the expected failure going red because its defect is repaired.
- Changed verdict 2: `XXXInferLoneUnionClosedTrait` (row 535). It pins the refusal of `k(pk0(Tri, Sq))` at `BoxT[\Any\]`, which batch 8 took as the row's reading: "the checker types every argument before it infers the enclosing call, row 425's note, so no expected type reaches the inner call" (`CLIMB-BATCH-8.md:147`). Under wide it compiles with `T = Fig` and runs, printing `k(pk0(Tri, Sq)) ->  BoxT[Fig]` (the double space is row 76's compiled spacing). So the retry undoes exactly the premise that test pins.
- A second run with the retry log on: same 2 failures. Over every program of both tracks the retry was tried at 7 call sites and kept at 3: the two faces and row 535's call. The 4 others (`XXXNatMismatchChecker.fss:12-13`, `XXXNatArithChecker.fss:11-12`) have arguments that write their static arguments; the retry gives them the same type and passes. No program that compiles today reached the retry, so none changed silently.
- Narrow, not run as a track. Its retry is entered on the same condition and tries a subset of wide's arguments, so it can only touch those 7 sites. Measured on the two files: `XXXInferContextDrops` 2 errors to 1, red as well; `XXXInferLoneUnionClosedTrait` unchanged, green. The 4 `XXXNat` sites write their static arguments, so they keep their type under either trigger [read].
- The same two tests and the probes, run again on the clean patch above (without the switch and the log), through `junit.sh` and by direct compile: identical results.

## 4. The distance [measured]

`explorations/coordinator/tools/distance/run.sh` on the wide build, setting `any`, as the gate runs it. Compared with batch 11's landed table (`compile-ladder/climb-batch-11/gate/distance.txt`) and per-site list (`compile-ladder/gate/distance-sites.tsv`). No checker or library file changed between that landing (f9d3ec826) and fe74fb738, so the list is this base's before.

- `compare.sh`: "DISTANCE SAME 207". Every `#kind` and `#class` row equal; the same three crash rows.
- Per site, by location and message: 207 and 207, 0 cleared, 0 new.
- The retry was tried at 10 call sites of the library (21 evaluations) and kept at none. 7 of the 10 are among the 207: three juxtapositions on `NN64` (`FortressLibrary.fss:2404`, `:2754`, `:2759`), the `Comprehension` call at `:3557`, two applications at `:4366` and `:4382`, and `seq` at `:4686`. Their arguments, checked again, do not make those calls fit; each error has another cause.
- So the record's reading holds, now measured: no library site of the 207 is an argument face (`CLIMB-BATCH-12.md`, Q48, "The library's own way").
- 1,229 s (the landed run took 1,115 s at another load; not a comparison).

## 5. What the specification would need to say

Today the chapter names the argument of another call as not yet described (`Specification/basic/inference.tex:266-268`). Appendix I's entry "The contexts that give a call an expected type" says in its Effect: "It still gives no expected type to an argument of another call (row~455 of the revival's gap ledger)" (`Specification/appendices/changes.tex:2043-2044`). The ground in the text: an identifier reference's static arguments "are statically inferred from the context of the function call" (`Specification/basic/expressions/var-ref.tex:38-40`), and a declaration is chosen on its declared parameter types, then instantiated (`inference.tex`, "The Static Arguments of a Call", Choice and Instantiation).

Under wide:
- The list of contexts (`inference.tex:128-142`) gains one, before the sentence on how the call is written: "and as an argument of a call, where the argument is itself a call that does not write its static arguments and no declaration of the enclosing call is applicable to the types its arguments have without an expected type: the parameter type at that position of each declaration of the enclosing call in turn, instantiated, where the declaration has static parameters, by the other arguments and the expected type of the enclosing call; the enclosing call's declaration is then chosen as above among those that its arguments, so typed, make applicable."
- The item at `:266-268` drops "an argument of another call". It keeps the body of a `for` loop, and the body of a `label` if Q48(a) is not yet in.
- A revision box beside each, in the S1 form, citing row 455 (POSITIONS, "Every change to the specification is recorded with its reason.").
- Appendix I's entry: the argument joins the Change; the Effect's sentence on row 455 is amended; the Rationale cites `var-ref.tex`. Row 535 needs no text: the chapter's rule already fixes `T` from an expected type.

Under narrow, the same, with the argument limited to "a call of a declaration with a type parameter that only its return type mentions". The item at `:266-268` then keeps "any other argument of another call", which `takesBox64(wrapT(3))` is.

## 6. Forks met, not decided

Each is a decision not taken; the evidence is above.

1. **Wide or narrow.** Wide clears both faces and row 535's shape; narrow clears one face. Neither moves the distance or a passing test. Wide is the same rule every other context already follows: try without the expected type, keep it if it fits, else with it.
2. **A generic outer callee fixed only by retried arguments.** `pair(mk(), wrapT(3))`: wide instantiates `pair` from the other arguments and the context only, so with both arguments retried `U` takes its bound, `Object`. Narrow does not retry `wrapT(3)`, which then fixes `U = IntLiteral`. A third way, not built: fix the outer's parameters first from each retried argument's own first type where that type is not a bound it fell back to.
3. **The retry never displaces a declaration that already accepts.** `over3(mk())` picks the `Any` arm, as today, though the `BoxT[\ZZ64\]` arm would accept `mk()` retried. This follows POSITIONS, "The order of the checker's attempts at a call": a declaration that fits as it is is not passed over. The other reading, a declaration applicable "if some instance" of the argument fits (the chapter's Choice rule taken one level down), would pick the `BoxT` arm. Walk was not run on it.
4. **The message of an ambiguity the retry finds.** `over2(mk())` is refused with today's "not applicable" lines, not an ambiguity message. A rung could signal the ambiguity instead (`signalAmbiguity`, `Functionals.scala:805`).
5. **Arguments that write their static arguments.** Wide retries them too, at no effect beyond the work (the 4 `XXXNat` sites). A syntactic check of the unchecked argument would skip them.

## 7. My reading (mine, not the record's)

- The curator's reading fits what I measured. Wide is the inference rule the checker already applies at every other context, applied to arguments, by a mechanism the checker already uses twice. It changes nothing that compiles today in the compiler track or the compiler's library, and nothing in the library's distance. It repairs row 455 and undoes the premise of row 535's pinned refusal.
- Narrow is the more cautious and the less unified: it repairs one face of two, and needs a second rule for `wrapT(3)` later.
- Clean enough for batch 12's rung C, under (b) yes and wide: yes, as code. One file, which rung C does not touch (rung C edits `Operators.scala`, `Misc.scala` and `STypesUtil.scala`: `CLIMB-BATCH-12.md`, rung C, "Files"); one function split, two methods added; it applies to the base as is. What it adds to the rung: promote `XXXInferContextDrops` to a compile-and-run pair; rewrite `XXXInferLoneUnionClosedTrait` as a plain passing test and note row 535; take a few of section 2's shapes as tests (the overload, the generic outer, the nesting, the method and the operator); the spec text of section 5. Fork 1 is the curator's. Fork 3 is his decision on the order of attempts, as built. Forks 2, 4 and 5 are small and can take the patch's behaviour as their default.
- At (b) no, the record's default, nothing changes and this patch waits with row 455.

## 8. Machine

nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2,100 MHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1` (the suites force 4). Another probe worker shared the machine; the load at start was 4.6 for the track and 1.0 for the distance. No timing here is a comparison.
