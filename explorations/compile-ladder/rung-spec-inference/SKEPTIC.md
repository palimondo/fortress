# Skeptic: rung T, the type-inference chapter (climb batch N, rung-spec-inference), second judgement

*Gather's note (climb batch N, 2026-09-29): the provisional rows this file names are the ledger's 514 (504, the compiled path's strided range) and 508 (505, the expected type changing which declaration runs, folded into rung I's row 508, the same mechanism at a call written `f(x)`).*

**Verdict: approved, with two required corrections.** The repair round did what the judge ruled (`JUDGE.md`, `daafe54a5`). The chapter now states the rule for type, `nat` and `int` parameters only, and names the other kinds as not described. The result-only callout gives the checker's refusal under `Any` for a call with no expected type only. Appendix I's numeral rationale no longer says both implementations defaulted to ℤ32. The expected type's contexts include a field declaration and an assignment. I re-ran the checks the corrections rest on, and they hold. The rung's own later additions also hold: M2 and decisions 16 and 17. I checked M2 on a generic function as well as a method.

Two statements of the text are still inexact, and both are in the third callout (`Specification/basic/inference.tex:211-215`):
- "For a type parameter that only the return type mentions, the compiled type checker binds the parameter to BottomType". It does so only where the expected type does not fix the parameter. Where the expected type does fix it, the checker binds it as the chapter's own second bullet says (`:80-82`).
- "the interpreter erases such a parameter to BottomType". That holds for a function. For a generic method, walk leaves the parameter uninstantiated.

These are required correction RC1 below. RC2 is one line of the gather's example list. Neither needs a skeptic again. Each is a wording fix to text the commit stage already owns, and the gather rebuilds the specification anyway.

Machine for every probe: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, load 1.74 1.78 1.80 at the first probe's start (each capture's first line has its own), OpenJDK 25.0.4, `FORTRESS_THREADS=1`. Tree `353c4125f`, the worker's last commit. It changes no source, library or checker, so the implementation is the base `bce66f1fa`'s. One thread count: the rung's diff is prose and test messages, with no mutable state, transaction or library write.

## 0. What I read and what I checked

- The briefing part the prefix names (facts-extract, three parts), the rung's section of `explorations/coordinator/CLIMB-BATCH-N.md` (section 3, T), and rung I's section (section 3, I), which I read against the chapter. I did not read rung I's worktree.
- `JUDGE.md`, and my first judgement (kept below, after this one).
- The repair round's commits, `0c6e5c881..353c4125f`: `git diff 5cc3e32f0 HEAD -- Specification ProjectFortress Library` touches only `inference.tex` and `changes.tex`. No test file changed in the repair.
- The worker's structured result, including `reportText`. The harness refused `REPORT.md` again, so the branch does not carry it.
- `git status` was clean before my probes.

## 1. The first judgement's corrections

