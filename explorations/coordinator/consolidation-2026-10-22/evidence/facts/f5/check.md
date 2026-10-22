<!-- The clarity workflow's check of FACTS chunk f5 (F-64 to F-67, F-69 to F-75 and the new entry split from F-70), 2026-10-22: each rewritten entry compared with the record's text and its sources, and the cold reader's answers with the source meaning, each failure classed with its wording, its concept's home, or the source that settles it. -->

# FACTS chunk f5: the check

Read on `main` at `34fbf49d4`. FACTS, its history, PLAN, POSITIONS, the review queue and the gap ledger are the same there as at the writer's base, `5ca623461` (`git diff --stat`, empty). For each entry I read the record's text (`facts-extract.sh 'F-N+'`), its history (`'history:F-N'`), the rows, report sections, tests and code it names, and `assessment.md`. I ran no Fortress program. The rewritten entries are the ones in `proposals.md`, which match `clean.txt` and `proposals.apply` line for line.

Classes: **fidelity** (the rewrite says more or less than its source), **concept** (the reader lacked a term; where it belongs), **wording** (a proposed text), **uncertain** (what source settles it, and whether I settled it).

## F-64, the ellipsis refusal in an api

**Fidelity.** The widening to every declared type is right: `checkDeclComprises` runs on every `TraitIndex` and refuses at `isApi && NodeUtil.isComprisesEllipses(si.ast)` (`TypeHierarchyChecker.scala:338-341`), and `XXX3q` pins it on `object O extends T` (`test_library/Compiled3.q.fsi:13-14`). One sentence now misstates what the note refuses.

- Rewrite: "The specification's text allows `...` in an api (...). Only a draft note refuses it, and a release build leaves draft notes out." By its antecedent, "it" is "`...` in an api". The note does not refuse that; it presumes it ("(and must therefore be in an API)") and refuses the api's declaring or importing an extender: "other traits may explicitly extend T, but these traits may not be declared or imported by the API" (`traits.tex:277-283`). The record's text had "allows it ... refuses it" with "it" the form `comprises { T, ... }` in an api that declares `T`, which was right.

**Comprehension.** The reader got the refusal. Two questions are left open by the wording, and the sources answer both.

- Is a type declared in a component refused? No. The refusal runs only when the checker checks an api (`isApi`, `TypeHierarchyChecker.scala:48`, `:338`). The other test excuses a clause with `...` (`:332-334`), so a component may declare an extender, as the note allows.
- Is the refusal a defect waiting for a fix, or behaviour the project keeps? It is a gap: row 354 is open (NEGATIVE-VERIFIED, "implementation gap (checker)"), with a fix proposed in the row. The entry says only "(row 354)". F-72's "The ellipsis refusal stays (F-64)" makes it read as kept (see F-72).

**Class.**
- Wording (fidelity): "The specification's text allows `...` in an api's clause, and an extender that the clause lists (`traits.tex:161-162`, `:247-254`). Only a draft note refuses the api's own declaration of an extender, and a release build leaves draft notes out."
- Wording: title's parenthesis "(row 354, open)"; and after the second sentence, "A component's types may extend such a trait."

## F-65, the trait table's two memos

**Fidelity.** It matches `reviews/row-488-probe.md`: the same 626 distance errors "site for site" and 75 count errors "line for line" both ways, on main with batch 7C's sources. One measurement fact is compressed in a way that misleads.

- Rewrite: "In that measurement the count stage took 1,149 s with the memo off, past its 900-second limit, against 112 s with it on." The probe's run 2 is the tracked stage with the memo off: "The tool's 900-second timeout (`run.sh:69`) killed the run ... and it printed no table". Run 5, the 1,149 s, is "a scratch copy whose only change is the timeout, 900 → 21,600 s" ("What was run"). The sentence says a stage ran 1,149 s past a limit that, as tracked, would have stopped it.

