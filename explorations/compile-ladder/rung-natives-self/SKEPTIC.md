# Climb batch 24, rung W: the skeptic's verdict

Judged: `wip/rung-natives-self` at `d1228e1f0b815094a87e306ac8d98339cdebc34f`, the worker's head, cut from `b0f6cd6b7`.

**Verdict: approved.** The change is right as the worker left it. My four commits correct the record only; none changes code, and none is contested:

- `cd562a9a0`: the worker's `REPORT.md` and `record.md`, written from the run's journal, byte for byte.
- `383ce4e40`: citations, row 846's change and F-299's hand-over.
- `44abf09e8` and `b0c050f2c`: NEW-W-2 and NEW-W-3, two defects of the compiled path that my programs measured.

No code changed after the worker's head, so no suite ran again. The report declares no count or distance table, because neither stage ran (fork 10). The gate's tables on the merged tree are the record.

## What I checked

**1. The paths.** `git diff --name-only b0f6cd6b7460389333cb7ad1b050b736f8f68e6e...HEAD` lists only these paths:
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/` (`FunctionClosure.java`, `MethodClosure.java`, `FunctionalMethod.java`);
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/` (`NativeApp.java`, `StaticNativeApp.java`);
- `ProjectFortress/tests/`;
- `explorations/`.

No checker code, Scala or generated code changes, so I ran no count stage. No compiled-path source names a changed class: a grep for `interpreter.glue.(NativeApp|StaticNativeApp)` and `interpreter.evaluator.values.(FunctionClosure|MethodClosure|FunctionalMethod)` over `compiler`, `scala_src`, `runtimeSystem`, `nativeHelpers` and `codegen` finds nothing.

**2. Test first**, read in the worker's transcript (call ids are the last six characters):
- **Failing on the base's code, before any build.** At 12:06:00 (`QP3Cgf`), `git diff --stat b0f6cd6b7 -- ProjectFortress/src` printed nothing, and `harness-one.sh $PWD/tmp/rung-natives-self/h-before` gave:
  - '# harness-one 2026-10-31T12:06:01Z; tree b0f6cd6b7; ... cache empty'
  - '6' / ' Missing expected refusal at load'
  - 'Tests run: 5,  Failures: 3,  Errors: 0'
- **The edit and the first build.** `git apply` of `rung-W.patch` (`MXn5u5`, 12:06:37) and the first change (`eXB74C`, 12:06:56) came after that run. The first build started at 12:07:03 (`4pmNE2`).
- **The generic test.** It was written at 12:10:13 (`gQ9hsz`), after that build, and seen failing on the old code through the base build's harness: 'tree 1f5c49b4f', '14', ' Missing expected refusal at load', 'Tests run: 6,  Failures: 4,  Errors: 0'.
- **The `FlatString` and `JavaString` tests** failed on the old code at 12:23:36. They failed again on the build of `aa52279ea` at 12:23:49 (`sZ7JRv`): '10' / ' Missing expected refusal at load' / 'Tests run: 3,  Failures: 2,  Errors: 0'. That was before the second edit (`5SMR87`, 12:24:14) was built (`BUwjHz`, 12:24:51; 'BUILD SUCCESSFUL', 'EXIT=0').
- **Passing.** The last edit of code is the one at 12:24:14. The final harness run (`vs7Fxt`, 12:25:44) gave 'OK (15 tests)'. `ant testSystem` (`rcAhDw`, started 12:26:15) gave 'Tests run: 176', '168', '185', '171', all with 'Failures: 0, Errors: 0', then 'BUILD SUCCESSFUL'. `ant testSpecData` (`NuEkc6`) gave 'Tests run: 130, Failures: 0, Errors: 0', then 'BUILD SUCCESSFUL'. `d1228e1f0` (12:33:32) commits that code.

