<!-- The combined post-batch review of climb batch 33, run 1 of `coordinator/CLIMB-BATCH-33.md`: the library selector, a `typecase` arm at a name that no declaration defines, the code generator's kind environment, `self` at a conditional's arm, a closure's result and a default body, a method call on a value typed by an intersection, and four of the checker's smaller gaps (six rungs, S, D, V, Q, I and C, landed at `d3747846c1` on 2026-11-17 on the curator's go of about 17:13 UTC, every fork at the planner's default; run `wf_6339efde-563`, every agent on Opus, no judge, no repair, one green gate; the coordinating session's workers committing on `main` during the rung stage), by a review worker reading only: the landed changes against P-33, P-37, P-167, P-60, P-146, P-173 and P-148, what the two paths still do differently, the forks that landed at a default and the run's ten items for the curator, the measure that no stage took after the run, the gate, the cost in three spans and by role against the estimate, the briefing's use, re-measuring, two events, one finding for the curator (fork D1 and row 1064: the team's two untyped binder forms in a `typecase` arm, one ended and one kept), the practice's measures, the skill writer's list, the routing, what run 2's four sections need on the landed tree, and a section for the curator that shows each rung on a small program. Base `1609258002b016489c96bd6e438389e89773b9eb`, base build `/home/user/fortress-base37` at `c3b16ef2d1`; launched 17:42:25 UTC from the coordinator's turn after the manifest worker's hand-back; landed on `main` as S `c7ba100d14`, D `18240c9d85`, V `5073eb2aaf`, Q `1f6c166b0d`, I `e501de7a15`, C `8979406af2`, the closes `9f2ff9b04e`, the gather's record `41894ec7d6`, the review's corrections `f470e902b9` and the gate's tables `d3747846c1` (22:36:00), pushed by the commit stage with no hold; 17 agent transcripts for 17 results. Read against `main` at `5b79091a2c`, whose one commit after `d3747846c1` is the coordinator's boot note; the coordinator's `2b9bc1fd4e` (two reviews) and `8109b61c63` (the batch script's four fixes) followed during this review, under `explorations/` only. Sources for the decisions: P-33 with its history's thirteen blocks, P-37 with its last blocks, P-167 with its history, P-26, P-60, P-146, P-173 and P-148. The gate's result is cited as its agent returned it and was not run again. The measures are `batch-measures.py`'s on the run's directory, `spend.py` over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch33/rev33/ (tx.py, brief.py, calls_mod.py, skill.py, attach.py, usertext.py, taskrem.py, runs3.py and mainw.py, copied from the review of climb batch 31b). Tokens are writes only (input plus cache creation, one count per message id). Besides reading, this review ran only those scripts, facts-extract.sh, grep, sed, awk, git and one `git apply --check`, which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. -->

# Climb batch 33, run 1: six of six rungs, the compile command able to read the one library, a `typecase` arm at an undefined name refused on both paths, three walls of the code generator and four of the checker gone, the count and the distance still 0 at a green first gate; a run of 5.45M, 18 % over its estimate and inside its range, after a preparation of 3.98M and the batch before's landing of 4.20M

## What came up in this run

### 1. The landed changes against the decisions, rung by rung and path by path

Lines are `main`'s at `d3747846c1`. Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`. The gather applied the rungs in the order S, D, V, Q, I, C; the one file that three rungs share is `compiler/codegen/CodeGen.java` (V, Q, I, by their lowest edited lines 498, 3926 and 7214), and every hunk applied cleanly (`compile-ladder/climb-batch-33/RECORD.md`, "Conflicts").

**S, the library selector (P-33, F-353). The compiled path's commands, the class path scripts and the build; P-33's slice-first order built; P-37 kept; fork S5 builds no second set of run-time classes.**
- The selector: `ProjectProperties.compiledPathUsesOneLibrary` reads `"one".equals(System.getProperty("fortress.library", System.getenv("FORTRESS_LIBRARY")))` once, when the class loads (`repository/ProjectProperties.java:290-291`); `WellKnownNames.compiledPathUsesOneLibrary` gives it to the compiler (`compiler/WellKnownNames.java:149-150`); `Shell.useCompilerLibraries()` points `WellKnownNames` and `Types` at the one library where it is set, and at the prelude where not (`Shell.java:377-388`). Walk's `useInterpreterLibraries()` is unchanged.
- The caches folder: `default_repository/caches-one` where the selection is on and no caches folder is named (`ProjectProperties.java:299-302`); the two class path scripts follow the variable only (`bin/fortress_classpath:25-31`, `bin/run_classpath:25-31`); the build's stamp and `ant cleanCache` cover both folders (`build.xml:47`, `:367`, `:376`, `:531-565`, `:863`); `.gitignore:28-29`. By reading, `CACHES` is one value per JVM, so a walk run with the variable set keeps its caches in `caches-one` too; it reads the interpreter's library as before.
- The track: `ProjectFortress/one_library_tests/` with `OneLibraryHalf.test` and `OneLibraryPrintBig.test` (compile) and `XXXOneLibraryRunHalf.test` (the run, an expected failure: 'NoClassDefFoundError: fortress/FortressLibrary$String', row 1062); `ant testOneLibrary` (`build.xml:1146-1156`) and `testFast`'s fifth track, which pins the variable (`:1201-1223`, `:1275-1280`), while the misc track leaves the class out (`:1262`); the gate reads it as `fast-onelibrary/OneLibraryJUTest` (`explorations/coordinator/tools/gate-functions.sh:33`). Two files beyond those named: `.gitignore` and `tests/unit_tests/OneLibraryJUTest.java`.
- P-33 (history read whole): its last block, 2026-11-17 12:35Z, records his words "if the probe y works, we will take the micro GPT slice first", and the entry's text carries the mechanism "one build serving both by a second set of the run time's value classes (F-353)". The landed selector serves both libraries from one build with one set of run-time classes; F-353 now ends "`main` has the selector (F-381), one set of run-time classes, and no second set". The slice-first order is built; the words on the second set are not. They are on his review list already (`CLIMB-BATCH-33.md`, section 2, "Your review list from this record"), and the record gives their change to the record-landing after run 2.
- P-37: "no declaration is added to the compiler's prelude". The rung adds none, and the prelude stays the default: unset, every command reads it as before (F-381).

**D, a `typecase` arm at a name that no declaration defines (row 959; rows 1064 and 1065 opened). The disambiguator, which both paths run, and walk's harness; P-167 met; fork D1 built, and wider than its picture for him.**
- The refusal: `handleTypeName` reports 'X is undefined.' at a name in a clause's type that binds no type variable in scope and no declared type, except an element of a tuple of names (`compiler/disambiguator/TypeDisambiguator.java:398-406`); `forTypecaseClause` fills that exemption from the clause's tuple type at any depth (`:241-248`, `tupleElementNames` `:264-275`). A type parameter in scope still binds the arm, first (`:392-393`). So the bare arm `Int =>`, and an undefined name inside an arm's arrow type or static argument, are refused on both paths.
- What went with it: the team's rewrite of a bare undefined name into a binder over every value, `x =>` read as `x: Any =>` (`TypeDisambiguator.java:246-250` at the base, the team's lines, older than the history's cut at `5a68404fdf`, 2012-07-19). The team's test `compiler_tests/Compiled7.PatternMatching.b.fss:30` wrote `x => println x` and was respelled `x: Any => println x`; its sibling `Compiled7.PatternMatching.a.fss:30`, `(x, y) => println x`, the team's tuple of names, is kept and still binds (row 1064, CONTESTED). This is finding 1 (Part 1).
- Walk's harness: `InterpreterTest.thrownAtLoad` counts a `StaticError` of the phases as a refusal at load (`tests/unit_tests/FileTests.java:875-878`; F-383), a file beyond those named.
- P-167: "walk's native objects stop being types that a program sees or prints; its five native number objects go altogether (P-178)". Since climb batch 31b an arm at `Int` took every value with no message; now it is refused, 'Int is undefined.' (`tests/TypecaseUndefinedArmWalk.fss`; the orientation key's case 36, run by the gather on the merged tree: 'Int is undefined.', 'Float is undefined.'). The decision is met.

**V, the code generator's kind environment (rows 812 and 822; row 1066 opened and fixed; rows 1067 and 1068 opened). The code generator only; P-60 met; fork V1 built, with one addition.**
- A type's inherited methods are read with the type's static parameters and `where` clause in scope: `typeAnalyzer.extendJ(tci_sps, tci_decl.getHeader().getWhereClause())` passed to `STypesUtil.properlyInheritedMethodsNotIdenticallyCovered` (`CodeGen.java:499-502`), row 812's wall.
- A generic function's or method's body is compiled by a `CodeGen` whose analyzer holds the declaration's own static parameters and `where` clause (`generateGenericMethodBody`, `:2754`).
- The addition: a clause's tuple pattern, as `(a': Bx[\T\], b': Bx[\T\]) =>`, binds each of its names to its element (`forTypecase` `:2543-2544`; `namesTupleElements` `:2579-2585`; `bindElementsAndGenerateClauseBody` `:2588-2610`). On the base those names were unbound, so a read of one compiled as a top-level variable and died, 'NoClassDefFoundError: P$s', and in a generic function stopped the compile with the kind environment's message: row 822's crash came this way (row 1066). It goes beyond V1's words; the one library writes the form (`Library/List.fss:94`, `Library/CovariantCollection.fss:33`, `Library/FortressLibrary.fss:1664`).
- P-60: "a `comprises` clause speaks of values". `ComprisesWhereMemberCompiled` runs a member that a generic trait defines for a trait whose clause lists it at a `where`-clause type, dotted, functional and inside a generic function.

**Q, `self` at a conditional's arm, a closure's result and a default body (rows 1051, 1050 and 1052; review-queue item 572; rows 1069, 1070 and 1071 opened). The code generator and the class loader; P-146 and P-60 met; forks Q1 and Q2 built.**
- The casts, each through rung K's unchanged `castToTypeBelow` (`CodeGen.java:7764-7786`), which emits nothing unless the value has self's type and the target lies strictly below self's trait: each arm of a conditional at the conditional's own type (`forIf` `:4535`, `:4558`, `:4568`); a function expression's result (`:3968`) and a local function's (`localFunctionClosure` `:4127`) at the declared return type. `localFunctionClosure` is a member beyond those named; `forLetFn`, which the section named, is unchanged.
- The class loader: `MethodInstantiater.visitMethodInsn` reads `ACC_INTERFACE` from the class file that the loader would define for the owner (`runtimeSystem/MethodInstantiater.java:268-272`, `interfaceByClassFile` `:295-317`) and uses `invokevirtual` for a class; where it finds no class file, as for a class that it generates, it loads the class as before (`:272`; F-385).
- P-146: "In a self-typed trait ... `self` has the type `C[\X\] & X`". `SelfTypeArmRun` runs `mx(self, other: T): T = if lt(other, self) then self else other end`, the shape of `StandardTotalOrder`'s `MIN`, `MAX` and `MINMAX` (`Library/FortressLibrary.fss:291-294`). Item 572 is built.
- What stays: a `typecase` with `self` in one arm and another value in the other fails verification (row 1070, `compiler_tests/XXXComprisesValueAtTypecaseArmRun`); the checker refuses `self.d` at a listed type, '(Q & {R}) has no getter called d' (row 1071).
- Appendix I: the self-type parameter's Effect, which said that a closure and a conditional still fail, was corrected by the gather in Q's commit (`Specification/appendices/changes.tex:4439-4446`).

**I, a method call on a value typed by an intersection (row 540; rows 1072 and 1073 opened, row 559 rewritten). The code generator only; P-60 kept.**
- `forMethodInvocation` replaces a receiver type that is an intersection by the conjunct that `intersectionMethodOwner` finds and casts the receiver to it (`CodeGen.java:7264-7270`, `castReceiver` at `:7346`, `:7372`, `:7580-7584`). The owner is a conjunct that has the declaration that the checker's arrow names, or, where the call has no arrow, a getter's, one whose method of the name takes the call's argument by its count (`takesArgumentOf` `:7566-7571`, the skeptic's fix `e9718fa115`); of several, the most specific, else the first (`:7511-7564`).
- P-60: "The call's type is the intersection of their return types, and the declaration that runs is unique only at run time." The checker's typing is untouched, and the value's own method runs: `choose(m).tag()` gives "both" for the object that overrides it (`compiler_tests/CoverageReturnMethodCall.fss:43-45`).
- Appendix I: the Meet Rule's Effect lost its clause on row 540, four ways now three (`changes.tex:3740-3746`), by the skeptic.

**C, four of the checker's smaller gaps (rows 1005, 1028, 1029 and 1060; rows 1074 and 1075 opened). The checker only; P-173 built at one more place; P-148 met.**
- Row 1060: a block that ends in a numeral after a local declaration or a local function, at a binding without a declared type, gives the numeral its default (`scala_src/typechecker/impls/Functionals.scala:1290-1294`, `:1332-1333`). P-173: "where nothing fixes one, into the machine default, a `ZZ32`". So `x = do k: ZZ32 = 3; 4 end` binds a `ZZ32`.
- Row 1005: a primary whose math items each apply to its front, as `x[5]^2` and `g[1][2]`, and `x[5]k`, compile (`impls/Operators.scala:313-321`, `:360-362`; F-387).
- Row 1029: a local tuple binding is checked again against each declared name's type (`impls/Decls.scala:431-443`), so `(total: ZZ64, part) = two()` converts and `(word: String, part) = two()` is refused.
- Row 1028: the export check compares `var` as the mutability (`scala_src/typechecker/ExportChecker.scala:232-236`); its message for an immutable variable under an api's `var` now reads 'due to different mutabilities' alone, which no test pins.
- P-148: the worker's pair was 92.2 s on the base at load 0.26 against 119.0 s on the change at load 10.10, beside rung S's suites; the skeptic's own pair was 80.2 s and 81.1 s, the tables equal. No slowdown.
- Appendix I: the numerals' Effect names rows 1074 and 1075 (`changes.tex:5476-5480`), by the gather.

**What the two paths still do differently after this run.** Each is a row; climb batch 31b's differences stand as its review gives them, but rows 959 and 1060, which this run fixed.
- The library: walk reads the one library; the compiled path reads the prelude unless `FORTRESS_LIBRARY=one` selects the one library, and a program so compiled does not run (row 1062); under the selection a program that imports a grammar api whose template binds an `Id` gap crashes the checker (row 1063).
- A `typecase` tuple of names at an undefined element: walk runs it and takes every value there (row 1064); compiled with an `Any` selector, the checker refuses the arm as unreachable (the row's note).
- A clause's tuple pattern: compiled, each name is bound to its element; under walk, where one element is given by a type alone, the names are bound to the whole tuple, `(s: String, ZZ32) => tag(s)` giving 'got arg (m,1)' (row 1068), and `(first, ZZ32) => first` gives the whole selector (row 1065).
- `x[5]^2` and `g[1][2]`: compiled now; walk still fails (row 1).
- Compiled only: a `typecase` with `self` in one arm (row 1070); a clause's name bound at a trait above its selector's object type, at a method call on it (row 1067); `self.d` at a listed type (row 1071); a method of a type parameter's bound on a binder met with a trait (row 1072); a closure typed by an intersection, where it is made (row 559's fourth route); a `try` that ends in numerals at an untyped binding, and a tuple binding of a `case` or `try` of numeral tuples (rows 1074, 1075). Walk runs each.
- Compiled only, the other way: the checker accepts an object that inherits two getters of one name from sibling traits, where it refuses two methods so inherited (row 1073).

### 2. The decisions that landed at a default

The record's section 3 gives run 1 forks B1 to B3, S1 to S6, D1, V1, Q1, Q2, C1 and I1. The run's result holds ten items for the curator, all filed in `PLAN.md:883-889`, "Climb batch 33, listed for his review". Those that change what a program does or accepts follow. "Consequential" is the `coordinator` skill's rule (`SKILL.md`, "The curator's role and decisions").

**S1, the variable or the property, read once per JVM (S.worker.1, S.skeptic.1).**
- Landed: `ProjectProperties.java:290-291`, the property first, then the variable; the class path scripts read the variable only (`bin/fortress_classpath:27`, `bin/run_classpath:27`); the track pins the variable (`build.xml:1223`). No file of the tree passes the property.
- Against the plan: S1 says "The compile, the run and the harness's run step follow it". That holds for the variable. Under `-Dfortress.library=one` in `JAVA_FLAGS`, the compile writes to `caches-one` and the run's class path reads `caches`: 'Could not load P' (S.worker.1).
- Not consequential: it is inside P-33, can be undone in one line, and changes no program's answer. The simpler form is the variable alone, since every path that starts a JVM in this tree is a script or an ant target that passes the environment.

**S2, S3 and S4: the caches folder, no mark in a jar, the track in `testFast`.**
- Landed as the plan says (section 1). S3's wrong pairing fails at load, 'Could not load P' or 'NoClassDefFoundError: fortress/FortressLibrary$String'.
- S.skeptic.2: the team's sweeps `testUntil` (`build.xml:1285`) and `testCruiseControl` (`:1358`, which `testNightly` runs, `:1608`) take every `*JUTest` class without the selection, so each now reports one failure of `OneLibraryJUTest`. No gate runs them. The fix is one `<exclude>` in each, as `testFast`'s misc track has (`:1262`). Not consequential.

**S5 and S6: no second set of run-time classes; the code generator's output order not made stable.** Landed as the plan says. S5 leaves P-33's words on the second set inexact (section 1); it is on his list.

**D1, with D.worker.1, D.skeptic.1 and row 1064.** Finding 1. In short:
- Landed: section 1, rung D. The bare arm at an undefined name is refused on both paths, also where the name was the team's binder over every value, `x =>`; an element of a tuple of names still binds, `(x, y) =>` and `(Int, ZZ32) =>` alike (`tests/TypecaseTupleArmUndefinedNameBindsWalk.fss`: `("s", 3)` and `(2.5, 3)` both take the arm).
- Against the plan: D1's words cover the bare binder ("A `typecase` arm whose name binds no type variable in scope and no declared type is refused"), and section 4 asked that "each test's line is changed, with its reason". The section for him showed only `Int =>`; it did not say that a form of the team's, tested by the team, ends.
- Consequential, by the rule's third clause: the specification's grammar (`Specification/basic/expressions/typecase.tex:69-71`) and its scope rule (`basic/declarations.tex:571-572`) refuse both untyped forms; the team's code and its two tests bind both; the chapter's note defers the section to the pattern-matching proposal (`typecase.tex:15`); the library writes neither. The principles split, and the default chose a third way, one form each. It can be undone.

**V1 and the tuple pattern's names (V.worker.1, V.skeptic.1, row 1068).**
- Landed: section 1, rung V. As the plan says, with the binding of a clause's tuple pattern beyond V1's words.
- V.worker.1 asks whether the specification should state the form: its grammar has no names inside a clause (`typecase.tex:66-67`), and the parser, the checker, walk and now the code generator bind them, as the one library writes them. V.skeptic.1 asks whether row 1068's expected-failure test stands, since it reads the chapter as binding each name to its element. Walk itself binds each element where every element is named; the test asks walk to do the same where one element is a type alone. That is walk's own rule, not a reading of the chapter only, so home 2 holds.
- Not consequential as landed: the compiled path now does what the library writes and walk does. The statement in the specification goes with finding 1's answer, since both are the clause's binder forms.

**V.worker.2, with fork I1: which conjunct where two instances of one generic trait both declare the method.**
- Landed: `intersectionMethodOwner` takes the most specific conjunct, else the first in the intersection's order (`CodeGen.java:7547-7553`). `app`'s arms 2 and 3 call `appendRC` on `List[\E\] ∩ List[\T\]` (`Library/List.fss:96-97`), and neither conjunct lies below the other.
- By reading: no type extends two instantiations of one generic trait (the exclusion rule, P-43 and P-97), so a value of `List[\E\] ∩ List[\T\]` exists only where `E` and `T` are one type. Then both conjuncts name one class, and the choice changes no answer. No test reaches it: review-routed.1 owes one (`PLAN.md:889`).
- Not consequential.

**Q1, with Q.skeptic.1 and review-queue item 571.**
- Landed: section 1, rung Q. Against the plan: Q1 says "cast to the declared type where its static type is not already a subtype of it". The rung casts each arm at the conditional's own type, the checker's (`scala_src/typechecker/impls/Misc.scala:537-546`), so a `self` arm gains a cast where the context is a trait type and the verifier needs none: `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains '8: checkcast #21 // class SkNoCast$R' (`compile-ladder/rung-self-arm-closure/SKEPTIC.md`, item 6). The cast cannot fail (P-60).
- It is item 571's question at another place: rung K's `checkcast` at a declared trait type strictly below self's trait, "kept, or narrowed to object types. Default: kept." F-377 says "a worker chose it, and the curator has not decided it".
- Not consequential: one instruction at such an arm, no value changes, and it can be undone. Its home is item 571.

**Q2 and F-385: the opcode chosen without loading the owner.**
- Landed: section 1, rung Q, as the plan says. The skeptic's `SkReach`, the reserved point "a change of which declaration a call reaches", printed the same eleven lines old and new at one and four threads and under walk.
- Two points by reading, neither measured: the read keeps no cache, where the team's lookup beside it does (`xlationForGeneric`, `stemToXlation`), so each such call site of each expansion opens and parses a class file; and a class that the loader generates has no class file, so a generic object that lists a self-typed trait first is loaded as before, and row 1052's circularity may stand there. No test holds either.
- Not consequential: no call's target changes, and it can be undone.

**C1 and its reserved point "a program that compiled and is now refused".**
- Landed: section 1, rung C, as the plan says, with `x[5]k` beyond row 1005.
- The point was reached: `(word: String, part) = two()`, for `two(): (ZZ32, ZZ32)`, compiled on the base and printed 8; it is refused now, 'Right-hand side has type (ZZ32, ZZ32), but declared type is (String, ZZ32).' (`compiler_tests/LocalTupleBindingMixedRefused.fss:8`); walk refuses it too. The skeptic's `SkBlockNumNN`, a block's numeral bound with no type and then given to an `NN32`, died at run time on the base and is refused now, 'Right-hand side has type ZZ32, but declared type is NN32.', which P-173 asks.
- Not consequential: each refusal follows the specification (`basic/variables.tex:65`, `:195-198`) or P-173, and walk agrees. The point is in the record's "Points to report" only, not in his list (Part 4).

**I1, the owner among the conjuncts.** Landed: section 1, rung I, as the plan says, with the skeptic's narrowing for a call with no arrow. Not consequential.

**B1, B2 and B3: two runs, what the batch takes, item 572 first.** Ordering only; landed as the plan says.

**review-routed.1, the meeting of rungs V and I.** No gated test calls a method on a tuple pattern's name typed by an intersection, `app`'s form. A test owed, not a question; `PLAN.md:889`.

### 3. The measure: the declarations of the one library that the code generator refuses

**Before run 1: 17, in 5 kinds,** on `c3b16ef2d1`'s code (F-34): 'Can't compile VarArgs yet' 9, a type variable missing from the kind environment 4, a closure class written twice 2, an intersection as a receiver 1, and `Stream`'s `WriteStream` 1. The script printed 18, since `cgkinds.py` counted `ArrayList` twice; since `21af73cf48` (17:51:53, on `main`, after the base) it counts each once.

**After run 1: no stage measured it.** No agent of the run ran `codegen-measure.sh` after the gather: its runs are rung V's at 19:12 and rung I's at 19:58, each on its own code. The record gives the measure to "the coordinator or the post-batch reviewer in a scratch worktree" (`CLIMB-BATCH-33.md`, section 6, "The gate, and what it should show"); this review reads only. It can run on the landed tree as it is: `git apply --check explorations/compile-ladder/plan-31/probes/planner/measure-hacks.patch` prints nothing on `main`, and `NN32`'s two getters stand as the script's `sed` lines expect (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:264-265`).

