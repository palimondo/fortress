<!-- The three probes that reviews/size-runtime-design-brief.md § 12 asks for before the size rung is briefed (a dispatched arm generic in a size, the fourth gap, a type test on a size), measured 2026-09-24 by a delegated worker under design A and design B in the stacked nat shadow of runtime/run-all.sh.  Nothing tracked was modified: the stack is rebuilt from the same four committed patches into a work directory outside the repository, four new patches stack on it, each behind its own -D flag and off by default, and every program is compiled and run in its own fresh copy of a private cache.  Commands: size-probes/run.sh; programs, patches and captures under size-probes/. -->

# Three probes before the size rung

## The answers

- **A dispatched arm generic in a size.** The first rung's checker refuses the program before either design is reached. `normalizeUA` drops a `nat` parameter from a generic arrow, so the return-type rule compares two renamed sizes and refuses every size-generic arm that has a less specific sibling (`scala_src/types/TypeSchemaAnalyzer.scala:449, 485`). Four code lines fix it (`keep-size-params.patch`). Past the checker, design A links and runs, and the answer is wrong. A dispatched vector or matrix reaches the catch-all arm, because the dispatcher tests the value against a class named with the arm's own symbol, `Vec⟦FRR64,s⟧`. Design B does not compile (`compiler/OverloadSet.java:1199`), even when every arm has only literal sizes. With 29 code lines in `OverloadSet` (`dispatch-b.patch`), and B's extends-clause piece for the trait program, B answers right on all four programs, and the arms read their sizes as 3, 4 and 2 4. The fix under A is not built. It needs more than reading a size out of the value's descriptor class name. A sized descriptor's interface and its type-argument getters carry the size in their names, so the dispatcher cannot name them, and the closure loader takes only descriptor objects. By reading, the fix is about 70-90 lines in two files, and it has two design questions (§ 2.4).
- **The fourth gap.** No method template fails to bind the size. Under design A, a sized descriptor names its object class with the template's symbols. The descriptor without a factory builds its `ONLY` from `LDC Buf⟦s⟧` (`compiler/codegen/CodeGen.java:5380`). The factory builds the name from the unsubstituted stem `Arr1❮b0,s0❯` (`runtimeSystem/InstantiatingClassloader.java:2797`). The loader passes both constants through unchanged (`runtimeSystem/MethodInstantiater.java:167-169`). So the loader stamps `Buf⟦s⟧` beside `Buf⟦3⟧`, and a size read in that bogus class fails on `"s"`. Seven code lines in the two loader files fix it (`fourth-gap-a.patch`). With the fix, `NatExtends1` and the library-shaped `NatGetter` print 3 under A. The same cause gives a `ClassCastException` when a sized type argument reaches a dispatched generic arm, and the same patch fixes that too. Under B both programs stop at `CodeGen.java:5793`, as the brief says. With B's own extends-clause piece (14 code lines, `extends-b.patch`) both print 3, and B has no fourth gap.
- **A type test on a size.** Yes, under both designs. With clause bodies that need no coercion, a `typecase` tells `Vec[\ZZ32,3\]` from `Vec[\ZZ32,4\]`. It also does so when the size is a static parameter of the enclosing function. The type-parameter control works as well, so the old failure was row 340's shape and nothing about sizes.
- **The default.** Probe 1 meets the brief's own stop condition: "back to him only if the dispatch arm needs more under A than reading a size out of the value's descriptor class name" (§ 9, § 11). It does, so by the brief's own rule design A is not taken as the default; the choice goes back to Pavol. Probes 2 and 3 would not move the default by themselves. Probe 2 costs A a seven-line repair that B does not need, and probe 3 is neutral. On the two questions probed, the measured cost is lower under B. A is still the cheaper design for a size in an `extends` clause, and it needs no class per literal.

What each design needs now, in code lines by one rule (added lines that are not comments or blank, as `runtime.md` counts them). "Built" means built and measured here or in `runtime.md`.