**3. The diff, line by line**, against fork 4 (`explorations/coordinator/CLIMB-BATCH-24.md:109`), the brief and row 847.
- **The closures.** `MethodClosure`'s two constructors pass `definer`, and `FunctionalMethod`'s two pass `self_parameter_type`. Each keeps the base's `isFunctionalMethod`: `false` for `MethodClosure`, `true` and `false` for `FunctionalMethod`'s two.
- **The loader.** `NativeApp.checkAndLoadNative`'s two-argument form passes `null`. `StaticNativeApp.find(s, defn)` passes `null`, so a top-level function, a local function and a function expression load as before.
- **The cache.** `NativeApp`'s cache key is the string and the declaration, unchanged. A method's declaration reaches the loader only through a closure that names its declarer. `FunctionClosure(TraitMethod, Environment)` hands on an already loaded `NativeApp`, whose `getBody()` is `null` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:77-79`). `NodeUtil.getBody` gives none for a declaration that is neither an `FnDecl` nor an `FnExpr` (`nodes_util/NodeUtil.java:662-666`). So that constructor does not load the native again, and no method enters the cache unchecked.
- **The worker's two changes to the planner's text.** I agree with both:
  - The self-first rule (`StaticNativeApp.java:147`, `:154`) is the brief's and fork 4's own wording: "takes only an overload whose first Java parameter is that carrier".
  - Leaving out `FlatString` and `JavaString` (`StaticNativeApp.java:88`) improves the text, as the brief allows ("Take the text, or improve it and say why"). It is measured: on the patch's build, a program's own `object FlatString` answered 10.
- **The merge with rung F.** `git merge-tree --write-tree` of `origin/wip/rung-natives-float` and this head exits 0. The merged `javaFor` holds F's `|| t.equals("Float")` line, and the merged `find` holds W's check. `javaForSelf`'s own `Float` line then repeats F's, which does no harm.

**4. The precedent.** Climb batch 23's refusals of a declared parameter type and a declared result type that no Java type carries (`StaticNativeApp.java:124-136`) are the precedent. The new refusal at `:137-141` has their message form. The team's glue checks no types (`interpreter/glue/NativeMeth.java:29-31`). The worker found and followed this precedent.

**5. The tests.** Each has one comment line and is named by its topic. Each key names the helper and the refusal. No message cites the specification.

**6. My own programs**, below.

**7. The three homes**, below.

**8. The ledger, and the sibling sites**, below.

**9. The report.** The citations of its six provenance lines say what they claim:
- the ledger's line 865;
- `default-libraries.tex:37-39`;
- `FortressBuiltin.fsi:14-29` and `:19`;
- `StaticNativeApp.java:129`, `:147`, `:154` and `:88`;
- `FunctionClosure.java:61-71`, `MethodClosure.java:36`, `FunctionalMethod.java:36` and `NativeApp.java:164-207`.

The report lists the sentences made false: `Specification/appendices/changes.tex:4493-4498`, F-299's row-847 sentence (`explorations/coordinator/FACTS.md:134`), and `.claude/skills/fortress-repo/references/interpreter.md:103` with the sentences after it. I found no other: a grep for row 847 over `Specification`, `Documentation`, both libraries, FACTS, POSITIONS and the skills finds only these and `sources.md:941`. The report gives that last one too.

The whole-suite runs, `ant testSystem` and `ant testSpecData`, are those of the head's code. My corrections are below.

**10. Competing declarations.** Each of the seven test components is declared once in the test folders. `javaForSelf` and the new overloads are declared nowhere else under `ProjectFortress/src/com/sun/fortress/`. No branch of the batch's other six rungs adds a `NativeHelperUncarriedSelf` file. Only rung F touches `StaticNativeApp.java`.

**11. Where a loud failure becomes a quiet value.** This happens only in the worker's third control, with `Int.asString` bound to the overloaded `simpleOverload.baz`. The old code refused it, 'has 2 overloads that fit'. The new code prints 'asString: baz 5', taking `baz(int)` because `Int`'s `self` is carried in `int`. That is the rule of `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:19`: "the one whose Java parameter and result types carry the declared types, %self% first". Everywhere else the rung turns a quiet wrong value into a refusal, as in these programs:
- `Holder` answered 6;
- an object expression answered 107, the length of its generated type name;
- a program's own `FlatString` answered 10;
- a generic object answered 11, and is now refused at its instance (NEW-W-1).

## The library's bindings under the check

A refusal of a library binding would stop every program, so I checked the 152 bindings that the batch's rungs move and climb batch 23's 21.

**The functional methods.** The worker's text and the planner's prototype check these alike: `hasSelf` already forces `off == 1`, and the prototype compares `xs[0]` with the carrier there. The planner measured the prototype with F, Z and S, and with H, and every binding loaded (`explorations/coordinator/CLIMB-BATCH-24.md:409`, `:415`). K's two bindings are `ZZ32`'s and `ZZ64`'s `CHOOSE`, at `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose`. By `javap -cp ProjectFortress/build -public`, those take '(int, int)' and '(long, long)', the carriers of `ZZ32` and `ZZ64`.

**The dotted methods.** The worker's first change does refuse more of these than the prototype did. The batch's dotted bindings (`explorations/compile-ladder/plan-24/probes/families-base.tsv`, the headers without `self`) and climb batch 23's two (`moved-base.tsv`) all name a helper that takes `self` first at its owner's carrier:
- 'doubleToString(double)' for `Float`;
- 'longToString(long)' for `Long`;
- 'toString(java.math.BigInteger)' for `BigNum`;
- 'unsignedIntToString(int)' for `NN32`;
- 'charToString(int)' and 'charCodePointWithSpecialCompilerHackForCharacterArgumentType(int)' for `Char`;
- 'intToString(int)' for `Int`.

So none is refused. The gate on the merged tree is the run that confirms it.

## My programs, old code against new

The programs are in my scratch folder under the worktree's `tmp/`. Each is described here in full.

The commands, run from that folder:
- walk on the old code: `/home/user/fortress-base23/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 /home/user/fortress-natives-self/tmp/old-caches P.fss`;
- walk on the new code: `FORTRESS_HOME=/home/user/fortress-natives-self /home/user/fortress-natives-self/bin/fortress P.fss`;
- the compiled path on the old code: the same old-code line with `compile P.fss`, then `run P`;
- the compiled path on the new code: `FORTRESS_HOME=/home/user/fortress-natives-self FORTRESS_CACHES=<a copy of the base build's caches> bin/fortress compile P.fss`, then `run P`.

