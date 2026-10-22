<!-- The clarity workflow's judgement of FACTS chunk f16 (F-173, F-174, F-175, F-176, F-223, F-180, F-181, F-182, F-183, and F-?1 split from F-175), 2026-10-22: one verdict per rewritten entry after the second cold read, with its reason and the sources the judge read; nine apply, F-223 held. Read at `ce8a1b4c0`. -->

# FACTS chunk f16: the judgement

Nine apply, one held (F-223). I read `proposals.md`, `proposals.apply`, `clean.txt`, `check.md`, `cold-read.md`, `cold-read-2.md`, `concepts.md` and `assessment.md` in this folder, and each entry's current text by `facts-extract.sh`. Between the check's `34fbf49d4` and `ce8a1b4c0`, nothing changed in the specification, the gap ledger, `ProjectFortress/`, the probe and rung reports, or the `fortress-repo` skill (`git diff --stat` printed nothing), and the ten entries' lines in FACTS are the same. Where `check.md` named a failure and the fix round says it settled it, I read the final sentence against its source.

- F-173 **apply.** The check's three failures are settled against `Specification/basic/inference.tex`.
  - Row 442 is now the missing coercion of `NN32` into `ZZ64`, so a `ZZ32` and an `NN32` give `ZZ`. That is row 442's cell; the chapter gives `ZZ64` (`:84-87`). "No callout names this" holds.
  - Row 412's `Object` bound is in the callouts (`:37-40`, `:356-363`). Row 412's cell gives it for every static parameter with an empty `extends` clause. "Among others" replaces the count.
  - What fixes a type parameter, the bounds and the expected type follow `:66-111`, with the `stop` example's two instances.
  - The test sentence uses the tests' own words, "with no narrowest argument type" (`compiler_tests/InferLoneUnbounded.fss`, `InferLoneBound.fss`). Row 587 is at `:414-416`.
  - The second cold reader's doubts change no action. "No numeral settles the tie" is the chapter's rule for numerals, now a row in `concepts.md`. "So does" carries the narrowing by the expected type, as `:99-104` says.
  - The text leaves out one proviso of `:91-96`: "provided the types of those arguments are subtypes of it; none of those arguments is converted". Neither the old text nor P-48 has it, the entry's route points to those lines, and no sentence of the entry contradicts it.
- F-174 **apply.** Both of the check's failures are settled.
  - The positional restriction now has both its conditions, and row 398 is on the return-type one, as `advanced/overloading.tex:644-652` and its `make[\A, B\]` example say. Row 398 is FIXED, and Appendix I says that the checker now refuses that override (`changes.tex:2854-2857`).
  - The naked-`Any` rule is the section's normative text (`:134-150`). Both paths refuse: `checkBoundAny` (`scala_src/typechecker/OverloadingChecker.scala:475-477`, `:533-539`, which tests for a written `Any`), and walk by row 534, FIXED.
  - Rows 542, 537, 539, 779 and 780 match Appendix I (`changes.tex:2858-2879`) and their cells.
  - The second cold reader read every claim as the sources state it. Its doubts change no action. "Also" ties the return-type condition to the one restriction, and the source makes it one restriction with two conditions, both the compiled path's, so either reading leads to the same work. The present "refuses" settles "fixed". "Declared domain" is defined in the skill's `references/revival-changes.md:46` (a `concepts.md` row now).
- F-175 **apply.** The check's three failures are settled.
  - Row 540 is the code generator's (`changes.tex:3455-3456`; class "implementation gap (codegen)").
  - The call typed by the intersection is now introduced, from `:3446-3451`, so "such a call" has its antecedent.
  - Row 543 is marked deliberate, its class "deliberate (checker)". Rows 487, 546 and 547 use their cells' words.
  - The route now reaches the rows (`:1597-1606`, `:3446-3459`) and decision-record sections 8 and 9. P-60's "Built: F-175" still names this half.
  - The second cold reader's doubts change no action. "Between two closed traits" is the source's phrase, and the level of values is in `concepts.md`. Walk lies outside the entry, as before; P-60 gives F-27 for walk's load check.
- F-?1 **apply.** The check's three failures are settled against `basic/overloading.tex:312-349`.
  - The title has the condition of `:315-318`, a declaration that the static call did not select.
  - Row 538 is the compiled path's departure alone (`:347-349`; class "implementation gap (codegen)"), and walk's choice goes to P-48.
  - The lower bound follows `:326-329`, and the second example is `grab` reached through `a: Any` (`:390-400`; row 496).
  - "The call's static type" is the source's term (`:321-322`, `:328-329`) and P-48's. The cold reader's doubt beside F-173's "expected type" is now a `concepts.md` row. Its number is the coordinator's at apply: the scratch apply below gave it F-266.
- F-176 **apply.** Both of the check's failures are settled.
  - Type identity has its name condition (`types-vals-vars.tex:51-52`). The source also says "the same kind", a small point that changes no action.
  - "Known to differ" has its full rule and its reason (`:59-62`).
  - The forms match `IntExpr` and `IntVal` (`concrete-syntax.tex:533-547`).
  - The walk sentence matches `IntNat.unifyStaticArg` (`IntNat.java:126-147`): it matches a numeral, binds a name, and passes any other form on. Row 767 observes walk fail on `IBox[\i + 1\]`.
  - The cold reader's doubts change no action. The source says "when", as the entry does. The cold reader read the sides as the code has them.
