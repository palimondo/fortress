<!-- The two unmeasured halves of PLAN item 35, measured so that the curator's choice of the natives' one binding text (`reviews/item35-natives-binding.md`) rests on data: way 1's compiled half, a front-end rewrite of `builtinPrimitive("pkg.Class.method")` bodies into calls through the `import java` machinery, built in a classpath shadow and run on five shapes in the compiler's own world; and way 2's checker half, twenty of `ZZ32`'s natives in `Library/FortressLibrary.fss` converted to `import java` calls on a private copy of the library and put through the gate's distance stage, by hand and then once more by the script on a fresh copy, with the same result. Written 2026-10-09 by a delegated probe worker on `main` at `d5c6167ab`. Walk's half of both ways and the count are on file and were not measured again (`natives-shape.md` §§ 1, 2, 4; its files at `4a46fb83a`). Shadows, the library copy, private caches and captures were under the tree's gitignored `tmp/natives-probe/`; no tracked file changed and ant was not run. Every command is in `natives-binding-probe.sh`, beside this note, which rebuilds both measurements from the tracked sources. -->

# Item 35: the two unmeasured halves

Terms, as in the write-up. **Way 1**: every native body stays `builtinPrimitive("…")`, its string naming a static helper in `nativeHelpers/`. **Way 2**: `import java` blocks and ordinary calls, as `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` writes its natives. **The rewrite**: way 1's compiled half, which turns a body that is exactly `builtinPrimitive("pkg.Class.method")` into a call of that helper. **The stand-in table**: `natives-shape.md`'s gap 1 patch, which makes `NamingCzar`'s foreign-type table name the one library's types in walk's world (`patches/gap1-namingczar-table.patch` at `4a46fb83a`). **The distance**: the distance stage's error count over the one library (`coordinator/tools/distance/run.sh`). **Rung**: one edit and its failing test under the full gate.

## The answers

1. **Way 1's compiled half works, and costs one rung.** A new class of 116 lines (`BuiltinPrimitiveRewriter`) and two hooks in `compiler/Parser.java` (+4 −2): 2 files. A test component whose bodies are `builtinPrimitive` strings naming existing helpers compiles and runs all five shapes: a top-level function, a trait's functional method, an object's dotted method, a helper that raises `IntegerOverflow`, and two overloads of one helper name. The rewrite has to sit at the parse, before every phase, so the type checker reads the rewritten calls, as it reads way 2's. That is the low end of the write-up's "one to two rungs by reading".
2. **The checker accepts the twenty converted `ZZ32` bindings.** The distance stays at 105. All 105 sites are the landed list's sites. 100 are identical, and the other 5 are the same errors with the two operands of a join printed in the other order. No crash came or went. A control shows that the checker does check such calls in walk's world: it refused a binding that did not fit its helper.
3. **Neither result reverses the write-up's recommendation of way 1, but its third reason weakens.** Way 1 does not keep the natives away from the checker; it only chooses when the checker reads them (section 3).

## 1. Way 1's compiled half

### What was built

The rewrite, in `compiler/BuiltinPrimitiveRewriter.java`, a new file in the shadow:

- **Which bodies.** It takes a declaration whose body is a tight juxtaposition of the name `builtinPrimitive` and a string literal. This is the shape walk recognizes (`interpreter/glue/NativeApp.java:164-188`). The string must name a public static method of a class that loads: `pkg.Class.method`. Any other string is left alone, for example walk's glue classes, `"…glue.prim.Int$Less"`.
- **The import.** For each package, the component gains `import java pkg.{Class.method => builtinPrimitive_Class_method, …}`. This is the node that the parser makes for a written `import java` (`parser/Compilation.rats:235-239`, `:350-359`).
- **The call.** The body becomes `builtinPrimitive_Class_method(args)`, built on the original juxtaposition node, so it has the shape that the parser gives `f()`, `f(x)` and `f(x, y)`. The arguments are the parameters in order. A method of a trait or an object passes `self` first: a dotted method gets `self` added, and a functional method has its `self` moved to the front. Walk's `NativeMeth` passes its arguments the same way (`interpreter/glue/NativeMeth.java`, `applyMethod(self, args)`).

The rewrite has two hooks in `Parser.java`:

