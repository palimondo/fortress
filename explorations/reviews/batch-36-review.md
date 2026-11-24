<!-- The combined post-batch review of climb batch 36, run 1 of `coordinator/CLIMB-BATCH-36.md`: the checker's choice among a call's declarations by their signatures as declared, in an order that no hash decides, walk's generic dotted methods that differ only in their bounds, a tuple result between two generic declarations and a numeral type written as a return, a variable's or a field's type, a numeral coercion's four numbers converting where they stand on both paths, and three walls of a compiled program against the one library (four rungs, K, G, N and C, landed at `61b50cd34a` on 2026-11-24 on the curator's go of 00:2x UTC, every fork at the planner's default, fork K1 also review-queue item 621; run `wf_5ccaf405-8a5`, one ruling and one repair on the merged-diff review, a green first gate whose step 7 ran the interpreter's suite on the compiled path for the first time), by a review worker reading only: the landed changes against the decisions on record, what the two paths still do differently, the forks and the run's items for the curator, rung K against the curator's words of 2026-11-23 on a stable rule or a static failure, the expected-failure rule, P-180's balance and step 7's first run, the misses, the cost in three spans and by role against the estimate, re-measuring, three events, the skill writer's list, the record's sentences made false, the routing, the list for the batch after, and a section for the curator that shows each rung on a small program. -->
<!-- Base `b5a758846dd8695c25d13a5885088454fb02dae3`; base build `/home/user/fortress-wsuite` at `4b0e3abd6a`; launched 01:57:19.7 UTC (the coordinator's Workflow call); landed on `main` as N `2a969fed6e`, G `df5948e7b8`, K `da5f707779`, C `3a0bae976c`, the closes `b4e9e929b0`, the gather's record `b99b95517d`, the review's corrections `8dff5e053f`, the judge's ruling `747b5d406b`, the repair `6a0f7ffc62` and the gate's tables `61b50cd34a` (06:51:23), pushed by the commit stage in one atomic push at 06:51:40 (origin's reflog) with no hold; 15 agent transcripts, 15 starts and 15 results in the journal. Read against `main` at `791a6d0192`, whose two commits after `61b50cd34a` are the coordinator's boot notes. Sources for the decisions: P-45 with its history, P-174 with its history of 2026-11-23, P-60, P-146, P-37, P-180, P-12, P-103; F-26, F-174, F-225, F-232, F-366, F-405 to F-409; review-queue head and items 616 and 621; `PLAN.md:811-822`; the curator's words of the evening of 2026-11-23 as the brief quotes them. The gate's results are cited as its agent returned them and as `tmp/gate-batch-36/` holds them, and were not run again. The measures are `batch-measures.py`'s on the run's directory, `spend.py` over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch36/rev36/ (copied from climb batch 35b's review: tx.py, calls_mod.py, brief2.py, runs3.py, usertext.py, taskrem.py, skill.py, coordw.py; new: ef36.py, echoes.py, spans36.py). Tokens are writes only (input plus cache creation, one count per message id). Besides reading, this review ran only those scripts, facts-extract.sh, ledger.py show, `pdftotext` on the 1.0 release's PDF, `uptime`, grep, sed, git and the journal reads, which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. -->

# Climb batch 36, run 1: four of four rungs, fourteen rows closed and eight opened; a green first gate, the count and the distance 0, step 7 278 of 278 with 6 joining; a run of 5.35M, 4 % under its estimate; the checker's ties now follow no hash, but a tie among one unit's own declarations still takes the first written; one plain test pins as valid a set that the text refuses

## What came up in this run

### 1. The landed changes against the decisions, rung by rung and path by path

Lines are `main`'s at `61b50cd34a`. Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`. The gather applied the rungs as N, G, K, C, not the manifest's K, G, N, C: its order rule met a cycle (G before K, K before N, N before G) and it broke the manifest's pair K and N (`compile-ladder/climb-batch-36/RECORD.md`, "The rungs applied, in order"). One conflict, in the gate's compiled list `explorations/compile-ladder/gate/suite-compiled.tsv`, resolved by hand and measured (`RECORD.md`, "Conflicts"). The merged-diff review found the rungs' members disjoint (its result, point 1).

**K, the checker's choice among a call's declarations (rows 1100, 935, 1112, 1127, 543 closed, with 1046 by fork K7 and the skeptic's 879 and 1047; rows 499, 528, 770, 1094 rewritten; row 1136 opened; F-408 added; F-225, F-377, F-76 rewritten). Forks K1, K2, K4, K5, K6, K8 as the plan says; K3 narrower than its words; K7 wider.**
- The signature (fork K1): `FunctionalMethod.parameters()` gives `self` its plain trait type wherever its declared type is a `TraitSelfType` that lists types, a `comprises` clause's trait and the prelude's `comprises T` among them (`compiler/index/FunctionalMethod.java:152-168`); the bodies keep the meet. The specification says so, in the revision form (`Specification/basic/expressions/var-ref.tex:64-84`). P-146 holds this rule for the self-typed traits; K1 takes it to the `comprises` traits, which is why the Fable review judged K1 consequential and it waits as review-queue item 621.
- The order (fork K4): each attempt's candidates are sorted by their declarations' places, file, line, column, before the partial order (`scala_src/typechecker/impls/Functionals.scala:956-961`, `place`, `candidatesOf`). No hashed set orders them now.
- The tie (forks K2, K3, K5): `decided` takes the candidate that the declared signatures order above every other, `CoercionOracle.moreSpecificDeclared` on `declaredOf`, `self` at its trait (`Functionals.scala:978-990`, `:1180-1184`); P-60's coverage tie keeps the intersection type within the text's boundary, `tieType` with `mayRun` (`:997-1015`); one declaration met twice counts once (`:1170-1174`). Then `head` (`:1197-1219`): the error 'Ambiguous call ...' for any other tie, except, at `:1212-1213`, where the tie lies among arrows that no declaration gives, among duplicates, or among declarations all of the unit being checked: there the first by place is kept, with no error. That last exception is not in fork K3's words ("A tie that the rules leave is a static error ... except P-60's coverage tie"); the worker added it so that the overloading check's own refusals, which gated tests pin, stay the ones reported (`rung-checker-most-specific/REPORT.md`, "Decisions", 3). Section 3 weighs it.
- The gate repair's special case: `traitOfSelf` and `takesSelfAtTrait` are gone (`8f5f1912ab` on the branch).
- The cast (fork K6): `castToTypeBelow` maps a declared object `TraitSelfType` to its named type (`compiler/codegen/CodeGen.java:8271-8276`), inside the method that F-377 made.
- Decisions: P-45 and the text's "more specific" (`Specification/basic/overloading.tex:353-372`, a dotted method's receiver among the parameter types, a generic declaration on its declared domain): held. P-60: held; its last sentence is false since K (Part 1). P-37: the prelude's text unchanged by K. P-148: the count stage timed 65.7 s on the base and 68.6 s on the change by the worker, 75.2 s and 65.7 s by the skeptic: same order.
- The library: the one library's `QQ` and `Ratio` declarations of `denominator` and `numerator` no longer tie; its census found 24 ties, all decided (REPORT.md, "The ties").

**G, three of walk's departures (rows 1125, 1122, 1124 closed; rows 1133, 1134, 1135 opened by the skeptic; row 780 rewritten; F-405, F-26, F-253, F-257, F-341 rewritten). Forks G2 and G3 as the plan says; G1 wider than its words.**
- Row 1125 (fork G1): `genericKey` writes each static parameter's kind and bounds, the parameters renamed by position and names without their apis (`interpreter/evaluator/values/Constructor.java:906-963`, `BoundWriter` from `:933`). Beyond the section's members, walk now judges two generic dotted methods' symbolic instances at load on their declared domains where one lies inside the other (`values/OverloadedFunction.java:1126`, `methodPairValid`; `:789-801`). Its three consequences that the section did not foresee: a valid Meet Rule set refused at load (row 1133); two bounds of one simple name from two apis read as one key (row 1134); a nested pair of a generic trait's generic functional methods now refused at the extending object's first instance (row 780, section 3).
- Row 1122 (fork G2): `returnRuleAtEveryInstance` reads a tuple result element by element through `belowAtEveryInstance` (`OverloadedFunction.java:1364`, `:1392`), as `belowAtObjectArguments` does at object arguments.
- Row 1124 (fork G3): `checkNumeralTypesWritten` refuses a numeral type in a return type, a variable's type and an object's value parameters (`interpreter/evaluator/BuildEnvironments.java:1212-1272`, `forFnHeader`, `forLValue`, `forObjectDecl`), with the `extends` clause's message. P-174 ("written only as a coercion's or an operator's parameter type"): held for these forms; a bound and a `typecase` arm still load (row 1135).
- Decisions: P-45's "Walk and the checker must accept the same pairs" is not held in one case that G's own test asserts as valid: Part 1, finding 2.
- Walk's suite 900 of 900 on the worker's final code; no line of the library or a test newly refused at load; the 52 demos reach their end on the merged tree (`RECORD.md`, "The tests on the merged tree").

