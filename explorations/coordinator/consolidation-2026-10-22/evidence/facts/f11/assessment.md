<!-- Chunk f11 of the FACTS clarity assessment: F-118 to F-126 and F-128 to F-130, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `4caa90c81` (FACTS last changed at `09e1338df`). -->

# FACTS chunk f11: assessment

The base is `main` at `4caa90c81`. FACTS last changed at `09e1338df`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports, the tests, the ledger rows, the library and the code. I ran no experiment and searched no transcript.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-118 | **fail** | pass | **fail** | pass | pass | pass | **reword** |
| F-119 | pass | pass | pass | **fail** | **fail** | pass | **reorganize** |
| F-120 | pass | pass | pass | pass | pass | pass | keep |
| F-121 | pass | pass | pass | **fail** | pass | **fail** | **reword** |
| F-122 | pass | pass | **fail** | pass | pass | pass | **reword** |
| F-123 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-124 | **fail** | **fail** | pass | pass | pass | pass | **reword** |
| F-125 | pass | pass | **fail** | **fail** | **fail** | pass | **reorganize** |
| F-126 | pass | pass | pass | pass | pass | pass | keep |
| F-128 | **fail** | pass | **fail** | pass | pass | pass | **reword** |
| F-129 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-130 | pass | pass | pass | **fail** | pass | pass | **reword** |

Counts: keep 2, reword 8, reorganize 2, investigate 0. For each fail, the code, the ledger or the cited report gives the correct statement, so no question has to be settled first. Every fail is a claim that a reader would act on wrongly, or a gate or pointer that is missing or wrong. None is a difference of surface form. One fail of F-121's consistency is in a POSITIONS entry, P-44. It goes to the POSITIONS pass, not to this chunk.

## F-118, a numeral's value on the compiled path

