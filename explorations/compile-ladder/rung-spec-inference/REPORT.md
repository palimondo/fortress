# Rung T of climb batch N: the type-inference chapter (rung-spec-inference)

problem: rung I builds a rule no text states, and the chapter the overloading rules, `var-ref.tex` and `method-invocation.tex` cite for static-argument inference was a draft note, `\note{This chapter will include the Fortress static type inference mechanism.}`, the Working Draft's `Specification-1.0-frozen/basic/inference.tex:15`, which at `bce66f1fa` was `Specification/basic/inference.tex:15`
spec: the rule itself is prose the specification never wrote (FACTS.md, "The specification never wrote static-argument inference or a numeral's type hierarchy, and named a range's integer width only in climb batch 7R"); found from `explorations/coordinator/map/spec-to-implementation.md:193`, `:257`, the substitutability its admission step uses, `Specification/basic/conversions-coercions.tex:417-432`, and the resolution the chapter's first step cites, `Specification/basic/conversions-coercions.tex:470-480`
precedent: rung U's form for the revival's own passages, `explorations/compile-ladder/rung-spec-ranges/decision-record.md:65-69`; the rule's words, `explorations/reviews/conversion-overloading-judgement.md:109-117`
deviation: the lone parameter's candidates and a union fallback named beyond the judgement's sentence, `Specification/basic/inference.tex:83-98`; the expected type's contexts listed as measured on the checker, `Specification/basic/inference.tex:109-116`, the others not described, `:201-205`; the interpreter's run-time rule a callout, not normative text, `:149-160`; the overloading chapters' revision named by its date, not by rung, `:43-49`; the rule narrowed to type, `nat` and `int` parameters, `:19-25`, `:75-79`, `:189-190`; `Specification/appendices/changes.tex:1718-1726` names the passages the chapter leaves unrevised; the Effect of "The number types" left as it was, `Specification/appendices/changes.tex:478-481`
historical: `Specification/basic/inference.tex`, `Specification/basic/expressions/ranges.tex`, `Specification/basic-lib/basic-integers.tex`, `Specification/appendices/changes.tex`

## 0. What I inherited, and what I re-verified

This is the repair round, in the same worktree, on `wip/rung-spec-inference`. The branch carried the first pass's five commits: `bcd9f07df` (the list, before any edit, and the base's build), `4a43f910f` (a size as a range's component measured on the base; the base chapter's text), `86ba0afa6` (the specification and the re-anchoring), `2101b015e` (the decision record, the final build, the owed strided-range test) and `5cc3e32f0` (record.md and the for-Pavol list). It also carried the first skeptic's `fc7b5a8e7` (refused; `SKEPTIC.md` and `probes/skeptic/`) and the judge's `daafe54a5` (`JUDGE.md`, repair). The harness refused the first pass's `REPORT.md`, and it refused this round's write as well. This text, carried in the structured result, covers both passes, and the gather writes it. The worktree was clean.

Re-verified rather than trusted:
- The specification was rebuilt on the repaired tree and compared with the base build's log and text (section 5).
- The skeptic's probes that the repair's corrections rest on were re-run on both paths (`probes/repair/reverify-base.txt`: `SkBoolParam`, `SkIntParam`, `SkROAnyfn`, `SkROAnymeth`, `SkROAnyarg`, `SkRONonefn`, `SkCtxField`, `SkCtxAssign`, `SkNumTie`). Each output matched the skeptic's capture.
- Every line of `inference.tex` and `changes.tex` cited in the decision record, record.md, `probes/for-pavol.txt` and this report was re-opened against the edited files.
- No test cites either file: `grep -rn 'inference\.tex\|changes\.tex' ProjectFortress/tests ProjectFortress/compiler_tests ProjectFortress/library_tests` prints nothing. So the repair owes no re-anchoring, and it leaves `ranges.tex` and `basic-integers.tex` untouched, whose citations the first pass re-anchored.

## 1. The problem, and where the fix belongs