**What the rungs' own runs show.**
- Rung V on its code (`18d5b51578`): 'refused declarations 15 | emitted (OK lines) 743', 5 kinds: varargs 9, an intersection as a receiver 3 (`__filter`, `__bigOperator2`, `app`), the closure class 2, `WriteStream` 1. No refusal at the kind environment: `ArrayList` and `APPCOV` are emitted; `app` and `__bigOperator2` pass V's wall and stop at row 540's (`compile-ladder/rung-kind-env-generic/REPORT.md`, "The one library's four declarations"). With `ArrayList` emitted, the old counter counts nothing twice, so 15 is 15.
- Rung I on its code (`e0a5274db2`): 'refused declarations 17 | emitted (OK lines) 743', 4 kinds, with `__filter` emitted (`compile-ladder/rung-intersection-receiver/REPORT.md`, section 5). Its worktree's counter is the base's, which counts `ArrayList` twice among the kind environment's 5; counted once, 16.
- Neither ran on the other's change. By reading, on the merged tree: the 12 that no rung of run 1 reaches stand (varargs 9, `WriteStream` 1, the closure class 2); `ArrayList`, `APPCOV` and `__filter` are emitted; `app` and `__bigOperator2` pass both walls, and what stands behind them is not known. `app`'s arms 2 and 3 are review-routed.1's form.

