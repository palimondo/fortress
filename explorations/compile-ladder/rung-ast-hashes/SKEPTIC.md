<!-- Climb batch 16, the skeptic of rung H (rung-ast-hashes): the count stage timed again, the worker's test-first order read in its transcript, the diff read against the section, programs of my own on the old and the new code, two corrections and the verdict. Worker's head 5bb043630; branch wip/rung-ast-hashes. -->

# Skeptic: rung H, the syntax tree's hashes

The worker's head was `5bb043630`. Its code is `0f8dfe9a6`'s: `5bb043630` adds test files only. My commits:
- `20918ed4e`: the worker's REPORT.md and record.md, written from the run's journal by `journal-text.py` (both writes exited 0).
- `1038ac9a6`: a correction of the test (section 3).
- `ddabcbf40`: corrections of REPORT.md and record.md (section 5).

Verdict: **approved**. The change does what the section asks, and the report's measurements hold where I checked them again. My two corrections are settled by the skill's rules for tests. None is contested.

## 1. The count stage, timed again (P-148)

The machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz (2100.000 MHz), openjdk 25.0.4.1, `FORTRESS_THREADS=1`. Both runs were in one session, with no stop of the process between them. Before each, `ps` showed another tree's JVM, and I waited for it to end: rung K's base count before mine, rung K's skeptic's base count before the head run. Other JVMs then started beside both runs. A sampler wrote the load every 30 s (`tmp/`, not cited).

| run | code | start UTC | load at start | beside it | seconds |
|---|---|---|---|---|---|
| base | `/home/user/fortress-base16`, `528438ac5` | 15:40:12 | 2.02 | probe-strings' short JVMs; load 2.5 to 3.9 | 375 |
| head | this worktree's build, `0f8dfe9a6`'s code | 15:55:35 | 2.29 | probe-strings' distance run and rung K's skeptic's count; load 2.7 to 4.3 | 371 |

The commands were the ones `compiler.md` ("The checker's time", step 2) gives, the base's in a call set up for the base build:

    nohup bash -c 's=$(date +%s); explorations/coordinator/tools/checker-count/run.sh $W/count/base.txt $W/count/base; rc=$?; echo "seconds $(( $(date +%s) - s ))"; echo EXIT=$rc' > $W/count-base.log 2>&1 &
    (the same from /home/user/fortress-asthashes, named head)

- **Time.** The head is 1.1 % under my base. The worker's change was 3.4 % over its base (382 s against 395 s). The two moves differ by 4.5 points, within the 6 % of `compiler.md`.
- **Tables.** `diff count/base.txt count/head.txt` prints nothing: `#total 39`, `#locations 38`, `#crash none`, every api 0. My base table equals the worker's base table, and my head table equals the worker's change table.
- **Outputs.** With each tree's path replaced by `TREE`:
  - my base output equals the worker's base output (`cmp` prints nothing);
  - my head output equals the worker's change output (`cmp` prints nothing). The worker's change and pass outputs are equal too, so the results are the same.
  - The diff of my base and head outputs is the report's: 24 `@@PROBE checkApi` lines, the api order, and three unions' members (`:1463`, `:3367`, `:3384`). No site moves, and `:130` is in both.

      diff base-run.norm head-run.norm | grep '^[<>]' | grep -v '@@PROBE checkApi'
      <     Function body has type OR(O0,I0), but declared return type is O0.
      >     Function body has type OR(I0,O0), but declared return type is O0.
      <     Function body has type OR(T,IntLiteral), but declared return type is T.
      >     Function body has type OR(IntLiteral,T), but declared return type is T.

I also read the worker's other runs from its files, and they say what the report says:
- H1 and H1000 equal the change run once the probe line is dropped;
- H0 differs from them only by `:130` and the count of 39 against 38;
- E0 equals H0, and E1 holds `:130`;
- W0 equals H0;
- WB, the node-hashing copy on the base, loses `:130` and turns `:3367` and `:3384`.

The distance file gives `DISTANCE DOWN 49 -> 48 (-1)`. I compared it with `compare.sh` against climb batch 15b's `distance.txt`.

## 2. Test first, in the worker's transcript