| | asked | done | checked |
|---|---|---|---|
| C1 | the kinds | scope `inference.tex:19-25`; first bullet `:75-79` names type, `nat` and `int` parameters; second bullet `:80-82` names a type parameter; not-described item `:189-190` | right. The checker's refusal of `dim` and `unit` was code-read in the first round and is now measured: "Static argument inference for the unit static parameter U is not supported", and the same for `dim` (`probes/skeptic/r2/r2-kinds-base.txt:7`, `:21`) |
| C2 | the result-only callout | `:211-217` | right on the bound. With no expected type, `extends Number` and `extends ZZ32` are accepted and run (`probes/skeptic/r2/r2-resultonly-base.txt:7-12`, `:19-24`), and `extends Any` is refused (`:31-34`). Still inexact on two points, RC1 |
| C3 | Appendix I's numeral rationale | `Specification/appendices/changes.tex:1616-1623` | right. It no longer names declaration order as the compiled rule |
| C4 | the contexts | `inference.tex:109-116` | right. Decision 6 is corrected |
| C5 | statement 12 | `decision-record.md` section 6 | present, with the reserved-stop condition |
| C6 | row notes | `record.md`: rows 20, 21, 96, 307, 325, 364, 400, 405, 418, 447; 455 in the rows-closed-by-I note | right; row 405 (the judge's find) included |
| C7 | provenance block | problem line "at `bce66f1fa`"; spec line `:417-432` | right (section 2) |
| C8 | placing the owed tests | the gather's, per `JUDGE.md` section 3, F8; `record.md` "For the gather" lists each test with its corpus | right |

## 2. The provenance block (check 2)

Five lines. I opened each citation with `sed -n`:
- problem: `inference.tex:15` at `bce66f1fa` and the frozen `:15`. Both are `\note{This chapter will include the Fortress static type inference mechanism.}`.
- spec: `Specification/basic/conversions-coercions.tex:470-480` is Coercion Resolution. `:417-432` defines substitutability and applicability with coercion. `explorations/coordinator/map/spec-to-implementation.md:193` is the type-inference row and `:257` the ranges row. No `library/apis/` citation.
- precedent: `explorations/compile-ladder/rung-spec-ranges/decision-record.md:65-69` (rung U's form) and `explorations/reviews/conversion-overloading-judgement.md:109-117` (the rule as stated for the specification).
- deviation: each cited line says what the block says:
  - `inference.tex:83-98`, the lone parameter and the union;
  - `:109-116` and `:201-205`, the contexts;
  - `:149-160`, the interpreter;
  - `:43-49`, the revision named by its date;
  - `:19-25`, `:75-79` and `:189-190`, the kinds;
  - `changes.tex:1718-1726`, the passages left;
  - `changes.tex:478-481`, the Effect left.
- historical: the four specification files the diff edits. The nine re-anchored tests are the revival's.

## 3. The recorded failure and the recorded pass (check 3)

- The before: `probes/build/base-chapter-text.txt`, the draft note alone. It was committed in `4a43f910f` (00:58:50) ahead of the edit's `86ba0afa6` (01:13:03).
- The worker's after: `probes/build/edit-tex.txt`, built at `6eff8916d`. No commit after it touches `Specification/` (`git diff --stat 6eff8916d HEAD -- Specification` is empty). Its last pass has the base's 422 overfull and 261 underfull boxes, 19 warnings and no undefined reference, as `base-tex.txt` does.
- My own build on `353c4125f` (`probes/skeptic/r2/specbuild-r2.sh`, logs `probes/skeptic/r2/sk2-genSource.txt` and `sk2-tex.txt`): 635 pages, 2143035 bytes, the same byte count as the worker's. Its last pass has the same counts: 422, 261, 19 and 0. I read the rendered chapter from it through `probes/build/norm.sh`. Every `\secref` resolves: sections 12.3, 12.4 and 12.5 for `bool`, `dim`/`unit` and operator parameters, and 13.1 for literals. The build's ignored products were removed with `git clean -fX -- Specification`.

## 4. The diff against the decisions, the judge's steps and rung I's section (checks 4 and 12)

**The repair's changes.**
- The scope sentence, the two bullets and the new not-described item are the judge's steps 2 to 4, word for word in substance.
- The third callout is step 5.
- The contexts are step 6. The Change paragraph is step 8, plus the Effect's one word (decision 16), which I accept: after C1 the chapter fixes only a type parameter through the expected type, and the entry describes the chapter.
- The dispatch example's reorder removes an overfull line and changes no word.
- The interpreter callout's new clause, "It does not yet fix a type parameter by the expected type" (`:158-160`, decision 17), is true. The worker measured it on a method in every listed context (`probes/repair/walk-contexts-base.txt`). I measured it on a function: walk gives `BoxT[\BOTTOM\]` for `a: BoxT[\ZZ64\] = mkf()` (`probes/skeptic/r2/r2-resultonly-base.txt:93`). Walk's inference reads only the arguments (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:50-185`), and rung K's section does not reach the expected type.

**Against the decisions.** The chapter says what the decisions say:
- the numerics plans, decision 3;
- decision 1 of 2026-09-28: Choice `:60-69`, Instantiation `:71-106`, Dispatch `:136-139`, and the numeral tie once `:162-180`;
- a size used as a value: `ranges.tex:46-58`;
- S1 and the Working Draft's name.

Nothing contradicts a decision.

**Against rung I's section** (the batch record, section 3, I, "The decisions"):
- I refuses a tie only among candidates applicable only with coercion. It keeps today's typing for a tie among candidates applicable without it. The chapter's refusal is scoped the same way: "the declarations applicable to a call only with coercion" (`:182-185`).
- The result-only parameter stays `BottomType` in I (callout `:211-217`).
- The numeral default is in both steps.
- Answer 8's ℤ32 with ℕ32 gives ℤ64.
- ℤ64 does not convert into ℝ64, which the union example of decision 5 relies on.

One divergence remains possible. The chapter's candidates for a lone parameter are the arguments' types and the types they coerce to (`:83-89`). I's section says "the narrowest of its arguments' types and its bound". They differ in one shape, which the worker named (decision 4, statement 5). An example: `g[\T extends Number\](x: T, y: T, k: ZZ64)` called as `g(w, r, z)`, with `w: ZZ64`, `r: RR64` and `z: ZZ32`.
- The first attempt fails at `k`, where `z` needs a coercion.
- The coercion attempt tries the bound, and every argument is a `Number`, so I's reading gives `Number`.
- The chapter gives the union.

This is by reading, and I cannot run it without I's build. It is the gather's statement 5, and it goes to Pavol (section 16).

## 5. My findings on the landing text

- **F12, the third callout's first clause is broader than the checker (RC1).**
  - The text: "For a type parameter that only the return type mentions, the compiled type checker binds the parameter to `BottomType`, except ..." (`inference.tex:211-214`).
  - Under `mkA[\T extends Any\](): BoxT[\T\]` with `object BoxT[\T extends Any\]`, the checker fixes `T` to ℤ64 for `a: BoxT[\ZZ64\] = Fac.mkA()`, and the run prints `BoxT[ZZ64]` (`probes/skeptic/r2/r2-examples-base.txt:13-16`). The worker's own `SkCtx*` show the same under the implicit `Object` (`probes/skeptic/SkCtx-base.txt`).
  - That is the chapter's second bullet (`:80-82`). The clause is right only for a parameter the expected type does not fix: row 447's `r: Any = et(z)`, and a result that is the parameter itself (`probes/skeptic/SkROAnymeth-javap.txt`).
  - The item above the callout says "a type parameter that only the return type mentions, as its whole type" (`:192`). The callout drops that qualifier, so read alone it contradicts the chapter's own bullet.
- **F13, walk's erasure is a function's (RC1).**
  - The text: "the interpreter erases such a parameter to BottomType" (`:214-215`).
  - True for a generic function: `mkf[\T\](): BoxT[\T\]` gives `BoxT[\BOTTOM\]` (`probes/skeptic/r2/r2-resultonly-base.txt:93`), by the erasure at `EvaluatorBase.java:224-226`, `:245` that row 424 cites.
  - For a generic method, walk leaves the parameter uninstantiated: `BoxT[\T@...\]` for `Fac.mk()` (`:115`; the same in `probes/skeptic/r2/r2-examples-base.txt:4`). The worker's own M2 captures show the same (`probes/repair/walk-contexts-base.txt`).
  - `O.wrap(3)` stops with "Symbolic type T@... is being matched to value 3" (`probes/skeptic/r2/r2-examples-base.txt:58`). This is row 21's method defect.
  - The records repeat the callout: the new FACTS entry, row 447's note, the decision record's section 2 and statement 11.
- **The chapter's examples today (RC2).**
  - `b: ZZ64 = id(3)` answers 4000000003 on both paths (`probes/skeptic/r2/r2-examples-base.txt:79`, `:84`), as `:132-134` says.
  - `a: BoxT[\ZZ64\] = wrap(3)` is refused by walk, `BoxT[\Int\]` (`:36`), and by the compiled base, `BoxT[\IntLiteral\]` (`:45-48`), because the base drops the expected type at `f(x)`.
  - The method form `O.wrap(3)` is refused on both: walk by row 21 (`:58`), and the compiled base because the expected type fixes `T` to ℤ64 and the numeral is not admitted (`:66-69`, row 401's shape).
  - After I, the compiled path is predicted to accept both. Walk refuses the first whether K lands or not (M2), as the interpreter callout now says.
  - The decision record's list of examples for the gather (section 6) says to run `wrap(3)` "on both paths" without saying that walk refuses it. A gather that follows the list would report a mismatch the chapter already records.
- **The dispatch example's shape today.** `op(z, w)` over `op[\T extends Number\](a: T, b: T)` and `op(a: Any, b: Any)` runs the generic declaration unconverted on both paths: `generic[ZZ32,ZZ64]` (`probes/skeptic/r2/r2-op-base.txt:3`, `:8`). The ℤ32-with-ℕ32 form gives `generic[ZZ32,NN32]` compiled (`:24`). Walk refuses `u: NN32 = 5` (`:12`, row 454). The chapter's ℤ64 instance for both is I's and K's to build. These are the befores of statements 1 and 4.
- **Callout 3's `dim` and `unit` refusal, measured.** A generic body calling `get[\unit U\](q: Q[\U\])` or its `dim` twin is refused by name compiled (`probes/skeptic/r2/r2-kinds-base.txt:7`, `:21`). Walk runs the uncalled body. A unit argument cannot be written on either path, since dimension declarations are row 26's (`probes/skeptic/r2/r2-examples-base.txt:88`, `:98`).
- **A negative `int` static argument**, not a finding against the text.
  - `[\-3\]` is a syntax error on both paths (`probes/skeptic/r2/r2-examples-base.txt:137`, `:143`; that entry is the probe's first version).
  - `[\0-3\]` is refused compiled, "Arithmetic on nat static arguments is not supported" (`probes/skeptic/r2/r2-kinds-base.txt:39-43`), the nat-checker rung's recorded deviation (`explorations/compile-ladder/rung-nat-checker/REPORT.md:99`).
  - Walk infers it: 1 for `untagI(TagI[\0-3\](4))`, and 6 elements for `k:3` with `k = 0-2` (`:31-32`).
  - The specification's own note says static expressions are "not yet supported" (`Specification/basic/expressions/constant.tex:15`). No row is recommended.

The two `SkR2ROAnyInner*` entries of `r2-resultonly-base.txt` (`:43-90`) come from the probes' first version, whose `object BoxT[\T\]` the compile path bounds by `Object` (row 412) and so refuses as ill-formed. The corrected probes are in `r2-examples-base.txt:2-32`. The first `SkR2IntNeg` entry, `r2-examples-base.txt:135-150`, is the `[\-3\]` version, and its rewrite is `r2-kinds-base.txt:30-50`.

## 6. The test (check 6)

The rung adds no test, since its brief forbids one. The re-anchoring is unchanged since the first judgement. I re-checked it independently: the 106 removed and 106 added lines of the nine test files are identical once their `ranges.tex` citations are stripped. No test cites `inference.tex` or `changes.tex` (`grep`, 0 lines).

The M2 test, `probes/repair/owed/XXXExpectedTypeFixRungT.fss`, asserts what the chapter says. It fails under walk at the field (`probes/repair/owed/XXXExpectedTypeFixRungT-base.txt:3-4`) and passes compiled. Every one of its assertions uses a generic method, where walk's failure is also row 21's. A repair of M2 for functions alone would leave it failing, and so go unseen. I recommend that the gather add a function-form assertion, `b: BoxT[\ZZ64\] = mk2()` with a top-level `mk2[\T\](): BoxT[\T\]`. Walk refuses it (`probes/skeptic/r2/r2-resultonly-base.txt:93`), and compiled passes once I keeps the expected type at `f(x)`. This is a recommendation, not a correction: the test as prepared is sound, and it goes red when M2 and row 21 are both repaired.

## 7. Competing declarations (check 7)

The three labels, `static-arg-inference`, `numeral-default` and `revival-inference`, are defined once each in `Specification/`. None appears in `ProjectFortress/src/com/sun/fortress/`, the corpora or `Library/`. Nothing under `Specification-1.0-frozen/`, `Library/`, `ProjectFortress/src/` or `Specification/fortress.pdf` is changed.

## 8. record.md (check 8)

- The FACTS correction's quoted sentences match `explorations/coordinator/FACTS.md:144` and `:145`. The replacement is true of the landed text.
- The new FACTS entry is true except where it repeats the third callout (RC1).
- Row 485's closure cites `ranges.tex:46-50`, `:51-58` and `changes.tex:1727-1731`, `:1107-1110`, each opened.
- The notes cite existing rows and renumber nothing. Rows 504 and 505 are provisional and marked so.
- The tracked-path loop over `record.md`, `decision-record.md` and `probes/for-pavol.txt`, with the ledger-style `compile-ladder/` paths prefixed, prints nothing. `probes/skeptic/SkCtx*` is a glob.
- A reader six months from now can check each note from its capture.

## 9. The three homes (check 9)

| defect | home | where the check is |
|---|---|---|
| F1 to F4, F7, and my F12, F13 (text errors) | the text's correction | F1 to F4 and F7 are made (section 1). F12 and F13 are RC1, owed by the commit stage |
| M1, no strided range compiled | 2 | `probes/owed/XXXStridedRangeRungT.fss` + `.test`; row 504; placed by the gather |
| F5, the expected type choosing a converted declaration | 2 | `probes/skeptic/owed/XXXExpectedTypeChoiceRungT.fss` + `.test`, control, guard; row 505; statement 12 |
| F10, walk's `BoxT[\Int\]` | 2 | `probes/skeptic/owed/XXXInferredIntBindingRungT.fss`; row 364's note |
| F11, row 21's method half | 2 | `probes/skeptic/owed/XXXMethodStaticArgRungT.fss`; row 21's note |
| M2, walk never uses the expected type | 2 | `probes/repair/owed/XXXExpectedTypeFixRungT.fss`; row 21's note; function form recommended (section 6) |
| an oversized size as a range component | existing rows 325, 418 | notes |

The rung places no test, so none is yet shown red on a deliberate fix. That is the gather's.

## 10. The count table (check 10)

No count table. The rung captures none. Its report declares the count "Unchanged, and not captured" and predicts the last landed total, 75. The manifest's `expectedCheckerCount` is 75, a prediction. The last landed gate's table is `explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt:14`, `#total 75`. The rung edits nothing the count or distance stage reads.

## 11. The ledger and the sibling sites (check 11)

Eight rows cite the stub chapter: 20, 21, 96, 307, 400, 405, 447 and 455 (`grep -n 'inference\.tex' explorations/fortress-gap-ledger.md`). Each gets a note, 455 through the note for rows rung I closes. Rows bearing on my new probes:
- 26, dimensions and units unimplemented: it covers `SkR2UnitParam`.
- 454, walk refuses `u: NN32 = 5`.
- 21, walk's generic methods: it gains F13's form as a note (recommended below).
- 424, walk's erasure: it is F13's function case.

Row 455's "Walk has no static context" is M2's other face. The record puts M2 on row 21, whose walk half it is. I accept that.

## 12. The decisions on record (check 12)

Each POSITIONS.md entry the briefing printed, against the landed text:
- **The numerics plans (2026-09-27), decision 3.** The inference with coercion, the promotion as its number case, the expected type at `f(x)` with its retry, and the chapter in the S1 form landing only with I: `inference.tex:71-134`; `landsOnlyWith` in the manifest.
- **The two decisions of the conversion judgement (2026-09-28), decision 1.** Stated whole, in scope and words: `:60-69`, `:136-139`, `:162-180`. Probe K's fork is the dispatch example.
- **A size used as a value (2026-09-28).** `ranges.tex:46-58`. The `nat` or `int` reading is the batch record's and was reported (decision 12).
- **S1 and the unrevised copy's name.** Three callouts; Appendix I's I.1.25 quotes the frozen `:12-27` and the base's sentences by path and line.
- **The JVM principle.** Q1's ℤ32 default is also the Java language's (`changes.tex:1623`).
- **The stops.** Section 15.

Nothing is stated narrower or broader than a decision, except the lone parameter's candidates against I's section (section 4), which is the worker's reported decision 4.

## 13. The differentials (the required part)

Every program is mine and new in this round. The programs are under `probes/skeptic/r2/`, run by `probes/skeptic/r2/run-both-r2.sh`: walk, then `fortress compile` and `fortress run` against the compiler library.

| program | walk | compiled (base) | verdict |
|---|---|---|---|
| `SkR2RONumArg`: `r[\T extends Number\](s: String): T` as an argument, no expected type | runs | accepted, runs (`r2-resultonly-base.txt:7-12`) | agrees with callout 3's `Any` exception; the specification is silent (not-described item `:191-196`) |
| `SkR2ROZZArg`: the same under `extends ZZ32` | runs | accepted, runs (`:19-24`) | as above |
| `SkR2ROAnyArgPlain`: the same under `extends Any` | runs | refused, "without context" (`:31-34`) | as callout 3 says |
| `SkR2ROAnyInnerCtx`: `a: BoxT[\ZZ64\] = Fac.mkA()`, `mkA[\T extends Any\](): BoxT[\T\]` | refused, `BoxT[\T@...\]` (`r2-examples-base.txt:4`) | `T` fixed to ℤ64, prints `BoxT[ZZ64]` (`:16`) | diverge. The chapter settles it for compiled (`:80-82`, `:109-116`); walk's is M2 with row 21. Callout 3's first clause is too broad (F12) |
| `SkR2ROAnyInnerNoCtx`: `sink(Fac.mkA())` | runs | refused, "without context" (`:25`) | as callout 3 says |
| `SkR2WalkEraseFn`: `a: BoxT[\ZZ64\] = mkf()`, a function | refused, `BoxT[\BOTTOM\]` (`r2-resultonly-base.txt:93`) | refused, `BoxT[\BottomType\]` (`:104`), the base dropping the expected type at `f(x)` (row 455) | agree today. The chapter settles both against the refusal; I fixes compiled; walk's is M2 for a function |
| `SkR2WalkEraseMeth`: the method form | refused, `BoxT[\T@...\]` (`:115`) | accepted (`:127`) | diverge; walk leaves the method's parameter uninstantiated (F13) |
| `SkR2ExId`: `b: ZZ64 = id(3)` | 4000000003 | 4000000003 (`r2-examples-base.txt:79`, `:84`) | agree with the chapter's example |
| `SkR2ExWrapFn`: `a: BoxT[\ZZ64\] = wrap(3)` | refused, `BoxT[\Int\]` (`:36`) | refused, `BoxT[\IntLiteral\]` (`:45-48`) | agree today; the chapter's example is I's to build and walk refuses it after K (M2; RC2) |
| `SkR2ExWrapMeth`: `O.wrap(3)` | InterpreterBug, symbolic `T` (`:58`) | refused, not applicable to `IntLiteral` (`:66-69`) | row 21 and row 401's shape; I is predicted to accept |
| `SkR2UnitInBody`, `SkR2DimInBody` | runs (body not called) | refused by name (`r2-kinds-base.txt:7`, `:21`) | as callout 3 says; the specification is silent (`:189-190`) |
| `SkR2IntNeg`: a negative `int` static argument | 1, 6 (`r2-kinds-base.txt:31-32`) | refused, static arithmetic (`:39-43`) | not the rung's; static expressions are not yet supported (`constant.tex:15`) |
| `SkR2OpZW`, `SkR2OpZN`: `op(z, w)`, `op(z, u)` | `generic[ZZ32,ZZ64]`; `u: NN32 = 5` refused (row 454) | `generic[ZZ32,ZZ64]`, `generic[ZZ32,NN32]` (`r2-op-base.txt:8`, `:24`) | agree today; the chapter's ℤ64 instance is I's and K's to build (statements 1, 4) |

## 14. The failure-mode question

The rung replaces no loud failure. It changes prose and test messages, and no program behaves differently.

## 15. Stops met

- **Normative text stating more than rung I builds (the chapter).** The first pass met it for `bool` static parameters (`inference.tex:73-76` at `5cc3e32f0`). The repair narrowed the text, so the landing text does not meet it (`:19-25`, `:75-82`, `:189-190`). The worker listed it. Lifted by POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him.
- **Not established:** the lone parameter's candidate set (section 4) could state other than I builds, in one shape no test reaches. Whether it does is the gather's statement 5. If the gather finds a mismatch, it is this stop, reversible and lifted by the same entry.
- Not met:
  - nothing under `Specification-1.0-frozen/`;
  - no answer to the team's `BottomType` question (`:194-196` leaves it open);
  - no assertion changed;
  - no file another rung edits.

## 16. Required corrections (for the commit stage)

- **RC1, the third callout (`Specification/basic/inference.tex:211-215`).** Scope its first clause to a parameter the expected type does not fix, and its interpreter clause to a function. For example: "For a type parameter that only the return type mentions and that the expected type does not fix, the compiled type checker binds the parameter to BottomType, except that it refuses a call that has no expected type when the parameter is declared `extends Any`; the interpreter erases such a parameter of a function to BottomType, and leaves a generic method's uninstantiated (rows 21, 424, 425 and 447 of the revival's gap ledger)."
  - Evidence: `probes/skeptic/r2/r2-examples-base.txt:13-16`; `probes/skeptic/r2/r2-resultonly-base.txt:93`, `:115`; `probes/repair/walk-contexts-base.txt`.
  - The same wording goes into the records that repeat the callout: `record.md`'s new FACTS entry ("and (`:211-224`) for a type parameter only the return type mentions ...") and row 447's note; `decision-record.md` section 2's "Three callouts" and section 6's statement 11.
  - If the edit moves lines, re-point the citations of `inference.tex` below `:211` in `record.md`, `decision-record.md` and `probes/for-pavol.txt` (`:218-224`, `:226-236`). No test cites the chapter.
- **RC2, the gather's example list (`decision-record.md` section 6, "The examples to run on both paths at the gather").**
  - Add that walk refuses `a: List[\ZZ64\] = wrap(3)` whether rung K lands or not (M2, `inference.tex:158-160`; `probes/skeptic/r2/r2-examples-base.txt:36`).
  - Add that the compiled path accepts it only once I keeps the expected type at `f(x)` (`:45-48`).
  - Add that `b: ZZ64 = id(3)` already answers the same on both paths (`:79`, `:84`).

  Without this, the gather reads an expected refusal as a mismatch to report as blocking.

## 17. Recommended (not required)

- M2's owed test gains a function-form assertion (section 6).
- Row 21, a note: walk leaves a generic method's static parameter uninstantiated where nothing fixes it, `BoxT[\T@...\]` for `Fac.mk()`, where the function form erases to `BOTTOM` (`probes/skeptic/r2/r2-resultonly-base.txt:93`, `:115`); and `O.wrap(3)` stops with an InterpreterBug, "Symbolic type T@... is being matched to value 3: ZZ32" (`probes/skeptic/r2/r2-examples-base.txt:58`).

## 18. For Pavol

- The lone type parameter's candidates. The chapter names its arguments' types and the types they coerce to, and not its bound. The brief and rung I's section say "the narrowest of its arguments' types and its bound". The two differ in one shape no test reaches (section 4's `g(w, r, z)`: `Number` against the union). The gather checks it as statement 5. Evidence: `Specification/basic/inference.tex:83-98`; `explorations/coordinator/CLIMB-BATCH-N.md`, section 3, T, "What it writes", and section 3, I; `explorations/compile-ladder/rung-spec-inference/decision-record.md` section 5, decision 4.

---

# The first judgement (`fc7b5a8e7`), kept as it was

## Skeptic: rung T, the type-inference chapter (climb batch N, rung-spec-inference), first judgement

**Verdict: refused.** The one thing that must change: the new text makes statements about what the implementations do that runs on the base contradict, and each must be made true, along with the record's lines that repeat them. The chapter's rule covers `bool` static parameters, which neither path infers (a stop the record reserves: normative text stating more than rung I builds). Its last callout says the checker refuses a result-only parameter bounded by `Any`, which it does only for a call with no expected type. Appendix I's rationale says the numeral default "is what both implementations did before this change", and the compiled path did not do it for the chapter's own example. The corrections are listed in section 14. The rest of the rung checks out: the recorded before, the two builds, the re-anchoring, the quoted originals and the ranges sentence, which I checked on both paths.

Machine for every probe below: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, load 0.38 1.02 3.54 at the first probe's start (each capture's first line has its own), OpenJDK 25.0.4, `FORTRESS_THREADS=1`, tree `5cc3e32f0` (the worker's last commit; it changes no source, library or checker, so the implementation is the base `bce66f1fa`'s). One thread count: the rung's diff is prose and test messages, with no mutable state, transaction or library write.

## 0. What I read and what I checked

- The briefing part the prefix names (facts-extract, three parts): the numerics plans, the two decisions of the conversion judgement, the JVM principle, S1, the unrevised copy's name, the stops, a size used as a value; rows 447 and 485; the judgement's section 1; the shadow's section 7; the base chapter; "Passages not yet revised"; rung S's form section; the FACTS entry on the specification's silence. The batch record's sections 1, 3 (I, K and T) and 4.
- The worker's five commits, `bcd9f07df..5cc3e32f0`: the list and the base's build come first (`bcd9f07df`), then the ranges probe on the base (`4a43f910f`), then the edit (`86ba0afa6`). REPORT.md is not on the branch (the harness refused it); I read its text in the worker's structured result. `git status` was clean before my probes.

## 1. The provenance block (check 2)

All five lines are present. I opened each citation:
- problem: `Specification/basic/inference.tex:15`. On the base this line is `\note{This chapter will include ...}`, which is what the block says. In the tree it is the new chapter's first sentence. The earlier specification rungs write such a citation "at <commit>" (`rung-spec-numbers/REPORT.md`, `rung-spec-route-a/REPORT.md`, their problem lines). **Correction C7.**
- spec: `conversions-coercions.tex:470-480` is the resolution, as the block says. The block's "the substitutability its admission step uses" is at `:417-432`, which it does not cite. The map rows `spec-to-implementation.md:193` and `:257` are right. No `library/apis/` citation. **C7.**
- precedent: `rung-spec-ranges/decision-record.md:65-69` (rung U's form) and `conversion-overloading-judgement.md:109-117` (the rule's words): both say what the block says.
- deviation: `inference.tex:80-95`, `:106-112`, `:194-198`, `:145-155`, `:41-47`; `changes.tex:1710-1723` and `:478-481`: each line says what the block says.
- historical: the four specification files the diff edits. The nine re-anchored tests are the revival's, not the 2012 tree's.

## 2. The recorded failure (check 3)

A prose edit has no test that can go red. The rung's "before" was captured and committed before the edit: the base build's Chapter 20, the draft note alone (`probes/build/base-chapter-text.txt`, committed in `4a43f910f`, before the edit's `86ba0afa6`), a 631-page build whose text equals the committed PDF's (`probes/build/committed-vs-base-pdftotext-diff.txt`, empty). The ranges sentence was run on both paths before the edit (`probes/examples/SizeAsComponent-base.txt`). I checked the builds: 631 pages on the base (`probes/build/base-tex.txt:16580`) and 634 edited (`probes/build/edit-tex.txt:16904`), `BUILD SUCCESSFUL`, the same warnings in the last LaTeX pass of each (7 "Float too large", 3 marginpar, 6 hyperref tokens, 1 `\over`, 8 mdframed lines), and no undefined reference in either. `diff-hunks.txt` names a cause for each of the 31 hunks, and the chapter hunk (`8386,8387c8394,8499`) reads as the source says.

## 3. The diff against the decisions, the judgement and rung I's section (checks 4 and 12)

**Choice** (`inference.tex:58-67`): the coercion chapter's order, applicability and comparison on declared, quantified types. This matches decision 1 and the judgement's Resolution, and it is right. **Instantiation** (`:69-103`): a structured position fixes its parameter by subtyping, a return type fixes it by the expected type, a lone parameter takes the narrowest of its arguments' types and their coercion targets, else the union; admission by substitutability; static insertion. This matches the judgement's Instantiation and I's section ("the arguments whose declared types mention a static parameter fix it, the others are converted, and a parameter that stands alone takes the narrowest type its arguments convert into"). The lone parameter's candidates and the union are the worker's reported decisions 4 and 5, checked at the gather. **Dispatch** (`:132-135`) is the judgement's sentence. **Numerals** (`:157-180`) is Q1's default, stated once, as decision 1 has it. The `op(z, w)` example is probe K's fork as decision 1 settles it. Five statements do not survive the runs:

- **F1, `bool` static parameters (a stop; C1).** `:15-18` says a call "whose declaration has static parameters ... need not write its static arguments", and `:73-76` says a static parameter that a parameter type mentions "is fixed by the argument at that position". Both cover a `bool` parameter. Neither path infers one: `untag(Tag[\false\](4))` with `untag[\bool b\](t: Tag[\b\])` is refused by the compiled checker, "Static argument inference for the bool static parameter b is not supported by the type checker.", and walk fails, "Cannot unify Tag[\false\] ... with Tag[\b\]" (`probes/skeptic/SkBoolParam-base.txt:5`, `:16`). The refusal is pinned by `ProjectFortress/compiler_tests/XXXNatBoolChecker.test:3` (rows 307 and 21), and rung I's section changes nothing for `bool`. `nat` and `int` parameters are inferred on both paths (`probes/skeptic/SkIntParam-base.txt`: 7 and 7 on each). So the chapter states more than rung I builds: the stop in the batch record's intro for T.
- **F2, the result-only callout (C2).** `:204-207`: "the compiled type checker refuses the call when the bound of the parameter is Any, and binds the parameter to BottomType under any other bound". Under `r[\T extends Any\](s: String): T`, the checker refuses the call only where it has no expected type: a call written `r("a")`, whose expected type is dropped today, and an argument (`probes/skeptic/SkResultOnly-base.txt:10`, `:39`). As a method invocation, which keeps the expected type, `x: ZZ32 = O.r("a")` compiles and runs (`:24-30`). The call site's arrow carries the result as `java/lang/Object`, row 447's descriptor for `BottomType`, and neither as `ZZ32` nor as `fortress|AnyType%Any` (`probes/skeptic/SkROAnymeth-javap.txt`). Once rung I keeps the expected type at `f(x)`, the call written `r("a")` joins the accepted case: I's section says the kept expected type binds a result-only parameter to Bottom. Unbounded and `Object`-bounded forms are accepted in all three positions (the compile path's implicit `Object`, row 412). The decision record's statement 11 for the gather (`decision-record.md:116`) expects "`f[\T\](): T` refused", which the compile path accepts (`SkRONone*` in the same capture).
- **F3, Appendix I's rationale (C3).** `changes.tex:1611-1615`: "The numeral's default is what both implementations did before this change, the interpreter giving a numeral the narrowest ... and \library\ declaring their numeral type below ℤ32". The compiled path's library declares `IntLiteral` beside `ZZ32` and excluding it (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390`). Its pick among tied declarations follows declaration order: `g(0)` over `g(x: NN32)` declared before `g(x: ZZ32)` runs `g(NN32)` in four compiles out of four, and `h(0)` with `ZZ32`'s declared first runs `h(ZZ32)`. Walk runs the `ZZ32` declaration in both (`probes/skeptic/SkNumTie-base.txt:3-4`, `:9-20`). This is the chapter's own example (`inference.tex:170-171`). `\library\` is the interpreter's library (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:117`, `object IntLiteral extends { ZZ32 }`). Row 391 records the same tie's pick varying.
- **F4, the expected type's contexts (C4).** `:106-112` gives four contexts. All four behave as stated on the base, and the two it names as dropped do drop the expected type (`probes/skeptic/SkCtx-base.txt`: a typed local and a top-level binding, a block's last expression, a declared return type and both `if … else` branches are accepted with `T` fixed to `ZZ64`; after a local declaration and as an argument, `BoxT[\BottomType\]`, `:9`, `:22`). The checker also keeps the expected type at two contexts the list omits: an assignment, `a := Fac.mk()` (`:18`, accepted), and a field declaration (`:16`, accepted), where the coercion chapter says "variable and field declarations" (`conversions-coercions.tex:117-118`). The worker's decision 6 says the list is "as the checker has them" (`decision-record.md:90`).
- **F5, the expected type chooses a declaration on the compiled path (C5; row recommended).** `:58-67` with `:116-122` chooses the declaration on its declared types and uses the expected type only to instantiate it. That is decision 1 ("never changes which declaration runs when one already fits") and today's coercion chapter (`conversions-coercions.tex:472-476`). The compiled checker on the base does otherwise at an operator and at a method invocation. Take `opr OPLUS[\T extends ZZ32\](x: T, y: ZZ32): T` beside `opr OPLUS(x: ZZ64, y: ZZ32): ZZ64`. Then `c: ZZ32 = z OPLUS z` runs the generic, and `d: ZZ64 = z OPLUS z` runs `OPLUS(ZZ64, ZZ32)` with `z` converted, where the generic fits at `ZZ32` (`probes/skeptic/SkExpRunTop-base.txt:21-23`). The method form behaves the same way (`probes/skeptic/SkExpRun-base.txt:17-19`). Walk runs the generic in every case (`SkExpRunTop-base.txt:4-10`). The call written `k(z)` runs the generic today only because the expected type is dropped there (`:17-19`). The mechanism: `checkApplicableWithInference` passes the context into `inferStaticParams` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:225`), which adds "range <: context" (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:939-940`). So a generic candidate whose instance cannot meet the expected type is dropped before the choice, and a plain candidate applicable only with coercion is taken. I's section keeps a first attempt "by subtyping with the expected type", so after I the call written `k(z)` is predicted to run the plain declaration too: I's own stop, "a ranking that lets a declaration needing a conversion win over one that fits the call as it is". The return-type rule rules out the easier case, a less specific declaration winning by subtyping (`probes/skeptic/SkRetRule-base.txt`). By rule 4, the specification settles the divergence against the compiled run: the chapter, the coercion chapter and decision 1 all say the generic runs. The repair is in the checker, which is I's file. The chapter is right, but the decision record's section 6, the gather's list for checking T against I, does not name this check.
- The interpreter's callout (`:145-155`) describes rung K's build, and the decision record gives the gather replacement text if K does not land (`decision-record.md:118`). The callout's "narrower instance" has a consequence today that it does not mention: walk instantiates at its own run-time class `Int` and then refuses a well-typed binding (F10, section 10).

The other passages: the ranges sentence (`ranges.tex:46-50`) and its callout (`:51-58`); answer 8's callout (`basic-integers.tex:90-94`, line count kept); I.1.18's effect (`changes.tex:1107-1110`); the new entry (`:1549-1703`); "Passages not yet revised" (`:1710-1723`). Each says what the decisions say. The ranges sentence names `nat` and `int` where Pavol's entry says "a size". The batch record's T section reads it "a `nat` or `int` parameter used as a value", and both paths run an `int` parameter the same way. I accept it as the record's reading, and the worker reported it (decision 12). The quoted originals match `git show bce66f1fa:<path>` and `Specification-1.0-frozen/basic/inference.tex:12-27`. The papers quoted in the rationale say what the entry quotes (`Papers/Types/setup.tick:396-397`, `rules.tick:118-129`), and the later Types chapter has no "infer" (`grep -c`: 0).

## 4. Precedent (check 5)

The worker followed rung U's form (a callout per changed passage group, the revival's own sentences quoted in Appendix I with their base path and lines, line counts kept) and reused rung U's build and re-anchoring scripts. It counted the passages that repeat answer 8's interim rule (three) and gave a reason for the one it left (`changes.tex:478-481`, now fulfilled, not false). That is the right precedent, and I found none it missed.