`Specification/basic/overloading.tex:170-175` infers static parameters "as described in \chapref{type-inference} before checking the applicability". `Specification/basic/expressions/var-ref.tex:35-40` and `method-invocation.tex:49-52` say the static arguments "are statically inferred ... (as described in \chapref{type-inference})". That chapter was a heading and two draft notes (`Specification-1.0-frozen/basic/inference.tex:12-27`, byte for byte the base's file). The revival's own callout pointed into it: answer 8's promotion rule "by a rule to be written into \chapref{type-inference} together with its implementation" (`Specification/basic-lib/basic-integers.tex:90-94` at the base).

Rung I builds that rule into the compiled checker. Without this chapter the checker would infer by a rule no text states, an open discrepancy (POSITIONS.md, 2026-09-24, the requirement on the plan). The fix is prose in `Specification/basic/` and Appendix I, the files the map's specification row names (`explorations/coordinator/map/spec-to-implementation.md:193`). It is written in the S1 form (POSITIONS.md, 2026-09-26, S1) and lands only with rung I (POSITIONS.md, 2026-09-27, the numerics plans, decision 3).

## 2. What the specification and the decisions settle

- **The decisions.** Each is quoted in the decision record's head.
  - The numerics plans, decision 3 (2026-09-27): the checker infers with coercion; answer 8's promotion is its number case; the expected type is kept at `f(x)` with a retry; and the chapter "is written in the S1 form and lands only with the checker rung".
  - The two decisions of the conversion judgement (2026-09-28), decision 1: a declaration is chosen by the coercion chapter's order on declared, quantified domains, then instantiated by answer 8's promotion, its coercions inserted statically, and the converted call dispatches on the converted values. A numeral whose candidate types are incomparable reads as `ZZ32` (`ZZ64` or `ZZ` by magnitude), "stated once in the inference chapter".
  - Answer 8 (2026-09-26).
  - A size used as a value (2026-09-28, item 25): it converts to `ZZ32` as a numeral does, and rung T writes this into the ranges section.
- **The coercion chapter.** Applicability with coercion is defined by substitutability (`Specification/basic/conversions-coercions.tex:417-432`). A declaration applicable without coercion is chosen first (`:470-480`). Coercion happens where the context expects a type, "variable and field declarations" among them (`:102-127`).
- **The Working Draft never wrote the rule.** The later Types chapter has no "infer" (`grep -c -i infer Documentation/Specification/Prose/Language/types.tick`: 0). The 2011 paper defines a generic declaration's applicability by its instances (`Papers/Types/setup.tick:396-397`) and leaves run-time inference "beyond the scope of this paper" (`Papers/Types/rules.tick:118-129`).
- **Bool, dim and unit arguments.** The specification is silent on inferring them, though its own examples presume it (`SpecData/examples/basic/StatParam.Bool.fss`, input at `Specification/basic/trait-parameters.tex:117-119`; the unit example at `:150-152`). The brief gives the chapter the rule "as far as rung I builds it and no further" (`explorations/coordinator/CLIMB-BATCH-N.md`, section 3, T), and neither path infers a `bool` one. So the chapter names those kinds as not described (section 11, C1).

## 3. The list, before any edit

`probes/list.txt` was committed first (`bcd9f07df`). It holds seven revisions (R1 to R7) and twenty-four passages left (L1 to L24), each with its source, and it starts from evidence B's section 1.2 (`explorations/reviews/numerics-plan-coordinator/evidence-B.md:47-60`). Found after it: L25 (answer 12's rule for a size a call cannot fix), M1 (the compiled path's strided range) and, by the first skeptic, L26 (the kinds of static parameter). What each becomes is in the decision record, sections 1 and 4.

The passages left that matter:
- The overloading chapter's three sentences, the implicit bound of `Specification/basic/trait-parameters.tex:49-50` and the naked-Any rule of `Specification/advanced/overloading.tex:114-127`. All three are batch 7b's rung S's (answer 9; `explorations/reviews/overloading-judgement.md` section 10, item 4), and the chapter's first callout and "Passages not yet revised" name them.
- The coercion chapter's cross-reference (rung S's).
- The reductions callout (rows 424, 425).
- `Empty`'s callout.
- The Effect of "The number types" (`Specification/appendices/changes.tex:478-481`), whose "until" is now met.

