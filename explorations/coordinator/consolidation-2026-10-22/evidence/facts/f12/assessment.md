<!-- Chunk f12 of the FACTS clarity assessment: F-131 to F-142, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `4caa90c81`. -->

# FACTS chunk f12: assessment

The base is `main` at `4caa90c81`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the rung reports, the tests, the gap-ledger rows, the library and the code. I ran no experiment and searched no transcript. I made one bounded `git log -S` search, to find where one clause of F-137 came from.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-131 | **fail** | pass | **fail** | pass | pass | pass | **reword** |
| F-132 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-133 | **fail** | pass | pass | **fail** | **fail** | pass | **reorganize** |
| F-134 | pass | pass | pass | pass | pass | pass | keep |
| F-135 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-136 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-137 | pass | pass | pass | **fail** | pass | **fail** | **reword** |
| F-138 | pass | pass | pass | pass | pass | pass | keep |
| F-139 | pass | pass | pass | pass | pass | pass | keep |
| F-140 | **fail** | pass | pass | **fail** | pass | **fail** | **reword** |
| F-141 | pass | pass | pass | **fail** | pass | **fail** | **reword** |
| F-142 | **fail** | pass | pass | **fail** | **fail** | pass | **reorganize** |

Counts: keep 3, reword 7, reorganize 2, investigate 0. The code, the cited reports or a linked entry settles each fail, so no question has to be answered before the nine entries marked reword or reorganize are rewritten. One question remains, about F-144, which is in another chunk. It is under "Outside this chunk" at the end. Each fail is a matter of what the entry says and how. None is a difference of surface form.

## F-131, the flat number tower

- **Scope: fail.** Quoted: "`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR64`, `RR32` and the numeral's type `IntLiteral` are siblings under `Number`." The library declares `IntLiteral` under `Number` (`Library/FortressLibrary.fsi:287`). But only the compiled checker gives a numeral that type. Under walk a numeral is a `ZZ32`, `ZZ64` or `ZZ`, and no numeral reaches `IntLiteral`'s declarations (P-76, F-74). "The numeral's type" names no path. Chunk f6 marked the same phrase in F-79. A smaller point: "The coercions are P-74's". P-74 states the integer widths and the coercions into `RR64`, but not `QQ`'s coercions from the five integer types (`FortressLibrary.fsi:399-404`).
- **Present meaning: pass.** The entry states the current tower, its coercions and three open limits.
- **Evidence: fail.** The cited detail does not show two of the nine siblings, and it contradicts one of them. `rung-flat-tower/REPORT.md` section 5 gives `Number ... comprises { RR64, QQ, AnyIntegral }` and `RR64 ... comprises { Float, FloatLiteral, RR32 }`. That is the tower as rung F left it. `RR32` became a sibling later, in rung V (F-139; `rung-rr32-sibling/REPORT.md` section 1). `IntLiteral` joined `Number` in the numeral library rung (F-79). `tests/FlatTowerRungF.fss` tests the integer coercions and `=` (`:36-76`). It tests neither `RR32` nor `IntLiteral`. The library supports the entry today: `FortressLibrary.fsi:286-302` (`Number`, and `RR64` with `excludes { QQ, AnyIntegral, RR32 }` and `coerce` from `ZZ32`, `RR32` and `IntLiteral`), `:399-404`, `:442-443`, `:489-490`, `:592-594` and `:649-653`. Rows 432, 434 and 436 are open (NEGATIVE-VERIFIED), and section 17 holds all three.
- **Comprehension: pass.** "A bare big operator over a list of numerals" is clear with row 432's example, `SUM <|1, 2, 3|>` with no static argument.
- **Ownership: pass.** One subject, the tower. Row 436 (an empty `SUM` over a group that is not a number) is about `SUM`'s identity witness, which is F-59's subject. It could move there, but here it does not hide the subject.
- **Consistency: pass.** F-79, F-139, F-168, P-74 and P-75 agree. The entry builds P-43 (the exclusion rule stays and the tower is flat, route A), but it does not name P-43.
- **Disposition: reword.** Say that `IntLiteral` is the type that the library declares for a numeral and that the compiled checker gives one, while under walk a numeral stays a `ZZ32` (P-76). Name F-139 for `RR32` and F-79 for `IntLiteral`, or their rungs' sections, beside the flat-tower report. Say that `QQ` converts from the integer types. Add "It builds P-43."

## F-132, overflow under walk