**Comprehension.** The reader still took the old measurement as the present: "With the cache off, the count stage runs past its 900-second limit", and "at roughly ten times the count stage's time". Today the stage takes about 63 s with the memo on (F-240). Its time with the memo off has not been measured since; the assessment's narrow gaps say so. The reader also asked whether the limit kills the run (it does) and what "the same errors" means (the same sites and lines, not only the totals).

**Class.**
- Wording: "One differential on climb batch 7C's tree gave the same errors with the memo off and on, site for site: 626 at the distance stage and 75 at the count stage. With the memo off, the count stage's 900-second limit stopped it; a copy with the limit raised took 1,149 s, against 112 s with the memo on. Today the stage takes about 63 s with the memo on (F-240), and its time with the memo off has not been measured."
- Concept: the trait table, the checker's index of the types that a compilation unit sees, its own and every api's, built anew by each phase that needs one (`TraitTable.scala`; `rung-analyzer-memo/REPORT.md`, "The table does not change"). F-72 and F-235 use it too. Home: `references/compiler.md`.
- Concept: batch names. The core defines a climb batch "by number", and the record also names batches 6.5, 7b, 7C, 7R, 13b and N. Home: the `fortress-repo` core's "batch" definition, in one clause: "some carry a letter or a suffix, such as 7C or N".

## F-66, the checker-count table

**Fidelity.** Pass. The shadow's definition and P-39's ruling match `climb-batch-workflow.md:226` and `checker_compare` (`climb-batch-workflow.js:1109-1134`). The assessment's nuance stands: red is a crash line that differs from the last landed table's and is not the declared one, and the last landed table's `#crash none` makes that "a crash line that no rung declared".

**Comprehension.** The reader read the rule correctly, but could not follow three pointers.

- "The gate's step 8": the skill's `gate.md` has seven steps. Step 8 is the batch's gate's (`climb-batch-workflow.md:220`, "8. The checker count, and 9. the distance"; P-39, "step 8 of the batch's gate").
- "declared": in the rung's manifest, the field `expectedCheckerCrash` (P-39).
- The shadow's place: `explorations/coordinator/tools/checker-count/shadow-src/`, with its checksum in `run.sh`, which the `#shadow` line checks: "refresh the copy and the checksum in run.sh" (`run.sh:22-33`, `:96-98`).

**Class.**
- Wording: "Step 8 of a batch's gate (`coordinator/climb-batch-workflow.md`) compares it with the newest landed table." And: "on a crash line that no rung declared in its manifest (`expectedCheckerCrash`), on a table with no total, and on a stale shadow: the instrumented copy of `StaticChecker` beside the stage (`checker-count/shadow-src/`), when the tracked `StaticChecker` no longer matches the checksum that `run.sh` records."
- Concept: a batch's gate is the worker's seven steps plus step 8, the count stage, and step 9, the distance stage. Home: `references/gate.md`, one sentence after its count of seven steps.

## F-67, the checker's sizes

**Fidelity.** The correction from "refuses ... by name" to the refusal of inference is right (`STypesUtil.scala:585-606`, `unsupportedKindError`; `XXXNatBoolChecker.fss`). The sentence added on row 406 states one row's defect as a general property.

- Rewrite: "A `bool` argument written out passes the checker: row 406's `Flag[\true\]` and `Flag[\false\]` pass it and then stop in code generation." Row 406's own title: "**the compiled checker's instantiation exclusion does not compare boolean arguments**: `object F extends { Flag[\true\], Flag[\false\] }` ... passes the checker". The object extends two instantiations of one trait, which P-40 says should differ "once the checker has boolean parameters". So it passes because of a gap, and P-40 lists that gap as still to build: "The checker compares no boolean arguments (row 406)". The writer says row 406 is the only evidence for a written-out argument. So "A `bool` argument written out passes the checker" generalizes from one defect's shape, and code generation's stop ("Only emitting RTTI for types right now") is in an `extends` clause.

**Comprehension.** The over-reading followed. The reader advised "Write `bool`, `dim` and `unit` static arguments out" and "Do not expect a compiled program with a `bool` static argument to compile all the way through". Neither follows from the sources: no source tries a written `dim` or `unit` argument (the skill: dimensions and units are not built), and the stop is row 406's `extends` shape. The reader also asked three things.