The new code's compiled runs use a copy of the base build's caches because the worker's build emptied the tree's own caches, and I compiled no library. The library sources and the compiled path's code are the base's, so the base's library jars are valid for them.

The diff adds no field and no shared state; the new constructors write the existing fields `def` and `instArgs`. Even so, I ran the walk programs at `FORTRESS_THREADS=1` and again at `=4`, and got the same answers. At four threads the object expression's answer is 110, not 107, because its generated name holds the path of a different folder.

| program | walk, old | walk, new | compiled, old = new |
|---|---|---|---|
| `x: ZZ32 = 7`, `y = -3`: `+`, juxtaposition, unary `-`, `\|y\|`, `MAX`, `<`, `=`, `asString`, `asExprString`, `DIV`, `REM`, `CMP` (the 21 moved bindings' kinds) | 'plus 4 times -21 neg -7 abs 3 max 7' / 'lt false eq false str 7 expr 7' / 'div 3 rem -1 cmp GreaterThan' | the same | 'plus  4  neg  -7  lt  false  str  7' |
| an object expression `object extends HasLen len(): ZZ32 = builtinPrimitive(...nativeStrlen) end` | 'before' / '107', rc 0 | 'Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen: no Java type carries *objectexpr_ObjectExpr at .../SkObjExpr.fss:8.16, the type of self.', rc 1, before 'before' | 'Variable builtinPrimitive is not defined.', rc 255 (NEW-W-2) |
| a functional method `opr \|self\|` of a program's own object `Holder` | '6', rc 0 | '... no Java type carries Holder, the type of self.', rc 1 | not run: `Holder`'s dotted case gives 'JavaString->ZZ32 is not applicable to an argument of type Holder.', rc 255 |
| `opr +(x: ZZ32, self)` of a trait `Shape`, bound to `simpleIntArith.intAdd`, `self` second | 'getInt not implemented for FOrdinaryObject', an `InterpreterBug` at the call, rc 1 | '... intAdd: no Java type carries Shape, the type of self.', at load, rc 1 | '(ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type (Shape, ZZ32).', rc 255 |
| a local function inside `Holder`'s method, and a top-level function, both bound to `nativeStrlen` | 'local 4 top 3' | the same | not comparable: the top-level function alone gives 'JavaString->ZZ32 is not applicable to an argument of type String.', rc 255, since the compiler's prelude reads `nativeStrlen`'s parameter as `JavaString` until the switch-over |
| a local function `g(x: ZZ32): ZZ32` in `run()` and a top-level `top`, both at `simpleIntArith.intNeg` | 'top -3 local -4' | the same | 'Variable builtinPrimitive is not defined.' at `g`, rc 255 (NEW-W-2) |
| `object MyNum extends ZZ32` with its own `asFloat(self): RR64`, then `MyNum + 1` | 'before', then 'getInt not implemented for FOrdinaryObject', rc 1 | the same | compiles; the run ends 'java.lang.IncompatibleClassChangeError: class SkCompSubZZ32$MyNum can not implement com.sun.fortress.compiler.runtimeValues.FZZ32, because it is not an interface', before 'before' (NEW-W-3) |
| `object Long` with a bound `len()` | 'Type name may refer to: Long, FortressBuiltin.Long', rc 255 | the same | not run |
| `object BigNum` with a bound `len()`, in a second component that the main one imports | 'Type name may refer to: SkHelperLib.BigNum, FortressBuiltin.BigNum', rc 255 | the same | not run |

The compiled checker refuses a program's own `Holder` and `Shape` bindings statically, so after the rung the two paths agree that such a binding is refused. The last two rows confirm the worker's premise for the table's names in a component other than the main one: a program cannot give its own type a name that the table carries.

## Defects and their homes

- **Row 847.** Home 1, repaired, with the worker's tests. My object-expression and `self`-second programs pass through `MethodClosure`'s and `FunctionalMethod`'s first constructors, which the promoted, trait and functional tests already reach.
- **A program's extender of a carried library trait still reaches the helper with a `self` that no Java type carries.** The check reads the declaring type, not `self`'s run-time type. The program is `object MyNum extends ZZ32`; `ZZ32 comprises { Int }` (`Library/FortressLibrary.fss:730-732`). It fails on the old and the new code alike. This is row 551's defect: walk does not check a `comprises` clause outside the main component. Its home 2 is `ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss`. Row 551's notes cell holds 696 of its 700 characters, so a note does not fit. I added a sentence to the F-299 hand-over in `record.md` instead (commit `383ce4e40`).
- **NEW-W-2.** On the compiled path, a binding in a local function or in an object expression's method is not rewritten. `BuiltinPrimitiveRewriter` reaches only the component's declarations and its traits' and objects' members (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:51`, `:66-85`). The comment of `builtinPrimitive` has the compiler rewrite the body (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-19`), so the row needs home 2, a compiled `XXX` test. This rung's files do not give it `compiler_tests/`, so I wrote the row in `record.md` with reproducer `none`, after row 849, its varargs sibling (commit `44abf09e8`). It is not this rung's defect: it is the same on the old and the new code, and no library binding sits in either form.
- **NEW-W-3.** On the compiled path, `object MyNum extends ZZ32` compiles (rc 0), and its run dies at class load, before its first line: 'java.lang.IncompatibleClassChangeError: class SkCompSubZZ32$MyNum can not implement com.sun.fortress.compiler.runtimeValues.FZZ32, because it is not an interface'. The prelude's `trait ZZ32` lists no `comprises` clause (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`, as row 698 says), so the checker takes the extender. The run time's `FZZ32` is a class (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:14`). The one library closes `ZZ32` (`Library/FortressLibrary.fsi:536-538`), and the specification makes `ZZ32` the set of 32-bit integers (`Specification/basic-lib/basic-integers.tex`, "Integers"). A program the checker accepts that then fails linkage at run time needs home 2, a compiled `XXX` pair. This rung's files do not give it `compiler_tests/`, so the row is in `record.md`, with reproducer `none` (commit `b0c050f2c`). It is the same on the old and the new code, and is not this rung's defect.
- **NEW-W-1.** I checked the worker's row and test, and agree: home 3, `ProjectFortress/tests/NativeHelperUncarriedSelfGenericObjectWalk.fss`. Its line passes `ledger.py check --rows` with a number put in its cell.

## The corrections

1. **`cd562a9a0`.** The worker's `REPORT.md` and `record.md`, from the run's journal (`journal-text.py`, 30500 and 12638 bytes).
2. **`383ce4e40`.** Four corrections:
   - `javaForSelf` is at `StaticNativeApp.java:81-95`, not `:82-96`, in `REPORT.md` and twice in `record.md`.
   - The report's "Still true" line, and record.md's list of moved citations, now name the two `NativeApp.java` citations of `explorations/coordinator/map/modules-and-phases.md:445`. `:194-201` is now `:200-207`, and `:164-223` is now `:164-229`. The list also names the skill's `references/sources.md:931`, whose `:194-201` is now `:200-207`.
   - Row 846's moved citation is now a `rewrite`, with the whole new line, in place of the worker's note. The note, 141 characters, would take row 846's notes cell from 676 characters past the 700 that `ledger.py note` allows (`explorations/coordinator/tools/ledger.py`, its usage header). The new line passes `ledger.py check --rows`.
   - F-299's hand-over has a sentence on row 551's extender, as above.
3. **`44abf09e8`.** NEW-W-2, in the row template, checked with `ledger.py check --rows`: '1 rows, 0 fail the template'.
4. **`b0c050f2c`.** NEW-W-3, checked in the same way: '1 rows, 0 fail the template'.

Each of these is a correction of the record, settled by the tree's line numbers, the ledger tool's limit and my measured output. None is contested.

## Where I differ from the worker

- **Row 846's note** would be refused by `ledger.py` (above).
- **The table's soundness.** The worker writes that the names carry `self` because no program can give its own type one of them. That is true. But `self` can still be a program's own object, below a carried trait that the library closes and walk does not check (row 551).
- **The worker's account of its decisions stands.** I do not edit it.

## For the curator

The worker's question stands, and I carry it: when `FlatString`'s five glue bindings (fork 17) move onto helpers, should walk's loader identify the declaring type by its declaration rather than by its name? Its evidence:
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:88`;
- `ProjectFortress/tests/NativeHelperUncarriedSelfFlatStringWalk.fss:5-7`.

On this tree, a library binding that names a helper in a method of `FlatString` would stop every program at load, 'no Java type carries FlatString, the type of self.'.
