<!-- The nat shadow's Java follow-up, 2026-09-22, by a delegated worker on Pavol's request.  Nothing tracked was modified: two classpath shadows
stack, the seven Scala sources of nat/shadow.patch (REPORT.md, followup.md) and ONE Java source, FnNameInfo.java, plus one new file the run-time
experiment needs -- the technique of perf-probes/prelude/run-all.sh:7,33-35.  Every run had its own caches outside the repository.  Commands:
java/run-all.sh (it rebuilds both shadows; the copies and compiled classes are not committed).  Captures: java/j*. -->

# The Java site, and what a size needs at run time

| | result | capture |
|---|---|---|
| the Java crash | **gone.** One kind dispatch in `FnNameInfo.boundsFor`: 9 lines of code added, 1 removed | `java-shadow.patch` |
| the library, per declaration | **287 clean / 154 with own errors / 5 crashes**, against 263/142/41 for the Scala shadow alone and 236/98/112 for the tree. All **36** `cannot be cast to IntExpr` gone | `j4-lib-perdecl-fates.txt`, `j4b-vs-scala-only-fates.txt` |
| the eight probes | **line-for-line identical** to the Scala shadow alone, compile side | `j1-probes.out` vs `followup/f1-probes-fixed.out` |
| the five nat compiler tests | **byte-identical** stock against shadowed; `Compiled12.invariantInference` still prints its twelve lines | `j2-compiler-tests.out`, `j2b-inference-regression.out` |
| the library, whole units | **115 errors** (`NativeArray` 44), unchanged from the Scala shadow alone (`followup.md` § 1), 11 s | `j3-lib-worldflip.out` |
| `NatExtends1` | now passes the checker and stops where `NatExtends2` did, `CodeGen.java:5793` | `j1b-natextends.out` |
| the run time | with **one stamped class per literal size** and a 17-line `RTTIsize`, `pNat1`, `pNat2`, `pNatMeth` and `pNatGenMeth` **run and print 7**; `pNatVec` then fails on a third gap (§ 3) | `j5-runtime-stamp.out` |

## 1. The change, and the name it produces

`boundsFor` (`FnNameInfo.java:162-173`) returned a `TypeArg` for every static parameter whatever its kind, and `normalizedSchema` (`:175-198`)
builds a `StaticTypeReplacer` out of the results. For a `nat s` that mapped `s` to `TypeArg(TraitType Object)`; `StaticTypeReplacer.forIntRef`
(`:221-223`) unwrapped it through `updateNode` (`:121-141`) into a `TraitType` where an `IntExpr` belongs, and `NodeUpdateVisitor.forIntArg:5310`
cast it and threw — on every checked method invocation on a nat-parameterized receiver, from `impls/Functionals.scala:606` and `:730`.

The change dispatches on the kind: `KindNat` and `KindInt` get `IntArg(IntRef name)`, exactly `STypesUtil.staticParamToArg`'s answer for those
kinds (`STypesUtil.scala:338-339`) and the same shape as the Scala half of the bug (`AbstractMethodChecker.scala:83`, REPORT.md § 9); other kinds
are untouched. **The identity, not an erasure**, because a type parameter erases to its declared bound — `Object` when there is none,
`Papers/Implementation/MethodMapping.tex:134` — and a size has no bound: the team's stance is "don't instantiate" (`internal-document.tex:206`),
the rule the plan builds on (`reviews/nat-checking-plan.md` § c: symbols and literals, equality, no arithmetic), so a size's normal form is
itself. Both halves of the JVM name call this one function — declaring side `CodeGen.java:2459` → `NamingCzar.java:800-806`, use side
`CodeGen.java:6153` on the schema `Functionals.scala:606` records — so they cannot drift.

**The name, read out of the class files** (`j6-mangled-names.txt`). `pNatGenMeth.fss` declares `idx[\nat j\](b: Box[\j\]): Box[\k\]` in
`object Box[\nat k\]`, and beside it the type-parameter twin `idxT` in `object BoxT[\T\]`. `normalizedSchema`'s output reaches a JVM name only
for a **generic** method, through `NamingCzar.genericMethodName` (`NamingCzar.java:811-833`):

```
   nat:   \=idx☝✖Arrow⟦pNatGenMeth\%Box⟦j⟧,pNatGenMeth\%Box⟦k⟧⟧
   type:  \=idxT☝✖Arrow⟦pNatGenMeth\%BoxT⟦fortress\|CompilerBuiltin\%Object⟧,…⟦…Object⟧⟧
```

The sizes stay their own symbols where the type parameters are erased to `Object`, and the declaring template (`pNatGenMeth$Box⟦⟧.class`) and the
caller (`pNatGenMeth.class`) carry the string **byte for byte the same** — which is what `Naming` expects: its `forIntRef`
(`NamingCzar.java:1894-1897`) tags `intnat` and writes the parameter's own text, `forIntBase` (`:1889-1892`) writes the literal, the two spellings
the instantiated class name already uses (`pNatMeth$Box⟦3⟧`).

**The 5 library crashes left** are none of them about sizes: `FortressLibrary.fss:1121` `__bigOperator` (`InterpreterBug: Type is not inferred`)
and the `asString` getters at `:2292` and `:2665` (`TypeError: Missing parameter type for i`, thrown not logged) are one shape, a local function
with an untyped parameter; `:4176` and `:4195` are `Not in the trait table: FortressBuiltin.Character` (`TypeAnalyzer.scala:740`) and crashed
before the nat work too (`03b-lib-perdecl-fates.txt`).