- **Scope: fail.** Quoted: "Every fixed-width operation whose result can leave its type raises it, `^`, `CHOOSE` and `LCM` included". The title says "arithmetic", but the body says every operation. The tests cover `+`, `-`, `DOT`, negation and absolute value (`FixedWidthOverflowRungB.fss:26-70`), and `^`, `CHOOSE` and `LCM` (`PowChooseLcmRungE.fss:58-88`). Two operations keep their low bits by design and raise nothing. `narrow` does so by P-72 (`Specification/basic-lib/basic-integers.tex:39-45`). `LSHIFT` drops the bits that it shifts out (F-125; `basic-integers.tex:52-58`, "no IntegerOverflow is thrown"). The entry names the wrapping operators as the exception, but not `narrow` or the shifts. So a reader can conclude that `LSHIFT` past the width raises.
- **Present meaning: pass.**
- **Evidence: pass.** Both tests exist. They assert the raise and catch it (`overflows`, `PowChooseLcmRungE.fss:6-11`). Rows 453, 521 and 523 to 525 are open. Note: the detail of `^`, `CHOOSE` and `LCM`, and of rows 521 and 523 to 525, is in `rung-size-range/REPORT.md` section 12, items 3, 4, 12 and 17. The entry no longer names that report. `rung-overflow-natives/REPORT.md` section 13 holds only the natives of `+`, `-` and `*` and row 453.
- **Comprehension: pass.** Each open compiled item names its operator and row.
- **Ownership: pass.**
- **Consistency: pass.** P-73, F-24, F-125 and F-130 agree. The fact does not differ from F-125's; only the wording of its scope does (see Scope).
- **Disposition: reword.** Say "every arithmetic operation". Name `narrow` (P-72) and the shifts (F-125) as operations that keep the low bits. Add `rung-size-range/REPORT.md` section 12 to the detail.

## F-133, ranges over `ZZ32`

