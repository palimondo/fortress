<!-- Climb batch 16, rung H (rung-ast-hashes): the syntax tree's hashes apart from the JVM's identity hashes, by the coordinator's call on Q3 of the checker-speed probe; row 488; F-232. Worktree /home/user/fortress-asthashes, branch wip/rung-ast-hashes, base 528438ac5. -->

# Rung H: the syntax tree's hashes apart from the JVM's identity hashes

- problem: the checker-speed probe's H runs. One extra identity hash reordered the api checks and printed three unions the other way (`explorations/perf-probes/checker-speed-2/REPORT.md:327-353`; F-232).
- spec: none. `grep -rn -i hash Specification/basic Specification/basic-lib` finds only the commented-out `hashCode` and `hash` of `Object` in `Specification/basic-lib/objects.tex:25-32`. Those are about Fortress objects, not the implementation's syntax tree.
- precedent: the makeAST target's normalization of ASTGen's timestamp by a `replaceregexp` (`build.xml:668-678`, `3c4dcdabc`); the team's counter hash for the nodes' base class, "a more deterministic replay than Object.hashCode()" (`ProjectFortress/src/com/sun/fortress/nodes_util/UIDObject.java:28-34`); the PLT `Wrapper`'s own formula, its value's hash XOR its class's hash, for `NodeHash` (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeHash.java:24-36`).
- deviation: an Option-typed field's hash goes through a new helper, `NodeHash.of`, in a file the brief does not list (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeHash.java:18`). The PLT Option classes hash by identity hashes. A second `replaceregexp` writes the call (`build.xml:693-697`).
- deviation: the generated javadoc above each `generateHashCode` still says "the hashcode of the class object" (`ProjectFortress/src/com/sun/fortress/nodes/TraitType.java:99-102`). It comes from ASTGen's template and the three generators, and I left it as it was.
- deviation: `TransformationNode`'s line changes too, though no class is generated from it. `TransformationNodeCreator` builds the 241 `_SyntaxTransformation` classes as ASTGen `NodeClass`es (`ProjectFortress/src/com/sun/fortress/astgen/TransformationNodeCreator.java:79-80`). So 454 classes have the line from ASTGen's template and 482 from `TemplateGapClass` and `EllipsesNode`, not 213 and 723.
- historical: `build.xml`, `ProjectFortress/src/com/sun/fortress/astgen/EllipsesNode.java:195`, `astgen/TemplateGapClass.java:204`, `astgen/TransformationNode.java:190`, the 18 files of `parser_util/precedence_opexpr/` (for example `RealExpr.java:117`), `useful/Cons.java:112`, `useful/Empty.java:86`, `interpreter/evaluator/_WrappedFValue.java:171`. The 936 regenerated files of `nodes/` were not in the 2012 tree (`git ls-tree a874948ac -- ProjectFortress/src/com/sun/fortress/nodes/` lists none).

## 1. What changed and why

Every hash map and set of syntax tree nodes iterated in an order set by the JVM's identity-hash sequence, for two reasons:

1. Every generated node's `generateHashCode` started from `getClass().hashCode()`, the `Class` object's identity hash (`nodes/TraitType.java:104` at the base). There were 936 such classes, and the same line was in 21 hand-written classes.
2. A field whose type holds a PLT `Option` was hashed by the Option's own `hashCode`, and both Option classes hash by identity hashes:
   - `edu.rice.cs.plt.tuple.Null.generateHashCode` is `System.identityHashCode(this)`;
   - `Wrapper.generateHashCode` XORs its value's hash with `getClass().hashCode()` (`javap -c -p -cp ProjectFortress/third_party/plt/plt.jar edu.rice.cs.plt.tuple.Null`, `... Wrapper`).

   Every `Id` holds an `Option<APIName>` and every `TypeInfo` an `Option<WhereClause>`, so nearly every node reaches one. 190 field hashes in 131 classes are of this kind: 171 `Option<Node>`, 13 `Option<List<...>>`, 4 `List<Option<CoercionInvocation>>` and 2 `Option<Option<CoercionInvocation>>`.

The change:
- `build.xml:679-697`. After the timestamp's normalization, the makeAST target makes two rewrites:
  - `int code = getClass().hashCode();` becomes `int code = getClass().getName().hashCode();`. `String.hashCode` is fixed by its definition, so the class name's hash is the same in every JVM.
  - `code ^= temp_f.hashCode();` becomes `code ^= NodeHash.of(temp_f);` wherever the line above declares `temp_f` with a type that holds `Option<`.