- Does folding evaluate an operation on numerals? Yes: `Formula.foldSize` computes `+`, `-`, juxtaposition and `^` on numerals, and `nEq` compares the folded forms: "`2 3` is `6`, `s0 s1` is `s0 s1`, not `s1 s0`" (`rung-size-expressions/REPORT.md` section 1).
- "Symbol": a size parameter's name.
- Which tests gate it: the report's section 6 names them. The assessment lists `NatInferredChecker`, `NatWrittenChecker`, `NatMethodChecker`, `NatExportChecker` and `XXXNatMismatchChecker`, and `XXXNatBoolChecker` pins the refusal of inference.

**Class.**
- Wording (fidelity): "The checker refuses to infer a `bool`, `dim` or `unit` static argument (`XXXNatBoolChecker`). It does not compare `bool` arguments, so `object F extends { Flag[\true\], Flag[\false\] }` passes it, two instantiations of one trait, and code generation then stops on it (row 406, open, a part of P-40 still to build)."
- Wording: "A size is a size parameter's name, a literal or an operation on sizes; two sizes are equal when their written forms are, once each operation on numerals is computed, so `2 3` equals `6` but `m n` does not equal `n m` (F-146)." And name the tests in place of "its siblings in the report's section 6".
- Concept: the kinds of static parameter, and a size. The core's "Static parameters" bullet lists the kinds but not that a size is a `nat` or `int` parameter, nor that the compiled checker infers only types and sizes. Home: the `fortress-repo` core, as `concepts.md` says.

## F-69, the unknown-size arm

**Fidelity.** Pass. The title now carries the condition that the body gave. The code agrees: a `NoContextError` carries an arm only when the size is unknown and the domain holds no inference variable (`Functionals.scala:255-265`), and the call is refused only when that arm is more specific than every candidate (`:765-772`).

**Comprehension.** The reader's reading matches. It lacked "arm", and could not tell whether rows 400 and 446 are open (both are, with no reproducer), or which test covers which case. `NatKnownSizeArm` compiles and runs a call that fixes the size. `XXXNatUnknownSizeArm`, `Val` and `FnValue` pin the refusal's message.

**Class.**
- Concept: an arm, one declaration of an overloaded name. Home: the `fortress-repo` core, beside multiple dispatch, as `concepts.md` says.
- Wording, minor: "that arm's parameter types are free of the size"; "(row 400, open)", "(row 446, open)"; "Gated by `compiler_tests/NatKnownSizeArm`, which accepts a call that fixes the size, and `XXXNatUnknownSize*`, which pin the refusal; rows 400 and 446 have no test."

## F-70, the checker's bound check by call form

**Fidelity.** The split keeps the claims of rows 651 and 470. One sentence lets a reader take the dotted call's refusal as gated.

- Rewrite: "Gated by `compiler_tests/MethodStaticArgsBoundNamesOther*`, which cover the dotted call only." The two tests compile, link and run a dotted call whose written arguments meet their bounds once substituted, and assert `1` and `11` (`MethodStaticArgsBoundNamesOther.fss`, `...SameName.fss`). They gate the substitution, which was row 651's crash ("R is not in the kind env"). No test pins the refusal of an unmet bound, "No such method": the rung showed it with a scratch probe only (`rung-checker-contexts/REPORT.md` section 6, "An unmet written bound"). No compiled test contains that refusal on a bound; the team's `XXX6y`, `XXX6by` and `XXX6bz` refuse a getter called with `()`.

**Comprehension.** The reader's reading matches, but it asked which side of the rule a functional method's call `f[\A\](x)` falls on.

