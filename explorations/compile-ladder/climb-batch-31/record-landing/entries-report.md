<!-- The entries writer's report for climb batch 31's record-landing, run 1: for each change of owed.md whose writer is entries (C2 to C19, C23 to C26), the old text and the new, its meaning, its size, and the questions left. -->

# The entries writer's report, climb batch 31, run 1

## The files

- `record.apply`: 28 FACTS entries, each with one provenance line. Commit: the landing, `7858d0e97b`.
- `rows.rewrite`: rows 112, 340, 996 and 1003.
- `clean.txt`: the 28 new entry lines alone.
- No `cut-only.txt`: no POSITIONS entry changes. The sort found none owed (C22), and I found none.

For each change below, I give the sentences that changed, old and new. Every other sentence of the entry is word for word as it stands at AT (`abb18ec0a`). The whole old line is in `FACTS.md` at AT and in `entries.md`; the whole new line is in `clean.txt`.

Sizes are characters of the whole line, at AT and new.

## The pass on the batch's entries

### C2, F-75 (2044 to 1924)

- Old: "The Return Type Rule compares every instance of the less specific declaration, except that a type parameter standing as a whole parameter type where the more specific declaration has an object type is read as its union with that object type, so that only the instances whose domain meets the object are compared; the type group's 2011 paper (`Papers/Types/`) sets aside the instances whose domain is `Bottom`."
- New: "The Return Type Rule leaves out the instances of the less specific declaration whose domain cannot meet the other's only where the less specific declaration has a type parameter as a whole parameter type and the more specific one has an object type there; a worker chose that width, and the curator has not decided it. The type group's 2011 paper (`Papers/Types/`) sets aside every instance whose domain is `Bottom`."
- Old: "So it accepts ... (row 542, fixed; F-376), and the merge of the built-in number types with their objects (P-178) brings no refusal to pairs over them."
- New: "So the rule accepts ... (row 542, fixed; F-376)." and, after the sentence on row 1048: "By reading, not by a run, it brings no refusal to such pairs over the built-in number types once they are merged with their objects (P-178)."
- Old: the seven test names. New: "Gated by `compiler_tests/OverloadGeneric*`, `OverloadBoundNamesForced` and `OverloadReturnObjectDomain`, which accept; `XXXOverloadReturn*`, `XXXOverloadGenericObjectDomainByPosition` and `XXXOverloadPermutedStaticParams`, which pin the two rules' refusals and row 1048's." The glob `XXXOverloadReturn*` matches exactly the three tests that the old line named one by one.
- Meaning: unchanged for the rule. Two changes of scope, each from its ground: the merge clause is now stated as by reading (the review, "What I did not do"), and the width at an object type is stated as a worker's choice (the review, section 2, X1: "Landed narrower than the fork's words").
- Past 600: the title and the rule's scope (question 1); the width as a worker's choice (question 1: a worker would otherwise read it as decided); the examples of row 542 and row 1048 (question 2); the merge clause (question 1, for rung O); the library sentence (question 1); the tests (evidence). Moved out first: the union `T ∪ C` to the report, which holds it.

### C3, F-225 (2842 to 2725)

- Old: "A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]`: the code generator casts `self` there (row 695, fixed; F-377). A function expression or a local function that returns `self` so still fails verification (row 1050), as does a default body that returns `self` in one arm of a conditional and another value in the other, the shape of `StandardTotalOrder`'s `MIN` and `MAX` (row 1051), and a default body that calls ... (row 1052)."
- New: "A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]` (row 695, fixed). F-377 gives the cast that does it and the shapes that still fail verification, among them a conditional that returns `self` in one arm, the shape of `StandardTotalOrder`'s `MIN` and `MAX` (row 1051). A default body that calls a method on a value of the self-type parameter dies at load with a `ClassCircularityError` where the object lists the trait first (row 1052)."
- Meaning: unchanged. Row 1050 is now reached through F-377, which names it.
- Past 600: the entry's sentences on the checker's rule are unchanged and were past 600 at the base. The compiled sentences stay by question 1 (what the cast does not reach blocks the library after the merge) and question 5 (the pointer to F-377). I moved out row 1050's detail, to F-377.

