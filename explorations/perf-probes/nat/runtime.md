<!-- The nat shadow's run-time follow-up, 2026-09-22, by a delegated worker on Pavol's request: settle the A/B fork
and the value-position question by probe, so the later batch gets a clean brief.  Nothing tracked was modified.
Three classpath shadows stack, rebuilt into THIS directory's own copies (runtime/scala-src, runtime/java-src,
runtime/{shadow,java,stamp}-classes -- none committed) from four committed patches: ../shadow.patch,
../java/java-shadow.patch, design-a.patch, value-position.patch.  Both new behaviours are flag-gated, so ONE
build measures both designs: -Dprobe.nat.likeOpr (A, the default; false = the tree, design B's premise) and
-Dprobe.nat.valuePos.  Own caches outside the repository per run.  Commands: runtime/run-all.sh -- steps 1-6 as
one run, step 7 (NatExtends) separately afterwards with the same commands. -->

# A size at run time: design A built, measured, and set against design B

## 1. Design A, built

**A is the opr path reused, not a second one beside it.** `isOprKind` (`Naming.java:103-109`) is the run time's
only kind dispatch, and it marks the static parameters that carry no RTTI object: `rttiReference` keeps them out
of the factory's arity and of the RTTI recursion (`MethodInstantiater.java:117-126`) and bakes them into the RTTI
stem's name between the heavy angles (`Naming.java:1053-1066`); the factory pushes null in their place
(`InstantiatingClassloader.java:2684-2691`); `RTHelpers.getRTTIclass` reads them back off the stem to build the
instantiated class name (`:18-45` of `RTHelpers.java`). A adds `XL_INTNAT` to that one predicate
(`Naming.java:98`) and makes the declaring side agree: `oprsFromStaticArgs` / `oprsFromKindParamList`
(`CodeGen.java:5803-5822`) collect an `IntArg` / an `intnat` beside an `OpArg` / `opr`, taking the text from
`NamingCzar.spkTagger` (`NamingCzar.java:1890-1896`) so both sides spell the size identically; the four
`instanceof KindOp` gates deciding whether a parameter gets a field, a getter and a factory argument
(`CodeGen.java:5265, 5321, 5349, 5560`) become one `oprLikeKind`; the `IntArg` branch of the extends-clause push
(`:5784`) `continue`s as the `OpArg` branch beside it does, instead of falling into the `CompilerError` at `:5793`;
and `OverloadSet.java:1176-1185` gets the same annotation, so dispatch and RTTI agree on the stem.

**One thing A needed that the opr path had never needed itself.** When *every* static argument is annotated onto
the stem, no parameters are left, and `CodeGen.java:5367-5385` gives the RTTI class a single `ONLY` and no
factory -- but `rttiReference` emitted `factory()` regardless (`MethodInstantiater.java:128-131`), so the first
build died with `NoSuchMethodError: pNat1$Box❮3❯$RTTIc.factory()`. Three lines take `ONLY` instead, as the
non-generic branch below does (`:133-138`); an all-opr generic would hit this too.

**Size: 4 files, 28 lines of code (71 with their comments), 8 removed** -- `design-a.patch`. **Measured**
(`r1-probes-A.out`; the compile side is line-for-line the baseline of `java/j1-probes.out`, and the five nat
compiler tests are byte-identical stock against shadowed, `r5-compiler-tests.out`): `pNat1`, `pNat2`, `pNat3`,
`pNatMeth`, `pNatGenMeth` compile and **run**, printing 7 -- no stamped class, no `RTTIsize`, nothing new on the
classpath. `pNat4`, `pNat5`, `pNat6`, `pNatBool` still stop at the checker with 1/2/1/1 errors, unchanged.
`pNatVec` gets **past** design B's `5$RTTIc` to the third gap, `pNatVec$s0` (§ 3) -- so A handles the mixed
`Vec[\T, nat s0\]` shape, the factory's null-pushing being already driven by the full ordered kind list
(`CodeGen.java:5389-5390` passes `original_xldata`).

**What a run-time type test can see, probed.** `pNatOver.fss` overloads `g(v: Vec[\ZZ32,3\])` against
`g(v: Vec[\ZZ32,4\])` and prints **3 then 4 under A** (`r1-probes-A.out`) **and under B** (`r2-probes-B.out`): both
designs tell the sizes apart -- A through the annotated stem name, B through the size's own `RTTIsize`.
`typecase` cannot answer the question: `pNatCase.fss` dies in codegen with "Error trying to close method scope",
and so does `pTypeCase.fss`, the same program with a *type* parameter, with the shadow off entirely -- the
instruction it was emitting is a plain `INSTANCEOF` on the instantiated class, so it is a pre-existing bug.

## 2. A against B

| | **A** -- a size is not RTTI-bearing | **B** -- a size is RTTI-bearing (`../java.md` § 2) |
|---|---|---|
| files, lines | 4 files, **28 lines of code** (71 with comments), 8 removed; `design-a.patch`; all inside functions that existed | 3 files, **about 60 lines**, 17 written and working (`RTTIsize.java`, a new run-time class); the other ~30 a class *emitter* in the loader, plus ~10 at `CodeGen.java:5784` |
| what has to exist at load time | nothing; the `❮n❯` RTTI template is expanded like any opr generic | one `<n>$RTTIc` class per distinct literal. It cannot be written in Java source (a class name may not begin with a digit), so the loader must emit it; the probe hands it in from a 36-line ASM tool |
| what runs | `pNat1` `pNat2` `pNat3` `pNatMeth` `pNatGenMeth` print 7; `pNatOver` prints 3, 4; `pNatVec` reaches the third gap (`r1-probes-A.out`) | the same five print 7 and `pNatOver` prints 3, 4, given the stamped classes; `pNatVec` reaches the same third gap (`r2-probes-B.out`) |
| what fails | `pNat4` `pNat5` `pNat6` `pNatBool` at the checker, 1/2/1/1 errors -- unchanged | identical |
| a nat in an **extends clause** | compiles, and `NatExtends2` **runs and prints 7** -- one `continue` at `CodeGen.java:5784` retires the stop at `:5793` (`r8-natextends.out`) | `NatExtends1` *and* `NatExtends2` still die at compile time: `CompilerError: Only emitting RTTI for types right now` |
| what a type test can see | 3 vs 4, **yes** -- through the stem name `Vec❮3❯` (measured) | 3 vs 4, **yes** -- through `RTTIsize.runtimeSupertypeOf`, which answers "equal sizes only" and whose `javaRep` is a placeholder (measured; `../java.md` § 3) |
| what the loader stamps per literal | an RTTI interface and class per **(stem, size tuple)** actually used | one tiny `<n>$RTTIc` per **distinct literal**, shared by every stem, plus a dictionary entry per argument tuple. For the library's own literals that is **4** classes: `0`, `1`, `2`, `3`, in 85 places (`r7-lib-literals.txt`) |
| what a size loses / keeps | **loses** its field, its getter and its RTTI object (`CodeGen.java:5321, 5349` skip it), so it cannot be read back off a value at run time -- only its place in the name | **keeps** all three, in the same channel a type parameter uses, so a size is readable and its subtype rule is changeable later |
| start-up (`r6-startup.out`, `-verbose:class`, three timed runs) | `pNat1` loads **11** distinct RTTI classes, 2 of them the size's (`Box❮3❯$RTTIc` + `$RTTIi`); 562/611/613 ms. `pNatGenMeth`, two literals of one stem: 16 classes, 743/638/759 ms | `pNat1` loads **12**, 3 of them the size's (`3$RTTIc` + `Box$RTTIc`/`$RTTIi`); 600/616/707 ms. `pNatGenMeth`: 16 classes, 724/659/712 ms. For *k* literals of one stem, A needs 2*k* classes and B *k*+2 -- A cheaper at one, equal at two, B cheaper above. **The times are inside the noise** |
| whose side | **A is the team's opr treatment**, literally: one term added to the one predicate | nearer the spec's "numeric value", by a hair -- it makes that value an object the run time holds. But `trait-parameters.tex:82` is true of both, and `:83-86` is § 3's business under either |

### Recommendation, and a labelled default

**Default: A, with B's `RTTIsize` kept on the shelf.** The two run the *same* programs, stop at the *same* third
gap, and both tell `Vec[\ZZ32,3\]` from `Vec[\ZZ32,4\]` at run time, so the decision is not about capability but
about cost: A is twenty-eight lines inside four existing functions and needs nothing new to exist at load time,
where B needs a class *emitter* in the loader for classes whose names begin with a digit; and A passes a nat in
an extends clause for free, where B needs ten more lines. A is how the team treated an opr argument; B is what
the team's code assumed when it counted a size among the RTTI parameters (`CodeGen.java:5317-5328`) and never
wrote the class that assumption needs. **The one thing A gives up:** a size can no longer be read back off a
value at run time -- no field, no getter, no RTTI object, only its place in the class's name. Nothing in the
library, the spec's example or the thirteen probes wants that today; if something later does, B's seventeen
working lines can go on top of A for the arguments that need it. **§ 3 does not depend on the choice**: measured
under both (`r3-`, `r4-valuepos-*.out`).

## 3. A size in value position

**Where codegen turns the symbol into a class.** `len[\T, nat s0\](v) = s0.asZZ32` reads `s0` as a value. The
checker types such a `VarRef` `IntLiteral` (`KindEnv.getType`, `staticenv/KindEnv.scala:64-70`) and `s0` is not in
`lexEnv`, so `CodeGen.forVarRef` (`:5969-5996`) takes its fresh-import path: `jvmClassForToplevelDecl` at `:5983`
makes the class name `pNatVec$s0`, and `VarCodeGen.StaticBinding.pushValue` (`VarCodeGen.java:257-258`) emits
`GETSTATIC pNatVec$s0.ONLY` -- the same under both designs (`r1-`, `r2-probes-*.out`).

**What the value should be, and where it already is.** The literal the instance was stamped with is in the
instantiated class's own name under both designs, and the run time already has a substitute-at-load channel for
reading a name out as a constant: a call to the magic class `CONST`, whose *method name* goes through the
instantiation map and is then replaced by an `LDC` (`MethodInstantiater.java:195-207`; live idiom at
`CodeGen.java:2579-2581`). Neither design needs new run-time state -- only the name. **Built: 3 files, 25 lines
of code (48 with comments)** -- `value-position.patch`. A third `CONST` op beside
`hash` and `String` (`Naming.java:266-268`) that the loader turns into an integer `LDC`, and a branch in
`forVarRef` emitting it followed by the same `IntLiteral.make(int)` `forIntLiteralExpr` uses (`:3871-3886`). The
constant is written between oxfords (`⟦s0⟧`), the only place `InstantiationMap` substitutes a bare name: `nonVar`
(`InstantiationMap.java:325-329`) does not disqualify `.`, so `String.s0` is looked up whole and misses -- the
first attempt produced the text `s0` and a `NumberFormatException`. **`pNatVec` then runs and prints 5**, under A
(`r3-valuepos-A.out`) **and** under B with its stamped sizes in front (`r4-valuepos-B.out`): the fix reads the
name, which both designs carry, so it is design-independent.

**Does the spec's example need it?** Not the example: `makeVector[\T extends Number, nat s0\]():Vector[\T,s0\]`
(`Specification/basic/examples/StatParam.Nat.fss`, at `trait-parameters.tex:94-97`) never reads `s0` as a value.
The sentence beside it does -- a nat "may ... appear in any context that a variable of type N32 can appear,
except that it cannot be assigned to" (`:83-86`) -- and no array library can be written without it.

## 4. What this does not settle

- **The gate was not run**: `build.xml` builds the test classpath from `ProjectFortress/build`, so no shadow is on
  it (`../REPORT.md` § 11). The five nat compiler tests stand in; `../java.md`'s library runs were not repeated,
  design A changing no checker code -- only names and codegen. And `typecase` is broken for every generic (§ 1).
- **A size read inside a method of a sized object is a fourth gap.** `NatExtends1`, whose `Buf[\nat s\]` has
  `len(): ZZ32 = s.asZZ32`, compiles under A and throws at *load*: `NumberFormatException: "s"` from
  `MethodInstantiater.java:219`, that body being expanded inside `NatExtends1$Buf⟦3⟧$RTTIc`, whose instantiation
  map does not bind `s` (`r8-natextends.out`). § 3's constant must be emitted only where the enclosing template
  binds the symbol. `NatExtends2`, with no such method, runs.
- **Neither design says what `runtimeSupertypeOf` should mean for a size** beyond equality; `bool`, `dim` and
  `unit` still have both the checker bug (`../java.md` § 1) and this one.
- **Both designs change class names**, so both need every cache rebuilt, the compiler's prelude included -- its
  only sized declaration being `trait Matrix[\T, nat s0, nat s1\]` (`Library/CompilerLibrary.fss:638`).
