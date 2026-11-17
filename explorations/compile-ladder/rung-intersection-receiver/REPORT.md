# Rung I (`rung-intersection-receiver`): a method call on a value typed by an intersection, on the compiled path

- problem: ledger row 540, a method call on a call typed by the intersection of its candidates' return types crashes `fortress compile` with `ClassCastException`, `IntersectionType` to `NamedType` (`explorations/fortress-gap-ledger.md:177`); the one library's `__filter` is the code generator's one refused declaration of this kind on the base's code (F-34, `explorations/coordinator/FACTS.md:38`; `explorations/compile-ladder/plan-31/probes/switch-rehearsal.md:189`).
- spec: `Specification/basic/types-vals-vars.tex:627-628`, the intersection of a set of types is a subtype of every type of the set, so a value of the intersection has each conjunct's methods; with `Specification/basic/expressions/method-invocation.tex:47-48`, the receiver is bound to the method's `self`.
- precedent: `castToTypeBelow` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7630` on the base), which casts a value whose checker type the JVM does not know through `InstantiatingClassloader.generalizedCastTo` (`:7652`); `emitBodyGivenBy`'s most specific trait by `typeAnalyzer.lteq` over `methodsNamed` (`:7088-7091`); the name test of `Types.sameName` (`ProjectFortress/src/com/sun/fortress/compiler/Types.java:112`).
- deviation: the owner is narrowed to the conjuncts that have the declaration the checker chose, read from the arrow's `MethodInfo` (`CodeGen.java:7527-7543`), which the fork's wording does not name; among owners none of which lies below the others the first in the intersection's order is taken (`:7552`); the generic-method branch gets the owner too (`:7346`); the helpers stand as new members directly below `sanitizePossibleStupidIntersectionType` (`:7510-7584`); an intersection with no owner among its conjuncts stops with 'Can't find the owner of m among the conjuncts of T' (`:7545`) where the base threw `ClassCastException`. The specification's spelling: none.
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`.

One launch worked this rung: the worktree did not exist at the start.

## 1. What changed and why

`CodeGen.forMethodInvocation` took the receiver's static type, narrowed an intersection to its lowest conjunct where the conjuncts nest (`sanitizePossibleStupidIntersectionType`, `CodeGen.java:7420` on the base), and otherwise kept the intersection and cast it to `NamedType` (`:7323`) or, for a generic method, to `TraitType` (`:7270`, and again in `emitFindGenericMethodClosure`, `:7497`). The checker types a call whose argument stands between two closed traits by the intersection of its candidates' return types (P-60), and a `typecase` binder whose arm's type neither lies below nor above the selector's type by the intersection of the two, so every method call on such a value crashed the compile.