- **`parseFileConvertExn`** (`:323`) rewrites each parsed component.
- **`importCollector`** (`:156`) returns the whole rewritten component instead of the imports alone. Without this hook the repository never learns of the synthetic imports (below). With the first hook alone, the compile of the test component stops with `java.lang.IllegalArgumentException: Undefined API: com.sun.fortress.nativeHelpers`.
- **The switch.** Both hooks run only under `-Dfortress.builtinPrimitive.rewrite=true`, a device of the probe.

### What ran

`fortress compile` ran in the compiler's world, with the shadow first on the class path and the switch on, followed by `fortress run`. Each program had fresh private caches. The test component is `NativesBindingBP.fss`, in the script:

| Shape | Declaration | Helper | Printed |
|---|---|---|---|
| top-level function | `less(a:ZZ32, b:ZZ32):Boolean` | `simpleIntArith.intLT(int,int)` | `true`, `false` |
| trait's functional method | `same(self, other:Shape):Boolean` in `trait Shape` | `equality.sEquiv(Any,Any)` | `true`, `false` |
| object's dotted method | `kind():JavaString` in `object Box(v:ZZ32)` | `stringOps.typeName(Any)`, called with `self` | `Box` |
| helper that raises | `add(a:ZZ32, b:ZZ32):ZZ32` | `simpleIntArith.intOverflowingAdd(int,int)`, which throws `fortress.CompilerBuiltin$IntegerOverflow` | `5`, then `IntegerOverflow caught` from a Fortress `catch` |
| two overloads of one name | `show(s:JavaString):()` and `show(n:ZZ32):()` | `simplePrintln.nativePrintln(String)` and `(int)` | `seven`, `7` |

    $ fortress compile NativesBindingBP.fss   (rewrite shadow first, -Dfortress.builtinPrimitive.rewrite=true)
    ### compile rc=0
    $ fortress run NativesBindingBP
    true / false / true / false / Box / 5 / IntegerOverflow caught / seven / 7      (one per line)
    ### run rc=0

The rewritten tree, from `fortress parse -out` followed by `unparse` (the unparser prints no `java`):

    import com.sun.fortress.nativeHelpers
       .{ simpleIntArith.intLT => builtinPrimitive_simpleIntArith_intLT,
            equality.sEquiv => builtinPrimitive_equality_sEquiv, ... }
    trait Shape
        same(self, other: Shape): Boolean =
        builtinPrimitive_equality_sEquiv(self, other)
    end
    object Box(v: ZZ32) extends Shape
        kind(): JavaString =
        builtinPrimitive_stringOps_typeName(self)
    end

On the compiled path, the overloaded helper name needs no rule:

- Both Java overloads come in under one alias, and the checker picks one by type.
- The rule that the write-up gives N0 (distinct names, or parameter types in the string) is needed only by walk's loader, which picks by arity (`natives-shape/patches/opt1-builtinprimitive-static.patch`, `StaticNativeApp.find`).

No regression was seen in a sample of compiled tests:

- 17 `.test` files ran in one JVM with the shadow and the switch on: `Hellos` and `IntSemanticsRungB` (both use `import java`), `other_compiler_tests/Arrow`, `CompileMath`, `TO`, and twelve drawn from `compiler_tests/`.
- Result: `OK (98 tests)`. The whole compiler track was not run.

### What failed, and why