**N, a numeral coercion's four numbers convert where they stand (no row closed; rows 1131 and 1132 opened; F-407 added; F-341, F-342, F-345, F-347 rewritten). Forks N1 and N2 as the plan says, N1 narrower on the compiled path, N2 wider in the prelude.**
- Walk: each number is bound as a `Site` that converts where it stands, a `ZZ` by default (`interpreter/evaluator/values/Numerals.java:104-128`, `number`; `:531`, `convert`).
- The checker: a number is converted where a place fixes a bounded number type (`scala_src/typechecker/CoercionOracle.scala`, `buildCoercion` and `NumeralConversion`; `staticenv/KindEnv.scala:72-75`); at a call, a number is read as a `ZZ` first, and converted only where no declaration takes a `ZZ` (`impls/Functionals.scala:884-899`, `typedApplication`, outside K's member). The skeptic's fix `fed896a1a7` converts a number in a join's result positions (`numeralResult`, `joinInto`).
- The code generator: the fold and the coercion's method read the converted numbers (`compiler/codegen/NumeralCoercionFold.java:229-238`; `compiler/runtimeValues/FZZ.java:42-73`; `CodeGen.java:7136`, `forVarRef`).
- The library's way: the one library's six coercions carry no getter, as P-174's example `Byte(v)` writes them: `= v` at `ZZ32`, `ZZ64`, `NN64` (`Library/FortressLibrary.fss:847`, `:954`, `:1065`), `numeralRR64(v, r, 0)` and `numeralRR64(v, r, m)` (`:388-389`), `v / r^m` (`:635`); `FortressBuiltin.fss:67-68`, `:263` alike.
- Decisions: P-174, its history of 2026-11-23 ("This is all compile time computation. No method invocations."): held for the library's and the tests' coercions. Its sentence "a number used as a value there converts where it stands, as a numeral does (P-173)" is not held on the compiled path at a call (row 1132) and across components (row 1131). P-37's exception for the numerals covers the prelude's coercions: N rewrote eight, at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:578`, `:663`, `:754`, `:819`, `:894-895`, `:956-957`, where the section named two.
- The suites: `ant testSystem`, `ant testQuick`, `ant testOneLibrary` with no failure on the worker's code; `ant testQuick` again on the skeptic's fix. The count 0 and the distance the same, both by the worker.

**C, three walls of a compiled program against the one library (rows 994, 1091, 1099 closed; rows 1137 and 1138 opened; F-409 added; F-396 rewritten). Forks C1, C2, C3 as the plan says.**
- Row 994 (fork C1): the four places ask `NamingCzar.javaPackageClassForApi` (`compiler/OverloadSet.java:962`, `:1421`, `:1784`, `:1788`), the switch rehearsal's repair.
- Rows 1091 and 1099 (fork C2): `CodeGenClassWriter` holds the methods written between `startBridges` and `endBridges` until the class ends, and writes each only where the class has no method of its name and descriptor (`compiler/codegen/CodeGenClassWriter.java:40-113`); the bridge blocks are marked at `CodeGen.java:1162-1165`, `:1236-1243`, `:5337-5343`, `:6114-6122`. The specification's own rule: a type's own declaration replaces an inherited one at the same parameter types (`Specification/basic/traits.tex`, "Method Declarations").
- Row 1098's program stays an expected failure (`XXXOneLibraryRunVarargs`), and a reduction over a zip of lists stops at row 1137 (`XXXOneLibraryRunConditionalReduction`).
- The onelibrary track 50 of 50 on the worker's and on the skeptic's code. The skeptic's `TraitBridgesWrittenOnce` shows that the prelude's own classes held a method twice on the base too.

**What the two paths still do differently after this run.** Each is a row, but for the two that Part 1, findings 2 and 3, name.
- Two generic dotted methods that differ only in their bounds: walk answers 3, as the text; compiled, 'duplicate entry' (row 537).
- Two generic declarations with tuple results, one inside the other: walk loads and runs them; compiled, 'duplicate entry' (row 537).
- An object that inherits `tb[\U extends Number\](y: U)` from one trait and `tb[\U extends ZZ32\](y: U)` from another, unrelated: walk runs it and answers 3 and 2; the checker refuses it, 'Invalid overloading of tb in object Both' (step 7's candidate `tests/GenericMethodBoundsDifferWalk.fss`, both libraries). No row (Part 1, finding 2).
- A Meet Rule set of generic dotted methods: walk refuses it at load, the checker accepts it (row 1133). Bounds that name types of one simple name in two apis: walk reads one declaration, the checker two (row 1134).
- A nested pair of a generic trait's generic functional methods: walk stops at the extending object's first instance; compiled, the code generator's 'ClassCastException' (rows 780 and 724).
- Two generic functional methods excluding at a plain parameter: walk never chooses the second (row 1123); compiled, row 724.
- A numeral type as a static parameter's bound or a `typecase` arm's type: walk loads it, the checker refuses it (row 1135).
- A numeral coercion's number at a call: walk runs `tag(x: ZZ32)`, the compiled path `tag(x: Number)` (row 1132). Another component's coercion whose number does not fit its place: walk refuses when the place runs; compiled, `IntegerOverflow` at class initialization, or a silent infinity at `RR64` and `RR32` (row 1131).
- A tie among one unit's own declarations that the overloading check accepts: compiled, the first by place, the same call through an api 'Ambiguous call' (row 1136); walk chooses at run time.
- A failing `assert` with a message, compiled against the one library: 'java.lang.AbstractMethodError ... does not define or inherit an implementation of the resolved method ... map' in `BIG ||` from `assert` (`Library/FortressLibrary.fss:318`); walk prints its `FAIL` line (step 7's candidate `tests/NumeralCoercionNumberAtCallWalk.fss`, `tmp/gate-batch-36/suite-compiled/one/raw/tests/NumeralCoercionNumberAtCallWalk.fss.run`). No row (Part 1, finding 3).
- A closure over `self` in an object's generic method called through a trait (row 1137); a narrowing bridge's target renamed by a parent's parameter (row 1138): compiled only.
- `c = 0` for `c: RR32` under the prelude: refused, 'Ambiguous coercion' (row 528, fork K8); walk answers. An api whose trait and object both declare a functional method: the export check refuses (row 770). A narrower dotted return in an object of a `comprises` trait: the checker refuses (row 1094).
- Climb batch 35b's list stands for rows 1126, 744, 1118, 1121 (run 2's rung B), 1119.
- Now the same, where the base differed: a numeral type as a return, a variable's, a field's or an object parameter's type, refused on both; a call on `self` in a `comprises` trait, its return type and an object's narrower return type (rows 1100, 1112, 1127, 879); a direct call on two generic declarations (rows 935, 1047), in every JVM; row 543's typing; row 1046's crash; `Byte(v)` on both paths; `=` and `<` of two strings, a varargs call and a reduction over a range against the one library.

### 2. The decisions that landed at a default

The record's section 3 gives run 1's forks X1, X2, K1 to K8, G1 to G3, N1, N2 and C1 to C3. The run's result holds thirteen ids for the curator: twelve in nine entries of `PLAN.md:814-822`, and G.reserved.1, named only in `RECORD.md`, "The reserved point filed". "Consequential" is the `coordinator` skill's rule (`SKILL.md`, "The curator's role and decisions"). Since 2026-11-24 the review queue holds only questions: a default that is not consequential lands and is named in one line at the landing. Each line ends with its route. Forks X1 and X2 change no program.

**The forks that change what a program does or accepts.**
- **K1, `self` at its plain trait type in a `comprises` trait's signatures:** as the plan says; consequential (item 621); can be undone. It makes rows 1112, 1127 and 879 compile, and, with K2, refuses `c = 0` at the prelude's `RR32` (K8).
- **K2, the declared signatures decide:** as the plan says; not consequential: the text's "more specific" and P-45. Lands.
- **K3, a tie that the rules leave is a static error:** narrower than its words. Landed with three exceptions, each keeping the first by place: arrows that no declaration gives, duplicates, and a tie among the unit's own declarations. The third departs from fork K3 and from the curator's words of 2026-11-23 for a set that the overloading check accepts (section 3). Not consequential to repair: the fork's words and his settle it. A repair for the batch after.
- **K4, the order by place:** as the plan says. Not consequential. Lands. The skeptic's note: the order between a library declaration and a program's own follows their paths' spelling, the same in every run of one layout.
- **K5, P-60's tie typed by the intersection within the text's boundary:** as the plan says. Not consequential; P-60's last sentence goes to the record-landing (review.1). Lands.
- **K6, the cast of `self`:** as the plan says. Lands.
- **K7, rows 1094 and 1046:** wider: row 1046 closed by the same edit, as the fork allows; row 1094 rewritten with its `comprises` form. Lands.
- **K8, `c = 0` at the prelude's `RR32` refused:** as the plan says; it follows K1 and goes with item 621; the prelude goes at the switch-over (P-37). Lands.
- **G1, bounds in the key:** wider than its words (section 1). Not consequential; its residue is rows 780, 1133, 1134 and finding 2. Lands.
- **G2 and G3:** as the plan says, G3 with an object's value parameters too. Not consequential. Land.
- **N1, the numbers convert where they stand:** as the plan says under walk; narrower on the compiled path at a call (row 1132) and across components (row 1131). Not consequential: P-174 settles the rule, P-180 the repair. Lands.
- **N2, the coercions without a getter:** wider in the prelude, eight coercions under P-37's exception for the numerals, and `FortressBuiltin`'s three. Lands.
- **C1, C2, C3:** as the plan says. Land.

**The items for him, one line each.**
- K.worker.1 and K.skeptic.1 (`PLAN.md:817`, row 1136): his words of 2026-11-23 and fork K3 settle it for a set that the overloading check accepts: the error, as through an api. The overloading check's refusals of the sets that it refuses can stay the ones reported, so no pinned message changes. A repair, not a question; off his list.
- K.worker.2 (`:818`, row 770): P-180 settles it; a row for a later batch. A default that informs.
- K.worker.3 (`:819`, row 1094): the same.
- K.skeptic.2 (`:820`, row 879): section 3.
- G.worker.1 and G.skeptic.1 (`:816`, row 1135): P-174 writes a numeral type only as a parameter's type, and the record's section 3 already reasoned for row 1124 that "P-12 does not keep walk's load check from refusing them"; with P-180, way (a). A repair, not a question; off his list.
- N.worker.1 and N.skeptic.1 (`:814`, row 1132): P-174 says that a number "converts where it stands, as a numeral does (P-173)", and P-46 says where a numeral goes at a call. A repair, not a question; off his list.
- N.skeptic.2 (`:815`, rows 1131 and 1132): P-180 answers it ("a defect is fixed, not only recorded"). Off his list.
- G.reserved.1 (not in `PLAN.md`): a revival test's pinned message changed, since walk refuses a variable of a numeral type at load before its numeral binds. Not consequential; the landing's one line.
- review.1 (`:821`): P-60's last sentence, for the record-landing, which the coordinator names to him with old and new words.
- judge-review.1 (`:822`, row 724's clause in Appendix I): the skill's rule settles it (`references/specification.md:22`); the first rung that edits the entry names it. Off his list.

Only K1 is consequential, and it is item 621. None of the others reverses or bends a decision of his, none touches microGPT's lines or speed, each can be undone, and where the record is silent nothing landed.

### 3. Rung K against the curator's words

His words of the evening of 2026-11-23, on the tie that turned climb batch 35's gate red: "there must be like a rule in Fortress that decides which implementation should be picked, and it must be stable. It cannot differ between runs, or it must be a static failure if it's impossible to decide."

**What landed meets them for every tie but one kind.** No choice of the checker follows a hash now (fork K4), the declared signatures decide where they can (K2), and a tie that the rules leave is 'Ambiguous call' (K3), except the kinds at `Functionals.scala:1212-1213`. One of those kinds is a tie among the unit's own declarations in a set that the overloading check accepts. The skeptic's program, cut down:

    trait A excludes B end
    trait B end
    f[\T extends A\](x: T): ZZ32 = 1
    f[\T extends B\](x: T): String = "b"
    g[\X extends { A, B }\](x: X): ZZ32 = do r = f(x); r end

The overloading check accepts `f`: the two bounds exclude. At `f(x)` neither declaration is more specific. The checker keeps the first written and types `r` as `ZZ32`, so `g` compiles. Swap the two `f` lines, and by reading of `head` the checker keeps the `String` declaration and refuses `g`: 'Function body has type String, but declared return type is ZZ32.' (the message that the skeptic's run on the base gave where the hash order put the `String` declaration first; `SKEPTIC.md`, 4.1). Declare the same `f` in an api and import it: 'Ambiguous call to function f: ... T->ZZ32; T->String.' (`compiler_tests/XXXGenericTieImportedAmbiguous.test`).

**Can a call now run a declaration chosen by the order in which the declarations are written? By reading, no.** A tie in a set that the overloading check accepts can arise only at an argument type that no value has: here `X` must be both an `A` and a `B`, which exclude, so `g` is never called with a value. P-60's coverage ties are chosen at run time by the value's type. What the order of writing decides is the call's static type, and so whether the unit compiles. That is stable, but it is not "a rule in Fortress that decides": the text's rule compares declared parameter types and nothing else (`overloading.tex:353-372`), and no rule makes the first written declaration win. So it is the case where "it must be a static failure", and the same call through an api already is one.

**What P-45 says of the order of writing.** "Walk chooses among overloads by the parameter types that each declaration declares, not by the order in which they are written." Its history gives the ground: answer 9 of 2026-09-26, "walk no longer choosing by the order of the declarations", his yes at 12:08:32Z. P-45 speaks of walk; his words of 2026-11-23 carry the same principle to the checker.

**So the exception for an accepted set is a repair, not his question** (Part 1, finding 1). The worker's reason for it holds for the sets that the overloading check refuses: there the program is refused anyway, and the check's message is the one that the team's `XXX7e.test` pins. The repair keeps that, and reports 'Ambiguous call' where the check accepts the set.

**Row 879 (K.skeptic.2).** The row was `CONTESTED`, "Open: plain trait (P-146) or intersection". The gather closed it with `--settled` naming fork K1. Fork K1 is itself the open question of item 621, and `ledger.py`'s own help says that `--settled` names "the curator's answer, a POSITIONS entry" (`explorations/coordinator/tools/ledger.py:91-93`). **So the row should stay unsettled until his answer.** Its fix landed and its test passes; only its status misstates the question. `ledger.py` does not turn a `FIXED` row back. The least change is a `ledger.py note` on row 879 that its question is item 621's and settles with his answer (Part 4).

### 4. The expected-failure rule, rung by rung

The form: `tests-writing.md`, "The order", step 2. Read by call from the transcripts (`ef36.py`, `echoes.py`; the call ids are the last six characters of each tool call's id).

**Every worker echoed its `Expected failure:` lines in the call that first ran its tests through the harness, before any edit of code, and every run failed as stated.**
- K: `uQsciv` (02:00:42), four lines and one 'Expected pass:' for row 1100's old reproducer, through `old-fortress.sh ... junit` on the base build: 'FAIL:  2 =/= 12; each direct call on a Box runs the declaration on Box, ...', 'Function body has type Q, but declared return type is R.', '... should be a subtype of the', 'Right-hand side has type RightResult, but declared type is LeftResult.', 'Tests run: 15,  Failures: 10'. The line said "n below 12 and varying". First edit 02:05:08, first build 02:07:23.
- N: `2Tte3z` (02:10:58), "NumeralCoercionBodyWalk red on the base, its first coercion stopping with 'Unification error: ... got arg 200:ZZ of type ZZ'; NumeralCoercionNumberRangeWalk red, its load refusal naming 'got arg 5:ZZ' ...", and 'Tests run: 2,  Failures: 2', as stated; `CN1StW` (02:11:13), the compiled pair, 'ZZ32->Byte is not applicable to an argument of type ZZ.', 'Tests run: 4,  Failures: 4', as stated. First edit 02:13:50 (`cPXpfD`). One gap, which the skeptic closed: at 03:05:27 the worker renamed two range tests' variables and did not run the renamed files on the base's code; the skeptic ran them on the old code with its line echoed (`91Xe5x`, 04:39:53; N's `SKEPTIC.md:9`).
- G: `6m3frC` (03:26:09), seven lines, 'Tests run: 7,  Failures: 7', each as stated ('FAIL: a ZZ32: 2 =/= a ZZ32: 3', 'fails the Return Type Rule', four 'Missing expected refusal at load', 'Type mismatch binding 3'). First edit 03:28:56. The three cases added to `GenericMethodBoundsDifferWalk` after the fix were seen failing on the old code with their own line (`REPORT.md:50-60`).
- C: `SAx3pn` (03:13:59), one line for six run cases, 'Tests run: 15,  Failures: 6', the 'NoClassDefFoundError', 'Duplicate method name "narrowToRange"', '"copy"' and '"-?0"' lines as stated. First edit 03:24:42.

**The skeptics.** Each `SKEPTIC.md` check of the worker's order matches the transcript (K `:20-24`, G `:12-18`, N "What I checked", C "What I checked"). Each skeptic with a test of its own echoed its line before the test's first run: K's (`dJd1rN` 04:20:39 to `Wa7pNb` 04:26:09; three first forms ran otherwise, the api test 'Saw wrong failure' and two that passed on the base, each named in `SKEPTIC.md`, 4.1 to 4.3, and echoed again before the rerun); N's (`Xnq6v5` 04:40:25, 'ZZ32->Clamped is not applicable to an argument of type ZZ.' and 'Tests run: 3,  Failures: 3' on the worker's head, as stated, and `94cfsE` 04:40:39 on the base); G's four new expected failures (`eBYfAK` 04:52:14, `SsthrY` 04:58:38), green as stated; C's (`C3bgjU` 05:22:15). No report claims a statement that its transcript does not hold.

**Each "Skeptic's trim:" commit.** One: C's `b61662765d`, the bridge marks name the class writer `cw` itself in place of a local alias, in `overrideBridges`, `forObjectDeclPrePass` and `forTraitDecl`. Its sameness rests on `cw` being one writer between each `startBridges` and `endBridges` (by reading, `CodeGen.java:1236-1243`, `:5337-5343`, `:6114-6122`); the skeptic ran `ant testOneLibrary` after it, 50 of 50, and the gate's 3,754 tests passed on it.

**Against climb batch 35b,** where three of three workers stated the line: the form holds in its fourth batch, and the skeptics' three corrected first forms show it doing its work.

### 5. P-180 in this batch, and step 7's first run

**The passages made needless.** The record's list for run 1 (`CLIMB-BATCH-36.md:819-826`) names eight, each on `main` as quoted, each made needless or false by the landing (Part 3 gives them at their lines): `references/compiler.md:178` (the tie), `:137` (row 528), `:49`, `:50`, `:52` (rows 1091, 1099, 994); `references/revival-changes.md:15` (row 1125), `:99` (`Byte(v.asZZ32)`); `references/interpreter.md:29` (row 1124).

**Each closed row, path by path.**
- 1125 and 1122: walk now answers as the text; the compiled path still stops on both forms (row 537).
- 1124: both paths now refuse the return, variable, field and object-parameter forms; the bound and the `typecase` arm load under walk (row 1135).
- 935, 1047: compiled, now the same in every JVM; walk never chose by a hash.
- 1100, 1112, 1127, 879: compiled now as walk.
- 543: the compiled typing now P-60's; walk has no static type to give.
- 1046: compiled now runs, as walk.
- 994, 1091, 1099: compiled against the one library now as walk; their programs stop next at row 1098 (varargs `println`) and row 1137 (a reduction over a zip of lists).

**The rows opened against the rows closed.** Fourteen closed, against the record's twelve: 1100, 935, 1112, 1127, 543, 1046 (K), 879 and 1047 (K's skeptic), 1125, 1122, 1124 (G), 994, 1091, 1099 (C); row 770, which K closes "if its test passes", stays open with the export check's refusal. Eight opened:
- six departures that the rungs' own designs leave: 1131 and 1132 (N), 1133 and 1134 (G1's key and load reading), 1135 (row 1124's other forms), 1136 (K3's exception);
- two older defects that C's probes found: 1137, 1138.
- Not filed, found by this review: the `Both` set and the one library's crash in `assert` (Part 1, findings 2 and 3).
- Row 780 is rewritten, not opened: its quiet wrong answer became a stop, earlier than any call (below).

So the balance is 14 closed against 8 opened, against climb batch 35b's 7 against 10. Of the 8, 6 are the batch's own departures, each with its expected failure.

**The items that the rung left as `XXX` tests or open rows, each with the batch that should build it.**
- N.worker.1 and N.skeptic.1, row 1132: the checker checks a numeral coercion's body at each numeral's instance, as P-176 instantiates it, so that a number at a call goes where a numeral goes. A checker rung of climb batch 37, in N's files.
- N.skeptic.2, row 1131: the same rung, which then reads another component's checked coercion; the worker built and removed a first form that hung on the order of the compiles (`REPORT.md`, D6). Climb batch 37, with row 1132.
- G.worker.1 and G.skeptic.1, row 1135: `checkNumeralTypesWritten` reads a static parameter's bound, a `typecase` arm, an `excludes`, `throws` or `where` clause and an ascription. A few lines of one walk method. Climb batch 37's walk rung, with the `Both` set, row 780 and rows 1133 and 1134; run 2 has no rung in that file and no room for a fifth.

**Row 780: a quiet wrong answer turned into an earlier stop.** On the base, an object `H[\ZZ32\]()` of `trait Holds[\S\]` with `which[\T extends Shape\](self, x: T)` beside `which[\U extends Round\](self, x: U)` was made, and `which(h, Circle)` answered "shape" where the text answers "round". Now walk stops at `H[\ZZ32\]()`, 'with generic type, at least one pair of parameters must have excluding types' (G's `SKEPTIC.md`, point 3). The pair is valid. By reading, a program that makes such an object and calls only `which(h, Square)`, or never calls `which`, printed its values on the base and now stops: the stop is in `Constructor.finishInitializing` (`Constructor.java:388`). No test or library line meets it: walk's suite 900 of 900, the demos 52 of 52. It is the kind of change that climb batch 35b's skeptic L fixed as a defect of a change (miss 1429); here the skeptic recorded it. By P-180 and climb batch 35b's process finding 7, it goes first among the walk rows of the next list.

**Step 7 at its first run** (`tmp/gate-batch-36/suite-compiled.txt`, 06:42:44; `compile-ladder/climb-batch-36/gate/suite-compiled/verdicts.tsv`).
- Listed 278 programs, 157 under the one library and 121 under the prelude: the base's 197, and 81 that rung C added after measuring them on its code, two of them N's too (the gather resolved those two lines and measured them under both libraries). Ran 278, passed 278: 'LISTED 278 PASS 278 FAIL 0 LEAVES 0 GONE 0'.
- Tried 14 candidates, the batch's new or changed programs of `tests/`, each under both libraries. Six joined, all under the one library: `NumeralCoercionBodyWalk`, `NumeralTypeFieldTypeWalk`, `NumeralTypeObjectParameterWalk`, `NumeralTypeVariableTypeWalk`, and the walk expected failures `XXXNumeralTypeBoundWalk` and `XXXNumeralTypeTypecaseWalk`, which the compile refuses as their `.test` names (row 1135's two-path difference, as the README provides). The list is 284 programs after the commit stage.
- The eight that did not join, read by nobody in the run: `GenericMethodBoundsDifferWalk` refused under both libraries, 'Invalid overloading of tb in object Both' (finding 2); `NumeralCoercionNumberAtCallWalk`, under the prelude row 1132's 'FAIL:  1 =/= 2', under the one library the `AbstractMethodError` of finding 3; `XXXGenericMethodBoundsMeetWalk`, 'duplicate entry' (row 537); `XXXGenericMethodBoundSameNameWalk`, 1 error (row 1134); `NumeralStaticDesignWalk`, 'NoClassDefFoundError: Reflect' under the one library, a walk-only import; `NumeralCoercionNumberRangeWalk` and `NumeralWhereRefusedWalk`, refused at compile, as P-174 asks, with another message than walk's that their `.test` names; `NumeralOwnTypeWalk`, 'Ambiguous coercion in call to operator RSHIFT' on a line that the batch did not change (whether a row holds it I did not establish).
- The step's minutes: its cache copies at 06:12:06, its run from 06:27:56 to 06:42:44, about 15 minutes for 278 programs and 28 tries, after `testSpecData` and before the count stage.

### 6. The gate, the count, the distance and microGPT

**The gate, green at its first run,** on `b99b95517d`'s code (06:11 to 06:44): 0 failures in 3,754 tests in 64 suites (climb batch 35b's 3,698). `CompilerJUTest` 1,810 to 1,847, `OneLibraryJUTest` 41 to 50, the system shards 897 to 907, `OtherCompilerJUTest` 263, `LibraryJUTest` 86, `SpecDataJUTest` 130. 24 atomic programs, 72 of 72 `PASS`. Step 7 above. The count 'COUNT SAME   0, declared none', `#crash none`, the shadow matching; no row of the count's table is new or risen. The distance 'DISTANCE SAME   0', every kind 0. `gate_compare` printed nothing. The review's commit `8dff5e053f` and the judge's `747b5d406b` landed while the gate ran and touched only `explorations/`; the repair `6a0f7ffc62` touched `Specification/appendices/changes.tex`, which no stage reads (`# repair-ungated` in `summary.txt`). microGPT's walk check at the commit stage: 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' for both programs (37 s and 31 s).

**The team's tests, and the files outside the sections.** No line of a test that the team wrote changed: every test file that the batch modified, renamed or deleted was added by the revival in 2026 (`git log --diff-filter=A` of each of the 33), and the team's `XXX7e.test` keeps its pinned message (K's `SKEPTIC.md`, section 5). The files that a rung changed outside what its section names, each listed by its rung (`RECORD.md`, "Points to report"):
- K: `Specification/appendices/changes.tex:4512-4581`, the new entry `revival-self-comprises`; `compiler_tests/NumeralEqualsRR32CompiledLink.test` deleted; tests beyond those named, `OverloadGenericObjectTwoParams`, `XXXComprisesDottedMethodNarrowedReturn`, and the skeptic's `GenericTieImportedAmbiguous` with its api, `GenericTieInUnitFirstByPlace`, `ComprisesOwnParameterNarrowedReturn`, `GenericBesidePlainInvalidSetCallType`.
- G: `OverloadedFunction.java` members beyond `returnRuleAtEveryInstance` (`validOnDeclaredDomains`, `methodPairValid`, `methodInstanceHolding`, `symbolicStatics`, `belowAtEveryInstance`); the skeptic's test api `ProjectFortress/test_library/BoundSameNameTrait.fsi` and `.fss`.
- N: `compiler/runtimeValues/FZZ.java`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:67-68`, `:263`; `scala_src/typechecker/STypeChecker.scala:182-189`; `impls/Decls.scala:80-86`; `impls/Functionals.scala:884-899` (`typedApplication`) and the skeptic's `numeralResult` and `joinInto`, in a file that "The rule the rungs keep" gave to K only; `CodeGen.java:7136` (`forVarRef`); `CompilerBuiltin.fss:754`, `:819`, `:894-895`, `:956-957`; `compiler_tests/NumeralStaticDesignCompiled.fss`; the gate's list `explorations/compile-ladder/gate/suite-compiled.tsv`.
- C: `compiler/codegen/CodeGenClassWriter.java`; `CodeGen.java` outside `:974-1240` at `forObjectDeclPrePass` and `forTraitDecl`; tests in `compiler_tests/` (`TraitBridgesWrittenOnce`, `XXXNarrowingBridgeTargetParameterName` with its link test, `XXXGenericMethodClosureSelfThroughTrait`); the comment lines only of `one_library_tests/XXXOneLibraryRunVarargs.test` and `XXXOneLibraryRunConditionalReduction.test`; the gate's list.
- The gather: the gate's list, by hand at the conflict. The judge's repair: `changes.tex:3140-3143` and `PLAN.md:822`.

**The comparisons.** Nothing hidden goes to the list.

**The stages' seconds.** The count stage about 66 s by the log's file times, the distance stage 117 s (`FortressLibrary` 75 s), against climb batch 35b's 69 s and 130 s on the same 2.30 GHz Xeon (the commit stage's summary; F-240).

**The gate's minutes.** 33 minutes (06:11:26 to 06:44:50), against climb batch 35b's 22. Step 7 took about 15 of them, where its README estimated about 4 more than the ladder's 235 s at 197 programs (`tools/suite-compiled/README.md`, "The gate's minutes"): this run listed 278 and tried 14 under both libraries.

### 7. The cost, by role, against the record, and in three spans

**The run wrote 5.35M over 15 transcripts, in 4 h 55 min** (01:57:19 to 06:52:25; `batch-measures.py` gives 5.35M). Every agent ran on Opus. The result's `totalTokens`, 5.67M, counts otherwise.

By role (writes, then share):
- Rung workers (4): 2.09M, 39.0 %. N 618K, K 591K, C 482K, G 396K.
- Skeptics (4): 1.66M, 31.1 %. K 461K, N 441K, G 383K, C 378K.
- Gather 494K, 9.2 %. Merged-diff review 427K, 8.0 %. Judge on the review 171K, 3.2 %. Repair 185K, 3.5 %. Gate 124K, 2.3 %. Commit 134K, 2.5 %. Disk 64K, 1.2 %.

**Against the record:** "Run 1: about 5.6 million tokens written, 6.4 million with the reserve. The range is 4.8 to 7.2 million. About 5 hours 30 minutes, 6 hours 15 minutes with the reserve." (`CLIMB-BATCH-36.md`, section 2, "Cost and time"). **5.35M: 4 % under the estimate, 16 % under it with the reserve, inside the range; 4 h 55 min to the commit stage's last record.** By role:
- **K: 1.05M against 1.4 (−25 %).**
- **N: 1.06M against 1.3 (−19 %).**
- **G: 0.78M against 0.8 (−3 %).**
- **C: 0.86M against 0.9 (−4 %).**
- **The four rungs: 3.75M against 4.4 (−15 %).**
- **The fixed roles: 1.24M against 1.15 (+8 %):** gather 494K, review 427K, gate 124K, commit 134K, disk 64K, against climb batch 35b's 425K, 393K, 139K, 117K and 64K.
- **The reserve: 0.36M of 0.8.** One ruling on the merged-diff review, 171K, and its repair, 185K; no second gate.
- **The minutes.** The rung stage 3 h 34 (01:57 to 05:31), two agents at a time, workers K 70, N 78, C 79, G 46 minutes, skeptics K 31, N 37, G 35, C 27; the gather 40; the review 19 beside the gate's 33; the judge 5; the repair 4, after the gate ended; the commit stage 3.

**Where the estimate and the run differ, by role.** K and N, priced as the most uncertain rungs, ran under their prices: neither met a cache refill, a refusal cycle or a second form, and K's two count runs and timings were the planned ones. The fixed roles ran over by the gather (its order cycle, the list's conflict measured under both libraries, eight rows numbered across the rungs' files) and the review (eleven record corrections). The reserve paid 0.36M and 19 minutes for one sentence of Appendix I that the gate does not read: the review refused, a judge ruled, a repair agent waited for the gate, ran one walk program and built the specification (process finding 3).

**The cost in three spans, each on its own folders,** as `spend.py` from a span's start less `spend.py` from its end. A transcript counts in the span where it last changed. The folders: the session's Agent-tool workers, the workflows `wf_0b1e2863-560` and `wf_63ab85b2-667`, the project's folder of headless runs, and `-home-user-fortress-landing-35b`; the run's own folder for span 3. No other folder holds a transcript that changed after 20:59:32 on 2026-11-23.
- **Span 1, climb batch 35b's landing work,** from its last commit `1caac80b3b` (20:59:32; `spend.py` from 1795467573, the end of that review's own span 3) to the revival-page step `ec113ac4d4` (22:59:25), after the record-landing workflow `wf_0b1e2863-560`, whose journal was last written at 22:58:10. `spend.py` printed 9.54M from 1795467573 and 4.76M from 1795474765: **4.78M over 35 transcripts, and the coordinating session's own 377K over 122 messages** (68K of it at 21:30:46, a boot after a compaction).
  - The record-landing workflow, 26 agents (ten on Sonnet), with its six headless writers: 4.02M over 32 (21:15 to 22:58). By part: the record 1.53M (sort 338K, check 259K, judge 205K, the land step, and four headless record writers 442K; 21:15 to 21:56); the orientation update 1.44M (admission, write, preserve, cold read, a quiz author, two readers and two graders, a fix, a re-read, a judge and a headless writer; 21:56 to 22:32); the skill step 0.30M (22:32 to 22:42); the page of `fortress-repo` changes 0.62M (22:42 to 22:57); the push and the revival page 0.13M. A container restart at 21:29 stopped the workflow; the coordinator resumed it at 21:29:21, and the first write agent and its two headless writers, 158K, ran again (the coordinating session's records at 21:29:12).
  - In the span, outside the workflow: climb batch 35b's post-batch review 506K (21:01 to 21:15); its commit agent 117K, whose transcript last changed at 21:00:25; a Sonnet scout of the curator's words on testing, 137K (22:35 to 22:44).
  - Against climb batch 35 run 1's landing span, 5.78M with its workflow 4.46M (`reviews/batch-35b-review.md`, section 7): 17 % less.
- **Span 2, the preparation,** from 22:59:25 to the launch, 01:57:19.7. `spend.py` printed 4.76M from 1795474765 and 0.75M from 1795485439: **4.01M over 15 transcripts, and the coordinating session's own 515K over 203 messages** (58K of it at 00:24:16, a boot after a compaction).
  - The batch's own preparation, 1.72M: the planner 1.05M (00:21 to 01:14), the Fable review 0.27M (on Fable; 01:15 to 01:25), the manifest 0.23M (01:44 to 01:54), the record's fixes with item 621 0.18M (01:44 to 01:53).
  - The count of the interpreter's suite on the compiled path, 0.19M (23:50 to 00:50).
  - P-103's change of the gate and the tools, 0.97M: the inventory of output comparisons 0.35M (23:00 to 23:16), a Sonnet scout of the ladder's origin 0.12M, the gate's step 7 with B1's tool files 0.50M (00:54 to 01:44).
  - The skill cut and its cold read, 0.25M: a headless writer 0.15M (01:45 to 01:57), the cold read 0.10M.
  - Beside the batch: the revival page's check and update 0.51M (23:12 to 23:54), the page of skill drafts 0.21M, PLAN's cut 0.09M, the `coordinator` skill's B1 writer 0.08M (headless, 00:11 to 00:14).
- **Span 3, the run,** 01:57:19.7 to 06:51:23, over the run's folder: `spend.py` printed 5.35M from 1795485439 and 0.13M from 1795503083. **5.22M over 14 transcripts.** The commit agent, 134K, last changed at 06:52:25 and counts after the span. In the same hours, outside the run's folder: the page of `fortress-repo` changes for the P-103 cut, version 38, 0.48M (01:58 to 02:09), and the coordinating session's own 26K over 28 messages.

So climb batch 35b's landing work cost 4.78M, this batch's preparation 4.01M with 0.52M of the coordinator's own, and the run 5.22M. The preparation now costs as much as the landing work: 1.72M of it was the batch's own, and 1.48M was P-103's change and the revival page, which a batch did not need.

**The briefing's use.**
- **9 of 9 briefed launches read their briefing, 100 %, each to its last part. None read it in its first turn.** The briefed launches are the four workers, the four skeptics and the repair on the merged tree (whose brief names the briefing of the rung that the ruling touches; it read G's). The disk check, the gather, the review, the judge, the gate and the commit stage have none by design.
- When, by call and seconds after the start: the repair at call 14, 35 s; rung N at 19, 41 s (three parts); rung K at 22, 52 s (two parts); skeptic C at 14, 55 s; skeptic K at 8, 58 s (two parts); skeptic G at 17, 63 s; skeptic N at 19, 64 s; rung G at 20, 76 s (two parts); rung C at 20, 90 s.
- Its results came to about 116K tokens, 2.2 % of writes (`brief2.py`).

**Other measures** (`batch-measures.py`, and by reading where it differs).
- First calls: 865K (16.2 %), 9 cold. Cache refills: 0. Refusal cycles: 0. Rulings and repairs on the merged tree: 1 and 1, 356K.
- Builds per worker: N 7, five with the library order; K 3, two with the library order (`batch-measures.py` prints 0: its pattern misses `nice -n 19 ant compileAll`); G 3; C 1 and its `ant testOneLibrary`'s own. Skeptic N 3, skeptic C 1 with a library order, the gather 1, the gate 1 (a no-op).
- The skill's load, by a rough count: about 0.82M, 15 %. `revival-changes.md` was read by 12 of the 15 launches, all but the disk check, the gate and the commit stage.
- Error results: 28.
- Per agent, in order of start (ids are the transcripts' `agent-<id>.jsonl`): disk `a2c4b163`, 64K, 0.1 min; rung K `a8de2680`, 591K, 70.5; rung N `a475fade`, 618K, 77.7; rung C `a9ca8198`, 482K, 78.9; rung G `a9e81e40`, 396K, 45.6; skeptic K `a38adee3`, 461K, 30.9; skeptic N `a5bb2152`, 441K, 36.7; skeptic G `a9ec60d7`, 383K, 34.9; skeptic C `ab10f83a`, 378K, 27.4; gather `ad270f3e`, 494K, 40.4; gate `a845e94d`, 124K, 33.4; review `a85ecf8f`, 427K, 19.0; judge `a48c0b93`, 171K, 5.1; repair `a5a7d367`, 185K, 4.4; commit `af4e2dcf`, 134K, 3.2.

### 8. Re-measuring: a build, a suite or a measurement on a code state that another stage ran

By each agent's commands (`runs3.py`):
- **The onelibrary track ran twice on one code state.** The gather ran `ant testOneLibrary` whole on the merged code (05:48, 3 min 18 s, 50 tests), and the gate's `testFast` ran the same track on the same code (from 06:12). The gather needed only the closing one-library tests, in one `junit.sh` call with `FORTRESS_LIBRARY=one ONE_JVM=1`, as it ran the compiled ones. The cost was minutes, few tokens.
- **G ran walk's suite twice,** on `d2ec1ec544` (03:36) and on `bc8330a285` (about 03:45), an edit of code between: allowed, one more than the section asked.
- **The count and the distance stages:** K and N once each on their final trees, with the timing on the base (P-148); the skeptics of K and N the count stage on the base and the head, the one exception the batch reference allows; the gate once each.
- **The specification was built twice,** by the gather on C's text and by the repair after its edit; the commit stage copied the repair's PDF.
- **The batch's own tests ran at the gather** on the merged code (walk 'OK (21 tests)', compiled 'OK (71 tests)', the 52 demos), then in the gate's tracks. **The microGPT quick pair ran once,** at the commit stage.

### 9. Three events

**No agent ran twice.** The journal holds one `launched` line, 15 `started` lines and 15 `result` lines, each label once. No process stop, container restart, VM restart or usage limit fell in the run: the machine's last start is 01:16:21 UTC (`uptime -s`), 41 minutes before the launch. In span 1, outside this run, a container restart at 21:29 made climb batch 35b's record-landing run one agent and two headless writers twice (section 7).

**No commit other than the batch's fell between the gather's start and the batch's push.** The gather's first record is at 05:31:00 and its first commit, N's `2a969fed6e`, at 05:37:32; its preconditions held, `git status --porcelain` empty and the base an ancestor of `HEAD`, then `0cb3d14e64`, the coordinator's boot note of 02:09:52 (`RECORD.md:7`). `main`'s reflog from then to the push holds only the batch's ten commits, with no amend. `origin/main` moved from `0cb3d14e64` to `61b50cd34a` by the commit stage's one atomic push at 06:51:40; the coordinator's next commit is the boot note `40ca0a19b5` at 06:54:34.

**No agent received text from outside its brief.**
- The curator sent the coordinating session no message during the run; its user records then were a subagent's hand-back at 02:09:44 (the page of `fortress-repo` changes, the coordinator's own worker), six check-in notices and the run's completion notice at 06:52:25. No marker '<agent-message', 'Another Claude session' or 'sent a message while you were working' stands in any of the run's 15 transcripts.
- The first record of each transcript is the harness's '[Workflow harness — computed task]' message, the brief. Each agent but the disk check received one more text message as the user: the skill's text after its own load of the skill (`usertext.py`).
- Beside them the harness attached its standing material. The shared task list's reminders reached every agent but the disk check, each empty (`taskrem.py`).

## Part 1. Conformance

No departure from a decision of the curator's landed, but for one case that a plain test pins as valid (finding 2): it acts against P-45's "Walk and the checker must accept the same pairs", and its repair carries P-45 out. **No finding of this review would change a decision of his.** The near ones, and why each is not one:
- Row 1136, K3's exception: his own words of 2026-11-23 and fork K3 settle it; it needs a repair, not his answer.
- Row 879 closed by a fork default: the status misstates an open question that item 621 already holds; it needs a note, not his answer.
- Item 621's ground: the record and the item date the team's sentence on `self` to 2012 by the repository's import commit; the sentence is older (finding 6). Both dates are after the 1.0 release, so the weighing by P-26 does not move.
- G.worker.1, N.worker.1, N.skeptic.1 and N.skeptic.2: P-174, P-46 and P-180 settle them.
- The `Both` set against P-45: P-45 decides it; a repair.

### Findings for the record, with no decision of his changed

1. **A tie among one unit's own declarations that the overloading check accepts still takes the first written** (section 3; row 1136). Owed: the repair, first in the batch after's list: `head`'s branch at `Functionals.scala:1212-1213` keeps the first only where the overloading check refuses the set or the declarations are duplicates, and signals 'Ambiguous call' elsewhere; `GenericTieInUnitFirstByPlace` becomes the error's test. K.worker.1 and K.skeptic.1 leave his list.
2. **A plain test pins as valid a set that the text refuses.** `tests/GenericMethodBoundsDifferWalk.fss:30-38` declares `tb[\U extends Number\](y: U)` in `trait Ta` and `tb[\U extends ZZ32\](y: U)` in `trait Tb`, and `object Both extends { Ta, Tb }`; it asserts `Both.tb(n)` is 3 and `Both.tb(m)` is 2, "a valid overloading" by its comment. The Meet Rule for dotted methods asks, of two dotted methods provided by `Both` neither of which is more specific, as `(Ta, U extends Number)` and `(Tb, U extends ZZ32)`, a declaration `R0.tb(...)` provided by `Both` with `R0` below `Ta ∩ Tb` (`Specification/advanced/overloading.tex:411-430`); there is none. The checker refuses it, 'Invalid overloading of tb in object Both', under both libraries (step 7). P-45: "Walk and the checker must accept the same pairs." Walk loaded the set on the base too, and dropped one of the two; G made walk run it and pinned the answer (`REPORT.md:50`, the case added after the fix; `bc8330a285`). Neither the skeptic, the review nor the judge read the case against the text. Owed: a row, the case moved out of the plain test into an expected failure that asserts the refusal at load, and walk's load check refusing such a set (the batch after's walk rung).
3. **A failing `assert` with a message dies compiled against the one library.** `NumeralCoercionNumberAtCallWalk`'s run under the one library: 'Caused by: java.lang.AbstractMethodError: Receiver class NativeArray$\=PrimImmutableArray... does not define or inherit an implementation of the resolved method ... map ...', from `BIG ||` in `assert` (`Library/FortressLibrary.fss:318`). The program's assertion fails there for row 1132's reason, and the failure's message then crashes. Loud, but every failing compiled `assert` with a message under the one library reports this crash in place of its `FAIL` line. No row names it (`grep` of the ledger for `AbstractMethodError`, `PrimImmutableArray` and `BIG ||`). Owed: a row, with run 2's rung Y, whose rows 1101 and 1102 are the one library's run-time names, or the batch after.
4. **Row 780 stops programs that ran** (section 5). Owed: first among the walk rows of the batch after; its row already says it.
5. **Row 879's status** (section 3). Owed: a `ledger.py note` that its question is item 621's; the gather's brief: `--settled` names his answer or a POSITIONS entry, never a fork's default.
6. **Item 621 and the batch record date the team's sentence to 2012.** The sentence on `self` in a `comprises` trait (`var-ref.tex:63-69`) came into this repository with `5a68404fdf`, David Chase's commit of 2012-07-19, which imports the whole tree ('Added odd random longs to MagicNumbers'; it adds `.antrc_Linux`, `BasicCoreFortress/` and more). The frozen copy holds the sentence (`Specification-1.0-frozen/basic/expressions/var-ref.tex:63-69`), and the skill cites that copy as "the Working Draft of February 2011" (`references/specification.md:6`); the 1.0 release of March 2008 does not hold it (`pdftotext Specification-1.0-frozen/fortress.1.0.pdf`: 'The type of self is the ...' only). Rung K's own revision note says "The Working Draft of February 2011". Owed: item 621's and `CLIMB-BATCH-36.md`'s "of 2012" corrected in the item's text, as a correction of its ground; the weighing by P-26 does not change.
7. **Items that the record settles reached his list** (section 2): K.worker.1, G.worker.1, N.worker.1, N.skeptic.1, N.skeptic.2, judge-review.1. Owed: off his list, each with the entry that settles it; under tonight's rule the group "Climb batch 36, listed for his review" holds only item 621's pointer.
8. **The plan's words were wider or narrower than what landed:** K3 (three exceptions), K7 (row 1046), G1 (the load reading and names without apis), G3 (object parameters), N1 (the compiled path at a call and across components), N2 (eight prelude coercions and `FortressBuiltin`'s three); and G's section gave the Appendix I clause of row 1124 but not of row 1123, which the judge's repair added.
9. **The skeptics' work was right:** one defect of the change fixed (N's join positions), two older defects that the change repairs recorded with tests (rows 879, 1047), five rows filed with expected failures, one trim, and the reports' times and citations corrected. Row 780's earlier stop they recorded, where climb batch 35b's skeptic L fixed the like.

### Corrections owed in the record

- **POSITIONS, false and on the record's list:** P-174's sentence on row 1124 and its last sentence (G's and N's `REPORT.md` give the words); P-60's last sentence, "Rows 543 and 551: the compiled checker gives no call an intersection type where any declaration of the family has static parameters" (review.1).
- **POSITIONS, false and on no list:** P-45's last sentence, "walk ... fails at a call on such a pair in a generic trait (rows 779 and 780)" (`POSITIONS.md:44`): since G, walk refuses row 780's valid pair at the extending object's first instance, before any call.
- **FACTS, false and not reworded by the gather or the review:**
  - F-366 (`FACTS.md:279`): "and `u = 0` at `RR32` overflows the stack (row 528)": since K, `u = 0` for `u: RR32` is refused under the prelude, 'Ambiguous coercion in call to operator =' (fork K8; row 528 rewritten); `u = u` still overflows.
  - F-174 (`FACTS.md:337`): "in a trait with static parameters it loads them, but a call to which both apply fails" (rows 779 and 780): since G, walk stops at the extending object's first instance.
  - F-232: "`DeclaredFunction`s ... still hash by identity" holds, made stronger; on the record's list.
  - F-139 (row 528): "`=` at the prelude's `RR32` overflows the stack" holds for two `RR32` values.
- **The ledger:** rows 1131 to 1138 filed; 499, 528, 770, 780, 1094 rewritten, 762 noted; 14 rows closed; `ledger.py landing-check` printed 'no finding' at the gather and the review. Row 879's note (finding 5). Two rows to file (findings 2 and 3).

## Part 2. Did the practice hold

### The practice's measures, the last five runs

(B34 run 1; B34 run 2; B35 run 1; B35 run 2; B36 run 1.) The figures before B36 run 1 are `reviews/batch-35b-review.md`'s, Part 2.
- Written: 5.12M; 2.10M; 5.69M; 3.94M; 5.35M.
- The tier: Opus each; B35 run 1's second judge on the merged tree on Fable.
- Launches lost to restarts or the disk: 2, 0.44M; 0; 0; 0; 0.
- Per landed rung: 1.02M; 2.10M; 1.14M; 1.31M; 1.34M.
- First calls: 0.86M, 8 cold; 0.52M, 7 cold; 1.18M, 13 cold; 0.63M, 7 cold; 0.87M, 9 cold.
- Cache refills: 0; 0; 0; 1, 398K; 0.
- Refusal cycles: 1 rung, 156K; 0; 1 rung, 175K; 0; 0.
- Rulings and repairs on the merged tree: 0; 0; 0.99M and a second gate; 0; 0.36M, no second gate.
- Skeptic fix commits (defects of the change): 13 (2), one a trim; 3 (0); 8 (1), one a trim; 12 (2), no trim; 15 (1), one a trim.
- Distance: 0 each time.
- Count stage at the gate: about 105 s; about 105 s; about 73 s; about 69 s; about 66 s, the last three on a 2.30 GHz machine.
- Distance stage at the gate: 200 s; 176 s; 127 s; 130 s; 117 s.
- Skill's load: about 20 %; about 16 %; about 19 %; about 15 %; about 15 %.
- Briefing, estimated: 2.6 %; 2.3 %; 2.9 %; 1.4 %; 2.2 %.
- The statement of the expected failure in the call that first runs a test: 0 of 5 workers; 1 of 1; 5 of 5; 3 of 3; 4 of 4.
- microGPT quick pair: 7 of 7 both, each time.
- Rows closed against rows opened: B35 run 1, 8 (9 fixed) against 8; B35 run 2, 7 against 10; this run 14 against 8.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **Step 7's candidates that fail are read by nobody.** The gate lists them in `verdicts.tsv`, and the result names only the joins. Two of this review's findings stood there: the `Both` refusal and the crash in `assert`. Proposed (mine): the merged-diff review reads each candidate's `FAIL` line and routes it as a known row, a new row or a two-path difference that a row already holds; the gate's result lists them.
2. **A case added after the fix pinned a departure as valid,** and no role read it against the text (Part 1, finding 2). Proposed (mine): a walk rung whose subject the compiled checker also judges runs `fortress typecheck` once on each new plain test, or reads its step-7 candidate line, and a skeptic reads each asserted case of a plain test against the text, not only against walk's answer.
3. **A one-sentence clause of Appendix I took a refusal, a ruling and a repair:** 356K and 19 minutes, the repair waiting for the gate to end. Proposed (mine): the merged-diff review may write a specification clause that its own finding names, in its corrections commit, where no stage reads the path, as it corrects the record.
4. **The gather's order rule met a cycle** (`RECORD.md`, "Left for the coordinator and the skill writer"). The gather broke the manifest's pair K and N, by a reason it gave. Proposed (mine): the manual's "Gather", "The order", says which constraint gives way in a cycle: the manifest's order of a pair ordered both ways.
5. **The onelibrary track ran twice on one code state** (section 8). Proposed (mine): the gather's brief runs the closing one-library tests in one `junit.sh` call, as it runs the compiled ones, and leaves the track to the gate.
6. **Items that the record settles still reach his list** (Part 1, finding 7), as climb batch 35b's finding 4. Proposed (mine): the gather files under "listed for his review" only an item that no entry settles, and names the entry for each other.
7. **`batch-measures.py` misses a build started as `nice -n 19 ant compileAll`** (section 7). Proposed (mine): its pattern allows a `nice` prefix.
8. **The preparation's span holds work that no batch needed** (section 7, span 2): P-103's change and the revival page, 1.48M. A measure, no proposal: span 2 is no estimate of a batch's preparation while other work shares it.
9. **Of climb batch 35b's process findings:** finding 1 held (no worker ran a comparison past the wait limit; no cache refill); finding 5, the planner's queue line, held (the record's "After the landing" names consequential forks only); finding 3, the seeding of `build-one`, I did not check: each rung's first build after an edit of the implementation empties its caches by the stamp in any case.

### Misses, by kind

Numbered on from `batch-35b-review.md`'s 1445.

Found before the launch or inside the batch:
- **The planner's text wrong, caught before the launch:** 1446, the Fable review's six corrections (`9bbd1bab2b`): fork K1's ground, fork K8's ground, the varying count of K's first test, G's tests of the variable's and the field's forms.
- **The planner's text narrower than what landed:** 1447, fork K3's three exceptions; 1448, fork N1 on the compiled path; 1449, fork G1's load reading and key; 1450, the files beyond the sections (N's `typedApplication`, `forVarRef`, `FZZ.java`, `FortressBuiltin.fss`; C's `CodeGenClassWriter.java`, `forObjectDeclPrePass`, `forTraitDecl`; G's members of `OverloadedFunction.java` and its test api).
- **A clause of the specification left out, caught:** 1451, row 1123 in Appendix I (the review; the judge's repair `6a0f7ffc62`).
- **A defect of a change, caught before landing:** 1452, a number in a join's result position refused on the compiled path (N's skeptic, `fed896a1a7`).
- **Older defects that the change repairs, recorded with tests:** 1453, rows 879 and 1047 (K's skeptic).
- **A defect of the tree found and filed, not the batch's:** 1454, rows 1137 (C) and 1138 (C's skeptic).
- **A remaining form or a departure of the rung's design, filed:** 1455, rows 1131, 1132 (N), 1133, 1134, 1135 (G's skeptic), 1136 (K's skeptic).
- **A quiet wrong answer turned into an earlier stop, recorded:** 1456, row 780 (G's skeptic).
- **A report that said what was not so:** 1457, K's skeptic's fork lines; K's and N's reports' first-build times; N's words for P-174 at `RR64`; row 1138's found-by cell; the review's `CLIMB-BATCH-36.md:112`.
- **Sentences of the record made false, caught:** 1458, F-334, F-175, F-406, F-390, F-403, F-34, F-352 and P-60's last sentence (the review).

Found by this review:
- 1459, the `Both` set pinned as valid against the text and P-45 (Part 1, finding 2);
- 1460, the crash of a failing `assert` under the one library, no row (finding 3);
- 1461, row 1136's exception settled by his words, filed as his question (finding 1);
- 1462, row 879 closed by a fork default (finding 5);
- 1463, P-45's, F-366's and F-174's sentences false, not reworded (Corrections owed);
- 1464, sentences of the skill false on no list (Part 3);
- 1465, item 621's date of the team's sentence (finding 6);
- 1466, the onelibrary track run twice on one code state (section 8);
- 1467, items on his list that the record settles (finding 7).

**Against the earlier notes.** 13 misses were found before the launch or inside the batch (1446 to 1458), against climb batch 35b's 16 for three rungs. No departure from a decision of his landed but the pinned `Both` case, and no finding goes to him as an ask.

## Part 3. For the skill writer

The sentences of `fortress-repo` that the landing makes false or needless, read on `main` at `791a6d0192`; the batch changed no file under `.claude/` (the commit stage's `git diff --name-only 0cb3d14e64 HEAD -- .claude/`). The proposed wording is mine; the writer keeps the skill's form. The revival changes are in `compile-ladder/climb-batch-36/RECORD.md`, "Revival changes, for the skill writer": N's, G's and K's, each with the merged-diff review's note; C's "none".

**Needless or false, on the record's list, checked at their lines:**
1. `references/compiler.md:178`: "A tie: where two generic candidates fit a call equally, the checker sorts the candidates and keeps the first. The sort's order varies with what the same JVM compiled before. ... If a compiled test passes alone and fails in the suite, look for such a tie first." Goes; no tie follows a JVM's history now.
2. `references/compiler.md:137`: "At `RR32`, `=` compiles and overflows the stack when it runs (ledger row 528)." Rewritten: `c = 0` is refused statically, 'Ambiguous coercion in call to operator ='; `=` of two `RR32` values still overflows.
3. `references/revival-changes.md:15`: "In a departure, where two generic dotted methods of one name and parameter count differ only in their static parameters' bounds, walk drops one at load. ... a call on a `ZZ32` runs the first (row 1125)." Goes.
4. `references/interpreter.md:29`: "A numeral type written as a return type, a variable's or a field's type loads. ... (ledger row 1124)." Goes, or narrows to the forms that still load: a static parameter's bound and a `typecase` arm (row 1135).
5. `references/revival-changes.md:99`: "The tree departs: walk, the checker and the code generator read each as a `ZZ`, so walk refuses `Byte(v)` (F-341, F-342, F-347). Under walk, write `Byte(v.asZZ32)`, as the one library does: the getter raises `IntegerOverflow` outside `ZZ32`'s range." Goes.
6. `references/compiler.md:49`, `:50`, `:52`: a varargs call (row 1091), a reduction over a range (row 1099), `=` and `<` of two strings and `=` of two booleans (row 994). Go; the list's lead-in and its last line stay for rows 1098, 1101, 1102.

**False, on no list:**
- `references/interpreter.md:68`: "At load, it does not check two functional methods of a generic trait or object on their declared domains. It compares them at each call ... So such a pair that breaks the rules loads, and a call can fail with "Cannot find definition for method" (ledger row 780)." Since G, row 780's valid pair of generic functional methods stops at the extending object's first instance. Rewritten to say so, or the example dropped.
- `references/revival-changes.md:17`: "For example, walk compares two functional methods of a generic trait or object at each call, not at load (row 780)." The same; the example needs another row or goes.

**Short, on no list** (the writer judges whether a line is needed):
- `references/revival-changes.md:36-43`: the plain trait type in the signatures now holds for a trait whose `comprises` clause lists types too (fork K1, item 621); the section speaks of self-typed traits only. The orientation update states K1 in FACTS beside F-225, as the record asks.
- `references/revival-changes.md:99`, "A numeral whose number does not fit there is refused statically": not across components on the compiled path (row 1131), and a number at a call stays a `ZZ` compiled (row 1132). Since `403a0e60cb` the writer adds no sentence for a new trap; the rows go to the coordinator.
- C's proposal for `references/compiler.md`'s list, rows 1137 and 1138 (`RECORD.md`, "Left for the coordinator and the skill writer"): two new traps, which by the same rule go to the coordinator, not into the skill.

**Sentences that hold, met by the batch:** `references/tests-writing.md:94`, the order; `references/tests-writing.md:140`, a line of the team's tests respelled with its value kept (no team test changed); `references/revival-changes.md:17`'s first sentence, "Walk's load check is not the verdict of these rules", which the `Both` set shows again.

## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home. Each item carries its kind in one line: a question that waits for him, or a default that only informs him.

**Items for him: each has a home in `PLAN.md:814-822`; only K1 has a review-queue item (621).**
- N.worker.1 and N.skeptic.1 (`:814`): settled by P-174 and P-46; off his list; row 1132 to the batch after.
- N.skeptic.2 (`:815`): settled by P-180; off his list.
- G.worker.1 and G.skeptic.1 (`:816`): settled by P-174, P-180 and the record's reasoning for row 1124; off his list; row 1135 to the batch after.
- K.worker.1 and K.skeptic.1 (`:817`): settled by his words and fork K3; off his list; row 1136 first in the batch after.
- K.worker.2 (`:818`), K.worker.3 (`:819`): defaults that inform him; rows 770 and 1094 to the batch after.
- K.skeptic.2 (`:820`): row 879's status; a note, with item 621 as its home.
- review.1 (`:821`): P-60's sentence to the record-landing; the coordinator names the change to him with old and new words.
- judge-review.1 (`:822`): settled by `references/specification.md:22`; off his list; with the first rung that edits the entry.
- G.reserved.1: the landing's one line.

**Open rows.**
- With a home in a list or an item: 1131 and 1132 (`:814-815`), 1135 (`:816`), 1136 (`:817`), 770 (`:818`, and phase 5's line at `PLAN.md:120`), 1094 (`:819`), 724 (`:822`, and phase 5), 1098 (item 616).
- **Five have no line of their own in `PLAN.md` or `review-queue.md`:** 1133, 1134, 1137, 1138 and 780 (rewritten). Owed (the homes are mine): 780, 1133 and 1134 with the `Both` row in the batch after's walk rung; 1137 and 1138 with the compiled one library's next walls.
- **Two rows not yet filed:** the `Both` set and the `assert` crash (Part 1, findings 2 and 3).
- Rows 528 (the prelude's `RR32`, until the switch-over, P-37), 499 (the dispatcher's half, phase 5), 762 (a note): their homes stand.

**Record defaults.** By the queue's head (his rule of 2026-11-24), forks K2 to K8, G1 to G3, N1, N2 and C1 to C3, none consequential, need no queue item: F-407, F-408 and F-409 and the rewritten entries state what N, K and C built, F-405 what G built, and the batch record keeps the forks. K1 is item 621.

**Queue items that the landing built or made stale:** 621 stays, with rung K landed as its work; the record's "After the landing" names items 58 (row 543, built), 503 (its other forms, built but for row 1135) and 617 (run 2's Y), none of them in the queue's open list today. Item 616 still holds row 1098, which still stops `XXXOneLibraryRunVarargs`.

**PLAN lines that the batch built or made stale.** "Next" (`PLAN.md:13`), which names this batch as planned; phase 4's line for this batch, not yet written; `:60`'s list, which lacks this run's rows; the "Runs" line (`:9`), which can name the one-library programs that now run (`OneLibraryRunStringEquality`, `OneLibraryVarargsArguments`, `OneLibraryRangeReduction`, `OneLibraryArr`, `OneLibraryDot`); phase 5's line (`:120`) for row 770.

**The manual and the script:** process findings 1 to 5 and 7. **The skill:** Part 3. **FACTS and POSITIONS:** Part 1, "Corrections owed in the record".

## Part 5. For the batch after

**Run 2 of the record, climb batch 36b (F, Y, B, T), read again on this landed tree.**
- F: `RR64`'s `coerce(x: ZZ32) = asFloat(x)` and `coerce(x: RR32) = asFloat(x)` stand at `Library/FortressLibrary.fss:386-387`, N's lines at `:388-389` beside them; `one_library_tests/OneLibraryDot.fss:9` calls `asFloat(i)`; the section's citations of `Specification/appendices/changes.tex` past `:4512` moved by K's new entry and the judge's four lines (`:4855`, `:5254`, `:5262`, `:5322`, `:5658` in the section; `revival-asfloat` stays at `:2882`).
- Y: the crash of a failing `assert` with a message under the one library (Part 1, finding 3) is a run-time difference of the same family as rows 1101 and 1102; Y's section should name it, or the coordinator files its row first and routes it.
- B and T: run 1 touched none of their files.
- The four rungs and the disk's four-rung floor stand.

**The record's list for the later batch** (`CLIMB-BATCH-36.md`, "What the batch leaves out"): row 996; row 1098 after item 616; rows 1104 and 1105; rows 1106 to 1109; row 594; rows 1123, 1126 and 1118; row 1094 (fork K7); rows 744 and 1120 once their questions are settled; rows 1128 and 1129. review.1's Appendix I clauses of climb batch 35b are met in both halves and leave the list (`RECORD.md`, the judge's item).

**Does it still hold?** Yes, with this landing's rows before it, by P-180 and in this order:
1. Row 1136: the checker's error at a tie among one unit's own declarations that the overloading check accepts (Part 1, finding 1), with the error's test in place of `GenericTieInUnitFirstByPlace`.
2. Walk's load check of generic methods, one rung: row 780 (the valid nested pair stopping at an object's first instance), the `Both` set refused at load with its row, rows 1133 and 1134; and row 1135 in `checkNumeralTypesWritten`, the same rung or beside it.
3. Rows 1132 and 1131: the checker checks a numeral coercion's body at each numeral's instance (P-176), so a number at a call goes where a numeral goes and another component's coercion refuses statically, `RR64`'s and `RR32`'s infinity included.
4. Rows 1137 and 1138, the compiled one library's next walls, with row 643, and the `assert` crash's row if Y does not take it.
5. Row 770 (the export check) and row 1094 (the dotted form in a `comprises` trait).
6. Row 724's clause in Appendix I with the first rung that edits the entry "Overloading with static parameters" (judge-review.1).
7. The merged-diff review's open findings: none after the judge's repair.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I read the run's transcripts through scripts and the journal's results, and the gate's raw outputs under `tmp/gate-batch-36/`. For climb batch 35b's landing work and the preparation, I read only the transcripts' labels, times, models, first messages and writes, and the coordinating session's records around 21:29 on 2026-11-23.
- A workflow's journal holds no times. The run's times are the agents' first and last records, the commits' times and the reflogs.
- These are by reading, not run:
  - that swapping the two `f` declarations in section 3's program makes the checker refuse `g`, and that no value reaches a tie that the overloading check accepts;
  - that a program that never calls row 780's pair stops at its object's first instance;
  - that the `Both` set breaks the Meet Rule for dotted methods (the checker's refusal is run, by the gate);
  - that the trim's `cw` is one writer between `startBridges` and `endBridges`.
- I did not check each rung's reported runs against its logs; the skeptics and the merged-diff review did, and I cite them. I read the source diffs of the four rungs whole, and of the tests the programs that the decisions and findings name.
- The skill's load is a rough count, not `skill-load.py`'s. The split of the spans by purpose is by each transcript's label, first message and times.

## The steps due before the batch after

1. **The landing's own steps** (`references/batch.md`, "The landing"): the batch's to-dos swept (no reminder held one); each decision named in one line: forks K1 to K8, G1 to G3, N1, N2, C1 to C3, and G.reserved.1.
2. **The record-landing workflow for run 1** (`tools/record-landing/README.md`, with `batch: '36'`, `base: 'b5a758846dd8695c25d13a5885088454fb02dae3'`, `landing:` `61b50cd34a`'s full hash), with Part 3's list for the skill writer, P-174's two sentences, P-60's last sentence, P-45's clause on row 780, and F-366, F-174 and F-232; the coordinator then names each POSITIONS change to him with old and new words.
3. **The record's corrections** (Part 1): row 879's note; item 621's and the batch record's date of the team's sentence; rows for the `Both` set and the `assert` crash, and the `Both` case moved out of `GenericMethodBoundsDifferWalk` into an expected failure.
4. **The routing that no list holds yet** (Part 4): homes for rows 780, 1133, 1134, 1137 and 1138; the group "Climb batch 36, listed for his review" cut to the items that no entry settles, which leaves item 621's pointer; "Next", phase 4's line, `:60`'s list, the "Runs" line and phase 5's line.
5. **The base build of the landed tree** at `61b50cd34a` (the manual's routing, step 1a).
6. **Run 2's sections read again on the landed tree** (Part 5): F's citations of `changes.tex`, its two `asFloat` coercions and `OneLibraryDot`; Y and the `assert` crash; then the generator's block for `--run 2`, its checks and the splice, the disk and the check-ins, as the record's "Before the launch" gives them.
7. **The script and the manual** (process findings 1 to 5 and 7), before the next launch: step 7's candidates read and routed; the gather's cycle rule; the review's own clause where no stage reads the path; the gather's one-library tests in one call; `batch-measures.py`'s build pattern.

## For the curator

Run 1 of climb batch 36 ran from 01:57 UTC to 06:52 UTC on 24 November. In your time that is 02:57 to 07:52. It is pushed. All four tasks landed. No line of the model program changed. You gave the go at 00:2x UTC: "approved for the next batch with planner's defaults after Fable review. Go overnight." Every decision took the planner's default. One decision, K1, waits for your answer in the review queue as item 621. This section is your review of the others.

The words that this section uses:
- **Walk** is the interpreter. The **compiled path** checks a program with the **checker** and then writes JVM bytecode with the **code generator**.
- The **one library** is the library of the interpreter. The compiled path also has its own small library, the **prelude**, which goes at the switch-over.
- A **task** is one change of the run. The record names it a rung. A **worker** is an agent that does one task. A **skeptic** is a second agent that examines the worker's change and fixes what it finds.
- A **declaration** is one definition of a name. A name with several declarations is **overloaded**, and each call **chooses** one. A **tie** is a call where two declarations fit and neither is more specific.
- A **fork** is a design question with more than one way. A **default** is the way that the record chose before the run.
- A **row** is one known defect in the ledger. A **workaround** is advice in the skill on how to live with a defect.
- The **gate** is the full check before a run lands.

**What each task changed.** Each program is shortened from the tests that landed.

- **K. The checker chooses by the rules, and never by chance.** The checker and one place of the code generator changed.

      trait Q comprises { R }
          getter next(): R = twin(self)
          abstract twin(self): Q
      end
      object R(n: ZZ32) extends Q
          twin(self): R = R(n + 1)
      end

  - Before: compiled, this was refused: 'Function body has type Q, but declared return type is R.' The checker saw `Q`'s `twin` and `R`'s `twin` as equally good.
  - Now: it compiles and runs. `R(1).next` is `R(2)`, as under walk.

      f[\T\](x: T): ZZ32 = 0
      f[\U\](x: Box[\U\]): ZZ32 = 1

  - Before: compiled, whether a call `f(b)` on a `Box` ran the `Box` declaration depended on the order of a hashed set. Of twelve such calls, 5 ran it in one compile and 2 in another.
  - Now: all twelve run the `Box` declaration, in every compile.
  - Your words of last evening asked for this: a stable rule, or a static failure. One kind of tie is still neither:

        trait A excludes B end
        trait B end
        f[\T extends A\](x: T): ZZ32 = 1
        f[\T extends B\](x: T): String = "b"
        g[\X extends { A, B }\](x: X): ZZ32 = do r = f(x); r end

    The checker keeps the first `f` that is written, and `g` compiles. Write the two `f` lines the other way round, and `g` is refused. Put `f` in another component, and the call is refused, 'Ambiguous call'. No value is both an `A` and a `B`, so no run is affected. Only whether the program compiles depends on the order. By your words this must be a static failure. The next batch makes it one. It is row 1136.

- **G. Three walk errors that the rules settle.** Walk changed.

      object Nested
          tk[\U extends Number\](y: U): ZZ32 = 2
          tk[\U extends ZZ32\](y: U): ZZ32 = 3
      end

  - Before: `Nested.tk(n)` for a `ZZ32` gave 2, a wrong answer with no error. Now: 3.

      ident[\T extends Shape\](x: T): (T, ZZ32) = (x, 1)
      ident[\T extends Round\](x: T): (T, ZZ32) = (x, 2)

  - Before: walk refused this valid pair when it loaded the program. Now: walk runs it.

      never(x: ZZ32): NaturalNumeral[\1, 10, 3\] = never(x)

  - Before: walk ran this, against your rule that a numeral type is only a parameter's type. Now: walk refuses it, as the checker does.
  - Two steps that need repair:
    - A walk test now says that an object can take `tb[\U extends Number\]` from one trait and `tb[\U extends ZZ32\]` from another. The specification refuses this, and the checker refuses it. Walk runs it. The next batch makes walk refuse it.
    - An object of a trait with two valid generic `which` methods, one inside the other, now stops when the object is made. Before, it was made, and one call gave a wrong answer. No test or demo meets this. The next batch repairs it (row 780).

- **N. `Byte(v)`, as you said.** Walk, the checker, the code generator, the libraries and seventeen tests changed.

      value object Byte(b: ZZ32)
          coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v)
      end
      y: Byte = 200

  - Before: both paths refused `Byte(v)`. The library and the tests wrote `v.asZZ32`.
  - Now: `v` converts where it stands, on both paths. The one library's coercions read `= v`, with no method call.
  - Two places do not follow your rule yet on the compiled path. A number in a call goes to the declaration for a `ZZ`. And a number from another component that does not fit is not refused statically. Your rule P-174 settles both. They are rows 1131 and 1132 for the next batch.

- **C. Three crashes of compiled programs against the one library.** The code generator changed.

      count(xs: ZZ32...): ZZ32 = |xs|
      s: String = "ab"
      t: String = s || "cd"

  - Before: compiled against the one library, `count(4, 5, 6)` died when a class loaded, `t = "abcd"` died, and `SUM[i <- 0#n] i` died.
  - Now: each runs. The two array programs of the switch rehearsal are tests now, and pass.

**The full check.** The first full check passed: 3,754 tests, no failure. The interpreter's suite ran on the compiled path for the first time, as you decided: 278 programs passed by their own checks, and 6 more joined. The two measures of the checker on the one library stay at 0. The quick microGPT check passed 7 of 7 for both programs.

**The decisions that took the planner's default.** Each one can be undone.
- **K1. `self` has its trait's own type in a declaration's heading, also in a trait with a `comprises` clause.** The other way: the team's sentence whole, with the meet in the heading too. This one waits for your answer, as item 621.
- **K2. The declared parameter types decide which declaration is more specific.** No other way was proposed.
- **K3. A tie that the rules leave is a static error.** What landed keeps three kinds of tie without an error. One of them goes against your words (above). The next batch repairs it.
- **K4. The candidates are sorted by where they are written, before the rules order them.** The other way: sort them in an earlier phase that both paths run.
- **K5. A tie that several declarations cover together has the intersection of their result types, as your rule P-60 says.** No other way was proposed.
- **K6. The code generator casts `self` where the call takes a listed type's declaration.** The other way: a cast before every such call.
- **K7. Two neighbouring defects are only reported, unless the same change repairs them.** One was repaired (row 1046).
- **K8. Under the prelude, `c = 0` for an `RR32` value is now refused.** Before, it compiled and overflowed the stack. The other way: add `=` to the prelude, which your rule P-37 forbids. It goes with item 621.
- **G1. Walk tells generic methods apart by their bounds.** No other way was proposed.
- **G2. Walk reads a tuple result element by element.** No other way was proposed.
- **G3. Walk refuses a numeral type as a result, a variable's or a field's type when it loads the program.** Two places still load: a bound and a `typecase` arm (row 1135).
- **N1. A coercion's numbers convert where they stand, on both paths.** No other way was proposed.
- **N2. No coercion calls a method on its numbers, in the libraries, the prelude and the tests.** No other way was proposed.
- **C1. A generic function's class is named with its package.** No other way was proposed.
- **C2. A class holds each method once; its own method wins over a copy from a parent.** No other way was proposed.
- **C3. The two array programs are tests; a test that still fails names the row that stops it.** No other way was proposed.

**The items on your list.** None needs your answer to go on. Only item 621 is a question for you. The record settles the others, and the coordinator takes them off your list:
- Five items ask what your rules already say: the tie in one component (your words of last evening), the two compiled number defects (P-174 and P-180, two items), the numeral type as a bound (P-174 and P-180), and a clause of the specification (the skill's rule).
- Three tell you what landed: two checker rows that the next batch repairs, and a sentence of P-60 that is no longer true.
- One row, 879, was closed as settled by fork K1. Its question is item 621, so it gets a note that it waits for your answer.

**Your rule P-180 in this run.** Eight workaround passages of the skill are now needless. Fourteen rows closed, two more than planned. Eight new rows opened, six of them places where the new code does not yet follow your rules. Two more defects need rows.

**Three events.**
- **No agent ran twice.** No restart fell in the run.
- **Nothing else was committed while the run merged its tasks.**
- **No message of yours reached an agent.** You sent none during the run.

**The cost.** The run wrote 5.35M tokens. The estimate was 5.6M, and 6.4M with its reserve. The landing work of the batch before wrote 4.78M, and the preparation of this one 4.01M.