| piece | design A | design B |
|---|---|---|
| the run-time kind | 28, built (`runtime/design-a.patch`) | 17 built (`RTTIsize`), about 30 not built (the loader's per-literal emitter; `java/StampSizeRTTI.java` stands in) |
| a size in an `extends` clause | in the 28 | 14, built (`extends-b.patch`; the brief estimated about 10) |
| a size read as a value | 25, built, the same for both (`runtime/value-position.patch`) | the same 25 |
| the fourth gap | 7, built (`fourth-gap-a.patch`) | none needed |
| a dispatched arm generic in a size | about 70-90 by reading, not built, two design questions | 29, built (`dispatch-b.patch`) |
| the checker, for both (the first rung's) | 4, built (`keep-size-params.patch`) | the same 4 |

---

## 1. How it was measured

- **The stack.** `size-probes/run.sh` rebuilds `runtime/run-all.sh`'s stack by the same commands from the same committed patches (`shadow.patch`, `java/java-shadow.patch`, `runtime/design-a.patch`, `runtime/value-position.patch`). It builds into `<work-dir>/stack`, not beside the patches. Four new patches then stack on it, each behind its own flag and off by default (`run.sh:13-29`). With every new flag off, the stack reproduces `runtime/r1-probes-A.out` and `runtime/r2-probes-B.out` byte for byte (`s5-runall-check.txt`, both `diff exit=0`).
- Two of `shadow.patch`'s hunks, the `parents`/`excludesClause` memo in `TypeAnalyzer.scala`, are rejected today, here and in `run-all.sh` alike. The tree has landed its own memo since (`d28cf74d0`). The r1/r2 reproduction above is on this stack.
- `fourth-gap-a.patch` touches `InstantiatingClassloader.java`, which `run-all.sh` does not shadow. The file enters the stack as an unchanged copy, so the stack with the flag off is still `run-all.sh`'s.
- **Fresh caches.** Every program is compiled and run in its own copy of a world's cache (`run.sh`, `probe`). A shared cache is a trap here. A program already compiled into a cache is not compiled again, so a second flag set silently runs the first set's classes. An early run in this session reported a program that the checker refuses as compiling, for exactly that reason.
- **The worlds.** The four worlds are `run-all.sh`'s `cA`, `cB`, `cV` and `cVB`: the compiler's prelude, compiled into a private cache with every new flag off. A new flag changes the compiled prelude at most in the descriptor of its one sized declaration, the empty `trait Matrix` (`Library/CompilerLibrary.fss:638`). No probe uses it. The prelude has no `opr` parameter and no overloaded sized arm (grep of `Library/Compiler*.fs?` and `ProjectFortress/LibraryBuiltin/*.fs?`).
- **B's per-literal classes.** B's descriptor classes are stamped by the committed tool for the literals 0-5. `run-all.sh` stamps 2-5; `NatGetter`'s `Arr1[\ZZ32,0,3\]` needs 0 as well.
- **The interpreter's answers.** Each program's header comment gives walk's output, from `bin/fortress` with a private cache. `NatExtends1` does not run on walk: the interpreter has no `asZZ32` on `ZZ32` ("Cannot find definition for method asZZ32 given receiver 3: ZZ32"). `NatGetter` stands in for it there and prints 3.
- **Time.** The whole script ran in 10 min 3 s on this container, 7.5 min of it the four worlds. The captures come from later runs of steps s1-s5 against the same stack and worlds, after edits to the script that touched only those steps (s2 and s3 in 2 min 19 s with the rest; s1, s4 and s5 last, in 1 min 54 s).
- **The gate was not run.** The test class path cannot see a shadow (`runtime.md` § 4).

## 2. Probe 1: a dispatched arm generic in a size

**The programs.** Ledger row 214's three arms, a scalar arm beside an arm generic in one size and one generic in two, each with a catch-all `f(x: Any)`. The first three calls are resolved by the checker from the argument's static type. The last four are typed `Any`, so the checker picks the catch-all and the overload set's dispatcher chooses the arm at run time. Four programs:

- `pNatDisp.fss`: the arms on objects.
- `pNatDispTrait.fss`: the arms on traits that the values' objects extend, the library's shape (`Library/FortressLibrary.fsi:1465, 1583` for `Vector` and `Matrix`, `:1077, :1080` for `Rank1` and `Rank2`).
- `pNatDispSize.fss`: each generic arm prints the size it was instantiated at, so it needs the value-position piece.
- `pNatDispLit.fss`: literal sizes, `runtime/pNatOver.fss`'s pair with a catch-all, and an arm generic in a type with a literal size.

`pNatDispRTR.fss` is the checker control.

### 2.1 The checker refuses the set first

| program | stack | with `keep-size-params.patch` | capture |
|---|---|---|---|
| `pNatDisp` | 2 errors: "the return type of `[\nat s\]Vec[\RR64,s\]->String` should be a subtype of the return type of `Any->String`" | compiles | `s1-dispatch.out:2-11`; `:59-60` |
| `pNatDispRTR` (arm returns `ZZ32`, catch-all `String`) | — | still refused, same error | `s1-dispatch.out:40-47` |

- The rule is `OverloadingOracle.satisfiesReturnTypeRule` (`scala_src/overloading/OverloadingOracle.scala:81-107`). It builds a special arrow and calls `normalizeUA` (`:95`). `normalizeUA` (`scala_src/types/TypeSchemaAnalyzer.scala:223-231`) rebuilds the arrow's static parameters from `boundsSubstitution` (`:420`). `boundsSubstitution` keeps only `KindType` parameters: its loop pattern is `_:KindType` (`:449`), and it returns only those (`:485`).
- So a `nat` parameter vanishes from the arrow while its body still names it. `subtypeUA` then reaches plain subtyping with two differently renamed sizes (`:145`). The size track compares them as symbols and says no.
- A trace in a scratch copy of the shadow (not kept) showed the failing comparison: `s$4` against `s$4$5`, reached from `TypeSchemaAnalyzer.subUA:145` ← `OverloadingOracle.satisfiesReturnTypeRule:97` ← `OverloadingChecker.returnTypeCheck:530`.
- Two controls are in the capture. With the shadow's own switch `-Dprobe.nat.argsAlwaysEqual=true` (`shadow.patch`), which makes any two sizes equal, `pNatDisp` compiles. Its answers are then wrong, statically resolved calls included, so the switch only locates the refusal (`s1-dispatch.out:22-31`). The type-parameter twin `pTypeDisp.fss` compiles on the stack as it is, and prints walk's scalar vector other (`:33-38`).
- The fix keeps `nat` and `int` parameters unchanged: 4 code lines, one of them the changed `Some(...)` (`keep-size-params.patch`).
- This is the first rung's code (the checker shadow), not either design's. The first rung is in batch 4's manifest (brief, "The decision in plain words"). Without this fix it would refuse row 214's compiled twin whenever the set has a less specific arm. The tree never reaches this line with a size: it crashes earlier, in `makeInferenceArg` (FACTS, "The checker and the one library"). A scratch build whose Scala shadow had failed to compile, so that the tree's checker ran, showed that crash on a one-arm version of this program.

### 2.2 Design A

| program | resolved statically | dispatched | capture |
|---|---|---|---|
| `pNatDisp` | scalar vector matrix, right | scalar **other other** other; walk: scalar vector matrix other | `s1-dispatch.out:59-68` |
| `pNatDispTrait` | right | scalar **other other** other | `:70-79` |
| `pNatDispLit` | — | three four other T-three other, right | `:81-88` |
| `pNatDispSize` | 0 3 2 4, right | 0 **-1 -1 -1** -1; walk: 0 3 4 2 4 -1 | `:90-102` |

- A links and runs, and it silently picks the catch-all for every arm generic in a size.
- The dispatcher's bytecode shows why (`s1b-javap.txt:1-32`). Design A's hunk in `OverloadSet.makeTypeStructure` writes the size's text into the stem, a symbol included (`runtime/design-a.patch`, the hunk at `OverloadSet.java:1176-1185`).
- No type variable is left, so the arm is treated as non-generic. The dispatcher then tests `INSTANCEOF pNatDisp$Vec⟦FRR64,s⟧` (`OverloadSet.java:1015, 1077`) and would call `f⟦s⟧`. No value is of that class.
- Literal sizes work under A, including in an arm generic in a type. There the dispatcher tests `INSTANCEOF Vec❮3❯$RTTIi` and calls the getter `Vec❮3❯__1` (`s1b-javap.txt:46, 53`): the size is part of both names.

### 2.3 Design B

| program | B as `java.md` § 2 left it | with `extends-b.patch` | with `dispatch-b.patch` | capture |
|---|---|---|---|---|
| `pNatDisp` | compile dies: `CompilerError: Only handling some static args of generic types` | — | scalar vector matrix / scalar vector matrix other, right | `s1-dispatch.out:105-120`; `:219-228` |
| `pNatDispTrait` | compile dies, same | compile dies, same | right (both patches) | `:133-148`; `:190-205`; `:230-239` |
| `pNatDispLit` | compile dies, same | — | right | `:161-176`; `:241-248` |
| `pNatDispSize` | — | — | 0 3 2 4 / 0 **3 4 2 4** -1, right | `:250-263` |

- The throw is `OverloadSet.java:1199` (`:1242` in the patched shadow, `s1-dispatch.out:107`). The type structure accepts only `TypeArg`s.
- It fires for literal-only arms too. `runtime/pNatOver.fss` compiled under B (`runtime/r2-probes-B.out`); its two arms have no less specific sibling. `pNatDispLit`'s `g` is the same pair with a catch-all, and its compile dies. Why the pair alone does not reach the throw was not traced.
- `dispatch-b.patch` does three things, all in `OverloadSet`:
  - A size symbol of the arm becomes a leaf the way a type variable does: it is read off the value's descriptor through the getter `Vec__2` and handed to `RTHelpers.loadClosureClass`.
  - A literal becomes a leaf that compares descriptors (`RTTIsize` answers by equality).
  - A size's bound is skipped. The compile path gives every static parameter, of any kind, `extends Object` (`compiler/desugarer/PreDisambiguationDesugaringVisitor.java:77-86, 135-148`). The dispatcher then checks the size's descriptor against `Object`, and `RTTIsize` fails that check. In an intermediate build without the skip, the arm was never taken, and its bytecode had `getstatic CompilerBuiltin$Object$RTTIc.ONLY` … `runtimeSupertypeOf` on the size. The captures have only the final patch.
- `s1b-javap.txt:79-161` is the result. It shows `INSTANCEOF pNatDisp$Vec$RTTIi`, the getters `Vec__1` (checked against `FRR64`) and `Vec__2` (stored), then `loadClosureClass(table, "pNatDisp⚙$f⟦⟧…", size)`.
- 29 code lines, 3 of them imports and 2 the probe's flag.

### 2.4 What design A would need, not built

The brief's condition was "reading a size out of the value's descriptor class name". The dispatcher needs more than that under A. By reading:

1. **Finding the stem.** Every sized descriptor interface carries its size in its name (`Vec❮3❯$RTTIi`, `CodeGen.java:5227`), and so does its supertype list (`:5249`). A value reaches a trait arm through its object's descriptor: the template is `interface Arr1❮s❯$RTTIi extends Vctr❮s❯$RTTIi`, stamped at `❮3❯` (`s1b-javap.txt:34-38`). The dispatcher cannot name that interface in an `INSTANCEOF`. It needs a run-time helper that walks the value's descriptor class and its interfaces, matches the stem by name, and returns the sizes. About 20 lines in `RTHelpers`.
2. **The other arguments of that stem.** The type-argument getters are named per size too (`Arr1❮s❯__1`, `Vec❮3❯__1`; `CodeGen.java:5267`; `s1b-javap.txt:37, 53`). Checking `RR64` in `Vctr[\RR64,s\]` needs reflection, about 8 lines, or a size-free interface per sized stem, which is a change to A's naming.
3. **The inference loop.** It keeps each static argument as a descriptor in a local and compares repeated occurrences with `runtimeSupertypeOf` (`OverloadSet.java:1410-1636`). A size would be a string there. Storing it and comparing it by equality is about 10 lines. The library's `DOT` shares a size between two arguments (`FortressLibrary.fsi:1619-1620`), so the comparison is needed.
4. **The closure loader.** `RTHelpers.loadClosureClass` takes `RTTI[]`, hashes `getSN()` and names the class from `className()` (`runtimeSystem/RTHelpers.java:160-178`). A size needs a variant that takes a string, about 12 lines, plus about 5 lines at the emitted call (`OverloadSet.java:1637-1696`). The alternative is a descriptor object made at dispatch, which is B's `RTTIsize` inside A.
5. **Recognising the size variable** in `makeTypeStructure` and a new structure kind to emit 1-2: about 15-25 lines.

About 70-90 lines in `OverloadSet` and `RTHelpers`, not built. Two questions in it are Pavol's:

- **How does a size travel inside the dispatcher and into the closure loader?** As a string beside the descriptor objects, a second channel through the loader's API. Or as a descriptor object made at dispatch, which is design B's object used by design A.
- **How does the dispatcher reach a sized stem's descriptor interface and getters, whose names hold the size?** By reflection at every dispatch. Or by giving each sized stem a size-free interface, which adds to A's naming what B's descriptor already has.

## 3. Probe 2: the fourth gap

**The programs.**

- `../NatExtends1.fss`, a method of the sized object: `len(): ZZ32 = s.asZZ32` in `object Buf[\nat s\]`.
- `NatGetter.fss`, the library's shape: `getter size(): ZZ32 = s0`, a default getter of a sized trait `Sized1[\T, nat b0, nat s0\]` that an object extends. `ReadableArray1`'s getter is the same (`Library/FortressLibrary.fss:2019-2022`).
- `pNatJavaRep.fss`, the cause without a size read: a sized type argument reaching a dispatched generic arm.

| program | A + value position | with `fourth-gap-a.patch` | B + value position | with `extends-b.patch` | capture |
|---|---|---|---|---|---|
| `NatExtends1` | load fails: `NumberFormatException: "s"` | **3** | compile dies at `CodeGen.java:5793` (`:5818` in the shadow) | **3** | `s2-fourth-gap.out:2-22`; `:50-53`; `:61-76`; `:118-121` |
| `NatGetter` | load fails: `NumberFormatException: "s0"` | **3** | compile dies, same | **3** | `:24-47`; `:55-58`; `:89-104`; `:123-126` |
| `pNatJavaRep` (A, no value position) | `ClassCastException`: `Wrap⟦Vec⟦E,3⟧⟧` cannot be cast to `Wrap⟦Vec⟦E,s⟧⟧` | **wrap** | wrap (B as built) | — | `:140-150`; `:152-155`; `:157-160` |

**Which class fails.** A trace in a scratch copy of the loader (not kept) named the class being stamped when the error is thrown. In `NatExtends1` it is `NatExtends1$Buf⟦s⟧`, with the map `{s=s}`. In `NatGetter` it is `NatGetter$Sized1⟦FZZ32,b0,s0⟧$DefaultTraitMethods`, with the map `{T=FZZ32, b0=b0, s0=s0}`. The map does bind the size. It binds it to its own name, because the class was asked for under that name. The capture shows the same without the trace. In `NatExtends1` the throw comes out of `readAndExpandGenericThing`, reached from `Buf❮3❯$RTTIc.<clinit>` (`s2-fourth-gap.out:12-21`). In `NatGetter` it is reached from `Arr1❮0,3❯$RTTIc.factory` through `RTHelpers.getRTTIclass` (`:33-45`). And `s2b-loaded-classes.txt` shows the classes loaded under the symbols.

**Who asks for it: the descriptor, not a method.**

- Under A, a stem whose static arguments are all sizes gets a descriptor with no factory, only `ONLY`. Its class initialiser builds it from `LDC <its object class>` (`CodeGen.java:5369-5386`; the `LDC` at `:5380`). In the template that constant is `Buf⟦s⟧`.
- A stem with a type argument gets a factory. The factory builds the object class's name from the stem `Arr1❮b0,s0❯`, loaded by a plain `LDC` (`InstantiatingClassloader.java:2797-2802`). The branch that would load it through the substituting `CONST.String` channel is switched off in the tree: `if (true || xldata == null)`, with the comment "NOT symbolic (and a problem if we pretend that it is)".
- `MethodInstantiater.visitLdcInsn` passes every constant through (`:167-169`). So `Buf❮3❯$RTTIc` asks for `Buf⟦s⟧` and `Arr1❮0,3❯$RTTIc` for `Arr1⟦FZZ32,b0,s0⟧`. Their method bodies, or their trait's `$DefaultTraitMethods`, then read `CONST.Nat⟦s⟧` under `{s=s}`.
- It happens without any size read too. Under A as built, `pNat1` loads `pNat1$Box⟦k⟧` and four arrow classes over it (`s2b-loaded-classes.txt:7-9, 13-14`). `pNatVec` loads `Vec⟦FZZ32,s0⟧` and four arrows (`:17-32`). With the patch, none of them load (`:37-45`, `:47-57`), and `pNatVec` prints 5 either way (`:34`, `:59`).
- The descriptor's Java class is that bogus class, so `className()` answers `Vec⟦E,s⟧`. A dispatched generic arm instantiates itself from that answer (`RTHelpers.java:172-178`), which is `pNatJavaRep`'s `ClassCastException`.
- `runtime.md` § 2's start-up counts listed only descriptor classes, so these extra loads were not in them.

**The fix, 7 code lines in the two loader files (`fourth-gap-a.patch`):**

- `visitLdcInsn` instantiates a class constant as it instantiates any type name.
- The factory loads a stem annotated between heavy angles through `RTHelpers.symbolicLdc`. That is the branch the tree switched off, now taken only for annotated stems.

**Which template must bind the size, then.** The descriptor class's template. It does bind the size: it is stamped under `Buf❮3❯` and `Arr1❮0,3❯`. The two constants it uses to name its object class were never passed through that binding. No change to what an instantiation map binds was needed (the brief's second stop condition, § 9).

**Under B the fourth gap does not occur.** B's descriptor is made by a factory that names the object class from each argument's `className()`, and a size's is its literal (`java/java-shadow.patch`, `RTTIsize.className`). With `extends-b.patch` both programs print 3 and nothing else is needed. `s2-fourth-gap.out:129-138` runs B with `fourth-gap-a.patch` as well: both still print 3.

## 4. Probe 3: a type test on a size

**The programs.**

- `pNatCase2.fss`: `runtime/pNatCase.fss` with `String` clause bodies, which need no coercion.
- `pTypeCase2.fss`: its type-parameter control.
- `pNatCaseGen.fss`: the size in the clause is a static parameter of the enclosing generic function, `isOfSize[\nat s\](v: Any)`.

| program | design A | design B | walk | capture |
|---|---|---|---|---|
| `pTypeCase2` | three four other | three four other | same | `s3-typecase.out:2-7`; `:26-31` |
| `pNatCase2` | three four other other | three four other other | same | `:9-15`; `:33-39` |
| `pNatCaseGen` | yes no no yes | yes no no yes | same | `:17-23`; `:41-47` |

- The test is an `INSTANCEOF` on the value's own class under both designs: `Vec⟦FZZ32,3⟧`, then `Vec⟦FZZ32,4⟧` (`s3b-javap.txt:6, 14`). In the generic function's template it is `INSTANCEOF Vec⟦FZZ32,s⟧` (`:30`), and the loader fills in the size when it stamps `isOfSize⟦3⟧` and `isOfSize⟦4⟧`.
- The descriptor is not consulted, so the choice of design does not enter.
- The old pair died on row 340's shape, as the brief read it. The brief proposes adding both old programs to row 340's evidence (§ 9); this measurement supports that reading.

## 5. Also measured: ledger row 366

- Row 366's program (`compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss`, `object Op[\opr ODOT\]() end`) prints `Op[\+\]` on the stack, with walk's spelling, and does so with `fourth-gap-a.patch` on as well (`s4-row366.out:1-15`).
- It does so under B's flags too. Design A's `MethodInstantiater` hunk, the three `ONLY` lines, is not behind the flag (`runtime/design-a.patch`). So those three lines are row 366's fix, as the brief read it (§ 9), now measured on its reproducer.
- The gated `XXXOprParamRungS` was not run.

## 6. What is not settled

- **The gate.** `ant testFast` and `ant testSystem` were not run. `fourth-gap-a.patch` changes every template's class constants and every annotated factory, so only the gate can say what else it touches. The tree's comment on the switched-off branch says it was "a problem". With the patch on, `run-all.sh`'s thirteen programs give `r1-probes-A.out` byte for byte (`s5-runall-check.txt`), and row 366's program still prints `Op[\+\]`. What the problem was is not known.
- **A's dispatch fix** is estimated by reading, not built (§ 2.4).
- **B's per-literal emitter** is still not written. The probes use stamped classes.
- **Repeated sizes in one arm.** `keep-size-params.patch` and `dispatch-b.patch` were exercised only on arms whose sizes each occur once. `DOT`'s shared `m` (`FortressLibrary.fsi:1619-1620`) is not probed under either design. Under B the second occurrence goes through `runtimeSupertypeOf`, which `RTTIsize` answers by equality.
- **`keep-size-params.patch` beyond these programs.** It keeps a size parameter unchanged and ignores the unifier's size substitution. It was not run on the library or on the five nat compiler tests.
- **The ledger.** Nothing was appended. The brief's § 9 list of rows to append names the fourth gap and the size-generic dispatch arm; these probes sharpen both:
  - the fourth gap is design A's: its descriptor names its object class with the template's symbols;
  - the dispatch arm: under A it silently picks the catch-all; under B the compile refuses any size, literal arms included.
- Two candidate rows are not on that list:
  - the first rung's return-type rule refuses a size-generic arm beside a less specific one;
  - the compile path gives a size parameter `extends Object`, which B's dispatcher then checks.
