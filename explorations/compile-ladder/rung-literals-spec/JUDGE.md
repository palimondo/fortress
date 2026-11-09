# Judge's ruling on rung T (rung-literals-spec): the contested fix

Head judged: `a3a982814f` (the skeptic's verdict on `1184add1d9`). One fix was contested, `1184add1d9`, by rule (a) of the skeptic's brief: the worker's report argued for the behaviour the fix changes (REPORT.md, "Decisions", 8, and "Questions for the curator", 1). I built nothing and ran nothing; every point below is a line of the tree or of the record.

## The fix

`1184add1d9` rewrites two sentences of Appendix I and adds one test:

- `revival-numerals`' Effect (`Specification/appendices/changes.tex:5144-5156`) and `revival-numeral-type`'s (`:3796-3803`) no longer state, as the design's answer, that `u ≠ 0` is `true` for a zero `u` of `NN32`, `NN64` or `RR32` and `q ≠ 0.5` is `true` for `q: QQ = 1/2`. They state it as a departure of the library's top-level `≠` from `operator-NE`, with its row (row 966 in `record.md`, rewritten from CONTESTED, design limit, to NEGATIVE-VERIFIED, implementation gap), and add that the compiled path's own library answers `false`.
- `ProjectFortress/tests/XXXNotEqualNumeral.fss`, a home-2 expected failure that asserts the specification's answer, `NOT (u =/= 0)` and its three siblings.

## Ruling: upheld

**The specification settles the answer, and no decision on record changes it.**

- "The expression \EXP{e \neq e'} is semantically equivalent to the expression \EXP{\neg(e = e')}" (`Specification/basic/operators/opr-overview.tex:272-273`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/operators/opr-overview.tex:262`). "The infix operator \EXP{\neq} applies \EXP{\neg} to the result of \EXP{=} on the same operands" (`Specification/basic-lib/Fortress.NegatedOperators.tex:46-47`, `operator-NE`; the same in the Draft). The number chapters point to it for every number type: `Specification/basic-lib/basic-integers.tex:668` and `numbers.tex:404`, "For \EXP{\neq} \see{operator-NE}."
- The rung's own text makes `u = 0` `true` at every number type: "Each type that coerces from a numeral type declares \EXP{=} with it ... so that \EXP{u = 0} is \VAR{true} for a zero \VAR{u} of any of the eight types" (`Specification/basic-lib/numbers.tex:51-54`), as P-173 keeps the pairs ("The library's `=` pairs over the numeral types stay") and P-172 gives `1/2 = 0.5` `true`. With `operator-NE` standing, the text must then give `u ≠ 0` `false`. The worker's Effects gave it `true` with no word of `operator-NE`, so the specification contradicted itself in two places that no callout linked.
- P-173 says where a numeral converts: "`Any`, `Object`, `Number`, an unbounded type parameter and no declared type take the default." It says nothing of `≠`; neither do P-165, P-168 or P-174. The `true` is what P-173 makes of one library declaration, `opr =/=(a:Any, b:Any):Boolean = NOT (a=b)` (`Library/FortressLibrary.fss:98`), which receives the numeral at `Any`, defaults it, and so does not apply `=` "on the same operands". That is the library departing from `operator-NE`, not the design revising it. Stating it as the design's answer is a sentence the decided design does not state, the section's one reserved point ("Reserved points. A sentence the decided design does not state."), which the worker itself listed (REPORT.md, "Points to report": "A sentence written that the rungs' sections do not support: the inequality").
- POSITIONS P-25: "`Specification/` stays the standard". Where the text and an implementation disagree and a source settles which side is right, the other side is the departure, named in the entry's effect with its ledger row (`fortress-repo`, `specification.md`, "Changing the text: the revision form", part 1: "The effect names each departure ... with its ledger row"; "When the text and an implementation disagree").

**The home is 2, as the skeptic says.** `tests-writing.md`, "How a defect is recorded": home 2 is a deferred defect "the specification settles", with "a gated `XXX` test that asserts the specification's answer"; home 3 is for one where "the specification is silent or a conflict leaves it open". It is not silent (above).

**The precedent is exact.** Row 807 is the same defect of the same declaration at another argument: "the library's `=/=` ... compare[s] by identity two values whose own `=` no `FortressLibrary` trait declares: ... `P(1) = P(1)` and `P(1) =/= P(1)` are both `true`", NEGATIVE-VERIFIED, implementation gap (library), cited to `basic/operators/opr-overview.tex`, "GCD, LCM, and CHOOSE Operators", with `ProjectFortress/tests/XXXNotEqualOwnEquality.fss` (`explorations/fortress-gap-ledger.md:423`). Climb batch 21 filed it so at its fork 10, "the `=/=` defect filed with its expected failure", landed as taken (`explorations/coordinator/PLAN.md:542`, under "Climb batch 21, listed for his review"). The skeptic's test follows that file's form, its messages citing the same sentence by file and section.

**The path.** `ProjectFortress/tests/` is outside the section's files ("Files. `Specification/` only"). The worker was right that it could not write the test (`tests-writing.md:87`: a brief that does not let you edit there writes the row, and "the change that next works there writes the test"). The skeptic's brief lets it: "A test of a defect you find ... goes in the test folder for its kind ..., whatever the section's list of files says; where that list lacks the folder, the test's path goes in pointsReached". SKEPTIC.md lists it ("Points to report": "A file edited beyond those named: `ProjectFortress/tests/XXXNotEqualNumeral.fss` (mine)"). The same form landed in climb batch 20's rung A ("a file edited beyond those named: `ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss` ... the gated home of the defect", `444f370184`). No rung's tree names the file (SKEPTIC.md, "What I checked", 10), and a new test file changes no declaration.

**The test.** It was seen failing through the harness on the base's code and red when changed for one run to assert the departure (SKEPTIC.md, finding 1: "OK Saw expected exception", "OK (1 test)"; then "PASS", "Missing expected failure", "Tests run: 1,  Failures: 1,  Errors: 0"). It stays an expected failure on the merged tree by reading: rung N adds `=` pairs and no `=/=`, so `u =/= 0` still reaches `FortressLibrary.fss:98`, where the numeral defaults to `ZZ32` and `NN32` declares no `=` with `ZZ32`. It keeps the batch's five rules: its operands are typed, it asserts no static argument, no message and no string `SEQV`.

## Which claims were right

The worker, right:
- P-173 converts a numeral at `Any` into its default, and the library's `=/=` is declared at `(Any, Any)` with no pairs (`Library/FortressLibrary.fss:98`); so walk answers `true`, as its probes at the base measured (REPORT.md, "Programs run, old against new").
- The base's "Inequality is not converted" (`changes.tex:3779` at `b430f9f428`), which gave the compiled checker's `≠` an unconverted `IntLiteral` that reached the `=` pair, is false under P-173 and had to go.
- It could not itself write the test (`tests-writing.md:87`).

The worker, wrong:
- That the inequality is "the design's answer". No decision states it, and `opr-overview.tex:272-273` and `operator-NE` state the opposite. Its own evidence, `specification.md`'s "so that no disagreement between the text and an implementation stays hidden", argues for naming the departure, which its text did not: it hid a disagreement between two passages of the text.
- Home 3. The specification is not silent (above).

The skeptic, right:
- The specification settles it (`opr-overview.tex:272-273`; `Fortress.NegatedOperators.tex:46-47`).
- The prelude, until the switch-over, declares `≠` on each integer type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:230`, `:300`, `:360`), and its compiled run at the base printed "NN32 u = 0: true", "NN32 u =/= 0: false" (SKEPTIC.md, "The programs").
- `QQ` already declares `opr =/=(self, other:QQ):Boolean = NOT (self = other)` (`Library/FortressLibrary.fss:583`); row 807 is the sibling.
- The library's repair is not this rung's: `FortressLibrary.fss` is N's file and outside T's.

The skeptic, imprecise, without effect on the ruling:
- "`numbers.tex:404` names for the number types": that line is in the rationals section; the integers' pointer is `basic-integers.tex:668`. Both point to `operator-NE`, so the claim holds.

## Decision: stands

No revert. The rung lands as the branch holds it at `a3a982814f`, with this file.

## For the gather

1. `changes.tex:5152` cites "row~NEW-T-1 of the revival's gap ledger". When the gather files NEW-T-1 with `ledger.py add`, it replaces that placeholder in Appendix I too, as climb batch 23's gather did for NEW-W-1 to NEW-W-3 ("their placeholders replaced in Appendix I and the rung's files", `640acb4a17`).
2. row 966's notes (`record.md:23`) give two fixes: "a `=/=` beside each `=` pair, or `=/=` on each number type as `NOT (self = other)`". By the text, the second, with an operand of the number type, is not chosen for `u =/= 0` while `=/=(a:Any, b:Any)` stands. A numeral is applicable without coercion only "to a parameter of its default type and to a parameter of a type that fixes no type for it", and any other conversion is a coercion (`Specification/basic/conversions-coercions.tex:108-111`). A call takes a declaration applicable without coercion before it considers coercion (`:496-499`). `QQ`'s own `=/=` (`FortressLibrary.fss:583`) did not change walk's `q =/= 0.5` at the base (REPORT.md, "Programs run, old against new": "QQ q =/= 0.5: true"), which agrees with this. So the row's second way should name a numeral-type operand, or a change of the `Any` declaration. The rung that repairs row 966 measures it. This is a note in a row, not the specification's text, so it holds no landing.