- `ProjectFortress/src/com/sun/fortress/nodes_util/NodeHash.java`. `of(field)` hashes:
  - an empty Option as the hash of `Null`'s class name;
  - a full one as its value's `of` XOR the hash of `Wrapper`'s class name;
  - a list by its elements' `of`, as `List.hashCode` does;
  - anything else by its own `hashCode`.

  Two equal Options have equal `of`: `Null` is one object, and `Wrapper.equals` compares the class and the value.
- The three in-repo generators write the class name's hash directly (`astgen/EllipsesNode.java:195`, `astgen/TemplateGapClass.java:204`, `astgen/TransformationNode.java:190`). Their own fields hold no Option.
- The 936 nodes are checked in as the build writes them: 936 lines `getClass().getName().hashCode()` and 190 lines `NodeHash.of` (`git diff 528438ac5 HEAD -- ProjectFortress/src/com/sun/fortress/nodes/ | grep '^[-+] '`, 1,126 lines each way).
- The hand-written classes with the line:
  - the 18 classes of `parser_util/precedence_opexpr/`, checked in with no generator in the build;
  - `useful/Cons.java:112` and `useful/Empty.java:86`;
  - `interpreter/evaluator/_WrappedFValue.java:171`, which still XORs its `FValue`'s hash, walk's own (row 430); only its class part changes.

What stays: `_InferenceVarType`, `_InferenceVarOp` and `_InferenceVarInt` keep a bare `Object` as their id (`nodes_util/NodeFactory.java:1166-1184`), so their hashes stay identity hashes. Section 4.4 shows that no output of the count stage moves through them, so the brief's condition for changing them is not met.

Commits:
- `9ec2fbe0f`: the test.
- `0f8dfe9a6`: the change (962 files).
- `5bb043630`: the `XXX` test of section 5. It adds test files only, so the tree's code is `0f8dfe9a6`'s.

## 2. The test

`ProjectFortress/src/com/sun/fortress/nodes_util/NodeHashJUTest.java` is a misc-track unit test. It runs its nested `Print` class three times, each in a JVM of its own, which first asks for 0, 1 or 1,000 identity hashes. `Print` then prints:
- the hashes of an `Id`, an `Id` with an api, an `APIName`, a `VarType`, a `TraitType` with an argument and an `ArrowType`;
- the order of a `HashSet` of ten `APIName`s.

The test asserts that the three outputs are equal.