- **Scope: fail.** Quoted: "its `case` without an operator takes `=` where the specification gives ∈ (row 480)". Row 480 holds this only "in the one-library world", and only "for a guard typed by a type variable bounded by a `Contains` or by a union of `Contains` types". The entry drops both conditions, so it reads as a rule for every `case` without an operator.
- **Present meaning: pass.**
- **Evidence: pass.** `tests/RangeZZ32RungJ.fss` (79 assertions) and `RangeBoundsRungO.fss` exist. Rows 479, 480, 481, 482, 514 and 522 are open. `rung-ranges-zz32/REPORT.md` section 10 holds each one, and it names `XXXRangeWideRungJ.fss` as the test of the refusal of a range over another width.
- **Comprehension: fail.** Quoted: "The range bodies answer at the integer bounds." This can mean that the bodies return the bounds. The meaning is that a range whose bounds are at `MIN` or `MAX` gets the correct answer, with no overflow (F-133's history; `rung-overflow-natives/REPORT.md` section 13, item A).
- **Ownership: fail.** Quoted: "The compiled checker stops on an extremum expression (row 482)." An extremum expression, `case most > of … end`, is not a range. The range rung's skeptic found this defect (section 10, home 2). No FACTS entry owns it, and its row holds it.
- **Consistency: pass.** P-77, F-89 and F-170 agree. Note: row 453, the compiler prelude's range midpoint that overflows, is in F-132 and not here.
- **Disposition: reorganize.** Move row 482 out to its row. Give row 480's two conditions. Say in words what "answer at the integer bounds" means.

## F-134, a clause's bound name, compiled

- **Scope: pass.** The title names the compiled path. The body states the numeral case and the two open cases.
- **Present meaning: pass.**
- **Evidence: pass.** `rung-generic-runtime/REPORT.md` section 1, item 6, and section 7 describe `forTypecase` and `forTry`. `TypecaseBindRungG`, `CastBindRungG` and `library_tests/ClauseBindingRungB` exist. In section 10, the last two lines give the open cases. Rows 498 and 497 hold them, and rows 340 and 322 carry notes on them. All four rows are open.
- **Comprehension: pass.** `cast[\T\]` is the library's top-level function (`Library/FortressLibrary.fsi:24`, `CompilerLibrary.fsi:28`).
- **Ownership: pass.**
- **Consistency: pass.** F-71 tells the reader to write the clause-binding form, citing this entry.
- **Disposition: keep.**

## F-135, a task in a generic declaration

- **Scope: fail.** The title names no path. Quoted: "A parallel task in a generic declaration is generic over its free static parameters." The support is the code generator's `delegate` (section 1, item 2; section 7), so the claim holds for the compiled path only. Walk evaluates tasks and makes no task classes.
- **Present meaning: pass.**
- **Evidence: pass.** `compiler_tests/NatRtTask` and `NatRtMethBoth` exist. Section 1, items 2 and 3, gives the cause and the fix.
- **Comprehension: fail.** Quoted: "so a generic method's `||` operands run as such tasks". In Fortress, `||` is the library's concatenation, and the operands of an operator can run as parallel tasks. Row 420's test uses `||` only as an example. A reader can take `||` for a parallel or a logical operator, and the sentence does not say that it is an example.
- **Ownership: pass.**
- **Consistency: pass.** F-129 says that tasks capture a size as a free static parameter, citing this entry.
- **Disposition: reword.** Say "on the compiled path". Say that the operands of an operator, such as `||`, can run as tasks.

## F-136, a template dispatcher's generic arms

- **Scope: fail.** Quoted: "A generic arm of a template dispatcher is called at the dispatcher's own static parameters, by position." `OverloadSet.atTemplateParams` (`compiler/OverloadSet.java:1342-1353`) does this for an arm only under two conditions. The arm must have as many static parameters as the dispatcher, and every static parameter of the dispatcher must be a type (`KindType`, `:1350`). Otherwise the call takes the old path. F-45 states this limit ("`opr` and `nat` arguments lack it"), but this entry does not.
- **Present meaning: pass.**
- **Evidence: pass.** The three `Dispatch*ArmRungG` tests and the two expected failures of row 499 (`XXXGenericPositionalBox`, `XXXGenericPositionalFixed`) exist. Rows 495, 496 and 499 are open, and rows 493 and 494 are fixed. Sections 7 and 9 hold the change and its reach.
- **Comprehension: fail.** Two passages:
  - "keep rows 493 and 494's defects". The pointer has no words. It means that a dispatch dies with `ClassCastException` when an arm names its static parameters differently from the dispatcher (row 493), or when an arm is dispatched at `ZZ32`, which the run time spells differently from static code (row 494).
  - "An arm in the more-specific relation that is not the dispatcher's by position is tested at the call's instantiation". From this, a reader cannot tell what is tested, or that the result is that the less specific arm runs (section 9).
- **Ownership: pass.**
- **Consistency: pass.** When its scope is stated, the entry agrees with F-45.
- **Disposition: reword.** State the two conditions. Give rows 493 and 494 their defects in words. Say what the instantiation test means for which arm runs.

## F-137, walk's inference with coercion

- **Scope: pass.** The title and the body are both under walk. Row 509 marks where the compiled run differs.
- **Present meaning: pass.**
- **Evidence: pass.** `tests/InferCoercionRungK.fss:40-50` asserts the examples: `ZZ32` with `ZZ64` gives `ZZ64` (`:41`), and `ZZ64` with `RR64` converts nothing (`:47`). `rung-inference-walk/REPORT.md` section 2 gives the two passes, section 6, decision B, the candidates, section 8 row 509, and section 9 the open rows. Note: "a numeral alone at a bound it does not meet" was not measured. Its first text (`041682188`) gave the reason "walk's numeral is a `ZZ32` until rung Q", an inference that P-76 now holds. The entry does not say that it is an inference.
- **Comprehension: fail.** Three passages:
  - "A lone type parameter". The term is not defined. A reader can take it to mean the declaration's only static parameter. In the report it is a type parameter that is the whole declared type of an argument (section 2: "A type parameter that is the whole declared type of some argument is collected for the second pass"). F-73 and F-141 use the term in the same way.
  - "Not reached: rows 432, 486, 510 and 511". These are bare numbers. In words: a type fixed through a structure (432), a `nat` parameter at an `NN32` binding (486), the expected type at a generic result (510), and a varargs or tuple parameter over mixed widths (511).
  - "a numeral alone at a bound it does not meet (P-76)". This is opaque, and P-76 no longer names the case. It means a numeral, which walk reads as a `ZZ32`, passed alone for a parameter whose bound a `ZZ32` does not meet.
- **Ownership: pass.**
- **Consistency: fail.** Quoted: "by P-74's promotion, also for the declaration that an overloaded call chooses (P-46)" and "Where a static type is wider than its value, the two paths instantiate differently (row 509)." P-46 says that walk's promotion from run-time types is "a choice taken without the curator's word, which waits for his review (review-queue item 85)". Item 85 is this split (row 509). The entry presents walk's behaviour as the rulings' work and does not say that it is a default.
- **Disposition: reword.** Define "lone". Give the four rows their cases in words, and the numeral case its reason (P-76). Say that walk's promotion from run-time types, and so the split of row 509, is a default for the curator's review (review-queue item 85).

## F-138, each integer type's `MIN`, `MAX` and `MINMAX`

- **Scope: pass.** The title is under walk. The compiled sentence is about the compiler prelude, by row 442.
- **Present meaning: pass.**
- **Evidence: pass.** The declarations are at `FortressLibrary.fsi:500-502`, `:553-555`, `:611-613` and `:661-663`, and at `FortressBuiltin.fsi:142-144`. Both tests exist. Rows 442 and 484 are open. Row 442's notes give `MAX` of an `NN32` with a `ZZ32` as `ZZ`, gated by `XXXMaxNN32IntoZZ64RungM`.
- **Comprehension: pass.** "An `NN32` operator with a numeral" reads as an operator on an `NN32` and a numeral. Row 484's examples, `u + 1` and `u MAX 1`, show this.
- **Ownership: pass.**
- **Consistency: pass.** P-47 and F-79 agree. Row 484 follows from walk's numeral being a `ZZ32` (P-76).
- **Disposition: keep.**

## F-139, `RR32` a sibling of `RR64`

- **Scope: pass.** The title holds in both libraries: the interpreter's (`FortressBuiltin.fsi:47-48`; `FortressLibrary.fsi:296-302`) and the compiler prelude (`CompilerBuiltin.fsi:433-435`, `:475`). The body keeps walk and the compiled path apart.
- **Present meaning: pass.**
- **Evidence: pass.** `rung-rr32-sibling/REPORT.md` sections 1 and 11 support each sentence. `RR32` declares no `coerce` (`FortressBuiltin.fsi:47-123`). `tests/RR32SiblingRungV.fss` exists. Rows 387, 528 and 529 are open.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** F-131 agrees. A note outside FACTS: P-76's title says "which each number type converts from". Its body lists the five integer types, `QQ` and `RR64`, so `RR32` is left out, as this entry says.
- **Disposition: keep.**

## F-140, a size beyond its kind

- **Scope: fail.** Quoted, the title: "A size beyond `NN32` or `ZZ32` is refused on both paths". The body limits the checker's refusal to "a literal size, or one folded from literals". On the compiled path, the class loader checks no size that it computes from static parameters at instantiation. So `next[\4294967295\]()` answers 4294967296 (row 675, open).
- **Present meaning: pass.**
- **Evidence: pass.** `tests/NatBigSizeWalk.fss` asserts walk's exact reading at 4294967295 and 3000000000. `rung-size-range/REPORT.md` section 12, items 1 and 2, names the tests of the refusals: `XXXNatRangeChecker`, `XXXNatArithRangeChecker`, `XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk` and `XXXIntBelowZZ32Walk`. All of them exist. Rows 325 and 527 are open. Note: only the report names the tests of the refusals, which are half of the title.
- **Comprehension: fail.** Quoted: "Open: walk's arrays at a size from 2^31 (row 527), and row 325." Row 325 is a bare pointer. Its subject is a numeral outside a bounded integer type on the compiled path, not a size. The report gives it only notes (section 12, items 15 and 16). In this list it reads as a second open defect of sizes.
- **Ownership: pass.**
- **Consistency: fail.** F-222 points here and says: "The compiled class loader checks no size it computes against its kind ... (row 675)". The title of this entry says that such a size is refused on both paths, and the entry does not state the limit.
- **Disposition: reword.** Limit the title to a literal size, or one folded from literals, on the compiled path, and to every size that walk binds. Name row 675 as the open limit. Give row 325 its subject or drop it.

## F-141, walk's instance of a parameter that nothing fixes

- **Scope: pass.** The rule and its departures are all under walk.
- **Present meaning: pass.**
- **Evidence: pass.** The seven `tests/Infer*Walk.fss` exist. So do the expected failures of rows 587, 589, 591, 592 and 612: `XXXInferUntypedLambdaResultWalk`, `XXXDispatchTwoCommonParentsWalk`, `XXXInferSeveralBoundsWalk`, `XXXInferThroughBoundWalk` and `XXXInferAboveBoundMentionsParamWalk`. Those five rows are open. `rung-walk-instance/REPORT.md` section 2 holds D3 and D5. `rung-walk-elements/REPORT.md` section 1, item 3, holds the lift of D2.
- **Comprehension: fail.** Two passages:
  - "Its departures by the rung's decisions", "(D3, row 592)" and "(D5)". The handles are from `rung-walk-instance/decision-record.md`, which the entry does not cite. With two rungs in the detail, "the rung" names neither. These decisions are defaults. D3 waits for the curator's review (review-queue item 80). D5's reach is the open question of review-queue item 4, "Does the inference chapter solve a call's type parameters together?". The entry says neither.
  - "a lone one with no narrowest candidate". "Lone" is undefined, as in F-137.
- **Ownership: pass.** One subject, with its departures kept beside the rule.
- **Consistency: fail.** F-144 points here: "With the element type unwritten, `BIG MINMAX` and the four tuple forms run under walk, and the plain-bounded monoid operators stop (F-141)." F-141 said that until climb batch 15 ("a big operator's plain-bounded ones keep `BottomType` (D2)", `FACTS-history.md:2209`). Rung B of that batch lifted D2. F-141 now says that a big operator's parameter at a clause form is fixed by the declared type, by the elements' join or by its bound (F-228). F-144's sentence rests on a clause that is gone. F-141 is current, so the text to change is F-144's (see "Outside this chunk").
- **Disposition: reword.** Name the decision record and each decision by what it decides. Mark D3 and D5 as defaults with their review-queue items. Define "lone", or point to F-137 when F-137 defines it.

## F-142, walk's Meet Rule check and the upper end

- **Scope: fail.** Quoted: "The meet check covers every trait, object and object expression, a generic one through a stand-in (F-145)." For a type with static parameters, the check runs on a stand-in for every instance, and it reads no pair of functional methods whose parameter types mention a static parameter, or that a supertype mentioning one provides (`BuildEnvironments.java:1050-1062`, the comment of `checkGenericFunctionalMethodMeets`). F-145 does not state this limit either. The exception of the symbolic operators is stated.
- **Present meaning: pass.**
- **Evidence: pass.** `BuildEnvironments.java:1043-1061` runs `OverloadedFunction.FunctionalMethodMeets` over object expressions and, through the stand-in, over generic types. `rung-walk-meet/REPORT.md` section 1 gives the run over every trait and object without static parameters, and the upper end: "the meet of its declared bound and the bounds the arguments place on it", where the lower end is `BottomType`. `checkedName` (`OverloadedFunction.java:1990-1994`) passes only identifiers and valid operator names. The six `tests/FunctionalMethodMeet*` programs and `InferContravariantWalk.fss` exist. Rows 611, 612 and 616 are open. `rung-walk-meet/REPORT.md` sections 1 and 7 hold the detail.
- **Comprehension: fail.** Two passages:
  - "gives a type parameter that an argument bounds only from above its interval's upper end". A reader cannot tell when an argument bounds a parameter only from above: when the parameter occurs only in the domain of a function parameter, as in `g: T -> ZZ32` (the history: "mention only in arrow domains"). The reader also cannot tell what the interval is.
  - "Residues: rows 611, 612 and 616". These are bare numbers, and they mix the two claims. Row 611 is the Meet Rule's: symbolic operators break the rule at library sites. Rows 612 and 616 are the upper end's: a bound that mentions another parameter keeps `Bottom`, and walk cannot meet two upper bounds.
- **Ownership: fail.** Quoted, the title: "Walk checks at load the Meet Rule for Functional Methods per providing type, and gives a type parameter that an argument bounds only from above its interval's upper end." The two claims answer different questions and change apart: a check at load, and an instance rule of inference. The second belongs to F-141 (walk's instance of a parameter that its arguments do not fix, P-48). F-141 already holds row 612, and its `tests/Infer*Walk.fss` glob covers `InferContravariantWalk`.
- **Consistency: pass.** F-145 (which points here for the Meet Rule), F-80 (the checker's own Meet Rule check; row 584 records that it skips symbolic operators) and F-245 (a measurement with the check widened to them) agree.
- **Disposition: reorganize.** Move the upper-end clause, its test and rows 612 and 616 into F-141, in words. Keep F-142 on the check at load, with row 611 named by its subject and the generic stand-in's limit stated.

## Outside this chunk

- **F-144 (investigate, for its own chunk).** Its sentence "the plain-bounded monoid operators stop (F-141)" cites a clause of F-141 that climb batch 15 removed (see F-141, Consistency). The operators are `BIG SQCAP`, `BIG SQCUP`, `List`'s and `PureList`'s `BIG CONCAT` and `PrefixSet`'s `BIG UNION` (`rung-reduction-types/REPORT.md` section 8). The narrow question: since rung B of climb batch 15 lifted D2, do these operators still stop under walk when their element type is unwritten? `tests/UnwrittenBigOperatorsWalk.fss` runs other big operators without a static argument. The sources that I read do not measure these five.
- **P-76's title** says that each number type converts from `IntLiteral`. `RR32` does not, and P-76's body leaves it out (F-139).
