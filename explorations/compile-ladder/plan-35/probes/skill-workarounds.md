<!-- The passages of the `fortress-repo` skill that teach a worker to work around, avoid or live with a defect or gap of the tree, each with its ledger rows, the decision or the fork that its fix needs, the work on the record's road that removes it, and the size of its fix, sorted into four groups as the input of the housekeeping batch's planner. -->

# The skill's workaround passages, for the housekeeping batch

Read on `main` at `443042d5dd` (the skill unchanged since `c3dbe514d7`), by reading only: nothing was built or run. The decision behind the batch is P-180: a batch fixes such defects as it goes, and the skill drops each passage that taught a worker to live with one.

**How to read an entry.** `file:line` is under `.claude/skills/fortress-repo/` (`SKILL.md`, or a file of `references/`). Row statuses: NV `NEGATIVE-VERIFIED`, NB `NEGATIVE-BOUNDED`, C `CONTESTED`, F `FIXED`. Path: walk, compiled, or both. A size is by reading the code that the row names: **part** of a rung (one site, with its test), **one** rung, or **more**. "Goes" names the skill text that is deleted when the fix lands. A ledger row's file:line citations are the row's own, at the commit it names.

**What counts as the road (group (c)).** Only work that the record names as removing the defect: the switch-over (P-37, P-38; PLAN's phase 4 names line, `coordinator/PLAN.md:84`, and its prelude lines, `:87`, `:88`), the record's list for the batch after climb batch 34b (`reviews/batch-34b-review.md`, Part 5, items 1 to 7, which carries `reviews/batch-34-review.md`, Part 5, item 3), walk running the checker (P-12; PLAN's Q-walk line, `PLAN.md:96`, and `:294`), or the array design (P-85; `PLAN.md:112-115`). A PLAN line that leaves a row "with the next rung that edits" a file, or says "No rung is named", is not road: those rows are in (a) with the line cited.

**Counts.** (a) 98, (b) 23, (c) 50, (d) 18. In (a), 17 entries name a defect, or part of one, that no ledger row holds (a13, a46, a48, a53, a58, a66, a68, a69, a86, a90, a92 to a97): each needs its row before its test.

## The four he named, on the tree as it stands

1. **Walk's generic instances at its internal classes (row 364)**: `FIXED` by `12292add28` (2026-11-09, "Read a number or string value at its trait in walk's inference and messages"), reproducer `ProjectFortress/tests/LanguageTypeInstancesWalk.fss`. The skill's passage went in `dfcb7eb18f` (2026-11-09). No passage is left; it is in no group.
2. **Tuple comparison on tuples of any length (row 923)**: NV, `design limit (library)`, walk, open. It needs a decision first: entry b1.
3. **`00.5` keeps one leading zero (row 960)**: NV, `implementation gap (parser)`, both paths read the same node (the reproducer runs under walk). No fork, no road work: entry a1. He is right that the switch-over does not touch it.
4. **Walk's infinity from an overflow on purpose (`revival-changes.md:95`)**: no row holds the workaround; rows 95 (NV, the specification's `∞` not built), 863 (C) and 980 (C) hold its parts. It needs decisions first: entry b2. The sentence's last clause, on the prelude's `TIMES` and `isInfinite`, is (c), entry c3.

## (a) A fix with no fork, not removed by work on the road

Each entry ends with its file tags. **Entries that share a tag touch the same file; "same declaration" marks those that touch one declaration, which must be one rung or merge in order.**

Tags: [OF] `interpreter/evaluator/values/OverloadedFunction.java`; [CON] `interpreter/evaluator/values/Constructor.java`; [BE] `interpreter/evaluator/BuildEnvironments.java`; [EB] `interpreter/evaluator/EvaluatorBase.java`; [EV] `interpreter/evaluator/Evaluator.java`; [SNA] `interpreter/glue/StaticNativeApp.java`; [FOBJ] `interpreter/evaluator/values/FObject.java`; [FUN] `scala_src/typechecker/impls/Functionals.scala`; [OC] `scala_src/typechecker/OverloadingChecker.scala`; [EC] `scala_src/typechecker/ExportChecker.scala`; [CG] `compiler/codegen/CodeGen.java` (member named); [OS] `compiler/OverloadSet.java`; [BPR] `compiler/BuiltinPrimitiveRewriter.java`; [FL] `Library/FortressLibrary.fss` and `.fsi`. Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`.

### The one-sentence fix: the named case

- **a1** `references/interpreter.md:26`: "keeps only one of its leading zeros, so a coercion over `RadixPointNumeral[\n, m, r, v\]` gets `n` = 2 for `00.5`, not 3 (ledger row 960)". Row 960 NV, both. Rule: P-174 (`n` is the digit count). Size: **part**: `nodes_util/ExprFactory.java:1640-1643` trims every leading zero but one from the text that `NumeralNumbers.of` counts; `makeIntLiteralExpr` trims none. Promote `tests/XXXRadixPointLeadingZerosWalk.fss`, add the compiled case, and grep the tests for a pinned numeral text. Goes: the bullet.

### Walk's load check of overloads [OF]

PLAN names one walk rung for most of these: "for the walk rung on the load check's refusals and loads ... P-45's walk rows 779, 780, 787 and 788 beside them", with rows 936, 492 and 539 (`PLAN.md:308-309`). No batch holds it. Together **one** rung, perhaps two; each alone is **part**. When all land, `revival-changes.md:17`'s example and caution and `interpreter.md:69`'s "Walk departs from the rules in these cases" list go.

- **a2** `references/revival-changes.md:17` and `references/interpreter.md:70`: "walk compares two functional methods of a generic trait or object at each call, not at load (row 780)". Row 780 NV, walk. P-45. [OF] (the site is not located, the row says).
- **a3** `references/interpreter.md:71`: refuses two nested generic functional methods in a type without static parameters (row 779). NV, walk. P-45. [OF] `genericPairValid`, `instanceHolding`.
- **a4** `references/interpreter.md:72`: refuses a pair whose overlap it finds only through a supertype (row 539). NV, walk. P-45, the POPL 2019 example. [OF] `matchApart`, `genericMeetCovered`.
- **a5** `references/revival-changes.md:28` and `references/interpreter.md:73`: "Walk does not apply the rule: it runs such a type, and refuses overloads on two instantiations ... (row 416)". NV, walk. P-43, P-97. [OF] `:589-604` with `types/FType.java` `excludesOther`, and a refusal at load of a type that extends two instantiations [BE]. **One** rung. Goes: both sentences.
- **a6** `references/interpreter.md:74`: reads an object type over a static parameter as excluding (row 788). NV, walk. P-45. [OF] with `FType.excludesOtherSimply`.
- **a7** `references/interpreter.md:75`: reads no `where` clause in the exclusion over the whole tuple (row 787). NV, walk. P-152. [OF] `domainsExcludeTogether`, `genericMeetCovered`.
- **a8** `references/interpreter.md:76`: "Make each type that extends `T[\A\]` an `A`" (row 893). NV, walk. P-146. [OF] `selfTypeParameter` (same declaration as a9), with a refusal at load [BE].
- **a9** `references/revival-changes.md:43-46`: "In two cases walk does not read `self` so, and its load check refuses the valid pair (row 999)". NB, walk. P-146, P-157. [OF] `selfTypeParameter`: same declaration as a8.
- **a10** `references/revival-changes.md:53` and `references/interpreter.md:78`: loads a function over `Index` beside one over a pair (row 806). NV, walk. P-156. [OF] `:381` with `values/SingleFcn.java:53-61`.
- **a11** `references/interpreter.md:79`: loads two functional symbolic operators that break the Meet Rule (row 611). NV, walk. [OF] `checkedName`.
- **a12** `references/interpreter.md:80`: "Write the return type." (row 1044). NV, walk. Return Type Rule. [OF] `writesReturnType`, with `values/Simple_fcn.java:38`.
- **a13** `references/interpreter.md:81`: "It reads no `comprises` clause for the Return Type Rule". **No row holds it**: file one. Walk. P-60. [OF], the Return Type Rule's check.
- **a14** `references/interpreter.md:82`: refuses a valid pair whose generic result is a tuple holding its type parameter (row 1058). NV, walk. [OF] `returnRuleAtObjectArguments`: same function family as a12.
- **a15** `references/interpreter.md:83`: reads two lists as excluding where every differing parameter is an object type (row 697). NV, walk. [OF] `:511`.
- **a16** `references/interpreter.md:85`: loads a pair that breaks the Return Type Rule over an arrow type (row 1049). NV, walk. [OF].
- **a17** `references/interpreter.md:84`: "Give the two methods two names." (row 1057). NV, walk. Not [OF]: `values/DottedMethodApplication.java:106`. **Part**.

### Walk's other load checks [CON] [BE]

- **a18** `references/revival-changes.md:34`: "Walk skips this check for a generic object (row 665)". NV, walk. P-147. [CON] `:263`, `checkForDef` `:431`: same declaration as a19. **Part**.
- **a19** `references/interpreter.md:92`: "It also refuses a valid object whose one body for the method has a static parameter of its own (ledger row 728)". NV, walk. P-147. [CON] `checkForDef`, `definedBelow`: same declaration as a18. **Part**.
- **a20** `references/interpreter.md:93-97`: walk does not read all the bounds of the static parameters for an `override`. Row 693 (not cited in the skill), NV, walk. Traits chapter's `override` rule. [CON] `checkOverrides` `:688`, `boundsUnread`, with `nodes_util/ExprFactory.java:1127` and [BE] `:1085`. **Part**. Goes: the sub-list and its last sentence.
- **a21** `references/revival-changes.md:55`, `:81`: "Walk orders every list (row 774)"; "Walk and the compiled runtime apply a conditional extension without its condition (row 774)". NV, both. P-151, P-154. [CON] `boundsUnread` (same declaration as a20), and the compiled type test. PLAN: "it can come as a walk rung of its own" (`PLAN.md:304`). **One**.
- **a22** `references/revival-changes.md:81`: "Walk runs a dotted call that breaks a method's condition (row 777)". NV, walk. P-151. With rows 868 to 870, "a walk rung of P-151's forms" (`PLAN.md:305`). **Part**.
- **a23** `references/revival-changes.md:30` and `references/interpreter.md:90`: "walk checks extenders only against the clauses of the program's main component (row 551)"; "Walk does not yet check the library's clauses, another component's clauses or an object expression's clauses". NV, walk. P-60. [BE] `checkComprisesClauses` `:1239`. **Part**; the row says a fix revises Appendix I's entry on the traits that extend.
- **a24** `references/interpreter.md:90`: a bounded `where`-clause variable's bound ignored (row 754); a name equal to the variable's taken as the variable (row 778). NV, walk. [BE] `:1463-1467`. **Part**.
- **a25** `references/interpreter.md:91`: "Missing type E" (row 755). NV, walk. `BuildTraitEnvironment.java:126`, `:148`, with [BE] `processWhereClauses`. **Part**.
- **a26** `references/interpreter.md:30`: a numeral type in a `comprises` clause loads (row 981). NV, walk. P-174. [BE] `checkNumeralTypesWritten`. **Part**.
- **a27** `SKILL.md:113` and `references/compiler.md:158`: "Nothing refuses a `var` field in a value object, so give it none."; "`V(1) === V(1)` is `false` (ledger row 112)". Row 112 NV, both. Rule: the team's, `Specification/basic/objects.tex:374-375` ("The fields of a value object are immutable; ... or it is a static error"). A refusal at load [BE] or [CON], and in the checker; `Library/Lazy.fss:18` declares `value object Lazy[\T\](var s : State[\T\])` and must change. **One**. Goes: both sentences.
- **a28** `references/interpreter.md:107`: "Walk checks a program's declarations against the library's only when it analyses the library ... (ledger row 342) ... run with an empty cache". NV, walk. `interpreter/env/ComponentWrapper.java:108-121`. **Part**. Goes: the paragraph.
- **a29** `references/interpreter.md:109`: "Walk compares no component with the apis that it exports ... (ledger row 841)". NV, walk. Specification "Export Statements". `evaluator/BuildApiEnvironment.java:48-136`, commented out. **One**. P-12 may bring the checker's export check to walk; the record does not say so.
- **a30** `references/interpreter.md:113`: "Do not pin or compare this order." Row 430 NV, walk. [CON] `:348-349`, a `GHashMap` in hash order. **Part**.

### Walk's inference [EB]

- **a31** `references/revival-changes.md:70` (and `SKILL.md:135`, "Some other cases still get the empty type `Bottom`"): two bounds, neither below the other (row 591). NV, walk. P-48. `types/FType.java:338-348` `meet`, `TypeLatticeOps.java:38-43`, [EB] `:907`. **Part**.
- **a32** `references/revival-changes.md:71`: bounded only from above by a bound that names another parameter (row 612). NV, walk. P-48. [EB] `instanceOf` `:375`, `:397-399`: same declaration as a31's rechecks. **Part**.
- **a33** `references/revival-changes.md:72`: fixed only by a function expression's result without a return type (row 587). NV, walk. P-48; the row says the specification leaves the supertype open, so its test asserts only a supertype. **One** or more: walk has no type for the body. P-12's step would give one; the record does not name the row there. When a31 to a33 land, `SKILL.md:135`'s last sentence goes.
- **a34** `references/interpreter.md:18`: "An immutable top-level variable of arrow type, an object's field of arrow type and a declared arrow return type keep the generic value (ledger rows 1019, 1036)". NV, walk. `interpreter/evaluator/BaseEnv.java:333`, `Fcn.received`, `values/NonPrimitive.java`. **Part**.
- **a35** `references/interpreter.md:35`: "Bind the call to one name ... then write `(first, second) = pair`." Row 1026 NV, walk. `interpreter/rewrite/DesugarerVisitor.java:865-875` reads the right side, not its temporary. **Part**.
- **a36** `references/revival-changes.md:126` and `references/library.md:25`: an empty `SUM` with no declared type gives the integer 0 (row 716). NV, walk. [FL] `additiveIdentity`'s `typecase` (`:3395` at the row's commit). **More**: without a static type for the body walk cannot pick the element type; P-12's step would give it, but the record does not name the row there.
- **a37** `references/revival-changes.md:127`: an inner comprehension built at its elements' run-time types (row 717). NV, walk. The declared type reaches the outer clause form only. [EB] and [FL] `__bigOperator`. **One**.
- **a38** `references/revival-changes.md:128` and `references/library.md:25`: "a written static argument that is not a number type ends an empty `SUM` in `CastError` (row 436)". NV, walk. P-78 names the fix: "until the specification's `HasIdentity` is built"; `PLAN.md:318` puts it among "Rows on phase 3's road with no batch named". [FL] `additiveIdentity` `else => cast[\T\](0)`, `multiplicativeIdentity`. **More**: `HasIdentity` is a `where`-clause design (`perf-probes/where-clauses/REPORT.md`, B.4). Same declaration as a36.

### Walk's evaluation, and both paths' transactions

- **a39** `references/tests-writing.md:34`: "`x[5]^2` compiles, but under walk fails or gives the wrong element (ledger row 1)". NV, walk. [EV] `evalInvocationArgs` `:1064`, `:1380-1381`, from `:1181`. **Part**. Goes: that clause; `f(x)^T`'s refusal is the grammar's (F-363), not this row.
- **a40** `references/revival-changes.md:57`: "The interpreter's library declares it for no type, and walk stops on it (row 184): write `a <-> b`." NV, walk. Rule: the specification's `Boolean` declares `opr ≡(self, other: Boolean)` (`Specification/basic-lib/booleans.tex:123`). [FL] the declaration, and [EV] `getOp` `:896`, whose `InterpreterBug` becomes a dispatch error. **Part**. Goes: the sentence's second half.
- **a41** `SKILL.md:126`: "An `exit` out of an `atomic` block loses the block's writes, on both paths (ledger row 1039). Set a flag in the block, and exit after the block." NV, both. The row: "The specification retains the writes of a block that an exit leaves." Walk's `atomic` and `runtimeSystem/BaseTask.java:285-314` (`leaveTransaction` commits nothing on a `LabelExit`). **One**; promote `tests/XXXExitOutOfAtomicWalk.fss` and `compiler_tests/XXXExitOutOfAtomicCompiled`. Goes: both sentences.
- **a42** `references/gate.md:40`: "`tests/XXXAtomicNestedReadsKeptWalk` can print `PASS` and fail with 'Missing expected failure' ... (ledger row 1004)". Row 1004 NB (tests) rests on row 985 NV, walk: a nested block's reads are not answered for at the outer commit. `interpreter/env/ValueNode.java:66-68`, `:98-99`. **One**; the fix promotes the test and the race goes. Goes: the sentence and "Cite the row".

### Walk's natives [SNA] [FOBJ]

- **a43** `references/interpreter.md:129`: "The native then receives the name of the type ... (ledger row 877). Give a program's own type another name." NV, walk. [SNA] `javaFor` `:58`, `unbox` `:282`; [FOBJ] `getString` `:33-35`: same declaration as a44. **Part**.
- **a44** `references/interpreter.md:143`: "receive the wrong text for a `CatString` ... (ledger row 846) ... Bind such a native over `FlatString`, and beside it an overload over `String`". NV, walk. `glue/prim/Util.java:254`, `:286`; [FOBJ] `getString`: same declaration as a43. **Part**. Goes: the paragraph from "A glue class bound over `String`".
- **a45** `references/interpreter.md:140`: "Walk checks the binding of a dotted method of a generic trait or object only when the program makes an instance ... (ledger row 864)". NV, walk. [SNA] `:189-193`, `values/MethodClosure.java:36`. **Part**.
- **a46** `references/interpreter.md:152`: "`StaticNativeApp` raises the interpreter's library's object of the same name in its place, without the message. So raise from a helper only an exception that both libraries declare as an object". **No row holds the dropped message** (row 350, `IntegerOverflow` carries no value, is its sibling): file one. Walk. [SNA]. **Part**.
- **a47** `references/interpreter.md:145`: "An `import java` written in a `.fss` file is wired under walk but unfinished, and no test uses it." Row 845 NV, walk. `interpreter/evaluator/BaseEnv.java:535-537`. **One**.
- **a48** `references/interpreter.md:158`: "The hint below them names `-debug interpreter`, which shows nothing more." **No row.** Walk's error report. **Part**.

### The compiled checker [FUN] [OC] [EC]

- **a49** `references/revival-changes.md:24`: "The checker refuses such a pair in one component, but accepts it against the library's `+` (row 918)." NV, compiled (one library). P-160. [OC], the Meet Rule against imported declarations. **One**. Goes: that sentence.
- **a50** `references/revival-changes.md:32`: "the checker accepts such an `override` (row 653)". NV, compiled. `Specification/basic/traits.tex:680-683`. `scala_src/useful/STypesUtil.scala:1701` reads `override` only to let a wider declaration hide. **Part**.
- **a51** `references/revival-changes.md:34`: "The checker refuses a cover by several bodies where the abstract or a covering method has static parameters (row 725)." NV, compiled. P-147. `scala_src/typechecker/AbstractMethodChecker.scala:135-145`. **Part**.
- **a52** `references/revival-changes.md:52`: "the checker refuses a tuple expression at a parameter of type `Index` ... (row 805)". NV, compiled. P-156. [FUN] `checkApplicableWithoutInference` `:452`, `:494`. **Part**; its test goes in `one_library_tests/` (the prelude has no `Index`).
- **a53** `references/revival-changes.md:81`: "The checker reads an `extends` entry with any other `where` clause as unconditional, without a message." **No row**: file one. Compiled. P-151 builds three forms only; the fix refuses the others. **Part**.
- **a54** `references/revival-changes.md:108`: "on both paths, `g(5)` runs `g[\T\](x: T)` beside `g(x: NN32)` ... (row 1017)". NV, both. P-46. [FUN] `open` `:827-831` and [OF] `belowByNumerals` `:2378-2385`. **Part**.
- **a55** `references/compiler.md:155`: the checker refuses an atomic expression whose value is a numeral, and `atomic 1` fails verification (row 1043). NV, compiled. P-173. [FUN] the numeral join `:1304-1356`, `impls/Misc.scala:451-454`: the same functions as rows 1074 and 1075 (c21), which the batch after's item 5 takes; give a55 to that rung. **Part**.
- **a56** `references/compiler.md:182`: the Return Type Rule refuses a generic beside a tuple of object types (row 1048). NV, compiled. `scala_src/overloading/OverloadingOracle.scala:140` `meetingInstances`. **Part**.
- **a57** `references/compiler.md:184`: "If a compiled test passes alone and fails in the suite, look for such a tie first." Rows 1046 NV and 1047 NB, compiled: the tie keeps the sort's head [FUN] `:1104-1108`. **One**. Row 499 (NV, `design limit`) is the dispatcher's half [OS] `:1342-1353`, which PLAN's phase 5 repairs "beside row 496's" (`PLAN.md:117`), not a batch.
- **a58** `references/compiler.md:186-189`: two `where` constraints unchecked, "no ledger row holds the first two", and a written static argument against its bound (row 470, NV). Compiled. P-151. `scala_src/useful/STypesUtil.scala:729-741`, `:782-801`, [FUN] `:1191`. **Part** each; file the two rows.
- **a59** `references/compiler.md:191-192`: "Leave the name out of the whole import" (row 813); "Neither path leaves out an infix operator that it lists" (row 814). NV, compiled and both. [OC] `importsOnDemand` `:252-255`: same declaration for both; `compiler/disambiguator/TopLevelEnv.java:72`. PLAN: "A name-binding rung for rows 813 and 814 ... nothing waits" (`PLAN.md:310`). **One**.
- **a60** `references/compiler.md:194`: "a fresh type also under a function type's result (ledger row 751)". NV, compiled. `TypeAnalyzer.scala` `pSubInner`. **Part**.
- **a61** `references/compiler.md:176` and `references/library.md:38` ("Give an object's value parameters the api's names"): the export check compares no value parameter's name (row 839). NV, compiled. [EC] `equalParams` `:690-702`, `equalOptListParams`. **Part**.
- **a62** `references/library.md:45`: "A component's getter does not match it, so declare a field in the component too (ledger row 842)." NV, compiled. [EC] `equalMember` `:875-889`, `equalAbstractMember` `:860-872`. **Part**; same file as a61.

### The code generator [CG] [OS]

- **a63** `references/revival-changes.md:32` and `references/compiler.md:89`: "the code generator refuses every `override` modifier, so a program that writes one does not compile (row 650)". NV, compiled. Traits chapter. [CG] `fnDeclCompilableModifiers` `:2950-2952`. **Part**.
- **a64** `references/compiler.md:40` (with `:93`, "a compiled test uses none of these"): `spawn`. Row 82 NV (`library gap vs spec (prelude)`), compiled; `PLAN.md:78`: "No rung is named for either". **One** or more: `spawn` and `Thread`'s helpers on the compiled run time.
- **a65** `references/compiler.md:41`: an object expression. Row 375 NV, compiled. [CG] `defaultCase` has no `forObjectExpr`; the lifting desugaring runs only under `fortress desugar` (`Shell.java:262-264`, `:446`). **One**, with row 570's checker half.
- **a66** `references/compiler.md:42`: an array literal, such as `[1 2 3]`. **No row** holds the code generator's wall: file one. Compiled. [CG]. **One**; review-queue item 88 holds a model diff until it compiles.
- **a67** `references/compiler.md:43`: "Can't compile the number type ZZ32 as a value yet' (ledger row 1082)". NV, compiled. [CG] `forObjectDeclPrePass`, `isSingletonObject`, `forVarRef`. **Part**.
- **a68** `references/compiler.md:79-84`: four refusals of a type assumption, with no row each. Compiled. [CG], the assumption's call code beside `partiallyAssumedCall`. The batch after's item 5 takes "the other forms of row 818" and P.judge.1's form; whether these four are among them the record does not say. File rows and give them to that rung. **One**.
- **a69** `references/compiler.md:89`: "With a tuple that holds `Any` there, the code generator crashes (ledger row 889)"; "With `Bottom`, `Self` or an abbreviated type there, the code generator refuses the declaration" (no row). NV, compiled. [CG] `generateTypeReference` `:6024`, `NamingCzar.repairedApiName` `:1720`. **Part**; file the second row.
- **a70** `references/compiler.md:89`: "The disambiguator ... drops a trait's or object's contract ... and walk does not check one either (ledger row 781)". NV, both. `compiler/disambiguator/TypeDisambiguator.java:112-113`, `:137-138`. **Part** to keep the clauses; checking them is a74's.
- **a71** `references/compiler.md:89` and `references/revival-changes.md:81`: a call whose own clause introduces a `where`-clause variable "dies at run time with `NoClassDefFoundError` (ledger row 867) ... copy its form for such a call". NV, compiled. `compiler/codegen/FnNameInfo.java:99`. `PLAN.md:76` leaves it "with the code-generator rungs", no batch. **One**.
- **a72** `references/compiler.md:60-64`: three local-function forms refused (row 304). NV, compiled. [CG] `forLetFn` `:3588-3592`. `PLAN.md:75`: "with the code generator's later rungs", no batch. **One**.
- **a73** `references/compiler.md:144`: "write no compiled program that relies on `finally` after an exception or an `exit` leaves the `try`" (row 890); a `VerifyError` for `try` with `finally` only (row 891). NV, compiled. [CG] `forTry` `:2078-2089`: same declaration as a74's `forTry`. Review-queue item 562 names row 890 beside fork L1, whose default speaks only of rows 1042, 1040 and 1041. **One** for both.
- **a74** `references/compiler.md:89`: "It also refuses a function or method with a contract". Row 701 (not cited in the skill) NV, compiled; `PLAN.md:76` leaves it "with the code-generator rungs, beside row 867". **One** or more, with a70.
- **a75** `references/compiler.md:146`: "Bind its value in a statement of its own" (rows 322, 526). NV, compiled. [CG] `forAtomicBlock`, `forTry`, `forLabel`: the handler clears the operand stack. Same declaration as a73's `forTry`. PLAN's phase 5: row 322 "waits behind the first compiled matrix" (`PLAN.md:117`), no batch. **One**.
- **a76** `references/compiler.md:154`: "Bind the numeral to a typed variable first" (row 340). NV, compiled. ASM's `Frame.merge` at two coercion paths with unlike stacks; [CG]. PLAN's phase 5 lists it "by reading" (`PLAN.md:117`). **One**.
- **a77** `references/compiler.md:157`: "Put `self` first in such overloads." (rows 573, 1038). NV, compiled. [OS], the dispatch method's type test on `aload_0` where the argument is `aload_1`: one site for both. **Part**.
- **a78** `references/compiler.md:161`: "Read `b` before you read `a`." (row 1011). NB, compiled. The component class's static initialiser order. **Part**.
- **a79** `references/compiler.md:162`: "Give each binder a type." (row 964). NV, both. [CG] `getType(TypeOrPattern)` `:2166-2186`; walk's [EV] `forTypecase` `:1530-1551`, the site of row 1068 (b3). **Part**; do it with a80.
- **a80** `references/compiler.md:153`: "Bind the selector to a variable first, as `x = 7`" (row 963). NV, compiled. P-173. `scala_src/typechecker/impls/Misc.scala`, the `typecase` case. **Part**; the row says the default changes `XXX5r.test`'s pinned spans and makes `XXXPatternMatchingc.test` reach row 964, so it goes with a79. The sentence's second half, row 1081, is b4.
- **a81** `references/compiler.md:175`: "Call it through a value typed as the trait" (row 815). NV, compiled. The pair's overload method is missing from the component's class. **Part**.
- **a82** `references/compiler.md:177`: "Bind the value at the field's type first" (row 1053). NV, compiled. [CG] the setter call names the value's static type; `castToTypeBelow`. **Part**.

### The run time, the natives' rewrite, and the residual of a fixed row

- **a83** `references/revival-changes.md:83`: "The class loader computes a size without checking its kind, and stops on a negative exponent with a Java exception (row 675)." NV, compiled. `runtimeSystem/Naming.java:1238-1257` `foldSize`, `NamingCzar.XL_INTNAT`. **Part**; the same size code as row 962 (b5).
- **a84** `references/revival-changes.md:85` and `references/compiler.md:194`: "A compiled call fails the JVM's verification if it passes a value of such a trait where a listed type is expected (row 307)". NV, compiled. `PLAN.md:76`: "Row 307's run-time size waits until after the switch-over", no fix named. **More**.
- **a85** `references/compiler.md:166`: "Write none in a compiled program." (row 559). NV, compiled. No run-time class for an intersection type (`InstantiatingClassloader.java:2519`); PLAN's phase 5, "each row its own home" (`PLAN.md:118`). **More**.
- **a86** `references/revival-changes.md:41`: "For a generic object that lists `T` first in its `extends` clause, no test covers such a body (row 1052). Before a compiled program relies on one, write a compiled test of it." Row 1052 is `FIXED` (`1f6c166b0`); its notes leave this case "by reading, not run ... may still meet the circularity; no test holds it (F-385)". **No open row.** **Part**: the compiled test, and a repair in the class loader if it fails. Goes: both sentences.

The natives' rewrite [BPR]: `PLAN.md:77` leaves rows 882 to 886 "with the next rung that edits the rewrite", no batch.

- **a87** `references/compiler.md:119`: a local function or a method of an object expression is not rewritten (row 865). NV, compiled. [BPR] `rewrite` `:59`, `:75-87`. **Part**.
- **a88** `references/compiler.md:121`: "Test a binding with `compile`." (row 882). NV. [BPR] `setEnabled` `:46-48`, `Shell.java:101-107`, `:561`, `:702`. **Part**.
- **a89** `references/compiler.md:129`: a component that imports a DSL grammar is not rewritten (row 884, not cited by number). NV. `GraphRepository.syntaxExpand`. **Part**.
- **a90** `references/compiler.md:132`: "the checker accepts such a binding whatever helper it names, a signed one included" (**no row**); and with two methods of one name, no transfer helper (row 885, NV). [BPR] `soleMethod` `:135-145`, `:196-206`; `NamingCzar.java:373-384`, `:494-503`. **Part**; file the first row.

### Build, harness and tools

- **a91** `references/build-and-caches.md:13`, `:37-40`: "never deletes it"; "When no run of yours is live, remove yours". Row 702 NV. `syntax_abstractions/rats/RatsUtil.java:138-145` marks only the directory `deleteOnExit`. **Part**.
- **a92** `references/build-and-caches.md:73`: "Set the environment variable, not only the property `-Dfortress.library=one` ... the run looks in `caches` and prints 'Could not load P'." **No row.** `bin/fortress_classpath`, `bin/run_classpath`, `repository/ProjectProperties.java`. **Part**.
- **a93** `references/build-and-caches.md:93-97`: "Sometimes all five compiles exit 0 and a jar is missing. The cause is not known." **No row.** Size unknown: a probe first.
- **a94** `references/compiler.md:215`: "A failed compile of a program leaves a 0-byte jar ... Read the compile's error instead." **No row.** The jar writer of `fortress compile`. **Part**.
- **a95** `references/tests-running.md:91`: "the exit code is 0 whatever the verdict". **No row.** `fortress junit` in `Shell.java`; the record's `junit.sh` and `harness-one.sh` follow it. **Part**.
- **a96** `references/tests-running.md:58`: "not with `ant testDemos`, whose test of the output is weaker". **No row.** The demo test class; the record's driver stays until it checks as much. **Part**.
- **a97** `references/toolchain.md:23`: "If scalac reports arity errors in `S*Pattern` nodes, the generated nodes are stale. Run `touch ProjectFortress/astgen/Fortress.ast`". **No row.** `build.xml`: the generation does not depend on the generator's sources. **Part**.
- **a98** `references/library.md:62`: "a comment-only edit changes the syntax tree ... map their positions back". Row 359 NB, both. `parser/Fortress.rats:145-157` `createSpan` steps back over spaces only. **One**: spans, unambiguous names and pinned diagnostics move.

Same file, different declarations (they merge if each rung keeps to its members): [OF] a2 to a16 and a54; [CON] a18 to a21 and a30; [BE] a5, a8, a23 to a27; [EB] a31 to a33 and a37; [SNA] a43, a45, a46; [FUN] a52, a54, a55, a57, a58; [EC] a61, a62; [CG] a63, a65 to a69, a72, a73, a75, a76, a79, a82; [FL] a36 to a38, a40, and b1 and b20 if decided. Same declaration: a8 with a9 (`selfTypeParameter`); a18 with a19 (`checkForDef`); a20 with a21 (`boundsUnread`); a31 with a32 (`instanceOf`'s rechecks); a36 with a38 (`additiveIdentity`); a43 with a44 (`FObject.getString`); a59's two rows (`importsOnDemand`); a73 with a75 (`forTry`); a77's two rows (one dispatch site); a55 with c21's rows 1074 and 1075; a79 with a80, which changes the test that reaches row 964.

## (b) A fix that needs a decision first

- **b1** `references/revival-changes.md:64`: "The interpreter's library declares `=` on pairs and triples only, so `(s, 1, 2, 3) = (t, 1, 2, 3)` falls back to `SEQV` and is `false` (row 923). To compare by content, give the value object an `=`, or compare the parts." Row 923 NV, `design limit (library)`, walk; its specification cell is "silent". **The fork**: fork E7 of climb batch 27, review-queue item 401, default "as landed". His word of 06:19 UTC on 11-22 (`coordinator/HELD.md:18`) wants tuples of any length to compare, but it is not in POSITIONS, and the text gives `Tuple` only `Any`'s operators, whose one equivalence is `SEQV` (`Specification/basic-lib/objects.tex:185`), so no passage defines `=` on tuples. Ways: (i) `=`, and `<` and `CMP` with it (`revival-changes.md:55`), element by element at every length as a rule of the language, built in walk (`interpreter/evaluator/values/FTupleLike.java:78`) and in the checker, with a specification entry; (ii) declarations in the library up to some length beside the pair's and the triple's ([FL] `:4929`, `:4985`; `.fsi:2799`, `:2805`); (iii) as landed. After the decision: **one** rung on walk and the library; the compiled half follows the switch-over (the prelude declares no tuple `=`, the same paragraph).
- **b2** `references/revival-changes.md:95`: "To get an infinity, overflow run-time arithmetic: for `t: RR64 = 10.0^308`, `t TIMES 10.0` is `Infinity` under walk. `x.isInfinite` tests for one." No row holds the workaround. Row 95 NV (`library gap vs spec (library)`, both: no `∞`, `INFINITY`, `INF` or bare `infinity`; `Library/Constants.fss:17`'s `infinity : RR64 = 1.0 / 0.0` works under `import Constants.{infinity}`); row 863 C; row 980 C. The revised text keeps the object: "The object named `∞` has type `ExtendedIntegerValue[\true,0,true\]`" (`Specification/basic/expressions/literals.tex:371-374`). His words: 07:24 and 06:35 UTC on 11-22 (`coordinator/HELD.md:13`, `:17`). **Forks**: (1) how a program names an infinity: the text's `∞` as a static value that converts where `RR64`, `RR32` or `QQ` is declared, as P-174's numerals do; a constant of the default library (`Constants`' moved or re-exported); or both; (2) row 863: does a float division by zero give an infinity, as both paths and `Constants` do, or a NaN, as `Specification/basic/operators/opr-overview.tex:167-168` says (the row: "Which clause governs is open"); (3) row 980 (b6). After them: **part** for a library constant on both paths; **more** for the `∞` object (the parser refuses `∞`: row 95, "Syntax Error"). Goes: the two sentences; the third, on the prelude, is c3.
- **b3** `references/revival-changes.md:91`: "In a tuple arm, an undefined name is still read as a binder that takes any element ... (row 1064)". C, both. Fork D1, review-queue item 592 (default 1a, as landed; the review recommends 1b). The batch after's item 6 takes one rung "if he answers items 592, 1081 and 1068".
- **b4** `references/compiler.md:153`, second half: "The checker also refuses as unreachable a clause at a type that the selector's static type excludes ... (ledger row 1081). Delete such a clause". C, compiled. Review-queue item 598 (default: the refusal kept). Item 6, as b3. Row 1068 (walk's type-only element, NV) is item 6's too; the skill cites it nowhere.
- **b5** `references/revival-changes.md:97`, `references/interpreter.md:27`, `references/compiler.md:152`: "Such a parameter of 2^31 or more is a `ZZ64` under walk, and raises an error on the compiled path (row 962)"; "Assert no value for it in a test." C. Review-queue item 461, no default: refused at load, `IntegerOverflow`, or a `ZZ64`. Walk's half is on Q-walk's line (`PLAN.md:96`). After it: **part** on each path (`runtimeSystem/MethodInstantiater.java` `natMethod`, `compiler/runtimeValues/FZZ32.java:26-30`).
- **b6** `references/interpreter.md:29` and `references/compiler.md:151`: "The rules do not say whether it is an error, so assert no value for it in a test." Row 980 C, both. Review-queue item 502, no default. After it: **part** (`interpreter/evaluator/values/Numerals.java` `radixPoint`, the checker's default).
- **b7** `references/compiler.md:156`: "The rules do not settle which is right (ledger row 1041)." C, both. Review-queue item 562, fork L1 (default as landed).
- **b8** `references/compiler.md:181`: "No decision says which is right. Assert neither path's answer in a test (ledger row 786)." C. Review-queue item 9 (default both paths as they are).
- **b9** `references/interpreter.md:87`: "No decision says which is right ... (ledger row 713)." C. Appendix I's "Passages not yet revised" (the row).
- **b10** `references/interpreter.md:77`: "a check that the specification does not state ... (ledger row 894)". C, compiled. Review-queue item 356, no default.
- **b11** `references/revival-changes.md:68`: "in a generic object whose `T` stayed open, a call `pick((1, 2))` ... runs the first (row 663)". C, walk. The `revival-inference` callout of `basic/inference.tex` (F-143) does not settle a tuple of the open parameter.
- **b12** `references/revival-changes.md:32` and `references/compiler.md:185`: "The checker refuses such a redeclaration where an object reaches the method of a generic self-typed trait along two paths (row 1037)"; "Assert neither path's answer in a test". NV. Review-queue item 559, fork M1 (default as landed).
- **b13** `references/compiler.md:193`: "The checker lets a member that it checked under the condition be called where the condition fails (ledger row 773)." NV, compiled. Waits on review-queue item 177 (`PLAN.md:306`; default "with the members").
- **b14** `references/compiler.md:194`: "none for an extender that the clause does not list (ledger row 752), and a crash at a call ... (ledger row 756)". Row 752 NV `design limit`: opening such a parent costs `List` a second opening (the row); row 756 C. Each needs the reading of the clause decided.
- **b15** `references/compiler.md:173`: "The compiled dispatch ignores the contravariance of a parameter of arrow type ... look here first." Row 851 C, compiled. `fortress.disable.contravariance` (`ProjectProperties.java:327-328`); `OverloadSet` throws on the contravariant branch.
- **b16** `references/compiler.md:118`, `:127`: varargs bindings not rewritten, and not checked in the stages (row 849). C, `deliberate (parser)`: P-58 does not name varargs (the row).
- **b17** `references/library.md:38`: "each static parameter's name counts (ledger row 836)". C, compiled: "Export Statements" names no static parameter (the row).
- **b18** `references/revival-changes.md:134`: "walk takes a `Maybe` as an `if` condition ... so do not write a `Maybe` condition." Row 746 NV `deliberate (walk)`: "a default awaiting the curator's review, not a decision (F-239)". The team's `maybeTest` and `naturalsTest` rely on it.
- **b19** `references/revival-changes.md:136`: "Walk runs it, except in a method that implements an abstract one (row 405)." NV, both. Review-queue items 551 and 552, no default (the types that a declaration leaves out).
- **b20** `references/tests-writing.md:32`: "It and `=/=` call a type's own `=` only if the type extends a `FortressLibrary` trait that declares `=` (ledger row 807)". NV, walk. The library's `=/=` and `assert` call `=` in `FortressLibrary`'s scope ([FL] `:96`, `:98`, `:307`), where a program's own functional `=` is out of reach, as for row 30's top-level `opr`. Fork: whether library code reaches a program's functional methods, a rule of scope that no decision covers.
- **b21** `references/interpreter.md:141`: "Extend `WriteStream` ... instead." (row 928). NV `design limit (library)`. Review-queue item 385 (default: gated as a design limit). Ways: refuse such an extender at load, or a `comprises` clause, which cannot name the private native objects (P-164).
- **b22** `references/interpreter.md:59`: "refuses a program's own top-level type that has the name of a type of `FortressLibrary`, such as `Index` ... Give such a type another name." **No row.** Fork: whether a component's own declaration may reuse a name of the implicitly imported core apis (`Specification/basic/components/source-code.tex:306` says only that they are imported; `Specification-1.0-frozen/basic/declarations.tex:533`, "No other shadowing is permitted"). File a row with the answer.
- **b23** `references/compiler.md:148`: "If the body needs the value at one instance only, bind it once" (row 957). NV, compiled. Review-queue item 450, fork A5 not built (default: the component's class, as landed); P-176 says one value for each instance. After it: **one** rung (a static field in each instantiated class, filled at load: the class loader and [CG] `numeralCoercionSiteDesc`).

## (c) Removed by work on the road

The switch-over: the compiler's prelude is deleted and its defects go with it (P-37, P-38; `revival-changes.md:7`, "A sentence that opens 'Until the switch-over' states a limit of the compiler's library").

- **c1** `references/revival-changes.md:48`: "Until the switch-over, the compiler's prelude declares no `Index` ... write the bound only in code that runs under walk". P-37.
- **c2** `references/revival-changes.md:64`, last sentences: "Until the switch-over, the compiler's library declares no `=` over `Any` and none on tuples. Its own `≣` ... (row 908)". Row 908 NV: "P-38 keeps its text until the prelude goes". (Tuples of four and more stay b1.)
- **c3** `references/revival-changes.md:95`, last sentence: "the compiler's prelude declares neither `TIMES` nor `isInfinite`". P-37. (His question of 06:35 on 11-22, "Why handle the compiler prelude's missing operations?", is answered by the deletion.)
- **c4** `references/revival-changes.md:110`: the prelude's getters (row 349): "Closes at the switch-over (P-37)" (the row).
- **c5** `references/revival-changes.md:114`: the prelude's integer powers (rows 441, 523): "Closes at the switch-over (P-38)" (both rows).
- **c6** `references/revival-changes.md:116`: "the compiler's library has no `QQ` and declares `/` only at `RR64`". P-37 (his 08:27 question on 11-23, "Is this caveat still needed?": yes, until the deletion).
- **c7** `references/compiler.md:45`: the prelude refuses a varargs parameter (fork G4, P-37); row 1086, "Give the varargs declaration its own name": the batch after's item 5.
- **c8** `references/compiler.md:47-56` and `SKILL.md:80` ("fails at some constructs that walk runs"): rows 1091, 1099 and 994 (item 1), 1098 (item 2, once review-queue item 616 gives it a default), 1101 and 1102 (item 3). `reviews/batch-34b-review.md`, Part 5.
- **c9** `references/compiler.md:58`: "compile the `FortressLibrary` component first ... (ledger row 1100)". Item 5, "now with row 1100 beside it".
- **c10** `references/compiler.md:72-77`: row 818's forms. Item 5, "the other forms of row 818".
- **c11** `references/compiler.md:85`: row 1088. Item 5's checker gaps (`CLIMB-BATCH-34.md`, "For the batch after", item 3, lists 1088).
- **c12** `references/compiler.md:91`, `:93`: the prelude's arrays and its `ZZ32` loops. P-37.
- **c13** `references/compiler.md:101`: "An array of `RR64` values is to be stored as an unboxed `double[]`. The code generator does not build it yet." P-84, P-85, the array design (`PLAN.md:112`).
- **c14** `references/compiler.md:123`: "Until the switch-over, a compiled test cannot reach the interpreter's library's bindings." P-37. Already partly false: a one-library run test reaches them since climb batch 34b (F-396).
- **c15** `references/compiler.md:134`: "Bind a helper of another class." (row 368; F-321's `StringVector`). `PLAN.md:66`: row 368 "goes with the names work"; `StringVector` is the prelude's (P-37).
- **c16** `references/compiler.md:138`: the prelude's `print`, `println` and `||` at `Object` (F-296), and row 965, "Put a string first". `PLAN.md:84` ("Until it lands ... (F-296)") and `:88` (row 965 "retires with the prelude").
- **c17** `references/compiler.md:139`: rows 1059 and 528. `PLAN.md:87`.
- **c18** `references/compiler.md:140-143`: rows 1054 (item 4), 1055 and 1056 (item 5).
- **c19** `references/compiler.md:145`, second half: "the calls written in the compiler's prelude do not fork ... (ledger row 982)". P-37. Its residue, the path test of `compiler/codegen/ParallelismAnalyzer.java:197-203` for the words `CompilerLibrary` and `CompilerBuiltin`, which also stops a program under such a path from forking, should go with the prelude.
- **c20** `references/compiler.md:149`: "Write `i.asRR64` for a `ZZ32` value `i`." (row 442): "Closes at the switch-over" (the row).
- **c21** `references/compiler.md:150`: rows 1074, 1075. Item 5 ("1070 to 1075"); a55 joins them.
- **c22** `references/compiler.md:159`: row 1103. Item 3.
- **c23** `references/compiler.md:160`: rows 1012, 1009. Item 5.
- **c24** `references/compiler.md:163`: row 1067. Item 5.
- **c25** `references/compiler.md:164`: row 1072. Item 5.
- **c26** `references/compiler.md:165`: row 1071. Item 5.
- **c27** `references/compiler.md:167`: row 1089. `PLAN.md:87`.
- **c28** `references/compiler.md:168`: row 1080. Item 5.
- **c29** `references/compiler.md:169`: row 1084. Item 5.
- **c30** `references/compiler.md:170`: row 1085, both paths. Item 5, "row 1085's build or refusal": the item holds its own fork (review-queue item 602, fork G3).
- **c31** `references/compiler.md:171`: row 1087. `PLAN.md:87`.
- **c32** `references/compiler.md:172`: "An api and the component that implements it must have the same name." Row 320: "part of its design (P-33)" (`PLAN.md:84`).
- **c33** `references/revival-changes.md:43` and `references/compiler.md:182`: rows 1094 ("Declare the object's method at `T`'s return type") and 1097 ("Check such a pair against the rule yourself"). `reviews/batch-34-review.md`, Part 5, item 3, which the batch after's item 5 keeps.
- **c34** `references/compiler.md:183`: "Write `F extends Gen` in place of `F extends H`." (row 1093). The same.
- **c35** `references/compiler.md:190`: row 1015. Item 5.
- **c36** `references/revival-changes.md:41`: "In that arm, bind `self` at the returned type" (row 1070). Item 5.
- **c37** `references/revival-changes.md:124`: "Write both arguments of `BIG MIN_MAX`" (row 1007). Item 5.
- **c38** `references/tests-writing.md:32`, last sentence, and `references/build-and-caches.md:103`: the prelude's two-value `assert`; "the compiler's apis have the `Compiler` prefix". P-37.

The array design:

- **c39** `references/revival-changes.md:99`: "The library's factories `array1` and `array2` give a `Vector` or a `Matrix` only at the eight number types". Row 729 (not cited in the skill), C. `PLAN.md:115`: "a factory that reads the element bound in place of its fixed list of the eight number types ... in the rung that builds the factory", when the array design returns (P-85), with P-160's second step.

Walk running the checker (P-12):

- **c40** `references/revival-changes.md:55`, `:103`: rows 511 and 395, tuples and varargs not promoted. Q-walk: "the devices for rows 395 and 511 ... unless a walk rung takes them sooner" (`PLAN.md:96`).
- **c41** `references/revival-changes.md:103` and `references/interpreter.md:31`: "The rule converts at a declared return type too, but walk does not (row 387)"; "Write the value at the declared type." Q-walk, "row 387's return conversion".
- **c42** `references/revival-changes.md:103`: "Declare the function at the parameter's arrow type." (row 1083). Q-walk: "Rows 437's walk half, 395, 511 and 1083 are on its line".
- **c43** `references/interpreter.md:22`: walk's choice of a coercion by the run-time value. P-12: walk "then uses the static coercions that the checker inserts, in place of its choice on the run-time value (P-59)".
- **c44** `references/revival-changes.md:107` and `references/interpreter.md:28`: "To compare as the rules do, bind the numeral first" (row 1016). `PLAN.md:294`: "each ending when walk runs the checker (P-12) or in a rung of walk ... No batch holds a rung of walk"; review-queue item 525.
- **c45** `references/revival-changes.md:124`: "Write the argument there in a program for both paths." (row 1008). `PLAN.md:294`.
- **c46** `references/interpreter.md:19`: "Write the static argument, as `appT(half[\3\], v)`" (row 1018). `PLAN.md:294`.
- **c47** `references/interpreter.md:20`: "Declare it at the top level." (row 1020). `PLAN.md:294`.
- **c48** `references/interpreter.md:36-37`: rows 1024, 1025, an array literal at a `var` or an assignment. `PLAN.md:294`.
- **c49** `references/revival-changes.md:74`: "Under walk, write `mk[\ZZ64\]()`." (row 705). `PLAN.md:313`: "705 (closed by the switch-over)"; the line gives no mechanism (P-51 is the checker's rule).
- **c50** `references/interpreter.md:16`: "The checker refuses such a program, so do not rely on this in a program for both paths (ledger row 1021)." Row 1021 NV `design limit (walk)`, whose notes give P-12 as the cause; once walk runs the checker (P-12), the program is refused there.

A caution for the planner: P-12's step "is not yet designed" (`PLAN.md:96`), and `PLAN.md:294` offers "a rung of walk" as the other way for c44 to c48. Under P-180 these can be pulled forward; nothing in the record says P-12's step comes soon.

## (d) On a closer look, not a defect

- **d1** `references/tests-writing.md:33`, `SKILL.md:133`, `references/library.md:35`: a variable named after a functional method is refused. Row 92 is a `design limit`: the Working Draft permits no other shadowing (`Specification-1.0-frozen/basic/declarations.tex:533`).
- **d2** `references/interpreter.md:89`: walk refuses an overloaded function whose one parameter is a `T extends Any` written so. The revival's rule, "A functional which takes a single parameter of a parametric type bound by Any cannot be overloaded" (`OverloadedFunction.java`, `singleParameterBoundAny`, from `833420ce48`). Worth one check: the unwritten bound is exempt, though P-42 makes it `Any` too.
- **d3** `references/compiler.md:87`: "At an assumption of a trait, the call runs the trait's body, also where the object overrides it." The meaning of `asif` (`Specification/basic/expressions/type-annotation.tex`): dispatch as if the value were a `T`.
- **d4** `references/revival-changes.md:130`: walk refuses a `simpleJoin` at `Any`; "do not copy" the team's tests. It enforces `AssociativeReduction`'s rule (F-144).
- **d5** `references/revival-changes.md:101`, `references/tests-writing.md:35`: a test of run-time arithmetic needs a variable operand. P-173's fold.
- **d6** `references/revival-changes.md:112`: "declare your function once for each number type". P-165.
- **d7** `references/revival-changes.md:68` and `SKILL.md:135`: walk's `OPEN`. The revival's design (F-143); only row 663's case is open (b11).
- **d8** `references/compiler.md:145`, first half: "write no compiled program that relies on the order in which its arguments are evaluated". Parallel by default, the language's rule.
- **d9** `references/compiler.md:99`: "The emitted classfiles stay at version 1.6 ... Do not raise the version." A constraint of the class loader's ASM rewriting, which keeps no frames; it changes no program's behaviour.
- **d10** `references/compiler.md:214`: a crash of the checker hides the Java stack behind `-debug stacktrace`. A design of the messages.
- **d11** `references/interpreter.md:99-105` and `references/library.md:56`: "a library edit can stop every program at load". The consequence of walk's load checks, which a29 and the [OF] entries make correct.
- **d12** `references/tests-writing.md:42`: a test whose output holds `failure` fails. The team's harness contract.
- **d13** `references/tests-writing.md:75`, `:77`, `:112`: the `XXX` prefix, the two `.test` files of a run-time pair, "Never use `run_out_contains=PASS`". The harness's design of expected failures.
- **d14** `references/tests-writing.md:142`: a range of sixteen or fewer runs in index order under walk. The library's grain size, a design, as P-175's for the compiled path.
- **d15** `references/tests-running.md:39`, `:46`, `:78-85`, `:118`: suites that share and delete test caches, a `-D` switch on the `ant` line, what no suite checks. The build's design and a coverage statement.
- **d16** `references/build-and-caches.md:57`, `:133`, `:145`: entries compared with their sources only; the bootstrap stubs; an old jar linked after a failed library compile. The caches' design, which the build's stamp guards.
- **d17** `references/library.md:54-55` ("For another component of the one library: no step, until the switch-over") and `references/gate.md:83` (`run-ladder.sh`'s defaults): gaps of the record's stages and tools, not of the tree.
- **d18** `references/toolchain.md:7`, `:21`: `Opcodes` hides ASM's in the bytecode optimizer, which nothing calls; the template parser's copy of the grammar. A naming hazard in dead code, and a duplication by design.