The failing run, on the base's code, before the change was first built (11:22:53 to 11:24:02 UTC; the build compiled the test file only):

    ant testOnly -DtestPattern=NodeHashJUTest
        [junit] Tests run: 1, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 1.046 sec
        [junit] one identity hash asked for first expected:<...390092422
        [junit] apis in order [Stream, Map, File, FortressBuiltin, AnyType, RangeInternals, List, FortressLibrary, Set, NativeArray...> but was:<...429524087
        [junit] apis in order [RangeInternals, FortressLibrary, FortressBuiltin, Set, NativeArray, AnyType, Map, File, List, Stream...>
    BUILD FAILED

The passing run, after the last change of code (`0f8dfe9a6`):

    ant testOnly -DtestPattern=NodeHashJUTest
        [junit] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 1.261 sec
    BUILD SUCCESSFUL

The test passes again in the misc track of `ant testFast`, the last run on this code: `TEST-com.sun.fortress.nodes_util.NodeHashJUTest.txt`, "Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 8.821 sec".

The skeptic's correction `1038ac9a6` adds to `Print` the hashes of a `TemplateGapExpr`, an `_EllipsesExpr`, an `_SyntaxTransformationExpr`, a `Cons`, an `Empty`, a `Higher` and a `RealExpr`, so that the edits of the in-repo generators, of `precedence_opexpr/` and of `useful/` have a test that fails without them, and keeps one comment line (`SKEPTIC.md`, section 3).

## 3. Where the fix belongs, and the precedent

- **The map.** `nodes/` is the generated AST of both paths (`explorations/coordinator/map/modules-and-phases.md:40`), generated by ASTGen with the in-repo generators of `astgen/` (`:33`). The checked-in nodes are generated sources, and the skill says to edit the input, never the output (`toolchain.md`, "Generated sources"). The template line is in `ProjectFortress/third_party/astgen/astgen.jar`, which the tree does not build. So the fix is a post-processing step of makeAST, as the timestamp's is.
- **The precedent that repaired the same kind of thing.** `3c4dcdabc` made regeneration byte for byte by one `replaceregexp` over `${nodes}` (`build.xml:668-678`). Its file holds one other `replaceregexp` (`build.xml:1666-1670`, outside makeAST). The team's own device for a deterministic hash is `UIDObject`'s counter (`nodes_util/UIDObject.java:28-34`, `:78-99`), which the generated `AbstractNode.hashCode` overrides (`nodes/AbstractNode.java:49-52`).
- **The ways, and the choice:**
  1. A `replaceregexp` in makeAST over ASTGen's output, with the generators changed alike. Taken.
  2. A patched `astgen.jar`. Not taken: it is a third party's binary, rebuilt by hand, with no source in the tree.
  3. Hand edits of the 936 checked-in nodes. Not taken: the next regeneration would undo them.
  4. `UIDObject`'s counter as each node's hash. Not taken: a node's hash must agree with `equals`, which compares fields, and two equal nodes have different counters.
  5. For the Option fields, three ways:
     - the helper on Option-typed fields only: taken;
     - the helper on every field: not taken, 2,275 lines for no gain, since a field of node or list type already hashes by its parts;
     - an inline expression: not taken, since it cannot reach the 6 fields of nested Options.
- **The library's own way** does not apply: no Fortress source changes.

## 4. The runs

**Machine:** nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz; openjdk 25 (`/usr/lib/jvm/java-25-openjdk-amd64`); `FORTRESS_THREADS=1`. Other agents' JVMs ran beside most runs. A sampler recorded the 1-minute load and every JVM's tree every 30 s.

### 4.1 P-148: the count stage on the base, the change and the pass

The three runs were in one session, with no stop of the process or the VM between them (`uptime` 25 min at the first, 2 h 01 at the last).

| run | code | start UTC | load at start | other trees' JVMs | seconds |
|---|---|---|---|---|---|
| base | the base build, `/home/user/fortress-base16` | 11:40:37 | 2.19 | none at start; then probe-power, probe-where, solverspeed, load up to 6.23 | 382 |
| change | `0f8dfe9a6` | 13:02:25 | 2.11 | solverspeed and probe-where at start; then probe-where, load up to 2.92 | 395 |
| pass | `0f8dfe9a6` | 13:16:49 | 2.46 | probe-where; abstractsite for a minute, load up to 4.60 | 376 |

The commands. The first ran in a call set up for the base build, the other two in calls set up for this tree:

    nohup bash -c 's=$(date +%s); explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/base.txt $W/tmp/count/base; rc=$?; echo "seconds $(( $(date +%s) - s ))"; echo EXIT=$rc' > $W/tmp/count-base.log 2>&1 &
    (the same, named change and pass)

The change is 3.4 % above the base and the pass 1.6 % below it. Both are within the 6 % that two idle runs of one tree differed by (`compiler.md`, "The checker's time").

**The tables.** `diff tmp/count/base.txt tmp/count/change.txt` prints nothing, and so does `diff tmp/count/change.txt tmp/count/pass.txt`: `#total 39`, `#locations 38`, `#crash none`, every api 0. The base's table equals the last landed gate's (`explorations/compile-ladder/climb-batch-15b/gate/checker-count.txt`).

**The whole outputs, base against change**, with each run's tree path replaced by `TREE` (`diff base-run.norm change-run.norm`). Every line that differs is one of these:
- **The order of the api checks**, 24 `@@PROBE checkApi` lines. Each api keeps `errors=0`.
  - Base: String, FlatString, List, AnyType, Writer, NativeArray, FortressBuiltin, TypeProxy, NatReflect, FortressLibrary, RangeInternals, Stream.
  - Change: Writer, NativeArray, NatReflect, FortressBuiltin, RangeInternals, TypeProxy, FortressLibrary, FlatString, String, List, Stream, AnyType.
- **A union's members**, in the same three messages that the probe's H1 moved:
  - `Library/FortressLibrary.fss:1463:39-1480:4`: `Function body has type OR(O0,I0)` became `OR(I0,O0)`;
  - `:3367:5-3381:6`: `OR(T,IntLiteral)` became `OR(IntLiteral,T)`;
  - `:3384:5-3398:6`: `OR(T,IntLiteral)` became `OR(IntLiteral,T)`.
- **No site.** Row 488's `:130:5-105` ("Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\].") is in both, and so is every other error.

**The whole outputs, change against pass:** `cmp change-run.norm pass-run.norm` prints nothing.

**The speed pass.** I profiled the count stage on the change with JFR, untimed: a copy of the stage's java line with `-XX:StartFlightRecording=...,settings=profile` added, 31,583 execution samples. The hashes' own code is under 1 % of the samples:

| frame | samples, inclusive | share |
|---|---|---|
| any `generateHashCode` | 289 | 0.92 % |
| `NodeHash.of` | 145 | 0.46 % |
| `java.lang.Class.getName` | 14 | 0.04 % |
| `java.lang.String.hashCode` | 3 | 0.01 % |

The top frames by self time: `scala.runtime.BoxesRunTime.equals2` 7.0 %, `scala.runtime.Statics.anyHash` 5.9 %, `AbstractNode.hashCode` 4.6 %, `ASTGenHelper$.scalaify` 3.6 %, `SetBuilderImpl.addOne` 2.7 %, `IdOrOp.<init>` 2.7 %.
- `AbstractNode.hashCode`'s own time is the cached read (`nodes/AbstractNode.java:49-52`), which this change does not touch; the hash is computed once for each node.
- My declarations hold no gain above the 6 % noise, so the pass changed no code, and its run is the third run of `0f8dfe9a6`.
- No answer is reused, so there is no memo to audit.

### 4.2 The H runs on the change

The driver is a copy of the count stage's, in `tmp/` and not committed:
- its `WorldFlip` first asks for N identity hashes, `new Object().hashCode()` N times, with N read from `-Dprobe.hashes=N`, and prints one line `### probe.hashes=N`;
- its `run.sh` passes `-Dprobe.hashes=${PROBE_HASHES:-0}`.

It ran as `PROBE_HASHES=$n tmp/rung-ast-hashes/hruns-tool/run.sh tmp/rung-ast-hashes/hruns/H$n.txt tmp/rung-ast-hashes/hruns/H$n`, untimed.

| run | N | api check order | unions | `:130` | table |
|---|---|---|---|---|---|
| H0 | 0 | the change's | the change's | absent | 38 / 37 |
| H1 | 1 | the change's | the change's | present | 39 / 38 |
| H1000 | 1000 | the change's | the change's | present | 39 / 38 |

H1 and H1000 are equal line for line. Each equals the stock change run once the `### probe.hashes` line is dropped (`cmp`). H0 differs from them in `:130`'s two lines only:

    diff H0-run.norm H1-run.norm
    26a27,28
    > TREE/Library/FortressLibrary.fss:130:5-105:
    >     Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\].
    175c177
    < File FortressLibrary.fss has 38 errors.
    ---
    > File FortressLibrary.fss has 39 errors.

Their before is the probe's three runs on the base (section 9 of its report): at N = 1 a wholly other api order and three unions the other way, at N = 1000 another order and one union. On the change, the api order and the unions no longer move. `:130` still does.

### 4.3 The next source: `ApiTypeExtractor` and the index's identity hashes

How `:130` gets its error:
1. `:130` is `opr BIG LEXICO(g: Generator[\TotalComparison\]) = __bigOperatorSugar[...](BIG LEXICO(), g)` (`Library/FortressLibrary.fss:129-130`), which leaves out its return type.
2. `ApiTypeExtractor` fills a left-out return type from the exported api (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ApiTypeExtractor.scala:231-252`).
3. For a top-level function, it takes the first `SDeclaredFunction` of the api's functions of the same name, and compares no parameters (`:116-122`).
4. The api declares two: `opr BIG LEXICO(): BigReduction[\TotalComparison, TotalComparison\]` and `opr BIG LEXICO(g: Generator[\TotalComparison\]): TotalComparison` (`Library/FortressLibrary.fsi:96`, `:98`).
5. The relation is an `IndexedRelation` (`scala_src/typechecker/IndexBuilder.scala:158-159`) of `DeclaredFunction` objects. These declare no `hashCode` (`compiler/index/DeclaredFunction.java:25`), so they hash by identity hashes.

A copy of `ApiTypeExtractor` shows it. The copy prints the candidates in the loop's order, and scalac compiled it ahead of the build on a copy of the driver's class path (`tmp/rung-ast-hashes/ate-tool/`):

    PROBE_HASHES=0 tmp/rung-ast-hashes/ate-tool/run.sh ...X0.txt ...X0
    @@AUDIT ApiTypeExtractor BIG LEXICO for .../Library/FortressLibrary.fss:129:1-130:107: .../Library/FortressLibrary.fsi:98:1-99:1 returns TotalComparison hash 257563431 ; .../Library/FortressLibrary.fsi:96:1-67 returns BigReduction[\TotalComparison,TotalComparison\] hash 271488817
    #total	38
    PROBE_HASHES=1 tmp/rung-ast-hashes/ate-tool/run.sh ...X1.txt ...X1
    @@AUDIT ApiTypeExtractor BIG LEXICO for .../Library/FortressLibrary.fss:129:1-130:107: .../Library/FortressLibrary.fsi:96:1-67 returns BigReduction[\TotalComparison,TotalComparison\] hash 1587558083 ; .../Library/FortressLibrary.fsi:98:1-99:1 returns TotalComparison hash 317794690
    #total	39

When the nullary declaration comes first, the generator overload is checked against `BigReduction[...]` and `:130` is reported. This is row 488's mechanism for `:130`. It lies outside the syntax tree, in the checker's index and in `ApiTypeExtractor`, so the rung stops there: it reports the defect (section 5) and does not repair it.

### 4.4 Inference variables, and the instrumented copy that hashes nodes

- **Inference variables.** A copy of the driver compiled `NodeFactory` ahead of the build, with its three inference-variable makers giving a counted `Long` id in place of `new Object()` (`tmp/rung-ast-hashes/ivar-tool/`).
  - E0 (N = 0) equals H0 line for line, and E1 (N = 1) keeps `:130`, 39 / 38. So no output of the stage moves through an inference variable's identity hash, and `NodeFactory` stays as it is.
  - `ErrorMsgMaker.for_InferenceVarType` (`nodes_util/ErrorMsgMaker.java:393-399`) reaches no stage output: no base, H, E or change run prints a `#` name (`grep -nE '#[0-9a-z]+' base-run.norm` prints nothing). It stays as it is.
- **A copy that hashes nodes, as the probe's audit did** (`tmp/rung-ast-hashes/audit-tool/`). Its shadow `StaticChecker`, before it checks each compilation unit, walks the unit's tree with a `TreeWalker` and adds every node to a `HashSet` (14,212 distinct nodes for the component).
  - On the change, W0's table and whole output equal H0's (`cmp`, with the `@@AUDIT` lines dropped).
  - On the base build, the same copy (WB) moves the api order, loses `:130` (38 / 37) and prints two unions the other way (`:3367`, `:3384`).

  So on the change, code that hashes nodes at another moment moves nothing.

### 4.5 The build writes the nodes byte for byte

- **The first build after the edit** (`ant compileAll`, 2 min 47 s) printed `Processing .../Fortress.ast` and regenerated `nodes/`.
  - Before that build, I rewrote a copy of the base's nodes with the two regular expressions in Python. Its 936 files equal the build's, by `diff -r -q`.
  - `Library/FortressAst.fss`, `.fsi` and `scala_src/nodes/FortressAst.scala` came out unchanged.
- **A second build** (`ant compileAll`, 1 min 51 s), after `touch ProjectFortress/astgen/Fortress.ast`, printed `Processing` again. Then `git status --short` printed nothing, the implementation stamp equalled the first build's, and the build printed `Caches .../default_repository/caches kept`. So the class files came out the same too.

## 5. Defects and their homes

- **The nodes' hashes moved with the identity-hash sequence (F-232).** Home 1: this change repairs it, and `NodeHashJUTest` asserts it.
- **A component's function without a return type takes the return type of the api's first declaration of its name, in identity-hash order (NEW-H-1).** Home 2: the specification settles it.
  - The component is expanded so that each construct "corresponding to declarations in APIs exported by $C$" includes "all types ... included in the exported APIs" (`Specification/basic/components/type-inference.tex`, section "Type Inference for Components", step 1). The corresponding declaration is the one that the function satisfies, of its own parameter type (`basic/components/source-code.tex`, the satisfaction of a top-level function declaration).
  - The gated `XXX` test is `ProjectFortress/compiler_tests/XXXOmittedReturnTypeFromApi.test`. Its api declares `pick(): ZZ32` and `pick(x: String): String`, and its component `pick() = 1` and `pick(x: String) = x`. Whichever declaration comes first, the other body fails its borrowed type, so the test fails in every order. Compiled path only: walk checks no types.
  - As it is, on the base's code: `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base16 $PWD/tmp/old-caches junit $PWD/ProjectFortress/compiler_tests/XXXOmittedReturnTypeFromApi.test` prints `Function body has type IntLiteral, but declared return type is String.`, ` Saw expected failure`, `OK (1 test)`.
  - With the defect removed for one run (both declarations given their return types), then restored: ` Saw failure, but did not satisfy compile_err_contains; expected`, `Saw wrong failure. compile`, `FAILURES!!!`, `Tests run: 1,  Failures: 1,  Errors: 0`.
  - On the change: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxxnew ProjectFortress/compiler_tests XXXOmittedReturnTypeFromApi.test` prints ` Saw expected failure`, `OK (1 test)`. In `ant testFast` it is one of the compiler track's 1,213, all passing.
- **Row 488's `:130`.** Its mechanism is NEW-H-1 (section 4.3). The row stays open, with a note: the H runs still move it.
- **Inference variables' ids are identity hashes** (`nodes_util/NodeFactory.java:1166-1184`). I measured that they reach no output (section 4.4). No program shows it, so it needs no home beyond this report.

## 6. Old against new

| program | old (base build) | new | same? |
|---|---|---|---|
| the count stage on the one library | 382 s; 39 / 38 | 395 s and 376 s; 39 / 38 | the table yes; the output up to the api order and three unions |
| the H-run driver, N = 0, 1, 1000 | the probe's runs: three api orders; the unions moved in three messages at N = 1 and in one at N = 1000 | one order, one union spelling; `:130` absent at N = 0 only | section 4.2 |
| the node-hashing copy | api order, `:130` and two unions move | nothing moves | section 4.4 |
| the distance stage | 49 (climb batch 15b's gate) | 48 | `:130` gone, `:1463`'s union reversed (section 7) |
| `XXXOmittedReturnTypeFromApi` | expected failure | expected failure | yes |
| `NodeHashJUTest` | red | green | changed, as meant |

## 7. The checker count and the distance

**The count.** The after is the pass run on the final code (`tmp/count/pass.txt`, copied to `tmp/rung-ast-hashes/checker-count-postedit.txt`). Against the last landed gate's table, `diff explorations/compile-ladder/climb-batch-15b/gate/checker-count.txt tmp/rung-ast-hashes/checker-count-postedit.txt` prints nothing.

**The distance.** `explorations/coordinator/tools/distance/run.sh tmp/rung-ast-hashes/distance-postedit.txt tmp/rung-ast-hashes/dist-post` took 1,233 s: load at start 2.19, with testFast beside it.

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-15b/gate/distance.txt tmp/rung-ast-hashes/distance-postedit.txt
    DISTANCE DOWN   49 -> 48 (-1)
        kind typecheck               40 -> 39     (-1)
        class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
        unit component FortressLibrary     43 -> 42     (-1)

The sites, by row: `tmp/rung-ast-hashes/dist-post/errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv`, tree paths masked, sorted, diffed.
- **Gone:** `FortressLibrary.fss:130`, "Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\]." This is row 488's site, through NEW-H-1: the distance stage's own identity-hash sequence now puts the generator overload first. It is not a repair. Any edit that moves the sequence can bring it back, and the count stage on this same tree keeps it.
- **One row gone and one come at one site:** `FortressLibrary.fss:1463`, `OR(O0,I0)` became `OR(I0,O0)`.
- **Unchanged:** `:3367` and `:3384` print `OR(IntLiteral,T)` in both lists.

No other row moved. No library line moved, so row 577's misattribution does not arise.

## 8. The suites

These ran after the last change of code (`0f8dfe9a6`; the tree at `5bb043630`):

    ant testFast        BUILD SUCCESSFUL   Total time: 16 minutes 21 seconds
      compiler      1213 tests, 0 failures, 0 errors   (1212 at climb batch 15b's gate, plus XXXOmittedReturnTypeFromApi)
      library         86, 0, 0;   othercompiler 263, 0, 0
      misc           428, 0, 0   (427 at the gate, plus NodeHashJUTest)
      ASTJUTest 13/0, NodeFactoryJUTest 1/0, WalkerJUTest 4/0, NodeHashJUTest 1/0
    ant testSystem      BUILD SUCCESSFUL   Total time: 6 minutes 5 seconds
      system-0 149, system-1 161, system-2 150, system-3 161: 621 tests, 0 failures, 0 errors (621 at the gate)
    ant testSpecData    [junit] Tests run: 130, Failures: 0, Errors: 0   BUILD SUCCESSFUL   Total time: 49 seconds

No verdict changed. The loads were high: rung K's runs and the distance stage ran beside them.

## 9. The ladder subset

The subset is all 85 programs of the baseline's pass list and the 18 microGPT components, because every node's hash changes. The drivers are copied under `tmp/rung-ast-hashes/ladder/` as `gate.md` says, with the caches copied after the library order.
- `ladder_compare explorations/compile-ladder/baseline-2026-09-19 tmp/rung-ast-hashes/ladder` prints nothing: no DOWN, MISSING, STDOUT or UP.
- Against the newest landed `explorations/compile-ladder/climb-batch-15b/gate/ladder/ladder.tsv`, the 85 rows are equal except for the seconds column: a `diff` of all the other columns prints nothing.
- `diff <(mg_phases explorations/compile-ladder/climb-batch-15b/gate/ladder/microgpt-phase.md) <(mg_phases tmp/rung-ast-hashes/ladder/microgpt-phase.md)` prints nothing.

No file moves, so none needs declaring. The code generator's keying of an overload set by its arrow types' hashes (`compiler/OverloadSet.java:135-137`) changed no compiled program's output.

## 10. Sentences made false

The change makes no sentence of the specification false: its text says nothing of the implementation's hashes (the grep in the provenance lines).

Revival sentences, for the gather:
- **The skill's `compiler.md`, "The checker's time"** (`.claude/skills/fortress-repo/references/compiler.md:132`): "Each node's hash starts from its class's identity hash. If any code asks for an identity hash at another moment, hash maps and sets of nodes iterate in another order." Both sentences are now false.
  - The sentence before them, "the checker's output depends on the JVM's identity-hash sequence", stays true, through the index's identity hashes (NEW-H-1).
  - On the change, the H runs move one site, `:130`, and no order.
- **The same section, `compiler.md:130`:** "A line that differs only in order counts as equal: the order of the apis' checks, or of a union's members in a message." It is not false. But on the change, two runs of the count stage on one tree no longer differ in these orders, whatever code asked for identity hashes before. A rung that changes the checker now moves them only through what its own edit changes.
- **F-232** (`explorations/coordinator/FACTS.md:94`): "Every AST node's hash starts from its class's identity hash, so the order of every hash map and set of nodes, the apis that `StaticChecker.checkApis` takes in turn among them, moves when any code asks for an identity hash at another moment." Now false. Its last sentence, a lead for row 488, is answered in section 4.3.
- **F-53** (`FACTS.md:46`): "An edit can move 2 to 4 errors that it does not touch (row 488; F-232)". It still holds for the errors that NEW-H-1 reaches: a component function that leaves out its return type and shares its name with another declaration of the api. This rung's edit, which touches no library line, moved one such error in the distance stage. The moves through the nodes' hashes are gone. The same holds for `explorations/coordinator/tools/distance/compare.sh:16-18`.
- **The distance stage's header** (`explorations/coordinator/tools/distance/run.sh:69-71`): "The run-to-run variation is 2 to 4 errors, in the comparisons' and Maybe's pairs and the joins of array bodies". It rests on the same measurement as F-53's 2 to 4 (`explorations/perf-probes/prelude/switch-over-distance-flat.md`, section 5, whose families also hold "the order of a union's members in a message", which no longer moves). Whether the pairs and the array bodies' joins still move on this tree is not measured: one distance run cannot show it. Not shown false; listed for the same review as F-53. (Added by the skeptic.)
- **The coordinator skill's batch manual** (`.claude/skills/coordinator/references/batch.md:61`): "The gate's comparisons hide Java line numbers, identity hashes and moved library positions." Not false: those masks are of a printed `@` and hex digits (`gate.md:104`), which this change does not touch.

## 11. Points to report

- **The H runs at 0, 1 and 1000:** one api order and one spelling of every union. `:130` still differs, through `ApiTypeExtractor`'s name-only match over `DeclaredFunction`s, which hash by identity hashes (section 4.3).
- **The diff of the base and change outputs:** 24 lines of the api order, three unions (`:1463`, `:3367`, `:3384`), no site. `:130` is kept in both count runs and gone in the distance stage. Row 488 is noted, not closed (sections 4.1 and 7).
- **Each class changed and each left:**
  - Changed: the 936 generated nodes (by the build), the three generators, the 18 `precedence_opexpr` classes, `Cons`, `Empty` and `_WrappedFValue`. Added: `NodeHash`.
  - Left: the inference variables' ids (no output moves through them); `UIDObject` (the brief's "Not"); walk's `FType` and `FunctionClosure` (row 430); `DeclaredFunction` and `ApiTypeExtractor` (outside the AST, NEW-H-1).
  - The build writes the nodes byte for byte (section 4.5).
- **Each count run's seconds and load:** base 382 s at 2.19, change 395 s at 2.11, pass 376 s at 2.46 (section 4.1).
- **A test or a specification example whose verdict or printed order changes, and a ladder file that moves:** none.
  - Every suite verdict is the same, and the counts rose only by this rung's two tests.
  - No ladder file moves.
  - Printed orders were compared where something reads them: the pinned diagnostics and the 85 compiled outputs. Walk tests' outputs were not compared one by one.
- **Every revival sentence made false:** section 10.

## 12. Decisions

No decision of the curator covers these beyond the brief's.
1. **A `replaceregexp` in makeAST, with the generators changed alike.** Not taken: a patched `astgen.jar`; hand edits of the checked-in nodes; `UIDObject`'s counter (section 3).
2. **Option fields through `NodeHash.of`.** The brief named only the class's identity hash. The Option classes are a second source in nearly every node: an `Id` holds an `Option<APIName>`, so with the class line alone the test stays red. Not taken: the helper on every field; an inline expression; leaving them.
3. **The class's name, `getClass().getName().hashCode()`,** as the brief gives. Not taken: a constant per class, which ASTGen's template cannot be made to write.
4. **The javadoc left as it was.** Not taken: a third `replaceregexp` and edits of the generators' comment lines, 936 more changed lines for a phrase that stays loosely true.
5. **The inference variables' ids left as identity objects,** by the brief's condition: E0 and E1 show that no output moves through them (section 4.4). Not taken: the counted id.
6. **Stopping at `ApiTypeExtractor`,** by the brief: the next source lies outside the AST. Not taken: an `equals` and `hashCode` for `DeclaredFunction`, or matching by parameter types in `ApiTypeExtractor`. Either is a checker rung of its own, and would settle `:130` for good.
7. **NEW-H-1 as home 2, with an `XXX` compile test.** The specification settles it (section 5). The test's two overloads both leave out their return types, so it fails in every hash order. Not taken: home 3 with a ledger row only; a test of the one library's `:130`, which moves with the hash order.
8. **No code in the speed pass.** The profile shows the hashes' own code under 1 % (section 4.1). Not taken: caching the class name's hash in each class, which ASTGen's template cannot write and which would save under 0.1 %.
9. **The whole pass list as the ladder subset,** since every node's hash changes. Not taken: a subset by first error.
10. **The node-hashing control on the base build (WB):** a new probe of the base with a new instrument, so that W0's equality shows something. It is not a run of a gate stage on the base.
11. **The pass run as the count stage's after.** Not taken: a fourth run of the same code.

## 13. For FACTS

- **The fact:** the checker's output no longer moves with the JVM's identity-hash sequence through the syntax tree. Every node's hash starts from the hash of its class's name, and an Option-typed field is hashed by `NodeHash`. One site still moves, row 488's `:130`. The cause is `ApiTypeExtractor`'s match of a left-out return type by name over `DeclaredFunction`s, which hash by identity hashes (NEW-H-1).
  - What it means: two runs of a stage on one tree differ in no api order or union spelling, and an edit moves an order only through what it changes. F-232 is false, and F-53's 2 to 4 moved errors are now NEW-H-1's.
  - The test: `NodeHashJUTest.testHashesDoNotDependOnIdentityHashes`; for the site that still moves, `XXXOmittedReturnTypeFromApi.test`.
  - Detail: sections 4.2 to 4.4.

## 14. Commands worked out

- **The H runs:** a copy of `explorations/coordinator/tools/checker-count/`.
  - Its `WorldFlip.main` begins `int probeHashes = Integer.getInteger("probe.hashes", 0); for (int i = 0; i < probeHashes; i++) new Object().hashCode();`.
  - Its `run.sh` finds its own directory as `D` and adds `-Dprobe.hashes=${PROBE_HASHES:-0}` to the java line.
- **One checker class instrumented in a count run:** the same copy, with the class's source added to the driver's `javac` line into `$SCRATCH/classes`, which the stage already puts ahead of the build. For a Scala class, a `scala.tools.nsc.Main` call after the `javac` line.
- **The byte-for-byte check:** `touch ProjectFortress/astgen/Fortress.ast && ant compileAll`, then `git status --short` and a comparison of `ProjectFortress/build/implementation.stamp`.
- **The share of a frame in a JFR recording:** `jfr print --events jdk.ExecutionSample --stack-depth 2000 F.jfr`, read by a Python script that counts the samples whose stack holds the frame.