## 4. What changed

**`Specification/basic/inference.tex:15-236`, the chapter:**
- **Scope** (`:19-25`): the inference of a call's static arguments for type parameters and for `nat` and `int` parameters.
- **Choice** (`:60-69`): as the coercion chapter's resolution chooses. A declaration with static parameters is applicable when some instance within its bounds is, and it is compared on its declared parameter types. So a coercion never changes the declaration chosen when one applies without it.
- **Instantiation** (`:71-106`):
  - A type, `nat` or `int` parameter inside a parameter type is fixed by the argument, by subtyping (`:75-79`).
  - A type parameter inside the declared return type is fixed by the expected type (`:80-82`).
  - A type parameter that is the whole type of parameters takes, among its arguments' types and the types they coerce to, the narrowest under ⪯ that all are substitutable for and its bounds permit. For numbers this is the narrowest type all convert into: ℤ64 for ℤ32 with ℤ64, and for ℤ32 with ℕ32. Otherwise it takes the union, with nothing converted (`:83-98`).
  - Every argument is admitted by substitutability and coerced where needed, statically (`:99-106`).
- **The expected type** (`:108-134`): given by a variable or field declaration that declares its type, an assignment to a variable whose type is declared, a declared return type, a block's last expression where no local declaration precedes it, and both branches of an `if … else`. It is used at `f(x)`, at a method invocation and at an operator, with a retry without it when the result converts. Two examples.
- **Dispatch** (`:136-148`): in the judgement's words, with `op(z, w)` as the example.
- **A numeral whose conversions tie** (`:162-185`): read as ℤ32, or ℤ64 or ℤ by value, stated once, in either step. Any other tie is a static error.
- **Not yet described** (`:187-210`): the static arguments of a `bool`, `dim`, `unit` or operator parameter; a static parameter nothing fixes, with the BottomType question left open; a conversion inside a structured argument; the expected type elsewhere; a generic object named without a call; whole-program inference.
- Three callouts (`:26-51`, `:149-160`, `:211-224`), and the team's second note kept (`:226-236`).