### C4, F-240 (2160 to 2323)

- Old: "The count table records no seconds, so its time is the file times of the gate's log; the distance stage ..."
- New: "The count table records no seconds, so its time is the file times of the gate's log, which do not span what rung runs of that night timed as the whole stage, so no fall since climb batch 32's gate is shown; the distance stage ..."
- Old Detail: opens with `reviews/batch-32-review.md`, section 4. New Detail: opens with `reviews/batch-31-review.md`, section 4, then the list as it was.
- Meaning: one clause added, from the review, section 4. No figure and no other sentence of the commit stage's changed. The clause gives no figure; the four timings, 88.5 s to 93.6 s, are in the provenance note.
- Past 600: the entry grows by the clause alone (question 2: without it a reader takes "about 75 s against about 95 s" as a fall). I moved nothing out, since the owed clause was the only change and the entry's other sentences are the commit stage's.

### C5, F-372 (1752 to 1821)

- Old: "For the class of a trait or an object the code generator gathers the methods of the type and its supertypes without each declaration that a type strictly below its own declares again at the same parameter types, self apart, compared at the instance that the extends clauses give (`STypesUtil.allMethodsNotReplaced`)."
- New: "For the class of a trait or an object the code generator leaves out each declaration that a type strictly below its own declares again at the same parameter types, self apart."
- Old: "no longer stops a class at load". New: "does not stop a class at load".
- Added after row 732's sentence: "A worker chose both readings, and the curator has not decided them; by the traits chapter's text, an object that reaches one method along two paths, one through a trait that declares it again, inherits both declarations, and the checker refuses that form where the traits are self-typed and generic (row 1037)."
- Old: "A functional method with self not first is no longer written beside its dispatch method (row 571, fixed); behind it, an object's dispatch method still tests the receiver in place of the argument (rows 573 and 1038). The gatherings for the dispatch methods still use the schema comparison of `removeIdenticallyCoveredMethods`, and an object that reaches a generic trait's method along two paths, one through a trait that declares it again, is refused by the checker (row 1037)."
- New: "A functional method with self not first is not written beside its dispatch method (row 571, fixed), so such a class loads; but an object's dispatch method still tests the receiver in place of the argument, and a call can answer wrongly with no error: with an own `mark(x: K, self)` beside an inherited `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1 (rows 1038 and 573)."
- Meaning: changed by its ground. The entry now says what row 1038 does: a wrong answer with no error (the review, section 2, "M's consequence, row 1038"; row 1038's notes). The two readings are stated as a worker's choices (forks M1 and M2). "Generic trait" in the sentence on row 1037 is now "self-typed and generic", as row 1037's notes give it.
- Past 600: the title and the rule (question 1); row 990's library shape (question 1); row 732's rule (question 1); the choices and row 1037 (question 1); row 571 and the wrong answer (question 1: a worker would otherwise trust a class that loads); the tests (evidence). Moved out first: `STypesUtil.allMethodsNotReplaced` and the comparison at the instance, to the report, "What changed and why" (question 4). In the fix round the limit of the dispatch methods' gathering came back as one sentence, without the member's name (see "The fix round").

### C6, F-373 (2097 to 1975)

- Old: "`CodeGen.forLabel` keeps a new `LabelExit.Target` in an immutable local under the label's name and takes, in a handler, the exits that name it; `CodeGen.forExit` throws `LabelExit.of(value, target)` (`compiler/codegen/CodeGen.java`, the two members above `defaultCase`; `runtimeSystem/LabelExit.java`). A function expression or a task whose body exits captures the target as it captures any immutable variable, because every identifier counts as a free variable (`compiler/codegen/FreeVariables.java:98`) and the checker lets no variable share a label's name (`scala_src/typechecker/impls/Misc.scala:704`)."
- New: "`CodeGen.forLabel` makes a new target for each evaluation of the block and takes, in a handler, the exits that name it; `CodeGen.forExit` throws `LabelExit.of(value, target)` (`runtimeSystem/LabelExit.java`). A function expression or a task whose body exits captures the target as it captures any immutable variable."
- Old: "The paths differ on a `catch` of `Exception` around an exit (row 1040), on an exit after its label block has completed (row 1041) and on the evaluation that an exit leaves where the block is evaluated again inside itself (row 1042)."
- New, moved before the limits: "Three of the compiled answers were chosen as the path was built, and the curator has not decided them; walk answers each otherwise: which evaluation an exit leaves where the block is evaluated again inside itself (row 1042), whether a `catch` of `Exception` takes an exit (row 1040), and what an exit is after its label block has completed (row 1041)."
- Old: "... stops the code generator (row 340), so a number beside an exit's value is bound to a typed variable first."
- New: "... stops the code generator (row 340), though by P-50 the numeral takes the label's expected type, so a program binds such a number to a typed variable first."
- Meaning: changed by its ground. The three answers are stated as chosen, not decided (the review, section 2, L1 and the exit through a `try`; finding 2). Row 340's case is stated against P-50 (the review, "Findings for the record").
- Past 600: the title and the mechanism (question 1); the forked arms (question 1); the library's `indexOf` (question 1); the three answers (question 1); the four limits (question 1); the test (evidence). Moved out first: the handler's place in the exception table's order, `FreeVariables.java:98`, `Misc.scala:704` and the members' place in `CodeGen.java`, to the report, "What changed and why" (question 4).

### C7, F-374 (1596 to 1683)

- Old: "... by the code of a top-level `var` (`VarCodeGen.MutableFieldVar`, a `MutableStaticBinding`), and a loop body or a function expression in the object's method captures the cell, where before it captured a copy of the value."
- New: "... by the code of a top-level `var`, and a loop body or a function expression in the object's method captures the cell. A worker chose the cell, and the curator has not decided it."
- Old: "... (row 112), is no longer strictly equivalent to another built alike."
- New: "... (row 112), is not strictly equivalent to another built alike: `V(1) === V(1)` is `false`, since `SEQV` compares the cells by identity. The one library declares one, `Lazy` (`Library/Lazy.fss:18`)."
- Meaning: changed by its ground. The equivalence is stated as it is now (row 112's notes), with the library's one declaration (the review, section 2, A1). The cell is stated as a worker's choice (fork A1). I checked `Library/Lazy.fss:18`: `value object Lazy[\T\](var s : State[\T\])`.
- Past 600: the title and the cell (question 1); the choice (question 1); rows 319 and 641 (question 1); `atomic e` and its limits (question 1); what it means for the work (question 1); row 112 and `Lazy` (question 1: the library meets it); the tests (evidence). Moved out first: `VarCodeGen.MutableFieldVar` and the copy captured before, to the report (questions 3 and 4).

### C8, F-375 (1667 to 1827)

- Old: "...: its result must lie below the generic's with the type parameters standing for themselves, or below an object type of its own that stands at a parameter of the type parameter that the generic returns, or below the generic's result at the instance that holds its domain where a static argument of a parameter type fixes each type parameter of that result (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed)."
- New: "...: the pair loads where the plain result lies below the generic's by one of three readings that the report gives, and is refused in the rule's name where a reading shows that it breaks the rule (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed)."
- Added after row 997: "The coordinator chose to read no `comprises` clause, and a worker chose the rest; the curator has not decided them."
- Old: "So the merge of the number types with their objects meets neither defect. Four kinds of a program's own pair changed their verdict at load: two are now refused, and two now load."
- New: "So the merge of the number types with their objects (P-178) meets neither defect, but after it every generic-beside-plain pair over the five number types is read on its declared domains, and no run has measured that (F-361's probe ran without the reading). Where the reading and the team's shortcut differ, some pairs are refused and others load; the report runs each old against new."
- Meaning: changed by its ground. The merge clause is bounded by the review, Part 5, "To add, 1". The choices are stated: fork V4 the coordinator's after the check of the record, forks V1 and V2 a worker's. The sentence on the four kinds no longer tells a change; it points to the report's "Programs run old against new", now in the Detail.
- Past 600: the title and the reading (question 1); its three limits (question 1); the value check (question 1); the choices (question 1); the merge clause (question 1, for rung O); the old-against-new pointer (question 4); the tests (evidence). Moved out first: the three conditions of `returnRuleAtObjectArguments`, to the report, "What changed and why" (question 4). It still grew by 160, the owed clauses of the merge and of the choices.

### C9, F-376 (965 to 1098)

- Old: "So a generic declaration beside a declaration on an object type verifies at every instance, where before the class of the generic's instance at another object type failed, 'VerifyError: Bad return type'. A dispatcher whose range is no static parameter has no such cast (row 699) and writes the bytecode that it wrote before. Test: the `run` step of `compiler_tests/OverloadReturnObjectDomain`."
- New: "So a generic declaration beside a declaration on an object type verifies at every instance, where without the cast the class of the generic's instance at another object type fails, 'VerifyError: Bad return type'. A dispatcher whose range is no static parameter has no such cast (row 699). Test: the `run` step of `compiler_tests/OverloadReturnObjectDomain`; its call at `Box[\Square\]` fits two declarations, and whether its verdict can vary with the checker's order among tied generic candidates (row 499) is not established."
- Meaning: unchanged for the cast. The evidence's uncertainty is added from judge-gate.3, as the review cites it in section 2, "The gate judge's withdrawal".
- Past 600: the title and the cast (question 1); what it makes verify (question 1); row 699 (question 2); the test and its uncertainty (evidence). Moved out first: "and writes the bytecode that it wrote before", a change (question 3).

### C10, F-377 (1786 to 1783)

- Old: "No cast is added where the value's type is a subtype of the declared type by `extends`; one is added, where the base emitted none and the class verified, at a declared trait type strictly below self's trait, since the verifier does not check an interface type. A later cast site gates on the expression's type before it compares types: asking the type analyzer at every argument stopped a link over a `bool` static argument."
- New: "An assignment from outside an object to its `var` field fails at run time, `NoSuchMethodError`, also for `c.r := self` at a listed type (row 1053). No cast is added where the value's type is a subtype of the declared type by `extends`. One is added at a declared trait type strictly below self's trait, where the verifier, which checks no interface type, needs none; a worker chose it, and the curator has not decided it."
- Meaning: changed by its ground. The cast at a trait type below self's trait is stated as it is, and as a worker's choice (fork K1; the review, section 2, K1). Row 1053's limit at an assignment is named (row 1053's notes).
- Past 600: the title and the sites (question 1); what verifies (question 1); the reading of `self` alone (question 1); the casts that do not happen and row 1053 (question 1); the cast where none is needed (question 1); the tests (evidence). Moved out first: the later cast site and the link it stopped, to the report (question 4).

## The sentences that the landing made false

### C11, F-34 (2282 to 2434)

- Title, old: "Against the interpreter's library the code generator refuses 24 declarations ...". New: "Against the interpreter's library, on the code of `832f7d0d91`, the code generator refuses 24 declarations ...".
- "`label` 4 (row 81)" is "`label` 4 (row 81, fixed since)"; "`atomic` as an expression 1 (row 875)" is "`atomic` as an expression 1 (row 875, fixed since)".
- Old: "It sees no class that is emitted and fails when it loads: a method written twice (row 990), a missing cast at a `comprises` type (row 991), a method over a tuple index type (row 992), a body inherited through an api's trait (row 732)."
- New: "It sees no class that is emitted and fails when it loads: a method over a tuple index type (row 992), and on that code a method written twice (row 990), a missing cast at a `comprises` type (row 991) and a body inherited through an api's trait (row 732), each fixed since."
- Old: "Measured twice on the code of `832f7d0d91`, with one result." New: "Measured twice on the code of `832f7d0d91`, with one result; the count on code with rows 81 and 875 fixed is not taken."
- Meaning: unchanged; the count is bound to its code. No new figure.
- Past 600: as at the base; it grows by the owed clauses alone (question 2: without them a reader takes 24 as today's count).

### C12, F-352 (2002 to 2090)

- "the library's `DOT` and `SUM` (row 732)" is "(row 732, fixed since)".
- Added to the first kind's sentence: "; rows 81, 990, 991 and 732 are fixed since, and rows 624, 315 and 992 stand."
- Meaning: unchanged; the rehearsal stays as measured on `832f7d0d91`.
- Past 600: as at the base; it grows by those clauses alone (question 2).

### C13, F-354 (989 to 925)

- Old: "..., and a result that depends on the order can come and go between builds, as the choice between two copies of one method does (row 990)." New: "..., and a result that depends on the order can come and go between builds."
- Meaning: unchanged. The example goes. I did not put row 996's `CMP` order in its place: it is the order itself, not a result that depends on it, and row 996 already holds it.
- Past 600: as at the base; it shrinks.

### C14, F-361 (1351 to 1409)

- Title, old: "...; the merge widens three open gaps to the five types." New: "...; on that code the merge widens three gaps, fixed since, to the five types."
- Old: "On `main` the five traits are not merged." New: "On `main` the five traits are not merged, and rows 998, 997 and 542 are fixed."
- Meaning: unchanged; the probe stays as measured on `832f7d0d91`.

### C15, F-174 (2149 to 2178)

- Old: "In row 542, the checker refuses a generic declaration beside a plain one over an object type, as `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`."
- New: "In row 1048, the checker refuses a generic declaration beside a plain one over a tuple of object types, as `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)`."
- Meaning: unchanged; the sentence names the set of that kind that the checker still fails.

### C16, F-87 (1269 to 1227)

- Old: "`InferResultOnlyLabelBody`, a type-check test, since the code generator has no `label`, and". New: "`InferResultOnlyLabelBody`, a type-check test, and". I checked the test: its `.test` file runs `typecheck` only.
- Meaning: unchanged.

### C17, F-252 (4179 to 4330)

- Old: "Walk's load check first compares two overloads parameter by parameter, and a pair that it finds excluding loads."
- New: "Walk's load check first compares two overloads parameter by parameter, and a pair that it finds excluding loads, except a plain declaration inside an own generic's declared domain where the two lists differ only at object types, which it reads on the declared domains (F-375)."
- I checked the claim at `OverloadedFunction.java:513-527` in the worktree (`differAtObjects`, `plainInsideGeneric`, `validOnDeclaredDomains`).
- Meaning: unchanged; the sentence states the exception that the tree now has.
- Past 600: it grows by that clause alone (question 2).

### C18, F-257 (1907 to 2034)

- Added to the second sentence: ", and where that check finds a plain declaration inside an own generic's declared domain excluding at object types alone (F-375)".
- Meaning: unchanged. Rows 539, 550 and 779 stand as the entry has them.
- Past 600: it grows by that clause alone (question 2).

### C19, the line citations that the landing moved (17 entries' lines checked, 11 entries changed, sizes unchanged)

Each citation was checked at its member in the worktree against the base (`c1ce2a35e`).

- F-302: `CodeGen.java:5595-5602` to `:5728-5735` (the springboard's superclass).
- F-351: `CodeGen.java:1835-1867` to `:1942-1974` (`forAtomicBlock`); `:2169-2173` to `:2284-2288` (`forTry`), which the review's script skipped.
- F-268: `CodeGen.java:6318-6323` to `:6451-6455`, the branch for `AnyType`. The review's script gave `:6451` for the range's first line; the range at the base began one line before that branch, on a blank line.
- F-315: `CodeGen.java:3087-3089` to `:3206-3208`.
- F-369: `CodeGen.java:6528` to `:6661` (`forTupleVarDeclPrePass`).
- F-258: `OverloadingOracle.scala:327` to `:367`, twice. Its two citations of `OverloadedFunction.java`, `:935` and `:1041`, stay: each names its commit (`at a93fb3bfd`, `at 84957e6ef`), so each is right as written. The sort's mapping to `:1032` and `:1138` would be wrong: those lines in the worktree are a closing brace and a loop, not `domainsExcludeTogether` (now `:1103`) or `excludesAtMeet` (now `:1218`).
- F-349: `OverloadedFunction.java:2448` to `:2545` (`bestMatchWithCoercion`); `:2511-2531` to `:2608-2628` (`mostSpecificThroughOthers`).
- F-366: `OverloadedFunction.java:2325-2428` to `:2422-2525` (`bestMatchForNumerals`).
- F-367: `OverloadedFunction.java:2970` to `:3067` (`type()`).
- F-173: `inference.tex:284-346` to `:285-347`; also `:447-511` to `:448-512`, which the review's script missed. `:45-125` did not move.
- F-175: `changes.tex:3464-3660` to `:3474-3670`; also `:3730-3737` to `:3740-3747`, which the review's script missed. `:1674-1677` did not move.
- Meaning: unchanged in each.

## The ledger

### C23, row 112 (notes 694 characters)

- Cut: "at any phase", "(`true` before)", and ";" before "The compiled path" is now ".".
- Changed in the fix round: "The compiled path compiles it too: `value object V(var n: ZZ32)` runs; with a `var` field kept in a cell, `V(1) === V(1)` is `false`" is now "Compiled, `value object V(var n: ZZ32)` runs with its field in a cell, and `V(1) === V(1)` is `false`". Round 1 had cut the declaration of `V` and the fact that it runs without saying so.
- Added: "The one library declares one, `Lazy` (`Library/Lazy.fss:18`)."
- Meaning: unchanged; the library's declaration is named.

### C24, row 340 (notes 697 characters)

- Old: "a `label` block whose value joins a numeral with a `ZZ32` (`XXXLabelNumeralValueCompiled`; bind the numeral first). The coercion desugarer's `typecase` binds a pattern name."
- New: "a `label` block whose value joins a numeral with a `ZZ32` (`XXXLabelNumeralValueCompiled`; P-50 gives the numeral the label's type; kin: rows 1014, 1030, 1043; bind it first)."
- Also: "at unlike stacks, and ASM's" is "at unlike stacks; ASM's", for room.
- Cut for room: "The coercion desugarer's `typecase` binds a pattern name." The row's history holds the full text.
- Meaning: unchanged for the row's claim. The label case now names its decision, P-50, and its kin.

### C25, row 996 (notes shorter)

- Cut: "Row 990's choice between two copies of a method follows this order."
- Meaning: unchanged; the sentence was false since rung M.

### C26, row 1003

- Old: "Its estimate: rows 997 and 998 first, then the merge, then row 542. No batch holds it."
- New: "Neither library is merged on `main`; rows 997, 998 and 542, which the probe met, are fixed."
- Meaning: unchanged for the claim; the plan and the status go.

## Decisions not taken

- F-258's two citations of `OverloadedFunction.java`. I kept them, since each names its commit. Alternatives: repoint them to the members in the worktree (`:1103`, `:1218`) and drop the commits; or repoint as the sort mapped them (`:1032`, `:1138`), which would be wrong.
- F-354's example. I cut it. The alternative was row 996's `CMP` order, which is no result that depends on the order.
- F-376 and the place of its cast outside the rung's named files (C9's ground). I left it out of the entry: it is how the fix came about, and the review queue's item names the entry. The alternative was a sentence that a worker kept the cast there.
- F-373: whether all three answers are "chosen". The `catch` answer follows the specification's text and the plan asked for it; the review joins it to L1 in finding 2. I wrote one sentence for the three. The alternative was to state only the evaluation's identity as chosen, and the other two as walk's departures.
- F-374's sentence "a numeral as its value at a place of declared type waits for the checker (row 1043)". It is a status word, but no change names it, so I kept it.

## Questions for the curator

None. No source left a doubt that I had to keep as it stands.

## What I could not follow

- I could not run `python3` on a helper script or `awk` in this session without approval, so I mapped the citations with `grep` and `sed` on the base's files and the worktree's, member by member.
- I did not run `record.py apply` or `ledger.py rewrite` myself. `checks.sh` applies both files.

## The fix round

`check.md` named 11 failures in my homes, and `cold-read.md` named passages that it read two ways or could not resolve. `mech-1.md` had no failure. The sections above give round 1; where a fix changes what they say, this section holds. Sizes are now: F-75 2122, F-372 2087, F-373 2104, F-374 1746, F-375 1969, F-377 1928.

### From check.md

- C2, F-75 (fidelity): the merge clause now follows the sentence on `Circle` and names its pairs: "By reading, not by a run, the rule brings no refusal to the one library's pairs of a generic and a plain declaration over the built-in number types once they are merged with their objects (P-178)." Meaning: the bound as the review gives it.
- C3, F-225 (fidelity): "a conditional that returns `self` in one arm" is now "... in one arm and another value in the other", row 1051's condition.
- C5, F-372 (fidelity): restored as a limit, with no member's name: "A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not at the instance." Meaning: the entry again states that limit, which queue item 560 concerns.
- C5, F-372 (fidelity): row 1038's condition restored: "where the receiver itself has the own declaration's parameter type, a call answers wrongly with no error: with `object Pq extends { K, P }` declaring `mark(x: K, self)` beside `P`'s `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1".
- C8, F-375 (fidelity): "The coordinator chose to read no `comprises` clause and to leave unjudged a declaration that writes no return type; a worker chose the three readings and the check of value types; the curator has decided none of them." Meaning: the guard of point B2 is the coordinator's, as the review, Part 4, decision 2, gives it.
- C8, F-375 (fidelity): "is refused in the rule's name where a reading shows that it breaks the rule" is now "is refused, in the rule's name, where none of them holds", as `OverloadedFunction.java:518-524` does.
- C10, F-377 (fidelity): row 1053's condition restored: "An assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, fails at run time, ...".
- C11, F-34 (fidelity): "On the tree as it stands" is now "On that code without the patch". Meaning: the 11 refused declarations in 6 kinds are bound to `832f7d0d91`, as the 24 are.
- C19, F-258 (form): the space after the comma that round 1 lost is restored.
- C19, F-268 (fidelity): `:6451-6455` is now `:6452-6456`, the branch for `AnyType` whole. I had misread the line numbers by one.
- C23, row 112 (fidelity): the declaration of `V` and the fact that it runs are restored, as above. The notes are 699 characters.
- The note of check.md on F-361: the title's "on that code" is now "on `832f7d0d91`'s code".

### From cold-read.md, in the passages that I wrote

- F-75: the title read as skipping every instance that cannot meet. It is now "over every instance, save those whose domain cannot meet an object type". The refusal tests are now split: four pin the rules' right refusals, and `XXXOverloadReturnTupleDomain` pins row 1048's. "refuses" at row 1048 is now "wrongly refuses".
- F-240: the clause the reader could not parse is now "that time is not of one span with the whole stage, which rung runs of the same night timed longer, so it shows no fall since climb batch 32's gate, the one before". "the one before" answers the reader's doubt on the order of batches 31 and 32. Meaning: unchanged; still no figure.
- F-372: "a type strictly below its own" is now "a type strictly below the declaring type". Row 571's sentence is now "is written once, not again beside the dispatch method of the same name".
- F-373: round 1 cut the members' names, so "without the two members" had lost its referent; it is now "without `forLabel` and `forExit`". "binds such a number" is now "binds the numeral", as row 340 has it. The compiled answer to each of the three questions is now given, from rows 1042, 1040 and 1041.
- F-374: "waits for the checker (row 1043)" is now "is refused or fails verification, since the checker carries no declared type into it (row 1043)", from row 1043's claim. This also takes out the status word that round 1 had left.
- F-375: "the team's shortcut" is now defined where it first stands: two lists that differ only at object types, which the shortcut takes to exclude. "meets neither defect" is now "neither defect stands in the way of the merge".
- F-377: "at a single argument" is now "at the argument of a call with one argument, ... (`evalArg`; a call with several arguments casts each already)", from the report's table (`conditionallyCastParameter`).

### Growth

These fixes add words that the check and the cold reader asked for. F-372 (+335 over its size at AT) and F-375 (+302) grew most. Each new clause restores a condition, or answers a passage the reader could not resolve. I found no further detail to move out without losing a condition.

### Not changed, with the reason

- F-34's "in 8 kinds", which the reader could not reconcile with seven groups: the sentence is the probe's (`PROBES.md`, section 3), no change names it, and rows 822 and 812 may be two kinds. A question for the coordinator, not changed.
- F-258's two methods at `OverloadingOracle.scala:367`: that one line calls both `emptyED` and `meetEmptyWithBounds`, so the citation is right.
- The cold reader's other doubts lie in sentences that the landing did not touch (F-225's `Containment`, F-252's title, F-302, F-349, F-366, F-175 and others). No source given to this run settles them, so their wording stays.

### Questions for the curator

None.