**Class.**
- Wording (fidelity): "Gated by `compiler_tests/MethodStaticArgsBoundNamesOther*`, which accept a dotted call whose written arguments meet their bounds; no test pins the refusal of one that misses, which a probe showed (`rung-checker-contexts/REPORT.md` section 6). Row 470 can have no gated test, since the harness has no form for a program that the specification refuses and the checker accepts (row 470)."
- Uncertain, settled by reading only: the bound check runs in the dotted method's lookup, which instantiates the receiver's methods (`staticInstantiationForApp`, called only at `Functionals.scala:1031-1035`). So by reading, a functional method's call written `f[\A\](x)` takes the function path and matches kinds only. A probe would settle it. Wording, if kept: "at a call written `f[\A\](x)`, of a top-level function or a functional method alike (by reading)". Otherwise the entry should say only "a dotted method call" and "a top-level function call", as now.

## F-?1, the library's bounds and walk's stop (new, split from F-70)

**Fidelity.** No static parameter of the library is bounded by `Object`: `grep -rnE '\[\\[^\\]*extends +Object' Library ProjectFortress/LibraryBuiltin` prints nothing. The one `where {T extends Object}` is in `Library/incomplete/`, which is off the source path (`references/library.md`). Walk's stop is row 471 word for word. Two sentences say more than the sources.

- Rewrite: "Six functions of the `FortressLibrary` api write `extends Any`: `cast`, `instanceOf`, `identity`, `shared`, `localize` and `copy`." The api declares five. Its `copy` is inside a comment, "(* copy is presently unimplemented. copy[\T extends Any\](x:T): T *)" (`Library/FortressLibrary.fsi:51-53`). The component declares all six (`Library/FortressLibrary.fss:33`, `:39`, `:49`, `:65`, `:69`, `:72`). The assessment's `:52` and the old history's line list carry the same slip.
- Rewrite: "The specification's examples and the compiler tests write `extends Object`, so they can meet walk's stop; the library's own declarations do not." The writer marks this clause as their own inference. For the compiler tests it is not supported: the tests in `compiler_tests/` run on the compiled path (`compile`, `link`, `run`, `typecheck` keys), where the matching gap is the checker's (row 470: `k[\(ZZ32, ZZ32)\]((1, 2))` for `k[\T extends Object\]` is accepted), not walk's stop. The deduction that holds is narrower: walk's stop needs a bound written `Object` (row 471, "Walk installs a written bound"), and the library writes none, so no library declaration can cause it.