**The other passages:**
- `Specification/basic/expressions/ranges.tex:46-58`: "a `nat` or `int` parameter (§ natparams) used as a component converts to ℤ32 as an integer numeral does", with its callout (item 25; row 485).
- `Specification/basic-lib/basic-integers.tex:90-94`: answer 8's rule now "infers ... by the rule of \chapref{type-inference}". The line count is kept.
- `Specification/appendices/changes.tex`:
  - the new entry I.1.25 (`:1549-1711`): the affected sections, the change, the rationale, the effect, route C, and the originals quoted (the chapter from `Specification-1.0-frozen/basic/inference.tex:12-27`, the revival's sentences from `git show bce66f1fa:<path>`);
  - I.1.18's effect (`:1107-1110`);
  - "Passages not yet revised" (`:1718-1731`).
- Nine test files' assert messages were re-anchored for `ranges.tex`: 106 changed lines, each differing only in a `ranges.tex` line number (`probes/reanchor/reanchor.txt`, `probes/reanchor/assertion-check.txt`). No assertion changed.

The reasons per passage, and the way back, are in the decision record's sections 3 and 7. Its section 5 lists the seventeen decisions taken inside the rung, each with its rejected alternative.

## 5. The recorded failure and the recorded pass

No test can go red for a prose edit.

**The recorded before:**
- The base build's Chapter 20, the draft note alone: "This chapter will include the Fortress static type inference mechanism." (`probes/build/base-chapter-text.txt:5`). It was committed in `4a43f910f`, ahead of the edit's `86ba0afa6`.
- It comes from a 631-page base build whose text equals the committed PDF's (`probes/build/committed-vs-base-pdftotext-diff.txt`, empty).
- The ranges sentence was run on both paths before the edit (`probes/examples/SizeAsComponent-base.txt`): `0#n`, `1:(n-1)`, `n:5`, a sum over `0#n`, `0#k`, `k:5`, `z: ZZ32 = n` and `z: ZZ32 = k` gave the same results on walk and compiled.

**The recorded after:**
- The specification built on the repaired tree, `6eff8916d`: 635 pages, `BUILD SUCCESSFUL` (`probes/build/edit-tex.txt`, "Output written on fortress.pdf (635 pages, 2143035 bytes)"; `probes/build/edit-genSource.txt`).
- Its last LaTeX pass has exactly the base's warnings: seven "Float too large", three "Marginpar moved", one mdframed bad break, one amsmath `\over`, six hyperref tokens and one pdfTeX `Hfootnote` destination. It has the base's 422 overfull and 261 underfull boxes, and no undefined reference.
- The text diff (`probes/build/base-vs-edit-pdftotext-diff.txt`) has the first pass's 31 hunks, each attributed in `probes/build/diff-hunks.txt`: the table of contents, the chapter, the ranges sentence and its callout, answer 8's callout, I.1.18's effect, the new entry, "Passages not yet revised", Appendix I's renumbering, and page-shift artefacts.

The machine of the builds: nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 2.36 2.38 3.35; openjdk 25.0.4; FORTRESS_THREADS=1. `genSource` took 46 s and `tex` 35 s. The build's ignored products were removed with `git clean -fX -- Specification`, and `Specification/fortress.pdf` is not committed.

## 6. Precedent search

The team never wrote the chapter, so the precedent is the revival's own specification rungs:
- Batch 5's rung S set the form (`explorations/compile-ladder/rung-spec-route-a/decision-record.md`, section 3.9).
- Batch 6's rung T revised the number chapters in that form.
- Batch 7R's rung U quoted the revival's own sentences in Appendix I by base path and line, kept a callout's line count so no test citation moved, and re-anchored the tests of a chapter it moved (`explorations/compile-ladder/rung-spec-ranges/decision-record.md:65-69`, its decisions 7 and 8).

This rung followed rung U and reused its build scripts (`probes/build/specbuild.sh`, `probes/build/norm.sh`) and its re-anchoring script (`probes/reanchor/reanchor.py`). Three passages repeat answer 8's interim rule: the callout (revised), the paragraph of "Passages not yet revised" (revised) and the Effect of "The number types" (left, now fulfilled; decision 9). The rule's words follow the judgement's section 1 (`explorations/reviews/conversion-overloading-judgement.md:105-126`) and the shadow's section 1 (`explorations/reviews/inference-rule-shadow.md:18-29`).

## 7. Differentials

**The first pass, on the base:**
- The ranges sentence on both paths: `probes/examples/SizeAsComponent.fss` with `SizeAsComponent-base.txt` (section 5).
- The strided control, `probes/examples/SizeStride.fss` with `SizeStride-base.txt`: compiled refuses `0:10:3` even with numerals alone, and walk runs it (M1).

**The first skeptic** ran thirteen differentials (`SKEPTIC.md` section 11). The repair round re-ran the nine its corrections rest on (`probes/repair/reverify-base.txt`, tree `b2c245fb2`, whose implementation is the base's; the machine line is at its head):
- `untag(Tag[\false\](4))` is refused by name compiled and fails with "Cannot unify" under walk (`:2-24`).
- `nat` and `int` parameters give 7 and 7 on both paths (`:25-34`).
- Under `r[\T extends Any\]`:
  - `x: ZZ32 = r("a")` and `r("a")` as an argument are refused compiled with "Could not infer static argument T extends Any without context" (`:40-45`, `:69-74`);
  - `x: ZZ32 = O.r("a")` compiles and runs (`:57-63`);
  - the unbounded form compiles and runs (`:86-92`).
- A field declaration and an assignment are accepted compiled (`:105-109`, `:120-124`).
- `g(0)` runs `g(NN32)` compiled and `g(ZZ32)` under walk (`:125-134`).

**New in the repair round:** the skeptic's context probes under walk, which it had run compiled only. Walk refuses `a: BoxT[\ZZ64\] = Fac.mk()` with `mk[\T\](): BoxT[\T\]` in every context the chapter lists (`probes/repair/walk-contexts-base.txt`; `probes/repair/reverify-base.txt:93-104`, `:110-119`), and the compiled checker accepts it in all of them. The specification settles this against walk (M2, section 8).

## 8. The three homes

- **F1 to F4 and F7** of `SKEPTIC.md`, the first pass's own text errors: not program defects. Their home is the text's correction, made in this round (section 11). No test can hold a sentence of prose.
- **M1**, the compiled path has no strided range: `seq(0:10:3)` is refused compiled and gives 4 elements under walk, and `Specification/basic/expressions/ranges.tex:68-76` settles it. Home 2, owed in this run. The rung may add no test (its brief), so `probes/owed/XXXStridedRangeRungT.fss` and its `.test` are prepared and captured (`probes/owed/XXXStridedRangeRungT-base.txt`); row 514 (504 provisionally). The gather places it in `ProjectFortress/compiler_tests/` and shows it red on a deliberate local fix.
- **F5**, the compiled checker lets the expected type change which declaration runs (`probes/skeptic/SkExpRunTop-base.txt:21-23`). The specification and decision 1 settle it against the checker. Home 2, provisional row 505, folded at the gather into rung I's row 508, the same mechanism: the skeptic's `probes/skeptic/owed/XXXExpectedTypeChoiceRungT.fss` with its control and its guard, which the gather places after running `SkExpRunTop.fss` on the merged tree (record.md).
- **F10**, walk's `BoxT[\Int\]` binding (row 364's mechanism), settled by `inference.tex:83-98`. Home 2: `probes/skeptic/owed/XXXInferredIntBindingRungT.fss`, for `ProjectFortress/tests/`; a note to row 364.
- **F11**, row 21's walk half, a generic method's own static argument, settled by `inference.tex:15-25` and `:75-79`. Home 2: `probes/skeptic/owed/XXXMethodStaticArgRungT.fss`, for `ProjectFortress/tests/`; row 21 is reclassified.
- **M2**, measured in this round: walk never fixes a type parameter by the expected type (`probes/repair/walk-contexts-base.txt`). Row 21 held it in home 3 while the chapter was a placeholder. The chapter now settles it (`inference.tex:80-82`, `:109-116`), so its home is 2: `probes/repair/owed/XXXExpectedTypeFixRungT.fss`, which fails under walk and passes compiled (`probes/repair/owed/XXXExpectedTypeFixRungT-base.txt`), for `ProjectFortress/tests/`; a note to row 21. Rung K does not reach it.
- **A size above ℤ32 as a range component**: rows 325 and 418, notes only (`probes/skeptic/SkRange-base.txt:5`, `:17`, `:70`).

The rung places none of these tests, and none is yet shown going red on a deliberate fix: the brief forbids the rung a test file, and the judge gave placing them to the gather (`JUDGE.md` section 3, F8). The gather's list is in record.md.

## 9. The checker count

Unchanged, and not captured. The rung edits nothing the count or distance stage reads (specification prose, test messages and its own directory), and the manifest predicts the last landed total, 75 (`explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt`).

## 10. Stops met

- **Normative text stating more than rung I builds (the chapter).** The first pass met it and did not report it. `inference.tex:73-76` at `5cc3e32f0` fixed "a static parameter that the declared type of a parameter mentions" by the argument, which covers `bool`, `dim`, `unit` and operator parameters. Neither path infers a `bool` one (`probes/skeptic/SkBoolParam-base.txt:3-6`, `:15-16`; `ProjectFortress/compiler_tests/XXXNatBoolChecker.test:3`). The repair round narrowed the text (C1), so the landing text does not meet the stop. It is reversible, and lifted by POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him.
- **Not met by T:** the skeptic's second reading, `inference.tex:60-69` with `:120-126` against the compiled checker's choice at an operator and a method invocation (F5). The judge ruled the text right by decision 1 and the mismatch the checker's. If rung I's landed build keeps or extends it, that is I's reserved stop, which the gather checks (the decision record's statement 12).
- Nothing under `Specification-1.0-frozen/`, `Library/` or `ProjectFortress/src/` is touched. No assertion changed, and no file another rung edits is touched.