The worker's transcript is `agent-aeaf1365b961cb402.jsonl`. The earlier `agent-ac93e1bdd062c6f08.jsonl` made no edit and no build.
- **The test.** `NodeHashJUTest.java` was written at 11:22:38 (`v4ystQ`). It was run at 11:22:46 (`XsJWug`, `ant testOnly -DtestPattern=NodeHashJUTest`), and the log ended at 11:24:15 (`7eT7V7`). The first edit of code came after: `NodeHash.java` at 11:26:05 (`3QTTJ7`), then the generators and hand-written classes by `sed` at 11:26:26 (`HzdL71`) and `build.xml` at 11:27. The first build was at 11:47:12 (`bmxHra`). The failing lines are the ones `recordedFailure` quotes:

      [junit] Tests run: 1, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 1.046 sec
      [junit] one identity hash asked for first expected:<...390092422
      [junit] apis in order [Stream, Map, File, FortressBuiltin, AnyType, RangeInternals, List, FortressLibrary, Set, NativeArray...> but was:<...429524087
      BUILD FAILED

- **The pass.** The last change of code is the commit `0f8dfe9a6`, at 12:10:42. At 12:12:09 the worker added three inference-variable nodes to the test (`oJYNPo`), and at 12:25:41 it restored the file (`dLCxts`, `git checkout`). No build ran between those two times. The test passed in the misc track of `ant testFast`, which started at 13:24: `ProjectFortress/TEST-RESULTS/fast-misc/TEST-com.sun.fortress.nodes_util.NodeHashJUTest.txt`, "Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 8.821 sec".
- **The `XXX` test.** On the old code, `XXXOmittedReturnTypeFromApi.test` prints ` Saw expected failure` and `OK (1 test)`. With the return types written, it prints `Saw wrong failure. compile` and `FAILURES!!!`. That is red, as `tests-writing.md` says of an `XXX` compile test whose program compiles. On the change it is an expected failure again. I compiled the program with its return types written on the new code (`bin/fortress compile`, private caches), and it compiled with rc=0. So the red run is the clean compile and no other error.

The rule of `tests-writing.md`, "The order", holds for the worker's test, with the gap of section 3.

## 3. The diff, the precedent and the sibling sites

What I checked, against the section:
- **The nodes.** Every line that the diff changes in `nodes/` is one of two kinds:
  - 936 `int code = getClass().hashCode();` lines become `...getName().hashCode();`;
  - 190 `code ^= temp_x.hashCode();` lines become `code ^= NodeHash.of(temp_x);`.

  Nothing else in `nodes/` changes. The commands: `git diff 528438ac5 HEAD -- ProjectFortress/src/com/sun/fortress/nodes/`, with the two forms counted by `sort | uniq -c`. No field whose declared type holds `Option<` still hashes by its own `hashCode`: the `grep -B1` count of such lines in `nodes/` is 0.
- **The 213 and 723 of the brief.** The real split is 454 and 482, as the worker says. Each of `_SyntaxTransformation*`, `_Ellipses*` and `TemplateGap*` has 241 classes plus its base class. `TransformationNodeCreator` builds the `_SyntaxTransformation` classes as ASTGen `NodeClass`es (`ProjectFortress/src/com/sun/fortress/astgen/TransformationNodeCreator.java:79-80`). `TransformationNode` is constructed only in that commented-out line.
- **`NodeHash.of` and `equals`.** The helper agrees with `equals`. `Null` is one instance, `Wrapper.equals` compares the class and the value, and a list's `of` is `List.hashCode`'s formula over its elements' `of`. `plt.jar`'s `Option` has these two subclasses, and `IdentityWrapper`, whose identity `equals` is consistent with a value hash.
- **The other field types.** I listed the declared types of every hashed field. `Modifiers` hashes its bits (`nodes_util/Modifiers.java:274-276`). `String`, `BigInteger`, `int`, `boolean` and the maps of `String` to nodes all hash structurally. Two fields are bare `Object`s:
  - the inference variables' `id`, which the report covers;
  - `Level._object`, which holds a node, a list or a string. `DepthConvertVisitor.forOptionDepth` throws "not supported now" (`syntax_abstractions/phases/ComposingSyntaxDefTranslator.java:508-509`), so it never holds an Option.
- **Other sites.** `grep -rnE 'getClass\(\)\s*\.\s*hashCode|\.class\.hashCode|getClass\.##'` over `ProjectFortress/src` prints nothing at the head, so no other `.java` or `.scala` file starts a hash from a class's identity. `NodeSpanEquals.hashCode` is `super.hashCode()`, but nothing uses the class. `StaticError.hashCode`, the index classes and `FunctionClosure` lie outside the syntax tree. The report covers `DeclaredFunction` (row 737) and `FunctionClosure` (row 430).
- **The precedent.** It is the one the section names, `3c4dcdabc`'s `replaceregexp` in makeAST, and the two new ones sit beside it (`build.xml:679-697`). The match of the second one works only within `generateHashCode`. In `equals` the line after an `Option<...> temp_x = ...;` declaration is never `code ^= `, so nothing else matches.
- **What the change leaves.** The generated javadoc above `generateHashCode` still says "XORing the hashcode of the class object" (`nodes/TraitType.java:99-102`). The worker chose to leave it (its decision 4). I leave it too, since it changes no behaviour, but the phrase is now inexact.

**Finding 1, a correction of the test, settled.** The rung changed the hash line of the three in-repo generators, of the 18 classes of `parser_util/precedence_opexpr/`, and of `useful/Cons.java` and `useful/Empty.java`. Its test printed only classes of ASTGen's own template, so none of those edits had a test that fails without it. The skill settles it: "Write the test before the fix for every edit of source code in the original tree" (`.claude/skills/fortress-repo/SKILL.md:160`), and so does the brief's "Tests, first". The correction, `1038ac9a6`, adds seven lines to `Print`: the hashes of a `TemplateGapExpr`, an `_EllipsesExpr`, an `_SyntaxTransformationExpr`, a `Cons`, an `Empty`, a `Higher` and a `RealExpr`. It leaves out `_WrappedFValue`, whose hash still takes its `FValue`'s identity hash, walk's own (row 430).

I ran the test on the base's code. There is no old-code tool for a JUnit class, and no build may run in the base build, so I compiled it against the base build's class path into a scratch folder and ran JUnit's text runner:

    BCP=$(FORTRESS_HOME=/home/user/fortress-base16 /home/user/fortress-base16/bin/fortress_classpath | tail -1)
    javac -nowarn -cp "$BCP" -d $Q/classes ProjectFortress/src/com/sun/fortress/nodes_util/NodeHashJUTest.java
    java -cp "$Q/classes:$BCP" junit.textui.TestRunner com.sun.fortress.nodes_util.NodeHashJUTest
        TemplateGapExpr 1681669572     (with no identity hash asked for first)
        TemplateGapExpr 1969671081     (with one asked for first); and so for each of the seven added lines
        FAILURES!!!
        Tests run: 1,  Failures: 1,  Errors: 0

On this branch, after the test's build (`ant testOnly -DtestPattern=NodeHashJUTest`, 16:08 UTC, the code of `1038ac9a6`):

    [junit] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 1.454 sec
    BUILD SUCCESSFUL

**Finding 2, a correction of the test, settled.** The test file carried five comment lines: a two-line block comment and two javadoc comments. The skill asks for one: "Give it one comment line that says what it checks" (`.claude/skills/fortress-repo/references/tests-writing.md:134`). The same commit keeps one line.

The edit is of a test of the misc track, and of no code of the checker, walk or a shared phase, so no whole suite is owed (`tests-running.md`, "When to run a whole suite"). Its build changed the implementation stamp and emptied the worktree's caches, and I ran the library order after it. All five compiles exited 0, and the five jars are in `default_repository/caches/bytecode_cache/`.

## 4. My programs, old against new

The programs are scratch in `tmp/rung-ast-hashes/skeptic/progs/` and are not committed. Each run had a fresh private caches folder. The old code ran through `/home/user/fortress-base16/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base16 <fresh folder> ...`. The new code ran as `FORTRESS_HOME=/home/user/fortress-asthashes FORTRESS_CACHES=<fresh copy of its caches> bin/fortress ...`.

The identity-hash sequence was set by `JAVA_FLAGS="... -XX:+UnlockExperimentalVMOptions -XX:hashCode=M"`. M = 5 is HotSpot's default. M = 2 makes every identity hash 1, and M = 3 makes them a counter: a small `IH.java` printed `1 1 1`, `9 11 12` and three random numbers.

| program | path | old code | new code |
|---|---|---|---|
| `SkHashTypecase`: three generic or plain functions whose `typecase` arms join to a union that the declared type refuses | compiled, M = 5, 2, 3 | three spellings, one per M: `OR(V,U)`/`OR(U,V)`/`OR(U,V)`, `OR(W,IntLiteral)`/`OR(W,IntLiteral)`/`OR(IntLiteral,W)`, `OR(String,IntLiteral,A,B)`/`OR(A,B,String,IntLiteral)`/`OR(B,String,IntLiteral,A)` | one output for all three M (md5 `19a027e0` each): `OR(U,V)`, `OR(IntLiteral,W)`, `OR(A,B,IntLiteral,String)`; the same three errors at the same places |
| `SkHashErrors`: five refused bodies, four of them unions of two or three members | compiled, M = 5, 2, 3 | one output | the same output as the old code |
| `SkHashDispatch`: a four-object `comprises`, a 5-way `name` and a 7-way two-argument `pair` overload with a meet, dispatched on `T`-typed values | compiled (compile and run), M = 5, 2, 3 | `A:AA,AT,AT,AT` / `B:TA,TT,BC,TT` / `C:TA,CB,TT,TT` / `D:TA,TT,TT,DD` | the same (md5 `3dd385ed` for all six runs) |
| `SkHashDispatch`, `SkHashErrors` | walk, threads 1 and 4 at M = 5, threads 1 at M = 3 | one output each | the same |
| `SkHashWalk`: a 6-way overload, a trait's default method overridden in one object, a generic function, `SUM` and a list comprehension | walk, as above | `AA AT AT` / `TA TT BC` / `TA CB TT`, `shape 9 rect 10`, `15`, `385`, `<|1, 4, 9, 16, 25|>` | the same (md5 `a64bfd04` for all six runs) |
| `SkHashForUse`: two `for` loops through the team's `For` grammar (`syntax_abstraction_tests/For.fsi`, copied beside it), a filter and a nested generator | walk, as above | `odd 3`, `odd 5`, `odd 13`, then the eight products | the same once the parser folders' random names are masked |

`SkHashTypecase` is the program-level form of the probe's H runs. The old code spells the unions by the identity-hash sequence, and the new code spells them one way. Its source:

    trait T comprises {A, B} end
    object A extends T end
    object B extends T end
    f[\U, V\](x: Any, u: U, v: V): U = typecase x of ZZ32 => u; String => v; Boolean => u; else => v end
    g[\W\](x: Any, w: W): W = typecase x of ZZ32 => w; String => w; Boolean => w; A => w; B => w; else => 0 end
    h(x: Any): T = typecase x of ZZ32 => A; String => B; Boolean => "s"; else => 3 end

The file writes each arm on its own line.

The diff changes no mutable variable, atomic block or library state. `NodeHash`'s two fields are `static final` constants. I ran the walk programs at one and four threads anyway, and the outputs were equal. No program crashed, and no verdict differed between the old and the new code.

## 5. The homes, the ledger and the record

- **The defects and their homes.**
  - F-232 has home 1, `NodeHashJUTest`, now with the classes of section 3 too.
  - Row 737 has home 2, `XXXOmittedReturnTypeFromApi`.
    - The specification settles it. Step 1 of `Specification/basic/components/type-inference.tex`, section "Type Inference for Components", expands the constructs "corresponding to declarations in APIs exported by $C$". A top-level function corresponds to the declaration that it satisfies (`basic/components/source-code.tex`, subsection "Export Statements").
    - The test's comment names the file and the section, and the file has one comment line.
    - The row lints clean: `ledger.py check --rows`, with a number in place of `NEW-H-1`, prints "0 fail the template", 1,143 characters.
    - Its notes' citations open as they say: `ApiTypeExtractor.scala:116-122`, `IndexBuilder.scala:158-159`, `DeclaredFunction.java:25` (no `hashCode` or `equals`).
  - Row 488 stays open with its note: `:130` still moves, so the section's condition for closing it is not met.
  - My programs measured no new defect. The old code's union spellings in `SkHashTypecase` are F-232 itself, which the change repairs.
- **Ledger searches.** I searched for `ApiTypeExtractor`, `DeclaredFunction`, "identity hash", "leaves out its return", "omitted return", "inferred return type", "elided return" and `hashCode`. The rows that bear on the rung are 430, 488 and 399, which counts the one-argument `BIG LEXICO`'s error among six that sizes bring. No earlier row holds row 737's defect.
- **Competing names.** `NodeHash`, `NodeHashJUTest` and `XXXOmittedReturnTypeFromApi` have no other declaration in the test folders or in `ProjectFortress/src/com/sun/fortress/`.
- **The failure mode.** The change turns no loud failure into a quiet value. A `null` field still throws in `NodeHash.of` as it did in `hashCode`, and generated nodes allow no `null` field.
- **REPORT.md** (`ddabcbf40`):
  - section 2 now notes the test's extension;
  - section 10 adds the distance stage's header line on the run-to-run variation (`explorations/coordinator/tools/distance/run.sh:69-71`). It rests on the measurement behind F-53, so it belongs with F-53 and `compare.sh:16-18`. I mark it not shown false.

  I checked the provenance lines against the tree, each cited line opened with `sed -n`: `checker-speed-2/REPORT.md:327-353`, `basic-lib/objects.tex:25-32`, `build.xml:668-678` and `:693-697`, `UIDObject.java:28-34`, `NodeHash.java:18` and `:24-36`, `TraitType.java:99-102`, `TransformationNodeCreator.java:79-80`, `AbstractNode.java:49-52`, `Fortress.ast:1061`, `NodeFactory.java:1166-1168`, `ErrorMsgMaker.java:393-399`, `modules-and-phases.md:33` and `:40`. Each says what the report says.
- **record.md** (`ddabcbf40`): the FACTS entry said that hash maps and sets of nodes iterate in one order whatever code asked for an identity hash before. That holds except for two kinds of node, which the entry now names:
  - the three inference-variable nodes, whose id is a bare `Object` (`nodes_util/NodeFactory.java:1166-1184`);
  - walk's `_WrappedFValue` (`interpreter/evaluator/_WrappedFValue.java:170-177`).

  The rest of the record holds as written:
  - the notes for rows 488, 430, 730 and 577;
  - row 737;
  - the handover;
  - "Revival change: none", since no program's acceptance, refusal or run changes; only printed orders do.

## 6. Where I differ from the worker

- **The walk tests.** The worker did not compare the interpreter tests' printed outputs between the base and the change (its `notDone`). So the point "a test of either suite whose verdict or printed order changes" is answered for verdicts, the pinned diagnostics and the ladder's 85 compiled outputs, and not for walk's printed orders. Walk tests pass on the absence of `fail`, so no verdict can hang on such an order. My own walk programs printed the same on the old and the new code.
- **The javadoc.** As section 3 says, I would not call the javadoc "loosely true": it names the class object's hash, which no line uses now. It is still not worth 936 changed comment lines in this rung.

## 7. Points to report and questions

The points the rung reaches are the six of its list. The worker gave evidence for each, and I confirmed it above. The seventh, row 737 with its gated `XXX` test, is a new defect recorded. None holds the push: every step is reversible, and none acts against a decision on record.

The worker's two questions for the curator stand:
- when row 737's repair, a match by parameter types in `ApiTypeExtractor`, is scheduled;
- whether `compiler.md:130`'s allowance for lines that differ only in order should stay.

## 8. Verdict

**Approved.** The change is right: the syntax tree's hashes no longer depend on the JVM's identity-hash sequence, through the class line and through Option fields. The build writes the nodes byte for byte. The count's table and results hold, its time is within the noise, and the next source of movement is found and recorded outside the AST, as the section asks.

With my corrections, every edit of the change has a test that fails on the base's code, and the record states which nodes still hash by identity. The tables in REPORT.md are those of the worker's head. My correction changed only a test, so I ran no count or distance stage after it.