- **Scope: fail.** The entry names one limit, the signed printing of row 326. A second limit of the same kind is open. `IntLiteral`'s comparisons convert both sides with `asZZ64` (`LibraryBuiltin/CompilerBuiltin.fss:912-917`). So `a = 18446744073709551615` then `a < 5` fails with `Not in range for ZZ64` (row 328, open; the R2 report's divergence table, probe `p37`). Quoted: "A numeral's value reaches the compiled world intact." and "So does an `IntLiteral` arithmetic result of 64 bits or more." From these, a reader concludes that every operation on such a numeral is exact. The support shows only that the value arrives and that arithmetic keeps it.
- **Present meaning: pass.**
- **Evidence: fail.** The split by exact bit length is in the code (`compiler/codegen/CodeGen.java:3892-3894`, "l <= 31 is exactly the int range"). The test asserts the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64` (`compiler_tests/IntLiteralWrapRepairR2.fss:28-59`). The arithmetic sentence has other support: the skeptic's probe `probes/skeptic/s3` in the cited section, "The failure-mode question", and `nativeHelpers/simpleIntLiteralArith.java:19-22`, which carries a result of 64 bits or more as its decimal string. No line of the test computes an `IntLiteral` result of 64 bits. Quoted: "So does an `IntLiteral` arithmetic result of 64 bits or more. [...] Gated by `compiler_tests/IntLiteralWrapRepairR2`." The gate reads as if it covers that sentence. Also, "as under walk" must not carry over to the arithmetic case: walk refuses `n: NN64 = x + x + 1` ("RHS expression type Long is not assignable to LHS type NN64", same section).
- **Comprehension: pass.** "Compiled world" is not the skill's term ("compiled path"), but its meaning is plain.
- **Ownership: pass.** One subject. Row 317's repair is in the history.
- **Consistency: pass.** F-57 (a numeral's type on each path) agrees. No other entry gives rows 326 or 328.
- **Disposition: reword.** Name row 328's comparison next to row 326's printing. Say that the arithmetic case was observed in the report's probe, and that no test gates it.

## F-119, the scalar extension

- **Scope: pass.** The title and the library agree: eight declarations, `+`, `-`, `MIN` and `MAX` in both orders, with the stated bounds (`Library/FortressLibrary.fss:4906-4915`, `.fsi:2702-2711`).
- **Present meaning: pass.**
- **Evidence: pass.** `tests/ArrayScalarExtension.fss` and `tests/ArrayOperatorsBesideLibrary.fss` exist. Rows 341 and 342 are open (`NEGATIVE-VERIFIED`) and say what the entry says. The review's correction of 2026-09-20 shows that the tests' printed `fail` is an assertion of the harness.
- **Comprehension: fail.** Quoted: "Under walk a lone user declaration of a library operator name is not checked against the library's. Two are, on a cold cache only (rows 341, 342)." "Two are" has no noun, so the reader must supply "two user declarations of one name". "Checked" hides the effect that matters. Row 341 says that such a pair is refused next to the library's generic declarations, even a more specific one. The entry also does not say why this sentence is here. The second test's fixture declares two operators next to the scalar extension, so the test exercises that check only on a cold cache. Quoted: "Gated from an empty cache". This reads as a property of the suite. But `compile-ladder/rung-library-comments/REPORT.md` section 4 records a gated run that met a warm cache and "said nothing about the clause". So the person who runs the test must empty the cache first.
- **Ownership: fail.** Walk's overload check of rows 341 and 342 holds for every library operator name. It changes when row 341 or 342 changes, not when the scalar extension changes. No FACTS entry owns rows 341 and 342. F-155 is the nearest: walk's refusals at load of a family of overloads, and it cites row 341.
- **Consistency: pass.** F-151 and F-156 agree with it. F-155's case of row 341, a rank-specialised `×` refused next to the library's, is the same rule.
- **Disposition: reorganize.** Move walk's rule to an entry of its own, or into F-155, with rows 341 and 342. The rule: one user declaration of a library operator name is not checked; two are checked, and are refused next to a generic declaration, but only on a cold cache. Keep one sentence in F-119: a program's own pair of these operators next to the block is refused on a cold cache and passes on a warm one, so run the tests from an empty cache.

## F-120, an imported top-level variable on the compiled path

- **Scope: pass.** The title, the body and the report agree on the compiled path. The report's section on the interpreter shows that walk also reads and assigns such a variable; the entry claims nothing about walk.
- **Present meaning: pass.**
- **Evidence: pass.** `isMutableName` is at `scala_src/typechecker/STypeChecker.scala:345`, and its caller is at `impls/Operators.scala:467`. `importedVarIsMutable` is at `compiler/codegen/CodeGen.java:5996`, and its use is at `:6042`. `ExportVarRungX.test` links and runs to `PASS`. `XXXExportVarRungXFrozen.test` is the compile-refusal form of the skill's `tests-writing.md` and expects "Cannot assign to immutable variable: ExportVarRungXApi.fixed".
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** No other entry has this subject.
- **Disposition: keep.**

## F-121, the team's commented tower closure

- **Scope: pass.**
- **Present meaning: pass.** The comment stands at `Library/FortressLibrary.fss:683` and `.fsi:445`.
- **Evidence: pass.** `Specification/basic/traits.tex:236-246` gives the rule for a `where`-clause variable. F-146 and F-251 give the checker's opening of such variables. No ruling in POSITIONS decides whether the clause is valid.
- **Comprehension: fail.** The entry gives three facts and no conclusion. It does not say what is open, or what a worker does. Quoted: "The specification lets a listed type hold a `where`-clause variable, at every value of it. The compiled checker opens a listed type's `where`-clause variables, of a `nat`, an `int` or a type (F-146, F-251)." From these two sentences, the reader infers that the clause is now valid and would check. The source that the entry cites says that the checker's acceptance of this spelling "is not measured" (`coordinator/process-engineering/facts-slice-2.md`, "Points for the checker", point 1). The entry does not say this. It also does not say that the comment stays by a default.
- **Ownership: pass.**
- **Consistency: fail.** Two differences are not made explicit.
  1. Two records on the same subject are not named. P-151 builds, of the team's commented `where` clauses, only `AnyList`'s. PLAN, "Climb batch 17, listed for his review", item A.skeptic.1, holds the open question: do the team's other commented clauses become live, `AnyIntegral`'s among them? Its default is "none touched, P-151 naming `AnyList`'s comment only". So the comment stays by a default that waits for the curator. The entry does not distinguish this from a ruling.
  2. The linked P-44 says "here `comprises Integral[\I\] where [\I\]`, whose `where` form is not built". F-251, which F-121 cites, says that the form is built: the checker opens a type `where`-clause variable, and walk binds it. `Library/List.fss:87` holds the live clause `comprises { List[\E\] } where [\E\]`. The cited report, section 4, also says "the grammar has no way to say so". That reading is older than the specification's revision, which gives the clause its meaning through the declaration's `where` clause (`traits.tex:236-246`; `facts-slice-2.md` point 1).
- **Disposition: reword.** Say that the comment stays by PLAN's default. Name P-151 and the PLAN item as the place of the open question. Say that the checker's acceptance of the spelling is not measured. P-44's "whose `where` form is not built" is for the POSITIONS pass to correct.

## F-122, `round` half to even

- **Scope: pass.**
- **Present meaning: pass.**
- **Evidence: fail.** Quoted: "on both paths. [...] Gated by `tests/RoundHalfEvenRungR.fss`." That test runs under walk only. On the compiled path, `library_tests/RR64FunctionsRungF.fss:87-90` gates the ties. NaN and saturation on the compiled path have other support: the report's differential (section "Differentials", item 2, `probes/RoundHalfEvenCompiledProbe.txt`) and the code (`nativeHelpers/simpleDoubleArith.java:133`, `Math.rint`). The code agrees on both paths (`interpreter/glue/prim/Float.java:384`, `RR32.java:326`).
- **Comprehension: pass.** A note for the rewrite: row 360 departs from the specification, which rounds the rational that the numeral denotes. The entry does not say that it departs.
- **Ownership: pass.**
- **Consistency: pass.** No other entry has this subject.
- **Disposition: reword.** Name the compiled gate, and the kind of evidence for the compiled edge values.

## F-123, the default rendering on the compiled path

- **Scope: pass.**
- **Present meaning: pass.**
- **Evidence: pass.** `compiler_tests/DefaultRenderRungS.test` links and runs to `PASS`. Rows 321, 363 and 364 are open and say what the entry says. The report section "Defects and their homes" holds the detail.
- **Comprehension: fail.** Quoted: "`asDebugString` and `asExprString` (row 363) and a generic object's static arguments (row 364) still print differently from walk." The title takes walk as the model, so "still ... differently from walk" reads as work owed on the compiled path. For row 363 that is true: it is a gap of the compiled prelude. Row 364 is walk's defect. Walk infers the static argument from the run-time class, so `Cell("s")` prints `Cell[\FlatString\]`. The compiled `Cell[\String\]` is the specification's answer (report item 7; row 364, "implementation gap (walk)"). Also quoted: "A zero-argument Fortress member named `toString` overflows the stack (row 321)." The row says "declaring or inheriting". The inherited case is the one that P-91 needs: after the switch-over, every object inherits such a member.
- **Ownership: pass.**
- **Consistency: pass.** P-91 agrees: the bare type name is built on both paths, and rows 363 and 321 are still to build.
- **Disposition: reword.** Say that row 364 is walk's defect. Say "declares or inherits" for row 321.

## F-124, the compiled path's integer rules

- **Scope: fail.** Quoted: "The overflow checks fire only at the minimum, so `|0|`, `-0` and a zero factor answer 0." Only three checks test the minimum: negation, absolute value and division (`nativeHelpers/simpleLongArith.java:78-92`, `simpleIntArith.java:78-92`). Addition and subtraction test the sign bits, so they catch every overflow (`simpleLongArith.java:58-67`). Multiplication uses `Math.multiplyExact` (`:70-76`), which throws on every product that overflows. The report says this: the guards that were `x == -x` now test the minimum, and the multiplication guards became `multiplyExact` (section 1, item (c)). A reader of the entry concludes that a `ZZ64` multiplication overflows only at the minimum.
- **Present meaning: fail.** Quoted: "where walk differs, section 9." Section 9 records walk on that rung's tree. Since then, walk's shifts, `narrow` and overflow were brought to the compiled answers (F-125; F-132; rows 347 and 379 fixed). So the pointer reads as a current difference, which the record no longer holds.
- **Evidence: pass.** `IntSemanticsRungB.fss` asserts `LSHIFT` and `RSHIFT` on both widths (`:45-84`) and `narrow` (`:147-148`). Row 386 is fixed with this test.
- **Comprehension: pass.** "The sign" means 0 or -1. P-69 says this plainly.
- **Ownership: pass.**
- **Consistency: pass.** P-69 gives the same compiled scope as F-124: `ZZ32` and `ZZ64`, with a count of the shifted value's own type.
- **Disposition: reword.** Name the checks that test the minimum. Drop the pointer to section 9, or say that it is history.

## F-125, walk's shifts and integer functions

- **Scope: pass.** What the title claims, the body and the code support. The body says more than the title (see Ownership).
- **Present meaning: pass.**
- **Evidence: fail.** Quoted: "`CHOOSE` answers 0 for `k < 0` or `k > n`. [...] Gated by `tests/IntSemanticsRungI.fss`. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4 and 7." `IntSemanticsRungI.fss` has no `CHOOSE`. `tests/PowChooseLcmRungE.fss:70-72` gates the claim (row 337, fixed by climb batch 6.5b's rung E). The cited sections hold GCD and LCM (4.2) and the `RangePrototype` edit (7), not `CHOOSE`. The entry's text before the rewrite of 2026-10-13 named `PowChooseLcmRungE.fss`.
- **Comprehension: fail.** Quoted: "So the team's test `RangePrototype.fss` computes its signed stride with `GCD`." The "So" does not follow from the sentence before it. Report section 7 gives the link. The test's prototype took its direction from a signed `LCM`. When `LCM` became nonnegative, its two lines were rewritten to compute the signed stride as `(a DIV (a GCD b)) DOT b`. The entry does not give the consequence for a worker: code that used `LCM`'s sign must now compute the sign itself.
- **Ownership: fail.** The entry holds three claims. They answer different questions, and they changed apart: the shift rule (P-69, rung I), the signs of `GCD` and `LCM` (rows 334 and 385, rung I), and `CHOOSE` outside `0..n` (row 337, rung E). The title names only the first. "The compiler prelude has no `shift` (row 383)" also repeats F-126 and P-69.
- **Consistency: pass.** P-69, F-126 and F-132 agree with it.
- **Disposition: reorganize.** Keep the shifts and `ZZ`'s exact `shift` under the present title. For the prelude, point to F-126. Move the signs of `GCD` and `LCM` and the `CHOOSE` answer to an entry of their own, gated by `IntSemanticsRungI.fss` and `PowChooseLcmRungE.fss`. Restate the `RangePrototype` sentence as its consequence.

## F-126, the reserved name `shift`

- **Scope: pass.** The reservation comes from the interpreter's library. The compiled path uses its own prelude, which has no `shift` (row 383, open), so the entry's "under walk" is the right limit.
- **Present meaning: pass.**
- **Evidence: pass.** `shift(self, k:AnyIntegral): ZZ` is at `Library/FortressLibrary.fsi:679` and `.fss:1072`. The renames to `amount` are at `Library/RangeInternals.fsi:206-207`, `:303-304`, `:366`. The skill's `references/library.md:34` states the general rule. The judge's section 3 and the report's section 5 exist.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** It agrees with P-69 and with F-125's last sentence.
- **Disposition: keep.**

## F-128, coercion under walk

- **Scope: fail.** Quoted: "Not converted: [...] and a varargs, keyword or arrow target." Walk does convert a varargs parameter. Report section 1 lists "a single function's, constructor's, method's, native's and varargs parameter". `tests/CoercionCallRungC.fss:38-40` asserts "a varargs parameter converts" and "a native function's varargs parameter converts". The report's limit is narrower: the specification's tuple and arrow coercions, `conversions-coercions.tex:718-726` (varargs targets) and `:730` onward (arrow targets), within its tuple case (section 4; section 5, "Tuple-typed targets").
- **Present meaning: pass.**
- **Evidence: fail.** That same list states as observed what the report calls "not converted and not measured" (section 5; section 11). The list's other items are measured, and each has a row with an expected-failure test. These three are not measured.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** P-59 agrees.
- **Disposition: reword.** Say that the three limits are the specification's varargs, keyword and arrow forms of tuple and arrow coercion, and that they are not built and not measured.

## F-129, a size at run time on the compiled path

- **Scope: fail.** Quoted: "a sized program loads, dispatches and runs compiled." This holds for sizes that are known at compile time. Row 307 (open) says that "a size made from a number known only at run time does not run compiled: `ProjectFortress/tests/NatReflectTest.fss` stops at load". F-146 says that "an opened size does not compile (row 307)". F-36 says "Only a literal size reaches the class loader". The entry's text before 2026-10-13 cited row 307. The present text does not.
- **Present meaning: pass.**
- **Evidence: pass.** `compiler_tests/NatRt*` has 40 files. Report sections 1 and 9 exist. Rows 408 and 412 are open and say what the entry says.
- **Comprehension: fail.** Quoted: "and rows 413, 414 and 416." These are bare row numbers. The record's rule asks for a few words on each pointer. Row 416 is walk's defect: walk's overloading check applies no exclusion of instantiations, while the compiled run prints 3 and 4. But it stands in a list of what is open on the compiled path. Quoted: "Each number has one descriptor, a supertype only of an equal size." "Number" here means a size value (P-41: "Each size value [...] has one descriptor"). "A supertype only of an equal size" needs the reader to know that descriptors take part in run-time subtype tests.
- **Ownership: pass.**
- **Consistency: pass.** P-41, F-18, F-20, F-36 and F-135 agree. F-20 repeats "a sized program loads and runs compiled (F-129)", so recheck it after the rewrite.
- **Disposition: reword.** Limit the claim to sizes known at compile time, with row 307. Give each open row a few words. Say that row 416 is walk's.

## F-130, the wrapping operators

- **Scope: pass.**
- **Present meaning: pass.**
- **Evidence: pass.** `DOTPLUS`, `DOTMINUS` and `DOTTIMES` are on `Integral` (`Library/FortressLibrary.fsi:451-459`). `tests/WrapOperatorsRungD.fss` exists. Row 348 (the prelude's spellings) and row 700 (`LinearCongruential`) are open and say what the entry says. Row 427, the demo's wrap, is fixed.
- **Comprehension: fail.** Quoted: "`Random`'s `LinearCongruential` is built only with the modulus 2^48, and gives wrong numbers for a modulus that is not a power of two (row 700)." The entry does not say how this bears on the wrapping operators. `random` and `perturbed` compute `(mult DOTTIMES widen(state)) DOTPLUS add` and only then take `MOD modulus` (`Library/Random.fss:235`, `:241`; row 700). So they wrap at the width of `N`, and that is right only where the modulus divides 2^w. Without this, a reader can take the defect for a defect of the operators, or for an unrelated one.
- **Ownership: pass.** The LCG is the one library body whose use of the operators is wrong in general. It is an exception to the title's claim, so it belongs here.
- **Consistency: pass.** P-73 and F-132 agree.
- **Disposition: reword.** Say why the LCG is wrong: it wraps at its type's width before it reduces by the modulus.