## 11. The repair round

Each of the judge's steps (`JUDGE.md` section 5), with what was done and its evidence:

- **C1, the kinds (steps 2 to 4).**
  - The scope sentence (`inference.tex:19-25`) says the chapter describes the inference of a call's static arguments for type parameters (`\secref{type-param}`) and for `nat` and `int` parameters (`\secref{natparams}`). The other kinds and whole-program inference are not yet described.
  - `:15-18`, the Working Draft's own claim restated, is left.
  - The first bullet (`:75-79`) names "a type parameter, or a `nat` or `int` parameter". The second (`:80-82`) names "a type parameter".
  - The not-described list begins with "the static arguments of a `bool`, `dim`, `unit` or operator parameter" (`:189-190`), stating no behaviour.
  - Evidence: `probes/skeptic/SkBoolParam-base.txt:3-6`, `:15-16`; `probes/skeptic/SkIntParam-base.txt:3-4`, `:9-10`; `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:551-552`, `:556`, `:565-567` (the named refusal for `bool`, `dim` and `unit`; `:553-555` gives an operator parameter an inference variable, not measured); re-run, `probes/repair/reverify-base.txt:2-34`. Decision 15; L26.
- **C2, the third callout (step 5).**
  - It now says the compiled checker binds a type parameter that only the return type mentions to `BottomType`, except that it refuses a call with no expected type when the parameter is declared `extends Any` (`:211-217`). The interpreter clause and the rows are kept.
  - It adds (`:218-224`) that neither implementation infers a `bool` parameter yet: the checker refuses a `bool`, `dim` or `unit` one by name, and the interpreter does not unify a `bool` one (rows 21 and 307). It also says the example of `\secref{boolparams}` can be applied only if its argument fixes that parameter.
  - Evidence: `probes/skeptic/SkResultOnly-base.txt:8-12`, `:24-30`, `:36-41`; `probes/skeptic/SkROAnymeth-javap.txt`; re-run, `probes/repair/reverify-base.txt:35-92`.
  - The decision record's statement 11, record.md's FACTS entry and row 447's note follow it.