**Comprehension.** The reader read both claims right, and then looked for a link between them: "the second does not follow from the first". It also could not tell whether the six `extends Any` functions are the result-only parameters (only `cast`'s `T` is), and it asked when a compiler test would meet walk's stop.

**Class.**
- Wording (fidelity): "Six functions of `FortressLibrary` write the bound `extends Any`, which admits tuples, `()` and arrows: `cast`, `instanceOf`, `identity`, `shared`, `localize` and `copy` (`FortressLibrary.fss:33-72`; its api declares the first five so, and holds `copy` in a comment)."
- Wording (fidelity): "The specification's examples and the compiler tests write `extends Object` (`SpecData/examples/basic/Fun.Decl.fss:19`, `other_compiler_tests/Go1a.fss:15`). The library writes it nowhere, so walk's stop never comes from a library declaration."
- Wording: put the link in the title, or split the entry. The assessment's ownership test applies here: the library's bounds change with a library edit and walk's stop with a fix of row 471. Either "No static parameter of the interpreter's library is bounded by `Object`, so no library declaration meets walk's stop on one (row 471): ..." or two entries, the bounds with F-84, which owns the result-only parameters, and walk's stop alone. The coordinator chooses.
- Wording, minor: "the probe that row 471 records, no longer in the tree", and give the search command.
- Concept: a result-only type parameter, one that occurs only in the result type, so that no argument fixes it (P-48's words). F-84, F-78 and P-48 use it. Home: the `fortress-repo` core's "Static parameters" bullet, which already says what a parameter that a call does not fix takes. `concepts.md` puts it in `references/compiler.md`; the core is the better home, since walk meets it too (P-48).

## F-71, the three `typecase` forms

**Fidelity.** Showing the shorthand form, and saying that no test gates the refusals, follow row 460. One sentence, carried from the record's text, is broader than its evidence, and the rewrite's shown form makes it read as a general rule.

- "The shorthand form runs under walk only." Row 460 shows the checker refusing a clause that uses the variable at the narrowed type: `typecase c of Rel[\E\] => useRel[\E\](c)`, "not applicable to an argument of type Cond". A shorthand clause that does not use the variable so passes the checker. The team's `Compiled5.o` (`typecase x of ZZ32 => println "OK"`) is in `compiler_tests/AfterTypeChecking.test`, a `typecheck` test that passes. The library's own `instanceOf` is `typecase x of T => true` (`Library/FortressLibrary.fss:39-43`), and the distance stage reports no error there (F-53's five sites are elsewhere).

**Comprehension.** The over-reading followed: "Do not use the shorthand in code meant to compile". The reader also could not tell where the scrutinee goes in the clause-binding form, or who marked the grammar for revision. The form is `typecase e of y: T => ... end`, as the library's `cast` writes it: `typecase x of x':T => x' ... end` (`FortressLibrary.fss:33-37`). The mark is the team's `\note` at `typecase.tex:15`, "This section should be revised according to the changes in the pattern matching proposal".

**Class.**
- Wording (fidelity): "The compiled checker does not narrow the variable of the shorthand form `typecase x of T => ...`, so a clause that uses `x` as a `T` is refused; a clause that does not, as the library's `instanceOf`, passes. ... A clause of the shorthand form that uses `x` as a `T` runs under walk only."
- Wording: "the clause-binding form `typecase e of y: T => ...`"; "only the specification's grammar has it, under the team's note that the section awaits the pattern-matching proposal (`typecase.tex:15`)". This concept belongs to this entry alone, as `concepts.md` says.

## F-72, `comprises` for a generic subtrait

**Fidelity.** The correction is right. Row 487 is on phase 3's road with no batch named (`PLAN.md:70-73`). Rows 489 and 490 are parked (`PLAN.md:204`; review-queue item 13, "default the code as approved"). One phrase, carried over, reads as a decision.

- "The ellipsis refusal stays (F-64)." Its source in the history is "The ellipsis refusal (row 354) is untouched": a fact about this change's scope. P-44 says nothing of the ellipsis refusal. "Stays" lets a reader take it as kept by decision, and the F-64 reader took it so, while row 354 is an open gap.

**Comprehension.** The reader's reading matches, with four gaps of wording or concept.

- "at least one type that immediately extends it": "it" is the subtrait (`everyKnownSubtypeListed` over the subtrait's extenders, `TypeHierarchyChecker.scala`, per the assessment `:403-418`).
- "the 2012 texts" are named in P-44: Luchangco's Types chapter and Welterweight.
- "unit" is a compilation unit, a component or an api.
- "phase 3's road": the reader guessed right.

**Class.**
- Wording (fidelity): "This rule leaves the ellipsis refusal of F-64 (row 354, open) as it was."
- Wording: "as the team's 2012 texts do (Luchangco's Types chapter and Welterweight; P-44)"; "when the trait table knows at least one type that immediately extends the subtrait".
- Concept: a compilation unit. The core defines component and api but not the word "unit", which the record uses for either. Home: the `fortress-repo` core, beside "component".
- Concept: the trait table (as in F-65; `references/compiler.md`).
- Concept: PLAN's rows on phase 3's road with no batch named, and the parked rows. Home: the short orientation, as `concepts.md` says.

## F-73, inference with coercion

**Fidelity.** Marking the numeral reading as item 209's default, and naming the tests, are right. The rewrite's definition of a "lone" type parameter is narrower than the code, and the rule drops its condition.

- Rewrite: "a type parameter that is the whole type of one parameter, and occurs in no other parameter type". The code chooses every type parameter that is the bare type of one or more positions and is mentioned in no other position: `val chosen = positions.flatMap(p => bare(p._2)).distinct.filterNot(fixedElsewhere)` (`Functionals.scala:342`). The report says "a position's whole type and appears in no other parameter type" (section 3.2), and its "each of its arguments" shows that a chosen parameter can have several. The gated case is one: `pick[\T\](x: T, y: T)`, where `pick(z, l)` is "ZZ64,ZZ64", "the narrowest type both arguments convert into" (`compiler_tests/InferCoercionShapes.fss`). That is P-74's own case, "the narrowest type into which its arguments coerce", which the entry says it builds. "The whole type of one parameter" leaves it out. The reader saw the clash: "the plural 'arguments'' does not fit a type parameter that occurs in one parameter only".
- Rewrite: "takes the narrowest of its arguments' types, their coercion targets and its bound". The source has a condition: "the narrowest type ... that each of its arguments is substitutable for and its bounds permit", and the bound is tried only "when that is a plain trait type other than `Object` or `Any`" (section 3.2; `named`, `Functionals.scala:348-356`). Without it the reader saw two readings, one in which the argument's own type always wins.

**Comprehension.** Beyond the two points above, the reader asked two more. "When the declarations differ only at a numeral": declarations hold no numerals; the source says "the tied candidates' parameter types differ only where the argument is a numeral" (section 3.2, `numeralTie`). "(F-51)": F-51 is the fact that cites `InferCoercionShapes` for a type variable that another argument fixes.

**Class.**
- Wording (fidelity): "a type parameter that is the whole type of each parameter it occurs in, as `T` in `pick[\T\](x: T, y: T)`, takes, among its arguments' types, their coercion targets and its bound (a trait type other than `Object` or `Any`), the narrowest type that every one of its arguments converts into and the bound permits."
- Wording: "When the tied declarations differ only at positions where the call passes a numeral, ..."; "`InferCoercionShapes`, which F-51 also cites".
- Wording, minor: "A tie among coerced declarations is refused" is broader than the source, which keeps the head in three cases: no tied candidate has a counted coercion, they share one parameter type, or none is maximal (section 3.2, "The ambiguity check"). "is refused, outside three narrow cases (the report's section 3.2)" would be enough.
- Concept: coercion. Home: the `fortress-repo` core, beside numbers, as `concepts.md` says.

## F-74, walk's numeral

**Fidelity.** The type by width matches `FIntLiteral.make` (`FIntLiteral.java:40-56`) and P-76. Bounding the 24 failures to probe Q matches the judgement's section 2. One sentence understates what walk's classes do.

- Rewrite: "Walk names these values by its implementation classes `Int`, `Long` and `BigNum`, as in `Cell[\Int\]` (row 364)." They are not only names. They are the library's value objects `Int extends ZZ32`, `Long extends ZZ64` and `BigNum extends ZZ` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`, `:128`, `:223`). Walk instantiates a generic at them, and the instance is a different type. Row 364: "a `Box[\Int\]` dispatches past `Box[\ZZ32\]` and `Box[\Number\]` to `Any`", and walk refuses "`a: BoxT[\ZZ32\] = BoxT(z)` ... RHS expression type BoxT[\Int\] is not assignable". The judgement's section 2: "the implementation class `Int` is a candidate and, being below `ZZ32`, wins". The reader asked exactly this: "is this only a display name, or does walk instantiate `Cell[\Int\]` as a type distinct from `Cell[\ZZ32\]`?"

**Comprehension.** The reader got the width rule and that the measurement may be dated. It could not resolve "an `IntLiteral` numeral", "its four devices", "climb batch N", "probe Q", and the type of a size of 2^31 or more. F-140 answers the last: "Walk reads a size used as a value as a `ZZ32` up to 2^31-1 and as a `ZZ64` above". "It is P-76's walk half" can also read as "it builds the walk half". P-76 lists the walk half as still to build, and F-74 says why it waits.

**Class.**
- Wording (fidelity): "Its run-time type is the library's value object `Int`, `Long` or `BigNum`, below `ZZ32`, `ZZ64` and `ZZ` (`FortressBuiltin.fsi:125`, `:128`, `:223`), and walk instantiates a generic at it: `Cell(3)` is a `Cell[\Int\]`, not a `Cell[\ZZ32\]` (row 364)."
- Wording: "It is why P-76's walk half waits; F-79 is the library half, built." "Probe Q (`compile-ladder/plan-n/probe-q/PROBE-Q.md`) measured, on the tree after climb batch N's first run and before the library half landed, walk with every integer numeral an `IntLiteral`: 59 test verdicts changed. With four further changes, its devices (a numeral at an `AnyIntegral` parameter read as `ZZ32`, a tuple of numerals converted at dispatch, `asif` converting, a varargs parameter under rung K's rule), ..." The four devices are from the judgement's section 2. "A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above (row 486; F-140)."
- Concept: `IntLiteral`, the numeral's own type in the interpreter's library (P-76, F-79). Home: the `fortress-repo` core, "Numbers are siblings, not a tower", which should give walk's `Int`, `Long` and `BigNum` beside it, as `concepts.md` says.
- Concept: batch names such as N (as in F-65; the core's "batch").

## F-75, the Return Type Rule and the positional rule

**Fidelity.** The positional rule's text matches `satisfiesPositionalRule` (`OverloadingOracle.scala:154-176`): equal counts of own static parameters, kinds by position, and the return type with the other's parameters read positionally. The tests are right: two accept, three are `XXX` compile tests with `compile_err_contains`. Two standings are not given as the record gives them.

- The equal-count scope. The rewrite puts it in the title's rule and then says "It builds P-45". It is the rung's choice: "Choices inside the rule, each the rung's: **Its scope: two declarations with as many static parameters of their own**" (`rung-return-type-rule/decision-record.md` section 2). It waits for the curator's review: review-queue item 60, "His answer 9 lists this scope for his review". The kind check is also the rung's ("**Its kinds.**", same section). This is the standing that the writer fixed for F-73's numeral reading. Here it is left unsaid.
- The object-domain refusal. Rewrite: "(row 542; review-queue item 57, for the curator's review)". Item 57's "Landed" line says: "The refusal, his decided construction for answer 9; gated", and "Needed by: never". So the refusal follows from the curator's own construction (P-45: "over every instance of a generic declaration that the argument types allow"), which checks instances whose domain meet is `Bottom`. The paper sets those aside (row 542). The reader concluded: "Treat the object-domain refusal as a known over-refusal waiting for the curator (item 57), not as a rule to defend", and "The object-domain refusal is provisional". The record does not say that.

**Comprehension.** Apart from the standing above, the reader's reading matches. It lacked "an object domain" (row 542: a domain whose type is an object type) and "the paper" (P-45: the type group's 2011 paper, `Papers/Types/`). It asked which of the three `XXX` refusals are defects: only `XXXOverloadReturnObjectDomain`, which pins row 542.

**Class.**
- Wording (fidelity): after the title, "The equal-count scope and the comparison of kinds are the rung's choices, listed for the curator's review (review-queue item 60)."
- Wording (fidelity): "Checking every instance, as P-45 asks, it also refuses a generic declaration beside a plain one whose domain is an object type, a pair the 2011 paper accepts, since the paper sets aside the instances whose domains cannot meet (row 542, open). Review-queue item 57 lists the difference for his review; no work needs it."
- Wording, minor: "`XXXOverloadReturnEveryInstance` and `XXXOverloadPermutedStaticParams`, which pin the two rules' refusals, and `XXXOverloadReturnObjectDomain`, which pins row 542's".

## For the coordinator

- F-?1's two fidelity points (`copy` and the compiler tests) and F-73's definition are corrections of meaning, not of wording. The assessment carries the `:52` slip, and its "a position's whole type" was right where the rewrite's "one parameter" is not.
- F-67's row 406 sentence, F-71's "runs under walk only" and F-72's "stays" each led the cold reader to a rule that no source gives. All three should change before the apply.
- Outside the chunk: F-36 has F-67's old wording, and P-45 states the positional rule without the equal-count condition. Both are already noted by the assessment; P-45 should also name item 60 when it gains the condition.
- `record.py apply` and `record.py check` have still not run on `proposals.apply`, as the writer says.