## 5. The test and the re-anchoring (check 6)

The rung adds no test (its brief forbids one). Of its re-anchoring, I checked independently that each of the 106 changed lines in the nine files differs only in a `ranges.tex` line number. All 123 cited ranges in those lines map to the same text at the base's and the tree's lines. No other file of the three corpora cites `ranges.tex`. No test cites lines 80-94 of `basic-integers.tex` (the callout, whose text changed in place), `inference.tex` or `changes.tex`. No assertion changed.

## 6. Competing declarations (check 7)

The rung declares nothing in a program. Its three new labels (`static-arg-inference`, `numeral-default`, `revival-inference`) are defined once each in `Specification/`, and none appears in `src/com/sun/fortress/`, the corpora or `Library/`. `git diff --stat` shows nothing under `Specification-1.0-frozen/`, `Library/` or `ProjectFortress/src/`, and `Specification/fortress.pdf` is not committed.

## 7. record.md (check 8)

It is finished prose and its paths are tracked (the prefix's check over it prints nothing). Three corrections: the new FACTS entry and row 447's note repeat F2's "a refusal under the bound `Any`" (`record.md:21`, the FACTS entry's "Three callouts" sentence) (C2); the notes omit rows whose citation of the stub the chapter changes (F6, C6); and the FACTS correction to "The specification never wrote static-argument inference ..." drops the sentence naming the passages that point into the chapter (the integer callout, `Empty`'s note, the reductions callout), two of which still do. That third one is a preference, not required.

## 8. The three homes (check 9)

- M1, the compiled path's missing strided range: home 2 is right, because the specification settles it (`ranges.tex:68-76` in the tree). The expected-failure test is prepared (`probes/owed/XXXStridedRangeRungT.fss`, `.test`, with its capture: compiled refused at the stride, walk `PASS`), but not placed, and not shown going red on a deliberate fix. The rung's brief forbids it a test file, so placing it falls to the gather (**C8**).
- My findings F5, F10 and F11 are defects of the implementations that this rung cannot repair, and the specification settles each. So each is home 2, owed in this run, and I prepared each test under `probes/skeptic/owed/` (section 15).
- F1 to F4 are errors in the rung's own text, not program defects. Their home is the text's correction.

## 9. The count table (check 10)

No count table. The rung captures none and reports "Unchanged and not captured". The manifest's `expectedCheckerCount` is 75, the last landed gate's (`climb-batch-6.5/gate/checker-count.txt`). That is a prediction: the rung edits nothing the count or distance stage reads (specification prose and test messages).

## 10. The ledger and the sibling sites (check 11)

- **F6 (C6).** Seven rows cite the stub chapter: 20, 21, 96, 307, 400, 447 and 455. The record notes 447 and 455 only. Row 21 is classed "implementation gap (spec silent)" and says "this cannot be adjudicated against the spec". The chapter now says a method call need not write its static arguments (`inference.tex:15-18`, `:73-76`). Walk still refuses a generic method's own static argument (`O.get(Box[\ZZ32\](z))`: walk "Unification error: Closure/Constructor for get param 1 ... got arg Box[\ZZ32\]", compiled prints 3; `probes/skeptic/SkMethInfer-base.txt:4`, `:15`). So its walk half is now settled against walk. Row 307's remaining `bool` refusal is either stated by the chapter or, after C1, named as not described. Rows 20, 96 and 400 need a one-line note each.
- **F10 (row 364's mechanism, a refusal it does not record).** Walk refuses `a: BoxT[\ZZ32\] = BoxT(z)` for `z: ZZ32`, "RHS expression type BoxT[\Int\] is not assignable to LHS type BoxT[\ZZ32\]", and `wrap(z)` the same. The compiled path binds both (`probes/skeptic/SkWalkIntBox-base.txt:5`, `:17-20`; also `SkExpChoiceFn-base.txt`, `SkExpChoiceOp-base.txt`). Row 364 records only the rendering. The chapter settles it against walk (`inference.tex:80-86`: the lone parameter takes its argument's type, `ZZ32`).
- **F11 (row 21's walk half, above).**
- The ranges sentence at its edges. A `nat` size of 3000000000 used as a component fails at run time on the compiled path as the numeral does ("Not in range for ZZ32: 3000000000", `probes/skeptic/SkRange-base.txt:17`, `:70`; row 325). Under walk the size is refused at its declaration ("Negative nats are unNATural: -1294967296", `:5`; row 418) and the numeral at dispatch (`:53`). A size beside a `ZZ64` component is refused on both paths (`:23`, `:40`), as the sentence says. Nothing new; notes recommended to rows 325 and 418.
- Row 486 (a size bound to `NN32` under walk) stays rung Q's, as the record says.

## 11. The differentials (the required part)

Every program is mine. Captures are under `probes/skeptic/`, run by `probes/skeptic/run-both.sh` (walk, then `fortress compile` and `fortress run` against the compiler library).

| program | walk | compiled | verdict |
|---|---|---|---|
| `SkExpRunTop` T2: `b: ZZ64 = k(z)`, `k[\T extends ZZ32\](x: T): T` beside `k(x: ZZ64): ZZ64` | generic | generic (the expected type is dropped at `f(x)` today) | agree today; the chapter says generic; after I, predicted plain (F5) |
| `SkExpRunTop` T4: `d: ZZ64 = z OPLUS z`, the same pair as operators | generic | `OPLUS(ZZ64, ZZ32)`, `z` converted | diverge; the specification settles it against the compiled run (F5) |
| `SkExpRun` R2: the method form | walk refuses to load (row 21's "Missing type" note) | `O.k(ZZ64)` | the compiled path is against the chapter (F5) |
| `SkRetRule`: a generic beside a plain over `Any` whose return type is `String` | refused at load | refused by the return-type rule | agree; the easier case of F5 cannot arise |
| `SkBoolParam`: `untag(Tag[\false\](4))` | "Cannot unify" | "bool static parameter ... not supported" | agree, both refuse; the chapter states it (F1) |
| `SkIntParam`: `nat` and `int` parameters fixed through the argument's type | 7, 7 | 7, 7 | agree with the chapter |
| `SkRO{Any,Object,None}{fn,meth,arg}`: a result-only `T` | runs all nine (throws inside, caught) | `Any`: refused as `f(x)` and as an argument, accepted as a method; `Object`/none: accepted in all three | the callout is wrong for `Any` with an expected type (F2) |
| `SkNumTie`: `g(0)` over `g(NN32)` declared before `g(ZZ32)`; `h(0)` the other order | `g(ZZ32)`, `h(ZZ32)` | `g(NN32)`, `h(ZZ32)`, four compiles | diverge; the chapter settles it for `ZZ32` once I lands; the Appendix I rationale is wrong (F3) |
| `SkPromote`, `SkPromoteW`: `same(z, w)`, `same(z, u)`, `same(w, r)` | `[ZZ32,ZZ64]`, (walk refuses `u: NN32 = 5`, row 454), `[ZZ64,RR64]` | `[ZZ32,ZZ64]`, `[ZZ32,NN32]`, `[ZZ64,RR64]` | agree today; the chapter's `ZZ64` for the first two is I's and K's to build, checked at the gather |
| `SkCtx*`: nine contexts of `a: BoxT[\ZZ64\] = Fac.mk()` | (compile only) | seven accepted, two refused as the chapter says | the chapter omits assignment and field (F4) |
| `SkRangeBig`, `SkRangeBigLit`, `SkRangeMixed` | size refused at declaration (row 418); numeral at dispatch; mixed at dispatch | size and numeral fail at run time, "Not in range for ZZ32" (row 325); mixed refused statically | the sentence holds; the oversize cases are rows 325 and 418 |
| `SkWalkIntBox`: `a: BoxT[\ZZ32\] = BoxT(z)`, `b: BoxT[\ZZ32\] = wrap(z)` | refused, `BoxT[\Int\]` | both bound | diverge; the specification settles it against walk (F10) |
| `SkMethInfer`: `O.get(Box[\ZZ32\](z))` | "Unification error" | 3 | diverge; the chapter now settles it against walk (F11) |

## 12. The failure-mode question

The rung replaces no loud failure: it changes prose and test messages, and no program behaves differently. Nothing went from loud to quiet.

## 13. Stops met

- **Normative text stating more than rung I builds (the chapter).** Met by `Specification/basic/inference.tex:73-76` (with `:15-18`) for `bool` static parameters: `probes/skeptic/SkBoolParam-base.txt:5`, `:16`; `ProjectFortress/compiler_tests/XXXNatBoolChecker.test:3`. It goes away with C1. On the base it is also met by `:58-67` with `:116-122` against the compiled checker at an operator and a method invocation (`probes/skeptic/SkExpRunTop-base.txt:22-23`, `SkExpRun-base.txt:18-19`); whether I's landed build keeps that is the gather's check (C5). The worker reported no stop. Lifted: `explorations/coordinator/POSITIONS.md:120` (2026-09-27, on the stops a batch record reserves for him: "They are reversible things I can review later. Don't block start of next batches on these.").

## 14. Required corrections (the repair round's list)

- **C1.** `inference.tex:15-18` and `:73-76` state no more than I builds for kinds of static parameter. Either name the kinds the rule covers (type, `nat` and `int` parameters, inferred on both paths, `SkIntParam`) and add to the not-described list a `bool` static parameter (refused by the checker by name and by walk, `SkBoolParam`; rows 307 and 21), or report the stop. Dimension, unit and operator parameters were not measured here; if the chapter names kinds, it names only those it has shown. The Appendix I Change paragraph follows.
- **C2.** The callout at `inference.tex:204-208` says the checker refuses a result-only parameter bounded by `Any` only for a call with no expected type, and otherwise binds it to `BottomType`, as under any other bound (`SkResultOnly-base.txt`, `SkROAnymeth-javap.txt`). The same correction goes to record.md's new FACTS entry, its row 447 note, and the decision record's statement 11 (`decision-record.md:116`), whose "`f[\T\](): T` refused" is false on the compile path (row 412's `Object`); the refused form is `f[\T extends Any\](): T` with no expected type.
- **C3.** `changes.tex:1611-1615`: the numeral default is what the interpreter did, its library declaring the numeral type below ℤ32. The compiled path took one of the tied declarations by its declaration order (`SkNumTie-base.txt`; row 391).
- **C4.** `inference.tex:106-112`: add the right-hand side of an assignment to a variable of declared type, and a field declaration, both of which the checker has (`SkCtx-base.txt:16`, `:18`). Or name them among the not-described contexts. Either way, correct decision 6's "as the checker has them" (`decision-record.md:90`).
- **C5.** Add to the decision record's section 6 a statement 12: a declaration applicable without coercion is chosen whatever the expected type (`inference.tex:58-67`, `:116-122`). Its expectation: `probes/skeptic/SkExpRunTop.fss` prints "ran k generic" for T2 and "ran OPLUS generic" for T4 on the merged tree, where the compiled base runs `OPLUS(ZZ64, ZZ32)` at T4 today. Add the matching sentence to record.md's gather notes. The row is in section 15.
- **C6.** record.md appends notes to rows 21 and 307 (the chapter settles row 21's walk half against walk, `SkMethInfer-base.txt`; row 307's `bool` refusal as C1 leaves it), and one line each to rows 20, 96 and 400 saying what the written chapter says of their case.
- **C7.** The provenance block, which the gather writes from the worker's report text: the problem line reads "`Specification/basic/inference.tex:15` at `bce66f1fa`" (or cites the frozen copy's `:15`), and the spec line adds `conversions-coercions.tex:417-432` for substitutability.
- **C8 (for the gather, not the repair round).** Place `probes/owed/XXXStridedRangeRungT.fss` and its `.test` in `ProjectFortress/compiler_tests/` and show it going red on a deliberate local fix. Do the same for the tests of section 15 that the gather opens.
- After C1 to C4: rebuild with `probes/build/specbuild.sh`, redo the text diff and its hunk list, and recheck the line numbers the decision record and record.md cite.

## 15. Recommended rows (each for the gather to open or refuse)

- **New row: the compiled checker lets the expected type change which declaration runs.** `d: ZZ64 = z OPLUS z` with `OPLUS[\T extends ZZ32\](x: T, y: ZZ32): T` beside `OPLUS(x: ZZ64, y: ZZ32): ZZ64` runs the plain declaration with `z` converted, where the generic fits at `ZZ32`, and walk runs the generic. The method invocation behaves the same, and after rung I a call written `f(x)` is predicted to. The specification settles it against the compiled run (`conversions-coercions.tex:472-476`; `inference.tex:58-67`, `:116-122`; decision 1). The fix is in the checker: the expected type must not remove a candidate from the choice, only instantiate the chosen one (`Functionals.scala:225`, `STypesUtil.scala:939-940`). Probes: `probes/skeptic/SkExpRunTop.fss`, `SkExpRun.fss` with their `-base.txt`. Home 2: `probes/skeptic/owed/XXXExpectedTypeChoiceRungT.fss` with its `.test` fails today at its first assertion. Its control with the static argument written passes (`owed/ExpectedTypeChoiceWrittenRungT.fss`, `owed/owed-written-base.txt`). A guard for the call written `f(x)`, `owed/ExpectedTypeFnChoiceRungT.fss` with `.test`, passes on both paths today (`owed/owed-base.txt`) and goes red if I's kept expected type makes the plain declaration run.
- **Row 364, a note:** the run-time class also makes walk refuse a well-typed binding: `a: BoxT[\ZZ32\] = BoxT(z)` and `wrap(z)` give "RHS expression type BoxT[\Int\] is not assignable to LHS type BoxT[\ZZ32\]", which the compiled path binds (`probes/skeptic/SkWalkIntBox-base.txt`). The rung K section's re-instantiation from run-time types meets it. Home 2: `probes/skeptic/owed/XXXInferredIntBindingRungT.fss` fails under walk and passes compiled (`owed/owed-walk-base.txt`).
- **Row 21, a note and a reclassification:** the chapter says a method call need not write its static arguments (`inference.tex:15-18`, `:73-76`), so walk's failure on `O.get(Box[\ZZ32\](z))` is against the specification (`probes/skeptic/SkMethInfer-base.txt`). Home 2: `probes/skeptic/owed/XXXMethodStaticArgRungT.fss` fails under walk and passes compiled (`owed/owed-walk-base.txt`).
- **Row 447, a note:** under the bound `Any` the refusal holds only for a call with no expected type; `x: ZZ32 = O.r("a")` compiles, the result carried as `java/lang/Object` (`probes/skeptic/SkResultOnly-base.txt:24-30`, `SkROAnymeth-javap.txt`); after rung I, a call written `f(x)` too.
- **Rows 325 and 418, a note each:** a `nat` size above ℤ32's range used as a range component fails as the numeral does: at run time on the compiled path, and at the size's declaration under walk (`probes/skeptic/SkRange-base.txt:5`, `:17`, `:70`).

## 16. For Pavol

- F5: on the compiled path the expected type changes which declaration runs, converting an argument where another declaration fits the call as it is. That is against decision 1, and I's first attempt with the expected type is predicted to extend it to `f(x)`. Evidence: `probes/skeptic/SkExpRunTop-base.txt:21-23`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:225`.
- F1: the specification writes no rule for inferring a `bool` static parameter, and neither path infers one. The chapter should name it as not described rather than state it (`Specification/basic/inference.tex:73-76`; `probes/skeptic/SkBoolParam-base.txt:5`, `:16`).
- F10: walk infers a static argument at its own run-time class `Int` and then refuses a well-typed invariant binding. Rung K's re-instantiation from run-time types meets it (`probes/skeptic/SkWalkIntBox-base.txt:5`; row 364).