**What the record should state until the measure is taken:** "17 in 5 kinds on `c3b16ef2d1`'s code; after climb batch 33's run 1 not measured; by its rungs' own runs, 12 to 14 expected: 12 that no rung reached, and `app` and `__bigOperator2` past their walls, unmeasured behind them." F-384 already says that the measure "is not taken on the merged tree". F-34 and `PLAN.md:67` give only the before.

### 4. The gate, the count and the distance

**The one gate is green,** as its agent returned it, on `main` at `41894ec7d6`: `testFast` 59 suites, 2,559 tests; `testSystem` four shards, 876 tests; `testSpecData` 130 tests; 0 failures in 3,565 tests in 64 suites (climb batch 31b's 3,515 in 63). `CompilerJUTest` 1,694 to 1,736, the system shards 871 to 876, and one new suite, `fast-onelibrary/OneLibraryJUTest`, 3 tests; every other suite unchanged. 24 atomic programs, 72 of 72 `PASS`. The ladder with no move, the 18 microGPT components unchanged. The checker count 0 over 14 apis with `#crash none`, 'COUNT SAME   0, declared none'; the distance 0, 'DISTANCE SAME   0', every kind 0. No row of the count's table is new or risen, so no rung edit is tied to one. microGPT's walk check gave 7 of 7 for both programs at the commit stage, 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' (43 s and 36 s). The review committed `f470e902b9` during the gate; it changes only files under `explorations/`, which the gate does not read (`git diff --name-only 41894ec7d6 HEAD -- ProjectFortress Library build.xml` prints nothing).

**The comparisons.** `gate_compare`, `ladder_compare` and the microGPT phase diff printed nothing; only the ladder's timing column differs from climb batch 31b's. So nothing hidden goes to the list. One line of the team's tests was rewritten to keep its checked value: `compiler_tests/Compiled7.PatternMatching.b.fss:30`, before `x => println x`, after `x: Any => println x` (finding 1).

**The stages' seconds.** The count stage took 78 s by the gate's log times, against about 85 s at climb batch 31b's gate. The distance stage took 137 s (`FortressLibrary` 87 s), at a start load of 0.50 and then beside `testFast`, against 150 s (96 s). The commit stage wrote both into F-240.

**After the skeptics' fixes.** One fix changed code: I's `e9718fa115`, checked by the skeptic's own runs ('OK (22 tests)') and no suite. The gate is its whole-suite check on the merged tree.

### 5. The cost, by role, against the record and the batches before, and in three spans

**The run wrote 5.57M over 17 transcripts, in 4 h 54 min** (17:42:25 to 22:36:00 UTC; `batch-measures.py` gives the same 5.57M). Every agent returned a result; none was lost. Span 3 below counts the run without the commit agent, whose transcript changed after the span: 5.45M.

By role (writes, then share):
- Rung workers (6): 2.27M, 40.8 %. C 432K, D 408K, V 375K, S 373K, Q 356K, I 330K.
- Skeptics (6): 2.00M, 35.9 %. S 386K, I 338K, Q 333K, C 327K, V 315K, D 303K.
- Gather 507K, 9.1 %. Merged-diff review 457K, 8.2 %. Gate 141K, 2.5 %. Commit 125K, 2.2 %. The disk check 66K, 1.2 %.
- No judge, no repair, no second gate.
- Per landed rung, all roles: 0.93M; a rung with its skeptic, 668K to 760K, 712K on average.

**Against the record:** "Run 1: about 4.6 million tokens written, 5.4 million with the reserve. The range is 4.0 to 6.4 million. About 4 hours and a half, and 5 hours and a quarter with the reserve. Six workers write about 2.3 million, six skeptics about 1.4 million, and the fixed roles about 0.9 million." (`CLIMB-BATCH-33.md`, section 2, "Cost and time"). **5.57M: 21 % over the estimate without the reserve, 3 % over it with the reserve, inside the range; 4 h 54 min against about 4 h 30.** The reserve, 0.8M for rulings, repairs and a second gate, was not spent.
- **The workers wrote 2.27M against 2.3M (−1 %).** The estimate held. They took 46 to 64 minutes each (the plan's figures, which order the scatter only: C 220, S 200, V 200, Q 200, D 150, I 150).
- **The skeptics wrote 2.00M against 1.4M (+43 %).** Each wrote 303K to 386K, in 17 to 26 minutes, and made 20 fix commits.
- **The fixed roles wrote 1.30M against 0.9M (+44 %).** The record's own evidence names climb batch 31b's fixed roles at 1.25 million on Opus, and 0.90 million for run 1 of climb batch 31, on Fable; the estimate took the second. Climb batch 31b's review proposed the first (its process finding 6: "an estimate takes each role's figure from the last run on the same tier ... skeptic 0.31M to 0.46M, gather 0.46M, review 0.45M, gate 0.14M, commit 0.13M on Opus"). By those figures the run is 2.3M + about 2.0M + 1.25M, about 5.6M: the excess is the estimate's choice of figures, not the work (process finding 1).
- **The minutes.** The script runs two agents at a time, the workers first in the order C, S, V, Q, D, I, then the skeptics: the rung stage took 3 h 40 (17:42 to 21:22). The gather took 46 minutes, the review 23 beside the gate's 25, the commit stage 4.

**The cost in three spans, each on its own folders,** as `spend.py` from a span's start less `spend.py` from its end. A transcript counts in the span where it last changed.
- **Span 1, climb batch 31b's landing work,** from its commit stage's last commit `00dd16a891` (10:18:00) to the end of its record-landing workflow, run `wf_f428fe5b-2d0`, whose journal was last written at 13:42:10; the boundary is 13:42:11. Over that run's folder and its headless writers (the two in `-home-user-fortress-landing-31b`, and `427ed932`, `376727b6` and `8a29b6b4` in the project's folder): `spend.py` printed 4.35M from 1794910680 and 0.16M from 1794922931. **4.20M over 28 transcripts.**
  - The workflow's 24 agents, 3.47M; its headless writers 0.73M: the two record writers (284K and 313K), the orientation writer `427ed932` (55K) and its fix `376727b6` (77K). The skill writer `8a29b6b4` (155K) last changed at 14:33:22, after the workflow's end, and counts in span 2.
  - By part: the record (10:49 to 11:50) 2.09M; the orientation update (11:50 to 13:36) 1.89M, of which 174K in its two launches that his interrupt of 12:05 and the VM's restart of 12:56 cut, run again after the resume at 12:57; the skill step, the push and the revival page (13:36 to 13:42) 0.22M. The revival page stopped: 'update.py stops: measure.py failed (rc 1)' (the journal's last result).
  - In the span's time but outside its folders: climb batch 31b's post-batch review 661K (10:20 to 10:48); this batch's base build and F-34's measure on it 127K (10:52 to 11:05); a scout and a summary for item 512, 97K and 139K (11:11 to 11:18); the coordinating session's own writes, 564K over 121 messages (`mainw.py`).