- **The unchanged tree, as a control.** Six times `Variable builtinPrimitive is not defined.`, one for each body. The compiler's world does not declare `builtinPrimitive` (`perf-probes/prelude/REPORT.md` § 3).
- **A helper that does not fit its declaration.** The checker reports the rewritten call at the binding's own span and names the alias:

      NativesBindingBPMisfit.fss:8:37-118:
          Function body has type ZZ32, but declared return type is Boolean.
      NativesBindingBPMisfit.fss:11:27-108:
          Could not check call to function builtinPrimitive_simpleIntArith_intOverflowingAdd
          - (ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type ZZ32.

- **A misspelt helper name** (`…intOverflowingAddd`).
  - The rewrite leaves the string alone, as it leaves walk's glue strings. The compiler's world then says `Variable builtinPrimitive is not defined.`
  - On the one library, after the switch-over, `builtinPrimitive` is declared, with a `fail` body (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:34-35`). Such a string would then compile into a call of that body and fail only when it runs.
  - So the landing rung needs one more rule. A string under `com.sun.fortress.nativeHelpers.` that names no static method is a static error. The glue strings that stay walk-only, class D2 (`natives-shape.md` § 2), are still left alone.
- **Nothing else failed.**
- **Not run:**
  - the one library's own bindings, which the compiled path does not read yet;
  - a functional method whose `self` is not its first parameter;
  - helpers over compiled-world types;
  - walk with the switch on.

### Where it sits: before the type checker

The rewrite cannot sit later than the parse if it is to use the `import java` machinery:

- **When the foreign api is made.** The repository builds the component graph from the import collector's view of each file (`GraphRepository.java:448-454`, `readCUFor` at `:1022-1026`). It hands each `import java` to `ForeignJava.processJavaImport` there (`:957`). That is where the foreign api is made, before any phase runs.
- **Who reads it.** Disambiguation then binds the alias against that api, which `augmentApiMap` adds to every component's environment (`GraphRepository.java:169`, `ForeignJava.java:617`). Code generation writes the wrappers for it (`compiler/phases/CodeGenerationPhase.java:79-94`).
- **The other placement.** Putting the rewrite after the checker would mean building, by hand, the typed call nodes that the checker and the overloading phase put on a call. That was not built, and it would not be the existing machinery.

So the checker types each rewritten call against the helper's Java signature through `NamingCzar`'s table, exactly as it types way 2's written calls. The misfit messages above show it.

Both of the gate's checker stages reach the same parser:

- **The checker stages.** Both run the compiled path's phases through the same repository: the distance at `coordinator/tools/distance/DistanceMulti.java:44` and `:64`, and the checker count at `coordinator/tools/checker-count/WorldFlip.java:37` and `:42`.
- **Walk.** Walk parses through the same repository too (`Shell.java:111-112`, `:1219`), so a landed switch must keep walk off.

Whether the gate's stages see the rewritten calls depends on what keys the switch:

- **Keyed to the compiled path's world** (`useCompilerLibraries`):
  - The gate's stages run in walk's world, so they see nothing until the switch-over. On N5 the checker reads every rewritten binding at once.
  - The write-up's "the distance cannot move from this work" holds this way. No stand-in table is needed anywhere before N5, as the write-up's way 1 assumes ("No stand-in table to remove later", said of N0).
- **Keyed to the command** (the compile phases on, walk off):
  - The stages read each family's calls from the rung that changes its strings, exactly as under way 2.
  - The gate's checker stages then need the stand-in table from N1, as under way 2.

### Its cost in rungs

**One rung.** The rung holds:

- the class and the two hooks, as built here;
- the switch, keyed one of the two ways above;
- the refusal of a helper string that names nothing;
- compiled tests of the five shapes and of the two failures, pinned with `compile_err_equals`.

The probe's code compiled once and ran every shape on its first run. This is the low end of the write-up's estimate. The write-up's condition for bringing the question back, "If the probe fails, or finds the rewrite costs more than two rungs", is not met.

## 2. Way 2's checker half

### What was converted

The private copy:

- **The home.** A `FORTRESS_HOME` under `tmp/` holds a copy of `Library/` and `ProjectFortress/LibraryBuiltin/`, and a copy of `ProjectFortress/build/`. The build copy's `NamingCzar` classes are compiled from today's `NamingCzar.java` with the stand-in table's patch, which still applies cleanly.
- **What it links.** `src/`, `third_party/`, `test_library/`, `astgen/` and `bin/` are links to the tree.
- **What changed.** In the copy's `FortressLibrary.fss`, only the bodies of 20 bindings of `trait ZZ32` (`:727-812`) changed, each to a call in `CompilerBuiltin.fss`'s form.
- **The imports.** Two `import java com.sun.fortress.nativeHelpers.{…}` blocks went on lines 23 and 24, which are blank in the tree. The first holds 16 aliases from `simpleIntArith`; the second holds `simpleLongArith.intToLong` and `simpleUnsignedIntArith.makeNN32FromZZ32WithSpecialCompilerHackForNN32ResultType`.
- **The line numbers.** Every line number was kept, so the sites compare with the landed list without remapping.

The twenty bindings, with the line of each body:

- **comparisons:** `=` (738), `<` (740);
- **negations:** unary `-` (756), unary `DOTMINUS` (758);
- **addition and subtraction:** `+` (760), `DOTPLUS` (762), `-` (764), `DOTMINUS` (766);
- **multiplication and division:** `DOT` (768), `TIMES` (770), `juxtaposition` (772), `DOTTIMES` (774), `DIV` (776), `CHOOSE` (786);
- **bit operations:** `BITAND` (788), `BITOR` (790), `BITXOR` (792), `BITNOT` (798);
- **conversions:** `widen` (803), `unsigned` (807).

Each is bound to the helper of its class A or B match (`natives-shape/count/classified.tsv`). The wrapping operators are bound to the wrapping helpers, the library's meaning, and not to the compiler prelude's saturating ones (row 348). For example, line 760 became `jIntOverflowingAdd(self, b)`.

Left out, because they are not a call on Java values today:

- `LSHIFT`, `RSHIFT` and `^`, which take an `AnyIntegral` parameter;
- `REM`, `MOD`, `GCD`, `LCM` and `partitionL`, which are class C, with no helper;
- `big`, whose helper takes a `long`.

The distance stage ran once on the copy, with the gate's setting and its own scratch and caches under `tmp/` (`run.sh <out> <scratch> any`, run from the copy's home). Its result was then compared site by site with `explorations/compile-ladder/gate/distance-sites.tsv`, the landed list of climb batch 13's gate (`738904f9a`). No source that the distance reads has changed since that commit, and the base was not run again.

### What the checker says: accepted

- **The trait.** `trait ZZ32` checks with no error: `@@TC DECL-OK TraitDecl …/FortressLibrary.fss:727:1-812:2 errors=0`.
- **The foreign api.** `com.sun.fortress.nativeHelpers` passes every stage with 0 errors. None of the twenty bindings was refused, and none crashed the checker.
- **The table.**

      #total	105                                  (landed: 105)
      #crash	the same two rows: FortressLibrary.fss:1309-1313 and :2887-3000
      $ compare.sh climb-batch-13/gate/distance.txt <this table>
      DISTANCE SAME   105
          class I3                      3 -> 1      (-2)
          class OT                     13 -> 15     (+2)

- **Site by site.** 105 sites against 105. 100 match in kind, location and message.
- **The other five.** They are the same errors at the same sites, with a join's two operands printed in the other order: `FortressLibrary.fss:1339` (`OR(O0,I0)` against `OR(I0,O0)`), `:2427` and `:2438` (the array joins), and `:3231` and `:3248` (`OR(IntLiteral,T)` against `OR(T,IntLiteral)`). Both runs on the copy print all five the same way, so the order did not vary between those two runs. What sets the order was not traced.
- **The `I3` and `OT` move.** It is that order. `classify.py`'s `I3` rule matches only `has type OR(IntLiteral,` (`coordinator/tools/distance/classify.py:348-351`). So the two errors at `:3231` and `:3248`, printed with `T` first, fall to `OT`. This is a defect of the classifier: the same two errors count as `I3` or as `OT` by the order in which a join's operands are printed.
- **The control.** A component checked in walk's world through the same table (`NativesBindingWorld.fss`, `DistanceMulti` on that one file) holds two bindings:
  - one that fits its helper, `fits(a:ZZ32, b:ZZ32):Boolean = jIntLT(a, b)`, which is accepted;
  - one that does not, `misfits(a:ZZ32, b:ZZ32):Boolean = jAdd(a, b)`, which is refused: `NativesBindingWorld.fss:10:35-43: Function body has type ZZ32, but declared return type is Boolean.`
  So the acceptance above is a check that passed, not a check that never ran.
- **The second run.** `natives-binding-probe.sh distance` rebuilt the copy from the tracked sources and ran the stage again. It gave the same table (`#total 105`, the same two crash rows, `I3` 1 and `OT` 15), the same five sites in the same order, and the same control.

### Its cost in rungs

**Nothing beyond the binding edits, for this family.** The distance does not move, so the write-up's "phase 3 would read noise from the natives work" measures zero for these twenty.

Not measured:

- the families whose types the table maps by a special case, or not at all: `Char` carried as `int`, `String` through the stand-in's `String`, `RR32`, the unsigned types, the I/O objects;
- the 21 bindings whose parameters are not Java values. Their conversions would be new bodies, under way 2 inline and under way 1 in a second declaration, and the checker would read them either way.

## 3. What this changes in the write-up

- **Way 1's compiled half**, "not measured; one to two rungs by reading", is now measured at one rung. Its failure condition is not met.
- **"Under 1 the type checker reads today's text until the switch-over, so the distance cannot move from this work"** holds only with the switch keyed to the compiled path's world. Even then, the checker reads every rewritten binding on the switch-over day. The rewrite gives the checker the same calls that way 2 writes, through the same machinery and the same table. Way 1 defers the checking; it does not avoid it.
- **Way 1's limit, "The checker never sees the string"**, holds only for a string that the rewrite leaves alone. A string whose helper does not fit its declaration is a checker error under the rewrite, with the alias named (the misfit run). The misspelt string needs the refusal of section 1, or it fails only when it runs.
- **Way 2's checker half**, "whether it accepts them is not measured", is measured for `ZZ32`'s twenty: accepted, and the distance does not move.
- **The overloaded helper names** (`simplePrintln`, `simpleIntVector`) need a rule only on walk's side.
- **The recommendation.** Neither result reverses it:
  - The first two reasons stand: the library's own form, and the specification's printed declaration.
  - The third reason weakens. "The distance left alone until the switch-over" is a choice of switch, and it buys a single day on which the checker reads about 350 rewritten bindings. Under way 2, or under way 1 with the switch keyed to the command, the gate reads them family by family. For the one family measured, the reading cost nothing.
  - Way 1's measured extra cost is one rung, as the write-up assumed.

## Decisions taken

- **The probe's rewrite leaves unresolved strings alone.** A string that names no static method is left as it is, so the misspelt string reaches the compiler's "not defined" message. The alternative, a refusal, is the landing rung's rule (section 1), and was not built.
- **The alias is spelled `builtinPrimitive_Class_method`,** one per helper. It is readable in the checker's messages, and no library declaration has such a name.
- **The family for way 2 is the twenty `ZZ32` bindings with Java-valued parameters and an existing helper.** These are the bindings the brief named. The families that the table maps by a special case are left for another probe.
- **Line numbers were kept.** The imports went on two blank lines, and each body stayed on its own line, so the comparison needed no remapping.
- **The script's distance mode was run once more, on a fresh copy.** It is a second run of the converted library, not of the base, which the brief forbids running again.

## Questions for the curator

- **If way 1:** which key for the rewrite's switch?
  - (a) The compiled path's world: the gate's checker stages read nothing of the natives until N5, then about 350 rewritten bindings at once, and no stand-in table is needed before N5.
  - (b) The command, with walk off: the gate reads each family from its N1 to N4 rung, as under way 2, and the stand-in table comes in at N1.
  - Not taken here. The write-up's text assumes (a): "the distance cannot move from this work".

## For the coordinator

The commit adds this note and its script, and edits nothing else. The record holds the following lines that it makes stale:

- **FACTS, "The territory map", the `import java` entry.** It says the compiled half is "not measured (one to two rungs by reading)". It is measured: one rung, before the checker.
- **INDEX.** It has no line for this note yet.
- **`classify.py`'s `I3` rule** depends on the order in which a join's operands are printed (section 2).

## Machine and timings

- **The machine.** `nproc` 4; Intel Xeon Processor @ 2.10 GHz, 2100 MHz; JDK 25.0.4.1; `FORTRESS_THREADS=1`.
- **The distance runs.** The first had load 0.04 0.11 1.00 at its start; its `#seconds` row reads 1,396 s, of which 807 s were for `FortressLibrary`. The second, the script's, had load 0.88 0.79 1.02 at its start and read 1,397 s, of which 812 s were for `FortressLibrary`. The probe's first command saw load 0.09 0.13 1.05.
- **What ran beside them.** The rewrite's compiles, the 17-file JUnit sample (75 s) and the script's rewrite mode ran during the distance runs, on other cores.
- **Not a comparison.** No timing here is one: the landed table's 1,429 s came from another run, under another load.