- **C3, Appendix I's rationale (step 7).** `changes.tex:1616-1623` now says:
  - the numeral's default "is what the interpreter did before this change", with the clause on the narrowest of ℤ32, ℤ64 and ℤ and the clause on `\library` declaring the numeral type below ℤ32 kept;
  - "the compiled path, whose library declares its numeral type beside ℤ32 and excluding it, took one of the declarations that a numeral left tied, and not always the same one (row 391)". No declaration order is named, since `widen(0)`'s pick varied (row 391's batch 6.5 note). The Java sentence is kept.
  - Evidence: `probes/skeptic/SkNumTie-base.txt:3-4`, `:9-20`, re-run at `probes/repair/reverify-base.txt:125-134`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:117`.
- **C4, the contexts (step 6).** `inference.tex:109-112` adds "the right-hand side of a variable or field declaration that declares its type" and "the right-hand side of an assignment to a variable whose type is declared", and nothing else: a field assignment was not measured. Evidence: `probes/skeptic/SkCtx-base.txt:16-19`; re-run, `probes/repair/reverify-base.txt:105-109`, `:120-124`. Decision 6 no longer says "as the checker has them".
- **Step 8, the entry's Change** (`changes.tex:1555-1592`): it now names the kinds, a type parameter fixed by the expected type, the two added contexts, and the third box on the `bool` parameters that neither implementation infers.
- **C5, the gather's statements (step 9).**
  - Statement 12: "a declaration applicable without coercion is chosen whatever the expected type" (`inference.tex:60-69`, `:120-126`). Expected on the merged compiled run: `probes/skeptic/SkExpRunTop.fss` prints "ran k generic" at T2 and "ran OPLUS generic" at T4, where the base prints `OPLUS(ZZ64, ZZ32)` at T4. Otherwise the text stays and the mismatch is rung I's reserved stop.
  - Statement 13: `XXXNatBoolChecker`'s verdict is unchanged, and `SkIntParam` prints 7 and 7 on both paths.
  - Statement 11 is corrected (C2).
  - The decision record's sections 2 and 4 follow the text, and L26 and decision 15 are added.
- **C6, the ledger notes (steps 10 to 12).** Notes to rows 20, 21 (reclassified for its method half), 96, 307, 400, 405, 364, 325, 418 and 447. The correction to the FACTS entry keeps the sentence naming the passages that point into the chapter, updated. Provisional row 505 for F5 sits beside 504 for M1 (at the gather, row 508 and row 514).
- **C7, the provenance block (step 14).** The problem line cites `Specification/basic/inference.tex:15` at `bce66f1fa`, and the spec line adds `Specification/basic/conversions-coercions.tex:417-432`.
- **C8, the gather's list (step 13).** In record.md, "For the gather":
  - where each owed test goes: the three compiler tests in `ProjectFortress/compiler_tests/`, the three walk-failing ones in `ProjectFortress/tests/` only;
  - `SkExpRunTop.fss` run first;
  - each `XXX` test shown red on a deliberate fix;
  - the re-anchoring of the prepared tests' messages, which cite the first pass's lines of the chapter.
- **Step 15, the rebuild:** section 5.
- **Step 16:** the grep prints nothing, and every cited line was re-opened (section 0).

Three changes go beyond the judge's steps, each recorded as a decision:
- **The Effect's one word.** The entry's Effect now says "A declared type fixes a type parameter" where it said "a static argument" (`changes.tex:1641-1642`). After C1 the chapter fixes only a type parameter through the expected type (`inference.tex:80-82`), so the broader sentence in the entry that describes it would state more than the chapter does. The judge's step 8 said to change nothing else of the entry; the chapter the entry describes settles this one word (decision 16).
- **The dispatch example's order.** The example (`inference.tex:141-148`) now names its declarations before its call. In the first pass's order the declaration `op[\T extends Number\](a: T, b: T)` overran the line by 57.97pt, an overfull box the base build does not have (the first pass's `probes/build/edit-tex.txt` at `86ba0afa6`, "in paragraph at lines 137--155"). Reordered, the build's 422 overfull boxes are the base's (decision 16). The words are unchanged.
- **The interpreter's callout.** It now ends "It does not yet fix a type parameter by the expected type, compare declarations with static parameters on the parameter types they declare, nor dispatch a converted call again." (`inference.tex:158-160`). Its first sentence says walk applies the same rule, and M2 shows walk never uses the expected type (decision 17).

## 12. For Pavol

The points are in `probes/for-pavol.txt`, each with its evidence:
- the stop the first pass met, and the narrowing of the kinds (the judge's decision, decision 15);
- F5, the compiled checker's expected type choosing a converted declaration (row 508, provisionally 505, statement 12);
- row 21's walk half, now settled against walk;
- F10, walk's `BoxT[\Int\]` binding;
- M2, walk never using the expected type;
- the first pass's points: the lone parameter's candidates and union, the contexts, the dispatch callout, answer 12's rule, M1, L19, the callouts naming a date and not a rung, and the Effect's one word.

## 13. Tracked paths

The prefix's loop was run after the last commit over this text and record.md, with record.md's ledger-style `compile-ladder/` paths prefixed by `explorations/`. It printed nothing: every path cited here exists and is tracked. The one exception is `REPORT.md` itself, which the branch does not carry because the harness refused the write. The gather writes it from this text, and the owed tests' comment lines point to it.