- **Span 2, the preparation,** from 13:42:11 to the launch (17:42:25). Over the session's Agent-tool workers' folder and the project's folder of headless runs: `spend.py` printed 5.70M from 1794922931 and 2.17M from 1794937345. **3.53M over 13 transcripts, and the coordinating session's own 450K over 165 messages: 3.98M.**
  - The preparation that the record names, 1.65M: the planner 1.17M, of which its plan 495K (15:32 to 16:19) and its follow-up probes for rungs I, G and W 671K (17:07 to 17:26, after his question of 17:06, "Why can't we tackle the var args in the same batch?"); the Fable review of the record 253K (16:20 to 16:32); the manifest worker 232K (17:27 to 17:42:14).
  - The decisions before the plan, 0.65M: item 512's routing and the measure 208K (14:26 to 14:36), a scout of his words on the carriers 69K (15:13), a check whether his words settle fork H2 199K (15:15 to 15:22), and fork H2's routing 173K (15:22 to 15:30).
  - Climb batch 31b's landing, finished outside its workflow, 1.24M: its skill writer 155K (resumed at 14:31 for the cold read), the finish of the writer's commits 127K (14:23 to 14:25), a cold read of them 120K (14:25 to 14:31), the page of `fortress-repo` changes 430K (14:33 to 14:50), the fix of `update.py` after the revival page stopped 391K (of which 140K at 10:28 to 10:4x, in span 1's time), and a one-message check of a headless run 13K (14:28, Haiku).
- **Span 3, the run,** 17:42:25 to 22:36:00, over the run's folder: `spend.py` printed 5.57M from 1794937345 and 0.13M from 1794954960. **5.45M over 16 transcripts.** The commit agent, 125K, last changed at 22:37:28 and counts after the span. The coordinating session wrote 379K during the run, over 114 messages, its compaction's boot at 17:48 among them. In the span's time but outside its folder: the coordinator's workers of 17:50 to 18:01, 399K (two tool fixes 117K, the record writer for climb batch 31b's leftovers 282K), and of 21:43 to 22:41, 1.47M (the arrays page 437K, the review of the transactions' cost 332K, the arrays page's compiled half 698K, begun at 22:19 and ended after the span).

So climb batch 31b's landing cost 4.20M in its span and 1.24M more after it, about as much as this run, and this run's preparation cost 3.98M, of which the planning proper was 1.65M.

**The briefing's use.**
- **12 of 12 briefed launches read their briefing, 100 %, and each read every part. None read it in its first turn.** The briefed launches are the six workers and the six skeptics. The disk check, the gather, the review, the gate and the commit stage have none by design.
- When: rung Q at call 8, 27 s after its start; skeptic V at call 8, 41 s; rung D at call 12, 32 s; skeptic S at call 15, 37 s; skeptic C at call 16, 42 s; skeptic D at call 17, 37 s; skeptic Q at call 17, 38 s; skeptic I at call 18, 82 s; rungs V and I at call 19, 58 s and 43 s; rung S at call 20, 45 s; rung C at call 22, 52 s. Rung D wrote its briefing to a file and read the file at call 13 (`tmp/rung-typecase-unbound-arm/briefing-1.txt`, 25,433 characters); `brief.py` counts only the command's short output for it, so its share is counted by the read.
- Its results came to about 147K tokens, 2.6 % of writes, at 0.40 tokens a character plus 110 a call.
- Against the batches before (briefed, read, at calls, seconds, share): B26 8, 8, 5 to 13, 21 to 89, 5.2 %; B27 15 of 19, 15, 4 to 16, 16 to 78, 6.2 %; B28 15, 15, 3 to 21, 14 to 95, 3.1 %; B29 15, 15, 4 to 20, 15 to 105, about 3.6 %; B29b 4, 4, 12 to 21, 41 to 97, 2.7 %; B30 6, 6, 5 to 14, 23 to 53, 4.9 %; B32 16, 15, 4 to 17, 19 to 78, 5.0 %; B31 run 1 16, 16, 5 to 16, 18 to 73, 5.0 %; B31 run 2 6, 6, 7 to 22, 34 to 73, 3.0 %; B33 run 1 12, 12, 8 to 22, 27 to 82, 2.6 %.

**Other measures.**
- First calls: 801K (14.4 %), 7 cold. Cache refills: 0. Refusal cycles: 0. Rulings and repairs on the merged tree: 0.
- The skill's load, by a rough count (the load text and every call whose path names the skill's folder): about 1.02M, 18 %. `revival-changes.md` was read whole by 15 of the 17 launches: all but the disk check and the commit stage. `sources.md` was not read.
- Error results: 50.
- Per agent, in order of start (ids are the transcripts' `agent-<id>.jsonl`): disk `ad3cd2ca`, 66K, 0.1 min; rung C `af2c3742`, 432K, 50.8; rung S `ae36b71f`, 373K, 50.6; rung V `a7524394`, 375K, 53.4; rung Q `a58b068f`, 356K, 45.9; rung D `a05c3904`, 408K, 63.8; rung I `a6a1f1c8`, 330K, 45.8; skeptic S `a896691d`, 386K, 18.2; skeptic C `a8612739`, 327K, 18.2; skeptic Q `aed5ea5a`, 333K, 24.4; skeptic V `aa02ea8d`, 315K, 24.2; skeptic I `aebd97c1`, 338K, 26.4; skeptic D `a65052d9`, 303K, 17.2; gather `a17ee7e9`, 507K, 45.7; gate `a194d2e8`, 141K, 24.9; review `a54243b0`, 457K, 23.1; commit `a195ca0d`, 125K, 4.1.

### 6. Re-measuring: a build, a suite or a measurement on a code state that another stage ran

By each agent's commands (`runs3.py`):
- **No agent ran a whole suite twice on one code state.** S ran `ant testFast` and `ant testSystem` once each, and `ant testOneLibrary` for its track; D ran `testFast` and `testSystem` once each; V, Q, I and C ran `testFast` once each. Q's `testFast` failed one case of `ArrayStoreJUTest` that timed out under load, and Q ran that class alone once more (`ant testOnly -DtestPattern=ArrayStoreJUTest`, 8 run, 0 failures): a re-run on one code state, to show the failure's cause (row 1069). No skeptic ran a whole suite. The gate ran each suite once.
- **The count and the distance stages:** S, D, V and C ran each once on their final code; C also ran the count stage on the base build and once under a profiler, which `fortress-repo`'s `compiler.md`, "The checker's time", gives; C's skeptic ran the count stage on the base build and on the worker's head, the one planned exception (`references/batch.md`, "The roles"). So the base build's count ran twice, once for each role, as in climb batch 31b. The gate ran each stage once.
- **The measure** ran twice, rung V and rung I, each on its own code, neither on a state another stage ran.
- **The specification was built once,** at the gather; the commit stage copied the gather's PDF and built nothing. **The 52 demos ran once,** at the gather. **The microGPT quick pair ran once,** at the commit stage.

### 7. Two events

**The coordinating session's commits on `main` during the rung stage. None fell between the gather's start and the batch's push.**
- After the launch (17:42:25) and before the gather, the coordinating session and its workers committed and pushed five commits: the boot note `b4c62cfc17` (17:43:12); `cgkinds.py`'s count of each declaration once, `21af73cf48` (17:51:53); the revival page script's fix, `7db7ce37f6` (17:53:12); the record writer's points of climb batch 31b, `1e9b2cf9c4` (18:00:48: FACTS, POSITIONS, PLAN and the review queue); and the boot note `1a321ad849` (18:02:10). Each is pushed: the commit stage's push went `1a321ad849..d3747846c1`.
- The gather's first record is at 21:22:47 and its first commit, S's `c7ba100d14`, at 21:28:10; its preconditions held, `git status --porcelain` empty and the base an ancestor of `HEAD`, then `1a321ad849` (`compile-ladder/climb-batch-33/RECORD.md:7`). From then to `d3747846c1` (22:36:00), `git log --first-parent 1609258002..d3747846c1` holds only the batch's ten commits. The commit stage pushed the three refs at about 22:36:22 (its call of that time: '1a321ad849..d3747846c1  main -> main', and the same for the two other refs). The coordinating session's next commit is `5b79091a2c` at 22:41:29. The run's journal holds one launch, 17 starts and 17 results.
- So the rule of `references/batch.md`, "While it runs", held, by 3 h 20 min. The workers the session ran during the gather and the gate wrote only in scratch and in their own worktrees, seeded from the base build: the arrays page ran walk programs in `/home/user/fortress-arrays-primer` from 21:49 to 22:00, beside the gather's runs.
- What the commits did:
  - The rungs' worktrees were seeded at the base, before `21af73cf48`, so rung I's measure used the old counter: its 17 printed is 16 (section 3). Rung V's 15 is not affected.
  - `1e9b2cf9c4` changed FACTS, POSITIONS and PLAN beside the rungs' branches; the gather's FACTS and PLAN folds applied cleanly onto it.
  - The commit stage's check of the footers and `historical:` lines read "all 15 commits since 1609258002b0", the coordinator's five among them, where the script as it ran asks for the batch's own commits from the gather's head (`explorations/coordinator/climb-batch-workflow.js:1601` at `1609258002`). Each passed, so nothing follows. No path under `.claude/` changed in the range, and the run gave no `skill-touched` item: the script as it ran made an item only of the batch's own range (`:1631`, `:2126` there). The coordinator's `8109b61c63` (23:04:45, after the landing) keeps the gather's head in a file for that check.

**No agent received text from outside its brief.**
- His go came at 17:13:07 UTC. During the run he wrote at 17:46:42 ("Should I compact you now?"), then twelve messages from 21:26:54 to 22:19:05 on the runs, the switch-over, the arrays and the transactions' cost, each answered by the coordinating session.
- The first record of each of the 17 transcripts is the harness's '[Workflow harness — computed task]' message, the brief. Each agent but the disk check received one more text message as the user: the skill's text after its own load of the skill.
- Beside them the harness attached its standing material (the environment, the project's instructions, the list of skills, the date, the attribution reminder, the connectors' instructions), the shared task list, and two notices to rung S that a file of its own worktree changed (`WellKnownNames.java`, `ProjectProperties.java`). The task list held only the gather's own to-dos, tasks 33 to 37, and reached the gather, the gate, the review and the commit stage (`taskrem.py`). No file was attached that no brief asks for.
- No transcript holds his words of 17:13, 17:46 or 21:26 to 22:19 (searched by fourteen phrases of them, as "projected closeness", "Should I compact", "native arrays", "companion page", "Now in bg", "slop"), or the markers '<agent-message', 'Another Claude session', 'sent a message while you were working', 'user request]' or 'relays, verbatim'. The curator's name stands in seven transcripts only where a brief names the heading "Pavol's answers" of `PLAN.md`, or a file of the record names him.

## Part 1. Conformance

No departure from a decision of the curator's landed. One finding would change a decision of his if he takes another way than the default that landed; it holds nothing.

### A finding that would change a decision of the curator's

**Finding 1. Fork D1 and row 1064: the team's two untyped binder forms in a `typecase` arm. The default refused one and kept the other; the record's section for him named neither as a form of the team's.**
- What is so:
  - The team's disambiguator read an arm that is a bare name naming no type as a binder over every value: `x =>` became `x: Any =>` (`TypeDisambiguator.java:246-250` at the base). It read a tuple of such names as a pattern of binders: `(x, y) =>` (`TypeDisambiguator.java:249-256` on `main`, `typeToPatternBinding`, which the rung left as it was). The team's tests use one form each, `compiler_tests/Compiled7.PatternMatching.b.fss:30` (`x => println x`) and `Compiled7.PatternMatching.a.fss:30` (`(x, y) => println x`), both run by `AfterTypeChecking.test:16`.
  - Row 959's hazard is the bare form: since the merge, `Int =>` is a binder and takes every value.
  - Rung D refused the bare form, so `x =>` is now 'x is undefined.', and the team's test b was respelled `x: Any =>`. It kept the tuple form, so `(x, y) =>` binds, and `(Int, ZZ32) =>` takes every first element with no message (row 1064, CONTESTED; `tests/TypecaseTupleArmUndefinedNameBindsWalk.fss`). D.worker.1 and D.skeptic.1 put the tuple form to him.
  - The record's section for him showed `Int =>` only ("After: it is refused: 'Int is undefined.'"). It did not say that the team's bare binder ends.
  - The sources split. The chapter's grammar reads every arm as types, `TypecaseTypes ::= ( TypeList ) | Type` (`Specification/basic/expressions/typecase.tex:69-71`), and "it is a static error for a reference to a name to occur where it is not in scope" (`basic/declarations.tex:571-572`): both untyped forms are errors. The team's code and its checker accept both, and the chapter's note says "This section should be revised according to the changes in the pattern matching proposal" (`typecase.tex:15`). The one library writes neither untyped form; it writes typed names inside a clause, `(a': List[\T\], b': List[\T\]) =>` (`Library/List.fss:94`), which rung V now compiles. The peer languages that bind an untyped name in a pattern, as Scala's `case x =>`, tell it from a constant by a rule of the name's form; Fortress has no such rule.
- What it changes: P-26, "The team's later decision wins over its earlier one, in a text or in code, where the team made it the language's rule ... Code counts as a decision where the team built it alike for all its types, or stated its rule in a commit message, a comment or the checker." The team's checker accepts both forms. The landed default refuses one of them on the specification's rule and keeps the other on the team's code: two readings of one question.
- Options:
  - **1a. As landed.** The bare binder is refused; a binder over every value is written `x: Any =>`. The tuple of names binds, row 1064 stays CONTESTED, and the hazard of row 959 stands inside a tuple. Costs nothing.
  - **1b. One rule, the specification's: refuse an undefined name in a tuple of names too.** `(x, y) =>` is written `(x: Any, y: Any) =>`, and the team's test a is respelled as test b was. The hazard goes everywhere in an arm, and row 1064 closes. A small rung in the disambiguator (`typecaseTupleNames`, `:61`, `:246-248`) with one team line respelled; rung D, the whole rung with its skeptic, wrote 0.71M.
  - **1c. One rule, the team's code: restore the bare binder.** `x =>` binds again, and both untyped forms stay. Row 959 reopens: an arm at `Int` takes every value, unless a rule of the revival's own refuses the five removed names, which no source of the team's states.
- How they weigh: 1a keeps what landed but holds two rules for one question. 1b follows the grammar, the scope rule and the library's way of writing a binder with its type, and ends two forms of the team's that no library line uses. 1c follows the team's code and its tests, and brings back a silent wrong answer for a program that names a removed type, or needs a special rule.
- Recommended: 1b. The library and the grammar point the same way, and a binder keeps its form with a type, `x: Any`. If he takes 1b, V.worker.1's question goes with it: the specification states the typed names inside a clause, which the library writes, in an Appendix I entry.

### Findings for the record, with no decision of his changed

- **Rung Q's class-file read keeps no cache, and falls back to the old load for a class that the loader generates** (section 2, Q2). By reading; no test holds a generic object that lists a self-typed trait first. For the speed phase and for row 1052's notes.
- **Rung I's choice among incomparable conjuncts changes no answer by the exclusion rule** (section 2, V.worker.2). By reading; review-routed.1's test is owed.
- **Rung S's property has no user in the tree, and it breaks the run's pairing** (section 2, S1).
- **Rung C's worker took its P-148 pair at load 10.10** beside rung S's suites; the skeptic's pair settled it (section 1, C).
- **Six sentences of the plan or its check were not what landed:**
  - fork S1's "the compile, the run and the harness's run step follow it", false for the property;
  - fork Q1's "the declared type", built as the conditional's own type, with a cast where none is needed;
  - rung Q's members, which named `forLetFn`, not edited, and not `localFunctionClosure`, edited;
  - fork I1's "the most specific where several do", silent where none is;
  - row 822's cause, named the kind environment; it came through a tuple pattern's unbound names (row 1066);
  - the estimate's figures for the skeptics and the fixed roles, taken from a run on another tier (section 5).
- **Q's skeptic wrote that "the commit stage's microGPT quick checks run the compiled path"** (`compile-ladder/rung-self-arm-closure/SKEPTIC.md`, item 4). They run under walk (`gate/summary.txt`, '# microgpt-walk'). The sentence weighed the class-file read's unmeasured cost against a check that does not reach it.
- **The skeptics' fixes were right and small:** one defect of a change (I's owner of a call with no arrow), five tests added or corrected, and fourteen records or homes corrected; no fix was contested.

### Corrections owed in the record

- **POSITIONS:** P-33 (`POSITIONS.md:30`), "one build serving both by a second set of the run time's value classes (F-353)". The landed selector serves both libraries from one build with one set (F-353, F-381). Already on his list, with the old and the new words after run 2 (`CLIMB-BATCH-33.md`, section 6, "For the record-landing workflow"). No other entry is made false.
- **FACTS, false or short, and not reworded by the gather or the review:**
  - F-34 (`FACTS.md:38`): true of `c3b16ef2d1`'s code, as the gather says; it lacks the after (section 3) and names rows 812, 822 and 540 as the walls of their kinds, each closed now.
  - F-385 (`FACTS.md:281`): true; it lacks that the read keeps no cache, and that a generic object's class, which the loader generates, has no class file, so row 1052's circle may stand there (section 2, Q2).
  - F-377 (`FACTS.md:276`): true; its open line "a worker chose it, and the curator has not decided it" now covers a conditional's arm too, item 571's home.
  - Every other entry that names a closed row was rewritten in the rungs' commits or in `f470e902b9` (`RECORD.md`, "FACTS entries"; the review's fixes): F-9, F-76, F-175, F-181, F-225, F-281, F-282, F-293, F-352, F-353, F-361, F-363, F-369, F-379, F-380, F-381, F-384, and 14 re-anchored.