## 2. The load failure, and where a size is asked for at run time

`fortress compile pNat1` is clean; `fortress run pNat1` dies at load with `NoClassDefFoundError: 3$RTTIc`, in the clinit of
`\=AbstractArrow⟦pNat1%Box⟦3⟧,FZZ32⟧` (`j1-probes.out`); `pNatVec` asks for `5$RTTIc`, its own size.

`MethodInstantiater.visitFieldInsn` (`:65-70`) calls `rttiReference` for any `…⟧$RTTIc.ONLY` reference; there (`:94-139`) the oxford branch
retains the `opr` arguments to annotate the stem (`:117-120`) and **recurses on every other argument** (`:124-126`), so a size arrives as a bare
parameter, `Naming.stemClassToRTTIclass` (`Naming.java:1043-1051`) makes `3$RTTIc` at `:134`, and `GETSTATIC 3$RTTIc.ONLY` is emitted at `:138`;
the loader then wants a real class file (`InstantiatingClassloader.java:281-291` → `readResource:141-161`). Second site:
`CodeGen.generateTypeReference`, where an `OpArg` in an extends clause is skipped (`continue`, `CodeGen.java:5786`) and an `IntArg` falls through
the empty branch at `:5784` into the throw at `:5793` — `NatExtends1`'s stop. **A symbol needs nothing**: the template `pNat1$Box⟦⟧.class` refers
to `pNat1$Box⟦k⟧$RTTIc`, not to `k$RTTIc`, and `xlation.getTypeName` substitutes the size at instantiation (`MethodInstantiater.java:66`), so only
literals get there.

`isOprKind` (`Naming.java:95-109`) is the run time's only kind predicate and marks the parameters that are *not* RTTI-bearing: an opr argument is
baked into the RTTI stem's own name by `oprArgAnnotatedRTTI` (`Naming.java:1053-1066`, between `❮❯`, `:207-210`, re-expanded by the loader's
`isExpandedAngle` branch, `:217-219`, `:2460-2463`), left out of the factory's arity (`InstantiatingClassloader.java:2684-2691`,
`CodeGen.java:5317-5328`) and of the recursion, and substituted by a second, name-level map (`:398`). Two designs follow.

* **A — a size is not RTTI-bearing**, mirroring opr: one predicate beside `isOprKind` and the same four exclusions, and then no `3$RTTIc` need
  exist, the size being already in the mangled class name. About **5 files, 30 lines** (`Naming`, `MethodInstantiater`, `CodeGen`,
  `InstantiatingClassloader`, `OverloadSet.java:1185`) — untested, and it puts sizes into a name channel used only for oprs today.
* **B — a size is RTTI-bearing and each literal gets a class**, which is what the code already assumes: `CodeGen.java:5317-5328` counts a size
  among the RTTI parameters, so `pNat1$Box$RTTIc.factory` already takes an argument for it, and `RTHelpers.getRTTIclass` (`RTHelpers.java:18-45`)
  builds the instantiated RTTI class name out of each argument's `RTTI.className()` (`RTTI.java:53-59`), so a size's RTTI must answer the literal,
  the way `VoidRTTI.className` answers the snowman (`VoidRTTI.java:18-20`). **Built and measured**: `runtimeValues/RTTIsize.java`, new, 17 lines
  of code (in `java-shadow.patch`), plus one stamped `<n>$RTTIc` per literal from `StampSizeRTTI.java`, a 36-line ASM tool (a class whose name
  begins with a digit cannot be written in Java source). On `MORE_PATH` (`bin/run_classpath:28-31`) four probes run and print 7
  (`j5-runtime-stamp.out`). To land it, the stamping moves into the loader — one branch in `loadClass`'s dispatch
  (`InstantiatingClassloader.java:226-291`) plus an emitter modelled on `instantiateArrowRTTI` (`:1563-1627`) but smaller, about 30 lines — and
  `CodeGen.java:5784` must push the size in the extends-clause path, about 10: **3 files, about 60 lines of code, 17 of them written and
  working.**

## 3. What this does not settle

**`pNatVec` still does not run, for a third reason.** Past `5$RTTIc` it fails with `NoClassDefFoundError: pNatVec$s0` inside `len⟦FZZ32,5⟧`'s
closure (`j5-runtime-stamp.out`): `len[\T, nat s0\](v) = s0.asZZ32` uses the size **in value position**, which the spec allows outright
(`Specification/basic/trait-parameters.tex:83-86`), and codegen emits a class reference for it — a third run-time piece.

**Which design is right is a decision, not a measurement.** Nothing here says whether dispatch must tell `Box⟦3⟧` from `Box⟦4⟧` at run time —
decision A's question — and `RTTIsize.runtimeSupertypeOf` just answers "equal sizes only"; its `javaRep` is a placeholder (`java.lang.Object`),
`FZZ32.class` being unusable because its static initializer needs a generic Fortress class that only the instantiating loader can make.

**The gate was not run**, as in REPORT.md § 11: `build.xml` builds the test classpath from `ProjectFortress/build`, so neither shadow is on it;
the table's four middle rows stand in for it. And **the other kinds still have the bug** — `boundsFor` is unchanged for `bool`, `dim`, `unit`
and `opr`, each unwrapped into the wrong node the same way, out of the minimal design's scope (`nat-checking-plan.md` § c) and reached by no
probe here.