The edit, all in `CodeGen.java` (`git diff 1609258002b0 -- ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, 73 lines added, none removed):

- `forMethodInvocation` (`:7215-7221`): where the sanitized receiver type is still an `IntersectionType`, it is replaced by its owner, `intersectionMethodOwner`, and that trait is kept as `receiverCast`.
- After the receiver is evaluated, in the generic branch (`:7297`) and the plain branch (`:7323`), `castReceiver(receiverCast)` casts it to the owner. Everything after reads the owner as the receiver's type: the opcode and the class of `methodCall`, the closure's receiver type of a generic method, the tuple boxing test.
- `intersectionMethodOwner` (`:7461-7504`): the trait-type conjuncts, nested intersections opened (`traitConjuncts`, `:7506-7513`), the same conjuncts the checker searches (`traitTypesCallable`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Common.scala:90-104`). A conjunct qualifies if it declares or inherits a method of the call's name (`methodsNamed`), and, where the call's arrow carries a `MethodInfo`, one whose declaring trait is the trait that the arrow names (`sameTraitName`, `:7524-7529`); where it carries none, as a getter's call, one that takes the call's argument by its number of parameters (`takesArgumentOf`, `:7515-7522`, the skeptic's fix `e9718fa115`, SKEPTIC.md). Of the qualifying conjuncts, the one below all the others; else the first.
- `castReceiver` (`:7531-7535`): `generalizedCastTo` to the class that `methodCall` names (`NamingCzar.jvmTypeDesc(owner, thisApi(), false)`, as at `:629`), a `CHECKCAST` for a trait or object.

The checker is not touched: its typing stays (P-60, fork I1).

Commits on `wip/rung-intersection-receiver`: `2e1dcbaa2d` (the test promoted and the fix), `e0a5274db2` (the typecase-binder test), `875e23e726` (three whitespace-only lines of `CodeGen.java` put back as the base had them; the Edit tool had emptied them; `javac -g` of the file before and after gives the same 15 class files, byte for byte, compared with `cmp`).

## 2. The tests: failing on the base, passing after

`compiler_tests/XXXCoverageReturnMethodCall` is promoted to `compiler_tests/CoverageReturnMethodCall` (`git mv` of both files), with `compile`, `link`, `run` and `run_out_contains=PASS`. Its program keeps row 540's family and asserts, with walk's answers: `choose(m).left()` and `choose(m).right()`; a getter, `choose(m).side`; a method with an argument, `choose(m).plusLeft(41)`; `tag()`, which both result types inherit from `Tagged` and the object overrides; `get`, overloaded across the conjuncts at `ZZ32` in `LeftResult` and at `String` in `RightResult`; a generic method, `choose(m).pick[\String\]("picked")`; and `left()`, `right()` and `side` on a variable bound to `choose(m)`. Under walk the program prints `PASS` (`cd ProjectFortress && ../bin/fortress compiler_tests/CoverageReturnMethodCall.fss`, exit 0).

`compiler_tests/TypecaseBinderMethodCall` is new: a `typecase` arm `s': Marked` over `s: Shape`, and the same in a generic function over `Box[\E\]`, the shape of the library's `__filter` (`Library/FortressLibrary.fss:1489-1497`), each calling `name()` on the binder. Walk prints `PASS`.

The failing run of the promoted test, in the worktree before the edit was first built (its `CodeGen.class` the seed's, dated 10:53), at 2026-11-17T19:31:11Z, before any edit of `CodeGen.java`, and again for the program extended with `get` and `pick` at 19:35:38Z, after a first compile of the edit into a scratch folder (`compiler.md`, "Testing an edit here") but with the tree's build still the base's until `ant compileAll` at about 19:37:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh fail ProjectFortress/compiler_tests CoverageReturnMethodCall.test
    . compile ProjectFortress/compiler_tests/CoverageReturnMethodCall
     UNEXPECTED exception
    java.lang.ClassCastException: class com.sun.fortress.nodes.IntersectionType cannot be cast to class com.sun.fortress.nodes.NamedType (...)
    FAILURES!!!
    Tests run: 3,  Failures: 3,  Errors: 0

The failing run of the typecase-binder test, written after the edit was built, on the old code (`worktrees.md`, "Running the old code"), at 19:57:26Z:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base37 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/TypecaseBinderMethodCall.test
    . compile .../TypecaseBinderMethodCall
     UNEXPECTED exception
    java.lang.ClassCastException: class com.sun.fortress.nodes.IntersectionType cannot be cast to class com.sun.fortress.nodes.NamedType (...)
    Tests run: 3,  Failures: 3,  Errors: 0

The passing run, the last after the last change of code, on `875e23e726` rebuilt, with the neighbouring tests of the same family and `TypecaseBindRungG`:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests CoverageReturnMethodCall.test TypecaseBinderMethodCall.test CoverageReturnExpected.test CoverageReturnGood.test CoverageReturnGoodReversed.test CoverageReturnInferred.test XXXCoverageReturnInferred.test XXXCoverageReturnBad.test XXXCoverageReturnGenericFamily.test TypecaseBindRungG.test
    . run ProjectFortress/compiler_tests/CoverageReturnMethodCall (863ms) PASS
    . run ProjectFortress/compiler_tests/TypecaseBinderMethodCall (771ms) PASS
    OK (22 tests)

The whole compiled suite, once, on `2e1dcbaa2d`'s code (the classes of `875e23e726` are the same; `TypecaseBinderMethodCall` came after it and adds three tests at the gate):

    ant testFast
    BUILD SUCCESSFUL
    Total time: 14 minutes 42 seconds

with `CompilerJUTest` 1696 tests, `LibraryJUTest` 86, `OtherCompilerJUTest` 263 and the misc track 471, no failure or error (`ProjectFortress/TEST-RESULTS/fast-*/`). The last landed gate's compiler track had 1694 (`explorations/compile-ladder/climb-batch-31b/gate/summary.txt`); the promoted `.test` drives three commands where the `XXX` file drove one.

## 3. Where the fix belongs, and the precedent search

The defect is the code generator's alone: the checker types such a receiver as P-60 asks, and walk has no static types and dispatches the method on the value at run time (`explorations/coordinator/map/spec-to-implementation.md`, the rows "naked method invocation, dotted access" and "method declarations": codegen `CodeGen.forMethodInvocation`). So the fix is in `forMethodInvocation`, the member that the batch record gives this rung.

The ways the tree offers, before the choice:

1. The checker types such a result by one candidate. Not taken: it narrows what P-60 reads (fork I1's way not taken).
2. A desugaring that wraps the receiver in a type assumption, `e asif Owner`. Not taken: the code generator compiles an assumed receiver as a static call of the body that the assumed trait gives (`assumedReceiverCall`, `CodeGen.java:7108` on the base), so the object's own override would not run.
3. `sanitizePossibleStupidIntersectionType` returns the owner. Not taken: it knows no method, and keeps its meaning, the lowest of nested conjuncts.
4. No cast, `INVOKEINTERFACE` alone: the verifier takes any reference for an interface. Not taken: a conjunct that is an object is called with `INVOKEVIRTUAL`, which needs its class on the stack, and the fork asks for the cast.
5. The owner found among the conjuncts in `forMethodInvocation` and the receiver cast to it. Taken (fork I1).

The precedent: rung K's `castToTypeBelow` (`CodeGen.java:7630` on the base) casts with `generalizedCastTo` where the checker's type is one the JVM does not know; `emitBodyGivenBy` chooses the most specific of several traits that have a method by `typeAnalyzer.lteq` (`:7137-7140`). Sites of this defect in `CodeGen.java`: three casts of the receiver's type, `:7270`, `:7323` and `:7497` on the base, all on the one path of `forMethodInvocation` and all fed by the one replaced `receiverType`; other casts of a type to `TraitType` or `NamedType` in the file (`:625`, `:4586`, `:6607`, `:7014`, `:7070`) are guarded by an `instanceof` or read a declared type: 0 other sites.

## 4. What the specification settles

A value of an intersection is a value of each conjunct (`Specification/basic/types-vals-vars.tex:627-628`), and a dotted call binds the receiver to the method's `self` (`Specification/basic/expressions/method-invocation.tex:47-48`); the type of such a call is the intersection of the candidates' return types (`Specification/advanced/overloading.tex:701-705`). So each conjunct's method applies, and the declaration that runs is the value's own. The specification does not speak of the JVM's owner class; the rule that picks it is the code generator's.

## 5. Programs run old against new

Each under `tmp/rung-intersection-receiver/probe/`, the old code through `old-fortress.sh` on `/home/user/fortress-base37`, the new in the worktree:

- `ProbeIntersectionOwner.fss` (`get` overloaded across the conjuncts, a generic method): old, `ClassCastException: ... IntersectionType cannot be cast to class com.sun.fortress.nodes.NamedType` at `CodeGen.forMethodInvocation(CodeGen.java:7323)`; new, prints `left int`, `right string`, `picked`, `PASS`.
- `ProbeGenericOnly.fss` (the generic method alone): old, `ClassCastException: ... cannot be cast to class com.sun.fortress.nodes.TraitType` at `CodeGen.java:7270`; new, runs.
- `ProbeTypecaseBinder.fss`, `ProbeTypecaseBinderGeneric.fss`: old, the `NamedType` cast at `:7323`; new, `marked square` / `marked box`, `plain`, `PASS`.
- `ProbeThreeConjuncts.fss` (three closed traits, `LeftSub` below `LeftResult`): new, `left sub`, `right`, `PASS`. An instrumented copy showed the checker gives the receiver `AND(LeftSub,RightResult)`: it drops `LeftResult` itself, so no program here reaches the rule's choice between two nested conjuncts.

The narrowing by the declaring trait, checked by a scratch copy of the edit without it (`if (true)` in its place): `ProbeIntersectionOwner` then prints `left int` and dies at `choose(m).get("a")` with `java.lang.NoSuchMethodError`, since `LeftResult`, the first conjunct with a `get`, has no `get(String)`. The instrumented copy printed the rule's inputs for every call of the test, as `OWNER-PROBE get in AND(LeftResult,RightResult) declaring=RightResult owners=[RightResult]` and `OWNER-PROBE tag in AND(LeftResult,RightResult) declaring=Tagged owners=[LeftResult, RightResult]`; a getter's call has no arrow (`declaring=null`).

The one library, through the planner's measure of F-34 (`explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh` on a scratch worktree seeded at `e0a5274db2`, the rung's code), run on the rung's code only; its before is F-34, measured on `c3b16ef2d1`, whose code is the base's (`git diff --name-only c3b16ef2d1 1609258002b0 -- ProjectFortress Library build.xml Specification bin` prints nothing):

    refused declarations 17 | emitted (OK lines) 743 | component failures 0
    kinds 4
      9  Can't compile VarArgs yet  [String 4, FortressLibrary 3, List 1, FlatString 1]
      5  <X> is not in the kind env  [List 3, FortressLibrary 1, CovariantCollection 1]
      2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
      1  OptionUnwrapException at edu.rice.cs.plt.tuple.Null.unwrap:58  [Stream 1]

and `@@CG OK	FnDecl __filter	.../Library/FortressLibrary.fss:1489:1-1497:2` in its `run.txt`. Against F-34's 18 printed (17 with `ArrayList` counted once), 742 emitted and 5 kinds: the kind 'an intersection as a receiver' is gone, and `__filter` is emitted.

## 6. The stages, the ladder, the shadow patch

The section asks for no stage. STAGE_BLIND, every path the rung adds or changes (`git diff --name-only 1609258002b0`): `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`; `ProjectFortress/compiler_tests/CoverageReturnMethodCall.fss` and `.test` (renamed from `XXXCoverageReturnMethodCall.fss` and `.test`); `ProjectFortress/compiler_tests/TypecaseBinderMethodCall.fss` and `.test`; this report and `record.md`. The count stage and the distance stage run the checker and no code generation (F-34), so neither moves.

The distance stage's shadow patch, run once on the rung's tree:

    ( python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress tmp/rung-intersection-receiver/shadow/shadow-src && python3 explorations/coordinator/tools/distance/add-patch.py tmp/rung-intersection-receiver/shadow/shadow-src ); echo $?
    0

and its seven shadow sources compile with the stage's `javac` line (exit 0). Its `CodeGen.java` anchors are in `forComponent` and the constructor, none in the members this rung edits.

The ladder subset is empty: no file's recorded first error names what the rung touched. `grep -iE 'Intersection|NamedType|forMethodInvocation'` over the baseline's `ladder.tsv` (410 files) and the newest landed `explorations/compile-ladder/climb-batch-31b/gate/ladder/ladder.tsv` finds no first error at the intersection cast; the baseline's code-generation stops (21 files) name other walls. So no ladder driver ran.

Not run, as the brief says: the team demos and the microGPT checks. The checker is not edited, so "The checker's time" does not apply.

## 7. Sentences of the specification made false

- `Specification/appendices/changes.tex:3740-3747`, the Effect of "The Meet Rule for traits with comprises clauses": "The compiled type checker departs from this in four ways: ...; its code generator stops at a method call on a value of such a type (row~540); ...". The clause is false now; the sentence then names three ways. The skeptic corrected it on the branch (SKEPTIC.md); it is `:3740-3746` now.

None other: `grep -rn '540' Specification --include=*.tex` finds only this place.

## 8. Points to report

- The owner as found (`CodeGen.java:7510-7553`): the trait-type conjuncts that have a method of the call's name whose declaring trait is the one the checker's arrow names (where the call has no arrow, as a getter's, one of the name that takes the call's argument by its number of parameters, the skeptic's fix); of those, the one below all the others; else the first in the intersection's order, each of them then having the same declaration. Where several declare the method: `get` across `LeftResult` and `RightResult` goes to the declarer the checker chose; `tag`, inherited by both from `Tagged`, goes to `LeftResult`, and the object's override runs (`CoverageReturnMethodCall.fss:43-45`). The cast: `generalizedCastTo` to the owner's class right after the receiver is evaluated (`:7346`, `:7372`, `:7580-7584`).
- Row 540's test promoted to a run test (`ProjectFortress/compiler_tests/CoverageReturnMethodCall.test:1-5`), failing on the base and passing after (section 2), with the notes' forms: `.right()` (`CoverageReturnMethodCall.fss:40`), the variable (`:47-50`) and the getter (`:41`, `:50`).
- The distance stage's shadow patch applies to the rung's `CodeGen.java`: exit 0 (section 6).
- The files edited (STAGE_BLIND, section 6): `CodeGen.java` and the rung's tests; no file beyond those the section names. In `CodeGen.java` the edit stays in `forMethodInvocation`, and its four helpers, five with the skeptic's `takesArgumentOf`, are new members directly below `sanitizePossibleStupidIntersectionType` (`:7461-7535`), between it and `emitInvokeGenericMethodClosure`; no member that V or Q names is touched. Rung N of run 2 reads `receiverCast` and `castReceiver` in `forMethodInvocation` (`:7215-7221`).
- Reserved, not reached: a model line (none changed); a change of which declaration a call reaches. On the base every intersection receiver crashed at one of the three casts, so no program that compiled there has a call changed; on the calls that now compile, the JVM dispatches on the value's class and runs the object's own declaration, walk's answer (`tag()` gives "both", `CoverageReturnMethodCall.fss:43`).

## 9. Decisions

1. The owner rule: the conjuncts with the checker's chosen declaration, the most specific, else the first. Ways not taken: any conjunct with a method of the name (dies `NoSuchMethodError` on a method overloaded across the conjuncts, section 5); the declaring trait itself, which is no conjunct and, where generic, needs the conjunct's instantiation; matching the JVM signature of each conjunct's methods, which the arrow's `MethodInfo` already decides. No decision on record speaks of the narrowing; fork I1's "the conjunct that declares or inherits the called method" is read as the method the checker called.
2. Among incomparable owners, the first in the intersection's order. Way not taken: an order by name. Every such owner has the one declaration, and the class of the value runs its own, so the choice changes no behaviour, only the class name in the call.
3. The generic-method branch gets the owner as well. Way not taken: leaving it at the `TraitType` cast (`:7270` on the base), a crash of the same row (section 5).
4. The cast through `generalizedCastTo` to `methodCall`'s own class name, the file's idiom (`castToTypeBelow`). Way not taken: `mv.visitTypeInsn(CHECKCAST, ...)`, the same instruction for a trait.
5. No owner among the conjuncts stops with a `CompilerError` naming the method and the type, a wall with a message. Way not taken: falling back to the first conjunct, which would give a link error at run time.
6. The typecase binder gets its own test, `TypecaseBinderMethodCall`, named by its topic. Ways not taken: a case in `TypecaseBindRungG`, whose cases are bindings at a type below the selector's; a case in `CoverageReturnMethodCall`, whose topic is the call typed by its candidates.
7. The promoted test keeps `compile` beside `link` and `run`, as the section asks and as `CoverageReturnExpected.test` has.
8. The planner's measure of F-34 run once, on the rung's code only, to show the library's site; its before is F-34.
9. No ladder run: the subset is empty (section 6).

## 10. Defects and their homes

- Row 540, a method call on a call typed by the intersection of its candidates' return types: home 1, repaired; `compiler_tests/CoverageReturnMethodCall.test`. The row closes.
- A generic method on such a value, crashing at the `TraitType` cast (`CodeGen.java:7270` on the base): home 1, the same row's crash at a second cast, repaired; asserted in `CoverageReturnMethodCall.fss:46`.
- A method on a `typecase` binder typed by the intersection of the selector's type and the arm's, `__filter`'s shape (F-34 counts `__filter` under row 540): home 1, repaired; `compiler_tests/TypecaseBinderMethodCall.test`.

No new defect was measured.

## 11. Commands worked out

- `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>` after `seed-worktree.sh /home/user/fortress-base37 <scratch-worktree> - <commit>`: the F-34 measure on a commit of the rung's branch; remove the scratch worktree after with `git worktree remove --force`.