- **PLAN:** Part 4.
- **The review queue:** item 572 (`review-queue.md:282`) is built by rung Q; items 519 (`:292`, row 959), 540 (`:260`, row 1029) and 587 (`:301`, row 1060) are answered by closed rows; item 584 (`:298`) says "with rows 540 and 818", and row 540 is closed.
- **The ledger:** rows 1062 to 1075 filed, 1066 closed, 559 rewritten; nothing further owed but the homes of Part 4.

## Part 2. Did the practice hold

### The practice's measures, batches 26 to 33

(B26; B27; B28; B29; B29b; B30; B32; B31 run 1; B31 run 2; B33 run 1.)
- Written: 2.55M; 5.17M; 6.65M; 7.54M; 3.25M; 2.92M; 5.00M; 5.08M; 3.93M; 5.57M.
- The tier: B31 run 1 ran on Fable, B31 run 2 and B33 run 1 on Opus; the earlier batches' reviews give theirs.
- Launches lost to restarts or the disk: 0; 8 and a gate, 0.42M; 0; 0; 0; 0; 2, 0.59M written by them; 2, 0.24M written by them; 0; 0.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M; 1.62M; 0.97M; 0.71M; 0.85M; 1.31M; 0.93M.
- First calls: 0.62M, 6 cold; 1.29M, 10 cold; 0.98M, 8 cold; 1.12M, 10 cold; 0.63M, 8 cold; 0.65M, 7 cold; 0.93M, 7 cold; 1.22M, 12 cold; 0.65M, 7 cold; 0.80M, 7 cold.
- Cache refills: 1, 94K; 0; 1, 204K; 0; 0; 0; 0; 1, 159K; 0; 0.
- Refusal cycles: 0; 3 rungs, 231K; 1 rung, 164K; 2 rungs, 314K; 0; 0; 0; 0; 0; 0.
- Rulings and repairs on the merged tree: 0; 368K; 0; 415K; 0; 0; 0; 660K, and a second gate of 114K; 0; 0.
- Skeptic fix commits (defects): 2 (0); 9 (1); 16 (1); 25 (10); 7 (2); 8 (2); 18 (5); 10 (1); 10 (2); 20 (1).
- Distance: 0 every time.
- Count stage at the gate: 180 s; 80 s; 99 s; 125 s; 104 s; about 70 s; about 95 s; about 75 s; about 85 s; 78 s, each by the log's file times.
- Distance stage at the gate: 246 s; 144 s; 205 s; 224 s; 190 s; 128 s; 165 s; 136 s and 143 s; 150 s; 137 s, the last four beside `testFast`.
- Skill's load: 13.9 %; 16.0 %; 16.5 %; 12.9 %; 10.6 %; 16.0 %; about 18 %; about 20 %; about 14 %; about 18 %, the last four by a rougher count.
- Briefing, estimated: 5.2 %; 6.2 %; 3.1 %; about 3.6 %; 2.7 %; 4.9 %; 5.0 %; 5.0 %; 3.0 %; 2.6 %.
- microGPT quick pair: 7 of 7 both, each time.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **The estimate took the skeptics' and the fixed roles' figures from a run on another tier,** which climb batch 31b's review proposed to stop (its process finding 6), and so came out 21 % low (section 5). Proposed (mine): an estimate takes each role's figure from the last run on the same tier, now this one on Opus: rung 0.33M to 0.43M for rungs of this size, skeptic 0.30M to 0.39M, gather 0.51M, review 0.46M, gate 0.14M, commit 0.13M, disk 0.07M; run 2's estimate, 4.5M, is read again so before its launch: it already takes the fixed roles at 1.25M, but its W at 0.5M with its skeptic is below every rung of this run (0.67M to 0.76M).
2. **The batch's measure had no owner that ran, a third time** (section 3; climb batch 31b's process finding 3, run 1's process finding 4). The record names "the coordinator or the post-batch reviewer", and the reviewer's brief says it reads only. Proposed (mine), as before: the measure is a step of the coordinator's routing right after each landing, in a scratch worktree seeded from a build of the landed head, written in the boot note; or a step of the commit stage, which already runs the microGPT check.
3. **A tool fix on `main` after the base does not reach the rungs' worktrees,** so rung I measured with a counter that `main` had already fixed (event 1). Proposed (mine): a rung that runs a probe script runs `main`'s copy of it by its absolute path in the main tree, or the coordinator lands tool fixes before the base is cut.
4. **A rung's timing is taken beside another rung's work,** since the script runs two agents at a time: C's worker's pair was 92 s at load 0.26 against 119 s at load 10.10 (section 1, C). P-148's smoke test held because the skeptic took its own pair. Proposed (mine): the skeptic's pair is the P-148 timing of record, as it ran this time, and the worker's pair is only its first look; or a rung's timing waits for a minute of low load (`/proc/loadavg`).
5. **A reserved point that a rung reached is still not on his list** (C's "a program that compiled and is now refused", section 2): climb batch 31b's process finding 4 recurred, since the run's script did not yet file them. The coordinator's `8109b61c63` (23:04:45, after the landing) makes the gather file each as `<rung>.reserved.<n>` in the batch's group of `PLAN.md`; run 2 is its first test. For run 1, the line of Part 4 is owed by hand.
6. **The record's section for him showed one form of the change and not the form that ends a team's feature** (finding 1). Proposed (mine): the check before the launch reads each fork that refuses programs against the team's tests that the rung's grep finds, and the section for him names each team form that ends.
7. **The record-landing's end at its journal's last write left a third of that landing's work in the next span** (section 5, span 2: 1.24M after its revival page stopped). Proposed (mine): a review's span of a record-landing ends at the last commit that the landing's own work made, by hand or by the workflow, and the boot note names it.
8. **Of climb batch 31b's findings:** 1 (the `.claude/` check's range) fixed in the script, and no false item came; 2 (a skill update under a running batch) did not arise, since no commit touched `.claude/` during the run; 3 (the measure's owner) is finding 2 here; 4 (reserved points to the list) is finding 5 here, built after the landing; 5 (the `historical:` line from the patch) held, each of the seven commits that touch the original tree names each team file it changes; 6 (the tier's figures) is finding 1 here; 7 (a "leave it" against a later step) and 8 (a ledger search by symptom) did not arise.