- F-223 **hold.** The text is faithful to its cited sources except at the exception it adds.
  - The title excepts "a generic declaration over `Any` beside a plain one". The body says that the checker "refuses such a pair at a bound below `Any`", in row 759's words.
  - Appendix I says that the checker accepts the pair only where the bound is not written. It "refuses the same pair where the bound is written, `Any` or one below it" (`changes.tex:2887-2893`). Commit `b9711575b` corrected that sentence after `compile-ladder/rung-existential-reduction/SKEPTIC.md` refused `K759A`, `g[\T extends Any\](a: T)` beside `g(a: Any)` (section 4). The skill says the same (`references/revival-changes.md:61`), with row 412's `Object` for an unwritten bound as the cause.
  - So the text claims more than the evidence. A worker who writes `T extends Any` to reproduce or fix row 759 would expect the checker to accept a pair that it refuses. Nothing in the folder settles it: the check read the text against row 759's cell, which is narrower than Appendix I.
  - The rest checks: the rule (`advanced/overloading.tex:547-549`), "non-strict" (`:561-569`), the refusal and its message (`scala_src/typechecker/OverloadingChecker.scala:458-471`), rows 584 and 726, the nine tests as a pattern, and the pointers to F-252 and F-257.
- F-180 **apply.** The check's four failures are settled against `perf-probes/prelude/natives-shape.md` section 1 and `natives-binding-probe.md`.
  - The probe has six patches for five gaps, two of them for gap 4, and the raise's patch is `gap5-helper-raise.patch` ("What each gap does to it", items 4 and 5).
  - The limit is "by reading", and the count is 6 + 13 + 17 + 14 = 50 from `javap` ("Limits, by reading").
  - P-58's way is marked not built: P-58 says "Still to build: all of it".
  - `natives-binding-probe.md` section 1 is way 1's compiled half, and section 2 is way 2's `import java` checker half ("Terms").
  - The source lists `int`, `long`, `double` and `float` where the entry says "Java's numbers", a small widening that changes no action. The cold reader's doubts (the gaps named only by number, where the patch lives) are answered by the route.
- F-181 **apply.** Both of the check's failures are settled.
  - "Function, method" is as A.7 reads it (`perf-probes/where-clauses/REPORT.md:209`) and as the skill's `references/compiler.md:36` does. Row 701 has the narrower words.
  - The probe compiled `NatP`, a component of `NatParam`'s shape, which ran. `XXXNatOpenRun` compiled and failed verification. Both were run with the scratch copy (`:213-226`).
  - "The trait guard" matches the report's summary, "With only that guard relaxed in a scratch copy" (`:27`).
  - The second cold reader's two doubts are answered by the text's order ("In a probe ... then") and by the title, which says that the tree refuses such a trait. The cold reader expected the right reading. "The trait guard" is now a `concepts.md` row.
- F-182 **apply.** Both of the check's failures are settled.
  - The top-level message holds for rows 18, 121 and 122. Inside an object, row 122 gives the uncaught `java.lang.Error` and row 121 the parse error.
  - The compiled path is observed for the type alias (`explorations/aliases-units-report.md:98-101`, `:461`) and is by reading for the other two forms, from `IndexBuilder.scala:187-189`, which both paths run.
  - Row 120 is POSITIVE-VERIFIED.
  - The cold reader's doubts change no action. The rows observe walk, as the entry says, and `[gens]` is the specification's form (`basic/tests.tex:87-91`).
- F-183 **apply.** The check's failure is settled.
  - `compiler-probes/vectors/vectors.md` section 3, step 9, measured both `Cell[\ZZ32Vector\]` and `Cell[\StringVector\]` failing at load. Row 408 and `XXXVecCtorLoad` name a `ZZ32Vector` only.
  - Section 6 says that no gated test creates, indexes or prints a `ZZ32Vector`. `DefaultRenderRungS` and `Compiled2` use a `StringVector`.
  - The skip is in step 10 (`FortressMethodAdapter.java:220-222`, `SignatureParser.unsayable`). A `String[]` helper fails at compile instead (step 10). The entry's "cannot take a Java array" holds for both, and its reason is the old text's.
  - The cold reader's doubts (`RTTIv`, `RTTIc` and stamping, and the skip beside `compiler.md:62`) are `concepts.md` rows.

`final.apply` holds the blocks of `proposals.apply` for the nine applied entries, with both section headings, in the same order. Against `proposals.apply` below the header comment, `diff` shows only F-223's two lines removed. I applied it with `record.py apply` to a sparse scratch clone of the record at `ce8a1b4c0`. It rewrote the eight entries and added F-?1 as F-266. `record.py check --base HEAD` on that copy gave 0 failures. It reported the nine among the entries over 600 characters (F-173 1,852, F-174 2,149, F-175 1,298, F-266 1,324, F-176 1,168, F-180 1,597, F-181 1,197, F-182 910, F-183 879). Its `from` reports name files outside the sparse checkout.

`concepts.md` gains four rows from the second cold read: the rule for numerals, the expected type beside a call's static type, the declared domain, and the code generator's guards.

Points for the coordinator, none of them a question for the curator:
- F-?1 takes the next free number at apply. F-175 and F-?1 go together: P-60 names F-175 for the half that it keeps.
- With F-223 held, `proposals.md`'s pointer note on chunk f14's split of F-252 waits on F-223's answer.
- Row 759's cell says "with a bound below `Any` such a pair is refused". Appendix I and the skill say that a written `Any` is refused too. A `ledger.py note` on row 759 would bring its cell to Appendix I.
- `proposals.md`, "F-182": the map's row at `coordinator/map/spec-to-implementation.md:303` says "interp works" for `test` declarations, against rows 121 and 122. That is for whoever keeps the map.