### Misses, by kind

Numbered on from `batch-31b-review.md`'s 1248.

Found before the launch or inside the batch:
- **The planner's text wrong, caught before the launch:** 1249, twelve places of the record changed by the check before the launch, among them rung V's form of row 822, item 521's sentence and the fixed roles' figure (`coordinator/climb-batch-33-review.md`, part A).
- **The planner's text wrong, caught before landing:**
  - 1250, row 822's cause, which came through a tuple pattern's unbound names (rung V; row 1066);
  - 1251, fork I1's words where no conjunct is most specific (rung V, V.worker.2);
  - 1252, fork S1's "the run follows it", false for the property (rung S, S.worker.1);
  - 1253, rung Q's members: `forLetFn` named, `localFunctionClosure` edited (rung Q).
- **A defect of a change, caught before landing:** 1254, I's owner of a call with no arrow, which let any conjunct with a member of the name qualify, so a getter beside a same-named method died with `NoSuchMethodError` (I's skeptic, `e9718fa115`).
- **A case of a change with no test, or a test that checked the wrong thing, caught:**
  - 1255, D's refusal after a clause's own name, `x: T =>` (D's skeptic, `74cae86062`);
  - 1256, C's `SLetFn` case and the top-level untyped binding (C's skeptic, `9a63964d4f`);
  - 1257, C's `x[5]k` and `x[1]x[2]` (C's skeptic, `a0477b7256`);
  - 1258, Q's expected failure that printed `REACHED` after its failing construction (Q's skeptic, `753c13926b`);
  - 1259, V's three tests with two comment lines and a citation that does not say what it is cited for (V's skeptic, `5dcae80838`).
- **A defect of the tree found and filed, not the batch's:** 1260 to 1273, rows 1062 and 1063 (rung S, its skeptic), 1064 and 1065 (rung D), 1067 and 1068 (V's skeptic), 1069 and 1070 (rung Q), 1071 (Q's skeptic), 1072 and row 559's fourth route (I's skeptic), 1073 (rung I), 1074 (rung C) and 1075 (C's skeptic); and notes on rows 69, 288, 868, 964 and 1020.
- **A report that said what was not so:**
  - 1274, S's evidence by a line that the rung added, files under `tmp/`, and two of fourteen scripts (S's skeptic);
  - 1275, D's precedent line, and the FACTS entries and two record texts that it made false (D's skeptic);
  - 1276, V's reading of `APPCOV`'s fall-through, its "app's form compiles and runs", and F-181 and F-281 not handed over (V's skeptic);
  - 1277, Q's "a conditional that needs no cast compiles to the same bytecode as before" (Q's skeptic);
  - 1278, I's moved lines, its getter rule, and an Appendix I sentence listed and not edited (I's skeptic);
  - 1279, C's export message changed and not reported (C's skeptic);
  - 1280, the gather's revival changes of D and C, which credited the team with lines the revival changed, and of S, without the run's variable-only path; F-9, F-293, F-363, F-381 and F-384 (the review).
- **Sentences made wrong, caught:** 1281, `changes.tex:3740-3747` (I's, its skeptic) and `:4445-4449` (Q's, the gather); 1282, the orientation key's case 36 (D's skeptic, the gather and the review) and 14 FACTS entries' moved lines (the review).
- **Process:** 1283, C's worker's timing pair taken under load (C's skeptic retook it).

Found by this review:
- 1284, finding 1: the bare binder ended, named to him only as `Int =>` (Part 1);
- 1285, the measure after run 1 not taken, and rung I's figure read with the old counter (section 3);
- 1286, ten new rows and C's reserved point with no home (Part 4);
- 1287, PLAN's and the queue's lines that the landing made stale beyond the record's list (Part 4);
- 1288, nine sentences of the skill beyond the record's list (Part 3);
- 1289, run 2's sections: R lacks rung V's analyzer and rung I's new caller at its member; G's "Q's landed member"; moved lines of N, G and R (Part 5);
- 1290, Q2's uncached read and its fallback at a generated class, untested (section 2);
- 1291, Q's skeptic's sentence on the microGPT check's path (Part 1);
- 1292, the estimate's figures from another tier, against climb batch 31b's process finding 6 (section 5);
- 1293, the commit stage's footer check over the base's range, not the batch's own (event 1).

**Against the earlier notes.** 35 misses were found before the launch or inside the batch (1249 to 1283), 14 of them defects of the tree that the batch did not make, against climb batch 31b's 27 for three rungs and run 1 of climb batch 31's 41 for six. No departure from a decision of his landed. One default landed that is consequential by the rule and was put to him without the form it ends (finding 1); it can be undone.

## Part 3. For the skill writer

The sentences of `fortress-repo` that the landing makes false, read on `main` at `5b79091a2c`; the batch changed no file under `.claude/`. The proposed wording is mine; the writer keeps the skill's form. The revival changes are in `compile-ladder/climb-batch-33/RECORD.md`, "Revival changes, for the skill writer": S's, D's, Q's and C's; V's and I's are "none".

**False, on the record's lists, checked:**
1. `references/revival-changes.md:97`: "As a `typecase` arm, each takes every value, without a message (row 959)." Each is refused, 'Int is undefined.' (F-382). With finding 1's answer, the sentence on a binder: "A binder over every value is written `x: Any =>`."
2. `references/revival-changes.md:41-47`: "A compiled body of `T` that returns `self` at `X` runs. Three shapes fail when the class loads: ... For the first two shapes, bind `self` to a variable of type `X` first ... For the third shape, declare the method in `T` without a body". The three run (rows 1050, 1051 and 1052 fixed; F-377, F-385). What stays: a `typecase` with `self` in one arm and another value in the other fails verification (row 1070); bind `self` at the target type in the arm. `StandardTotalOrder`'s `MIN` and `MAX` need no declaration of one's own now on that account.
3. `references/compiler.md:150`: "Where a generic type that the clause lists, as `List[\E\]`, gives the body of a member of the trait, the code generator crashes: 'E is not in the kind env' (ledger row 812)." It compiles (F-384).
4. `references/compiler.md:117`: "A later conversion of such a variable `x`, as `y: ZZ32 = x`, dies at run time ... (ledger row 1060). Declare the variable's type." It runs. What stays at an untyped binding: a `try` that ends in numerals is refused (row 1074), and a tuple binding of a `case` or a `try` of numeral tuples (row 1075).
5. `references/tests-writing.md:34`: "`x[5]^2` stops the compile, and under walk fails or gives the wrong element (ledger rows 1005 and 1)." It compiles; walk still fails (row 1); `(x[5])^2` serves both paths.
6. `references/compiler.md:32`: "The compiled path uses the compiler's own prelude". Unless `FORTRESS_LIBRARY=one` selects the one library (F-381).
7. `references/compiler.md:159`: "Every other command calls `useCompilerLibraries()`. Each call points `WellKnownNames` and `Types` to its prelude". Under the selection, `useCompilerLibraries()` points them at the one library (`Shell.java:377-388`).
8. `references/tests-running.md:14`: "`ant testFast` runs about 2,100 tests in four tracks at once". Five tracks, the fifth `one_library_tests/` under the selection, about 2,560 tests; the misc track leaves `OneLibraryJUTest` out.
9. `SKILL.md:80`: "Each path has its own library today." True by default; the compile command can now select the one library, and a program compiled so does not run yet (row 1062).
10. `references/build-and-caches.md:64-71` and `:105-112` ("The caches", "Building"): the selection's caches folder `default_repository/caches-one`, the build's stamp and `ant cleanCache` over both folders.
11. `references/tests-writing.md`, "Where a test goes, and how it passes" (`:37-69`), and `references/tests-running.md:115` and `:139-144` ("Compiled tests", "One unit-test class, or one track"): a test of a wall that only the one library shows goes in `ProjectFortress/one_library_tests/`, run by `ant testOneLibrary` and by `testFast`.

**False or short, on no list:**
- `SKILL.md:98`: "The caches are folders in `default_repository/caches/`, or in a private caches folder that a run names." Also `default_repository/caches-one/` under the selection.
- `references/tests-writing.md:45`: "A failure while the top-level variables are initialised counts as a refusal." A static error of the phases, as the disambiguator's, counts too (F-383; `FileTests.java:875-878`).
- `references/build-and-caches.md:91`: "check that `default_repository/caches/bytecode_cache/` holds five jars": under the selection the caches folder holds no library jar, and a run fails (row 1062).
- `references/compiler.md:74`: "The revival has changed it for sizes and for the lock on a class's first load (ledger row 417)." And the choice of a call's opcode from the owner's class file, without loading it (F-385; `MethodInstantiater.java:268-317`).
- `references/compiler.md`, the traps of the compiled path (`:103-135`), short of the run's new rows: a `typecase` with `self` in one arm (row 1070); a clause's name bound at a trait above its selector's object type, at a method call (row 1067); `self.d` at a listed type is refused (row 1071; bind `r: R = self` first); a method of a type parameter's bound on a binder met with a trait is refused (row 1072); a closure typed by an intersection dies where made (row 559); the numerals of rows 1074 and 1075.
- `references/compiler.md:128`: "A `typecase` tuple pattern with an untyped binder ... stops the code generator" (row 964): walk stops on the same clause too (the row's note of this run).

**Sentences that hold, met by the batch:** `SKILL.md:90-92` on the class loader as code that the revival changes (rung Q's class-file read is such a change); `references/compiler.md:120` on a numeral as a `typecase`'s selector (row 963), unchanged; `references/compiler.md:128`'s workaround for row 964, "Give each binder a type", which finding 1's option 1b makes the rule.

## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home.

**Items for him: each has a home.** The ten items (S.worker.1 and S.skeptic.1, S.skeptic.2, D.worker.1 and D.skeptic.1, V.worker.1 and V.skeptic.1, V.worker.2, Q.skeptic.1, review-routed.1) are seven lines of `PLAN.md:883-889`, "Climb batch 33, listed for his review"; a worker's and its skeptic's item on one question share a line. Q.skeptic.1's question is item 571's, and its line should say so (it does: `PLAN.md:888`).

**Open rows.**
- With a home: 1064 (`PLAN.md:885`), 1068 (`:886`), 1061 (run 2's rung R), 559 (its old homes, `PLAN.md:114` among them), and the rows only noted (69, 288, 868, 964, 1020).
- **Ten have no line of their own in `PLAN.md` or `review-queue.md`:** 1062, 1063, 1065, 1067, 1069, 1070, 1071, 1073, 1074 and 1075. Owed (the homes are mine):
  - row 1062, a program compiled under the selection does not run: the list for the batch after, item 1, whose first program that runs on the one library is its test (`XXXOneLibraryRunHalf`);
  - row 1063, a grammar api's `Id` binder crashes the checker under the selection: phase 4's line of the walls that only the switch shows (`PLAN.md:69`), beside row 288;
  - row 1065, walk's tuple of a name and a type: with rows 1064 and 1068, finding 1's line;
  - rows 1067 and 1070, `forTypecase`'s verification at a clause's name and at a `self` arm: the list for the batch after, item 5, beside rows 1054 to 1056, the next rung on the code generator's `typecase`;
  - row 1069, `ArrayStoreJUTest` under load: a parked line with the harness's rows, and the gate's watch, since the gate's `testFast` can meet it;
  - rows 1071, 1073, 1074 and 1075, the checker's: the list for the batch after, item 5, "the checker's other gaps", each with its test or reproducer.
- Row 1072's matches in `PLAN.md:718` and the queue are a line number of `sources.md`, not the row; it is in F-386 only. Owed: with rows 1071 and 1073, item 5.

**Record defaults.** The record gives its forks to the queue as new items after the landing (`CLIMB-BATCH-33.md`, section 6, "After the landing": "this record's 28 forks as new items").
- **Run 1's forks, B1 to B3, S1 to S6, D1, V1, Q1, Q2, C1 and I1, have no item yet.** Owed: one item, as 578 is for climb batch 31's run 1, each default as landed and its section-2 line here; D1 with finding 1, Q1 with item 571, S1 with `PLAN.md:883`.
- Item 572 (`review-queue.md:282`): built; item 521: answered by the probe; item 522: unchanged.

**The reserved point that rung C reached, owed as one line for him:** "Rung C of climb batch 33, told: two programs that compiled are now refused, `(word: String, part) = two()` for `two(): (ZZ32, ZZ32)`, which printed 8, and a block's numeral bound with no type and given to an `NN32`, which died when run; walk refuses both. Default: as landed."

**PLAN lines that the batch built or made stale.** The record lists five (`RECORD.md`, "Left for the coordinator and the skill writer"), each checked:
- item 99 under "Pavol's answers" (`PLAN.md:148`): rows 1051, 1050 and 1052, built by rung Q;
- in climb batch 31's group, gather.1 (`:849`, row 1051), the rows 1050 and 1052 line (`:850`) and review-routed.1 (`:851`, the owed test, now `compiler_tests/SelfTypeArmRun`): built by rung Q;
- in climb batch 31b's group, fork O4 (`:875`, row 959): built by rung D.

Stale too, on no list:
- "Next" (`PLAN.md:13`): climb batch 31b and its record-landing; now climb batch 33's run 1 landed and run 2 next;
- phase 4's batch lines (`:53-54`): climb batch 31's line puts rows 1051, 1050 and 1052 first, built; climb batch 33 has no line of its own yet;
- F-34's line (`:67`): the before only (section 3);
- the walls that only the switch shows (`:69`): the selector is on `main` (F-381);
- row 701's line (`:72`), "beside rows 812 and 867": row 812 is closed;
- row 959's line (`:300`): closed by rung D;
- climb batch 32's D items (`:819`), "the local tuple binding's unchecked name" (row 1029): closed by rung C;
- climb batch 31b's rows 1054 to 1056 (`:870`), "with rows 540 and 818": row 540 is closed;
- climb batch 31b's row 1060 (`:873`): closed by rung C.

**The review queue:** item 572 built; items 519, 540 and 587 answered by closed rows; item 584's "with rows 540 and 818" stale (Part 1).

**The manual and the script:** process findings 1 to 7. **The skill:** Part 3. **FACTS and POSITIONS:** Part 1, "Corrections owed in the record".

## Part 5. What the batch after holds

Run 2 of the record, climb batch 33b, rungs N, W, G and R, launches on run 1's landed tree (`CLIMB-BATCH-33.md`, section 4). For each section, what this landing changes, and each citation that is now wrong on `d3747846c1`, with the correction. Run 1 changed, of the files that run 2 names, only `CodeGen.java`; `NamingCzar.java`, `OverloadSet.java`, `STypesUtil.scala`, `TraitTable.scala`, `TypeAnalyzer.scala`, `FnNameInfo.java`, `runtimeValues/`, the prelude and the one library are unchanged (`git diff --stat c3b16ef2d1 d3747846c1` over them prints nothing).

**N, the prelude's seven number types as value objects.**
- Lines: `methodCall` (`:611`, its choice of the opcode at `:624`) is `:613`, the choice `:626`; `dumpMethodChaining` (`:1023`) is `:1025`; `forObjectDeclPrePass` (`:4822`) is `:4871`; `springBoardClass` (`:233`) and the private constructor (`:367`) are unchanged.
- The meeting with rung I, as section 4 says: `forMethodInvocation` (`:7235`) now replaces an intersection receiver type by the owning conjunct (`:7264-7270`) and casts the receiver with `castReceiver` (`:7346`, `:7372`; `:7580-7584`), to `NamingCzar.jvmTypeDesc(owner, thisApi(), false)`. Under fork N1 that descriptor names a payload object's type by its payload class, so N's cast to the object's class at the receiver follows I's cast; N reads both before it writes its own, and folds them where they meet.
- "a names table that follows S's selector": name it, `WellKnownNames.compiledPathUsesOneLibrary` (`WellKnownNames.java:149-150`), read once per JVM from `ProjectProperties.compiledPathUsesOneLibrary` (`ProjectProperties.java:290-291`).
- The reproducer and the rows are unchanged; the prelude is untouched.

**W, one class name for each function expression.**
- `gensymArrowClassName` (`NamingCzar.java:888-900`) is unchanged.
- "from `CodeGen.forFnExpr` and `forLetFn`": the callers are `forFnExpr` (`:3933`) and `localFunctionClosure` (`:4095`), which `forLetFn` calls (`:4025`); the section was so at the base too. Both are members that rung Q edited (`:3968`, `:4127`), after the class name is made. By reading, the reproducer `LexSame` meets the same 'duplicate entry'; no stage ran it on the landed tree.

**G, a varargs parameter.**
- Lines: `forFnDecl` (`:3315`) is `:3356`; "`forLetFn`'s refusal (`:3957`, Q's landed member)" is `:4000`, in `forLetFn`, which rung Q did not edit: Q's member there is `localFunctionClosure` (`:4069`, its cast `:4127`); `evaluateSubExprsAppropriately` (`:5675`) is `:5724`; `evalArg` (`:7540`) is `:7674`. `NamingCzar`'s lines are unchanged.
- "Not: `forMethodInvocation`, I's and N's" holds; it is at `:7235`.
- The measure that G runs on its final tree starts from the landed tree's figure, which nobody took (section 3). Section 2's "1 or 2 after run 2" assumes `app` and `__bigOperator2` compile; if either meets a wall, 3 or 4.

**R, a method of an imported api's trait found by its api.**
- `methodsNamed` (`:7028`) is `:7077`.
- **Rung V's change at the call where R's root is, which the check before the launch asked R's section to name (`climb-batch-33-review.md`, B2), is not named.** Owed in R's mission: "Rung V of run 1 now reads a type's inherited methods with an analyzer that holds the type's static parameters and `where` clause, `typeAnalyzer.extendJ(tci_sps, ...)`, passed to `STypesUtil.properlyInheritedMethodsNotIdenticallyCovered` from `CodeGen`'s constructor (`CodeGen.java:499-502`), and so to `removeIdenticallyCoveredMethods`'s `analyzer.lteq(tt2, tt)` (`STypesUtil.scala:1587`), the call where rows 812 and 1061 stopped; and it compiles a generic body with a `CodeGen` whose analyzer holds the declaration's own (`:2754`), which `methodsNamed` reads as `typeAnalyzer` (`:7081`)."
- **Rung I's new caller of R's member is not named.** `intersectionMethodOwner` (`:7523-7564`) calls `methodsNamed` on each conjunct and matches the declaring trait by `sameTraitName` (`:7574-7578`), which takes a name without an api as equal to the same text in any api. R's repair, which gives the entries their api, changes what that comparison sees. Owed in R's "Overlaps by file": I's two members, with a test of a call on an intersection one of whose conjuncts is an imported api's trait.

**The record's other sections for run 2.**
- "The gate, and what it should show": for run 2 the comparands are run 1's gate, in `compile-ladder/climb-batch-33/gate/`: 64 suites, 3,565 tests, `CompilerJUTest` 1,736, `OneLibraryJUTest` 3, the system shards 876, 24 atomic programs in 72 runs, the count 0 and the distance 0 with `#crash none`.
- "Cost and time": run 2's 4.5M is read again by process finding 1. It takes the fixed roles at 1.25M, as this run's 1.30M; its W, 0.5M with its skeptic, is below every rung of this run, 0.67M to 0.76M, and its R, 0.7M, at their low end.

**The record's list, "For the batch after, in this order"** (`CLIMB-BATCH-33.md:500-509`), still holds, and gains:
1. The carriers, the prelude's names in the run time and `NN32`'s getters: row 1062's run test is the first program's test. The class-file read of Q2 first meets generated classes at that run.
2. `Generator2`'s third wall and what the measure shows: the measure after run 1 is owed first.
3. The run tests of varargs and row 315: unchanged.
4. The walls that only a running program shows: unchanged.
5. Row 996, rows 818, 1054 to 1056 and 1035, the checker's other gaps: rows 1067 and 1070 join the code generator's `typecase`, rows 1071, 1072, 1073, 1074 and 1075 the checker's gaps; row 540 has left it.
6. The matrix and `DOT`, then microGPT's own needs: unchanged.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I did not take the batch's measure after run 1; this review reads only. The figures are the rungs' own, on their own code.
- I read the run's transcripts through scripts and the journal's results. For climb batch 31b's record-landing and the preparation, I read only the transcripts' labels, times, models, first messages and writes. I read the coordinating session's transcript for its own writes by time, and for the turns of the go, the launch and his messages during the run.
- A workflow's journal holds no times. The run's times are the agents' first and last records, the commits' times and the files' times.
- These are by reading, not run:
  - that the two conjuncts of `app`'s arms name one class at run time (section 2, V.worker.2);
  - that Q2's read is uncached and that a generated class falls back to the old load (section 2, Q2);
  - that walk keeps its caches in `caches-one` under the variable (section 1, S);
  - the measure's 12 to 14 on the merged tree (section 3);
  - that W's reproducer still fails on the landed tree (Part 5).
- I did not check each rung's reported runs against its logs; the skeptics and the merged-diff review did, and I cite them. I read the six diffs of the source whole, and of the tests only the programs that the decisions name.
- I did not run `record.py check` or `ledger.py landing-check` again; the gather's, the review's and the commit stage's runs are cited.
- The skill's load is a rough count, not `skill-load.py`'s.

## The steps due before run 2

1. **The landing's own steps** (`references/batch.md`, "The landing"): the batch's to-dos swept from the shared task list (tasks 33 to 37 were there at 22:34), and each decision named in one line.
2. **The routing that no list holds yet** (Part 4): the lines for rows 1062, 1063, 1065, 1067, 1069, 1070, 1071, 1072, 1073, 1074 and 1075; one review-queue item for run 1's sixteen forks; item 572 built, items 519, 540 and 587 answered, item 584 reworded; rung C's reserved point as one line for him; PLAN's lines of Part 4.
3. **The record's corrections** (Part 1): F-34's after, F-385's two points, and P-33's words as the record gives them, with his sight of the old and the new.
4. **The measure on the landed tree:** `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`, once, in a scratch worktree seeded from a build of `d3747846c1`; the patch applies. Expected 12 to 14. F-34 and `PLAN.md:67` take both figures.
5. **Run 2's sections read again** (Part 5): R's mission and overlaps with rung V's analyzer and rung I's caller; G's line on `forLetFn`; the moved lines of N, G and R; N's names table by the selector's name; run 2's estimate by process finding 1.
6. **The record-landing workflow for run 1** (`tools/record-landing/README.md`, with `batch: '33'`, `base: '1609258002b016489c96bd6e438389e89773b9eb'`, `landing: 'd3747846c1'`), with Part 3's list for the skill writer. Run 2 then launches after its skill step, as the manual's routing gives it (`climb-batch-workflow.md`, "After the landing: the coordinator's routing", step 5): its rungs W, G and R write tests in S's track, which the skill does not yet name. His go covers both runs and says nothing of the skill step.
7. **His word on finding 1,** fork D1 and row 1064, which holds nothing: it landed at its default, and either other way is a small rung.
8. **The script, between the runs:** process finding 3 (a tool fix after the base); finding 1 for run 2's estimate. Finding 5 is in `8109b61c63`.

## For the curator

Run 1 of climb batch 33 ran from 17:42 UTC to 22:36 UTC on 17 November. In your time that is 18:42 to 23:36. It is pushed. All six tasks landed. No line of the model program changed. You gave the go at about 17:13 UTC. Every decision took the planner's default, and this section is your review of them.

The words that this section uses:
- **Walk** is the interpreter. The **compiled path** checks a program with the **checker** and then writes JVM bytecode with the **code generator**. The **class loader** makes and loads the classes when the compiled program runs.
- The **prelude** is the small library that the compiled path uses by default. The **one library** is the library of the interpreter.
- The **selector** is the setting `FORTRESS_LIBRARY=one`. With it, the compile command reads the one library.
- A **row** is one known defect in the ledger. An **expected-failure test** is a test that is known to fail and is marked so.
- The **gate** is the full check before a run lands.
- A **task** is one change of the run. The record names it a rung. A **worker** is an agent that does one task. A **skeptic** is a second agent that examines the work of the worker.
- A **fork** is a design question with more than one way. A **default** is the way that the record chose before the run.
- An **arm** is one clause of a `typecase`. A **binder** is a name that an arm gives to the value that it takes.
- An **intersection** is a type of two types at once. A value of it is a value of each.
- The **measure** counts the declarations of the one library that the code generator refuses.

**What each task changed.** Each program is shortened from the tests that landed.

- **S. The compile command can read the one library.** The commands and the build changed.

      q: QQ = 1/2
      println(q)

  - Before: `fortress compile` stopped: 'QQ is undefined.' The prelude has no `QQ`.
  - Now, with `FORTRESS_LIBRARY=one`: the program compiles. A new group of tests runs this way inside the gate.
  - The program does not run yet. The one library has no compiled classes: 'NoClassDefFoundError'. That is a later batch's work.
  - Without the selector, every command does what it did before.

- **D. A `typecase` arm at a name that means nothing is refused, on both paths.** The phase that binds names changed.

      typecase v of
        Int => "an Int"
        else => "other"
      end

  - Before: for `v = 2.5`, both paths gave "an Int", with no message. No type has the name `Int` since your merge of the number types.
  - Now: both paths refuse the program: 'Int is undefined.'
  - Also now: an arm `x => ...`, where `x` names no type, is refused. Before, it took every value and named it `x`. The team wrote this form, and one of its tests used it. That test now writes `x: Any => ...`. This is finding 1, below.

- **V. Two generic forms compile.** The code generator changed.

      trait AnyC comprises { C[\E\] } where [\E\]
        name(): String
      end
      trait C[\E\] extends AnyC
        name(): String = "C"
      end

  - Before: the compile stopped: 'E is not in the kind env'.
  - Now: it compiles, and a call of `name()` gives "C".
  - Also now: in a generic function, an arm with names, as `(a': Bx[\T\], b': Bx[\T\]) => ...`, gives each name its part of the value. Before, the names had no value, and the program failed.

- **Q. `self` in an arm or a closure runs compiled.** The code generator and the class loader changed.

      trait Tord[\T extends Tord[\T\]\]
        lt(self, other: T): Boolean
        mx(self, other: T): T = if lt(other, self) then self else other end
      end

  - Before: the program compiled. When it ran, the JVM refused the class: 'VerifyError: Bad return type'. The one library's `MIN` and `MAX` have this form.
  - Now: it runs. A closure that returns `self` runs. A body of the trait that calls a method on another value of type `T` runs too. Before, the class loader stopped: 'ClassCircularityError'.
  - Still fails, compiled: a `typecase` with `self` in one arm and another value in the other. It is a new row.

- **I. A method call on a value of two types at once compiles.** The code generator changed.

      choose(s: S): LeftResult = LeftOnly
      choose(t: T): RightResult = RightOnly
      println(choose(m).left())

  - The checker gives `choose(m)` both result types at once, as your decision P-60 says.
  - Before: the compile crashed: 'ClassCastException: IntersectionType cannot be cast to NamedType'.
  - Now: it runs and prints "left". The call goes to the type that declares `left`, and the value's own method runs.

- **C. Four small gaps of the checker are repaired.** The checker changed.

      x = do
          k: ZZ32 = 3
          4
      end
      y: ZZ32 = x

  - Before: the program compiled, and it failed when it ran: 'NoClassDefFoundError'.
  - Now: it gives 4. The number takes its default type, `ZZ32`, as your decision P-173 says.
  - Also now: `x[5]^2` compiles. `tally: ZZ32 := 0` matches the interface file's `var tally: ZZ32`. In `(total: ZZ64, part) = two()`, the checker checks the type of `total`.
  - One program that compiled is now refused: `(word: String, part) = two()`, where `two()` gives two `ZZ32` values. It printed 8 before. Walk refuses it too.

All tests passed at the gate, on the first run: 3,565 tests, and no failure. The two measures of the checker on the one library stay at 0. The quick microGPT check passed 7 of 7 for both programs.

**The decisions that took the planner's default.** Each one can be undone.

- **The selector is the variable `FORTRESS_LIBRARY=one` or the Java property `fortress.library=one`, read once (fork S1).** The other way was an option on each command. The property does not reach the scripts that start a run, so a run after a compile with the property fails. The simpler way is the variable alone.
- **The selected library keeps its files in a folder of its own, `caches-one` (fork S2).** The other way was a folder named by hand at each run, as the probe did.
- **No mark in a compiled program says which library it used (fork S3).** A run with the wrong library fails when it loads. The other way was a mark that the run reads.
- **The new tests run inside the gate (fork S4).** The other way was a group of tests outside the gate. Two old test targets of the team now report one failure each. No gate runs them. One line each fixes them.
- **No second set of run-time classes (fork S5).** The numbers need none. The other way was the probe's copy of those classes under other names, which cannot serve the one library's objects. The words of your decision P-33 still name a second set. You see the old and the new words after run 2.
- **The order of the compiled output is not made stable yet (fork S6).** No test of this run needs it.
- **An arm at an undefined name is refused on both paths (fork D1).** The other way refused it in the checker only, and walk kept the wrong answer. This is finding 1.
- **The code generator knows the type parameters in scope (fork V1).** The record names no other way: the checker already knows them. The task also gave an arm's names their values, beyond the fork's words.
- **An arm and a closure that give `self` are converted to the expected type (fork Q1).** The other way converted after the arms join. The task converts at the type of the conditional. So one instruction is added where the JVM needs none. It cannot fail. Your item 571 asks the same question for another place.
- **The class loader reads a class's file to choose a call's instruction, and does not load the class (fork Q2).** The old way loaded the class, which failed in a circle. The read keeps no copy of its answer. Its cost is not measured.
- **Each of the checker's four gaps is repaired where its test shows the cause (fork C1).** The checker's five other gaps without a test are not touched.
- **A call on a value of two types goes to the type that declares the method, the most specific one, else the first (fork I1).** The other way was to type such a call by one result type, which narrows your decision P-60. Where two types are two forms of one generic type, as in the one library's `app`, they are one class when the program runs, so the choice changes no answer. No test shows it yet.
- **Two runs, what the batch takes, and item 572 first (forks B1, B2, B3).** These order the work.

**Finding 1, for your word. It holds nothing.**
- The team wrote two forms of an arm whose names have no type:

      typecase 3 of
        x => println x
      end
      typecase (3, 4) of
        (x, y) => println x
      end

  - The team's code and two of its tests use these forms. Each name takes every value.
  - The specification reads each arm as a type. Its rule makes a name with no declaration an error. The one library uses neither form. It writes each name with a type, as `(a': List[\T\], b': List[\T\]) =>`.
- Task D refused the first form and kept the second. The record showed you only `Int =>`. So now:
  - `x => ...` is refused. You write `x: Any => ...`.
  - `(x, y) => ...` still works. But `(Int, ZZ32) => ...` takes every first value, with no message. That is the old defect, in a tuple (row 1064).
- Your options:
  - Option a: keep it as it landed. Two rules for one question.
  - Option b: refuse an undefined name in a tuple too. You write `(x: Any, y: Any) =>`. One team test changes. One small task.
  - Option c: bring back the first form. Then an arm at `Int` takes every value again, unless a new rule of ours refuses the old type names.
- I recommend option b. The specification and the one library point the same way, and a name keeps its form with a type.

**Other items on your list.** None holds a batch.
- Should the specification state names inside an arm, as the one library writes them? It goes with finding 1.
- A test of walk asks walk to give each name in an arm its part of the value, also where one part has only a type. Walk does that already where every part has a name. So the test stands.
- No test yet calls a method on a name in an arm whose type is two types at once, as the one library's `app` does. The next batch owes one.

**The measure.** Before run 1: 17. No agent measured it after run 1. The tasks' own measures show that the landed tree should give 12 to 14. It is a step before run 2.

**Two events.**
- **The coordinator's workers committed while the tasks ran.** Five commits came before the run started to merge, from 17:43 to 18:02 UTC (18:43 to 19:02 in your time). Nothing else was committed while the run merged its tasks.
- **No chat message of yours reached an agent.** Your messages during the run, at 17:46 UTC and from 21:26 to 22:19 UTC (18:46, and 22:26 to 23:19 in your time), stayed with the coordinator.
